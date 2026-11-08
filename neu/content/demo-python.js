/* ==========================================================================
   DEMO-AUFGABEN für die Python-Werkstatt (Bauschritt S8, Portalplan 4.3).
   Bewusst KEIN Unterrichtsstoff: neutrale Standardbeispiele zum Testen.
   Format: { id, fach, demo, titel, kurz, text, start, tests:[{call, erwartet}], loesung, algo?, hinweis?, verbot? }
     tests:    Python-Ausdruck + erwarteter Wert (JSON: Zahl, Text, Liste, true/false, null)
     loesung:  Musterlösung – tests/python.test.js prüft, dass sie alle Tests besteht
     verbot:   Textstücke, die nicht im Code vorkommen sollen (nur Hinweis, keine Sperre)
   ========================================================================== */
(function () {
  window.LR_PY = (window.LR_PY || []).concat([
    {
      id: 'py-groesste', fach: 'informatik', demo: true, algo: 'demo-algo-max',
      titel: 'Größte Zahl in einer Liste',
      kurz: 'Das Beispiel aus „Notation“ selbst programmieren.',
      text: 'Schreibe die Funktion <code>groesste(liste)</code>. Sie bekommt eine nicht leere Liste von Zahlen und gibt die größte Zahl zurück. Benutze dafür eine Schleife, nicht die eingebaute Funktion <code>max()</code>.',
      start: 'def groesste(liste):\n    # Dein Code hier\n    pass\n\n\nprint(groesste([4, 9, 2, 7, 12, 5]))\n',
      tests: [
        { call: 'groesste([4, 9, 2, 7, 12, 5])', erwartet: 12 },
        { call: 'groesste([3, 8, 2, 8])', erwartet: 8 },
        { call: 'groesste([-5, -2, -9])', erwartet: -2 },
        { call: 'groesste([7])', erwartet: 7 }
      ],
      verbot: ['max('],
      hinweis: 'Merke dir die bisher größte Zahl in einer Variablen und vergleiche jede weitere Zahl damit. Startwert: das erste Element.',
      loesung: 'def groesste(liste):\n    maximum = liste[0]\n    for zahl in liste:\n        if zahl > maximum:\n            maximum = zahl\n    return maximum\n'
    },
    {
      id: 'py-summe-gerade', fach: 'informatik', demo: true,
      titel: 'Summe der geraden Zahlen',
      kurz: 'Schleife, Bedingung und eine Variable zum Aufsummieren.',
      text: 'Schreibe die Funktion <code>summe_gerade(liste)</code>. Sie gibt die Summe aller geraden Zahlen der Liste zurück. Für eine leere Liste ist das Ergebnis 0.',
      start: 'def summe_gerade(liste):\n    # Dein Code hier\n    pass\n\n\nprint(summe_gerade([1, 2, 3, 4]))\n',
      tests: [
        { call: 'summe_gerade([1, 2, 3, 4])', erwartet: 6 },
        { call: 'summe_gerade([])', erwartet: 0 },
        { call: 'summe_gerade([5, 7, 9])', erwartet: 0 },
        { call: 'summe_gerade([-2, 10, 3])', erwartet: 8 }
      ],
      hinweis: 'Eine Zahl ist gerade, wenn der Rest beim Teilen durch 2 null ist: zahl % 2 == 0.',
      loesung: 'def summe_gerade(liste):\n    summe = 0\n    for zahl in liste:\n        if zahl % 2 == 0:\n            summe = summe + zahl\n    return summe\n'
    }
  ]);
})();
