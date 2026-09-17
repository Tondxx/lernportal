const CoulombSim = {
  canvas: null,
  ctx: null,
  q1: 5.0, // microCoulomb
  q2: -5.0, // microCoulomb
  r: 0.10, // meter (10 cm)
  isInitialized: false,

  init() {
    this.canvas = document.getElementById('coulombCanvas');
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.isInitialized = true;
    this.bindEvents();
    this.draw();
  },

  bindEvents() {
    const sQ1 = document.getElementById('coulombSliderQ1');
    const sQ2 = document.getElementById('coulombSliderQ2');
    const sR = document.getElementById('coulombSliderR');

    if (sQ1) sQ1.addEventListener('input', (e) => {
      this.q1 = parseFloat(e.target.value);
      const valEl = document.getElementById('valCoulombQ1');
      if (valEl) valEl.textContent = (this.q1 >= 0 ? '+' : '') + this.q1.toFixed(1) + ' µC';
      this.draw();
    });

    if (sQ2) sQ2.addEventListener('input', (e) => {
      this.q2 = parseFloat(e.target.value);
      const valEl = document.getElementById('valCoulombQ2');
      if (valEl) valEl.textContent = (this.q2 >= 0 ? '+' : '') + this.q2.toFixed(1) + ' µC';
      this.draw();
    });

    if (sR) sR.addEventListener('input', (e) => {
      this.r = parseFloat(e.target.value) / 100.0;
      const valEl = document.getElementById('valCoulombR');
      if (valEl) valEl.textContent = (this.r * 100).toFixed(0) + ' cm';
      this.draw();
    });
  },

  draw() {
    if (!this.canvas || !this.ctx) return;
    const ctx = this.ctx;
    const w = this.canvas.width;
    const h = this.canvas.height;

    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = '#0b1120';
    ctx.fillRect(0, 0, w, h);

    const centerY = h / 2 + 15;
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 2;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(30, centerY);
    ctx.lineTo(w - 30, centerY);
    ctx.stroke();
    ctx.setLineDash([]);

    const minPixelDist = 80;
    const maxPixelDist = w - 160;
    const tDist = (this.r - 0.02) / (0.20 - 0.02);
    const pixelDist = minPixelDist + tDist * (maxPixelDist - minPixelDist);

    const x1 = (w - pixelDist) / 2;
    const x2 = x1 + pixelDist;
    const sphereRadius = 24;

    const k = 8.98755e9;
    const q1Coulomb = this.q1 * 1e-6;
    const q2Coulomb = this.q2 * 1e-6;
    const forceMagnitude = k * (Math.abs(q1Coulomb * q2Coulomb) / (this.r * this.r));
    const isRepulsive = (this.q1 * this.q2) > 0;
    const isZero = (this.q1 === 0 || this.q2 === 0);

    // Distance Arrow
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 1.5;
    const dimY = centerY + 55;
    ctx.beginPath();
    ctx.moveTo(x1, dimY);
    ctx.lineTo(x2, dimY);
    ctx.moveTo(x1, dimY - 6);
    ctx.lineTo(x1, dimY + 6);
    ctx.moveTo(x2, dimY - 6);
    ctx.lineTo(x2, dimY + 6);
    ctx.stroke();

    ctx.fillStyle = '#cbd5e1';
    ctx.font = '12px Segoe UI, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Abstand r = ' + (this.r * 100).toFixed(0) + ' cm (' + this.r.toFixed(2) + ' m)', (x1 + x2) / 2, dimY - 8);

    // Force Vectors
    if (!isZero && forceMagnitude > 1e-4) {
      const refF = 25.0;
      const arrowLen = Math.min(100, Math.max(18, Math.sqrt(forceMagnitude / refF) * 45));
      const dir1 = isRepulsive ? -1 : 1;
      const dir2 = isRepulsive ? 1 : -1;
      const arrowColor = isRepulsive ? '#f43f5e' : '#38bdf8';

      this.drawArrow(ctx, x1, centerY - 38, x1 + dir1 * arrowLen, centerY - 38, arrowColor, 'FC');
      this.drawArrow(ctx, x2, centerY - 38, x2 + dir2 * arrowLen, centerY - 38, arrowColor, 'FC');
    }

    // Draw Spheres
    this.drawSphere(ctx, x1, centerY, sphereRadius, this.q1, 'Q1');
    this.drawSphere(ctx, x2, centerY, sphereRadius, this.q2, 'Q2');

    // Update Result Box in UI
    const resEl = document.getElementById('coulombResultBox');
    if (resEl) {
      let statusText = '';
      if (isZero) {
        statusText = '<span style="color: #94a3b8;">Keine Coulomb-Kraft (eine Ladung ist 0)</span>';
      } else if (isRepulsive) {
        statusText = '<span style="color: #f43f5e; font-weight: 700;">⚡ Gleichnamige Ladungen &rarr; ABSTO&szlig;UNG</span>';
      } else {
        statusText = '<span style="color: #38bdf8; font-weight: 700;">🧲 Ungleichnamige Ladungen &rarr; ANZIEHUNG</span>';
      }

      let fStr = '';
      if (forceMagnitude >= 1000) {
        fStr = (forceMagnitude / 1000).toFixed(2) + ' kN (' + forceMagnitude.toFixed(0) + ' N)';
      } else if (forceMagnitude >= 1) {
        fStr = forceMagnitude.toFixed(3) + ' N';
      } else {
        fStr = (forceMagnitude * 1000).toFixed(2) + ' mN';
      }

      resEl.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
          <div>${statusText}</div>
          <div style="font-size: 1.15rem; font-weight: 800; color: #f8fafc;">
            F<sub style="font-size:0.75rem;">C</sub> = <span style="color: #38bdf8;">${fStr}</span>
          </div>
        </div>
        <div style="margin-top: 6px; font-size: 0.78rem; color: #94a3b8; font-family: monospace;">
          F<sub style="font-size:0.65rem;">C</sub> = [1 / (4&pi;&epsilon;<sub>0</sub>)] &bull; (|Q<sub>1</sub> &bull; Q<sub>2</sub>| / r&sup2;) = 8,988&bull;10<sup>9</sup> &bull; (|${this.q1}&mu;C &bull; ${this.q2}&mu;C| / (${(this.r*100).toFixed(0)}cm)&sup2;)
        </div>
      `;
    }
  },

  drawSphere(ctx, x, y, r, q, label) {
    ctx.save();
    let fillColor = '#64748b';
    let strokeColor = '#94a3b8';
    let signStr = '0';

    if (q > 0) {
      fillColor = '#ef4444';
      strokeColor = '#fca5a5';
      signStr = '+' + q.toFixed(1) + ' µC';
    } else if (q < 0) {
      fillColor = '#3b82f6';
      strokeColor = '#93c5fd';
      signStr = q.toFixed(1) + ' µC';
    }

    ctx.shadowBlur = 15;
    ctx.shadowColor = strokeColor;

    const grad = ctx.createRadialGradient(x - r/3, y - r/3, r/6, x, y, r);
    grad.addColorStop(0, '#ffffff');
    grad.addColorStop(0.3, strokeColor);
    grad.addColorStop(1, fillColor);

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();

    ctx.shadowBlur = 0;
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 13px Segoe UI, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(label, x, y);

    ctx.font = '11px Segoe UI, sans-serif';
    ctx.fillStyle = '#e2e8f0';
    ctx.fillText(signStr, x, y + r + 14);

    ctx.restore();
  },

  drawArrow(ctx, fromX, fromY, toX, toY, color, label) {
    const headLen = 10;
    const dx = toX - fromX;
    const dy = toY - fromY;
    const angle = Math.atan2(dy, dx);

    ctx.save();
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = 3;

    ctx.beginPath();
    ctx.moveTo(fromX, fromY);
    ctx.lineTo(toX, toY);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(toX, toY);
    ctx.lineTo(toX - headLen * Math.cos(angle - Math.PI / 6), toY - headLen * Math.sin(angle - Math.PI / 6));
    ctx.lineTo(toX - headLen * Math.cos(angle + Math.PI / 6), toY - headLen * Math.sin(angle + Math.PI / 6));
    ctx.closePath();
    ctx.fill();

    ctx.font = 'bold 12px Segoe UI, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(label, (fromX + toX) / 2, fromY - 8);
    ctx.restore();
  }
};

// --- 2. PLATTENKONDENSATOR & ELEKTRONENSTRAHL-SIMULATOR ---
const EFieldSim = {
  canvas: null,
  ctx: null,
  u: 500,
  d: 0.05,
  polarity: 1,
  particles: [],
  animId: null,
  isInitialized: false,

  init() {
    this.canvas = document.getElementById('efeldCanvas');
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.isInitialized = true;
    this.bindEvents();
    this.startLoop();
  },

  bindEvents() {
    const sU = document.getElementById('efeldSliderU');
    const sD = document.getElementById('efeldSliderD');
    const btnFire = document.getElementById('btnEfeldFire');
    const btnStream = document.getElementById('btnEfeldStream');
    const btnPolarity = document.getElementById('btnEfeldPolarity');

    if (sU) sU.addEventListener('input', (e) => {
      this.u = parseFloat(e.target.value);
      const valEl = document.getElementById('valEfeldU');
      if (valEl) valEl.textContent = this.u.toFixed(0) + ' V';
      this.updateStatus();
    });

    if (sD) sD.addEventListener('input', (e) => {
      this.d = parseFloat(e.target.value) / 100.0;
      const valEl = document.getElementById('valEfeldD');
      if (valEl) valEl.textContent = (this.d * 100).toFixed(1) + ' cm';
      this.updateStatus();
    });

    if (btnFire) btnFire.addEventListener('click', () => {
      this.fireElectron();
    });

    if (btnStream) {
      let isStreaming = false;
      let streamInterval = null;
      btnStream.addEventListener('click', () => {
        isStreaming = !isStreaming;
        btnStream.textContent = isStreaming ? '⏹️ Dauerstrahl stoppen' : '⚡ Dauerhafter Elektronenstrahl';
        btnStream.classList.toggle('active', isStreaming);
        if (isStreaming) {
          streamInterval = setInterval(() => this.fireElectron(), 120);
        } else {
          clearInterval(streamInterval);
        }
      });
    }

    if (btnPolarity) {
      btnPolarity.addEventListener('click', () => {
        this.polarity *= -1;
        btnPolarity.textContent = this.polarity > 0 ? '🔄 Polung: (+) Oben / (-) Unten' : '🔄 Polung: (-) Oben / (+) Unten';
        this.updateStatus();
      });
    }

    this.updateStatus();
  },

  fireElectron() {
    if (!this.canvas) return;
    const h = this.canvas.height;
    this.particles.push({
      x: 30,
      y: h / 2,
      vx: 4.8,
      vy: 0,
      history: [],
      dead: false
    });
  },

  updateStatus() {
    const eField = this.u / this.d;
    const resEl = document.getElementById('efeldResultBox');
    if (resEl) {
      let eStr = '';
      if (eField >= 1000) {
        eStr = (eField / 1000).toFixed(2) + ' kV/m (' + (eField / 1000).toFixed(2) + ' kN/C)';
      } else {
        eStr = eField.toFixed(1) + ' V/m';
      }

      resEl.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
          <div>
            <span style="color: #06b6d4; font-weight: 700;">⚡ Homogenes E-Feld im Plattenkondensator</span>
          </div>
          <div style="font-size: 1.15rem; font-weight: 800; color: #f8fafc;">
            E = U / d = <span style="color: #38bdf8;">${eStr}</span>
          </div>
        </div>
        <div style="margin-top: 4px; font-size: 0.78rem; color: #94a3b8;">
          Elektronen-Kraft: F<sub style="font-size:0.65rem;">el</sub> = e &bull; E &bull; Beschleunigung: a<sub style="font-size:0.65rem;">y</sub> = F<sub style="font-size:0.65rem;">el</sub> / m<sub style="font-size:0.65rem;">e</sub> &rarr; Parabelbahn y(x) &prop; x&sup2;
        </div>
      `;
    }
  },

  startLoop() {
    const loop = () => {
      this.updatePhysics();
      this.draw();
      this.animId = requestAnimationFrame(loop);
    };
    loop();
  },

  updatePhysics() {
    const w = this.canvas.width;
    const h = this.canvas.height;
    const plateLeft = 110;
    const plateRight = w - 90;

    const tD = (this.d - 0.02) / (0.10 - 0.02);
    const canvasD = 60 + tD * 120;
    const topPlateY = (h - canvasD) / 2;
    const botPlateY = (h + canvasD) / 2;

    const eField = this.u / this.d;
    const accelFactor = (eField / 20000) * 0.18 * (-this.polarity);

    for (let p of this.particles) {
      if (p.dead) continue;

      p.history.push({ x: p.x, y: p.y });
      if (p.history.length > 40) p.history.shift();

      p.x += p.vx;

      if (p.x >= plateLeft && p.x <= plateRight) {
        p.vy += accelFactor;
      }
      p.y += p.vy;

      if (p.x >= plateLeft && p.x <= plateRight) {
        if (p.y <= topPlateY + 5 || p.y >= botPlateY - 5) {
          p.dead = true;
        }
      }

      if (p.x > w + 20 || p.y < -30 || p.y > h + 30) {
        p.dead = true;
      }
    }

    this.particles = this.particles.filter(p => !p.dead);
  },

  draw() {
    if (!this.canvas || !this.ctx) return;
    const ctx = this.ctx;
    const w = this.canvas.width;
    const h = this.canvas.height;

    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = '#0b1120';
    ctx.fillRect(0, 0, w, h);

    const plateLeft = 110;
    const plateRight = w - 90;
    const tD = (this.d - 0.02) / (0.10 - 0.02);
    const canvasD = 60 + tD * 120;
    const topPlateY = (h - canvasD) / 2;
    const botPlateY = (h + canvasD) / 2;
    const plateHeight = 12;

    const numLines = Math.max(3, Math.min(18, Math.round((this.u / 1000) * 15)));
    if (this.u > 0) {
      const lineStep = (plateRight - plateLeft - 40) / (numLines + 1);
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.45)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([3, 3]);

      for (let i = 1; i <= numLines; i++) {
        const lx = plateLeft + 20 + i * lineStep;
        ctx.beginPath();
        ctx.moveTo(lx, topPlateY + plateHeight);
        ctx.lineTo(lx, botPlateY);
        ctx.stroke();

        const arrowY = (topPlateY + botPlateY) / 2;
        const arrowDir = this.polarity > 0 ? 1 : -1;
        ctx.save();
        ctx.fillStyle = '#38bdf8';
        ctx.beginPath();
        ctx.moveTo(lx, arrowY + arrowDir * 6);
        ctx.lineTo(lx - 4, arrowY - arrowDir * 4);
        ctx.lineTo(lx + 4, arrowY - arrowDir * 4);
        ctx.fill();
        ctx.restore();
      }
      ctx.setLineDash([]);
    }

    // Top Plate
    const topColor = this.polarity > 0 ? '#ef4444' : '#3b82f6';
    const topSign = this.polarity > 0 ? '+ + + + + + + + + + +' : '- - - - - - - - - - -';
    ctx.fillStyle = topColor;
    ctx.fillRect(plateLeft, topPlateY, plateRight - plateLeft, plateHeight);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 11px Segoe UI, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(topSign, (plateLeft + plateRight) / 2, topPlateY + 9);

    // Bottom Plate
    const botColor = this.polarity > 0 ? '#3b82f6' : '#ef4444';
    const botSign = this.polarity > 0 ? '- - - - - - - - - - -' : '+ + + + + + + + + + +';
    ctx.fillStyle = botColor;
    ctx.fillRect(plateLeft, botPlateY, plateRight - plateLeft, plateHeight);
    ctx.fillStyle = '#ffffff';
    ctx.fillText(botSign, (plateLeft + plateRight) / 2, botPlateY + 9);

    // Electron Gun
    ctx.fillStyle = '#475569';
    ctx.fillRect(20, h / 2 - 14, 50, 28);
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(70, h / 2 - 6, 16, 12);
    ctx.fillStyle = '#cbd5e1';
    ctx.font = '10px Segoe UI, sans-serif';
    ctx.fillText('e\u207b-Quelle', 45, h / 2 + 3);

    // Screen
    ctx.fillStyle = '#334155';
    ctx.fillRect(w - 40, 40, 10, h - 80);
    ctx.fillStyle = '#94a3b8';
    ctx.font = '10px Segoe UI, sans-serif';
    ctx.fillText('Schirm', w - 35, 30);

    // Distance annotation d
    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(plateRight + 18, topPlateY);
    ctx.lineTo(plateRight + 18, botPlateY + plateHeight);
    ctx.moveTo(plateRight + 12, topPlateY);
    ctx.lineTo(plateRight + 24, topPlateY);
    ctx.moveTo(plateRight + 12, botPlateY + plateHeight);
    ctx.lineTo(plateRight + 24, botPlateY + plateHeight);
    ctx.stroke();

    ctx.fillStyle = '#94a3b8';
    ctx.font = '11px Segoe UI, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('d = ' + (this.d * 100).toFixed(1) + ' cm', plateRight + 26, (topPlateY + botPlateY) / 2 + 4);

    // Draw Particles & Trails
    for (let p of this.particles) {
      if (p.history.length > 1) {
        ctx.strokeStyle = 'rgba(250, 204, 21, 0.7)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(p.history[0].x, p.history[0].y);
        for (let pt of p.history) {
          ctx.lineTo(pt.x, pt.y);
        }
        ctx.stroke();
      }

      if (!p.dead) {
        ctx.save();
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#facc15';
        ctx.fillStyle = '#fef08a';
        ctx.beginPath();
        ctx.arc(p.x, p.y, 4.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }
  }
};

// --- 3. VIRTUELLES ELEKTROSKOP & INFLUENZ-SIMULATOR ---
const ElectroscopeSim = {
  canvas: null,
  ctx: null,
  rodDist: 12.0,
  rodCharge: -1,
  isGrounded: false,
  isChargedRemanent: 0,
  isInitialized: false,

  init() {
    this.canvas = document.getElementById('electroscopeCanvas');
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.isInitialized = true;
    this.bindEvents();
    this.draw();
  },

  bindEvents() {
    const sDist = document.getElementById('rodDistSlider');
    const btnToggleRod = document.getElementById('btnToggleRodCharge');
    const btnGround = document.getElementById('btnGroundElectroscope');
    const btnReset = document.getElementById('btnResetElectroscope');

    if (sDist) sDist.addEventListener('input', (e) => {
      this.rodDist = parseFloat(e.target.value);
      const valEl = document.getElementById('valRodDist');
      if (valEl) valEl.textContent = this.rodDist.toFixed(1) + ' cm';
      this.draw();
    });

    if (btnToggleRod) btnToggleRod.addEventListener('click', () => {
      this.rodCharge *= -1;
      btnToggleRod.textContent = this.rodCharge < 0 ? '⚡ Stab: Negativ (-)' : '⚡ Stab: Positiv (+)';
      this.draw();
    });

    if (btnGround) btnGround.addEventListener('click', () => {
      this.isGrounded = true;
      this.isChargedRemanent = -this.rodCharge * (1.0 - Math.min(1.0, this.rodDist / 15.0));
      this.draw();
      setTimeout(() => {
        this.isGrounded = false;
        this.draw();
      }, 500);
    });

    if (btnReset) btnReset.addEventListener('click', () => {
      this.isChargedRemanent = 0;
      this.isGrounded = false;
      this.draw();
    });
  },

  draw() {
    if (!this.canvas || !this.ctx) return;
    const ctx = this.ctx;
    const w = this.canvas.width;
    const h = this.canvas.height;

    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = '#0b1120';
    ctx.fillRect(0, 0, w, h);

    const centerX = w / 2 + 40;
    const plateY = 80;
    const housingY = 160;
    const housingRadius = 75;

    const proximity = Math.max(0, 1.0 - (this.rodDist / 15.0));
    const inducedFactor = proximity * this.rodCharge;

    let plateNetQ = -inducedFactor + (this.isChargedRemanent * 0.4);
    let leafNetQ = (this.isGrounded ? 0 : inducedFactor) + (this.isChargedRemanent * 0.6);

    const deflectionDeg = Math.min(55, Math.abs(leafNetQ) * 50);
    const deflectionRad = (deflectionDeg * Math.PI) / 180;

    // Housing
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.arc(centerX, housingY, housingRadius, 0, Math.PI * 2);
    ctx.stroke();

    // Base Stand
    ctx.fillStyle = '#334155';
    ctx.fillRect(centerX - 35, housingY + housingRadius, 70, 14);
    ctx.fillRect(centerX - 5, housingY + housingRadius - 15, 10, 20);

    // Insulator bushing
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(centerX - 16, plateY + 12, 32, 16);

    // Conductor Plate
    ctx.fillStyle = '#e2e8f0';
    ctx.beginPath();
    ctx.roundRect(centerX - 55, plateY, 110, 14, 6);
    ctx.fill();
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Metal Rod
    ctx.fillStyle = '#cbd5e1';
    ctx.fillRect(centerX - 4, plateY + 14, 8, housingRadius + 20);

    // Pointer / Leaf
    const pivotX = centerX + 4;
    const pivotY = housingY - 20;
    const pointerLen = 70;

    ctx.save();
    ctx.translate(pivotX, pivotY);
    ctx.rotate(deflectionRad);
    ctx.strokeStyle = '#facc15';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, pointerLen);
    ctx.stroke();
    ctx.fillStyle = '#facc15';
    ctx.beginPath();
    ctx.arc(0, pointerLen, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Scale markings
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 1;
    for (let a = 0; a <= 50; a += 10) {
      const rad = (a * Math.PI) / 180;
      const sx = pivotX + Math.sin(rad) * 65;
      const sy = pivotY + Math.cos(rad) * 65;
      ctx.beginPath();
      ctx.moveTo(sx, sy);
      ctx.lineTo(sx + Math.sin(rad) * 6, sy + Math.cos(rad) * 6);
      ctx.stroke();
    }

    // Charges
    this.drawChargeSymbols(ctx, centerX - 40, centerX + 40, plateY - 14, plateNetQ);
    if (!this.isGrounded && Math.abs(leafNetQ) > 0.08) {
      this.drawChargeSymbols(ctx, centerX - 12, centerX + 18, housingY + 20, leafNetQ);
    }

    // Charged Rod
    const rodW = 120;
    const rodH = 22;
    const rodX = (centerX - 70) - (this.rodDist * 10);
    const rodY = plateY - 18;

    ctx.save();
    ctx.fillStyle = this.rodCharge < 0 ? '#3b82f6' : '#ef4444';
    ctx.shadowBlur = 12;
    ctx.shadowColor = this.rodCharge < 0 ? '#60a5fa' : '#f87171';
    ctx.beginPath();
    ctx.roundRect(rodX - rodW, rodY, rodW, rodH, 8);
    ctx.fill();
    ctx.shadowBlur = 0;

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 11px Segoe UI, sans-serif';
    ctx.textAlign = 'center';
    const rodSignStr = this.rodCharge < 0 ? '---- Reibestab (-) ----' : '++++ Glasstab (+) ++++';
    ctx.fillText(rodSignStr, rodX - rodW / 2, rodY + 15);
    ctx.restore();

    if (this.isGrounded) {
      ctx.fillStyle = '#10b981';
      ctx.font = 'bold 13px Segoe UI, sans-serif';
      ctx.fillText('👉 Finger berührt Teller (Erdung!)', centerX + 70, plateY + 10);
    }

    const resEl = document.getElementById('electroscopeResultBox');
    if (resEl) {
      let explanation = '';
      if (this.isGrounded) {
        explanation = '<strong style="color:#10b981;">Erdung aktiv:</strong> Überschüssige Elektronen fließen über den Körper ab. Zeiger fällt zusammen!';
      } else if (this.rodDist < 2.0 && this.isChargedRemanent !== 0) {
        explanation = '<strong style="color:#38bdf8;">Remanente Aufladung:</strong> Das Elektroskop ist nach der Trennung dauerhaft geladen!';
      } else if (proximity > 0.1) {
        if (this.rodCharge < 0) {
          explanation = '<strong style="color:#38bdf8;">Influenz (Ladungsverschiebung):</strong> Der negative Stab stößt freie Leitungselektronen im Metall nach unten in den Zeiger ab. Zeiger und Träger stoßen sich gleichnamig ab (Ausschlag &alpha; = ' + deflectionDeg.toFixed(0) + '&deg;)!';
        } else {
          explanation = '<strong style="color:#ef4444;">Influenz:</strong> Der positive Stab zieht Elektronen auf den Teller nach oben. Unten verbleibt ein Elektronenmangel (+), Zeiger schlägt aus (&alpha; = ' + deflectionDeg.toFixed(0) + '&deg;)!';
        }
      } else {
        if (this.isChargedRemanent !== 0) {
          explanation = '<strong style="color:#f59e0b;">Dauerhaft geladen:</strong> Stab ist weg, aber das Elektroskop behält seine Überschussladung (Zeigerausschlag &alpha; = ' + deflectionDeg.toFixed(0) + '&deg;).';
        } else {
          explanation = 'Bewege den Stab mit dem Schieberegler näher an den Elektroskop-Teller, um Influenz zu beobachten.';
        }
      }

      resEl.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; gap: 8px;">
          <span style="font-size: 0.95rem; font-weight: 700; color: #f8fafc;">
            Zeigerausschlag: <span style="color: #facc15;">&alpha; &asymp; ${deflectionDeg.toFixed(0)}&deg;</span>
          </span>
        </div>
        <div style="margin-top: 5px; font-size: 0.8rem; color: #cbd5e1; line-height: 1.4;">
          ${explanation}
        </div>
      `;
    }
  },

  drawChargeSymbols(ctx, startX, endX, y, netQ) {
    if (Math.abs(netQ) < 0.08) return;
    const isPos = netQ > 0;
    const sym = isPos ? '+' : '\u2212';
    const color = isPos ? '#ef4444' : '#38bdf8';
    const count = Math.min(6, Math.max(2, Math.round(Math.abs(netQ) * 5)));
    const step = (endX - startX) / (count + 1);

    ctx.fillStyle = color;
    ctx.font = 'bold 14px Segoe UI, sans-serif';
    ctx.textAlign = 'center';
    for (let i = 1; i <= count; i++) {
      ctx.fillText(sym, startX + i * step, y);
    }
  }
};

// --- 4. KONDENSATOR-ENTLADUNG & I(t)-PLOTTER ---
const CircuitSim = {
  canvas: null,
  ctx: null,
  c_uF: 470,
  r_ohm: 200,
  u0: 10,
  state: 'charged',
  t: 0,
  history: [],
  animId: null,
  isInitialized: false,

  init() {
    this.canvas = document.getElementById('circuitCanvas');
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.isInitialized = true;
    this.bindEvents();
    this.draw();
  },

  bindEvents() {
    const sC = document.getElementById('circuitSliderC');
    const sR = document.getElementById('circuitSliderR');
    const btnCharge = document.getElementById('btnCircuitCharge');
    const btnDischarge = document.getElementById('btnCircuitDischarge');

    if (sC) sC.addEventListener('input', (e) => {
      this.c_uF = parseFloat(e.target.value);
      const valEl = document.getElementById('valCircuitC');
      if (valEl) valEl.textContent = this.c_uF.toFixed(0) + ' µF';
      this.updateStatus();
    });

    if (sR) sR.addEventListener('input', (e) => {
      this.r_ohm = parseFloat(e.target.value);
      const valEl = document.getElementById('valCircuitR');
      if (valEl) valEl.textContent = this.r_ohm.toFixed(0) + ' \u03a9';
      this.updateStatus();
    });

    if (btnCharge) btnCharge.addEventListener('click', () => {
      this.state = 'charged';
      this.t = 0;
      this.history = [];
      if (this.animId) cancelAnimationFrame(this.animId);
      this.draw();
      this.updateStatus();
    });

    if (btnDischarge) btnDischarge.addEventListener('click', () => {
      this.startDischarge();
    });

    this.updateStatus();
  },

  startDischarge() {
    this.state = 'discharging';
    this.t = 0;
    this.history = [];
    if (this.animId) cancelAnimationFrame(this.animId);

    const tau = (this.r_ohm * this.c_uF * 1e-6);
    const i0 = (this.u0 / this.r_ohm) * 1000;

    const startTime = performance.now();
    const duration = tau * 5 * 1000;

    const step = (now) => {
      const elapsed = (now - startTime) / 1000;
      this.t = elapsed;

      const current_mA = i0 * Math.exp(-elapsed / tau);
      this.history.push({ t: elapsed, i: current_mA });

      this.draw();

      if (elapsed < duration * 0.001 + 0.1) {
        this.animId = requestAnimationFrame(step);
      } else {
        this.state = 'empty';
        this.draw();
      }
    };

    this.animId = requestAnimationFrame(step);
  },

  updateStatus() {
    const tau = (this.r_ohm * this.c_uF * 1e-6);
    const q0_uC = this.c_uF * this.u0;
    const i0_mA = (this.u0 / this.r_ohm) * 1000;

    const resEl = document.getElementById('circuitResultBox');
    if (resEl) {
      resEl.innerHTML = `
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 10px;">
          <div style="background: #1e293b; padding: 6px 10px; border-radius: 6px; border-left: 3px solid #38bdf8;">
            <div style="font-size:0.72rem; color:#94a3b8;">Zeitkonstante &tau; = R &bull; C</div>
            <div style="font-size:0.98rem; font-weight:700; color:#f8fafc;">${(tau * 1000).toFixed(1)} ms (${tau.toFixed(3)} s)</div>
          </div>
          <div style="background: #1e293b; padding: 6px 10px; border-radius: 6px; border-left: 3px solid #10b981;">
            <div style="font-size:0.72rem; color:#94a3b8;">Anfangsstrom I<sub>0</sub> = U<sub>0</sub> / R</div>
            <div style="font-size:0.98rem; font-weight:700; color:#f8fafc;">${i0_mA.toFixed(1)} mA</div>
          </div>
          <div style="background: #1e293b; padding: 6px 10px; border-radius: 6px; border-left: 3px solid #f59e0b;">
            <div style="font-size:0.72rem; color:#94a3b8;">Gesamtladung Q<sub>0</sub> = C &bull; U<sub>0</sub></div>
            <div style="font-size:0.98rem; font-weight:700; color:#f8fafc;">${q0_uC.toFixed(0)} µC = &int; I(t) dt</div>
          </div>
        </div>
      `;
    }
  },

  draw() {
    if (!this.canvas || !this.ctx) return;
    const ctx = this.ctx;
    const w = this.canvas.width;
    const h = this.canvas.height;

    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = '#0b1120';
    ctx.fillRect(0, 0, w, h);

    const tau = (this.r_ohm * this.c_uF * 1e-6);
    const i0 = (this.u0 / this.r_ohm) * 1000;

    this.drawCircuitSchema(ctx, 15, 20, 210, h - 40, tau, i0);
    this.drawGraph(ctx, 245, 20, w - 265, h - 40, tau, i0);
  },

  drawCircuitSchema(ctx, x, y, w, h, tau, i0) {
    ctx.save();
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 1;
    ctx.strokeRect(x, y, w, h);

    ctx.fillStyle = '#94a3b8';
    ctx.font = 'bold 11px Segoe UI, sans-serif';
    ctx.fillText('Stromkreis: Entladung', x + 10, y + 16);

    const cx = x + w / 2;
    const cy = y + h / 2 + 8;
    const rw = 140;
    const rh = 160;
    const left = cx - rw / 2;
    const right = cx + rw / 2;
    const top = cy - rh / 2;
    const bot = cy + rh / 2;

    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(left, top);
    ctx.lineTo(cx - 20, top);
    if (this.state === 'discharging') {
      ctx.lineTo(cx + 20, top);
    } else {
      ctx.lineTo(cx + 15, top - 18);
    }
    ctx.moveTo(cx + 20, top);
    ctx.lineTo(right, top);
    ctx.lineTo(right, bot);
    ctx.lineTo(left, bot);
    ctx.lineTo(left, top);
    ctx.stroke();

    // Capacitor Symbol
    ctx.fillStyle = '#0b1120';
    ctx.fillRect(left - 15, cy - 14, 30, 28);
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(left - 14, cy - 8);
    ctx.lineTo(left + 14, cy - 8);
    ctx.moveTo(left - 14, cy + 8);
    ctx.lineTo(left + 14, cy + 8);
    ctx.stroke();

    ctx.fillStyle = '#38bdf8';
    ctx.font = '10px Segoe UI, sans-serif';
    ctx.fillText('C = ' + this.c_uF.toFixed(0) + ' µF', left - 8, cy + 24);

    // Lamp / Resistor Symbol
    const lampY = cy;
    let lampBrightness = 0;
    if (this.state === 'discharging') {
      const curI = i0 * Math.exp(-this.t / tau);
      lampBrightness = Math.min(1.0, curI / i0);
    }

    ctx.fillStyle = '#0b1120';
    ctx.fillRect(right - 18, lampY - 18, 36, 36);

    if (lampBrightness > 0.05) {
      ctx.save();
      ctx.shadowBlur = 20 * lampBrightness;
      ctx.shadowColor = 'rgba(250, 204, 21, ' + lampBrightness + ')';
      ctx.fillStyle = 'rgba(253, 224, 71, ' + lampBrightness + ')';
      ctx.beginPath();
      ctx.arc(right, lampY, 14, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(right, lampY, 14, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(right - 9, lampY - 9);
    ctx.lineTo(right + 9, lampY + 9);
    ctx.moveTo(right + 9, lampY - 9);
    ctx.lineTo(right - 9, lampY + 9);
    ctx.stroke();

    ctx.fillStyle = '#facc15';
    ctx.font = '10px Segoe UI, sans-serif';
    ctx.fillText('R = ' + this.r_ohm.toFixed(0) + ' \u03a9', right - 4, lampY + 28);

    ctx.restore();
  },

  drawGraph(ctx, gx, gy, gw, gh, tau, i0) {
    ctx.save();
    ctx.fillStyle = '#050811';
    ctx.fillRect(gx, gy, gw, gh);
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 1;
    ctx.strokeRect(gx, gy, gw, gh);

    const padLeft = 45;
    const padBot = 30;
    const plotW = gw - padLeft - 20;
    const plotH = gh - padBot - 30;
    const originX = gx + padLeft;
    const originY = gy + gh - padBot;

    // Grid lines
    ctx.strokeStyle = '#1e293b';
    ctx.setLineDash([2, 4]);
    for (let f = 1; f <= 5; f++) {
      const x = originX + (f / 5) * plotW;
      ctx.beginPath();
      ctx.moveTo(x, originY);
      ctx.lineTo(x, originY - plotH);
      ctx.stroke();

      ctx.fillStyle = '#64748b';
      ctx.font = '10px Segoe UI, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(f + 'τ', x, originY + 14);
    }
    ctx.setLineDash([]);

    // Axes
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(originX, originY);
    ctx.lineTo(originX + plotW + 10, originY);
    ctx.moveTo(originX, originY);
    ctx.lineTo(originX, originY - plotH - 10);
    ctx.stroke();

    ctx.fillStyle = '#cbd5e1';
    ctx.font = '11px Segoe UI, sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText('t (Zeit)', originX + plotW + 10, originY + 22);
    ctx.textAlign = 'left';
    ctx.fillText('I(t) [mA]', originX - 35, originY - plotH - 12);
    ctx.fillText('I0', originX - 25, originY - plotH + 4);

    // Theoretical curve
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.25)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let px = 0; px <= plotW; px += 2) {
      const normT = (px / plotW) * 5;
      const normI = Math.exp(-normT);
      const py = originY - normI * plotH;
      if (px === 0) ctx.moveTo(originX + px, py);
      else ctx.lineTo(originX + px, py);
    }
    ctx.stroke();

    // Fill integral area
    if (this.history.length > 1) {
      ctx.fillStyle = 'rgba(16, 185, 129, 0.18)';
      ctx.beginPath();
      ctx.moveTo(originX, originY);
      for (let pt of this.history) {
        const normT = pt.t / (tau * 5);
        if (normT > 1.0) break;
        const hx = originX + normT * plotW;
        const hy = originY - (pt.i / i0) * plotH;
        ctx.lineTo(hx, hy);
      }
      const lastT = Math.min(1.0, this.history[this.history.length - 1].t / (tau * 5));
      ctx.lineTo(originX + lastT * plotW, originY);
      ctx.closePath();
      ctx.fill();

      // Live animated curve
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      for (let i = 0; i < this.history.length; i++) {
        const pt = this.history[i];
        const normT = pt.t / (tau * 5);
        if (normT > 1.0) break;
        const hx = originX + normT * plotW;
        const hy = originY - (pt.i / i0) * plotH;
        if (i === 0) ctx.moveTo(hx, hy);
        else ctx.lineTo(hx, hy);
      }
      ctx.stroke();

      const lastPt = this.history[this.history.length - 1];
      const curNormT = Math.min(1.0, lastPt.t / (tau * 5));
      const curX = originX + curNormT * plotW;
      const curY = originY - (lastPt.i / i0) * plotH;

      ctx.fillStyle = '#facc15';
      ctx.beginPath();
      ctx.arc(curX, curY, 4, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#34d399';
      ctx.font = 'bold 11px Segoe UI, sans-serif';
      ctx.textAlign = 'left';
    }
    ctx.restore();
  }
};

// --- 5. FARADAYSCHER KÄFIG & BLITZSCHUTZ SIMULATOR ---
const FaradaySim = {
  canvas: null,
  ctx: null,
  fieldOn: true,
  slowMo: false,
  lightningTimer: 0,
  isInitialized: false,
  animId: null,
  electrons: [],

  init() {
    this.canvas = document.getElementById('faradayCanvas');
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.isInitialized = true;
    this.initElectrons();
    this.bindEvents();
    if (!this.animId) {
      this.loop = this.loop.bind(this);
      this.animId = requestAnimationFrame(this.loop);
    }
  },

  initElectrons() {
    this.electrons = [];
    const NUM = 36;
    const R_INNER = 65;
    const R_OUTER = 88;
    for (let i = 0; i < NUM; i++) {
      const neutralAngle = (i / NUM) * Math.PI * 2;
      const radius = R_INNER + 4 + Math.random() * (R_OUTER - R_INNER - 8);
      this.electrons.push({
        neutralAngle: neutralAngle,
        currentAngle: neutralAngle,
        radius: radius
      });
    }
  },

  bindEvents() {
    const btnField = document.getElementById('btnFaradayToggleField');
    const btnLightning = document.getElementById('btnFaradayLightning');
    const btnSlowMo = document.getElementById('btnFaradaySlowMo');
    const btnReset = document.getElementById('btnFaradayReset');

    if (btnField) btnField.onclick = () => {
      this.fieldOn = !this.fieldOn;
      btnField.textContent = this.fieldOn ? '⚡ Feld: AN' : '⚪ Feld: AUS';
      btnField.style.background = this.fieldOn ? '#0284c7' : '#475569';
      this.updateResultBox();
    };

    if (btnLightning) btnLightning.onclick = () => {
      this.lightningTimer = 35;
      this.updateResultBox();
    };

    if (btnSlowMo) btnSlowMo.onclick = () => {
      this.slowMo = !this.slowMo;
      btnSlowMo.textContent = this.slowMo ? '⏱️ Zeitlupe: AN' : '⏱️ Zeitlupe: AUS';
      btnSlowMo.style.color = this.slowMo ? '#f59e0b' : 'var(--text-primary)';
    };

    if (btnReset) btnReset.onclick = () => {
      this.fieldOn = false;
      this.slowMo = false;
      this.lightningTimer = 0;
      if (btnField) {
        btnField.textContent = '⚪ Feld: AUS';
        btnField.style.background = '#475569';
      }
      if (btnSlowMo) {
        btnSlowMo.textContent = '⏱️ Zeitlupe: AUS';
        btnSlowMo.style.color = 'var(--text-primary)';
      }
      this.electrons.forEach(e => { e.currentAngle = e.neutralAngle; });
      this.updateResultBox();
    };
  },

  updateResultBox() {
    const box = document.getElementById('faradayResultBox');
    if (!box) return;
    if (this.lightningTimer > 0) {
      box.innerHTML = '⚡ <strong>BLITZEINSCHLAG!</strong> Strom fließt ausschließlich über die Außenhülle ab &bull; <strong>Innenraum 100% geschützt (0 V)</strong>';
      box.style.background = 'rgba(245, 158, 11, 0.2)';
      box.style.borderColor = '#f59e0b';
    } else if (this.fieldOn) {
      box.innerHTML = '🛡️ <strong>Äußeres Feld aktiv:</strong> Elektronen wandern nach links &bull; Gegenfeld kompensiert Außenfeld &bull; <strong>E_ges = 0 V/m (Feldfreier Raum)</strong>';
      box.style.background = 'rgba(16, 185, 129, 0.15)';
      box.style.borderColor = '#10b981';
    } else {
      box.innerHTML = '⚪ <strong>Kein äußeres Feld:</strong> Elektronen gleichmäßig verteilt &bull; Raum ist neutral';
      box.style.background = 'var(--bg-subtle)';
      box.style.borderColor = 'var(--border-subtle)';
    }
  },

  loop() {
    this.update();
    this.draw();
    this.animId = requestAnimationFrame(this.loop);
  },

  update() {
    const step = this.slowMo ? 0.008 : 0.045;
    this.electrons.forEach(e => {
      if (this.fieldOn) {
        const targetAngle = Math.PI + Math.sin(e.neutralAngle) * 0.95;
        let diff = targetAngle - e.currentAngle;
        while (diff < -Math.PI) diff += Math.PI * 2;
        while (diff > Math.PI) diff -= Math.PI * 2;
        e.currentAngle += diff * step;
      } else {
        let diff = e.neutralAngle - e.currentAngle;
        while (diff < -Math.PI) diff += Math.PI * 2;
        while (diff > Math.PI) diff -= Math.PI * 2;
        e.currentAngle += diff * step;
      }
    });

    if (this.lightningTimer > 0) {
      this.lightningTimer--;
      if (this.lightningTimer === 0) this.updateResultBox();
    }
  },

  draw() {
    if (!this.canvas || !this.ctx) return;
    const ctx = this.ctx;
    const w = this.canvas.width;
    const h = this.canvas.height;
    const CX = w / 2;
    const CY = h / 2 + 5;
    const R_OUTER = 88;
    const R_INNER = 65;

    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = '#0b1120';
    ctx.fillRect(0, 0, w, h);

    // 1. Outer Plates
    if (this.fieldOn) {
      // Left positive
      ctx.fillStyle = '#ef4444';
      ctx.fillRect(20, 35, 14, h - 70);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 15px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('+', 27, 70);
      ctx.fillText('+', 27, CY);
      ctx.fillText('+', 27, h - 70);
      ctx.font = '10px sans-serif';
      ctx.fillStyle = '#fca5a5';
      ctx.fillText('+ Pol', 27, 22);

      // Right negative
      ctx.fillStyle = '#3b82f6';
      ctx.fillRect(w - 34, 35, 14, h - 70);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 18px monospace';
      ctx.fillText('−', w - 27, 70);
      ctx.fillText('−', w - 27, CY);
      ctx.fillText('−', w - 27, h - 70);
      ctx.font = '10px sans-serif';
      ctx.fillStyle = '#93c5fd';
      ctx.fillText('− Pol', w - 27, 22);

      // Curved field lines
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(34, 60);
      ctx.quadraticCurveTo(CX, 15, w - 34, 60);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(34, h - 60);
      ctx.quadraticCurveTo(CX, h - 15, w - 34, h - 60);
      ctx.stroke();

      ctx.font = 'bold 11px monospace';
      ctx.fillStyle = '#38bdf8';
      ctx.fillText('E_auß →', 85, 100);
      ctx.fillText('E_auß →', w - 85, 100);
    }

    // 2. Cage Metal Wall
    ctx.beginPath();
    ctx.arc(CX, CY, R_OUTER, 0, Math.PI * 2);
    ctx.fillStyle = '#334155';
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#64748b';
    ctx.stroke();

    // 3. Hollow Cavity (Safe Zone)
    ctx.beginPath();
    ctx.arc(CX, CY, R_INNER, 0, Math.PI * 2);
    ctx.fillStyle = '#050914';
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#10b981';
    ctx.setLineDash([5, 4]);
    ctx.stroke();
    ctx.setLineDash([]);

    // 4. Fixed Positive Atom Trunks
    for (let i = 0; i < 18; i++) {
      const a = (i / 18) * Math.PI * 2;
      const r = (R_OUTER + R_INNER) / 2;
      const x = CX + Math.cos(a) * r;
      const y = CY + Math.sin(a) * r;
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(239, 68, 68, 0.6)';
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 8px monospace';
      ctx.fillText('+', x, y);
    }

    // 5. Mobile Electrons (-)
    this.electrons.forEach(e => {
      const x = CX + Math.cos(e.currentAngle) * e.radius;
      const y = CY + Math.sin(e.currentAngle) * e.radius;
      ctx.beginPath();
      ctx.arc(x, y, 5.5, 0, Math.PI * 2);
      ctx.fillStyle = '#38bdf8';
      ctx.shadowColor = '#0284c7';
      ctx.shadowBlur = 5;
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.fillStyle = '#0f172a';
      ctx.font = 'bold 10px monospace';
      ctx.fillText('−', x, y);
    });

    // 6. Vector cancellation in interior
    if (this.fieldOn) {
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(CX - 35, CY - 20);
      ctx.lineTo(CX + 35, CY - 20);
      ctx.stroke();
      ctx.fillStyle = '#38bdf8';
      ctx.beginPath();
      ctx.moveTo(CX + 35, CY - 20);
      ctx.lineTo(CX + 29, CY - 24);
      ctx.lineTo(CX + 29, CY - 16);
      ctx.fill();
      ctx.font = '9px monospace';
      ctx.fillText('E_auß (→)', CX, CY - 28);

      ctx.strokeStyle = '#f97316';
      ctx.beginPath();
      ctx.moveTo(CX + 35, CY - 7);
      ctx.lineTo(CX - 35, CY - 7);
      ctx.stroke();
      ctx.fillStyle = '#f97316';
      ctx.beginPath();
      ctx.moveTo(CX - 35, CY - 7);
      ctx.lineTo(CX - 29, CY - 11);
      ctx.lineTo(CX - 29, CY - 3);
      ctx.fill();
      ctx.fillText('E_inn (←)', CX, CY + 2);
    }

    // Stickman inside
    ctx.beginPath();
    ctx.arc(CX, CY + 22, 9, 0, Math.PI * 2);
    ctx.fillStyle = '#34d399';
    ctx.fill();
    ctx.strokeStyle = '#34d399';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(CX, CY + 31);
    ctx.lineTo(CX, CY + 45);
    ctx.moveTo(CX - 10, CY + 36);
    ctx.lineTo(CX + 10, CY + 36);
    ctx.moveTo(CX, CY + 45);
    ctx.lineTo(CX - 7, CY + 56);
    ctx.moveTo(CX, CY + 45);
    ctx.lineTo(CX + 7, CY + 56);
    ctx.stroke();

    ctx.fillStyle = '#10b981';
    ctx.font = 'bold 10px sans-serif';
    ctx.fillText('E = 0', CX, CY + 60);

    // 7. Lightning animation
    if (this.lightningTimer > 0) {
      ctx.strokeStyle = '#fef08a';
      ctx.lineWidth = 5;
      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur = 15;
      ctx.beginPath();
      ctx.moveTo(CX + (Math.random() - 0.5) * 30, 0);
      ctx.lineTo(CX - 12, 35);
      ctx.lineTo(CX + 12, 65);
      ctx.lineTo(CX, CY - R_OUTER);
      ctx.arc(CX, CY, R_OUTER + 2, -Math.PI / 2, Math.PI / 2, false);
      ctx.lineTo(CX - 10, CY + R_OUTER + 25);
      ctx.lineTo(CX, h);
      ctx.stroke();
      ctx.shadowBlur = 0;
    }
  }
};
