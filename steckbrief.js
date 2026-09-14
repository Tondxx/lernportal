// Steckbrief Trainer Engine (Set 1: Buch S. 18 & Set 2: Klausur-Training Neu)
// Absolutely NO visible dollar signs or raw unescaped LaTeX symbols!

const STECKBRIEF_SETS = {
  1: {
    title: "Aufgabe 1 (Buch S. 18) • Steckbriefbeschreibungen übersetzen",
    rows: [
      {
        letter: "a",
        text: "verläuft durch den Punkt P(2|3)",
        eq: "f(2) = 3",
        note: "1 Bedingung: einfacher Kurvenpunkt"
      },
      {
        letter: "b",
        text: "berührt die x-Achse an der Stelle -3",
        eq: "f(-3) = 0 \quad \text{und} \quad f'(-3) = 0",
        note: "2 Bedingungen: Funktionswert 0 und Steigung 0 (Berührpunkt!)"
      },
      {
        letter: "c",
        text: "hat an der Stelle 1 eine Tangente, die parallel zu y = 3x + 2 verläuft",
        eq: "f'(1) = 3",
        note: "1 Bedingung: Parallele Tangenten haben die gleiche Steigung m = 3"
      },
      {
        letter: "d",
        text: "hat eine Wendetangente an der Stelle 2 mit t(x) = 4,5x - 6",
        eq: "f''(2) = 0, \quad f'(2) = 4{,}5, \quad f(2) = 3",
        note: "3 Bedingungen: Wendepunkt (f''=0), Steigung (m=4,5) und Punkt auf Tangente: t(2)=3!"
      },
      {
        letter: "e",
        text: "hat einen Hochpunkt H(-1|4)",
        eq: "f(-1) = 4 \quad \text{und} \quad f'(-1) = 0",
        note: "2 Bedingungen: Kurvenpunkt und waagerechte Tangente (Extremstelle)"
      },
      {
        letter: "f",
        text: "hat eine Wendetangente an der Stelle -1",
        eq: "f''(-1) = 0",
        note: "Wendetangente berührt im Wendepunkt → 2. Ableitung ist 0"
      },
      {
        letter: "g",
        text: "hat einen Sattelpunkt S(7|1)",
        eq: "f(7) = 1, \quad f'(7) = 0, \quad f''(7) = 0",
        note: "3 Bedingungen: Punkt, waagerechte Tangente UND Wendepunkt gleichzeitig!"
      },
      {
        letter: "h",
        text: "schneidet die x-Achse an der Stelle 2",
        eq: "f(2) = 0",
        note: "1 Bedingung: einfache Nullstelle"
      },
      {
        letter: "i",
        text: "berührt die x-Achse an der Stelle -5",
        eq: "f(-5) = 0 \quad \text{und} \quad f'(-5) = 0",
        note: "2 Bedingungen: Nullstelle UND Extrempunkt auf der Achse"
      }
    ],
    task2Html: `
      <div class="task2-item">
        <div class="task2-title">
          <span class="sub-letter">a)</span>
          <span>Punktsymmetrisch zum Ursprung, Tiefpunkt T(-2|-4), Nullstelle bei x = -4.</span>
        </div>
        <button class="btn-step-toggle" onclick="toggleTask2('2a')">💡 Lösung anzeigen</button>
        <div id="sol-2a" class="task2-solution">
          <div class="sol-step">
            <strong>1. Symmetrie-Vorteil:</strong> Punktsymmetrisch bedeutet: <em>Nur ungerade Potenzen</em> → f(x) = ax³ + bx.
          </div>
          <div class="sol-step">
            <strong>2. Die 3 Gleichungen aufstellen:</strong>
            <ul>
              <li>Tiefpunkt-Lage: f(-2) = -4 → a(-2)³ + b(-2) = -4 ⇔ <strong>-8a - 2b = -4</strong></li>
              <li>Tiefpunkt-Steigung: f'(-2) = 0 → 3a(-2)² + b = 0 ⇔ <strong>12a + b = 0</strong></li>
              <li>Nullstelle: f(-4) = 0 → a(-4)³ + b(-4) = 0 ⇔ <strong>-64a - 4b = 0</strong></li>
            </ul>
          </div>
        </div>
      </div>

      <div class="task2-item">
        <div class="task2-title">
          <span class="sub-letter">b)</span>
          <span>Geht durch P(4|3), Hochpunkt H(1|2), Sattelpunkt S(-3|-2).</span>
        </div>
        <button class="btn-step-toggle" onclick="toggleTask2('2b')">💡 6 Gleichungen anzeigen</button>
        <div id="sol-2b" class="task2-solution">
          <div class="sol-step">
            <strong>Ansatz:</strong> Polynom 5. Grades (6 Unbekannte): f(x) = ax⁵ + bx⁴ + cx³ + dx² + ex + f
          </div>
          <div class="sol-step">
            <strong>Die 6 Bedingungen:</strong>
            <ol>
              <li>Punkt P: f(4) = 3</li>
              <li>Hochpunkt-Lage: f(1) = 2</li>
              <li>Hochpunkt-Steigung: f'(1) = 0</li>
              <li>Sattelpunkt-Lage: f(-3) = -2</li>
              <li>Sattelpunkt-Steigung: f'(-3) = 0</li>
              <li>Sattelpunkt-Krümmung (Wendepunkt): f''(-3) = 0</li>
            </ol>
          </div>
        </div>
      </div>
    `
  },

  2: {
    title: "Aufgabe 1 (Set 2: Klausur-Training) • Schwierigere & typische Prüfungsfälle",
    rows: [
      {
        letter: "a",
        text: "hat im Ursprung O(0|0) die Steigung 2",
        eq: "f(0) = 0 \quad \text{und} \quad f'(0) = 2",
        note: "2 Bedingungen: Geht durch (0|0) und hat dort 1. Ableitung gleich 2"
      },
      {
        letter: "b",
        text: "berührt die Gerade y = 4x - 1 an der Stelle x = 1",
        eq: "f'(1) = 4 \quad \text{und} \quad f(1) = 3",
        note: "2 Bedingungen: Steigung m=4 und gemeinsamer Berührpunkt: y(1) = 4(1)-1 = 3!"
      },
      {
        letter: "c",
        text: "hat einen Tiefpunkt bei T(3|-5)",
        eq: "f(3) = -5 \quad \text{und} \quad f'(3) = 0",
        note: "2 Bedingungen: Kurvenpunkt und waagerechte Tangente"
      },
      {
        letter: "d",
        text: "hat im Wendepunkt W(0|2) einen Steigungswinkel von 45°",
        eq: "f(0) = 2, \quad f''(0) = 0, \quad f'(0) = 1",
        note: "3 Bedingungen: Punkt, Wendestelle (f''=0) und m = tan(45°) = 1!"
      },
      {
        letter: "e",
        text: "hat einen Sattelpunkt bei S(-1|4)",
        eq: "f(-1) = 4, \quad f'(-1) = 0, \quad f''(-1) = 0",
        note: "3 Bedingungen: Extremstelle UND Wendestelle im selben Punkt!"
      },
      {
        letter: "f",
        text: "schneidet die y-Achse bei y = -3 mit waagerechter Tangente",
        eq: "f(0) = -3 \quad \text{und} \quad f'(0) = 0",
        note: "2 Bedingungen: y-Achsenabschnitt ist bei x=0, waagerecht heißt f'(0)=0"
      },
      {
        letter: "g",
        text: "berührt die x-Achse bei x = 4",
        eq: "f(4) = 0 \quad \text{und} \quad f'(4) = 0",
        note: "2 Bedingungen: doppelte Nullstelle (Wert 0 und Steigung 0)"
      },
      {
        letter: "h",
        text: "hat eine Wendetangente bei x = -2 mit t(x) = -3x + 5",
        eq: "f''(-2) = 0, \quad f'(-2) = -3, \quad f(-2) = 11",
        note: "3 Bedingungen: Wendepunkt f''=0, m=-3 und Berührpunkt t(-2) = -3(-2)+5 = 11"
      },
      {
        letter: "i",
        text: "ist achsensymmetrisch zur y-Achse und hat einen Hochpunkt bei H(2|8)",
        eq: "f(2) = 8, \quad f'(2) = 0 \quad \text{(Ansatz nur gerade Potenzen)}",
        note: "Wegen Symmetrie hat der Graph automatisch auch bei H(-2|8) einen Hochpunkt!"
      }
    ],
    task2Html: `
      <div class="task2-item">
        <div class="task2-title">
          <span class="sub-letter">a)</span>
          <span>Funktion 4. Grades, achsensymmetrisch zur y-Achse, Nullstelle bei P(2|0), Wendepunkt bei W(1|3).</span>
        </div>
        <button class="btn-step-toggle" onclick="toggleTask2('2a_set2')">💡 Lösung anzeigen</button>
        <div id="sol-2a_set2" class="task2-solution">
          <div class="sol-step">
            <strong>1. Symmetrie:</strong> Achsensymmetrisch → <em>nur gerade Potenzen</em>: f(x) = ax⁴ + bx² + c (nur 3 Unbekannte!).
          </div>
          <div class="sol-step">
            <strong>2. Die 3 Gleichungen:</strong>
            <ul>
              <li>Nullstelle: f(2) = 0 → a(2)⁴ + b(2)² + c = 0 ⇔ <strong>16a + 4b + c = 0</strong></li>
              <li>Wendepunkt-Lage: f(1) = 3 → a(1)⁴ + b(1)² + c = 3 ⇔ <strong>a + b + c = 3</strong></li>
              <li>Wendepunkt-Krümmung: f''(1) = 0 → 12a(1)² + 2b = 0 ⇔ <strong>12a + 2b = 0</strong></li>
            </ul>
          </div>
        </div>
      </div>

      <div class="task2-item">
        <div class="task2-title">
          <span class="sub-letter">b)</span>
          <span>Funktion 3. Grades, Wendepunkt im Ursprung mit Wendetangente t(x) = -2x, Tiefpunkt bei x = 2 mit y = -8.</span>
        </div>
        <button class="btn-step-toggle" onclick="toggleTask2('2b_set2')">💡 4 Gleichungen anzeigen</button>
        <div id="sol-2b_set2" class="task2-solution">
          <div class="sol-step">
            <strong>Ansatz &amp; Symmetrie:</strong> Wendepunkt im Ursprung bedeutet Punktsymmetrie → f(x) = ax³ + bx.
          </div>
          <div class="sol-step">
            <strong>Die Bedingungen:</strong>
            <ol>
              <li>Ursprung: f(0) = 0</li>
              <li>Wendestelle: f''(0) = 0 (automatisch erfüllt)</li>
              <li>Wendetangenten-Steigung: f'(0) = -2 → b = -2</li>
              <li>Tiefpunkt-Steigung: f'(2) = 0 → 3a(2)² + b = 0 ⇔ <strong>12a + b = 0</strong></li>
              <li>Tiefpunkt-Lage: f(2) = -8 → a(2)³ + b(2) = -8 ⇔ <strong>8a + 2b = -8</strong></li>
            </ol>
          </div>
        </div>
      </div>
    `
  }
};

let currentSbSet = 2; // Default to Set 2 (the new requested set)
let allRevealed = false;

function switchSbSet(setNum) {
  currentSbSet = setNum;
  document.getElementById('btn-sb-set1').classList.toggle('active', setNum === 1);
  document.getElementById('btn-sb-set2').classList.toggle('active', setNum === 2);
  allRevealed = false;
  renderSteckbriefContent();
}

function renderSteckbriefContent() {
  const data = STECKBRIEF_SETS[currentSbSet];
  document.getElementById('task1-title').innerText = data.title;

  const tbody = document.getElementById('quiz-tbody-1');
  if (!tbody) return;
  tbody.innerHTML = '';

  data.rows.forEach((item, idx) => {
    const tr = document.createElement('tr');
    tr.className = 'quiz-row';
    tr.id = `qrow-${idx}`;
    tr.onclick = () => toggleRowSolution(idx);

    tr.innerHTML = `
      <td class="col-letter"><strong>${item.letter})</strong></td>
      <td class="col-text">${item.text}</td>
      <td class="col-eq">
        <div class="eq-cover" id="cover-${idx}">
          <span class="click-prompt">👉 Klicken zum Aufdecken</span>
        </div>
        <div class="eq-content" id="eq-box-${idx}" style="display: none;">
          <div class="katex-eq" id="katex-eq-${idx}"></div>
          <div class="eq-note">${item.note}</div>
        </div>
      </td>
    `;
    tbody.appendChild(tr);
  });

  // Render task 2
  const task2Area = document.getElementById('task2-content-area');
  if (task2Area) {
    task2Area.innerHTML = data.task2Html;
  }

  // Render KaTeX for equation fields
  data.rows.forEach((item, idx) => {
    const el = document.getElementById(`katex-eq-${idx}`);
    if (el) {
      if (window.katex) {
        try {
          katex.render(item.eq, el, { throwOnError: false, displayMode: false });
        } catch(e) {
          el.innerText = item.eq;
        }
      } else {
        el.innerText = item.eq;
      }
    }
  });
}

function toggleRowSolution(idx) {
  const cover = document.getElementById(`cover-${idx}`);
  const box = document.getElementById(`eq-box-${idx}`);
  if (!cover || !box) return;

  if (box.style.display === 'none') {
    box.style.display = 'block';
    cover.style.display = 'none';
  } else {
    box.style.display = 'none';
    cover.style.display = 'block';
  }
}

function toggleAllSolutions() {
  allRevealed = !allRevealed;
  const data = STECKBRIEF_SETS[currentSbSet];
  data.rows.forEach((_, idx) => {
    const cover = document.getElementById(`cover-${idx}`);
    const box = document.getElementById(`eq-box-${idx}`);
    if (cover && box) {
      if (allRevealed) {
        box.style.display = 'block';
        cover.style.display = 'none';
      } else {
        box.style.display = 'none';
        cover.style.display = 'block';
      }
    }
  });
}

function toggleTask2(key) {
  const el = document.getElementById(`sol-${key}`);
  if (!el) return;
  el.style.display = (el.style.display === 'block') ? 'none' : 'block';
}

function switchMainTab(tab) {
  const tabs = ['schar', 'trassierung', 'steckbrief', 'matrizen'];
  tabs.forEach(t => {
    const btn = document.getElementById('tab-btn-' + t);
    const view = document.getElementById('view-' + t);
    if (btn) btn.classList.toggle('active', t === tab);
    if (view) view.classList.toggle('active-view', t === tab);
  });

  if (tab === 'schar' && typeof updateScharPlot === 'function') {
    setTimeout(updateScharPlot, 50);
  } else if (tab === 'trassierung' && typeof switchTrassMode === 'function') {
    switchTrassMode(typeof currentTrassMode !== 'undefined' ? currentTrassMode : 't2');
  } else if (tab === 'matrizen' && typeof loadLevelData === 'function') {
    loadLevelData();
  }
}

// Initial setup
window.addEventListener('DOMContentLoaded', () => {
  renderSteckbriefContent();
});
