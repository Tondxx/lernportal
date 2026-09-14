// Politik-Wirtschaft (pw25-Hf) • Klausur-Master
// Themen: Formen politischer Partizipation, Wahlen & Funktionen von Partizipation
// Operatoren: 1. Zusammenfassen (AFB I), 2. Erläutern (AFB II), 3. Sich auseinandersetzen mit (AFB III)

const POLITIK_FLASHCARDS = [
  {
    id: 1,
    topic: "Formen von Partizipation",
    q: "Was unterscheidet konventionelle von unkonventionellen Partizipationsformen?",
    a: "• Konventionell (institutionell): Im System fest vorgesehen (z. B. Wählen, Parteimitgliedschaft, Bürgerinitiativen, Petitionen, Mitarbeit in Gewerkschaften).\n• Unkonventionell (außerinstitutionell): Außerhalb staatlicher Gremien, oft aktionsorientiert (z. B. Demonstrationen, Boykotte, Streiks, Flashmobs, ziviler Ungehorsam).",
    tip: "Klausur-Falle: Unkonventionell bedeutet NICHT automatisch illegal!"
  },
  {
    id: 2,
    topic: "Formen von Partizipation",
    q: "Was ist 'Ziviler Ungehorsam' und welche Kriterien müssen erfüllt sein?",
    a: "Bewusster, symbolischer Bruch von Rechtsnormen aus moralischen/politischen Gewissensgründen:\n1. Gewaltfreiheit\n2. Öffentlichkeit (kein heimliches Handeln)\n3. Appellcharakter an Mehrheit/Gerechtigkeit\n4. Akzeptanz der rechtlichen Konsequenzen / Strafe\n5. Verhältnismäßigkeit (letztes Mittel).",
    tip: "Beispiele: Sitzblockaden, Blockaden von Klimaschützern."
  },
  {
    id: 3,
    topic: "Wahlen",
    q: "Welche 5 Wahlrechtsgrundsätze stehen in Art. 38 Abs. 1 GG?",
    a: "Wahlen in Deutschland sind:\n1. Allgemein (alle Staatsbürger ab 18 bzw. 16 dürfen wählen)\n2. Unmittelbar (ohne Wahlmänner direkt für Abgeordnete/Listen)\n3. Frei (kein Zwang, kein Druck, freie Meinungsbildung)\n4. Gleich (jede Stimme zählt gleich viel, gleicher Zählwert)\n5. Geheim (niemand darf sehen, wer wen wählt, Wahlkabine).",
    tip: "Absoluter Pflichtbegriff für Klausuren zu Wahlen!"
  },
  {
    id: 4,
    topic: "Funktionen von Wahlen",
    q: "Welche 5 zentralen Funktionen erfüllen Wahlen in der Demokratie?",
    a: "1. Legitimation (Verleiht Herrschaft auf Zeit demokratische Rechtmäßigkeit, Art. 20 Abs. 2 GG)\n2. Kontrolle (Wähler können Regierung abwählen oder bestätigen)\n3. Partizipation (Bürger bestimmen politische Richtung mit)\n4. Repräsentation (Spiegelt gesellschaftliche Meinungen im Parlament wider)\n5. Integration (Bündelt Interessen, Wahlverlierer akzeptieren das Ergebnis).",
    tip: "Muss bei Aufgabe 2 (Erläutern) flüssig parat sein!"
  },
  {
    id: 5,
    topic: "Funktionen von Partizipation",
    q: "Warum ist politische Partizipation lebensnotwendig für eine Demokratie?",
    a: "• Artikulationsfunktion: Bürger machen Probleme und Bedürfnisse überhaupt erst sichtbar.\n• Kontrollfunktion: Verhindert Machtmissbrauch und Abgehobenheit der Eliten.\n• Legitimationsfunktion: Gesetze werden besser akzeptiert, wenn Betroffene mitwirken durften.\n• Integrations- & Lernfunktion: Demokratie lernt man durch Tun (Bürgeridentifikation).",
    tip: "Gegenargument / Gefahr: Partizipationsparadoxon (vor allem Gebildete & Reiche partizipieren)."
  },
  {
    id: 6,
    topic: "Partizipation: Kritik",
    q: "Was ist das 'Partizipationsparadoxon' (die soziale Schieflage)?",
    a: "Obwohl alle Bürger die gleichen Rechte haben, partizipieren überdurchschnittlich oft Personen mit hohem Einkommen, hohem Bildungsgrad und viel Freizeit. Sozial Schwächere sind unterrepräsentiert ('Bürger zweiter Klasse'), wodurch Politik deren Interessen oft übersieht.",
    tip: "Goldwert für Aufgabe 3 (Sich auseinandersetzen / Urteil)!"
  },
  {
    id: 7,
    topic: "Operatoren-Training",
    q: "Wie unterscheidet sich 'Erläutern' (Aufgabe 2) von 'Sich auseinandersetzen' (Aufgabe 3)?",
    a: "• Erläutern (AFB II): Einen Sachverhalt oder eine These im Text mit Fachwissen, Zusammenhängen und Beispielen verständlich und neutral darlegen. (KEINE eigene Meinung!)\n• Sich auseinandersetzen (AFB III): Argumentatives Abwägen von Pro und Contra zu einer Streitfrage, gefolgt von einem eigenen begründeten Sach- und Werturteil!",
    tip: "In Aufgabe 2 neutral erklären, erst in Aufgabe 3 urteilen!"
  },
  {
    id: 8,
    topic: "Operatoren-Training",
    q: "Was gehört in den perfekten Einleitungssatz bei 'Zusammenfassen' (Aufgabe 1)?",
    a: "In dem [Textsorte: Kommentar/Gastbeitrag/Rede] '[Titel]', verfasst von [Autor] und erschienen am [Datum] in [Medium/Zeitung], geht es um die Frage, [Kernthema]. Der Autor vertritt dabei die zentrale These, dass [Hauptthese].",
    tip: "Präsens verwenden, keine Zitate aneinanderkleben, Sinnabschnitte bilden!"
  }
];

let activeFlashcardIdx = 0;
let flashcardFlipped = false;

function renderPolitikView() {
  renderActiveFlashcard();
  loadUserPolitikNotes();
}

function renderActiveFlashcard() {
  const card = POLITIK_FLASHCARDS[activeFlashcardIdx];
  const qEl = document.getElementById('fcQuestion');
  const aEl = document.getElementById('fcAnswer');
  const tipEl = document.getElementById('fcTip');
  const topicEl = document.getElementById('fcTopic');
  const numEl = document.getElementById('fcNum');
  const cardContainer = document.getElementById('interactiveFlashcard');

  if (!qEl) return;

  topicEl.innerText = card.topic;
  numEl.innerText = `Karte ${activeFlashcardIdx + 1} von ${POLITIK_FLASHCARDS.length}`;
  qEl.innerText = card.q;
  aEl.innerHTML = card.a.replace(/\n/g, '<br>');
  tipEl.innerText = card.tip ? '💡 Klausur-Tipp: ' + card.tip : '';

  flashcardFlipped = false;
  cardContainer.classList.remove('is-flipped');
}

function flipFlashcard() {
  const cardContainer = document.getElementById('interactiveFlashcard');
  flashcardFlipped = !flashcardFlipped;
  cardContainer.classList.toggle('is-flipped', flashcardFlipped);
}

function nextFlashcard() {
  activeFlashcardIdx = (activeFlashcardIdx + 1) % POLITIK_FLASHCARDS.length;
  renderActiveFlashcard();
}

function prevFlashcard() {
  activeFlashcardIdx = (activeFlashcardIdx - 1 + POLITIK_FLASHCARDS.length) % POLITIK_FLASHCARDS.length;
  renderActiveFlashcard();
}

function saveUserPolitikNotes() {
  const text = document.getElementById('userPolitikNotes').value;
  localStorage.setItem('pw25_tonda_notes', text);
  const status = document.getElementById('notesSaveStatus');
  if (status) {
    status.innerText = '✅ Automatisch gespeichert!';
    setTimeout(() => { status.innerText = ''; }, 2000);
  }
}

function loadUserPolitikNotes() {
  const el = document.getElementById('userPolitikNotes');
  if (el) {
    const saved = localStorage.getItem('pw25_tonda_notes');
    if (saved) el.value = saved;
  }
}
