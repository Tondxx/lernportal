/* ==========================================================================
   WIEDERHOLEN – Bauschritt S4 (Portalplan 4, 5.2, 7; Bauliste 2.4)
   - Abruf aus der Wiederholungs-Queue (core.js: LR.cards, Abstände 1–3–7–21 Tage)
   - Fehlerjagd: vorgemerkte Fehler kommen nach 1 Tag wieder (LR.mistakes), neu rechnen,
     vergleichen, ehrlich bewerten (Ereignis „hunt“). Zweimal an verschiedenen Tagen richtig = behoben.
   - Sessions: Mini (3/10/20 Min.) und Fokusblock (60/90 Min.) mit Uhr. Die Uhr läuft über
     Zeitstempel (übersteht Seitenwechsel und Neuladen), oben in der Kopfzeile sichtbar.
     Ende: „Das kannst du jetzt“ + „Morgen starte ich bei …“.
   ========================================================================== */
(function () {
  'use strict';
  let A = null;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  // ------------------------------------------------------------ Abruf-Karten (verstandene Lektionen)
  function cardPool() {
    if (!A.mine('mathe')) return { map: {}, q: { all: [], due: [], newCount: 0 } };
    const map = {};
    A.LESSONS.forEach(l => { if (A.state.done[l.id]) (l.test || []).forEach((c, i) => { map[`${l.id}:${i}`] = { q: c.q, a: c.a, lesson: l }; }); });
    return { map, q: A.LR.cards(A.LR.events(), Object.keys(map)) };
  }
  // Fällige Karten (für den Abruf). Ist nichts fällig und force = true: die am längsten nicht gesehenen.
  function dueCards(force) {
    const { map, q } = cardPool();
    const list = (q.due.length || !force ? q.due : q.all.slice().sort((a, b) => (a.due < b.due ? -1 : 1)));
    return list.map(c => Object.assign({ ref: c.ref, due: c.due }, map[c.ref]));
  }
  function nextDueDate() {
    const { q } = cardPool();
    const later = q.all.filter(c => c.n).map(c => c.due).sort();
    return later[0] || null;
  }

  // ------------------------------------------------------------ Fehler: Verweis → Inhalt
  function mistakeIndex() {
    const idx = {};
    (A.TOPICS || []).forEach(t => {
      (t.stufen || []).forEach((st, n) => (st.task ? st.task.parts : []).forEach(p => (p.schritte || []).forEach((x, i) => {
        idx[`${p.id}:${i}`] = { quelle: `${t.titel} · Stufe ${n}`, frage: p.frage, intro: st.task.intro, schritt: x, nr: i, href: `#/thema/${t.id}/${n}`, fach: t.fach };
      })));
      const ex = t.extras || {};
      if (ex.erlaeutern) (ex.erlaeutern.kernpunkte || []).forEach((k, i) => {
        idx[`${t.id}:erlaeutern:${i}`] = { quelle: `${t.titel} · Lösungsweg erläutern`, frage: ex.erlaeutern.intro, schritt: { name: k.name, rechnung: k.text, punkte: k.punkte }, nr: i, href: `#/thema/${t.id}/erlaeutern`, fach: t.fach };
      });
      if (ex.blurting) (ex.blurting.kernpunkte || []).forEach((k, i) => {
        idx[`${t.id}:blurt:${i}`] = { quelle: `${t.titel} · Blurting`, wissen: k, href: `#/thema/${t.id}/blurting`, fach: t.fach };
      });
    });
    return idx;
  }
  // Ältere Mathe-Aufgaben: Teilaufgaben mit verlorenen Punkten (ausbessern über die Aufgabe selbst)
  function lostParts() {
    if (!A.mine('mathe')) return [];
    const lastP = {};
    A.LR.events().forEach(e => { if (e.type === 'practice' && e.ref) lastP[e.ref] = e; });
    const out = [];
    A.TASKS.forEach(t => t.parts.forEach(p => {
      const v = A.state.scores[p.id], e = lastP[p.id];
      const got = v !== undefined ? v : e && e.data ? e.data.pts : undefined;
      if (got !== undefined && got < (p.be || 0)) out.push({ t, p, v: got });
    }));
    return out;
  }
  function huntState() {
    const m = A.LR.mistakes(A.LR.events());
    const idx = mistakeIndex();
    const mk = x => Object.assign({}, x, { info: idx[x.ref] || (x.data && x.data.src === 'klausur' ? { quelle: `Klausur ${x.data.label || ''}`.trim(), frei: x.data.text } : null) });
    return { due: m.due.map(mk), open: m.open.map(mk), fixed: m.fixed, lost: lostParts() };
  }

  // ------------------------------------------------------------ Hilfen
  const pad = n => String(n).padStart(2, '0');
  const mmss = s => { const neg = s < 0; s = Math.abs(Math.round(s)); return `${neg ? '+' : ''}${Math.floor(s / 60)}:${pad(s % 60)}`; };
  const dayKey = t => A.LR._util.dayKey(t);
  const niceDay = k => { const t = dayKey(Date.now()); const d = A.LR._util.daysBetween(t, k); if (d <= 0) return 'heute'; if (d === 1) return 'morgen'; const D = new Date(k + 'T12:00'); return `${['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'][D.getDay()]}, ${D.getDate()}.${D.getMonth() + 1}.`; };
  const ago = t => { const d = A.LR._util.daysBetween(dayKey(t), dayKey(Date.now())); return d <= 0 ? 'heute' : d === 1 ? 'gestern' : `vor ${d} Tagen`; };
  const kit = () => window.LRTreppe && LRTreppe.kit;
  const ctx = () => ({ M: A.M, icon: A.icon, esc: A.esc, LR: A.LR, reduced: A.reduced });
  const plain = s => String(s || '').replace(/<[^>]+>/g, '');

  // ------------------------------------------------------------ Fehlerjagd: Übersicht
  function fehlerjagd() {
    const { icon, esc, M } = A;
    const h = huntState();
    const types = {};
    h.open.forEach(x => { const k = (x.data && x.data.typ) || 'ohne Fehlertyp'; types[k] = (types[k] || 0) + 1; });
    const typeList = Object.entries(types).sort((a, b) => b[1] - a[1]);
    const maxT = typeList.length ? typeList[0][1] : 1;
    const row = (x, due) => {
      const inf = x.info;
      const name = inf ? (inf.frei ? inf.frei : inf.wissen ? 'Wissenslücke' : plain(A.M(inf.schritt.name)).trim() || 'Schritt') : 'Fehler';
      return `<a class="row" href="#/jagd/${encodeURIComponent(x.ref)}"><span class="hunt-dot${x.hyper ? ' hyper' : ''}"></span>
        <span class="row-main"><span class="row-title">${inf && inf.schritt ? M(inf.schritt.name) : esc(name)}</span><span class="row-sub">${esc(inf ? inf.quelle : x.ref)} · ${ago(x.t)}${due ? '' : ` · wieder ${niceDay(x.due)}`}</span></span>
        <span class="row-end">${x.data && x.data.typ ? `<span class="chip warn">${esc(x.data.typ)}</span>` : ''}${icon('right', 'chev')}</span></a>`;
    };
    const later = h.open.filter(x => !h.due.some(d => d.ref === x.ref));
    const html = `<div class="rise">
      <div class="page-head"><span class="kicker">Fehlerjagd</span><h2 class="h-display">Fehler sind Information.</h2>
        <p class="muted">Jeder Fehler kommt nach einem Tag wieder. Du rechnest nur die Stelle neu, an der es gehakt hat. Zweimal an verschiedenen Tagen richtig, dann ist er behoben.</p></div>
      <div class="hunt-stats"><div><b class="num">${h.due.length}</b><span>heute dran</span></div><div><b class="num">${h.open.length}</b><span>offen</span></div><div><b class="num">${h.fixed.length}</b><span>behoben</span></div></div>
      ${h.due.length ? `<a class="btn primary block" href="#/jagd">${icon('target')}Jagd starten · ${h.due.length} ${h.due.length === 1 ? 'Fehler' : 'Fehler'}</a>` : `<div class="empty">${h.open.length ? `Heute ist nichts dran. Der nächste Fehler kommt ${niceDay(h.open[0].due)} wieder.` : 'Keine offenen Fehler. Wenn du bei der Selbstkorrektur „fast“ oder „fehlte“ wählst, landet der Schritt hier.'}</div>`}
      ${typeList.length ? `<section class="section"><h3 class="h-2" style="margin-bottom:12px">Woran es meistens liegt</h3><div class="ftype-bars">${typeList.map(([k, n]) => `<div class="ftb"><span>${esc(k)}</span><i style="--w:${(n / maxT * 100).toFixed(0)}%"></i><b>${n}</b></div>`).join('')}</div></section>` : ''}
      ${h.due.length ? `<section class="section"><h3 class="h-2" style="margin-bottom:12px">Heute dran</h3><div class="list">${h.due.map(x => row(x, true)).join('')}</div></section>` : ''}
      ${later.length ? `<section class="section"><h3 class="h-2" style="margin-bottom:12px">Kommt später wieder</h3><div class="list">${later.map(x => row(x, false)).join('')}</div></section>` : ''}
      ${h.lost.length ? `<section class="section"><h3 class="h-2" style="margin-bottom:6px">Aufgaben mit verlorenen Punkten</h3><p class="row-sub" style="margin-bottom:12px">Nochmal auf Papier rechnen und neu bewerten. Mehr Punkte als vorher zählt fürs Fehler-Segment.</p><div class="list">${h.lost.map(({ t, p, v }) => `<a class="row" href="#/aufgabe/${t.id}"><span class="row-main"><span class="row-title">${esc(t.title)} · ${esc(p.label)}</span><span class="row-sub">${v} von ${p.be} BE</span></span>${icon('right', 'chev')}</a>`).join('')}</div></section>` : ''}
    </div>`;
    return { title: 'Fehlerjagd', back: '#/wiederholen', nav: 'wdh', html };
  }

  // ------------------------------------------------------------ Fehlerjagd: ein Fehler
  function jagd(ref) {
    const { icon, esc, M, prose } = A;
    const h = huntState();
    const x = ref ? h.open.find(m => m.ref === ref) : h.due[0];
    if (!x) {
      return { title: 'Fehlerjagd', back: '#/fehlerjagd', nav: 'wdh', focus: true, html: `<div class="rise"><div class="done-wrap"><div class="done-badge">${icon('check')}</div><h2 class="h-1">Alles gejagt für heute.</h2><p class="muted">${h.open.length ? `Noch ${h.open.length} offen, sie kommen an späteren Tagen wieder.` : 'Keine offenen Fehler.'}</p>${sessionBack()}<a class="btn" href="#/fehlerjagd">Zur Übersicht</a></div></div>` };
    }
    const inf = x.info;
    const pos = h.due.findIndex(m => m.ref === x.ref);
    const K = kit(), B = K && K.api(ctx());
    const was = x.data && x.data.rating === 'half' ? 'fast richtig' : 'fehlte';
    let body;
    if (!inf) {
      body = `<div class="notice">${icon('info')}<div>Zu diesem Fehler gibt es den Inhalt nicht mehr (er wurde geändert oder entfernt).</div></div>
        <button class="btn primary block" type="button" data-hunt="1" style="margin-top:16px">${icon('check')}Als erledigt markieren</button>`;
    } else if (inf.frei) {
      body = `<div class="hunt-focus"><span class="kicker">Aus deiner Klausur</span><h3 class="h-2">${esc(inf.frei)}</h3>
          <div class="paper small">${icon('pencil')}<div>Nimm die korrigierte Klausur oder die Berichtigung. Rechne <b>genau diese Stelle</b> noch einmal ohne hinzusehen, dann vergleiche.</div></div></div>
        <div class="hunt-rate" id="rate"><p class="sc-q">Hast du es diesmal allein richtig hinbekommen?</p><div class="rate2"><button class="btn" type="button" data-hunt="0">Noch nicht</button><button class="btn primary" type="button" data-hunt="1">${icon('check')}Ja, richtig</button></div></div>`;
    } else if (inf.wissen) {
      body = `<p class="prose">Beim Blurting fehlte dieser Punkt. Was weißt du dazu? Sag es dir laut oder schreib zwei Stichwörter auf.</p>
        <div class="hunt-reveal" id="rev" hidden><div class="kern">${M(inf.wissen)}</div></div>
        <button class="btn primary block" type="button" id="showRev">${icon('eye')}Vergleichen</button>
        <div class="hunt-rate" id="rate" hidden><p class="sc-q">Wusstest du es diesmal?</p><div class="rate2"><button class="btn" type="button" data-hunt="0">Noch nicht</button><button class="btn primary" type="button" data-hunt="1">${icon('check')}Ja, wusste ich</button></div></div>`;
    } else {
      body = `${inf.frage ? `<div class="q">${M(inf.frage)}</div>` : ''}
        <div class="hunt-focus"><span class="kicker">Diese Stelle ${was}</span><h3 class="h-2">${M(inf.schritt.name)}</h3>
          <div class="paper small">${icon('pencil')}<div>Rechne <b>nur diesen Schritt</b> neu auf Papier. Was davor kommt, darfst du nachschlagen.</div></div>
          ${inf.schritt.hinweis ? `<details class="hint-fold"><summary>${icon('bulb')}Hinweis</summary><div class="prose">${M(inf.schritt.hinweis)}</div></details>` : ''}</div>
        <div class="rw hunt-reveal" id="rev" hidden>${B ? B.step(inf.schritt, inf.nr || 0, { be: false }) : prose(inf.schritt.rechnung)}</div>
        <button class="btn primary block" type="button" id="showRev">${icon('eye')}Vergleichen</button>
        <div class="hunt-rate" id="rate" hidden><p class="sc-q">Hattest du es diesmal richtig?</p><div class="rate2"><button class="btn" type="button" data-hunt="0">Noch nicht</button><button class="btn primary" type="button" data-hunt="1">${icon('check')}Ja, richtig</button></div></div>`;
    }
    const sj = inf && A.byId[inf.fach];
    const html = `<div class="rise hunt" ${A.subjStyle(sj)}>
      <div class="page-head"><span class="kicker">Fehlerjagd${pos >= 0 ? ` · ${pos + 1} von ${h.due.length} heute` : ''}</span>
        <p class="muted">${esc(inf ? inf.quelle : '')}${x.data && x.data.typ ? ` · <span class="chip warn">${esc(x.data.typ)}</span>` : ''} · ${ago(x.t)}</p>
        ${x.hyper ? `<p class="hyper">${icon('alert')}Hier warst du dir sicher, und es war falsch. Genau diese Fehler merkt man sich, wenn man sie jetzt sauber klärt.</p>` : ''}</div>
      ${body}
      <div id="huntRes" class="finish" hidden></div></div>`;
    return {
      title: 'Fehlerjagd', back: '#/fehlerjagd', nav: 'wdh', focus: true, html,
      after(root) {
        const sr = $('#showRev', root);
        if (sr) sr.onclick = () => { $('#rev', root).hidden = false; sr.remove(); $('#rate', root).hidden = false; $('#rev', root).scrollIntoView({ behavior: A.reduced ? 'auto' : 'smooth', block: 'center' }); };
        $$('[data-hunt]', root).forEach(b => b.onclick = () => {
          const ok = b.dataset.hunt === '1';
          A.LR.log('hunt', x.ref, { ok, typ: x.data && x.data.typ || null });
          $$('[data-hunt]', root).forEach(z => { z.disabled = true; });
          const after = A.LR.mistakes(A.LR.events()).open.find(m => m.ref === x.ref);
          const left = A.LR.mistakes(A.LR.events()).due.length;
          const r = $('#huntRes', root);
          r.hidden = false;
          r.innerHTML = `<div class="done-badge${ok ? '' : ' soft'}">${icon(ok ? 'check' : 'flip')}</div>
            <h3 class="h-1">${ok ? (after ? 'Erwischt.' : 'Behoben.') : 'Noch nicht. Gut, dass du es jetzt weißt.'}</h3>
            <p class="muted">${ok ? (after ? `Zur Kontrolle kommt er ${niceDay(after.due)} noch einmal.` : 'Zweimal an verschiedenen Tagen richtig. Der Fehler ist weg.') : `Er kommt morgen wieder. ${inf && inf.href ? 'Wenn der Schritt ganz unklar ist: die Stufe davor noch einmal ansehen.' : ''}`}</p>
            <div class="finish-btns">${left ? `<a class="btn primary" href="#/jagd">Nächster Fehler (${left}) ${icon('arrow', 'go')}</a>` : sessionBack(true)}
              ${!ok && inf && inf.href ? `<a class="btn" href="${inf.href}">Zur Stufe</a>` : ''}<a class="btn" href="#/fehlerjagd">Übersicht</a></div>`;
          r.scrollIntoView({ behavior: A.reduced ? 'auto' : 'smooth', block: 'center' });
        });
      }
    };
  }

  // ------------------------------------------------------------ Sessions
  const PH = {
    abruf: { name: 'Aufwärmen', sub: 'Abruf aus dem Kopf', ic: 'flip' },
    lernen: { name: 'Lernen', sub: 'Dein nächster Schritt', ic: 'play' },
    pause: { name: 'Pause', sub: 'Aufstehen, trinken, Augen weg vom Bildschirm', ic: 'clock' },
    fehler: { name: 'Fehlerjagd', sub: 'Fehler von gestern neu rechnen', ic: 'target' }
  };
  const MODES = {
    m3: { name: 'Mini · 3 Min.', kurz: 'Ein paar Karten, fertig. Hält den Streak.', phases: [['abruf', 3]] },
    m10: { name: 'Mini · 10 Min.', kurz: 'Kurz abrufen, dann ein Schritt weiter.', phases: [['abruf', 3], ['lernen', 7]] },
    m20: { name: 'Mini · 20 Min.', kurz: 'Abrufen, lernen, einen Fehler ausbessern.', phases: [['abruf', 4], ['lernen', 12], ['fehler', 4]] },
    f60: { name: 'Fokusblock · 60 Min.', kurz: '5 Abruf · 20 Lernen · 5 Pause · 20 Lernen · 10 Fehler', phases: [['abruf', 5], ['lernen', 20], ['pause', 5], ['lernen', 20], ['fehler', 10]] },
    f90: { name: 'Fokusblock · 90 Min.', kurz: '5 Abruf · 30 Lernen · 5 Pause · 30 Lernen · 5 Pause · 15 Fehler', phases: [['abruf', 5], ['lernen', 30], ['pause', 5], ['lernen', 30], ['pause', 5], ['fehler', 15]] }
  };
  const S = () => A.state.session && MODES[A.state.session.mode] ? A.state.session : null;
  const running = () => { const s = S(); return s && !s.ended ? s : null; };
  function phaseLeft(s) {
    const ph = MODES[s.mode].phases[s.i];
    return ph ? ph[1] * 60 - (Date.now() - s.ps) / 1000 : 0;
  }
  function startSession(mode) {
    A.state.session = { mode, i: 0, t0: Date.now(), ps: Date.now(), ended: false };
    A.save();
  }
  function nextPhase() {
    const s = running(); if (!s) return;
    if (s.i + 1 >= MODES[s.mode].phases.length) endSession();
    else { s.i++; s.ps = Date.now(); A.save(); }
  }
  function endSession() {
    const s = running(); if (!s) return;
    s.ended = true; s.t1 = Date.now();
    const sum = summary(s);
    const ns = A.nextStep && A.nextStep(A.LR.stats(A.LR.events()));
    if (ns) A.state.tomorrow = { day: A.LR._util.addDays(dayKey(Date.now()), 1), title: plain(ns.title), href: ns.href };
    A.LR.log('session', s.mode, { mode: s.mode, min: Math.round((s.t1 - s.t0) / 60000), actions: sum.actions });
    A.save();
  }
  const sessionBack = btn => running() ? `<a class="btn ${btn ? 'primary' : ''}" href="#/session">${A.icon('clock')}Zurück zur Session</a>` : '';

  // Was in der Session passiert ist (aus den Ereignissen seit dem Start)
  function summary(s) {
    const evs = A.LR.events().filter(e => e.t >= s.t0 && (!s.t1 || e.t <= s.t1 + 1000));
    const lessonTitle = id => { const l = A.LESSONS.find(x => x.id === id); return l ? l.title : null; };
    const topicTitle = id => { const t = (A.TOPICS || []).find(x => x.id === id); return t ? t.titel : null; };
    const can = [];
    const add = v => { if (v && !can.includes(v)) can.push(v); };
    let cards = 0, known = 0, hunts = 0, huntOk = 0, steps = 0, actions = 0;
    evs.forEach(e => {
      if (['learn', 'recall', 'practice', 'fix', 'stage', 'blurt', 'extra', 'hunt'].includes(e.type)) actions++;
      if (e.type === 'recall') { cards++; if (e.data && e.data.ok) { known++; add(lessonTitle(String(e.ref).split(':')[0])); } }
      if (e.type === 'learn') { steps++; add(lessonTitle(e.ref)); }
      if (e.type === 'stage' && e.data) { steps++; if (e.data.pct >= 80) add(`${topicTitle(e.data.topic) || ''} · Stufe ${e.data.stufe} (${LRTreppe.NAMES[e.data.stufe]})`); }
      if (e.type === 'extra' || e.type === 'blurt') steps++;
      if (e.type === 'hunt') { hunts++; if (e.data && e.data.ok) huntOk++; }
    });
    if (huntOk) add(`${huntOk} ${huntOk === 1 ? 'Fehler' : 'Fehler'} aus der Fehlerjagd jetzt richtig`);
    return { cards, known, hunts, huntOk, steps, actions, can: can.slice(0, 4), min: Math.max(1, Math.round(((s.t1 || Date.now()) - s.t0) / 60000)) };
  }

  function sessionPick() {
    const { icon } = A;
    const tile = (id, ic) => `<button class="sess-pick" type="button" data-sstart="${id}"><span class="next-ico">${icon(ic)}</span><span class="row-main"><span class="row-title">${MODES[id].name}</span><span class="row-sub">${MODES[id].kurz}</span></span>${icon('arrow', 'go')}</button>`;
    return { title: 'Session', back: '#/wiederholen', nav: 'wdh', html: `<div class="rise"><div class="page-head"><span class="kicker">Session</span><h2 class="h-display">Wie viel Zeit hast du?</h2><p class="muted">Die Uhr läuft oben in der Kopfzeile mit, auch wenn du in eine Lektion wechselst.</p></div>
      <h3 class="h-2 sess-h">Kurz</h3><div class="sess-picks">${tile('m3', 'flip')}${tile('m10', 'play')}${tile('m20', 'target')}</div>
      <h3 class="h-2 sess-h">Fokusblock</h3><div class="sess-picks">${tile('f60', 'clock')}${tile('f90', 'clock')}</div>
      <p class="row-sub" style="margin-top:14px">Im Fokusblock: Handy weg, eine Sache zur Zeit. Die Pausen sind Teil des Lernens.</p></div>` };
  }

  // Vorschlag für die aktuelle Phase: eine Karte, ein Knopf
  function phaseSuggestion(kind) {
    const { icon } = A;
    const card = (title, sub, href, ic, min) => `<a class="next sess-next" href="${href}"><div class="next-top"><span class="next-ico">${icon(ic)}</span><span class="kicker">Jetzt</span>${min ? `<span class="chip">${icon('clock')}${min} Min.</span>` : ''}</div><h3 class="h-2">${title}</h3><p class="muted next-sub">${sub}</p><span class="btn primary next-btn">Start ${icon('arrow', 'go')}</span></a>`;
    if (kind === 'abruf') {
      const due = dueCards(false).length;
      const blurt = (A.TOPICS || []).find(t => t.extras && t.extras.blurting && A.mine(t.fach));
      if (due) return card(`${Math.min(5, due)} fällige Karten`, 'Erst im Kopf antworten, dann umdrehen. Was du nicht wusstest, kommt morgen wieder.', '#/abruf', 'flip');
      if (blurt) return card(`Blurting: ${blurt.titel}`, 'Heute ist keine Karte fällig. Schreib stattdessen auf, was du zu diesem Thema weißt.', `#/thema/${blurt.id}/blurting`, 'pencil');
      return `<div class="empty">Heute ist nichts zum Abrufen fällig. Weiter zur nächsten Phase.</div>`;
    }
    if (kind === 'lernen') {
      const ns = A.nextStep && A.nextStep(A.LR.stats(A.LR.events()));
      if (ns) return card(ns.title, ns.sub, ns.href, ns.ic || 'play', ns.min);
      return `<div class="empty">Für deine Kurse gibt es noch keine Inhalte. <a class="link" href="#/faecher">Fächer ansehen</a></div>`;
    }
    if (kind === 'fehler') {
      const h = huntState();
      if (h.due.length) return card(`Fehlerjagd · ${h.due.length} ${h.due.length === 1 ? 'Fehler' : 'Fehler'}`, 'Nur die Stelle neu rechnen, an der es gehakt hat. Dann vergleichen.', '#/jagd', 'target');
      if (h.lost.length) { const { t, p, v } = h.lost[0]; return card(`${A.esc(t.title)} · ${A.esc(p.label)}`, `Beim letzten Mal ${v} von ${p.be} BE. Nochmal auf Papier rechnen und neu bewerten.`, `#/aufgabe/${t.id}`, 'target'); }
      return `<div class="empty">Keine offenen Fehler. Stark. Du kannst die Session beenden oder noch eine Karte abrufen.</div>`;
    }
    return '';
  }

  function sessionView(arg) {
    const { icon, esc } = A;
    if (arg && MODES[arg]) { if (!running()) startSession(arg); history.replaceState(null, '', '#/session'); }
    const s = S();
    if (!s) return sessionPick();
    const mode = MODES[s.mode];
    if (s.ended) {
      const sum = summary(s);
      const tm = A.state.tomorrow;
      const html = `<div class="rise sess-end"><div class="done-wrap"><div class="done-badge">${icon('check')}</div><span class="kicker">${mode.name} · ${sum.min} Min.</span><h2 class="h-1">Session geschafft.</h2>
        <div class="sess-sum"><div><b class="num">${sum.known}/${sum.cards}</b><span>Karten gewusst</span></div><div><b class="num">${sum.steps}</b><span>Lernschritte</span></div><div><b class="num">${sum.huntOk}</b><span>Fehler behoben</span></div></div>
        ${sum.can.length ? `<div class="can"><span class="kicker">Das kannst du jetzt</span><ul>${sum.can.map(c => `<li>${icon('check')}<span>${esc(c)}</span></li>`).join('')}</ul></div>` : `<p class="muted">Auch eine Session ohne große Sprünge zählt: Du warst da, das baut die Gewohnheit.</p>`}
        ${tm ? `<div class="tomorrow"><span class="kicker">Morgen starte ich bei</span><a class="row-title" href="${tm.href}">${esc(tm.title)}</a></div>` : ''}
        <button class="btn primary" type="button" data-sclose>${icon('check')}Fertig</button></div></div>`;
      return { title: 'Session', back: '#/wiederholen', nav: 'wdh', html };
    }
    const ph = mode.phases[s.i], P = PH[ph[0]];
    const left = phaseLeft(s);
    const segs = mode.phases.map((p, i) => `<i class="${i < s.i ? 'done' : i === s.i ? 'on' : ''}" style="flex:${p[1]}" title="${PH[p[0]].name} · ${p[1]} Min."></i>`).join('');
    const nextName = s.i + 1 < mode.phases.length ? PH[mode.phases[s.i + 1][0]].name : 'Abschluss';
    const isPause = ph[0] === 'pause';
    const html = `<div class="rise sess${isPause ? ' is-pause' : ''}">
      <div class="sess-bar">${segs}</div>
      <div class="sess-head">
        <div class="sess-clock" style="--p:${Math.max(0, Math.min(1, 1 - left / (ph[1] * 60))).toFixed(3)}"><svg viewBox="0 0 100 100"><circle class="t" cx="50" cy="50" r="44" pathLength="100"/><circle class="f" cx="50" cy="50" r="44" pathLength="100"/></svg><div class="mid"><b class="num" id="sessTime">${mmss(left)}</b><span class="kicker">${ph[1]} Min.</span></div></div>
        <div><span class="kicker">${esc(mode.name)} · Phase ${s.i + 1} von ${mode.phases.length}</span><h2 class="h-1">${P.name}</h2><p class="muted">${P.sub}</p></div></div>
      ${isPause ? `<div class="pause-card"><p class="prose">Steh auf, trink etwas, schau aus dem Fenster. Kein Scrollen: Dein Kopf sortiert gerade, was du gelernt hast.</p></div>` : phaseSuggestion(ph[0])}
      <div class="sess-ctrl"><button class="btn${left <= 0 ? ' primary' : ''}" type="button" data-snext>${left <= 0 ? 'Zeit um · ' : ''}Weiter zu: ${nextName} ${icon('arrow', 'go')}</button>
        <button class="link" type="button" data-send>Session jetzt beenden</button></div></div>`;
    return { title: 'Session', back: '#/wiederholen', nav: 'wdh', html };
  }

  // Uhr: Kopfzeilen-Chip + Zeit auf der Session-Seite, jede Sekunde
  function tick() {
    const chip = document.getElementById('sessChip');
    const s = running();
    if (chip) {
      chip.hidden = !s;
      if (s) {
        const left = phaseLeft(s), ph = MODES[s.mode].phases[s.i];
        chip.classList.toggle('over', left <= 0);
        chip.querySelector('[data-stxt]').textContent = `${PH[ph[0]].name} · ${left <= 0 ? 'Zeit um' : mmss(left)}`;
      }
    }
    const t = document.getElementById('sessTime');
    if (t && s) {
      const left = phaseLeft(s), ph = MODES[s.mode].phases[s.i];
      t.textContent = mmss(left);
      const c = t.closest('.sess-clock'); if (c) c.style.setProperty('--p', Math.max(0, Math.min(1, 1 - left / (ph[1] * 60))).toFixed(3));
      const nb = document.querySelector('[data-snext]');
      if (nb && left <= 0 && !nb.classList.contains('primary')) A.rerender();
    }
  }

  function wire() {
    document.addEventListener('click', e => {
      const st = e.target.closest('[data-sstart]');
      if (st) { startSession(st.dataset.sstart); location.hash = '#/session'; A.rerender(); return; }
      if (e.target.closest('[data-snext]')) { nextPhase(); window.scrollTo(0, 0); A.rerender(); return; }
      if (e.target.closest('[data-send]')) { if (confirm('Session jetzt beenden? Was du gemacht hast, bleibt gespeichert.')) { endSession(); A.rerender(); } return; }
      if (e.target.closest('[data-sclose]')) { A.state.session = null; A.save(); location.hash = '#/'; return; }
    });
    setInterval(tick, 1000);
    tick();
  }


  // ------------------------------------------------------------ Wiederholen (Übersicht, eigener Menüpunkt)
  function hub() {
    const { icon, esc } = A;
    const h = huntState();
    const due = dueCards(false).length, nxt = nextDueDate();
    const s = running();
    const sess = s ? `<a class="sess-run" href="#/session"><span class="sess-dot"></span><span class="row-main"><span class="row-title">${esc(MODES[s.mode].name)} läuft</span><span class="row-sub">${PH[MODES[s.mode].phases[s.i][0]].name} · ${phaseLeft(s) <= 0 ? 'Zeit um' : mmss(phaseLeft(s)) + ' übrig'}</span></span><span class="btn small primary">Weiter ${icon('arrow', 'go')}</span></a>`
      : `<div class="time-pick"><span class="kicker">Session starten</span><div class="tp-chips"><a class="chip" href="#/session/m3">3 Min.</a><a class="chip" href="#/session/m10">10 Min.</a><a class="chip" href="#/session/m20">20 Min.</a><a class="chip" href="#/session">Fokusblock</a></div></div>`;
    const html = `<div class="rise">
      <div class="page-head"><span class="kicker">Wiederholen</span><h2 class="h-display">Dranbleiben.</h2><p class="muted">Hier hältst du frisch, was du schon gelernt hast, und räumst deine Fehler weg.</p></div>
      ${sess}
      <div class="wdh-grid">
        <a class="wdh-card" href="#/abruf" style="--c:var(--info)"><span class="next-ico">${icon('flip')}</span><span class="kicker">Abruf</span>
          <b class="num">${due}</b><span class="row-title">${due === 1 ? 'Karte' : 'Karten'} heute fällig</span>
          <span class="row-sub">${due ? 'Erst im Kopf antworten, dann umdrehen.' : nxt ? `Nächste Karte ${niceDay(nxt)}.` : 'Karten entstehen, wenn du eine Lektion als verstanden speicherst.'}</span></a>
        <a class="wdh-card" href="#/fehlerjagd" style="--c:var(--warn)"><span class="next-ico">${icon('target')}</span><span class="kicker">Fehlerjagd</span>
          <b class="num">${h.due.length}</b><span class="row-title">${h.due.length === 1 ? 'Fehler' : 'Fehler'} heute dran</span>
          <span class="row-sub">${h.open.length} offen · ${h.fixed.length} behoben${h.lost.length ? ` · ${h.lost.length} Aufgaben mit verlorenen Punkten` : ''}</span></a>
      </div>
      <p class="row-sub wdh-how">${icon('info')}So funktioniert es: Richtig gewusste Karten kommen nach 1, 3, 7 und 21 Tagen wieder, falsche morgen. Fehler aus deiner Selbstkorrektur („fast“, „fehlte“) kommen nach einem Tag in die Fehlerjagd, zweimal richtig an verschiedenen Tagen = behoben.</p>
    </div>`;
    return { title: 'Wiederholen', nav: 'wdh', html };
  }

  // ------------------------------------------------------------ Für die Startseite
  function heuteInfo() {
    const h = huntState();
    return { cardsDue: dueCards(false).length, nextCard: nextDueDate(), huntDue: h.due.length, huntOpen: h.open.length, lost: h.lost.length, session: running(), modes: MODES, phaseName: s => PH[MODES[s.mode].phases[s.i][0]].name, phaseLeft, mmss };
  }

  window.LRWdh = {
    init(app) {
      A = app;
      A.R.fehlerjagd = fehlerjagd;
      A.R.jagd = jagd;
      A.R.session = sessionView;
      A.R.wiederholen = hub;
      wire();
    },
    dueCards, heuteInfo, huntState, running, MODES
  };
})();
