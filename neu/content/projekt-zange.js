/* ==========================================================================
   PROJEKTTAGEBUCH – Startinhalt für das Informatik-Projekt „Zange“ (19.11.2026)
   Vorgaben der Lehrkraft: Projekt „Probleme mit Rekursion lösen“ (Datenstrukturen,
   Bibliotheken, Rekursion; Python-Code, Struktogramme, Projekttagebuch, Präsentation).
   Raster: Projektstart (Teil I) · Protokolle nach jeder Phase (Teil II) · Reflexion und
   Selbsteinschätzung (Teil III.2).
   Das ist nur die VORBELEGUNG. Was Tonda ändert, liegt als Ereignis `pj` im Profil
   (siehe projekt.js) und überschreibt diese Werte. Zeilen haben feste Ids, damit
   Änderungen und Löschungen an der richtigen Zeile hängen.
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
      version: '1 vom 19.11.2026',
      mitglieder: 'Tonda',
      thema: 'Zange: ein Karten-Glücksspiel, dessen Quoten und beste Strategie rekursiv berechnet werden',
      beschreibung: [
        'Zange ist ein Kartenspiel für eine Person gegen die Bank, gespielt nur mit Spielgeld. Man zieht Karten, die zwischen zwei Grenzkarten liegen müssen, und das Fenster dazwischen wird mit jeder Karte enger. Die Oberfläche zeigt einen Kartentisch von schräg oben, ähnlich wie Blackjack.',
        '',
        'Regeln (Version 1, dürfen sich im Projekt noch ändern):',
        '1. Gespielt wird mit 52 Karten. Werte: 2 bis 10, Bube = 11, Dame = 12, König = 13, Ass = 14.',
        '2. Der Spieler setzt einen Einsatz. Der Dealer legt zwei Grenzkarten offen hin, zum Beispiel 3 und Dame.',
        '3. Der Spieler zieht eine Karte. Liegt sie echt zwischen den Grenzen: Treffer, der Multiplikator steigt um die Quote dieser Karte. Liegt sie außerhalb: verloren. Hat sie denselben Wert wie eine Grenze („Pfosten“): verloren.',
        '4. Nach einem Treffer ersetzt die gezogene Karte eine der beiden Grenzen. Der Spieler entscheidet, welche.',
        '5. Danach: weiterziehen oder auszahlen (Einsatz × Multiplikator).',
        '6. Gezogen wird ohne Zurücklegen, die Wahrscheinlichkeiten ändern sich also mit jeder Karte.',
        '',
        'Die Quote jeder Karte richtet sich nach der Trefferwahrscheinlichkeit p im aktuellen Fenster: Quote = (1 − Bankvorteil) / p, mit p = Karten im Fenster / Karten im Stapel. Je enger das Fenster, desto kleiner p und desto höher die Quote.'
      ].join('\n'),
      bezug: [
        'Rekursion: Erwartungswert der besten Strategie. Für jeden Spielstand wird verglichen, ob Auszahlen oder Weiterziehen mehr bringt; Weiterziehen führt zu neuen Spielständen, die genauso bewertet werden.',
        'Datenstrukturen: Kartendeck als Stapel, Verlauf der gezogenen Karten als Liste, Zwischenspeicher für schon berechnete Spielstände.',
        'Bibliotheken: random (Mischen), eine GUI-Bibliothek für den Tisch (tkinter oder pygame, noch offen), evtl. matplotlib für die Auswertung der Simulation.'
      ].join('\n'),
      werkzeuge: 'Python 3 mit Editor (welcher in der Schule genutzt wird: noch eintragen) · Structorizer für die Struktogramme · KI (Claude) für Ideenfindung und grafische Gestaltung (siehe KI-Nutzung) · Präsentationsprogramm',
      zielsatz: 'Bis zum 11.12. soll ein spielbares Zange mit Kartentisch laufen, dessen Quoten und beste Strategie rekursiv berechnet und per Simulation geprüft sind.',
      offen: 'Darf man vor dem ersten Treffer auszahlen? Wird der Bankvorteil bei jeder Karte neu abgezogen (dann wächst er mit jeder gezogenen Karte)? tkinter oder pygame?',
      praes: [
        '1. Das Spiel in 30 Sekunden (Live-Vorführung)',
        '2. Datenstrukturen: Deck als Stapel, Verlauf als Liste',
        '3. Rekursion: wie die beste Strategie berechnet wird, mit Struktogramm',
        '4. Simulation: warum die Bank auf Dauer gewinnt, mit Zahlen',
        '5. Probleme und Lösungen aus dem Tagebuch',
        '6. Fazit'
      ].join('\n')
    },
    // Teilziele
    ziele: [
      ['z1', 'Kartendeck als Stapel, mischen, ziehen'],
      ['z2', 'Prüfen, ob eine Karte Treffer, außerhalb oder Pfosten ist (zuerst für die Beispieleingaben)'],
      ['z3', 'Eine ganze Runde in der Konsole spielbar (Einsatz, Grenze wählen, weiterziehen oder auszahlen)'],
      ['z4', 'Trefferwahrscheinlichkeit und Quote aus den Restkarten berechnen'],
      ['z5', 'Rekursive Funktion für den Erwartungswert der besten Strategie'],
      ['z6', 'Simulation: ein Bot spielt viele Runden und prüft, ob der Bankvorteil stimmt'],
      ['z7', 'Grafische Oberfläche (Kartentisch von schräg oben)'],
      ['z8', 'Struktogramme mit Structorizer'],
      ['z9', 'Präsentation']
    ].map(([id, text], i) => ({ id, text, done: false, ord: i })),
    // Arbeitsplan: Termine laut Vorgaben (13.11., (17.11.), 19.11., 20.11., 24.11., 27.11., 01.12., 03.12., 04.12., 08.12., 11.12. + 15.12.)
    plan: [
      ['p1', '2026-11-13', 'DS + HA', 'Thema suchen, Spielidee festlegen', '', 'erledigt'],
      ['p2', '2026-11-19', 'DS', 'Projekttagebuch anlegen, Regeln und Beispieleingaben festlegen', '', 'in Arbeit'],
      ['p3', '2026-11-20', 'DS', 'Deck als Stapel, Karte ziehen, Karte prüfen (Beispieleingaben)', 'Z1, Z2', 'offen'],
      ['p4', '2026-11-24', 'DS', 'Runde in der Konsole, Wahrscheinlichkeit und Quote', 'Z3, Z4', 'offen'],
      ['p5', '2026-11-27', 'DS', 'Rekursion: beste Strategie, erstes Struktogramm', 'Z5, Z8', 'offen'],
      ['p6', '2026-12-01', 'DS', 'Simulation, Code verallgemeinern', 'Z6', 'offen'],
      ['p7', '2026-12-03', 'DS', 'Oberfläche: Tisch, Karten, Chips', 'Z7', 'offen'],
      ['p8', '2026-12-04', 'DS', 'Oberfläche mit der Spiellogik verbinden, testen', 'Z7', 'offen'],
      ['p9', '2026-12-08', 'DS', 'Struktogramme fertig, Präsentation erstellen', 'Z8, Z9', 'offen'],
      ['p10', '2026-12-10', 'HA', 'Präsentation üben, Zeit stoppen', 'Z9', 'offen'],
      ['p11', '2026-12-11', 'DS', 'Präsentation (Ausweichtermin 15.12.)', 'Z9', 'offen']
    ].map(([id, datum, art, text, ziel, status], i) => ({ id, datum, art, text, ziel, status, ord: i })),
    // Beispieleingaben (Bankvorteil 4 %). Zahlen nachgerechnet: 32/50 = 0,64 → 0,96/0,64 = 1,50;
    // 16/49 → 0,96·49/16 = 2,94; 12/49 → 3,92; 44/50 = 0,88 → 1,09.
    beispiele: [
      ['b1', 'Grenzen 3 und Dame (12), 50 Karten im Stapel', 'Karte 7', 'Treffer'],
      ['b2', 'wie Nr. 1', 'Karte 3', 'Pfosten, verloren'],
      ['b3', 'wie Nr. 1', 'Karte König (13)', 'außerhalb, verloren'],
      ['b4', 'wie Nr. 1', 'Quote berechnen', '32 von 50 Karten passen (4 bis Bube, je 4 Stück): p = 0,64, Quote 1,50'],
      ['b5', 'nach Treffer 7, noch 49 Karten', 'Grenze 3 ersetzen', 'Fenster 7 bis Dame: 16 Karten, p ≈ 0,33, Quote 2,94'],
      ['b6', 'nach Treffer 7, noch 49 Karten', 'Grenze Dame ersetzen', 'Fenster 3 bis 7: 12 Karten, p ≈ 0,24, Quote 3,92'],
      ['b7', 'Grenzen 2 und Ass (14), 50 Karten', 'Quote berechnen', '44 Karten passen: p = 0,88, Quote 1,09'],
      ['b8', 'Grenzen 5 und 6', '–', 'keine Karte passt dazwischen: neu ausgeben'],
      ['b9', 'Guthaben 100', 'Einsatz 150 oder 0', 'abgelehnt, Einsatz neu eingeben']
    ].map(([id, sit, ein, erw], i) => ({ id, sit, ein, erw, ord: i })),
    struktogramme: [
      ['s1', 'Karte prüfen', 'Treffer, außerhalb oder Pfosten'],
      ['s2', 'Quote berechnen', 'p aus den Restkarten, dann Quote'],
      ['s3', 'Beste Strategie (rekursiv)', 'Erwartungswert: auszahlen oder weiterziehen']
    ].map(([id, name, was], i) => ({ id, name, was, stand: '', ord: i })),
    ki: [
      ['k1', 'Spielidee', 'gemeinsam mit KI entwickelt (14.11.)'],
      ['k2', 'Raster des Projekttagebuchs', 'KI (in den Vorgaben erlaubt)'],
      ['k3', 'Spiellogik, Rekursion, Wahrscheinlichkeit, Simulation', 'selbst'],
      ['k4', 'Struktogramme', 'selbst'],
      ['k5', 'Gestaltung der Oberfläche (Tisch, Karten, Farben)', 'mit KI, eintragen sobald genutzt'],
      ['k6', 'Präsentation', '']
    ].map(([id, bereich, wer], i) => ({ id, bereich, wer, ord: i })),
    // Protokolle (Teil II)
    eintraege: [
      { id: 'e1', datum: '2026-11-14', art: 'HA',
        ziel: 'Eine eigene Glücksspiel-Idee finden, die es so noch nicht gibt und die zu den Vorgaben passt',
        geschafft: 'Mehrere Ideen mit KI gesammelt. „Stapelbruch“ (Kistenturm auf Förderband) verworfen, weil mir Idee und 3D-Look nicht gefallen. Entschieden für „Zange“ als Kartenspiel mit Tischansicht wie Blackjack.',
        probleme: 'Wie viel darf von der KI kommen, ohne dass die Eigenleistung fehlt?',
        loesung: 'Aufteilung festgelegt: Spiellogik, Rekursion und Simulation schreibe ich selbst, die KI hilft bei Ideen und Gestaltung.',
        stand: 'Idee fertig; Regeln noch genauer festlegen.',
        ki: 'ja: Ideensammlung',
        next: 'Projekttagebuch anlegen, Regeln und Beispieleingaben aufschreiben' },
      { id: 'e2', datum: '2026-11-19', art: 'DS',
        ziel: 'Projekttagebuch, Regeln, Arbeitsplan und Beispieleingaben',
        geschafft: '', probleme: '', loesung: '', stand: '',
        ki: 'ja: Raster des Projekttagebuchs (wie in den Vorgaben erlaubt)',
        next: '20.11.: Deck als Stapel anlegen und Karte prüfen' }
    ]
  };
})();
