// =========================================================================
// SEMINARFACH: KÜNSTLICHE INTELLIGENZ & PROZESSJOURNAL
// Leitmotiv: "Wie lernt man am besten mit KI?"
// Jahrgang 12 • Gymnasiale Oberstufe (Tonda Beutler)
// =========================================================================

// --- 1. DEFAULT DATASETS ---
const DEFAULT_SF_JOURNAL = [
  {
    id: "sf-j-1",
    date: "21.09.2026",
    category: "Lernreflexion",
    model: "ChatGPT-4o & Claude 3.5",
    subject: "Allgemein & Informatik eA",
    title: "Bestandsaufnahme: Wie nutze ich KI bisher im Schulalltag?",
    task: "Kritische Analyse des bisherigen Nutzungsverhaltens in verschiedenen Fächern (Informatik, Physik, Hausaufgaben) zur Vorbereitung der Seminarfacharbeit.",
    prompt: "Erstelle eine strukturierte Übersicht typischer Use-Cases von generativer KI in der Sekundarstufe II. Kategorisiere nach: 1. Reine Zeitersparnis, 2. Kognitive Unterstützung, 3. Gefahren für das Klausurwissen.",
    result: "Sehr aufschlussreiche Aufteilung. Besonders deutlich wird die Kluft zwischen passiver Lösungsübernahme (Scheinverständnis) und echter kognitiver Vertiefung.",
    reflection: "Gefahr des Scheinverständnisses (Illusion of Knowledge): Wenn ich mir von der KI einfach eine fertige Lösung generieren lasse, wirkt jeder Schritt beim Lesen absolut logisch. In einer Klausur ohne Hilfsmittel fehlt mir jedoch der Abrufpfad im Gehirn. Das muss das Kernthema meiner Seminarfacharbeit werden: Wie nutze ich KI so, dass mein Gehirn gefordert statt ersetzt wird?",
    tags: ["Status Quo", "Cognitive Offloading", "Illusion of Knowledge"]
  },
  {
    id: "sf-j-2",
    date: "21.09.2026",
    category: "Prompt-Experiment",
    model: "GPT-4o vs. Claude 3.5 Sonnet",
    subject: "Physik eA (Elektrostatik / Coulomb)",
    title: "Experiment: Sokratischer Tutor vs. Reine Lösungsausgabe",
    task: "Vergleich zweier Prompting-Strategien bei einer komplexen physikalischen Aufgabe (Coulomb-Gesetz mit Vektoraddition am Fadenpendel).",
    prompt: "Du bist mein persönlicher Physik-Tutor für die gymnasiale Oberstufe. Gib mir NICHT sofort das Ergebnis oder die Rechnung! Stelle mir stattdessen gezielte Leitfragen, damit ich Schritt für Schritt selbst auf das Kräftedreieck und die Formel komme. Wenn ich falsch liege, korrigiere mich nicht sofort, sondern gib mir einen Denkanstoß.",
    result: "Erstaunlicher didaktischer Unterschied: Anstatt eine 10-zeilige Rechnung auszuspucken, fragte die KI: 'Welche physikalischen Kräfte greifen an der ausgelenkten Kugel im statischen Gleichgewicht an?' Ich musste erst F_G und F_C identifizieren und den Tangens anwenden. Erst danach ging es weiter.",
    reflection: "Sokratisches Prompting zwingt das Gehirn in den aktiven Denkmodus (Active Retrieval). Der Behaltenswert war um ein Vielfaches höher als beim passiven Konsum einer Musterlösung. Diese Methode eignet sich hervorragend als Kernstück für mein empirisches Seminarfach-Experiment!",
    tags: ["Sokratischer Dialog", "Physik eA", "Active Recall", "Prompt-Design"]
  },
  {
    id: "sf-j-3",
    date: "21.09.2026",
    category: "Themenfindung",
    model: "Gemini Pro & Perplexity",
    subject: "Seminarfacharbeit",
    title: "Forschungsfragen-Brainstorming: „Wie lernt man am besten mit KI?“",
    task: "Entwicklung von 5 wissenschaftlich fundierten Themenansätzen für die Seminarfacharbeit mit hohem empirischen Eigenanteil.",
    prompt: "Entwickle für eine gymnasiale Seminarfacharbeit (Jahrgang 12) innovative Forschungsfragen zum Thema 'Effektives Lernen mit generativer KI'. Verbinde kognitionspsychologische Modelle (Bloom, Sweller) mit einem konkreten schulischen Praxisexperiment.",
    result: "Fünf starke Themencluster ausgearbeitet: 1. Sokratischer Tutor, 2. Cognitive Offloading im Unterricht, 3. Schüler-Lernleitfaden, 4. Blooms 2-Sigma-Problem mit LLMs, 5. Schulweite empirische Erhebung.",
    reflection: "Favorit für die Seminarfacharbeit: Thema 1 (Der sokratische Tutor) oder Thema 3 (Entwicklung eines KI-Lernframeworks für Schüler). Beide kombinieren fundierte Lerntheorie mit einem praktischen Test an unserer Schule.",
    tags: ["Forschungsfragen", "Bloom 2-Sigma", "Themenfindung"]
  },
  {
    id: "sf-j-4",
    date: "21.09.2026",
    category: "Modellvergleich",
    model: "OpenAI o1 vs. GPT-4o",
    subject: "Mathematik eA & Physik eA",
    title: "Reasoning-Modelle im Härtetest: Mathematische Herleitungen & Einheiten",
    task: "Prüfung, wie gut Reasoning-Modelle (o1) im Vergleich zu Standard-LLMs (GPT-4o) mit Einheitenumrechnungen (Mikrocoulomb, Zentimeter) umgehen.",
    prompt: "Berechne die elektrische Feldstärke E im Abstand von 3 cm von einer Punktladung Q = 4 nC im Vakuum. Zeige jeden Einheitenumrechnungsschritt präzise mit Zehnerpotenzen.",
    result: "GPT-4o unterlief im ersten Schritt ein Vorzeichenfehler beim Quadrieren von 3*10^-2 m. OpenAI o1 durchlief eine 14-sekündige Denkphase ('Thinking Chain') und lieferte eine absolut fehlerfreie, didaktisch saubere Rechnung.",
    reflection: "Schüler müssen lernen: Nicht jede KI eignet sich für jedes Fach! Für Textanalysen genügt ein Standardmodell; für MINT-Klausurvorbereitung sind Modelle mit Reasoning (o1 / Sonnet) unerlässlich, um fatale Rechenfehler zu vermeiden.",
    tags: ["Reasoning Models", "MINT", "Fehleranalyse"]
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

// --- 2. LOCAL STORAGE & DATA ACCESS ---
const SF_STORAGE_KEY = "tonda_seminarfach_journal_v2";
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
          title: 'Seminarfach-Vorgaben: Prozessjournal & Eigenanteil',
          category: 'mitschrift',
          notes: 'Offizielle Schwerpunkte für das Seminarfach (Jahrgang 12):\n1. Fortlaufende Dokumentation im Prozessjournal (mindestens alle 1-2 Wochen ein Eintrag).\n2. Präzise formulierte Forschungsfrage (Leitmotiv: Wie lernt man am besten mit KI?).\n3. Empirischer/praktischer Eigenanteil zwingend erforderlich (z. B. Lernexperiment mit Mitschülern, Prompt-Evaluation oder Schulumfrage).\n4. Kritische Selbstreflexion über Cognitive Offloading und Vermeidung von Pseudowissen.',
          fileName: null,
          fileType: 'text/plain',
          fileSize: 520,
          fileData: null,
          createdAt: new Date().toISOString()
        });
      }
    } catch (e) {
      console.warn("Could not seed starter doc for seminarfach:", e);
    }
  }
}

// --- 3. MAIN SEMINARFACH VIEW RENDERER ---
function renderSeminarfachView() {
  const container = document.getElementById('seminarfachRoot');
  if (!container) return;

  const entries = getSfJournalEntries();
  const favTopicId = getSfFavoriteTopicId();
  const favTopic = SF_THEMEN.find(t => t.id === favTopicId) || SF_THEMEN[0];

  container.innerHTML = `
    <!-- Top Hero Section -->
    <div class="sf-hero-card">
      <div class="sf-hero-content">
        <div class="sf-badge-row">
          <span class="sf-badge-pill sf-badge-purple">🤖 Seminarfach: Künstliche Intelligenz</span>
          <span class="sf-badge-pill sf-badge-neutral">Jahrgang 12 &bull; 2026/2027</span>
          <span class="sf-badge-pill sf-badge-emerald">Leitmotiv: „Wie lernt man am besten mit KI?“</span>
        </div>
        <h1 class="sf-hero-title">Prozessjournal &amp; Forschungstagebuch</h1>
        <p class="sf-hero-subtitle">
          Dokumentation von Prompt-Experimenten, Reflexionen über kognitives Lernen, Mitschriften und Konzeption der Seminarfacharbeit.
        </p>

        <!-- Quick Stats Grid -->
        <div class="sf-stats-grid">
          <div class="sf-stat-box" onclick="switchSfTab('journal')" style="cursor: pointer;">
            <div class="sf-stat-num">${entries.length}</div>
            <div class="sf-stat-label">📔 Journal-Einträge</div>
          </div>
          <div class="sf-stat-box" onclick="switchSfTab('mitschriften')" style="cursor: pointer;">
            <div class="sf-stat-num" id="sfDocCountBadge">📁</div>
            <div class="sf-stat-label">📝 Mitschriften &amp; Dateien</div>
          </div>
          <div class="sf-stat-box" onclick="switchSfTab('themen')" style="cursor: pointer;">
            <div class="sf-stat-num">${SF_THEMEN.length}</div>
            <div class="sf-stat-label">💡 Forschungsansätze</div>
          </div>
          <div class="sf-stat-box" onclick="switchSfTab('themen')" style="cursor: pointer;">
            <div class="sf-stat-label-small">Favorit Seminararbeit:</div>
            <div class="sf-stat-title-highlight">${favTopic.title}</div>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="sf-hero-actions">
        <button class="sf-btn-primary" onclick="openSfNewEntryModal()">
          <span>➕</span> Neuer Journal-Eintrag
        </button>
        <button class="sf-btn-upload" onclick="triggerSfUploadModal()">
          <span>📤</span> Mitschrift / Datei einfügen
        </button>
        <button class="sf-btn-pdf" onclick="exportSfJournalPDF()">
          <span>📄</span> Als PDF exportieren / Drucken
        </button>
        <button class="sf-btn-secondary" onclick="exportSfJournalMarkdown()">
          <span>📥</span> Als Markdown
        </button>
        <button class="sf-btn-outline" onclick="resetSfJournalDefaults()" title="Standard-Einträge wiederherstellen">
          <span>🔄</span> Reset
        </button>
      </div>
    </div>

    <!-- Sub-Navigation Segmented Tabs -->
    <div class="sf-subnav-bar">
      <button class="sf-subnav-btn ${currentSfTab === 'journal' ? 'active' : ''}" onclick="switchSfTab('journal')">
        📔 Prozessjournal &amp; Chronik (${entries.length})
      </button>
      <button class="sf-subnav-btn ${currentSfTab === 'mitschriften' ? 'active' : ''}" onclick="switchSfTab('mitschriften')">
        📁 Mitschriften &amp; Dokumente
      </button>
      <button class="sf-subnav-btn ${currentSfTab === 'themen' ? 'active' : ''}" onclick="switchSfTab('themen')">
        💡 Themenideen &amp; Forschungsfragen (${SF_THEMEN.length})
      </button>
      <button class="sf-subnav-btn ${currentSfTab === 'prompts' ? 'active' : ''}" onclick="switchSfTab('prompts')">
        🧪 Prompt-Studio &amp; Tutoren (${SF_PROMPT_TEMPLATES.length})
      </button>
      <button class="sf-subnav-btn ${currentSfTab === 'tools' ? 'active' : ''}" onclick="switchSfTab('tools')">
        📊 KI-Modellvergleich (${SF_TOOLS_DATA.length})
      </button>
    </div>

    <!-- Tab Content Container -->
    <div id="sfTabContent" class="sf-tab-content-area"></div>
  `;

  renderCurrentSfSubTab();
  updateSfDocBadgeCount();
}

function switchSfTab(tabName) {
  currentSfTab = tabName;
  document.querySelectorAll('.sf-subnav-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  const activeBtn = document.querySelector(`.sf-subnav-btn[onclick*="${tabName}"]`);
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
      if (badge) badge.textContent = docs.length;
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

// --- 4. SUB-TAB 1: JOURNAL & CHRONIK ---
function renderSfJournalView(container) {
  const allEntries = getSfJournalEntries();
  const categories = ['Alle', 'Prompt-Experiment', 'Lernreflexion', 'Themenfindung', 'Modellvergleich'];

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
        <div class="sf-entry-card" id="entry-${e.id}">
          <div class="sf-entry-header">
            <div class="sf-entry-meta-left">
              <span class="sf-entry-date">📅 ${e.date || 'Ohne Datum'}</span>
              <span class="sf-entry-badge-cat sf-badge-${getCategoryColorClass(e.category)}">${e.category || 'Journal'}</span>
              <span class="sf-entry-sub">${e.subject ? `📚 ${e.subject}` : ''}</span>
              <span class="sf-entry-model">🤖 ${e.model || 'KI-Modell'}</span>
            </div>
            <div class="sf-entry-actions">
              <button class="sf-icon-btn" onclick="openSfEditEntryModal('${e.id}')" title="Eintrag bearbeiten">✏️</button>
              <button class="sf-icon-btn" onclick="deleteSfEntry('${e.id}')" title="Eintrag löschen">🗑️</button>
            </div>
          </div>

          <h3 class="sf-entry-title">${escapeHtml(e.title)}</h3>

          ${e.task ? `
            <div class="sf-entry-section">
              <div class="sf-section-label">🎯 Aufgabenstellung &amp; Kontext:</div>
              <p class="sf-section-text">${escapeHtml(e.task)}</p>
            </div>
          ` : ''}

          ${e.prompt ? `
            <div class="sf-entry-section sf-prompt-box">
              <div class="sf-prompt-head">
                <span class="sf-section-label">💬 Verwendeter Prompt:</span>
                <button class="sf-btn-copy-prompt" onclick="copySfEntryPrompt('${e.id}', this)">
                  📋 Prompt kopieren
                </button>
              </div>
              <pre class="sf-prompt-code">${escapeHtml(e.prompt)}</pre>
            </div>
          ` : ''}

          ${e.result ? `
            <div class="sf-entry-section">
              <div class="sf-section-label">📊 Ergebnis &amp; Beobachtung:</div>
              <p class="sf-section-text">${escapeHtml(e.result)}</p>
            </div>
          ` : ''}

          <!-- Kritische Reflexion & Lerneffekt -->
          ${e.reflection ? `
            <div class="sf-reflection-card">
              <div class="sf-reflection-head">
                <span class="sf-reflection-icon">🧠</span>
                <div>
                  <strong>Kritische Lernreflexion &bull; Seminarfach-Fokus</strong>
                  <div class="sf-reflection-sub">Einfluss auf Verständnis, Behalten &amp; Cognitive Offloading</div>
                </div>
              </div>
              <div class="sf-reflection-body">
                ${escapeHtml(e.reflection)}
              </div>
            </div>
          ` : ''}

          ${tagsHtml ? `<div class="sf-entry-footer-tags">${tagsHtml}</div>` : ''}
        </div>
      `;
    }).join('');
  }

  container.innerHTML = `
    <!-- Filter & Search Toolbar -->
    <div class="sf-toolbar">
      <div class="sf-filter-chips-list">
        ${filterChipsHtml}
      </div>
      <div class="sf-search-box">
        <span class="sf-search-icon">🔍</span>
        <input type="text" class="sf-search-input" placeholder="Journal durchsuchen (Thema, Prompt, Reflexion)..." 
               value="${escapeHtml(currentSfSearchQuery)}" oninput="setSfSearchQuery(this.value)">
        ${currentSfSearchQuery ? `<button class="sf-search-clear" onclick="setSfSearchQuery('')">&times;</button>` : ''}
      </div>
    </div>

    <!-- Entries Feed -->
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
  if (cat === 'Prompt-Experiment') return 'purple';
  if (cat === 'Lernreflexion') return 'emerald';
  if (cat === 'Themenfindung') return 'amber';
  if (cat === 'Modellvergleich') return 'cyan';
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

      <!-- Ratings -->
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
  document.getElementById('sfFormSubject').value = "Physik eA";
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
    // Update existing
    const idx = entries.findIndex(e => e.id === CURRENT_SF_EDIT_ID);
    if (idx !== -1) {
      entries[idx] = {
        ...entries[idx],
        title, date, category, subject, model, task, prompt, result, reflection, tags
      };
    }
    showSfToast("Eintrag erfolgreich aktualisiert! ✅");
  } else {
    // Create new
    const newEntry = {
      id: "sf-j-" + Date.now(),
      date, category, subject, model, title, task, prompt, result, reflection, tags
    };
    entries.unshift(newEntry);
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
  if (!confirm("Möchtest du das Journal auf die ursprünglichen Standard-Einträge zurücksetzen?")) return;
  saveSfJournalEntries(DEFAULT_SF_JOURNAL);
  renderSeminarfachView();
  showSfToast("Journal auf Standard zurückgesetzt 🔄");
}

// --- 10. PDF-EXPORT & PRINT ENGINE ---
function exportSfJournalPDF() {
  const entries = getSfJournalEntries();
  const favTopicId = getSfFavoriteTopicId();
  const favTopic = SF_THEMEN.find(t => t.id === favTopicId) || SF_THEMEN[0];

  let printHtml = `
    <!DOCTYPE html>
    <html lang="de">
    <head>
      <meta charset="UTF-8">
      <title>Prozessjournal - Seminarfach KI - Tonda Beutler</title>
      <style>
        @page {
          size: A4 portrait;
          margin: 1.8cm 1.5cm;
        }
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          color: #1d1d1f;
          line-height: 1.5;
          margin: 0;
          padding: 1.5rem;
          font-size: 10.5pt;
          background: #ffffff;
        }
        .header-box {
          border-bottom: 2px solid #8b5cf6;
          padding-bottom: 1rem;
          margin-bottom: 1.5rem;
        }
        .header-title {
          font-size: 18pt;
          font-weight: 800;
          color: #1d1d1f;
          margin: 0 0 0.3rem 0;
        }
        .header-meta {
          font-size: 9pt;
          color: #4b5563;
          line-height: 1.45;
        }
        .fav-box {
          background: #f8f6fc;
          border-left: 4px solid #8b5cf6;
          padding: 0.8rem 1rem;
          margin-bottom: 1.8rem;
          border-radius: 4px;
        }
        .entry-card {
          border: 1px solid #d1d5db;
          border-radius: 6px;
          padding: 1.1rem 1.3rem;
          margin-bottom: 1.4rem;
          page-break-inside: avoid;
          break-inside: avoid;
        }
        .entry-header {
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid #e5e7eb;
          padding-bottom: 0.4rem;
          margin-bottom: 0.6rem;
          font-size: 8.5pt;
          color: #6b7280;
          font-weight: 600;
        }
        .entry-title {
          font-size: 13pt;
          font-weight: 700;
          margin: 0 0 0.5rem 0;
          color: #111827;
        }
        .section-label {
          font-size: 8pt;
          font-weight: 700;
          text-transform: uppercase;
          color: #4b5563;
          margin-top: 0.5rem;
          margin-bottom: 0.2rem;
        }
        .prompt-box {
          background: #f3f4f6;
          border-left: 3px solid #9ca3af;
          padding: 0.6rem 0.8rem;
          font-family: 'Courier New', Courier, monospace;
          font-size: 9pt;
          white-space: pre-wrap;
          word-break: break-word;
          margin: 0.3rem 0;
        }
        .reflection-box {
          background: #f5f3ff;
          border: 1px solid #c4b5fd;
          border-left: 4px solid #8b5cf6;
          border-radius: 4px;
          padding: 0.8rem 1rem;
          margin-top: 0.7rem;
        }
        .reflection-title {
          font-weight: 700;
          color: #6d28d9;
          font-size: 9pt;
          margin-bottom: 0.3rem;
        }
        .tags {
          margin-top: 0.5rem;
          font-size: 8pt;
          color: #6b7280;
        }
        .print-btn-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          padding: 0.8rem 1rem;
          background: #f3f4f6;
          border-radius: 8px;
        }
        .btn-print {
          background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
          color: white;
          border: none;
          padding: 0.6rem 1.4rem;
          font-size: 10pt;
          font-weight: bold;
          border-radius: 20px;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(139, 92, 246, 0.4);
        }
        @media print {
          .print-btn-bar { display: none !important; }
          body { padding: 0 !important; }
        }
      </style>
    </head>
    <body>
      <div class="print-btn-bar">
        <span>📄 <strong>Druck- &amp; PDF-Vorschau:</strong> Wähle im Druckmenü als Ziel <em>„Als PDF speichern“</em></span>
        <button class="btn-print" onclick="window.print()">🖨️ Jetzt als PDF drucken / speichern</button>
      </div>

      <div class="header-box">
        <h1 class="header-title">🎓 Prozessjournal &amp; Forschungstagebuch: Seminarfach KI</h1>
        <div class="header-meta">
          <strong>Schüler:</strong> Tonda Beutler &bull; <strong>Jahrgang:</strong> 12 (Gymnasiale Oberstufe 2026/2027)<br>
          <strong>Themenschwerpunkt:</strong> Künstliche Intelligenz im Lern- und Bildungsalltag<br>
          <strong>Zentrale Leitfrage:</strong> „Wie lernt man am besten mit KI?“ &bull; <strong>Druckdatum:</strong> ${getTodayGermanDate()}
        </div>
      </div>

      <div class="fav-box">
        <strong>Aktuell favorisiertes Thema für die Seminarfacharbeit:</strong><br>
        <span style="font-size: 11pt; font-weight: bold; color: #6d28d9;">${favTopic.title}</span><br>
        <em>${favTopic.subtitle}</em><br>
        <div style="margin-top: 0.3rem; font-size: 9pt;"><strong>Forschungsfrage:</strong> ${favTopic.question}</div>
      </div>

      <h2 style="font-size: 12pt; text-transform: uppercase; color: #4b5563; border-bottom: 1px solid #ccc; padding-bottom: 0.2rem; margin-top: 1.5rem;">
        Chronologische Journaleinträge (${entries.length})
      </h2>
  `;

  entries.forEach((e, idx) => {
    printHtml += `
      <div class="entry-card">
        <div class="entry-header">
          <span>📅 Datum: ${e.date || '-'} &bull; Fach: ${e.subject || 'Allgemein'}</span>
          <span>Kategorie: ${e.category} &bull; Modell: ${e.model}</span>
        </div>
        <div class="entry-title">Eintrag ${entries.length - idx}: ${escapeHtml(e.title)}</div>

        ${e.task ? `
          <div class="section-label">🎯 Aufgabenstellung &amp; Kontext:</div>
          <div>${escapeHtml(e.task)}</div>
        ` : ''}

        ${e.prompt ? `
          <div class="section-label">💬 Verwendeter Prompt:</div>
          <div class="prompt-box">${escapeHtml(e.prompt)}</div>
        ` : ''}

        ${e.result ? `
          <div class="section-label">📊 Beobachtung &amp; Ergebnis der KI:</div>
          <div>${escapeHtml(e.result)}</div>
        ` : ''}

        ${e.reflection ? `
          <div class="reflection-box">
            <div class="reflection-title">🧠 Kritische Lernreflexion (Seminarfach-Fokus):</div>
            <div>${escapeHtml(e.reflection)}</div>
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
    // Fallback in current page
    window.print();
  }
}

// --- 11. EXPORTS & HELPERS ---
function exportSfJournalMarkdown() {
  const entries = getSfJournalEntries();
  let md = `# 📔 Prozessjournal: Mein Weg mit KI im Seminarfach\n`;
  md += `> **Autor:** Tonda Beutler • Jahrgang 12\n`;
  md += `> **Themenschwerpunkt:** Künstliche Intelligenz & Selbstgesteuertes Lernen\n`;
  md += `> **Leitfrage:** Wie lernt man am besten mit KI?\n\n---\n\n`;

  entries.forEach((e, i) => {
    md += `### Eintrag ${entries.length - i}: ${e.title}\n`;
    md += `* **Datum:** ${e.date || 'k. A.'}\n`;
    md += `* **Kategorie:** ${e.category || 'Allgemein'}\n`;
    md += `* **Fach:** ${e.subject || 'Allgemein'}\n`;
    md += `* **Genutztes Modell:** ${e.model || 'KI'}\n\n`;

    if (e.task) md += `#### 🎯 Aufgabenstellung / Kontext:\n${e.task}\n\n`;
    if (e.prompt) md += `#### 💬 Verwendeter Prompt:\n> ${e.prompt.replace(/\n/g, '\n> ')}\n\n`;
    if (e.result) md += `#### 📊 Ergebnis & Beobachtung:\n${e.result}\n\n`;
    if (e.reflection) md += `#### 🧠 Kritische Lernreflexion (Seminarfach):\n${e.reflection}\n\n`;
    if (e.tags && e.tags.length > 0) md += `*Schlagwörter: ${e.tags.map(t => '#' + t).join(' ')}*\n\n`;
    md += `---\n\n`;
  });

  downloadTextFile(md, "seminarfach_ki_journal_export.md");
  showSfToast("Journal als Markdown heruntergeladen! 📥");
}

function exportSfExposeTemplate() {
  const favTopicId = getSfFavoriteTopicId();
  const fav = SF_THEMEN.find(t => t.id === favTopicId) || SF_THEMEN[0];

  const expose = `# Exposé zur Seminarfacharbeit
**Thema:** ${fav.title}
**Arbeitstitel:** ${fav.subtitle}
**Bearbeiter:** Tonda Beutler (Jahrgang 12)
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

// Global Toast helper
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

// --- 12. AUTOMATIC INITIALIZATION ---
// Self-initialize on DOM ready so seminarfachRoot is never empty
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
