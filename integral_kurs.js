// ============================================================
// INTEGRAL_KURS.JS  –  Mathe-Lernportal Modul 06
// Integralrechnung komplett: Erklärung, interaktive Demos, Abi-Übungen (Teil A / Teil B)
// Alle Aufgaben sind eigene Aufgaben im Stil des Zentralabiturs Niedersachsen (eA),
// angelehnt an Abitur-Aufgabenformate. Musterlösungen sind NICHT offizielle
// Lösungsvorgaben des Landes Niedersachsen.
// ============================================================
(function () {
  'use strict';

  const LS_KEY = 'ik_progress_v1';
  let currentTab = 'erklaerung';

  // ---------- Hilfsfunktionen ----------
  function escAttr(s) {
    return String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
  }
  // $$...$$ = abgesetzte Formel, $...$ = Formel im Text (KaTeX)
  function M(s) {
    return String(s)
      .replace(/\$\$([\s\S]+?)\$\$/g, (m, l) => '<span class="ik-tex ik-disp" data-d="1" data-l="' + escAttr(l) + '"></span>')
      .replace(/\$([^$]+?)\$/g, (m, l) => '<span class="ik-tex" data-d="0" data-l="' + escAttr(l) + '"></span>');
  }
  function renderMath(root) {
    if (!root) return;
    root.querySelectorAll('.ik-tex:not([data-done])').forEach(el => {
      try {
        katex.render(el.dataset.l, el, { displayMode: el.dataset.d === '1', throwOnError: false });
      } catch (e) {
        el.textContent = el.dataset.l;
      }
      el.dataset.done = '1';
    });
  }
  function fmt(v) {
    const r = Math.round(v * 100) / 100;
    return String(r).replace('.', ',');
  }
  function fmtN(v, d) {
    return Number(v).toFixed(d == null ? 3 : d).replace('.', ',');
  }
  function loadProgress() {
    try { return JSON.parse(localStorage.getItem(LS_KEY) || '{}') || {}; } catch (e) { return {}; }
  }
  function saveProgress(p) {
    try { localStorage.setItem(LS_KEY, JSON.stringify(p)); } catch (e) { /* ohne Speicher weiterarbeiten */ }
  }

  function injectStyles() {
    if (document.getElementById('ik-styles')) return;
    const st = document.createElement('style');
    st.id = 'ik-styles';
    st.textContent = `
      .ik-wrap { max-width: 980px; margin: 0 auto; padding: 0 0.2rem 2rem; }
      .ik-title { font-size: 1.35rem; margin: 0.2rem 0 0.2rem; color: var(--text-primary); }
      .ik-sub { color: var(--text-secondary); font-size: 0.86rem; margin-bottom: 0.7rem; }
      .ik-tabs { display: flex; flex-wrap: wrap; gap: 0.4rem; margin: 0.6rem 0 1rem; }
      .ik-card { background: var(--bg-card, var(--bg-subtle)); border: 1px solid var(--border-subtle); border-radius: 12px; padding: 0.9rem 1rem; margin-bottom: 0.9rem; }
      .ik-card.accent { border-left: 4px solid #38bdf8; }
      .ik-card p, .ik-card li { font-size: 0.9rem; line-height: 1.55; color: var(--text-primary); }
      .ik-card ul, .ik-card ol { padding-left: 1.2rem; margin: 0.3rem 0; }
      details.ik-sec { border: 1px solid var(--border-subtle); border-radius: 12px; margin-bottom: 0.7rem; background: var(--bg-card, var(--bg-subtle)); }
      details.ik-sec > summary { cursor: pointer; padding: 0.7rem 1rem; font-weight: 700; font-size: 0.98rem; color: var(--text-primary); list-style: none; }
      details.ik-sec > summary::-webkit-details-marker { display: none; }
      details.ik-sec > summary::before { content: '▸ '; color: #38bdf8; }
      details.ik-sec[open] > summary::before { content: '▾ '; }
      details.ik-sec .ik-body { padding: 0 1rem 0.9rem; }
      .ik-body p, .ik-body li { font-size: 0.9rem; line-height: 1.6; color: var(--text-primary); }
      .ik-body ul, .ik-body ol { padding-left: 1.2rem; margin: 0.3rem 0 0.6rem; }
      .ik-box { border-left: 4px solid #f59e0b; background: rgba(245,158,11,0.09); padding: 0.55rem 0.8rem; border-radius: 6px; margin: 0.6rem 0; }
      .ik-box.ok { border-left-color: #34d399; background: rgba(52,211,153,0.09); }
      .ik-box.bad { border-left-color: #f87171; background: rgba(248,113,113,0.09); }
      .ik-table { border-collapse: collapse; width: 100%; font-size: 0.88rem; margin: 0.4rem 0 0.7rem; }
      .ik-table th, .ik-table td { border: 1px solid var(--border-subtle); padding: 0.35rem 0.6rem; text-align: left; vertical-align: middle; }
      .ik-table th { background: var(--bg-subtle); }
      .ik-demo { margin: 0.6rem 0; }
      .ik-demo canvas { width: 100%; max-width: 640px; display: block; border-radius: 8px; border: 1px solid var(--border-subtle); }
      .ik-controls { display: flex; flex-wrap: wrap; gap: 0.7rem; align-items: center; margin: 0.4rem 0; font-size: 0.84rem; color: var(--text-secondary); }
      .ik-controls select, .ik-controls input[type=range] { accent-color: #38bdf8; }
      .ik-readout { font-size: 0.86rem; background: var(--bg-subtle); border: 1px solid var(--border-subtle); border-radius: 8px; padding: 0.45rem 0.7rem; margin-top: 0.3rem; }
      .ik-pair { display: grid; grid-template-columns: 1fr 1fr; gap: 0.6rem; }
      @media (max-width: 720px) { .ik-pair { grid-template-columns: 1fr; } }
      .ik-task { border: 1px solid var(--border-subtle); border-radius: 12px; padding: 0.8rem 1rem; margin-bottom: 1rem; background: var(--bg-card, var(--bg-subtle)); }
      .ik-task h3 { margin: 0 0 0.2rem; font-size: 1.02rem; color: var(--text-primary); }
      .ik-task .ik-meta { font-size: 0.78rem; color: var(--text-muted); margin-bottom: 0.4rem; }
      .ik-part { border-top: 1px dashed var(--border-subtle); padding-top: 0.6rem; margin-top: 0.6rem; }
      .ik-part-head { display: flex; justify-content: space-between; gap: 0.6rem; font-size: 0.9rem; color: var(--text-primary); }
      .ik-be { font-size: 0.78rem; font-weight: 700; color: #0284c7; white-space: nowrap; }
      .ik-row { display: flex; flex-wrap: wrap; gap: 0.5rem; align-items: center; margin: 0.4rem 0; font-size: 0.85rem; }
      .ik-row textarea { width: 100%; min-height: 44px; border-radius: 8px; border: 1px solid var(--border-subtle); background: var(--bg-subtle); color: var(--text-primary); padding: 0.4rem 0.5rem; font: inherit; }
      .ik-sol { display: none; margin-top: 0.4rem; padding: 0.6rem 0.8rem; border-radius: 8px; background: rgba(52,211,153,0.08); border: 1px solid rgba(52,211,153,0.35); }
      .ik-sol.open { display: block; }
      .ik-sol p, .ik-sol li { font-size: 0.86rem; line-height: 1.55; }
      .ik-fb { font-weight: 700; font-size: 0.84rem; }
      .ik-fb.ok { color: #10b981; }
      .ik-fb.no { color: #ef4444; }
      .ik-score { display: flex; flex-wrap: wrap; gap: 0.3rem; align-items: center; margin-top: 0.45rem; font-size: 0.82rem; color: var(--text-secondary); }
      .ik-score button { min-width: 30px; padding: 0.25rem 0.5rem; border-radius: 999px; border: 1px solid var(--border-subtle); background: var(--bg-subtle); color: var(--text-primary); cursor: pointer; font-size: 0.8rem; }
      .ik-score button.on { background: #0ea5e9; border-color: #0ea5e9; color: #fff; font-weight: 700; }
      .ik-bar { height: 10px; border-radius: 6px; background: var(--bg-subtle); border: 1px solid var(--border-subtle); overflow: hidden; min-width: 120px; }
      .ik-bar > span { display: block; height: 100%; background: linear-gradient(90deg, #38bdf8, #34d399); }
      .ik-num { width: 110px; }
      .ik-export { width: 100%; min-height: 120px; font-family: ui-monospace, Consolas, monospace; font-size: 0.78rem; border-radius: 8px; border: 1px solid var(--border-subtle); background: var(--bg-subtle); color: var(--text-primary); padding: 0.5rem; }
      .ik-disp { display: block; overflow-x: auto; }
    `;
    document.head.appendChild(st);
  }

  // ---------- Diagramm-Hilfen (Canvas) ----------
  function plotSetup(canvas, xmin, xmax, ymin, ymax) {
    const ctx = canvas.getContext('2d');
    const W = canvas.width, H = canvas.height;
    const P = { l: 44, r: 14, t: 16, b: 30 };
    const pw = W - P.l - P.r, ph = H - P.t - P.b;
    const dark = document.documentElement.getAttribute('data-theme') === 'dark';
    const col = {
      bg: dark ? '#1e2329' : '#ffffff',
      grid: dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
      axis: dark ? '#8b99a9' : '#555555',
      text: dark ? '#c9d1d9' : '#333333'
    };
    const X = x => P.l + (x - xmin) / (xmax - xmin) * pw;
    const Y = y => P.t + (1 - (y - ymin) / (ymax - ymin)) * ph;
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = col.bg;
    ctx.fillRect(0, 0, W, H);
    const nice = range => {
      const raw = range / 8;
      const p = Math.pow(10, Math.floor(Math.log10(raw)));
      const m = raw / p;
      return (m < 1.5 ? 1 : m < 3 ? 2 : m < 7 ? 5 : 10) * p;
    };
    const sx = nice(xmax - xmin), sy = nice(ymax - ymin);
    ctx.strokeStyle = col.grid;
    ctx.lineWidth = 1;
    ctx.fillStyle = col.text;
    ctx.font = '10px system-ui';
    ctx.textAlign = 'center';
    for (let x = Math.ceil(xmin / sx) * sx; x <= xmax + 1e-9; x += sx) {
      ctx.beginPath(); ctx.moveTo(X(x), P.t); ctx.lineTo(X(x), P.t + ph); ctx.stroke();
      ctx.fillText(fmt(x), X(x), P.t + ph + 13);
    }
    ctx.textAlign = 'right';
    for (let y = Math.ceil(ymin / sy) * sy; y <= ymax + 1e-9; y += sy) {
      ctx.beginPath(); ctx.moveTo(P.l, Y(y)); ctx.lineTo(P.l + pw, Y(y)); ctx.stroke();
      ctx.fillText(fmt(y), P.l - 5, Y(y) + 3);
    }
    ctx.strokeStyle = col.axis;
    ctx.lineWidth = 1.5;
    if (ymin <= 0 && ymax >= 0) { ctx.beginPath(); ctx.moveTo(P.l, Y(0)); ctx.lineTo(P.l + pw, Y(0)); ctx.stroke(); }
    if (xmin <= 0 && xmax >= 0) { ctx.beginPath(); ctx.moveTo(X(0), P.t); ctx.lineTo(X(0), P.t + ph); ctx.stroke(); }
    return { ctx, X, Y, P, pw, ph, W, H, col };
  }
  function drawCurve(S, f, xa, xb, color, width) {
    const { ctx, X, Y } = S;
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = width || 2.4;
    const N = 400;
    for (let i = 0; i <= N; i++) {
      const x = xa + (xb - xa) * i / N;
      const y = f(x);
      if (i === 0) ctx.moveTo(X(x), Y(y)); else ctx.lineTo(X(x), Y(y));
    }
    ctx.stroke();
  }
  // Streifenweise Füllung zwischen f und g (g = 0 für Fläche zur x-Achse); Farbe je nach Vorzeichen von f-g
  function fillSigned(S, f, g, xa, xb, posCol, negCol) {
    const { ctx, X, Y } = S;
    const N = 240;
    for (let i = 0; i < N; i++) {
      const x0 = xa + (xb - xa) * i / N, x1 = xa + (xb - xa) * (i + 1) / N;
      const xm = (x0 + x1) / 2;
      ctx.fillStyle = (f(xm) - g(xm)) >= 0 ? posCol : negCol;
      ctx.beginPath();
      ctx.moveTo(X(x0), Y(f(x0)));
      ctx.lineTo(X(x1), Y(f(x1)));
      ctx.lineTo(X(x1), Y(g(x1)));
      ctx.lineTo(X(x0), Y(g(x0)));
      ctx.closePath();
      ctx.fill();
    }
  }
  function simpson(f, a, b, n) {
    n = n || 2000;
    const h = (b - a) / n;
    let s = f(a) + f(b);
    for (let i = 1; i < n; i++) s += (i % 2 ? 4 : 2) * f(a + i * h);
    return s * h / 3;
  }

  // ---------- Demo 1: Ober- und Untersumme ----------
  const RIEMANN_FN = {
    x2:   { f: x => x * x,            a: 0, b: 2,        exact: 8 / 3,            label: 'f(x) = x²',        ymin: -0.3, ymax: 4.6 },
    sin1: { f: x => Math.sin(x) + 1,  a: 0, b: Math.PI,  exact: Math.PI + 2,      label: 'f(x) = sin(x) + 1', ymin: -0.3, ymax: 2.4 },
    par:  { f: x => 4 - x * x,        a: 0, b: 2,        exact: 16 / 3,           label: 'f(x) = 4 − x²',    ymin: -0.3, ymax: 4.6 }
  };
  function drawRiemann() {
    const c = document.getElementById('ik-riemann');
    if (!c) return;
    const n = +document.getElementById('ik-riemann-n').value;
    const mode = document.getElementById('ik-riemann-mode').value;
    const key = document.getElementById('ik-riemann-f').value;
    const D = RIEMANN_FN[key];
    document.getElementById('ik-riemann-nval').textContent = n;
    const S = plotSetup(c, D.a - 0.2 * (D.b - D.a) / 2, D.b + 0.2 * (D.b - D.a) / 2, D.ymin, D.ymax);
    const { ctx, X, Y } = S;
    const dx = (D.b - D.a) / n;
    let U = 0, O = 0;
    for (let i = 0; i < n; i++) {
      const x0 = D.a + i * dx, x1 = x0 + dx;
      let mn = Infinity, mx = -Infinity;
      for (let k = 0; k <= 24; k++) {
        const v = D.f(x0 + (x1 - x0) * k / 24);
        if (v < mn) mn = v;
        if (v > mx) mx = v;
      }
      U += mn * dx; O += mx * dx;
      if (mode === 'over' || mode === 'both') {
        ctx.fillStyle = 'rgba(245,158,11,0.28)'; ctx.strokeStyle = '#f59e0b'; ctx.lineWidth = 1;
        ctx.fillRect(X(x0), Y(mx), X(x1) - X(x0), Y(0) - Y(mx));
        ctx.strokeRect(X(x0), Y(mx), X(x1) - X(x0), Y(0) - Y(mx));
      }
      if (mode === 'under' || mode === 'both') {
        ctx.fillStyle = 'rgba(56,189,248,0.38)'; ctx.strokeStyle = '#0284c7'; ctx.lineWidth = 1;
        ctx.fillRect(X(x0), Y(mn), X(x1) - X(x0), Y(0) - Y(mn));
        ctx.strokeRect(X(x0), Y(mn), X(x1) - X(x0), Y(0) - Y(mn));
      }
    }
    drawCurve(S, D.f, D.a - 0.2 * (D.b - D.a) / 2, D.b + 0.2 * (D.b - D.a) / 2, '#7c3aed', 2.6);
    ctx.fillStyle = S.col.text; ctx.font = 'bold 12px system-ui'; ctx.textAlign = 'left';
    ctx.fillText(D.label + ' auf [' + fmt(D.a) + '; ' + fmt(D.b) + ']', S.P.l + 8, S.P.t + 12);
    const out = document.getElementById('ik-riemann-out');
    if (out) {
      out.innerHTML = 'Untersumme <b>U<sub>' + n + '</sub> = ' + fmtN(U, 4) + '</b> &nbsp;·&nbsp; Obersumme <b>O<sub>' + n + '</sub> = ' + fmtN(O, 4) +
        '</b> &nbsp;·&nbsp; Integral = <b>' + fmtN(D.exact, 4) + '</b> &nbsp;·&nbsp; Abstand O − U = ' + fmtN(O - U, 4) +
        '<br>Je größer n, desto enger schließen U und O das Integral ein.';
    }
  }

  // ---------- Demo 2: Hauptsatz / Integralfunktion ----------
  const HS = {
    f: x => 0.25 * x * x * x - x,
    F: x => x * x * x * x / 16 - x * x / 2,
    a: -3, xmin: -3.4, xmax: 3.4
  };
  function drawHauptsatz() {
    const c1 = document.getElementById('ik-hs-f');
    const c2 = document.getElementById('ik-hs-I');
    if (!c1 || !c2) return;
    const x = +document.getElementById('ik-hs-x').value;
    document.getElementById('ik-hs-xval').textContent = fmt(x);
    const I = t => HS.F(t) - HS.F(HS.a);
    // links: f mit Fläche von a bis x
    let S = plotSetup(c1, HS.xmin, HS.xmax, -4.4, 4.4);
    if (x > HS.a) fillSigned(S, HS.f, () => 0, HS.a, x, 'rgba(56,189,248,0.45)', 'rgba(248,113,113,0.45)');
    drawCurve(S, HS.f, HS.xmin, HS.xmax, '#0284c7', 2.6);
    S.ctx.strokeStyle = '#f59e0b'; S.ctx.lineWidth = 1.5; S.ctx.setLineDash([5, 4]);
    S.ctx.beginPath(); S.ctx.moveTo(S.X(x), S.P.t); S.ctx.lineTo(S.X(x), S.P.t + S.ph); S.ctx.stroke(); S.ctx.setLineDash([]);
    S.ctx.fillStyle = S.col.text; S.ctx.font = 'bold 12px system-ui'; S.ctx.textAlign = 'left';
    S.ctx.fillText('f(x) = ¼x³ − x   (Fläche ab a = −3)', S.P.l + 8, S.P.t + 12);
    // rechts: Integralfunktion
    S = plotSetup(c2, HS.xmin, HS.xmax, -2.6, 3.4);
    drawCurve(S, I, HS.a, HS.xmax, '#7c3aed', 2.6);
    S.ctx.fillStyle = '#f59e0b';
    S.ctx.beginPath(); S.ctx.arc(S.X(x), S.Y(I(x)), 5.5, 0, 2 * Math.PI); S.ctx.fill();
    S.ctx.fillStyle = S.col.text; S.ctx.font = 'bold 12px system-ui'; S.ctx.textAlign = 'left';
    S.ctx.fillText('I(x) = ∫ f(t) dt von −3 bis x', S.P.l + 8, S.P.t + 12);
    const out = document.getElementById('ik-hs-out');
    if (out) {
      out.innerHTML = 'x = <b>' + fmt(x) + '</b> &nbsp;·&nbsp; I(x) = <b>' + fmtN(I(x), 3) + '</b> (orientierte Fläche) &nbsp;·&nbsp; f(x) = <b>' + fmtN(HS.f(x), 3) +
        '</b> = Steigung von I an dieser Stelle.<br>Wo f eine Nullstelle mit Vorzeichenwechsel hat (x = −2, 0, 2), hat I ein Extremum. Wo f den Extremwert hat, hat I einen Wendepunkt.';
    }
  }

  // ---------- Demo 3: Fläche zwischen Graphen ----------
  const FL = {
    a: { f: x => x * x, g: x => 2 * x, xa: 0, xb: 2, xmin: -0.5, xmax: 2.5, ymin: -0.6, ymax: 4.8, lf: 'f(x) = x²', lg: 'g(x) = 2x',
         exact: '4/3 ≈ 1,333', calc: 'Schnittstellen 0 und 2; g liegt oben: A = ∫₀² (2x − x²) dx = [x² − ⅓x³]₀² = 4 − 8/3 = 4/3' },
    b: { f: x => x * x * x - x, g: () => 0, xa: -1, xb: 1, xmin: -1.5, xmax: 1.5, ymin: -0.7, ymax: 0.7, lf: 'f(x) = x³ − x', lg: 'x-Achse',
         exact: '1/2 = 0,5', calc: 'Nullstellen −1, 0, 1; Fläche symmetrisch: A = 2·|∫₀¹ (x³ − x) dx| = 2·|¼ − ½| = 1/2 (Integral über [−1;1] wäre 0!)' },
    c: { f: x => Math.sin(x), g: x => Math.cos(x), xa: Math.PI / 4, xb: 5 * Math.PI / 4, xmin: 0, xmax: 4.2, ymin: -1.3, ymax: 1.3, lf: 'f(x) = sin x', lg: 'g(x) = cos x',
         exact: '2√2 ≈ 2,828', calc: 'Schnittstellen π/4 und 5π/4; sin liegt oben: A = [−cos x − sin x] von π/4 bis 5π/4 = √2 + √2 = 2√2' }
  };
  function drawFlaeche() {
    const c = document.getElementById('ik-fl');
    if (!c) return;
    const D = FL[document.getElementById('ik-fl-sel').value];
    const S = plotSetup(c, D.xmin, D.xmax, D.ymin, D.ymax);
    fillSigned(S, D.f, D.g, D.xa, D.xb, 'rgba(56,189,248,0.42)', 'rgba(56,189,248,0.42)');
    drawCurve(S, D.f, D.xmin, D.xmax, '#0284c7', 2.6);
    drawCurve(S, D.g, D.xmin, D.xmax, '#f59e0b', 2.6);
    S.ctx.font = 'bold 12px system-ui'; S.ctx.textAlign = 'left';
    S.ctx.fillStyle = '#0284c7'; S.ctx.fillText(D.lf, S.P.l + 8, S.P.t + 12);
    S.ctx.fillStyle = '#d97706'; S.ctx.fillText(D.lg, S.P.l + 8, S.P.t + 28);
    const A = simpson(x => Math.abs(D.f(x) - D.g(x)), D.xa, D.xb, 4000);
    const I = simpson(x => D.f(x) - D.g(x), D.xa, D.xb, 4000);
    const out = document.getElementById('ik-fl-out');
    if (out) {
      out.innerHTML = 'Flächeninhalt A = <b>' + fmtN(A, 4) + '</b> (exakt ' + D.exact + ') &nbsp;·&nbsp; orientiertes Integral ∫(f − g) = <b>' + fmtN(I, 4) + '</b><br>' + D.calc;
    }
  }

  // ---------- Erklärungs-Abschnitte ----------
  const SECTIONS = [
    {
      id: 'sec1', title: '1 · Idee: Bestand aus Änderungsrate',
      html: String.raw`
<p>Eine <b>Änderungsrate</b> $f(t)$ sagt, wie schnell sich ein <b>Bestand</b> $B(t)$ ändert (z. B. Zufluss in m³/h, Wachstum in mm²/h). Den Bestand erhält man durch <b>Aufsummieren</b> aller kleinen Änderungen:</p>
$$B(t)=B(0)+\int_0^t f(s)\,ds$$
<ul>
  <li>Ist $f>0$ (Graph über der $t$-Achse), <b>wächst</b> der Bestand; ist $f<0$, <b>nimmt er ab</b>.</li>
  <li>Das Integral ist ein <b>orientierter Flächeninhalt</b>: Flächen über der Achse zählen positiv, Flächen darunter negativ.</li>
  <li><b>Einheit</b> des Integrals = Einheit von $f$ mal Einheit von $t$ (m³/h · h = m³).</li>
</ul>
<p><b>Näherung (Arbeitsheft S. 2):</b> Die Fläche unter dem Graphen durch Rechtecke ($b\cdot h$), Dreiecke ($\tfrac12 g\,h$) oder Trapeze ($\tfrac{a+c}{2}\,h$) ersetzen, die Beiträge mit Vorzeichen addieren.</p>
<div class="ik-box ok"><b>Beispiel:</b> Zuflussrate $f(t)=6-2t$ (m³/h), $0\le t\le 3$. Der Graph ist eine Gerade von $f(0)=6$ nach $f(3)=0$: Dreieck mit Grundseite 3 und Höhe 6, also $\tfrac12\cdot 3\cdot 6=9$. Der Bestand nimmt in 3 Stunden um <b>9 m³</b> zu.</div>`
    },
    {
      id: 'sec2', title: '2 · Ober- und Untersumme → das Integral',
      html: String.raw`
<p>Man teilt $[a;b]$ in $n$ gleich breite Streifen der Breite $\Delta x=\frac{b-a}{n}$. Die <b>Untersumme</b> $U_n$ nimmt in jedem Streifen den kleinsten, die <b>Obersumme</b> $O_n$ den größten Funktionswert als Rechteckhöhe:</p>
$$U_n=\sum_{i=1}^{n} m_i\,\Delta x\;\le\;\int_a^b f(x)\,dx\;\le\;\sum_{i=1}^{n} M_i\,\Delta x=O_n$$
<p>Für stetiges $f$ nähern sich $U_n$ und $O_n$ für $n\to\infty$ <b>demselben Wert</b>. Das ist das <b>bestimmte Integral</b>:</p>
$$\int_a^b f(x)\,dx=\lim_{n\to\infty}U_n=\lim_{n\to\infty}O_n$$
<p><b>Rechnung für $f(x)=x^2$ auf $[0;2]$</b> (Untersumme, $\Delta x=\tfrac2n$, linke Randwerte): $U_n=\frac{8}{n^3}\sum_{i=0}^{n-1}i^2=\frac43\cdot\frac{(n-1)(2n-1)}{n^2}\;\xrightarrow{\,n\to\infty\,}\;\frac{8}{3}$.</p>
<div class="ik-demo">
  <div class="ik-controls">
    <label>Funktion
      <select id="ik-riemann-f" onchange="ikDrawRiemann()">
        <option value="x2">x² auf [0; 2]</option>
        <option value="par">4 − x² auf [0; 2]</option>
        <option value="sin1">sin(x) + 1 auf [0; π]</option>
      </select></label>
    <label>Anzeige
      <select id="ik-riemann-mode" onchange="ikDrawRiemann()">
        <option value="both">Unter- und Obersumme</option>
        <option value="under">nur Untersumme</option>
        <option value="over">nur Obersumme</option>
      </select></label>
    <label>Streifen n = <b id="ik-riemann-nval">4</b>
      <input type="range" id="ik-riemann-n" min="1" max="60" value="4" oninput="ikDrawRiemann()"></label>
  </div>
  <canvas id="ik-riemann" width="640" height="300"></canvas>
  <div class="ik-readout" id="ik-riemann-out"></div>
</div>`
    },
    {
      id: 'sec3', title: '3 · Stammfunktion und Hauptsatz',
      html: String.raw`
<p>Eine <b>Stammfunktion</b> $F$ von $f$ ist eine Funktion mit $F'(x)=f(x)$. Sie ist nur bis auf eine <b>Konstante</b> eindeutig: Mit $F$ ist auch $F+c$ Stammfunktion (die Graphen sind in $y$-Richtung verschoben).</p>
<div class="ik-box"><b>Hauptsatz der Differential- und Integralrechnung:</b>
$$\int_a^b f(x)\,dx=F(b)-F(a)=\Bigl[F(x)\Bigr]_a^b\qquad\text{mit }F'=f$$
Die Konstante $c$ fällt beim Subtrahieren weg – beim bestimmten Integral braucht man kein $+c$.</div>
<p><b>Warum gilt das?</b> Die <b>Integralfunktion</b> $I_a(x)=\int_a^x f(t)\,dt$ misst die (orientierte) Fläche ab $a$. Wächst $x$ um ein kleines Stück $h$, kommt ein Streifen der Höhe $f(x)$ und der Breite $h$ hinzu. Die Fläche wächst also mit der „Geschwindigkeit“ $f(x)$:</p>
$$I_a'(x)=f(x)$$
<p>Damit ist $I_a$ eine Stammfunktion von $f$, und es gilt $\int_a^b f=I_a(b)=F(b)-F(a)$.</p>
<div class="ik-demo">
  <div class="ik-controls">
    <label>x = <b id="ik-hs-xval">−3</b>
      <input type="range" id="ik-hs-x" min="-3" max="3.4" step="0.05" value="-1" oninput="ikDrawHauptsatz()"></label>
  </div>
  <div class="ik-pair">
    <canvas id="ik-hs-f" width="440" height="300"></canvas>
    <canvas id="ik-hs-I" width="440" height="300"></canvas>
  </div>
  <div class="ik-readout" id="ik-hs-out"></div>
</div>`
    },
    {
      id: 'sec4', title: '4 · Stammfunktionen finden (Regeln & Formeln)',
      html: String.raw`
<table class="ik-table">
  <tr><th>$f(x)$</th><th>Stammfunktion $F(x)$</th><th>Hinweis</th></tr>
  <tr><td>$x^n$ ($n\neq-1$)</td><td>$\dfrac{1}{n+1}x^{n+1}$</td><td>Exponent +1, durch den neuen Exponenten teilen; gilt auch für negative und gebrochene $n$</td></tr>
  <tr><td>$\dfrac1x$</td><td>$\ln|x|$</td><td>Der Sonderfall $n=-1$</td></tr>
  <tr><td>$\sqrt{x}=x^{1/2}$</td><td>$\tfrac23x^{3/2}$</td><td>Wurzeln erst als Potenz schreiben</td></tr>
  <tr><td>$\dfrac1{x^n}=x^{-n}$</td><td>$\dfrac{x^{-n+1}}{-n+1}$</td><td>Brüche mit $x$ im Nenner umschreiben</td></tr>
  <tr><td>$e^x$</td><td>$e^x$</td><td>Bleibt sich selbst treu</td></tr>
  <tr><td>$\sin(x)$</td><td>$-\cos(x)$</td><td>Vorzeichen beachten!</td></tr>
  <tr><td>$\cos(x)$</td><td>$\sin(x)$</td><td></td></tr>
  <tr><td>$k\cdot g(x)$</td><td>$k\cdot G(x)$</td><td><b>Faktorregel</b>: konstanter Faktor bleibt stehen</td></tr>
  <tr><td>$g(x)+h(x)$</td><td>$G(x)+H(x)$</td><td><b>Summenregel</b>: Summanden einzeln integrieren</td></tr>
  <tr><td>$f(ax+b)$</td><td>$\dfrac1a\,F(ax+b)$</td><td><b>Lineare Verkettung</b>, z. B. $e^{2x}\to\tfrac12e^{2x}$, $\cos(3x)\to\tfrac13\sin(3x)$</td></tr>
</table>
<ul>
  <li><b>Probe:</b> Stammfunktion ableiten – es muss wieder $f$ herauskommen.</li>
  <li><b>Stammfunktion durch einen Punkt:</b> allgemeines $F(x)+c$ aufstellen, Punkt $P(x_0|y_0)$ einsetzen, $c$ ausrechnen.</li>
  <li><b>Achtung:</b> Es gibt <u>keine</u> Produkt- oder Quotientenregel für Stammfunktionen: $\int f\cdot g\,dx\neq\int f\,dx\cdot\int g\,dx$. (Verfahren wie partielle Integration/Substitution kommen nur, wenn sie im Unterricht behandelt wurden.)</li>
</ul>
<div class="ik-box ok"><b>Beispiel:</b> $f(x)=6x^2-4x+e^{2x}$ hat die Stammfunktion $F(x)=2x^3-2x^2+\tfrac12e^{2x}+c$. Soll $F(0)=1$ gelten: $\tfrac12+c=1\Rightarrow c=\tfrac12$.</div>`
    },
    {
      id: 'sec5', title: '5 · Bestimmtes Integral berechnen & Rechenregeln',
      html: String.raw`
<ol>
  <li>Stammfunktion $F$ bestimmen (ohne $c$).</li>
  <li>Obere Grenze minus untere Grenze: $F(b)-F(a)$ – <b>Klammern setzen</b>, besonders bei negativen Werten.</li>
  <li>Teil A: exakten Wert angeben ($e^0=1$, $\ln 1=0$, $\sin\pi=0$, …); Teil B: Rechner (Integral-Befehl) nutzen und mit der Rechnung vergleichen.</li>
</ol>
<table class="ik-table">
  <tr><th>Regel</th><th>Formel</th></tr>
  <tr><td>Gleiche Grenzen</td><td>$\int_a^a f\,dx=0$</td></tr>
  <tr><td>Grenzen vertauschen</td><td>$\int_a^b f\,dx=-\int_b^a f\,dx$</td></tr>
  <tr><td>Zerlegen</td><td>$\int_a^b f\,dx=\int_a^c f\,dx+\int_c^b f\,dx$</td></tr>
  <tr><td>Linearität</td><td>$\int_a^b (k f+l g)\,dx=k\int_a^b f\,dx+l\int_a^b g\,dx$</td></tr>
  <tr><td>Symmetrie</td><td>$f$ gerade: $\int_{-a}^{a}f=2\int_0^a f$ &nbsp;|&nbsp; $f$ ungerade: $\int_{-a}^{a}f=0$</td></tr>
  <tr><td>Monotonie</td><td>$f\le g$ auf $[a;b]$ $\Rightarrow$ $\int_a^b f\le\int_a^b g$</td></tr>
</table>
<div class="ik-box ok"><b>Beispiel:</b> $\displaystyle\int_0^3 (x^2-2x)\,dx=\Bigl[\tfrac13x^3-x^2\Bigr]_0^3=(9-9)-0=0$. Das Integral ist 0, obwohl der Graph eine Fläche einschließt – oberhalb und unterhalb der Achse heben sich die Anteile auf. Deshalb im nächsten Abschnitt: <b>Integral ≠ Flächeninhalt</b>.</div>`
    },
    {
      id: 'sec6', title: '6 · Flächeninhalt: zur x-Achse und zwischen zwei Graphen',
      html: String.raw`
<p><b>Fläche zwischen Graph und $x$-Achse auf $[a;b]$:</b></p>
<ol>
  <li>Nullstellen von $f$ in $[a;b]$ bestimmen und das Intervall dort <b>zerlegen</b>.</li>
  <li>Auf jedem Teilintervall das Integral berechnen.</li>
  <li><b>Beträge</b> addieren: $A=\Bigl|\int_a^{x_1}f\Bigr|+\Bigl|\int_{x_1}^{b}f\Bigr|+\dots$</li>
</ol>
<p><b>Fläche zwischen zwei Graphen:</b> Schnittstellen $f(x)=g(x)$ bestimmen (sie sind die Grenzen), prüfen, welcher Graph <b>oben</b> liegt, dann</p>
$$A=\int_a^b\bigl(f(x)-g(x)\bigr)\,dx\qquad(f\text{ oben}),$$
<p>bei Wechsel der oberen Funktion wieder zerlegen. Teil B: Betrag unter dem Integral ($\int|f-g|$) mit dem Rechner möglich, aber Begründung nicht vergessen.</p>
<div class="ik-box"><b>Merke:</b> Integral = orientierte Fläche (kann 0 oder negativ sein). Flächeninhalt = immer ≥ 0.</div>
<div class="ik-demo">
  <div class="ik-controls">
    <label>Beispiel
      <select id="ik-fl-sel" onchange="ikDrawFlaeche()">
        <option value="a">x² und 2x</option>
        <option value="b">x³ − x und die x-Achse</option>
        <option value="c">sin x und cos x</option>
      </select></label>
  </div>
  <canvas id="ik-fl" width="640" height="300"></canvas>
  <div class="ik-readout" id="ik-fl-out"></div>
</div>`
    },
    {
      id: 'sec7', title: '7 · Graph von f ↔ Graph von F (Abitur-Klassiker)',
      html: String.raw`
<p>Aus dem Graphen von $f$ lässt sich das Verhalten jeder Stammfunktion $F$ ablesen, weil $F'=f$ und $F''=f'$:</p>
<table class="ik-table">
  <tr><th>Graph von $f$</th><th>Folgerung für $F$</th></tr>
  <tr><td>$f(x)>0$</td><td>$F$ steigt</td></tr>
  <tr><td>$f(x)<0$</td><td>$F$ fällt</td></tr>
  <tr><td>Nullstelle von $f$ mit Vorzeichenwechsel $+\to-$</td><td>$F$ hat einen <b>Hochpunkt</b></td></tr>
  <tr><td>Nullstelle von $f$ mit Vorzeichenwechsel $-\to+$</td><td>$F$ hat einen <b>Tiefpunkt</b></td></tr>
  <tr><td>Extremstelle von $f$</td><td>$F$ hat eine <b>Wendestelle</b></td></tr>
  <tr><td>Nullstelle von $f$ <u>ohne</u> Vorzeichenwechsel</td><td>$F$ hat einen <b>Sattelpunkt</b> (Terrassenpunkt)</td></tr>
</table>
<ul>
  <li><b>Welcher abgebildete Graph ist Stammfunktion?</b> Auf Nullstellen/Vorzeichen von $f$ achten: Wo $f=0$, braucht $F$ eine waagerechte Tangente. Ein <b>Verschieben in $y$-Richtung</b> ändert nichts (anderes $c$).</li>
  <li>Hat die Stammfunktion in $x_0$ einen Wendepunkt, so hat $f$ dort ein Extremum – und umgekehrt (Abi-Begründung: $F''=f'$).</li>
  <li>Zur <b>Integralfunktion</b> $I_a$ gehört zusätzlich $I_a(a)=0$ (Graph schneidet bei $x=a$ die $x$-Achse).</li>
</ul>
<div class="ik-box ok"><b>Beispiel:</b> $f(x)=x^2-4$ hat Nullstellen $\pm2$. Bei $-2$ wechselt $f$ von $+$ nach $-$: Hochpunkt von $F$. Bei $2$ von $-$ nach $+$: Tiefpunkt. $f'(x)=2x$ hat bei 0 einen Vorzeichenwechsel: $F$ hat bei $x=0$ einen Wendepunkt.</div>`
    },
    {
      id: 'sec8', title: '8 · Anwendungen: Bestand, Gesamtänderung, Mittelwert',
      html: String.raw`
<ul>
  <li><b>Bestand zum Zeitpunkt $t$:</b> $B(t)=B(0)+\int_0^t f(s)\,ds$. Ist $F$ eine Stammfunktion von $f$: $B(t)=B(0)+F(t)-F(0)$.</li>
  <li><b>Gesamtänderung</b> in $[a;b]$ (mit Abfluss verrechnet): $\int_a^b f(t)\,dt$. <b>Gesamte zu- und abgeflossene Menge</b> (Beträge): $\int_a^b |f(t)|\,dt$.</li>
  <li><b>Maximaler Bestand:</b> dort, wo $f$ (die Änderungsrate) das Vorzeichen von $+$ nach $-$ wechselt; Randwerte prüfen.</li>
  <li><b>Mittlerer Wert</b> (Durchschnitt) von $f$ auf $[a;b]$: $\ \bar f=\dfrac{1}{b-a}\displaystyle\int_a^b f(x)\,dx$. Beispiel: $f(x)=x^2$ auf $[0;3]$: $\frac13\cdot9=3$.</li>
  <li><b>Langfristiges Verhalten:</b> Geht $F(t)$ für $t\to\infty$ gegen einen Grenzwert, ist die insgesamt zugeflossene Menge endlich (z. B. bei $e^{-kt}$-Anteilen).</li>
  <li><b>Sachsatz formulieren:</b> Ergebnis immer mit Einheit und Bedeutung im Kontext angeben („Nach 2 Stunden befinden sich 13 m³ im Behälter.“).</li>
</ul>`
    },
    {
      id: 'sec9', title: '9 · Typische Fehler & Prüfungs-Check',
      html: String.raw`
<table class="ik-table">
  <tr><th>Fehler</th><th>Richtig</th></tr>
  <tr><td>Beim bestimmten Integral $+c$ mitschleppen</td><td>$c$ fällt bei $F(b)-F(a)$ weg</td></tr>
  <tr><td>Integral mit Flächeninhalt gleichsetzen</td><td>An Nullstellen zerlegen, Beträge addieren</td></tr>
  <tr><td>$\int x^{-1}dx=x^0/0$</td><td>$\int \tfrac1x dx=\ln|x|$</td></tr>
  <tr><td>$\int\sin x\,dx=\cos x$</td><td>$-\cos x$</td></tr>
  <tr><td>Vergessen: $\int e^{2x}dx=\tfrac12e^{2x}$</td><td>Faktor $\tfrac1a$ bei linearer Verkettung</td></tr>
  <tr><td>Vorzeichenfehler bei $F(b)-F(a)$ mit negativem $F(a)$</td><td>Klammern: $F(b)-(F(a))$</td></tr>
  <tr><td>Obere/untere Funktion verwechselt</td><td>Skizze/Testwert: größerer Funktionswert liegt oben</td></tr>
  <tr><td>Ergebnis ohne Einheit/Kontext</td><td>Antwortsatz mit Einheit</td></tr>
</table>
<div class="ik-box ok"><b>Prüfungs-Check:</b>
<ul>
  <li><b>Teil A (ohne Hilfsmittel):</b> exakte Werte, kurze begründete Schritte, 5 BE ≈ 5–8 Minuten.</li>
  <li><b>Teil B (GTR/CAS):</b> Modellierung, Rechnerergebnis mit Ansatz notieren (z. B. $\int_0^4 r(t)\,dt\approx 95{,}04$), Ergebnisse interpretieren.</li>
  <li>Operatoren beachten: <i>Zeigen/Nachweisen</i> (alle Schritte), <i>Berechnen</i> (Ansatz + Ergebnis), <i>Begründen/Beurteilen</i> (Argument in Worten).</li>
</ul></div>`
    }
  ];

  // ---------- Aufgaben (Teil A und Teil B) ----------
  // part: { id, label, text, be, nums:[{label, ans, tol}], sol }
  const TASKS_A = [
    {
      id: 'A1', sec: 'sec4', title: 'Stammfunktion und Integral', afb: 'I–II', ops: 'Bestimmen, Berechnen',
      intro: String.raw`Gegeben ist die Funktion $f$ mit $f(x)=6x^2-4x+e^{2x}$.`,
      parts: [
        { id: 'A1a', label: 'a)', be: 3, text: String.raw`Bestimmen Sie die Stammfunktion $F$ von $f$ mit $F(0)=1$.`,
          sol: String.raw`<p>$F(x)=2x^3-2x^2+\tfrac12e^{2x}+c$ &nbsp;(Potenzregel, Summenregel, lineare Verkettung).</p><p>$F(0)=\tfrac12+c=1\;\Rightarrow\;c=\tfrac12$, also $F(x)=2x^3-2x^2+\tfrac12e^{2x}+\tfrac12$.</p>
          <ul><li>Potenzterme richtig integriert (1 BE)</li><li>$e^{2x}\to\tfrac12e^{2x}$ (1 BE)</li><li>$c$ aus $F(0)=1$ bestimmt (1 BE)</li></ul>` },
        { id: 'A1b', label: 'b)', be: 2, text: String.raw`Berechnen Sie $\displaystyle\int_0^{\ln 2}e^{2x}\,dx$ (exakter Wert).`,
          nums: [{ label: 'Wert', ans: 1.5, tol: 0.01 }],
          sol: String.raw`<p>$\displaystyle\int_0^{\ln 2}e^{2x}dx=\Bigl[\tfrac12e^{2x}\Bigr]_0^{\ln2}=\tfrac12\bigl(e^{2\ln2}-e^0\bigr)=\tfrac12(4-1)=\tfrac32$.</p>
          <ul><li>Stammfunktion (1 BE)</li><li>Einsetzen mit $e^{2\ln2}=4$, Ergebnis $\tfrac32$ (1 BE)</li></ul>` }
      ]
    },
    {
      id: 'A2', sec: 'sec7', title: 'Graph von f und Stammfunktion F', afb: 'II–III', ops: 'Bestimmen, Zeigen, Begründen',
      intro: String.raw`Gegeben ist $f(x)=x^2-4$. Die Funktion $F$ ist die Stammfunktion von $f$ mit $F(0)=3$.`,
      parts: [
        { id: 'A2a', label: 'a)', be: 3, text: String.raw`Bestimmen Sie die Extremstellen von $F$ und entscheiden Sie jeweils, ob ein Hoch- oder Tiefpunkt vorliegt – <b>ohne</b> $F$ explizit zu berechnen.`,
          sol: String.raw`<p>$F'(x)=f(x)=0\Rightarrow x=\pm2$.</p><p>$f$ ist eine nach oben geöffnete Parabel: Bei $x=-2$ wechselt $f$ von $+$ nach $-$ ⇒ <b>Hochpunkt</b> von $F$. Bei $x=2$ wechselt $f$ von $-$ nach $+$ ⇒ <b>Tiefpunkt</b> von $F$.</p>
          <ul><li>Nullstellen von $f$ als notwendige Bedingung für $F'$ (1 BE)</li><li>Hochpunkt bei $x=-2$ mit Vorzeichenwechsel (1 BE)</li><li>Tiefpunkt bei $x=2$ (1 BE)</li></ul>` },
        { id: 'A2b', label: 'b)', be: 2, text: String.raw`Zeigen Sie, dass der Graph von $F$ im Punkt $(0|3)$ einen Wendepunkt besitzt.`,
          sol: String.raw`<p>$F''(x)=f'(x)=2x$. Es gilt $F''(0)=0$, und $F''$ wechselt bei $0$ von $-$ nach $+$ ⇒ Wendestelle $x=0$. Wegen $F(0)=3$ liegt der Wendepunkt bei $(0|3)$.</p>
          <ul><li>$F''=f'$ und $F''(0)=0$ (1 BE)</li><li>Vorzeichenwechsel/Funktionswert $F(0)=3$ (1 BE)</li></ul>` }
      ]
    },
    {
      id: 'A3', sec: 'sec6', title: 'Integral ≠ Flächeninhalt', afb: 'II', ops: 'Berechnen, Bestimmen',
      intro: String.raw`Gegeben ist $f(x)=x^2-2x$ auf dem Intervall $[0;3]$.`,
      parts: [
        { id: 'A3a', label: 'a)', be: 2, text: String.raw`Berechnen Sie $\displaystyle\int_0^3 f(x)\,dx$.`,
          nums: [{ label: 'Wert', ans: 0, tol: 0.01 }],
          sol: String.raw`<p>$\displaystyle\int_0^3(x^2-2x)\,dx=\Bigl[\tfrac13x^3-x^2\Bigr]_0^3=(9-9)-0=0$.</p><ul><li>Stammfunktion (1 BE)</li><li>Ergebnis 0 (1 BE)</li></ul>` },
        { id: 'A3b', label: 'b)', be: 3, text: String.raw`Bestimmen Sie den <b>Flächeninhalt</b> der Fläche, die der Graph von $f$ im Intervall $[0;3]$ mit der $x$-Achse einschließt.`,
          nums: [{ label: 'Inhalt', ans: 8 / 3, tol: 0.02 }],
          sol: String.raw`<p>Nullstellen: $x=0$ und $x=2$. Zerlegen:</p><p>$\displaystyle\int_0^2 f\,dx=\Bigl[\tfrac13x^3-x^2\Bigr]_0^2=\tfrac83-4=-\tfrac43$, &nbsp;$\displaystyle\int_2^3 f\,dx=0-\bigl(-\tfrac43\bigr)=\tfrac43$.</p><p>$A=\bigl|-\tfrac43\bigr|+\tfrac43=\tfrac83\approx2{,}67$.</p>
          <ul><li>Nullstelle $x=2$ im Intervall erkannt, zerlegt (1 BE)</li><li>beide Teilintegrale (1 BE)</li><li>Beträge addiert: $\tfrac83$ (1 BE)</li></ul>` }
      ]
    },
    {
      id: 'A4', sec: 'sec6', title: 'Fläche zwischen zwei Graphen', afb: 'II', ops: 'Berechnen',
      intro: String.raw`Die Graphen der Funktionen $f(x)=x^2$ und $g(x)=2x$ schließen eine Fläche ein.`,
      parts: [
        { id: 'A4a', label: '', be: 5, text: String.raw`Berechnen Sie den Inhalt dieser Fläche.`,
          nums: [{ label: 'Inhalt', ans: 4 / 3, tol: 0.02 }],
          sol: String.raw`<p>Schnittstellen: $x^2=2x\Rightarrow x=0$ oder $x=2$. Auf $[0;2]$ liegt $g$ oberhalb von $f$ (z. B. $x=1$: $g=2>f=1$).</p>
          <p>$A=\displaystyle\int_0^2(2x-x^2)\,dx=\Bigl[x^2-\tfrac13x^3\Bigr]_0^2=4-\tfrac83=\tfrac43$.</p>
          <ul><li>Schnittstellen (1 BE)</li><li>obere Funktion bestimmt/begründet (1 BE)</li><li>Integral angesetzt (1 BE)</li><li>Stammfunktion (1 BE)</li><li>Ergebnis $\tfrac43$ (1 BE)</li></ul>` }
      ]
    },
    {
      id: 'A5', sec: 'sec3', title: 'Integralfunktion', afb: 'II', ops: 'Angeben, Bestimmen',
      intro: String.raw`Für $x>0$ ist die Integralfunktion $I(x)=\displaystyle\int_1^x\Bigl(2t+\frac1t\Bigr)\,dt$ gegeben.`,
      parts: [
        { id: 'A5a', label: 'a)', be: 2, text: String.raw`Geben Sie $I(1)$ und $I'(2)$ an.`,
          sol: String.raw`<p>$I(1)=\int_1^1\dots=0$. Nach dem Hauptsatz gilt $I'(x)=2x+\frac1x$, also $I'(2)=4+\tfrac12=\tfrac92$.</p><ul><li>$I(1)=0$ (1 BE)</li><li>$I'(2)=\tfrac92$ (1 BE)</li></ul>` },
        { id: 'A5b', label: 'b)', be: 3, text: String.raw`Bestimmen Sie einen Term für $I(x)$ ohne Integral.`,
          sol: String.raw`<p>$I(x)=\Bigl[t^2+\ln t\Bigr]_1^x=(x^2+\ln x)-(1+0)=x^2+\ln x-1$.</p><p>Probe: $I(1)=1+0-1=0$ ✓.</p><ul><li>Stammfunktion $t^2+\ln t$ (2 BE)</li><li>Einsetzen der Grenzen (1 BE)</li></ul>` }
      ]
    },
    {
      id: 'A6', sec: 'sec8', title: 'Bestand und Änderungsrate', afb: 'II–III', ops: 'Berechnen, Bestimmen, Begründen',
      intro: String.raw`In einem Behälter befinden sich zu Beginn ($t=0$) 5 m³ Wasser. Die Zuflussrate (in m³/h, negativ = Abfluss) wird für $0\le t\le6$ durch $f(t)=6-2t$ beschrieben ($t$ in Stunden).`,
      parts: [
        { id: 'A6a', label: 'a)', be: 2, text: String.raw`Berechnen Sie die Wassermenge im Behälter nach 2 Stunden.`,
          nums: [{ label: 'm³', ans: 13, tol: 0.05 }],
          sol: String.raw`<p>$B(2)=5+\displaystyle\int_0^2(6-2t)\,dt=5+\bigl[6t-t^2\bigr]_0^2=5+8=13$. Nach 2 Stunden befinden sich <b>13 m³</b> im Behälter.</p><ul><li>Ansatz $B(2)=5+\int$ (1 BE)</li><li>Ergebnis mit Einheit (1 BE)</li></ul>` },
        { id: 'A6b', label: 'b)', be: 3, text: String.raw`Bestimmen Sie den Zeitpunkt, zu dem die Wassermenge im Behälter maximal ist, und geben Sie diese Menge an. Begründen Sie Ihre Antwort.`,
          sol: String.raw`<p>$f(t)=0\Rightarrow t=3$; $f$ wechselt dort von $+$ nach $-$: Der Bestand steigt davor, fällt danach ⇒ Maximum bei $t=3$ (Randwert $B(6)=5$ ist kleiner).</p><p>$B(3)=5+\bigl[6t-t^2\bigr]_0^3=5+9=14$. Maximal sind <b>14 m³</b> nach <b>3 Stunden</b> im Behälter.</p>
          <ul><li>$f(t)=0$ und Vorzeichenwechsel $+\to-$ (1 BE)</li><li>Wert $B(3)=14$ (1 BE)</li><li>Randwerte/Begründung des Maximums (1 BE)</li></ul>` }
      ]
    },
    {
      id: 'A7', sec: 'sec5', title: 'Aussagen beurteilen', afb: 'III', ops: 'Beurteilen, Begründen',
      intro: String.raw`Beurteilen Sie, ob die folgenden Aussagen wahr oder falsch sind. Begründen Sie jeweils.`,
      parts: [
        { id: 'A7a', label: 'a)', be: 2, text: String.raw`Ist $f$ stetig auf $[a;b]$ und gilt $\displaystyle\int_a^b f(x)\,dx=0$, so ist $f(x)=0$ für alle $x\in[a;b]$.`,
          sol: String.raw`<p><b>Falsch.</b> Gegenbeispiel: $f(x)=x$ auf $[-1;1]$: $\int_{-1}^1x\,dx=\bigl[\tfrac12x^2\bigr]_{-1}^{1}=0$, aber $f\neq0$. (Flächenanteile oberhalb und unterhalb der Achse heben sich auf.)</p><ul><li>Aussage falsch (1 BE)</li><li>tragfähiges Gegenbeispiel (1 BE)</li></ul>` },
        { id: 'A7b', label: 'b)', be: 3, text: String.raw`Ist $f$ gerade (d. h. $f(-x)=f(x)$), so gilt $\displaystyle\int_{-a}^{a}f(x)\,dx=2\int_0^a f(x)\,dx$ für $a>0$.`,
          sol: String.raw`<p><b>Wahr.</b> Der Graph einer geraden Funktion ist symmetrisch zur $y$-Achse. Die orientierte Fläche über $[-a;0]$ ist deshalb gleich der über $[0;a]$. Mit der Zerlegung $\int_{-a}^{a}=\int_{-a}^{0}+\int_0^a$ folgt die Behauptung.</p>
          <p>Alternativ rechnerisch: Mit einer Stammfunktion $F$ von $f$ ist $F(x)-F(0)$ ungerade, daher $\int_{-a}^{0}f=F(0)-F(-a)=F(a)-F(0)=\int_0^a f$.</p>
          <ul><li>Aussage wahr (1 BE)</li><li>Symmetrie-Argument (1 BE)</li><li>Zerlegung des Integrals (1 BE)</li></ul>` }
      ]
    }
  ];

  const TASKS_B = [
    {
      id: 'B1', sec: 'sec8', title: 'Regenrückhaltebecken (Anwendungsaufgabe mit Rechner)', afb: 'II–III', ops: 'Zeigen, Berechnen, Beurteilen',
      intro: String.raw`<b>Hilfsmittel: GTR/CAS und Formelsammlung.</b><br>
Bei einem Regenereignis fließt Wasser in ein Rückhaltebecken. Die Zuflussrate (in m³/h) wird für $0\le t\le12$ ($t$ in Stunden seit Regenbeginn) beschrieben durch
$$r(t)=40\,t\,e^{-0{,}5t}.$$
Zu Beginn sind bereits 100 m³ im Becken, Wasser fließt nur zu (kein Abfluss). Das Becken fasst höchstens 250 m³.`,
      parts: [
        { id: 'B1a', label: 'a)', be: 4, text: String.raw`Zeigen Sie, dass die Zuflussrate zum Zeitpunkt $t=2$ maximal ist, und geben Sie den maximalen Wert an.`,
          nums: [{ label: 'max. Rate (m³/h)', ans: 29.43, tol: 0.05 }],
          sol: String.raw`<p>Produktregel: $r'(t)=40e^{-0{,}5t}+40t\cdot(-0{,}5)e^{-0{,}5t}=40e^{-0{,}5t}\,(1-0{,}5t)$.</p><p>$r'(t)=0\Rightarrow t=2$ (denn $e^{-0{,}5t}>0$). Für $t<2$ ist $r'>0$, für $t>2$ ist $r'<0$ ⇒ Hochpunkt (Maximum). $r(2)=80\,e^{-1}\approx29{,}43$ m³/h.</p>
          <ul><li>$r'$ mit Produktregel (2 BE)</li><li>$r'=0$ und Vorzeichenwechsel (1 BE)</li><li>$r(2)\approx29{,}43$ (1 BE)</li></ul>` },
        { id: 'B1b', label: 'b)', be: 3, text: String.raw`Berechnen Sie, wie viel Wasser in den ersten 4 Stunden zufließt.`,
          nums: [{ label: 'm³', ans: 95.04, tol: 0.1 }],
          sol: String.raw`<p>$\displaystyle\int_0^4 r(t)\,dt\approx95{,}04$ (Rechner). In den ersten 4 Stunden fließen etwa <b>95 m³</b> zu.</p><ul><li>Ansatz $\int_0^4 r(t)dt$ (1 BE)</li><li>Rechnerergebnis 95,04 (1 BE)</li><li>Antwortsatz mit Einheit (1 BE)</li></ul>` },
        { id: 'B1c', label: 'c)', be: 4, text: String.raw`Zeigen Sie, dass $F(t)=-80\,(t+2)\,e^{-0{,}5t}$ eine Stammfunktion von $r$ ist, und berechnen Sie damit den <b>exakten</b> Wert des Integrals aus b).`,
          sol: String.raw`<p>$F'(t)=-80e^{-0{,}5t}+(-80)(t+2)\cdot(-0{,}5)e^{-0{,}5t}=e^{-0{,}5t}\bigl(-80+40t+80\bigr)=40\,t\,e^{-0{,}5t}=r(t)$ ✓.</p>
          <p>$\displaystyle\int_0^4 r\,dt=F(4)-F(0)=-80\cdot6\,e^{-2}+160=160-480\,e^{-2}\approx95{,}04$.</p>
          <ul><li>Ableitung mit Produktregel (2 BE)</li><li>Gleichheit mit $r$ gezeigt (1 BE)</li><li>exakter Wert $160-480e^{-2}$ (1 BE)</li></ul>` },
        { id: 'B1d', label: 'd)', be: 5, text: String.raw`Geben Sie einen Term $B(t)$ für die Wassermenge im Becken an. Berechnen Sie $B(6)$ und den Zeitpunkt, zu dem erstmals 200 m³ im Becken sind.`,
          nums: [{ label: 'B(6) in m³', ans: 228.14, tol: 0.1 }, { label: 't in h', ans: 4.24, tol: 0.05 }],
          sol: String.raw`<p>$B(t)=100+\displaystyle\int_0^t r(s)\,ds=100+F(t)-F(0)=260-80\,(t+2)\,e^{-0{,}5t}$.</p><p>$B(6)=260-640\,e^{-3}\approx228{,}14$ m³.</p><p>$B(t)=200\Rightarrow(t+2)e^{-0{,}5t}=0{,}75$; Rechner (Gleichung lösen/Schnittpunkt): $t\approx4{,}24$ h.</p>
          <ul><li>Term $B(t)$ (2 BE)</li><li>$B(6)\approx228{,}14$ (1 BE)</li><li>Ansatz $B(t)=200$ (1 BE)</li><li>$t\approx4{,}24$ (1 BE)</li></ul>` },
        { id: 'B1e', label: 'e)', be: 6, text: String.raw`Beurteilen Sie, ob das Becken bei diesem Regenereignis überläuft. Bestimmen Sie gegebenenfalls den Zeitpunkt, ab dem die Kapazität von 250 m³ überschritten wird.`,
          nums: [{ label: 'Zeitpunkt in h', ans: 8.94, tol: 0.05 }],
          sol: String.raw`<p>Wegen $r(t)>0$ für $t>0$ steigt $B$ streng monoton. Für $t\to\infty$ gilt $(t+2)e^{-0{,}5t}\to0$, also $B(t)\to260$ m³ $>250$ m³ (und $B(12)\approx257{,}2$ m³ liegt schon im betrachteten Zeitraum über 250 m³).</p>
          <p>$B(t)=250\Rightarrow80(t+2)e^{-0{,}5t}=10\Rightarrow t\approx8{,}94$ h.</p>
          <p><b>Antwort:</b> Das Becken läuft ab etwa 8,9 Stunden nach Regenbeginn über, weil der Bestand gegen 260 m³ strebt und die Kapazität von 250 m³ überschreitet.</p>
          <ul><li>Monotonie von $B$ begründet (1 BE)</li><li>Grenzwert 260 m³ bzw. $B(12)>250$ (2 BE)</li><li>Zeitpunkt $t\approx8{,}94$ (2 BE)</li><li>Antwortsatz mit Bezug zur Kapazität (1 BE)</li></ul>` }
      ]
    }
  ];

  // ---------- Rendering ----------
  function taskMax(t) { return t.parts.reduce((s, p) => s + p.be, 0); }
  function taskScore(t, prog) { return t.parts.reduce((s, p) => s + (prog[p.id] || 0), 0); }

  function renderPart(t, p, prog) {
    const nums = (p.nums || []).map((n, i) =>
      '<span>' + escAttr(n.label) + ': <input class="integral-input ik-num" id="in-' + p.id + '-' + i + '" inputmode="decimal" placeholder="Zahl"></span>').join(' ');
    const check = p.nums ? '<button class="btn-sm" onclick="ikCheckNums(\'' + p.id + '\')">Prüfen</button> <span class="ik-fb" id="fb-' + p.id + '"></span>' : '';
    let scoreBtns = '';
    for (let i = 0; i <= p.be; i++) {
      scoreBtns += '<button class="' + (prog[p.id] === i ? 'on' : '') + '" onclick="ikSetScore(\'' + p.id + '\',' + i + ')">' + i + '</button>';
    }
    return '<div class="ik-part" id="part-' + p.id + '">' +
      '<div class="ik-part-head"><div>' + (p.label ? '<b>' + p.label + '</b> ' : '') + M(p.text) + '</div><div class="ik-be">' + p.be + ' BE</div></div>' +
      '<div class="ik-row">' + (nums ? nums + ' ' + check : '') + '</div>' +
      '<div class="ik-row"><textarea placeholder="Dein Lösungsweg (Stichpunkte reichen – auf Papier rechnen ist auch gut)"></textarea></div>' +
      '<div class="ik-row"><button class="btn-sm" onclick="ikToggleSol(\'' + p.id + '\')">Musterlösung &amp; Erwartungshorizont zeigen</button></div>' +
      '<div class="ik-sol" id="sol-' + p.id + '">' + M(p.sol) +
      '<div class="ik-score"><span>Ehrlich bewerten – erreichte BE:</span>' + scoreBtns + '</div></div>' +
      '</div>';
  }

  function renderTask(t, prog) {
    return '<div class="ik-task" id="task-' + t.id + '">' +
      '<h3>Aufgabe ' + t.id + ' · ' + escAttr(t.title) + '</h3>' +
      '<div class="ik-meta">' + taskMax(t) + ' BE · Anforderungsbereich ' + t.afb + ' · Operatoren: ' + t.ops +
      ' · <span id="tsum-' + t.id + '">' + taskScore(t, prog) + '/' + taskMax(t) + ' BE</span> · Wiederholen: <a href="#" onclick="ikGoSection(\'' + t.sec + '\');return false;">Abschnitt ' + t.sec.replace('sec', '') + '</a></div>' +
      '<div>' + M(t.intro) + '</div>' +
      t.parts.map(p => renderPart(t, p, prog)).join('') +
      '</div>';
  }

  function renderErklaerung() {
    const secs = SECTIONS.map((s, i) =>
      '<details class="ik-sec" id="' + s.id + '"' + (i === 0 ? ' open' : '') + '><summary>' + s.title + '</summary><div class="ik-body">' + M(s.html) + '</div></details>').join('');
    return '<div class="ik-card accent">' +
      '<p><b>So lernst du hier:</b> Erst die Abschnitte 1–9 durcharbeiten (die Demos zum Ausprobieren sind interaktiv), dann <b>Teil A</b> (ohne Hilfsmittel) und <b>Teil B</b> (mit Rechner) lösen, die Musterlösung <u>erst nach</u> eigenem Versuch öffnen und ehrlich Punkte vergeben. Unter „Auswertung“ siehst du Stärken und Schwächen und bekommst eine Fehlerliste.</p>' +
      '<p><b>Bezug zum Abitur (eA):</b> In den Aufgaben des Zentralabiturs Niedersachsen tauchen Integrale z. B. als kurze Teil-A-Aufgaben auf (Integral einer trigonometrischen Funktion, Stammfunktion aus dem Graphen erkennen, Aussagen über Flächen und Umkehrfunktionen beurteilen). Die Aufgaben hier sind <b>eigene Aufgaben im Abi-Stil</b> – Musterlösungen sind keine offiziellen Lösungsvorgaben des Landes Niedersachsen.</p>' +
      '<p style="color:var(--text-muted);font-size:0.8rem;">Stoffumfang: Standard-Oberstufe + Arbeitsheft S. 2/S. 4. Abgleich mit dem Unterricht/IServ folgt, sobald das Material aus IServ vorliegt.</p></div>' + secs;
  }
  function renderTeil(tasks, intro) {
    const prog = loadProgress();
    return '<div class="ik-card accent"><p>' + intro + '</p></div>' + tasks.map(t => renderTask(t, prog)).join('');
  }

  function renderAuswertung() {
    const prog = loadProgress();
    const groups = [['Teil A (ohne Hilfsmittel)', TASKS_A], ['Teil B (mit GTR/CAS)', TASKS_B]];
    let html = '<div class="ik-card accent"><p>Hier siehst du, was du erreicht hast. Aufgaben, die du noch nicht bewertet hast, zählen als 0 BE.</p></div>';
    let allMax = 0, allGot = 0;
    groups.forEach(([name, tasks]) => {
      let gm = 0, gg = 0;
      let rows = '';
      tasks.forEach(t => {
        const m = taskMax(t), g = taskScore(t, prog);
        gm += m; gg += g;
        const pct = Math.round(100 * g / m);
        rows += '<tr><td>' + t.id + ' · ' + escAttr(t.title) + '</td><td>' + g + '/' + m + '</td><td><div class="ik-bar"><span style="width:' + pct + '%"></span></div></td><td>' +
          (pct < 60 ? '<a href="#" onclick="ikGoSection(\'' + t.sec + '\');return false;">Abschnitt ' + t.sec.replace('sec', '') + ' wiederholen</a>' : '✓') + '</td></tr>';
      });
      allMax += gm; allGot += gg;
      html += '<div class="ik-card"><h3 style="margin:0 0 0.4rem">' + name + ' – ' + gg + ' / ' + gm + ' BE (' + Math.round(100 * gg / gm) + ' %)</h3><table class="ik-table"><tr><th>Aufgabe</th><th>BE</th><th>Stand</th><th>Tipp</th></tr>' + rows + '</table></div>';
    });
    html += '<div class="ik-card"><h3 style="margin:0 0 0.4rem">Gesamt: ' + allGot + ' / ' + allMax + ' BE (' + Math.round(100 * allGot / allMax) + ' %)</h3>' +
      '<p>Faustregel: ab etwa 60 % pro Aufgabe sitzt das Thema für die Klausur; darunter Abschnitt wiederholen und die Aufgabe nach 1–2 Tagen erneut lösen (Active Recall).</p></div>';

    // Fehlerliste im Format der fehlerliste.md
    const today = new Date().toISOString().slice(0, 10);
    const lines = [];
    groups.forEach(([name, tasks]) => tasks.forEach(t => t.parts.forEach(p => {
      if (prog[p.id] !== undefined && prog[p.id] < p.be) {
        lines.push('| ' + today + ' | Integralrechnung | ' + p.id + ' (' + t.title + ') – ' + prog[p.id] + '/' + p.be + ' BE | siehe Musterlösung im Portal, Abschnitt ' + t.sec.replace('sec', '') + ' | nein |');
      }
    })));
    html += '<div class="ik-card"><h3 style="margin:0 0 0.4rem">Fehlerliste (Markdown)</h3><p>Zeilen für Teilaufgaben mit Punktverlust. Kopiere sie in <code>Faecher/Mathe/04_Klausurvorbereitung/fehlerliste.md</code>.</p>' +
      '<textarea class="ik-export" id="ik-export" readonly>' + (lines.length ? lines.join('\n') : 'Noch keine Teilaufgabe mit Punktverlust bewertet.') + '</textarea>' +
      '<div class="ik-row"><button class="btn-sm" onclick="ikCopyExport()">Kopieren</button> <button class="btn-sm" onclick="ikResetProgress()">Fortschritt zurücksetzen</button> <span class="ik-fb" id="ik-export-fb"></span></div></div>';
    return html;
  }

  function renderRoot() {
    const root = document.getElementById('ik-root');
    if (!root) return;
    injectStyles();
    const tabs = [['erklaerung', '📘 Erklärung'], ['teilA', '✏️ Übung Teil A'], ['teilB', '🖩 Übung Teil B'], ['auswertung', '🏁 Auswertung']];
    const body =
      currentTab === 'erklaerung' ? renderErklaerung() :
      currentTab === 'teilA' ? renderTeil(TASKS_A, '<b>Teil A – ohne Hilfsmittel</b> (kein Taschenrechner, keine Formelsammlung). 35 BE, Richtwert 5 BE ≈ 5–8 Minuten. Erst eigenständig lösen, dann Musterlösung öffnen.') :
      currentTab === 'teilB' ? renderTeil(TASKS_B, '<b>Teil B – mit GTR/CAS und Formelsammlung.</b> Aufgabe im Stil der Analysis-Aufgaben (hier 22 BE). Rechnerergebnisse immer mit Ansatz und Antwortsatz notieren.') :
      renderAuswertung();
    root.innerHTML =
      '<div class="ik-wrap">' +
      '<h2 class="ik-title">∫ Integralrechnung komplett</h2>' +
      '<div class="ik-sub">Erklärung · interaktive Demos · Abi-Übungen mit Erwartungshorizont (Mathe eA, Klausur 06.11.)</div>' +
      '<div class="ik-tabs">' + tabs.map(([id, label]) =>
        '<button class="sub-tab-btn' + (id === currentTab ? ' active' : '') + '" onclick="ikSwitchTab(\'' + id + '\')">' + label + '</button>').join('') + '</div>' +
      body + '</div>';
    renderMath(root);
    if (currentTab === 'erklaerung') {
      drawRiemann(); drawHauptsatz(); drawFlaeche();
    }
  }

  // ---------- Öffentliche Handler (von onclick genutzt) ----------
  window.renderIntegralKurs = function () { renderRoot(); };
  window.ikSwitchTab = function (tab) { currentTab = tab; renderRoot(); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  window.ikDrawRiemann = drawRiemann;
  window.ikDrawHauptsatz = drawHauptsatz;
  window.ikDrawFlaeche = drawFlaeche;
  window.ikGoSection = function (id) {
    currentTab = 'erklaerung';
    renderRoot();
    const el = document.getElementById(id);
    if (el) { el.open = true; el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  };
  window.ikToggleSol = function (partId) {
    const el = document.getElementById('sol-' + partId);
    if (el) el.classList.toggle('open');
  };
  window.ikCheckNums = function (partId) {
    let part = null;
    [...TASKS_A, ...TASKS_B].forEach(t => t.parts.forEach(p => { if (p.id === partId) part = p; }));
    if (!part) return;
    const fb = document.getElementById('fb-' + partId);
    let ok = 0, filled = 0;
    part.nums.forEach((n, i) => {
      const raw = (document.getElementById('in-' + partId + '-' + i).value || '').trim().replace(',', '.');
      if (raw === '') return;
      filled++;
      const v = parseFloat(raw);
      if (isFinite(v) && Math.abs(v - n.ans) <= n.tol) ok++;
    });
    if (filled < part.nums.length) { fb.className = 'ik-fb no'; fb.textContent = 'Bitte alle Felder ausfüllen.'; return; }
    if (ok === part.nums.length) { fb.className = 'ik-fb ok'; fb.textContent = '✔ Ergebnis stimmt – prüfe trotzdem deinen Rechenweg an der Musterlösung.'; }
    else { fb.className = 'ik-fb no'; fb.textContent = '✘ Ergebnis stimmt noch nicht. Rechenweg prüfen oder die Musterlösung öffnen.'; }
  };
  window.ikSetScore = function (partId, val) {
    const prog = loadProgress();
    prog[partId] = val;
    saveProgress(prog);
    const partEl = document.getElementById('part-' + partId);
    if (partEl) partEl.querySelectorAll('.ik-score button').forEach((b, i) => b.classList.toggle('on', i === val));
    [...TASKS_A, ...TASKS_B].forEach(t => {
      if (t.parts.some(p => p.id === partId)) {
        const s = document.getElementById('tsum-' + t.id);
        if (s) s.textContent = taskScore(t, prog) + '/' + taskMax(t) + ' BE';
      }
    });
  };
  window.ikCopyExport = function () {
    const ta = document.getElementById('ik-export');
    const fb = document.getElementById('ik-export-fb');
    if (!ta) return;
    ta.select();
    let ok = false;
    try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
    if (fb) { fb.className = 'ik-fb ' + (ok ? 'ok' : 'no'); fb.textContent = ok ? 'Kopiert.' : 'Bitte mit Strg+C kopieren.'; }
  };
  window.ikResetProgress = function () {
    if (!confirm('Gesamten Integral-Fortschritt wirklich zurücksetzen?')) return;
    saveProgress({});
    renderRoot();
  };
})();
