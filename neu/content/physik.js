/* ==========================================================================
   PHYSIK eA (PH12-Lh) · Stoff nach der 1. Klausur (18.09.2026) für Klausur 2 (Fr 13.11.2026)
   Quelle: IServ-Ordner „Abi28 PH12 EA“ 04 Spannung/Energie/Leistung (AB09–AB13), 05 Kondensator (AB14–AB17),
   06 Braunsche Röhre (AB20–AB23), 07 Auf-/Entladen (AB18, AB19, Infoblatt DGL), 99 Runden/Messunsicherheit.
   Alle Aufgaben sind EIGENE Aufgaben (eigene Zahlen), angelehnt an die Arbeitsblätter und an das Zentralabitur
   Niedersachsen (2025 „Kondensatoren in Blitzgeräten“, 2026 „Feuchtigkeitsmessung von Getreide“).
   Musterlösungen sind keine offiziellen Lösungsvorgaben des Landes Niedersachsen.
   Zahlen nachgerechnet: neu/tests/physik_check.py.  Demos: content/physik-demos.js.
   Lektion:  { id, fach, num, min, title, short, demo, idee, bild, rezept[], beispiel{q,steps[{h,t}]}, fehler[], test[{q,a}] }
   Aufgabe:  { id, fach, teil ('A' Grundwissen | 'B' Rechnen/Erläutern), lesson, title, afb, ops, intro, parts[{id,label,be,text,hints,sol,nums[{label,ans,tol}]}] }
   ========================================================================== */
(function () {
  const m = String.raw;
  const F = 'physik';
  const merke = (h, t) => `<div class="mt-call"><div class="mt-call-h">${h}</div>${t}</div>`;
  const achtung = (h, t) => `<div class="mt-call warn"><div class="mt-call-h">${h}</div>${t}</div>`;
  const FS = s => `<span class="fs-chip fs-in">Formelsammlung ${s}</span>`;
  const FSN = s => `<span class="fs-chip fs-no">${s || 'nicht in der Formelsammlung'}</span>`;
  // Statisches Schaltbild Laden/Entladen mit hervorgehobenem Strompfad (Lektion 14)
  const SCHALTBILD = modus => {
    const lad = modus === 'laden';
    const tri = (x, y, d) => {
      const p = { r: [[x - 5, y - 5], [x + 5, y], [x - 5, y + 5]], l: [[x + 5, y - 5], [x - 5, y], [x + 5, y + 5]], d: [[x - 5, y - 5], [x + 5, y - 5], [x, y + 5]], u: [[x - 5, y + 5], [x + 5, y + 5], [x, y - 5]] }[d];
      return `<polygon points="${p.map(q => q.join(',')).join(' ')}" style="fill:var(--info)"/>`;
    };
    const pfad = lad ? 'M40 100 V30 H110 L180 52 V80 M180 92 V210 H40 V112' : 'M180 80 V52 L250 30 V210 H180 V92';
    const pfeile = lad ? tri(75, 30, 'r') + tri(180, 195, 'd') + tri(110, 210, 'l') : tri(250, 120, 'd') + tri(215, 210, 'l') + tri(180, 192, 'u');
    const txt = 'style="fill:var(--text)" font-size="12"';
    return `<svg viewBox="0 0 330 240" style="width:100%;max-width:340px;height:auto;display:block" role="img" aria-label="${lad ? 'Schaltung beim Laden: Umschalter in Stellung 1, Strom von der Quelle über Kondensator, Widerstand und Amperemeter zurück' : 'Schaltung beim Entladen: Umschalter in Stellung 2, Quelle abgetrennt, Strom vom Kondensator über Draht, Amperemeter und Widerstand zurück zum Kondensator'}">
<path d="M40 30 V100 M40 112 V210 H250 V30 M40 30 H110 M180 52 V80 M180 92 V108 M180 142 V151 M180 173 V210 M180 70 H130 V75 M130 97 V102 H180" class="pd-wire"/>
<path d="${pfad}" style="fill:none;stroke:var(--info);stroke-width:4.5;stroke-linecap:round;stroke-linejoin:round"/>
<line x1="28" x2="52" y1="100" y2="100" class="pd-bat"/><line x1="34" x2="46" y1="112" y2="112" class="pd-bat thick"/>
<line x1="166" x2="194" y1="80" y2="80" class="pd-capl"/><line x1="166" x2="194" y1="92" y2="92" class="pd-capl"/>
<rect x="170" y="108" width="20" height="34" rx="3" class="pd-res"/>
<circle cx="180" cy="162" r="11" class="pd-res"/><circle cx="130" cy="86" r="11" class="pd-res"/>
<circle cx="110" cy="30" r="4" class="pd-node"/><circle cx="250" cy="30" r="4" class="pd-node"/><circle cx="180" cy="52" r="4" class="pd-node"/><circle cx="180" cy="70" r="3" class="pd-node"/><circle cx="180" cy="102" r="3" class="pd-node"/>
${pfeile}
<text x="180" y="166" text-anchor="middle" ${txt}>A</text><text x="130" y="90" text-anchor="middle" ${txt}>V</text>
<text x="202" y="90" ${txt}>C</text><text x="202" y="129" ${txt}>R</text>
<text x="56" y="110" ${txt}>U₀</text><text x="22" y="98" text-anchor="end" ${txt}>+</text>
<text x="110" y="16" text-anchor="middle" ${txt} ${lad ? 'font-weight="700"' : 'opacity=".55"'}>Stellung 1: Laden</text>
<text x="250" y="16" text-anchor="middle" ${txt} ${lad ? 'opacity=".55"' : 'font-weight="700"'}>Stellung 2: Entladen</text>
<text x="165" y="232" text-anchor="middle" style="fill:var(--info)" font-size="12">${lad ? 'Quelle im Stromkreis' : 'Quelle abgetrennt'}</text>
</svg>`;
  };
  // Statisches Schaltbild der Braunschen Röhre mit den drei Spannungen (Lektion 6)
  const ROEHRENBILD = () => {
    const txt = 'style="fill:var(--text)" font-size="11"';
    const dim = 'style="fill:var(--text-2)" font-size="11"';
    const mk = (x, y, n) => `<circle cx="${x}" cy="${y}" r="8" style="fill:var(--info)"/><text x="${x}" y="${y + 4}" text-anchor="middle" style="fill:#0b0d12" font-size="11" font-weight="700">${n}</text>`;
    const term = (x, y, z) => `<circle cx="${x}" cy="${y}" r="4" class="pd-res"/><text x="${x + 10}" y="${y + 4}" ${txt}>${z}</text>`;
    return `<svg viewBox="0 0 460 250" style="width:100%;max-width:560px;height:auto;display:block" role="img" aria-label="Braunsche Röhre: Glühkathode mit Heizspannung, Wehnelt-Zylinder, Ringanode mit Beschleunigungsspannung, Ablenkplatten mit Ablenkspannung, Leuchtschirm, alles im Vakuum">
<path d="M20 78 H196 L400 28 V212 L196 162 H20 Z" style="fill:none;stroke:var(--text-2);stroke-width:1.6;opacity:.7"/>
<line x1="400" x2="400" y1="28" y2="212" style="stroke:var(--text);stroke-width:5"/>
<path d="M96 96 H44 V144 H96" style="fill:none;stroke:var(--warn);stroke-width:3"/>
<path d="M52 108 l6 6 l-6 6 l6 6 l-6 6" style="fill:none;stroke:var(--bad);stroke-width:2.4"/>
<line x1="70" x2="70" y1="112" y2="128" class="pd-capl"/>
<rect x="130" y="84" width="8" height="28" style="fill:var(--info)"/><rect x="130" y="128" width="8" height="28" style="fill:var(--info)"/>
<line x1="220" x2="300" y1="92" y2="92" class="pd-capl"/><line x1="220" x2="300" y1="148" y2="148" class="pd-capl"/>
<line x1="72" x2="400" y1="120" y2="120" style="stroke:var(--warn);stroke-width:2;stroke-dasharray:5 5"/>
<path d="M300 120 Q350 120 400 150" style="fill:none;stroke:var(--warn);stroke-width:1.5;stroke-dasharray:2 4;opacity:.8"/>
<circle cx="400" cy="120" r="5" style="fill:var(--warn);opacity:.5"/>
<path d="M52 108 H12 V222 H20 M52 132 H36 V222 H28" class="pd-wire"/>
<line x1="20" x2="20" y1="212" y2="232" class="pd-bat thick" style="stroke-width:5"/><line x1="28" x2="28" y1="217" y2="227" class="pd-bat thick"/>
<path d="M56 144 V198 H88 M96 198 H134 V156" class="pd-wire"/>
<line x1="88" x2="88" y1="192" y2="204" class="pd-bat thick"/><line x1="96" x2="96" y1="186" y2="210" class="pd-bat thick" style="stroke-width:5"/>
<path d="M70 96 V62 M260 92 V40 M260 148 V214" class="pd-wire"/>
${term(70, 58, '−')}${term(260, 36, '−')}${term(260, 218, '+')}
<text x="44" y="190" ${txt}>−</text><text x="142" y="190" ${txt}>+</text>
<text x="6" y="246" ${txt}>U<tspan baseline-shift="sub" font-size="8">H</tspan> = 6,3 V</text>
<text x="92" y="226" text-anchor="middle" ${txt}>U<tspan baseline-shift="sub" font-size="8">B</tspan></text>
<text x="272" y="196" ${txt}>U<tspan baseline-shift="sub" font-size="8">A</tspan></text>
<text x="92" y="46" ${dim}>Wehnelt-Zylinder</text><text x="62" y="174" ${dim}>Glühkathode</text><text x="142" y="176" ${dim}>Ringanode</text>
<text x="272" y="80" ${dim}>Ablenkplatten</text><text x="330" y="166" ${dim}>Vakuum</text><text x="392" y="240" text-anchor="middle" ${dim}>Leuchtschirm</text>
${mk(28, 120, 1)}${mk(100, 84, 2)}${mk(164, 96, 3)}${mk(212, 108, 4)}${mk(424, 120, 5)}${mk(318, 160, 6)}
</svg>`;
  };
  const KONST = m`<p class="dim" style="font-size:14px">Konstanten: $e=1{,}602\cdot10^{-19}\,\text{C}$, $m_e=9{,}109\cdot10^{-31}\,\text{kg}$, $\varepsilon_0=8{,}854\cdot10^{-12}\,\tfrac{\text{As}}{\text{Vm}}$</p>`;

  // ======================================================================
  // LEKTIONEN
  // ======================================================================
  const LESSONS = [
    // ---------------------------------------------------------------- Ordner: Spannung, Energie, Potential
    {
      id: 'PH1', fach: F, groessen: ['Q','U','W','eV','I','P','t'], num: 1, min: 12, demo: 'p-energie', demoTitel: 'Schau zuerst: Ein Teilchen fällt durchs Feld',
      title: 'Spannung = Energie pro Ladung',
      short: 'E_el = Q·U, Elektronvolt, Leistung P = U·I, Akku-Angaben',
      idee: m`<p>Ein elektrisches Feld schiebt Ladungen an. Dabei wird Energie umgewandelt. Die <b>Spannung</b> sagt, wie viel Energie <b>pro Ladung</b> zwischen zwei Punkten frei wird (oder nötig ist).</p>
${merke('Merke' + FS('S. 24, ΔE = q·U'), m`$$U=\frac{E_\text{el}}{Q}\qquad\Longleftrightarrow\qquad E_\text{el}=Q\cdot U\qquad [U]=1\,\text{V}=1\,\tfrac{\text{J}}{\text{C}}$$`)}
<p>Für ein Elektron ($Q=e$) rechnet man gern in <b>Elektronvolt</b>: Durchläuft es 1 V, gewinnt es $1\,\text{eV}=1{,}602\cdot10^{-19}\,\text{J}$. Bei 500 V also 500 eV.</p>
<p><b>Leistung</b> ist Energie pro Zeit: $P=\dfrac{E_\text{el}}{t}=U\cdot I$. Und weil $I=\dfrac{Q}{t}$, ist $E_\text{el}=U\cdot I\cdot t$.</p>`,
      bild: m`<p>Spannung ist wie eine <b>Höhe</b>, Ladung wie die <b>Masse</b> eines Balls. Wie viel Energie frei wird, hängt von beidem ab: $E_\text{el}=Q\cdot U$ ist wie $E_\text{el}=m\cdot g\cdot h$.</p>`,
      rezept: [
        m`<b>Energie aus Spannung:</b> $E_\text{el}=Q\cdot U$. Für Elektronen: $E_\text{el}$ in eV hat denselben Zahlenwert wie $U$ in V.`,
        m`<b>eV ↔ J:</b> mal bzw. geteilt durch $1{,}602\cdot10^{-19}$.`,
        m`<b>Leistung:</b> $P=U\cdot I$, Energie $E_\text{el}=P\cdot t$ (Zeit in s, dann kommt J heraus).`,
        m`<b>Akku-Angabe „mAh“ ist eine Ladung:</b> $Q=I\cdot t$, $1\,\text{mAh}=0{,}001\,\text{A}\cdot3600\,\text{s}=3{,}6\,\text{C}$. Energie erst mit $E_\text{el}=Q\cdot U$.`
      ],
      beispiel: {
        q: m`Ein Akku trägt die Aufschrift <b>1,2 V / 2000 mAh</b>. Wie lange kann man damit eine Lampe (1,2 V / 0,40 A) betreiben, und wie viel Energie ist gespeichert?`,
        steps: [
          { h: 'mAh als Ladung lesen', t: m`$Q=2000\,\text{mA}\cdot1\,\text{h}=2{,}0\,\text{A}\cdot3600\,\text{s}=7200\,\text{C}$` },
          { h: 'Gespeicherte Energie', t: m`$E_\text{el}=Q\cdot U=7200\,\text{C}\cdot1{,}2\,\text{V}=8640\,\text{J}\approx8{,}6\,\text{kJ}$` },
          { h: 'Betriebsdauer', t: m`$t=\dfrac{Q}{I}=\dfrac{7200\,\text{C}}{0{,}40\,\text{A}}=18\,000\,\text{s}=5{,}0\,\text{h}$` },
          { h: 'Antwortsatz', t: 'Die Lampe leuchtet etwa 5 Stunden, der Akku speichert rund 8,6 kJ.' }
        ]
      },
      fehler: [
        m`„2000 mAh ist die Energie.“ Nein: mAh ist <b>Ladung</b>. Energie gibt es erst mit der Spannung: $E_\text{el}=Q\cdot U$.`,
        m`eV und J verwechseln: $1\,\text{eV}$ ist winzig ($1{,}6\cdot10^{-19}\,\text{J}$). Im Endergebnis immer die Einheit dazuschreiben.`,
        m`Spannung „an einem Punkt“: Spannung gibt es immer <b>zwischen zwei</b> Punkten. Für einen Punkt sagt man Potential (Lektion 2).`
      ],
      test: [
        { q: m`Welche Energie gewinnt ein Elektron beim Durchlaufen von 300 V?`, a: m`$300\,\text{eV}=300\cdot1{,}602\cdot10^{-19}\,\text{J}\approx4{,}8\cdot10^{-17}\,\text{J}$` },
        { q: m`Was bedeutet $1\,\text{V}$ in Energie und Ladung?`, a: m`$1\,\text{V}=1\,\text{J/C}$: Pro Coulomb Ladung wird 1 Joule umgesetzt.` },
        { q: 'Was gibt die Angabe „2500 mAh“ auf einem Akku an?', a: m`Die Ladung, die er liefern kann: $Q=2{,}5\,\text{A}\cdot3600\,\text{s}=9000\,\text{C}$.` },
        { q: m`Welche Formeln für die Leistung stehen in der Formelsammlung (S. 24)?`, a: m`$P=\dfrac{\Delta E}{\Delta t}$ (S. 18) und $P=U\cdot I$ (S. 24).` }
      ]
    },
    {
      id: 'PH2', fach: F, groessen: ['phi','U','E','x','d'], num: 2, min: 14, demo: 'p-potential', demoTitel: 'Probier es aus: die Potentialsonde',
      title: 'Potential und Äquipotentiallinien',
      short: 'φ als „Höhe“ eines Punktes, Potentialsonde, E = Δφ/Δx',
      idee: m`<p>Das <b>Potential</b> $\varphi$ ist die Energie pro Ladung <b>an einem Punkt</b>, gemessen gegenüber einem Bezugspunkt (meist die negative Platte oder die Erde, dort $\varphi=0$).</p>
${merke('Merke' + FS('S. 25'), m`$$U_{AB}=\varphi_B-\varphi_A\qquad\text{homogenes Feld: }\ \varphi(x)=E\cdot x,\quad E=\frac{U}{d}=\frac{\Delta\varphi}{\Delta x}$$`)}
<p><b>Äquipotentiallinien</b> verbinden Punkte mit gleichem $\varphi$. Entlang einer solchen Linie wird keine Arbeit verrichtet, deshalb stehen die <b>Feldlinien immer senkrecht</b> auf ihnen.</p>
<p>Die <b>Potentialsonde</b> misst $\varphi$ an einem Punkt. Im homogenen Feld steigt $\varphi$ linear mit dem Abstand von der negativen Platte.</p>`,
      bild: m`<p>Wie eine <b>Landkarte mit Höhenlinien</b>: $\varphi$ ist die Höhe, Äquipotentiallinien sind Höhenlinien, Feldlinien zeigen bergab (von + nach −). Wer auf einer Höhenlinie wandert, steigt weder auf noch ab.</p>`,
      rezept: [
        m`<b>Bezugspunkt</b> klären: Wo ist $\varphi=0$? (meist negative Platte)`,
        m`<b>Spannung</b> zwischen zwei Punkten = Differenz der Potentiale: $U_{AB}=\varphi_B-\varphi_A$.`,
        m`<b>Feldstärke</b> aus zwei Messpunkten: $E=\dfrac{\Delta\varphi}{\Delta x}$ (Abstand in m, Einheit V/m = N/C).`,
        m`<b>Randfeld:</b> zwei nahe Punkte <b>senkrecht</b> zu den Äquipotentiallinien messen, dort ist das Feld näherungsweise homogen: $E\approx\dfrac{\Delta\varphi}{\Delta s}$.`
      ],
      beispiel: {
        q: m`In einem Plattenkondensator ($d=6{,}0\,\text{cm}$, negative Platte $\varphi=0$) misst die Sonde im Abstand $x=1{,}0\,\text{cm}$ das Potential $3{,}0\,\text{V}$. Bestimme $E$, das Potential bei $4{,}0\,\text{cm}$ und die Spannung $U_0$ am Kondensator.`,
        steps: [
          { h: 'Feldstärke', t: m`$E=\dfrac{\varphi}{x}=\dfrac{3{,}0\,\text{V}}{0{,}010\,\text{m}}=300\,\tfrac{\text{V}}{\text{m}}$` },
          { h: 'Potential bei 4 cm', t: m`$\varphi=E\cdot x=300\,\tfrac{\text{V}}{\text{m}}\cdot0{,}040\,\text{m}=12\,\text{V}$` },
          { h: 'Spannung am Kondensator', t: m`$U_0=E\cdot d=300\,\tfrac{\text{V}}{\text{m}}\cdot0{,}060\,\text{m}=18\,\text{V}$` },
          { h: 'Deuten', t: m`Das $\varphi$-$x$-Diagramm ist eine Ursprungsgerade mit der Steigung $E$. Darum ist $\varphi/x$ überall gleich.` }
        ]
      },
      fehler: [
        m`cm nicht in m umgerechnet: $3\,\text{V}/1\,\text{cm}$ sind $300\,\text{V/m}$, nicht $3\,\text{V/m}$.`,
        m`Potential und Spannung verwechselt: $\varphi$ gehört zu <b>einem</b> Punkt (mit Bezugspunkt), $U$ zu <b>zwei</b> Punkten.`,
        m`Feldlinien parallel zu Äquipotentiallinien gezeichnet. Sie stehen immer <b>senkrecht</b> darauf.`
      ],
      test: [
        { q: 'Warum wird entlang einer Äquipotentiallinie keine Arbeit verrichtet?', a: m`Weil $\Delta\varphi=0$, also $E_\text{el}=Q\cdot\Delta\varphi=0$. Die Kraft steht senkrecht zur Bewegung.` },
        { q: m`$\varphi_A=4\,\text{V}$, $\varphi_B=10\,\text{V}$. Wie groß ist $U_{AB}$?`, a: m`$U_{AB}=\varphi_B-\varphi_A=6\,\text{V}$` },
        { q: m`Wie sieht das $\varphi$-$x$-Diagramm im homogenen Feld aus?`, a: m`Eine Gerade durch den Ursprung, Steigung $=E$.` },
        { q: 'Wie misst man E im Randfeld näherungsweise?', a: m`Zwei nahe Punkte senkrecht zu den Äquipotentiallinien, $E\approx\Delta\varphi/\Delta s$.` }
      ]
    },

    // ---------------------------------------------------------------- Ordner: Kondensator
    {
      id: 'PH3', fach: F, groessen: ['C', 'Q', 'U', 'A', 'd', 'eps0', 'epsr', 'E', 'sigma'], num: 3, min: 18, demo: 'p-platten', demoTitel: 'Probier es aus: Platten verschieben, Glas einschieben',
      title: 'Kapazität und Plattenkondensator',
      short: 'C = Q/U, C = ε₀·εᵣ·A/d, an der Quelle oder abgetrennt',
      idee: m`<p>Ein <b>Kondensator</b> besteht aus zwei Metallplatten, die sich nicht berühren. Schließt man eine Spannungsquelle an, schiebt sie Elektronen von der einen Platte auf die andere. Die eine Platte wird positiv ($+Q$), die andere genauso stark negativ ($-Q$). Zwischen den Platten entsteht ein elektrisches Feld.</p>
<h3>1. Kapazität: Wie viel Ladung passt drauf?</h3>
<p>Doppelte Spannung schiebt doppelt so viel Ladung auf die Platten. Ladung und Spannung sind also proportional. Der Faktor dazwischen ist die <b>Kapazität</b>:</p>
${merke('Kapazität' + FS('S. 27'), m`$$C=\frac{Q}{U}$$<p>$C$ = Kapazität in F · $Q$ = Ladung auf <b>einer</b> Platte in C · $U$ = Spannung zwischen den Platten in V.</p><p>Beispiel: $C=1\,\mu\text{F}$ heißt, pro Volt kommt $1\,\mu\text{C}$ auf die Platte.</p>`)}
<h3>2. Wovon hängt C ab? Nur vom Bau.</h3>
${merke('Plattenkondensator' + FS('S. 27'), m`$$C=\varepsilon_0\cdot\varepsilon_r\cdot\frac{A}{d}$$`)}
<ul><li><b>Größere Fläche $A$</b>: mehr Platz für Ladung, also $C$ größer.</li><li><b>Kleinerer Abstand $d$</b>: Die Ladungen auf beiden Platten ziehen sich stärker an, es passt mehr drauf, also $C$ größer.</li><li><b>Isolator zwischen den Platten</b> ($\varepsilon_r>1$, z. B. Glas): $C$ wird $\varepsilon_r$-mal so groß.</li><li>$\varepsilon_0$ ist nur eine feste Zahl aus der Formelsammlung, damit Farad herauskommt.</li></ul>
<h3>3. Das Feld zwischen den Platten</h3>
<p>Die Spannung verteilt sich gleichmäßig über den Abstand. Je kürzer der Abstand bei gleicher Spannung, desto stärker das Feld:</p>
${merke('Feldstärke' + FS('S. 25'), m`$$E=\frac{U}{d}\qquad\text{und}\qquad \sigma=\frac{Q}{A}=\varepsilon_0\,\varepsilon_r\,E$$<p>$\sigma$ (sigma) = wie dicht die Ladung auf der Platte sitzt. Dichter gepackte Ladung, stärkeres Feld.</p>`)}`,
      bild: m`<p>Die wichtigste Frage in jeder Aufgabe: <b>Hängt der Kondensator noch an der Quelle?</b></p><ul><li><b>Ja:</b> Die Quelle hält die Spannung fest. $U$ bleibt, $Q$ passt sich an ($Q=C\cdot U$).</li><li><b>Nein, abgetrennt:</b> Die Ladung kann nirgendwohin. $Q$ bleibt, $U$ passt sich an ($U=Q/C$).</li></ul><p>Probier beides oben in der Simulation aus: Abstand verdoppeln, einmal an der Quelle, einmal abgetrennt.</p>`,
      rezept: [
        m`<b>Erst alle Größen in Grundeinheiten:</b> Fläche in m² (1 cm² = $10^{-4}$ m², 20 cm × 20 cm = 0,20 m · 0,20 m), Abstand in m (1 mm = $10^{-3}$ m).`,
        m`<b>Kapazität aus dem Bau:</b> $C=\varepsilon_0\varepsilon_r\dfrac{A}{d}$. Die Spannung braucht man dafür nicht.`,
        m`<b>Fragen: An der Quelle oder abgetrennt?</b> Aufschreiben, was gleich bleibt ($U$ oder $Q$).`,
        m`<b>Den Rest</b> mit $Q=C\cdot U$ und $E=U/d$ ausrechnen. Am Ende in einem Satz sagen, was gestiegen oder gesunken ist und warum.`
      ],
      beispiel: {
        q: m`Quadratische Platten, 20 cm × 20 cm, Abstand 4,0 mm, Luft dazwischen. Der Kondensator liegt an 500 V. Berechne $C$, $Q$, $E$ und $\sigma$.`,
        steps: [
          { h: 'Gegeben und gesucht, alles in m', t: m`<p>Gegeben: Fläche, Abstand, Spannung, Luft ($\varepsilon_r=1$). Gesucht: Kapazität $C$, Ladung $Q$, Feldstärke $E$, Flächenladungsdichte $\sigma$.</p><p>$A=0{,}20\,\text{m}\cdot0{,}20\,\text{m}=0{,}040\,\text{m}^2$, $\quad d=4{,}0\,\text{mm}=0{,}0040\,\text{m}$</p>` },
          { h: 'Kapazität: nur der Bau zählt', t: m`<p>Für $C$ brauchen wir Fläche, Abstand und Material. Die 500 V spielen hier keine Rolle.</p><p>$C=\varepsilon_0\varepsilon_r\dfrac{A}{d}=8{,}854\cdot10^{-12}\cdot1\cdot\dfrac{0{,}040}{0{,}0040}\,\text{F}=8{,}85\cdot10^{-11}\,\text{F}=88{,}5\,\text{pF}$</p><p>Ein Luftkondensator hat also nur einige Pikofarad.</p>` },
          { h: 'Ladung: jetzt kommt die Spannung dazu', t: m`<p>Aus $C=\dfrac QU$ wird nach $Q$ umgestellt $Q=C\cdot U$:</p><p>$Q=8{,}85\cdot10^{-11}\,\text{F}\cdot500\,\text{V}=4{,}43\cdot10^{-8}\,\text{C}$</p><p>So viel sitzt auf jeder Platte, auf der einen $+$, auf der anderen $-$.</p>` },
          { h: 'Feldstärke: Spannung pro Abstand', t: m`<p>500 V verteilen sich auf 4 mm: $E=\dfrac Ud=\dfrac{500\,\text{V}}{0{,}0040\,\text{m}}=1{,}25\cdot10^{5}\,\tfrac{\text{V}}{\text{m}}$</p>` },
          { h: 'Flächenladungsdichte und Kontrolle', t: m`<p>Ladung pro Fläche: $\sigma=\dfrac QA=\dfrac{4{,}43\cdot10^{-8}\,\text{C}}{0{,}040\,\text{m}^2}=1{,}11\cdot10^{-6}\,\tfrac{\text{C}}{\text{m}^2}$</p><p>Kontrolle mit $\sigma=\varepsilon_0E=8{,}854\cdot10^{-12}\cdot1{,}25\cdot10^5=1{,}11\cdot10^{-6}$. Passt.</p>` }
        ]
      },
      extraAfter: m`<p><b>Abstand verdoppeln: was passiert?</b> (Das kommt fast immer dran.)</p><table><tr><th></th><th>an der Quelle</th><th>abgetrennt</th></tr><tr><td>bleibt gleich</td><td>$U$</td><td>$Q$</td></tr><tr><td>$C=\varepsilon_0\varepsilon_r\frac Ad$</td><td>halbiert</td><td>halbiert</td></tr><tr><td>$Q$</td><td>halbiert ($Q=CU$, Ladung fließt zurück zur Quelle)</td><td>bleibt</td></tr><tr><td>$U$</td><td>bleibt</td><td>verdoppelt ($U=Q/C$)</td></tr><tr><td>$E$</td><td>halbiert ($E=U/d$)</td><td>bleibt ($E=\sigma/\varepsilon_0$, Ladung pro Fläche gleich)</td></tr></table>`,
      fehler: [
        m`mm und cm² nicht umgerechnet. Das ist der häufigste Fehler beim Plattenkondensator (Faktor 1000 oder 10 000 daneben).`,
        m`Beim Auseinanderziehen eines <b>abgetrennten</b> Kondensators angenommen, $U$ bleibe gleich. Richtig: $Q$ bleibt, $C$ sinkt, also steigt $U$. $E=\sigma/\varepsilon_0$ bleibt gleich.`,
        m`„$C$ hängt von $U$ ab.“ Nein: $C$ hängt nur vom Bau ab ($A$, $d$, $\varepsilon_r$). Doppelte Spannung ergibt doppelte Ladung, $C$ bleibt.`
      ],
      test: [
        { q: m`Was bedeutet $C=\dfrac QU$ in Worten?`, a: 'Kapazität = wie viel Ladung pro Volt Spannung auf die Platten passt.' },
        { q: m`Suche in der Formelsammlung (S. 27) die Formel für die Kapazität eines Plattenkondensators. Was macht jede Größe?`, a: m`$C=\varepsilon_0\varepsilon_r\dfrac Ad$: größere Fläche $A$ und kleinerer Abstand $d$ machen $C$ größer, ein Isolator mit $\varepsilon_r$ macht $C$ $\varepsilon_r$-mal so groß.` },
        { q: 'Abgetrennter Kondensator, Abstand verdoppelt: Was passiert mit Q, C, U, E?', a: m`$Q$ bleibt, $C$ halbiert, $U$ verdoppelt, $E$ bleibt gleich.` },
        { q: 'An der Quelle, Glasplatte eingeschoben: Was passiert mit Q?', a: m`$C$ steigt um den Faktor $\varepsilon_r$, $U$ bleibt, also steigt $Q=C\cdot U$ um $\varepsilon_r$.` }
      ]
    },
    {
      id: 'PH4', fach: F, groessen: ['W', 'C', 'U', 'Q', 'P', 't'], num: 4, min: 12, demo: 'p-energiec', demoTitel: 'Schau zu: Laden, Paket für Paket',
      title: 'Energie im Kondensator',
      short: 'E_el = ½·C·U², Fläche im U-Q-Diagramm, Blitzgerät',
      idee: m`<p>Ein geladener Kondensator speichert Energie. Woher kommt sie? Beim Laden muss die Quelle jede Ladung auf die Platte schieben, und zwar <b>gegen</b> die Spannung, die schon da ist.</p>
<ul><li>Das <b>erste</b> bisschen Ladung geht ganz leicht, denn der Kondensator ist noch leer (Spannung 0).</li><li>Das <b>letzte</b> bisschen muss gegen die volle Spannung $U$ geschoben werden.</li><li>Im Mittel zählt also nur die <b>halbe</b> Endspannung: $E_\text{el}=Q\cdot\dfrac{U}{2}$.</li></ul>
${merke('Energie im Kondensator' + FS('S. 27, E = ½·C·U²') + FSN('Form mit Q: selbst umformen'), m`$$E_\text{el}=\tfrac12\,Q\cdot U=\tfrac12\,C\cdot U^2$$<p>$E_\text{el}$ = gespeicherte Energie in J · $C$ = Kapazität in F · $U$ = Spannung am Kondensator in V. Die zweite Form entsteht, wenn man $Q=C\cdot U$ einsetzt.</p>`)}
<p>Im $U$-$Q$-Diagramm (oben in der Animation) ist $E_\text{el}$ die <b>Dreiecksfläche</b> unter der Geraden: Grundseite $Q$, Höhe $U$, Fläche $\tfrac12QU$.</p>
<p>Wegen $U^2$ gilt: doppelte Spannung, <b>vierfache</b> Energie.</p>
<p>Ein Kondensator kann seine Energie sehr schnell abgeben. Dann ist die <b>Leistung</b> $P=\dfrac{E_\text{el}}{t}$ riesig (Blitzgerät, Defibrillator).</p>`,
      bild: m`<p>Wie ein Wasserturm, der von unten befüllt wird: Die ersten Liter sind leicht hochzupumpen, die letzten müssen gegen den vollen Wasserdruck. Im Mittel zählt nur die halbe Endhöhe, darum das $\tfrac12$.</p>`,
      rezept: [
        m`$C$ in F umrechnen (µF: mal $10^{-6}$), $U$ in V.`,
        m`Energie: $E_\text{el}=\tfrac12CU^2$. Erst $U^2$ ausrechnen, dann mal $C$, dann halbieren. Ergebnis in J.`,
        m`Leistung beim Entladen: $P=\dfrac{E_\text{el}}{t}$, nur den genutzten Anteil nehmen (z. B. 20 % Licht: $0{,}20\cdot E_\text{el}$).`,
        m`Gesucht $C$ für eine bestimmte Energie? Umstellen: $C=\dfrac{2W}{U^2}$.`
      ],
      beispiel: {
        q: m`Ein Blitzgerät-Kondensator ($200\,\mu\text{F}$) wird auf $320\,\text{V}$ geladen und entlädt sich in $2{,}0\,\text{ms}$. Wie viel Energie ist gespeichert, und welche Leistung gibt er im Mittel ab?`,
        steps: [
          { h: 'Gegeben und gesucht', t: m`<p>$C=200\,\mu\text{F}=200\cdot10^{-6}\,\text{F}=2{,}00\cdot10^{-4}\,\text{F}$, $U=320\,\text{V}$, $t=2{,}0\,\text{ms}=0{,}0020\,\text{s}$. Gesucht: Energie $E_\text{el}$ und mittlere Leistung $P$.</p>` },
          { h: 'Energie', t: m`<p>Wir kennen $C$ und $U$, also passt $E_\text{el}=\tfrac12CU^2$:</p><p>$E_\text{el}=\tfrac12\cdot2{,}00\cdot10^{-4}\,\text{F}\cdot(320\,\text{V})^2=\tfrac12\cdot2{,}00\cdot10^{-4}\cdot102\,400\,\text{J}=10{,}24\,\text{J}$</p>` },
          { h: 'Mittlere Leistung', t: m`<p>Leistung ist Energie pro Zeit. Die ganzen 10 J werden in 2 ms abgegeben:</p><p>$P=\dfrac{E_\text{el}}{t}=\dfrac{10{,}24\,\text{J}}{0{,}0020\,\text{s}}=5120\,\text{W}\approx5{,}1\,\text{kW}$</p>` },
          { h: 'Deuten', t: 'Die Energie ist klein (etwa so viel, wie man braucht, um 1 kg einen Meter hochzuheben), aber sie kommt in 2 ms. Deshalb die riesige Leistung von über 5 kW. Genau dafür nimmt man einen Kondensator: langsam laden, schlagartig entladen.' }
        ]
      },
      fehler: [
        m`$E_\text{el}=Q\cdot U$ statt $\tfrac12QU$ benutzt. Das $\tfrac12$ kommt daher, dass die Spannung beim Laden erst von 0 an wächst.`,
        m`µF nicht umgerechnet: $200\,\mu\text{F}=2{,}00\cdot10^{-4}\,\text{F}$.`,
        m`$U^2$ vergessen: doppelte Spannung → vierfache Energie.`
      ],
      test: [
        { q: 'Welche Formel für die Energie im Kondensator steht in der Formelsammlung (S. 27), und wie kommst du auf die anderen Formen?', a: m`In der Formelsammlung steht $E=\tfrac12CU^2$ (S. 27). Mit $Q=CU$ folgt daraus $E_\text{el}=\tfrac12QU=\dfrac{Q^2}{2C}$.` },
        { q: m`Warum steht dort $\tfrac12$?`, a: 'Beim Laden wächst die Spannung von 0 an mit. Im Mittel muss jede Ladung nur gegen die halbe Endspannung geschoben werden (Dreiecksfläche im U-Q-Diagramm).' },
        { q: 'Spannung verdreifacht. Energie?', a: 'Neunmal so groß (E_el ∼ U²).' }
      ]
    },
    {
      id: 'PH5', fach: F, groessen: ['C','Q','U'], num: 5, min: 10, demo: 'p-schaltung', demoTitel: 'Probier es aus: parallel oder in Reihe',
      title: 'Kondensatoren schalten',
      short: 'Parallel: C addieren. Reihe: 1/C addieren. Vergleich mit Widerständen',
      idee: m`<p><b>Parallel</b> liegt an allen Kondensatoren dieselbe Spannung, die Ladungen addieren sich: wie eine größere Plattenfläche. <b>In Reihe</b> tragen alle dieselbe Ladung (die Mittelstücke sind zusammen neutral), die Spannungen addieren sich: wie ein größerer Plattenabstand.</p>
${merke('Merke' + FS('S. 27'), m`$$\text{parallel: } C=C_1+C_2\qquad\text{Reihe: }\frac1C=\frac1{C_1}+\frac1{C_2}$$`)}
<p><b>Genau andersherum als bei Widerständen</b> (Reihe: $R=R_1+R_2$). Gemeinsame Größe in Reihe: bei Widerständen $I$, bei Kondensatoren $Q$.</p>`,
      bild: m`<p>Parallel = zwei Eimer nebeneinander, beide gleich hoch befüllt. Reihe = gleiche Ladung, die Spannung teilt sich auf; der kleinere Kondensator bekommt die <b>größere</b> Teilspannung.</p>`,
      rezept: [
        m`Schaltart erkennen: gemeinsame Spannung → parallel, gemeinsame Ladung → Reihe.`,
        m`Gesamtkapazität berechnen (in Reihe: Kehrwert am Ende nicht vergessen).`,
        m`$Q_{\text{ges}}=C\cdot U$, dann Teilgrößen: parallel $Q_i=C_iU$, Reihe $U_i=Q/C_i$.`
      ],
      beispiel: {
        q: m`Aus mehreren $60\,\mu\text{F}$-Kondensatoren sollen $90\,\mu\text{F}$, $30\,\mu\text{F}$ und $20\,\mu\text{F}$ entstehen.`,
        steps: [
          { h: '30 µF', t: m`Zwei in Reihe: $\dfrac1C=\dfrac1{60}+\dfrac1{60}=\dfrac1{30}$, also $30\,\mu\text{F}$.` },
          { h: '20 µF', t: m`Drei in Reihe: $\dfrac1C=\dfrac3{60}$, also $20\,\mu\text{F}$.` },
          { h: '90 µF', t: m`Einer parallel zu zwei in Reihe: $60+30=90\,\mu\text{F}$.` }
        ]
      },
      fehler: [
        m`Reihe wie bei Widerständen addiert. Bei Kondensatoren addiert man in Reihe die <b>Kehrwerte</b>.`,
        m`In Reihe den Kehrwert am Ende nicht gebildet: $\tfrac1C=\tfrac1{30}$ heißt $C=30$, nicht $\tfrac1{30}$.`,
        'In Reihe angenommen, jeder Kondensator habe die volle Spannung. Die Spannungen teilen sich auf.'
      ],
      test: [
        { q: 'Was ist bei Reihenschaltung von Kondensatoren für alle gleich?', a: m`Die Ladung $Q$.` },
        { q: m`$C_1=C_2=10\,\mu\text{F}$ in Reihe?`, a: m`$5\,\mu\text{F}$` },
        { q: 'Welcher von zwei Kondensatoren in Reihe bekommt die größere Spannung?', a: m`Der mit der kleineren Kapazität ($U_i=Q/C_i$).` }
      ]
    },

    // ---------------------------------------------------------------- Ordner: Braunsche Röhre
    {
      id: 'PH6', fach: F, groessen: ['UB', 'e', 'me', 'v0'], num: 6, min: 12, demo: 'p-roehre', demoTitel: 'Schau zuerst: die Röhre in Betrieb',
      title: 'Braunsche Röhre: Elektronen erzeugen und beschleunigen',
      short: 'Aufbau mit U_H, U_B, U_A (sechs Klausurpunkte), Wehnelt-Zylinder, e·U_B = ½·m·v²',
      idee: m`<p>Die Braunsche Röhre macht aus einem Draht einen gebündelten, schnellen Elektronenstrahl. Mit ihr kann man Spannungsverläufe sichtbar machen (Oszilloskop) oder ein Fernsehbild Zeile für Zeile schreiben. <b>Das Funktionsprinzip (sechs Punkte) ist Klausurstoff</b>, die Nummern im Bild gehören zu den Punkten:</p>
${ROEHRENBILD()}
<ol><li><b>Glühkathode:</b> Aus einer geheizten Kathode treten durch den <b>glühelektrischen Effekt</b> (Glühemission) Elektronen aus. Kalt tritt fast nichts aus. Die Heizung ist ein eigener Stromkreis mit der <b>Heizspannung $U_H$</b> (hier 6,3 V).</li><li><b>Wehnelt-Zylinder:</b> Ein Metallbecher um die Kathode, der sich <b>gegenüber der Kathode auf negativem Potential</b> befindet. Er stößt die Elektronen ab und <b>fokussiert</b> sie dadurch in der Mitte.</li><li><b>Beschleunigung:</b> Ein starkes elektrisches Feld zwischen Kathode (−) und <b>Ringanode</b> (+), erzeugt von der <b>Beschleunigungsspannung $U_B$</b>, beschleunigt die Elektronen, bevor sie durch das Loch der Anode austreten.</li><li><b>Ablenkung:</b> Mit <b>Kondensatorplatten</b> (oder Spulen) lässt sich der Strahl ablenken. Am Plattenpaar liegt die <b>Ablenkspannung $U_A$</b>.</li><li><b>Leuchtschirm:</b> Die Elektronen fliegen geradeaus bis zum Schirm und regen den Leuchtstoff am Auftreffpunkt zum Leuchten an.</li><li><b>Vakuum:</b> Die ganze Anordnung ist eine Vakuumröhre, damit die Elektronen nicht mit Gasmolekülen der Luft zusammenstoßen und der Strahl nicht abgeschwächt wird.</li></ol>
<h3>Die drei Spannungen und ihre drei Stromkreise</h3>
<table><tr><th>Spannung</th><th>Wo?</th><th>Wozu?</th></tr>
<tr><td>Heizspannung $U_H$ (6,3 V)</td><td>an der Glühwendel (Heizkreis)</td><td>heizt die Kathode, damit Elektronen austreten</td></tr>
<tr><td>Beschleunigungsspannung $U_B$ (kV)</td><td>Kathode (−) und Ringanode (+)</td><td>gibt den Elektronen die Geschwindigkeit $v_0$</td></tr>
<tr><td>Ablenkspannung $U_A$ (einige hundert V)</td><td>zwischen den Ablenkplatten</td><td>lenkt den Strahl zur positiven Platte ab (Lektion 7)</td></tr></table>
<p>Der <b>Heizkreis</b> und der <b>Beschleunigungskreis</b> sind zwei getrennte Stromkreise. Die Ablenkspannung wirkt erst <b>nach</b> der Beschleunigung und ändert $v_0$ nicht.</p>
<h3>Wie schnell werden die Elektronen?</h3>
<p>Energieerhaltung: Die elektrische Energie, die das Elektron beim Durchlaufen von $U_B$ bekommt ($E_\text{el}=e\cdot U_B$, siehe Lektion 1), wird komplett zu Bewegungsenergie ($\tfrac12mv^2$):</p>
${merke('Energieerhaltung' + FS('Ansatz: S. 17 und S. 24') + FSN('v₀-Formel: herleiten'), m`$$e\cdot U_B=\tfrac12\,m_e\,v_0^2\qquad\Longrightarrow\qquad v_0=\sqrt{\frac{2\,e\,U_B}{m_e}}$$<p>Umstellen: mal 2, durch $m_e$, dann Wurzel ziehen.</p>`)}`,
      bild: m`<p>Wie eine Kugel, die eine Rampe hinunterrollt: Die Höhe ($U_B$) bestimmt die Endgeschwindigkeit. Wegen der Wurzel gilt: vierfache Höhe ergibt nur doppelte Geschwindigkeit ($v_0\sim\sqrt{U_B}$).</p>`,
      rezept: [
        m`Ansatz hinschreiben (gibt Punkte!): $e\,U_B=\tfrac12m_ev_0^2$.`,
        m`Nach $v_0$ umstellen: $v_0=\sqrt{2eU_B/m_e}$. $e$ und $m_e$ stehen in der Formelsammlung.`,
        m`Rückwärts, gesucht $U_B$: $U_B=\dfrac{m_ev_0^2}{2e}$.`,
        'Funktion beschreiben (sechs Punkte): 1 Glühkathode (Heizspannung U_H, Elektronen treten aus) → 2 Wehnelt-Zylinder (negativ gegen die Kathode, fokussiert) → 3 Ringanode (Beschleunigungsspannung U_B) → 4 Ablenkplatten (Ablenkspannung U_A) → 5 Leuchtschirm; 6 alles im Vakuum.'
      ],
      beispiel: {
        q: m`Elektronen werden mit $U_B=1{,}5\,\text{kV}$ beschleunigt. Berechne ihre Geschwindigkeit.`,
        steps: [
          { h: 'Gegeben und gesucht', t: m`<p>$U_B=1{,}5\,\text{kV}=1500\,\text{V}$, aus der Formelsammlung $e=1{,}602\cdot10^{-19}\,\text{C}$ und $m_e=9{,}109\cdot10^{-31}\,\text{kg}$. Gesucht: $v_0$.</p>` },
          { h: 'Ansatz: Energie bleibt erhalten', t: m`<p>Die elektrische Energie wird ganz zu Bewegungsenergie: $e\,U_B=\tfrac12m_ev_0^2$. Umgestellt: $v_0=\sqrt{\dfrac{2eU_B}{m_e}}$.</p>` },
          { h: 'Einsetzen', t: m`<p>$v_0=\sqrt{\dfrac{2\cdot1{,}602\cdot10^{-19}\,\text{C}\cdot1500\,\text{V}}{9{,}109\cdot10^{-31}\,\text{kg}}}=\sqrt{5{,}28\cdot10^{14}}\,\tfrac{\text{m}}{\text{s}}=2{,}30\cdot10^{7}\,\tfrac{\text{m}}{\text{s}}$</p><p>Tipp für den Taschenrechner: erst den Bruch ausrechnen, dann die Wurzel.</p>` },
          { h: 'Einordnen', t: m`Das sind 23 000 km pro Sekunde, etwa 8 % der Lichtgeschwindigkeit. Für so „langsame“ Elektronen reicht die normale Formel.` }
        ]
      },
      extraAfter: m`<p><b>So wird es im Unterricht aufgeschrieben:</b> Formel hinschreiben, dann jede Umformung mit der Rechenoperation rechts. Genau so wird in der Klausur „Gleichung herleiten“ bewertet.</p>
<p>$$\begin{aligned}E_{kin}&=E_{el}\\\tfrac12\,m\,v^2&=q\cdot U\qquad&&\big|\cdot2\\m\,v^2&=2\,q\,U&&\big|:m\\v^2&=\dfrac{2\,q\,U}{m}&&\big|\sqrt{\ }\\v&=\sqrt{\dfrac{2\,q\,U}{m}}\end{aligned}$$</p>
<p>Einsetzen für $U_B=3{,}6\,\text{kV}$ (Zahlen immer mit Einheit, $q=e$): $v=\sqrt{\dfrac{2\cdot1{,}602\cdot10^{-19}\,\text{C}\cdot3600\,\text{V}}{9{,}109\cdot10^{-31}\,\text{kg}}}=3{,}56\cdot10^{7}\,\tfrac{\text{m}}{\text{s}}$</p>
<p><b>Aufbau und Verschaltung (wird gefragt):</b> siehe Bild und Tabelle oben. Merke: drei Spannungen, drei Aufgaben. $U_H$ heizt, $U_B$ beschleunigt, $U_A$ lenkt ab.</p>`,
      fehler: [
        m`$v\sim U_B$ angenommen. Richtig ist $v\sim\sqrt{U_B}$.`,
        'Glühelektrischer Effekt mit Photoeffekt verwechselt: Hier liefert die Heizung die Energie, nicht Licht.',
        'Vergessen zu sagen, warum Vakuum nötig ist (sonst Stöße mit Gasmolekülen, Strahl wird gestreut und abgeschwächt).'
      ],
      test: [
        { q: 'Warum braucht die Braunsche Röhre eine Heizung?', a: 'Glühelektrischer Effekt: Nur aus heißem Metall treten genügend Elektronen aus.' },
        { q: m`Woher kommt die Formel $v_0=\sqrt{2eU_B/m_e}$?`, a: m`Energieerhaltung: elektrische Energie $eU_B$ = Bewegungsenergie $\tfrac12m_ev_0^2$, nach $v_0$ umgestellt.` },
        { q: 'Warum fließt in einer Glühdiode nur in einer Richtung Strom?', a: 'Nur die geheizte Elektrode gibt Elektronen ab. Ist die Gegenelektrode negativ, werden sie zurückgedrängt.' },
        { q: 'Wozu dient der Wehnelt-Zylinder?', a: 'Er ist negativ gegenüber der Kathode, stößt die Elektronen ab und fokussiert den Elektronenstrahl in der Mitte.' },
        { q: 'Nenne die drei Spannungen der Braunschen Röhre und was jede macht.', a: m`$U_H$ (Heizspannung, 6,3 V) heizt die Kathode, $U_B$ (Beschleunigungsspannung) beschleunigt die Elektronen zwischen Kathode und Ringanode, $U_A$ (Ablenkspannung) lenkt den Strahl an den Platten ab.` },
        { q: 'Zähle die sechs Punkte des Funktionsprinzips auf.', a: 'Glühemission an der geheizten Kathode, Wehnelt-Zylinder fokussiert, Beschleunigung zwischen Kathode und Anode (durch das Loch), Ablenkung durch Kondensatorplatten (oder Spulen), Leuchtschirm leuchtet am Auftreffpunkt, alles im Vakuum.' }
      ]
    },
    {
      id: 'PH7', fach: F, groessen: ['UB', 'UAbl', 'd', 'l', 'v0', 'a', 'x', 'y', 'alpha', 'L', 'Y'], num: 7, min: 20, demo: 'p-ablenkung', demoTitel: 'Probier es aus: Strahl ablenken',
      title: 'Ablenkung im Querfeld',
      short: 'Parabelbahn wie beim waagerechten Wurf, y = U_A·x²/(4·d·U_B)',
      idee: m`${achtung('Zusatz: wird in Klausur 2 nicht verlangt', m`<p>Die Lehrkraft hat gesagt: <b>Die Ablenkung muss nicht berechnet werden.</b> Diese Lektion ist deshalb nur noch Zusatzstoff (zum Verstehen der Parabelbahn, für die Herleitung der Bahngleichung in Lektion 12 und für spätere Klausuren). Sie ist nicht mehr im Lernplan.</p>`)}<p>Das Elektron kommt mit der Geschwindigkeit $v_0$ (aus Lektion 6) waagerecht zwischen zwei Platten. An den Platten liegt die <b>Ablenkspannung $U_A$</b> (nicht verwechseln mit der Beschleunigungsspannung $U_B$), oben $-$, unten $+$. Das Feld zieht das Elektron zur positiven Platte, also nach unten. Im Unterricht zeigt die $y$-Achse deshalb nach unten, $s_x$ ist der Weg waagerecht und $s_y$ die Ablenkung (hier schreiben wir kurz $x$ und $y$). Wir bauen die Bahn in vier Schritten zusammen.</p>
<h3>Schritt 1: Waagerecht passiert nichts Neues</h3>
<p>Das Feld zieht nur senkrecht, also gibt es waagerecht keine Kraft. Das Elektron fliegt waagerecht gleichmäßig weiter:</p>
${merke('waagerecht' + FS('S. 15'), m`$$x=v_0\cdot t$$<p>$x$ = wie weit es schon in den Platten ist, $t$ = Zeit seit dem Eintritt.</p>`)}
<h3>Schritt 2: Senkrecht wirkt eine konstante Kraft</h3>
<p>Im Plattenkondensator ist das Feld überall gleich ($E=U_A/d$), also auch die Kraft $F=e\cdot E=\dfrac{e\,U_A}{d}$. Konstante Kraft heißt konstante Beschleunigung $a=\dfrac{F}{m_e}$, und dafür gilt wie beim freien Fall:</p>
${merke('senkrecht' + FS('y = ½at²: S. 15') + FSN('a = e·U_A/(m·d): herleiten'), m`$$a=\frac{e\,U_A}{m_e\,d}\qquad y=\tfrac12\,a\,t^2$$`)}
<h3>Schritt 3: Zusammensetzen (Bahngleichung)</h3>
<p>Wir wollen $y$ abhängig vom Ort $x$, nicht von der Zeit. Also Schritt 1 nach der Zeit umstellen, $t=\dfrac{x}{v_0}$, und in Schritt 2 einsetzen:</p>
${merke('Bahn im Kondensator: eine Parabel' + FSN('herleiten'), m`$$y(x)=\frac12\cdot\frac{e\,U_A}{m_e\,d}\cdot\frac{x^2}{v_0^2}$$<p>Setzt man noch $v_0^2=\dfrac{2eU_B}{m_e}$ ein, kürzen sich $e$ und $m_e$ weg:</p>$$y(x)=\frac{U_A\,x^2}{4\,d\,U_B}$$`)}
<h3>Schritt 4: Hinter den Platten geht es geradeaus</h3>
<p>Am Plattenende ($x=l$) hört die Kraft auf. Das Elektron fliegt schräg geradeaus weiter, mit dem Winkel $\alpha$: $\tan\alpha=\dfrac{v_y}{v_0}=\dfrac{U_A\,l}{2\,d\,U_B}$. Auf dem Schirm im Abstand $L$ kommt es bei $Y=y(l)+L\cdot\tan\alpha$ an.</p>`,
      bild: m`<p>Genau wie ein Ball, der waagerecht vom Tisch rollt: vorwärts konstant schnell, nach unten immer schneller. Statt der Schwerkraft zieht hier die elektrische Kraft. In der Animation zeigt „Bewegung zerlegen“ beide Bewegungen einzeln.</p>
${achtung('Wichtig fürs Erläutern', m`<p>In $y=\dfrac{Ux^2}{4dU_B}$ kommt $e/m_e$ nicht mehr vor. Wer nur $U_B$, $U_A$, $d$ und die Ablenkung misst, kann damit <b>nicht</b> die spezifische Ladung $e/m_e$ bestimmen.</p>`)}`,
      rezept: [
        m`$v_0$ aus der Beschleunigung: $v_0=\sqrt{2eU_B/m_e}$.`,
        m`Zeit zwischen den Platten: Strecke durch Geschwindigkeit, $t=\dfrac{l}{v_0}$. Beschleunigung: $a=\dfrac{eU_A}{m_ed}$.`,
        m`Ablenkung am Plattenende: $y=\tfrac12at^2$, oder direkt $y=\dfrac{U_Al^2}{4dU_B}$. Prüfen: Ist $y$ kleiner als $d/2$? Sonst trifft das Elektron die Platte.`,
        m`Auftreffpunkt: $\tan\alpha=\dfrac{U_Al}{2dU_B}$, dann $Y=y+L\cdot\tan\alpha$.`
      ],
      beispiel: {
        q: m`$U_B=1000\,\text{V}$, Ablenkspannung $U_A=200\,\text{V}$, Plattenabstand $d=4{,}0\,\text{cm}$, Plattenlänge $l=8{,}0\,\text{cm}$, Schirm $L=20\,\text{cm}$ hinter den Platten. Wo trifft der Strahl auf?`,
        steps: [
          { h: 'Gegeben und gesucht, alles in m', t: m`<p>$U_B=1000\,\text{V}$ (beschleunigt), $U_A=200\,\text{V}$ (lenkt ab), $d=0{,}040\,\text{m}$, $l=0{,}080\,\text{m}$, $L=0{,}20\,\text{m}$. Gesucht: Auftreffpunkt $Y$.</p>` },
          { h: 'Ablenkung am Plattenende', t: m`<p>Die Formel ohne $e$ und $m_e$ spart Rechnung. Wir setzen $x=l$ ein (Ende der Platten):</p><p>$y=\dfrac{U_A\,l^2}{4\,d\,U_B}=\dfrac{200\cdot0{,}080^2}{4\cdot0{,}040\cdot1000}\,\text{m}=\dfrac{1{,}28}{160}\,\text{m}=0{,}0080\,\text{m}=8{,}0\,\text{mm}$</p><p>Kontrolle: Die Platte ist $d/2=20\,\text{mm}$ von der Mitte entfernt, $8\,\text{mm}$ ist weniger. Das Elektron kommt durch.</p>` },
          { h: 'Austrittswinkel', t: m`<p>Wie schräg fliegt es heraus? $\tan\alpha=\dfrac{U_A\,l}{2\,d\,U_B}=\dfrac{200\cdot0{,}080}{2\cdot0{,}040\cdot1000}=0{,}20$, also $\alpha=11{,}3^\circ$.</p>` },
          { h: 'Gerade bis zum Schirm', t: m`<p>Auf $L=200\,\text{mm}$ steigt die Gerade um $L\cdot\tan\alpha=200\,\text{mm}\cdot0{,}20=40\,\text{mm}$. Dazu kommen die $8\,\text{mm}$ aus den Platten:</p><p>$Y=8{,}0\,\text{mm}+40\,\text{mm}=48\,\text{mm}=4{,}8\,\text{cm}$ über der Schirmmitte.</p>` }
        ]
      },
      extraAfter: m`<p><b>Die Herleitung so, wie sie im Unterricht aufgeschrieben wird</b> (zwei Bewegungen getrennt, jede Umformung mit Operation rechts):</p>
<p><b>$x$-Richtung (gleichförmig):</b> $$\begin{aligned}s_x&=v\cdot t&&\big|:v\\t&=\dfrac{s_x}{v}\end{aligned}$$</p>
<p><b>$y$-Richtung (gleichmäßig beschleunigt):</b> $$\begin{aligned}F&=m\cdot a&&\big|:m\\a&=\dfrac{F}{m}=\dfrac{E\cdot e}{m}=\dfrac{U_A\,e}{d\,m}\end{aligned}$$</p>
<p><b>Zusammensetzen:</b> $$\begin{aligned}s_y&=\tfrac12\,a\,t^2=\tfrac12\cdot\dfrac{U_A\,e}{d\,m}\cdot\left(\dfrac{s_x}{v}\right)^2&&\big|\ v^2=\dfrac{2\,e\,U_B}{m}\ \text{einsetzen}\\s_y&=\tfrac12\cdot\dfrac{U_A\,e}{d\,m}\cdot s_x^2\cdot\dfrac{m}{2\,e\,U_B}&&\big|\ e,\ m\ \text{kürzen}\\s_y&=\dfrac{U_A}{4\,d\,U_B}\cdot s_x^2\end{aligned}$$</p>
<p><b>Bis zum Leuchtschirm:</b> Hinter den Platten fliegt das Elektron <b>tangential</b> weiter. Die Steigung der Parabel im Punkt $x=l$ ist $s_y'(l)=\dfrac{U_A\,l}{2\,d\,U_B}$. Bei dem Abstand $b$ bis zum Schirm kommt $s_{y2}=s_y'(l)\cdot b=\dfrac{U_A\,l\,b}{2\,d\,U_B}$ dazu, insgesamt $Y=s_y(l)+s_{y2}$.</p>
<p>Herleitung der Abi-2006-Art (Elektron trifft gerade den Plattenrand, $s_y=\tfrac d2$): $\tfrac d2=\dfrac{U_C}{4\,d\,U_B}x^2\ \Rightarrow\ U_B=\dfrac{U_C}{2\,d^2}\,x^2$.</p>
<h3>Das ganze Beispiel wie im Unterricht (alle Teilschritte)</h3>
<p>Gegeben: $U_B=3{,}6\,\text{kV}$, $U_A=700\,\text{V}$, $d=5{,}4\,\text{cm}$, Plattenlänge $l=10\,\text{cm}$. Gesucht: Zeit im Kondensator, Beschleunigung, Ablenkung, Gesamtgeschwindigkeit am Plattenende.</p>
<p><b>1) Geschwindigkeit beim Eintritt</b> (Ansatz $E_\text{kin}=E_\text{el}$, siehe Lektion 6): $v_0=\sqrt{\dfrac{2\cdot1{,}602\cdot10^{-19}\,\text{C}\cdot3600\,\text{V}}{9{,}109\cdot10^{-31}\,\text{kg}}}=3{,}56\cdot10^{7}\,\tfrac{\text{m}}{\text{s}}$</p>
<p><b>2a) Zeit im Kondensator</b> (waagerecht gleichförmig, $s_x=l$): $$\begin{aligned}s_x&=v_0\cdot t&&\big|:v_0\\t&=\dfrac{s_x}{v_0}=\dfrac{0{,}10\,\text{m}}{3{,}56\cdot10^{7}\,\text{m/s}}=2{,}81\cdot10^{-9}\,\text{s}\end{aligned}$$</p>
<p><b>2b) Beschleunigung in $y$-Richtung:</b> $$\begin{aligned}F&=m_e\cdot a&&\big|:m_e\\a&=\dfrac{F}{m_e}=\dfrac{E\cdot e}{m_e}=\dfrac{U_A\,e}{d\,m_e}\\a&=\dfrac{700\,\text{V}\cdot1{,}602\cdot10^{-19}\,\text{C}}{0{,}054\,\text{m}\cdot9{,}109\cdot10^{-31}\,\text{kg}}=2{,}28\cdot10^{15}\,\tfrac{\text{m}}{\text{s}^2}\end{aligned}$$ Einheitenprobe: $\dfrac{\text{V}\cdot\text{C}}{\text{m}\cdot\text{kg}}=\dfrac{\text{J}}{\text{m}\cdot\text{kg}}=\dfrac{\text{N}\cdot\text{m}}{\text{m}\cdot\text{kg}}=\dfrac{\text{m}}{\text{s}^2}$ ✓</p>
<p><b>2c) Ablenkung am Plattenende:</b> $$\begin{aligned}s_y&=\tfrac12\,a\,t^2=\tfrac12\cdot2{,}28\cdot10^{15}\,\tfrac{\text{m}}{\text{s}^2}\cdot\left(2{,}81\cdot10^{-9}\,\text{s}\right)^2=9{,}0\cdot10^{-3}\,\text{m}=9{,}0\,\text{mm}\end{aligned}$$ Gleiches Ergebnis mit der fertigen Bahngleichung: $s_y=\dfrac{U_A}{4\,d\,U_B}\cdot s_x^2=\dfrac{700\,\text{V}}{4\cdot0{,}054\,\text{m}\cdot3600\,\text{V}}\cdot(0{,}10\,\text{m})^2=9{,}0\cdot10^{-3}\,\text{m}$. Kontrolle: $\tfrac d2=27\,\text{mm}$ ist mehr als $9\,\text{mm}$, das Elektron trifft die Platte nicht.</p>
<p><b>2d) Gesamtgeschwindigkeit am Plattenende:</b> Die senkrechte Geschwindigkeit ist $v_y=a\cdot t=2{,}28\cdot10^{15}\,\tfrac{\text{m}}{\text{s}^2}\cdot2{,}81\cdot10^{-9}\,\text{s}=6{,}41\cdot10^{6}\,\tfrac{\text{m}}{\text{s}}$. Die beiden Geschwindigkeiten stehen senkrecht aufeinander, also Vektoraddition mit Pythagoras: $$v_\text{ges}=\sqrt{v_0^2+v_y^2}=\sqrt{\left(3{,}56\cdot10^{7}\right)^2+\left(6{,}41\cdot10^{6}\right)^2}\,\tfrac{\text{m}}{\text{s}}=3{,}62\cdot10^{7}\,\tfrac{\text{m}}{\text{s}}$$ Der Winkel gegen die Waagerechte: $\tan\alpha=\dfrac{v_y}{v_0}=0{,}180$, also $\alpha=10{,}2^\circ$.</p>`,
      fehler: [
        'Hinter den Platten weiter mit der Parabel gerechnet. Dort wirkt keine Kraft mehr: Gerade.',
        m`Die waagerechte Geschwindigkeit ändert sich nicht. $v_0$ bleibt, nur $v_y$ kommt hinzu.`,
        m`Vergessen zu prüfen, ob $y<d/2$ ist. Sonst trifft das Elektron die Platte.`,
        m`$U_A$ und $U_B$ verwechselt: $U_B$ beschleunigt (steht im Nenner), $U_A$ lenkt ab (steht im Zähler).`
      ],
      test: [
        { q: 'Welche Bewegungen überlagern sich im Querfeld?', a: 'Waagerecht gleichförmig (keine Kraft), senkrecht gleichmäßig beschleunigt (konstante Feldkraft), wie beim waagerechten Wurf.' },
        { q: 'Wie kommt man von x = v₀t und y = ½at² zur Bahngleichung?', a: m`$t=x/v_0$ in $y=\tfrac12at^2$ einsetzen: $y=\tfrac12a\dfrac{x^2}{v_0^2}$ mit $a=\dfrac{eU_A}{m_ed}$.` },
        { q: m`Beschleunigungsspannung verdoppelt. Ablenkung am Plattenende?`, a: m`Halbiert, weil $y\sim\dfrac1{U_B}$ (schnellere Elektronen sind kürzer im Feld).` },
        { q: m`Warum kann man mit diesem Aufbau $e/m$ nicht bestimmen?`, a: m`$e/m$ kürzt sich heraus, wenn man $v_0^2=2eU_B/m$ einsetzt.` }
      ]
    },

    // ---------------------------------------------------------------- Schaltung zum Laden und Entladen (12.11.)
    {
      id: 'PH14', fach: F, groessen: ['U0', 'I0', 'RC', 'UC', 'R', 'C', 'I'], num: 14, min: 12, demo: 'p-rc', demoTitel: 'Schau zu: Umschalter umlegen',
      title: 'Die Schaltung: Laden und Entladen aufbauen',
      short: 'Was U₀ und I₀ bedeuten, Seite 27 lesen, Bauteile, Umschalter, Messgeräte, was zum Entladen nötig ist',
      idee: m`<p>Im Versuch „Entladung eines Kondensators“ wird ein Kondensator erst aufgeladen und dann <b>über einen Widerstand entladen</b>. In der Klausur kann stehen: „Zeichne die Schaltung“, „Beschreibe den Versuch“ oder „Erkläre, wie der Kondensator entladen wird“. Hier ist die Schaltung, Bauteil für Bauteil.</p>
<h3>Erst die zwei Buchstaben: $U_0$ und $I_0$</h3>
<p>Die kleine <b>0</b> heißt immer „am Anfang“ bzw. „Startwert“. Als Beispiel nehmen wir ein 12-V-Netzteil, $R=10\,\text{k}\Omega$ und $C=470\,\mu\text{F}$.</p>
<table><tr><th>Zeichen</th><th>Was ist das?</th><th>Beispiel</th></tr>
<tr><td>$U_0$</td><td><b>Spannung der Quelle</b> (Batterie, Netzteil). Beim Laden ist es die Spannung, auf die der Kondensator am Ende kommt. Beim Entladen ist es die Spannung am Kondensator im Moment des Umschaltens (er wurde ja vorher auf die Quellenspannung geladen).</td><td>$U_0=12\,\text{V}$</td></tr>
<tr><td>$I_0$</td><td><b>Strom im allerersten Moment</b> ($t=0$). Das ist gleichzeitig der größte Strom des ganzen Vorgangs, danach wird er immer kleiner.</td><td>$I_0=\dfrac{U_0}{R}=\dfrac{12\,\text{V}}{10\,000\,\Omega}=1{,}2\,\text{mA}$</td></tr>
<tr><td>$R\cdot C$</td><td><b>Produkt aus Widerstand und Kapazität.</b> Es steht in der Formel im Exponenten (S. 27) und hat die Einheit einer Zeit. Je größer, desto langsamer läuft alles.</td><td>$10\,000\,\Omega\cdot470\cdot10^{-6}\,\text{F}=4{,}7\,\text{s}$</td></tr></table>
<h4>Warum ist $I_0=U_0/R$?</h4>
<p>Im ersten Moment des Ladens ist der Kondensator leer, also $U_C=0$. Dann liegt die ganze Quellenspannung am Widerstand (Maschenregel $U_0=U_R+U_C$ ${FS('S. 24')}, mehr in Lektion 8). Aus $R=\dfrac UI$ ${FS('S. 23')} wird, nach $I$ umgestellt ($\big|\cdot I$, dann $\big|:R$), $I_0=\dfrac{U_0}{R}$. Beim Entladen ist es genauso: Der volle Kondensator drückt $U_0$ durch den Widerstand, also wieder $I_0=\dfrac{U_0}{R}$, nur in die <b>Gegenrichtung</b>. Deshalb steht in der Formelsammlung beim Entladen $-I_0$.</p>
<h4>Wie schnell läuft der Vorgang?</h4>
<p>Das sagt das Produkt $R\cdot C$ aus dem Exponenten. Setzt du genau $t=R\cdot C$ in die Formel ein, steht dort $e^{-1}=0{,}37$. Also:</p>
<ul><li><b>Entladen:</b> Nach $t=R\cdot C=4{,}7\,\text{s}$ ist noch $0{,}37$ übrig: $U_C=0{,}37\cdot12\,\text{V}=4{,}4\,\text{V}$, der Strom ist auf $0{,}37\cdot1{,}2\,\text{mA}=0{,}44\,\text{mA}$ gefallen.</li><li><b>Laden:</b> $1-e^{-1}=0{,}63$ ist geschafft: $U_C=0{,}63\cdot12\,\text{V}=7{,}6\,\text{V}$.</li><li>Nach dem Fünffachen, also nach $23{,}5\,\text{s}$, ist praktisch alles vorbei.</li></ul>
<p><b>Warum steht $R\cdot C$ im Exponenten?</b> Großer Widerstand: wenig Strom, die Ladung kommt langsam. Großer Kondensator: Es muss mehr Ladung fließen, bis er voll ist. Beides macht es langsamer. Einheit: $1\,\Omega\cdot1\,\text{F}=\dfrac{\text{V}}{\text{A}}\cdot\dfrac{\text{A}\,\text{s}}{\text{V}}=1\,\text{s}$. Wie du daraus eine Zeit oder eine Spannung ausrechnest, steht in Lektion 8 und 9.</p>
<h3>Wo steht das in der Formelsammlung?</h3>
<table><tr><th>Was</th><th>Wo</th></tr>
<tr><td>Schaltbild (Quelle, Umschalter, $C$, $R$, Messgeräte)</td><td><b>Steht nicht drin.</b> Du musst es zeichnen können, dafür ist diese Lektion.</td></tr>
<tr><td>$U_C(t)$, $I(t)$, $Q(t)$ für <b>Aufladen</b> und <b>Entladen</b></td><td><b>S. 27</b>, Kasten „Aufladen und Entladen eines Kondensators über einen Ohm'schen Widerstand“ (Elektrizitätslehre und Magnetismus, Kondensator). Links oben Aufladen, darunter Entladen.</td></tr>
<tr><td>Was $U_0$, $I_0$, $Q_0$ bedeuten</td><td>S. 27, <b>rechts neben</b> den Formeln: „$U_0$: Quellenspannung beim Aufladen bzw. Spannung am Kondensator zu Beginn des Entladevorgangs“ und „$I_0$: Stromstärke zu Beginn des Auf- bzw. Entladevorgangs“.</td></tr>
<tr><td>Die beiden Differenzialgleichungen</td><td>S. 27, die zwei Kästen darunter (nur zum Verstehen, Lektion 9)</td></tr>
<tr><td>$C=\dfrac QU$ und $E=\tfrac12CU^2$</td><td>S. 27, oberste Kästen</td></tr>
<tr><td>$R=\dfrac UI$ (daraus $I_0$), $Q=\int I\,dt$</td><td>S. 23</td></tr>
<tr><td>$I_0=\dfrac{U_0}{R}$ als fertige Formel</td><td><b>Steht nicht drin.</b> $I_0$ rechnest du aus $R=\dfrac UI$ (S. 23) selbst aus. Das Produkt $R\cdot C$ steht in der Formel im Exponenten.</td></tr></table>
<p><b>Beim Lesen von S. 27 aufpassen:</b> Der Strom heißt dort $I(t)=I_0\cdot e^{-t/(R\cdot C)}$ (Laden) und $I(t)=-I_0\cdot e^{-t/(R\cdot C)}$ (Entladen). Den Wert $I_0=\dfrac{U_0}{R}$ musst du selbst einsetzen. Beim Entladen fallen $U_C$, $I$ und $Q$ alle mit demselben Faktor $e^{-t/(R\cdot C)}$ ab.</p>
<h3>Die Bauteile</h3>
<table><tr><th>Bauteil</th><th>Wozu?</th><th>Wie angeschlossen?</th></tr>
<tr><td>Spannungsquelle $U_0$</td><td>liefert die Spannung zum Laden</td><td>langer Strich = Pluspol</td></tr>
<tr><td>Umschalter</td><td>legt den Kondensator entweder an die Quelle (Laden) oder an einen Draht <b>ohne</b> Quelle (Entladen)</td><td>oben in der Schaltung</td></tr>
<tr><td>Kondensator $C$</td><td>speichert die Ladung</td><td>im Zweig mit dem Widerstand</td></tr>
<tr><td>Widerstand $R$</td><td>begrenzt den Strom und bestimmt das Tempo ($R\cdot C$)</td><td>in <b>Reihe</b> zum Kondensator</td></tr>
<tr><td>Amperemeter A</td><td>misst die Stromstärke $I$</td><td>immer in <b>Reihe</b> (der Strom muss hindurch)</td></tr>
<tr><td>Voltmeter V</td><td>misst die Kondensatorspannung $U_C$</td><td>immer <b>parallel</b> zum Kondensator (zieht fast keinen Strom)</td></tr></table>
<h3>Die zwei Stellungen des Umschalters</h3>
<div style="display:flex;flex-wrap:wrap;gap:20px;align-items:flex-start;margin:12px 0">
<figure style="margin:0;flex:1 1 260px">${SCHALTBILD('laden')}<figcaption class="dim" style="font-size:14px">Stellung 1: Der blaue Weg ist der Strom (technische Stromrichtung, von Plus nach Minus).</figcaption></figure>
<figure style="margin:0;flex:1 1 260px">${SCHALTBILD('entladen')}<figcaption class="dim" style="font-size:14px">Stellung 2: Die Quelle ist abgetrennt. Der Strom fließt durch Widerstand und Amperemeter in die <b>Gegenrichtung</b>.</figcaption></figure>
</div>
<p><b>Laden (Stellung 1):</b> Pluspol → Umschalter → obere Kondensatorplatte, von der unteren Platte → Widerstand → Amperemeter → Minuspol. Auf der oberen Platte sammelt sich positive, auf der unteren negative Ladung. Zwischen den Platten fließt kein Strom (dort ist Isolator), die Ladung wird nur „verschoben“.</p>
<p><b>Entladen (Stellung 2):</b> Der Umschalter trennt die Quelle ab und schließt stattdessen einen Draht. Jetzt ist der geladene Kondensator selbst die „Quelle“: Von der positiven (oberen) Platte → Umschalter → Draht → Amperemeter → Widerstand → untere Platte. Die Ladungen gleichen sich über den Widerstand aus, bis keine Spannung mehr da ist.</p>
${merke('Was braucht man zum Entladen?', m`<p>Zwei Dinge: <b>(1)</b> die Quelle abtrennen und <b>(2)</b> die beiden Platten <b>leitend verbinden</b>, also einen <b>geschlossenen Stromkreis ohne Quelle</b> herstellen. Der Widerstand $R$ in diesem Kreis sorgt dafür, dass der Strom nicht zu groß wird und man den Vorgang messen kann.</p>`)}
<table><tr><th></th><th>Laden</th><th>Entladen</th></tr>
<tr><td>Quelle im Stromkreis?</td><td>ja</td><td>nein</td></tr>
<tr><td>Spannung $U_C$</td><td>steigt von $0$ auf $U_0$</td><td>fällt von $U_0$ auf $0$</td></tr>
<tr><td>Stromstärke $I$</td><td>startet bei $\dfrac{U_0}{R}$, geht gegen 0</td><td>startet bei $-\dfrac{U_0}{R}$ (Gegenrichtung), geht gegen 0</td></tr>
<tr><td>Energie</td><td>Quelle liefert $QU_0$: eine Hälfte steckt danach als $E_\text{el}=\tfrac12CU_0^2$ im Kondensator, die andere wird im Widerstand zu Wärme</td><td>die gespeicherte $E_\text{el}$ wird im Widerstand zu Wärme (in der Blitzröhre zu Licht)</td></tr></table>
<h3>Warum ein Widerstand?</h3>
<ul><li><b>Großer Widerstand:</b> Es fließt wenig Strom, der Vorgang dauert lange und man kann ihn ablesen (im Versuch: Strom alle 5 s).</li><li><b>Kein Widerstand (nur Draht):</b> Der Strom wäre riesig und kurz, es gibt einen Funken. Das nutzt man beim Blitzgerät absichtlich: Der Kondensator entlädt sich in etwa einer Tausendstel Sekunde über die Blitzröhre.</li><li>Der Widerstand ändert nur das <b>Tempo</b> ($R\cdot C$), nicht die Ladung: Es fließt immer die ganze Ladung $Q_0=C\cdot U_0$ ab.</li><li>Steht der Umschalter dazwischen (offen), bleibt die Ladung auf dem Kondensator (idealisiert).</li></ul>
<h3>Messen im Versuch</h3>
<p>Aufladen, Umschalter umlegen, alle 5 s die Stromstärke ablesen. Die <b>Fläche unter der $I(t)$-Kurve</b> ist die Ladung $Q=\int I\,dt$ ${FS('S. 23')}, also die Ladung, die der Kondensator gespeichert hatte (mehr dazu in Lektion 9).</p>
<p class="dim">Mehrere Kondensatoren gleichzeitig (Parallel- und Reihenschaltung, Lektion 5) stehen nicht auf der Themenliste. Im Unterricht kamen sie nur am Rande vor (Superkondensatoren in Reihe für höhere Spannungen, Blitzgerät mit zwei Kondensatoren).</p>`,
      bild: m`<p>Ein Wassertank ($C$), der über einen Schlauch ($R$) gefüllt wird: Die Pumpe ist die Quelle. Der Umschalter ist der Hahn: In Stellung 1 verbindet er den Tank mit der Pumpe, in Stellung 2 mit dem Abfluss. Ohne Abfluss (offener Kreis) bleibt das Wasser im Tank. Ein dünner Schlauch (großes $R$) macht es nur langsamer, die Wassermenge im Tank bleibt gleich.</p>`,
      rezept: [
        m`<b>Kreis zeichnen:</b> Quelle, Umschalter, Kondensator und Widerstand so, dass in Stellung 1 die Quelle im Kreis liegt.`,
        m`<b>Stellung 2:</b> Der Umschalter führt auf einen Draht, der den Kreis um Kondensator und Widerstand <b>ohne Quelle</b> schließt.`,
        m`<b>Messgeräte:</b> Amperemeter in Reihe (in den Zweig mit $C$ und $R$), Voltmeter parallel zum Kondensator.`,
        m`<b>Strompfad:</b> für beide Stellungen einzeichnen. Beim Entladen zeigt der Pfeil durch den Widerstand in die Gegenrichtung.`
      ],
      beispiel: {
        q: m`Beschreibe, wie $C=470\,\mu\text{F}$ mit $U_0=12\,\text{V}$ über $R=10\,\text{k}\Omega$ geladen und danach entladen wird und wie du $U_C$ und $I$ misst. Welche Werte erwartest du?`,
        steps: [
          { h: 'Aufbau', t: m`<p>Quelle ($12\,\text{V}$), Umschalter, Kondensator, Widerstand und Amperemeter in einem Zweig hintereinander. Das Voltmeter liegt parallel zum Kondensator.</p>` },
          { h: 'Laden: Stellung 1', t: m`<p>Die Quelle liegt im Kreis. Anfangsstrom $I_0=\dfrac{U_0}{R}=\dfrac{12\,\text{V}}{10\,000\,\Omega}=1{,}2\,\text{mA}$. Das Produkt im Exponenten: $R\cdot C=10\,000\,\Omega\cdot470\cdot10^{-6}\,\text{F}=4{,}7\,\text{s}$. Nach etwa $5\cdot4{,}7\,\text{s}=23{,}5\,\text{s}$ ist der Kondensator voll.</p>` },
          { h: 'Entladen: Stellung 2', t: m`<p>Umschalter umlegen: Die Quelle ist abgetrennt, der Kondensator entlädt sich über $R$. $U_C$ startet bei $12\,\text{V}$ und fällt auf 0, der Strom startet bei $-1{,}2\,\text{mA}$ (Gegenrichtung) und geht gegen 0, wieder in etwa $23{,}5\,\text{s}$.</p>` },
          { h: 'Gespeicherte Ladung', t: m`<p>$Q_0=C\cdot U_0=470\cdot10^{-6}\,\text{F}\cdot12\,\text{V}=5{,}64\cdot10^{-3}\,\text{C}=5{,}64\,\text{mC}$. Das ist auch die Fläche unter der $I(t)$-Kurve beim Entladen.</p>` },
          { h: 'Was ändert sich mit größerem R?', t: m`<p>Mit $R=20\,\text{k}\Omega$: $R\cdot C=9{,}4\,\text{s}$ und $I_0=0{,}6\,\text{mA}$. Es dauert doppelt so lang, aber $Q_0$ bleibt $5{,}64\,\text{mC}$.</p>` }
        ]
      },
      fehler: [
        'Amperemeter parallel oder Voltmeter in Reihe eingezeichnet. Richtig: Amperemeter in Reihe, Voltmeter parallel zum Kondensator.',
        'Beim Entladen die Quelle im Kreis gelassen. Zum Entladen muss die Quelle abgetrennt sein.',
        'Quelle abgetrennt, aber die Platten nicht verbunden: Dann kann nichts abfließen, der Kondensator bleibt geladen.',
        'Den Entladestrom in dieselbe Richtung wie den Ladestrom eingezeichnet. Beim Entladen fließt der Strom durch den Widerstand in die Gegenrichtung.',
        'Gedacht, ein größerer Widerstand verändert die Ladung. Er verändert nur die Zeit.'
      ],
      test: [
        { q: 'Was muss man tun, damit der geladene Kondensator entladen wird?', a: 'Die Quelle abtrennen und die beiden Platten leitend verbinden (am besten über einen Widerstand), also einen geschlossenen Stromkreis ohne Quelle herstellen.' },
        { q: m`Wo kommen Amperemeter und Voltmeter hin, wenn $I$ und $U_C$ gemessen werden?`, a: 'Das Amperemeter in Reihe zu Kondensator und Widerstand, das Voltmeter parallel zum Kondensator.' },
        { q: 'Wie ist der Entladestrom gerichtet im Vergleich zum Ladestrom?', a: m`In die Gegenrichtung. Deshalb steht in der Formel ein Minus: $I(t)=-\dfrac{U_0}{R}e^{-t/(R\cdot C)}$.` },
        { q: m`Was passiert beim Entladen, wenn $R$ verdoppelt wird?`, a: m`Das Produkt $R\cdot C$ im Exponenten verdoppelt sich, alles läuft doppelt so langsam, der Anfangsstrom halbiert sich. Die abfließende Ladung $Q_0=C\,U_0$ bleibt gleich.` },
        { q: m`Was bedeuten $U_0$ und $I_0$? Wie berechnest du $I_0$?`, a: m`$U_0$: Quellenspannung (beim Entladen: Spannung zu Beginn). $I_0$: Strom im ersten Moment, $I_0=U_0/R$ (nicht in der Formelsammlung, aus $R=U/I$, S. 23).` },
        { q: 'Welche Formeln zum Auf- und Entladen stehen in der Formelsammlung, und was musst du selbst ergänzen?', a: m`S. 27: $U_C(t)$, $I(t)$, $Q(t)$ für Laden und Entladen mit $e^{-t/(R\cdot C)}$. Selbst: $I_0=U_0/R$ und das Schaltbild.` },
        { q: 'Warum entlädt man nicht ohne Widerstand?', a: 'Der Strom wäre sehr groß und kurz (Funke, Bauteile können Schaden nehmen), und man könnte den Vorgang nicht messen. Beim Blitzgerät ist das gewollt.' }
      ]
    },
    // ---------------------------------------------------------------- Ordner: Auf- und Entladen
    {
      id: 'PH8', fach: F, groessen: ['U0', 'UC', 'UR', 'R', 'C', 'I', 'I0', 'RC', 'th', 'euler'], num: 8, min: 18, demo: 'p-rc', demoTitel: 'Schau zuerst: Laden und Entladen live',
      title: 'Auf- und Entladen: die Kurven',
      short: 'Maschenregel, Formeln von S. 27, Spannung zu einer Zeit, Zeit zu einer Spannung mit solve, Halbwertszeit',
      idee: m`<p>Ein Kondensator wird über einen Widerstand $R$ an eine Quelle mit der Spannung $U_0$ gelegt. Was passiert Schritt für Schritt?</p>
<ol><li><b>Einschalten:</b> Der Kondensator ist leer, $U_C=0$. Die ganze Spannung liegt am Widerstand. Es fließt der größte Strom: $I_0=\dfrac{U_0}{R}$. (Der leere Kondensator wirkt wie ein Kurzschluss.)</li><li><b>Ladung kommt an:</b> Der Kondensator bekommt eine Spannung $U_C$. Für den Widerstand bleibt nur noch der Rest: $U_R=U_0-U_C$. Also wird der Strom kleiner.</li><li><b>Je voller, desto langsamer:</b> Kleinerer Strom heißt, es kommt langsamer Ladung nach. Der Kondensator nähert sich $U_0$ immer langsamer an.</li><li><b>Voll:</b> $U_C=U_0$, für den Widerstand bleibt nichts, kein Strom mehr. (Der volle Kondensator wirkt wie eine Unterbrechung.)</li></ol>
<p>„Je mehr schon da ist, desto langsamer geht es weiter“: Genau so ein Verlauf ist eine <b>e-Funktion</b>.</p>
<h3>Die Maschenregel (S. 24): das ist der Grund hinter den Kurven</h3>
${merke('Maschenregel' + FS('S. 24'), m`$$\sum U_i=0$$<p>Läufst du einmal im Kreis herum (eine <b>Masche</b>), ergeben alle Spannungen zusammen null. Anders gesagt: <b>Was die Quelle hineinsteckt, wird von den Bauteilen verbraucht.</b></p>`)}
<table><tr><th></th><th>Maschenregel</th><th>Was daraus folgt</th></tr>
<tr><td><b>Laden</b> (Quelle im Kreis)</td><td>$U_0=U_R+U_C$</td><td>Die Quellenspannung <b>teilt sich auf</b>. Am Anfang ist $U_C=0$, also $U_R=U_0$ und $I_0=\dfrac{U_0}{R}$. Am Ende ist $U_C=U_0$, also $U_R=0$ und kein Strom mehr.</td></tr>
<tr><td><b>Entladen</b> (keine Quelle)</td><td>$U_C+U_R=0$, also $U_R=-U_C$</td><td>Der Kondensator wirkt wie die Quelle. Am Anfang liegt <b>die ganze Spannung $U_0$ am Widerstand</b> (dem Betrag nach), sie sinkt mit $U_C$. Das Minus kommt von der Umlaufrichtung.</td></tr>
<tr><td><b>Strom</b></td><td>$I=\dfrac{U_R}{R}$</td><td>Aus der Maschenregel folgt $U_R$, daraus mit $R=\dfrac UI$ (S. 23) der Strom. Beim Laden: $I=\dfrac{U_0-U_C}{R}$.</td></tr>
<tr><td><b>Differenzialgleichung</b></td><td>$U_0=R\,I+\dfrac QC$</td><td>Das ist die Maschenregel mit $U_R=R\,I$ und $U_C=\dfrac QC$. Ableiten ($\dot Q=I$) führt auf die Gleichung von S. 27 (Aufgabe PL6).</td></tr></table>
<p><b>So wendest du sie an:</b></p>
<ol><li>Eine Masche und eine Umlaufrichtung wählen (hier: Quelle bzw. Kondensator, Widerstand, zurück).</li><li>Jede Spannung hinschreiben: Quelle $U_0$, Widerstand $U_R=R\cdot I$, Kondensator $U_C=\dfrac QC$.</li><li>„Quelle = Verbraucher“ (oder Summe gleich 0) ansetzen und nach dem Gesuchten umstellen.</li></ol>
${achtung('Laden und Entladen nicht verwechseln', m`<p>Beim <b>Laden</b> teilen sich $U_R$ und $U_C$ die Spannung $U_0$ (<b>Summe</b>). Beim <b>Entladen</b> gibt es keine Quelle: Dort sind $U_R$ und $U_C$ dem Betrag nach <b>gleich</b>, und am Anfang liegt $U_0$ am Widerstand.</p>`)}
<h3>Die Formeln (AB 18)</h3>
${merke('Laden' + FS('S. 27'), m`$$U_C(t)=U_0\,\bigl(1-e^{-t/(R\cdot C)}\bigr)\qquad I(t)=\frac{U_0}{R}\,e^{-t/(R\cdot C)}$$`)}
${merke('Entladen' + FS('S. 27'), m`$$U_C(t)=U_0\,e^{-t/(R\cdot C)}\qquad I(t)=-\frac{U_0}{R}\,e^{-t/(R\cdot C)}$$<p>Minus: Der Strom fließt beim Entladen in die andere Richtung.</p>`)}
<p class="dim">In der Formelsammlung (S. 27) steht der Strom als $I(t)=\pm I_0\cdot e^{-t/(R\cdot C)}$. Dabei ist $I_0=\dfrac{U_0}{R}$ der Strom im ersten Moment (mehr dazu in Lektion 14).</p>
<p>So liest du $e^{-t/(R\cdot C)}$: Das ist der <b>Anteil, der noch übrig ist</b>. Bei $t=0$ ist der Exponent 0 und $e^0=1$ (100 %). Je größer $t$, desto kleiner wird $e^{-t/(R\cdot C)}$, bis fast 0. Beim Laden ist $1-e^{-t/(R\cdot C)}$ der Anteil, der <b>schon geschafft</b> ist.</p>
<ul><li><b>Wie schnell?</b> Im Exponenten steht $R\cdot C$ (Einheit s). Je größer $R$ oder $C$, desto langsamer.</li><li><b>Spannung zu einer Zeit:</b> $t$ einsetzen und mit dem Rechner ausrechnen.</li><li><b>Zeit zu einer Spannung:</b> Gleichung mit den Zahlen aufschreiben und mit <code>solve(…, t)</code> nach $t$ lösen (Lektion 9).</li><li><b>Halbwertszeit</b> $t_h=R\cdot C\cdot\ln2$: In dieser Zeit halbiert sich der Strom (bzw. der Rest). Herleitung in Lektion 12.</li></ul>`,
      bild: m`<p>Wie eine Badewanne, die über einen dünnen Schlauch abläuft: Am Anfang drückt viel Wasser, es fließt schnell. Je leerer, desto langsamer. Der Widerstand ist der Schlauch, die Kapazität die Größe der Wanne. Beides zusammen bestimmt, wie schnell es geht.</p>`,
      rezept: [
        m`<b>Werte in Ω, F und V:</b> kΩ und µF erst umrechnen ($10\,\text{k}\Omega=10\,000\,\Omega$, $470\,\mu\text{F}=0{,}000470\,\text{F}$).`,
        m`Laden oder Entladen? Die passende Formel aufschreiben. Faustregel: Steigt die Größe, steht $(1-e^{-t/(R\cdot C)})$ da; fällt sie, nur $e^{-t/(R\cdot C)}$.`,
        m`<b>Spannung zu einer Zeit:</b> $t$, $R$, $C$ einsetzen und mit dem Rechner ausrechnen (erst den Exponenten, dann $e^x$).`,
        m`<b>Zeit zu einer Spannung:</b> Gleichung mit den Zahlen aufschreiben, im Rechner <code>solve(Gleichung, t)</code> (Lektion 9).`
      ],
      beispiel: {
        q: m`$C=470\,\mu\text{F}$ wird über $R=10\,\text{k}\Omega$ an $U_0=12\,\text{V}$ geladen (anfangs leer). Berechne $I_0$, $U_C$ und $I$ nach $5{,}0\,\text{s}$ sowie die Zeit, nach der $U_C=10\,\text{V}$ erreicht ist.`,
        steps: [
          { h: 'Gegeben und gesucht', t: m`<p>$C=470\cdot10^{-6}\,\text{F}$, $R=10\,000\,\Omega$, $U_0=12\,\text{V}$, Laden. Gesucht: $I_0$, $U_C(5\,\text{s})$, $I(5\,\text{s})$ und $t$ für $U_C=10\,\text{V}$.</p>` },
          { h: 'Das Produkt im Exponenten', t: m`<p>$R\cdot C=10\,000\,\Omega\cdot470\cdot10^{-6}\,\text{F}=4{,}7\,\text{s}$. Diese Zahl steht in der Formel unter dem Bruchstrich.</p>` },
          { h: 'Anfangsstrom', t: m`<p>Im ersten Moment ist der Kondensator leer, die ganzen 12 V liegen am Widerstand:</p><p>$I_0=\dfrac{U_0}{R}=\dfrac{12\,\text{V}}{10\,000\,\Omega}=0{,}0012\,\text{A}=1{,}2\,\text{mA}$</p>` },
          { h: 'Spannung nach 5 s', t: m`<p>Laden, also $U_C=U_0\,\bigl(1-e^{-t/(R\cdot C)}\bigr)$ ${FS('S. 27')}. Einsetzen:</p><p>$U_C=12\,\text{V}\cdot\bigl(1-e^{-5{,}0/4{,}7}\bigr)=12\,\text{V}\cdot(1-0{,}345)=7{,}86\,\text{V}$</p>` },
          { h: 'Strom nach 5 s', t: m`<p>Der Strom ist auf denselben Anteil $0{,}345$ gefallen: $I=1{,}2\,\text{mA}\cdot0{,}345=0{,}41\,\text{mA}$.</p><p>Kontrolle mit der Maschenregel: Am Widerstand liegen $12-7{,}86=4{,}14\,\text{V}$, und $\dfrac{4{,}14\,\text{V}}{10\,000\,\Omega}=0{,}41\,\text{mA}$. Passt.</p>` },
          { h: 'Zeit bis 10 V (mit dem Rechner)', t: m`<p>Gleichung mit den Zahlen: $10=12\cdot\bigl(1-e^{-t/4{,}7}\bigr)$.</p><p>Im Rechner: <code>solve(10=12*(1-e^(-t/4.7)),t)</code> ergibt $t=8{,}42\,\text{s}$.</p><p>Von Hand: $e^{-t/4{,}7}=1-\tfrac{10}{12}=\tfrac16\ \big|\ln\ \Rightarrow\ -\tfrac{t}{4{,}7}=-1{,}79\ \Rightarrow\ t=8{,}4\,\text{s}$.</p>` }
        ]
      },
      fehler: [
        m`Lade- und Entladeformel vertauscht. Laden: $U_C$ steigt, also $(1-e^{-t/(R\cdot C)})$. Entladen: $U_C$ fällt, also $e^{-t/(R\cdot C)}$.`,
        'kΩ und µF nicht umgerechnet: 10 kΩ · 470 µF = 10 000 Ω · 0,00047 F = 4,7 s.',
        m`Maschenregel beim Entladen falsch benutzt: Beim Laden teilen sich $U_R$ und $U_C$ die Spannung $U_0$ (Summe), beim Entladen gibt es keine Quelle, dort ist $|U_R|=U_C$.`,
        m`Das $e$ in $e^{-t/(R\cdot C)}$ für die Elementarladung gehalten. Hier ist es die Zahl 2,718.`
      ],
      test: [
        { q: 'Warum ist der Ladestrom am Anfang am größten?', a: m`Der Kondensator ist leer ($U_C=0$), die ganze Spannung liegt am Widerstand: $I_0=U_0/R$. Mit wachsender $U_C$ bleibt für $R$ weniger.` },
        { q: m`Wie lautet die Maschenregel beim Laden und beim Entladen?`, a: m`Laden: $U_0=U_R+U_C$. Entladen (ohne Quelle): $U_C+U_R=0$, also $|U_R|=U_C$.` },
        { q: m`Was bedeutet $e^{-t/(R\cdot C)}$ in Worten?`, a: 'Der Anteil, der noch übrig ist (Strom beim Laden, Spannung beim Entladen): am Anfang 1, danach immer weniger.' },
        { q: m`Wie bekommst du die Zeit bis zu einer bestimmten Spannung?`, a: m`Gleichung mit den Zahlen aufschreiben und im Rechner <code>solve(…, t)</code> eingeben (oder von Hand $e^{\ldots}$ isolieren und $\ln$ nehmen).` },
        { q: 'Wovon hängt es ab, wie schnell der Kondensator lädt?', a: m`Vom Produkt $R\cdot C$ im Exponenten: größerer Widerstand oder größere Kapazität machen es langsamer.` }
      ]
    },
    {
      id: 'PH9', fach: F, groessen: ['tE', 'RC', 'R', 'C', 'U0', 'UC', 'dQ', 'euler'], num: 9, min: 20, demo: 'p-messung', demoTitel: 'Probier es aus: C aus der Kurve bestimmen',
      title: 'Rechnen mit der e-Funktion und C messen',
      short: 'Nach t auflösen (ln), C = t_E/(R·ln 3) herleiten, Linearisierung, Messunsicherheit',
      idee: m`<h3>1. Zeit gesucht: so wird es im Unterricht gerechnet</h3>
<p>Die Zeit $t$ steckt im Exponenten von $e^{-t/(R\cdot C)}$. Im Unterricht nimmt man dafür den Rechner: <b>Gleichung mit den Zahlen aufschreiben, dann <code>solve(Gleichung, t)</code>.</b></p>
${merke('Zeit gesucht: drei Schritte', m`<ol><li>Formel von S. 27 mit den Zahlen aufschreiben, nur $t$ bleibt offen, z. B. $2{,}0=12\cdot e^{-t/(10000\cdot470\cdot10^{-6})}$.</li><li>Im Rechner: <code>solve(2.0=12*e^(-t/(10000*470*10^(-6))),t)</code> ergibt $t=8{,}42$.</li><li>Ergebnis mit Einheit hinschreiben ($t=8{,}4\,\text{s}$) und prüfen: positiv, passende Größenordnung.</li></ol>`)}
<p><b>Von Hand</b> (nötig bei „Gleichung herleiten“): Erst die e-Funktion <b>allein auf eine Seite</b> bringen, dann auf beiden Seiten den natürlichen Logarithmus nehmen. Er ist die Umkehrung von $e^x$: $\ln\!\left(e^{x}\right)=x$. Weil $e^{-t/(R\cdot C)}$ zwischen 0 und 1 liegt, ist sein Logarithmus negativ. Das Minus hebt sich mit dem Minus vor $t/(R\cdot C)$ weg, $t$ wird positiv.</p>
<h3>2. Kapazität messen: die Herleitung von C = t_E / (R·ln 3)</h3>
<p>Wie in der Abi-Aufgabe „Kornfeuchte“: Man entlädt über einen bekannten Widerstand $R$ und stoppt die Zeit $t_E$, bis die Spannung auf ein Drittel gefallen ist. Daraus folgt $C$, Schritt für Schritt im Beispiel unten. Der Rechner kann das auch mit Buchstaben (<code>solve(1/3=e^(-te/(r*c)),c)</code>), aber bei „Herleiten“ zählt dein aufgeschriebener Weg.</p>
<h3>3. Linearisierung: ist es wirklich eine e-Funktion?</h3>
<p>Trägt man nicht $U$, sondern $\ln(U/U_0)$ gegen $t$ auf, wird aus der Kurve eine <b>Gerade</b> mit der Steigung $-\dfrac1{R\cdot C}$. Denn $\ln(U/U_0)=\ln(e^{-t/(R\cdot C)})=-\dfrac1{R\cdot C}\cdot t$. Liegen Messpunkte so auf einer Geraden, ist es eine e-Funktion, und aus der Steigung (Regression) folgt $R\cdot C$.</p>`,
      bild: m`<p><b>Messunsicherheit (Regel aus „Runden und Messunsicherheit“):</b> Die relative Unsicherheit des Ergebnisses ist so groß wie die <b>größte</b> relative Unsicherheit der Eingangsgrößen. Beispiel: Widerstand ±5 %, Zeit ±2 %: Ergebnis ±5 %. Unsicherheiten mit zwei signifikanten Stellen angeben.</p>`,
      rezept: [
        m`Passende Formel aufschreiben (Laden oder Entladen) und die bekannten Werte einsetzen.`,
        m`Gleichung mit den Zahlen aufschreiben (nur $t$ unbekannt) und im Rechner mit <code>solve(…, t)</code> lösen.`,
        m`Von Hand: $e^{-t/(R\cdot C)}$ isolieren (durch $U_0$ teilen, beim Laden vorher $1-\ldots$ umstellen), beide Seiten logarithmieren: $-\dfrac{t}{R\cdot C}=\ln(\ldots)$, dann nach $t$, $R$ oder $C$ auflösen.`,
        m`Kontrolle: Zeit positiv? Größenordnung passt zu $R\cdot C$ (etwa 0,7 mal $R\cdot C$ für die Hälfte, 1,1 mal für ein Drittel, 2,3 mal für 10 %)?`
      ],
      beispiel: {
        q: m`Herleitung wie im Abi: Ein Kondensator wird über $R$ entladen. $t_E$ ist die Zeit, bis die Spannung von $U_0$ auf $\tfrac13U_0$ gefallen ist. Zeige $C=\dfrac{t_E}{R\cdot\ln3}$ und berechne $C$ für $R=47\,\text{k}\Omega$, $t_E=50{,}0\,\text{s}$.`,
        steps: [
          { h: 'Entladegesetz aufschreiben', t: m`<p>Beim Entladen gilt $U_C(t)=U_0\cdot e^{-t/(RC)}$ (mit $R\cdot C$ ausgeschrieben, weil wir $C$ suchen).</p>` },
          { h: 'Messbedingung einsetzen', t: m`<p>Zur Zeit $t=t_E$ ist noch ein Drittel übrig: $\tfrac13U_0=U_0\cdot e^{-t_E/(RC)}$.</p><p>Durch $U_0$ teilen. Die Startspannung fällt heraus, man muss sie also gar nicht kennen: $\tfrac13=e^{-t_E/(RC)}$.</p>` },
          { h: 'Logarithmieren', t: m`<p>$\ln$ auf beiden Seiten: $\ln\tfrac13=-\dfrac{t_E}{RC}$.</p><p>Weil $\ln\tfrac13=-\ln3$, kann man beide Minus streichen: $\ln3=\dfrac{t_E}{RC}$.</p>` },
          { h: 'Nach C umstellen', t: m`<p>Mal $C$, dann durch $\ln3$: $\;C=\dfrac{t_E}{R\cdot\ln3}$. Fertig hergeleitet.</p>` },
          { h: 'Zahlen einsetzen', t: m`<p>$C=\dfrac{50{,}0\,\text{s}}{47\,000\,\Omega\cdot1{,}0986}=9{,}68\cdot10^{-4}\,\text{F}\approx0{,}97\,\text{mF}$</p><p>Plausibel? $R\cdot C\approx45\,\text{s}$, und für ein Drittel braucht man $\ln3\approx1{,}1$ mal $R\cdot C$, also etwa 50 s. Passt.</p>` }
        ]
      },
      extraAfter: m`<p><b>Noch ein Rechenbeispiel: Zeit gesucht.</b> Ein Kondensator ($R=10\,\text{k}\Omega$, $C=470\,\mu\text{F}$) wird von 12 V aus entladen. Wann liegen nur noch 2,0 V an?</p><p><b>Rechner:</b> Gleichung $2{,}0=12\cdot e^{-t/(10000\cdot470\cdot10^{-6})}$, Eingabe <code>solve(2.0=12*e^(-t/(10000*470*10^(-6))),t)</code>, Ergebnis $t=8{,}42\,\text{s}$.</p><p><b>Von Hand:</b> $2{,}0=12\cdot e^{-t/4{,}7}\ \Rightarrow\ e^{-t/4{,}7}=\tfrac{2{,}0}{12}=\tfrac16\ \Rightarrow\ -\tfrac{t}{4{,}7}=\ln\tfrac16=-1{,}79\ \Rightarrow\ t=4{,}7\,\text{s}\cdot1{,}79=8{,}4\,\text{s}$</p><p><b>Abgeflossene Ladung</b> nach der Zeit $t$: Anfangsladung minus Rest, $\Delta Q=Q_0-Q_0e^{-t/(R\cdot C)}=Q_0\,(1-e^{-t/(R\cdot C)})$ mit $Q_0=C\cdot U_0$.</p>`,
      fehler: [
        m`$\ln$ auf eine Summe angewendet: $\ln(U_0(1-e^{-t/(R\cdot C)}))$ geht nicht direkt. Erst $1-e^{-t/(R\cdot C)}$ ausrechnen und $e^{-t/(R\cdot C)}$ isolieren.`,
        m`Vorzeichen: $\ln$ von Zahlen kleiner 1 ist negativ, $t$ muss am Ende positiv sein.`,
        'Bei der Messunsicherheit die Unsicherheiten addiert. Nach der Regel aus dem Unterricht zählt die größte relative Unsicherheit.'
      ],
      test: [
        { q: m`Herleitung von $C=\dfrac{t_E}{R\ln3}$ in vier Schritten?`, a: m`1. $U=U_0e^{-t/(RC)}$ · 2. $\tfrac13U_0$ bei $t_E$ einsetzen, durch $U_0$ teilen · 3. logarithmieren: $\ln\tfrac13=-\tfrac{t_E}{RC}$ · 4. nach $C$ umstellen.` },
        { q: m`Wie löst man $0{,}2=e^{-t/(R\cdot C)}$ nach $t$?`, a: m`Im Rechner <code>solve(0.2=e^(-t/(R*C)),t)</code> mit den Zahlen für $R$ und $C$. Von Hand: $\ln$ nehmen, $-\tfrac{t}{R\cdot C}=\ln0{,}2$, also $t=-R\cdot C\cdot\ln0{,}2=1{,}61\cdot R\cdot C$.` },
        { q: m`Was trägt man auf, um eine Gerade zu bekommen? Steigung?`, a: m`$\ln(U/U_0)$ gegen $t$, Steigung $-1/(R\cdot C)$.` },
        { q: 'Widerstand ±5 %, gemessene Zeit ±1,7 %. Unsicherheit von C?', a: '±5 % (größte relative Unsicherheit).' }
      ]
    },

    // ---------------------------------------------------------------- Klausurthema „Begründen mit funktionalen Abhängigkeiten“ (12.11.)
    {
      id: 'PH10', fach: F, groessen: ['C', 'Q', 'U', 'E', 'd', 'A', 'epsr', 'v0', 'UB', 'y', 'RC', 'R'], num: 10, min: 15,
      title: 'Begründen mit funktionalen Abhängigkeiten',
      short: 'Je-desto richtig begründen: was bleibt gleich, welche Formel, welcher Faktor',
      idee: m`<p>Auf der Themenliste der Lehrkraft steht „<b>Begründen mit funktionalen Abhängigkeiten</b>“. In der Klausur heißt das: „Begründen Sie, wie sich … ändert, wenn …“. Das ist keine Rechenaufgabe. Du zeigst, dass du siehst, <b>welche Formel</b> die Größen verbindet und <b>was dabei gleich bleibt</b>. Der Taschenrechner hilft dir hier nicht, das Denken schon.</p>
<h3>Die vier Bausteine einer vollständigen Begründung</h3>
<ol><li><b>Was bleibt gleich?</b> ($U$ an der Quelle, $Q$ beim abgetrennten Kondensator, $R$, $d$ …)</li><li><b>Welche Formel</b> verbindet die geänderte mit der gesuchten Größe? Hinschreiben.</li><li><b>Faktor bestimmen.</b> Alles, was sich nicht ändert, kürzt sich. Was übrig bleibt, ist der Faktor.</li><li><b>Ergebnis in einem Satz</b> mit „weil“ und dem richtigen Wort (proportional, antiproportional, quadratisch …).</li></ol>
${merke('Wenn $x$ um den Faktor $k$ größer wird …', m`<table><tr><th>Formel</th><th>$y$ ändert sich um</th><th>Sprechweise</th></tr><tr><td>$y=c\cdot x$</td><td>$k$</td><td>proportional: doppelt, dann doppelt</td></tr><tr><td>$y=\dfrac cx$</td><td>$\dfrac1k$</td><td>antiproportional: doppelt, dann halb</td></tr><tr><td>$y=c\cdot x^2$</td><td>$k^2$</td><td>quadratisch: doppelt, dann vierfach</td></tr><tr><td>$y=c\cdot\sqrt x$</td><td>$\sqrt k$</td><td>Wurzel: vierfach, dann doppelt</td></tr></table>`)}
<h3>Die Zusammenhänge dieser Klausur</h3>
<table><tr><th>Größe</th><th>Formel</th><th>Abhängigkeit</th></tr>
<tr><td>Kapazität</td><td>$C=\varepsilon_0\varepsilon_r\dfrac Ad$</td><td>$\propto A$, $\propto\varepsilon_r$, $\propto\dfrac1d$</td></tr>
<tr><td>Feldstärke (an der Quelle)</td><td>$E=\dfrac Ud$</td><td>$\propto U$, $\propto\dfrac1d$</td></tr>
<tr><td>Feldstärke (abgetrennt)</td><td>$E=\dfrac{\sigma}{\varepsilon_0\varepsilon_r}$, $\sigma=\dfrac QA$</td><td>unabhängig von $d$, $\propto\dfrac1{\varepsilon_r}$</td></tr>
<tr><td>Energie</td><td>$E_\text{el}=\tfrac12CU^2=\dfrac{Q^2}{2C}$</td><td>an der Quelle $\propto C$ und $\propto U^2$; abgetrennt $\propto\dfrac1C$</td></tr>
<tr><td>Geschwindigkeit nach Beschleunigung</td><td>$v_0=\sqrt{\dfrac{2eU_B}{m_e}}$</td><td>$\propto\sqrt{U_B}$, <b>nicht</b> von $U_A$ abhängig</td></tr>
<tr><td>Ablenkung im Querfeld</td><td>$y=\dfrac{U_A\,x^2}{4\,d\,U_B}$</td><td>$\propto U_A$, $\propto x^2$, $\propto\dfrac1d$, $\propto\dfrac1{U_B}$</td></tr>
<tr><td>Zeit im Exponenten</td><td>$e^{-t/(R\cdot C)}$</td><td>größeres $R$ oder $C$: langsamer ($t_h=R\cdot C\cdot\ln2$ wächst mit)</td></tr>
<tr><td>Anfangsstrom</td><td>$I_0=\dfrac{U_0}{R}$</td><td>$\propto U_0$, $\propto\dfrac1R$; hängt nicht von $C$ ab</td></tr></table>`,
      bild: m`<p>Eine gute Begründung ist eine <b>Kette</b>: Ursache → Formel → Folge. Zum Beispiel: „$d$ wird halbiert → $C=\varepsilon_0\varepsilon_rA/d$ → $C$ verdoppelt sich“. Ein Satz ohne Formel („je kleiner der Abstand, desto größer …“) ist nur eine Behauptung und bringt wenig Punkte.</p>`,
      rezept: [
        m`<b>Gleich bleibt:</b> Aufschreiben, was festgehalten wird (Quelle: $U$; abgetrennt: $Q$; Röhre: Platten und $U_A$; Entladen: $U_0$).`,
        m`<b>Formel:</b> Die Formel hinschreiben, in der die geänderte Größe vorkommt. Bei Ketten (Röhre) Formel für Formel durchgehen.`,
        m`<b>Faktor:</b> Neue Größe durch alte Größe teilen, alles Gleiche kürzt sich. Zahl für Zahl im Kopf: halbiert $\to\frac12$, vervierfacht $\to4$, unter Wurzel $\to\sqrt4=2$.`,
        m`<b>Satz mit „weil“:</b> „… ändert sich um den Faktor …, weil …“ plus Fachwort.`
      ],
      beispiel: {
        q: m`Elektronen werden mit $U_B$ beschleunigt und laufen durch ein Plattenpaar (Länge $l$, Abstand $d$, Spannung $U_A$). Die Beschleunigungsspannung wird <b>vervierfacht</b>, alles andere bleibt. Begründen Sie, wie sich $v_0$, die Flugzeit zwischen den Platten und die Ablenkung am Plattenende ändern.`,
        steps: [
          { h: 'Was bleibt gleich?', t: m`Platten ($l$, $d$), Plattenspannung $U_A$, also auch die Beschleunigung im Querfeld $a=\dfrac{eU_A}{m_ed}$.` },
          { h: 'Geschwindigkeit $v_0$', t: m`$v_0=\sqrt{\dfrac{2eU_B}{m_e}}$. Vierfaches $U_B$: $\sqrt4=2$. Die Elektronen sind <b>doppelt so schnell</b>.` },
          { h: 'Flugzeit', t: m`Waagerecht gleichförmig: $t=\dfrac l{v_0}$. Doppeltes $v_0$ bei gleichem $l$ heißt: <b>halbe Flugzeit</b>.` },
          { h: 'Ablenkung', t: m`Senkrecht gleichmäßig beschleunigt: $y=\tfrac12at^2$. Mit $\dfrac t2$ statt $t$ und gleichem $a$: $y\to\tfrac12a\left(\dfrac t2\right)^2=\dfrac14\cdot\tfrac12at^2$. Die Ablenkung wird <b>ein Viertel</b>.` },
          { h: 'Satz', t: m`Je größer die Beschleunigungsspannung, desto schneller die Elektronen, desto kürzer bleiben sie im Querfeld, desto weniger werden sie abgelenkt. Die Ablenkung ist antiproportional zu $U_B$: $y=\dfrac{U_Ax^2}{4dU_B}$.` }
        ]
      },
      extraAfter: m`<p><b>Gleiche Frage, andere Aufgabe (aus dem Unterricht):</b> Ein abgetrennter Plattenkondensator, der Plattenabstand wird halbiert.</p><table><tr><th></th><th>Faktor</th><th>Begründung</th></tr><tr><td>$Q$</td><td>1</td><td>abgetrennt, die Ladung kann nirgendwohin</td></tr><tr><td>$C$</td><td>2</td><td>$C\propto\frac1d$</td></tr><tr><td>$U$</td><td>$\frac12$</td><td>$U=\frac QC$</td></tr><tr><td>$E$</td><td>1</td><td>$E=\frac Ud$, beide halbiert (oder $E=\frac{\sigma}{\varepsilon_0}$, $\sigma$ gleich)</td></tr><tr><td>$E_\text{el}$</td><td>$\frac12$</td><td>$E_\text{el}=\frac{Q^2}{2C}$</td></tr></table>`,
      fehler: [
        m`Nur „je … desto …“ hingeschrieben, ohne Formel und ohne zu sagen, was gleich bleibt. Das ist keine Begründung.`,
        m`Quelle und abgetrennt verwechselt. Frage zuerst: Hängt der Kondensator noch an der Spannungsquelle?`,
        m`$v_0\propto U_B$ gesagt. Richtig: $v_0\propto\sqrt{U_B}$ (aus $\tfrac12mv^2=eU$), und $y\propto\dfrac1{U_B}$ (nicht $\sqrt{\ }$).`,
        m`Gedacht, ein größerer Widerstand ändere die gespeicherte Ladung. Nein: $Q_0=C\cdot U_0$. $R$ ändert nur, <b>wie lange</b> es dauert ($R\cdot C$) und wie groß $I_0=U_0/R$ ist.`
      ],
      test: [
        { q: m`$U_B$ wird vervierfacht. Um welchen Faktor ändert sich $v_0$?`, a: m`Um den Faktor 2, weil $v_0\propto\sqrt{U_B}$.` },
        { q: m`Plattenkondensator an der Quelle, Abstand verdoppelt: Faktoren für $C$, $Q$, $E$?`, a: m`$C\to\frac12$, $Q=CU\to\frac12$, $E=\frac Ud\to\frac12$.` },
        { q: m`Vier Bausteine einer Begründung?`, a: m`Was bleibt gleich, welche Formel, welcher Faktor, Satz mit „weil“.` },
        { q: m`$R$ wird verdoppelt, $C$ und $U_0$ bleiben. Was passiert mit $I_0$, $R\cdot C$, $Q_0$?`, a: m`$I_0$ halbiert, $R\cdot C$ verdoppelt, $Q_0=CU_0$ bleibt gleich.` }
      ]
    },

    // ---------------------------------------------------------------- Taschenrechner (12.11.)
    {
      id: 'PH11', fach: F, groessen: ['RC', 'R', 'C', 'I0', 'Q', 't'], num: 11, min: 12,
      title: 'Der Taschenrechner in der Physik-Klausur',
      short: 'Was der Rechner übernimmt (Regression, Integral, ln) und was du selbst aufschreiben musst',
      idee: m`<p>In der Klausur sind <b>Taschenrechner und Formelsammlung</b> erlaubt. Damit sind das Einsetzen und das Rechnen mit $\ln$ und $e^x$ nicht mehr das Problem. Die Punkte gibt es für das, was der Rechner nicht kann.</p>
<table><tr><th>Das machst du</th><th>Das macht der Rechner</th></tr>
<tr><td>Formel wählen und aufschreiben, Größen in SI-Einheiten, Skizze</td><td>Zahlen einsetzen, Zehnerpotenzen, $\ln$, $e^x$, Wurzel</td></tr>
<tr><td>Gleichung herleiten (Formelsammlung hat $v_0$ und die Bahngleichung <b>nicht</b>)</td><td>Gleichung nach einer Größe umstellen</td></tr>
<tr><td>Regression ansetzen: <b>welche</b> Art? Ergebnis deuten</td><td>Regression rechnen ($a$, $b$, $R^2$)</td></tr>
<tr><td>Ergebnis mit Einheit, Größenordnung prüfen</td><td>Integral $\int I\,dt$ numerisch</td></tr></table>
<h3>Befehle (TI-Nspire CAS)</h3>
<ul><li><b>Zehnerpotenz:</b> Taste für Zehnerpotenzen (ᴇ), z. B. <code>1.602ᴇ-19</code>. Nicht „· 10 ^ (−19)“ tippen, das gibt Klammerfehler.</li><li><b>Umstellen:</b> <code>solve(U=R*I, I)</code></li><li><b>Zeit aus der e-Funktion (so wie im Unterricht):</b> Gleichung mit Zahlen, dann <code>solve(2.0=12*e^(-t/(10000*470*10^(-6))),t)</code> ergibt $t=8{,}42$. <b>Numerisch:</b> <code>nSolve(e^(-t/25)=1/3, t)</code></li><li><b>Regression</b> (Tabellenkalkulation, zwei Spalten, Menü Statistik): <code>LinReg</code> ($mx+b$), <code>QuadReg</code> ($ax^2+bx+c$), <code>ExpReg</code> ($a\cdot b^x$), <code>PowerReg</code> ($a\cdot x^b$)</li><li><b>Integral:</b> Vorlage $\int$ oder <code>nInt(f(t), t, 0, 60)</code>, bis unendlich mit $\infty$</li></ul>
<p class="dim" style="font-size:14px"><b>UNSICHER:</b> Die Menüwege am Gerät sind hier nicht geprüft, nur die Befehlsnamen. Probiere das an deinem Rechner einmal aus, bevor es ernst wird.</p>
<h3>Auswertung von Messwerten so aufschreiben, wie es im Unterricht vereinbart ist</h3>
<ol><li><b>Vermutung:</b> „Wenn sich $x$ verdoppelt, vervierfacht sich $y$ ungefähr. Vermutung: $y\sim x^2$.“</li><li><b>Regression</b> mit passender Art durchführen, Gleichung mit den Zahlen angeben.</li><li><b>$R^2$ auswerten:</b> „Das Bestimmtheitsmaß liegt sehr dicht an 1, der Zusammenhang ist bestätigt.“</li><li><b>Funktionsgleichung</b> mit Einheiten angeben, danach ein Beispiel rechnen.</li></ol>
<p class="dim" style="font-size:14px">Alternativ <b>Quotienten-/Produktbildung</b>: bei $y\sim x^2$ ist $y/x^2$ für jeden Messwert (fast) gleich, bei $y\sim1/x$ ist $y\cdot x$ gleich. Quelle: Mitschrift eines Mitschülers (12.11.), passt zu „Dokumentation in der im Unterricht vereinbarten Form“ aus den Abi-Aufgaben. Wenn die Lehrkraft es anders sagt, gilt die Lehrkraft.</p>`,
      bild: m`<p>Aus einer Entladekurve wird mit $Q=\int I\,dt$ die Ladung. Der Rechner liefert die Zahl, <b>du</b> sagst, was die Fläche unter der Kurve bedeutet: die Ladung, die durch den Widerstand geflossen ist, also die Anfangsladung des Kondensators.</p>`,
      rezept: [
        m`<b>Messreihe in zwei Spalten</b> (Zeit, Strom) eingeben. Einheiten merken (µA, s).`,
        m`<b>Regression:</b> <code>ExpReg</code> für Entladung. Ergebnis $I(t)=a\cdot b^t$ ablesen. $a$ ist der Anfangsstrom $I_0$.`,
        m`<b>$R\cdot C$ aus $b$:</b> $b^t=e^{t\ln b}$ ist dasselbe wie $e^{-t/(R\cdot C)}$, also $R\cdot C=-\dfrac1{\ln b}$.`,
        m`<b>Ladung:</b> $Q=\displaystyle\int_0^\infty a\,e^{-t/(R\cdot C)}\,dt=a\cdot R\cdot C$. Oder direkt $\int$ am Rechner, dann bis zur Messzeit.`,
        m`<b>Weiter:</b> $C=\dfrac{Q_0}{U_0}$, $R=\dfrac{U_0}{I_0}$. Kontrolle: $R\cdot C$.`
      ],
      beispiel: {
        q: m`Ein Kondensator wird über einen Widerstand entladen, die Quellenspannung war $U_0=12\,\text{V}$. Gemessen: $t=0;10;20;30;40\,\text{s}$ und $I=120;\ 80{,}4;\ 53{,}9;\ 36{,}1;\ 24{,}2\,\mu\text{A}$. Bestimme $R\cdot C$, die Ladung $Q_0$, $C$ und $R$.`,
        steps: [
          { h: 'Regression', t: m`<code>ExpReg</code> auf $(t, I)$ liefert etwa $I(t)=120\,\mu\text{A}\cdot0{,}9608^{\,t/\text{s}}$. Also $I_0=120\,\mu\text{A}$.` },
          { h: '$R\cdot C$ aus $b$', t: m`$R\cdot C=-\dfrac1{\ln0{,}9608}=\dfrac1{0{,}04}=25\,\text{s}$` },
          { h: 'Ladung als Fläche', t: m`$Q_0=\int_0^\infty I\,dt=I_0\cdot R\cdot C=120\,\mu\text{A}\cdot25\,\text{s}=3000\,\mu\text{C}=3{,}0\,\text{mC}$` },
          { h: 'Kapazität', t: m`$C=\dfrac{Q_0}{U_0}=\dfrac{3{,}0\cdot10^{-3}\,\text{C}}{12\,\text{V}}=2{,}5\cdot10^{-4}\,\text{F}=250\,\mu\text{F}$` },
          { h: 'Widerstand und Kontrolle', t: m`$R=\dfrac{U_0}{I_0}=\dfrac{12\,\text{V}}{120\,\mu\text{A}}=100\,\text{k}\Omega$. Kontrolle: $RC=10^5\,\Omega\cdot2{,}5\cdot10^{-4}\,\text{F}=25\,\text{s}$. Das passt zum Wert aus $b$. Stimmt.` }
        ]
      },
      fehler: [
        m`$I$ in µA und $t$ in s stehen lassen, aber das Ergebnis „in C“ nennen. $\mu\text{A}\cdot\text{s}=\mu\text{C}$, also $3000\,\mu\text{C}$ ist $3{,}0\cdot10^{-3}\,\text{C}$.`,
        m`Die Regressionsart nicht begründet. Bei Entladung nimmt die Stromstärke bei gleichen Zeitschritten immer um denselben Faktor ab: Exponentialfunktion.`,
        m`Rechner-Ergebnis ohne Rundung auf sinnvolle Stellen und ohne Einheit abgeschrieben.`,
        m`Gleichung nur im Rechner umgestellt und nicht hingeschrieben. Bei „Gleichung herleiten“ zählt der aufgeschriebene Weg.`
      ],
      test: [
        { q: m`Was bedeutet $b$ bei $\text{ExpReg}$ $y=a\cdot b^x$?`, a: m`Der Faktor pro Schritt von $x$; $R\cdot C=-\dfrac1{\ln b}$ bei Zeit in s.` },
        { q: m`Wie erhält man aus der Stromkurve die Ladung?`, a: m`$Q=\int I\,dt$ (Fläche unter der Kurve); bei $I_0e^{-t/(R\cdot C)}$ bis $\infty$: $Q=I_0\cdot R\cdot C$.` },
        { q: m`Woran erkennt man $y\sim x^2$ ohne Regression?`, a: m`$y/x^2$ ist für alle Messwerte (fast) gleich.` },
        { q: 'Welche zwei Formeln sind nicht in der Formelsammlung?', a: m`$v_0=\sqrt{2eU_B/m_e}$ und die Bahngleichung $y=\dfrac{U_Ax^2}{4dU_B}$ (sie müssen hergeleitet werden).` }
      ]
    },

    // ---------------------------------------------------------------- Klausurthema 2 (garantiert): Gleichung herleiten
    {
      id: 'PH12', fach: F, groessen: ['UB', 'e', 'me', 'v0', 'a', 'UAbl', 'd', 'x', 'y', 'tE', 'th', 'R', 'C', 'U0', 'UC', 'euler'], num: 12, min: 20,
      title: 'Gleichungen herleiten (garantiert dran)',
      short: 'Alle Herleitungen der Klausur auf einer Seite, jede Umformung mit Rechenoperation',
      idee: m`<p>„<b>Gleichung herleiten</b>“ kommt in der Klausur garantiert dran (Sternchen auf der Themenliste der Lehrkraft). Gemeint sind die Formeln, die <b>nicht</b> in der Formelsammlung stehen. Hier sind alle auf einer Seite, jeweils mit <b>Start</b> (was darf man benutzen) und <b>Ziel</b>.</p>
<table><tr><th>Herleitung</th><th>Start (Formelsammlung oder Grundwissen)</th><th>Ziel</th></tr>
<tr><td>1 Geschwindigkeit nach Beschleunigung</td><td>$E_{kin}=E_{el}$, d. h. $\tfrac12mv^2=eU_B$</td><td>$v_0=\sqrt{\dfrac{2eU_B}{m_e}}$</td></tr>
<tr><td>2 Bahn im Querfeld</td><td>$x=v_0t$, $F=ma$, $E=\dfrac Ud$, $y=\tfrac12at^2$</td><td>$y=\dfrac{U_A\,x^2}{4\,d\,U_B}$</td></tr>
<tr><td>3 Kapazität aus der Entladezeit</td><td>$U_C=U_0e^{-t/(RC)}$ (Formelsammlung S. 27)</td><td>$C=\dfrac{t_E}{R\cdot\ln3}$</td></tr>
<tr><td>4 Halbwertszeit</td><td>$U_C=U_0e^{-t/(RC)}$</td><td>$t_H=R\,C\cdot\ln2$</td></tr>
<tr><td>5 Plattenrand (Abi-Art)</td><td>Bahngleichung mit $y=\tfrac d2$</td><td>$U_B=\dfrac{U_C}{2\,d^2}\,x^2$</td></tr>
<tr><td>6 Energie des Kondensators</td><td>$U=\dfrac QC$, Fläche im $U$-$Q$-Diagramm</td><td>$E_\text{el}=\tfrac12\,C\,U^2$</td></tr></table>
<p>Die Formel für die Differenzialgleichung beim Laden ($U_0=R\,I+\tfrac QC$, abgeleitet $0=R\dot I+\tfrac IC$) übst du in Aufgabe PL6.</p>`,
      bild: m`<p>Eine Herleitung ist wie ein Weg von A nach B über lauter kleine Schritte. Bewertet wird nicht das Ergebnis (das steht in der Aufgabe), sondern <b>der Weg</b>: Startformel, jede Umformung sichtbar, am Ende das Ziel.</p>`,
      rezept: [
        m`<b>Startformel hinschreiben</b> (die Bedingung der Aufgabe: Energie bleibt erhalten, $t=t_E$ erreicht, Spannung auf ein Drittel gefallen …).`,
        m`<b>Gegebene Bedingung einsetzen</b> und, wo möglich, schon kürzen (z. B. $U_0$ fällt weg).`,
        m`<b>Umformen, jede Umformung einzeln</b> mit Operation rechts ($\big|\cdot2$, $\big|:m$, $\big|\ln$, $\big|\sqrt{\ }$).`,
        m`<b>Ziel prüfen:</b> Steht genau die verlangte Formel da? Einheit passt? Zahl plausibel?`
      ],
      beispiel: {
        q: m`Leiten Sie die vier wichtigsten Formeln her: (1) $v_0$, (2) die Bahngleichung, (3) $C=\dfrac{t_E}{R\ln3}$, (4) $t_H=RC\ln2$. Schreiben Sie wie im Unterricht jede Umformung mit der Rechenoperation rechts auf.`,
        steps: [
          { h: '1 · Geschwindigkeit $v_0$', t: m`$$\begin{aligned}E_{kin}&=E_{el}\\\tfrac12\,m\,v^2&=q\cdot U&&\big|\cdot2\\m\,v^2&=2\,q\,U&&\big|:m\\v^2&=\dfrac{2\,q\,U}{m}&&\big|\sqrt{\ }\\v&=\sqrt{\dfrac{2\,q\,U}{m}}\end{aligned}$$` },
          { h: '2 · Bahngleichung: zwei Bewegungen', t: m`<p><b>x-Richtung</b> (gleichförmig): $s_x=v\cdot t\ \ \big|:v\ \Rightarrow\ t=\dfrac{s_x}{v}$</p><p><b>y-Richtung</b> (gleichmäßig beschleunigt): $F=m\cdot a\ \ \big|:m\ \Rightarrow\ a=\dfrac Fm=\dfrac{E\,e}{m}=\dfrac{U_A\,e}{d\,m}$</p><p><b>Zusammensetzen:</b></p>$$\begin{aligned}s_y&=\tfrac12\,a\,t^2=\tfrac12\cdot\dfrac{U_A\,e}{d\,m}\cdot\left(\dfrac{s_x}{v}\right)^2&&\big|\ v^2=\dfrac{2\,e\,U_B}{m}\\s_y&=\tfrac12\cdot\dfrac{U_A\,e}{d\,m}\cdot s_x^2\cdot\dfrac{m}{2\,e\,U_B}&&\big|\ e,\ m\ \text{kürzen}\\s_y&=\dfrac{U_A}{4\,d\,U_B}\cdot s_x^2\end{aligned}$$` },
          { h: '3 · Kapazität aus der Entladezeit', t: m`<p>Bei $t=t_E$ ist die Spannung auf ein Drittel gefallen: $U_C(t_E)=\tfrac13U_0$.</p>$$\begin{aligned}\tfrac13\,U_0&=U_0\cdot e^{-\frac{t_E}{R\,C}}&&\big|:U_0\\\tfrac13&=e^{-\frac{t_E}{R\,C}}&&\big|\ln\\\ln\tfrac13&=-\dfrac{t_E}{R\,C}&&\big|\ \ln\tfrac13=-\ln3\\-\ln3&=-\dfrac{t_E}{R\,C}&&\big|\cdot(-1)\\\ln3&=\dfrac{t_E}{R\,C}&&\big|\cdot C\\C\cdot\ln3&=\dfrac{t_E}{R}&&\big|:\ln3\\C&=\dfrac{t_E}{R\cdot\ln3}\end{aligned}$$` },
          { h: '4 · Halbwertszeit', t: m`<p>Gleicher Weg, nur mit der Hälfte statt einem Drittel: $U_C(t_H)=\tfrac12U_0$.</p>$$\begin{aligned}\tfrac12&=e^{-\frac{t_H}{R\,C}}&&\big|\ln\\-\ln2&=-\dfrac{t_H}{R\,C}&&\big|\cdot(-R\,C)\\t_H&=R\,C\cdot\ln2\end{aligned}$$<p>Zahlenwert: $\ln2\approx0{,}69$, also $t_H\approx0{,}69\cdot R\cdot C$.</p>` },
          { h: '5 · Plattenrand (Abi-Art) und 6 · Energie', t: m`<p><b>Plattenrand:</b> Das Elektron startet in der Mitte und trifft bei $x$ gerade den Rand: $y=\tfrac d2$. In die Bahngleichung eingesetzt:</p>$$\begin{aligned}\dfrac d2&=\dfrac{U_C}{4\,d\,U_B}\,x^2&&\big|\cdot4\,d\,U_B\\2\,d^2\,U_B&=U_C\,x^2&&\big|:2\,d^2\\U_B&=\dfrac{U_C}{2\,d^2}\,x^2\end{aligned}$$<p><b>Energie:</b> Beim Laden steigt $U=\dfrac QC$ von 0 auf $U$. Die Arbeit ist die Fläche unter der Geraden im $U$-$Q$-Diagramm, ein Dreieck: $E_\text{el}=\tfrac12\,Q\,U$. Mit $Q=C\,U$: $E_\text{el}=\tfrac12\,C\,U^2$.</p>` }
        ]
      },
      fehler: [
        m`Ergebnis hingeschrieben („nach Einsetzen folgt …“), ohne die Umformungen. Bei „Gleichung herleiten“ zählt der Weg.`,
        m`Bei $\ln\tfrac13$ das Minuszeichen vergessen: $\ln\tfrac13=-\ln3$. Zwei Minus heben sich auf.`,
        m`$U_0$ nicht gekürzt oder gar gesucht. Die Startspannung fällt bei der $t_E$-Herleitung heraus.`,
        m`In der Bahngleichung $U_A$ und $U_B$ vertauscht: $U_B$ beschleunigt und steht im Nenner, $U_A$ lenkt ab und steht im Zähler.`
      ],
      test: [
        { q: 'Leite v₀ aus E_kin = E_el her (Startformeln darfst du in der Formelsammlung nachlesen: S. 17, S. 24). Was ist der erste, was der letzte Schritt?', a: m`Erster: $\tfrac12mv^2=eU_B$. Letzter: $v_0=\sqrt{2eU_B/m_e}$ (dazwischen $\big|\cdot2$, $\big|:m$, $\big|\sqrt{\ }$).` },
        { q: m`Welche Bedingung setzt du bei $C=\dfrac{t_E}{R\ln3}$ in $U_C(t)=U_0e^{-t/(RC)}$ ein?`, a: m`$U_C(t_E)=\tfrac13U_0$; $U_0$ kürzt sich, dann $\ln$ und umstellen.` },
        { q: 'Welche zwei Bewegungen überlagern sich bei der Bahngleichung, und welche Formel steht jeweils am Anfang?', a: m`$x$: gleichförmig, $s_x=v\,t$. $y$: gleichmäßig beschleunigt, $s_y=\tfrac12at^2$ mit $a=\dfrac{eU_A}{md}$.` },
        { q: m`Wie kommt man von $\ln\tfrac12$ zu $t_H=RC\ln2$?`, a: m`$\ln\tfrac12=-\ln2$, beide Minus streichen, mit $R\,C$ multiplizieren.` }
      ]
    },

    // ---------------------------------------------------------------- Formelsammlung: was steht wo? (12.11.)
    {
      id: 'PH13', fach: F, groessen: ['E', 'C', 'U0', 'UC', 'R', 'I0'], num: 13, min: 10,
      title: 'Die Formelsammlung: was steht wo?',
      short: 'Nichts auswendig: welche Formel in der Formelsammlung steht (mit Seite) und was du herleiten musst',
      idee: m`<p><b>Du musst keine Formel auswendig lernen.</b> In der Klausur hast du die Formelsammlung (und den Taschenrechner). Wichtig ist, dass du <b>schnell die richtige Stelle findest</b>, die Formel <b>verstehst</b> (rechts daneben steht, was jede Größe bedeutet) und weißt, was <b>nicht</b> drinsteht und darum hergeleitet werden muss.</p>
<h3>Wo steht was (Seitenzahlen deiner Formelsammlung)</h3>
<table><tr><th>Thema</th><th>Formel</th><th>Seite</th></tr>
<tr><td>Strom, Ladung</td><td>$I=\dfrac{\Delta Q}{\Delta t}$, $Q=\int I\,dt$, $R=\dfrac UI$</td><td>S. 23</td></tr>
<tr><td>Leistung, Energie</td><td>$P=U\cdot I$, $\Delta E=P\cdot\Delta t$, $\Delta E=q\cdot U$; Kirchhoff</td><td>S. 24</td></tr>
<tr><td>Feld, Potential</td><td>$E=\dfrac{F_\text{el}}q$, $E=\dfrac Ud$, $\sigma=\dfrac QA$, $\sigma=\varepsilon_0\varepsilon_rE$, $\varphi=\dfrac Eq$, $\varphi=\dfrac Ud\cdot s$, $U=\varphi_2-\varphi_1$</td><td>S. 25</td></tr>
<tr><td>Kondensator</td><td>$C=\dfrac QU$, $C=\varepsilon_0\varepsilon_r\dfrac Ad$, $E=\tfrac12CU^2$, Auf-/Entladen ($U_C$, $I$, $Q$), beide DGL, Reihe/Parallel</td><td><b>S. 27</b></td></tr>
<tr><td>Bewegung</td><td>$s=v\,t+s_0$; $s=\tfrac12at^2+v_0t+s_0$; $v=at+v_0$</td><td>S. 15</td></tr>
<tr><td>Kraft</td><td>$\vec F=m\cdot\vec a$</td><td>S. 14</td></tr>
<tr><td>Bewegungsenergie</td><td>$E=\tfrac12mv^2$</td><td>S. 17</td></tr>
<tr><td>Arbeit, Leistung</td><td>$W=\Delta E$, $W=F\cdot s\cdot\cos\alpha$, $P=\dfrac{\Delta E}{\Delta t}$</td><td>S. 18</td></tr>
<tr><td>Konstanten ($e$, $m_e$, $\varepsilon_0$)</td><td>Tabelle „Tabellierte Werte“</td><td>S. 46 (Foto fehlt, nachsehen)</td></tr></table>
<h3>Was nicht drinsteht (das musst du herleiten oder wissen)</h3>
<ul><li>$v_0=\sqrt{\dfrac{2eU_B}{m_e}}$, $a=\dfrac{eU}{m_ed}$, die Bahngleichung $y=\dfrac{Ux^2}{4dU_B}$</li><li>$C=\dfrac{t_E}{R\ln3}$, $t_H=RC\ln2$ (in der Formelsammlung steht nur $R\cdot C$ im Exponenten)</li><li>$E_\text{el}=\dfrac{Q^2}{2C}=\tfrac12QU$ (aus $E_\text{el}=\tfrac12CU^2$ und $Q=CU$)</li><li>„An der Quelle bleibt $U$, abgetrennt bleibt $Q$“ und alle Begründungen</li></ul>
${achtung('Zwei E in der Formelsammlung', m`<p>In der Formelsammlung heißt sowohl die <b>Energie</b> (S. 27: $E=\tfrac12CU^2$, S. 25: $\varphi=E/q$) als auch die <b>Feldstärke</b> (S. 25: $E=U/d$) „$E$“. Im Unterricht heißt die elektrische Energie $E_\text{el}$. Immer rechts nachlesen, was gemeint ist.</p>`)}`,
      bild: m`<p>Die Formelsammlung ist wie ein <b>Wörterbuch</b>: Du lernst es nicht auswendig, du musst nur wissen, <b>unter welchem Stichwort</b> du suchst (Kondensator, Elektrisches Feld, Leistung) und die Einträge <b>lesen</b> können.</p>`,
      rezept: [
        m`<b>Stichwort finden:</b> Was ist gesucht (Kapazität, Feldstärke, Spannung nach der Zeit)? Dazu den Abschnitt im Inhaltsverzeichnis suchen: Elektrizitätslehre S. 23, Mechanik S. 14.`,
        m`<b>Formel lesen:</b> Links die Formel, <b>rechts</b> die Erklärung jeder Größe. Prüfen, ob die Größe das ist, was du meinst (Energie oder Feldstärke?).`,
        m`<b>Passt die Situation?</b> (Aufladen oder Entladen, homogenes Feld oder Punktladung, Plattenkondensator oder allgemein.)`,
        m`<b>Steht sie nicht drin?</b> Dann aus Formeln der Formelsammlung herleiten (siehe Lektion 12).`
      ],
      beispiel: {
        q: m`Ein Kondensator wird über einen Widerstand entladen. Berechne die Spannung nach $8\,\text{s}$, wenn $U_0=24\,\text{V}$, $R=10\,\text{k}\Omega$ und $C=470\,\mu\text{F}$ gegeben sind. Wo suchst du die Formel?`,
        steps: [
          { h: 'Stichwort und Seite', t: m`Es geht um einen Kondensator, der entladen wird: <b>Elektrizitätslehre und Magnetismus, Kondensator, „Aufladen und Entladen“, S. 27</b>.` },
          { h: 'Richtige Zeile', t: m`Unter „Entladen eines Kondensators“ steht $U_C(t)=U_0\cdot e^{-t/(R\cdot C)}$. Rechts steht: $U_C$ Spannung am Kondensator, $U_0$ Spannung zu Beginn des Entladevorgangs, $t$ Zeit, $R$, $C$.` },
          { h: 'Einsetzen', t: m`$R\cdot C=10\,000\,\Omega\cdot470\cdot10^{-6}\,\text{F}=4{,}7\,\text{s}$, also $U_C(8\,\text{s})=24\,\text{V}\cdot e^{-8/4{,}7}=24\,\text{V}\cdot0{,}182\approx4{,}4\,\text{V}$.` },
          { h: 'Was brauchte ich nicht zu wissen?', t: m`Die Formel selbst. Ich musste nur wissen, <b>dass</b> ich unter „Kondensator, Entladen“ suchen muss und dass $R\cdot C$ im Exponenten steht.` }
        ]
      },
      fehler: [
        m`Formel „aus dem Kopf“ aufgeschrieben und dabei Vorzeichen oder $R\cdot C$ vertauscht. Besser: nachschlagen und rechts die Größen prüfen.`,
        m`$E$ aus S. 27 (Energie) mit $E=U/d$ (Feldstärke, S. 25) verwechselt.`,
        m`Gedacht, $v_0=\sqrt{2eU/m}$ stehe in der Formelsammlung. Dort steht nur der Ansatz: Bewegungsenergie (S. 17) gleich $\Delta E=qU$ (S. 24).`
      ],
      test: [
        { q: 'Du suchst die Formel für die Spannung am Kondensator beim Aufladen. Unter welchem Stichwort und auf welcher Seite findest du sie?', a: 'Kondensator, „Aufladen und Entladen“, S. 27 (Elektrizitätslehre und Magnetismus).' },
        { q: 'Welche drei Dinge stehen NICHT in der Formelsammlung und müssen hergeleitet werden?', a: m`$v_0=\sqrt{2eU_B/m_e}$, die Bahngleichung im Querfeld und $C=\dfrac{t_E}{R\ln3}$.` },
        { q: 'Wofür steht „E“ in der Formelsammlung?', a: m`Für die Energie (S. 27: $E=\tfrac12CU^2$) und für die Feldstärke (S. 25: $E=U/d$). Im Unterricht heißt die Energie $E_\text{el}$.` }
      ]
    }
  ];

  // ======================================================================
  // AUFGABEN (eigene Aufgaben, Musterlösung mit BE)
  // ======================================================================
  const TASKS = [
    // ---------------------------------------------------------------- PH1
    {
      id: 'PE1', fach: F, groessen: [['e','1,602·10⁻¹⁹ C'],['U','2,5 kV = 2500 V'],['W','gesucht (in eV und J)']], teil: 'A', lesson: 'PH1', title: 'Elektronvolt und Joule', afb: 'I', ops: 'Berechnen',
      intro: KONST,
      parts: [
        { id: 'PE1a', label: 'a)', be: 2, text: m`Ein Elektron durchläuft die Spannung $U=2{,}5\,\text{kV}$. Berechnen Sie die aufgenommene Energie in eV und in J.`,
          nums: [{ label: 'E_el in eV', ans: 2500, tol: 0.01 }, { label: 'E_el in 10⁻¹⁶ J', ans: 4.005, tol: 0.01 }],
          hints: [m`$E_\text{el}=e\cdot U$. In eV: Zahlenwert wie $U$ in V.`],
          sol: m`<p>$E_\text{el}=e\cdot U=2500\,\text{eV}=2500\cdot1{,}602\cdot10^{-19}\,\text{J}=4{,}0\cdot10^{-16}\,\text{J}$</p><ul><li>Ansatz $E_\text{el}=eU$ (1 BE)</li><li>beide Werte (1 BE)</li></ul>` },
        { id: 'PE1b', label: 'b)', be: 2, text: m`Welche Spannung muss ein Elektron durchlaufen, damit es die Energie $8{,}0\cdot10^{-17}\,\text{J}$ erhält?`,
          nums: [{ label: 'U in V', ans: 499.4, tol: 0.01 }],
          hints: [m`$U=\dfrac{E_\text{el}}e$`],
          sol: m`<p>$U=\dfrac{E_\text{el}}e=\dfrac{8{,}0\cdot10^{-17}\,\text{J}}{1{,}602\cdot10^{-19}\,\text{C}}\approx5{,}0\cdot10^{2}\,\text{V}$</p><ul><li>Umstellen (1 BE), Ergebnis mit Einheit (1 BE)</li></ul>` }
      ]
    },
    {
      id: 'PE2', fach: F, groessen: [['U','3,7 V'],['Q','5000 mAh (das ist eine Ladung!)'],['P','1,2 W (Leuchte)'],['W','gesucht'],['t','Betriebsdauer, gesucht']], teil: 'B', lesson: 'PH1', title: 'Powerbank: Was steht auf dem Etikett?', afb: 'II', ops: 'Interpretieren, Berechnen',
      intro: m`Auf einer kleinen Powerbank steht: <b>3,7 V / 5000 mAh</b>. Damit wird eine LED-Leuchte mit der Leistung $P=1{,}2\,\text{W}$ betrieben (Spannung 3,7 V).`,
      parts: [
        { id: 'PE2a', label: 'a)', be: 2, text: 'Interpretieren Sie die Angabe „5000 mAh“ und berechnen Sie die zugehörige Größe in SI-Einheiten.',
          nums: [{ label: 'Q in C', ans: 18000, tol: 0.01 }],
          hints: ['mAh = Milliampere mal Stunde. Welche Größe ist „Stromstärke mal Zeit“?'],
          sol: m`<p>Die Angabe ist eine <b>Ladung</b>: Die Powerbank kann z. B. 5 A eine Stunde lang liefern. $Q=I\cdot t=5{,}0\,\text{A}\cdot3600\,\text{s}=18\,000\,\text{C}$.</p><ul><li>Ladung erkannt (1 BE)</li><li>Umrechnung (1 BE)</li></ul>` },
        { id: 'PE2b', label: 'b)', be: 2, text: 'Berechnen Sie die gespeicherte Energie in J und in Wh.',
          nums: [{ label: 'E_el in kJ', ans: 66.6, tol: 0.01 }, { label: 'E_el in Wh', ans: 18.5, tol: 0.01 }],
          hints: [m`$E_\text{el}=Q\cdot U$; $1\,\text{Wh}=3600\,\text{J}$`],
          sol: m`<p>$E_\text{el}=Q\cdot U=18\,000\,\text{C}\cdot3{,}7\,\text{V}=66\,600\,\text{J}\approx67\,\text{kJ}=18{,}5\,\text{Wh}$</p><ul><li>Ansatz (1 BE), beide Werte (1 BE)</li></ul>` },
        { id: 'PE2c', label: 'c)', be: 2, text: 'Berechnen Sie, wie lange die LED-Leuchte mit einer vollen Ladung betrieben werden kann.',
          nums: [{ label: 't in h', ans: 15.42, tol: 0.01 }],
          hints: [m`$t=\dfrac{E_\text{el}}P$ oder erst $I=\dfrac PU$, dann $t=\dfrac QI$.`],
          sol: m`<p>$t=\dfrac{E_\text{el}}P=\dfrac{66\,600\,\text{J}}{1{,}2\,\text{W}}=55\,500\,\text{s}\approx15\,\text{h}$ (genauer 15,4 h). Alternativ: $I=P/U=0{,}32\,\text{A}$, $t=Q/I$.</p><ul><li>Ansatz (1 BE), Ergebnis (1 BE)</li></ul>` }
      ]
    },
    {
      id: 'PE3', fach: F, groessen: [['Q','−3,2·10⁻⁹ C (negativ: Elektronen dazu)'],['e','1,602·10⁻¹⁹ C'],['me','9,109·10⁻³¹ kg']], teil: 'A', lesson: 'PH1', title: 'Wird eine Kugel durch Laden schwerer?', afb: 'II', ops: 'Berechnen, Begründen',
      intro: m`Eine Metallkugel wird auf $Q=-3{,}2\cdot10^{-9}\,\text{C}$ geladen. ${KONST}`,
      parts: [
        { id: 'PE3a', label: 'a)', be: 2, text: 'Berechnen Sie die Anzahl der zusätzlichen Elektronen.',
          nums: [{ label: 'N in 10¹⁰', ans: 1.998, tol: 0.02 }],
          hints: [m`$N=\dfrac{|Q|}{e}$`],
          sol: m`<p>$N=\dfrac{|Q|}{e}=\dfrac{3{,}2\cdot10^{-9}}{1{,}602\cdot10^{-19}}\approx2{,}0\cdot10^{10}$</p>` },
        { id: 'PE3b', label: 'b)', be: 2, text: 'Berechnen Sie die Massenänderung und begründen Sie, ob die Masse zu- oder abnimmt.',
          nums: [{ label: 'Δm in 10⁻²⁰ kg', ans: 1.82, tol: 0.02 }],
          hints: ['Negative Ladung heißt: Elektronen sind dazugekommen.'],
          sol: m`<p>$\Delta m=N\cdot m_e=2{,}0\cdot10^{10}\cdot9{,}109\cdot10^{-31}\,\text{kg}\approx1{,}8\cdot10^{-20}\,\text{kg}$. Die Masse <b>nimmt zu</b>, weil Elektronen hinzukommen (bei positiver Ladung würden Elektronen fehlen). Praktisch unmessbar klein.</p>` }
      ]
    },
    // ---------------------------------------------------------------- PH2
    {
      id: 'PP1', fach: F, groessen: [['d','8,0 cm = 0,080 m'],['x','Abstand von der negativen Platte: A bei 1,5 cm, B bei 6,0 cm'],['phi','4,5 V in A, 18,0 V in B, 0 an der negativen Platte'],['E','gesucht'],['U0','Spannung am Kondensator, gesucht'],['W','Energieänderung (Arbeit) von A nach B, gesucht']], teil: 'B', lesson: 'PH2', title: 'Messung mit der Potentialsonde', afb: 'II', ops: 'Bestimmen, Zeichnen, Erläutern',
      intro: m`Ein Plattenkondensator hat den Plattenabstand $d=8{,}0\,\text{cm}$. Die negative Platte hat das Potential $\varphi=0$. Mit einer Potentialsonde wird im homogenen Bereich gemessen: Punkt A ($x_A=1{,}5\,\text{cm}$ von der negativen Platte): $\varphi_A=4{,}5\,\text{V}$; Punkt B ($x_B=6{,}0\,\text{cm}$): $\varphi_B=18{,}0\,\text{V}$.`,
      parts: [
        { id: 'PP1a', label: 'a)', be: 3, text: 'Bestimmen Sie den Betrag der elektrischen Feldstärke.',
          nums: [{ label: 'E in V/m', ans: 300, tol: 0.01 }],
          hints: [m`$E=\dfrac{\Delta\varphi}{\Delta x}$, Abstand in m.`],
          sol: m`<p>$E=\dfrac{\varphi_B-\varphi_A}{x_B-x_A}=\dfrac{13{,}5\,\text{V}}{0{,}045\,\text{m}}=300\,\tfrac{\text{V}}{\text{m}}$</p><ul><li>Ansatz mit Differenzen (1 BE), Umrechnung in m (1 BE), Ergebnis (1 BE)</li></ul>` },
        { id: 'PP1b', label: 'b)', be: 2, text: m`Geben Sie die Spannung $U_0$ am Kondensator und das Potential bei $x=3{,}0\,\text{cm}$ an.`,
          nums: [{ label: 'U₀ in V', ans: 24, tol: 0.01 }, { label: 'φ(3 cm) in V', ans: 9, tol: 0.01 }],
          sol: m`<p>$U_0=E\cdot d=300\,\tfrac{\text{V}}{\text{m}}\cdot0{,}080\,\text{m}=24\,\text{V}$; $\ \varphi(3\,\text{cm})=300\cdot0{,}030\,\text{V}=9{,}0\,\text{V}$</p>` },
        { id: 'PP1c', label: 'c)', be: 2, text: m`Zeichnen Sie das $x$-$\varphi$-Diagramm für $0\le x\le d$ und erläutern Sie, warum alle Quotienten $\varphi/x$ gleich sind.`,
          sol: m`<p>Ursprungsgerade von $(0\,|\,0)$ bis $(8\,\text{cm}\,|\,24\,\text{V})$. Im homogenen Feld ist $E$ überall gleich, also wächst $\varphi=E\cdot x$ proportional zu $x$; der Quotient $\varphi/x$ ist die konstante Steigung $E$.</p>` },
        { id: 'PP1d', label: 'd)', be: 3, text: m`Eine Ladung $q=+2{,}0\,\text{nC}$ wird von A nach B gebracht. Berechnen Sie die dafür nötige Arbeit.`,
          nums: [{ label: 'E_el in 10⁻⁸ J', ans: 2.7, tol: 0.01 }],
          hints: [m`$E_\text{el}=q\cdot U_{AB}$ mit $U_{AB}=\varphi_B-\varphi_A$`],
          sol: m`<p>$E_\text{el}=q\,(\varphi_B-\varphi_A)=2{,}0\cdot10^{-9}\,\text{C}\cdot13{,}5\,\text{V}=2{,}7\cdot10^{-8}\,\text{J}$. Positiv: Die positive Ladung wird gegen die Feldkraft zur positiven Platte gebracht.</p>` },
        { id: 'PP1e', label: 'e)', be: 3, text: 'Erläutern Sie, wie man mit der Sonde die Feldstärke in einem Punkt des inhomogenen Randfeldes näherungsweise bestimmen kann.',
          sol: m`<p>In einer kleinen Umgebung ist das Feld näherungsweise homogen. Man misst das Potential an zwei nahe beieinander liegenden Punkten auf einer Linie <b>senkrecht zu den Äquipotentiallinien</b> (also entlang einer Feldlinie) und deren Abstand $\Delta s$: $E\approx\dfrac{\Delta\varphi}{\Delta s}$.</p><ul><li>lokal homogen (1 BE), senkrecht zu Äquipotentiallinien (1 BE), Formel (1 BE)</li></ul>` }
      ]
    },
    {
      id: 'PP2', fach: F, groessen: ['phi','U','W'], teil: 'A', lesson: 'PH2', title: 'Äquipotentiallinien verstehen', afb: 'II', ops: 'Begründen, Erläutern',
      intro: 'Beantworten Sie ohne Rechnung, in ganzen Sätzen.',
      parts: [
        { id: 'PP2a', label: 'a)', be: 2, text: 'Begründen Sie, dass beim Verschieben einer Ladung entlang einer Äquipotentiallinie keine Arbeit verrichtet wird.',
          sol: m`<p>Auf der Linie ist $\varphi$ überall gleich, also $\Delta\varphi=0$ und $E_\text{el}=q\cdot\Delta\varphi=0$.</p>` },
        { id: 'PP2b', label: 'b)', be: 2, text: 'Begründen Sie, dass Feldlinien senkrecht auf Äquipotentiallinien stehen.',
          sol: m`<p>Hätte die Feldkraft eine Komponente entlang der Äquipotentiallinie, würde beim Verschieben entlang der Linie Arbeit verrichtet. Das widerspricht a). Also wirkt die Kraft (und damit die Feldlinie) senkrecht zur Linie.</p>` },
        { id: 'PP2c', label: 'c)', be: 2, text: 'Erläutern Sie den Unterschied zwischen Potential und Spannung.',
          sol: m`<p>Das Potential gehört zu <b>einem</b> Punkt und ist auf einen Bezugspunkt ($\varphi=0$) bezogen. Die Spannung ist die Potential<b>differenz</b> zwischen <b>zwei</b> Punkten und hängt nicht vom Bezugspunkt ab.</p>` }
      ]
    },
    // ---------------------------------------------------------------- PH3
    {
      id: 'PC1', fach: F, groessen: [['A', '(0,25 m)² = 0,0625 m²'], ['d', '2,0 mm = 0,0020 m'], ['epsr', '1 (Luft)'], ['eps0', '8,854·10⁻¹² As/(Vm)'], ['U', '400 V'], ['C', 'gesucht'], ['Q', 'gesucht'], ['E', 'gesucht'], ['sigma', 'gesucht']],
      teil: 'B', lesson: 'PH3', title: 'Plattenkondensator berechnen', afb: 'I', ops: 'Berechnen',
      intro: m`Ein Plattenkondensator mit quadratischen Platten (Kantenlänge 25 cm, Abstand 2,0 mm, Luft) liegt an $U=400\,\text{V}$. ${KONST}`,
      parts: [
        { id: 'PC1a', label: 'a)', be: 2, text: 'Berechnen Sie die Kapazität.', nums: [{ label: 'C in pF', ans: 276.7, tol: 0.01 }],
          hints: ['Die Kapazität hängt nur vom Bau ab: Fläche, Abstand, Material.', m`$A=(0{,}25\,\text{m})^2$, $d=0{,}0020\,\text{m}$`],
          sol: m`<p><b>Gedanke:</b> Kapazität kommt nur aus dem Bau, die Spannung brauchen wir hier nicht.</p><p><b>Formel:</b> $C=\varepsilon_0\varepsilon_r\dfrac Ad$</p><p><b>Einsetzen:</b> $C=8{,}854\cdot10^{-12}\cdot1\cdot\dfrac{0{,}0625}{0{,}0020}\,\text{F}=2{,}77\cdot10^{-10}\,\text{F}$</p><p><b>Ergebnis:</b> $C\approx277\,\text{pF}$</p><ul><li>Formel mit umgerechneten Größen (1 BE), Ergebnis (1 BE)</li></ul>` },
        { id: 'PC1b', label: 'b)', be: 1, text: 'Berechnen Sie die Ladung auf einer Platte.', nums: [{ label: 'Q in nC', ans: 110.7, tol: 0.01 }],
          sol: m`<p><b>Gedanke:</b> $C=\tfrac QU$ heißt „Ladung pro Volt“. Mal Spannung ergibt die Ladung.</p><p>$Q=C\cdot U=2{,}77\cdot10^{-10}\,\text{F}\cdot400\,\text{V}=1{,}11\cdot10^{-7}\,\text{C}$ auf jeder Platte (+ bzw. −).</p>` },
        { id: 'PC1c', label: 'c)', be: 2, text: 'Berechnen Sie die Feldstärke und die Flächenladungsdichte.',
          nums: [{ label: 'E in kV/m', ans: 200, tol: 0.01 }, { label: 'σ in 10⁻⁶ C/m²', ans: 1.771, tol: 0.01 }],
          sol: m`<p><b>Feldstärke</b> = Spannung pro Abstand: $E=\dfrac Ud=\dfrac{400\,\text{V}}{0{,}0020\,\text{m}}=2{,}0\cdot10^5\,\tfrac{\text{V}}{\text{m}}$</p><p><b>Flächenladungsdichte</b> = Ladung pro Fläche: $\sigma=\dfrac QA=\dfrac{1{,}11\cdot10^{-7}\,\text{C}}{0{,}0625\,\text{m}^2}=1{,}77\cdot10^{-6}\,\tfrac{\text{C}}{\text{m}^2}$</p><p>Kontrolle: $\varepsilon_0E=8{,}854\cdot10^{-12}\cdot2{,}0\cdot10^5=1{,}77\cdot10^{-6}$. Passt.</p>` }
      ]
    },
    {
      id: 'PC2', fach: F, groessen: [['C', '277 pF vor dem Auseinanderziehen'], ['d', '2,0 mm vorher, 4,0 mm nachher'], ['U', '400 V vorher'], ['Q', '1,11·10⁻⁷ C vorher'], ['E', '2,0·10⁵ V/m vorher'], ['C', 'nachher, gesucht'], ['U', 'nachher, gesucht'], ['Q', 'nachher, gesucht'], ['E', 'nachher, gesucht']],
      teil: 'B', lesson: 'PH3', title: 'Platten auseinanderziehen: an der Quelle oder getrennt?', afb: 'II', ops: 'Bestimmen, Erklären',
      intro: m`Der Kondensator aus der Aufgabe „Plattenkondensator berechnen“ ($C=277\,\text{pF}$, $d=2{,}0\,\text{mm}$) wurde auf $400\,\text{V}$ geladen. Danach wird der Plattenabstand auf $4{,}0\,\text{mm}$ verdoppelt.`,
      parts: [
        { id: 'PC2a', label: 'a)', be: 4, text: 'Fall 1: Der Kondensator wurde vorher von der Quelle getrennt. Bestimmen Sie Q, C, U und E nach dem Auseinanderziehen.',
          nums: [{ label: 'U in V', ans: 800, tol: 0.01 }, { label: 'C in pF', ans: 138.3, tol: 0.01 }],
          hints: ['Getrennt: Wohin könnte die Ladung fließen?', m`$C\sim\dfrac1d$: doppelter Abstand, halbe Kapazität.`],
          sol: m`<p><b>Was bleibt?</b> Abgetrennt kann keine Ladung weg oder dazu: $Q=1{,}11\cdot10^{-7}\,\text{C}$ bleibt.</p><p><b>C:</b> $C=\varepsilon_0\tfrac Ad$, $d$ doppelt, also $C$ halb: $138\,\text{pF}$.</p><p><b>U:</b> Gleiche Ladung, halbe Kapazität: $U=\dfrac QC$ wird doppelt so groß, $800\,\text{V}$.</p><p><b>E:</b> $E=\dfrac Ud=\dfrac{800\,\text{V}}{0{,}0040\,\text{m}}=2{,}0\cdot10^5\,\tfrac{\text{V}}{\text{m}}$, also gleich wie vorher.</p><ul><li>je Größe 1 BE</li></ul>` },
        { id: 'PC2b', label: 'b)', be: 3, text: 'Fall 2: Der Kondensator bleibt an der Quelle. Bestimmen Sie Q, C, U und E.',
          nums: [{ label: 'Q in nC', ans: 55.34, tol: 0.01 }, { label: 'E in kV/m', ans: 100, tol: 0.01 }],
          sol: m`<p><b>Was bleibt?</b> Die Quelle hält die Spannung fest: $U=400\,\text{V}$.</p><p><b>C:</b> wie in a) halbiert, $138\,\text{pF}$.</p><p><b>Q:</b> $Q=C\cdot U=138\cdot10^{-12}\,\text{F}\cdot400\,\text{V}=5{,}53\cdot10^{-8}\,\text{C}$, halbiert. Die Hälfte der Ladung fließt zur Quelle zurück.</p><p><b>E:</b> $E=\dfrac{400\,\text{V}}{0{,}0040\,\text{m}}=1{,}0\cdot10^5\,\tfrac{\text{V}}{\text{m}}$, halbiert (gleiche Spannung auf doppelter Strecke).</p>` },
        { id: 'PC2c', label: 'c)', be: 3, text: 'Erklären Sie, warum die Feldstärke in Fall 1 trotz größerem Abstand gleich bleibt.',
          sol: m`<p>Die Feldstärke hängt nur davon ab, wie dicht die Ladung auf den Platten sitzt: $E=\dfrac{\sigma}{\varepsilon_0}=\dfrac{Q}{\varepsilon_0A}$. Im getrennten Fall ändern sich weder $Q$ noch $A$, also bleibt $E$. Die Spannung $U=E\cdot d$ steigt nur, weil dieselbe Feldstärke jetzt über eine doppelt so lange Strecke wirkt.</p><ul><li>$E=\sigma/\varepsilon_0$ (1 BE), Q und A konstant (1 BE), U = E·d gedeutet (1 BE)</li></ul>` }
      ]
    },
    {
      id: 'PC3', fach: F, groessen: [['A','π·(0,12 m)²'],['d','3,0 mm'],['U','250 V'],['Q','3,3·10⁻⁸ C (gemessen), mit Glas 2,3·10⁻⁷ C'],['eps0','gesucht (aus der Messung)'],['epsr','von Glas, gesucht']], teil: 'B', lesson: 'PH3', title: 'ε₀ messen und ein Dielektrikum einschieben', afb: 'II', ops: 'Bestimmen, Beurteilen',
      intro: m`Ein Kondensator mit kreisförmigen Platten ($r=12\,\text{cm}$, $d=3{,}0\,\text{mm}$) wird an $250\,\text{V}$ angeschlossen. Ein Ladungsmessgerät zeigt $Q=3{,}3\cdot10^{-8}\,\text{C}$.`,
      parts: [
        { id: 'PC3a', label: 'a)', be: 3, text: m`Bestimmen Sie aus den Messwerten die elektrische Feldkonstante $\varepsilon_0$ und die prozentuale Abweichung vom Literaturwert $8{,}854\cdot10^{-12}\,\tfrac{\text{As}}{\text{Vm}}$.`,
          nums: [{ label: 'ε₀ in 10⁻¹² As/(Vm)', ans: 8.754, tol: 0.01 }, { label: 'Abweichung in %', ans: 1.13, tol: 0.1 }],
          hints: [m`$Q=CU=\varepsilon_0\dfrac AdU$, nach $\varepsilon_0$ umstellen. $A=\pi r^2$.`],
          sol: m`<p>$\varepsilon_0=\dfrac{Q\,d}{U\,A}=\dfrac{3{,}3\cdot10^{-8}\cdot0{,}0030}{250\cdot\pi\cdot0{,}12^2}\,\tfrac{\text{As}}{\text{Vm}}=8{,}75\cdot10^{-12}\,\tfrac{\text{As}}{\text{Vm}}$, Abweichung $\approx1{,}1\,\%$.</p>` },
        { id: 'PC3b', label: 'b)', be: 2, text: m`Bei weiter angeschlossener Quelle wird eine Glasplatte eingeschoben, die den Raum ganz ausfüllt. Jetzt zeigt das Messgerät $2{,}3\cdot10^{-7}\,\text{C}$. Bestimmen Sie $\varepsilon_r$ von Glas.`,
          nums: [{ label: 'εᵣ', ans: 6.97, tol: 0.02 }],
          sol: m`<p>$U$ bleibt, also $\varepsilon_r=\dfrac{C'}{C}=\dfrac{Q'}{Q}=\dfrac{2{,}3\cdot10^{-7}}{3{,}3\cdot10^{-8}}\approx7{,}0$</p>` },
        { id: 'PC3c', label: 'c)', be: 2, text: 'Erklären Sie, warum beim Einschieben Ladung nachfließt.',
          sol: m`<p>Das Glas wird im Feld <b>polarisiert</b>: An den Grenzflächen sitzen Ladungen, die das Feld im Inneren schwächen. Bei gleicher Ladung würde die Spannung sinken. Weil die Quelle die Spannung festhält, fließt Ladung nach, bis wieder $U=250\,\text{V}$ anliegt.</p>` }
      ]
    },
    // ---------------------------------------------------------------- PH4
    {
      id: 'PW1', fach: F, groessen: [['C', '330 µF = 330·10⁻⁶ F'], ['U', '300 V'], ['t', '1,5 ms = 0,0015 s (Blitzdauer)'], ['W', 'gesucht'], ['P', 'mittlere Lichtleistung, gesucht']],
      teil: 'B', lesson: 'PH4', title: 'Blitzgerät', afb: 'II', ops: 'Berechnen, Begründen',
      intro: m`Der Kondensator eines Blitzgeräts ($C=330\,\mu\text{F}$) wird aus zwei Batterien (zusammen 3 V) über eine Elektronik auf $U=300\,\text{V}$ geladen.`,
      parts: [
        { id: 'PW1a', label: 'a)', be: 2, text: 'Berechnen Sie die gespeicherte Energie.', nums: [{ label: 'E_el in J', ans: 14.85, tol: 0.01 }],
          hints: [m`$C$ und $U$ sind bekannt: Welche Energieformel passt?`],
          sol: m`<p><b>Gedanke:</b> $C$ und $U$ sind gegeben, also $E_\text{el}=\tfrac12CU^2$.</p><p><b>Einsetzen:</b> $E_\text{el}=\tfrac12\cdot330\cdot10^{-6}\,\text{F}\cdot(300\,\text{V})^2=\tfrac12\cdot330\cdot10^{-6}\cdot90\,000\,\text{J}=14{,}85\,\text{J}\approx15\,\text{J}$</p>` },
        { id: 'PW1b', label: 'b)', be: 3, text: m`Der Blitz dauert $1{,}5\,\text{ms}$, 20 % der Energie werden zu Licht. Berechnen Sie die mittlere Lichtleistung.`,
          nums: [{ label: 'P in W', ans: 1980, tol: 0.01 }],
          sol: m`<p><b>Gedanke:</b> Leistung = Energie pro Zeit, aber nur der Lichtanteil zählt.</p><p><b>Lichtenergie:</b> $0{,}20\cdot14{,}85\,\text{J}=2{,}97\,\text{J}$</p><p><b>Leistung:</b> $P=\dfrac{2{,}97\,\text{J}}{0{,}0015\,\text{s}}\approx2{,}0\cdot10^3\,\text{W}=2{,}0\,\text{kW}$</p>` },
        { id: 'PW1c', label: 'c)', be: 2, text: 'Begründen Sie, warum man die Blitzröhre nicht direkt an die Batterien anschließt.',
          sol: m`<p>Die Batterien haben nur 3 V und können nicht genug Strom liefern, um in 1,5 ms rund 15 J abzugeben (das wären etwa 10 kW). Der Kondensator wird langsam geladen (kleine Leistung) und gibt die Energie dann schlagartig ab (große Leistung). Außerdem zündet die Blitzröhre erst bei hoher Spannung.</p>` }
      ]
    },
    {
      id: 'PW2', fach: F, groessen: [['W','200 J'],['U','2,0 kV = 2000 V'],['t','5 ms (Dauer der Entladung)'],['C','gesucht'],['Q','gesucht'],['I','mittlere Stromstärke, gesucht']], teil: 'B', lesson: 'PH4', title: 'Defibrillator', afb: 'II', ops: 'Berechnen, Begründen',
      intro: m`Ein Defibrillator soll beim Entladen $200\,\text{J}$ abgeben. Sein Kondensator wird auf $2{,}0\,\text{kV}$ geladen.`,
      parts: [
        { id: 'PW2a', label: 'a)', be: 2, text: 'Berechnen Sie die nötige Kapazität.', nums: [{ label: 'C in µF', ans: 100, tol: 0.01 }],
          sol: m`<p>$C=\dfrac{2W}{U^2}=\dfrac{2\cdot200\,\text{J}}{(2000\,\text{V})^2}=1{,}0\cdot10^{-4}\,\text{F}=100\,\mu\text{F}$</p>` },
        { id: 'PW2b', label: 'b)', be: 1, text: 'Berechnen Sie die gespeicherte Ladung.', nums: [{ label: 'Q in mC', ans: 200, tol: 0.01 }],
          sol: m`<p>$Q=CU=1{,}0\cdot10^{-4}\,\text{F}\cdot2000\,\text{V}=0{,}20\,\text{C}$</p>` },
        { id: 'PW2c', label: 'c)', be: 2, text: m`Die Entladung dauert etwa $5\,\text{ms}$. Schätzen Sie die mittlere Stromstärke ab.`, nums: [{ label: 'I in A', ans: 40, tol: 0.01 }],
          sol: m`<p>$\bar I=\dfrac Qt=\dfrac{0{,}20\,\text{C}}{0{,}005\,\text{s}}=40\,\text{A}$ (grobe Abschätzung, der echte Strom fällt exponentiell).</p>` },
        { id: 'PW2d', label: 'd)', be: 2, text: 'Begründen Sie, wie sich die Energie ändert, wenn man die Ladespannung verdoppelt.',
          sol: m`<p>$E_\text{el}=\tfrac12CU^2$: Bei gleichem $C$ und doppeltem $U$ wird die Energie <b>vervierfacht</b>.</p>` }
      ]
    },
    {
      id: 'PW3', fach: F, groessen: [['C','100 µF'],['U','2,0 V bzw. 4,0 V'],['Q','gesucht']], teil: 'A', lesson: 'PH4', title: 'Ist ein Kondensator wie ein Eimer?', afb: 'III', ops: 'Berechnen, Erläutern',
      intro: m`Ein Kondensator mit $C=100\,\mu\text{F}$ wird einmal an $2{,}0\,\text{V}$ und einmal an $4{,}0\,\text{V}$ angeschlossen.`,
      parts: [
        { id: 'PW3a', label: 'a)', be: 2, text: 'Berechnen Sie jeweils die gespeicherte Ladung.', nums: [{ label: 'Q bei 4 V in µC', ans: 400, tol: 0.01 }],
          sol: m`<p>$Q_1=CU_1=200\,\mu\text{C}$, $\ Q_2=CU_2=400\,\mu\text{C}$</p>` },
        { id: 'PW3b', label: 'b)', be: 2, text: 'Erläutern Sie damit, warum der Vergleich der Kapazität mit dem Fassungsvermögen eines Eimers irreführend ist.',
          sol: m`<p>Ein Eimer hat ein festes Höchstvolumen. Beim Kondensator gibt es kein festes „voll“: Mit doppelter Spannung passt doppelt so viel Ladung drauf. $C$ ist Ladung <b>pro Volt</b>, nicht eine Höchstmenge (Grenze ist nur die Durchschlagsspannung).</p>` }
      ]
    },
    // ---------------------------------------------------------------- PH5
    {
      id: 'PS1', fach: F, groessen: [['C','C₁ = 20 µF, C₂ = 30 µF'],['U','12 V'],['C','Gesamtkapazität, gesucht'],['Q','Ladungen, gesucht']], teil: 'B', lesson: 'PH5', title: 'Zwei Kondensatoren an 12 V', afb: 'II', ops: 'Berechnen, Begründen',
      intro: m`$C_1=20\,\mu\text{F}$ und $C_2=30\,\mu\text{F}$ werden an $U=12\,\text{V}$ angeschlossen.`,
      parts: [
        { id: 'PS1a', label: 'a)', be: 3, text: 'Parallelschaltung: Berechnen Sie die Gesamtkapazität und die Ladungen auf beiden Kondensatoren.',
          nums: [{ label: 'C in µF', ans: 50, tol: 0.01 }, { label: 'Q₂ in µC', ans: 360, tol: 0.01 }],
          sol: m`<p>$C=C_1+C_2=50\,\mu\text{F}$, $Q_1=C_1U=240\,\mu\text{C}$, $Q_2=C_2U=360\,\mu\text{C}$</p>` },
        { id: 'PS1b', label: 'b)', be: 4, text: 'Reihenschaltung: Berechnen Sie die Gesamtkapazität, die Ladung und die Teilspannungen.',
          nums: [{ label: 'C in µF', ans: 12, tol: 0.01 }, { label: 'U₁ in V', ans: 7.2, tol: 0.01 }],
          hints: [m`$\dfrac1C=\dfrac1{20}+\dfrac1{30}=\dfrac5{60}$`],
          sol: m`<p>$\dfrac1C=\dfrac1{20}+\dfrac1{30}\Rightarrow C=12\,\mu\text{F}$; $Q=CU=144\,\mu\text{C}$; $U_1=\dfrac Q{C_1}=7{,}2\,\text{V}$, $U_2=\dfrac Q{C_2}=4{,}8\,\text{V}$ (Summe 12 V).</p>` },
        { id: 'PS1c', label: 'c)', be: 2, text: 'Begründen Sie, dass in Reihe beide Kondensatoren dieselbe Ladung tragen.',
          sol: m`<p>Die rechte Platte von $C_1$ und die linke von $C_2$ sind miteinander verbunden, aber nicht mit der Quelle. Zusammen bleiben sie neutral: Wird die eine mit $-Q$ geladen, trägt die andere $+Q$. Also haben beide Kondensatoren den gleichen Betrag $Q$.</p>` }
      ]
    },
    {
      id: 'PS2', fach: F, groessen: [['C','je 60 µF']], teil: 'A', lesson: 'PH5', title: 'Kombinationen aus 60-µF-Kondensatoren', afb: 'II', ops: 'Angeben, Begründen',
      intro: m`Es stehen beliebig viele Kondensatoren mit je $60\,\mu\text{F}$ zur Verfügung.`,
      parts: [
        { id: 'PS2a', label: 'a)', be: 3, text: m`Geben Sie Schaltungen für $120\,\mu\text{F}$, $30\,\mu\text{F}$ und $90\,\mu\text{F}$ an und begründen Sie rechnerisch.`,
          sol: m`<p>$120\,\mu\text{F}$: zwei parallel ($60+60$). $30\,\mu\text{F}$: zwei in Reihe ($\tfrac1C=\tfrac2{60}$). $90\,\mu\text{F}$: einer parallel zu zwei in Reihe ($60+30$).</p>` }
      ]
    },
    // ---------------------------------------------------------------- PH6
    {
      id: 'PR1', fach: F, groessen: [['UB','2,0 kV = 2000 V'],['e','1,602·10⁻¹⁹ C'],['me','9,109·10⁻³¹ kg'],['v0','gesucht']], teil: 'B', lesson: 'PH6', title: 'Wie schnell sind die Elektronen?', afb: 'II', ops: 'Herleiten, Berechnen, Begründen',
      intro: m`In einer Elektronenstrahlröhre werden Elektronen mit $U_B=2{,}0\,\text{kV}$ beschleunigt. ${KONST}`,
      parts: [
        { id: 'PR1a', label: 'a)', be: 3, text: m`Leiten Sie die Formel für die Geschwindigkeit $v_0$ her und berechnen Sie $v_0$.`,
          nums: [{ label: 'v₀ in 10⁷ m/s', ans: 2.652, tol: 0.01 }],
          sol: m`<p>Energieerhaltung: $e\,U_B=\tfrac12m_ev_0^2\Rightarrow v_0=\sqrt{\dfrac{2eU_B}{m_e}}=\sqrt{\dfrac{2\cdot1{,}602\cdot10^{-19}\cdot2000}{9{,}109\cdot10^{-31}}}\,\tfrac{\text{m}}{\text{s}}=2{,}65\cdot10^{7}\,\tfrac{\text{m}}{\text{s}}$</p>` },
        { id: 'PR1b', label: 'b)', be: 2, text: m`Bestimmen Sie die Spannung für $v_0=1{,}0\cdot10^{7}\,\tfrac{\text{m}}{\text{s}}$.`, nums: [{ label: 'U_B in V', ans: 284.3, tol: 0.01 }],
          sol: m`<p>$U_B=\dfrac{m_ev_0^2}{2e}=\dfrac{9{,}109\cdot10^{-31}\cdot(1{,}0\cdot10^7)^2}{2\cdot1{,}602\cdot10^{-19}}\,\text{V}\approx284\,\text{V}$</p>` },
        { id: 'PR1c', label: 'c)', be: 2, text: 'Begründen Sie, um welchen Faktor man die Spannung ändern muss, um die Geschwindigkeit zu verdoppeln.',
          sol: m`<p>$v_0\sim\sqrt{U_B}$, also $U_B\sim v_0^2$: doppelte Geschwindigkeit braucht die <b>vierfache</b> Spannung.</p>` }
      ]
    },
    {
      id: 'PR2', fach: F, groessen: ['UB','v0'], teil: 'A', lesson: 'PH6', title: 'Aufbau der Elektronenstrahlröhre', afb: 'I', ops: 'Beschreiben, Erklären',
      intro: 'Beantworten Sie in Text und Skizze.',
      parts: [
        { id: 'PR2a', label: 'a)', be: 4, text: 'Beschreiben Sie in Text und Skizze die Erzeugung des Elektronenstrahls in einer Elektronenstrahlröhre.',
          sol: m`<ul><li>Glühkathode: Heizung, Elektronen treten durch den glühelektrischen Effekt aus (1 BE)</li><li>Wehnelt-Zylinder (negativ) bündelt (1 BE)</li><li>Beschleunigungsspannung zwischen Kathode und Anode, Strahl tritt durch das Loch der Anode (1 BE)</li><li>Vakuum, damit keine Stöße mit Gasmolekülen; Skizze mit Beschriftung (1 BE)</li></ul>` },
        { id: 'PR2b', label: 'b)', be: 2, text: 'Erklären Sie, warum in einer Röhre mit Glühkathode nur dann Strom fließt, wenn die Kathode am Minuspol liegt.',
          sol: m`<p>Nur die heiße Elektrode gibt Elektronen ab. Liegt sie am Minuspol, werden die Elektronen zur positiven Platte gezogen: Strom fließt. Umgepolt werden die ausgetretenen Elektronen zurückgedrängt, und die kalte Platte gibt keine Elektronen ab: kein Strom (Diodenwirkung).</p>` }
      ]
    },
    // ---------------------------------------------------------------- PH7
    {
      id: 'PR3', fach: F, groessen: [['UB', '1,2 kV = 1200 V'], ['l', '6,0 cm = 0,060 m'], ['d', '2,5 cm = 0,025 m'], ['UAbl', '150 V'], ['L', '15 cm = 0,15 m'], ['e', '1,602·10⁻¹⁹ C'], ['me', '9,109·10⁻³¹ kg'], ['v0', 'gesucht'], ['t', 'Flugzeit zwischen den Platten, gesucht'], ['a', 'gesucht'], ['y', 'am Plattenende, gesucht'], ['Y', 'gesucht']],
      teil: 'B', lesson: 'PH7', title: 'Elektronenstrahl im Querfeld', afb: 'II', ops: 'Berechnen, Bestimmen',
      intro: m`Elektronen werden mit $U_B=1{,}2\,\text{kV}$ beschleunigt und treten mittig und parallel zu den Platten in einen Plattenkondensator ein (Plattenlänge $l=6{,}0\,\text{cm}$, Abstand $d=2{,}5\,\text{cm}$, Spannung $U=150\,\text{V}$). Der Schirm steht $15\,\text{cm}$ hinter dem Plattenende. ${KONST}`,
      parts: [
        { id: 'PR3a', label: 'a)', be: 2, text: m`Berechnen Sie $v_0$.`, nums: [{ label: 'v₀ in 10⁷ m/s', ans: 2.054, tol: 0.01 }],
          sol: m`<p><b>Gedanke:</b> Energieerhaltung bei der Beschleunigung: $eU_B=\tfrac12m_ev_0^2$.</p><p>$v_0=\sqrt{\dfrac{2eU_B}{m_e}}=\sqrt{\dfrac{2\cdot1{,}602\cdot10^{-19}\cdot1200}{9{,}109\cdot10^{-31}}}\,\tfrac{\text{m}}{\text{s}}=2{,}05\cdot10^7\,\tfrac{\text{m}}{\text{s}}$</p>` },
        { id: 'PR3b', label: 'b)', be: 2, text: 'Berechnen Sie die Flugzeit zwischen den Platten und die Beschleunigung senkrecht zur Flugrichtung.',
          nums: [{ label: 't in ns', ans: 2.920, tol: 0.01 }, { label: 'a in 10¹⁵ m/s²', ans: 1.055, tol: 0.01 }],
          sol: m`<p><b>Flugzeit:</b> Waagerecht konstant schnell, also Zeit = Strecke : Geschwindigkeit: $t=\dfrac l{v_0}=\dfrac{0{,}060\,\text{m}}{2{,}05\cdot10^7\,\tfrac{\text{m}}{\text{s}}}=2{,}92\cdot10^{-9}\,\text{s}$</p><p><b>Beschleunigung:</b> Kraft $F=\dfrac{eU}{d}$ durch Masse: $a=\dfrac{eU}{m_ed}=\dfrac{1{,}602\cdot10^{-19}\cdot150}{9{,}109\cdot10^{-31}\cdot0{,}025}\,\tfrac{\text{m}}{\text{s}^2}=1{,}06\cdot10^{15}\,\tfrac{\text{m}}{\text{s}^2}$</p>` },
        { id: 'PR3c', label: 'c)', be: 2, text: 'Berechnen Sie die Ablenkung am Plattenende und prüfen Sie, ob das Elektron die Platten verlässt.',
          nums: [{ label: 'y in mm', ans: 4.5, tol: 0.01 }],
          sol: m`<p><b>Gedanke:</b> Senkrecht gleichmäßig beschleunigt, also $y=\tfrac12at^2$ mit der Zeit aus b).</p><p>$y=\tfrac12\cdot1{,}06\cdot10^{15}\cdot(2{,}92\cdot10^{-9})^2\,\text{m}=4{,}5\cdot10^{-3}\,\text{m}=4{,}5\,\text{mm}$</p><p>Kontrolle mit $y=\dfrac{Ul^2}{4dU_B}=\dfrac{150\cdot0{,}06^2}{4\cdot0{,}025\cdot1200}\,\text{m}=4{,}5\,\text{mm}$.</p><p><b>Prüfen:</b> Bis zur Platte sind es $\tfrac d2=12{,}5\,\text{mm}$. $4{,}5\,\text{mm}$ ist weniger, das Elektron kommt durch.</p>` },
        { id: 'PR3d', label: 'd)', be: 3, text: 'Bestimmen Sie den Auftreffpunkt auf dem Schirm (Abstand von der Mittelachse).',
          nums: [{ label: 'Y in cm', ans: 2.7, tol: 0.02 }],
          hints: [m`Hinter den Platten geradlinig: $\tan\alpha=\dfrac{v_y}{v_0}=\dfrac{Ul}{2dU_B}$`],
          sol: m`<p><b>Gedanke:</b> Hinter den Platten keine Kraft mehr, das Elektron fliegt schräg geradeaus. Die Schräge ist $\tan\alpha$.</p><p>$\tan\alpha=\dfrac{Ul}{2dU_B}=\dfrac{150\cdot0{,}060}{2\cdot0{,}025\cdot1200}=0{,}15$</p><p>Auf $L=150\,\text{mm}$ kommen $150\,\text{mm}\cdot0{,}15=22{,}5\,\text{mm}$ dazu.</p><p>$Y=4{,}5\,\text{mm}+22{,}5\,\text{mm}=27\,\text{mm}=2{,}7\,\text{cm}$</p>` }
      ]
    },
    {
      id: 'PR4', fach: F, groessen: [['F', 'F = U·e/d (gegeben)'], ['UAbl', 'Spannung an den Platten'], ['d', 'Plattenabstand'], ['UB', 'Beschleunigungsspannung'], ['v0', 'Eintrittsgeschwindigkeit'], ['x', 'Weg im Feld'], ['y', 'Bahngleichung y(x), gesucht']],
      teil: 'B', lesson: 'PH7', title: 'Bahngleichung herleiten', afb: 'III', ops: 'Herleiten, Erläutern',
      intro: m`Ein Elektron tritt mit $v_0$ senkrecht zu den Feldlinien in das homogene Feld eines Plattenkondensators (Spannung $U$, Abstand $d$) ein. Es wurde vorher mit $U_B$ beschleunigt. Die Kraft im Feld ist $F=\dfrac{U\,e}{d}$.`,
      parts: [
        { id: 'PR4a', label: 'a)', be: 5, text: m`Leiten Sie die Bahngleichung $y(x)=\dfrac12\cdot\dfrac{e}{m_e}\cdot\dfrac Ud\cdot\dfrac{x^2}{v_0^2}$ begründet her.`,
          hints: ['Zerlege in zwei unabhängige Bewegungen: waagerecht und senkrecht.', 'Waagerecht keine Kraft, senkrecht konstante Kraft.', m`$x=v_0t$ nach $t$ auflösen und in $y=\tfrac12at^2$ einsetzen.`],
          sol: m`<p><b>Begründung der Zerlegung:</b> Die Feldkraft wirkt nur senkrecht zu den Platten. Beide Richtungen kann man getrennt betrachten (unabhängige Überlagerung). (1 BE)</p><p><b>Waagerecht:</b> keine Kraft, also gleichförmig: $x=v_0\,t$ (1 BE)</p><p><b>Senkrecht:</b> konstante Kraft, also gleichmäßig beschleunigt aus der Ruhe: $y=\tfrac12a\,t^2$ mit $a=\dfrac F{m_e}=\dfrac{eU}{m_ed}$ (1 BE)</p><p><b>Zeit eliminieren:</b> $t=\dfrac x{v_0}$ in $y$ einsetzen (1 BE):</p><p>$y=\tfrac12\cdot\dfrac{eU}{m_ed}\cdot\dfrac{x^2}{v_0^2}=\dfrac12\cdot\dfrac{e}{m_e}\cdot\dfrac Ud\cdot\dfrac{x^2}{v_0^2}$, eine Parabel (1 BE).</p>` },
        { id: 'PR4b', label: 'b)', be: 4, text: m`Zeigen Sie, dass mit $v_0$ aus der Beschleunigung gilt $y=\dfrac{Ux^2}{4dU_B}$, und erläutern Sie, dass man mit diesem Experiment die spezifische Ladung $e/m_e$ nicht bestimmen kann.`,
          hints: [m`Aus $eU_B=\tfrac12m_ev_0^2$ folgt $v_0^2=\dfrac{2eU_B}{m_e}$.`],
          sol: m`<p><b>Einsetzen:</b> Aus $eU_B=\tfrac12m_ev_0^2$ folgt $\dfrac1{v_0^2}=\dfrac{m_e}{2eU_B}$. Damit:</p><p>$y=\dfrac12\cdot\dfrac{e}{m_e}\cdot\dfrac Ud\cdot x^2\cdot\dfrac{m_e}{2eU_B}=\dfrac{Ux^2}{4dU_B}$ ($e$ und $m_e$ kürzen sich).</p><p><b>Erläuterung:</b> Die Ablenkung hängt nur noch von $U$, $U_B$, $d$ und $x$ ab. Jedes Teilchen mit gleichem Ladungsvorzeichen, das dieselbe Spannung durchlaufen hat, nimmt dieselbe Bahn. Aus der gemessenen Bahn kann man $e/m_e$ also nicht ausrechnen; man bräuchte eine zweite, unabhängige Messung (z. B. mit einem Magnetfeld).</p>` }
      ]
    },
    {
      id: 'PR5', fach: F, groessen: [['UB','1,2 kV'],['l','6,0 cm'],['d','2,5 cm (Mitte bis Platte: 1,25 cm)'],['UAbl','größte mögliche, gesucht']], teil: 'B', lesson: 'PH7', title: 'Wann trifft der Strahl die Platte?', afb: 'II', ops: 'Bestimmen, Begründen',
      intro: m`Aufbau wie in „Elektronenstrahl im Querfeld“: $U_B=1{,}2\,\text{kV}$, $l=6{,}0\,\text{cm}$, $d=2{,}5\,\text{cm}$, Eintritt mittig.`,
      parts: [
        { id: 'PR5a', label: 'a)', be: 4, text: 'Bestimmen Sie die größte Ablenkspannung, bei der die Elektronen den Kondensator gerade noch verlassen.',
          nums: [{ label: 'U in V', ans: 416.7, tol: 0.01 }],
          hints: [m`Grenzfall: $y(l)=\dfrac d2$.`],
          sol: m`<p>$\dfrac{U\,l^2}{4\,d\,U_B}=\dfrac d2\Rightarrow U=\dfrac{2d^2U_B}{l^2}=\dfrac{2\cdot0{,}025^2\cdot1200}{0{,}060^2}\,\text{V}\approx417\,\text{V}$</p>` },
        { id: 'PR5b', label: 'b)', be: 2, text: 'Begründen Sie, wie sich diese Grenzspannung bei doppelter Beschleunigungsspannung ändert.',
          sol: m`<p>$U_{\max}\sim U_B$: Sie verdoppelt sich. Schnellere Elektronen sind kürzer im Feld und werden weniger abgelenkt.</p>` }
      ]
    },
    // ---------------------------------------------------------------- PH8
    {
      id: 'PL1', fach: F, groessen: [['C', '470 µF = 470·10⁻⁶ F'], ['R', '22 kΩ = 22 000 Ω'], ['U0', '9,0 V (Quelle)'], ['RC', 'gesucht'], ['I0', 'gesucht'], ['UC', 'nach 10 s, gesucht'], ['th', 'gesucht'], ['t', 'bis 99 %, gesucht']],
      teil: 'B', lesson: 'PH8', title: 'Ladekurve berechnen', afb: 'II', ops: 'Berechnen',
      intro: m`Ein Kondensator ($C=470\,\mu\text{F}$) wird über $R=22\,\text{k}\Omega$ an einer Quelle mit $U_0=9{,}0\,\text{V}$ geladen. Zu Beginn ist er leer.`,
      parts: [
        { id: 'PL1a', label: 'a)', be: 2, text: m`Berechnen Sie das Produkt $R\cdot C$ aus dem Exponenten und den Anfangsstrom.`, nums: [{ label: 'R·C in s', ans: 10.34, tol: 0.01 }, { label: 'I₀ in µA', ans: 409.1, tol: 0.01 }],
          sol: m`<p><b>Produkt im Exponenten:</b> $R\cdot C=22\,000\,\Omega\cdot470\cdot10^{-6}\,\text{F}=10{,}3\,\text{s}$</p><p><b>Anfangsstrom:</b> Im ersten Moment ist der Kondensator leer, die ganzen 9 V liegen am Widerstand: $I_0=\dfrac{U_0}R=\dfrac{9{,}0\,\text{V}}{22\,000\,\Omega}=4{,}1\cdot10^{-4}\,\text{A}=409\,\mu\text{A}$</p>` },
        { id: 'PL1b', label: 'b)', be: 2, text: m`Berechnen Sie die Kondensatorspannung nach $10\,\text{s}$.`, nums: [{ label: 'U_C in V', ans: 5.578, tol: 0.01 }],
          hints: ['Laden: Die Spannung steigt. Welche der beiden Formeln steigt?'],
          sol: m`<p><b>Formel:</b> Laden, also $U_C=U_0\,(1-e^{-t/(R\cdot C)})$.</p><p><b>Anteil, der noch fehlt:</b> $e^{-10/10{,}34}=e^{-0{,}967}=0{,}380$. Geschafft sind $1-0{,}380=0{,}620$, also 62 %.</p><p><b>Ergebnis:</b> $U_C=9{,}0\,\text{V}\cdot0{,}620=5{,}6\,\text{V}$ (passt: $10\,\text{s}$ ist knapp unter $R\cdot C=10{,}3\,\text{s}$, also knapp unter 63 %).</p>` },
        { id: 'PL1c', label: 'c)', be: 2, text: 'Berechnen Sie die Halbwertszeit des Ladestroms.', nums: [{ label: 't_h in s', ans: 7.167, tol: 0.01 }],
          sol: m`<p><b>Gedanke:</b> Nach der Halbwertszeit ist nur noch die Hälfte des Stroms übrig: $e^{-t_h/(R\cdot C)}=\tfrac12$, also $t_h=R\cdot C\cdot\ln2$.</p><p>$t_h=10{,}34\,\text{s}\cdot0{,}693=7{,}2\,\text{s}$</p><p><b>Rechner:</b> <code>solve(0.5=e^(-t/10.34),t)</code> ergibt $t=7{,}17$.</p>` },
        { id: 'PL1d', label: 'd)', be: 2, text: 'Berechnen Sie, nach welcher Zeit 99 % der Endspannung erreicht sind.', nums: [{ label: 't in s', ans: 47.62, tol: 0.01 }],
          hints: [m`$0{,}99=1-e^{-t/(R\cdot C)}\Rightarrow e^{-t/(R\cdot C)}=0{,}01$`],
          sol: m`<p><b>Ansatz:</b> $0{,}99\,U_0=U_0\,(1-e^{-t/(R\cdot C)})$. Durch $U_0$ teilen und umstellen: $e^{-t/(R\cdot C)}=0{,}01$ (es fehlt nur noch 1 %).</p><p><b>Logarithmieren:</b> $-\dfrac{t}{R\cdot C}=\ln0{,}01=-4{,}61$, also $t=4{,}61\cdot10{,}34\,\text{s}=47{,}6\,\text{s}$.</p><p><b>Rechner:</b> <code>solve(0.99=1-e^(-t/10.34),t)</code> ergibt $t=47{,}6$.</p>` }
      ]
    },
    {
      id: 'PL2', fach: F, groessen: ['RC','th','I0','euler'], teil: 'A', lesson: 'PH8', title: 'Lade- und Entladekurven deuten', afb: 'II', ops: 'Begründen, Angeben',
      intro: 'Ein Kondensator wird über einen Widerstand geladen und später wieder entladen.',
      parts: [
        { id: 'PL2a', label: 'a)', be: 2, text: 'Begründen Sie, warum der Ladestrom am Anfang am größten ist und am Ende null wird.',
          sol: m`<p>Maschenregel: $U_R=U_0-U_C$. Am Anfang ist $U_C=0$, die ganze Spannung liegt am Widerstand: $I_0=U_0/R$ (Kondensator wie Kurzschluss). Mit wachsender Ladung steigt $U_C$, $U_R$ und damit $I$ sinken. Bei $U_C=U_0$ ist $I=0$ (Kondensator wie Unterbrechung).</p>` },
        { id: 'PL2b', label: 'b)', be: 2, text: m`Der Kondensator wird geladen. Geben Sie an, wie viel Prozent der Endspannung erreicht sind, wenn die Zeit doppelt so groß ist wie $R\cdot C$ (also $t=2\cdot R\cdot C$).`, nums: [{ label: 'Prozent', ans: 86.47, tol: 0.005 }],
          sol: m`<p>Der Exponent ist $-\dfrac{t}{R\cdot C}=-2$, also $1-e^{-2}=0{,}865$, etwa 86 %.</p>` },
        { id: 'PL2c', label: 'c)', be: 2, text: 'Geben Sie an, nach wie vielen Halbwertszeiten der Strom erstmals unter 1 % seines Anfangswertes liegt, und begründen Sie.',
          nums: [{ label: 'Anzahl', ans: 7, tol: 0 }],
          sol: m`<p>Nach $n$ Halbwertszeiten: $(\tfrac12)^n$. $(\tfrac12)^6=1{,}6\,\%$, $(\tfrac12)^7=0{,}78\,\%$. Also nach 7 Halbwertszeiten.</p>` }
      ]
    },
    // ---------------------------------------------------------------- PH9
    {
      id: 'PL3', fach: F, groessen: [['C','100 µF'],['U0','50 V (Start des Entladens)'],['R','2,0 MΩ = 2 000 000 Ω'],['dQ','in den ersten 30 s, gesucht'],['th','gesucht'],['R','für t_h = 60 s, gesucht'],['I0','beim Wiederaufladen, gesucht']], teil: 'B', lesson: 'PH9', title: 'Entladen über einen großen Widerstand', afb: 'II', ops: 'Berechnen, Bestimmen',
      intro: m`Ein Kondensator ($C=100\,\mu\text{F}$) wurde auf $U_0=50\,\text{V}$ geladen und wird über $R=2{,}0\,\text{M}\Omega$ entladen.`,
      parts: [
        { id: 'PL3a', label: 'a)', be: 3, text: m`Berechnen Sie die Ladung, die in den ersten $30\,\text{s}$ abfließt.`, nums: [{ label: 'ΔQ in µC', ans: 696.4, tol: 0.01 }],
          hints: [m`$Q(t)=Q_0e^{-t/(R\cdot C)}$, abgeflossen: $Q_0-Q(t)$`],
          sol: m`<p>$R\cdot C=200\,\text{s}$, $Q_0=CU_0=5{,}0\cdot10^{-3}\,\text{C}$. $\Delta Q=Q_0(1-e^{-30/200})=5{,}0\cdot10^{-3}\,\text{C}\cdot0{,}139=7{,}0\cdot10^{-4}\,\text{C}$</p>` },
        { id: 'PL3b', label: 'b)', be: 2, text: 'Berechnen Sie, nach welcher Zeit sich die Spannung halbiert hat.', nums: [{ label: 't_h in s', ans: 138.6, tol: 0.01 }],
          sol: m`<p>$\tfrac12=e^{-t/(R\cdot C)}\Rightarrow t_h=R\cdot C\cdot\ln2=200\,\text{s}\cdot0{,}693=139\,\text{s}$</p>` },
        { id: 'PL3c', label: 'c)', be: 3, text: m`Die Halbwertszeit soll $60\,\text{s}$ betragen. Bestimmen Sie den nötigen Widerstand bei gleichem $C$ bzw. die nötige Kapazität bei gleichem $R$.`,
          nums: [{ label: 'R in kΩ', ans: 865.6, tol: 0.01 }, { label: 'C in µF', ans: 43.28, tol: 0.01 }],
          sol: m`<p>$R=\dfrac{t_h}{C\ln2}=\dfrac{60}{100\cdot10^{-6}\cdot0{,}693}\,\Omega\approx8{,}7\cdot10^5\,\Omega$; $\ C=\dfrac{t_h}{R\ln2}=\dfrac{60}{2{,}0\cdot10^6\cdot0{,}693}\,\text{F}\approx43\,\mu\text{F}$</p>` },
        { id: 'PL3d', label: 'd)', be: 3, text: 'Der leere Kondensator wird über denselben Widerstand wieder an 50 V geladen. Berechnen Sie den Anfangsstrom und die Zeit, bis der Strom auf 1 % gefallen ist.',
          nums: [{ label: 'I₀ in µA', ans: 25, tol: 0.01 }, { label: 't in s', ans: 921, tol: 0.01 }],
          sol: m`<p>$I_0=\dfrac{U_0}R=\dfrac{50\,\text{V}}{2{,}0\cdot10^6\,\Omega}=25\,\mu\text{A}$; $\ 0{,}01=e^{-t/(R\cdot C)}\Rightarrow t=R\cdot C\cdot\ln100=200\,\text{s}\cdot4{,}61=921\,\text{s}\approx15\,\text{min}$</p><p><b>Rechner:</b> <code>solve(0.01=e^(-t/200),t)</code> ergibt $t=921$.</p>` }
      ]
    },
    {
      id: 'PL4', fach: F, groessen: [['R', '33 kΩ (± 5 %)'], ['tE', '36,4 s; 37,1 s; 35,9 s (gemessen)'], ['U0', 'Startspannung (Wert egal, kürzt sich)'], ['C', 'gesucht']],
      teil: 'B', lesson: 'PH9', title: 'Kapazität aus der Entladezeit (Messreihe)', afb: 'III', ops: 'Herleiten, Berechnen, Erläutern',
      intro: m`Ein Kondensator unbekannter Kapazität wird geladen und dann über $R=33\,\text{k}\Omega$ (Toleranz $\pm5\,\%$) entladen. Ein Voltmeter liegt parallel. Gemessen wird die Zeit $t_E$, in der die Spannung von $U_0$ auf $\tfrac13U_0$ fällt: $36{,}4\,\text{s}$; $37{,}1\,\text{s}$; $35{,}9\,\text{s}$.<br><span class="dim">Angelehnt an Zentralabitur Niedersachsen 2026 (Kontext Kondensator-Messung), eigene Werte.</span>`,
      parts: [
        { id: 'PL4a', label: 'a)', be: 4, text: m`Leiten Sie die Gleichung $C=\dfrac{t_E}{R\cdot\ln3}$ her.`,
          hints: ['Starte mit dem Entladegesetz für die Spannung.', m`Bei $t=t_E$ ist $U=\tfrac13U_0$. Einsetzen, durch $U_0$ teilen.`, m`$\ln\tfrac13=-\ln3$`],
          sol: m`<p><b>1. Entladegesetz:</b> $U(t)=U_0\,e^{-t/(RC)}$ (1 BE)</p><p><b>2. Messbedingung einsetzen:</b> Bei $t=t_E$ ist ein Drittel übrig: $\tfrac13U_0=U_0\,e^{-t_E/(RC)}$. Durch $U_0$ teilen: $\tfrac13=e^{-t_E/(RC)}$ (1 BE)</p><p><b>3. Logarithmieren:</b> $\ln\tfrac13=-\dfrac{t_E}{RC}$, und weil $\ln\tfrac13=-\ln3$: $\ln3=\dfrac{t_E}{RC}$ (1 BE)</p><p><b>4. Nach C umstellen:</b> $C=\dfrac{t_E}{R\ln3}$ (1 BE)</p>` },
        { id: 'PL4b', label: 'b)', be: 3, text: 'Berechnen Sie mit dem Mittelwert der Entladezeiten die Kapazität.',
          nums: [{ label: 'Mittelwert in s', ans: 36.47, tol: 0.005 }, { label: 'C in µF', ans: 1006, tol: 0.01 }],
          sol: m`<p><b>Mittelwert:</b> Drei Messungen, damit Zufallsfehler sich ausgleichen: $\bar t_E=\dfrac{36{,}4+37{,}1+35{,}9}{3}\,\text{s}=36{,}47\,\text{s}$</p><p><b>Einsetzen in a):</b> $C=\dfrac{36{,}47\,\text{s}}{33\,000\,\Omega\cdot1{,}0986}=1{,}01\cdot10^{-3}\,\text{F}\approx1{,}0\,\text{mF}$</p>` },
        { id: 'PL4c', label: 'c)', be: 3, text: 'Schätzen Sie die Messunsicherheit von C nach der im Unterricht vereinbarten Regel ab.',
          nums: [{ label: 'ΔC in µF', ans: 50.3, tol: 0.05 }],
          hints: ['Relative Unsicherheiten vergleichen: Streuung der Zeiten und Toleranz von R. Die größte zählt.'],
          sol: m`<p><b>Zeiten:</b> Die Messwerte weichen höchstens etwa $0{,}6\,\text{s}$ vom Mittelwert ab, relativ $\tfrac{0{,}6}{36{,}5}\approx1{,}7\,\%$.</p><p><b>Widerstand:</b> $\pm5\,\%$.</p><p><b>Regel:</b> Die größte relative Unsicherheit wird übernommen, also $5\,\%$: $\Delta C=0{,}05\cdot1{,}006\,\text{mF}\approx0{,}050\,\text{mF}$.</p><p><b>Ergebnis:</b> $C=(1{,}01\pm0{,}050)\,\text{mF}$.</p>` },
        { id: 'PL4d', label: 'd)', be: 4, text: 'Nennen Sie zwei weitere Einflussgrößen, die zu Unsicherheiten führen, und erläutern Sie ihre Auswirkung auf die berechnete Kapazität.',
          sol: m`<ul><li><b>Reaktionszeit beim Stoppen:</b> Start und Stopp per Hand, mal zu früh, mal zu spät → gemessene Zeiten streuen → C streut in beide Richtungen.</li><li><b>Innenwiderstand des Voltmeters:</b> Er liegt parallel zu R, der Kondensator entlädt sich zusätzlich über das Messgerät, also schneller → $t_E$ zu klein → berechnetes C zu klein.</li><li>Auch möglich: Ablesen des genauen Moments $U_0/3$, Leckströme des Kondensators (→ C zu klein).</li></ul><p>Je Einflussgröße 1 BE, je Auswirkung 1 BE.</p>` }
      ]
    },
    {
      id: 'PL5', fach: F, groessen: [['R','50 kΩ'],['t','0 bis 50 s'],['UC','Messwerte in der Tabelle'],['RC','gesucht'],['C','gesucht']], teil: 'B', lesson: 'PH9', title: 'Entladung auswerten: Linearisierung', afb: 'II', ops: 'Zeigen, Bestimmen',
      intro: m`Ein Kondensator wird über $R=50\,\text{k}\Omega$ entladen. Messreihe:<table class="mt-table" style="margin-top:10px"><tr><th>t in s</th><td>0</td><td>10</td><td>20</td><td>30</td><td>40</td><td>50</td></tr><tr><th>U in V</th><td>12,0</td><td>8,1</td><td>5,4</td><td>3,6</td><td>2,4</td><td>1,6</td></tr></table>`,
      parts: [
        { id: 'PL5a', label: 'a)', be: 2, text: 'Zeigen Sie mit Quotienten aufeinanderfolgender Messwerte, dass eine exponentielle Abnahme vorliegt.',
          sol: m`<p>$\dfrac{8{,}1}{12{,}0}=0{,}675$, $\dfrac{5{,}4}{8{,}1}=0{,}667$, $\dfrac{3{,}6}{5{,}4}=0{,}667$, $\dfrac{2{,}4}{3{,}6}=0{,}667$, $\dfrac{1{,}6}{2{,}4}=0{,}667$: In gleichen Zeitabständen fällt $U$ immer auf (fast) denselben Bruchteil. Das ist das Kennzeichen einer Exponentialfunktion.</p>` },
        { id: 'PL5b', label: 'b)', be: 4, text: m`Tragen Sie $\ln(U/\text{V})$ gegen $t$ auf, bestimmen Sie die Steigung (Regression) und daraus $R\cdot C$.`,
          nums: [{ label: 'R·C in s', ans: 24.77, tol: 0.03 }],
          hints: [m`$\ln U=\ln U_0-\dfrac{t}{R\cdot C}$: Gerade mit Steigung $-1/(R\cdot C)$.`, 'CAS: LinReg mit t-Liste und ln(U)-Liste.'],
          sol: m`<p>$\ln(U/\text{V})$: 2,485; 2,092; 1,686; 1,281; 0,875; 0,470. Die Punkte liegen auf einer Geraden. Lineare Regression: Steigung $m\approx-0{,}0404\,\tfrac1{\text{s}}$. Wegen $\ln U=\ln U_0-\tfrac{t}{R\cdot C}$ gilt $R\cdot C=-\tfrac1m\approx24{,}8\,\text{s}$.</p><ul><li>Werte und Diagramm (2 BE), Regression dokumentiert (1 BE), $R\cdot C$ (1 BE)</li></ul>` },
        { id: 'PL5c', label: 'c)', be: 2, text: 'Berechnen Sie die Kapazität des Kondensators.', nums: [{ label: 'C in µF', ans: 495.4, tol: 0.03 }],
          sol: m`<p>Aus $R\cdot C=24{,}8\,\text{s}$ folgt $C=\dfrac{24{,}8\,\text{s}}{R}=\dfrac{24{,}8\,\text{s}}{50\,000\,\Omega}\approx5{,}0\cdot10^{-4}\,\text{F}=0{,}50\,\text{mF}$</p>` }
      ]
    },
    {
      id: 'PL6', fach: F, groessen: [['U0','Quellenspannung (konstant)'],['R','Widerstand'],['C','Kapazität'],['I','Strom I(t)'],['Q','Ladung Q(t) auf dem Kondensator'],['UR','am Widerstand'],['UC','am Kondensator']], teil: 'B', lesson: 'PH9', title: 'Differentialgleichung des Ladevorgangs', afb: 'III', ops: 'Herleiten, Zeigen',
      intro: m`Ein Kondensator $C$ wird über einen Widerstand $R$ an einer Quelle mit der Spannung $U_0$ geladen (vgl. Infoblatt DGL).`,
      parts: [
        { id: 'PL6a', label: 'a)', be: 3, text: m`Stellen Sie mit der Maschenregel eine Gleichung für $I(t)$ und $Q(t)$ auf und leiten Sie daraus die Differentialgleichung $0=R\,\dot I(t)+\dfrac{I(t)}{C}$ her.`,
          sol: m`<p>Maschenregel: $U_0=U_R+U_C=R\,I(t)+\dfrac{Q(t)}C$ (1 BE). Ableiten nach $t$: $U_0$ ist konstant, $\dot Q=I$ (1 BE), also $0=R\,\dot I(t)+\dfrac{I(t)}C$ (1 BE).</p>` },
        { id: 'PL6b', label: 'b)', be: 3, text: m`Zeigen Sie, dass $I(t)=I_0\,e^{kt}$ die Gleichung mit $k=-\dfrac1{RC}$ löst, und begründen Sie $I_0=\dfrac{U_0}R$.`,
          sol: m`<p>$\dot I=kI_0e^{kt}$ einsetzen: $0=RkI_0e^{kt}+\dfrac{I_0e^{kt}}C$. Durch $I_0e^{kt}\ne0$ teilen: $0=Rk+\dfrac1C\Rightarrow k=-\dfrac1{RC}$. Bei $t=0$ ist der Kondensator leer, $U_C=0$, die ganze Spannung liegt an $R$: $I_0=U_0/R$.</p>` },
        { id: 'PL6c', label: 'c)', be: 2, text: m`Folgern Sie daraus $U_C(t)=U_0\,(1-e^{-t/(RC)})$.`,
          sol: m`<p>$U_C=U_0-U_R=U_0-R\,I(t)=U_0-R\cdot\dfrac{U_0}Re^{-t/(RC)}=U_0\,(1-e^{-t/(RC)})$</p>` }
      ]
    },
    // ---------------------------------------------------------------- PH10: Begründen mit Abhängigkeiten (eigene Aufgaben, angelehnt an Unterricht und Abi-Stil)
    {
      id: 'PB1', fach: F, groessen: [['d', 'wird auf ¼ verkleinert'], ['epsr', '3 (Glasplatte füllt den Raum aus)'], ['C', 'Faktor gesucht'], ['Q', 'Faktor gesucht'], ['U', 'Faktor gesucht'], ['E', 'Faktor gesucht'], ['W', 'Faktor gesucht']], teil: 'A', lesson: 'PH10', title: 'Plattenkondensator verändern: Faktoren begründen', afb: 'II', ops: 'Begründen, Bestimmen',
      intro: m`Ein Plattenkondensator mit Luft zwischen den Platten wird so verändert, dass der Plattenabstand auf ein Viertel sinkt und der Raum zwischen den Platten mit Glas ($\varepsilon_r=3$) gefüllt wird. Die Plattenfläche bleibt gleich. Betrachten Sie zwei Fälle.`,
      parts: [
        { id: 'PB1a', label: 'a)', be: 4, text: m`Der Kondensator bleibt <b>an der Spannungsquelle</b>. Bestimmen Sie die Faktoren, um die sich $C$, $Q$ und $E$ ändern, und begründen Sie jeweils mit der passenden Formel.`,
          nums: [{ label: 'Faktor C', ans: 12, tol: 0.01 }, { label: 'Faktor Q', ans: 12, tol: 0.01 }, { label: 'Faktor E', ans: 4, tol: 0.01 }],
          hints: [m`Was bleibt gleich? Die Quelle hält $U$ fest.`, m`$C\propto\dfrac{\varepsilon_r}{d}$, dann $Q=CU$ und $E=\dfrac Ud$.`],
          sol: m`<p>$U$ bleibt (Quelle) (1 BE). $C=\varepsilon_0\varepsilon_rA/d$: $\varepsilon_r$ ist 3-mal, $d$ ist $\tfrac14$, also $C\cdot3\cdot4=\mathbf{12}$-fach (1 BE). $Q=CU$ mit gleichem $U$: <b>12-fach</b> (1 BE). $E=U/d$: $d$ ist $\tfrac14$, also <b>4-fach</b>; das Glas ändert $E$ bei fester Spannung nicht (1 BE).</p>` },
        { id: 'PB1b', label: 'b)', be: 4, text: m`Der Kondensator wird <b>vorher von der Quelle getrennt</b>. Bestimmen Sie die Faktoren für $C$, $U$ und $E$ und begründen Sie.`,
          nums: [{ label: 'Faktor C', ans: 12, tol: 0.01 }, { label: 'Faktor U', ans: 0.0833, tol: 0.01 }, { label: 'Faktor E', ans: 0.3333, tol: 0.01 }],
          hints: [m`Abgetrennt: $Q$ bleibt.`, m`$U=\dfrac QC$; $E=\dfrac Ud$ mit neuem $U$ und neuem $d$.`],
          sol: m`<p>$Q$ bleibt, die Ladung kann nirgendwohin (1 BE). $C$ wie in a): <b>12-fach</b> (1 BE). $U=Q/C$: <b>$\tfrac1{12}$</b> (1 BE). $E=U/d$: $\dfrac{1/12}{1/4}=\tfrac13$, also <b>$\tfrac13$</b>. Kontrolle mit $E=\dfrac{\sigma}{\varepsilon_0\varepsilon_r}$: $\sigma=Q/A$ bleibt, $\varepsilon_r=3$ gibt $\tfrac13$; der Abstand spielt keine Rolle (1 BE).</p>` },
        { id: 'PB1c', label: 'c)', be: 4, text: m`Um welchen Faktor ändert sich die gespeicherte Energie in a) und in b)? Erläutern Sie in je einem Satz, woher die Energie kommt oder wohin sie geht.`,
          nums: [{ label: 'Faktor E_el in a)', ans: 12, tol: 0.01 }, { label: 'Faktor E_el in b)', ans: 0.0833, tol: 0.01 }],
          hints: [m`a) $E_\text{el}=\tfrac12CU^2$ mit gleichem $U$. b) $E_\text{el}=\dfrac{Q^2}{2C}$ mit gleichem $Q$.`],
          sol: m`<p>a) $E_\text{el}=\tfrac12CU^2$, $U$ gleich, $C$ 12-fach: <b>12-fach</b> (1 BE). Die Quelle liefert zusätzliche Ladung und damit Energie (1 BE). b) $E_\text{el}=\dfrac{Q^2}{2C}$, $Q$ gleich, $C$ 12-fach: <b>$\tfrac1{12}$</b> (1 BE). Die Energie sinkt: Die Platten und das Glas werden vom Feld hineingezogen, das Feld leistet Arbeit (z. B. Wärme oder Bewegungsenergie) (1 BE).</p>` }
      ]
    },
    {
      id: 'PB2', fach: F, groessen: [['UB', '800 V, dann 3200 V'], ['UAbl', '100 V (bleibt)'], ['l', '6,0 cm (bleibt)'], ['d', '2,0 cm (bleibt)'], ['e', '1,602·10⁻¹⁹ C'], ['me', '9,109·10⁻³¹ kg'], ['v0', 'vorher und Faktor'], ['y', 'am Plattenende, vorher und nachher']], teil: 'B', lesson: 'PH10', title: 'Röhre: Beschleunigungsspannung vervierfachen', afb: 'II', ops: 'Berechnen, Begründen',
      intro: m`${KONST}<p>Elektronen werden mit $U_B=800\,\text{V}$ beschleunigt und durchlaufen ein Plattenpaar (Länge $l=6{,}0\,\text{cm}$, Abstand $d=2{,}0\,\text{cm}$) mit der Spannung $U_A=100\,\text{V}$. Danach wird $U_B$ auf $3200\,\text{V}$ erhöht. Alles andere bleibt.</p>`,
      parts: [
        { id: 'PB2a', label: 'a)', be: 3, text: m`Berechnen Sie $v_0$ für $U_B=800\,\text{V}$ und geben Sie den Faktor an, um den sich $v_0$ bei $3200\,\text{V}$ ändert.`,
          nums: [{ label: 'v₀ in 10⁷ m/s', ans: 1.677, tol: 0.01 }, { label: 'Faktor', ans: 2, tol: 0.01 }],
          hints: [m`$eU_B=\tfrac12m_ev_0^2$ nach $v_0$ umstellen.`],
          sol: m`<p>$v_0=\sqrt{\dfrac{2eU_B}{m_e}}=\sqrt{\dfrac{2\cdot1{,}602\cdot10^{-19}\cdot800}{9{,}109\cdot10^{-31}}}\,\tfrac ms=1{,}68\cdot10^7\,\tfrac ms$ (2 BE). Bei vierfachem $U_B$: $\sqrt4=2$, also doppelt so schnell (1 BE).</p>` },
        { id: 'PB2b', label: 'b)', be: 4, text: m`Berechnen Sie die Ablenkung $y$ am Plattenende vorher und nachher. Treffen die Elektronen jeweils eine Platte?`,
          nums: [{ label: 'y vorher in mm', ans: 5.625, tol: 0.01 }, { label: 'y nachher in mm', ans: 1.406, tol: 0.01 }],
          hints: [m`$y=\dfrac{U_A\,l^2}{4\,d\,U_B}$ (Herleitung in Lektion 7). Eine Platte wird getroffen, wenn $y>\dfrac d2$.`],
          sol: m`<p>$y=\dfrac{U_Al^2}{4dU_B}$: vorher $\dfrac{100\cdot0{,}060^2}{4\cdot0{,}020\cdot800}\,\text{m}=5{,}6\cdot10^{-3}\,\text{m}$ (1 BE); nachher $1{,}4\,\text{mm}$ (1 BE), also ein Viertel. Der Strahl startet in der Mitte, die Platte ist $\dfrac d2=10\,\text{mm}$ entfernt: weder vorher noch nachher wird eine Platte getroffen (2 BE).</p>` },
        { id: 'PB2c', label: 'c)', be: 3, text: m`Begründen Sie, mit welcher Plattenspannung $U_A'$ man nach der Erhöhung auf $3200\,\text{V}$ wieder dieselbe Ablenkung wie vorher erreicht.`,
          nums: [{ label: 'U_A\' in V', ans: 400, tol: 0.01 }],
          hints: [m`$y\propto\dfrac{U_A}{U_B}$: Das Verhältnis muss gleich bleiben.`],
          sol: m`<p>Aus $y=\dfrac{U_Al^2}{4dU_B}$ folgt: $y$ bleibt gleich, wenn $\dfrac{U_A}{U_B}$ gleich bleibt (1 BE). $U_B$ ist 4-fach, also muss $U_A$ 4-fach sein (1 BE): $U_A'=400\,\text{V}$ (1 BE).</p>` }
      ]
    },
    {
      id: 'PB3', fach: F, groessen: [['x', '2,0 cm bis 8,0 cm (Weg im Feld)'], ['y', '1,5 mm bis 24,0 mm (Ablenkung)'], ['UB', '1000 V'], ['UAbl', '600 V'], ['d', '4,0 cm']], teil: 'B', lesson: 'PH10', title: 'Messwerte der Ablenkung auswerten', afb: 'II', ops: 'Ermitteln, Begründen',
      intro: m`Für eine Röhre mit $U_B=1000\,\text{V}$, $U_A=600\,\text{V}$ und Plattenabstand $d=4{,}0\,\text{cm}$ wurde die Ablenkung $y$ nach der Strecke $x$ im Feld gemessen (Aufgabe eigene Zahlen, nicht aus dem Abitur).
<table><tr><th>$x$ in cm</th><td>2,0</td><td>4,0</td><td>6,0</td><td>8,0</td></tr><tr><th>$y$ in mm</th><td>1,5</td><td>6,0</td><td>13,5</td><td>24,0</td></tr></table>`,
      parts: [
        { id: 'PB3a', label: 'a)', be: 3, text: m`Stellen Sie eine Vermutung zum Zusammenhang auf und prüfen Sie sie durch Quotientenbildung. Geben Sie die konstante Größe in mm/cm² an.`,
          nums: [{ label: 'y/x² in mm/cm²', ans: 0.375, tol: 0.01 }],
          hints: [m`Wenn $x$ verdoppelt wird, wird $y$ vervierfacht (1,5 → 6,0). Was ist dann konstant?`],
          sol: m`<p>Vermutung: $y\sim x^2$, denn $x$ doppelt (2→4 cm) gibt $y$ vierfach (1,5→6,0 mm) (1 BE). Quotienten $\dfrac y{x^2}$: $0{,}375;\ 0{,}375;\ 0{,}375;\ 0{,}375\,\tfrac{\text{mm}}{\text{cm}^2}$ (1 BE). Konstant, also $y=0{,}375\,\tfrac{\text{mm}}{\text{cm}^2}\cdot x^2$ (1 BE).</p>` },
        { id: 'PB3b', label: 'b)', be: 2, text: m`Berechnen Sie damit die Ablenkung bei $x=5{,}0\,\text{cm}$.`,
          nums: [{ label: 'y in mm', ans: 9.375, tol: 0.01 }],
          hints: [m`$y=k\cdot x^2$ mit $x$ in cm.`],
          sol: m`<p>$y=0{,}375\,\tfrac{\text{mm}}{\text{cm}^2}\cdot(5{,}0\,\text{cm})^2=9{,}4\,\text{mm}$ (2 BE).</p>` },
        { id: 'PB3c', label: 'c)', be: 4, text: m`Begründen Sie den quadratischen Zusammenhang theoretisch und berechnen Sie $k$ aus den Daten der Röhre in der Einheit 1/m.`,
          nums: [{ label: 'k in 1/m', ans: 3.75, tol: 0.01 }],
          hints: [m`$x=v_0t$ und $y=\tfrac12at^2$ verbinden, dann $v_0^2=\dfrac{2eU_B}{m_e}$ und $a=\dfrac{eU_A}{m_ed}$ einsetzen.`],
          sol: m`<p>Waagerecht gleichförmig: $t=x/v_0$. Senkrecht gleichmäßig beschleunigt: $y=\tfrac12at^2=\tfrac12a\dfrac{x^2}{v_0^2}$, also $y\propto x^2$ (2 BE). Mit $a=\dfrac{eU_A}{m_ed}$ und $v_0^2=\dfrac{2eU_B}{m_e}$: $y=\dfrac{U_A}{4dU_B}x^2$ (1 BE), $k=\dfrac{600}{4\cdot0{,}040\cdot1000}\,\tfrac1{\text m}=3{,}75\,\tfrac1{\text m}=0{,}375\,\tfrac{\text{mm}}{\text{cm}^2}$. Das stimmt mit der Messung überein (1 BE).</p>` }
      ]
    },
    // ---------------------------------------------------------------- PH11: Taschenrechner
    {
      id: 'PT1', fach: F, groessen: [['U0', '12 V'], ['t', '0 bis 40 s'], ['I', 'Messwerte in µA'], ['RC', 'gesucht'], ['Q', 'Q₀ gesucht'], ['C', 'gesucht'], ['R', 'gesucht']], teil: 'B', lesson: 'PH11', title: 'Entladekurve mit dem Taschenrechner auswerten', afb: 'II', ops: 'Ermitteln, Bestimmen',
      intro: m`Ein Kondensator wurde mit $U_0=12\,\text{V}$ geladen und über einen Widerstand entladen. Gemessen wurde die Stromstärke:
<table><tr><th>$t$ in s</th><td>0</td><td>10</td><td>20</td><td>30</td><td>40</td></tr><tr><th>$I$ in µA</th><td>120</td><td>80,4</td><td>53,9</td><td>36,1</td><td>24,2</td></tr></table>`,
      parts: [
        { id: 'PT1a', label: 'a)', be: 3, text: m`Führen Sie eine passende Regression durch (Art begründen) und geben Sie $I_0$ und $R\cdot C$ an.`,
          nums: [{ label: 'I₀ in µA', ans: 120, tol: 0.02 }, { label: 'R·C in s', ans: 25, tol: 0.02 }],
          hints: ['Bei gleichen Zeitschritten sinkt I jeweils um denselben Faktor. Welche Funktionsart?', m`ExpReg: $I=a\cdot b^t$, $R\cdot C=-1/\ln b$.`],
          sol: m`<p>Der Strom fällt bei gleichen Zeitschritten um denselben Faktor ($80{,}4/120\approx53{,}9/80{,}4\approx0{,}67$): Exponentialfunktion, Exponentialregression (1 BE). Ergebnis $I(t)=120\,\mu\text{A}\cdot0{,}9608^{\,t/\text{s}}$ (1 BE). $R\cdot C=-\dfrac1{\ln0{,}9608}=25\,\text{s}$ (1 BE).</p>` },
        { id: 'PT1b', label: 'b)', be: 3, text: m`Bestimmen Sie die Ladung $Q_0$ des Kondensators vor dem Entladen mit $\int I\,dt$.`,
          nums: [{ label: 'Q₀ in mC', ans: 3.0, tol: 0.03 }],
          hints: [m`$Q_0=\int_0^\infty I_0e^{-t/(R\cdot C)}\,dt=I_0\cdot R\cdot C$.`],
          sol: m`<p>Die Ladung, die beim Entladen durch den Widerstand fließt, ist die Fläche unter der Kurve: $Q_0=\int_0^\infty I\,dt$ (1 BE) $=I_0\cdot R\cdot C=120\,\mu\text{A}\cdot25\,\text{s}=3000\,\mu\text{C}=3{,}0\,\text{mC}$ (2 BE).</p>` },
        { id: 'PT1c', label: 'c)', be: 4, text: m`Bestimmen Sie $C$ und $R$ und prüfen Sie, ob $R\cdot C$ zu Teil a) passt.`,
          nums: [{ label: 'C in µF', ans: 250, tol: 0.03 }, { label: 'R in kΩ', ans: 100, tol: 0.03 }],
          hints: [m`$C=\dfrac{Q_0}{U_0}$, $R=\dfrac{U_0}{I_0}$.`],
          sol: m`<p>$C=\dfrac{Q_0}{U_0}=\dfrac{3{,}0\,\text{mC}}{12\,\text{V}}=250\,\mu\text{F}$ (1 BE). $R=\dfrac{U_0}{I_0}=\dfrac{12\,\text{V}}{120\,\mu\text{A}}=100\,\text{k}\Omega$ (1 BE). Kontrolle: $RC=10^5\,\Omega\cdot2{,}5\cdot10^{-4}\,\text{F}=25\,\text{s}$, das passt zum Wert aus a) (2 BE).</p>` }
      ]
    },
    // ---------------------------------------------------------------- Probeklausur 2 (nur die Themen der Klausur 2, 12.11.)
    {
      id: 'PQ1', fach: F, groessen: ['UB', 'UAbl'], teil: 'A', lesson: 'PH6', title: 'Braunsche Röhre: Aufbau und Verschaltung', afb: 'I', ops: 'Nennen, Beschreiben, Begründen',
      intro: m`Eine Braunsche Röhre (Elektronenstrahlröhre) wird mit drei Spannungen betrieben: der Heizspannung, der Beschleunigungsspannung $U_B$ und der Ablenkspannung $U_A$.<br><span class="dim">Eigene Aufgabe im Stil der Klausur, Stoff: Themenliste der Lehrkraft.</span>`,
      parts: [
        { id: 'PQ1a', label: 'a)', be: 3, text: 'Nennen Sie, wo die drei Spannungen angeschlossen sind und wozu sie dienen.',
          hints: ['Drei Stromkreise: Glühwendel, Kathode gegen Anode, Ablenkplatten.'],
          sol: m`<ul><li><b>Heizspannung $U_H$</b> (z. B. $6{,}3\,\text{V}$): an der Glühwendel. Sie heizt die Kathode, aus der heißen Kathode treten Elektronen aus (1 BE).</li><li><b>Beschleunigungsspannung $U_B$</b>: zwischen Kathode (Minuspol) und Anode (Pluspol). Sie beschleunigt die Elektronen (1 BE).</li><li><b>Ablenkspannung $U_A$</b>: an den beiden Ablenkplatten. Sie erzeugt ein elektrisches Querfeld, das den Strahl zur Seite lenkt (1 BE).</li></ul><p>Der Wehnelt-Zylinder liegt negativ gegen die Kathode und bündelt den Strahl.</p>` },
        { id: 'PQ1b', label: 'b)', be: 3, text: 'Beschreiben Sie den Weg eines Elektrons von der Kathode bis zum Schirm.',
          sol: m`<p>Die heiße Kathode sendet Elektronen aus (1 BE). Der Wehnelt-Zylinder bündelt sie zu einem Strahl, die Spannung $U_B$ beschleunigt sie zur Anode, durch deren Loch sie hindurchfliegen (1 BE). Danach fliegen sie geradlinig mit konstanter Geschwindigkeit zwischen den Ablenkplatten hindurch, werden dort quer zur Flugrichtung abgelenkt und treffen auf den Leuchtschirm, der an der Auftreffstelle aufleuchtet (1 BE).</p>` },
        { id: 'PQ1c', label: 'c)', be: 2, text: 'Die obere Ablenkplatte ist negativ, die untere positiv geladen. In welche Richtung wird der Strahl abgelenkt? Begründen Sie.',
          sol: m`<p>Nach <b>unten</b> (1 BE). Elektronen sind negativ geladen und werden zur positiven Platte hingezogen, von der negativen abgestoßen (1 BE).</p>` },
        { id: 'PQ1d', label: 'd)', be: 2, text: 'Warum muss in der Röhre ein Vakuum herrschen?',
          sol: m`<p>Sonst stoßen die Elektronen mit Luftmolekülen zusammen: Sie würden gestreut und abgebremst, es gäbe keinen scharfen Strahl (1 BE). Außerdem würde die glühende Kathode in Luft verbrennen (1 BE).</p>` }
      ]
    },
    {
      id: 'PQ2', fach: F, groessen: [['UB', '1,8 kV = 1800 V'], ['e', '1,602·10⁻¹⁹ C'], ['me', '9,109·10⁻³¹ kg'], ['v0', 'gesucht']], teil: 'B', lesson: 'PH6', title: 'Beschleunigung der Elektronen: v₀ herleiten und berechnen', afb: 'II', ops: 'Herleiten, Berechnen, Begründen',
      intro: m`Die Elektronen einer Braunschen Röhre treten praktisch in Ruhe aus der Kathode aus und werden durch die Beschleunigungsspannung $U_B=1{,}8\,\text{kV}$ beschleunigt.`,
      parts: [
        { id: 'PQ2a', label: 'a)', be: 4, text: m`Leiten Sie die Gleichung $v_0=\sqrt{\dfrac{2\,e\,U_B}{m_e}}$ für die Geschwindigkeit nach dem Durchlaufen der Spannung her.`,
          hints: [m`Energieerhaltung: Die elektrische Energie $\Delta E=e\,U_B$ steckt danach in der Bewegungsenergie $\tfrac12m_ev_0^2$ (Formelsammlung S. 24 und S. 17).`],
          sol: m`<p><b>Ansatz:</b> Start in Ruhe, also ist die Bewegungsenergie am Ende gleich der zugeführten Energie: $e\cdot U_B=\tfrac12m_e\,v_0^2$ (2 BE, davon 1 BE für die Begründung „Start in Ruhe“).</p><p>$e\cdot U_B=\tfrac12m_e\,v_0^2\qquad\big|\cdot2$</p><p>$2\,e\,U_B=m_e\,v_0^2\qquad\big|:m_e$</p><p>$v_0^2=\dfrac{2\,e\,U_B}{m_e}\qquad\big|\sqrt{\ }$</p><p>$v_0=\sqrt{\dfrac{2\,e\,U_B}{m_e}}$ (2 BE für die Umformung)</p>` },
        { id: 'PQ2b', label: 'b)', be: 2, text: 'Berechnen Sie die Geschwindigkeit der Elektronen.',
          nums: [{ label: 'v₀ in 10⁷ m/s', ans: 2.516, tol: 0.01 }],
          sol: m`<p>$v_0=\sqrt{\dfrac{2\cdot1{,}602\cdot10^{-19}\,\text{C}\cdot1800\,\text{V}}{9{,}109\cdot10^{-31}\,\text{kg}}}=2{,}52\cdot10^{7}\,\tfrac{\text m}{\text s}$, das sind etwa $8{,}4\,\%$ der Lichtgeschwindigkeit.</p>` },
        { id: 'PQ2c', label: 'c)', be: 2, text: 'Wie groß ist die Bewegungsenergie eines Elektrons nach der Beschleunigung, in Joule und in Elektronvolt?',
          nums: [{ label: 'E_kin in 10⁻¹⁶ J', ans: 2.884, tol: 0.01 }, { label: 'E_kin in eV', ans: 1800, tol: 0.01 }],
          sol: m`<p>$E_\text{kin}=e\cdot U_B=1{,}602\cdot10^{-19}\,\text{C}\cdot1800\,\text{V}=2{,}88\cdot10^{-16}\,\text{J}$. In Elektronvolt gilt: $1\,\text{eV}=e\cdot1\,\text{V}$, also $E_\text{kin}=1800\,\text{eV}$ (je 1 BE).</p>` },
        { id: 'PQ2d', label: 'd)', be: 2, text: 'Die Beschleunigungsspannung wird vervierfacht. Wie ändert sich die Geschwindigkeit? Begründen Sie mit der Formel.',
          sol: m`<p>Sie verdoppelt sich. Aus $v_0=\sqrt{\dfrac{2eU_B}{m_e}}$ folgt $v_0\propto\sqrt{U_B}$ (1 BE). Vierfache Spannung: Faktor $\sqrt4=2$, also $v_0=5{,}03\cdot10^{7}\,\tfrac{\text m}{\text s}$ (1 BE). Die Spannung steigt auf das Vierfache, die Energie auch, aber die Geschwindigkeit nur auf das Doppelte.</p>` }
      ]
    },
    {
      id: 'PQ3', fach: F, groessen: [['U', '600 V'], ['d', '4,0 cm = 0,040 m'], ['e', '1,602·10⁻¹⁹ C'], ['me', '9,109·10⁻³¹ kg'], ['E', 'gesucht'], ['F', 'gesucht'], ['a', 'gesucht'], ['v0', 'Endgeschwindigkeit, gesucht'], ['t', 'Flugzeit, gesucht']], teil: 'B', lesson: 'PH6', title: 'Elektron im Plattenkondensator: Kraft, Beschleunigung, Endgeschwindigkeit', afb: 'II', ops: 'Berechnen, Vergleichen, Begründen',
      intro: m`Ein Elektron startet in Ruhe an der negativen Platte eines Plattenkondensators ($d=4{,}0\,\text{cm}$, $U=600\,\text{V}$, homogenes Feld, Vakuum) und fliegt längs der Feldlinien zur positiven Platte. Die Gewichtskraft darf vernachlässigt werden.`,
      parts: [
        { id: 'PQ3a', label: 'a)', be: 3, text: 'Berechnen Sie die Feldstärke zwischen den Platten und die Kraft auf das Elektron.',
          nums: [{ label: 'E in kV/m', ans: 15, tol: 0.01 }, { label: 'F in 10⁻¹⁵ N', ans: 2.403, tol: 0.01 }],
          hints: [m`$E=\dfrac Ud$ (Formelsammlung S. 25), $F=e\cdot E$.`],
          sol: m`<p>$E=\dfrac Ud=\dfrac{600\,\text V}{0{,}040\,\text m}=1{,}5\cdot10^{4}\,\tfrac{\text V}{\text m}$ (1 BE)</p><p>$F=e\cdot E=1{,}602\cdot10^{-19}\,\text C\cdot1{,}5\cdot10^{4}\,\tfrac{\text V}{\text m}=2{,}40\cdot10^{-15}\,\text N$ (2 BE)</p>` },
        { id: 'PQ3b', label: 'b)', be: 2, text: 'Berechnen Sie die Beschleunigung des Elektrons.',
          nums: [{ label: 'a in 10¹⁵ m/s²', ans: 2.638, tol: 0.01 }],
          sol: m`<p>$F=m_e\cdot a$ (Formelsammlung S. 14), also $a=\dfrac{F}{m_e}=\dfrac{2{,}403\cdot10^{-15}\,\text N}{9{,}109\cdot10^{-31}\,\text{kg}}=2{,}64\cdot10^{15}\,\tfrac{\text m}{\text s^2}$.</p>` },
        { id: 'PQ3c', label: 'c)', be: 3, text: 'Bestimmen Sie die Geschwindigkeit am Ende der Strecke $d$ mit den Bewegungsgleichungen und prüfen Sie das Ergebnis mit der Energie.',
          nums: [{ label: 'v in 10⁷ m/s', ans: 1.453, tol: 0.01 }],
          hints: [m`Gleichmäßig beschleunigt aus der Ruhe: $d=\tfrac12at^2$ und $v=a\cdot t$ (S. 15). Aus der ersten Gleichung $t$, dann in die zweite.`],
          sol: m`<p>$d=\tfrac12at^2\ \Rightarrow\ t=\sqrt{\dfrac{2d}{a}}$, und $v=a\,t=\sqrt{2\,a\,d}=\sqrt{2\cdot2{,}638\cdot10^{15}\,\tfrac{\text m}{\text s^2}\cdot0{,}040\,\text m}=1{,}45\cdot10^{7}\,\tfrac{\text m}{\text s}$ (2 BE).</p><p><b>Kontrolle mit der Energie:</b> $v=\sqrt{\dfrac{2eU}{m_e}}=\sqrt{\dfrac{2\cdot1{,}602\cdot10^{-19}\cdot600}{9{,}109\cdot10^{-31}}}\,\tfrac{\text m}{\text s}=1{,}45\cdot10^{7}\,\tfrac{\text m}{\text s}$. Beide Wege stimmen überein (1 BE).</p>` },
        { id: 'PQ3d', label: 'd)', be: 2, text: 'Berechnen Sie die Zeit, die das Elektron für die Strecke $d$ braucht.',
          nums: [{ label: 't in ns', ans: 5.507, tol: 0.01 }],
          sol: m`<p>$t=\dfrac va=\dfrac{1{,}453\cdot10^{7}\,\text m/\text s}{2{,}638\cdot10^{15}\,\text m/\text s^2}=5{,}5\cdot10^{-9}\,\text s=5{,}5\,\text{ns}$.</p>` },
        { id: 'PQ3e', label: 'e)', be: 2, text: 'Der Plattenabstand wird bei gleicher Spannung verdoppelt. Wie ändern sich Beschleunigung, Endgeschwindigkeit und Flugzeit? Begründen Sie.',
          sol: m`<p>$E=\dfrac Ud$ halbiert sich, damit auch $F=eE$ und $a$: Die Beschleunigung halbiert sich (1 BE). Die Endgeschwindigkeit bleibt gleich, denn $v=\sqrt{2eU/m_e}$ hängt nur von der durchlaufenen Spannung ab. Weil die Beschleunigung nur halb so groß ist, aber die gleiche Geschwindigkeit erreicht werden soll, dauert es doppelt so lang: $t=v/a$ verdoppelt sich (1 BE).</p>` }
      ]
    },
    {
      id: 'PQ4', fach: F, groessen: [['A', '20 cm · 20 cm = 0,040 m²'], ['d', '1,5 mm = 0,0015 m'], ['U', '500 V'], ['C', 'gesucht'], ['Q', 'gesucht'], ['E', 'Feldstärke, gesucht'], ['W', 'gespeicherte Energie, gesucht']], teil: 'B', lesson: 'PH3', title: 'Plattenkondensator: berechnen, Dielektrikum, Anwendung', afb: 'II', ops: 'Berechnen, Begründen, Nennen',
      intro: m`Ein Plattenkondensator hat quadratische Platten mit $20\,\text{cm}$ Kantenlänge im Abstand $d=1{,}5\,\text{mm}$ (Luft, $\varepsilon_r\approx1$). Er wird an $U=500\,\text{V}$ angeschlossen und aufgeladen.`,
      parts: [
        { id: 'PQ4a', label: 'a)', be: 2, text: 'Berechnen Sie die Kapazität.',
          nums: [{ label: 'C in pF', ans: 236.1, tol: 0.01 }],
          hints: [m`$C=\varepsilon_0\varepsilon_r\dfrac Ad$ (Formelsammlung S. 27). $A=0{,}20\,\text m\cdot0{,}20\,\text m$.`],
          sol: m`<p>$C=\varepsilon_0\varepsilon_r\dfrac Ad=8{,}854\cdot10^{-12}\,\tfrac{\text{As}}{\text{Vm}}\cdot1\cdot\dfrac{0{,}040\,\text m^2}{0{,}0015\,\text m}=2{,}36\cdot10^{-10}\,\text F=236\,\text{pF}$</p>` },
        { id: 'PQ4b', label: 'b)', be: 3, text: 'Berechnen Sie die Ladung auf einer Platte und die Feldstärke zwischen den Platten.',
          nums: [{ label: 'Q in nC', ans: 118.05, tol: 0.01 }, { label: 'E in kV/m', ans: 333.3, tol: 0.01 }],
          sol: m`<p>$Q=C\cdot U=2{,}361\cdot10^{-10}\,\text F\cdot500\,\text V=1{,}18\cdot10^{-7}\,\text C=118\,\text{nC}$ (S. 27, 1 BE)</p><p>$E=\dfrac Ud=\dfrac{500\,\text V}{0{,}0015\,\text m}=3{,}3\cdot10^{5}\,\tfrac{\text V}{\text m}$ (S. 25, 2 BE)</p>` },
        { id: 'PQ4c', label: 'c)', be: 2, text: 'Wie viel elektrische Energie ist im Kondensator gespeichert?',
          nums: [{ label: 'E_el in µJ', ans: 29.51, tol: 0.01 }],
          sol: m`<p>$E_\text{el}=\tfrac12CU^2=\tfrac12\cdot2{,}361\cdot10^{-10}\,\text F\cdot(500\,\text V)^2=2{,}95\cdot10^{-5}\,\text J=29{,}5\,\mu\text J$ (Formelsammlung S. 27).</p>` },
        { id: 'PQ4d', label: 'd)', be: 4, text: m`Der Kondensator wird von der Quelle getrennt. Danach füllt man den Zwischenraum vollständig mit Glas ($\varepsilon_r=4$). Bestimmen Sie die neue Spannung und die neue Energie und erklären Sie, warum die Energie sinkt.`,
          nums: [{ label: 'U in V', ans: 125, tol: 0.01 }, { label: 'E_el in µJ', ans: 7.378, tol: 0.01 }],
          hints: ['Getrennt: Was bleibt gleich? Wie ändert sich C mit εᵣ?'],
          sol: m`<p><b>Was bleibt?</b> Abgetrennt kann keine Ladung weg: $Q=1{,}18\cdot10^{-7}\,\text C$ bleibt (1 BE).</p><p><b>C:</b> $C\propto\varepsilon_r$, also vierfach. Dann $U=\dfrac QC$ wird ein Viertel: $U=125\,\text V$ (1 BE).</p><p><b>Energie:</b> $E_\text{el}=\dfrac{Q^2}{2C}$, bei gleichem $Q$ und vierfachem $C$ ein Viertel: $7{,}4\,\mu\text J$ (1 BE).</p><p><b>Erklärung:</b> Das Feld zieht das Dielektrikum in den Kondensator hinein und verrichtet dabei Arbeit. Die fehlende Energie hat das Glas als Bewegungsenergie bzw. in der Polarisation aufgenommen (1 BE).</p>` },
        { id: 'PQ4e', label: 'e)', be: 1, text: 'Nennen Sie eine Anwendung des Kondensators und die Eigenschaft, die dabei genutzt wird.',
          sol: m`<p>Zum Beispiel Blitzgerät: Der Kondensator speichert Energie und gibt sie in sehr kurzer Zeit mit hoher Leistung wieder ab. Auch möglich: Energiespeicher in Netzteilen zum Glätten der Spannung, Touchscreen (Kapazitätsänderung).</p>` }
      ]
    },
    {
      id: 'PQ5', fach: F, groessen: [['C', '2200 µF = 2,2·10⁻³ F'], ['R', '4,7 kΩ = 4700 Ω'], ['U0', '15 V'], ['RC', 'gesucht'], ['I0', 'gesucht'], ['th', 'gesucht'], ['UC', 'nach 20 s beim Entladen, gesucht'], ['t', 'gesucht']], teil: 'B', lesson: 'PH8', title: 'Laden und Entladen: Schaltung, Produkt R·C, Zeit gesucht', afb: 'II', ops: 'Beschreiben, Herleiten, Berechnen, Begründen',
      intro: m`Ein Kondensator ($C=2200\,\mu\text F$) wird über einen Widerstand $R=4{,}7\,\text{k}\Omega$ an eine Quelle mit $U_0=15\,\text V$ angeschlossen und aufgeladen. Danach wird er über denselben Widerstand entladen.`,
      parts: [
        { id: 'PQ5a', label: 'a)', be: 3, text: 'Beschreiben Sie die Schaltung mit den Messgeräten für Strom und Spannung und sagen Sie, was man zum Entladen tun muss.',
          sol: m`<p>Quelle, Umschalter, Widerstand und Kondensator in Reihe. Das Amperemeter liegt in Reihe im Zweig mit $C$ und $R$, das Voltmeter parallel zum Kondensator (2 BE).</p><p>Zum Entladen den Umschalter umlegen: Die Quelle wird abgetrennt, und die beiden Platten werden über den Widerstand leitend verbunden. Der Strom fließt dann in die Gegenrichtung (1 BE).</p>` },
        { id: 'PQ5b', label: 'b)', be: 3, text: m`Berechnen Sie das Produkt $R\cdot C$, den Anfangsstrom beim Laden und die Halbwertszeit.`,
          nums: [{ label: 'R·C in s', ans: 10.34, tol: 0.01 }, { label: 'I₀ in mA', ans: 3.191, tol: 0.01 }, { label: 't_h in s', ans: 7.167, tol: 0.01 }],
          hints: [m`$R\cdot C$; $I_0=\dfrac{U_0}{R}$ (kein Eintrag in der Formelsammlung, aus $R=U/I$); $t_h=R\cdot C\cdot\ln2$.`],
          sol: m`<p>$R\cdot C=4700\,\Omega\cdot2{,}2\cdot10^{-3}\,\text F=10{,}34\,\text s$ (1 BE)</p><p>$I_0=\dfrac{U_0}{R}=\dfrac{15\,\text V}{4700\,\Omega}=3{,}19\cdot10^{-3}\,\text A=3{,}19\,\text{mA}$: Am Anfang ist der Kondensator leer, die ganze Spannung liegt am Widerstand (1 BE).</p><p>$t_h=R\cdot C\cdot\ln2=10{,}34\,\text s\cdot0{,}693=7{,}17\,\text s$ (1 BE)</p>` },
        { id: 'PQ5c', label: 'c)', be: 3, text: 'Der Kondensator ist voll geladen und wird nun entladen. Berechnen Sie die Spannung am Kondensator und den Betrag der Stromstärke $20\,\text s$ nach Beginn des Entladens.',
          nums: [{ label: 'U_C in V', ans: 2.168, tol: 0.01 }, { label: '|I| in mA', ans: 0.4613, tol: 0.01 }],
          hints: [m`Entladen: $U_C=U_0\,e^{-t/(RC)}$ und $I=-I_0\,e^{-t/(RC)}$ (Formelsammlung S. 27). Erst den Exponenten $-t/(R\cdot C)$ ausrechnen.`],
          sol: m`<p>Exponent: $-\dfrac{t}{R\cdot C}=-\dfrac{20\,\text s}{10{,}34\,\text s}=-1{,}934$, und $e^{-1{,}934}=0{,}1445$ (1 BE).</p><p>$U_C=15\,\text V\cdot0{,}1445=2{,}17\,\text V$ (1 BE)</p><p>$I=-3{,}19\,\text{mA}\cdot0{,}1445=-0{,}461\,\text{mA}$, der Betrag ist $0{,}46\,\text{mA}$. Das Minus heißt: Gegenrichtung zum Ladestrom (1 BE).</p>` },
        { id: 'PQ5d', label: 'd)', be: 4, text: m`Leiten Sie aus dem Entladegesetz die Gleichung $t=R\cdot C\cdot\ln\dfrac{U_0}{U_C}$ her und berechnen Sie damit, nach welcher Zeit die Spannung auf $1{,}0\,\text V$ gefallen ist.`,
          nums: [{ label: 't in s', ans: 28.0, tol: 0.01 }],
          hints: [m`$U_C=U_0e^{-t/(R\cdot C)}$. Durch $U_0$ teilen, dann $\ln$ auf beiden Seiten.`],
          sol: m`<p>$U_C=U_0\,e^{-t/(R\cdot C)}\qquad\big|:U_0$</p><p>$\dfrac{U_C}{U_0}=e^{-t/(R\cdot C)}\qquad\big|\ln$</p><p>$\ln\dfrac{U_C}{U_0}=-\dfrac{t}{R\cdot C}\qquad\big|\cdot(-R\cdot C)$</p><p>$t=-R\cdot C\cdot\ln\dfrac{U_C}{U_0}=R\cdot C\cdot\ln\dfrac{U_0}{U_C}$ (3 BE, weil $-\ln\dfrac ab=\ln\dfrac ba$)</p><p>Zahlen: $t=10{,}34\,\text s\cdot\ln\dfrac{15\,\text V}{1{,}0\,\text V}=10{,}34\,\text s\cdot2{,}708=28{,}0\,\text s$ (1 BE)</p><p><b>Rechner:</b> <code>solve(1.0=15*e^(-t/(4700*2.2*10^(-3))),t)</code> ergibt $t=28{,}0$.</p>` },
        { id: 'PQ5e', label: 'e)', be: 2, text: 'Der Widerstand wird verdoppelt. Wie ändern sich Anfangsstrom, das Produkt R·C und die insgesamt beim Entladen abfließende Ladung? Begründen Sie.',
          sol: m`<p>$I_0=\dfrac{U_0}{R}$ halbiert sich, $R\cdot C$ verdoppelt sich: Der Strom ist kleiner, dafür dauert alles doppelt so lange (1 BE). Die Ladung $Q_0=C\cdot U_0$ hängt nicht von $R$ ab und bleibt gleich: Es fließt dieselbe Ladung, nur langsamer (1 BE).</p>` }
      ]
    },
    {
      id: 'PQ6', fach: F, groessen: [['C', '100 µF'], ['U', '4,0 kV = 4000 V'], ['W', 'gesucht'], ['Q', 'gesucht'], ['t', '8,0 ms = 0,0080 s Entladedauer'], ['P', 'gesucht'], ['I', 'gesucht']], teil: 'B', lesson: 'PH1', title: 'Defibrillator: Energie, Leistung, Stromstärke', afb: 'II', ops: 'Berechnen, Begründen',
      intro: m`Ein Defibrillator speichert Energie in einem Kondensator mit $C=100\,\mu\text F$, der auf $U=4{,}0\,\text{kV}$ geladen wird. Bei einem Stromstoß entlädt er sich in $8{,}0\,\text{ms}$ über den Patienten.`,
      parts: [
        { id: 'PQ6a', label: 'a)', be: 2, text: 'Berechnen Sie die im Kondensator gespeicherte Energie.',
          nums: [{ label: 'E_el in J', ans: 800, tol: 0.01 }],
          sol: m`<p>$E_\text{el}=\tfrac12CU^2=\tfrac12\cdot100\cdot10^{-6}\,\text F\cdot(4000\,\text V)^2=800\,\text J$ (Formelsammlung S. 27).</p>` },
        { id: 'PQ6b', label: 'b)', be: 3, text: 'Berechnen Sie die mittlere Leistung und die mittlere Stromstärke während des Stromstoßes.',
          nums: [{ label: 'P in kW', ans: 100, tol: 0.01 }, { label: 'I in A', ans: 50, tol: 0.01 }],
          hints: [m`$P=\dfrac{\Delta E}{\Delta t}$ (S. 18). Für den Strom die Ladung $Q=C\cdot U$ und $I=\dfrac{\Delta Q}{\Delta t}$ (S. 23).`],
          sol: m`<p>$P=\dfrac{E_\text{el}}{t}=\dfrac{800\,\text J}{0{,}0080\,\text s}=1{,}0\cdot10^{5}\,\text W=100\,\text{kW}$ (1 BE)</p><p>$Q=C\cdot U=100\cdot10^{-6}\,\text F\cdot4000\,\text V=0{,}40\,\text C$ (1 BE), $I=\dfrac Qt=\dfrac{0{,}40\,\text C}{0{,}0080\,\text s}=50\,\text A$ (1 BE)</p>` },
        { id: 'PQ6c', label: 'c)', be: 2, text: 'Der Kondensator wird mit einer Ladeleistung von $5{,}0\,\text W$ aufgeladen (Verluste vernachlässigt). Wie lange dauert das?',
          nums: [{ label: 't in s', ans: 160, tol: 0.01 }],
          sol: m`<p>$E_\text{el}=P\cdot t\ \Rightarrow\ t=\dfrac{E_\text{el}}{P}=\dfrac{800\,\text J}{5{,}0\,\text W}=160\,\text s$ (Formelsammlung S. 24: $\Delta E=P\cdot\Delta t$).</p>` },
        { id: 'PQ6d', label: 'd)', be: 2, text: 'Die Energie ist beim Laden und beim Entladen gleich. Warum ist die Leistung beim Entladen trotzdem viel größer?',
          sol: m`<p>$P=\dfrac{E_\text{el}}{t}$: Bei gleicher Energie ist die Leistung umgekehrt proportional zur Zeit (1 BE). Das Entladen dauert $8{,}0\,\text{ms}$ statt $160\,\text s$, also $20\,000$-mal kürzer, daher ist die Leistung $20\,000$-mal größer (1 BE).</p>` }
      ]
    }
  ];

  // ======================================================================
  // PROBEKLAUSUR (fest) und SPICKZETTEL
  // ======================================================================
  const PROBES = [
    { id: 'PK2', fach: F, titel: 'Probeklausur Klausur 2: nur die Themen der Lehrkraft', tasks: ['PQ1', 'PQ2', 'PQ3', 'PQ4', 'PQ5', 'PQ6'], minuten: 90 },
    { id: 'PK1', fach: F, titel: 'Zusatz-Probeklausur (enthält auch die Ablenkung, die nicht verlangt wird)', tasks: ['PE1', 'PL2', 'PP1', 'PC2', 'PW1', 'PR3', 'PL4'], minuten: 90 }
  ];

  const SPICK = m`<p class="dim">Du musst <b>keine Formel auswendig lernen</b>: Die Formelsammlung ist in der Klausur erlaubt. Hinter jeder Formel steht, ob sie dort drinsteht (und auf welcher Seite) oder ob du sie selbst herleiten musst. Schreibweise wie im Unterricht: elektrische <b>Energie $E_\text{el}$</b> (nicht $W$), Feldstärke $E$. In der Formelsammlung heißen beide $E$, achte auf die Erklärung rechts daneben.</p>
<h3>Spannung, Energie, Potential</h3>
<ul><li>$U=\dfrac{E_\text{el}}Q$, $E_\text{el}=QU$ ${FS('S. 24 (ΔE = q·U)')}</li><li>$1\,\text{eV}=1{,}602\cdot10^{-19}\,\text{J}$ ${FSN('Umrechnung: e · 1 V')}</li><li>$P=UI$, $E_\text{el}=P\cdot t$ ${FS('S. 24')}; $I=\dfrac{\Delta Q}{\Delta t}$ ${FS('S. 23')}; $1\,\text{mAh}=3{,}6\,\text{C}$ ${FSN('rechnen: 0,001 A · 3600 s')}</li><li>$U_{AB}=\varphi_B-\varphi_A$, $E=\dfrac Ud$, homogen $\varphi=E\cdot x$ ${FS('S. 25')}; Feldlinien ⟂ Äquipotentiallinien (Wissen)</li></ul>
<h3>Kondensator</h3>
<ul><li>$C=\dfrac QU$, $C=\varepsilon_0\varepsilon_r\dfrac Ad$ ${FS('S. 27')}; $\sigma=\dfrac QA=\varepsilon_0\varepsilon_rE$ ${FS('S. 25')}</li><li><b>An der Quelle:</b> $U$ fest. <b>Abgetrennt:</b> $Q$ fest ($E$ bleibt beim Auseinanderziehen). ${FSN('Denkregel, steht nirgends')}</li><li>$E_\text{el}=\tfrac12CU^2$ ${FS('S. 27')}; $E_\text{el}=\tfrac12QU=\dfrac{Q^2}{2C}$ ${FSN('mit Q = C·U selbst umformen')}</li><li>parallel $C=C_1+C_2$, Reihe $\tfrac1C=\tfrac1{C_1}+\tfrac1{C_2}$ ${FS('S. 27')}</li></ul>
<h3>Braunsche Röhre</h3>
<ul><li>Glühkathode → Wehnelt → Anode (Loch) → Ablenkplatten → Schirm, Vakuum (Wissen)</li><li>Ansatz $eU_B=\tfrac12m_ev_0^2$: $E_\text{kin}=\tfrac12mv^2$ ${FS('S. 17')}, $\Delta E=qU$ ${FS('S. 24')}; $v_0=\sqrt{2eU_B/m_e}$ ${FSN('herleiten')}</li><li>$x=v_0t$, $y=\tfrac12at^2$ ${FS('S. 15')}; $a=\dfrac{eU}{m_ed}$ ${FSN('herleiten: F = m·a S. 14, E = U/d S. 25')}</li><li>Bahngleichung $y=\dfrac{Ux^2}{4dU_B}$ ${FSN('herleiten')}; $\tan\alpha=\dfrac{Ul}{2dU_B}$, $Y=y(l)+L\tan\alpha$ ${FSN('herleiten')}; Platte getroffen, wenn $y>\tfrac d2$</li></ul>
<h3>Auf- und Entladen</h3>
<ul><li>Laden und Entladen: $U_C(t)$, $I(t)$, $Q(t)$ mit $e^{-t/(R\cdot C)}$ ${FS('S. 27')}</li><li><b>Zeit gesucht:</b> Formel von S. 27 mit Zahlen aufschreiben, im Rechner <code>solve(…, t)</code>; von Hand $e^{\ldots}$ isolieren und $\ln$ nehmen</li><li>$t_h=R\cdot C\cdot\ln2$ ${FSN('herleiten')}; bis $U_0/3$: $C=\dfrac{t_E}{R\ln3}$ ${FSN('herleiten, Startformel S. 27')}</li><li><b>Maschenregel</b> $\sum U_i=0$ ${FS('S. 24')}: Laden $U_0=U_R+U_C$; Entladen $U_C+U_R=0$ (also $|U_R|=U_C$); Differenzialgleichung $U_0=RI+\tfrac QC$ ${FS('S. 27')}</li><li>Linearisierung: $\ln(U/U_0)$ gegen $t$, Steigung $-1/(R\cdot C)$ (Wissen)</li><li>Messunsicherheit: größte relative Unsicherheit übernehmen, 2 signifikante Stellen (IServ-Blatt „Runden und Messunsicherheit“)</li></ul>
<h3>Begründen und Taschenrechner</h3>
<ul><li>Begründung = <b>was bleibt gleich · Formel · Faktor · Satz mit „weil“</b>; die Formeln dafür stehen oben (mit Seite).</li><li>$C\propto\dfrac{\varepsilon_rA}d$, $v_0\propto\sqrt{U_B}$, $y\propto\dfrac{U_A}{dU_B}x^2$, Zeit im Exponenten $R\cdot C\propto R$ und $\propto C$, $I_0=\dfrac{U_0}R$ ($Q_0=CU_0$ hängt nicht von $R$ ab)</li><li>Rechner: <code>ExpReg</code> ($a\cdot b^t$, $R\cdot C=-1/\ln b$), $Q=\int I\,dt=I_0\cdot R\cdot C$ ${FS('S. 23')}</li></ul>
<p class="dim">Konstanten ($e$, $m_e$, $\varepsilon_0$): Tabelle „Tabellierte Werte“ am Ende der Formelsammlung (S. 46, Foto fehlt, bitte nachsehen). Werte im Portal: $e=1{,}602\cdot10^{-19}\,\text{C}$, $m_e=9{,}109\cdot10^{-31}\,\text{kg}$, $\varepsilon_0=8{,}854\cdot10^{-12}\,\tfrac{\text{As}}{\text{Vm}}$</p>`;

  window.LR_LESSONS = (window.LR_LESSONS || []).concat(LESSONS);
  window.LR_TASKS = (window.LR_TASKS || []).concat(TASKS);
  window.LR_PROBES = (window.LR_PROBES || []).concat(PROBES);
  window.LR_SPICK = Object.assign(window.LR_SPICK || {}, { physik: SPICK });
})();
