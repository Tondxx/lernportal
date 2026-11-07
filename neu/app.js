/* ==========================================================================
   LERNRAUM – Prototyp-App (Vanilla JS, ohne Build)
   Nutzt die ECHTEN Daten des Portals: Klausuren (calendar.js), Stundenplan
   (timetable.js), Mathe-Lektionen und -Aufgaben (mathe_trainer_content.js),
   Fächer (data.js, aus main_hub.js erzeugt).
   ========================================================================== */
(function () {
  'use strict';

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const D = window.MT_DATA || { LESSONS: [], EXAM1: { tasks: [] }, EXTRA: [], SPICK: '' };
  const SUBJECTS = window.NEU_SUBJECTS || [];
  const byId = Object.fromEntries(SUBJECTS.map(s => [s.id, s]));
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const icon = (n, c = '') => `<svg class="i ${c}" aria-hidden="true"><use href="#i-${n}"/></svg>`;
  const fmt = (n, d = 1) => Number(n).toFixed(d).replace('.', ',');
  const mono = s => (s.code || s.name).slice(0, 2).toUpperCase();

  // ------------------------------------------------------------ Mathe-Rendering
  function M(s) {
    if (!s) return '';
    if (!window.katex) return s;
    return s.replace(/\$\$([\s\S]+?)\$\$|\$([^$\n]+?)\$/g, (m, a, b) => {
      try { return katex.renderToString((a || b).trim(), { displayMode: !!a, throwOnError: false }); } catch (e) { return m; }
    });
  }
  const prose = html => `<div class="prose">${M(html)}</div>`;

  // ------------------------------------------------------------ Zustand (localStorage, mit Importen aus dem alten Portal)
  const LS = 'neu_state_v1';
  function loadState() {
    let s = null;
    try { s = JSON.parse(localStorage.getItem(LS) || 'null'); } catch (e) { /* ohne Speicher */ }
    if (!s || typeof s !== 'object') s = { done: {}, scores: {}, answers: {}, last: null, planTab: 'klausuren', week: 'all' };
    try { // gelernte Lektionen aus dem bisherigen Mathe-Trainer übernehmen
      const old = JSON.parse(localStorage.getItem('mt_state_v1') || 'null');
      if (old && old.done) Object.keys(old.done).forEach(k => { if (old.done[k] && s.done[k] === undefined) s.done[k] = true; });
    } catch (e) { /* egal */ }
    return s;
  }
  const state = loadState();
  const save = () => { try { localStorage.setItem(LS, JSON.stringify(state)); } catch (e) { /* egal */ } };

  // ------------------------------------------------------------ Klausuren / Stundenplan
  const exams = (typeof TONDA_KLAUSUREN !== 'undefined' ? TONDA_KLAUSUREN : []).map(k => {
    const fid = (typeof KLAUSUR_FACH_IDS !== 'undefined' && KLAUSUR_FACH_IDS[k.subject]) || null;
    return Object.assign({}, k, { fid, days: klausurDaysUntil(k), date: parseKlausurDate(k.dateStr) });
  }).sort((a, b) => a.date - b.date);
  const upcoming = exams.filter(k => k.days >= 0);
  const examsOf = id => upcoming.filter(k => k.fid === id);
  const daysText = d => d === 0 ? 'Heute' : d === 1 ? 'Morgen' : `in ${d} Tagen`;
  const MONTHS = ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'];
  const WD = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];
  const DAYKEYS = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];

  function subjOfCourse(code) {
    const c = (code || '').toLowerCase();
    return SUBJECTS.find(s => s.code.toLowerCase() === c) || (c.startsWith('sf') ? byId.seminarfach : null);
  }
  function daySlots(dayKey, week) {
    const out = [];
    for (let p = 1; p <= 9; p++) {
      const cell = (typeof SCHEDULE_DATA !== 'undefined' && SCHEDULE_DATA[p] && SCHEDULE_DATA[p][dayKey]) || [];
      cell.forEach(sl => { if (week === 'all' || !sl.week || sl.week === week) out.push(Object.assign({ p }, sl)); });
    }
    return out;
  }
  function groupSlots(slots) { // 1.+2. Stunde desselben Kurses zusammenfassen
    const out = [];
    slots.forEach(s => {
      const last = out[out.length - 1];
      if (last && last.course === s.course && last.week === s.week && last.to === s.p - 1) last.to = s.p;
      else out.push({ course: s.course, teacher: s.teacher, room: s.room, week: s.week, from: s.p, to: s.p });
    });
    return out;
  }
  const rangeText = g => g.from === g.to ? `${g.from}. Std.` : `${g.from}.–${g.to}. Std.`;

  // ------------------------------------------------------------ Mathe: Lektionen & Aufgaben
  const LESSONS = D.LESSONS || [];
  const TASKS = [].concat((D.EXAM1 && D.EXAM1.tasks) || [], D.EXTRA || []);
  const taskMax = t => t.parts.reduce((a, p) => a + (p.be || 0), 0);
  const taskGot = t => t.parts.reduce((a, p) => a + (state.scores[p.id] || 0), 0);
  const nextLesson = () => LESSONS.find(l => !state.done[l.id]) || LESSONS[0];
  const lessonsDone = () => LESSONS.filter(l => state.done[l.id]).length;

  // ------------------------------------------------------------ UI-Bausteine
  function ring(p, { size = 120, center = '', color = '' } = {}) {
    return `<div class="ring" style="--size:${size}px;--p:${Math.round(p * 100)};${color ? `--ring-c:${color}` : ''}">
      <svg viewBox="0 0 100 100"><circle class="track" cx="50" cy="50" r="44" pathLength="100"/><circle class="fill" cx="50" cy="50" r="44" pathLength="100"/></svg>
      <div class="mid">${center}</div></div>`;
  }
  const bar = p => `<div class="bar" style="--p:${p}"><i></i></div>`;
  function seg(id, items, active, full) {
    return `<div class="seg${full ? ' full' : ''}" role="tablist" data-seg="${id}"><span class="seg-pill"></span>${items.map(([v, l]) =>
      `<button role="tab" type="button" data-v="${v}" aria-selected="${v === active}">${l}</button>`).join('')}</div>`;
  }
  const subjStyle = s => `style="--subj:${s ? s.color : 'var(--accent)'}"`;
  const rise = (html, i) => `<div style="--i:${i}">${html}</div>`;

  // ------------------------------------------------------------ Ansichten
  const R = {};

  // ---- Heute
  R.heute = () => {
    const next = upcoming[0];
    const ns = next && byId[next.fid];
    const now = new Date();
    let h = '';
    h += `<div class="page-head"><span class="kicker">${WD[now.getDay()]}, ${now.getDate()}. ${['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'][now.getMonth()]}</span><h2 class="h-display">Hallo Tonda.</h2></div>`;
    const blocks = [];

    if (next) {
      const p = Math.max(0.05, 1 - next.days / 28);
      blocks.push(`<section class="hero" ${subjStyle(ns)}>
        ${ring(p, { size: 148, color: ns ? ns.color : '', center: `<span class="num" data-count="${next.days}">${next.days}</span><span class="kicker">${next.days === 1 ? 'Tag' : 'Tage'}</span>` })}
        <div class="hero-body">
          <span class="kicker">Nächste Klausur</span>
          <h3 class="h-1">${ns ? ns.name : next.subject}</h3>
          <p class="muted">${next.topic}</p>
          <div class="hero-meta"><span class="chip">${icon('cal')}${WD[next.date.getDay()].slice(0, 2)}, ${next.dateStr.slice(0, 6)}</span><span class="chip">${icon('clock')}${next.period} Stunde</span><span class="chip">Raum ${next.room}</span></div>
          ${ns ? `<a class="btn primary" href="#/fach/${ns.id}">Vorbereiten ${icon('arrow', 'go')}</a>` : ''}
        </div></section>`);
    }

    const nl = nextLesson();
    if (nl) {
      const ms = byId.mathe;
      blocks.push(`<a class="cont" href="#/lektion/${nl.id}" ${subjStyle(ms)}>
        <div class="cont-ico">${icon('play')}</div>
        <div class="row-main"><span class="kicker">Weiter lernen · ${ms.name}</span><span class="row-title" style="font-size:18px">Lektion ${nl.num}: ${nl.title}</span><span class="row-sub">${nl.min} Min. · ${lessonsDone()} von ${LESSONS.length} Lektionen verstanden</span></div>
        ${icon('right', 'chev')}</a>`);
    }

    // Tagesplan: heute oder nächster Schultag
    let off = 0, dk = DAYKEYS[now.getDay()];
    while ((!['Mo', 'Di', 'Mi', 'Do', 'Fr'].includes(dk) || !daySlots(dk, 'all').length) && off < 7) { off++; dk = DAYKEYS[(now.getDay() + off) % 7]; }
    const groups = groupSlots(daySlots(dk, 'all'));
    const label = off === 0 ? 'Heute im Unterricht' : off === 1 ? 'Morgen im Unterricht' : `${WD[(now.getDay() + off) % 7]} im Unterricht`;
    blocks.push(`<section><div class="section-head"><h3 class="h-2">${label}</h3><a class="chip" href="#/plan">Stundenplan ${icon('right')}</a></div>
      <div class="day">${groups.map(g => { const s = subjOfCourse(g.course); return `<div class="slot" ${subjStyle(s)}><span class="kicker">${rangeText(g)}${g.week ? ' · ' + g.week + '-Woche' : ''}</span><b>${s ? s.name.replace(/ (eA|gA)$/, '') : g.course}</b><span class="row-sub">${g.teacher} · ${g.room}</span></div>`; }).join('')}</div></section>`);

    blocks.push(`<section><div class="section-head"><h3 class="h-2">Als Nächstes</h3><a class="chip" href="#/plan">Alle Klausuren ${icon('right')}</a></div>
      <div class="list">${upcoming.slice(0, 4).map(k => examRow(k)).join('')}</div></section>`);

    return { title: 'Heute', html: `${h}<div class="rise stack" style="display:flex;flex-direction:column;gap:30px">${blocks.map((b, i) => rise(b, i)).join('')}</div>`, nav: 'heute' };
  };

  function examRow(k) {
    const s = byId[k.fid];
    const href = k.fid ? `href="#/fach/${k.fid}"` : '';
    return `<a class="exam" ${href} ${subjStyle(s)}>
      <div class="date"><b>${k.date.getDate()}</b><span>${MONTHS[k.date.getMonth()]}</span></div>
      <div class="row-main"><span class="row-title">${s ? s.name : k.subject}</span><span class="row-sub">${k.topic}</span></div>
      <span class="chip ${k.days <= 3 ? 'bad' : k.days <= 10 ? 'warn' : ''}">${daysText(k.days)}</span></a>`;
  }

  // ---- Fächer
  R.faecher = () => {
    const order = SUBJECTS.slice().sort((a, b) => {
      const ea = examsOf(a.id)[0], eb = examsOf(b.id)[0];
      return (ea ? ea.days : 9999) - (eb ? eb.days : 9999);
    });
    const tiles = order.map((s, i) => {
      const e = examsOf(s.id)[0];
      const st = s.id === 'mathe' ? ` · ${lessonsDone()}/${LESSONS.length} verstanden` : '';
      return `<a class="tile" href="#/fach/${s.id}" ${subjStyle(s)}>
        <div style="display:flex;justify-content:space-between;align-items:flex-start"><div class="mono">${mono(s)}</div>${e ? `<span class="chip ${e.days <= 3 ? 'bad' : e.days <= 10 ? 'warn' : ''}">${daysText(e.days)}</span>` : ''}</div>
        <div><div class="tile-name">${s.name}</div><div class="tile-foot"><span>${s.teacher} · ${s.room}${st}</span>${icon('right')}</div></div></a>`;
    });
    return { title: 'Fächer', nav: 'faecher', html: `<div class="page-head"><span class="kicker">Jahrgang 12</span><h2 class="h-display">Deine Fächer</h2><p class="muted">Sortiert nach der nächsten Klausur.</p></div><div class="grid cols rise">${tiles.map((t, i) => rise(t, Math.min(i, 8))).join('')}</div>` };
  };

  // ---- Fach
  R.fach = (id, tab = 'pfad') => {
    const s = byId[id];
    if (!s) return R.faecher();
    const e = examsOf(id)[0];
    const isMath = id === 'mathe';
    const head = `<div class="fach-head" ${subjStyle(s)}><div class="mono">${mono(s)}</div><div style="min-width:0"><h2 class="h-1">${s.name}</h2><p class="muted" style="margin-top:4px">${s.level} · ${s.code} · ${s.teacher} · Raum ${s.room}</p></div></div>`;
    const examChip = e ? `<div class="notice" style="margin-bottom:18px;background:color-mix(in oklab,var(--subj) 12%,transparent)">${icon('target')}<div><b style="color:var(--text)">Nächste Klausur ${daysText(e.days).toLowerCase()}</b> · ${WD[e.date.getDay()]}, ${e.dateStr} · ${e.period} Stunde<br>${e.topic}</div></div>` : '';
    const tabs = `<div class="sticky-seg">${seg('fachtab:' + id, [['pfad', 'Lernpfad'], ['ueben', 'Üben'], ['klausur', 'Klausur']], tab, true)}</div>`;
    let body = '';
    if (tab === 'pfad') body = isMath ? mathPath(s) : otherPath(s);
    else if (tab === 'ueben') body = isMath ? mathPractice(s) : soon(s);
    else body = isMath ? mathExam(s, e) : soon(s);
    return { title: s.name, back: '#/faecher', nav: 'faecher', html: `<div ${subjStyle(s)}>${head}${examChip}${tabs}<div class="rise" id="tabBody">${body}</div></div>` };
  };
  const soon = s => `<div class="notice">${icon('info')}<div>Dieser Bereich wird für ${s.name} noch aus dem bisherigen Portal übernommen. Die Struktur ist überall gleich: <b style="color:var(--text)">Lernpfad, Üben, Klausur</b>.</div></div>`;

  function unitRow(i, n, total, done, isNext, title, sub, chip, href, ext) {
    const cls = ['unit', i === 0 ? 'first' : '', i === total - 1 ? 'last' : '', done ? 'done' : '', isNext ? 'next' : ''].join(' ');
    return `<a class="${cls}" href="${href}"${ext ? ' target="_blank" rel="noopener"' : ''}>
      <span class="node">${done ? icon('check') : n}</span>
      <span class="row-main"><span class="row-title">${title}</span><span class="row-sub">${sub}</span></span>
      <span class="row-end">${chip}${icon(ext ? 'ext' : 'right', 'chev')}</span></a>`;
  }
  function mathPath(s) {
    const groups = [['integral', 'Integral & Bestand'], ['schar', 'Funktionsscharen & Ortskurven']];
    const nxt = nextLesson();
    const total = lessonsDone() / LESSONS.length;
    let h = `<div class="card" style="padding:18px 20px;display:flex;align-items:center;gap:18px">${ring(total, { size: 72, center: `<b class="num" style="font-size:20px">${lessonsDone()}</b>` })}<div><div class="row-title">${lessonsDone()} von ${LESSONS.length} Lektionen verstanden</div><div class="row-sub">Jede Lektion: Idee, Rezept, Beispiel, Fehler, Selbsttest.</div></div></div>`;
    groups.forEach(([g, label]) => {
      const ls = LESSONS.filter(l => l.group === g);
      const gd = ls.filter(l => state.done[l.id]).length;
      h += `<div class="path-group"><h3 class="h-2">${label}</h3><span class="chip">${gd}/${ls.length}</span></div><div class="path">` +
        ls.map((l, i) => unitRow(i, l.num, ls.length, !!state.done[l.id], nxt && nxt.id === l.id, l.title, l.short, `<span class="chip">${icon('clock')}${l.min} Min.</span>`, `#/lektion/${l.id}`)).join('') + `</div>`;
    });
    return h;
  }
  function otherPath(s) {
    const ts = s.topics;
    return `<div class="notice" style="margin-bottom:18px">${icon('info')}<div>Diese Module laufen noch im bisherigen Portal und werden in die neue Struktur übertragen.</div></div>
      <div class="path">${ts.map((t, i) => unitRow(i, i + 1, ts.length, false, false, t.title, t.desc.length > 110 ? t.desc.slice(0, 108) + '…' : t.desc, t.badge ? `<span class="chip">${t.badge}</span>` : '', '../index.html', true)).join('')}</div>`;
  }

  function mathPractice(s) {
    let got = 0, max = 0;
    TASKS.forEach(t => { got += taskGot(t); max += taskMax(t); });
    let h = `<div class="card" style="padding:18px 20px;display:flex;align-items:center;gap:18px;margin-bottom:8px">${ring(max ? got / max : 0, { size: 72, center: `<b class="num" style="font-size:18px">${got}</b>` })}<div><div class="row-title">${got} von ${max} BE ehrlich bewertet</div><div class="row-sub">Du bewertest dich selbst, erst nach der Musterlösung.</div></div></div>`;
    [['A', 'Teil A · ohne Taschenrechner'], ['B', 'Teil B · mit Taschenrechner']].forEach(([teil, label]) => {
      const ts = TASKS.filter(t => t.teil === teil);
      if (!ts.length) return;
      h += `<div class="path-group"><h3 class="h-2">${label}</h3><span class="chip">${ts.length} Aufgaben</span></div><div class="list">` + ts.map(t => {
        const g = taskGot(t), m = taskMax(t);
        return `<a class="row" href="#/aufgabe/${t.id}"><span class="row-main"><span class="row-title">${t.title}</span><span class="row-sub">AFB ${t.afb} · ${t.ops}</span></span><span class="row-end"><span class="chip ${g >= m * 0.75 ? 'ok' : g > 0 ? 'warn' : ''}">${g}/${m} BE</span>${icon('right', 'chev')}</span></a>`;
      }).join('') + `</div>`;
    });
    return h;
  }

  function mathExam(s, e) {
    const open = LESSONS.filter(l => !state.done[l.id]);
    return `<div class="section" style="margin-top:6px"><h3 class="h-2" style="margin-bottom:12px">Bereit für die Klausur?</h3>
      <div class="list">${open.length ? open.slice(0, 5).map(l => `<a class="row" href="#/lektion/${l.id}"><span class="node" style="width:32px;height:32px;font-size:13px;box-shadow:0 0 0 2px var(--line-2) inset;border-radius:50%;display:grid;place-items:center;font-family:var(--font-display);font-weight:700">${l.num}</span><span class="row-main"><span class="row-title">${l.title}</span><span class="row-sub">noch nicht als verstanden markiert</span></span>${icon('right', 'chev')}</a>`).join('') : `<div class="empty">Alle Lektionen verstanden. Jetzt Aufgaben im Reiter Üben.</div>`}</div></div>
      <div class="section"><h3 class="h-2" style="margin-bottom:14px">Spickzettel</h3>${prose(D.SPICK)}</div>`;
  }

  // ---- Plan
  R.plan = () => {
    const tab = state.planTab || 'klausuren';
    let body = '';
    if (tab === 'klausuren') {
      const first = upcoming.filter(k => k.date < new Date(2027, 0, 1));
      const later = upcoming.filter(k => k.date >= new Date(2027, 0, 1));
      const past = exams.filter(k => k.days < 0).reverse();
      body = `<div class="section" style="margin-top:6px"><h3 class="h-2" style="margin-bottom:12px">Halbjahr 12.1</h3><div class="list">${first.map(examRow).join('')}</div></div>
        <div class="section"><h3 class="h-2" style="margin-bottom:12px">Halbjahr 12.2</h3><div class="list">${later.map(examRow).join('')}</div></div>
        ${past.length ? `<div class="section"><h3 class="h-2" style="margin-bottom:12px">Geschrieben</h3><div class="list" style="opacity:.7">${past.map(k => `<div class="exam" ${subjStyle(byId[k.fid])}><div class="date"><b>${k.date.getDate()}</b><span>${MONTHS[k.date.getMonth()]}</span></div><div class="row-main"><span class="row-title">${(byId[k.fid] || {}).name || k.subject}</span><span class="row-sub">${k.topic}</span></div><span class="chip ok">${icon('check')}erledigt</span></div>`).join('')}</div></div>` : ''}`;
    } else {
      const wk = state.week || 'all';
      const dayKeys = ['Mo', 'Di', 'Mi', 'Do', 'Fr'];
      const dnames = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag'];
      const todayIdx = Math.min(4, Math.max(0, new Date().getDay() - 1));
      const dsel = state.day != null ? state.day : (new Date().getDay() >= 1 && new Date().getDay() <= 5 ? todayIdx : 0);
      // breit: Raster
      let grid = `<div class="tt tt-wide"><div></div>${dayKeys.map(d => `<div class="tt-h">${d}</div>`).join('')}`;
      for (let p = 1; p <= 9; p++) {
        grid += `<div class="tt-n">${p}</div>`;
        dayKeys.forEach(d => {
          const cell = ((SCHEDULE_DATA[p] || {})[d] || []).filter(x => wk === 'all' || !x.week || x.week === wk);
          if (!cell.length) { grid += `<div class="tt-c empty"></div>`; return; }
          grid += `<div style="display:flex;flex-direction:column;gap:6px">${cell.map(x => { const s = subjOfCourse(x.course); return `<div class="tt-c" ${subjStyle(s)}>${x.week ? `<span class="wk">${x.week}</span>` : ''}<b>${x.course}</b><small>${x.teacher} · ${x.room}</small></div>`; }).join('')}</div>`;
        });
      }
      grid += `</div>`;
      // schmal: Tagesliste
      const slots = daySlots(dayKeys[dsel], wk);
      const day = `<div class="tt-day">${seg('day', dayKeys.map((d, i) => [i, d]), dsel, true)}<div class="list" style="margin-top:14px">${slots.length ? groupSlots(slots).map(x => { const s = subjOfCourse(x.course); return `<div class="row" ${subjStyle(s)}><span class="bar-subj"></span><span class="num" style="min-width:58px;font-size:15px;font-weight:700;color:var(--text-3)">${rangeText(x)}</span><span class="row-main"><span class="row-title">${s ? s.name : x.course}</span><span class="row-sub">${x.teacher} · Raum ${x.room}</span></span>${x.week ? `<span class="chip">${x.week}-Woche</span>` : ''}</div>`; }).join('') : `<div class="empty">Kein Unterricht.</div>`}</div></div>`;
      body = `<div style="margin:6px 0 18px">${seg('week', [['all', 'Alle Wochen'], ['A', 'A-Woche'], ['B', 'B-Woche']], wk)}</div>${grid}${day}`;
    }
    return { title: 'Plan', nav: 'plan', html: `<div class="page-head"><span class="kicker">Schuljahr 2026/27</span><h2 class="h-display">Plan</h2></div><div class="sticky-seg">${seg('plan', [['klausuren', 'Klausuren'], ['stunden', 'Stundenplan']], tab, true)}</div><div class="rise" id="tabBody">${body}</div>` };
  };

  // ---- Lektion (Reader)
  function buildPages(l) {
    const P = [];
    P.push({ k: 'idee', label: 'Idee', html: () => `<div class="page-title"><span class="kicker">Lektion ${l.num} · ${l.min} Min.</span><h2 class="h-1">${l.title}</h2></div>${prose(l.idee)}${l.bild ? `<span class="sub">Stell dir vor</span>${prose(l.bild)}` : ''}` });
    if (l.rezept && l.rezept.length) P.push({ k: 'rezept', label: 'Rezept', html: () => `<div class="page-title"><span class="kicker">Schritt für Schritt</span><h2 class="h-1">Das Rezept</h2><p class="muted" style="margin-top:10px">Tippe einen Schritt an, wenn du ihn verstanden hast.</p></div><ol class="recipe">${l.rezept.map(r => `<li tabindex="0"><span class="tick"></span>${prose(r)}</li>`).join('')}</ol>${l.extra ? `<span class="sub">Zum Nachschlagen</span>${prose(l.extra)}` : ''}` });
    if (l.beispiel) P.push({ k: 'beispiel', label: 'Beispiel', html: () => `<div class="page-title"><span class="kicker">Rechne mit</span><h2 class="h-1">Ein Beispiel</h2></div><div class="q">${prose(l.beispiel.q)}</div>${demoSlot(l)}<div id="steps">${l.beispiel.steps.map((st, i) => `<div class="reveal" data-step="${i}"><div><div class="inner"><div class="stepx"><span class="n">${i + 1}</span><div><h4>${st.h}</h4>${prose(st.t)}</div></div></div></div></div>`).join('')}</div><button class="btn reveal-btn" id="revealBtn" type="button">${icon('eye')}<span>Ersten Schritt zeigen</span></button>${l.extraAfter ? `<span class="sub">Mehr dazu</span>${prose(l.extraAfter)}` : ''}` });
    if (l.fehler && l.fehler.length) P.push({ k: 'fehler', label: 'Fehler', html: () => `<div class="page-title"><span class="kicker">Darauf achten</span><h2 class="h-1">Typische Fehler</h2></div><div class="fails">${l.fehler.map(f => `<div class="fail">${icon('alert')}${prose(f)}</div>`).join('')}</div>` });
    if (l.test && l.test.length) P.push({ k: 'test', label: 'Selbsttest', html: () => `<div class="page-title"><span class="kicker">Active Recall</span><h2 class="h-1">Selbsttest</h2><p class="muted" style="margin-top:10px">Erst im Kopf antworten, dann umdrehen.</p></div><div id="flashHost"></div>` });
    P.push({ k: 'ende', label: 'Fertig', html: () => endPage(l) });
    return P;
  }
  function demoSlot(l) {
    if (l.id === 'L1' || l.demo === 'bestand') return `<span class="sub">Probier es aus</span><div class="demo" id="demoHost" data-demo="bestand"></div>`;
    if (l.demo === 'ortskurve') return `<span class="sub">Probier es aus</span><div class="demo" id="demoHost" data-demo="ortskurve"></div>`;
    return '';
  }
  function endPage(l) {
    const done = !!state.done[l.id];
    const idx = LESSONS.findIndex(x => x.id === l.id);
    const nx = LESSONS[idx + 1];
    const related = TASKS.filter(t => t.lesson === l.id);
    return `<div class="done-wrap"><div class="done-badge">${icon('check')}</div><h2 class="h-1">Lektion ${l.num} geschafft?</h2><p class="muted" style="max-width:44ch">Markiere sie als verstanden, wenn du das Rezept ohne Hinsehen erklären kannst. Du kannst es jederzeit zurücknehmen.</p>
      <button class="btn ${done ? '' : 'primary'}" id="doneBtn" type="button">${done ? icon('check') + 'Verstanden – zurücknehmen' : icon('check') + 'Als verstanden speichern'}</button></div>
      ${related.length ? `<span class="sub">Passende Aufgaben</span><div class="list">${related.map(t => `<a class="row" href="#/aufgabe/${t.id}"><span class="row-main"><span class="row-title">${t.title}</span><span class="row-sub">Teil ${t.teil} · ${taskMax(t)} BE</span></span>${icon('right', 'chev')}</a>`).join('')}</div>` : ''}
      ${nx ? `<span class="sub">Danach</span><a class="row card" href="#/lektion/${nx.id}" style="border-radius:22px"><span class="row-main"><span class="row-title">Lektion ${nx.num}: ${nx.title}</span><span class="row-sub">${nx.short}</span></span>${icon('right', 'chev')}</a>` : ''}`;
  }

  R.lektion = (id) => {
    const l = LESSONS.find(x => x.id === id);
    if (!l) return R.faecher();
    const pages = buildPages(l);
    let cur = state.last && state.last.id === id ? Math.min(state.last.page, pages.length - 1) : 0;
    const ms = byId.mathe;
    const html = `<div ${subjStyle(ms)} id="reader">
      <div class="steps" id="steps">${pages.map(() => '<i></i>').join('')}</div>
      <div class="reader"><nav class="outline" id="outline" aria-label="Seiten der Lektion">${pages.map((p, i) => `<button type="button" data-p="${i}"><span class="n">${i + 1}</span>${p.label}</button>`).join('')}</nav>
      <div><article class="page" id="page"></article><div class="pager"><button class="btn back-btn" id="prevBtn" type="button" aria-label="Zurück">${icon('left')}</button><button class="btn primary" id="nextBtn" type="button"></button></div></div></div></div>`;
    return {
      title: `Lektion ${l.num}`, back: '#/fach/mathe', nav: 'faecher', focus: true, html,
      after(root) { readerInit(root, l, pages, cur); }
    };
  };

  function readerInit(root, l, pages, start) {
    let cur = start, dir = 1;
    const page = $('#page', root), next = $('#nextBtn', root), prev = $('#prevBtn', root);
    const seen = new Set();
    function show() {
      seen.add(cur);
      state.last = { id: l.id, page: cur }; save();
      page.className = 'page' + (dir < 0 ? ' back' : '');
      page.innerHTML = pages[cur].html();
      void page.offsetWidth;
      $$('#steps i', root).forEach((el, i) => el.classList.toggle('on', i <= cur));
      $$('#outline button', root).forEach((b, i) => { b.toggleAttribute('aria-current', i === cur); if (i === cur) b.setAttribute('aria-current', 'step'); else b.removeAttribute('aria-current'); b.classList.toggle('seen', seen.has(i) && i !== cur); });
      const last = cur === pages.length - 1;
      next.innerHTML = last ? `${icon('check')}<span>Zurück zum Lernpfad</span>` : `<span>${nextLabel()}</span>${icon('arrow', 'go')}`;
      prev.style.visibility = cur === 0 ? 'hidden' : 'visible';
      bindPage();
      window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
    }
    const nextLabel = () => { const k = pages[cur + 1].k; return { rezept: 'Weiter zum Rezept', beispiel: 'Weiter zum Beispiel', fehler: 'Typische Fehler', test: 'Zum Selbsttest', ende: 'Abschließen' }[k] || 'Weiter'; };
    function go(d) {
      const n = cur + d;
      if (n < 0) return;
      if (n >= pages.length) { location.hash = '#/fach/mathe'; return; }
      cur = n; dir = d; show();
    }
    function bindPage() {
      // Rezept: abhaken
      $$('.recipe li', page).forEach(li => {
        const t = () => li.classList.toggle('done');
        li.addEventListener('click', t);
        li.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); t(); } });
      });
      // Beispiel: Schritt für Schritt aufdecken
      const rb = $('#revealBtn', page);
      if (rb) {
        const items = $$('#steps .reveal', page);
        let n = 0;
        rb.addEventListener('click', () => {
          if (n < items.length) { items[n].classList.add('open'); items[n].scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'center' }); n++; }
          const label = $('span', rb);
          label.textContent = n >= items.length ? 'Alle Schritte gesehen' : `Schritt ${n + 1} von ${items.length} zeigen`;
          if (n >= items.length) rb.setAttribute('disabled', '');
        });
        const label = $('span', rb);
        label.textContent = 'Ersten Schritt zeigen';
      }
      const dh = $('#demoHost', page);
      if (dh) (dh.dataset.demo === 'ortskurve' ? demoOrt : demoBestand)(dh);
      const fh = $('#flashHost', page);
      if (fh) flash(fh, l.test);
      const db = $('#doneBtn', page);
      if (db) db.addEventListener('click', () => {
        if (state.done[l.id]) delete state.done[l.id]; else state.done[l.id] = true;
        save(); page.innerHTML = pages[cur].html(); bindPage();
      });
    }
    next.addEventListener('click', () => go(1));
    prev.addEventListener('click', () => go(-1));
    $$('#outline button', root).forEach(b => b.addEventListener('click', () => { const n = +b.dataset.p; dir = n >= cur ? 1 : -1; cur = n; show(); }));
    // Tastatur & Wischen
    const key = e => { if (!root.isConnected) { removeEventListener('keydown', key); return; } if (/INPUT|TEXTAREA/.test((e.target || {}).tagName || '')) return; if (e.key === 'ArrowRight') go(1); if (e.key === 'ArrowLeft') go(-1); };
    addEventListener('keydown', key);
    let sx = 0, sy = 0;
    root.addEventListener('touchstart', e => { sx = e.touches[0].clientX; sy = e.touches[0].clientY; }, { passive: true });
    root.addEventListener('touchend', e => { const dx = e.changedTouches[0].clientX - sx, dy = e.changedTouches[0].clientY - sy; if (Math.abs(dx) > 70 && Math.abs(dy) < 50 && !e.target.closest('.demo,.katex-display,.mt-scroll,input')) go(dx < 0 ? 1 : -1); }, { passive: true });
    show();
  }

  function flash(host, cards) {
    let i = 0, known = 0;
    function draw() {
      if (i >= cards.length) { host.innerHTML = `<div class="done-wrap"><div class="done-badge">${icon('check')}</div><h3 class="h-1">${known} von ${cards.length} gewusst</h3><p class="muted">Was du nicht wusstest, liest du am besten noch einmal im Rezept nach.</p><button class="btn" id="again" type="button">${icon('flip')}Nochmal</button></div>`; $('#again', host).onclick = () => { i = 0; known = 0; draw(); }; return; }
      const c = cards[i];
      host.innerHTML = `<div class="flash-count"><span class="kicker">Frage ${i + 1} von ${cards.length}</span>${bar(((i) / cards.length).toFixed(2)).replace('class="bar"', 'class="bar go" style="width:120px;--p:' + (i / cards.length).toFixed(2) + '"')}</div>
        <div class="flash" id="fc"><div class="flash-in"><div class="face"><span class="kicker">Frage</span>${prose(c.q)}<span class="dim" style="font-size:13px;margin-top:6px">Tippen zum Umdrehen</span></div><div class="face back"><span class="kicker" style="color:var(--accent-ink)">Antwort</span>${prose(c.a)}</div></div></div>
        <div class="rate" id="rate" hidden><button class="btn" data-r="0" type="button">Nochmal üben</button><button class="btn primary" data-r="1" type="button">${icon('check')}Gewusst</button></div>`;
      const fc = $('#fc', host), rate = $('#rate', host);
      const flip = () => { fc.classList.add('flip'); rate.hidden = false; };
      fc.addEventListener('click', flip);
      $$('[data-r]', host).forEach(b => b.addEventListener('click', () => { known += +b.dataset.r; i++; draw(); }));
    }
    draw();
  }

  // ---- Interaktive Demos (SVG, per Finger/Maus bedienbar)
  function demoBestand(host) {
    const W = 640, H = 290, x0 = 48, x1 = 612, yT = 18, yB = 258, T = 4.5, vmin = -5, vmax = 10;
    const sx = t => x0 + t / T * (x1 - x0), sy = v => yB - (v - vmin) / (vmax - vmin) * (yB - yT);
    const f = t => 9 - 3 * t, B = t => 8 + 9 * t - 1.5 * t * t;
    const pts = a => { let d = ''; for (let i = 0; i <= 60; i++) { const t = a[0] + (a[1] - a[0]) * i / 60; d += (i ? 'L' : 'M') + sx(t).toFixed(1) + ' ' + sy(f(t)).toFixed(1); } return d; };
    host.innerHTML = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Rate f(t) und Bestand B(t)">
      <line x1="${x0}" x2="${x1}" y1="${sy(0)}" y2="${sy(0)}" style="stroke:var(--line-2)"/>
      <path id="dPos" style="fill:color-mix(in oklab,var(--subj) 45%,transparent)"/><path id="dNeg" style="fill:color-mix(in oklab,var(--bad) 45%,transparent)"/>
      <path d="${pts([0, T])}" fill="none" style="stroke:var(--text);stroke-width:2.5"/>
      <line id="dCur" y1="${yT}" y2="${yB}" style="stroke:var(--subj);stroke-width:2;stroke-dasharray:4 4"/><circle id="dDot" r="7" style="fill:var(--subj);stroke:var(--bg);stroke-width:3"/>
      <text x="${x1}" y="${sy(0) - 8}" text-anchor="end" style="fill:var(--text-3);font:600 12px var(--font-ui)">t in Stunden</text>
      <text x="${x0 + 6}" y="${yT + 12}" style="fill:var(--text-3);font:600 12px var(--font-ui)">f(t) in m³/h</text></svg>
      <input class="slider" id="dSl" type="range" min="0" max="${T}" step="0.05" value="2" aria-label="Zeit t">
      <div class="read"><span>t = <b id="rT"></b> h</span><span>f(t) = <b id="rF"></b> m³/h</span><span>Bestand B(t) = <b id="rB"></b> m³</span></div>
      <div class="bar go" style="margin-top:12px;--p:0" id="dBar"><i></i></div>`;
    const sl = $('#dSl', host);
    function upd() {
      const t = +sl.value;
      const pos = t <= 3 ? [0, t] : [0, 3], neg = t > 3 ? [3, t] : null;
      const area = a => pts(a) + `L${sx(a[1]).toFixed(1)} ${sy(0)}L${sx(a[0]).toFixed(1)} ${sy(0)}Z`;
      $('#dPos', host).setAttribute('d', t > 0 ? area(pos) : '');
      $('#dNeg', host).setAttribute('d', neg ? area(neg) : '');
      $('#dCur', host).setAttribute('x1', sx(t)); $('#dCur', host).setAttribute('x2', sx(t));
      $('#dDot', host).setAttribute('cx', sx(t)); $('#dDot', host).setAttribute('cy', sy(f(t)));
      $('#rT', host).textContent = fmt(t); $('#rF', host).textContent = fmt(f(t)); $('#rB', host).textContent = fmt(B(t));
      $('#dBar', host).style.setProperty('--p', Math.max(0, B(t) / 22).toFixed(3));
    }
    sl.addEventListener('input', upd); upd();
  }
  function demoOrt(host) {
    const W = 640, H = 320, x0 = 20, x1 = 620, yT = 14, yB = 306, xr = 3, yr = 13;
    const sx = x => (x0 + x1) / 2 + x / xr * (x1 - x0) / 2, sy = y => (yT + yB) / 2 - y / yr * (yB - yT) / 2;
    const fk = (k, x) => x * x * x - 3 * k * x;
    const curve = k => { let d = ''; for (let i = 0; i <= 120; i++) { const x = -xr + 2 * xr * i / 120; d += (i ? 'L' : 'M') + sx(x).toFixed(1) + ' ' + sy(fk(k, x)).toFixed(1); } return d; };
    let ort = ''; for (let i = 0; i <= 80; i++) { const x = -Math.sqrt(3) + 2 * Math.sqrt(3) * i / 80; ort += (i ? 'L' : 'M') + sx(x).toFixed(1) + ' ' + sy(-2 * x * x * x).toFixed(1); }
    host.innerHTML = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Schar und Ortskurve">
      <defs><clipPath id="clp"><rect x="${x0}" y="${yT}" width="${x1 - x0}" height="${yB - yT}"/></clipPath></defs>
      <line x1="${x0}" x2="${x1}" y1="${sy(0)}" y2="${sy(0)}" style="stroke:var(--line-2)"/><line x1="${sx(0)}" x2="${sx(0)}" y1="${yT}" y2="${yB}" style="stroke:var(--line-2)"/>
      <g clip-path="url(#clp)"><path d="${ort}" fill="none" style="stroke:var(--info);stroke-width:2;stroke-dasharray:6 5"/><g id="trail"></g><path id="oc" fill="none" style="stroke:var(--text);stroke-width:2.8"/></g>
      <circle id="mx" r="7" style="fill:var(--accent);stroke:var(--bg);stroke-width:3"/><circle id="mn" r="7" style="fill:var(--accent);stroke:var(--bg);stroke-width:3"/>
      <text x="${x0 + 8}" y="${yB - 10}" style="fill:var(--info);font:700 15px var(--font-ui)">gestrichelt: Ortskurve y = −2x³</text></svg>
      <input class="slider" id="kSl" type="range" min="0.2" max="3" step="0.05" value="1.5" aria-label="Parameter k">
      <div class="read"><span>k = <b id="rk"></b></span><span>Tiefpunkt (<b id="rx"></b> | <b id="ry"></b>)</span></div>`;
    const sl = $('#kSl', host);
    function upd() {
      const k = +sl.value, r = Math.sqrt(k);
      $('#oc', host).setAttribute('d', curve(k));
      $('#mn', host).setAttribute('cx', sx(r)); $('#mn', host).setAttribute('cy', sy(fk(k, r)));
      $('#mx', host).setAttribute('cx', sx(-r)); $('#mx', host).setAttribute('cy', sy(fk(k, -r)));
      let tr = ''; for (let kk = 0.2; kk <= k + 1e-9; kk += 0.15) { const q = Math.sqrt(kk); tr += `<circle cx="${sx(q)}" cy="${sy(fk(kk, q))}" r="3" style="fill:var(--info)"/><circle cx="${sx(-q)}" cy="${sy(fk(kk, -q))}" r="3" style="fill:var(--info)"/>`; }
      $('#trail', host).innerHTML = tr;
      $('#rk', host).textContent = fmt(k, 2); $('#rx', host).textContent = fmt(r, 2); $('#ry', host).textContent = fmt(fk(k, r), 2);
    }
    sl.addEventListener('input', upd); upd();
  }

  // ---- Aufgabe
  function figSvg(f) {
    if (!f) return '';
    const W = 600, H = 340, m = 34;
    const sx = x => m + (x - f.xmin) / (f.xmax - f.xmin) * (W - 2 * m), sy = y => H - m - (y - f.ymin) / (f.ymax - f.ymin) * (H - 2 * m);
    let g = '';
    for (let x = Math.ceil(f.xmin); x <= f.xmax; x++) g += `<line x1="${sx(x)}" x2="${sx(x)}" y1="${m / 2}" y2="${H - m / 2}" style="stroke:var(--line)"/><text x="${sx(x)}" y="${H - m / 2 + 14}" text-anchor="middle" style="fill:var(--text-3);font:600 15px var(--font-ui)">${x}</text>`;
    for (let y = Math.ceil(f.ymin); y <= f.ymax; y += (f.ymax - f.ymin > 12 ? 2 : 1)) g += `<line y1="${sy(y)}" y2="${sy(y)}" x1="${m / 2}" x2="${W - m / 2}" style="stroke:var(--line)"/><text x="${m / 2 - 2}" y="${sy(y) + 4}" text-anchor="end" style="fill:var(--text-3);font:600 15px var(--font-ui)">${y}</text>`;
    let d = '';
    if (f.kind === 'fn') { for (let i = 0; i <= 160; i++) { const x = f.xmin + (f.xmax - f.xmin) * i / 160, y = f.f(x); d += (i ? 'L' : 'M') + sx(x).toFixed(1) + ' ' + sy(Math.max(f.ymin - 2, Math.min(f.ymax + 2, y))).toFixed(1); } }
    else if (f.kind === 'pw') d = f.pts.map((p, i) => (i ? 'L' : 'M') + sx(p[0]).toFixed(1) + ' ' + sy(p[1]).toFixed(1)).join('');
    else return '';
    return `<div class="fig"><svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${f.title || 'Graph'}"><defs><clipPath id="fc"><rect x="${m / 2}" y="${m / 2}" width="${W - m}" height="${H - m}"/></clipPath></defs>${g}<line x1="${m / 2}" x2="${W - m / 2}" y1="${sy(0)}" y2="${sy(0)}" style="stroke:var(--text-3)"/><line x1="${sx(0)}" x2="${sx(0)}" y1="${m / 2}" y2="${H - m / 2}" style="stroke:var(--text-3)"/><path clip-path="url(#fc)" d="${d}" fill="none" style="stroke:var(--subj);stroke-width:3;stroke-linejoin:round"/></svg><div class="dim" style="font-size:13px;padding:6px 6px 2px">${f.title || ''}</div></div>`;
  }

  R.aufgabe = (id) => {
    const t = TASKS.find(x => x.id === id);
    if (!t) return R.faecher();
    const ms = byId.mathe;
    const parts = t.parts.map(p => {
      const nums = (p.nums || []).map((n, i) => `<span class="field"><label for="${p.id}-n${i}">${n.label}</label><input id="${p.id}-n${i}" data-ans="${n.ans}" data-tol="${n.tol || 0.01}" inputmode="decimal" autocomplete="off" placeholder="Zahl"><button class="btn small" type="button" data-check="${p.id}-n${i}">Prüfen</button></span>`).join('');
      const scoreBtns = Array.from({ length: (p.be || 0) + 1 }, (_, v) => `<button type="button" data-p="${p.id}" data-v="${v}" class="${(state.scores[p.id] || 0) === v && state.scores[p.id] !== undefined ? 'on' : ''}">${v}</button>`).join('');
      return `<section class="part" id="part-${p.id}">
        <div class="part-head"><span class="lab">${p.label}</span><span class="chip be">${p.be} BE</span></div>
        ${prose(p.text)}
        <textarea class="work" data-ans-key="${p.id}" placeholder="Dein Lösungsweg (wird nur hier gespeichert)">${(state.answers && state.answers[p.id]) || ''}</textarea>
        <div class="tools">${nums}${(p.hints && p.hints.length) ? `<button class="btn small" type="button" data-hint="${p.id}">${icon('bulb')}<span>Tipp 1 von ${p.hints.length}</span></button>` : ''}<button class="btn small primary" type="button" data-sol="${p.id}">${icon('eye')}Musterlösung</button></div>
        <div id="hints-${p.id}"></div>
        <div class="reveal" id="sol-${p.id}"><div><div class="inner"><div class="hint" style="background:color-mix(in oklab,var(--ok) 10%,transparent)">${icon('check').replace('class="i "', 'class="i " style="color:var(--ok)"')}${prose(p.sol)}</div>
          <div class="score"><span class="kicker" style="margin-right:6px">Ehrlich bewertet</span>${scoreBtns}<span class="dim">von ${p.be} BE</span></div></div></div></div>
      </section>`;
    }).join('');
    const html = `<div ${subjStyle(ms)} class="rise"><div class="page-head"><span class="kicker">Teil ${t.teil} · AFB ${t.afb} · ${taskMax(t)} BE</span><h2 class="h-1">${t.title}</h2><p class="dim" style="font-size:14px">${t.ops} · angelehnt an Zentralabitur-Aufgabenformate, nicht offiziell</p></div>
      ${prose(t.intro || '')}${figSvg(t.fig)}${parts}</div>`;
    return {
      title: t.title, back: '#/fach/mathe/ueben', nav: 'faecher', focus: true, html,
      after(root) {
        $$('[data-check]', root).forEach(b => b.addEventListener('click', () => {
          const inp = document.getElementById(b.dataset.check), box = inp.closest('.field');
          const v = parseFloat(inp.value.replace(',', '.'));
          const ok = !isNaN(v) && Math.abs(v - +inp.dataset.ans) <= +inp.dataset.tol * Math.max(1, Math.abs(+inp.dataset.ans));
          box.classList.remove('ok', 'bad'); void box.offsetWidth; box.classList.add(ok ? 'ok' : 'bad');
        }));
        $$('[data-hint]', root).forEach(b => {
          const p = t.parts.find(x => x.id === b.dataset.hint); let n = 0;
          b.addEventListener('click', () => {
            if (n >= p.hints.length) return;
            $('#hints-' + p.id, root).insertAdjacentHTML('beforeend', `<div class="hint">${icon('bulb')}${prose(p.hints[n])}</div>`);
            n++; $('span', b).textContent = n >= p.hints.length ? 'Alle Tipps gezeigt' : `Tipp ${n + 1} von ${p.hints.length}`;
            if (n >= p.hints.length) b.setAttribute('disabled', '');
          });
        });
        $$('[data-sol]', root).forEach(b => b.addEventListener('click', () => { const r = $('#sol-' + b.dataset.sol, root); r.classList.toggle('open'); }));
        $$('.score button', root).forEach(b => b.addEventListener('click', () => {
          state.scores[b.dataset.p] = +b.dataset.v; save();
          $$(`.score button[data-p="${b.dataset.p}"]`, root).forEach(x => x.classList.toggle('on', x === b));
        }));
        $$('textarea.work', root).forEach(ta => ta.addEventListener('input', () => { state.answers = state.answers || {}; state.answers[ta.dataset.ansKey] = ta.value; save(); }));
      }
    };
  };

  // ------------------------------------------------------------ Router & Shell
  const view = $('#view'), title = $('#appTitle'), backBtn = $('#backBtn');
  let backHref = null, lastKey = null;

  function parse() {
    const h = (location.hash || '#/').replace(/^#\/?/, '').split('/').filter(Boolean);
    const [a, b, c] = h.map(decodeURIComponent);
    if (!a) return ['heute'];
    if (a === 'faecher' || a === 'plan') return [a];
    if (a === 'fach') return ['fach', b, c === 'ueben' ? 'ueben' : c === 'klausur' ? 'klausur' : 'pfad'];
    if (a === 'lektion') return ['lektion', b];
    if (a === 'aufgabe') return ['aufgabe', b];
    return ['heute'];
  }

  function mount(opts = {}) {
    const r = parse();
    const res = R[r[0]](...r.slice(1));
    view.classList.toggle('still', !!opts.still);
    view.innerHTML = res.html;
    document.body.classList.toggle('focus', !!res.focus);
    title.textContent = res.title;
    backHref = res.back || null;
    backBtn.hidden = !backHref;
    setNav(res.nav);
    document.title = `${res.title} · Lernraum`;
    requestAnimationFrame(() => {
      $$('.fill', view).forEach(e => e.classList.add('go'));
      $$('.bar', view).forEach(e => e.classList.add('go'));
      $$('[data-count]', view).forEach(countUp);
      initSegs(view);
      initHero();
      if (res.after) res.after(view);
    });
    return res;
  }
  function go(opts) {
    const key = location.hash;
    const same = opts && opts.still;
    const run = () => { const res = mount(opts); if (!same) window.scrollTo(0, 0); lastKey = key; return res; };
    if (!same && document.startViewTransition && !reduced) document.startViewTransition(run); else run();
  }

  function setNav(name) {
    const items = ['heute', 'faecher', 'plan'];
    const idx = Math.max(0, items.indexOf(name));
    $$('[data-route]').forEach(a => a.toggleAttribute('aria-current', false));
    $$('[data-route]').forEach(a => { if (a.dataset.route === name) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current'); });
    $('#navPill').style.setProperty('--y', idx * 52 + 'px');
    $('#tabPill').style.setProperty('--x', idx * 100 + '%');
  }

  function initSegs(root) {
    $$('.seg', root).forEach(sg => {
      const pill = $('.seg-pill', sg), a = $('[aria-selected="true"]', sg);
      if (!a) return;
      const set = () => { pill.style.setProperty('--x', a.offsetLeft - 4 + 'px'); pill.style.setProperty('--w', a.offsetWidth + 'px'); };
      set();
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(set);
    });
  }
  function countUp(el) {
    const to = +el.dataset.count; if (reduced || !to) return;
    const t0 = performance.now();
    (function step(t) { const p = Math.min(1, (t - t0) / 900); el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(step); })(t0);
  }
  function initHero() {
    const h = $('.hero', view); if (!h) return;
    h.addEventListener('pointermove', e => { const r = h.getBoundingClientRect(); h.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100).toFixed(1) + '%'); h.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100).toFixed(1) + '%'); });
  }

  // Segmente (delegiert)
  view.addEventListener('click', e => {
    const b = e.target.closest('.seg button'); if (!b) return;
    const sg = b.closest('.seg'), id = sg.dataset.seg, v = b.dataset.v;
    if (id.startsWith('fachtab:')) { location.hash = `#/fach/${id.split(':')[1]}/${v === 'pfad' ? '' : v}`; return; }
    if (id === 'plan') state.planTab = v;
    if (id === 'week') state.week = v;
    if (id === 'day') state.day = +v;
    save(); go({ still: true });
  });

  // Theme
  function setTheme(t) {
    document.documentElement.setAttribute('data-theme', t);
    try { localStorage.setItem('neu_theme', t); } catch (e) { /* egal */ }
    $$('#themeBtnSide use, #themeBtnTop use').forEach(u => u.setAttribute('href', t === 'dark' ? '#i-sun' : '#i-moon'));
    const m = $('meta[name="theme-color"]'); if (m) m.content = t === 'dark' ? '#090b10' : '#f3f4ef';
  }
  const toggle = () => setTheme(document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
  $('#themeBtnSide').addEventListener('click', toggle); $('#themeBtnTop').addEventListener('click', toggle);
  setTheme(document.documentElement.getAttribute('data-theme'));

  backBtn.addEventListener('click', () => { if (backHref) location.hash = backHref; });
  addEventListener('scroll', () => $('#appbar').classList.toggle('scrolled', scrollY > 6), { passive: true });
  addEventListener('hashchange', () => go());
  addEventListener('resize', () => initSegs(view));
  go();
})();
