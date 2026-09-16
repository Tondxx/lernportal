// =========================================================================
// Physik eA: Vollständiges Themen- & Fertigkeiten-Portal (Ph12-Lh)
// 1. Die 10 konkreten Kern-Fertigkeiten & Fragen (mit visuellen Erklärungen)
// 2. Pre-rendered KaTeX-Formeln (100% zuverlässig, ohne Escaping-Fehler)
// 3. SVG-Diagramme (Plattenkondensator, Äquipotentiallinien, Influenz etc.)
// 4. 4 interaktive Canvas-Simulationen (Coulomb, E-Feld, Elektroskop, Schaltung)
// 5. Eigene Notizfelder pro Thema mit Auto-Save
// 6. Komplexe Kombinations-Aufgaben (Vernetzung von Blöcken)
// 7. Großer Klausur-Aufgabenpool aus allen IServ-Arbeitsblättern (AB01 - AB11)
// =========================================================================

// --- 1. DATENBANK DER 10 KERN-THEMEN (KONKRETE FERTIGKEITEN) ---
const PHYSIK_SKILLS = [
  {
    id: 'efeld-berechnen',
    num: '01',
    icon: '⚡',
    color: '#06b6d4',
    tag: 'E-Feld & Plattenkondensator',
    title: 'Wie berechne ich die elektrische Feldstärke E?',
    desc: 'Definition E = F/q, homogenes Feld im Plattenkondensator E = U/d, Kraft auf Elektronen und Probeladungen.',
    visualHtml: `
      <div class="formula-hero-card" style="border-left: 6px solid #06b6d4;">
        <span class="formula-hero-badge" style="background: rgba(6, 182, 212, 0.15); color: #06b6d4;">
          ⚡ ZENTRALE FORMELN FÜR DIE FELDSTÄRKE
        </span>
        <div class="formula-math-display">
          <span class="katex-display"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><semantics><mrow><mi>E</mi><mo>=</mo><mfrac><msub><mi>F</mi><mtext>el</mtext></msub><mi>q</mi></mfrac><mo>=</mo><mfrac><mi>U</mi><mi>d</mi></mfrac><mspace width="1em"/><mrow><mo fence="true">[</mo><mfrac><mtext>N</mtext><mtext>C</mtext></mfrac><mo>=</mo><mfrac><mtext>V</mtext><mtext>m</mtext></mfrac><mo fence="true">]</mo></mrow></mrow><annotation encoding="application/x-tex">E = \frac{F_{\text{el}}}{q} = \frac{U}{d} \quad \left[\frac{\text{N}}{\text{C}} = \frac{\text{V}}{\text{m}}\right]</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6833em;"></span><span class="mord mathnormal" style="margin-right:0.05764em;">E</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:2.2408em;vertical-align:-0.8804em;"></span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.3603em;"><span style="top:-2.314em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.03588em;">q</span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.677em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord"><span class="mord mathnormal" style="margin-right:0.13889em;">F</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3361em;"><span style="top:-2.55em;margin-left:-0.1389em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord text mtight"><span class="mord mtight">el</span></span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.8804em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:2.4em;vertical-align:-0.95em;"></span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.3603em;"><span style="top:-2.314em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord mathnormal">d</span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.677em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.10903em;">U</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.686em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span><span class="mspace" style="margin-right:1em;"></span><span class="mspace" style="margin-right:0.1667em;"></span><span class="minner"><span class="mopen delimcenter" style="top:0em;"><span class="delimsizing size3">[</span></span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.3603em;"><span style="top:-2.314em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord text"><span class="mord">C</span></span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.677em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord text"><span class="mord">N</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.686em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.3603em;"><span style="top:-2.314em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord text"><span class="mord">m</span></span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.677em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord text"><span class="mord">V</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.686em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span><span class="mclose delimcenter" style="top:0em;"><span class="delimsizing size3">]</span></span></span></span></span></span></span>
        </div>
        
        <div class="variable-pills-grid">
          <div class="var-pill-card">
            <div class="var-sym-badge" style="background: rgba(6, 182, 212, 0.15); color: #06b6d4;">E</div>
            <div class="var-info-wrap">
              <div class="var-info-title">Elektrische Feldst&auml;rke</div>
              <div class="var-info-unit">Einheit: <strong>V/m</strong> oder <strong>N/C</strong></div>
            </div>
          </div>
          <div class="var-pill-card">
            <div class="var-sym-badge" style="background: rgba(56, 189, 248, 0.15); color: #0284c7;">U</div>
            <div class="var-info-wrap">
              <div class="var-info-title">Elektrische Spannung</div>
              <div class="var-info-unit">Einheit: <strong>Volt (V)</strong></div>
            </div>
          </div>
          <div class="var-pill-card">
            <div class="var-sym-badge" style="background: rgba(245, 158, 11, 0.15); color: #d97706;">d</div>
            <div class="var-info-wrap">
              <div class="var-info-title">Plattenabstand</div>
              <div class="var-info-unit">Einheit: <strong>Meter (m)</strong></div>
            </div>
          </div>
          <div class="var-pill-card">
            <div class="var-sym-badge" style="background: rgba(16, 185, 129, 0.15); color: #059669;">F<sub>el</sub></div>
            <div class="var-info-wrap">
              <div class="var-info-title">Elektrische Kraft (q &bull; E)</div>
              <div class="var-info-unit">Einheit: <strong>Newton (N)</strong></div>
            </div>
          </div>
        </div>

        <div class="formula-takeaway-box" style="background: rgba(6, 182, 212, 0.08); border-left: 4px solid #06b6d4;">
          <span style="font-size: 1.2rem;">💡</span>
          <div>
            <strong>Klausur-Merksatz:</strong> <code>E = U / d</code> gilt <em>ausschließlich</em> im homogenen Plattenkondensator! Für Radialfelder von Punktladungen gilt: <code>E = 1/(4&pi;&epsilon;₀) &bull; Q / r²</code>.
          </div>
        </div>
      </div>

      <div class="diagram-card" style="margin-top: 1.2rem;">
        <h4 style="font-size: 1rem; font-weight: 800; color: #06b6d4; margin-bottom: 0.6rem;">
          ⚡ Visuelles Schaubild: Plattenkondensator (Homogenes Feld &amp; Kr&auml;fte auf Ladungstr&auml;ger)
        </h4>
        <div class="diagram-svg-wrapper">
          <svg viewBox="0 0 600 230" width="100%" height="220">
            <rect x="50" y="30" width="20" height="170" rx="4" fill="#ef4444" />
            <text x="60" y="24" fill="#ef4444" font-size="12" font-weight="bold" text-anchor="middle">+ U</text>
            <text x="60" y="65" fill="#ffffff" font-size="14" font-weight="bold" text-anchor="middle">+</text>
            <text x="60" y="105" fill="#ffffff" font-size="14" font-weight="bold" text-anchor="middle">+</text>
            <text x="60" y="145" fill="#ffffff" font-size="14" font-weight="bold" text-anchor="middle">+</text>
            <text x="60" y="185" fill="#ffffff" font-size="14" font-weight="bold" text-anchor="middle">+</text>

            <rect x="530" y="30" width="20" height="170" rx="4" fill="#3b82f6" />
            <text x="540" y="24" fill="#3b82f6" font-size="12" font-weight="bold" text-anchor="middle">0 V (-)</text>
            <text x="540" y="65" fill="#ffffff" font-size="14" font-weight="bold" text-anchor="middle">-</text>
            <text x="540" y="105" fill="#ffffff" font-size="14" font-weight="bold" text-anchor="middle">-</text>
            <text x="540" y="145" fill="#ffffff" font-size="14" font-weight="bold" text-anchor="middle">-</text>
            <text x="540" y="185" fill="#ffffff" font-size="14" font-weight="bold" text-anchor="middle">-</text>

            <defs>
              <marker id="efield-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#06b6d4" />
              </marker>
              <marker id="force-arrow-left" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#f59e0b" />
              </marker>
              <marker id="force-arrow-right" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#10b981" />
              </marker>
            </defs>

            <line x1="72" y1="55" x2="528" y2="55" stroke="#06b6d4" stroke-width="2.5" marker-end="url(#efield-arrow)" />
            <line x1="72" y1="90" x2="528" y2="90" stroke="#06b6d4" stroke-width="2.5" marker-end="url(#efield-arrow)" />
            <line x1="72" y1="125" x2="528" y2="125" stroke="#06b6d4" stroke-width="2.5" marker-end="url(#efield-arrow)" />
            <line x1="72" y1="160" x2="528" y2="160" stroke="#06b6d4" stroke-width="2.5" marker-end="url(#efield-arrow)" />
            <line x1="72" y1="195" x2="528" y2="195" stroke="#06b6d4" stroke-width="2.5" marker-end="url(#efield-arrow)" />

            <rect x="270" y="38" width="60" height="24" rx="4" fill="rgba(6, 182, 212, 0.15)" stroke="#06b6d4" />
            <text x="300" y="54" fill="#06b6d4" font-size="12" font-weight="bold" text-anchor="middle">E = U / d</text>

            <circle cx="350" cy="125" r="13" fill="#1e293b" stroke="#f59e0b" stroke-width="2.5" />
            <text x="350" y="129" fill="#f59e0b" font-size="12" font-weight="bold" text-anchor="middle">e⁻</text>
            <line x1="335" y1="125" x2="260" y2="125" stroke="#f59e0b" stroke-width="3" marker-end="url(#force-arrow-left)" />
            <text x="295" y="115" fill="#f59e0b" font-size="11" font-weight="bold" text-anchor="middle">F_el = e &bull; E</text>

            <circle cx="170" cy="160" r="13" fill="#1e293b" stroke="#10b981" stroke-width="2.5" />
            <text x="170" y="164" fill="#10b981" font-size="12" font-weight="bold" text-anchor="middle">q⁺</text>
            <line x1="185" y1="160" x2="250" y2="160" stroke="#10b981" stroke-width="3" marker-end="url(#force-arrow-right)" />
            <text x="220" y="150" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">F_el = q &bull; E</text>

            <line x1="72" y1="215" x2="528" y2="215" stroke="var(--text-muted)" stroke-width="1.5" stroke-dasharray="4,4" />
            <line x1="72" y1="208" x2="72" y2="222" stroke="var(--text-muted)" stroke-width="1.5" />
            <line x1="528" y1="208" x2="528" y2="222" stroke="var(--text-muted)" stroke-width="1.5" />
            <text x="300" y="222" fill="var(--text-primary)" font-size="12" font-weight="bold" text-anchor="middle">Plattenabstand d</text>
          </svg>
        </div>
        <div style="font-size: 0.82rem; color: var(--text-secondary); margin-top: 0.6rem; text-align: center;">
          💡 <strong>Homogenes Feld:</strong> Die Feldlinien sind exakt parallel und gleichm&auml;&szlig;ig verteilt &rarr; Die Feldst&auml;rke E ist an jedem Ort gleich gro&szlig;!
        </div>
      </div>

      <div class="visual-bullet-grid" style="margin-top: 1.2rem;">
        <div class="visual-bullet-card">
          <div class="bullet-icon">📐</div>
          <div class="bullet-content">
            <h4>Richtung der Feldlinien</h4>
            <p>Feldlinien zeigen per Definition von <strong>Plus nach Minus</strong> (Richtung der Kraft auf eine positive Ladung).</p>
          </div>
        </div>
        <div class="visual-bullet-card">
          <div class="bullet-icon">🚀</div>
          <div class="bullet-content">
            <h4>Elektronen-Beschleunigung</h4>
            <p>Auf ein Elektron wirkt <code>F = e &bull; E</code> entgegen den Feldlinien &rarr; Beschleunigung <code>a = e &bull; E / m_e</code>.</p>
          </div>
        </div>
      </div>
    `,
    hasSim: 'efeld',
    tasks: [
      {
        prompt: 'Ein Plattenkondensator hat den Plattenabstand d = 2,5 cm und wird an eine Spannung von U = 800 V angeschlossen. Berechne die Feldstärke E und die Kraft auf ein Elektron.',
        given: 'd = 0,025 m, U = 800 V, e = 1,602·10⁻¹⁹ C',
        sought: 'E, Fel',
        solution: `
          <code>E = U / d = 800 V / 0,025 m = 32.000 V/m = 32 kV/m</code><br>
          <code>F_el = e &bull; E = (1,602 &bull; 10⁻¹⁹ C) &bull; 32.000 N/C &asymp; 5,13 &bull; 10⁻¹⁵ N</code>
        `
      },
      {
        prompt: 'Wie verändert sich die Feldstärke E, wenn der Plattenabstand bei konstanter Spannung von 2 cm auf 6 cm verdreifacht wird?',
        given: 'd₂ = 3 · d₁, U = const',
        sought: 'E₂ im Verhältnis zu E₁',
        solution: `
          Da <code>E = U / d</code> antiproportional zum Abstand d ist, sinkt die Feldstärke auf <strong>ein Drittel (1/3)</strong> des ursprünglichen Werts!
        `
      }
    ]
  },

  {
    id: 'aequipotentiallinien',
    num: '02',
    icon: '🌐',
    color: '#10b981',
    tag: 'Feldlinienbilder & Potential',
    title: 'Eigenschaften von Äquipotentiallinien & Feldlinien',
    desc: 'Senkrecht zu Feldlinien (90°), W = 0, dichtere Linien = stärkeres Feld und Trog-Versuch.',
    visualHtml: `
      <div class="formula-hero-card" style="border-left: 6px solid #10b981;">
        <span class="formula-hero-badge" style="background: rgba(16, 185, 129, 0.15); color: #10b981;">
          🌐 DEFINITION: KEINE ARBEIT LÄNGS ÄQUIPOTENTIALLINIE
        </span>
        <div class="formula-math-display">
          <span class="katex-display"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><semantics><mrow><mi>W</mi><mo>=</mo><mi>q</mi><mo>⋅</mo><mi mathvariant="normal">Δ</mi><mi>φ</mi><mo>=</mo><mn>0</mn><mspace width="1em"/><mo stretchy="false">(</mo><mi mathvariant="normal">Δ</mi><mi>φ</mi><mo>=</mo><mn>0</mn><mtext> </mtext><mtext>V</mtext><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">W = q \cdot \Delta \varphi = 0 \quad (\Delta \varphi = 0\,\text{V})</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6833em;"></span><span class="mord mathnormal" style="margin-right:0.13889em;">W</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:0.6389em;vertical-align:-0.1944em;"></span><span class="mord mathnormal" style="margin-right:0.03588em;">q</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">⋅</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:0.8778em;vertical-align:-0.1944em;"></span><span class="mord">Δ</span><span class="mord mathnormal">φ</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">0</span><span class="mspace" style="margin-right:1em;"></span><span class="mopen">(</span><span class="mord">Δ</span><span class="mord mathnormal">φ</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">0</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord text"><span class="mord">V</span></span><span class="mclose">)</span></span></span></span></span>
        </div>
        
        <div class="variable-pills-grid">
          <div class="var-pill-card">
            <div class="var-sym-badge" style="background: rgba(16, 185, 129, 0.15); color: #059669;">&phi;</div>
            <div class="var-info-wrap">
              <div class="var-info-title">Elektrisches Potential</div>
              <div class="var-info-unit">Einheit: <strong>Volt (V)</strong></div>
            </div>
          </div>
          <div class="var-pill-card">
            <div class="var-sym-badge" style="background: rgba(6, 182, 212, 0.15); color: #06b6d4;">W</div>
            <div class="var-info-wrap">
              <div class="var-info-title">Verschiebearbeit</div>
              <div class="var-info-unit">L&auml;ngs Linie: <strong>W = 0 Joule</strong></div>
            </div>
          </div>
          <div class="var-pill-card">
            <div class="var-sym-badge" style="background: rgba(239, 68, 68, 0.15); color: #dc2626;">E&#8407;</div>
            <div class="var-info-wrap">
              <div class="var-info-title">Feldst&auml;rke-Vektor</div>
              <div class="var-info-unit">Winkel: <strong>stets 90&deg; senkrecht</strong></div>
            </div>
          </div>
        </div>
      </div>

      <div class="diagram-card">
        <h4 style="font-size: 1rem; font-weight: 800; color: #10b981; margin-bottom: 0.6rem;">
          🌐 Visuelles Schaubild: Feldlinien (Rot) &amp; Äquipotentiallinien (Grün gestrichelt)
        </h4>
        <div class="diagram-svg-wrapper">
          <svg viewBox="0 0 540 220" width="100%" height="200">
            <rect x="50" y="30" width="16" height="160" rx="4" fill="#ef4444" />
            <text x="58" y="24" fill="#ef4444" font-size="12" font-weight="bold" text-anchor="middle">+ U₀</text>
            <rect x="474" y="30" width="16" height="160" rx="4" fill="#3b82f6" />
            <text x="482" y="24" fill="#3b82f6" font-size="12" font-weight="bold" text-anchor="middle">0 V</text>

            <line x1="68" y1="50" x2="472" y2="50" stroke="#ef4444" stroke-width="2" marker-end="url(#efield-arrow)" />
            <line x1="68" y1="85" x2="472" y2="85" stroke="#ef4444" stroke-width="2" marker-end="url(#efield-arrow)" />
            <line x1="68" y1="120" x2="472" y2="120" stroke="#ef4444" stroke-width="2" marker-end="url(#efield-arrow)" />
            <line x1="68" y1="155" x2="472" y2="155" stroke="#ef4444" stroke-width="2" marker-end="url(#efield-arrow)" />
            <line x1="68" y1="190" x2="472" y2="190" stroke="#ef4444" stroke-width="2" marker-end="url(#efield-arrow)" />

            <line x1="150" y1="25" x2="150" y2="195" stroke="#10b981" stroke-width="2.5" stroke-dasharray="6,4" />
            <text x="150" y="210" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">3/4 U₀</text>

            <line x1="270" y1="25" x2="270" y2="195" stroke="#10b981" stroke-width="2.5" stroke-dasharray="6,4" />
            <text x="270" y="210" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">1/2 U₀</text>

            <line x1="390" y1="25" x2="390" y2="195" stroke="#10b981" stroke-width="2.5" stroke-dasharray="6,4" />
            <text x="390" y="210" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">1/4 U₀</text>

            <rect x="270" y="108" width="12" height="12" fill="none" stroke="#f59e0b" stroke-width="2" />
            <circle cx="276" cy="114" r="1.5" fill="#f59e0b" />
            <text x="290" y="105" fill="#f59e0b" font-size="12" font-weight="bold">90&deg;</text>

            <path d="M 150 70 L 150 140" stroke="#eab308" stroke-width="4" />
            <polygon points="150,146 145,136 155,136" fill="#eab308" />
            <rect x="95" y="95" width="50" height="20" rx="3" fill="#1e293b" />
            <text x="120" y="109" fill="#eab308" font-size="10" font-weight="bold" text-anchor="middle">W = 0 J</text>
          </svg>
        </div>
      </div>

      <div class="visual-bullet-grid">
        <div class="visual-bullet-card">
          <div class="bullet-icon">📐</div>
          <div class="bullet-content">
            <h4>1. Immer senkrecht (90°)</h4>
            <p>Feldlinien schneiden &Auml;quipotentiallinien an jedem Punkt im rechten Winkel.</p>
          </div>
        </div>
        <div class="visual-bullet-card">
          <div class="bullet-icon">🛑</div>
          <div class="bullet-content">
            <h4>2. Keine Arbeit (W = 0)</h4>
            <p>Wird eine Ladung l&auml;ngs einer &Auml;quipotentiallinie bewegt, wird <strong>keine Energie</strong> verrichtet.</p>
          </div>
        </div>
        <div class="visual-bullet-card">
          <div class="bullet-icon">⚡</div>
          <div class="bullet-content">
            <h4>3. Abstand verrät Feldstärke</h4>
            <p>Je dichter die Linien beieinander liegen, desto gr&ouml;&szlig;er ist die Feldst&auml;rke E.</p>
          </div>
        </div>
        <div class="visual-bullet-card">
          <div class="bullet-icon">🛡️</div>
          <div class="bullet-content">
            <h4>4. Leiteroberflächen</h4>
            <p>Jede metallische Leiteroberfl&auml;che ist im Gleichgewicht eine &Auml;quipotentialfl&auml;che.</p>
          </div>
        </div>
      </div>
    `,
    tasks: [
      {
        prompt: 'Beim Trog-Versuch misst man zwischen zwei Elektroden das Potential. Warum darf man zur Bestimmung von Äquipotentiallinien nur ein hochohmiges Voltmeter verwenden?',
        given: 'Messanordnung im Elektrolyttrog',
        sought: 'Begründung für hochohmigen Innenwiderstand',
        solution: 'Ein niederohmiges Messgerät würde Strom ziehen und dadurch das Potentialfeld verzerren. Nur ein hochohmiges Voltmeter misst die Spannung praktisch stromlos und verfälscht das Feld nicht.'
      },
      {
        prompt: 'Eine Ladung q = 5 μC wird in einem elektrischen Feld entlang einer Äquipotentiallinie um 15 cm verschoben. Wie viel Arbeit W wird dabei verrichtet?',
        given: 'q = 5 μC, s = 0,15 m, Δφ = 0 V',
        sought: 'Arbeit W',
        solution: 'Da die Verschiebung entlang einer Äquipotentiallinie erfolgt, ist die Potentialdifferenz <code>&Delta;&phi; = 0 V</code>. Die verrichtete Arbeit ist <strong>W = q &bull; &Delta;&phi; = 0 Joule</strong>!'
      }
    ]
  },

  {
    id: 'ladungstrennung-influenz',
    num: '03',
    icon: '🧲',
    color: '#8b5cf6',
    tag: 'Elektrostatik & Ladungsträger',
    title: 'Was ist Influenz und wie funktioniert Ladungstrennung?',
    desc: 'Berührungslose Ladungsverschiebung im Leiter, Annäherung, Erdung und dauerhafte Aufladung.',
    visualHtml: `
      <div class="formula-hero-card" style="border-left: 6px solid #8b5cf6;">
        <span class="formula-hero-badge" style="background: rgba(139, 92, 246, 0.15); color: #8b5cf6;">
          🧲 INFLUENZ: LADUNGSERHALTUNG IM LEITER
        </span>
        <div class="formula-math-display">
          <span class="katex-display"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><semantics><mrow><msub><mi>Q</mi><mtext>ges</mtext></msub><mo>=</mo><msub><mi>Q</mi><mn>1</mn></msub><mo>+</mo><msub><mi>Q</mi><mn>2</mn></msub><mo>=</mo><mtext>const</mtext></mrow><annotation encoding="application/x-tex">Q_{\text{ges}} = Q_1 + Q_2 = \text{const}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.9694em;vertical-align:-0.2861em;"></span><span class="mord"><span class="mord mathnormal">Q</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1514em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord text mtight"><span class="mord mtight">ges</span></span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.2861em;"><span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:0.8778em;vertical-align:-0.1944em;"></span><span class="mord"><span class="mord mathnormal">Q</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight">1</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:0.8778em;vertical-align:-0.1944em;"></span><span class="mord"><span class="mord mathnormal">Q</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight">2</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:0.6151em;"></span><span class="mord text"><span class="mord">const</span></span></span></span></span></span>
        </div>
        
        <div class="variable-pills-grid">
          <div class="var-pill-card">
            <div class="var-sym-badge" style="background: rgba(139, 92, 246, 0.15); color: #7c3aed;">Q<sub>ges</sub></div>
            <div class="var-info-wrap">
              <div class="var-info-title">Gesamtladung</div>
              <div class="var-info-unit">Bleibt stets <strong>konstant</strong></div>
            </div>
          </div>
          <div class="var-pill-card">
            <div class="var-sym-badge" style="background: rgba(59, 130, 246, 0.15); color: #2563eb;">e⁻</div>
            <div class="var-info-wrap">
              <div class="var-info-title">Freie Leitungselektronen</div>
              <div class="var-info-unit">Nur diese verschieben sich</div>
            </div>
          </div>
          <div class="var-pill-card">
            <div class="var-sym-badge" style="background: rgba(16, 185, 129, 0.15); color: #059669;">⏚</div>
            <div class="var-info-wrap">
              <div class="var-info-title">Erdung</div>
              <div class="var-info-unit">Erm&ouml;glicht dauerhafte Ladung</div>
            </div>
          </div>
        </div>
      </div>

      <div class="diagram-card">
        <h4 style="font-size: 1rem; font-weight: 800; color: #8b5cf6; margin-bottom: 0.6rem;">
          🧲 Visuelles 4-Schritte-Schema: Dauerhafte Aufladung durch Influenz
        </h4>
        <div class="diagram-svg-wrapper">
          <svg viewBox="0 0 540 240" width="100%" height="220">
            <g transform="translate(10, 20)">
              <text x="50" y="0" fill="var(--text-secondary)" font-size="11" font-weight="bold" text-anchor="middle">1. Ann&auml;herung</text>
              <rect x="0" y="10" width="18" height="50" rx="3" fill="#3b82f6" />
              <text x="9" y="38" fill="#fff" font-size="12" font-weight="bold" text-anchor="middle">-</text>
              <circle cx="75" cy="35" r="24" fill="var(--bg-subtle)" stroke="var(--border-subtle)" stroke-width="2" />
              <text x="62" y="39" fill="#ef4444" font-size="11" font-weight="bold">+</text>
              <text x="88" y="39" fill="#3b82f6" font-size="11" font-weight="bold">-</text>
              <text x="50" y="78" fill="var(--text-muted)" font-size="9" text-anchor="middle">Elektronen weichen aus</text>
            </g>

            <g transform="translate(145, 20)">
              <text x="50" y="0" fill="var(--text-secondary)" font-size="11" font-weight="bold" text-anchor="middle">2. Erdung</text>
              <rect x="0" y="10" width="18" height="50" rx="3" fill="#3b82f6" />
              <text x="9" y="38" fill="#fff" font-size="12" font-weight="bold" text-anchor="middle">-</text>
              <circle cx="75" cy="35" r="24" fill="var(--bg-subtle)" stroke="var(--border-subtle)" stroke-width="2" />
              <text x="65" y="39" fill="#ef4444" font-size="12" font-weight="bold">+</text>
              <line x1="99" y1="35" x2="115" y2="35" stroke="#10b981" stroke-width="2" />
              <line x1="115" y1="25" x2="115" y2="45" stroke="#10b981" stroke-width="2" />
              <line x1="119" y1="29" x2="119" y2="41" stroke="#10b981" stroke-width="2" />
              <line x1="123" y1="32" x2="123" y2="38" stroke="#10b981" stroke-width="2" />
              <text x="50" y="78" fill="#10b981" font-size="9" text-anchor="middle">Elektronen flie&szlig;en ab</text>
            </g>

            <g transform="translate(280, 20)">
              <text x="50" y="0" fill="var(--text-secondary)" font-size="11" font-weight="bold" text-anchor="middle">3. Trennung</text>
              <rect x="0" y="10" width="18" height="50" rx="3" fill="#3b82f6" />
              <text x="9" y="38" fill="#fff" font-size="12" font-weight="bold" text-anchor="middle">-</text>
              <circle cx="75" cy="35" r="24" fill="var(--bg-subtle)" stroke="var(--border-subtle)" stroke-width="2" />
              <text x="65" y="39" fill="#ef4444" font-size="12" font-weight="bold">+</text>
              <text x="50" y="78" fill="var(--text-muted)" font-size="9" text-anchor="middle">Draht entfernen</text>
            </g>

            <g transform="translate(415, 20)">
              <text x="50" y="0" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">4. Ergebnis</text>
              <circle cx="50" cy="35" r="24" fill="rgba(239, 68, 68, 0.15)" stroke="#ef4444" stroke-width="2" />
              <text x="44" y="31" fill="#ef4444" font-size="11" font-weight="bold">+</text>
              <text x="56" y="31" fill="#ef4444" font-size="11" font-weight="bold">+</text>
              <text x="50" y="46" fill="#ef4444" font-size="11" font-weight="bold">+</text>
              <text x="50" y="78" fill="#ef4444" font-size="9" font-weight="bold" text-anchor="middle">Positiv geladen!</text>
            </g>

            <rect x="20" y="130" width="500" height="75" rx="8" fill="var(--bg-subtle)" stroke="var(--border-subtle)" />
            <text x="40" y="155" fill="var(--text-primary)" font-size="12" font-weight="bold">Merksatz für die Klausur:</text>
            <text x="40" y="175" fill="var(--text-secondary)" font-size="11">• Bei Influenz werden nur bewegliche Elektronen verschoben (Atomrümpfe bleiben fest).</text>
            <text x="40" y="193" fill="var(--text-secondary)" font-size="11">• Durch Erden erhält der Körper immer die entgegengesetzte Ladung des erregenden Stabs!</text>
          </svg>
        </div>
      </div>
    `,
    hasSim: 'elektrostatik',
    tasks: [
      {
        prompt: 'Zwei ungeladene Metallkugeln berühren sich. Ein negativ geladener Stab wird an Kugel 1 angenähert. Während der Stab da ist, trennt man die Kugeln. Welche Ladung haben Kugel 1 und Kugel 2 danach?',
        given: 'AB02 Versuchsanordnung',
        sought: 'Ladungszustand von Kugel 1 und 2',
        solution: 'Der negative Stab stößt Elektronen ab &rarr; Sie fließen von Kugel 1 nach Kugel 2. Nach dem Trennen hat <strong>Kugel 1 Elektronenmangel (positiv)</strong> und <strong>Kugel 2 Elektronenüberschuss (negativ)</strong>.'
      }
    ]
  },

  {
    id: 'kraeftedreieck-winkel',
    num: '04',
    icon: '📐',
    color: '#f59e0b',
    tag: 'Fadenpendel & Kräftegleichgewicht',
    title: 'Wie bestimme ich Kraft und Winkel im Kräftedreieck (F_el, F_G, F_res)?',
    desc: 'Kräfteparallelogramm am Fadenpendel im E-Feld: tan(α) = F_el / F_G und Kleinwinkelnäherung.',
    visualHtml: `
      <div class="formula-hero-card" style="border-left: 6px solid #f59e0b;">
        <span class="formula-hero-badge" style="background: rgba(245, 158, 11, 0.15); color: #f59e0b;">
          📐 ZENTRALE GLEICHUNG: KRÄFTEDREIECK AM PENDEL
        </span>
        <div class="formula-math-display">
          <span class="katex-display"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><semantics><mrow><mi>tan</mi><mo>⁡</mo><mo stretchy="false">(</mo><mi>α</mi><mo stretchy="false">)</mo><mo>=</mo><mfrac><msub><mi>F</mi><mtext>el</mtext></msub><msub><mi>F</mi><mi>G</mi></msub></mfrac><mo>=</mo><mfrac><mrow><mi>q</mi><mo>⋅</mo><mi>E</mi></mrow><mrow><mi>m</mi><mo>⋅</mo><mi>g</mi></mrow></mfrac></mrow><annotation encoding="application/x-tex">\tan(\alpha) = \frac{F_{\text{el}}}{F_G} = \frac{q \cdot E}{m \cdot g}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mop">tan</span><span class="mopen">(</span><span class="mord mathnormal" style="margin-right:0.0037em;">α</span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:2.1963em;vertical-align:-0.836em;"></span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.3603em;"><span style="top:-2.314em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord"><span class="mord mathnormal" style="margin-right:0.13889em;">F</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3283em;"><span style="top:-2.55em;margin-left:-0.1389em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight">G</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.677em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord"><span class="mord mathnormal" style="margin-right:0.13889em;">F</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3361em;"><span style="top:-2.55em;margin-left:-0.1389em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord text mtight"><span class="mord mtight">el</span></span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.836em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:2.2408em;vertical-align:-0.8804em;"></span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.3603em;"><span style="top:-2.314em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord mathnormal">m</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">⋅</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord mathnormal" style="margin-right:0.03588em;">g</span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.677em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.03588em;">q</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">⋅</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord mathnormal" style="margin-right:0.05764em;">E</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.8804em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span></span></span></span></span>
        </div>
        
        <div class="variable-pills-grid">
          <div class="var-pill-card">
            <div class="var-sym-badge" style="background: rgba(245, 158, 11, 0.15); color: #d97706;">&alpha;</div>
            <div class="var-info-wrap">
              <div class="var-info-title">Auslenkwinkel</div>
              <div class="var-info-unit">Einheit: <strong>Grad (&deg;)</strong></div>
            </div>
          </div>
          <div class="var-pill-card">
            <div class="var-sym-badge" style="background: rgba(6, 182, 212, 0.15); color: #0891b2;">F<sub>el</sub></div>
            <div class="var-info-wrap">
              <div class="var-info-title">Elektrische Kraft (q &bull; E)</div>
              <div class="var-info-unit">Horizontal: <strong>Newton (N)</strong></div>
            </div>
          </div>
          <div class="var-pill-card">
            <div class="var-sym-badge" style="background: rgba(239, 68, 68, 0.15); color: #dc2626;">F<sub>G</sub></div>
            <div class="var-info-wrap">
              <div class="var-info-title">Gewichtskraft (m &bull; g)</div>
              <div class="var-info-unit">Vertikal: <strong>Newton (N)</strong></div>
            </div>
          </div>
          <div class="var-pill-card">
            <div class="var-sym-badge" style="background: rgba(16, 185, 129, 0.15); color: #059669;">q</div>
            <div class="var-info-wrap">
              <div class="var-info-title">Ladung des Pendels</div>
              <div class="var-info-unit">Gesucht in Klausur: <strong>Coulomb (C)</strong></div>
            </div>
          </div>
        </div>

        <div class="formula-takeaway-box" style="background: rgba(245, 158, 11, 0.08); border-left: 4px solid #f59e0b;">
          <span style="font-size: 1.2rem;">💡</span>
          <div>
            <strong>Klausur-Formel umstellen:</strong> Zur Bestimmung der Ladung <code>q</code> aus der Auslenkung gilt:<br>
            <code>q = (m &bull; g &bull; tan(&alpha;)) / E = (m &bull; g &bull; d &bull; tan(&alpha;)) / U</code>.
          </div>
        </div>
      </div>

      <div class="diagram-card">
        <h4 style="font-size: 1rem; font-weight: 800; color: #f59e0b; margin-bottom: 0.6rem;">
          📐 Visuelles Schaubild: Vektorielles Kräftedreieck am Fadenpendel
        </h4>
        <div class="diagram-svg-wrapper">
          <svg viewBox="0 0 540 240" width="100%" height="220">
            <rect x="30" y="30" width="10" height="180" rx="2" fill="#ef4444" />
            <text x="35" y="22" fill="#ef4444" font-size="11" font-weight="bold" text-anchor="middle">+</text>
            <rect x="230" y="30" width="10" height="180" rx="2" fill="#3b82f6" />
            <text x="235" y="22" fill="#3b82f6" font-size="11" font-weight="bold" text-anchor="middle">-</text>

            <circle cx="130" cy="40" r="4" fill="var(--text-primary)" />
            <line x1="130" y1="40" x2="130" y2="180" stroke="var(--text-muted)" stroke-width="1.5" stroke-dasharray="4,4" />

            <line x1="130" y1="40" x2="190" y2="150" stroke="#f59e0b" stroke-width="2.5" />
            <path d="M 130 75 A 35 35 0 0 1 144 73" fill="none" stroke="#f59e0b" stroke-width="2" />
            <text x="140" y="90" fill="#f59e0b" font-size="12" font-weight="bold">&alpha;</text>

            <circle cx="190" cy="150" r="12" fill="#1e293b" stroke="#f59e0b" stroke-width="2.5" />
            <text x="190" y="154" fill="#f59e0b" font-size="11" font-weight="bold" text-anchor="middle">q</text>

            <line x1="265" y1="20" x2="265" y2="220" stroke="var(--border-subtle)" stroke-dasharray="4,4" />

            <text x="390" y="30" fill="var(--text-primary)" font-size="12" font-weight="bold" text-anchor="middle">Rechtwinkliges Kräftedreieck:</text>

            <line x1="360" y1="50" x2="360" y2="170" stroke="#ef4444" stroke-width="3" />
            <polygon points="360,176 355,166 365,166" fill="#ef4444" />
            <text x="340" y="115" fill="#ef4444" font-size="12" font-weight="bold">F_G</text>

            <line x1="360" y1="170" x2="460" y2="170" stroke="#06b6d4" stroke-width="3" />
            <polygon points="466,170 456,165 456,175" fill="#06b6d4" />
            <text x="410" y="190" fill="#06b6d4" font-size="12" font-weight="bold">F_el = q &bull; E</text>

            <line x1="360" y1="50" x2="460" y2="170" stroke="#f59e0b" stroke-width="2.5" stroke-dasharray="5,3" />
            <text x="435" y="105" fill="#f59e0b" font-size="12" font-weight="bold">F_S</text>

            <path d="M 360 80 A 30 30 0 0 1 378 72" fill="none" stroke="#f59e0b" stroke-width="2" />
            <text x="372" y="95" fill="#f59e0b" font-size="12" font-weight="bold">&alpha;</text>

            <rect x="360" y="158" width="12" height="12" fill="none" stroke="var(--text-primary)" stroke-width="1.5" />
            <circle cx="366" cy="164" r="1.5" fill="var(--text-primary)" />
          </svg>
        </div>
      </div>
    `,
    tasks: [
      {
        prompt: 'Ein geladenes Pendel (m = 0,5 g) schlägt im homogenen Feld E = 20 kV/m um α = 12° aus. Berechne die Ladung q.',
        given: 'm = 0,0005 kg, E = 20.000 V/m, α = 12°, g = 9,81 m/s²',
        sought: 'q',
        solution: `
          <code>F_G = m &bull; g = 0,0005 kg &bull; 9,81 m/s&sup2; = 4,905 &bull; 10⁻³ N</code><br>
          <code>tan(12&deg;) &asymp; 0,21256</code><br>
          <code>F_el = F_G &bull; tan(12&deg;) = 4,905 &bull; 10⁻³ N &bull; 0,21256 &asymp; 1,043 &bull; 10⁻³ N</code><br>
          <code>q = F_el / E = (1,043 &bull; 10⁻³ N) / 20.000 V/m &asymp; 5,21 &bull; 10⁻⁸ C = 52,1 nC</code>.
        `
      }
    ]
  },

  {
    id: 'coulomb-gesetz',
    num: '05',
    icon: '⚖️',
    color: '#3b82f6',
    tag: 'Kraft zwischen Ladungen',
    title: 'Coulomb-Gesetz & Ladungsausgleich bei Kugel-Berührung',
    desc: 'F proportional zu 1/r², Abstandsänderung und Ladungsteilung (q1 + q2)/2 bei Berührung.',
    visualHtml: `
      <div class="formula-hero-card" style="border-left: 6px solid #3b82f6;">
        <span class="formula-hero-badge" style="background: rgba(59, 130, 246, 0.15); color: #3b82f6;">
          ⚖️ DAS COULOMBSCHE GESETZ
        </span>
        <div class="formula-math-display">
          <span class="katex-display"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><semantics><mrow><msub><mi>F</mi><mi>C</mi></msub><mo>=</mo><mfrac><mn>1</mn><mrow><mn>4</mn><mi>π</mi><msub><mi>ε</mi><mn>0</mn></msub></mrow></mfrac><mo>⋅</mo><mfrac><mrow><mi mathvariant="normal">∣</mi><msub><mi>Q</mi><mn>1</mn></msub><mo>⋅</mo><msub><mi>Q</mi><mn>2</mn></msub><mi mathvariant="normal">∣</mi></mrow><msup><mi>r</mi><mn>2</mn></msup></mfrac></mrow><annotation encoding="application/x-tex">F_C = \frac{1}{4\pi\varepsilon_0} \cdot \frac{|Q_1 \cdot Q_2|}{r^2}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8333em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.13889em;">F</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3283em;"><span style="top:-2.55em;margin-left:-0.1389em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight" style="margin-right:0.07153em;">C</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:2.1574em;vertical-align:-0.836em;"></span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.3214em;"><span style="top:-2.314em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord">4</span><span class="mord mathnormal" style="margin-right:0.03588em;">π</span><span class="mord"><span class="mord mathnormal">ε</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight">0</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.677em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord">1</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.836em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">⋅</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:2.113em;vertical-align:-0.686em;"></span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.427em;"><span style="top:-2.314em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord"><span class="mord mathnormal" style="margin-right:0.02778em;">r</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.7401em;"><span style="top:-2.989em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight">2</span></span></span></span></span></span></span></span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.677em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord">∣</span><span class="mord"><span class="mord mathnormal">Q</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight">1</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">⋅</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord"><span class="mord mathnormal">Q</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight">2</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mord">∣</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.686em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span></span></span></span></span>
        </div>
        
        <div class="variable-pills-grid">
          <div class="var-pill-card">
            <div class="var-sym-badge" style="background: rgba(59, 130, 246, 0.15); color: #2563eb;">F<sub>C</sub></div>
            <div class="var-info-wrap">
              <div class="var-info-title">Coulomb-Kraft</div>
              <div class="var-info-unit">Einheit: <strong>Newton (N)</strong></div>
            </div>
          </div>
          <div class="var-pill-card">
            <div class="var-sym-badge" style="background: rgba(239, 68, 68, 0.15); color: #dc2626;">Q₁, Q₂</div>
            <div class="var-info-wrap">
              <div class="var-info-title">Punktladungen</div>
              <div class="var-info-unit">Einheit: <strong>Coulomb (C)</strong></div>
            </div>
          </div>
          <div class="var-pill-card">
            <div class="var-sym-badge" style="background: rgba(245, 158, 11, 0.15); color: #d97706;">r</div>
            <div class="var-info-wrap">
              <div class="var-info-title">Abstand</div>
              <div class="var-info-unit">Quadratisch: <strong>Meter (m)</strong></div>
            </div>
          </div>
          <div class="var-pill-card">
            <div class="var-sym-badge" style="background: rgba(16, 185, 129, 0.15); color: #059669;">&epsilon;₀</div>
            <div class="var-info-wrap">
              <div class="var-info-title">Feldkonstante</div>
              <div class="var-info-unit"><strong>8,854 &bull; 10⁻¹² As/(Vm)</strong></div>
            </div>
          </div>
        </div>

        <div class="formula-takeaway-box" style="background: rgba(59, 130, 246, 0.08); border-left: 4px solid #3b82f6;">
          <span style="font-size: 1.2rem;">💡</span>
          <div>
            <strong>2 goldene Klausur-Regeln:</strong><br>
            1. <strong>Abstands-Gesetz (1/r²):</strong> Verdoppelt sich der Abstand (r &rarr; 2r), sinkt die Kraft auf ein <strong>Viertel (1/4)</strong>!<br>
            2. <strong>Kugel-Berührung:</strong> Berühren sich zwei gleiche Kugeln, teilt sich die Summenladung exakt hälftig auf: <code>Q' = (Q₁ + Q₂) / 2</code>!
          </div>
        </div>
      </div>
    `,
    hasSim: 'coulomb',
    tasks: [
      {
        prompt: 'Zwei gleiche Ladungen Q = 25 nC stoßen sich mit F = 5,0 mN ab. Berechne ihren Abstand r.',
        given: 'Q₁ = Q₂ = 25 nC, F = 0,005 N',
        sought: 'Abstand r',
        solution: `
          <code>F_C = (1 / (4&pi;&epsilon;₀)) &bull; (Q&sup2; / r&sup2;) &rArr; r = &radic;[ (1 / (4&pi;&epsilon;₀)) &bull; Q&sup2; / F ]</code><br>
          <code>r = &radic;[ (8,988 &bull; 10⁹) &bull; (25 &bull; 10⁻⁹)&sup2; / 0,005 ] &asymp; 0,0335 m = 3,35 cm</code>.
        `
      }
    ]
  },

  {
    id: 'linearisierung-waage-ab06',
    num: '06',
    icon: '📈',
    color: '#6366f1',
    tag: 'Messwerte & Linearisierung',
    title: 'Wie bestimme ich ε0 aus Messwerten (Linearisierung mit der Waage)?',
    desc: 'Aufgabe AB06: F = 1/2 ε0 (A/d²) U², Ursprungsgerade F über U², Steigung m = 1/2 ε0 A/d².',
    visualHtml: `
      <div class="formula-hero-card" style="border-left: 6px solid #6366f1;">
        <span class="formula-hero-badge" style="background: rgba(99, 102, 241, 0.15); color: #6366f1;">
          📈 AB06 LINEARISIERUNG DER WAAGE-MESSWERTE
        </span>
        <div class="formula-math-display">
          __KATEX_LINEARI__
        </div>
        
        <div class="variable-pills-grid">
          <div class="var-pill-card">
            <div class="var-sym-badge" style="background: rgba(99, 102, 241, 0.15); color: #4f46e5;">y = F</div>
            <div class="var-info-wrap">
              <div class="var-info-title">Kraft auf Waage</div>
              <div class="var-info-unit">y-Achse: <strong>Newton (N)</strong></div>
            </div>
          </div>
          <div class="var-pill-card">
            <div class="var-sym-badge" style="background: rgba(244, 63, 94, 0.15); color: #e11d48;">x = U²</div>
            <div class="var-info-wrap">
              <div class="var-info-title">Quadrierte Spannung</div>
              <div class="var-info-unit">x-Achse: <strong>Volt² (V²)</strong></div>
            </div>
          </div>
          <div class="var-pill-card">
            <div class="var-sym-badge" style="background: rgba(16, 185, 129, 0.15); color: #059669;">m</div>
            <div class="var-info-wrap">
              <div class="var-info-title">Steigung (&Delta;F/&Delta;U²)</div>
              <div class="var-info-unit">m = (&epsilon;₀ &bull; A) / (2d&sup2;)</div>
            </div>
          </div>
          <div class="var-pill-card">
            <div class="var-sym-badge" style="background: rgba(245, 158, 11, 0.15); color: #d97706;">&epsilon;₀</div>
            <div class="var-info-wrap">
              <div class="var-info-title">Gesuchte Konstante</div>
              <div class="var-info-unit">&epsilon;₀ = (2 &bull; d&sup2; &bull; m) / A</div>
            </div>
          </div>
        </div>

        <div class="formula-takeaway-box" style="background: rgba(99, 102, 241, 0.08); border-left: 4px solid #6366f1;">
          <span style="font-size: 1.2rem;">💡</span>
          <div>
            <strong>Warum quadrieren?</strong> Die Kurve F(U) ist eine Parabel (F &prop; U²). Man kann keine Gerade durch eine Parabel ziehen! Durch die Ersetzung <code>x = U²</code> wird der Graph eine <strong>Ursprungsgerade</strong>.
          </div>
        </div>
      </div>

      <div class="diagram-card" style="margin-top: 1.2rem;">
        <h4 style="font-size: 1rem; font-weight: 800; color: #6366f1; margin-bottom: 0.6rem;">
          📈 Visuelles Schaubild: Linearisierung F über U² (AB06 Messreihe)
        </h4>
        <div class="diagram-svg-wrapper">
          <svg viewBox="0 0 540 220" width="100%" height="200">
            <line x1="60" y1="180" x2="480" y2="180" stroke="var(--text-primary)" stroke-width="2" />
            <line x1="60" y1="180" x2="60" y2="30" stroke="var(--text-primary)" stroke-width="2" />
            <polygon points="480,180 472,176 472,184" fill="var(--text-primary)" />
            <polygon points="60,30 56,38 64,38" fill="var(--text-primary)" />
            <text x="495" y="184" fill="#f43f5e" font-size="12" font-weight="bold">x = U² [V²]</text>
            <text x="60" y="20" fill="#6366f1" font-size="12" font-weight="bold">y = F [N]</text>
            <line x1="60" y1="180" x2="430" y2="50" stroke="#10b981" stroke-width="3" />
            <polygon points="200,131 340,131 340,82" fill="rgba(16, 185, 129, 0.15)" stroke="#10b981" stroke-dasharray="3,3" />
            <text x="270" y="146" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">&Delta;(U²)</text>
            <text x="355" y="110" fill="#10b981" font-size="11" font-weight="bold">&Delta;F</text>
            <text x="250" y="95" fill="#10b981" font-size="12" font-weight="bold">m = &Delta;F / &Delta;(U²)</text>
            <circle cx="120" cy="159" r="4.5" fill="#f43f5e" />
            <circle cx="180" cy="138" r="4.5" fill="#f43f5e" />
            <circle cx="260" cy="110" r="4.5" fill="#f43f5e" />
            <circle cx="330" cy="85" r="4.5" fill="#f43f5e" />
            <circle cx="400" cy="61" r="4.5" fill="#f43f5e" />
            <rect x="80" y="45" width="150" height="42" rx="6" fill="var(--bg-subtle)" stroke="var(--border-subtle)" />
            <text x="155" y="62" fill="var(--text-primary)" font-size="11" font-weight="bold" text-anchor="middle">Ursprungsgerade!</text>
            <text x="155" y="78" fill="#6366f1" font-size="11" font-weight="bold" text-anchor="middle">&epsilon;₀ = (2·d²·m) / A</text>
          </svg>
        </div>
        <div style="font-size: 0.8rem; color: var(--text-secondary); margin-top: 0.5rem; text-align: center;">
          💡 <strong>Merke:</strong> F(U) ist eine Parabel &rarr; Erst durch Quadrieren der x-Werte (U &rarr; U²) entsteht die Ursprungsgerade mit Steigung m!
        </div>
      </div>
    `,
    tasks: [
      {
        prompt: 'Bei Plattenabstand d = 1,0 cm und runden Platten (r = 12,8 cm) ergibt sich aus der Ausgleichsgerade die Steigung m = 4,56·10⁻⁸ N/V². Berechne die experimentelle Feldkonstante ε₀.',
        given: 'd = 0,01 m, r = 0,128 m, m = 4,56·10⁻⁸ N/V²',
        sought: 'ε₀',
        solution: `
          <code>A = &pi; &bull; r&sup2; = &pi; &bull; (0,128 m)&sup2; &asymp; 0,05147 m&sup2;</code><br>
          <code>&epsilon;₀ = (2 &bull; d&sup2; &bull; m) / A</code><br>
          <code>&epsilon;₀ = (2 &bull; (0,01 m)&sup2; &bull; 4,56 &bull; 10⁻⁸ N/V&sup2;) / 0,05147 m&sup2;</code><br>
          <code>&epsilon;₀ = (9,12 &bull; 10⁻¹²) / 0,05147 &asymp; 8,86 &bull; 10⁻¹² As/(Vm)</code><br>
          <strong style="color: #10b981;">Ergebnis:</strong> Exzellente &Uuml;bereinstimmung mit dem Literaturwert (8,854·10⁻¹²)!
        `
      }
    ]
  },

  {
    id: 'entladungskurve-messwerte-ab08',
    num: '07',
    icon: '📉',
    color: '#8b5cf6',
    tag: 'Messwerte & Kondensator-Entladung',
    title: 'Wie werte ich Entladungskurven I(t) aus (Kondensator-Messwerte AB08)?',
    desc: 'Aufgabe AB08: Q0 = Integral I(t) dt durch Kästchenzählen, Kapazität C = Q0/U0 und I(t) = I0 e^(-t/RC).',
    visualHtml: `
      <div class="formula-hero-card" style="border-left: 6px solid #8b5cf6;">
        <span class="formula-hero-badge" style="background: rgba(139, 92, 246, 0.15); color: #8b5cf6;">
          📉 AB08 FLÄCHENAUSZÄHLUNG &amp; KAPAZITÄTSBESTIMMUNG
        </span>
        <div class="formula-math-display">
          <span class="katex-display"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><semantics><mrow><msub><mi>Q</mi><mn>0</mn></msub><mo>=</mo><msubsup><mo>∫</mo><mn>0</mn><mi mathvariant="normal">∞</mi></msubsup><mi>I</mi><mo stretchy="false">(</mo><mi>t</mi><mo stretchy="false">)</mo><mtext> </mtext><mi>d</mi><mi>t</mi><mspace width="1em"/><mtext>und</mtext><mspace width="1em"/><mi>C</mi><mo>=</mo><mfrac><msub><mi>Q</mi><mn>0</mn></msub><msub><mi>U</mi><mn>0</mn></msub></mfrac></mrow><annotation encoding="application/x-tex">Q_0 = \int_0^\infty I(t) \, dt \quad \text{und} \quad C = \frac{Q_0}{U_0}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8778em;vertical-align:-0.1944em;"></span><span class="mord"><span class="mord mathnormal">Q</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight">0</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:2.3262em;vertical-align:-0.9119em;"></span><span class="mop"><span class="mop op-symbol large-op" style="margin-right:0.44445em;position:relative;top:-0.0011em;">∫</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.4143em;"><span style="top:-1.7881em;margin-left:-0.4445em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight">0</span></span></span><span style="top:-3.8129em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight">∞</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.9119em;"><span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal" style="margin-right:0.07847em;">I</span><span class="mopen">(</span><span class="mord mathnormal">t</span><span class="mclose">)</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal">d</span><span class="mord mathnormal">t</span><span class="mspace" style="margin-right:1em;"></span><span class="mord text"><span class="mord">und</span></span><span class="mspace" style="margin-right:1em;"></span><span class="mord mathnormal" style="margin-right:0.07153em;">C</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:2.1963em;vertical-align:-0.836em;"></span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.3603em;"><span style="top:-2.314em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord"><span class="mord mathnormal" style="margin-right:0.10903em;">U</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.109em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight">0</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.677em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord"><span class="mord mathnormal">Q</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight">0</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.836em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span></span></span></span></span>
        </div>
        
        <div class="variable-pills-grid">
          <div class="var-pill-card">
            <div class="var-sym-badge" style="background: rgba(139, 92, 246, 0.15); color: #7c3aed;">Q₀</div>
            <div class="var-info-wrap">
              <div class="var-info-title">Gesamtladung</div>
              <div class="var-info-unit">Fl&auml;che unter I(t): <strong>Coulomb (C)</strong></div>
            </div>
          </div>
          <div class="var-pill-card">
            <div class="var-sym-badge" style="background: rgba(6, 182, 212, 0.15); color: #0891b2;">C</div>
            <div class="var-info-wrap">
              <div class="var-info-title">Kapazit&auml;t (Q₀ / U₀)</div>
              <div class="var-info-unit">Einheit: <strong>Farad (F)</strong></div>
            </div>
          </div>
          <div class="var-pill-card">
            <div class="var-sym-badge" style="background: rgba(245, 158, 11, 0.15); color: #d97706;">&tau;</div>
            <div class="var-info-wrap">
              <div class="var-info-title">Zeitkonstante (R &bull; C)</div>
              <div class="var-info-unit">Abfall auf 37 %: <strong>Sekunden (s)</strong></div>
            </div>
          </div>
        </div>

        <div class="formula-takeaway-box" style="background: rgba(139, 92, 246, 0.08); border-left: 4px solid #8b5cf6;">
          <span style="font-size: 1.2rem;">💡</span>
          <div>
            <strong>Kästchenzähl-Methode (AB08):</strong><br>
            1 Kästchen = <code>&Delta;t [s] &bull; &Delta;I [A]</code> Ladung. Gesamte Ladung = <code>Anzahl K&auml;stchen &bull; Ladung pro K&auml;stchen</code>.
          </div>
        </div>
      </div>

      <div class="diagram-card" style="margin-top: 1.2rem;">
        <h4 style="font-size: 1rem; font-weight: 800; color: #8b5cf6; margin-bottom: 0.6rem;">
          📉 Visuelles Schaubild: Entladestrom I(t) &amp; Fl&auml;chenausz&auml;hlung (AB08 Messwerte)
        </h4>
        <div class="diagram-svg-wrapper">
          <svg viewBox="0 0 540 220" width="100%" height="200">
            <line x1="60" y1="180" x2="480" y2="180" stroke="var(--text-primary)" stroke-width="2" />
            <line x1="60" y1="180" x2="60" y2="30" stroke="var(--text-primary)" stroke-width="2" />
            <polygon points="480,180 472,176 472,184" fill="var(--text-primary)" />
            <polygon points="60,30 56,38 64,38" fill="var(--text-primary)" />
            <text x="495" y="184" fill="var(--text-secondary)" font-size="12" font-weight="bold">t [s]</text>
            <text x="60" y="20" fill="#8b5cf6" font-size="12" font-weight="bold">I [mA]</text>
            <text x="40" y="55" fill="#8b5cf6" font-size="11" font-weight="bold">I₀</text>
            <path d="M 60 50 Q 150 120 450 178 L 450 180 L 60 180 Z" fill="rgba(139, 92, 246, 0.2)" />
            <path d="M 60 50 Q 150 120 450 178" fill="none" stroke="#8b5cf6" stroke-width="3" />
            <rect x="140" y="110" width="190" height="42" rx="6" fill="var(--bg-subtle)" stroke="#8b5cf6" />
            <text x="235" y="127" fill="#8b5cf6" font-size="11" font-weight="bold" text-anchor="middle">Fl&auml;che = Ladung Q₀</text>
            <text x="235" y="142" fill="var(--text-primary)" font-size="10" text-anchor="middle">Q₀ = K&auml;stchen &bull; (&Delta;t &bull; &Delta;I)</text>
          </svg>
        </div>
        <div style="font-size: 0.8rem; color: var(--text-secondary); margin-top: 0.5rem; text-align: center;">
          💡 <strong>Klausur-Kernprinzip:</strong> Fl&auml;che unter I(t) entspricht der abgeflossenen Ladung Q₀ &rarr; Kapazit&auml;t: <code>C = Q₀ / U₀</code>!
        </div>
      </div>
    `,
    tasks: [
      {
        prompt: 'Ein Kondensator wird mit U₀ = 10 V geladen. Bei der Entladung zählt man unter der I(t)-Kurve insgesamt 48 Kästchen. Ein Kästchen entspricht Δt = 2 s und ΔI = 0,25 mA. Berechne die Kapazität C.',
        given: 'U₀ = 10 V, 48 Kästchen, Δt = 2 s, ΔI = 0,25·10⁻³ A',
        sought: 'C',
        solution: `
          <code>Q_K&auml;stchen = &Delta;t &bull; &Delta;I = 2 s &bull; 0,25 &bull; 10⁻³ A = 0,50 &bull; 10⁻³ C</code><br>
          <code>Q₀ = 48 &bull; 0,50 &bull; 10⁻³ C = 24 &bull; 10⁻³ C = 24 mC</code><br>
          <code>C = Q₀ / U₀ = (24 &bull; 10⁻³ C) / 10 V = 2,4 &bull; 10⁻³ F = 2,4 mF = 2400 &mu;F</code>.
        `
      }
    ]
  },

  {
    id: 'kondensator-kapazitaet-energie',
    num: '08',
    icon: '🔋',
    color: '#10b981',
    tag: 'Kapazität & Energie',
    title: 'Kondensator-Kapazität & Energie im elektrischen Feld',
    desc: 'C = ε0 εr (A/d), Energie Wel = 1/2 C U² = 1/2 Q U und Verhalten bei Abstandsänderung (Quelle getrennt vs. angeschlossen).',
    visualHtml: `
      <div class="formula-hero-card" style="border-left: 6px solid #10b981;">
        <span class="formula-hero-badge" style="background: rgba(16, 185, 129, 0.15); color: #10b981;">
          🔋 KAPAZITÄT &amp; ELEKTRISCHE ENERGIE
        </span>
        <div class="formula-math-display">
          <span class="katex-display"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><semantics><mrow><mi>C</mi><mo>=</mo><msub><mi>ε</mi><mn>0</mn></msub><msub><mi>ε</mi><mi>r</mi></msub><mfrac><mi>A</mi><mi>d</mi></mfrac><mspace width="1em"/><mtext>und</mtext><mspace width="1em"/><msub><mi>W</mi><mtext>el</mtext></msub><mo>=</mo><mfrac><mn>1</mn><mn>2</mn></mfrac><mi>C</mi><msup><mi>U</mi><mn>2</mn></msup></mrow><annotation encoding="application/x-tex">C = \varepsilon_0 \varepsilon_r \frac{A}{d} \quad \text{und} \quad W_{\text{el}} = \frac{1}{2} C U^2</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6833em;"></span><span class="mord mathnormal" style="margin-right:0.07153em;">C</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:2.0463em;vertical-align:-0.686em;"></span><span class="mord"><span class="mord mathnormal">ε</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight">0</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mord"><span class="mord mathnormal">ε</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1514em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight" style="margin-right:0.02778em;">r</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.3603em;"><span style="top:-2.314em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord mathnormal">d</span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.677em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord mathnormal">A</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.686em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span><span class="mspace" style="margin-right:1em;"></span><span class="mord text"><span class="mord">und</span></span><span class="mspace" style="margin-right:1em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.13889em;">W</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3361em;"><span style="top:-2.55em;margin-left:-0.1389em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord text mtight"><span class="mord mtight">el</span></span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:2.0074em;vertical-align:-0.686em;"></span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.3214em;"><span style="top:-2.314em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord">2</span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.677em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord">1</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.686em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span><span class="mord mathnormal" style="margin-right:0.07153em;">C</span><span class="mord"><span class="mord mathnormal" style="margin-right:0.10903em;">U</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8641em;"><span style="top:-3.113em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight">2</span></span></span></span></span></span></span></span></span></span></span></span>
        </div>
        
        <div class="variable-pills-grid">
          <div class="var-pill-card">
            <div class="var-sym-badge" style="background: rgba(16, 185, 129, 0.15); color: #059669;">C</div>
            <div class="var-info-wrap">
              <div class="var-info-title">Kapazit&auml;t (&epsilon;₀ &bull; A / d)</div>
              <div class="var-info-unit">Einheit: <strong>Farad (F)</strong></div>
            </div>
          </div>
          <div class="var-pill-card">
            <div class="var-sym-badge" style="background: rgba(245, 158, 11, 0.15); color: #d97706;">W<sub>el</sub></div>
            <div class="var-info-wrap">
              <div class="var-info-title">Feldenergie (&frac12; C U&sup2;)</div>
              <div class="var-info-unit">Einheit: <strong>Joule (J = Ws)</strong></div>
            </div>
          </div>
          <div class="var-pill-card">
            <div class="var-sym-badge" style="background: rgba(6, 182, 212, 0.15); color: #0891b2;">&epsilon;<sub>r</sub></div>
            <div class="var-info-wrap">
              <div class="var-info-title">Dielektrizit&auml;tszahl</div>
              <div class="var-info-unit">Vakuum / Luft: <strong>&asymp; 1,0</strong></div>
            </div>
          </div>
        </div>

        <div class="formula-takeaway-box" style="background: rgba(16, 185, 129, 0.08); border-left: 4px solid #10b981;">
          <span style="font-size: 1.2rem;">💡</span>
          <div>
            <strong>Klausur-Falle (Quelle getrennt vs. angeschlossen):</strong><br>
            • <strong>Quelle bleibt angeschlossen:</strong> <code>U = const</code> &rarr; Bei gr&ouml;&szlig;erem d sinken C, Q und W<sub>el</sub>.<br>
            • <strong>Quelle getrennt:</strong> <code>Q = const</code> &rarr; Bei gr&ouml;&szlig;erem d sinkt C, aber <strong>U steigt</strong> und <strong>W<sub>el</sub> steigt</strong> (Handarbeit am Feld)!
          </div>
        </div>
      </div>
    `,
    tasks: [
      {
        prompt: 'Ein Plattenkondensator (C = 200 pF) wird auf U = 500 V aufgeladen und von der Spannungsquelle getrennt. Nun wird der Plattenabstand verdoppelt. Berechne die neue Spannung und die verrichtete mechanische Arbeit.',
        given: 'C₁ = 200 pF, U₁ = 500 V, d₂ = 2·d₁, Q = const',
        sought: 'U₂, ΔW',
        solution: `
          Da <code>C = &epsilon;₀ &bull; A / d</code>, halbiert sich die Kapazität: <code>C₂ = 100 pF</code>.<br>
          Wegen <code>Q = C₁ &bull; U₁ = 100 nC = const</code> verdoppelt sich die Spannung:<br>
          <code>U₂ = Q / C₂ = 100 nC / 100 pF = 1000 V</code>!<br>
          Energie vorher: <code>W₁ = &frac12; C₁ U₁&sup2; = &frac12; (200 &bull; 10⁻¹² F) &bull; (500 V)&sup2; = 2,5 &bull; 10⁻⁵ J</code><br>
          Energie nachher: <code>W₂ = &frac12; C₂ U₂&sup2; = &frac12; (100 &bull; 10⁻¹² F) &bull; (1000 V)&sup2; = 5,0 &bull; 10⁻⁵ J</code><br>
          Mechanische Arbeit: <code>&Delta;W = W₂ - W₁ = 2,5 &bull; 10⁻⁵ J</code> (investiert gegen die elektrostatische Anziehung der Platten).
        `
      }
    ]
  },

  {
    id: 'kondensator-schaltungen',
    num: '09',
    icon: '🔌',
    color: '#0284c7',
    tag: 'Schaltungen & Ersatzkapazität',
    title: 'Kondensator-Schaltungen: Reihenschaltung vs. Parallelschaltung',
    desc: 'Parallel addieren sich Kapazitäten (Cges = C1 + C2), in Reihe addieren sich Kehrwerte (1/Cges = 1/C1 + 1/C2).',
    visualHtml: `
      <div class="formula-hero-card" style="border-left: 6px solid #0284c7;">
        <span class="formula-hero-badge" style="background: rgba(2, 132, 199, 0.15); color: #0284c7;">
          🔌 PARALLEL- VS. REIHENSCHALTUNG
        </span>
        <div class="formula-math-display">
          <span class="katex-display"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><semantics><mrow><msub><mi>C</mi><mtext>parallel</mtext></msub><mo>=</mo><msub><mi>C</mi><mn>1</mn></msub><mo>+</mo><msub><mi>C</mi><mn>2</mn></msub><mspace width="1em"/><mtext>  </mtext><mo>⟺</mo><mtext>  </mtext><mspace width="1em"/><mfrac><mn>1</mn><msub><mi>C</mi><mtext>reihe</mtext></msub></mfrac><mo>=</mo><mfrac><mn>1</mn><msub><mi>C</mi><mn>1</mn></msub></mfrac><mo>+</mo><mfrac><mn>1</mn><msub><mi>C</mi><mn>2</mn></msub></mfrac></mrow><annotation encoding="application/x-tex">C_{\text{parallel}} = C_1 + C_2 \quad \iff \quad \frac{1}{C_{\text{reihe}}} = \frac{1}{C_1} + \frac{1}{C_2}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.9694em;vertical-align:-0.2861em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.07153em;">C</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3361em;"><span style="top:-2.55em;margin-left:-0.0715em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord text mtight"><span class="mord mtight">parallel</span></span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.2861em;"><span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:0.8333em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.07153em;">C</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.0715em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight">1</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:0.8333em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.07153em;">C</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.0715em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight">2</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mspace" style="margin-right:1em;"></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">⟺</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mspace" style="margin-right:1em;"></span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:2.1574em;vertical-align:-0.836em;"></span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.3214em;"><span style="top:-2.314em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord"><span class="mord mathnormal" style="margin-right:0.07153em;">C</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3361em;"><span style="top:-2.55em;margin-left:-0.0715em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord text mtight"><span class="mord mtight">reihe</span></span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.677em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord">1</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.836em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:2.1574em;vertical-align:-0.836em;"></span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.3214em;"><span style="top:-2.314em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord"><span class="mord mathnormal" style="margin-right:0.07153em;">C</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.0715em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight">1</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.677em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord">1</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.836em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:2.1574em;vertical-align:-0.836em;"></span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.3214em;"><span style="top:-2.314em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord"><span class="mord mathnormal" style="margin-right:0.07153em;">C</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.0715em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight">2</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.677em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord">1</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.836em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span></span></span></span></span>
        </div>
        
        <div class="variable-pills-grid">
          <div class="var-pill-card">
            <div class="var-sym-badge" style="background: rgba(2, 132, 199, 0.15); color: #0284c7;">C<sub>par</sub></div>
            <div class="var-info-wrap">
              <div class="var-info-title">Parallelschaltung</div>
              <div class="var-info-unit">C<sub>ges</sub> = C₁ + C₂ &bull; <strong>U = const</strong></div>
            </div>
          </div>
          <div class="var-pill-card">
            <div class="var-sym-badge" style="background: rgba(245, 158, 11, 0.15); color: #d97706;">C<sub>rei</sub></div>
            <div class="var-info-wrap">
              <div class="var-info-title">Reihenschaltung</div>
              <div class="var-info-unit">1/C<sub>ges</sub> = 1/C₁ + 1/C₂ &bull; <strong>Q = const</strong></div>
            </div>
          </div>
        </div>

        <div class="formula-takeaway-box" style="background: rgba(2, 132, 199, 0.08); border-left: 4px solid #0284c7;">
          <span style="font-size: 1.2rem;">💡</span>
          <div>
            <strong>Merkhilfe:</strong> Bei Kondensatoren ist es genau <strong>umgekehrt wie bei ohmschen Widerständen</strong>!<br>
            • Parallel: Plattenflächen vergrößern sich &rarr; Kapazität wird größer.<br>
            • Reihe: Plattenabstände addieren sich &rarr; Gesamtkapazität ist kleiner als der kleinste Einzelkondensator!
          </div>
        </div>
      </div>

      <div class="diagram-card" style="margin-top: 1.2rem;">
        <h4 style="font-size: 1rem; font-weight: 800; color: #0284c7; margin-bottom: 0.6rem;">
          🔌 Visuelles Schaubild: Parallelschaltung vs. Reihenschaltung
        </h4>
        <div class="diagram-svg-wrapper">
          <svg viewBox="0 0 540 180" width="100%" height="170">
            <text x="140" y="25" fill="#0284c7" font-size="13" font-weight="bold" text-anchor="middle">PARALLEL: C_ges = C₁ + C₂</text>
            <line x1="40" y1="90" x2="90" y2="90" stroke="var(--text-primary)" stroke-width="2" />
            <line x1="90" y1="50" x2="90" y2="130" stroke="var(--text-primary)" stroke-width="2" />
            <line x1="90" y1="50" x2="130" y2="50" stroke="var(--text-primary)" stroke-width="2" />
            <line x1="130" y1="38" x2="130" y2="62" stroke="#0284c7" stroke-width="3" />
            <line x1="142" y1="38" x2="142" y2="62" stroke="#0284c7" stroke-width="3" />
            <line x1="142" y1="50" x2="180" y2="50" stroke="var(--text-primary)" stroke-width="2" />
            <text x="136" y="75" fill="#0284c7" font-size="10" font-weight="bold" text-anchor="middle">C₁</text>
            <line x1="90" y1="130" x2="130" y2="130" stroke="var(--text-primary)" stroke-width="2" />
            <line x1="130" y1="118" x2="130" y2="142" stroke="#0284c7" stroke-width="3" />
            <line x1="142" y1="118" x2="142" y2="142" stroke="#0284c7" stroke-width="3" />
            <line x1="142" y1="130" x2="180" y2="130" stroke="var(--text-primary)" stroke-width="2" />
            <text x="136" y="155" fill="#0284c7" font-size="10" font-weight="bold" text-anchor="middle">C₂</text>
            <line x1="180" y1="50" x2="180" y2="130" stroke="var(--text-primary)" stroke-width="2" />
            <line x1="180" y1="90" x2="230" y2="90" stroke="var(--text-primary)" stroke-width="2" />

            <line x1="270" y1="20" x2="270" y2="160" stroke="var(--border-subtle)" stroke-dasharray="4,4" />

            <text x="410" y="25" fill="#f59e0b" font-size="13" font-weight="bold" text-anchor="middle">REIHE: 1/C_ges = 1/C₁ + 1/C₂</text>
            <line x1="300" y1="90" x2="350" y2="90" stroke="var(--text-primary)" stroke-width="2" />
            <line x1="350" y1="75" x2="350" y2="105" stroke="#f59e0b" stroke-width="3" />
            <line x1="362" y1="75" x2="362" y2="105" stroke="#f59e0b" stroke-width="3" />
            <text x="356" y="120" fill="#f59e0b" font-size="10" font-weight="bold" text-anchor="middle">C₁</text>
            <line x1="362" y1="90" x2="420" y2="90" stroke="var(--text-primary)" stroke-width="2" />
            <line x1="420" y1="75" x2="420" y2="105" stroke="#f59e0b" stroke-width="3" />
            <line x1="432" y1="75" x2="432" y2="105" stroke="#f59e0b" stroke-width="3" />
            <text x="426" y="120" fill="#f59e0b" font-size="10" font-weight="bold" text-anchor="middle">C₂</text>
            <line x1="432" y1="90" x2="490" y2="90" stroke="var(--text-primary)" stroke-width="2" />
          </svg>
        </div>
      </div>
    `,
    hasSim: 'schaltungen',
    tasks: [
      {
        prompt: 'Zwei Kondensatoren C₁ = 60 μF und C₂ = 30 μF werden an U = 12 V angeschlossen. Berechne die Gesamtkapazität C_ges jeweils für Parallelschaltung und Reihenschaltung.',
        given: 'C₁ = 60 μF, C₂ = 30 μF, U = 12 V',
        sought: 'C_ges (Parallel & Reihe)',
        solution: `
          <strong>Parallelschaltung:</strong><br>
          <code>C_ges = C₁ + C₂ = 60 &mu;F + 30 &mu;F = 90 &mu;F</code><br><br>
          <strong>Reihenschaltung:</strong><br>
          <code>1 / C_ges = 1/60 + 1/30 = 1/60 + 2/60 = 3/60 = 1/20 &rArr; C_ges = 20 &mu;F</code>.
        `
      }
    ]
  },

  {
    id: 'elektroskop-glimmlampe-ab01-ab04',
    num: '10',
    icon: '🔬',
    color: '#14b8a6',
    tag: 'Elektrostatik-Praxis',
    title: 'Elektroskop, Ladungsnachweis & Glimmlampe (AB01 & AB04)',
    desc: 'Glimmlampe leuchtet nur am Minuspol (Kathode), Elektroskop zeigt Ladungsmenge und Spitzenwirkung.',
    visualHtml: `
      <div class="formula-hero-card" style="border-left: 6px solid #14b8a6;">
        <span class="formula-hero-badge" style="background: rgba(20, 184, 166, 0.15); color: #14b8a6;">
          🔬 SPITZENWIRKUNG &amp; LADUNGSDICHTE
        </span>
        <div class="formula-math-display">
          <span class="katex-display"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><semantics><mrow><msub><mi>E</mi><mtext>Spitze</mtext></msub><mo>≫</mo><msub><mi>E</mi><mtext>Kugel</mtext></msub><mspace width="1em"/><mrow><mo fence="true">(</mo><mi>σ</mi><mo>=</mo><mfrac><mi>Q</mi><mi>A</mi></mfrac><mo fence="true">)</mo></mrow></mrow><annotation encoding="application/x-tex">E_{\text{Spitze}} \gg E_{\text{Kugel}} \quad \left(\sigma = \frac{Q}{A}\right)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.9694em;vertical-align:-0.2861em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.05764em;">E</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3283em;"><span style="top:-2.55em;margin-left:-0.0576em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord text mtight"><span class="mord mtight">Spitze</span></span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.2861em;"><span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">≫</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:2.4em;vertical-align:-0.95em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.05764em;">E</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3361em;"><span style="top:-2.55em;margin-left:-0.0576em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord text mtight"><span class="mord mtight">Kugel</span></span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.2861em;"><span></span></span></span></span></span></span><span class="mspace" style="margin-right:1em;"></span><span class="mspace" style="margin-right:0.1667em;"></span><span class="minner"><span class="mopen delimcenter" style="top:0em;"><span class="delimsizing size3">(</span></span><span class="mord mathnormal" style="margin-right:0.03588em;">σ</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.3603em;"><span style="top:-2.314em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord mathnormal">A</span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.677em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord mathnormal">Q</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.686em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span><span class="mclose delimcenter" style="top:0em;"><span class="delimsizing size3">)</span></span></span></span></span></span></span>
        </div>
        
        <div class="variable-pills-grid">
          <div class="var-pill-card">
            <div class="var-sym-badge" style="background: rgba(244, 63, 94, 0.15); color: #e11d48;">-</div>
            <div class="var-info-wrap">
              <div class="var-info-title">Kathodenleuchten</div>
              <div class="var-info-unit">Glimmlampe: <strong>Minuspol glimmt</strong></div>
            </div>
          </div>
          <div class="var-pill-card">
            <div class="var-sym-badge" style="background: rgba(20, 184, 166, 0.15); color: #0d9488;">&sigma;</div>
            <div class="var-info-wrap">
              <div class="var-info-title">Fl&auml;chenladungsdichte</div>
              <div class="var-info-unit">&sigma; = Q / A &bull; <strong>extrem hoch an Spitzen</strong></div>
            </div>
          </div>
        </div>

        <div class="formula-takeaway-box" style="background: rgba(20, 184, 166, 0.08); border-left: 4px solid #14b8a6;">
          <span style="font-size: 1.2rem;">💡</span>
          <div>
            <strong>3 Fakten für die Klausur:</strong><br>
            1. <strong>Glimmlampe (AB04):</strong> Das Leuchten entsteht durch Elektronenaufprall am <strong>Minuspol (Kathode)</strong>.<br>
            2. <strong>Elektroskop (AB01):</strong> Zeigerausschlag ist proportional zur Ladung Q.<br>
            3. <strong>Spitzenwirkung (AB11):</strong> Wegen starker Krümmung drängen sich Ladungen an Spitzen zusammen &rarr; Sehr starke Feldstärke &rarr; Funkenentladung / Spitzenwind!
          </div>
        </div>
      </div>

      <div class="diagram-card" style="margin-top: 1.2rem;">
        <h4 style="font-size: 1rem; font-weight: 800; color: #14b8a6; margin-bottom: 0.6rem;">
          🔬 Visuelles Schaubild: Glimmlampe (AB04) &amp; Elektroskop (AB01)
        </h4>
        <div class="diagram-svg-wrapper">
          <svg viewBox="0 0 540 180" width="100%" height="170">
            <text x="140" y="25" fill="#f43f5e" font-size="12" font-weight="bold" text-anchor="middle">GLIMMLAMPE: Kathodenleuchten (-)</text>
            <rect x="50" y="45" width="180" height="90" rx="20" fill="var(--bg-subtle)" stroke="var(--border-subtle)" stroke-width="2" />
            <line x1="70" y1="90" x2="100" y2="90" stroke="#ef4444" stroke-width="4" />
            <text x="85" y="80" fill="#ef4444" font-size="11" font-weight="bold" text-anchor="middle">+</text>
            <line x1="180" y1="90" x2="210" y2="90" stroke="#3b82f6" stroke-width="4" />
            <circle cx="195" cy="90" r="16" fill="rgba(244, 63, 94, 0.4)" filter="drop-shadow(0 0 8px #f43f5e)" />
            <text x="195" y="80" fill="#3b82f6" font-size="11" font-weight="bold" text-anchor="middle">-</text>
            <text x="140" y="155" fill="#f43f5e" font-size="10" font-weight="bold" text-anchor="middle">Nur der Minuspol glimmt!</text>
            <line x1="270" y1="20" x2="270" y2="160" stroke="var(--border-subtle)" stroke-dasharray="4,4" />
            <text x="410" y="25" fill="#14b8a6" font-size="12" font-weight="bold" text-anchor="middle">ELEKTROSKOP: Ladungsnachweis</text>
            <rect x="380" y="45" width="60" height="10" rx="3" fill="#14b8a6" />
            <line x1="410" y1="55" x2="410" y2="120" stroke="#14b8a6" stroke-width="4" />
            <line x1="410" y1="75" x2="435" y2="120" stroke="#f59e0b" stroke-width="3" />
            <circle cx="410" cy="75" r="4" fill="#f59e0b" />
            <text x="410" y="155" fill="var(--text-secondary)" font-size="10" text-anchor="middle">Zeigerausschlag &prop; Ladung Q</text>
          </svg>
        </div>
      </div>
    `,
    tasks: [
      {
        prompt: 'An eine Glimmlampe wird Wechselspannung angelegt. Welche Elektrode leuchtet?',
        given: 'AB04 Versuch',
        sought: 'Erklärung',
        solution: 'Bei 50 Hz Wechselspannung wechselt die Polung 100-mal pro Sekunde die Richtung. Durch die Trägheit des menschlichen Auges leuchten <strong>beide Elektroden scheinbar gleichzeitig</strong>.'
      }
    ]
  }
];


// --- 2. KOMPLEXE KOMBI-AUFGABEN (BLOCK-VERBINDUNG) ---
const KOMBI_AUFGABEN = [
  {
    title: 'Kombi 1: Plattenkondensator + E-Feld + Fadenpendel-Auslenkung',
    badges: ['E-Feld (E = U/d)', 'Kräftedreieck (tan α)', 'Ladungsbestimmung'],
    prompt: `
      An einem Plattenkondensator mit Plattenabstand <code>d = 5,0 cm</code> liegt die Hochspannung <code>U = 2500 V</code> an.
      Zwischen den Platten hängt an einem isolierenden Faden eine kleine Kugel der Masse <code>m = 0,80 g</code>.
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
      <code>E = U / d = 2500 V / 0,05 m = 50.000 V/m = 50 kV/m</code><br><br>
      <strong>c) Ladung q über das Kräftedreieck:</strong><br>
      Am ausgelenkten Pendel herrscht Kräftegleichgewicht zwischen Gewichtskraft F_G und elektrischer Kraft F_el:<br>
      <code>tan(&alpha;) = F_el / F_G = (q &bull; E) / (m &bull; g)</code><br>
      Nach q umstellen:<br>
      <code>q = (m &bull; g &bull; tan(&alpha;)) / E</code><br>
      Werte einsetzen (m = 0,00080 kg, g = 9,81 m/s², tan(14°) &asymp; 0,24933):<br>
      <code>q = (0,00080 kg &bull; 9,81 m/s&sup2; &bull; 0,24933) / 50.000 V/m</code><br>
      <code>q = (1,957 &bull; 10⁻³ N) / 50.000 V/m &asymp; 3,91 &bull; 10⁻⁸ C = 39,1 nC</code><br>
      <strong style="color: #10b981;">Ergebnis:</strong> Die Kugel trägt eine Ladung von <strong>q &asymp; 39,1 nC</strong>.
    `
  },
  {
    title: 'Kombi 2: Coulomb-Gesetz + Ladungsausgleich bei Berührung + Pendelauslenkung',
    badges: ['Coulombsches Gesetz', 'Ladungsausgleich', 'Kräftegleichgewicht'],
    prompt: `
      Zwei gleiche, leitende kleine Kugeln A und B (je Masse m = 1,2 g) hängen an gleich langen Fäden nebeneinander.
      Anfangs trägt Kugel A die Ladung <code>Q_A = +12 nC</code> und Kugel B ist ungeladen (<code>Q_B = 0</code>).
      Die Kugeln berühren sich kurz und stoßen sich anschließend ab, sodass sie im Gleichgewicht einen Abstand von <code>r = 6,0 cm</code> einnehmen.<br>
      <strong>Aufgaben:</strong><br>
      a) Welche Ladung trägt jede Kugel nach der Berührung?<br>
      b) Berechne die abstoßende Coulomb-Kraft F_C zwischen beiden Kugeln.<br>
      c) Welchen Auslenkungswinkel &alpha; gegenüber der Senkrechten nimmt jeder Faden ein?
    `,
    solution: `
      <strong>a) Ladungsausgleich:</strong><br>
      Wegen Symmetrie verteilt sich die Gesamtladung gleichmäßig auf beide Kugeln:<br>
      <code>Q' = (Q_A + Q_B) / 2 = (+12 nC + 0) / 2 = +6,0 nC = 6,0 &bull; 10⁻⁹ C</code> für jede Kugel.<br><br>
      <strong>b) Coulomb-Kraft F_C:</strong><br>
      <code>F_C = 1/(4&pi;&epsilon;₀) &bull; (Q'&sup2; / r&sup2;)</code><br>
      <code>F_C = (8,988 &bull; 10⁹) &bull; (6,0 &bull; 10⁻⁹)&sup2; / (0,06 m)&sup2;</code><br>
      <code>F_C = (8,988 &bull; 10⁹ &bull; 36 &bull; 10⁻¹⁸) / 0,0036 = 3,236 &bull; 10⁻⁷ / 0,0036 &asymp; 8,99 &bull; 10⁻⁵ N &asymp; 0,090 mN</code><br><br>
      <strong>c) Auslenkungswinkel &alpha;:</strong><br>
      <code>tan(&alpha;) = F_C / F_G = F_C / (m &bull; g)</code><br>
      <code>F_G = 0,0012 kg &bull; 9,81 m/s&sup2; &asymp; 0,01177 N</code><br>
      <code>tan(&alpha;) = (8,99 &bull; 10⁻⁵ N) / 0,01177 N &asymp; 0,007636</code><br>
      <code>&alpha; = arctan(0,007636) &asymp; 0,44&deg;</code>.
    `
  },
  {
    title: 'Kombi 3: Kondensator-Entladung (I(t)) → Ladung Q → Kapazität C → Plattenabstand d',
    badges: ['Flächenzählung AB08', 'C = Q/U', 'Plattenkondensator C = ε0 A/d'],
    prompt: `
      Ein Plattenkondensator mit runden Platten (Radius R = 15 cm) wird an eine Spannungsquelle mit <code>U₀ = 200 V</code> angeschlossen.
      Danach wird er getrennt und über einen Widerstand entladen. Die Messkurve I(t) liefert durch Flächenzählung die Gesamtladung <code>Q₀ = 12,5 nC</code>.<br>
      <strong>Aufgaben:</strong><br>
      a) Berechne die Kapazität C des Kondensators in Picofarad (pF).<br>
      b) Bestimme die Fläche A der Kondensatorplatten.<br>
      c) Welchen Plattenabstand d hatte der Kondensator?
    `,
    solution: `
      <strong>a) Kapazität C:</strong><br>
      <code>C = Q₀ / U₀ = (12,5 &bull; 10⁻⁹ C) / 200 V = 6,25 &bull; 10⁻¹¹ F = 62,5 pF</code><br><br>
      <strong>b) Plattenfläche A:</strong><br>
      Kreisfläche mit Radius R = 0,15 m:<br>
      <code>A = &pi; &bull; R&sup2; = &pi; &bull; (0,15 m)&sup2; &asymp; 0,0707 m&sup2;</code><br><br>
      <strong>c) Plattenabstand d:</strong><br>
      Für den Plattenkondensator gilt <code>C = &epsilon;₀ &bull; (A / d) &rArr; d = (&epsilon;₀ &bull; A) / C</code>.<br>
      <code>d = (8,854 &bull; 10⁻¹² As/(Vm) &bull; 0,0707 m&sup2;) / (6,25 &bull; 10⁻¹¹ F)</code><br>
      <code>d = 6,26 &bull; 10⁻¹³ / 6,25 &bull; 10⁻¹¹ &asymp; 0,0100 m = 1,0 cm</code>.<br>
      <strong style="color: #10b981;">Ergebnis:</strong> Der Plattenabstand betrug <strong>d = 1,0 cm</strong>.
    `
  }
];

// --- 3. GROSSER AUFGABENPOOL AUS ALLEN ISERV-ARBEITSBLÄTTERN (AB01 - AB11) ---
const ISERV_AUFGABEN_POOL = [
  {
    sheet: 'AB01 Elektroskop',
    category: 'elektrostatik',
    title: 'AB01: Ladungsnachweis mit dem Elektroskop',
    prompt: 'Ein Elektroskop ist negativ geladen (Zeiger ausgelenkt). Man nähert sich dem Teller mit einem unbekannten Körper X, woraufhin der Zeigerausschlag kleiner wird. Welche Ladung trägt X?',
    solution: 'Wird der Zeigerausschlag kleiner, fließen Elektronen aus dem Zeiger nach oben auf den Teller zurück. Das geschieht, wenn der Körper X Elektronen anzieht. <strong>Der Körper X ist positiv geladen.</strong>'
  },
  {
    sheet: 'AB02 Influenz',
    category: 'elektrostatik',
    title: 'AB02: Ladungsverschiebung an zwei berührenden Metallkugeln',
    prompt: 'Zwei ungeladene Metallkugeln berühren sich. Ein negativ geladener Stab wird von links an Kugel 1 angenähert. Während der Stab da ist, werden die Kugeln getrennt. Danach wird der Stab entfernt. Welche Ladung tragen Kugel 1 und Kugel 2?',
    solution: 'Der negative Stab stößt Elektronen aus Kugel 1 nach Kugel 2 ab. Werden sie getrennt, verbleibt auf Kugel 1 ein Elektronenmangel (<strong>positiv</strong>) und auf Kugel 2 ein Elektronenüberschuss (<strong>negativ</strong>)!'
  },
  {
    sheet: 'AB04 Glimmlampe',
    category: 'elektrostatik',
    title: 'AB04: Glimmlampen-Elektrode',
    prompt: 'Warum leuchtet bei Gleichspannung nur eine Elektrode der Glimmlampe, bei Wechselspannung aus der Steckdose aber scheinbar beide?',
    solution: 'Bei Gleichspannung leuchtet nur die Kathode (Minuspol). Bei Wechselspannung polt sich das Netz 50-mal pro Sekunde um &rarr; Durch die Trägheit des menschlichen Auges scheinen beide Elektroden gleichzeitig zu leuchten.'
  },
  {
    sheet: 'AB05 Coulomb',
    category: 'coulomb',
    title: 'AB05: Coulombkraft bei Abstandsverdopplung',
    prompt: 'Zwei Punktladungen üben im Abstand r = 5 cm eine Kraft von F = 16 mN aufeinander aus. Wie groß ist die Kraft im Abstand r = 10 cm und r = 2,5 cm?',
    solution: 'Da F &prop; 1/r²:<br>• Bei r = 10 cm (doppelter Abstand) sinkt die Kraft auf ein Viertel: <code>F = 16 mN / 4 = 4 mN</code>.<br>• Bei r = 2,5 cm (halber Abstand) vervierfacht sich die Kraft: <code>F = 16 mN &bull; 4 = 64 mN</code>.'
  },
  {
    sheet: 'AB06 Messwerte',
    category: 'messwerte',
    title: 'AB06: Auswertung einer Messreihe F(U)',
    prompt: 'Warum darf man bei der Auswertung von F über U keine lineare Ausgleichsgerade durch die Punkte ziehen, und wie linearisiert man die Messreihe?',
    solution: 'Weil der Zusammenhang quadratisch ist: <code>F &prop; U²</code> (Parabel). Zur Linearisierung quadriert man alle Spannungswerte und trägt F über U² auf &rarr; Man erhält eine Ursprungsgerade mit Steigung <code>m = &frac12;&epsilon;₀(A/d²)</code>.'
  },
  {
    sheet: 'AB07 Feldstärke',
    category: 'efeld',
    title: 'AB07: Feldstärke zwischen zwei Kondensatorplatten',
    prompt: 'Zwischen zwei Platten (Abstand d = 1,0 cm) liegt eine Spannung von U = 5000 V. Wie groß ist die Feldstärke E? Kann es bei Luft zu einem Funkenüberschlag kommen (Durchschlagfeldstärke Luft ca. 30 kV/cm)?',
    solution: '<code>E = U / d = 5000 V / 1,0 cm = 5 kV/cm</code>.<br>Da 5 kV/cm deutlich unter der Durchschlagfeldstärke von 30 kV/cm liegt, kommt es zu <strong>keinem</strong> Funkenüberschlag.'
  },
  {
    sheet: 'AB08 Entladung',
    category: 'messwerte',
    title: 'AB08: Entladestrom I(t)',
    prompt: 'Ein Kondensator entlädt sich. Warum wird die Stromstärke I mit der Zeit immer kleiner?',
    solution: 'Beim Entladen fließt Ladung Q ab. Dadurch sinkt die Kondensatorspannung <code>U = Q / C</code>. Nach dem Ohmschen Gesetz <code>I = U / R</code> sinkt mit kleiner werdender Spannung auch die Stromstärke I.'
  },
  {
    sheet: 'AB10 Coulomb',
    category: 'coulomb',
    title: 'AB10 Nr. 1: Ladungen im Vakuum',
    prompt: 'Zwei Kugeln mit Q₁ = 1,0 μC und Q₂ = 1,0 μC befinden sich im Abstand r = 10 cm. Berechne die abstoßende Kraft.',
    solution: '<code>F_C = 8,988&bull;10⁹ &bull; (10⁻⁶)&sup2; / (0,10)&sup2; = 8,988&bull;10⁻³ / 0,01 &asymp; 0,899 N</code>.'
  },
  {
    sheet: 'AB10 Coulomb',
    category: 'coulomb',
    title: 'AB10 Nr. 2: Abstandsberechnung',
    prompt: 'Zwei gleiche Ladungen Q = 25 nC stoßen sich mit F = 5,0 mN ab. Berechne den Abstand r.',
    solution: '<code>r = &radic;[ (8,988&bull;10⁹ &bull; (25&bull;10⁻⁹)&sup2;) / 0,005 ] &asymp; 0,0335 m = 3,35 cm</code>.'
  },
  {
    sheet: 'AB10 Coulomb',
    category: 'coulomb',
    title: 'AB10 Nr. 3: Berührung & Ladungsausgleich',
    prompt: 'Kugel 1 (+10 μC) und Kugel 2 (-4 μC) werden berührt und getrennt. Welche Ladung tragen sie danach?',
    solution: '<code>Q\' = (+10 &mu;C + (-4 &mu;C)) / 2 = +3 &mu;C</code> für jede Kugel.'
  },
  {
    sheet: 'AB10 Coulomb',
    category: 'coulomb',
    title: 'AB10 Nr. 5: Gravitation vs. Coulomb',
    prompt: 'Wie verhält sich die elektrische Coulombkraft zweier Elektronen zu ihrer Massenanziehung (Gravitation)?',
    solution: '<code>F_C / F_G = (k &bull; e&sup2;) / (G &bull; m_e&sup2;) &asymp; 4,17 &bull; 10⁴²</code>. Die elektrische Kraft ist um 42 Zehnerpotenzen stärker!'
  },
  {
    sheet: 'AB11 Grundbegriffe',
    category: 'efeld',
    title: 'AB11: Feldlinienverlauf an Spitzen',
    prompt: 'Warum ist das elektrische Feld an Spitzen von Leitern besonders stark (Spitzenwirkung)?',
    solution: 'Wegen der Krümmung weichen die beweglichen Ladungsträger vor der gegenseitigen Abstoßung zur Spitze hin aus. Die Ladungsdichte &sigma; = Q/A wird an Spitzen extrem hoch &rarr; extrem hohe Feldstärke <code>E = &sigma; / &epsilon;₀</code>!'
  }
];

// --- 4. STATE ENGINE FOR PHYSIK PORTAL ---
let CURRENT_PHYSIK_MODE = 'themen'; // 'themen', 'kombi', 'iserv-pool', 'spickzettel'
let CURRENT_PHYSIK_SKILL = null;
let CURRENT_ISERV_CATEGORY = 'all';

function renderPhysikPortal() {
  const gridEl = document.getElementById('themenGrid');
  if (!gridEl) return;

  gridEl.className = 'themen-stations-container';
  gridEl.style.display = 'block';

  // If a specific skill is opened, show that skill detail view
  if (CURRENT_PHYSIK_SKILL) {
    renderPhysikSkillDetail(CURRENT_PHYSIK_SKILL);
    return;
  }

  // Otherwise, render the Main Portal Dashboard
  let html = `
    <!-- Top Mode Navigation Bar -->
    <div class="physik-mode-bar">
      <button class="physik-mode-btn ${CURRENT_PHYSIK_MODE === 'themen' ? 'active' : ''}" onclick="switchPhysikMode('themen')">
        <span>📚</span><span>Die 10 Kern-Themen &amp; Fragen</span>
      </button>
      <button class="physik-mode-btn ${CURRENT_PHYSIK_MODE === 'kombi' ? 'active' : ''}" onclick="switchPhysikMode('kombi')">
        <span>🧩</span><span>Kombinations-Aufgaben (Vernetzung)</span>
      </button>
      <button class="physik-mode-btn ${CURRENT_PHYSIK_MODE === 'iserv-pool' ? 'active' : ''}" onclick="switchPhysikMode('iserv-pool')">
        <span>🎯</span><span>Aufgabenpool (AB01 - AB11)</span>
      </button>
      <button class="physik-mode-btn ${CURRENT_PHYSIK_MODE === 'spickzettel' ? 'active' : ''}" onclick="openTopic('physik', 'physik-spickzettel')">
        <span>📌</span><span>Klausur-Spickzettel</span>
      </button>
    </div>

    <!-- Live Search Bar -->
    <div class="physik-search-box">
      <span style="font-size: 1.1rem; color: var(--text-muted);">🔍</span>
      <input type="text" id="physikSearchInput" class="physik-search-input" 
             placeholder="Schnellsuche: Tippe z. B. Äquipotentiallinien, Influenz, Feldstärke, Coulomb, Messwerte..." 
             oninput="handlePhysikSearch(this.value)">
    </div>
  `;

  if (CURRENT_PHYSIK_MODE === 'themen') {
    html += `
      <div style="margin-bottom: 1rem;">
        <h3 style="font-size: 1.25rem; font-weight: 800; color: var(--text-primary); margin: 0 0 0.2rem 0;">
          📚 Die 10 Kern-Themen &amp; Fertigkeiten (Klausur Freitag)
        </h3>
        <p style="font-size: 0.85rem; color: var(--text-secondary); margin: 0;">
          Klicke auf ein beliebiges Thema, um die <strong>kurze visuelle Erklärung</strong>, <strong>Übungsaufgaben mit Lösung</strong> und dein <strong>persönliches Notizfeld</strong> zu öffnen:
        </p>
      </div>

      <div class="physik-skill-grid" id="physikSkillGrid">
    `;

    PHYSIK_SKILLS.forEach((skill, idx) => {
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
              👁️ Visuell &bull; 🎯 Übungen &bull; 📝 Notizen
            </span>
            <button class="btn-open-skill-card" style="background: ${skill.color};" onclick="event.stopPropagation(); openPhysikSkill('${skill.id}')">
              Thema lernen &rarr;
            </button>
          </div>
        </div>
      `;
    });

    html += `</div>`;
  } else if (CURRENT_PHYSIK_MODE === 'kombi') {
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
        <div class="kombi-card">
          <div class="kombi-header">
            <h4 style="font-size: 1.15rem; font-weight: 800; color: var(--text-primary); margin: 0;">
              ${kombi.title}
            </h4>
          </div>
          <div class="kombi-connected-badges">
            ${kombi.badges.map(b => `<span class="kombi-pill">🔗 ${b}</span>`).join('')}
          </div>
          <div class="task-prompt-box">
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
  } else if (CURRENT_PHYSIK_MODE === 'iserv-pool') {
    html += `
      <div style="margin-bottom: 1.2rem;">
        <h3 style="font-size: 1.25rem; font-weight: 800; color: var(--text-primary); margin: 0 0 0.2rem 0;">
          🎯 Großer Aufgabenpool aus allen IServ-Arbeitsblättern
        </h3>
        <p style="font-size: 0.85rem; color: var(--text-secondary); margin: 0;">
          Aufgaben direkt aus deinen Unterrichtsmaterialien (AB01 bis AB11):
        </p>
      </div>

      <div class="iserv-pool-filter">
        <button class="iserv-filter-pill ${CURRENT_ISERV_CATEGORY === 'all' ? 'active' : ''}" onclick="filterIservPool('all')">Alle Aufgaben (${ISERV_AUFGABEN_POOL.length})</button>
        <button class="iserv-filter-pill ${CURRENT_ISERV_CATEGORY === 'coulomb' ? 'active' : ''}" onclick="filterIservPool('coulomb')">Coulombsches Gesetz</button>
        <button class="iserv-filter-pill ${CURRENT_ISERV_CATEGORY === 'efeld' ? 'active' : ''}" onclick="filterIservPool('efeld')">Elektrisches Feld</button>
        <button class="iserv-filter-pill ${CURRENT_ISERV_CATEGORY === 'elektrostatik' ? 'active' : ''}" onclick="filterIservPool('elektrostatik')">Elektrostatik &amp; Influenz</button>
        <button class="iserv-filter-pill ${CURRENT_ISERV_CATEGORY === 'messwerte' ? 'active' : ''}" onclick="filterIservPool('messwerte')">Messwerte &amp; Linearisierung</button>
      </div>

      <div id="iservTasksContainer">
    `;

    ISERV_AUFGABEN_POOL.forEach((item, idx) => {
      const isVisible = CURRENT_ISERV_CATEGORY === 'all' || item.category === CURRENT_ISERV_CATEGORY;
      html += `
        <div class="iserv-task-card" style="display: ${isVisible ? 'block' : 'none'};">
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

  gridEl.innerHTML = html;
  renderPhysikKaTeX();
}

function switchPhysikMode(mode) {
  CURRENT_PHYSIK_MODE = mode;
  CURRENT_PHYSIK_SKILL = null;
  renderPhysikPortal();
}

function filterIservPool(cat) {
  CURRENT_ISERV_CATEGORY = cat;
  renderPhysikPortal();
}

function handlePhysikSearch(query) {
  const q = query.trim().toLowerCase();
  const cards = document.querySelectorAll('.physik-skill-card');
  cards.forEach(c => {
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

// --- 5. DETAIL-RENDERER FÜR EIN EINZELNES THEMA ---
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

  let html = `
    <div class="skill-detail-container">
      <!-- Top Navigation Bar with Back Button -->
      <div class="skill-detail-nav">
        <button class="btn-back-to-all-folders" onclick="closePhysikSkill()">
          &larr; Zur&uuml;ck zur Themen-&Uuml;bersicht
        </button>
        <div style="font-size: 0.85rem; color: var(--text-secondary);">
          Thema <strong>#${skill.num}</strong> &bull; <span style="color: ${skill.color}; font-weight: 700;">${skill.tag}</span>
        </div>
      </div>

      <!-- Skill Hero Banner -->
      <div class="skill-hero-banner" style="border-left: 6px solid ${skill.color};">
        <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 0.6rem;">
          <div class="skill-icon-badge" style="background: ${skill.color}18; border: 1px solid ${skill.color}33; font-size: 2rem; width: 54px; height: 54px;">
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
          <span>👁️</span><span>1. Visuelle Erkl&auml;rung (Kompakt auf den Punkt)</span>
        </h3>
        ${skill.visualHtml}
      </div>
  `;

  // If skill has an interactive simulator, embed it
  if (skill.hasSim === 'coulomb') {
    html += `
      <div class="sim-container">
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
  } else if (skill.hasSim === 'efeld') {
    html += `
      <div class="sim-container">
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
  } else if (skill.hasSim === 'elektrostatik') {
    html += `
      <div class="sim-container">
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
  } else if (skill.hasSim === 'schaltungen') {
    html += `
      <div class="sim-container">
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
    <div style="margin-top: 1.6rem;">
      <h3 style="font-size: 1.15rem; font-weight: 800; color: var(--text-primary); margin: 0 0 0.8rem 0; display: flex; align-items: center; gap: 0.5rem;">
        <span>🎯</span><span>2. Typische Klausur-Aufgaben zum &Uuml;ben</span>
      </h3>
  `;

  (skill.tasks || []).forEach((t, idx) => {
    html += `
      <div class="single-task-card" style="margin-bottom: 1rem;">
        <div class="task-prompt-box">
          <strong>Aufgabe ${idx + 1}:</strong><br>
          ${t.prompt}
        </div>
        <div class="task-values-grid">
          <span class="task-val-badge">Gegeben: <strong>${t.given}</strong></span>
          <span class="task-val-badge">Gesucht: <strong>${t.sought}</strong></span>
        </div>
        <button class="btn-reveal-card" onclick="toggleSolution('solSkill_${skill.id}_${idx}', this)">
          👁️ L&ouml;sungsschritte aufdecken
        </button>
        <div class="task-solution-container" id="solSkill_${skill.id}_${idx}">
          <div style="font-weight: 700; color: #10b981; margin-bottom: 0.4rem;">✓ Musterlösung:</div>
          <div style="line-height: 1.5; font-size: 0.88rem;">${t.solution}</div>
        </div>
      </div>
    `;
  });

  html += `</div>`;

  // 3. EIGENE ERKLÄRUNG / MERKZETTEL PRO THEMA
  html += `
    <div class="skill-notes-box" style="margin-top: 1.6rem;">
      <div class="skill-notes-header">
        <h3 style="font-size: 1.1rem; font-weight: 800; color: var(--text-primary); margin: 0; display: flex; align-items: center; gap: 0.5rem;">
          <span>📝</span><span>3. Deine eigene Erkl&auml;rung / Notizen zu diesem Thema</span>
        </h3>
        <span id="statusNote_${skill.id}" style="font-size: 0.76rem; color: #10b981; font-weight: 700;">Gespeichert</span>
      </div>
      <p style="font-size: 0.82rem; color: var(--text-secondary); margin-bottom: 0.8rem;">
        Schreibe hier in deinen eigenen Worten, wie du dieses Thema verstanden hast, oder notiere dir wichtige Merks&auml;tze. Speichert automatisch!
      </p>
      <textarea class="skill-notes-textarea" id="noteInput_${skill.id}" 
                placeholder="Schreibe hier deine eigene Zusammenfassung, Eselsbrücken oder Merksätze zu '${skill.title}'..."
                oninput="saveSkillNote('${skill.id}', this.value)">${savedNote}</textarea>
    </div>
  </div>
  `;

  gridEl.innerHTML = html;

  // Trigger simulations & KaTeX
  setTimeout(() => {
    if (skill.hasSim === 'coulomb') CoulombSim.init();
    if (skill.hasSim === 'efeld') EFieldSim.init();
    if (skill.hasSim === 'elektrostatik') ElectroscopeSim.init();
    if (skill.hasSim === 'schaltungen') CircuitSim.init();
    renderPhysikKaTeX();
  }, 60);
}

function saveSkillNote(skillId, val) {
  const key = 'tonda_skill_note_' + skillId;
  localStorage.setItem(key, val);

  const statusEl = document.getElementById('statusNote_' + skillId);
  if (statusEl) {
    statusEl.textContent = 'Gespeichert um ' + new Date().toLocaleTimeString();
  }
}


// --- 5. INTERAKTIVE CANVAS-SIMULATIONEN ---
// --- 1. COULOMB-SIMULATOR ---
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



// --- 6. KATEX FORMULA RENDERER & SEGMENTED TABS ENGINE ---

function renderPhysikKaTeX() {
  if (typeof katex === 'undefined') return;
  document.querySelectorAll('.katex-render').forEach(el => {
    const latex = el.getAttribute('data-latex');
    const isDisplay = el.getAttribute('data-display') !== 'false';
    if (latex) {
      try {
        katex.render(latex, el, { displayMode: isDisplay, throwOnError: false });
      } catch (e) {
        console.log('[KaTeX Render error]:', e);
      }
    }
  });
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
      if (topicId.includes('coulomb')) CoulombSim.draw();
      if (topicId.includes('efeld')) EFieldSim.draw();
      if (topicId.includes('elektrostatik')) ElectroscopeSim.draw();
      if (topicId.includes('schaltungen')) CircuitSim.draw();
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

function toggleSolution(solId, btnEl) {
  const sol = document.getElementById(solId);
  if (!sol) return;

  const isVisible = sol.classList.contains('visible');
  sol.classList.toggle('visible', !isVisible);

  if (btnEl) {
    btnEl.innerHTML = isVisible ? '👁️ L&ouml;sungsschritte aufdecken' : '🙈 L&ouml;sung verbergen';
  }

  if (!isVisible) {
    renderPhysikKaTeX();
  }
}

// Global hook to trigger simulations
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

