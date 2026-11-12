/* ==========================================================================
   ORDNER-BAUM pro Fach (Bauschritt S3b, Portalplan 8a)
   Fach → Ordner → (Unterordner) → Thema. Pro Ebene höchstens 6 Kacheln.
   Knoten:  { id, typ, titel, kurz, klausuren?:[Klausur-Id], themen?:[{typ,ref}], kinder?:[Knoten] }
     typ 'ordner' – enthält Themen (themen) und/oder Unterordner (kinder)
     typ 'probes' – Probeklausuren des Fachs (fest vorgegebene + selbst zusammengestellte)
     typ 'seite'  – einzelne Seite (ref: 'spick' = Spickzettel des Fachs, sonst Route #/<ref>, z. B. 'python')
     typ 'alt'    – Module aus dem bisherigen Portal (Liste aus data.js)
   Thema:   { typ: 'lektion' | 'thema' (Lerntreppe) | 'algo' (Notation), ref }
   klausuren: Vorbelegung „klausurrelevant für …“ (Ids aus calendar.js). Tondas Haken im Portal gelten vor dieser Vorbelegung.
   UNSICHER: Die Zuordnung zur Vorabiturklausur Mathe (k-19) ist vorläufig, der Stoff ist nicht bestätigt.
   ========================================================================== */
(function () {
  const K_MATHE = 'k-19'; // Vorabiturklausur Mathematik, 30.04.2027
  const K_PHYSIK = 'k-10'; // Physik Klausur 2 (12.1), 13.11.2026
  const K_INFO = 'k-09'; // Informatik Klausur 2 (12.1), 10.11.2026
  const NOT = ref => ({ typ: 'algo', ref }); // Notation: Struktogramm, Pseudocode, Python
  const L = ref => ({ typ: 'lektion', ref });

  window.LR_ORDNER = {
    mathe: [
      { id: 'm-integral', typ: 'ordner', titel: 'Integral & Bestand', kurz: 'Bestand, Stammfunktion, Hauptsatz, Flächen', klausuren: [K_MATHE], themen: ['L1', 'L2', 'L3', 'L4', 'L5', 'L6'].map(L) },
      { id: 'm-schar', typ: 'ordner', titel: 'Funktionsscharen & Ortskurven', kurz: 'Parameter, Extrempunkte, Ortskurve, Steckbrief', klausuren: [K_MATHE], themen: ['L7', 'L8', 'L9', 'L10', 'L11'].map(L) },
      { id: 'm-probe', typ: 'probes', titel: 'Probeklausuren', kurz: 'Gemischte Klausuren aus deinen Themen', klausuren: [K_MATHE] },
      { id: 'm-spick', typ: 'seite', ref: 'spick', titel: 'Spickzettel', kurz: 'Alles Wichtige auf einer Seite', klausuren: [K_MATHE] },
      { id: 'm-demo', typ: 'ordner', demo: true, titel: 'Demo: Lerntreppe', kurz: 'So funktionieren Themen mit 6 Stufen', themen: [{ typ: 'thema', ref: 'demo-extrem' }] }
    ],
    // Physik: Stoff nach der 1. Klausur (IServ 04–07), Klausur 2 am 13.11.2026 (k-10). Stoff von Tonda bestätigt: „alles bisher, v. a. Kondensator“ (Portalplan 2).
    physik: [
      { id: 'p-energie', typ: 'ordner', titel: 'Größen, Spannung, Potential', kurz: 'Größen, Formelsammlung, E_el = Q·U, Potentialsonde', klausuren: [K_PHYSIK], themen: ['PH0', 'PH13', 'PH1', 'PH2'].map(L),
        kinder: [{ id: 'p-alt', typ: 'alt', titel: 'Grundlagen aus Klausur 1', kurz: 'Elektrostatik, Coulomb, Feldstärke (altes Portal)' }] },
      { id: 'p-kondensator', typ: 'ordner', titel: 'Kondensator', kurz: 'Kapazität, Energie, Schaltungen, Begründen', klausuren: [K_PHYSIK], themen: ['PH3', 'PH4', 'PH5', 'PH10'].map(L) },
      { id: 'p-roehre', typ: 'ordner', titel: 'Braunsche Röhre', kurz: 'Elektronen beschleunigen und ablenken, alle Herleitungen', klausuren: [K_PHYSIK], themen: ['PH6', 'PH7', 'PH12'].map(L).concat([{ typ: 'thema', ref: 'ph-querfeld' }]) },
      { id: 'p-rc', typ: 'ordner', titel: 'Auf- und Entladen', kurz: 'e-Funktion, τ = R·C, C messen, Taschenrechner', klausuren: [K_PHYSIK], themen: ['PH8', 'PH9', 'PH11'].map(L).concat([{ typ: 'thema', ref: 'ph-entladen' }]) },
      { id: 'p-probe', typ: 'probes', titel: 'Probeklausuren', kurz: 'Gemischt aus allen Themen, mit Uhr', klausuren: [K_PHYSIK] },
      { id: 'p-spick', typ: 'seite', ref: 'spick', titel: 'Spickzettel', kurz: 'Alle Formeln auf einer Seite', klausuren: [K_PHYSIK] }
    ],
    // Informatik: Stoff laut IServ „Grundlagen der Algorithmik“ (Sync 08.11.), Klausur 2 am 10.11.2026 (k-09). Stoff von der Lehrkraft nicht bestätigt.
    informatik: [
      { id: 'i-befehle', typ: 'seite', ref: 'befehle', titel: 'Beipackzettel: die Befehle', kurz: 'Alle erlaubten Befehle, ausprobieren, trainieren', klausuren: [K_INFO] },
      { id: 'i-ablauf', typ: 'ordner', titel: 'Ablauf & Struktogramme', kurz: 'Tracetabelle, Struktogramme, Funktionen, Fehlertypen', klausuren: [K_INFO], themen: ['IB1', 'IB3', 'IF1', 'IF2', 'IF3'].map(L).concat([NOT('inf-erste-negative')]),
        kinder: [
          { id: 'i-python', typ: 'seite', ref: 'python', titel: 'Python-Werkstatt', kurz: 'Code schreiben, im Browser ausführen, mit Tests prüfen' },
          { id: 'i-demo', typ: 'ordner', demo: true, titel: 'Demo: Notation', kurz: 'Struktogramm, Pseudocode und Python', themen: [NOT('demo-algo-max')] },
          { id: 'i-alt', typ: 'alt', titel: 'Bisherige Module', kurz: 'Module aus dem alten Portal' }
        ] },
      { id: 'i-sortieren', typ: 'ordner', titel: 'Reihungen & Sortieren', kurz: 'Beipackzettel-Befehle, Listen, Sortierverfahren, Laufzeit', klausuren: [K_INFO], themen: ['IB2', 'IF4', 'IF5', 'IF6'].map(L).concat([NOT('inf-bubble')]) },
      { id: 'i-rekursion', typ: 'ordner', titel: 'Rekursion', kurz: 'Abbruch, Aufrufstapel, Fakultät, Fibonacci', klausuren: [K_INFO], themen: ['IF7', 'IF8'].map(L).concat([NOT('inf-fakultaet')]) },
      { id: 'i-ds', typ: 'ordner', titel: 'Dynamische Datenstrukturen', kurz: 'Verkettete Liste, Stapel, Warteschlange', klausuren: [K_INFO], themen: ['IF9', 'IF10', 'IF11'].map(L).concat([NOT('inf-klammern')]) },
      { id: 'i-pruefen', typ: 'ordner', titel: 'Prüfen & Nachschlagen', kurz: 'Probeklausuren und Spickzettel', klausuren: [K_INFO], kinder: [
        { id: 'i-probe', typ: 'probes', titel: 'Probeklausuren', kurz: 'Gemischt aus allen Themen, mit Uhr', klausuren: [K_INFO] },
        { id: 'i-spick', typ: 'seite', ref: 'spick', titel: 'Spickzettel', kurz: 'Alles Wichtige auf einer Seite', klausuren: [K_INFO] }
      ] }
    ]
  };
})();
