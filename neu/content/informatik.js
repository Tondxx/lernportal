/* ==========================================================================
   INFORMATIK eA (IF13-Tri) · Lektionen für Klausur 2 (12.1) am Di 10.11.2026
   Quelle: IServ „Abi28 IF13 EA“ → 1. Grundlagen der Algorithmik: Einstieg mit Python (Tracetabelle, Datentypen,
   Funktionen, Listen, Fehlertypen, Modularisierung), 2. Struktogramme (AB0, AB1), 3. Sortierverfahren (Selection,
   Insertion, Bubble), Rekursion + Fibonacci, 4. Dynamische Datenstrukturen (AB1 Verkettete Liste, AB2 Stapel, AB3 Warteschlange).
   Nur Stoff aus dem IServ-Ordner (Tonda, 09.11.: Klassenkarten hatten wir nicht, Abitur-Aufgaben enthalten Stoff, der noch nicht dran war).
   Alle Texte, Beispiele und Zahlen sind EIGEN (angelehnt an die Arbeitsblätter);
   keine Originalaufgaben, keine offiziellen Lösungen. Code und Zahlen geprüft: neu/tests/informatik_check.py.
   UNSICHER: Ob die Klausur genau diesen Stoff abfragt (der alte Kalender nannte „Datenbanken & Softwareentwurf“; dazu gibt es
   im IServ-Ordner bisher kein Material). Pseudocode-/Struktogramm-Schreibweise nicht mit der Lehrkraft abgeglichen.
   Lektion:  { id, fach, num, min, demo, demoTitel, title, short, idee, bild, rezept[], beispiel{q,steps[{h,t}]}, fehler[], test[{q,a}] }
   ========================================================================== */
(function () {
  const m = String.raw;
  const F = 'informatik';
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  // Code-Block (Python/Pseudocode): wird maskiert, enthält nie `$` (sonst würde die Mathe-Ersetzung greifen)
  const code = s => `<pre class="ic-code">${esc(String(s).replace(/^\n/, '').replace(/\s+$/, ''))}</pre>`;
  const tab = (head, rows) => `<div class="ic-tabw"><table class="ic-tab"><thead><tr>${head.map(h => `<th>${h}</th>`).join('')}</tr></thead><tbody>${rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
  const merke = (h, t) => `<div class="mt-call"><div class="mt-call-h">${h}</div>${t}</div>`;
  const achtung = (h, t) => `<div class="mt-call warn"><div class="mt-call-h">${h}</div>${t}</div>`;
  // Struktogramm aus dem Algorithmus-Baum (algo.js); ohne algo.js (z. B. im Test) bleibt es leer
  const ns = a => (window.LRAlgo ? window.LRAlgo.nsHtml(a) : '');
  const A = window.LRAlgo ? window.LRAlgo.A : null;
  const INF_A = window.INF_A || {};
  const schaltjahr = A && {
    name: 'istSchaltjahr', params: ['jahr'],
    body: [A.if('jahr mod 400 = 0', 'jahr % 400 == 0', [A.ret('wahr', 'True')], [
      A.if('jahr mod 100 = 0', 'jahr % 100 == 0', [A.ret('falsch', 'False')], [A.ret('jahr mod 4 = 0', 'jahr % 4 == 0')])])]
  };

  const LESSONS = [
    // ---------------------------------------------------------------- Ordner: Beipackzettel (Hilfsmittel in der Klausur)
    {
      id: 'IB1', fach: F, num: 1, min: 14, demo: 'i-zeichen', demoTitel: 'Probier es aus: Die acht Zeichenketten-Befehle',
      title: 'Beipackzettel 1: Zeichenketten und Rechnen',
      short: 'Länge, Zeichen, Teilzeichenkette, Verbinden, ASCII, / und mod',
      idee: `<p>Auf dem Beipackzettel (grün: Abschnitt 1 und 2) stehen <b>alle</b> Befehle, die du für Zeichenketten und das Rechnen benutzen darfst. <b>Andere gibt es nicht.</b> Alles weitere baust du selbst daraus. Die komplette Liste mit Python-Schreibweise: <a class="link" href="#/befehle">Beipackzettel im Lernraum</a>.</p>
${tab(['Beipackzettel', 'Python', 'Beispiel'], [
        ['Länge bestimmen', '<code>len(s)</code>', '<code>len("Hallo")</code> = 5'],
        ['Zeichen an Position auslesen', '<code>s[i]</code>', '<code>"Hallo"[1]</code> = "a"'],
        ['Teilzeichenkette in einem Bereich', '<code>s[a:b]</code> (bis <b>vor</b> b)', '<code>"Hallo"[1:4]</code> = "all"'],
        ['Zwei Zeichenketten verbinden', '<code>s + t</code>', '<code>"Ha" + "llo"</code>'],
        ['Auf Gleichheit prüfen', '<code>s == t</code>', 'Groß/Klein zählt'],
        ['Auf Teilzeichenkette prüfen', '<code>t in s</code>', '<code>"all" in "Hallo"</code> = wahr'],
        ['Lexikographisch vergleichen', '<code>s &lt; t</code>', '<code>"Apfel" &lt; "Birne"</code> = wahr'],
        ['ASCII-Wert ↔ Zeichen', '<code>ord(z)</code>, <code>chr(n)</code>', 'A = 65, a = 97, 0 = 48']
      ])}
${merke('Rechnen (Abschnitt 2)', `<p>Im Struktogramm ist <code>/</code> bei zwei ganzen Zahlen die <b>ganzzahlige Division</b> (17 / 5 = 3) und <code>mod</code> der <b>Rest</b> (17 mod 5 = 2). In Python schreibst du <code>//</code> und <code>%</code>. Außerdem darfst du <b>ganzzahlige Zufallszahlen</b> in einem Bereich (<code>random.randint(a, b)</code>) und <b>Runden</b> (<code>round(x)</code>) benutzen.</p>`)}
<p><b>Nicht erlaubt:</b> <code>upper()</code>, <code>lower()</code>, <code>split()</code>, <code>replace()</code>, <code>find()</code>, <code>reversed()</code> und alles Ähnliche.</p>`,
      bild: `<p>Eine Zeichenkette ist wie eine <b>Perlenkette mit nummerierten Perlen</b> (ab 0). Du darfst nur die Länge zählen, einzelne Perlen anschauen, Stücke abschneiden und Ketten aneinanderhängen. Eine Perle zu ändern oder umzudrehen geht nur, indem du eine neue Kette baust.</p>`,
      rezept: [
        `<b>Zeichen einzeln holen:</b> Schleife <code>für i von 0 bis länge − 1</code> und <code>z ← Zeichen an Position i</code>.`,
        `<b>Zeichenart über ASCII erkennen:</b> Großbuchstabe: 65 ≤ ASCII ≤ 90, Kleinbuchstabe: 97 ≤ ASCII ≤ 122, Ziffer: 48 ≤ ASCII ≤ 57 (Tabelle auf dem Beipackzettel, Abschnitt 11).`,
        `<b>Neue Zeichenkette bauen:</b> Mit einer leeren Zeichenkette starten und Zeichen für Zeichen mit <code>+</code> anhängen.`,
        `<b>Ziffern einer Zahl:</b> letzte Ziffer <code>n mod 10</code>, Rest <code>n / 10</code>.`
      ],
      beispiel: {
        q: `Entwickle <code>anzahlGross(wort: Zeichenkette): Ganzzahl</code>, die die Großbuchstaben (A bis Z) zählt. Teste mit „Hallo Welt“.`,
        steps: [
          { h: 'Plan', t: `Jedes Zeichen einzeln holen (Position 0 bis Länge − 1) und prüfen, ob sein ASCII-Wert zwischen 65 (A) und 90 (Z) liegt. <code>upper()</code> oder <code>isupper()</code> gibt es nicht auf dem Beipackzettel.` },
          { h: 'Struktogramm', t: ns(INF_A.grossbuchstaben) },
          { h: 'Python', t: code(`
def anzahl_gross(wort):
    anzahl = 0
    for i in range(len(wort)):
        z = wort[i]
        if ord(z) >= 65 and ord(z) <= 90:
            anzahl = anzahl + 1
    return anzahl`) },
          { h: 'Test mit „Hallo Welt“', t: tab(['i', 'z', 'ASCII', 'Großbuchstabe?', 'anzahl'], [['0', 'H', '72', 'ja', '1'], ['1 bis 4', 'a l l o', '97 bis 111', 'nein', '1'], ['5', '␣', '32', 'nein', '1'], ['6', 'W', '87', 'ja', '2'], ['7 bis 9', 'e l t', '101 bis 116', 'nein', '2']]) + `Ergebnis: <b>2</b>.` }
        ]
      },
      fehler: [
        `Eine Abkürzung wie <code>wort.upper()</code> oder <code>wort.isupper()</code> benutzen. Die gibt es auf dem Beipackzettel nicht.`,
        `Position bei 1 beginnen. Das erste Zeichen hat die Position <b>0</b>, das letzte <code>länge − 1</code>.`,
        `<code>s[a:b]</code> endet <b>vor</b> Position b: <code>"Hallo"[1:4]</code> ist „all“, nicht „allo“.`,
        `Groß- und Kleinbuchstaben vergleichen: <code>"A" == "a"</code> ist falsch, und <code>"Zebra" &lt; "apfel"</code> ist wahr (Großbuchstaben haben kleinere ASCII-Werte).`
      ],
      test: [
        { q: `Was liefert <code>len("Info 1")</code>?`, a: `6 (das Leerzeichen zählt mit).` },
        { q: `Wie bekommst du den ASCII-Wert von „B“, und welchen Wert hat er?`, a: `<code>ord("B")</code> = 66.` },
        { q: `Wie schreibt man im Struktogramm „Rest von 17 geteilt durch 5“ und in Python?`, a: `<code>17 mod 5</code> (= 2); in Python <code>17 % 5</code>.` },
        { q: `Was ist <code>"Computer"[2:5]</code>?`, a: `„mpu“ (Positionen 2, 3, 4).` }
      ]
    },
    {
      id: 'IB2', fach: F, num: 2, min: 16, demo: 'i-dynarray', demoTitel: 'Probier es aus: Die Befehle der dynamischen Reihung',
      title: 'Beipackzettel 2: Reihungen, statisch und dynamisch',
      short: 'DynArray-Befehle, statische Reihung, [Zeile][Spalte], for-each, Laufzeitfehler vermeiden',
      idee: `<p>Auf dem Beipackzettel (grün: Abschnitt 3 und 4) stehen zwei Arten von Reihungen:</p>
<ul><li><b>Statische Reihung:</b> feste Größe. Du liest und überschreibst Elemente über den Index (ab 0). Zwei Dimensionen: <code>[Zeile][Spalte]</code>. Die Größe kannst du auslesen (<code>len(a)</code>, <code>len(a[0])</code>).</li><li><b>Dynamische Reihung</b> (<code>DynArray</code>): wächst und schrumpft, mit genau diesen Befehlen:</li></ul>
${tab(['Befehl', 'Python', 'Wirkung'], [
        ['<code>DynArray()</code>', '<code>d = []</code>', 'leere Reihung'],
        ['<code>isEmpty(): Wahrheitswert</code>', '<code>len(d) == 0</code>', 'leer?'],
        ['<code>getItem(index): Inhaltstyp</code>', '<code>d[index]</code>', 'Element lesen'],
        ['<code>append(inhalt)</code>', '<code>d.append(x)</code>', 'hinten anfügen'],
        ['<code>insertAt(index, inhalt)</code>', '<code>d.insert(index, x)</code>', 'einfügen, Rest rückt nach hinten (index = Länge: hinten anfügen)'],
        ['<code>setItem(index, inhalt)</code>', '<code>d[index] = x</code>', 'ersetzen'],
        ['<code>delete(index)</code>', '<code>del d[index]</code>', 'entfernen, Rest rückt nach vorn'],
        ['<code>getLength(): Ganzzahl</code>', '<code>len(d)</code>', 'Anzahl Elemente']
      ])}
${merke('Pflicht: Laufzeitfehler vorher ausschließen', `<p>Löschen oder Lesen an einer Position, die es nicht gibt, ist ein <b>Laufzeitfehler</b>. In Prüfungsaufgaben musst du das mit einer <b>Abfrage vorher</b> verhindern: gültig sind bei <code>getItem</code>, <code>setItem</code>, <code>delete</code> die Positionen <b>0 bis getLength() − 1</b>, bei <code>insertAt</code> <b>0 bis getLength()</b>.</p>`)}
<p>Reihungen sind <b>iterierbar</b>: <code>für jedes x in d</code> geht alle Elemente der Reihe nach durch (ohne Index).</p>`,
      bild: `<p>Eine dynamische Reihung ist wie eine <b>Reihe nummerierter Stühle</b>, bei der Stühle dazukommen oder wegfallen. Wer in der Mitte einen Stuhl einschiebt (<code>insertAt</code>), schiebt alle dahinter ein Stück weiter, und wer einen entfernt (<code>delete</code>), lässt alle dahinter aufrücken.</p>`,
      rezept: [
        `<b>Aufschreiben:</b> Reihung mit den Positionen darüber (0, 1, 2 …) hinschreiben.`,
        `<b>Befehle der Reihe nach</b> ausführen, nach jedem den <b>ganzen Inhalt</b> neu aufschreiben (bei <code>insertAt</code>/<code>delete</code> verschiebt sich der Rest).`,
        `<b>Position prüfen:</b> Liegt der Index im erlaubten Bereich? Wenn nicht: Laufzeitfehler, in Programmen vorher mit <code>getLength()</code> abfragen.`,
        `<b>Beim Löschen in einer Schleife</b> von <b>hinten nach vorn</b> laufen, sonst werden Elemente übersprungen.`
      ],
      beispiel: {
        q: `Entwickle eine Operation, die aus einer dynamischen Reihung <code>d</code> mit ganzen Zahlen alle <b>negativen</b> Zahlen entfernt. Teste mit <code>[4, −2, −5, 7]</code>.`,
        steps: [
          { h: 'Idee: von hinten nach vorn', t: `Nach <code>delete(i)</code> rücken alle folgenden Elemente nach vorn. Läuft man von vorn, wird das Element übersprungen, das auf Position <code>i</code> nachrückt (bei <code>[−2, −5]</code> bliebe die −5). Von hinten nach vorn sind die noch nicht untersuchten Positionen davon nicht betroffen.` },
          { h: 'Struktogramm in Befehlen des Beipackzettels', t: code(`
entferneNegative(d: dynamische Reihung vom Inhaltstyp Ganzzahl)
    i ← d.getLength() − 1
    solange i ≥ 0
        wenn d.getItem(i) < 0
            d.delete(i)          // i ist hier gültig: 0 ≤ i < getLength()
        i ← i − 1`) },
          { h: 'Python', t: code(`
def entferne_negative(d):
    i = len(d) - 1
    while i >= 0:
        if d[i] < 0:
            del d[i]
        i = i - 1`) },
          { h: 'Tracetabelle für [4, −2, −5, 7]', t: tab(['i', 'd.getItem(i)', 'negativ?', 'Reihung danach'], [['3', '7', 'nein', '[4, −2, −5, 7]'], ['2', '−5', 'ja → delete(2)', '[4, −2, 7]'], ['1', '−2', 'ja → delete(1)', '[4, 7]'], ['0', '4', 'nein', '[4, 7]']]) + `Ergebnis: <code>[4, 7]</code>.` }
        ]
      },
      fehler: [
        `<code>delete(d.getLength())</code> oder <code>getItem(d.getLength())</code>: Diese Position gibt es nicht (die letzte ist <code>getLength() − 1</code>). Nur <code>insertAt</code> darf an <code>getLength()</code> einfügen.`,
        `Beim Löschen von vorn nach hinten ein Element überspringen, weil der Rest nachrückt.`,
        `Eine Abkürzung benutzen, die nicht auf dem Beipackzettel steht: <code>d.sort()</code>, <code>min(d)</code>, <code>d.remove(x)</code>, <code>x in d</code>, <code>d.index(x)</code>.`,
        `Bei zwei Dimensionen <code>[Spalte][Zeile]</code> statt <code>[Zeile][Spalte]</code> schreiben.`
      ],
      test: [
        { q: `Welche Positionen sind bei <code>insertAt(index, x)</code> erlaubt, wenn die Reihung 5 Elemente hat?`, a: `0 bis 5 (bei 5 wird hinten angefügt).` },
        { q: `Reihung <code>[4, 9, 7]</code>. Was ergibt <code>insertAt(1, 5)</code>?`, a: `<code>[4, 5, 9, 7]</code>.` },
        { q: `Was ist der Unterschied zwischen statischer und dynamischer Reihung?`, a: `Statisch: feste Größe, nur lesen/überschreiben. Dynamisch: kann mit <code>append</code>, <code>insertAt</code>, <code>delete</code> wachsen und schrumpfen.` },
        { q: `Wie muss man vor <code>delete(i)</code> absichern?`, a: `Mit einer Abfrage, dass <code>0 ≤ i</code> und <code>i &lt; getLength()</code> gilt.` }
      ]
    },
    {
      id: 'IB3', fach: F, num: 3, min: 12,
      title: 'Beipackzettel 3: Struktogramme in Abitur-Schreibweise',
      short: 'Signatur, //-Kommentare, „gib … zurück“, for-each, mod und /',
      idee: `<p>In den zentralen Prüfungen werden Algorithmen als <b>Struktogramm</b> dargestellt (Beipackzettel, Abschnitt 5). Wenn du selbst eins entwickelst, nutzt du dieselbe Schreibweise:</p>
${tab(['Was', 'So schreibt man es'], [
        ['Signatur der Operation', '<code>name(parameter: Typ, …): Rückgabetyp</code>, z. B. <code>anzahlGerade(a: dynamische Reihung vom Inhaltstyp Ganzzahl): Ganzzahl</code>'],
        ['Zuweisung', '<code>anzahl ← anzahl + 1</code> (oder sprachlich: „erhöhe anzahl um 1“)'],
        ['Kommentar', '<code>// Kommentar</code> (zwei Schrägstriche)'],
        ['Rückgabe', '<code>gib anzahl zurück</code>. Die Operation endet an dieser Stelle.'],
        ['Schleifen', '<code>für jedes x in a</code> (for-each), <code>für i von 0 bis n − 1</code> (zählergesteuert), <code>solange …</code>'],
        ['Division und Rest', '<code>a / b</code> ganzzahlig, <code>a mod b</code> Rest'],
        ['Zugriff', 'Dynamische Reihung: <code>a.getItem(i)</code>, <code>a.getLength()</code>; Stapel: <code>s.push(x)</code>, <code>s.pop()</code>; Schlange: <code>q.enqueue(x)</code>, <code>q.dequeue()</code>'],
        ['Zählung', 'Positionen beginnen bei 0 (im Struktogramm). Beim Implementieren gilt die Indizierung deiner Sprache.']
      ])}
<p>Das Struktogramm ist <b>unabhängig von der Programmiersprache</b>: Es enthält kein <code>range</code>, keinen Doppelpunkt, kein <code>len</code>.</p>`,
      bild: `<p>Das Struktogramm ist wie ein <b>Bauplan</b>, der überall auf der Welt gelesen werden kann. Python ist nur eine der Sprachen, in die du ihn später übersetzt.</p>`,
      rezept: [
        `<b>Kopf:</b> Signatur mit Parametern, Typen und Rückgabetyp aufschreiben.`,
        `<b>Zerlegen:</b> Startwerte, dann Schleife (for-each, wenn du den Index nicht brauchst), darin Verzweigung, am Ende Rückgabe.`,
        `<b>Befehle des Beipackzettels</b> benutzen, keine Python-Abkürzungen.`,
        `<b>Testen:</b> Tracetabelle mit einem kleinen Beispiel.`
      ],
      beispiel: {
        q: `Entwickle <code>anzahlGerade(a: dynamische Reihung vom Inhaltstyp Ganzzahl): Ganzzahl</code>, die zählt, wie viele Zahlen gerade sind. Teste mit <code>[3, 8, 6, 5]</code>.`,
        steps: [
          { h: 'Plan', t: `Den Index brauchen wir nicht, also reicht eine <b>for-each-Schleife</b>. Gerade heißt: <code>x mod 2 = 0</code>.` },
          { h: 'Struktogramm', t: ns(INF_A.anzahlGerade) },
          { h: 'Python', t: code(`
def anzahl_gerade(a):
    anzahl = 0
    for x in a:
        if x % 2 == 0:
            anzahl = anzahl + 1
    return anzahl`) },
          { h: 'Tracetabelle für [3, 8, 6, 5]', t: tab(['x', 'x mod 2 = 0?', 'anzahl'], [['Start', '–', '0'], ['3', 'nein', '0'], ['8', 'ja', '1'], ['6', 'ja', '2'], ['5', 'nein', '2']]) + `Rückgabe: <b>2</b>.` }
        ]
      },
      fehler: [
        `Python-Syntax im Struktogramm (<code>range(...)</code>, <code>len(a)</code>, <code>:</code>).`,
        `<code>/</code> mit der Kommadivision verwechseln: Im Struktogramm ist <code>/</code> bei ganzen Zahlen die Division ohne Rest.`,
        `Die Rückgabe vergessen oder in die Schleife gesetzt: „gib … zurück“ beendet die Operation sofort.`,
        `Signatur ohne Rückgabetyp, obwohl die Operation etwas zurückgibt.`
      ],
      test: [
        { q: `Was bedeutet „gib x zurück“ im Struktogramm?`, a: `Der Wert wird zurückgegeben und die Operation endet an dieser Stelle.` },
        { q: `Wie schreibt man einen Kommentar im Struktogramm?`, a: `Mit zwei Schrägstrichen: <code>// Kommentar</code>.` },
        { q: `Wann nimmst du eine for-each-Schleife?`, a: `Wenn alle Elemente der Reihe nach bearbeitet werden und du den Index nicht brauchst.` },
        { q: `Was ist <code>23 / 5</code> und <code>23 mod 5</code> im Struktogramm?`, a: `4 und 3.` }
      ]
    },
    // ---------------------------------------------------------------- Ordner: Ablauf & Struktogramme
    {
      id: 'IF1', fach: F, num: 4, min: 14, demo: 'i-trace', demoTitel: 'Schau zuerst: Ein Programm Schritt für Schritt',
      title: 'Programme lesen: Variablen und Tracetabelle',
      short: 'Zuweisung, Verzweigung, Schleife, Datentypen, // und %, Tracetabelle',
      idee: `<p>Ein <b>Algorithmus</b> ist eine eindeutige Schritt-für-Schritt-Anleitung. Um zu verstehen, was ein Programm tut, <b>spielst du den Computer</b>: Du führst jede Anweisung einzeln aus und schreibst auf, welche Werte die Variablen danach haben. Diese Tabelle heißt <b>Tracetabelle</b> (Ablaufprotokoll).</p>
${merke('Merke', `<p>Eine <b>Variable</b> ist ein benannter Speicherplatz. <code>x = x + 1</code> ist <b>keine Gleichung</b>: Erst wird rechts gerechnet, dann wird das Ergebnis in <code>x</code> gespeichert.</p>`)}
${tab(['Datentyp', 'Beispiel', 'Bemerkung'], [
        ['<code>int</code>', '<code>7</code>', 'ganze Zahl'],
        ['<code>float</code>', '<code>3.5</code>', 'Kommazahl (Punkt statt Komma)'],
        ['<code>str</code>', '<code>"Hallo"</code>', 'Zeichenkette; <code>+</code> verbindet Texte'],
        ['<code>bool</code>', '<code>True</code>, <code>False</code>', 'Wahrheitswert, Ergebnis eines Vergleichs']
      ])}
${tab(['Operator', 'Bedeutung', '7 ? 2'], [
        ['<code>/</code>', 'Division (Kommazahl)', '3.5'],
        ['<code>//</code>', 'ganzzahlige Division (abschneiden)', '3'],
        ['<code>%</code>', 'Rest bei der Division (Modulo)', '1'],
        ['<code>==</code> &nbsp; <code>!=</code>', 'gleich / ungleich (Vergleich)', 'False / True']
      ])}
<p><b>Zeichenketten</b> (<code>str</code>) sind Folgen von Zeichen: <code>len("Hallo")</code> ist 5, <code>"Hallo"[0]</code> ist <code>"H"</code> (Zählung ab 0), <code>"Ha" + "llo"</code> verbindet, <code>==</code> vergleicht. Welche Zeichenketten-Befehle in der Klausur erlaubt sind, steht auf dem <a class="link" href="#/befehle">Beipackzettel</a> (Lektion „Beipackzettel 1“).</p>
<p>Drei Bausteine reichen für jedes Programm: <b>Folge</b> (Anweisungen nacheinander), <b>Verzweigung</b> (<code>if</code>/<code>else</code>) und <b>Schleife</b> (<code>while</code>, <code>for</code>).</p>`,
      bild: `<p>Die Tracetabelle ist wie ein <b>Spielprotokoll beim Schach</b>: Nach jedem Zug steht fest, wie das Brett aussieht. Du brauchst den Code nicht zu „verstehen“, nur sauber auszuführen.</p>`,
      rezept: [
        `<b>Spalten anlegen:</b> eine pro Variable, dazu oft eine für die Schleifenbedingung und eine für Ausgaben.`,
        `<b>Startwerte eintragen</b> (die Zeilen vor der Schleife).`,
        `<b>Schleife:</b> Bedingung <b>vor jedem Durchlauf</b> prüfen. Eine neue Zeile pro Durchlauf, nur die geänderten Werte.`,
        `<b>Ende:</b> Die Bedingung wird einmal öfter geprüft, als der Rumpf läuft (letzte Prüfung = falsch → raus).`,
        `<b>Ausgabe</b> (<code>print</code>) am Ende notieren, und in Worten sagen, was das Programm berechnet.`
      ],
      beispiel: {
        q: `Was gibt das Programm aus? Was berechnet es?${code(`
z = 4721
s = 0
while z > 0:
    s = s + z % 10
    z = z // 10
print(s)`)}`,
        steps: [
          { h: 'Spalten und Startwerte', t: tab(['Durchlauf', 'z > 0?', 's', 'z'], [['Start', '–', '0', '4721']]) },
          { h: 'Durchläufe 1 bis 3', t: tab(['Durchlauf', 'z > 0?', 's', 'z'], [['1', 'wahr', '0 + 4721 % 10 = 1', '4721 // 10 = 472'], ['2', 'wahr', '1 + 472 % 10 = 3', '472 // 10 = 47'], ['3', 'wahr', '3 + 47 % 10 = 10', '47 // 10 = 4']]) },
          { h: 'Durchlauf 4 und Ende', t: tab(['Durchlauf', 'z > 0?', 's', 'z'], [['4', 'wahr', '10 + 4 % 10 = 14', '4 // 10 = 0'], ['Prüfung', 'falsch → Ende', '14', '0']]) },
          { h: 'Ausgabe und Bedeutung', t: `Ausgabe: <b>14</b>. <code>z % 10</code> ist die letzte Ziffer, <code>z // 10</code> schneidet sie ab: Das Programm berechnet die <b>Quersumme</b> (4+7+2+1 = 14).` }
        ]
      },
      fehler: [
        `<code>=</code> und <code>==</code> verwechselt: <code>=</code> <b>weist zu</b>, <code>==</code> <b>vergleicht</b>.`,
        `<code>/</code> liefert immer eine Kommazahl (<code>7 / 2</code> ergibt <code>3.5</code>). Für „abschneiden“ <code>//</code>, für den Rest <code>%</code>.`,
        `Letzte Prüfung der Schleifenbedingung vergessen. Dort steht „falsch“, und erst dann endet die Schleife.`,
        `<code>range(1, 5)</code> zählt nur 1, 2, 3, 4. Der Endwert ist <b>nicht</b> dabei.`
      ],
      test: [
        { q: `Was ist der Unterschied zwischen <code>=</code> und <code>==</code>?`, a: `<code>=</code> ist die Zuweisung (Wert speichern), <code>==</code> der Vergleich (liefert <code>True</code>/<code>False</code>).` },
        { q: `Wie viel ergeben <code>17 // 5</code> und <code>17 % 5</code>?`, a: `<code>17 // 5 = 3</code>, <code>17 % 5 = 2</code> (denn 3·5 + 2 = 17).` },
        { q: `Wie oft wird die Bedingung einer <code>while</code>-Schleife geprüft, wenn der Rumpf 4-mal läuft?`, a: `5-mal: vor jedem der 4 Durchläufe und noch einmal am Ende (falsch).` },
        { q: `Wofür braucht man eine Tracetabelle?`, a: `Um den Ablauf eines Programms zu dokumentieren und zu verstehen: Welche Variable hat nach jedem Schritt welchen Wert?` }
      ]
    },
    {
      id: 'IF2', fach: F, num: 5, min: 16,
      title: 'Struktogramme lesen und zeichnen',
      short: 'Nassi-Shneiderman: Folge, Verzweigung, Schleifen, Unterprogramm; Python ↔ Struktogramm',
      idee: `<p>Ein <b>Struktogramm</b> (Nassi-Shneiderman-Diagramm, DIN 66261) stellt einen Algorithmus <b>ohne Sprünge</b> dar. Es ist <b>unabhängig von der Programmiersprache</b>: Wer es liest, soll den Ablauf in jede Sprache übertragen können.</p>
${tab(['Baustein', 'Aussehen', 'Python'], [
        ['Anweisung (Folge)', 'Rechteck, von oben nach unten', 'Zeile für Zeile'],
        ['Verzweigung', 'Dreieck mit <b>ja</b> / <b>nein</b>', '<code>if … else</code>'],
        ['Mehrfachauswahl', 'Fälle nebeneinander + „sonst“', '<code>if … elif … else</code>'],
        ['Schleife kopfgesteuert', 'Bedingung <b>oben</b>, Rumpf eingerückt', '<code>while</code>'],
        ['Schleife fußgesteuert', 'Bedingung <b>unten</b> (mind. 1 Durchlauf)', 'gibt es in Python nicht (<code>while True</code> + <code>break</code>)'],
        ['Schleife zählergesteuert', '<code>für i von 1 bis n</code>', '<code>for i in range(…)</code>'],
        ['Unterprogramm', 'Rechteck mit <b>Doppelstrich</b> an den Seiten', 'Funktionsaufruf']
      ])}
${merke('Regeln', `<ul><li>Im Struktogramm steht <b>keine Programmiersprachen-Syntax</b> (kein <code>range</code>, keine Doppelpunkte). Zuweisung mit Pfeil: <code>x ← x + 1</code>.</li><li>Die <b>Initialisierung</b> (Startwert setzen) gehört hinein, die <b>Deklaration</b> (Typ festlegen) nicht.</li><li>Eine Operation bekommt einen Kopf <code>name(Parameter: Typ): Rückgabetyp</code> und liefert ihr Ergebnis mit <code>gib … zurück</code> (die Operation endet dort). Kommentare mit <code>//</code>. Division <code>/</code> ganzzahlig, Rest mit <code>mod</code>. Mehr dazu: Lektion „Beipackzettel 3“.</li></ul>`)}`,
      bild: `<p>Wie ein <b>Bauplan mit festen Bauteilen</b>: Jedes Teil hat genau einen Eingang oben und einen Ausgang unten. Wer ein Teil in ein anderes steckt (Schleife in Verzweigung), schachtelt sie ineinander.</p>`,
      rezept: [
        `<b>Klären:</b> Was kommt rein (Parameter/Eingabe), was soll raus (Rückgabe/Ausgabe)?`,
        `<b>Zerlegen:</b> Reihenfolge → Folge. Entscheidung → Verzweigung. Wiederholung: Wenn die Anzahl bekannt ist → zählergesteuert, sonst → <code>solange</code>.`,
        `<b>Von außen nach innen</b> zeichnen, Verschachtelung durch Einrückung der Kästen.`,
        `<b>Testen:</b> Mit zwei, drei Beispielwerten durchspielen (Tracetabelle), auch mit dem Sonderfall.`
      ],
      beispiel: {
        q: `Schaltjahr: Ein Jahr ist ein Schaltjahr, wenn es durch 4 teilbar ist. Ausnahme: durch 100 teilbar → kein Schaltjahr, es sei denn, es ist durch 400 teilbar. Entwickle ein Struktogramm für <code>istSchaltjahr(jahr)</code>.`,
        steps: [
          { h: 'Reihenfolge der Prüfungen', t: `Die <b>Ausnahme von der Ausnahme</b> muss zuerst geprüft werden: erst 400, dann 100, dann 4. Sonst würde 1900 schon bei „durch 4 teilbar“ als Schaltjahr gelten.` },
          { h: 'Struktogramm', t: schaltjahr ? ns(schaltjahr) : '' },
          { h: 'Übertragung in Python', t: code(`
def ist_schaltjahr(jahr):
    if jahr % 400 == 0:
        return True
    if jahr % 100 == 0:
        return False
    return jahr % 4 == 0`) },
          { h: 'Test mit Sonderfällen', t: tab(['Jahr', 'Weg durch das Struktogramm', 'Ergebnis'], [['2000', 'durch 400 teilbar', 'wahr'], ['1900', 'nicht durch 400, aber durch 100', 'falsch'], ['2024', 'nicht durch 100, durch 4 teilbar', 'wahr'], ['2023', 'durch 4 nicht teilbar', 'falsch']]) }
        ]
      },
      fehler: [
        `Prüfungen in der falschen Reihenfolge (Ausnahme zuletzt): Dann kommen falsche Ergebnisse bei 1900 oder 2100.`,
        `Python-Syntax im Struktogramm (<code>range(1, n)</code>, <code>:</code>, <code>==</code>). Besser: „für i von 1 bis n−1“, „=“.`,
        `<b>ja</b>- und <b>nein</b>-Zweig vertauscht oder einen Zweig leer gelassen, obwohl dort etwas passieren muss.`,
        `Schleife kopf- und fußgesteuert verwechselt: Bei der <b>fußgesteuerten</b> Schleife läuft der Rumpf mindestens einmal.`,
        `Startwert nicht gesetzt (z. B. <code>summe ← 0</code> fehlt vor der Schleife).`
      ],
      test: [
        { q: `Welche Schleife läuft mindestens einmal?`, a: `Die <b>fußgesteuerte</b>: Die Bedingung steht unten und wird erst nach dem ersten Durchlauf geprüft.` },
        { q: `Was bedeutet der Doppelstrich an den Seiten eines Kastens?`, a: `Aufruf eines Unterprogramms (einer Operation/Funktion).` },
        { q: `Gehört <code>zaehler ← 0</code> ins Struktogramm? Und die Typangabe <code>int zaehler</code>?`, a: `Die Initialisierung ja (logische Anweisung), die Deklaration nein.` },
        { q: `Warum sind Struktogramme sprachunabhängig?`, a: `Sie nutzen nur Grundbausteine (Folge, Verzweigung, Schleife), keine Befehle einer bestimmten Sprache.` }
      ]
    },
    {
      id: 'IF3', fach: F, num: 6, min: 14,
      title: 'Funktionen, lokale Variablen und Fehlertypen',
      short: 'Parameter, return, lokal/global, Modularisierung, Syntax-/Laufzeit-/Logikfehler',
      idee: `<p>Eine <b>Funktion</b> (in der Schule oft „Operation“ oder „Unterprogramm“) ist ein benannter Block mit <b>Parametern</b> (Eingabe) und einem <b>Rückgabewert</b> (Ergebnis).</p>
${merke('Merke', `<ul><li><code>return</code> beendet die Funktion und gibt einen Wert <b>zurück</b>. <code>print</code> zeigt nur etwas auf dem Bildschirm an.</li><li><b>Lokale Variablen</b> (auch die Parameter) gibt es nur während des Aufrufs. Eine gleichnamige globale Variable bleibt unverändert.</li><li><b>Listen</b> werden als Verweis übergeben: Verändert die Funktion den Inhalt, ist das auch außerhalb sichtbar.</li></ul>`)}
<p><b>Modularisierung</b> heißt, ein Programm in Teilaufgaben (Funktionen, Module) zu zerlegen. Vorteile: wiederverwendbar, übersichtlich, einzeln testbar, im Team aufteilbar, Änderungen nur an einer Stelle.</p>
${tab(['Fehlertyp', 'Wann bemerkt?', 'Beispiel'], [
        ['<b>Syntaxfehler</b>', 'vor dem Start (Interpreter meldet die Zeile)', 'Doppelpunkt nach <code>if</code> vergessen'],
        ['<b>Laufzeitfehler</b>', 'während des Laufs, Programm bricht ab', '<code>liste[5]</code> bei 3 Elementen (IndexError), Teilen durch 0'],
        ['<b>Logikfehler</b>', 'gar nicht von selbst: läuft, liefert aber Falsches', 'falscher Startwert, <code>&lt;</code> statt <code>&lt;=</code>']
      ])}`,
      bild: `<p>Eine Funktion ist wie ein <b>Rezept in einer Küche</b>: Du gibst Zutaten (Parameter), bekommst ein Gericht (Rückgabe), und die Töpfe, die du dabei benutzt (lokale Variablen), werden danach weggeräumt.</p>`,
      rezept: [
        `<b>Aufruf verfolgen:</b> Parameter mit den übergebenen Werten belegen (Zahl: Kopie, Liste: Verweis).`,
        `<b>Rumpf</b> mit eigener Tracetabelle ausführen. Neue Variablen im Rumpf sind <b>lokal</b>.`,
        `<b>Ergebnis</b> an der Aufrufstelle einsetzen (<code>return</code>-Wert).`,
        `<b>Fehler einordnen:</b> Meldet der Interpreter etwas vor dem Start → Syntax. Bricht es ab → Laufzeit. Läuft es durch, aber falsch → Logik (mit Testwerten suchen).`
      ],
      beispiel: {
        q: `Was gibt das Programm aus?${code(`
x = 5

def f(a, liste):
    x = a * 2
    liste.append(x)
    return x + 1

l = [1]
y = f(3, l)
print(x, y, l)`)}`,
        steps: [
          { h: 'Globale Werte', t: `<code>x = 5</code>, <code>l = [1]</code>.` },
          { h: 'Aufruf f(3, l)', t: `Parameter: <code>a = 3</code>. <code>liste</code> zeigt auf <b>dieselbe</b> Liste wie <code>l</code>.` },
          { h: 'Rumpf', t: `<code>x = a * 2</code> legt eine <b>lokale</b> Variable <code>x = 6</code> an. Das globale <code>x</code> bleibt 5. <code>liste.append(6)</code> verändert die gemeinsame Liste: <code>[1, 6]</code>. Rückgabe: <code>6 + 1 = 7</code>.` },
          { h: 'Ausgabe', t: `<code>y = 7</code>, also <b><code>5 7 [1, 6]</code></b>.` }
        ]
      },
      fehler: [
        `<code>print</code> statt <code>return</code>: Die Funktion gibt dann <code>None</code> zurück, ein weiterer Rechenschritt mit dem Ergebnis schlägt fehl.`,
        `Glauben, eine Zuweisung in der Funktion ändere die globale Variable. Sie legt eine <b>neue lokale</b> an.`,
        `Parameterübergabe verwechselt: Eine Zahl wird kopiert (Original bleibt), bei einer Liste verändert die Funktion das Original.`,
        `Logikfehler nicht gefunden, weil nur ein Testwert benutzt wurde. Immer Sonderfälle testen (leere Liste, negative Zahlen, Grenzwerte).`
      ],
      test: [
        { q: `Unterschied zwischen <code>return</code> und <code>print</code>?`, a: `<code>return</code> liefert den Wert an den Aufrufer, <code>print</code> gibt ihn nur auf dem Bildschirm aus.` },
        { q: `Nenne drei Vorteile der Modularisierung.`, a: `Wiederverwendung, bessere Übersicht, einzeln testbar (auch: Teamarbeit, Änderung an einer Stelle).` },
        { q: `Wie heißen die drei Fehlertypen und woran erkennt man sie?`, a: `Syntaxfehler (vor dem Start gemeldet), Laufzeitfehler (Abbruch mit Meldung), Logikfehler (läuft, aber falsches Ergebnis).` },
        { q: `Was passiert mit einer lokalen Variablen nach dem Ende des Funktionsaufrufs?`, a: `Sie existiert nicht mehr.` }
      ]
    },

    // ---------------------------------------------------------------- Ordner: Listen & Sortieren
    {
      id: 'IF4', fach: F, num: 7, min: 16,
      title: 'Listen und Standardalgorithmen',
      short: 'Index ab 0, Summe, Maximum, Suchen, Zählen, 2D-Reihungen, Tupel',
      idee: `<p>Eine <b>Liste</b> (auch Reihung oder Array genannt) speichert viele Werte unter einem Namen. Der <b>Index beginnt bei 0</b>, der letzte Index ist <code>len(liste) - 1</code>.</p>
<p>In der Klausur gelten für <b>dynamische Reihungen</b> genau die Befehle des <a class="link" href="#/befehle">Beipackzettels</a>:</p>
${tab(['Beipackzettel', 'Python', 'Wirkung'], [
        ['<code>DynArray()</code>', '<code>l = []</code>', 'leere Reihung'],
        ['<code>getItem(i)</code>', '<code>l[i]</code>', 'Element an Position i lesen'],
        ['<code>append(x)</code>', '<code>l.append(x)</code>', 'hinten anfügen'],
        ['<code>insertAt(i, x)</code>', '<code>l.insert(i, x)</code>', 'einfügen, Rest rückt nach hinten'],
        ['<code>setItem(i, x)</code>', '<code>l[i] = x</code>', 'Element überschreiben'],
        ['<code>delete(i)</code>', '<code>del l[i]</code>', 'entfernen, Rest rückt nach vorn'],
        ['<code>getLength()</code>', '<code>len(l)</code>', 'Anzahl Elemente'],
        ['<code>isEmpty()</code>', '<code>len(l) == 0</code>', 'leer?']
      ])}
${merke('Standardmuster (immer dasselbe Gerüst)', `<ul><li><b>Summe/Zählen:</b> Startwert 0, in der Schleife addieren bzw. bei Treffer um 1 erhöhen.</li><li><b>Maximum/Minimum:</b> Startwert = <b>erstes Element</b> (nicht 0!), jedes weitere vergleichen.</li><li><b>Suchen:</b> Schleife über alle Positionen, bei Treffer merken oder zurückgeben.</li><li><b>2D-Liste:</b> Liste von Listen, <code>m[zeile][spalte]</code>, zwei geschachtelte Schleifen.</li></ul>`)}
<p>Ein <b>Tupel</b> (<code>(3, 5)</code>) ist wie eine Liste, aber <b>nicht veränderbar</b>. Zwei Werte gleichzeitig zurückgeben geht über ein Tupel: <code>return maximum, position</code>.</p>`,
      bild: `<p>Eine Liste ist wie eine <b>Reihe nummerierter Schließfächer</b>, die bei 0 anfängt. Einfügen in der Mitte heißt: alle dahinter ein Fach weiterrücken.</p>`,
      rezept: [
        `<b>Was soll herauskommen?</b> Ein Wert (Summe, Maximum), eine Position oder eine neue Liste?`,
        `<b>Startwert</b> festlegen (0, erstes Element, leere Liste).`,
        `<b>Schleife</b> über Werte (<code>for x in liste</code>) oder über Positionen (<code>for i in range(len(liste))</code>), wenn der Index gebraucht wird.`,
        `<b>Grenzfälle</b> prüfen: leere Liste, ein Element, mehrere gleiche Werte (nimmt man <code>&gt;</code> oder <code>&gt;=</code>?).`
      ],
      beispiel: {
        q: `Schreibe <code>max_mit_position(liste)</code>: Sie gibt das größte Element und die Position seines <b>ersten</b> Vorkommens zurück. Teste mit <code>[4, 9, 2, 9, 5]</code>.`,
        steps: [
          { h: 'Startwerte', t: `Maximum = erstes Element, Position = 0. Die Suche beginnt beim Index 1, denn Index 0 ist schon „gesehen“.` },
          { h: 'Code', t: code(`
def max_mit_position(liste):
    maximum = liste[0]
    position = 0
    for i in range(1, len(liste)):
        if liste[i] > maximum:
            maximum = liste[i]
            position = i
    return maximum, position`) },
          { h: 'Tracetabelle für [4, 9, 2, 9, 5]', t: tab(['i', 'liste[i]', 'liste[i] &gt; maximum?', 'maximum', 'position'], [['Start', '–', '–', '4', '0'], ['1', '9', 'wahr', '9', '1'], ['2', '2', 'falsch', '9', '1'], ['3', '9', 'falsch (9 &gt; 9 ist falsch)', '9', '1'], ['4', '5', 'falsch', '9', '1']]) },
          { h: 'Ergebnis und Deutung', t: `Rückgabe <code>(9, 1)</code>. Wegen <code>&gt;</code> (nicht <code>&gt;=</code>) bleibt die <b>erste</b> 9 maßgeblich.` }
        ]
      },
      fehler: [
        `<code>liste[len(liste)]</code>: Der letzte Index ist <code>len(liste) - 1</code> (IndexError).`,
        `Maximum mit Startwert 0: Bei lauter negativen Zahlen kommt fälschlich 0 heraus.`,
        `<code>liste2 = liste</code> <b>kopiert nicht</b>: Beide Namen zeigen auf dieselbe Liste. Kopie: <code>liste2 = liste.copy()</code>.`,
        `Elemente aus einer Liste löschen, während man sie mit <code>for</code> durchläuft: Positionen verschieben sich.`
      ],
      test: [
        { q: `Wie lautet der letzte gültige Index einer Liste mit 7 Elementen?`, a: `6 (Zählung beginnt bei 0).` },
        { q: `Welcher Beipackzettel-Befehl entspricht <code>l.insert(2, "x")</code>?`, a: `<code>insertAt(2, "x")</code>: Das Element an Position 2 und alle folgenden rücken nach hinten.` },
        { q: `Warum ist <code>maximum = 0</code> als Startwert riskant?`, a: `Bei nur negativen Zahlen würde 0 als „Maximum“ gelten, obwohl es nicht in der Liste steht.` },
        { q: `Wie greift man auf Zeile 1, Spalte 2 einer 2D-Liste <code>m</code> zu?`, a: `<code>m[1][2]</code> (Zeile zuerst, beide ab 0).` }
      ]
    },
    {
      id: 'IF5', fach: F, num: 8, min: 18, demo: 'i-sort', demoTitel: 'Schau zuerst: Drei Sortierverfahren im Vergleich',
      title: 'Sortieren: Selection-, Insertion- und Bubblesort',
      short: 'Drei einfache Verfahren, Ablauf, Code, Vergleiche und Vertauschungen zählen',
      idee: `<p>Ein Sortierverfahren ordnet eine Liste, hier <b>aufsteigend</b>. Die drei einfachen Verfahren arbeiten „vorn nach hinten“, unterscheiden sich aber im Vorgehen:</p>
${tab(['Verfahren', 'Idee', 'Nach Durchlauf i gilt'], [
        ['<b>Selectionsort</b> (Auswählen)', 'Suche das <b>kleinste</b> Element im unsortierten Rest, tausche es nach vorn.', 'die ersten i Elemente sind endgültig sortiert'],
        ['<b>Insertionsort</b> (Einfügen)', 'Nimm das nächste Element und <b>schiebe es an die passende Stelle</b> im sortierten Teil.', 'die ersten i+1 Elemente sind <b>untereinander</b> sortiert'],
        ['<b>Bubblesort</b> (Blasen)', 'Vergleiche <b>Nachbarn</b> und tausche, wenn sie falsch stehen. Das Größte „steigt nach hinten auf“.', 'die letzten i Elemente sind endgültig sortiert']
      ])}
${code(`
def selectionsort(l):
    for i in range(len(l) - 1):
        kleinste = i
        for j in range(i + 1, len(l)):
            if l[j] < l[kleinste]:
                kleinste = j
        l[i], l[kleinste] = l[kleinste], l[i]
    return l

def insertionsort(l):
    for i in range(1, len(l)):
        wert = l[i]
        j = i - 1
        while j >= 0 and l[j] > wert:
            l[j + 1] = l[j]
            j = j - 1
        l[j + 1] = wert
    return l

def bubblesort(l):
    n = len(l)
    for i in range(n - 1):
        for j in range(n - 1 - i):
            if l[j] > l[j + 1]:
                l[j], l[j + 1] = l[j + 1], l[j]
    return l`)}
${merke('Vertauschen', `<p>Zwei Werte tauschen geht in Python mit <code>a, b = b, a</code>. In jeder anderen Sprache (und im Struktogramm) braucht man eine <b>Hilfsvariable</b>: <code>h ← a; a ← b; b ← h</code>.</p>`)}`,
      bild: `<p><b>Selection:</b> Kartenspiel auf dem Tisch ausbreiten, immer die kleinste Karte nach links legen. <b>Insertion:</b> Karten auf der Hand einsortieren. <b>Bubble:</b> Nachbarn so lange tauschen, bis nichts mehr zu tauschen ist.</p>`,
      rezept: [
        `<b>Verfahren erkennen</b> am Aufbau: kleinsten suchen + 1 Tausch (Selection), Verschieben + Einsetzen (Insertion), Nachbarvergleiche (Bubble).`,
        `<b>Zustand nach jedem Durchlauf</b> der äußeren Schleife aufschreiben (die ganze Liste).`,
        `<b>Zählen:</b> Vergleiche (<code>if</code>-Prüfungen) und Vertauschungen/Verschiebungen getrennt notieren.`,
        `<b>Grenzen beachten:</b> <code>range(n - 1 - i)</code> beim Bubblesort, sonst greift <code>l[j + 1]</code> ins Leere.`
      ],
      beispiel: {
        q: `Sortiere <code>[5, 2, 4, 1]</code> mit allen drei Verfahren und gib die Liste nach jedem Durchlauf der äußeren Schleife an.`,
        steps: [
          { h: 'Selectionsort', t: tab(['Durchlauf i', 'kleinstes im Rest', 'Liste danach'], [['0', '1 (Index 3)', '[1, 2, 4, 5]'], ['1', '2 (Index 1)', '[1, 2, 4, 5]'], ['2', '4 (Index 2)', '[1, 2, 4, 5]']]) + `Vergleiche: 3 + 2 + 1 = <b>6</b> (immer n(n−1)/2).` },
          { h: 'Insertionsort', t: tab(['Durchlauf i', 'einzusortieren', 'Liste danach'], [['1', '2', '[2, 5, 4, 1]'], ['2', '4', '[2, 4, 5, 1]'], ['3', '1', '[1, 2, 4, 5]']]) + `Verschiebungen: 1 + 1 + 3 = <b>5</b>.` },
          { h: 'Bubblesort', t: tab(['Durchlauf i', 'Vertauschungen', 'Liste danach'], [['0', '(5,2) (5,4) (5,1) → 3', '[2, 4, 1, 5]'], ['1', '(4,1) → 1', '[2, 1, 4, 5]'], ['2', '(2,1) → 1', '[1, 2, 4, 5]']]) + `Vergleiche: 3 + 2 + 1 = <b>6</b>, Vertauschungen: <b>5</b>.` },
          { h: 'Auffällig', t: `Alle drei brauchen hier 6 Vergleiche bzw. 5 Verschiebungen/Vertauschungen. 5 ist die Anzahl der <b>Fehlstände</b> (Paare in falscher Reihenfolge): Bubble- und Insertionsort leisten genau diese Arbeit.` }
        ]
      },
      fehler: [
        `Tauschen ohne Hilfsvariable (<code>a = b; b = a</code>): Danach sind beide Werte gleich, ein Wert ist verloren.`,
        `Bubblesort mit <code>range(n)</code> statt <code>range(n - 1 - i)</code>: <code>l[j + 1]</code> greift über das Listenende (IndexError).`,
        `Selectionsort und Bubblesort verwechselt: Selection tauscht <b>einmal pro Durchlauf</b> (nach der Suche), Bubble tauscht <b>laufend</b> Nachbarn.`,
        `Bei Insertionsort vergessen, das Element <code>wert</code> zwischenzuspeichern, bevor man verschiebt.`
      ],
      test: [
        { q: `Was ist nach dem 1. Durchlauf von Bubblesort sicher richtig?`, a: `Das größte Element steht ganz hinten an seiner endgültigen Stelle.` },
        { q: `Wie viele Vergleiche macht Selectionsort bei 10 Elementen?`, a: `9 + 8 + … + 1 = 45 = 10·9/2, unabhängig von der Anordnung.` },
        { q: `Welches der drei Verfahren ist bei einer schon sortierten Liste am schnellsten?`, a: `Insertionsort: nur n−1 Vergleiche, keine Verschiebungen.` },
        { q: `Wie tauscht man zwei Werte in einem Struktogramm?`, a: `Mit Hilfsvariable: h ← a, a ← b, b ← h.` }
      ]
    },
    {
      id: 'IF6', fach: F, num: 9, min: 14, demo: 'i-laufzeit', demoTitel: 'Probier es aus: Wie schnell wächst die Rechenzeit?',
      title: 'Laufzeit und Komplexität',
      short: 'Schritte zählen, O(1), O(n), O(n²), O(2ⁿ), Verdopplungstest',
      idee: `<p>Die <b>Laufzeitkomplexität</b> sagt, wie stark die Anzahl der Schritte mit der Eingabegröße <b>n</b> wächst. Man zählt Grundoperationen (Vergleiche, Zuweisungen), <b>keine Sekunden</b>: Sekunden hängen vom Rechner ab, die Schrittzahl nicht.</p>
${tab(['Ordnung', 'Beispiel', 'n verdoppeln'], [
        ['O(1) konstant', 'Zugriff <code>l[i]</code>', 'gleich viel'],
        ['O(n) linear', 'lineare Suche, Maximum, Summe', '2-mal so viel'],
        ['O(n²) quadratisch', 'Selection-, Insertion-, Bubblesort (zwei Schleifen)', '4-mal so viel'],
        ['O(2ⁿ) exponentiell', 'naives rekursives Fibonacci', 'Quadrat der alten Zahl']
      ])}
${merke('So bestimmst du die Ordnung', `<ul><li>Zähle, wie oft die <b>innerste Anweisung</b> ausgeführt wird, abhängig von n.</li><li><b>Hintereinander</b> → addieren, <b>geschachtelt</b> → multiplizieren.</li><li>Konstante Faktoren und kleinere Summanden weglassen: <code>n(n−1)/2</code> = <code>n²/2 − n/2</code> → O(n²).</li><li><b>Worst Case</b> (schlimmster Fall) ist die übliche Angabe.</li></ul>`)}`,
      bild: `<p>Wie eine <b>Wegstrecke bei Verdopplung</b>: Wer für 1000 Elemente einen Tag braucht, braucht bei O(n) für 2000 zwei Tage, bei O(n²) vier Tage und bei O(2ⁿ) mehr Zeit, als es Atome im Universum gibt.</p>`,
      rezept: [
        `<b>Eingabegröße n</b> festlegen (Länge der Liste, Zahl n).`,
        `<b>Schleifen zählen:</b> eine Schleife über n → n Schritte. Schleife in Schleife → n·n. Innere Schleife kürzer werdend (<code>range(i + 1, n)</code>) → n(n−1)/2, trotzdem O(n²).`,
        `<b>Konstanten streichen</b> und die am schnellsten wachsende Potenz nennen.`,
        `<b>Best/Worst Case:</b> Beim Insertionsort sortiert: n−1 Vergleiche (O(n)); umgekehrt sortiert: n(n−1)/2 (O(n²)).`
      ],
      beispiel: {
        q: `Bubblesort (ohne Abbruchbedingung) sortiert eine Liste mit n = 1000 Elementen. Wie viele Vergleiche sind es, und wie viele bei n = 2000?`,
        steps: [
          { h: 'Vergleiche je Durchlauf', t: `Der innere Durchlauf <code>i</code> macht <code>n − 1 − i</code> Vergleiche: <code>(n−1) + (n−2) + … + 1</code>.` },
          { h: 'Summenformel', t: `Das sind <code>n(n−1)/2</code> Vergleiche.` },
          { h: 'Einsetzen', t: `n = 1000: <code>1000 · 999 / 2 = 499 500</code>. n = 2000: <code>2000 · 1999 / 2 = 1 999 000</code>.` },
          { h: 'Deuten', t: `Doppelte Länge → rund <b>4-mal</b> so viele Vergleiche (1 999 000 / 499 500 ≈ 4,0). Das ist typisch für <b>O(n²)</b>.` }
        ]
      },
      fehler: [
        `„O(n²) heißt genau n² Schritte.“ Nein, es beschreibt nur die <b>Wachstumsart</b>; Faktoren und kleinere Terme fallen weg.`,
        `Laufzeit in Sekunden angeben. Gefragt ist die <b>Anzahl der Schritte in Abhängigkeit von n</b>.`,
        `Zwei <b>hintereinander</b> stehende Schleifen wie eine geschachtelte rechnen: Hintereinander wird addiert (n + n = O(n)), geschachtelt multipliziert.`,
        `Meinen, ein schnellerer Rechner ändere die Ordnung. Er ändert nur den Faktor.`
      ],
      test: [
        { q: `Wie ändert sich die Schrittzahl bei O(n²), wenn n verdoppelt wird?`, a: `Sie vervierfacht sich.` },
        { q: `Zu welcher Ordnung gehören die drei einfachen Sortierverfahren?`, a: `O(n²) im Worst Case.` },
        { q: `Warum zählt man Schritte statt Sekunden?`, a: `Sekunden hängen vom Rechner ab, die Schrittzahl ist eine Eigenschaft des Algorithmus.` },
        { q: `Welche Ordnung hat die lineare Suche im schlimmsten Fall?`, a: `O(n): Das gesuchte Element steht ganz hinten oder fehlt.` }
      ]
    },

    // ---------------------------------------------------------------- Ordner: Rekursion
    {
      id: 'IF7', fach: F, num: 10, min: 18, demo: 'i-rekursion', demoTitel: 'Schau zuerst: Der Aufrufstapel wächst und schrumpft',
      title: 'Rekursion: Abbruch, Schritt, Aufrufstapel',
      short: 'Selbstaufruf, Abbruchbedingung, Problemreduktion, summe(n), Fakultät',
      idee: `<p>Eine Funktion ist <b>rekursiv</b>, wenn sie sich <b>selbst aufruft</b>. Jede rekursive Funktion braucht zwei Teile:</p>
${merke('Merke', `<ul><li><b>Abbruchbedingung</b> (Rekursionsanker): der kleinste Fall, der direkt gelöst wird, <b>ohne</b> weiteren Selbstaufruf.</li><li><b>Rekursionsschritt</b> (Problemreduktion): das Problem wird auf ein <b>kleineres gleichartiges</b> Problem zurückgeführt.</li></ul>`)}
<p>Jeder Aufruf bekommt seine <b>eigenen Variablen</b> und wird auf dem <b>Aufrufstapel</b> abgelegt (dorthin gehört auch die Rücksprungadresse, vgl. Lektion „Stapel“). Der Stapel wächst beim Abstieg, bei der Rückkehr schrumpft er. Die <b>Rekursionstiefe</b> ist die Zahl der gleichzeitig offenen, ineinander verschachtelten Aufrufe (manche zählen den ersten Aufruf nicht mit, achte auf die Aufgabenstellung). Zu tief → <code>RecursionError</code> (Stack Overflow).</p>
${code(`
def summe(n):            # 1 + 2 + ... + n
    if n == 0:           # Abbruchbedingung
        return 0
    return n + summe(n - 1)   # Rekursionsschritt

def fakultaet(n):        # n! = n * (n-1)!, 0! = 1
    if n == 0:
        return 1
    return n * fakultaet(n - 1)`)}`,
      bild: `<p>Wie <b>russische Matroschka-Puppen</b>: Du öffnest jede Puppe (Abstieg), bis die kleinste da ist (Abbruch), dann setzt du sie von innen nach außen wieder zusammen (Rückkehr mit Ergebnissen).</p>`,
      rezept: [
        `<b>Kleinsten Fall</b> bestimmen und sein Ergebnis festlegen (Abbruch).`,
        `<b>Schritt formulieren:</b> Wie folgt die Lösung für n aus der Lösung für n−1 (oder einem kleineren Wert)?`,
        `<b>Prüfen:</b> Nähert sich jeder Selbstaufruf dem Abbruch? (Argument wird kleiner, Liste wird kürzer.)`,
        `<b>Dokumentieren:</b> Aufrufe untereinander aufschreiben (Abstieg), dann von unten die Rückgabewerte einsetzen (Aufstieg).`
      ],
      beispiel: {
        q: `Dokumentiere <code>summe(4)</code> mit den Aufrufen und Rückgabewerten.`,
        steps: [
          { h: 'Abstieg: Aufrufe', t: tab(['Aufruf', 'Abbruch?', 'wartet auf'], [['summe(4)', 'nein', '4 + summe(3)'], ['summe(3)', 'nein', '3 + summe(2)'], ['summe(2)', 'nein', '2 + summe(1)'], ['summe(1)', 'nein', '1 + summe(0)'], ['summe(0)', '<b>ja</b> → gibt 0 zurück', '–']]) },
          { h: 'Aufstieg: Rückgabewerte', t: tab(['Aufruf', 'gibt zurück'], [['summe(0)', '0'], ['summe(1)', '1 + 0 = 1'], ['summe(2)', '2 + 1 = 3'], ['summe(3)', '3 + 3 = 6'], ['summe(4)', '4 + 6 = <b>10</b>']]) },
          { h: 'Bilanz', t: `5 Aufrufe insgesamt (n + 1). Wenn <code>summe(0)</code> läuft, sind alle 5 gleichzeitig offen: Rekursionstiefe 5 (ohne den ersten Aufruf gerechnet: 4). Ergebnis 10 = 1+2+3+4.` }
        ]
      },
      fehler: [
        `<b>Abbruchbedingung fehlt</b> oder wird nie erreicht (<code>summe(n + 1)</code>): Endlose Rekursion bis <code>RecursionError</code>.`,
        `<code>return</code> vergessen: Der Selbstaufruf wird berechnet, aber verworfen; die Funktion liefert <code>None</code>.`,
        `Den Selbstaufruf mit demselben Argument wiederholen (<code>summe(n)</code>): Es wird nichts kleiner.`,
        `Bei der Dokumentation nur den Abstieg aufschreiben und die Rückgabewerte vergessen.`
      ],
      test: [
        { q: `Aus welchen zwei Teilen besteht jede rekursive Funktion?`, a: `Abbruchbedingung (direkt lösbarer Fall) und Rekursionsschritt (Selbstaufruf mit kleinerem Problem).` },
        { q: `Wie viele Aufrufe macht <code>fakultaet(5)</code> (der erste mitgezählt)?`, a: `6: für n = 5, 4, 3, 2, 1, 0.` },
        { q: `Was passiert ohne Abbruchbedingung?`, a: `Die Aufrufe hören nie auf, der Aufrufstapel läuft voll: <code>RecursionError</code> / Stack Overflow.` },
        { q: `Wo merkt sich der Computer die laufenden Aufrufe?`, a: `Auf dem Aufrufstapel (Stack), mit den lokalen Variablen und der Rücksprungadresse.` }
      ]
    },
    {
      id: 'IF8', fach: F, num: 11, min: 18, demo: 'i-fib', demoTitel: 'Schau zuerst: Der Aufrufbaum von Fibonacci',
      title: 'Fibonacci: rekursiv oder mit Schleife?',
      short: 'fib(n) rekursiv/iterativ, Aufrufbaum, Laufzeit',
      idee: `<p>Die <b>Fibonacci-Folge</b>: 0, 1, 1, 2, 3, 5, 8, 13, 21, … Jede Zahl ist die Summe der beiden davor: <code>fib(n) = fib(n−1) + fib(n−2)</code>, Abbruch: <code>fib(0) = 0</code>, <code>fib(1) = 1</code>.</p>
${code(`
def fib_rek(n):
    if n < 2:
        return n
    return fib_rek(n - 1) + fib_rek(n - 2)

def fib_iter(n):
    a = 0
    b = 1
    for i in range(n):
        a, b = b, a + b
    return a`)}
<p>Die rekursive Version hat <b>zwei</b> Selbstaufrufe: Es entsteht ein <b>Aufrufbaum</b>, in dem dieselben Teilaufgaben <b>mehrfach</b> berechnet werden. Die Anzahl der Aufrufe wächst <b>exponentiell</b> (O(2ⁿ)), die Schleife braucht nur n Schritte (O(n)).</p>
${tab(['n', 'fib(n)', 'Aufrufe rekursiv'], [['4', '3', '9'], ['5', '5', '15'], ['10', '55', '177'], ['20', '6765', '21 891'], ['30', '832 040', '2 692 537']])}
`,
      bild: `<p>Fibonacci rekursiv ist wie ein <b>Stammbaum, der sich ständig verzweigt</b>: Jede Person erzeugt wieder zwei Nachfahren, nach wenigen Generationen sind es Millionen. Die Schleife ist wie eine Liste: einmal durchgehen und fertig.</p>`,
      rezept: [
        `<b>Aufrufbaum zeichnen:</b> Knoten = Aufruf, Kinder = die zwei Selbstaufrufe. Blätter sind die Abbruchfälle <code>fib(0)</code>, <code>fib(1)</code>.`,
        `<b>Aufrufe zählen:</b> <code>aufrufe(n) = 1 + aufrufe(n−1) + aufrufe(n−2)</code> mit <code>aufrufe(0) = aufrufe(1) = 1</code>.`,
        `<b>Vergleichen:</b> Rekursiv: einfach hinzuschreiben, aber exponentiell. Iterativ: n Schritte.`,
        `<b>Laufzeit angeben:</b> rekursiv exponentiell (O(2ⁿ)), Schleife linear (O(n)).`
      ],
      beispiel: {
        q: `Wie viele Aufrufe löst <code>fib_rek(4)</code> aus, und welche Teilaufgaben werden mehrfach berechnet?`,
        steps: [
          { h: 'Baum aufbauen', t: code(`
fib(4)
├─ fib(3)
│  ├─ fib(2)
│  │  ├─ fib(1) = 1
│  │  └─ fib(0) = 0
│  └─ fib(1) = 1
└─ fib(2)
   ├─ fib(1) = 1
   └─ fib(0) = 0`) },
          { h: 'Aufrufe zählen', t: `Knoten: fib(4), fib(3), fib(2), fib(1), fib(0), fib(1), fib(2), fib(1), fib(0) = <b>9 Aufrufe</b>. Mit der Formel: <code>a(2) = 3</code>, <code>a(3) = 1 + 3 + 1 = 5</code>, <code>a(4) = 1 + 5 + 3 = 9</code>.` },
          { h: 'Doppelt berechnet', t: `<code>fib(2)</code> kommt 2-mal vor, <code>fib(1)</code> 3-mal, <code>fib(0)</code> 2-mal. Bei größeren n explodiert diese Verschwendung.` },
          { h: 'Ergebnis', t: `<code>fib(4) = fib(3) + fib(2) = 2 + 1 = 3</code>. Die Schleife hätte 4 Schritte gebraucht.` }
        ]
      },
      fehler: [
        `Den Abbruch nur für <code>n == 0</code> formulieren: <code>fib(1)</code> ruft dann <code>fib(0)</code> und <code>fib(−1)</code> auf, und es endet nie. Es braucht <b>zwei</b> Abbruchfälle.`,
        `Rekursion pauschal „langsam“ nennen. Das gilt hier wegen der <b>doppelten Teilaufrufe</b>, nicht für jede Rekursion (die Fakultät braucht nur n Aufrufe).`,
        `Die Laufzeit mit „n Aufrufen“ angeben: Es sind <b>exponentiell viele</b>, nicht n.`,
        `Bei der Schleifenvariante die Startwerte vertauschen (<code>a = 0</code>, <code>b = 1</code>): Dann ist fib(0) = 1 statt 0.`
      ],
      test: [
        { q: `Warum ist <code>fib_rek(30)</code> viel langsamer als <code>fib_iter(30)</code>?`, a: `Es entstehen rund 2,7 Millionen Aufrufe statt 30 Schleifendurchläufe, weil Teilaufgaben immer wieder neu berechnet werden.` },
        { q: `Wie viele Aufrufe löst <code>fib_rek(5)</code> aus?`, a: `15 (= 1 + 9 + 5).` },
        { q: `Welche Laufzeitordnung hat die Schleifenvariante?`, a: `O(n): Die Schleife läuft n-mal.` },
        { q: `Welche beiden Abbruchfälle braucht <code>fib_rek</code>?`, a: `<code>n = 0</code> (Ergebnis 0) und <code>n = 1</code> (Ergebnis 1), zusammen <code>n &lt; 2</code>.` }
      ]
    },

    // ---------------------------------------------------------------- Ordner: Dynamische Datenstrukturen
    {
      id: 'IF9', fach: F, num: 12, min: 18, demo: 'i-liste', demoTitel: 'Probier es aus: Zeiger umbiegen',
      title: 'Verkettete Liste',
      short: 'Knoten, Zeiger, Anker, NULL, Einfügen und Löschen durch Umbiegen',
      idee: `<p>Arrays haben feste Länge, speichern meist nur einen Typ, und <b>Einfügen in der Mitte verschiebt alle folgenden Elemente</b>. Die <b>verkettete Liste</b> (dynamische Datenstruktur) vermeidet das: Jedes Element ist ein <b>Knoten</b> mit <b>Daten</b> und einem <b>Zeiger</b> auf den nächsten Knoten.</p>
${merke('Begriffe', `<ul><li><b>Anker</b>: Verweis auf den <b>Listenkopf</b> (ersten Knoten).</li><li>Der Zeiger des <b>letzten</b> Knotens zeigt auf <b>NULL</b> (Endmarke, in Python <code>None</code>).</li><li><b>Dynamisch</b>: Die Liste wächst und schrumpft zur Laufzeit. Ein Array ist <b>statisch</b>.</li></ul>`)}
<p><b>Einfügen</b> nach einem Knoten <code>v</code> in drei Schritten, <b>in dieser Reihenfolge</b>: 1. neuen Knoten erzeugen, 2. <code>neu.zeiger ← v.zeiger</code> (neuer Knoten zeigt auf den bisherigen Nachfolger), 3. <code>v.zeiger ← neu</code>. <b>Löschen</b>: den Zeiger des Vorgängers auf den Nachfolger umbiegen (am Anfang: der Anker; am Ende: Vorgänger-Zeiger auf NULL).</p>
${code(`
neu ← neuer Knoten("Schwert")      1. erzeugen
neu.zeiger ← v.zeiger               2. Rest anhängen (zuerst!)
v.zeiger ← neu                      3. Vorgänger umbiegen`)}
${tab(['', 'Array / Liste', 'verkettete Liste'], [['i-tes Element lesen', 'sofort (Index)', 'von vorn durchlaufen (O(n))'], ['in der Mitte einfügen', 'Rest verschieben (O(n))', 'Zeiger umbiegen (O(1), wenn Knoten bekannt)'], ['Größe', 'fest bzw. dynamisch mit Verschieben', 'beliebig wachsend']])}
<p>Bei einer <b>doppelt verketteten Liste</b> kennt jeder Knoten zusätzlich seinen <b>Vorgänger</b>: Man kann rückwärts laufen und einen Knoten löschen, ohne den Vorgänger zu suchen.</p>`,
      bild: `<p>Wie eine <b>Schnitzeljagd</b>: Jeder Zettel verrät nur, wo der nächste liegt. Einen neuen Zettel einschieben heißt, zwei Hinweise umzuschreiben, ohne die Zettel zu verschieben.</p>`,
      rezept: [
        `<b>Zeichnen:</b> Knoten als Kästchen (Daten | Zeiger), Anker als Pfeil, am Ende NULL.`,
        `<b>Einfügen:</b> Neuen Knoten zeichnen, <b>zuerst seinen</b> Zeiger auf den Nachfolger setzen, dann den Zeiger des Vorgängers umbiegen.`,
        `<b>Löschen:</b> Vorgänger finden, dessen Zeiger auf <code>vorgaenger.zeiger.zeiger</code> setzen. Sonderfälle: erster Knoten (Anker), letzter Knoten (NULL).`,
        `<b>Durchlaufen:</b> bei <code>anker</code> beginnen, solange der aktuelle Knoten nicht NULL ist: bearbeiten, dem Zeiger zum nächsten Knoten folgen.`
      ],
      beispiel: {
        q: `Die Liste <code>Messer → Schild → Kompass</code> soll um „Schwert“ an der 2. Position erweitert werden. Danach wird „Schild“ gelöscht.`,
        steps: [
          { h: 'Ausgangslage', t: code(`
Anker → [Messer|•] → [Schild|•] → [Kompass|NULL]`) },
          { h: 'Einfügen von „Schwert“ nach Messer', t: `1. Knoten <code>Schwert</code> erzeugen. 2. <code>Schwert.zeiger ← Schild</code> (Zeiger von Messer, bevor er überschrieben wird). 3. <code>Messer.zeiger ← Schwert</code>.${code(`
Anker → [Messer|•] → [Schwert|•] → [Schild|•] → [Kompass|NULL]`)}` },
          { h: 'Löschen von „Schild“', t: `Vorgänger ist <code>Schwert</code>: <code>Schwert.zeiger ← Kompass</code>. Kein Zeiger zeigt mehr auf „Schild“, der Knoten wird vom System freigegeben.${code(`
Anker → [Messer|•] → [Schwert|•] → [Kompass|NULL]`)}` },
          { h: 'Vergleich Array', t: `Im Array wäre „Kompass“ beim Einfügen ein Feld nach rechts gerückt und beim Löschen wieder zurück. Bei der Liste wurden genau <b>zwei Zeiger</b> geändert, nichts verschoben.` }
        ]
      },
      fehler: [
        `<b>Falsche Reihenfolge beim Einfügen:</b> Setzt man zuerst <code>v.zeiger = neu</code>, ist der Rest der Liste verloren, weil niemand mehr auf den alten Nachfolger zeigt.`,
        `Beim Löschen des <b>ersten</b> Knotens den Anker vergessen: Der Anker muss auf den zweiten Knoten zeigen.`,
        `Beim Löschen des letzten Knotens den Zeiger des Vorgängers nicht auf NULL gesetzt.`,
        `Dem Zeiger folgen, obwohl man schon bei NULL ist: Hinter dem letzten Knoten gibt es nichts mehr.`
      ],
      test: [
        { q: `Was ist der Anker?`, a: `Ein Verweis auf den ersten Knoten (Listenkopf). Ohne ihn findet man die Liste nicht.` },
        { q: `Was steht im Zeiger des letzten Knotens?`, a: `NULL (in Python <code>None</code>), die Endmarke.` },
        { q: `Warum ist Einfügen in der Mitte bei der verketteten Liste billiger als beim Array?`, a: `Es werden nur zwei Zeiger geändert, im Array müssten alle folgenden Elemente verschoben werden.` },
        { q: `Was ist ein Nachteil der verketteten Liste gegenüber dem Array?`, a: `Kein direkter Zugriff über den Index: Das i-te Element findet man nur durch Durchlaufen von vorn.` }
      ]
    },
    {
      id: 'IF10', fach: F, num: 13, min: 16, demo: 'i-stack', demoTitel: 'Probier es aus: Push und Pop',
      title: 'Stapel (Stack): Last In, First Out',
      short: 'push, pop, top, isEmpty, Anwendungen, Klammerprüfung',
      idee: `<p>Ein <b>Stapel</b> (Stack, Keller) ist eine dynamische Datenstruktur, bei der man immer nur an das <b>oberste Element</b> herankommt: <b>LIFO</b> (Last In, First Out).</p>
${tab(['Beipackzettel-Befehl', 'Wirkung', 'Python (Liste als Stapel)'], [
        ['<code>Stack()</code>', 'leeren Stapel anlegen', '<code>s = []</code>'],
        ['<code>push(x)</code>', 'x oben drauflegen', '<code>s.append(x)</code>'],
        ['<code>pop()</code>', 'oberstes Element <b>entnehmen und zurückgeben</b>', '<code>s.pop()</code>'],
        ['<code>top()</code>', 'oberstes Element <b>ansehen</b> (bleibt liegen)', '<code>s[-1]</code>'],
        ['<code>isEmpty()</code>', 'Stapel leer?', '<code>len(s) == 0</code>']
      ])}
<p>Die Befehle stehen auf dem <a class="link" href="#/befehle">Beipackzettel</a> (Abschnitt 4). Mehr gibt es nicht.</p>
<p><b>Anwendungen:</b> Browser-Zurück-Taste, <b>Rückgängig</b> (Undo), Rücksprungadressen bei Funktionsaufrufen (Aufrufstapel der Rekursion), <b>Klammerprüfung</b>, Backspace beim Tippen.</p>
${merke('Klammerprüfung mit Stapel', `<p>Text von links nach rechts lesen. <b>Öffnende</b> Klammer → <code>push</code>. <b>Schließende</b> Klammer → ist der Stapel leer oder passt die entnommene Klammer nicht dazu → <b>falsch</b>. Am Ende muss der Stapel <b>leer</b> sein.</p>`)}`,
      bild: `<p>Wie ein <b>Tellerstapel</b> in der Mensa: Du nimmst immer den obersten Teller und legst neue oben drauf. Einen mittleren Teller kommst du nicht ran, ohne die oberen abzuheben.</p>`,
      rezept: [
        `<b>Stapel zeichnen</b> als senkrechte Spalte, oben ist rechts bzw. oben.`,
        `<b>Operationen der Reihe nach</b> ausführen, nach jeder Operation den Stapel notieren; bei <code>pop</code> auch, was zurückgegeben wurde.`,
        `<b>pop auf leerem Stapel</b> ist ein Fehler. Vorher mit <code>isEmpty()</code> prüfen.`,
        `<b>Entscheidung Stapel?</b> Wenn zuletzt Gespeichertes zuerst gebraucht wird (rückwärts abarbeiten): ja.`
      ],
      beispiel: {
        q: `Prüfe mit einem Stapel, ob die Klammern in <code>([x])]</code> korrekt gesetzt sind.`,
        steps: [
          { h: 'Zeichen 1: „(“', t: `Öffnend → push. Stapel (unten → oben): <code>( </code>` },
          { h: 'Zeichen 2: „[“', t: `Öffnend → push. Stapel: <code>( [</code>` },
          { h: 'Zeichen 3: „x“', t: `Keine Klammer, wird ignoriert.` },
          { h: 'Zeichen 4 und 5: „]“ und „)“', t: `„]“: pop liefert „[“, passt. Stapel: <code>(</code>. „)“: pop liefert „(“, passt. Stapel: leer.` },
          { h: 'Zeichen 6: „]“', t: `Schließend, aber der Stapel ist <b>leer</b> → keine passende öffnende Klammer → <b>falsch</b> (eine schließende Klammer zu viel).` }
        ]
      },
      fehler: [
        `<code>pop()</code> und <code>top()</code> verwechselt: <code>pop</code> <b>entfernt</b> das Element, <code>top</code> schaut nur hin.`,
        `Den Stapel „unten“ statt oben bearbeiten: Das gilt für die Schlange (FIFO), nicht für den Stapel.`,
        `Bei der Klammerprüfung am Ende nicht prüfen, ob der Stapel leer ist: <code>((</code> wäre sonst „richtig“.`,
        `<code>pop</code> auf einem leeren Stapel (<code>IndexError</code>), z. B. bei <code>)</code> als erstes Zeichen.`
      ],
      test: [
        { q: `Was bedeutet LIFO?`, a: `Last In, First Out: Das zuletzt abgelegte Element wird als erstes entnommen.` },
        { q: `Was liefert <code>pop()</code> nach <code>push(3)</code>, <code>push(8)</code>, <code>push(5)</code>?`, a: `5, und der Stapel enthält danach noch 3 und 8 (8 oben).` },
        { q: `Nenne zwei Anwendungen eines Stapels.`, a: `z. B. Zurück-Taste im Browser, Rückgängig, Aufrufstapel bei Funktionsaufrufen/Rekursion, Klammerprüfung.` },
        { q: `Unterschied zwischen <code>top()</code> und <code>pop()</code>?`, a: `<code>top()</code> gibt das oberste Element zurück und lässt es liegen, <code>pop()</code> entnimmt es.` }
      ]
    },
    {
      id: 'IF11', fach: F, num: 14, min: 16, demo: 'i-queue', demoTitel: 'Probier es aus: Enqueue und Dequeue',
      title: 'Warteschlange (Queue): First In, First Out',
      short: 'enqueue, dequeue, head, isEmpty, Stapel vs. Schlange, Umsetzung mit Liste',
      idee: `<p>In einer <b>Warteschlange</b> (Queue) wird hinten <b>angehängt</b> und vorn <b>entnommen</b>: <b>FIFO</b> (First In, First Out). Wer zuerst kommt, wird zuerst bedient.</p>
${tab(['Beipackzettel-Befehl', 'Wirkung', 'Python'], [
        ['<code>Queue()</code>', 'leere Schlange anlegen', '<code>q = []</code>'],
        ['<code>enqueue(x)</code>', 'x <b>hinten</b> anhängen', '<code>q.append(x)</code>'],
        ['<code>dequeue()</code>', 'vorderstes Element <b>entnehmen und zurückgeben</b>', '<code>q.pop(0)</code>'],
        ['<code>head()</code>', 'vorderstes Element <b>ansehen</b>', '<code>q[0]</code>'],
        ['<code>isEmpty()</code>', 'Schlange leer?', '<code>len(q) == 0</code>']
      ])}
<p>Die Befehle stehen auf dem <a class="link" href="#/befehle">Beipackzettel</a> (Abschnitt 4). Mehr gibt es nicht.</p>
<p><b>Anwendungen:</b> Druckaufträge, Puffer (Audio/Video), Nachrichten zwischen Programmen, Prozessverwaltung im Betriebssystem, Taxistand, Kundenschlange.</p>
${tab(['', 'Stapel', 'Schlange'], [['Prinzip', 'LIFO', 'FIFO'], ['Einfügen', 'oben (<code>push</code>)', 'hinten (<code>enqueue</code>)'], ['Entnehmen', 'oben (<code>pop</code>)', 'vorn (<code>dequeue</code>)'], ['Typisch für', 'rückwärts abarbeiten, Rekursion, Undo', 'der Reihe nach abarbeiten, Warteliste']])}
${merke('Umsetzung mit verketteter Liste', `<p><b>Stapel:</b> <code>push</code> und <code>pop</code> am <b>Anker</b> (vorn). <b>Schlange:</b> <code>dequeue</code> am Anker, <code>enqueue</code> hinten. Damit hinten schnell angehängt werden kann, merkt man sich zusätzlich einen Zeiger auf den <b>letzten Knoten</b>.</p>`)}`,
      bild: `<p>Wie die <b>Schlange an der Supermarktkasse</b>: Man stellt sich hinten an, bedient wird vorn. Vordrängeln (aus der Mitte entnehmen) ist nicht vorgesehen.</p>`,
      rezept: [
        `<b>Schlange zeichnen</b> als Reihe, vorn links. Hinten wird angefügt.`,
        `<b>Ereignisse der Reihe nach</b> abarbeiten: Einfahrt = <code>enqueue</code>, Ausfahrt = <code>dequeue</code>.`,
        `<b>Konsistenzprüfung:</b> Bei jeder Ausfahrt muss das ausfahrende Element <b>vorn</b> stehen. Sonst enthält das Protokoll einen Fehler.`,
        `<b>Entscheidung Schlange?</b> Wenn der Reihenfolge nach abgearbeitet wird (Wer zuerst kam, zuerst dran): ja.`
      ],
      beispiel: {
        q: `Ein Taxistand ist eine Schlange. Protokoll: 09:00 T11 ein, 09:02 T12 ein, 09:03 T13 ein, 09:05 T11 aus, 09:07 T14 ein, 09:08 T12 aus, 09:10 <b>T14 aus</b>. Ist das Protokoll plausibel?`,
        steps: [
          { h: 'Schlange nach jedem Ereignis (vorn links)', t: tab(['Zeit', 'Ereignis', 'Operation', 'Schlange'], [['09:00', 'T11 ein', 'enqueue(T11)', 'T11'], ['09:02', 'T12 ein', 'enqueue(T12)', 'T11, T12'], ['09:03', 'T13 ein', 'enqueue(T13)', 'T11, T12, T13'], ['09:05', 'T11 aus', 'dequeue() → T11', 'T12, T13'], ['09:07', 'T14 ein', 'enqueue(T14)', 'T12, T13, T14'], ['09:08', 'T12 aus', 'dequeue() → T12', 'T13, T14']]) },
          { h: 'Letztes Ereignis prüfen', t: `09:10: T14 fährt aus, aber vorn steht <b>T13</b>. Eine Schlange erlaubt nur die Entnahme des vordersten Elements.` },
          { h: 'Ergebnis', t: `Das Protokoll ist <b>fehlerhaft</b>. Entweder fuhr T13 aus (dann ist die Zeile falsch erfasst), oder das System hat ein Taxi falsch zugeordnet.` }
        ]
      },
      fehler: [
        `<code>dequeue</code> und <code>pop</code> (Stapel) verwechselt: Schlange entnimmt <b>vorn</b>, Stapel <b>oben (hinten)</b>.`,
        `Beim Protokoll nicht nach jeder Operation die komplette Schlange aufschreiben: Dann schleicht sich unbemerkt ein Fehler ein.`,
        `<code>q.pop(0)</code> bei großen Listen: Python verschiebt dabei alle Elemente (langsam, O(n)). Für die Klausur egal, in der Praxis nimmt man <code>collections.deque</code>.`,
        `<code>dequeue</code> auf einer leeren Schlange.`
      ],
      test: [
        { q: `Was bedeutet FIFO?`, a: `First In, First Out: Das zuerst eingereihte Element wird als erstes entnommen.` },
        { q: `Eine Schlange hat <code>A, B, C</code> (A vorn). Was liefert <code>dequeue()</code>, und wie sieht sie danach aus?`, a: `A; danach <code>B, C</code>.` },
        { q: `Wo hängt <code>enqueue</code> an und wo entnimmt <code>dequeue</code>?`, a: `Anhängen hinten, entnehmen vorn.` },
        { q: `Wann wählt man eine Schlange und wann einen Stapel?`, a: `Schlange: der Reihe nach abarbeiten (Aufträge). Stapel: das Zuletzt-Gespeicherte zuerst (rückwärts, Rekursion, Undo).` }
      ]
    }
  ];

  window.LR_LESSONS = (window.LR_LESSONS || []).concat(LESSONS);
})();
