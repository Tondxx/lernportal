/* ==========================================================================
   PHYSIK · GRÖSSEN-LEXIKON (Tonda, 10.11.: „in den Aufgaben wird mit Größen um sich geworfen,
   ich muss alles genau verstehen“).
   Jede Größe einmal erklärt: Symbol, Name, Einheit, was sie bedeutet, wie man sie sich vorstellt.
   Benutzt von:
     · Lektionen:  groessen: ['C', 'Q', …]          → Seite „Größen“ am Anfang der Lektion
     · Aufgaben:   groessen: [['C', '470 µF'], ['tau', 'gesucht'], …] → Kasten „Gegeben / Gesucht“
     · Lektion PH0 „Die Größen verstehen“ (ganze Liste + Karteikarten), wird hier erzeugt.
   window.LR_GROESSEN[fach][key] = { sym, name, einheit, was, bild? }
   ========================================================================== */
(function () {
  const m = String.raw;
  const G = {
    // ---------------------------------------------------------------- Ladung und Strom
    Q: { sym: m`$Q$`, name: 'Ladung', einheit: 'C (Coulomb)', was: 'Wie viel Elektrizität auf einem Körper sitzt (z. B. auf einer Kondensatorplatte) oder durch einen Draht geflossen ist.', bild: 'Zählt überzählige oder fehlende Elektronen, nur in einer großen Einheit: 1 C sind rund 6·10¹⁸ Elektronen.' },
    dQ: { sym: m`$\Delta Q$`, name: 'abgeflossene Ladung', einheit: 'C', was: m`Wie viel Ladung in einer bestimmten Zeit vom Kondensator weggeflossen ist: Anfangsladung minus Restladung, $\Delta Q=Q_0-Q(t)$.` },
    e: { sym: m`$e$`, name: 'Elementarladung', einheit: m`$1{,}602\cdot10^{-19}$ C (Formelsammlung)`, was: 'Ladung eines einzelnen Protons (+e) bzw. Elektrons (−e). Kleinere freie Ladungen gibt es nicht.' },
    me: { sym: m`$m_e$`, name: 'Masse eines Elektrons', einheit: m`$9{,}109\cdot10^{-31}$ kg (Formelsammlung)`, was: 'Winzig. Deshalb werden Elektronen schon durch kleine Kräfte enorm beschleunigt.' },
    I: { sym: m`$I$`, name: 'Stromstärke', einheit: 'A (Ampere) = C/s', was: m`Wie viel Ladung pro Sekunde durch den Draht fließt: $I=\dfrac{Q}{t}$.`, bild: 'Wie viele Liter pro Sekunde durch ein Rohr fließen.' },
    I0: { sym: m`$I_0$`, name: 'Anfangsstromstärke', einheit: 'A', was: m`Der Strom im allerersten Moment beim Laden oder Entladen. Dann liegt die ganze Spannung am Widerstand: $I_0=\dfrac{U_0}{R}$.` },
    // ---------------------------------------------------------------- Spannung, Energie
    U: { sym: m`$U$`, name: 'Spannung', einheit: 'V (Volt) = J/C', was: m`Energie pro Ladung zwischen <b>zwei</b> Punkten: $U=\dfrac{W}{Q}$. 1 V heißt: Jedes Coulomb bekommt 1 Joule.`, bild: 'Ein Höhenunterschied für Ladungen. Je größer, desto mehr Energie gewinnt eine Ladung, die „herunterfällt“.' },
    U0: { sym: m`$U_0$`, name: 'Anfangs- bzw. Quellenspannung', einheit: 'V', was: 'Die Spannung der Quelle beim Laden (Endwert, den der Kondensator erreicht) bzw. die Spannung, mit der das Entladen startet (t = 0).' },
    UC: { sym: m`$U_C$`, name: 'Spannung am Kondensator', einheit: 'V', was: m`Die Spannung, die gerade (zum Zeitpunkt $t$) zwischen den Platten liegt. Sie wächst beim Laden und fällt beim Entladen: $U_C=\dfrac{Q}{C}$.` },
    UR: { sym: m`$U_R$`, name: 'Spannung am Widerstand', einheit: 'V', was: m`Der Teil der Spannung, der am Widerstand abfällt: $U_R=R\cdot I$. Beim Laden gilt $U_0=U_R+U_C$ (Maschenregel).` },
    UB: { sym: m`$U_B$`, name: 'Beschleunigungsspannung', einheit: 'V', was: 'Spannung zwischen Kathode und Anode in der Braunschen Röhre. Sie macht die Elektronen schnell.' },
    UAbl: { sym: m`$U$`, name: 'Ablenkspannung', einheit: 'V', was: m`Spannung an den Ablenkplatten. Sie erzeugt das Querfeld, das den Strahl zur Seite zieht. (In den Formeln einfach $U$, nicht verwechseln mit $U_B$.)` },
    phi: { sym: m`$\varphi$`, name: 'Potential', einheit: 'V', was: m`Energie pro Ladung an <b>einem</b> Punkt, gemessen gegenüber einem Bezugspunkt mit $\varphi=0$ (meist die negative Platte). Spannung = Potentialunterschied.`, bild: 'Die Höhe eines Punktes über dem Boden. Die Spannung ist der Höhenunterschied zwischen zwei Punkten.' },
    W: { sym: m`$E_\text{el}$`, name: 'elektrische Energie', einheit: 'J (Joule)', was: m`Die Energie, die eine Ladung im Feld gewinnt ($E_\text{el}=Q\cdot U$) oder die im Kondensator steckt ($E_\text{el}=\tfrac12CU^2$). Im Unterricht heißt sie <b>$E_\text{el}$</b>, damit sie nicht mit der Feldstärke $E$ verwechselt wird. Die Arbeit ist die übertragene Energie: $W=\Delta E_\text{el}$.` },
    eV: { sym: 'eV', name: 'Elektronvolt (Einheit)', einheit: m`$1\,\text{eV}=1{,}602\cdot10^{-19}$ J`, was: 'Die Energie, die ein Elektron beim Durchlaufen von 1 V gewinnt. Praktisch für Elektronen: 500 V ergeben 500 eV.' },
    P: { sym: m`$P$`, name: 'Leistung', einheit: 'W (Watt) = J/s', was: m`Energie pro Zeit: $P=\dfrac{W}{t}=U\cdot I$. Ein Blitz gibt wenig Energie, aber in sehr kurzer Zeit ab, also große Leistung.` },
    // ---------------------------------------------------------------- Feld
    E: { sym: m`$E$`, name: 'elektrische Feldstärke', einheit: 'V/m = N/C', was: m`Kraft pro Ladung an einem Ort: $E=\dfrac{F}{Q}$. Im Plattenkondensator überall gleich: $E=\dfrac{U}{d}$.`, bild: 'Wie steil der „Spannungsberg“ ist: viel Spannung auf kurzer Strecke heißt starkes Feld.' },
    F: { sym: m`$F$`, name: 'Kraft', einheit: 'N (Newton)', was: m`Im Feld wirkt auf eine Ladung $F=Q\cdot E$, im Plattenkondensator also $F=\dfrac{Q\,U}{d}$.` },
    x: { sym: m`$x$`, name: 'Ort/Abstand', einheit: 'm', was: 'Beim Potential: Abstand von der negativen Platte. Bei der Röhre: wie weit das Elektron schon in die Platten hineingeflogen ist.' },
    // ---------------------------------------------------------------- Kondensator
    C: { sym: m`$C$`, name: 'Kapazität', einheit: 'F (Farad) = C/V', was: m`Wie viel Ladung ein Kondensator <b>pro Volt</b> aufnimmt: $C=\dfrac{Q}{U}$. Sie hängt nur vom Bau ab (Fläche, Abstand, Material), nicht von der Spannung.`, bild: 'Typische Werte: pF (10⁻¹²) beim Luftkondensator, µF (10⁻⁶) bis mF (10⁻³) bei Bauteilen.' },
    A: { sym: m`$A$`, name: 'Plattenfläche', einheit: 'm²', was: 'Die Fläche einer Platte (genauer: der Teil, in dem sich beide Platten gegenüberstehen). Größere Fläche, mehr Platz für Ladung, größere Kapazität.' },
    d: { sym: m`$d$`, name: 'Plattenabstand', einheit: 'm', was: 'Abstand zwischen den beiden Platten. Kleinerer Abstand, größere Kapazität, stärkeres Feld bei gleicher Spannung.' },
    eps0: { sym: m`$\varepsilon_0$`, name: 'elektrische Feldkonstante', einheit: m`$8{,}854\cdot10^{-12}\,\tfrac{\text{As}}{\text{Vm}}$ (Formelsammlung)`, was: 'Eine Naturkonstante. Sie macht aus „Fläche durch Abstand“ eine Kapazität in Farad. Man rechnet einfach mit dem Zahlenwert.' },
    epsr: { sym: m`$\varepsilon_r$`, name: 'Dielektrizitätszahl', einheit: 'ohne Einheit', was: 'Faktor, um den ein Isolator (Glas, Kunststoff, Getreide) zwischen den Platten die Kapazität vergrößert. Luft/Vakuum: 1, Glas etwa 5 bis 7.' },
    sigma: { sym: m`$\sigma$`, name: 'Flächenladungsdichte', einheit: 'C/m²', was: m`Ladung pro Fläche auf einer Platte: $\sigma=\dfrac{Q}{A}$. Sie bestimmt allein die Feldstärke: $E=\dfrac{\sigma}{\varepsilon_0\varepsilon_r}$.` },
    R: { sym: m`$R$`, name: 'Widerstand', einheit: 'Ω (Ohm) = V/A', was: m`Wie stark ein Bauteil den Strom bremst: $R=\dfrac{U}{I}$. Beim RC-Glied: großer Widerstand, langsames Laden.` },
    // ---------------------------------------------------------------- Zeit beim Laden/Entladen
    t: { sym: m`$t$`, name: 'Zeit', einheit: 's', was: 'Die Zeit seit dem Umlegen des Schalters (Laden oder Entladen). Bei der Röhre: Flugzeit zwischen den Platten.' },
    tau: { sym: m`$\tau$`, name: 'Zeitkonstante („tau“)', einheit: 's (denn Ω · F = s)', was: m`$\tau=R\cdot C$. Das „Tempo“ des Kondensators: Nach $1\tau$ ist er zu 63 % geladen bzw. auf 37 % entladen, nach $5\tau$ praktisch fertig.` },
    th: { sym: m`$t_h$`, name: 'Halbwertszeit', einheit: 's', was: m`Zeit, in der sich der Strom bzw. die Restspannung halbiert: $t_h=\tau\cdot\ln2\approx0{,}69\,\tau$.` },
    tE: { sym: m`$t_E$`, name: 'Entladezeit (bis ein Drittel)', einheit: 's', was: m`In der Abi-Aufgabe (Kornfeuchte): die Zeit, bis die Spannung von $U_0$ auf $\tfrac13U_0$ gefallen ist. Es gilt $t_E=\tau\ln3$.` },
    euler: { sym: m`$e^{-t/\tau}$`, name: 'e-Funktion (Eulersche Zahl e ≈ 2,718)', einheit: 'Zahl zwischen 0 und 1', was: m`<b>Achtung:</b> Hier ist $e$ die Zahl 2,718…, nicht die Elementarladung. $e^{-t/\tau}$ sagt, welcher <b>Anteil</b> noch übrig ist: bei $t=0$ alles (1), nach $1\tau$ noch 0,37, nach $5\tau$ fast nichts.` },
    // ---------------------------------------------------------------- Braunsche Röhre
    v0: { sym: m`$v_0$`, name: 'Eintrittsgeschwindigkeit', einheit: 'm/s', was: m`Geschwindigkeit der Elektronen nach der Beschleunigung, also beim Eintritt in die Ablenkplatten: $v_0=\sqrt{\dfrac{2eU_B}{m_e}}$. Sie bleibt waagerecht konstant.` },
    vy: { sym: m`$v_y$`, name: 'Quergeschwindigkeit', einheit: 'm/s', was: m`Geschwindigkeit senkrecht zu den Platten, die das Feld dazugibt: $v_y=a\cdot t$. Am Anfang 0.` },
    a: { sym: m`$a$`, name: 'Beschleunigung (quer)', einheit: 'm/s²', was: m`Wie schnell die Quergeschwindigkeit wächst: $a=\dfrac{F}{m_e}=\dfrac{e\,U}{m_e\,d}$.` },
    l: { sym: m`$l$`, name: 'Länge der Ablenkplatten', einheit: 'm', was: 'Wie lang die Strecke ist, auf der das Querfeld wirkt.' },
    L: { sym: m`$L$`, name: 'Abstand bis zum Schirm', einheit: 'm', was: 'Strecke vom Ende der Ablenkplatten bis zum Leuchtschirm. Dort fliegt das Elektron geradeaus.' },
    y: { sym: m`$y$`, name: 'Ablenkung', einheit: 'm', was: m`Wie weit das Elektron zur Seite abgelenkt ist, gemessen von der Mittellinie. Am Plattenende: $y(l)$.` },
    alpha: { sym: m`$\alpha$`, name: 'Austrittswinkel', einheit: '°', was: m`Winkel zwischen der Flugrichtung am Plattenende und der Mittellinie: $\tan\alpha=\dfrac{v_y}{v_0}$.` },
    Y: { sym: m`$Y$`, name: 'Auftreffpunkt auf dem Schirm', einheit: 'm', was: m`Abstand des Leuchtpunkts von der Schirmmitte: Ablenkung in den Platten plus Strecke, die er danach schräg weiterfliegt: $Y=y(l)+L\tan\alpha$.` }
  };

  // Lektion PH0: ganzes Lexikon, gruppiert, mit Karteikarten
  const GRUPPEN = [
    ['Ladung und Strom', ['Q', 'e', 'I', 'I0']],
    ['Spannung, Energie, Leistung', ['U', 'U0', 'UC', 'UR', 'phi', 'W', 'eV', 'P']],
    ['Feld', ['E', 'F']],
    ['Kondensator', ['C', 'A', 'd', 'eps0', 'epsr', 'sigma', 'R']],
    ['Laden und Entladen', ['t', 'tau', 'th', 'tE', 'euler']],
    ['Braunsche Röhre', ['UB', 'UAbl', 'me', 'v0', 'vy', 'a', 'l', 'L', 'y', 'alpha', 'Y']]
  ];
  const row = k => { const g = G[k]; return `<tr><td class="gr-sym">${g.sym}</td><td><b>${g.name}</b><br><span class="dim">${g.einheit}</span></td><td>${g.was}</td></tr>`; };
  const idee = `<p>In jeder Aufgabe tauchen Buchstaben auf. Wer bei jedem Buchstaben sofort weiß, <b>was er bedeutet und in welcher Einheit er gemessen wird</b>, versteht die Formeln fast von allein. Hier steht jede Größe einmal in Ruhe erklärt.</p>
<div class="mt-call"><div class="mt-call-h">So benutzt du die Liste</div><p>Lies eine Gruppe, deck die Erklärung ab und sag laut, was die Größe bedeutet. In jeder Lektion und Aufgabe findest du oben einen Kasten mit genau den Größen, die dort vorkommen.</p></div>
${GRUPPEN.map(([h, ks]) => `<h3>${h}</h3><table class="gr-table"><tbody>${ks.map(row).join('')}</tbody></table>`).join('')}`;
  const KARTEN = ['Q', 'I', 'U', 'phi', 'E', 'W', 'C', 'epsr', 'R', 'tau', 'th', 'euler', 'UB', 'v0', 'y'];
  const PH0 = {
    id: 'PH0', fach: 'physik', num: 0, min: 10,
    title: 'Die Größen verstehen',
    short: 'Jede Größe einmal erklärt: Bedeutung, Einheit, Bild',
    idee,
    rezept: [
      m`<b>Einheiten verraten die Bedeutung:</b> V = J/C (Energie pro Ladung), A = C/s (Ladung pro Zeit), F = C/V (Ladung pro Volt), V/m (Spannung pro Strecke).`,
      m`<b>Vorsilben umrechnen:</b> k = $10^3$, M = $10^6$, m = $10^{-3}$, µ = $10^{-6}$, n = $10^{-9}$, p = $10^{-12}$. cm = $10^{-2}$ m, mm = $10^{-3}$ m, cm² = $10^{-4}$ m².`,
      m`<b>Indizes lesen:</b> $U_0$ = Anfang/Quelle, $U_C$ = am Kondensator, $U_R$ = am Widerstand, $U_B$ = Beschleunigung.`,
      m`<b>Zwei verschiedene $e$:</b> In $eU_B$ ist $e$ die Elementarladung, in $e^{-t/\tau}$ die Zahl 2,718.`
    ],
    test: KARTEN.map(k => ({ q: `Was bedeutet ${G[k].sym} und in welcher Einheit misst man es?`, a: `<b>${G[k].name}</b> (${G[k].einheit}). ${G[k].was}` })),
    groessen: null
  };

  window.LR_GROESSEN = Object.assign(window.LR_GROESSEN || {}, { physik: G });
  window.LR_LESSONS = [PH0].concat(window.LR_LESSONS || []);
})();
