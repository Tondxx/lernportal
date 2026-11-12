/* ==========================================================================
   GETEILTE LERNPLÄNE (Bauschritt S3b, Portalplan 8a)
   Diese Pläne sehen ALLE Profile, deren Kurse das Fach enthalten (die Seite ist öffentlich,
   darum nur Lernstoff, nie Persönliches). Wer was geschafft hat, bleibt pro Profil getrennt.
   Datum und Tagesverteilung werden im Portal aus „heute“, dem Klausurtermin und der gewählten
   Lernzeit berechnet. Hier steht nur die REIHENFOLGE.
   Eintrag: { typ, ref, n?, kind?, pin?: 'T-3' }  (siehe neu/plan.js)
   Neue Pläne entstehen, wenn Tonda im Chat sagt, was in der Klausur dran kommt.
   ========================================================================== */
(function () {
  const L = ref => ({ typ: 'lektion', ref });
  const A = ref => ({ typ: 'aufgabe', ref });

  window.LR_PLANS = (window.LR_PLANS || []).concat([
    {
      id: 'plan-mathe-k19',
      fach: 'mathe',
      klausur: 'k-19', // Vorabiturklausur Mathematik, 30.04.2027
      titel: 'Mathe: Integral und Funktionsscharen',
      hinweis: 'Vorläufig: Welcher Stoff in der Klausur drankommt, ist noch nicht bestätigt. Sag Claude im Chat, was dran kommt, dann wird der Plan angepasst.',
      stand: '2026-11-07',
      items: [
        // Integral & Bestand: Lektion, danach die passenden Aufgaben
        L('L1'), A('MP1-A4'),
        L('L2'), A('E1'), A('MP1-A1'),
        L('L3'),
        L('L4'), A('E2'), A('E3'),
        L('L5'), A('MP1-A2'),
        L('L6'), A('MP1-B1'),
        // Funktionsscharen & Ortskurven
        L('L7'),
        L('L8'),
        L('L9'), A('MP1-A3'), A('MP1-B2'),
        L('L10'),
        L('L11'),
        // Abschluss: feste Probeklausur 3 Tage vor dem Termin
        { typ: 'probe', ref: 'MP1', pin: 'T-3' }
      ]
    },
    {
      id: 'plan-physik-k10',
      fach: 'physik',
      klausur: 'k-10', // Physik Klausur 2 (12.1), 13.11.2026
      titel: 'Physik Endspurt: alle sieben Klausurthemen, garantierte zuerst',
      hinweis: 'Nach der Themenliste der Lehrkraft (12.11.) geordnet, alle sieben Themen sind drin. Zuerst Lektion 13 „Die Formelsammlung: was steht wo?“ (nichts auswendig lernen, Seitenzahlen stehen überall dabei). Garantiert dran (Sternchen): Kondensator und Gleichung herleiten, darum Block 1 und 2. Dazu: Braunsche Röhre und Bewegung im elektrischen Feld (Block 2; die Ablenkung wird laut Lehrkraft nicht berechnet, Lektion 7 liegt nur noch als Zusatz im Ordner), Auf- und Entladen mit der Schaltung (Block 3), alle Herleitungen auf einmal (Block 4), Arbeit/Energie/Leistung (Block 5), Begründen mit funktionalen Abhängigkeiten und Taschenrechner (Block 6). Ganz am Ende (Block 7, nur bei Zeit): mehrere Kondensatoren parallel/in Reihe, das steht nicht auf der Themenliste. Wenn die Zeit knapp wird: von oben nach unten abarbeiten, Block 6 und 5 zuerst kürzen. Nicht im Plan, aber in den Ordnern: Lektion 1/2/5-Wiederholungen, die Lerntreppen, weitere Aufgaben und die Probeklausur.',
      stand: '2026-11-12',
      items: [
        // Block 0 · Formelsammlung: was steht wo (10 Min.)
        L('PH13'),
        // Block 1 · Kondensator (garantiert): Aufbau, Berechnung, Anwendung, Schaltungen
        L('PH3'), A('PC2'),
        L('PH4'), A('PW1'),
        // Block 2 · Gleichung herleiten (garantiert), Braunsche Röhre, Bewegung im elektrischen Feld
        L('PH6'), A('PR2'),
        // Ablenkung im Querfeld wird laut Lehrkraft NICHT berechnet (12.11.): Lektion 7 und Ablenkungs-Aufgaben nur als Zusatz im Ordner
        // Block 3 · Auf- und Entladen: Schaltung, Kurven, C aus t_E, Differenzialgleichung
        L('PH14'),
        L('PH8'), A('PL1'), A('PL3'),
        L('PH9'), A('PL6'), A('PL4'),
        // Block 4 · Gleichung herleiten (garantiert): alle Herleitungen auf einmal
        L('PH12'), A('PR1'), A('PR4'),
        // Block 5 · Arbeit, Energie, Leistung (Größen, Spannung, Potential)
        L('PH0'),
        L('PH1'), A('PE2'),
        L('PH2'),
        // Block 6 · Begründen mit funktionalen Abhängigkeiten, Taschenrechner
        L('PH10'), A('PB1'),
        L('PH11'), A('PT1'),
        // Block 7 · Zusatz, nur bei Zeit: mehrere Kondensatoren (steht nicht auf der Themenliste)
        L('PH5'), A('PS1')
      ]
    },
    {
      id: 'plan-informatik-k09',
      fach: 'informatik',
      klausur: 'k-09', // Informatik Klausur 2 (12.1), 10.11.2026
      titel: 'Informatik: Algorithmik, Sortieren, Rekursion, Datenstrukturen',
      hinweis: 'Stoff laut IServ „Grundlagen der Algorithmik“ (Sync 08.11.); Tonda (09.11.): Datenstrukturen kommen dran, Klassenkarten hatten wir noch nicht. Die Reihenfolge ist nach Wichtigkeit sortiert: erst der Kern, dann der Rest.',
      stand: '2026-11-09',
      items: [
        // Kern (am wichtigsten für den Klausurtermin)
        L('IB1'), A('IT28'), A('IT30'),
        L('IB2'), A('IT29'),
        L('IF1'), A('IT1'), A('IT2'),
        L('IF2'), A('IT3'), A('IT4'),
        L('IF5'), A('IT10'), A('IT11'),
        L('IF7'), A('IT14'), A('IT15'),
        L('IF9'), A('IT21'),
        L('IF10'), A('IT23'), A('IT24'),
        L('IF11'), A('IT25'), A('IT31'), A('IT27'),
        { typ: 'probe', ref: 'PI1' },
        // Rest
        L('IB3'), L('IF3'), A('IT5'), A('IT6'),
        L('IF4'), A('IT7'), A('IT8'), A('IT9'),
        L('IF6'), A('IT13'), A('IT12'),
        A('IT16'),
        L('IF8'), A('IT18'),
        A('IT26'),
        // Aufgaben zu den Datentypen (Beipackzettel)
        A('IX-palindrom'), A('IX-zaehleteil'), A('IX-prim'), A('IX-ggt'), A('IX-spiegeln'), A('IX-sortiert'), A('IX-allefelder'), A('IX-doppelte'), A('IX-ersteansende'), A('IX-tauscheoberste'), A('IX-textstapel'), A('IX-stapelsumme'), A('IX-zaehleschlange'), A('IX-wartezeit'),
        { typ: 'probe', ref: 'PI2' },
        { typ: 'probe', ref: 'PI3' },
        { typ: 'probe', ref: 'PI4' }
      ]
    }
  ]);
})();
