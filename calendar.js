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

// --- Datumslogik: Status, Hero und Badges werden aus dem heutigen Datum berechnet,
//     nie von Hand gepflegt (sonst veralten "morgen"/"geschrieben"-Texte). ---
const KLAUSUR_FACH_IDS = {
  'Mathematik': 'mathe',
  'Politik-Wirtschaft': 'politik',
  'Physik': 'physik',
  'Informatik': 'informatik',
  'Deutsch': 'deutsch',
  'Englisch': 'englisch',
  'Geschichte': 'geschichte',
  'Darstellendes Spiel': 'ds'
};

function parseKlausurDate(dateStr) {
  const [d, m, y] = dateStr.split('.').map(Number);
  return new Date(y, m - 1, d);
}

function klausurDaysUntil(k) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Math.round((parseKlausurDate(k.dateStr) - today) / 86400000);
}

function klausurCountdownText(days) {
  if (days < 0) return 'Geschrieben';
  if (days === 0) return 'HEUTE';
  if (days === 1) return 'MORGEN';
  return `in ${days} Tagen`;
}

function klausurWeekday(k) {
  return parseKlausurDate(k.dateStr).toLocaleDateString('de-DE', { weekday: 'long' });
}

function refreshKlausurStatus() {
  TONDA_KLAUSUREN.forEach(k => {
    const d = klausurDaysUntil(k);
    k.status = d < 0 ? 'done' : d <= 1 ? 'urgent' : d <= 7 ? 'soon' : 'upcoming';
  });
}

function getNextKlausuren(n = 1) {
  return TONDA_KLAUSUREN
    .filter(k => klausurDaysUntil(k) >= 0)
    .sort((a, b) => parseKlausurDate(a.dateStr) - parseKlausurDate(b.dateStr))
    .slice(0, n);
}

function buildKlausurHeroHtml() {
  const [next, after] = getNextKlausuren(2);
  if (!next) {
    return `<div class="urgent-hero-box"><div class="urgent-left"><h2 class="urgent-title">🎉 Keine offenen Klausuren im Plan</h2></div></div>`;
  }
  const days = klausurDaysUntil(next);
  const fachId = KLAUSUR_FACH_IDS[next.subject];
  const openAction = fachId ? `openFach('${fachId}')` : `navigateTo('kalender')`;
  const afterHtml = after ? `
          <span class="nu-label">Danach:</span>
          <div class="nu-card" style="border-left: 3px solid ${after.color};">
            <strong>${after.subject} (${after.course})</strong>
            <span>${klausurWeekday(after)}, ${after.dateStr} • ${after.period} Stunde • Raum ${after.room}</span>
          </div>` : '';
  return `
    <div class="urgent-hero-box" style="border-left-color: ${next.color};">
      <div class="urgent-left">
        <div class="urgent-alert-pill" style="color: ${next.color}; border-color: ${next.color};">
          <span class="status-dot" style="background: ${next.color};"></span>
          <strong>NÄCHSTE KLAUSUR: ${klausurCountdownText(days).toUpperCase()}</strong>
        </div>
        <h2 class="urgent-title">${next.subject} (${next.course})</h2>
        <div class="urgent-meta-grid">
          <div class="um-item">📅 <strong>${klausurWeekday(next)}, ${next.dateStr}</strong></div>
          <div class="um-item">⏰ <strong>${next.period} Stunde</strong> (Raum: <strong>${next.room}</strong>)</div>
          <div class="um-item">👨‍🏫 Lehrer: <strong>${next.teacher}</strong></div>
          <div class="um-item">🎯 Fokus: <strong>${next.topic}</strong></div>
        </div>
      </div>
      <div class="urgent-right">
        <div class="next-up-preview">${afterHtml}</div>
        <button class="btn-hero-study" style="background: ${next.color}; border-color: ${next.color};" onclick="${openAction}">
          ${next.subject} jetzt vorbereiten &rarr;
        </button>
      </div>
    </div>
  `;
}

refreshKlausurStatus();

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

    const cd = klausurCountdownText(klausurDaysUntil(k));
    if (k.status === 'done') {
      statusBadge = '<span class="k-badge k-badge-done">✅ Geschrieben</span>';
      cardClass += ' cal-card-done';
    } else if (k.status === 'urgent') {
      statusBadge = `<span class="k-badge k-badge-urgent">🚨 ${cd} (${k.dateStr.slice(0, 5)})</span>`;
      cardClass += ' cal-card-urgent';
    } else if (k.status === 'soon') {
      statusBadge = `<span class="k-badge k-badge-soon">⚡ ${cd} (${k.dateStr.slice(0, 5)})</span>`;
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
            <span class="cal-course-code">
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
          ${KLAUSUR_FACH_IDS[k.subject] && k.status !== 'done' ?
            `<button class="btn-cal-action btn-cal-highlight" onclick="openFach('${KLAUSUR_FACH_IDS[k.subject]}')">${k.subject} lernen &rarr;</button>` :
            `<span class="cal-future-tag">${k.status === 'done' ? 'erledigt' : '12. Jg.'}</span>`
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

  hero.innerHTML = buildKlausurHeroHtml();
}

function filterCalendar(filterType, btnEl) {
  currentCalendarFilter = filterType;
  document.querySelectorAll('.cal-filter-btn').forEach(b => b.classList.remove('active'));
  if (btnEl) btnEl.classList.add('active');
  renderCalendarView();
}
