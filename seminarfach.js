// =========================================================================
// SEMINARFACH 4 (Abi28 sf4 • Herr Jatzeck) • KÜNSTLICHE INTELLIGENZ
// HARDCOVER OBERSTUFEN-TAGEBUCH & DIGITALES PROZESSJOURNAL
// Leitmotiv: "Wie lernt man am besten mit KI?"
// Jahrgang 12 • IGS Göttingen (Tonda Beutler)
// =========================================================================

// --- 1. FÄCHER- & STUNDENPLAN-KATALOG FÜR TONDA BEUTLER ---
const SF_SUBJECT_OPTIONS = [
  { code: 'sf4', name: 'Seminarfach 4: KI (Hr. Jatzeck)', short: 'Seminarfach sf4', color: '#8b5cf6', icon: '🤖', teacher: 'Jm / Jatzeck', room: 'E3' },
  { code: 'MA11', name: 'Mathematik LK (Fr. Meyer)', short: 'Mathe LK', color: '#ef4444', icon: '📐', teacher: 'Mey', room: 'R2' },
  { code: 'PH12', name: 'Physik LK (Hr. Lohse)', short: 'Physik LK', color: '#3b82f6', icon: '⚡', teacher: 'Lh', room: 'NW1' },
  { code: 'IF13', name: 'Informatik LK (Hr. Trittmacher)', short: 'Informatik LK', color: '#10b981', icon: '💻', teacher: 'Tri', room: 'PC Sek2' },
  { code: 'pw25', name: 'Politik-Wirtschaft (Hr. Hoffmann)', short: 'Politik gA', color: '#f59e0b', icon: '⚖️', teacher: 'Hf', room: 'R1' },
  { code: 'de48', name: 'Deutsch (Fr. Heinrich)', short: 'Deutsch gA', color: '#ec4899', icon: '📖', teacher: 'Hh', room: 'R3' },
  { code: 'en39', name: 'Englisch (Hr. Westphal)', short: 'Englisch gA', color: '#06b6d4', icon: '🌍', teacher: 'Wv', room: 'E3' },
  { code: 'ge27', name: 'Geschichte (Hr. Weinert)', short: 'Geschichte gA', color: '#d97706', icon: '🏛️', teacher: 'Wn', room: 'R4' },
  { code: 'ds26', name: 'Darstellendes Spiel (Fr. Klose)', short: 'DS Theater', color: '#db2777', icon: '🎭', teacher: 'Kl', room: 'TR' },
  { code: 'sp15Z', name: 'Sport (Hr. Ln)', short: 'Sport', color: '#0d9488', icon: '⚽', teacher: 'Ln', room: 'G1' },
  { code: 'allg', name: 'Allgemein / Freie KI-Reflexion', short: 'Allgemein', color: '#64748b', icon: '📝', teacher: 'Selbststudium', room: 'Home' }
];

// Fester Schulwochenplan (Mo - Fr) für das Stunden-Journal
const SF_WEEK_TIMETABLE = [
  {
    dayId: 'Mo',
    dayName: 'Montag',
    slots: [
      { period: '1./2. Std', time: '08:00 - 09:35', code: 'MA11', name: 'Mathematik LK', teacher: 'Mey', room: 'R2' },
      { period: '3./4. Std', time: '09:55 - 11:30', code: null, name: 'Freistunde / Selbststudium', teacher: '-', room: '-' },
      { period: '5./6. Std', time: '11:50 - 13:25', code: 'PH12', name: 'Physik LK', teacher: 'Lh', room: 'NW1' },
      { period: '8./9. Std', time: '14:15 - 15:50', code: 'sf4', name: 'Seminarfach 4 (KI)', teacher: 'Jm (Jatzeck)', room: 'E3' }
    ]
  },
  {
    dayId: 'Di',
    dayName: 'Dienstag',
    slots: [
      { period: '1./2. Std', time: '08:00 - 09:35', code: 'pw25', name: 'Politik-Wirtschaft', teacher: 'Hf', room: 'R1' },
      { period: '3./4. Std', time: '09:55 - 11:30', code: 'IF13', name: 'Informatik LK', teacher: 'Tri', room: 'PC Sek2' },
      { period: '5./6. Std', time: '11:50 - 13:25', code: 'ds26', name: 'Darstellendes Spiel', teacher: 'Kl', room: 'TR' },
      { period: '8./9. Std', time: '14:15 - 15:50', code: 'en39', name: 'Englisch', teacher: 'Wv', room: 'E3' }
    ]
  },
  {
    dayId: 'Mi',
    dayName: 'Mittwoch',
    slots: [
      { period: '1./2. Std', time: '08:00 - 09:35', code: 'PH12', name: 'Physik LK', teacher: 'Lh', room: 'NW1' },
      { period: '3./4. Std', time: '09:55 - 11:30', code: 'ge27', name: 'Geschichte', teacher: 'Wn', room: 'R4' },
      { period: '5./6. Std', time: '11:50 - 13:25', code: 'sp15Z', name: 'Sport', teacher: 'Ln', room: 'G1' }
    ]
  },
  {
    dayId: 'Do',
    dayName: 'Donnerstag',
    slots: [
      { period: '1./2. Std', time: '08:00 - 09:35', code: 'de48', name: 'Deutsch', teacher: 'Hh', room: 'R3' },
      { period: '3./4. Std', time: '09:55 - 11:30', code: 'IF13', name: 'Informatik LK (B-Woche)', teacher: 'Tri', room: 'PC Sek2' },
      { period: '5./6. Std', time: '11:50 - 13:25', code: 'MA11', name: 'Mathematik LK', teacher: 'Mey', room: 'R2' },
      { period: '8./9. Std', time: '14:15 - 15:50', code: 'pw25', name: 'Politik / DS', teacher: 'Hf / Kl', room: 'R1' }
    ]
  },
  {
    dayId: 'Fr',
    dayName: 'Freitag',
    slots: [
      { period: '1./2. Std', time: '08:00 - 09:35', code: 'PH12', name: 'Physik LK (A) / Mathe LK (B)', teacher: 'Lh / Mey', room: 'NW1 / R2' },
      { period: '3./4. Std', time: '09:55 - 11:30', code: 'IF13', name: 'Informatik LK', teacher: 'Tri', room: 'PC Sek2' },
      { period: '5./6. Std', time: '11:50 - 13:25', code: 'ge27', name: 'Geschichte (A) / Englisch (B)', teacher: 'Wn / Wv', room: 'R4' },
      { period: '8./9. Std', time: '14:15 - 15:50', code: 'de48', name: 'Deutsch (B-Woche)', teacher: 'Hh', room: 'R3' }
    ]
  }
];

// --- 2. DEFAULT DATASET FÜR DAS TAGEBUCH ---
const DEFAULT_SF_JOURNAL = [
  {
    id: "sf-j-1",
    num: "01",
    date: "26.08.2026",
    subjectCode: "sf4",
    lesson: "Mo, 8./9. Std (sf4)",
    mood: "🤔 Nachdenklich",
    title: "Harald Lesch Video & Kritischer Kommentar: Semantik vs. Papageien",
    category: "Video-Analyse",
    subject: "Seminarfach 4: KI (Hr. Jatzeck)",
    model: "ZDF Terra X & Eigene Reflexion",
    content: "Heute haben wir im Seminarfach bei Herrn Jatzeck den Harald-Lesch-Beitrag zu KI geschaut. Was mich sofort gepackt hat: Lesch bringt es auf den Punkt, dass LLMs kein echtes Verständnis besitzen, sondern reine Wahrscheinlichkeitsmaschinen sind. Ich habe mir dazu Gedanken für meine eigene Arbeit gemacht: Wenn KI nur statistische Muster wiedergibt, wie kann ein Schüler dann überhaupt damit echtes Wissen aufbauen? Die Antwort liegt nicht in der KI selbst, sondern darin, wie wir sie durch Fragen herausfordern.",
    task: "Sichtung des Harald-Lesch-Beitrags zu Künstlicher Intelligenz aus dem Unterricht und Verfassen eines fundierten, kritischen Kommentars.",
    prompt: "Analyse der Kernaussagen von Prof. Harald Lesch: Was unterscheidet statistische Textmustererkennung von echtem menschlichen Verstehen?",
    result: "Lesch pointiert herausragend: LLMs wie ChatGPT verstehen die Bedeutung ihrer generierten Wörter nicht (Semantik fehlt). Sie berechnen rein stochastisch das wahrscheinlichste Folgewort auf Basis gigantischer Datenmengen ('Stochastische Papageien').",
    reflection: "Kritischer Kommentar für mein Seminarfach:\nFür das schulische Lernen ist Leschs Kritik der Schlüssel: Wer KI als fertigen Lösungsautomaten nutzt, übernimmt statistische Textbausteine ohne jedes eigene Begreifen. Erst wenn wir die KI durch gezielte Rückfragen (Sokratische Methode) zwingen, uns Denkanstöße zu geben, entsteht echtes Wissen in unserem Gehirn. Genau dieser Punkt bildet das Fundament für meine Seminarfacharbeit!",
    tags: ["Harald Lesch", "Stochastische Papageien", "Semantik vs. Syntax", "Aufgabe 1"]
  },
  {
    id: "sf-j-2",
    num: "02",
    date: "02.09.2026",
    subjectCode: "sf4",
    lesson: "Mi, Workshop (Uni Göttingen)",
    mood: "💡 Erkenntnis",
    title: "YLAB Arbeitsergebnisse & Erkenntnisse (Uni Göttingen)",
    category: "YLAB Workshop",
    subject: "Seminarfach 4: KI (Hr. Jatzeck)",
    model: "YLAB Arbeitsblätter (Wolke)",
    content: "Exkursion bzw. Arbeitsstationen des YLAB der Uni Göttingen ausgewertet. Besonders spannend fand ich die Station zu Trainingsdaten und gesellschaftlichen Vorurteilen (Bias). Wenn ein Sprachmodell mit Texten aus dem Internet gefüttert wird, reproduziert es auch alle menschlichen Klischees. Für uns Schüler bedeutet das: Man darf KI-Antworten niemals unkritisch glauben, sondern muss wie ein Wissenschaftler Quellen gegenchecken.",
    task: "Dokumentation und Auswertung der YLAB-Stationen (Geisteswissenschaftliches Schülerlabor der Georg-August-Universität Göttingen).",
    prompt: "Auswertung der YLAB-Arbeitsblätter: Wie entstehen Vorurteile (Bias) in Trainingsdaten und welche ethischen Richtlinien braucht KI in der Bildung?",
    result: "Erkenntnisse aus den ABs:\n1. Neuronale Netze spiegeln gesellschaftliche Verzerrungen der Trainingsdaten ungefiltert wider.\n2. Urheberrechtsfragen bei Trainingsmaterialien sind juristisch ungeklärt.\n3. Intransparenz ('Black Box Problem'): Selbst Entwickler können einzelne Entscheidungspfade komplexer Transformer-Netze nicht im Detail nachvollziehen.",
    reflection: "Transfer für das Seminarfach:\nDas YLAB hat gezeigt, warum Schüler eine ausgeprägte 'Prompt- & AI-Literacy' brauchen. Wir dürfen KI-Antworten niemals als objektive Wahrheit betrachten, sondern müssen jede Aussage kritisch hinterfragen und mit seriöser Fachliteratur abgleichen.",
    tags: ["YLAB Göttingen", "Bias", "Trainingsdaten", "KI-Ethik", "Aufgabe 2"]
  },
  {
    id: "sf-j-3",
    num: "03",
    date: "09.09.2026",
    subjectCode: "allg",
    lesson: "Freie Recherche / IServ",
    mood: "📊 Empirie",
    title: "Schulumfrage zur KI-Nutzung & Kommentar: Die Hausaufgaben-Falle",
    category: "Empirie & Umfrage",
    subject: "Seminarfach 4: KI (Hr. Jatzeck)",
    model: "Schulweite Umfrage (IServ)",
    content: "Habe mir die Rohdaten unserer Schulumfrage im 11. und 12. Jahrgang vorgenommen. Die Zahlen sprechen Bände: Fast 90% nutzen KI wöchentlich, aber fast alle nur für schnelles Copy-Paste von Hausaufgaben! Kaum jemand lässt sich den Rechenweg erklären oder stellt Rückfragen. Das bestätigt exakt meine Vermutung über Cognitive Offloading: Schüler lagern das Denken an die KI aus und wundern sich in der Klausur, warum sie nichts wissen.",
    task: "Auswertung der Befragung unter Mitschülern des 11. und 12. Jahrgangs bezüglich ihres tatsächlichen KI-Nutzungsverhaltens im Schulalltag.",
    prompt: "Statistische Auswertung der Umfragedaten: 1. Häufigkeit der Nutzung, 2. Art der Aufgaben (Texte, MINT, Hausaufgaben), 3. Reflexionsgrad.",
    result: "Ergebnisse der Umfrage:\n• 87 % der Oberstufenschüler nutzen KI mindestens einmal pro Woche für schulische Aufgaben.\n• 64 % nutzen KI primär zur schnellen Erledigung von Hausaufgaben (Textgenerierung, Zusammenfassungen).\n• Nur 14 % formulieren didaktische System-Prompts ('Erkläre mir...', 'Stelle mir Fragen').\n• Weniger als 18 % prüfen genannte Quellen systematisch nach.",
    reflection: "Persönlicher Kommentar zur Umfrage:\nDie Zahlen belegen eine dramatische Diskrepanz: Schüler nutzen KI massenhaft, aber fast ausnahmslos als 'digitale Abkürzung' (Cognitive Offloading). Das führt zu einem gefährlichen Scheinwissen vor Klausuren. Meine Seminarfacharbeit soll genau hier ansetzen und zeigen, wie Schüler durch sokratisches Prompting messbar bessere Lernerfolge erzielen.",
    tags: ["Schulumfrage", "Nutzungsmuster", "Cognitive Offloading", "Aufgabe 3"]
  },
  {
    id: "sf-j-4",
    num: "04",
    date: "14.09.2026",
    subjectCode: "sf4",
    lesson: "Mo, 8./9. Std (sf4)",
    mood: "🎯 Meilenstein",
    title: "Erste Ergebnisse der Themensuche & Forschungsfragen",
    category: "Themensuche",
    subject: "Seminarfach 4: KI (Hr. Jatzeck)",
    model: "Gemini Pro & Claude 3.5",
    content: "Heute habe ich mich hingesetzt und 5 konkrete Forschungsansätze für meine Seminarfacharbeit strukturiert. Mein absoluter Favorit ist Thema 1: 'Der Sokratische KI-Tutor'. Ich möchte an unserer Schule ein echtes Experiment durchführen: Zwei Gruppen bekommen eine schwere Physik-Aufgabe – Gruppe A bekommt die fertige KI-Lösung, Gruppe B muss mit einem sokratischen Chat interagieren. Nach drei Tagen ein unangekündigter Test!",
    task: "Systematische Erarbeitung von 5 wissenschaftlichen Themenansätzen für die Seminarfacharbeit mit hohem empirischen Eigenanteil.",
    prompt: "Formulierung präziser forschungsleitender Fragestellungen mit Arbeitshypothese zum Leitmotiv 'Wie lernt man am besten mit KI?'.",
    result: "Fünf starke Forschungsansätze erarbeitet:\n1. Der sokratische KI-Tutor (Leitfragen statt fertiger Lösungen)\n2. Cognitive Offloading & die Illusion des Wissens vor Klausuren\n3. Konzeption eines evidenzbasierten KI-Lernframeworks für Schüler\n4. Benjamin Blooms 2-Sigma-Problem durch moderne LLMs\n5. Empirische Schulumfrage am Gymnasium mit statistischer Analyse.",
    reflection: "Mein Favorit für die Arbeit ist Thema 1 ('Der Sokratische KI-Tutor') mit einem praktischen Vorher-Nachher-Experiment an unserer Schule in Physik/Informatik. Das Konzept steht und ist im Reiter 'Themenideen' detailliert ausgearbeitet.",
    tags: ["Themensuche", "Forschungsfrage", "Hypothese", "Aufgabe 4"]
  },
  {
    id: "sf-j-5",
    num: "05",
    date: "17.09.2026",
    subjectCode: "allg",
    lesson: "Donnerstag Nachmittag",
    mood: "📖 Recherche",
    title: "Literatursichtung & Vorbereitung SUB-Ausweis (Uni Göttingen)",
    category: "Literatur & SUB",
    subject: "Seminarfach 4: KI (Hr. Jatzeck)",
    model: "SUB Göttingen & Google Scholar",
    content: "Schritt in die universitäre Forschung: Da ich für die Seminararbeit fundierte Kognitionspsychologie brauche, habe ich die Standardwerke von John Sweller (Cognitive Load Theory) und Benjamin Bloom gesucht. Anmeldeformular für den SUB-Ausweis am Platz der Göttinger Sieben ausgefüllt. Mit dem Ausweis kann ich ab Oktober direkt in die Zentralbibliothek und Monographien ausleihen.",
    task: "Sichtung erster Fachliteratur zur Kognitionspsychologie und Beantragung des Bibliotheksausweises der Niedersächsischen Staats- und Universitätsbibliothek Göttingen (SUB).",
    prompt: "Recherche nach grundlegenden bildungswissenschaftlichen Standardwerken zu selbstgesteuertem Lernen, Cognitive Load und Tutoring-Effekten.",
    result: "Erste relevante Fachwerke erfasst:\n1. John Sweller (1988): 'Cognitive Load During Problem Solving' (Kernkonzept: Intrinsic, Extraneous, Germane Load).\n2. Benjamin Bloom (1984): 'The 2 Sigma Problem: The Search for Methods of Group Instruction as Effective as One-to-One Tutoring'.\n3. Roediger & Karpicke (2006): 'Test-Enhanced Learning' (Active Retrieval Practice).\n4. OECD (2023): 'Generative AI and the Future of Education'.",
    reflection: "Status SUB-Ausweis:\nAnmeldeformular für die Zentralbibliothek am Platz der Göttinger Sieben ausgefüllt. Einverständniserklärung der Eltern vorbereitet, da unter 18 Jahren. Der Ausweis wird für vertiefende Monographien im Oktober abgeholt.",
    tags: ["SUB Göttingen", "Literaturrecherche", "Sweller", "Bloom", "Aufgabe 5"]
  },
  {
    id: "sf-j-6",
    num: "06",
    date: "19.09.2026",
    subjectCode: "allg",
    lesson: "Samstag / Tech-News",
    mood: "🔥 Produktiv",
    title: "KI-Tagesgeschehen: OpenAI o1 Reasoning & EU AI Act",
    category: "KI-News",
    subject: "Seminarfach 4: KI (Hr. Jatzeck)",
    model: "OpenAI o1 / Tech-Nachrichten",
    content: "Großer technologischer Sprung: OpenAI hat die o1-Modelle mit interner Gedankenkette ('Reasoning Chain') ausgerollt. Das verändert die Diskussion für Schulen grundlegend: Früher konnte man sagen, KI scheitert an komplexen MINT-Schritten und verwechselt Vorzeichen. Jetzt rechnet die KI eigenständig mehrstufige Aufgaben fehlerfrei durch. Umso dringender braucht es didaktische Richtlinien, damit Schüler nicht verlernen, selbst logisch zu denken.",
    task: "Beobachtung aktueller technologischer und bildungspolitischer Nachrichten im KI-Sektor und Reflexion für die Schule.",
    prompt: "Analyse der Veröffentlichung von OpenAI o1 ('Strawberry') und der Verabschiedung des EU AI Acts: Was bedeutet das für das schulische Arbeiten?",
    result: "News-Zusammenfassung:\n• OpenAI hat 'o1' veröffentlicht: Das erste Modell, das eine interne Gedankenkette ('Reasoning Chain') vor der Antwort generiert und komplexe MINT-Probleme fehlerfrei durchdenkt.\n• Der EU AI Act klassifiziert KI-Systeme in der Bildung als 'Hochrisiko-KI', wodurch strenge Transparenz- und Qualitätsanforderungen gelten.",
    reflection: "Kommentar zum Tagesgeschehen:\nMit Reasoning-Modellen wie o1 bricht eine neue Ära an: KI kann nicht mehr nur Texte glätten, sondern logisch folgern. Umso wichtiger ist es, dass Schulen Schülern nicht verbieten, KI zu nutzen, sondern ihnen beibringen, KI als interaktiven Sparringspartner für eigene Lösungswege einzusetzen.",
    tags: ["OpenAI o1", "Reasoning", "EU AI Act", "KI-News", "Aufgabe 6"]
  },
  {
    id: "sf-j-7",
    num: "07",
    date: "21.09.2026",
    subjectCode: "PH12",
    lesson: "Mo, 5./6. Std (Physik LK)",
    mood: "💡 Erkenntnis",
    title: "Praxis-Experiment: Sokratischer Tutor im Physik LK & Informatik LK",
    category: "Prompt-Experiment",
    subject: "Physik LK (Hr. Lohse) & Informatik LK",
    model: "ChatGPT-4o vs. Claude 3.5 Sonnet",
    content: "Ich habe den sokratischen Tutor heute live am Coulomb-Gesetz (Physik eA) und beim Sortieren von Arrays (Informatik eA) getestet. Statt mir die Formel F = 1/(4pi*eps0) * (q1*q2)/r^2 direkt hinzuwerfen, hat mich der Chat gefragt: 'Welche Gegenkraft verhindert, dass die geladenen Kugeln am Fadenpendel unendlich weit ausschlagen?' Dadurch musste ich das Kräftegleichgewicht mit tan(alpha) selbst aufstellen. Der Stoff sitzt jetzt bombenfest im Kopf!",
    task: "Eigener Härtetest zweier Lernmethoden: Passive Musterlösung vs. sokratischer Dialog am Beispiel des Coulomb-Gesetzes (Physik eA) und von Insertion Sort (Informatik eA).",
    prompt: "Du bist mein persönlicher MINT-Tutor für die gymnasiale Oberstufe. Verrate mir NICHT sofort die Lösung! Stelle mir stattdessen gezielte Leitfragen, damit ich Schritt für Schritt selbst auf die Formel und den Rechenweg komme.",
    result: "Erstaunlicher Lerneffekt: Die KI fragte gezielt: 'Welche Kräfte stehen am Fadenpendel im Kräftegleichgewicht?' Ich musste F_G und F_C selbst herleiten und den Tangens anwenden, anstatt nur passiv mitzulesen.",
    reflection: "Fazit:\nSokratisches Prompting verhindert die 'Illusion of Competence'. Ich habe den Stoff nicht nur für die Hausaufgabe gelöst, sondern für die Klausur im Kopf verankert. Das ist der exakte Beweis für meine Seminarfachthese.",
    tags: ["Sokratischer Mentor", "Physik eA", "Informatik eA", "Active Recall"]
  }
];

// --- 3. EIGENE THEMEN-IDEEN (FREIES THEMEN-BOARD) ---
const DEFAULT_SF_USER_IDEAS = [
  {
    id: "sf-idea-1",
    title: "Sokratische Leitfragen statt fertiger Rechenwege in Physik & Mathe",
    interest: "Mich fasziniert der Unterschied zwischen 'Verstehen' und 'nur Nachvollziehen'. Wenn man eine fertige Lösung liest, fühlt es sich einfach an. Aber in der Klausur hat man keinen Schimmer. Ich will erforschen, wie eine KI so gepromptet werden kann, dass sie stur keine Endergebnisse verrät, sondern wie ein geduldiger Lehrer Zwischenfragen stellt.",
    question: "Inwiefern führt sokratisches KI-Tutoring zu messbar höherem Behalten von Rechenschritten im Vergleich zur Ausgabe vollständiger Musterlösungen?",
    status: "🔥 Heißer Favorit",
    rating: 5,
    tags: ["MINT", "Physik LK", "Sokratik", "Active Recall"],
    date: "14.09.2026",
    notes: "Experiment an unserer Schule in Jg. 11/12 mit Vorher-Nachher-Test planen."
  },
  {
    id: "sf-idea-2",
    title: "Cognitive Offloading & die Illusion des Verstehens vor Klausuren",
    interest: "Viele Mitschüler nutzen ChatGPT für 100% ihrer Hausaufgaben. Sie bekommen mündlich gute Noten, fallen aber in der Klausur durch. Mich interessiert die kognitionspsychologische Ursache: Täuscht die mühelose KI-Generierung unserem Gehirn Kompetenz vor?",
    question: "Gibt es eine Korrelation zwischen der Frequenz unreflektierter KI-Nutzung und systematischer Selbstüberschätzung bei Klausurvorbereitungen?",
    status: "💡 Spannend",
    rating: 4,
    tags: ["Psychologie", "Sweller", "Illusion of Knowledge"],
    date: "16.09.2026",
    notes: "Lässt sich hervorragend mit unserer Schul-Umfrage und Swellers Cognitive Load Theory verknüpfen."
  },
  {
    id: "sf-idea-3",
    title: "Pair-Programming mit LLMs im Informatik LK: Hilfe oder Denkfaulheit?",
    interest: "Informatik ist mein Leistungsfach. Wenn wir Algorithmen wie Insertion Sort oder Rekursion behandeln, schreibt Claude oder ChatGPT den Code in drei Sekunden. Aber lernt man dadurch Programmieren oder verkümmert das logische Strukturdenken?",
    question: "Wie muss ein KI-Tutor im Informatikunterricht gestaltet sein, damit Schüler Kontrollstrukturen und Datenstrukturen eigenständig verstehen?",
    status: "🔬 Praxistest",
    rating: 4,
    tags: ["Informatik LK", "Coding", "Algorithmen"],
    date: "18.09.2026",
    notes: "Direkter Bezug zu Herrn Trittmachers Unterricht und Pseudocode / Struktogrammen."
  }
];

// 5 Wissenschaftliche Jatzeck-Themenvorschläge
const SF_THEMEN = [
  {
    id: "sf-t-1",
    rank: "🥇 Favorit",
    title: "Der Sokratische KI-Tutor",
    subtitle: "Sokratisches Prompting als Lernverstärker: Wie dialogische KI-Interaktion das Problemlöseverständnis in der gymnasialen Oberstufe fördert.",
    badge: "Didaktik & MINT",
    badgeColor: "#8b5cf6",
    question: "Inwiefern verbessert ein dialogisch-sokratischer Prompt-Ansatz (Leitfragen statt fertiger Lösungen) den nachhaltigen Lernerfolg von Schülern im Vergleich zur rein ergebnisorientierten KI-Nutzung?",
    hypothesis: "Schüler, die KI als sokratischen Mentor nutzen, erzielen in unangekündigten Transfertests signifikant bessere Ergebnisse als Schüler, die fertige Musterlösungen konsumieren.",
    practical: "Experiment an der eigenen Schule: Zwei Schülergruppen bearbeiten eine komplexe Physik-/Matheaufgabe (Gruppe A: Direktlösung, Gruppe B: Sokratischer Chat). Nach 3 Tagen unangekündigter Transfer-Test.",
    theories: ["Cognitive Load Theory (John Sweller)", "Active Recall & Retrieval Practice", "Benjamin Blooms 2-Sigma-Problem"]
  },
  {
    id: "sf-t-2",
    rank: "🥈 Empfehlung",
    title: "Cognitive Offloading & Scheinwissen",
    subtitle: "Zwischen kognitiver Entlastung und Denkfaulheit: Eine empirische Untersuchung zum Einfluss generativer Sprachmodelle auf das Lernverhalten von Abiturienten.",
    badge: "Kognitionspsychologie",
    badgeColor: "#06b6d4",
    question: "Führt die routinemäßige Nutzung von LLMs zu einer kognitiven Auslagerung (Cognitive Offloading) und einer systematischen Überschätzung des eigenen Wissensstandes ('Illusion of Knowledge')?",
    hypothesis: "Hohe Frequenz unreflektierter KI-Nutzung korreliert negativ mit der Fähigkeit zur realistischen Selbsteinschätzung vor Klausuren.",
    practical: "Schulweite Fragebogenstudie (z. B. via IServ) zur subjektiven Kompetenzeinschätzung im Abgleich mit tatsächlichen Klausurergebnissen.",
    theories: ["Metakognition nach Flavell", "Illusion of Explanatory Depth", "Swellers Germane Cognitive Load"]
  },
  {
    id: "sf-t-3",
    rank: "🥉 Praxis-Tipp",
    title: "Entwicklung eines KI-Lernframeworks für Schüler",
    subtitle: "Vom Prompt zum Lernerfolg: Konzeption, Erprobung und Evaluation eines praxistauglichen Leitfadens für selbstgesteuertes Lernen mit KI in der Sekundarstufe II.",
    badge: "Leitfaden & Produkt",
    badgeColor: "#10b981",
    question: "Welche konkreten Prompting-Techniken (Feynman-Methode, Rollenspiel, Fehleranalyse) eignen sich nachweisbar am besten zur effektiven Abiturvorbereitung?",
    hypothesis: "Ein strukturierter 4-Phasen-Prompt-Leitfaden erhöht die Lerndisziplin und das Textverständnis messbar gegenüber freiem 'Drauflos-Chatten'.",
    practical: "Entwicklung eines Handouts ('KI-Prompting für Schüler'), Durchführung von Workshops in Klassenstufe 11/12 und Vorher-Nachher-Evaluation.",
    theories: ["Feynman-Technik via KI", "Taxonomiestufen nach Bloom (Erinnern bis Erschaffen)", "Prompt Engineering Frameworks"]
  },
  {
    id: "sf-t-4",
    rank: "🏅 Wissenschaftlich",
    title: "Blooms 2-Sigma-Problem im Zeitalter generativer KI",
    subtitle: "Die Demokratisierung des 1-zu-1-Tutorings? Untersuchung der Machbarkeit und didaktischen Grenzen von Benjamin Blooms Bildungsideal durch moderne LLMs.",
    badge: "Bildungsforschung",
    badgeColor: "#f59e0b",
    question: "Können moderne KI-Systeme die Effektivität eines menschlichen Einzel-Nachhilfelehrers erreichen, und an welchen pädagogischen Barrieren scheitern sie aktuell noch?",
    hypothesis: "LLMs erreichen in der fachlichen Wissensvermittlung das Niveau eines Nachhilfelehrers, scheitern jedoch an emotional-motivationaler Lenkung und Fehlkonzept-Erkennung.",
    practical: "Qualitative Interviews mit Lehrkräften und Schülern sowie vergleichende Transkriptanalyse (Menschlicher Tutor vs. KI-Chat).",
    theories: ["Blooms 2-Sigma-Problem (1984)", "Hattie-Studie (Feedback als Lernfaktor)", "Zone der nächsten Entwicklung (Wygotski)"]
  },
  {
    id: "sf-t-5",
    rank: "🏅 Empirisch",
    title: "Empirische Bestandsaufnahme an der eigenen Schule",
    subtitle: "Künstliche Intelligenz im Oberstufenalltag: Eine empirische Erhebung zu Nutzungsmustern, Chancen und Prompt-Literacy am Gymnasium.",
    badge: "Schulstudie",
    badgeColor: "#ec4899",
    question: "Wie differenziert und kompetent setzen Schüler der Jahrgangsstufen 11 und 12 generative KI wirklich ein, und welche Wissensdefizite bestehen bezüglich Datenintegrität und Halluzinationen?",
    hypothesis: "Über 80 % der Schüler nutzen KI wöchentlich, jedoch beherrschen weniger als 15 % gezielte Prompt-Strategien oder Quellenprüfungen.",
    practical: "Große anonyme IServ-Umfrage unter Oberstufenschülern mit statistischer Auswertung (Deskriptive Statistik, Diagramme).",
    theories: ["Digital Literacy", "Medienkompetenz nach Baacke", "Technologieakzeptanzmodell (TAM)"]
  }
];

// --- 4. PROMPTS & TOOLS VORLAGEN ---
const SF_PROMPT_TEMPLATES = [
  {
    id: "p-1",
    title: "Der sokratische MINT-Mentor (Physik / Mathe)",
    category: "Didaktik & MINT",
    desc: "Zwingt die KI dazu, keine Lösungen zu verraten, sondern durch gezielte Zwischenfragen dein eigenes Denken anzuregen.",
    prompt: `Du bist mein persönlicher Fachlehrer für die gymnasiale Oberstufe.
Ich habe folgendes Problem/Aufgabe: [HIER AUFGABE EINFÜGEN].

WICHTIGE REGELN:
1. Verrate mir unter keinen Umständen sofort das Endergebnis oder den vollständigen Rechenweg!
2. Stelle mir stattdessen immer nur EINE präzise Leitfrage, damit ich den nächsten physikalischen/mathematischen Schritt selbst finde.
3. Wenn meine Antwort fehlerhaft ist, erkläre nicht die Lösung, sondern gib mir einen Denkanstoß zur Fehlerursache.
4. Erst wenn ich alle Teilschritte selbstständig gelöst habe, gibst du mir eine kurze Bestätigung und Zusammenfassung.`
  },
  {
    id: "p-2",
    title: "Die umgekehrte Feynman-Methode (Verständnis-Check)",
    category: "Metakognition",
    desc: "Du erklärst der KI ein Konzept in deinen Worten. Die KI deckt auf, wo deine Erklärung Lücken hat oder unpräzise ist.",
    prompt: `Ich möchte mein Verständnis für das Thema [THEMA EINFÜGEN] nach der Feynman-Methode überprüfen.
Ich werde dir das Thema gleich in meinen eigenen einfachen Worten erklären, als wärst du ein Schüler der 9. Klasse.

DEINE AUFGABE ALS PRÜFER:
1. Identifiziere logische Brüche, unklare Formulierungen oder fachliche Ungenauigkeiten.
2. Nenne mir exakt 2 Stellen, an denen meine Erklärung noch zu vage war.
3. Stelle mir eine gezielte Verständnisfrage zu einem Extrem- oder Sonderfall, den ich ausgelassen habe.

Meine Erklärung lautet: [DEINE ERKLÄRUNG EINFÜGEN]`
  },
  {
    id: "p-3",
    title: "Der mündliche Abitur-Prüfungssimulator",
    category: "Prüfungsvorbereitung",
    desc: "Simuliert eine 10-minütige mündliche Prüfung mit 3 Anforderungsbereichen (AFB I bis III) und detailliertem Feedback.",
    prompt: `Simuliere eine mündliche Abiturprüfung im Fach [FACH] zum Thema [THEMA].
Wir gehen die Prüfung dynamisch im Dialog durch:

- Phase 1: Stelle mir 2 Fragen im Anforderungsbereich I (Wiedergabe von Fachwissen & Definitionen). Warte auf meine Antwort.
- Phase 2: Stelle mir 1 Vertiefungsfrage im Anforderungsbereich II (Erläuterung & Transfer). Warte auf meine Antwort.
- Phase 3: Stelle mir 1 diskursive Streitfrage im Anforderungsbereich III (Urteilsbildung, Bewertung, Pro/Contra). Warte auf meine Antwort.
- Am Ende: Gib mir ein detailliertes Notengutachten mit Stärken, Schwächen und einer geschätzten Punktzahl (0-15 Punkte).

Beginne jetzt mit der ersten Frage aus Phase 1!`
  },
  {
    id: "p-4",
    title: "Kognitiver 3-Stufen-Erklärer (Cognitive Load Reducer)",
    category: "Textverständnis",
    desc: "Erklärt ein schwer verständliches Konzept aus dem Schulbuch in 3 aufbauenden Komplexitätsstufen.",
    prompt: `Erkläre mir das folgende Konzept: [KONZEPT ODER TEXTSTELLEN EINFÜGEN].

Strukturiere deine Erklärung in genau 3 aufeinander aufbauende Stufen:
1. STUFE 1 (Intuitiv): Eine alltagsnahe Metapher für ein 12-jähriges Kind (ohne Fachbegriffe).
2. STUFE 2 (Gymnasiale Oberstufe): Die exakte fachwissenschaftliche Definition inklusive der relevanten Fachtermini und Formeln.
3. STUFE 3 (Klausur-Falle): Die typischsten Denkfehler und Fehlkonzepte, die Schüler in Klausuren bei diesem Thema machen.`
  }
];

const SF_TOOLS_DATA = [
  {
    name: "OpenAI ChatGPT (GPT-4o)",
    icon: "🟢",
    role: "Bester Allrounder & Text-Sparring",
    mintScore: 4.5,
    didaktikScore: 4.8,
    codeScore: 4.7,
    sourceScore: 3.8,
    pros: "Hervorragend im didaktischen Dialog; versteht sokratische Prompts exzellent; Bilderkennung für handschriftliche Skizzen.",
    cons: "Quellenangaben im Standardmodus gelegentlich ungenau; neigt ohne Systemprompt zu voreiligen Komplettlösungen.",
    verdict: "Ideal für das tägliche Prozessjournal, Textüberarbeitung und als sokratischer Diskussionspartner."
  },
  {
    name: "OpenAI o1 / o3-mini",
    icon: "🧠",
    role: "MINT-König (Reasoning & Logik)",
    mintScore: 5.0,
    didaktikScore: 4.2,
    codeScore: 4.9,
    sourceScore: 4.0,
    pros: "Interner Gedankengang ('Thinking Chain') verhindert Vorzeichen- und Einheitenfehler in Mathe/Physik; unschlagbar bei Beweisen.",
    cons: "Erfordert 10-20s Bedenkzeit; antwortet manchmal zu formal-akademisch für schnelle Schulfragen.",
    verdict: "Pflichtwerkzeug für schwierige Physik eA & Mathe eA Klausuraufgaben."
  },
  {
    name: "Anthropic Claude 3.5 Sonnet",
    icon: "🟣",
    role: "Sprachästhetik & Code-Spezialist",
    mintScore: 4.7,
    didaktikScore: 4.7,
    codeScore: 5.0,
    sourceScore: 4.2,
    pros: "Beste Code-Architektur (Informatik eA); extrem nuancierte Sprache bei Textanalysen; sehr geringe Halluzinationsrate.",
    cons: "Im Free-Tier relativ schnelles Nachrichtenlimit.",
    verdict: "Erste Wahl für Informatik-Projekte und das Verfassen wissenschaftlicher Texte."
  },
  {
    name: "Google Gemini (1.5 Pro / Flash)",
    icon: "🔵",
    role: "Recherche & Mega-Dokumente",
    mintScore: 4.3,
    didaktikScore: 4.1,
    codeScore: 4.4,
    sourceScore: 4.5,
    pros: "Riesiges Kontextfenster (kann ganze PDFs, Klausurpläne und Lehrbücher am Stück analysieren); nahtlose Google-Verknüpfung.",
    cons: "Didaktische Zwischenfragen müssen sehr streng eingefordert werden.",
    verdict: "Perfekt, um umfangreiche PDFs und Studien für die Seminarfacharbeit zusammenzufassen."
  },
  {
    name: "Perplexity AI",
    icon: "🌐",
    role: "Wissenschaftliche Literatur & Quellen",
    mintScore: 4.2,
    didaktikScore: 3.5,
    codeScore: 4.0,
    sourceScore: 5.0,
    pros: "Belegt JEDE Aussage mit klickbaren Quellen & Studien; vermeidet Phantomzitate; exzellente wissenschaftliche Recherche.",
    cons: "Nicht als interaktiver Lern-Tutor gedacht, sondern als semantische Forschungsmaschine.",
    verdict: "Unverzichtbar für das Literaturverzeichnis und wissenschaftliche Belege der Seminararbeit."
  }
];

// --- 5. LOCAL STORAGE CONTROLLERS ---
const SF_STORAGE_KEY = "tonda_seminarfach_journal_v4_aesthetic";
const SF_USER_THEMEN_KEY = "tonda_sf_user_themen_v2";
const SF_FAV_TOPIC_KEY = "tonda_seminarfach_favorite_topic";

function getSfJournalEntries() {
  try {
    const raw = localStorage.getItem(SF_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
    const oldRaw = localStorage.getItem("tonda_seminarfach_journal_v3_jatzeck");
    if (oldRaw) {
      const parsed = JSON.parse(oldRaw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        saveSfJournalEntries(parsed);
        return parsed;
      }
    }
  } catch (e) {
    console.error("Error reading SF journal from localStorage:", e);
  }
  return [...DEFAULT_SF_JOURNAL];
}

function saveSfJournalEntries(entries) {
  try {
    localStorage.setItem(SF_STORAGE_KEY, JSON.stringify(entries));
  } catch (e) {
    console.error("Error saving SF journal:", e);
  }
}

function getSfUserThemen() {
  try {
    const raw = localStorage.getItem(SF_USER_THEMEN_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (e) {
    console.error("Error reading user Themen from localStorage:", e);
  }
  return [...DEFAULT_SF_USER_IDEAS];
}

function saveSfUserThemen(ideas) {
  try {
    localStorage.setItem(SF_USER_THEMEN_KEY, JSON.stringify(ideas));
  } catch (e) {
    console.error("Error saving user Themen:", e);
  }
}

function getSfFavoriteTopicId() {
  return localStorage.getItem(SF_FAV_TOPIC_KEY) || "sf-t-1";
}

function setSfFavoriteTopicId(topicId) {
  localStorage.setItem(SF_FAV_TOPIC_KEY, topicId);
}

// Active UI state
let currentSfTab = 'journal';
let currentSfSubjectFilter = 'Alle';
let currentSfCategoryFilter = 'Alle';
let currentSfSearchQuery = '';

// Helper to seed guideline doc
async function seedSeminarfachStarterDoc() {
  if (typeof userDB !== 'undefined' && userDB) {
    try {
      await userDB.initPromise;
      const existing = await userDB.getDocument('doc_sf_starter');
      if (!existing && !localStorage.getItem('deleted_doc_sf_starter')) {
        await userDB.addDocument({
          id: 'doc_sf_starter',
          fachId: 'seminarfach',
          title: 'Offizielle IServ-Aufgabe: Abi28 sf4 (Herr Jatzeck)',
          category: 'mitschrift',
          notes: 'Aufgabenstellung von Michael Jatzeck:\n„Hängt hier bitte als Datei euer Goodnotes Journal an, das auf dem neuesten Stand sein sollte:\nAlle bisherigen Stunden sollten mit Einträgen berücksichtigt sein, d.h. u.a.\n- Harald Lesch Video & Kommentar dazu\n- YLAB Arbeitsergebnisse & Erkenntnisse (ABs in der Wolke)\n- Kommentar zur Schulumfrage\n- Erste Ergebnisse der Themensuche\n- Literatursichtung & SUB Ausleihausweis\n- Gedanken/Anmerkungen zum aktuellen KI-Tagesgeschehen\n- Eigene praktische KI-Erfahrungen & Prompts.“',
          fileName: null,
          fileType: 'text/plain',
          fileSize: 680,
          fileData: null,
          createdAt: new Date().toISOString()
        });
      }
    } catch (e) {
      console.warn("Could not seed starter doc for seminarfach:", e);
    }
  }
}

// --- 6. MAIN SEMINARFACH VIEW RENDERER (AUTHENTIC HARDCOVER TAGEBUCH) ---
function renderSeminarfachView() {
  const container = document.getElementById('seminarfachRoot');
  if (!container) return;

  const entries = getSfJournalEntries();
  const userIdeas = getSfUserThemen();
  const favTopicId = getSfFavoriteTopicId();
  const favTopic = SF_THEMEN.find(t => t.id === favTopicId) || userIdeas.find(i => i.id === favTopicId) || SF_THEMEN[0];

  container.innerHTML = `
    <!-- Top Action Toolbar -->
    <div class="sf-topbar">
      <div class="sf-topbar-left">
        <span class="sf-badge-pill sf-badge-purple">📔 Hardcover Tagebuch</span>
        <span class="sf-badge-pill sf-badge-neutral">Abi28 sf4 &bull; Hr. Jatzeck</span>
        <span class="sf-badge-pill sf-badge-green">✨ ${entries.length} Einträge gebunden</span>
      </div>
      <div class="sf-topbar-right">
        <button class="sf-btn sf-btn-pdf" onclick="exportSfJournalPDF()" title="Druckfertiges A4-PDF für die IServ-Abgabe exportieren">
          📄 PDF für IServ
        </button>
        <button class="sf-btn sf-btn-secondary" onclick="exportSfJournalMarkdown()" title="Als Markdown exportieren">
          📥 Markdown
        </button>
        <button class="sf-btn sf-btn-primary" onclick="openSfNewEntryModal()" title="Vollständigen Eintrag mit IServ-Kriterien verfassen">
          ✍️ Eintrag verfassen
        </button>
        <button class="sf-btn sf-btn-ghost" onclick="resetSfJournalDefaults()" title="Standard-Einträge wiederherstellen">
          🔄 Reset
        </button>
      </div>
    </div>

    <!-- HARDCOVER BUCH WRAPPER -->
    <div class="sf-hardcover-wrapper">
      <div class="sf-hardcover-book">

        <!-- Metallic Brass / Golden Corner Protectors -->
        <div class="sf-corner-gold sf-corner-tl" title="Buchecke Messing"></div>
        <div class="sf-corner-gold sf-corner-tr" title="Buchecke Messing"></div>
        <div class="sf-corner-gold sf-corner-bl" title="Buchecke Messing"></div>
        <div class="sf-corner-gold sf-corner-br" title="Buchecke Messing"></div>

        <!-- Silk Bookmark Ribbon hanging from top -->
        <div class="sf-silk-bookmark-ribbon" title="Seiden-Lesezeichenband">
          <div class="sf-ribbon-tail"></div>
        </div>

        <!-- Book Spine on the Left (Leder-Buchrücken mit Goldprägung) -->
        <div class="sf-book-spine">
          <div class="sf-spine-emboss-wrap">
            <span class="sf-spine-gold-title">📖 TONDA BEUTLER &bull; GYMNASIALE OBERSTUFE JAHRGANG 12 &bull; PROZESSJOURNAL &amp; TAGEBUCH</span>
          </div>
          <div class="sf-spine-ridge sf-spine-ridge-1"></div>
          <div class="sf-spine-ridge sf-spine-ridge-2"></div>
          <div class="sf-spine-ridge sf-spine-ridge-3"></div>
          <div class="sf-spine-ridge sf-spine-ridge-4"></div>
        </div>

        <!-- Open Book Page Container (Elfenbeinfarbenes liniertes Notizbuch-Papier) -->
        <div class="sf-book-pages-container">
          
          <!-- Rote Korrektur-Randlinie (Schulheft-Stil) -->
          <div class="sf-book-red-margin"></div>

          <!-- Buchfalz-Schatten -->
          <div class="sf-book-gutter-shadow"></div>

          <!-- Innere linierte Buchseite -->
          <div class="sf-book-page-sheet">
            
            <!-- Vintage-Modern Header der Buchseite -->
            <div class="sf-page-header-box">
              <div class="sf-page-header-top">
                <span class="sf-page-school-stamp">IGS GÖTTINGEN &bull; GYMNASIALE OBERSTUFE (ABI 2028)</span>
                <span class="sf-page-num-stamp">SEITE 01 &bull; ${getTodayGermanDate()}</span>
              </div>
              
              <div class="sf-page-title-row">
                <div>
                  <h1 class="sf-page-main-title">📔 Mein Prozessjournal &amp; Schul-Tagebuch</h1>
                  <p class="sf-page-sub-title">Persönliche Reflexionen zu Unterricht, KI-Lernen &amp; Seminarfacharbeit</p>
                </div>
                <div class="sf-page-owner-badge">
                  <div class="sf-owner-avatar">TB</div>
                  <div class="sf-owner-text">
                    <strong>Tonda Beutler</strong>
                    <span>Tutor: Jonas Hildebrandt &bull; sf4: Michael Jatzeck</span>
                  </div>
                </div>
              </div>

              <!-- Quick Stats Bookmark Strip -->
              <div class="sf-page-stats-strip">
                <div class="sf-stat-tab" onclick="switchSfTab('aktuelles')">
                  <span>📰</span> <strong>Aktuelles &amp; Heute</strong>
                </div>
                <div class="sf-stat-tab" onclick="switchSfTab('journal')">
                  <span>📖</span> <strong>${entries.length}</strong> Tagebucheinträge
                </div>
                <div class="sf-stat-tab" onclick="switchSfTab('stunden')">
                  <span>📅</span> <strong>Stundenplan-Journal</strong>
                </div>
                <div class="sf-stat-tab" onclick="switchSfTab('themen')">
                  <span>💡</span> <strong>${userIdeas.length}</strong> eigene Ideen &bull; <strong>${SF_THEMEN.length}</strong> Exposés
                </div>
                <div class="sf-stat-tab sf-stat-tab-fav" onclick="switchSfTab('themen')">
                  <span>⭐</span> Favorit: <strong>${escapeHtml(favTopic.title)}</strong>
                </div>
              </div>
            </div>

            <!-- Content Area of the active Register Tab -->
            <div id="sfTabContent" class="sf-book-content-area"></div>

          </div>

        </div>

        <!-- Register-Reiter / Index Tabs am rechten Buchrand (Goodnotes / Moleskine Style) -->
        <div class="sf-book-index-tabs">
          <button class="sf-index-tab ${currentSfTab === 'aktuelles' ? 'active' : ''}" onclick="switchSfTab('aktuelles')" title="Aktuelles &amp; Feed">
            <span class="tab-icon">📰</span>
            <span class="tab-text">Aktuelles</span>
          </button>
          <button class="sf-index-tab ${currentSfTab === 'journal' ? 'active' : ''}" onclick="switchSfTab('journal')" title="Tagebuch">
            <span class="tab-icon">📖</span>
            <span class="tab-text">Tagebuch</span>
            <span class="tab-badge">${entries.length}</span>
          </button>
          <button class="sf-index-tab ${currentSfTab === 'stunden' ? 'active' : ''}" onclick="switchSfTab('stunden')" title="Stundenplan-Journal">
            <span class="tab-icon">📅</span>
            <span class="tab-text">Stunden</span>
          </button>
          <button class="sf-index-tab ${currentSfTab === 'themen' ? 'active' : ''}" onclick="switchSfTab('themen')" title="Themenfindung &amp; Brainstorming">
            <span class="tab-icon">💡</span>
            <span class="tab-text">Themen</span>
          </button>
          <button class="sf-index-tab ${currentSfTab === 'prompts' ? 'active' : ''}" onclick="switchSfTab('prompts')" title="Prompt-Studio">
            <span class="tab-icon">🧪</span>
            <span class="tab-text">Prompts</span>
          </button>
          <button class="sf-index-tab ${currentSfTab === 'tools' ? 'active' : ''}" onclick="switchSfTab('tools')" title="KI-Modellvergleich">
            <span class="tab-icon">📊</span>
            <span class="tab-text">Modelle</span>
          </button>
          <button class="sf-index-tab ${currentSfTab === 'mitschriften' ? 'active' : ''}" onclick="switchSfTab('mitschriften')" title="Mitschriften &amp; Dateien">
            <span class="tab-icon">📁</span>
            <span class="tab-text">Dateien</span>
          </button>
        </div>

      </div>
    </div>
  `;

  renderCurrentSfSubTab();
}

function switchSfTab(tabName) {
  currentSfTab = tabName;
  document.querySelectorAll('.sf-index-tab').forEach(btn => btn.classList.remove('active'));
  const activeBtn = document.querySelector(`.sf-index-tab[onclick*="${tabName}"]`);
  if (activeBtn) activeBtn.classList.add('active');

  renderCurrentSfSubTab();
}

function renderCurrentSfSubTab() {
  const container = document.getElementById('sfTabContent');
  if (!container) return;

  if (currentSfTab === 'aktuelles') {
    renderSfAktuellesView(container);
  } else if (currentSfTab === 'journal') {
    renderSfJournalView(container);
  } else if (currentSfTab === 'stunden') {
    renderSfStundenView(container);
  } else if (currentSfTab === 'themen') {
    renderSfThemenView(container);
  } else if (currentSfTab === 'prompts') {
    renderSfPromptsView(container);
  } else if (currentSfTab === 'tools') {
    renderSfToolsView(container);
  } else if (currentSfTab === 'mitschriften') {
    renderSfMitschriftenView(container);
  }
}

// --- 7. SUB-TAB 1: AKTUELLES & FEED (IM HARDCOVER-BUCH) ---
function renderSfAktuellesView(container) {
  const entries = getSfJournalEntries();
  const recentEntries = entries.slice(-3).reverse();
  const todayDayId = getTodayDayId();
  const todaySchedule = SF_WEEK_TIMETABLE.find(d => d.dayId === todayDayId) || SF_WEEK_TIMETABLE[0];
  const favTopicId = getSfFavoriteTopicId();
  const userIdeas = getSfUserThemen();
  const favTopic = SF_THEMEN.find(t => t.id === favTopicId) || userIdeas.find(i => i.id === favTopicId) || SF_THEMEN[0];

  let todaySlotsHtml = todaySchedule.slots.map(s => {
    if (!s.code) {
      return `
        <div class="sf-book-slot sf-slot-free">
          <span class="slot-time">${s.period}</span>
          <span class="slot-name">${s.name}</span>
        </div>
      `;
    }
    const hasEntry = entries.some(e => (e.subjectCode === s.code || (e.lesson && e.lesson.includes(s.code))));
    return `
      <div class="sf-book-slot ${hasEntry ? 'has-entry' : ''}">
        <div class="slot-left">
          <span class="slot-time">${s.period} &bull; ${s.time}</span>
          <strong class="slot-name">${s.name} (${s.code})</strong>
          <span class="slot-room">${s.teacher} &bull; Raum ${s.room}</span>
        </div>
        <div class="slot-right">
          ${hasEntry ? 
            `<span class="sf-badge-check">✅ Notiert</span>` : 
            `<button class="sf-btn-mini-write" onclick="openSfNewEntryModalForLesson('${todaySchedule.dayName}', '${s.period}', '${s.code}')">
              ✍️ Notiz
            </button>`
          }
        </div>
      </div>
    `;
  }).join('');

  let recentStreamHtml = recentEntries.map(e => {
    const subj = SF_SUBJECT_OPTIONS.find(s => s.code === e.subjectCode) || SF_SUBJECT_OPTIONS[0];
    const previewText = e.content ? e.content : (e.reflection || e.task || 'Kein Text hinterlegt.');
    return `
      <div class="sf-book-feed-entry" onclick="switchSfTab('journal'); scrollToSfEntry('${e.id}')">
        <div class="sf-feed-entry-head">
          <div class="sf-feed-badges">
            <span class="sf-subj-pill" style="background: ${subj.color}15; color: ${subj.color}; border: 1px solid ${subj.color}40;">
              ${subj.icon} ${subj.short}
            </span>
            <span class="sf-feed-date">📅 ${e.date}</span>
            ${e.mood ? `<span class="sf-feed-mood">${e.mood}</span>` : ''}
          </div>
          <span class="sf-feed-arrow">Im Buch öffnen &rarr;</span>
        </div>
        <h4 class="sf-feed-title">${escapeHtml(e.title)}</h4>
        <p class="sf-feed-text">${escapeHtml(previewText).substring(0, 180)}${previewText.length > 180 ? '...' : ''}</p>
      </div>
    `;
  }).join('');

  container.innerHTML = `
    <!-- CLEAN INLINE NOTE INSERTER (Direkt auf der linierten Buchseite) -->
    ${renderCleanNoteInserterHtml()}

    <div class="sf-aktuelles-grid">
      
      <!-- Left Main Column -->
      <div class="sf-akt-left-col">
        
        <!-- Recent Diary Entries inside Book -->
        <div class="sf-book-section-head">
          <h3>📖 Zuletzt ins Tagebuch eingetragen</h3>
          <button class="sf-link-btn" onclick="switchSfTab('journal')">Alle ${entries.length} Einträge durchblättern &rarr;</button>
        </div>
        <div class="sf-recent-feed-list">
          ${recentStreamHtml}
        </div>

        <!-- KI-Tagesgeschehen & Ticker -->
        <div class="sf-book-ticker-card">
          <div class="sf-ticker-title">
            <span>🌐</span> <strong>KI-Tagesgeschehen &amp; Wichtiges für Oberstufe</strong>
          </div>
          <div class="sf-ticker-items">
            <div class="sf-ticker-item">
              <div class="sf-ticker-date">21.09.2026 &bull; MINT-Durchbruch</div>
              <p><strong>OpenAI o1 Reasoning:</strong> Komplexe Herleitungen in Physik eA und Beweise in Mathe eA funktionieren dank interner Gedankenkette ('Thinking Chain') erstmals ohne systematische Vorzeichenfehler.</p>
            </div>
            <div class="sf-ticker-item">
              <div class="sf-ticker-date">19.09.2026 &bull; Bildungsrecht</div>
              <p><strong>EU AI Act in Kraft:</strong> Generative KI-Systeme in Prüfungssituationen gelten als Hochrisiko-Anwendungen. Eigenständigkeit und Quellen-Transparenz in Seminararbeiten werden zum zentralen Bewertungskriterium.</p>
            </div>
          </div>
        </div>

      </div>

      <!-- Right Column: Today's Schedule & Seminarfach Focus -->
      <div class="sf-akt-right-col">
        
        <!-- Today's Timetable inside Book -->
        <div class="sf-book-sidebar-box">
          <div class="sf-sidebar-box-head">
            <span>📅</span>
            <div>
              <strong>Heute im Stundenplan</strong>
              <div class="sf-sidebar-box-sub">${todaySchedule.dayName} &bull; IGS Oberstufe</div>
            </div>
          </div>
          <div class="sf-today-slots-list">
            ${todaySlotsHtml}
          </div>
          <button class="sf-btn-outline-full" onclick="switchSfTab('stunden')">
            📅 Stunden-Journal aufschlagen
          </button>
        </div>

        <!-- Current Seminarfach Focus Card -->
        <div class="sf-book-sidebar-box sf-focus-box">
          <div class="sf-focus-badge">🎯 SEMINARFACH LEITMOTIV</div>
          <h3 class="sf-focus-title">„Wie lernt man am besten mit KI?“</h3>
          <p class="sf-focus-desc">
            Vom passiven Konsum (Cognitive Offloading) zum aktiven sokratischen Dialog (Active Recall &amp; Germane Load).
          </p>
          <div class="sf-focus-topic-box">
            <div class="sf-focus-label">Ausgewähltes Thema für die Seminararbeit:</div>
            <strong class="sf-focus-topic-name">${escapeHtml(favTopic.title)}</strong>
            <div class="sf-focus-topic-sub">${escapeHtml(favTopic.subtitle || favTopic.interest || '')}</div>
          </div>
          <button class="sf-btn-secondary-full" onclick="switchSfTab('themen')">
            💡 Zur Themenfindung &amp; Brainstorming
          </button>
        </div>

        <!-- Post-It Sticky Note (Ins Buch geheftet) -->
        <div class="sf-postit-note">
          <div class="sf-postit-pin">📌</div>
          <h4>Wichtige Fristen:</h4>
          <ul>
            <li><strong>Heute:</strong> Goodnotes-Journal auf IServ einreichen</li>
            <li><strong>Oktober:</strong> SUB-Bibliotheksausweis Göttingen abholen</li>
            <li><strong>November:</strong> Empirisches Experiment an der IGS starten</li>
          </ul>
        </div>

      </div>

    </div>
  `;
}

// --- CLEAN INLINE NOTE INSERTER COMPONENT (AUF DER BUCHSEITE) ---
function renderCleanNoteInserterHtml() {
  return `
    <div class="sf-clean-note-inserter">
      <div class="sf-inserter-header">
        <div class="sf-inserter-title">
          <span>✍️</span> <strong>Neue Notiz sauber ins Tagebuch eintragen</strong>
        </div>
        <div class="sf-inserter-date-stamp">
          <span>📅 ${getTodayGermanFullDate()}</span>
        </div>
      </div>

      <div class="sf-inserter-row">
        <div class="sf-inserter-field">
          <label>Schulfach / Kurs:</label>
          <select id="sfInlineSubject" class="sf-inserter-select">
            ${SF_SUBJECT_OPTIONS.map(s => `<option value="${s.code}">${s.icon} ${s.name}</option>`).join('')}
          </select>
        </div>
        <div class="sf-inserter-field">
          <label>Stunde / Kontext:</label>
          <input type="text" id="sfInlineLesson" class="sf-inserter-input" value="${getTodayDayName()}, Schulstunde" placeholder="z. B. Mo 1./2. Std">
        </div>
        <div class="sf-inserter-field">
          <label>Stimmung / Vibe:</label>
          <select id="sfInlineMood" class="sf-inserter-select">
            <option value="💡 Erkenntnis" selected>💡 Erkenntnis / Heureka</option>
            <option value="🔥 Produktiv">🔥 Produktiv / Flow</option>
            <option value="🤔 Nachdenklich">🤔 Nachdenklich / Kritisch</option>
            <option value="⚠️ KI-Fehler">⚠️ KI-Fehler / Halluzination</option>
            <option value="🎯 Meilenstein">🎯 Meilenstein erreicht</option>
            <option value="📝 Mitschrift">📝 Mitschrift / Unterricht</option>
          </select>
        </div>
      </div>

      <div class="sf-inserter-title-input-wrap">
        <input type="text" id="sfInlineTitle" class="sf-lined-title-input" placeholder="Titel der Notiz (z. B. Was wir heute in Physik über Kräfte gelernt haben)...">
      </div>

      <div class="sf-inserter-text-wrap">
        <textarea id="sfInlineContent" class="sf-lined-textarea" rows="4" 
                  placeholder="Schreibe hier frei und unbeschwert deine Notiz auf: Was hast du beobachtet? Wie hat die KI geholfen oder versagt? Welche Gedanken nimmst du mit?"></textarea>
      </div>

      <div class="sf-inserter-details-toggle">
        <details>
          <summary>🔬 Wissenschaftliche Details für Herrn Jatzeck &amp; IServ (Prompt, Modell, Reflexion)</summary>
          <div class="sf-inserter-details-grid">
            <div>
              <label class="sf-sub-label">Genutztes KI-Modell / Tool:</label>
              <input type="text" id="sfInlineModel" class="sf-inserter-input" placeholder="z. B. ChatGPT-4o, Claude 3.5, o1">
            </div>
            <div>
              <label class="sf-sub-label">Aufgabenstellung / Kontext im Unterricht:</label>
              <textarea id="sfInlineTask" class="sf-inserter-textarea" rows="2" placeholder="Was war das Ziel der Stunde?"></textarea>
            </div>
            <div>
              <label class="sf-sub-label">Verwendeter Prompt (Wortlaut):</label>
              <textarea id="sfInlinePrompt" class="sf-inserter-textarea" rows="2" placeholder="Wie genau hast du die KI angesprochen?"></textarea>
            </div>
            <div>
              <label class="sf-sub-label">Beobachtung &amp; Ergebnis:</label>
              <textarea id="sfInlineResult" class="sf-inserter-textarea" rows="2" placeholder="Wie gut war die Antwort der KI?"></textarea>
            </div>
            <div style="grid-column: span 2;">
              <label class="sf-sub-label" style="color: #7c3aed;">🧠 Kritische Lernreflexion (Jatzeck Kriterium: Erkenntnisgewinn vs. Cognitive Offloading):</label>
              <textarea id="sfInlineReflection" class="sf-inserter-textarea" rows="2" placeholder="Hat es dein Verständnis gefördert oder nur Denkarbeit abgenommen?"></textarea>
            </div>
            <div style="grid-column: span 2;">
              <label class="sf-sub-label">Schlagwörter (Komma-getrennt):</label>
              <input type="text" id="sfInlineTags" class="sf-inserter-input" placeholder="z. B. Physik LK, Sokratik, Active Recall">
            </div>
          </div>
        </details>
      </div>

      <div class="sf-inserter-actions">
        <button class="sf-btn sf-btn-clean-insert" onclick="saveSfInlineNote()">
          <span>✍️</span> <strong>Notiz sauber im Tagebuch verewigen</strong>
        </button>
      </div>
    </div>
  `;
}

function saveSfInlineNote() {
  const contentEl = document.getElementById('sfInlineContent');
  const titleEl = document.getElementById('sfInlineTitle');
  const subjEl = document.getElementById('sfInlineSubject');
  const lessonEl = document.getElementById('sfInlineLesson');
  const moodEl = document.getElementById('sfInlineMood');

  const content = contentEl ? contentEl.value.trim() : '';
  let title = titleEl ? titleEl.value.trim() : '';
  const subjectCode = subjEl ? subjEl.value : 'sf4';
  const lesson = lessonEl ? lessonEl.value.trim() : `${getTodayDayName()}, Schulstunde`;
  const mood = moodEl ? moodEl.value : '💡 Erkenntnis';
  const subj = SF_SUBJECT_OPTIONS.find(s => s.code === subjectCode) || SF_SUBJECT_OPTIONS[0];

  if (!content && !title) {
    alert("Bitte schreibe eine kurze Notiz oder einen Titel auf, bevor du speicherst!");
    return;
  }

  if (!title) {
    title = content.length > 50 ? content.substring(0, 48) + '...' : `Notiz zu ${subj.short}`;
  }

  const modelEl = document.getElementById('sfInlineModel');
  const taskEl = document.getElementById('sfInlineTask');
  const promptEl = document.getElementById('sfInlinePrompt');
  const resultEl = document.getElementById('sfInlineResult');
  const reflectionEl = document.getElementById('sfInlineReflection');
  const tagsEl = document.getElementById('sfInlineTags');

  const model = modelEl && modelEl.value.trim() ? modelEl.value.trim() : "Eigene Reflexion";
  const task = taskEl && taskEl.value.trim() ? taskEl.value.trim() : "";
  const prompt = promptEl && promptEl.value.trim() ? promptEl.value.trim() : "";
  const result = resultEl && resultEl.value.trim() ? resultEl.value.trim() : "";
  const reflection = reflectionEl && reflectionEl.value.trim() ? reflectionEl.value.trim() : content;
  const rawTags = tagsEl && tagsEl.value.trim() ? tagsEl.value.trim() : "";
  const tags = rawTags ? rawTags.split(',').map(t => t.trim().replace(/^#/, '')).filter(Boolean) : [subj.short, "Tagebuch"];

  const entries = getSfJournalEntries();
  const newEntry = {
    id: "sf-j-" + Date.now(),
    num: String(entries.length + 1).padStart(2, '0'),
    date: getTodayGermanDate(),
    subjectCode: subjectCode,
    lesson: lesson,
    mood: mood,
    title: title,
    category: "Tagebuch & Reflexion",
    subject: subj.name,
    model: model,
    content: content,
    task: task,
    prompt: prompt,
    result: result,
    reflection: reflection,
    tags: tags
  };

  entries.push(newEntry);
  saveSfJournalEntries(entries);
  showSfToast("Notiz sauber im Tagebuch verewigt! 📖✨");
  renderSeminarfachView();
}

// --- 8. SUB-TAB 2: CHRONOLOGISCHES TAGEBUCH (BUCHSEITEN-STREAM) ---
function renderSfJournalView(container) {
  const allEntries = getSfJournalEntries();
  const categories = ['Alle', 'Tagebuch & Reflexion', 'Video-Analyse', 'YLAB Workshop', 'Empirie & Umfrage', 'Themensuche', 'Literatur & SUB', 'KI-News', 'Prompt-Experiment'];

  // Filter entries
  let filtered = allEntries.filter(entry => {
    const matchesSubj = (currentSfSubjectFilter === 'Alle') || (entry.subjectCode === currentSfSubjectFilter);
    const matchesCat = (currentSfCategoryFilter === 'Alle') || (entry.category === currentSfCategoryFilter);
    const q = currentSfSearchQuery.toLowerCase().trim();
    const matchesQuery = !q ||
      (entry.title && entry.title.toLowerCase().includes(q)) ||
      (entry.content && entry.content.toLowerCase().includes(q)) ||
      (entry.task && entry.task.toLowerCase().includes(q)) ||
      (entry.prompt && entry.prompt.toLowerCase().includes(q)) ||
      (entry.reflection && entry.reflection.toLowerCase().includes(q)) ||
      (entry.subject && entry.subject.toLowerCase().includes(q)) ||
      (entry.tags && entry.tags.some(t => t.toLowerCase().includes(q)));
    return matchesSubj && matchesCat && matchesQuery;
  });

  let subjFilterHtml = `
    <div class="sf-filter-group">
      <span class="sf-filter-label">Fach filtern:</span>
      <select class="sf-filter-select" onchange="setSfSubjectFilter(this.value)">
        <option value="Alle" ${currentSfSubjectFilter === 'Alle' ? 'selected' : ''}>Alle Fächer (${allEntries.length})</option>
        ${SF_SUBJECT_OPTIONS.map(s => {
          const count = allEntries.filter(e => e.subjectCode === s.code).length;
          return `<option value="${s.code}" ${currentSfSubjectFilter === s.code ? 'selected' : ''}>${s.icon} ${s.short} (${count})</option>`;
        }).join('')}
      </select>
    </div>
  `;

  let catChipsHtml = categories.map(cat => `
    <button class="sf-filter-chip ${currentSfCategoryFilter === cat ? 'active' : ''}" onclick="setSfCategoryFilter('${cat}')">
      ${cat}
    </button>
  `).join('');

  let entriesCardsHtml = '';
  if (filtered.length === 0) {
    entriesCardsHtml = `
      <div class="sf-empty-state">
        <div class="sf-empty-icon">📖</div>
        <h3>Keine Tagebucheinträge gefunden</h3>
        <p>Passe die Filter an oder trage oben direkt deine erste Notiz ein.</p>
      </div>
    `;
  } else {
    // Show newest entries first
    entriesCardsHtml = filtered.slice().reverse().map((e, idx) => {
      const subj = SF_SUBJECT_OPTIONS.find(s => s.code === e.subjectCode) || SF_SUBJECT_OPTIONS[0];
      const tagsHtml = (e.tags || []).map(t => `<span class="sf-diary-tag">#${t}</span>`).join(' ');
      const hasScientificDetails = Boolean(e.prompt || e.result || e.task);

      return `
        <article class="sf-diary-entry-card" id="entry-${e.id}">
          
          <!-- Diary Page Header -->
          <div class="sf-diary-card-header">
            <div class="sf-diary-ribbon-left">
              <span class="sf-diary-date-badge">📅 ${e.date || 'Ohne Datum'}</span>
              ${e.lesson ? `<span class="sf-diary-lesson-pill">${escapeHtml(e.lesson)}</span>` : ''}
              <span class="sf-subj-tag" style="background: ${subj.color}15; color: ${subj.color}; border: 1px solid ${subj.color}40;">
                ${subj.icon} ${subj.name}
              </span>
              ${e.mood ? `<span class="sf-mood-badge">${e.mood}</span>` : ''}
            </div>
            
            <div class="sf-diary-actions-right">
              <span class="sf-entry-num-stamp">Eintrag ${e.num || (filtered.length - idx)}</span>
              <button class="sf-icon-btn" onclick="openSfEditEntryModal('${e.id}')" title="Eintrag bearbeiten">✏️</button>
              <button class="sf-icon-btn" onclick="deleteSfEntry('${e.id}')" title="Eintrag löschen">🗑️</button>
            </div>
          </div>

          <!-- Handwritten / Book Title -->
          <h2 class="sf-diary-title">${escapeHtml(e.title)}</h2>

          <!-- Main Diary Text Body (Authentic personal narrative on lined paper) -->
          <div class="sf-diary-body-text">
            ${formatDiaryContent(e.content || e.reflection || e.task)}
          </div>

          <!-- Optional Accordion for Scientific Details (IServ / Herr Jatzeck) -->
          ${hasScientificDetails ? `
            <div class="sf-science-details-box">
              <div class="sf-science-head">
                <div class="sf-science-title">
                  <span>🔬</span> <strong>Wissenschaftliche Dokumentation (Herr Jatzeck Kriterien)</strong>
                </div>
                ${e.model ? `<span class="sf-model-pill">🤖 ${escapeHtml(e.model)}</span>` : ''}
              </div>

              ${e.task ? `
                <div class="sf-science-row">
                  <span class="sf-science-label">🎯 Aufgabenstellung &amp; Kontext:</span>
                  <p class="sf-science-val">${escapeHtml(e.task)}</p>
                </div>
              ` : ''}

              ${e.prompt ? `
                <div class="sf-science-row sf-prompt-row">
                  <div class="sf-prompt-top">
                    <span class="sf-science-label">💬 Verwendeter Prompt:</span>
                    <button class="sf-btn-copy-prompt" onclick="copySfEntryPrompt('${e.id}', this)">📋 Kopieren</button>
                  </div>
                  <pre class="sf-diary-prompt-box">${escapeHtml(e.prompt)}</pre>
                </div>
              ` : ''}

              ${e.result ? `
                <div class="sf-science-row">
                  <span class="sf-science-label">📊 Beobachtung &amp; KI-Ergebnis:</span>
                  <p class="sf-science-val">${escapeHtml(e.result)}</p>
                </div>
              ` : ''}

              ${e.reflection && e.reflection !== e.content ? `
                <div class="sf-science-row sf-reflection-highlight">
                  <span class="sf-science-label" style="color: #7c3aed;">🧠 Kritische Lernreflexion &amp; Relevanz:</span>
                  <p class="sf-science-val">${escapeHtml(e.reflection).replace(/\n/g, '<br>')}</p>
                </div>
              ` : ''}
            </div>
          ` : ''}

          <!-- Footer Tags -->
          ${tagsHtml ? `<div class="sf-diary-footer-tags">${tagsHtml}</div>` : ''}

        </article>
      `;
    }).join('');
  }

  container.innerHTML = `
    <!-- CLEAN INLINE NOTE INSERTER (Direkt auf der linierten Buchseite) -->
    ${renderCleanNoteInserterHtml()}

    <!-- Top Filter & Search Toolbar -->
    <div class="sf-diary-toolbar">
      <div class="sf-toolbar-row-top">
        ${subjFilterHtml}
        <div class="sf-search-box">
          <span class="sf-search-icon">🔍</span>
          <input type="text" class="sf-search-input" placeholder="Tagebuch durchsuchen (Physik, Sokratisch, Lesch, YLAB)..." 
                 value="${escapeHtml(currentSfSearchQuery)}" oninput="setSfSearchQuery(this.value)">
          ${currentSfSearchQuery ? `<button class="sf-search-clear" onclick="setSfSearchQuery('')">&times;</button>` : ''}
        </div>
      </div>
      <div class="sf-filter-chips-list">
        ${catChipsHtml}
      </div>
    </div>

    <!-- Diary Stream -->
    <div class="sf-diary-stream">
      ${entriesCardsHtml}
    </div>
  `;
}

function setSfSubjectFilter(code) {
  currentSfSubjectFilter = code;
  renderCurrentSfSubTab();
}

function setSfCategoryFilter(cat) {
  currentSfCategoryFilter = cat;
  renderCurrentSfSubTab();
}

function setSfSearchQuery(val) {
  currentSfSearchQuery = val;
  renderCurrentSfSubTab();
}

function formatDiaryContent(str) {
  if (!str) return '<p><em>Noch kein Fließtext verfasst.</em></p>';
  return str.split('\n\n').map(p => `<p>${escapeHtml(p).replace(/\n/g, '<br>')}</p>`).join('');
}

function scrollToSfEntry(entryId) {
  setTimeout(() => {
    const el = document.getElementById(`entry-${entryId}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      el.classList.add('sf-highlight-pulse');
      setTimeout(() => el.classList.remove('sf-highlight-pulse'), 2500);
    }
  }, 100);
}

// --- 9. SUB-TAB 3: STUNDEN-JOURNAL (WOCHENPLAN & JEDE STUNDE ERFASSEN) ---
function renderSfStundenView(container) {
  const entries = getSfJournalEntries();

  let daysHtml = SF_WEEK_TIMETABLE.map(day => {
    let slotsHtml = day.slots.map(slot => {
      if (!slot.code) {
        return `
          <div class="sf-stunde-card sf-stunde-card-free">
            <div class="sf-stunde-time">${slot.period} &bull; ${slot.time}</div>
            <div class="sf-stunde-free-name">Freistunde / Selbststudium</div>
          </div>
        `;
      }

      const subj = SF_SUBJECT_OPTIONS.find(s => s.code === slot.code) || SF_SUBJECT_OPTIONS[0];
      const matchingEntries = entries.filter(e => {
        return e.subjectCode === slot.code || (e.lesson && e.lesson.includes(slot.code));
      });

      return `
        <div class="sf-stunde-card ${matchingEntries.length > 0 ? 'is-documented' : ''}" style="--subj-accent: ${subj.color};">
          <div class="sf-stunde-top">
            <span class="sf-stunde-time">${slot.period} &bull; ${slot.time}</span>
            <span class="sf-stunde-subj-badge" style="background: ${subj.color}15; color: ${subj.color}; border: 1px solid ${subj.color}35;">
              ${subj.icon} ${subj.short}
            </span>
          </div>

          <div class="sf-stunde-body">
            <h4 class="sf-stunde-name">${slot.name}</h4>
            <div class="sf-stunde-meta">
              <span>👤 ${slot.teacher}</span> &bull; <span>📍 ${slot.room}</span>
            </div>
          </div>

          <div class="sf-stunde-footer">
            ${matchingEntries.length > 0 ? `
              <div class="sf-stunde-status-doc">
                <span>✅ ${matchingEntries.length} Notiz im Buch</span>
                <button class="sf-btn-view-stunde" onclick="switchSfTab('journal'); setSfSubjectFilter('${slot.code}')">
                  Lesen &rarr;
                </button>
              </div>
            ` : `
              <div class="sf-stunde-status-empty">
                <span>Noch nicht notiert</span>
                <button class="sf-btn-add-stunde" onclick="openSfNewEntryModalForLesson('${day.dayName}', '${slot.period}', '${slot.code}')">
                  ➕ Eintragen
                </button>
              </div>
            `}
          </div>
        </div>
      `;
    }).join('');

    return `
      <div class="sf-stunden-day-col">
        <div class="sf-stunden-day-header">
          <h3>${day.dayName}</h3>
          <span class="sf-day-pill">${day.slots.filter(s => s.code).length} Fächer</span>
        </div>
        <div class="sf-stunden-slots-wrap">
          ${slotsHtml}
        </div>
      </div>
    `;
  }).join('');

  container.innerHTML = `
    <div class="sf-stunden-intro">
      <div class="sf-stunden-intro-text">
        <h2>📅 Dein Stunden-Journal: Jede Schulstunde im Blick</h2>
        <p>
          Dokumentiere deine Gedanken, Fragen und den KI-Einsatz gezielt für jedes Fach aus deinem Stundenplan. 
          Klicke bei einer beliebigen Stunde auf <strong>„➕ Eintragen“</strong>, um einen neuen Tagebucheintrag direkt für dieses Fach anzulegen.
        </p>
      </div>
      <button class="sf-btn sf-btn-primary" onclick="openSfNewEntryModal()">
        ✍️ Freier Eintrag
      </button>
    </div>

    <div class="sf-stunden-week-matrix">
      ${daysHtml}
    </div>
  `;
}

function openSfNewEntryModalForLesson(dayName, period, subjectCode) {
  openSfNewEntryModal();
  const subjSelect = document.getElementById('sfFormSubjectSelect');
  if (subjSelect) subjSelect.value = subjectCode;
  
  const subj = SF_SUBJECT_OPTIONS.find(s => s.code === subjectCode);
  const subjName = subj ? subj.name : subjectCode;
  
  const lessonInput = document.getElementById('sfFormLesson');
  if (lessonInput) lessonInput.value = `${dayName}, ${period} (${subj ? subj.short : subjectCode})`;

  const titleInput = document.getElementById('sfFormTitle');
  if (titleInput) titleInput.value = `Unterrichtsnotiz: ${subj ? subj.short : subjectCode}`;

  const subjText = document.getElementById('sfFormSubject');
  if (subjText) subjText.value = subjName;
}

// --- 10. SUB-TAB 4: THEMENFINDUNG & BRAINSTORMING-BOARD ---
function renderSfThemenView(container) {
  const userIdeas = getSfUserThemen();
  const favTopicId = getSfFavoriteTopicId();

  let userIdeasHtml = '';
  if (userIdeas.length === 0) {
    userIdeasHtml = `
      <div class="sf-empty-ideas">
        <p>Du hast noch keine eigenen Themenideen notiert. Klicke unten auf <strong>„➕ Neue Themenidee festhalten“</strong>, um dein erstes Brainstorming festzuhalten!</p>
      </div>
    `;
  } else {
    userIdeasHtml = userIdeas.map(idea => {
      const isFav = idea.id === favTopicId;
      const tags = (idea.tags || []).map(t => `<span class="sf-idea-tag">#${t}</span>`).join(' ');
      const stars = "⭐".repeat(idea.rating || 5);

      return `
        <div class="sf-idea-card ${isFav ? 'favorite-active' : ''}">
          <div class="sf-idea-top">
            <div class="sf-idea-badge-line">
              <span class="sf-idea-status">${idea.status || '💡 Idee'}</span>
              <span class="sf-idea-stars">${stars}</span>
              <span class="sf-idea-date">📅 ${idea.date || ''}</span>
            </div>
            <div class="sf-idea-actions">
              <button class="sf-btn-fav ${isFav ? 'is-fav' : ''}" onclick="toggleSfFavoriteTopic('${idea.id}')">
                ${isFav ? '⭐ Mein Favorit' : '☆ Als Favorit'}
              </button>
              <button class="sf-icon-btn" onclick="deleteSfUserIdea('${idea.id}')" title="Idee löschen">🗑️</button>
            </div>
          </div>

          <h3 class="sf-idea-title">${escapeHtml(idea.title)}</h3>

          ${idea.interest ? `
            <div class="sf-idea-field">
              <span class="sf-idea-label">❤️ Was mich daran besonders reizt:</span>
              <p class="sf-idea-text">${escapeHtml(idea.interest)}</p>
            </div>
          ` : ''}

          ${idea.question ? `
            <div class="sf-idea-field sf-q-box">
              <span class="sf-idea-label">❓ Forschungsfrage / Gedanke:</span>
              <p class="sf-idea-text">„${escapeHtml(idea.question)}“</p>
            </div>
          ` : ''}

          ${idea.notes ? `
            <div class="sf-idea-field">
              <span class="sf-idea-label">📝 Praxistest &amp; Notizen:</span>
              <p class="sf-idea-text">${escapeHtml(idea.notes)}</p>
            </div>
          ` : ''}

          ${tags ? `<div class="sf-idea-tags">${tags}</div>` : ''}
        </div>
      `;
    }).join('');
  }

  let academicTopicsHtml = SF_THEMEN.map(t => {
    const isFav = t.id === favTopicId;
    return `
      <div class="sf-themen-card ${isFav ? 'favorite-active' : ''}">
        <div class="sf-themen-top">
          <div class="sf-themen-badges">
            <span class="sf-badge-rank">${t.rank}</span>
            <span class="sf-badge-pill" style="background: ${t.badgeColor}15; color: ${t.badgeColor}; border: 1px solid ${t.badgeColor}40;">
              ${t.badge}
            </span>
          </div>
          <button class="sf-btn-fav ${isFav ? 'is-fav' : ''}" onclick="toggleSfFavoriteTopic('${t.id}')">
            ${isFav ? '⭐ Mein Favorit für Seminararbeit' : '☆ Als Favorit wählen'}
          </button>
        </div>

        <h3 class="sf-themen-title">${t.title}</h3>
        <p class="sf-themen-subtitle">${t.subtitle}</p>

        <!-- Research Question Box -->
        <div class="sf-question-box">
          <div class="sf-q-label">❓ Forschungsleitende Fragestellung:</div>
          <div class="sf-q-text">„${t.question}“</div>
        </div>

        <!-- Hypothesis -->
        <div class="sf-themen-detail-row">
          <strong>🎯 Arbeitshypothese:</strong>
          <span>${t.hypothesis}</span>
        </div>

        <!-- Empirical Practical Part -->
        <div class="sf-themen-detail-row sf-practical-row">
          <strong>🧪 Praxisteil &amp; Eigenanteil an der Schule:</strong>
          <span>${t.practical}</span>
        </div>

        <!-- Theoretical Foundations -->
        <div class="sf-themen-theories">
          <span class="sf-theory-label">📚 Lerntheoretische Bezugspunkte:</span>
          <div class="sf-theory-chips">
            ${t.theories.map(th => `<span class="sf-theory-chip">${th}</span>`).join('')}
          </div>
        </div>
      </div>
    `;
  }).join('');

  container.innerHTML = `
    <!-- Section 1: User's Free Brainstorming Board -->
    <div class="sf-themen-header-banner">
      <div>
        <h2>💡 Themenfindung: Was interessiert mich wirklich?</h2>
        <p>Hier kannst du völlig frei deine eigenen Ideen, Gedankenblitze und Interessen für die Seminarfacharbeit aufschreiben und ordnen.</p>
      </div>
      <button class="sf-btn sf-btn-primary" onclick="openSfNewIdeaModal()">
        ➕ Neue Themenidee festhalten
      </button>
    </div>

    <div class="sf-ideas-board-section">
      <div class="sf-ideas-section-title">
        <span>📌</span> <strong>Meine gesammelten Themenideen (${userIdeas.length})</strong>
      </div>
      <div class="sf-ideas-grid">
        ${userIdeasHtml}
      </div>
    </div>

    <!-- Section 2: 5 Structured Academic Proposals for Herr Jatzeck -->
    <div class="sf-academic-themen-section">
      <div class="sf-themen-intro">
        <div class="sf-themen-intro-text">
          <h2>🎓 5 Wissenschaftliche Themenkonzepte für Herrn Jatzeck</h2>
          <p>
            Vollständig ausgearbeitete Exposé-Ansätze zum Leitmotiv <em>„Wie lernt man am besten mit KI?“</em> mit präziser Forschungsfrage, 
            Hypothese und empirischem Praxisteil an unserer Schule.
          </p>
        </div>
        <button class="sf-btn-secondary" onclick="exportSfExposeTemplate()">
          📄 Exposé-Vorlage kopieren
        </button>
      </div>

      <div class="sf-themen-grid">
        ${academicTopicsHtml}
      </div>
    </div>

    <!-- Section 3: Theoretical Foundations Guide -->
    <div class="sf-theory-reference-box">
      <h3>🧠 Wissenschaftlicher Theorie-Spickzettel für die Seminararbeit</h3>
      <div class="sf-theory-ref-grid">
        <div class="sf-theory-ref-card">
          <h4>Cognitive Load Theory (John Sweller)</h4>
          <p>
            Unterscheidet <em>Intrinsic Load</em> (Stoffschwierigkeit), <em>Extraneous Load</em> (schlechte Darstellung) und 
            <em>Germane Load</em> (eigentliche Denkarbeit/Schemabildung). KI kann Extraneous Load minimieren – zerstört aber das Behalten, 
            wenn durch Copy-Paste auch der Germane Load umgangen wird!
          </p>
        </div>
        <div class="sf-theory-ref-card">
          <h4>Blooms 2-Sigma-Problem (1984)</h4>
          <p>
            Benjamin Bloom wies nach, dass 1-zu-1-Tutoring Schüler um 2 Standardabweichungen (zwei Notenstufen) verbessert. 
            Moderne LLMs können als erster skalierbarer digitaler 1-zu-1-Tutor fungieren – wenn Schüler sokratisch prompten.
          </p>
        </div>
        <div class="sf-theory-ref-card">
          <h4>Illusion of Knowledge &amp; Cognitive Offloading</h4>
          <p>
            Schüler verwechseln das Verstehen eines vorgelesenen KI-Textes mit eigenem Können („Fluency Illusion“). 
            Erst durch aktives Abrufen (Active Recall / Retrieval) ohne KI wird echtes Abiturwissen gefestigt.
          </p>
        </div>
      </div>
    </div>
  `;
}

function toggleSfFavoriteTopic(topicId) {
  setSfFavoriteTopicId(topicId);
  renderSeminarfachView();
  showSfToast("Favorit für Seminararbeit aktualisiert! ⭐");
}

function deleteSfUserIdea(ideaId) {
  if (!confirm("Möchtest du diese Themenidee wirklich löschen?")) return;
  let ideas = getSfUserThemen();
  ideas = ideas.filter(i => i.id !== ideaId);
  saveSfUserThemen(ideas);
  renderSeminarfachView();
  showSfToast("Themenidee gelöscht 🗑️");
}

// Modal for adding a new topic brainstorm idea
function openSfNewIdeaModal() {
  let modal = document.getElementById('sfNewIdeaModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'sfNewIdeaModal';
    modal.className = 'portal-modal-backdrop';
    modal.style.display = 'none';
    modal.onclick = (e) => {
      if (e.target === modal) closeSfNewIdeaModal();
    };
    modal.innerHTML = `
      <div class="portal-modal-content sf-idea-modal" onclick="event.stopPropagation()">
        <div class="modal-header">
          <h3 style="margin: 0;">💡 Neue Themenidee festhalten</h3>
          <button class="modal-close-btn" onclick="closeSfNewIdeaModal()">&times;</button>
        </div>
        <div class="modal-body" style="padding: 1.2rem 1.5rem;">
          <div class="sf-form-grid">
            <div class="sf-form-group full-width">
              <label class="sf-form-label">Titel / Thema der Idee *</label>
              <input type="text" id="sfIdeaFormTitle" class="sf-form-input" placeholder="z. B. KI-Tutoring im Physikunterricht am Beispiel Mechanik">
            </div>
            <div class="sf-form-group full-width">
              <label class="sf-form-label">Was interessiert mich persönlich daran? *</label>
              <textarea id="sfIdeaFormInterest" class="sf-form-textarea" rows="3" placeholder="Warum reizt dich das? Welches Problem willst du lösen oder verstehen?"></textarea>
            </div>
            <div class="sf-form-group full-width">
              <label class="sf-form-label">Mögliche Forschungsfrage / Fragestellung</label>
              <input type="text" id="sfIdeaFormQuestion" class="sf-form-input" placeholder="z. B. Inwiefern verbessert gezieltes Prompting das Behalten von Formeln?">
            </div>
            <div class="sf-form-group">
              <label class="sf-form-label">Status / Reifegrad</label>
              <select id="sfIdeaFormStatus" class="sf-form-select">
                <option value="🔥 Heißer Favorit">🔥 Heißer Favorit</option>
                <option value="💡 Spannende Idee">💡 Spannende Idee</option>
                <option value="🔬 Praxistest nötig">🔬 Praxistest nötig</option>
                <option value="⏳ Noch recherchieren">⏳ Noch recherchieren</option>
              </select>
            </div>
            <div class="sf-form-group">
              <label class="sf-form-label">Priorität / Begeisterung</label>
              <select id="sfIdeaFormRating" class="sf-form-select">
                <option value="5">⭐⭐⭐⭐⭐ (5/5)</option>
                <option value="4" selected>⭐⭐⭐⭐ (4/5)</option>
                <option value="3">⭐⭐⭐ (3/5)</option>
              </select>
            </div>
            <div class="sf-form-group full-width">
              <label class="sf-form-label">Praxis-Idee an der eigenen Schule (Experiment / Umfrage)</label>
              <textarea id="sfIdeaFormNotes" class="sf-form-textarea" rows="2" placeholder="Welchen praktischen Eigenanteil könntest du an der IGS durchführen?"></textarea>
            </div>
            <div class="sf-form-group full-width">
              <label class="sf-form-label">Schlagwörter (Komma-getrennt)</label>
              <input type="text" id="sfIdeaFormTags" class="sf-form-input" placeholder="z. B. Physik LK, Sokratik, Active Recall">
            </div>
          </div>
        </div>
        <div class="modal-footer" style="padding: 1rem 1.5rem; display: flex; justify-content: flex-end; gap: 0.6rem;">
          <button class="btn-back-nav" onclick="closeSfNewIdeaModal()">Abbrechen</button>
          <button class="sf-btn sf-btn-primary" onclick="saveSfNewIdeaFromModal()">💡 Idee speichern</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  }

  document.getElementById('sfIdeaFormTitle').value = "";
  document.getElementById('sfIdeaFormInterest').value = "";
  document.getElementById('sfIdeaFormQuestion').value = "";
  document.getElementById('sfIdeaFormNotes').value = "";
  document.getElementById('sfIdeaFormTags').value = "";

  modal.style.display = 'flex';
}

function closeSfNewIdeaModal() {
  const modal = document.getElementById('sfNewIdeaModal');
  if (modal) modal.style.display = 'none';
}

function saveSfNewIdeaFromModal() {
  const title = document.getElementById('sfIdeaFormTitle').value.trim();
  const interest = document.getElementById('sfIdeaFormInterest').value.trim();
  if (!title) {
    alert("Bitte gib einen Titel für deine Themenidee an!");
    return;
  }

  const question = document.getElementById('sfIdeaFormQuestion').value.trim();
  const status = document.getElementById('sfIdeaFormStatus').value;
  const rating = parseInt(document.getElementById('sfIdeaFormRating').value) || 4;
  const notes = document.getElementById('sfIdeaFormNotes').value.trim();
  const rawTags = document.getElementById('sfIdeaFormTags').value.trim();
  const tags = rawTags ? rawTags.split(',').map(t => t.trim().replace(/^#/, '')).filter(Boolean) : ["Themenfindung"];

  const ideas = getSfUserThemen();
  const newIdea = {
    id: "sf-idea-" + Date.now(),
    title,
    interest,
    question,
    status,
    rating,
    notes,
    tags,
    date: getTodayGermanDate()
  };

  ideas.unshift(newIdea);
  saveSfUserThemen(ideas);
  closeSfNewIdeaModal();
  renderSeminarfachView();
  showSfToast("Neue Themenidee festgehalten! 💡");
}

// --- 11. SUB-TAB 5: PROMPT-STUDIO ---
function renderSfPromptsView(container) {
  let cardsHtml = SF_PROMPT_TEMPLATES.map(p => `
    <div class="sf-prompt-card">
      <div class="sf-prompt-card-top">
        <div>
          <span class="sf-badge-pill sf-badge-purple">${p.category}</span>
          <h3 class="sf-prompt-card-title">${p.title}</h3>
        </div>
        <button class="sf-btn-copy-prompt primary-copy" onclick="copySfTemplatePrompt('${p.id}', this)">
          📋 Prompt kopieren
        </button>
      </div>
      <p class="sf-prompt-card-desc">${p.desc}</p>
      <pre class="sf-prompt-card-code">${escapeHtml(p.prompt)}</pre>
    </div>
  `).join('');

  container.innerHTML = `
    <div class="sf-prompts-intro">
      <h2>🧪 Das Seminarfach Prompt-Studio: Wissenschaftlich erprobte Tutoren</h2>
      <p>
        Diese Prompt-Vorlagen wurden gezielt entwickelt, um <strong>Cognitive Offloading</strong> zu verhindern und 
        das Gehirn in den <strong>Active-Recall-Modus</strong> zu versetzen. Kopiere sie mit einem Klick in ChatGPT, Claude oder Gemini!
      </p>
    </div>
    <div class="sf-prompts-grid">
      ${cardsHtml}
    </div>
  `;
}

function copySfTemplatePrompt(templateId, btnElement) {
  const t = SF_PROMPT_TEMPLATES.find(p => p.id === templateId);
  if (t && t.prompt) {
    copySfText(t.prompt, btnElement);
  }
}

// --- 12. SUB-TAB 6: MODELLVERGLEICH ---
function renderSfToolsView(container) {
  let toolsHtml = SF_TOOLS_DATA.map(tool => `
    <div class="sf-tool-card">
      <div class="sf-tool-head">
        <div class="sf-tool-icon-name">
          <span class="sf-tool-icon">${tool.icon}</span>
          <div>
            <h3 class="sf-tool-name">${tool.name}</h3>
            <span class="sf-tool-role">${tool.role}</span>
          </div>
        </div>
      </div>

      <div class="sf-tool-scores-grid">
        <div class="sf-score-col">
          <span class="sf-score-label">MINT / Mathe:</span>
          <span class="sf-score-val">⭐ ${tool.mintScore.toFixed(1)}</span>
        </div>
        <div class="sf-score-col">
          <span class="sf-score-label">Didaktik / Tutor:</span>
          <span class="sf-score-val">⭐ ${tool.didaktikScore.toFixed(1)}</span>
        </div>
        <div class="sf-score-col">
          <span class="sf-score-label">Informatik / Code:</span>
          <span class="sf-score-val">⭐ ${tool.codeScore.toFixed(1)}</span>
        </div>
        <div class="sf-score-col">
          <span class="sf-score-label">Quellen / Zitate:</span>
          <span class="sf-score-val">⭐ ${tool.sourceScore.toFixed(1)}</span>
        </div>
      </div>

      <div class="sf-tool-text-block">
        <div class="sf-pro-con">
          <strong style="color: #10b981;">✅ Stärken:</strong> ${tool.pros}
        </div>
        <div class="sf-pro-con" style="margin-top: 0.4rem;">
          <strong style="color: #ef4444;">⚠️ Schwächen:</strong> ${tool.cons}
        </div>
      </div>

      <div class="sf-tool-verdict">
        <strong>💡 Fazit für die Schule:</strong> ${tool.verdict}
      </div>
    </div>
  `).join('');

  container.innerHTML = `
    <div class="sf-tools-intro">
      <h2>📊 Modell-Vergleichsmatrix: Welches Tool für welches Schulfach?</h2>
      <p>
        Ein wesentliches Kapitel der Seminarfacharbeit untersucht die Leistungsunterschiede verschiedener Modellarchitekturen 
        (Standard-LLMs vs. Reasoning-Modelle vs. semantische Suchmaschinen).
      </p>
    </div>
    <div class="sf-tools-grid">
      ${toolsHtml}
    </div>
  `;
}

// --- 13. SUB-TAB 7: MITSCHRIFTEN & DOKUMENTE ---
async function renderSfMitschriftenView(container) {
  container.innerHTML = `
    <div class="sf-mitschriften-intro">
      <div class="sf-mitschriften-text">
        <h2>📁 Eigene Mitschriften, Dateien &amp; Notizen</h2>
        <p>
          Füge hier handschriftliche Notizen, Fotos von Tafelbildern, Unterrichtsmitschriften oder PDFs (z. B. Bewertungsbögen, Handouts) ein. 
          Alle Dokumente werden offline &amp; sicher in deinem Browser gespeichert.
        </p>
      </div>
      <button class="sf-btn-primary" onclick="triggerSfUploadModal()">
        <span>📤</span> Neue Datei / Notiz hochladen
      </button>
    </div>
    <div id="sfMitschriftenGridContainer" style="margin-top: 1.2rem;">
      <div style="padding: 2rem; text-align: center; color: var(--text-muted);">Lade Dokumente...</div>
    </div>
  `;

  if (typeof renderSubjectUserDocuments === 'function') {
    await renderSubjectUserDocuments('seminarfach', 'sfMitschriftenGridContainer');
  } else {
    document.getElementById('sfMitschriftenGridContainer').innerHTML = `
      <div class="sf-empty-state">
        <div class="sf-empty-icon">📁</div>
        <h3>Mitschriften-Modul bereit</h3>
        <p>Klicke oben auf „Neue Datei / Notiz hochladen“, um deine erste Mitschrift einzufügen.</p>
        <button class="sf-btn-primary" onclick="triggerSfUploadModal()" style="margin-top: 0.8rem;">
          ➕ Mitschrift einfügen
        </button>
      </div>
    `;
  }
}

function triggerSfUploadModal() {
  if (typeof openUploadModal === 'function') {
    openUploadModal('seminarfach', 'mitschrift');
  } else {
    alert("Das Dokumenten-Upload-Modul wird geladen... Bitte versuche es in wenigen Sekunden erneut.");
  }
}

// --- 14. MODAL: ENTRY CREATION & EDITING ---
let CURRENT_SF_EDIT_ID = null;

function openSfNewEntryModal() {
  CURRENT_SF_EDIT_ID = null;
  const modal = document.getElementById('sfEntryModal');
  if (!modal) return;

  document.getElementById('sfModalTitle').textContent = "✍️ Neuer Tagebuch-Eintrag";
  document.getElementById('sfFormTitle').value = "";
  document.getElementById('sfFormDate').value = getTodayGermanDate();
  
  const subjSelect = document.getElementById('sfFormSubjectSelect');
  if (subjSelect) subjSelect.value = "sf4";

  const moodSelect = document.getElementById('sfFormMood');
  if (moodSelect) moodSelect.value = "💡 Erkenntnis";

  const lessonInput = document.getElementById('sfFormLesson');
  if (lessonInput) lessonInput.value = `${getTodayDayName()}, Seminarfach (sf4)`;

  document.getElementById('sfFormCategory').value = "Tagebuch & Reflexion";
  document.getElementById('sfFormSubject').value = "Seminarfach 4: KI (Hr. Jatzeck)";
  document.getElementById('sfFormModel').value = "ChatGPT (GPT-4o)";
  
  const contentInput = document.getElementById('sfFormContent');
  if (contentInput) contentInput.value = "";

  document.getElementById('sfFormTask').value = "";
  document.getElementById('sfFormPrompt').value = "";
  document.getElementById('sfFormResult').value = "";
  document.getElementById('sfFormReflection').value = "";
  document.getElementById('sfFormTags').value = "";

  modal.style.display = 'flex';
}

function openSfEditEntryModal(id) {
  const entries = getSfJournalEntries();
  const entry = entries.find(e => e.id === id);
  if (!entry) return;

  CURRENT_SF_EDIT_ID = id;
  const modal = document.getElementById('sfEntryModal');
  if (!modal) return;

  document.getElementById('sfModalTitle').textContent = "✏️ Eintrag bearbeiten";
  document.getElementById('sfFormTitle').value = entry.title || "";
  document.getElementById('sfFormDate').value = entry.date || "";
  
  const subjSelect = document.getElementById('sfFormSubjectSelect');
  if (subjSelect) subjSelect.value = entry.subjectCode || "sf4";

  const moodSelect = document.getElementById('sfFormMood');
  if (moodSelect) moodSelect.value = entry.mood || "💡 Erkenntnis";

  const lessonInput = document.getElementById('sfFormLesson');
  if (lessonInput) lessonInput.value = entry.lesson || "";

  document.getElementById('sfFormCategory').value = entry.category || "Tagebuch & Reflexion";
  document.getElementById('sfFormSubject').value = entry.subject || "";
  document.getElementById('sfFormModel').value = entry.model || "";
  
  const contentInput = document.getElementById('sfFormContent');
  if (contentInput) contentInput.value = entry.content || entry.reflection || "";

  document.getElementById('sfFormTask').value = entry.task || "";
  document.getElementById('sfFormPrompt').value = entry.prompt || "";
  document.getElementById('sfFormResult').value = entry.result || "";
  document.getElementById('sfFormReflection').value = entry.reflection || "";
  document.getElementById('sfFormTags').value = (entry.tags || []).join(', ');

  modal.style.display = 'flex';
}

function closeSfEntryModal(e) {
  if (e && e.target && e.target.closest && e.target.closest('.portal-modal-content') && e.target.classList.contains('modal-close-btn') === false && e.target.classList.contains('btn-back-nav') === false) {
    return;
  }
  const modal = document.getElementById('sfEntryModal');
  if (modal) modal.style.display = 'none';
  CURRENT_SF_EDIT_ID = null;
}

function saveSfEntryFromModal() {
  const title = document.getElementById('sfFormTitle').value.trim();
  if (!title) {
    alert("Bitte gib einen Titel für deinen Eintrag an!");
    return;
  }

  const date = document.getElementById('sfFormDate').value.trim() || getTodayGermanDate();
  const subjSelect = document.getElementById('sfFormSubjectSelect');
  const subjectCode = subjSelect ? subjSelect.value : "sf4";
  const subj = SF_SUBJECT_OPTIONS.find(s => s.code === subjectCode) || SF_SUBJECT_OPTIONS[0];

  const moodSelect = document.getElementById('sfFormMood');
  const mood = moodSelect ? moodSelect.value : "💡 Erkenntnis";

  const lessonInput = document.getElementById('sfFormLesson');
  const lesson = lessonInput ? lessonInput.value.trim() : `${getTodayDayName()}, ${subj.short}`;

  const category = document.getElementById('sfFormCategory').value;
  const subject = document.getElementById('sfFormSubject').value.trim() || subj.name;
  const model = document.getElementById('sfFormModel').value.trim();
  
  const contentInput = document.getElementById('sfFormContent');
  const content = contentInput ? contentInput.value.trim() : "";

  const task = document.getElementById('sfFormTask').value.trim();
  const prompt = document.getElementById('sfFormPrompt').value.trim();
  const result = document.getElementById('sfFormResult').value.trim();
  const reflection = document.getElementById('sfFormReflection').value.trim() || content;
  
  const rawTags = document.getElementById('sfFormTags').value.trim();
  const tags = rawTags ? rawTags.split(',').map(t => t.trim().replace(/^#/, '')).filter(Boolean) : [subj.short];

  let entries = getSfJournalEntries();

  if (CURRENT_SF_EDIT_ID) {
    const idx = entries.findIndex(e => e.id === CURRENT_SF_EDIT_ID);
    if (idx !== -1) {
      entries[idx] = {
        ...entries[idx],
        title, date, subjectCode, lesson, mood, category, subject, model, content, task, prompt, result, reflection, tags
      };
    }
    showSfToast("Eintrag erfolgreich aktualisiert! ✅");
  } else {
    const newEntry = {
      id: "sf-j-" + Date.now(),
      num: String(entries.length + 1).padStart(2, '0'),
      date, subjectCode, lesson, mood, category, subject, model, title, content, task, prompt, result, reflection, tags
    };
    entries.push(newEntry);
    showSfToast("Neuer Tagebucheintrag im Buch gespeichert! 📖✨");
  }

  saveSfJournalEntries(entries);
  closeSfEntryModal();
  renderSeminarfachView();
}

function deleteSfEntry(id) {
  if (!confirm("Möchtest du diesen Tagebucheintrag wirklich löschen?")) return;

  let entries = getSfJournalEntries();
  entries = entries.filter(e => e.id !== id);
  saveSfJournalEntries(entries);
  renderSeminarfachView();
  showSfToast("Eintrag gelöscht 🗑️");
}

function resetSfJournalDefaults() {
  if (!confirm("Möchtest du das Tagebuch auf die 7 Standard-Einträge zurücksetzen?")) return;
  saveSfJournalEntries(DEFAULT_SF_JOURNAL);
  saveSfUserThemen(DEFAULT_SF_USER_IDEAS);
  renderSeminarfachView();
  showSfToast("Tagebuch auf Standard zurückgesetzt 🔄");
}

function copySfEntryPrompt(entryId, btnElement) {
  const entries = getSfJournalEntries();
  const entry = entries.find(e => e.id === entryId);
  if (entry && entry.prompt) {
    copySfText(entry.prompt, btnElement);
  }
}

// --- 15. PDF EXPORT FÜR ISERV ---
function exportSfJournalPDF() {
  const entries = getSfJournalEntries();
  const userIdeas = getSfUserThemen();
  const favTopicId = getSfFavoriteTopicId();
  const favTopic = SF_THEMEN.find(t => t.id === favTopicId) || userIdeas.find(i => i.id === favTopicId) || SF_THEMEN[0];

  let printHtml = `
    <!DOCTYPE html>
    <html lang="de">
    <head>
      <meta charset="UTF-8">
      <title>Prozessjournal - Seminarfach 4 - Tonda Beutler</title>
      <style>
        @page {
          size: A4 portrait;
          margin: 1.6cm 1.4cm;
        }
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          color: #1a1a1a;
          line-height: 1.55;
          margin: 0;
          padding: 1.2rem;
          font-size: 10pt;
          background: #ffffff;
        }
        .header-box {
          border: 2px solid #7c3aed;
          border-radius: 8px;
          padding: 1.2rem 1.4rem;
          margin-bottom: 1.4rem;
          background: #faf5ff;
        }
        .header-title {
          font-size: 17pt;
          font-weight: 800;
          color: #5b21b6;
          margin: 0 0 0.4rem 0;
        }
        .header-meta-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.4rem;
          font-size: 9pt;
          color: #374151;
        }
        .fav-box {
          background: #f8faff;
          border-left: 4px solid #2563eb;
          border-radius: 4px;
          padding: 0.8rem 1rem;
          margin-bottom: 1.5rem;
        }
        .entry-card {
          border: 1px solid #d1d5db;
          border-radius: 6px;
          padding: 1rem 1.2rem;
          margin-bottom: 1.3rem;
          page-break-inside: avoid;
          break-inside: avoid;
          background: #ffffff;
        }
        .entry-header {
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid #e5e7eb;
          padding-bottom: 0.35rem;
          margin-bottom: 0.5rem;
          font-size: 8.5pt;
          color: #4b5563;
          font-weight: 600;
        }
        .entry-title {
          font-size: 12.5pt;
          font-weight: 700;
          margin: 0 0 0.5rem 0;
          color: #111827;
        }
        .diary-content {
          font-size: 9.5pt;
          color: #374151;
          margin-bottom: 0.8rem;
          line-height: 1.6;
        }
        .section-label {
          font-size: 8pt;
          font-weight: 700;
          text-transform: uppercase;
          color: #4b5563;
          margin-top: 0.45rem;
          margin-bottom: 0.15rem;
        }
        .prompt-box {
          background: #f3f4f6;
          border-left: 3px solid #6b7280;
          padding: 0.5rem 0.7rem;
          font-family: 'Courier New', Courier, monospace;
          font-size: 8.5pt;
          white-space: pre-wrap;
          word-break: break-word;
          margin: 0.25rem 0;
        }
        .reflection-box {
          background: #fdf4ff;
          border: 1px solid #f0abfc;
          border-left: 4px solid #c026d3;
          border-radius: 4px;
          padding: 0.75rem 0.9rem;
          margin-top: 0.6rem;
        }
        .reflection-title {
          font-weight: 700;
          color: #a21caf;
          font-size: 8.8pt;
          margin-bottom: 0.25rem;
        }
        .tags {
          margin-top: 0.45rem;
          font-size: 7.8pt;
          color: #6b7280;
        }
        .print-btn-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.2rem;
          padding: 0.8rem 1rem;
          background: #eff6ff;
          border: 1px solid #bfdbfe;
          border-radius: 8px;
        }
        .btn-print {
          background: #7c3aed;
          color: white;
          border: none;
          padding: 0.6rem 1.4rem;
          font-size: 10pt;
          font-weight: bold;
          border-radius: 20px;
          cursor: pointer;
        }
        @media print {
          .print-btn-bar { display: none !important; }
          body { padding: 0 !important; }
        }
      </style>
    </head>
    <body>
      <div class="print-btn-bar">
        <span>📄 <strong>IServ-Abgabe Druckansicht:</strong> Klicke rechts auf Drucken und wähle <em>„Als PDF speichern“</em>.</span>
        <button class="btn-print" onclick="window.print()">🖨️ Jetzt als PDF drucken / speichern</button>
      </div>

      <div class="header-box">
        <h1 class="header-title">🎓 Digitales Prozessjournal &bull; Seminarfach 4 (Künstliche Intelligenz)</h1>
        <div class="header-meta-grid">
          <div><strong>Schüler:</strong> Tonda Beutler</div>
          <div><strong>Lehrkraft:</strong> Herr Michael Jatzeck</div>
          <div><strong>Schule:</strong> IGS Göttingen &bull; Jahrgang 12 (Abi 2028)</div>
          <div><strong>Kurs:</strong> Abi28 sf4 (Seminarfach)</div>
          <div><strong>Zentrales Leitmotiv:</strong> „Wie lernt man am besten mit KI?“</div>
          <div><strong>Stand:</strong> ${getTodayGermanDate()}</div>
        </div>
      </div>

      <div class="fav-box">
        <strong>Ausgewählte Themenspezifikation für die Seminarfacharbeit:</strong><br>
        <span style="font-size: 11pt; font-weight: bold; color: #7e22ce;">${escapeHtml(favTopic.title)}</span><br>
        <em>${escapeHtml(favTopic.subtitle || favTopic.interest || '')}</em><br>
        <div style="margin-top: 0.3rem; font-size: 8.8pt;"><strong>Forschungsfrage:</strong> ${escapeHtml(favTopic.question || '')}</div>
      </div>

      <h2 style="font-size: 11pt; text-transform: uppercase; color: #374151; border-bottom: 2px solid #e5e7eb; padding-bottom: 0.25rem; margin-top: 1.2rem;">
        Fortlaufende Tagebuch-Einträge (${entries.length} Einträge dokumentiert)
      </h2>
  `;

  entries.forEach((e, idx) => {
    printHtml += `
      <div class="entry-card">
        <div class="entry-header">
          <span>📅 Datum: ${e.date || '-'} &bull; ${e.lesson || e.subject}</span>
          <span>Eintrag ${e.num || (idx + 1)} &bull; ${e.model || 'KI'} ${e.mood ? '&bull; ' + e.mood : ''}</span>
        </div>
        <div class="entry-title">${escapeHtml(e.title)}</div>

        ${e.content ? `
          <div class="diary-content">
            ${escapeHtml(e.content).replace(/\n/g, '<br>')}
          </div>
        ` : ''}

        ${e.task ? `
          <div class="section-label">🎯 Aufgabenstellung &amp; Kontext:</div>
          <div>${escapeHtml(e.task)}</div>
        ` : ''}

        ${e.prompt ? `
          <div class="section-label">💬 Verwendeter Prompt / Leitfragen:</div>
          <div class="prompt-box">${escapeHtml(e.prompt)}</div>
        ` : ''}

        ${e.result ? `
          <div class="section-label">📊 Beobachtung &amp; Arbeitsergebnis:</div>
          <div>${escapeHtml(e.result)}</div>
        ` : ''}

        ${e.reflection && e.reflection !== e.content ? `
          <div class="reflection-box">
            <div class="reflection-title">🧠 Kritischer Kommentar &amp; Lernreflexion:</div>
            <div>${escapeHtml(e.reflection).replace(/\n/g, '<br>')}</div>
          </div>
        ` : ''}

        ${e.tags && e.tags.length > 0 ? `
          <div class="tags">Schlagwörter: ${e.tags.map(t => '#' + t).join(' ')}</div>
        ` : ''}
      </div>
    `;
  });

  printHtml += `
    </body>
    </html>
  `;

  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.open();
    printWindow.document.write(printHtml);
    printWindow.document.close();
    setTimeout(() => {
      printWindow.focus();
      printWindow.print();
    }, 500);
    showSfToast("PDF-Druckansicht geöffnet! 📄");
  } else {
    window.print();
  }
}

function exportSfJournalMarkdown() {
  const entries = getSfJournalEntries();
  let md = `# 📔 Digitales Prozessjournal & Schul-Tagebuch: Seminarfach 4\n`;
  md += `> **Autor:** Tonda Beutler • Jahrgang 12 • IGS Göttingen\n`;
  md += `> **Kurs:** Abi28 sf4 (Herr Michael Jatzeck)\n`;
  md += `> **Leitfrage:** Wie lernt man am besten mit KI?\n\n---\n\n`;

  entries.forEach((e) => {
    md += `### Eintrag ${e.num || ''}: ${e.title}\n`;
    md += `* **Datum:** ${e.date || 'k. A.'}\n`;
    md += `* **Stunde / Fach:** ${e.lesson || e.subject || 'Allgemein'}\n`;
    md += `* **Stimmung:** ${e.mood || '-'}\n`;
    md += `* **Genutztes Modell:** ${e.model || 'KI'}\n\n`;

    if (e.content) md += `#### 📖 Tagebuch-Notiz:\n${e.content}\n\n`;
    if (e.task) md += `#### 🎯 Aufgabenstellung / Kontext:\n${e.task}\n\n`;
    if (e.prompt) md += `#### 💬 Verwendeter Prompt:\n> ${e.prompt.replace(/\n/g, '\n> ')}\n\n`;
    if (e.result) md += `#### 📊 Ergebnis & Beobachtung:\n${e.result}\n\n`;
    if (e.reflection && e.reflection !== e.content) md += `#### 🧠 Kritische Lernreflexion:\n${e.reflection}\n\n`;
    if (e.tags && e.tags.length > 0) md += `*Schlagwörter: ${e.tags.map(t => '#' + t).join(' ')}*\n\n`;
    md += `---\n\n`;
  });

  downloadTextFile(md, "tonda_tagebuch_seminarfach.md");
  showSfToast("Tagebuch als Markdown heruntergeladen! 📥");
}

function exportSfExposeTemplate() {
  const favTopicId = getSfFavoriteTopicId();
  const userIdeas = getSfUserThemen();
  const fav = SF_THEMEN.find(t => t.id === favTopicId) || userIdeas.find(i => i.id === favTopicId) || SF_THEMEN[0];

  const expose = `# Exposé zur Seminarfacharbeit
**Thema:** ${fav.title}
**Arbeitstitel:** ${fav.subtitle || fav.interest || ''}
**Bearbeiter:** Tonda Beutler (Jahrgang 12, IGS Göttingen)
**Kurs:** Abi28 sf4 (Lehrkraft: Herr Michael Jatzeck)
**Forschungsfrage:** ${fav.question || ''}

## 1. Problemaufriss & Relevanz
Immer mehr Schüler nutzen generative Sprachmodelle rein zur bequemen Lösungsauslagerung (Cognitive Offloading). 
Hierbei entsteht das trügerische Gefühl des Scheinwissens, da der kognitive Eigenaufwand fehlt. 
Diese Arbeit untersucht, wie KI stattdessen als didaktischer Lernverstärker eingesetzt werden kann.

## 2. Arbeitshypothese
${fav.hypothesis || 'Durch gezieltes sokratisches Prompting verbessern sich die Problemlösekompetenzen nachhaltig.'}

## 3. Praxisteil / Eigenanteil an der Schule
${fav.practical || fav.notes || 'Experiment oder Umfrage an der IGS Göttingen.'}

## 4. Theoretische Bezugspunkte
${(fav.theories || ["Cognitive Load Theory (John Sweller)", "Active Recall", "Blooms 2-Sigma-Problem"]).map(t => `- ${t}`).join('\n')}
`;

  copySfText(expose);
  showSfToast("Exposé-Vorlage in Zwischenablage kopiert! 📋");
}

// --- 16. GENERAL UTILITIES ---
function copySfText(text, btnElement = null) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      showSfToast("In die Zwischenablage kopiert! 📋");
      if (btnElement) {
        const orig = btnElement.innerHTML;
        btnElement.innerHTML = "✅ Kopiert!";
        setTimeout(() => { btnElement.innerHTML = orig; }, 1800);
      }
    }).catch(() => fallbackCopy(text, btnElement));
  } else {
    fallbackCopy(text, btnElement);
  }
}

function fallbackCopy(text, btnElement = null) {
  const ta = document.createElement("textarea");
  ta.value = text;
  document.body.appendChild(ta);
  ta.select();
  document.execCommand("copy");
  document.body.removeChild(ta);
  showSfToast("In die Zwischenablage kopiert! 📋");
  if (btnElement) {
    const orig = btnElement.innerHTML;
    btnElement.innerHTML = "✅ Kopiert!";
    setTimeout(() => { btnElement.innerHTML = orig; }, 1800);
  }
}

function downloadTextFile(text, filename) {
  const blob = new Blob([text], { type: "text/markdown;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function getTodayGermanDate() {
  const d = new Date();
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}.${month}.${year}`;
}

function getTodayGermanFullDate() {
  const d = new Date();
  const days = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];
  const months = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
  return `${days[d.getDay()]}, ${d.getDate()}. ${months[d.getMonth()]} ${d.getFullYear()}`;
}

function getTodayDayName() {
  const d = new Date();
  const days = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];
  return days[d.getDay()];
}

function getTodayDayId() {
  const d = new Date();
  const map = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];
  const id = map[d.getDay()];
  if (id === 'So' || id === 'Sa') return 'Mo';
  return id;
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function showSfToast(msg) {
  let toast = document.getElementById('sfGlobalToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'sfGlobalToast';
    toast.className = 'sf-toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('visible');
  setTimeout(() => {
    toast.classList.remove('visible');
  }, 2400);
}

// Initializer
function initSeminarfachModule() {
  seedSeminarfachStarterDoc();
  const root = document.getElementById('seminarfachRoot');
  if (root) {
    renderSeminarfachView();
  }
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSeminarfachModule);
  } else {
    initSeminarfachModule();
  }
}
