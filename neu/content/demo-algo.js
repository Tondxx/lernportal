/* ==========================================================================
   DEMO-ALGORITHMUS für Bauschritt S3 (Struktogramm · Pseudocode · Python).
   Bewusst KEIN Unterrichtsstoff (kein Stapel/Schlange/Rekursion): ein neutraler
   Standard-Algorithmus „größte Zahl in einer Liste“. Zahlen: neu/tests/algo.test.js
   ========================================================================== */
(function () {
  const A = window.LRAlgo.A;

  const def = {
    id: 'demo-algo-max',
    fach: 'informatik',
    demo: true,
    titel: 'Größte Zahl in einer Liste',
    kurz: 'Ein Algorithmus, drei Schreibweisen: Struktogramm, Pseudocode und Python.',
    quelle: 'Demo-Inhalt (neutrales Standardbeispiel), kein Unterrichtsmaterial',
    text: 'Der Algorithmus bekommt eine nicht leere Liste von Zahlen und gibt die größte Zahl zurück.',
    algo: {
      name: 'groesste', params: ['liste'],
      body: [
        A.do('maximum ← liste[0]', 'maximum = liste[0]'),
        A.each('zahl', 'liste', [
          A.if('zahl > maximum', 'zahl > maximum', [A.do('maximum ← zahl', 'maximum = zahl')])
        ]),
        A.ret('maximum')
      ]
    },
    beispiel: [4, 9, 2, 7, 12, 5],
    // Ausgabe-Vorhersage (Ersatz fürs Ausführen, bis Python im Browser läuft: Plan 4.3)
    fragen: [
      { frage: 'Was gibt groesste([3, 8, 2, 8]) zurück?', optionen: ['3', '8', '2', '16'], richtig: 1, erklaerung: 'Die Bedingung „zahl > maximum“ ist bei der zweiten 8 falsch (8 ist nicht größer als 8). Das Maximum bleibt 8.' },
      { frage: 'Wie oft wird die Bedingung „zahl > maximum“ bei einer Liste mit 6 Zahlen geprüft?', optionen: ['5-mal', '6-mal', '7-mal'], richtig: 1, erklaerung: 'Die Schleife läuft für jedes Element, also 6-mal. (Das erste Element wird mit sich selbst verglichen, das ist harmlos.)' },
      { frage: 'Was würde passieren, wenn die Zeile „maximum ← liste[0]“ fehlt?', optionen: ['Es funktioniert genauso.', 'Fehler: „maximum“ hat noch keinen Wert, wenn zum ersten Mal verglichen wird.', 'Es wird immer die erste Zahl zurückgegeben.'], richtig: 1, erklaerung: 'Eine Variable braucht einen Startwert, bevor man sie vergleicht. Das nennt man Initialisieren.' }
    ],
    // Ablauf-Tabelle: Wert von „maximum“ nach jedem Durchlauf für [4, 9, 2, 7, 12, 5]
    ablauf: {
      frage: 'Verfolge den Algorithmus mit der Liste [4, 9, 2, 7, 12, 5]. Welchen Wert hat „maximum“ nach dem jeweiligen Durchlauf der Schleife? (Startwert: 4)',
      checkpoints: [
        { id: 'd2', label: 'nach Durchlauf 2 (Zahl 9)', wert: 9 },
        { id: 'd3', label: 'nach Durchlauf 3 (Zahl 2)', wert: 9 },
        { id: 'd5', label: 'nach Durchlauf 5 (Zahl 12)', wert: 12 },
        { id: 'd6', label: 'nach Durchlauf 6 (Zahl 5)', wert: 12 }
      ]
    }
  };

  window.LR_ALGOS = (window.LR_ALGOS || []).concat([def]);
})();
