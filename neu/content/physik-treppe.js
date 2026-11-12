/* ==========================================================================
   PHYSIK · Lerntreppen (6 Stufen) für die zwei rechenlastigsten Themen der Klausur 13.11.2026:
   ph-entladen (Kondensator laden/entladen, e-Funktion) und ph-querfeld (Elektronen im Querfeld).
   Eigene Aufgaben nach IServ AB18/AB19/Infoblatt DGL bzw. AB20–AB23, angelehnt an das
   Zentralabitur Niedersachsen (2015 Elektronenstrahlröhre, 2025 Blitzgeräte, 2026 Kornfeuchte).
   Keine offiziellen Aufgaben, keine offiziellen Lösungen. Zahlen: tests/physik_check.py (T…, Q…).
   ========================================================================== */
(function () {
  const m = String.raw;
  const SRC = 'Eigene Aufgaben nach IServ (PH12, Ordner 06/07); angelehnt an Zentralabitur Niedersachsen';

  // ======================================================================
  // Thema 1: Kondensator laden und entladen
  // ======================================================================
  const entladen = {
    id: 'ph-entladen', fach: 'physik',
    titel: 'Laden und Entladen rechnen',
    kurz: 'Spannung zu einem Zeitpunkt, Zeit bis zu einer Spannung (solve und ln), Maschenregel, Kapazität bestimmen.',
    quelle: SRC + ' 2025 (Blitzgeräte) und 2026 (Kornfeuchte)',
    kann: [m`Das Produkt $R\cdot C$ im Exponenten berechnen`, m`$U_C(t)$ beim Laden und Entladen ausrechnen`, m`Die Zeit bis zu einer bestimmten Spannung mit solve (oder $\ln$) bestimmen`],
    check: [
      { frage: m`$R=10\,\text{k}\Omega$, $C=100\,\mu\text{F}$. Wie groß ist $R\cdot C$?`, optionen: ['1 s', '0,1 s', '1000 s'], richtig: 0 },
      { frage: 'Welche Formel beschreibt die Kondensatorspannung beim Entladen?', optionen: [m`$U_0\,e^{-t/(R\cdot C)}$`, m`$U_0\,(1-e^{-t/(R\cdot C)})$`, m`$U_0\,e^{t/(R\cdot C)}$`], richtig: 0 },
      { frage: m`$e^{-t/(R\cdot C)}=0{,}2$. Wie berechnet man $t$?`, optionen: [m`$t=-R\cdot C\cdot\ln0{,}2$`, m`$t=R\cdot C\cdot0{,}2$`, m`$t=\ln(0{,}2\cdot R\cdot C)$`], richtig: 0 }
    ],
    extras: {
      blurting: {
        minuten: 5,
        aufforderung: m`Schreib alles auf, was du über das <b>Laden und Entladen eines Kondensators</b> weißt: Formeln, Kurven, besondere Zeiten, Begründungen.`,
        kernpunkte: [
          m`Im Exponenten steht $R\cdot C$ (Einheit s); Maschenregel $\sum U=0$ (Laden: $U_0=U_R+U_C$)`,
          m`Laden: $U_C=U_0(1-e^{-t/(R\cdot C)})$, $I=\tfrac{U_0}{R}e^{-t/(R\cdot C)}$`,
          m`Entladen: $U_C=U_0e^{-t/(R\cdot C)}$, $I=-\tfrac{U_0}{R}e^{-t/(R\cdot C)}$ (Strom in Gegenrichtung)`,
          'Anfang: Beim Laden liegt U₀ am Widerstand (U_C = 0), beim Entladen liegt U₀ am Kondensator und (dem Betrag nach) am Widerstand',
          m`Halbwertszeit $t_h=R\cdot C\cdot\ln2$`,
          'Nach etwa dem Fünffachen von R·C praktisch fertig (unter 1 %)',
          'Einschaltmoment: leerer Kondensator wirkt wie Kurzschluss, I₀ = U₀/R; voll: wie Unterbrechung',
          m`Zeit gesucht: Gleichung mit Zahlen aufschreiben und im Rechner solve(…, t); von Hand $e^{\ldots}$ isolieren und logarithmieren`,
          m`Bis $U_0/3$: $C=\dfrac{t_E}{R\ln3}$`,
          m`Herleitung: Maschenregel $U_0=RI+Q/C$, ableiten: $0=R\dot I+I/C$`
        ],
        spick: m`<ol><li>Im Exponenten $R\cdot C$; $t_h=R\cdot C\cdot\ln2$</li><li>Laden $U_0(1-e^{-t/(R\cdot C)})$, Entladen $U_0e^{-t/(R\cdot C)}$, Strom $\pm\tfrac{U_0}Re^{-t/(R\cdot C)}$</li><li>Maschenregel: Laden $U_0=U_R+U_C$, Entladen $|U_R|=U_C$</li><li>Zeit: solve(Gleichung, t) oder $t=R\cdot C\cdot\ln\tfrac{U_0}{U}$; $C=\tfrac{t_E}{R\ln3}$</li></ol>`
      },
      fehler: [
        {
          id: 'phe-fx1', titel: 'Fehler beim Logarithmieren',
          frage: m`Ein Kondensator ($R=47\,\text{k}\Omega$, $C=220\,\mu\text{F}$) wird von $10\,\text{V}$ aus entladen. Nach welcher Zeit liegen noch $2{,}0\,\text{V}$ an? Tippe auf die <b>erste</b> falsche Zeile.`,
          schritte: [
            { name: 'Produkt R·C', rechnung: m`$$R\cdot C=47\,000\,\Omega\cdot220\cdot10^{-6}\,\text{F}=10{,}34\,\text{s}$$`, ok: 'Stimmt: kΩ und µF richtig umgerechnet.' },
            { name: 'Ansatz', rechnung: m`$$2{,}0\,\text{V}=10\,\text{V}\cdot e^{-t/(R\cdot C)}\ \Rightarrow\ e^{-t/(R\cdot C)}=0{,}2$$`, ok: 'Stimmt: Entladeformel, e-Funktion isoliert.' },
            { name: 'Logarithmieren', rechnung: m`$$-\frac{t}{R\cdot C}=\ln0{,}2=1{,}609$$` },
            { name: 'Auflösen', rechnung: m`$$t=-1{,}609\cdot10{,}34\,\text{s}=-16{,}6\,\text{s}$$`, ok: 'Rechnet richtig mit dem Wert davor weiter. Dass die Zeit negativ wird, zeigt: Der Fehler steckt weiter oben.' }
          ],
          fehler: 2,
          was: m`$\ln0{,}2$ ist <b>negativ</b> ($-1{,}609$), weil $0{,}2<1$.`,
          richtig: m`$$-\frac{t}{R\cdot C}=-1{,}609\ \Rightarrow\ \res{t=16{,}6\,\text{s}}$$`,
          typ: 'Rechenfehler',
          folge: 'Mit dem richtigen Vorzeichen kommt eine positive Zeit heraus: 16,6 s. Eine negative Zeit ist immer ein Warnsignal.',
          tipp: m`Probe: $e^{-16{,}6/10{,}34}=e^{-1{,}61}\approx0{,}2$.`
        }
      ]
    },
    stufen: [
      { typ: 'sehen', demo: { name: 'p-rc', R: 10, C: 470 },
        text: 'Drück auf „Laden“ und schau beide Kurven an. Danach „Entladen“. Verändere R und C: Was passiert mit dem Tempo?',
        frage: { frage: 'Du verdoppelst R. Was passiert mit dem Ladevorgang?', optionen: ['Er dauert doppelt so lange, weil R·C im Exponenten doppelt so groß ist.', 'Er geht doppelt so schnell.', 'Die Endspannung verdoppelt sich.'], richtig: 0, erklaerung: 'Größerer Widerstand heißt kleinerer Strom, der Kondensator füllt sich langsamer. Die Endspannung bleibt U₀.' } },
      {
        typ: 'beispiel',
        task: {
          id: 'phe-s1', teil: 'B', titel: 'Vorgerechnetes Beispiel: Entladen',
          parts: [{
            id: 'phe-s1a', label: '', operator: 'Berechnen Sie', afb: 'II', be: 6,
            frage: m`Ein Kondensator ($C=220\,\mu\text{F}$) ist auf $U_0=10\,\text{V}$ geladen und wird über $R=47\,\text{k}\Omega$ entladen. Berechnen Sie $R\cdot C$, die Spannung nach $5{,}0\,\text{s}$ und die Zeit, bis nur noch $2{,}0\,\text{V}$ anliegen.`,
            checkpoints: [{ id: 'tau', label: 'R·C in s', wert: 10.34, tol: 0.1 }, { id: 't2', label: 't bis 2 V in s', wert: 16.64, tol: 0.2 }],
            schritte: [
              { name: 'Produkt R·C', punkte: 1,
                vorher: { frage: 'Womit fängst du an?', optionen: [m`$R\cdot C$ ausrechnen`, m`$U_0/R$ ausrechnen`, 'Halbwertszeit schätzen'], richtig: 0 },
                rechnung: m`$$R\cdot C=47\,000\,\Omega\cdot220\cdot10^{-6}\,\text{F}=\res{10{,}34\,\text{s}}$$`,
                warum: 'R·C steht im Exponenten jeder Formel, darum zuerst. Einheiten in Ω und F.' },
              { name: 'Spannung nach 5 s', punkte: 2,
                vorher: { frage: 'Welche Formel gilt hier?', optionen: [m`$U_0\,e^{-t/(R\cdot C)}$`, m`$U_0(1-e^{-t/(R\cdot C)})$`, m`$\tfrac{U_0}R\,e^{-t/(R\cdot C)}$`], richtig: 0 },
                rechnung: m`$$U_C(5\,\text{s})=10\,\text{V}\cdot e^{-5{,}0/10{,}34}=10\,\text{V}\cdot0{,}617=\res{6{,}17\,\text{V}}$$`,
                warum: 'Entladen: Die Spannung fällt von U₀ aus exponentiell.' },
              { name: 'Zeit bis 2 V', punkte: 2,
                vorher: { frage: m`Wie kommst du an $t$ heran?`, optionen: ['Gleichung mit Zahlen aufschreiben und mit solve (oder Isolieren und ln) nach t lösen', 'Ausprobieren mit Zahlen', m`Durch $e$ teilen`], richtig: 0 },
                rechnung: m`$$\begin{aligned}2{,}0&=10\cdot e^{-t/(R\cdot C)}\\ e^{-t/(R\cdot C)}&=0{,}2\\ -\tfrac{t}{R\cdot C}&=\ln0{,}2=-1{,}609\\ t&=1{,}609\cdot10{,}34\,\text{s}=\res{16{,}6\,\text{s}}\end{aligned}$$`,
                cas: { eingabe: 'solve(2=10*e^(-t/(47000*220*10^(-6))),t)', ausgabe: 't=16.64' },
                warum: 'Der Rechner (solve) oder der Logarithmus holt t aus dem Exponenten.' },
              { name: 'Antwortsatz', punkte: 1, antwort: true,
                rechnung: m`Das Produkt $R\cdot C$ beträgt $10{,}3\,\text{s}$, nach $5\,\text{s}$ liegen noch $6{,}2\,\text{V}$ an, auf $2{,}0\,\text{V}$ ist die Spannung nach etwa $17\,\text{s}$ gefallen.` }
            ]
          }]
        }
      },
      {
        typ: 'luecken',
        task: {
          id: 'phe-s2', teil: 'B', titel: 'Beispiel mit Lücken',
          parts: [{
            id: 'phe-s2a', label: '', operator: 'Berechnen Sie', afb: 'II', be: 6,
            frage: m`$C=47\,\mu\text{F}$, $R=100\,\text{k}\Omega$, Entladen von $U_0=6{,}0\,\text{V}$ aus. Berechnen Sie $R\cdot C$, $U_C(3{,}0\,\text{s})$ und die Zeit bis $1{,}0\,\text{V}$.`,
            checkpoints: [{ id: 'u3', label: 'U(3 s) in V', wert: 3.169, tol: 0.03 }],
            schritte: [
              { name: 'Produkt R·C', punkte: 1, rechnung: m`$$R\cdot C=100\,000\,\Omega\cdot47\cdot10^{-6}\,\text{F}=\res{4{,}7\,\text{s}}$$` },
              { name: 'Spannung nach 3 s', punkte: 2,
                rechnung: m`$$U_C=6{,}0\,\text{V}\cdot e^{-3{,}0/4{,}7}=\res{3{,}17\,\text{V}}$$`,
                luecke: { rechnung: m`$$U_C=6{,}0\,\text{V}\cdot e^{-3{,}0/4{,}7}=\;?$$`, felder: [{ id: 'u3', label: 'U(3 s) in V', wert: 3.169, tol: 0.03 }], tipp: m`$e^{-0{,}638}\approx0{,}528$` } },
              { name: 'Zeit bis 1 V', punkte: 2,
                rechnung: m`$$e^{-t/4{,}7}=\tfrac16\ \Rightarrow\ t=4{,}7\,\text{s}\cdot\ln6=\res{8{,}42\,\text{s}}$$`,
                luecke: { rechnung: m`$$e^{-t/4{,}7}=\tfrac16\ \Rightarrow\ t=4{,}7\,\text{s}\cdot\ln6=\;?$$`, felder: [{ id: 't1', label: 't in s', wert: 8.421, tol: 0.05 }], tipp: m`$\ln6\approx1{,}792$` },
                cas: { eingabe: 'solve(1=6*e^(-t/(100000*47*10^(-6))),t)', ausgabe: 't=8.421' } },
              { name: 'Antwortsatz', punkte: 1, antwort: true, rechnung: m`$R\cdot C=4{,}7\,\text{s}$, nach $3\,\text{s}$ noch $3{,}2\,\text{V}$, nach $8{,}4\,\text{s}$ nur noch $1{,}0\,\text{V}$.` }
            ]
          }]
        }
      },
      {
        typ: 'geruest',
        task: {
          id: 'phe-s3', teil: 'B', titel: 'Mit Gerüst auf Papier',
          parts: [{
            id: 'phe-s3a', label: '', operator: 'Berechnen Sie', afb: 'II', be: 7,
            frage: m`Ein Kondensator ($C=680\,\mu\text{F}$, $U_0=24\,\text{V}$) wird über $R=15\,\text{k}\Omega$ entladen. Berechnen Sie $R\cdot C$, Spannung und Stromstärke nach $8{,}0\,\text{s}$ sowie die Zeit, bis die Spannung auf 10 % gefallen ist.`,
            checkpoints: [
              { id: 'tau', label: 'R·C in s', wert: 10.2, tol: 0.05, schritt: 0 },
              { id: 'u8', label: 'U(8 s) in V', wert: 10.95, tol: 0.1, schritt: 1 },
              { id: 'i8', label: '|I(8 s)| in mA', wert: 0.7303, tol: 0.01, schritt: 2 },
              { id: 't10', label: 't bis 10 % in s', wert: 23.49, tol: 0.2, schritt: 3 }
            ],
            schritte: [
              { name: 'Produkt R·C', punkte: 1, hinweis: 'kΩ und µF in Ω und F umrechnen.', rechnung: m`$$R\cdot C=15\,000\,\Omega\cdot680\cdot10^{-6}\,\text{F}=\res{10{,}2\,\text{s}}$$` },
              { name: 'Spannung nach 8 s', punkte: 2, hinweis: 'Entladeformel für die Spannung.', rechnung: m`$$U_C=24\,\text{V}\cdot e^{-8{,}0/10{,}2}=\res{10{,}95\,\text{V}}$$` },
              { name: 'Stromstärke nach 8 s', punkte: 2, hinweis: m`$|I|=\dfrac{U_C}{R}$ oder $\dfrac{U_0}{R}e^{-t/(R\cdot C)}$`, rechnung: m`$$|I|=\frac{24\,\text{V}}{15\,000\,\Omega}\cdot e^{-8{,}0/10{,}2}=\res{0{,}73\,\text{mA}}$$ (Richtung entgegen dem Ladestrom)` },
              { name: 'Zeit bis 10 %', punkte: 2, hinweis: m`$e^{-t/(R\cdot C)}=0{,}1$`, rechnung: m`$$t=R\cdot C\cdot\ln10=10{,}2\,\text{s}\cdot2{,}303=\res{23{,}5\,\text{s}}$$`, cas: { eingabe: 'solve(0.1=e^(-t/(15000*680*10^(-6))),t)', ausgabe: 't=23.486' }, antwort: true }
            ]
          }]
        }
      },
      {
        typ: 'abi',
        task: {
          id: 'phe-s4', teil: 'B', titel: 'Wann ist das Blitzgerät bereit?',
          kennung: 'Eigene Aufgabe, angelehnt an Zentralabitur Niedersachsen 2025 (Aufladung von Kondensatoren in Blitzgeräten). Keine offizielle Aufgabe, keine offizielle Lösung.',
          intro: m`In einem Blitzgerät wird der Blitzkondensator ($C=680\,\mu\text{F}$) über einen Widerstand $R=1{,}5\,\text{k}\Omega$ auf $U_0=330\,\text{V}$ geladen. Die Bereitschaftslampe leuchtet, sobald 95 % der Endspannung erreicht sind.`,
          parts: [
            { id: 'phe-s4a', label: 'a)', operator: 'Berechnen Sie', afb: 'II', be: 4,
              frage: 'Berechnen Sie die Zeit vom Einschalten bis zum Aufleuchten der Bereitschaftslampe.',
              tipps: [m`Ladeformel: $0{,}95\,U_0=U_0(1-e^{-t/(R\cdot C)})$`, m`$e^{-t/(R\cdot C)}=0{,}05$`],
              checkpoints: [{ id: 'tau', label: 'R·C in s', wert: 1.02, tol: 0.01 }, { id: 't95', label: 't in s', wert: 3.056, tol: 0.03 }],
              schritte: [
                { name: 'Produkt R·C', punkte: 1, rechnung: m`$$R\cdot C=1500\,\Omega\cdot680\cdot10^{-6}\,\text{F}=1{,}02\,\text{s}$$` },
                { name: 'Ansatz Laden', punkte: 1, rechnung: m`$$0{,}95\,U_0=U_0\,(1-e^{-t/(R\cdot C)})\ \Rightarrow\ e^{-t/(R\cdot C)}=0{,}05$$` },
                { name: 'Logarithmieren', punkte: 2, rechnung: m`$$t=R\cdot C\cdot\ln20=1{,}02\,\text{s}\cdot3{,}00=\res{3{,}1\,\text{s}}$$`, cas: { eingabe: 'solve(0.95=1-e^(-t/(1500*680*10^(-6))),t)', ausgabe: 't=3.0557' } }
              ],
              antwort: 'Nach etwa 3,1 s leuchtet die Bereitschaftslampe.' },
            { id: 'phe-s4b', label: 'b)', operator: 'Berechnen Sie / Beurteilen Sie', afb: 'III', be: 5,
              frage: 'Berechnen Sie die gespeicherte Energie bei voller Ladung und bei 95 % der Spannung. Beurteilen Sie, ob es sinnvoll ist, die Lampe schon bei 95 % und nicht erst bei 100 % leuchten zu lassen.',
              tipps: [m`$E_\text{el}=\tfrac12CU^2$ für beide Spannungen.`, 'Wann wären 100 % theoretisch erreicht?'],
              checkpoints: [{ id: 'w', label: 'E_el voll in J', wert: 37.03, tol: 0.2 }, { id: 'w95', label: 'E_el bei 95 % in J', wert: 33.42, tol: 0.2 }],
              schritte: [
                { name: 'Energie voll', punkte: 1, rechnung: m`$$E_\text{el}=\tfrac12\cdot680\cdot10^{-6}\,\text{F}\cdot(330\,\text{V})^2=37{,}0\,\text{J}$$` },
                { name: 'Energie bei 95 %', punkte: 1, rechnung: m`$$E_{\text{el},95}=\tfrac12C\,(0{,}95\,U_0)^2=0{,}95^2\,E_\text{el}=0{,}9025\cdot37{,}0\,\text{J}=33{,}4\,\text{J}$$` },
                { name: 'Beurteilung', punkte: 3, antwort: true, rechnung: m`Bei 95 % der Spannung sind schon gut 90 % der Energie gespeichert, der Blitz ist kaum schwächer. 100 % werden bei exponentiellem Laden theoretisch nie erreicht, praktisch erst nach etwa $5\cdot R\cdot C\approx5\,\text{s}$. Die Lampe bei 95 % ist also sinnvoll: deutlich kürzere Wartezeit (3,1 s statt ≈ 5 s) bei fast voller Blitzenergie.` }
              ],
              antwort: '37 J bzw. 33 J (90 %); sinnvoll, weil kaum Energieverlust und kürzere Wartezeit.' }
          ]
        }
      },
      {
        typ: 'abi',
        task: {
          id: 'phe-s5', teil: 'B', titel: 'Zwei Messungen, zwei Kapazitäten?',
          kennung: 'Eigene Aufgabe, angelehnt an Zentralabitur Niedersachsen 2026 (Kapazitätsbestimmung über einen Entladevorgang). Keine offizielle Aufgabe, keine offizielle Lösung.',
          intro: m`Zwei Gruppen bestimmen die Kapazität desselben Kondensators über Entladevorgänge. Gruppe 1 ($R_1=10\,\text{k}\Omega$) misst die Zeit, bis die Spannung auf $\tfrac13U_0$ gefallen ist: $t_E=9{,}2\,\text{s}$. Gruppe 2 ($R_2=12\,\text{k}\Omega$) misst die Halbwertszeit der Spannung: $t_h=6{,}0\,\text{s}$. Beide lesen die Spannung an einem Voltmeter ab, das parallel zum Kondensator liegt.`,
          parts: [
            { id: 'phe-s5a', label: 'a)', operator: 'Berechnen Sie', afb: 'II', be: 4,
              frage: 'Berechnen Sie aus beiden Messungen die Kapazität.',
              tipps: [m`Gruppe 1: $C=\dfrac{t_E}{R\ln3}$`, m`Gruppe 2: $t_h=RC\ln2$`],
              checkpoints: [{ id: 'c1', label: 'C₁ in µF', wert: 837.4, tol: 8 }, { id: 'c2', label: 'C₂ in µF', wert: 721.3, tol: 7 }],
              schritte: [
                { name: 'Gruppe 1', punkte: 2, rechnung: m`$$C_1=\frac{t_E}{R_1\ln3}=\frac{9{,}2\,\text{s}}{10\,000\,\Omega\cdot1{,}099}=8{,}4\cdot10^{-4}\,\text{F}$$` },
                { name: 'Gruppe 2', punkte: 2, rechnung: m`$$C_2=\frac{t_h}{R_2\ln2}=\frac{6{,}0\,\text{s}}{12\,000\,\Omega\cdot0{,}693}=7{,}2\cdot10^{-4}\,\text{F}$$` }
              ],
              antwort: 'C₁ ≈ 0,84 mF, C₂ ≈ 0,72 mF.' },
            { id: 'phe-s5b', label: 'b)', operator: 'Erläutern Sie', afb: 'III', be: 4,
              frage: 'Die Ergebnisse weichen um etwa 15 % voneinander ab. Erläutern Sie zwei mögliche Ursachen und deren Richtung.',
              tipps: ['Was macht ein Voltmeter, das parallel zum Kondensator liegt?', 'Wie genau lassen sich Start und Ende der Zeitmessung bestimmen?'],
              checkpoints: [{ id: 'diff', label: 'Abweichung in % (bezogen auf C₁)', wert: 13.9, tol: 1.5 }],
              schritte: [
                { name: 'Innenwiderstand des Voltmeters', punkte: 2, rechnung: 'Das Voltmeter entlädt den Kondensator mit. Der wirksame Widerstand ist kleiner als R, die Entladung schneller, die gemessenen Zeiten zu kurz, berechnete C zu klein. Der Effekt ist bei größerem R (Gruppe 2) stärker, das passt dazu, dass C₂ kleiner ist.' },
                { name: 'Zeitmessung / Ablesen', punkte: 2, antwort: true, rechnung: m`Reaktionszeit beim Starten und Stoppen und das Ablesen des genauen Zeitpunkts ($\tfrac13U_0$ bzw. $\tfrac12U_0$) auf einer sich ändernden Anzeige. Auch die Toleranz der Widerstände (oft 5 %) geht direkt in $C$ ein.` }
              ],
              antwort: 'Voltmeter-Innenwiderstand (C zu klein, stärker bei größerem R), Zeitmessung/Ablesen, Toleranz von R.' }
          ]
        }
      }
    ]
  };

  // ======================================================================
  // Thema 2: Elektronen im Querfeld
  // ======================================================================
  const querfeld = {
    id: 'ph-querfeld', fach: 'physik',
    titel: 'Elektronen im Querfeld berechnen',
    kurz: 'Geschwindigkeit nach der Beschleunigung, Parabelbahn, Ablenkung am Plattenende und auf dem Schirm.',
    quelle: SRC + ' 2015 (Elektronenstrahlröhre) und 2006 (Bewegte Ladungsträger)',
    kann: [m`$v_0=\sqrt{2eU_B/m_e}$ herleiten und berechnen`, m`Ablenkung $y=\dfrac{Ux^2}{4dU_B}$ berechnen und prüfen, ob der Strahl die Platten verlässt`, 'Auftreffpunkt auf dem Schirm bestimmen'],
    check: [
      { frage: 'Welche Bewegung macht das Elektron senkrecht zu den Platten?', optionen: ['gleichmäßig beschleunigt', 'gleichförmig', 'gar keine'], richtig: 0 },
      { frage: m`$U_B$ wird vervierfacht. Was passiert mit $v_0$?`, optionen: ['verdoppelt', 'vervierfacht', 'halbiert'], richtig: 0 },
      { frage: 'Wie bewegt sich das Elektron hinter den Platten?', optionen: ['geradlinig', 'weiter auf der Parabel', 'im Kreis'], richtig: 0 }
    ],
    extras: {
      blurting: {
        minuten: 5,
        aufforderung: m`Schreib alles auf, was du über die <b>Braunsche Röhre und die Ablenkung im Querfeld</b> weißt: Aufbau, Formeln, Herleitung, Begründungen.`,
        kernpunkte: [
          'Glühkathode: glühelektrischer Effekt, Wehnelt-Zylinder bündelt, Anode mit Loch, Vakuum, Leuchtschirm',
          m`Energieerhaltung $eU_B=\tfrac12m_ev_0^2$, also $v_0=\sqrt{2eU_B/m_e}$`,
          m`Im Querfeld: Kraft $F=eU/d$, Beschleunigung $a=\dfrac{eU}{m_ed}$`,
          'Unabhängige Überlagerung: waagerecht gleichförmig, senkrecht gleichmäßig beschleunigt',
          m`$x=v_0t$, $y=\tfrac12at^2$, eingesetzt: Parabel $y=\tfrac12\tfrac{e}{m}\tfrac Ud\tfrac{x^2}{v_0^2}$`,
          m`Mit $v_0^2$ eingesetzt: $y=\dfrac{Ux^2}{4dU_B}$ (unabhängig von e/m)`,
          m`Austrittswinkel $\tan\alpha=\dfrac{Ul}{2dU_B}$, danach geradlinig`,
          m`Schirm: $Y=y(l)+L\tan\alpha$`,
          m`Strahl verlässt die Platten nur, wenn $y(l)<d/2$`
        ],
        spick: m`<ol><li>$v_0=\sqrt{2eU_B/m_e}$</li><li>$y=\dfrac{Ux^2}{4dU_B}$, $\tan\alpha=\dfrac{Ul}{2dU_B}$</li><li>$Y=y(l)+L\tan\alpha$</li><li>Prüfen: $y(l)<\tfrac d2$</li></ol>`
      }
    },
    stufen: [
      { typ: 'sehen', demo: { name: 'p-ablenkung', zerlegen: true, UB: 1000, U: 150 },
        text: 'Schau auf die zwei Punkte am Rand: Einer zeigt nur die waagerechte, einer nur die senkrechte Bewegung. Danach: Erhöhe U_B und beobachte die Ablenkung.',
        frage: { frage: 'Warum ist die Bahn zwischen den Platten eine Parabel?', optionen: ['Waagerecht konstante Geschwindigkeit, senkrecht konstante Beschleunigung, wie beim waagerechten Wurf.', 'Weil die Kraft immer zur Mitte zeigt.', 'Weil das Elektron langsamer wird.'], richtig: 0, erklaerung: 'x wächst gleichmäßig mit t, y wächst mit t². Setzt man t = x/v₀ ein, ergibt sich y ∼ x².' } },
      {
        typ: 'beispiel',
        task: {
          id: 'phq-s1', teil: 'B', titel: 'Vorgerechnetes Beispiel',
          parts: [{
            id: 'phq-s1a', label: '', operator: 'Berechnen Sie', afb: 'II', be: 6,
            frage: m`Elektronen werden mit $U_B=800\,\text{V}$ beschleunigt und treten mittig in einen Plattenkondensator ($d=2{,}0\,\text{cm}$, $l=5{,}0\,\text{cm}$, $U=100\,\text{V}$) ein. Berechnen Sie $v_0$ und die Ablenkung am Plattenende.`,
            checkpoints: [{ id: 'y', label: 'y in mm', wert: 3.906, tol: 0.05 }],
            schritte: [
              { name: 'Geschwindigkeit nach der Beschleunigung', punkte: 2,
                vorher: { frage: 'Welcher Ansatz?', optionen: [m`$eU_B=\tfrac12m_ev_0^2$`, m`$F=m\cdot a$`, m`$v=s/t$`], richtig: 0 },
                rechnung: m`$$v_0=\sqrt{\frac{2eU_B}{m_e}}=\sqrt{\frac{2\cdot1{,}602\cdot10^{-19}\cdot800}{9{,}109\cdot10^{-31}}}\,\tfrac{\text{m}}{\text{s}}=\res{1{,}68\cdot10^{7}\,\tfrac{\text{m}}{\text{s}}}$$`,
                warum: 'Die elektrische Energie wird vollständig zu Bewegungsenergie.' },
              { name: 'Ablenkung am Plattenende', punkte: 2,
                vorher: { frage: 'Welche Formel spart am meisten Rechnung?', optionen: [m`$y=\dfrac{Ul^2}{4dU_B}$`, m`$y=v_0\cdot t$`, m`$y=\dfrac{U}{d}$`], richtig: 0 },
                rechnung: m`$$y=\frac{U\,l^2}{4\,d\,U_B}=\frac{100\cdot0{,}050^2}{4\cdot0{,}020\cdot800}\,\text{m}=\res{3{,}9\,\text{mm}}$$`,
                warum: 'Diese Form enthält e und m nicht mehr, man braucht v₀ dafür gar nicht. Zur Kontrolle geht auch y = ½at² mit t = l/v₀.' },
              { name: 'Prüfen', punkte: 1,
                vorher: { frage: 'Was musst du noch prüfen?', optionen: [m`ob $y<\tfrac d2$ ist`, 'ob das Elektron schneller als Licht ist', 'nichts'], richtig: 0 },
                rechnung: m`$$y=3{,}9\,\text{mm}<\tfrac d2=10\,\text{mm}\ \Rightarrow\ \text{Der Strahl verlässt die Platten.}$$` },
              { name: 'Antwortsatz', punkte: 1, antwort: true, rechnung: m`Die Elektronen fliegen mit $1{,}7\cdot10^7\,\tfrac{\text{m}}{\text{s}}$ ein und sind am Plattenende um $3{,}9\,\text{mm}$ zur positiven Platte abgelenkt.` }
            ]
          }]
        }
      },
      {
        typ: 'luecken',
        task: {
          id: 'phq-s2', teil: 'B', titel: 'Beispiel mit Lücken',
          parts: [{
            id: 'phq-s2a', label: '', operator: 'Berechnen Sie', afb: 'II', be: 5,
            frage: m`$U_B=1{,}5\,\text{kV}$, $U=120\,\text{V}$, $d=3{,}0\,\text{cm}$, $l=8{,}0\,\text{cm}$. Berechnen Sie $v_0$ und die Ablenkung am Plattenende.`,
            checkpoints: [{ id: 'y', label: 'y in mm', wert: 4.267, tol: 0.05 }],
            schritte: [
              { name: 'Geschwindigkeit', punkte: 2,
                rechnung: m`$$v_0=\sqrt{\frac{2\cdot1{,}602\cdot10^{-19}\cdot1500}{9{,}109\cdot10^{-31}}}\,\tfrac{\text{m}}{\text{s}}=\res{2{,}30\cdot10^7\,\tfrac{\text{m}}{\text{s}}}$$`,
                luecke: { rechnung: m`$$v_0=\sqrt{\frac{2\cdot1{,}602\cdot10^{-19}\cdot1500}{9{,}109\cdot10^{-31}}}\,\tfrac{\text{m}}{\text{s}}=\;?\cdot10^7\,\tfrac{\text{m}}{\text{s}}$$`, felder: [{ id: 'v', label: 'v₀ in 10⁷ m/s', wert: 2.297, tol: 0.02 }], tipp: m`Unter der Wurzel steht etwa $5{,}28\cdot10^{14}$.` } },
              { name: 'Ablenkung', punkte: 2,
                rechnung: m`$$y=\frac{120\cdot0{,}080^2}{4\cdot0{,}030\cdot1500}\,\text{m}=\res{4{,}3\,\text{mm}}$$`,
                luecke: { rechnung: m`$$y=\frac{120\cdot0{,}080^2}{4\cdot0{,}030\cdot1500}\,\text{m}=\;?\,\text{mm}$$`, felder: [{ id: 'y', label: 'y in mm', wert: 4.267, tol: 0.05 }], tipp: m`Zähler $0{,}768$, Nenner $180$.` } },
              { name: 'Antwortsatz', punkte: 1, antwort: true, rechnung: m`$v_0=2{,}3\cdot10^7\,\tfrac{\text{m}}{\text{s}}$, Ablenkung $4{,}3\,\text{mm}<15\,\text{mm}$: Der Strahl verlässt die Platten.` }
            ]
          }]
        }
      },
      {
        typ: 'geruest',
        task: {
          id: 'phq-s3', teil: 'B', titel: 'Mit Gerüst auf Papier: bis zum Schirm',
          parts: [{
            id: 'phq-s3a', label: '', operator: 'Berechnen Sie', afb: 'II', be: 8,
            frage: m`$U_B=2{,}0\,\text{kV}$, Ablenkplatten $l=5{,}0\,\text{cm}$, $d=2{,}5\,\text{cm}$, $U=250\,\text{V}$. Der Schirm steht $12\,\text{cm}$ hinter dem Plattenende. Berechnen Sie $v_0$, die Flugzeit zwischen den Platten, die Ablenkung am Plattenende und den Auftreffpunkt.`,
            checkpoints: [
              { id: 'v', label: 'v₀ in 10⁷ m/s', wert: 2.652, tol: 0.02, schritt: 0 },
              { id: 't', label: 't in ns', wert: 1.885, tol: 0.02, schritt: 1 },
              { id: 'y', label: 'y in mm', wert: 3.125, tol: 0.03, schritt: 2 },
              { id: 'Y', label: 'Y in cm', wert: 1.8125, tol: 0.02, schritt: 3 }
            ],
            schritte: [
              { name: 'Geschwindigkeit', punkte: 2, hinweis: m`$eU_B=\tfrac12m_ev_0^2$`, rechnung: m`$$v_0=\res{2{,}65\cdot10^7\,\tfrac{\text{m}}{\text{s}}}$$` },
              { name: 'Flugzeit', punkte: 1, hinweis: m`$t=l/v_0$`, rechnung: m`$$t=\frac{0{,}050\,\text{m}}{2{,}65\cdot10^7\,\tfrac{\text{m}}{\text{s}}}=\res{1{,}89\cdot10^{-9}\,\text{s}}$$` },
              { name: 'Ablenkung am Plattenende', punkte: 2, hinweis: m`$y=\dfrac{Ul^2}{4dU_B}$, dann mit $d/2$ vergleichen.`, rechnung: m`$$y=\frac{250\cdot0{,}050^2}{4\cdot0{,}025\cdot2000}\,\text{m}=\res{3{,}1\,\text{mm}}<12{,}5\,\text{mm}$$` },
              { name: 'Auftreffpunkt', punkte: 3, hinweis: m`$\tan\alpha=\dfrac{Ul}{2dU_B}$, $Y=y+L\tan\alpha$`, antwort: true, rechnung: m`$$\tan\alpha=\frac{250\cdot0{,}050}{2\cdot0{,}025\cdot2000}=0{,}125,\quad Y=3{,}1\,\text{mm}+120\,\text{mm}\cdot0{,}125=\res{18\,\text{mm}}$$` }
            ]
          }]
        }
      },
      {
        typ: 'abi',
        task: {
          id: 'phq-s4', teil: 'B', titel: 'Oszilloskop-Röhre auslegen',
          kennung: 'Eigene Aufgabe, angelehnt an Zentralabitur Niedersachsen 2015 (Elektronenstrahlröhre). Keine offizielle Aufgabe, keine offizielle Lösung.',
          intro: m`In einer Elektronenstrahlröhre werden Elektronen mit $U_B=1{,}8\,\text{kV}$ beschleunigt und treten mittig in ein Ablenkplattenpaar ($d=2{,}0\,\text{cm}$, $l=6{,}0\,\text{cm}$) ein. Der Schirm steht $20\,\text{cm}$ hinter dem Plattenende.`,
          parts: [
            { id: 'phq-s4a', label: 'a)', operator: 'Bestimmen Sie', afb: 'II', be: 4,
              frage: 'Bestimmen Sie die größte Ablenkspannung, bei der die Elektronen die Platten gerade noch verlassen.',
              tipps: [m`Grenzfall $y(l)=\tfrac d2$.`],
              checkpoints: [{ id: 'umax', label: 'U in V', wert: 400, tol: 4 }],
              schritte: [
                { name: 'Bedingung', punkte: 2, rechnung: m`$$\frac{U\,l^2}{4\,d\,U_B}=\frac d2$$` },
                { name: 'Auflösen', punkte: 2, rechnung: m`$$U=\frac{2d^2U_B}{l^2}=\frac{2\cdot0{,}020^2\cdot1800}{0{,}060^2}\,\text{V}=\res{400\,\text{V}}$$` }
              ],
              antwort: '400 V' },
            { id: 'phq-s4b', label: 'b)', operator: 'Berechnen Sie', afb: 'II', be: 4,
              frage: m`Berechnen Sie für $U=200\,\text{V}$ die Ablenkung am Plattenende und den Abstand des Leuchtpunkts von der Schirmmitte.`,
              tipps: [m`$\tan\alpha=\dfrac{Ul}{2dU_B}$`],
              checkpoints: [{ id: 'y', label: 'y in mm', wert: 5, tol: 0.05 }, { id: 'Y', label: 'Y in cm', wert: 3.833, tol: 0.04 }],
              schritte: [
                { name: 'Ablenkung', punkte: 2, rechnung: m`$$y=\frac{200\cdot0{,}060^2}{4\cdot0{,}020\cdot1800}\,\text{m}=5{,}0\,\text{mm}$$` },
                { name: 'Schirm', punkte: 2, rechnung: m`$$\tan\alpha=\frac{200\cdot0{,}060}{2\cdot0{,}020\cdot1800}=0{,}167,\quad Y=5{,}0\,\text{mm}+200\,\text{mm}\cdot0{,}167=\res{38\,\text{mm}}$$` }
              ],
              antwort: 'y = 5,0 mm, Y ≈ 3,8 cm' },
            { id: 'phq-s4c', label: 'c)', operator: 'Erläutern Sie', afb: 'III', be: 4,
              frage: m`Ein Mitschüler will aus der Messung von $Y$, $U$ und $U_B$ die spezifische Ladung $e/m_e$ bestimmen. Erläutern Sie, dass das mit diesem Aufbau nicht gelingt.`,
              tipps: [m`Setze $v_0^2=2eU_B/m_e$ in die Bahngleichung ein.`],
              checkpoints: [{ id: 'f', label: 'Faktor, um den sich Y bei doppelter U_B ändert', wert: 0.5, tol: 0.01 }],
              schritte: [
                { name: 'Einsetzen', punkte: 2, rechnung: m`$$y=\tfrac12\frac{e}{m_e}\frac Ud\frac{x^2}{v_0^2}\ \text{mit}\ v_0^2=\frac{2eU_B}{m_e}\ \Rightarrow\ y=\frac{Ux^2}{4dU_B}$$` },
                { name: 'Folgerung', punkte: 2, antwort: true, rechnung: m`Die Bahn hängt nur von $U$, $U_B$ und der Geometrie ab, $e/m_e$ kürzt sich heraus. Jedes Teilchen mit gleichem Ladungsvorzeichen, das dieselbe Spannung durchlaufen hat, nimmt dieselbe Bahn. Aus der Bahn lässt sich $e/m_e$ daher nicht bestimmen; man braucht eine zweite, unabhängige Messung (z. B. ein Magnetfeld). Doppelte $U_B$ halbiert $Y$.` }
              ],
              antwort: 'e/m kürzt sich heraus, die Bahn ist für alle gleich.' }
          ]
        }
      },
      {
        typ: 'abi',
        task: {
          id: 'phq-s5', teil: 'B', titel: 'Rückwärts gedacht',
          kennung: 'Eigene Aufgabe im Stil des Zentralabiturs Niedersachsen. Keine offizielle Aufgabe, keine offizielle Lösung.',
          intro: m`An Ablenkplatten ($d=2{,}0\,\text{cm}$, $l=4{,}0\,\text{cm}$) liegt $U=150\,\text{V}$. Am Plattenende soll der Strahl genau $3{,}0\,\text{mm}$ abgelenkt sein.`,
          parts: [
            { id: 'phq-s5a', label: 'a)', operator: 'Bestimmen Sie', afb: 'II', be: 3,
              frage: 'Bestimmen Sie die nötige Beschleunigungsspannung.',
              tipps: [m`$y=\dfrac{Ul^2}{4dU_B}$ nach $U_B$ umstellen.`],
              checkpoints: [{ id: 'ub', label: 'U_B in V', wert: 1000, tol: 10 }],
              schritte: [
                { name: 'Umstellen', punkte: 1, rechnung: m`$$U_B=\frac{U\,l^2}{4\,d\,y}$$` },
                { name: 'Einsetzen', punkte: 2, rechnung: m`$$U_B=\frac{150\cdot0{,}040^2}{4\cdot0{,}020\cdot0{,}0030}\,\text{V}=\res{1000\,\text{V}}$$` }
              ],
              antwort: '1,0 kV' },
            { id: 'phq-s5b', label: 'b)', operator: 'Begründen Sie', afb: 'III', be: 3,
              frage: 'Begründen Sie, wie sich die Ablenkung ändert, wenn man gleichzeitig U und U_B verdoppelt.',
              tipps: ['Schau, wie U und U_B in y vorkommen.'],
              checkpoints: [{ id: 'f', label: 'Faktor der Ablenkung', wert: 1, tol: 0.01 }],
              schritte: [
                { name: 'Formel betrachten', punkte: 1, rechnung: m`$$y\sim\frac{U}{U_B}$$` },
                { name: 'Begründen', punkte: 2, antwort: true, rechnung: 'Der Quotient U/U_B bleibt gleich, also bleibt die Ablenkung gleich (Faktor 1). Anschaulich: Die Elektronen sind schneller und kürzer im Feld, dafür ist die Kraft doppelt so groß; beide Effekte heben sich auf.' }
              ],
              antwort: 'unverändert' }
          ]
        }
      }
    ]
  };

  window.LR_TOPICS = (window.LR_TOPICS || []).concat([entladen, querfeld]);
})();
