/* ==========================================================================
   ORDNER-BAUM pro Fach (Bauschritt S3b, Portalplan 8a)
   Fach → Ordner → (Unterordner) → Thema. Pro Ebene höchstens 6 Kacheln.
   Knoten:  { id, typ, titel, kurz, klausuren?:[Klausur-Id], themen?:[{typ,ref}], kinder?:[Knoten] }
     typ 'ordner' – enthält Themen (themen) und/oder Unterordner (kinder)
     typ 'probes' – Probeklausuren des Fachs (fest vorgegebene + selbst zusammengestellte)
     typ 'seite'  – einzelne Seite (ref: 'spick')
     typ 'alt'    – Module aus dem bisherigen Portal (Liste aus data.js)
   Thema:   { typ: 'lektion' | 'thema' (Lerntreppe) | 'algo' (Notation), ref }
   klausuren: Vorbelegung „klausurrelevant für …“ (Ids aus calendar.js). Tondas Haken im Portal gelten vor dieser Vorbelegung.
   UNSICHER: Die Zuordnung zur Vorabiturklausur Mathe (k-19) ist vorläufig, der Stoff ist nicht bestätigt.
   ========================================================================== */
(function () {
  const K_MATHE = 'k-19'; // Vorabiturklausur Mathematik, 30.04.2027
  const L = ref => ({ typ: 'lektion', ref });

  window.LR_ORDNER = {
    mathe: [
      { id: 'm-integral', typ: 'ordner', titel: 'Integral & Bestand', kurz: 'Bestand, Stammfunktion, Hauptsatz, Flächen', klausuren: [K_MATHE], themen: ['L1', 'L2', 'L3', 'L4', 'L5', 'L6'].map(L) },
      { id: 'm-schar', typ: 'ordner', titel: 'Funktionsscharen & Ortskurven', kurz: 'Parameter, Extrempunkte, Ortskurve, Steckbrief', klausuren: [K_MATHE], themen: ['L7', 'L8', 'L9', 'L10', 'L11'].map(L) },
      { id: 'm-probe', typ: 'probes', titel: 'Probeklausuren', kurz: 'Gemischte Klausuren aus deinen Themen', klausuren: [K_MATHE] },
      { id: 'm-spick', typ: 'seite', ref: 'spick', titel: 'Spickzettel', kurz: 'Alles Wichtige auf einer Seite', klausuren: [K_MATHE] },
      { id: 'm-demo', typ: 'ordner', demo: true, titel: 'Demo: Lerntreppe', kurz: 'So funktionieren Themen mit 6 Stufen', themen: [{ typ: 'thema', ref: 'demo-extrem' }] }
    ],
    informatik: [
      { id: 'i-demo', typ: 'ordner', demo: true, titel: 'Demo: Notation', kurz: 'Struktogramm, Pseudocode und Python', themen: [{ typ: 'algo', ref: 'demo-algo-max' }] },
      { id: 'i-alt', typ: 'alt', titel: 'Bisherige Module', kurz: 'Module aus dem alten Portal' }
    ]
  };
})();
