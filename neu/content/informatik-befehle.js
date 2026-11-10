/* ==========================================================================
   BEIPACKZETTEL INFORMATIK – die erlaubten Befehle (Tonda, 10.11.2026)
   Quelle: IServ „Abi28 IF13 EA“ → 0. Vorgaben → INF_Ergaenzende-Hinweise_GO_Neufassung_2025d.pdf
   (Ergänzende Hinweise zum Kerncurriculum Informatik, Niedersächsisches Kultusministerium, Neufassung Juni 2025).
   GRÜN hinterlegte Abschnitte sind als Hilfsmittel zugelassen (Tonda: „alles was grün oben ist darf man mit in die Klausur
   nehmen; die Befehle dort sind Pflicht, es gibt keine anderen“): 1 Zeichenketten, 2 Rechnen, 3 statische Reihungen,
   4 dynamische Reihung/Stapel/Schlange/Binärbaum, 8 SQL, 10 Hamming-Code, 11 ASCII-Tabelle usw.
   Die Texte hier sind eigene, kurze Fassungen mit Python-Entsprechung und Beispiel (kein Abdruck des Dokuments).
   Seite im Lernraum: #/befehle (neu/befehle.js). Demos: i-zeichen, i-dynarray, i-stack, i-queue (informatik-demos.js).
   Op: { n: Name, sig: Signatur, was: Wirkung, py: Python-Entsprechung, bsp: Beispiel, fehler?: Laufzeitfehler, den man vorher ausschließen muss }
   ========================================================================== */
(function () {
  const S = [
    {
      id: 'zeichen', nr: 1, titel: 'Zeichen und Zeichenketten', gruen: true, dran: true,
      intro: 'Mit Zeichenketten sind <b>nur diese acht Dinge</b> erlaubt. Alles andere (z. B. <code>upper()</code>, <code>split()</code>, <code>replace()</code>, <code>reversed()</code>) ist in Prüfungsaufgaben <b>nicht zulässig</b>: Man baut es aus diesen Operationen selbst.',
      ops: [
        { n: 'Länge', sig: 'Länge einer Zeichenkette bestimmen', was: 'Anzahl der Zeichen (Leerzeichen zählen mit).', py: 'len(s)', bsp: 'len("Hallo") → 5' },
        { n: 'Zeichen auslesen', sig: 'Zeichen an einer Position auslesen', was: 'Das Zeichen an Position i. Die Zählung beginnt bei 0.', py: 's[i]', bsp: '"Hallo"[1] → "a"', fehler: 'i muss zwischen 0 und Länge − 1 liegen.' },
        { n: 'Teilzeichenkette auslesen', sig: 'Teilzeichenkette in einem Bereich auslesen', was: 'Die Zeichen von Position a bis <b>vor</b> Position b (b selbst gehört nicht dazu).', py: 's[a:b]', bsp: '"Hallo"[1:4] → "all"' },
        { n: 'Verbinden', sig: 'Zwei Zeichenketten verbinden', was: 'Hängt die zweite Zeichenkette hinten an die erste.', py: 's1 + s2', bsp: '"Ha" + "llo" → "Hallo"' },
        { n: 'Gleichheit', sig: 'Inhalt auf Gleichheit prüfen', was: 'Wahr, wenn beide Zeichenketten Zeichen für Zeichen gleich sind (Groß-/Kleinschreibung zählt).', py: 's1 == s2', bsp: '"Hallo" == "hallo" → falsch' },
        { n: 'Teilzeichenkette prüfen', sig: 'Auf eine Teilzeichenkette prüfen', was: 'Wahr, wenn t irgendwo in s vorkommt.', py: 't in s', bsp: '"all" in "Hallo" → wahr' },
        { n: 'Lexikographisch vergleichen', sig: 'Zwei Zeichenketten lexikographisch vergleichen', was: 'Wie im Wörterbuch, Zeichen für Zeichen nach ihrem ASCII-Wert. Großbuchstaben kommen vor Kleinbuchstaben.', py: 's1 < s2', bsp: '"Apfel" < "Birne" → wahr; "Zebra" < "apfel" → wahr' },
        { n: 'ASCII-Wert', sig: 'ASCII-Wert zu einem Zeichen bestimmen (und umgekehrt)', was: 'Dezimalzahl eines Zeichens bzw. das Zeichen zu einer Zahl (ASCII-Tabelle, Beipackzettel Abschnitt 11: A = 65 … Z = 90, a = 97 … z = 122, 0 = 48 … 9 = 57).', py: 'ord(z)  und  chr(zahl)', bsp: 'ord("A") → 65; chr(66) → "B"' }
      ]
    },
    {
      id: 'rechnen', nr: 2, titel: 'Rechnen: Division, Rest, Zufall, Runden', gruen: true, dran: true,
      intro: 'In <b>Struktogrammen</b> (programmiersprachenunabhängig) gilt: <code>/</code> ist bei zwei ganzen Zahlen die <b>ganzzahlige Division ohne Rest</b>, <code>mod</code> der <b>kleinste positive Rest</b>. Beim <b>Implementieren</b> benutzt du die Schreibweise deiner Programmiersprache (Python: <code>//</code> und <code>%</code>).',
      ops: [
        { n: 'Ganzzahlige Division', sig: 'a / b  (ganze Zahlen, im Struktogramm)', was: 'Quotient ohne Rest.', py: 'a // b', bsp: '17 / 5 → 3' },
        { n: 'Rest (mod)', sig: 'a mod b', was: 'Rest der ganzzahligen Division, nie negativ.', py: 'a % b', bsp: '17 mod 5 → 2; 20 mod 5 → 0' },
        { n: 'Ganzzahlige Zufallszahl', sig: 'Zufallszahl in einem vorgegebenen Bereich erzeugen', was: 'Eine ganze Zahl von a bis b (beide eingeschlossen).', py: 'random.randint(a, b)  (mit import random)', bsp: 'random.randint(1, 6) → Würfel' },
        { n: 'Ganzzahliges Runden', sig: 'Auf eine ganze Zahl runden', was: 'Kaufmännisch auf die nächste ganze Zahl.', py: 'round(x)', bsp: 'round(3.7) → 4' }
      ]
    },
    {
      id: 'static', nr: 3, titel: 'Statische Reihungen (feste Größe)', gruen: true, dran: true,
      intro: 'Eine <b>statische Reihung</b> hat eine feste Größe: Es gibt kein <code>append</code>, <code>insertAt</code> oder <code>delete</code>. Du liest und überschreibst Elemente über den Index. Der Index beginnt bei <b>0</b>. Bei zwei Dimensionen schreibt man <code>[Zeile][Spalte]</code>. Mit einer <b>for-each-Schleife</b> geht man alle Elemente der Reihe nach durch.',
      ops: [
        { n: 'Element lesen / setzen', sig: 'a[i]  bzw.  a[i] ← x', was: 'Element an Position i lesen oder überschreiben.', py: 'a[i]  bzw.  a[i] = x', bsp: 'a = [3, 5, 2]: a[2] → 2', fehler: 'i muss zwischen 0 und Größe − 1 liegen.' },
        { n: 'Größe auslesen', sig: 'Größe einer ein- oder zweidimensionalen Reihung', was: 'Anzahl der Elemente; bei 2D: Zeilenzahl und Spaltenzahl.', py: 'len(a)  und  len(a[0])', bsp: 'f = [[3, 5, 2], [4, 1, 6]]: len(f) → 2 Zeilen, len(f[0]) → 3 Spalten' },
        { n: 'for-each', sig: 'für jedes x in a', was: 'Geht alle Elemente der Reihe nach durch, ohne Index.', py: 'for x in a:', bsp: 'for x in [3, 5, 2]: summe = summe + x' }
      ]
    },
    {
      id: 'dyn', nr: 4, titel: 'Dynamische Reihung (DynArray)', gruen: true, dran: true,
      intro: 'Eine <b>dynamische Reihung</b> wächst und schrumpft. Index ab <b>0</b>. Sie ist iterierbar (for-each geht). <b>Laufzeitfehler</b> (z. B. Löschen an einer Position, die es nicht gibt) musst du durch <b>Abfragen vorher ausschließen</b>.',
      ops: [
        { n: 'DynArray()', sig: 'DynArray()', was: 'Legt eine leere dynamische Reihung an.', py: 'd = []', bsp: 'd = DynArray()  →  leer' },
        { n: 'isEmpty', sig: 'isEmpty(): Wahrheitswert', was: 'Wahr, wenn kein Element drin ist.', py: 'len(d) == 0', bsp: 'leer → wahr' },
        { n: 'getItem', sig: 'getItem(index: Ganzzahl): Inhaltstyp', was: 'Gibt den Inhalt an Position index zurück (nichts wird verändert).', py: 'd[index]', bsp: '[4, 9, 7].getItem(1) → 9', fehler: 'index von 0 bis getLength() − 1.' },
        { n: 'append', sig: 'append(inhalt: Inhaltstyp)', was: 'Hängt ein neues Element <b>hinten</b> an.', py: 'd.append(x)', bsp: '[4, 9] → append(7) → [4, 9, 7]' },
        { n: 'insertAt', sig: 'insertAt(index: Ganzzahl, inhalt: Inhaltstyp)', was: 'Fügt an Position index ein. Das bisherige Element dort und alle folgenden rücken nach hinten. Ist index gleich der Länge, wird hinten angefügt.', py: 'd.insert(index, x)', bsp: '[4, 9, 7] → insertAt(1, 5) → [4, 5, 9, 7]', fehler: 'index von 0 bis getLength() (einschließlich Länge).' },
        { n: 'setItem', sig: 'setItem(index: Ganzzahl, inhalt: Inhaltstyp)', was: 'Ersetzt den Inhalt an Position index durch den neuen Inhalt.', py: 'd[index] = x', bsp: '[4, 5, 9, 7] → setItem(0, 1) → [1, 5, 9, 7]', fehler: 'index von 0 bis getLength() − 1.' },
        { n: 'delete', sig: 'delete(index: Ganzzahl)', was: 'Entfernt das Element an Position index. Alle folgenden rücken um eins nach vorn.', py: 'del d[index]', bsp: '[1, 5, 9, 7] → delete(2) → [1, 5, 7]', fehler: 'index von 0 bis getLength() − 1.' },
        { n: 'getLength', sig: 'getLength(): Ganzzahl', was: 'Anzahl der Elemente.', py: 'len(d)', bsp: '[1, 5, 7].getLength() → 3' }
      ]
    },
    {
      id: 'stack', nr: 4, titel: 'Stapel (Stack): Last In, First Out', gruen: true, dran: true, sub: true,
      intro: 'Man kommt nur an das <b>oberste</b> Element. <b>Laufzeitfehler</b>: <code>pop</code> oder <code>top</code> auf einem leeren Stapel. Vorher <code>isEmpty()</code> abfragen.',
      ops: [
        { n: 'Stack()', sig: 'Stack()', was: 'Legt einen leeren Stapel an.', py: 's = []', bsp: 's = Stack() → leer' },
        { n: 'isEmpty', sig: 'isEmpty(): Wahrheitswert', was: 'Wahr, wenn der Stapel leer ist.', py: 'len(s) == 0', bsp: 'leer → wahr' },
        { n: 'top', sig: 'top(): Inhaltstyp', was: 'Gibt das oberste Element zurück, <b>lässt es aber liegen</b>.', py: 's[-1]', bsp: 'Stapel A B C (C oben): top() → C, der Stapel bleibt A B C', fehler: 'Stapel darf nicht leer sein.' },
        { n: 'push', sig: 'push(inhalt: Inhaltstyp)', was: 'Legt ein Element <b>oben</b> drauf.', py: 's.append(x)', bsp: 'A B → push(C) → A B C' },
        { n: 'pop', sig: 'pop(): Inhaltstyp', was: 'Nimmt das oberste Element <b>weg und gibt es zurück</b>.', py: 's.pop()', bsp: 'A B C → pop() liefert C, Stapel danach A B', fehler: 'Stapel darf nicht leer sein.' }
      ]
    },
    {
      id: 'queue', nr: 4, titel: 'Schlange (Queue): First In, First Out', gruen: true, dran: true, sub: true,
      intro: 'Hinten wird angehängt, vorn wird entnommen. <b>Laufzeitfehler</b>: <code>dequeue</code> oder <code>head</code> auf einer leeren Schlange. Vorher <code>isEmpty()</code> abfragen.',
      ops: [
        { n: 'Queue()', sig: 'Queue()', was: 'Legt eine leere Schlange an.', py: 'q = []', bsp: 'q = Queue() → leer' },
        { n: 'isEmpty', sig: 'isEmpty(): Wahrheitswert', was: 'Wahr, wenn die Schlange leer ist.', py: 'len(q) == 0', bsp: 'leer → wahr' },
        { n: 'head', sig: 'head(): Inhaltstyp', was: 'Gibt das <b>vorderste</b> Element zurück, <b>lässt es aber stehen</b>.', py: 'q[0]', bsp: 'Schlange A B C (A vorn): head() → A, Schlange bleibt A B C', fehler: 'Schlange darf nicht leer sein.' },
        { n: 'enqueue', sig: 'enqueue(inhalt: Inhaltstyp)', was: 'Hängt ein Element <b>hinten</b> an.', py: 'q.append(x)', bsp: 'A B → enqueue(C) → A B C' },
        { n: 'dequeue', sig: 'dequeue(): Inhaltstyp', was: 'Nimmt das vorderste Element <b>weg und gibt es zurück</b>.', py: 'q.pop(0)', bsp: 'A B C → dequeue() liefert A, Schlange danach B C', fehler: 'Schlange darf nicht leer sein.' }
      ]
    },
    {
      id: 'tree', nr: 4, titel: 'Binärbaum (BinTree)', gruen: true, dran: false, sub: true,
      intro: 'Im Unterricht <b>noch nicht dran</b>. Steht aber auf dem Beipackzettel; hier nur zum Nachschlagen. Ein leerer Baum hat keinen Inhalt und keine Teilbäume; ein Baum mit Inhalt hat links und rechts je einen <b>leeren</b> Baum.',
      ops: [
        { n: 'BinTree()', sig: 'BinTree()', was: 'Leerer Baum.' }, { n: 'BinTree(inhalt)', sig: 'BinTree(inhalt: Inhaltstyp)', was: 'Baum mit Wurzelinhalt, links und rechts je ein leerer Baum.' },
        { n: 'isEmpty', sig: 'isEmpty(): Wahrheitswert', was: 'Wahr bei leerem Baum.' }, { n: 'getItem', sig: 'getItem(): Inhaltstyp', was: 'Inhalt der Wurzel.' },
        { n: 'setItem', sig: 'setItem(inhalt: Inhaltstyp)', was: 'Wurzel bekommt den Inhalt (bei leerem Baum zusätzlich zwei leere Teilbäume).' }, { n: 'isLeaf', sig: 'isLeaf(): Wahrheitswert', was: 'Wahr, wenn links und rechts leere Bäume hängen (Blatt).' },
        { n: 'getLeft / getRight', sig: 'getLeft(): Binärbaum, getRight(): Binärbaum', was: 'Linker bzw. rechter Teilbaum.' }, { n: 'setLeft / setRight', sig: 'setLeft(b: Binärbaum), setRight(b: Binärbaum)', was: 'Setzt den linken bzw. rechten Teilbaum.' },
        { n: 'setEmpty', sig: 'setEmpty()', was: 'Der Baum wird zum leeren Baum.' }
      ]
    }
  ];

  // Orange / nicht zugelassen bzw. noch nicht im Unterricht (zur Orientierung, nicht im Lernraum)
  const WEITERE = [
    { nr: 5, titel: 'Darstellung von Operationen und Struktogrammen', farbe: 'orange', hinweis: 'Im Lernraum: Lektion „Struktogramme nach Abitur-Schreibweise“. Nicht zugelassen als Hilfsmittel, aber Pflichtwissen.' },
    { nr: 6, titel: 'Klassen- und Objektdiagramme', farbe: 'orange', hinweis: 'Klassenkarten hatten wir noch nicht.' },
    { nr: 7, titel: 'Datenbanktabellen (Kurzschreibweise) und ER-Diagramme', farbe: 'orange', hinweis: 'Noch nicht dran.' },
    { nr: 8, titel: 'Datenbankabfragen (SQL SELECT)', farbe: 'grün', hinweis: 'Noch nicht dran, kein IServ-Material.' },
    { nr: 9, titel: 'Lauflängencodierung und Kompression', farbe: 'orange', hinweis: 'Noch nicht dran.' },
    { nr: 10, titel: '(7,4)-Hamming-Code', farbe: 'grün', hinweis: 'Noch nicht dran.' },
    { nr: 11, titel: 'ASCII-Tabelle, Vigenère-Quadrat, Alphabet', farbe: 'grün', hinweis: 'Die ASCII-Tabelle brauchst du für ord/chr (Abschnitt 1).' },
    { nr: 12, titel: 'Endliche Automaten, Mealy- und Kellerautomaten', farbe: 'orange', hinweis: 'Noch nicht dran.' },
    { nr: 13, titel: 'Grammatiken formaler Sprachen', farbe: 'orange', hinweis: 'Noch nicht dran.' }
  ];

  // Notation von Operationen und Struktogrammen (Abschnitt 5, orange, aber Pflichtwissen)
  const NOTATION = [
    ['Signatur einer Operation', '<code>name(parameter: Typ, …): Rückgabetyp</code>, z. B. <code>istGerade(x: Ganzzahl): Wahrheitswert</code>, <code>sortiere(a: dynamische Reihung vom Inhaltstyp Zeichenkette)</code>'],
    ['Zählung', 'Positionen in Zeichenketten und Reihungen beginnen bei <b>0</b> (programmiersprachenunabhängig). Beim Implementieren gilt die Indizierung deiner Sprache.'],
    ['Kommentar', 'Im Struktogramm mit zwei Schrägstrichen: <code>// Kommentar</code>'],
    ['Rückgabe', '<code>gib … zurück</code> beendet die Operation an dieser Stelle.'],
    ['Zuweisung', 'sprachlich oder formal: <code>anzahl ← anzahl + 1</code>'],
    ['Schleifen', 'for-each („für jedes x in liste“), zählergesteuert („für i von 0 bis n − 1“), kopfgesteuert („solange …“).'],
    ['Objekt erzeugen', '<code>erzeuge …</code> ruft den Konstruktor auf (nur bei Klassen, noch nicht dran).'],
    ['Division / Rest', '<code>/</code> ganzzahlig bei zwei ganzen Zahlen, <code>mod</code> positiver Rest (siehe Abschnitt 2).'],
    ['Zugriff auf Reihungen', 'dynamisch: <code>liste.getItem(i)</code>, <code>liste.getLength()</code> usw. Statisch: <code>a[i]</code>.']
  ];

  // Python-Abkürzungen, die in der Klausur NICHT benutzt werden sollten, und was man stattdessen baut
  const NICHT = [
    ['<code>min(l)</code>, <code>max(l)</code>, <code>sum(l)</code>', 'Schleife mit Startwert (Maximum: erstes Element) bzw. Summe 0'],
    ['<code>l.sort()</code>, <code>sorted(l)</code>', 'selbst sortieren (Selection-, Insertion-, Bubblesort)'],
    ['<code>l.reverse()</code>, <code>l[::-1]</code>', 'Schleife von hinten nach vorn'],
    ['<code>x in l</code> (bei Reihungen), <code>l.index(x)</code>, <code>l.count(x)</code>', 'Schleife über alle Positionen mit Vergleich'],
    ['<code>l.remove(x)</code>, <code>l.pop(i)</code> (bei Reihungen)', 'Position suchen, dann <code>delete(i)</code>'],
    ['<code>s.upper()</code>, <code>s.lower()</code>, <code>s.split()</code>, <code>s.replace()</code>, <code>s.find()</code>', 'Zeichen für Zeichen mit Position, ASCII-Wert (<code>ord</code>/<code>chr</code>) und Verbinden'],
    ['<code>"".join(l)</code>, <code>str(x)</code>-Spielereien', 'Zeichenkette mit <code>+</code> Zeichen für Zeichen aufbauen'],
    ['Wörterbücher (<code>dict</code>), Mengen (<code>set</code>)', 'Reihungen und Fallunterscheidungen']
  ];

  window.INF_BEFEHLE = { sektionen: S, weitere: WEITERE, notation: NOTATION, nicht: NICHT };
})();
