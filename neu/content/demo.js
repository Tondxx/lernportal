/* ==========================================================================
   DEMO-THEMA für Bauschritt S2 (Lerntreppe). Bewusst KEIN Unterrichtsmaterial:
   ein neutrales Standardthema (Extrempunkte ganzrationaler Funktionen), mit
   eigenen Zahlen. Alle Zahlen: neu/tests/demo_check.py (sympy).
   Format: Portalplan Abschnitt 6 (task mit parts → checkpoints + schritte).
   Mathe in $…$ / $$…$$ (KaTeX). \res{…} = hervorgehobenes Ergebnis.
   ========================================================================== */
(function () {
  const m = String.raw;

  const topic = {
    id: 'demo-extrem',
    fach: 'mathe',
    demo: true,
    titel: 'Extrempunkte bestimmen',
    kurz: 'Hoch- und Tiefpunkte über Ableitungen finden und begründen.',
    quelle: 'Demo-Inhalt (eigene Aufgaben), kein Unterrichtsmaterial',
    kann: [m`Extremstellen mit $f'(x)=0$ finden`, m`Mit $f''$ entscheiden: Hoch- oder Tiefpunkt`, 'Ergebnis als Punkt mit Antwortsatz angeben'],

    // Eingangs-Check: 3 Fragen → passende Start-Stufe
    check: [
      { frage: m`Was ist die Ableitung von $x^3-6x^2$?`, optionen: [m`$3x^2-12x$`, m`$3x^2-6x$`, m`$x^2-12x$`], richtig: 0 },
      { frage: 'Welche Bedingung muss an einer Extremstelle immer gelten?', optionen: [m`$f(x)=0$`, m`$f'(x)=0$`, m`$f''(x)=0$`], richtig: 1 },
      { frage: m`Es gilt $f'(2)=0$ und $f''(2)=-4$. Was liegt bei $x=2$ vor?`, optionen: ['ein Hochpunkt', 'ein Tiefpunkt', 'ein Wendepunkt'], richtig: 0 }
    ],

    // ---------------------------------------------------------------- Besondere Übungen (S3)
    extras: {
      // Blurting: 5 Min. leeres Blatt, danach Kernpunkte abhaken (Portalplan 5.4)
      blurting: {
        minuten: 5,
        aufforderung: m`Schreib auf, was du über <b>Extrempunkte</b> weißt: Bedingungen, Ablauf, typische Stolperstellen. Stichwörter reichen.`,
        kernpunkte: [
          m`Notwendige Bedingung: $f'(x)=0$ (waagerechte Tangente)`,
          'Warum diese Bedingung: An einem Hoch- oder Tiefpunkt wechselt der Graph von steigend zu fallend (oder umgekehrt), dazwischen ist die Steigung 0',
          m`Hinreichende Bedingung: $f''(x_0)<0$ ergibt Hochpunkt, $f''(x_0)>0$ ergibt Tiefpunkt`,
          m`Bei $f''(x_0)=0$ ist keine Aussage möglich (es kann ein Sattelpunkt sein)`,
          'Ablauf: Ableitungen bilden, Gleichung lösen, mit der zweiten Ableitung prüfen, y-Wert berechnen, Antwortsatz',
          m`y-Wert immer durch Einsetzen in $f$ (nicht in $f'$)`,
          m`Ergebnis als Punkt angeben, z. B. $H(1\,|\,5)$`,
          'Auf einem begrenzten Intervall zusätzlich die Randwerte prüfen',
          'Bei einer Schar den Parameter wie eine feste Zahl mitführen'
        ],
        spick: m`<ol><li>$f'(x)=0$ lösen: Kandidaten für Extremstellen</li><li>$f''(x_0)<0$: <b>Hoch</b>punkt, $f''(x_0)>0$: <b>Tief</b>punkt, $f''(x_0)=0$: keine Aussage</li><li>$y=f(x_0)$ berechnen, Antwortsatz mit $H(x\,|\,y)$ oder $T(x\,|\,y)$</li><li>Intervall? Randwerte vergleichen</li></ol>`
      },

      // Fehler finden (Stufe 2b): erste fehlerhafte Zeile antippen
      fehler: [
        {
          id: 'demo-fx1', titel: 'Fehler in der Rechnung',
          frage: m`Bestimme die Extrempunkte von $k$ mit $k(x)=x^3-3x^2-24x+5$. Eine Zeile der Lösung enthält einen Fehler, alle späteren Zeilen rechnen mit dem Ergebnis weiter. Tippe auf die <b>erste</b> falsche Zeile.`,
          schritte: [
            { name: 'Ableitungen', rechnung: m`$$k'(x)=3x^2-6x-24,\quad k''(x)=6x-6$$`, ok: 'Diese Zeile stimmt: Potenzregel richtig angewendet.' },
            { name: 'Notwendige Bedingung', rechnung: m`$$\begin{aligned} 3x^2-6x-24&=0 \mid :3 \\ x^2-2x-8&=0 \\ x_{1,2}&=-1\pm\sqrt{1+8}=-1\pm 3 \\ x_1&=2,\quad x_2=-4 \end{aligned}$$` },
            { name: 'Hinreichende Bedingung', rechnung: m`$$k''(2)=6>0\Rightarrow\text{Tiefstelle},\quad k''(-4)=-30<0\Rightarrow\text{Hochstelle}$$`, ok: 'Diese Zeile ist für sich richtig, sie rechnet nur mit den Werten aus der Zeile davor. Der Fehler liegt weiter oben.' },
            { name: 'y-Werte', rechnung: m`$$k(2)=-47,\quad k(-4)=-11$$`, ok: 'Diese Zeile rechnet richtig mit den vorherigen Werten. Suche weiter oben.' },
            { name: 'Antwortsatz', rechnung: m`Tiefpunkt $T(2\,|\,-47)$, Hochpunkt $H(-4\,|\,-11)$.`, ok: 'Der Antwortsatz übernimmt nur die Ergebnisse. Suche weiter oben.' }
          ],
          fehler: 1,
          was: m`In der pq-Formel steht $-1$ statt $+1$. Bei $x^2-2x-8=0$ ist $p=-2$, also $-\tfrac p2=+1$.`,
          richtig: m`$$x_{1,2}=1\pm\sqrt{1+8}=1\pm3 \;\Rightarrow\; \res{x_1=4},\ \res{x_2=-2}$$`,
          typ: 'Rechenfehler',
          folge: m`Alle folgenden Zeilen sind dadurch falsch. Richtig wäre $T(4\,|\,-75)$ und $H(-2\,|\,33)$.`,
          tipp: m`Probe: Setze die Lösungen in $x^2-2x-8$ ein. Für $x=2$ ergibt das $4-4-8=-8\neq0$.`
        },
        {
          id: 'demo-fx2', titel: 'Fehler in der Begründung',
          frage: m`Bestimme die Extrempunkte von $m$ mit $m(x)=-x^3+6x^2-9x+4$. Tippe auf die <b>erste</b> falsche Zeile.`,
          schritte: [
            { name: 'Ableitungen', rechnung: m`$$m'(x)=-3x^2+12x-9,\quad m''(x)=-6x+12$$`, ok: 'Diese Zeile stimmt.' },
            { name: 'Notwendige Bedingung', rechnung: m`$$\begin{aligned} -3x^2+12x-9&=0 \mid :(-3) \\ x^2-4x+3&=0 \\ x_{1,2}&=2\pm\sqrt{4-3}=2\pm1 \\ x_1&=1,\quad x_2=3 \end{aligned}$$`, ok: 'Diese Zeile stimmt. Wer will, macht die Probe: $1-4+3=0$ und $9-12+3=0$.' },
            { name: 'Hinreichende Bedingung', rechnung: m`$$m''(1)=6>0\Rightarrow\text{Hochstelle},\quad m''(3)=-6<0\Rightarrow\text{Tiefstelle}$$` },
            { name: 'y-Werte', rechnung: m`$$m(1)=-1+6-9+4=0,\quad m(3)=-27+54-27+4=4$$`, ok: 'Diese Zeile rechnet richtig. Suche weiter oben.' },
            { name: 'Antwortsatz', rechnung: m`Hochpunkt $H(1\,|\,0)$, Tiefpunkt $T(3\,|\,4)$.`, ok: 'Der Antwortsatz übernimmt nur die Ergebnisse. Suche weiter oben.' }
          ],
          fehler: 2,
          was: m`Das Vorzeichen von $m''$ ist falsch gedeutet: positiv heißt <b>Tief</b>punkt, negativ heißt <b>Hoch</b>punkt.`,
          richtig: m`$$m''(1)=6>0\Rightarrow\res{\text{Tiefstelle}},\quad m''(3)=-6<0\Rightarrow\res{\text{Hochstelle}}$$`,
          typ: 'Verständnis fehlt',
          folge: m`Richtig wäre $T(1\,|\,0)$ und $H(3\,|\,4)$. Plausibilitätscheck: Bei einer Funktion dritten Grades liegt der Hochpunkt immer höher als der Tiefpunkt. Hier lag der angebliche Hochpunkt tiefer. Das hätte auffallen können.`,
          tipp: m`Merkhilfe: $f''>0$ ist eine Linkskurve (Schale, ein Tal), also ein Tiefpunkt.`
        }
      ],

      // Lösungsweg erläutern (Abi-Typ, 5 BE, AFB III) – Portalplan 5.5
      erlaeutern: {
        titel: 'Lösungsweg erläutern',
        intro: m`Der Wanderweg aus Stufe 4 hat das Höhenprofil $p(x)=0{,}1x^3-1{,}2x^2+3{,}6x+2$ für $0\le x\le 8$. Unten steht ein Lösungsweg ohne Kommentar.`,
        operator: 'Erläutern Sie den dargestellten Lösungsweg.',
        be: 5,
        zeilen: [
          { rechnung: m`$$p'(x)=0{,}3x^2-2{,}4x+3{,}6$$`,
            frage: { frage: 'Was geschieht in dieser Zeile?', optionen: ['Die Höhe des Weges wird an der Stelle 0 berechnet.', 'Die Steigung des Weges wird als Funktion aufgestellt.', 'Die Nullstellen des Weges werden bestimmt.'], richtig: 1, erklaerung: m`$p'$ gibt an, wie steil der Weg an jeder Stelle ist (positiv: Anstieg, negativ: Abstieg).` } },
          { rechnung: m`$$p''(x)=0{,}6x-2{,}4=0 \;\Rightarrow\; x=4$$`,
            frage: { frage: m`Warum wird hier $p''(x)=0$ gesetzt?`, optionen: [m`Gesucht ist die Stelle, an der die Steigung $p'$ selbst am größten oder kleinsten ist.`, 'Gesucht ist die Stelle, an der der Weg am höchsten ist.', 'Gesucht ist die Stelle, an der der Weg waagerecht verläuft.'], richtig: 0, erklaerung: m`Extremwerte einer Funktion findet man über die Ableitung der Funktion. Hier ist die Funktion die Steigung $p'$, ihre Ableitung ist $p''$.` } },
          { rechnung: m`$$p'''(x)=0{,}6>0 \;\Rightarrow\; p' \text{ hat bei } x=4 \text{ ein Minimum}$$`,
            frage: { frage: 'Was bedeutet diese Zeile für den Weg?', optionen: ['Bei $x=4$ ist die Steigung am kleinsten, dort fällt der Weg am stärksten.', 'Bei $x=4$ ist der Weg am höchsten.', 'Bei $x=4$ ist die Steigung am größten, dort steigt der Weg am stärksten.'], richtig: 0, erklaerung: m`Minimum von $p'$ heißt kleinste Steigung. Eine negative Steigung ist ein Abstieg, die kleinste Steigung ist also der steilste Abstieg.` } },
          { rechnung: m`$$p'(4)=-1{,}2,\qquad p'(0)=p'(8)=3{,}6$$`,
            frage: { frage: 'Warum werden hier auch $x=0$ und $x=8$ betrachtet?', optionen: ['Weil dort der Weg beginnt und endet. Auf einem Intervall kann das Minimum auch am Rand liegen.', 'Weil dort die Nullstellen von $p$ liegen.', 'Weil man immer drei Werte berechnen muss.'], richtig: 0, erklaerung: m`Ein lokales Minimum muss nicht das kleinste auf dem ganzen Intervall sein. Die Randwerte $3{,}6$ sind größer als $-1{,}2$, also gewinnt $x=4$.` } },
          { rechnung: m`Bei $x=4$ fällt der Weg am stärksten, um $1{,}2$ Höhe (100 m) pro km, also $120\,\text{m}$ pro km.`,
            frage: null }
        ],
        aufgabe: { frage: 'Welche Aufgabenstellung gehört zu diesem Lösungsweg?', optionen: ['Bestimmen Sie die Stelle, an der der Weg am stärksten abfällt.', 'Bestimmen Sie die größte Höhe des Weges.', 'Bestimmen Sie die Länge des Weges.'], richtig: 0, erklaerung: m`Der Weg sucht die kleinste Steigung $p'$. Das ist der steilste Abstieg.` },
        aufschreiben: 'Schreib jetzt auf Papier in 3 bis 4 Sätzen, was der Lösungsweg macht und warum. Nenne die Aufgabe, den Ansatz, die Begründung und das Ergebnis im Sachzusammenhang.',
        kernpunkte: [
          { name: 'Aufgabe erkannt', punkte: 1, text: 'Es wird die Stelle gesucht, an der der Weg am stärksten abfällt (kleinste Steigung).' },
          { name: 'Ansatz erklärt', punkte: 1, text: m`Die Steigung ist $p'$. Ihre Extremstelle findet man mit $p''(x)=0$.` },
          { name: 'Art des Extremums begründet', punkte: 1, text: m`$p'''(4)>0$, also hat $p'$ bei $x=4$ ein Minimum (und kein Maximum).` },
          { name: 'Ränder berücksichtigt', punkte: 1, text: m`Auf $[0;8]$ werden die Randwerte $p'(0)=p'(8)=3{,}6$ verglichen, sie sind größer als $p'(4)$.` },
          { name: 'Ergebnis im Sachzusammenhang', punkte: 1, text: m`Bei km 4 fällt der Weg am stärksten, mit $-1{,}2$, also 120 m pro km.` }
        ]
      },

      // Bedingung deuten (Abi-Typ) – Portalplan 5.5
      deuten: {
        titel: 'Bedingung deuten',
        intro: m`Das Höhenprofil des Wanderwegs ist $p(x)=0{,}1x^3-1{,}2x^2+3{,}6x+2$ ($x$ in km, $p(x)$ in 100 m). Probiere erst mit den Reglern aus, was ein Ausdruck wie $p(a+w)-p(a)$ am Graphen bedeutet. Danach übersetzt du drei Bedingungen in ein Bild und einen Satz.`,
        demo: { f: 'p', w: 2, a: 1, wmax: 6 },
        bedingungen: [
          { term: m`$p'(2)=0$`,
            bild: { frage: 'Was ist im Graphen zu sehen?', optionen: ['Die Tangente bei $x=2$ liegt waagerecht.', 'Der Graph schneidet bei $x=2$ die $x$-Achse.', 'Der Graph hat bei $x=2$ die Höhe 0.'], richtig: 0, erklaerung: m`$p'$ ist die Steigung. Steigung 0 heißt waagerechte Tangente. Über die Höhe sagt die Bedingung nichts.` },
            satz: { frage: 'Welcher Satz im Sachzusammenhang passt?', optionen: ['Nach 2 km liegt der Weg auf Meereshöhe.', 'Bei km 2 steigt der Weg weder an noch fällt er, dort ist er kurz waagerecht.', 'Der Weg ist insgesamt 2 km lang.'], richtig: 1, erklaerung: m`$p'(2)=0$: die momentane Steigung ist 0. Der Wanderer geht an dieser Stelle gerade eben.` } },
          { term: m`$p(a+2)=p(a)$`,
            bild: { frage: 'Was ist im Graphen zu sehen?', optionen: ['Zwei Punkte des Graphen, die 2 Einheiten auseinanderliegen, haben dieselbe Höhe (waagerechte Verbindungsgerade).', 'Der Graph steigt um 2, wenn man um $a$ nach rechts geht.', 'Der Graph hat bei $x=2$ einen Hochpunkt.'], richtig: 0, erklaerung: m`Links steht die Höhe an der Stelle $a+2$, rechts die Höhe an der Stelle $a$. Gleiche Werte heißen gleich hoch. Im Regler oben siehst du das, wenn der Unterschied 0 ist (für $a\approx1{,}09$ und $a\approx4{,}92$).` },
            satz: { frage: 'Welcher Satz im Sachzusammenhang passt?', optionen: ['Es gibt zwei Stellen im Abstand von 2 km, an denen der Weg gleich hoch liegt.', 'Nach 2 km liegt der Weg wieder auf der Starthöhe.', 'Der Weg steigt auf 2 km um dieselbe Höhe wie auf $a$ km.'], richtig: 0, erklaerung: m`Die Bedingung vergleicht zwei Höhen im festen Abstand 2. Wo das stimmt, ist der Höhenunterschied zwischen beiden Stellen 0.` } },
          { term: m`$\dfrac{p(6)-p(2)}{4}=-0{,}8$`,
            bild: { frage: 'Was ist im Graphen zu sehen?', optionen: ['Die Gerade durch die Punkte bei $x=2$ und $x=6$ hat die Steigung $-0{,}8$.', 'Die Tangente bei $x=4$ hat die Steigung $-0{,}8$.', 'Der Graph hat bei $x=4$ einen Tiefpunkt.'], richtig: 0, erklaerung: m`Höhenunterschied geteilt durch Breite ist die Steigung der Verbindungsgeraden (Sekante). Das ist eine <b>mittlere</b> Änderungsrate. Die Tangente bei $x=4$ hat sogar die Steigung $p'(4)=-1{,}2$.` },
            satz: { frage: 'Welcher Satz im Sachzusammenhang passt?', optionen: ['Zwischen km 2 und km 6 fällt der Weg im Mittel um 0,8 (80 m) pro km.', 'Bei km 4 beträgt die Steigung genau $-0{,}8$.', 'Der Weg ist zwischen km 2 und km 6 genau 0,8 km lang.'], richtig: 0, erklaerung: m`„Im Mittel“ gehört zu einem Intervall, „genau an einer Stelle“ zur Ableitung. Das ist die häufigste Verwechslung bei diesem Typ.` } }
        ]
      }
    },

    stufen: [
      // ---------------------------------------------------------------- 0 Sehen
      {
        typ: 'sehen',
        demo: { name: 'tangente', f: 'x^3-6x^2+9x+1', label: m`$f(x)=x^3-6x^2+9x+1$` },
        text: 'Zieh den Punkt über den Graphen. Die Gerade ist die Tangente, ihre Steigung ist $f\'(x)$. Achte darauf, was an den höchsten und tiefsten Stellen passiert.',
        frage: { frage: 'Was gilt an einem Hochpunkt für die Steigung der Tangente?', optionen: ['Sie ist dort am größten.', 'Sie ist 0, die Tangente liegt waagerecht.', 'Sie ist negativ.'], richtig: 1, erklaerung: 'Links vom Hochpunkt steigt der Graph, rechts fällt er. Genau dazwischen ist die Steigung 0. Darum sucht man Extremstellen mit $f\'(x)=0$.' }
      },

      // ---------------------------------------------------------------- 1 Nachvollziehen
      {
        typ: 'beispiel',
        task: {
          id: 'demo-s1', teil: 'B', titel: 'Vorgerechnetes Beispiel',
          parts: [{
            id: 'demo-s1a', label: '', operator: 'Bestimmen Sie', afb: 'I', be: 6,
            frage: m`Bestimmen Sie die Extrempunkte des Graphen von $f$ mit $f(x)=x^3-6x^2+9x+1$.`,
            checkpoints: [{ id: 'hx', label: 'x des Hochpunkts', wert: 1 }],
            schritte: [
              { name: 'Ableitungen bilden', punkte: 1,
                vorher: { frage: 'Womit fängst du an?', optionen: ['Nullstellen von $f$ berechnen', 'Ableitungen $f\'$ und $f\'\'$ bilden', '$f(1)$ ausrechnen'], richtig: 1 },
                rechnung: m`$$\begin{array}{l} f'(x)=3x^2-12x+9 \\[6pt] f''(x)=6x-12 \end{array}$$`,
                warum: 'Extremstellen findet man über die Steigung ($f\'$), ob Hoch- oder Tiefpunkt über die Krümmung ($f\'\'$).' },
              { name: 'Notwendige Bedingung $f\'(x)=0$', punkte: 2,
                vorher: { frage: 'Welche Gleichung löst du jetzt?', optionen: ['$f(x)=0$', '$f\'(x)=0$', '$f\'\'(x)=0$'], richtig: 1 },
                rechnung: m`$$\begin{aligned} 3x^2-12x+9 &= 0 \quad \mid :3 \\ x^2-4x+3 &= 0 \\ x_{1,2} &= 2 \pm \sqrt{4-3} \\ \res{x_1=1} \quad &\res{x_2=3} \end{aligned}$$`,
                cas: { eingabe: 'solve(3x^2-12x+9=0,x)', ausgabe: 'x=1 or x=3' },
                warum: 'An Hoch- und Tiefpunkten liegt die Tangente waagerecht, die Steigung ist 0.' },
              { name: 'Hinreichende Bedingung mit $f\'\'$', punkte: 1,
                vorher: { frage: 'Es ist $f\'\'(1)=-6$. Was folgt daraus?', optionen: ['Hochpunkt bei $x=1$', 'Tiefpunkt bei $x=1$', 'Sattelpunkt bei $x=1$'], richtig: 0 },
                rechnung: m`$$\begin{aligned} f''(1) &= -6 < 0 \;\Rightarrow\; \res{\text{Hochstelle}} \\ f''(3) &= 6 > 0 \;\Rightarrow\; \res{\text{Tiefstelle}} \end{aligned}$$`,
                warum: '$f\'=0$ allein reicht nicht, es könnte ein Sattelpunkt sein. Das Vorzeichen von $f\'\'$ entscheidet: negativ = Rechtskurve = Hochpunkt.' },
              { name: 'y-Werte berechnen', punkte: 1,
                rechnung: m`$$\begin{array}{l} f(1)=1-6+9+1=\res{5} \\[6pt] f(3)=27-54+27+1=\res{1} \end{array}$$`,
                warum: 'Ein Punkt braucht beide Koordinaten. Immer in $f$ einsetzen, nicht in $f\'$.' },
              { name: 'Antwortsatz', punkte: 1, antwort: true,
                rechnung: m`Der Graph von $f$ hat den Hochpunkt $H(1\,|\,5)$ und den Tiefpunkt $T(3\,|\,1)$.`,
                warum: 'Im Abitur gibt es für das Ergebnis erst Punkte, wenn es als Punkt mit Koordinaten dasteht.' }
            ]
          }]
        }
      },

      // ---------------------------------------------------------------- 2 Ergänzen
      {
        typ: 'luecken',
        task: {
          id: 'demo-s2', teil: 'B', titel: 'Beispiel mit Lücken',
          parts: [{
            id: 'demo-s2a', label: '', operator: 'Bestimmen Sie', afb: 'I', be: 6,
            frage: m`Bestimmen Sie die Extrempunkte des Graphen von $g$ mit $g(x)=x^3-3x^2-9x+2$.`,
            checkpoints: [{ id: 'x1', label: 'x₁', wert: -1 }],
            schritte: [
              { name: 'Ableitungen bilden', punkte: 1,
                rechnung: m`$$\begin{array}{l} g'(x)=3x^2-6x-9 \\[6pt] g''(x)=6x-6 \end{array}$$` },
              { name: 'Notwendige Bedingung $g\'(x)=0$', punkte: 2,
                rechnung: m`$$\begin{aligned} 3x^2-6x-9 &= 0 \quad \mid :3 \\ x^2-2x-3 &= 0 \\ x_{1,2} &= 1 \pm \sqrt{1+3} \\ \res{x_1=-1} \quad &\res{x_2=3} \end{aligned}$$`,
                luecke: { rechnung: m`$$\begin{aligned} 3x^2-6x-9 &= 0 \quad \mid :3 \\ x^2-2x-3 &= 0 \\ x_{1,2} &= 1 \pm \sqrt{1+3} \\ x_1 = \;?\; \quad & x_2 = \;? \end{aligned}$$`,
                  felder: [{ id: 'x1', label: 'x₁ (kleinere)', wert: -1 }, { id: 'x2', label: 'x₂', wert: 3 }],
                  tipp: '$\\sqrt{4}=2$, also $1-2$ und $1+2$.' },
                cas: { eingabe: 'solve(3x^2-6x-9=0,x)', ausgabe: 'x=-1 or x=3' } },
              { name: 'Hinreichende Bedingung mit $g\'\'$', punkte: 1,
                rechnung: m`$$\begin{aligned} g''(-1) &= -12 < 0 \;\Rightarrow\; \res{\text{Hochstelle}} \\ g''(3) &= 12 > 0 \;\Rightarrow\; \res{\text{Tiefstelle}} \end{aligned}$$` },
              { name: 'y-Werte berechnen', punkte: 1,
                rechnung: m`$$\begin{array}{l} g(-1)=-1-3+9+2=\res{7} \\[6pt] g(3)=27-27-27+2=\res{-25} \end{array}$$`,
                luecke: { rechnung: m`$$\begin{array}{l} g(-1)=-1-3+9+2=\;? \\[6pt] g(3)=27-27-27+2=\;? \end{array}$$`,
                  felder: [{ id: 'y1', label: 'g(−1)', wert: 7 }, { id: 'y2', label: 'g(3)', wert: -25 }],
                  tipp: 'Achtung Vorzeichen: $(-1)^3=-1$ und $-3\\cdot(-1)^2=-3$.' } },
              { name: 'Antwortsatz', punkte: 1, antwort: true,
                rechnung: m`Der Graph von $g$ hat den Hochpunkt $H(-1\,|\,7)$ und den Tiefpunkt $T(3\,|\,-25)$.` }
            ]
          }]
        }
      },

      // ---------------------------------------------------------------- 3 Gerüst
      {
        typ: 'geruest',
        task: {
          id: 'demo-s3', teil: 'B', titel: 'Mit Gerüst auf Papier',
          parts: [{
            id: 'demo-s3a', label: '', operator: 'Bestimmen Sie', afb: 'I', be: 6,
            frage: m`Bestimmen Sie die Extrempunkte des Graphen von $h$ mit $h(x)=-x^3+3x+4$.`,
            checkpoints: [
              { id: 'xa', label: 'kleinere Extremstelle', wert: -1, schritt: 1 },
              { id: 'xb', label: 'größere Extremstelle', wert: 1, schritt: 1 },
              { id: 'ka', label: 'h″ an der kleineren Stelle', wert: 6, schritt: 2 },
              { id: 'ya', label: 'y-Wert an der kleineren Stelle', wert: 2, schritt: 3 },
              { id: 'yb', label: 'y-Wert an der größeren Stelle', wert: 6, schritt: 3 }
            ],
            schritte: [
              { name: 'Ableitungen bilden', punkte: 1, hinweis: 'Potenzregel: aus $-x^3$ wird $-3x^2$.',
                rechnung: m`$$\begin{array}{l} h'(x)=-3x^2+3 \\[6pt] h''(x)=-6x \end{array}$$` },
              { name: 'Notwendige Bedingung $h\'(x)=0$', punkte: 2, hinweis: 'Hier brauchst du keine pq-Formel: nach $x^2$ auflösen.',
                rechnung: m`$$\begin{aligned} -3x^2+3 &= 0 \quad \mid -3 \\ -3x^2 &= -3 \quad \mid :(-3) \\ x^2 &= 1 \\ \res{x_1=-1} \quad &\res{x_2=1} \end{aligned}$$`,
                cas: { eingabe: 'solve(-3x^2+3=0,x)', ausgabe: 'x=-1 or x=1' } },
              { name: 'Hinreichende Bedingung mit $h\'\'$', punkte: 1, hinweis: 'Setze beide Stellen in $h\'\'(x)=-6x$ ein.',
                rechnung: m`$$\begin{aligned} h''(-1) &= 6 > 0 \;\Rightarrow\; \res{\text{Tiefstelle}} \\ h''(1) &= -6 < 0 \;\Rightarrow\; \res{\text{Hochstelle}} \end{aligned}$$` },
              { name: 'y-Werte berechnen', punkte: 1, hinweis: 'In $h$ einsetzen, nicht in $h\'$.',
                rechnung: m`$$\begin{array}{l} h(-1)=1-3+4=\res{2} \\[6pt] h(1)=-1+3+4=\res{6} \end{array}$$` },
              { name: 'Antwortsatz', punkte: 1, antwort: true, hinweis: 'Punkte mit beiden Koordinaten nennen.',
                rechnung: m`Der Graph von $h$ hat den Tiefpunkt $T(-1\,|\,2)$ und den Hochpunkt $H(1\,|\,6)$.` }
            ]
          }]
        }
      },

      // ---------------------------------------------------------------- 4 Abi-Aufgabe
      {
        typ: 'abi',
        task: {
          id: 'demo-s4', teil: 'B', titel: 'Höhenprofil eines Wanderwegs',
          kennung: 'Demo-Aufgabe im Stil des Zentralabiturs Niedersachsen (Teil B, CAS). Keine offizielle Aufgabe, keine offizielle Lösung.',
          intro: m`Das Höhenprofil eines Wanderwegs wird für $0 \le x \le 8$ durch die Funktion $p$ mit $p(x)=0{,}1x^3-1{,}2x^2+3{,}6x+2$ beschrieben. Dabei ist $x$ die horizontale Entfernung vom Start in km und $p(x)$ die Höhe in 100 m über dem Meer.`,
          fig: { f: 'p', xmin: 0, xmax: 8, ymin: 0, ymax: 6, title: 'Graph von p' },
          parts: [
            { id: 'demo-s4a', label: 'a)', operator: 'Bestimmen Sie', afb: 'II', be: 5,
              frage: 'Bestimmen Sie die Koordinaten der Extrempunkte des Graphen von $p$.',
              tipps: ['Gleicher Ablauf wie immer: Ableitungen, $p\'(x)=0$, $p\'\'$ prüfen, $y$-Werte.', 'Mit CAS: erst $p$ definieren, dann $p\'(x)=0$ lösen lassen.', '$p\'(x)=0{,}3(x-2)(x-6)$'],
              checkpoints: [{ id: 'xh', label: 'x Hochpunkt', wert: 2 }, { id: 'yh', label: 'y Hochpunkt', wert: 5.2 }, { id: 'xt', label: 'x Tiefpunkt', wert: 6 }, { id: 'yt', label: 'y Tiefpunkt', wert: 2 }],
              schritte: [
                { name: 'Funktion im CAS festlegen, Ableitungen', punkte: 1,
                  rechnung: m`$$\begin{array}{l} p'(x)=0{,}3x^2-2{,}4x+3{,}6 \\[6pt] p''(x)=0{,}6x-2{,}4 \end{array}$$`,
                  cas: { eingabe: 'Define p(x)=0.1x^3-1.2x^2+3.6x+2', ausgabe: 'Fertig' } },
                { name: 'Notwendige Bedingung $p\'(x)=0$', punkte: 2,
                  rechnung: m`$$p'(x)=0 \;\Leftrightarrow\; \res{x=2} \;\lor\; \res{x=6}$$`,
                  cas: { eingabe: 'solve(d(p(x),x)=0,x)', ausgabe: 'x=2 or x=6' },
                  warum: 'Mit CAS: Ansatz $p\'(x)=0$ hinschreiben, Lösungen übernehmen. Die Eingabe ersetzt den Ansatz nicht.' },
                { name: 'Hinreichende Bedingung und y-Werte', punkte: 2,
                  rechnung: m`$$\begin{aligned} p''(2) &= -1{,}2 < 0, \quad p(2)=5{,}2 \;\Rightarrow\; \res{H(2\,|\,5{,}2)} \\ p''(6) &= 1{,}2 > 0, \quad p(6)=2 \;\Rightarrow\; \res{T(6\,|\,2)} \end{aligned}$$`,
                  cas: { eingabe: 'd(p(x),x,2)|x=2', ausgabe: '-1.2' } }
              ],
              antwort: m`Hochpunkt $H(2\,|\,5{,}2)$, Tiefpunkt $T(6\,|\,2)$.` },
            { id: 'demo-s4b', label: 'b)', operator: 'Ermitteln Sie / Begründen Sie', afb: 'III', be: 3,
              frage: 'Ermitteln Sie die größte Höhe des Wanderwegs und begründen Sie, an welchen Stellen sie erreicht wird.',
              tipps: ['Der Hochpunkt ist nur lokal am höchsten. Was ist mit den Rändern des Intervalls?', 'Berechne $p(0)$ und $p(8)$.'],
              checkpoints: [{ id: 'p8', label: 'p(8)', wert: 5.2 }, { id: 'hmax', label: 'größte Höhe in m', wert: 520 }],
              schritte: [
                { name: 'Randwerte prüfen', punkte: 2,
                  rechnung: m`$$\begin{array}{l} p(0)=2 \\[6pt] p(8)=51{,}2-76{,}8+28{,}8+2=\res{5{,}2} \end{array}$$`,
                  warum: 'Auf einem Intervall kann der höchste Wert auch am Rand liegen. Ein lokaler Hochpunkt ist nicht automatisch der höchste Punkt.' },
                { name: 'Vergleichen und begründen', punkte: 1, antwort: true,
                  rechnung: m`Der höchste Funktionswert ist $5{,}2$. Er wird beim Hochpunkt $x=2$ und am rechten Rand $x=8$ erreicht. Die größte Höhe beträgt also $520\,\text{m}$, nach 2 km und am Ende des Weges.` }
              ],
              antwort: 'Größte Höhe 520 m, bei x = 2 und x = 8.' }
          ]
        }
      },

      // ---------------------------------------------------------------- 5 Mix/Transfer
      {
        typ: 'abi',
        task: {
          id: 'demo-s5', teil: 'A', titel: 'Parameter so wählen, dass …',
          kennung: 'Demo-Aufgabe im Stil des Zentralabiturs Niedersachsen (Teil A, ohne Hilfsmittel). Keine offizielle Aufgabe, keine offizielle Lösung.',
          intro: m`Gegeben ist für $c \in \mathbb{R}$ die Funktionenschar $g_c$ mit $g_c(x)=x^3-6x^2+9x+c$.`,
          parts: [
            { id: 'demo-s5a', label: 'a)', operator: 'Bestimmen Sie / Begründen Sie', afb: 'III', be: 5,
              frage: 'Bestimmen Sie $c$ so, dass der Tiefpunkt des Graphen von $g_c$ auf der $x$-Achse liegt. Begründen Sie, dass $g_c$ dann genau zwei Nullstellen hat.',
              tipps: ['Der Parameter $c$ verschiebt den Graphen nur nach oben oder unten. Ändert sich dadurch die Lage der Extremstellen?', 'Die Tiefstelle ist $x=3$ (wie in Stufe 1). Was muss $g_c(3)$ sein?', 'Für die Nullstellen: $g_0(x)$ ausklammern.'],
              checkpoints: [{ id: 'xt', label: 'Tiefstelle x', wert: 3 }, { id: 'c', label: 'c', wert: 0 }],
              schritte: [
                { name: 'Extremstellen hängen nicht von $c$ ab', punkte: 1,
                  rechnung: m`$$\begin{array}{l} g_c'(x)=3x^2-12x+9 = 0 \;\Leftrightarrow\; x=1 \lor x=3, \\[6pt] g_c''(3)=6>0 \;\Rightarrow\; \res{\text{Tiefstelle } x=3} \end{array}$$`,
                  warum: '$c$ fällt beim Ableiten weg. Darum liegt die Tiefstelle für jedes $c$ bei $x=3$.' },
                { name: 'Bedingung: Tiefpunkt auf der x-Achse', punkte: 2,
                  rechnung: m`$$g_c(3)=27-54+27+c=c \overset{!}{=} 0 \;\Rightarrow\; \res{c=0}$$` },
                { name: 'Genau zwei Nullstellen begründen', punkte: 2, antwort: true,
                  rechnung: m`$$g_0(x)=x^3-6x^2+9x=x\,(x-3)^2$$ Nullstellen sind $x=0$ und die doppelte Nullstelle $x=3$ (dort berührt der Graph die $x$-Achse). Also gibt es genau zwei Nullstellen.` }
              ],
              antwort: 'c = 0; Nullstellen 0 und 3 (doppelt).' }
          ]
        }
      }
    ]
  };

  window.LR_TOPICS = (window.LR_TOPICS || []).concat([topic]);
  // Für Demos: Funktionen als JS (gleiche Terme wie oben, für Graphen)
  window.LR_FN = Object.assign(window.LR_FN || {}, {
    'x^3-6x^2+9x+1': { f: x => x ** 3 - 6 * x ** 2 + 9 * x + 1, d: x => 3 * x ** 2 - 12 * x + 9, xmin: -0.6, xmax: 4.6, ymin: -2, ymax: 8 },
    p: { f: x => 0.1 * x ** 3 - 1.2 * x ** 2 + 3.6 * x + 2, xmin: 0, xmax: 8, ymin: 0, ymax: 6 }
  });
})();
