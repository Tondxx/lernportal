/* ==========================================================================
   PHYSIK-DEMOS (Animationen/Simulationen) für Lektionen und Lerntreppe.
   Registrierung: window.LR_DEMOS[name] = (host, ctx, def) => { … }
   Lektion: { demo: 'p-rc' } · Lerntreppe Stufe 0: { demo: { name: 'p-rc' } }
   Alle Formeln wie in content/physik.js; Zahlenwerte: tests/physik_check.py.
   Farben nur über CSS-Variablen (hell/dunkel), keine Inline-Skripte (CSP).
   ========================================================================== */
(function () {
  const E = 1.602e-19, ME = 9.109e-31, MP = 1.673e-27, EPS0 = 8.854e-12;
  const $ = (s, r) => r.querySelector(s);
  const $$ = (s, r) => Array.from(r.querySelectorAll(s));
  const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
  const clamp = (x, a, b) => Math.max(a, Math.min(b, x));

  // Zahlen deutsch: 3 gültige Ziffern, große/kleine Werte als a·10ⁿ
  function num(x, n = 3) {
    if (!isFinite(x)) return '–';
    if (x === 0) return '0';
    const ex = Math.floor(Math.log10(Math.abs(x)));
    if (ex >= -2 && ex < 5) return Number(x.toPrecision(n)).toLocaleString('de-DE', { useGrouping: false, maximumFractionDigits: 6 });
    const m = x / Math.pow(10, ex);
    return `${m.toFixed(n - 1).replace('.', ',')}·10<sup>${ex}</sup>`;
  }
  const fix = (x, d = 1) => Number(x).toFixed(d).replace('.', ',').replace('-', '−');

  // Bausteine
  const slider = (id, label, unit, min, max, step, val) => `<div class="pd-ctl"><label for="${id}"><span>${label}</span><b data-out="${id}"></b><span>${unit}</span></label><input class="slider" id="${id}" type="range" min="${min}" max="${max}" step="${step}" value="${val}"></div>`;
  const seg = (key, items, on) => `<div class="pd-seg" data-seg="${key}" role="group">${items.map(([v, l]) => `<button type="button" data-v="${v}" class="${v === on ? 'on' : ''}" aria-pressed="${v === on}">${l}</button>`).join('')}</div>`;
  function bindSeg(host, key, cb) {
    const box = $(`[data-seg="${key}"]`, host);
    $$('button', box).forEach(b => b.addEventListener('click', () => {
      $$('button', box).forEach(x => { x.classList.toggle('on', x === b); x.setAttribute('aria-pressed', x === b); });
      cb(b.dataset.v);
    }));
  }
  const val = (host, id) => +$('#' + id, host).value;
  const out = (host, id, html) => { const o = $(`[data-out="${id}"]`, host); if (o) o.innerHTML = html; };
  // Animationsschleife, endet von selbst, wenn die Seite gewechselt wird
  function loop(host, fn) {
    let last = performance.now();
    function f(now) {
      if (!host.isConnected) return;
      const dt = Math.min(0.05, (now - last) / 1000); last = now;
      fn(dt);
      requestAnimationFrame(f);
    }
    requestAnimationFrame(f);
  }
  const arrowDefs = id => `<defs><marker id="${id}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" class="pd-arrowhead"/></marker></defs>`;

  const D = {};

  // ======================================================================
  // P1 · Elektron (oder Proton) wird im Feld beschleunigt: E_el = Q·U
  // ======================================================================
  D['p-energie'] = function (host) {
    const W = 640, H = 290, xa = 110, xb = 410, yT = 40, yB = 250;
    host.innerHTML = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Teilchen wird zwischen zwei Platten beschleunigt, daneben Energiebalken">${arrowDefs('pdA1')}
      <g id="fl"></g>
      <rect x="${xa - 14}" y="${yT}" width="14" height="${yB - yT}" rx="3" id="plA"/><rect x="${xb}" y="${yT}" width="14" height="${yB - yT}" rx="3" id="plB"/>
      <text x="${xa - 7}" y="${yT - 10}" text-anchor="middle" class="big" id="sgA"></text><text x="${xb + 7}" y="${yT - 10}" text-anchor="middle" class="big" id="sgB"></text>
      <circle id="pt" r="11"/><text id="ptl" text-anchor="middle" class="pd-ptl"></text>
      <line x1="${xa}" x2="${xb}" y1="${yB + 22}" y2="${yB + 22}" class="pd-dim"/><text x="${(xa + xb) / 2}" y="${yB + 38}" text-anchor="middle">Spannung U zwischen den Platten</text>
      <g transform="translate(470 0)">
        <text x="70" y="22" text-anchor="middle" class="pd-lbl">Energie des Teilchens</text>
        <line x1="10" x2="140" y1="${yB}" y2="${yB}" class="pd-ax"/>
        <rect x="18" width="46" id="bPot" class="pd-bar-pot"/><rect x="86" width="46" id="bKin" class="pd-bar-kin"/>
        <line x1="10" x2="140" y1="${yT + 10}" y2="${yT + 10}" class="pd-total"/><text x="140" y="${yT + 4}" text-anchor="end">gesamt = Q·U</text>
        <text x="41" y="${yB + 18}" text-anchor="middle">elektrisch</text><text x="109" y="${yB + 18}" text-anchor="middle">kinetisch</text>
      </g></svg>
      ${seg('teil', [['e', 'Elektron'], ['p', 'Proton']], 'e')}
      <div class="pd-ctls">${slider('pdU', 'U =', 'V', 10, 1000, 10, 500)}</div>
      <div class="pd-btns"><button class="btn primary small" type="button" data-go>Loslassen</button></div>
      <div class="read"><span>E_el = Q·U = <b id="rW"></b> eV</span><span>= <b id="rJ"></b> J</span><span>v = <b id="rV"></b> m/s</span></div>
      <p class="pd-msg" id="msg"></p>`;
    let kind = 'e', s = 0, t = 0, run = false;
    const T = 2.2;
    function geom() {
      const e = kind === 'e';
      $('#plA', host).setAttribute('class', e ? 'pd-plate-m' : 'pd-plate-p');
      $('#plB', host).setAttribute('class', e ? 'pd-plate-p' : 'pd-plate-m');
      $('#sgA', host).textContent = e ? '−' : '+'; $('#sgB', host).textContent = e ? '+' : '−';
      let fl = '';
      for (let i = 0; i < 6; i++) { const y = yT + 18 + i * 34; fl += e ? `<line x1="${xb - 6}" x2="${xa + 6}" y1="${y}" y2="${y}" class="pd-fl" marker-end="url(#pdA1)"/>` : `<line x1="${xa + 6}" x2="${xb - 6}" y1="${y}" y2="${y}" class="pd-fl" marker-end="url(#pdA1)"/>`; }
      $('#fl', host).innerHTML = fl;
      $('#pt', host).setAttribute('class', e ? 'pd-e' : 'pd-p');
      $('#ptl', host).textContent = e ? '−' : '+';
    }
    function draw() {
      const U = val(host, 'pdU'), m = kind === 'e' ? ME : MP;
      const vEnd = Math.sqrt(2 * E * U / m);
      const x = xa + 16 + s * (xb - xa - 32), y = 145;
      $('#pt', host).setAttribute('cx', x); $('#pt', host).setAttribute('cy', y);
      $('#ptl', host).setAttribute('x', x); $('#ptl', host).setAttribute('y', y + 5);
      const hMax = yB - yT - 10;
      const hk = s * hMax, hp = (1 - s) * hMax;
      $('#bPot', host).setAttribute('y', yB - hp); $('#bPot', host).setAttribute('height', hp);
      $('#bKin', host).setAttribute('y', yB - hk); $('#bKin', host).setAttribute('height', hk);
      out(host, 'pdU', U);
      $('#rW', host).textContent = U.toLocaleString('de-DE', { useGrouping: false });
      $('#rJ', host).innerHTML = num(E * U);
      $('#rV', host).innerHTML = num(vEnd * Math.sqrt(s));
      $('#msg', host).innerHTML = s >= 1
        ? `Angekommen: Die ganze elektrische Energie <b>Q·U</b> ist jetzt Bewegungsenergie. ${kind === 'e' ? 'Ein Proton bekäme dieselbe Energie, wäre aber viel langsamer (rund 1836-mal schwerer). Probier es aus.' : 'Gleiche Energie wie beim Elektron, aber viel kleinere Geschwindigkeit, weil die Masse größer ist.'}`
        : s > 0 ? 'Die Feldkraft ist überall gleich groß: Die Energie wächst gleichmäßig mit dem Weg, die Geschwindigkeit wächst immer langsamer (Wurzel).'
          : `Drück auf „Loslassen“. Das ${kind === 'e' ? 'Elektron startet an der negativen' : 'Proton startet an der positiven'} Platte.`;
    }
    $('[data-go]', host).addEventListener('click', () => { s = 0; t = 0; run = true; if (reduced()) { s = 1; run = false; } draw(); });
    $('#pdU', host).addEventListener('input', draw);
    bindSeg(host, 'teil', v => { kind = v; s = 0; run = false; geom(); draw(); });
    loop(host, dt => { if (!run) return; t += dt; s = Math.min(1, (t / T) ** 2); if (s >= 1) run = false; draw(); });
    geom(); draw();
  };

  // ======================================================================
  // P2 · Potentialsonde im homogenen Feld: φ(x) = E·x, Äquipotentiallinien
  // ======================================================================
  D['p-potential'] = function (host) {
    const W = 640, H = 470, x0 = 80, x1 = 440, yT = 24, yB = 214, dcm = 6, pxcm = (x1 - x0) / dcm;
    const gT = 268, gB = 440;
    let eq = '', fl = '', tick = '';
    for (let k = 1; k < dcm; k++) eq += `<line x1="${x0 + k * pxcm}" x2="${x0 + k * pxcm}" y1="${yT}" y2="${yB}" class="pd-eq"/>`;
    for (let i = 0; i < 5; i++) { const y = yT + 22 + i * 37; fl += `<line x1="${x1 - 6}" x2="${x0 + 8}" y1="${y}" y2="${y}" class="pd-fl" marker-end="url(#pdA2)"/>`; }
    for (let k = 0; k <= dcm; k++) tick += `<line x1="${x0 + k * pxcm}" x2="${x0 + k * pxcm}" y1="${gB}" y2="${gB + 5}" class="pd-ax"/><text x="${x0 + k * pxcm}" y="${gB + 20}" text-anchor="middle">${k}</text>`;
    host.innerHTML = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Plattenkondensator mit verschiebbarer Potentialsonde und φ-x-Diagramm">${arrowDefs('pdA2')}
      <rect x="${x0 - 14}" y="${yT}" width="14" height="${yB - yT}" rx="3" class="pd-plate-m"/><rect x="${x1}" y="${yT}" width="14" height="${yB - yT}" rx="3" class="pd-plate-p"/>
      <text x="${x0 - 7}" y="${yT - 6}" text-anchor="middle" class="big">−</text><text x="${x1 + 7}" y="${yT - 6}" text-anchor="middle" class="big">+</text>
      <text x="${x0 - 22}" y="${yB + 16}" text-anchor="middle">φ = 0</text>
      ${fl}${eq}
      <text x="${x1 + 30}" y="${yT + 40}" class="pd-lbl">gestrichelt:</text><text x="${x1 + 30}" y="${yT + 58}" class="pd-lbl">Äquipotential-</text><text x="${x1 + 30}" y="${yT + 76}" class="pd-lbl">linien (1 cm)</text>
      <text x="${x1 + 30}" y="${yT + 116}" class="pd-lbl">Pfeile: Feldlinien</text><text x="${x1 + 30}" y="${yT + 134}" class="pd-lbl">(von + nach −)</text>
      <line id="guide" class="pd-guide"/>
      <g id="probe" class="pd-probe" tabindex="0" role="slider" aria-label="Sonde verschieben"><line id="stick" class="pd-stick"/><circle id="tip" r="9"/></g>
      <line x1="${x0}" x2="${x1}" y1="${gB}" y2="${gB}" class="pd-ax"/><line x1="${x0}" x2="${x0}" y1="${gT}" y2="${gB}" class="pd-ax"/>${tick}
      <text x="${x1 + 10}" y="${gB + 4}">x in cm</text><text x="${x0 + 6}" y="${gT + 2}">φ in V</text>
      <line id="phiLine" class="pd-curve"/><circle id="gdot" r="7" class="pd-dot"/>
      <text id="gU" text-anchor="end"></text></svg>
      <div class="pd-ctls">${slider('pdU2', 'U₀ =', 'V', 3, 30, 1, 18)}${slider('pdX', 'Sonde bei x =', 'cm', 0, 6, 0.1, 2)}</div>
      <div class="read"><span>φ = <b id="rP"></b> V</span><span>φ / x = <b id="rE"></b> V/m</span><span>E = U₀ / d = <b id="rE0"></b> V/m</span></div>
      <p class="pd-msg" id="msg">Zieh die Sonde (oder nutze den Regler). Bewegst du sie <b>entlang</b> einer gestrichelten Linie, ändert sich φ nicht.</p>`;
    let px = 2, py = 120;
    const svg = $('svg', host);
    function draw() {
      const U = val(host, 'pdU2'), Ev = U / (dcm / 100);
      const X = x0 + px * pxcm, phi = U * px / dcm;
      $('#tip', host).setAttribute('cx', X); $('#tip', host).setAttribute('cy', py);
      const st = $('#stick', host); st.setAttribute('x1', X); st.setAttribute('y1', py); st.setAttribute('x2', X + 26); st.setAttribute('y2', py - 34);
      const gy = v => gB - v / 30 * (gB - gT);
      const L = $('#phiLine', host); L.setAttribute('x1', x0); L.setAttribute('y1', gy(0)); L.setAttribute('x2', x1); L.setAttribute('y2', gy(U));
      $('#gdot', host).setAttribute('cx', X); $('#gdot', host).setAttribute('cy', gy(phi));
      const G = $('#guide', host); G.setAttribute('x1', X); G.setAttribute('x2', X); G.setAttribute('y1', py); G.setAttribute('y2', gy(phi));
      const gu = $('#gU', host); gu.setAttribute('x', x1 - 4); gu.setAttribute('y', gy(U) - 8); gu.textContent = `φ = U₀ = ${U} V`;
      out(host, 'pdU2', U); out(host, 'pdX', fix(px));
      $('#rP', host).textContent = fix(phi, 2);
      $('#rE', host).textContent = px > 0.05 ? fix(phi / (px / 100), 0) : '–';
      $('#rE0', host).textContent = fix(Ev, 0);
    }
    $('#pdU2', host).addEventListener('input', draw);
    $('#pdX', host).addEventListener('input', () => { px = val(host, 'pdX'); draw(); });
    let drag = false;
    const toSvg = ev => { const p = svg.createSVGPoint(); p.x = ev.clientX; p.y = ev.clientY; return p.matrixTransform(svg.getScreenCTM().inverse()); };
    const move = ev => {
      if (!drag) return;
      const p = toSvg(ev);
      px = clamp((p.x - x0) / pxcm, 0, dcm); py = clamp(p.y, yT + 8, yB - 8);
      $('#pdX', host).value = px.toFixed(1); draw();
    };
    $('#probe', host).addEventListener('pointerdown', ev => { drag = true; svg.setPointerCapture(ev.pointerId); ev.preventDefault(); });
    svg.addEventListener('pointermove', move);
    svg.addEventListener('pointerup', () => { drag = false; });
    svg.addEventListener('pointercancel', () => { drag = false; });
    $('#probe', host).addEventListener('keydown', ev => {
      const k = ev.key; if (!/Arrow/.test(k)) return; ev.preventDefault();
      if (k === 'ArrowRight') px = clamp(px + 0.1, 0, dcm); if (k === 'ArrowLeft') px = clamp(px - 0.1, 0, dcm);
      if (k === 'ArrowUp') py = clamp(py - 8, yT + 8, yB - 8); if (k === 'ArrowDown') py = clamp(py + 8, yT + 8, yB - 8);
      $('#pdX', host).value = px.toFixed(1); draw();
    });
    draw();
  };

  // ======================================================================
  // P3 · Plattenkondensator: C = ε0·εr·A/d, an der Quelle vs. abgetrennt
  // ======================================================================
  D['p-platten'] = function (host) {
    const W = 640, H = 300, cx = 300, cy = 130;
    host.innerHTML = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Plattenkondensator mit Ladungen und Feldlinien">${arrowDefs('pdA3')}
      <rect id="diel" class="pd-diel"/><g id="flines"></g>
      <rect id="pL" class="pd-plate-p" rx="3"/><rect id="pR" class="pd-plate-m" rx="3"/>
      <g id="chg"></g>
      <g id="wires"></g>
      <text id="dl" text-anchor="middle"></text><line id="dd" class="pd-dim"/></svg>
      ${seg('mode', [['q', 'An der Quelle (U bleibt)'], ['g', 'Abgetrennt (Q bleibt)']], 'q')}
      ${seg('eps', [['1', 'Luft (ε<sub>r</sub> = 1)'], ['2.3', 'trockenes Getreide (2,3)'], ['5', 'Glas (5)'], ['10', 'feuchtes Getreide (10)']], '1')}
      <div class="pd-ctls">${slider('pdD', 'd =', 'mm', 1, 8, 0.5, 2)}${slider('pdA', 'A =', 'cm²', 100, 600, 10, 400)}${slider('pdUq', 'U der Quelle =', 'V', 50, 500, 10, 200)}</div>
      <div class="read"><span>C = <b id="rC"></b> pF</span><span>Q = <b id="rQ"></b> nC</span><span>U = <b id="rU"></b> V</span><span>E = <b id="rE"></b> kV/m</span></div>
      <p class="pd-msg" id="msg"></p>`;
    let mode = 'q', er = 1, Qfix = null, prev = null;
    const Qref = 3.54e-8, Eref = 1e5;
    function calc() {
      const d = val(host, 'pdD') / 1000, A = val(host, 'pdA') / 1e4;
      const C = EPS0 * er * A / d;
      let U, Q;
      if (mode === 'q') { U = val(host, 'pdUq'); Q = C * U; } else { Q = Qfix; U = Q / C; }
      return { d, A, C, U, Q, E: U / d };
    }
    function draw() {
      const r = calc();
      const gap = r.d * 1000 * 26, h = Math.sqrt(r.A * 1e4 / 600) * 210;
      const xl = cx - gap / 2 - 12, xr = cx + gap / 2;
      const yt = cy - h / 2;
      Object.entries({ x: xl, y: yt, width: 12, height: h }).forEach(([k, v]) => $('#pL', host).setAttribute(k, v));
      Object.entries({ x: xr, y: yt, width: 12, height: h }).forEach(([k, v]) => $('#pR', host).setAttribute(k, v));
      const dl = $('#diel', host);
      if (er > 1) { Object.entries({ x: xl + 12, y: yt, width: gap, height: h }).forEach(([k, v]) => dl.setAttribute(k, v)); dl.style.display = ''; } else dl.style.display = 'none';
      // Ladungen (Anzahl ~ Q) auf den Innenseiten
      const n = clamp(Math.round(9 * r.Q / Qref), 1, 26);
      let c = '';
      for (let i = 0; i < n; i++) { const y = yt + (i + 0.5) * h / n; c += `<text x="${xl + 6}" y="${y + 5}" text-anchor="middle" class="pd-q pd-qp">+</text><text x="${xr + 6}" y="${y + 5}" text-anchor="middle" class="pd-q pd-qm">−</text>`; }
      $('#chg', host).innerHTML = c;
      // Feldlinien (Dichte ~ E)
      const nf = clamp(Math.round(6 * r.E / Eref), 0, 18);
      let f = '';
      for (let i = 0; i < nf; i++) { const y = yt + (i + 0.5) * h / nf; f += `<line x1="${xl + 16}" x2="${xr - 4}" y1="${y}" y2="${y}" class="pd-fl thin" marker-end="url(#pdA3)"/>`; }
      $('#flines', host).innerHTML = gap > 24 ? f : '';
      // Leitungen zur Quelle
      const yb = 266, ok = mode === 'q';
      $('#wires', host).innerHTML = `<path d="M${xl + 6} ${yt + h} V${yb} H${cx - 30}" class="pd-wire"/><path d="M${xr + 6} ${yt + h} V${yb} H${cx + 30}" class="pd-wire${ok ? '' : ' cut'}"/>
        <line x1="${cx - 30}" x2="${cx - 30}" y1="${yb - 16}" y2="${yb + 16}" class="pd-bat"/><line x1="${cx + (ok ? -14 : 30)}" x2="${cx + (ok ? -14 : 30)}" y1="${yb - 9}" y2="${yb + 9}" class="pd-bat thick"/>
        ${ok ? `<line x1="${cx - 14}" x2="${cx + 30}" y1="${yb}" y2="${yb}" class="pd-wire"/>` : `<text x="${cx + 70}" y="${yb + 5}" class="pd-lbl">getrennt</text>`}
        <text x="${cx - 40}" y="${yb + 5}" text-anchor="end" class="pd-lbl">Quelle</text>`;
      const dd = $('#dd', host); dd.setAttribute('x1', xl + 12); dd.setAttribute('x2', xr); dd.setAttribute('y1', yt - 12); dd.setAttribute('y2', yt - 12);
      const dlb = $('#dl', host); dlb.setAttribute('x', cx); dlb.setAttribute('y', yt - 18); dlb.textContent = `d = ${fix(r.d * 1000)} mm`;
      out(host, 'pdD', fix(r.d * 1000)); out(host, 'pdA', Math.round(r.A * 1e4)); out(host, 'pdUq', val(host, 'pdUq'));
      $('#pdUq', host).disabled = mode !== 'q';
      $('#rC', host).innerHTML = num(r.C * 1e12); $('#rQ', host).innerHTML = num(r.Q * 1e9); $('#rU', host).innerHTML = num(r.U); $('#rE', host).innerHTML = num(r.E / 1000);
      let m = mode === 'q'
        ? 'An der Quelle bleibt <b>U</b> gleich. Wird C größer, fließt mehr Ladung auf die Platten: <b>Q = C·U</b>.'
        : 'Abgetrennt kann keine Ladung zu- oder abfließen: <b>Q</b> bleibt. Ändert sich C, ändert sich <b>U = Q/C</b>.';
      if (prev) {
        const dU = r.U / prev.U, dQ = r.Q / prev.Q, dE = r.E / prev.E;
        const word = x => x > 1.02 ? 'steigt' : x < 0.98 ? 'sinkt' : 'bleibt';
        m += ` Letzte Änderung: Q ${word(dQ)}, U ${word(dU)}, E ${word(dE)}.`;
      }
      $('#msg', host).innerHTML = m;
      return r;
    }
    const change = () => { const before = calc(); prev = before; };
    ['pdD', 'pdA', 'pdUq'].forEach(id => {
      $('#' + id, host).addEventListener('pointerdown', change);
      $('#' + id, host).addEventListener('keydown', change);
      $('#' + id, host).addEventListener('input', draw);
    });
    bindSeg(host, 'mode', v => { prev = null; const r = calc(); mode = v; if (v === 'g') Qfix = r.Q; draw(); });
    bindSeg(host, 'eps', v => { prev = calc(); er = +v; draw(); });
    draw();
  };

  // ======================================================================
  // P4 · Energie im Kondensator: Fläche unter der U-Q-Geraden = ½·Q·U
  // ======================================================================
  D['p-energiec'] = function (host) {
    const W = 640, H = 320, x0 = 64, x1 = 600, yT = 26, yB = 270, Qm = 0.2, Um = 400;
    const sx = q => x0 + q / Qm * (x1 - x0), sy = u => yB - u / Um * (yB - yT);
    let ticks = '';
    for (let q = 0; q <= Qm + 1e-9; q += 0.05) ticks += `<line x1="${sx(q)}" x2="${sx(q)}" y1="${yB}" y2="${yB + 5}" class="pd-ax"/><text x="${sx(q)}" y="${yB + 20}" text-anchor="middle">${fix(q, 2)}</text>`;
    for (let u = 0; u <= Um; u += 100) ticks += `<line x1="${x0 - 5}" x2="${x0}" y1="${sy(u)}" y2="${sy(u)}" class="pd-ax"/><text x="${x0 - 9}" y="${sy(u) + 4}" text-anchor="end">${u}</text>`;
    host.innerHTML = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="U-Q-Diagramm beim Laden eines Kondensators">
      <line x1="${x0}" x2="${x1}" y1="${yB}" y2="${yB}" class="pd-ax"/><line x1="${x0}" x2="${x0}" y1="${yT}" y2="${yB}" class="pd-ax"/>${ticks}
      <text x="${x1}" y="${yB - 8}" text-anchor="end">Q in C</text><text x="${x0 + 8}" y="${yT + 4}">U in V</text>
      <rect id="rect" class="pd-rect"/><text id="rectT" class="pd-lbl" text-anchor="end"></text>
      <g id="strips"></g><path id="tri" class="pd-area"/><line id="line" class="pd-curve"/><circle id="pt" r="7" class="pd-dot"/></svg>
      <div class="pd-ctls">${slider('pdC', 'C =', 'µF', 50, 500, 10, 300)}${slider('pdU4', 'U₀ =', 'V', 50, 400, 10, 300)}</div>
      <div class="pd-btns"><button class="btn primary small" type="button" data-go>Laden (Ladung für Ladung)</button></div>
      <div class="read"><span>Q = <b id="rQ"></b> C</span><span>U = <b id="rU"></b> V</span><span>bisher gespeichert E_el = <b id="rW"></b> J</span></div>
      <p class="pd-msg" id="msg"></p>`;
    let s = 1, run = false, t = 0;
    const N = 12, T = 3.2;
    function draw() {
      const C = val(host, 'pdC') * 1e-6, U0 = val(host, 'pdU4'), Q0 = C * U0;
      out(host, 'pdC', val(host, 'pdC')); out(host, 'pdU4', U0);
      const q = s * Q0, u = q / C;
      const L = $('#line', host); L.setAttribute('x1', sx(0)); L.setAttribute('y1', sy(0)); L.setAttribute('x2', sx(Q0)); L.setAttribute('y2', sy(U0));
      $('#pt', host).setAttribute('cx', sx(q)); $('#pt', host).setAttribute('cy', sy(u));
      // Treppe: jedes Paket dq muss gegen die schon vorhandene Spannung gebracht werden
      const k = Math.floor(s * N + 1e-9);
      let st = '', Wst = 0;
      for (let i = 0; i < Math.min(k, N); i++) {
        const qa = i * Q0 / N, qb = (i + 1) * Q0 / N, ub = qb / C;
        st += `<rect x="${sx(qa)}" y="${sy(ub)}" width="${Math.max(0.5, sx(qb) - sx(qa) - 1)}" height="${yB - sy(ub)}" class="pd-strip"/>`;
        Wst += ub * (qb - qa);
      }
      $('#strips', host).innerHTML = s >= 1 ? '' : st;
      $('#tri', host).setAttribute('d', s >= 1 ? `M${sx(0)} ${yB}L${sx(Q0)} ${sy(U0)}L${sx(Q0)} ${yB}Z` : '');
      const R = $('#rect', host);
      if (s >= 1) { R.setAttribute('x', sx(0)); R.setAttribute('y', sy(U0)); R.setAttribute('width', sx(Q0) - sx(0)); R.setAttribute('height', yB - sy(U0)); R.style.display = ''; }
      else R.style.display = 'none';
      const rt = $('#rectT', host); rt.setAttribute('x', sx(Q0) - 6); rt.setAttribute('y', sy(U0) - 8); rt.textContent = s >= 1 ? 'gestrichelt: Q·U (doppelt so viel)' : '';
      $('#rQ', host).innerHTML = num(q); $('#rU', host).innerHTML = num(u);
      $('#rW', host).innerHTML = num(0.5 * C * u * u);
      $('#msg', host).innerHTML = s >= 1
        ? `Fertig geladen: <b>E_el = ½·Q·U = ½·C·U² = ${num(0.5 * C * U0 * U0)} J</b>. Die Fläche ist ein Dreieck, weil die Spannung beim Laden von 0 an mitwächst. Doppelte Spannung ergibt vierfache Energie.`
        : `Jedes neue Ladungspaket muss gegen die Spannung geschoben werden, die schon da ist. Die Säulen sind die Arbeit pro Paket. Bisher: Summe der Säulen ≈ ${num(Wst)} J.`;
    }
    ['pdC', 'pdU4'].forEach(id => $('#' + id, host).addEventListener('input', () => { s = 1; run = false; draw(); }));
    $('[data-go]', host).addEventListener('click', () => { s = 0; t = 0; run = !reduced(); if (!run) s = 1; draw(); });
    loop(host, dt => { if (!run) return; t += dt; s = Math.min(1, t / T); if (s >= 1) run = false; draw(); });
    draw();
  };

  // ======================================================================
  // P5 · Kondensatoren parallel und in Reihe
  // ======================================================================
  D['p-schaltung'] = function (host) {
    const W = 640, H = 290;
    host.innerHTML = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Zwei Kondensatoren parallel oder in Reihe an einer Spannungsquelle"><g id="circ"></g></svg>
      ${seg('art', [['p', 'Parallel'], ['r', 'In Reihe']], 'p')}
      <div class="pd-ctls">${slider('pdC1', 'C₁ =', 'µF', 10, 100, 5, 20)}${slider('pdC2', 'C₂ =', 'µF', 10, 100, 5, 30)}${slider('pdU5', 'U =', 'V', 1, 24, 1, 12)}</div>
      <div class="read"><span>C<sub>ges</sub> = <b id="rC"></b> µF</span><span>Q<sub>ges</sub> = <b id="rQ"></b> µC</span></div>
      <p class="pd-msg" id="msg"></p>`;
    let art = 'p';
    const cap = (x, y, vert, cls = '') => vert
      ? `<line x1="${x - 18}" x2="${x + 18}" y1="${y - 6}" y2="${y - 6}" class="pd-capl ${cls}"/><line x1="${x - 18}" x2="${x + 18}" y1="${y + 6}" y2="${y + 6}" class="pd-capl ${cls}"/>`
      : `<line x1="${x - 6}" x2="${x - 6}" y1="${y - 18}" y2="${y + 18}" class="pd-capl ${cls}"/><line x1="${x + 6}" x2="${x + 6}" y1="${y - 18}" y2="${y + 18}" class="pd-capl ${cls}"/>`;
    const qbar = (x, y, Q, Qmax) => { const h = 70 * Q / Qmax; return `<rect x="${x}" y="${y - h}" width="12" height="${h}" rx="3" class="pd-qbar"/><rect x="${x}" y="${y - 70}" width="12" height="70" rx="3" class="pd-qbar-bg"/>`; };
    function draw() {
      const C1 = val(host, 'pdC1'), C2 = val(host, 'pdC2'), U = val(host, 'pdU5');
      out(host, 'pdC1', C1); out(host, 'pdC2', C2); out(host, 'pdU5', U);
      const Qmax = Math.max(C1 * U, C2 * U) * 1.15;
      let g = `<line x1="60" x2="60" y1="120" y2="170" class="pd-wire"/><line x1="44" x2="76" y1="140" y2="140" class="pd-bat"/><line x1="52" x2="68" y1="152" y2="152" class="pd-bat thick"/><text x="30" y="150" text-anchor="end" class="pd-lbl">U</text><text x="88" y="150" class="pd-lbl">${U} V</text>`;
      let Cg, Qg, msg;
      if (art === 'p') {
        Cg = C1 + C2; Qg = Cg * U;
        const Q1 = C1 * U, Q2 = C2 * U;
        g += `<path d="M60 120 V40 H470 M60 170 V250 H470" class="pd-wire"/>
          <path d="M260 40 V139 M260 151 V250 M440 40 V139 M440 151 V250" class="pd-wire"/>${cap(260, 145, true)}${cap(440, 145, true)}
          ${qbar(300, 180, Q1, Qmax)}${qbar(480, 180, Q2, Qmax)}
          <text x="214" y="132" text-anchor="end" class="big">C₁</text><text x="214" y="152" text-anchor="end">${C1} µF</text>
          <text x="214" y="190" text-anchor="end">Q₁ = ${Q1} µC</text><text x="214" y="210" text-anchor="end">U₁ = ${U} V</text>
          <text x="394" y="132" text-anchor="end" class="big">C₂</text><text x="394" y="152" text-anchor="end">${C2} µF</text>
          <text x="394" y="190" text-anchor="end">Q₂ = ${Q2} µC</text><text x="394" y="210" text-anchor="end">U₂ = ${U} V</text>`;
        msg = 'Parallel: <b>gleiche Spannung</b> an beiden. Die Ladungen addieren sich, also auch die Kapazitäten: <b>C = C₁ + C₂</b> (wie eine größere Plattenfläche).';
      } else {
        Cg = 1 / (1 / C1 + 1 / C2); Qg = Cg * U;
        const U1 = Qg / C1, U2 = Qg / C2;
        g += `<path d="M60 120 V60 H254 M266 60 H434 M446 60 H560 V250 H60 V170" class="pd-wire"/>${cap(260, 60, false)}${cap(440, 60, false)}
          ${qbar(250, 200, Qg, Qmax)}${qbar(430, 200, Qg, Qmax)}
          <text x="260" y="30" text-anchor="middle" class="big">C₁ = ${C1} µF</text><text x="440" y="30" text-anchor="middle" class="big">C₂ = ${C2} µF</text>
          <text x="280" y="110" class="pd-lbl">Q₁ = ${num(Qg)} µC</text><text x="280" y="130" class="pd-lbl">U₁ = ${fix(U1, 2)} V</text>
          <text x="460" y="110" class="pd-lbl">Q₂ = ${num(Qg)} µC</text><text x="460" y="130" class="pd-lbl">U₂ = ${fix(U2, 2)} V</text>`;
        msg = `In Reihe: <b>gleiche Ladung</b> auf allen Platten (die Mittelstücke sind zusammen neutral). Die Spannungen addieren sich: ${fix(U1, 2)} V + ${fix(U2, 2)} V = ${U} V. Darum <b>1/C = 1/C₁ + 1/C₂</b>, und C ist kleiner als der kleinste Einzelkondensator.`;
      }
      $('#circ', host).innerHTML = g;
      $('#rC', host).innerHTML = num(Cg); $('#rQ', host).innerHTML = num(Qg);
      $('#msg', host).innerHTML = msg;
    }
    ['pdC1', 'pdC2', 'pdU5'].forEach(id => $('#' + id, host).addEventListener('input', draw));
    bindSeg(host, 'art', v => { art = v; draw(); });
    draw();
  };

  // ======================================================================
  // P6 · Braunsche Röhre: Glühemission, Beschleunigung e·U_B = ½·m·v²
  // ======================================================================
  D['p-roehre'] = function (host) {
    const W = 640, H = 250, xk = 74, xa = 210, xs = 600, yc = 120;
    host.innerHTML = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Braunsche Röhre mit Glühkathode, Anode und Leuchtschirm">
      <path d="M30 70 Q20 70 20 90 V150 Q20 170 30 170 H330 L590 222 Q604 224 604 210 V30 Q604 16 590 18 L330 70 Z" class="pd-glass"/>
      <path id="fil" d="M${xk - 22} ${yc - 14} l6 7 l-6 7 l6 7 l-6 7" class="pd-fil"/>
      <rect x="${xk - 8}" y="${yc - 18}" width="8" height="36" rx="2" class="pd-kath"/>
      <path d="M${xk - 36} ${yc - 34} H${xk + 20} V${yc - 8} M${xk - 36} ${yc + 34} H${xk + 20} V${yc + 8}" class="pd-wehnelt"/>
      <rect x="${xa}" y="${yc - 50}" width="9" height="44" class="pd-anode"/><rect x="${xa}" y="${yc + 6}" width="9" height="44" class="pd-anode"/>
      <line x1="${xs}" x2="${xs}" y1="30" y2="210" class="pd-screen"/><circle id="spot" cx="${xs - 2}" cy="${yc}" r="9" class="pd-spot"/>
      <g id="els"></g>
      <text x="${xk - 6}" y="${yc + 60}" text-anchor="middle">Kathode</text><text x="${xk}" y="${yc - 42}" text-anchor="middle">Wehnelt</text>
      <text x="${xa + 4}" y="${yc + 70}" text-anchor="middle">Anode</text><text x="${xs - 8}" y="232" text-anchor="end">Leuchtschirm</text>
      <text x="${(xk + xa) / 2}" y="${H - 6}" text-anchor="middle" class="pd-lbl" id="ubl"></text>
      <text x="400" y="${yc - 10}" text-anchor="middle" class="pd-lbl">Vakuum</text></svg>
      ${seg('heiz', [['an', 'Heizung an'], ['aus', 'Heizung aus']], 'an')}${seg('pol', [['n', 'Anode +'], ['u', 'Umgepolt: Anode −']], 'n')}
      <div class="pd-ctls">${slider('pdUB', 'U<sub>B</sub> =', 'V', 0, 2000, 50, 1000)}</div>
      <div class="read"><span>e·U<sub>B</sub> = ½·m·v² ⇒ v = <b id="rV"></b> m/s</span><span>das sind <b id="rP"></b> % der Lichtgeschwindigkeit</span></div>
      <p class="pd-msg" id="msg"></p>`;
    let heat = true, pol = 'n', els = [], acc = 0, glow = 0;
    const UB = () => val(host, 'pdUB');
    function info() {
      const U = UB(), v = Math.sqrt(2 * E * U / ME);
      out(host, 'pdUB', U);
      $('#rV', host).innerHTML = U ? num(v) : '0'; $('#rP', host).textContent = fix(v / 2.998e8 * 100, 1);
      $('#ubl', host).textContent = `U_B zwischen Kathode und Anode`;
      $('#fil', host).classList.toggle('hot', heat);
      $('#msg', host).innerHTML = !heat ? 'Kalte Kathode: Ohne Heizung treten (fast) keine Elektronen aus. Der <b>glühelektrische Effekt</b> braucht die hohe Temperatur.'
        : pol === 'u' ? 'Umgepolt: Die Anode ist negativ. Die ausgetretenen Elektronen werden zur Kathode zurückgedrängt, es fließt <b>kein Strom</b> (wie bei einer Diode).'
          : U === 0 ? 'Ohne Beschleunigungsspannung bleiben die Elektronen als Wolke an der Kathode.'
            : 'Zwischen Kathode und Anode werden die Elektronen schneller, danach fliegen sie mit <b>konstanter</b> Geschwindigkeit durchs Loch bis zum Schirm. Vierfache Spannung, doppelte Geschwindigkeit.';
    }
    function step(dt) {
      const U = UB();
      const vf = 40 + 360 * Math.sqrt(U / 2000); // px/s am Ende der Beschleunigung
      const a = (vf * vf - 400) / (2 * (xa - xk));
      if (heat) { acc += dt * 26; while (acc > 1) { acc--; if (els.length < 90) els.push({ x: xk + 2, y: yc + (Math.random() - 0.5) * 22, v: 20, back: false }); } }
      els.forEach(p => {
        if (pol === 'u' || U === 0) { // Wolke an der Kathode
          p.v = pol === 'u' ? -30 : 4; p.x += p.v * dt; if (p.x > xk + 26) p.x = xk + 26;
          if (p.x < xk + 2) p.dead = true; p.y += (Math.random() - 0.5) * 2;
          if (U === 0 && Math.random() < dt * 0.6) p.dead = true;
          return;
        }
        if (p.x < xa) { p.v = Math.sqrt(Math.max(400, 400 + 2 * a * (p.x - xk))); p.y += (yc - p.y) * dt * 4; }
        p.x += p.v * dt;
        if (p.x >= xs - 4) { p.dead = true; glow = Math.min(1, glow + 0.08); }
      });
      els = els.filter(p => !p.dead);
      glow = Math.max(0, glow - dt * 1.2);
      $('#els', host).innerHTML = els.map(p => `<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="3.2" class="pd-e small"/>`).join('');
      $('#spot', host).style.opacity = (pol === 'n' && U > 0 && heat ? 0.25 + 0.75 * glow : 0).toFixed(2);
    }
    $('#pdUB', host).addEventListener('input', info);
    bindSeg(host, 'heiz', v => { heat = v === 'an'; info(); });
    bindSeg(host, 'pol', v => { pol = v; info(); });
    info();
    if (reduced()) { step(0.5); step(0.5); } else loop(host, step);
  };

  // ======================================================================
  // P7 · Ablenkung im Querfeld: Parabel im Kondensator, Gerade danach
  // ======================================================================
  D['p-ablenkung'] = function (host, ctx, def) {
    def = def || {};
    const W = 640, H = 300, px = 20, xIn = 100, l = 0.08, d = 0.04, L = 0.15, yc = 150;
    const xOut = xIn + l * 100 * px, xS = xOut + L * 100 * px;
    const Y = m => yc + m * 100 * px; // m → px (y-Achse zeigt nach unten, wie im Unterricht)
    host.innerHTML = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Elektronenstrahl wird zwischen zwei Platten abgelenkt">${arrowDefs('pdA7')}
      <rect x="${xIn}" y="${Y(-d / 2) - 10}" width="${xOut - xIn}" height="10" rx="2" id="pTop"/><rect x="${xIn}" y="${Y(d / 2)}" width="${xOut - xIn}" height="10" rx="2" id="pBot"/>
      <text x="${xIn - 8}" y="${Y(-d / 2)}" text-anchor="end" class="big" id="sTop"></text><text x="${xIn - 8}" y="${Y(d / 2) + 10}" text-anchor="end" class="big" id="sBot"></text>
      <line x1="10" x2="${xS}" y1="${yc}" y2="${yc}" class="pd-axis-dash"/>
      <line x1="${xS}" x2="${xS}" y1="14" y2="${H - 14}" class="pd-screen"/>
      <path id="path" class="pd-beam"/><circle id="hit" r="6" class="pd-spot"/>
      <g id="proj"><line x1="${xIn}" x2="${xOut}" y1="${H - 24}" y2="${H - 24}" class="pd-ax"/><circle id="pjx" r="5" class="pd-dot"/><text x="${xOut + 6}" y="${H - 20}">x: gleichförmig</text>
        <line x1="${xIn - 40}" x2="${xIn - 40}" y1="${Y(d / 2)}" y2="${Y(-d / 2)}" class="pd-ax"/><circle id="pjy" r="5" class="pd-dot"/><text x="${xIn - 48}" y="${Y(d / 2) + 30}" text-anchor="middle">y: beschleunigt</text></g>
      <g id="els"></g>
      <text x="${(xIn + xOut) / 2}" y="${Y(d / 2) + 30}" text-anchor="middle">l = 8 cm, d = 4 cm</text><text x="${(xOut + xS) / 2}" y="${H - 6}" text-anchor="middle">Schirm 15 cm hinter den Platten</text></svg>
      ${seg('zerl', [['aus', 'Strahl'], ['an', 'Bewegung zerlegen']], def.zerlegen ? 'an' : 'aus')}
      <div class="pd-ctls">${slider('pdUB7', 'U<sub>B</sub> =', 'V', 500, 3000, 50, def.UB || 1000)}${slider('pdUy', 'U<sub>A</sub> =', 'V', -300, 300, 10, def.U || 150)}</div>
      <div class="read"><span>v₀ = <b id="rV"></b> m/s</span><span>y am Plattenende = <b id="rY"></b> mm</span><span>Winkel α = <b id="rA"></b>°</span><span>Auftreffpunkt = <b id="rS"></b> cm</span></div>
      <p class="pd-msg" id="msg"></p>`;
    let zerl = !!def.zerlegen, els = [], acc = 0, lead = null, geo = null;
    function geom() {
      const UB = val(host, 'pdUB7'), U = val(host, 'pdUy');
      out(host, 'pdUB7', UB); out(host, 'pdUy', fix(U, 0));
      const k = U / (4 * d * UB); // y = k·x²
      const xHit = U ? Math.sqrt((d / 2) / Math.abs(k)) : Infinity;
      const hits = xHit < l;
      const tan = 2 * k * l, yl = k * l * l, Ys = yl + L * tan;
      let dd = `M10 ${yc} L${xIn} ${yc}`;
      const xe = hits ? xHit : l;
      for (let i = 1; i <= 40; i++) { const x = xe * i / 40; dd += ` L${(xIn + x * 100 * px).toFixed(1)} ${Y(k * x * x).toFixed(1)}`; }
      if (!hits) dd += ` L${xS} ${Y(Ys).toFixed(1)}`;
      $('#path', host).setAttribute('d', dd);
      const hp = $('#hit', host);
      if (hits) { hp.setAttribute('cx', xIn + xHit * 100 * px); hp.setAttribute('cy', Y(Math.sign(U) * d / 2)); }
      else { hp.setAttribute('cx', xS); hp.setAttribute('cy', clamp(Y(Ys), 14, H - 14)); }
      const pos = U >= 0;
      $('#pTop', host).setAttribute('class', pos ? 'pd-plate-m' : 'pd-plate-p'); $('#pBot', host).setAttribute('class', pos ? 'pd-plate-p' : 'pd-plate-m');
      $('#sTop', host).textContent = U === 0 ? '' : pos ? '−' : '+'; $('#sBot', host).textContent = U === 0 ? '' : pos ? '+' : '−';
      const v0 = Math.sqrt(2 * E * UB / ME);
      $('#rV', host).innerHTML = num(v0);
      $('#rY', host).textContent = hits ? '–' : fix(yl * 1000, 1);
      $('#rA', host).textContent = hits ? '–' : fix(Math.atan(tan) * 180 / Math.PI, 1);
      $('#rS', host).textContent = hits ? 'trifft Platte' : (Math.abs(Ys) > 0.07 ? 'außerhalb' : fix(Ys * 100, 2));
      $('#proj', host).style.display = zerl ? '' : 'none';
      $('#msg', host).innerHTML = hits
        ? `Zu stark abgelenkt: Das Elektron trifft nach ${fix(xHit * 100, 1)} cm die positive Platte. Größere U<sub>B</sub> oder kleinere U<sub>A</sub> hilft.`
        : zerl ? 'Waagerecht fliegt das Elektron mit konstantem v₀ (gleiche Abstände), senkrecht wird es gleichmäßig beschleunigt (immer größere Abstände). Zusammen ergibt das eine <b>Parabel</b>, wie beim waagerechten Wurf.'
          : `Im Feld: Parabel <b>y = ½·(e/m)·(U<sub>A</sub>/d)·x²/v₀²</b>. Hinter den Platten wirkt keine Kraft mehr: geradeaus weiter. Doppelte U<sub>B</sub> halbiert die Ablenkung.`;
      geo = { k, xe, hits, tan, yl, v0 };
    }
    function step(dt) {
      if (!geo) return;
      const speed = 60 + 140 * Math.sqrt(val(host, 'pdUB7') / 3000); // px/s (Zeitlupe)
      acc += dt * (zerl ? 1.6 : 5);
      while (acc > 1) { acc--; const p = { x: 10, t: 0 }; els.push(p); if (!lead || lead.dead) lead = p; }
      els.forEach(p => {
        p.x += speed * dt;
        const xm = (p.x - xIn) / (100 * px);
        if (xm > geo.xe && geo.hits) p.dead = true;
        if (p.x >= xS) p.dead = true;
        p.y = xm <= 0 ? 0 : xm <= l ? geo.k * xm * xm : geo.yl + (xm - l) * geo.tan;
      });
      els = els.filter(p => !p.dead);
      $('#els', host).innerHTML = els.map(p => `<circle cx="${p.x.toFixed(1)}" cy="${Y(p.y).toFixed(1)}" r="${zerl && p === lead ? 6 : 3.4}" class="pd-e${zerl && p === lead ? '' : ' small'}"/>`).join('');
      if (zerl && lead && !lead.dead) {
        const inF = lead.x >= xIn && lead.x <= xOut;
        $('#pjx', host).setAttribute('cx', clamp(lead.x, xIn, xOut)); $('#pjx', host).setAttribute('cy', H - 24);
        $('#pjy', host).setAttribute('cx', xIn - 40); $('#pjy', host).setAttribute('cy', Y(inF ? lead.y : lead.x < xIn ? 0 : geo.yl));
      }
    }
    ['pdUB7', 'pdUy'].forEach(id => $('#' + id, host).addEventListener('input', geom));
    bindSeg(host, 'zerl', v => { zerl = v === 'an'; els = []; lead = null; geom(); });
    geom();
    if (!reduced()) loop(host, step);
  };

  // ======================================================================
  // P8 · RC-Glied: Laden und Entladen live, U_C(t) und I(t)
  // ======================================================================
  D['p-rc'] = function (host, ctx, def) {
    def = def || {};
    const W = 640, H = 330, U0 = def.U0 || 12;
    const gx0 = 300, gx1 = 620, gyT = 30, gyB = 150, gyB2 = 300, gyM = 225; // oben U, unten I (±)
    host.innerHTML = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Schaltung zum Laden und Entladen eines Kondensators mit Diagrammen für Spannung und Stromstärke">
      <path d="M50 270 V192 M50 180 V60 H90 M140 60 H170 M220 60 H250 V149 M250 161 V270 H50" class="pd-wire"/>
      <path d="M90 110 V270" class="pd-wire" id="bypass"/>
      <line x1="34" x2="66" y1="180" y2="180" class="pd-bat"/><line x1="42" x2="58" y1="192" y2="192" class="pd-bat thick"/><text x="74" y="190" class="pd-lbl">${U0} V</text>
      <line id="sw" x1="140" y1="60" x2="92" y2="60" class="pd-switch"/><circle cx="140" cy="60" r="4" class="pd-node"/><circle cx="90" cy="60" r="4" class="pd-node"/><circle cx="90" cy="110" r="4" class="pd-node"/>
      <text x="115" y="38" text-anchor="middle" class="pd-lbl" id="swl"></text>
      <rect x="170" y="50" width="50" height="20" rx="3" class="pd-res"/><text x="195" y="92" text-anchor="middle" class="pd-lbl">R</text>
      <line x1="228" x2="272" y1="149" y2="149" class="pd-capl"/><line x1="228" x2="272" y1="161" y2="161" class="pd-capl"/><text x="282" y="160" class="pd-lbl">C</text>
      <g id="els"></g>
      <line x1="${gx0}" x2="${gx1}" y1="${gyB}" y2="${gyB}" class="pd-ax"/><line x1="${gx0}" x2="${gx0}" y1="${gyT}" y2="${gyB}" class="pd-ax"/>
      <line x1="${gx0}" x2="${gx1}" y1="${gyM}" y2="${gyM}" class="pd-ax"/><line x1="${gx0}" x2="${gx0}" y1="${gyB + 14}" y2="${gyB2}" class="pd-ax"/>
      <text x="${gx0 + 6}" y="${gyT + 4}">U<tspan baseline-shift="sub" font-size="10">C</tspan></text><text x="${gx0 + 6}" y="${gyB + 26}">I</text>
      <g id="marks"></g><path id="cU" class="pd-curve"/><path id="cI" class="pd-curve2"/>
      <text x="${gx1}" y="${gyB + 14}" text-anchor="end">t</text><text x="${gx1}" y="${gyM + 14}" text-anchor="end">t</text></svg>
      <div class="pd-btns"><button class="btn primary small" type="button" data-m="laden">Laden</button><button class="btn small" type="button" data-m="entladen">Entladen</button><button class="btn small" type="button" data-m="reset">Zurück auf 0</button></div>
      <div class="pd-ctls">${slider('pdR', 'R =', 'kΩ', 1, 20, 1, def.R || 10)}${slider('pdCc', 'C =', 'µF', 100, 1000, 10, def.C || 470)}</div>
      <div class="read"><span>R·C = <b id="rT"></b> s</span><span>t = <b id="rt"></b> s</span><span>U<sub>C</sub> = <b id="rU"></b> V</span><span>I = <b id="rI"></b> mA</span></div>
      <p class="pd-msg" id="msg"></p>`;
    let mode = 'idle', t = 0, Ustart = 0, Uc = 0, pts = [], els = [];
    for (let i = 0; i < 26; i++) els.push(i / 26);
    const tau = () => val(host, 'pdR') * 1e3 * val(host, 'pdCc') * 1e-6;
    // Wegpunkte der Masche (für die Elektronen): Batterie → Schalter → R → C → zurück
    const P = [[50, 270], [50, 60], [250, 60], [250, 270], [50, 270]];
    const PD = [[90, 270], [90, 110], [140, 60], [250, 60], [250, 270], [90, 270]];
    const along = (path, f) => {
      const seg = []; let tot = 0;
      for (let i = 1; i < path.length; i++) { const l = Math.hypot(path[i][0] - path[i - 1][0], path[i][1] - path[i - 1][1]); seg.push(l); tot += l; }
      let s = ((f % 1) + 1) % 1 * tot;
      for (let i = 0; i < seg.length; i++) { if (s <= seg[i]) { const r = s / seg[i]; return [path[i][0] + (path[i + 1][0] - path[i][0]) * r, path[i][1] + (path[i + 1][1] - path[i][1]) * r]; } s -= seg[i]; }
      return path[0];
    };
    function marks() {
      const T = tau(), tmax = 5 * T, gx = tt => gx0 + tt / tmax * (gx1 - gx0);
      let m = '';
      for (let k = 1; k <= 5; k++) m += `<line x1="${gx(k * T)}" x2="${gx(k * T)}" y1="${gyT}" y2="${gyB2}" class="pd-grid"/><text x="${gx(k * T)}" y="${gyB2 + 16}" text-anchor="middle">${(k * T).toFixed(1).replace('.', ',')} s</text>`;
      const th = T * Math.LN2;
      m += `<line x1="${gx(th)}" x2="${gx(th)}" y1="${gyT}" y2="${gyB}" class="pd-grid strong"/><text x="${gx(th) - 4}" y="${gyT - 6}" text-anchor="middle" class="pd-lbl">t<tspan baseline-shift="sub" font-size="10">h</tspan></text>`;
      const yU = f => gyB - f * (gyB - gyT);
      m += `<line x1="${gx0}" x2="${gx1}" y1="${yU(0.63)}" y2="${yU(0.63)}" class="pd-grid"/><text x="${gx0 - 4}" y="${yU(0.63) + 4}" text-anchor="end">63 %</text>`;
      m += `<line x1="${gx0}" x2="${gx1}" y1="${yU(0.37)}" y2="${yU(0.37)}" class="pd-grid"/><text x="${gx0 - 4}" y="${yU(0.37) + 4}" text-anchor="end">37 %</text>`;
      m += `<text x="${gx0 - 4}" y="${gyT + 4}" text-anchor="end">${U0} V</text>`;
      $('#marks', host).innerHTML = m;
    }
    function draw() {
      const T = tau(), tmax = 5 * T, I0 = U0 / (val(host, 'pdR') * 1e3);
      out(host, 'pdR', val(host, 'pdR')); out(host, 'pdCc', val(host, 'pdCc'));
      const gx = tt => gx0 + Math.min(tt, tmax) / tmax * (gx1 - gx0), yU = u => gyB - u / U0 * (gyB - gyT), yI = i => gyM - i / I0 * (gyM - gyB - 18);
      let dU = '', dI = '';
      pts.forEach((p, i) => { dU += (i ? 'L' : 'M') + gx(p[0]).toFixed(1) + ' ' + yU(p[1]).toFixed(1); dI += (i ? 'L' : 'M') + gx(p[0]).toFixed(1) + ' ' + yI(p[2]).toFixed(1); });
      $('#cU', host).setAttribute('d', dU); $('#cI', host).setAttribute('d', dI);
      const I = mode === 'laden' ? (U0 - Uc) / (val(host, 'pdR') * 1e3) : mode === 'entladen' ? -Uc / (val(host, 'pdR') * 1e3) : 0;
      $('#rT', host).textContent = fix(T, 2); $('#rt', host).textContent = fix(t, 1);
      $('#rU', host).textContent = fix(Uc, 2); $('#rI', host).textContent = fix(I * 1000, 3);
      const lad = mode !== 'entladen';
      $('#sw', host).setAttribute('x2', lad ? 92 : 93); $('#sw', host).setAttribute('y2', lad ? 60 : 107);
      $('#swl', host).textContent = mode === 'entladen' ? 'Schalter: Entladen' : 'Schalter: Laden';
      $('#bypass', host).style.opacity = lad ? 0.3 : 1;
      const f = t / T;
      $('#msg', host).innerHTML = mode === 'idle' ? 'Drück auf „Laden“. Am Anfang ist der Kondensator leer.'
        : mode === 'laden' ? (f < 0.15 ? 'Einschaltmoment: Der leere Kondensator wirkt wie ein <b>Kurzschluss</b>, der Strom ist maximal: I₀ = U₀/R.' : f < 1.1 ? 'Je voller der Kondensator, desto größer seine Gegenspannung, desto kleiner der Strom. Die Spannung nähert sich immer langsamer dem Endwert (Maschenregel: U₀ = U<sub>R</sub> + U<sub>C</sub>).' : f < 4.9 ? 'Nach jeder Halbwertszeit t<sub>h</sub> = R·C·ln 2 ist der Abstand zum Endwert nur noch halb so groß.' : 'Nach etwa dem <b>Fünffachen von R·C</b> ist der Kondensator voll und wirkt wie eine <b>Unterbrechung</b>: kein Strom mehr.')
          : (f < 0.15 ? 'Entladen: Der Strom fließt jetzt <b>andersherum</b> (negativ) und startet bei −U₀/R.' : f < 4.9 ? 'Spannung und Strom fallen mit derselben e-Funktion: U = U₀·e<sup>−t/(R·C)</sup>.' : 'Nach etwa dem Fünffachen von R·C ist der Kondensator praktisch leer (unter 1 %).');
      // Elektronen: Geschwindigkeit ~ |I|
      return I / I0;
    }
    let rel = 0;
    function step(dt) {
      const T = tau();
      if (mode === 'laden' || mode === 'entladen') {
        const simDt = dt * T / 1.4; // R·C dauert 1,4 s
        t += simDt;
        Uc = mode === 'laden' ? U0 + (Ustart - U0) * Math.exp(-t / T) : Ustart * Math.exp(-t / T);
        const I0 = U0 / (val(host, 'pdR') * 1e3), I = mode === 'laden' ? (U0 - Uc) / (val(host, 'pdR') * 1e3) : -Uc / (val(host, 'pdR') * 1e3);
        if (t <= 5 * T + simDt) pts.push([t, Uc, I]);
        rel = draw();
        void I0;
      }
      const path = mode === 'entladen' ? PD : P;
      for (let i = 0; i < els.length; i++) els[i] = (els[i] - rel * dt * 0.35 + 1) % 1; // Elektronen laufen gegen die techn. Stromrichtung
      $('#els', host).innerHTML = Math.abs(rel) > 0.01 ? els.map(f => { const [x, y] = along(path, f); return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="3" class="pd-e small"/>`; }).join('') : '';
    }
    $$('[data-m]', host).forEach(b => b.addEventListener('click', () => {
      const m = b.dataset.m;
      if (m === 'reset') { mode = 'idle'; t = 0; Uc = 0; pts = []; rel = 0; draw(); $('#els', host).innerHTML = ''; return; }
      mode = m; t = 0; Ustart = Uc; pts = [[0, Uc, m === 'laden' ? (U0 - Uc) / (val(host, 'pdR') * 1e3) : -Uc / (val(host, 'pdR') * 1e3)]];
      if (reduced()) { t = 5 * tau(); Uc = m === 'laden' ? U0 : 0; for (let k = 1; k <= 60; k++) { const tt = k / 60 * 5 * tau(), u = m === 'laden' ? U0 + (Ustart - U0) * Math.exp(-tt / tau()) : Ustart * Math.exp(-tt / tau()); pts.push([tt, u, m === 'laden' ? (U0 - u) / (val(host, 'pdR') * 1e3) : -u / (val(host, 'pdR') * 1e3)]); } }
      draw();
    }));
    ['pdR', 'pdCc'].forEach(id => $('#' + id, host).addEventListener('input', () => { mode = 'idle'; t = 0; Uc = 0; pts = []; rel = 0; marks(); draw(); }));
    marks(); draw();
    loop(host, step);
  };

  // ======================================================================
  // P9 · Kapazität aus der Entladekurve bestimmen (U₀/3 und ln-Darstellung)
  // ======================================================================
  D['p-messung'] = function (host) {
    const W = 640, H = 300, x0 = 60, x1 = 610, yT = 24, yB = 250, R = 47e3, U0 = 9;
    const CS = [220, 330, 470, 680, 1000];
    let C = CS[Math.floor(Math.random() * CS.length)] * 1e-6, lnMode = false;
    host.innerHTML = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Entladekurve eines Kondensators mit Messcursor"><g id="ax"></g><path id="cv" class="pd-curve"/><line id="cur" class="pd-guide"/><circle id="dot" r="7" class="pd-dot"/></svg>
      ${seg('dar', [['lin', 'U gegen t'], ['ln', 'ln(U/U₀) gegen t']], 'lin')}
      <div class="pd-ctls">${slider('pdTm', 'Cursor bei t =', 's', 0, 100, 0.1, 10)}</div>
      <div class="read"><span>U = <b id="rU"></b> V</span><span>U/U₀ = <b id="rR"></b> %</span><span>ln(U/U₀) = <b id="rL"></b></span></div>
      <div class="pd-try"><label for="pdGuess">Unbekannter Kondensator, R = 47 kΩ, U₀ = 9 V. Dein C in µF:</label><div class="pd-try-row"><input id="pdGuess" inputmode="decimal" autocomplete="off" placeholder="z. B. 300"><button class="btn small primary" type="button" data-chk>Prüfen</button><button class="btn small" type="button" data-new>Neuer Kondensator</button></div></div>
      <p class="pd-msg" id="msg">Schiebe den Cursor, bis U = U₀/3 = 3 V ist. Dann gilt t<sub>E</sub> = R·C·ln 3, also C = t<sub>E</sub> / (R·ln 3).</p>`;
    let tmax;
    function axes() {
      const T = R * C; tmax = Math.ceil(2.4 * T / 10) * 10;
      $('#pdTm', host).max = tmax; $('#pdTm', host).step = tmax / 400;
      const sx = t => x0 + t / tmax * (x1 - x0);
      let a = `<line x1="${x0}" x2="${x1}" y1="${yB}" y2="${yB}" class="pd-ax"/><line x1="${x0}" x2="${x0}" y1="${yT}" y2="${yB}" class="pd-ax"/>`;
      const stepT = tmax / 10;
      for (let k = 0; k <= 10; k++) a += `<line x1="${sx(k * stepT)}" x2="${sx(k * stepT)}" y1="${yT}" y2="${yB}" class="pd-grid"/><text x="${sx(k * stepT)}" y="${yB + 18}" text-anchor="middle">${fix(k * stepT, 0)}</text>`;
      a += `<text x="${x1}" y="${yB + 36}" text-anchor="end">t in s</text>`;
      if (!lnMode) {
        const sy = u => yB - u / U0 * (yB - yT);
        for (let u = 0; u <= 9; u += 1) a += `<line x1="${x0}" x2="${x1}" y1="${sy(u)}" y2="${sy(u)}" class="pd-grid"/><text x="${x0 - 8}" y="${sy(u) + 4}" text-anchor="end">${u}</text>`;
        a += `<line x1="${x0}" x2="${x1}" y1="${sy(3)}" y2="${sy(3)}" class="pd-grid strong"/><text x="${x1}" y="${sy(3) - 6}" text-anchor="end" class="pd-lbl">U₀/3 = 3 V</text><text x="${x0 + 6}" y="${yT - 6}">U in V</text>`;
      } else {
        const sy = v => yT + (-v) / 2.5 * (yB - yT);
        for (let v = 0; v >= -2.5; v -= 0.5) a += `<line x1="${x0}" x2="${x1}" y1="${sy(v)}" y2="${sy(v)}" class="pd-grid"/><text x="${x0 - 8}" y="${sy(v) + 4}" text-anchor="end">${fix(v, 1)}</text>`;
        a += `<text x="${x0 + 6}" y="${yT - 8}">ln(U/U₀)</text><text x="${x1}" y="${sy(-2.3)}" text-anchor="end" class="pd-lbl">Gerade mit Steigung −1/(R·C)</text>`;
      }
      $('#ax', host).innerHTML = a;
      let d = '';
      for (let i = 0; i <= 120; i++) {
        const t = tmax * i / 120, r = Math.exp(-t / T);
        const y = lnMode ? yT + Math.min(2.5, t / T) / 2.5 * (yB - yT) : yB - r * (yB - yT);
        d += (i ? 'L' : 'M') + sx(t).toFixed(1) + ' ' + y.toFixed(1);
      }
      $('#cv', host).setAttribute('d', d);
      cursor();
    }
    function cursor() {
      const T = R * C, t = Math.min(val(host, 'pdTm'), tmax), r = Math.exp(-t / T);
      const sx = x0 + t / tmax * (x1 - x0);
      const y = lnMode ? yT + Math.min(2.5, t / T) / 2.5 * (yB - yT) : yB - r * (yB - yT);
      const c = $('#cur', host); c.setAttribute('x1', sx); c.setAttribute('x2', sx); c.setAttribute('y1', yT); c.setAttribute('y2', yB);
      $('#dot', host).setAttribute('cx', sx); $('#dot', host).setAttribute('cy', y);
      out(host, 'pdTm', fix(t, 1));
      $('#rU', host).textContent = fix(U0 * r, 2); $('#rR', host).textContent = fix(r * 100, 1); $('#rL', host).textContent = fix(Math.log(r), 3);
    }
    $('#pdTm', host).addEventListener('input', cursor);
    bindSeg(host, 'dar', v => { lnMode = v === 'ln'; axes(); });
    $('[data-chk]', host).addEventListener('click', () => {
      const g = parseFloat(($('#pdGuess', host).value || '').replace(',', '.'));
      const true_ = C * 1e6;
      const ok = isFinite(g) && Math.abs(g - true_) / true_ <= 0.05;
      $('#msg', host).innerHTML = !isFinite(g) ? 'Gib eine Zahl in µF ein.' : ok
        ? `Richtig: C = ${true_} µF (R·C = ${fix(R * C, 1)} s). Abweichung ${fix(Math.abs(g - true_) / true_ * 100, 1)} %, das ist im Rahmen der Ablesegenauigkeit.`
        : `Noch nicht (mehr als 5 % daneben). Tipp: t<sub>E</sub> bei U = 3 V ablesen, dann C = t<sub>E</sub> / (47 000 Ω · ln 3). Ergebnis in F, mal 10⁶ ergibt µF.`;
    });
    $('[data-new]', host).addEventListener('click', () => { let c; do { c = CS[Math.floor(Math.random() * CS.length)] * 1e-6; } while (c === C); C = c; $('#pdGuess', host).value = ''; $('#msg', host).innerHTML = 'Neuer Kondensator. Wieder bei U₀/3 ablesen.'; axes(); });
    axes();
  };

  window.LR_DEMOS = Object.assign(window.LR_DEMOS || {}, D);
})();
