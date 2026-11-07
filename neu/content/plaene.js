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
    }
  ]);
})();
