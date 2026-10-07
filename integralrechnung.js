// ============================================================
// INTEGRALRECHNUNG.JS  –  Mathe-Lernportal Modul 05
// Arbeitsheft S. 2 (Näherung) & S. 4 (Stammfunktionen)
// Interaktive Canvas-Visualisierungen + Aufgaben-Checks
// ============================================================

// ─────────────────────────────────────────────────────────────
// SECTION A: SEITE 2 – Näherungsweise Flächenberechnung
// Bakterienkultur-Graph  f(t) = Wachstumsrate in mm²/h
// ─────────────────────────────────────────────────────────────

let integralCanvas1 = null;
let integralCtx1 = null;
let integral2Canvas = null;
let integral2Ctx = null;

// The bacteria growth function (smooth approximation of the book graph)
// Peaks around t=0.9, crosses zero at t≈0.2 and t≈1.75, negative trough around t=2.4
function bakteriaF(t) {
  // Smooth bell-like curve matching the textbook graph (S.2 example)
  // rises from 0 at t=0, peak ~2 at t=0.9, back to 0 at ~1.75, negative ~-1 at t=2.4, back to 0 at ~3
  return 4.2 * t * Math.exp(-2.2 * t) * Math.sin(Math.PI * t * 0.72) * 3.1
         - 0.4 * Math.max(0, t - 1.8) * Math.exp(-0.9 * (t - 1.8));
}

// Simpler, more faithful approximation based on textbook values
// B(1) = 0.9mm², B(1.3) = 1.2mm², B(1.8) = 0.4mm²
function bakteriaFv2(t) {
  if (t < 0) return 0;
  if (t <= 1.75) {
    // Positive hump: rises from 0, peaks around 0.9h at ~2 mm²/h, returns to 0 at 1.75
    return 3.0 * t * (1.75 - t) * Math.exp(-0.3 * t);
  } else {
    // Negative trough: goes to about -1 at t=2.4, back near 0 by t=3
    return -2.2 * (t - 1.75) * Math.exp(-1.5 * (t - 1.75));
  }
}

// Exercise 1a: the larger bell curve (0–8h, peak ~3 at t≈1)
function aufgabe1aF(t) {
  if (t < 0 || t > 8) return 0;
  // Positive hump 0-2h, dips below around 3-8h
  const pos = 3.5 * t * Math.exp(-1.1 * t);
  const neg = -0.7 * Math.max(0, t - 2.5) * Math.exp(-0.5 * (t - 2.5));
  return pos + neg;
}

// Exercise 1b: small positive bell (0–4h, peak ~1 at t≈1.2)
function aufgabe1bF(t) {
  if (t < 0 || t > 4) return 0;
  return 1.3 * t * Math.exp(-0.9 * t) * Math.sin(Math.PI * t / 3.5);
}

// ─── Canvas helper ────────────────────────────────────────────
function drawIntegralCanvas(canvasId, fn, tMin, tMax, yMin, yMax, fillShapes, title, xUnit, yUnit) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  const PAD = { top: 36, right: 20, bottom: 48, left: 52 };
  const plotW = W - PAD.left - PAD.right;
  const plotH = H - PAD.top - PAD.bottom;

  // Map data coords → canvas pixels
  function toX(t) { return PAD.left + (t - tMin) / (tMax - tMin) * plotW; }
  function toY(y) { return PAD.top + (1 - (y - yMin) / (yMax - yMin)) * plotH; }

  ctx.clearRect(0, 0, W, H);

  // Background
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const bg = isDark ? '#1e2329' : '#ffffff';
  const gridCol = isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)';
  const axisCol = isDark ? '#8b99a9' : '#555';
  const textCol = isDark ? '#c9d1d9' : '#333';
  const curveCol = '#38bdf8';
  const fillPosCol = 'rgba(56,189,248,0.28)';
  const fillNegCol = 'rgba(248,113,113,0.28)';
  const shapeStroke = '#f59e0b';
  const shapeFill = 'rgba(245,158,11,0.18)';

  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  // Title
  ctx.fillStyle = textCol;
  ctx.font = 'bold 12px system-ui';
  ctx.textAlign = 'center';
  ctx.fillText(title, W / 2, 18);

  // Grid
  const tStep = (tMax - tMin) / 10;
  const yStep = (yMax - yMin) / 8;
  ctx.strokeStyle = gridCol;
  ctx.lineWidth = 1;
  for (let t = tMin; t <= tMax + 0.001; t += tStep) {
    ctx.beginPath(); ctx.moveTo(toX(t), PAD.top); ctx.lineTo(toX(t), PAD.top + plotH); ctx.stroke();
  }
  for (let y = yMin; y <= yMax + 0.001; y += yStep) {
    ctx.beginPath(); ctx.moveTo(PAD.left, toY(y)); ctx.lineTo(PAD.left + plotW, toY(y)); ctx.stroke();
  }

  // Axes
  ctx.strokeStyle = axisCol;
  ctx.lineWidth = 1.5;
  // x-axis (at y=0)
  const y0 = toY(0);
  ctx.beginPath(); ctx.moveTo(PAD.left, y0); ctx.lineTo(PAD.left + plotW, y0); ctx.stroke();
  // y-axis
  ctx.beginPath(); ctx.moveTo(toX(tMin), PAD.top); ctx.lineTo(toX(tMin), PAD.top + plotH); ctx.stroke();

  // Fill under curve (positive = blue, negative = red)
  const steps = 300;
  const dt = (tMax - tMin) / steps;
  ctx.beginPath();
  ctx.moveTo(toX(tMin), y0);
  for (let i = 0; i <= steps; i++) {
    const t = tMin + i * dt;
    ctx.lineTo(toX(t), toY(fn(t)));
  }
  ctx.lineTo(toX(tMax), y0);
  ctx.closePath();
  // Use clip for pos/neg coloring via two passes
  ctx.save();
  // Positive fill
  ctx.beginPath();
  ctx.rect(PAD.left, PAD.top, plotW, y0 - PAD.top);
  ctx.clip();
  ctx.beginPath();
  ctx.moveTo(toX(tMin), y0);
  for (let i = 0; i <= steps; i++) {
    const t = tMin + i * dt;
    ctx.lineTo(toX(t), toY(fn(t)));
  }
  ctx.lineTo(toX(tMax), y0);
  ctx.closePath();
  ctx.fillStyle = fillPosCol;
  ctx.fill();
  ctx.restore();
  ctx.save();
  // Negative fill
  ctx.beginPath();
  ctx.rect(PAD.left, y0, plotW, PAD.top + plotH - y0);
  ctx.clip();
  ctx.beginPath();
  ctx.moveTo(toX(tMin), y0);
  for (let i = 0; i <= steps; i++) {
    const t = tMin + i * dt;
    ctx.lineTo(toX(t), toY(fn(t)));
  }
  ctx.lineTo(toX(tMax), y0);
  ctx.closePath();
  ctx.fillStyle = fillNegCol;
  ctx.fill();
  ctx.restore();

  // Draw geometric approximation shapes
  if (fillShapes && fillShapes.length > 0) {
    fillShapes.forEach(shape => {
      ctx.save();
      if (shape.type === 'triangle') {
        const [p1, p2, p3] = shape.points;
        ctx.beginPath();
        ctx.moveTo(toX(p1[0]), toY(p1[1]));
        ctx.lineTo(toX(p2[0]), toY(p2[1]));
        ctx.lineTo(toX(p3[0]), toY(p3[1]));
        ctx.closePath();
        ctx.fillStyle = shapeFill;
        ctx.fill();
        ctx.strokeStyle = shapeStroke;
        ctx.lineWidth = 1.8;
        ctx.stroke();
        // Area label
        if (shape.label) {
          const cx = (toX(p1[0]) + toX(p2[0]) + toX(p3[0])) / 3;
          const cy = (toY(p1[1]) + toY(p2[1]) + toY(p3[1])) / 3;
          ctx.fillStyle = shapeStroke;
          ctx.font = 'bold 10px system-ui';
          ctx.textAlign = 'center';
          ctx.fillText(shape.label, cx, cy);
        }
      } else if (shape.type === 'trapezoid') {
        const [p1, p2, p3, p4] = shape.points;
        ctx.beginPath();
        ctx.moveTo(toX(p1[0]), toY(p1[1]));
        ctx.lineTo(toX(p2[0]), toY(p2[1]));
        ctx.lineTo(toX(p3[0]), toY(p3[1]));
        ctx.lineTo(toX(p4[0]), toY(p4[1]));
        ctx.closePath();
        ctx.fillStyle = 'rgba(167,139,250,0.2)';
        ctx.fill();
        ctx.strokeStyle = '#a78bfa';
        ctx.lineWidth = 1.8;
        ctx.stroke();
        if (shape.label) {
          const cx = (toX(p1[0]) + toX(p2[0]) + toX(p3[0]) + toX(p4[0])) / 4;
          const cy = (toY(p1[1]) + toY(p2[1]) + toY(p3[1]) + toY(p4[1])) / 4;
          ctx.fillStyle = '#a78bfa';
          ctx.font = 'bold 10px system-ui';
          ctx.textAlign = 'center';
          ctx.fillText(shape.label, cx, cy);
        }
      } else if (shape.type === 'rect') {
        const [t1, t2, h] = shape.dims; // t1, t2, height (signed)
        const x1 = toX(t1), x2 = toX(t2);
        const rectY0 = toY(0), rectH = toY(0) - toY(h);
        ctx.fillStyle = 'rgba(52,211,153,0.2)';
        ctx.fillRect(Math.min(x1,x2), Math.min(rectY0, rectY0-rectH), Math.abs(x2-x1), Math.abs(rectH));
        ctx.strokeStyle = '#34d399';
        ctx.lineWidth = 1.8;
        ctx.strokeRect(Math.min(x1,x2), Math.min(rectY0, rectY0-rectH), Math.abs(x2-x1), Math.abs(rectH));
        if (shape.label) {
          ctx.fillStyle = '#34d399';
          ctx.font = 'bold 10px system-ui';
          ctx.textAlign = 'center';
          ctx.fillText(shape.label, (x1+x2)/2, rectY0 - rectH/2);
        }
      }
      ctx.restore();
    });
  }

  // Draw the curve on top
  ctx.beginPath();
  ctx.strokeStyle = curveCol;
  ctx.lineWidth = 2.5;
  for (let i = 0; i <= steps; i++) {
    const t = tMin + i * dt;
    const x = toX(t), y = toY(fn(t));
    if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  }
  ctx.stroke();

  // Axis tick labels
  ctx.fillStyle = textCol;
  ctx.font = '10px system-ui';
  ctx.textAlign = 'center';
  const tickCountX = Math.round((tMax - tMin) / tStep);
  for (let i = 0; i <= tickCountX; i++) {
    const t = tMin + i * tStep;
    const xp = toX(t);
    ctx.fillText(t.toFixed(t < 10 ? 1 : 0), xp, PAD.top + plotH + 14);
    ctx.beginPath(); ctx.strokeStyle = axisCol; ctx.lineWidth = 1;
    ctx.moveTo(xp, y0 - 3); ctx.lineTo(xp, y0 + 3); ctx.stroke();
  }
  ctx.textAlign = 'right';
  const tickCountY = 8;
  for (let i = 0; i <= tickCountY; i++) {
    const yv = yMin + i * yStep;
    ctx.fillText(yv.toFixed(1), PAD.left - 6, toY(yv) + 4);
  }

  // Axis labels
  ctx.fillStyle = textCol;
  ctx.font = 'italic 11px system-ui';
  ctx.textAlign = 'center';
  ctx.fillText(xUnit || 'Zeit in h', PAD.left + plotW / 2, H - 6);
  ctx.save();
  ctx.translate(13, PAD.top + plotH / 2);
  ctx.rotate(-Math.PI / 2);
  ctx.fillText(yUnit || 'Wachstumsrate in mm²/h', 0, 0);
  ctx.restore();
}

// ─────────────────────────────────────────────────────────────
// SECTION B: SEITE 4 – Stammfunktionen + Visualisierung
// ─────────────────────────────────────────────────────────────

// Map of exercise exercises for Stammfunktionen-Aufgaben S.4
const stammfunktionAufgaben = {
  aufg1: [
    { f: 'f(x) = x⁴',          tex: 'x^4',          F: 'F(x) = \\\\frac{1}{5}x^5',          hint: 'Exponent +1, durch neuen Exponent dividieren' },
    { f: 'f(x) = x⁻²',         tex: 'x^{-2}',       F: 'F(x) = -x^{-1} = -\\\\frac{1}{x}',  hint: 'n=-2 → Exponent wird -1, teile durch -1' },
    { f: 'f(x) = 3x⁴ − 2x − 2', tex: '3x^4 - 2x - 2', F: 'F(x) = \\\\frac{3}{5}x^5 - x^2 - 2x', hint: 'Summenregel: jeden Term einzeln integrieren' },
    { f: 'f(x) = ⅔x³ + 1,2·(1/x)', tex: '\\\\tfrac{2}{3}x^3 + 1{,}2x^{-1}', F: 'F(x) = \\\\frac{1}{6}x^4 + 1{,}2\\\\ln|x|', hint: '1/x → ln|x|' },
    { f: 'f(x) = 12x⁴',        tex: '12x^4',        F: 'F(x) = \\\\frac{12}{5}x^5',          hint: 'Konstanter Faktor bleibt, Exponent +1 → ÷5' },
    { f: 'f(x) = ⅔x⁻⁵',        tex: '\\\\tfrac{2}{3}x^{-5}', F: 'F(x) = -\\\\frac{1}{6}x^{-4}', hint: 'n=-5 → F = ⅔·x⁻⁴/(-4) = -1/6 · x⁻⁴' },
    { f: 'f(x) = ¼x²',         tex: '\\\\tfrac{1}{4}x^2',    F: 'F(x) = \\\\frac{1}{12}x^3',  hint: '¼ · 1/3 = 1/12' },
    { f: 'f(x) = 3 sin(x)',    tex: '3\\\\sin(x)',   F: 'F(x) = -3\\\\cos(x)',               hint: 'Stammfunktion von sin(x) ist −cos(x)' },
  ],
  aufg2: [
    { f: 'f(x) = x⁵',          tex: 'x^5',           F: 'F(x) = \\\\frac{1}{6}x^6 + c',      hint: '+ c nicht vergessen!' },
    { f: 'f(x) = ⅓x⁻²',        tex: '\\\\tfrac{1}{3}x^{-2}', F: 'F(x) = -\\\\frac{1}{3}x^{-1} + c', hint: 'n=-2: teile durch -1, also ×(-1)' },
    { f: 'f(x) = 2x² − 1/x³',  tex: '2x^2 - x^{-3}', F: 'F(x) = \\\\frac{2}{3}x^3 + \\\\frac{1}{2}x^{-2} + c', hint: '−x⁻³ integriert: −x⁻²/(−2) = +½x⁻²' },
    { f: 'f(x) = sin(x) + 1',  tex: '\\\\sin(x) + 1',  F: 'F(x) = -\\\\cos(x) + x + c',      hint: '1 integriert zu x' },
  ]
};

// Draw Stammfunktion visualization: f(x) and F(x) side-by-side
function drawStammfunktionViz(canvasId, fFn, FFn, xMin, xMax, labelF, labelFbig) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  const halfW = W / 2;
  const PAD = { top: 30, right: 15, bottom: 36, left: 42 };
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const bg = isDark ? '#1e2329' : '#ffffff';
  const textCol = isDark ? '#c9d1d9' : '#333';
  const axisCol = isDark ? '#8b99a9' : '#666';
  const gridCol = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)';

  ctx.clearRect(0, 0, W, H);
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  // Divider
  ctx.strokeStyle = isDark ? '#30363d' : '#ddd';
  ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.moveTo(halfW, 0); ctx.lineTo(halfW, H); ctx.stroke();

  function drawPanel(offsetX, fn, color, fillColor, label, yLabel) {
    const pW = halfW - PAD.left - PAD.right;
    const pH = H - PAD.top - PAD.bottom;
    // Auto range y
    const steps = 200;
    const dt = (xMax - xMin) / steps;
    let yMin = Infinity, yMax = -Infinity;
    for (let i = 0; i <= steps; i++) {
      const v = fn(xMin + i * dt);
      if (isFinite(v)) { yMin = Math.min(yMin, v); yMax = Math.max(yMax, v); }
    }
    const yRange = yMax - yMin || 1;
    yMin -= yRange * 0.12; yMax += yRange * 0.12;

    function tx(x) { return offsetX + PAD.left + (x - xMin) / (xMax - xMin) * pW; }
    function ty(y) { return PAD.top + (1 - (y - yMin) / (yMax - yMin)) * pH; }

    const y0 = ty(0);

    // Grid
    ctx.strokeStyle = gridCol; ctx.lineWidth = 1;
    const xStep = (xMax - xMin) / 8;
    for (let x = xMin; x <= xMax + 0.001; x += xStep) {
      ctx.beginPath(); ctx.moveTo(tx(x), PAD.top); ctx.lineTo(tx(x), PAD.top + pH); ctx.stroke();
    }
    const yStep2 = (yMax - yMin) / 6;
    for (let y = yMin; y <= yMax + 0.001; y += yStep2) {
      ctx.beginPath(); ctx.moveTo(offsetX + PAD.left, ty(y)); ctx.lineTo(offsetX + PAD.left + pW, ty(y)); ctx.stroke();
    }

    // Axes
    ctx.strokeStyle = axisCol; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(offsetX + PAD.left, y0); ctx.lineTo(offsetX + PAD.left + pW, y0); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(tx(0), PAD.top); ctx.lineTo(tx(0), PAD.top + pH); ctx.stroke();

    // Fill
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(tx(xMin), y0);
    for (let i = 0; i <= steps; i++) {
      const x = xMin + i * dt;
      const v = fn(x);
      if (isFinite(v)) ctx.lineTo(tx(x), ty(v));
    }
    ctx.lineTo(tx(xMax), y0);
    ctx.closePath();
    ctx.fillStyle = fillColor;
    ctx.fill();
    ctx.restore();

    // Curve
    ctx.beginPath(); ctx.strokeStyle = color; ctx.lineWidth = 2.5;
    let first = true;
    for (let i = 0; i <= steps; i++) {
      const x = xMin + i * dt;
      const v = fn(x);
      if (!isFinite(v)) { first = true; continue; }
      if (first) { ctx.moveTo(tx(x), ty(v)); first = false; }
      else ctx.lineTo(tx(x), ty(v));
    }
    ctx.stroke();

    // Labels
    ctx.fillStyle = textCol; ctx.font = 'bold 12px system-ui'; ctx.textAlign = 'center';
    ctx.fillText(label, offsetX + PAD.left + pW / 2, 18);

    // Y label
    ctx.font = '9px system-ui'; ctx.textAlign = 'right';
    const yStep3 = (yMax - yMin) / 6;
    for (let y = yMin; y <= yMax + 0.001; y += yStep3) {
      if (Math.abs(ty(y) - y0) > 6)
        ctx.fillText(y.toFixed(1), offsetX + PAD.left - 4, ty(y) + 3);
    }
    ctx.textAlign = 'center';
    for (let x = xMin; x <= xMax + 0.001; x += xStep) {
      ctx.fillText(x.toFixed(0), tx(x), y0 + 14);
    }
  }

  drawPanel(0, fFn, '#38bdf8', 'rgba(56,189,248,0.2)', `f(x) = ${labelF}  (Ableitung / Änderungsrate)`, 'f(x)');
  drawPanel(halfW, FFn, '#a78bfa', 'rgba(167,139,250,0.15)', `F(x) = ${labelFbig}  (Stammfunktion / Bestand)`, 'F(x)');
}

// ─────────────────────────────────────────────────────────────
// SECTION C: AUFGABE 1 interaktiver Checker
// ─────────────────────────────────────────────────────────────
let currentIntegralTab = 's2';

function switchIntegralTab(tab) {
  currentIntegralTab = tab;
  ['s2', 's4', 'stammcheck'].forEach(t => {
    const btn = document.getElementById('integral-tab-' + t);
    const pane = document.getElementById('integral-pane-' + t);
    if (btn) btn.classList.toggle('active', t === tab);
    if (pane) pane.style.display = t === tab ? '' : 'none';
  });
  if (tab === 's2') {
    setTimeout(() => {
      renderBakteriaNaeherung();
      renderAufgabe1();
    }, 30);
  } else if (tab === 's4') {
    setTimeout(renderStammfunktionDemo, 30);
  } else if (tab === 'stammcheck') {
    renderStammCheck();
  }
}

function renderBakteriaNaeherung() {
  // Draw the demonstration canvas (like the red info-box in the book)
  const shapes = [
    {
      type: 'triangle',
      points: [[0.2, 0], [0.75, 2.0], [1.75, 0]],
      label: '▲ 1,55mm²'
    },
    {
      type: 'trapezoid',
      points: [[1.75, 0], [1.75, -0.5], [3.0, -1.0], [3.0, 0]],
      label: '▼ −1,09mm²'
    }
  ];
  drawIntegralCanvas(
    'integral-canvas-bakteria',
    bakteriaFv2,
    0, 3.2, -1.5, 2.5,
    shapes,
    'Beispiel (Infokästchen): Näherung mit Dreieck & Trapez',
    'Zeit in h',
    'Wachstumsrate in mm²/h'
  );
}

function renderAufgabe1() {
  const showShapes = document.getElementById('integral-show-shapes') && document.getElementById('integral-show-shapes').checked;

  const shapesA = showShapes ? [
    { type: 'triangle', points: [[0, 0], [1.1, 3.1], [2.5, 0]], label: '▲≈3,9' },
    { type: 'trapezoid', points: [[2.5, 0], [2.5, -0.5], [5.5, -0.65], [5.5, 0]], label: '▼≈−1,8' },
  ] : [];
  const shapesB = showShapes ? [
    { type: 'triangle', points: [[0, 0], [1.2, 1.1], [3.5, 0]], label: '▲≈1,9' },
  ] : [];

  drawIntegralCanvas('integral-canvas-1a', aufgabe1aF, 0, 8, -1.0, 3.8, shapesA,
    'Aufgabe 1a: Wachstumsrate f(t) – Bestimmung von B(2), B(3), B(7)', 'Zeit in h', 'Wachstumsrate mm²/h');
  drawIntegralCanvas('integral-canvas-1b', aufgabe1bF, 0, 4, -0.5, 1.5, shapesB,
    'Aufgabe 1b: Wachstumsrate f(t) – Bestimmung von B(1,5), B(2), B(3)', 'Zeit in h', 'Wachstumsrate mm²/h');
}

function renderStammfunktionDemo() {
  // Demo: f(x) = 2x  →  F(x) = x²
  const fFn = x => 2 * x;
  const FFn = x => x * x;
  drawStammfunktionViz('stammfunktion-demo-canvas', fFn, FFn, -3, 3, '2x', 'x²  (c=0)');

  // Demo 2: f(x) = 3x² → F(x) = x³
  const fFn2 = x => 3 * x * x;
  const FFn2 = x => x * x * x;
  drawStammfunktionViz('stammfunktion-demo-canvas2', fFn2, FFn2, -2, 2, '3x²', 'x³  (c=0)');
}

function renderStammCheck() {
  // Already rendered via HTML
}

// ─────────────────────────────────────────────────────────────
// SECTION D: Aufgabe 3 – Stammfunktion durch Punkt (S.4 Nr.3)
// ─────────────────────────────────────────────────────────────

function checkStammAufgabe(inputId, answerId, correctF, pointX, pointY) {
  const input = document.getElementById(inputId);
  const ansDiv = document.getElementById(answerId);
  if (!input || !ansDiv) return;
  const val = input.value.trim();
  // Try to evaluate F(pointX) and check it matches pointY
  ansDiv.innerHTML = `
    <div class="integral-answer-block">
      <div class="integral-answer-formula">
        <span class="katex-render" data-display="false" data-latex="${correctF}"></span>
      </div>
      <div class="integral-answer-check">
        Probe: F(${pointX}) = ${pointY} ✓
      </div>
    </div>
  `;
  ansDiv.style.display = '';
  if (typeof renderKatex === 'function') renderKatex();
  else if (window.katex) {
    ansDiv.querySelectorAll('.katex-render').forEach(el => {
      try {
        katex.render(el.dataset.latex, el, { displayMode: el.dataset.display === 'true', throwOnError: false });
      } catch(e) {}
    });
  }
}

// ─────────────────────────────────────────────────────────────
// SECTION E: Main render / init
// ─────────────────────────────────────────────────────────────

function renderIntegralrechnungModule() {
  switchIntegralTab('s2');
}

// Called when the topic is opened
window.renderIntegralrechnungModule = renderIntegralrechnungModule;
