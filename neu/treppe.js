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
    const best = {}, ex = {}; // ex: beste Prozentzahl je besonderer Übung (blurting, fehler, erlaeutern, deuten)
    let entry = null;
    LR.events().forEach(e => {
      if (e.type === 'stage' && e.data && e.data.topic === topic.id) best[e.data.stufe] = Math.max(best[e.data.stufe] || 0, e.data.pct);
      if (e.type === 'entry' && e.ref === topic.id) entry = e.data;
      if (e.type === 'extra' && e.data && e.data.topic === topic.id) ex[e.data.kind] = Math.max(ex[e.data.kind] || 0, e.data.pct);
      if (e.type === 'blurt' && e.data && e.data.topic === topic.id) ex.blurting = Math.max(ex.blurting || 0, e.data.pct);
    });
    let rec = topic.stufen.findIndex((_, i) => !(best[i] >= PASS));
    if (rec < 0) rec = topic.stufen.length - 1;
    if (entry && entry.start > rec && !(best[entry.start] >= PASS)) rec = entry.start;
    const reached = Object.keys(best).filter(k => best[k] >= PASS).map(Number);
    const top = reached.length ? Math.max(...reached) : -1;
    const status = !Object.keys(best).length ? 'offen' : top <= 2 ? 'begonnen' : 'unsicher'; // „sicher“ kommt mit der Wiederholung (S4)
    return { best, rec, status, entry, ex };
  }

  // ------------------------------------------------------------ „Frag Claude“ (Portalplan 5.3 / 4.1)
  // Kopiert Aufgabe + eigene Eingaben + Fehlertypen als Text. Kein Schlüssel, keine Übertragung:
  // Tonda fügt den Text selbst im Chat ein. Gelesen wird direkt aus der Seite (Zahlenfelder, Auswahl, Selbstkorrektur).
  function askText(root, meta) {
    const L = ['Hallo Claude, ich brauche Hilfe im Lernraum.', `Fach: ${meta.fach} · Thema: ${meta.thema} · ${meta.wo}`];
    const auf = typeof meta.aufgabe === 'function' ? meta.aufgabe() : meta.aufgabe;
    if (auf) L.push('', 'Aufgabe:', auf);
    const cps = [...root.querySelectorAll('.field.cp')].map(f => {
      const v = f.querySelector('input').value.trim();
      return v ? `- ${f.querySelector('label').textContent.trim()}: ${v} (${f.classList.contains('ok') ? 'richtig' : f.classList.contains('bad') ? 'falsch' : 'noch nicht geprüft'})` : null;
    }).filter(Boolean);
    if (cps.length) L.push('', 'Meine Zahlen-Eingaben:', ...cps);
    const mcqs = [...root.querySelectorAll('.mcq.answered')].map(b => {
      const bad = b.querySelector('.opt.wrong'), good = b.querySelector('.opt.right');
      const pick = bad || good;
      return pick ? `- ${b.dataset.qraw} → meine Antwort: ${pick.dataset.raw} (${bad ? 'falsch' : 'richtig'})` : null;
    }).filter(Boolean);
    if (mcqs.length) L.push('', 'Meine Antworten auf Auswahlfragen:', ...mcqs);
    const rated = [...root.querySelectorAll('.rw-step')].map(st => {
      const r = st.querySelector('.rate3 .on'); if (!r) return null;
      const ft = st.querySelector('.ft-chips .on');
      const nm = st.querySelector('.rw-name'); // Name nur, wenn er reiner Text ist (keine doppelten KaTeX-Texte)
      return `- Schritt ${+st.dataset.i + 1}${nm && !nm.querySelector('.katex') ? ` (${nm.textContent.trim()})` : ''}: ${r.textContent}${ft ? ` (Fehlertyp: ${ft.dataset.ftv})` : ''}`;
    }).filter(Boolean);
    if (rated.length) L.push('', 'Meine Selbstkorrektur am Erwartungshorizont:', ...rated);
    const conf = root.querySelector('.conf .on'); if (conf) L.push(`Meine Sicherheit vorher: ${conf.textContent.replace(/^\d/, '').trim()}`);
    if (meta.extra) { const x = meta.extra(); if (x && x.length) L.push('', ...x); }
    L.push('', 'Wo ich nicht weiterkomme: [hier kurz ergänzen]', '', 'Bitte erst ein Denkanstoß oder Hinweis, die volle Lösung nur, wenn ich ausdrücklich danach frage.');
    return L.join('\n');
  }
  function toast(msg) {
    let t = document.getElementById('toast');
    if (!t) { t = document.createElement('div'); t.id = 'toast'; t.className = 'toast'; t.setAttribute('role', 'status'); t.setAttribute('aria-live', 'polite'); document.body.appendChild(t); }
    t.textContent = msg; t.classList.remove('show'); void t.offsetWidth; t.classList.add('show');
    clearTimeout(t._h); t._h = setTimeout(() => t.classList.remove('show'), 3800);
  }
  function bindAsk(root, ctx, meta) {
    root.querySelectorAll('[data-ask]').forEach(b => b.addEventListener('click', async () => {
      const text = askText(root, meta);
      let ok = false;
      try { await navigator.clipboard.writeText(text); ok = true; } catch (e) { /* z. B. kein Zugriff: Ausweichfenster */ }
      if (ok) { toast('Kopiert. Füge den Text jetzt bei Claude im Chat ein.'); return; }
      if (ctx.openSheet) ctx.openSheet(`${ctx.sheetHead('Text für Claude')}<p class="row-sub" style="margin-bottom:10px">Dein Gerät lässt das Kopieren nicht zu. Markiere den Text und kopiere ihn selbst.</p><textarea class="ask-box" readonly rows="12">${ctx.esc(text)}</textarea><div class="sheet-actions"><button class="btn primary" type="button" data-asksel>Alles markieren</button></div>`,
        box => { const ta = box.querySelector('textarea'); box.querySelector('[data-asksel]').onclick = () => { ta.focus(); ta.select(); }; ta.focus(); ta.select(); });
    }));
  }

  // ------------------------------------------------------------ Bausteine (HTML)
  function api(ctx) {
    const { M, icon, esc } = ctx;
    const B = {};

    B.pills = (topic, cur) => `<nav class="st-pills" aria-label="Stufen">${topic.stufen.map((_, i) =>
      `<a href="#/thema/${topic.id}/${i}" class="${i === cur ? 'on' : ''}" aria-current="${i === cur ? 'step' : 'false'}" title="Stufe ${i}: ${NAMES[i]}"><span>${i}</span></a>`).join('')}</nav>`;

    // data-qraw / data-raw: Rohtext (mit $…$) für „Frag Claude“, damit keine doppelten KaTeX-Texte im Zwischenspeicher landen
    B.mcq = (q, key) => `<div class="mcq" data-mcq="${key}" data-qraw="${esc(q.frage)}" data-expl="${esc(M(q.erklaerung || ''))}">
      <p class="mcq-q">${M(q.frage)}</p>
      <div class="mcq-opts">${q.optionen.map((o, i) => `<button type="button" class="opt" data-o="${i}" data-raw="${esc(o)}"><span class="opt-k">${'ABCD'[i]}</span><span class="opt-t">${M(o)}</span></button>`).join('')}</div>
      <div class="mcq-fb" hidden></div></div>`;

    B.ask = () => `<button class="btn small ask-btn" type="button" data-ask title="Kopiert Aufgabe, deine Eingaben und Fehlertypen. Du fügst den Text bei Claude im Chat ein.">${icon('copy')}Frag Claude</button>`;

    B.cas = (cas, collapsed) => {
      if (!cas) return '';
      // Hochzahlen wie auf dem TI-Nspire-Bildschirm hochgestellt: x^2 → x², x^(n+1) → x hoch (n+1)
      const sup = s => esc(s).replace(/\^\(([^()]*)\)|\^(-?[\w.]+)/g, (m0, a, b) => `<sup>${a != null ? a : b}</sup>`);
      const line = `<div class="rw-cas"><span class="cas-tag">${icon('calc')}TI-Nspire CAS</span><code title="Hochzahl im Rechner mit der Taste ^">${sup(cas.eingabe)}</code><span class="cas-to">${icon('arrow')}</span><code class="cas-out">${sup(cas.ausgabe)}</code></div>`;
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
      fb.innerHTML = (ok ? '<b>Richtig.</b> ' : '<b>Noch nicht.</b> Richtig ist ' + 'ABCD'[q.richtig] + '. ') + (q.erklaerung ? box.dataset.expl || '' : '');
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

  // Entwurf der Selbstkorrektur (bis „Speichern“): übersteht Seitenwechsel und Zurückgehen in diesem Tab
  const draftKey = (LR, id) => `lr:draft:${LR.activeId()}:${id}`;
  function draftGet(LR, id) { try { return JSON.parse(sessionStorage.getItem(draftKey(LR, id)) || 'null'); } catch (e) { return null; } }
  function draftSet(LR, id, d) { try { if (d) sessionStorage.setItem(draftKey(LR, id), JSON.stringify(d)); else sessionStorage.removeItem(draftKey(LR, id)); } catch (e) { /* egal */ } }

  // Selbstkorrektur: Sicherheit → Erwartungshorizont abhaken → BE → Fehlertypen → speichern
  function selfCheck(ctx, host, part, opts, done) {
    const { M, icon, LR } = ctx;
    const B = api(ctx);
    const n = part.schritte.length;
    const draft = draftGet(LR, part.id) || {};
    let conf = 0;
    const rating = {}, ftSel = {};
    const keep = () => draftSet(LR, part.id, { conf, rating, ft: ftSel });
    host.innerHTML = `<div class="sc">
      <div class="sc-conf"><span class="kicker">Bevor du die Lösung siehst</span><p class="sc-q">Wie sicher bist du, dass deine Lösung stimmt?</p>
        <div class="conf">${['unsicher', 'ziemlich sicher', 'sehr sicher'].map((l, i) => `<button type="button" data-conf="${i + 1}"><b>${i + 1}</b>${l}</button>`).join('')}</div></div>
      <div class="sc-ewh" hidden></div></div>`;
    host.hidden = false;
    const pickConf = (v, silent) => {
      conf = v;
      host.querySelectorAll('[data-conf]').forEach(x => { x.classList.toggle('on', +x.dataset.conf === v); x.disabled = true; });
      keep();
      showEwh(silent);
    };
    host.querySelectorAll('[data-conf]').forEach(b => b.addEventListener('click', () => pickConf(+b.dataset.conf)));

    function showEwh(silent) {
      const ewh = host.querySelector('.sc-ewh');
      ewh.innerHTML = `<div class="sc-title"><span class="kicker">Erwartungshorizont · ${part.be} BE</span><p class="muted">Vergleiche jeden Schritt mit deinem Blatt und tippe an, wie er bei dir war. Bei „fast“ oder „fehlte“ kannst du sagen, woran es lag.</p>${window.LRReplay ? LRReplay.button('Lösungsweg als Replay') : ''}</div>
        <div class="rw">${part.schritte.map((st, i) => B.step(st, i, {
          casFold: opts.casFold,
          body: st.kern ? `<div class="rw-math prose">${M(st.rechnung)}</div>` : undefined, // Kernpunkte (Text statt Rechnung)
          after: `<div class="rate3" role="group" aria-label="Wie war dein Schritt?">${[['hatte ich', 'full'], ['fast', 'half'], ['fehlte', 'none']].map(([l, v]) => `<button type="button" data-rate="${i}" data-v="${v}">${l}</button>`).join('')}</div>
            <div class="ftype" data-ft="${i}" hidden><span class="kicker">Woran lag es? (optional)</span><div class="ft-chips">${FTYPES.map(f => `<button type="button" data-ftv="${f}">${f}</button>`).join('')}</div></div>`
        })).join('')}</div>
        <div class="sc-result"></div>
        <div class="sc-prog" role="status"></div>`;
      ewh.hidden = false;
      if (window.LRReplay) LRReplay.bind(ewh, ctx, part, { titel: 'Erwartungshorizont', frage: part.frage });
      if (!silent) ewh.scrollIntoView({ behavior: ctx.reduced ? 'auto' : 'smooth', block: 'start' });
      const stepEl = i => ewh.querySelectorAll('.rw > .rw-step')[i];
      const rate = (i, v, scroll) => {
        rating[i] = v;
        ewh.querySelectorAll(`[data-rate="${i}"]`).forEach(x => x.classList.toggle('on', x.dataset.v === v));
        ewh.querySelector(`[data-ft="${i}"]`).hidden = v === 'full';
        stepEl(i).classList.add('rated');
        keep(); update();
        if (scroll && v === 'full') nextOpen(i);
      };
      const nextOpen = i => { // zum nächsten noch nicht bewerteten Schritt, sonst zum Ergebnis
        const j = part.schritte.findIndex((_, k) => k > i && !rating[k]);
        const el = j >= 0 ? stepEl(j) : ewh.querySelector('.sc-result');
        if (el) setTimeout(() => el.scrollIntoView({ behavior: ctx.reduced ? 'auto' : 'smooth', block: j >= 0 ? 'center' : 'start' }), 120);
      };
      ewh.querySelectorAll('[data-rate]').forEach(b => b.addEventListener('click', () => rate(+b.dataset.rate, b.dataset.v, true)));
      ewh.querySelectorAll('[data-ftv]').forEach(b => b.addEventListener('click', () => {
        const i = +b.closest('[data-ft]').dataset.ft;
        ftSel[i] = ftSel[i] === b.dataset.ftv ? null : b.dataset.ftv;
        b.parentElement.querySelectorAll('button').forEach(x => x.classList.toggle('on', x.dataset.ftv === ftSel[i]));
        keep();
        if (ftSel[i]) nextOpen(i);
      }));
      function update() {
        const res = ewh.querySelector('.sc-result'), prog = ewh.querySelector('.sc-prog');
        const k = Object.keys(rating).length;
        if (k < n) {
          res.innerHTML = `<div class="sc-open"><p><b>${k} von ${n} Schritten bewertet.</b> Bewerte alle Schritte, dann siehst du deine Punkte und kannst speichern.</p>
            ${k > 0 ? `<button class="btn small" type="button" data-rest>${icon('check')}Alle übrigen: hatte ich</button>` : ''}</div>`;
          const rb = res.querySelector('[data-rest]');
          if (rb) rb.onclick = () => { part.schritte.forEach((_, i) => { if (!rating[i]) rate(i, 'full', false); }); res.scrollIntoView({ behavior: ctx.reduced ? 'auto' : 'smooth', block: 'start' }); };
          prog.hidden = false;
          prog.innerHTML = `<span class="sc-prog-bar"><i style="width:${Math.round(k / n * 100)}%"></i></span><span>${k} von ${n} bewertet</span>`;
          return;
        }
        prog.hidden = false;
        prog.innerHTML = `<span class="sc-prog-bar"><i style="width:100%"></i></span><button type="button" class="link" data-tores>Alles bewertet · zum Speichern</button>`;
        prog.querySelector('[data-tores]').onclick = () => res.scrollIntoView({ behavior: ctx.reduced ? 'auto' : 'smooth', block: 'start' });
        const pts = part.schritte.reduce((a, st, i) => a + (rating[i] === 'full' ? st.punkte : rating[i] === 'half' ? st.punkte / 2 : 0), 0);
        const pct = Math.round(pts / part.be * 100);
        const hyper = conf === 3 && pct < 60;
        res.innerHTML = `<div class="score-big"><div><b class="num">${fmt(pts)}</b><span>von ${part.be} BE</span></div><div class="np"><b class="num">${notenpunkte(pct)}</b><span>Notenpunkte</span></div></div>
          ${hyper ? `<p class="hyper">${icon('alert')}Du warst dir sicher, aber es hat nicht gestimmt. Genau solche Fehler merkt man sich am besten. Sie kommen sofort in die Fehlerjagd.</p>` : ''}
          <p class="dim np-note">Umrechnung nach der üblichen Oberstufen-Tabelle (95 % = 15 NP … 20 % = 1 NP). Deine Lehrkraft kann abweichen.</p>
          <button class="btn primary block" type="button" data-save>${icon('check')}Ergebnis speichern</button>`;
        res.querySelector('[data-save]').onclick = () => {
          // Besondere Aufgaben (opts.kind) melden sich als „extra“, normale Aufgaben als „practice“
          if (opts.kind) LR.log('extra', `${opts.topic}:${opts.kind}`, { topic: opts.topic, kind: opts.kind, pct: Math.round(pts / part.be * 100), pts, max: part.be, conf });
          else LR.log('practice', part.id, { pts, max: part.be, conf, topic: opts.topic });
          const nMiss = part.schritte.filter((st, i) => rating[i] !== 'full').length;
          part.schritte.forEach((st, i) => { if (rating[i] !== 'full') LR.log('mistake', `${part.id}:${i}`, { typ: ftSel[i] || null, rating: rating[i], topic: opts.topic, conf }); });
          draftSet(LR, part.id, null);
          ewh.querySelectorAll('button').forEach(x => { x.disabled = true; });
          prog.remove();
          res.querySelector('[data-save]').outerHTML = `<p class="saved">${icon('check')}<span>Gespeichert.${nMiss ? ` ${nMiss === 1 ? 'Der Schritt ist' : `${nMiss} Schritte sind`} jetzt in der <a class="link" href="#/fehlerjagd">Fehlerjagd</a> und ${nMiss === 1 ? 'kommt' : 'kommen'} ${conf === 3 ? 'sofort' : 'morgen'} wieder.` : ''}</span></p>`;
          done(pts, part.be);
        };
      }
      // Entwurf wiederherstellen (z. B. nach Zurückgehen)
      Object.keys(draft.rating || {}).forEach(i => rate(+i, draft.rating[i], false));
      Object.keys(draft.ft || {}).forEach(i => { if (draft.ft[i]) { ftSel[i] = draft.ft[i]; ewh.querySelectorAll(`[data-ft="${i}"] [data-ftv]`).forEach(x => x.classList.toggle('on', x.dataset.ftv === draft.ft[i])); } });
      update();
    }
    if (draft.conf) pickConf(draft.conf, true);
  }
  const hasDraft = (LR, id) => !!(draftGet(LR, id) || {}).conf;

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

  // Besondere Übungen (S3): eigene Typen neben der Treppe, jede einzeln aufrufbar
  const EXTRAS = [
    ['blurting', 'Blurting', '5 Minuten, leeres Blatt: alles aufschreiben, was du weißt. Danach abhaken.', 'pencil', 'Zum Start oder zur Wiederholung'],
    ['fehler', 'Fehler finden', 'Eine vorgerechnete Lösung hat einen Fehler. Finde die Zeile.', 'alert', 'Ab Stufe 2'],
    ['erlaeutern', 'Lösungsweg erläutern', 'Ein fertiger Rechenweg: Was passiert in jeder Zeile, und warum?', 'book', 'AFB III, fester Abi-Typ'],
    ['deuten', 'Bedingung deuten', 'Aus einer Gleichung ein Bild und einen Satz machen.', 'eye', 'AFB III, fester Abi-Typ']
  ];
  function extrasList(topic, pr, ctx) {
    const { icon } = ctx;
    const have = EXTRAS.filter(([k]) => topic.extras && topic.extras[k]);
    if (!have.length) return '';
    return `<div class="section-head xhead"><h3 class="h-2">Besondere Übungen</h3></div>
      <div class="list xlist">${have.map(([k, name, desc, ic, tag]) => {
        const b = pr.ex[k];
        return `<a class="row" href="#/thema/${topic.id}/${k}"><span class="x-ic">${icon(ic)}</span><span class="row-main"><span class="row-title">${name}</span><span class="row-sub">${desc}</span></span><span class="row-end">${b != null ? `<span class="chip ${b >= PASS ? 'ok' : 'warn'}">${b} %</span>` : `<span class="chip">${tag}</span>`}${icon('right', 'chev')}</span></a>`;
      }).join('')}</div>`;
  }

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
      ${extrasList(topic, pr, ctx)}
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
    const head = `${B.pills(topic, n)}<div class="page-head"><span class="kicker">Stufe ${n} · ${NAMES[n]} · ${HELP[n]}</span><h2 class="h-1">${task ? esc(task.titel) : NAMES[n]}</h2><p class="muted">${DESC[n]}</p><div class="head-tools">${B.ask()}</div></div>`;
    let body = '';

    if (st.typ === 'sehen') {
      body = `<div class="demo tdemo" id="tdemo"></div><p class="prose">${M(st.text)}</p><div class="spacer"></div>${B.mcq(st.frage, 'q0')}`;
    } else if (st.typ === 'beispiel') {
      const p = task.parts[0];
      body = `<div class="q">${M(p.frage)}</div>${window.LRReplay ? `<div class="rp-offer">${LRReplay.button('Erst als Replay ansehen')}<span class="row-sub">Der ganze Weg baut sich wie an der Tafel auf. Danach rechnest du hier Schritt für Schritt mit.</span></div>` : ''}<div class="rw" id="rw"></div><div id="stepCtl" class="step-ctl"></div>`;
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
    const subj = ctx.byId[topic.fach];
    bindAsk(root, ctx, {
      fach: subj ? subj.name : topic.fach, thema: topic.titel.replace(/\$/g, ''), wo: `Stufe ${n} (${NAMES[n]})`,
      aufgabe: st.typ === 'sehen' ? `${st.text}\n${st.frage.frage}`
        : (st.task.intro ? st.task.intro + '\n' : '') + st.task.parts.map(p => `${p.label ? p.label + ' ' : ''}${p.frage} (${p.be} BE, AFB ${p.afb})`).join('\n')
    });
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
      if (window.LRReplay) LRReplay.bind(root, ctx, p, { titel: st.task.titel, frage: p.frage });
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
      if (hasDraft(LR, p.id)) root.querySelector('#toEwh').click(); // angefangene Bewertung wieder öffnen
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
        if (hasDraft(LR, p.id)) root.querySelector(`[data-ewh="${pi}"]`).click(); // angefangene Bewertung wieder öffnen
      });
    }
  }

  // Werkzeugkasten für extras.js (Blurting, Fehler finden, Erläutern, Deuten, Notation)
  window.LRTreppe = Object.assign(T, {
    progress, notenpunkte, parseNum, NAMES, PASS,
    kit: { api, bindMcq, bindCheckpoints, selfCheck, hasDraft, bindAsk, toast, near, fmt, FTYPES }
  });
})();
