// --- 4. SKILLS FÜR ORDNER 3: ELEKTRISCHES FELD & COULOMB ---
const SKILLS_FOLDER_3 = [
  {
    id: 'efeld-berechnen',
    folderId: 'ordner-feld-coulomb',
    num: '08',
    icon: '⚡',
    color: '#06b6d4',
    tag: 'Meds.pdf S. 11, 15',
    title: 'Elektrische Feldstärke & Coulombsches Gesetz (S. 11, 15)',
    desc: 'Definition E = F/q, Coulombsches Gesetz FC = 1/(4πε₀) • Q₁Q₂/r², Plattenkondensator E = U/d, Buch S. 111 A7 & AB 10 Aufgaben 1 & 2.',
    visualHtml: `
      <div class="formula-hero-card" style="border-left: 6px solid #06b6d4;">
        <span class="formula-hero-badge" style="background: rgba(6, 182, 212, 0.15); color: #06b6d4;">
          ⚡ DIE ZENTRALEN FORMELN DES ELEKTRISCHEN FELDES
        </span>
        <div class="formula-math-display">
          <span class="katex-render" data-display="true" data-latex="E = \\frac{F_{\\text{el}}}{q} \\quad \\left[\\frac{\\text{N}}{\\text{C}} = \\frac{\\text{V}}{\\text{m}}\\right] \\qquad F_C = \\frac{1}{4\\pi\\varepsilon_0\\varepsilon_r} \\cdot \\frac{Q_1 \\cdot Q_2}{r^2}"></span>
        </div>

        <div class="variable-pills-grid">
          <div class="var-pill-card">
            <div class="var-sym-badge" style="background: rgba(6, 182, 212, 0.15); color: #06b6d4;">E</div>
            <div class="var-info-wrap">
              <div class="var-info-title">Elektrische Feldstärke</div>
              <div class="var-info-unit">Einheit: <strong>V/m</strong> oder <strong>N/C</strong></div>
            </div>
          </div>
          <div class="var-pill-card">
            <div class="var-sym-badge" style="background: rgba(56, 189, 248, 0.15); color: #0284c7;">F<sub>C</sub></div>
            <div class="var-info-wrap">
              <div class="var-info-title">Coulomb-Kraft</div>
              <div class="var-info-unit">Einheit: <strong>Newton (N)</strong></div>
            </div>
          </div>
          <div class="var-pill-card">
            <div class="var-sym-badge" style="background: rgba(245, 158, 11, 0.15); color: #d97706;">ε₀</div>
            <div class="var-info-wrap">
              <div class="var-info-title">Elektrische Feldkonstante</div>
              <div class="var-info-unit"><strong>8,854 • 10⁻¹² As/(V•m)</strong></div>
            </div>
          </div>
          <div class="var-pill-card">
            <div class="var-sym-badge" style="background: rgba(16, 185, 129, 0.15); color: #059669;">r</div>
            <div class="var-info-wrap">
              <div class="var-info-title">Abstand der Punktladungen</div>
              <div class="var-info-unit">Einheit: <strong>Meter (m)</strong></div>
            </div>
          </div>
        </div>
      </div>
    `,
    summary: 'Die Feldstärke E ist der Quotient aus Kraft und Probeladung. Das Coulombsche Gesetz beschreibt die Kraftwirkung zwischen zwei Punktladungen mit 1/r².',
    takeaways: [
      'E = F / q gilt universell in jedem Feld.',
      'E = U / d gilt ausschließlich im homogenen Plattenkondensator.',
      'Coulomb-Konstante 1/(4πε₀) ≈ 8,988 • 10⁹ N•m²/C².'
    ],
    tasks: [
      {
        title: 'Aufgabe aus AB 10 (S. 15 Nr. 1): Ladungsbestimmung',
        prompt: `
          Zwei kleine Körper (Punktladungen) üben in einem Abstand von r = 10,0 cm eine Coulomb-Kraft von F = 300 N aufeinander aus. Einer der Körper trägt eine Ladung von Q₁ = 5,00 • 10⁻⁵ C. Berechne den Betrag der anderen Ladung Q₂.
        `,
        solution: `
          <strong>Gegeben:</strong><br>
          <span class="katex-render" data-display="false" data-latex="r = 10,0\\,\\text{cm} = 0,10\\,\\text{m}">r = 0,10 m</span><br>
          <span class="katex-render" data-display="false" data-latex="F = 300\\,\\text{N}">F = 300 N</span><br>
          <span class="katex-render" data-display="false" data-latex="Q_1 = 5,00 \\cdot 10^{-5}\\,\\text{C}">Q1 = 5,00 • 10⁻⁵ C</span><br>
          <span class="katex-render" data-display="false" data-latex="\\varepsilon_0 = 8,854 \\cdot 10^{-12}\\,\\frac{\\text{A}\\cdot\\text{s}}{\\text{V}\\cdot\\text{m}}">ε0</span>, <span class="katex-render" data-display="false" data-latex="\\varepsilon_r = 1">εr = 1</span><br><br>

          <strong>Formel &amp; Umstellung:</strong><br>
          <div class="katex-render" data-display="true" data-latex="F = \\frac{1}{4\\pi\\varepsilon_0} \\cdot \\frac{Q_1 \\cdot Q_2}{r^2} \\iff Q_2 = \\frac{F \\cdot 4\\pi\\varepsilon_0 \\cdot r^2}{Q_1}"></div><br>

          <strong>Einsetzen:</strong><br>
          <div class="katex-render" data-display="true" data-latex="Q_2 = \\frac{300\\,\\text{N} \\cdot 4\\pi \\cdot 8,854 \\cdot 10^{-12}\\,\\frac{\\text{A}\\cdot\\text{s}}{\\text{V}\\cdot\\text{m}} \\cdot (0,10\\,\\text{m})^2}{5,00 \\cdot 10^{-5}\\,\\text{C}} = \\frac{3,338 \\cdot 10^{-10}}{5,00 \\cdot 10^{-5}} = 6,68 \\cdot 10^{-7}\\,\\text{C} = 0,668\\,\\mu\\text{C}"></div><br>
          <strong>Ergebnis:</strong> Die zweite Ladung beträgt <span class="katex-render" data-display="false" data-latex="Q_2 = 6,68 \\cdot 10^{-7}\\,\\text{C}">Q2 = 0,668 µC</span>.
        `
      },
      {
        title: 'Aufgabe aus Buch S. 111 A7 (S. 22/23): Feldstärke am Punkt P',
        prompt: `
          Auf eine Probeladung Q₁ = 3,5 • 10⁻⁸ C wirkt am Punkt P eines Feldes eine Kraft von F₁ = 2,1 • 10⁻⁵ N.<br>
          a) Berechne die elektrische Feldstärke E am Punkt P.<br>
          b) Welche Kraft F₂ erfährt ein Probekörper mit der Ladung Q₂ = 5,2 • 10⁻⁹ C an diesem Punkt?
        `,
        solution: `
          <strong>a) Elektrische Feldstärke E:</strong><br>
          <div class="katex-render" data-display="true" data-latex="E = \\frac{F_1}{Q_1} = \\frac{2,1 \\cdot 10^{-5}\\,\\text{N}}{3,5 \\cdot 10^{-8}\\,\\text{C}} = 600\\,\\frac{\\text{N}}{\\text{C}} = 600\\,\\frac{\\text{V}}{\\text{m}}"></div><br>

          <strong>b) Kraft auf den zweiten Probekörper:</strong><br>
          <div class="katex-render" data-display="true" data-latex="F_2 = E \\cdot Q_2 = 600\\,\\frac{\\text{N}}{\\text{C}} \\cdot 5,2 \\cdot 10^{-9}\\,\\text{C} = 3,12 \\cdot 10^{-6}\\,\\text{N} = 3,12\\,\\mu\\text{N}"></div>
        `
      }
    ]
  },

  {
    id: 'feldlinien-aequipotential',
    folderId: 'ordner-feld-coulomb',
    num: '09',
    icon: '🧭',
    color: '#06b6d4',
    tag: 'Meds.pdf S. 7, 10',
    title: 'Feldlinien & Äquipotentiallinien (mit Beweis!) (S. 7, 10)',
    desc: 'Die 7 fundamentalen Eigenschaften der Feldlinien, der exakte Klausur-Widerspruchsbeweis (warum kein Schnittpunkt) und Äquipotentiallinien (ΔW = 0).',
    visualHtml: `
      <div class="formula-hero-card" style="border-left: 6px solid #06b6d4;">
        <span class="formula-hero-badge" style="background: rgba(6, 182, 212, 0.15); color: #06b6d4;">
          🧭 DIE 7 EIGENSCHAFTEN VON FELDLINIEN (MEDS.PDF S. 7)
        </span>
        <div style="margin: 0.8rem 0; font-size: 0.86rem; line-height: 1.5; color: var(--text-primary); background: var(--bg-subtle); padding: 1rem; border-radius: 8px;">
          1. Verlaufen stets vom <strong>Pluspol zum Minuspol</strong> (Richtung der Kraft auf positive Ladungen).<br>
          2. Eine <strong>größere Feldliniendichte</strong> veranschaulicht ein stärkeres elektrisches Feld.<br>
          3. Die <strong>Tangente</strong> an eine Feldlinie gibt in jedem Punkt die Kraftrichtung an.<br>
          4. Feldlinien stehen <strong>immer senkrecht auf Metalloberflächen</strong> (im elektrostatischen Gleichgewicht).<br>
          5. Feldlinien stehen <strong>immer senkrecht auf Äquipotentiallinien</strong>.<br>
          6. Feldlinien <strong>kreuzen / schneiden sich niemals</strong> (siehe Beweis unten!).<br>
          7. Feldlinien sind <strong>keine realen Fäden</strong>, sondern ein anschauliches mathematisches Modell zur Beschreibung des realen Feldes.
        </div>

        <div style="margin-top: 1rem; padding: 1rem; background: rgba(6, 182, 212, 0.08); border-left: 4px solid #06b6d4; border-radius: 6px;">
          <h4 style="color:#06b6d4; margin:0 0 0.5rem 0;">⭐ Der Widerspruchsbeweis: Warum schneiden sich Feldlinien nie? (S. 7)</h4>
          <div style="font-size:0.86rem; line-height:1.55; color:var(--text-secondary);">
            <strong>1. Behauptung:</strong> Zwei elektrische Feldlinien schneiden sich niemals.<br>
            <strong>2. Annahme zum Widerspruch:</strong> Angenommen, zwei Feldlinien würden sich in einem Punkt <span class="katex-render" data-display="false" data-latex="P">P</span> schneiden.<br>
            <strong>3. Folgerung:</strong> Dann gäbe es im Punkt <span class="katex-render" data-display="false" data-latex="P">P</span> zwei verschiedene Tangenten. Auf eine dort platzierte positive Probeladung <span class="katex-render" data-display="false" data-latex="q">q</span> müssten somit <strong>gleichzeitig zwei Kräfte in unterschiedliche Richtungen</strong> wirken.<br>
            <strong>4. Widerspruch:</strong> Die Gesamtkraft <span class="katex-render" data-display="false" data-latex="\\vec{F}_{\\text{ges}} = q \\cdot \\vec{E}">F = q • E</span> an einem festen Ort im Raum ist jedoch ein <em>eindeutiger Vektor</em>. Eine Ladung kann nicht gleichzeitig in zwei verschiedene Richtungen beschleunigt werden.<br>
            <strong>5. Schlussfolgerung:</strong> Die Annahme ist falsch. Feldlinien können sich niemals schneiden! &squ;
          </div>
        </div>
      </div>
    `,
    summary: 'Feldlinien veranschaulichen die Kraftrichtung auf positive Ladungen. Äquipotentiallinien stehen senkrecht auf ihnen; entlang einer Äquipotentiallinie ist die Verschiebearbeit ΔW = 0.',
    takeaways: [
      'Widerspruchsbeweis: Kraftvektor an jedem Raumpunkt ist eindeutig, daher keine Schnittpunkte.',
      'Äquipotentiallinien haben konstantes Potential -> ΔW = q • Δφ = 0.',
      'Feldlinien treffen immer senkrecht auf Leiteroberflächen.'
    ],
    tasks: [
      {
        title: 'Verständnisaufgabe: Arbeit im Potentialfeld (S. 10)',
        prompt: `
          Eine Ladung q = 5,0 µC wird im Feld eines Plattenkondensators verschoben:<br>
          a) Entlang einer Äquipotentiallinie um die Strecke s = 15 cm.<br>
          b) Von einer Äquipotentiallinie mit φ₁ = 400 V zu einer anderen mit φ₂ = 150 V.<br>
          Berechne jeweils die verrichtete Arbeit W.
        `,
        solution: `
          <strong>a) Verschiebung entlang einer Äquipotentiallinie:</strong><br>
          Da jeder Punkt auf der Äquipotentiallinie dasselbe Potential hat, ist die Potentialdifferenz <span class="katex-render" data-display="false" data-latex="\\Delta\\varphi = 0\\,\\text{V}">Δφ = 0</span>.<br>
          <div class="katex-render" data-display="true" data-latex="W = q \\cdot \\Delta\\varphi = 5,0\\,\\mu\\text{C} \\cdot 0\\,\\text{V} = 0\\,\\text{J}"></div>
          <em>Ergebnis:</em> Es wird keine Arbeit verrichtet (<span class="katex-render" data-display="false" data-latex="W = 0">W = 0</span>), da die Bewegung senkrecht zu den Feldlinien (senkrecht zur elektrischen Kraft) erfolgt.<br><br>

          <strong>b) Verschiebung zwischen zwei Potentialen:</strong><br>
          <div class="katex-render" data-display="true" data-latex="\\Delta\\varphi = \\varphi_1 - \\varphi_2 = 400\\,\\text{V} - 150\\,\\text{V} = 250\\,\\text{V}"></div>
          <div class="katex-render" data-display="true" data-latex="W = q \\cdot \\Delta\\varphi = 5,0 \\cdot 10^{-6}\\,\\text{C} \\cdot 250\\,\\text{V} = 1,25 \\cdot 10^{-3}\\,\\text{J} = 1,25\\,\\text{mJ}"></div>
        `
      }
    ]
  },

  {
    id: 'flaechenladungsdichte',
    folderId: 'ordner-feld-coulomb',
    num: '10',
    icon: '📐',
    color: '#06b6d4',
    tag: 'Buch S. 111 A13',
    title: 'Flächenladungsdichte σ = Q/A & Plattenkondensator (S. 26/27)',
    desc: 'Zusammenhang σ = Q/A = ε₀εᵣE. Vollständig durchgerechnete Buchaufgabe S. 111 A13 aus Meds.pdf.',
    visualHtml: `
      <div class="formula-hero-card" style="border-left: 6px solid #06b6d4;">
        <span class="formula-hero-badge" style="background: rgba(6, 182, 212, 0.15); color: #06b6d4;">
          📐 FLÄCHENLADUNGSDICHTE &amp; HOMOGENES FELD (MEDS.PDF S. 26/27)
        </span>
        <div class="formula-math-display">
          <span class="katex-render" data-display="true" data-latex="\\sigma = \\frac{Q}{A} = \\varepsilon_0 \\cdot \\varepsilon_r \\cdot E \\iff E = \\frac{\\sigma}{\\varepsilon_0 \\cdot \\varepsilon_r} = \\frac{Q}{\\varepsilon_0 \\cdot \\varepsilon_r \\cdot A}"></span>
        </div>
        <div style="font-size:0.86rem; color:var(--text-secondary); line-height:1.5; margin-top:0.8rem;">
          • <span class="katex-render" data-display="false" data-latex="\\sigma">σ</span> (Sigma): Flächenladungsdichte in <span class="katex-render" data-display="false" data-latex="\\left[\\frac{\\text{C}}{\\text{m}^2} = \\frac{\\text{A}\\cdot\\text{s}}{\\text{m}^2}\\right]">C/m²</span>.<br>
          • <span class="katex-render" data-display="false" data-latex="A">A</span>: Fläche der Kondensatorplatte in <span class="katex-render" data-display="false" data-latex="\\text{m}^2">m²</span>.<br>
          • <span class="katex-render" data-display="false" data-latex="\\varepsilon_0 = 8,854 \\cdot 10^{-12}\\,\\frac{\\text{A}\\cdot\\text{s}}{\\text{V}\\cdot\\text{m}}">ε0</span>: Elektrische Feldkonstante.
        </div>
      </div>
    `,
    summary: 'Die Flächenladungsdichte σ gibt die Ladungsmenge pro Quadratmeter an und ist direkt proportional zur elektrischen Feldstärke E.',
    takeaways: [
      'σ = Q / A [C / m²].',
      'E = σ / (ε₀ • εᵣ) im homogenen Kondensatorfeld.',
      'Flächenumrechnung: 1 cm² = 10⁻⁴ m²!'
    ],
    tasks: [
      {
        title: 'Originalaufgabe Buch S. 111 A13 (S. 26/27)',
        prompt: `
          Ein Plattenkondensator hat Platten mit der Fläche A = 600 cm². Die Ladung auf den Platten beträgt Q = 3,0 • 10⁻⁸ C.<br>
          a) Berechne die Flächenladungsdichte σ auf den Platten.<br>
          b) Berechne die elektrische Feldstärke E zwischen den Platten (Luft: εᵣ = 1).
        `,
        solution: `
          <strong>Gegeben:</strong><br>
          <span class="katex-render" data-display="false" data-latex="A = 600\\,\\text{cm}^2 = 600 \\cdot 10^{-4}\\,\\text{m}^2 = 0,060\\,\\text{m}^2">A = 0,06 m²</span><br>
          <span class="katex-render" data-display="false" data-latex="Q = 3,0 \\cdot 10^{-8}\\,\\text{C}">Q = 3,0 • 10⁻⁸ C</span><br>
          <span class="katex-render" data-display="false" data-latex="\\varepsilon_0 = 8,854 \\cdot 10^{-12}\\,\\frac{\\text{A}\\cdot\\text{s}}{\\text{V}\\cdot\\text{m}}">ε0</span>, <span class="katex-render" data-display="false" data-latex="\\varepsilon_r = 1">εr = 1</span><br><br>

          <strong>a) Flächenladungsdichte σ:</strong><br>
          <div class="katex-render" data-display="true" data-latex="\\sigma = \\frac{Q}{A} = \\frac{3,0 \\cdot 10^{-8}\\,\\text{C}}{0,060\\,\\text{m}^2} = 5,0 \\cdot 10^{-7}\\,\\frac{\\text{C}}{\\text{m}^2} = 0,50\\,\\frac{\\mu\\text{C}}{\\text{m}^2}"></div><br>

          <strong>b) Elektrische Feldstärke E:</strong><br>
          <div class="katex-render" data-display="true" data-latex="E = \\frac{\\sigma}{\\varepsilon_0} = \\frac{5,0 \\cdot 10^{-7}\\,\\frac{\\text{A}\\cdot\\text{s}}{\\text{m}^2}}{8,854 \\cdot 10^{-12}\\,\\frac{\\text{A}\\cdot\\text{s}}{\\text{V}\\cdot\\text{m}}} \\approx 56\\,471\\,\\frac{\\text{V}}{\\text{m}} \\approx 56,5\\,\\frac{\\text{kV}}{\\text{m}}"></div><br>
          <em>Hinweis zur Mitschrift S. 27:</em> In der handschriftlichen Mitschrift stand 565... durch Rundung & Kommastellen &ndash; die exakte physikalische Feldstärke beträgt 56,5 kV/m!
        `
      }
    ]
  }
];
