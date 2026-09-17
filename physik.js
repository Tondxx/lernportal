// =========================================================================
// physik.js - Physik eA Lern- & Trainingsportal (Ph12-Lh / IGS Göttingen)
// Basierend auf Meds.pdf (33 Seiten Unterrichts-Mitschriften & Klausurthemen)
// 1. Hauptgebiet: Elektrizitätslehre & Elektrostatik (Klausur 12/1) in 5 Ordnern
// 2. Die 4 typischen Funktionen im Physik-Abitur (S. 32) & Originalblatt S. 33
// 3. Fehlerfreie, korrigierte Vorrechnungen aller Aufgaben (Kugelauslenkung, Coulomb, E-Feld)
// 4. Widerspruchsbeweis für Feldlinien (S. 7) & Faradayscher Käfig (S. 25)
// 5. 4 interaktive Canvas-Simulationen (Coulomb, E-Feld, Elektroskop, Schaltung)
// 6. Eigene Notizfelder mit Auto-Save & Dokument-Upload
// =========================================================================

let CURRENT_PHYSIK_MODE = 'ordner'; // 'ordner' | 'funktionen' | 'themen' | 'iserv-pool' | 'uploads' | 'spickzettel'
let CURRENT_PHYSIK_FOLDER = null;
let CURRENT_PHYSIK_SKILL = null;
let CURRENT_ISERV_CATEGORY = 'all';

// --- 1. DIE 5 STRUKTURIERTEN HAUPTORDNER DER ELEKTRIZITÄTSLEHRE ---
const ELEKTRIZITAET_FOLDERS = [
  {
    id: 'ordner-funktionen',
    num: '01',
    icon: '📈',
    badge: 'Klausur-Fokus S. 32 & 33',
    color: '#3b82f6',
    title: '1. Die 4 typischen Funktionen & Messwertauswertung',
    subtitle: 'Proportional, quadratisch, antiproportional & 1/r²-Zusammenhang (S. 32), Regressions-Check und das Original-Klausurblatt S. 33.',
    topics: [
      { id: 'typische-funktionen', num: '1.1', title: 'Die 4 typischen Funktionen im Physik-Abitur (S. 32)', badge: 'S. 32 Basis', desc: 'Verdopplungsregeln, Quotientengleichheit, Produktgleichheit, Linearisierung und R²-Bestimmung.' },
      { id: 'messwerte-auswerten-2', num: '1.2', title: 'Klausurblatt: Auswerten von Messwerten II (S. 33)', badge: 'S. 33 Klausur', desc: 'Aufgabe 1: Coulomb-Kraft F(r), Aufgabe 2: Plattenkondensator F(U), Aufgabe 3: Entladekurve I(t) & Integral.' },
      { id: 'messwerte-auswerten-1', num: '1.3', title: 'Messwertauswertung I: Braun\'sche Röhre & Drahtwiderstand (S. 19)', badge: 'S. 19 Übung', desc: 'Ablenkung x(U) in der Röhre und Widerstand R(A) bei Querschnittsänderung.' }
    ]
  },
  {
    id: 'ordner-phaenomene',
    num: '02',
    icon: '🔬',
    badge: 'Meds.pdf S. 2 - 5 & 25',
    color: '#10b981',
    title: '2. Elektrostatische Phänomene & Ladungsträger',
    subtitle: 'Elektroskop, Influenz vs. Polarisation, der Faradaysche Käfig und die Funktionsweise der Glimmlampe als Polprüfer.',
    topics: [
      { id: 'elektroskop-funktion', num: '2.1', title: 'Das Elektroskop: Aufbau & Ladungsverteilung (S. 2/3)', badge: 'S. 2/3 Phänomen', desc: 'Metallteller, Zeigerabstoßung und Ladungsnachweis für ruhende Ladungen.' },
      { id: 'influenz-polarisation', num: '2.2', title: 'Influenz vs. Polarisation: Leiter vs. Nichtleiter (S. 5)', badge: 'S. 5 Konzept', desc: 'Verschiebung freier Elektronen vs. molekulare Dipole (Luftballon an der Wand).' },
      { id: 'faraday-kaefig', num: '2.3', title: 'Der Faradaysche Käfig: Feldfreier Raum & Gegenfeld (S. 25)', badge: 'S. 25 Klausur', desc: 'Warum Elektronen das äußere Feld exakt kompensieren (Fel,inn = -Fel,auß).' },
      { id: 'glimmlampe-polpruefer', num: '2.4', title: 'Die Glimmlampe & Polprüfer: Zünd- & Löschspannung (S. 4)', badge: 'S. 4 Gerät', desc: 'Gasentladung, Stoßionisation und warum stets die Kathode (Minuspol) leuchtet.' }
    ]
  },
  {
    id: 'ordner-feld-coulomb',
    num: '03',
    icon: '⚡',
    badge: 'Meds.pdf S. 7, 10, 15, 26',
    color: '#06b6d4',
    title: '3. Elektrisches Feld & Coulombsches Gesetz',
    subtitle: 'Feldstärke E = F/q, Coulomb-Gesetz, 7 Feldlinien-Eigenschaften, Widerspruchsbeweis und Flächenladungsdichte σ.',
    topics: [
      { id: 'efeld-berechnen', num: '3.1', title: 'Elektrische Feldstärke & Coulombsches Gesetz (S. 11, 15)', badge: 'S. 11/15 Formeln', desc: 'E = F/q, FC = 1/(4πε₀) • Q₁Q₂/r², Buch S. 111 A7 & AB 10.' },
      { id: 'feldlinien-aequipotential', num: '3.2', title: 'Feldlinien & Äquipotentiallinien (mit Beweis!) (S. 7, 10)', badge: 'S. 7 Beweis', desc: '7 Eigenschaften, Widerspruchsbeweis (warum kein Schnittpunkt) und ΔW = 0.' },
      { id: 'flaechenladungsdichte', num: '3.3', title: 'Flächenladungsdichte σ = Q/A & Plattenkondensator (S. 26/27)', badge: 'Buch S. 111 A13', desc: 'σ = ε₀εᵣE, Buch S. 111 A13 vollständig durchgerechnet.' }
    ]
  },
  {
    id: 'ordner-kraefte-mechanik',
    num: '04',
    icon: '🎯',
    badge: 'Meds.pdf S. 28, 30 & Buch S. 111',
    color: '#f59e0b',
    title: '4. Kräfte & Mechanik im E-Feld (Klausur-Rechnung!)',
    subtitle: 'Auslenkung einer geladenen Kugel am Faden (Kräfteparallelogramm tan α = Fel/Fg), schwebende Ladungsträger und Buch S. 111 A8-A10.',
    topics: [
      { id: 'kugel-auslenkung', num: '4.1', title: 'Auslenkung einer geladenen Kugel im E-Feld (S. 28, 30)', badge: 'Klausur-Klassiker', desc: 'Fadenpendel, tan α = Fel/Fg, Kleinwinkelnäherung sin α ≈ tan α = s/l, korrigierte Rechnung.' },
      { id: 'kraeftevergleich-schweben', num: '4.2', title: 'Kräftevergleich & schwebende Kugel (Buch S. 111 A9, A10)', badge: 'S. 24 Einheiten', desc: 'Einheitenableitung V/m = N/C = kg•m/(s³•A), Gravitation Fg vs. elektrische Kraft Fel.' }
    ]
  },
  {
    id: 'ordner-kondensator-versuch',
    num: '05',
    icon: '🔋',
    badge: 'Meds.pdf S. 8, 12 & 33',
    color: '#8b5cf6',
    title: '5. Kondensator & Entladevorgang (Versuch & Integral)',
    subtitle: 'Schaltskizze, Durchführung des Entladeversuchs, Ladung Q als Integral ∫I(t) dt, Kapazität C und Energie W = ½CU².',
    topics: [
      { id: 'kondensator-versuch', num: '5.1', title: 'Der Entladeversuch: Schaltung & Durchführung (S. 8)', badge: 'S. 8 Experiment', desc: 'Auflade- vs. Entladestromkreis, Wechselschalter, Messung von I(t).' },
      { id: 'ladung-integral', num: '5.2', title: 'Ladungsberechnung mit Integral Q = ∫I(t) dt (S. 12, 33)', badge: 'S. 12/33 Integral', desc: 'Integration der e-Funktion, Stammfunktion und Taschenrechner-Syntax.' },
      { id: 'kondensator-kapazitaet', num: '5.3', title: 'Kapazität & elektrische Energie des Kondensators', badge: 'Grundgrößen', desc: 'C = Q/U = ε₀εᵣ A/d, Energie Wel = ½ C U² = ½ Q U.' }
    ]
  }
];


// --- 2. SKILLS FÜR ORDNER 1: FUNKTIONEN & MESSWERTE ---
const SKILLS_FOLDER_1 = [
  {
    id: 'typische-funktionen',
    folderId: 'ordner-funktionen',
    num: '01',
    icon: '📈',
    color: '#3b82f6',
    tag: 'Klausur-Fokus S. 32',
    title: 'Die 4 typischen Funktionen im Physik-Abitur (S. 32)',
    desc: 'Proportional, quadratisch, antiproportional & 1/r²-Zusammenhang. Verdopplungsregeln, Quotientengleichheit, Produktgleichheit und R²-Bestimmung.',
    visualHtml: `
      <div class="formula-hero-card" style="border-left: 6px solid #3b82f6;">
        <span class="formula-hero-badge" style="background: rgba(59, 130, 246, 0.15); color: #3b82f6;">
          📈 DIE 4 UNVERZICHTBAREN FUNKTIONSTYPEN (MEDS.PDF S. 32)
        </span>
        <p style="font-size: 0.9rem; color: var(--text-secondary); margin: 0.6rem 0 1rem 0; line-height: 1.5;">
          In Physik-Klausuren musst du aus Messwerttabellen sofort den mathematischen Zusammenhang erkennen. Dafür gibt es die <strong>Verdopplungsregel</strong> und die <strong>Konstantenprüfung</strong>:
        </p>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 0.9rem; margin-bottom: 1.2rem;">
          <!-- 1. Proportional -->
          <div style="background: var(--bg-subtle); border-radius: 8px; padding: 1rem; border-top: 3px solid #3b82f6;">
            <div style="font-weight: 800; color: #3b82f6; font-size: 1rem; margin-bottom: 0.4rem;">
              1. Proportional (<span class="katex-render" data-display="false" data-latex="y \\sim x">y ~ x</span>)
            </div>
            <div style="font-size: 0.85rem; line-height: 1.45; color: var(--text-primary); margin-bottom: 0.5rem;">
              <strong>Gleichung:</strong> <span class="katex-render" data-display="false" data-latex="y = k \\cdot x">y = k · x</span>
            </div>
            <div style="font-size: 0.8rem; color: var(--text-secondary); line-height: 1.4;">
              • <strong>Merkregel:</strong> Verdoppelt sich <span class="katex-render" data-display="false" data-latex="x">x</span>, verdoppelt sich <span class="katex-render" data-display="false" data-latex="y">y</span> annähernd.<br>
              • <strong>Test:</strong> <em>Quotientengleichheit</em> <span class="katex-render" data-display="false" data-latex="\\frac{y}{x} = k = \\text{const.}">y/x = const.</span><br>
              • <strong>Graph:</strong> Ursprungsgerade mit Steigung <span class="katex-render" data-display="false" data-latex="k">k</span>.<br>
              • <strong>Physik-Beispiel:</strong> <span class="katex-render" data-display="false" data-latex="F_{\\text{el}} = q \\cdot E">Fel = q · E</span> (<span class="katex-render" data-display="false" data-latex="F \\sim q">F ~ q</span>).
            </div>
          </div>

          <!-- 2. Quadratisch -->
          <div style="background: var(--bg-subtle); border-radius: 8px; padding: 1rem; border-top: 3px solid #10b981;">
            <div style="font-weight: 800; color: #10b981; font-size: 1rem; margin-bottom: 0.4rem;">
              2. Quadratisch (<span class="katex-render" data-display="false" data-latex="y \\sim x^2">y ~ x²</span>)
            </div>
            <div style="font-size: 0.85rem; line-height: 1.45; color: var(--text-primary); margin-bottom: 0.5rem;">
              <strong>Gleichung:</strong> <span class="katex-render" data-display="false" data-latex="y = k \\cdot x^2">y = k · x²</span>
            </div>
            <div style="font-size: 0.8rem; color: var(--text-secondary); line-height: 1.4;">
              • <strong>Merkregel:</strong> Verdoppelt sich <span class="katex-render" data-display="false" data-latex="x">x</span>, <strong>vervierfacht</strong> sich <span class="katex-render" data-display="false" data-latex="y">y</span> (<span class="katex-render" data-display="false" data-latex="2^2 = 4">2² = 4</span>).<br>
              • <strong>Test:</strong> <em>Quotientengleichheit</em> <span class="katex-render" data-display="false" data-latex="\\frac{y}{x^2} = k = \\text{const.}">y/x² = const.</span><br>
              • <strong>Linearisierung:</strong> <span class="katex-render" data-display="false" data-latex="y">y</span> über <span class="katex-render" data-display="false" data-latex="x^2">x²</span> aufgetragen ergibt Gerade.<br>
              • <strong>Physik-Beispiel:</strong> Kondensatorkraft <span class="katex-render" data-display="false" data-latex="F = \\frac{1}{2}\\varepsilon_0 \\frac{A}{d^2} U^2">F ~ U²</span>.
            </div>
          </div>

          <!-- 3. Antiproportional -->
          <div style="background: var(--bg-subtle); border-radius: 8px; padding: 1rem; border-top: 3px solid #f59e0b;">
            <div style="font-weight: 800; color: #d97706; font-size: 1rem; margin-bottom: 0.4rem;">
              3. Antiproportional (<span class="katex-render" data-display="false" data-latex="y \\sim \\frac{1}{x}">y ~ 1/x</span>)
            </div>
            <div style="font-size: 0.85rem; line-height: 1.45; color: var(--text-primary); margin-bottom: 0.5rem;">
              <strong>Gleichung:</strong> <span class="katex-render" data-display="false" data-latex="y = \\frac{k}{x} = k \\cdot x^{-1}">y = k/x</span>
            </div>
            <div style="font-size: 0.8rem; color: var(--text-secondary); line-height: 1.4;">
              • <strong>Merkregel:</strong> Verdoppelt sich <span class="katex-render" data-display="false" data-latex="x">x</span>, <strong>halbiert</strong> sich <span class="katex-render" data-display="false" data-latex="y">y</span> (<span class="katex-render" data-display="false" data-latex="\\frac{1}{2}">1/2</span>).<br>
              • <strong>Test:</strong> <em>Produktgleichheit</em> <span class="katex-render" data-display="false" data-latex="x \\cdot y = k = \\text{const.}">x · y = const.</span><br>
              • <strong>Linearisierung:</strong> <span class="katex-render" data-display="false" data-latex="y">y</span> über <span class="katex-render" data-display="false" data-latex="\\frac{1}{x}">1/x</span> aufgetragen ergibt Gerade.<br>
              • <strong>Physik-Beispiel:</strong> Drahtwiderstand <span class="katex-render" data-display="false" data-latex="R = \\rho \\cdot \\frac{l}{A}">R ~ 1/A</span>.
            </div>
          </div>

          <!-- 4. Potenzfunktion 1/r² -->
          <div style="background: var(--bg-subtle); border-radius: 8px; padding: 1rem; border-top: 3px solid #8b5cf6;">
            <div style="font-weight: 800; color: #8b5cf6; font-size: 1rem; margin-bottom: 0.4rem;">
              4. Potenzfunktion (<span class="katex-render" data-display="false" data-latex="y \\sim \\frac{1}{x^2}">y ~ 1/x²</span>)
            </div>
            <div style="font-size: 0.85rem; line-height: 1.45; color: var(--text-primary); margin-bottom: 0.5rem;">
              <strong>Gleichung:</strong> <span class="katex-render" data-display="false" data-latex="y = \\frac{k}{x^2} = k \\cdot x^{-2}">y = k/x²</span>
            </div>
            <div style="font-size: 0.8rem; color: var(--text-secondary); line-height: 1.4;">
              • <strong>Merkregel:</strong> Verdoppelt sich <span class="katex-render" data-display="false" data-latex="x">x</span>, sinkt <span class="katex-render" data-display="false" data-latex="y">y</span> auf <strong>ein Viertel</strong> (<span class="katex-render" data-display="false" data-latex="\\frac{1}{4}">1/4</span>).<br>
              • <strong>Test:</strong> <em>Produktgleichheit</em> <span class="katex-render" data-display="false" data-latex="y \\cdot x^2 = k = \\text{const.}">y · x² = const.</span><br>
              • <strong>Linearisierung:</strong> <span class="katex-render" data-display="false" data-latex="y">y</span> über <span class="katex-render" data-display="false" data-latex="\\frac{1}{x^2}">1/x²</span> aufgetragen ergibt Gerade.<br>
              • <strong>Physik-Beispiel:</strong> Coulombsches Gesetz <span class="katex-render" data-display="false" data-latex="F_C \\sim \\frac{1}{r^2}">F ~ 1/r²</span>.
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


        <!-- 5-SCHRITTE-SCHEMA DES LEHRERS (MEDS.PDF S. 14 & S. 18) -->
        <div class="formula-takeaway-box" style="background: linear-gradient(135deg, rgba(16, 185, 129, 0.08), rgba(56, 189, 248, 0.08)); border-left: 5px solid #10b981; margin: 1.2rem 0; padding: 1.2rem; border-radius: 10px;">
          <div style="font-weight: 800; color: #10b981; font-size: 1.05rem; margin-bottom: 0.6rem; display: flex; align-items: center; gap: 0.5rem;">
            <span>📋</span><span>DAS OFFIZIELLE 5-SCHRITTE-SCHEMA DEINES LEHRERS (MEDS.PDF S. 14 &amp; S. 18)</span>
          </div>
          <div style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 0.8rem; line-height: 1.45;">
            Genau diesen formalen Aufbau verlangt dein Lehrer bei <strong>jeder</strong> Messwertauswertung im Unterricht und in der Klausur (siehe Schultafelfoto auf S. 14 und Mitschrift auf S. 18):
          </div>

          <div style="display: flex; flex-direction: column; gap: 0.75rem; font-size: 0.84rem; line-height: 1.5;">
            <!-- Schritt 1 -->
            <div style="background: var(--bg-subtle); padding: 0.8rem; border-radius: 6px; border-left: 3px solid #38bdf8;">
              <strong style="color: #38bdf8; font-size: 0.9rem;">1. Vermutung aufstellen (Hypothese formulieren)</strong><br>
              <em style="color: var(--text-primary);">„Wenn sich die Größe <span class="katex-render" data-display="false" data-latex="x">x</span> (z. B. Ladung <span class="katex-render" data-display="false" data-latex="Q">Q</span> oder Abstand <span class="katex-render" data-display="false" data-latex="r">r</span>) verdoppelt, dann vervierfacht / viertelt / verdoppelt sich annähernd die Größe <span class="katex-render" data-display="false" data-latex="y">y</span> (die Kraft <span class="katex-render" data-display="false" data-latex="F">F</span>). Deswegen vermuten wir einen [quadratischen / umgekehrt-quadratischen] Zusammenhang der Form <span class="katex-render" data-display="false" data-latex="y \\sim x^n">y ~ x^n</span> bzw. <span class="katex-render" data-display="false" data-latex="y = k \\cdot x^n">y = k • x^n</span>.“</em>
            </div>

            <!-- Schritt 2 -->
            <div style="background: var(--bg-subtle); padding: 0.8rem; border-radius: 6px; border-left: 3px solid #10b981;">
              <strong style="color: #10b981; font-size: 0.9rem;">2. Beweis durchführen (Zwei gleichwertige Wege im Unterricht)</strong><br>
              • <strong>Weg A (TI-Nspire Regression, S. 14):</strong> Potenz- oder quadratische Regression durchführen. Notieren: <span class="katex-render" data-display="false" data-latex="y = a \\cdot x^b">y = a · x^b</span> und Bestimmtheitsmaß <span class="katex-render" data-display="false" data-latex="R^2">R²</span> (z. B. <span class="katex-render" data-display="false" data-latex="y = 0{,}000606 \\cdot x^2">y = 0,000606 · x²</span>, <span class="katex-render" data-display="false" data-latex="R^2 \\approx 0{,}9996">R² ≈ 0,9996</span>; Störterme durchstreichen!).<br>
              • <strong>Weg B (Tabelle mit Quotienten- / Produktbildung, S. 18):</strong> In der 3. Zeile der Tabelle für jedes Wertepaar die Konstante berechnen (z. B. <span class="katex-render" data-display="false" data-latex="F \\cdot r^2 = k">F · r² = k</span> oder <span class="katex-render" data-display="false" data-latex="F / U^2 = k">F / U² = k</span>).
            </div>

            <!-- Schritt 3 -->
            <div style="background: var(--bg-subtle); padding: 0.8rem; border-radius: 6px; border-left: 3px solid #f59e0b;">
              <strong style="color: #f59e0b; font-size: 0.9rem;">3. Beurteilung (R² bzw. Konstanz auswerten)</strong><br>
              <em style="color: var(--text-primary);">„Weil das Bestimmtheitsmaß <span class="katex-render" data-display="false" data-latex="R^2">R²</span> sehr dicht an 1 liegt (bzw. weil die Werte für <span class="katex-render" data-display="false" data-latex="F \\cdot r^2">F · r²</span> annähernd konstant sind), ist unsere Vermutung bestätigt.“</em>
            </div>

            <!-- Schritt 4 -->
            <div style="background: var(--bg-subtle); padding: 0.8rem; border-radius: 6px; border-left: 3px solid #8b5cf6;">
              <strong style="color: #8b5cf6; font-size: 0.9rem;">4. Mittelwert k̄ berechnen &amp; Funktionsgleichung mit EINHEIT angeben</strong><br>
              Mittelwert berechnen: <span class="katex-render" data-display="false" data-latex="\\bar{k} = \\frac{1}{n} \\sum k_i">k̄ = 1/n Σ k_i</span> (z. B. <span class="katex-render" data-display="false" data-latex="\\bar{k} = 883{,}5\\,\\text{cm}^2\\cdot\\text{mN}">k̄ = 883,5 cm² · mN</span>).<br>
              Gleichung hinschreiben: <span class="katex-render" data-display="false" data-latex="F(r) = 883{,}5\\,\\text{cm}^2\\cdot\\text{mN} \\cdot \\frac{1}{r^2}">F(r) = 883,5 cm²·mN · 1/r²</span> (Achtung: Einheit der Konstanten darf niemals fehlen!).
            </div>

            <!-- Schritt 5 -->
            <div style="background: var(--bg-subtle); padding: 0.8rem; border-radius: 6px; border-left: 3px solid #ec4899;">
              <strong style="color: #ec4899; font-size: 0.9rem;">5. Beispiel / Anwendung / Physikalischer Koeffizientenvergleich</strong><br>
              • <strong>Extrapolation:</strong> Berechne <span class="katex-render" data-display="false" data-latex="F">F</span> für einen neuen Wert: <span class="katex-render" data-display="false" data-latex="F(70\\,\\text{nC}) = 0{,}000606 \\cdot 70^2 \\approx 2{,}96\\,\\text{mN}">F(70 nC) = 2,96 mN</span>.<br>
              • <strong>Koeffizientenvergleich:</strong> Verknüpfung mit der theoretischen Formel (z. B. <span class="katex-render" data-display="false" data-latex="k = \\frac{1}{4\\pi\\varepsilon_0}">k = 1/(4πε₀)</span> oder <span class="katex-render" data-display="false" data-latex="k = \\frac{1}{2}\\varepsilon_0 \\frac{A}{d^2}">k = 1/2 ε₀ A/d²</span>), um <span class="katex-render" data-display="false" data-latex="\\varepsilon_0">ε₀</span> oder die Ladung <span class="katex-render" data-display="false" data-latex="Q">Q</span> zu isolieren!
            </div>
          </div>
        </div>
      </div>
    `,
    summary: 'Die 4 Grundfunktionen im Physik-Abitur: Proportional (Quotient konstant), Quadratisch (Quotient durch x² konstant), Antiproportional (Produkt konstant) und 1/r²-Potenzfunktion (Produkt mit r² konstant).',
    takeaways: [
      'Proportionalität y ~ x wird mit dem Quotienten y/x = const. nachgewiesen.',
      'Quadratischer Zusammenhang y ~ x² wird mit y/x² = const. nachgewiesen.',
      'Antiproportionalität y ~ 1/x wird mit dem Produkt x • y = const. nachgewiesen.',
      'Coulomb-Abhängigkeit y ~ 1/x² wird mit dem Produkt y • x² = const. nachgewiesen.'
    ],
    tasks: [
      {
        title: 'Übungsaufgabe 1: Funktionstyp aus Messwerten bestimmen',
        prompt: `
          Gegeben sind folgende Messreihen zweier physikalischer Größen A und B:
          <table style="width:100%; border-collapse:collapse; margin:0.8rem 0; font-size:0.88rem; text-align:center;">
            <tr style="background:var(--bg-subtle);">
              <th style="border:1px solid var(--border-subtle); padding:0.4rem;">x in m</th>
              <td style="border:1px solid var(--border-subtle); padding:0.4rem;">1</td>
              <td style="border:1px solid var(--border-subtle); padding:0.4rem;">2</td>
              <td style="border:1px solid var(--border-subtle); padding:0.4rem;">3</td>
              <td style="border:1px solid var(--border-subtle); padding:0.4rem;">4</td>
            </tr>
            <tr>
              <th style="border:1px solid var(--border-subtle); padding:0.4rem;">y in N</th>
              <td style="border:1px solid var(--border-subtle); padding:0.4rem;">72,0</td>
              <td style="border:1px solid var(--border-subtle); padding:0.4rem;">18,0</td>
              <td style="border:1px solid var(--border-subtle); padding:0.4rem;">8,0</td>
              <td style="border:1px solid var(--border-subtle); padding:0.4rem;">4,5</td>
            </tr>
          </table>
          Ermittle den funktionalen Zusammenhang y(x) nach dem 4-Schritte-Vorgehen.
        `,
        solution: `
          <strong>Schritt 1: Vermutung formulieren</strong><br>
          Wenn sich <span class="katex-render" data-display="false" data-latex="x">x</span> von 1 auf 2 verdoppelt, sinkt <span class="katex-render" data-display="false" data-latex="y">y</span> von 72,0 auf 18,0 N. Da <span class="katex-render" data-display="false" data-latex="\\frac{72}{18} = 4 = 2^2">72/18 = 4</span>, sinkt <span class="katex-render" data-display="false" data-latex="y">y</span> auf ein Viertel.<br>
          Wenn sich <span class="katex-render" data-display="false" data-latex="x">x</span> von 2 auf 4 verdoppelt, sinkt <span class="katex-render" data-display="false" data-latex="y">y</span> von 18,0 auf 4,5 N (<span class="katex-render" data-display="false" data-latex="\\frac{18}{4,5} = 4">18/4,5 = 4</span>).<br>
          &rarr; <em>Vermutung:</em> Potenzfunktion mit Exponent -2: <span class="katex-render" data-display="false" data-latex="y \\sim \\frac{1}{x^2} \\iff y = \\frac{k}{x^2}">y = k/x²</span>.<br><br>

          <strong>Schritt 2 &amp; 3: Konstantenprodukt berechnen</strong><br>
          Wir berechnen in der 3. Zeile das Produkt <span class="katex-render" data-display="false" data-latex="k = y \\cdot x^2">k = y · x²</span>:<br>
          • <span class="katex-render" data-display="false" data-latex="x = 1\\,\\text{m}: 72,0 \\cdot 1^2 = 72,0\\,\\text{N}\\cdot\\text{m}^2">k = 72,0</span><br>
          • <span class="katex-render" data-display="false" data-latex="x = 2\\,\\text{m}: 18,0 \\cdot 2^2 = 18,0 \\cdot 4 = 72,0\\,\\text{N}\\cdot\\text{m}^2">k = 72,0</span><br>
          • <span class="katex-render" data-display="false" data-latex="x = 3\\,\\text{m}: 8,0 \\cdot 3^2 = 8,0 \\cdot 9 = 72,0\\,\\text{N}\\cdot\\text{m}^2">k = 72,0</span><br>
          • <span class="katex-render" data-display="false" data-latex="x = 4\\,\\text{m}: 4,5 \\cdot 4^2 = 4,5 \\cdot 16 = 72,0\\,\\text{N}\\cdot\\text{m}^2">k = 72,0</span><br>
          Die Werte sind exakt konstant: <span class="katex-render" data-display="false" data-latex="\\bar{k} = 72,0\\,\\text{N}\\cdot\\text{m}^2">k_mittel = 72,0 N•m²</span>.<br><br>

          <strong>Schritt 4: Funktionsgleichung formulieren</strong><br>
          <div class="katex-render" data-display="true" data-latex="y(x) = \\frac{72,0\\,\\text{N}\\cdot\\text{m}^2}{x^2} = 72,0 \\cdot x^{-2}\\,\\text{N}\\cdot\\text{m}^2 \\quad (R^2 = 1,0)"></div>
        `
      },
      {
        title: 'Übungsaufgabe 2 (Klausur-Typ): Plattenkondensator F(U) mit CAS-Auswertung & Theorieabgleich',
        prompt: `
          Im Praktikum wird die Kraft F zwischen zwei Kondensatorplatten (Abstand d = 5,0 mm, Radius r = 7,5 cm) in Abhängigkeit von der Hochspannung U gemessen:
          <table style="width:100%; border-collapse:collapse; margin:0.8rem 0; font-size:0.88rem; text-align:center;">
            <tr style="background:var(--bg-subtle);">
              <th style="border:1px solid var(--border-subtle); padding:0.4rem;">U in kV</th>
              <td style="border:1px solid var(--border-subtle); padding:0.4rem;">1,0</td>
              <td style="border:1px solid var(--border-subtle); padding:0.4rem;">2,0</td>
              <td style="border:1px solid var(--border-subtle); padding:0.4rem;">3,0</td>
              <td style="border:1px solid var(--border-subtle); padding:0.4rem;">4,0</td>
              <td style="border:1px solid var(--border-subtle); padding:0.4rem;">5,0</td>
            </tr>
            <tr>
              <th style="border:1px solid var(--border-subtle); padding:0.4rem;">F in mN</th>
              <td style="border:1px solid var(--border-subtle); padding:0.4rem;">9,0</td>
              <td style="border:1px solid var(--border-subtle); padding:0.4rem;">35,5</td>
              <td style="border:1px solid var(--border-subtle); padding:0.4rem;">80,0</td>
              <td style="border:1px solid var(--border-subtle); padding:0.4rem;">142,0</td>
              <td style="border:1px solid var(--border-subtle); padding:0.4rem;">222,5</td>
            </tr>
          </table>
          <strong>Aufgaben:</strong><br>
          a) Begründe anhand der Verdopplung den Funktionstyp.<br>
          b) Erstelle eine k-Spalte (k = F/U²) und berechne den Mittelwert k̄ mit TI-Nspire CAS.<br>
          c) Beschreibe die Linearisierung und gib die Steigung m der Ausgleichsgerade an.<br>
          d) Vergleiche den experimentellen Mittelwert k̄ mit der theoretischen Formel k_theor = ½ ε₀ (A/d²).
        `,
        solution: `
          <strong>a) Verdopplungsprüfung:</strong><br>
          Bei Verdopplung von <span class="katex-render" data-display="false" data-latex="U = 2{,}0\\,\\text{kV}">U = 2,0 kV</span> auf <span class="katex-render" data-display="false" data-latex="U = 4{,}0\\,\\text{kV}">U = 4,0 kV</span> steigt <span class="katex-render" data-display="false" data-latex="F">F</span> von <span class="katex-render" data-display="false" data-latex="35{,}5\\,\\text{mN}">35,5 mN</span> auf <span class="katex-render" data-display="false" data-latex="142{,}0\\,\\text{mN}">142,0 mN</span>.<br>
          Wachstumsfaktor: <span class="katex-render" data-display="false" data-latex="\\frac{142{,}0}{35{,}5} = 4{,}0 = 2^2">142/35,5 = 4</span>.<br>
          &rarr; <em>Hypothese:</em> Quadratischer Zusammenhang <span class="katex-render" data-display="false" data-latex="F \\sim U^2 \\iff \\frac{F}{U^2} = k = \\text{const.}">F ~ U²</span>.<br><br>

          <strong>b) Konstantenprüfung &amp; CAS-Eingabe:</strong><br>
          Spalte C anlegen mit Formel <code style="color:#fde047;">=f / (u^2)</code>:<br>
          • <span class="katex-render" data-display="false" data-latex="U = 1{,}0\\,\\text{kV}: k_1 = \\frac{9{,}0}{1^2} = 9{,}00\\,\\frac{\\text{mN}}{\\text{kV}^2}">k1 = 9,00</span><br>
          • <span class="katex-render" data-display="false" data-latex="U = 2{,}0\\,\\text{kV}: k_2 = \\frac{35{,}5}{4} = 8{,}875\\,\\frac{\\text{mN}}{\\text{kV}^2}">k2 = 8,875</span><br>
          • <span class="katex-render" data-display="false" data-latex="U = 3{,}0\\,\\text{kV}: k_3 = \\frac{80{,}0}{9} = 8{,}889\\,\\frac{\\text{mN}}{\\text{kV}^2}">k3 = 8,889</span><br>
          • <span class="katex-render" data-display="false" data-latex="U = 4{,}0\\,\\text{kV}: k_4 = \\frac{142{,}0}{16} = 8{,}875\\,\\frac{\\text{mN}}{\\text{kV}^2}">k4 = 8,875</span><br>
          • <span class="katex-render" data-display="false" data-latex="U = 5{,}0\\,\\text{kV}: k_5 = \\frac{222{,}5}{25} = 8{,}900\\,\\frac{\\text{mN}}{\\text{kV}^2}">k5 = 8,900</span><br><br>
          CAS-Befehl: <code style="color:#fde047;">mean(c[])</code> &rarr; <span class="katex-render" data-display="false" data-latex="\\bar{k} = 8{,}908\\,\\frac{\\text{mN}}{\\text{kV}^2} \\approx 8{,}89\\,\\frac{\\text{mN}}{\\text{kV}^2} = 8{,}89 \\cdot 10^{-9}\\,\\frac{\\text{N}}{\\text{V}^2}">k̄ = 8,89 mN/kV²</span>.<br>
          Die Werte weichen maximal um 1% voneinander ab &rarr; Konstanz bestätigt!<br><br>

          <strong>c) Linearisierung &amp; Regression:</strong><br>
          Man trägt <span class="katex-render" data-display="false" data-latex="F">F</span> über <span class="katex-render" data-display="false" data-latex="U^2">U²</span> auf. Der Graph ist eine Ursprungsgerade mit Steigung <span class="katex-render" data-display="false" data-latex="m = \\bar{k} = 8{,}89\\,\\frac{\\text{mN}}{\\text{kV}^2}">m = 8,89 mN/kV²</span>.<br>
          Im CAS: <code>LinRegMx(u2, f)</code> liefert <span class="katex-render" data-display="false" data-latex="r^2 = 0{,}99998">r² = 0,99998</span>.<br><br>

          <strong>d) Theoretischer Abgleich:</strong><br>
          Fläche: <span class="katex-render" data-display="false" data-latex="A = \\pi \\cdot r^2 = \\pi \\cdot (0{,}075\\,\\text{m})^2 = 0{,}01767\\,\\text{m}^2">A = 0,01767 m²</span>.<br>
          Abstand: <span class="katex-render" data-display="false" data-latex="d = 5{,}0\\,\\text{mm} = 0{,}0050\\,\\text{m} \\implies d^2 = 2{,}5 \\cdot 10^{-5}\\,\\text{m}^2">d = 0,0050 m</span>.<br>
          <div class="katex-render" data-display="true" data-latex="k_{\\text{theor}} = \\frac{1}{2}\\varepsilon_0 \\frac{A}{d^2} = \\frac{1}{2} \\cdot 8{,}854 \\cdot 10^{-12} \\cdot \\frac{0{,}01767}{2{,}5 \\cdot 10^{-5}} = 3{,}13 \\cdot 10^{-9}\\,\\frac{\\text{N}}{\\text{V}^2} = 3{,}13\\,\\frac{\\text{mN}}{\\text{kV}^2}"></div>
        `
      },
      {
        title: 'Übungsaufgabe 3 (Klausur-Typ): Coulomb-Kraft F(r) mit CAS-Konstantenprüfung & Ladungsbestimmung',
        prompt: `
          Zwei gleich große Kugeln mit identischer Ladung Q befinden sich im Abstand r. Die gemessenen Coulomb-Kräfte betragen:
          <table style="width:100%; border-collapse:collapse; margin:0.8rem 0; font-size:0.88rem; text-align:center;">
            <tr style="background:var(--bg-subtle);">
              <th style="border:1px solid var(--border-subtle); padding:0.4rem;">r in cm</th>
              <td style="border:1px solid var(--border-subtle); padding:0.4rem;">2,0</td>
              <td style="border:1px solid var(--border-subtle); padding:0.4rem;">3,0</td>
              <td style="border:1px solid var(--border-subtle); padding:0.4rem;">4,0</td>
              <td style="border:1px solid var(--border-subtle); padding:0.4rem;">5,0</td>
              <td style="border:1px solid var(--border-subtle); padding:0.4rem;">8,0</td>
            </tr>
            <tr>
              <th style="border:1px solid var(--border-subtle); padding:0.4rem;">F in mN</th>
              <td style="border:1px solid var(--border-subtle); padding:0.4rem;">162,5</td>
              <td style="border:1px solid var(--border-subtle); padding:0.4rem;">72,2</td>
              <td style="border:1px solid var(--border-subtle); padding:0.4rem;">40,6</td>
              <td style="border:1px solid var(--border-subtle); padding:0.4rem;">26,0</td>
              <td style="border:1px solid var(--border-subtle); padding:0.4rem;">10,2</td>
            </tr>
          </table>
          <strong>Aufgaben:</strong><br>
          a) Bestätige durch Konstantenprüfung mit dem TI-Nspire CAS, dass F ~ 1/r² gilt.<br>
          b) Ermittle den Mittelwert k̄ in SI-Einheiten (N•m²).<br>
          c) Berechne die Ladung Q jeder Kugel mittels CAS-Befehl solve.
        `,
        solution: `
          <strong>a) Konstantenprüfung im CAS:</strong><br>
          Spalte C mit Formel <code style="color:#fde047;">=f * (r^2)</code> anlegen:<br>
          • <span class="katex-render" data-display="false" data-latex="r = 2{,}0\\,\\text{cm}: 162{,}5 \\cdot 4 = 650{,}0\\,\\text{mN}\\cdot\\text{cm}^2">k1 = 650,0</span><br>
          • <span class="katex-render" data-display="false" data-latex="r = 3{,}0\\,\\text{cm}: 72{,}2 \\cdot 9 = 649{,}8\\,\\text{mN}\\cdot\\text{cm}^2">k2 = 649,8</span><br>
          • <span class="katex-render" data-display="false" data-latex="r = 4{,}0\\,\\text{cm}: 40{,}6 \\cdot 16 = 649{,}6\\,\\text{mN}\\cdot\\text{cm}^2">k3 = 649,6</span><br>
          • <span class="katex-render" data-display="false" data-latex="r = 5{,}0\\,\\text{cm}: 26{,}0 \\cdot 25 = 650{,}0\\,\\text{mN}\\cdot\\text{cm}^2">k4 = 650,0</span><br>
          • <span class="katex-render" data-display="false" data-latex="r = 8{,}0\\,\\text{cm}: 10{,}2 \\cdot 64 = 652{,}8\\,\\text{mN}\\cdot\\text{cm}^2">k5 = 652,8</span><br><br>

          <strong>b) Mittelwert in SI-Einheiten:</strong><br>
          <span class="katex-render" data-display="false" data-latex="\\bar{k} = 650{,}44\\,\\text{mN}\\cdot\\text{cm}^2 = 650{,}44 \\cdot 10^{-3}\\,\\text{N} \\cdot (10^{-2}\\,\\text{m})^2 = 6{,}504 \\cdot 10^{-5}\\,\\text{N}\\cdot\\text{m}^2">k̄ = 6,504 • 10⁻⁵ N m²</span>.<br><br>

          <strong>c) Ladungsberechnung mit CAS:</strong><br>
          Nach Coulomb gilt: <span class="katex-render" data-display="false" data-latex="F = \\frac{1}{4\\pi\\varepsilon_0} \\cdot \\frac{Q^2}{r^2} \\implies k = \\frac{1}{4\\pi\\varepsilon_0} \\cdot Q^2">k = 1/(4πε₀) • Q²</span>.<br>
          CAS-Eingabe: <code style="color:#fde047;">solve(6.504e-5 = 8.988e9 * q^2, q) and q>0</code><br>
          <div class="katex-render" data-display="true" data-latex="Q = \\sqrt{\\frac{6{,}504 \\cdot 10^{-5}}{8{,}988 \\cdot 10^9}} = \\sqrt{7{,}236 \\cdot 10^{-15}} \\approx 8{,}51 \\cdot 10^{-8}\\,\\text{C} = 85{,}1\\,\\text{nC}"></div>
          <strong style="color:#10b981;">Ergebnis:</strong> Jede Kugel trägt eine Ladung von <strong>Q ≈ 85,1 nC</strong>.
        `
      },
      {
        title: 'Übungsaufgabe 4 (Klausur-Typ): Drahtwiderstand R(A) & Antiproportionalitätsnachweis',
        prompt: `
          Für Konstantandrähte gleicher Länge l = 50 m aber unterschiedlichem Querschnitt A wird der elektrische Widerstand R gemessen:
          <table style="width:100%; border-collapse:collapse; margin:0.8rem 0; font-size:0.88rem; text-align:center;">
            <tr style="background:var(--bg-subtle);">
              <th style="border:1px solid var(--border-subtle); padding:0.4rem;">A in mm²</th>
              <td style="border:1px solid var(--border-subtle); padding:0.4rem;">0,10</td>
              <td style="border:1px solid var(--border-subtle); padding:0.4rem;">0,20</td>
              <td style="border:1px solid var(--border-subtle); padding:0.4rem;">0,50</td>
              <td style="border:1px solid var(--border-subtle); padding:0.4rem;">1,00</td>
            </tr>
            <tr>
              <th style="border:1px solid var(--border-subtle); padding:0.4rem;">R in Ω</th>
              <td style="border:1px solid var(--border-subtle); padding:0.4rem;">245,0</td>
              <td style="border:1px solid var(--border-subtle); padding:0.4rem;">122,5</td>
              <td style="border:1px solid var(--border-subtle); padding:0.4rem;">49,0</td>
              <td style="border:1px solid var(--border-subtle); padding:0.4rem;">24,5</td>
            </tr>
          </table>
          a) Weise Antiproportionalität R ~ 1/A über Produktgleichheit nach.<br>
          b) Berechne den spezifischen elektrischen Widerstand ρ des Drahtmaterials.
        `,
        solution: `
          <strong>a) Produktgleichheit k = R • A:</strong><br>
          • 0,10 mm² • 245,0 Ω = 24,5 Ω•mm²<br>
          • 0,20 mm² • 122,5 Ω = 24,5 Ω•mm²<br>
          • 0,50 mm² • 49,0 Ω = 24,5 Ω•mm²<br>
          • 1,00 mm² • 24,5 Ω = 24,5 Ω•mm²<br>
          Alle Produkte sind exakt identisch: <span class="katex-render" data-display="false" data-latex="k = 24{,}5\\,\\Omega\\cdot\\text{mm}^2 = \\text{const.}">k = 24,5 Ω mm²</span>.<br><br>

          <strong>b) Spezifischer Widerstand ρ:</strong><br>
          Formel: <span class="katex-render" data-display="false" data-latex="R = \\rho \\cdot \\frac{l}{A} \\implies \\rho = \\frac{R \\cdot A}{l} = \\frac{k}{l}">ρ = (R • A) / l</span>.<br>
          <div class="katex-render" data-display="true" data-latex="\\rho = \\frac{24{,}5\\,\\Omega\\cdot\\text{mm}^2}{50\\,\\text{m}} = 0{,}49\\,\\frac{\\Omega\\cdot\\text{mm}^2}{\\text{m}}"></div>
          <strong style="color:#10b981;">Ergebnis:</strong> Das Material hat einen spezifischen Widerstand von <span class="katex-render" data-display="false" data-latex="\\rho = 0{,}49\\,\\frac{\\Omega\\cdot\\text{mm}^2}{\\text{m}}">ρ = 0,49</span> (typisch für Konstantan).
        `
      }
,
      {
        title: 'Übungsaufgabe 2 (Klausur-Typ): Plattenkondensator F(U) mit CAS-Auswertung & Theorieabgleich',
        prompt: `
          Im Praktikum wird die Kraft F zwischen zwei Kondensatorplatten (Abstand d = 5,0 mm, Radius r = 7,5 cm) in Abhängigkeit von der Hochspannung U gemessen:
          <table style="width:100%; border-collapse:collapse; margin:0.8rem 0; font-size:0.88rem; text-align:center;">
            <tr style="background:var(--bg-subtle);">
              <th style="border:1px solid var(--border-subtle); padding:0.4rem;">U in kV</th>
              <td style="border:1px solid var(--border-subtle); padding:0.4rem;">1,0</td>
              <td style="border:1px solid var(--border-subtle); padding:0.4rem;">2,0</td>
              <td style="border:1px solid var(--border-subtle); padding:0.4rem;">3,0</td>
              <td style="border:1px solid var(--border-subtle); padding:0.4rem;">4,0</td>
              <td style="border:1px solid var(--border-subtle); padding:0.4rem;">5,0</td>
            </tr>
            <tr>
              <th style="border:1px solid var(--border-subtle); padding:0.4rem;">F in mN</th>
              <td style="border:1px solid var(--border-subtle); padding:0.4rem;">9,0</td>
              <td style="border:1px solid var(--border-subtle); padding:0.4rem;">35,5</td>
              <td style="border:1px solid var(--border-subtle); padding:0.4rem;">80,0</td>
              <td style="border:1px solid var(--border-subtle); padding:0.4rem;">142,0</td>
              <td style="border:1px solid var(--border-subtle); padding:0.4rem;">222,5</td>
            </tr>
          </table>
          <strong>Aufgaben:</strong><br>
          a) Begründe anhand der Verdopplung den Funktionstyp.<br>
          b) Erstelle eine k-Spalte (k = F/U²) und berechne den Mittelwert k̄ mit TI-Nspire CAS.<br>
          c) Beschreibe die Linearisierung und gib die Steigung m der Ausgleichsgerade an.<br>
          d) Vergleiche den experimentellen Mittelwert k̄ mit der theoretischen Formel k_theor = ½ ε₀ (A/d²).
        `,
        solution: `
          <strong>a) Verdopplungsprüfung:</strong><br>
          Bei Verdopplung von <span class="katex-render" data-display="false" data-latex="U = 2{,}0\\,\\text{kV}">U = 2,0 kV</span> auf <span class="katex-render" data-display="false" data-latex="U = 4{,}0\\,\\text{kV}">U = 4,0 kV</span> steigt <span class="katex-render" data-display="false" data-latex="F">F</span> von <span class="katex-render" data-display="false" data-latex="35{,}5\\,\\text{mN}">35,5 mN</span> auf <span class="katex-render" data-display="false" data-latex="142{,}0\\,\\text{mN}">142,0 mN</span>.<br>
          Wachstumsfaktor: <span class="katex-render" data-display="false" data-latex="\\frac{142{,}0}{35{,}5} = 4{,}0 = 2^2">142/35,5 = 4</span>.<br>
          &rarr; <em>Hypothese:</em> Quadratischer Zusammenhang <span class="katex-render" data-display="false" data-latex="F \\sim U^2 \\iff \\frac{F}{U^2} = k = \\text{const.}">F ~ U²</span>.<br><br>

          <strong>b) Konstantenprüfung &amp; CAS-Eingabe:</strong><br>
          Spalte C anlegen mit Formel <code style="color:#fde047;">=f / (u^2)</code>:<br>
          • <span class="katex-render" data-display="false" data-latex="U = 1{,}0\\,\\text{kV}: k_1 = \\frac{9{,}0}{1^2} = 9{,}00\\,\\frac{\\text{mN}}{\\text{kV}^2}">k1 = 9,00</span><br>
          • <span class="katex-render" data-display="false" data-latex="U = 2{,}0\\,\\text{kV}: k_2 = \\frac{35{,}5}{4} = 8{,}875\\,\\frac{\\text{mN}}{\\text{kV}^2}">k2 = 8,875</span><br>
          • <span class="katex-render" data-display="false" data-latex="U = 3{,}0\\,\\text{kV}: k_3 = \\frac{80{,}0}{9} = 8{,}889\\,\\frac{\\text{mN}}{\\text{kV}^2}">k3 = 8,889</span><br>
          • <span class="katex-render" data-display="false" data-latex="U = 4{,}0\\,\\text{kV}: k_4 = \\frac{142{,}0}{16} = 8{,}875\\,\\frac{\\text{mN}}{\\text{kV}^2}">k4 = 8,875</span><br>
          • <span class="katex-render" data-display="false" data-latex="U = 5{,}0\\,\\text{kV}: k_5 = \\frac{222{,}5}{25} = 8{,}900\\,\\frac{\\text{mN}}{\\text{kV}^2}">k5 = 8,900</span><br><br>
          CAS-Befehl: <code style="color:#fde047;">mean(c[])</code> &rarr; <span class="katex-render" data-display="false" data-latex="\\bar{k} = 8{,}908\\,\\frac{\\text{mN}}{\\text{kV}^2} \\approx 8{,}89\\,\\frac{\\text{mN}}{\\text{kV}^2} = 8{,}89 \\cdot 10^{-9}\\,\\frac{\\text{N}}{\\text{V}^2}">k̄ = 8,89 mN/kV²</span>.<br>
          Die Werte weichen maximal um 1% voneinander ab &rarr; Konstanz bestätigt!<br><br>

          <strong>c) Linearisierung &amp; Regression:</strong><br>
          Man trägt <span class="katex-render" data-display="false" data-latex="F">F</span> über <span class="katex-render" data-display="false" data-latex="U^2">U²</span> auf. Der Graph ist eine Ursprungsgerade mit Steigung <span class="katex-render" data-display="false" data-latex="m = \\bar{k} = 8{,}89\\,\\frac{\\text{mN}}{\\text{kV}^2}">m = 8,89 mN/kV²</span>.<br>
          Im CAS: <code>LinRegMx(u2, f)</code> liefert <span class="katex-render" data-display="false" data-latex="r^2 = 0{,}99998">r² = 0,99998</span>.<br><br>

          <strong>d) Theoretischer Abgleich:</strong><br>
          Fläche: <span class="katex-render" data-display="false" data-latex="A = \\pi \\cdot r^2 = \\pi \\cdot (0{,}075\\,\\text{m})^2 = 0{,}01767\\,\\text{m}^2">A = 0,01767 m²</span>.<br>
          Abstand: <span class="katex-render" data-display="false" data-latex="d = 5{,}0\\,\\text{mm} = 0{,}0050\\,\\text{m} \\implies d^2 = 2{,}5 \\cdot 10^{-5}\\,\\text{m}^2">d = 0,0050 m</span>.<br>
          <div class="katex-render" data-display="true" data-latex="k_{\\text{theor}} = \\frac{1}{2}\\varepsilon_0 \\frac{A}{d^2} = \\frac{1}{2} \\cdot 8{,}854 \\cdot 10^{-12} \\cdot \\frac{0{,}01767}{2{,}5 \\cdot 10^{-5}} = 3{,}13 \\cdot 10^{-9}\\,\\frac{\\text{N}}{\\text{V}^2} = 3{,}13\\,\\frac{\\text{mN}}{\\text{kV}^2}"></div>
        `
      },
      {
        title: 'Übungsaufgabe 3 (Klausur-Typ): Coulomb-Kraft F(r) mit CAS-Konstantenprüfung & Ladungsbestimmung',
        prompt: `
          Zwei gleich große Kugeln mit identischer Ladung Q befinden sich im Abstand r. Die gemessenen Coulomb-Kräfte betragen:
          <table style="width:100%; border-collapse:collapse; margin:0.8rem 0; font-size:0.88rem; text-align:center;">
            <tr style="background:var(--bg-subtle);">
              <th style="border:1px solid var(--border-subtle); padding:0.4rem;">r in cm</th>
              <td style="border:1px solid var(--border-subtle); padding:0.4rem;">2,0</td>
              <td style="border:1px solid var(--border-subtle); padding:0.4rem;">3,0</td>
              <td style="border:1px solid var(--border-subtle); padding:0.4rem;">4,0</td>
              <td style="border:1px solid var(--border-subtle); padding:0.4rem;">5,0</td>
              <td style="border:1px solid var(--border-subtle); padding:0.4rem;">8,0</td>
            </tr>
            <tr>
              <th style="border:1px solid var(--border-subtle); padding:0.4rem;">F in mN</th>
              <td style="border:1px solid var(--border-subtle); padding:0.4rem;">162,5</td>
              <td style="border:1px solid var(--border-subtle); padding:0.4rem;">72,2</td>
              <td style="border:1px solid var(--border-subtle); padding:0.4rem;">40,6</td>
              <td style="border:1px solid var(--border-subtle); padding:0.4rem;">26,0</td>
              <td style="border:1px solid var(--border-subtle); padding:0.4rem;">10,2</td>
            </tr>
          </table>
          <strong>Aufgaben:</strong><br>
          a) Bestätige durch Konstantenprüfung mit dem TI-Nspire CAS, dass F ~ 1/r² gilt.<br>
          b) Ermittle den Mittelwert k̄ in SI-Einheiten (N•m²).<br>
          c) Berechne die Ladung Q jeder Kugel mittels CAS-Befehl solve.
        `,
        solution: `
          <strong>a) Konstantenprüfung im CAS:</strong><br>
          Spalte C mit Formel <code style="color:#fde047;">=f * (r^2)</code> anlegen:<br>
          • <span class="katex-render" data-display="false" data-latex="r = 2{,}0\\,\\text{cm}: 162{,}5 \\cdot 4 = 650{,}0\\,\\text{mN}\\cdot\\text{cm}^2">k1 = 650,0</span><br>
          • <span class="katex-render" data-display="false" data-latex="r = 3{,}0\\,\\text{cm}: 72{,}2 \\cdot 9 = 649{,}8\\,\\text{mN}\\cdot\\text{cm}^2">k2 = 649,8</span><br>
          • <span class="katex-render" data-display="false" data-latex="r = 4{,}0\\,\\text{cm}: 40{,}6 \\cdot 16 = 649{,}6\\,\\text{mN}\\cdot\\text{cm}^2">k3 = 649,6</span><br>
          • <span class="katex-render" data-display="false" data-latex="r = 5{,}0\\,\\text{cm}: 26{,}0 \\cdot 25 = 650{,}0\\,\\text{mN}\\cdot\\text{cm}^2">k4 = 650,0</span><br>
          • <span class="katex-render" data-display="false" data-latex="r = 8{,}0\\,\\text{cm}: 10{,}2 \\cdot 64 = 652{,}8\\,\\text{mN}\\cdot\\text{cm}^2">k5 = 652,8</span><br><br>

          <strong>b) Mittelwert in SI-Einheiten:</strong><br>
          <span class="katex-render" data-display="false" data-latex="\\bar{k} = 650{,}44\\,\\text{mN}\\cdot\\text{cm}^2 = 650{,}44 \\cdot 10^{-3}\\,\\text{N} \\cdot (10^{-2}\\,\\text{m})^2 = 6{,}504 \\cdot 10^{-5}\\,\\text{N}\\cdot\\text{m}^2">k̄ = 6,504 • 10⁻⁵ N m²</span>.<br><br>

          <strong>c) Ladungsberechnung mit CAS:</strong><br>
          Nach Coulomb gilt: <span class="katex-render" data-display="false" data-latex="F = \\frac{1}{4\\pi\\varepsilon_0} \\cdot \\frac{Q^2}{r^2} \\implies k = \\frac{1}{4\\pi\\varepsilon_0} \\cdot Q^2">k = 1/(4πε₀) • Q²</span>.<br>
          CAS-Eingabe: <code style="color:#fde047;">solve(6.504e-5 = 8.988e9 * q^2, q) and q>0</code><br>
          <div class="katex-render" data-display="true" data-latex="Q = \\sqrt{\\frac{6{,}504 \\cdot 10^{-5}}{8{,}988 \\cdot 10^9}} = \\sqrt{7{,}236 \\cdot 10^{-15}} \\approx 8{,}51 \\cdot 10^{-8}\\,\\text{C} = 85{,}1\\,\\text{nC}"></div>
          <strong style="color:#10b981;">Ergebnis:</strong> Jede Kugel trägt eine Ladung von <strong>Q ≈ 85,1 nC</strong>.
        `
      },
      {
        title: 'Übungsaufgabe 4 (Klausur-Typ): Drahtwiderstand R(A) & Antiproportionalitätsnachweis',
        prompt: `
          Für Konstantandrähte gleicher Länge l = 50 m aber unterschiedlichem Querschnitt A wird der elektrische Widerstand R gemessen:
          <table style="width:100%; border-collapse:collapse; margin:0.8rem 0; font-size:0.88rem; text-align:center;">
            <tr style="background:var(--bg-subtle);">
              <th style="border:1px solid var(--border-subtle); padding:0.4rem;">A in mm²</th>
              <td style="border:1px solid var(--border-subtle); padding:0.4rem;">0,10</td>
              <td style="border:1px solid var(--border-subtle); padding:0.4rem;">0,20</td>
              <td style="border:1px solid var(--border-subtle); padding:0.4rem;">0,50</td>
              <td style="border:1px solid var(--border-subtle); padding:0.4rem;">1,00</td>
            </tr>
            <tr>
              <th style="border:1px solid var(--border-subtle); padding:0.4rem;">R in Ω</th>
              <td style="border:1px solid var(--border-subtle); padding:0.4rem;">245,0</td>
              <td style="border:1px solid var(--border-subtle); padding:0.4rem;">122,5</td>
              <td style="border:1px solid var(--border-subtle); padding:0.4rem;">49,0</td>
              <td style="border:1px solid var(--border-subtle); padding:0.4rem;">24,5</td>
            </tr>
          </table>
          a) Weise Antiproportionalität R ~ 1/A über Produktgleichheit nach.<br>
          b) Berechne den spezifischen elektrischen Widerstand ρ des Drahtmaterials.
        `,
        solution: `
          <strong>a) Produktgleichheit k = R • A:</strong><br>
          • 0,10 mm² • 245,0 Ω = 24,5 Ω•mm²<br>
          • 0,20 mm² • 122,5 Ω = 24,5 Ω•mm²<br>
          • 0,50 mm² • 49,0 Ω = 24,5 Ω•mm²<br>
          • 1,00 mm² • 24,5 Ω = 24,5 Ω•mm²<br>
          Alle Produkte sind exakt identisch: <span class="katex-render" data-display="false" data-latex="k = 24{,}5\\,\\Omega\\cdot\\text{mm}^2 = \\text{const.}">k = 24,5 Ω mm²</span>.<br><br>

          <strong>b) Spezifischer Widerstand ρ:</strong><br>
          Formel: <span class="katex-render" data-display="false" data-latex="R = \\rho \\cdot \\frac{l}{A} \\implies \\rho = \\frac{R \\cdot A}{l} = \\frac{k}{l}">ρ = (R • A) / l</span>.<br>
          <div class="katex-render" data-display="true" data-latex="\\rho = \\frac{24{,}5\\,\\Omega\\cdot\\text{mm}^2}{50\\,\\text{m}} = 0{,}49\\,\\frac{\\Omega\\cdot\\text{mm}^2}{\\text{m}}"></div>
          <strong style="color:#10b981;">Ergebnis:</strong> Das Material hat einen spezifischen Widerstand von <span class="katex-render" data-display="false" data-latex="\\rho = 0{,}49\\,\\frac{\\Omega\\cdot\\text{mm}^2}{\\text{m}}">ρ = 0,49</span> (typisch für Konstantan).
        `
      }

    ]
  },

  {
    id: 'messwerte-auswerten-2',
    folderId: 'ordner-funktionen',
    num: '02',
    icon: '📊',
    color: '#0284c7',
    tag: 'Klausurblatt S. 33',
    title: 'Klausurblatt: Auswerten von Messwerten II (Originalblatt S. 33)',
    desc: 'Original-Arbeitsblatt aus Meds.pdf S. 33 vollständig gelöst: 1. Coulomb-Abstand F(r), 2. Kondensatorkraft F(U) mit Theorieprüfung, 3. Entladekurve I(t) & Integral.',
    visualHtml: `
      <div class="formula-hero-card" style="border-left: 6px solid #0284c7;">
        <span class="formula-hero-badge" style="background: rgba(2, 132, 199, 0.15); color: #0284c7;">
          📑 ORIGINAL IGS GÖTTINGEN KLAUSURBLATT (MEDS.PDF S. 33)
        </span>
        <p style="font-size: 0.9rem; color: var(--text-secondary); margin: 0.6rem 0; line-height: 1.5;">
          Dieses Blatt enthält die exakten Prüfungsaufgaben zur quantitativen Messwertauswertung in der Oberstufe. Alle 3 Aufgaben sind hier mit Musterlösung, Zwischenschritten und physikalischer Theorieprobe vorbereitet.
        </p>
      </div>
    `,
    summary: 'Auswertung von 3 Messreihen: Coulomb-Kraft F ~ 1/r², Plattenkraft F ~ U² und Kondensatorentladung als e-Funktion mit Integralberechnung der Ladung.',
    takeaways: [
      'Aufgabe 1 zeigt: F • r² ≈ 650 mN • cm² = const. (Coulombsches Gesetz).',
      'Aufgabe 2 zeigt: F / U² ≈ 8,86 mN / kV² = const. (Quadratische Spannungsabhängigkeit).',
      'Aufgabe 3 zeigt: I(t) = 50 µA • e^(-t / 21,82 s). Die Ladung ist das Integral Q = ∫ I(t) dt.'
    ],
    tasks: [
      {
        title: 'Aufgabe 1 (S. 33): Kraft zwischen zwei geladenen Kugeln F(r)',
        prompt: `
          Die Kraft zwischen zwei geladenen Kugeln wird in Abhängigkeit von ihrer Entfernung r untersucht:
          <table style="width:100%; border-collapse:collapse; margin:0.8rem 0; font-size:0.86rem; text-align:center;">
            <tr style="background:var(--bg-subtle);">
              <th style="border:1px solid var(--border-subtle); padding:0.4rem;">r in cm</th>
              <td style="border:1px solid var(--border-subtle); padding:0.4rem;">10</td>
              <td style="border:1px solid var(--border-subtle); padding:0.4rem;">15</td>
              <td style="border:1px solid var(--border-subtle); padding:0.4rem;">20</td>
              <td style="border:1px solid var(--border-subtle); padding:0.4rem;">25</td>
              <td style="border:1px solid var(--border-subtle); padding:0.4rem;">30</td>
              <td style="border:1px solid var(--border-subtle); padding:0.4rem;">40</td>
            </tr>
            <tr>
              <th style="border:1px solid var(--border-subtle); padding:0.4rem;">F in mN</th>
              <td style="border:1px solid var(--border-subtle); padding:0.4rem;">6,5</td>
              <td style="border:1px solid var(--border-subtle); padding:0.4rem;">2,9</td>
              <td style="border:1px solid var(--border-subtle); padding:0.4rem;">1,62</td>
              <td style="border:1px solid var(--border-subtle); padding:0.4rem;">1,04</td>
              <td style="border:1px solid var(--border-subtle); padding:0.4rem;">0,72</td>
              <td style="border:1px solid var(--border-subtle); padding:0.4rem;">0,41</td>
            </tr>
          </table>
          a) Ermittle den funktionalen Zusammenhang F(r) mit konstanter Größe in der 3. Zeile.<br>
          b) Wie groß ist die Kraft für r = 5 cm und für r = 1 cm?
        `,
        solution: `
          <strong>a) Ermittlung des funktionalen Zusammenhangs:</strong><br>
          1. <em>Vermutung:</em> Bei Verdopplung von <span class="katex-render" data-display="false" data-latex="r">r</span> von 10 cm auf 20 cm sinkt <span class="katex-render" data-display="false" data-latex="F">F</span> von 6,5 mN auf 1,62 mN (Faktor <span class="katex-render" data-display="false" data-latex="\\frac{6,5}{1,62} \\approx 4,01 \\approx 2^2">6,5/1,62 ≈ 4</span>).<br>
          Vermutung: Potenzfunktion <span class="katex-render" data-display="false" data-latex="F(r) \\sim \\frac{1}{r^2} \\iff F \\cdot r^2 = \\text{const.}">F ~ 1/r²</span>.<br><br>
          2. <em>Berechnung der 3. Zeile (<span class="katex-render" data-display="false" data-latex="k = F \\cdot r^2">k = F · r²</span> in <span class="katex-render" data-display="false" data-latex="\\text{mN}\\cdot\\text{cm}^2">mN · cm²</span>):</em><br>
          • <span class="katex-render" data-display="false" data-latex="r = 10: 6,5 \\cdot 10^2 = 650\\,\\text{mN}\\cdot\\text{cm}^2">r=10: 650</span><br>
          • <span class="katex-render" data-display="false" data-latex="r = 15: 2,9 \\cdot 15^2 = 2,9 \\cdot 225 = 652,5\\,\\text{mN}\\cdot\\text{cm}^2">r=15: 652,5</span><br>
          • <span class="katex-render" data-display="false" data-latex="r = 20: 1,62 \\cdot 20^2 = 1,62 \\cdot 400 = 648,0\\,\\text{mN}\\cdot\\text{cm}^2">r=20: 648,0</span><br>
          • <span class="katex-render" data-display="false" data-latex="r = 25: 1,04 \\cdot 25^2 = 1,04 \\cdot 625 = 650,0\\,\\text{mN}\\cdot\\text{cm}^2">r=25: 650,0</span><br>
          • <span class="katex-render" data-display="false" data-latex="r = 30: 0,72 \\cdot 30^2 = 0,72 \\cdot 900 = 648,0\\,\\text{mN}\\cdot\\text{cm}^2">r=30: 648,0</span><br>
          • <span class="katex-render" data-display="false" data-latex="r = 40: 0,41 \\cdot 40^2 = 0,41 \\cdot 1600 = 656,0\\,\\text{mN}\\cdot\\text{cm}^2">r=40: 656,0</span><br><br>
          Mittelwert: <span class="katex-render" data-display="false" data-latex="\\bar{k} = \\frac{650 + 652,5 + 648 + 650 + 648 + 656}{6} = 650,75\\,\\text{mN}\\cdot\\text{cm}^2 \\approx 650\\,\\text{mN}\\cdot\\text{cm}^2">k = 650</span>.<br>
          In SI-Einheiten: <span class="katex-render" data-display="false" data-latex="650 \\cdot 10^{-3}\\,\\text{N} \\cdot 10^{-4}\\,\\text{m}^2 = 6,5 \\cdot 10^{-5}\\,\\text{N}\\cdot\\text{m}^2">k = 6,5 · 10⁻⁵ N m²</span>.<br>
          <strong>Funktionsgleichung:</strong> <span class="katex-render" data-display="false" data-latex="F(r) = \\frac{650\\,\\text{mN}\\cdot\\text{cm}^2}{r^2}">F(r) = 650 / r²</span>.<br><br>

          <strong>b) Prognose für Abstände:</strong><br>
          • Für <span class="katex-render" data-display="false" data-latex="r = 5\\,\\text{cm}">r = 5 cm</span>: <span class="katex-render" data-display="false" data-latex="F(5) = \\frac{650}{5^2} = \\frac{650}{25} = 26,0\\,\\text{mN}">F(5) = 26,0 mN</span>.<br>
          • Für <span class="katex-render" data-display="false" data-latex="r = 1\\,\\text{cm}">r = 1 cm</span>: <span class="katex-render" data-display="false" data-latex="F(1) = \\frac{650}{1^2} = 650\\,\\text{mN} = 0,65\\,\\text{N}">F(1) = 650 mN = 0,65 N</span>.
        `
      },
      {
        title: 'Aufgabe 2 (S. 33): Anziehungskraft paralleler Kondensatorplatten F(U)',
        prompt: `
          An zwei kreisförmige Metallplatten (r = 5 cm, d = 2 mm) werden Spannungen angelegt:
          <table style="width:100%; border-collapse:collapse; margin:0.8rem 0; font-size:0.86rem; text-align:center;">
            <tr style="background:var(--bg-subtle);">
              <th style="border:1px solid var(--border-subtle); padding:0.4rem;">U in kV</th>
              <td style="border:1px solid var(--border-subtle); padding:0.4rem;">0,4</td>
              <td style="border:1px solid var(--border-subtle); padding:0.4rem;">0,6</td>
              <td style="border:1px solid var(--border-subtle); padding:0.4rem;">0,8</td>
              <td style="border:1px solid var(--border-subtle); padding:0.4rem;">1,0</td>
            </tr>
            <tr>
              <th style="border:1px solid var(--border-subtle); padding:0.4rem;">F in mN</th>
              <td style="border:1px solid var(--border-subtle); padding:0.4rem;">1,4</td>
              <td style="border:1px solid var(--border-subtle); padding:0.4rem;">3,2</td>
              <td style="border:1px solid var(--border-subtle); padding:0.4rem;">5,7</td>
              <td style="border:1px solid var(--border-subtle); padding:0.4rem;">8,9</td>
            </tr>
          </table>
          a) Ermittle F(U) mit konstanter Größe in der 3. Zeile.<br>
          b) Bei welcher Spannung ergibt sich genau eine Kraft von 10 mN?<br>
          c) Zeige theoretisch mit F = ½ ε₀ (A/d²) U², dass die Messwerte physikalisch plausibel sind!
        `,
        solution: `
          <strong>a) Ermittlung von F(U):</strong><br>
          1. <em>Vermutung:</em> Wenn sich <span class="katex-render" data-display="false" data-latex="U">U</span> verdoppelt (0,4 kV auf 0,8 kV), steigt <span class="katex-render" data-display="false" data-latex="F">F</span> von 1,4 auf 5,7 mN (<span class="katex-render" data-display="false" data-latex="\\frac{5,7}{1,4} \\approx 4,07 \\approx 2^2">5,7/1,4 ≈ 4</span>) &rarr; quadratischer Zusammenhang <span class="katex-render" data-display="false" data-latex="F \\sim U^2">F ~ U²</span>.<br><br>
          2. <em>Berechnung der 3. Zeile (<span class="katex-render" data-display="false" data-latex="k = \\frac{F}{U^2}">k = F/U²</span> in <span class="katex-render" data-display="false" data-latex="\\frac{\\text{mN}}{\\text{kV}^2}">mN/kV²</span>):</em><br>
          • <span class="katex-render" data-display="false" data-latex="U = 0,4\\,\\text{kV}: \\frac{1,4}{0,16} = 8,75\\,\\frac{\\text{mN}}{\\text{kV}^2}">U=0,4: 8,75</span><br>
          • <span class="katex-render" data-display="false" data-latex="U = 0,6\\,\\text{kV}: \\frac{3,2}{0,36} = 8,89\\,\\frac{\\text{mN}}{\\text{kV}^2}">U=0,6: 8,89</span><br>
          • <span class="katex-render" data-display="false" data-latex="U = 0,8\\,\\text{kV}: \\frac{5,7}{0,64} = 8,91\\,\\frac{\\text{mN}}{\\text{kV}^2}">U=0,8: 8,91</span><br>
          • <span class="katex-render" data-display="false" data-latex="U = 1,0\\,\\text{kV}: \\frac{8,9}{1,00} = 8,90\\,\\frac{\\text{mN}}{\\text{kV}^2}">U=1,0: 8,90</span><br><br>
          Mittelwert: <span class="katex-render" data-display="false" data-latex="\\bar{k} \\approx 8,86\\,\\frac{\\text{mN}}{\\text{kV}^2} = 8,86 \\cdot 10^{-9}\\,\\frac{\\text{N}}{\\text{V}^2}">k = 8,86 mN/kV²</span>.<br>
          <strong>Funktionsgleichung:</strong> <span class="katex-render" data-display="false" data-latex="F(U) = 8,86\\,\\frac{\\text{mN}}{\\text{kV}^2} \\cdot U^2">F(U) = 8,86 • U²</span>.<br><br>

          <strong>b) Spannung für F = 10 mN:</strong><br>
          <div class="katex-render" data-display="true" data-latex="U = \\sqrt{\\frac{F}{k}} = \\sqrt{\\frac{10\\,\\text{mN}}{8,86\\,\\frac{\\text{mN}}{\\text{kV}^2}}} \\approx \\sqrt{1,1287} \\approx 1,062\\,\\text{kV} \\approx 1062\\,\\text{V}"></div><br>

          <strong>c) Theoretischer Abgleich:</strong><br>
          Fläche: <span class="katex-render" data-display="false" data-latex="A = \\pi \\cdot r^2 = \\pi \\cdot (0,05\\,\\text{m})^2 \\approx 7,854 \\cdot 10^{-3}\\,\\text{m}^2">A = 7,854 · 10⁻³ m²</span>.<br>
          Abstand: <span class="katex-render" data-display="false" data-latex="d = 2\\,\\text{mm} = 2 \\cdot 10^{-3}\\,\\text{m} \\implies d^2 = 4 \\cdot 10^{-6}\\,\\text{m}^2">d = 2 mm</span>.<br>
          <div class="katex-render" data-display="true" data-latex="k_{\\text{theor}} = \\frac{1}{2} \\varepsilon_0 \\frac{A}{d^2} = \\frac{1}{2} \\cdot 8,854 \\cdot 10^{-12} \\cdot \\frac{7,854 \\cdot 10^{-3}}{4 \\cdot 10^{-6}} = 8,69 \\cdot 10^{-9}\\,\\frac{\\text{N}}{\\text{V}^2} = 8,69\\,\\frac{\\text{mN}}{\\text{kV}^2}"></div>
          Die theoretische Konstante <span class="katex-render" data-display="false" data-latex="8,69\\,\\frac{\\text{mN}}{\\text{kV}^2}">8,69</span> stimmt im Rahmen der Messgenauigkeit (unter 2% Abweichung) exzellent mit dem Messwert <span class="katex-render" data-display="false" data-latex="8,86\\,\\frac{\\text{mN}}{\\text{kV}^2}">8,86</span> überein!
        `
      },
      {
        title: 'Aufgabe 3 (S. 33): Kondensatorentladung I(t) & Integralberechnung',
        prompt: `
          Beim Entladen eines Kondensators wird I in Abhängigkeit von t gemessen:
          t in s: 0, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52<br>
          I in µA: 50, 43, 35, 29, 24, 20, 17, 14, 12, 10, 9, 7.5, 6, 5<br><br>
          a) Ermittle I(t) als e-Funktion.<br>
          b) Begründe den exponentiellen Verlauf physikalisch.<br>
          c) Stromstärke nach 20 s und 30 s.<br>
          d) Ermittle die Anfangsladung Q₀ vor dem Entladen mittels Integral.<br>
          e) Welche Ladung befindet sich nach 30 s noch auf dem Kondensator?<br>
          f) Bestimme die momentane Änderungsrate der Ladung für t = 0 s und t = 50 s.
        `,
        solution: `
          <strong>a) Bestimmung der e-Funktion:</strong><br>
          Anfangsstromstärke: <span class="katex-render" data-display="false" data-latex="I_0 = 50\\,\\mu\\text{A}">I₀ = 50 µA</span>.<br>
          Nach <span class="katex-render" data-display="false" data-latex="t = 20\\,\\text{s}">t = 20 s</span> ist <span class="katex-render" data-display="false" data-latex="I(20) = 20\\,\\mu\\text{A}">I(20) = 20 µA</span>.<br>
          <div class="katex-render" data-display="true" data-latex="\\frac{I(20)}{I_0} = \\frac{20}{50} = 0,40 = e^{-\\lambda \\cdot 20} \\implies -\\lambda \\cdot 20 = \\ln(0,40) \\approx -0,9163 \\implies \\lambda \\approx 0,0458\\,\\text{s}^{-1}"></div>
          Zeitkonstante: <span class="katex-render" data-display="false" data-latex="\\tau = \\frac{1}{\\lambda} \\approx 21,82\\,\\text{s}">τ = 21,82 s</span>.<br>
          Funktionsgleichung: <span class="katex-render" data-display="false" data-latex="I(t) = 50\\,\\mu\\text{A} \\cdot e^{-0,0458 \\cdot t} = 50\\,\\mu\\text{A} \\cdot (0,955)^t">I(t) = 50 µA · e^(-0,0458 t)</span>.<br><br>

          <strong>b) Physikalische Begründung des exponentiellen Verlaufs:</strong><br>
          Nach dem Maschensatz liegt am Entladewiderstand <span class="katex-render" data-display="false" data-latex="R">R</span> die Kondensatorspannung <span class="katex-render" data-display="false" data-latex="U = \\frac{Q}{C}">U = Q/C</span> an.<br>
          Der Entladestrom ist <span class="katex-render" data-display="false" data-latex="I = \\frac{U}{R} = \\frac{Q}{R \\cdot C}">I = Q/(RC)</span>.<br>
          Da der Strom dem Ladungsabfluss entspricht (<span class="katex-render" data-display="false" data-latex="I = -\\frac{dQ}{dt}">I = -dQ/dt</span>), folgt die Differentialgleichung:<br>
          <div class="katex-render" data-display="true" data-latex="\\frac{dQ}{dt} = -\\frac{1}{RC} \\cdot Q"></div>
          Die Änderungsrate der Ladung ist stets proportional zum aktuellen Ladungsbestand <span class="katex-render" data-display="false" data-latex="Q(t)">Q(t)</span>. Die eindeutige mathematische Lösung dieser Differentialgleichung ist die Exponentialfunktion <span class="katex-render" data-display="false" data-latex="Q(t) = Q_0 \\cdot e^{-t/(RC)}">Q(t)</span> und entsprechend für den Strom <span class="katex-render" data-display="false" data-latex="I(t) = I_0 \\cdot e^{-t/(RC)}">I(t)</span>.<br><br>

          <strong>c) Stromstärken:</strong><br>
          • <span class="katex-render" data-display="false" data-latex="I(20\\,\\text{s}) = 20\\,\\mu\\text{A}">I(20 s) = 20 µA</span> (Messwert).<br>
          • <span class="katex-render" data-display="false" data-latex="I(30\\,\\text{s}) = 50 \\cdot e^{-0,0458 \\cdot 30} = 50 \\cdot e^{-1,374} \\approx 50 \\cdot 0,253 = 12,6\\,\\mu\\text{A}">I(30 s) ≈ 12,6 µA</span>.<br><br>

          <strong>d) Anfangsladung Q₀ mit Integral:</strong><br>
          <div class="katex-render" data-display="true" data-latex="Q_0 = \\int_0^{\infty} I(t)\\,dt = \\int_0^{\infty} 50\\,\\mu\\text{A} \\cdot e^{-0,0458 \\cdot t}\\,dt = \\left[ -\\frac{50}{0,0458} e^{-0,0458 \\cdot t} \\right]_0^{\infty} = \\frac{50\\,\\mu\\text{A}}{0,0458\\,\\text{s}^{-1}} \\approx 1091\\,\\mu\\text{C} = 1,09\\,\\text{mC}"></div><br>

          <strong>e) Restladung nach 30 s:</strong><br>
          <div class="katex-render" data-display="true" data-latex="Q(30) = \\int_{30}^{\infty} I(t)\\,dt = Q_0 \\cdot e^{-0,0458 \\cdot 30} = 1091\\,\\mu\\text{C} \\cdot 0,253 \\approx 276\\,\\mu\\text{C}"></div><br>

          <strong>f) Momentane Änderungsrate der Ladung:</strong><br>
          Wegen <span class="katex-render" data-display="false" data-latex="\\frac{dQ}{dt} = -I(t)">dQ/dt = -I(t)</span>:<br>
          • Bei <span class="katex-render" data-display="false" data-latex="t = 0\\,\\text{s}">t = 0</span>: <span class="katex-render" data-display="false" data-latex="\\frac{dQ}{dt}(0) = -50\\,\\mu\\text{A} = -50\\,\\frac{\\mu\\text{C}}{\\text{s}}">dQ/dt(0) = -50 µC/s</span>.<br>
          • Bei <span class="katex-render" data-display="false" data-latex="t = 50\\,\\text{s}">t = 50</span>: <span class="katex-render" data-display="false" data-latex="\\frac{dQ}{dt}(50) = -50 \\cdot e^{-0,0458 \\cdot 50} = -50 \\cdot e^{-2,29} \\approx -5,06\\,\\frac{\\mu\\text{C}}{\\text{s}}">-5,06 µC/s</span>.
        `
      }
    ]
  },

  {
    id: 'messwerte-auswerten-1',
    folderId: 'ordner-funktionen',
    num: '03',
    icon: '🔬',
    color: '#3b82f6',
    tag: 'Meds.pdf S. 19',
    title: 'Messwertauswertung I: Braun\'sche Röhre & Drahtwiderstand (S. 19)',
    desc: 'Originalaufgaben zu Elektronenablenkung x(U) und Widerstandsabhängigkeit vom Querschnitt R(A).',
    visualHtml: `
      <div class="formula-hero-card" style="border-left: 6px solid #3b82f6;">
        <span class="formula-hero-badge" style="background: rgba(59, 130, 246, 0.15); color: #3b82f6;">
          🔬 LINEARISIERUNG &amp; MESSWERT-ANALYSE (S. 19)
        </span>
        <div class="formula-math-display">
          <span class="katex-render" data-display="true" data-latex="U(x) = k \\cdot x^2 \\quad \\text{und} \\quad R(A) = k \\cdot \\frac{1}{A}"></span>
        </div>
      </div>
    `,
    summary: 'Bestimmung quadratischer und antiproportionaler Beziehungen aus Messreihen der Braunschen Röhre und Drähten.',
    takeaways: [
      'In der Braunschen Röhre gilt U / x² = const. (Quadratischer Zusammenhang).',
      'Beim Drahtwiderstand gilt R • A = const. (Antiproportionaler Zusammenhang).'
    ],
    tasks: [
      {
        title: 'Aufgabe 1 (S. 19): Elektronenstrahl-Ablenkung x(U)',
        prompt: `
          x in cm: 3, 4, 5, 6, 7, 8<br>
          U in kV: 0,23; 0,41; 0,645; 0,925; 1,26; 1,65<br>
          Bestimme U(x) mit der Konstanten.
        `,
        solution: `
          Berechnung von <span class="katex-render" data-display="false" data-latex="\\frac{U}{x^2}">U/x²</span> in <span class="katex-render" data-display="false" data-latex="\\frac{\\text{kV}}{\\text{cm}^2}">kV/cm²</span>:<br>
          • 0,23 / 9 = 0,0256<br>
          • 0,41 / 16 = 0,0256<br>
          • 0,645 / 25 = 0,0258<br>
          • 0,925 / 36 = 0,0257<br>
          • 1,26 / 49 = 0,0257<br>
          • 1,65 / 64 = 0,0258<br>
          Mittelwert: <span class="katex-render" data-display="false" data-latex="\\bar{k} \\approx 0,0257\\,\\frac{\\text{kV}}{\\text{cm}^2}">k = 0,0257</span>.<br>
          Funktionsgleichung: <span class="katex-render" data-display="false" data-latex="U(x) = 0,0257\\,\\frac{\\text{kV}}{\\text{cm}^2} \\cdot x^2 \\quad (R^2 \\approx 1,0)">U(x) = 0,0257 · x²</span>.
        `
      }
    ]
  }
];


// --- 3. SKILLS FÜR ORDNER 2: ELEKTROSTATISCHE PHÄNOMENE ---
const SKILLS_FOLDER_2 = [
  {
    id: 'elektroskop-funktion',
    folderId: 'ordner-phaenomene',
    num: '04',
    icon: '🔬',
    color: '#10b981',
    tag: 'Meds.pdf S. 2/3',
    title: 'Das Elektroskop: Aufbau & Ladungsverteilung (S. 2/3)',
    desc: 'Aufbau mit Metallteller, Isolator, Metallstab, Zeiger und Gehäuse. Nachweis positiver und negativer Ladungen durch Zeigerabstoßung.',
    visualHtml: `
      <div class="formula-hero-card" style="border-left: 6px solid #10b981;">
        <span class="formula-hero-badge" style="background: rgba(16, 185, 129, 0.15); color: #10b981;">
          🔬 DAS ELEKTROSKOP – MESSGERÄT FÜR RUHENDE LADUNGEN
        </span>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 0.8rem;">
          <div style="background: var(--bg-subtle); padding: 0.8rem; border-radius: 6px; font-size: 0.84rem; line-height: 1.5;">
            <strong>Aufbau (Bestandteile S. 2):</strong><br>
            <strong>(1) Metallteller:</strong> Nimmt Ladungen auf oder dient der Influenz.<br>
            <strong>(2) Isolierende Durchführung:</strong> Verhindert Ladungsabfluss ins Gehäuse.<br>
            <strong>(3) Metallstab:</strong> Leitet Elektronen nach unten zum Zeiger.<br>
            <strong>(4) Leicht drehbarer Zeiger:</strong> Schlägt bei gleichartiger Ladung aus.<br>
            <strong>(5) Metallgehäuse / Masse:</strong> Schutz vor äußeren Störfeldern.
          </div>
          <div style="background: var(--bg-subtle); padding: 0.8rem; border-radius: 6px; font-size: 0.84rem; line-height: 1.5;">
            <strong>Funktionsweise (S. 3):</strong><br>
            • Nähert man einen <strong>positiv geladenen Stab</strong> dem Teller, werden Elektronen aus dem Stab und Zeiger nach oben in den Teller gezogen (Influenz).<br>
            • Stab und Zeiger weisen nun einen Elektronenmangel (positive Ladungsüberschuss) auf.<br>
            • Da sich gleichnamige Ladungen abstoßen, wird der <strong>Zeiger vom Stab abgestoßen</strong> und schlägt aus!
          </div>
        </div>
      </div>
    `,
    summary: 'Das Elektroskop weist ruhende elektrische Ladungen durch die Coulomb-Abstoßungskraft gleichnamiger Ladungen zwischen Zeiger und Trägerstab nach.',
    takeaways: [
      'Gleichnamige Ladungen stoßen sich ab -> Zeigerausschlag.',
      'Influenz ermöglicht Zeigerausschlag auch ohne direkte Berührung.',
      'Isolierte Aufhängung verhindert Ladungsabfluss ins Gehäuse.'
    ],
    tasks: [
      {
        title: 'Aufgabe: Ladungsverteilung beim Annähern und Berühren',
        prompt: `
          Ein positiv geladener Glasstab wird an den Teller eines ungeladenen Elektroskops angenähert, aber nicht berührt. Beschreibe die Ladungsverteilung und den Zeigerausschlag. Was passiert, wenn der Stab den Teller berührt und wieder entfernt wird?
        `,
        solution: `
          <strong>1. Phase: Reines Annähern (Influenz ohne Berührung):</strong><br>
          • Die freien Leitungselektronen im Elektroskop werden durch das elektrische Feld des positiv geladenen Stabes nach oben in den Metallteller gezogen.<br>
          • Im Teller entsteht ein negativer Ladungsüberschuss.<br>
          • Im Metallstab und am beweglichen Zeiger entsteht ein Elektronenmangel (positive Ladung).<br>
          • Wegen der Abstoßung der positiven Ladungen schlägt der Zeiger aus.<br>
          • Wird der Stab entfernt, fließen die Elektronen zurück &rarr; Zeiger geht auf 0 zurück.<br><br>

          <strong>2. Phase: Berührung (Ladungsübertrag):</strong><br>
          • Beim Kontakt fließen Elektronen vom Elektroskopteller auf den positiv geladenen Stab über.<br>
          • Das gesamte Elektroskop hat nun dauerhaft einen Elektronenmangel (bleibt positiv geladen).<br>
          • Nach dem Entfernen des Stabes bleibt der Zeiger dauerhaft ausgelenkt!
        `
      }
    ]
  },

  {
    id: 'influenz-polarisation',
    folderId: 'ordner-phaenomene',
    num: '05',
    icon: '⚡',
    color: '#10b981',
    tag: 'Meds.pdf S. 5',
    title: 'Influenz vs. Polarisation: Leiter vs. Nichtleiter (S. 5)',
    desc: 'Exakter Unterschied zwischen Influenz (Verschiebung freier Elektronen im Metallleiter) und Polarisation (molekulare Dipole im Isolator).',
    visualHtml: `
      <div class="formula-hero-card" style="border-left: 6px solid #10b981;">
        <span class="formula-hero-badge" style="background: rgba(16, 185, 129, 0.15); color: #10b981;">
          ⚡ INFLUENZ VS. POLARISATION (MEDS.PDF S. 5)
        </span>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 0.8rem;">
          <div style="background: var(--bg-subtle); padding: 1rem; border-radius: 8px; border-left: 4px solid #06b6d4;">
            <h4 style="color:#06b6d4; margin:0 0 0.4rem 0;">1. Influenz (im elektrischen Leiter / Metall)</h4>
            <p style="font-size:0.84rem; line-height:1.45; color:var(--text-secondary); margin:0;">
              <strong>Definition (S. 5):</strong> Verschiebung <em>freier elektrischer Ladungen</em> (Leitungselektronen) in einem Leiter durch einen geladenen Körper, <strong>ohne dass eine Berührung stattfindet</strong>.<br><br>
              <strong>Mechanismus:</strong> Elektronen können sich makroskopisch über den gesamten Metallkörper frei bewegen.
            </p>
          </div>
          <div style="background: var(--bg-subtle); padding: 1rem; border-radius: 8px; border-left: 4px solid #8b5cf6;">
            <h4 style="color:#8b5cf6; margin:0 0 0.4rem 0;">2. Polarisation (im Isolator / Nichtleiter)</h4>
            <p style="font-size:0.84rem; line-height:1.45; color:var(--text-secondary); margin:0;">
              <strong>Definition (S. 5):</strong> Verschiebung elektrischer Ladungen <strong>auf molekularer Ebene</strong> an der Oberfläche eines Nichtleiters durch einen geladenen Körper.<br><br>
              <strong>Beispiel:</strong> Reibt man einen Luftballon, haftet er an der Wand, weil die Moleküle der Wand polarisiert werden (Dipolausrichtung).
            </p>
          </div>
        </div>
      </div>
    `,
    summary: 'Influenz findet nur in Leitern durch makroskopische Elektronenverschiebung statt. Polarisation tritt in Isolatoren durch mikroskopische Verschiebung der Atomkerne/Elektronenwolken auf.',
    takeaways: [
      'Influenz = Freie Leitungselektronen verschieben sich im Leiter.',
      'Polarisation = Keine freien Ladungsträger, Dipole richten sich im Isolator aus.',
      'Beide Vorgänge erzeugen eine anziehende Kraft zu einem geladenen Körper.'
    ],
    tasks: [
      {
        title: 'Verständnisaufgabe: Luftballon an der Zimmerwand',
        prompt: `
          Warum haftet ein elektrisch aufgeladener Luftballon an einer ungeladenen Zimmerwand, obwohl die Wand aus einem Isolator (Gips/Tapete) besteht?
        `,
        solution: `
          <strong>Physikalische Erklärung:</strong><br>
          1. Der geriebene Ballon ist negativ geladen.<br>
          2. Da die Wand ein Isolator ist, können freie Elektronen nicht durch die Wand fließen (keine Influenz).<br>
          3. Stattdessen tritt <strong>dielektrische Polarisation</strong> auf: Das E-Feld des Ballons stößt die Elektronenwolken der Atome an der Wandoberfläche leicht ab, während die positiven Atomkerne leicht angezogen werden.<br>
          4. Es entstehen mikroskopische Dipole. Da sich die positiven Kerne näher am negativen Ballon befinden als die abgestoßenen Elektronen, überwiegt die elektrostatische Anziehungskraft nach dem Coulombschen Gesetz (<span class="katex-render" data-display="false" data-latex="F \\sim \\frac{1}{r^2}">F ~ 1/r²</span>). Der Ballon haftet!
        `
      }
    ]
  },

  {
    id: 'faraday-kaefig',
    folderId: 'ordner-phaenomene',
    num: '06',
    icon: '🛡️',
    color: '#10b981',
    tag: 'Meds.pdf S. 25',
    title: 'Der Faradaysche Käfig: Feldfreier Raum & Gegenfeld (S. 25)',
    desc: 'Warum das Innere jedes geschlossenen Metallleiters feldfrei ist: Genaue Kraftkompensation Fel,inn = -Fel,auß.',
    visualHtml: `
      <div class="formula-hero-card" style="border-left: 6px solid #10b981;">
        <span class="formula-hero-badge" style="background: rgba(16, 185, 129, 0.15); color: #10b981;">
          🛡️ DER FARADAY'SCHE KÄFIG (MEDS.PDF S. 25)
        </span>
        
        <!-- Bildliche SVG-Grafik des Faradayschen Käfigs mit Vektoren & Ladungen -->
        <div style="background: #090d16; border: 1px solid #1e293b; border-radius: 12px; padding: 1rem; margin: 1rem 0; text-align: center;">
          <svg viewBox="0 0 600 280" style="width: 100%; max-height: 280px; display: block; margin: 0 auto;" aria-label="Faradayscher Käfig Vektordiagramm">
            <defs>
              <linearGradient id="cageMetal" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#475569"/>
                <stop offset="50%" stop-color="#334155"/>
                <stop offset="100%" stop-color="#1e293b"/>
              </linearGradient>
              <marker id="arr-blue" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                <path d="M 0 1 L 7 4 L 0 7 z" fill="#38bdf8"/>
              </marker>
              <marker id="arr-orange" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                <path d="M 0 1 L 7 4 L 0 7 z" fill="#f97316"/>
              </marker>
            </defs>

            <!-- Linke positive Elektrode (Außenfeldquelle) -->
            <rect x="20" y="30" width="14" height="220" rx="3" fill="#ef4444" opacity="0.85"/>
            <text x="27" y="145" font-size="16" fill="white" font-weight="bold" text-anchor="middle">+</text>
            <text x="27" y="70" font-size="14" fill="white" font-weight="bold" text-anchor="middle">+</text>
            <text x="27" y="220" font-size="14" fill="white" font-weight="bold" text-anchor="middle">+</text>
            <text x="27" y="20" font-size="10" fill="#fca5a5" text-anchor="middle" font-weight="bold">+ Pol</text>

            <!-- Rechte negative Elektrode -->
            <rect x="566" y="30" width="14" height="220" rx="3" fill="#3b82f6" opacity="0.85"/>
            <text x="573" y="145" font-size="20" fill="white" font-weight="bold" text-anchor="middle">−</text>
            <text x="573" y="70" font-size="18" fill="white" font-weight="bold" text-anchor="middle">−</text>
            <text x="573" y="220" font-size="18" fill="white" font-weight="bold" text-anchor="middle">−</text>
            <text x="573" y="20" font-size="10" fill="#93c5fd" text-anchor="middle" font-weight="bold">− Pol</text>

            <!-- Äußere Feldlinien (biegen um den Metallkäfig herum) -->
            <path d="M 40 45 Q 300 5 560 45" fill="none" stroke="#38bdf8" stroke-width="2" marker-end="url(#arr-blue)" stroke-dasharray="5 3"/>
            <path d="M 40 85 Q 300 45 560 85" fill="none" stroke="#38bdf8" stroke-width="2.5" marker-end="url(#arr-blue)"/>
            <path d="M 40 195 Q 300 235 560 195" fill="none" stroke="#38bdf8" stroke-width="2.5" marker-end="url(#arr-blue)"/>
            <path d="M 40 235 Q 300 275 560 235" fill="none" stroke="#38bdf8" stroke-width="2" marker-end="url(#arr-blue)" stroke-dasharray="5 3"/>

            <!-- Mittlere Feldlinien treffen auf Außenwand -->
            <line x1="40" y1="140" x2="195" y2="140" stroke="#38bdf8" stroke-width="2.5" marker-end="url(#arr-blue)"/>
            <line x1="405" y1="140" x2="560" y2="140" stroke="#38bdf8" stroke-width="2.5" marker-end="url(#arr-blue)"/>
            <text x="110" y="130" font-size="11" fill="#38bdf8" font-weight="bold" font-family="monospace">E_auß →</text>
            <text x="470" y="130" font-size="11" fill="#38bdf8" font-weight="bold" font-family="monospace">E_auß →</text>

            <!-- Metallene Hülle des Faradayschen Käfigs -->
            <circle cx="300" cy="140" r="105" fill="url(#cageMetal)" stroke="#64748b" stroke-width="3"/>
            <!-- Feldfreier Innenraum (Hohlraum) -->
            <circle cx="300" cy="140" r="78" fill="#040711" stroke="#10b981" stroke-width="2.5" stroke-dasharray="6 3"/>

            <!-- Influenzierte Oberflächenladungen (Außenwand) -->
            <!-- Linke Seite: Elektronenüberschuss (−) angezogen von + Platte -->
            <circle cx="198" cy="140" r="7" fill="#38bdf8"/>
            <text x="198" y="144" font-size="11" font-weight="bold" fill="#040711" text-anchor="middle">−</text>

            <circle cx="205" cy="105" r="7" fill="#38bdf8"/>
            <text x="205" y="109" font-size="11" font-weight="bold" fill="#040711" text-anchor="middle">−</text>

            <circle cx="205" cy="175" r="7" fill="#38bdf8"/>
            <text x="205" y="179" font-size="11" font-weight="bold" fill="#040711" text-anchor="middle">−</text>

            <circle cx="225" cy="75" r="7" fill="#38bdf8"/>
            <text x="225" y="79" font-size="11" font-weight="bold" fill="#040711" text-anchor="middle">−</text>

            <circle cx="225" cy="205" r="7" fill="#38bdf8"/>
            <text x="225" y="209" font-size="11" font-weight="bold" fill="#040711" text-anchor="middle">−</text>

            <!-- Rechte Seite: Elektronenmangel / positive Ladung (+) abgestoßen von − Platte -->
            <circle cx="402" cy="140" r="7" fill="#ef4444"/>
            <text x="402" y="144" font-size="11" font-weight="bold" fill="white" text-anchor="middle">+</text>

            <circle cx="395" cy="105" r="7" fill="#ef4444"/>
            <text x="395" y="109" font-size="11" font-weight="bold" fill="white" text-anchor="middle">+</text>

            <circle cx="395" cy="175" r="7" fill="#ef4444"/>
            <text x="395" y="179" font-size="11" font-weight="bold" fill="white" text-anchor="middle">+</text>

            <circle cx="375" cy="75" r="7" fill="#ef4444"/>
            <text x="375" y="79" font-size="11" font-weight="bold" fill="white" text-anchor="middle">+</text>

            <circle cx="375" cy="205" r="7" fill="#ef4444"/>
            <text x="375" y="209" font-size="11" font-weight="bold" fill="white" text-anchor="middle">+</text>

            <!-- Vektoren im Innenraum: E_auß und E_inn heben sich weg! -->
            <line x1="250" y1="108" x2="350" y2="108" stroke="#38bdf8" stroke-width="2.5" marker-end="url(#arr-blue)"/>
            <text x="300" y="102" font-size="10" fill="#38bdf8" font-family="monospace" font-weight="bold" text-anchor="middle">E_auß (nach rechts →)</text>

            <line x1="350" y1="124" x2="250" y2="124" stroke="#f97316" stroke-width="2.5" marker-end="url(#arr-orange)"/>
            <text x="300" y="136" font-size="10" fill="#f97316" font-family="monospace" font-weight="bold" text-anchor="middle">E_inn (nach links ← Gegenfeld)</text>

            <!-- Innenraum Status -->
            <rect x="250" y="152" width="100" height="32" rx="6" fill="#064e3b" stroke="#10b981" stroke-width="1.5"/>
            <text x="300" y="167" font-size="12" fill="#a7f3d0" font-weight="bold" text-anchor="middle">🛡️ E_ges = 0 V/m</text>
            <text x="300" y="179" font-size="9" fill="#6ee7b7" text-anchor="middle">FELDFREIER RAUM</text>
          </svg>
        </div>

        <div style="margin: 0.8rem 0; font-size: 0.9rem; line-height: 1.55; color: var(--text-primary); background: var(--bg-subtle); padding: 1rem; border-radius: 8px;">
          <strong>Exakter Wortlaut der Unterrichtsmitschrift (S. 25):</strong><br>
          <em>„Die Elektronen im Leiter bewegen sich so lange (infolge der elektrischen Kraft des äußeren Feldes), bis das innere Gegenfeld das äußere Feld aufhebt, denn dann wirkt keine Kraft mehr auf die Elektronen (beide Kräfte <span class="katex-render" data-display="false" data-latex="F_{\\text{el,inn}}">Fel,inn</span> und <span class="katex-render" data-display="false" data-latex="F_{\\text{el,auß}}">Fel,auß</span> heben sich genau weg).“</em>
        </div>

        <!-- 4-Schritte Ablauf Visualisierung -->
        <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 0.75rem; margin: 1rem 0;">
          <div style="background:var(--bg-subtle); padding:0.85rem; border-radius:8px; border-top:3px solid #64748b;">
            <div style="font-weight:bold; color:var(--text-primary); font-size:0.85rem; margin-bottom:0.3rem;">1. Neutraler Leiter</div>
            <div style="font-size:0.8rem; color:var(--text-secondary); line-height:1.4;">
              Im ungeladenen Metall bewegen sich Leitungselektronen frei und gleichmäßig. Keine äußeren Kräfte wirken.
            </div>
          </div>
          <div style="background:var(--bg-subtle); padding:0.85rem; border-radius:8px; border-top:3px solid #38bdf8;">
            <div style="font-weight:bold; color:#38bdf8; font-size:0.85rem; margin-bottom:0.3rem;">2. Äußeres Feld <span class="katex-render" data-display="false" data-latex="\\vec{E}_{\\text{auß}}">E_auß</span></div>
            <div style="font-size:0.8rem; color:var(--text-secondary); line-height:1.4;">
              Das Feld übt eine elektrische Kraft <span class="katex-render" data-display="false" data-latex="\\vec{F}_{\\text{el}} = -e \\cdot \\vec{E}_{\\text{auß}}">F_el = -e • E_auß</span> aus. Elektronen strömen nach links (entgegen der Feldrichtung).
            </div>
          </div>
          <div style="background:var(--bg-subtle); padding:0.85rem; border-radius:8px; border-top:3px solid #f97316;">
            <div style="font-weight:bold; color:#f97316; font-size:0.85rem; margin-bottom:0.3rem;">3. Das Gegenfeld <span class="katex-render" data-display="false" data-latex="\\vec{E}_{\\text{inn}}">E_inn</span></div>
            <div style="font-size:0.8rem; color:var(--text-secondary); line-height:1.4;">
              Links entsteht ein Minus-Überschuss, rechts ein Plus-Überschuss. Diese Oberflächenladungen bauen ein Gegenfeld von Plus nach Minus (nach links) auf!
            </div>
          </div>
          <div style="background:var(--bg-subtle); padding:0.85rem; border-radius:8px; border-top:3px solid #10b981;">
            <div style="font-weight:bold; color:#10b981; font-size:0.85rem; margin-bottom:0.3rem;">4. Gleichgewicht (<span class="katex-render" data-display="false" data-latex="E_{\\text{ges}} = 0">E_ges = 0</span>)</div>
            <div style="font-size:0.8rem; color:var(--text-secondary); line-height:1.4;">
              In Bruchteilen einer Nanosekunde gilt <span class="katex-render" data-display="false" data-latex="\\vec{E}_{\\text{inn}} = -\\vec{E}_{\\text{auß}}">E_inn = -E_auß</span>. Die Wanderung stoppt; das Innere ist absolut geschützt!
            </div>
          </div>
        </div>

        <div class="formula-takeaway-box" style="background: rgba(16, 185, 129, 0.08); border-left: 4px solid #10b981;">
          <span style="font-size: 1.2rem;">💡</span>
          <div>
            <strong>Klausur-Ergebnis:</strong> Im Inneren eines allseitig geschlossenen metallischen Hohlkörpers ist die elektrische Feldstärke stets <span class="katex-render" data-display="false" data-latex="E_{\\text{ges}} = 0\\,\\frac{\\text{V}}{\\text{m}}">E_ges = 0</span>. Es herrscht absoluter Schutz vor äußeren elektrostatischen Feldern und Blitzeinschlägen.
          </div>
        </div>
      </div>
    `,
    summary: 'Freie Elektronen verschieben sich durch äußere E-Felder an die Oberfläche, bis das innere Feld das äußere Feld exakt kompensiert.',
    takeaways: [
      'Fel,inn + Fel,auß = 0 -> Gesamtfeld im Inneren ist Null.',
      'Ladungen sitzen ausschließlich auf der Außenfläche des Leiters.',
      'Auto, Flugzeug und Mikrowellengehäuse nutzen dieses Prinzip.'
    ],
    tasks: [
      {
        title: 'Klausuraufgabe: Begründung des feldfreien Raums',
        prompt: `
          Begründe physikalisch exakt, warum sich im Inneren einer geschlossenen Metallkugel kein elektrisches Feld aufbauen kann, wenn man sie in ein starkes homogenes Feld bringt.
        `,
        solution: `
          1. Bringt man die Metallkugel in ein äußeres Feld <span class="katex-render" data-display="false" data-latex="\\vec{E}_{\\text{auß}}">E_auß</span>, wirkt auf die freien Leitungselektronen die Kraft <span class="katex-render" data-display="false" data-latex="\\vec{F}_{\\text{el,auß}} = -e \\cdot \\vec{E}_{\\text{auß}}">F = -e • E</span>.<br>
          2. Die Elektronen strömen entgegen der Feldrichtung an die Oberfläche der Kugel.<br>
          3. Auf der einen Seite entsteht ein Elektronenüberschuss (-), auf der gegenüberliegenden ein Mangel (+). Diese influenzierte Oberflächenladung erzeugt im Hohlraum ein <strong>inneres Gegenfeld</strong> <span class="katex-render" data-display="false" data-latex="\\vec{E}_{\\text{inn}}">E_inn</span>.<br>
          4. Die Ladungsverschiebung läuft so lange weiter, bis <span class="katex-render" data-display="false" data-latex="\\vec{E}_{\\text{inn}} = -\\vec{E}_{\\text{auß}}">E_inn = -E_auß</span> gilt.<br>
          5. Dann ist die Gesamtkraft auf jedes Elektron im Inneren Null (<span class="katex-render" data-display="false" data-latex="\\vec{F}_{\\text{ges}} = 0">F_ges = 0</span>). Die Verschiebung stoppt im Gleichgewichtszustand und der Innenraum ist völlig feldfrei (<span class="katex-render" data-display="false" data-latex="\\vec{E}_{\\text{ges}} = 0">E_ges = 0</span>).
        `
      }
    ]
  },

  {
    id: 'glimmlampe-polpruefer',
    folderId: 'ordner-phaenomene',
    num: '07',
    icon: '💡',
    color: '#f43f5e',
    tag: 'Meds.pdf S. 4',
    title: 'Die Glimmlampe & Polprüfer: Zünd- & Löschspannung (S. 4)',
    desc: 'Funktionsweise mit verdünntem Gas, Zünd- vs. Löschspannung (Uz > Ul), Gasionisation und warum stets die Kathode (Minuspol) leuchtet.',
    visualHtml: `
      <div class="formula-hero-card" style="border-left: 6px solid #f43f5e;">
        <span class="formula-hero-badge" style="background: rgba(244, 63, 94, 0.15); color: #f43f5e;">
          💡 FUNKTIONSWEISE DER GLIMMLAMPE (MEDS.PDF S. 4)
        </span>
        <div style="margin-top: 0.8rem; font-size: 0.88rem; line-height: 1.55; color: var(--text-primary);">
          <strong>Die 3 Kern-Phasen aus dem Unterricht:</strong><br>
          <strong>1. Gasfüllung &amp; Isolator:</strong> Im Glaskörper befindet sich Edelgas (Neon/Argon) unter Unterdruck. Bei kleinen Spannungen leitet das Gas keinen Strom &rarr; Isolator.<br>
          <strong>2. Zündspannung (<span class="katex-render" data-display="false" data-latex="U_Z \\approx 90\\,\\text{V}">Uz ≈ 90 V</span>):</strong> Wird die Zündspannung erreicht, treten Elektronen aus der negativen Elektrode (Kathode) aus und werden im elektrischen Feld so stark beschleunigt, dass sie Gasatome durch <em>Stoßionisation</em> spalten. Es entsteht ein leitendes Gasplasma.<br>
          <strong>3. Löschspannung (<span class="katex-render" data-display="false" data-latex="U_L \\approx 60\\,\\text{V}">Ul ≈ 60 V</span>):</strong> Einmal gezündet, brennt die Glimmentladung auch unterhalb von <span class="katex-render" data-display="false" data-latex="U_Z">Uz</span> weiter. Erst wenn die Spannung unter die Löschspannung <span class="katex-render" data-display="false" data-latex="U_L">Ul</span> absinkt, erlischt das Licht (<span class="katex-render" data-display="false" data-latex="U_L < U_Z">Ul < Uz</span>).<br><br>
          <strong>Warum ist sie ein Polprüfer?</strong><br>
          Die Leuchterscheinung (der Glimmsaum) tritt <strong>immer nur an der Kathode (am Minuspol)</strong> auf, weil dort die austretenden Elektronen auf das Gas treffen! Leuchtet Elektrode A, ist A der Minuspol.
        </div>
      </div>
    `,
    summary: 'Die Glimmlampe zündet bei Uz durch Stoßionisation und verlischt erst bei Ul. Da immer die Kathode leuchtet, ist sie ein eindeutiger Polprüfer.',
    takeaways: [
      'Stoßionisation durch beschleunigte Elektronen erzeugt Licht.',
      'Zündspannung Uz ist größer als Löschspannung Ul (Uz > Ul).',
      'Leuchtet stets am Minuspol (Kathode) -> Polprüfer.'
    ],
    tasks: [
      {
        title: 'Aufgabe: Polprüfer im Wechsel- und Gleichstrom',
        prompt: `
          1. Wie verhält sich eine Glimmlampe an einer Gleichspannungsquelle von 100 V?<br>
          2. Wie verhält sie sich an einer Wechselspannung von 230 V (50 Hz)?
        `,
        solution: `
          <strong>1. Bei Gleichspannung:</strong> Da 100 V > Uz ≈ 90 V ist, zündet die Lampe. Es leuchtet genau eine Elektrode dauerhaft, nämlich die mit dem Minuspol verbundene Kathode.<br><br>
          <strong>2. Bei Wechselspannung:</strong> Die Polarität wechselt 50-mal pro Sekunde (100 Nulldurchgänge). In jeder Halbwelle wechselt die Kathode von links nach rechts. Für das träge menschliche Auge scheinen <strong>beide Elektroden gleichzeitig zu leuchten</strong>!
        `
      }
    ]
  }
];


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
          <span class="katex-render" data-display="true" data-latex="\\tan\\alpha = \\frac{F_{\\text{el}}}{F_g} = \\frac{q \\cdot E}{m \\cdot g} \\iff F_{\\text{el}} = m \\cdot g \\cdot \\tan\\alpha"></span>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 1rem;">
          <div style="background: var(--bg-subtle); padding: 0.9rem; border-radius: 6px; font-size: 0.85rem; line-height: 1.5;">
            <strong>Kräftegleichgewicht:</strong><br>
            Auf die ausgelenkte Kugel der Masse <span class="katex-render" data-display="false" data-latex="m">m</span> wirken 3 Kräfte:<br>
            1. <strong>Gewichtskraft:</strong> <span class="katex-render" data-display="false" data-latex="F_g = m \\cdot g">Fg = m • g</span> (senkrecht nach unten).<br>
            2. <strong>Elektrische Feldkraft:</strong> <span class="katex-render" data-display="false" data-latex="F_{\\text{el}} = q \\cdot E">Fel = q • E</span> (horizontal zur Kondensatorplatte).<br>
            3. <strong>Fadenkraft <span class="katex-render" data-display="false" data-latex="F_S">Fs</span>:</strong> entlang des Fadens.<br>
            Im Dreieck der Kräfte gilt streng trigonometrisch:<br>
            <span class="katex-render" data-display="false" data-latex="\\tan\\alpha = \\frac{\\text{Gegenkathete}}{\\text{Ankathete}} = \\frac{F_{\\text{el}}}{F_g}">tan α = Fel / Fg</span>.
          </div>
          <div style="background: var(--bg-subtle); padding: 0.9rem; border-radius: 6px; font-size: 0.85rem; line-height: 1.5;">
            <strong>Geometrie &amp; Kleinwinkelnäherung:</strong><br>
            Für das Fadenpendel mit Fadenlänge <span class="katex-render" data-display="false" data-latex="l">l</span> und Auslenkung <span class="katex-render" data-display="false" data-latex="s">s</span> gilt:<br>
            <div class="katex-render" data-display="true" data-latex="\\sin\\alpha = \\frac{s}{l}"></div>
            Für kleine Winkel (<span class="katex-render" data-display="false" data-latex="\\alpha \\le 10^{\circ}">α ≤ 10°</span>) gilt die Näherung:<br>
            <div class="katex-render" data-display="true" data-latex="\\tan\\alpha \\approx \\sin\\alpha \\approx \\frac{s}{l} \\implies E \\approx \\frac{m \\cdot g \\cdot s}{q \\cdot l}"></div>
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
          <span class="katex-render" data-display="false" data-latex="l = 1,0\\,\\text{m}">l = 1,0 m</span><br>
          <span class="katex-render" data-display="false" data-latex="s = 4,0\\,\\text{cm} = 0,040\\,\\text{m}">s = 0,040 m</span><br>
          <span class="katex-render" data-display="false" data-latex="m = 5,0\\,\\text{g} = 0,0050\\,\\text{kg}">m = 0,0050 kg</span><br>
          <span class="katex-render" data-display="false" data-latex="q = 2,0\\,\\text{nC} = 2,0 \\cdot 10^{-9}\\,\\text{C}">q = 2,0 • 10⁻⁹ C</span><br>
          <span class="katex-render" data-display="false" data-latex="g = 9,81\\,\\frac{\\text{m}}{\\text{s}^2}">g = 9,81 m/s²</span><br><br>

          <strong>Schritt 1: Auslenkwinkel α berechnen</strong><br>
          <div class="katex-render" data-display="true" data-latex="\\sin\\alpha = \\frac{s}{l} = \\frac{0,040\\,\\text{m}}{1,0\\,\\text{m}} = 0,040 \\implies \\alpha = \\arcsin(0,040) \\approx 2,292^{\circ}"></div><br>

          <strong>Schritt 2: Gewichtskraft Fg und Tangens</strong><br>
          <div class="katex-render" data-display="true" data-latex="F_g = m \\cdot g = 0,0050\\,\\text{kg} \\cdot 9,81\\,\\frac{\\text{m}}{\\text{s}^2} = 0,04905\\,\\text{N} = 49,05\\,\\text{mN}"></div>
          <div class="katex-render" data-display="true" data-latex="\\tan(2,292^{\circ}) \\approx 0,04003"></div><br>

          <strong>Schritt 3: Elektrische Kraft Fel</strong><br>
          <div class="katex-render" data-display="true" data-latex="F_{\\text{el}} = F_g \\cdot \\tan\\alpha = 0,04905\\,\\text{N} \\cdot 0,04003 = 1,963 \\cdot 10^{-3}\\,\\text{N} \\approx 1,96\\,\\text{mN}"></div><br>

          <strong>Schritt 4: Elektrische Feldstärke E</strong><br>
          <div class="katex-render" data-display="true" data-latex="E = \\frac{F_{\\text{el}}}{q} = \\frac{1,963 \\cdot 10^{-3}\\,\\text{N}}{2,0 \\cdot 10^{-9}\\,\\text{C}} = 981\\,500\\,\\frac{\\text{V}}{\\text{m}} \\approx 9,82 \\cdot 10^5\\,\\frac{\\text{V}}{\\text{m}} = 982\\,\\frac{\\text{kV}}{\\text{m}}"></div><br>
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
          <span class="katex-render" data-display="false" data-latex="l = 2,0\\,\\text{m}">l = 2,0 m</span>, <span class="katex-render" data-display="false" data-latex="s = 0,20\\,\\text{m}">s = 0,20 m</span>, <span class="katex-render" data-display="false" data-latex="m = 0,0020\\,\\text{kg}">m = 0,002 kg</span>, <span class="katex-render" data-display="false" data-latex="q = 1,2 \\cdot 10^{-8}\\,\\text{C}">q = 1,2 • 10⁻⁸ C</span>.<br><br>

          <strong>Winkel:</strong><br>
          <div class="katex-render" data-display="true" data-latex="\\sin\\alpha = \\frac{0,20}{2,0} = 0,10 \\implies \\alpha = 5,739^{\circ} \\implies \\tan(5,739^{\circ}) = 0,1005"></div><br>

          <strong>Kräfte:</strong><br>
          <div class="katex-render" data-display="true" data-latex="F_g = 0,0020 \\cdot 9,81 = 0,01962\\,\\text{N} = 19,62\\,\\text{mN}"></div>
          <div class="katex-render" data-display="true" data-latex="F_{\\text{el}} = F_g \\cdot \\tan\\alpha = 0,01962\\,\\text{N} \\cdot 0,1005 = 1,972 \\cdot 10^{-3}\\,\\text{N} = 1,972\\,\\text{mN}"></div><br>

          <strong>Feldstärke:</strong><br>
          <div class="katex-render" data-display="true" data-latex="E = \\frac{F_{\\text{el}}}{q} = \\frac{1,972 \\cdot 10^{-3}\\,\\text{N}}{1,2 \\cdot 10^{-8}\\,\\text{C}} \\approx 164\\,333\\,\\frac{\\text{V}}{\\text{m}} \\approx 1,64 \\cdot 10^5\\,\\frac{\\text{V}}{\\text{m}} = 164\\,\\frac{\\text{kV}}{\\text{m}}"></div>
        `
      },
      {
        title: 'Aufgabe 3 (Klausur-Standard): Plattenkondensator mit exaktem Winkel & CAS solve-Befehl',
        prompt: `
          Zwischen zwei horizontalen Platten (Abstand d = 8,0 cm, Spannung U = 4000 V) hängt an einem Faden eine kleine leitende Kugel (Masse m = 0,80 g).
          Sobald das elektrische Feld eingeschaltet wird, schlägt der Faden um genau α = 14,5° aus.
          a) Bestimme die elektrische Feldstärke E im Kondensator.
          b) Berechne die Ladung q der Kugel und gib den TI-Nspire CAS solve-Befehl an.
        `,
        solution: `
          <strong>a) Elektrische Feldstärke E:</strong><br>
          <div class="katex-render" data-display="true" data-latex="E = \\frac{U}{d} = \\frac{4000\\,\\text{V}}{0,080\\,\\text{m}} = 50\\,000\\,\\frac{\\text{V}}{\\text{m}} = 50\\,\\frac{\\text{kV}}{\\text{m}}"></div><br>

          <strong>b) Ladung q &amp; CAS-Befehl:</strong><br>
          Am ausgelenkten Faden herrscht Kräftegleichgewicht:<br>
          <span class="katex-render" data-display="false" data-latex="\\tan\\alpha = \\frac{F_{\\text{el}}}{F_g} = \\frac{q \\cdot E}{m \\cdot g} \\implies q = \\frac{m \\cdot g \\cdot \\tan\\alpha}{E}"></span><br>
          Eingabe im TI-Nspire CAS:<br>
          <code style="color:#fde047;">solve(tan(14.5 * °) = (q * 50000) / (0.00080 * 9.81), q)</code><br>
          <div class="katex-render" data-display="true" data-latex="q = \\frac{0,00080\\,\\text{kg} \\cdot 9,81\\,\\text{m/s}^2 \\cdot \\tan(14{,}5^{\circ})}{50\\,000\\,\\text{V/m}} = \\frac{7{,}848 \\cdot 10^{-3}\\,\\text{N} \\cdot 0,2586}{50\\,000\\,\\text{V/m}} \\approx 4{,}06 \\cdot 10^{-8}\\,\\text{C} = 40{,}6\\,\\text{nC}"></div>
          <strong style="color:#10b981;">Ergebnis:</strong> Die Kugel trägt eine Ladung von <strong>q ≈ 40,6 nC</strong>.
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
          <div class="katex-render" data-display="true" data-latex="1\\,\\frac{\\text{V}}{\\text{m}} = \\frac{1\\,\\frac{\\text{J}}{\\text{C}}}{\\text{m}} = \\frac{1\\,\\text{N}\\cdot\\text{m}}{\\text{C}\\cdot\\text{m}} = 1\\,\\frac{\\text{N}}{\\text{C}} = \\frac{1\\,\\frac{\\text{kg}\\cdot\\text{m}}{\\text{s}^2}}{\\text{A}\\cdot\\text{s}} = 1\\,\\frac{\\text{kg}\\cdot\\text{m}}{\\text{s}^3 \\cdot \\text{A}}"></div><br>

          <strong>2. Schwebekriterium im vertikalen Plattenkondensator:</strong><br>
          Eine geladene Kugel schwebt kräftefrei, wenn die nach oben gerichtete elektrische Feldkraft exakt die nach unten wirkende Gewichtskraft kompensiert:<br>
          <div class="katex-render" data-display="true" data-latex="F_{\\text{el}} = F_g \\iff q \\cdot E = m \\cdot g \\implies E_{\\text{schwebe}} = \\frac{m \\cdot g}{q}"></div>
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
          <div class="katex-render" data-display="true" data-latex="F_g = m \\cdot g = 2,0 \\cdot 10^{-3}\\,\\text{kg} \\cdot 9,81\\,\\frac{\\text{m}}{\\text{s}^2} = 0,01962\\,\\text{N} = 19,62\\,\\text{mN}"></div><br>

          <strong>b) Elektrische Feldkraft Fel:</strong><br>
          <div class="katex-render" data-display="true" data-latex="F_{\\text{el}} = Q \\cdot E = 1,2 \\cdot 10^{-8}\\,\\text{C} \\cdot 100\\,\\frac{\\text{N}}{\\text{C}} = 1,2 \\cdot 10^{-6}\\,\\text{N} = 0,0012\\,\\text{mN}"></div><br>

          <strong>c) Vergleich:</strong><br>
          <div class="katex-render" data-display="true" data-latex="\\frac{F_g}{F_{\\text{el}}} = \\frac{1,962 \\cdot 10^{-2}\\,\\text{N}}{1,2 \\cdot 10^{-6}\\,\\text{N}} = 16\\,350"></div>
          <em>Ergebnis:</em> Die Gewichtskraft ist bei dieser Kugel mehr als <strong>16.000-mal stärker</strong> als die elektrische Kraft!
        `
      },
      {
        title: 'Aufgabe 2 (Klausur-Klassiker): Schwebendes Öltröpfchen (Millikan-Versuch)',
        prompt: `
          Im horizontalen Plattenkondensator (Plattenabstand d = 6,0 mm) schwebt ein negativ geladenes Öltröpfchen der Masse m = 3,20 • 10⁻¹⁵ kg bei einer anliegenden Spannung von U = 392 V kräftefrei.
          a) Welche Platte (oben oder unten) muss mit dem Pluspol verbunden sein?
          b) Berechne die elektrische Ladung q des Tröpfchens.
          c) Wie vielen Elementarladungen e = 1,602 • 10⁻¹⁹ C entspricht diese Ladung?
          d) Die Spannung wird plötzlich umgepolt. Mit welcher Beschleunigung a bewegt sich das Tröpfchen unmittelbar nach dem Umpolen nach unten?
        `,
        solution: `
          <strong>a) Polung der Platten:</strong><br>
          Die Gewichtskraft <span class="katex-render" data-display="false" data-latex="F_g">Fg</span> wirkt nach unten. Zum Schweben muss die elektrische Kraft <span class="katex-render" data-display="false" data-latex="F_{\\text{el}}">Fel</span> nach <em>oben</em> gerichtet sein. Da das Tröpfchen negativ geladen ist, muss die <strong>obere Platte positiv</strong> geladen sein (Anziehung entgegengesetzter Ladungen).<br><br>

          <strong>b) Berechnung der Ladung q:</strong><br>
          Im Schwebefall gilt <span class="katex-render" data-display="false" data-latex="F_{\\text{el}} = F_g \\iff q \\cdot \\frac{U}{d} = m \\cdot g \\implies q = \\frac{m \\cdot g \\cdot d}{U}"></span>.<br>
          <div class="katex-render" data-display="true" data-latex="q = \\frac{3{,}20 \\cdot 10^{-15}\\,\\text{kg} \\cdot 9,81\\,\\text{m/s}^2 \\cdot 6{,}0 \\cdot 10^{-3}\\,\\text{m}}{392\\,\\text{V}} = \\frac{1{,}8835 \\cdot 10^{-16}}{392} \\approx 4{,}805 \\cdot 10^{-19}\\,\\text{C}"></div><br>

          <strong>c) Anzahl der Elementarladungen:</strong><br>
          <div class="katex-render" data-display="true" data-latex="n = \\frac{q}{e} = \\frac{4{,}805 \\cdot 10^{-19}\\,\\text{C}}{1{,}602 \\cdot 10^{-19}\\,\\text{C}} = 3{,}00 \\approx 3"></div>
          Das Tröpfchen trägt genau <strong>3 überschüssige Elektronen</strong>!<br><br>

          <strong>d) Beschleunigung nach Umpolung:</strong><br>
          Nach dem Umpolen zeigt <span class="katex-render" data-display="false" data-latex="F_{\\text{el}}">Fel</span> ebenfalls nach unten (<span class="katex-render" data-display="false" data-latex="F_{\\text{el}} = F_g">Fel = Fg</span>).<br>
          Gesamtkraft nach unten: <span class="katex-render" data-display="false" data-latex="F_{\\text{ges}} = F_g + F_{\\text{el}} = 2 \\cdot F_g = 2 \\cdot m \\cdot g"></span>.<br>
          Nach Newtons 2. Axiom: <span class="katex-render" data-display="false" data-latex="a = \\frac{F_{\\text{ges}}}{m} = \\frac{2 \\cdot m \\cdot g}{m} = 2 \\cdot g = 2 \\cdot 9{,}81\\,\\frac{\\text{m}}{\\text{s}^2} = 19{,}62\\,\\frac{\\text{m}}{\\text{s}^2}"></span>.
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
            • <strong>Kondensator C:</strong> speichert die Ladung <span class="katex-render" data-display="false" data-latex="Q = C \\cdot U">Q = C • U</span>.<br>
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
      },
      {
        title: 'Aufgabe 3 (Klausur-Standard): Plattenkondensator mit exaktem Winkel & CAS solve-Befehl',
        prompt: `
          Zwischen zwei horizontalen Platten (Abstand d = 8,0 cm, Spannung U = 4000 V) hängt an einem Faden eine kleine leitende Kugel (Masse m = 0,80 g).
          Sobald das elektrische Feld eingeschaltet wird, schlägt der Faden um genau α = 14,5° aus.
          a) Bestimme die elektrische Feldstärke E im Kondensator.
          b) Berechne die Ladung q der Kugel und gib den TI-Nspire CAS solve-Befehl an.
        `,
        solution: `
          <strong>a) Elektrische Feldstärke E:</strong><br>
          <div class="katex-render" data-display="true" data-latex="E = \\frac{U}{d} = \\frac{4000\\,\\text{V}}{0,080\\,\\text{m}} = 50\\,000\\,\\frac{\\text{V}}{\\text{m}} = 50\\,\\frac{\\text{kV}}{\\text{m}}"></div><br>

          <strong>b) Ladung q &amp; CAS-Befehl:</strong><br>
          Am ausgelenkten Faden herrscht Kräftegleichgewicht:<br>
          <span class="katex-render" data-display="false" data-latex="\\tan\\alpha = \\frac{F_{\\text{el}}}{F_g} = \\frac{q \\cdot E}{m \\cdot g} \\implies q = \\frac{m \\cdot g \\cdot \\tan\\alpha}{E}"></span><br>
          Eingabe im TI-Nspire CAS:<br>
          <code style="color:#fde047;">solve(tan(14.5 * °) = (q * 50000) / (0.00080 * 9.81), q)</code><br>
          <div class="katex-render" data-display="true" data-latex="q = \\frac{0,00080\\,\\text{kg} \\cdot 9,81\\,\\text{m/s}^2 \\cdot \\tan(14{,}5^{\circ})}{50\\,000\\,\\text{V/m}} = \\frac{7{,}848 \\cdot 10^{-3}\\,\\text{N} \\cdot 0,2586}{50\\,000\\,\\text{V/m}} \\approx 4{,}06 \\cdot 10^{-8}\\,\\text{C} = 40{,}6\\,\\text{nC}"></div>
          <strong style="color:#10b981;">Ergebnis:</strong> Die Kugel trägt eine Ladung von <strong>q ≈ 40,6 nC</strong>.
        `
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
          <span class="katex-render" data-display="true" data-latex="I(t) = \\frac{dQ}{dt} \\iff Q = \\int_{t_1}^{t_2} I(t)\\,dt"></span>
        </div>
        <div style="background: var(--bg-subtle); padding: 1rem; border-radius: 8px; margin-top: 0.8rem; font-size: 0.86rem; line-height: 1.55;">
          <strong>Stammfunktion für die Klausur:</strong><br>
          Hat man <span class="katex-render" data-display="false" data-latex="I(t) = I_0 \\cdot e^{-k \\cdot t}">I(t) = I0 · e^(-k•t)</span> ermittelt, so lautet die Stammfunktion:<br>
          <div class="katex-render" data-display="true" data-latex="\\int I(t)\\,dt = -\\frac{I_0}{k} \\cdot e^{-k \\cdot t}"></div>
          Für die bis unendlich abgeflossene Gesamtladung <span class="katex-render" data-display="false" data-latex="Q_{\\text{ges}}">Q_ges</span> folgt:<br>
          <div class="katex-render" data-display="true" data-latex="Q_{\\text{ges}} = \\int_0^{\infty} I_0 \\cdot e^{-k \\cdot t}\\,dt = \\left[ -\\frac{I_0}{k} \\cdot e^{-k \\cdot t} \\right]_0^{\infty} = 0 - \\left( -\\frac{I_0}{k} \\right) = \\frac{I_0}{k} = I_0 \\cdot \\tau"></div>
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
          Da <span class="katex-render" data-display="false" data-latex="b = 0,9685 = e^{-k} \\implies k = -\\ln(0,9685) \\approx 0,0320\\,\\text{s}^{-1}">k = 0,0320</span>:<br>
          <div class="katex-render" data-display="true" data-latex="Q(60) = \\int_0^{60} 334,45\\,\\mu\\text{A} \\cdot e^{-0,0320 \\cdot t}\\,dt = \\left[ -\\frac{334,45}{0,0320} e^{-0,0320 \\cdot t} \\right]_0^{60}"></div>
          <div class="katex-render" data-display="true" data-latex="Q(60) = 10\\,451\\,\\mu\\text{C} \\cdot (1 - e^{-1,92}) = 10\\,451\\,\\mu\\text{C} \\cdot (1 - 0,1466) \\approx 8919\\,\\mu\\text{C} = 8,92\\,\\text{mC}"></div>
        `
      },
      {
        title: 'Aufgabe 2 (Klausur-Klassiker): Schwebendes Öltröpfchen (Millikan-Versuch)',
        prompt: `
          Im horizontalen Plattenkondensator (Plattenabstand d = 6,0 mm) schwebt ein negativ geladenes Öltröpfchen der Masse m = 3,20 • 10⁻¹⁵ kg bei einer anliegenden Spannung von U = 392 V kräftefrei.
          a) Welche Platte (oben oder unten) muss mit dem Pluspol verbunden sein?
          b) Berechne die elektrische Ladung q des Tröpfchens.
          c) Wie vielen Elementarladungen e = 1,602 • 10⁻¹⁹ C entspricht diese Ladung?
          d) Die Spannung wird plötzlich umgepolt. Mit welcher Beschleunigung a bewegt sich das Tröpfchen unmittelbar nach dem Umpolen nach unten?
        `,
        solution: `
          <strong>a) Polung der Platten:</strong><br>
          Die Gewichtskraft <span class="katex-render" data-display="false" data-latex="F_g">Fg</span> wirkt nach unten. Zum Schweben muss die elektrische Kraft <span class="katex-render" data-display="false" data-latex="F_{\\text{el}}">Fel</span> nach <em>oben</em> gerichtet sein. Da das Tröpfchen negativ geladen ist, muss die <strong>obere Platte positiv</strong> geladen sein (Anziehung entgegengesetzter Ladungen).<br><br>

          <strong>b) Berechnung der Ladung q:</strong><br>
          Im Schwebefall gilt <span class="katex-render" data-display="false" data-latex="F_{\\text{el}} = F_g \\iff q \\cdot \\frac{U}{d} = m \\cdot g \\implies q = \\frac{m \\cdot g \\cdot d}{U}"></span>.<br>
          <div class="katex-render" data-display="true" data-latex="q = \\frac{3{,}20 \\cdot 10^{-15}\\,\\text{kg} \\cdot 9,81\\,\\text{m/s}^2 \\cdot 6{,}0 \\cdot 10^{-3}\\,\\text{m}}{392\\,\\text{V}} = \\frac{1{,}8835 \\cdot 10^{-16}}{392} \\approx 4{,}805 \\cdot 10^{-19}\\,\\text{C}"></div><br>

          <strong>c) Anzahl der Elementarladungen:</strong><br>
          <div class="katex-render" data-display="true" data-latex="n = \\frac{q}{e} = \\frac{4{,}805 \\cdot 10^{-19}\\,\\text{C}}{1{,}602 \\cdot 10^{-19}\\,\\text{C}} = 3{,}00 \\approx 3"></div>
          Das Tröpfchen trägt genau <strong>3 überschüssige Elektronen</strong>!<br><br>

          <strong>d) Beschleunigung nach Umpolung:</strong><br>
          Nach dem Umpolen zeigt <span class="katex-render" data-display="false" data-latex="F_{\\text{el}}">Fel</span> ebenfalls nach unten (<span class="katex-render" data-display="false" data-latex="F_{\\text{el}} = F_g">Fel = Fg</span>).<br>
          Gesamtkraft nach unten: <span class="katex-render" data-display="false" data-latex="F_{\\text{ges}} = F_g + F_{\\text{el}} = 2 \\cdot F_g = 2 \\cdot m \\cdot g"></span>.<br>
          Nach Newtons 2. Axiom: <span class="katex-render" data-display="false" data-latex="a = \\frac{F_{\\text{ges}}}{m} = \\frac{2 \\cdot m \\cdot g}{m} = 2 \\cdot g = 2 \\cdot 9{,}81\\,\\frac{\\text{m}}{\\text{s}^2} = 19{,}62\\,\\frac{\\text{m}}{\\text{s}^2}"></span>.
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
          <span class="katex-render" data-display="true" data-latex="C = \\frac{Q}{U} = \\varepsilon_0 \\cdot \\varepsilon_r \\cdot \\frac{A}{d} \\quad [\\text{Farad: } \\text{F}] \\qquad W_{\\text{el}} = \\frac{1}{2} C U^2 = \\frac{1}{2} Q U"></span>
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
          <span class="katex-render" data-display="false" data-latex="A = 0,040\\,\\text{m}^2">A = 0,04 m²</span>, <span class="katex-render" data-display="false" data-latex="d = 1,5 \\cdot 10^{-3}\\,\\text{m}">d = 1,5 • 10⁻³ m</span>.<br>
          <div class="katex-render" data-display="true" data-latex="C = 8,854 \\cdot 10^{-12} \\cdot \\frac{0,040}{1,5 \\cdot 10^{-3}} = 2,36 \\cdot 10^{-10}\\,\\text{F} = 236\\,\\text{pF}"></div>
          <div class="katex-render" data-display="true" data-latex="Q = C \\cdot U = 236 \\cdot 10^{-12}\\,\\text{F} \\cdot 300\\,\\text{V} = 7,08 \\cdot 10^{-8}\\,\\text{C} = 70,8\\,\\text{nC}"></div>
          <div class="katex-render" data-display="true" data-latex="W_{\\text{el}} = \\frac{1}{2} \\cdot C \\cdot U^2 = \\frac{1}{2} \\cdot 2,36 \\cdot 10^{-10} \\cdot 90\\,000 = 1,06 \\cdot 10^{-5}\\,\\text{J} = 10,6\\,\\mu\\text{J}"></div>
        `
      },
      {
        title: 'Aufgabe 2 (Abitur-Liebling): Plattenabstand verdoppeln – Quelle angeschlossen vs. getrennt',
        prompt: `
          Ein luftgefüllter Plattenkondensator (C₀ = 100 pF) wird an eine Gleichspannungsquelle von U₀ = 200 V angeschlossen.
          Der Plattenabstand d wird nun von d₀ auf 2•d₀ verdoppelt.
          Untersuche für beide Fälle, wie sich C, U, Q, E und Wel verändern:
          Fall A: Die Spannungsquelle bleibt während der Abstandsänderung dauerhaft angeschlossen.
          Fall B: Der Kondensator wird vor der Abstandsänderung von der Quelle getrennt.
        `,
        solution: `
          <strong>Grundformel:</strong> <span class="katex-render" data-display="false" data-latex="C = \\varepsilon_0 \\cdot \\frac{A}{d}">C = ε₀ A / d</span>. Bei Verdopplung von <span class="katex-render" data-display="false" data-latex="d">d</span> halbiert sich die Kapazität in beiden Fällen: <span class="katex-render" data-display="false" data-latex="C_1 = \\frac{1}{2} C_0 = 50\\,\\text{pF}">C1 = 50 pF</span>.<br><br>

          <strong>Fall A: Spannungsquelle bleibt angeschlossen (U = const. = 200 V)</strong><br>
          • Spannung: <span class="katex-render" data-display="false" data-latex="U_1 = U_0 = 200\\,\\text{V}">U1 = 200 V</span> (unverändert).<br>
          • Ladung: <span class="katex-render" data-display="false" data-latex="Q_1 = C_1 \\cdot U_0 = \\frac{1}{2} C_0 U_0 = \\frac{1}{2} Q_0 = 10\\,\\text{nC}">Q1 = 10 nC</span> (<strong>halbiert sich</strong>; Ladung fließt in die Batterie zurück).<br>
          • Feldstärke: <span class="katex-render" data-display="false" data-latex="E_1 = \\frac{U_0}{2d_0} = \\frac{1}{2} E_0">E1 = E0/2</span> (<strong>halbiert sich</strong>).<br>
          • Energie: <span class="katex-render" data-display="false" data-latex="W_1 = \\frac{1}{2} C_1 U_0^2 = \\frac{1}{2} (\\frac{1}{2} C_0) U_0^2 = \\frac{1}{2} W_0">W1 = W0/2</span> (<strong>halbiert sich</strong>).<br><br>

          <strong>Fall B: Vorher von Quelle getrennt (Q = const. = 20 nC)</strong><br>
          • Ladung: <span class="katex-render" data-display="false" data-latex="Q_1 = Q_0 = 20\\,\\text{nC}">Q1 = 20 nC</span> (Ladung kann nicht abfließen).<br>
          • Spannung: <span class="katex-render" data-display="false" data-latex="U_1 = \\frac{Q_0}{C_1} = \\frac{Q_0}{\\frac{1}{2} C_0} = 2 \\cdot U_0 = 400\\,\\text{V}">U1 = 400 V</span> (<strong>verdoppelt sich!</strong>).<br>
          • Feldstärke: <span class="katex-render" data-display="false" data-latex="E_1 = \\frac{U_1}{2d_0} = \\frac{2U_0}{2d_0} = \\frac{U_0}{d_0} = E_0">E1 = E0</span> (<strong>bleibt exakt konstant!</strong>).<br>
          • Energie: <span class="katex-render" data-display="false" data-latex="W_1 = \\frac{Q_0^2}{2 C_1} = \\frac{Q_0^2}{2 \\cdot (\\frac{1}{2} C_0)} = 2 \\cdot W_0">W1 = 2 • W0</span> (<strong>verdoppelt sich!</strong>).<br><br>
          <em>Physikalische Erklärung der Energiezunahme im Fall B:</em><br>
          Obwohl keine Batterie angeschlossen ist, hat sich die Energie verdoppelt! Woher kommt die Energie? Man muss die beiden entgegengesetzt geladenen Platten gegen ihre elektrostatische Anziehungskraft auseinanderziehen. Die dafür von Hand verrichtete mechanische Arbeit <span class="katex-render" data-display="false" data-latex="W_{\\text{mech}} = F_{\\text{el}} \\cdot \\Delta d">Wmech = Fel • Δd</span> fließt zu 100% als zusätzliche Feldenergie in das elektrische Feld des Kondensators!
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
    skill.id === 'kondensator-versuch' ? 'schaltungen' : null
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
    renderPhysikKaTeX();
  }, 80);
}

window.addEventListener('DOMContentLoaded', () => {
  initPhysikSimulations();
});


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
      ctx.fillText('Fläche = Ladung Q0', originX + 20, originY - 25);
    }

    ctx.restore();
  }
};



