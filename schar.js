// Multi-Task Schar Visualizer & Trassierung Engine
// Strictly NO unescaped dollar signs and ANTI-LEAK spoiler toggles!

let currentScharMode = 'task3'; // 'task3' (newest), 'new-a2', or 'orig-a2'
let currentT = 4.0;

function switchScharTask(mode) {
  currentScharMode = mode;
  const btnT3 = document.getElementById('btn-schar-task3');
  const btnNA2 = document.getElementById('btn-schar-new-a2');
  const btnOA2 = document.getElementById('btn-schar-orig-a2');

  if (btnT3) btnT3.classList.toggle('active', mode === 'task3');
  if (btnNA2) btnNA2.classList.toggle('active', mode === 'new-a2');
  if (btnOA2) btnOA2.classList.toggle('active', mode === 'orig-a2');

  const pill = document.getElementById('schar-task-pill');
  const title = document.getElementById('schar-main-title');

  if (mode === 'task3') {
    pill.innerText = 'NEU 2';
    pill.style.background = '#e11d48'; // rose
    title.innerText = 'Aufgabe 3: Extrema bei 0 & 2 (d = t frei)';
    currentT = 4.0;
    setupSlider(-2, 6, 4.0);
  } else if (mode === 'new-a2') {
    pill.innerText = 'NEU 1';
    pill.style.background = '#ea580c'; // orange
    title.innerText = 'Aufgabe 2: Extrema bei 1 & 3 (d = t frei)';
    currentT = 0.0;
    setupSlider(-3, 5, 0.0);
  } else {
    pill.innerText = 'A2';
    pill.style.background = '#0284c7'; // sky blue
    title.innerText = 'Aufgabe 1: Original A2 aus Wiederholung.pdf';
    currentT = 2.0;
    setupSlider(-5, 10, 2.0);
  }

  renderScharLeftColumn();
  updateScharPlot();
}

function setupSlider(minVal, maxVal, defaultVal) {
  const slider = document.getElementById('tSlider');
  slider.min = minVal;
  slider.max = maxVal;
  slider.value = defaultVal;
  document.getElementById('slider-min-lbl').innerText = minVal;
  document.getElementById('slider-max-lbl').innerText = maxVal;
  document.getElementById('paramTValue').innerText = `t = ${defaultVal.toFixed(1)}`;
}

function onSliderChange(val) {
  currentT = parseFloat(val);
  document.getElementById('paramTValue').innerText = `t = ${currentT.toFixed(1)}`;
  updateScharPlot();
}

function setSliderT(val) {
  document.getElementById('tSlider').value = val;
  onSliderChange(val);
}

function toggleSpoiler(id) {
  const el = document.getElementById(id);
  const btn = document.getElementById('btn-' + id);
  if (!el) return;
  const isHidden = (el.style.display === 'none' || el.style.display === '');
  el.style.display = isHidden ? 'block' : 'none';
  if (btn) {
    btn.innerText = isHidden ? '🙈 Lösung verbergen' : '👁️ Lösung aufdecken';
  }
}

function toggleHint(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.style.display = (el.style.display === 'none' || el.style.display === '') ? 'block' : 'none';
}

function renderScharLeftColumn() {
  const col = document.getElementById('schar-left-col');
  const quickBtnsArea = document.getElementById('schar-quick-btns');
  const legendArea = document.getElementById('scharLegend');

  if (currentScharMode === 'task3') {
    // ==========================================
    // BRAND NEW TASK 3 (Extrema 0 & 2, WP 1, d = t)
    // ==========================================
    col.innerHTML = `
      <div class="guide-card task-card-intro" style="border-left-color: #e11d48;">
        <div class="guide-title">
          <span class="guide-icon">🎯</span>
          <strong>Aufgabenstellung (Exakt Klausur-Niveau):</strong>
        </div>
        <p class="task-text-quote">
          „Eine ganzrationale Funktion 3. Grades besitzt an der Stelle 0 und an der Stelle 2 je ein lokales Extremum. 
          An der Stelle 1 hat sie einen Wendepunkt mit dem Funktionswert 2.“
        </p>
      </div>

      <!-- TEIL A -->
      <div class="challenge-subtask-card">
        <div class="st-header">
          <span class="st-badge" style="background:#e11d48;">Teil a</span>
          <strong>Bedingungen &amp; Schargleichung mit d = t herleiten</strong>
        </div>
        <p class="st-desc">Stelle die 4 Bedingungen auf, begründe die Nullzeile und drücke alle Koeffizienten durch den freien Parameter d = t aus.</p>
        
        <div class="action-row-leakproof">
          <button class="btn-hint" onclick="toggleHint('hint-t3-a')">💡 Denk-Anstoß</button>
          <button class="btn-spoiler" id="btn-spoiler-t3-a" onclick="toggleSpoiler('spoiler-t3-a')">👁️ Lösung aufdecken</button>
        </div>

        <div id="hint-t3-a" class="hint-box" style="display:none;">
          Bedingungen: f'(0)=0, f'(2)=0, f''(1)=0, f(1)=2.<br>
          f'(0)=0 liefert sofort c = 0! Warum ist f'(2)=0 und f''(1)=0 dasselbe? Setze d = t in f(1)=2 ein!
        </div>

        <div id="spoiler-t3-a" class="spoiler-box" style="display:none;">
          <div class="sol-step-box">
            <strong>1. Die 4 Bedingungen:</strong>
            <ul>
              <li>Extremum bei x = 0: f'(0) = 0 ➔ <strong>c = 0</strong></li>
              <li>Extremum bei x = 2: f'(2) = 0 ➔ 3a(4) + 2b(2) + c = 0 ⇔ 12a + 4b = 0 ⇔ <strong>b = -3a</strong></li>
              <li>Wendepunkt bei x = 1: f''(1) = 0 ➔ 6a(1) + 2b = 0 ⇔ 2b = -6a ⇔ <strong>b = -3a</strong> (Nullzeile!)</li>
              <li>Funktionswert 2: f(1) = 2 ➔ a(1)³ + b(1)² + c(1) + d = 2 ⇔ a + b + d = 2</li>
            </ul>
          </div>
          <div class="sol-step-box">
            <strong>2. Nullzeile &amp; Parameterzusammenhang:</strong><br>
            Da x = 1 genau in der Mitte von 0 und 2 liegt, fordern f'(2)=0 und f''(1)=0 exakt dasselbe: <strong>b = -3a</strong>.<br>
            Eine Gleichung ist redundant (Nullzeile 0 = 0 im LGS)!
          </div>
          <div class="sol-step-box">
            <strong>3. Mit d = t auflösen:</strong><br>
            Setze b = -3a und d = t in a + b + d = 2 ein:<br>
            a + (-3a) + t = 2 ⇔ -2a + t = 2 ⇔ 2a = t - 2<br>
            ➔ <strong>a = 0,5t - 1</strong><br>
            ➔ <strong>b = -3a = -3(0,5t - 1) = 3 - 1,5t</strong><br>
            ➔ <strong>c = 0</strong><br>
            ➔ <strong>d = t</strong>
          </div>
          <div class="formula-box">
            <strong>f_t(x) = (0,5t - 1) x³ + (3 - 1,5t) x² + t</strong>
          </div>
        </div>
      </div>

      <!-- TEIL B -->
      <div class="challenge-subtask-card">
        <div class="st-header">
          <span class="st-badge" style="background:#e11d48;">Teil b</span>
          <strong>Klausur-Einschränkung: Für welches t gilt die Schar nicht?</strong>
        </div>
        <div class="action-row-leakproof">
          <button class="btn-spoiler" id="btn-spoiler-t3-b" onclick="toggleSpoiler('spoiler-t3-b')">👁️ Lösung aufdecken</button>
        </div>
        <div id="spoiler-t3-b" class="spoiler-box" style="display:none;">
          <div class="danger-box">
            Für <strong>t = 2</strong> wird der Leitkoeffizient:<br>
            a = 0,5(2) - 1 = 0 und b = 3 - 1,5(2) = 0.<br>
            Dann fallen x³ und x² komplett weg und es bleibt nur <strong>f_2(x) = 2</strong> (waagerechte Gerade ohne Extrema!).<br>
            ➔ Die Funktion 3. Grades existiert nur für alle <strong>t ≠ 2</strong>!
          </div>
        </div>
      </div>

      <!-- TEIL C -->
      <div class="challenge-subtask-card">
        <div class="st-header">
          <span class="st-badge" style="background:#e11d48;">Teil c</span>
          <strong>Wendetangente für t = 4 an der Stelle x = 1</strong>
        </div>
        <div class="action-row-leakproof">
          <button class="btn-hint" onclick="toggleHint('hint-t3-c')">💡 Denk-Anstoß</button>
          <button class="btn-spoiler" id="btn-spoiler-t3-c" onclick="toggleSpoiler('spoiler-t3-c')">👁️ Lösung aufdecken</button>
        </div>
        <div id="hint-t3-c" class="hint-box" style="display:none;">
          Setze t = 4 in f_t(x) ein. Bilde die 1. Ableitung f_4'(x). Steigung m = f_4'(1). Setze in y = mx + b ein mit dem Wendepunkt W(1 | 2)!
        </div>
        <div id="spoiler-t3-c" class="spoiler-box" style="display:none;">
          <p><strong>1. Funktionsgleichung für t = 4:</strong><br>
          a = 0,5(4) - 1 = 1 &bull; b = 3 - 1,5(4) = -3 &bull; c = 0 &bull; d = 4<br>
          ➔ <strong>f_4(x) = x³ - 3x² + 4</strong></p>
          
          <p><strong>2. Wendepunkt:</strong><br>
          x_w = 1 ➔ f_4(1) = 1³ - 3(1)² + 4 = 2 ➔ <strong>W(1 | 2)</strong></p>
          
          <p><strong>3. Steigung der Wendetangente:</strong><br>
          f_4'(x) = 3x² - 6x<br>
          m = f_4'(1) = 3(1)² - 6(1) = 3 - 6 = <strong>-3</strong></p>
          
          <p><strong>4. In y = m * x + b einsetzen:</strong><br>
          2 = (-3) * 1 + b ⇔ 2 = -3 + b ➔ <strong>b = 5</strong><br>
          <em>(Wichtig: Nur m und b einsetzen, x und y bleiben stehen!)</em></p>
          
          <div class="formula-box">
            <strong>Wendetangente: y = -3x + 5 &nbsp; bzw. &nbsp; t(x) = -3x + 5</strong>
          </div>
        </div>
      </div>

      <!-- TEIL D -->
      <div class="challenge-subtask-card">
        <div class="st-header">
          <span class="st-badge" style="background:#e11d48;">Teil d</span>
          <strong>Mittlere Änderungsrate auf [0; 2] und [0; 3]</strong>
        </div>
        <p class="st-desc">Berechne die durchschnittliche Steigung (Sekantensteigung) für f_4(x).</p>
        <div class="action-row-leakproof">
          <button class="btn-hint" onclick="toggleHint('hint-t3-d')">💡 Denk-Anstoß</button>
          <button class="btn-spoiler" id="btn-spoiler-t3-d" onclick="toggleSpoiler('spoiler-t3-d')">👁️ Lösung aufdecken</button>
        </div>
        <div id="hint-t3-d" class="hint-box" style="display:none;">
          Formel: m = (f(b) - f(a)) / (b - a). Setze die normalen Funktionswerte ein, NICHT die Ableitung!
        </div>
        <div id="spoiler-t3-d" class="spoiler-box" style="display:none;">
          <p><strong>1. Intervall [0; 2]:</strong><br>
          f_4(0) = 4 (Hochpunkt) &bull; f_4(2) = 2³ - 3(2)² + 4 = 8 - 12 + 4 = 0 (Tiefpunkt)<br>
          m = (f_4(2) - f_4(0)) / (2 - 0) = (0 - 4) / 2 = <strong>-2</strong><br>
          <em>Anschaulich: Vom Berggipfel H(0|4) zum Tal T(2|0) geht es bergab: 4 Höhenmeter Verlust auf 2 Schritte nach rechts.</em></p>
          
          <p><strong>2. Intervall [0; 3]:</strong><br>
          f_4(0) = 4 &bull; f_4(3) = 3³ - 3(3)² + 4 = 27 - 27 + 4 = 4<br>
          m = (f_4(3) - f_4(0)) / (3 - 0) = (4 - 4) / 3 = <strong>0</strong><br>
          <em>Anschaulich: Bei x = 0 und x = 3 ist die Funktion exakt gleich hoch (y = 4). Die Sekante ist völlig waagerecht (Steigung 0)!</em></p>
        </div>
      </div>
    `;

    quickBtnsArea.innerHTML = `
      <button class="btn-quick" onclick="setSliderT(4)">t = 4 (Teil c &amp; d)</button>
      <button class="btn-quick btn-warn" onclick="setSliderT(2)">t = 2 (Kollaps f₂(x)=2)</button>
      <button class="btn-quick" onclick="setSliderT(0)">t = 0</button>
      <button class="btn-quick" onclick="setSliderT(1)">t = 1</button>
      <button class="btn-quick" onclick="setSliderT(3)">t = 3</button>
    `;

    legendArea.innerHTML = `
      <span class="legend-dot dot-wende">● Wendepunkt W(1|2) (fest für alle t!)</span>
      <span class="legend-dot dot-ext">● Extrema E₁(0|t) &amp; E₂(2|4-t)</span>
      <span class="legend-dot dot-tan">━ Wendetangente y = -3x + 5 (bei t=4)</span>
      <span class="legend-dot" style="color:#0284c7;">┅ Sekante [0;2] (m=-2)</span>
      <span class="legend-dot" style="color:#059669;">┅ Sekante [0;3] (m=0)</span>
    `;

  } else if (currentScharMode === 'new-a2') {
    // ==========================================
    // AUFGABE 2 (Extrema 1 & 3, WP 2, d = t)
    // ==========================================
    col.innerHTML = `
      <div class="guide-card task-card-intro">
        <div class="guide-title">
          <span class="guide-icon">🎯</span>
          <strong>Aufgabenstellung (Extrema bei 1 &amp; 3):</strong>
        </div>
        <p class="task-text-quote">
          „Eine ganzrationale Funktion 3. Grades besitzt an der Stelle 1 und an der Stelle 3 je ein lokales Extremum. 
          An der Stelle 2 hat sie einen Wendepunkt mit dem Funktionswert 2.“
        </p>
      </div>

      <!-- TEIL A -->
      <div class="challenge-subtask-card">
        <div class="st-header">
          <span class="st-badge">Teil a</span>
          <strong>Schargleichung f_t(x) mit d = t herleiten</strong>
        </div>
        <p class="st-desc">Stelle die 4 Bedingungen auf und drücke alle Koeffizienten durch den freien Parameter d = t aus.</p>
        
        <div class="action-row-leakproof">
          <button class="btn-hint" onclick="toggleHint('hint-na2-a')">💡 Denk-Anstoß</button>
          <button class="btn-spoiler" id="btn-spoiler-na2-a" onclick="toggleSpoiler('spoiler-na2-a')">👁️ Lösung aufdecken</button>
        </div>

        <div id="hint-na2-a" class="hint-box" style="display:none;">
          Bedingungen: f'(1)=0, f'(3)=0, f''(2)=0, f(2)=2. Zeige b = -6a und c = 9a. Setze d = t in f(2)=2 ein!
        </div>

        <div id="spoiler-na2-a" class="spoiler-box" style="display:none;">
          <div class="sol-step-box">
            <strong>1. Die 4 Bedingungen:</strong>
            <ul>
              <li>Extremum bei x = 1: f'(1) = 0 ➔ 3a + 2b + c = 0</li>
              <li>Extremum bei x = 3: f'(3) = 0 ➔ 27a + 6b + c = 0</li>
              <li>Wendepunkt bei x = 2: f''(2) = 0 ➔ 12a + 2b = 0 ⇔ <strong>b = -6a</strong></li>
              <li>Funktionswert 2: f(2) = 2 ➔ 8a + 4b + 2c + d = 2</li>
            </ul>
          </div>
          <div class="sol-step-box">
            <strong>2. Nullzeile &amp; Parameterzusammenhang:</strong><br>
            Setze b = -6a in (1) ein: 3a + 2(-6a) + c = 0 ➔ <strong>c = 9a</strong>.<br>
            Bedingung (2) wird automatisch 0 = 0 (Nullzeile)!
          </div>
          <div class="sol-step-box">
            <strong>3. Mit d = t auflösen:</strong><br>
            8a + 4(-6a) + 2(9a) + t = 2 ⇔ 2a + t = 2 ➔ <strong>a = 1 - 0,5t</strong>.<br>
            ➔ b = -6a = 3t - 6<br>
            ➔ c = 9a = 9 - 4,5t<br>
            ➔ d = t
          </div>
          <div class="formula-box">
            <strong>f_t(x) = (1 - 0,5t) x³ + (3t - 6) x² + (9 - 4,5t) x + t</strong>
          </div>
        </div>
      </div>

      <!-- TEIL B -->
      <div class="challenge-subtask-card">
        <div class="st-header">
          <span class="st-badge">Teil b</span>
          <strong>Klausur-Einschränkung: Für welches t gilt die Schar nicht?</strong>
        </div>
        <div class="action-row-leakproof">
          <button class="btn-spoiler" id="btn-spoiler-na2-b" onclick="toggleSpoiler('spoiler-na2-b')">👁️ Lösung aufdecken</button>
        </div>
        <div id="spoiler-na2-b" class="spoiler-box" style="display:none;">
          <div class="danger-box">
            Für <strong>t = 2</strong> wird der Leitkoeffizient a = 1 - 0,5(2) = 0.<br>
            Dann fallen x³, x² und x weg und es bleibt nur <strong>f_2(x) = 2</strong> (waagerechte Gerade ohne Extrema!).<br>
            ➔ Alle Bedingungen sind erfüllt für alle <strong>t ≠ 2</strong>!
          </div>
        </div>
      </div>

      <!-- TEIL C -->
      <div class="challenge-subtask-card">
        <div class="st-header">
          <span class="st-badge">Teil c</span>
          <strong>Tangente für t = 0 an der Stelle x = 0</strong>
        </div>
        <div class="action-row-leakproof">
          <button class="btn-spoiler" id="btn-spoiler-na2-c" onclick="toggleSpoiler('spoiler-na2-c')">👁️ Lösung aufdecken</button>
        </div>
        <div id="spoiler-na2-c" class="spoiler-box" style="display:none;">
          <p>Für t = 0 lautet die Funktion: f_0(x) = x³ - 6x² + 9x.</p>
          <p>Punkt: f_0(0) = 0 ➔ P(0 | 0)</p>
          <p>Steigung: f_0'(x) = 3x² - 12x + 9 ➔ f_0'(0) = 9 ➔ m = 9.</p>
          <div class="formula-box"><strong>Tangente: y = 9x</strong></div>
        </div>
      </div>

      <!-- TEIL E -->
      <div class="challenge-subtask-card">
        <div class="st-header">
          <span class="st-badge">Teil e</span>
          <strong>Mittlere Änderungsrate auf dem Intervall [1; 3]</strong>
        </div>
        <div class="action-row-leakproof">
          <button class="btn-spoiler" id="btn-spoiler-na2-e" onclick="toggleSpoiler('spoiler-na2-e')">👁️ Lösung aufdecken</button>
        </div>
        <div id="spoiler-na2-e" class="spoiler-box" style="display:none;">
          <p>Sekantensteigung: m = (f_0(3) - f_0(1)) / (3 - 1)</p>
          <p>f_0(1) = 1³ - 6(1)² + 9(1) = 4 &bull; f_0(3) = 3³ - 6(3)² + 9(3) = 0</p>
          <p>m = (0 - 4) / 2 = <strong>-2</strong></p>
        </div>
      </div>
    `;

    quickBtnsArea.innerHTML = `
      <button class="btn-quick" onclick="setSliderT(0)">t = 0 (Teil c &amp; e)</button>
      <button class="btn-quick btn-warn" onclick="setSliderT(2)">t = 2 (Kollaps!)</button>
      <button class="btn-quick" onclick="setSliderT(1)">t = 1</button>
      <button class="btn-quick" onclick="setSliderT(3)">t = 3</button>
    `;

    legendArea.innerHTML = `
      <span class="legend-dot dot-wende">● Wendepunkt W(2|2) (fest für alle t!)</span>
      <span class="legend-dot dot-ext">● Extrema bei x = 1 und x = 3</span>
      <span class="legend-dot dot-tan">━ Tangente y = 9x</span>
    `;

  } else {
    // ==========================================
    // ORIGINAL A2 AUS WIEDERHOLUNG.PDF
    // ==========================================
    col.innerHTML = `
      <div class="guide-card task-card-intro">
        <div class="guide-title">
          <span class="guide-icon">📋</span>
          <strong>Original A2 (Wiederholung.pdf):</strong>
        </div>
        <p class="task-text-quote">
          „Eine ganzrationale Funktion 3. Grades hat an der Stelle -1 und an der Stelle 3 je ein lokales Extremum. 
          An der Stelle 1 hat sie einen Wendepunkt mit dem Funktionswert 4.“
        </p>
      </div>

      <div class="challenge-subtask-card">
        <div class="st-header">
          <span class="st-badge">Teil a</span>
          <strong>Original Gleichungssystem &amp; Schar f_t(x)</strong>
        </div>
        <div class="action-row-leakproof">
          <button class="btn-spoiler" id="btn-spoiler-oa2-a" onclick="toggleSpoiler('spoiler-oa2-a')">👁️ Lösung aufdecken</button>
        </div>
        <div id="spoiler-oa2-a" class="spoiler-box" style="display:none;">
          <p>Bedingungen: f'(-1)=0, f'(3)=0, f''(1)=0, f(1)=4.</p>
          <p>Ergibt die Schar mit Parameter t: <strong>f_t(x) = (4 - t)/44 x³ - 3(4 - t)/44 x² - 9(4 - t)/44 x + t</strong>.</p>
        </div>
      </div>

      <div class="challenge-subtask-card">
        <div class="st-header">
          <span class="st-badge">Teil b</span>
          <strong>Klausur-Einschränkung für t</strong>
        </div>
        <div class="action-row-leakproof">
          <button class="btn-spoiler" id="btn-spoiler-oa2-b" onclick="toggleSpoiler('spoiler-oa2-b')">👁️ Lösung aufdecken</button>
        </div>
        <div id="spoiler-oa2-b" class="spoiler-box" style="display:none;">
          <p>Für <strong>t = 4</strong> wird a = 0 und die Funktion bricht zur Konstante f(x) = 4 zusammen. Schar gilt für alle <strong>t ≠ 4</strong>.</p>
        </div>
      </div>

      <div class="challenge-subtask-card">
        <div class="st-header">
          <span class="st-badge">Teil c</span>
          <strong>Tangente für t = 2 an der Stelle x = 1</strong>
        </div>
        <div class="action-row-leakproof">
          <button class="btn-spoiler" id="btn-spoiler-oa2-c" onclick="toggleSpoiler('spoiler-oa2-c')">👁️ Lösung aufdecken</button>
        </div>
        <div id="spoiler-oa2-c" class="spoiler-box" style="display:none;">
          <p>Tangente an Wendestelle x = 1 für t = 2: <strong>y = 18/11 x + 30/11</strong>.</p>
        </div>
      </div>
    `;

    quickBtnsArea.innerHTML = `
      <button class="btn-quick" onclick="setSliderT(2)">t = 2 (Teil c: Tangente)</button>
      <button class="btn-quick btn-warn" onclick="setSliderT(4)">t = 4 (Kollaps f₄(x)=4)</button>
      <button class="btn-quick" onclick="setSliderT(0)">t = 0</button>
      <button class="btn-quick" onclick="setSliderT(6)">t = 6</button>
    `;

    legendArea.innerHTML = `
      <span class="legend-dot dot-wende">● Wendepunkt W(1|4)</span>
      <span class="legend-dot dot-ext">● Extrema bei x = -1 und x = 3</span>
      <span class="legend-dot dot-tan">━ Tangente für t = 2</span>
    `;
  }
}

function updateScharPlot() {
  const t = currentT;

  if (currentScharMode === 'task3') {
    // a = 0.5t - 1, b = 3 - 1.5t, c = 0, d = t
    const a = 0.5 * t - 1;
    const b = 3 - 1.5 * t;
    const c = 0;
    const d = t;
    drawTask3Canvas(a, b, c, d, t);
  } else if (currentScharMode === 'new-a2') {
    // a = 1 - 0.5t, b = 3t - 6, c = 9 - 4.5t, d = t
    const a = 1 - 0.5 * t;
    const b = 3 * t - 6;
    const c = 9 - 4.5 * t;
    const d = t;
    drawNewA2Canvas(a, b, c, d, t);
  } else {
    // orig a2: a = (4 - t)/44, b = -3(4 - t)/44, c = -9(4 - t)/44, d = t
    const a = (4 - t) / 44;
    const b = -3 * (4 - t) / 44;
    const c = -9 * (4 - t) / 44;
    const d = t;
    drawOrigA2Canvas(a, b, c, d, t);
  }
}

// Draw Canvas for Task 3: Extrema at 0 and 2, W(1|2), d = t
function drawTask3Canvas(a, b, c, d, t) {
  const canvas = document.getElementById('scharCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const w = canvas.width;
  const h = canvas.height;

  const originX = w * 0.32;
  const originY = h * 0.70;
  const scaleX = 48;
  const scaleY = 25;

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, w, h);

  // Grid
  ctx.lineWidth = 1;
  ctx.strokeStyle = "#e2e8f0";
  ctx.beginPath();
  for (let x = -4; x <= 8; x++) {
    const sx = originX + x * scaleX;
    ctx.moveTo(sx, 0); ctx.lineTo(sx, h);
  }
  for (let y = -4; y <= 10; y += 2) {
    const sy = originY - y * scaleY;
    ctx.moveTo(0, sy); ctx.lineTo(w, sy);
  }
  ctx.stroke();

  // Axes
  ctx.lineWidth = 1.4;
  ctx.strokeStyle = "#334155";
  ctx.beginPath();
  ctx.moveTo(10, originY); ctx.lineTo(w - 10, originY);
  ctx.moveTo(originX, h - 10); ctx.lineTo(originX, 10);
  ctx.stroke();

  // Ticks
  ctx.fillStyle = "#334155";
  ctx.font = "9px sans-serif";
  for (let x = -3; x <= 6; x++) {
    if (x === 0) continue;
    ctx.fillText(x.toString(), originX + x * scaleX - 3, originY + 12);
  }
  for (let y = -4; y <= 8; y += 2) {
    if (y === 0) continue;
    ctx.fillText(y.toString(), originX - 16, originY - y * scaleY + 3);
  }

  // Ghost curves
  const ghostTs = [ 1, 3, 5 ];
  ghostTs.forEach(gt => {
    if (Math.abs(gt - t) > 0.4) {
      const ga = 0.5 * gt - 1;
      const gb = 3 - 1.5 * gt;
      const gc = 0;
      const gd = gt;
      drawCurveGeneric(ctx, x => ga * x**3 + gb * x**2 + gc * x + gd, originX, originY, scaleX, scaleY, w, "rgba(148, 163, 184, 0.35)", 1.2);
    }
  });

  // Active curve
  drawCurveGeneric(ctx, x => a * x**3 + b * x**2 + c * x + d, originX, originY, scaleX, scaleY, w, "#e11d48", 2.6);

  // Wendetangente y = -3x + 5 for t = 4
  if (Math.abs(t - 4) < 0.1) {
    ctx.strokeStyle = "#d97706";
    ctx.lineWidth = 2.0;
    ctx.setLineDash([5, 3]);
    ctx.beginPath();
    const xMin = -0.5;
    const xMax = 2.5;
    const y1 = -3 * xMin + 5;
    const y2 = -3 * xMax + 5;
    ctx.moveTo(originX + xMin * scaleX, originY - y1 * scaleY);
    ctx.lineTo(originX + xMax * scaleX, originY - y2 * scaleY);
    ctx.stroke();
    ctx.setLineDash([]);

    // Sekante [0; 2] through (0|4) and (2|0) (m = -2)
    ctx.strokeStyle = "#0284c7";
    ctx.lineWidth = 1.6;
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    ctx.moveTo(originX, originY - 4 * scaleY);
    ctx.lineTo(originX + 2 * scaleX, originY);
    ctx.stroke();

    // Sekante [0; 3] through (0|4) and (3|4) (m = 0)
    ctx.strokeStyle = "#059669";
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    ctx.moveTo(originX, originY - 4 * scaleY);
    ctx.lineTo(originX + 3 * scaleX, originY - 4 * scaleY);
    ctx.stroke();
    ctx.setLineDash([]);
  }

  // Key Points
  // Wendepunkt W(1 | 2) - Fixed for all t!
  drawKeyPoint(ctx, originX + 1 * scaleX, originY - 2 * scaleY, "#7c3aed", "W(1|2)");

  // Extrema at x = 0 and x = 2
  if (Math.abs(t - 2) > 0.05) {
    const yExt1 = d; // x = 0 => y = d = t
    const yExt2 = a * 8 + b * 4 + d; // x = 2 => y = 4 - t
    drawKeyPoint(ctx, originX, originY - yExt1 * scaleY, "#059669", `E₁(0|${yExt1.toFixed(1)})`);
    drawKeyPoint(ctx, originX + 2 * scaleX, originY - yExt2 * scaleY, "#059669", `E₂(2|${yExt2.toFixed(1)})`);
  }
}

function drawNewA2Canvas(a, b, c, d, t) {
  const canvas = document.getElementById('scharCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const w = canvas.width;
  const h = canvas.height;

  const originX = w * 0.35;
  const originY = h * 0.65;
  const scaleX = 42;
  const scaleY = 22;

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, w, h);

  // Grid
  ctx.lineWidth = 1;
  ctx.strokeStyle = "#e2e8f0";
  ctx.beginPath();
  for (let x = -4; x <= 8; x++) {
    const sx = originX + x * scaleX;
    ctx.moveTo(sx, 0); ctx.lineTo(sx, h);
  }
  for (let y = -6; y <= 12; y += 2) {
    const sy = originY - y * scaleY;
    ctx.moveTo(0, sy); ctx.lineTo(w, sy);
  }
  ctx.stroke();

  // Axes
  ctx.lineWidth = 1.4;
  ctx.strokeStyle = "#334155";
  ctx.beginPath();
  ctx.moveTo(10, originY); ctx.lineTo(w - 10, originY);
  ctx.moveTo(originX, h - 10); ctx.lineTo(originX, 10);
  ctx.stroke();

  // Ticks
  ctx.fillStyle = "#334155";
  ctx.font = "9px sans-serif";
  for (let x = -3; x <= 6; x++) {
    if (x === 0) continue;
    ctx.fillText(x.toString(), originX + x * scaleX - 3, originY + 12);
  }
  for (let y = -4; y <= 10; y += 2) {
    if (y === 0) continue;
    ctx.fillText(y.toString(), originX - 16, originY - y * scaleY + 3);
  }

  // Ghost curves
  const ghostTs = [ -1, 1, 3 ];
  ghostTs.forEach(gt => {
    if (Math.abs(gt - t) > 0.4) {
      const ga = 1 - 0.5 * gt;
      const gb = 3 * gt - 6;
      const gc = 9 - 4.5 * gt;
      const gd = gt;
      drawCurveGeneric(ctx, x => ga * x**3 + gb * x**2 + gc * x + gd, originX, originY, scaleX, scaleY, w, "rgba(148, 163, 184, 0.35)", 1.2);
    }
  });

  // Active curve
  drawCurveGeneric(ctx, x => a * x**3 + b * x**2 + c * x + d, originX, originY, scaleX, scaleY, w, "#ea580c", 2.6);

  // Tangent at x = 0 for t = 0 (y = 9x)
  if (Math.abs(t - 0) < 0.1) {
    ctx.strokeStyle = "#d97706";
    ctx.lineWidth = 1.8;
    ctx.setLineDash([4, 3]);
    ctx.beginPath();
    const xMin = -1;
    const xMax = 1.5;
    const y1 = 9 * xMin;
    const y2 = 9 * xMax;
    ctx.moveTo(originX + xMin * scaleX, originY - y1 * scaleY);
    ctx.lineTo(originX + xMax * scaleX, originY - y2 * scaleY);
    ctx.stroke();
    ctx.setLineDash([]);
  }

  // Key Points
  drawKeyPoint(ctx, originX + 2 * scaleX, originY - 2 * scaleY, "#7c3aed", "W(2|2)");
  if (Math.abs(t - 2) > 0.05) {
    const yExt1 = a * (1)**3 + b * (1)**2 + c * (1) + d;
    const yExt2 = a * (3)**3 + b * (3)**2 + c * (3) + d;
    drawKeyPoint(ctx, originX + 1 * scaleX, originY - yExt1 * scaleY, "#059669", `E₁(1|${yExt1.toFixed(1)})`);
    drawKeyPoint(ctx, originX + 3 * scaleX, originY - yExt2 * scaleY, "#059669", `E₂(3|${yExt2.toFixed(1)})`);
  }
}

function drawOrigA2Canvas(a, b, c, d, t) {
  const canvas = document.getElementById('scharCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  
  const w = canvas.width;
  const h = canvas.height;
  
  const originX = w * 0.42;
  const originY = h * 0.65;
  const scaleX = 35;
  const scaleY = 16;

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, w, h);

  ctx.lineWidth = 1;
  ctx.strokeStyle = "#e2e8f0";
  ctx.beginPath();
  for (let x = -6; x <= 8; x++) {
    const sx = originX + x * scaleX;
    ctx.moveTo(sx, 0); ctx.lineTo(sx, h);
  }
  for (let y = -8; y <= 16; y++) {
    const sy = originY - y * scaleY;
    ctx.moveTo(0, sy); ctx.lineTo(w, sy);
  }
  ctx.stroke();

  ctx.lineWidth = 1.4;
  ctx.strokeStyle = "#334155";
  ctx.beginPath();
  ctx.moveTo(10, originY); ctx.lineTo(w - 10, originY);
  ctx.moveTo(originX, h - 10); ctx.lineTo(originX, 10);
  ctx.stroke();

  drawCurveGeneric(ctx, x => a * x**3 + b * x**2 + c * x + d, originX, originY, scaleX, scaleY, w, "#0284c7", 2.6);

  if (Math.abs(t - 2) < 0.1) {
    ctx.strokeStyle = "#f59e0b";
    ctx.lineWidth = 1.8;
    ctx.setLineDash([4, 3]);
    ctx.beginPath();
    const xMin = -3;
    const xMax = 6;
    const y1 = (18/11) * xMin + (30/11);
    const y2 = (18/11) * xMax + (30/11);
    ctx.moveTo(originX + xMin * scaleX, originY - y1 * scaleY);
    ctx.lineTo(originX + xMax * scaleX, originY - y2 * scaleY);
    ctx.stroke();
    ctx.setLineDash([]);
  }

  drawKeyPoint(ctx, originX + 1 * scaleX, originY - 4 * scaleY, "#7c3aed", "W(1|4)");
  if (Math.abs(t - 4) > 0.05) {
    const yExt1 = a * (-1)**3 + b * (-1)**2 + c * (-1) + d;
    const yExt2 = a * (3)**3 + b * (3)**2 + c * (3) + d;
    drawKeyPoint(ctx, originX - 1 * scaleX, originY - yExt1 * scaleY, "#059669", `E₁(-1|${yExt1.toFixed(1)})`);
    drawKeyPoint(ctx, originX + 3 * scaleX, originY - yExt2 * scaleY, "#059669", `E₂(3|${yExt2.toFixed(1)})`);
  }
}

// ==========================================
// TRASSIERUNG ENGINE (Challenge 1 & Challenge 2)
// ==========================================

let currentTrassMode = 't2'; // 't2' (newest: g2=x) or 't1' (g2=2)

function switchTrassMode(mode) {
  currentTrassMode = mode;
  const btnT1 = document.getElementById('btn-trass-t1');
  const btnT2 = document.getElementById('btn-trass-t2');
  if (btnT1) btnT1.classList.toggle('active', mode === 't1');
  if (btnT2) btnT2.classList.toggle('active', mode === 't2');

  const pill = document.getElementById('trass-pill');
  const title = document.getElementById('trass-title');

  if (mode === 't2') {
    pill.innerText = 'NEU';
    pill.style.background = '#16a34a';
    title.innerText = 'Challenge 2: Ansteigende Rampe (g₂ = x)';
  } else {
    pill.innerText = 'CH 1';
    pill.style.background = '#0284c7';
    title.innerText = 'Challenge 1: Autobahnzubringer (g₂ = 2)';
  }

  renderTrassLeftColumn();
  drawTrassierungCanvas();
}

function renderTrassLeftColumn() {
  const col = document.getElementById('trass-left-col');
  const vizCard = document.getElementById('trass-viz-card');
  const legendArea = document.getElementById('trassLegend');
  if (!col) return;

  const theoryCardHtml = `
    <div class="guide-card" style="background: #f0fdf4; border-color: #86efac;">
      <div class="guide-title" style="color: #166534;">
        <span class="guide-icon">📖</span>
        <strong>Die 3 goldenen Vokabeln für Trassierung:</strong>
      </div>
      <ul class="clean-list" style="font-size: 0.78rem;">
        <li><strong>1. Sprungfrei (stetig):</strong> Kurven treffen sich im selben Punkt ➔ <code>f(x₀) = g(x₀)</code></li>
        <li><strong>2. Knickfrei (glatt):</strong> Gleiche Steigung am Übergang ➔ <code>f'(x₀) = g'(x₀)</code></li>
        <li><strong>3. Krümmungsruckfrei:</strong> Gleiche Krümmung am Übergang ➔ <code>f''(x₀) = g''(x₀)</code></li>
      </ul>
    </div>
  `;

  if (currentTrassMode === 't2') {
    // ==========================================
    // CHALLENGE 2: ANSTEIGENDE RAMPE (g2 = x)
    // ==========================================
    col.innerHTML = theoryCardHtml + `
      <div class="guide-card task-card-intro" style="border-left-color: #16a34a;">
        <div class="guide-title">
          <span class="guide-icon">🛣️</span>
          <strong>Aufgabenstellung (Anschluss an Steigung):</strong>
        </div>
        <p class="task-text-quote">
          „Eine Straße verläuft zunächst waagerecht auf der Höhe y = 0 und endet an der Stelle x = 0 (g₁(x) = 0 für x ≤ 0).<br>
          Sie soll durch eine ganzrationale Funktion 3. Grades f(x) sprung- und knickfrei an eine ansteigende Bergstraße angeschlossen werden, 
          die ab der Stelle x = 2 mit konstanter Steigung verläuft (g₂(x) = x für x ≥ 2).<br>
          <strong>Aufgabe:</strong> Bestimme die Funktionsgleichung f(x), die steilste Stelle (maximale Steigung) und prüfe auf Krümmungsruckfreiheit.“
        </p>
      </div>

      <!-- SCHRITT 1 -->
      <div class="challenge-subtask-card">
        <div class="st-header">
          <span class="st-badge" style="background:#16a34a;">Schritt 1</span>
          <strong>Die 4 Bedingungen aufstellen</strong>
        </div>
        <div class="action-row-leakproof">
          <button class="btn-hint" onclick="toggleHint('hint-trass2-1')">💡 Denk-Anstoß</button>
          <button class="btn-spoiler" id="btn-spoiler-trass2-1" onclick="toggleSpoiler('spoiler-trass2-1')">👁️ Lösung aufdecken</button>
        </div>
        <div id="hint-trass2-1" class="hint-box" style="display:none;">
          Links bei x = 0: Höhe 0 und Steigung 0.<br>
          Rechts bei x = 2: Punkt auf g₂(x) = x einsetzen ➔ g₂(2) = 2. Steigung ist die Ableitung: g₂'(x) = 1 ➔ f'(2) = 1!
        </div>
        <div id="spoiler-trass2-1" class="spoiler-box" style="display:none;">
          <p>Ansatz: f(x) = ax³ + bx² + cx + d &bull; f'(x) = 3ax² + 2bx + c &bull; f''(x) = 6ax + 2b</p>
          <ul>
            <li>Sprungfrei bei x = 0: f(0) = g₁(0) = 0 ➔ <strong>d = 0</strong></li>
            <li>Knickfrei bei x = 0: f'(0) = g₁'(0) = 0 ➔ <strong>c = 0</strong></li>
            <li>Sprungfrei bei x = 2: f(2) = g₂(2) = 2 ➔ a(2)³ + b(2)² = 2 ⇔ <strong>8a + 4b = 2</strong></li>
            <li>Knickfrei bei x = 2: f'(2) = g₂'(2) = 1 ➔ 3a(2)² + 2b(2) = 1 ⇔ <strong>12a + 4b = 1</strong></li>
          </ul>
        </div>
      </div>

      <!-- SCHRITT 2 -->
      <div class="challenge-subtask-card">
        <div class="st-header">
          <span class="st-badge" style="background:#16a34a;">Schritt 2</span>
          <strong>Koeffizienten berechnen &amp; Trasse aufstellen</strong>
        </div>
        <div class="action-row-leakproof">
          <button class="btn-hint" onclick="toggleHint('hint-trass2-2')">💡 Denk-Anstoß</button>
          <button class="btn-spoiler" id="btn-spoiler-trass2-2" onclick="toggleSpoiler('spoiler-trass2-2')">👁️ Lösung aufdecken</button>
        </div>
        <div id="hint-trass2-2" class="hint-box" style="display:none;">
          Zieh die Gleichung 8a + 4b = 2 von 12a + 4b = 1 ab. Das 4b fällt sofort weg!
        </div>
        <div id="spoiler-trass2-2" class="spoiler-box" style="display:none;">
          <p><strong>Subtraktionsverfahren:</strong></p>
          <p>(12a + 4b) - (8a + 4b) = 1 - 2<br>
          ➔ 4a = -1 ⇔ <strong>a = -0,25 = -1/4</strong></p>
          <p><strong>In 8a + 4b = 2 einsetzen:</strong><br>
          8(-0,25) + 4b = 2 ⇔ -2 + 4b = 2 ⇔ 4b = 4 ➔ <strong>b = 1</strong></p>
          <div class="formula-box">
            <strong>f(x) = -0,25 x³ + x² &nbsp; (für 0 ≤ x ≤ 2)</strong>
          </div>
        </div>
      </div>

      <!-- SCHRITT 3 -->
      <div class="challenge-subtask-card">
        <div class="st-header">
          <span class="st-badge" style="background:#16a34a;">Schritt 3</span>
          <strong>Klausur-Highlight: Maximale Steigung (Wo am steilsten?)</strong>
        </div>
        <div class="action-row-leakproof">
          <button class="btn-hint" onclick="toggleHint('hint-trass2-3')">💡 Denk-Anstoß</button>
          <button class="btn-spoiler" id="btn-spoiler-trass2-3" onclick="toggleSpoiler('spoiler-trass2-3')">👁️ Lösung aufdecken</button>
        </div>
        <div id="hint-trass2-3" class="hint-box" style="display:none;">
          Die maximale Steigung einer ganzrationalen Funktion 3. Grades liegt IMMER im Wendepunkt (f''(x) = 0)!
        </div>
        <div id="spoiler-trass2-3" class="spoiler-box" style="display:none;">
          <p><strong>1. Wendestelle berechnen:</strong><br>
          f''(x) = 6(-0,25)x + 2(1) = -1,5x + 2 = 0 ⇔ 1,5x = 2 ➔ <strong>x_w = 4/3 ≈ 1,33</strong></p>
          <p><strong>2. Maximale Steigung dort berechnen:</strong><br>
          f'(4/3) = -0,75(4/3)² + 2(4/3) = -0,75(16/9) + 8/3 = -4/3 + 8/3 = <strong>4/3 ≈ 1,33</strong></p>
          <p>➔ Die maximale Steigung beträgt <strong>1,33 (entspricht 133,3 % Steigung)</strong>!</p>
          <p><em>Punkt auf der Trasse: f(4/3) = 32/27 ≈ 1,19 ➔ W(1,33 | 1,19)</em></p>
        </div>
      </div>

      <!-- SCHRITT 4 -->
      <div class="challenge-subtask-card">
        <div class="st-header">
          <span class="st-badge" style="background:#16a34a;">Schritt 4</span>
          <strong>Prüfung: Ist der Übergang bei x = 0 krümmungsruckfrei?</strong>
        </div>
        <div class="action-row-leakproof">
          <button class="btn-spoiler" id="btn-spoiler-trass2-4" onclick="toggleSpoiler('spoiler-trass2-4')">👁️ Lösung aufdecken</button>
        </div>
        <div id="spoiler-trass2-4" class="spoiler-box" style="display:none;">
          <p>Krümmungsruckfrei bedeutet: <strong>f''(0) = g₁''(0)</strong>.</p>
          <ul>
            <li>Zubringer: g₁(x) = 0 ➔ g₁''(0) = 0</li>
            <li>Trasse: f''(x) = -1,5x + 2 ➔ <strong>f''(0) = 2</strong></li>
          </ul>
          <div class="danger-box">
            Da <strong>f''(0) = 2 ≠ 0 = g₁''(0)</strong>, ist der Übergang <strong>NICHT krümmungsruckfrei</strong>!<br>
            Fahrzeuge spüren beim Überfahren der Stelle x = 0 einen plötzlichen Ruck.
          </div>
        </div>
      </div>

      <div class="guide-card cas-card">
        <div class="guide-title">
          <span class="guide-icon">📟</span>
          <strong>TI-Nspire CAS Kurzbefehl:</strong>
        </div>
        <div class="code-snippet">
          Define f(x) = a*x^3 + b*x^2 + c*x + d<br>
          Define f1(x) = d(f(x), x)<br>
          <strong>solve(f(0)=0 and f1(0)=0 and f(2)=2 and f1(2)=1, {a,b,c,d})</strong>
        </div>
      </div>
    `;

    if (vizCard) {
      vizCard.innerHTML = `
        <div class="viz-header-row">
          <strong>Straßenverlauf Challenge 2:</strong>
          <span class="param-badge" style="background:#dcfce7; color:#15803d;">Knickfrei &amp; Sprungfrei</span>
        </div>
        <p style="font-size: 0.76rem; color: #475569;">
          Links waagerecht g₁(x) = 0, Mitte weicher Übergang f(x) = -0,25x³ + x², Rechts ansteigende Bergstraße g₂(x) = x (Steigung 1).
        </p>
      `;
    }

    if (legendArea) {
      legendArea.innerHTML = `
        <span class="legend-dot" style="color:#64748b;">━ Straße links g₁(x)=0 (x ≤ 0)</span>
        <span class="legend-dot" style="color:#16a34a;">━ Trasse f(x) (0 ≤ x ≤ 2)</span>
        <span class="legend-dot" style="color:#64748b;">━ Bergstraße g₂(x)=x (x ≥ 2)</span>
        <span class="legend-dot" style="color:#16a34a;">● Übergangspunkte A(0|0) &amp; B(2|2)</span>
        <span class="legend-dot" style="color:#7c3aed;">● Wendepunkt W(1,33|1,19) [max. Steigung 133%]</span>
      `;
    }

  } else {
    // ==========================================
    // CHALLENGE 1: AUTOBAHNAUFFAHRT (g2 = 2)
    // ==========================================
    col.innerHTML = theoryCardHtml + `
      <div class="guide-card task-card-intro">
        <div class="guide-title">
          <span class="guide-icon">🛣️</span>
          <strong>Aufgabenstellung:</strong>
        </div>
        <p class="task-text-quote">
          „Eine ebene Zubringerstraße verläuft waagerecht auf der Höhe y = 0 und endet an der Stelle x = 0. 
          Sie soll durch eine Funktion 3. Grades f(x) sprung- und knickfrei an eine höher gelegene Straße angeschlossen werden, 
          die ab der Stelle x = 4 waagerecht auf der Höhe y = 2 verläuft.<br>
          <strong>Aufgabe:</strong> Bestimme die Funktionsgleichung der Verbindungsstraße f(x).“
        </p>
      </div>

      <div class="challenge-subtask-card">
        <div class="st-header">
          <span class="st-badge" style="background:#0284c7;">Schritt 1</span>
          <strong>Die 4 Bedingungen aufstellen</strong>
        </div>
        <div class="action-row-leakproof">
          <button class="btn-hint" onclick="toggleHint('hint-trass1-1')">💡 Denk-Anstoß</button>
          <button class="btn-spoiler" id="btn-spoiler-trass1-1" onclick="toggleSpoiler('spoiler-trass1-1')">👁️ Lösung aufdecken</button>
        </div>
        <div id="hint-trass1-1" class="hint-box" style="display:none;">
          Linker Übergang bei x = 0 (Höhe 0, waagerecht). Rechter Übergang bei x = 4 (Höhe 2, waagerecht).
        </div>
        <div id="spoiler-trass1-1" class="spoiler-box" style="display:none;">
          <p>Ansatz: f(x) = ax³ + bx² + cx + d &bull; f'(x) = 3ax² + 2bx + c</p>
          <ul>
            <li>Sprungfrei bei x = 0: f(0) = 0 ➔ <strong>d = 0</strong></li>
            <li>Knickfrei bei x = 0: f'(0) = 0 ➔ <strong>c = 0</strong></li>
            <li>Sprungfrei bei x = 4: f(4) = 2 ➔ 64a + 16b = 2</li>
            <li>Knickfrei bei x = 4: f'(4) = 0 ➔ 48a + 8b = 0 ⇔ <strong>b = -6a</strong></li>
          </ul>
        </div>
      </div>

      <div class="challenge-subtask-card">
        <div class="st-header">
          <span class="st-badge" style="background:#0284c7;">Schritt 2</span>
          <strong>Koeffizienten a und b berechnen</strong>
        </div>
        <div class="action-row-leakproof">
          <button class="btn-spoiler" id="btn-spoiler-trass1-2" onclick="toggleSpoiler('spoiler-trass1-2')">👁️ Lösung aufdecken</button>
        </div>
        <div id="spoiler-trass1-2" class="spoiler-box" style="display:none;">
          <p>Setze b = -6a in 64a + 16b = 2 ein:</p>
          <p>64a + 16(-6a) = 2 ⇔ 64a - 96a = 2 ⇔ -32a = 2 ➔ <strong>a = -1/16 = -0,0625</strong></p>
          <p>Damit ist: b = -6(-1/16) = 6/16 = <strong>3/8 = 0,375</strong></p>
          <div class="formula-box">
            <strong>f(x) = -1/16 x³ + 3/8 x²</strong> &nbsp; (für 0 ≤ x ≤ 4)
          </div>
        </div>
      </div>

      <div class="guide-card cas-card">
        <div class="guide-title">
          <span class="guide-icon">📟</span>
          <strong>TI-Nspire CAS Kurzbefehl:</strong>
        </div>
        <div class="code-snippet">
          Define f(x) = a*x^3 + b*x^2 + c*x + d<br>
          Define f1(x) = d(f(x), x)<br>
          <strong>solve(f(0)=0 and f1(0)=0 and f(4)=2 and f1(4)=0, {a,b,c,d})</strong>
        </div>
      </div>
    `;

    if (vizCard) {
      vizCard.innerHTML = `
        <div class="viz-header-row">
          <strong>Straßenverlauf Challenge 1:</strong>
          <span class="param-badge" style="background:#dcfce7; color:#15803d;">Knickfrei &amp; Sprungfrei</span>
        </div>
        <p style="font-size: 0.76rem; color: #475569;">
          Drei Abschnitte: Links g₁(x) = 0, Mitte f(x) = -1/16 x³ + 3/8 x², Rechts g₂(x) = 2.
        </p>
      `;
    }

    if (legendArea) {
      legendArea.innerHTML = `
        <span class="legend-dot" style="color:#64748b;">━ Zubringer g₁(x)=0 (x ≤ 0)</span>
        <span class="legend-dot" style="color:#ea580c;">━ Trasse f(x) (0 ≤ x ≤ 4)</span>
        <span class="legend-dot" style="color:#64748b;">━ Straße g₂(x)=2 (x ≥ 4)</span>
        <span class="legend-dot" style="color:#16a34a;">● Übergangspunkte</span>
      `;
    }
  }
}

// Trassierung Canvas Drawing
function drawTrassierungCanvas() {
  const canvas = document.getElementById('trassCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const w = canvas.width;
  const h = canvas.height;

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, w, h);

  if (currentTrassMode === 't2') {
    // ==========================================
    // PLOT FOR CHALLENGE 2: g1=0, f(x)=-0.25x³+x², g2=x
    // ==========================================
    const originX = w * 0.28;
    const originY = h * 0.78;
    const scaleX = 72;
    const scaleY = 72;

    // Grid
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#e2e8f0";
    ctx.beginPath();
    for (let x = -2; x <= 6; x++) {
      const sx = originX + x * scaleX;
      ctx.moveTo(sx, 0); ctx.lineTo(sx, h);
    }
    for (let y = -1; y <= 4; y++) {
      const sy = originY - y * scaleY;
      ctx.moveTo(0, sy); ctx.lineTo(w, sy);
    }
    ctx.stroke();

    // Axes
    ctx.lineWidth = 1.4;
    ctx.strokeStyle = "#334155";
    ctx.beginPath();
    ctx.moveTo(10, originY); ctx.lineTo(w - 10, originY);
    ctx.moveTo(originX, h - 10); ctx.lineTo(originX, 10);
    ctx.stroke();

    // Labels
    ctx.fillStyle = "#334155";
    ctx.font = "9px sans-serif";
    for (let x = -1; x <= 5; x++) {
      if (x === 0) continue;
      ctx.fillText(x.toString(), originX + x * scaleX - 3, originY + 12);
    }
    for (let y = 1; y <= 3; y++) {
      ctx.fillText(y.toString(), originX - 14, originY - y * scaleY + 3);
    }

    // 1. Left Road: g1(x) = 0 for x <= 0
    ctx.strokeStyle = "#64748b";
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    ctx.moveTo(originX - 2.2 * scaleX, originY);
    ctx.lineTo(originX, originY);
    ctx.stroke();

    // 2. Middle Connecting Curve: f(x) = -0.25 x³ + x² for 0 <= x <= 2
    ctx.strokeStyle = "#16a34a"; // green
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    for (let px = originX; px <= originX + 2 * scaleX; px += 1) {
      const x = (px - originX) / scaleX;
      const y = -0.25 * x**3 + x**2;
      const py = originY - y * scaleY;
      if (px === originX) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();

    // 3. Right Road: g2(x) = x for x >= 2
    ctx.strokeStyle = "#64748b";
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    ctx.moveTo(originX + 2 * scaleX, originY - 2 * scaleY);
    ctx.lineTo(originX + 4.2 * scaleX, originY - 4.2 * scaleY);
    ctx.stroke();

    // Wendetangente at x = 4/3 ≈ 1.33 with slope 4/3
    ctx.strokeStyle = "#d97706";
    ctx.lineWidth = 1.6;
    ctx.setLineDash([4, 3]);
    ctx.beginPath();
    const xw = 4/3;
    const yw = 32/27;
    const tanX1 = xw - 0.7;
    const tanY1 = yw - (4/3) * 0.7;
    const tanX2 = xw + 0.7;
    const tanY2 = yw + (4/3) * 0.7;
    ctx.moveTo(originX + tanX1 * scaleX, originY - tanY1 * scaleY);
    ctx.lineTo(originX + tanX2 * scaleX, originY - tanY2 * scaleY);
    ctx.stroke();
    ctx.setLineDash([]);

    // Transition Points
    drawKeyPoint(ctx, originX, originY, "#16a34a", "A(0|0) knickfrei");
    drawKeyPoint(ctx, originX + 2 * scaleX, originY - 2 * scaleY, "#16a34a", "B(2|2) knickfrei");
    drawKeyPoint(ctx, originX + xw * scaleX, originY - yw * scaleY, "#7c3aed", `W(1,33|1,19) max. Steigung 133%`);

  } else {
    // ==========================================
    // PLOT FOR CHALLENGE 1: g1=0, f(x)=-1/16x³+3/8x², g2=2
    // ==========================================
    const originX = w * 0.28;
    const originY = h * 0.72;
    const scaleX = 46;
    const scaleY = 46;

    // Grid
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#e2e8f0";
    ctx.beginPath();
    for (let x = -3; x <= 8; x++) {
      const sx = originX + x * scaleX;
      ctx.moveTo(sx, 0); ctx.lineTo(sx, h);
    }
    for (let y = -2; y <= 5; y++) {
      const sy = originY - y * scaleY;
      ctx.moveTo(0, sy); ctx.lineTo(w, sy);
    }
    ctx.stroke();

    // Axes
    ctx.lineWidth = 1.4;
    ctx.strokeStyle = "#334155";
    ctx.beginPath();
    ctx.moveTo(10, originY); ctx.lineTo(w - 10, originY);
    ctx.moveTo(originX, h - 10); ctx.lineTo(originX, 10);
    ctx.stroke();

    // Labels & ticks
    ctx.fillStyle = "#334155";
    ctx.font = "9px sans-serif";
    for (let x = -2; x <= 6; x++) {
      if (x === 0) continue;
      ctx.fillText(x.toString(), originX + x * scaleX - 3, originY + 12);
    }
    for (let y = 1; y <= 3; y++) {
      ctx.fillText(y.toString(), originX - 14, originY - y * scaleY + 3);
    }

    // 1. Left Road: g1(x) = 0 for x <= 0
    ctx.strokeStyle = "#64748b";
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    ctx.moveTo(originX - 2.5 * scaleX, originY);
    ctx.lineTo(originX, originY);
    ctx.stroke();

    // 2. Middle Connecting Curve: f(x) = -1/16 x³ + 3/8 x² for 0 <= x <= 4
    ctx.strokeStyle = "#ea580c";
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    for (let px = originX; px <= originX + 4 * scaleX; px += 2) {
      const x = (px - originX) / scaleX;
      const y = (-1/16) * x**3 + (3/8) * x**2;
      const py = originY - y * scaleY;
      if (px === originX) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();

    // 3. Right Road: g2(x) = 2 for x >= 4
    ctx.strokeStyle = "#64748b";
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    ctx.moveTo(originX + 4 * scaleX, originY - 2 * scaleY);
    ctx.lineTo(originX + 6.5 * scaleX, originY - 2 * scaleY);
    ctx.stroke();

    // Transition Points
    drawKeyPoint(ctx, originX, originY, "#16a34a", "A(0|0) knickfrei");
    drawKeyPoint(ctx, originX + 4 * scaleX, originY - 2 * scaleY, "#16a34a", "B(4|2) knickfrei");
  }
}

function drawCurveGeneric(ctx, fn, ox, oy, sx, sy, w, color, lineWidth) {
  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth;
  ctx.beginPath();
  let first = true;
  for (let px = 0; px <= w; px += 2) {
    const x = (px - ox) / sx;
    const y = fn(x);
    const py = oy - y * sy;
    if (first) {
      ctx.moveTo(px, py);
      first = false;
    } else {
      ctx.lineTo(px, py);
    }
  }
  ctx.stroke();
}

function drawKeyPoint(ctx, sx, sy, color, label) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(sx, sy, 4.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.font = "bold 9px sans-serif";
  ctx.fillStyle = color;
  ctx.fillText(label, sx + 6, sy - 4);
}

// Initial setup
window.addEventListener('DOMContentLoaded', () => {
  switchScharTask('task3');
  switchTrassMode('t2');
});
