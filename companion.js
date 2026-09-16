// Klausur-Trainingslager Engine & Plotter

class TrainingPlotter {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');

    this.mode = 'mat-a'; // 'mat-a', 'mat-b', 'mat-c', 'schar', 'bach'
    this.originX = 300;
    this.originY = 240;
    this.scale = 55;

    this.isDragging = false;
    this.lastMouseX = 0;
    this.lastMouseY = 0;

    this.initEvents();
    this.resizeCanvas();
    this.draw();
  }

  setMode(newMode) {
    this.mode = newMode;
    const w = this.canvas.width || 600;
    const h = this.canvas.height || 480;

    if (newMode.startsWith('mat-')) {
      this.originX = w / 2;
      this.originY = h / 2;
      this.scale = 55;
    } else if (newMode === 'schar') {
      this.originX = w / 2 - 40;
      this.originY = h / 2 + 30;
      this.scale = 40;
    } else if (newMode === 'bach') {
      this.originX = w / 2;
      this.originY = h - 90;
      this.scale = 80;
    }
    this.draw();
  }

  resizeCanvas() {
    if (!this.canvas) return;
    const rect = this.canvas.parentElement.getBoundingClientRect();
    this.canvas.width = rect.width || 600;
    this.canvas.height = 480;
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

    window.addEventListener('mouseup', () => { this.isDragging = false; });

    this.canvas.addEventListener('wheel', (e) => {
      e.preventDefault();
      const zoomFactor = e.deltaY < 0 ? 1.15 : 0.85;
      const newScale = Math.max(15, Math.min(240, this.scale * zoomFactor));
      const mx = e.offsetX;
      const my = e.offsetY;
      this.originX = mx - (mx - this.originX) * (newScale / this.scale);
      this.originY = my - (my - this.originY) * (newScale / this.scale);
      this.scale = newScale;
      this.draw();
    }, { passive: false });
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

    // Background
    ctx.fillStyle = "#060913";
    ctx.fillRect(0, 0, w, h);

    // Grid
    const startX = Math.floor(this.toMathX(0));
    const endX = Math.ceil(this.toMathX(w));
    const startY = Math.floor(this.toMathY(h));
    const endY = Math.ceil(this.toMathY(0));

    ctx.lineWidth = 1;
    ctx.strokeStyle = "#131d33";
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

    // Coordinate axes
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = "#38bdf8";
    ctx.beginPath();
    ctx.moveTo(0, this.originY); ctx.lineTo(w, this.originY);
    ctx.moveTo(this.originX, 0); ctx.lineTo(this.originX, h);
    ctx.stroke();

    // Axis Labels
    ctx.fillStyle = "#64748b";
    ctx.font = "11px monospace";
    ctx.textAlign = "center";
    for (let x = startX; x <= endX; x++) {
      if (x === 0) continue;
      ctx.fillText(x, this.toScreenX(x), this.originY + 14);
    }
    ctx.textAlign = "right";
    for (let y = startY; y <= endY; y++) {
      if (y === 0) continue;
      ctx.fillText(y, this.originX - 6, this.toScreenY(y) + 4);
    }
    ctx.fillText("0", this.originX - 6, this.originY + 14);

    if (this.mode === 'mat-a') {
      this.drawGraphA(ctx, w, h);
    } else if (this.mode === 'mat-b') {
      this.drawGraphB(ctx, w, h);
    } else if (this.mode === 'mat-c') {
      this.drawGraphC(ctx, w, h);
    } else if (this.mode === 'schar') {
      this.drawSchar(ctx, w, h);
    } else if (this.mode === 'bach') {
      this.drawBach(ctx, w, h);
    }
  }

  // --- GRAPH A: f_1(x) = x³ - 3x² + 2 ---
  drawGraphA(ctx, w, h) {
    const f1 = (x) => Math.pow(x, 3) - 3 * Math.pow(x, 2) + 2;
    this.drawCurve(ctx, w, f1, "#38bdf8", 3.5);

    // Key Points from Matrix A
    this.drawPoint(ctx, 0, 2, "#facc15", "H(0 | 2) Hochpunkt & y-Schnitt", "left");
    this.drawPoint(ctx, 2, -2, "#f43f5e", "T(2 | -2) Tiefpunkt", "right");
    this.drawPoint(ctx, 1, 0, "#a855f7", "W(1 | 0) Wendepunkt", "left");

    // Title Badge
    ctx.fillStyle = "#38bdf8";
    ctx.font = "bold 13px sans-serif";
    ctx.textAlign = "left";
    ctx.fillText("Graph 1 zu Matrix A: f(x) = x³ - 3x² + 2", 15, 25);
    ctx.fillStyle = "#94a3b8";
    ctx.font = "11px sans-serif";
    ctx.fillText("Zeile 1: [0 0 0 1 | 2] -> f(0)=2 | Zeile 3: [12 4 1 0 | 0] -> f'(2)=0", 15, 42);
  }

  // --- GRAPH B: f_2(x) = -x³ + 3x ---
  drawGraphB(ctx, w, h) {
    const f2 = (x) => -Math.pow(x, 3) + 3 * x;
    this.drawCurve(ctx, w, f2, "#2dd4bf", 3.5);

    // Key Points from Matrix B
    this.drawPoint(ctx, 0, 0, "#facc15", "W(0 | 0) Ursprung & Wendepunkt", "left");
    this.drawPoint(ctx, 1, 2, "#38bdf8", "H(1 | 2) Hochpunkt", "left");
    this.drawPoint(ctx, -1, -2, "#f43f5e", "T(-1 | -2) Tiefpunkt", "right");

    // Title Badge
    ctx.fillStyle = "#2dd4bf";
    ctx.font = "bold 13px sans-serif";
    ctx.textAlign = "left";
    ctx.fillText("Graph 2 zu Matrix B: f(x) = -x³ + 3x (Punktsymmetrisch!)", 15, 25);
    ctx.fillStyle = "#94a3b8";
    ctx.font = "11px sans-serif";
    ctx.fillText("Zeile 2: [0 2 0 0 | 0] -> f''(0)=0 | Zeile 4: [3 2 1 0 | 0] -> f'(1)=0", 15, 42);
  }

  // --- GRAPH C: f_3(x) = x³ - 3x² + 3x ---
  drawGraphC(ctx, w, h) {
    const f3 = (x) => Math.pow(x, 3) - 3 * Math.pow(x, 2) + 3 * x;
    this.drawCurve(ctx, w, f3, "#f97316", 3.5);

    // Key Points from Matrix C
    this.drawPoint(ctx, 0, 0, "#facc15", "O(0 | 0) Ursprung", "left");
    this.drawPoint(ctx, 1, 1, "#ec4899", "S(1 | 1) SATTELPUNKT (f'(1)=0 & f''(1)=0)", "left");

    // Waagerechte Tangente at Sattelpunkt
    ctx.strokeStyle = "#ec4899";
    ctx.lineWidth = 1.5;
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    ctx.moveTo(this.toScreenX(-0.5), this.toScreenY(1));
    ctx.lineTo(this.toScreenX(2.5), this.toScreenY(1));
    ctx.stroke();
    ctx.setLineDash([]);

    // Title Badge
    ctx.fillStyle = "#f97316";
    ctx.font = "bold 13px sans-serif";
    ctx.textAlign = "left";
    ctx.fillText("Graph 3 zu Matrix C: f(x) = x³ - 3x² + 3x (mit Sattelpunkt!)", 15, 25);
    ctx.fillStyle = "#94a3b8";
    ctx.font = "11px sans-serif";
    ctx.fillText("Zeilen 2 & 3: f'(1)=0 UND f''(1)=0 -> Klassischer Sattelpunkt!", 15, 42);
  }

  // --- FUNKTIONSSCHAR BESTIMMEN ---
  drawSchar(ctx, w, h) {
    const ft = (x, t) => t * Math.pow(x, 3) - 3 * t * Math.pow(x, 2) - 9 * t * x + (11 * t + 2);
    const tValues = [
      { t: 0.5, color: "#38bdf8" },
      { t: 1.0, color: "#a855f7" },
      { t: -0.5, color: "#f97316" }
    ];
    tValues.forEach(item => {
      this.drawCurve(ctx, w, (x) => ft(x, item.t), item.color, 2);
    });
    this.drawPoint(ctx, 1, 2, "#facc15", "W(1|2) Fester Wendepunkt", "left");
  }

  // --- BACHAUFGABE ---
  drawBach(ctx, w, h) {
    const f = (x) => (1/5)*Math.pow(x, 4) - (2/5)*Math.pow(x, 2) - 0.5*x + 2;
    const g = (x) => (1/10)*Math.pow(x, 4) - (1/5)*Math.pow(x, 2) - 0.5*x + 1;
    this.drawCurve(ctx, w, f, "#38bdf8", 3);
    this.drawCurve(ctx, w, g, "#2dd4bf", 3);
  }

  drawCurve(ctx, w, func, color = "#38bdf8", lineWidth = 3) {
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.beginPath();
    let isDrawing = false;
    for (let px = 0; px <= w; px += 2) {
      const mx = this.toMathX(px);
      const my = func(mx);
      if (isNaN(my) || !isFinite(my) || Math.abs(my) > 60) {
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
  }

  drawPoint(ctx, x, y, color, label, align) {
    const sx = this.toScreenX(x);
    const sy = this.toScreenY(y);
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(sx, sy, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 11px sans-serif";
    ctx.textAlign = align === "right" ? "right" : "left";
    const offset = align === "right" ? -10 : 10;
    ctx.fillText(label, sx + offset, sy - 5);
  }
}

let plotter = null;

function switchTask(mode) {
  if (plotter) plotter.setMode(mode);

  document.querySelectorAll('.task-tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.task === mode);
  });

  document.querySelectorAll('.task-content-block').forEach(block => {
    block.style.display = block.id === `view-${mode}` ? 'block' : 'none';
  });

  if (window.renderMathInElement) {
    const activeBlock = document.getElementById(`view-${mode}`);
    if (activeBlock) {
      renderMathInElement(activeBlock, {
        delimiters: [
          { left: '$$', right: '$$', display: true },
          { left: '$', right: '$', display: false }
        ],
        throwOnError: false
      });
    }
  }
}

function showGraphPreview(graphMode) {
  if (plotter) {
    plotter.setMode(graphMode);
  }
  document.querySelectorAll('.btn-preview-graph').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.graph === graphMode);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  plotter = new TrainingPlotter('companionCanvas');

  document.querySelectorAll('.task-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      switchTask(btn.dataset.task);
    });
  });

  document.querySelectorAll('.btn-preview-graph').forEach(btn => {
    btn.addEventListener('click', () => {
      showGraphPreview(btn.dataset.graph);
    });
  });

  if (window.renderMathInElement) {
    renderMathInElement(document.body, {
      delimiters: [
        { left: '$$', right: '$$', display: true },
        { left: '$', right: '$', display: false }
      ],
      throwOnError: false
    });
  }
});
