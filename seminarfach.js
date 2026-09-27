// =========================================================================
// SEMINARFACH 4 (Abi28 sf4 • Herr Jatzeck) • KÜNSTLICHE INTELLIGENZ
// CLEANES OBERSTUFEN-TAGEBUCH (GOODNOTES-STYLE)
// Jahrgang 12 • IGS Göttingen • Tonda Beutler
// =========================================================================

// --- 1. SCHULFACH-OPTIONEN ---
const SF_SUBJECT_OPTIONS = [
  { code: 'sf4', name: 'Seminarfach 4: KI (Hr. Jatzeck)', short: 'sf4 (Seminarfach)', color: '#7c3aed' },
  { code: 'MA11', name: 'Mathematik LK (Fr. Meyer)', short: 'MA11 (Mathe LK)', color: '#dc2626' },
  { code: 'PH12', name: 'Physik LK (Hr. Lohse)', short: 'PH12 (Physik LK)', color: '#2563eb' },
  { code: 'IF13', name: 'Informatik LK (Hr. Trittmacher)', short: 'IF13 (Informatik LK)', color: '#059669' },
  { code: 'pw25', name: 'Politik-Wirtschaft (Hr. Hoffmann)', short: 'pw25 (Politik)', color: '#d97706' },
  { code: 'de48', name: 'Deutsch (Fr. Heinrich)', short: 'de48 (Deutsch)', color: '#db2777' },
  { code: 'en39', name: 'Englisch (Hr. Westphal)', short: 'en39 (Englisch)', color: '#0891b2' },
  { code: 'ge27', name: 'Geschichte (Hr. Weinert)', short: 'ge27 (Geschichte)', color: '#b45309' },
  { code: 'allg', name: 'Allgemein / Freie Notiz', short: 'Allgemein', color: '#64748b' }
];

// --- 2. TONDAS TAGEBUCH-EINTRÄGE (KLAR, PERSÖNLICH & REFLEKTIERT) ---
const DEFAULT_SF_JOURNAL = [
  {
    id: "sf-1",
    date: "14.09.26",
    category: "unterricht",
    categoryName: "Unterricht",
    subjectCode: "sf4",
    title: "Y-Lab Nachbesprechung & Journal-Anfang",
    content: "Ergebnisse über das Y-Lab ausgetauscht, da nur wenige da waren.\n\nJournal anlegen und erste Informationen eintragen, wie die Notizen zum Y-Lab erfasst werden sollen.\n\nAllgemein gesagt bekommen, wie der weitere Plan im Seminarfach aussieht.\n\nWar insgesamt nicht super spannend, das Y-Lab hat sich nicht wirklich gelohnt."
  },
  {
    id: "sf-2",
    date: "14.09.26",
    category: "themen",
    categoryName: "Themenfindung",
    subjectCode: "sf4",
    title: "Kriterien für die Facharbeit (aus dem Y-Lab)",
    content: "Notizen zur Erstellung einer wissenschaftlichen Arbeit aus dem Y-Lab:\n\nEigenschaften einer guten Facharbeit:\n• Objektiv und sachlich\n• Eigenständig erarbeitet\n• Systematischer Aufbau\n• Klarer Schreibstil\n• Nachvollziehbarer Beitrag\n\nKriterien für die Themenfindung:\n• Das Thema muss mich wirklich interessieren\n• Gut eingegrenzt (ein klares, konkretes Thema)\n• Beinhaltet eine eigene Fragestellung\n• Verlässliche Primärquellen nutzen"
  },
  {
    id: "sf-3",
    date: "21.09.26",
    category: "unterricht",
    categoryName: "Unterricht",
    subjectCode: "sf4",
    title: "Ansage zur Arbeitsmoral & Journal-Führung",
    content: "Ansage im Unterricht bekommen, weil die Arbeitsmoral im Kurs noch nicht auf dem richtigen Stand ist.\n\nDas Journal wird bei vielen noch nicht ordentlich geführt. Haben etwas Inspiration gesammelt, worüber wir die Seminarfacharbeit schreiben könnten.\n\nZiel für die nächste Zeit: Das Journal regelmäßig führen und auf den aktuellen Stand bringen."
  },
  {
    id: "sf-4",
    date: "21.09.26",
    category: "ki",
    categoryName: "KI-Nutzung",
    subjectCode: "sf4",
    title: "Gedanken zur allgemeinen Stimmung über KI",
    content: "Ich merke oft eine ziemlich negative Haltung gegenüber KI, was man stellenweise auch verstehen kann. Aber einfach pauschal zu sagen, KI ist schlecht und muss verboten werden, ist keine sinnvolle Lösung.\n\nDas ist erstens unrealistisch und zweitens verschenkt man damit viele Chancen, weil KI beim Lernen durchaus nützlich sein kann, wenn man sie richtig einsetzt."
  },
  {
    id: "sf-5",
    date: "26.08.26",
    category: "unterricht",
    categoryName: "Unterricht",
    subjectCode: "sf4",
    title: "Harald Lesch Beitrag im Unterricht",
    content: "Im Unterricht bei Herrn Jatzeck den Beitrag von Harald Lesch über KI geschaut.\n\nSein Kernpunkt: Sprachmodelle verstehen die Inhalte nicht wirklich, sondern setzen Wörter rein statistisch nach Wahrscheinlichkeiten zusammen.\n\nFür die Schule heißt das vor allem: Wer KI nur nutzt, um Hausaufgaben fertig zu bekommen, lernt selbst nichts dabei. Man muss sich die Schritte erklären lassen und selbst mitdenken, damit am Ende etwas hängenbleibt."
  },
  {
    id: "sf-6",
    date: "17.09.26",
    category: "themen",
    categoryName: "Themenfindung",
    subjectCode: "sf4",
    title: "SUB Bibliotheksausweis Göttingen",
    content: "Anmeldeformular für die SUB Göttingen (Zentralbibliothek am Platz der Göttinger Sieben) ausgefüllt.\n\nIm Oktober kann ich den Ausweis abholen, um mir dort Fachliteratur für die Seminararbeit auszuleihen."
  },
  {
    id: "sf-7",
    date: "23.09.26",
    category: "news",
    categoryName: "KI-News",
    subjectCode: "allg",
    title: "OpenAI o1 Modell ausprobiert",
    content: "OpenAI hat das neue o1-Modell veröffentlicht, das vor der Antwort Zwischenschritte berechnet und logische Gedankengänge durchgeht.\n\nIch habe das bei schwierigeren Aufgaben in Mathe und Physik getestet, bei denen normale Sprachmodelle bisher oft falsche Zwischenschritte berechnet haben. Die neue Version rechnet die Schritte deutlich strukturierter durch und kommt fast immer auf das richtige Ergebnis."
  },
  {
    id: "sf-8",
    date: "25.09.26",
    category: "news",
    categoryName: "KI-News",
    subjectCode: "allg",
    title: "Richtlinien für KI an Schulen",
    content: "Es gibt neue Diskussionen und Richtlinien zum Umgang mit KI im Unterricht, besonders bezüglich Transparenz und Eigenständigkeit.\n\nIm Schulalltag nutzen viele Schüler KI bisher vor allem, um Hausaufgaben schneller fertig zu haben. Herr Jatzeck hat aber betont, dass wir für die Seminarfacharbeit alle verwendeten Prompts und KI-Hilfen nachvollziehbar dokumentieren müssen, damit die eigene Leistung erkennbar bleibt."
  }
];

// LocalStorage Key
const SF_STORAGE_KEY = 'tonda_sf_diary_entries_v5';

// State
let currentSfTab = 'alle'; // 'alle' | 'unterricht' | 'ki' | 'themen' | 'news'

// --- HELPER FUNCTIONS ---
function getSfJournalEntries() {
  try {
    const raw = localStorage.getItem(SF_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        // Check if any old entry has leftover slang or old buzzwords
        const hasOutdated = parsed.some(e => 
          e.content && (e.content.includes("Ziemlich krass") || e.content.includes("Cognitive Offloading") || e.content.includes("Schulumfrage"))
        );
        if (!hasOutdated) {
          return parsed;
        }
      }
    }
    // Clean old storage keys
    localStorage.removeItem('tonda_sf_diary_entries_v4');
    localStorage.removeItem('tonda_sf_diary_entries_v3');
    localStorage.removeItem('tonda_sf_diary_entries_v2');
    localStorage.removeItem('tonda_sf_diary_entries');
  } catch (e) {
    console.error("Fehler beim Laden des Tagebuchs:", e);
  }
  saveSfJournalEntries(DEFAULT_SF_JOURNAL);
  return [...DEFAULT_SF_JOURNAL];
}

function saveSfJournalEntries(entries) {
  try {
    localStorage.setItem(SF_STORAGE_KEY, JSON.stringify(entries));
  } catch (e) {
    console.error("Fehler beim Speichern des Tagebuchs:", e);
  }
}

function getTodayGermanShortDate() {
  const d = new Date();
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = String(d.getFullYear()).slice(-2);
  return `${day}.${month}.${year}`;
}

function escapeHtml(text) {
  if (!text) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function showSfToast(msg) {
  let toast = document.getElementById('sfToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'sfToast';
    toast.className = 'sf-toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('visible');
  setTimeout(() => toast.classList.remove('visible'), 2400);
}

// --- 3. MAIN RENDERER ---
function renderSeminarfachView() {
  const root = document.getElementById('seminarfachRoot');
  if (!root) return;

  const entries = getSfJournalEntries();

  // Counts per category
  const countAll = entries.length;
  const countUnterricht = entries.filter(e => e.category === 'unterricht').length;
  const countKi = entries.filter(e => e.category === 'ki').length;
  const countThemen = entries.filter(e => e.category === 'themen').length;
  const countNews = entries.filter(e => e.category === 'news').length;

  root.innerHTML = `
    <!-- Top Action Toolbar -->
    <div class="sf-clean-topbar">
      <div class="sf-clean-topbar-left">
        <span class="sf-clean-title-badge">Tagebuch</span>
        <span class="sf-clean-sub-badge">Seminarfach KI &bull; Hr. Jatzeck &bull; IGS Göttingen (Jg. 12)</span>
      </div>
      <div class="sf-clean-topbar-right">
        <button class="sf-btn sf-btn-pdf" onclick="exportSfJournalPDF()" title="Druckfertiges A4-PDF für die IServ-Abgabe exportieren">
          PDF exportieren
        </button>
        <button class="sf-btn sf-btn-ghost" onclick="focusSfCleanInserter()" title="Neue Notiz verfassen">
          Neue Notiz
        </button>
        <button class="sf-btn sf-btn-ghost" onclick="resetSfJournalDefaults()" title="Standard wiederherstellen">
          Zurücksetzen
        </button>
      </div>
    </div>

    <!-- HARDCOVER BUCH WRAPPER -->
    <div class="sf-hardcover-wrapper">
      <div class="sf-hardcover-book">

        <!-- Metallic Brass / Golden Corner Protectors -->
        <div class="sf-corner-gold sf-corner-tl"></div>
        <div class="sf-corner-gold sf-corner-tr"></div>
        <div class="sf-corner-gold sf-corner-bl"></div>
        <div class="sf-corner-gold sf-corner-br"></div>

        <!-- Silk Bookmark Ribbon -->
        <div class="sf-silk-bookmark-ribbon">
          <div class="sf-ribbon-tail"></div>
        </div>

        <!-- Book Spine on the Left -->
        <div class="sf-book-spine">
          <div class="sf-spine-emboss-wrap">
            <span class="sf-spine-gold-title">TONDA BEUTLER &bull; OBERSTUFE JAHRGANG 12 &bull; TAGEBUCH</span>
          </div>
          <div class="sf-spine-ridge sf-spine-ridge-1"></div>
          <div class="sf-spine-ridge sf-spine-ridge-2"></div>
          <div class="sf-spine-ridge sf-spine-ridge-3"></div>
          <div class="sf-spine-ridge sf-spine-ridge-4"></div>
        </div>

        <!-- Open Book Page Container -->
        <div class="sf-book-pages-container">
          
          <!-- Rote Korrektur-Randlinie -->
          <div class="sf-book-red-margin"></div>

          <!-- Buchfalz-Schatten -->
          <div class="sf-book-gutter-shadow"></div>

          <!-- Innere linierte Buchseite -->
          <div class="sf-book-page-sheet">
            
            <!-- Header der Buchseite -->
            <div class="sf-gn-page-header">
              <div class="sf-gn-header-top">
                <span class="sf-gn-school-stamp">IGS GÖTTINGEN &bull; GYMNASIALE OBERSTUFE (ABI 2028)</span>
                <span class="sf-gn-date-stamp">${getTodayGermanShortDate()}</span>
              </div>
              <h1 class="sf-gn-main-title">${getPageTitleForTab(currentSfTab)}</h1>
              <p class="sf-gn-sub-title">Persönliche Aufzeichnungen, Unterrichtsverlauf und Gedanken zum KI-Lernen</p>

              <!-- 5-Pill Category Bar on the page (Farblich klar getrennt) -->
              <div class="sf-gn-category-tabs">
                <button class="sf-gn-pill ${currentSfTab === 'alle' ? 'active' : ''}" onclick="switchSfTab('alle')">
                  Alle Notizen (${countAll})
                </button>
                <button class="sf-gn-pill pill-unterricht ${currentSfTab === 'unterricht' ? 'active' : ''}" onclick="switchSfTab('unterricht')">
                  Unterricht (${countUnterricht})
                </button>
                <button class="sf-gn-pill pill-ki ${currentSfTab === 'ki' ? 'active' : ''}" onclick="switchSfTab('ki')">
                  KI-Nutzung (${countKi})
                </button>
                <button class="sf-gn-pill pill-themen ${currentSfTab === 'themen' ? 'active' : ''}" onclick="switchSfTab('themen')">
                  Themenfindung (${countThemen})
                </button>
                <button class="sf-gn-pill pill-news ${currentSfTab === 'news' ? 'active' : ''}" onclick="switchSfTab('news')">
                  KI-News (${countNews})
                </button>
              </div>
            </div>

            <!-- CLEAN INLINE NOTE INSERTER -->
            ${renderCleanNoteInserterHtml()}

            <!-- ENTRIES CONTAINER -->
            <div id="sfEntriesContainer" class="sf-gn-entries-list">
              ${renderFilteredEntriesHtml()}
            </div>

          </div>

        </div>

        <!-- 5 Register-Reiter am rechten Buchrand (Farblich codiert & sauber) -->
        <div class="sf-book-index-tabs">
          <button class="sf-index-tab tab-alle ${currentSfTab === 'alle' ? 'active' : ''}" onclick="switchSfTab('alle')" title="Alle Notizen">
            <span class="tab-text">Alle</span>
            <span class="tab-badge">${countAll}</span>
          </button>
          <button class="sf-index-tab tab-unterricht ${currentSfTab === 'unterricht' ? 'active' : ''}" onclick="switchSfTab('unterricht')" title="Was in den Stunden war">
            <span class="tab-text">Stunden</span>
            <span class="tab-badge">${countUnterricht}</span>
          </button>
          <button class="sf-index-tab tab-ki ${currentSfTab === 'ki' ? 'active' : ''}" onclick="switchSfTab('ki')" title="Wie ich aktuell KI nutze">
            <span class="tab-text">KI</span>
            <span class="tab-badge">${countKi}</span>
          </button>
          <button class="sf-index-tab tab-themen ${currentSfTab === 'themen' ? 'active' : ''}" onclick="switchSfTab('themen')" title="Themenfindung">
            <span class="tab-text">Themen</span>
            <span class="tab-badge">${countThemen}</span>
          </button>
          <button class="sf-index-tab tab-news ${currentSfTab === 'news' ? 'active' : ''}" onclick="switchSfTab('news')" title="KI-News">
            <span class="tab-text">News</span>
            <span class="tab-badge">${countNews}</span>
          </button>
        </div>

      </div>
    </div>
  `;
}

function getPageTitleForTab(tab) {
  if (tab === 'unterricht') return 'Was in den Stunden stattgefunden hat';
  if (tab === 'ki') return 'Wie ich aktuell KI nutze & Gedanken dazu';
  if (tab === 'themen') return 'Themenfindung & Ideen für die Seminararbeit';
  if (tab === 'news') return 'KI-News & Entwicklungen';
  return 'Mein Tagebuch & Schul-Notizen';
}

function switchSfTab(tab) {
  currentSfTab = tab;
  renderSeminarfachView();
}

// --- 4. CLEAN INLINE NOTE INSERTER ---
let currentInserterCategory = 'unterricht';

function renderCleanNoteInserterHtml() {
  const activeCat = (currentSfTab === 'alle') ? currentInserterCategory : currentSfTab;

  return `
    <div class="sf-clean-note-inserter" id="sfCleanInserter">
      <div class="sf-inserter-header">
        <div class="sf-inserter-title">
          <strong>Neue Notiz verfassen</strong>
        </div>
        <div class="sf-inserter-date-stamp">
          <input type="text" id="sfInlineDate" class="sf-gn-date-input" value="${getTodayGermanShortDate()}" title="Datum">
        </div>
      </div>

      <!-- Segmented Category Buttons (Klar & Direkt anklickbar) -->
      <div class="sf-inserter-category-selector">
        <span class="sf-field-hint">Kategorie wählen:</span>
        <div class="sf-cat-buttons-group">
          <button type="button" class="sf-cat-btn btn-cat-unterricht ${activeCat === 'unterricht' ? 'active' : ''}" onclick="setInserterCategory('unterricht')">
            Unterricht
          </button>
          <button type="button" class="sf-cat-btn btn-cat-ki ${activeCat === 'ki' ? 'active' : ''}" onclick="setInserterCategory('ki')">
            KI-Nutzung
          </button>
          <button type="button" class="sf-cat-btn btn-cat-themen ${activeCat === 'themen' ? 'active' : ''}" onclick="setInserterCategory('themen')">
            Themenfindung
          </button>
          <button type="button" class="sf-cat-btn btn-cat-news ${activeCat === 'news' ? 'active' : ''}" onclick="setInserterCategory('news')">
            KI-News
          </button>
        </div>
        <input type="hidden" id="sfInlineCategory" value="${activeCat}">
      </div>

      <div class="sf-inserter-subject-row">
        <label>Schulfach (optional):</label>
        <select id="sfInlineSubject" class="sf-gn-select">
          ${SF_SUBJECT_OPTIONS.map(s => `<option value="${s.code}">${s.short}</option>`).join('')}
        </select>
      </div>

      <div class="sf-inserter-title-wrap">
        <input type="text" id="sfInlineTitle" class="sf-gn-title-input" 
               placeholder="Titel / Stichwort der Notiz...">
      </div>

      <div class="sf-inserter-content-wrap">
        <textarea id="sfInlineContent" class="sf-gn-textarea" rows="4" 
                  placeholder="Schreibe hier deine Gedanken und Mitschriften auf..."></textarea>
      </div>

      <!-- Optionale Details für Herrn Jatzeck / IServ -->
      <div class="sf-inserter-details-toggle">
        <details>
          <summary>Zusatzangaben für Herrn Jatzeck (Prompt / Modell)</summary>
          <div class="sf-gn-details-grid">
            <div>
              <label class="sf-sub-label">Genutztes Tool / Modell:</label>
              <input type="text" id="sfInlineModel" class="sf-gn-input" placeholder="z. B. ChatGPT, Claude, o1">
            </div>
            <div>
              <label class="sf-sub-label">Verwendeter Prompt (Wortlaut):</label>
              <input type="text" id="sfInlinePrompt" class="sf-gn-input" placeholder="Wie hast du die KI angesprochen?">
            </div>
          </div>
        </details>
      </div>

      <div class="sf-inserter-actions">
        <button class="sf-btn-gn-save" onclick="saveSfInlineNote()">
          Notiz eintragen
        </button>
      </div>
    </div>
  `;
}

function setInserterCategory(cat) {
  currentInserterCategory = cat;
  const input = document.getElementById('sfInlineCategory');
  if (input) input.value = cat;

  document.querySelectorAll('.sf-cat-btn').forEach(btn => btn.classList.remove('active'));
  const activeBtn = document.querySelector(`.btn-cat-${cat}`);
  if (activeBtn) activeBtn.classList.add('active');
}

// --- 5. NOTE SAVING & MANAGEMENT ---
function saveSfInlineNote() {
  const contentEl = document.getElementById('sfInlineContent');
  const titleEl = document.getElementById('sfInlineTitle');
  const dateEl = document.getElementById('sfInlineDate');
  const catEl = document.getElementById('sfInlineCategory');
  const subjEl = document.getElementById('sfInlineSubject');
  const modelEl = document.getElementById('sfInlineModel');
  const promptEl = document.getElementById('sfInlinePrompt');

  const content = contentEl ? contentEl.value.trim() : '';
  let title = titleEl ? titleEl.value.trim() : '';
  const date = dateEl && dateEl.value.trim() ? dateEl.value.trim() : getTodayGermanShortDate();
  const category = catEl ? catEl.value : 'unterricht';
  const subjectCode = subjEl ? subjEl.value : 'sf4';
  const model = modelEl ? modelEl.value.trim() : '';
  const prompt = promptEl ? promptEl.value.trim() : '';

  if (!content && !title) {
    alert("Bitte schreibe eine kurze Notiz oder einen Titel auf, bevor du speicherst!");
    return;
  }

  if (!title) {
    title = content.length > 40 ? content.substring(0, 38) + '...' : 'Notiz vom ' + date;
  }

  let categoryName = 'Unterricht';
  if (category === 'ki') categoryName = 'KI-Nutzung';
  if (category === 'themen') categoryName = 'Themenfindung';
  if (category === 'news') categoryName = 'KI-News';

  const entries = getSfJournalEntries();
  const newEntry = {
    id: "sf-" + Date.now(),
    date: date,
    category: category,
    categoryName: categoryName,
    subjectCode: subjectCode,
    title: title,
    content: content,
    model: model,
    prompt: prompt
  };

  entries.unshift(newEntry);
  saveSfJournalEntries(entries);
  showSfToast("Notiz im Tagebuch gespeichert");
  renderSeminarfachView();
}

function focusSfCleanInserter() {
  const el = document.getElementById('sfCleanInserter');
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    const contentInput = document.getElementById('sfInlineContent');
    if (contentInput) contentInput.focus();
  }
}

// --- 6. RENDER ENTRIES (KLAR KATEGORISIERT MIT FARBKANTE) ---
function renderFilteredEntriesHtml() {
  const allEntries = getSfJournalEntries();
  
  let filtered = allEntries;
  if (currentSfTab !== 'alle') {
    filtered = allEntries.filter(e => e.category === currentSfTab);
  }

  if (filtered.length === 0) {
    return `
      <div class="sf-gn-empty">
        <p>In dieser Kategorie sind noch keine Notizen vorhanden.</p>
        <button class="sf-btn-gn-save" onclick="focusSfCleanInserter()">Erste Notiz schreiben</button>
      </div>
    `;
  }

  return filtered.map(e => {
    const subj = SF_SUBJECT_OPTIONS.find(s => s.code === e.subjectCode) || SF_SUBJECT_OPTIONS[0];

    return `
      <article class="sf-gn-entry-sheet entry-border-${e.category || 'unterricht'}" id="entry-${e.id}">
        
        <!-- Top Metadata Row -->
        <div class="sf-gn-entry-header">
          <div class="sf-gn-entry-badges">
            <span class="sf-gn-cat-pill sf-cat-${e.category || 'unterricht'}">
              ${escapeHtml(e.categoryName || 'Unterricht')}
            </span>
            <span class="sf-gn-subj-pill" style="color: ${subj.color}; background: ${subj.color}15; border: 1px solid ${subj.color}35;">
              ${subj.short}
            </span>
          </div>
          
          <div class="sf-gn-entry-right">
            <!-- Handwritten-style Date Stamp -->
            <span class="sf-gn-handwritten-date">${escapeHtml(e.date)}</span>
            <button class="sf-gn-btn-action" onclick="openSfEditEntryModal('${e.id}')" title="Notiz bearbeiten">Bearbeiten</button>
            <button class="sf-gn-btn-action sf-btn-danger" onclick="deleteSfEntry('${e.id}')" title="Notiz löschen">Löschen</button>
          </div>
        </div>

        <!-- Clean Title -->
        <h2 class="sf-gn-entry-title">${escapeHtml(e.title)}</h2>

        <!-- Clean Content Text matching Notebook lines -->
        <div class="sf-gn-entry-body">
          ${formatNotebookText(e.content)}
        </div>

        <!-- Optional Science / Prompt Info if present -->
        ${(e.prompt || e.model) ? `
          <div class="sf-gn-entry-footer-meta">
            ${e.model ? `<span>Modell: <strong>${escapeHtml(e.model)}</strong></span>` : ''}
            ${e.prompt ? `<span>Prompt: <em>„${escapeHtml(e.prompt)}“</em></span>` : ''}
          </div>
        ` : ''}

      </article>
    `;
  }).join('');
}

function formatNotebookText(text) {
  if (!text) return '<p><em>Kein Text notiert.</em></p>';
  return text.split('\n\n').map(p => {
    const lines = p.split('\n');
    return `<p>${lines.map(l => escapeHtml(l)).join('<br>')}</p>`;
  }).join('');
}

function deleteSfEntry(id) {
  if (!confirm("Möchtest du diesen Tagebucheintrag wirklich löschen?")) return;
  let entries = getSfJournalEntries();
  entries = entries.filter(e => e.id !== id);
  saveSfJournalEntries(entries);
  showSfToast("Eintrag gelöscht");
  renderSeminarfachView();
}

function resetSfJournalDefaults() {
  if (!confirm("Möchtest du das Tagebuch auf die Standard-Notizen zurücksetzen?")) return;
  saveSfJournalEntries(DEFAULT_SF_JOURNAL);
  showSfToast("Standard-Notizen wiederhergestellt");
  renderSeminarfachView();
}

// --- 7. MODAL FOR EDITING EXISTING ENTRIES (SCHICK, ÜBERSICHTLICH & KLAR KATEGORISIERT) ---
let CURRENT_SF_EDIT_ID = null;

function openSfEditEntryModal(id) {
  const entries = getSfJournalEntries();
  const entry = entries.find(e => e.id === id);
  if (!entry) return;

  CURRENT_SF_EDIT_ID = id;

  let modal = document.getElementById('sfEditModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'sfEditModal';
    modal.className = 'sf-modal-overlay';
    modal.onclick = (e) => {
      if (e.target === modal) closeSfEditModal();
    };
    document.body.appendChild(modal);
  }

  const activeCategory = entry.category || 'unterricht';

  modal.innerHTML = `
    <div class="sf-modal-card" onclick="event.stopPropagation()">
      
      <!-- Modal Header -->
      <div class="sf-modal-head">
        <div>
          <h3 class="sf-modal-title">Notiz bearbeiten</h3>
          <span class="sf-modal-sub">Eintrag anpassen und neu zuordnen</span>
        </div>
        <button class="sf-modal-close" onclick="closeSfEditModal()">&times;</button>
      </div>

      <!-- Modal Body -->
      <div class="sf-modal-body">
        
        <!-- Segmented Category Buttons in Modal -->
        <div class="sf-modal-section">
          <label class="sf-modal-label">Kategorie wählen:</label>
          <div class="sf-cat-buttons-group">
            <button type="button" class="sf-cat-btn btn-cat-unterricht ${activeCategory === 'unterricht' ? 'active' : ''}" onclick="setModalEditCategory('unterricht')">
              Unterricht
            </button>
            <button type="button" class="sf-cat-btn btn-cat-ki ${activeCategory === 'ki' ? 'active' : ''}" onclick="setModalEditCategory('ki')">
              KI-Nutzung
            </button>
            <button type="button" class="sf-cat-btn btn-cat-themen ${activeCategory === 'themen' ? 'active' : ''}" onclick="setModalEditCategory('themen')">
              Themenfindung
            </button>
            <button type="button" class="sf-cat-btn btn-cat-news ${activeCategory === 'news' ? 'active' : ''}" onclick="setModalEditCategory('news')">
              KI-News
            </button>
          </div>
          <input type="hidden" id="sfEditCategory" value="${activeCategory}">
        </div>

        <!-- Meta Grid (Fach & Datum) -->
        <div class="sf-modal-grid-2">
          <div class="sf-modal-field">
            <label class="sf-modal-label">Schulfach:</label>
            <select id="sfEditSubject" class="sf-modal-select">
              ${SF_SUBJECT_OPTIONS.map(s => `
                <option value="${s.code}" ${entry.subjectCode === s.code ? 'selected' : ''}>${s.short}</option>
              `).join('')}
            </select>
          </div>
          <div class="sf-modal-field">
            <label class="sf-modal-label">Datum:</label>
            <input type="text" id="sfEditDate" class="sf-modal-input" value="${escapeHtml(entry.date)}">
          </div>
        </div>

        <!-- Title Field -->
        <div class="sf-modal-field">
          <label class="sf-modal-label">Titel / Stichwort:</label>
          <input type="text" id="sfEditTitle" class="sf-modal-input sf-modal-title-input" value="${escapeHtml(entry.title)}">
        </div>

        <!-- Content Field -->
        <div class="sf-modal-field">
          <label class="sf-modal-label">Notiztext:</label>
          <textarea id="sfEditContent" class="sf-modal-textarea" rows="7">${escapeHtml(entry.content || '')}</textarea>
        </div>

      </div>

      <!-- Modal Footer -->
      <div class="sf-modal-foot">
        <button class="sf-btn-modal-cancel" onclick="closeSfEditModal()">Abbrechen</button>
        <button class="sf-btn-modal-save" onclick="saveEditedEntry()">Änderungen speichern</button>
      </div>

    </div>
  `;
  modal.style.display = 'flex';
}

function setModalEditCategory(cat) {
  const input = document.getElementById('sfEditCategory');
  if (input) input.value = cat;

  const modal = document.getElementById('sfEditModal');
  if (modal) {
    modal.querySelectorAll('.sf-cat-btn').forEach(btn => btn.classList.remove('active'));
    const activeBtn = modal.querySelector(`.btn-cat-${cat}`);
    if (activeBtn) activeBtn.classList.add('active');
  }
}

function closeSfEditModal() {
  const modal = document.getElementById('sfEditModal');
  if (modal) modal.style.display = 'none';
}

function saveEditedEntry() {
  if (!CURRENT_SF_EDIT_ID) return;
  const entries = getSfJournalEntries();
  const idx = entries.findIndex(e => e.id === CURRENT_SF_EDIT_ID);
  if (idx === -1) return;

  const title = document.getElementById('sfEditTitle').value.trim();
  const date = document.getElementById('sfEditDate').value.trim();
  const category = document.getElementById('sfEditCategory').value;
  const subjectCode = document.getElementById('sfEditSubject').value;
  const content = document.getElementById('sfEditContent').value.trim();

  let categoryName = 'Unterricht';
  if (category === 'ki') categoryName = 'KI-Nutzung';
  if (category === 'themen') categoryName = 'Themenfindung';
  if (category === 'news') categoryName = 'KI-News';

  entries[idx].title = title || 'Ohne Titel';
  entries[idx].date = date || getTodayGermanShortDate();
  entries[idx].category = category;
  entries[idx].categoryName = categoryName;
  entries[idx].subjectCode = subjectCode;
  entries[idx].content = content;

  saveSfJournalEntries(entries);
  closeSfEditModal();
  showSfToast("Änderungen gespeichert");
  renderSeminarfachView();
}

// --- 8. ISERV PDF EXPORT ---
function exportSfJournalPDF() {
  window.print();
}

// Initialize on DOM ready if tab is active
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('seminarfachRoot')) {
    renderSeminarfachView();
  }
});
