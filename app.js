// Mathe-1 Interaktives Schul-Lernportal - Application Engine
// Mit: Feynman-Feedback-Engine, Notizen-Persistenz, Bruchrechnung, Gauß-Jordan (rref), Plotter & Quiz

// -------------------------------------------------------------
// 1. Exakte Bruch-Mathematik (Fraction Engine)
// -------------------------------------------------------------
class Fraction {
  constructor(n, d = 1) {
    if (d === 0) throw new Error("Division durch Null");
    if (typeof n === 'string') {
      if (n.includes('/')) {
        const parts = n.split('/');
        n = parseInt(parts[0], 10);
        d = parseInt(parts[1], 10);
      } else {
        const val = parseFloat(n);
        if (Number.isInteger(val)) {
          n = val;
          d = 1;
        } else {
          const len = (n.split('.')[1] || '').length;
          d = Math.pow(10, len);
          n = Math.round(val * d);
        }
      }
    }
    this.n = Math.round(n);
    this.d = Math.round(d);
    this.simplify();
  }

  static gcd(a, b) {
    a = Math.abs(a);
    b = Math.abs(b);
    while (b) {
      const t = b;
      b = a % b;
      a = t;
    }
    return a;
  }

  simplify() {
    if (this.d < 0) {
      this.n = -this.n;
      this.d = -this.d;
    }
    const common = Fraction.gcd(this.n, this.d);
    if (common > 1) {
      this.n /= common;
      this.d /= common;
    }
  }

  add(other) {
    other = Fraction.from(other);
    return new Fraction(this.n * other.d + other.n * this.d, this.d * other.d);
  }

  sub(other) {
    other = Fraction.from(other);
    return new Fraction(this.n * other.d - other.n * this.d, this.d * other.d);
  }

  mul(other) {
    other = Fraction.from(other);
    return new Fraction(this.n * other.n, this.d * other.d);
  }

  div(other) {
    other = Fraction.from(other);
    if (other.n === 0) throw new Error("Division durch Null");
    return new Fraction(this.n * other.d, this.d * other.n);
  }

  isZero() {
    return this.n === 0;
  }

  toNumber() {
    return this.n / this.d;
  }

  toString() {
    if (this.d === 1) return `${this.n}`;
    return `${this.n}/${this.d}`;
  }

  toTex() {
    if (this.d === 1) return `${this.n}`;
    if (this.n < 0) return `-\\frac{${Math.abs(this.n)}}{${this.d}}`;
    return `\\frac{${this.n}}{${this.d}}`;
  }

  static from(val) {
    if (val instanceof Fraction) return val;
    return new Fraction(val);
  }
}

// -------------------------------------------------------------
// 2. Matrix Solver (Gauß-Jordan / rref)
// -------------------------------------------------------------
function solveRref(matrixData) {
  const rows = matrixData.length;
  const cols = matrixData[0].length;
  const M = matrixData.map(r => r.map(c => Fraction.from(c)));

  let lead = 0;
  for (let r = 0; r < rows; r++) {
    if (lead >= cols - 1) break;
    let i = r;
    while (M[i][lead].isZero()) {
      i++;
      if (i === rows) {
        i = r;
        lead++;
        if (lead === cols - 1) break;
      }
    }
    if (lead >= cols - 1) break;

    if (i !== r) {
      const temp = M[i];
      M[i] = M[r];
      M[r] = temp;
    }

    const pivot = M[r][lead];
    if (!pivot.isZero()) {
      for (let j = 0; j < cols; j++) {
        M[r][j] = M[r][j].div(pivot);
      }
    }

    for (let k = 0; k < rows; k++) {
      if (k !== r) {
        const factor = M[k][lead];
        if (!factor.isZero()) {
          for (let j = 0; j < cols; j++) {
            M[k][j] = M[k][j].sub(factor.mul(M[r][j]));
          }
        }
      }
    }
    lead++;
  }

  let hasContradiction = false;
  let hasFreeVars = false;

  for (let r = 0; r < rows; r++) {
    let allZero = true;
    for (let c = 0; c < cols - 1; c++) {
      if (!M[r][c].isZero()) {
        allZero = false;
        break;
      }
    }
    if (allZero && !M[r][cols - 1].isZero()) {
      hasContradiction = true;
    }
    if (allZero && M[r][cols - 1].isZero()) {
      hasFreeVars = true;
    }
  }

  return { matrix: M, hasContradiction, hasFreeVars };
}

// -------------------------------------------------------------
// 3. Canvas Koordinatensystem & Funktionsplotter
// -------------------------------------------------------------
class FunctionPlotter {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');

    this.originX = this.canvas.width / 2;
    this.originY = this.canvas.height / 2;
    this.scale = 35;

    this.currentFunction = null;
    this.specialPoints = [];
    this.tangents = [];

    this.isDragging = false;
    this.lastMouseX = 0;
    this.lastMouseY = 0;

    this.initEvents();
    this.resizeCanvas();
    this.draw();
  }

  resizeCanvas() {
    const rect = this.canvas.parentElement.getBoundingClientRect();
    this.canvas.width = rect.width || 600;
    this.canvas.height = 420;
    this.originX = this.canvas.width / 2;
    this.originY = this.canvas.height / 2;
    this.draw();
  }

  initEvents() {
    window.addEventListener('resize', () => this.resizeCanvas());

    this.canvas.addEventListener('mousedown', (e) => {
      this.isDragging = true;
      this.lastMouseX = e.clientX;
      this.lastMouseY = e.clientY;
    });

    window.addEventListener('mousemove', (e) => {
      if (!this.isDragging) return;
      const dx = e.clientX - this.lastMouseX;
      const dy = e.clientY - this.lastMouseY;
      this.originX += dx;
      this.originY += dy;
      this.lastMouseX = e.clientX;
      this.lastMouseY = e.clientY;
      this.draw();
    });

    window.addEventListener('mouseup', () => {
      this.isDragging = false;
    });

    this.canvas.addEventListener('wheel', (e) => {
      e.preventDefault();
      const zoomFactor = e.deltaY < 0 ? 1.15 : 0.85;
      const newScale = Math.max(10, Math.min(250, this.scale * zoomFactor));

      const mouseX = e.offsetX;
      const mouseY = e.offsetY;

      this.originX = mouseX - (mouseX - this.originX) * (newScale / this.scale);
      this.originY = mouseY - (mouseY - this.originY) * (newScale / this.scale);
      this.scale = newScale;

      this.draw();
    }, { passive: false });
  }

  resetView() {
    this.originX = this.canvas.width / 2;
    this.originY = this.canvas.height / 2;
    this.scale = 35;
    this.draw();
  }

  zoomIn() {
    this.scale = Math.min(250, this.scale * 1.25);
    this.draw();
  }

  zoomOut() {
    this.scale = Math.max(10, this.scale * 0.8);
    this.draw();
  }

  setFunction(fn, specialPoints = [], tangents = []) {
    this.currentFunction = fn;
    this.specialPoints = specialPoints;
    this.tangents = tangents;
    this.draw();
  }

  toScreenX(mathX) { return this.originX + mathX * this.scale; }
  toScreenY(mathY) { return this.originY - mathY * this.scale; }
  toMathX(screenX) { return (screenX - this.originX) / this.scale; }
  toMathY(screenY) { return (this.originY - screenY) / this.scale; }

  draw() {
    const ctx = this.ctx;
    const w = this.canvas.width;
    const h = this.canvas.height;

    ctx.fillStyle = "#090e1a";
    ctx.fillRect(0, 0, w, h);

    const step = this.scale < 25 ? 2 : (this.scale > 80 ? 0.5 : 1);
    const startMathX = Math.floor(this.toMathX(0) / step) * step;
    const endMathX = Math.ceil(this.toMathX(w) / step) * step;
    const startMathY = Math.floor(this.toMathY(h) / step) * step;
    const endMathY = Math.ceil(this.toMathY(0) / step) * step;

    ctx.lineWidth = 1;
    ctx.strokeStyle = "#17233d";
    ctx.beginPath();
    for (let x = startMathX; x <= endMathX; x += step) {
      const sx = this.toScreenX(x);
      ctx.moveTo(sx, 0);
      ctx.lineTo(sx, h);
    }
    for (let y = startMathY; y <= endMathY; y += step) {
      const sy = this.toScreenY(y);
      ctx.moveTo(0, sy);
      ctx.lineTo(w, sy);
    }
    ctx.stroke();

    ctx.lineWidth = 1.5;
    ctx.strokeStyle = "#38bdf8";
    ctx.beginPath();
    ctx.moveTo(0, this.originY);
    ctx.lineTo(w, this.originY);
    ctx.moveTo(this.originX, 0);
    ctx.lineTo(this.originX, h);
    ctx.stroke();

    ctx.fillStyle = "#94a3b8";
    ctx.font = "11px Inter, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";

    for (let x = startMathX; x <= endMathX; x += step) {
      if (Math.abs(x) < 0.001) continue;
      const sx = this.toScreenX(x);
      ctx.fillText(Number(x.toFixed(2)), sx, Math.min(Math.max(10, this.originY + 5), h - 20));
    }

    ctx.textAlign = "right";
    ctx.textBaseline = "middle";
    for (let y = startMathY; y <= endMathY; y += step) {
      if (Math.abs(y) < 0.001) continue;
      const sy = this.toScreenY(y);
      ctx.fillText(Number(y.toFixed(2)), Math.min(Math.max(30, this.originX - 6), w - 10), sy);
    }

    ctx.fillText("0", this.originX - 6, this.originY + 12);

    for (const tan of this.tangents) {
      ctx.strokeStyle = tan.color || "#f59e0b";
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      const x1 = this.toMathX(0);
      const y1 = tan.m * x1 + tan.b;
      const x2 = this.toMathX(w);
      const y2 = tan.m * x2 + tan.b;
      ctx.moveTo(0, this.toScreenY(y1));
      ctx.lineTo(w, this.toScreenY(y2));
      ctx.stroke();
      ctx.setLineDash([]);
    }

    if (this.currentFunction) {
      ctx.lineWidth = 3;
      ctx.strokeStyle = "#60a5fa";
      ctx.beginPath();

      let isDrawing = false;
      for (let px = 0; px <= w; px += 2) {
        const mx = this.toMathX(px);
        try {
          const my = this.currentFunction(mx);
          if (isNaN(my) || !isFinite(my) || Math.abs(my) > 1000) {
            isDrawing = false;
            continue;
          }
          const py = this.toScreenY(my);
          if (!isDrawing) {
            ctx.moveTo(px, py);
            isDrawing = true;
          } else {
            ctx.lineTo(px, py);
          }
        } catch (e) {
          isDrawing = false;
        }
      }
      ctx.stroke();
    }

    for (const pt of this.specialPoints) {
      const sx = this.toScreenX(pt.x);
      const sy = this.toScreenY(pt.y);

      ctx.fillStyle = pt.color || "#f43f5e";
      ctx.beginPath();
      ctx.arc(sx, sy, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      if (pt.label) {
        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 12px Inter, sans-serif";
        ctx.textAlign = "left";
        ctx.textBaseline = "bottom";
        ctx.fillText(pt.label, sx + 8, sy - 6);
      }
    }
  }
}

// -------------------------------------------------------------
// 4. FEYNMAN EXPLANATION & FEEDBACK ENGINE
// -------------------------------------------------------------
const feynmanRubrics = {
  'vierschritt': {
    title: 'Das 4-Schritte-Verfahren bei Steckbriefaufgaben',
    criteria: [
      { id: 'c1', keywords: ['bedingung', 'eigenschaft', 'übersetz', 'text', 'f('], label: '1. Text in Bedingungen übersetzen (f(x), f\'(x), f\'\'(x))' },
      { id: 'c2', keywords: ['funktionstyp', 'grad', 'allgemein', 'symmetr', 'potenz', 'ax'], label: '2. Funktionstyp wählen (z.B. ax² + bx + c) & Symmetrien beachten' },
      { id: 'c3', keywords: ['lgs', 'gleichungssystem', 'einsetzen', 'ableitung'], label: '3. Ableitungen bilden & LGS aufstellen' },
      { id: 'c4', keywords: ['lös', 'matrix', 'rref', 'gauß', 'funktionsgleichung', 'einsetzen'], label: '4. LGS lösen und fertige Funktionsgleichung notieren' }
    ],
    tip: 'Merke dir: Schritt 1 (Übersetzen) -> Schritt 2 (Ansatz f(x)) -> Schritt 3 (LGS aufstellen) -> Schritt 4 (Lösen & Gleichung aufschreiben).'
  },
  'beruehren_vs_schneiden': {
    title: 'Unterschied zwischen Berühren und Schneiden der Achse',
    criteria: [
      { id: 'c1', keywords: ['berühr', 'f(', 'nullstelle', '=0'], label: 'Beide haben eine Nullstelle: f(x) = 0' },
      { id: 'c2', keywords: ['waagerecht', 'steigung', 'ableitung', 'f\'(', 'tangente', '=0'], label: 'Berühren erfordert ZUSÄTZLICH: f\'(x) = 0 (waagerechte Tangente)' },
      { id: 'c3', keywords: ['schneid', 'knick', 'ungleich', 'nicht 0'], label: 'Schneiden wechselt das Vorzeichen, dort ist die Steigung in der Regel ungleich 0' }
    ],
    tip: '„Schneiden“ = 1 Information: f(x)=0. „Berühren“ = 2 Informationen auf einmal: f(x)=0 UND f\'(x)=0 (Graph prallt an der Achse ab!).'
  },
  'loesungsfaelle': {
    title: 'Die 3 Lösungsfälle im LGS / Matrix (rref)',
    criteria: [
      { id: 'c1', keywords: ['eindeutig', 'eine lösung', 'diagonale', '1er', 'feste'], label: 'Fall 1: Genau eine Lösung (Diagonalmatrix mit Einsen, jede Variable hat festen Wert)' },
      { id: 'c2', keywords: ['keine lösung', 'widerspruch', '0=1', '[0 0 0 1]'], label: 'Fall 2: Keine Lösung (Widerspruchszeile 0 = 1)' },
      { id: 'c3', keywords: ['unendlich', 'schar', 'funktionsschar', 'parameter', '0=0', 'nullzeile', '[0 0 0 0]'], label: 'Fall 3: Unendlich viele Lösungen (Nullzeile 0 = 0 -> freier Parameter d erzeugt Funktionsschar f_d(x))' }
    ],
    tip: 'Merke: Diagonale = 1 Lösung | [0 0 0 | 1] = Widerspruch (keine Lösung) | [0 0 0 | 0] = Schar (unendlich viele Lösungen mit Parameter d).'
  },
  'trassierung': {
    title: 'Die 3 Stufen der Trassierung (Übergangsbedingungen)',
    criteria: [
      { id: 'c1', keywords: ['sprungfrei', 'stetig', 'gleiche höhe', 'loch', 'lücke', 'g1(x1) = f(x1)'], label: 'Sprungfreiheit (Stetigkeit): Gleiche Position g(x)=f(x), kein Loch' },
      { id: 'c2', keywords: ['knickfrei', 'differenzier', 'gleiche steigung', 'tangente', 'g\'(x1) = f\'(x1)'], label: 'Knickfreiheit (Differenzierbarkeit): Gleiche Steigung g\'(x)=f\'(x), glatter Übergang' },
      { id: 'c3', keywords: ['krümmungsruck', 'ruckfrei', 'krümmung', '2. ableitung', 'zweite ableitung', 'fliehkraft', 'g\'\'(x1) = f\'\'(x1)'], label: 'Krümmungsruckfreiheit: Gleiche Krümmung g\'\'(x)=f\'\'(x), kein Ruck / Fliehkraftsprung (ICE/Achterbahn)' }
    ],
    tip: 'Stufe 1 = Höhe (f), Stufe 2 = Steigung (f\'), Stufe 3 = Krümmung (f\'\').'
  },
  'gauss': {
    title: 'Gauß-Verfahren von Hand (Stufenform)',
    criteria: [
      { id: 'c1', keywords: ['sortier', 'x', 'y', 'z', 'links', 'rechts'], label: 'Gleichungen ordnen (Variablen links, Zahlen rechts)' },
      { id: 'c2', keywords: ['additionsverfahren', 'stufenform', 'dreiecksform', 'eliminier', 'nullen'], label: 'Stufenform / Dreiecksform durch schrittweises Eliminieren' },
      { id: 'c3', keywords: ['rückwärts', 'einsetzen', 'z', 'probe'], label: 'Rückwärtseinsetzen von unten nach oben & Probe machen' }
    ],
    tip: 'Erst auf Dreiecksform bringen, dann von unten (z) nach oben (y, dann x) einsetzen und immer die Probe machen!'
  }
};

let userSavedNotes = {};

// Load user notes from API or localStorage
async function loadUserNotes() {
  try {
    const res = await fetch('/api/load-notes');
    if (res.ok) {
      const data = await res.json();
      if (data && data.notes) {
        userSavedNotes = data.notes;
        applySavedNotesToUI();
        updateSaveStatusIndicator('✅ Alle Notizen geladen');
        return;
      }
    }
  } catch (e) {
    console.log("Local API not reached, using localStorage fallback");
  }

  // Fallback: localStorage
  const local = localStorage.getItem('school_user_notes');
  if (local) {
    try {
      userSavedNotes = JSON.parse(local);
      applySavedNotesToUI();
      updateSaveStatusIndicator('✅ Notizen aus Browserspeicher geladen');
    } catch (e) {}
  }
}

// Save user notes to API & localStorage
async function saveUserNotes() {
  // Save to localStorage immediately
  localStorage.setItem('school_user_notes', JSON.stringify(userSavedNotes));

  try {
    const res = await fetch('/api/save-notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        lastUpdated: new Date().toISOString(),
        notes: userSavedNotes
      })
    });
    if (res.ok) {
      updateSaveStatusIndicator('✅ Gespeichert in meine_mitschriften.json');
    }
  } catch (e) {
    updateSaveStatusIndicator('💾 Lokal im Browser gespeichert');
  }
}

function updateSaveStatusIndicator(text) {
  const el = document.getElementById('saveStatusIndicator');
  if (el) el.innerText = text;
}

function applySavedNotesToUI() {
  Object.keys(userSavedNotes).forEach(key => {
    const ta = document.querySelector(`.feynman-textarea[data-key="${key}"]`);
    if (ta) {
      ta.value = userSavedNotes[key];
      updateBadgeFor(key, userSavedNotes[key]);
    }
  });
  renderMerkheftView();
}

function updateBadgeFor(key, text) {
  const box = document.querySelector(`.feynman-box[data-key="${key}"]`);
  if (!box) return;
  const badge = box.querySelector('.feynman-status');
  if (!badge) return;

  if (!text || text.trim().length === 0) {
    badge.className = 'feynman-status status-empty';
    badge.innerText = '⚪ Noch nicht erklärt';
  } else if (text.trim().length < 40) {
    badge.className = 'feynman-status status-progress';
    badge.innerText = '🟡 In Bearbeitung';
  } else {
    badge.className = 'feynman-status status-mastered';
    badge.innerText = '🟢 Eigene Mitschrift vorhanden';
  }
}

// Evaluate explanation using rubric
function evaluateExplanation(key, userText) {
  const rubric = feynmanRubrics[key] || {
    title: 'Eigene Erklärung',
    criteria: [
      { id: 'c1', keywords: ['funktion', 'bedingung', 'gleichung', 'x', 'punkt'], label: 'Mathematische Genauigkeit & Schlüsselbegriffe' },
      { id: 'c2', keywords: ['warum', 'weil', 'bedeutet', 'folge', 'also'], label: 'Logische Begründung & Zusammenhang' }
    ],
    tip: 'Versuche immer sowohl die mathematische Formel als auch die praktische Bedeutung mit eigenen Worten zu nennen!'
  };

  const lower = userText.toLowerCase();
  const good = [];
  const missing = [];

  rubric.criteria.forEach(c => {
    const match = c.keywords.some(kw => lower.includes(kw));
    if (match) {
      good.push(c.label);
    } else {
      missing.push(c.label);
    }
  });

  const total = rubric.criteria.length;
  const scorePct = Math.round((good.length / total) * 100);

  return {
    key,
    title: rubric.title,
    good,
    missing,
    tip: rubric.tip,
    scorePct
  };
}

// Render Feynman evaluation report
function runFeynmanCheck(key) {
  const box = document.querySelector(`.feynman-box[data-key="${key}"]`);
  if (!box) return;
  const ta = box.querySelector('.feynman-textarea');
  const userText = ta.value.trim();
  const reportBox = box.querySelector('.feynman-feedback-report');

  if (userText.length < 10) {
    reportBox.className = 'feynman-feedback-report open';
    reportBox.innerHTML = `
      <div class="feedback-section">
        <div class="feedback-section-title feedback-missing">⚠️ Bitte schreibe mindestens 1-2 Sätze</div>
        <p style="color: var(--text-light); font-size: 0.88rem;">
          Versuche das Prinzip so zu erklären, als würdest du es einem Mitschüler erklären, der es noch nie gehört hat!
        </p>
      </div>
    `;
    return;
  }

  // Save text
  userSavedNotes[key] = userText;
  saveUserNotes();
  updateBadgeFor(key, userText);

  // Analyze
  const result = evaluateExplanation(key, userText);

  let goodHtml = '';
  if (result.good.length > 0) {
    goodHtml = `
      <div class="feedback-section">
        <div class="feedback-section-title feedback-good">🟢 Das hast du super erkannt (${result.good.length}/${result.good.length + result.missing.length}):</div>
        <ul style="margin-left: 1.25rem; color: #86efac; font-size: 0.88rem;">
          ${result.good.map(g => `<li>${g}</li>`).join('')}
        </ul>
      </div>
    `;
  }

  let missingHtml = '';
  if (result.missing.length > 0) {
    missingHtml = `
      <div class="feedback-section">
        <div class="feedback-section-title feedback-missing">🟡 Das fehlt noch oder könnte genauer sein:</div>
        <ul style="margin-left: 1.25rem; color: #fde047; font-size: 0.88rem;">
          ${result.missing.map(m => `<li>${m}</li>`).join('')}
        </ul>
        <p style="color: var(--text-muted); font-size: 0.82rem; margin-top: 0.4rem;">
          Tipp: Ergänze deine Erklärung oben einfach um diese Punkte und klicke erneut auf „Überprüfen“!
        </p>
      </div>
    `;
  } else {
    missingHtml = `
      <div class="feedback-section">
        <div class="feedback-section-title feedback-good">🏆 100% Vollständig!</div>
        <p style="color: #86efac; font-size: 0.88rem;">
          Hervorragend! Du hast alle wesentlichen mathematischen und logischen Aspekte treffend mit deinen eigenen Worten erfasst!
        </p>
      </div>
    `;
  }

  const tipHtml = `
    <div class="feedback-section" style="border-top: 1px dashed #24355a; padding-top: 0.6rem; margin-top: 0.6rem;">
      <div class="feedback-section-title feedback-tip">💡 Merksatz zur Inspiration:</div>
      <p style="color: #7dd3fc; font-size: 0.88rem;">${result.tip}</p>
    </div>
  `;

  reportBox.className = 'feynman-feedback-report open';
  reportBox.innerHTML = goodHtml + missingHtml + tipHtml;
  renderMerkheftView();
}

// -------------------------------------------------------------
// 5. "Mein persönliches Merkheft"-Zusammenfassung
// -------------------------------------------------------------
function renderMerkheftView() {
  const container = document.getElementById('merkheftContainer');
  if (!container) return;

  const entries = Object.entries(userSavedNotes).filter(([k, v]) => v && v.trim().length > 0);

  if (entries.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 3rem; color: var(--text-muted);">
        <div style="font-size: 2.5rem; margin-bottom: 1rem;">✍️</div>
        <h3>Noch keine eigenen Erklärungen verfasst</h3>
        <p style="max-width: 500px; margin: 0.5rem auto 1.5rem auto; font-size: 0.95rem;">
          Gehe durch die Kapitel (4-Schritte-Methode, Lexikon, LGS, Trassierung) und erkläre die Dinge in deinen eigenen Worten. 
          Hier entsteht automatisch dein persönliches Klausur-Merkheft!
        </p>
      </div>
    `;
    return;
  }

  let html = `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;">
      <div>
        <h3 style="color: #fff; margin: 0;">📘 Mein persönliches Mathe-1 Merkheft</h3>
        <p style="color: var(--text-muted); font-size: 0.88rem;">${entries.length} von 5 Kernkonzepten in eigenen Worten ausformuliert</p>
      </div>
      <button class="btn btn-secondary" onclick="window.print()">🖨️ Merkheft drucken / als PDF speichern</button>
    </div>
  `;

  entries.forEach(([key, text]) => {
    const rubric = feynmanRubrics[key] || { title: key };
    html += `
      <div class="card" style="margin-bottom: 1rem; border-left: 4px solid var(--accent-blue);">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.5rem;">
          <h4 style="color: #60a5fa; font-size: 1.1rem; margin: 0;">${rubric.title}</h4>
          <span class="badge badge-green">Eigene Worte</span>
        </div>
        <div style="background: #090e1a; padding: 1rem; border-radius: var(--radius-sm); color: #f1f5f9; font-size: 0.95rem; white-space: pre-wrap; line-height: 1.6;">
${text}
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

// -------------------------------------------------------------
// 6. Global State & App Initializer
// -------------------------------------------------------------
let plotter = null;
let scharVisualizer = null;

// Dedicated Schar Visualizer for Aufgabe A2
class ScharVisualizer {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.originX = this.canvas.width / 2;
    this.originY = this.canvas.height / 2;
    this.scale = 30; // px per math unit
    this.t = 2.0;
    this.showTangent = true;
    this.showTriangle = true;

    this.initEvents();
    this.resizeCanvas();
    this.update();
  }

  resizeCanvas() {
    if (!this.canvas) return;
    const rect = this.canvas.parentElement.getBoundingClientRect();
    this.canvas.width = rect.width || 600;
    this.canvas.height = 420;
    this.originX = this.canvas.width / 2 - 20;
    this.originY = this.canvas.height / 2 + 30;
    this.draw();
  }

  setT(newT) {
    this.t = parseFloat(newT);
    this.update();
  }

  update() {
    const a = (this.t - 4) / 11;
    const b = (12 - 3 * this.t) / 11;
    const c = (36 - 9 * this.t) / 11;
    const d = this.t;

    const badge = document.getElementById('paramTValue');
    if (badge) badge.innerText = `t = ${this.t.toFixed(1)}`;

    const warningBox = document.getElementById('t4WarningBox');
    if (warningBox) {
      if (Math.abs(this.t - 4) < 0.01) {
        warningBox.style.display = 'block';
      } else {
        warningBox.style.display = 'none';
      }
    }

    const formulaDisplay = document.getElementById('liveScharFormula');
    if (formulaDisplay) {
      if (Math.abs(this.t - 4) < 0.01) {
        formulaDisplay.innerHTML = `$$f_4(x) = 4 \\quad \\text{\\color{#ef4444}(Waagerechte Gerade! Kein Grad 3 mehr!)}$$`;
      } else {
        const signB = b >= 0 ? '+' : '';
        const signC = c >= 0 ? '+' : '';
        const signD = d >= 0 ? '+' : '';
        formulaDisplay.innerHTML = `$$f_{${this.t.toFixed(1)}}(x) = ${a.toFixed(2)}x^3 ${signB} ${b.toFixed(2)}x^2 ${signC} ${c.toFixed(2)}x ${signD} ${d.toFixed(1)}$$`;
      }
      if (window.renderMathInElement) {
        renderMathInElement(formulaDisplay, { delimiters: [{ left: '$$', right: '$$', display: true }] });
      }
    }

    this.draw();
  }

  toScreenX(mx) { return this.originX + mx * this.scale; }
  toScreenY(my) { return this.originY - my * this.scale; }
  toMathX(sx) { return (sx - this.originX) / this.scale; }
  toMathY(sy) { return (this.originY - sy) / this.scale; }

  draw() {
    if (!this.ctx) return;
    const ctx = this.ctx;
    const w = this.canvas.width;
    const h = this.canvas.height;

    // BG
    ctx.fillStyle = "#090e1a";
    ctx.fillRect(0, 0, w, h);

    // Grid
    const startX = Math.floor(this.toMathX(0));
    const endX = Math.ceil(this.toMathX(w));
    const startY = Math.floor(this.toMathY(h));
    const endY = Math.ceil(this.toMathY(0));

    ctx.lineWidth = 1;
    ctx.strokeStyle = "#17233d";
    ctx.beginPath();
    for (let x = startX; x <= endX; x++) {
      const sx = this.toScreenX(x);
      ctx.moveTo(sx, 0); ctx.lineTo(sx, h);
    }
    for (let y = startY; y <= endY; y++) {
      const sy = this.toScreenY(y);
      ctx.moveTo(0, sy); ctx.lineTo(w, sy);
    }
    ctx.stroke();

    // Axes
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = "#38bdf8";
    ctx.beginPath();
    ctx.moveTo(0, this.originY); ctx.lineTo(w, this.originY);
    ctx.moveTo(this.originX, 0); ctx.lineTo(this.originX, h);
    ctx.stroke();

    // Numbers
    ctx.fillStyle = "#64748b";
    ctx.font = "11px monospace";
    ctx.textAlign = "center";
    for (let x = startX; x <= endX; x += 2) {
      if (x === 0) continue;
      ctx.fillText(x, this.toScreenX(x), this.originY + 14);
    }
    ctx.textAlign = "right";
    for (let y = startY; y <= endY; y += 2) {
      if (y === 0) continue;
      ctx.fillText(y, this.originX - 6, this.toScreenY(y) + 4);
    }

    // Vertical dashed lines at x = -1 and x = 3 (Fixed extrema positions!)
    ctx.strokeStyle = "rgba(245, 158, 11, 0.4)";
    ctx.setLineDash([4, 4]);
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(this.toScreenX(-1), 0); ctx.lineTo(this.toScreenX(-1), h);
    ctx.moveTo(this.toScreenX(3), 0); ctx.lineTo(this.toScreenX(3), h);
    ctx.stroke();
    ctx.setLineDash([]);

    // Vertical guide label
    ctx.fillStyle = "#f59e0b";
    ctx.font = "10px sans-serif";
    ctx.fillText("Extremum x = -1", this.toScreenX(-1) + 4, 20);
    ctx.fillText("Extremum x = 3", this.toScreenX(3) + 4, 20);

    const a = (this.t - 4) / 11;
    const b = (12 - 3 * this.t) / 11;
    const c = (36 - 9 * this.t) / 11;
    const d = this.t;
    const fn = (x) => a * Math.pow(x, 3) + b * Math.pow(x, 2) + c * x + d;

    // Draw Shaded Triangle (Aufgabe d) if t == 2 and checked
    if (Math.abs(this.t - 2) < 0.1 && this.showTriangle) {
      const p1 = { x: this.toScreenX(0), y: this.toScreenY(0) };
      const p2 = { x: this.toScreenX(-5/3), y: this.toScreenY(0) };
      const p3 = { x: this.toScreenX(0), y: this.toScreenY(30/11) };

      ctx.fillStyle = "rgba(234, 88, 12, 0.3)";
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.lineTo(p3.x, p3.y);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = "#ea580c";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.fillStyle = "#fdba74";
      ctx.font = "bold 11px sans-serif";
      ctx.fillText("Dreieck A = 25/11 ≈ 2.27", this.toScreenX(-1.5), this.toScreenY(1));
    }

    // Draw Tangent at x=2 if checked
    if (Math.abs(this.t - 2) < 0.1 && this.showTangent) {
      const tanFn = (x) => (18/11) * x + (30/11);
      ctx.strokeStyle = "#f97316";
      ctx.lineWidth = 2;
      ctx.beginPath();
      const mx1 = this.toMathX(0);
      const mx2 = this.toMathX(w);
      ctx.moveTo(0, this.toScreenY(tanFn(mx1)));
      ctx.lineTo(w, this.toScreenY(tanFn(mx2)));
      ctx.stroke();

      ctx.fillStyle = "#f97316";
      ctx.beginPath();
      ctx.arc(this.toScreenX(2), this.toScreenY(6), 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#ffffff";
      ctx.stroke();
      ctx.fillText("Berührpunkt (2|6)", this.toScreenX(2) + 8, this.toScreenY(6) - 6);
    }

    // Draw Main Function Curve f_t(x)
    ctx.strokeStyle = Math.abs(this.t - 4) < 0.01 ? "#ef4444" : "#38bdf8";
    ctx.lineWidth = 3;
    ctx.beginPath();
    let isDrawing = false;
    for (let px = 0; px <= w; px += 2) {
      const mx = this.toMathX(px);
      const my = fn(mx);
      if (isNaN(my) || !isFinite(my) || Math.abs(my) > 100) {
        isDrawing = false;
        continue;
      }
      const py = this.toScreenY(my);
      if (!isDrawing) {
        ctx.moveTo(px, py);
        isDrawing = true;
      } else {
        ctx.lineTo(px, py);
      }
    }
    ctx.stroke();

    // Draw Stationary Wendepunkt W(1|4)
    const wx = this.toScreenX(1);
    const wy = this.toScreenY(4);
    ctx.fillStyle = "#a855f7";
    ctx.beginPath();
    ctx.arc(wx, wy, 7, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 12px sans-serif";
    ctx.fillText("W(1|4) Wendepunkt (stets fix!)", wx + 10, wy - 6);

    // Draw Extrema
    const e1y = fn(-1);
    const e2y = fn(3);
    const e1x = this.toScreenX(-1);
    const e2x = this.toScreenX(3);

    ctx.fillStyle = "#22c55e";
    ctx.beginPath();
    ctx.arc(e1x, this.toScreenY(e1y), 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillText(`Extremum (-1|${e1y.toFixed(1)})`, e1x - 10, this.toScreenY(e1y) - 8);

    ctx.beginPath();
    ctx.arc(e2x, this.toScreenY(e2y), 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillText(`Extremum (3|${e2y.toFixed(1)})`, e2x + 10, this.toScreenY(e2y) - 8);
  }

  initEvents() {
    window.addEventListener('resize', () => this.resizeCanvas());

    const slider = document.getElementById('paramTSlider');
    if (slider) {
      slider.addEventListener('input', (e) => {
        this.setT(e.target.value);
      });
    }

    document.querySelectorAll('.btn-preset-t').forEach(btn => {
      btn.addEventListener('click', () => {
        const val = parseFloat(btn.getAttribute('data-t'));
        if (slider) slider.value = val;
        this.setT(val);
      });
    });

    const chkTan = document.getElementById('chkShowTangent');
    if (chkTan) {
      chkTan.addEventListener('change', (e) => {
        this.showTangent = e.target.checked;
        this.draw();
      });
    }

    const chkTri = document.getElementById('chkShowTriangle');
    if (chkTri) {
      chkTri.addEventListener('change', (e) => {
        this.showTriangle = e.target.checked;
        this.draw();
      });
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // Navigation Tabs
  const navTabs = document.querySelectorAll('.nav-tab');
  navTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      navTabs.forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

      tab.classList.add('active');
      const targetId = tab.getAttribute('data-tab');
      const target = document.getElementById(targetId);
      if (target) {
        target.classList.add('active');
        if (targetId === 'tab-calculator' && plotter) {
          setTimeout(() => plotter.resizeCanvas(), 50);
        }
        if (targetId === 'tab-aufgabe-a2' && scharVisualizer) {
          setTimeout(() => { scharVisualizer.resizeCanvas(); scharVisualizer.update(); }, 50);
        }
        if (targetId === 'tab-merkheft') {
          renderMerkheftView();
        }
      }
    });
  });

  // Init Schar Visualizer
  scharVisualizer = new ScharVisualizer('scharCanvas');

  // Init Plotter
  plotter = new FunctionPlotter('graphCanvas');
  plotter.setFunction(
    (x) => Math.pow(x, 3) - 3 * Math.pow(x, 2) + 4,
    [
      { x: 0, y: 4, label: "H(0|4) Hochpunkt", color: "#22c55e" },
      { x: 1, y: 2, label: "W(1|2) Wendepunkt", color: "#a855f7" },
      { x: 2, y: 0, label: "T(2|0) Tiefpunkt", color: "#38bdf8" }
    ]
  );

  document.getElementById('btnPlotZoomIn')?.addEventListener('click', () => plotter.zoomIn());
  document.getElementById('btnPlotZoomOut')?.addEventListener('click', () => plotter.zoomOut());
  document.getElementById('btnPlotReset')?.addEventListener('click', () => plotter.resetView());

  // Search Filter in Dictionary
  const searchInput = document.getElementById('dictSearchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      const rows = document.querySelectorAll('#dictTableBody tr');
      rows.forEach(row => {
        const text = row.innerText.toLowerCase();
        row.style.display = text.includes(q) ? '' : 'none';
      });
    });
  }

  // Solution Toggle Buttons
  document.querySelectorAll('.btn-toggle-solution').forEach(btn => {
    btn.addEventListener('click', () => {
      const taskBody = btn.closest('.task-body');
      const sol = taskBody.querySelector('.solution-content');
      if (sol) {
        const isOpen = sol.classList.contains('open');
        sol.classList.toggle('open');
        btn.innerHTML = isOpen 
          ? '<span>👁️</span> Musterlösung anzeigen' 
          : '<span>🙈</span> Lösung verbergen';
      }
    });
  });

  // Modal Image Viewer
  const modalOverlay = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImage');
  const modalCaption = document.getElementById('modalCaption');
  const modalClose = document.getElementById('modalClose');

  document.querySelectorAll('.original-photo-ref').forEach(btn => {
    btn.addEventListener('click', () => {
      const imgSrc = btn.getAttribute('data-img');
      const title = btn.getAttribute('data-title') || "Unterrichts-Vorlage";
      if (imgSrc && modalOverlay) {
        modalImg.src = imgSrc;
        modalCaption.innerText = title;
        modalOverlay.classList.add('open');
      }
    });
  });

  if (modalClose) {
    modalClose.addEventListener('click', () => modalOverlay.classList.remove('open'));
  }
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) modalOverlay.classList.remove('open');
    });
  }

  // Feynman check buttons
  document.querySelectorAll('.btn-check-feynman').forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-key');
      if (key) runFeynmanCheck(key);
    });
  });

  // Auto-save on blur
  document.querySelectorAll('.feynman-textarea').forEach(ta => {
    ta.addEventListener('blur', () => {
      const key = ta.getAttribute('data-key');
      if (key) {
        userSavedNotes[key] = ta.value.trim();
        saveUserNotes();
        updateBadgeFor(key, ta.value.trim());
      }
    });
  });

  // Load persistent notes
  loadUserNotes();

  // KaTeX
  renderAllKaTeX();

  // Quiz
  initQuiz();

  // Calculator
  initCalculator();
});

// KaTeX Render
function renderAllKaTeX() {
  if (window.renderMathInElement) {
    renderMathInElement(document.body, {
      delimiters: [
        { left: '$$', right: '$$', display: true },
        { left: '$', right: '$', display: false },
        { left: '\\(', right: '\\)', display: false },
        { left: '\\[', right: '\\]', display: true }
      ],
      throwOnError: false
    });
  }
}

// -------------------------------------------------------------
// 7. Interaktiver Steckbrief-Rechner
// -------------------------------------------------------------
function initCalculator() {
  const degreeSelect = document.getElementById('calcDegree');
  const presetSelect = document.getElementById('calcPreset');
  const conditionsContainer = document.getElementById('conditionsContainer');
  const btnAddCond = document.getElementById('btnAddCondition');
  const btnSolve = document.getElementById('btnSolveSteckbrief');
  const resultArea = document.getElementById('calcResultArea');

  const presets = {
    'aufgabe1a': {
      degree: 'grad2',
      conditions: [
        { type: 'point', x: 3, y: 0 },
        { type: 'point', x: -1, y: -32 },
        { type: 'tangent', x: -1, y: 0 }
      ]
    },
    'aufgabe1b': {
      degree: 'grad2',
      conditions: [
        { type: 'point', x: 0, y: 6 },
        { type: 'tangent', x: 3, y: 4 },
        { type: 'tangent', x: 2, y: 0 }
      ]
    },
    'aufgabe2a': {
      degree: 'grad3',
      conditions: [
        { type: 'point', x: 0, y: 4 },
        { type: 'tangent', x: 0, y: 0 },
        { type: 'point', x: 1, y: 2 },
        { type: 'inflection', x: 1, y: 0 }
      ]
    },
    'aufgabe2b': {
      degree: 'grad3',
      conditions: [
        { type: 'point', x: 0, y: 0 },
        { type: 'point', x: 1, y: 10 },
        { type: 'tangent', x: 1, y: 0 },
        { type: 'inflection', x: -1, y: 0 }
      ]
    },
    'handschrift_parabel': {
      degree: 'grad2',
      conditions: [
        { type: 'point', x: 0, y: 0 },
        { type: 'point', x: 4, y: 6 },
        { type: 'tangent', x: 4, y: 0 }
      ]
    }
  };

  function createConditionRow(cond = { type: 'point', x: 0, y: 0 }) {
    const row = document.createElement('div');
    row.className = 'cond-row';
    row.style.cssText = "display: flex; gap: 0.5rem; align-items: center; margin-bottom: 0.6rem;";
    row.innerHTML = `
      <select class="form-select cond-type" style="width: 140px;">
        <option value="point" ${cond.type === 'point' ? 'selected' : ''}>f(x) = y (Punkt)</option>
        <option value="tangent" ${cond.type === 'tangent' ? 'selected' : ''}>f'(x) = m (Steigung)</option>
        <option value="inflection" ${cond.type === 'inflection' ? 'selected' : ''}>f''(x) = 0 (Wende)</option>
      </select>
      <input type="number" step="any" class="form-input cond-x" placeholder="x" value="${cond.x}" style="width: 80px;" title="Stelle x">
      <span style="color: var(--text-muted);">=</span>
      <input type="number" step="any" class="form-input cond-y" placeholder="Wert" value="${cond.y}" style="width: 80px;" title="Zielwert">
      <button class="btn btn-secondary btn-del-cond" style="padding: 0.4rem 0.6rem; color: #f87171;" title="Entfernen">✕</button>
    `;

    row.querySelector('.btn-del-cond').addEventListener('click', () => row.remove());
    conditionsContainer.appendChild(row);
  }

  presetSelect?.addEventListener('change', () => {
    const val = presetSelect.value;
    if (presets[val]) {
      degreeSelect.value = presets[val].degree;
      conditionsContainer.innerHTML = '';
      presets[val].conditions.forEach(c => createConditionRow(c));
    }
  });

  btnAddCond?.addEventListener('click', () => createConditionRow());

  if (conditionsContainer && conditionsContainer.children.length === 0) {
    presetSelect.value = 'aufgabe1b';
    presets['aufgabe1b'].conditions.forEach(c => createConditionRow(c));
  }

  btnSolve?.addEventListener('click', () => {
    const degree = degreeSelect.value;
    const condRows = conditionsContainer.querySelectorAll('.cond-row');

    let varNames = [];
    if (degree === 'grad2') varNames = ['a', 'b', 'c'];
    else if (degree === 'grad3') varNames = ['a', 'b', 'c', 'd'];

    const numVars = varNames.length;
    const matrixRows = [];

    condRows.forEach(row => {
      const type = row.querySelector('.cond-type').value;
      const x = parseFloat(row.querySelector('.cond-x').value || 0);
      const target = parseFloat(row.querySelector('.cond-y').value || 0);

      const mRow = [];
      if (degree === 'grad2') {
        if (type === 'point') mRow.push(Math.pow(x, 2), x, 1);
        else if (type === 'tangent') mRow.push(2 * x, 1, 0);
        else if (type === 'inflection') mRow.push(2, 0, 0);
      } else if (degree === 'grad3') {
        if (type === 'point') mRow.push(Math.pow(x, 3), Math.pow(x, 2), x, 1);
        else if (type === 'tangent') mRow.push(3 * Math.pow(x, 2), 2 * x, 1, 0);
        else if (type === 'inflection') mRow.push(6 * x, 2, 0, 0);
      }

      mRow.push(target);
      matrixRows.push(mRow);
    });

    if (matrixRows.length < numVars) {
      resultArea.innerHTML = `
        <div class="callout callout-warning">
          <div class="callout-title">⚠️ Unterbestimmtes System</div>
          Du hast ${matrixRows.length} Bedingungen für ${numVars} Unbekannte. 
          Benötigt werden mindestens <strong>${numVars} Bedingungen</strong>!
        </div>
      `;
      return;
    }

    const solved = solveRref(matrixRows);
    const rrefM = solved.matrix;

    let origMatrixHtml = `<div class="matrix-container"><table class="matrix-table">`;
    matrixRows.forEach(r => {
      origMatrixHtml += '<tr>';
      for (let i = 0; i < r.length - 1; i++) origMatrixHtml += `<td>${r[i]}</td>`;
      origMatrixHtml += `<td class="matrix-res">${r[r.length - 1]}</td></tr>`;
    });
    origMatrixHtml += `</table></div>`;

    let rrefMatrixHtml = `<div class="matrix-container"><table class="matrix-table">`;
    rrefM.forEach(r => {
      rrefMatrixHtml += '<tr>';
      for (let i = 0; i < r.length - 1; i++) rrefMatrixHtml += `<td>${r[i].toString()}</td>`;
      rrefMatrixHtml += `<td class="matrix-res">${r[r.length - 1].toString()}</td></tr>`;
    });
    rrefMatrixHtml += `</table></div>`;

    if (solved.hasContradiction) {
      resultArea.innerHTML = `
        <div class="callout callout-danger">
          <div class="callout-title">❌ Keine Lösung (Widerspruch!)</div>
          Die Matrix enthält eine Widerspruchszeile $[0\ 0\ \dots\ 0\ |\ 1]$ ($0 = 1$).
        </div>
        <div style="display: flex; gap: 1.5rem; align-items: center; overflow-x: auto;">
          ${origMatrixHtml} <span>$\\xrightarrow{\\text{rref}}$</span> ${rrefMatrixHtml}
        </div>
      `;
      renderAllKaTeX();
      return;
    }

    const coeffMap = {};
    for (let i = 0; i < numVars; i++) {
      coeffMap[varNames[i]] = rrefM[i] ? rrefM[i][rrefM[i].length - 1] : new Fraction(0);
    }

    let formulaLatex = "f(x) = ";
    let terms = [];
    if (degree === 'grad2') {
      const a = coeffMap['a'], b = coeffMap['b'], c = coeffMap['c'];
      if (!a.isZero()) terms.push(`${a.toTex()}x^2`);
      if (!b.isZero()) terms.push(`${b.n > 0 && terms.length > 0 ? '+' : ''}${b.toTex()}x`);
      if (!c.isZero() || terms.length === 0) terms.push(`${c.n > 0 && terms.length > 0 ? '+' : ''}${c.toTex()}`);
    } else if (degree === 'grad3') {
      const a = coeffMap['a'], b = coeffMap['b'], c = coeffMap['c'], d = coeffMap['d'];
      if (!a.isZero()) terms.push(`${a.toTex()}x^3`);
      if (!b.isZero()) terms.push(`${b.n > 0 && terms.length > 0 ? '+' : ''}${b.toTex()}x^2`);
      if (!c.isZero()) terms.push(`${c.n > 0 && terms.length > 0 ? '+' : ''}${c.toTex()}x`);
      if (!d.isZero() || terms.length === 0) terms.push(`${d.n > 0 && terms.length > 0 ? '+' : ''}${d.toTex()}`);
    }

    formulaLatex += terms.join(' ');

    resultArea.innerHTML = `
      <div class="callout callout-success" style="margin-top: 1.5rem;">
        <div class="callout-title">🎉 Eindeutige Funktionsgleichung berechnet!</div>
        <div style="font-size: 1.35rem; margin: 0.6rem 0; color: #38bdf8;">
          $$${formulaLatex}$$
        </div>
        <div style="display: flex; gap: 1rem; flex-wrap: wrap; margin-top: 0.5rem;">
          ${varNames.map(v => `<span class="badge badge-blue">${v} = ${coeffMap[v].toTex()}</span>`).join(' ')}
        </div>
      </div>
      <div style="margin-top: 1rem;">
        <h4 style="margin-bottom: 0.5rem;">Matrixschritte:</h4>
        <div style="display: flex; gap: 1rem; align-items: center; overflow-x: auto;">
          ${origMatrixHtml} <span style="font-size: 1.4rem; color: var(--accent-blue);">$\\xrightarrow{\\text{rref}}$</span> ${rrefMatrixHtml}
        </div>
      </div>
    `;
    renderAllKaTeX();

    const specialPts = [];
    condRows.forEach(r => {
      const type = r.querySelector('.cond-type').value;
      const x = parseFloat(r.querySelector('.cond-x').value || 0);
      const y = parseFloat(r.querySelector('.cond-y').value || 0);
      if (type === 'point') specialPts.push({ x, y, label: `P(${x}|${y})`, color: '#38bdf8' });
    });

    let mathFn = null;
    if (degree === 'grad2') {
      const a = coeffMap['a'].toNumber(), b = coeffMap['b'].toNumber(), c = coeffMap['c'].toNumber();
      mathFn = (x) => a * x * x + b * x + c;
    } else if (degree === 'grad3') {
      const a = coeffMap['a'].toNumber(), b = coeffMap['b'].toNumber(), c = coeffMap['c'].toNumber(), d = coeffMap['d'].toNumber();
      mathFn = (x) => a * Math.pow(x, 3) + b * Math.pow(x, 2) + c * x + d;
    }

    if (mathFn && plotter) plotter.setFunction(mathFn, specialPts);
  });
}

// -------------------------------------------------------------
// 8. Quiz Engine
// -------------------------------------------------------------
const quizQuestions = [
  {
    question: "Was bedeutet die Eigenschaft 'Der Graph berührt die x-Achse bei $x = -3$'?",
    options: [
      { text: "Nur $f(-3) = 0$", correct: false },
      { text: "$f(-3) = 0$ und $f'(-3) = 0$", correct: true, explain: "Genau! 'Berühren' bedeutet Nullstelle UND waagerechte Tangente." },
      { text: "$f'(-3) = 0$ und $f''(-3) = 0$", correct: false },
      { text: "$f(0) = -3$", correct: false }
    ]
  },
  {
    question: "Welche Gleichungsbedingungen liefert die Aussage: 'Hochpunkt bei $H(1|2)$'?",
    options: [
      { text: "$f(1) = 2$ und $f'(1) = 0$", correct: true, explain: "Richtig! Punkt auf dem Graph $f(1)=2$ und Steigung 0 im Hochpunkt $f'(1)=0$." },
      { text: "$f(2) = 1$ und $f'(2) = 0$", correct: false },
      { text: "$f(1) = 2$ und $f''(1) = 0$", correct: false },
      { text: "$f'(1) = 2$", correct: false }
    ]
  },
  {
    question: "Ein Graph ist 'achsensymmetrisch zur y-Achse' und hat Grad 4. Welcher Ansatz ist optimal?",
    options: [
      { text: "$f(x) = ax^4 + bx^3 + cx^2 + dx + e$", correct: false },
      { text: "$f(x) = ax^4 + cx^2 + e$", correct: true, explain: "Perfekt! Bei Achsensymmetrie fallen ungerade Potenzen weg ($b=0, d=0$)." },
      { text: "$f(x) = ax^3 + bx$", correct: false },
      { text: "$f(x) = ax^4 + bx^2$", correct: false }
    ]
  },
  {
    question: "Was bedeutet die Zeile `[0 0 0 | 1]` in einer Matrix?",
    options: [
      { text: "$z = 1$", correct: false },
      { text: "Unendlich viele Lösungen", correct: false },
      { text: "Keine Lösung (Widerspruch $0 = 1$)", correct: true, explain: "Exakt! $0x + 0y + 0z = 1$ ist eine falsche Aussage. Lösungsmenge ist leer." },
      { text: "Nullstelle bei $x = 0$", correct: false }
    ]
  },
  {
    question: "Was fordert die 'Krümmungsruckfreiheit' an der Nahtstelle zweier Trassen?",
    options: [
      { text: "Nur $f(x_0) = g(x_0)$", correct: false },
      { text: "$f'(x_0) = g'(x_0)$", correct: false },
      { text: "$f''(x_0) = g''(x_0)$ (gleiche 2. Ableitung / Krümmung)", correct: true, explain: "Richtig! Gleiche Krümmung verhindert Ruckkräfte bei Schienen & Achterbahnen." },
      { text: "$f'''(x_0) = 0$", correct: false }
    ]
  }
];

let currentQIdx = 0;
let score = 0;

function initQuiz() {
  const container = document.getElementById('quizContainer');
  if (!container) return;
  renderQuestion();
}

function renderQuestion() {
  const container = document.getElementById('quizContainer');
  if (!container) return;

  if (currentQIdx >= quizQuestions.length) {
    container.innerHTML = `
      <div style="text-align: center; padding: 2rem;">
        <div style="font-size: 3rem; margin-bottom: 1rem;">🏆</div>
        <h2>Quiz abgeschlossen!</h2>
        <p style="font-size: 1.25rem; color: var(--accent-blue); margin: 1rem 0;">
          Ergebnis: <strong>${score} von ${quizQuestions.length} Punkten</strong>
        </p>
        <button class="btn" onclick="restartQuiz()">🔄 Quiz neu starten</button>
      </div>
    `;
    return;
  }

  const q = quizQuestions[currentQIdx];
  let optionsHtml = '';
  q.options.forEach((opt, idx) => {
    optionsHtml += `
      <div class="quiz-option" data-idx="${idx}" onclick="selectQuizOption(${idx})">
        <div>${opt.text}</div>
      </div>
    `;
  });

  container.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
      <span class="badge badge-blue">Frage ${currentQIdx + 1} von ${quizQuestions.length}</span>
      <span style="font-size: 0.9rem; color: var(--text-muted);">Punkte: <strong>${score}</strong></span>
    </div>
    <h3 style="font-size: 1.25rem; margin-bottom: 1.5rem; color: #fff;">${q.question}</h3>
    <div class="quiz-options-list">${optionsHtml}</div>
    <div id="quizExplainBox" style="margin-top: 1.5rem; display: none;"></div>
    <div style="display: flex; justify-content: flex-end; margin-top: 1.5rem;">
      <button id="btnNextQuizQ" class="btn btn-secondary" style="display: none;" onclick="nextQuestion()">Nächste Frage ➔</button>
    </div>
  `;

  renderAllKaTeX();
}

window.selectQuizOption = function(idx) {
  const q = quizQuestions[currentQIdx];
  const options = document.querySelectorAll('.quiz-option');
  const explainBox = document.getElementById('quizExplainBox');
  const nextBtn = document.getElementById('btnNextQuizQ');

  options.forEach(opt => opt.style.pointerEvents = 'none');

  const selectedOpt = q.options[idx];
  if (selectedOpt.correct) {
    options[idx].classList.add('correct');
    score++;
    explainBox.className = 'callout callout-success';
    explainBox.innerHTML = `<div class="callout-title">✅ Ausgezeichnet!</div>${selectedOpt.explain || 'Richtig beantwortet.'}`;
  } else {
    options[idx].classList.add('wrong');
    q.options.forEach((opt, i) => { if (opt.correct) options[i].classList.add('correct'); });
    explainBox.className = 'callout callout-danger';
    explainBox.innerHTML = `<div class="callout-title">❌ Leider nicht ganz richtig.</div>${q.options.find(o => o.correct).explain || ''}`;
  }

  explainBox.style.display = 'block';
  nextBtn.style.display = 'inline-flex';
  renderAllKaTeX();
};

window.nextQuestion = function() {
  currentQIdx++;
  renderQuestion();
};

window.restartQuiz = function() {
  currentQIdx = 0;
  score = 0;
  renderQuestion();
};

window.loadTaskIntoPlotter = function(type) {
  const tabBtn = document.querySelector('[data-tab="tab-calculator"]');
  if (tabBtn) tabBtn.click();

  const presetSelect = document.getElementById('calcPreset');
  if (presetSelect) {
    presetSelect.value = type;
    presetSelect.dispatchEvent(new Event('change'));
    document.getElementById('btnSolveSteckbrief')?.click();
  }
};
