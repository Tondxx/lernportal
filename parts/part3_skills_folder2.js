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
