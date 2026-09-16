// =========================================================================
// physik.js - Physik eA Lern- & Trainingsportal (Ph12-Lh / IGS Göttingen)
// Basierend auf Meds.pdf (33 Seiten Unterrichts-Mitschriften & Klausurthemen)
// 1. Hauptgebiet: Elektrizitätslehre & Elektrostatik (Klausur 12/1) in 5 Ordnern
// 2. Die 4 typischen Funktionen im Physik-Abitur (S. 32) & Originalblatt S. 33
// 3. Fehlerfreie, korrigierte Vorrechnungen aller Aufgaben (Kugelauslenkung, Coulomb, E-Feld)
// 4. Widerspruchsbeweis für Feldlinien (S. 7) & Faradayscher Käfig (S. 25)
// 5. 4 interaktive Canvas-Simulationen (Coulomb, E-Feld, Elektroskop, Schaltung)
// 6. Eigene Notizfelder mit Auto-Save & Dokument-Upload
// =========================================================================

let CURRENT_PHYSIK_MODE = 'ordner'; // 'ordner' | 'funktionen' | 'themen' | 'iserv-pool' | 'uploads' | 'spickzettel'
let CURRENT_PHYSIK_FOLDER = null;
let CURRENT_PHYSIK_SKILL = null;
let CURRENT_ISERV_CATEGORY = 'all';

// --- 1. DIE 5 STRUKTURIERTEN HAUPTORDNER DER ELEKTRIZITÄTSLEHRE ---
const ELEKTRIZITAET_FOLDERS = [
  {
    id: 'ordner-funktionen',
    num: '01',
    icon: '📈',
    badge: 'Klausur-Fokus S. 32 & 33',
    color: '#3b82f6',
    title: '1. Die 4 typischen Funktionen & Messwertauswertung',
    subtitle: 'Proportional, quadratisch, antiproportional & 1/r²-Zusammenhang (S. 32), Regressions-Check und das Original-Klausurblatt S. 33.',
    topics: [
      { id: 'typische-funktionen', num: '1.1', title: 'Die 4 typischen Funktionen im Physik-Abitur (S. 32)', badge: 'S. 32 Basis', desc: 'Verdopplungsregeln, Quotientengleichheit, Produktgleichheit, Linearisierung und R²-Bestimmung.' },
      { id: 'messwerte-auswerten-2', num: '1.2', title: 'Klausurblatt: Auswerten von Messwerten II (S. 33)', badge: 'S. 33 Klausur', desc: 'Aufgabe 1: Coulomb-Kraft F(r), Aufgabe 2: Plattenkondensator F(U), Aufgabe 3: Entladekurve I(t) & Integral.' },
      { id: 'messwerte-auswerten-1', num: '1.3', title: 'Messwertauswertung I: Braun\'sche Röhre & Drahtwiderstand (S. 19)', badge: 'S. 19 Übung', desc: 'Ablenkung x(U) in der Röhre und Widerstand R(A) bei Querschnittsänderung.' }
    ]
  },
  {
    id: 'ordner-phaenomene',
    num: '02',
    icon: '🔬',
    badge: 'Meds.pdf S. 2 - 5 & 25',
    color: '#10b981',
    title: '2. Elektrostatische Phänomene & Ladungsträger',
    subtitle: 'Elektroskop, Influenz vs. Polarisation, der Faradaysche Käfig und die Funktionsweise der Glimmlampe als Polprüfer.',
    topics: [
      { id: 'elektroskop-funktion', num: '2.1', title: 'Das Elektroskop: Aufbau & Ladungsverteilung (S. 2/3)', badge: 'S. 2/3 Phänomen', desc: 'Metallteller, Zeigerabstoßung und Ladungsnachweis für ruhende Ladungen.' },
      { id: 'influenz-polarisation', num: '2.2', title: 'Influenz vs. Polarisation: Leiter vs. Nichtleiter (S. 5)', badge: 'S. 5 Konzept', desc: 'Verschiebung freier Elektronen vs. molekulare Dipole (Luftballon an der Wand).' },
      { id: 'faraday-kaefig', num: '2.3', title: 'Der Faradaysche Käfig: Feldfreier Raum & Gegenfeld (S. 25)', badge: 'S. 25 Klausur', desc: 'Warum Elektronen das äußere Feld exakt kompensieren (Fel,inn = -Fel,auß).' },
      { id: 'glimmlampe-polpruefer', num: '2.4', title: 'Die Glimmlampe & Polprüfer: Zünd- & Löschspannung (S. 4)', badge: 'S. 4 Gerät', desc: 'Gasentladung, Stoßionisation und warum stets die Kathode (Minuspol) leuchtet.' }
    ]
  },
  {
    id: 'ordner-feld-coulomb',
    num: '03',
    icon: '⚡',
    badge: 'Meds.pdf S. 7, 10, 15, 26',
    color: '#06b6d4',
    title: '3. Elektrisches Feld & Coulombsches Gesetz',
    subtitle: 'Feldstärke E = F/q, Coulomb-Gesetz, 7 Feldlinien-Eigenschaften, Widerspruchsbeweis und Flächenladungsdichte σ.',
    topics: [
      { id: 'efeld-berechnen', num: '3.1', title: 'Elektrische Feldstärke & Coulombsches Gesetz (S. 11, 15)', badge: 'S. 11/15 Formeln', desc: 'E = F/q, FC = 1/(4πε₀) • Q₁Q₂/r², Buch S. 111 A7 & AB 10.' },
      { id: 'feldlinien-aequipotential', num: '3.2', title: 'Feldlinien & Äquipotentiallinien (mit Beweis!) (S. 7, 10)', badge: 'S. 7 Beweis', desc: '7 Eigenschaften, Widerspruchsbeweis (warum kein Schnittpunkt) und ΔW = 0.' },
      { id: 'flaechenladungsdichte', num: '3.3', title: 'Flächenladungsdichte σ = Q/A & Plattenkondensator (S. 26/27)', badge: 'Buch S. 111 A13', desc: 'σ = ε₀εᵣE, Buch S. 111 A13 vollständig durchgerechnet.' }
    ]
  },
  {
    id: 'ordner-kraefte-mechanik',
    num: '04',
    icon: '🎯',
    badge: 'Meds.pdf S. 28, 30 & Buch S. 111',
    color: '#f59e0b',
    title: '4. Kräfte & Mechanik im E-Feld (Klausur-Rechnung!)',
    subtitle: 'Auslenkung einer geladenen Kugel am Faden (Kräfteparallelogramm tan α = Fel/Fg), schwebende Ladungsträger und Buch S. 111 A8-A10.',
    topics: [
      { id: 'kugel-auslenkung', num: '4.1', title: 'Auslenkung einer geladenen Kugel im E-Feld (S. 28, 30)', badge: 'Klausur-Klassiker', desc: 'Fadenpendel, tan α = Fel/Fg, Kleinwinkelnäherung sin α ≈ tan α = s/l, korrigierte Rechnung.' },
      { id: 'kraeftevergleich-schweben', num: '4.2', title: 'Kräftevergleich & schwebende Kugel (Buch S. 111 A9, A10)', badge: 'S. 24 Einheiten', desc: 'Einheitenableitung V/m = N/C = kg•m/(s³•A), Gravitation Fg vs. elektrische Kraft Fel.' }
    ]
  },
  {
    id: 'ordner-kondensator-versuch',
    num: '05',
    icon: '🔋',
    badge: 'Meds.pdf S. 8, 12 & 33',
    color: '#8b5cf6',
    title: '5. Kondensator & Entladevorgang (Versuch & Integral)',
    subtitle: 'Schaltskizze, Durchführung des Entladeversuchs, Ladung Q als Integral ∫I(t) dt, Kapazität C und Energie W = ½CU².',
    topics: [
      { id: 'kondensator-versuch', num: '5.1', title: 'Der Entladeversuch: Schaltung & Durchführung (S. 8)', badge: 'S. 8 Experiment', desc: 'Auflade- vs. Entladestromkreis, Wechselschalter, Messung von I(t).' },
      { id: 'ladung-integral', num: '5.2', title: 'Ladungsberechnung mit Integral Q = ∫I(t) dt (S. 12, 33)', badge: 'S. 12/33 Integral', desc: 'Integration der e-Funktion, Stammfunktion und Taschenrechner-Syntax.' },
      { id: 'kondensator-kapazitaet', num: '5.3', title: 'Kapazität & elektrische Energie des Kondensators', badge: 'Grundgrößen', desc: 'C = Q/U = ε₀εᵣ A/d, Energie Wel = ½ C U² = ½ Q U.' }
    ]
  }
];
