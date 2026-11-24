/* ==========================================================================
   PROJEKTTAGEBUCH – Startinhalt für das Informatik-Projekt „Zange“ (19.11.2026, Texte neu 24.11.2026)
   Vorgaben der Lehrkraft: Projekt „Probleme mit Rekursion lösen“ (Datenstrukturen,
   Bibliotheken, Rekursion; Python-Code, Struktogramme, Projekttagebuch, Präsentation).
   Raster: Projektstart (Teil I) · Protokolle nach jeder Phase (Teil II) · Reflexion und
   Selbsteinschätzung (Teil III.2).
   Das ist nur die VORBELEGUNG. Was Tonda ändert, liegt als Ereignis `pj` im Profil
   (siehe projekt.js) und überschreibt diese Werte. Zeilen haben feste Ids, damit
   Änderungen und Löschungen an der richtigen Zeile hängen.
   Stil (Tonda, 24.11.): einfache Ich-Sätze wie von einem Schüler, keine Stichwortketten mit
   Doppelpunkten, keine Gedankenstriche. Nichts erfinden, unbekannte Felder leer lassen.
   ========================================================================== */
(function () {
  'use strict';
  const P = window.LR_PROJEKTE = window.LR_PROJEKTE || {};
  P.zange = {
    id: 'zange',
    fach: 'informatik',
    titel: 'Zange',
    untertitel: 'Programmierprojekt „Probleme mit Rekursion lösen“',
    kurs: 'Informatik eA · IF13',
    praesentation: '2026-12-11',
    felder: {
      version: '2 vom 24.11.2026',
      mitglieder: 'Tonda',
      thema: 'Zange, ein Karten-Glücksspiel, bei dem die Quoten und die beste Strategie rekursiv berechnet werden',
      beschreibung: [
        'Zange ist ein Kartenspiel, bei dem man allein gegen die Bank spielt. Es geht nur um Spielgeld. Am Anfang liegen zwei Karten offen, das sind die Grenzen. Danach zieht man Karten, die vom Wert her dazwischen liegen müssen. Nach jedem Treffer wird der Bereich kleiner und es wird schwerer. Der Tisch soll am Ende ungefähr so aussehen wie beim Blackjack, von schräg oben.',
        '',
        'Regeln (können sich noch ändern):',
        '1. Es gibt 52 Karten. 2 bis 10 zählen normal, Bube ist 11, Dame 12, König 13 und Ass 14.',
        '2. Man setzt einen Einsatz, dann werden zwei Grenzkarten aufgedeckt, z. B. 3 und Dame.',
        '3. Man zieht eine Karte. Liegt sie zwischen den Grenzen, ist es ein Treffer und der Multiplikator steigt um die Quote dieser Karte. Liegt sie außerhalb, hat man verloren. Wenn sie genauso hoch ist wie eine Grenze (das nenne ich Pfosten), hat man auch verloren.',
        '4. Nach einem Treffer ersetzt die neue Karte eine der beiden Grenzen. Welche, sucht man sich selbst aus.',
        '5. Dann kann man weiterziehen oder sich Einsatz mal Multiplikator auszahlen lassen.',
        '6. Gezogene Karten kommen nicht zurück in den Stapel, deshalb ändern sich die Wahrscheinlichkeiten mit jeder Karte.',
        '',
        'Die Quote hängt davon ab, wie wahrscheinlich ein Treffer ist. p = passende Karten / Karten im Stapel und Quote = (1 − Bankvorteil) / p. Wenn nur wenige Karten passen, ist p klein und die Quote hoch.'
      ].join('\n'),
      bezug: [
        'Rekursion: Das Programm soll ausrechnen, ob sich Auszahlen oder Weiterziehen mehr lohnt. Nach dem Weiterziehen hat man einen neuen Spielstand, für den man wieder genau dasselbe ausrechnen muss. Deshalb passt Rekursion hier gut.',
        'Datenstrukturen: Das Kartendeck ist ein Stapel und die gezogenen Karten kommen in eine Liste. Spielstände, die schon berechnet wurden, will ich zwischenspeichern.',
        'Bibliotheken: random zum Mischen und tkinter oder pygame für den Tisch, das steht noch nicht fest. Vielleicht noch matplotlib, um die Simulation auszuwerten.'
      ].join('\n'),
      werkzeuge: 'Python 3 (Editor noch eintragen), Structorizer für die Struktogramme, KI (Claude) für Ideen und das Aussehen, ein Präsentationsprogramm',
      zielsatz: 'Am 11.12. soll man Zange an einem Kartentisch spielen können. Die Quoten und die beste Strategie werden rekursiv berechnet und mit einer Simulation geprüft.',
      offen: 'Darf man sich schon vor dem ersten Treffer auszahlen lassen? Wird der Bankvorteil bei jeder Karte abgezogen? Dann würde er mit jeder Karte größer werden. Nehme ich tkinter oder pygame?',
      praes: [
        '1. Das Spiel kurz vorführen (30 Sekunden)',
        '2. Datenstrukturen: das Deck als Stapel und die gezogenen Karten als Liste',
        '3. Rekursion: wie die beste Strategie berechnet wird, mit Struktogramm',
        '4. Simulation: Zahlen dazu, warum die Bank auf Dauer gewinnt',
        '5. Was nicht geklappt hat und wie ich es gelöst habe',
        '6. Fazit'
      ].join('\n')
    },
    // Teilziele
    ziele: [
      ['z1', 'Kartendeck als Stapel anlegen, mischen und Karten ziehen'],
      ['z2', 'Prüfen, ob eine Karte ein Treffer, außerhalb oder ein Pfosten ist (erst mit den Beispieleingaben)'],
      ['z3', 'Eine ganze Runde in der Konsole spielen können, mit Einsatz, Grenze auswählen und weiterziehen oder auszahlen'],
      ['z4', 'Wahrscheinlichkeit und Quote mit den restlichen Karten berechnen'],
      ['z5', 'Rekursive Funktion, die den Erwartungswert der besten Strategie berechnet'],
      ['z6', 'Simulation: Ein Bot spielt viele Runden, damit man sieht, ob der Bankvorteil stimmt'],
      ['z7', 'Grafische Oberfläche mit dem Kartentisch von schräg oben'],
      ['z8', 'Struktogramme mit Structorizer'],
      ['z9', 'Präsentation']
    ].map(([id, text], i) => ({ id, text, done: false, ord: i })),
    // Arbeitsplan: Termine laut Vorgaben (13.11., (17.11.), 19.11., 20.11., 24.11., 27.11., 01.12., 03.12., 04.12., 08.12., 11.12. + 15.12.)
    plan: [
      ['p1', '2026-11-13', 'DS + HA', 'Thema suchen und Spielidee festlegen', '', 'erledigt'],
      ['p2', '2026-11-19', 'DS', 'Projekttagebuch anlegen, Regeln und Beispieleingaben aufschreiben', '', 'erledigt'],
      ['p3', '2026-11-20', 'DS', 'Deck als Stapel, Karte ziehen und Karte prüfen (mit Beispieleingaben)', 'Z1, Z2', 'in Arbeit'],
      ['p4', '2026-11-24', 'DS', 'Runde in der Konsole, Wahrscheinlichkeit und Quote', 'Z3, Z4', 'offen'],
      ['p5', '2026-11-27', 'DS', 'Rekursion für die beste Strategie, mit Struktogramm', 'Z5, Z8', 'offen'],
      ['p6', '2026-12-01', 'DS', 'Simulation, Code allgemeiner machen', 'Z6', 'offen'],
      ['p7', '2026-12-03', 'DS', 'Oberfläche mit Tisch, Karten und Chips', 'Z7', 'offen'],
      ['p8', '2026-12-04', 'DS', 'Oberfläche mit dem Spiel verbinden und testen', 'Z7', 'offen'],
      ['p9', '2026-12-08', 'DS', 'Struktogramme fertig machen, Präsentation erstellen', 'Z8, Z9', 'offen'],
      ['p10', '2026-12-10', 'HA', 'Präsentation üben und Zeit stoppen', 'Z9', 'offen'],
      ['p11', '2026-12-11', 'DS', 'Präsentation (Ausweichtermin 15.12.)', 'Z9', 'offen']
    ].map(([id, datum, art, text, ziel, status], i) => ({ id, datum, art, text, ziel, status, ord: i })),
    // Beispieleingaben (Bankvorteil 4 %). Zahlen nachgerechnet: 32/50 = 0,64 → 0,96/0,64 = 1,50;
    // 16/49 → 0,96·49/16 = 2,94; 12/49 → 3,92; 44/50 = 0,88 → 1,09.
    beispiele: [
      ['b1', 'Grenzen 3 und Dame (12), 50 Karten im Stapel', 'Karte 7', 'Treffer'],
      ['b2', 'wie Nr. 1', 'Karte 3', 'Pfosten, also verloren'],
      ['b3', 'wie Nr. 1', 'Karte König (13)', 'außerhalb, also verloren'],
      ['b4', 'wie Nr. 1', 'Quote berechnen', '32 von 50 Karten passen (4 bis Bube, jeweils 4). p = 0,64 und Quote 1,50'],
      ['b5', 'nach Treffer 7, noch 49 Karten', 'Grenze 3 ersetzen', 'Zwischen 7 und Dame passen 16 Karten. p ≈ 0,33 und Quote 2,94'],
      ['b6', 'nach Treffer 7, noch 49 Karten', 'Grenze Dame ersetzen', 'Zwischen 3 und 7 passen 12 Karten. p ≈ 0,24 und Quote 3,92'],
      ['b7', 'Grenzen 2 und Ass (14), 50 Karten', 'Quote berechnen', '44 Karten passen. p = 0,88 und Quote 1,09'],
      ['b8', 'Grenzen 5 und 6', 'keine', 'Es passt keine Karte dazwischen, also neu austeilen'],
      ['b9', 'Guthaben 100', 'Einsatz 150 oder 0', 'geht nicht, Einsatz neu eingeben']
    ].map(([id, sit, ein, erw], i) => ({ id, sit, ein, erw, ord: i })),
    struktogramme: [
      ['s4', 'Kartendeck anlegen', 'Legt das Kartendeck an', 'gebaut am 20.11.'],
      ['s5', 'Karten vergleichen', 'Vergleicht, wie groß die Karten sind', 'gebaut am 20.11.'],
      ['s6', 'Programm', 'Ablauf vom Spiel', 'Anfang gebaut am 20.11.'],
      ['s1', 'Karte prüfen', 'Treffer, außerhalb oder Pfosten', ''],
      ['s2', 'Quote berechnen', 'Erst p mit den restlichen Karten, dann die Quote', ''],
      ['s3', 'Beste Strategie (rekursiv)', 'Lohnt sich Auszahlen oder Weiterziehen mehr?', '']
    ].map(([id, name, was, stand], i) => ({ id, name, was, stand, ord: i })),
    ki: [
      ['k1', 'Spielidee', 'zusammen mit KI (14.11.)'],
      ['k2', 'Raster des Projekttagebuchs', 'KI (laut Vorgaben erlaubt)'],
      ['k3', 'Spiellogik, Rekursion, Wahrscheinlichkeit, Simulation', 'selbst'],
      ['k4', 'Struktogramme', 'selbst'],
      ['k5', 'Aussehen der Oberfläche (Tisch, Karten, Farben)', 'mit KI, wird eingetragen, wenn es so weit ist'],
      ['k6', 'Präsentation', '']
    ].map(([id, bereich, wer], i) => ({ id, bereich, wer, ord: i })),
    // Protokolle (Teil II)
    eintraege: [
      { id: 'e1', datum: '2026-11-14', art: 'HA',
        ziel: 'Eine eigene Idee für ein Glücksspiel finden, die es so noch nicht gibt und die zu den Vorgaben passt',
        geschafft: 'Ich habe mit KI mehrere Ideen gesammelt. Eine davon war „Stapelbruch“, da ging es um einen Kistenturm auf einem Förderband. Das habe ich nicht genommen, weil mir die Idee und der 3D-Look nicht gefallen haben. Ich mache jetzt Zange, ein Kartenspiel mit einem Tisch wie beim Blackjack.',
        probleme: 'Ich wusste nicht, wie viel von der KI kommen darf, damit es noch meine eigene Leistung ist.',
        loesung: 'Spiellogik, Rekursion und Simulation schreibe ich selbst. Die KI hilft mir bei Ideen und beim Aussehen.',
        stand: 'Die Idee steht. Die Regeln muss ich noch genauer aufschreiben.',
        ki: 'ja, um Ideen zu sammeln',
        next: 'Projekttagebuch anlegen und Regeln und Beispieleingaben aufschreiben' },
      { id: 'e2', datum: '2026-11-19', art: 'DS',
        ziel: 'Projekttagebuch anlegen, Regeln, Arbeitsplan und Beispieleingaben festlegen',
        geschafft: 'Das Tagebuch ist angelegt. Die erste Version der Regeln steht drin, dazu neun Teilziele, der Arbeitsplan und neun Beispieleingaben.',
        probleme: 'Bei den Regeln ist noch nicht alles klar, z. B. ob man sich vor dem ersten Treffer schon auszahlen lassen darf und ob der Bankvorteil bei jeder Karte abgezogen wird.',
        loesung: 'Noch nicht gelöst. Die Fragen stehen bei den Beispieleingaben unter „Noch zu entscheiden“.',
        stand: 'Der Projektstart ist fertig, bis auf die offenen Fragen zu den Regeln.',
        ki: 'ja, für das Raster vom Projekttagebuch (laut Vorgaben erlaubt)',
        next: 'Deck als Stapel anlegen und Karten prüfen' },
      { id: 'e3', datum: '2026-11-20', art: 'DS',
        ziel: 'Die Struktogramme für die Basis vom Spiel bauen',
        geschafft: 'Ich habe die Struktogramme für die Basis gebaut. Eins legt das Kartendeck an, eins vergleicht die Größe der Karten miteinander und beim dritten habe ich den Anfang vom Programm gemacht.',
        probleme: '', loesung: '',
        stand: 'Deck anlegen und Karten vergleichen sind als Struktogramm da. Vom Programm gibt es erst den Anfang, der Rest fehlt noch.',
        ki: '',
        next: 'Beim Struktogramm vom Programm weitermachen und das Deck in Python anlegen' }
    ]
  };
})();
