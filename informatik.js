// =========================================================================
// informatik.js - Dediziertes Lern- & Aufgabenportal Informatik eA (Abi 28)
// Kategorie: Grundlagen der Algorithmik -> Sortieralgorithmen (Interaktiv)
// Lehrkraft: Maria Tripel | Gruppe: Phineaus & Tonda
// =========================================================================

let CURRENT_INFO_TAB = 'grundlagen';

// Visualizer State
let SORT_VISUALIZER = {
  algo: 'insertionsort', // 'insertionsort' | 'quicksort'
  rawArray: [38, 14, 45, 22, 9, 50, 18, 31],
  steps: [],
  currentStep: 0,
  isPlaying: false,
  timer: null,
  speedMs: 600
};

function renderInformatikPortal() {
  const gridEl = document.getElementById('themenGrid') || document.getElementById('fachThemenGrid');
  if (!gridEl) return;

  gridEl.className = 'info-portal-container';
  gridEl.style.display = 'block';

  gridEl.innerHTML = `
    <!-- Top Alert & Action Bar -->
    <div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); color: #f8fafc; border-radius: 12px; padding: 1.25rem 1.5rem; margin-bottom: 1.5rem; box-shadow: 0 4px 15px rgba(0,0,0,0.15); border: 1px solid #334155;">
      <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 1rem;">
        <div>
          <div style="display: flex; align-items: center; gap: 0.6rem; margin-bottom: 0.4rem;">
            <span style="background: #06b6d4; color: #082f49; font-weight: 800; font-size: 0.75rem; padding: 0.2rem 0.6rem; border-radius: 4px; text-transform: uppercase;">Abi28 IF13 eA</span>
            <span style="background: #10b981; color: #ffffff; font-weight: 700; font-size: 0.75rem; padding: 0.2rem 0.6rem; border-radius: 4px;">Kategorie: Grundlagen</span>
            <span style="color: #94a3b8; font-size: 0.85rem;">Partner: Phineaus &amp; Tonda | Lehrkraft: Frau Tripel</span>
          </div>
          <h1 style="font-size: 1.45rem; font-weight: 800; margin: 0; color: #ffffff;">
            💻 Grundlagen: Sortieralgorithmen &amp; Algorithmen-Analyse
          </h1>
          <p style="margin: 0.4rem 0 0 0; color: #cbd5e1; font-size: 0.9rem; max-width: 850px;">
            Interaktive Schritt-für-Schritt Animationen zu <strong>Insertionsort</strong> und <strong>Quicksort</strong>,
            kompakte Erklärungen, lauffähige Beispielprogramme und DIN-Struktogramme.
          </p>
        </div>
        <div style="display: flex; flex-direction: column; gap: 0.5rem; min-width: 220px;">
          <a href="/Abgabe_Informatik_Tonda_Beutler.pdf" target="_blank" download="Abgabe_Informatik_Tonda_Beutler.pdf" style="display: flex; align-items: center; justify-content: center; gap: 0.5rem; background: #2563eb; color: #ffffff; text-decoration: none; padding: 0.6rem 1rem; border-radius: 8px; font-weight: 700; font-size: 0.88rem; box-shadow: 0 2px 8px rgba(37,99,235,0.4); text-align: center; transition: background 0.2s;">
            <span>📄</span> <span>Abgabe-PDF anzeigen</span>
          </a>
          <button onclick="copyInfoIservText()" style="display: flex; align-items: center; justify-content: center; gap: 0.5rem; background: #334155; color: #f8fafc; border: 1px solid #475569; padding: 0.5rem 1rem; border-radius: 8px; font-weight: 600; font-size: 0.82rem; cursor: pointer; transition: all 0.2s;">
            <span id="copyBtnIcon">📋</span> <span id="copyBtnText">IServ-Begleittext kopieren</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Tab Navigation -->
    <div style="display: flex; gap: 0.5rem; border-bottom: 2px solid #e2e8f0; margin-bottom: 1.5rem; overflow-x: auto; padding-bottom: 2px;">
      <button onclick="switchInfoTab('grundlagen')" id="infoTabBtn-grundlagen" style="display: flex; align-items: center; gap: 0.5rem; padding: 0.65rem 1.1rem; border: none; background: transparent; font-weight: 700; font-size: 0.92rem; color: #2563eb; border-bottom: 3px solid #2563eb; cursor: pointer; border-radius: 6px 6px 0 0;">
        <span>⚡</span> <span>1. Grundlagen: Sortieralgorithmen (Interaktiv)</span>
      </button>
      <button onclick="switchInfoTab('struktogramme')" id="infoTabBtn-struktogramme" style="display: flex; align-items: center; gap: 0.5rem; padding: 0.65rem 1.1rem; border: none; background: transparent; font-weight: 600; font-size: 0.92rem; color: #64748b; border-bottom: 3px solid transparent; cursor: pointer; border-radius: 6px 6px 0 0;">
        <span>📐</span> <span>2. DIN Struktogramme (S. 12ff.)</span>
      </button>
      <button onclick="switchInfoTab('komplexitaet')" id="infoTabBtn-komplexitaet" style="display: flex; align-items: center; gap: 0.5rem; padding: 0.65rem 1.1rem; border: none; background: transparent; font-weight: 600; font-size: 0.92rem; color: #64748b; border-bottom: 3px solid transparent; cursor: pointer; border-radius: 6px 6px 0 0;">
        <span>📊</span> <span>3. Komplexitätsanalyse &amp; Aufgabe 2</span>
      </button>
    </div>

    <!-- TAB 1: GRUNDLAGEN (SORTIERVERFAHREN INTERAKTIV) -->
    <div id="infoTabContent-grundlagen" style="display: block;">
      ${renderInfoGrundlagenSection()}
    </div>

    <!-- TAB 2: STRUKTOGRAMME -->
    <div id="infoTabContent-struktogramme" style="display: none;">
      ${renderInfoStruktogrammeSection()}
    </div>

    <!-- TAB 3: KOMPLEXITÄT -->
    <div id="infoTabContent-komplexitaet" style="display: none;">
      ${renderInfoKomplexitaetSection()}
    </div>
  `;

  // Initialize visualizer after DOM mount
  setTimeout(() => {
    initSortVisualizer(SORT_VISUALIZER.algo);
  }, 50);
}

function switchInfoTab(tabId) {
  CURRENT_INFO_TAB = tabId;
  ['grundlagen', 'struktogramme', 'komplexitaet'].forEach(t => {
    const btn = document.getElementById(`infoTabBtn-${t}`);
    const cnt = document.getElementById(`infoTabContent-${t}`);
    if (btn) {
      if (t === tabId) {
        btn.style.color = '#2563eb';
        btn.style.fontWeight = '700';
        btn.style.borderBottom = '3px solid #2563eb';
      } else {
        btn.style.color = '#64748b';
        btn.style.fontWeight = '600';
        btn.style.borderBottom = '3px solid transparent';
      }
    }
    if (cnt) {
      cnt.style.display = (t === tabId) ? 'block' : 'none';
    }
  });

  if (tabId === 'grundlagen') {
    setTimeout(() => updateVisualizerDOM(), 20);
  }
}

// -------------------------------------------------------------------------
// 1. GRUNDLAGEN: INTERAKTIVER SORTIER-VISUALIZER & ERKLÄRUNGEN
// -------------------------------------------------------------------------
function renderInfoGrundlagenSection() {
  return `
    <div style="display: flex; flex-direction: column; gap: 2rem;">

      <!-- INTERAKTIVE ANIMATIONS-CARD -->
      <div style="background: var(--bg-card, #ffffff); border: 1px solid #cbd5e1; border-radius: 12px; padding: 1.5rem; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
        
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; margin-bottom: 1.25rem;">
          <div>
            <span style="font-size: 0.78rem; font-weight: 800; background: #e0e7ff; color: #3730a3; padding: 0.2rem 0.6rem; border-radius: 4px; text-transform: uppercase;">
              Interaktive Visualisierung
            </span>
            <h2 style="font-size: 1.35rem; font-weight: 800; color: #0f172a; margin: 0.35rem 0 0.15rem 0;">
              Sortieralgorithmus in Aktion
            </h2>
            <p style="font-size: 0.88rem; color: #64748b; margin: 0;">
              Wähle einen Algorithmus und beobachte Vergleiche, Verschiebungen und Pivot-Teilungen Schritt für Schritt.
            </p>
          </div>

          <!-- Algorithmus Wähler -->
          <div style="display: flex; gap: 0.4rem; background: #f1f5f9; padding: 4px; border-radius: 8px;">
            <button id="btnAlgoInsert" onclick="selectSortAlgo('insertionsort')" style="padding: 0.5rem 1rem; border: none; border-radius: 6px; font-weight: 700; font-size: 0.88rem; cursor: pointer; background: #2563eb; color: #ffffff; transition: all 0.2s;">
              Insertionsort
            </button>
            <button id="btnAlgoQuick" onclick="selectSortAlgo('quicksort')" style="padding: 0.5rem 1rem; border: none; border-radius: 6px; font-weight: 600; font-size: 0.88rem; cursor: pointer; background: transparent; color: #475569; transition: all 0.2s;">
              Quicksort
            </button>
          </div>
        </div>

        <!-- Controls Bar -->
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.75rem; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 0.75rem 1rem; margin-bottom: 1.25rem;">
          <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
            <button id="btnSortPlay" onclick="toggleSortPlay()" style="display: flex; align-items: center; gap: 0.4rem; background: #10b981; color: #ffffff; border: none; padding: 0.5rem 1rem; border-radius: 6px; font-weight: 700; font-size: 0.88rem; cursor: pointer;">
              <span id="sortPlayIcon">▶️</span> <span id="sortPlayText">Abspielen</span>
            </button>
            <button onclick="stepSortPrev()" style="background: #ffffff; border: 1px solid #cbd5e1; color: #334155; padding: 0.5rem 0.8rem; border-radius: 6px; font-weight: 600; font-size: 0.85rem; cursor: pointer;">
              ⏮️ Zurück
            </button>
            <button onclick="stepSortNext()" style="background: #ffffff; border: 1px solid #cbd5e1; color: #334155; padding: 0.5rem 0.8rem; border-radius: 6px; font-weight: 600; font-size: 0.85rem; cursor: pointer;">
              ⏭️ Nächster Schritt
            </button>
            <button onclick="resetSortVisualizer()" style="background: #ffffff; border: 1px solid #cbd5e1; color: #64748b; padding: 0.5rem 0.8rem; border-radius: 6px; font-weight: 600; font-size: 0.85rem; cursor: pointer;">
              🔄 Reset
            </button>
          </div>

          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <button onclick="shuffleSortArray()" style="background: #e0e7ff; border: 1px solid #c7d2fe; color: #3730a3; padding: 0.5rem 0.8rem; border-radius: 6px; font-weight: 700; font-size: 0.85rem; cursor: pointer;">
              🎲 Neue Zufallszahlen
            </button>
            <div style="display: flex; align-items: center; gap: 0.4rem; font-size: 0.82rem; color: #475569;">
              <span>Tempo:</span>
              <select id="sortSpeedSelect" onchange="changeSortSpeed(this.value)" style="border: 1px solid #cbd5e1; border-radius: 6px; padding: 0.35rem 0.5rem; background: #ffffff; font-size: 0.82rem; color: #0f172a;">
                <option value="1000">Langsam (1,0s)</option>
                <option value="500" selected>Normal (0,5s)</option>
                <option value="200">Schnell (0,2s)</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Animation Canvas / Bars Area -->
        <div style="position: relative; background: #fdfdfd; border: 1.5px solid #e2e8f0; border-radius: 10px; padding: 2rem 1.5rem 1rem 1.5rem; min-height: 240px; display: flex; align-items: flex-end; justify-content: center; gap: 14px; margin-bottom: 1rem; overflow-x: auto;">
          <div id="sortBarsContainer" style="display: flex; align-items: flex-end; justify-content: center; gap: 14px; width: 100%; height: 200px;">
            <!-- Bars injected by JS -->
          </div>
        </div>

        <!-- Live Step Description & Progress -->
        <div style="background: #f8fafc; border-left: 4px solid #3b82f6; border-radius: 0 8px 8px 0; padding: 0.85rem 1.1rem; display: flex; justify-content: space-between; align-items: center; gap: 1rem; flex-wrap: wrap;">
          <div>
            <div style="font-size: 0.75rem; font-weight: 800; color: #2563eb; text-transform: uppercase; margin-bottom: 2px;">
              Aktuelle Aktion:
            </div>
            <div id="sortStepDesc" style="font-size: 0.95rem; font-weight: 600; color: #0f172a;">
              Bereit zum Starten. Klicke auf „Abspielen“ oder „Nächster Schritt“.
            </div>
          </div>
          <div style="text-align: right; min-width: 130px;">
            <span id="sortStepCounter" style="font-size: 0.85rem; font-weight: 800; color: #64748b; background: #e2e8f0; padding: 0.25rem 0.6rem; border-radius: 12px;">
              Schritt 0 / 0
            </span>
          </div>
        </div>

        <!-- Farblegende -->
        <div style="display: flex; gap: 1.2rem; flex-wrap: wrap; margin-top: 1rem; font-size: 0.8rem; color: #475569; padding: 0 0.5rem;">
          <div style="display: flex; align-items: center; gap: 0.4rem;">
            <span style="width: 14px; height: 14px; background: #3b82f6; border-radius: 3px; display: inline-block;"></span>
            <span>Unsortiert</span>
          </div>
          <div style="display: flex; align-items: center; gap: 0.4rem;">
            <span style="width: 14px; height: 14px; background: #eab308; border-radius: 3px; display: inline-block;"></span>
            <span>Vergleich (aktiv)</span>
          </div>
          <div style="display: flex; align-items: center; gap: 0.4rem;">
            <span style="width: 14px; height: 14px; background: #ef4444; border-radius: 3px; display: inline-block;"></span>
            <span>Verschiebung / Tausch</span>
          </div>
          <div style="display: flex; align-items: center; gap: 0.4rem;">
            <span style="width: 14px; height: 14px; background: #a855f7; border-radius: 3px; display: inline-block;"></span>
            <span>Pivot-Element (Quicksort)</span>
          </div>
          <div style="display: flex; align-items: center; gap: 0.4rem;">
            <span style="width: 14px; height: 14px; background: #22c55e; border-radius: 3px; display: inline-block;"></span>
            <span>Sortiert</span>
          </div>
        </div>
      </div>

      <!-- DIE BEIDEN ALGORITHMEN IM DETAIL: ERKLÄRUNG & BEISPIEL-PROGRAMM -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem;">

        <!-- 1. INSERTIONSORT KARTE -->
        <div style="background: var(--bg-card, #ffffff); border: 1px solid #cbd5e1; border-top: 4px solid #3b82f6; border-radius: 10px; padding: 1.25rem; box-shadow: 0 2px 8px rgba(0,0,0,0.04);">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.6rem;">
            <h3 style="margin: 0; font-size: 1.15rem; color: #1e3a8a;">1. Insertionsort (Einfügen)</h3>
            <span style="font-size: 0.78rem; font-weight: 800; background: #dbeafe; color: #1e40af; padding: 0.15rem 0.5rem; border-radius: 4px;">
              Best O(n) | Worst O(n²)
            </span>
          </div>

          <p style="font-size: 0.88rem; color: #475569; line-height: 1.45; margin-bottom: 0.8rem;">
            <strong>Kurz erklärt:</strong> Funktioniert wie das Ordnen von Spielkarten auf der Hand.
            Das jeweils nächste unsortierte Element wird rückwärts mit den bereits sortierten Karten verglichen
            und an der passenden Stelle eingeschoben. Alle größeren Nachbarn rücken um eine Position nach rechts.
          </p>

          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 0.6rem 0.8rem; font-size: 0.82rem; margin-bottom: 0.8rem;">
            <strong>Beispiel-Ablauf:</strong> <code>[7, 3, 5, 2]</code><br>
            • <code>3</code> vor <code>7</code> &rarr; <code>[3, 7, 5, 2]</code><br>
            • <code>5</code> zw. <code>3</code> &amp; <code>7</code> &rarr; <code>[3, 5, 7, 2]</code><br>
            • <code>2</code> ganz nach vorn &rarr; <code>[2, 3, 5, 7]</code> (fertig)
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.3rem;">
            <span style="font-size: 0.8rem; font-weight: 700; color: #0f172a;">Python-Beispielprogramm:</span>
            <button onclick="copySnippet('codeInsertionsort')" style="font-size: 0.75rem; background: #f1f5f9; border: 1px solid #cbd5e1; border-radius: 4px; padding: 2px 6px; cursor: pointer;">📋 Code kopieren</button>
          </div>
          <pre style="background: #0f172a; color: #f8fafc; padding: 0.75rem; border-radius: 6px; font-size: 0.8rem; font-family: Consolas, monospace; overflow-x: auto; margin: 0;"><code id="codeInsertionsort">def insertionsort(liste):
    for i in range(1, len(liste)):
        wert = liste[i]
        j = i - 1
        # Größere Nachbarn nach rechts schieben
        while j >= 0 and liste[j] > wert:
            liste[j + 1] = liste[j]
            j -= 1
        liste[j + 1] = wert
    return liste

# Testlauf:
daten = [38, 14, 45, 22, 9]
print("Ergebnis:", insertionsort(daten))
# -> [9, 14, 22, 38, 45]</code></pre>
        </div>

        <!-- 2. QUICKSORT KARTE -->
        <div style="background: var(--bg-card, #ffffff); border: 1px solid #cbd5e1; border-top: 4px solid #a855f7; border-radius: 10px; padding: 1.25rem; box-shadow: 0 2px 8px rgba(0,0,0,0.04);">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.6rem;">
            <h3 style="margin: 0; font-size: 1.15rem; color: #581c87;">2. Quicksort (Zerlegen)</h3>
            <span style="font-size: 0.78rem; font-weight: 800; background: #f3e8ff; color: #7e22ce; padding: 0.15rem 0.5rem; border-radius: 4px;">
              Best/Avg O(n log n) | Worst O(n²)
            </span>
          </div>

          <p style="font-size: 0.88rem; color: #475569; line-height: 1.45; margin-bottom: 0.8rem;">
            <strong>Kurz erklärt:</strong> Arbeitet nach dem Prinzip „Teile und herrsche“ (Divide &amp; Conquer).
            Ein Referenzelement (<strong>Pivot</strong>) wird gewählt. Die Liste wird getrennt in Elemente,
            die kleiner als das Pivot sind, und solche, die größer sind. Beide Hälften werden rekursiv sortiert.
          </p>

          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 0.6rem 0.8rem; font-size: 0.82rem; margin-bottom: 0.8rem;">
            <strong>Beispiel-Ablauf:</strong> <code>[5, 2, 8, 3, 9, 1]</code> (Pivot = 3)<br>
            • Links (&lt; 3): <code>[2, 1]</code> &rarr; rekursiv: <code>[1, 2]</code><br>
            • Mitte (== 3): <code>[3]</code><br>
            • Rechts (&gt; 3): <code>[5, 8, 9]</code> &rarr; rekursiv: <code>[5, 8, 9]</code><br>
            • Zusammenfügen: <code>[1, 2] + [3] + [5, 8, 9]</code>
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.3rem;">
            <span style="font-size: 0.8rem; font-weight: 700; color: #0f172a;">Python-Beispielprogramm:</span>
            <button onclick="copySnippet('codeQuicksort')" style="font-size: 0.75rem; background: #f1f5f9; border: 1px solid #cbd5e1; border-radius: 4px; padding: 2px 6px; cursor: pointer;">📋 Code kopieren</button>
          </div>
          <pre style="background: #0f172a; color: #f8fafc; padding: 0.75rem; border-radius: 6px; font-size: 0.8rem; font-family: Consolas, monospace; overflow-x: auto; margin: 0;"><code id="codeQuicksort">def quicksort(liste):
    if len(liste) <= 1:
        return liste
    pivot = liste[len(liste) // 2]
    links = [x for x in liste if x < pivot]
    mitte = [x for x in liste if x == pivot]
    rechts = [x for x in liste if x > pivot]
    return quicksort(links) + mitte + quicksort(rechts)

# Testlauf:
daten = [38, 14, 45, 22, 9]
print("Ergebnis:", quicksort(daten))
# -> [9, 14, 22, 38, 45]</code></pre>
        </div>

      </div>
    </div>
  `;
}

// -------------------------------------------------------------------------
// VISUALIZER ENGINE: STEP GENERATION & ANIMATION LOGIC
// -------------------------------------------------------------------------
function selectSortAlgo(algo) {
  SORT_VISUALIZER.algo = algo;
  const btnIns = document.getElementById('btnAlgoInsert');
  const btnQck = document.getElementById('btnAlgoQuick');

  if (algo === 'insertionsort') {
    if (btnIns) { btnIns.style.background = '#2563eb'; btnIns.style.color = '#ffffff'; btnIns.style.fontWeight = '700'; }
    if (btnQck) { btnQck.style.background = 'transparent'; btnQck.style.color = '#475569'; btnQck.style.fontWeight = '600'; }
  } else {
    if (btnQck) { btnQck.style.background = '#a855f7'; btnQck.style.color = '#ffffff'; btnQck.style.fontWeight = '700'; }
    if (btnIns) { btnIns.style.background = 'transparent'; btnIns.style.color = '#475569'; btnIns.style.fontWeight = '600'; }
  }

  initSortVisualizer(algo);
}

function initSortVisualizer(algo = SORT_VISUALIZER.algo, customArr = null) {
  stopSortTimer();
  if (customArr) {
    SORT_VISUALIZER.rawArray = [...customArr];
  }
  SORT_VISUALIZER.algo = algo;

  if (algo === 'insertionsort') {
    SORT_VISUALIZER.steps = generateInsertionSortSteps(SORT_VISUALIZER.rawArray);
  } else {
    SORT_VISUALIZER.steps = generateQuickSortSteps(SORT_VISUALIZER.rawArray);
  }

  SORT_VISUALIZER.currentStep = 0;
  updateVisualizerDOM();
}

function toggleSortPlay() {
  if (SORT_VISUALIZER.isPlaying) {
    stopSortTimer();
  } else {
    startSortTimer();
  }
}

function startSortTimer() {
  SORT_VISUALIZER.isPlaying = true;
  updatePlayButton(true);

  if (SORT_VISUALIZER.currentStep >= SORT_VISUALIZER.steps.length - 1) {
    SORT_VISUALIZER.currentStep = 0;
  }

  SORT_VISUALIZER.timer = setInterval(() => {
    if (SORT_VISUALIZER.currentStep < SORT_VISUALIZER.steps.length - 1) {
      SORT_VISUALIZER.currentStep++;
      updateVisualizerDOM();
    } else {
      stopSortTimer();
    }
  }, SORT_VISUALIZER.speedMs);
}

function stopSortTimer() {
  SORT_VISUALIZER.isPlaying = false;
  if (SORT_VISUALIZER.timer) {
    clearInterval(SORT_VISUALIZER.timer);
    SORT_VISUALIZER.timer = null;
  }
  updatePlayButton(false);
}

function updatePlayButton(isPlaying) {
  const icon = document.getElementById('sortPlayIcon');
  const text = document.getElementById('sortPlayText');
  const btn = document.getElementById('btnSortPlay');
  if (!btn) return;
  if (isPlaying) {
    btn.style.background = '#eab308';
    if (icon) icon.textContent = '⏸️';
    if (text) text.textContent = 'Pause';
  } else {
    btn.style.background = '#10b981';
    if (icon) icon.textContent = '▶️';
    if (text) text.textContent = 'Abspielen';
  }
}

function stepSortNext() {
  stopSortTimer();
  if (SORT_VISUALIZER.currentStep < SORT_VISUALIZER.steps.length - 1) {
    SORT_VISUALIZER.currentStep++;
    updateVisualizerDOM();
  }
}

function stepSortPrev() {
  stopSortTimer();
  if (SORT_VISUALIZER.currentStep > 0) {
    SORT_VISUALIZER.currentStep--;
    updateVisualizerDOM();
  }
}

function resetSortVisualizer() {
  stopSortTimer();
  SORT_VISUALIZER.currentStep = 0;
  updateVisualizerDOM();
}

function shuffleSortArray() {
  stopSortTimer();
  // Generate 8 distinct random numbers between 8 and 60
  const set = new Set();
  while (set.size < 8) {
    set.add(Math.floor(Math.random() * 52) + 8);
  }
  SORT_VISUALIZER.rawArray = Array.from(set);
  initSortVisualizer(SORT_VISUALIZER.algo);
}

function changeSortSpeed(val) {
  SORT_VISUALIZER.speedMs = parseInt(val, 10) || 500;
  if (SORT_VISUALIZER.isPlaying) {
    stopSortTimer();
    startSortTimer();
  }
}

function updateVisualizerDOM() {
  const container = document.getElementById('sortBarsContainer');
  const descEl = document.getElementById('sortStepDesc');
  const counterEl = document.getElementById('sortStepCounter');
  if (!container || !SORT_VISUALIZER.steps.length) return;

  const step = SORT_VISUALIZER.steps[SORT_VISUALIZER.currentStep] || SORT_VISUALIZER.steps[0];
  const maxVal = Math.max(...step.array, 60);

  if (descEl) descEl.textContent = step.msg;
  if (counterEl) counterEl.textContent = `Schritt ${SORT_VISUALIZER.currentStep + 1} / ${SORT_VISUALIZER.steps.length}`;

  let html = '';
  step.array.forEach((val, idx) => {
    const heightPct = Math.round((val / maxVal) * 85) + 12; // 12% to 97% height

    let bgColor = '#3b82f6'; // normal blue
    let textColor = '#1e3a8a';
    let borderStyle = '1px solid #2563eb';

    const isSorted = (step.sorted || []).includes(idx);
    const isPivot = step.pivot === idx;
    const isComparing = (step.comparing || []).includes(idx);
    const isShifting = (step.shifting || []).includes(idx);

    if (isPivot) {
      bgColor = '#a855f7'; // purple
      borderStyle = '2px solid #7e22ce';
    } else if (isShifting) {
      bgColor = '#ef4444'; // red
      borderStyle = '2px solid #b91c1c';
    } else if (isComparing) {
      bgColor = '#eab308'; // yellow
      borderStyle = '2px solid #ca8a04';
    } else if (isSorted) {
      bgColor = '#22c55e'; // green
      borderStyle = '1px solid #16a34a';
    }

    // If outside range in quicksort
    if (step.range && (idx < step.range[0] || idx > step.range[1]) && !isSorted) {
      bgColor = '#cbd5e1';
      borderStyle = '1px dashed #94a3b8';
    }

    html += `
      <div style="flex: 1; max-width: 52px; display: flex; flex-direction: column; align-items: center; justify-content: flex-end; height: 100%;">
        <!-- Value Label -->
        <div style="font-size: 0.85rem; font-weight: 800; color: #0f172a; margin-bottom: 4px;">
          ${val}
        </div>
        <!-- Bar -->
        <div style="width: 100%; height: ${heightPct}%; background: ${bgColor}; border: ${borderStyle}; border-radius: 5px 5px 0 0; transition: height 0.25s ease, background-color 0.2s ease; box-shadow: 0 2px 5px rgba(0,0,0,0.08);">
        </div>
        <!-- Index Label -->
        <div style="font-size: 0.72rem; color: #64748b; margin-top: 4px; font-family: Consolas, monospace;">
          [${idx}]
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

// --- Generator 1: Insertionsort Steps ---
function generateInsertionSortSteps(input) {
  const steps = [];
  let a = [...input];
  let sortedIndices = [0];

  steps.push({
    array: [...a],
    comparing: [],
    shifting: [],
    sorted: [...sortedIndices],
    pivot: -1,
    msg: 'Start: Element an Index 0 gilt als bereits sortierte linke Teilliste.'
  });

  for (let i = 1; i < a.length; i++) {
    let key = a[i];
    let j = i - 1;

    steps.push({
      array: [...a],
      comparing: [],
      shifting: [],
      sorted: [...sortedIndices],
      pivot: -1,
      msg: `Runde i=${i}: Wähle Element an Index ${i} (Wert: ${key}) zum Einsortieren.`
    });

    while (j >= 0) {
      steps.push({
        array: [...a],
        comparing: [j, j + 1],
        shifting: [],
        sorted: [...sortedIndices],
        pivot: -1,
        msg: `Vergleiche Nachbar ${a[j]} (Index ${j}) mit einzufügendem Wert ${key}.`
      });

      if (a[j] > key) {
        a[j + 1] = a[j];
        steps.push({
          array: [...a],
          comparing: [],
          shifting: [j, j + 1],
          sorted: [...sortedIndices],
          pivot: -1,
          msg: `${a[j]} > ${key}: Schiebe ${a[j]} um eine Position nach rechts.`
        });
        j--;
      } else {
        steps.push({
          array: [...a],
          comparing: [j],
          shifting: [],
          sorted: [...sortedIndices],
          pivot: -1,
          msg: `${a[j]} <= ${key}: Richtige Einfüge-Position an Index ${j + 1} erreicht!`
        });
        break;
      }
    }

    a[j + 1] = key;
    if (!sortedIndices.includes(i)) sortedIndices.push(i);

    steps.push({
      array: [...a],
      comparing: [],
      shifting: [],
      sorted: [...sortedIndices],
      pivot: -1,
      msg: `Füge Wert ${key} an Index ${j + 1} ein. Sortierter linker Bereich wächst auf ${i + 1} Elemente.`
    });
  }

  steps.push({
    array: [...a],
    comparing: [],
    shifting: [],
    sorted: a.map((_, idx) => idx),
    pivot: -1,
    msg: '🎉 Fertig! Alle Elemente wurden erfolgreich durch Einfügen sortiert.'
  });

  return steps;
}

// --- Generator 2: Quicksort Steps ---
function generateQuickSortSteps(input) {
  const steps = [];
  let a = [...input];
  let sortedIndices = new Set();

  steps.push({
    array: [...a],
    comparing: [],
    shifting: [],
    sorted: [],
    pivot: -1,
    range: [0, a.length - 1],
    msg: `Start Quicksort: Betrachte das gesamte Array [0..${a.length - 1}].`
  });

  function qsort(left, right) {
    if (left >= right) {
      if (left === right) sortedIndices.add(left);
      return;
    }

    let mid = Math.floor((left + right) / 2);
    let pivotVal = a[mid];

    steps.push({
      array: [...a],
      comparing: [],
      shifting: [],
      sorted: Array.from(sortedIndices),
      pivot: mid,
      range: [left, right],
      msg: `Bereich [${left}..${right}]: Wähle Pivot-Element ${pivotVal} an Index ${mid}.`
    });

    // Move pivot to right
    let t = a[mid]; a[mid] = a[right]; a[right] = t;
    steps.push({
      array: [...a],
      comparing: [],
      shifting: [mid, right],
      sorted: Array.from(sortedIndices),
      pivot: right,
      range: [left, right],
      msg: `Platziere Pivot ${pivotVal} temporär ans Ende des Teilbereichs (Index ${right}).`
    });

    let i = left;
    for (let j = left; j < right; j++) {
      steps.push({
        array: [...a],
        comparing: [j, right],
        shifting: [],
        sorted: Array.from(sortedIndices),
        pivot: right,
        range: [left, right],
        msg: `Vergleiche Element ${a[j]} mit Pivot ${pivotVal}.`
      });

      if (a[j] < pivotVal) {
        if (i !== j) {
          let temp = a[i]; a[i] = a[j]; a[j] = temp;
          steps.push({
            array: [...a],
            comparing: [],
            shifting: [i, j],
            sorted: Array.from(sortedIndices),
            pivot: right,
            range: [left, right],
            msg: `${a[i]} < ${pivotVal}: Tausche nach links (Index ${i}), damit kleinere Werte links stehen.`
          });
        }
        i++;
      }
    }

    // Place pivot at final position i
    let temp2 = a[i]; a[i] = a[right]; a[right] = temp2;
    sortedIndices.add(i);

    steps.push({
      array: [...a],
      comparing: [],
      shifting: [i, right],
      sorted: Array.from(sortedIndices),
      pivot: i,
      range: [left, right],
      msg: `Setze Pivot ${pivotVal} an finale Position ${i}. Links davon sind alle Werte kleiner, rechts größer!`
    });

    qsort(left, i - 1);
    qsort(i + 1, right);
  }

  qsort(0, a.length - 1);

  steps.push({
    array: [...a],
    comparing: [],
    shifting: [],
    sorted: a.map((_, idx) => idx),
    pivot: -1,
    range: null,
    msg: '🎉 Fertig! Quicksort hat alle Partitionen rekursiv sortiert.'
  });

  return steps;
}

function copySnippet(elementId) {
  const el = document.getElementById(elementId);
  if (!el) return;
  navigator.clipboard.writeText(el.innerText || el.textContent).then(() => {
    alert("Python-Code in die Zwischenablage kopiert!");
  });
}

function copyInfoIservText() {
  const text = `Liebe Frau Tripel,\n\nanbei finden Sie die vollständigen Lösungen zu den Aufgaben der Ausfallstunden als PDF:\n- Teil 1: Struktogramme (Aufgaben 3, 5, 6 inkl. Fehleranalyse und 12)\n- Teil 2: Handout zu unseren zugeordneten Sortieralgorithmen Insertionsort und Quicksort (inkl. Python-Code, Erklärung am Beispiel und Verständnisaufgaben für den Kurs)\n- Teil 3: Komplexitätsanalyse und Laufzeitmessung (inkl. Beantwortung von Aufgabe 2 sowie Best-, Worst- und Average-Case Kostenanalyse)\n\nViele Grüße\nTonda Beutler (für Phineaus & Tonda)`;
  navigator.clipboard.writeText(text).then(() => {
    const icon = document.getElementById('copyBtnIcon');
    const label = document.getElementById('copyBtnText');
    if (icon) icon.textContent = '✅';
    if (label) label.textContent = 'In Zwischenablage kopiert!';
    setTimeout(() => {
      if (icon) icon.textContent = '📋';
      if (label) label.textContent = 'IServ-Begleittext kopieren';
    }, 2500);
  });
}

// -------------------------------------------------------------------------
// 2. TEIL 1: DIN 66261 STRUKTOGRAMME
// -------------------------------------------------------------------------
function renderInfoStruktogrammeSection() {
  return `
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-left: 4px solid #3b82f6; border-radius: 8px; padding: 1rem; color: #1e3a8a; font-size: 0.9rem;">
        <strong>Norm-Hinweis (DIN 66261 / Nassi-Shneiderman):</strong><br>
        Struktogramme dienen der sprachenunabhängigen Programmlogik ohne Sprungbefehle (GOTO-Freiheit).
        Nachfolgend sind alle vier geforderten Aufgaben (3, 5, 6 und 12 aus dem Arbeitsblatt S. 12ff.) exakt nach DIN 66261 visualisiert.
      </div>

      <!-- AUFGABE 3 -->
      <div style="background: var(--bg-card, #ffffff); border: 1px solid #cbd5e1; border-radius: 10px; padding: 1.25rem; box-shadow: 0 2px 8px rgba(0,0,0,0.04);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.8rem; border-bottom: 1px solid #e2e8f0; padding-bottom: 0.6rem;">
          <h3 style="margin: 0; font-size: 1.15rem; color: #0f172a;">Aufgabe 3 (S. 12): Auswertung Niederschlagsmessungen (365 Tage)</h3>
          <span style="font-size: 0.8rem; background: #e0f2fe; color: #0369a1; padding: 0.2rem 0.5rem; border-radius: 4px; font-weight: 700;">Zählschleife &amp; Maximumsuche</span>
        </div>
        <p style="font-size: 0.88rem; color: #475569; margin-bottom: 1rem;">
          <strong>Problemstellung:</strong> Das Array <code>niederschlaege</code> (Größe 365, Index 0..364) enthält die täglichen Messwerte.
          Ermittle den Jahreshöchstwert, die Gesamtniederschlagsmenge und den täglichen Durchschnitt. Gib alle drei Werte am Ende aus.
        </p>

        <!-- SVG DIN 66261 STRUKTOGRAMM -->
        <div style="display: flex; justify-content: center; margin: 1rem 0; overflow-x: auto;">
          <svg width="600" height="340" viewBox="0 0 600 340" style="background: #ffffff; border: 1.5px solid #0f172a; font-family: 'Segoe UI', Arial, sans-serif; font-size: 13px;">
            <rect x="0" y="0" width="600" height="40" fill="#ffffff" stroke="#0f172a" stroke-width="1.5" />
            <text x="20" y="25" fill="#0f172a" font-weight="600">summe = 0</text>

            <rect x="0" y="40" width="600" height="40" fill="#ffffff" stroke="#0f172a" stroke-width="1.5" />
            <text x="20" y="65" fill="#0f172a" font-weight="600">max_wert = niederschlaege[0]</text>

            <rect x="0" y="80" width="600" height="35" fill="#f8fafc" stroke="#0f172a" stroke-width="1.5" />
            <text x="20" y="103" fill="#0f172a" font-weight="700">FÜR i VON 0 BIS 364 (Schrittweite 1):</text>

            <rect x="0" y="115" width="30" height="145" fill="#e2e8f0" stroke="#0f172a" stroke-width="1.5" />

            <rect x="30" y="115" width="570" height="40" fill="#ffffff" stroke="#0f172a" stroke-width="1.5" />
            <text x="50" y="140" fill="#0f172a">summe = summe + niederschlaege[i]</text>

            <rect x="30" y="155" width="570" height="105" fill="#ffffff" stroke="#0f172a" stroke-width="1.5" />
            <line x1="30" y1="155" x2="315" y2="200" stroke="#0f172a" stroke-width="1.5" />
            <line x1="600" y1="155" x2="315" y2="200" stroke="#0f172a" stroke-width="1.5" />
            <text x="315" y="175" text-anchor="middle" font-weight="700" fill="#0f172a">niederschlaege[i] > max_wert</text>
            <text x="50" y="195" font-weight="700" fill="#16a34a">ja</text>
            <text x="570" y="195" text-anchor="end" font-weight="700" fill="#dc2626">nein</text>

            <line x1="315" y1="200" x2="315" y2="260" stroke="#0f172a" stroke-width="1.5" />
            <text x="45" y="235" fill="#0f172a">max_wert = niederschlaege[i]</text>
            <text x="457" y="235" text-anchor="middle" fill="#94a3b8" font-style="italic">(leer)</text>

            <rect x="0" y="260" width="600" height="40" fill="#ffffff" stroke="#0f172a" stroke-width="1.5" />
            <text x="20" y="285" fill="#0f172a" font-weight="600">durchschnitt = summe / 365</text>

            <rect x="0" y="300" width="600" height="40" fill="#eff6ff" stroke="#0f172a" stroke-width="1.5" />
            <text x="20" y="325" fill="#1d4ed8" font-weight="700">Ausgabe: max_wert, summe, durchschnitt</text>
          </svg>
        </div>
      </div>

      <!-- AUFGABE 5 -->
      <div style="background: var(--bg-card, #ffffff); border: 1px solid #cbd5e1; border-radius: 10px; padding: 1.25rem; box-shadow: 0 2px 8px rgba(0,0,0,0.04);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.8rem; border-bottom: 1px solid #e2e8f0; padding-bottom: 0.6rem;">
          <h3 style="margin: 0; font-size: 1.15rem; color: #0f172a;">Aufgabe 5 (S. 13): Rabattsystem Paketdienst (Günstigste Regelung)</h3>
          <span style="font-size: 0.8rem; background: #fef3c7; color: #b45309; padding: 0.2rem 0.5rem; border-radius: 4px; font-weight: 700;">Verschachtelte Fallprüfung</span>
        </div>
        <p style="font-size: 0.88rem; color: #475569; margin-bottom: 1rem;">
          <strong>Regeln:</strong> Umsatz <code>U &ge; 150 &euro;</code> &rarr; 10 % auf Preis <code>P</code> (<code>r1 = 0.10 * P</code>).
          Ab 12. Sendung (<code>A &ge; 11</code>) &rarr; halbe Beförderung <code>B</code> (<code>r2 = 0.50 * B</code>).
          Die 24. Sendung (<code>A == 23</code>) &rarr; <strong>kostenlos</strong> (<code>GP = 0</code>). Es gilt stets die für den Kunden günstigste Regelung.
        </p>

        <!-- SVG DIN 66261 STRUKTOGRAMM AUFGABE 5 -->
        <div style="display: flex; justify-content: center; margin: 1rem 0; overflow-x: auto;">
          <svg width="650" height="420" viewBox="0 0 650 420" style="background: #ffffff; border: 1.5px solid #0f172a; font-family: 'Segoe UI', Arial, sans-serif; font-size: 12.5px;">
            <rect x="0" y="0" width="650" height="380" fill="#ffffff" stroke="#0f172a" stroke-width="1.5" />
            <line x1="0" y1="0" x2="220" y2="50" stroke="#0f172a" stroke-width="1.5" />
            <line x1="650" y1="0" x2="220" y2="50" stroke="#0f172a" stroke-width="1.5" />
            <text x="240" y="24" text-anchor="middle" font-weight="700" fill="#0f172a">Ist die Sendung die 24. im lfd. Jahr? (A == 23)</text>
            <text x="30" y="44" font-weight="700" fill="#16a34a">ja (kostenlos)</text>
            <text x="610" y="44" text-anchor="end" font-weight="700" fill="#dc2626">nein (Rabatte prüfen)</text>
            <line x1="220" y1="50" x2="220" y2="380" stroke="#0f172a" stroke-width="1.5" />

            <rect x="0" y="50" width="220" height="330" fill="#f0fdf4" stroke="#0f172a" stroke-width="1.5" />
            <text x="110" y="190" text-anchor="middle" font-size="16px" font-weight="800" fill="#16a34a">GP = 0</text>
            <text x="110" y="215" text-anchor="middle" font-size="11px" fill="#4b5563">(24. Sendung gratis)</text>

            <rect x="220" y="50" width="430" height="35" fill="#ffffff" stroke="#0f172a" stroke-width="1.5" />
            <text x="235" y="73" fill="#0f172a">r1 = 0; r2 = 0</text>

            <rect x="220" y="85" width="430" height="75" fill="#ffffff" stroke="#0f172a" stroke-width="1.5" />
            <line x1="220" y1="85" x2="435" y2="120" stroke="#0f172a" stroke-width="1.5" />
            <line x1="650" y1="85" x2="435" y2="120" stroke="#0f172a" stroke-width="1.5" />
            <text x="435" y="103" text-anchor="middle" font-weight="700" fill="#0f172a">U >= 150</text>
            <text x="240" y="117" font-weight="700" fill="#16a34a">ja</text>
            <text x="630" y="117" text-anchor="end" font-weight="700" fill="#dc2626">nein</text>
            <line x1="435" y1="120" x2="435" y2="160" stroke="#0f172a" stroke-width="1.5" />
            <text x="245" y="145" fill="#0f172a">r1 = 0.10 * P</text>
            <text x="542" y="145" text-anchor="middle" fill="#94a3b8">r1 = 0</text>

            <rect x="220" y="160" width="430" height="75" fill="#ffffff" stroke="#0f172a" stroke-width="1.5" />
            <line x1="220" y1="160" x2="435" y2="195" stroke="#0f172a" stroke-width="1.5" />
            <line x1="650" y1="160" x2="435" y2="195" stroke="#0f172a" stroke-width="1.5" />
            <text x="435" y="178" text-anchor="middle" font-weight="700" fill="#0f172a">A >= 11</text>
            <text x="240" y="192" font-weight="700" fill="#16a34a">ja</text>
            <text x="630" y="192" text-anchor="end" font-weight="700" fill="#dc2626">nein</text>
            <line x1="435" y1="195" x2="435" y2="235" stroke="#0f172a" stroke-width="1.5" />
            <text x="245" y="220" fill="#0f172a">r2 = 0.50 * B</text>
            <text x="542" y="220" text-anchor="middle" fill="#94a3b8">r2 = 0</text>

            <rect x="220" y="235" width="430" height="75" fill="#ffffff" stroke="#0f172a" stroke-width="1.5" />
            <line x1="220" y1="235" x2="435" y2="270" stroke="#0f172a" stroke-width="1.5" />
            <line x1="650" y1="235" x2="435" y2="270" stroke="#0f172a" stroke-width="1.5" />
            <text x="435" y="253" text-anchor="middle" font-weight="700" fill="#0f172a">r1 > r2</text>
            <text x="240" y="267" font-weight="700" fill="#16a34a">ja</text>
            <text x="630" y="267" text-anchor="end" font-weight="700" fill="#dc2626">nein</text>
            <line x1="435" y1="270" x2="435" y2="310" stroke="#0f172a" stroke-width="1.5" />
            <text x="245" y="295" fill="#0f172a">rabatt = r1</text>
            <text x="450" y="295" fill="#0f172a">rabatt = r2</text>

            <rect x="220" y="310" width="430" height="70" fill="#f8fafc" stroke="#0f172a" stroke-width="1.5" />
            <text x="235" y="348" font-weight="700" fill="#0f172a">GP = (P + B) - rabatt</text>

            <rect x="0" y="380" width="650" height="40" fill="#eff6ff" stroke="#0f172a" stroke-width="1.5" />
            <text x="20" y="405" fill="#1d4ed8" font-weight="700">Ausgabe: GP</text>
          </svg>
        </div>
      </div>

      <!-- AUFGABE 6 -->
      <div style="background: var(--bg-card, #ffffff); border: 1px solid #cbd5e1; border-radius: 10px; padding: 1.25rem; box-shadow: 0 2px 8px rgba(0,0,0,0.04);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.8rem; border-bottom: 1px solid #e2e8f0; padding-bottom: 0.6rem;">
          <h3 style="margin: 0; font-size: 1.15rem; color: #0f172a;">Aufgabe 6 (S. 13): Mahnprogramm &ndash; Fehleranalyse &amp; Korrektur</h3>
          <span style="font-size: 0.8rem; background: #fee2e2; color: #b91c1c; padding: 0.2rem 0.5rem; border-radius: 4px; font-weight: 700;">Fehlerkorrektur</span>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 1rem;">
          <div style="border: 2px dashed #ef4444; border-radius: 8px; padding: 1rem; background: #fffaf0;">
            <div style="color: #b91c1c; font-weight: 800; margin-bottom: 0.5rem; font-size: 0.95rem;">
              ❌ Gegebenes Struktogramm (FEHLERHAFT):
            </div>
            <p style="font-size: 0.83rem; color: #4b5563; line-height: 1.4;">
              <strong>Warum ist das falsch?</strong><br>
              Wenn <code>FM &lt; AM</code> <em>nein</em> ergibt (z.B. Fälligkeit im Dezember <code>FM=12</code>, aktuell September <code>AM=9</code> desselben Jahres <code>2026</code>), prüft es <code>FJ &le; AJ</code>. Da <code>2026 &le; 2026</code> WAHR ist, wird <strong>sofort gemahnt</strong> &ndash; 3 Monate zu früh!
            </p>
          </div>

          <div style="border: 2px solid #22c55e; border-radius: 8px; padding: 1rem; background: #f0fdf4;">
            <div style="color: #15803d; font-weight: 800; margin-bottom: 0.5rem; font-size: 0.95rem;">
              ✅ Korrekte Logik nach DIN 66261:
            </div>
            <p style="font-size: 0.83rem; color: #4b5563; line-height: 1.4;">
              Mahnung nur auslösen, wenn <strong>nicht bezahlt</strong> UND:<br>
              &bull; Fälligkeitsjahr liegt im Vorjahr oder früher (<code>FJ &lt; AJ</code>) ODER<br>
              &bull; gleiches Jahr (<code>FJ == AJ</code>) UND Fälligkeitsmonat liegt in der Vergangenheit (<code>FM &lt; AM</code>).
            </p>
          </div>
        </div>

        <!-- SVG KORRIGIERTES STRUKTOGRAMM AUFGABE 6 -->
        <div style="display: flex; justify-content: center; margin: 1rem 0; overflow-x: auto;">
          <svg width="600" height="220" viewBox="0 0 600 220" style="background: #ffffff; border: 1.5px solid #0f172a; font-family: 'Segoe UI', Arial, sans-serif; font-size: 13px;">
            <rect x="0" y="0" width="600" height="220" fill="#ffffff" stroke="#0f172a" stroke-width="1.5" />
            <line x1="0" y1="0" x2="200" y2="45" stroke="#0f172a" stroke-width="1.5" />
            <line x1="600" y1="0" x2="200" y2="45" stroke="#0f172a" stroke-width="1.5" />
            <text x="240" y="24" text-anchor="middle" font-weight="700" fill="#0f172a">Ist die Rechnung bezahlt?</text>
            <text x="30" y="40" font-weight="700" fill="#16a34a">ja</text>
            <text x="570" y="40" text-anchor="end" font-weight="700" fill="#dc2626">nein</text>
            <line x1="200" y1="45" x2="200" y2="220" stroke="#0f172a" stroke-width="1.5" />

            <rect x="0" y="45" width="200" height="175" fill="#f8fafc" stroke="#0f172a" stroke-width="1.5" />
            <text x="100" y="130" text-anchor="middle" fill="#94a3b8" font-style="italic">(keine Mahnung &ndash; OK)</text>

            <line x1="200" y1="45" x2="400" y2="105" stroke="#0f172a" stroke-width="1.5" />
            <line x1="600" y1="45" x2="400" y2="105" stroke="#0f172a" stroke-width="1.5" />
            <text x="400" y="70" text-anchor="middle" font-weight="700" font-size="11.5px" fill="#0f172a">
              FJ &lt; AJ ODER (FJ == AJ UND FM &lt; AM)
            </text>
            <text x="230" y="98" font-weight="700" fill="#16a34a">ja</text>
            <text x="570" y="98" text-anchor="end" font-weight="700" fill="#dc2626">nein</text>
            <line x1="400" y1="105" x2="400" y2="220" stroke="#0f172a" stroke-width="1.5" />

            <rect x="200" y="105" width="200" height="115" fill="#fef2f2" stroke="#0f172a" stroke-width="1.5" />
            <text x="300" y="165" text-anchor="middle" font-weight="800" font-size="14px" fill="#b91c1c">Mahnung auslösen!</text>

            <rect x="400" y="105" width="200" height="115" fill="#ffffff" stroke="#0f172a" stroke-width="1.5" />
            <text x="500" y="165" text-anchor="middle" fill="#94a3b8" font-style="italic">(Zahlungsfrist noch aktiv)</text>
          </svg>
        </div>
      </div>

      <!-- AUFGABE 12 -->
      <div style="background: var(--bg-card, #ffffff); border: 1px solid #cbd5e1; border-radius: 10px; padding: 1.25rem; box-shadow: 0 2px 8px rgba(0,0,0,0.04);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.8rem; border-bottom: 1px solid #e2e8f0; padding-bottom: 0.6rem;">
          <h3 style="margin: 0; font-size: 1.15rem; color: #0f172a;">Aufgabe 12 (S. 15): CARTRONIC GmbH &ndash; Höchster Tankstellenumsatz</h3>
          <span style="font-size: 0.8rem; background: #e0e7ff; color: #4338ca; padding: 0.2rem 0.5rem; border-radius: 4px; font-weight: 700;">Parallele Arrays</span>
        </div>
        <p style="font-size: 0.88rem; color: #475569; margin-bottom: 1rem;">
          <strong>Gegeben:</strong> <code>TNAMEN = ["AGIP", "BP", "SHELL", "ESSO", "TOTAL"]</code>, <code>TUMS = [11200.10, 23433.20, 7134.90, 14655.00, 4175.80]</code>.<br>
          <strong>Ziel:</strong> Ermittlung der Station mit höchstem Umsatz und Ausgabe von Stationsname und Umsatzbetrag.
        </p>

        <!-- SVG DIN 66261 STRUKTOGRAMM AUFGABE 12 -->
        <div style="display: flex; justify-content: center; margin: 1rem 0; overflow-x: auto;">
          <svg width="600" height="300" viewBox="0 0 600 300" style="background: #ffffff; border: 1.5px solid #0f172a; font-family: 'Segoe UI', Arial, sans-serif; font-size: 13px;">
            <rect x="0" y="0" width="600" height="35" fill="#ffffff" stroke="#0f172a" stroke-width="1.5" />
            <text x="20" y="23" font-weight="600" fill="#0f172a">max_pos = 0</text>
            <rect x="0" y="35" width="600" height="35" fill="#ffffff" stroke="#0f172a" stroke-width="1.5" />
            <text x="20" y="58" font-weight="600" fill="#0f172a">max_umsatz = TUMS[0]</text>

            <rect x="0" y="70" width="600" height="35" fill="#f8fafc" stroke="#0f172a" stroke-width="1.5" />
            <text x="20" y="93" font-weight="700" fill="#0f172a">FÜR i VON 1 BIS 4 (Schrittweite 1):</text>

            <rect x="0" y="105" width="30" height="145" fill="#e2e8f0" stroke="#0f172a" stroke-width="1.5" />

            <rect x="30" y="105" width="570" height="145" fill="#ffffff" stroke="#0f172a" stroke-width="1.5" />
            <line x1="30" y1="105" x2="315" y2="155" stroke="#0f172a" stroke-width="1.5" />
            <line x1="600" y1="105" x2="315" y2="155" stroke="#0f172a" stroke-width="1.5" />
            <text x="315" y="130" text-anchor="middle" font-weight="700" fill="#0f172a">TUMS[i] > max_umsatz</text>
            <text x="50" y="148" font-weight="700" fill="#16a34a">ja</text>
            <text x="570" y="148" text-anchor="end" font-weight="700" fill="#dc2626">nein</text>
            <line x1="315" y1="155" x2="315" y2="250" stroke="#0f172a" stroke-width="1.5" />

            <text x="50" y="188" fill="#0f172a">max_umsatz = TUMS[i]</text>
            <text x="50" y="218" fill="#0f172a">max_pos = i</text>

            <text x="457" y="200" text-anchor="middle" fill="#94a3b8" font-style="italic">(keine Änderung)</text>

            <rect x="0" y="250" width="600" height="50" fill="#eff6ff" stroke="#0f172a" stroke-width="1.5" />
            <text x="20" y="275" fill="#1d4ed8" font-weight="700">Ausgabe: TNAMEN[max_pos], max_umsatz</text>
            <text x="20" y="292" fill="#64748b" font-size="11.5px">(Ergebnis für Testdaten: "BP" mit 23.433,20 €)</text>
          </svg>
        </div>
      </div>
    </div>
  `;
}

// -------------------------------------------------------------------------
// 3. TEIL 3: KOMPLEXITÄTSANALYSE & AUFGABE 2
// -------------------------------------------------------------------------
function renderInfoKomplexitaetSection() {
  return `
    <div style="display: flex; flex-direction: column; gap: 1.5rem;">
      <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-left: 4px solid #6366f1; border-radius: 8px; padding: 1rem;">
        <h3 style="margin: 0 0 0.5rem 0; color: #1e1b4b; font-size: 1.15rem;">1. Notizen: Laufzeitmessung in Python vs. Theorie</h3>
        <ul style="margin: 0; padding-left: 1.2rem; font-size: 0.88rem; color: #334155; line-height: 1.5;">
          <li><strong>Messung mit Python:</strong> Funktion <code>time.process_time()</code> misst die reine CPU-Rechenzeit des aktuellen Prozesses (Leerlaufzeiten durch I/O oder Warten werden ignoriert).</li>
          <li><strong>Problematik:</strong> Physikalische Zeitangaben in Sekunden sind <em>kein objektives Maß</em> für Algorithmen, da sie von Prozessortaktung, Hardware-Architektur, OS-Scheduling und Cache-Zuständen abhängen.</li>
        </ul>
      </div>

      <!-- LÖSUNG AUFGABE 2 INF-SCHULE -->
      <div style="background: var(--bg-card, #ffffff); border: 1px solid #cbd5e1; border-radius: 10px; padding: 1.25rem; box-shadow: 0 2px 8px rgba(0,0,0,0.04);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.8rem; border-bottom: 1px solid #e2e8f0; padding-bottom: 0.5rem;">
          <h3 style="margin: 0; font-size: 1.15rem; color: #0f172a;">2. Bearbeitung von Aufgabe 2 (inf-schule „Laufzeitmessungen“)</h3>
          <span style="font-size: 0.8rem; background: #e0e7ff; color: #4338ca; padding: 0.2rem 0.5rem; border-radius: 4px; font-weight: 700;">Messwerte-Analyse</span>
        </div>

        <div style="display: flex; flex-direction: column; gap: 0.8rem; font-size: 0.88rem;">
          <div style="background: #f8fafc; padding: 0.8rem; border-radius: 6px; border: 1px solid #e2e8f0;">
            <strong style="color: #1e40af;">(a) Die Messergebnisse schwanken etwas. Was könnte die Ursache hierfür sein?</strong><br>
            <span style="color: #334155;">
              Ursache sind Caching-Effekte im Prozessor (Warm-up von L1/L2/L3-Cache vs. Cache-Misses), minimale Interrupts des Betriebssystems, dynamische Kern-Taktung (Turbo Boost / Throttling) sowie Pythons automatische Speicherverwaltung (Garbage Collection).
            </span>
          </div>

          <div style="background: #f8fafc; padding: 0.8rem; border-radius: 6px; border: 1px solid #e2e8f0;">
            <strong style="color: #1e40af;">(b) Warum können eigene Messwerte in einem völlig anderen Zahlenbereich liegen?</strong><br>
            <span style="color: #334155;">
              Unterschiedliche Computer verfügen über völlig unterschiedliche Hardware (CPU-Modell, Taktfrequenz, RAM-Geschwindigkeit). Ein moderner Desktop-Rechner führt denselben Programmcode in wenigen Millisekunden aus, für den ein älterer Schul-PC oder Laptop im Stromsparmodus mehrere Sekunden benötigt.
            </span>
          </div>

          <div style="background: #f8fafc; padding: 0.8rem; border-radius: 6px; border: 1px solid #e2e8f0;">
            <strong style="color: #1e40af;">(c) Woran erkennt man den weiteren Hintergrundprozess und auf welche Problematik deutet das hin?</strong><br>
            <span style="color: #334155;">
              Man erkennt es am sprunghaften Anstieg der Rechenzeit bei Durchlauf 4 von ca. <strong>3,41 s auf 5,37 s</strong> (+57 %!).<br>
              <em>Problematik:</em> Multitasking führt zu Ressourcen-Konkurrenz (Kontextwechsel, Cache-Verdrängung, thermisches Throttling). Physikalische Laufzeitmessungen sind deshalb ungeeignet für eine objektive Gütebestimmung.
            </span>
          </div>
        </div>
      </div>

      <!-- KOSTENANALYSE TABELLE -->
      <div style="background: var(--bg-card, #ffffff); border: 1px solid #cbd5e1; border-radius: 10px; padding: 1.25rem; box-shadow: 0 2px 8px rgba(0,0,0,0.04);">
        <h3 style="margin: 0 0 0.8rem 0; font-size: 1.15rem; color: #0f172a;">3. Theoretische Kostenanalyse für Insertionsort &amp; Quicksort</h3>
        <p style="font-size: 0.88rem; color: #475569; margin-bottom: 1rem;">
          Als hardwareunabhängiges Kostenmaß <code>T(n)</code> wird die Anzahl der <strong>Datensatzvergleiche</strong> in Abhängigkeit von der Problemgröße <code>n</code> (Listenlänge) modelliert.
        </p>

        <table style="width: 100%; border-collapse: collapse; font-size: 0.88rem; text-align: left;">
          <thead>
            <tr style="background: #f1f5f9; border-bottom: 2px solid #cbd5e1;">
              <th style="padding: 0.6rem; border: 1px solid #cbd5e1;">Algorithmus</th>
              <th style="padding: 0.6rem; border: 1px solid #cbd5e1;">Best Case</th>
              <th style="padding: 0.6rem; border: 1px solid #cbd5e1;">Worst Case</th>
              <th style="padding: 0.6rem; border: 1px solid #cbd5e1;">Average Case</th>
              <th style="padding: 0.6rem; border: 1px solid #cbd5e1;">Einfache Begründung</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding: 0.6rem; border: 1px solid #cbd5e1; font-weight: 700;">Insertionsort</td>
              <td style="padding: 0.6rem; border: 1px solid #cbd5e1; color: #16a34a; font-weight: 700;">T(n) = n &minus; 1<br><span style="font-size: 0.8rem; background: #dcfce7; padding: 1px 4px; border-radius: 3px;">O(n)</span></td>
              <td style="padding: 0.6rem; border: 1px solid #cbd5e1; color: #dc2626; font-weight: 700;">T(n) = ½ n(n&minus;1)<br><span style="font-size: 0.8rem; background: #fee2e2; padding: 1px 4px; border-radius: 3px;">O(n²)</span></td>
              <td style="padding: 0.6rem; border: 1px solid #cbd5e1; color: #d97706; font-weight: 700;">T(n) &approx; ¼ n²<br><span style="font-size: 0.8rem; background: #fef3c7; padding: 1px 4px; border-radius: 3px;">O(n²)</span></td>
              <td style="padding: 0.6rem; border: 1px solid #cbd5e1; font-size: 0.82rem; color: #475569;">
                Best Case: Liste ist schon sortiert &rarr; nur 1 Blick pro Zahl nötig.<br>
                Worst Case: Umgekehrt sortiert &rarr; jede Zahl muss ganz nach vorne wandern (maximaler Aufwand).
              </td>
            </tr>
            <tr>
              <td style="padding: 0.6rem; border: 1px solid #cbd5e1; font-weight: 700;">Quicksort</td>
              <td style="padding: 0.6rem; border: 1px solid #cbd5e1; color: #16a34a; font-weight: 700;">T(n) &approx; n &middot; log₂(n)<br><span style="font-size: 0.8rem; background: #dcfce7; padding: 1px 4px; border-radius: 3px;">O(n log n)</span></td>
              <td style="padding: 0.6rem; border: 1px solid #cbd5e1; color: #dc2626; font-weight: 700;">T(n) = ½ n(n&minus;1)<br><span style="font-size: 0.8rem; background: #fee2e2; padding: 1px 4px; border-radius: 3px;">O(n²)</span></td>
              <td style="padding: 0.6rem; border: 1px solid #cbd5e1; color: #16a34a; font-weight: 700;">T(n) &approx; 1,39 n log₂ n<br><span style="font-size: 0.8rem; background: #dcfce7; padding: 1px 4px; border-radius: 3px;">O(n log n)</span></td>
              <td style="padding: 0.6rem; border: 1px solid #cbd5e1; font-size: 0.82rem; color: #475569;">
                Best/Average: Das Pivot halbiert die Liste ständig (sehr wenige Schritte).<br>
                Worst Case: Pivot ist immer das Minimum/Maximum &rarr; Liste schrumpft nur um 1 Zahl pro Schritt (extrem langsam).
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `;
}
