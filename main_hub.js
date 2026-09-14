// Global Navigation & Hub Router for Tonda's Learning Dashboard
// Handles switching between: 'kalender', 'politik', 'mathe', 'stundenplan'
// AND inside Mathe: 'steckbrief', 'schar', 'matrizen', 'trassierung'

let currentMainTab = 'kalender';
let currentMatheSubTab = 'steckbrief';

function switchMainTab(tabName) {
  currentMainTab = tabName;

  // 1. Update Navbar buttons
  document.querySelectorAll('.nav-tab').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tabName);
  });

  // 2. Toggle main views
  document.querySelectorAll('.portal-view').forEach(view => {
    view.classList.remove('active-view');
  });

  const activeView = document.getElementById('view-' + tabName);
  if (activeView) activeView.classList.add('active-view');

  // 3. Tab-specific initializations
  if (tabName === 'kalender') {
    renderCalendarView();
  } else if (tabName === 'politik') {
    renderPolitikView();
  } else if (tabName === 'stundenplan') {
    renderTimetable();
  } else if (tabName === 'mathe') {
    switchMatheSubTab(currentMatheSubTab);
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function switchMatheSubTab(subTabName) {
  currentMatheSubTab = subTabName;

  // 1. Update sub buttons
  document.querySelectorAll('.mathe-sub-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.sub === subTabName);
  });

  // 2. Update sub views
  document.querySelectorAll('.mathe-subview').forEach(view => {
    view.classList.remove('active-subview');
  });

  const activeSubView = document.getElementById('mathe-view-' + subTabName);
  if (activeSubView) activeSubView.classList.add('active-subview');

  // 3. Trigger specific redraws
  if (subTabName === 'schar' && typeof updateScharPlot === 'function') {
    setTimeout(updateScharPlot, 50);
  } else if (subTabName === 'trassierung' && typeof switchTrassMode === 'function') {
    switchTrassMode(typeof currentTrassMode !== 'undefined' ? currentTrassMode : 't2');
  } else if (subTabName === 'matrizen' && typeof loadLevelData === 'function') {
    loadLevelData();
  } else if (subTabName === 'steckbrief' && typeof renderSteckbriefContent === 'function') {
    renderSteckbriefContent();
  }
}

window.addEventListener('DOMContentLoaded', () => {
  // Start on Kalender or Politik (since exam is tomorrow!)
  switchMainTab('kalender');
});
