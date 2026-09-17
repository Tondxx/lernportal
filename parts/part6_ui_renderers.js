// =========================================================================
// part6_ui_renderers.js - UI Rendering Engine, Folder Views & State Engine
// =========================================================================

// --- 6. KOMBINATIONS-AUFGABEN (VERNETZUNG MEHRERER THEMEN) ---
const KOMBI_AUFGABEN = [
  {
    title: 'Kombi 1: Plattenkondensator + E-Feld + Fadenpendel-Auslenkung (Meds.pdf S. 28/30)',
    badges: ['E-Feld (E = U/d)', 'Kräftedreieck (tan α = Fel/Fg)', 'Ladungsbestimmung'],
    prompt: `
      An einem Plattenkondensator mit Plattenabstand <code>d = 5,0 cm</code> liegt die Hochspannung <code>U = 2500 V</code> an.<br>
      Zwischen den Platten hängt an einem isolierenden Faden eine kleine Kugel der Masse <code>m = 0,80 g</code>.<br>
      Sobald die Kugel aufgeladen wird, schlägt sie um den Winkel <code>&alpha; = 14,0&deg;</code> in Richtung der negativen Platte aus.<br>
      <strong>Aufgaben:</strong><br>
      a) Welches Vorzeichen hat die Ladung der Kugel?<br>
      b) Berechne die elektrische Feldstärke E im Kondensator.<br>
      c) Bestimme die elektrische Ladung q der Kugel in Nanocoulomb (nC).
    `,
    solution: `
      <strong>a) Vorzeichen:</strong><br>
      Da die Kugel zur <em>negativen</em> Platte ausgelenkt wird, wird sie von dieser angezogen. Die Kugel trägt daher eine <strong>positive Ladung (q > 0)</strong>.<br><br>
      <strong>b) Elektrische Feldstärke:</strong><br>
      Im homogenen Plattenkondensator gilt:<br>
      <div class="katex-render" data-display="true" data-latex="E = \\frac{U}{d} = \\frac{2500\\,\\text{V}}{0,05\\,\\text{m}} = 50\\,000\\,\\frac{\\text{V}}{\\text{m}} = 50\\,\\frac{\\text{kV}}{\\text{m}}"></div>
      <strong>c) Ladung q über das Kräftedreieck:</strong><br>
      Am ausgelenkten Pendel herrscht Kräftegleichgewicht zwischen Gewichtskraft F_g und elektrischer Kraft F_el:<br>
      <div class="katex-render" data-display="true" data-latex="\\tan\\alpha = \\frac{F_{\\text{el}}}{F_g} = \\frac{q \\cdot E}{m \\cdot g} \\implies q = \\frac{m \\cdot g \\cdot \\tan\\alpha}{E}"></div>
      Werte einsetzen (m = 0,00080 kg, g = 9,81 m/s², tan(14°) ≈ 0,24933):<br>
      <div class="katex-render" data-display="true" data-latex="q = \\frac{0,00080\\,\\text{kg} \\cdot 9,81\\,\\text{m/s}^2 \\cdot 0,24933}{50\\,000\\,\\text{V/m}} = \\frac{1,957 \\cdot 10^{-3}\\,\\text{N}}{50\\,000\\,\\text{V/m}} \\approx 3,91 \\cdot 10^{-8}\\,\\text{C} = 39,1\\,\\text{nC}"></div>
      <strong style="color: #10b981;">Ergebnis:</strong> Die Kugel trägt eine Ladung von <strong>q ≈ 39,1 nC</strong>.
    `
  },
  {
    title: 'Kombi 2: Coulomb-Gesetz + Ladungsausgleich bei Berührung + Pendelauslenkung',
    badges: ['Coulombsches Gesetz', 'Ladungsausgleich', 'Kräftegleichgewicht'],
    prompt: `
      Zwei gleiche, leitende kleine Kugeln A und B (je Masse m = 1,2 g) hängen an gleich langen Fäden nebeneinander.<br>
      Anfangs trägt Kugel A die Ladung <code>Q_A = +12 nC</code> und Kugel B ist ungeladen (<code>Q_B = 0</code>).<br>
      Die Kugeln berühren sich kurz und stoßen sich anschließend ab, sodass sie im Gleichgewicht einen Abstand von <code>r = 6,0 cm</code> einnehmen.<br>
      <strong>Aufgaben:</strong><br>
      a) Welche Ladung trägt jede Kugel nach der Berührung?<br>
      b) Berechne die abstoßende Coulomb-Kraft F_C zwischen beiden Kugeln.<br>
      c) Welchen Auslenkungswinkel &alpha; gegenüber der Senkrechten nimmt jeder Faden ein?
    `,
    solution: `
      <strong>a) Ladungsausgleich:</strong><br>
      Wegen Symmetrie verteilt sich die Gesamtladung gleichmäßig auf beide Kugeln:<br>
      <div class="katex-render" data-display="true" data-latex="Q' = \\frac{Q_A + Q_B}{2} = \\frac{+12\\,\\text{nC} + 0}{2} = +6,0\\,\\text{nC} = 6,0 \\cdot 10^{-9}\\,\\text{C}"></div> für jede Kugel.<br><br>
      <strong>b) Coulomb-Kraft F_C:</strong><br>
      <div class="katex-render" data-display="true" data-latex="F_C = \\frac{1}{4\\pi\\varepsilon_0} \\cdot \\frac{Q'^2}{r^2} = 8,988 \\cdot 10^9 \\cdot \\frac{(6,0 \\cdot 10^{-9})^2}{(0,06)^2} \\approx 8,99 \\cdot 10^{-5}\\,\\text{N} = 0,090\\,\\text{mN}"></div>
      <strong>c) Auslenkungswinkel &alpha;:</strong><br>
      <div class="katex-render" data-display="true" data-latex="\\tan\\alpha = \\frac{F_C}{F_g} = \\frac{8,99 \\cdot 10^{-5}\\,\\text{N}}{0,0012\\,\\text{kg} \\cdot 9,81\\,\\text{m/s}^2} = \\frac{8,99 \\cdot 10^{-5}}{0,01177} \\approx 0,007636 \\implies \\alpha \\approx 0,44^{\circ}"></div>
    `
  },
  {
    title: 'Kombi 3: Kondensator-Entladung (I(t)) → Ladung Q → Kapazität C → Plattenabstand d (S. 33 & AB 08)',
    badges: ['Flächenzählung & Integral', 'C = Q/U', 'Plattenkondensator C = ε₀A/d'],
    prompt: `
      Ein Plattenkondensator mit kreisrunden Platten (Radius R = 15 cm) wird an eine Spannungsquelle mit <code>U₀ = 200 V</code> angeschlossen.<br>
      Danach wird er getrennt und über einen Widerstand entladen. Die Messkurve I(t) liefert durch Integration die Gesamtladung <code>Q₀ = 12,5 nC</code>.<br>
      <strong>Aufgaben:</strong><br>
      a) Berechne die Kapazität C des Kondensators in Picofarad (pF).<br>
      b) Bestimme die Fläche A der Kondensatorplatten.<br>
      c) Welchen Plattenabstand d hatte der Kondensator?
    `,
    solution: `
      <strong>a) Kapazität C:</strong><br>
      <div class="katex-render" data-display="true" data-latex="C = \\frac{Q_0}{U_0} = \\frac{12,5 \\cdot 10^{-9}\\,\\text{C}}{200\\,\\text{V}} = 6,25 \\cdot 10^{-11}\\,\\text{F} = 62,5\\,\\text{pF}"></div><br>
      <strong>b) Plattenfläche A:</strong><br>
      <div class="katex-render" data-display="true" data-latex="A = \\pi \\cdot R^2 = \\pi \\cdot (0,15\\,\\text{m})^2 \\approx 0,0707\\,\\text{m}^2"></div><br>
      <strong>c) Plattenabstand d:</strong><br>
      Für den Plattenkondensator gilt <span class="katex-render" data-display="false" data-latex="C = \\varepsilon_0 \\cdot \\frac{A}{d} \\implies d = \\frac{\\varepsilon_0 \\cdot A}{C}"></span>.<br>
      <div class="katex-render" data-display="true" data-latex="d = \\frac{8,854 \\cdot 10^{-12}\\,\\frac{\\text{As}}{\\text{Vm}} \\cdot 0,0707\\,\\text{m}^2}{6,25 \\cdot 10^{-11}\\,\\text{F}} \\approx 0,0100\\,\\text{m} = 1,0\\,\\text{cm}"></div>
      <strong style="color: #10b981;">Ergebnis:</strong> Der Plattenabstand betrug <strong>d = 1,0 cm</strong>.
    `
  }
];

// --- 7. GROSSER AUFGABENPOOL AUS ALLEN ISERV-ARBEITSBLÄTTERN (AB01 - AB11 + S. 33) ---
const ISERV_AUFGABEN_POOL = [
  {
    sheet: 'Klausurblatt Meds.pdf S. 33',
    category: 'messwerte',
    title: 'S. 33 Nr. 1: Coulomb-Kraft F(r) Messwertreihe',
    prompt: 'Prüfe anhand der Messreihe r = [2, 3, 4, 5, 6, 8] cm und F = [162.5, 72.5, 40.5, 26.0, 18.0, 10.25] mN, ob F ~ 1/r² gilt, und berechne F(1 cm).',
    solution: 'Konstantenprüfung F • r² ergibt [650, 652.5, 648, 650, 648, 656] mN•cm² mit Mittelwert k̄ = 650,75 mN•cm². Für r = 1 cm folgt F(1 cm) = 650,75 mN = 0,651 N.'
  },
  {
    sheet: 'Klausurblatt Meds.pdf S. 33',
    category: 'messwerte',
    title: 'S. 33 Nr. 2: Plattenkondensator Kraft F(U) Messwertreihe',
    prompt: 'Prüfe anhand der Messreihe U = [2, 3, 4, 5] kV und F = [35, 80, 142.5, 222.5] mN, ob F ~ U² gilt, und bestimme die Spannung für F = 10 mN.',
    solution: 'Quotientenprüfung F / U² liefert [8.75, 8.89, 8.91, 8.90] mN/kV² mit Mittelwert k̄ = 8,86 mN/kV². Für F = 10 mN ergibt sich U = √(10 / 8,86) = 1,062 kV = 1062 V.'
  },
  {
    sheet: 'Klausurblatt Meds.pdf S. 33',
    category: 'messwerte',
    title: 'S. 33 Nr. 3: Entladekurve I(t) und Ladung als Integral',
    prompt: 'Gegeben ist I(t) = 50 µA • e^(-0,0458 t). Berechne die Gesamtladung Q_ges und die nach t = 30 s abgeflossene Ladung.',
    solution: 'Q_ges = ∫₀^∞ I(t) dt = I₀ / k = 50 µA / 0,0458 s⁻¹ = 1091,7 µC ≈ 1,09 mC. Nach 30 s: Q(30 s) = 1091,7 • (1 - e^(-1,374)) = 1091,7 • 0,7469 = 815,4 µC abgeflossen (verbleibend: 276,3 µC).'
  },
  {
    sheet: 'AB01 Elektroskop',
    category: 'elektrostatik',
    title: 'AB01: Ladungsnachweis mit dem Elektroskop (Meds.pdf S. 2/3)',
    prompt: 'Ein Elektroskop ist negativ geladen (Zeiger ausgelenkt). Man nähert sich dem Teller mit einem unbekannten Körper X, woraufhin der Zeigerausschlag kleiner wird. Welche Ladung trägt X?',
    solution: 'Wird der Zeigerausschlag kleiner, fließen Elektronen aus dem Zeiger nach oben auf den Teller zurück. Das geschieht, wenn der Körper X Elektronen anzieht. <strong>Der Körper X ist positiv geladen.</strong>'
  },
  {
    sheet: 'AB02 Influenz',
    category: 'elektrostatik',
    title: 'AB02: Ladungsverschiebung an zwei berührenden Metallkugeln (Meds.pdf S. 5)',
    prompt: 'Zwei ungeladene Metallkugeln berühren sich. Ein negativ geladener Stab wird von links an Kugel 1 angenähert. Während der Stab da ist, werden die Kugeln getrennt. Danach wird der Stab entfernt. Welche Ladung tragen Kugel 1 und Kugel 2?',
    solution: 'Der negative Stab stößt Elektronen aus Kugel 1 nach Kugel 2 ab. Werden sie getrennt, verbleibt auf Kugel 1 ein Elektronenmangel (<strong>positiv</strong>) und auf Kugel 2 ein Elektronenüberschuss (<strong>negativ</strong>)!'
  },
  {
    sheet: 'AB04 Glimmlampe',
    category: 'elektrostatik',
    title: 'AB04: Glimmlampen-Elektrode als Polprüfer (Meds.pdf S. 4)',
    prompt: 'Warum leuchtet bei Gleichspannung nur eine Elektrode der Glimmlampe, bei Wechselspannung aus der Steckdose aber scheinbar beide?',
    solution: 'Bei Gleichspannung leuchtet nur die Kathode (Minuspol), da dort die positiven Edelgasionen aufprallen. Bei Wechselspannung polt sich das Netz 50-mal pro Sekunde um &rarr; Durch die Trägheit des menschlichen Auges scheinen beide Elektroden gleichzeitig zu leuchten.'
  },
  {
    sheet: 'AB05 Coulomb',
    category: 'coulomb',
    title: 'AB05: Coulombkraft bei Abstandsänderung (Meds.pdf S. 32 Verdopplungsregel)',
    prompt: 'Zwei Punktladungen üben im Abstand r = 5 cm eine Kraft von F = 16 mN aufeinander aus. Wie groß ist die Kraft im Abstand r = 10 cm und r = 2,5 cm?',
    solution: 'Da F ~ 1/r²:<br>• Bei r = 10 cm (doppelter Abstand) sinkt die Kraft auf ein Viertel: <code>F = 16 mN / 4 = 4 mN</code>.<br>• Bei r = 2,5 cm (halber Abstand) vervierfacht sich die Kraft: <code>F = 16 mN • 4 = 64 mN</code>.'
  },
  {
    sheet: 'AB06 Messwerte',
    category: 'messwerte',
    title: 'AB06: Auswertung einer Messreihe F(U) durch Linearisierung (Meds.pdf S. 32)',
    prompt: 'Warum darf man bei der Auswertung von F über U keine lineare Ausgleichsgerade durch die Punkte ziehen, und wie linearisiert man die Messreihe?',
    solution: 'Weil der Zusammenhang quadratisch ist: <code>F ~ U²</code> (Parabel). Zur Linearisierung quadriert man alle Spannungswerte und trägt F über U² auf &rarr; Man erhält eine Ursprungsgerade mit Steigung <code>m = ½ ε₀ (A/d²)</code>.'
  },
  {
    sheet: 'AB07 Feldstärke',
    category: 'efeld',
    title: 'AB07: Feldstärke zwischen zwei Kondensatorplatten',
    prompt: 'Zwischen zwei Platten (Abstand d = 1,0 cm) liegt eine Spannung von U = 5000 V. Wie groß ist die Feldstärke E? Kann es bei Luft zu einem Funkenüberschlag kommen (Durchschlagfeldstärke Luft ca. 30 kV/cm)?',
    solution: '<code>E = U / d = 5000 V / 1,0 cm = 5 kV/cm = 500 kV/m</code>.<br>Da 5 kV/cm deutlich unter der Durchschlagfeldstärke von 30 kV/cm liegt, kommt es zu <strong>keinem</strong> Funkenüberschlag.'
  },
  {
    sheet: 'AB08 Entladung',
    category: 'messwerte',
    title: 'AB08: Entladestrom I(t) des Kondensators (Meds.pdf S. 8 & 12)',
    prompt: 'Ein Kondensator entlädt sich. Warum wird die Stromstärke I mit der Zeit immer kleiner?',
    solution: 'Beim Entladen fließt Ladung Q ab. Dadurch sinkt die Kondensatorspannung <code>U = Q / C</code>. Nach dem Ohmschen Gesetz <code>I = U / R</code> sinkt mit kleiner werdender Spannung auch die Stromstärke I.'
  },
  {
    sheet: 'AB10 Coulomb',
    category: 'coulomb',
    title: 'AB10 Nr. 1: Ladungen im Vakuum',
    prompt: 'Zwei Kugeln mit Q₁ = 1,0 μC und Q₂ = 1,0 μC befinden sich im Abstand r = 10 cm. Berechne die abstoßende Kraft.',
    solution: '<code>F_C = 8,988 • 10⁹ • (10⁻⁶)² / (0,10)² = 8,988 • 10⁻³ / 0,01 ≈ 0,899 N</code>.'
  },
  {
    sheet: 'AB10 Coulomb',
    category: 'coulomb',
    title: 'AB10 Nr. 2: Abstandsberechnung bei gegebener Kraft',
    prompt: 'Zwei gleiche Ladungen Q = 25 nC stoßen sich mit F = 5,0 mN ab. Berechne den Abstand r.',
    solution: '<code>r = √[ (8,988 • 10⁹ • (25 • 10⁻⁹)²) / 0,005 ] ≈ 0,0335 m = 3,35 cm</code>.'
  },
  {
    sheet: 'AB10 Coulomb',
    category: 'coulomb',
    title: 'AB10 Nr. 3: Berührung & Ladungsausgleich',
    prompt: 'Kugel 1 (+10 μC) und Kugel 2 (-4 μC) werden berührt und getrennt. Welche Ladung tragen sie danach?',
    solution: '<code>Q\' = (+10 μC + (-4 μC)) / 2 = +3 μC</code> für jede Kugel.'
  },
  {
    sheet: 'AB10 Coulomb',
    category: 'coulomb',
    title: 'AB10 Nr. 5: Gravitation vs. Coulombkraft',
    prompt: 'Wie verhält sich die elektrische Coulombkraft zweier Elektronen zu ihrer Massenanziehung (Gravitation)?',
    solution: '<code>F_C / F_G = (k • e²) / (G • m_e²) ≈ 4,17 • 10⁴²</code>. Die elektrische Kraft ist um 42 Zehnerpotenzen stärker als die Gravitation!'
  },
  {
    sheet: 'AB11 Grundbegriffe',
    category: 'efeld',
    title: 'AB11: Feldlinienverlauf an Spitzen (Meds.pdf S. 25)',
    prompt: 'Warum ist das elektrische Feld an Spitzen von Leitern besonders stark (Spitzenwirkung)?',
    solution: 'Wegen der Krümmung weichen die beweglichen Ladungsträger vor der gegenseitigen Abstoßung zur Spitze hin aus. Die Ladungsdichte σ = Q/A wird an Spitzen extrem hoch &rarr; extrem hohe Feldstärke <code>E = σ / ε₀</code>!'
  }
];

// --- 8. MODE-BAR GENERATOR ---
function getPhysikModeBarHtml() {
  return `
    <div class="physik-mode-bar">
      <button class="physik-mode-btn ${CURRENT_PHYSIK_MODE === 'ordner' && !CURRENT_PHYSIK_SKILL ? 'active' : ''}" onclick="switchPhysikMode('ordner')">
        <span>📁</span><span>Hauptordner (Elektrizitätslehre)</span>
      </button>
      <button class="physik-mode-btn ${CURRENT_PHYSIK_MODE === 'funktionen' ? 'active' : ''}" onclick="switchPhysikMode('funktionen')">
        <span>📈</span><span>Die 4 Funktionen &amp; S. 33</span>
      </button>
      <button class="physik-mode-btn ${CURRENT_PHYSIK_MODE === 'themen' ? 'active' : ''}" onclick="switchPhysikMode('themen')">
        <span>📚</span><span>Alle 15 Themen</span>
      </button>
      <button class="physik-mode-btn ${CURRENT_PHYSIK_MODE === 'kombi' ? 'active' : ''}" onclick="switchPhysikMode('kombi')">
        <span>🧩</span><span>Kombinations-Aufgaben</span>
      </button>
      <button class="physik-mode-btn ${CURRENT_PHYSIK_MODE === 'iserv-pool' ? 'active' : ''}" onclick="switchPhysikMode('iserv-pool')">
        <span>🎯</span><span>Aufgabenpool (AB01 - AB11)</span>
      </button>
      <button class="physik-mode-btn ${CURRENT_PHYSIK_MODE === 'uploads' ? 'active' : ''}" onclick="switchPhysikMode('uploads')">
        <span>📤</span><span>Eigene Dokumente &amp; Meds.pdf</span>
      </button>
      <button class="physik-mode-btn ${CURRENT_PHYSIK_MODE === 'spickzettel' ? 'active' : ''}" onclick="openTopic('physik', 'physik-spickzettel')">
        <span>📌</span><span>Klausur-Spickzettel</span>
      </button>
    </div>
  `;
}

// --- 9. HAUPTPORTAL RENDERER ---
function renderPhysikPortal() {
  const gridEl = document.getElementById('themenGrid');
  if (!gridEl) return;

  gridEl.className = 'themen-stations-container';
  gridEl.style.display = 'block';

  // 1. If a skill is active, render skill detail view
  if (CURRENT_PHYSIK_SKILL) {
    renderPhysikSkillDetail(CURRENT_PHYSIK_SKILL);
    return;
  }

  // 2. If inside a folder, render that folder's detail view
  if (CURRENT_PHYSIK_MODE === 'ordner' && CURRENT_PHYSIK_FOLDER) {
    renderPhysikFolderDetail(CURRENT_PHYSIK_FOLDER);
    return;
  }

  // 3. Render Mode Navigation Bar & Search
  let html = getPhysikModeBarHtml();

  // Search box (shown on ordner & themen modes)
  if (CURRENT_PHYSIK_MODE === 'ordner' || CURRENT_PHYSIK_MODE === 'themen') {
    html += `
      <div class="physik-search-box">
        <span style="font-size: 1.1rem; color: var(--text-muted);">🔍</span>
        <input type="text" id="physikSearchInput" class="physik-search-input" 
               placeholder="Schnellsuche: Tippe z. B. Äquipotentiallinien, Influenz, Feldstärke, Coulomb, Messwerte, Fadenpendel..." 
               oninput="handlePhysikSearch(this.value)">
      </div>
    `;
  }

  // A. ORDNER MODE (DEFAULT)
  if (CURRENT_PHYSIK_MODE === 'ordner') {
    html += `
      <div style="margin-bottom: 1.2rem;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 0.6rem;">
          <div>
            <h3 style="font-size: 1.35rem; font-weight: 800; color: var(--text-primary); margin: 0 0 0.3rem 0;">
              📁 Elektrizitätslehre &amp; Elektrostatik (Klausur 12/1)
            </h3>
            <p style="font-size: 0.88rem; color: var(--text-secondary); margin: 0; line-height: 1.5;">
              Vollständiger Klausurstoff nach <strong>Meds.pdf</strong> in 5 klar getrennten Ordnern. Klicke auf einen Ordner oder direkt auf ein Unterthema:
            </p>
          </div>
          <button class="btn-action-dl-folder" onclick="switchPhysikMode('funktionen')" style="background: linear-gradient(135deg, #3b82f6, #1d4ed8); color: white; border: none; padding: 0.5rem 1rem; border-radius: var(--radius-pill); font-size: 0.82rem; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 0.4rem;">
            <span>📈</span><span>Fokus S. 32 &amp; 33 öffnen &rarr;</span>
          </button>
        </div>
      </div>

      <div class="physics-folders-grid" id="physikFoldersGrid">
    `;

    ELEKTRIZITAET_FOLDERS.forEach((folder) => {
      html += `
        <div class="physics-folder-card" style="border-top: 4px solid ${folder.color};" onclick="openPhysikFolder('${folder.id}')">
          <div>
            <div class="folder-top-row">
              <div class="folder-big-icon-box" style="background: ${folder.color}15; color: ${folder.color};">
                ${folder.icon}
              </div>
              <span class="folder-badge-pill" style="background: ${folder.color}20; color: ${folder.color};">
                ${folder.badge}
              </span>
            </div>
            <div class="folder-main-title">
              ${folder.title}
            </div>
            <div class="folder-desc-text">
              ${folder.subtitle}
            </div>

            <!-- List of topics inside folder -->
            <div style="background: var(--bg-subtle); border-radius: 8px; padding: 0.6rem 0.8rem; margin-bottom: 1.2rem;">
              <div style="font-size: 0.76rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; margin-bottom: 0.4rem;">
                Enthaltene Themen (${folder.topics.length}):
              </div>
              <div style="display: flex; flex-direction: column; gap: 0.35rem;">
                ${folder.topics.map(t => `
                  <div style="display: flex; align-items: center; justify-content: space-between; font-size: 0.82rem; color: var(--text-primary); cursor: pointer;" onclick="event.stopPropagation(); openPhysikSkill('${t.id}')">
                    <span style="display: inline-flex; align-items: center; gap: 0.35rem;">
                      <span style="font-weight: 700; color: ${folder.color}; font-size: 0.78rem;">${t.num}</span>
                      <span>${t.title.split(':')[0]}</span>
                    </span>
                    <span style="font-size: 0.72rem; color: var(--text-muted); background: var(--bg-card); padding: 0.15rem 0.4rem; border-radius: 4px; border: 1px solid var(--border-subtle);">${t.badge}</span>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>

          <div class="folder-card-footer">
            <span class="folder-content-tag">
              <span>📑</span><span>${folder.topics.length} Themenblöcke</span>
            </span>
            <button class="btn-open-folder-cta" style="background: ${folder.color};" onclick="event.stopPropagation(); openPhysikFolder('${folder.id}')">
              Ordner öffnen &rarr;
            </button>
          </div>
        </div>
      `;
    });

    html += `</div>`;
  }
  // B. DEDICATED FUNKTIONEN & S. 33 VIEW
  else if (CURRENT_PHYSIK_MODE === 'funktionen') {
    html += renderFunktionenViewHtml();
  }
  // C. ALL 15 SKILLS VIEW
  else if (CURRENT_PHYSIK_MODE === 'themen') {
    html += `
      <div style="margin-bottom: 1rem;">
        <h3 style="font-size: 1.25rem; font-weight: 800; color: var(--text-primary); margin: 0 0 0.2rem 0;">
          📚 Alle 15 Kern-Themen &amp; Fertigkeiten (Klausur Freitag)
        </h3>
        <p style="font-size: 0.85rem; color: var(--text-secondary); margin: 0;">
          Klicke auf ein beliebiges Thema, um die <strong>visuelle Erklärung</strong>, <strong>Übungsaufgaben mit Lösung</strong> und dein <strong>persönliches Notizfeld</strong> zu öffnen:
        </p>
      </div>

      <div class="physik-skill-grid" id="physikSkillGrid">
    `;

    PHYSIK_SKILLS.forEach((skill) => {
      html += `
        <div class="physik-skill-card" data-title="${skill.title.toLowerCase()}" data-desc="${skill.desc.toLowerCase()}" data-tag="${skill.tag.toLowerCase()}" onclick="openPhysikSkill('${skill.id}')">
          <div>
            <div class="skill-card-top">
              <div class="skill-icon-badge" style="background: ${skill.color}18; border: 1px solid ${skill.color}33;">
                ${skill.icon}
              </div>
              <span class="skill-tag-pill" style="background: ${skill.color}22; color: ${skill.color};">
                ${skill.tag}
              </span>
            </div>
            <div class="skill-card-title">
              ${skill.title}
            </div>
            <div class="skill-card-desc">
              ${skill.desc}
            </div>
          </div>
          <div class="skill-card-footer">
            <span class="skill-features-text">
              👁️ Visuell &bull; 🎯 ${skill.tasks ? skill.tasks.length : 1} Übung(en) &bull; 📝 Notizen
            </span>
            <button class="btn-open-skill-card" style="background: ${skill.color};" onclick="event.stopPropagation(); openPhysikSkill('${skill.id}')">
              Thema lernen &rarr;
            </button>
          </div>
        </div>
      `;
    });

    html += `</div>`;
  }
  // D. KOMBI AUFGABEN
  else if (CURRENT_PHYSIK_MODE === 'kombi') {
    html += `
      <div style="margin-bottom: 1.4rem;">
        <h3 style="font-size: 1.25rem; font-weight: 800; color: var(--text-primary); margin: 0 0 0.2rem 0;">
          🧩 Komplexe Kombinations-Aufgaben (Vernetzte Themenblöcke)
        </h3>
        <p style="font-size: 0.85rem; color: var(--text-secondary); margin: 0;">
          In Klausuren werden häufig mehrere Themen in einer einzigen großen Aufgabe kombiniert. Übe hier genau diese Verknüpfungen:
        </p>
      </div>
    `;

    KOMBI_AUFGABEN.forEach((kombi, idx) => {
      html += `
        <div class="kombi-card" style="background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); padding: 1.4rem; margin-bottom: 1.2rem; box-shadow: var(--card-shadow);">
          <div class="kombi-header" style="margin-bottom: 0.6rem;">
            <h4 style="font-size: 1.15rem; font-weight: 800; color: var(--text-primary); margin: 0;">
              ${kombi.title}
            </h4>
          </div>
          <div class="kombi-connected-badges" style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 0.8rem;">
            ${kombi.badges.map(b => `<span class="kombi-pill" style="font-size: 0.75rem; background: rgba(59, 130, 246, 0.12); color: #3b82f6; padding: 0.2rem 0.6rem; border-radius: 999px; font-weight: 700;">🔗 ${b}</span>`).join('')}
          </div>
          <div class="task-prompt-box" style="background: var(--bg-subtle); padding: 1rem; border-radius: 8px; margin-bottom: 1rem; font-size: 0.88rem; line-height: 1.55;">
            ${kombi.prompt}
          </div>
          <button class="btn-reveal-card" onclick="toggleSolution('solKombi_${idx}', this)">
            👁️ Vollständigen Lösungsweg aufdecken
          </button>
          <div class="task-solution-container" id="solKombi_${idx}">
            <div style="font-weight: 800; color: #10b981; margin-bottom: 0.8rem;">✓ Vollständige Musterlösung:</div>
            ${kombi.solution}
          </div>
        </div>
      `;
    });
  }
  // E. ISERV AUFGABEN POOL
  else if (CURRENT_PHYSIK_MODE === 'iserv-pool') {
    html += `
      <div style="margin-bottom: 1.2rem;">
        <h3 style="font-size: 1.25rem; font-weight: 800; color: var(--text-primary); margin: 0 0 0.2rem 0;">
          🎯 Großer Aufgabenpool aus allen IServ-Arbeitsblättern &amp; Klausurblatt S. 33
        </h3>
        <p style="font-size: 0.85rem; color: var(--text-secondary); margin: 0;">
          Aufgaben direkt aus deinen Unterrichtsmaterialien (AB01 bis AB11 und Klausurblatt S. 33):
        </p>
      </div>

      <div class="iserv-pool-filter" style="display: flex; gap: 0.4rem; flex-wrap: wrap; margin-bottom: 1.2rem;">
        <button class="iserv-filter-pill ${CURRENT_ISERV_CATEGORY === 'all' ? 'active' : ''}" onclick="filterIservPool('all')">Alle Aufgaben (${ISERV_AUFGABEN_POOL.length})</button>
        <button class="iserv-filter-pill ${CURRENT_ISERV_CATEGORY === 'messwerte' ? 'active' : ''}" onclick="filterIservPool('messwerte')">Messwerte &amp; Linearisierung (S. 33)</button>
        <button class="iserv-filter-pill ${CURRENT_ISERV_CATEGORY === 'coulomb' ? 'active' : ''}" onclick="filterIservPool('coulomb')">Coulombsches Gesetz</button>
        <button class="iserv-filter-pill ${CURRENT_ISERV_CATEGORY === 'efeld' ? 'active' : ''}" onclick="filterIservPool('efeld')">Elektrisches Feld</button>
        <button class="iserv-filter-pill ${CURRENT_ISERV_CATEGORY === 'elektrostatik' ? 'active' : ''}" onclick="filterIservPool('elektrostatik')">Elektrostatik &amp; Influenz</button>
      </div>

      <div id="iservTasksContainer">
    `;

    ISERV_AUFGABEN_POOL.forEach((item, idx) => {
      const isVisible = CURRENT_ISERV_CATEGORY === 'all' || item.category === CURRENT_ISERV_CATEGORY;
      html += `
        <div class="iserv-task-card" style="display: ${isVisible ? 'block' : 'none'}; background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 1.2rem; margin-bottom: 1rem; box-shadow: var(--card-shadow);">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem; flex-wrap: wrap; gap: 0.4rem;">
            <strong style="font-size: 1rem; color: var(--text-primary);">${item.title}</strong>
            <span class="p-badge" style="background: var(--bg-subtle); color: var(--text-secondary); border: 1px solid var(--border-subtle);">${item.sheet}</span>
          </div>
          <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.5; margin-bottom: 1rem;">
            ${item.prompt}
          </p>
          <button class="btn-reveal-card" onclick="toggleSolution('solIserv_${idx}', this)">
            👁️ Lösung anzeigen
          </button>
          <div class="task-solution-container" id="solIserv_${idx}">
            <div style="font-weight: 700; color: #10b981; margin-bottom: 0.4rem;">✓ Lösung:</div>
            <p style="margin: 0; font-size: 0.86rem; line-height: 1.5;">${item.solution}</p>
          </div>
        </div>
      `;
    });

    html += `</div>`;
  }
  // F. UPLOADS VIEW
  else if (CURRENT_PHYSIK_MODE === 'uploads') {
    gridEl.innerHTML = html;
    const uploadsContainer = document.createElement('div');
    uploadsContainer.id = 'physikUploadsViewWrapper';
    gridEl.appendChild(uploadsContainer);
    if (typeof renderPhysikUploadsView === 'function') {
      renderPhysikUploadsView(uploadsContainer);
    }
    return;
  }

  gridEl.innerHTML = html;
  renderPhysikKaTeX();
}

// --- 10. DETAIL-VIEW FÜR EINEN HAUPTORDNER ---
function renderPhysikFolderDetail(folderId) {
  const gridEl = document.getElementById('themenGrid');
  if (!gridEl) return;

  const folder = ELEKTRIZITAET_FOLDERS.find(f => f.id === folderId);
  if (!folder) {
    CURRENT_PHYSIK_FOLDER = null;
    renderPhysikPortal();
    return;
  }

  let html = `
    <!-- Top Mode Navigation Bar -->
    ${getPhysikModeBarHtml()}

    <div class="folder-detail-container">
      <div class="folder-nav-header-bar">
        <button class="btn-back-to-all-folders" onclick="closePhysikFolder()">
          &larr; Zurück zu allen 5 Ordnern
        </button>
        <div class="folder-active-badge">
          <span>Ordner <strong>#${folder.num}</strong>:</span>
          <span>${folder.title}</span>
        </div>
      </div>

      <div class="folder-banner-card" style="border-left: 6px solid ${folder.color};">
        <div class="folder-banner-content">
          <div class="folder-banner-icon" style="background: ${folder.color}20; color: ${folder.color};">
            ${folder.icon}
          </div>
          <div>
            <span class="folder-badge-pill" style="background: ${folder.color}22; color: ${folder.color}; margin-bottom: 0.4rem; display: inline-block;">
              ${folder.badge}
            </span>
            <h2 style="font-size: 1.4rem; font-weight: 800; color: var(--text-primary); margin: 0 0 0.4rem 0;">
              ${folder.title}
            </h2>
            <p style="font-size: 0.88rem; color: var(--text-secondary); margin: 0; line-height: 1.5;">
              ${folder.subtitle}
            </p>
          </div>
        </div>
      </div>

      <div class="folder-points-heading">
        <span>📑</span><span>Themen &amp; Klausuraufgaben in diesem Ordner (${folder.topics.length}):</span>
      </div>

      <div class="folder-points-grid">
  `;

  folder.topics.forEach((t) => {
    const skill = PHYSIK_SKILLS.find(s => s.id === t.id);
    const taskCount = skill && skill.tasks ? skill.tasks.length : 0;
    html += `
      <div class="folder-point-card" style="border-top: 3px solid ${folder.color};" onclick="openPhysikSkill('${t.id}')">
        <div>
          <div class="point-top-row">
            <span class="point-num-tag" style="background: ${folder.color}15; color: ${folder.color};">
              Teilthema ${t.num}
            </span>
            <span class="p-badge" style="background: var(--bg-subtle); color: var(--text-muted); border: 1px solid var(--border-subtle);">
              ${t.badge}
            </span>
          </div>
          <div class="point-title">
            ${t.title}
          </div>
          <div class="point-desc">
            ${t.desc}
          </div>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 0.8rem; border-top: 1px dashed var(--border-subtle); margin-top: 0.6rem;">
          <span style="font-size: 0.76rem; color: var(--text-muted); font-weight: 600;">
            ${taskCount > 0 ? `🎯 ${taskCount} Übung(en) mit Lösung` : '👁️ Visuelle Erklärung'}
          </span>
          <button class="btn-point-launch" style="background: ${folder.color};" onclick="event.stopPropagation(); openPhysikSkill('${t.id}')">
            Thema öffnen &rarr;
          </button>
        </div>
      </div>
    `;
  });

  html += `
      </div>
    </div>
  `;

  gridEl.innerHTML = html;
  renderPhysikKaTeX();
}

// --- 11. DEDICATED FUNKTIONEN VIEW HTML ---
function renderFunktionenViewHtml() {
  return `
    <div style="margin-bottom: 1.4rem;">
      <div class="formula-hero-card" style="border-left: 6px solid #3b82f6; background: var(--bg-card); border-radius: var(--radius-lg); padding: 1.5rem; box-shadow: var(--card-shadow); border: 1px solid var(--border-subtle);">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.6rem; margin-bottom: 0.8rem;">
          <span class="formula-hero-badge" style="background: rgba(59, 130, 246, 0.15); color: #3b82f6; font-size: 0.82rem; font-weight: 800; padding: 0.35rem 0.8rem; border-radius: 999px;">
            📈 KLAUSUR-FOKUS S. 32: DIE 4 TYPISCHEN FUNKTIONEN
          </span>
          <div style="display: flex; gap: 0.5rem;">
            <button class="btn-point-launch" style="background: #3b82f6;" onclick="openPhysikSkill('typische-funktionen')">
              Ausführliche Theorie (Thema 1.1) &rarr;
            </button>
            <button class="btn-point-launch" style="background: #10b981;" onclick="openPhysikSkill('messwerte-auswerten-2')">
              Originalblatt S. 33 gelöst (Thema 1.2) &rarr;
            </button>
          </div>
        </div>

        <h2 style="font-size: 1.4rem; font-weight: 800; color: var(--text-primary); margin: 0 0 0.5rem 0;">
          Die 4 unverzichtbaren Funktionstypen im Physik-Abitur &amp; Klausur 12/1
        </h2>
        <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.55; margin: 0 0 1.2rem 0;">
          Aus Meds.pdf S. 32: In der Klausur musst du anhand von Messwerttabellen sofort den physikalischen Zusammenhang feststellen. Verwende die <strong>Verdopplungsregel</strong> zur schnellen Hypothese und die <strong>Konstantenprüfung</strong> zum exakten rechnerischen Nachweis:
        </p>

        <!-- 4 Functions Grid -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1rem; margin-bottom: 1.5rem;">
          <!-- 1. Proportional -->
          <div style="background: var(--bg-subtle); border-radius: 8px; padding: 1.1rem; border-top: 4px solid #3b82f6;">
            <div style="font-weight: 800; color: #3b82f6; font-size: 1.05rem; margin-bottom: 0.4rem;">
              1. Proportional (<span class="katex-render" data-display="false" data-latex="y \\sim x">y ~ x</span>)
            </div>
            <div style="font-size: 0.88rem; margin-bottom: 0.5rem;">
              <strong>Gleichung:</strong> <span class="katex-render" data-display="false" data-latex="y = k \\cdot x">y = k · x</span>
            </div>
            <div style="font-size: 0.82rem; color: var(--text-secondary); line-height: 1.5;">
              • <strong>Verdopplung:</strong> <span class="katex-render" data-display="false" data-latex="x \\to 2x \\implies y \\to 2y">x -> 2x => y -> 2y</span>.<br>
              • <strong>Klausur-Test:</strong> <em>Quotientengleichheit</em> <span class="katex-render" data-display="false" data-latex="\\frac{y}{x} = k = \\text{const.}">y/x = const.</span><br>
              • <strong>Graph:</strong> Ursprungsgerade mit Steigung <span class="katex-render" data-display="false" data-latex="k">k</span>.<br>
              • <strong>Physik-Bsp.:</strong> <span class="katex-render" data-display="false" data-latex="F_{\\text{el}} = q \\cdot E">Fel = q · E</span> (<span class="katex-render" data-display="false" data-latex="F \\sim q">F ~ q</span>).
            </div>
          </div>

          <!-- 2. Quadratisch -->
          <div style="background: var(--bg-subtle); border-radius: 8px; padding: 1.1rem; border-top: 4px solid #10b981;">
            <div style="font-weight: 800; color: #10b981; font-size: 1.05rem; margin-bottom: 0.4rem;">
              2. Quadratisch (<span class="katex-render" data-display="false" data-latex="y \\sim x^2">y ~ x²</span>)
            </div>
            <div style="font-size: 0.88rem; margin-bottom: 0.5rem;">
              <strong>Gleichung:</strong> <span class="katex-render" data-display="false" data-latex="y = k \\cdot x^2">y = k · x²</span>
            </div>
            <div style="font-size: 0.82rem; color: var(--text-secondary); line-height: 1.5;">
              • <strong>Verdopplung:</strong> <span class="katex-render" data-display="false" data-latex="x \\to 2x \\implies y \\to 4y">x -> 2x => y -> 4y</span>.<br>
              • <strong>Klausur-Test:</strong> <em>Quotientengleichheit</em> <span class="katex-render" data-display="false" data-latex="\\frac{y}{x^2} = k = \\text{const.}">y/x² = const.</span><br>
              • <strong>Graph:</strong> Parabel durch Ursprung.<br>
              • <strong>Physik-Bsp.:</strong> <span class="katex-render" data-display="false" data-latex="F = \\frac{1}{2}\\varepsilon_0 \\frac{A}{d^2} U^2">F ~ U²</span> (Plattenkondensator S. 33).
            </div>
          </div>

          <!-- 3. Antiproportional -->
          <div style="background: var(--bg-subtle); border-radius: 8px; padding: 1.1rem; border-top: 4px solid #f59e0b;">
            <div style="font-weight: 800; color: #f59e0b; font-size: 1.05rem; margin-bottom: 0.4rem;">
              3. Antiproportional (<span class="katex-render" data-display="false" data-latex="y \\sim \\frac{1}{x}">y ~ 1/x</span>)
            </div>
            <div style="font-size: 0.88rem; margin-bottom: 0.5rem;">
              <strong>Gleichung:</strong> <span class="katex-render" data-display="false" data-latex="y = \\frac{k}{x}">y = k / x</span>
            </div>
            <div style="font-size: 0.82rem; color: var(--text-secondary); line-height: 1.5;">
              • <strong>Verdopplung:</strong> <span class="katex-render" data-display="false" data-latex="x \\to 2x \\implies y \\to \\frac{1}{2}y">x -> 2x => y -> y/2</span>.<br>
              • <strong>Klausur-Test:</strong> <em>Produktgleichheit</em> <span class="katex-render" data-display="false" data-latex="x \\cdot y = k = \\text{const.}">x · y = const.</span><br>
              • <strong>Graph:</strong> Hyperbel.<br>
              • <strong>Physik-Bsp.:</strong> <span class="katex-render" data-display="false" data-latex="E = \\frac{U}{d}">E = U/d</span> bei festem <span class="katex-render" data-display="false" data-latex="U">U</span> (<span class="katex-render" data-display="false" data-latex="E \\sim 1/d">E ~ 1/d</span>).
            </div>
          </div>

          <!-- 4. Potenzfunktion 1/x² -->
          <div style="background: var(--bg-subtle); border-radius: 8px; padding: 1.1rem; border-top: 4px solid #ef4444;">
            <div style="font-weight: 800; color: #ef4444; font-size: 1.05rem; margin-bottom: 0.4rem;">
              4. Potenzfunktion (<span class="katex-render" data-display="false" data-latex="y \\sim \\frac{1}{x^2}">y ~ 1/x²</span>)
            </div>
            <div style="font-size: 0.88rem; margin-bottom: 0.5rem;">
              <strong>Gleichung:</strong> <span class="katex-render" data-display="false" data-latex="y = \\frac{k}{x^2}">y = k / x²</span>
            </div>
            <div style="font-size: 0.82rem; color: var(--text-secondary); line-height: 1.5;">
              • <strong>Verdopplung:</strong> <span class="katex-render" data-display="false" data-latex="x \\to 2x \\implies y \\to \\frac{1}{4}y">x -> 2x => y -> y/4</span>.<br>
              • <strong>Klausur-Test:</strong> <em>Produktgleichheit</em> <span class="katex-render" data-display="false" data-latex="y \\cdot x^2 = k = \\text{const.}">y · x² = const.</span><br>
              • <strong>Graph:</strong> Steiler abfallende Hyperbel.<br>
              • <strong>Physik-Bsp.:</strong> Coulombsches Gesetz <span class="katex-render" data-display="false" data-latex="F_C = \\frac{1}{4\\pi\\varepsilon_0} \\frac{Q_1 Q_2}{r^2}">FC ~ 1/r²</span> (S. 33).
            </div>
          </div>
        </div>

        <!-- TI-NSPIRE CAS WORKFLOW GUIDE -->
        <div class="cas-guide-card" style="background: linear-gradient(135deg, rgba(30, 41, 59, 0.95), rgba(15, 23, 42, 0.95)); border: 1px solid #38bdf8; border-radius: 10px; padding: 1.2rem; margin: 1.2rem 0; color: #f8fafc; box-shadow: 0 4px 15px rgba(0,0,0,0.3);">
          <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid rgba(56, 189, 248, 0.3); padding-bottom: 0.6rem; margin-bottom: 0.8rem; flex-wrap: wrap; gap: 0.5rem;">
            <div style="font-weight: 800; color: #38bdf8; font-size: 1.1rem; display: flex; align-items: center; gap: 0.5rem;">
              <span>📟</span><span>TI-Nspire CAS: Der perfekte Workflow für Messwertauswertung &amp; Regression</span>
            </div>
            <span style="background: rgba(56, 189, 248, 0.2); color: #38bdf8; font-size: 0.76rem; font-weight: 700; padding: 0.2rem 0.6rem; border-radius: 999px;">Klausur-Werkzeug</span>
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem; font-size: 0.84rem; line-height: 1.5;">
            <!-- Schritt 1 -->
            <div style="background: rgba(255, 255, 255, 0.05); padding: 0.85rem; border-radius: 8px; border-left: 3px solid #38bdf8;">
              <strong style="color: #38bdf8; font-size: 0.9rem;">1. Lists &amp; Spreadsheet anlegen &amp; benennen</strong><br>
              • Taste <code style="color:#fde047;">[doc]</code> &rarr; <code>4: Einfügen</code> &rarr; <code>6: Lists &amp; Spreadsheet</code>.<br>
              • <strong>Kopfzeile (oberste weiße Zelle):</strong> Gib Kurznamen ein, z. B.:<br>
              Spalte A: <code style="color:#a7f3d0;">u</code> (Spannung) | Spalte B: <code style="color:#a7f3d0;">f</code> (Kraft).<br>
              <span style="color: #f87171; font-size: 0.78rem;">⚠️ WICHTIG: Niemals x oder y als Spaltenkopf wählen! (Sind geschützte Systemvariablen).</span>
            </div>

            <!-- Schritt 2 -->
            <div style="background: rgba(255, 255, 255, 0.05); padding: 0.85rem; border-radius: 8px; border-left: 3px solid #10b981;">
              <strong style="color: #10b981; font-size: 0.9rem;">2. Formelspalte zur k-Prüfung anlegen</strong><br>
              • Klicke in Spalte C in die <strong>graue Zeile mit dem fettgedruckten =</strong>.<br>
              • Für <span class="katex-render" data-display="false" data-latex="F \\sim U^2">F ~ U²</span>: Formel <code style="color:#fde047;">=f / (u^2)</code> eintippen &rarr; <code style="color:#fde047;">[enter]</code>.<br>
              • Für <span class="katex-render" data-display="false" data-latex="F \\sim 1/r^2">F ~ 1/r²</span>: Formel <code style="color:#fde047;">=f * (r^2)</code> eintippen &rarr; <code style="color:#fde047;">[enter]</code>.<br>
              • Bei der Rückfrage stets <strong>„Spaltenreferenz“</strong> wählen.<br>
              &rarr; Der CAS berechnet die gesamte Spalte C automatisch!
            </div>

            <!-- Schritt 3 -->
            <div style="background: rgba(255, 255, 255, 0.05); padding: 0.85rem; border-radius: 8px; border-left: 3px solid #f59e0b;">
              <strong style="color: #f59e0b; font-size: 0.9rem;">3. Mittelwert k̄ &amp; Standardabweichung</strong><br>
              • <strong>Im Calculator-Fenster:</strong> Taste <code style="color:#fde047;">[ctrl]</code>+<code style="color:#fde047;">[doc]</code> &rarr; <code>1: Calculator</code>.<br>
              Befehl: <code style="color:#fde047;">mean(c[])</code> oder <code style="color:#fde047;">mean(k)</code> &rarr; liefert exakten Mittelwert <span class="katex-render" data-display="false" data-latex="\\bar{k}">k̄</span>.<br>
              Befehl: <code style="color:#fde047;">stDevSamp(c[])</code> &rarr; Standardabweichung (Messfehler).<br>
              • <strong>In Lists &amp; Spreadsheet:</strong> Taste <code style="color:#fde047;">[menu]</code> &rarr; <code>4: Statistik</code> &rarr; <code>1: Statistische Berechnungen</code> &rarr; <code>1: Statistik mit einer Variable</code>.
            </div>

            <!-- Schritt 4 -->
            <div style="background: rgba(255, 255, 255, 0.05); padding: 0.85rem; border-radius: 8px; border-left: 3px solid #c084fc;">
              <strong style="color: #c084fc; font-size: 0.9rem;">4. Lineare Regression &amp; Bestimmtheitsmaß R²</strong><br>
              • Erstelle Spalte mit linearisierter Größe, z. B. <code style="color:#a7f3d0;">u2</code> mit Formel <code style="color:#fde047;">=u^2</code>.<br>
              • Taste <code style="color:#fde047;">[menu]</code> &rarr; <code>4: Statistik</code> &rarr; <code>1: Statistische Berechnungen</code> &rarr; <code>3: Lineare Regression (mx+b)</code>.<br>
              • X-Liste: <code style="color:#a7f3d0;">u2</code> | Y-Liste: <code style="color:#a7f3d0;">f</code>.<br>
              &rarr; Steigung <span class="katex-render" data-display="false" data-latex="m = \\bar{k}">m = k̄</span>, Achsenabschnitt <span class="katex-render" data-display="false" data-latex="b \\approx 0">b ≈ 0</span> und Bestimmtheitsmaß <span class="katex-render" data-display="false" data-latex="r^2 > 0{,}99">r² > 0,99</span>!
            </div>
          </div>
        </div>

        <!-- 4-Schritte-Methode -->
        <div style="background: rgba(99, 102, 241, 0.08); border-left: 4px solid #6366f1; border-radius: 8px; padding: 1rem; margin-bottom: 1.2rem;">
          <strong style="color: #6366f1; font-size: 0.95rem;">🎯 Die 4-Schritte-Methode für die Klausur:</strong>
          <ol style="margin: 0.5rem 0 0 1.2rem; font-size: 0.85rem; line-height: 1.6; color: var(--text-primary); padding: 0;">
            <li><strong>Schritt 1 (Verdopplungsprüfung):</strong> Suche Wertepaare mit verdoppeltem x-Wert (z.B. r = 2 cm zu r = 4 cm). Was passiert mit y? Fällt es auf 1/4 -> Vermutung: <span class="katex-render" data-display="false" data-latex="y \\sim 1/x^2"></span>!</li>
            <li><strong>Schritt 2 (Rechnerische Konstantenprüfung):</strong> Berechne für jedes Wertepaar die Konstante <span class="katex-render" data-display="false" data-latex="k = y \\cdot x^2"></span> bzw. <span class="katex-render" data-display="false" data-latex="k = y / x^2"></span>. Liegen alle Werte im Rahmen der Messgenauigkeit (z.B. ±2%) beieinander, ist die Hypothese bestätigt!</li>
            <li><strong>Schritt 3 (Linearisierung):</strong> Berechne eine neue Tabellenspalte (z.B. <span class="katex-render" data-display="false" data-latex="1/r^2"></span> oder <span class="katex-render" data-display="false" data-latex="U^2"></span>). Trägt man F über dieser Spalte auf, entsteht eine Ursprungsgerade!</li>
            <li><strong>Schritt 4 (Physikalischer Zusammenhang):</strong> Setze die Steigung <span class="katex-render" data-display="false" data-latex="k"></span> mit der physikalischen Formel gleich, um gesuchte Größen (z.B. Ladung <span class="katex-render" data-display="false" data-latex="Q"></span> oder Plattenfläche <span class="katex-render" data-display="false" data-latex="A"></span>) zu bestimmen.</li>
          </ol>
        </div>

        <div style="text-align: center;">
          <button class="btn-point-launch" style="background: linear-gradient(135deg, #10b981, #059669); font-size: 0.9rem; padding: 0.65rem 1.4rem;" onclick="openPhysikSkill('messwerte-auswerten-2')">
            📑 Jetzt Klausurblatt S. 33 öffnen (3 Aufgaben mit vollem Lösungsweg) &rarr;
          </button>
        </div>
      </div>
    </div>
  `;
}

// --- 12. DETAIL-VIEW FÜR EIN THEMA (SKILL) ---
function renderPhysikSkillDetail(skillId) {
  const gridEl = document.getElementById('themenGrid');
  if (!gridEl) return;

  const skill = PHYSIK_SKILLS.find(s => s.id === skillId);
  if (!skill) {
    CURRENT_PHYSIK_SKILL = null;
    renderPhysikPortal();
    return;
  }

  // Load saved note
  const noteKey = 'tonda_skill_note_' + skill.id;
  const savedNote = localStorage.getItem(noteKey) || '';

  // Determine active simulator for this skill
  const simType = skill.hasSim || (
    skill.id === 'elektroskop-funktion' ? 'elektrostatik' :
    skill.id === 'efeld-berechnen' ? 'coulomb' :
    skill.id === 'feldlinien-aequipotential' ? 'efeld' :
    skill.id === 'kondensator-versuch' ? 'schaltungen' :
    skill.id === 'faraday-kaefig' ? 'faraday' : null
  );

  const backBtnText = CURRENT_PHYSIK_FOLDER ? '&larr; Zurück zum Ordner' : '&larr; Zurück zur Übersicht';

  let html = `
    <div class="skill-detail-container">
      <!-- Top Navigation Bar with Back Button -->
      <div class="skill-detail-nav" style="display: flex; justify-content: space-between; align-items: center; background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 0.8rem 1.2rem; margin-bottom: 1.2rem; box-shadow: var(--card-shadow);">
        <button class="btn-back-to-all-folders" onclick="closePhysikSkill()">
          ${backBtnText}
        </button>
        <div style="font-size: 0.85rem; color: var(--text-secondary);">
          Thema <strong>#${skill.num}</strong> &bull; <span style="color: ${skill.color}; font-weight: 700;">${skill.tag}</span>
        </div>
      </div>

      <!-- Skill Hero Banner -->
      <div class="skill-hero-banner" style="border-left: 6px solid ${skill.color}; background: var(--bg-card); border-radius: var(--radius-lg); padding: 1.5rem; margin-bottom: 1.5rem; box-shadow: var(--card-shadow); border: 1px solid var(--border-subtle);">
        <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 0.6rem;">
          <div class="skill-icon-badge" style="background: ${skill.color}18; border: 1px solid ${skill.color}33; font-size: 2rem; width: 54px; height: 54px; border-radius: 14px; display: flex; align-items: center; justify-content: center;">
            ${skill.icon}
          </div>
          <div>
            <h2 style="font-size: 1.45rem; font-weight: 800; color: var(--text-primary); margin: 0 0 0.3rem 0;">
              ${skill.title}
            </h2>
            <div style="font-size: 0.86rem; color: var(--text-secondary);">
              ${skill.desc}
            </div>
          </div>
        </div>
      </div>

      <!-- 1. VISUELLE ERKLÄRUNG -->
      <div>
        <h3 style="font-size: 1.15rem; font-weight: 800; color: var(--text-primary); margin: 0 0 0.8rem 0; display: flex; align-items: center; gap: 0.5rem;">
          <span>👁️</span><span>1. Visuelle Erklärung (Kompakt auf den Punkt)</span>
        </h3>
        ${skill.visualHtml}
      </div>
  `;

  // Simulation embedding
  if (simType === 'coulomb') {
    html += `
      <div class="sim-container" style="margin-top: 1.5rem;">
        <div class="sim-header">
          <div class="sim-title"><span>📐</span><span>Interaktiver Coulomb-Simulator</span></div>
        </div>
        <div class="sim-canvas-wrapper"><canvas id="coulombCanvas" width="560" height="280"></canvas></div>
        <div class="sim-controls-grid">
          <div class="sim-control-group">
            <div class="sim-label-row"><span>Q₁:</span><span id="valCoulombQ1" style="color:#ef4444;">+5.0 µC</span></div>
            <input type="range" id="coulombSliderQ1" class="sim-slider" min="-10" max="10" step="0.5" value="5">
          </div>
          <div class="sim-control-group">
            <div class="sim-label-row"><span>Q₂:</span><span id="valCoulombQ2" style="color:#3b82f6;">-5.0 µC</span></div>
            <input type="range" id="coulombSliderQ2" class="sim-slider" min="-10" max="10" step="0.5" value="-5">
          </div>
          <div class="sim-control-group">
            <div class="sim-label-row"><span>Abstand r:</span><span id="valCoulombR" style="color:#f59e0b;">10 cm</span></div>
            <input type="range" id="coulombSliderR" class="sim-slider" min="2" max="20" step="1" value="10">
          </div>
        </div>
        <div class="sim-result-box" id="coulombResultBox">Lade Simulator...</div>
      </div>
    `;
  } else if (simType === 'efeld') {
    html += `
      <div class="sim-container" style="margin-top: 1.5rem;">
        <div class="sim-header">
          <div class="sim-title"><span>🚀</span><span>Elektronenstrahl-Simulator</span></div>
          <button class="sim-btn-action" id="btnEfeldFire">🚀 Elektron abfeuern</button>
        </div>
        <div class="sim-canvas-wrapper"><canvas id="efeldCanvas" width="560" height="300"></canvas></div>
        <div class="sim-controls-grid">
          <div class="sim-control-group">
            <div class="sim-label-row"><span>Spannung U:</span><span id="valEfeldU" style="color:#38bdf8;">500 V</span></div>
            <input type="range" id="efeldSliderU" class="sim-slider" min="0" max="1000" step="25" value="500">
          </div>
          <div class="sim-control-group">
            <div class="sim-label-row"><span>Plattenabstand d:</span><span id="valEfeldD" style="color:#38bdf8;">5.0 cm</span></div>
            <input type="range" id="efeldSliderD" class="sim-slider" min="2" max="10" step="0.5" value="5">
          </div>
        </div>
        <div class="sim-result-box" id="efeldResultBox">Lade Simulator...</div>
      </div>
    `;
  } else if (simType === 'elektrostatik') {
    html += `
      <div class="sim-container" style="margin-top: 1.5rem;">
        <div class="sim-header">
          <div class="sim-title"><span>⚡</span><span>Elektroskop-Simulator</span></div>
          <div style="display:flex; gap:0.4rem;">
            <button class="sim-btn-secondary" id="btnToggleRodCharge">⚡ Stab umschalten</button>
            <button class="sim-btn-action" id="btnGroundElectroscope">👉 Erden</button>
          </div>
        </div>
        <div class="sim-canvas-wrapper"><canvas id="electroscopeCanvas" width="560" height="300"></canvas></div>
        <div class="sim-controls-grid">
          <div class="sim-control-group">
            <div class="sim-label-row"><span>Stab-Abstand:</span><span id="valRodDist" style="color:#38bdf8;">12.0 cm</span></div>
            <input type="range" id="rodDistSlider" class="sim-slider" min="0" max="15" step="0.2" value="12">
          </div>
        </div>
        <div class="sim-result-box" id="electroscopeResultBox">Lade Simulator...</div>
      </div>
    `;
  } else if (simType === 'schaltungen') {
    html += `
      <div class="sim-container" style="margin-top: 1.5rem;">
        <div class="sim-header">
          <div class="sim-title"><span>💡</span><span>Kondensator-Entladekurve</span></div>
          <button class="sim-btn-action" id="btnCircuitDischarge">💡 Entladen</button>
        </div>
        <div class="sim-canvas-wrapper"><canvas id="circuitCanvas" width="560" height="280"></canvas></div>
        <div class="sim-controls-grid">
          <div class="sim-control-group">
            <div class="sim-label-row"><span>Kapazität C:</span><span id="valCircuitC" style="color:#38bdf8;">470 µF</span></div>
            <input type="range" id="circuitSliderC" class="sim-slider" min="100" max="1000" step="50" value="470">
          </div>
          <div class="sim-control-group">
            <div class="sim-label-row"><span>Widerstand R:</span><span id="valCircuitR" style="color:#facc15;">200 &Omega;</span></div>
            <input type="range" id="circuitSliderR" class="sim-slider" min="50" max="500" step="25" value="200">
          </div>
        </div>
        <div class="sim-result-box" id="circuitResultBox">Lade Simulator...</div>
      </div>
    `;
  } else if (simType === 'faraday') {
    html += `
      <div class="sim-container" style="margin-top: 1.5rem;">
        <div class="sim-header">
          <div class="sim-title"><span>🛡️</span><span>Interaktiver Faradayscher Käfig &amp; Blitzschutz-Simulator</span></div>
          <div style="display:flex; gap:0.5rem; flex-wrap:wrap;">
            <button class="sim-btn-action" id="btnFaradayToggleField" style="background:#0284c7;">⚡ Feld: AN</button>
            <button class="sim-btn-action" id="btnFaradayLightning" style="background:#d97706;">🌩️ Blitz abfeuern!</button>
          </div>
        </div>
        <div class="sim-canvas-wrapper"><canvas id="faradayCanvas" width="560" height="280"></canvas></div>
        <div class="sim-controls-grid">
          <div class="sim-control-group">
            <button class="sim-btn-action" id="btnFaradaySlowMo" style="width:100%; background:var(--bg-subtle); color:var(--text-primary); border:1px solid var(--border-subtle);">⏱️ Zeitlupe: AUS</button>
          </div>
          <div class="sim-control-group">
            <button class="sim-btn-action" id="btnFaradayReset" style="width:100%; background:var(--bg-subtle); color:var(--text-primary); border:1px solid var(--border-subtle);">🔄 Zurücksetzen</button>
          </div>
        </div>
        <div class="sim-result-box" id="faradayResultBox">🛡️ <strong>Gleichgewicht:</strong> Äußeres Feld wird im Innenraum zu 100% kompensiert &bull; E_ges = 0 V/m</div>
      </div>
    `;
  }

  // 2. ÜBUNGSAUFGABEN MIT LÖSUNG
  html += `
    <div style="margin-top: 1.8rem;">
      <h3 style="font-size: 1.15rem; font-weight: 800; color: var(--text-primary); margin: 0 0 0.8rem 0; display: flex; align-items: center; gap: 0.5rem;">
        <span>🎯</span><span>2. Typische Klausur-Aufgaben zum Üben (${skill.tasks ? skill.tasks.length : 0})</span>
      </h3>
  `;

  (skill.tasks || []).forEach((t, idx) => {
    html += `
      <div class="single-task-card" style="margin-bottom: 1.2rem; background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 1.2rem; box-shadow: var(--card-shadow);">
        <div class="task-prompt-box" style="background: var(--bg-subtle); padding: 1rem; border-radius: 8px; margin-bottom: 0.8rem; font-size: 0.88rem; line-height: 1.55;">
          <strong style="color: var(--text-primary); font-size: 0.95rem;">${t.title || 'Aufgabe ' + (idx + 1)}:</strong><br>
          ${t.prompt}
        </div>
        ${t.given || t.sought ? `
          <div class="task-values-grid" style="display: flex; gap: 0.6rem; flex-wrap: wrap; margin-bottom: 0.8rem;">
            ${t.given ? `<span class="task-val-badge" style="background: var(--bg-subtle); padding: 0.25rem 0.6rem; border-radius: 6px; font-size: 0.78rem;">Gegeben: <strong>${t.given}</strong></span>` : ''}
            ${t.sought ? `<span class="task-val-badge" style="background: var(--bg-subtle); padding: 0.25rem 0.6rem; border-radius: 6px; font-size: 0.78rem;">Gesucht: <strong>${t.sought}</strong></span>` : ''}
          </div>
        ` : ''}
        <button class="btn-reveal-card" onclick="toggleSolution('solSkill_${skill.id}_${idx}', this)">
          👁️ Lösungsschritte aufdecken
        </button>
        <div class="task-solution-container" id="solSkill_${skill.id}_${idx}">
          <div style="font-weight: 700; color: #10b981; margin-bottom: 0.4rem;">✓ Musterlösung:</div>
          <div style="line-height: 1.55; font-size: 0.88rem;">${t.solution}</div>
        </div>
      </div>
    `;
  });

  html += `</div>`;

  // 3. EIGENE ERKLÄRUNG / MERKZETTEL PRO THEMA
  html += `
    <div class="skill-notes-box" style="margin-top: 1.8rem; background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); padding: 1.4rem; box-shadow: var(--card-shadow);">
      <div class="skill-notes-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.6rem;">
        <h3 style="font-size: 1.1rem; font-weight: 800; color: var(--text-primary); margin: 0; display: flex; align-items: center; gap: 0.5rem;">
          <span>📝</span><span>3. Deine eigene Erklärung / Notizen zu diesem Thema</span>
        </h3>
        <span id="statusNote_${skill.id}" style="font-size: 0.76rem; color: #10b981; font-weight: 700;">Gespeichert</span>
      </div>
      <p style="font-size: 0.82rem; color: var(--text-secondary); margin-bottom: 0.8rem;">
        Schreibe hier in deinen eigenen Worten, wie du dieses Thema verstanden hast, oder notiere dir wichtige Merksätze. Speichert automatisch!
      </p>
      <textarea class="skill-notes-textarea" id="noteInput_${skill.id}" 
                placeholder="Schreibe hier deine eigene Zusammenfassung, Eselsbrücken oder Merksätze zu '${skill.title}'..."
                oninput="saveSkillNote('${skill.id}', this.value)" style="width: 100%; min-height: 110px; border: 1px solid var(--border-medium); border-radius: 8px; padding: 0.8rem; font-family: inherit; font-size: 0.88rem; background: var(--bg-subtle); color: var(--text-primary); box-sizing: border-box; resize: vertical;">${savedNote}</textarea>
      <div style="margin-top: 0.9rem; padding-top: 0.8rem; border-top: 1px dashed var(--border-subtle); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem;">
        <span style="font-size: 0.82rem; color: var(--text-muted);">Möchtest du eine Mitschrift, ein Tafelbild-Foto oder ein PDF hierzu hochladen?</span>
        <button class="btn-upload-nav" onclick="openUploadModal('physik', 'mitschrift')">
          <span>➕</span><span>Dokument / Foto hochladen</span>
        </button>
      </div>
    </div>
  </div>
  `;

  gridEl.innerHTML = html;

  // Trigger simulations & KaTeX
  setTimeout(() => {
    if (simType === 'coulomb' && typeof CoulombSim !== 'undefined') CoulombSim.init();
    if (simType === 'efeld' && typeof EFieldSim !== 'undefined') EFieldSim.init();
    if (simType === 'elektrostatik' && typeof ElectroscopeSim !== 'undefined') ElectroscopeSim.init();
    if (simType === 'schaltungen' && typeof CircuitSim !== 'undefined') CircuitSim.init();
    if (simType === 'faraday' && typeof FaradaySim !== 'undefined') FaradaySim.init();
    renderPhysikKaTeX();
  }, 60);
}

// --- 13. STATE CONTROLLER FUNCTIONS ---

function switchPhysikMode(mode) {
  CURRENT_PHYSIK_MODE = mode;
  CURRENT_PHYSIK_SKILL = null;
  CURRENT_PHYSIK_FOLDER = null;
  renderPhysikPortal();
}

function openPhysikFolder(folderId) {
  CURRENT_PHYSIK_MODE = 'ordner';
  CURRENT_PHYSIK_FOLDER = folderId;
  CURRENT_PHYSIK_SKILL = null;
  renderPhysikPortal();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function closePhysikFolder() {
  CURRENT_PHYSIK_FOLDER = null;
  CURRENT_PHYSIK_SKILL = null;
  renderPhysikPortal();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function openPhysikSkill(skillId) {
  CURRENT_PHYSIK_SKILL = skillId;
  renderPhysikPortal();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function closePhysikSkill() {
  CURRENT_PHYSIK_SKILL = null;
  renderPhysikPortal();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function filterIservPool(cat) {
  CURRENT_ISERV_CATEGORY = cat;
  renderPhysikPortal();
}

function handlePhysikSearch(query) {
  const q = query.trim().toLowerCase();
  const skillCards = document.querySelectorAll('.physik-skill-card');
  const folderCards = document.querySelectorAll('.physics-folder-card');

  skillCards.forEach(c => {
    if (!q) {
      c.style.display = 'flex';
      return;
    }
    const t = c.getAttribute('data-title') || '';
    const d = c.getAttribute('data-desc') || '';
    const tag = c.getAttribute('data-tag') || '';
    if (t.includes(q) || d.includes(q) || tag.includes(q)) {
      c.style.display = 'flex';
    } else {
      c.style.display = 'none';
    }
  });

  folderCards.forEach(c => {
    if (!q) {
      c.style.display = 'flex';
      return;
    }
    const text = c.innerText.toLowerCase();
    if (text.includes(q)) {
      c.style.display = 'flex';
    } else {
      c.style.display = 'none';
    }
  });
}

function saveSkillNote(skillId, val) {
  const key = 'tonda_skill_note_' + skillId;
  localStorage.setItem(key, val);

  const statusEl = document.getElementById('statusNote_' + skillId);
  if (statusEl) {
    statusEl.textContent = 'Gespeichert um ' + new Date().toLocaleTimeString();
  }
}

function toggleSolution(solId, btnEl) {
  const sol = document.getElementById(solId);
  if (!sol) return;

  const isVisible = sol.classList.contains('visible');
  sol.classList.toggle('visible', !isVisible);

  if (btnEl) {
    btnEl.innerHTML = isVisible ? '👁️ Lösungsschritte aufdecken' : '🙈 Lösung verbergen';
  }

  if (!isVisible) {
    renderPhysikKaTeX();
  }
}

function switchTopicSubTab(topicId, tabName) {
  const container = document.getElementById('topic-' + topicId);
  if (!container) return;

  container.querySelectorAll('.topic-segment-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tabName);
  });

  container.querySelectorAll('.topic-tab-pane').forEach(pane => {
    pane.classList.toggle('active-pane', pane.dataset.pane === tabName);
  });

  if (tabName === 'sim') {
    setTimeout(() => {
      if (topicId.includes('coulomb') && typeof CoulombSim !== 'undefined') CoulombSim.draw();
      if (topicId.includes('efeld') && typeof EFieldSim !== 'undefined') EFieldSim.draw();
      if (topicId.includes('elektrostatik') && typeof ElectroscopeSim !== 'undefined') ElectroscopeSim.draw();
      if (topicId.includes('schaltungen') && typeof CircuitSim !== 'undefined') CircuitSim.draw();
      if (topicId.includes('faraday') && typeof FaradaySim !== 'undefined') FaradaySim.draw();
    }, 50);
  }

  renderPhysikKaTeX();
}

function showQuizTask(containerId, taskIdx) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.querySelectorAll('.quiz-pill-button').forEach((btn, idx) => {
    btn.classList.toggle('active', idx === taskIdx);
  });

  container.querySelectorAll('.single-task-card').forEach((card, idx) => {
    card.style.display = (idx === taskIdx) ? 'block' : 'none';
  });

  renderPhysikKaTeX();
}

// --- 14. KATEX FORMULA RENDERER & SIMULATION LOADER ---

function renderPhysikKaTeX() {
  if (typeof katex === 'undefined') return;
  document.querySelectorAll('.katex-render').forEach(el => {
    let latex = el.getAttribute('data-latex');
    const isDisplay = el.getAttribute('data-display') !== 'false';
    if (latex) {
      try {
        latex = latex
          .replace(/\x0c/g, '\\f')
          .replace(/\t/g, '\\t')
          .replace(/\r/g, '\\r')
          .replace(/\x08/g, '\\b')
          .replace(/\v/g, '\\v');
        katex.render(latex, el, { displayMode: isDisplay, throwOnError: false });
      } catch (e) {
        console.log('[KaTeX Render error]:', e);
      }
    }
  });
}

function initPhysikSimulations() {
  setTimeout(() => {
    if (typeof CoulombSim !== 'undefined') CoulombSim.init();
    if (typeof EFieldSim !== 'undefined') EFieldSim.init();
    if (typeof ElectroscopeSim !== 'undefined') ElectroscopeSim.init();
    if (typeof CircuitSim !== 'undefined') CircuitSim.init();
    if (typeof FaradaySim !== 'undefined') FaradaySim.init();
    renderPhysikKaTeX();
  }, 80);
}

window.addEventListener('DOMContentLoaded', () => {
  initPhysikSimulations();
});
