/* ==========================================================================
   BEISPIELPROGRAMME UND AUFGABEN ZU JEDEM DATENTYP DES BEIPACKZETTELS (Tonda, 10.11.2026: „klare Beispielprogramme, wo du die
   Befehle anwendest, und Aufgaben dazu, zu den Datentypen“).
   Datentypen: Zeichenketten, Rechnen (/ und mod), statische Reihung (1D/2D), dynamische Reihung, Stapel, Schlange, Stapel+Schlange.
   Jedes Programm ist EIN Algorithmus-Baum (LRAlgo.A): daraus entstehen Struktogramm, Pseudocode und Python (gleich markierbar).
   Es werden NUR die Befehle des Beipackzettels benutzt (Pseudo: getItem, setItem, getLength, push, pop, top, enqueue, dequeue, isEmpty;
   für Zeichenketten die Funktionsnamen länge(s), zeichen(s, i), teil(s, a, b), ascii(z), zeichenZu(n); / ganzzahlig, mod).
   art 'beispiel': erklärt (Seite #/befehle, Reiter „Beispiele“). art 'aufgabe': wird zu einer Aufgabe (LR_TASKS, Id IX-…) und zu einer
   Python-Werkstatt-Aufgabe (LR_PY, Id py-…) mit denselben Tests. Alle Tests laufen gegen echtes Python: tests/informatik_check.py, python.test.js.
   ========================================================================== */
(function () {
  const LA = window.LRAlgo, A = LA && LA.A;
  if (!A) { window.INF_BEISPIELE = []; return; }
  const F = 'informatik';
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const code = s => `<pre class="ic-code">${esc(String(s).replace(/\s+$/, ''))}</pre>`;
  const list = items => `<ul>${items.map(i => `<li>${i}</li>`).join('')}</ul>`;
  const TYPEN = [
    { id: 'zeichen', titel: 'Zeichenketten', lesson: 'IB1' },
    { id: 'rechnen', titel: 'Rechnen mit / und mod', lesson: 'IB1' },
    { id: 'static', titel: 'Statische Reihung', lesson: 'IB2' },
    { id: 'dyn', titel: 'Dynamische Reihung', lesson: 'IB2' },
    { id: 'stack', titel: 'Stapel', lesson: 'IF10' },
    { id: 'queue', titel: 'Schlange', lesson: 'IF11' },
    { id: 'kombi', titel: 'Stapel und Schlange zusammen', lesson: 'IF11' }
  ];
  const T = (call, erwartet) => ({ call, erwartet });
  const { do: d, ret, if: wenn, count, each, while: solange } = A;
  const falsch = ret('falsch', 'False'), wahr = ret('wahr', 'True');

  const EX = [
    // ======================================================== ZEICHENKETTEN
    {
      id: 'vokale', typ: 'zeichen', art: 'beispiel', titel: 'Vokale zählen',
      aufgabe: 'Entwickeln Sie <code>anzahlVokale(wort: Zeichenkette): Ganzzahl</code>. Sie zählt die kleinen Vokale a, e, i, o, u in einem Wort.',
      algo: {
        name: 'anzahlVokale', params: ['wort'], body: [
          d('anzahl ← 0', 'anzahl = 0'),
          count('i', '0', 'länge(wort) − 1', [
            d('z ← zeichen(wort, i)', 'z = wort[i]'),
            wenn('z = "a" ODER z = "e" ODER z = "i" ODER z = "o" ODER z = "u"', 'z == "a" or z == "e" or z == "i" or z == "o" or z == "u"', [d('anzahl ← anzahl + 1', 'anzahl = anzahl + 1')])
          ], 'len(wort)'),
          ret('anzahl')
        ]
      },
      tests: [T('anzahlVokale("informatik")', 4), T('anzahlVokale("")', 0), T('anzahlVokale("xyz")', 0), T('anzahlVokale("aeiou")', 5), T('anzahlVokale("Auto")', 2)],
      erklaerung: ['<b>Länge und Zeichen an Position</b> sind die einzigen Befehle, die man braucht: Die Schleife läuft von Position 0 bis <code>länge − 1</code>.', 'Jedes Zeichen wird mit <code>=</code> verglichen (Gleichheit prüfen). Es gibt kein „<code>in "aeiou"</code>“ auf dem Beipackzettel.', '<code>"Auto"</code> ergibt 2, nicht 3: Das große <code>A</code> ist ein anderes Zeichen als <code>a</code> (ASCII 65 und 97).', 'Bei der leeren Zeichenkette läuft die Schleife von 0 bis −1, also gar nicht: Ergebnis 0. Kein Sonderfall nötig.']
    },
    {
      id: 'umdrehen', typ: 'zeichen', art: 'beispiel', titel: 'Zeichenkette umdrehen',
      aufgabe: 'Entwickeln Sie <code>umdrehen(s: Zeichenkette): Zeichenkette</code>, die die Zeichen in umgekehrter Reihenfolge zurückgibt. Es gibt kein „umdrehen“ auf dem Beipackzettel: Die neue Zeichenkette wird Zeichen für Zeichen mit „Verbinden“ aufgebaut.',
      algo: {
        name: 'umdrehen', params: ['s'], body: [
          d('ergebnis ← ""', 'ergebnis = ""'),
          d('i ← länge(s) − 1', 'i = len(s) - 1'),
          solange('i ≥ 0', 'i >= 0', [d('ergebnis ← ergebnis + zeichen(s, i)', 'ergebnis = ergebnis + s[i]'), d('i ← i − 1', 'i = i - 1')]),
          ret('ergebnis')
        ]
      },
      tests: [T('umdrehen("Abc")', 'cbA'), T('umdrehen("")', ''), T('umdrehen("a")', 'a'), T('umdrehen("Informatik")', 'kitamrofnI')],
      erklaerung: ['<b>Verbinden</b>: <code>ergebnis + zeichen</code> hängt hinten an. Startwert ist die <b>leere Zeichenkette</b>.', 'Gelesen wird von hinten nach vorn: <code>i</code> beginnt bei <code>länge − 1</code> (letzte Position) und endet bei 0.', 'Die Schleife ist eine <b>solange</b>-Schleife, weil sie rückwärts zählt.']
    },
    {
      id: 'caesar', typ: 'zeichen', art: 'beispiel', titel: 'Caesar-Verschlüsselung (ASCII und mod)',
      aufgabe: 'Entwickeln Sie <code>caesar(text: Zeichenkette, k: Ganzzahl): Zeichenkette</code>. Jeder Großbuchstabe wird um <code>k</code> Stellen im Alphabet nach hinten verschoben (nach Z kommt wieder A). Alle anderen Zeichen bleiben.',
      algo: {
        name: 'caesar', params: ['text', 'k'], body: [
          d('ergebnis ← ""', 'ergebnis = ""'),
          count('i', '0', 'länge(text) − 1', [
            d('z ← zeichen(text, i)', 'z = text[i]'),
            wenn('ascii(z) ≥ 65 UND ascii(z) ≤ 90', 'ord(z) >= 65 and ord(z) <= 90', [
              d('nr ← (ascii(z) − 65 + k) mod 26', 'nr = (ord(z) - 65 + k) % 26'),
              d('ergebnis ← ergebnis + zeichenZu(nr + 65)', 'ergebnis = ergebnis + chr(nr + 65)')
            ], [d('ergebnis ← ergebnis + z', 'ergebnis = ergebnis + z')])
          ], 'len(text)'),
          ret('ergebnis')
        ]
      },
      tests: [T('caesar("ABC", 3)', 'DEF'), T('caesar("XYZ", 3)', 'ABC'), T('caesar("HALLO WELT", 1)', 'IBMMP XFMU'), T('caesar("ABC", 0)', 'ABC'), T('caesar("A-Z", 25)', 'Z-Y')],
      erklaerung: ['<b>ASCII</b>: Großbuchstaben haben die Werte 65 (A) bis 90 (Z). Mit <code>ascii(z) − 65</code> wird A zu 0, B zu 1 … Z zu 25.', '<b>mod 26</b> sorgt für das Zurückspringen: <code>(25 + 3) mod 26 = 2</code>, das ist C. Ohne mod käme hinter Z das Zeichen „[“.', 'Mit <code>zeichenZu(nr + 65)</code> wird die Zahl wieder ein Zeichen. Alle Nicht-Großbuchstaben werden unverändert angehängt.']
    },
    {
      id: 'palindrom', typ: 'zeichen', art: 'aufgabe', titel: 'Palindrom prüfen',
      aufgabe: 'Entwickeln Sie <code>istPalindrom(s: Zeichenkette): Wahrheitswert</code>. Ein Palindrom liest sich vorwärts und rückwärts gleich (<code>otto</code>, <code>anna</code>). Vergleichen Sie nur die erste mit der zweiten Hälfte.',
      algo: {
        name: 'istPalindrom', params: ['s'], body: [
          count('i', '0', 'länge(s) / 2 − 1', [wenn('zeichen(s, i) ≠ zeichen(s, länge(s) − 1 − i)', 's[i] != s[len(s) - 1 - i]', [falsch])], 'len(s) // 2'),
          wahr
        ]
      },
      tests: [T('istPalindrom("otto")', true), T('istPalindrom("anna")', true), T('istPalindrom("abc")', false), T('istPalindrom("")', true), T('istPalindrom("x")', true), T('istPalindrom("abca")', false)],
      tipp: 'Position <code>i</code> gegen Position <code>länge − 1 − i</code> vergleichen. Das <code>/</code> im Struktogramm ist die ganzzahlige Division.'
    },
    {
      id: 'zaehleteil', typ: 'zeichen', art: 'aufgabe', titel: 'Teilzeichenkette zählen',
      aufgabe: 'Entwickeln Sie <code>zaehleTeil(text, t: Zeichenkette): Ganzzahl</code>: Sie zählt, wie oft <code>t</code> in <code>text</code> vorkommt (überlappende Treffer zählen mit: <code>aba</code> kommt in <code>abababa</code> 3-mal vor). Benutzen Sie „Teilzeichenkette auslesen“ und „Gleichheit“.',
      algo: {
        name: 'zaehleTeil', params: ['text', 't'], body: [
          d('anzahl ← 0', 'anzahl = 0'),
          count('i', '0', 'länge(text) − länge(t)', [
            wenn('teil(text, i, i + länge(t)) = t', 'text[i:i + len(t)] == t', [d('anzahl ← anzahl + 1', 'anzahl = anzahl + 1')])
          ], 'len(text) - len(t) + 1'),
          ret('anzahl')
        ]
      },
      tests: [T('zaehleTeil("abababa", "aba")', 3), T('zaehleTeil("hallo", "l")', 2), T('zaehleTeil("abc", "abcd")', 0), T('zaehleTeil("aaa", "aa")', 2), T('zaehleTeil("xyz", "q")', 0)],
      tipp: 'Die letzte sinnvolle Startposition ist <code>länge(text) − länge(t)</code>. Ist <code>t</code> länger als <code>text</code>, läuft die Schleife gar nicht.'
    },

    // ======================================================== RECHNEN
    {
      id: 'quersumme', typ: 'rechnen', art: 'beispiel', titel: 'Quersumme mit / und mod',
      aufgabe: 'Entwickeln Sie <code>quersumme(n: Ganzzahl): Ganzzahl</code> für eine natürliche Zahl.',
      algo: {
        name: 'quersumme', params: ['n'], body: [
          d('summe ← 0', 'summe = 0'),
          solange('n > 0', 'n > 0', [d('summe ← summe + n mod 10', 'summe = summe + n % 10'), d('n ← n / 10', 'n = n // 10')]),
          ret('summe')
        ]
      },
      tests: [T('quersumme(5832)', 18), T('quersumme(0)', 0), T('quersumme(7)', 7), T('quersumme(1000)', 1), T('quersumme(999)', 27)],
      ablauf: { kopf: ['Durchlauf', 'n mod 10', 'summe', 'n'], zeilen: [['Start', '–', '0', '5832'], ['1', '2', '2', '583'], ['2', '3', '5', '58'], ['3', '8', '13', '5'], ['4', '5', '18', '0']], text: 'Für <code>quersumme(5832)</code>:' },
      erklaerung: ['<code>n mod 10</code> ist die <b>letzte Ziffer</b>, <code>n / 10</code> (ganzzahlig, ohne Rest) schneidet sie ab.', 'Die Schleife endet, wenn <code>n</code> 0 geworden ist: Alle Ziffern sind verbraucht.', 'In Python schreibst du <code>%</code> und <code>//</code>. Im Struktogramm steht <code>mod</code> und <code>/</code>.']
    },
    {
      id: 'binaer', typ: 'rechnen', art: 'beispiel', titel: 'Dezimalzahl als Binärzahl',
      aufgabe: 'Entwickeln Sie <code>alsBinaer(n: Ganzzahl): Zeichenkette</code>, die die natürliche Zahl <code>n</code> als Folge aus 0 und 1 zurückgibt.',
      algo: {
        name: 'alsBinaer', params: ['n'], body: [
          wenn('n = 0', 'n == 0', [ret('"0"')]),
          d('ergebnis ← ""', 'ergebnis = ""'),
          solange('n > 0', 'n > 0', [
            d('rest ← n mod 2', 'rest = n % 2'),
            d('ergebnis ← zeichenZu(48 + rest) + ergebnis', 'ergebnis = chr(48 + rest) + ergebnis'),
            d('n ← n / 2', 'n = n // 2')
          ]),
          ret('ergebnis')
        ]
      },
      tests: [T('alsBinaer(13)', '1101'), T('alsBinaer(0)', '0'), T('alsBinaer(8)', '1000'), T('alsBinaer(255)', '11111111'), T('alsBinaer(1)', '1')],
      ablauf: { kopf: ['Durchlauf', 'n', 'rest = n mod 2', 'ergebnis'], zeilen: [['Start', '13', '–', '""'], ['1', '13', '1', '"1"'], ['2', '6', '0', '"01"'], ['3', '3', '1', '"101"'], ['4', '1', '1', '"1101"'], ['Ende', '0', '–', '"1101"']], text: 'Für <code>alsBinaer(13)</code> (nach jedem Durchlauf ist <code>n</code> bereits halbiert):' },
      erklaerung: ['Wiederholt durch 2 teilen: <code>n mod 2</code> ist die nächste Binärziffer (von rechts), <code>n / 2</code> der Rest der Zahl.', 'Die Ziffer 0 oder 1 wird mit <b>ASCII</b> zum Zeichen: <code>zeichenZu(48 + rest)</code> (48 ist „0“, 49 ist „1“).', 'Neue Ziffern kommen <b>vorn</b> an die Zeichenkette (<code>ziffer + ergebnis</code>), weil die erste berechnete Ziffer ganz rechts steht.', 'Der Sonderfall <code>n = 0</code> muss vorher abgefangen werden, sonst käme eine leere Zeichenkette heraus.']
    },
    {
      id: 'prim', typ: 'rechnen', art: 'aufgabe', titel: 'Primzahl prüfen',
      aufgabe: 'Entwickeln Sie <code>istPrim(n: Ganzzahl): Wahrheitswert</code>. Eine Primzahl ist größer als 1 und nur durch 1 und sich selbst teilbar. Teilbarkeit prüfen Sie mit <code>mod</code>.',
      algo: {
        name: 'istPrim', params: ['n'], body: [
          wenn('n < 2', 'n < 2', [falsch]),
          count('t', '2', 'n − 1', [wenn('n mod t = 0', 'n % t == 0', [falsch])], '2, n'),
          wahr
        ]
      },
      tests: [T('istPrim(2)', true), T('istPrim(3)', true), T('istPrim(4)', false), T('istPrim(17)', true), T('istPrim(1)', false), T('istPrim(0)', false), T('istPrim(25)', false), T('istPrim(97)', true)],
      tipp: 'Probiere alle Teiler <code>t</code> von 2 bis n − 1. Findet sich einer mit <code>n mod t = 0</code>, ist n keine Primzahl.'
    },
    {
      id: 'ggt', typ: 'rechnen', art: 'aufgabe', titel: 'Größter gemeinsamer Teiler',
      aufgabe: 'Entwickeln Sie <code>ggT(a, b: Ganzzahl): Ganzzahl</code> nach dem Verfahren von Euklid: Solange <code>b</code> nicht 0 ist, wird <code>a</code> durch <code>b</code> ersetzt und <code>b</code> durch den Rest <code>a mod b</code>. Das Ergebnis ist am Ende <code>a</code>.',
      algo: {
        name: 'ggT', params: ['a', 'b'], body: [
          solange('b ≠ 0', 'b != 0', [d('r ← a mod b', 'r = a % b'), d('a ← b', 'a = b'), d('b ← r', 'b = r')]),
          ret('a')
        ]
      },
      tests: [T('ggT(48, 18)', 6), T('ggT(17, 5)', 1), T('ggT(100, 25)', 25), T('ggT(7, 0)', 7), T('ggT(12, 12)', 12)],
      tipp: 'Wichtig: <code>r</code> erst berechnen, dann <code>a</code> und <code>b</code> umsetzen. Sonst überschreibst du Werte, die du noch brauchst.'
    },

    // ======================================================== STATISCHE REIHUNG
    {
      id: 'summe', typ: 'static', art: 'beispiel', titel: 'Summe mit for-each',
      aufgabe: 'Entwickeln Sie <code>summe(a: statische Reihung vom Inhaltstyp Ganzzahl): Ganzzahl</code>.',
      algo: { name: 'summe', params: ['a'], body: [d('summe ← 0', 'summe = 0'), each('x', 'a', [d('summe ← summe + x', 'summe = summe + x')]), ret('summe')] },
      tests: [T('summe([3, 5, 2])', 10), T('summe([])', 0), T('summe([-4, 4])', 0), T('summe([7])', 7)],
      erklaerung: ['<b>for-each</b> (<code>für jedes x in a</code>) geht alle Elemente der Reihe nach durch. Den Index braucht man hier nicht.', 'Eine statische Reihung ist iterierbar (Beipackzettel Abschnitt 3): So geht for-each direkt.', 'Startwert der Summe ist 0, bei der leeren Reihung kommt 0 heraus.']
    },
    {
      id: 'posmax', typ: 'static', art: 'beispiel', titel: 'Position des Maximums',
      aufgabe: 'Entwickeln Sie <code>positionMaximum(a: statische Reihung vom Inhaltstyp Ganzzahl): Ganzzahl</code>. Die Reihung ist nicht leer. Gesucht ist die Position des <b>ersten</b> größten Elements.',
      algo: {
        name: 'positionMaximum', params: ['a'], body: [
          d('pos ← 0', 'pos = 0'),
          count('i', '1', 'länge(a) − 1', [wenn('a[i] > a[pos]', 'a[i] > a[pos]', [d('pos ← i', 'pos = i')])], '1, len(a)'),
          ret('pos')
        ]
      },
      tests: [T('positionMaximum([4, 9, 2, 9, 5])', 1), T('positionMaximum([7])', 0), T('positionMaximum([-3, -1, -2])', 1), T('positionMaximum([1, 2, 3])', 2)],
      ablauf: { kopf: ['i', 'a[i]', 'a[i] > a[pos]?', 'pos'], zeilen: [['Start', '–', '–', '0'], ['1', '9', 'ja (9 > 4)', '1'], ['2', '2', 'nein', '1'], ['3', '9', 'nein (9 > 9 ist falsch)', '1'], ['4', '5', 'nein', '1']], text: 'Für <code>a = [4, 9, 2, 9, 5]</code>:' },
      erklaerung: ['Gespeichert wird die <b>Position</b>, nicht der Wert: Der Wert ist immer <code>a[pos]</code>.', 'Startwert ist Position 0 (das erste Element), darum beginnt die Schleife bei 1.', 'Wegen <code>&gt;</code> (nicht <code>≥</code>) bleibt bei zwei gleichen Maxima das erste.']
    },
    {
      id: 'diagonale', typ: 'static', art: 'beispiel', titel: 'Zweidimensional: Diagonale',
      aufgabe: 'Entwickeln Sie <code>diagonalsumme(t: zweidimensionale statische Reihung vom Inhaltstyp Ganzzahl): Ganzzahl</code>. <code>t</code> ist quadratisch (gleich viele Zeilen und Spalten). Summiert wird die Diagonale von links oben nach rechts unten.',
      algo: {
        name: 'diagonalsumme', params: ['t'], body: [
          d('n ← Anzahl der Zeilen von t', 'n = len(t)'),
          d('summe ← 0', 'summe = 0'),
          count('i', '0', 'n − 1', [d('summe ← summe + t[i][i]', 'summe = summe + t[i][i]')], 'n'),
          ret('summe')
        ]
      },
      tests: [T('diagonalsumme([[3, 5, 2], [4, 1, 6], [7, 0, 8]])', 12), T('diagonalsumme([[5]])', 5), T('diagonalsumme([[1, 2], [3, 4]])', 5)],
      erklaerung: ['Bei zwei Dimensionen steht <b>[Zeile][Spalte]</b>. <code>t[i][i]</code> ist Zeile i, Spalte i, also die Diagonale.', 'Die <b>Größe wird ausgelesen</b> (Beipackzettel Abschnitt 3): Anzahl der Zeilen <code>len(t)</code>, Anzahl der Spalten <code>len(t[0])</code>.', 'Für die andere Diagonale würde man <code>t[i][n − 1 − i]</code> nehmen.']
    },
    {
      id: 'spiegeln', typ: 'static', art: 'aufgabe', titel: 'Reihung spiegeln',
      aufgabe: 'Entwickeln Sie <code>spiegeln(a: statische Reihung vom Inhaltstyp Ganzzahl)</code>: Die Elemente werden <b>in derselben Reihung</b> in umgekehrte Reihenfolge gebracht (es wird nur getauscht) und die Reihung wird zurückgegeben. Tauschen Sie mit einer Hilfsvariablen.',
      algo: {
        name: 'spiegeln', params: ['a'], body: [
          count('i', '0', 'länge(a) / 2 − 1', [
            d('h ← a[i]', 'h = a[i]'),
            d('a[i] ← a[länge(a) − 1 − i]', 'a[i] = a[len(a) - 1 - i]'),
            d('a[länge(a) − 1 − i] ← h', 'a[len(a) - 1 - i] = h')
          ], 'len(a) // 2'),
          ret('a')
        ]
      },
      tests: [T('spiegeln([1, 2, 3, 4])', [4, 3, 2, 1]), T('spiegeln([1, 2, 3])', [3, 2, 1]), T('spiegeln([])', []), T('spiegeln([5])', [5])],
      tipp: 'Nur die <b>halbe</b> Reihung durchlaufen (<code>länge / 2</code>, ganzzahlig): Tauscht man alle, wird alles doppelt getauscht und ist wieder wie vorher.'
    },
    {
      id: 'sortiert', typ: 'static', art: 'aufgabe', titel: 'Ist die Reihung sortiert?',
      aufgabe: 'Entwickeln Sie <code>istSortiert(a: statische Reihung vom Inhaltstyp Ganzzahl): Wahrheitswert</code>: wahr, wenn die Zahlen aufsteigend (gleiche Nachbarn erlaubt) angeordnet sind.',
      algo: {
        name: 'istSortiert', params: ['a'], body: [
          count('i', '0', 'länge(a) − 2', [wenn('a[i] > a[i + 1]', 'a[i] > a[i + 1]', [falsch])], 'len(a) - 1'),
          wahr
        ]
      },
      tests: [T('istSortiert([1, 2, 2, 5])', true), T('istSortiert([3, 1, 2])', false), T('istSortiert([])', true), T('istSortiert([4])', true), T('istSortiert([1, 3, 2])', false)],
      tipp: 'Vergleiche jedes Element mit seinem Nachfolger. Die letzte Position, bei der es einen Nachfolger gibt, ist <code>länge − 2</code>.'
    },
    {
      id: 'allefelder', typ: 'static', art: 'aufgabe', titel: 'Summe aller Felder einer Tabelle',
      aufgabe: 'Entwickeln Sie <code>summeAllerFelder(t: zweidimensionale statische Reihung vom Inhaltstyp Ganzzahl): Ganzzahl</code> mit zwei geschachtelten for-each-Schleifen (erst über die Zeilen, dann über die Elemente einer Zeile).',
      algo: {
        name: 'summeAllerFelder', params: ['t'], body: [
          d('summe ← 0', 'summe = 0'),
          each('zeile', 't', [each('x', 'zeile', [d('summe ← summe + x', 'summe = summe + x')])]),
          ret('summe')
        ]
      },
      tests: [T('summeAllerFelder([[1, 2], [3, 4]])', 10), T('summeAllerFelder([[3, 5, 2], [4, 1, 6]])', 21), T('summeAllerFelder([[0]])', 0)],
      tipp: 'Eine zweidimensionale Reihung ist eine Reihung von Zeilen. Jede Zeile ist selbst eine Reihung.'
    },

    // ======================================================== DYNAMISCHE REIHUNG
    {
      id: 'negative', typ: 'dyn', art: 'beispiel', titel: 'Negative Zahlen löschen',
      aufgabe: 'Entwickeln Sie <code>entferneNegative(d: dynamische Reihung vom Inhaltstyp Ganzzahl)</code>: Alle negativen Zahlen werden aus <code>d</code> gelöscht.',
      algo: {
        name: 'entferneNegative', params: ['d'], body: [
          d('i ← d.getLength() − 1', 'i = len(d) - 1'),
          solange('i ≥ 0', 'i >= 0', [wenn('d.getItem(i) < 0', 'd[i] < 0', [d('d.delete(i)', 'del d[i]')]), d('i ← i − 1', 'i = i - 1')]),
          ret('d')
        ]
      },
      tests: [T('entferneNegative([4, -2, -5, 7])', [4, 7]), T('entferneNegative([-1, -2, -3])', []), T('entferneNegative([])', []), T('entferneNegative([1, 2, 3])', [1, 2, 3]), T('entferneNegative([-3, 5, -1, 6, -8])', [5, 6])],
      ablauf: { kopf: ['i', 'd.getItem(i)', 'negativ?', 'd danach'], zeilen: [['3', '7', 'nein', '[4, −2, −5, 7]'], ['2', '−5', 'ja → delete(2)', '[4, −2, 7]'], ['1', '−2', 'ja → delete(1)', '[4, 7]'], ['0', '4', 'nein', '[4, 7]']], text: 'Für <code>d = [4, −2, −5, 7]</code>:' },
      erklaerung: ['<b>delete(i)</b> lässt alle folgenden Elemente nach vorn rücken. Von vorn nach hinten würde man das nachrückende Element überspringen.', 'Darum läuft <code>i</code> <b>rückwärts</b> von <code>getLength() − 1</code> bis 0. Dort ist <code>i</code> immer eine gültige Position, es gibt keinen Laufzeitfehler.', 'Python: <code>del d[i]</code> entspricht <code>delete(i)</code>.']
    },
    {
      id: 'sortiertein', typ: 'dyn', art: 'beispiel', titel: 'Sortiert einfügen (insertAt)',
      aufgabe: 'Entwickeln Sie <code>fuegeSortiertEin(d: dynamische Reihung vom Inhaltstyp Ganzzahl, x: Ganzzahl)</code>. Die Reihung <code>d</code> ist aufsteigend sortiert. <code>x</code> soll so eingefügt werden, dass sie sortiert bleibt.',
      algo: {
        name: 'fuegeSortiertEin', params: ['d', 'x'], body: [
          d('i ← 0', 'i = 0'),
          solange('i < d.getLength() UND d.getItem(i) < x', 'i < len(d) and d[i] < x', [d('i ← i + 1', 'i = i + 1')]),
          d('d.insertAt(i, x)', 'd.insert(i, x)'),
          ret('d')
        ]
      },
      tests: [T('fuegeSortiertEin([1, 3, 5], 4)', [1, 3, 4, 5]), T('fuegeSortiertEin([], 7)', [7]), T('fuegeSortiertEin([1, 2], 9)', [1, 2, 9]), T('fuegeSortiertEin([5, 6], 1)', [1, 5, 6])],
      ablauf: { kopf: ['i', 'i &lt; getLength()?', 'getItem(i) &lt; 4?', 'Aktion'], zeilen: [['0', 'ja (0 &lt; 3)', 'ja (1 &lt; 4)', 'i ← 1'], ['1', 'ja', 'ja (3 &lt; 4)', 'i ← 2'], ['2', 'ja', 'nein (5 &lt; 4 ist falsch)', 'Schleife endet'], ['–', '–', '–', 'insertAt(2, 4): [1, 3, 4, 5]']], text: 'Für <code>d = [1, 3, 5]</code>, <code>x = 4</code>:' },
      erklaerung: ['Gesucht wird die erste Position, an der das Element <b>nicht kleiner</b> als <code>x</code> ist. Dort wird mit <code>insertAt</code> eingefügt, der Rest rückt nach hinten.', '<b>Reihenfolge der Bedingung:</b> <code>i &lt; getLength()</code> steht <b>zuerst</b>. Wäre <code>getItem(i)</code> zuerst, gäbe es bei <code>i = getLength()</code> einen Laufzeitfehler.', 'Ist <code>x</code> größer als alle, endet <code>i</code> bei <code>getLength()</code>: <code>insertAt</code> darf genau dort einfügen (hinten anfügen). Auch die leere Reihung klappt.']
    },
    {
      id: 'doppelte', typ: 'dyn', art: 'aufgabe', titel: 'Doppelte entfernen',
      aufgabe: 'Entwickeln Sie <code>ohneDoppelte(d: dynamische Reihung vom Inhaltstyp Ganzzahl): dynamische Reihung vom Inhaltstyp Ganzzahl</code>. Zurückgegeben wird eine <b>neue</b> Reihung, die jede Zahl nur beim ersten Vorkommen enthält (Reihenfolge bleibt). <code>d</code> bleibt unverändert.',
      algo: {
        name: 'ohneDoppelte', params: ['d'], body: [
          d('ergebnis ← DynArray()', 'ergebnis = []'),
          each('x', 'd', [
            d('gefunden ← falsch', 'gefunden = False'),
            each('y', 'ergebnis', [wenn('x = y', 'x == y', [d('gefunden ← wahr', 'gefunden = True')])]),
            wenn('nicht gefunden', 'not gefunden', [d('ergebnis.append(x)')])
          ]),
          ret('ergebnis')
        ]
      },
      tests: [T('ohneDoppelte([3, 1, 3, 2, 1])', [3, 1, 2]), T('ohneDoppelte([])', []), T('ohneDoppelte([5, 5, 5])', [5]), T('ohneDoppelte([1, 2, 3])', [1, 2, 3])],
      tipp: 'Für jedes <code>x</code> in <code>d</code> in der Ergebnisreihung suchen. Nur wenn es dort noch nicht steht: <code>append</code>.'
    },
    {
      id: 'ersteansende', typ: 'dyn', art: 'aufgabe', titel: 'Erstes Element ans Ende',
      aufgabe: 'Entwickeln Sie <code>ersteAnsEnde(d: dynamische Reihung vom Inhaltstyp Ganzzahl)</code>: Das erste Element wird entfernt und hinten wieder angefügt. Ist die Reihung leer, passiert nichts. Geben Sie <code>d</code> zurück.',
      algo: {
        name: 'ersteAnsEnde', params: ['d'], body: [
          wenn('nicht d.isEmpty()', 'len(d) != 0', [d('x ← d.getItem(0)', 'x = d[0]'), d('d.delete(0)', 'del d[0]'), d('d.append(x)')]),
          ret('d')
        ]
      },
      tests: [T('ersteAnsEnde([1, 2, 3])', [2, 3, 1]), T('ersteAnsEnde([])', []), T('ersteAnsEnde([9])', [9]), T('ersteAnsEnde([4, 4, 5])', [4, 5, 4])],
      tipp: 'Auf einer leeren Reihung ist <code>getItem(0)</code> ein Laufzeitfehler: Mit <code>isEmpty()</code> vorher absichern. Merke dir das Element, bevor du es löschst.'
    },

    // ======================================================== STAPEL
    {
      id: 'stapelumkehren', typ: 'stack', art: 'beispiel', titel: 'Reihung mit einem Stapel umkehren',
      aufgabe: 'Entwickeln Sie <code>umkehren(d: dynamische Reihung vom Inhaltstyp Ganzzahl): dynamische Reihung vom Inhaltstyp Ganzzahl</code> mit Hilfe eines Stapels. Zurückgegeben wird eine neue Reihung in umgekehrter Reihenfolge.',
      algo: {
        name: 'umkehren', params: ['d'], body: [
          d('s ← Stack()', 's = []'),
          each('x', 'd', [d('s.push(x)', 's.append(x)')]),
          d('ergebnis ← DynArray()', 'ergebnis = []'),
          solange('nicht s.isEmpty()', 'len(s) != 0', [d('ergebnis.append(s.pop())')]),
          ret('ergebnis')
        ]
      },
      tests: [T('umkehren([1, 2, 3])', [3, 2, 1]), T('umkehren([])', []), T('umkehren([7])', [7]), T('umkehren([4, 8, 8, 1])', [1, 8, 8, 4])],
      ablauf: { kopf: ['Schritt', 'Befehl', 'Stapel (unten → oben)', 'ergebnis'], zeilen: [['1', 'push(1)', '1', '[]'], ['2', 'push(2)', '1 2', '[]'], ['3', 'push(3)', '1 2 3', '[]'], ['4', 'append(pop()) → 3', '1 2', '[3]'], ['5', 'append(pop()) → 2', '1', '[3, 2]'], ['6', 'append(pop()) → 1', 'leer', '[3, 2, 1]']], text: 'Für <code>d = [1, 2, 3]</code>:' },
      erklaerung: ['Der Stapel dreht die Reihenfolge um: Was zuerst hineinkommt, kommt zuletzt heraus (<b>LIFO</b>).', '<code>solange nicht s.isEmpty()</code> sichert <code>pop()</code> ab: Es wird nur entnommen, solange noch etwas da ist (kein Laufzeitfehler).', '<code>s.pop()</code> <b>gibt das Element zurück</b>, deshalb kann man es direkt in <code>append(…)</code> schreiben.']
    },
    {
      id: 'klammern', typ: 'stack', art: 'beispiel', titel: 'Klammern prüfen',
      aufgabe: 'Entwickeln Sie <code>klammernOk(text: Zeichenkette): Wahrheitswert</code>: wahr, wenn alle Klammern <code>()</code>, <code>[]</code>, <code>{}</code> richtig geöffnet und geschlossen werden. Andere Zeichen werden ignoriert.',
      algo: 'klammernOk',
      tests: [T('klammernOk("([x])")', true), T('klammernOk("([x])]")', false), T('klammernOk("((")', false), T('klammernOk(")(")', false), T('klammernOk("")', true), T('klammernOk("{[()]}")', true), T('klammernOk("(]")', false)],
      ablauf: { kopf: ['Zeichen', 'Befehl', 'Stapel'], zeilen: [['(', 'push', '('], ['[', 'push', '( ['], ['x', 'ignoriert', '( ['], [']', 'pop → [ passt', '('], [')', 'pop → ( passt', 'leer'], [']', 'isEmpty() ist wahr → falsch', '–']], text: 'Für <code>"([x])]"</code>:' },
      erklaerung: ['<b>Öffnende</b> Klammern kommen mit <code>push</code> auf den Stapel, <b>schließende</b> holen mit <code>pop</code> die zuletzt geöffnete.', '<b>Absicherung:</b> Vor dem <code>pop</code> wird mit <code>isEmpty()</code> geprüft. Eine schließende Klammer ohne öffnende ist „falsch“ und kein Laufzeitfehler.', 'Am Ende muss der Stapel <b>leer</b> sein (<code>gib s.isEmpty() zurück</code>), sonst wurde eine Klammer nie geschlossen.']
    },
    {
      id: 'tauscheoberste', typ: 'stack', art: 'aufgabe', titel: 'Die obersten zwei Elemente tauschen',
      aufgabe: 'Entwickeln Sie <code>tauscheOberste(s: Stapel vom Inhaltstyp Ganzzahl): Stapel vom Inhaltstyp Ganzzahl</code>: Die beiden obersten Elemente tauschen ihre Plätze. Hat der Stapel weniger als zwei Elemente, bleibt er unverändert. Sichern Sie jedes <code>pop</code> ab.',
      algo: {
        name: 'tauscheOberste', params: ['s'], body: [
          wenn('nicht s.isEmpty()', 'len(s) != 0', [
            d('a ← s.pop()', 'a = s.pop()'),
            wenn('nicht s.isEmpty()', 'len(s) != 0', [d('b ← s.pop()', 'b = s.pop()'), d('s.push(a)', 's.append(a)'), d('s.push(b)', 's.append(b)')], [d('s.push(a)', 's.append(a)')])
          ]),
          ret('s')
        ]
      },
      tests: [T('tauscheOberste([1, 2, 3])', [1, 3, 2]), T('tauscheOberste([5])', [5]), T('tauscheOberste([])', []), T('tauscheOberste([7, 8])', [8, 7])],
      tipp: 'Beide Elemente entnehmen und in <b>umgekehrter Reihenfolge</b> wieder auflegen: zuerst das zuerst entnommene (<code>a</code>), dann <code>b</code>. Hat der Stapel nur ein Element, muss <code>a</code> wieder zurück.'
    },
    {
      id: 'textstapel', typ: 'stack', art: 'aufgabe', titel: 'Text mit einem Stapel umdrehen',
      aufgabe: 'Entwickeln Sie <code>rueckwaerts(text: Zeichenkette): Zeichenkette</code> mit einem Stapel: Alle Zeichen werden nacheinander auf den Stapel gelegt und dann wieder abgeholt und zu einer neuen Zeichenkette verbunden.',
      algo: {
        name: 'rueckwaerts', params: ['text'], body: [
          d('s ← Stack()', 's = []'),
          count('i', '0', 'länge(text) − 1', [d('s.push(zeichen(text, i))', 's.append(text[i])')], 'len(text)'),
          d('ergebnis ← ""', 'ergebnis = ""'),
          solange('nicht s.isEmpty()', 'len(s) != 0', [d('ergebnis ← ergebnis + s.pop()', 'ergebnis = ergebnis + s.pop()')]),
          ret('ergebnis')
        ]
      },
      tests: [T('rueckwaerts("Abc")', 'cbA'), T('rueckwaerts("")', ''), T('rueckwaerts("otto")', 'otto'), T('rueckwaerts("Info 1")', '1 ofnI')],
      tipp: 'Erst alle Zeichen mit <code>push</code>, dann <code>solange nicht isEmpty</code> mit <code>pop</code> und Verbinden.'
    },
    {
      id: 'stapelsumme', typ: 'stack', art: 'aufgabe', titel: 'Stapel aufsummieren',
      aufgabe: 'Entwickeln Sie <code>summeStapel(s: Stapel vom Inhaltstyp Ganzzahl): Ganzzahl</code>: Alle Elemente werden entnommen und addiert. Danach ist der Stapel leer.',
      algo: {
        name: 'summeStapel', params: ['s'], body: [
          d('summe ← 0', 'summe = 0'),
          solange('nicht s.isEmpty()', 'len(s) != 0', [d('summe ← summe + s.pop()', 'summe = summe + s.pop()')]),
          ret('summe')
        ]
      },
      tests: [T('summeStapel([4, 5, 6])', 15), T('summeStapel([])', 0), T('summeStapel([-2, 2])', 0), T('summeStapel([9])', 9)],
      tipp: 'Ein Stapel kennt keine Länge und keinen Index. Man kommt nur mit <code>pop</code> an die Elemente und prüft mit <code>isEmpty</code>, ob noch welche da sind.'
    },

    // ======================================================== SCHLANGE
    {
      id: 'drehe', typ: 'queue', art: 'beispiel', titel: 'Schlange drehen',
      aufgabe: 'Entwickeln Sie <code>dreheUm(q: Schlange vom Inhaltstyp Ganzzahl, k: Ganzzahl): Schlange vom Inhaltstyp Ganzzahl</code>: Die vordersten <code>k</code> Elemente werden entnommen und hinten wieder angehängt (in derselben Reihenfolge). Ist die Schlange leer, passiert nichts.',
      algo: {
        name: 'dreheUm', params: ['q', 'k'], body: [
          count('i', '1', 'k', [wenn('nicht q.isEmpty()', 'len(q) != 0', [d('q.enqueue(q.dequeue())', 'q.append(q.pop(0))')])], 'k'),
          ret('q')
        ]
      },
      tests: [T('dreheUm([1, 2, 3, 4], 1)', [2, 3, 4, 1]), T('dreheUm([1, 2, 3], 3)', [1, 2, 3]), T('dreheUm([], 2)', []), T('dreheUm([1, 2, 3, 4], 2)', [3, 4, 1, 2])],
      ablauf: { kopf: ['i', 'dequeue() liefert', 'enqueue', 'Schlange (vorn → hinten)'], zeilen: [['Start', '–', '–', '1 2 3 4'], ['1', '1', '1 hinten', '2 3 4 1'], ['2', '2', '2 hinten', '3 4 1 2']], text: 'Für <code>q = [1, 2, 3, 4]</code>, <code>k = 2</code>:' },
      erklaerung: ['<code>q.enqueue(q.dequeue())</code>: Das vorderste Element wird entnommen (<code>dequeue</code> <b>gibt es zurück</b>) und sofort hinten angestellt.', 'Die Absicherung <code>nicht q.isEmpty()</code> verhindert den Laufzeitfehler bei leerer Schlange.', 'Nach <code>k</code> Wiederholungen ist die Reihenfolge um <code>k</code> Plätze „gedreht“.']
    },
    {
      id: 'mischen', typ: 'queue', art: 'beispiel', titel: 'Zwei Schlangen mischen',
      aufgabe: 'Entwickeln Sie <code>mischen(q1, q2: Schlange vom Inhaltstyp Ganzzahl): Schlange vom Inhaltstyp Ganzzahl</code>. Die neue Schlange enthält abwechselnd ein Element aus <code>q1</code> und eines aus <code>q2</code>. Ist eine Schlange früher leer, werden die übrigen Elemente der anderen angehängt.',
      algo: {
        name: 'mischen', params: ['q1', 'q2'], body: [
          d('ergebnis ← Queue()', 'ergebnis = []'),
          solange('nicht q1.isEmpty() ODER nicht q2.isEmpty()', 'len(q1) != 0 or len(q2) != 0', [
            wenn('nicht q1.isEmpty()', 'len(q1) != 0', [d('ergebnis.enqueue(q1.dequeue())', 'ergebnis.append(q1.pop(0))')]),
            wenn('nicht q2.isEmpty()', 'len(q2) != 0', [d('ergebnis.enqueue(q2.dequeue())', 'ergebnis.append(q2.pop(0))')])
          ]),
          ret('ergebnis')
        ]
      },
      tests: [T('mischen([1, 2, 3], [7, 8])', [1, 7, 2, 8, 3]), T('mischen([], [4])', [4]), T('mischen([5], [])', [5]), T('mischen([], [])', [])],
      ablauf: { kopf: ['Durchlauf', 'q1', 'q2', 'ergebnis'], zeilen: [['Start', '1 2 3', '7 8', 'leer'], ['1', '2 3', '8', '1 7'], ['2', '3', 'leer', '1 7 2 8'], ['3', 'leer', 'leer', '1 7 2 8 3']], text: 'Für <code>q1 = [1, 2, 3]</code>, <code>q2 = [7, 8]</code>:' },
      erklaerung: ['Jede <b>dequeue</b>-Entnahme ist einzeln mit <code>isEmpty()</code> abgesichert, weil eine der beiden Schlangen früher leer sein kann.', 'Die Schleife läuft, solange <b>mindestens eine</b> Schlange noch Elemente hat (ODER).', 'Neue Elemente kommen mit <code>enqueue</code> <b>hinten</b> an die Ergebnisschlange: So bleibt die Reihenfolge erhalten (<b>FIFO</b>).']
    },
    {
      id: 'zaehleschlange', typ: 'queue', art: 'aufgabe', titel: 'Wartende zählen',
      aufgabe: 'Entwickeln Sie <code>anzahlWartende(q: Schlange vom Inhaltstyp Ganzzahl): Ganzzahl</code>. Auf einer Schlange gibt es keinen Befehl für die Länge: Zählen Sie, indem Sie alle Elemente entnehmen. Danach ist die Schlange leer.',
      algo: {
        name: 'anzahlWartende', params: ['q'], body: [
          d('anzahl ← 0', 'anzahl = 0'),
          solange('nicht q.isEmpty()', 'len(q) != 0', [d('q.dequeue()', 'q.pop(0)'), d('anzahl ← anzahl + 1', 'anzahl = anzahl + 1')]),
          ret('anzahl')
        ]
      },
      tests: [T('anzahlWartende([4, 8, 15])', 3), T('anzahlWartende([])', 0), T('anzahlWartende([1])', 1)],
      tipp: '<code>dequeue()</code> darf man auch aufrufen, ohne den Rückgabewert zu benutzen. Wichtig ist die Absicherung mit <code>isEmpty()</code>.'
    },
    {
      id: 'wartezeit', typ: 'queue', art: 'aufgabe', titel: 'Wie viele stehen vor mir?',
      aufgabe: 'Entwickeln Sie <code>wartezeit(q: Schlange vom Inhaltstyp Ganzzahl, nummer: Ganzzahl): Ganzzahl</code>: Es wird zurückgegeben, wie viele Elemente <b>vor</b> der Nummer <code>nummer</code> stehen. Kommt die Nummer nicht vor, wird −1 zurückgegeben.',
      algo: {
        name: 'wartezeit', params: ['q', 'nummer'], body: [
          d('pos ← 0', 'pos = 0'),
          solange('nicht q.isEmpty()', 'len(q) != 0', [
            wenn('q.dequeue() = nummer', 'q.pop(0) == nummer', [ret('pos')]),
            d('pos ← pos + 1', 'pos = pos + 1')
          ]),
          ret('−1', '-1')
        ]
      },
      tests: [T('wartezeit([5, 8, 3], 3)', 2), T('wartezeit([5], 9)', -1), T('wartezeit([7, 7, 2], 7)', 0), T('wartezeit([], 1)', -1)],
      tipp: 'Entnimm nacheinander das vorderste Element und zähle mit. Beim Treffer ist die Zahl der vorher entnommenen Elemente die gesuchte Antwort.'
    },

    // ======================================================== STAPEL + SCHLANGE
    {
      id: 'palistack', typ: 'kombi', art: 'beispiel', titel: 'Palindrom mit Stapel und Schlange',
      aufgabe: 'Entwickeln Sie <code>istPalindrom(text: Zeichenkette): Wahrheitswert</code> mit <b>einem Stapel und einer Schlange</b>: Jedes Zeichen kommt auf den Stapel und in die Schlange. Danach werden beide Zeichen für Zeichen entnommen und verglichen.',
      algo: {
        name: 'istPalindromSQ', params: ['text'], body: [
          d('s ← Stack()', 's = []'),
          d('q ← Queue()', 'q = []'),
          count('i', '0', 'länge(text) − 1', [d('s.push(zeichen(text, i))', 's.append(text[i])'), d('q.enqueue(zeichen(text, i))', 'q.append(text[i])')], 'len(text)'),
          solange('nicht s.isEmpty()', 'len(s) != 0', [wenn('s.pop() ≠ q.dequeue()', 's.pop() != q.pop(0)', [falsch])]),
          wahr
        ]
      },
      tests: [T('istPalindromSQ("otto")', true), T('istPalindromSQ("anna")', true), T('istPalindromSQ("abc")', false), T('istPalindromSQ("")', true), T('istPalindromSQ("abca")', false)],
      erklaerung: ['Der <b>Stapel</b> liefert die Zeichen <b>rückwärts</b> (zuletzt hinein, zuerst heraus), die <b>Schlange</b> <b>vorwärts</b> (zuerst hinein, zuerst heraus).', 'Sind beide Folgen Zeichen für Zeichen gleich, ist das Wort ein Palindrom.', 'Stapel und Schlange sind <b>gleich lang</b>, deshalb genügt die Abfrage <code>s.isEmpty()</code> in der Schleife: Auch <code>q.dequeue()</code> ist damit abgesichert.']
    }
  ];

  // klammernOk-Baum liegt in informatik-algos.js
  EX.forEach(e => { if (typeof e.algo === 'string') e.algo = (window.INF_A || {})[e.algo]; });
  EX.forEach(e => { e.pyText = LA.pyText(e.algo); });

  const fmt = v => (typeof v === 'string' ? `"${v}"` : typeof v === 'boolean' ? (v ? 'wahr' : 'falsch') : Array.isArray(v) ? '[' + v.map(fmt).join(', ') + ']' : String(v));
  EX.forEach(e => { e.probe = e.tests.map(t => [t.call, fmt(t.erwartet)]); });

  window.INF_BEISPIELE = { typen: TYPEN, beispiele: EX, fmt };

  // ======================================================================
  // Aufgaben (art 'aufgabe') → LR_TASKS und Python-Werkstatt LR_PY
  // ======================================================================
  const lessonOf = typ => TYPEN.find(t => t.id === typ).lesson;
  const BEFEHLE_HINT = `<p class="dim" style="font-size:14px">Es gelten nur die Befehle des <a class="link" href="#/befehle">Beipackzettels</a>. Laufzeitfehler (leerer Stapel, falsche Position) müssen durch Abfragen ausgeschlossen werden. Das Struktogramm benutzt die Schreibweise des Beipackzettels, die Implementierung ist Python.</p>`;
  const tasks = [], py = [];
  EX.filter(e => e.art === 'aufgabe').forEach(e => {
    const id = 'IX-' + e.id;
    const sig = e.algo.name + '(' + e.algo.params.join(', ') + ')';
    tasks.push({
      id, fach: F, teil: 'B', lesson: lessonOf(e.typ), title: e.titel, afb: 'II', ops: 'Angeben, Entwickeln, Implementieren',
      intro: `${BEFEHLE_HINT}${e.aufgabe}`,
      parts: [
        { id: id + 'a', label: 'a)', be: 3, text: `Geben Sie die Rückgabe für diese Aufrufe an (verfolgen Sie den Ablauf auf Papier):${list(e.tests.slice(0, 3).map(t => `<code>${esc(t.call)}</code>`))}`,
          hints: [e.tipp || 'Schreibe nach jedem Schritt die Werte der Variablen auf.'],
          sol: `<table class="ic-tab"><thead><tr><th>Aufruf</th><th>Rückgabe</th></tr></thead><tbody>${e.probe.slice(0, 3).map(r => `<tr><td><code>${esc(r[0])}</code></td><td><b>${esc(r[1])}</b></td></tr>`).join('')}</tbody></table>` },
        { id: id + 'b', label: 'b)', be: 6, text: `Entwickeln Sie ein Struktogramm für <code>${esc(sig)}</code>.`,
          hints: [e.tipp || 'Startwerte, Schleife, Verzweigung, Rückgabe.'],
          sol: LA.nsHtml(e.algo) + (e.tipp ? `<p>${e.tipp}</p>` : '') + list(['Startwerte und Schleife passend zum Datentyp (2 BE)', 'Verzweigung oder Schleifenkörper mit den Befehlen des Beipackzettels (2 BE)', 'Absicherung gegen Laufzeitfehler / Sonderfälle (1 BE)', 'Rückgabe (1 BE)']) },
        { id: id + 'c', label: 'c)', be: 4, text: 'Implementieren Sie die Operation in Python.',
          sol: code(e.pyText) + list(['Schleifen/Bedingungen richtig übertragen (2 BE)', 'Befehle des Beipackzettels in Python-Syntax (1 BE)', 'Rückgabe (1 BE)']) }
      ]
    });
    const startArgs = e.algo.params.join(', ');
    py.push({
      id: 'py-' + e.id, fach: F, titel: e.titel + ' (Beipackzettel)', kurz: TYPEN.find(t => t.id === e.typ).titel + ': nur erlaubte Befehle.',
      text: `${e.aufgabe} Python-Funktion <code>${esc(e.algo.name)}(${esc(startArgs)})</code>. Benutze nur die Befehle des Beipackzettels in Python-Schreibweise.`,
      start: `def ${e.algo.name}(${startArgs}):\n    # Dein Code hier\n    pass\n\n\nprint(${e.tests[0].call})\n`,
      tests: e.tests.map(t => ({ call: t.call, erwartet: t.erwartet })),
      hinweis: (e.tipp || '').replace(/<[^>]+>/g, ''),
      loesung: e.pyText + '\n'
    });
  });
  window.LR_TASKS = (window.LR_TASKS || []).concat(tasks);
  window.LR_PY = (window.LR_PY || []).concat(py);
})();
