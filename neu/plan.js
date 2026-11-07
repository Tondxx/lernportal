/* ==========================================================================
   LERNPLAN & PROBEKLAUSUR – reine Logik (Bauschritt S3b, Portalplan 8a)
   Kein DOM, läuft auch in Node (Test: neu/tests/plan.test.js).

   Plan-Eintrag („Einheit“): { typ, ref, n?, kind?, fach, klausur?, min?, pin? }
     typ: 'lektion' (ref = Lektions-Id) · 'aufgabe' (ref = Aufgaben-Id) · 'stufe' (ref = Themen-Id, n = Stufe)
          'extra' (ref = Themen-Id, kind = blurting|fehler|erlaeutern|deuten) · 'probe' (ref = Probeklausur-Id)
     pin:  'T-3' = feste Position relativ zur Klausur (z. B. Probeklausur)
   Quellen: geteilte Pläne (content/plaene.js, für alle sichtbar) + eigene Einträge (Ereignisse type 'plan').
   Daten des Zeitplans werden bei jedem Aufruf NEU aus „heute“ und den offenen Einheiten berechnet,
   nichts davon wird gespeichert (wie Streak und Ring).
   ========================================================================== */
(function (root) {
  'use strict';

  const DAY = 864e5;
  const key = it => [it.typ, it.ref, it.n != null ? it.n : '', it.kind || ''].join(':').replace(/:+$/, '');
  const dayStart = d => { const x = new Date(d); x.setHours(0, 0, 0, 0); return x; };
  const addDays = (d, n) => { const x = new Date(d); x.setDate(x.getDate() + n); return x; };
  const iso = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

  // ------------------------------------------------------------ Welche Einheiten hat ein Profil?
  // plans: geteilte Pläne (für alle). events: Ereignisse des Profils (type 'plan').
  // Ereignis-Daten: {op:'add', item} · {op:'remove', key} · {op:'next', key} · {op:'done'|'undone', key}
  function effective(plans, events) {
    const items = [], seen = new Set(), removed = new Set(), done = new Set(), front = [];
    (plans || []).forEach(p => (p.items || []).forEach(it => {
      const k = key(it);
      if (seen.has(k)) return;
      seen.add(k);
      items.push(Object.assign({}, it, { key: k, src: 'plan', planId: p.id, fach: it.fach || p.fach, klausur: it.klausur || p.klausur }));
    }));
    (events || []).forEach(e => {
      if (e.type !== 'plan' || !e.data) return;
      const d = e.data;
      if (d.op === 'add' && d.item) {
        const k = key(d.item);
        removed.delete(k);
        if (!seen.has(k)) { seen.add(k); items.push(Object.assign({}, d.item, { key: k, src: 'mine' })); }
      } else if (d.op === 'remove') removed.add(d.key);
      else if (d.op === 'next') { const i = front.indexOf(d.key); if (i >= 0) front.splice(i, 1); front.unshift(d.key); }
      else if (d.op === 'done') done.add(d.key);
      else if (d.op === 'undone') done.delete(d.key);
    });
    const kept = items.filter(it => !removed.has(it.key));
    // „Als Nächstes“: nach vorn innerhalb der eigenen Klausur-Gruppe (Reihenfolge der Gruppen bleibt)
    const ordered = [];
    const groups = new Map();
    kept.forEach(it => { const g = it.klausur || '-'; if (!groups.has(g)) groups.set(g, []); groups.get(g).push(it); });
    groups.forEach(list => {
      const pri = list.filter(it => front.includes(it.key)).sort((a, b) => front.indexOf(a.key) - front.indexOf(b.key));
      list.filter(it => !front.includes(it.key)).forEach(it => pri.push(it));
      pri.forEach(it => ordered.push(it));
    });
    return { items: ordered, manualDone: done };
  }

  // ------------------------------------------------------------ Zeitplan aus „heute“ + offenen Einheiten
  // opts: { today, perDay (Min.), klausurDates: {klausurId: Date}, isDone(item), minOf(item) }
  // Sonntag = Ruhetag. Eine Einheit kommt immer ganz an einen Tag; ein leerer Tag nimmt auch eine lange Einheit.
  function schedule(items, opts) {
    const today = dayStart(opts.today || new Date());
    const perDay = opts.perDay || 30;
    const dates = opts.klausurDates || {};
    const minOf = opts.minOf || (it => it.min || 10);
    const open = items.filter(it => !opts.isDone(it));
    const deadline = id => (id && dates[id]) ? dayStart(dates[id]) : null;

    const groups = new Map();
    open.forEach(it => { const g = it.klausur || '-'; if (!groups.has(g)) groups.set(g, []); groups.get(g).push(it); });
    const order = [...groups.keys()].sort((a, b) => {
      const da = deadline(a), db = deadline(b);
      return (da ? +da : Infinity) - (db ? +db : Infinity);
    });

    // feste Plätze (pin: 'T-n')
    const pinned = new Map();
    const queue = new Map();
    order.forEach(g => {
      const list = [];
      groups.get(g).forEach(it => {
        const m = /^T-(\d+)$/.exec(it.pin || '');
        const dl = deadline(g);
        if (m && dl) {
          let d = addDays(dl, -Number(m[1]));
          if (d < today) d = today;
          const k = iso(d);
          if (!pinned.has(k)) pinned.set(k, []);
          pinned.get(k).push(it);
        } else list.push(it);
      });
      queue.set(g, list);
    });

    const days = [], late = [];
    const total = open.length;
    let placed = 0;
    for (let i = 0; i < 800 && placed < total; i++) {
      const date = addDays(today, i);
      if (date.getDay() === 0 && !pinned.has(iso(date))) continue; // Sonntag: frei (feste Plätze bleiben)
      const day = { date, key: iso(date), items: [], min: 0 };
      (pinned.get(day.key) || []).forEach(it => { day.items.push(it); day.min += minOf(it); placed++; });
      if (date.getDay() !== 0) {
        let progress = true;
        while (progress) {
          progress = false;
          for (const g of order) {
            const q = queue.get(g);
            if (!q.length) continue;
            const m = minOf(q[0]);
            if (day.items.length === 0 || day.min + m <= perDay) { const it = q.shift(); day.items.push(it); day.min += m; placed++; progress = true; }
            break; // immer die Gruppe mit der frühesten Frist zuerst, erst wenn sie leer ist die nächste
          }
          if (day.min >= perDay) break;
        }
      }
      if (day.items.length) days.push(day);
    }
    days.forEach(d => d.items.forEach(it => { const dl = deadline(it.klausur); if (dl && d.date >= dl) late.push(it); }));

    // Nötige Lernzeit pro Tag je Klausur-Gruppe (nur Tage vor der Klausur, ohne Sonntage)
    const need = {};
    order.forEach(g => {
      const dl = deadline(g); if (!dl) return;
      let avail = 0;
      for (let d = today; d < dl; d = addDays(d, 1)) if (d.getDay() !== 0) avail++;
      const mins = groups.get(g).reduce((a, it) => a + minOf(it), 0);
      need[g] = { min: mins, days: avail, perDay: avail ? Math.ceil(mins / avail) : mins };
    });
    return { days, late, need };
  }

  // ------------------------------------------------------------ Probeklausur aus gemischten Themen
  function rngOf(seed) { // mulberry32
    let a = (seed >>> 0) || 1;
    return () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
  }
  // pool: [{id, teil: 'A'|'B', lesson, be}] · lessons: Set/Array erlaubter Lektions-Ids
  // Ziel: ~40 % Teil A (ohne Rechner), Rest Teil B, möglichst viele verschiedene Themen.
  function makeProbe(pool, o = {}) {
    const lessons = new Set(o.lessons || []);
    const target = o.be || 60;
    const rnd = rngOf(o.seed != null ? o.seed : Date.now());
    const cand = pool.filter(t => lessons.has(t.lesson));
    if (!cand.length) return null;
    const used = {};
    const pick = (teil, goal) => {
      const list = cand.filter(t => t.teil === teil).map(t => ({ t, r: rnd() }));
      const out = []; let sum = 0;
      while (list.length && sum < goal * 0.85) {
        // Bevorzuge Lektionen, aus denen noch nichts gewählt wurde, dann Zufall
        list.sort((x, y) => (used[x.t.lesson] || 0) - (used[y.t.lesson] || 0) || x.r - y.r);
        const i = list.findIndex(x => sum + x.t.be <= goal * 1.2);
        if (i < 0) break;
        const [x] = list.splice(i, 1);
        out.push(x.t); sum += x.t.be; used[x.t.lesson] = (used[x.t.lesson] || 0) + 1;
      }
      return { out, sum };
    };
    const a = pick('A', Math.round(target * 0.4));
    const b = pick('B', target - a.sum);
    const tasks = a.out.concat(b.out);
    if (!tasks.length) return null;
    const be = a.sum + b.sum;
    return { tasks: tasks.map(t => t.id), be, beA: a.sum, beB: b.sum, minuten: Math.max(15, Math.round(be * 1.5 / 5) * 5), knapp: be < target * 0.7 };
  }

  const API = { key, effective, schedule, makeProbe, rngOf, iso, addDays, dayStart };
  root.LRPlan = API;
  if (typeof module !== 'undefined' && module.exports) module.exports = API;
})(typeof window !== 'undefined' ? window : globalThis);
