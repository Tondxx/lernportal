/* ==========================================================================
   INFORMATIK eA (IF13-Tri) · Aufgaben, Probeklausuren, Spickzettel für Klausur 2 (12.1), Di 10.11.2026
   Alle Aufgaben sind EIGENE Aufgaben (eigene Daten und Zahlen), angelehnt an die IServ-Arbeitsblätter.
   Nur Stoff aus dem IServ-Ordner (keine Klassenkarten, keine binäre Suche, keine Bäume). Aufgabentypen wie in der Abitur-Operatoren-Liste (Angeben, Dokumentieren, Erläutern, Entwickeln, Implementieren).
   Code und Zahlen geprüft: neu/tests/informatik_check.py.
   Aufgabe: { id, fach, teil ('A' verstehen/erläutern | 'B' entwickeln/implementieren), lesson, title, afb, ops, intro, parts[{id,label,be,text,hints,sol,nums[{label,ans,tol}]}] }
   ========================================================================== */
(function () {
  const F = 'informatik';
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const code = s => `<pre class="ic-code">${esc(String(s).replace(/^\n/, '').replace(/\s+$/, ''))}</pre>`;
  const tab = (head, rows) => `<div class="ic-tabw"><table class="ic-tab"><thead><tr>${head.map(h => `<th>${h}</th>`).join('')}</tr></thead><tbody>${rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
  const ns = a => (window.LRAlgo && a ? window.LRAlgo.nsHtml(a) : '');
  const IA = window.INF_A || {};
  const list = items => `<ul>${items.map(i => `<li>${i}</li>`).join('')}</ul>`;
  const DYN = `<p class="dim" style="font-size:14px">Programmiersprache: Python. Stapel: <code>push</code> und <code>pop</code> (zusätzlich <code>top</code>, <code>isEmpty</code>), Schlange: <code>enqueue</code> und <code>dequeue</code> (zusätzlich <code>head</code>, <code>isEmpty</code>).</p>`;

  const TASKS = [
    // ---------------------------------------------------------------- IF1: Tracetabelle
    {
      id: 'IT1', fach: F, teil: 'A', lesson: 'IF1', title: 'Tracetabelle: eine Folge', afb: 'I', ops: 'Dokumentieren, Angeben, Beschreiben',
      intro: `Gegeben ist das folgende Programm.${code(`
a = 1
b = 1
n = 0
while b < 50:
    t = a + b
    a = b
    b = t
    n = n + 1
print(n, b)`)}`,
      parts: [
        { id: 'IT1a', label: 'a)', be: 4, text: 'Dokumentieren Sie den Ablauf in einer Tracetabelle mit den Spalten <code>a</code>, <code>b</code>, <code>n</code> (eine Zeile pro Durchlauf der Schleife).',
          hints: ['Startwerte: a = 1, b = 1, n = 0. In jedem Durchlauf: t = a + b, dann a = b, dann b = t, dann n + 1.'],
          sol: tab(['Durchlauf', 'a', 'b', 'n'], [['Start', '1', '1', '0'], ['1', '1', '2', '1'], ['2', '2', '3', '2'], ['3', '3', '5', '3'], ['4', '5', '8', '4'], ['5', '8', '13', '5'], ['6', '13', '21', '6'], ['7', '21', '34', '7'], ['8', '34', '55', '8']]) + `<p>Nach Durchlauf 8 ist <code>b = 55</code>, die Bedingung <code>b &lt; 50</code> ist falsch: Ende.</p>` + list(['Startzeile (1 BE)', 'Durchläufe richtig (2 BE)', 'Abbruch nach der letzten Prüfung erkannt (1 BE)']) },
        { id: 'IT1b', label: 'b)', be: 2, text: 'Geben Sie die Ausgabe des Programms an.',
          nums: [{ label: 'n', ans: 8, tol: 0.01 }, { label: 'b', ans: 55, tol: 0.01 }],
          sol: `<p>Ausgabe: <code>8 55</code>.</p>` },
        { id: 'IT1c', label: 'c)', be: 2, text: 'Beschreiben Sie in einem Satz, was das Programm berechnet.',
          sol: `<p>Es erzeugt die <b>Fibonacci-Folge</b> und bestimmt das erste Folgenglied, das mindestens 50 ist (55), sowie die Anzahl der dafür nötigen Schritte (8).</p>` }
      ]
    },
    {
      id: 'IT2', fach: F, teil: 'A', lesson: 'IF1', title: 'Verzweigung in der Schleife: Collatz', afb: 'II', ops: 'Dokumentieren, Angeben, Begründen',
      intro: `Gegeben ist das folgende Programm.${code(`
zahl = 6
schritte = 0
while zahl != 1:
    if zahl % 2 == 0:
        zahl = zahl // 2
    else:
        zahl = 3 * zahl + 1
    schritte = schritte + 1
print(schritte)`)}`,
      parts: [
        { id: 'IT2a', label: 'a)', be: 3, text: 'Dokumentieren Sie die Werte von <code>zahl</code> nach jedem Durchlauf der Schleife.',
          hints: ['6 ist gerade: 6 // 2 = 3. 3 ist ungerade: 3 · 3 + 1 = 10 …'],
          sol: `<p><code>zahl</code>: 6 → 3 → 10 → 5 → 16 → 8 → 4 → 2 → 1.</p>` + list(['gerade/ungerade richtig unterschieden (1 BE)', 'Folge richtig (2 BE)']) },
        { id: 'IT2b', label: 'b)', be: 1, text: 'Welche Zahl gibt das Programm aus?',
          nums: [{ label: 'Ausgabe', ans: 8, tol: 0.01 }],
          sol: `<p>8 (die Folge hat 8 Übergänge von 6 bis 1).</p>` },
        { id: 'IT2c', label: 'c)', be: 2, text: 'Bestimmen Sie die Ausgabe für den Startwert <code>zahl = 7</code>.',
          nums: [{ label: 'Ausgabe', ans: 16, tol: 0.01 }],
          hints: ['7 → 22 → 11 → 34 → 17 → 52 → 26 → 13 → 40 → 20 → 10 → 5 → 16 → 8 → 4 → 2 → 1'],
          sol: `<p>7 → 22 → 11 → 34 → 17 → 52 → 26 → 13 → 40 → 20 → 10 → 5 → 16 → 8 → 4 → 2 → 1, das sind <b>16</b> Schritte.</p>` },
        { id: 'IT2d', label: 'd)', be: 2, text: 'Begründen Sie, warum im Programm <code>zahl // 2</code> statt <code>zahl / 2</code> verwendet wird.',
          sol: `<p><code>//</code> ist die ganzzahlige Division und liefert wieder eine <code>int</code>. <code>/</code> liefert immer eine Kommazahl (<code>float</code>, z. B. <code>3.0</code>): Die Variable würde den Datentyp wechseln, die Ausgaben und der Vergleich <code>zahl != 1</code> mit Kommazahlen wären fehleranfällig.</p>` }
      ]
    },

    // ---------------------------------------------------------------- IF2: Struktogramme
    {
      id: 'IT3', fach: F, teil: 'B', lesson: 'IF2', title: 'Versandkosten als Struktogramm', afb: 'II', ops: 'Entwickeln, Bestimmen, Implementieren',
      intro: `Ein Onlineshop berechnet die Versandkosten so: Ab einem Bestellwert von <b>100 €</b> ist der Versand <b>kostenlos</b>. Darunter richten sich die Kosten nach dem Gewicht: bis einschließlich 1 kg <b>4,00 €</b>, bis einschließlich 5 kg <b>6,50 €</b>, darüber <b>12,00 €</b>.`,
      parts: [
        { id: 'IT3a', label: 'a)', be: 6, text: 'Entwickeln Sie ein Struktogramm für die Operation <code>versandkosten(wert, gewicht)</code>, die die Kosten zurückgibt.',
          hints: ['Prüfe zuerst den Bestellwert. Im Nein-Zweig: verschachtelte Verzweigung nach dem Gewicht.'],
          sol: ns(IA.versandkosten) + list(['Verzweigung <code>wert ≥ 100</code> mit Rückgabe 0 (2 BE)', 'Verschachtelung nach Gewicht, zwei Verzweigungen (3 BE)', 'Grenzfälle „einschließlich“ richtig (1 BE)']) },
        { id: 'IT3b', label: 'b)', be: 3, text: 'Bestimmen Sie die Versandkosten für (80 €, 0,8 kg), (80 €, 3,2 kg) und (120 €, 7 kg).',
          nums: [{ label: '(80 €, 0,8 kg)', ans: 4, tol: 0.01 }, { label: '(80 €, 3,2 kg)', ans: 6.5, tol: 0.01 }, { label: '(120 €, 7 kg)', ans: 0, tol: 0.01 }],
          sol: `<p>4,00 € · 6,50 € · 0 € (der Bestellwert schlägt das Gewicht).</p>` },
        { id: 'IT3c', label: 'c)', be: 3, text: 'Setzen Sie das Struktogramm in Python um.',
          sol: code(`
def versandkosten(wert, gewicht):
    if wert >= 100:
        return 0.0
    if gewicht <= 1:
        return 4.0
    if gewicht <= 5:
        return 6.5
    return 12.0`) + list(['Verzweigungen richtig übertragen (2 BE)', 'Rückgabe statt <code>print</code> (1 BE)']) }
      ]
    },
    {
      id: 'IT4', fach: F, teil: 'A', lesson: 'IF2', title: 'Struktogramm lesen: erstes negatives Element', afb: 'II', ops: 'Angeben, Beschreiben, Erläutern',
      intro: `Gegeben ist das Struktogramm der Operation <code>ersteNegative</code>. Der Parameter <code>liste</code> ist eine nicht leere Liste mit ganzen Zahlen.${ns(IA.ersteNegative)}`,
      parts: [
        { id: 'IT4a', label: 'a)', be: 3, text: 'Geben Sie die Rückgabe für <code>[3, 5, -2, 7]</code> und für <code>[1, 2]</code> an.',
          nums: [{ label: '[3, 5, −2, 7]', ans: 2, tol: 0.01 }, { label: '[1, 2]', ans: -1, tol: 0.01 }],
          hints: ['Verfolge i: Die Schleife läuft, solange i < Länge UND das Element ≥ 0 ist.'],
          sol: `<p><code>[3, 5, -2, 7]</code>: i = 0 (3 ≥ 0), i = 1 (5 ≥ 0), i = 2: −2 ist nicht ≥ 0 → Schleife endet, i ≠ 4 → Rückgabe <b>2</b>.<br><code>[1, 2]</code>: i läuft bis 2 = Länge → Rückgabe <b>−1</b>.</p>` + list(['erste Liste (1 BE)', 'zweite Liste (1 BE)', 'Nachvollziehbarkeit (1 BE)']) },
        { id: 'IT4b', label: 'b)', be: 2, text: 'Beschreiben Sie in einem Satz die Aufgabe der Operation.',
          sol: `<p>Sie gibt die <b>Position (den Index) des ersten negativen Elements</b> zurück, oder −1, wenn es kein negatives Element gibt.</p>` },
        { id: 'IT4c', label: 'c)', be: 3, text: 'Erläutern Sie, warum in der Schleifenbedingung <code>i &lt; len(liste)</code> vor <code>liste[i] ≥ 0</code> geprüft werden muss.',
          sol: `<p>Enthält die Liste kein negatives Element, erreicht <code>i</code> den Wert <code>len(liste)</code>. Dort gibt es kein Element mehr: <code>liste[i]</code> würde einen <b>IndexError</b> auslösen. Weil die Bedingung von links nach rechts ausgewertet wird und beim UND ein falscher erster Teil den zweiten nicht mehr auswertet, verhindert die Reihenfolge den Zugriff außerhalb der Liste.</p>` + list(['Grenzfall „kein negatives Element“ (1 BE)', 'Zugriff ins Leere / Fehler (1 BE)', 'Auswertung von links nach rechts (1 BE)']) },
        { id: 'IT4d', label: 'd)', be: 2, text: 'Geben Sie an, in welchem Fall die Operation am wenigsten Schritte braucht und in welchem am meisten (in Abhängigkeit von der Länge n).',
          sol: `<p>Am wenigsten: das erste Element ist negativ (konstant viele Schritte, O(1)). Am meisten: kein negatives Element oder nur das letzte: die Schleife läuft n-mal, also O(n).</p>` }
      ]
    },

    // ---------------------------------------------------------------- IF3: Funktionen, Variablen, Fehler
    {
      id: 'IT5', fach: F, teil: 'A', lesson: 'IF3', title: 'Lokal, global und Liste als Parameter', afb: 'II', ops: 'Angeben, Erläutern, Nennen',
      intro: `Gegeben ist das folgende Programm.${code(`
x = 10
liste = [2, 4]

def aendere(wert, l):
    x = wert + 1
    l.append(x)
    wert = 0
    return x * 2

w = 3
r = aendere(w, liste)
print(x, w, r, liste)`)}`,
      parts: [
        { id: 'IT5a', label: 'a)', be: 4, text: 'Geben Sie die Werte von <code>x</code>, <code>w</code>, <code>r</code> und <code>liste</code> nach dem Aufruf an.',
          nums: [{ label: 'x', ans: 10, tol: 0.01 }, { label: 'w', ans: 3, tol: 0.01 }, { label: 'r', ans: 8, tol: 0.01 }],
          hints: ['Im Rumpf ist x eine neue lokale Variable (4). Was wird zurückgegeben?'],
          sol: `<p>Ausgabe: <code>10 3 8 [2, 4, 4]</code>. Im Rumpf: lokales <code>x = 3 + 1 = 4</code>; <code>l.append(4)</code> ändert die Liste; <code>wert = 0</code> ändert nur den lokalen Parameter; Rückgabe <code>4 · 2 = 8</code>.</p>` + list(['x und w (1 BE)', 'r (1 BE)', 'liste (2 BE)']) },
        { id: 'IT5b', label: 'b)', be: 3, text: 'Erläutern Sie, warum <code>w</code> unverändert bleibt, <code>liste</code> aber verändert wird.',
          sol: `<p>Der Parameter <code>wert</code> ist eine lokale Variable mit einer <b>Kopie</b> des Zahlenwerts: die Zuweisung <code>wert = 0</code> betrifft nur diese Kopie. <code>l</code> verweist auf <b>dieselbe Liste</b> wie <code>liste</code>; <code>append</code> verändert diese gemeinsame Liste, deshalb ist die Änderung auch außerhalb sichtbar.</p>` },
        { id: 'IT5c', label: 'c)', be: 2, text: 'Nennen Sie zwei Vorteile der Modularisierung (Zerlegung in Funktionen).',
          sol: `<p>z. B. Wiederverwendung desselben Codes, bessere Übersicht, einzelne Funktionen sind einzeln testbar, Arbeitsteilung im Team, Änderungen nur an einer Stelle.</p>` }
      ]
    },
    {
      id: 'IT6', fach: F, teil: 'A', lesson: 'IF3', title: 'Fehlertypen erkennen', afb: 'II', ops: 'Bestimmen, Beheben',
      intro: 'Ordnen Sie jedem Programmstück den Fehlertyp (Syntaxfehler, Laufzeitfehler oder Logikfehler) zu, begründen Sie kurz und geben Sie an, wie der Fehler behoben wird.',
      parts: [
        { id: 'IT6a', label: 'a)', be: 2, text: `${code(`
zahl = int(input())
if zahl > 3
    print("groß")`)}`,
          sol: `<p><b>Syntaxfehler</b>: Der Doppelpunkt hinter <code>if zahl &gt; 3</code> fehlt. Der Interpreter meldet das <b>vor dem Start</b>. Behebung: <code>if zahl &gt; 3:</code>.</p>` },
        { id: 'IT6b', label: 'b)', be: 2, text: `${code(`
werte = [4, 8, 15]
for i in range(len(werte) + 1):
    print(werte[i])`)}`,
          sol: `<p><b>Laufzeitfehler</b> (<code>IndexError</code>): Für <code>i = 3</code> gibt es kein Element. Das Programm bricht erst dort ab. Behebung: <code>range(len(werte))</code>.</p>` },
        { id: 'IT6c', label: 'c)', be: 2, text: `${code(`
def durchschnitt(liste):
    summe = 0
    for x in liste:
        summe = summe + x
    return summe / (len(liste) + 1)`)}`,
          sol: `<p><b>Logikfehler</b>: Das Programm läuft ohne Meldung, rechnet aber falsch (<code>durchschnitt([2, 4, 6])</code> ergibt 3,0 statt 4,0). Man findet ihn nur durch <b>Testfälle</b>. Behebung: durch <code>len(liste)</code> teilen.</p>` }
      ]
    },

    // ---------------------------------------------------------------- IF4: Listen
    {
      id: 'IT7', fach: F, teil: 'B', lesson: 'IF4', title: 'Kleinste Temperatur und ihre Häufigkeit', afb: 'II', ops: 'Implementieren, Erläutern, Angeben',
      intro: `${DYN}In der Liste <code>temp</code> stehen Messwerte (ganze Zahlen). Die Liste ist nicht leer.`,
      parts: [
        { id: 'IT7a', label: 'a)', be: 4, text: 'Implementieren Sie <code>kleinste(temp)</code>, die den kleinsten Messwert zurückgibt.',
          hints: ['Startwert = erstes Element, dann alle weiteren vergleichen.'],
          sol: code(`
def kleinste(temp):
    k = temp[0]
    for i in range(1, len(temp)):
        if temp[i] < k:
            k = temp[i]
    return k`) + list(['Startwert = erstes Element (1 BE)', 'Schleife (1 BE)', 'Vergleich und Aktualisierung (1 BE)', 'Rückgabe (1 BE)']) },
        { id: 'IT7b', label: 'b)', be: 3, text: 'Erläutern Sie, wie Sie die Operation ändern müssen, damit sie zusätzlich zurückgibt, wie oft der kleinste Wert vorkommt.',
          sol: `<p>Zusätzlich einen Zähler <code>anzahl</code> mit Startwert 1 anlegen. Wird ein <b>kleinerer</b> Wert gefunden: Minimum aktualisieren und <code>anzahl = 1</code> setzen. Ist ein Wert <b>gleich</b> dem Minimum: <code>anzahl</code> um 1 erhöhen. Am Ende beide Werte zurückgeben (z. B. als Tupel <code>return k, anzahl</code>).</p>` + list(['Zähler anlegen (1 BE)', 'Neuer kleinerer Wert setzt Zähler zurück (1 BE)', 'Gleicher Wert erhöht Zähler (1 BE)']) },
        { id: 'IT7c', label: 'c)', be: 2, text: 'Dokumentieren Sie das Ergebnis dieser erweiterten Operation für <code>[3, -1, 4, -1, 2]</code>.',
          nums: [{ label: 'kleinster Wert', ans: -1, tol: 0.01 }, { label: 'Anzahl', ans: 2, tol: 0.01 }],
          sol: `<p>3 → Minimum 3 (Anzahl 1); −1 → Minimum −1 (1); 4 → keine Änderung; −1 → gleich: Anzahl 2; 2 → keine Änderung. Rückgabe <b>(−1, 2)</b>.</p>` }
      ]
    },
    {
      id: 'IT8', fach: F, teil: 'A', lesson: 'IF4', title: 'Listen-Operationen verfolgen', afb: 'I', ops: 'Angeben, Nennen',
      intro: `Eine leere Liste <code>d = []</code> wird angelegt. Dann werden der Reihe nach ausgeführt: <code>d.append(4)</code>, <code>d.append(7)</code>, <code>d.insert(1, 5)</code>, <code>d[0] = 9</code>, <code>del d[2]</code>, <code>d.append(3)</code>.`,
      parts: [
        { id: 'IT8a', label: 'a)', be: 3, text: 'Geben Sie den Inhalt der Liste nach jeder Operation an.',
          sol: tab(['Operation', 'Inhalt'], [['append(4)', '[4]'], ['append(7)', '[4, 7]'], ['insert(1, 5)', '[4, 5, 7] (die 7 rückt nach hinten)'], ['d[0] = 9', '[9, 5, 7]'], ['del d[2]', '[9, 5] (Index 2 war die 7)'], ['append(3)', '[9, 5, 3]']]) + list(['insert (1 BE)', 'Zuweisung und del (1 BE)', 'Rest (1 BE)']) },
        { id: 'IT8b', label: 'b)', be: 2, text: 'Welche Werte liefern <code>len(d)</code> und <code>d[1]</code> am Ende?',
          nums: [{ label: 'len(d)', ans: 3, tol: 0.01 }, { label: 'd[1]', ans: 5, tol: 0.01 }],
          sol: `<p><code>len(d)</code> = 3, <code>d[1]</code> = 5 (Zählung beginnt bei 0).</p>` },
        { id: 'IT8c', label: 'c)', be: 2, text: 'Welche der Operationen verschieben andere Elemente?',
          sol: `<p><code>insert</code> (alle folgenden Elemente nach hinten) und <code>del</code> (alle folgenden nach vorn). <code>append</code> und die Zuweisung <code>d[0] = 9</code> verschieben nichts.</p>` }
      ]
    },
    {
      id: 'IT9', fach: F, teil: 'A', lesson: 'IF4', title: 'Zweidimensionale Liste: Diagonale', afb: 'II', ops: 'Angeben, Beschreiben, Ändern',
      intro: `Gegeben ist das folgende Programm.${code(`
f = [[3, 5, 2],
     [4, 1, 6],
     [7, 0, 8]]
s = 0
for i in range(3):
    s = s + f[i][i]
print(s)`)}`,
      parts: [
        { id: 'IT9a', label: 'a)', be: 2, text: 'Geben Sie die Ausgabe an.', nums: [{ label: 'Ausgabe', ans: 12, tol: 0.01 }],
          sol: `<p><code>f[0][0] + f[1][1] + f[2][2] = 3 + 1 + 8 = 12</code>.</p>` },
        { id: 'IT9b', label: 'b)', be: 2, text: 'Beschreiben Sie, was das Programm berechnet.',
          sol: `<p>Die Summe der Elemente auf der <b>Hauptdiagonale</b> (links oben nach rechts unten) der 3×3-Tabelle.</p>` },
        { id: 'IT9c', label: 'c)', be: 3, text: 'Ändern Sie das Programm so, dass die Summe der anderen Diagonale (rechts oben nach links unten) berechnet wird, und geben Sie das Ergebnis an.',
          nums: [{ label: 'Summe', ans: 10, tol: 0.01 }],
          sol: `<p>Statt <code>f[i][i]</code> verwendet man <code>f[i][2 - i]</code>: <code>f[0][2] + f[1][1] + f[2][0] = 2 + 1 + 7 = 10</code>.</p>` + list(['Spaltenindex 2 − i (2 BE)', 'Ergebnis (1 BE)']) }
      ]
    },

    // ---------------------------------------------------------------- IF5: Sortieren
    {
      id: 'IT10', fach: F, teil: 'A', lesson: 'IF5', title: 'Bubblesort dokumentieren', afb: 'II', ops: 'Dokumentieren, Angeben, Erläutern',
      intro: `Die Liste <code>[6, 3, 8, 2]</code> wird mit Bubblesort sortiert:${code(`
def bubblesort(l):
    n = len(l)
    for i in range(n - 1):
        for j in range(n - 1 - i):
            if l[j] > l[j + 1]:
                l[j], l[j + 1] = l[j + 1], l[j]
    return l`)}`,
      parts: [
        { id: 'IT10a', label: 'a)', be: 3, text: 'Geben Sie die Liste nach jedem Durchlauf der äußeren Schleife an.',
          sol: tab(['Durchlauf i', 'Vertauschungen', 'Liste danach'], [['0', '(6,3) und (8,2)', '[3, 6, 2, 8]'], ['1', '(6,2)', '[3, 2, 6, 8]'], ['2', '(3,2)', '[2, 3, 6, 8]']]) },
        { id: 'IT10b', label: 'b)', be: 2, text: 'Wie viele Vergleiche und wie viele Vertauschungen werden insgesamt ausgeführt?',
          nums: [{ label: 'Vergleiche', ans: 6, tol: 0.01 }, { label: 'Vertauschungen', ans: 4, tol: 0.01 }],
          sol: `<p>Vergleiche: 3 + 2 + 1 = 6. Vertauschungen: 2 + 1 + 1 = 4.</p>` },
        { id: 'IT10c', label: 'c)', be: 2, text: 'Erläutern Sie, warum nach dem ersten Durchlauf das größte Element ganz hinten steht.',
          sol: `<p>Im ersten Durchlauf wird das jeweils größere Element mit dem rechten Nachbarn getauscht. Das größte Element wird deshalb bei jedem Vergleich mitgenommen („steigt auf“), bis es am Ende steht. Danach muss der hintere Platz nicht mehr betrachtet werden (<code>n − 1 − i</code>).</p>` }
      ]
    },
    {
      id: 'IT11', fach: F, teil: 'A', lesson: 'IF5', title: 'Selectionsort und Insertionsort', afb: 'II', ops: 'Dokumentieren, Angeben, Begründen',
      intro: `Die Liste <code>[7, 2, 9, 4, 1]</code> soll sortiert werden.`,
      parts: [
        { id: 'IT11a', label: 'a)', be: 3, text: 'Dokumentieren Sie <b>Selectionsort</b>: Geben Sie die Liste nach jedem Durchlauf der äußeren Schleife an.',
          sol: tab(['Durchlauf i', 'kleinstes im Rest', 'Liste danach'], [['0', '1 (Index 4)', '[1, 2, 9, 4, 7]'], ['1', '2 (Index 1)', '[1, 2, 9, 4, 7]'], ['2', '4 (Index 3)', '[1, 2, 4, 9, 7]'], ['3', '7 (Index 4)', '[1, 2, 4, 7, 9]']]) },
        { id: 'IT11b', label: 'b)', be: 1, text: 'Wie viele Vergleiche führt Selectionsort bei 5 Elementen aus?', nums: [{ label: 'Vergleiche', ans: 10, tol: 0.01 }],
          sol: `<p>4 + 3 + 2 + 1 = 10 (immer n(n−1)/2).</p>` },
        { id: 'IT11c', label: 'c)', be: 3, text: 'Dokumentieren Sie <b>Insertionsort</b>: Geben Sie die Liste nach jedem Einsortieren an (i = 1 bis 4).',
          sol: tab(['Durchlauf i', 'einzusortieren', 'Liste danach'], [['1', '2', '[2, 7, 9, 4, 1]'], ['2', '9', '[2, 7, 9, 4, 1]'], ['3', '4', '[2, 4, 7, 9, 1]'], ['4', '1', '[1, 2, 4, 7, 9]']]) },
        { id: 'IT11d', label: 'd)', be: 1, text: 'Wie viele Verschiebungen (Elemente, die ein Feld nach rechts rücken) gibt es bei Insertionsort insgesamt?', nums: [{ label: 'Verschiebungen', ans: 7, tol: 0.01 }],
          sol: `<p>1 (die 7) + 0 + 2 (9 und 7) + 4 (9, 7, 4, 2) = 7. Das entspricht der Anzahl der Paare in falscher Reihenfolge.</p>` },
        { id: 'IT11e', label: 'e)', be: 2, text: 'Begründen Sie, welches der beiden Verfahren bei einer bereits sortierten Liste weniger Schritte braucht.',
          sol: `<p><b>Insertionsort</b>: Jedes Element ist größer als das letzte der sortierten Folge, die <code>while</code>-Schleife läuft nie, es gibt nur n−1 Vergleiche und keine Verschiebung. <b>Selectionsort</b> sucht trotzdem immer im ganzen Rest und macht n(n−1)/2 Vergleiche.</p>` }
      ]
    },
    {
      id: 'IT12', fach: F, teil: 'B', lesson: 'IF5', title: 'Selectionsort entwickeln und begründen', afb: 'III', ops: 'Entwickeln, Implementieren, Begründen',
      intro: `${DYN}Eine Liste <code>liste</code> mit ganzen Zahlen soll mit <b>Selectionsort</b> aufsteigend sortiert werden.`,
      parts: [
        { id: 'IT12a', label: 'a)', be: 6, text: 'Entwickeln Sie ein Struktogramm der Operation <code>selectionsort(liste)</code>.',
          hints: ['Äußere Schleife über die Position i, innere Schleife sucht den Index des kleinsten Elements ab i + 1.'],
          sol: ns(IA.selectionsort) + list(['äußere Schleife (1 BE)', 'Index des kleinsten merken (2 BE)', 'innere Schleife mit Vergleich (2 BE)', 'Vertauschen mit Hilfsvariable bzw. Tausch (1 BE)']) },
        { id: 'IT12b', label: 'b)', be: 5, text: 'Implementieren Sie die Operation in Python.',
          sol: code(`
def selectionsort(liste):
    for i in range(len(liste) - 1):
        kleinste = i
        for j in range(i + 1, len(liste)):
            if liste[j] < liste[kleinste]:
                kleinste = j
        liste[i], liste[kleinste] = liste[kleinste], liste[i]
    return liste`) + list(['Schleifen (2 BE)', 'Suche des kleinsten Index (2 BE)', 'Tausch (1 BE)']) },
        { id: 'IT12c', label: 'c)', be: 3, text: 'Begründen Sie, dass nach dem Durchlauf <code>i</code> die ersten <code>i + 1</code> Elemente endgültig an der richtigen Stelle stehen.',
          sol: `<p>Im Durchlauf <code>i</code> wird das kleinste Element der Positionen <code>i … n−1</code> gesucht und auf Position <code>i</code> getauscht. Alle Elemente davor waren schon die kleinsten ihrer Reste, also nicht größer. Das neue Element ist das kleinste der verbliebenen und damit mindestens so groß wie alle davor und höchstens so groß wie alle danach. So wächst der sortierte Anfang pro Durchlauf um eins.</p>` + list(['Kleinstes des Rests wird nach vorn getauscht (1 BE)', 'Vorderer Teil bleibt unverändert und sortiert (1 BE)', 'Schluss: Der sortierte Teil wächst um 1 (1 BE)']) }
      ]
    },

    // ---------------------------------------------------------------- IF6: Laufzeit
    {
      id: 'IT13', fach: F, teil: 'A', lesson: 'IF6', title: 'Schritte zählen: gleiche Paare finden', afb: 'II', ops: 'Bestimmen, Berechnen, Erläutern',
      intro: `Gegeben ist die Operation:${code(`
def paare(liste):
    n = len(liste)
    zaehler = 0
    for i in range(n):
        for j in range(i + 1, n):
            if liste[i] == liste[j]:
                zaehler = zaehler + 1
    return zaehler`)}Sie zählt, wie viele Paare gleicher Elemente es gibt.`,
      parts: [
        { id: 'IT13a', label: 'a)', be: 2, text: 'Wie oft wird der Vergleich <code>liste[i] == liste[j]</code> bei einer Liste mit n = 6 Elementen ausgeführt?', nums: [{ label: 'Vergleiche', ans: 15, tol: 0.01 }],
          hints: ['Für i = 0 sind es 5 Vergleiche, für i = 1 sind es 4 …'],
          sol: `<p>5 + 4 + 3 + 2 + 1 + 0 = 15 = 6 · 5 / 2.</p>` },
        { id: 'IT13b', label: 'b)', be: 2, text: 'Geben Sie die Anzahl der Vergleiche für n = 100 an.', nums: [{ label: 'Vergleiche', ans: 4950, tol: 0.001 }],
          sol: `<p>n(n−1)/2 = 100 · 99 / 2 = 4950.</p>` },
        { id: 'IT13c', label: 'c)', be: 2, text: 'Geben Sie die Ordnung der Laufzeit an und erläutern Sie, was bei verdoppelter Länge passiert.',
          sol: `<p>O(n²). Bei doppelter Länge steigt die Zahl der Vergleiche auf das <b>Vierfache</b> (n(n−1)/2 wächst quadratisch).</p>` },
        { id: 'IT13d', label: 'd)', be: 2, text: 'Erläutern Sie, ob die Anordnung der Elemente in der Liste die Anzahl der Vergleiche beeinflusst.',
          sol: `<p>Nein. Die Schleifen laufen unabhängig vom Inhalt, die Zahl der Vergleiche hängt nur von n ab (Best Case = Worst Case). Nur der Zähler <code>zaehler</code> wird je nach Inhalt häufiger erhöht.</p>` }
      ]
    },

    // ---------------------------------------------------------------- IF7: Rekursion
    {
      id: 'IT14', fach: F, teil: 'A', lesson: 'IF7', title: 'Rekursive Quersumme', afb: 'II', ops: 'Dokumentieren, Angeben, Beschreiben',
      intro: `Gegeben ist die folgende Funktion.${code(`
def q(n):
    if n < 10:
        return n
    return n % 10 + q(n // 10)`)}`,
      parts: [
        { id: 'IT14a', label: 'a)', be: 4, text: 'Dokumentieren Sie die Aufrufe von <code>q(4721)</code> mit den jeweiligen Rückgabewerten.',
          hints: ['Abstieg: q(4721) ruft q(472) auf … bis zu einer einstelligen Zahl. Dann von unten zurückrechnen.'],
          sol: tab(['Aufruf', 'Abbruch?', 'Rückgabe'], [['q(4721)', 'nein', '1 + q(472) = 1 + 13 = 14'], ['q(472)', 'nein', '2 + q(47) = 2 + 11 = 13'], ['q(47)', 'nein', '7 + q(4) = 7 + 4 = 11'], ['q(4)', 'ja (4 &lt; 10)', '4']]) + list(['Abstieg (2 BE)', 'Rückgabewerte (2 BE)']) },
        { id: 'IT14b', label: 'b)', be: 2, text: 'Geben Sie das Ergebnis und die Gesamtzahl der Aufrufe an.', nums: [{ label: 'Ergebnis', ans: 14, tol: 0.01 }, { label: 'Anzahl Aufrufe', ans: 4, tol: 0.01 }],
          sol: `<p>Ergebnis 14, insgesamt 4 Aufrufe (q(4721), q(472), q(47), q(4)).</p>` },
        { id: 'IT14c', label: 'c)', be: 2, text: 'Benennen Sie die Abbruchbedingung und den Rekursionsschritt.',
          sol: `<p>Abbruchbedingung: <code>n &lt; 10</code> (einstellige Zahl, Rückgabe <code>n</code>). Rekursionsschritt: <code>n % 10 + q(n // 10)</code>: letzte Ziffer plus Quersumme der um eine Stelle kürzeren Zahl.</p>` },
        { id: 'IT14d', label: 'd)', be: 1, text: 'Beschreiben Sie, was die Funktion berechnet.',
          sol: `<p>Die Quersumme von <code>n</code>.</p>` }
      ]
    },
    {
      id: 'IT15', fach: F, teil: 'B', lesson: 'IF7', title: 'Fakultät rekursiv', afb: 'II', ops: 'Entwickeln, Implementieren, Dokumentieren, Erläutern',
      intro: `Die Fakultät ist definiert durch n! = 1 · 2 · … · n und 0! = 1.`,
      parts: [
        { id: 'IT15a', label: 'a)', be: 4, text: 'Entwickeln Sie ein Struktogramm für die <b>rekursive</b> Operation <code>fakultaet(n)</code>.',
          sol: ns(IA.fakultaet) + list(['Abbruchfall (2 BE)', 'Rekursiver Fall mit n−1 (2 BE)']) },
        { id: 'IT15b', label: 'b)', be: 3, text: 'Implementieren Sie die Operation in Python.',
          sol: code(`
def fakultaet(n):
    if n == 0:
        return 1
    return n * fakultaet(n - 1)`) },
        { id: 'IT15c', label: 'c)', be: 3, text: 'Dokumentieren Sie den Ablauf von <code>fakultaet(4)</code> und geben Sie das Ergebnis sowie die Anzahl der Aufrufe an.',
          nums: [{ label: 'Ergebnis', ans: 24, tol: 0.01 }, { label: 'Aufrufe', ans: 5, tol: 0.01 }],
          sol: tab(['Aufruf', 'gibt zurück'], [['fakultaet(0)', '1'], ['fakultaet(1)', '1 · 1 = 1'], ['fakultaet(2)', '2 · 1 = 2'], ['fakultaet(3)', '3 · 2 = 6'], ['fakultaet(4)', '4 · 6 = 24']]) + `<p>5 Aufrufe (für n = 4, 3, 2, 1, 0).</p>` },
        { id: 'IT15d', label: 'd)', be: 2, text: 'Erläutern Sie, warum der Abbruchfall <code>fakultaet(0) = 1</code> (und nicht 0) gewählt wird.',
          sol: `<p>Mit 0 würde jedes Produkt 0 ergeben. Die Definition <code>0! = 1</code> ist außerdem das „leere Produkt“ und passt zur Regel n! = n · (n−1)!, z. B. 1! = 1 · 0! = 1.</p>` }
      ]
    },
    {
      id: 'IT16', fach: F, teil: 'B', lesson: 'IF7', title: 'Rekursion auf einer Liste: Maximum', afb: 'III', ops: 'Entwickeln, Dokumentieren, Vergleichen',
      intro: `${DYN}Die Operation <code>max_rek(liste, i)</code> soll das größte Element der Positionen <code>i</code> bis zum Ende von <code>liste</code> <b>rekursiv</b> bestimmen. Der Erstaufruf lautet <code>max_rek(liste, 0)</code>. Die Liste ist nicht leer.`,
      parts: [
        { id: 'IT16a', label: 'a)', be: 5, text: 'Entwickeln Sie ein Struktogramm der Operation.',
          hints: ['Abbruch: i ist die letzte Position, dann ist liste[i] das Maximum des Rests.'],
          sol: ns(IA.maxRek) + list(['Abbruchfall (2 BE)', 'Selbstaufruf mit i + 1 (2 BE)', 'Vergleich und Rückgabe (1 BE)']) },
        { id: 'IT16b', label: 'b)', be: 3, text: 'Dokumentieren Sie die Aufrufe von <code>max_rek([3, 9, 4], 0)</code> mit Rückgabewerten und geben Sie das Ergebnis an.',
          nums: [{ label: 'Ergebnis', ans: 9, tol: 0.01 }],
          sol: tab(['Aufruf', 'Abbruch?', 'rest', 'Rückgabe'], [['max_rek(l, 0)', 'nein', '9', '9 (9 > 3)'], ['max_rek(l, 1)', 'nein', '4', '9 (4 &lt; 9)'], ['max_rek(l, 2)', 'ja', '–', '4']]) + `<p>Ergebnis 9.</p>` },
        { id: 'IT16c', label: 'c)', be: 2, text: 'Geben Sie an, wie viele Aufrufe bei einer Liste mit n Elementen insgesamt ausgeführt werden.',
          sol: `<p><b>n</b> Aufrufe (für i = 0, 1, …, n−1). Jeder Aufruf erhöht i um 1.</p>` },
        { id: 'IT16d', label: 'd)', be: 2, text: 'Vergleichen Sie die rekursive Lösung mit der Lösung durch eine Schleife.',
          sol: `<p>Beide brauchen n Schritte (O(n)). Die Schleife benötigt keinen Aufrufstapel und läuft auch bei sehr langen Listen; die Rekursion belegt n Aufrufe auf dem Stapel (bei sehr langen Listen <code>RecursionError</code>), ist aber kürzer und näher an der Definition „Maximum = größeres von erstem Element und Maximum des Rests“.</p>` }
      ]
    },
    {
      id: 'IT18', fach: F, teil: 'A', lesson: 'IF8', title: 'Aufrufe bei rekursivem Fibonacci', afb: 'II', ops: 'Bestimmen, Berechnen, Erläutern',
      intro: `Gegeben ist die Funktion:${code(`
def fib_rek(n):
    if n < 2:
        return n
    return fib_rek(n - 1) + fib_rek(n - 2)`)}Die Anzahl der Aufrufe (der erste mitgezählt) sei <code>a(n)</code>. Es gilt <code>a(0) = a(1) = 1</code> und <code>a(n) = 1 + a(n−1) + a(n−2)</code>.`,
      parts: [
        { id: 'IT18a', label: 'a)', be: 3, text: 'Bestimmen Sie <code>a(5)</code> mit Hilfe der Formel.', nums: [{ label: 'a(5)', ans: 15, tol: 0.01 }],
          hints: ['a(2) = 3, a(3) = 1 + 3 + 1 = 5 …'],
          sol: tab(['n', '0', '1', '2', '3', '4', '5'], [['a(n)', '1', '1', '3', '5', '9', '15']]) + `<p>a(5) = 1 + a(4) + a(3) = 1 + 9 + 5 = 15.</p>` },
        { id: 'IT18b', label: 'b)', be: 3, text: 'Zeichnen Sie den Aufrufbaum für <code>fib_rek(4)</code> und geben Sie an, welche Aufrufe mehrfach vorkommen.',
          sol: code(`
fib(4)
├─ fib(3)
│  ├─ fib(2)
│  │  ├─ fib(1)
│  │  └─ fib(0)
│  └─ fib(1)
└─ fib(2)
   ├─ fib(1)
   └─ fib(0)`) + `<p>Mehrfach: <code>fib(2)</code> 2-mal, <code>fib(1)</code> 3-mal, <code>fib(0)</code> 2-mal (9 Aufrufe).</p>` },
        { id: 'IT18c', label: 'c)', be: 2, text: 'Für n = 25 löst <code>fib_rek(25)</code> ungefähr so viele Aufrufe aus: <code>a(25) = 2·fib(26) − 1</code>. Berechnen Sie diesen Wert (fib(26) = 121 393) und vergleichen Sie mit der Schleifenvariante.',
          nums: [{ label: 'a(25)', ans: 242785, tol: 0.001 }],
          sol: `<p><code>a(25) = 2 · 121 393 − 1 = 242 785</code> Aufrufe. Die Schleifenvariante <code>fib_iter(25)</code> braucht 25 Durchläufe.</p>` },
        { id: 'IT18d', label: 'd)', be: 2, text: 'Erläutern Sie, warum die rekursive Variante so viel langsamer ist.',
          sol: `<p>Durch die <b>zwei</b> Selbstaufrufe entsteht ein Aufrufbaum, in dem dieselben Teilaufgaben (z. B. <code>fib(2)</code>) immer wieder neu berechnet werden. Die Zahl der Aufrufe wächst exponentiell (O(2ⁿ)); die Schleife berechnet jeden Wert nur einmal (O(n)).</p>` }
      ]
    },
    // ---------------------------------------------------------------- IF9: Verkettete Liste
    {
      id: 'IT21', fach: F, teil: 'A', lesson: 'IF9', title: 'Verkettete Liste: Zeiger umbiegen', afb: 'II', ops: 'Angeben, Beschreiben, Begründen',
      intro: `Gegeben ist die verkettete Liste${code(`
Anker → [Messer|•] → [Schild|•] → [Kompass|NULL]`)}`,
      parts: [
        { id: 'IT21a', label: 'a)', be: 3, text: 'In einem <b>Array</b> mit 10 Elementen soll ein neues Element an der 3. Position eingefügt werden. Wie viele Elemente müssen verschoben werden? Wie viele sind es bei einer verketteten Liste?',
          nums: [{ label: 'Array: verschoben', ans: 8, tol: 0.01 }, { label: 'Liste: verschoben', ans: 0, tol: 0.01 }],
          sol: `<p>Array: Die Elemente der Positionen 3 bis 10 (<b>8</b> Stück) rücken um eins nach hinten. Verkettete Liste: <b>keines</b>, es werden nur Zeiger geändert.</p>` },
        { id: 'IT21b', label: 'b)', be: 3, text: 'Beschreiben Sie in der richtigen Reihenfolge, wie <code>Bogen</code> direkt hinter <code>Schild</code> eingefügt wird.',
          sol: `<p>1. Knoten <code>Bogen</code> erzeugen. 2. <code>Bogen.naechster ← Kompass</code> (Zeiger von Schild übernehmen). 3. <code>Schild.naechster ← Bogen</code>.${code(`
Anker → [Messer|•] → [Schild|•] → [Bogen|•] → [Kompass|NULL]`)}</p>` + list(['Knoten erzeugen (1 BE)', 'Neuer Knoten zeigt auf Nachfolger (1 BE)', 'Vorgänger zeigt auf neuen Knoten (1 BE)']) },
        { id: 'IT21c', label: 'c)', be: 2, text: 'Begründen Sie, warum die Reihenfolge der beiden Zeigeränderungen wichtig ist.',
          sol: `<p>Würde man zuerst <code>Schild.naechster ← Bogen</code> setzen, wüsste niemand mehr, wo <code>Kompass</code> liegt (der alte Zeiger von Schild ist überschrieben). Der Rest der Liste ginge verloren.</p>` },
        { id: 'IT21d', label: 'd)', be: 2, text: 'Beschreiben Sie, wie in der ursprünglichen Liste der erste Knoten <code>Messer</code> gelöscht wird.',
          sol: `<p>Der <b>Anker</b> muss auf den zweiten Knoten zeigen: <code>Anker ← Messer.naechster</code> (also auf <code>Schild</code>). Danach zeigt nichts mehr auf <code>Messer</code>.</p>` }
      ]
    },
    // ---------------------------------------------------------------- IF10: Stapel
    {
      id: 'IT23', fach: F, teil: 'A', lesson: 'IF10', title: 'Stapel: Rücktaste im Textfeld', afb: 'I', ops: 'Angeben, Dokumentieren',
      intro: `${DYN}Ein Textfeld speichert jedes getippte Zeichen in einem Stapel. Die Rücktaste entfernt das oberste Zeichen. Es werden der Reihe nach ausgeführt:${tab(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'], [['push("S")', 'push("T")', 'push("A")', 'push("X")', 'pop()', 'push("P")', 'push("E")', 'push("N")', 'pop()', 'push("L")']])}`,
      parts: [
        { id: 'IT23a', label: 'a)', be: 3, text: 'Welches Wort steht nach den zehn Operationen im Textfeld (von unten nach oben gelesen)?',
          sol: `<p><b>STAPEL</b>: S, T, A, X; pop entfernt X; P, E, N; pop entfernt N; L.</p>` + list(['Wort (1 BE)', 'pop-Operationen richtig berücksichtigt (2 BE)']) },
        { id: 'IT23b', label: 'b)', be: 2, text: 'Wie viele Elemente liegen nach der 8. Operation auf dem Stapel, und was liefert die 9. Operation zurück?',
          nums: [{ label: 'Elemente nach Op. 8', ans: 6, tol: 0.01 }],
          sol: `<p>Nach Operation 8: S, T, A, P, E, N = <b>6</b> Elemente. Die 9. Operation (<code>pop()</code>) liefert <b>"N"</b> zurück.</p>` },
        { id: 'IT23c', label: 'c)', be: 2, text: 'Erläutern Sie den Unterschied zwischen <code>top()</code> und <code>pop()</code>.',
          sol: `<p><code>top()</code> gibt das oberste Element zurück, lässt es aber auf dem Stapel. <code>pop()</code> gibt es zurück <b>und entfernt</b> es.</p>` }
      ]
    },
    {
      id: 'IT24', fach: F, teil: 'B', lesson: 'IF10', title: 'Klammerprüfung mit Stapel', afb: 'III', ops: 'Entwickeln, Dokumentieren, Implementieren',
      intro: `${DYN}Die Operation <code>klammernOk(text)</code> prüft, ob alle Klammern <code>()</code>, <code>[]</code>, <code>{}</code> in einer Zeichenkette richtig geöffnet und geschlossen werden. Andere Zeichen werden ignoriert.`,
      parts: [
        { id: 'IT24a', label: 'a)', be: 6, text: 'Entwickeln Sie ein Struktogramm für <code>klammernOk</code> mit Hilfe eines Stapels.',
          hints: ['Öffnend: push. Schließend: Stapel leer → falsch; sonst pop und Typ vergleichen. Am Ende muss der Stapel leer sein.'],
          sol: ns(IA.klammernOk) + list(['Stapel anlegen, Schleife über alle Zeichen (1 BE)', 'öffnende Klammern push (1 BE)', 'schließende: leer prüfen (1 BE)', 'schließende: pop und Typ vergleichen (2 BE)', 'Rückgabe: Stapel leer? (1 BE)']) },
        { id: 'IT24b', label: 'b)', be: 3, text: 'Dokumentieren Sie den Stapel nach jedem Zeichen für <code>{[a]}(</code> und geben Sie die Rückgabe an.',
          sol: tab(['Zeichen', 'Operation', 'Stapel (unten → oben)'], [['{', 'push', '{'], ['[', 'push', '{ ['], ['a', 'ignoriert', '{ ['], [']', 'pop → [ (passt)', '{'], ['}', 'pop → { (passt)', 'leer'], ['(', 'push', '(']]) + `<p>Am Ende liegt noch <code>(</code> auf dem Stapel: <code>isEmpty()</code> ist falsch → Rückgabe <b>falsch</b> (eine öffnende Klammer wurde nie geschlossen).</p>` },
        { id: 'IT24c', label: 'c)', be: 5, text: 'Implementieren Sie <code>klammernOk</code> in Python (eine Liste als Stapel mit <code>append</code> und <code>pop</code>).',
          sol: code(`
def klammern_ok(text):
    stapel = []
    paar = {")": "(", "]": "[", "}": "{"}
    for z in text:
        if z in "([{":
            stapel.append(z)
        elif z in ")]}":
            if len(stapel) == 0:
                return False
            oben = stapel.pop()
            if oben != paar[z]:
                return False
    return len(stapel) == 0`) + list(['Schleife und öffnende (1 BE)', 'schließende mit Leerprüfung (2 BE)', 'Zuordnung der Paare (1 BE)', 'Rückgabe (1 BE)']) }
      ]
    },

    // ---------------------------------------------------------------- IF11: Schlange
    {
      id: 'IT25', fach: F, teil: 'A', lesson: 'IF11', title: 'Druckerwarteschlange', afb: 'II', ops: 'Dokumentieren, Angeben, Vergleichen',
      intro: `${DYN}Ein Drucker verarbeitet Aufträge in einer Warteschlange. Es geschieht der Reihe nach: Auftrag A kommt, B kommt, C kommt, der Drucker druckt (<code>dequeue()</code>), D kommt, Drucker druckt, Drucker druckt, E kommt, Drucker druckt.`,
      parts: [
        { id: 'IT25a', label: 'a)', be: 4, text: 'Dokumentieren Sie die Warteschlange (vorn links) nach jedem Ereignis und geben Sie an, welcher Auftrag jeweils gedruckt wird.',
          sol: tab(['Nr.', 'Ereignis', 'Operation', 'Schlange danach', 'gedruckt'], [['1', 'A kommt', 'enqueue(A)', 'A', '–'], ['2', 'B kommt', 'enqueue(B)', 'A, B', '–'], ['3', 'C kommt', 'enqueue(C)', 'A, B, C', '–'], ['4', 'drucken', 'dequeue()', 'B, C', 'A'], ['5', 'D kommt', 'enqueue(D)', 'B, C, D', '–'], ['6', 'drucken', 'dequeue()', 'C, D', 'B'], ['7', 'drucken', 'dequeue()', 'D', 'C'], ['8', 'E kommt', 'enqueue(E)', 'D, E', '–'], ['9', 'drucken', 'dequeue()', 'E', 'D']]) + list(['Reihenfolge der Schlange (2 BE)', 'gedruckte Aufträge A, B, C, D (2 BE)']) },
        { id: 'IT25b', label: 'b)', be: 2, text: 'Wie viele Aufträge warten am Ende, und welcher wird als nächster gedruckt?', nums: [{ label: 'wartende Aufträge', ans: 1, tol: 0.01 }],
          sol: `<p>1 Auftrag wartet: <b>E</b> (<code>head()</code>) wird als nächster gedruckt.</p>` },
        { id: 'IT25c', label: 'c)', be: 2, text: 'In welcher Reihenfolge würden die Aufträge gedruckt, wenn der Drucker einen <b>Stapel</b> statt einer Schlange verwenden würde (gleiche Ereignisse, <code>pop()</code> statt <code>dequeue()</code>)?',
          sol: `<p>push A, B, C → pop: <b>C</b>; push D → pop: <b>D</b>; pop: <b>B</b>; push E → pop: <b>E</b>. Reihenfolge: <b>C, D, B, E</b> (A bleibt liegen). Beim Stapel werden die zuletzt gekommenen Aufträge zuerst gedruckt, A käme ewig nicht dran: unfair.</p>` }
      ]
    },
    {
      id: 'IT26', fach: F, teil: 'B', lesson: 'IF11', title: 'Schlange in eine Tabelle eintragen', afb: 'III', ops: 'Entwickeln, Erläutern, Angeben',
      intro: `${DYN}Ein Messgerät liefert Werte in einer <b>Schlange</b> <code>q</code> (vorn = ältester Wert). Die Werte sollen in eine Tabelle mit <code>zeilen</code> Zeilen und <code>spalten</code> Spalten eingetragen werden (zweidimensionale Liste). Die Länge der Schlange entspricht genau der Zahl der Felder.`,
      parts: [
        { id: 'IT26a', label: 'a)', be: 6, text: 'Entwickeln Sie ein Struktogramm für <code>eintragen(q, zeilen, spalten)</code>: Die Werte werden <b>zeilenweise von links nach rechts</b> eingetragen, die Tabelle wird zurückgegeben.',
          sol: ns(IA.eintragen) + list(['Tabelle und Zeile anlegen (1 BE)', 'zwei geschachtelte Schleifen (2 BE)', '<code>dequeue()</code> für jeden Wert (2 BE)', 'Rückgabe (1 BE)']) },
        { id: 'IT26b', label: 'b)', be: 4, text: 'Erläutern Sie, wie die Operation geändert werden muss, wenn jede zweite Zeile (Zeile 1, 3, …) von <b>rechts nach links</b> gefüllt werden soll (Schlangenlinie).',
          sol: `<p>In Zeilen mit <b>ungeradem Index</b> werden die Spalten rückwärts gefüllt: Die innere Schleife läuft dann von <code>spalten − 1</code> bis 0 und trägt <code>q.dequeue()</code> in <code>tabelle[z][s]</code> ein. Alternativ: Zeile normal füllen und bei ungeradem <code>z</code> die fertige Zeile umdrehen. Die Verzweigung <code>z mod 2 = 1</code> steht in der äußeren Schleife.</p>` + list(['Fallunterscheidung gerade/ungerade (2 BE)', 'umgekehrte Reihenfolge der Spalten (2 BE)']) },
        { id: 'IT26c', label: 'c)', be: 2, text: 'Die Schlange enthält <code>1, 2, 3, 4, 5, 6</code> (1 vorn), die Tabelle hat 2 Zeilen und 3 Spalten. Welcher Wert steht in Zeile 1, Spalte 0 (Zählung ab 0) bei der normalen und bei der Schlangenlinien-Variante?',
          nums: [{ label: 'normal', ans: 4, tol: 0.01 }, { label: 'Schlangenlinie', ans: 6, tol: 0.01 }],
          sol: `<p>Normal: Zeile 1 = <code>[4, 5, 6]</code>, also <b>4</b>. Schlangenlinie: Zeile 1 wird rückwärts gefüllt: <code>[6, 5, 4]</code>, also <b>6</b>.</p>` }
      ]
    },
    {
      id: 'IT27', fach: F, teil: 'A', lesson: 'IF11', title: 'Stapel oder Schlange?', afb: 'II', ops: 'Zuordnen, Begründen, Erläutern',
      intro: 'Für jede Situation soll eine passende Datenstruktur gewählt werden.',
      parts: [
        { id: 'IT27a', label: 'a)', be: 5, text: 'Ordnen Sie zu (Stapel oder Schlange) und begründen Sie kurz: (1) Zurück-Taste im Browser, (2) Druckaufträge, (3) Rückgängig-Funktion (Undo) in einem Editor, (4) Kunden in einem Callcenter, (5) Aufrufe bei der Rekursion.',
          sol: tab(['Situation', 'Struktur', 'Begründung'], [['Zurück-Taste', 'Stapel', 'Die zuletzt besuchte Seite wird zuerst wieder geöffnet (LIFO).'], ['Druckaufträge', 'Schlange', 'Der Reihe nach, wer zuerst kommt, wird zuerst gedruckt (FIFO).'], ['Rückgängig', 'Stapel', 'Die letzte Änderung wird zuerst zurückgenommen.'], ['Callcenter', 'Schlange', 'Anrufer werden in der Reihenfolge ihres Anrufs bedient.'], ['Rekursion', 'Stapel', 'Der zuletzt gestartete Aufruf muss zuerst fertig werden (Aufrufstapel).']]) + list(['je Zuordnung mit Begründung 1 BE']) },
        { id: 'IT27b', label: 'b)', be: 3, text: 'Eine Schlange wird mit einer verketteten Liste (Anker) umgesetzt. Erläutern Sie, warum man zusätzlich einen Zeiger auf den <b>letzten</b> Knoten speichert.',
          sol: `<p>Mit <code>enqueue</code> wird hinten angehängt. Ohne Zeiger auf das Ende müsste man bei jedem <code>enqueue</code> die ganze Liste vom Anker aus durchlaufen (O(n)). Mit dem Endzeiger genügt es, den Zeiger des letzten Knotens auf den neuen zu setzen und den Endzeiger umzubiegen (O(1)). <code>dequeue</code> arbeitet am Anker und braucht den Endzeiger nicht.</p>` + list(['enqueue hängt hinten an (1 BE)', 'ohne Endzeiger Durchlauf nötig (1 BE)', 'mit Endzeiger direkt (1 BE)']) }
      ]
    }
  ];

  // ======================================================================
  // PROBEKLAUSUREN (fest) und SPICKZETTEL
  // ======================================================================
  const PROBES = [
    { id: 'PI1', fach: F, titel: 'Probeklausur Informatik 1: Lesen, Dokumentieren, Verstehen', tasks: ['IT1', 'IT4', 'IT10', 'IT14', 'IT21'], minuten: 90 },
    { id: 'PI2', fach: F, titel: 'Probeklausur Informatik 2: Sortieren, Rekursion, Datenstrukturen', tasks: ['IT5', 'IT11', 'IT13', 'IT25', 'IT18'], minuten: 90 },
    { id: 'PI3', fach: F, titel: 'Probeklausur Informatik 3: Entwickeln und Implementieren', tasks: ['IT7', 'IT15', 'IT24', 'IT26'], minuten: 90 }
  ];

  const SPICK = `<h3>Ablauf lesen</h3>
<ul><li>Tracetabelle: Spalte pro Variable, Zeile pro Durchlauf; Schleifenbedingung einmal öfter prüfen, als der Rumpf läuft.</li><li><code>=</code> zuweisen, <code>==</code> vergleichen; <code>/</code> Kommazahl, <code>//</code> abschneiden, <code>%</code> Rest.</li><li>Fehler: <b>Syntax</b> (vor dem Start), <b>Laufzeit</b> (Abbruch, z. B. IndexError), <b>Logik</b> (läuft, falsches Ergebnis).</li><li>Lokal: Parameter und Variablen im Rumpf. Liste als Parameter: Änderung wirkt auch außen. Zahl: Kopie.</li></ul>
<h3>Struktogramm</h3>
<ul><li>Folge · Verzweigung (ja/nein) · Mehrfachauswahl · Schleife kopf-/fußgesteuert/zählergesteuert · Unterprogramm (Doppelstrich).</li><li>Keine Python-Syntax. Initialisierung ja, Deklaration nein. Operation: <code>name(Parameter)</code>, „Rückgabe“.</li></ul>
<h3>Listen (Listeen)</h3>
<ul><li>Index ab 0, letzter <code>len − 1</code>. <code>l[i]</code> · <code>append</code> · <code>insert</code> · <code>l[i] = x</code> · <code>del l[i]</code> · <code>len</code>. Tupel (nicht veränderbar).</li><li>Maximum: Startwert = 1. Element. Summe/Zählen: Start 0. 2D: <code>m[zeile][spalte]</code>.</li></ul>
<h3>Sortieren (alle O(n²))</h3>
<ul><li><b>Selection:</b> kleinstes im Rest suchen, nach vorn tauschen; immer n(n−1)/2 Vergleiche.</li><li><b>Insertion:</b> Element einsortieren, Größere nach rechts schieben; sortiert: n−1 Vergleiche.</li><li><b>Bubble:</b> Nachbarn vergleichen/tauschen, innen bis <code>n−1−i</code>; nach Durchlauf i stehen die i größten hinten.</li><li>Tauschen: Hilfsvariable (Python: <code>a, b = b, a</code>).</li></ul>
<h3>Laufzeit</h3>
<ul><li>Schritte zählen, nicht Sekunden. Geschachtelt multiplizieren, hintereinander addieren. Konstanten weglassen.</li><li>O(1) · O(n) · O(n²) (n verdoppeln → ×4) · O(2ⁿ) naives Fibonacci.</li></ul>
<h3>Rekursion</h3>
<ul><li><b>Abbruchbedingung</b> + <b>Rekursionsschritt</b> (kleineres Problem). Aufrufstapel, Rekursionstiefe, ohne Abbruch <code>RecursionError</code>.</li><li>Dokumentieren: erst Aufrufe untereinander (Abstieg), dann Rückgabewerte von unten (Aufstieg).</li><li><code>summe(n) = n + summe(n−1)</code>, <code>n! = n · (n−1)!</code>, 0! = 1: n + 1 Aufrufe.</li><li>Fibonacci: <code>fib(n) = fib(n−1) + fib(n−2)</code>, Aufrufe <code>a(n) = 1 + a(n−1) + a(n−2)</code> (a(5) = 15, a(10) = 177); Schleife nur n Schritte.</li></ul>
<h3>Verkettete Liste</h3>
<ul><li>Knoten = Daten + Zeiger; Anker → Listenkopf; Ende: NULL (<code>None</code>). Dynamisch (Array: statisch).</li><li><b>Einfügen nach v:</b> 1. neuer Knoten, 2. <code>neu.next = v.next</code>, 3. <code>v.next = neu</code> (Reihenfolge!). <b>Löschen:</b> Vorgänger-Zeiger umbiegen; erster Knoten: Anker; letzter: Vorgänger → NULL.</li><li>Zugriff auf i-tes Element: durchlaufen (O(n)). Doppelt verkettet: zusätzlich Vorgänger-Zeiger.</li></ul>
<h3>Stapel (LIFO) und Schlange (FIFO)</h3>
<ul><li><b>Stack:</b> <code>push</code> · <code>pop</code> (entnimmt) · <code>top</code> (nur ansehen) · <code>isEmpty</code>. Browser-Zurück, Undo, Aufrufstapel, Klammerprüfung (am Ende leer?).</li><li><b>Queue:</b> <code>enqueue</code> (hinten) · <code>dequeue</code> (vorn) · <code>head</code> · <code>isEmpty</code>. Druckaufträge, Puffer, Taxistand.</li><li>Umsetzung mit Liste: Stack am Anker, Queue zusätzlich Zeiger auf das letzte Element.</li></ul>
<h3>Operatoren in Aufgaben</h3>
<ul><li><b>Angeben/Nennen:</b> kurz ohne Begründung. <b>Dokumentieren:</b> Ablauf in Tabelle. <b>Erläutern/Beschreiben:</b> in Sätzen mit Beispiel. <b>Entwickeln:</b> Struktogramm. <b>Implementieren:</b> Code. <b>Begründen/Untersuchen:</b> mit Argument.</li></ul>`;

  window.LR_TASKS = (window.LR_TASKS || []).concat(TASKS);
  window.LR_PROBES = (window.LR_PROBES || []).concat(PROBES);
  window.LR_SPICK = Object.assign(window.LR_SPICK || {}, { informatik: SPICK });
})();
