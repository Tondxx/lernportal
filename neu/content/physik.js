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
      id: 'PH1', fach: F, groessen: ['Q','U','W','eV','I','P','t'], num: 1, min: 12, demo: 'p-energie', demoTitel: 'Schau zuerst: Ein Teilchen fällt durchs Feld',
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
      id: 'PH2', fach: F, groessen: ['phi','U','E','x','d'], num: 2, min: 14, demo: 'p-potential', demoTitel: 'Probier es aus: die Potentialsonde',
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
      id: 'PH3', fach: F, groessen: ['C', 'Q', 'U', 'A', 'd', 'eps0', 'epsr', 'E', 'sigma'], num: 3, min: 18, demo: 'p-platten', demoTitel: 'Probier es aus: Platten verschieben, Glas einschieben',
      title: 'Kapazität und Plattenkondensator',
      short: 'C = Q/U, C = ε₀·εᵣ·A/d, an der Quelle oder abgetrennt',
      idee: m`<p>Ein <b>Kondensator</b> besteht aus zwei Metallplatten, die sich nicht berühren. Schließt man eine Spannungsquelle an, schiebt sie Elektronen von der einen Platte auf die andere. Die eine Platte wird positiv ($+Q$), die andere genauso stark negativ ($-Q$). Zwischen den Platten entsteht ein elektrisches Feld.</p>
<h3>1. Kapazität: Wie viel Ladung passt drauf?</h3>
<p>Doppelte Spannung schiebt doppelt so viel Ladung auf die Platten. Ladung und Spannung sind also proportional. Der Faktor dazwischen ist die <b>Kapazität</b>:</p>
${merke('Kapazität', m`$$C=\frac{Q}{U}$$<p>$C$ = Kapazität in F · $Q$ = Ladung auf <b>einer</b> Platte in C · $U$ = Spannung zwischen den Platten in V.</p><p>Beispiel: $C=1\,\mu\text{F}$ heißt, pro Volt kommt $1\,\mu\text{C}$ auf die Platte.</p>`)}
<h3>2. Wovon hängt C ab? Nur vom Bau.</h3>
${merke('Plattenkondensator', m`$$C=\varepsilon_0\cdot\varepsilon_r\cdot\frac{A}{d}$$`)}
<ul><li><b>Größere Fläche $A$</b>: mehr Platz für Ladung, also $C$ größer.</li><li><b>Kleinerer Abstand $d$</b>: Die Ladungen auf beiden Platten ziehen sich stärker an, es passt mehr drauf, also $C$ größer.</li><li><b>Isolator zwischen den Platten</b> ($\varepsilon_r>1$, z. B. Glas): $C$ wird $\varepsilon_r$-mal so groß.</li><li>$\varepsilon_0$ ist nur eine feste Zahl aus der Formelsammlung, damit Farad herauskommt.</li></ul>
<h3>3. Das Feld zwischen den Platten</h3>
<p>Die Spannung verteilt sich gleichmäßig über den Abstand. Je kürzer der Abstand bei gleicher Spannung, desto stärker das Feld:</p>
${merke('Feldstärke', m`$$E=\frac{U}{d}\qquad\text{und}\qquad \sigma=\frac{Q}{A}=\varepsilon_0\,\varepsilon_r\,E$$<p>$\sigma$ (sigma) = wie dicht die Ladung auf der Platte sitzt. Dichter gepackte Ladung, stärkeres Feld.</p>`)}`,
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
        { q: m`Formel für die Kapazität eines Plattenkondensators? Was macht jede Größe?`, a: m`$C=\varepsilon_0\varepsilon_r\dfrac Ad$: größere Fläche $A$ und kleinerer Abstand $d$ machen $C$ größer, ein Isolator mit $\varepsilon_r$ macht $C$ $\varepsilon_r$-mal so groß.` },
        { q: 'Abgetrennter Kondensator, Abstand verdoppelt: Was passiert mit Q, C, U, E?', a: m`$Q$ bleibt, $C$ halbiert, $U$ verdoppelt, $E$ bleibt gleich.` },
        { q: 'An der Quelle, Glasplatte eingeschoben: Was passiert mit Q?', a: m`$C$ steigt um den Faktor $\varepsilon_r$, $U$ bleibt, also steigt $Q=C\cdot U$ um $\varepsilon_r$.` }
      ]
    },
    {
      id: 'PH4', fach: F, groessen: ['W', 'C', 'U', 'Q', 'P', 't'], num: 4, min: 12, demo: 'p-energiec', demoTitel: 'Schau zu: Laden, Paket für Paket',
      title: 'Energie im Kondensator',
      short: 'W = ½·C·U², Fläche im U-Q-Diagramm, Blitzgerät',
      idee: m`<p>Ein geladener Kondensator speichert Energie. Woher kommt sie? Beim Laden muss die Quelle jede Ladung auf die Platte schieben, und zwar <b>gegen</b> die Spannung, die schon da ist.</p>
<ul><li>Das <b>erste</b> bisschen Ladung geht ganz leicht, denn der Kondensator ist noch leer (Spannung 0).</li><li>Das <b>letzte</b> bisschen muss gegen die volle Spannung $U$ geschoben werden.</li><li>Im Mittel zählt also nur die <b>halbe</b> Endspannung: $W=Q\cdot\dfrac{U}{2}$.</li></ul>
${merke('Energie im Kondensator', m`$$W=\tfrac12\,Q\cdot U=\tfrac12\,C\cdot U^2$$<p>$W$ = gespeicherte Energie in J · $C$ = Kapazität in F · $U$ = Spannung am Kondensator in V. Die zweite Form entsteht, wenn man $Q=C\cdot U$ einsetzt.</p>`)}
<p>Im $U$-$Q$-Diagramm (oben in der Animation) ist $W$ die <b>Dreiecksfläche</b> unter der Geraden: Grundseite $Q$, Höhe $U$, Fläche $\tfrac12QU$.</p>
<p>Wegen $U^2$ gilt: doppelte Spannung, <b>vierfache</b> Energie.</p>
<p>Ein Kondensator kann seine Energie sehr schnell abgeben. Dann ist die <b>Leistung</b> $P=\dfrac{W}{t}$ riesig (Blitzgerät, Defibrillator).</p>`,
      bild: m`<p>Wie ein Wasserturm, der von unten befüllt wird: Die ersten Liter sind leicht hochzupumpen, die letzten müssen gegen den vollen Wasserdruck. Im Mittel zählt nur die halbe Endhöhe, darum das $\tfrac12$.</p>`,
      rezept: [
        m`$C$ in F umrechnen (µF: mal $10^{-6}$), $U$ in V.`,
        m`Energie: $W=\tfrac12CU^2$. Erst $U^2$ ausrechnen, dann mal $C$, dann halbieren. Ergebnis in J.`,
        m`Leistung beim Entladen: $P=\dfrac{W}{t}$, nur den genutzten Anteil nehmen (z. B. 20 % Licht: $0{,}20\cdot W$).`,
        m`Gesucht $C$ für eine bestimmte Energie? Umstellen: $C=\dfrac{2W}{U^2}$.`
      ],
      beispiel: {
        q: m`Ein Blitzgerät-Kondensator ($200\,\mu\text{F}$) wird auf $320\,\text{V}$ geladen und entlädt sich in $2{,}0\,\text{ms}$. Wie viel Energie ist gespeichert, und welche Leistung gibt er im Mittel ab?`,
        steps: [
          { h: 'Gegeben und gesucht', t: m`<p>$C=200\,\mu\text{F}=200\cdot10^{-6}\,\text{F}=2{,}00\cdot10^{-4}\,\text{F}$, $U=320\,\text{V}$, $t=2{,}0\,\text{ms}=0{,}0020\,\text{s}$. Gesucht: Energie $W$ und mittlere Leistung $P$.</p>` },
          { h: 'Energie', t: m`<p>Wir kennen $C$ und $U$, also passt $W=\tfrac12CU^2$:</p><p>$W=\tfrac12\cdot2{,}00\cdot10^{-4}\,\text{F}\cdot(320\,\text{V})^2=\tfrac12\cdot2{,}00\cdot10^{-4}\cdot102\,400\,\text{J}=10{,}24\,\text{J}$</p>` },
          { h: 'Mittlere Leistung', t: m`<p>Leistung ist Energie pro Zeit. Die ganzen 10 J werden in 2 ms abgegeben:</p><p>$P=\dfrac{W}{t}=\dfrac{10{,}24\,\text{J}}{0{,}0020\,\text{s}}=5120\,\text{W}\approx5{,}1\,\text{kW}$</p>` },
          { h: 'Deuten', t: 'Die Energie ist klein (etwa so viel, wie man braucht, um 1 kg einen Meter hochzuheben), aber sie kommt in 2 ms. Deshalb die riesige Leistung von über 5 kW. Genau dafür nimmt man einen Kondensator: langsam laden, schlagartig entladen.' }
        ]
      },
      fehler: [
        m`$W=Q\cdot U$ statt $\tfrac12QU$ benutzt. Das $\tfrac12$ kommt daher, dass die Spannung beim Laden erst von 0 an wächst.`,
        m`µF nicht umgerechnet: $200\,\mu\text{F}=2{,}00\cdot10^{-4}\,\text{F}$.`,
        m`$U^2$ vergessen: doppelte Spannung → vierfache Energie.`
      ],
      test: [
        { q: 'Drei Formeln für die Energie im Kondensator?', a: m`$W=\tfrac12QU=\tfrac12CU^2=\dfrac{Q^2}{2C}$` },
        { q: m`Warum steht dort $\tfrac12$?`, a: 'Beim Laden wächst die Spannung von 0 an mit. Im Mittel muss jede Ladung nur gegen die halbe Endspannung geschoben werden (Dreiecksfläche im U-Q-Diagramm).' },
        { q: 'Spannung verdreifacht. Energie?', a: 'Neunmal so groß (W ∼ U²).' }
      ]
    },
    {
      id: 'PH5', fach: F, groessen: ['C','Q','U'], num: 5, min: 10, demo: 'p-schaltung', demoTitel: 'Probier es aus: parallel oder in Reihe',
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
      id: 'PH6', fach: F, groessen: ['UB', 'e', 'me', 'v0'], num: 6, min: 12, demo: 'p-roehre', demoTitel: 'Schau zuerst: die Röhre in Betrieb',
      title: 'Braunsche Röhre: Elektronen erzeugen und beschleunigen',
      short: 'Glühelektrischer Effekt, Wehnelt-Zylinder, e·U_B = ½·m·v²',
      idee: m`<p>Die Braunsche Röhre macht aus einem Draht einen gebündelten, schnellen Elektronenstrahl. Von links nach rechts:</p>
<ol><li><b>Glühkathode:</b> Ein Draht wird geheizt. Dadurch haben seine Elektronen genug Energie, um das Metall zu verlassen (<b>glühelektrischer Effekt</b>). Kalt tritt fast nichts aus.</li><li><b>Wehnelt-Zylinder:</b> Ein Metallbecher um die Kathode, leicht negativ. Er drückt die Elektronen zur Mitte und bündelt sie.</li><li><b>Anode mit Loch:</b> Sie ist positiv gegenüber der Kathode. Die Spannung $U_B$ zwischen beiden beschleunigt die Elektronen. Durch das Loch fliegen sie weiter.</li><li><b>Danach</b> wirkt keine Kraft mehr: Die Elektronen fliegen mit konstanter Geschwindigkeit $v_0$ bis zum <b>Leuchtschirm</b>.</li><li>Alles im <b>Vakuum</b>: Luftmoleküle würden die Elektronen abbremsen und streuen.</li></ol>
<h3>Wie schnell werden die Elektronen?</h3>
<p>Energieerhaltung: Die elektrische Energie, die das Elektron beim Durchlaufen von $U_B$ bekommt ($W=e\cdot U_B$, siehe Lektion 1), wird komplett zu Bewegungsenergie ($\tfrac12mv^2$):</p>
${merke('Energieerhaltung', m`$$e\cdot U_B=\tfrac12\,m_e\,v_0^2\qquad\Longrightarrow\qquad v_0=\sqrt{\frac{2\,e\,U_B}{m_e}}$$<p>Umstellen: mal 2, durch $m_e$, dann Wurzel ziehen.</p>`)}`,
      bild: m`<p>Wie eine Kugel, die eine Rampe hinunterrollt: Die Höhe ($U_B$) bestimmt die Endgeschwindigkeit. Wegen der Wurzel gilt: vierfache Höhe ergibt nur doppelte Geschwindigkeit ($v_0\sim\sqrt{U_B}$).</p>`,
      rezept: [
        m`Ansatz hinschreiben (gibt Punkte!): $e\,U_B=\tfrac12m_ev_0^2$.`,
        m`Nach $v_0$ umstellen: $v_0=\sqrt{2eU_B/m_e}$. $e$ und $m_e$ stehen in der Formelsammlung.`,
        m`Rückwärts, gesucht $U_B$: $U_B=\dfrac{m_ev_0^2}{2e}$.`,
        'Funktion beschreiben: Glühkathode (Elektronen treten aus) → Wehnelt (bündeln) → Anode mit Loch (beschleunigen) → Schirm; Vakuum.'
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
      fehler: [
        m`$v\sim U_B$ angenommen. Richtig ist $v\sim\sqrt{U_B}$.`,
        'Glühelektrischer Effekt mit Photoeffekt verwechselt: Hier liefert die Heizung die Energie, nicht Licht.',
        'Vergessen zu sagen, warum Vakuum nötig ist (sonst Stöße mit Gasmolekülen, Strahl wird gestreut und abgeschwächt).'
      ],
      test: [
        { q: 'Warum braucht die Braunsche Röhre eine Heizung?', a: 'Glühelektrischer Effekt: Nur aus heißem Metall treten genügend Elektronen aus.' },
        { q: m`Woher kommt die Formel $v_0=\sqrt{2eU_B/m_e}$?`, a: m`Energieerhaltung: elektrische Energie $eU_B$ = Bewegungsenergie $\tfrac12m_ev_0^2$, nach $v_0$ umgestellt.` },
        { q: 'Warum fließt in einer Glühdiode nur in einer Richtung Strom?', a: 'Nur die geheizte Elektrode gibt Elektronen ab. Ist die Gegenelektrode negativ, werden sie zurückgedrängt.' },
        { q: 'Wozu dient der Wehnelt-Zylinder?', a: 'Er ist negativ gegenüber der Kathode und bündelt den Elektronenstrahl.' }
      ]
    },
    {
      id: 'PH7', fach: F, groessen: ['UB', 'UAbl', 'd', 'l', 'v0', 'a', 'x', 'y', 'alpha', 'L', 'Y'], num: 7, min: 20, demo: 'p-ablenkung', demoTitel: 'Probier es aus: Strahl ablenken',
      title: 'Ablenkung im Querfeld',
      short: 'Parabelbahn wie beim waagerechten Wurf, y = U·x²/(4·d·U_B)',
      idee: m`<p>Das Elektron kommt mit der Geschwindigkeit $v_0$ (aus Lektion 6) waagerecht zwischen zwei Platten. An den Platten liegt die Ablenkspannung $U$, oben $+$, unten $-$. Das Feld zieht das Elektron zur positiven Platte. Wir bauen die Bahn in vier Schritten zusammen.</p>
<h3>Schritt 1: Waagerecht passiert nichts Neues</h3>
<p>Das Feld zieht nur senkrecht, also gibt es waagerecht keine Kraft. Das Elektron fliegt waagerecht gleichmäßig weiter:</p>
${merke('waagerecht', m`$$x=v_0\cdot t$$<p>$x$ = wie weit es schon in den Platten ist, $t$ = Zeit seit dem Eintritt.</p>`)}
<h3>Schritt 2: Senkrecht wirkt eine konstante Kraft</h3>
<p>Im Plattenkondensator ist das Feld überall gleich ($E=U/d$), also auch die Kraft $F=e\cdot E=\dfrac{e\,U}{d}$. Konstante Kraft heißt konstante Beschleunigung $a=\dfrac{F}{m_e}$, und dafür gilt wie beim freien Fall:</p>
${merke('senkrecht', m`$$a=\frac{e\,U}{m_e\,d}\qquad y=\tfrac12\,a\,t^2$$`)}
<h3>Schritt 3: Zusammensetzen (Bahngleichung)</h3>
<p>Wir wollen $y$ abhängig vom Ort $x$, nicht von der Zeit. Also Schritt 1 nach der Zeit umstellen, $t=\dfrac{x}{v_0}$, und in Schritt 2 einsetzen:</p>
${merke('Bahn im Kondensator: eine Parabel', m`$$y(x)=\frac12\cdot\frac{e\,U}{m_e\,d}\cdot\frac{x^2}{v_0^2}$$<p>Setzt man noch $v_0^2=\dfrac{2eU_B}{m_e}$ ein, kürzen sich $e$ und $m_e$ weg:</p>$$y(x)=\frac{U\,x^2}{4\,d\,U_B}$$`)}
<h3>Schritt 4: Hinter den Platten geht es geradeaus</h3>
<p>Am Plattenende ($x=l$) hört die Kraft auf. Das Elektron fliegt schräg geradeaus weiter, mit dem Winkel $\alpha$: $\tan\alpha=\dfrac{v_y}{v_0}=\dfrac{U\,l}{2\,d\,U_B}$. Auf dem Schirm im Abstand $L$ kommt es bei $Y=y(l)+L\cdot\tan\alpha$ an.</p>`,
      bild: m`<p>Genau wie ein Ball, der waagerecht vom Tisch rollt: vorwärts konstant schnell, nach unten immer schneller. Statt der Schwerkraft zieht hier die elektrische Kraft. In der Animation zeigt „Bewegung zerlegen“ beide Bewegungen einzeln.</p>
${achtung('Wichtig fürs Erläutern', m`<p>In $y=\dfrac{Ux^2}{4dU_B}$ kommt $e/m_e$ nicht mehr vor. Wer nur $U_B$, $U$, $d$ und die Ablenkung misst, kann damit <b>nicht</b> die spezifische Ladung $e/m_e$ bestimmen.</p>`)}`,
      rezept: [
        m`$v_0$ aus der Beschleunigung: $v_0=\sqrt{2eU_B/m_e}$.`,
        m`Zeit zwischen den Platten: Strecke durch Geschwindigkeit, $t=\dfrac{l}{v_0}$. Beschleunigung: $a=\dfrac{eU}{m_ed}$.`,
        m`Ablenkung am Plattenende: $y=\tfrac12at^2$, oder direkt $y=\dfrac{Ul^2}{4dU_B}$. Prüfen: Ist $y$ kleiner als $d/2$? Sonst trifft das Elektron die Platte.`,
        m`Auftreffpunkt: $\tan\alpha=\dfrac{Ul}{2dU_B}$, dann $Y=y+L\cdot\tan\alpha$.`
      ],
      beispiel: {
        q: m`$U_B=1000\,\text{V}$, Ablenkspannung $U=200\,\text{V}$, Plattenabstand $d=4{,}0\,\text{cm}$, Plattenlänge $l=8{,}0\,\text{cm}$, Schirm $L=20\,\text{cm}$ hinter den Platten. Wo trifft der Strahl auf?`,
        steps: [
          { h: 'Gegeben und gesucht, alles in m', t: m`<p>$U_B=1000\,\text{V}$ (beschleunigt), $U=200\,\text{V}$ (lenkt ab), $d=0{,}040\,\text{m}$, $l=0{,}080\,\text{m}$, $L=0{,}20\,\text{m}$. Gesucht: Auftreffpunkt $Y$.</p>` },
          { h: 'Ablenkung am Plattenende', t: m`<p>Die Formel ohne $e$ und $m_e$ spart Rechnung. Wir setzen $x=l$ ein (Ende der Platten):</p><p>$y=\dfrac{U\,l^2}{4\,d\,U_B}=\dfrac{200\cdot0{,}080^2}{4\cdot0{,}040\cdot1000}\,\text{m}=\dfrac{1{,}28}{160}\,\text{m}=0{,}0080\,\text{m}=8{,}0\,\text{mm}$</p><p>Kontrolle: Die Platte ist $d/2=20\,\text{mm}$ von der Mitte entfernt, $8\,\text{mm}$ ist weniger. Das Elektron kommt durch.</p>` },
          { h: 'Austrittswinkel', t: m`<p>Wie schräg fliegt es heraus? $\tan\alpha=\dfrac{U\,l}{2\,d\,U_B}=\dfrac{200\cdot0{,}080}{2\cdot0{,}040\cdot1000}=0{,}20$, also $\alpha=11{,}3^\circ$.</p>` },
          { h: 'Gerade bis zum Schirm', t: m`<p>Auf $L=200\,\text{mm}$ steigt die Gerade um $L\cdot\tan\alpha=200\,\text{mm}\cdot0{,}20=40\,\text{mm}$. Dazu kommen die $8\,\text{mm}$ aus den Platten:</p><p>$Y=8{,}0\,\text{mm}+40\,\text{mm}=48\,\text{mm}=4{,}8\,\text{cm}$ über der Schirmmitte.</p>` }
        ]
      },
      fehler: [
        'Hinter den Platten weiter mit der Parabel gerechnet. Dort wirkt keine Kraft mehr: Gerade.',
        m`Die waagerechte Geschwindigkeit ändert sich nicht. $v_0$ bleibt, nur $v_y$ kommt hinzu.`,
        m`Vergessen zu prüfen, ob $y<d/2$ ist. Sonst trifft das Elektron die Platte.`,
        m`$U$ und $U_B$ verwechselt: $U_B$ beschleunigt (steht im Nenner), $U$ lenkt ab (steht im Zähler).`
      ],
      test: [
        { q: 'Welche Bewegungen überlagern sich im Querfeld?', a: 'Waagerecht gleichförmig (keine Kraft), senkrecht gleichmäßig beschleunigt (konstante Feldkraft), wie beim waagerechten Wurf.' },
        { q: 'Wie kommt man von x = v₀t und y = ½at² zur Bahngleichung?', a: m`$t=x/v_0$ in $y=\tfrac12at^2$ einsetzen: $y=\tfrac12a\dfrac{x^2}{v_0^2}$ mit $a=\dfrac{eU}{m_ed}$.` },
        { q: m`Beschleunigungsspannung verdoppelt. Ablenkung am Plattenende?`, a: m`Halbiert, weil $y\sim\dfrac1{U_B}$ (schnellere Elektronen sind kürzer im Feld).` },
        { q: m`Warum kann man mit diesem Aufbau $e/m$ nicht bestimmen?`, a: m`$e/m$ kürzt sich heraus, wenn man $v_0^2=2eU_B/m$ einsetzt.` }
      ]
    },

    // ---------------------------------------------------------------- Ordner: Auf- und Entladen
    {
      id: 'PH8', fach: F, groessen: ['U0', 'UC', 'UR', 'R', 'C', 'I', 'I0', 'tau', 'th', 'euler'], num: 8, min: 18, demo: 'p-rc', demoTitel: 'Schau zuerst: Laden und Entladen live',
      title: 'Auf- und Entladen: die Kurven',
      short: 'τ = R·C, 63 % / 37 %, Halbwertszeit, nach 5 τ fertig',
      idee: m`<p>Ein Kondensator wird über einen Widerstand $R$ an eine Quelle mit der Spannung $U_0$ gelegt. Was passiert Schritt für Schritt?</p>
<ol><li><b>Einschalten:</b> Der Kondensator ist leer, $U_C=0$. Die ganze Spannung liegt am Widerstand. Es fließt der größte Strom: $I_0=\dfrac{U_0}{R}$. (Der leere Kondensator wirkt wie ein Kurzschluss.)</li><li><b>Ladung kommt an:</b> Der Kondensator bekommt eine Spannung $U_C$. Für den Widerstand bleibt nur noch der Rest: $U_R=U_0-U_C$. Also wird der Strom kleiner.</li><li><b>Je voller, desto langsamer:</b> Kleinerer Strom heißt, es kommt langsamer Ladung nach. Der Kondensator nähert sich $U_0$ immer langsamer an.</li><li><b>Voll:</b> $U_C=U_0$, für den Widerstand bleibt nichts, kein Strom mehr. (Der volle Kondensator wirkt wie eine Unterbrechung.)</li></ol>
<p>„Je mehr schon da ist, desto langsamer geht es weiter“: Genau so ein Verlauf ist eine <b>e-Funktion</b>.</p>
<h3>Die Zeitkonstante τ: das Tempo</h3>
${merke('Zeitkonstante', m`$$\tau=R\cdot C$$<p>Großer Widerstand (wenig Strom) oder große Kapazität (viel Platz): Es dauert länger. Einheit: $\Omega\cdot\text{F}=\text{s}$.</p>`)}
<h3>Die Formeln (AB 18)</h3>
${merke('Laden', m`$$U_C(t)=U_0\,\bigl(1-e^{-t/\tau}\bigr)\qquad I(t)=\frac{U_0}{R}\,e^{-t/\tau}$$`)}
${merke('Entladen', m`$$U_C(t)=U_0\,e^{-t/\tau}\qquad I(t)=-\frac{U_0}{R}\,e^{-t/\tau}$$<p>Minus: Der Strom fließt beim Entladen in die andere Richtung.</p>`)}
<p>So liest du $e^{-t/\tau}$: Das ist der <b>Anteil, der noch übrig ist</b>. Am Anfang 1 (100 %), nach $1\tau$ noch 0,37, nach $5\tau$ fast 0. Beim Laden ist $1-e^{-t/\tau}$ der Anteil, der <b>schon geschafft</b> ist.</p>
<ul><li>Nach $1\tau$: Spannung beim Laden bei <b>63 %</b>, Strom bei <b>37 %</b>.</li><li><b>Halbwertszeit</b> $t_h=\tau\cdot\ln2\approx0{,}69\,\tau$: In dieser Zeit halbiert sich der Strom (bzw. der Rest).</li><li>Nach $5\tau$ (≈ 7 Halbwertszeiten) gilt der Vorgang als fertig (unter 1 % Rest).</li></ul>`,
      bild: m`<p>Wie eine Badewanne, die über einen dünnen Schlauch abläuft: Am Anfang drückt viel Wasser, es fließt schnell. Je leerer, desto langsamer. Der Widerstand ist der Schlauch, die Kapazität die Größe der Wanne. Beides zusammen bestimmt $\tau$.</p>`,
      rezept: [
        m`$\tau=R\cdot C$ berechnen. kΩ und µF erst umrechnen ($10\,\text{k}\Omega=10\,000\,\Omega$, $470\,\mu\text{F}=0{,}000470\,\text{F}$).`,
        m`Laden oder Entladen? Die passende Formel aufschreiben. Faustregel: Steigt die Größe, steht $(1-e^{-t/\tau})$ da; fällt sie, nur $e^{-t/\tau}$.`,
        m`Zeit einsetzen: erst $-t/\tau$ ausrechnen, dann $e^{\ldots}$ mit der Taste $e^x$.`,
        m`Zeit gesucht? Nach $e^{-t/\tau}$ auflösen und logarithmieren (Lektion 9).`
      ],
      beispiel: {
        q: m`$C=470\,\mu\text{F}$ wird über $R=10\,\text{k}\Omega$ an $U_0=12\,\text{V}$ geladen (anfangs leer). Berechne $\tau$, $t_h$, $I_0$ sowie $U_C$ und $I$ nach $5{,}0\,\text{s}$.`,
        steps: [
          { h: 'Gegeben und gesucht', t: m`<p>$C=470\cdot10^{-6}\,\text{F}$, $R=10\,000\,\Omega$, $U_0=12\,\text{V}$, Laden. Gesucht: $\tau$, $t_h$, $I_0$, $U_C(5\,\text{s})$, $I(5\,\text{s})$.</p>` },
          { h: 'Tempo: Zeitkonstante und Halbwertszeit', t: m`<p>$\tau=R\cdot C=10\,000\,\Omega\cdot470\cdot10^{-6}\,\text{F}=4{,}7\,\text{s}$</p><p>$t_h=\tau\cdot\ln2=4{,}7\,\text{s}\cdot0{,}693=3{,}26\,\text{s}$: Alle 3,26 s halbiert sich der Strom.</p>` },
          { h: 'Anfangsstrom', t: m`<p>Im ersten Moment ist der Kondensator leer, die ganzen 12 V liegen am Widerstand:</p><p>$I_0=\dfrac{U_0}{R}=\dfrac{12\,\text{V}}{10\,000\,\Omega}=0{,}0012\,\text{A}=1{,}2\,\text{mA}$</p>` },
          { h: 'Spannung nach 5 s', t: m`<p>Laden, also $U_C=U_0(1-e^{-t/\tau})$. Erst der Anteil, der noch fehlt: $e^{-5{,}0/4{,}7}=e^{-1{,}064}=0{,}345$. Geschafft sind also $1-0{,}345=0{,}655$, gut 65 %:</p><p>$U_C=12\,\text{V}\cdot0{,}655=7{,}86\,\text{V}$</p>` },
          { h: 'Strom nach 5 s', t: m`<p>Der Strom ist auf denselben Anteil $0{,}345$ gefallen: $I=1{,}2\,\text{mA}\cdot0{,}345=0{,}41\,\text{mA}$.</p><p>Kontrolle mit der Maschenregel: Am Widerstand liegen $12-7{,}86=4{,}14\,\text{V}$, und $\dfrac{4{,}14\,\text{V}}{10\,000\,\Omega}=0{,}41\,\text{mA}$. Passt.</p>` }
        ]
      },
      fehler: [
        m`Lade- und Entladeformel vertauscht. Laden: $U_C$ steigt, also $(1-e^{-t/\tau})$. Entladen: $U_C$ fällt, also $e^{-t/\tau}$.`,
        'kΩ und µF nicht umgerechnet: 10 kΩ · 470 µF = 10 000 Ω · 0,00047 F = 4,7 s.',
        m`Halbwertszeit mit $\tau$ verwechselt: $t_h=\tau\cdot\ln2$, nicht $\tau$.`,
        m`Das $e$ in $e^{-t/\tau}$ für die Elementarladung gehalten. Hier ist es die Zahl 2,718.`
      ],
      test: [
        { q: 'Warum ist der Ladestrom am Anfang am größten?', a: m`Der Kondensator ist leer ($U_C=0$), die ganze Spannung liegt am Widerstand: $I_0=U_0/R$. Mit wachsender $U_C$ bleibt für $R$ weniger.` },
        { q: m`Wie viel Prozent der Endspannung sind nach $1\,\tau$ erreicht?`, a: '63 % (Strom: noch 37 %).' },
        { q: m`Was bedeutet $e^{-t/\tau}$ in Worten?`, a: 'Der Anteil, der noch übrig ist (Strom beim Laden, Spannung beim Entladen): am Anfang 1, nach τ 0,37.' },
        { q: m`Zusammenhang Halbwertszeit und Zeitkonstante?`, a: m`$t_h=\tau\cdot\ln2\approx0{,}69\,\tau$` },
        { q: 'Nach wie vielen τ gilt der Ladevorgang als beendet?', a: 'Nach 5 τ (unter 1 % Rest).' }
      ]
    },
    {
      id: 'PH9', fach: F, groessen: ['tE', 'tau', 'R', 'C', 'U0', 'UC', 'dQ', 'euler'], num: 9, min: 20, demo: 'p-messung', demoTitel: 'Probier es aus: C aus der Kurve bestimmen',
      title: 'Rechnen mit der e-Funktion und C messen',
      short: 'Nach t auflösen (ln), C = t_E/(R·ln 3) herleiten, Linearisierung, Messunsicherheit',
      idee: m`<h3>1. Der Logarithmus holt die Zeit herunter</h3>
<p>Die Zeit $t$ steckt im Exponenten von $e^{-t/\tau}$. Um sie herauszuholen, braucht man den <b>natürlichen Logarithmus</b> $\ln$. Er ist die Umkehrung von $e^x$:</p>
${merke('Die eine Regel', m`$$\ln\!\left(e^{x}\right)=x\qquad\text{also}\qquad \ln\!\left(e^{-t/\tau}\right)=-\frac{t}{\tau}$$`)}
<p>Vorgehen: Erst die e-Funktion <b>allein auf eine Seite</b> bringen, dann auf beiden Seiten $\ln$ nehmen. Weil $e^{-t/\tau}$ zwischen 0 und 1 liegt, ist sein Logarithmus negativ. Das Minus hebt sich mit dem Minus vor $t/\tau$ weg, $t$ wird positiv.</p>
<h3>2. Kapazität messen: die Herleitung von C = t_E / (R·ln 3)</h3>
<p>Wie in der Abi-Aufgabe „Kornfeuchte“: Man entlädt über einen bekannten Widerstand $R$ und stoppt die Zeit $t_E$, bis die Spannung auf ein Drittel gefallen ist. Daraus folgt $C$, Schritt für Schritt im Beispiel unten.</p>
<h3>3. Linearisierung: ist es wirklich eine e-Funktion?</h3>
<p>Trägt man nicht $U$, sondern $\ln(U/U_0)$ gegen $t$ auf, wird aus der Kurve eine <b>Gerade</b> mit der Steigung $-\dfrac1\tau$. Denn $\ln(U/U_0)=\ln(e^{-t/\tau})=-\dfrac1\tau\cdot t$. Liegen Messpunkte so auf einer Geraden, ist es eine e-Funktion, und aus der Steigung (Regression) folgt $\tau$.</p>`,
      bild: m`<p><b>Messunsicherheit (Regel aus „Runden und Messunsicherheit“):</b> Die relative Unsicherheit des Ergebnisses ist so groß wie die <b>größte</b> relative Unsicherheit der Eingangsgrößen. Beispiel: Widerstand ±5 %, Zeit ±2 %: Ergebnis ±5 %. Unsicherheiten mit zwei signifikanten Stellen angeben.</p>`,
      rezept: [
        m`Passende Formel aufschreiben (Laden oder Entladen) und die bekannten Werte einsetzen.`,
        m`$e^{-t/\tau}$ isolieren: durch $U_0$ teilen (beim Laden vorher $1-\ldots$ umstellen).`,
        m`Beide Seiten logarithmieren: $-\dfrac t\tau=\ln(\ldots)$, dann nach $t$, $R$ oder $C$ auflösen.`,
        m`Kontrolle: Zeit positiv? Größenordnung passt zu $\tau$ (0,7 τ für die Hälfte, 1,1 τ für ein Drittel, 2,3 τ für 10 %)?`
      ],
      beispiel: {
        q: m`Herleitung wie im Abi: Ein Kondensator wird über $R$ entladen. $t_E$ ist die Zeit, bis die Spannung von $U_0$ auf $\tfrac13U_0$ gefallen ist. Zeige $C=\dfrac{t_E}{R\cdot\ln3}$ und berechne $C$ für $R=47\,\text{k}\Omega$, $t_E=50{,}0\,\text{s}$.`,
        steps: [
          { h: 'Entladegesetz aufschreiben', t: m`<p>Beim Entladen gilt $U_C(t)=U_0\cdot e^{-t/(RC)}$ (mit $\tau=RC$ ausgeschrieben, weil wir $C$ suchen).</p>` },
          { h: 'Messbedingung einsetzen', t: m`<p>Zur Zeit $t=t_E$ ist noch ein Drittel übrig: $\tfrac13U_0=U_0\cdot e^{-t_E/(RC)}$.</p><p>Durch $U_0$ teilen. Die Startspannung fällt heraus, man muss sie also gar nicht kennen: $\tfrac13=e^{-t_E/(RC)}$.</p>` },
          { h: 'Logarithmieren', t: m`<p>$\ln$ auf beiden Seiten: $\ln\tfrac13=-\dfrac{t_E}{RC}$.</p><p>Weil $\ln\tfrac13=-\ln3$, kann man beide Minus streichen: $\ln3=\dfrac{t_E}{RC}$.</p>` },
          { h: 'Nach C umstellen', t: m`<p>Mal $C$, dann durch $\ln3$: $\;C=\dfrac{t_E}{R\cdot\ln3}$. Fertig hergeleitet.</p>` },
          { h: 'Zahlen einsetzen', t: m`<p>$C=\dfrac{50{,}0\,\text{s}}{47\,000\,\Omega\cdot1{,}0986}=9{,}68\cdot10^{-4}\,\text{F}\approx0{,}97\,\text{mF}$</p><p>Plausibel? $\tau=RC\approx45\,\text{s}$, und für ein Drittel braucht man $\ln3\approx1{,}1$ Zeitkonstanten, also etwa 50 s. Passt.</p>` }
        ]
      },
      extraAfter: m`<p><b>Noch ein Rechenbeispiel: Zeit gesucht.</b> Ein Kondensator ($\tau=4{,}7\,\text{s}$) wird von 12 V aus entladen. Wann liegen nur noch 2,0 V an?</p><p>$2{,}0=12\cdot e^{-t/4{,}7}\ \Rightarrow\ e^{-t/4{,}7}=\tfrac{2{,}0}{12}=\tfrac16\ \Rightarrow\ -\tfrac{t}{4{,}7}=\ln\tfrac16=-1{,}79\ \Rightarrow\ t=4{,}7\,\text{s}\cdot1{,}79=8{,}4\,\text{s}$</p><p><b>Abgeflossene Ladung</b> nach der Zeit $t$: Anfangsladung minus Rest, $\Delta Q=Q_0-Q_0e^{-t/\tau}=Q_0\,(1-e^{-t/\tau})$ mit $Q_0=C\cdot U_0$.</p>`,
      fehler: [
        m`$\ln$ auf eine Summe angewendet: $\ln(U_0(1-e^{-t/\tau}))$ geht nicht direkt. Erst $1-e^{-t/\tau}$ ausrechnen und $e^{-t/\tau}$ isolieren.`,
        m`Vorzeichen: $\ln$ von Zahlen kleiner 1 ist negativ, $t$ muss am Ende positiv sein.`,
        'Bei der Messunsicherheit die Unsicherheiten addiert. Nach der Regel aus dem Unterricht zählt die größte relative Unsicherheit.'
      ],
      test: [
        { q: m`Herleitung von $C=\dfrac{t_E}{R\ln3}$ in vier Schritten?`, a: m`1. $U=U_0e^{-t/(RC)}$ · 2. $\tfrac13U_0$ bei $t_E$ einsetzen, durch $U_0$ teilen · 3. logarithmieren: $\ln\tfrac13=-\tfrac{t_E}{RC}$ · 4. nach $C$ umstellen.` },
        { q: m`Wie löst man $0{,}2=e^{-t/\tau}$ nach $t$?`, a: m`$\ln$ nehmen: $-\tfrac t\tau=\ln0{,}2$, also $t=-\tau\ln0{,}2=1{,}61\,\tau$.` },
        { q: m`Was trägt man auf, um eine Gerade zu bekommen? Steigung?`, a: m`$\ln(U/U_0)$ gegen $t$, Steigung $-1/\tau$.` },
        { q: 'Widerstand ±5 %, gemessene Zeit ±1,7 %. Unsicherheit von C?', a: '±5 % (größte relative Unsicherheit).' }
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
      id: 'PE2', fach: F, groessen: [['U','3,7 V'],['Q','5000 mAh (das ist eine Ladung!)'],['P','1,2 W (Leuchte)'],['W','gesucht'],['t','Betriebsdauer, gesucht']], teil: 'B', lesson: 'PH1', title: 'Powerbank: Was steht auf dem Etikett?', afb: 'II', ops: 'Interpretieren, Berechnen',
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
      id: 'PP1', fach: F, groessen: [['d','8,0 cm = 0,080 m'],['x','Abstand von der negativen Platte: A bei 1,5 cm, B bei 6,0 cm'],['phi','4,5 V in A, 18,0 V in B, 0 an der negativen Platte'],['E','gesucht'],['U0','Spannung am Kondensator, gesucht'],['W','Arbeit von A nach B, gesucht']], teil: 'B', lesson: 'PH2', title: 'Messung mit der Potentialsonde', afb: 'II', ops: 'Bestimmen, Zeichnen, Erläutern',
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
      id: 'PP2', fach: F, groessen: ['phi','U','W'], teil: 'A', lesson: 'PH2', title: 'Äquipotentiallinien verstehen', afb: 'II', ops: 'Begründen, Erläutern',
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
        { id: 'PW1a', label: 'a)', be: 2, text: 'Berechnen Sie die gespeicherte Energie.', nums: [{ label: 'W in J', ans: 14.85, tol: 0.01 }],
          hints: [m`$C$ und $U$ sind bekannt: Welche Energieformel passt?`],
          sol: m`<p><b>Gedanke:</b> $C$ und $U$ sind gegeben, also $W=\tfrac12CU^2$.</p><p><b>Einsetzen:</b> $W=\tfrac12\cdot330\cdot10^{-6}\,\text{F}\cdot(300\,\text{V})^2=\tfrac12\cdot330\cdot10^{-6}\cdot90\,000\,\text{J}=14{,}85\,\text{J}\approx15\,\text{J}$</p>` },
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
          sol: m`<p>$W=\tfrac12CU^2$: Bei gleichem $C$ und doppeltem $U$ wird die Energie <b>vervierfacht</b>.</p>` }
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
      id: 'PL1', fach: F, groessen: [['C', '470 µF = 470·10⁻⁶ F'], ['R', '22 kΩ = 22 000 Ω'], ['U0', '9,0 V (Quelle)'], ['tau', 'gesucht'], ['I0', 'gesucht'], ['UC', 'nach 10 s, gesucht'], ['th', 'gesucht'], ['t', 'bis 99 %, gesucht']],
      teil: 'B', lesson: 'PH8', title: 'Ladekurve berechnen', afb: 'II', ops: 'Berechnen',
      intro: m`Ein Kondensator ($C=470\,\mu\text{F}$) wird über $R=22\,\text{k}\Omega$ an einer Quelle mit $U_0=9{,}0\,\text{V}$ geladen. Zu Beginn ist er leer.`,
      parts: [
        { id: 'PL1a', label: 'a)', be: 2, text: m`Berechnen Sie die Zeitkonstante und den Anfangsstrom.`, nums: [{ label: 'τ in s', ans: 10.34, tol: 0.01 }, { label: 'I₀ in µA', ans: 409.1, tol: 0.01 }],
          sol: m`<p><b>Zeitkonstante</b> (das Tempo): $\tau=R\cdot C=22\,000\,\Omega\cdot470\cdot10^{-6}\,\text{F}=10{,}3\,\text{s}$</p><p><b>Anfangsstrom:</b> Im ersten Moment ist der Kondensator leer, die ganzen 9 V liegen am Widerstand: $I_0=\dfrac{U_0}R=\dfrac{9{,}0\,\text{V}}{22\,000\,\Omega}=4{,}1\cdot10^{-4}\,\text{A}=409\,\mu\text{A}$</p>` },
        { id: 'PL1b', label: 'b)', be: 2, text: m`Berechnen Sie die Kondensatorspannung nach $10\,\text{s}$.`, nums: [{ label: 'U_C in V', ans: 5.578, tol: 0.01 }],
          hints: ['Laden: Die Spannung steigt. Welche der beiden Formeln steigt?'],
          sol: m`<p><b>Formel:</b> Laden, also $U_C=U_0\,(1-e^{-t/\tau})$.</p><p><b>Anteil, der noch fehlt:</b> $e^{-10/10{,}34}=e^{-0{,}967}=0{,}380$. Geschafft sind $1-0{,}380=0{,}620$, also 62 %.</p><p><b>Ergebnis:</b> $U_C=9{,}0\,\text{V}\cdot0{,}620=5{,}6\,\text{V}$ (passt: knapp unter $1\tau$, knapp unter 63 %).</p>` },
        { id: 'PL1c', label: 'c)', be: 2, text: 'Berechnen Sie die Halbwertszeit des Ladestroms.', nums: [{ label: 't_h in s', ans: 7.167, tol: 0.01 }],
          sol: m`<p><b>Gedanke:</b> Nach der Halbwertszeit ist nur noch die Hälfte des Stroms übrig: $e^{-t_h/\tau}=\tfrac12$, also $t_h=\tau\ln2$.</p><p>$t_h=10{,}34\,\text{s}\cdot0{,}693=7{,}2\,\text{s}$</p>` },
        { id: 'PL1d', label: 'd)', be: 2, text: 'Berechnen Sie, nach welcher Zeit 99 % der Endspannung erreicht sind.', nums: [{ label: 't in s', ans: 47.62, tol: 0.01 }],
          hints: [m`$0{,}99=1-e^{-t/\tau}\Rightarrow e^{-t/\tau}=0{,}01$`],
          sol: m`<p><b>Ansatz:</b> $0{,}99\,U_0=U_0\,(1-e^{-t/\tau})$. Durch $U_0$ teilen und umstellen: $e^{-t/\tau}=0{,}01$ (es fehlt nur noch 1 %).</p><p><b>Logarithmieren:</b> $-\dfrac t\tau=\ln0{,}01=-4{,}61$, also $t=4{,}61\cdot10{,}34\,\text{s}=47{,}6\,\text{s}$.</p><p>Das sind etwa $4{,}6\,\tau$, passt zur Regel „nach 5 τ fertig“.</p>` }
      ]
    },
    {
      id: 'PL2', fach: F, groessen: ['tau','th','I0','euler'], teil: 'A', lesson: 'PH8', title: 'Lade- und Entladekurven deuten', afb: 'II', ops: 'Begründen, Angeben',
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
      id: 'PL3', fach: F, groessen: [['C','100 µF'],['U0','50 V (Start des Entladens)'],['R','2,0 MΩ = 2 000 000 Ω'],['dQ','in den ersten 30 s, gesucht'],['th','gesucht'],['R','für t_h = 60 s, gesucht'],['I0','beim Wiederaufladen, gesucht']], teil: 'B', lesson: 'PH9', title: 'Entladen über einen großen Widerstand', afb: 'II', ops: 'Berechnen, Bestimmen',
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
      id: 'PL5', fach: F, groessen: [['R','50 kΩ'],['t','0 bis 50 s'],['UC','Messwerte in der Tabelle'],['tau','gesucht'],['C','gesucht']], teil: 'B', lesson: 'PH9', title: 'Entladung auswerten: Linearisierung', afb: 'II', ops: 'Zeigen, Bestimmen',
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
