// --- 5. SKILLS FÜR ORDNER 4 & 5: MECHANIK IM E-FELD & KONDENSATOR ---
const SKILLS_FOLDERS_4_5 = [
  {
    id: 'kugel-auslenkung',
    folderId: 'ordner-kraefte-mechanik',
    num: '11',
    icon: '🎯',
    color: '#f59e0b',
    tag: 'Klausur-Klassiker S. 28, 30',
    title: 'Auslenkung einer geladenen Kugel im E-Feld (Fadenpendel) (S. 28, 30)',
    desc: 'Kräftegleichgewicht am Fadenpendel: tan α = Fel / Fg. Geometrie sin α = s/l, Kleinwinkelnäherung tan α ≈ s/l und korrigierte Rechnung der Mitschrift S. 28.',
    visualHtml: `
      <div class="formula-hero-card" style="border-left: 6px solid #f59e0b;">
        <span class="formula-hero-badge" style="background: rgba(245, 158, 11, 0.15); color: #d97706;">
          🎯 DAS KRÄFTEPARALLELOGRAMM AM FADENPENDEL (MEDS.PDF S. 28)
        </span>
        <div class="formula-math-display">
          <span class="katex-render" data-display="true" data-latex="\tan\alpha = \frac{F_{\text{el}}}{F_g} = \frac{q \cdot E}{m \cdot g} \iff F_{\text{el}} = m \cdot g \cdot \tan\alpha"></span>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 1rem;">
          <div style="background: var(--bg-subtle); padding: 0.9rem; border-radius: 6px; font-size: 0.85rem; line-height: 1.5;">
            <strong>Kräftegleichgewicht:</strong><br>
            Auf die ausgelenkte Kugel der Masse <span class="katex-render" data-display="false" data-latex="m">m</span> wirken 3 Kräfte:<br>
            1. <strong>Gewichtskraft:</strong> <span class="katex-render" data-display="false" data-latex="F_g = m \cdot g">Fg = m • g</span> (senkrecht nach unten).<br>
            2. <strong>Elektrische Feldkraft:</strong> <span class="katex-render" data-display="false" data-latex="F_{\text{el}} = q \cdot E">Fel = q • E</span> (horizontal zur Kondensatorplatte).<br>
            3. <strong>Fadenkraft <span class="katex-render" data-display="false" data-latex="F_S">Fs</span>:</strong> entlang des Fadens.<br>
            Im Dreieck der Kräfte gilt streng trigonometrisch:<br>
            <span class="katex-render" data-display="false" data-latex="\tan\alpha = \frac{\text{Gegenkathete}}{\text{Ankathete}} = \frac{F_{\text{el}}}{F_g}">tan α = Fel / Fg</span>.
          </div>
          <div style="background: var(--bg-subtle); padding: 0.9rem; border-radius: 6px; font-size: 0.85rem; line-height: 1.5;">
            <strong>Geometrie &amp; Kleinwinkelnäherung:</strong><br>
            Für das Fadenpendel mit Fadenlänge <span class="katex-render" data-display="false" data-latex="l">l</span> und Auslenkung <span class="katex-render" data-display="false" data-latex="s">s</span> gilt:<br>
            <div class="katex-render" data-display="true" data-latex="\sin\alpha = \frac{s}{l}"></div>
            Für kleine Winkel (<span class="katex-render" data-display="false" data-latex="\alpha \le 10^\circ">α ≤ 10°</span>) gilt die Näherung:<br>
            <div class="katex-render" data-display="true" data-latex="\tan\alpha \approx \sin\alpha \approx \frac{s}{l} \implies E \approx \frac{m \cdot g \cdot s}{q \cdot l}"></div>
          </div>
        </div>
      </div>
    `,
    summary: 'Aus der horizontalen Auslenkung s einer Kugel am Faden l lässt sich die elektrische Feldstärke über tan α = Fel/Fg exakt bestimmen.',
    takeaways: [
      'tan α = Fel / Fg = (q • E) / (m • g).',
      'Kleinwinkelnäherung für α < 10°: tan α ≈ sin α = s / l.',
      'Feldstärke: E = (m • g • tan α) / q.'
    ],
    tasks: [
      {
        title: 'Aufgabe 1: Korrektur der Unterrichtsmitschrift S. 28',
        prompt: `
          Eine geladene Kugel (m = 5,0 g, q = 2,0 nC) hängt an einem Faden der Länge l = 1,0 m in einem Plattenkondensator. Durch das elektrische Feld wird die Kugel um s = 4,0 cm horizontal ausgelenkt.<br>
          Berechne die elektrische Feldstärke E zwischen den Platten!
        `,
        solution: `
          <strong>Gegeben:</strong><br>
          <span class="katex-render" data-display="false" data-latex="l = 1,0\,\text{m}">l = 1,0 m</span><br>
          <span class="katex-render" data-display="false" data-latex="s = 4,0\,\text{cm} = 0,040\,\text{m}">s = 0,040 m</span><br>
          <span class="katex-render" data-display="false" data-latex="m = 5,0\,\text{g} = 0,0050\,\text{kg}">m = 0,0050 kg</span><br>
          <span class="katex-render" data-display="false" data-latex="q = 2,0\,\text{nC} = 2,0 \cdot 10^{-9}\,\text{C}">q = 2,0 • 10⁻⁹ C</span><br>
          <span class="katex-render" data-display="false" data-latex="g = 9,81\,\frac{\text{m}}{\text{s}^2}">g = 9,81 m/s²</span><br><br>

          <strong>Schritt 1: Auslenkwinkel α berechnen</strong><br>
          <div class="katex-render" data-display="true" data-latex="\sin\alpha = \frac{s}{l} = \frac{0,040\,\text{m}}{1,0\,\text{m}} = 0,040 \implies \alpha = \arcsin(0,040) \approx 2,292^\circ"></div><br>

          <strong>Schritt 2: Gewichtskraft Fg und Tangens</strong><br>
          <div class="katex-render" data-display="true" data-latex="F_g = m \cdot g = 0,0050\,\text{kg} \cdot 9,81\,\frac{\text{m}}{\text{s}^2} = 0,04905\,\text{N} = 49,05\,\text{mN}"></div>
          <div class="katex-render" data-display="true" data-latex="\tan(2,292^\circ) \approx 0,04003"></div><br>

          <strong>Schritt 3: Elektrische Kraft Fel</strong><br>
          <div class="katex-render" data-display="true" data-latex="F_{\text{el}} = F_g \cdot \tan\alpha = 0,04905\,\text{N} \cdot 0,04003 = 1,963 \cdot 10^{-3}\,\text{N} \approx 1,96\,\text{mN}"></div><br>

          <strong>Schritt 4: Elektrische Feldstärke E</strong><br>
          <div class="katex-render" data-display="true" data-latex="E = \frac{F_{\text{el}}}{q} = \frac{1,963 \cdot 10^{-3}\,\text{N}}{2,0 \cdot 10^{-9}\,\text{C}} = 981\,500\,\frac{\text{V}}{\text{m}} \approx 9,82 \cdot 10^5\,\frac{\text{V}}{\text{m}} = 982\,\frac{\text{kV}}{\text{m}}"></div><br>
          <em>Korrektur-Hinweis:</em> In der Schülermitschrift auf S. 28 stand ein handschriftlicher Zahlendreher mit „80015“. Der korrekte, exakte Wert lautet <strong>9,82 • 10⁵ V/m</strong>!
        `
      },
      {
        title: 'Aufgabe 2: Buch S. 111 A8 (Meds.pdf S. 30)',
        prompt: `
          Eine Kugel der Masse m = 2,0 g trägt die Ladung q = 1,2 • 10⁻⁸ C. Sie hängt an einem Faden der Länge l = 2,0 m und wird im homogenen Feld um s = 20 cm ausgelenkt. Berechne die Feldstärke E am Ort der Kugel!
        `,
        solution: `
          <strong>Gegeben:</strong><br>
          <span class="katex-render" data-display="false" data-latex="l = 2,0\,\text{m}">l = 2,0 m</span>, <span class="katex-render" data-display="false" data-latex="s = 0,20\,\text{m}">s = 0,20 m</span>, <span class="katex-render" data-display="false" data-latex="m = 0,0020\,\text{kg}">m = 0,002 kg</span>, <span class="katex-render" data-display="false" data-latex="q = 1,2 \cdot 10^{-8}\,\text{C}">q = 1,2 • 10⁻⁸ C</span>.<br><br>

          <strong>Winkel:</strong><br>
          <div class="katex-render" data-display="true" data-latex="\sin\alpha = \frac{0,20}{2,0} = 0,10 \implies \alpha = 5,739^\circ \implies \tan(5,739^\circ) = 0,1005"></div><br>

          <strong>Kräfte:</strong><br>
          <div class="katex-render" data-display="true" data-latex="F_g = 0,0020 \cdot 9,81 = 0,01962\,\text{N} = 19,62\,\text{mN}"></div>
          <div class="katex-render" data-display="true" data-latex="F_{\text{el}} = F_g \cdot \tan\alpha = 0,01962\,\text{N} \cdot 0,1005 = 1,972 \cdot 10^{-3}\,\text{N} = 1,972\,\text{mN}"></div><br>

          <strong>Feldstärke:</strong><br>
          <div class="katex-render" data-display="true" data-latex="E = \frac{F_{\text{el}}}{q} = \frac{1,972 \cdot 10^{-3}\,\text{N}}{1,2 \cdot 10^{-8}\,\text{C}} \approx 164\,333\,\frac{\text{V}}{\text{m}} \approx 1,64 \cdot 10^5\,\frac{\text{V}}{\text{m}} = 164\,\frac{\text{kV}}{\text{m}}"></div>
        `
      }
    ]
  },

  {
    id: 'kraeftevergleich-schweben',
    folderId: 'ordner-kraefte-mechanik',
    num: '12',
    icon: '⚖️',
    color: '#f59e0b',
    tag: 'Buch S. 111 A9, A10',
    title: 'Kräftevergleich & schwebende Kugel (Buch S. 111 A9, A10)',
    desc: 'Einheitenableitung V/m = N/C = kg•m/(s³•A), Schwebekriterium Fel = Fg und Kräftevergleich zwischen Gravitation und E-Feld.',
    visualHtml: `
      <div class="formula-hero-card" style="border-left: 6px solid #f59e0b;">
        <span class="formula-hero-badge" style="background: rgba(245, 158, 11, 0.15); color: #d97706;">
          ⚖️ SCHWEBENDE LADUNGEN &amp; EINHEITENBEWEIS (MEDS.PDF S. 24)
        </span>
        <div style="background: var(--bg-subtle); padding: 1rem; border-radius: 8px; margin-top: 0.8rem; font-size: 0.88rem; line-height: 1.55;">
          <strong>1. Der Einheitenbeweis aus der Klausurmitschrift (S. 24):</strong><br>
          <div class="katex-render" data-display="true" data-latex="1\,\frac{\text{V}}{\text{m}} = \frac{1\,\frac{\text{J}}{\text{C}}}{\text{m}} = \frac{1\,\text{N}\cdot\text{m}}{\text{C}\cdot\text{m}} = 1\,\frac{\text{N}}{\text{C}} = \frac{1\,\frac{\text{kg}\cdot\text{m}}{\text{s}^2}}{\text{A}\cdot\text{s}} = 1\,\frac{\text{kg}\cdot\text{m}}{\text{s}^3 \cdot \text{A}}"></div><br>

          <strong>2. Schwebekriterium im vertikalen Plattenkondensator:</strong><br>
          Eine geladene Kugel schwebt kräftefrei, wenn die nach oben gerichtete elektrische Feldkraft exakt die nach unten wirkende Gewichtskraft kompensiert:<br>
          <div class="katex-render" data-display="true" data-latex="F_{\text{el}} = F_g \iff q \cdot E = m \cdot g \implies E_{\text{schwebe}} = \frac{m \cdot g}{q}"></div>
        </div>
      </div>
    `,
    summary: 'Im Schwebefall kompensiert Fel die Gewichtskraft Fg. Die Einheiten V/m und N/C sind physikalisch absolut identisch.',
    takeaways: [
      'Schwebekriterium: q • E = m • g.',
      'V/m = N/C = (kg • m) / (s³ • A).',
      'Elektrische Kräfte sind bei Elementarteilchen um 10³⁶-mal stärker als Gravitation.'
    ],
    tasks: [
      {
        title: 'Originalaufgabe Buch S. 111 A10 (S. 24)',
        prompt: `
          Eine Kugel der Masse m = 2,0 g trägt die Ladung Q = 1,2 • 10⁻⁸ C und befindet sich in einem Feld der Stärke E = 100 V/m.<br>
          a) Berechne die Gewichtskraft Fg der Kugel.<br>
          b) Berechne die elektrische Kraft Fel im Feld.<br>
          c) Vergleiche beide Kräfte!
        `,
        solution: `
          <strong>a) Gewichtskraft Fg:</strong><br>
          <div class="katex-render" data-display="true" data-latex="F_g = m \cdot g = 2,0 \cdot 10^{-3}\,\text{kg} \cdot 9,81\,\frac{\text{m}}{\text{s}^2} = 0,01962\,\text{N} = 19,62\,\text{mN}"></div><br>

          <strong>b) Elektrische Feldkraft Fel:</strong><br>
          <div class="katex-render" data-display="true" data-latex="F_{\text{el}} = Q \cdot E = 1,2 \cdot 10^{-8}\,\text{C} \cdot 100\,\frac{\text{N}}{\text{C}} = 1,2 \cdot 10^{-6}\,\text{N} = 0,0012\,\text{mN}"></div><br>

          <strong>c) Vergleich:</strong><br>
          <div class="katex-render" data-display="true" data-latex="\frac{F_g}{F_{\text{el}}} = \frac{1,962 \cdot 10^{-2}\,\text{N}}{1,2 \cdot 10^{-6}\,\text{N}} = 16\,350"></div>
          <em>Ergebnis:</em> Die Gewichtskraft ist bei dieser Kugel mehr als <strong>16.000-mal stärker</strong> als die elektrische Kraft!
        `
      }
    ]
  },

  {
    id: 'kondensator-versuch',
    folderId: 'ordner-kondensator-versuch',
    num: '13',
    icon: '🔋',
    color: '#8b5cf6',
    tag: 'Meds.pdf S. 8',
    title: 'Der Entladeversuch: Schaltung & Durchführung (S. 8)',
    desc: 'Schaltskizze mit Wechselschalter, Aufladestromkreis vs. Entladestromkreis, Messung des Stromverlaufs I(t).',
    visualHtml: `
      <div class="formula-hero-card" style="border-left: 6px solid #8b5cf6;">
        <span class="formula-hero-badge" style="background: rgba(139, 92, 246, 0.15); color: #8b5cf6;">
          🔋 DER ENTLADEVERSUCH EINES KONDENSATORS (MEDS.PDF S. 8)
        </span>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 0.8rem; font-size: 0.85rem; line-height: 1.5;">
          <div style="background: var(--bg-subtle); padding: 0.9rem; border-radius: 6px;">
            <strong>Schaltungsaufbau:</strong><br>
            • <strong>Spannungsquelle:</strong> liefert Ladespannung <span class="katex-render" data-display="false" data-latex="U_0">U0</span>.<br>
            • <strong>Wechselschalter:</strong> schaltet zwischen Lade- und Entladestromkreis um.<br>
            • <strong>Kondensator C:</strong> speichert die Ladung <span class="katex-render" data-display="false" data-latex="Q = C \cdot U">Q = C • U</span>.<br>
            • <strong>Entladewiderstand R:</strong> begrenzt den Entladestrom.<br>
            • <strong>Amperemeter:</strong> misst die Stromstärke <span class="katex-render" data-display="false" data-latex="I(t)">I(t)</span> hochpräzise.
          </div>
          <div style="background: var(--bg-subtle); padding: 0.9rem; border-radius: 6px;">
            <strong>Durchführung (S. 8):</strong><br>
            1. Kondensator über Schalterstellung 1 vollständig aufladen.<br>
            2. Zum Zeitpunkt <span class="katex-render" data-display="false" data-latex="t = 0">t = 0</span> Schalter auf Stellung 2 umlegen.<br>
            3. Der Kondensator entlädt sich über Widerstand <span class="katex-render" data-display="false" data-latex="R">R</span> und Amperemeter.<br>
            4. Stromstärke <span class="katex-render" data-display="false" data-latex="I">I</span> in festen Zeitabständen (z. B. alle 4 s oder 5 s) protokollieren.
          </div>
        </div>
      </div>
    `,
    summary: 'Der Entladeversuch protokolliert den Stromabfluss über die Zeit zur Bestimmung der Zeitkonstante τ = R • C und der Gesamtkapazität.',
    takeaways: [
      'Wechselschalter trennt Auflade- und Entladestromkreis.',
      'Anfangsstrom I₀ = U₀ / R.',
      'Strom nimmt exponentiell ab.'
    ],
    tasks: [
      {
        title: 'Verständnisfrage: Einfluss von R und C',
        prompt: 'Wie verändert sich die Entladedauer, wenn der Widerstand R verdoppelt wird?',
        solution: 'Die Zeitkonstante beträgt τ = R • C. Verdoppelt man R, verdoppelt sich die Zeitkonstante τ. Der Entladevorgang dauert genau doppelt so lange, und die Anfangsstromstärke I₀ = U₀ / R halbiert sich!'
      }
    ]
  },

  {
    id: 'ladung-integral',
    folderId: 'ordner-kondensator-versuch',
    num: '14',
    icon: '∫',
    color: '#8b5cf6',
    tag: 'Meds.pdf S. 12, 33',
    title: 'Ladungsberechnung mit Integral: Q = ∫ I(t) dt (S. 12, 33)',
    desc: 'Exakte Berechnung der geflossenen Ladung als Fläche unter der I(t)-Kurve. Stammfunktion, Rechner-Eingabe und Grenzen.',
    visualHtml: `
      <div class="formula-hero-card" style="border-left: 6px solid #8b5cf6;">
        <span class="formula-hero-badge" style="background: rgba(139, 92, 246, 0.15); color: #8b5cf6;">
          ∫ LADUNG ALS INTEGRAL DER STROMSTÄRKE (MEDS.PDF S. 12)
        </span>
        <div class="formula-math-display">
          <span class="katex-render" data-display="true" data-latex="I(t) = \frac{dQ}{dt} \iff Q = \int_{t_1}^{t_2} I(t)\,dt"></span>
        </div>
        <div style="background: var(--bg-subtle); padding: 1rem; border-radius: 8px; margin-top: 0.8rem; font-size: 0.86rem; line-height: 1.55;">
          <strong>Stammfunktion für die Klausur:</strong><br>
          Hat man <span class="katex-render" data-display="false" data-latex="I(t) = I_0 \cdot e^{-k \cdot t}">I(t) = I0 · e^(-k•t)</span> ermittelt, so lautet die Stammfunktion:<br>
          <div class="katex-render" data-display="true" data-latex="\int I(t)\,dt = -\frac{I_0}{k} \cdot e^{-k \cdot t}"></div>
          Für die bis unendlich abgeflossene Gesamtladung <span class="katex-render" data-display="false" data-latex="Q_{\text{ges}}">Q_ges</span> folgt:<br>
          <div class="katex-render" data-display="true" data-latex="Q_{\text{ges}} = \int_0^\infty I_0 \cdot e^{-k \cdot t}\,dt = \left[ -\frac{I_0}{k} \cdot e^{-k \cdot t} \right]_0^\infty = 0 - \left( -\frac{I_0}{k} \right) = \frac{I_0}{k} = I_0 \cdot \tau"></div>
        </div>
      </div>
    `,
    summary: 'Die elektrische Ladung Q entspricht exakt der Fläche unter dem I(t)-Graphen und wird über die Stammfunktion -I₀/k • e^(-kt) berechnet.',
    takeaways: [
      'Q = ∫ I(t) dt.',
      'Fläche unter der Kurve = geflossene Ladungsmenge in Coulomb.',
      'Q_ges = I₀ / k = I₀ • τ.'
    ],
    tasks: [
      {
        title: 'Berechnungsaufgabe aus S. 12',
        prompt: `
          Für einen Kondensator wurde der Entladestrom I(t) = 334,45 µA • (0,9685)^t gemessen.<br>
          Berechne die Ladungsmenge Q, die in den ersten 60 Sekunden abgeflossen ist!
        `,
        solution: `
          Da <span class="katex-render" data-display="false" data-latex="b = 0,9685 = e^{-k} \implies k = -\ln(0,9685) \approx 0,0320\,\text{s}^{-1}">k = 0,0320</span>:<br>
          <div class="katex-render" data-display="true" data-latex="Q(60) = \int_0^{60} 334,45\,\mu\text{A} \cdot e^{-0,0320 \cdot t}\,dt = \left[ -\frac{334,45}{0,0320} e^{-0,0320 \cdot t} \right]_0^{60}"></div>
          <div class="katex-render" data-display="true" data-latex="Q(60) = 10\,451\,\mu\text{C} \cdot (1 - e^{-1,92}) = 10\,451\,\mu\text{C} \cdot (1 - 0,1466) \approx 8919\,\mu\text{C} = 8,92\,\text{mC}"></div>
        `
      }
    ]
  },

  {
    id: 'kondensator-kapazitaet',
    folderId: 'ordner-kondensator-versuch',
    num: '15',
    icon: '⚡',
    color: '#8b5cf6',
    tag: 'Kapazität & Energie',
    title: 'Kapazität & elektrische Energie des Kondensators',
    desc: 'C = Q / U, Plattenkondensator C = ε₀εᵣ A / d, gespeicherte Energie W = ½ C U² und Energiedichte w = ½ ε₀ E².',
    visualHtml: `
      <div class="formula-hero-card" style="border-left: 6px solid #8b5cf6;">
        <span class="formula-hero-badge" style="background: rgba(139, 92, 246, 0.15); color: #8b5cf6;">
          ⚡ KAPAZITÄT &amp; ENERGIE DES KONDENSATORS
        </span>
        <div class="formula-math-display">
          <span class="katex-render" data-display="true" data-latex="C = \frac{Q}{U} = \varepsilon_0 \cdot \varepsilon_r \cdot \frac{A}{d} \quad [\text{Farad: } \text{F}] \qquad W_{\text{el}} = \frac{1}{2} C U^2 = \frac{1}{2} Q U"></span>
        </div>
      </div>
    `,
    summary: 'Die Kapazität C ist das Ladungsspeichervermögen pro Volt. Die gespeicherte Feldenergie wächst quadratisch mit der Spannung U².',
    takeaways: [
      'C = ε₀ • εᵣ • A / d [Farad = C / V].',
      'Energie W = ½ • C • U² = ½ • Q • U.',
      'Verdoppelt man U bei unverändertem Kondensator, vervierfacht sich die Energie.'
    ],
    tasks: [
      {
        title: 'Aufgabe: Kapazität und Energie berechnen',
        prompt: `
          Ein Kondensator mit A = 400 cm² und d = 1,5 mm wird an eine Spannung von U = 300 V angeschlossen (εᵣ = 1). Berechne C, Q und die gespeicherte Energie Wel.
        `,
        solution: `
          <span class="katex-render" data-display="false" data-latex="A = 0,040\,\text{m}^2">A = 0,04 m²</span>, <span class="katex-render" data-display="false" data-latex="d = 1,5 \cdot 10^{-3}\,\text{m}">d = 1,5 • 10⁻³ m</span>.<br>
          <div class="katex-render" data-display="true" data-latex="C = 8,854 \cdot 10^{-12} \cdot \frac{0,040}{1,5 \cdot 10^{-3}} = 2,36 \cdot 10^{-10}\,\text{F} = 236\,\text{pF}"></div>
          <div class="katex-render" data-display="true" data-latex="Q = C \cdot U = 236 \cdot 10^{-12}\,\text{F} \cdot 300\,\text{V} = 7,08 \cdot 10^{-8}\,\text{C} = 70,8\,\text{nC}"></div>
          <div class="katex-render" data-display="true" data-latex="W_{\text{el}} = \frac{1}{2} \cdot C \cdot U^2 = \frac{1}{2} \cdot 2,36 \cdot 10^{-10} \cdot 90\,000 = 1,06 \cdot 10^{-5}\,\text{J} = 10,6\,\mu\text{J}"></div>
        `
      }
    ]
  }
];

const PHYSIK_SKILLS = [
  ...SKILLS_FOLDER_1,
  ...SKILLS_FOLDER_2,
  ...SKILLS_FOLDER_3,
  ...SKILLS_FOLDERS_4_5
];
