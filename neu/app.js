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
  const KMACROS = { '\\res': '\\boxed{#1}' }; // hervorgehobenes Ergebnis im Rechenweg
  function M(s) {
    if (!s) return '';
    if (!window.katex) return s;
    return s.replace(/\$\$([\s\S]+?)\$\$|\$([^$\n]+?)\$/g, (m, a, b) => {
      try { return katex.renderToString((a || b).trim(), { displayMode: !!a, throwOnError: false, macros: KMACROS }); } catch (e) { return m; }
    });
  }
  const prose = html => `<div class="prose">${M(html)}</div>`;

  // Nutzereingaben (Profilnamen) nie roh als HTML einsetzen (Portalplan 10.6)
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  // ------------------------------------------------------------ Profil & Zustand (pro Profil, Portalplan 11.1)
  const me = LR.active();
  function loadState() {
    const s = LR.loadState();
    ['done', 'scores', 'answers'].forEach(k => { if (!s[k] || typeof s[k] !== 'object') s[k] = {}; });
    if (!s.planTab) s.planTab = 'lernplan';
    if (!s.week) s.week = 'all';
    const first = LR.profiles()[0];
    if (me && first && first.id === me.id) {
      try { // nur das erste Profil übernimmt gelernte Lektionen aus dem alten Mathe-Trainer
        const old = JSON.parse(localStorage.getItem('mt_state_v1') || 'null');
        if (old && old.done) Object.keys(old.done).forEach(k => { if (old.done[k] && s.done[k] === undefined) s.done[k] = true; });
      } catch (e) { /* egal */ }
    }
    return s;
  }
  const state = me ? loadState() : { done: {}, scores: {}, answers: {} };
  const save = () => { if (me) LR.saveState(state); };
  const myCourses = me && me.courses && me.courses.length ? new Set(me.courses) : null;
  const mine = id => !myCourses || !id || myCourses.has(id);

  // ------------------------------------------------------------ Klausuren / Stundenplan
  const exams = (typeof TONDA_KLAUSUREN !== 'undefined' ? TONDA_KLAUSUREN : []).map(k => {
    const fid = (typeof KLAUSUR_FACH_IDS !== 'undefined' && KLAUSUR_FACH_IDS[k.subject]) || null;
    return Object.assign({}, k, { fid, days: klausurDaysUntil(k), date: parseKlausurDate(k.dateStr) });
  }).filter(k => mine(k.fid)).sort((a, b) => a.date - b.date);
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
      cell.forEach(sl => { const sj = subjOfCourse(sl.course); if ((week === 'all' || !sl.week || sl.week === week) && (!sj || mine(sj.id))) out.push(Object.assign({ p }, sl)); });
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

  // ---- Heute (Portalplan Abschnitt 8: eine Frage – was jetzt?)
  const MONTHS_LONG = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];

  // Abruf-Karten kommen aus der Wiederholungs-Queue (wiederholen.js, Abstände 1–3–7–21 Tage)
  const recallPool = force => (window.LRWdh ? LRWdh.dueCards(force) : []);
  // Teilaufgaben, bei denen Punkte gefehlt haben (Fehler-Segment des Rings)
  function lostParts() {
    const out = [];
    if (!mine('mathe')) return out;
    TASKS.forEach(t => t.parts.forEach(p => { const v = state.scores[p.id]; if (v !== undefined && v < (p.be || 0)) out.push({ t, p, v }); }));
    return out;
  }

  // Nächster Schritt: fälliger Abruf > angefangene Lektion > Fehler ausbessern > neue Lektion > Üben
  function nextStep(st) {
    const ps = window.LRStruktur && LRStruktur.nextPlanStep(); // erster offener Eintrag im Lernplan
    if (ps) return ps;
    const ms = byId.mathe;
    if (!mine('mathe') || !LESSONS.length) return null;
    const pool = recallPool(false);
    if (!st.ring.seg[0] && pool.length) return { kicker: 'Wiederholen', title: `${Math.min(5, pool.length)} ${pool.length === 1 ? 'Karte ist' : 'Karten sind'} heute fällig`, sub: 'Erst im Kopf antworten, dann umdrehen. Was du nicht wusstest, kommt morgen wieder.', min: 3, href: '#/abruf', s: ms, ic: 'flip' };
    const cont = state.last && LESSONS.find(l => l.id === state.last.id && !state.done[l.id]);
    if (cont) return { kicker: 'Weiter, wo du aufgehört hast', title: `Lektion ${cont.num}: ${cont.title}`, sub: cont.short, min: cont.min, href: `#/lektion/${cont.id}`, s: ms, ic: 'play' };
    const hd = window.LRWdh ? LRWdh.huntState().due.length : 0;
    if (!st.ring.seg[2] && hd) return { kicker: 'Fehlerjagd', title: `${hd} ${hd === 1 ? 'Fehler ist' : 'Fehler sind'} wieder dran`, sub: 'Nur die Stelle neu rechnen, an der es gehakt hat. Dann vergleichen.', min: 5, href: '#/jagd', s: ms, ic: 'target' };
    const lost = lostParts();
    if (!st.ring.seg[2] && lost.length) { const { t, p, v } = lost[0]; return { kicker: 'Fehler ausbessern', title: `${t.title} · ${p.label}`, sub: `Beim letzten Mal ${v} von ${p.be} BE. Rechne den Teil nochmal auf Papier und hol dir die fehlenden Punkte.`, min: 8, href: `#/aufgabe/${t.id}`, s: ms, ic: 'target' }; }
    const nl = LESSONS.find(l => !state.done[l.id]);
    if (nl) return { kicker: 'Neu lernen', title: `Lektion ${nl.num}: ${nl.title}`, sub: nl.short, min: nl.min, href: `#/lektion/${nl.id}`, s: ms, ic: 'play' };
    const open = TASKS.find(t => t.parts.some(p => state.scores[p.id] === undefined));
    if (open) return { kicker: 'Üben', title: open.title, sub: `Teil ${open.teil} · ${taskMax(open)} BE · auf Papier lösen, dann ehrlich bewerten`, min: 15, href: `#/aufgabe/${open.id}`, s: ms, ic: 'pencil' };
    return { kicker: 'Wiederholen', title: 'Abruf aus allen Lektionen', sub: 'Alles einmal geschafft. Jetzt hält Wiederholen es frisch.', min: 3, href: '#/abruf', s: ms, ic: 'flip' };
  }

  const SEG = [['Abruf', 'var(--info)'], ['Neu', 'var(--ok)'], ['Fehler', 'var(--warn)']];
  function goalRing(seg, size = 116) {
    const L = 100 / 3, gap = 3.5;
    const arc = (i, cls) => `<circle class="${cls}" style="--c:${SEG[i][1]};--d:${i * 0.18}s" cx="50" cy="50" r="42" pathLength="100" stroke-dasharray="${(L - gap).toFixed(2)} ${(100 - L + gap).toFixed(2)}" stroke-dashoffset="${(-i * L - gap / 2).toFixed(2)}"/>`;
    const done = seg.filter(Boolean).length;
    return `<div class="goal-ring" style="--size:${size}px" role="img" aria-label="Ziel-Ring: ${done} von 3 Segmenten">
      <svg viewBox="0 0 100 100">${seg.map((_, i) => arc(i, 'g-track')).join('')}${seg.map((on, i) => on ? arc(i, 'g-on') : '').join('')}</svg>
      <div class="mid"><b class="num">${done}</b><span class="kicker">von 3</span></div></div>`;
  }
  function heat(st) {
    const cal = LR.calendar(st, 4);
    return `<div class="heat" role="img" aria-label="Lerntage der letzten vier Wochen">${['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'].map(d => `<span class="heat-h">${d}</span>`).join('')}${cal.map(c => `<span class="hc l${c.lvl}${c.freeze ? ' fz' : ''}${c.today ? ' td' : ''}${c.future ? ' fu' : ''}" title="${c.k.split('-').reverse().join('.')}: ${c.n} ${c.n === 1 ? 'Aktion' : 'Aktionen'}${c.freeze ? ' · Schutz-Tag' : ''}"></span>`).join('')}</div>`;
  }

  R.heute = () => {
    const st = LR.stats(LR.events());
    const now = new Date();
    const blocks = [];
    const head = `<div class="page-head"><span class="kicker">${WD[now.getDay()]}, ${now.getDate()}. ${MONTHS_LONG[now.getMonth()]}</span>
      <h2 class="h-display">${st.comeback ? 'Willkommen zurück' : 'Hallo'}, ${esc(me.name)}.</h2>
      ${st.comeback ? '<p class="muted">Schön, dass du wieder da bist. Fünf Minuten reichen heute völlig.</p>' : ''}
      ${state.tomorrow && state.tomorrow.day === st.today ? `<p class="muted plan-yday">${icon('flag')}Gestern vorgenommen: <a class="link" href="${state.tomorrow.href}">${esc(state.tomorrow.title)}</a></p>` : ''}</div>`;
    const wi = window.LRWdh ? LRWdh.heuteInfo() : null;

    // 1) Nächster Schritt – eine große Karte, ein Knopf
    const ns = nextStep(st);
    blocks.push(ns ? `<a class="next" href="${ns.href}" ${subjStyle(ns.s)}>
        <div class="next-top"><span class="next-ico">${icon(ns.ic)}</span><span class="kicker">Nächster Schritt · ${ns.s.name.replace(/ (eA|gA)$/, '')}</span><span class="chip">${icon('clock')}${ns.min} Min.</span></div>
        <h3 class="h-1 next-title">${ns.title}</h3>
        <p class="muted next-sub">${ns.sub}</p>
        <span class="btn primary next-btn">Start ${icon('arrow', 'go')}</span></a>`
      : `<div class="next" style="--subj:var(--accent)"><span class="kicker">Nächster Schritt</span><h3 class="h-1 next-title">Noch keine Inhalte für deine Kurse</h3><p class="muted next-sub">Die Lerninhalte für alle Fächer kommen, sobald das Fundament des Lernraums steht.</p></div>`);
    if (wi && wi.session) {
      const s = wi.session, left = wi.phaseLeft(s);
      blocks.push(`<a class="sess-run" href="#/session"><span class="sess-dot"></span><span class="row-main"><span class="row-title">${esc(wi.modes[s.mode].name)} läuft</span><span class="row-sub">${wi.phaseName(s)} · ${left <= 0 ? 'Zeit um' : wi.mmss(left) + ' übrig'}</span></span><span class="btn small primary">Weiter ${icon('arrow', 'go')}</span></a>`);
    } else if (wi) {
      blocks.push(`<div class="time-pick"><span class="kicker">Wie viel Zeit hast du?</span><div class="tp-chips"><a class="chip" href="#/session/m3">3 Min.</a><a class="chip" href="#/session/m10">10 Min.</a><a class="chip" href="#/session/m20">20 Min.</a><a class="chip" href="#/session">Fokusblock</a></div></div>`);
    }

    // 2) Ziel-Ring + Streak + Kalender
    const r = st.ring;
    const goalRow = (i, have, need, txt, href) => `<li class="${have >= need ? 'done' : ''}" style="--c:${SEG[i][1]}">${href ? `<a class="g-link" href="${href}">` : '<div class="g-link">'}<span class="g-dot">${icon('check')}</span><span class="row-main"><span class="row-title">${SEG[i][0]}</span><span class="row-sub">${txt}</span></span><span class="g-n">${Math.min(have, need)}/${need}</span>${href ? '</a>' : '</div>'}</li>`;
    blocks.push(`<section class="daily">
      <div class="card goal">${goalRing(r.seg)}
        <ul class="goal-list">
          ${goalRow(0, r.recall, LR.GOAL.recall, wi && wi.cardsDue ? `${wi.cardsDue} ${wi.cardsDue === 1 ? 'Karte' : 'Karten'} heute fällig` : 'Karten aus dem Kopf beantworten', '#/abruf')}
          ${goalRow(1, r.learn, LR.GOAL.learn, 'eine Lektion oder Aufgabe')}
          ${goalRow(2, r.fix, LR.GOAL.fix, wi && wi.huntDue ? `${wi.huntDue} ${wi.huntDue === 1 ? 'Fehler' : 'Fehler'} wieder dran` : wi && wi.huntOpen ? `${wi.huntOpen} offen, heute keiner dran` : 'Fehler neu rechnen oder Punkte zurückholen', '#/fehlerjagd')}
        </ul></div>
      <div class="card streakbox">
        <div class="streak-top"><div><span class="kicker">Abi-Training · Tag ${st.trainingDays || 1}</span>
          <div class="streak-n"><b class="num" data-count="${st.streak}">${st.streak}</b><span>${st.streak === 1 ? 'Tag' : 'Tage'} in Folge</span></div></div>
</div>
        ${heat(st)}
        <div class="row-sub streak-foot">${st.best > st.streak ? `Bestwert ${st.best} Tage · ` : ''}Ein Segment am Tag reicht für den Streak. <a class="link" href="#/verlauf">Ganzer Kalender</a></div>
      </div></section>`);

    // 3) Eine Zeile: nächste Klausur
    const next = upcoming[0];
    if (next) {
      const s = byId[next.fid];
      const li = window.LRKlausur ? LRKlausur.lineInfo(next) : { ready: null, phase: '' };
      blocks.push(`<a class="exam-line" href="#/klausur/${next.id}" ${subjStyle(s)}><span class="dot"></span><span class="row-main"><span class="row-title">${s ? s.name.replace(/ (eA|gA)$/, '') : next.subject}-Klausur ${next.days === 0 ? 'heute' : next.days === 1 ? 'morgen' : daysText(next.days)}</span><span class="row-sub">${li.phase ? `<b>Countdown ${li.phase}</b> · ` : ''}${WD[next.date.getDay()]}, ${next.dateStr.slice(0, 6)} · ${next.period} Stunde · Raum ${next.room}</span></span>${li.ready != null ? `<span class="ready-chip" title="Klausurbereitschaft">${li.ready} %</span>` : ''}${icon('right', 'chev')}</a>`);
    }

    // 4) Unterricht heute / nächster Schultag (nur eigene Kurse)
    let off = 0, dk = DAYKEYS[now.getDay()];
    while ((!['Mo', 'Di', 'Mi', 'Do', 'Fr'].includes(dk) || !daySlots(dk, 'all').length) && off < 7) { off++; dk = DAYKEYS[(now.getDay() + off) % 7]; }
    const groups = groupSlots(daySlots(dk, 'all'));
    if (groups.length) {
      const label = off === 0 ? 'Heute im Unterricht' : off === 1 ? 'Morgen im Unterricht' : `${WD[(now.getDay() + off) % 7]} im Unterricht`;
      blocks.push(`<section><div class="section-head"><h3 class="h-2">${label}</h3><a class="chip" href="#/plan">Plan ${icon('right')}</a></div>
        <div class="day">${groups.map(g => { const s = subjOfCourse(g.course); return `<div class="slot" ${subjStyle(s)}><span class="kicker">${rangeText(g)}${g.week ? ' · ' + g.week + '-Woche' : ''}</span><b>${s ? s.name.replace(/ (eA|gA)$/, '') : g.course}</b><span class="row-sub">${g.teacher} · ${g.room}</span></div>`; }).join('')}</div></section>`);
    }

    return { title: 'Heute', html: `${head}<div class="rise stack" style="display:flex;flex-direction:column;gap:22px">${blocks.map((b, i) => rise(b, i)).join('')}</div>`, nav: 'heute' };
  };

  // ---- Abruf (kurz, zählt fürs Ring-Segment „Abruf“)
  R.abruf = (arg) => {
    const ms = byId.mathe;
    const force = arg === 'alle';
    const pool = recallPool(force).slice(0, 5);
    const head = `<div class="page-head"><span class="kicker">Abruf · ca. 3 Min.</span><h2 class="h-1">Was weißt du noch?</h2><p class="muted">Karten aus Lektionen, die du schon verstanden hast. Richtig: Sie kommen in 1, 3, 7, 21 Tagen wieder. Falsch: morgen.</p></div>`;
    if (!pool.length && !force && recallPool(true).length) {
      return { title: 'Abruf', back: '#/wiederholen', nav: 'wdh', focus: true, html: `<div ${subjStyle(ms)} class="rise">${head}<div class="empty">Heute ist keine Karte fällig. Genau so soll es sein: Karten kommen erst wieder, kurz bevor du sie vergessen würdest (nach 1, 3, 7, 21 Tagen).</div><a class="btn block" href="#/abruf/alle">${icon('flip')}Trotzdem ein paar Karten üben</a></div>` };
    }
    if (!pool.length) {
      const nl = LESSONS.find(l => !state.done[l.id]);
      return { title: 'Abruf', back: '#/wiederholen', nav: 'wdh', focus: true, html: `<div ${subjStyle(ms)} class="rise">${head}<div class="empty">Noch keine Karten. Abfragen kann man nur, was man schon einmal gelernt hat.</div>${nl ? `<a class="btn primary block" href="#/lektion/${nl.id}">Lektion ${nl.num} lernen ${icon('arrow', 'go')}</a>` : ''}</div>` };
    }
    return {
      title: 'Abruf', back: '#/wiederholen', nav: 'wdh', focus: true,
      html: `<div ${subjStyle(ms)} class="rise">${head}<div id="flashHost"></div></div>`,
      after(root) {
        flash($('#flashHost', root), pool, {
          end: (known, total, okCards) => {
            const st = LR.stats(LR.events());
            const titles = [...new Set(okCards.map(c => c.lesson.title))].slice(0, 3);
            return `<div class="done-wrap"><div class="done-badge">${icon('check')}</div><h3 class="h-1">${known} von ${total} gewusst</h3>
              ${titles.length ? `<div class="can"><span class="kicker">Das kannst du jetzt</span><ul>${titles.map(t => `<li>${icon('check')}<span>${t}</span></li>`).join('')}</ul></div>` : '<p class="muted">Die Karten kommen beim nächsten Abruf zuerst wieder. Genau so lernt man sie.</p>'}
              <p class="muted">Ziel-Ring heute: ${st.ring.done} von 3${st.ring.seg[0] ? ' · Abruf geschafft' : ''}.</p>
              ${window.LRWdh && LRWdh.running() ? `<a class="btn primary" href="#/session">${icon('clock')}Zurück zur Session</a>` : `<a class="btn primary" href="#/">Zurück zu Heute ${icon('arrow', 'go')}</a>`}</div>`;
          }
        });
      }
    };
  };

  function examRow(k) {
    const s = byId[k.fid];
    const href = `href="#/klausur/${k.id}"`;
    return `<a class="exam" ${href} ${subjStyle(s)}>
      <div class="date"><b>${k.date.getDate()}</b><span>${MONTHS[k.date.getMonth()]}</span></div>
      <div class="row-main"><span class="row-title">${s ? s.name : k.subject}</span><span class="row-sub">${k.topic}</span></div>
      <span class="chip ${k.days <= 3 ? 'bad' : k.days <= 10 ? 'warn' : ''}">${daysText(k.days)}</span></a>`;
  }

  // ---- Fächer
  R.faecher = () => {
    const order = SUBJECTS.filter(s => mine(s.id)).sort((a, b) => {
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
    return { title: 'Fächer', nav: 'faecher', html: `<div class="page-head"><span class="kicker">Jahrgang 12</span><h2 class="h-display">Deine Fächer</h2><p class="muted">Deine Kurse, sortiert nach der nächsten Klausur. <button class="link" type="button" data-action="edit-profile">Kurse ändern</button></p></div><div class="grid cols rise">${tiles.map((t, i) => rise(t, Math.min(i, 8))).join('')}</div>` };
  };

  // ---- Fach, Ordner, Probeklausur, Lernplan: struktur.js (Bauschritt S3b)
  function oldModules(s) {
    const ts = s.topics;
    const demo = ALGOS.find(x => x.fach === s.id);
    const demoCard = demo ? `<a class="cont" href="#/algo/${demo.id}" style="margin-bottom:14px"><div class="cont-ico">${icon('layers')}</div><div class="row-main"><span class="kicker">Neu · Notation (Demo)</span><span class="row-title" style="font-size:18px">${demo.titel}</span><span class="row-sub">Ein Algorithmus als Struktogramm, Pseudocode und Python, zum Tippen und Vergleichen.</span></div>${icon('right', 'chev')}</a>` : '';
    return `${demoCard}<div class="notice" style="margin-bottom:18px">${icon('info')}<div>Diese Module laufen noch im bisherigen Portal und werden in die neue Struktur übertragen.</div></div>
      <div class="path">${ts.map((t, i) => unitRow(i, i + 1, ts.length, false, false, t.title, t.desc.length > 110 ? t.desc.slice(0, 108) + '…' : t.desc, t.badge ? `<span class="chip">${t.badge}</span>` : '', '../index.html', true)).join('')}</div>`;
  }


  // ---- Plan
  R.plan = () => {
    const tab = state.planTab || 'lernplan';
    let body = '';
    if (tab === 'lernplan') {
      body = window.LRStruktur ? LRStruktur.planBody() : '';
    } else if (tab === 'klausuren') {
      const first = upcoming.filter(k => k.date < new Date(2027, 0, 1));
      const later = upcoming.filter(k => k.date >= new Date(2027, 0, 1));
      const past = exams.filter(k => k.days < 0).reverse();
      body = `<div class="section" style="margin-top:6px"><h3 class="h-2" style="margin-bottom:12px">Halbjahr 12.1</h3><div class="list">${first.map(examRow).join('')}</div></div>
        <div class="section"><h3 class="h-2" style="margin-bottom:12px">Halbjahr 12.2</h3><div class="list">${later.map(examRow).join('')}</div></div>
        ${past.length ? `<div class="section"><h3 class="h-2" style="margin-bottom:12px">Geschrieben</h3><div class="list" style="opacity:.7">${past.map(k => `<a class="exam" href="#/klausur/${k.id}" ${subjStyle(byId[k.fid])}><div class="date"><b>${k.date.getDate()}</b><span>${MONTHS[k.date.getMonth()]}</span></div><div class="row-main"><span class="row-title">${(byId[k.fid] || {}).name || k.subject}</span><span class="row-sub">${k.topic}</span></div><span class="chip ok">${icon('check')}erledigt</span></a>`).join('')}</div></div>` : ''}`;
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
    return { title: 'Plan', nav: 'plan', html: `<div class="page-head"><span class="kicker">Schuljahr 2026/27</span><h2 class="h-display">Plan</h2></div><div class="sticky-seg">${seg('plan', [['lernplan', 'Lernplan'], ['klausuren', 'Klausuren'], ['stunden', 'Stundenplan']], tab, true)}</div><div class="rise" id="tabBody">${body}</div>` };
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
      title: `Lektion ${l.num}`, back: (window.LRStruktur && LRStruktur.backFor('lektion', l.id)) || '#/fach/mathe', nav: 'faecher', focus: true, html,
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
      next.innerHTML = last ? `${icon('check')}<span>Zurück zum Ordner</span>` : `<span>${nextLabel()}</span>${icon('arrow', 'go')}`;
      prev.style.visibility = cur === 0 ? 'hidden' : 'visible';
      bindPage();
      window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
    }
    const nextLabel = () => { const k = pages[cur + 1].k; return { rezept: 'Weiter zum Rezept', beispiel: 'Weiter zum Beispiel', fehler: 'Typische Fehler', test: 'Zum Selbsttest', ende: 'Abschließen' }[k] || 'Weiter'; };
    function go(d) {
      const n = cur + d;
      if (n < 0) return;
      if (n >= pages.length) { location.hash = (window.LRStruktur && LRStruktur.backFor('lektion', l.id)) || '#/fach/mathe'; return; }
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
      if (fh) flash(fh, l.test.map((c, i) => ({ q: c.q, a: c.a, ref: `${l.id}:${i}`, lesson: l })));
      const db = $('#doneBtn', page);
      if (db) db.addEventListener('click', () => {
        if (state.done[l.id]) delete state.done[l.id];
        else { state.done[l.id] = true; LR.log('learn', l.id); }
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

  // Karteikarten; jede Bewertung ist ein Abruf-Ereignis (Ring-Segment „Abruf“)
  function flash(host, cards, opts = {}) {
    let i = 0, known = 0, okCards = [];
    function draw() {
      if (i >= cards.length) {
        host.innerHTML = opts.end ? opts.end(known, cards.length, okCards) : `<div class="done-wrap"><div class="done-badge">${icon('check')}</div><h3 class="h-1">${known} von ${cards.length} gewusst</h3><p class="muted">Was du nicht wusstest, liest du am besten noch einmal im Rezept nach. Es kommt beim nächsten Abruf zuerst wieder.</p><button class="btn" id="again" type="button">${icon('flip')}Nochmal</button></div>`;
        const ag = $('#again', host); if (ag) ag.onclick = () => { i = 0; known = 0; okCards = []; draw(); };
        return;
      }
      const c = cards[i];
      host.innerHTML = `<div class="flash-count"><span class="kicker">Frage ${i + 1} von ${cards.length}</span>${bar(((i) / cards.length).toFixed(2)).replace('class="bar"', 'class="bar go" style="width:120px;--p:' + (i / cards.length).toFixed(2) + '"')}</div>
        <div class="flash" id="fc"><div class="flash-in"><div class="face"><span class="kicker">Frage</span>${prose(c.q)}<span class="dim" style="font-size:13px;margin-top:6px">Tippen zum Umdrehen</span></div><div class="face back"><span class="kicker" style="color:var(--accent-ink)">Antwort</span>${prose(c.a)}</div></div></div>
        <div class="rate" id="rate" hidden><button class="btn" data-r="0" type="button">Nochmal üben</button><button class="btn primary" data-r="1" type="button">${icon('check')}Gewusst</button></div>`;
      const fc = $('#fc', host), rate = $('#rate', host);
      const flip = () => { fc.classList.add('flip'); rate.hidden = false; };
      fc.addEventListener('click', flip);
      $$('[data-r]', host).forEach(b => b.addEventListener('click', () => {
        const ok = b.dataset.r === '1';
        if (c.ref) LR.log('recall', c.ref, { ok });
        if (ok) { known++; okCards.push(c); }
        i++; draw();
      }));
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

  // ---- Aufgabe: Baustein für die Aufgaben-Seite und die Probeklausur
  // mode 'browse' = frei üben (Tipps, Musterlösung, Bewertung) · 'work' = Klausurmodus (nur Text + Antwortfeld)
  //      'rate' = nach dem Abgeben (Lösung offen, Selbstbewertung). store = wo die Bewertung liegt.
  function taskBlock(t, o = {}) {
    const mode = o.mode || 'browse';
    const store = o.store || state.scores;
    const parts = t.parts.map(p => {
      const nums = mode === 'work' ? '' : (p.nums || []).map((n, i) => `<span class="field"><label for="${p.id}-n${i}">${n.label}</label><input id="${p.id}-n${i}" data-ans="${n.ans}" data-tol="${n.tol || 0.01}" inputmode="decimal" autocomplete="off" placeholder="Zahl"><button class="btn small" type="button" data-check="${p.id}-n${i}">Prüfen</button></span>`).join('');
      const scoreBtns = Array.from({ length: (p.be || 0) + 1 }, (_, v) => `<button type="button" data-p="${p.id}" data-v="${v}" class="${store[p.id] === v ? 'on' : ''}">${v}</button>`).join('');
      const hintBtn = mode === 'browse' && p.hints && p.hints.length ? `<button class="btn small" type="button" data-hint="${p.id}">${icon('bulb')}<span>Tipp 1 von ${p.hints.length}</span></button>` : '';
      const solBtn = mode === 'browse' ? `<button class="btn small primary" type="button" data-sol="${p.id}">${icon('eye')}Musterlösung</button>` : '';
      const sol = mode === 'work' ? '' : `<div class="reveal${mode === 'rate' ? ' open' : ''}" id="sol-${p.id}"><div><div class="inner"><div class="hint" style="background:color-mix(in oklab,var(--ok) 10%,transparent)">${icon('check').replace('class="i "', 'class="i " style="color:var(--ok)"')}${prose(p.sol)}</div>
          <div class="score"><span class="kicker" style="margin-right:6px">Ehrlich bewertet</span>${scoreBtns}<span class="dim">von ${p.be} BE</span></div></div></div></div>`;
      return `<section class="part" id="part-${p.id}">
        <div class="part-head"><span class="lab">${p.label}</span><span class="chip be">${p.be} BE</span></div>
        ${prose(p.text)}
        <textarea class="work" data-ans-key="${p.id}" placeholder="Dein Lösungsweg (wird nur hier gespeichert)">${esc((state.answers && state.answers[p.id]) || '')}</textarea>
        <div class="tools">${nums}${hintBtn}${solBtn}</div>
        <div id="hints-${p.id}"></div>${sol}
      </section>`;
    }).join('');
    const html = `${prose(t.intro || '')}${figSvg(t.fig)}${parts}`;

    function bind(root, onScore) {
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
      // Frei üben: Bewertung -> Ereignis „practice“ (1,5 s entprellt, damit Herumklicken nicht zählt).
      // Mehr Punkte als bei einem früheren Versuch (> 1 h her) -> „fix“ (Ring-Segment „Fehler“).
      // Probeklausur (work/rate): nur speichern, die Ereignisse entstehen beim Auswerten.
      const timers = {};
      const initial = {}; // ältere Bewertungen aus der Zeit vor der Ereignis-Liste zählen als „früherer Versuch“
      if (mode === 'browse') t.parts.forEach(p => { if (state.scores[p.id] !== undefined && !LR.events().some(e => e.type === 'practice' && e.ref === p.id)) initial[p.id] = state.scores[p.id]; });
      $$('.score button', root).forEach(b => b.addEventListener('click', () => {
        const pid = b.dataset.p, v = +b.dataset.v;
        const part = t.parts.find(x => x.id === pid);
        store[pid] = v; save();
        $$(`.score button[data-p="${pid}"]`, root).forEach(x => x.classList.toggle('on', x === b));
        if (onScore) onScore(pid, v);
        if (mode !== 'browse') return;
        clearTimeout(timers[pid]);
        timers[pid] = setTimeout(() => {
          const ev = LR.events().filter(e => e.type === 'practice' && e.ref === pid && e.t < Date.now() - 36e5).pop();
          const prev = ev && ev.data ? ev.data.pts : initial[pid];
          LR.log('practice', pid, { pts: v, max: part.be });
          if (prev !== undefined && prev < part.be && v > prev) { LR.log('fix', pid, { from: prev, to: v }); delete initial[pid]; }
        }, 1500);
      }));
      $$('textarea.work', root).forEach(ta => ta.addEventListener('input', () => { state.answers = state.answers || {}; state.answers[ta.dataset.ansKey] = ta.value; save(); }));
    }
    return { html, bind };
  }

  R.aufgabe = (id) => {
    const t = TASKS.find(x => x.id === id);
    if (!t) return R.faecher();
    const ms = byId.mathe;
    const blk = taskBlock(t);
    const html = `<div ${subjStyle(ms)} class="rise"><div class="page-head"><span class="kicker">Teil ${t.teil} · AFB ${t.afb} · ${taskMax(t)} BE</span><h2 class="h-1">${t.title}</h2><p class="dim" style="font-size:14px">${t.ops} · angelehnt an Zentralabitur-Aufgabenformate, nicht offiziell</p></div>${blk.html}</div>`;
    return { title: t.title, back: (window.LRStruktur && LRStruktur.backFor('aufgabe', t.id)) || '#/fach/mathe', nav: 'faecher', focus: true, html, after(root) { blk.bind(root); } };
  };

  // ---- Lerntreppe (treppe.js, Bauschritt S2)
  const TOPICS = window.LR_TOPICS || [];
  const treppeCtx = () => ({ M, icon, esc, LR, byId, subjStyle, figSvg, reduced, openSheet, sheetHead });
  R.thema = (id, n) => {
    const t = TOPICS.find(x => x.id === id);
    if (!t || !window.LRTreppe) return R.faecher();
    const ctx = treppeCtx();
    if (n === undefined || n === '') {
      const res = LRTreppe.overview(t, ctx);
      const up = window.LRStruktur && LRStruktur.backFor('thema', t.id);
      if (up) res.back = up;
      return res;
    }
    if (n === 'check') return LRTreppe.check(t, ctx);
    if (/^\d+$/.test(n)) return LRTreppe.stage(t, +n, ctx);
    // Besondere Übungen (S3): blurting, fehler, erlaeutern, deuten
    if (window.LRExtras && ['blurting', 'fehler', 'erlaeutern', 'deuten'].includes(n)) return LRExtras[n](t, ctx);
    return LRTreppe.overview(t, ctx);
  };
  // ---- Notation: Struktogramm · Pseudocode · Python (extras.js, algo.js)
  const ALGOS = window.LR_ALGOS || [];
  R.algo = id => {
    const a = ALGOS.find(x => x.id === id);
    if (!a || !window.LRExtras || !window.LRAlgo) return R.faecher();
    return LRExtras.algo(a, treppeCtx());
  };

  // ------------------------------------------------------------ Profile (Portalplan 11.1)
  const initial = n => (Array.from(String(n || '?').trim())[0] || '?').toUpperCase();
  const allIds = () => SUBJECTS.map(s => s.id);
  function profileForm(p) {
    const sel = new Set(p && p.courses.length ? p.courses : allIds());
    return `<form class="pform" id="pform" autocomplete="off" novalidate>
      <label class="lbl" for="pname">Spitzname</label>
      <input class="input" id="pname" maxlength="24" value="${p ? esc(p.name) : ''}" placeholder="z. B. Tonda" autocapitalize="words" enterkeyhint="done">
      <span class="lbl">Meine Kurse</span>
      <div class="picks" role="group" aria-label="Meine Kurse">${SUBJECTS.map(s => `<button type="button" class="pick" data-course="${s.id}" aria-pressed="${sel.has(s.id)}" ${subjStyle(s)}><span class="mono">${mono(s)}</span><span>${s.name.replace(/ (eA|gA)$/, '')}</span></button>`).join('')}</div>
      <p class="row-sub" id="pmsg">Bestimmt Termine, Countdown und Vorschläge. Jederzeit änderbar.</p>
      <button class="btn primary block" type="submit">${p ? 'Speichern' : 'Los geht’s'} ${icon('arrow', 'go')}</button></form>`;
  }
  function bindForm(root, onSave) {
    $$('.pick', root).forEach(b => b.addEventListener('click', () => b.setAttribute('aria-pressed', b.getAttribute('aria-pressed') === 'true' ? 'false' : 'true')));
    $('#pform', root).addEventListener('submit', e => {
      e.preventDefault();
      const nameEl = $('#pname', root), msg = $('#pmsg', root);
      const name = nameEl.value.trim();
      const courses = $$('.pick[aria-pressed="true"]', root).map(b => b.dataset.course);
      if (!name) { msg.textContent = 'Bitte einen Spitznamen eingeben.'; msg.classList.add('err'); nameEl.focus(); return; }
      if (!courses.length) { msg.textContent = 'Bitte mindestens einen Kurs auswählen.'; msg.classList.add('err'); return; }
      onSave(name, courses.length === SUBJECTS.length ? [] : courses);
    });
  }
  R.start = () => ({
    title: 'Willkommen', nav: 'heute', focus: true,
    html: `<div class="onboard rise"><div class="page-head"><span class="kicker">Lernraum</span><h2 class="h-display">Wer lernt hier?</h2>
      <p class="muted">Jede Person bekommt ein eigenes Profil. Fortschritt, Streak und Antworten gehören nur dir und bleiben auf diesem Gerät. Freunde legen ihr eigenes Profil an, auf ihrem Gerät oder hier.</p></div>${profileForm(null)}
      <div class="join-box"><span class="row-title">Schon auf einem anderen Gerät angefangen?</span><span class="row-sub">Mit deinem Sync-Code holst du deinen Fortschritt hierher.</span><button class="btn block" type="button" data-join>${icon('shield')}Mit Sync-Code verbinden</button></div></div>`,
    after(root) {
      bindForm(root, (n, c) => { LR.createProfile(n, c); history.replaceState(null, '', '#/'); location.reload(); });
      const j = root.querySelector('[data-join]');
      if (j) j.onclick = () => { LR.createProfile('Ich', []); try { sessionStorage.setItem('lr:adopt', '1'); } catch (e) { /* egal */ } history.replaceState(null, '', '#/sync/join'); location.reload(); };
    }
  });

  const sheet = $('#sheet');
  function openSheet(html, bind) {
    const box = $('.sheet', sheet);
    box.innerHTML = html;
    sheet.hidden = false;
    requestAnimationFrame(() => sheet.classList.add('open'));
    if (bind) bind(box);
    const f = $('input, button:not([data-close])', box); if (f && matchMedia('(pointer: fine)').matches) f.focus();
  }
  function closeSheet() { sheet.classList.remove('open'); setTimeout(() => { sheet.hidden = true; }, reduced ? 0 : 260); }
  const sheetHead = t => `<div class="sheet-head"><h3 class="h-2">${t}</h3><button class="icon-btn" type="button" data-close aria-label="Schließen">${icon('x')}</button></div>`;
  function profileSheet() {
    const list = LR.profiles();
    openSheet(`${sheetHead('Wer lernt gerade?')}
      <div class="list">${list.map(p => `<button class="row" type="button" data-switch="${p.id}"><span class="avatar">${esc(initial(p.name))}</span><span class="row-main"><span class="row-title">${esc(p.name)}</span><span class="row-sub">${p.id === me.id ? 'aktiv' : 'zu diesem Profil wechseln'}</span></span>${p.id === me.id ? icon('check', 'ok-ic') : icon('right', 'chev')}</button>`).join('')}</div>
      <div class="sheet-actions"><button class="btn" type="button" data-action="edit-profile">${icon('pencil')}Name und Kurse</button><button class="btn" type="button" data-action="new-profile">Neues Profil</button></div>
      <a class="btn block sync-go" href="#/sync">${icon('shield')}Geräte verbinden (verschlüsselt)</a>
      <p class="row-sub sheet-note">Jedes Profil hat eigene Daten und ein eigenes, verschlüsseltes Postfach. Niemand kann den Streak eines anderen verändern.</p>
      ${list.length > 1 ? `<button class="link danger" type="button" data-action="delete-profile">Profil „${esc(me.name)}“ von diesem Gerät löschen</button>` : ''}`);
  }
  const idleAtStart = LR.idleMinutes();
  function askWho(idle = LR.idleMinutes()) {
    if (!me || LR.profiles().length < 2 || idle < 30) { LR.touch(); return; }
    openSheet(`${sheetHead('Weiter lernen')}<p class="prose" style="margin-bottom:18px">Lernt gerade <b>${esc(me.name)}</b>?</p>
      <div class="sheet-actions"><button class="btn primary" type="button" data-action="confirm-me">${icon('check')}Ja, ich bin ${esc(me.name)}</button><button class="btn" type="button" data-action="profiles">Profil wechseln</button></div>`);
  }
  document.addEventListener('click', e => {
    if (e.target.closest('[data-close]') || e.target.classList.contains('sheet-bg')) { closeSheet(); return; }
    const sw = e.target.closest('[data-switch]');
    if (sw) { if (sw.dataset.switch !== me.id) { LR.switchTo(sw.dataset.switch); history.replaceState(null, '', '#/'); location.reload(); } else closeSheet(); return; }
    const a = e.target.closest('[data-action]'); if (!a) return;
    const act = a.dataset.action;
    if (act === 'profiles') profileSheet();
    else if (act === 'confirm-me') { LR.touch(); closeSheet(); }
    else if (act === 'edit-profile') openSheet(sheetHead('Name und Kurse') + profileForm(me), box => bindForm(box, (n, c) => { LR.updateProfile(me.id, { name: n, courses: c }); location.reload(); }));
    else if (act === 'new-profile') openSheet(sheetHead('Neues Profil') + profileForm(null), box => bindForm(box, (n, c) => { LR.createProfile(n, c); history.replaceState(null, '', '#/'); location.reload(); }));
    else if (act === 'delete-profile') {
      if (confirm(`Profil „${me.name}“ mit allem Fortschritt von diesem Gerät löschen? Das kann nicht rückgängig gemacht werden.`)) { LR.deleteProfile(me.id); history.replaceState(null, '', '#/'); location.reload(); }
    }
  });
  addEventListener('keydown', e => { if (e.key === 'Escape' && !sheet.hidden) closeSheet(); });
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible' && sheet.hidden) askWho(); });
  function paintProfile() {
    $$('[data-avatar]').forEach(el => { el.textContent = me ? initial(me.name) : ''; });
    $$('[data-pname]').forEach(el => { el.textContent = me ? me.name : ''; });
    $$('[data-action="profiles"]').forEach(el => { el.hidden = !me; });
  }

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
    if (a === 'abruf') return ['abruf', b];
    if (a === 'fehlerjagd') return ['fehlerjagd'];
    if (a === 'wiederholen') return ['wiederholen'];
    if (a === 'karte') return ['karte', b];
    if (a === 'verlauf') return ['verlauf'];
    if (a === 'klausur') return ['klausur', b];
    if (a === 'sync') return ['sync', b];
    if (a === 'jagd') return ['jagd', b];
    if (a === 'session') return ['session', b];
    if (a === 'ordner') return ['ordner', b];
    if (a === 'probe') return ['probe', b];
    if (a === 'spick') return ['spick', b];
    if (a === 'thema') return ['thema', b, c];
    if (a === 'algo') return ['algo', b];
    return ['heute'];
  }

  function mount(opts = {}) {
    const r = me ? parse() : ['start'];
    if (me) LR.touch();
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
    const run = () => { try { const res = mount(opts); if (!same) window.scrollTo(0, 0); lastKey = key; return res; } catch (e) { console.error(e); view.innerHTML = `<div class="empty">Diese Seite konnte nicht angezeigt werden. <a class="link" href="#/">Zur Startseite</a></div>`; } }; // Fehler nie verschlucken (View-Transition fängt sie sonst still ab)
    if (!same && !(opts && opts.first) && document.startViewTransition && !reduced && !document.hidden) { /* im Hintergrund würde der Übergang die Seite aufhalten */ const vt = document.startViewTransition(run); [vt.ready, vt.finished, vt.updateCallbackDone].forEach(p => p && p.catch(() => {})); } else run();
  }

  function setNav(name) {
    const items = ['heute', 'wdh', 'faecher', 'plan'];
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
  addEventListener('hashchange', () => { if (!sheet.hidden) closeSheet(); go(); }); // offenes Fenster (z. B. „Text für Claude“) gehört zur alten Seite
  addEventListener('resize', () => initSegs(view));
  const APP = { R, nextStep, state, save, LR, M, icon, esc, byId, SUBJECTS, mine, subjStyle, mono, fmt, prose, bar, ring, seg, exams, upcoming, examsOf, daysText, WD, MONTHS, LESSONS, TASKS, TOPICS, ALGOS, D, taskMax, taskGot, taskBlock, oldModules, openSheet, closeSheet, sheetHead, view, rerender: () => go({ still: true }), reduced };
  if (window.LRStruktur) LRStruktur.init(APP);
  if (window.LRWdh) LRWdh.init(APP);
  if (window.LRUeberblick) LRUeberblick.init(APP);
  if (window.LRKlausur) LRKlausur.init(APP);
  if (window.LRSync && me) LRSync.init(APP);
  paintProfile();
  go({ first: true }); // erste Anzeige ohne Übergang: der kann beim Laden hängen bleiben
  askWho(idleAtStart);
})();
