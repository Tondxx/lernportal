// =========================================================================
// Global Navigation, Theming & Hub Router for Tonda's Learning Dashboard
// Supports:
// 1. Dashboard (Overview of today's schedule, upcoming exams, quickstart)
// 2. Fächer (Comprehensive catalog of all grade 12 courses)
// 3. Fach-Detail (Catalog of topics & modules per subject)
// 4. Topic Workspace (Isolated single-topic learning modules)
// 5. Klausurplan & Stundenplan
// 6. Apple-style Dual Theme (Light / Dark) & Breadcrumb navigation
// =========================================================================

// --- 1. COURSES & TOPICS DATABASE ---
const FAECHER_DATA = {
  mathe: {
    id: 'mathe',
    name: 'Mathematik eA',
    courseCode: 'MA11',
    type: 'LK (erhöhtes Anforderungsniveau)',
    teacher: 'Mey',
    room: 'R2',
    color: '#38bdf8',
    icon: '📐',
    examStatus: '✅ 1. Klausur am 11.09. geschrieben • Archiv & Training',
    desc: 'Analysis, Kurvenanpassung, Steckbriefaufgaben, Funktionsscharen, LGS & Gauß-Verfahren, Trassierung.',
    topics: [
      {
        id: 'mathe-steckbrief',
        num: '01',
        title: 'Steckbrief-Bedingungen (S. 18)',
        badge: 'Buch S. 18',
        desc: 'Textvorgaben (Hochpunkte, Wendepunkte, Sattelpunkte, Tangenten) präzise in mathematische Gleichungen übersetzen mit interaktivem Übungs-Drill.'
      },
      {
        id: 'mathe-schar',
        num: '02',
        title: 'Funktionsscharen (d = t & A2)',
        badge: 'Plotter & Slider',
        desc: 'Interaktiver Scharen-Plotter mit dynamischem t-Schieberegler, Ableitungsgraphen und algebraischen Schritt-für-Schritt-Lösungen.'
      },
      {
        id: 'mathe-matrizen',
        num: '03',
        title: 'LGS & Matrizen (S. 46 & Gauß)',
        badge: '3-Wege-Matching',
        desc: 'Interaktives Zuordnungsspiel zwischen linearen Gleichungssystemen, erweiterten Koeffizientenmatrizen und Graphen (3 Levels).'
      },
      {
        id: 'mathe-trassierung',
        num: '04',
        title: 'Trassierung (Knick- & Sprungfrei)',
        badge: 'Interaktiver Canvas',
        desc: 'Rampen- und Trassenübergänge knickfrei (gleiche Steigung) und sprungfrei (gleicher Funktionswert) mit interaktiver Canvas-Simulation konstruieren.'
      }
    ]
  },
  politik: {
    id: 'politik',
    name: 'Politik-Wirtschaft gA',
    courseCode: 'pw25',
    type: 'gA (grundlegendes Anforderungsniveau)',
    teacher: 'Hf',
    room: 'R1',
    color: '#34d399',
    icon: '🏛️',
    examStatus: '🚨 KLAUSUR MORGEN (Di, 15.09., 1. Std., R1)',
    desc: 'Politische Partizipation (konventionell vs. unkonventionell, ziviler Ungehorsam), Wahlen & Wahlrechtsgrundsätze, Funktionen von Partizipation, AFB I-III Operatoren.',
    topics: [
      {
        id: 'politik-operatoren',
        num: '01',
        title: 'Die 3 Klausuraufgaben & Operatoren',
        badge: 'AFB I - III',
        desc: 'Aufgabe 1: Zusammenfassen (AFB I), Aufgabe 2: Erläutern (AFB II) und Aufgabe 3: Sich auseinandersetzen (AFB III) mit Punkteschlüssel und Formulierungsleitfaden.'
      },
      {
        id: 'politik-urteil',
        num: '02',
        title: 'Die Urteils-Matrix (Sach- vs. Werturteil)',
        badge: 'Aufgabe 3 Urteil',
        desc: 'Prüfungsrelevante Kriterien für Aufgabe 3: Effizienz & Machbarkeit (Sachurteil) versus Legitimität & Grundwerte (Werturteil) mit Formulierungshilfen.'
      },
      {
        id: 'politik-flashcards',
        num: '03',
        title: '3D-Begriffstrainer (Karteikarten)',
        badge: '8 Karteikarten',
        desc: 'Interaktive Karteikarten mit Wendeeffekt zum Einprägen aller Schlüsselbegriffe und Definitionen für die morgige Klausur.'
      },
      {
        id: 'politik-spickzettel',
        num: '04',
        title: 'Der große Klausur-Spickzettel',
        badge: 'Kompendium',
        desc: 'Strukturierte Übersicht zu Formen der Partizipation, Art. 38 GG Wahlgrundsätzen, den 5 Wahlfunktionen und dem Partizipationsparadoxon.'
      },
      {
        id: 'politik-notizen',
        num: '05',
        title: 'Eigener Klausur-Merkzettel',
        badge: 'Auto-Save',
        desc: 'Digitaler Notizblock mit automatischer Speicherung für deine persönlichen Merksätze, Beispiele und Formulierungen vor der Arbeit.'
      }
    ]
  },
  physik: {
    id: 'physik',
    name: 'Physik eA',
    courseCode: 'PH12',
    type: 'LK (erhöhtes Anforderungsniveau)',
    teacher: 'Lh',
    room: 'NW1',
    color: '#818cf8',
    icon: '⚡',
    examStatus: '🚨 KLAUSUR ÜBERMORGEN (Fr, 18.09., 1. Std., NW1)',
    desc: 'Elektrische & Magnetische Felder, Coulomb-Gesetz, Feldstärke, Plattenkondensator, Schaltkreise, Messwert-Auswertung.',
    stations: [
      {
        id: 'station-klausur',
        title: 'Station A: ⚡ Klausur-Express & Spickzettel',
        subtitle: 'Höchste Priorität für Freitag (18.09., 1. Std., NW1) &bull; Formelsammlung & Messwert-Auswertung',
        color: '#6366f1',
        themeClass: 'station-theme-klausur',
        icon: '📌',
        badge: '🚨 Priorität 1 für Freitag',
        topics: [
          {
            id: 'physik-spickzettel',
            num: '01',
            title: 'Kompakt-Spickzettel & Die 5 Klausurfallen',
            badge: 'Formelsammlung',
            desc: 'Alle zentralen Formeln (FC, E, C, W, Q), Naturkonstanten (eps0, e, me), Einheiten-Umrechnung und die 5 häufigsten Rechenfallen.'
          },
          {
            id: 'physik-auswertung',
            num: '02',
            title: 'Messwerte auswerten & Linearisierung (AB06 & AB08)',
            badge: 'AB06 & AB08 Gelöst',
            desc: 'Steigungsdreieck, Bestimmung von eps0 aus Messreihen und Bestimmung der Kondensatorladung Q durch Flächenzählung unter dem I(t)-Graphen.'
          },
          {
            id: 'physik-notizen',
            num: '03',
            title: 'Digitaler Klausur-Merkzettel (Auto-Save)',
            badge: 'Auto-Save',
            desc: 'Dein persönlicher Notizblock für letzte Merksätze, Formeln und Rechenschritte mit automatischer lokaler Speicherung.'
          }
        ]
      },
      {
        id: 'station-felder',
        title: 'Station B: 🧲 Elektrostatik & Elektrisches Feld',
        subtitle: 'Ladungsträger, Influenz, Faradayscher Käfig & Plattenkondensator mit Simulationen',
        color: '#06b6d4',
        themeClass: 'station-theme-felder',
        icon: '⚡',
        badge: 'Felder & Ladungen',
        topics: [
          {
            id: 'physik-elektrostatik',
            num: '04',
            title: 'Elektrostatik, Influenz & Elektroskop',
            badge: 'Simulator + Übungen',
            desc: 'Interaktiver Elektroskop-Simulator: Annäherung des Stabs, Ladungstrennung im Metall, Zeigerausschlag alpha und Erdung mit Hand.'
          },
          {
            id: 'physik-efeld',
            num: '05',
            title: 'Elektrisches Feld & Plattenkondensator',
            badge: 'Simulator + Übungen',
            desc: 'Interaktiver Kondensator-Simulator mit live variabler Feldliniendichte (E = U/d) und Elektronenstrahl-Ablenkung auf Parabelbahn.'
          }
        ]
      },
      {
        id: 'station-coulomb',
        title: 'Station C: ⚖️ Coulombsches Gesetz & Schaltungen',
        subtitle: 'Coulomb-Kräfte, Kräftedreieck am Fadenpendel (AB10 Aufgaben 1–5 komplett) & Entladekurve',
        color: '#f59e0b',
        themeClass: 'station-theme-coulomb',
        icon: '⚖️',
        badge: 'Kräfte & Stromkreise',
        topics: [
          {
            id: 'physik-coulomb',
            num: '06',
            title: 'Coulombsches Gesetz & Kräftedreieck (AB10 1–5 gelöst)',
            badge: 'Vektor-Simulator',
            desc: 'Interaktiver Vektor-Simulator mit Schiebereglern für Q1, Q2, r und komplett durchgerechnete Lösungen für alle 5 AB10-Unterrichtsaufgaben.'
          },
          {
            id: 'physik-schaltungen',
            num: '07',
            title: 'Elektrische Grundschaltungen & Entladekurven',
            badge: 'I(t)-Plotter',
            desc: 'Knoten- und Maschenregel, Reihen-/Parallelschaltung und interaktiver Kondensator-Entladekurven-Plotter mit Flächenintegral Q.'
          }
        ]
      }
    ],
    // Flat list for lookups
    get topics() {
      const all = [];
      if (this.stations) {
        this.stations.forEach(st => {
          (st.topics || []).forEach(t => all.push(t));
        });
      }
      return all;
    }
  },
  informatik: {
    id: 'informatik',
    name: 'Informatik eA',
    courseCode: 'IF13',
    type: 'LK (erhöhtes Anforderungsniveau)',
    teacher: 'Tri',
    room: 'PC Sek2',
    color: '#06b6d4',
    icon: '💻',
    examStatus: '⏳ Klausur am Freitag, 25.09.2026 (3. Std.)',
    desc: 'Algorithmen, Datenstrukturen (Listen, Bäume), Objektorientierte Modellierung, Komplexität.',
    topics: [
      {
        id: 'info-klausur',
        num: '01',
        title: 'Klausur-Fokus: Datenstrukturen & Algorithmen',
        badge: 'Klausur 25.09.',
        desc: 'OOP-Klassendiagramme, Rekursion und praktische Programmieraufgaben.'
      }
    ]
  },
  deutsch: {
    id: 'deutsch',
    name: 'Deutsch gA',
    courseCode: 'de48',
    type: 'gA (grundlegendes Anforderungsniveau)',
    teacher: 'Hh',
    room: 'R3',
    color: '#f43f5e',
    icon: '📖',
    examStatus: '⏳ Klausur am Freitag, 09.10.2026 (3. Std., R3)',
    desc: 'Dramenanalyse, Epochenumbruch 18./19. Jahrhundert, Rhetorische Mittel, Argumentation.',
    topics: [
      {
        id: 'deutsch-klausur',
        num: '01',
        title: 'Klausur-Fokus: Dramenanalyse & Operatoren',
        badge: 'Klausur 09.10.',
        desc: 'Szenenanalyse, Regieanweisungen, Dialoganalyse und Epochenkontexte.'
      }
    ]
  },
  englisch: {
    id: 'englisch',
    name: 'Englisch gA',
    courseCode: 'en39',
    type: 'gA (grundlegendes Anforderungsniveau)',
    teacher: 'Wv',
    room: 'E3',
    color: '#ec4899',
    icon: '🌍',
    examStatus: '⏳ Klausur am Mittwoch, 18.11.2026 (3. Std., E3)',
    desc: 'Visions of the Future, Utopia vs. Dystopia, Reading Comprehension, Mediation, Essay Writing.',
    topics: [
      {
        id: 'englisch-klausur',
        num: '01',
        title: 'Klausur-Fokus: Dystopia & Analysis',
        badge: 'Klausur 18.11.',
        desc: 'Stylistic devices, structure of an analytical text, and mediation techniques.'
      }
    ]
  },
  geschichte: {
    id: 'geschichte',
    name: 'Geschichte gA',
    courseCode: 'ge27',
    type: 'gA (grundlegendes Anforderungsniveau)',
    teacher: 'Wn',
    room: 'R4',
    color: '#eab308',
    icon: '📜',
    examStatus: '⏳ Klausur am Montag, 14.12.2026 (3. Std., R4)',
    desc: 'Die Weimarer Republik: Krisenjahre 1919-1923, Goldene Zwanziger, Niedergang & Ursachen.',
    topics: [
      {
        id: 'geschichte-klausur',
        num: '01',
        title: 'Klausur-Fokus: Weimarer Republik',
        badge: 'Klausur 14.12.',
        desc: 'Quellenkritik, historische Urteilsbildung und Ursachenbündel der Krise.'
      }
    ]
  },
  ds: {
    id: 'ds',
    name: 'Darstellendes Spiel',
    courseCode: 'ds26',
    type: 'gA (grundlegendes Anforderungsniveau)',
    teacher: 'Kl',
    room: 'TR',
    color: '#a855f7',
    icon: '🎭',
    examStatus: '⏳ Klausur am Donnerstag, 03.12.2026 (3. Std., TR)',
    desc: 'Körperausdruck, Raumkonzepte, Dramaturgie, Inszenierungsanalyse.',
    topics: [
      {
        id: 'ds-klausur',
        num: '01',
        title: 'Theorie & Praxis der Theaterformen',
        badge: 'Klausur 03.12.',
        desc: 'Theatraler Raum, Verfremdungseffekte und Spielanalyse.'
      }
    ]
  },
  sport: {
    id: 'sport',
    name: 'Sport gA',
    courseCode: 'sp15Z',
    type: 'gA (Sport)',
    teacher: 'Ln',
    room: 'G1',
    color: '#10b981',
    icon: '🏃',
    examStatus: 'Praktische & theoretische Leistungsüberprüfungen',
    desc: 'Leichtathletik, Mannschaftssportarten, Trainingslehre, Bewegungswissenschaft.',
    topics: [
      {
        id: 'sport-theorie',
        num: '01',
        title: 'Sportbiologie & Trainingsprinzipien',
        badge: 'Theorie',
        desc: 'Ausdauer-, Krafttraining und biomechanische Bewegungsanalyse.'
      }
    ]
  }
};

// --- 2. NAVIGATION STATE ---
const navState = {
  currentView: 'dashboard',
  currentFach: null,
  currentTopic: null,
  currentStation: null,
  history: []
};

// --- 3. THEME SWITCHING ENGINE ---
function getInitialTheme() {
  const saved = localStorage.getItem('tonda_portal_theme');
  if (saved === 'light' || saved === 'dark') return saved;
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
  return 'light';
}

function setTheme(themeName) {
  if (themeName !== 'light' && themeName !== 'dark') themeName = 'light';
  document.documentElement.setAttribute('data-theme', themeName);
  try {
    localStorage.setItem('tonda_portal_theme', themeName);
  } catch (e) {}

  const btnLight = document.getElementById('themeBtnLight');
  const btnDark = document.getElementById('themeBtnDark');
  if (btnLight) btnLight.classList.toggle('active', themeName === 'light');
  if (btnDark) btnDark.classList.toggle('active', themeName === 'dark');

  // Redraw canvas components that depend on colors
  if (typeof updateScharPlot === 'function') updateScharPlot();
  if (typeof drawTrassierungCanvas === 'function') drawTrassierungCanvas();
  if (typeof renderMatchingGraphs === 'function') renderMatchingGraphs();
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'light';
  setTheme(current === 'dark' ? 'light' : 'dark');
}

if (window.matchMedia) {
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!localStorage.getItem('tonda_portal_theme')) {
      setTheme(e.matches ? 'dark' : 'light');
    }
  });
}

// --- 4. CORE ROUTER & NAVIGATION CONTROLLER ---
function navigateTo(viewName, pushHistory = true) {
  if (pushHistory && navState.currentView !== viewName) {
    navState.history.push({
      view: navState.currentView,
      fach: navState.currentFach,
      topic: navState.currentTopic,
      station: navState.currentStation
    });
  }

  navState.currentView = viewName;
  if (viewName !== 'fach-detail' && viewName !== 'topic-workspace') {
    navState.currentFach = null;
    navState.currentTopic = null;
  navState.currentStation = null;
  }

  // Update top navbar buttons
  document.querySelectorAll('.nav-tab').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === viewName);
  });

  // Switch active view container
  document.querySelectorAll('.portal-view').forEach(v => {
    v.classList.remove('active-view');
  });

  const targetView = document.getElementById('view-' + viewName);
  if (targetView) targetView.classList.add('active-view');

  // Render view-specific content
  if (viewName === 'dashboard') {
    renderDashboard();
  } else if (viewName === 'faecher') {
    renderFaecherGrid();
  } else if (viewName === 'kalender') {
    if (typeof renderCalendarView === 'function') renderCalendarView();
  } else if (viewName === 'stundenplan') {
    if (typeof renderTimetable === 'function') renderTimetable();
  }

  updateBreadcrumbs();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function openFach(fachId, pushHistory = true) {
  if (!FAECHER_DATA[fachId]) return;

  if (pushHistory) {
    navState.history.push({
      view: navState.currentView,
      fach: navState.currentFach,
      topic: navState.currentTopic,
      station: navState.currentStation
    });
  }

  navState.currentView = 'fach-detail';
  navState.currentFach = fachId;
  navState.currentTopic = null;
  navState.currentStation = null;

  // Update navbar
  document.querySelectorAll('.nav-tab').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === 'faecher');
  });

  // Switch view
  document.querySelectorAll('.portal-view').forEach(v => v.classList.remove('active-view'));
  const targetView = document.getElementById('view-fach-detail');
  if (targetView) targetView.classList.add('active-view');

  renderFachDetail(fachId);
  initFachIservFolder(fachId);
  switchFachSubTab('themen');
  if (typeof userDB !== 'undefined') {
    userDB.getCountByFach(fachId).then(cnt => {
      const b = document.getElementById('fachUserDocsBadge');
      if (b) b.textContent = cnt;
    });
  }
  updateBreadcrumbs();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function openTopic(fachId, topicId, pushHistory = true) {
  const fach = FAECHER_DATA[fachId];
  if (!fach) return;

  if (pushHistory) {
    navState.history.push({
      view: navState.currentView,
      fach: navState.currentFach,
      topic: navState.currentTopic,
      station: navState.currentStation
    });
  }

  navState.currentView = 'topic-workspace';
  navState.currentFach = fachId;
  navState.currentTopic = topicId;
  // Link topic to its station for return navigation
  if (fach.stations) {
    const parentStation = fach.stations.find(st => (st.topics || []).some(t => t.id === topicId));
    if (parentStation) {
      navState.currentStation = parentStation.id;
    }
  }


  // Update navbar
  document.querySelectorAll('.nav-tab').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === 'faecher');
  });

  // Switch view
  document.querySelectorAll('.portal-view').forEach(v => v.classList.remove('active-view'));
  const wsView = document.getElementById('view-topic-workspace');
  if (wsView) wsView.classList.add('active-view');

  // Setup Workspace Header
  const topicObj = (fach.topics || []).find(t => t.id === topicId);
  const titleEl = document.getElementById('wsTopicTitle');
  const badgeEl = document.getElementById('wsFachBadge');
  const subEl = document.getElementById('wsTopicSubtitle');

  if (titleEl) titleEl.innerText = topicObj ? `${fach.icon} ${topicObj.title}` : `${fach.name} Thema`;
  if (badgeEl) {
    badgeEl.innerText = `${fach.courseCode} (${fach.type.split(' ')[0]})`;
    badgeEl.style.borderColor = fach.color;
    badgeEl.style.color = fach.color;
  }
  if (subEl) subEl.innerText = `Lehrer: ${fach.teacher} • Raum: ${fach.room}`;

  // Hide all topic boxes, show target topic box
  document.querySelectorAll('.topic-module-box').forEach(box => {
    box.classList.remove('active-module');
  });

  const targetModule = document.getElementById('topic-' + topicId);
  if (targetModule) {
    targetModule.classList.add('active-module');
    if (typeof initPhysikSimulations === 'function') initPhysikSimulations();
    if (typeof renderPhysikKaTeX === 'function') setTimeout(renderPhysikKaTeX, 60);
  } else {
    // If not found, display generic placeholder
    const placeholder = document.getElementById('topic-generic-placeholder');
    if (placeholder) {
      placeholder.classList.add('active-module');
      placeholder.innerHTML = `
        <div class="p-card" style="text-align: center; padding: 3rem 1rem;">
          <div style="font-size: 2.5rem; margin-bottom: 0.8rem;">${fach.icon}</div>
          <h2 style="font-size: 1.25rem; color: var(--text-primary); margin-bottom: 0.5rem;">${topicObj ? topicObj.title : 'Thema'}</h2>
          <p style="color: var(--text-secondary); max-width: 500px; margin: 0 auto 1.5rem auto; font-size: 0.88rem;">
            ${topicObj ? topicObj.desc : 'Dieses Lernmodul wird im Unterricht vorbereitet.'}
          </p>
          <div style="display: inline-block; padding: 0.5rem 1rem; border-radius: var(--radius-sm); background: var(--bg-subtle); border: 1px solid var(--border-subtle); font-size: 0.82rem; color: var(--text-muted);">
            Klausurstatus: <strong>${fach.examStatus}</strong>
          </div>
        </div>
      `;
    }
  }

  // Trigger topic-specific interactive redraws
  if (topicId === 'mathe-schar' && typeof updateScharPlot === 'function') {
    setTimeout(updateScharPlot, 60);
  } else if (topicId === 'mathe-trassierung' && typeof switchTrassMode === 'function') {
    setTimeout(() => switchTrassMode(typeof currentTrassMode !== 'undefined' ? currentTrassMode : 't2'), 60);
  } else if (topicId === 'mathe-matrizen' && typeof loadLevelData === 'function') {
    setTimeout(loadLevelData, 60);
  } else if (topicId === 'mathe-steckbrief' && typeof renderSteckbriefContent === 'function') {
    renderSteckbriefContent();
  } else if (topicId === 'politik-flashcards' && typeof renderActiveFlashcard === 'function') {
    renderActiveFlashcard();
  } else if (topicId === 'politik-notizen' && typeof loadUserPolitikNotes === 'function') {
    loadUserPolitikNotes();
  }

  updateBreadcrumbs();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function goBack() {
  if (navState.history.length > 0) {
    const prev = navState.history.pop();
    if (prev.view === 'topic-workspace' && prev.fach && prev.topic) {
      navState.currentStation = prev.station || null;
      openTopic(prev.fach, prev.topic, false);
    } else if (prev.view === 'fach-detail' && prev.fach) {
      navState.currentStation = prev.station || null;
      openFach(prev.fach, false);
      if (prev.station) openStationFolder(prev.station);
    } else {
      navState.currentStation = null;
      navigateTo(prev.view, false);
    }
    return;
  }

  // Fallback if no history
  if (navState.currentView === 'topic-workspace' && navState.currentFach) {
    openFach(navState.currentFach, false);
  } else if (navState.currentView === 'fach-detail') {
    navigateTo('faecher', false);
  } else {
    navigateTo('dashboard', false);
  }
}

// --- 5. BREADCRUMBS ENGINE ---
function updateBreadcrumbs() {
  const trail = document.getElementById('breadcrumbsTrail');
  const btnBack = document.getElementById('btnBackNav');
  if (!trail) return;

  const view = navState.currentView;
  const fach = navState.currentFach ? FAECHER_DATA[navState.currentFach] : null;
  const topic = (fach && navState.currentTopic) ? (fach.topics || []).find(t => t.id === navState.currentTopic) : null;

  let items = [];

  // Always start with Dashboard
  if (view === 'dashboard') {
    items.push(`<span class="breadcrumb-current">🏠 Dashboard</span>`);
    if (btnBack) btnBack.style.display = 'none';
  } else {
    items.push(`<a class="breadcrumb-link" onclick="navigateTo('dashboard')">🏠 Dashboard</a>`);
    if (btnBack) btnBack.style.display = 'inline-flex';

    if (view === 'faecher') {
      items.push(`<span class="breadcrumb-current">📚 Fächer</span>`);
    } else if (view === 'fach-detail' && fach) {
      items.push(`<a class="breadcrumb-link" onclick="navigateTo('faecher')">📚 Fächer</a>`);
      if (navState.currentFach === 'physik' && navState.currentStation) {
        const curSt = (fach.stations || []).find(st => st.id === navState.currentStation);
        items.push(`<a class="breadcrumb-link" onclick="openFach('${fach.id}')">${fach.icon} ${fach.name}</a>`);
        items.push(`<span class="breadcrumb-current">📁 ${curSt ? curSt.title.split(':')[1] || curSt.title : 'Ordner'}</span>`);
      } else {
        items.push(`<span class="breadcrumb-current">${fach.icon} ${fach.name}</span>`);
      }
    } else if (view === 'topic-workspace' && fach) {
      items.push(`<a class="breadcrumb-link" onclick="navigateTo('faecher')">📚 Fächer</a>`);
      items.push(`<a class="breadcrumb-link" onclick="closeStationFolder(); openFach('${fach.id}');">${fach.icon} ${fach.name}</a>`);
      if (fach.id === 'physik' && navState.currentStation) {
        const curSt = (fach.stations || []).find(st => st.id === navState.currentStation);
        if (curSt) {
          items.push(`<a class="breadcrumb-link" onclick="openFach('physik'); openStationFolder('${curSt.id}');">📁 ${curSt.title.split(':')[1] || curSt.title}</a>`);
        }
      }
      items.push(`<span class="breadcrumb-current">${topic ? topic.title : 'Thema'}</span>`);
    } else if (view === 'kalender') {
      items.push(`<span class="breadcrumb-current">📅 Klausuren &amp; Kalender</span>`);
    } else if (view === 'stundenplan') {
      items.push(`<span class="breadcrumb-current">📋 Stundenplan</span>`);
    }
  }

  trail.innerHTML = items.join('<span class="breadcrumb-separator">›</span>');
}

// --- 6. DASHBOARD RENDERER ---
function renderDashboard() {
  // 1. Klausur Hero
  const heroEl = document.getElementById('dashHeroUrgent');
  if (heroEl) {
    heroEl.innerHTML = `
      <div class="urgent-hero-box" style="border-left-color: var(--accent-politik);">
        <div class="urgent-left">
          <div class="urgent-alert-pill" style="background: var(--accent-politik-bg); color: var(--accent-politik); border-color: var(--accent-politik-border);">
            <span class="status-dot"></span>
            <strong>NÄCHSTE KLAUSUR: MORGEN!</strong>
          </div>
          <h2 class="urgent-title">🏛️ Politik-Wirtschaft (pw25-Hf) &bull; Partizipation &amp; Wahlen</h2>
          <div class="urgent-meta-grid">
            <div class="um-item">📅 <strong>Dienstag, 15.09.2026</strong></div>
            <div class="um-item">⏰ <strong>1. Stunde</strong> (Raum: <strong>R1</strong>)</div>
            <div class="um-item">👨‍🏫 Lehrer: <strong>Hf</strong></div>
            <div class="um-item">🎯 <strong>AFB I (Zusammenfassen), AFB II (Erläutern), AFB III (Urteil)</strong></div>
          </div>
        </div>
        <div class="urgent-right">
          <div class="next-up-preview">
            <span class="nu-label">Direkt am Freitag folgt:</span>
            <div class="nu-card">
              <strong>⚡ PH12-Lh (Physik eA)</strong>
              <span>Freitag, 18.09.2026 • 1. Stunde • Raum NW1</span>
            </div>
          </div>
          <button class="btn-hero-study" onclick="openFach('politik')">
            🏛️ Politik-Lernmodule öffnen &rarr;
          </button>
        </div>
      </div>
    `;
  }

  // 2. Widget: Mein Schultag heute
  renderTodaySchedule();

  // 3. Widget: IServ Aufgaben
  renderIservWidget();

  // 4. Widget: Nächste Klausuren
  renderUpcomingExams();

  // 5. Widget: Meine Fächer Quickstart
  renderDashboardSubjects();
}

function renderTodaySchedule() {
  const container = document.getElementById('todayScheduleList');
  if (!container) return;

  const days = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];
  const now = new Date();
  let dayCode = days[now.getDay()];

  // For testing convenience: if weekend, show Tuesday (tomorrow's schedule)
  if (dayCode === 'So' || dayCode === 'Sa') {
    dayCode = 'Di';
  }

  let rowsHtml = '';
  let slotCount = 0;

  for (let period = 1; period <= 6; period++) {
    if (typeof SCHEDULE_DATA !== 'undefined' && SCHEDULE_DATA[period]) {
      const lessons = SCHEDULE_DATA[period][dayCode] || [];
      if (lessons.length > 0) {
        lessons.forEach(les => {
          slotCount++;
          const courseColor = les.course.startsWith('MA') ? 'var(--accent-math)' :
                             les.course.startsWith('pw') ? 'var(--accent-politik)' :
                             les.course.startsWith('PH') ? 'var(--accent-primary)' :
                             les.course.startsWith('IF') ? 'var(--accent-urgent)' :
                             'var(--accent-warning)';

          const fachMap = {
            'MA11': 'mathe',
            'pw25': 'politik',
            'PH12': 'physik',
            'IF13': 'informatik',
            'de48': 'deutsch',
            'en39': 'englisch',
            'ge27': 'geschichte',
            'ds26': 'ds',
            'sp15Z': 'sport'
          };
          const targetFach = fachMap[les.course];
          const clickAction = targetFach ? `onclick="openFach('${targetFach}')" style="cursor: pointer;"` : '';

          rowsHtml += `
            <div class="today-slot-row" style="--c-color: ${courseColor};" ${clickAction} title="${targetFach ? 'Klicken für Fach-Übersicht' : ''}">
              <div class="today-stunde">${period}. Std</div>
              <div>
                <span class="today-course-name">${les.course}</span>
                <span class="today-meta">(${les.type}) &bull; Hr./Fr. ${les.teacher}</span>
              </div>
              <div class="today-meta">Raum: <strong>${les.room}</strong></div>
            </div>
          `;
        });
      }
    }
  }

  if (slotCount === 0) {
    container.innerHTML = `<div class="today-weekend-notice">🎉 Heute kein Unterricht / Wochenende!</div>`;
  } else {
    container.innerHTML = rowsHtml;
  }
}

function renderUpcomingExams() {
  const container = document.getElementById('dashExamsList');
  if (!container) return;

  if (typeof TONDA_KLAUSUREN === 'undefined') {
    container.innerHTML = '<div style="color:var(--text-muted); font-size:0.8rem;">Keine Termine geladen.</div>';
    return;
  }

  // Filter for pending/soon/urgent exams
  const upcoming = TONDA_KLAUSUREN.filter(k => k.status !== 'done').slice(0, 4);

  let html = '';
  upcoming.forEach(k => {
    const fachMap = {
      'Mathematik': 'mathe',
      'Politik-Wirtschaft': 'politik',
      'Physik': 'physik',
      'Informatik': 'informatik',
      'Deutsch': 'deutsch',
      'Englisch': 'englisch',
      'Geschichte': 'geschichte',
      'Darstellendes Spiel': 'ds'
    };
    const fachId = fachMap[k.subject];

    html += `
      <div class="dash-exam-item" style="--sub-color: ${k.color};" onclick="${fachId ? `openFach('${fachId}')` : `navigateTo('kalender')`}">
        <div class="dash-exam-head">
          <span class="dash-exam-title">${k.subject} <span style="font-size:0.7rem; font-weight:normal; color:var(--text-muted);">(${k.course})</span></span>
          <span class="dash-exam-date">${k.dayOfWeek}, ${k.dateStr}</span>
        </div>
        <div class="dash-exam-topic">${k.topic}</div>
      </div>
    `;
  });

  container.innerHTML = html;
}

function renderDashboardSubjects() {
  const container = document.getElementById('dashSubjectsGrid');
  if (!container) return;

  const quickSubjects = ['mathe', 'politik', 'physik', 'informatik'];
  let html = '';

  quickSubjects.forEach(id => {
    const f = FAECHER_DATA[id];
    if (!f) return;
    html += `
      <div class="dash-sub-pill" onclick="openFach('${f.id}')">
        <div class="dash-sub-pill-head">
          <span class="dash-sub-name">${f.icon} ${f.name}</span>
          <span class="dash-sub-code">${f.courseCode}</span>
        </div>
        <span class="dash-sub-status">${(f.topics || []).length} Module &bull; Hr./Fr. ${f.teacher}</span>
      </div>
    `;
  });

  container.innerHTML = html;
}

// --- 7. FÄCHER-HUB RENDERER ---
function renderFaecherGrid() {
  const container = document.getElementById('faecherGrid');
  if (!container) return;

  let html = '';
  Object.values(FAECHER_DATA).forEach(f => {
    html += `
      <div class="fach-card" onclick="openFach('${f.id}')">
        <div class="fach-card-top">
          <div class="fach-icon-box" style="border-left: 3px solid ${f.color};">
            ${f.icon}
          </div>
          <span class="fach-badge-type">${f.courseCode} &bull; ${f.type.split(' ')[0]}</span>
        </div>
        <div>
          <div class="fach-name">${f.name}</div>
          <div class="fach-meta-line">
            <span>👨‍🏫 Lehrer: <strong>${f.teacher}</strong></span>
            <span>📍 Raum: <strong>${f.room}</strong></span>
          </div>
          <div class="fach-desc">${f.desc}</div>
        </div>
        <div class="fach-card-bottom">
          <span class="fach-exam-status" style="color: ${f.id === 'politik' ? 'var(--accent-politik)' : 'var(--text-secondary)'};">
            ${f.examStatus}
          </span>
          <button class="btn-open-fach" onclick="event.stopPropagation(); openFach('${f.id}')">
            Themen öffnen &rarr;
          </button>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}


// --- DRILL-DOWN THEMEN-ORDNER ENGINE FÜR PHYSIK ---
function openStationFolder(stationId) {
  navState.currentStation = stationId;
  renderFachDetail('physik');
  updateBreadcrumbs();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function closeStationFolder() {
  navState.currentStation = null;
  renderFachDetail('physik');
  updateBreadcrumbs();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// --- 8. FACH-DETAIL RENDERER ---
function renderFachDetail(fachId) {
  const fach = FAECHER_DATA[fachId];
  if (!fach) return;

  const headerEl = document.getElementById('fachDetailHeader');
  const gridEl = document.getElementById('themenGrid');

  if (headerEl) {
    headerEl.innerHTML = `
      <div style="display: flex; align-items: center; gap: 1rem;">
        <div class="fach-icon-box" style="width: 52px; height: 52px; font-size: 1.8rem; border-left: 4px solid ${fach.color};">
          ${fach.icon}
        </div>
        <div>
          <h2 style="font-size: 1.4rem; font-weight: 800; color: var(--text-primary);">${fach.name} (${fach.courseCode})</h2>
          <div style="font-size: 0.82rem; color: var(--text-secondary); margin-top: 0.2rem;">
            ${fach.type} &bull; Lehrer: <strong>${fach.teacher}</strong> &bull; Raum: <strong>${fach.room}</strong>
          </div>
        </div>
      </div>
      <div style="display: flex; align-items: center; gap: 0.8rem; flex-wrap: wrap;">
        <div style="padding: 0.4rem 0.8rem; border-radius: var(--radius-sm); background: var(--bg-subtle); border: 1px solid var(--border-subtle); font-size: 0.8rem; color: var(--text-secondary);">
          ${fach.examStatus}
        </div>
        <button class="btn-upload-nav" onclick="openUploadModal('${fachId}')">
          <span>➕</span><span>Dokument hochladen</span>
        </button>
        <button class="btn-back-nav" onclick="navigateTo('faecher')">
          &larr; Alle F&auml;cher
        </button>
      </div>
    `;
  }

  if (gridEl) {
    // If physics, render the dedicated comprehensive portal with 10 skills, diagrams, notes and IServ tasks
    if (fachId === 'physik' && typeof renderPhysikPortal === 'function') {
      renderPhysikPortal();
      return;
    }

    // If the subject has hierarchical stations, render drill-down folders
    if (fach.stations && fach.stations.length > 0) {
      gridEl.className = 'themen-stations-container';
      gridEl.style.display = 'block';

      // CASE A: User selected a specific folder (Drill-Down View)
      if (navState.currentStation) {
        const station = fach.stations.find(st => st.id === navState.currentStation);
        if (station) {
          let html = `
            <div class="folder-detail-container">
              <!-- Header Bar with Back Button -->
              <div class="folder-nav-header-bar">
                <button class="btn-back-to-all-folders" onclick="closeStationFolder()">
                  &larr; Zur&uuml;ck zu allen Physik-Ordnern
                </button>
                <div class="folder-active-badge">
                  <span>📁 Ge&ouml;ffneter Ordner:</span>
                  <strong>${station.title}</strong>
                </div>
              </div>

              <!-- Folder Banner -->
              <div class="folder-banner-card" style="border-left: 6px solid ${station.color}; background: linear-gradient(180deg, ${station.color}08 0%, var(--bg-card) 100px);">
                <div class="folder-banner-content">
                  <div class="folder-banner-icon" style="background: ${station.color}18; border: 1px solid ${station.color}33;">
                    ${station.icon}
                  </div>
                  <div>
                    <span class="p-badge" style="background: ${station.color}22; color: ${station.color}; border: 1px solid ${station.color}44;">
                      ${station.badge}
                    </span>
                    <h2 style="font-size: 1.45rem; font-weight: 800; color: var(--text-primary); margin: 0.35rem 0 0.2rem 0;">
                      ${station.title}
                    </h2>
                    <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.45;">
                      ${station.subtitle}
                    </p>
                  </div>
                </div>
              </div>

              <!-- Points List Heading -->
              <div class="folder-points-heading">
                <span>📋 Die Themen &amp; Punkte in diesem Ordner:</span>
              </div>

              <!-- Points Grid -->
              <div class="folder-points-grid">
          `;

          (station.topics || []).forEach((t, idx) => {
            html += `
              <div class="folder-point-card" onclick="openTopic('${fach.id}', '${t.id}')">
                <div>
                  <div class="point-top-row">
                    <span class="point-num-tag" style="background: ${station.color}18; color: ${station.color}; border: 1px solid ${station.color}33;">
                      Punkt 0${idx + 1} &bull; ${t.badge}
                    </span>
                    <span style="font-size: 0.75rem; color: var(--text-muted); font-weight: 700;">#0${idx + 1}</span>
                  </div>
                  <div class="point-title">${t.title}</div>
                  <div class="point-desc">${t.desc}</div>
                </div>
                <button class="btn-point-launch" style="background: ${station.color};" onclick="event.stopPropagation(); openTopic('${fach.id}', '${t.id}')">
                  Diesen Punkt &ouml;ffnen &rarr;
                </button>
              </div>
            `;
          });

          html += `
              </div>
            </div>
          `;
          gridEl.innerHTML = html;
          return;
        }
      }

      // CASE B: User is on main subject view -> SHOW ONLY THE 3 MAIN FOLDERS!
      let html = `
        <div style="margin-bottom: 1.2rem;">
          <h3 style="font-size: 1.2rem; font-weight: 800; color: var(--text-primary); margin-bottom: 0.3rem; display: flex; align-items: center; gap: 0.5rem;">
            <span>📁</span>
            <span>W&auml;hle ein Themengebiet (Hauptordner):</span>
          </h3>
          <p style="font-size: 0.86rem; color: var(--text-secondary);">
            Klicke auf einen der 3 Ordner, um die darin enthaltenen Unterpunkte, Erkl&auml;rungen und Aufgaben zu &ouml;ffnen:
          </p>
        </div>

        <div class="physics-folders-grid">
      `;

      fach.stations.forEach((station, idx) => {
        const topicCount = (station.topics || []).length;
        html += `
          <div class="physics-folder-card ${station.themeClass.replace('station-', 'folder-')}" onclick="openStationFolder('${station.id}')">
            <div>
              <div class="folder-top-row">
                <div class="folder-big-icon-box" style="background: ${station.color}18; border: 1px solid ${station.color}33;">
                  ${station.icon}
                </div>
                <span class="folder-badge-pill" style="background: ${station.color}22; color: ${station.color}; border: 1px solid ${station.color}44;">
                  ${station.badge}
                </span>
              </div>
              <div class="folder-main-title">
                ${station.title}
              </div>
              <div class="folder-desc-text">
                ${station.subtitle}
              </div>
            </div>
            <div class="folder-card-footer">
              <span class="folder-content-tag">
                📁 <strong>${topicCount} Punkte</strong> zum Lernen
              </span>
              <button class="btn-open-folder-cta" style="background: ${station.color};" onclick="event.stopPropagation(); openStationFolder('${station.id}')">
                Ordner &ouml;ffnen &rarr;
              </button>
            </div>
          </div>
        `;
      });

      html += `
        </div>
      `;

      gridEl.innerHTML = html;
    } else {
      // Standard flat grid for other subjects
      gridEl.className = 'themen-grid';
      gridEl.style.display = 'grid';

      let html = '';
      (fach.topics || []).forEach(t => {
        html += `
          <div class="thema-card" onclick="openTopic('${fach.id}', '${t.id}')">
            <div>
              <div class="thema-head">
                <span class="thema-num-badge">${t.badge || ('Thema ' + t.num)}</span>
                <span style="font-size: 0.75rem; color: var(--text-muted);">#${t.num}</span>
              </div>
              <div class="thema-title">${t.title}</div>
              <div class="thema-desc">${t.desc}</div>
            </div>
            <button class="btn-open-thema" onclick="event.stopPropagation(); openTopic('${fach.id}', '${t.id}')">
              Modul bearbeiten &rarr;
            </button>
          </div>
        `;
      });
      html += `
        <div id="subjectInlineUserDocs_${fach.id}" style="grid-column: 1 / -1; width: 100%;"></div>
      `;
      gridEl.innerHTML = html;
      if (typeof renderSubjectUserDocuments === 'function') {
        renderSubjectUserDocuments(fach.id, `subjectInlineUserDocs_${fach.id}`);
      }
    }
  }
}

function filterStations(stationId, btnEl) {
  document.querySelectorAll('.station-filter-btn').forEach(b => b.classList.remove('active'));
  if (btnEl) btnEl.classList.add('active');

  const containers = document.querySelectorAll('.station-folder-container');
  containers.forEach(c => {
    if (stationId === 'all' || c.id === stationId) {
      c.style.display = 'block';
    } else {
      c.style.display = 'none';
    }
  });
}

// --- 9. BACKWARDS COMPATIBILITY HELPERS ---
function switchMainTab(tabName) {
  if (tabName === 'kalender' || tabName === 'stundenplan') {
    navigateTo(tabName);
  } else if (tabName === 'politik') {
    openFach('politik');
  } else if (tabName === 'mathe') {
    openFach('mathe');
  } else {
    navigateTo('dashboard');
  }
}

function switchMatheSubTab(subTabName) {
  const map = {
    'steckbrief': 'mathe-steckbrief',
    'schar': 'mathe-schar',
    'matrizen': 'mathe-matrizen',
    'trassierung': 'mathe-trassierung'
  };
  const topicId = map[subTabName] || subTabName;
  openTopic('mathe', topicId);
}

// =========================================================================
// 10. ISERV TASKS & PRIVACY PROTECTION SYSTEM
// =========================================================================

let ISERV_TASKS = [];
let ISERV_STATUS = {
  configured: false,
  server: '',
  username: '',
  last_sync: 'Wird geladen...',
  is_demo: false,
  online: false
};
let CURRENT_MODAL_TASK = null;

// Fallback demo tasks
const DEFAULT_DEMO_TASKS = [
  {
    id: "demo-1",
    title: "Politik: Analyse der Wahlfunktionen nach Art. 38 GG",
    subject: "Politik-Wirtschaft gA",
    teacher: "Hf",
    deadline: "18.09.2026, 23:59 Uhr",
    days_left: 2,
    status: "urgent",
    done: false,
    desc: "Bearbeite das Aufgabenblatt zu den fünf Wahlfunktionen und begründe das Partizipationsparadoxon schriftlich unter Berücksichtigung von konventioneller vs. unkonventioneller Partizipation.",
    attachments: ["Wahlfunktionen_Arbeitsblatt_Hf.pdf"]
  },
  {
    id: "demo-2",
    title: "Mathematik: Kurvenscharen t=2 Extrempunkte nachweisen",
    subject: "Mathematik eA",
    teacher: "Mey",
    deadline: "21.09.2026, 18:00 Uhr",
    days_left: 5,
    status: "normal",
    done: false,
    desc: "Buch S. 48 Aufgabe 3 a-d. Berechne die Wendepunkte und die Ortskurve für ft(x) = t*x^3 - 3*t*x^2 - 9*t*x + (11*t+2).",
    attachments: ["Mathe_Scharen_Uebungsblatt.pdf"]
  },
  {
    id: "demo-3",
    title: "Deutsch: Szenenanalyse Faust I (Gelehrtenzimmer)",
    subject: "Deutsch eA",
    teacher: "Brt",
    deadline: "23.09.2026, 20:00 Uhr",
    days_left: 7,
    status: "normal",
    done: true,
    desc: "Gliedere den inneren Monolog von Heinrich Faust nach Vers 354-385 und arbeite seine existenzielle Krise heraus.",
    attachments: []
  }
];

function getApiBase() {
  if (window.location.protocol === 'file:') return 'http://localhost:8000';
  return '';
}

async function initIservModule() {
  await loadIservData(false);
}

async function loadIservData(forceRefresh = false) {
  const syncIcon = document.getElementById('syncSpinnerIcon');
  if (syncIcon) syncIcon.classList.add('spin-sync');

  try {
    // Try connecting to local companion server
    const base = getApiBase();
    const statusRes = await fetch(base + '/api/iserv/status', { cache: 'no-store' });
    if (statusRes.ok) {
      ISERV_STATUS = await statusRes.json();
      ISERV_STATUS.online = true;
    } else {
      throw new Error('Server returned ' + statusRes.status);
    }

    const tasksUrl = forceRefresh ? '/api/iserv/tasks?force=true' : '/api/iserv/tasks';
    const tasksRes = await fetch(base + tasksUrl, { cache: 'no-store' });
    if (tasksRes.ok) {
      const data = await tasksRes.json();
      ISERV_TASKS = data.tasks || [];
      if (data.last_sync) ISERV_STATUS.last_sync = data.last_sync;
      ISERV_STATUS.is_demo = !!data.demo;
      localStorage.setItem('tonda_iserv_cache', JSON.stringify({
        status: ISERV_STATUS,
        tasks: ISERV_TASKS,
        cached_at: Date.now()
      }));
    }
  } catch (err) {
    // Companion offline or static host (GitHub Pages)
    console.log('[IServ] Lokaler Server nicht erreichbar oder Standalone-Modus:', err.message);
    const cached = localStorage.getItem('tonda_iserv_cache');
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        ISERV_TASKS = parsed.tasks || [];
        ISERV_STATUS = parsed.status || {};
      } catch (e) {
        ISERV_TASKS = DEFAULT_DEMO_TASKS;
      }
    } else {
      ISERV_TASKS = DEFAULT_DEMO_TASKS;
    }
    ISERV_STATUS.online = false;
    if (!ISERV_STATUS.last_sync || ISERV_STATUS.last_sync === 'Wird geladen...') {
      ISERV_STATUS.last_sync = 'Offline / Standalone-Modus';
    }
  } finally {
    if (syncIcon) syncIcon.classList.remove('spin-sync');
    renderIservWidget();
    updateIservNavBadge();
  }
}

async function refreshIservTasks(e) {
  if (e) e.stopPropagation();
  await loadIservData(true);
}

function updateIservNavBadge() {
  const dot = document.getElementById('navIservDot');
  const txt = document.getElementById('navIservText');
  if (!dot || !txt) return;

  if (ISERV_STATUS.online) {
    dot.className = 'iserv-status-dot online';
    txt.textContent = ISERV_STATUS.configured ? 'IServ Verbunden' : 'IServ Setup';
  } else {
    dot.className = 'iserv-status-dot offline';
    txt.textContent = 'IServ (Offline)';
  }
}

function renderIservWidget() {
  const container = document.getElementById('iservTasksList');
  const counterBadge = document.getElementById('iservCounterBadge');
  const statusDot = document.getElementById('iservStatusDot');
  const statusServer = document.getElementById('iservStatusServer');
  const syncLabel = document.getElementById('iservLastSyncLabel');

  if (!container) return;

  const openTasks = ISERV_TASKS.filter(t => !t.done);
  if (counterBadge) {
    counterBadge.textContent = openTasks.length === 0 ? '✓ Alles erledigt!' : `${openTasks.length} offen`;
    counterBadge.style.background = openTasks.length === 0 ? 'var(--accent-success-bg)' : 'var(--accent-primary-bg)';
    counterBadge.style.color = openTasks.length === 0 ? 'var(--accent-success)' : 'var(--accent-primary)';
  }

  if (statusDot) {
    statusDot.className = 'iserv-dot ' + (ISERV_STATUS.online ? 'online' : 'offline');
  }

  if (statusServer) {
    if (ISERV_STATUS.online) {
      statusServer.textContent = ISERV_STATUS.configured 
        ? `${ISERV_STATUS.server || 'IServ'} (${ISERV_STATUS.username || 'Verbunden'})`
        : 'Companion aktiv • Setup nötig';
    } else {
      statusServer.textContent = 'Lokaler Companion getrennt (GitHub / Standalone)';
    }
  }

  if (syncLabel) {
    syncLabel.textContent = ISERV_STATUS.last_sync ? `Sync: ${ISERV_STATUS.last_sync}` : '';
  }

  if (ISERV_TASKS.length === 0) {
    container.innerHTML = `
      <div class="iserv-empty-state">
        <div style="font-size: 1.6rem; margin-bottom: 0.3rem;">🎉</div>
        Keine offenen IServ-Aufgaben gefunden!
      </div>
    `;
    return;
  }

  let html = '';
  // Sort: open first, then urgent
  const sorted = [...ISERV_TASKS].sort((a, b) => {
    if (a.done !== b.done) return a.done ? 1 : -1;
    return (a.days_left || 99) - (b.days_left || 99);
  });

  sorted.forEach(t => {
    const isUrgent = (t.days_left <= 2 || t.status === 'urgent') && !t.done && t.status !== 'past';
    const isSoon = t.days_left <= 4 && !t.done && t.status !== 'past';
    const isPast = t.status === 'past' && !t.done;
    const tagClass = isUrgent ? 'urgent' : (isSoon ? 'soon' : (isPast ? 'past' : 'normal'));
    const deadlineText = t.deadline || (t.days_left ? `Noch ${t.days_left} Tage` : 'Keine Frist');

    html += `
      <div class="iserv-task-item ${isUrgent ? 'urgent' : ''} ${t.done ? 'done' : ''}" onclick="openIservTaskModal('${t.id}')">
        <div class="iserv-task-head">
          <span class="iserv-task-title">${t.title}</span>
          <span class="iserv-deadline-tag ${tagClass}">
            ${t.done ? '✓ Erledigt' : (isUrgent ? '🚨 ' + deadlineText : (isPast ? '⌛ ' + deadlineText : '⏰ ' + deadlineText))}
          </span>
        </div>
        <div class="iserv-task-meta">
          <span>📚 ${t.subject || 'Allgemein'} ${t.teacher ? '&bull; ' + t.teacher : ''}</span>
          <span style="font-size: 0.72rem; color: var(--accent-primary); font-weight: 600;">Details &rarr;</span>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

function openIservTaskModal(taskId) {
  const task = ISERV_TASKS.find(t => t.id === taskId);
  if (!task) return;
  CURRENT_MODAL_TASK = task;

  const modal = document.getElementById('iservTaskModal');
  const modalSubject = document.getElementById('modalTaskSubject');
  const modalTitle = document.getElementById('modalTaskTitle');
  const modalDeadline = document.getElementById('modalTaskDeadline');
  const modalTeacher = document.getElementById('modalTaskTeacher');
  const modalStatus = document.getElementById('modalTaskStatus');
  const modalDesc = document.getElementById('modalTaskDesc');
  const attachmentsBox = document.getElementById('modalTaskAttachmentsBox');
  const attachmentsList = document.getElementById('modalTaskAttachmentsList');
  const btnDone = document.getElementById('modalBtnToggleDone');
  const feedback = document.getElementById('copyPromptFeedback');

  if (feedback) feedback.style.display = 'none';

  if (modalSubject) modalSubject.textContent = task.subject || 'IServ Aufgabe';
  if (modalTitle) modalTitle.textContent = task.title;
  if (modalDeadline) modalDeadline.textContent = task.deadline || '-';
  if (modalTeacher) modalTeacher.textContent = task.teacher || '-';
  if (modalStatus) {
    modalStatus.textContent = task.done ? 'Erledigt' : (task.days_left <= 2 ? 'Dringend' : 'In Bearbeitung');
    modalStatus.className = 'status-pill ' + (task.done ? 'status-ok' : (task.days_left <= 2 ? 'status-urgent' : 'status-normal'));
  }
  if (modalDesc) modalDesc.textContent = task.desc || task.details || 'Keine weitere Beschreibung vorhanden.';

  if (attachmentsBox && attachmentsList) {
    const atts = task.attachments || [];
    if (atts.length > 0) {
      attachmentsBox.style.display = 'block';
      attachmentsList.innerHTML = atts.map(a => `
        <div class="attachment-chip">
          <span>📄</span>
          <span>${a}</span>
        </div>
      `).join('');
    } else {
      attachmentsBox.style.display = 'none';
    }
  }

  if (btnDone) {
    btnDone.textContent = task.done ? '↩ Als unerledigt markieren' : '✓ Als erledigt markieren';
  }

  if (modal) modal.style.display = 'flex';
}

function closeIservTaskModal(e) {
  const modal = document.getElementById('iservTaskModal');
  if (modal) modal.style.display = 'none';
  CURRENT_MODAL_TASK = null;
}

async function toggleCurrentTaskDone() {
  if (!CURRENT_MODAL_TASK) return;
  CURRENT_MODAL_TASK.done = !CURRENT_MODAL_TASK.done;

  // Persist to server if available
  try {
    await fetch(getApiBase() + '/api/iserv/toggle-done', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: CURRENT_MODAL_TASK.id })
    });
  } catch (e) {
    console.log('[IServ] Local toggle only');
  }

  // Update localStorage
  localStorage.setItem('tonda_iserv_cache', JSON.stringify({
    status: ISERV_STATUS,
    tasks: ISERV_TASKS,
    cached_at: Date.now()
  }));

  renderIservWidget();
  openIservTaskModal(CURRENT_MODAL_TASK.id);
}

function copyTaskPromptForAi() {
  if (!CURRENT_MODAL_TASK) return;
  const prompt = `Hier ist eine Hausaufgabe aus meinem IServ-Portal:

Fach: ${CURRENT_MODAL_TASK.subject || 'Allgemein'}
Titel: ${CURRENT_MODAL_TASK.title}
Frist: ${CURRENT_MODAL_TASK.deadline || '-'}
Lehrer: ${CURRENT_MODAL_TASK.teacher || '-'}

Aufgabenstellung:
${CURRENT_MODAL_TASK.desc || CURRENT_MODAL_TASK.details || ''}

Bitte hilf mir dabei:
1. Den Arbeitsauftrag und die Operatoren genau zu verstehen.
2. Die Lösung strukturiert und Schritt für Schritt zu erarbeiten.`;

  navigator.clipboard.writeText(prompt).then(() => {
    const fb = document.getElementById('copyPromptFeedback');
    if (fb) {
      fb.style.display = 'block';
      setTimeout(() => { fb.style.display = 'none'; }, 3000);
    }
  }).catch(() => {
    alert('Kopieren fehlgeschlagen.');
  });
}

function jumpToTaskSubject() {
  if (!CURRENT_MODAL_TASK) return;
  closeIservTaskModal();
  const sub = (CURRENT_MODAL_TASK.subject || '').toLowerCase();
  if (sub.includes('politik') || sub.includes('pw')) {
    openFach('politik');
  } else if (sub.includes('mathe') || sub.includes('ma')) {
    openFach('mathe');
  } else if (sub.includes('physik') || sub.includes('ph')) {
    openFach('physik');
  } else if (sub.includes('informatik') || sub.includes('if')) {
    openFach('informatik');
  } else {
    navigateTo('faecher');
  }
}

// --- IServ Configuration Modal ---
function openIservConfigModal() {
  const modal = document.getElementById('iservConfigModal');
  const serverInput = document.getElementById('cfgIservServer');
  const userInput = document.getElementById('cfgIservUser');
  const fb = document.getElementById('cfgFeedback');

  if (serverInput && ISERV_STATUS.server) serverInput.value = ISERV_STATUS.server;
  if (userInput && ISERV_STATUS.username) userInput.value = ISERV_STATUS.username;
  if (fb) fb.style.display = 'none';

  if (modal) modal.style.display = 'flex';
}

function closeIservConfigModal(e) {
  const modal = document.getElementById('iservConfigModal');
  if (modal) modal.style.display = 'none';
}

async function saveIservConfig(event) {
  event.preventDefault();
  const server = document.getElementById('cfgIservServer').value.trim();
  const username = document.getElementById('cfgIservUser').value.trim();
  const password = document.getElementById('cfgIservPass').value.trim();
  const fb = document.getElementById('cfgFeedback');
  const btn = document.getElementById('btnSaveConfig');

  if (btn) btn.disabled = true;
  if (fb) {
    fb.style.display = 'block';
    fb.style.background = 'var(--bg-subtle)';
    fb.style.color = 'var(--text-secondary)';
    fb.textContent = 'Speichere und teste Verbindung zum Schulserver...';
  }

  try {
    const res = await fetch(getApiBase() + '/api/iserv/configure', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ server, username, password })
    });
    const data = await res.json();

    if (data.status === 'ok') {
      if (fb) {
        fb.style.color = 'var(--accent-success)';
        fb.textContent = '✓ Gespeichert in .env! Starte Synchronisierung...';
      }
      await loadIservData(true);
      setTimeout(() => { closeIservConfigModal(); }, 1200);
    } else {
      throw new Error(data.message || 'Fehler beim Speichern');
    }
  } catch (err) {
    if (fb) {
      fb.style.color = 'var(--accent-urgent)';
      fb.textContent = '⚠️ ' + err.message + ' (Stelle sicher, dass server.py läuft)';
    }
  } finally {
    if (btn) btn.disabled = false;
  }
}

// --- PRIVACY & PIN PROTECTION ---
function savePortalPin() {
  const pinInput = document.getElementById('portalPinInput');
  const fb = document.getElementById('pinFeedback');
  if (!pinInput) return;

  const pin = pinInput.value.trim();
  if (pin.length < 4) {
    if (fb) {
      fb.style.display = 'block';
      fb.style.color = 'var(--accent-urgent)';
      fb.textContent = 'Die PIN muss mindestens 4 Zeichen lang sein.';
    }
    return;
  }

  localStorage.setItem('tonda_portal_pin', pin);
  pinInput.value = '';
  if (fb) {
    fb.style.display = 'block';
    fb.style.color = 'var(--accent-success)';
    fb.textContent = '✓ PIN erfolgreich aktiviert!';
  }
  updatePrivacyButtonState();
}

function removePortalPin() {
  localStorage.removeItem('tonda_portal_pin');
  const fb = document.getElementById('pinFeedback');
  if (fb) {
    fb.style.display = 'block';
    fb.style.color = 'var(--text-secondary)';
    fb.textContent = 'PIN deaktiviert.';
  }
  updatePrivacyButtonState();
}

function updatePrivacyButtonState() {
  const btn = document.getElementById('btnNavPrivacy');
  const icon = document.getElementById('privacyLockIcon');
  const hasPin = !!localStorage.getItem('tonda_portal_pin');

  if (btn) {
    btn.classList.toggle('locked', hasPin);
    btn.title = hasPin ? '🔒 PIN-Schutz aktiv (Klicken zum Sperren)' : '🔓 Kein PIN-Schutz (Klicken zum Konfigurieren)';
  }
  if (icon) {
    icon.textContent = hasPin ? '🔒' : '🔓';
  }
}

function triggerPrivacyAction() {
  const pin = localStorage.getItem('tonda_portal_pin');
  if (pin) {
    lockPortal();
  } else {
    openIservConfigModal();
  }
}

function lockPortal() {
  const overlay = document.getElementById('portalLockOverlay');
  const input = document.getElementById('unlockPinInput');
  const fb = document.getElementById('unlockFeedback');
  if (fb) fb.style.display = 'none';
  if (input) input.value = '';
  if (overlay) overlay.style.display = 'flex';
  if (input) setTimeout(() => input.focus(), 100);
}

function unlockPortal() {
  const input = document.getElementById('unlockPinInput');
  const fb = document.getElementById('unlockFeedback');
  const savedPin = localStorage.getItem('tonda_portal_pin');

  if (!input) return;
  if (input.value === savedPin) {
    const overlay = document.getElementById('portalLockOverlay');
    if (overlay) overlay.style.display = 'none';
    if (fb) fb.style.display = 'none';
  } else {
    if (fb) {
      fb.style.display = 'block';
      fb.textContent = 'Falsche PIN. Bitte erneut versuchen.';
    }
    input.select();
  }
}

function checkPrivacyLockOnLoad() {
  updatePrivacyButtonState();
  const pin = localStorage.getItem('tonda_portal_pin');
  if (pin) {
    lockPortal();
  }
}

// =========================================================================
// 12. ISERV FILE EXPLORER & AI DOCUMENT SHARING
// =========================================================================

let CURRENT_FACH_ID = null;
let CURRENT_FOLDER_PATH = null;
let CURRENT_FACH_DEFAULT_FOLDER = null;
let CURRENT_FACH_SUBTAB = 'themen';
const DOWNLOADED_FILES_SET = new Set();

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function getFileIcon(ext) {
  const e = (ext || '').toLowerCase();
  if (['pdf'].includes(e)) return '📕';
  if (['doc', 'docx', 'odt', 'rtf', 'txt', 'md'].includes(e)) return '📘';
  if (['ppt', 'pptx', 'odp'].includes(e)) return '📙';
  if (['xls', 'xlsx', 'ods', 'csv'].includes(e)) return '📊';
  if (['py', 'js', 'html', 'css', 'java', 'c', 'cpp', 'json', 'sql', 'ts'].includes(e)) return '💻';
  if (['png', 'jpg', 'jpeg', 'gif', 'svg', 'webp'].includes(e)) return '🖼️';
  if (['zip', 'rar', '7z', 'tar', 'gz'].includes(e)) return '📦';
  if (['mp3', 'wav', 'ogg', 'm4a'].includes(e)) return '🎵';
  if (['mp4', 'mkv', 'avi', 'mov'].includes(e)) return '🎬';
  return '📄';
}

async function initFachIservFolder(fachId) {
  CURRENT_FACH_ID = fachId;
  CURRENT_FOLDER_PATH = null;
  CURRENT_FACH_DEFAULT_FOLDER = null;

  try {
    const base = getApiBase();
    const res = await fetch(`${base}/api/iserv/subject-folder?subject=${encodeURIComponent(fachId)}`);
    if (res.ok) {
      const data = await res.json();
      CURRENT_FACH_DEFAULT_FOLDER = data.folder || 'Groups';
      CURRENT_FOLDER_PATH = CURRENT_FACH_DEFAULT_FOLDER;

      // Update badge in subtab
      const badge = document.getElementById('fachFilesBadge');
      if (badge && data.folder) {
        const parts = data.folder.split('/');
        badge.textContent = parts[parts.length - 1];
      }

      // If user is already on the iserv-files subtab, load it immediately
      if (CURRENT_FACH_SUBTAB === 'iserv-files') {
        loadFachFolder(CURRENT_FOLDER_PATH);
      }
    }
  } catch (e) {
    console.log('[IServ] Subject folder query fallback:', e);
    CURRENT_FACH_DEFAULT_FOLDER = 'Groups';
    CURRENT_FOLDER_PATH = 'Groups';
  }
}

function switchFachSubTab(tab) {
  CURRENT_FACH_SUBTAB = tab;
  const btnThemen = document.getElementById('btnSubTabThemen');
  const btnFiles = document.getElementById('btnSubTabIservFiles');
  const btnUserDocs = document.getElementById('btnSubTabUserDocs');
  const gridThemen = document.getElementById('themenGrid');
  const panelFiles = document.getElementById('fachIservFilesPanel');
  const panelUserDocs = document.getElementById('fachUserDocsPanel');

  if (tab === 'themen') {
    if (btnThemen) btnThemen.classList.add('active');
    if (btnFiles) btnFiles.classList.remove('active');
    if (btnUserDocs) btnUserDocs.classList.remove('active');
    if (gridThemen) {
      const isPhysik = (navState && navState.currentFach === 'physik');
      const hasStations = (navState && navState.currentFach && FAECHER_DATA[navState.currentFach] && FAECHER_DATA[navState.currentFach].stations);
      gridThemen.style.display = (isPhysik || hasStations) ? 'block' : 'grid';
    }
    if (panelFiles) panelFiles.style.display = 'none';
    if (panelUserDocs) panelUserDocs.style.display = 'none';
  } else if (tab === 'iserv-files') {
    if (btnThemen) btnThemen.classList.remove('active');
    if (btnFiles) btnFiles.classList.add('active');
    if (btnUserDocs) btnUserDocs.classList.remove('active');
    if (gridThemen) gridThemen.style.display = 'none';
    if (panelFiles) panelFiles.style.display = 'flex';
    if (panelUserDocs) panelUserDocs.style.display = 'none';

    if (CURRENT_FOLDER_PATH) {
      loadFachFolder(CURRENT_FOLDER_PATH);
    } else if (CURRENT_FACH_DEFAULT_FOLDER) {
      loadFachFolder(CURRENT_FACH_DEFAULT_FOLDER);
    } else if (CURRENT_FACH_ID) {
      initFachIservFolder(CURRENT_FACH_ID).then(() => {
        loadFachFolder(CURRENT_FOLDER_PATH || CURRENT_FACH_DEFAULT_FOLDER || 'Groups');
      });
    } else {
      loadFachFolder('Groups');
    }
  } else if (tab === 'user-docs') {
    if (btnThemen) btnThemen.classList.remove('active');
    if (btnFiles) btnFiles.classList.remove('active');
    if (btnUserDocs) btnUserDocs.classList.add('active');
    if (gridThemen) gridThemen.style.display = 'none';
    if (panelFiles) panelFiles.style.display = 'none';
    if (panelUserDocs) {
      panelUserDocs.style.display = 'block';
      const fid = (navState && navState.currentFach) || CURRENT_FACH_ID || 'physik';
      if (typeof renderSubjectUserDocuments === 'function') {
        renderSubjectUserDocuments(fid, 'fachUserDocsPanel');
      }
    }
  }
}

async function loadFachFolder(folderPath) {
  CURRENT_FOLDER_PATH = folderPath || 'Groups';

  const crumbsContainer = document.getElementById('filesBreadcrumbs');
  const statusInfo = document.getElementById('filesStatusInfo');
  const foldersContainer = document.getElementById('foldersListContainer');
  const filesContainer = document.getElementById('filesListContainer');
  const foldersBadge = document.getElementById('foldersCountBadge');
  const filesBadge = document.getElementById('filesCountBadge');
  const btnDlFolder = document.getElementById('btnDownloadFolder');
  const lblDlFolder = document.getElementById('lblDownloadFolder');
  const linkWeb = document.getElementById('linkOpenIservWeb');

  if (statusInfo) statusInfo.textContent = 'Lade Ordnerinhalt aus IServ...';
  if (foldersContainer) {
    foldersContainer.innerHTML = '<div style="padding: 1.2rem; color: var(--text-muted); font-size: 0.8rem; text-align: center;">⏳ Lade Unterordner...</div>';
  }
  if (filesContainer) {
    filesContainer.innerHTML = '<div style="padding: 1.2rem; color: var(--text-muted); font-size: 0.8rem; text-align: center;">⏳ Lade Dateien & Arbeitsblätter...</div>';
  }
  if (lblDlFolder) lblDlFolder.textContent = 'Ganzen Ordner für KI freigeben';
  if (btnDlFolder) btnDlFolder.disabled = false;

  const serverHost = ISERV_STATUS.server || 'igs-goettingen.de';
  if (linkWeb) {
    linkWeb.href = `https://${serverHost}/iserv/file/-/${encodeURIComponent(CURRENT_FOLDER_PATH)}`;
  }

  try {
    const base = getApiBase();
    const res = await fetch(`${base}/api/iserv/files?path=${encodeURIComponent(CURRENT_FOLDER_PATH)}`);
    if (!res.ok) throw new Error(`Server antwortete mit Status ${res.status}`);
    const data = await res.json();

    if (!data.success) {
      throw new Error(data.error || 'Ordner konnte nicht geladen werden.');
    }

    // Render Breadcrumbs
    if (crumbsContainer) {
      let breadcrumbHtml = '';
      const rootFolder = CURRENT_FACH_DEFAULT_FOLDER || 'Groups';
      const rootParts = rootFolder.split('/');
      const rootBaseName = rootParts[rootParts.length - 1];

      if (CURRENT_FOLDER_PATH === rootFolder) {
        breadcrumbHtml = `<span class="files-crumb-current">🏫 ${escapeHtml(rootBaseName)}</span>`;
      } else {
        breadcrumbHtml = `
          <button class="files-crumb-btn" data-path="${escapeHtml(rootFolder)}" onclick="loadFachFolder(this.dataset.path)">
            🏫 ${escapeHtml(rootBaseName)}
          </button>
        `;

        if (CURRENT_FOLDER_PATH.startsWith(rootFolder)) {
          const subRel = CURRENT_FOLDER_PATH.substring(rootFolder.length).replace(/^\//, '');
          const subParts = subRel.split('/');
          let curAccum = rootFolder;
          subParts.forEach((part, idx) => {
            curAccum += '/' + part;
            breadcrumbHtml += `<span class="files-crumb-sep">/</span>`;
            if (idx === subParts.length - 1) {
              breadcrumbHtml += `<span class="files-crumb-current">${escapeHtml(part)}</span>`;
            } else {
              breadcrumbHtml += `
                <button class="files-crumb-btn" data-path="${escapeHtml(curAccum)}" onclick="loadFachFolder(this.dataset.path)">
                  ${escapeHtml(part)}
                </button>
              `;
            }
          });
        } else {
          // Standard breadcrumbs
          const bcs = data.breadcrumbs || [];
          breadcrumbHtml = '';
          bcs.forEach((crumb, idx) => {
            if (idx > 0) breadcrumbHtml += `<span class="files-crumb-sep">/</span>`;
            if (idx === bcs.length - 1) {
              breadcrumbHtml += `<span class="files-crumb-current">${escapeHtml(crumb.name)}</span>`;
            } else {
              breadcrumbHtml += `
                <button class="files-crumb-btn" data-path="${escapeHtml(crumb.path)}" onclick="loadFachFolder(this.dataset.path)">
                  ${escapeHtml(crumb.name)}
                </button>
              `;
            }
          });
        }
      }

      crumbsContainer.innerHTML = breadcrumbHtml;
    }

    if (statusInfo) {
      statusInfo.textContent = `IServ: ${data.current_path || CURRENT_FOLDER_PATH}`;
    }

    // Render Folders
    const folders = data.folders || [];
    if (foldersBadge) foldersBadge.textContent = folders.length;
    if (foldersContainer) {
      if (folders.length === 0) {
        foldersContainer.innerHTML = `
          <div style="padding: 1.5rem; text-align: center; color: var(--text-muted); font-size: 0.8rem;">
            Keine weiteren Unterordner
          </div>
        `;
      } else {
        let fHtml = '';
        if (data.parent_path && CURRENT_FOLDER_PATH !== (CURRENT_FACH_DEFAULT_FOLDER || 'Groups')) {
          fHtml += `
            <button class="folder-item-btn" data-path="${escapeHtml(data.parent_path)}" onclick="loadFachFolder(this.dataset.path)" style="font-weight: 700; color: var(--accent-primary);">
              📁 <span>.. (Übergeordneter Ordner)</span>
            </button>
          `;
        }

        folders.forEach(f => {
          fHtml += `
            <button class="folder-item-btn" data-path="${escapeHtml(f.path)}" onclick="loadFachFolder(this.dataset.path)">
              📁 <span>${escapeHtml(f.name)}</span>
            </button>
          `;
        });
        foldersContainer.innerHTML = fHtml;
      }
    }

    // Render Files
    const files = data.files || [];
    if (filesBadge) filesBadge.textContent = files.length;
    if (filesContainer) {
      if (files.length === 0) {
        filesContainer.innerHTML = `
          <div style="padding: 1.8rem; text-align: center; color: var(--text-muted); font-size: 0.82rem;">
            📭 Keine Dokumente in diesem Ordner
          </div>
        `;
      } else {
        let filesHtml = '';
        files.forEach(file => {
          const isDownloaded = file.is_downloaded || DOWNLOADED_FILES_SET.has(file.path);
          const icon = getFileIcon(file.ext);

          filesHtml += `
            <div class="file-card-row ${isDownloaded ? 'downloaded' : ''}" data-file-path="${escapeHtml(file.path)}">
              <div class="file-info-left">
                <span class="file-type-icon">${icon}</span>
                <div class="file-name-meta">
                  <span class="file-title-text" title="${escapeHtml(file.name)}">${escapeHtml(file.name)}</span>
                  <span class="file-size-meta">${escapeHtml(file.size || 'Datei')} &bull; ${escapeHtml((file.ext || '').toUpperCase())}</span>
                </div>
              </div>
              <div class="file-actions-right">
                <a href="${escapeHtml(file.download_url)}" target="_blank" rel="noopener noreferrer" class="btn-file-open" title="Im IServ Webmailer / Browser ansehen">
                  👁️ Öffnen
                </a>
                <button 
                  class="btn-file-share ${isDownloaded ? 'ready' : ''}" 
                  data-path="${escapeHtml(file.path)}" 
                  data-name="${escapeHtml(file.name)}" 
                  onclick="downloadSingleFileForAi(this.dataset.path, this.dataset.name, this)"
                  title="${isDownloaded ? 'Bereits in school/iserv_files gespeichert (KI hat Zugriff)' : 'Herunterladen, damit die KI das Dokument lesen und lösen kann'}"
                >
                  ${isDownloaded ? '✓ Für KI bereit' : '✨ Für KI freigeben'}
                </button>
              </div>
            </div>
          `;
        });
        filesContainer.innerHTML = filesHtml;
      }
    }

  } catch (err) {
    console.error('[IServ] Error loading folder:', err);
    if (statusInfo) {
      statusInfo.textContent = '⚠️ Verbindungsfehler';
    }
    if (foldersContainer) {
      foldersContainer.innerHTML = `
        <div style="padding: 1.2rem; color: var(--accent-urgent); font-size: 0.8rem; text-align: center;">
          ${ISERV_STATUS.online ? 'Ordner konnte nicht geladen werden.' : 'Lokaler Companion offline.'}
        </div>
      `;
    }
    if (filesContainer) {
      foldersContainer.innerHTML = '';
      filesContainer.innerHTML = `
        <div style="padding: 1.6rem; color: var(--text-secondary); font-size: 0.82rem; line-height: 1.5; text-align: center;">
          <div style="font-size: 1.8rem; margin-bottom: 0.4rem;">📁🔒</div>
          <strong style="color: var(--text-primary);">IServ Kursdateien erfordern den lokalen Companion-Server</strong><br>
          ${escapeHtml(err.message)}<br><br>
          Starte im Terminal einfach <code>python server.py</code> oder führe <code>start.bat</code> aus.
        </div>
      `;
    }
  }
}

async function downloadSingleFileForAi(filePath, fileName, btnElement) {
  if (!btnElement) return;
  const originalText = btnElement.innerHTML;
  btnElement.innerHTML = '⏳ Lade...';
  btnElement.disabled = true;

  try {
    const base = getApiBase();
    const res = await fetch(`${base}/api/iserv/download-file`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ path: filePath })
    });

    const data = await res.json();
    if (data.success) {
      DOWNLOADED_FILES_SET.add(filePath);
      btnElement.className = 'btn-file-share ready';
      btnElement.innerHTML = '✓ Für KI bereit';
      btnElement.title = 'Bereits in school/iserv_files gespeichert';
      const row = btnElement.closest('.file-card-row');
      if (row) row.classList.add('downloaded');
      console.log(`[IServ] File downloaded for AI: ${fileName} -> ${data.local_path}`);
    } else {
      throw new Error(data.error || 'Download fehlgeschlagen');
    }
  } catch (err) {
    alert(`Fehler beim Freigeben der Datei: ${err.message}`);
    btnElement.innerHTML = originalText;
  } finally {
    btnElement.disabled = false;
  }
}

async function downloadCurrentFolderForAi() {
  if (!CURRENT_FOLDER_PATH) return;
  const btn = document.getElementById('btnDownloadFolder');
  const lbl = document.getElementById('lblDownloadFolder');

  if (btn) btn.disabled = true;
  if (lbl) lbl.textContent = '⏳ Lade Ordner & Unterordner herunter...';

  try {
    const base = getApiBase();
    const res = await fetch(`${base}/api/iserv/download-folder`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ path: CURRENT_FOLDER_PATH })
    });

    const data = await res.json();
    if (data.success) {
      if (lbl) lbl.textContent = `✓ ${data.count} Dateien für KI bereit!`;
      document.querySelectorAll('.file-card-row').forEach(row => row.classList.add('downloaded'));
      document.querySelectorAll('.btn-file-share').forEach(b => {
        b.className = 'btn-file-share ready';
        b.innerHTML = '✓ Für KI bereit';
        b.title = 'Bereits in school/iserv_files gespeichert';
      });
      (data.files || []).forEach(f => DOWNLOADED_FILES_SET.add(f));
      
      setTimeout(() => {
        if (lbl) lbl.textContent = 'Ganzen Ordner für KI freigeben';
        if (btn) btn.disabled = false;
      }, 4000);
    } else {
      throw new Error(data.error || 'Ordner-Download fehlgeschlagen');
    }
  } catch (err) {
    alert(`Fehler beim Herunterladen des Ordners: ${err.message}`);
    if (lbl) lbl.textContent = 'Ganzen Ordner für KI freigeben';
    if (btn) btn.disabled = false;
  }
}

function refreshCurrentFolder() {
  if (CURRENT_FOLDER_PATH) {
    loadFachFolder(CURRENT_FOLDER_PATH);
  } else if (CURRENT_FACH_DEFAULT_FOLDER) {
    loadFachFolder(CURRENT_FACH_DEFAULT_FOLDER);
  }
}

// --- 11. INITIALIZATION ON DOM READY ---
window.addEventListener('DOMContentLoaded', () => {
  const theme = getInitialTheme();
  setTheme(theme);
  navigateTo('dashboard');
  initIservModule();
  checkPrivacyLockOnLoad();
});

