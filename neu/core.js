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
  //        stage (Treppenstufe abgeschlossen), mistake (Fehler mit Fehlertyp), entry (Eingangs-Check),
  //        blurt (Blurting: 5 Min. frei aus dem Kopf, zählt als volles Abruf-Segment),
  //        extra (besondere Aufgabe fertig: Fehler finden, Lösungsweg erläutern, Bedingung deuten, Notation),
  //        hunt (Fehlerjagd: ein vorgemerkter Fehler neu gerechnet, data.ok – ok zählt fürs Fehler-Segment),
  //        session (Mini-Session/Fokusblock beendet, data.mode/min)
  const COUNTS = { learn: 1, recall: 1, practice: 1, fix: 1, stage: 1, blurt: 1, extra: 1, hunt: 1 };
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
    listeners.forEach(f => { try { f(e, pid); } catch (x) { /* egal */ } });
    return e;
  }
  const listeners = [];
  const onLog = f => listeners.push(f); // z. B. Sync: nach neuen Ereignissen abgleichen
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
      else if (e.type === 'blurt') d.recall += GOAL.recall; // freies Abrufen aus dem Kopf = ein ganzer Abruf-Block
      else if (e.type === 'learn' || e.type === 'practice' || e.type === 'stage' || e.type === 'extra') d.learn++;
      else if (e.type === 'fix' || (e.type === 'hunt' && e.data && e.data.ok)) d.fix++;
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

  // ------------------------------------------------------------ Wiederholungs-Queue (Portalplan 4: verteiltes Wiederholen)
  // Abstände in Tagen. Richtig → eine Stufe weiter (1 – 3 – 7 – 21 – 50 – 120), falsch → morgen wieder.
  // Mehrmals am selben Tag richtig zählt nur einmal (kein Pauken-Bonus). Alles aus Ereignissen berechnet.
  const STEPS = [1, 3, 7, 21, 50, 120];
  function schedule(reviews, firstDue) {
    let step = -1, lastDay = null, lastOk = null;
    const okDays = new Set();
    reviews.forEach(r => {
      const d = dayKey(r.t);
      if (!r.ok || step < 0 || lastOk === false) step = 0;          // falsch, erstes Mal oder nach einem Fehler: Abstand 1 Tag
      else if (d !== lastDay) step = Math.min(step + 1, STEPS.length - 1); // richtig an einem neuen Tag: eine Stufe weiter
      if (r.ok) okDays.add(d);
      lastDay = d; lastOk = r.ok;
    });
    const due = lastDay == null ? firstDue : addDays(lastDay, STEPS[Math.max(0, step)]);
    return { step, due, lastDay, lastOk, n: reviews.length, okDays: okDays.size };
  }
  const isDue = (s, today) => s.due <= today;

  // Karten (z. B. Selbsttest-Fragen verstandener Lektionen): refs = verfügbare Karten.
  // Reihenfolge: zuletzt falsch > am längsten überfällig > neu.
  function cards(evs, refs, now = Date.now()) {
    const today = dayKey(now);
    const rev = {};
    evs.forEach(e => { if (e.type === 'recall' && e.ref) (rev[e.ref] = rev[e.ref] || []).push({ t: e.t, ok: !!(e.data && e.data.ok) }); });
    const out = refs.map(ref => Object.assign({ ref }, schedule(rev[ref] || [], today)));
    const rank = c => (c.lastOk === false ? 0 : c.n ? 1 : 2);
    out.sort((a, b) => rank(a) - rank(b) || (a.due < b.due ? -1 : a.due > b.due ? 1 : 0));
    return { all: out, due: out.filter(c => isDue(c, today)), newCount: out.filter(c => !c.n).length };
  }

  // Fehlerjagd: jeder vorgemerkte Fehler (mistake) kommt nach 1 Tag wieder. War man sich bei der Aufgabe
  // sehr sicher (Sicherheit 3) und lag falsch, kommt er sofort und zuerst (Hypercorrection).
  // Behoben = zweimal an verschiedenen Tagen richtig nachgerechnet. Ein neuer Fehler am selben Ort setzt zurück.
  function mistakes(evs, now = Date.now()) {
    const today = dayKey(now);
    const m = {};
    evs.forEach(e => {
      if (e.type === 'mistake' && e.ref) m[e.ref] = { ref: e.ref, t: e.t, data: e.data || {}, hunts: [] };
      else if (e.type === 'hunt' && e.ref && m[e.ref]) m[e.ref].hunts.push({ t: e.t, ok: !!(e.data && e.data.ok) });
    });
    const out = Object.values(m).map(x => {
      const hyper = x.data.conf === 3;
      const s = schedule(x.hunts, hyper ? dayKey(x.t) : addDays(dayKey(x.t), 1));
      return Object.assign(x, s, { hyper, fixed: s.step >= 1 && s.lastOk === true });
    });
    const open = out.filter(x => !x.fixed);
    open.sort((a, b) => (b.hyper - a.hyper) || (a.due < b.due ? -1 : a.due > b.due ? 1 : 0) || a.t - b.t);
    return { open, due: open.filter(x => isDue(x, today)), fixed: out.filter(x => x.fixed) };
  }

  root.LR = {
    profiles, active, activeId, createProfile, updateProfile, switchTo, deleteProfile,
    touch, idleMinutes, loadState, saveState, events, log, merge, stats, calendar, GOAL,
    STEPS, schedule, cards, mistakes, onLog,
    _util: { dayKey, addDays, weekKey, daysBetween, setStore: s => { store = s; }, mem }
  };
})(typeof window !== 'undefined' ? window : globalThis);
