/* ==========================================================================
   INFORMATIK · Algorithmen (Struktogramm · Pseudocode · Python) und Python-Werkstatt-Aufgaben
   - window.INF_A:   Algorithmus-Bäume (LRAlgo.A), auch für Lösungen in content/informatik-aufgaben.js
   - window.LR_ALGOS: Notation-Seiten (#/algo/<id>) mit Verständnisfragen und Ablauf-Tabelle
   - window.LR_PY:    Aufgaben der Python-Werkstatt (#/python/<id>), Musterlösung besteht alle Tests
   Eigene Beispiele zu den Themen aus IServ „Abi28 IF13 EA“ (Sortieren, Rekursion, Stapel, Schlange, Listen).
   Geprüft: neu/tests/python.test.js (Aufgaben), neu/tests/informatik_check.py (Algorithmen + Zahlen).
   UNSICHER: Pseudocode-Schreibweise (nicht mit der Lehrkraft abgeglichen). In `range(...)` steht Python-Syntax, weil
   die Schleifen-Bausteine (LRAlgo.A.each) Pseudocode und Python aus demselben Text erzeugen.
   ========================================================================== */
(function () {
  const A = window.LRAlgo ? window.LRAlgo.A : null;
  const INF_A = {};
  if (A) {
    // Schreibweise wie im Beipackzettel (Ergänzende Hinweise, Abschnitt 4/5): getItem/setItem/getLength, Stack/Queue-Operationen,
    // „mod“, „gib … zurück“. Die Python-Zeile steht jeweils als zweiter Text.
    const swap = (a, b) => [A.do(`h ← liste.getItem(${a})`, `h = liste[${a}]`), A.do(`liste.setItem(${a}, liste.getItem(${b}))`, `liste[${a}] = liste[${b}]`), A.do(`liste.setItem(${b}, h)`, `liste[${b}] = h`)];
    INF_A.ersteNegative = {
      name: 'ersteNegative', params: ['liste'],
      body: [
        A.do('i ← 0', 'i = 0'),
        A.while('i < liste.getLength() UND liste.getItem(i) ≥ 0', 'i < len(liste) and liste[i] >= 0', [A.do('i ← i + 1', 'i = i + 1')]),
        A.if('i = liste.getLength()', 'i == len(liste)', [A.ret('−1', '-1')], [A.ret('i')])
      ]
    };
    INF_A.versandkosten = {
      name: 'versandkosten', params: ['wert', 'gewicht'],
      body: [A.if('wert ≥ 100', 'wert >= 100', [A.ret('0', '0.0')], [
        A.if('gewicht ≤ 1', 'gewicht <= 1', [A.ret('4,00', '4.0')], [
          A.if('gewicht ≤ 5', 'gewicht <= 5', [A.ret('6,50', '6.5')], [A.ret('12,00', '12.0')])])])]
    };
    INF_A.selectionsort = {
      name: 'selectionsort', params: ['liste'],
      body: [
        A.count('i', '0', 'liste.getLength() − 2', [
          A.do('kleinste ← i', 'kleinste = i'),
          A.count('j', 'i + 1', 'liste.getLength() − 1', [A.if('liste.getItem(j) < liste.getItem(kleinste)', 'liste[j] < liste[kleinste]', [A.do('kleinste ← j', 'kleinste = j')])], 'i + 1, len(liste)')
        ].concat(swap('i', 'kleinste')), 'len(liste) - 1'),
        A.ret('liste')
      ]
    };
    INF_A.bubblesort = {
      name: 'bubblesort', params: ['liste'],
      body: [
        A.do('n ← liste.getLength()', 'n = len(liste)'),
        A.count('i', '0', 'n − 2', [
          A.count('j', '0', 'n − 2 − i', [
            A.if('liste.getItem(j) > liste.getItem(j + 1)', 'liste[j] > liste[j + 1]', swap('j', 'j + 1'))
          ], 'n - 1 - i')
        ], 'n - 1'),
        A.ret('liste')
      ]
    };
    INF_A.fakultaet = {
      name: 'fakultaet', params: ['n'],
      body: [A.if('n = 0', 'n == 0', [A.ret('1')], [A.ret('n · fakultaet(n − 1)', 'n * fakultaet(n - 1)')])]
    };
    INF_A.maxRek = {
      name: 'max_rek', params: ['liste', 'i'],
      body: [
        A.if('i = liste.getLength() − 1', 'i == len(liste) - 1', [A.ret('liste.getItem(i)', 'liste[i]')]),
        A.do('rest ← max_rek(liste, i + 1)', 'rest = max_rek(liste, i + 1)'),
        A.if('rest > liste.getItem(i)', 'rest > liste[i]', [A.ret('rest')], [A.ret('liste.getItem(i)', 'liste[i]')])
      ]
    };
    // Zeichenketten: nur Länge und Zeichen an Position (Beipackzettel Abschnitt 1)
    INF_A.klammernOk = {
      name: 'klammernOk', params: ['text'],
      body: [
        A.do('s ← Stack()', 's = []'),
        A.count('k', '0', 'länge(text) − 1', [
          A.do('z ← Zeichen an Position k in text', 'z = text[k]'),
          A.if('z = "(" ODER z = "[" ODER z = "{"', 'z == "(" or z == "[" or z == "{"', [A.do('s.push(z)', 's.append(z)')], [
            A.if('z = ")" ODER z = "]" ODER z = "}"', 'z == ")" or z == "]" or z == "}"', [
              A.if('s.isEmpty()', 'len(s) == 0', [A.ret('falsch', 'False')]),
              A.do('o ← s.pop()', 'o = s.pop()'),
              A.if('o und z bilden kein Klammerpaar', 'not ((o == "(" and z == ")") or (o == "[" and z == "]") or (o == "{" and z == "}"))', [A.ret('falsch', 'False')])
            ])
          ])
        ], 'len(text)'),
        A.ret('s.isEmpty()', 'len(s) == 0')
      ]
    };
    INF_A.grossbuchstaben = {
      name: 'anzahlGross', params: ['wort'],
      body: [
        A.do('anzahl ← 0', 'anzahl = 0'),
        A.count('i', '0', 'länge(wort) − 1', [
          A.do('z ← Zeichen an Position i in wort', 'z = wort[i]'),
          A.if('ascii(z) ≥ 65 UND ascii(z) ≤ 90', 'ord(z) >= 65 and ord(z) <= 90', [A.do('anzahl ← anzahl + 1', 'anzahl = anzahl + 1')])
        ], 'len(wort)'),
        A.ret('anzahl')
      ]
    };
    INF_A.anzahlGerade = {
      name: 'anzahlGerade', params: ['a'],
      body: [
        A.do('anzahl ← 0', 'anzahl = 0'),
        A.each('x', 'a', [A.if('x mod 2 = 0', 'x % 2 == 0', [A.do('anzahl ← anzahl + 1', 'anzahl = anzahl + 1')])]),
        A.ret('anzahl')
      ]
    };
    INF_A.eintragen = {
      name: 'eintragen', params: ['q', 'zeilen', 'spalten'],
      body: [
        A.do('ergebnis ← DynArray()', 'ergebnis = []'),
        A.count('z', '0', 'zeilen − 1', [
          A.do('zeile ← DynArray()', 'zeile = []'),
          A.count('s', '0', 'spalten − 1', [A.do('zeile.append(q.dequeue())', 'zeile.append(q.pop(0))')], 'spalten'),
          A.do('ergebnis.append(zeile)')
        ], 'zeilen'),
        A.ret('ergebnis')
      ]
    };
  }
  window.INF_A = INF_A;

  // ======================================================================
  // NOTATION-SEITEN (Struktogramm · Pseudocode · Python)
  // ======================================================================
  const ALGOS = A ? [
    {
      id: 'inf-bubble', fach: 'informatik', titel: 'Bubblesort', kurz: 'Nachbarn vergleichen und tauschen: Struktogramm, Pseudocode und Python.',
      quelle: 'IServ IF13, 3. Sortierverfahren (Bubblesort.py); eigene Darstellung',
      text: 'Der Algorithmus sortiert eine Liste aufsteigend. Der innere Durchlauf vergleicht Nachbarn und tauscht sie, wenn sie falsch stehen. Danach steht das größte Element ganz hinten.',
      algo: INF_A.bubblesort, beispiel: [6, 3, 8, 2],
      fragen: [
        { frage: 'Warum läuft die innere Schleife nur bis n − 2 − i?', optionen: ['Die letzten i Elemente sind schon endgültig sortiert, und liste.getItem(j + 1) darf nicht über das Ende hinausgreifen.', 'Damit das Programm schneller aussieht.', 'Weil Python bei 0 anfängt zu zählen.'], richtig: 0, erklaerung: 'Nach i Durchläufen stehen die i größten Elemente richtig hinten. Außerdem wäre bei j = n − 1 der Zugriff auf Position j + 1 ein Fehler (es gibt sie nicht).' },
        { frage: 'Wie viele Vergleiche macht der Algorithmus bei 5 Elementen (immer, auch bei sortierter Liste)?', optionen: ['10', '5', '25'], richtig: 0, erklaerung: '4 + 3 + 2 + 1 = 10 = 5·4/2. Ohne Abbruchbedingung hängt die Zahl nicht von der Anordnung ab.' },
        { frage: 'Welche Ordnung hat die Laufzeit im schlimmsten Fall?', optionen: ['O(n)', 'O(n²)', 'O(2ⁿ)'], richtig: 1, erklaerung: 'Zwei geschachtelte Schleifen über die Liste: n(n−1)/2 Vergleiche, also O(n²).' }
      ],
      ablauf: {
        frage: 'Verfolge den Algorithmus mit der Liste [6, 3, 8, 2]. Wie viele Vertauschungen gibt es im jeweiligen Durchlauf der äußeren Schleife (i = 0, 1, 2)? Und wie viele Vergleiche insgesamt?',
        checkpoints: [
          { id: 'v0', label: 'Vertauschungen i = 0', wert: 2 },
          { id: 'v1', label: 'Vertauschungen i = 1', wert: 1 },
          { id: 'v2', label: 'Vertauschungen i = 2', wert: 1 },
          { id: 'vg', label: 'Vergleiche insgesamt', wert: 6 }
        ]
      }
    },
    {
      id: 'inf-fakultaet', fach: 'informatik', titel: 'Fakultät rekursiv', kurz: 'Der Selbstaufruf als Struktogramm, Pseudocode und Python.',
      quelle: 'IServ IF13, Rekursion (Arbeitsauftrag 4); eigene Darstellung',
      text: 'Die Funktion berechnet n! = 1·2·…·n rekursiv: n! = n · (n−1)!, und 0! = 1 ist der Abbruchfall.',
      algo: INF_A.fakultaet, beispiel: [4],
      fragen: [
        { frage: 'Was ist hier die Abbruchbedingung?', optionen: ['n = 0 (Ergebnis 1)', 'n · fakultaet(n − 1)', 'n > 1'], richtig: 0, erklaerung: 'Der Fall n = 0 wird direkt gelöst, ohne Selbstaufruf. Er stoppt die Rekursion.' },
        { frage: 'Was würde bei fakultaet(−1) passieren?', optionen: ['Es gibt −1 zurück.', 'Die Rekursion hört nie auf (RecursionError).', 'Es gibt 0 zurück.'], richtig: 1, erklaerung: 'Das Argument wird immer kleiner (−2, −3, …) und erreicht nie 0. Der Aufrufstapel läuft voll.' },
        { frage: 'Wie viele Aufrufe löst fakultaet(5) insgesamt aus (der erste mitgezählt)?', optionen: ['5', '6', '120'], richtig: 1, erklaerung: 'Für n = 5, 4, 3, 2, 1, 0: das sind 6 Aufrufe.' }
      ],
      ablauf: {
        frage: 'Welchen Wert gibt der jeweilige Aufruf zurück, wenn man von fakultaet(4) ausgeht? (Von unten nach oben auswerten.)',
        checkpoints: [
          { id: 'f1', label: 'fakultaet(1) gibt zurück', wert: 1 },
          { id: 'f2', label: 'fakultaet(2) gibt zurück', wert: 2 },
          { id: 'f3', label: 'fakultaet(3) gibt zurück', wert: 6 },
          { id: 'f4', label: 'fakultaet(4) gibt zurück', wert: 24 }
        ]
      }
    },
    {
      id: 'inf-erste-negative', fach: 'informatik', titel: 'Erstes negatives Element', kurz: 'Eine while-Schleife mit zwei Bedingungen lesen und verfolgen.',
      quelle: 'Eigenes Beispiel zu Struktogramme AB0/AB1 und Listen (IServ IF13)',
      text: 'Der Algorithmus bekommt eine Liste und gibt die Position des ersten negativen Elements zurück, oder −1, wenn es keines gibt.',
      algo: INF_A.ersteNegative, beispiel: [3, 5, -2, 7],
      fragen: [
        { frage: 'Was gibt ersteNegative([4, 0, 7]) zurück?', optionen: ['−1', '1', '0'], richtig: 0, erklaerung: 'Die Null ist nicht negativ (liste.getItem(i) ≥ 0). Die Schleife läuft bis i = 3 = liste.getLength(), dann wird −1 zurückgegeben.' },
        { frage: 'Warum muss „i < liste.getLength()“ vor „liste.getItem(i) ≥ 0“ geprüft werden?', optionen: ['Sonst greift liste.getItem(i) bei i = liste.getLength() ins Leere (Laufzeitfehler).', 'Das ist nur Geschmackssache.', 'Weil UND links zuerst gerechnet werden muss, damit es schneller ist.'], richtig: 0, erklaerung: 'Python wertet „A and B“ von links aus. Ist A falsch, wird B gar nicht erst ausgewertet. So wird der Zugriff außerhalb der Liste verhindert. Der Beipackzettel verlangt genau das: Laufzeitfehler müssen durch Abfragen ausgeschlossen werden.' },
        { frage: 'Welche Rückgabe liefert ersteNegative([−1, −2])?', optionen: ['0', '1', '−1'], richtig: 0, erklaerung: 'Das erste Element ist schon negativ: Die Schleife läuft keinmal, i bleibt 0.' }
      ],
      ablauf: {
        frage: 'Verfolge den Algorithmus mit der Liste [3, 5, −2, 7]. Welchen Wert hat i nach dem jeweiligen Schritt?',
        checkpoints: [
          { id: 'i1', label: 'i nach dem 1. Durchlauf', wert: 1 },
          { id: 'i2', label: 'i nach dem 2. Durchlauf', wert: 2 },
          { id: 'ir', label: 'Rückgabewert', wert: 2 },
          { id: 'ik', label: 'Anzahl Durchläufe der Schleife', wert: 2 }
        ]
      }
    },
    {
      id: 'inf-klammern', fach: 'informatik', titel: 'Klammerprüfung mit Stapel', kurz: 'Ein Stapel merkt sich die offenen Klammern.',
      quelle: 'Eigenes Beispiel zu IServ IF13, AB2 Stapelspeicher (Anwendungen)',
      text: 'Der Algorithmus prüft, ob in einem Text jede öffnende Klammer eine passende schließende hat. Öffnende Klammern kommen auf den Stapel, schließende holen die zuletzt geöffnete wieder herunter.',
      algo: INF_A.klammernOk, beispiel: ['(', 'x', ')'],
      fragen: [
        { frage: 'Warum nimmt man einen Stapel und keine Schlange?', optionen: ['Die zuletzt geöffnete Klammer muss zuerst geschlossen werden (LIFO).', 'Ein Stapel ist schneller.', 'Mit einer Schlange geht es gar nicht.'], richtig: 0, erklaerung: 'Klammern sind ineinander geschachtelt: Die innerste (zuletzt geöffnete) wird zuerst geschlossen. Das ist genau LIFO.' },
        { frage: 'Was liefert klammernOk("((")?', optionen: ['wahr', 'falsch'], richtig: 1, erklaerung: 'Am Ende liegen noch zwei öffnende Klammern auf dem Stapel: s.isEmpty() ist falsch.' },
        { frage: 'Was liefert klammernOk(")(")?', optionen: ['wahr', 'falsch'], richtig: 1, erklaerung: 'Gleich das erste Zeichen ist schließend, aber der Stapel ist leer → sofort „falsch“.' }
      ],
      ablauf: {
        frage: 'Verfolge den Algorithmus mit dem Text ([x])]. Wie viele Elemente liegen jeweils auf dem Stapel?',
        checkpoints: [
          { id: 'k2', label: 'nach dem 2. Zeichen', wert: 2 },
          { id: 'k4', label: 'nach dem 4. Zeichen ( ] )', wert: 1 },
          { id: 'k5', label: 'nach dem 5. Zeichen ( ) )', wert: 0 },
          { id: 'kz', label: 'Anzahl gelesener Zeichen bis zum Ergebnis', wert: 6 }
        ]
      }
    }
  ] : [];
  window.LR_ALGOS = (window.LR_ALGOS || []).concat(ALGOS);

  // ======================================================================
  // PYTHON-WERKSTATT (Tests: Aufruf als Python-Ausdruck, Erwartung als JSON; Tupel mit list() umhüllen)
  // ======================================================================
  const SORT_TESTS = fn => [
    { call: `${fn}([5, 2, 4, 1])`, erwartet: [1, 2, 4, 5] },
    { call: `${fn}([])`, erwartet: [] },
    { call: `${fn}([3])`, erwartet: [3] },
    { call: `${fn}([9, 8, 7, 6, 5])`, erwartet: [5, 6, 7, 8, 9] },
    { call: `${fn}([2, 2, 1])`, erwartet: [1, 2, 2] }
  ];
  window.LR_PY = (window.LR_PY || []).concat([
    {
      id: 'py-fakultaet', fach: 'informatik', algo: 'inf-fakultaet', titel: 'Fakultät rekursiv', kurz: 'Abbruchbedingung und Selbstaufruf.',
      text: 'Schreibe die Funktion <code>fakultaet(n)</code>, die n! <b>rekursiv</b> berechnet (n! = n · (n−1)!, 0! = 1). Benutze keine Schleife.',
      start: 'def fakultaet(n):\n    # Dein Code hier\n    pass\n\n\nprint(fakultaet(5))\n',
      tests: [{ call: 'fakultaet(0)', erwartet: 1 }, { call: 'fakultaet(1)', erwartet: 1 }, { call: 'fakultaet(5)', erwartet: 120 }, { call: 'fakultaet(10)', erwartet: 3628800 }],
      verbot: ['for ', 'while '],
      hinweis: 'Abbruch: n == 0 gibt 1 zurück. Sonst: n mal das Ergebnis für n − 1.',
      loesung: 'def fakultaet(n):\n    if n == 0:\n        return 1\n    return n * fakultaet(n - 1)\n'
    },
    {
      id: 'py-summe-rek', fach: 'informatik', titel: 'Summe 1 bis n rekursiv', kurz: 'Das Beispiel summe(4) aus der Lektion selbst programmieren.',
      text: 'Schreibe <code>summe(n)</code>, das 1 + 2 + … + n <b>rekursiv</b> berechnet. Für n = 0 ist die Summe 0.',
      start: 'def summe(n):\n    # Dein Code hier\n    pass\n\n\nprint(summe(4))\n',
      tests: [{ call: 'summe(0)', erwartet: 0 }, { call: 'summe(4)', erwartet: 10 }, { call: 'summe(10)', erwartet: 55 }, { call: 'summe(100)', erwartet: 5050 }],
      verbot: ['for ', 'while ', 'sum('],
      hinweis: 'summe(n) = n + summe(n − 1). Was ist der kleinste Fall?',
      loesung: 'def summe(n):\n    if n == 0:\n        return 0\n    return n + summe(n - 1)\n'
    },
    {
      id: 'py-quersumme-rek', fach: 'informatik', titel: 'Quersumme rekursiv', kurz: 'Letzte Ziffer abspalten, Rest rekursiv.',
      text: 'Schreibe <code>quersumme(n)</code> für eine natürliche Zahl <b>rekursiv</b>. Tipp: <code>n % 10</code> ist die letzte Ziffer, <code>n // 10</code> der Rest.',
      start: 'def quersumme(n):\n    # Dein Code hier\n    pass\n\n\nprint(quersumme(4721))\n',
      tests: [{ call: 'quersumme(4721)', erwartet: 14 }, { call: 'quersumme(0)', erwartet: 0 }, { call: 'quersumme(9)', erwartet: 9 }, { call: 'quersumme(1000)', erwartet: 1 }],
      verbot: ['for ', 'while '],
      hinweis: 'Abbruch: n < 10 → die Zahl selbst. Sonst letzte Ziffer + quersumme(n // 10).',
      loesung: 'def quersumme(n):\n    if n < 10:\n        return n\n    return n % 10 + quersumme(n // 10)\n'
    },
    {
      id: 'py-fib-iter', fach: 'informatik', titel: 'Fibonacci mit Schleife', kurz: 'n Schritte statt Millionen Aufrufe.',
      text: 'Schreibe <code>fib_iter(n)</code>, das die n-te Fibonacci-Zahl mit einer <b>Schleife</b> berechnet (fib(0) = 0, fib(1) = 1, fib(2) = 1, fib(3) = 2, …).',
      start: 'def fib_iter(n):\n    # Dein Code hier\n    pass\n\n\nprint(fib_iter(10))\n',
      tests: [{ call: 'fib_iter(0)', erwartet: 0 }, { call: 'fib_iter(1)', erwartet: 1 }, { call: 'fib_iter(10)', erwartet: 55 }, { call: 'fib_iter(30)', erwartet: 832040 }],
      hinweis: 'Merke dir zwei Werte a und b (Start 0 und 1). In jedem Schritt: a bekommt b, b bekommt a + b.',
      loesung: 'def fib_iter(n):\n    a = 0\n    b = 1\n    for i in range(n):\n        a, b = b, a + b\n    return a\n'
    },
    {
      id: 'py-fib-rek', fach: 'informatik', titel: 'Fibonacci rekursiv', kurz: 'Zwei Abbruchfälle, zwei Selbstaufrufe.',
      text: 'Schreibe <code>fib_rek(n)</code>, das die n-te Fibonacci-Zahl <b>rekursiv</b> berechnet: fib(n) = fib(n−1) + fib(n−2). Teste nur mit kleinen n (die Laufzeit explodiert).',
      start: 'def fib_rek(n):\n    # Dein Code hier\n    pass\n\n\nprint(fib_rek(10))\n',
      tests: [{ call: 'fib_rek(0)', erwartet: 0 }, { call: 'fib_rek(1)', erwartet: 1 }, { call: 'fib_rek(10)', erwartet: 55 }, { call: 'fib_rek(15)', erwartet: 610 }],
      verbot: ['for ', 'while '],
      hinweis: 'Abbruch für n < 2: gib n zurück. Sonst: Summe der beiden vorherigen.',
      loesung: 'def fib_rek(n):\n    if n < 2:\n        return n\n    return fib_rek(n - 1) + fib_rek(n - 2)\n'
    },
    {
      id: 'py-aufrufe-fib', fach: 'informatik', titel: 'Aufrufe von fib_rek zählen', kurz: 'aufrufe(n) = 1 + aufrufe(n−1) + aufrufe(n−2).',
      text: 'Schreibe <code>aufrufe(n)</code>, das <b>rekursiv</b> die Anzahl der Aufrufe bestimmt, die <code>fib_rek(n)</code> auslöst (der erste Aufruf zählt mit). Für n = 0 und n = 1 ist es 1.',
      start: 'def aufrufe(n):\n    # Dein Code hier\n    pass\n\n\nprint(aufrufe(4))\n',
      tests: [{ call: 'aufrufe(0)', erwartet: 1 }, { call: 'aufrufe(1)', erwartet: 1 }, { call: 'aufrufe(4)', erwartet: 9 }, { call: 'aufrufe(5)', erwartet: 15 }, { call: 'aufrufe(10)', erwartet: 177 }],
      hinweis: 'Der Aufruf selbst zählt 1, dazu kommen die Aufrufe von n − 1 und von n − 2.',
      loesung: 'def aufrufe(n):\n    if n < 2:\n        return 1\n    return 1 + aufrufe(n - 1) + aufrufe(n - 2)\n'
    },
    {
      id: 'py-bubblesort', fach: 'informatik', algo: 'inf-bubble', titel: 'Bubblesort', kurz: 'Nachbarn vergleichen und tauschen.',
      text: 'Schreibe <code>bubblesort(liste)</code>. Die Funktion sortiert die Liste aufsteigend (mit Nachbarvergleichen) und gibt sie zurück. Benutze nicht <code>sorted()</code> oder <code>.sort()</code>.',
      start: 'def bubblesort(liste):\n    # Dein Code hier\n    pass\n\n\nprint(bubblesort([5, 2, 4, 1]))\n',
      tests: SORT_TESTS('bubblesort'),
      verbot: ['sorted(', '.sort('],
      hinweis: 'Zwei geschachtelte Schleifen: außen n − 1 Durchläufe, innen j von 0 bis n − 2 − i. Tausche, wenn liste[j] > liste[j + 1].',
      loesung: 'def bubblesort(liste):\n    n = len(liste)\n    for i in range(n - 1):\n        for j in range(n - 1 - i):\n            if liste[j] > liste[j + 1]:\n                liste[j], liste[j + 1] = liste[j + 1], liste[j]\n    return liste\n'
    },
    {
      id: 'py-selectionsort', fach: 'informatik', titel: 'Selectionsort', kurz: 'Kleinstes suchen und nach vorn tauschen.',
      text: 'Schreibe <code>selectionsort(liste)</code>: Suche im unsortierten Rest das kleinste Element und tausche es nach vorn. Gib die sortierte Liste zurück. Kein <code>sorted()</code>, kein <code>.sort()</code>.',
      start: 'def selectionsort(liste):\n    # Dein Code hier\n    pass\n\n\nprint(selectionsort([5, 2, 4, 1]))\n',
      tests: SORT_TESTS('selectionsort'),
      verbot: ['sorted(', '.sort('],
      hinweis: 'Außen i von 0 bis n − 2. Innen: Position des kleinsten Elements ab i + 1 suchen. Danach tauschen.',
      loesung: 'def selectionsort(liste):\n    for i in range(len(liste) - 1):\n        kleinste = i\n        for j in range(i + 1, len(liste)):\n            if liste[j] < liste[kleinste]:\n                kleinste = j\n        liste[i], liste[kleinste] = liste[kleinste], liste[i]\n    return liste\n'
    },
    {
      id: 'py-insertionsort', fach: 'informatik', titel: 'Insertionsort', kurz: 'Element einsortieren und Größere nach rechts schieben.',
      text: 'Schreibe <code>insertionsort(liste)</code>: Nimm das nächste Element, schiebe größere Elemente des sortierten Teils nach rechts und setze es in die Lücke. Gib die Liste zurück. Kein <code>sorted()</code>, kein <code>.sort()</code>.',
      start: 'def insertionsort(liste):\n    # Dein Code hier\n    pass\n\n\nprint(insertionsort([5, 2, 4, 1]))\n',
      tests: SORT_TESTS('insertionsort'),
      verbot: ['sorted(', '.sort('],
      hinweis: 'wert = liste[i] merken, j = i − 1; solange j ≥ 0 und liste[j] > wert: liste[j + 1] = liste[j], j verkleinern. Dann liste[j + 1] = wert.',
      loesung: 'def insertionsort(liste):\n    for i in range(1, len(liste)):\n        wert = liste[i]\n        j = i - 1\n        while j >= 0 and liste[j] > wert:\n            liste[j + 1] = liste[j]\n            j = j - 1\n        liste[j + 1] = wert\n    return liste\n'
    },
    {
      id: 'py-bubble-zaehlen', fach: 'informatik', algo: 'inf-bubble', titel: 'Bubblesort: Vergleiche und Vertauschungen zählen', kurz: 'Den Aufwand eines Sortierlaufs messen.',
      text: 'Schreibe <code>bubble_zaehlen(liste)</code>. Die Funktion führt Bubblesort aus (innere Schleife bis n − 1 − i) und gibt die Liste <code>[vergleiche, vertauschungen]</code> zurück: wie oft zwei Elemente verglichen und wie oft getauscht wurden.',
      start: 'def bubble_zaehlen(liste):\n    # Dein Code hier\n    pass\n\n\nprint(bubble_zaehlen([5, 2, 4, 1]))\n',
      tests: [{ call: 'bubble_zaehlen([5, 2, 4, 1])', erwartet: [6, 5] }, { call: 'bubble_zaehlen([1, 2, 3])', erwartet: [3, 0] }, { call: 'bubble_zaehlen([6, 3, 8, 2])', erwartet: [6, 4] }, { call: 'bubble_zaehlen([])', erwartet: [0, 0] }, { call: 'bubble_zaehlen([7])', erwartet: [0, 0] }],
      hinweis: 'Zwei Zähler (Start 0). Vergleich: bei jedem Durchlauf der inneren Schleife +1. Vertauschung: nur wenn getauscht wird +1.',
      loesung: 'def bubble_zaehlen(liste):\n    n = len(liste)\n    vergleiche = 0\n    vertauschungen = 0\n    for i in range(n - 1):\n        for j in range(n - 1 - i):\n            vergleiche = vergleiche + 1\n            if liste[j] > liste[j + 1]:\n                liste[j], liste[j + 1] = liste[j + 1], liste[j]\n                vertauschungen = vertauschungen + 1\n    return [vergleiche, vertauschungen]\n'
    },
    {
      id: 'py-min-anzahl', fach: 'informatik', titel: 'Kleinster Wert und seine Häufigkeit', kurz: 'Minimum plus Zähler in einer Schleife.',
      text: 'Schreibe <code>kleinste_mit_anzahl(werte)</code>. Die (nicht leere) Liste enthält ganze Zahlen. Gib <b>zwei Werte</b> zurück: den kleinsten Wert und die Anzahl, wie oft er vorkommt (z. B. als <code>return kleinster, anzahl</code>).',
      start: 'def kleinste_mit_anzahl(werte):\n    # Dein Code hier\n    pass\n\n\nprint(kleinste_mit_anzahl([3, -1, 4, -1, 2]))\n',
      tests: [{ call: 'list(kleinste_mit_anzahl([3, -1, 4, -1, 2]))', erwartet: [-1, 2] }, { call: 'list(kleinste_mit_anzahl([5]))', erwartet: [5, 1] }, { call: 'list(kleinste_mit_anzahl([2, 2, 2]))', erwartet: [2, 3] }, { call: 'list(kleinste_mit_anzahl([-4, -9, -9, -1]))', erwartet: [-9, 2] }],
      verbot: ['min(', '.count('],
      hinweis: 'Startwert für das Minimum: erstes Element, Anzahl 1. Ist ein Element kleiner, beginnt die Zählung bei 1 neu; ist es gleich, wird um 1 erhöht.',
      loesung: 'def kleinste_mit_anzahl(werte):\n    kleinster = werte[0]\n    anzahl = 1\n    for i in range(1, len(werte)):\n        if werte[i] < kleinster:\n            kleinster = werte[i]\n            anzahl = 1\n        elif werte[i] == kleinster:\n            anzahl = anzahl + 1\n    return kleinster, anzahl\n'
    },
    {
      id: 'py-klammern', fach: 'informatik', algo: 'inf-klammern', titel: 'Klammerprüfung mit Stapel', kurz: 'Ein Stapel merkt sich die offenen Klammern.',
      text: 'Schreibe <code>klammern_ok(text)</code>: Die Funktion prüft mit einem <b>Stapel</b> (Python-Liste mit <code>append</code> und <code>pop</code>), ob alle Klammern <code>()</code>, <code>[]</code>, <code>{}</code> im Text richtig geöffnet und geschlossen sind. Andere Zeichen werden ignoriert. Benutze nur Befehle des Beipackzettels (kein Wörterbuch).',
      start: 'def klammern_ok(text):\n    stapel = []\n    # Dein Code hier\n    pass\n\n\nprint(klammern_ok("([x])"))\n',
      tests: [{ call: 'klammern_ok("([x])")', erwartet: true }, { call: 'klammern_ok("([x])]")', erwartet: false }, { call: 'klammern_ok("((")', erwartet: false }, { call: 'klammern_ok(")(")', erwartet: false }, { call: 'klammern_ok("")', erwartet: true }, { call: 'klammern_ok("{[()]}")', erwartet: true }, { call: 'klammern_ok("(]")', erwartet: false }],
      hinweis: 'Öffnende Klammer: append. Schließende: ist der Stapel leer → False; sonst pop und prüfen, ob es die passende öffnende war. Am Ende muss der Stapel leer sein.',
      loesung: 'def klammern_ok(text):\n    stapel = []\n    for i in range(len(text)):\n        z = text[i]\n        if z == "(" or z == "[" or z == "{":\n            stapel.append(z)\n        elif z == ")" or z == "]" or z == "}":\n            if len(stapel) == 0:\n                return False\n            oben = stapel.pop()\n            if not ((oben == "(" and z == ")") or (oben == "[" and z == "]") or (oben == "{" and z == "}")):\n                return False\n    return len(stapel) == 0\n'
    },
    {
      id: 'py-backspace', fach: 'informatik', titel: 'Textfeld mit Rücktaste', kurz: 'Ein Stapel speichert die getippten Zeichen.',
      text: 'Schreibe <code>tippen(eingabe)</code>. Die Zeichenkette <code>eingabe</code> besteht aus Buchstaben und dem Zeichen <code>&lt;</code> für die <b>Rücktaste</b>, die das zuletzt getippte Zeichen löscht (bei leerem Text passiert nichts). Gib den entstandenen Text zurück. Benutze einen Stapel (<code>append</code>/<code>pop</code>) und baue die Zeichenkette mit <code>+</code> zusammen (kein <code>join</code>).',
      start: 'def tippen(eingabe):\n    stapel = []\n    # Dein Code hier\n    pass\n\n\nprint(tippen("ab<c"))\n',
      tests: [{ call: 'tippen("ab<c")', erwartet: 'ac' }, { call: 'tippen("abc<<")', erwartet: 'a' }, { call: 'tippen("<a")', erwartet: 'a' }, { call: 'tippen("")', erwartet: '' }, { call: 'tippen("x<y<z<")', erwartet: '' }, { call: 'tippen("STAX<PEN<L")', erwartet: 'STAPEL' }],
      hinweis: 'Zeichen ≠ „<“: append. Zeichen = „<“: pop, aber nur wenn der Stapel nicht leer ist. Am Ende die Zeichen zu einem Text verbinden.',
      loesung: 'def tippen(eingabe):\n    stapel = []\n    for i in range(len(eingabe)):\n        z = eingabe[i]\n        if z == "<":\n            if len(stapel) > 0:\n                stapel.pop()\n        else:\n            stapel.append(z)\n    ergebnis = ""\n    for k in range(len(stapel)):\n        ergebnis = ergebnis + stapel[k]\n    return ergebnis\n'
    },
    {
      id: 'py-gross', fach: 'informatik', titel: 'Großbuchstaben zählen (nur Beipackzettel-Befehle)', kurz: 'Länge, Zeichen an Position und ASCII-Wert.',
      text: 'Schreibe <code>anzahl_gross(wort)</code>: Die Funktion zählt die Großbuchstaben A bis Z in der Zeichenkette. Erlaubt sind nur die Zeichenketten-Operationen des Beipackzettels: <code>len</code>, <code>wort[i]</code> und <code>ord</code> (A = 65 bis Z = 90). Kein <code>isupper()</code>, kein <code>for z in wort</code> mit Zusatzfunktionen.',
      start: 'def anzahl_gross(wort):\n    # Dein Code hier\n    pass\n\n\nprint(anzahl_gross("Hallo Welt"))\n',
      tests: [{ call: 'anzahl_gross("Hallo Welt")', erwartet: 2 }, { call: 'anzahl_gross("")', erwartet: 0 }, { call: 'anzahl_gross("abc")', erwartet: 0 }, { call: 'anzahl_gross("ABC def GHI")', erwartet: 6 }, { call: 'anzahl_gross("Z")', erwartet: 1 }],
      verbot: ['isupper', 'upper(', 'lower('],
      hinweis: 'Schleife über die Positionen 0 bis len(wort) − 1. Ein Zeichen z ist ein Großbuchstabe, wenn ord(z) zwischen 65 und 90 liegt.',
      loesung: 'def anzahl_gross(wort):\n    anzahl = 0\n    for i in range(len(wort)):\n        z = wort[i]\n        if ord(z) >= 65 and ord(z) <= 90:\n            anzahl = anzahl + 1\n    return anzahl\n'
    },
    {
      id: 'py-entferne-negative', fach: 'informatik', titel: 'Negative Zahlen aus der Reihung löschen', kurz: 'delete von hinten nach vorn.',
      text: 'Schreibe <code>entferne_negative(d)</code>: Aus der Liste <code>d</code> (eine dynamische Reihung mit ganzen Zahlen) werden alle negativen Zahlen mit <code>del d[i]</code> gelöscht (Beipackzettel: <code>delete(i)</code>). Die Funktion verändert <code>d</code> und gibt <code>d</code> zurück. Kein <code>remove</code>, kein neues Zusammenbauen der Liste.',
      start: 'def entferne_negative(d):\n    # Dein Code hier\n    pass\n\n\nprint(entferne_negative([4, -2, -5, 7]))\n',
      tests: [{ call: 'entferne_negative([4, -2, -5, 7])', erwartet: [4, 7] }, { call: 'entferne_negative([-1, -2, -3])', erwartet: [] }, { call: 'entferne_negative([])', erwartet: [] }, { call: 'entferne_negative([1, 2, 3])', erwartet: [1, 2, 3] }, { call: 'entferne_negative([-3, 5, -1, 6, -8])', erwartet: [5, 6] }],
      verbot: ['remove(', 'filter('],
      hinweis: 'Lauf von hinten nach vorn (i = len(d) − 1 bis 0). Dann stören die nachrückenden Elemente nicht.',
      loesung: 'def entferne_negative(d):\n    i = len(d) - 1\n    while i >= 0:\n        if d[i] < 0:\n            del d[i]\n        i = i - 1\n    return d\n'
    },
    {
      id: 'py-taxi', fach: 'informatik', titel: 'Taxistand prüfen (Schlange)', kurz: 'Protokoll ist nur gültig, wenn immer das vorderste Taxi ausfährt.',
      text: 'Schreibe <code>protokoll_ok(protokoll)</code>. <code>protokoll</code> ist eine Liste von Paaren <code>[nummer, ereignis]</code> mit dem Ereignis <code>"ein"</code> oder <code>"aus"</code>. Der Taxistand ist eine <b>Schlange</b>: Einfahrt = hinten anstellen, Ausfahrt nur für das <b>vorderste</b> Taxi. Gib <code>True</code> zurück, wenn das Protokoll widerspruchsfrei ist, sonst <code>False</code>.',
      start: 'def protokoll_ok(protokoll):\n    schlange = []\n    # Dein Code hier\n    pass\n\n\nprint(protokoll_ok([["T1", "ein"], ["T2", "ein"], ["T1", "aus"]]))\n',
      tests: [
        { call: 'protokoll_ok([["T1", "ein"], ["T2", "ein"], ["T1", "aus"]])', erwartet: true },
        { call: 'protokoll_ok([["T1", "ein"], ["T2", "ein"], ["T2", "aus"]])', erwartet: false },
        { call: 'protokoll_ok([["T1", "aus"]])', erwartet: false },
        { call: 'protokoll_ok([])', erwartet: true },
        { call: 'protokoll_ok([["T11", "ein"], ["T12", "ein"], ["T13", "ein"], ["T11", "aus"], ["T14", "ein"], ["T12", "aus"], ["T14", "aus"]])', erwartet: false },
        { call: 'protokoll_ok([["T11", "ein"], ["T12", "ein"], ["T13", "ein"], ["T11", "aus"], ["T14", "ein"], ["T12", "aus"], ["T13", "aus"], ["T14", "aus"]])', erwartet: true }
      ],
      hinweis: 'Einfahrt: append. Ausfahrt: Ist die Schlange leer oder steht vorn (Index 0) ein anderes Taxi → False. Sonst pop(0).',
      loesung: 'def protokoll_ok(protokoll):\n    schlange = []\n    for nummer, ereignis in protokoll:\n        if ereignis == "ein":\n            schlange.append(nummer)\n        else:\n            if len(schlange) == 0 or schlange[0] != nummer:\n                return False\n            schlange.pop(0)\n    return True\n'
    },
    {
      id: 'py-eintragen', fach: 'informatik', titel: 'Schlange in eine 2D-Liste eintragen', kurz: 'Werte zeilenweise und in Schlangenlinie eintragen.',
      text: 'Die Werte stehen in der Schlange <code>q</code> (eine Liste, vorn = Index 0, Entnahme mit <code>q.pop(0)</code>). Schreibe <code>eintragen(q, zeilen, spalten)</code>, das eine 2D-Liste mit <code>zeilen</code> Zeilen und <code>spalten</code> Spalten zurückgibt, <b>zeilenweise</b> von links nach rechts gefüllt. Dann <code>eintragen_schlange(q, zeilen, spalten)</code>: jede <b>zweite Zeile</b> (Zeile 1, 3, …) wird von <b>rechts nach links</b> gefüllt (Schlangenlinie, wie ein Traktor auf dem Feld).',
      start: 'def eintragen(q, zeilen, spalten):\n    # Dein Code hier\n    pass\n\n\ndef eintragen_schlange(q, zeilen, spalten):\n    # Dein Code hier\n    pass\n\n\nprint(eintragen([1, 2, 3, 4, 5, 6], 2, 3))\n',
      tests: [
        { call: 'eintragen([1, 2, 3, 4, 5, 6], 2, 3)', erwartet: [[1, 2, 3], [4, 5, 6]] },
        { call: 'eintragen([1, 2, 3, 4], 4, 1)', erwartet: [[1], [2], [3], [4]] },
        { call: 'eintragen_schlange([1, 2, 3, 4, 5, 6], 2, 3)', erwartet: [[1, 2, 3], [6, 5, 4]] },
        { call: 'eintragen_schlange([1, 2, 3, 4, 5, 6, 7, 8, 9], 3, 3)', erwartet: [[1, 2, 3], [6, 5, 4], [7, 8, 9]] }
      ],
      hinweis: 'Für jede Zeile: leere Zeile anlegen, spalten-mal q.pop(0) anhängen. Für die Schlangenlinie die gefüllte Zeile bei ungeradem Zeilenindex umdrehen (zeile.reverse()).',
      loesung: 'def eintragen(q, zeilen, spalten):\n    ergebnis = []\n    for z in range(zeilen):\n        zeile = []\n        for s in range(spalten):\n            zeile.append(q.pop(0))\n        ergebnis.append(zeile)\n    return ergebnis\n\n\ndef eintragen_schlange(q, zeilen, spalten):\n    ergebnis = eintragen(q, zeilen, spalten)\n    for z in range(zeilen):\n        if z % 2 == 1:\n            ergebnis[z].reverse()\n    return ergebnis\n'
    }
  ]);
})();
