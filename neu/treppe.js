/* ==========================================================================
   LERNTREPPE – Bauschritt S2 (Portalplan 5.1, 5.2, 6; Bauliste 1.3–1.6)
   Stufen: 0 Sehen · 1 Nachvollziehen · 2 Ergänzen · 3 Gerüst · 4 Abi-Aufgabe · 5 Mix
   Papier bleibt Papier: Zwischenergebnisse eintippen (Checkpoints), danach
   Selbstkorrektur am Erwartungshorizont (BE → Notenpunkte), Fehlertyp, Sicherheit.
   Ereignisse: stage {topic,stufe,pct}, practice {pts,max,conf}, mistake {typ}, entry {start}
   ========================================================================== */
(function () {
  'use strict';

  const NAMES = ['Sehen', 'Nachvollziehen', 'Ergänzen', 'Gerüst', 'Abi-Aufgabe', 'Mix & Transfer'];
  const HELP = ['ohne Rechnen', 'volle Hilfe', 'viel Hilfe', 'Schritte vorgegeben', 'nur Tipps', 'ohne Hilfe'];
  const DESC = [
    'Erst anschauen und ausprobieren, dann eine Frage.',
    'Vorgerechnetes Beispiel. Du sagst vorher, was als Nächstes kommt.',
    'Beispiel mit Lücken. Du rechnest die fehlenden Werte.',
    'Die Schritte stehen da, du rechnest auf Papier.',
    'Aufgabe wie im Abitur, mit BE und Operator.',
    'Schwerere Aufgabe, Wissen anwenden (AFB III).'
  ];
  const FTYPES = ['Rechenfehler', 'Ansatz fehlte', 'Schreibweise', 'Verständnis fehlt', 'CAS-Bedienung'];
  const PASS = 80;

  // Übliche Umrechnung Prozent → Notenpunkte (Oberstufe). Lehrkräfte können abweichen.
  const NP = [[95, 15], [90, 14], [85, 13], [80, 12], [75, 11], [70, 10], [65, 9], [60, 8], [55, 7], [50, 6], [45, 5], [40, 4], [33, 3], [27, 2], [20, 1]];
  const notenpunkte = pct => { for (const [p, n] of NP) if (pct >= p) return n; return 0; };

  // Zahlen aus Eingaben: Komma, Unicode-Minus, Brüche wie -1/3
  function parseNum(s) {
    s = String(s || '').trim().replace(/\s/g, '').replace(/[−–]/g, '-').replace(',', '.');
    if (!s) return NaN;
    const fr = s.match(/^(-?\d+(?:\.\d+)?)\/(-?\d+(?:\.\d+)?)$/);
    if (fr) return +fr[1] / +fr[2];
    return /^-?\d*\.?\d+(e-?\d+)?$/i.test(s) ? +s : NaN;
  }
  const near = (v, w, tol) => !isNaN(v) && Math.abs(v - w) <= (tol != null ? tol : Math.max(0.011, Math.abs(w) * 0.005));
  const fmt = n => String(Math.round(n * 100) / 100).replace('.', ',');

  // ------------------------------------------------------------ Fortschritt aus Ereignissen
  function progress(LR, topic) {
    const best = {};
    let entry = null;
    LR.events().forEach(e => {
      if (e.type === 'stage' && e.data && e.data.topic === topic.id) best[e.data.stufe] = Math.max(best[e.data.stufe] || 0, e.data.pct);
      if (e.type === 'entry' && e.ref === topic.id) entry = e.data;
    });
    let rec = topic.stufen.findIndex((_, i) => !(best[i] >= PASS));
    if (rec < 0) rec = topic.stufen.length - 1;
    if (entry && entry.start > rec && !(best[entry.start] >= PASS)) rec = entry.start;
    const reached = Object.keys(best).filter(k => best[k] >= PASS).map(Number);
    const top = reached.length ? Math.max(...reached) : -1;
    const status = !Object.keys(best).length ? 'offen' : top <= 2 ? 'begonnen' : 'unsicher'; // „sicher“ kommt mit der Wiederholung (S4)
    return { best, rec, status, entry };
  }

  // ------------------------------------------------------------ Bausteine (HTML)
  function api(ctx) {
    const { M, icon, esc } = ctx;
    const B = {};

    B.pills = (topic, cur) => `<nav class="st-pills" aria-label="Stufen">${topic.stufen.map((_, i) =>
      `<a href="#/thema/${topic.id}/${i}" class="${i === cur ? 'on' : ''}" aria-current="${i === cur ? 'step' : 'false'}" title="Stufe ${i}: ${NAMES[i]}"><span>${i}</span></a>`).join('')}</nav>`;

    B.mcq = (q, key) => `<div class="mcq" data-mcq="${key}">
      <p class="mcq-q">${M(q.frage)}</p>
      <div class="mcq-opts">${q.optionen.map((o, i) => `<button type="button" class="opt" data-o="${i}"><span class="opt-k">${'ABC'[i]}</span><span class="opt-t">${M(o)}</span></button>`).join('')}</div>
      <div class="mcq-fb" hidden></div></div>`;

    B.cas = (cas, collapsed) => {
      if (!cas) return '';
      const line = `<div class="rw-cas"><span class="cas-tag">${icon('calc')}TI-Nspire CAS</span><code>${esc(cas.eingabe)}</code><span class="cas-to">${icon('arrow')}</span><code class="cas-out">${esc(cas.ausgabe)}</code></div>`;
      return collapsed ? `<details class="cas-fold"><summary>${icon('calc')}CAS-Eingabe zeigen</summary>${line}</details>` : line;
    };

    // Ein Schritt des Rechenwegs: Nummer auf der Schiene, Name, BE, Rechnung, CAS, Warum
    B.step = (st, i, o = {}) => `<div class="rw-step${st.antwort ? ' is-answer' : ''}${o.cls ? ' ' + o.cls : ''}" data-i="${i}">
      <div class="rw-rail"><span class="rw-n">${st.antwort ? icon('check') : i + 1}</span></div>
      <div class="rw-body">
        <div class="rw-head"><h4 class="rw-name">${st.antwort ? 'Antwortsatz' : M(st.name)}</h4>${o.be !== false ? `<span class="rw-be">${st.punkte} BE</span>` : ''}</div>
        ${o.body != null ? o.body : `<div class="rw-math${st.antwort ? ' prose' : ''}">${M(st.rechnung)}</div>`}
        ${o.cas !== false ? B.cas(st.cas, o.casFold) : ''}
        ${st.warum && o.why !== false ? `<p class="rw-why"><span class="why-k">Warum?</span> ${M(st.warum)}</p>` : ''}
        ${o.after || ''}
      </div></div>`;

    B.cpField = (cp, key) => `<span class="field cp" data-cp="${key}"><label for="cp-${key}">${esc(cp.label)}</label><input id="cp-${key}" inputmode="decimal" autocomplete="off" enterkeyhint="done" placeholder="?"><button class="btn small" type="button" data-cpcheck="${key}">Prüfen</button></span>`;

    B.finish = () => `<div class="finish" id="finish" hidden></div>`;
    return B;
  }

  // ------------------------------------------------------------ Verhalten
  function bindMcq(root, key, q, cb) {
    const box = root.querySelector(`[data-mcq="${key}"]`);
    if (!box) return;
    box.querySelectorAll('.opt').forEach(b => b.addEventListener('click', () => {
      if (box.classList.contains('answered')) return;
      box.classList.add('answered');
      const k = +b.dataset.o, ok = k === q.richtig;
      box.querySelectorAll('.opt').forEach((x, i) => { x.disabled = true; if (i === q.richtig) x.classList.add('right'); });
      if (!ok) b.classList.add('wrong');
      const fb = box.querySelector('.mcq-fb');
      fb.hidden = false;
      fb.className = 'mcq-fb ' + (ok ? 'ok' : 'bad');
      fb.innerHTML = (ok ? '<b>Richtig.</b> ' : '<b>Noch nicht.</b> Richtig ist ' + 'ABC'[q.richtig] + '. ') + (q.erklaerung ? box.dataset.expl || '' : '');
      cb(ok, fb);
    }));
  }

  function bindCheckpoints(root, cps, onResult) {
    cps.forEach(({ key, cp }) => {
      const wrap = root.querySelector(`[data-cp="${key}"]`);
      if (!wrap) return;
      const inp = wrap.querySelector('input'), btn = wrap.querySelector('[data-cpcheck]');
      const run = () => {
        const ok = near(parseNum(inp.value), cp.wert, cp.tol);
        wrap.classList.remove('ok', 'bad'); void wrap.offsetWidth; wrap.classList.add(ok ? 'ok' : 'bad');
        btn.textContent = ok ? 'Stimmt' : 'Nochmal';
        onResult && onResult(key, ok);
      };
      btn.addEventListener('click', run);
      inp.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); run(); } });
    });
  }

  // Selbstkorrektur: Sicherheit → Erwartungshorizont abhaken → BE → Fehlertypen → speichern
  function selfCheck(ctx, host, part, opts, done) {
    const { M, icon, LR } = ctx;
    const B = api(ctx);
    let conf = 0;
    host.innerHTML = `<div class="sc">
      <div class="sc-conf"><span class="kicker">Bevor du die Lösung siehst</span><p class="sc-q">Wie sicher bist du, dass deine Lösung stimmt?</p>
        <div class="conf">${['unsicher', 'ziemlich sicher', 'sehr sicher'].map((l, i) => `<button type="button" data-conf="${i + 1}"><b>${i + 1}</b>${l}</button>`).join('')}</div></div>
      <div class="sc-ewh" hidden></div></div>`;
    host.hidden = false;
    host.querySelectorAll('[data-conf]').forEach(b => b.addEventListener('click', () => {
      conf = +b.dataset.conf;
      host.querySelectorAll('[data-conf]').forEach(x => { x.classList.toggle('on', x === b); x.disabled = true; });
      showEwh();
    }));

    function showEwh() {
      const ewh = host.querySelector('.sc-ewh');
      const rating = {};
      ewh.innerHTML = `<div class="sc-title"><span class="kicker">Erwartungshorizont · ${part.be} BE</span><p class="muted">Vergleiche Schritt für Schritt mit deinem Blatt und hake ehrlich ab.</p></div>
        <div class="rw">${part.schritte.map((st, i) => B.step(st, i, {
          casFold: opts.casFold,
          after: `<div class="rate3" role="group" aria-label="Wie war dein Schritt?">${[['hatte ich', 'full'], ['fast', 'half'], ['fehlte', 'none']].map(([l, v]) => `<button type="button" data-rate="${i}" data-v="${v}">${l}</button>`).join('')}</div>
            <div class="ftype" data-ft="${i}" hidden><span class="kicker">Was war los?</span><div class="ft-chips">${FTYPES.map(f => `<button type="button" data-ftv="${f}">${f}</button>`).join('')}</div></div>`
        })).join('')}</div>
        <div class="sc-result" hidden></div>`;
      ewh.hidden = false;
      ewh.scrollIntoView({ behavior: ctx.reduced ? 'auto' : 'smooth', block: 'start' });
      const ftSel = {};
      ewh.querySelectorAll('[data-rate]').forEach(b => b.addEventListener('click', () => {
        const i = +b.dataset.rate;
        rating[i] = b.dataset.v;
        ewh.querySelectorAll(`[data-rate="${i}"]`).forEach(x => x.classList.toggle('on', x === b));
        ewh.querySelector(`[data-ft="${i}"]`).hidden = b.dataset.v === 'full';
        update();
      }));
      ewh.querySelectorAll('[data-ftv]').forEach(b => b.addEventListener('click', () => {
        const i = +b.closest('[data-ft]').dataset.ft;
        ftSel[i] = ftSel[i] === b.dataset.ftv ? null : b.dataset.ftv;
        b.parentElement.querySelectorAll('button').forEach(x => x.classList.toggle('on', x.dataset.ftv === ftSel[i]));
      }));
      function update() {
        const res = ewh.querySelector('.sc-result');
        if (Object.keys(rating).length < part.schritte.length) { res.hidden = true; return; }
        const pts = part.schritte.reduce((a, st, i) => a + (rating[i] === 'full' ? st.punkte : rating[i] === 'half' ? st.punkte / 2 : 0), 0);
        const pct = Math.round(pts / part.be * 100);
        const hyper = conf === 3 && pct < 60;
        res.hidden = false;
        res.innerHTML = `<div class="score-big"><div><b class="num">${fmt(pts)}</b><span>von ${part.be} BE</span></div><div class="np"><b class="num">${notenpunkte(pct)}</b><span>Notenpunkte</span></div></div>
          ${hyper ? `<p class="hyper">${icon('alert')}Du warst dir sicher, aber es hat nicht gestimmt. Genau solche Fehler merkt man sich am besten. Diese Aufgabe kommt bald wieder.</p>` : ''}
          <p class="dim np-note">Umrechnung nach der üblichen Oberstufen-Tabelle (95 % = 15 NP … 20 % = 1 NP). Deine Lehrkraft kann abweichen.</p>
          <button class="btn primary block" type="button" data-save>${icon('check')}Ergebnis speichern</button>`;
        res.querySelector('[data-save]').onclick = () => {
          LR.log('practice', part.id, { pts, max: part.be, conf, topic: opts.topic });
          part.schritte.forEach((st, i) => { if (rating[i] !== 'full') LR.log('mistake', `${part.id}:${i}`, { typ: ftSel[i] || null, rating: rating[i], topic: opts.topic }); });
          ewh.querySelectorAll('button').forEach(x => { x.disabled = true; });
          res.querySelector('[data-save]').outerHTML = `<p class="saved">${icon('check')}Gespeichert${Object.values(rating).some(r => r !== 'full') ? '. Fehler sind für die Fehlerjagd vorgemerkt.' : '.'}</p>`;
          done(pts, part.be);
        };
      }
    }
  }

  // ------------------------------------------------------------ Demo: Tangente gleitet über den Graphen
  function demoTangente(host, def, ctx) {
    const F = (window.LR_FN || {})[def.f];
    if (!F) return;
    const { icon } = ctx;
    const W = 640, H = 340, m = 30;
    const sx = x => m + (x - F.xmin) / (F.xmax - F.xmin) * (W - 2 * m), sy = y => H - m - (y - F.ymin) / (F.ymax - F.ymin) * (H - 2 * m);
    let d = '';
    for (let i = 0; i <= 200; i++) { const x = F.xmin + (F.xmax - F.xmin) * i / 200; d += (i ? 'L' : 'M') + sx(x).toFixed(1) + ' ' + sy(F.f(x)).toFixed(1); }
    let grid = '';
    for (let x = Math.ceil(F.xmin); x <= F.xmax; x++) grid += `<line x1="${sx(x)}" x2="${sx(x)}" y1="${m / 2}" y2="${H - m / 2}" class="g"/><text x="${sx(x)}" y="${H - 6}" class="t" text-anchor="middle">${x}</text>`;
    for (let y = Math.ceil(F.ymin); y <= F.ymax; y += 2) grid += `<line y1="${sy(y)}" y2="${sy(y)}" x1="${m / 2}" x2="${W - m / 2}" class="g"/><text x="${m / 2 - 2}" y="${sy(y) + 4}" class="t" text-anchor="end">${y}</text>`;
    host.innerHTML = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Graph mit beweglicher Tangente">
      <defs><clipPath id="tclip"><rect x="${m / 2}" y="${m / 2}" width="${W - m}" height="${H - m}"/></clipPath></defs>
      ${grid}<line x1="${m / 2}" x2="${W - m / 2}" y1="${sy(0)}" y2="${sy(0)}" class="ax"/><line x1="${sx(0)}" x2="${sx(0)}" y1="${m / 2}" y2="${H - m / 2}" class="ax"/>
      <g clip-path="url(#tclip)"><path d="${d}" class="curve"/><line id="tan" class="tan"/></g>
      <circle id="tp" r="8" class="tp"/></svg>
      <input class="slider" id="tSl" type="range" min="${F.xmin + 0.1}" max="${F.xmax - 0.1}" step="0.01" value="0.2" aria-label="Stelle x">
      <div class="read"><span>x = <b id="rx"></b></span><span>Steigung f′(x) = <b id="rs"></b></span><span class="flat" id="flat" hidden>${icon('check')}waagerecht</span></div>`;
    const sl = host.querySelector('#tSl'), tan = host.querySelector('#tan'), tp = host.querySelector('#tp');
    const found = new Set();
    function upd() {
      const a = +sl.value, s = F.d(a), y = F.f(a);
      const x1 = F.xmin, x2 = F.xmax;
      tan.setAttribute('x1', sx(x1)); tan.setAttribute('y1', sy(y + s * (x1 - a)));
      tan.setAttribute('x2', sx(x2)); tan.setAttribute('y2', sy(y + s * (x2 - a)));
      tp.setAttribute('cx', sx(a)); tp.setAttribute('cy', sy(y));
      host.querySelector('#rx').textContent = fmt(a);
      host.querySelector('#rs').textContent = fmt(s);
      const flat = Math.abs(s) < 0.12;
      host.querySelector('#flat').hidden = !flat;
      host.classList.toggle('is-flat', flat);
      if (flat) found.add(Math.round(a));
    }
    sl.addEventListener('input', upd); upd();
  }

  // ------------------------------------------------------------ Ansichten
  const T = {};

  T.overview = (topic, ctx) => {
    const { icon, LR, subjStyle, byId, M } = ctx;
    const s = byId[topic.fach];
    const pr = progress(LR, topic);
    const steps = topic.stufen.map((st, i) => {
      const b = pr.best[i];
      const state = b >= PASS ? 'done' : i === pr.rec ? 'rec' : b != null ? 'tried' : '';
      const end = b >= PASS ? `<span class="chip ok">${icon('check')}${b} %</span>` : i === pr.rec ? `<span class="chip subj">Empfohlen</span>` : b != null ? `<span class="chip warn">${b} %</span>` : '';
      return `<a class="stair-step ${state}" href="#/thema/${topic.id}/${i}" style="--i:${i}">
        <span class="st-n">${b >= PASS ? icon('check') : i}</span>
        <span class="row-main"><span class="row-title">${NAMES[i]}</span><span class="row-sub">${DESC[i]}</span></span>
        <span class="row-end">${end}${icon('right', 'chev')}</span></a>`;
    }).join('');
    const html = `<div ${subjStyle(s)} class="rise">
      <div class="page-head"><span class="kicker">Lerntreppe · ${s ? s.name.replace(/ (eA|gA)$/, '') : ''}${topic.demo ? ' · Demo' : ''}</span><h2 class="h-1">${M(topic.titel)}</h2><p class="muted">${M(topic.kurz)}</p>
        ${topic.demo ? `<div class="notice">${icon('info')}<div>Demo-Inhalt zum Testen der Lerntreppe. Echte Themen aus dem Unterricht kommen nach dem Fundament.</div></div>` : ''}</div>
      <div class="stair">${steps}</div>
      <div class="card entry">${icon('target')}<div class="row-main"><span class="row-title">Kennst du das schon?</span><span class="row-sub">3 kurze Fragen, danach springst du direkt auf die passende Stufe. Gesperrt ist nichts, du kannst jede Stufe öffnen.</span></div><a class="btn small" href="#/thema/${topic.id}/check">Eingangs-Check</a></div>
      <p class="row-sub legend">Status: <b>${pr.status}</b> · Eine Stufe gilt ab ${PASS} % als geschafft.</p></div>`;
    return { title: topic.titel.replace(/\$/g, ''), back: `#/fach/${topic.fach}`, nav: 'faecher', html };
  };

  T.check = (topic, ctx) => {
    const { LR, subjStyle, byId, icon } = ctx;
    const B = api(ctx);
    const s = byId[topic.fach];
    const html = `<div ${subjStyle(s)} class="rise"><div class="page-head"><span class="kicker">Eingangs-Check · 3 Fragen</span><h2 class="h-1">Was kannst du schon?</h2><p class="muted">Ohne Druck: Es geht nur darum, wo du anfängst.</p></div>
      <div class="mcq-list">${topic.check.map((q, i) => B.mcq(q, 'c' + i)).join('')}</div><div id="checkRes" class="finish" hidden></div></div>`;
    return {
      title: 'Eingangs-Check', back: `#/thema/${topic.id}`, nav: 'faecher', focus: true, html,
      after(root) {
        let n = 0, right = 0;
        topic.check.forEach((q, i) => bindMcq(root, 'c' + i, q, ok => {
          n++; if (ok) right++;
          if (n < topic.check.length) return;
          const start = right;  // 0→Stufe 0 … 3→Stufe 3
          LR.log('entry', topic.id, { score: right, start });
          const r = root.querySelector('#checkRes');
          r.hidden = false;
          r.innerHTML = `<h3 class="h-2">${right} von ${topic.check.length} richtig</h3><p class="muted">Empfehlung: Starte mit <b>Stufe ${start} · ${NAMES[start]}</b>.${start > 0 ? ' Die Stufen davor kannst du jederzeit öffnen.' : ''}</p>
            <a class="btn primary" href="#/thema/${topic.id}/${start}">Stufe ${start} öffnen ${icon('arrow', 'go')}</a>`;
          r.scrollIntoView({ behavior: ctx.reduced ? 'auto' : 'smooth', block: 'center' });
        }));
      }
    };
  };

  T.stage = (topic, n, ctx) => {
    const { M, icon, LR, subjStyle, byId, esc } = ctx;
    const B = api(ctx);
    const st = topic.stufen[n];
    if (!st) return T.overview(topic, ctx);
    const s = byId[topic.fach];
    const task = st.task;
    const head = `${B.pills(topic, n)}<div class="page-head"><span class="kicker">Stufe ${n} · ${NAMES[n]} · ${HELP[n]}</span><h2 class="h-1">${task ? esc(task.titel) : NAMES[n]}</h2><p class="muted">${DESC[n]}</p></div>`;
    let body = '';

    if (st.typ === 'sehen') {
      body = `<div class="demo tdemo" id="tdemo"></div><p class="prose">${M(st.text)}</p><div class="spacer"></div>${B.mcq(st.frage, 'q0')}`;
    } else if (st.typ === 'beispiel') {
      const p = task.parts[0];
      body = `<div class="q">${M(p.frage)}</div><div class="rw" id="rw"></div><div id="stepCtl" class="step-ctl"></div>`;
    } else if (st.typ === 'luecken') {
      const p = task.parts[0];
      const firstGap = p.schritte.findIndex(x => x.luecke); // spätere Schritte würden die Lücke verraten → erst danach zeigen
      body = `<div class="q">${M(p.frage)}</div><p class="muted how">Rechne die fehlenden Werte auf Papier und trage sie ein. Ein Tipp kostet einen halben Punkt, „Lösung zeigen“ einen ganzen.</p>
        <div class="rw">${p.schritte.map((x, i) => x.luecke ? B.step(x, i, {
          cls: 'has-gap' + (i > firstGap ? ' locked' : ''), why: false, cas: false,
          body: `<div class="rw-math gap-math">${M(x.luecke.rechnung)}</div><div class="gap-fields">${x.luecke.felder.map(f => B.cpField(f, `g${i}-${f.id}`)).join('')}</div>
            <div class="gap-tools"><button class="btn small" type="button" data-gtip="${i}">${icon('bulb')}Tipp</button><button class="btn small" type="button" data-gsol="${i}">${icon('eye')}Lösung zeigen</button></div><div class="gap-hint" id="gh${i}" hidden>${M(x.luecke.tipp || '')}</div>`
        }) : B.step(x, i, { cls: i > firstGap ? 'locked' : '' })).join('')}</div>`;
    } else if (st.typ === 'geruest') {
      const p = task.parts[0];
      body = `<div class="q">${M(p.frage)}</div>
        <div class="paper">${icon('pencil')}<div><b>Auf Papier lösen.</b> Die Schritte stehen unten. Trag deine Zwischenergebnisse ein, das Portal prüft sie sofort.</div></div>
        <div class="rw scaffold">${p.schritte.map((x, i) => {
          const cps = p.checkpoints.filter(c => c.schritt === i);
          return B.step(x, i, {
            cas: false, why: false,
            body: `${x.hinweis ? `<details class="hint-fold"><summary>${icon('bulb')}Hinweis</summary><div class="prose">${M(x.hinweis)}</div></details>` : ''}${cps.length ? `<div class="gap-fields">${cps.map(c => B.cpField(c, `c-${c.id}`)).join('')}</div>` : ''}`
          });
        }).join('')}</div>
        <button class="btn primary block" type="button" id="toEwh">${icon('eye')}Fertig – mit dem Erwartungshorizont vergleichen</button>
        <div id="sc0" hidden></div>`;
    } else if (st.typ === 'abi') {
      const total = task.parts.reduce((a, p) => a + p.be, 0);
      const fn = task.fig && (window.LR_FN || {})[task.fig.f];
      body = `<div class="abi-head"><span class="chip">Teil ${task.teil}${task.teil === 'B' ? ' · mit CAS' : ' · ohne Hilfsmittel'}</span><span class="chip">${total} BE</span></div>
        <p class="abi-src dim">${esc(task.kennung || '')}</p>
        <div class="prose">${M(task.intro || '')}</div>
        ${fn ? ctx.figSvg(Object.assign({}, task.fig, { kind: 'fn', f: fn.f })) : ''}
        ${task.parts.map((p, pi) => `<section class="apart" id="ap${pi}">
          <div class="part-head"><span class="lab">${p.label}</span><span class="chip">AFB ${p.afb}</span><span class="chip be">${p.be} BE</span></div>
          <div class="prose">${M(p.frage)}</div>
          <div class="paper small">${icon('pencil')}<div>Auf Papier lösen, dann Ergebnisse eintragen.</div></div>
          <div class="gap-fields">${p.checkpoints.map(c => B.cpField(c, `a${pi}-${c.id}`)).join('')}</div>
          <div class="gap-tools">${(p.tipps || []).length ? `<button class="btn small" type="button" data-tip="${pi}">${icon('bulb')}<span>Tipp 1 von ${p.tipps.length}</span></button>` : ''}
            <button class="btn small primary" type="button" data-ewh="${pi}">${icon('eye')}Erwartungshorizont</button></div>
          <div class="tips" id="tips${pi}"></div>
          <div id="sc${pi}" hidden></div></section>`).join('')}`;
    }

    const html = `<div ${subjStyle(s)} class="rise stage">${head}${body}${B.finish()}</div>`;
    return {
      title: `Stufe ${n} · ${NAMES[n]}`, back: `#/thema/${topic.id}`, nav: 'faecher', focus: true, html,
      after(root) { bindStage(root, topic, n, st, ctx); }
    };
  };

  function bindStage(root, topic, n, st, ctx) {
    const { M, icon, LR } = ctx;
    const B = api(ctx);
    const finish = pct => {
      pct = Math.max(0, Math.min(100, Math.round(pct)));
      LR.log('stage', `${topic.id}:${n}`, { topic: topic.id, stufe: n, pct });
      const f = root.querySelector('#finish');
      const last = n >= topic.stufen.length - 1;
      const passed = pct >= PASS;
      f.hidden = false;
      f.innerHTML = `<div class="done-badge${passed ? '' : ' soft'}">${icon(passed ? 'check' : 'flip')}</div>
        <h3 class="h-1">${passed ? `Stufe ${n} geschafft` : `Stufe ${n}: ${pct} %`}</h3>
        <p class="muted">${passed ? (last ? 'Du hast die ganze Treppe geschafft. Ab jetzt hält Wiederholen es frisch.' : `Weiter mit Stufe ${n + 1}: ${NAMES[n + 1]}.`) : `Ab ${PASS} % gilt eine Stufe als geschafft. Noch einmal lohnt sich, weiter darfst du trotzdem.`}</p>
        ${topic.kann && passed ? `<div class="can"><span class="kicker">Das kannst du jetzt</span><ul>${topic.kann.slice(0, 3).map(k => `<li>${icon('check')}<span>${M(k)}</span></li>`).join('')}</ul></div>` : ''}
        <div class="finish-btns">${!last ? `<a class="btn ${passed ? 'primary' : ''}" href="#/thema/${topic.id}/${n + 1}">${passed ? `Stufe ${n + 1}` : 'Trotzdem weiter'} ${icon('arrow', 'go')}</a>` : ''}
          ${!passed ? `<button class="btn primary" type="button" data-again>${icon('flip')}Nochmal</button>` : ''}
          <a class="btn" href="#/thema/${topic.id}">Zur Treppe</a></div>`;
      const ag = f.querySelector('[data-again]'); if (ag) ag.onclick = () => location.reload();
      f.scrollIntoView({ behavior: ctx.reduced ? 'auto' : 'smooth', block: 'center' });
    };

    if (st.typ === 'sehen') {
      demoTangente(root.querySelector('#tdemo'), st.demo, ctx);
      const box = root.querySelector('[data-mcq="q0"]');
      box.dataset.expl = M(st.frage.erklaerung || '');
      bindMcq(root, 'q0', st.frage, ok => finish(ok ? 100 : 60));
    }

    if (st.typ === 'beispiel') {
      const p = st.task.parts[0];
      const rw = root.querySelector('#rw'), ctl = root.querySelector('#stepCtl');
      let k = 0, asked = 0, right = 0;
      const next = () => {
        if (k >= p.schritte.length) { finish(asked ? 50 + 50 * right / asked : 100); ctl.innerHTML = ''; return; }
        const x = p.schritte[k];
        if (x.vorher) {
          ctl.innerHTML = `<div class="predict"><span class="kicker">${icon('bulb')}Was kommt als Nächstes?</span>${B.mcq(x.vorher, 'v' + k)}</div>`;
          bindMcq(ctl, 'v' + k, x.vorher, ok => { asked++; if (ok) right++; setTimeout(reveal, ctx.reduced ? 0 : 650); });
        } else {
          ctl.innerHTML = `<button class="btn block" type="button" id="nx">${icon('eye')}${x.antwort ? 'Antwortsatz zeigen' : `Schritt ${k + 1} zeigen`}</button>`;
          ctl.querySelector('#nx').onclick = reveal;
        }
      };
      const reveal = () => {
        rw.insertAdjacentHTML('beforeend', B.step(p.schritte[k], k, { cls: 'enter' }));
        const el = rw.lastElementChild;
        el.scrollIntoView({ behavior: ctx.reduced ? 'auto' : 'smooth', block: 'center' });
        k++;
        ctl.innerHTML = k < p.schritte.length ? `<button class="btn primary block" type="button" id="nx">Weiter ${icon('arrow', 'go')}</button>` : '';
        if (k < p.schritte.length) ctl.querySelector('#nx').onclick = next; else next();
      };
      next();
    }

    if (st.typ === 'luecken') {
      const p = st.task.parts[0];
      const gaps = p.schritte.map((x, i) => x.luecke ? i : -1).filter(i => i >= 0);
      const score = {}, tipUsed = {};
      const solveGap = (i, val) => {
        if (score[i] != null) return;
        score[i] = tipUsed[i] ? Math.min(val, 0.5) : val;
        const stepEl = root.querySelector(`.rw-step[data-i="${i}"]`);
        stepEl.querySelector('.gap-math').outerHTML = `<div class="rw-math enter">${M(p.schritte[i].rechnung)}</div>${B.cas(p.schritte[i].cas)}`;
        stepEl.querySelectorAll('.gap-tools, .gap-hint').forEach(e => e.remove());
        stepEl.querySelectorAll('.field input, .field button').forEach(e => { e.disabled = true; });
        stepEl.classList.add(score[i] === 1 ? 'gap-ok' : 'gap-shown');
        const nextGap = gaps.find(g => score[g] == null);
        root.querySelectorAll('.rw-step.locked').forEach(el => { if (nextGap == null || +el.dataset.i <= nextGap) el.classList.remove('locked'); });
        if (gaps.every(g => score[g] != null)) finish(100 * gaps.reduce((a, g) => a + score[g], 0) / gaps.length);
      };
      gaps.forEach(i => {
        const x = p.schritte[i], ok = {};
        bindCheckpoints(root, x.luecke.felder.map(f => ({ key: `g${i}-${f.id}`, cp: f })), (key, good) => {
          ok[key] = good;
          if (x.luecke.felder.every(f => ok[`g${i}-${f.id}`])) setTimeout(() => solveGap(i, 1), 450);
        });
        root.querySelector(`[data-gtip="${i}"]`).onclick = e => { tipUsed[i] = true; root.querySelector('#gh' + i).hidden = false; e.currentTarget.disabled = true; };
        root.querySelector(`[data-gsol="${i}"]`).onclick = () => solveGap(i, 0);
      });
    }

    if (st.typ === 'geruest') {
      const p = st.task.parts[0];
      const cpRes = {};
      bindCheckpoints(root, p.checkpoints.map(c => ({ key: `c-${c.id}`, cp: c })), (k, ok) => { cpRes[k] = ok; });
      root.querySelector('#toEwh').onclick = e => {
        e.currentTarget.remove();
        const host = root.querySelector('#sc0');
        selfCheck(ctx, host, p, { topic: topic.id, casFold: false }, (pts, max) => finish(100 * pts / max));
        const nOk = Object.values(cpRes).filter(Boolean).length;
        host.insertAdjacentHTML('afterbegin', `<p class="cp-sum">${icon('target')}Deine eingetippten Zwischenergebnisse: <b>${nOk} von ${p.checkpoints.length}</b> richtig.</p>`);
      };
    }

    if (st.typ === 'abi') {
      const task = st.task;
      const got = {};
      task.parts.forEach((p, pi) => {
        bindCheckpoints(root, p.checkpoints.map(c => ({ key: `a${pi}-${c.id}`, cp: c })));
        const tb = root.querySelector(`[data-tip="${pi}"]`);
        if (tb) {
          let t = 0;
          tb.onclick = () => {
            if (t >= p.tipps.length) return;
            root.querySelector('#tips' + pi).insertAdjacentHTML('beforeend', `<div class="hint">${icon('bulb')}<div class="prose">${M(p.tipps[t])}</div></div>`);
            t++;
            tb.querySelector('span').textContent = t >= p.tipps.length ? 'Alle Tipps gezeigt' : `Tipp ${t + 1} von ${p.tipps.length}`;
            if (t >= p.tipps.length) tb.disabled = true;
          };
        }
        root.querySelector(`[data-ewh="${pi}"]`).onclick = e => {
          e.currentTarget.disabled = true;
          selfCheck(ctx, root.querySelector('#sc' + pi), p, { topic: topic.id, casFold: task.teil === 'B' }, (pts, max) => {
            got[pi] = [pts, max];
            if (Object.keys(got).length === task.parts.length) {
              const P = Object.values(got).reduce((a, v) => a + v[0], 0), Mx = Object.values(got).reduce((a, v) => a + v[1], 0);
              finish(100 * P / Mx);
            }
          });
        };
      });
    }
  }

  window.LRTreppe = Object.assign(T, { progress, notenpunkte, parseNum, NAMES, PASS });
})();
