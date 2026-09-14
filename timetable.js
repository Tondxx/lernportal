// Stundenplan-Engine für Tonda Beutler (Tutor: Jonas Hildebrandt)
// Exakt nach dem Schul-Stundenplan-Bild

let currentWeekMode = 'all'; // 'all', 'A', 'B'

const SCHEDULE_DATA = {
  1: {
    Mo: [{ course: 'MA11', teacher: 'Mey', room: 'R2', type: 'LK' }],
    Di: [{ course: 'pw25', teacher: 'Hf', room: 'R1', type: 'gA' }],
    Mi: [{ course: 'PH12', teacher: 'Lh', room: 'NW1', type: 'LK' }],
    Do: [{ course: 'de48', teacher: 'Hh', room: 'R3', type: 'gA' }],
    Fr: [
      { course: 'PH12', teacher: 'Lh', room: 'NW1', type: 'LK', week: 'A' },
      { course: 'MA11', teacher: 'Mey', room: 'R2', type: 'LK', week: 'B' }
    ]
  },
  2: {
    Mo: [{ course: 'MA11', teacher: 'Mey', room: 'R2', type: 'LK' }],
    Di: [{ course: 'pw25', teacher: 'Hf', room: 'R1', type: 'gA' }],
    Mi: [{ course: 'PH12', teacher: 'Lh', room: 'NW1', type: 'LK' }],
    Do: [{ course: 'de48', teacher: 'Hh', room: 'R3', type: 'gA' }],
    Fr: [
      { course: 'PH12', teacher: 'Lh', room: 'NW1', type: 'LK', week: 'A' },
      { course: 'MA11', teacher: 'Mey', room: 'R2', type: 'LK', week: 'B' }
    ]
  },
  3: {
    Mo: [],
    Di: [{ course: 'IF13', teacher: 'Tri', room: 'PC Sek2', type: 'LK' }],
    Mi: [{ course: 'ge27', teacher: 'Wn', room: 'R4', type: 'gA' }],
    Do: [{ course: 'IF13', teacher: 'Tri', room: 'PC Sek2', type: 'LK', week: 'B' }],
    Fr: [{ course: 'IF13', teacher: 'Tri', room: 'PC Sek2', type: 'LK' }]
  },
  4: {
    Mo: [],
    Di: [{ course: 'IF13', teacher: 'Tri', room: 'PC Sek2', type: 'LK' }],
    Mi: [{ course: 'ge27', teacher: 'Wn', room: 'R4', type: 'gA' }],
    Do: [{ course: 'IF13', teacher: 'Tri', room: 'PC Sek2', type: 'LK', week: 'B' }],
    Fr: [{ course: 'IF13', teacher: 'Tri', room: 'PC Sek2', type: 'LK' }]
  },
  5: {
    Mo: [{ course: 'PH12', teacher: 'Lh', room: 'NW1', type: 'LK' }],
    Di: [{ course: 'ds26', teacher: 'Kl', room: 'TR', type: 'gA' }],
    Mi: [{ course: 'sp15Z', teacher: 'Ln', room: 'G1', type: 'Sport' }],
    Do: [{ course: 'MA11', teacher: 'Mey', room: 'R2', type: 'LK' }],
    Fr: [
      { course: 'ge27', teacher: 'Wn', room: 'R4', type: 'gA', week: 'A' },
      { course: 'en39', teacher: 'Wv', room: 'E3', type: 'gA', week: 'B' }
    ]
  },
  6: {
    Mo: [{ course: 'PH12', teacher: 'Lh', room: 'NW1', type: 'LK' }],
    Di: [{ course: 'ds26', teacher: 'Kl', room: 'TR', type: 'gA' }],
    Mi: [{ course: 'sp15Z', teacher: 'Ln', room: 'G1', type: 'Sport' }],
    Do: [{ course: 'MA11', teacher: 'Mey', room: 'R2', type: 'LK' }],
    Fr: [
      { course: 'ge27', teacher: 'Wn', room: 'R4', type: 'gA', week: 'A' },
      { course: 'en39', teacher: 'Wv', room: 'E3', type: 'gA', week: 'B' }
    ]
  },
  7: {
    Mo: [], Di: [], Mi: [], Do: [], Fr: []
  },
  8: {
    Mo: [{ course: 'sf4', teacher: 'Jm', room: 'E3', type: 'Seminar' }],
    Di: [{ course: 'en39', teacher: 'Wv', room: 'E3', type: 'gA' }],
    Mi: [],
    Do: [
      { course: 'ds26', teacher: 'Kl', room: 'TR', type: 'gA', week: 'A' },
      { course: 'pw25', teacher: 'Hf', room: 'R1', type: 'gA', week: 'B' }
    ],
    Fr: [{ course: 'de48', teacher: 'Hh', room: 'R3', type: 'gA', week: 'B' }]
  },
  9: {
    Mo: [{ course: 'sf4', teacher: 'Jm', room: 'E3', type: 'Seminar' }],
    Di: [{ course: 'en39', teacher: 'Wv', room: 'E3', type: 'gA' }],
    Mi: [],
    Do: [
      { course: 'ds26', teacher: 'Kl', room: 'TR', type: 'gA', week: 'A' }
    ],
    Fr: [{ course: 'de48', teacher: 'Hh', room: 'R3', type: 'gA', week: 'B' }]
  }
};

const COURSE_COLOR_MAP = {
  'MA11': '#38bdf8', // sky blue
  'pw25': '#34d399', // emerald
  'PH12': '#818cf8', // indigo
  'de48': '#f43f5e', // rose
  'IF13': '#a78bfa', // purple
  'ge27': '#fbbf24', // amber
  'ds26': '#f472b6', // pink
  'en39': '#fb923c', // orange
  'sp15Z': '#2dd4bf', // teal
  'sf4': '#94a3b8'   // slate
};

function renderTimetable() {
  const tbody = document.getElementById('timetableBody');
  if (!tbody) return;

  const days = ['Mo', 'Di', 'Mi', 'Do', 'Fr'];
  let html = '';

  for (let st = 1; st <= 9; st++) {
    html += `<tr><td class="stunde-num">${st}</td>`;
    days.forEach(day => {
      const slots = SCHEDULE_DATA[st][day] || [];
      if (slots.length === 0) {
        html += `<td class="tt-cell tt-empty">-</td>`;
      } else {
        let cellContent = '';
        slots.forEach(slot => {
          const isVisible = (currentWeekMode === 'all' || !slot.week || slot.week === currentWeekMode);
          if (!isVisible) return;

          const color = COURSE_COLOR_MAP[slot.course] || '#64748b';
          const weekBadge = slot.week ? `<span class="tt-week-badge week-${slot.week}">${slot.week}-Woche</span>` : '';

          cellContent += `
            <div class="tt-course-item" style="--c-color: ${color}">
              <div class="tt-item-head">
                <strong>${slot.course}</strong>
                ${weekBadge}
              </div>
              <div class="tt-item-details">
                <span>${slot.teacher}</span> &bull; <span>${slot.room}</span>
              </div>
            </div>
          `;
        });
        html += `<td class="tt-cell">${cellContent || '<span class="tt-dimmed">Frei in ' + currentWeekMode + '</span>'}</td>`;
      }
    });
    html += `</tr>`;
  }

  tbody.innerHTML = html;
}

function setTimetableWeek(mode, btnEl) {
  currentWeekMode = mode;
  document.querySelectorAll('.tt-filter-btn').forEach(b => b.classList.remove('active'));
  if (btnEl) btnEl.classList.add('active');
  renderTimetable();
}
