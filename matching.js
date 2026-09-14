// Multi-Level Matching Engine (Level 1, Level 2 & Level 3)

const DATASETS = {
  1: {
    title: "Immer eindeutige Lösung? (Level 1: Buch S. 46)",
    desc: "Zu den vier Gleichungssystemen aus dem Lehrbuch wurde mithilfe von rref die Diagonalform erstellt.",
    lgs: {
      1: "2x + y = 3<br>7x + y = 1",
      2: "-x + y = 3<br>6x + y = -2",
      3: "-x - y = -2<br>x + y = 2",
      4: "2x + y = 4<br>2x + y = -3"
    },
    matrices: {
      A: "\\begin{pmatrix} 1 & 0{,}5 & 0 \\\\ 0 & 0 & 1 \\end{pmatrix}",
      B: "\\begin{pmatrix} 1 & 0 & -\\frac{2}{5} \\\\ 0 & 1 & \\frac{19}{5} \\end{pmatrix}",
      C: "\\begin{pmatrix} 1 & 1 & 2 \\\\ 0 & 0 & 0 \\end{pmatrix}",
      D: "\\begin{pmatrix} 1 & 0 & -\\frac{5}{7} \\\\ 0 & 1 & \\frac{16}{7} \\end{pmatrix}"
    },
    graphs: {
      I: [ { m: 1, b: 3 }, { m: -6, b: -2 } ],
      II: [ { m: -2, b: 3 }, { m: -7, b: 1 } ],
      III: [ { m: -2, b: 4 }, { m: -2, b: -3 } ],
      IV: [ { m: -1, b: 2 } ]
    },
    solution: {
      1: { mat: 'B', graph: 'II' },
      2: { mat: 'D', graph: 'I' },
      3: { mat: 'C', graph: 'IV' },
      4: { mat: 'A', graph: 'III' }
    }
  },

  2: {
    title: "Immer eindeutige Lösung? (Level 2: Klausur-Training)",
    desc: "Klausurset 1: Trainiere den Nenner-Blick, den x=0-Blick sowie Nullzeile (0=0) und Widerspruchszeile (0=1).",
    lgs: {
      1: "3x + y = 4<br>x + y = 1",
      2: "-x + y = 2<br>2x + y = 3",
      3: "x - y = -1<br>-2x + 2y = 2",
      4: "3x - y = 2<br>3x - y = -1"
    },
    matrices: {
      A: "\\begin{pmatrix} 1 & 0 & \\frac{1}{3} \\\\ 0 & 1 & \\frac{7}{3} \\end{pmatrix}",
      B: "\\begin{pmatrix} 1 & -\\frac{1}{3} & 0 \\\\ 0 & 0 & 1 \\end{pmatrix}",
      C: "\\begin{pmatrix} 1 & 0 & \\frac{3}{2} \\\\ 0 & 1 & -\\frac{1}{2} \\end{pmatrix}",
      D: "\\begin{pmatrix} 1 & -1 & -1 \\\\ 0 & 0 & 0 \\end{pmatrix}"
    },
    graphs: {
      I: [ { m: 3, b: -2 }, { m: 3, b: 1 } ], // Parallelen (LGS 4)
      II: [ { m: 1, b: 1 } ], // Identisch (LGS 3)
      III: [ { m: -3, b: 4 }, { m: -1, b: 1 } ], // Schnittpunkt (1.5 | -0.5) (LGS 1)
      IV: [ { m: 1, b: 2 }, { m: -2, b: 3 } ]  // Schnittpunkt (1/3 | 7/3) (LGS 2)
    },
    solution: {
      1: { mat: 'C', graph: 'III' },
      2: { mat: 'A', graph: 'IV' },
      3: { mat: 'D', graph: 'II' },
      4: { mat: 'B', graph: 'I' }
    }
  },

  3: {
    title: "Immer eindeutige Lösung? (Level 3: Meister-Set)",
    desc: "Klausurset 2: Viertel-Bruch vs. Drittel-Bruch, Parallelen mit Steigung 2 und identische Gerade.",
    lgs: {
      1: "-x + y = 1<br>3x + y = -2",
      2: "x + y = 2<br>4x + y = 3",
      3: "-2x + y = 3<br>-2x + y = -1",
      4: "2x - y = -2<br>-4x + 2y = 4"
    },
    matrices: {
      A: "\\begin{pmatrix} 1 & -0{,}5 & -1 \\\\ 0 & 0 & 0 \\end{pmatrix}",
      B: "\\begin{pmatrix} 1 & 0 & -\\frac{3}{4} \\\\ 0 & 1 & \\frac{1}{4} \\end{pmatrix}",
      C: "\\begin{pmatrix} 1 & -0{,}5 & 0 \\\\ 0 & 0 & 1 \\end{pmatrix}",
      D: "\\begin{pmatrix} 1 & 0 & \\frac{1}{3} \\\\ 0 & 1 & \\frac{5}{3} \\end{pmatrix}"
    },
    graphs: {
      I: [ { m: -1, b: 2 }, { m: -4, b: 3 } ], // Schnittpunkt (1/3 | 5/3) (LGS 2)
      II: [ { m: 2, b: 3 }, { m: 2, b: -1 } ], // Parallelen Steigung 2 (LGS 3)
      III: [ { m: 2, b: 2 } ], // Identisch 1 Gerade (LGS 4)
      IV: [ { m: 1, b: 1 }, { m: -3, b: -2 } ] // Schnittpunkt (-3/4 | 1/4) (LGS 1)
    },
    solution: {
      1: { mat: 'B', graph: 'IV' },
      2: { mat: 'D', graph: 'I' },
      3: { mat: 'C', graph: 'II' },
      4: { mat: 'A', graph: 'III' }
    }
  }
};

let currentLevel = 3; // Default directly to Level 3
let activeLgs = null;

function switchLevel(lvl) {
  currentLevel = lvl;
  document.getElementById('btn-lvl-1').classList.toggle('active', lvl === 1);
  document.getElementById('btn-lvl-2').classList.toggle('active', lvl === 2);
  document.getElementById('btn-lvl-3').classList.toggle('active', lvl === 3);
  loadLevelData();
  resetAll();
}

function renderMatrix(latex, el) {
  if (window.katex) {
    try {
      katex.render(latex, el, { displayMode: true, throwOnError: false });
      return;
    } catch(e) {}
  }
  // Robust Fallback: HTML table with styled fractions
  let clean = latex.replace(/\\begin{pmatrix}/g, '').replace(/\\end{pmatrix}/g, '');
  let rows = clean.split('\\\\').map(r => r.trim()).filter(Boolean);
  let html = '<span class="paren">(</span><table class="mat-table">';
  rows.forEach(r => {
    html += '<tr>';
    let cols = r.split('&').map(c => c.trim());
    cols.forEach(c => {
      let frac = c.replace(/\\frac{([^}]+)}{([^}]+)}/g, '<span class="math-frac"><sup>$1</sup>/<sub>$2</sub></span>');
      html += `<td>${frac}</td>`;
    });
    html += '</tr>';
  });
  html += '</table><span class="paren">)</span>';
  el.innerHTML = html;
}

function loadLevelData() {
  const data = DATASETS[currentLevel];
  document.getElementById('page-title').innerText = data.title;
  document.getElementById('page-desc').innerText = data.desc;

  // Load LGS
  for (let i = 1; i <= 4; i++) {
    document.getElementById('lgs-text-' + i).innerHTML = data.lgs[i];
  }

  // Load Matrices
  const matKeys = ['A', 'B', 'C', 'D'];
  matKeys.forEach(k => {
    const el = document.getElementById('mat-katex-' + k);
    if (el) {
      renderMatrix(data.matrices[k], el);
    }
  });

  // Render Graphs
  const graphKeys = ['I', 'II', 'III', 'IV'];
  graphKeys.forEach(k => {
    drawTextbookGraph('canvas' + k, data.graphs[k]);
  });
}

function drawTextbookGraph(canvasId, lines = []) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  
  const w = canvas.width;
  const h = canvas.height;
  
  // Coordinate origin: x=0 around 54px, y=0 around 68px
  const originX = 54;
  const originY = 68;
  const scale = 17; // 17px per unit

  // Clear background
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, w, h);

  // Light blue grid
  ctx.lineWidth = 1;
  ctx.strokeStyle = "#b9e2f5";
  ctx.beginPath();
  for (let x = -4; x <= 4; x++) {
    const sx = originX + x * scale;
    if (sx >= 0 && sx <= w) {
      ctx.moveTo(sx, 0); ctx.lineTo(sx, h);
    }
  }
  for (let y = -4; y <= 5; y++) {
    const sy = originY - y * scale;
    if (sy >= 0 && sy <= h) {
      ctx.moveTo(0, sy); ctx.lineTo(w, sy);
    }
  }
  ctx.stroke();

  // Coordinate axes
  ctx.lineWidth = 1.3;
  ctx.strokeStyle = "#000000";
  ctx.beginPath();
  // X-axis
  ctx.moveTo(3, originY); ctx.lineTo(w - 6, originY);
  // Y-axis
  ctx.moveTo(originX, h - 3); ctx.lineTo(originX, 6);
  ctx.stroke();

  // Arrowheads
  ctx.fillStyle = "#000000";
  // X arrow
  ctx.beginPath();
  ctx.moveTo(w - 2, originY);
  ctx.lineTo(w - 7, originY - 3);
  ctx.lineTo(w - 7, originY + 3);
  ctx.fill();

  // Y arrow
  ctx.beginPath();
  ctx.moveTo(originX, 2);
  ctx.lineTo(originX - 3, 7);
  ctx.lineTo(originX + 3, 7);
  ctx.fill();

  // Labels
  ctx.font = "italic 9px 'Times New Roman', serif";
  ctx.fillText("x", w - 10, originY - 4);
  ctx.fillText("y", originX + 4, 10);

  // Ticks & Numbers
  ctx.font = "8px sans-serif";
  ctx.fillStyle = "#000000";
  ctx.fillText("-2", originX - 2 * scale - 4, originY + 9);
  ctx.fillText("-1", originX - 1 * scale - 4, originY + 9);
  ctx.fillText("1", originX + 1 * scale - 2, originY + 9);

  ctx.fillText("1", originX - 8, originY - 1 * scale + 3);
  ctx.fillText("2", originX - 8, originY - 2 * scale + 3);
  ctx.fillText("3", originX - 8, originY - 3 * scale + 3);

  // Draw lines
  lines.forEach(line => {
    ctx.strokeStyle = "#1d4ed8"; // Royal blue
    ctx.lineWidth = 2.0;
    ctx.beginPath();

    const xMin = -5;
    const xMax = 5;
    const y1 = line.m * xMin + line.b;
    const y2 = line.m * xMax + line.b;

    ctx.moveTo(originX + xMin * scale, originY - y1 * scale);
    ctx.lineTo(originX + xMax * scale, originY - y2 * scale);
    ctx.stroke();
  });
}

function selectCard(type, id) {
  if (type === 'lgs') {
    activeLgs = id;
    highlightActiveLgs(id);
    return;
  }
  
  if (activeLgs) {
    if (type === 'mat') {
      document.getElementById('sel_m_' + activeLgs).value = id;
      onDropdownChange(activeLgs);
    } else if (type === 'graph') {
      document.getElementById('sel_g_' + activeLgs).value = id;
      onDropdownChange(activeLgs);
    }
  }
}

function highlightActiveLgs(id) {
  for (let i = 1; i <= 4; i++) {
    const card = document.getElementById('card-lgs-' + i);
    if (card) {
      if (i.toString() === id.toString()) {
        card.style.outline = "2px dashed #0284c7";
      } else {
        card.style.outline = "none";
      }
    }
  }
}

function onDropdownChange(slotId) {
  updateCardHighlights();
}

function updateCardHighlights() {
  document.querySelectorAll('.textbook-card').forEach(card => {
    card.classList.remove('match-trio-1', 'match-trio-2', 'match-trio-3', 'match-trio-4');
  });
  document.querySelectorAll('.trio-tag').forEach(tag => {
    tag.style.display = 'none';
    tag.innerText = '';
  });

  const colors = {
    1: '#059669',
    2: '#d97706',
    3: '#2563eb',
    4: '#7c3aed'
  };

  for (let i = 1; i <= 4; i++) {
    const mVal = document.getElementById('sel_m_' + i).value;
    const gVal = document.getElementById('sel_g_' + i).value;

    const lgsCard = document.getElementById('card-lgs-' + i);
    const lgsTag = document.getElementById('tag-lgs-' + i);

    if (mVal || gVal) {
      if (lgsCard) lgsCard.classList.add('match-trio-' + i);
      if (lgsTag) {
        lgsTag.style.display = 'inline-block';
        lgsTag.style.background = colors[i];
        lgsTag.innerText = 'Trio ' + i;
      }
    }

    if (mVal) {
      const matCard = document.getElementById('card-mat-' + mVal);
      const matTag = document.getElementById('tag-mat-' + mVal);
      if (matCard) matCard.classList.add('match-trio-' + i);
      if (matTag) {
        matTag.style.display = 'inline-block';
        matTag.style.background = colors[i];
        matTag.innerText = 'Trio ' + i;
      }
    }

    if (gVal) {
      const gCard = document.getElementById('card-graph-' + gVal);
      const gTag = document.getElementById('tag-graph-' + gVal);
      if (gCard) gCard.classList.add('match-trio-' + i);
      if (gTag) {
        gTag.style.display = 'inline-block';
        gTag.style.background = colors[i];
        gTag.innerText = 'Trio ' + i;
      }
    }
  }
}

function checkAllMatches() {
  const sol = DATASETS[currentLevel].solution;
  let correctCount = 0;

  for (let i = 1; i <= 4; i++) {
    const m = document.getElementById('sel_m_' + i).value;
    const g = document.getElementById('sel_g_' + i).value;
    const slotEl = document.getElementById('slot-' + i);

    if (m === sol[i].mat && g === sol[i].graph) {
      correctCount++;
      slotEl.style.borderColor = "#10b981";
      slotEl.style.background = "#ecfdf5";
    } else {
      slotEl.style.borderColor = "#f87171";
      slotEl.style.background = "#fef2f2";
    }
  }

  const banner = document.getElementById('resultBanner');
  banner.style.display = 'block';

  if (correctCount === 4) {
    banner.className = 'result-banner result-success';
    banner.innerHTML = '🎉 Perfekt! Alle 4 Trios für Level ' + currentLevel + ' sind absolut fehlerfrei!';
  } else {
    banner.className = 'result-banner result-partial';
    banner.innerHTML = `⚠️ ${correctCount} von 4 Trios richtig. Rot markierte Slots nochmals nachjustieren!`;
  }
}

function solveAllMatches() {
  const sol = DATASETS[currentLevel].solution;
  for (let i = 1; i <= 4; i++) {
    document.getElementById('sel_m_' + i).value = sol[i].mat;
    document.getElementById('sel_g_' + i).value = sol[i].graph;
    const slotEl = document.getElementById('slot-' + i);
    slotEl.style.borderColor = "#10b981";
    slotEl.style.background = "#ecfdf5";
  }
  updateCardHighlights();
  const banner = document.getElementById('resultBanner');
  banner.style.display = 'block';
  banner.className = 'result-banner result-success';
  banner.innerHTML = `✅ Musterlösung Level ${currentLevel}: ①➔${sol[1].mat}➔${sol[1].graph} | ②➔${sol[2].mat}➔${sol[2].graph} | ③➔${sol[3].mat}➔${sol[3].graph} | ④➔${sol[4].mat}➔${sol[4].graph}`;
}

function resetAll() {
  for (let i = 1; i <= 4; i++) {
    document.getElementById('sel_m_' + i).value = "";
    document.getElementById('sel_g_' + i).value = "";
    const slotEl = document.getElementById('slot-' + i);
    slotEl.style.borderColor = "#cbd5e1";
    slotEl.style.background = "#ffffff";
  }
  updateCardHighlights();
  const banner = document.getElementById('resultBanner');
  banner.style.display = 'none';
}

function toggleExplanation() {
  const box = document.getElementById('explanationBox');
  box.style.display = (box.style.display === 'block') ? 'none' : 'block';
}

// Initial setup
window.addEventListener('DOMContentLoaded', () => {
  loadLevelData();
});
