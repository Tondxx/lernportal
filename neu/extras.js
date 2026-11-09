/* ==========================================================================
   BESONDERE ÜBUNGEN – Bauschritt S3 (Portalplan 5.4, 5.5, 14)
   Blurting · Fehler finden (Stufe 2b) · Lösungsweg erläutern · Bedingung deuten
   · Notation (Struktogramm/Pseudocode/Python). Läuft auf dem Werkzeugkasten von treppe.js.
   Ereignisse: blurt {topic,pct,…} · extra {topic,kind,pct} · mistake {…}
   Inhalte: topic.extras.{blurting,fehler,erlaeutern,deuten} in neu/content/*.js
   ========================================================================== */
(function () {
  'use strict';
  const X = {};
  const PASS = 80;
  const kit = () => window.LRTreppe.kit;
  const $ = (s, r) => r.querySelector(s);
  const $$ = (s, r) => Array.from(r.querySelectorAll(s));
  const back = topic => `#/thema/${topic.id}`;
  const subjName = (ctx, topic) => { const s = ctx.byId[topic.fach]; return s ? s.name.replace(/ (eA|gA)$/, '') : topic.fach; };
  const pctOf = (a, b) => b ? Math.round(100 * a / b) : 0;

  function frame(ctx, topic, { kicker, title, lead, ask }) {
    const { subjStyle, byId, esc } = ctx;
    const s = byId[topic.fach];
    return `<div ${subjStyle(s)} class="rise xpage">
      <div class="page-head"><span class="kicker">${esc(kicker)}</span><h2 class="h-1">${title}</h2>${lead ? `<p class="muted">${lead}</p>` : ''}${ask ? `<div class="head-tools">${kit().api(ctx).ask()}</div>` : ''}</div>`;
  }

  // Abschlusskarte (gleiches Aussehen wie bei den Stufen)
  function finishBox(root, ctx, o) {
    const { icon, M } = ctx;
    const f = $('#xfin', root); if (!f) return;
    const passed = o.pct >= PASS;
    f.hidden = false;
    f.innerHTML = `<div class="done-badge${passed ? '' : ' soft'}">${icon(passed ? 'check' : 'flip')}</div>
      <h3 class="h-1">${o.title}</h3>${o.text ? `<p class="muted">${o.text}</p>` : ''}
      <div class="finish-btns"><a class="btn primary" href="${o.href}">${o.label} ${icon('arrow', 'go')}</a>${o.again ? `<button class="btn" type="button" data-again>${icon('flip')}Nochmal</button>` : ''}</div>`;
    const ag = $('[data-again]', f); if (ag) ag.onclick = () => location.reload();
    f.scrollIntoView({ behavior: ctx.reduced ? 'auto' : 'smooth', block: 'center' });
  }

  // ------------------------------------------------------------ Blurting
  X.blurting = (topic, ctx) => {
    const bl = topic.extras && topic.extras.blurting;
    if (!bl) return window.LRTreppe.overview(topic, ctx);
    const { M, icon, LR, esc } = ctx;
    const html = `${frame(ctx, topic, { kicker: `Blurting · ${subjName(ctx, topic)}`, title: `${M(topic.titel)} aus dem Kopf` })}<div id="blStage"></div><div class="finish" id="xfin" hidden></div></div>`;
    return {
      title: 'Blurting', back: back(topic), nav: 'faecher', focus: true, html,
      after(root) {
        const host = $('#blStage', root);
        let minutes = bl.minuten || 5, usedMin = 0, timer = null;
        const stopTimer = () => { clearInterval(timer); timer = null; };

        const intro = () => {
          host.innerHTML = `<div class="card bl-intro">
            <ol class="bl-steps"><li><b>Leeres Blatt</b> nehmen. Buch und Notizen weg.</li><li>Der Timer läuft. Schreib alles auf, was du zum Thema weißt.</li><li>Danach vergleichst du mit einer Liste von Kernpunkten. Erst dann gibt es den Spickzettel.</li></ol>
            <div class="prose">${M(bl.aufforderung || '')}</div>
            <div class="bl-dur"><span class="kicker">Dauer</span><div class="chips" role="group" aria-label="Dauer">${[3, 5, 8].map(m => `<button type="button" class="chip pill" data-min="${m}" aria-pressed="${m === minutes}">${m} Min.</button>`).join('')}</div></div>
            <button class="btn primary block" type="button" id="blStart">${icon('play')}Timer starten</button></div>`;
          $$('[data-min]', host).forEach(b => b.addEventListener('click', () => { minutes = +b.dataset.min; $$('[data-min]', host).forEach(x => x.setAttribute('aria-pressed', String(x === b))); }));
          $('#blStart', host).onclick = run;
        };

        const run = () => {
          const total = minutes * 60000, end = Date.now() + total;
          host.innerHTML = `<div class="bl-run"><div class="bl-clock" role="timer" aria-live="off"><svg viewBox="0 0 100 100" aria-hidden="true"><circle class="bl-track" cx="50" cy="50" r="44"/><circle class="bl-prog" id="blProg" cx="50" cy="50" r="44" pathLength="100"/></svg>
            <div class="bl-time"><b class="num" id="blT">${minutes}:00</b><span class="kicker">Minuten</span></div></div>
            <p class="muted bl-msg" id="blMsg">Nicht nachschauen. Stichwörter reichen, Rechtschreibung ist egal.</p>
            <button class="btn primary block" type="button" id="blDone">${icon('check')}Fertig, jetzt vergleichen</button>
            <button class="link" type="button" id="blCancel">Abbrechen</button></div>`;
          const t = $('#blT', host), prog = $('#blProg', host), msg = $('#blMsg', host);
          const tick = () => {
            if (!t.isConnected) { stopTimer(); return; } // Seite gewechselt
            const left = Math.max(0, end - Date.now());
            const s = Math.ceil(left / 1000);
            t.textContent = `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
            prog.style.strokeDashoffset = String(100 * (1 - left / total));
            prog.style.opacity = left === 0 ? '0' : '1'; // sonst bleibt bei 0 Rest ein Punkt (runde Linienenden)
            if (left === 0 && !host.classList.contains('over')) { host.classList.add('over'); msg.textContent = 'Zeit ist um. Schreib den Gedanken zu Ende, dann geht es weiter.'; stopTimer(); }
          };
          stopTimer(); timer = setInterval(tick, 250); tick();
          $('#blDone', host).onclick = () => { usedMin = Math.min(minutes, Math.round((Date.now() - (end - total)) / 6000) / 10); stopTimer(); host.classList.remove('over'); rate(); };
          $('#blCancel', host).onclick = () => { stopTimer(); host.classList.remove('over'); intro(); };
        };

        const rate = () => {
          const kp = bl.kernpunkte, rating = {};
          host.innerHTML = `<div class="sc-title"><span class="kicker">Kernpunkte · ${kp.length}</span><h3 class="h-2">Was hattest du auf dem Blatt?</h3><p class="muted">Gehe Punkt für Punkt durch und hake ehrlich ab. „Halb“ heißt: Idee da, aber ungenau.</p></div>
            <ul class="kp-list">${kp.map((k, i) => `<li class="kp" data-kp="${i}"><div class="prose kp-t">${M(k)}</div><div class="rate3" role="group" aria-label="Hattest du diesen Punkt?">${[['hatte ich', 'full'], ['halb', 'half'], ['fehlte', 'none']].map(([l, v]) => `<button type="button" data-rate="${i}" data-v="${v}">${l}</button>`).join('')}</div></li>`).join('')}</ul>
            <div id="blRes"></div>`;
          $$('[data-rate]', host).forEach(b => b.addEventListener('click', () => {
            const i = +b.dataset.rate; rating[i] = b.dataset.v;
            $$(`[data-rate="${i}"]`, host).forEach(x => x.classList.toggle('on', x === b));
            if (Object.keys(rating).length === kp.length) result(rating);
          }));
        };

        const result = rating => {
          const kp = bl.kernpunkte, n = kp.length;
          const full = kp.filter((_, i) => rating[i] === 'full').length, half = kp.filter((_, i) => rating[i] === 'half').length;
          const miss = kp.map((k, i) => i).filter(i => rating[i] !== 'full');
          const pct = pctOf(full + half / 2, n);
          const res = $('#blRes', host);
          res.innerHTML = `<div class="sc-result"><div class="score-big"><div><b class="num">${full}</b><span>von ${n} Punkten</span></div><div class="np"><b class="num">${pct}</b><span>Prozent</span></div></div>
            ${miss.length ? `<div class="bl-miss"><span class="kicker">Das kommt in die Wiederholung</span><ul>${miss.map(i => `<li>${icon(rating[i] === 'half' ? 'info' : 'alert')}<span class="prose">${M(kp[i])}</span></li>`).join('')}</ul></div>` : `<p class="saved">${icon('check')}Alles gewusst. Stark.</p>`}
            <button class="btn primary block" type="button" data-save>${icon('check')}Speichern und Spickzettel öffnen</button></div>`;
          res.scrollIntoView({ behavior: ctx.reduced ? 'auto' : 'smooth', block: 'center' });
          $('[data-save]', res).onclick = e => {
            LR.log('blurt', topic.id, { topic: topic.id, n, full, half, miss: n - full - half, pct, min: usedMin, missing: miss });
            miss.forEach(i => LR.log('mistake', `${topic.id}:blurt:${i}`, { typ: null, rating: rating[i], topic: topic.id, src: 'blurting' }));
            $$('[data-rate]', host).forEach(x => { x.disabled = true; });
            const seg = LR.stats(LR.events()).ring.seg[0];
            e.currentTarget.outerHTML = `<p class="saved">${icon('check')}Gespeichert.${seg ? ' Das Abruf-Segment von heute ist geschafft.' : ''}</p>`;
            if (bl.spick) res.insertAdjacentHTML('beforeend', `<details class="card spick" open><summary>${icon('book')}Spickzettel zum Vergleichen</summary><div class="prose">${M(bl.spick)}</div></details>`);
            finishBox(root, ctx, { pct, title: `${full} von ${n} Kernpunkten`, text: miss.length ? 'Was fehlte, siehst du hier noch einmal im Spickzettel. Beim nächsten Mal zuerst auf diese Punkte achten.' : 'Du konntest das Thema komplett aus dem Kopf aufschreiben.', href: back(topic), label: 'Zur Treppe' });
          };
        };
        intro();
      }
    };
  };

  // ------------------------------------------------------------ Fehler finden (Stufe 2b)
  X.fehler = (topic, ctx) => {
    const list = topic.extras && topic.extras.fehler;
    if (!list || !list.length) return window.LRTreppe.overview(topic, ctx);
    const { M, icon, LR, esc } = ctx;
    const html = `${frame(ctx, topic, { kicker: `Stufe 2b · Fehler finden · ${subjName(ctx, topic)}`, title: 'Wo steckt der Fehler?', lead: 'Eine vorgerechnete Lösung enthält einen Fehler. Prüfe Zeile für Zeile und tippe auf die erste falsche. Genau das ist auch Korrigieren der eigenen Klausur.', ask: true })}<div id="fxHost"></div><div class="finish" id="xfin" hidden></div></div>`;
    return {
      title: 'Fehler finden', back: back(topic), nav: 'faecher', focus: true, html,
      after(root) {
        const B = kit().api(ctx);
        const host = $('#fxHost', root);
        let r = 0; const scores = []; const trail = [];
        const aufgabe = () => list[Math.min(r, list.length - 1)].frage.replace(/<[^>]+>/g, '');
        kit().bindAsk(root, ctx, { fach: subjName(ctx, topic), thema: topic.titel.replace(/\$/g, ''), wo: 'Fehler finden', aufgabe, extra: () => trail.length ? ['Meine Versuche (Aufgabe: erste falsche Zeile antippen):', ...trail] : [] });

        const round = () => {
          const f = list[r]; let tries = 0, done = false;
          host.innerHTML = `<div class="fx-prog"><span class="kicker">Aufgabe ${r + 1} von ${list.length}</span><h3 class="h-2">${esc(f.titel)}</h3></div>
            <div class="q">${M(f.frage)}</div>
            <div class="rw">${f.schritte.map((st, i) => B.step(st, i, { be: false, cas: false, why: false, after: `<div class="fx-act"><button class="btn small" type="button" data-find="${i}">${icon('target')}Hier ist der erste Fehler</button></div>` })).join('')}</div>
            <div id="fxFb"></div>`;
          const fb = $('#fxFb', host);
          const reveal = found => {
            done = true;
            $$('[data-find]', host).forEach(b => { b.disabled = true; });
            $('.rw', host).classList.add('fx-done'); // übrige Knöpfe ausblenden
            const el = $(`.rw-step[data-i="${f.fehler}"]`, host);
            el.classList.add('is-err');
            $('.rw-n', el).innerHTML = icon('x');
            $('.rw-body', el).insertAdjacentHTML('beforeend', `<div class="fx-reveal"><span class="chip bad">${esc(f.typ)}</span><p class="prose">${M(f.was)}</p><span class="kicker">So ist es richtig</span><div class="rw-math">${M(f.richtig)}</div><p class="rw-why">${M(f.folge)}</p></div>`);
            const score = !found ? 0 : tries === 0 ? 100 : 50;
            scores.push(score);
            trail.push(`- Aufgabe ${r + 1}: ${found ? (tries === 0 ? 'Fehler beim ersten Tippen gefunden' : 'Fehler nach einem Fehlversuch gefunden') : 'Fehler nicht gefunden (zwei Fehlversuche)'}; es war ein ${f.typ}`);
            fb.innerHTML = `<div class="mcq-fb ${found ? 'ok' : 'bad'}"><b>${found ? (tries === 0 ? 'Gefunden, gleich beim ersten Mal.' : 'Gefunden.') : 'Diesmal nicht gefunden.'}</b> Fehlertyp: ${esc(f.typ)}. Welche Fehlertypen dir oft passieren, siehst du später in der Fehlerliste.</div>
              <button class="btn primary block" type="button" id="fxNext" style="margin-top:12px">${r < list.length - 1 ? 'Nächste Aufgabe' : 'Auswertung'} ${icon('arrow', 'go')}</button>`;
            $('#fxNext', host).onclick = () => { if (r < list.length - 1) { r++; round(); window.scrollTo({ top: 0, behavior: ctx.reduced ? 'auto' : 'smooth' }); } else end(); };
            fb.scrollIntoView({ behavior: ctx.reduced ? 'auto' : 'smooth', block: 'nearest' });
          };
          $$('[data-find]', host).forEach(b => b.addEventListener('click', () => {
            if (done) return;
            const i = +b.dataset.find;
            if (i === f.fehler) { reveal(true); return; }
            tries++; b.disabled = true;
            const el = $(`.rw-step[data-i="${i}"]`, host);
            el.classList.add('is-fine');
            $('.fx-act', el).innerHTML = `<p class="fx-note">${icon('check')}<span>${M(f.schritte[i].ok || 'Diese Zeile stimmt.')}${tries < 2 ? `<br><b>Noch ein Versuch.</b> ${f.tipp ? M(f.tipp) : ''}` : ''}</span></p>`;
            trail.push(`- Aufgabe ${r + 1}: Zeile ${i + 1} angetippt (richtig, kein Fehler)`);
            if (tries >= 2) reveal(false);
          }));
        };
        const end = () => {
          const pct = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
          const first = scores.filter(x => x === 100).length;
          LR.log('extra', `${topic.id}:fehler`, { topic: topic.id, kind: 'fehler', pct, first, n: scores.length });
          host.innerHTML = '';
          finishBox(root, ctx, { pct, title: `${first} von ${scores.length} gleich beim ersten Tippen`, text: pct >= PASS ? 'Du siehst Fehler schnell. Das hilft beim Prüfen eigener Lösungen.' : 'Prüfe künftig zuerst die Rechnung mit einer Probe, bevor du weiterrechnest. Ein Fehler zieht alle späteren Zeilen mit.', href: back(topic), label: 'Zur Treppe', again: true });
        };
        round();
      }
    };
  };

  // ------------------------------------------------------------ Lösungsweg erläutern
  X.erlaeutern = (topic, ctx) => {
    const e = topic.extras && topic.extras.erlaeutern;
    if (!e) return window.LRTreppe.overview(topic, ctx);
    const { M, icon, LR, esc } = ctx;
    const html = `${frame(ctx, topic, { kicker: `Lösungsweg erläutern · ${subjName(ctx, topic)}`, title: e.titel, lead: 'Ein fertiger Rechenweg ohne Kommentar. Erst ordnest du jede Zeile zu, dann schreibst du die Erläuterung selbst auf Papier und prüfst sie am Erwartungshorizont.', ask: true })}
      <div class="abi-head"><span class="chip">AFB III</span><span class="chip">${e.be} BE</span><span class="chip">Operator: erläutern</span></div>
      <div class="prose">${M(e.intro)}</div><div class="q op">${esc(e.operator)}</div>
      <div class="rw" id="erRw">${e.zeilen.map((z, i) => kit().api(ctx).step({ name: `Zeile ${i + 1}`, rechnung: z.rechnung }, i, { be: false, cas: false, why: false, cls: i ? 'er-hide' : '', after: z.frage ? kit().api(ctx).mcq(z.frage, 'z' + i) : '' })).join('')}</div>
      <div id="erAuf" hidden>${kit().api(ctx).mcq(e.aufgabe, 'auf')}</div>
      <div id="erPaper" hidden><div class="paper">${icon('pencil')}<div><b>Auf Papier erläutern.</b> ${esc(e.aufschreiben)}</div></div>
        <button class="btn primary block" type="button" id="erToEwh">${icon('eye')}Fertig – mit dem Erwartungshorizont vergleichen</button><div id="erSc" hidden></div></div>
      <div class="finish" id="xfin" hidden></div></div>`;
    return {
      title: 'Lösungsweg erläutern', back: back(topic), nav: 'faecher', focus: true, html,
      after(root) {
        const K = kit();
        let first = 0, asked = 0;
        K.bindAsk(root, ctx, { fach: subjName(ctx, topic), thema: topic.titel.replace(/\$/g, ''), wo: 'Lösungsweg erläutern', aufgabe: () => `${e.intro}\n${e.operator}\n${e.zeilen.map((z, i) => `Zeile ${i + 1}: ${z.rechnung}`).join('\n')}` });
        const showAuf = () => {
          const box = $('#erAuf', root); box.hidden = false; box.classList.add('enter');
          box.scrollIntoView({ behavior: ctx.reduced ? 'auto' : 'smooth', block: 'center' });
          K.bindMcq(root, 'auf', e.aufgabe, ok => { asked++; if (ok) first++; setTimeout(() => { const p = $('#erPaper', root); p.hidden = false; p.classList.add('enter'); p.scrollIntoView({ behavior: ctx.reduced ? 'auto' : 'smooth', block: 'center' }); }, ctx.reduced ? 0 : 500); });
        };
        const unlock = k => {
          if (k >= e.zeilen.length) { showAuf(); return; }
          const el = $(`#erRw .rw-step[data-i="${k}"]`, root);
          if (k > 0) { el.classList.remove('er-hide'); el.classList.add('enter'); el.scrollIntoView({ behavior: ctx.reduced ? 'auto' : 'smooth', block: 'center' }); }
          const z = e.zeilen[k];
          if (!z.frage) { setTimeout(() => unlock(k + 1), ctx.reduced ? 0 : 350); return; }
          K.bindMcq(root, 'z' + k, z.frage, ok => { asked++; if (ok) first++; setTimeout(() => unlock(k + 1), ctx.reduced ? 0 : 700); });
        };
        unlock(0);
        $('#erToEwh', root).onclick = ev => {
          ev.currentTarget.remove();
          const part = { id: `${topic.id}:erlaeutern`, be: e.kernpunkte.reduce((a, k) => a + k.punkte, 0), schritte: e.kernpunkte.map(k => ({ name: k.name, rechnung: k.text, punkte: k.punkte, kern: true })) };
          K.selfCheck(ctx, $('#erSc', root), part, { topic: topic.id, kind: 'erlaeutern', casFold: false }, (pts, max) => {
            const pct = pctOf(pts, max);
            finishBox(root, ctx, { pct, title: `${pts} von ${max} BE · ${pct} %`, text: `Zuordnen: ${first} von ${asked} gleich beim ersten Versuch. ${pct >= PASS ? 'Du kannst Rechenwege in Worte fassen.' : 'Übe, jede Zeile in drei Teilen zu sagen: was berechnet wird, warum, und was es im Sachzusammenhang heißt.'}`, href: back(topic), label: 'Zur Treppe' });
          });
        };
      }
    };
  };

  // ------------------------------------------------------------ Bedingung deuten
  function demoSekante(host, def, ctx) {
    const F = (window.LR_FN || {})[def.f];
    if (!F) return;
    const { icon } = ctx, fmt = kit().fmt;
    const W = 640, H = 340, m = 30;
    const sx = x => m + (x - F.xmin) / (F.xmax - F.xmin) * (W - 2 * m), sy = y => H - m - (y - F.ymin) / (F.ymax - F.ymin) * (H - 2 * m);
    let d = '';
    for (let i = 0; i <= 200; i++) { const x = F.xmin + (F.xmax - F.xmin) * i / 200; d += (i ? 'L' : 'M') + sx(x).toFixed(1) + ' ' + sy(F.f(x)).toFixed(1); }
    let grid = '';
    for (let x = Math.ceil(F.xmin); x <= F.xmax; x++) grid += `<line x1="${sx(x)}" x2="${sx(x)}" y1="${m / 2}" y2="${H - m / 2}" class="g"/><text x="${sx(x)}" y="${H - 6}" class="t" text-anchor="middle">${x}</text>`;
    for (let y = Math.ceil(F.ymin); y <= F.ymax; y++) grid += `<line y1="${sy(y)}" y2="${sy(y)}" x1="${m / 2}" x2="${W - m / 2}" class="g"/><text x="${m / 2 - 2}" y="${sy(y) + 4}" class="t" text-anchor="end">${y}</text>`;
    host.innerHTML = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Graph mit zwei Punkten und Verbindungsgerade">
        ${grid}<line x1="${sx(0)}" x2="${sx(0)}" y1="${m / 2}" y2="${H - m / 2}" class="ax"/><line x1="${m / 2}" x2="${W - m / 2}" y1="${sy(0)}" y2="${sy(0)}" class="ax"/>
        <path d="${d}" class="curve"/><line id="sH" class="sh"/><line id="sV1" class="sv"/><line id="sV2" class="sv"/><line id="sSec" class="tan"/>
        <circle id="sA" r="8" class="tp"/><circle id="sB" r="8" class="tp b"/></svg>
      <div class="sl2"><label><span>Stelle <b>a</b></span><input class="slider" id="sSa" type="range" min="${F.xmin}" step="0.01" value="${def.a}" aria-label="Stelle a"></label>
        <label><span>Breite <b>w</b></span><input class="slider" id="sSw" type="range" min="0.5" max="${def.wmax}" step="0.5" value="${def.w}" aria-label="Breite w"></label></div>
      <div class="read"><span>a = <b id="rA"></b></span><span>p(a) = <b id="rPa"></b></span><span>p(a+w) = <b id="rPb"></b></span><span>Unterschied = <b id="rD"></b></span><span>mittlere Änderungsrate = <b id="rM"></b></span><span class="flat" id="sEq" hidden>${icon('check')}gleich hoch</span></div>`;
    const sa = $('#sSa', host), sw = $('#sSw', host);
    const set = (id, a, b, c, e) => { const el = $(id, host); el.setAttribute('x1', a); el.setAttribute('y1', b); el.setAttribute('x2', c); el.setAttribute('y2', e); };
    function upd() {
      const w = +sw.value;
      sa.max = String(F.xmax - w);
      const a = Math.min(+sa.value, F.xmax - w); sa.value = String(a);
      const pa = F.f(a), pb = F.f(a + w), dlt = pb - pa;
      set('#sH', sx(a), sy(pa), sx(a + w), sy(pa));
      set('#sV1', sx(a), sy(0), sx(a), sy(pa)); set('#sV2', sx(a + w), sy(0), sx(a + w), sy(pb));
      set('#sSec', sx(a), sy(pa), sx(a + w), sy(pb));
      const A = $('#sA', host), Bp = $('#sB', host);
      A.setAttribute('cx', sx(a)); A.setAttribute('cy', sy(pa)); Bp.setAttribute('cx', sx(a + w)); Bp.setAttribute('cy', sy(pb));
      $('#rA', host).textContent = fmt(a); $('#rPa', host).textContent = fmt(pa); $('#rPb', host).textContent = fmt(pb);
      $('#rD', host).textContent = fmt(dlt); $('#rM', host).textContent = fmt(dlt / w);
      const flat = Math.abs(dlt) < 0.05;
      $('#sEq', host).hidden = !flat; host.classList.toggle('is-flat', flat);
    }
    sa.addEventListener('input', upd); sw.addEventListener('input', upd); upd();
  }

  X.deuten = (topic, ctx) => {
    const d = topic.extras && topic.extras.deuten;
    if (!d) return window.LRTreppe.overview(topic, ctx);
    const { M, icon, LR, esc } = ctx;
    const B = kit().api(ctx);
    const html = `${frame(ctx, topic, { kicker: `Bedingung deuten · ${subjName(ctx, topic)}`, title: d.titel, lead: 'Aus einer Gleichung ein Bild und einen Satz machen: genau das fragt das Abitur bei „Deuten Sie …“.', ask: true })}
      <div class="abi-head"><span class="chip">AFB III</span><span class="chip">Operator: deuten</span></div>
      <div class="prose">${M(d.intro)}</div>
      <span class="sub">Probier es aus</span><div class="demo tdemo sek" id="sekDemo"></div>
      <div class="dt-list">${d.bedingungen.map((b, i) => `<section class="dt" id="dt${i}"${i ? ' hidden' : ''}><span class="kicker">Bedingung ${i + 1} von ${d.bedingungen.length}</span><div class="rw-math dt-term">${M(b.term)}</div>${B.mcq(b.bild, 'b' + i)}<div class="dt-sat" id="dts${i}" hidden>${B.mcq(b.satz, 's' + i)}</div></section>`).join('')}</div>
      <div class="finish" id="xfin" hidden></div></div>`;
    return {
      title: 'Bedingung deuten', back: back(topic), nav: 'faecher', focus: true, html,
      after(root) {
        const K = kit();
        demoSekante($('#sekDemo', root), d.demo, ctx);
        let first = 0, asked = 0;
        K.bindAsk(root, ctx, { fach: subjName(ctx, topic), thema: topic.titel.replace(/\$/g, ''), wo: 'Bedingung deuten', aufgabe: () => `${d.intro}\nDeute die Bedingungen:\n${d.bedingungen.map((b, i) => `${i + 1}) ${b.term}`).join('\n')}` });
        const step = i => {
          const b = d.bedingungen[i];
          K.bindMcq(root, 'b' + i, b.bild, ok => { asked++; if (ok) first++; setTimeout(() => { const s = $('#dts' + i, root); s.hidden = false; s.classList.add('enter'); s.scrollIntoView({ behavior: ctx.reduced ? 'auto' : 'smooth', block: 'center' }); }, ctx.reduced ? 0 : 600); });
          K.bindMcq(root, 's' + i, b.satz, ok => {
            asked++; if (ok) first++;
            setTimeout(() => {
              if (i + 1 < d.bedingungen.length) { const n = $('#dt' + (i + 1), root); n.hidden = false; n.classList.add('enter'); n.scrollIntoView({ behavior: ctx.reduced ? 'auto' : 'smooth', block: 'start' }); step(i + 1); return; }
              const pct = pctOf(first, asked);
              LR.log('extra', `${topic.id}:deuten`, { topic: topic.id, kind: 'deuten', pct, first, n: asked });
              finishBox(root, ctx, { pct, title: `${first} von ${asked} gleich beim ersten Versuch`, text: pct >= PASS ? 'Du übersetzt Gleichungen sicher in Bild und Satz.' : 'Merke: Steht „im Mittel“ oder ein Bruch mit Differenz, ist es ein Intervall (Sekante). Steht eine Ableitung, geht es um genau eine Stelle (Tangente).', href: back(topic), label: 'Zur Treppe', again: true });
            }, ctx.reduced ? 0 : 700);
          });
        };
        step(0);
      }
    };
  };

  // ------------------------------------------------------------ Notation: Struktogramm · Pseudocode · Python
  X.algo = (def, ctx) => {
    const { M, icon, LR, esc, byId, subjStyle } = ctx;
    const K = kit(), B = K.api(ctx);
    const s = byId[def.fach];
    const html = `<div ${subjStyle(s)} class="rise xpage">
      <div class="page-head"><span class="kicker">Notation · ${s ? s.name.replace(/ (eA|gA)$/, '') : ''}${def.demo ? ' · Demo' : ''}</span><h2 class="h-1">${esc(def.titel)}</h2><p class="muted">${esc(def.kurz)}</p><div class="head-tools">${B.ask()}</div>
        <div class="notice">${icon('info')}<div>${def.demo ? 'Demo-Inhalt zum Testen der Darstellung. ' : ''}Die Schreibweise des Pseudocodes ist noch nicht mit deiner Lehrkraft abgeglichen (UNSICHER). Struktogramm und Python gehören zusammen: Tippe auf einen Kasten oder eine Zeile.</div></div></div>
      <p class="prose">${esc(def.text)}</p>
      <div class="algo-host" id="algoHost"></div>
      ${(window.LR_PY || []).filter(p => p.algo === def.id).map(p => `<a class="cont algo-py" href="#/python/${p.id}"><div class="cont-ico">${icon('code')}</div><div class="row-main"><span class="kicker">Python-Werkstatt</span><span class="row-title" style="font-size:18px">Selbst programmieren und testen</span><span class="row-sub">Schreib die Funktion in Python und lass sie im Browser mit ${p.tests.length} Tests prüfen.</span></div>${icon('right', 'chev')}</a>`).join('')}
      <h3 class="h-2 algo-h">Lesen und verfolgen</h3>
      <div class="mcq-list">${def.fragen.map((q, i) => B.mcq(q, 'q' + i)).join('')}</div>
      <div class="q algo-q">${esc(def.ablauf.frage)}</div>
      <div class="gap-fields">${def.ablauf.checkpoints.map(c => B.cpField(c, 'ab-' + c.id)).join('')}</div>
      <button class="btn primary block" type="button" id="algoDone" style="margin-top:18px">${icon('check')}Auswerten</button>
      <div class="finish" id="xfin" hidden></div></div>`;
    return {
      title: def.titel, back: (window.LRStruktur && LRStruktur.backFor("algo", def.id)) || `#/fach/${def.fach}`, nav: 'faecher', focus: true, html,
      after(root) {
        window.LRAlgo.mount($('#algoHost', root), def.algo);
        K.bindAsk(root, ctx, { fach: s ? s.name : def.fach, thema: def.titel, wo: 'Notation (Struktogramm, Pseudocode, Python)', aufgabe: () => `${def.text}\n${def.ablauf.frage}\nPython:\n${window.LRAlgo.pyText(def.algo)}\nPseudocode:\n${window.LRAlgo.pseudoText(def.algo)}` });
        const mq = {};
        def.fragen.forEach((q, i) => {
          const box = $(`[data-mcq="q${i}"]`, root);
          K.bindMcq(root, 'q' + i, q, ok => { mq[i] = ok; });
        });
        const cp = {};
        K.bindCheckpoints(root, def.ablauf.checkpoints.map(c => ({ key: 'ab-' + c.id, cp: c })), (k, ok) => { cp[k] = ok; });
        $('#algoDone', root).onclick = e => {
          const total = def.fragen.length + def.ablauf.checkpoints.length;
          const got = Object.values(mq).filter(Boolean).length + Object.values(cp).filter(Boolean).length;
          const pct = pctOf(got, total);
          e.currentTarget.disabled = true;
          LR.log('extra', `${def.id}:notation`, { topic: def.id, kind: 'notation', pct, got, n: total });
          finishBox(root, ctx, { pct, title: `${got} von ${total} richtig`, text: pct >= PASS ? 'Du liest Struktogramm, Pseudocode und Python als dasselbe Programm.' : 'Verfolge den Ablauf Schritt für Schritt und schreib dir die Werte der Variablen auf, so wie in der Tabelle.', href: `#/fach/${def.fach}`, label: 'Zurück zum Fach', again: true });
        };
      }
    };
  };

  window.LRExtras = X;
})();
