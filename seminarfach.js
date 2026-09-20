// =========================================================================
// SEMINARFACH 4 (Abi28 sf4 • Herr Jatzeck) • KÜNSTLICHE INTELLIGENZ
// Interaktives Digitales Prozessjournal (Goodnotes- / Tagebuch-Stil)
// Leitmotiv: "Wie lernt man am besten mit KI?"
// Jahrgang 12 • IGS Göttingen (Tonda Beutler)
// =========================================================================

// --- 1. DEFAULT DATASET (ALLE PUNKTE AUS DER ISERV-AUFGABE ABGEDECKT) ---
const DEFAULT_SF_JOURNAL = [
  {
    id: "sf-j-1",
    num: "01",
    date: "26.08.2026",
    title: "Harald Lesch Video & Kritischer Kommentar",
    category: "Video-Analyse",
    subject: "Seminarfach 4 (Hr. Jatzeck)",
    model: "ZDF Terra X & Eigene Reflexion",
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
    title: "YLAB Arbeitsergebnisse & Erkenntnisse (Uni Göttingen)",
    category: "YLAB Workshop",
    subject: "Seminarfach 4 (Hr. Jatzeck)",
    model: "YLAB Arbeitsblätter (Wolke)",
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
    title: "Schulumfrage zur KI-Nutzung & Kommentar",
    category: "Empirie & Umfrage",
    subject: "Seminarfach 4 (Hr. Jatzeck)",
    model: "Schulweite Umfrage (IServ)",
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
    title: "Erste Ergebnisse der Themensuche & Forschungsfragen",
    category: "Themensuche",
    subject: "Seminarfach 4 (Hr. Jatzeck)",
    model: "Gemini Pro & Claude 3.5",
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
    title: "Literatursichtung & Vorbereitung SUB-Ausweis",
    category: "Literatur & SUB",
    subject: "Seminarfach 4 (Hr. Jatzeck)",
    model: "SUB Göttingen & Google Scholar",
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
    title: "KI-Tagesgeschehen & Aktuelle Entwicklungen",
    category: "KI-News",
    subject: "Seminarfach 4 (Hr. Jatzeck)",
    model: "OpenAI o1 / Tech-Nachrichten",
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
    title: "Praxis-Experiment: Sokratischer Tutor in Physik & Informatik",
    category: "Prompt-Experiment",
    subject: "Physik eA & Informatik eA",
    model: "ChatGPT-4o vs. Claude 3.5 Sonnet",
    task: "Eigener Härtetest zweier Lernmethoden: Passive Musterlösung vs. sokratischer Dialog am Beispiel des Coulomb-Gesetzes (Physik eA) und von Insertion Sort (Informatik eA).",
    prompt: "Du bist mein persönlicher MINT-Tutor für die gymnasiale Oberstufe. Verrate mir NICHT sofort die Lösung! Stelle mir stattdessen gezielte Leitfragen, damit ich Schritt für Schritt selbst auf die Formel und den Rechenweg komme.",
    result: "Erstaunlicher Lerneffekt: Die KI fragte gezielt: 'Welche Kräfte stehen am Fadenpendel im Kräftegleichgewicht?' Ich musste F_G und F_C selbst herleiten und den Tangens anwenden, anstatt nur passiv mitzulesen.",
    reflection: "Fazit:\nSokratisches Prompting verhindert die 'Illusion of Competence'. Ich habe den Stoff nicht nur für die Hausaufgabe gelöst, sondern für die Klausur im Kopf verankert. Das ist der exakte Beweis für meine Seminarfachthese.",
    tags: ["Sokratischer Mentor", "Physik eA", "Informatik eA", "Active Recall"]
  }
];

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

// --- 2. LOCAL STORAGE CONTROLLER ---
const SF_STORAGE_KEY = "tonda_seminarfach_journal_v3_jatzeck";
const SF_FAV_TOPIC_KEY = "tonda_seminarfach_favorite_topic";

function getSfJournalEntries() {
  try {
    const raw = localStorage.getItem(SF_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
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

function getSfFavoriteTopicId() {
  return localStorage.getItem(SF_FAV_TOPIC_KEY) || "sf-t-1";
}

function setSfFavoriteTopicId(topicId) {
  localStorage.setItem(SF_FAV_TOPIC_KEY, topicId);
}

// Current active sub-tab: 'journal' | 'mitschriften' | 'themen' | 'prompts' | 'tools'
let currentSfTab = 'journal';
let currentSfCategoryFilter = 'Alle';
let currentSfSearchQuery = '';
let currentNotebookActiveEntryId = null;

// Seed default Seminarfach guideline document in userDB if not yet present
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

// --- 3. MAIN SEMINARFACH VIEW RENDERER (CLEAN & MINIMALIST DESIGN) ---
function renderSeminarfachView() {
  const container = document.getElementById('seminarfachRoot');
  if (!container) return;

  const entries = getSfJournalEntries();
  const favTopicId = getSfFavoriteTopicId();
  const favTopic = SF_THEMEN.find(t => t.id === favTopicId) || SF_THEMEN[0];

  container.innerHTML = `
    <!-- Top Action Bar -->
    <div class="sf-topbar">
      <div class="sf-topbar-left">
        <span class="sf-badge-pill sf-badge-purple">📘 Seminarfach 4</span>
        <span class="sf-badge-pill sf-badge-neutral">Abi28 sf4 &bull; Hr. Jatzeck</span>
        <span class="sf-badge-pill sf-badge-amber">⏰ Abgabe: Heute 09:59 Uhr</span>
      </div>
      <div class="sf-topbar-right">
        <button class="sf-btn sf-btn-pdf" onclick="exportSfJournalPDF()" title="Erstellt das druckfertige PDF für die IServ-Abgabe">
          📄 Als PDF exportieren
        </button>
        <button class="sf-btn sf-btn-secondary" onclick="triggerSfUploadModal()" title="Mitschrift, Foto oder Datei hochladen">
          📤 Mitschrift einfügen
        </button>
        <button class="sf-btn sf-btn-primary" onclick="openSfNewEntryModal()">
          ➕ Neuer Eintrag
        </button>
        <button class="sf-btn sf-btn-ghost" onclick="resetSfJournalDefaults()" title="Standard-Einträge wiederherstellen">
          🔄 Reset
        </button>
      </div>
    </div>

    <!-- Main Clean Journal Card -->
    <div class="sf-journal-card">
      
      <!-- Journal Header -->
      <div class="sf-journal-header">
        <div class="sf-journal-super">IGS GÖTTINGEN &bull; GYMNASIALE OBERSTUFE JAHRGANG 12</div>
        <h1 class="sf-journal-title">📔 Prozessjournal: Künstliche Intelligenz</h1>
        <div class="sf-journal-meta">
          <span>👤 <strong>Tonda Beutler</strong></span>
          <span>👨‍🏫 <strong>Hr. Michael Jatzeck (sf4)</strong></span>
          <span>🎯 Leitfrage: <em>„Wie lernt man am besten mit KI?“</em></span>
          <span>📅 Stand: <strong>${getTodayGermanDate()}</strong></span>
        </div>

        <div class="sf-stats-strip">
          <div class="sf-stat-pill" onclick="switchSfTab('journal')">
            <strong>${entries.length}</strong> Einträge (vollständig)
          </div>
          <div class="sf-stat-pill" onclick="switchSfTab('mitschriften')">
            <strong id="sfDocCountBadge">📁 Dokumente</strong>
          </div>
          <div class="sf-stat-pill" onclick="switchSfTab('themen')">
            <strong>${favTopic.title}</strong> (Favorit)
          </div>
        </div>
      </div>

      <!-- Segmented Navigation Tabs -->
      <div class="sf-tabs-bar">
        <button class="sf-tab-btn ${currentSfTab === 'journal' ? 'active' : ''}" onclick="switchSfTab('journal')">
          📖 Journal (${entries.length})
        </button>
        <button class="sf-tab-btn ${currentSfTab === 'mitschriften' ? 'active' : ''}" onclick="switchSfTab('mitschriften')">
          📁 Mitschriften &amp; Dateien
        </button>
        <button class="sf-tab-btn ${currentSfTab === 'themen' ? 'active' : ''}" onclick="switchSfTab('themen')">
          💡 Themenfindung (${SF_THEMEN.length})
        </button>
        <button class="sf-tab-btn ${currentSfTab === 'prompts' ? 'active' : ''}" onclick="switchSfTab('prompts')">
          🧪 Prompt-Studio
        </button>
        <button class="sf-tab-btn ${currentSfTab === 'tools' ? 'active' : ''}" onclick="switchSfTab('tools')">
          📊 Modellvergleich
        </button>
      </div>

      <!-- Active Tab Body -->
      <div id="sfTabContent" class="sf-tab-content-body"></div>

    </div>
  `;

  renderCurrentSfSubTab();
  updateSfDocBadgeCount();
}

function switchSfTab(tabName) {
  currentSfTab = tabName;
  document.querySelectorAll('.sf-tab-btn, .sf-nb-tab').forEach(btn => {
    btn.classList.remove('active');
  });
  const activeBtn = document.querySelector(`.sf-tab-btn[onclick*="${tabName}"], .sf-nb-tab[onclick*="${tabName}"]`);
  if (activeBtn) activeBtn.classList.add('active');

  renderCurrentSfSubTab();
}

function renderCurrentSfSubTab() {
  const container = document.getElementById('sfTabContent');
  if (!container) return;

  if (currentSfTab === 'journal') {
    renderSfJournalView(container);
  } else if (currentSfTab === 'mitschriften') {
    renderSfMitschriftenView(container);
  } else if (currentSfTab === 'themen') {
    renderSfThemenView(container);
  } else if (currentSfTab === 'prompts') {
    renderSfPromptsView(container);
  } else if (currentSfTab === 'tools') {
    renderSfToolsView(container);
  }
}

// Helper to update doc count in header
async function updateSfDocBadgeCount() {
  if (typeof userDB !== 'undefined' && userDB) {
    try {
      const docs = await userDB.getDocumentsByFach('seminarfach');
      const badge = document.getElementById('sfDocCountBadge');
      if (badge) badge.textContent = `${docs.length} Dokumente`;
    } catch (e) {}
  }
}

// Helper to open upload modal for seminarfach
function triggerSfUploadModal() {
  if (typeof openUploadModal === 'function') {
    openUploadModal('seminarfach', 'mitschrift');
  } else {
    alert("Das Dokumenten-Upload-Modul wird geladen... Bitte versuche es in wenigen Sekunden erneut.");
  }
}

// --- 4. SUB-TAB 1: JOURNAL & TAGEBUCH-SEITEN ---
function renderSfJournalView(container) {
  const allEntries = getSfJournalEntries();
  const categories = ['Alle', 'Video-Analyse', 'YLAB Workshop', 'Empirie & Umfrage', 'Themensuche', 'Literatur & SUB', 'KI-News', 'Prompt-Experiment'];

  // Filter entries
  let filtered = allEntries.filter(entry => {
    const matchesCat = (currentSfCategoryFilter === 'Alle') || (entry.category === currentSfCategoryFilter);
    const q = currentSfSearchQuery.toLowerCase().trim();
    const matchesQuery = !q ||
      (entry.title && entry.title.toLowerCase().includes(q)) ||
      (entry.task && entry.task.toLowerCase().includes(q)) ||
      (entry.prompt && entry.prompt.toLowerCase().includes(q)) ||
      (entry.reflection && entry.reflection.toLowerCase().includes(q)) ||
      (entry.subject && entry.subject.toLowerCase().includes(q)) ||
      (entry.tags && entry.tags.some(t => t.toLowerCase().includes(q)));
    return matchesCat && matchesQuery;
  });

  let filterChipsHtml = categories.map(cat => `
    <button class="sf-filter-chip ${currentSfCategoryFilter === cat ? 'active' : ''}" onclick="setSfCategoryFilter('${cat}')">
      ${cat}
    </button>
  `).join('');

  let entriesCardsHtml = '';
  if (filtered.length === 0) {
    entriesCardsHtml = `
      <div class="sf-empty-state">
        <div class="sf-empty-icon">🔍</div>
        <h3>Keine Journaleinträge gefunden</h3>
        <p>Passe den Suchbegriff an oder erstelle einen neuen Eintrag für dein Seminarfach.</p>
        <button class="sf-btn-primary" onclick="openSfNewEntryModal()" style="margin-top: 1rem;">
          ➕ Ersten Eintrag anlegen
        </button>
      </div>
    `;
  } else {
    entriesCardsHtml = filtered.map((e, idx) => {
      const tagsHtml = (e.tags || []).map(t => `<span class="sf-entry-tag">#${t}</span>`).join(' ');
      return `
        <div class="sf-journal-page-entry" id="entry-${e.id}">
          
          <!-- Page Entry Header Ribbon -->
          <div class="sf-page-entry-header">
            <div class="sf-entry-num-stamp">Eintrag ${e.num || (idx + 1)}</div>
            <div class="sf-entry-meta-right">
              <span class="sf-entry-date">📅 ${e.date || 'Ohne Datum'}</span>
              <span class="sf-entry-badge-cat sf-badge-${getCategoryColorClass(e.category)}">${e.category || 'Journal'}</span>
              <span class="sf-entry-model">🤖 ${e.model || 'KI'}</span>
              <div class="sf-entry-actions">
                <button class="sf-icon-btn" onclick="openSfEditEntryModal('${e.id}')" title="Eintrag bearbeiten">✏️</button>
                <button class="sf-icon-btn" onclick="deleteSfEntry('${e.id}')" title="Eintrag löschen">🗑️</button>
              </div>
            </div>
          </div>

          <!-- Handwritten style Title -->
          <h2 class="sf-page-entry-title">${escapeHtml(e.title)}</h2>

          ${e.task ? `
            <div class="sf-entry-section">
              <div class="sf-section-label">🎯 Aufgabenstellung &amp; Unterrichtskontext:</div>
              <p class="sf-section-text">${escapeHtml(e.task)}</p>
            </div>
          ` : ''}

          ${e.prompt ? `
            <div class="sf-entry-section sf-prompt-box">
              <div class="sf-prompt-head">
                <span class="sf-section-label">💬 Verwendeter Prompt / Fragestellung:</span>
                <button class="sf-btn-copy-prompt" onclick="copySfEntryPrompt('${e.id}', this)">
                  📋 Kopieren
                </button>
              </div>
              <pre class="sf-prompt-code">${escapeHtml(e.prompt)}</pre>
            </div>
          ` : ''}

          ${e.result ? `
            <div class="sf-entry-section">
              <div class="sf-section-label">📊 Beobachtung &amp; Arbeitsergebnis:</div>
              <p class="sf-section-text">${escapeHtml(e.result)}</p>
            </div>
          ` : ''}

          <!-- Kritische Reflexion & Lerneffekt (Herzstück der Benotung) -->
          ${e.reflection ? `
            <div class="sf-reflection-card">
              <div class="sf-reflection-head">
                <span class="sf-reflection-icon">🧠</span>
                <div>
                  <strong>Kritischer Kommentar &amp; Lernreflexion (Herr Jatzeck Kriterium)</strong>
                  <div class="sf-reflection-sub">Erkenntnisgewinn, Cognitive Offloading &amp; Relevanz für die Seminararbeit</div>
                </div>
              </div>
              <div class="sf-reflection-body">
                ${escapeHtml(e.reflection).replace(/\n/g, '<br>')}
              </div>
            </div>
          ` : ''}

          ${tagsHtml ? `<div class="sf-entry-footer-tags">${tagsHtml}</div>` : ''}
        </div>
      `;
    }).join('');
  }

  container.innerHTML = `
    <!-- Top Filter Bar -->
    <div class="sf-toolbar">
      <div class="sf-filter-chips-list">
        ${filterChipsHtml}
      </div>
      <div class="sf-search-box">
        <span class="sf-search-icon">🔍</span>
        <input type="text" class="sf-search-input" placeholder="Tagebuch durchsuchen (Lesch, YLAB, Umfrage, Themensuche)..." 
               value="${escapeHtml(currentSfSearchQuery)}" oninput="setSfSearchQuery(this.value)">
        ${currentSfSearchQuery ? `<button class="sf-search-clear" onclick="setSfSearchQuery('')">&times;</button>` : ''}
      </div>
    </div>

    <!-- Notebook Entries Sheet -->
    <div class="sf-entries-list">
      ${entriesCardsHtml}
    </div>
  `;
}

function setSfCategoryFilter(cat) {
  currentSfCategoryFilter = cat;
  renderCurrentSfSubTab();
}

function setSfSearchQuery(val) {
  currentSfSearchQuery = val;
  renderCurrentSfSubTab();
}

function getCategoryColorClass(cat) {
  if (cat.includes('Video') || cat.includes('Lesch')) return 'amber';
  if (cat.includes('YLAB')) return 'cyan';
  if (cat.includes('Umfrage') || cat.includes('Empirie')) return 'purple';
  if (cat.includes('Themen')) return 'emerald';
  if (cat.includes('Literatur') || cat.includes('SUB')) return 'rose';
  if (cat.includes('News')) return 'blue';
  return 'neutral';
}

function copySfEntryPrompt(entryId, btnElement) {
  const entries = getSfJournalEntries();
  const entry = entries.find(e => e.id === entryId);
  if (entry && entry.prompt) {
    copySfText(entry.prompt, btnElement);
  }
}

// --- 5. SUB-TAB 2: MITSCHRIFTEN & DOKUMENTE ---
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

// --- 6. SUB-TAB 3: THEMENIDEEN FÜR DIE SEMINARFACHARBEIT ---
function renderSfThemenView(container) {
  const favTopicId = getSfFavoriteTopicId();

  let topicsHtml = SF_THEMEN.map(t => {
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
    <div class="sf-themen-intro">
      <div class="sf-themen-intro-text">
        <h2>💡 Themenkonzeption: „Wie lernt man am besten mit KI?“</h2>
        <p>
          Für eine herausragende Note im Seminarfach muss die Arbeit eine <strong>präzise Forschungsfrage</strong>, 
          ein <strong>solides wissenschaftliches Fundament (Kognitionspsychologie/Didaktik)</strong> und einen 
          <strong>greifbaren praktischen Eigenanteil</strong> (Experiment, Umfrage oder Leitfaden-Evaluation an unserer Schule) aufweisen.
        </p>
      </div>
      <button class="sf-btn-secondary" onclick="exportSfExposeTemplate()">
        📄 Exposé-Vorlage kopieren
      </button>
    </div>

    <div class="sf-themen-grid">
      ${topicsHtml}
    </div>

    <!-- Theoretical Guide Accordion -->
    <div class="sf-theory-reference-box">
      <h3>🧠 Wissenschaftlicher Theorie-Spickzettel für das Seminarfach</h3>
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

// --- 7. SUB-TAB 4: PROMPT-STUDIO & TUTOREN-VORLAGEN ---
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

// --- 8. SUB-TAB 5: KI-MODELLVERGLEICH ---
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

// --- 9. MODAL: ENTRY CREATION & EDITING ---
let CURRENT_SF_EDIT_ID = null;

function openSfNewEntryModal() {
  CURRENT_SF_EDIT_ID = null;
  const modal = document.getElementById('sfEntryModal');
  if (!modal) return;

  document.getElementById('sfModalTitle').textContent = "➕ Neuer Journal-Eintrag";
  document.getElementById('sfFormTitle').value = "";
  document.getElementById('sfFormDate').value = getTodayGermanDate();
  document.getElementById('sfFormCategory').value = "Prompt-Experiment";
  document.getElementById('sfFormSubject').value = "Seminarfach 4 (Hr. Jatzeck)";
  document.getElementById('sfFormModel').value = "ChatGPT (GPT-4o)";
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
  document.getElementById('sfFormCategory').value = entry.category || "Prompt-Experiment";
  document.getElementById('sfFormSubject').value = entry.subject || "";
  document.getElementById('sfFormModel').value = entry.model || "";
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
    alert("Bitte gib einen Titel für den Eintrag an!");
    return;
  }

  const date = document.getElementById('sfFormDate').value.trim() || getTodayGermanDate();
  const category = document.getElementById('sfFormCategory').value;
  const subject = document.getElementById('sfFormSubject').value.trim();
  const model = document.getElementById('sfFormModel').value.trim();
  const task = document.getElementById('sfFormTask').value.trim();
  const prompt = document.getElementById('sfFormPrompt').value.trim();
  const result = document.getElementById('sfFormResult').value.trim();
  const reflection = document.getElementById('sfFormReflection').value.trim();
  const rawTags = document.getElementById('sfFormTags').value.trim();
  const tags = rawTags ? rawTags.split(',').map(t => t.trim().replace(/^#/, '')).filter(Boolean) : [];

  let entries = getSfJournalEntries();

  if (CURRENT_SF_EDIT_ID) {
    const idx = entries.findIndex(e => e.id === CURRENT_SF_EDIT_ID);
    if (idx !== -1) {
      entries[idx] = {
        ...entries[idx],
        title, date, category, subject, model, task, prompt, result, reflection, tags
      };
    }
    showSfToast("Eintrag erfolgreich aktualisiert! ✅");
  } else {
    const newEntry = {
      id: "sf-j-" + Date.now(),
      num: String(entries.length + 1).padStart(2, '0'),
      date, category, subject, model, title, task, prompt, result, reflection, tags
    };
    entries.push(newEntry);
    showSfToast("Neuer Eintrag im Journal gespeichert! 📝");
  }

  saveSfJournalEntries(entries);
  closeSfEntryModal();
  renderSeminarfachView();
}

function deleteSfEntry(id) {
  if (!confirm("Möchtest du diesen Journaleintrag wirklich löschen?")) return;

  let entries = getSfJournalEntries();
  entries = entries.filter(e => e.id !== id);
  saveSfJournalEntries(entries);
  renderSeminarfachView();
  showSfToast("Eintrag gelöscht 🗑️");
}

function resetSfJournalDefaults() {
  if (!confirm("Möchtest du das Journal auf die 7 offiziellen Einträge (Lesch, YLAB, Umfrage, Themensuche etc.) zurücksetzen?")) return;
  saveSfJournalEntries(DEFAULT_SF_JOURNAL);
  renderSeminarfachView();
  showSfToast("Journal auf Standard zurückgesetzt 🔄");
}

// --- 10. PDF-EXPORT FÜR ISERV (GOODNOTES-STIL) ---
function exportSfJournalPDF() {
  const entries = getSfJournalEntries();
  const favTopicId = getSfFavoriteTopicId();
  const favTopic = SF_THEMEN.find(t => t.id === favTopicId) || SF_THEMEN[0];

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
          line-height: 1.5;
          margin: 0;
          padding: 1.2rem;
          font-size: 10pt;
          background: #ffffff;
        }
        .header-box {
          border: 2px solid #2563eb;
          border-radius: 8px;
          padding: 1.2rem 1.4rem;
          margin-bottom: 1.4rem;
          background: #f8faff;
        }
        .header-title {
          font-size: 17pt;
          font-weight: 800;
          color: #1e3a8a;
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
          background: #faf5ff;
          border-left: 4px solid #8b5cf6;
          border-radius: 4px;
          padding: 0.8rem 1rem;
          margin-bottom: 1.5rem;
        }
        .entry-card {
          border: 1px solid #d1d5db;
          border-radius: 6px;
          padding: 1rem 1.2rem;
          margin-bottom: 1.2rem;
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
          margin: 0 0 0.4rem 0;
          color: #111827;
        }
        .section-label {
          font-size: 7.8pt;
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
          background: #2563eb;
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
        <span>📄 <strong>IServ-Abgabe Druckansicht:</strong> Klicke rechts auf Drucken und wähle als Ziel <em>„Als PDF speichern“</em>.</span>
        <button class="btn-print" onclick="window.print()">🖨️ Jetzt als PDF drucken / speichern</button>
      </div>

      <div class="header-box">
        <h1 class="header-title">🎓 Prozessjournal &bull; Seminarfach 4 (Künstliche Intelligenz)</h1>
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
        <span style="font-size: 11pt; font-weight: bold; color: #7e22ce;">${favTopic.title}</span><br>
        <em>${favTopic.subtitle}</em><br>
        <div style="margin-top: 0.3rem; font-size: 8.8pt;"><strong>Forschungsfrage:</strong> ${favTopic.question}</div>
      </div>

      <h2 style="font-size: 11pt; text-transform: uppercase; color: #374151; border-bottom: 2px solid #e5e7eb; padding-bottom: 0.25rem; margin-top: 1.2rem;">
        Fortlaufende Journaleinträge (${entries.length} Stunden dokumentiert)
      </h2>
  `;

  entries.forEach((e, idx) => {
    printHtml += `
      <div class="entry-card">
        <div class="entry-header">
          <span>📅 Datum: ${e.date || '-'} &bull; Kategorie: ${e.category}</span>
          <span>Eintrag ${e.num || (idx + 1)} &bull; ${e.model}</span>
        </div>
        <div class="entry-title">${escapeHtml(e.title)}</div>

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

        ${e.reflection ? `
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
    showSfToast("PDF-Druckansicht in neuem Tab geöffnet! 📄");
  } else {
    window.print();
  }
}

// --- 11. EXPORTS & HELPERS ---
function exportSfJournalMarkdown() {
  const entries = getSfJournalEntries();
  let md = `# 📔 Prozessjournal: Seminarfach 4 (Künstliche Intelligenz)\n`;
  md += `> **Autor:** Tonda Beutler • Jahrgang 12 • IGS Göttingen\n`;
  md += `> **Kurs:** Abi28 sf4 (Herr Michael Jatzeck)\n`;
  md += `> **Leitfrage:** Wie lernt man am besten mit KI?\n\n---\n\n`;

  entries.forEach((e) => {
    md += `### Eintrag ${e.num || ''}: ${e.title}\n`;
    md += `* **Datum:** ${e.date || 'k. A.'}\n`;
    md += `* **Kategorie:** ${e.category || 'Allgemein'}\n`;
    md += `* **Fach:** ${e.subject || 'Allgemein'}\n`;
    md += `* **Genutztes Modell:** ${e.model || 'KI'}\n\n`;

    if (e.task) md += `#### 🎯 Aufgabenstellung / Kontext:\n${e.task}\n\n`;
    if (e.prompt) md += `#### 💬 Verwendeter Prompt:\n> ${e.prompt.replace(/\n/g, '\n> ')}\n\n`;
    if (e.result) md += `#### 📊 Ergebnis & Beobachtung:\n${e.result}\n\n`;
    if (e.reflection) md += `#### 🧠 Kritische Lernreflexion:\n${e.reflection}\n\n`;
    if (e.tags && e.tags.length > 0) md += `*Schlagwörter: ${e.tags.map(t => '#' + t).join(' ')}*\n\n`;
    md += `---\n\n`;
  });

  downloadTextFile(md, "tonda_seminarfach4_journal.md");
  showSfToast("Journal als Markdown heruntergeladen! 📥");
}

function exportSfExposeTemplate() {
  const favTopicId = getSfFavoriteTopicId();
  const fav = SF_THEMEN.find(t => t.id === favTopicId) || SF_THEMEN[0];

  const expose = `# Exposé zur Seminarfacharbeit
**Thema:** ${fav.title}
**Arbeitstitel:** ${fav.subtitle}
**Bearbeiter:** Tonda Beutler (Jahrgang 12, IGS Göttingen)
**Kurs:** Abi28 sf4 (Lehrkraft: Herr Michael Jatzeck)
**Forschungsfrage:** ${fav.question}

## 1. Problemaufriss & Relevanz
Immer mehr Schüler nutzen generative Sprachmodelle rein zur bequemen Lösungsauslagerung (Cognitive Offloading). 
Hierbei entsteht das trügerische Gefühl des Scheinwissens, da der kognitive Eigenaufwand fehlt. 
Diese Arbeit untersucht, wie KI stattdessen als didaktischer Lernverstärker eingesetzt werden kann.

## 2. Arbeitshypothese
${fav.hypothesis}

## 3. Praxisteil / Eigenanteil an der Schule
${fav.practical}

## 4. Theoretische Bezugspunkte
${fav.theories.map(t => `- ${t}`).join('\n')}
`;

  copySfText(expose);
  showSfToast("Exposé-Vorlage in Zwischenablage kopiert! 📋");
}

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

// --- 12. AUTOMATISCHE INITIALISIERUNG ---
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
