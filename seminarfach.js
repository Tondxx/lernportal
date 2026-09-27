// =========================================================================
// SEMINARFACH 4 (Abi28 sf4 • Herr Jatzeck) • KÜNSTLICHE INTELLIGENZ
// MINIMALISTISCHES, CLEANES OBERSTUFEN-TAGEBUCH (GOODNOTES-STYLE)
// Jahrgang 12 • IGS Göttingen • Tonda Beutler
// =========================================================================

// --- 1. SCHULFACH-OPTIONEN ---
const SF_SUBJECT_OPTIONS = [
  { code: 'sf4', name: 'Seminarfach 4: KI (Hr. Jatzeck)', short: 'sf4 Seminarfach', color: '#8b5cf6', icon: '🤖' },
  { code: 'MA11', name: 'Mathematik LK (Fr. Meyer)', short: 'Mathe LK', color: '#ef4444', icon: '📐' },
  { code: 'PH12', name: 'Physik LK (Hr. Lohse)', short: 'Physik LK', color: '#3b82f6', icon: '⚡' },
  { code: 'IF13', name: 'Informatik LK (Hr. Trittmacher)', short: 'Informatik LK', color: '#10b981', icon: '💻' },
  { code: 'pw25', name: 'Politik-Wirtschaft (Hr. Hoffmann)', short: 'Politik gA', color: '#f59e0b', icon: '⚖️' },
  { code: 'de48', name: 'Deutsch (Fr. Heinrich)', short: 'Deutsch gA', color: '#ec4899', icon: '📖' },
  { code: 'en39', name: 'Englisch (Hr. Westphal)', short: 'Englisch gA', color: '#06b6d4', icon: '🌍' },
  { code: 'ge27', name: 'Geschichte (Hr. Weinert)', short: 'Geschichte gA', color: '#d97706', icon: '🏛️' },
  { code: 'allg', name: 'Allgemein / Freie Reflexion', short: 'Allgemein', color: '#64748b', icon: '📝' }
];

// --- 2. TONDAS ECHTE TAGEBUCH-EINTRÄGE (DIREKT AUS GOODNOTES) ---
const DEFAULT_SF_JOURNAL = [
  {
    id: "sf-1",
    date: "14.09.26",
    category: "unterricht",
    categoryName: "🏫 Unterricht",
    subjectCode: "sf4",
    title: "Y-Lab Nachbesprechung & Journal-Anfang",
    content: "Ergebnisse über Ylab ausgetauscht, da nur so wenige da waren.\n\nJournal anlegen und erste Informationen, wie die Infos übers Ylab eintragen.\n\nAllgemein gesagt bekommen, was so der Plan ist.\n\nAllgemein nicht super spannend, und das Ylab scheint sich nicht so gelohnt zu haben."
  },
  {
    id: "sf-2",
    date: "14.09.26",
    category: "themen",
    categoryName: "💡 Themenfindung",
    subjectCode: "sf4",
    title: "Kriterien für Facharbeit & Themenfindung (Y-Lab)",
    content: "Facharbeiten sind geeignet für das Erstellen einer wissenschaftlichen Arbeit.\n\nEigenschaften einer guten Arbeit:\n• Objektiv\n• Eigenständig\n• Systematisch\n• Klarer Stil\n• Beitrag zur Wissenschaft\n\nThemenfindung:\n• Thema muss mich interessieren\n• Gut eingegrenzt (ein klares Thema)\n• Es beinhaltet eine Fragestellung von uns\n• Primärquellen"
  },
  {
    id: "sf-3",
    date: "21.09.26",
    category: "unterricht",
    categoryName: "🏫 Unterricht",
    subjectCode: "sf4",
    title: "Ansage zur Arbeitsmoral & Journal-Führung",
    content: "Ansage bekommen, weil unsere Arbeitsmoral auf dem falschen Stand ist.\n\nJournal wird noch nicht richtig geführt.\n\nLeichte Inspiration, über was wir unsere Seminarfacharbeit so machen könnten.\n\nJournal fertig machen."
  },
  {
    id: "sf-4",
    date: "21.09.26",
    category: "ki",
    categoryName: "🤖 KI-Nutzung",
    subjectCode: "sf4",
    title: "Gedanken zur negativen Stimmung über KI",
    content: "Ich merke sehr viel negative Energie über KI, was irgendwo verständlich ist. Aber einfach zu sagen, KI ist schlimm und sie muss weg, ist nicht die Lösung, weil sie erstens unrealistisch ist und zweitens meiner Meinung nach nicht der schlauste Weg ist, da es durchaus eine nützliche Sache sein kann."
  },
  {
    id: "sf-5",
    date: "26.08.26",
    category: "unterricht",
    categoryName: "🏫 Unterricht",
    subjectCode: "sf4",
    title: "Harald Lesch Video: Stochastische Papageien",
    content: "Im Unterricht bei Herrn Jatzeck den Harald-Lesch-Beitrag geschaut. Kernaussage: LLMs wie ChatGPT verstehen keine Semantik, sondern berechnen rein statistisch das wahrscheinlichste Folgewort ('Stochastische Papageien').\n\nFür die Schule bedeutet das: Wer KI als fertigen Lösungsautomaten nutzt, lernt nichts. Wir müssen die KI durch gezielte Rückfragen herausfordern, damit echtes Verständnis im Kopf entsteht."
  },
  {
    id: "sf-6",
    date: "09.09.26",
    category: "ki",
    categoryName: "🤖 KI-Nutzung",
    subjectCode: "sf4",
    title: "Schulumfrage zur KI-Nutzung im 11./12. Jahrgang",
    content: "Ergebnisse unserer Schulumfrage an der IGS ausgewertet:\nFast 90% der Oberstufe nutzen KI wöchentlich, aber fast ausnahmslos für schnelles Copy-Paste bei Hausaufgaben (Cognitive Offloading). Kaum jemand lässt sich den Rechenweg erklären oder stellt Rückfragen.\n\nDas bringt mich auf eine gute Fragestellung für meine Seminarfacharbeit: Wie kann KI als sokratischer Tutor helfen, statt nur das eigene Denken abzuschalten?"
  },
  {
    id: "sf-7",
    date: "17.09.26",
    category: "themen",
    categoryName: "💡 Themenfindung",
    subjectCode: "sf4",
    title: "SUB-Bibliotheksausweis Göttingen beantragt",
    content: "Anmeldeformular für den Ausweis der SUB Göttingen (Zentralbibliothek Platz der Göttinger Sieben) ausgefüllt. Im Oktober hole ich ihn ab, um Fachliteratur zu Kognitionspsychologie (Sweller Cognitive Load) und selbstgesteuertem Lernen auszuleihen."
  }
];

// LocalStorage Keys
const SF_STORAGE_KEY = 'tonda_sf_diary_entries_v2';

// State
let currentSfTab = 'alle'; // 'alle' | 'unterricht' | 'ki' | 'themen'
let currentSfSearch = '';

// --- HELPER FUNCTIONS ---
function getSfJournalEntries() {
  try {
    const raw = localStorage.getItem(SF_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.error("Fehler beim Laden des Tagebuchs:", e);
  }
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

// --- 3. MAIN RENDERER (AUTHENTIC HARDCOVER TAGEBUCH) ---
function renderSeminarfachView() {
  const root = document.getElementById('seminarfachRoot');
  if (!root) return;

  const entries = getSfJournalEntries();

  // Counts per category
  const countAll = entries.length;
  const countUnterricht = entries.filter(e => e.category === 'unterricht').length;
  const countKi = entries.filter(e => e.category === 'ki').length;
  const countThemen = entries.filter(e => e.category === 'themen').length;

  root.innerHTML = `
    <!-- Top Action Toolbar (Super Clean) -->
    <div class="sf-clean-topbar">
      <div class="sf-clean-topbar-left">
        <span class="sf-clean-title-badge">📔 Tondas Tagebuch</span>
        <span class="sf-clean-sub-badge">Seminarfach KI &bull; Hr. Jatzeck &bull; IGS Göttingen (Jg. 12)</span>
      </div>
      <div class="sf-clean-topbar-right">
        <button class="sf-btn sf-btn-pdf" onclick="exportSfJournalPDF()" title="Druckfertiges A4-PDF für die IServ-Abgabe exportieren">
          📄 PDF für IServ
        </button>
        <button class="sf-btn sf-btn-ghost" onclick="focusSfCleanInserter()" title="Direkt neue Notiz verfassen">
          ✍️ Neue Notiz
        </button>
        <button class="sf-btn sf-btn-ghost" onclick="resetSfJournalDefaults()" title="Standard-Notizen wiederherstellen">
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
            <span class="sf-spine-gold-title">📖 TONDA BEUTLER &bull; OBERSTUFE JAHRGANG 12 &bull; TAGEBUCH</span>
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
            
            <!-- Minimalistischer Header der Buchseite -->
            <div class="sf-gn-page-header">
              <div class="sf-gn-header-top">
                <span class="sf-gn-school-stamp">IGS GÖTTINGEN &bull; GYMNASIALE OBERSTUFE (ABI 2028)</span>
                <span class="sf-gn-date-stamp">${getTodayGermanShortDate()}</span>
              </div>
              <h1 class="sf-gn-main-title">${getPageTitleForTab(currentSfTab)}</h1>
              <p class="sf-gn-sub-title">Persönliche Notizen, Unterrichtsverlauf und Gedanken zum KI-Lernen</p>

              <!-- Clean 4-Pill Category Bar on the page -->
              <div class="sf-gn-category-tabs">
                <button class="sf-gn-pill ${currentSfTab === 'alle' ? 'active' : ''}" onclick="switchSfTab('alle')">
                  📖 Alle Einträge (${countAll})
                </button>
                <button class="sf-gn-pill ${currentSfTab === 'unterricht' ? 'active' : ''}" onclick="switchSfTab('unterricht')">
                  🏫 Was in den Stunden war (${countUnterricht})
                </button>
                <button class="sf-gn-pill ${currentSfTab === 'ki' ? 'active' : ''}" onclick="switchSfTab('ki')">
                  🤖 Wie ich aktuell KI nutze (${countKi})
                </button>
                <button class="sf-gn-pill ${currentSfTab === 'themen' ? 'active' : ''}" onclick="switchSfTab('themen')">
                  💡 Themenfindung (${countThemen})
                </button>
              </div>
            </div>

            <!-- ULTRA-CLEAN INLINE NOTE INSERTER (Direkt auf den Linien schreiben) -->
            ${renderCleanNoteInserterHtml()}

            <!-- ENTRIES CONTAINER -->
            <div id="sfEntriesContainer" class="sf-gn-entries-list">
              ${renderFilteredEntriesHtml()}
            </div>

          </div>

        </div>

        <!-- 4 Register-Reiter am rechten Buchrand (Klar, groß & clean) -->
        <div class="sf-book-index-tabs">
          <button class="sf-index-tab ${currentSfTab === 'alle' ? 'active' : ''}" onclick="switchSfTab('alle')" title="Alle Notizen">
            <span class="tab-icon">📖</span>
            <span class="tab-text">Alle</span>
            <span class="tab-badge">${countAll}</span>
          </button>
          <button class="sf-index-tab ${currentSfTab === 'unterricht' ? 'active' : ''}" onclick="switchSfTab('unterricht')" title="Was in den Stunden passiert ist">
            <span class="tab-icon">🏫</span>
            <span class="tab-text">Stunden</span>
            <span class="tab-badge">${countUnterricht}</span>
          </button>
          <button class="sf-index-tab ${currentSfTab === 'ki' ? 'active' : ''}" onclick="switchSfTab('ki')" title="Wie ich aktuell KI nutze">
            <span class="tab-icon">🤖</span>
            <span class="tab-text">KI</span>
            <span class="tab-badge">${countKi}</span>
          </button>
          <button class="sf-index-tab ${currentSfTab === 'themen' ? 'active' : ''}" onclick="switchSfTab('themen')" title="Themenfindung & Ideen">
            <span class="tab-icon">💡</span>
            <span class="tab-text">Themen</span>
            <span class="tab-badge">${countThemen}</span>
          </button>
        </div>

      </div>
    </div>
  `;
}

function getPageTitleForTab(tab) {
  if (tab === 'unterricht') return '🏫 Was in den Stunden stattgefunden hat';
  if (tab === 'ki') return '🤖 Wie ich aktuell KI nutze & Gedanken dazu';
  if (tab === 'themen') return '💡 Themenfindung & Ideen für die Seminararbeit';
  return '📖 Mein Tagebuch & Schul-Notizen';
}

function switchSfTab(tab) {
  currentSfTab = tab;
  renderSeminarfachView();
}

// --- 4. ULTRA-CLEAN INLINE NOTE INSERTER (GOODNOTES STYLE) ---
function renderCleanNoteInserterHtml() {
  const defaultCategory = (currentSfTab === 'alle') ? 'unterricht' : currentSfTab;

  return `
    <div class="sf-clean-note-inserter" id="sfCleanInserter">
      <div class="sf-inserter-header">
        <div class="sf-inserter-title">
          <span>✍️</span> <strong>Neue Notiz aufschreiben</strong>
        </div>
        <div class="sf-inserter-date-stamp">
          <input type="text" id="sfInlineDate" class="sf-gn-date-input" value="${getTodayGermanShortDate()}" title="Datum der Notiz">
        </div>
      </div>

      <div class="sf-inserter-controls-row">
        <div class="sf-inserter-field">
          <label>Kategorie:</label>
          <select id="sfInlineCategory" class="sf-gn-select">
            <option value="unterricht" ${defaultCategory === 'unterricht' ? 'selected' : ''}>🏫 Was in den Stunden passiert ist</option>
            <option value="ki" ${defaultCategory === 'ki' ? 'selected' : ''}>🤖 Wie ich aktuell KI nutze & Gedanken</option>
            <option value="themen" ${defaultCategory === 'themen' ? 'selected' : ''}>💡 Themenfindung & Ideen für Seminararbeit</option>
          </select>
        </div>

        <div class="sf-inserter-field">
          <label>Schulfach:</label>
          <select id="sfInlineSubject" class="sf-gn-select">
            ${SF_SUBJECT_OPTIONS.map(s => `<option value="${s.code}">${s.icon} ${s.short}</option>`).join('')}
          </select>
        </div>
      </div>

      <div class="sf-inserter-title-wrap">
        <input type="text" id="sfInlineTitle" class="sf-gn-title-input" 
               placeholder="Stichwort / Titel (z. B. Was heute im Unterricht passiert ist)...">
      </div>

      <div class="sf-inserter-content-wrap">
        <textarea id="sfInlineContent" class="sf-gn-textarea" rows="4" 
                  placeholder="Schreibe hier frei und unbeschwert deine Notizen auf (genau wie in Goodnotes)..."></textarea>
      </div>

      <!-- Optionale Details für Herrn Jatzeck / IServ (Dezent eingeklappt) -->
      <div class="sf-inserter-details-toggle">
        <details>
          <summary>🔬 Kriterien für Herrn Jatzeck &amp; IServ ergänzen (Prompt, Modell, Reflexion)</summary>
          <div class="sf-gn-details-grid">
            <div>
              <label class="sf-sub-label">Genutztes Tool / Modell:</label>
              <input type="text" id="sfInlineModel" class="sf-gn-input" placeholder="z. B. ChatGPT-4o, Claude 3.5, Gemini">
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
          <span>✍️</span> <strong>Notiz ins Tagebuch eintragen</strong>
        </button>
      </div>
    </div>
  `;
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

  let categoryName = '🏫 Unterricht';
  if (category === 'ki') categoryName = '🤖 KI-Nutzung';
  if (category === 'themen') categoryName = '💡 Themenfindung';

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

  // Prepend to top so newest is first
  entries.unshift(newEntry);
  saveSfJournalEntries(entries);
  showSfToast("Notiz sauber im Tagebuch verewigt! 📖✨");
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

// --- 6. RENDER FILTERED ENTRIES (LIKE GOODNOTES PAGES) ---
function renderFilteredEntriesHtml() {
  const allEntries = getSfJournalEntries();
  
  let filtered = allEntries;
  if (currentSfTab !== 'alle') {
    filtered = allEntries.filter(e => e.category === currentSfTab);
  }

  if (filtered.length === 0) {
    return `
      <div class="sf-gn-empty">
        <p>In dieser Kategorie sind noch keine Notizen eingetragen.</p>
        <button class="sf-btn-gn-save" onclick="focusSfCleanInserter()">✍️ Erste Notiz schreiben</button>
      </div>
    `;
  }

  return filtered.map(e => {
    const subj = SF_SUBJECT_OPTIONS.find(s => s.code === e.subjectCode) || SF_SUBJECT_OPTIONS[0];

    return `
      <article class="sf-gn-entry-sheet" id="entry-${e.id}">
        
        <!-- Top Metadata Row (Header with Handwritten Date on Right) -->
        <div class="sf-gn-entry-header">
          <div class="sf-gn-entry-badges">
            <span class="sf-gn-cat-pill sf-cat-${e.category || 'unterricht'}">
              ${escapeHtml(e.categoryName || '🏫 Unterricht')}
            </span>
            <span class="sf-gn-subj-pill" style="color: ${subj.color}; background: ${subj.color}15; border: 1px solid ${subj.color}35;">
              ${subj.icon} ${subj.short}
            </span>
          </div>
          
          <div class="sf-gn-entry-right">
            <!-- Handwritten-style Date Stamp -->
            <span class="sf-gn-handwritten-date">${escapeHtml(e.date)}</span>
            <button class="sf-gn-btn-icon" onclick="openSfEditEntryModal('${e.id}')" title="Notiz bearbeiten">✏️</button>
            <button class="sf-gn-btn-icon" onclick="deleteSfEntry('${e.id}')" title="Notiz löschen">🗑️</button>
          </div>
        </div>

        <!-- Clean Title directly on lines -->
        <h2 class="sf-gn-entry-title">${escapeHtml(e.title)}</h2>

        <!-- Clean Content Text matching Notebook lines -->
        <div class="sf-gn-entry-body">
          ${formatNotebookText(e.content)}
        </div>

        <!-- Optional Science / Prompt Info if present -->
        ${(e.prompt || e.model) ? `
          <div class="sf-gn-entry-footer-meta">
            ${e.model ? `<span>🤖 Modell: <strong>${escapeHtml(e.model)}</strong></span>` : ''}
            ${e.prompt ? `<span>💬 Prompt: <em>„${escapeHtml(e.prompt)}“</em></span>` : ''}
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
  showSfToast("Eintrag gelöscht 🗑️");
  renderSeminarfachView();
}

function resetSfJournalDefaults() {
  if (!confirm("Möchtest du das Tagebuch auf die Original-Notizen zurücksetzen?")) return;
  saveSfJournalEntries(DEFAULT_SF_JOURNAL);
  showSfToast("Standard-Notizen wiederhergestellt 🔄");
  renderSeminarfachView();
}

// --- 7. MODAL FOR EDITING EXISTING ENTRIES ---
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
    modal.className = 'portal-modal-backdrop';
    modal.onclick = (e) => {
      if (e.target === modal) closeSfEditModal();
    };
    document.body.appendChild(modal);
  }

  modal.innerHTML = `
    <div class="portal-modal-content sf-entry-modal" onclick="event.stopPropagation()">
      <div class="modal-header">
        <h3 style="margin: 0;">✏️ Notiz bearbeiten</h3>
        <button class="modal-close-btn" onclick="closeSfEditModal()">&times;</button>
      </div>
      <div class="modal-body" style="padding: 1.2rem 1.5rem;">
        <div class="sf-form-grid">
          <div class="sf-form-group full-width">
            <label class="sf-form-label">Titel / Stichwort</label>
            <input type="text" id="sfEditTitle" class="sf-form-input" value="${escapeHtml(entry.title)}">
          </div>
          <div class="sf-form-group">
            <label class="sf-form-label">Datum</label>
            <input type="text" id="sfEditDate" class="sf-form-input" value="${escapeHtml(entry.date)}">
          </div>
          <div class="sf-form-group">
            <label class="sf-form-label">Kategorie</label>
            <select id="sfEditCategory" class="sf-form-select">
              <option value="unterricht" ${entry.category === 'unterricht' ? 'selected' : ''}>🏫 Was in den Stunden passiert ist</option>
              <option value="ki" ${entry.category === 'ki' ? 'selected' : ''}>🤖 Wie ich aktuell KI nutze</option>
              <option value="themen" ${entry.category === 'themen' ? 'selected' : ''}>💡 Themenfindung &amp; Ideen</option>
            </select>
          </div>
          <div class="sf-form-group full-width">
            <label class="sf-form-label">Notiztext</label>
            <textarea id="sfEditContent" class="sf-form-textarea" rows="6">${escapeHtml(entry.content || '')}</textarea>
          </div>
        </div>
      </div>
      <div class="modal-footer" style="padding: 1rem 1.5rem; display: flex; justify-content: flex-end; gap: 0.6rem;">
        <button class="btn-back-nav" onclick="closeSfEditModal()">Abbrechen</button>
        <button class="sf-btn sf-btn-primary" onclick="saveEditedEntry()">💾 Änderungen speichern</button>
      </div>
    </div>
  `;
  modal.style.display = 'flex';
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
  const content = document.getElementById('sfEditContent').value.trim();

  let categoryName = '🏫 Unterricht';
  if (category === 'ki') categoryName = '🤖 KI-Nutzung';
  if (category === 'themen') categoryName = '💡 Themenfindung';

  entries[idx].title = title || 'Ohne Titel';
  entries[idx].date = date || getTodayGermanShortDate();
  entries[idx].category = category;
  entries[idx].categoryName = categoryName;
  entries[idx].content = content;

  saveSfJournalEntries(entries);
  closeSfEditModal();
  showSfToast("Änderungen gespeichert! ✍️");
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
