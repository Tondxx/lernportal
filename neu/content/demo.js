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
    p: { f: x => 0.1 * x ** 3 - 1.2 * x ** 2 + 3.6 * x + 2 }
  });
})();
