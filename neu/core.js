/* ==========================================================================
   LERNRAUM – Kern (Portalplan Abschnitt 10.2, 11.1, Bauliste 1.1/1.2)
   - Profile: jede Person hat eigene Daten (Fortschritt, Antworten, Streak).
   - Ereignis-Liste: alles, was beim Lernen passiert, ist ein Ereignis.
     Streak, Ziel-Ring, Kalender werden daraus BERECHNET, nie gespeichert.
     Dadurch später konfliktfreier Sync (Vereinigung nach id) und keine
     „Zahl ändern“-Manipulation.
   - Kein DOM-Zugriff: läuft auch in Node (Tests: neu/tests/core.test.js).
   ========================================================================== */
(function (root) {
  'use strict';

  const PFX = 'lr:';
  let store = null; // austauschbar für Tests
  function mem() { const m = new Map(); return { getItem: k => (m.has(k) ? m.get(k) : null), setItem: (k, v) => m.set(k, String(v)), removeItem: k => m.delete(k) }; }
  function backend() {
    if (store) return store;
    try { const t = '__lr_t'; root.localStorage.setItem(t, '1'); root.localStorage.removeItem(t); store = root.localStorage; }
    catch (e) { store = mem(); }
    return store;
  }
  const get = (k, d) => { try { const v = backend().getItem(PFX + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } };
  const set = (k, v) => { try { backend().setItem(PFX + k, JSON.stringify(v)); return true; } catch (e) { return false; } };
  const del = k => { try { backend().removeItem(PFX + k); } catch (e) { /* egal */ } };

  function rid(n = 12) {
    const a = new Uint8Array(n);
    (root.crypto || globalThis.crypto).getRandomValues(a);
    return Array.from(a, b => b.toString(16).padStart(2, '0')).join('');
  }

  // ------------------------------------------------------------ Datum (lokale Tage)
  const pad = n => String(n).padStart(2, '0');
  const dayKey = t => { const d = new Date(t); return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`; };
  const fromKey = k => { const [y, m, d] = k.split('-').map(Number); return new Date(y, m - 1, d); };
  const addDays = (k, n) => { const d = fromKey(k); d.setDate(d.getDate() + n); return dayKey(d); };
  const weekKey = k => { const d = fromKey(k); const wd = (d.getDay() + 6) % 7; d.setDate(d.getDate() - wd); return dayKey(d); }; // Montag der Woche
  const daysBetween = (a, b) => Math.round((fromKey(b) - fromKey(a)) / 864e5);

  // ------------------------------------------------------------ Gerät
  function device() {
    let d = get('device', null);
    if (!d) { d = rid(6); set('device', d); }
    return d;
  }

  // ------------------------------------------------------------ Profile
  const profiles = () => get('profiles', []);
  const activeId = () => get('active', null);
  const active = () => profiles().find(p => p.id === activeId()) || null;

  function createProfile(name, courses) {
    const list = profiles();
    const p = { id: rid(8), name: String(name || '').trim().slice(0, 24) || 'Ich', courses: Array.isArray(courses) ? courses.slice() : [], created: Date.now() };
    // Erstes Profil übernimmt den bisherigen Fortschritt dieses Browsers (neu_state_v1).
    if (!list.length) {
      try {
        const legacy = JSON.parse(backend().getItem('neu_state_v1') || 'null');
        if (legacy && typeof legacy === 'object') set(`st:${p.id}`, legacy);
      } catch (e) { /* egal */ }
    }
    list.push(p);
    set('profiles', list);
    set('active', p.id);
    touch();
    return p;
  }
  function updateProfile(id, patch) {
    const list = profiles();
    const p = list.find(x => x.id === id);
    if (!p) return null;
    if (patch.name != null) p.name = String(patch.name).trim().slice(0, 24) || p.name;
    if (Array.isArray(patch.courses)) p.courses = patch.courses.slice();
    set('profiles', list);
    return p;
  }
  function switchTo(id) { if (profiles().some(p => p.id === id)) { set('active', id); touch(); return true; } return false; }
  function deleteProfile(id) {
    const list = profiles().filter(p => p.id !== id);
    set('profiles', list);
    del(`ev:${id}`); del(`st:${id}`);
    if (activeId() === id) set('active', list.length ? list[0].id : null);
  }

  // „Weiter als …?“ nach Pause auf geteilten Geräten
  const touch = () => set('seen', Date.now());
  const idleMinutes = () => (Date.now() - (get('seen', 0) || 0)) / 6e4;

  // ------------------------------------------------------------ UI-Zustand pro Profil
  const stateKey = () => `st:${activeId()}`;
  function loadState() {
    const s = get(stateKey(), null);
    return (s && typeof s === 'object') ? s : {};
  }
  const saveState = s => set(stateKey(), s);

  // ------------------------------------------------------------ Ereignisse
  // Typen: learn (Lektion verstanden), recall (Karte abgefragt, data.ok),
  //        practice (Teilaufgabe bewertet, data.pts/max), fix (vorher verlorene Punkte geholt),
  //        stage (Treppenstufe abgeschlossen), mistake (Fehler mit Fehlertyp), entry (Eingangs-Check)
  const COUNTS = { learn: 1, recall: 1, practice: 1, fix: 1, stage: 1 };
  const events = (pid = activeId()) => get(`ev:${pid}`, []);
  function log(type, ref, data, t) {
    const pid = activeId();
    if (!pid) return null;
    const e = { id: rid(8), t: t || Date.now(), dev: device(), type, ref: ref == null ? null : String(ref) };
    if (data !== undefined) e.data = data;
    const list = events(pid);
    list.push(e);
    set(`ev:${pid}`, list);
    touch();
    return e;
  }
  // Für den späteren Sync: fremde Ereignisse einmischen (Vereinigung nach id).
  function merge(pid, incoming) {
    const list = events(pid);
    const have = new Set(list.map(e => e.id));
    let n = 0;
    (incoming || []).forEach(e => { if (e && e.id && !have.has(e.id)) { list.push(e); have.add(e.id); n++; } });
    list.sort((a, b) => a.t - b.t);
    set(`ev:${pid}`, list);
    return n;
  }

  // ------------------------------------------------------------ Berechnungen
  const GOAL = { recall: 3, learn: 1, fix: 1 }; // Ziel-Ring: Abruf · Neu · Fehler

  function stats(evs, now = Date.now()) {
    const today = dayKey(now);
    const perDay = {};
    evs.forEach(e => {
      if (!COUNTS[e.type]) return;
      const k = dayKey(e.t);
      const d = perDay[k] || (perDay[k] = { n: 0, recall: 0, learn: 0, fix: 0 });
      d.n++;
      if (e.type === 'recall') d.recall++;
      else if (e.type === 'learn' || e.type === 'practice' || e.type === 'stage') d.learn++;
      else if (e.type === 'fix') d.fix++;
    });
    const activeDays = Object.keys(perDay).sort();
    const isActive = k => !!perDay[k];

    // Streak mit Schutz: pro Woche (Mo–So) darf 1 Tag fehlen, ohne dass der Streak reißt.
    let run = 0, best = 0;
    const freezeUsed = {}, freezeDays = new Set();
    if (activeDays.length) {
      for (let k = activeDays[0]; k < today; k = addDays(k, 1)) {
        if (isActive(k)) { run++; best = Math.max(best, run); }
        else if (run > 0 && !freezeUsed[weekKey(k)]) { freezeUsed[weekKey(k)] = true; freezeDays.add(k); }
        else run = 0;
      }
    }
    if (isActive(today)) run++;
    best = Math.max(best, run);

    const t = perDay[today] || { n: 0, recall: 0, learn: 0, fix: 0 };
    const seg = [t.recall >= GOAL.recall, t.learn >= GOAL.learn, t.fix >= GOAL.fix];
    const last = activeDays.length ? activeDays[activeDays.length - 1] : null;
    return {
      today, perDay, freezeDays,
      streak: run, best,
      trainingDays: activeDays.length,
      freezeWeek: freezeUsed[weekKey(today)] ? 'genutzt' : 'bereit',
      ring: { recall: t.recall, learn: t.learn, fix: t.fix, seg, done: seg.filter(Boolean).length },
      lastActive: last,
      comeback: !isActive(today) && run === 0 && !!last && daysBetween(last, today) >= 2
    };
  }

  // Kalender: die letzten n Wochen (Mo–So), Stärke 0–4
  function calendar(st, weeks = 4) {
    const start = addDays(weekKey(st.today), -7 * (weeks - 1));
    const out = [];
    for (let i = 0; i < weeks * 7; i++) {
      const k = addDays(start, i);
      const n = (st.perDay[k] || {}).n || 0;
      out.push({ k, n, lvl: n === 0 ? 0 : n < 4 ? 1 : n < 10 ? 2 : n < 20 ? 3 : 4, freeze: st.freezeDays.has(k), future: k > st.today, today: k === st.today });
    }
    return out;
  }

  root.LR = {
    profiles, active, activeId, createProfile, updateProfile, switchTo, deleteProfile,
    touch, idleMinutes, loadState, saveState, events, log, merge, stats, calendar, GOAL,
    _util: { dayKey, addDays, weekKey, daysBetween, setStore: s => { store = s; }, mem }
  };
})(typeof window !== 'undefined' ? window : globalThis);
