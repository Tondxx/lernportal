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
        title: 'Musteraufgabe mit Erklärung (Schultafel S. 14): Coulomb-Kraft F(Q) im 5-Schritte-Schema',
        prompt: `
          Im Experiment wird die Coulomb-Kraft <span class="katex-render" data-display="false" data-latex="F">F</span> zwischen zwei geladenen Kugeln bei konstantem Abstand in Abhängigkeit von der Ladung <span class="katex-render" data-display="false" data-latex="Q">Q</span> gemessen (Originalbeispiel von der Schultafel, S. 14):
          <table style="width:100%; border-collapse:collapse; margin:0.8rem 0; font-size:0.88rem; text-align:center;">
            <tr style="background:var(--bg-subtle);">
              <th style="border:1px solid var(--border-subtle); padding:0.4rem;">Q in nC</th>
              <td style="border:1px solid var(--border-subtle); padding:0.4rem;">10</td>
              <td style="border:1px solid var(--border-subtle); padding:0.4rem;">20</td>
              <td style="border:1px solid var(--border-subtle); padding:0.4rem;">30</td>
              <td style="border:1px solid var(--border-subtle); padding:0.4rem;">40</td>
              <td style="border:1px solid var(--border-subtle); padding:0.4rem;">50</td>
              <td style="border:1px solid var(--border-subtle); padding:0.4rem;">60</td>
            </tr>
            <tr>
              <th style="border:1px solid var(--border-subtle); padding:0.4rem;">F in mN</th>
              <td style="border:1px solid var(--border-subtle); padding:0.4rem;">0,06</td>
              <td style="border:1px solid var(--border-subtle); padding:0.4rem;">0,24</td>
              <td style="border:1px solid var(--border-subtle); padding:0.4rem;">0,54</td>
              <td style="border:1px solid var(--border-subtle); padding:0.4rem;">0,97</td>
              <td style="border:1px solid var(--border-subtle); padding:0.4rem;">1,51</td>
              <td style="border:1px solid var(--border-subtle); padding:0.4rem;">2,18</td>
            </tr>
          </table>
          Führe die vollständige Messwertauswertung nach dem 5-Schritte-Schema deines Lehrers durch.
        `,
        solution: `
          <div style="display:flex; flex-direction:column; gap:0.8rem; font-size:0.86rem; line-height:1.5;">
            <div style="background:var(--bg-subtle); padding:0.75rem; border-left:3px solid #38bdf8; border-radius:6px;">
              <strong style="color:#38bdf8;">1. Vermutung aufstellen (Hypothese formulieren):</strong><br>
              <em>Wenn sich die Ladungsmenge <span class="katex-render" data-display="false" data-latex="Q">Q</span> verdoppelt (z. B. von 10 nC auf 20 nC bzw. 20 nC auf 40 nC), dann vervierfacht sich annähernd die Kraft <span class="katex-render" data-display="false" data-latex="F">F</span> (von 0,06 auf 0,24 mN bzw. 0,24 auf 0,97 mN; denn <span class="katex-render" data-display="false" data-latex="\\frac{0{,}24}{0{,}06} = 4 = 2^2">0,24/0,06 = 4</span>). Deswegen vermuten wir einen <strong>quadratischen Zusammenhang</strong> der Form <span class="katex-render" data-display="false" data-latex="F \\sim Q^2">F ~ Q²</span> (<span class="katex-render" data-display="false" data-latex="F = k \\cdot Q^2">F = k • Q²</span>).</em>
            </div>

            <div style="background:var(--bg-subtle); padding:0.75rem; border-left:3px solid #10b981; border-radius:6px;">
              <strong style="color:#10b981;">2. Beweis durchführen (TI-Nspire Regression &amp; Quotientenbildung):</strong><br>
              • <strong>Mit TI-Nspire Regression (S. 14):</strong> Unter <code>Lists &amp; Spreadsheet</code> quadratische Regression durchführen:<br>
              <div class="katex-render" data-display="true" data-latex="y = 0{,}000606 \\cdot x^2 \\quad (R^2 \\approx 0{,}9996)"></div>
              <em>(Lineare Terme <span class="katex-render" data-display="false" data-latex="+ 0{,}0018x - 0{,}014">+ 0,0018x - 0,014</span> werden wegen vernachlässigbarer Messungenauigkeit durchgestrichen).</em><br>
              • <strong>Mit Tabellen-Quotienten <span class="katex-render" data-display="false" data-latex="k = \\frac{F}{Q^2}">k = F/Q²</span> in der 3. Zeile:</strong><br>
              <span class="katex-render" data-display="false" data-latex="k_1 = \\frac{0{,}06}{100} = 0{,}000600">k1 = 0,000600</span> | <span class="katex-render" data-display="false" data-latex="k_2 = \\frac{0{,}24}{400} = 0{,}000600">k2 = 0,000600</span> | <span class="katex-render" data-display="false" data-latex="k_3 = \\frac{0{,}54}{900} = 0{,}000600">k3 = 0,000600</span><br>
              <span class="katex-render" data-display="false" data-latex="k_4 = \\frac{0{,}97}{1600} = 0{,}000606">k4 = 0,000606</span> | <span class="katex-render" data-display="false" data-latex="k_5 = \\frac{1{,}51}{2500} = 0{,}000604">k5 = 0,000604</span> | <span class="katex-render" data-display="false" data-latex="k_6 = \\frac{2{,}18}{3600} = 0{,}000606">k6 = 0,000606</span>.
            </div>

            <div style="background:var(--bg-subtle); padding:0.75rem; border-left:3px solid #f59e0b; border-radius:6px;">
              <strong style="color:#f59e0b;">3. Beurteilung (R² auswerten):</strong><br>
              <em>Weil das Bestimmtheitsmaß <span class="katex-render" data-display="false" data-latex="R^2 \\approx 0{,}9996">R² ≈ 0,9996</span> sehr dicht an 1 liegt (bzw. die Werte für <span class="katex-render" data-display="false" data-latex="\\frac{F}{Q^2}">F/Q²</span> annähernd konstant sind), ist unsere Vermutung bestätigt.</em>
            </div>

            <div style="background:var(--bg-subtle); padding:0.75rem; border-left:3px solid #8b5cf6; border-radius:6px;">
              <strong style="color:#8b5cf6;">4. Mittelwert berechnen &amp; Funktionsgleichung mit Einheit angeben:</strong><br>
              Mittelwert: <span class="katex-render" data-display="false" data-latex="\\bar{k} = 0{,}000606\\,\\frac{\\text{mN}}{(\\text{nC})^2}">k̄ = 0,000606 mN/(nC)²</span>.<br>
              Funktionsgleichung:<br>
              <div class="katex-render" data-display="true" data-latex="F(Q) = 0{,}000606\\,\\frac{\\text{mN}}{(\\text{nC})^2} \\cdot Q^2"></div>
            </div>

            <div style="background:var(--bg-subtle); padding:0.75rem; border-left:3px solid #ec4899; border-radius:6px;">
              <strong style="color:#ec4899;">5. Beispiel / Anwendung (Tafelnotiz S. 14):</strong><br>
              Berechne die Kraft <span class="katex-render" data-display="false" data-latex="F">F</span> für eine Ladung von <span class="katex-render" data-display="false" data-latex="Q = 70\\,\\text{nC}">Q = 70 nC</span>:<br>
              <div class="katex-render" data-display="true" data-latex="F(70\\,\\text{nC}) = 0{,}000606\\,\\frac{\\text{mN}}{(\\text{nC})^2} \\cdot (70\\,\\text{nC})^2 = 0{,}000606 \\cdot 4900 \\approx 2{,}97\\,\\text{mN}"></div>
            </div>
          </div>
        `
      },
      {
        title: 'Übungsaufgabe 1 (Klausur-Typ): Plattenkondensator F(U) mit CAS & 5-Schritte-Schema',
        prompt: `
          Im Praktikum wird die Kraft F zwischen zwei Kondensatorplatten in Abhängigkeit von der Hochspannung U gemessen:
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
          Führe die Auswertung nach dem 5-Schritte-Schema deines Lehrers durch (inkl. Bestimmung von U bei F = 50 mN).
        `,
        solution: `
          <strong>1. Vermutung aufstellen:</strong><br>
          Wenn sich die Spannung <span class="katex-render" data-display="false" data-latex="U">U</span> von 2,0 kV auf 4,0 kV verdoppelt, vervierfacht sich annähernd die Kraft <span class="katex-render" data-display="false" data-latex="F">F</span> von 35,5 mN auf 142,0 mN (<span class="katex-render" data-display="false" data-latex="\\frac{142{,}0}{35{,}5} = 4{,}0 = 2^2">142/35,5 = 4</span>). Deswegen vermuten wir einen quadratischen Zusammenhang der Form <span class="katex-render" data-display="false" data-latex="F \\sim U^2">F ~ U²</span> (<span class="katex-render" data-display="false" data-latex="F = k \\cdot U^2">F = k · U²</span>).<br><br>

          <strong>2. Beweis durchführen (Quotientenbildung &amp; CAS):</strong><br>
          Spalte mit <span class="katex-render" data-display="false" data-latex="k = \\frac{F}{U^2}">k = F/U²</span> in Lists &amp; Spreadsheet berechnen (<code style="color:#fde047;">=f / (u^2)</code>):<br>
          • <span class="katex-render" data-display="false" data-latex="U = 1\\,\\text{kV}: k = 9{,}00\\,\\frac{\\text{mN}}{\\text{kV}^2}">k1 = 9,00</span> | <span class="katex-render" data-display="false" data-latex="U = 2\\,\\text{kV}: k = 8{,}875\\,\\frac{\\text{mN}}{\\text{kV}^2}">k2 = 8,875</span> | <span class="katex-render" data-display="false" data-latex="U = 3\\,\\text{kV}: k = 8{,}889\\,\\frac{\\text{mN}}{\\text{kV}^2}">k3 = 8,889</span><br>
          • <span class="katex-render" data-display="false" data-latex="U = 4\\,\\text{kV}: k = 8{,}875\\,\\frac{\\text{mN}}{\\text{kV}^2}">k4 = 8,875</span> | <span class="katex-render" data-display="false" data-latex="U = 5\\,\\text{kV}: k = 8{,}900\\,\\frac{\\text{mN}}{\\text{kV}^2}">k5 = 8,900</span>.<br>
          Regression <code>LinRegMx(u2, f)</code> liefert <span class="katex-render" data-display="false" data-latex="R^2 = 0{,}99998">R² = 0,99998</span>.<br><br>

          <strong>3. Beurteilung:</strong><br>
          <em>Weil das Bestimmtheitsmaß <span class="katex-render" data-display="false" data-latex="R^2">R²</span> sehr dicht an 1 liegt (bzw. die Werte für <span class="katex-render" data-display="false" data-latex="F/U^2">F/U²</span> im Rahmen der Messgenauigkeit konstant sind), ist unsere Vermutung bestätigt.</em><br><br>

          <strong>4. Mittelwert &amp; Funktionsgleichung mit Einheit:</strong><br>
          <span class="katex-render" data-display="false" data-latex="\\bar{k} = 8{,}89\\,\\frac{\\text{mN}}{\\text{kV}^2}">k̄ = 8,89 mN/kV²</span>.<br>
          <div class="katex-render" data-display="true" data-latex="F(U) = 8{,}89\\,\\frac{\\text{mN}}{\\text{kV}^2} \\cdot U^2"></div><br>

          <strong>5. Anwendung (Extrapolation):</strong><br>
          Welche Spannung <span class="katex-render" data-display="false" data-latex="U">U</span> erzeugt eine Kraft von <span class="katex-render" data-display="false" data-latex="F = 50\\,\\text{mN}">F = 50 mN</span>?<br>
          <div class="katex-render" data-display="true" data-latex="50 = 8{,}89 \\cdot U^2 \\implies U = \\sqrt{\\frac{50}{8{,}89}} \\approx 2{,}37\\,\\text{kV} = 2370\\,\\text{V}"></div>
        `
      },
      {
        title: 'Übungsaufgabe 2 (Klausur-Typ): Coulomb-Kraft F(r) & Ladungsbestimmung',
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
          Führe die Auswertung im 5-Schritte-Schema durch und berechne die Ladung Q jeder Kugel.
        `,
        solution: `
          <strong>1. Vermutung aufstellen:</strong><br>
          Wenn sich der Abstand <span class="katex-render" data-display="false" data-latex="r">r</span> verdoppelt (von 2 auf 4 cm bzw. 4 auf 8 cm), verringert sich die Kraft <span class="katex-render" data-display="false" data-latex="F">F</span> annähernd um den Faktor 4 (von 162,5 auf 40,6 mN; denn <span class="katex-render" data-display="false" data-latex="\\frac{162{,}5}{40{,}6} \\approx 4{,}0">162,5/40,6 ≈ 4</span>). Deswegen vermuten wir einen Zusammenhang der Form <span class="katex-render" data-display="false" data-latex="F \\sim \\frac{1}{r^2}">F ~ 1/r²</span> (<span class="katex-render" data-display="false" data-latex="F = k \\cdot \\frac{1}{r^2}">F = k · 1/r²</span>).<br><br>

          <strong>2. Beweis durchführen (Produktprüfung):</strong><br>
          Konstantenprodukt <span class="katex-render" data-display="false" data-latex="k = F \\cdot r^2">k = F • r²</span> berechnen:<br>
          • <span class="katex-render" data-display="false" data-latex="r=2\\,\\text{cm}: 162{,}5 \\cdot 4 = 650{,}0\\,\\text{mN}\\cdot\\text{cm}^2">k = 650,0</span> | <span class="katex-render" data-display="false" data-latex="r=3\\,\\text{cm}: 72{,}2 \\cdot 9 = 649{,}8\\,\\text{mN}\\cdot\\text{cm}^2">k = 649,8</span><br>
          • <span class="katex-render" data-display="false" data-latex="r=4\\,\\text{cm}: 40{,}6 \\cdot 16 = 649{,}6\\,\\text{mN}\\cdot\\text{cm}^2">k = 649,6</span> | <span class="katex-render" data-display="false" data-latex="r=5\\,\\text{cm}: 26{,}0 \\cdot 25 = 650{,}0\\,\\text{mN}\\cdot\\text{cm}^2">k = 650,0</span><br>
          • <span class="katex-render" data-display="false" data-latex="r=8\\,\\text{cm}: 10{,}2 \\cdot 64 = 652{,}8\\,\\text{mN}\\cdot\\text{cm}^2">k = 652,8</span>.<br><br>

          <strong>3. Beurteilung:</strong><br>
          <em>Weil die Werte für <span class="katex-render" data-display="false" data-latex="F \\cdot r^2">F • r²</span> annähernd konstant sind, ist unsere Vermutung bestätigt.</em><br><br>

          <strong>4. Mittelwert &amp; Funktionsgleichung mit Einheit:</strong><br>
          <span class="katex-render" data-display="false" data-latex="\\bar{k} = 650{,}4\\,\\text{mN}\\cdot\\text{cm}^2 = 6{,}504 \\cdot 10^{-5}\\,\\text{N}\\cdot\\text{m}^2">k̄ = 6,504 • 10⁻⁵ N m²</span>.<br>
          <div class="katex-render" data-display="true" data-latex="F(r) = 650{,}4\\,\\text{mN}\\cdot\\text{cm}^2 \\cdot \\frac{1}{r^2}"></div><br>

          <strong>5. Physikalischer Koeffizientenvergleich (Ladungsbestimmung):</strong><br>
          Nach Coulomb: <span class="katex-render" data-display="false" data-latex="F = \\frac{1}{4\\pi\\varepsilon_0} \\cdot \\frac{Q^2}{r^2} \\implies \\bar{k} = \\frac{1}{4\\pi\\varepsilon_0} \\cdot Q^2">k = 1/(4πε₀) • Q²</span>.<br>
          <div class="katex-render" data-display="true" data-latex="Q = \\sqrt{4\\pi\\varepsilon_0 \\cdot \\bar{k}} = \\sqrt{\\frac{6{,}504 \\cdot 10^{-5}}{8{,}988 \\cdot 10^9}} \\approx 85{,}1\\,\\text{nC}"></div>
        `
      },
      {
        title: 'Übungsaufgabe 3 (Klausur-Typ): Drahtwiderstand R(A) & Antiproportionalitätsnachweis',
        prompt: `
          Für Konstantandrähte gleicher Länge l = 50 m aber unterschiedlichem Querschnitt A wird der elektrische Widerstand R gemessen (Meds.pdf S. 19):
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
          Weise Antiproportionalität im 5-Schritte-Schema nach und berechne den spezifischen Widerstand ρ.
        `,
        solution: `
          <strong>1. Vermutung aufstellen:</strong><br>
          Wenn sich die Querschnittsfläche <span class="katex-render" data-display="false" data-latex="A">A</span> verdoppelt (von 0,1 auf 0,2 mm² bzw. 0,5 auf 1,0 mm²), dann halbiert sich der Widerstand <span class="katex-render" data-display="false" data-latex="R">R</span> (von 245 auf 122,5 Ω bzw. 49 auf 24,5 Ω). Deswegen vermuten wir einen antiproportionalen Zusammenhang <span class="katex-render" data-display="false" data-latex="R \\sim \\frac{1}{A}">R ~ 1/A</span> (<span class="katex-render" data-display="false" data-latex="R = k \\cdot \\frac{1}{A}">R = k · 1/A</span>).<br><br>

          <strong>2. Beweis durchführen (Produktprüfung):</strong><br>
          Konstantenprodukt <span class="katex-render" data-display="false" data-latex="k = R \\cdot A">k = R • A</span> berechnen:<br>
          • <span class="katex-render" data-display="false" data-latex="0{,}10 \\cdot 245{,}0 = 24{,}5\\,\\Omega\\cdot\\text{mm}^2">k = 24,5</span> | <span class="katex-render" data-display="false" data-latex="0{,}20 \\cdot 122{,}5 = 24{,}5\\,\\Omega\\cdot\\text{mm}^2">k = 24,5</span><br>
          • <span class="katex-render" data-display="false" data-latex="0{,}50 \\cdot 49{,}0 = 24{,}5\\,\\Omega\\cdot\\text{mm}^2">k = 24,5</span> | <span class="katex-render" data-display="false" data-latex="1{,}00 \\cdot 24{,}5 = 24{,}5\\,\\Omega\\cdot\\text{mm}^2">k = 24,5</span>.<br><br>

          <strong>3. Beurteilung:</strong><br>
          <em>Weil alle berechneten Produkte exakt konstant <span class="katex-render" data-display="false" data-latex="24{,}5\\,\\Omega\\cdot\\text{mm}^2">24,5 Ω mm²</span> sind, ist unsere Vermutung bestätigt.</em><br><br>

          <strong>4. Mittelwert &amp; Funktionsgleichung mit Einheit:</strong><br>
          <span class="katex-render" data-display="false" data-latex="\\bar{k} = 24{,}5\\,\\Omega\\cdot\\text{mm}^2">k̄ = 24,5 Ω mm²</span>.<br>
          <div class="katex-render" data-display="true" data-latex="R(A) = 24{,}5\\,\\Omega\\cdot\\text{mm}^2 \\cdot \\frac{1}{A}"></div><br>

          <strong>5. Physikalischer Koeffizientenvergleich (spezifischer Widerstand ρ):</strong><br>
          Nach der physikalischen Widerstandsformel: <span class="katex-render" data-display="false" data-latex="R = \\rho \\cdot \\frac{l}{A} \\implies k = \\rho \\cdot l">R = ρ · l/A => k = ρ · l</span>.<br>
          <div class="katex-render" data-display="true" data-latex="\\rho = \\frac{k}{l} = \\frac{24{,}5\\,\\Omega\\cdot\\text{mm}^2}{50\\,\\text{m}} = 0{,}49\\,\\frac{\\Omega\\cdot\\text{mm}^2}{\\text{m}}"></div>
          <strong style="color:#10b981;">Ergebnis:</strong> Das Material besitzt den spezifischen Widerstand <span class="katex-render" data-display="false" data-latex="\\rho = 0{,}49\\,\\frac{\\Omega\\cdot\\text{mm}^2}{\\text{m}}">ρ = 0,49</span> (typisch für Konstantan).
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
