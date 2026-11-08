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
  const KONST = m`<p class="dim" style="font-size:14px">Konstanten: $e=1{,}602\cdot10^{-19}\,\text{C}$, $m_e=9{,}109\cdot10^{-31}\,\text{kg}$, $\varepsilon_0=8{,}854\cdot10^{-12}\,\tfrac{\text{As}}{\text{Vm}}$</p>`;

  // ======================================================================
  // LEKTIONEN
  // ======================================================================
  const LESSONS = [
    // ---------------------------------------------------------------- Ordner: Spannung, Energie, Potential
    {
      id: 'PH1', fach: F, num: 1, min: 12, demo: 'p-energie', demoTitel: 'Schau zuerst: Ein Teilchen fällt durchs Feld',
      title: 'Spannung = Energie pro Ladung',
      short: 'W = Q·U, Elektronvolt, Leistung P = U·I, Akku-Angaben',
      idee: m`<p>Ein elektrisches Feld schiebt Ladungen an. Dabei wird Energie umgewandelt. Die <b>Spannung</b> sagt, wie viel Energie <b>pro Ladung</b> zwischen zwei Punkten frei wird (oder nötig ist).</p>
${merke('Merke', m`$$U=\frac{W}{Q}\qquad\Longleftrightarrow\qquad W=Q\cdot U\qquad [U]=1\,\text{V}=1\,\tfrac{\text{J}}{\text{C}}$$`)}
<p>Für ein Elektron ($Q=e$) rechnet man gern in <b>Elektronvolt</b>: Durchläuft es 1 V, gewinnt es $1\,\text{eV}=1{,}602\cdot10^{-19}\,\text{J}$. Bei 500 V also 500 eV.</p>
<p><b>Leistung</b> ist Energie pro Zeit: $P=\dfrac{W}{t}=U\cdot I$. Und weil $I=\dfrac{Q}{t}$, ist $W=U\cdot I\cdot t$.</p>`,
      bild: m`<p>Spannung ist wie eine <b>Höhe</b>, Ladung wie die <b>Masse</b> eines Balls. Wie viel Energie frei wird, hängt von beidem ab: $W=Q\cdot U$ ist wie $W=m\cdot g\cdot h$.</p>`,
      rezept: [
        m`<b>Energie aus Spannung:</b> $W=Q\cdot U$. Für Elektronen: $W$ in eV hat denselben Zahlenwert wie $U$ in V.`,
        m`<b>eV ↔ J:</b> mal bzw. geteilt durch $1{,}602\cdot10^{-19}$.`,
        m`<b>Leistung:</b> $P=U\cdot I$, Energie $W=P\cdot t$ (Zeit in s, dann kommt J heraus).`,
        m`<b>Akku-Angabe „mAh“ ist eine Ladung:</b> $Q=I\cdot t$, $1\,\text{mAh}=0{,}001\,\text{A}\cdot3600\,\text{s}=3{,}6\,\text{C}$. Energie erst mit $W=Q\cdot U$.`
      ],
      beispiel: {
        q: m`Ein Akku trägt die Aufschrift <b>1,2 V / 2000 mAh</b>. Wie lange kann man damit eine Lampe (1,2 V / 0,40 A) betreiben, und wie viel Energie ist gespeichert?`,
        steps: [
          { h: 'mAh als Ladung lesen', t: m`$Q=2000\,\text{mA}\cdot1\,\text{h}=2{,}0\,\text{A}\cdot3600\,\text{s}=7200\,\text{C}$` },
          { h: 'Gespeicherte Energie', t: m`$W=Q\cdot U=7200\,\text{C}\cdot1{,}2\,\text{V}=8640\,\text{J}\approx8{,}6\,\text{kJ}$` },
          { h: 'Betriebsdauer', t: m`$t=\dfrac{Q}{I}=\dfrac{7200\,\text{C}}{0{,}40\,\text{A}}=18\,000\,\text{s}=5{,}0\,\text{h}$` },
          { h: 'Antwortsatz', t: 'Die Lampe leuchtet etwa 5 Stunden, der Akku speichert rund 8,6 kJ.' }
        ]
      },
      fehler: [
        m`„2000 mAh ist die Energie.“ Nein: mAh ist <b>Ladung</b>. Energie gibt es erst mit der Spannung: $W=Q\cdot U$.`,
        m`eV und J verwechseln: $1\,\text{eV}$ ist winzig ($1{,}6\cdot10^{-19}\,\text{J}$). Im Endergebnis immer die Einheit dazuschreiben.`,
        m`Spannung „an einem Punkt“: Spannung gibt es immer <b>zwischen zwei</b> Punkten. Für einen Punkt sagt man Potential (Lektion 2).`
      ],
      test: [
        { q: m`Welche Energie gewinnt ein Elektron beim Durchlaufen von 300 V?`, a: m`$300\,\text{eV}=300\cdot1{,}602\cdot10^{-19}\,\text{J}\approx4{,}8\cdot10^{-17}\,\text{J}$` },
        { q: m`Was bedeutet $1\,\text{V}$ in Energie und Ladung?`, a: m`$1\,\text{V}=1\,\text{J/C}$: Pro Coulomb Ladung wird 1 Joule umgesetzt.` },
        { q: 'Was gibt die Angabe „2500 mAh“ auf einem Akku an?', a: m`Die Ladung, die er liefern kann: $Q=2{,}5\,\text{A}\cdot3600\,\text{s}=9000\,\text{C}$.` },
        { q: m`Zwei Formeln für die Leistung?`, a: m`$P=\dfrac{W}{t}$ und $P=U\cdot I$.` }
      ]
    },
    {
      id: 'PH2', fach: F, num: 2, min: 14, demo: 'p-potential', demoTitel: 'Probier es aus: die Potentialsonde',
      title: 'Potential und Äquipotentiallinien',
      short: 'φ als „Höhe“ eines Punktes, Potentialsonde, E = Δφ/Δx',
      idee: m`<p>Das <b>Potential</b> $\varphi$ ist die Energie pro Ladung <b>an einem Punkt</b>, gemessen gegenüber einem Bezugspunkt (meist die negative Platte oder die Erde, dort $\varphi=0$).</p>
${merke('Merke', m`$$U_{AB}=\varphi_B-\varphi_A\qquad\text{homogenes Feld: }\ \varphi(x)=E\cdot x,\quad E=\frac{U}{d}=\frac{\Delta\varphi}{\Delta x}$$`)}
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
        { q: 'Warum wird entlang einer Äquipotentiallinie keine Arbeit verrichtet?', a: m`Weil $\Delta\varphi=0$, also $W=Q\cdot\Delta\varphi=0$. Die Kraft steht senkrecht zur Bewegung.` },
        { q: m`$\varphi_A=4\,\text{V}$, $\varphi_B=10\,\text{V}$. Wie groß ist $U_{AB}$?`, a: m`$U_{AB}=\varphi_B-\varphi_A=6\,\text{V}$` },
        { q: m`Wie sieht das $\varphi$-$x$-Diagramm im homogenen Feld aus?`, a: m`Eine Gerade durch den Ursprung, Steigung $=E$.` },
        { q: 'Wie misst man E im Randfeld näherungsweise?', a: m`Zwei nahe Punkte senkrecht zu den Äquipotentiallinien, $E\approx\Delta\varphi/\Delta s$.` }
      ]
    },

    // ---------------------------------------------------------------- Ordner: Kondensator
    {
      id: 'PH3', fach: F, num: 3, min: 15, demo: 'p-platten', demoTitel: 'Probier es aus: Platten verschieben, Glas einschieben',
      title: 'Kapazität und Plattenkondensator',
      short: 'C = Q/U, C = ε₀·εᵣ·A/d, an der Quelle oder abgetrennt',
      idee: m`<p>Ein Kondensator speichert Ladung: $+Q$ auf der einen, $-Q$ auf der anderen Platte. Die <b>Kapazität</b> sagt, wie viel Ladung pro Volt draufpasst.</p>
${merke('Merke', m`$$C=\frac{Q}{U}\qquad C=\varepsilon_0\,\varepsilon_r\,\frac{A}{d}\qquad E=\frac{U}{d}\qquad \sigma=\frac{Q}{A}=\varepsilon_0\,\varepsilon_r\,E$$`)}
<p>Größere Fläche $A$, kleinerer Abstand $d$, ein <b>Dielektrikum</b> (Isolator mit $\varepsilon_r>1$, z. B. Glas, Getreide) zwischen den Platten: alles macht $C$ größer.</p>`,
      bild: m`<p>Die wichtigste Frage in jeder Aufgabe: <b>Hängt der Kondensator noch an der Quelle?</b> Dann bleibt $U$ fest und $Q$ ändert sich. <b>Abgetrennt?</b> Dann kann keine Ladung weg, $Q$ bleibt fest und $U$ ändert sich.</p>`,
      rezept: [
        m`<b>Einheiten in SI:</b> $A$ in m² (1 cm² = $10^{-4}$ m²), $d$ in m (1 mm = $10^{-3}$ m). $1\,\text{pF}=10^{-12}\,\text{F}$, $1\,\mu\text{F}=10^{-6}\,\text{F}$.`,
        m`<b>Kapazität</b> aus der Geometrie: $C=\varepsilon_0\varepsilon_r\dfrac{A}{d}$.`,
        m`<b>Quelle oder getrennt?</b> Festhalten, was konstant bleibt ($U$ oder $Q$).`,
        m`<b>Rest</b> über $Q=C\cdot U$ und $E=U/d$ ausrechnen. Kurz begründen, was steigt/sinkt.`
      ],
      beispiel: {
        q: m`Quadratische Platten, 20 cm × 20 cm, Abstand 4,0 mm, Luft. Der Kondensator liegt an 500 V. Berechne $C$, $Q$, $E$ und $\sigma$.`,
        steps: [
          { h: 'Einheiten', t: m`$A=0{,}20\,\text{m}\cdot0{,}20\,\text{m}=0{,}040\,\text{m}^2$, $d=0{,}0040\,\text{m}$, $\varepsilon_r=1$` },
          { h: 'Kapazität', t: m`$C=\varepsilon_0\dfrac{A}{d}=8{,}854\cdot10^{-12}\cdot\dfrac{0{,}040}{0{,}0040}\,\text{F}=8{,}85\cdot10^{-11}\,\text{F}=88{,}5\,\text{pF}$` },
          { h: 'Ladung', t: m`$Q=C\cdot U=8{,}85\cdot10^{-11}\,\text{F}\cdot500\,\text{V}=4{,}43\cdot10^{-8}\,\text{C}$` },
          { h: 'Feldstärke und Flächenladungsdichte', t: m`$E=\dfrac{U}{d}=\dfrac{500\,\text{V}}{0{,}0040\,\text{m}}=1{,}25\cdot10^{5}\,\tfrac{\text{V}}{\text{m}}$, $\sigma=\dfrac{Q}{A}=1{,}11\cdot10^{-6}\,\tfrac{\text{C}}{\text{m}^2}$` }
        ]
      },
      fehler: [
        m`mm und cm² nicht umgerechnet. Das ist der häufigste Fehler beim Plattenkondensator (Faktor 1000 oder 10 000 daneben).`,
        m`Beim Auseinanderziehen eines <b>abgetrennten</b> Kondensators angenommen, $U$ bleibe gleich. Richtig: $Q$ bleibt, $C$ sinkt, also steigt $U$. $E=\sigma/\varepsilon_0$ bleibt gleich.`,
        m`„$C$ hängt von $U$ ab.“ Nein: $C$ hängt nur vom Bau ab ($A$, $d$, $\varepsilon_r$). Doppelte Spannung ergibt doppelte Ladung, $C$ bleibt.`
      ],
      test: [
        { q: m`Formel für die Kapazität eines Plattenkondensators?`, a: m`$C=\varepsilon_0\,\varepsilon_r\,\dfrac{A}{d}$` },
        { q: 'Abgetrennter Kondensator, Abstand verdoppelt: Was passiert mit Q, C, U, E?', a: m`$Q$ bleibt, $C$ halbiert, $U$ verdoppelt, $E$ bleibt gleich.` },
        { q: 'An der Quelle, Glasplatte eingeschoben: Was passiert mit Q?', a: m`$C$ steigt um den Faktor $\varepsilon_r$, $U$ bleibt, also steigt $Q=C\cdot U$ um $\varepsilon_r$.` },
        { q: m`Was ist $\sigma$ und wie hängt es mit $E$ zusammen?`, a: m`Flächenladungsdichte $\sigma=Q/A$, es gilt $\sigma=\varepsilon_0\varepsilon_r E$.` }
      ]
    },
    {
      id: 'PH4', fach: F, num: 4, min: 10, demo: 'p-energiec', demoTitel: 'Schau zu: Laden, Paket für Paket',
      title: 'Energie im Kondensator',
      short: 'W = ½·C·U², Fläche im U-Q-Diagramm, Blitzgerät',
      idee: m`<p>Beim Laden muss jede weitere Ladung gegen die Spannung geschoben werden, die schon da ist. Die Spannung wächst dabei von 0 bis $U$. Im $U$-$Q$-Diagramm ist die gespeicherte Energie die <b>Dreiecksfläche</b>.</p>
${merke('Merke', m`$$W=\tfrac12\,Q\cdot U=\tfrac12\,C\cdot U^2=\frac{Q^2}{2C}$$`)}
<p>Doppelte Spannung bedeutet <b>vierfache</b> Energie. Kondensatoren können ihre Energie in sehr kurzer Zeit abgeben: hohe <b>Leistung</b> $P=W/t$ (Blitzgerät, Defibrillator).</p>`,
      bild: m`<p>Wie ein Wasserturm, der von unten befüllt wird: Die ersten Liter sind leicht hochzupumpen, die letzten müssen gegen den vollen Druck. Im Mittel zählt nur die halbe Endhöhe, darum das $\tfrac12$.</p>`,
      rezept: [
        m`$C$ in F (µF $\to\cdot10^{-6}$), $U$ in V einsetzen: $W=\tfrac12CU^2$ in J.`,
        m`Leistung beim Entladen: $\bar P=\dfrac{W}{t}$ (bzw. nur der genutzte Anteil, z. B. 20 % Licht).`,
        m`Gesucht ist $C$ für eine Energie? Umstellen: $C=\dfrac{2W}{U^2}$.`
      ],
      beispiel: {
        q: m`Ein Blitzgerät-Kondensator ($200\,\mu\text{F}$) wird auf $320\,\text{V}$ geladen und entlädt sich in $2{,}0\,\text{ms}$. Berechne die Energie und die mittlere Leistung.`,
        steps: [
          { h: 'Energie', t: m`$W=\tfrac12CU^2=\tfrac12\cdot200\cdot10^{-6}\,\text{F}\cdot(320\,\text{V})^2=10{,}24\,\text{J}\approx10\,\text{J}$` },
          { h: 'Mittlere Leistung', t: m`$\bar P=\dfrac{W}{t}=\dfrac{10{,}24\,\text{J}}{0{,}0020\,\text{s}}=5120\,\text{W}\approx5{,}1\,\text{kW}$` },
          { h: 'Deuten', t: 'Kurzzeitig über 5 kW, aus einem kleinen Akku geladen: Der Kondensator sammelt die Energie langsam und gibt sie schlagartig ab.' }
        ]
      },
      fehler: [
        m`$W=Q\cdot U$ statt $\tfrac12QU$ benutzt. Das wäre richtig, wenn die volle Spannung von Anfang an da wäre (Ladung im Feld), nicht beim Laden.`,
        m`µF nicht umgerechnet: $200\,\mu\text{F}=2{,}00\cdot10^{-4}\,\text{F}$.`,
        m`$U^2$ vergessen: doppelte Spannung → vierfache Energie.`
      ],
      test: [
        { q: 'Drei Formeln für die Energie im Kondensator?', a: m`$W=\tfrac12QU=\tfrac12CU^2=\dfrac{Q^2}{2C}$` },
        { q: m`Warum steht dort $\tfrac12$?`, a: 'Beim Laden wächst die Spannung von 0 an mit, die Fläche im U-Q-Diagramm ist ein Dreieck.' },
        { q: 'Spannung verdreifacht. Energie?', a: 'Neunmal so groß (W ∝ U²).' }
      ]
    },
    {
      id: 'PH5', fach: F, num: 5, min: 10, demo: 'p-schaltung', demoTitel: 'Probier es aus: parallel oder in Reihe',
      title: 'Kondensatoren schalten',
      short: 'Parallel: C addieren. Reihe: 1/C addieren. Vergleich mit Widerständen',
      idee: m`<p><b>Parallel</b> liegt an allen Kondensatoren dieselbe Spannung, die Ladungen addieren sich: wie eine größere Plattenfläche. <b>In Reihe</b> tragen alle dieselbe Ladung (die Mittelstücke sind zusammen neutral), die Spannungen addieren sich: wie ein größerer Plattenabstand.</p>
${merke('Merke', m`$$\text{parallel: } C=C_1+C_2\qquad\text{Reihe: }\frac1C=\frac1{C_1}+\frac1{C_2}$$`)}
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
      id: 'PH6', fach: F, num: 6, min: 12, demo: 'p-roehre', demoTitel: 'Schau zuerst: die Röhre in Betrieb',
      title: 'Braunsche Röhre: Elektronen erzeugen und beschleunigen',
      short: 'Glühelektrischer Effekt, Wehnelt-Zylinder, e·U_B = ½·m·v²',
      idee: m`<p><b>Glühelektrischer Effekt:</b> Aus einer geheizten Kathode treten Elektronen aus, weil sie genug Energie bekommen, um die Bindung an das Metall (Austrittsenergie) zu überwinden. Kalt tritt fast nichts aus.</p>
<p>Der <b>Wehnelt-Zylinder</b> (negativ gegenüber der Kathode) bündelt die Elektronen. Zwischen Kathode und <b>Anode</b> beschleunigt die Spannung $U_B$ sie, durch ein Loch fliegen sie mit konstanter Geschwindigkeit weiter bis zum <b>Leuchtschirm</b>. Alles im <b>Vakuum</b>, damit sie nicht mit Luftmolekülen stoßen.</p>
${merke('Energieerhaltung', m`$$e\cdot U_B=\tfrac12\,m_e\,v_0^2\qquad\Longrightarrow\qquad v_0=\sqrt{\frac{2\,e\,U_B}{m_e}}$$`)}`,
      bild: m`<p>Wie eine Kugel, die eine Rampe hinunterrollt: Die Höhe ($U_B$) bestimmt die Endgeschwindigkeit. Vierfache Höhe ergibt nur doppelte Geschwindigkeit ($v\sim\sqrt{U_B}$).</p>`,
      rezept: [
        m`Ansatz hinschreiben: elektrische Energie = kinetische Energie, $eU_B=\tfrac12m_ev_0^2$.`,
        m`Nach $v_0$ umstellen und einsetzen (Konstanten aus der Formelsammlung).`,
        m`Rückwärts: gesucht $U_B$? $U_B=\dfrac{m_ev_0^2}{2e}$.`,
        'Funktion beschreiben: Glühkathode → Wehnelt (bündeln) → Anode mit Loch (beschleunigen) → Ablenkung → Schirm, Vakuum.'
      ],
      beispiel: {
        q: m`Elektronen werden mit $U_B=1{,}5\,\text{kV}$ beschleunigt. Berechne ihre Geschwindigkeit.`,
        steps: [
          { h: 'Ansatz', t: m`$e\,U_B=\tfrac12m_ev_0^2\ \Rightarrow\ v_0=\sqrt{\dfrac{2eU_B}{m_e}}$` },
          { h: 'Einsetzen', t: m`$v_0=\sqrt{\dfrac{2\cdot1{,}602\cdot10^{-19}\,\text{C}\cdot1500\,\text{V}}{9{,}109\cdot10^{-31}\,\text{kg}}}=2{,}30\cdot10^{7}\,\tfrac{\text{m}}{\text{s}}$` },
          { h: 'Einordnen', t: m`Das sind etwa 8 % der Lichtgeschwindigkeit. Die klassische Rechnung ist hier noch gut genug.` }
        ]
      },
      fehler: [
        m`$v\sim U_B$ angenommen. Richtig ist $v\sim\sqrt{U_B}$.`,
        'Glühelektrischer Effekt mit Photoeffekt verwechselt: Hier liefert die Heizung die Energie, nicht Licht.',
        'Vergessen zu sagen, warum Vakuum nötig ist (sonst Stöße mit Gasmolekülen, Strahl wird gestreut und abgeschwächt).'
      ],
      test: [
        { q: 'Warum braucht die Braunsche Röhre eine Heizung?', a: 'Glühelektrischer Effekt: Nur aus heißem Metall treten genügend Elektronen aus (Austrittsenergie).' },
        { q: m`Formel für die Geschwindigkeit nach der Beschleunigung?`, a: m`$v_0=\sqrt{2eU_B/m_e}$` },
        { q: 'Warum fließt in einer Glühdiode nur in einer Richtung Strom?', a: 'Nur die geheizte Elektrode gibt Elektronen ab. Ist die Gegenelektrode negativ, werden sie zurückgedrängt.' },
        { q: 'Wozu dient der Wehnelt-Zylinder?', a: 'Er ist negativ gegenüber der Kathode und bündelt (fokussiert) den Elektronenstrahl.' }
      ]
    },
    {
      id: 'PH7', fach: F, num: 7, min: 16, demo: 'p-ablenkung', demoTitel: 'Probier es aus: Strahl ablenken',
      title: 'Ablenkung im Querfeld',
      short: 'Parabelbahn wie beim waagerechten Wurf, y = U·x²/(4·d·U_B)',
      idee: m`<p>Zwischen den Ablenkplatten zieht die Feldkraft $F=e\cdot\dfrac{U}{d}$ das Elektron senkrecht zur Flugrichtung. Die zwei Bewegungen laufen <b>unabhängig</b> voneinander ab:</p>
<ul><li><b>waagerecht</b>: gleichförmig, $x=v_0\,t$</li><li><b>senkrecht</b>: gleichmäßig beschleunigt, $y=\tfrac12a\,t^2$ mit $a=\dfrac{eU}{m_ed}$</li></ul>
${merke('Bahngleichung (Parabel)', m`$$y(x)=\frac12\cdot\frac{e}{m_e}\cdot\frac{U}{d}\cdot\frac{x^2}{v_0^2}\qquad\text{mit } v_0^2=\frac{2eU_B}{m_e}:\qquad y(x)=\frac{U\,x^2}{4\,d\,U_B}$$`)}
<p>Hinter den Platten wirkt keine Kraft mehr: Das Elektron fliegt <b>geradeaus</b> weiter, mit dem Austrittswinkel $\tan\alpha=\dfrac{v_y}{v_0}=\dfrac{U\,l}{2\,d\,U_B}$.</p>`,
      bild: m`<p>Genau wie ein Ball, der waagerecht vom Tisch rollt: vorwärts konstant, nach unten immer schneller. Statt der Schwerkraft wirkt hier die elektrische Kraft.</p>
${achtung('Wichtig fürs Erläutern', m`<p>In $y=\dfrac{Ux^2}{4dU_B}$ kommt $e/m_e$ nicht mehr vor. Wer nur $U_B$, $U$, $d$ und die Ablenkung misst, kann damit <b>nicht</b> die spezifische Ladung $e/m_e$ bestimmen.</p>`)}`,
      rezept: [
        m`$v_0$ aus der Beschleunigung: $v_0=\sqrt{2eU_B/m_e}$.`,
        m`Zeit im Feld: $t=l/v_0$. Beschleunigung: $a=\dfrac{eU}{m_ed}$.`,
        m`Ablenkung am Plattenende: $y=\tfrac12at^2$ (oder direkt $y=\dfrac{Ul^2}{4dU_B}$).`,
        m`Auftreffpunkt auf dem Schirm (Abstand $L$ hinter den Platten): $Y=y+L\cdot\tan\alpha$ mit $\tan\alpha=\dfrac{Ul}{2dU_B}$.`
      ],
      beispiel: {
        q: m`$U_B=1000\,\text{V}$, Ablenkspannung $U=200\,\text{V}$, Plattenabstand $d=4{,}0\,\text{cm}$, Plattenlänge $l=8{,}0\,\text{cm}$, Schirm $20\,\text{cm}$ hinter den Platten. Wo trifft der Strahl?`,
        steps: [
          { h: 'Ablenkung am Plattenende', t: m`$y=\dfrac{U\,l^2}{4\,d\,U_B}=\dfrac{200\cdot0{,}080^2}{4\cdot0{,}040\cdot1000}\,\text{m}=0{,}0080\,\text{m}=8{,}0\,\text{mm}$` },
          { h: 'Austrittswinkel', t: m`$\tan\alpha=\dfrac{U\,l}{2\,d\,U_B}=\dfrac{200\cdot0{,}080}{2\cdot0{,}040\cdot1000}=0{,}20\ \Rightarrow\ \alpha=11{,}3^\circ$` },
          { h: 'Gerade bis zum Schirm', t: m`$Y=y+L\tan\alpha=8{,}0\,\text{mm}+200\,\text{mm}\cdot0{,}20=48\,\text{mm}=4{,}8\,\text{cm}$` },
          { h: 'Prüfen', t: m`$y=8\,\text{mm}<\tfrac d2=20\,\text{mm}$: Der Strahl verlässt die Platten, ohne sie zu treffen.` }
        ]
      },
      fehler: [
        'Hinter den Platten weiter mit der Parabel gerechnet. Dort wirkt keine Kraft mehr: Gerade.',
        m`Die waagerechte Geschwindigkeit ändert sich nicht. $v_0$ bleibt, nur $v_y$ kommt hinzu.`,
        m`Vergessen zu prüfen, ob $y<d/2$ ist. Sonst trifft das Elektron die Platte.`
      ],
      test: [
        { q: 'Welche Bewegungen überlagern sich im Querfeld?', a: 'Waagerecht gleichförmig, senkrecht gleichmäßig beschleunigt (wie beim waagerechten Wurf).' },
        { q: m`Bahngleichung mit $U_B$?`, a: m`$y(x)=\dfrac{U\,x^2}{4\,d\,U_B}$` },
        { q: m`Beschleunigungsspannung verdoppelt. Ablenkung am Plattenende?`, a: 'Halbiert (y ∼ 1/U_B).' },
        { q: m`Warum kann man mit diesem Aufbau $e/m$ nicht bestimmen?`, a: m`$e/m$ kürzt sich heraus, wenn man $v_0^2=2eU_B/m$ einsetzt.` }
      ]
    },

    // ---------------------------------------------------------------- Ordner: Auf- und Entladen
    {
      id: 'PH8', fach: F, num: 8, min: 14, demo: 'p-rc', demoTitel: 'Schau zuerst: Laden und Entladen live',
      title: 'Auf- und Entladen: die Kurven',
      short: 'τ = R·C, 63 % / 37 %, Halbwertszeit, nach 5 τ fertig',
      idee: m`<p>Lädt man einen Kondensator über einen Widerstand, fließt anfangs der größte Strom $I_0=\dfrac{U_0}{R}$ (der leere Kondensator wirkt wie ein Kurzschluss). Je voller er ist, desto größer seine Gegenspannung, desto kleiner der Strom. So entstehen <b>e-Funktionen</b>.</p>
${merke('Formeln (AB 18)', m`$$\tau=R\cdot C\qquad\begin{array}{ll}\text{Laden:} & U_C=U_0\,(1-e^{-t/\tau}),\quad I=\dfrac{U_0}{R}\,e^{-t/\tau}\\[8pt]\text{Entladen:} & U_C=U_0\,e^{-t/\tau},\quad I=-\dfrac{U_0}{R}\,e^{-t/\tau}\end{array}$$`)}
<ul><li>Nach <b>1 τ</b>: Spannung bei 63 %, Strom bei 37 % ($1/e\approx0{,}37$).</li><li><b>Halbwertszeit</b> $t_h=\tau\cdot\ln2\approx0{,}69\,\tau$: jeweils halbiert.</li><li>Nach <b>5 τ</b> (≈ 7 $t_h$) gilt der Vorgang als beendet (unter 1 %). Voll geladen wirkt der Kondensator wie eine Unterbrechung.</li></ul>`,
      bild: m`<p>Wie eine Badewanne, die über einen dünnen Schlauch abläuft: Am Anfang drückt viel Wasser, es fließt schnell. Je leerer, desto langsamer. Der Widerstand ist der Schlauch, die Kapazität die Größe der Wanne. Beides zusammen bestimmt $\tau$.</p>`,
      rezept: [
        m`$\tau=R\cdot C$ berechnen (Ω · F = s).`,
        m`Laden oder Entladen? Passende Formel wählen. Beim Entladen ist $I$ negativ (andere Richtung).`,
        m`Zeitpunkt einsetzen, mit $e^{-t/\tau}$ rechnen.`,
        m`Zeit gesucht? Nach $e^{-t/\tau}$ auflösen und logarithmieren (Lektion 9).`
      ],
      beispiel: {
        q: m`$C=470\,\mu\text{F}$ wird über $R=10\,\text{k}\Omega$ an $U_0=12\,\text{V}$ geladen. Berechne $\tau$, $t_h$, $I_0$ sowie $U_C$ und $I$ nach $5{,}0\,\text{s}$.`,
        steps: [
          { h: 'Zeitkonstante, Halbwertszeit', t: m`$\tau=RC=10\,000\,\Omega\cdot470\cdot10^{-6}\,\text{F}=4{,}7\,\text{s}$, $\ t_h=\tau\ln2=3{,}26\,\text{s}$` },
          { h: 'Anfangsstrom', t: m`$I_0=\dfrac{U_0}{R}=\dfrac{12\,\text{V}}{10\,000\,\Omega}=1{,}2\,\text{mA}$` },
          { h: 'Spannung nach 5 s', t: m`$U_C=12\,\text{V}\cdot\left(1-e^{-5{,}0/4{,}7}\right)=12\,\text{V}\cdot(1-0{,}345)=7{,}86\,\text{V}$` },
          { h: 'Strom nach 5 s', t: m`$I=1{,}2\,\text{mA}\cdot e^{-5{,}0/4{,}7}=0{,}41\,\text{mA}$` }
        ]
      },
      fehler: [
        m`Lade- und Entladeformel vertauscht. Laden: $U_C$ steigt, also $(1-e^{-t/\tau})$. Entladen: $U_C$ fällt, also $e^{-t/\tau}$.`,
        'kΩ und µF nicht umgerechnet: 10 kΩ · 470 µF = 10 000 Ω · 0,00047 F = 4,7 s.',
        m`Halbwertszeit mit $\tau$ verwechselt: $t_h=\tau\cdot\ln2$, nicht $\tau$.`
      ],
      test: [
        { q: m`Wie viel Prozent der Endspannung sind nach $1\,\tau$ erreicht?`, a: '63 %' },
        { q: 'Wie verhält sich ein leerer Kondensator im Einschaltmoment?', a: m`Wie ein Kurzschluss: maximaler Strom $I_0=U_0/R$, keine Spannung am Kondensator.` },
        { q: m`Zusammenhang Halbwertszeit und Zeitkonstante?`, a: m`$t_h=\tau\cdot\ln2\approx0{,}69\,\tau$` },
        { q: 'Nach wie vielen τ gilt der Ladevorgang als beendet?', a: 'Nach 5 τ (unter 1 % Rest).' }
      ]
    },
    {
      id: 'PH9', fach: F, num: 9, min: 18, demo: 'p-messung', demoTitel: 'Probier es aus: C aus der Kurve bestimmen',
      title: 'Rechnen mit der e-Funktion und C messen',
      short: 'Nach t auflösen (ln), C = t_E/(R·ln 3), Linearisierung, DGL, Messunsicherheit',
      idee: m`<p><b>Zeit gesucht:</b> Gleichung so umformen, dass $e^{-t/\tau}$ allein steht, dann <b>ln</b> auf beiden Seiten: $\ln(e^{-t/\tau})=-t/\tau$.</p>
${merke('Entladen bis auf einen Bruchteil', m`$$\frac{U}{U_0}=e^{-t/\tau}\ \Rightarrow\ t=-\tau\,\ln\frac{U}{U_0}=\tau\,\ln\frac{U_0}{U}\qquad\text{z. B. bis }\tfrac13U_0:\ t_E=\tau\ln3\ \Rightarrow\ C=\frac{t_E}{R\,\ln3}$$`)}
<p><b>Linearisierung:</b> Trägt man $\ln(U/U_0)$ gegen $t$ auf, ergibt sich eine <b>Gerade</b> mit der Steigung $-1/\tau$. So prüft man, ob wirklich eine e-Funktion vorliegt, und bestimmt $\tau$ per Regression.</p>
<p><b>Herleitung (Infoblatt DGL):</b> Maschenregel $U_0=R\,I+\dfrac{Q}{C}$, nach $t$ ableiten ($\dot Q=I$): $0=R\,\dot I+\dfrac{I}{C}$. Der Ansatz $I=I_0e^{kt}$ löst das mit $k=-\dfrac1{RC}$.</p>`,
      bild: m`<p><b>Messunsicherheit (Regel aus „Runden und Messunsicherheit“):</b> Die relative Unsicherheit des Ergebnisses ist so groß wie die <b>größte</b> relative Unsicherheit der Eingangsgrößen. Unsicherheiten mit zwei signifikanten Stellen angeben.</p>`,
      rezept: [
        m`Formel aufschreiben, $e^{-t/\tau}$ isolieren.`,
        m`Logarithmieren: $-\dfrac t\tau=\ln(\ldots)$, nach $t$, $R$ oder $C$ auflösen.`,
        m`Abgeflossene Ladung beim Entladen: $\Delta Q=Q_0\,(1-e^{-t/\tau})$ mit $Q_0=CU_0$.`,
        m`Messreihe: Mittelwert bilden, $C=\dfrac{\bar t_E}{R\ln3}$, relative Unsicherheit = größte relative Unsicherheit der Eingangsgrößen.`
      ],
      beispiel: {
        q: m`Ein Kondensator ($\tau=4{,}7\,\text{s}$) wird von $12\,\text{V}$ aus entladen. Nach welcher Zeit liegt nur noch $2{,}0\,\text{V}$ an?`,
        steps: [
          { h: 'Ansatz', t: m`$2{,}0\,\text{V}=12\,\text{V}\cdot e^{-t/4{,}7\,\text{s}}$` },
          { h: 'e-Funktion isolieren', t: m`$e^{-t/4{,}7\,\text{s}}=\dfrac{2{,}0}{12}=\dfrac16$` },
          { h: 'Logarithmieren', t: m`$-\dfrac{t}{4{,}7\,\text{s}}=\ln\tfrac16\ \Rightarrow\ t=4{,}7\,\text{s}\cdot\ln6=8{,}42\,\text{s}$` },
          { h: 'Mit CAS', t: m`<code>solve(2=12*e^(-t/4.7),t)</code> → $t\approx8{,}42$. Ansatz trotzdem aufschreiben.` }
        ]
      },
      fehler: [
        m`$\ln$ auf eine Summe angewendet: $\ln(U_0(1-e^{-t/\tau}))$ geht nicht direkt. Erst $1-e^{-t/\tau}$ ausrechnen und $e^{-t/\tau}$ isolieren.`,
        m`Vorzeichen: $\ln$ von Zahlen kleiner 1 ist negativ, $t$ muss am Ende positiv sein.`,
        'Bei der Messunsicherheit die Unsicherheiten addiert. Nach der Regel aus dem Unterricht zählt die größte relative Unsicherheit.'
      ],
      test: [
        { q: m`Formel für $C$, wenn $t_E$ die Zeit bis $U_0/3$ ist?`, a: m`$C=\dfrac{t_E}{R\ln3}$` },
        { q: m`Was trägt man auf, um eine Gerade zu bekommen? Steigung?`, a: m`$\ln(U/U_0)$ gegen $t$, Steigung $-1/\tau$.` },
        { q: 'Wie lautet die DGL für den Ladestrom?', a: m`$0=R\,\dot I+\dfrac IC$ (aus $U_0=RI+Q/C$ abgeleitet).` },
        { q: m`Wie lange dauert es, bis $U$ auf $U_0/2$ gefallen ist?`, a: m`$t_h=\tau\ln2$` }
      ]
    }
  ];

  // ======================================================================
  // AUFGABEN (eigene Aufgaben, Musterlösung mit BE)
  // ======================================================================
  const TASKS = [
    // ---------------------------------------------------------------- PH1
    {
      id: 'PE1', fach: F, teil: 'A', lesson: 'PH1', title: 'Elektronvolt und Joule', afb: 'I', ops: 'Berechnen',
      intro: KONST,
      parts: [
        { id: 'PE1a', label: 'a)', be: 2, text: m`Ein Elektron durchläuft die Spannung $U=2{,}5\,\text{kV}$. Berechnen Sie die aufgenommene Energie in eV und in J.`,
          nums: [{ label: 'W in eV', ans: 2500, tol: 0.01 }, { label: 'W in 10⁻¹⁶ J', ans: 4.005, tol: 0.01 }],
          hints: [m`$W=e\cdot U$. In eV: Zahlenwert wie $U$ in V.`],
          sol: m`<p>$W=e\cdot U=2500\,\text{eV}=2500\cdot1{,}602\cdot10^{-19}\,\text{J}=4{,}0\cdot10^{-16}\,\text{J}$</p><ul><li>Ansatz $W=eU$ (1 BE)</li><li>beide Werte (1 BE)</li></ul>` },
        { id: 'PE1b', label: 'b)', be: 2, text: m`Welche Spannung muss ein Elektron durchlaufen, damit es die Energie $8{,}0\cdot10^{-17}\,\text{J}$ erhält?`,
          nums: [{ label: 'U in V', ans: 499.4, tol: 0.01 }],
          hints: [m`$U=\dfrac We$`],
          sol: m`<p>$U=\dfrac We=\dfrac{8{,}0\cdot10^{-17}\,\text{J}}{1{,}602\cdot10^{-19}\,\text{C}}\approx5{,}0\cdot10^{2}\,\text{V}$</p><ul><li>Umstellen (1 BE), Ergebnis mit Einheit (1 BE)</li></ul>` }
      ]
    },
    {
      id: 'PE2', fach: F, teil: 'B', lesson: 'PH1', title: 'Powerbank: Was steht auf dem Etikett?', afb: 'II', ops: 'Interpretieren, Berechnen',
      intro: m`Auf einer kleinen Powerbank steht: <b>3,7 V / 5000 mAh</b>. Damit wird eine LED-Leuchte mit der Leistung $P=1{,}2\,\text{W}$ betrieben (Spannung 3,7 V).`,
      parts: [
        { id: 'PE2a', label: 'a)', be: 2, text: 'Interpretieren Sie die Angabe „5000 mAh“ und berechnen Sie die zugehörige Größe in SI-Einheiten.',
          nums: [{ label: 'Q in C', ans: 18000, tol: 0.01 }],
          hints: ['mAh = Milliampere mal Stunde. Welche Größe ist „Stromstärke mal Zeit“?'],
          sol: m`<p>Die Angabe ist eine <b>Ladung</b>: Die Powerbank kann z. B. 5 A eine Stunde lang liefern. $Q=I\cdot t=5{,}0\,\text{A}\cdot3600\,\text{s}=18\,000\,\text{C}$.</p><ul><li>Ladung erkannt (1 BE)</li><li>Umrechnung (1 BE)</li></ul>` },
        { id: 'PE2b', label: 'b)', be: 2, text: 'Berechnen Sie die gespeicherte Energie in J und in Wh.',
          nums: [{ label: 'W in kJ', ans: 66.6, tol: 0.01 }, { label: 'W in Wh', ans: 18.5, tol: 0.01 }],
          hints: [m`$W=Q\cdot U$; $1\,\text{Wh}=3600\,\text{J}$`],
          sol: m`<p>$W=Q\cdot U=18\,000\,\text{C}\cdot3{,}7\,\text{V}=66\,600\,\text{J}\approx67\,\text{kJ}=18{,}5\,\text{Wh}$</p><ul><li>Ansatz (1 BE), beide Werte (1 BE)</li></ul>` },
        { id: 'PE2c', label: 'c)', be: 2, text: 'Berechnen Sie, wie lange die LED-Leuchte mit einer vollen Ladung betrieben werden kann.',
          nums: [{ label: 't in h', ans: 15.42, tol: 0.01 }],
          hints: [m`$t=\dfrac WP$ oder erst $I=\dfrac PU$, dann $t=\dfrac QI$.`],
          sol: m`<p>$t=\dfrac WP=\dfrac{66\,600\,\text{J}}{1{,}2\,\text{W}}=55\,500\,\text{s}\approx15\,\text{h}$ (genauer 15,4 h). Alternativ: $I=P/U=0{,}32\,\text{A}$, $t=Q/I$.</p><ul><li>Ansatz (1 BE), Ergebnis (1 BE)</li></ul>` }
      ]
    },
    {
      id: 'PE3', fach: F, teil: 'A', lesson: 'PH1', title: 'Wird eine Kugel durch Laden schwerer?', afb: 'II', ops: 'Berechnen, Begründen',
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
      id: 'PP1', fach: F, teil: 'B', lesson: 'PH2', title: 'Messung mit der Potentialsonde', afb: 'II', ops: 'Bestimmen, Zeichnen, Erläutern',
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
          nums: [{ label: 'W in 10⁻⁸ J', ans: 2.7, tol: 0.01 }],
          hints: [m`$W=q\cdot U_{AB}$ mit $U_{AB}=\varphi_B-\varphi_A$`],
          sol: m`<p>$W=q\,(\varphi_B-\varphi_A)=2{,}0\cdot10^{-9}\,\text{C}\cdot13{,}5\,\text{V}=2{,}7\cdot10^{-8}\,\text{J}$. Positiv: Die positive Ladung wird gegen die Feldkraft zur positiven Platte gebracht.</p>` },
        { id: 'PP1e', label: 'e)', be: 3, text: 'Erläutern Sie, wie man mit der Sonde die Feldstärke in einem Punkt des inhomogenen Randfeldes näherungsweise bestimmen kann.',
          sol: m`<p>In einer kleinen Umgebung ist das Feld näherungsweise homogen. Man misst das Potential an zwei nahe beieinander liegenden Punkten auf einer Linie <b>senkrecht zu den Äquipotentiallinien</b> (also entlang einer Feldlinie) und deren Abstand $\Delta s$: $E\approx\dfrac{\Delta\varphi}{\Delta s}$.</p><ul><li>lokal homogen (1 BE), senkrecht zu Äquipotentiallinien (1 BE), Formel (1 BE)</li></ul>` }
      ]
    },
    {
      id: 'PP2', fach: F, teil: 'A', lesson: 'PH2', title: 'Äquipotentiallinien verstehen', afb: 'II', ops: 'Begründen, Erläutern',
      intro: 'Beantworten Sie ohne Rechnung, in ganzen Sätzen.',
      parts: [
        { id: 'PP2a', label: 'a)', be: 2, text: 'Begründen Sie, dass beim Verschieben einer Ladung entlang einer Äquipotentiallinie keine Arbeit verrichtet wird.',
          sol: m`<p>Auf der Linie ist $\varphi$ überall gleich, also $\Delta\varphi=0$ und $W=q\cdot\Delta\varphi=0$.</p>` },
        { id: 'PP2b', label: 'b)', be: 2, text: 'Begründen Sie, dass Feldlinien senkrecht auf Äquipotentiallinien stehen.',
          sol: m`<p>Hätte die Feldkraft eine Komponente entlang der Äquipotentiallinie, würde beim Verschieben entlang der Linie Arbeit verrichtet. Das widerspricht a). Also wirkt die Kraft (und damit die Feldlinie) senkrecht zur Linie.</p>` },
        { id: 'PP2c', label: 'c)', be: 2, text: 'Erläutern Sie den Unterschied zwischen Potential und Spannung.',
          sol: m`<p>Das Potential gehört zu <b>einem</b> Punkt und ist auf einen Bezugspunkt ($\varphi=0$) bezogen. Die Spannung ist die Potential<b>differenz</b> zwischen <b>zwei</b> Punkten und hängt nicht vom Bezugspunkt ab.</p>` }
      ]
    },
    // ---------------------------------------------------------------- PH3
    {
      id: 'PC1', fach: F, teil: 'B', lesson: 'PH3', title: 'Plattenkondensator berechnen', afb: 'I', ops: 'Berechnen',
      intro: m`Ein Plattenkondensator mit quadratischen Platten (Kantenlänge 25 cm, Abstand 2,0 mm, Luft) liegt an $U=400\,\text{V}$. ${KONST}`,
      parts: [
        { id: 'PC1a', label: 'a)', be: 2, text: 'Berechnen Sie die Kapazität.', nums: [{ label: 'C in pF', ans: 276.7, tol: 0.01 }],
          hints: [m`$A=(0{,}25\,\text{m})^2$, $d=0{,}0020\,\text{m}$`],
          sol: m`<p>$C=\varepsilon_0\dfrac Ad=8{,}854\cdot10^{-12}\cdot\dfrac{0{,}0625}{0{,}0020}\,\text{F}=2{,}77\cdot10^{-10}\,\text{F}=277\,\text{pF}$</p>` },
        { id: 'PC1b', label: 'b)', be: 1, text: 'Berechnen Sie die Ladung auf einer Platte.', nums: [{ label: 'Q in nC', ans: 110.7, tol: 0.01 }],
          sol: m`<p>$Q=CU=2{,}77\cdot10^{-10}\,\text{F}\cdot400\,\text{V}=1{,}11\cdot10^{-7}\,\text{C}$</p>` },
        { id: 'PC1c', label: 'c)', be: 2, text: 'Berechnen Sie die Feldstärke und die Flächenladungsdichte.',
          nums: [{ label: 'E in kV/m', ans: 200, tol: 0.01 }, { label: 'σ in 10⁻⁶ C/m²', ans: 1.771, tol: 0.01 }],
          sol: m`<p>$E=\dfrac Ud=\dfrac{400\,\text{V}}{0{,}0020\,\text{m}}=2{,}0\cdot10^5\,\tfrac{\text{V}}{\text{m}}$; $\ \sigma=\dfrac QA=\dfrac{1{,}11\cdot10^{-7}}{0{,}0625}\,\tfrac{\text{C}}{\text{m}^2}=1{,}77\cdot10^{-6}\,\tfrac{\text{C}}{\text{m}^2}$ (Kontrolle: $\sigma=\varepsilon_0E$).</p>` }
      ]
    },
    {
      id: 'PC2', fach: F, teil: 'B', lesson: 'PH3', title: 'Platten auseinanderziehen: an der Quelle oder getrennt?', afb: 'II', ops: 'Bestimmen, Erklären',
      intro: m`Der Kondensator aus der Aufgabe „Plattenkondensator berechnen“ ($C=277\,\text{pF}$, $d=2{,}0\,\text{mm}$) wurde auf $400\,\text{V}$ geladen. Danach wird der Plattenabstand auf $4{,}0\,\text{mm}$ verdoppelt.`,
      parts: [
        { id: 'PC2a', label: 'a)', be: 4, text: 'Fall 1: Der Kondensator wurde vorher von der Quelle getrennt. Bestimmen Sie Q, C, U und E nach dem Auseinanderziehen.',
          nums: [{ label: 'U in V', ans: 800, tol: 0.01 }, { label: 'C in pF', ans: 138.3, tol: 0.01 }],
          hints: ['Getrennt: Was kann sich nicht ändern?', m`$C\sim\dfrac1d$`],
          sol: m`<p>Getrennt: $Q=1{,}11\cdot10^{-7}\,\text{C}$ bleibt. $C$ halbiert sich auf $138\,\text{pF}$. $U=\dfrac QC$ verdoppelt sich auf $800\,\text{V}$. $E=\dfrac Ud=\dfrac{800\,\text{V}}{0{,}0040\,\text{m}}=2{,}0\cdot10^5\,\tfrac{\text{V}}{\text{m}}$ bleibt gleich.</p><ul><li>je Größe 1 BE</li></ul>` },
        { id: 'PC2b', label: 'b)', be: 3, text: 'Fall 2: Der Kondensator bleibt an der Quelle. Bestimmen Sie Q, C, U und E.',
          nums: [{ label: 'Q in nC', ans: 55.34, tol: 0.01 }, { label: 'E in kV/m', ans: 100, tol: 0.01 }],
          sol: m`<p>An der Quelle: $U=400\,\text{V}$ bleibt, $C=138\,\text{pF}$, $Q=CU=5{,}53\cdot10^{-8}\,\text{C}$ (halbiert, Ladung fließt zur Quelle zurück), $E=\dfrac{400\,\text{V}}{0{,}0040\,\text{m}}=1{,}0\cdot10^5\,\tfrac{\text{V}}{\text{m}}$ (halbiert).</p>` },
        { id: 'PC2c', label: 'c)', be: 3, text: 'Erklären Sie, warum die Feldstärke in Fall 1 trotz größerem Abstand gleich bleibt.',
          sol: m`<p>Die Feldstärke hängt nur von der Flächenladungsdichte ab: $E=\dfrac{\sigma}{\varepsilon_0}=\dfrac{Q}{\varepsilon_0A}$. Im getrennten Fall ändern sich weder $Q$ noch $A$, also bleibt $E$. Die Spannung $U=E\cdot d$ steigt, weil der gleiche Feldstärkewert über eine doppelt so lange Strecke wirkt.</p><ul><li>$E=\sigma/\varepsilon_0$ (1 BE), Q und A konstant (1 BE), U = E·d gedeutet (1 BE)</li></ul>` }
      ]
    },
    {
      id: 'PC3', fach: F, teil: 'B', lesson: 'PH3', title: 'ε₀ messen und ein Dielektrikum einschieben', afb: 'II', ops: 'Bestimmen, Beurteilen',
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
      id: 'PW1', fach: F, teil: 'B', lesson: 'PH4', title: 'Blitzgerät', afb: 'II', ops: 'Berechnen, Begründen',
      intro: m`Der Kondensator eines Blitzgeräts ($C=330\,\mu\text{F}$) wird aus zwei Batterien (zusammen 3 V) über eine Elektronik auf $U=300\,\text{V}$ geladen.`,
      parts: [
        { id: 'PW1a', label: 'a)', be: 2, text: 'Berechnen Sie die gespeicherte Energie.', nums: [{ label: 'W in J', ans: 14.85, tol: 0.01 }],
          sol: m`<p>$W=\tfrac12CU^2=\tfrac12\cdot330\cdot10^{-6}\,\text{F}\cdot(300\,\text{V})^2=14{,}85\,\text{J}\approx15\,\text{J}$</p>` },
        { id: 'PW1b', label: 'b)', be: 3, text: m`Der Blitz dauert $1{,}5\,\text{ms}$, 20 % der Energie werden zu Licht. Berechnen Sie die mittlere Lichtleistung.`,
          nums: [{ label: 'P in W', ans: 1980, tol: 0.01 }],
          sol: m`<p>$P=\dfrac{0{,}20\cdot W}{t}=\dfrac{0{,}20\cdot14{,}85\,\text{J}}{1{,}5\cdot10^{-3}\,\text{s}}\approx2{,}0\cdot10^3\,\text{W}$</p>` },
        { id: 'PW1c', label: 'c)', be: 2, text: 'Begründen Sie, warum man die Blitzröhre nicht direkt an die Batterien anschließt.',
          sol: m`<p>Die Batterien liefern nur 3 V und können nicht genug Strom liefern, um in 1,5 ms rund 15 J abzugeben (das wären mehrere kW). Der Kondensator wird langsam geladen (kleine Leistung) und gibt die Energie in sehr kurzer Zeit ab (große Leistung). Außerdem zündet die Röhre erst bei hoher Spannung.</p>` }
      ]
    },
    {
      id: 'PW2', fach: F, teil: 'B', lesson: 'PH4', title: 'Defibrillator', afb: 'II', ops: 'Berechnen, Begründen',
      intro: m`Ein Defibrillator soll beim Entladen $200\,\text{J}$ abgeben. Sein Kondensator wird auf $2{,}0\,\text{kV}$ geladen.`,
      parts: [
        { id: 'PW2a', label: 'a)', be: 2, text: 'Berechnen Sie die nötige Kapazität.', nums: [{ label: 'C in µF', ans: 100, tol: 0.01 }],
          sol: m`<p>$C=\dfrac{2W}{U^2}=\dfrac{2\cdot200\,\text{J}}{(2000\,\text{V})^2}=1{,}0\cdot10^{-4}\,\text{F}=100\,\mu\text{F}$</p>` },
        { id: 'PW2b', label: 'b)', be: 1, text: 'Berechnen Sie die gespeicherte Ladung.', nums: [{ label: 'Q in mC', ans: 200, tol: 0.01 }],
          sol: m`<p>$Q=CU=1{,}0\cdot10^{-4}\,\text{F}\cdot2000\,\text{V}=0{,}20\,\text{C}$</p>` },
        { id: 'PW2c', label: 'c)', be: 2, text: m`Die Entladung dauert etwa $5\,\text{ms}$. Schätzen Sie die mittlere Stromstärke ab.`, nums: [{ label: 'I in A', ans: 40, tol: 0.01 }],
          sol: m`<p>$\bar I=\dfrac Qt=\dfrac{0{,}20\,\text{C}}{0{,}005\,\text{s}}=40\,\text{A}$ (grobe Abschätzung, der echte Strom fällt exponentiell).</p>` },
        { id: 'PW2d', label: 'd)', be: 2, text: 'Begründen Sie, wie sich die Energie ändert, wenn man die Ladespannung verdoppelt.',
          sol: m`<p>$W=\tfrac12CU^2$: Bei gleichem $C$ und doppeltem $U$ wird die Energie <b>vervierfacht</b>.</p>` }
      ]
    },
    {
      id: 'PW3', fach: F, teil: 'A', lesson: 'PH4', title: 'Ist ein Kondensator wie ein Eimer?', afb: 'III', ops: 'Berechnen, Erläutern',
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
      id: 'PS1', fach: F, teil: 'B', lesson: 'PH5', title: 'Zwei Kondensatoren an 12 V', afb: 'II', ops: 'Berechnen, Begründen',
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
      id: 'PS2', fach: F, teil: 'A', lesson: 'PH5', title: 'Kombinationen aus 60-µF-Kondensatoren', afb: 'II', ops: 'Angeben, Begründen',
      intro: m`Es stehen beliebig viele Kondensatoren mit je $60\,\mu\text{F}$ zur Verfügung.`,
      parts: [
        { id: 'PS2a', label: 'a)', be: 3, text: m`Geben Sie Schaltungen für $120\,\mu\text{F}$, $30\,\mu\text{F}$ und $90\,\mu\text{F}$ an und begründen Sie rechnerisch.`,
          sol: m`<p>$120\,\mu\text{F}$: zwei parallel ($60+60$). $30\,\mu\text{F}$: zwei in Reihe ($\tfrac1C=\tfrac2{60}$). $90\,\mu\text{F}$: einer parallel zu zwei in Reihe ($60+30$).</p>` }
      ]
    },
    // ---------------------------------------------------------------- PH6
    {
      id: 'PR1', fach: F, teil: 'B', lesson: 'PH6', title: 'Wie schnell sind die Elektronen?', afb: 'II', ops: 'Herleiten, Berechnen, Begründen',
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
      id: 'PR2', fach: F, teil: 'A', lesson: 'PH6', title: 'Aufbau der Elektronenstrahlröhre', afb: 'I', ops: 'Beschreiben, Erklären',
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
      id: 'PR3', fach: F, teil: 'B', lesson: 'PH7', title: 'Elektronenstrahl im Querfeld', afb: 'II', ops: 'Berechnen, Bestimmen',
      intro: m`Elektronen werden mit $U_B=1{,}2\,\text{kV}$ beschleunigt und treten mittig und parallel zu den Platten in einen Plattenkondensator ein (Plattenlänge $l=6{,}0\,\text{cm}$, Abstand $d=2{,}5\,\text{cm}$, Spannung $U=150\,\text{V}$). Der Schirm steht $15\,\text{cm}$ hinter dem Plattenende. ${KONST}`,
      parts: [
        { id: 'PR3a', label: 'a)', be: 2, text: m`Berechnen Sie $v_0$.`, nums: [{ label: 'v₀ in 10⁷ m/s', ans: 2.054, tol: 0.01 }],
          sol: m`<p>$v_0=\sqrt{2eU_B/m_e}=2{,}05\cdot10^7\,\tfrac{\text{m}}{\text{s}}$</p>` },
        { id: 'PR3b', label: 'b)', be: 2, text: 'Berechnen Sie die Flugzeit zwischen den Platten und die Beschleunigung senkrecht zur Flugrichtung.',
          nums: [{ label: 't in ns', ans: 2.920, tol: 0.01 }, { label: 'a in 10¹⁵ m/s²', ans: 1.055, tol: 0.01 }],
          sol: m`<p>$t=\dfrac l{v_0}=\dfrac{0{,}060}{2{,}05\cdot10^7}\,\text{s}=2{,}92\cdot10^{-9}\,\text{s}$; $\ a=\dfrac{eU}{m_ed}=\dfrac{1{,}602\cdot10^{-19}\cdot150}{9{,}109\cdot10^{-31}\cdot0{,}025}\,\tfrac{\text{m}}{\text{s}^2}=1{,}06\cdot10^{15}\,\tfrac{\text{m}}{\text{s}^2}$</p>` },
        { id: 'PR3c', label: 'c)', be: 2, text: 'Berechnen Sie die Ablenkung am Plattenende und prüfen Sie, ob das Elektron die Platten verlässt.',
          nums: [{ label: 'y in mm', ans: 4.5, tol: 0.01 }],
          sol: m`<p>$y=\tfrac12at^2=4{,}5\cdot10^{-3}\,\text{m}$ (Kontrolle: $y=\dfrac{Ul^2}{4dU_B}=\dfrac{150\cdot0{,}06^2}{4\cdot0{,}025\cdot1200}\,\text{m}=4{,}5\,\text{mm}$). Da $4{,}5\,\text{mm}<\tfrac d2=12{,}5\,\text{mm}$, verlässt es die Platten.</p>` },
        { id: 'PR3d', label: 'd)', be: 3, text: 'Bestimmen Sie den Auftreffpunkt auf dem Schirm (Abstand von der Mittelachse).',
          nums: [{ label: 'Y in cm', ans: 2.7, tol: 0.02 }],
          hints: [m`Hinter den Platten geradlinig: $\tan\alpha=\dfrac{v_y}{v_0}=\dfrac{Ul}{2dU_B}$`],
          sol: m`<p>$\tan\alpha=\dfrac{Ul}{2dU_B}=\dfrac{150\cdot0{,}060}{2\cdot0{,}025\cdot1200}=0{,}15$; $\ Y=y+L\tan\alpha=4{,}5\,\text{mm}+150\,\text{mm}\cdot0{,}15=27\,\text{mm}=2{,}7\,\text{cm}$</p>` }
      ]
    },
    {
      id: 'PR4', fach: F, teil: 'B', lesson: 'PH7', title: 'Bahngleichung herleiten', afb: 'III', ops: 'Herleiten, Erläutern',
      intro: m`Ein Elektron tritt mit $v_0$ senkrecht zu den Feldlinien in das homogene Feld eines Plattenkondensators (Spannung $U$, Abstand $d$) ein. Es wurde vorher mit $U_B$ beschleunigt. Die Kraft im Feld ist $F=\dfrac{U\,e}{d}$.`,
      parts: [
        { id: 'PR4a', label: 'a)', be: 5, text: m`Leiten Sie die Bahngleichung $y(x)=\dfrac12\cdot\dfrac{e}{m_e}\cdot\dfrac Ud\cdot\dfrac{x^2}{v_0^2}$ begründet her.`,
          hints: ['Zerlege in zwei unabhängige Bewegungen.', m`$x=v_0t$ nach $t$ auflösen und in $y=\tfrac12at^2$ einsetzen.`],
          sol: m`<ul><li>Unabhängige Überlagerung: in $x$-Richtung keine Kraft → gleichförmig: $x=v_0t$ (1 BE)</li><li>in $y$-Richtung konstante Kraft → gleichmäßig beschleunigt: $y=\tfrac12at^2$ (1 BE)</li><li>$a=\dfrac F{m_e}=\dfrac{eU}{m_ed}$ (1 BE)</li><li>$t=\dfrac x{v_0}$ einsetzen (1 BE): $y=\tfrac12\cdot\dfrac{eU}{m_ed}\cdot\dfrac{x^2}{v_0^2}$, eine Parabel (1 BE)</li></ul>` },
        { id: 'PR4b', label: 'b)', be: 4, text: m`Zeigen Sie, dass mit $v_0$ aus der Beschleunigung gilt $y=\dfrac{Ux^2}{4dU_B}$, und erläutern Sie, dass man mit diesem Experiment die spezifische Ladung $e/m_e$ nicht bestimmen kann.`,
          sol: m`<p>$v_0^2=\dfrac{2eU_B}{m_e}$ einsetzen: $y=\tfrac12\cdot\dfrac{e}{m_e}\cdot\dfrac Ud\cdot\dfrac{x^2m_e}{2eU_B}=\dfrac{Ux^2}{4dU_B}$. Die Ablenkung hängt nur von $U$, $U_B$, $d$ und $x$ ab, $e/m_e$ kürzt sich heraus. Alle Teilchen mit gleichem Ladungsvorzeichen nehmen dieselbe Bahn; aus der gemessenen Bahn lässt sich $e/m_e$ also nicht berechnen. (Dafür braucht man z. B. zusätzlich ein Magnetfeld.)</p>` }
      ]
    },
    {
      id: 'PR5', fach: F, teil: 'B', lesson: 'PH7', title: 'Wann trifft der Strahl die Platte?', afb: 'II', ops: 'Bestimmen, Begründen',
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
      id: 'PL1', fach: F, teil: 'B', lesson: 'PH8', title: 'Ladekurve berechnen', afb: 'II', ops: 'Berechnen',
      intro: m`Ein Kondensator ($C=470\,\mu\text{F}$) wird über $R=22\,\text{k}\Omega$ an einer Quelle mit $U_0=9{,}0\,\text{V}$ geladen. Zu Beginn ist er leer.`,
      parts: [
        { id: 'PL1a', label: 'a)', be: 2, text: m`Berechnen Sie die Zeitkonstante und den Anfangsstrom.`, nums: [{ label: 'τ in s', ans: 10.34, tol: 0.01 }, { label: 'I₀ in µA', ans: 409.1, tol: 0.01 }],
          sol: m`<p>$\tau=RC=22\,000\,\Omega\cdot470\cdot10^{-6}\,\text{F}=10{,}3\,\text{s}$; $\ I_0=\dfrac{U_0}R=\dfrac{9{,}0\,\text{V}}{22\,000\,\Omega}=4{,}1\cdot10^{-4}\,\text{A}$</p>` },
        { id: 'PL1b', label: 'b)', be: 2, text: m`Berechnen Sie die Kondensatorspannung nach $10\,\text{s}$.`, nums: [{ label: 'U_C in V', ans: 5.578, tol: 0.01 }],
          sol: m`<p>$U_C=U_0\,(1-e^{-t/\tau})=9{,}0\,\text{V}\cdot(1-e^{-10/10{,}34})=5{,}6\,\text{V}$</p>` },
        { id: 'PL1c', label: 'c)', be: 2, text: 'Berechnen Sie die Halbwertszeit des Ladestroms.', nums: [{ label: 't_h in s', ans: 7.167, tol: 0.01 }],
          sol: m`<p>$t_h=\tau\ln2=10{,}34\,\text{s}\cdot0{,}693=7{,}2\,\text{s}$</p>` },
        { id: 'PL1d', label: 'd)', be: 2, text: 'Berechnen Sie, nach welcher Zeit 99 % der Endspannung erreicht sind.', nums: [{ label: 't in s', ans: 47.62, tol: 0.01 }],
          hints: [m`$0{,}99=1-e^{-t/\tau}\Rightarrow e^{-t/\tau}=0{,}01$`],
          sol: m`<p>$e^{-t/\tau}=0{,}01\Rightarrow t=\tau\ln100=10{,}34\,\text{s}\cdot4{,}61=47{,}6\,\text{s}$ (etwa $4{,}6\,\tau$)</p>` }
      ]
    },
    {
      id: 'PL2', fach: F, teil: 'A', lesson: 'PH8', title: 'Lade- und Entladekurven deuten', afb: 'II', ops: 'Begründen, Angeben',
      intro: 'Ein Kondensator wird über einen Widerstand geladen und später wieder entladen.',
      parts: [
        { id: 'PL2a', label: 'a)', be: 2, text: 'Begründen Sie, warum der Ladestrom am Anfang am größten ist und am Ende null wird.',
          sol: m`<p>Maschenregel: $U_R=U_0-U_C$. Am Anfang ist $U_C=0$, die ganze Spannung liegt am Widerstand: $I_0=U_0/R$ (Kondensator wie Kurzschluss). Mit wachsender Ladung steigt $U_C$, $U_R$ und damit $I$ sinken. Bei $U_C=U_0$ ist $I=0$ (Kondensator wie Unterbrechung).</p>` },
        { id: 'PL2b', label: 'b)', be: 2, text: m`Geben Sie an, wie viel Prozent der Endspannung nach $2\tau$ erreicht sind.`, nums: [{ label: 'Prozent', ans: 86.47, tol: 0.005 }],
          sol: m`<p>$1-e^{-2}=0{,}865$, also etwa 86 %.</p>` },
        { id: 'PL2c', label: 'c)', be: 2, text: 'Geben Sie an, nach wie vielen Halbwertszeiten der Strom erstmals unter 1 % seines Anfangswertes liegt, und begründen Sie.',
          nums: [{ label: 'Anzahl', ans: 7, tol: 0 }],
          sol: m`<p>Nach $n$ Halbwertszeiten: $(\tfrac12)^n$. $(\tfrac12)^6=1{,}6\,\%$, $(\tfrac12)^7=0{,}78\,\%$. Also nach 7 Halbwertszeiten (passt zu „5 τ ≈ 7 t_h“).</p>` }
      ]
    },
    // ---------------------------------------------------------------- PH9
    {
      id: 'PL3', fach: F, teil: 'B', lesson: 'PH9', title: 'Entladen über einen großen Widerstand', afb: 'II', ops: 'Berechnen, Bestimmen',
      intro: m`Ein Kondensator ($C=100\,\mu\text{F}$) wurde auf $U_0=50\,\text{V}$ geladen und wird über $R=2{,}0\,\text{M}\Omega$ entladen.`,
      parts: [
        { id: 'PL3a', label: 'a)', be: 3, text: m`Berechnen Sie die Ladung, die in den ersten $30\,\text{s}$ abfließt.`, nums: [{ label: 'ΔQ in µC', ans: 696.4, tol: 0.01 }],
          hints: [m`$Q(t)=Q_0e^{-t/\tau}$, abgeflossen: $Q_0-Q(t)$`],
          sol: m`<p>$\tau=RC=200\,\text{s}$, $Q_0=CU_0=5{,}0\cdot10^{-3}\,\text{C}$. $\Delta Q=Q_0(1-e^{-30/200})=5{,}0\cdot10^{-3}\,\text{C}\cdot0{,}139=7{,}0\cdot10^{-4}\,\text{C}$</p>` },
        { id: 'PL3b', label: 'b)', be: 2, text: 'Berechnen Sie, nach welcher Zeit sich die Spannung halbiert hat.', nums: [{ label: 't_h in s', ans: 138.6, tol: 0.01 }],
          sol: m`<p>$\tfrac12=e^{-t/\tau}\Rightarrow t_h=\tau\ln2=200\,\text{s}\cdot0{,}693=139\,\text{s}$</p>` },
        { id: 'PL3c', label: 'c)', be: 3, text: m`Die Halbwertszeit soll $60\,\text{s}$ betragen. Bestimmen Sie den nötigen Widerstand bei gleichem $C$ bzw. die nötige Kapazität bei gleichem $R$.`,
          nums: [{ label: 'R in kΩ', ans: 865.6, tol: 0.01 }, { label: 'C in µF', ans: 43.28, tol: 0.01 }],
          sol: m`<p>$R=\dfrac{t_h}{C\ln2}=\dfrac{60}{100\cdot10^{-6}\cdot0{,}693}\,\Omega\approx8{,}7\cdot10^5\,\Omega$; $\ C=\dfrac{t_h}{R\ln2}=\dfrac{60}{2{,}0\cdot10^6\cdot0{,}693}\,\text{F}\approx43\,\mu\text{F}$</p>` },
        { id: 'PL3d', label: 'd)', be: 3, text: 'Der leere Kondensator wird über denselben Widerstand wieder an 50 V geladen. Berechnen Sie den Anfangsstrom und die Zeit, bis der Strom auf 1 % gefallen ist.',
          nums: [{ label: 'I₀ in µA', ans: 25, tol: 0.01 }, { label: 't in s', ans: 921, tol: 0.01 }],
          sol: m`<p>$I_0=\dfrac{U_0}R=\dfrac{50\,\text{V}}{2{,}0\cdot10^6\,\Omega}=25\,\mu\text{A}$; $\ 0{,}01=e^{-t/\tau}\Rightarrow t=\tau\ln100=200\,\text{s}\cdot4{,}61=921\,\text{s}\approx15\,\text{min}$</p>` }
      ]
    },
    {
      id: 'PL4', fach: F, teil: 'B', lesson: 'PH9', title: 'Kapazität aus der Entladezeit (Messreihe)', afb: 'III', ops: 'Herleiten, Berechnen, Erläutern',
      intro: m`Ein Kondensator unbekannter Kapazität wird geladen und dann über $R=33\,\text{k}\Omega$ (Toleranz $\pm5\,\%$) entladen. Ein Voltmeter liegt parallel. Gemessen wird die Zeit $t_E$, in der die Spannung von $U_0$ auf $\tfrac13U_0$ fällt: $36{,}4\,\text{s}$; $37{,}1\,\text{s}$; $35{,}9\,\text{s}$.<br><span class="dim">Angelehnt an Zentralabitur Niedersachsen 2026 (Kontext Kondensator-Messung), eigene Werte.</span>`,
      parts: [
        { id: 'PL4a', label: 'a)', be: 4, text: m`Leiten Sie die Gleichung $C=\dfrac{t_E}{R\cdot\ln3}$ her.`,
          sol: m`<p>$U(t)=U_0e^{-t/(RC)}$. Bei $t=t_E$: $\tfrac13U_0=U_0e^{-t_E/(RC)}\Rightarrow e^{-t_E/(RC)}=\tfrac13\Rightarrow-\dfrac{t_E}{RC}=\ln\tfrac13=-\ln3\Rightarrow C=\dfrac{t_E}{R\ln3}$</p><ul><li>Entladegesetz (1 BE), Einsetzen (1 BE), Logarithmieren (1 BE), Umstellen (1 BE)</li></ul>` },
        { id: 'PL4b', label: 'b)', be: 3, text: 'Berechnen Sie mit dem Mittelwert der Entladezeiten die Kapazität.',
          nums: [{ label: 'Mittelwert in s', ans: 36.47, tol: 0.005 }, { label: 'C in µF', ans: 1006, tol: 0.01 }],
          sol: m`<p>$\bar t_E=\dfrac{36{,}4+37{,}1+35{,}9}{3}\,\text{s}=36{,}5\,\text{s}$; $\ C=\dfrac{36{,}47\,\text{s}}{33\,000\,\Omega\cdot\ln3}=1{,}01\cdot10^{-3}\,\text{F}\approx1{,}0\,\text{mF}$</p>` },
        { id: 'PL4c', label: 'c)', be: 3, text: 'Schätzen Sie die Messunsicherheit von C nach der im Unterricht vereinbarten Regel ab.',
          nums: [{ label: 'ΔC in µF', ans: 50.3, tol: 0.05 }],
          hints: ['Relative Unsicherheiten vergleichen: Streuung der Zeiten und Toleranz von R. Die größte zählt.'],
          sol: m`<p>Zeiten: größte Abweichung vom Mittelwert $\approx0{,}6\,\text{s}$, relativ $\approx1{,}7\,\%$. Widerstand: $5\,\%$. Die größte relative Unsicherheit ($5\,\%$) wird übernommen: $\Delta C=0{,}05\cdot1{,}006\,\text{mF}\approx0{,}050\,\text{mF}$, also $C=(1{,}01\pm0{,}050)\,\text{mF}$ bzw. gerundet $(1{,}0\pm0{,}05)\,\text{mF}$.</p>` },
        { id: 'PL4d', label: 'd)', be: 4, text: 'Nennen Sie zwei weitere Einflussgrößen, die zu Unsicherheiten führen, und erläutern Sie ihre Auswirkung auf die berechnete Kapazität.',
          sol: m`<ul><li><b>Reaktionszeit beim Stoppen:</b> Start und Stopp per Hand, je nach Reaktion zu lange oder zu kurze Zeiten → C streut in beide Richtungen.</li><li><b>Innenwiderstand des Voltmeters:</b> Er liegt parallel zu R, der Gesamtwiderstand ist kleiner, die Entladung schneller → gemessene $t_E$ zu klein → berechnetes C zu klein.</li><li>Auch möglich: Ablesegenauigkeit der Spannung $U_0/3$, Leckströme des Kondensators (→ C zu klein).</li></ul><p>Je Einflussgröße 1 BE, je Auswirkung 1 BE.</p>` }
      ]
    },
    {
      id: 'PL5', fach: F, teil: 'B', lesson: 'PH9', title: 'Entladung auswerten: Linearisierung', afb: 'II', ops: 'Zeigen, Bestimmen',
      intro: m`Ein Kondensator wird über $R=50\,\text{k}\Omega$ entladen. Messreihe:<table class="mt-table" style="margin-top:10px"><tr><th>t in s</th><td>0</td><td>10</td><td>20</td><td>30</td><td>40</td><td>50</td></tr><tr><th>U in V</th><td>12,0</td><td>8,1</td><td>5,4</td><td>3,6</td><td>2,4</td><td>1,6</td></tr></table>`,
      parts: [
        { id: 'PL5a', label: 'a)', be: 2, text: 'Zeigen Sie mit Quotienten aufeinanderfolgender Messwerte, dass eine exponentielle Abnahme vorliegt.',
          sol: m`<p>$\dfrac{8{,}1}{12{,}0}=0{,}675$, $\dfrac{5{,}4}{8{,}1}=0{,}667$, $\dfrac{3{,}6}{5{,}4}=0{,}667$, $\dfrac{2{,}4}{3{,}6}=0{,}667$, $\dfrac{1{,}6}{2{,}4}=0{,}667$: In gleichen Zeitabständen fällt $U$ immer auf (fast) denselben Bruchteil. Das ist das Kennzeichen einer Exponentialfunktion.</p>` },
        { id: 'PL5b', label: 'b)', be: 4, text: m`Tragen Sie $\ln(U/\text{V})$ gegen $t$ auf, bestimmen Sie die Steigung (Regression) und daraus $\tau$.`,
          nums: [{ label: 'τ in s', ans: 24.77, tol: 0.03 }],
          hints: [m`$\ln U=\ln U_0-\dfrac t\tau$: Gerade mit Steigung $-1/\tau$.`, 'CAS: LinReg mit t-Liste und ln(U)-Liste.'],
          sol: m`<p>$\ln(U/\text{V})$: 2,485; 2,092; 1,686; 1,281; 0,875; 0,470. Die Punkte liegen auf einer Geraden. Lineare Regression: Steigung $m\approx-0{,}0404\,\tfrac1{\text{s}}$. Wegen $\ln U=\ln U_0-\tfrac t\tau$ gilt $\tau=-\tfrac1m\approx24{,}8\,\text{s}$.</p><ul><li>Werte und Diagramm (2 BE), Regression dokumentiert (1 BE), τ (1 BE)</li></ul>` },
        { id: 'PL5c', label: 'c)', be: 2, text: 'Berechnen Sie die Kapazität des Kondensators.', nums: [{ label: 'C in µF', ans: 495.4, tol: 0.03 }],
          sol: m`<p>$C=\dfrac\tau R=\dfrac{24{,}8\,\text{s}}{50\,000\,\Omega}\approx5{,}0\cdot10^{-4}\,\text{F}=0{,}50\,\text{mF}$</p>` }
      ]
    },
    {
      id: 'PL6', fach: F, teil: 'B', lesson: 'PH9', title: 'Differentialgleichung des Ladevorgangs', afb: 'III', ops: 'Herleiten, Zeigen',
      intro: m`Ein Kondensator $C$ wird über einen Widerstand $R$ an einer Quelle mit der Spannung $U_0$ geladen (vgl. Infoblatt DGL).`,
      parts: [
        { id: 'PL6a', label: 'a)', be: 3, text: m`Stellen Sie mit der Maschenregel eine Gleichung für $I(t)$ und $Q(t)$ auf und leiten Sie daraus die Differentialgleichung $0=R\,\dot I(t)+\dfrac{I(t)}{C}$ her.`,
          sol: m`<p>Maschenregel: $U_0=U_R+U_C=R\,I(t)+\dfrac{Q(t)}C$ (1 BE). Ableiten nach $t$: $U_0$ ist konstant, $\dot Q=I$ (1 BE), also $0=R\,\dot I(t)+\dfrac{I(t)}C$ (1 BE).</p>` },
        { id: 'PL6b', label: 'b)', be: 3, text: m`Zeigen Sie, dass $I(t)=I_0\,e^{kt}$ die Gleichung mit $k=-\dfrac1{RC}$ löst, und begründen Sie $I_0=\dfrac{U_0}R$.`,
          sol: m`<p>$\dot I=kI_0e^{kt}$ einsetzen: $0=RkI_0e^{kt}+\dfrac{I_0e^{kt}}C$. Durch $I_0e^{kt}\ne0$ teilen: $0=Rk+\dfrac1C\Rightarrow k=-\dfrac1{RC}$. Bei $t=0$ ist der Kondensator leer, $U_C=0$, die ganze Spannung liegt an $R$: $I_0=U_0/R$.</p>` },
        { id: 'PL6c', label: 'c)', be: 2, text: m`Folgern Sie daraus $U_C(t)=U_0\,(1-e^{-t/(RC)})$.`,
          sol: m`<p>$U_C=U_0-U_R=U_0-R\,I(t)=U_0-R\cdot\dfrac{U_0}Re^{-t/(RC)}=U_0\,(1-e^{-t/(RC)})$</p>` }
      ]
    }
  ];

  // ======================================================================
  // PROBEKLAUSUR (fest) und SPICKZETTEL
  // ======================================================================
  const PROBES = [
    { id: 'PK1', fach: F, titel: 'Probeklausur Physik: Kondensator, Röhre, Entladen', tasks: ['PE1', 'PL2', 'PP1', 'PC2', 'PW1', 'PR3', 'PL4'], minuten: 90 }
  ];

  const SPICK = m`<h3>Spannung, Energie, Potential</h3>
<ul><li>$U=\dfrac WQ$, $W=QU$; $1\,\text{eV}=1{,}602\cdot10^{-19}\,\text{J}$</li><li>$P=\dfrac Wt=UI$, $Q=It$ ($1\,\text{mAh}=3{,}6\,\text{C}$)</li><li>$U_{AB}=\varphi_B-\varphi_A$; homogen: $\varphi=Ex$, $E=\dfrac Ud=\dfrac{\Delta\varphi}{\Delta x}$; Feldlinien ⟂ Äquipotentiallinien</li></ul>
<h3>Kondensator</h3>
<ul><li>$C=\dfrac QU$, $C=\varepsilon_0\varepsilon_r\dfrac Ad$, $\sigma=\dfrac QA=\varepsilon_0\varepsilon_rE$</li><li><b>An der Quelle:</b> U fest. <b>Abgetrennt:</b> Q fest (E bleibt beim Auseinanderziehen).</li><li>$W=\tfrac12QU=\tfrac12CU^2$</li><li>parallel $C=C_1+C_2$ (gleiche U), Reihe $\tfrac1C=\tfrac1{C_1}+\tfrac1{C_2}$ (gleiche Q)</li></ul>
<h3>Braunsche Röhre</h3>
<ul><li>Glühkathode → Wehnelt → Anode (Loch) → Ablenkplatten → Schirm, Vakuum</li><li>$eU_B=\tfrac12m_ev_0^2$, $v_0=\sqrt{2eU_B/m_e}$</li><li>Querfeld: $x=v_0t$, $y=\tfrac12at^2$, $a=\dfrac{eU}{m_ed}$ ⇒ $y=\dfrac12\dfrac{e}{m_e}\dfrac Ud\dfrac{x^2}{v_0^2}=\dfrac{Ux^2}{4dU_B}$</li><li>$\tan\alpha=\dfrac{Ul}{2dU_B}$, Schirm: $Y=y(l)+L\tan\alpha$; Platte getroffen, wenn $y>\tfrac d2$</li></ul>
<h3>Auf- und Entladen</h3>
<ul><li>$\tau=RC$, $t_h=\tau\ln2$; nach $\tau$: 63 % / 37 %; nach $5\tau$ fertig</li><li>Laden: $U_C=U_0(1-e^{-t/\tau})$, $I=\tfrac{U_0}Re^{-t/\tau}$</li><li>Entladen: $U_C=U_0e^{-t/\tau}$, $I=-\tfrac{U_0}Re^{-t/\tau}$, $Q=Q_0e^{-t/\tau}$</li><li>Zeit: $t=\tau\ln\dfrac{U_0}{U}$; bis $U_0/3$: $C=\dfrac{t_E}{R\ln3}$</li><li>Linearisierung: $\ln(U/U_0)$ gegen $t$, Steigung $-1/\tau$</li><li>DGL: $U_0=RI+\tfrac QC\Rightarrow0=R\dot I+\tfrac IC$</li><li>Messunsicherheit: größte relative Unsicherheit übernehmen, 2 signifikante Stellen</li></ul>
<p class="dim">Konstanten: $e=1{,}602\cdot10^{-19}\,\text{C}$, $m_e=9{,}109\cdot10^{-31}\,\text{kg}$, $\varepsilon_0=8{,}854\cdot10^{-12}\,\tfrac{\text{As}}{\text{Vm}}$</p>`;

  window.LR_LESSONS = (window.LR_LESSONS || []).concat(LESSONS);
  window.LR_TASKS = (window.LR_TASKS || []).concat(TASKS);
  window.LR_PROBES = (window.LR_PROBES || []).concat(PROBES);
  window.LR_SPICK = Object.assign(window.LR_SPICK || {}, { physik: SPICK });
})();
