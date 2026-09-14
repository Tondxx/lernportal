// Klausuren-Kalender für Tonda Beutler (Jahrgang 12, Schuljahr 2026/2027)
// Automatisch abgeglichen aus Klausurplan12.pdf und Stundenplan

const TONDA_KLAUSUREN = [
  // 1. Halbjahr (12.1)
  {
    id: "k-01",
    dateStr: "11.09.2026",
    dayOfWeek: "Fr",
    kw: 37,
    period: "1.",
    course: "MA11-Mey",
    subject: "Mathematik",
    type: "eA (LK)",
    teacher: "Mey",
    room: "R2",
    topic: "Thema 1: Analysis & Kurvenanpassung, Scharen, LGS",
    status: "done",
    color: "#38bdf8"
  },
  {
    id: "k-02",
    dateStr: "15.09.2026",
    dayOfWeek: "Di",
    kw: 38,
    period: "1.",
    course: "pw25-Hf",
    subject: "Politik-Wirtschaft",
    type: "gA",
    teacher: "Hf",
    room: "R1",
    topic: "Klausur 1 (12.1): Wirtschaftspolitik & Partizipation",
    status: "urgent", // MORGEN!
    color: "#34d399"
  },
  {
    id: "k-03",
    dateStr: "18.09.2026",
    dayOfWeek: "Fr",
    kw: 38,
    period: "1.",
    course: "PH12-Lh",
    subject: "Physik",
    type: "eA (LK)",
    teacher: "Lh",
    room: "NW1",
    topic: "Klausur 1 (12.1): Elektrische & Magnetische Felder",
    status: "soon", // DIESEN FREITAG!
    color: "#818cf8"
  },
  {
    id: "k-04",
    dateStr: "25.09.2026",
    dayOfWeek: "Fr",
    kw: 39,
    period: "3.",
    course: "IF13-Tri",
    subject: "Informatik",
    type: "eA (LK)",
    teacher: "Tri",
    room: "PC Sek2",
    topic: "Klausur 1 (12.1): OOP & Algorithmen",
    status: "upcoming",
    color: "#a78bfa"
  },
  {
    id: "k-05",
    dateStr: "01.10.2026",
    dayOfWeek: "Do",
    kw: 40,
    period: "1.",
    course: "de48-Hh",
    subject: "Deutsch",
    type: "gA",
    teacher: "Hh",
    room: "R3",
    topic: "Klausur 1 (12.1): Textanalyse & Dramen",
    status: "upcoming",
    color: "#f43f5e"
  },
  {
    id: "k-06",
    dateStr: "06.10.2026",
    dayOfWeek: "Di",
    kw: 41,
    period: "8.",
    course: "en39-Wv",
    subject: "Englisch",
    type: "gA",
    teacher: "Wv",
    room: "E3",
    topic: "Klausur 1 (12.1): Reading Comprehension & Composition",
    status: "upcoming",
    color: "#fb923c"
  },
  {
    id: "k-07",
    dateStr: "07.10.2026",
    dayOfWeek: "Mi",
    kw: 41,
    period: "3.",
    course: "ge27-Wn",
    subject: "Geschichte",
    type: "gA",
    teacher: "Wn",
    room: "R4",
    topic: "Klausur 1 (12.1): Quellenanalyse & Modernisierung",
    status: "upcoming",
    color: "#fbbf24"
  },
  {
    id: "k-08",
    dateStr: "06.11.2026",
    dayOfWeek: "Fr",
    kw: 45,
    period: "1.",
    course: "MA11-Mey",
    subject: "Mathematik",
    type: "eA (LK)",
    teacher: "Mey",
    room: "R2",
    topic: "Klausur 2 (12.1): Integralrechnung & Vertiefung",
    status: "upcoming",
    color: "#38bdf8"
  },
  {
    id: "k-09",
    dateStr: "10.11.2026",
    dayOfWeek: "Di",
    kw: 46,
    period: "3.",
    course: "IF13-Tri",
    subject: "Informatik",
    type: "eA (LK)",
    teacher: "Tri",
    room: "PC Sek2",
    topic: "Klausur 2 (12.1): Datenbanken & Softwareentwurf",
    status: "upcoming",
    color: "#a78bfa"
  },
  {
    id: "k-10",
    dateStr: "13.11.2026",
    dayOfWeek: "Fr",
    kw: 46,
    period: "1.",
    course: "PH12-Lh",
    subject: "Physik",
    type: "eA (LK)",
    teacher: "Lh",
    room: "NW1",
    topic: "Klausur 2 (12.1): Schwingungen & Wellen",
    status: "upcoming",
    color: "#818cf8"
  },
  {
    id: "k-11",
    dateStr: "17.11.2026",
    dayOfWeek: "Di",
    kw: 47,
    period: "1.",
    course: "pw25-Hf",
    subject: "Politik-Wirtschaft",
    type: "gA",
    teacher: "Hf",
    room: "R1",
    topic: "Klausur 2 (12.1): Soziale Marktwirtschaft & Globalisierung",
    status: "upcoming",
    color: "#34d399"
  },
  {
    id: "k-12",
    dateStr: "19.11.2026",
    dayOfWeek: "Do",
    kw: 47,
    period: "1.",
    course: "de48-Hh",
    subject: "Deutsch",
    type: "gA",
    teacher: "Hh",
    room: "R3",
    topic: "Klausur 2 (12.1): Erörterung / Textgebundene Arbeit",
    status: "upcoming",
    color: "#f43f5e"
  },
  {
    id: "k-13",
    dateStr: "24.11.2026",
    dayOfWeek: "Di",
    kw: 48,
    period: "5.",
    course: "ds26-Kl",
    subject: "Darstellendes Spiel",
    type: "gA",
    teacher: "Kl",
    room: "TR",
    topic: "Klausur 1 (12.1): Theatertheorie & Gestaltungskonzept",
    status: "upcoming",
    color: "#f472b6"
  },
  {
    id: "k-14",
    dateStr: "25.11.2026",
    dayOfWeek: "Mi",
    kw: 48,
    period: "3.",
    course: "ge27-Wn",
    subject: "Geschichte",
    type: "gA",
    teacher: "Wn",
    room: "R4",
    topic: "Klausur 2 (12.1): Kaiserreich / Weimarer Republik",
    status: "upcoming",
    color: "#fbbf24"
  },
  {
    id: "k-15",
    dateStr: "27.11.2026",
    dayOfWeek: "Fr",
    kw: 48,
    period: "5.",
    course: "en39-Wv",
    subject: "Englisch",
    type: "gA",
    teacher: "Wv",
    room: "E3",
    topic: "Klausur 2 (12.1): Mediation & Literary Analysis",
    status: "upcoming",
    color: "#fb923c"
  },

  // 2. Halbjahr (12.2 / Vor-Abi)
  {
    id: "k-16",
    dateStr: "09.04.2027",
    dayOfWeek: "Fr",
    kw: 14,
    period: "5.",
    course: "en39-Wv",
    subject: "Englisch",
    type: "gA",
    teacher: "Wv",
    room: "E3",
    topic: "Klausur 12.2",
    status: "upcoming",
    color: "#fb923c"
  },
  {
    id: "k-17",
    dateStr: "23.04.2027",
    dayOfWeek: "Fr",
    kw: 16,
    period: "1.-180 Min.",
    course: "PH12-Lh",
    subject: "Physik",
    type: "eA (LK)",
    teacher: "Lh",
    room: "NW1",
    topic: "Vorabiturklausur Physik (180 Min.)",
    status: "upcoming",
    color: "#818cf8"
  },
  {
    id: "k-18",
    dateStr: "27.04.2027",
    dayOfWeek: "Di",
    kw: 17,
    period: "1.",
    course: "pw25-Hf",
    subject: "Politik-Wirtschaft",
    type: "gA",
    teacher: "Hf",
    room: "R1",
    topic: "Klausur 12.2",
    status: "upcoming",
    color: "#34d399"
  },
  {
    id: "k-19",
    dateStr: "30.04.2027",
    dayOfWeek: "Fr",
    kw: 17,
    period: "1.-180 Min.",
    course: "MA11-Mey",
    subject: "Mathematik",
    type: "eA (LK)",
    teacher: "Mey",
    room: "R2",
    topic: "Vorabiturklausur Mathematik (180 Min.)",
    status: "upcoming",
    color: "#38bdf8"
  },
  {
    id: "k-20",
    dateStr: "04.05.2027",
    dayOfWeek: "Di",
    kw: 18,
    period: "3.-180 Min.",
    course: "IF13-Tri",
    subject: "Informatik",
    type: "eA (LK)",
    teacher: "Tri",
    room: "PC Sek2",
    topic: "Vorabiturklausur Informatik (180 Min.)",
    status: "upcoming",
    color: "#a78bfa"
  },
  {
    id: "k-21",
    dateStr: "11.05.2027",
    dayOfWeek: "Di",
    kw: 19,
    period: "5.",
    course: "ds26-Kl",
    subject: "Darstellendes Spiel",
    type: "gA",
    teacher: "Kl",
    room: "TR",
    topic: "Klausur 12.2",
    status: "upcoming",
    color: "#f472b6"
  },
  {
    id: "k-22",
    dateStr: "20.05.2027",
    dayOfWeek: "Do",
    kw: 20,
    period: "1.",
    course: "de48-Hh",
    subject: "Deutsch",
    type: "gA",
    teacher: "Hh",
    room: "R3",
    topic: "Klausur 12.2",
    status: "upcoming",
    color: "#f43f5e"
  },
  {
    id: "k-23",
    dateStr: "28.05.2027",
    dayOfWeek: "Fr",
    kw: 21,
    period: "5.",
    course: "ge27-Wn",
    subject: "Geschichte",
    type: "gA",
    teacher: "Wn",
    room: "R4",
    topic: "Klausur 12.2",
    status: "upcoming",
    color: "#fbbf24"
  }
];

let currentCalendarFilter = 'pending'; // 'pending' default: offene Klausuren

function renderCalendarView() {
  renderUrgentKlausurHero();

  const container = document.getElementById('calendarTimeline');
  if (!container) return;

  let list = TONDA_KLAUSUREN;
  if (currentCalendarFilter === 'pending') {
    list = TONDA_KLAUSUREN.filter(k => k.status !== 'done');
  } else if (currentCalendarFilter === '12.1') {
    list = TONDA_KLAUSUREN.filter(k => parseInt(k.id.slice(2)) <= 15);
  } else if (currentCalendarFilter === '12.2') {
    list = TONDA_KLAUSUREN.filter(k => parseInt(k.id.slice(2)) >= 16);
  } else if (currentCalendarFilter === 'all') {
    list = TONDA_KLAUSUREN;
  } else {
    list = TONDA_KLAUSUREN.filter(k => k.subject.toLowerCase().includes(currentCalendarFilter.toLowerCase()));
  }

  let html = '';
  list.forEach(k => {
    let statusBadge = '';
    let cardClass = 'cal-card';

    if (k.status === 'done') {
      statusBadge = '<span class="k-badge k-badge-done">✅ Geschrieben (11.09.)</span>';
      cardClass += ' cal-card-done';
    } else if (k.status === 'urgent') {
      statusBadge = '<span class="k-badge k-badge-urgent glow-red">🚨 MORGEN (15.09.)</span>';
      cardClass += ' cal-card-urgent';
    } else if (k.status === 'soon') {
      statusBadge = '<span class="k-badge k-badge-soon glow-yellow">⚡ DIESEN FREITAG (18.09.)</span>';
      cardClass += ' cal-card-soon';
    } else {
      statusBadge = `<span class="k-badge k-badge-pending">KW ${k.kw}</span>`;
    }

    html += `
      <div class="${cardClass}" style="--sub-color: ${k.color}">
        <div class="cal-card-left">
          <div class="cal-date-pill">
            <span class="cal-day">${k.dayOfWeek}</span>
            <span class="cal-date">${k.dateStr.slice(0, 5)}</span>
            <span class="cal-year">${k.dateStr.slice(6)}</span>
          </div>
        </div>
        <div class="cal-card-center">
          <div class="cal-card-header-row">
            <span class="cal-course-code" style="background: ${k.color}22; color: ${k.color}; border: 1px solid ${k.color}55;">
              ${k.course}
            </span>
            <span class="cal-subject-title">${k.subject} <span class="cal-type-badge">${k.type}</span></span>
            ${statusBadge}
          </div>
          <div class="cal-topic-desc">${k.topic}</div>
          <div class="cal-meta-row">
            <span>👨‍🏫 Lehrer: <strong>${k.teacher}</strong></span>
            <span>📍 Raum: <strong>${k.room}</strong></span>
            <span>⏰ Stunde: <strong>${k.period}</strong></span>
            <span>📅 Kalenderwoche: <strong>KW ${k.kw}</strong></span>
          </div>
        </div>
        <div class="cal-card-right">
          ${k.subject === 'Mathematik' ? 
            `<button class="btn-cal-action btn-cal-math" onclick="switchMainTab('mathe')">📐 Mathe-Thema 1</button>` :
            (k.subject === 'Politik-Wirtschaft' ?
              `<button class="btn-cal-action btn-cal-highlight" onclick="switchMainTab('politik')">🏛️ Politik lernen</button>` :
              `<span class="cal-future-tag">12. Jg.</span>`
            )
          }
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

function renderUrgentKlausurHero() {
  const hero = document.getElementById('urgentKlausurHero');
  if (!hero) return;

  hero.innerHTML = `
    <div class="urgent-hero-box">
      <div class="urgent-left">
        <div class="urgent-alert-pill">
          <span class="pulse-dot"></span>
          <strong>NÄCHSTE KLAUSUR: MORGEN!</strong>
        </div>
        <h2 class="urgent-title">🏛️ Politik-Wirtschaft (pw25-Hf)</h2>
        <div class="urgent-meta-grid">
          <div class="um-item">📅 <strong>Dienstag, 15.09.2026</strong></div>
          <div class="um-item">⏰ <strong>1. Stunde</strong> (Raum: <strong>R1</strong>)</div>
          <div class="um-item">👨‍🏫 Lehrer: <strong>Hf</strong></div>
          <div class="um-item">🎯 Fokus: <strong>Klausur 1 (12.1)</strong></div>
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
        <button class="btn-hero-study" onclick="switchMainTab('politik')">
          🔥 Jetzt sofort Politik-Klausur vorbereiten &rarr;
        </button>
      </div>
    </div>
  `;
}

function filterCalendar(filterType, btnEl) {
  currentCalendarFilter = filterType;
  document.querySelectorAll('.cal-filter-btn').forEach(b => b.classList.remove('active'));
  if (btnEl) btnEl.classList.add('active');
  renderCalendarView();
}
