// ============================================================
// MATHE_TRAINER.JS – Mathe-Klausurtrainer (Modul 00, "Start hier")
// Neues Design nur für Mathe: Start · Verstehen · Üben · Probeklausur · Spickzettel.
// Benötigt: integral_kurs.js (IKLib), schar_kurs.js (Aufgaben), mathe_trainer_content.js (MT_DATA).
// ============================================================
(function () {
  'use strict';
  const D = window.MT_DATA;
  const L = window.IKLib;
  if (!D || !L) { console.warn('mathe_trainer.js: MT_DATA oder IKLib fehlt.'); return; }
  const { M, renderMath, plotSetup, drawCurve, fillSigned, fmt, fmtN } = L;

  // ---------------------------------------------------------------- Zustand
  const LS = 'mt_state_v1';
  function defaultState() {
    return { tab: 'start', lesson: 'L1', done: {}, plan: {}, practice: { topic: 'all', teil: 'all', open: null, focus: null },
      exam: { status: 'idle', start: 0, aEnd: 0, end: 0, scores: {} }, orIdx: 0 };
  }
  function loadState() {
    try {
      const s = JSON.parse(localStorage.getItem(LS) || 'null');
      if (s && typeof s === 'object') {
        const d = defaultState();
        return Object.assign(d, s, { practice: Object.assign(d.practice, s.practice || {}), exam: Object.assign(d.exam, s.exam || {}) });
      }
    } catch (e) { /* ohne Speicher weiterarbeiten */ }
    return defaultState();
  }
  let state = loadState();
  function save() { try { localStorage.setItem(LS, JSON.stringify(state)); } catch (e) { /* egal */ } scheduleSync(); }

  // ---------------------------------------------------------------- Antworten speichern (Browser + Server-Datei)
  // Alles, was du in die Felder tippst, bleibt im Browser (localStorage) und wird – wenn der lokale Server läuft –
  // zusätzlich nach Portal/data/private/mathe_antworten.json geschrieben (privat, nicht in Git). So kann ich es später korrigieren.
  const AK = 'mt_answers_v1';
  function loadAnswers() { try { return JSON.parse(localStorage.getItem(AK) || '{}') || {}; } catch (e) { return {}; } }
  let answers = loadAnswers();
  function saveAnswers() { try { localStorage.setItem(AK, JSON.stringify(answers)); } catch (e) { /* egal */ } scheduleSync(); }
  let syncMsg = '', syncTimer = null, syncReady = false;
  function setSync(msg) { syncMsg = msg; const el = document.getElementById('mt-sync'); if (el) el.textContent = msg; }
  function bundle() {
    return { version: 1, updated: new Date().toISOString(), answers: answers, practiceScores: L.loadProgress(),
      exam: state.exam, lessonsDone: state.done };
  }
  function scheduleSync() {
    if (!syncReady) return;
    setSync('💾 speichert …');
    clearTimeout(syncTimer);
    syncTimer = setTimeout(doSync, 700);
  }
  function doSync() {
    fetch('/api/mathe-answers', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(bundle()) })
      .then(r => r.json())
      .then(j => setSync(j && j.status === 'ok' ? '💾 gespeichert (auch als Datei für Claude)' : '💾 nur im Browser gespeichert'))
      .catch(() => setSync('💾 nur im Browser gespeichert (Server aus – bei Bedarf „Antworten exportieren“)'));
  }
  function pullFromServer() {
    fetch('/api/mathe-answers').then(r => r.json()).then(j => {
      if (!j || !j.answers) return;
      let changed = false;
      Object.keys(j.answers).forEach(k => {
        const sv = j.answers[k], lo = answers[k];
        if (!lo || (sv.ts || 0) > (lo.ts || 0)) { answers[k] = sv; changed = true; }
      });
      if (changed) {
        try { localStorage.setItem(AK, JSON.stringify(answers)); } catch (e) { /* egal */ }
        const ae = document.activeElement;
        if (!ae || ae.tagName !== 'TEXTAREA') render();
      }
    }).catch(() => { /* kein Server: nur lokal */ }).then(() => { syncReady = true; });
  }
  function onAnswerInput(e) {
    const el = e.target;
    if (!el || !el.dataset || !el.dataset.key) return;
    const f = findPart(el.dataset.pid);
    if (!f) return;
    const key = el.dataset.key;
    const a = answers[key] || (answers[key] = { key: key, modus: key.split('-')[0], aufgabe: f.t.id, titel: f.t.title, teil: f.p.id,
      label: f.p.label, frage: f.p.text, be: f.p.be, notiz: '', zahlen: {} });
    if (el.dataset.kind === 'note') a.notiz = el.value;
    else { const i = el.dataset.i; a.zahlen[i] = { label: f.p.nums[i].label, wert: el.value }; }
    a.ts = Date.now();
    saveAnswers();
  }
  function answersMarkdown() {
    const NL = String.fromCharCode(10);
    const keys = Object.keys(answers).filter(k => answers[k].notiz || Object.keys(answers[k].zahlen || {}).some(i => answers[k].zahlen[i].wert));
    keys.sort();
    let md = '# Meine Antworten (Mathe-Klausurtrainer)' + NL + NL + 'Stand: ' + new Date().toLocaleString('de-DE') + NL;
    keys.forEach(k => {
      const a = answers[k];
      md += NL + '## ' + (a.modus === 'practice' ? 'Üben' : 'Probeklausur') + ' – Aufgabe ' + a.aufgabe + ' ' + (a.label || '') + ' (' + a.be + ' BE) – ' + a.titel + NL;
      md += 'Frage: ' + a.frage + NL + NL;
      Object.keys(a.zahlen || {}).forEach(i => { if (a.zahlen[i].wert) md += '- Zahl ' + a.zahlen[i].label + ': ' + a.zahlen[i].wert + NL; });
      if (a.notiz) md += NL + 'Mein Lösungsweg:' + NL + a.notiz + NL;
    });
    return md;
  }

  // ---------------------------------------------------------------- Hilfen
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;'); }
  function escText(s) { return String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  const OPS = ['Bestimmen', 'Berechnen', 'Zeigen', 'Begründen', 'Geben', 'Ermitteln', 'Beschreiben', 'Beurteilen', 'Erläutern', 'Erklären',
    'Untersuchen', 'Nachweisen', 'Angeben', 'Zeichnen', 'Deuten', 'Vervollständigen', 'Entscheiden', 'Skizzieren', 'Prüfen'];
  const OP_RE = new RegExp('(^|>|\\. |\\s)(' + OPS.join('|') + ')(?=[\\s,])', 'g');
  function T(s) { return M(String(s).replace(OP_RE, '$1<span class="mt-op">$2</span>')); }
  function root() { return document.getElementById('mt-root'); }
  function $(id) { return document.getElementById(id); }

  const ALL_EXAM_TASKS = D.EXAM1.tasks;
  // Aufgaben mit e-Funktion / ln werden ausgeblendet (noch nicht im Unterricht); sie liegen weiter in Modul 06.
  const HIDDEN = ['A1', 'A5', 'B1', 'SB2'];
  function practiceTasks() {
    return (D.EXTRA || []).concat(L.allTasks().filter(t => (t.mod === 'ik' || t.mod === 'sk') && HIDDEN.indexOf(t.id) < 0));
  }
  function taskTeil(t) { return t.teil || t.id.replace(/^S/, '').charAt(0); }
  function taskTopic(t) { return t.topic || (t.mod === 'sk' ? 'schar' : 'integral'); }
  const EXTRA_LESSON = { SA6: 'L10', SB1: 'L9', SB2: 'L9' };
  function lessonOf(t) {
    if (t.lesson) return D.LESSONS.find(l => l.id === t.lesson);
    if (EXTRA_LESSON[t.id]) return D.LESSONS.find(l => l.id === EXTRA_LESSON[t.id]);
    return D.LESSONS.find(l => (l.tasks || []).indexOf(t.id) >= 0);
  }
  function findPart(pid) {
    const all = practiceTasks().concat(ALL_EXAM_TASKS);
    for (const t of all) for (const p of t.parts) if (p.id === pid) return { t, p };
    return null;
  }
  function taskBE(t) { return t.parts.reduce((s, p) => s + p.be, 0); }
  function nextMathExam() {
    try {
      if (typeof getNextKlausuren === 'function') {
        return getNextKlausuren(30).find(k => /Mathe/i.test(k.subject)) || null;
      }
    } catch (e) { /* ignorieren */ }
    return null;
  }

  // ---------------------------------------------------------------- Aufbau
  const TABS = [['start', '🎯 Start'], ['verstehen', '🧠 Verstehen'], ['ueben', '✏️ Üben'], ['klausur', '⏱ Probeklausur'], ['spick', '📄 Spickzettel']];

  function header() {
    const k = nextMathExam();
    let chip = '';
    if (k) {
      const days = klausurDaysUntil(k);
      chip = '<div class="mt-count' + (days > 3 ? ' far' : '') + '">⏳ Klausur ' + klausurCountdownText(days) +
        ' · ' + klausurWeekday(k) + ', ' + k.dateStr + ' · ' + k.period + ' Std. · ' + k.room + '</div>';
    }
    return '<div class="mt-head"><div><h2>📐 Mathe-Klausurtrainer</h2>' +
      '<div class="mt-sub">Integral &amp; Bestand · Funktionsscharen &amp; Ortskurven · Aufgaben im Abi-Stil</div>' +
      '<div class="mt-sub" id="mt-sync">' + syncMsg + '</div></div>' + chip + '</div>';
  }

  function render() {
    const r = root();
    if (!r) return;
    L.injectStyles();
    let body = '';
    if (state.tab === 'start') body = viewStart();
    else if (state.tab === 'verstehen') body = viewLesson();
    else if (state.tab === 'ueben') body = viewPractice();
    else if (state.tab === 'klausur') body = viewExam();
    else body = viewSpick();
    r.innerHTML = '<div class="mt-app" id="mt-app">' + header() +
      '<div class="mt-tabs">' + TABS.map(([id, label]) =>
        '<button class="mt-tab' + (state.tab === id ? ' on' : '') + '" onclick="mtTab(\'' + id + '\')">' + label + '</button>').join('') + '</div>' +
      body + '</div>';
    const nav = document.querySelector('.portal-nav');
    const app = $('mt-app');
    if (app && nav) app.style.setProperty('--mt-sticky', (nav.offsetHeight + 6) + 'px');
    if (!r.dataset.mtl) { r.dataset.mtl = '1'; r.addEventListener('input', onAnswerInput); pullFromServer(); }
    renderMath(r);
    post();
  }

  function post() {
    if (state.tab === 'verstehen') {
      const les = D.LESSONS.find(l => l.id === state.lesson);
      if (les && les.demo === 'bestand') bestandDraw();
      if (les && les.demo === 'ortskurve') orSelect(state.orIdx);
    }
    if (state.tab === 'ueben' && state.practice.open) drawFigsFor([findTask(state.practice.open)]);
    if (state.tab === 'klausur') {
      const ex = state.exam;
      if (ex.status === 'A') drawFigsFor(ALL_EXAM_TASKS.filter(t => t.teil === 'A'));
      else if (ex.status === 'B') drawFigsFor(ALL_EXAM_TASKS.filter(t => t.teil === 'B'));
      else if (ex.status === 'review') drawFigsFor(ALL_EXAM_TASKS);
      if (ex.status === 'A' || ex.status === 'B') startTicker();
    }
  }
  function findTask(id) { return practiceTasks().concat(ALL_EXAM_TASKS).find(t => t.id === id); }
  function drawFigsFor(tasks) {
    tasks.forEach(t => { if (t && t.fig) L.drawFig($('mt-fig-' + t.id), t.fig); });
  }

  // ================================================================ START
  const PLAN = [
    { id: 'p1', min: 10, title: 'Lektion 1: Bestand & Änderungsrate', desc: 'Badewanne verstehen – die Grundidee hinter allem.', go: ['verstehen', 'L1'] },
    { id: 'p2', min: 20, title: 'Lektion 2 + 3: Aufleiten & Integral', desc: 'Stammfunktionen bilden, F(b) − F(a) rechnen. Selbsttests machen.', go: ['verstehen', 'L2'] },
    { id: 'p3', min: 15, title: 'Lektion 4 + 5: Fläche & Graph f ↔ F', desc: 'Nullstellen beachten; aus f auf F schließen.', go: ['verstehen', 'L4'] },
    { id: 'p4', min: 25, title: 'Lektion 6: Bestandsaufgaben + 1 Aufgabe', desc: 'Das Komplett-Rezept. Demo ausprobieren, dann Aufgabe B2 üben.', go: ['verstehen', 'L6'] },
    { id: 'p5', min: 30, title: 'Lektion 7–9: Schar, Extrempunkte, Ortskurve', desc: 'Mit k rechnen wie mit einer Zahl; Ortskurve in 3 Schritten.', go: ['verstehen', 'L7'] },
    { id: 'p6', min: 25, title: 'Lektion 11: Steckbrief → Schar → Tangente → Dreieck', desc: 'Der Typ aus deiner Beispielklausur. Danach Aufgabe SB3 üben. (Lektion 10 „Für welches k“ ist kurz.)', go: ['verstehen', 'L11'] },
    { id: 'p7', min: 90, title: 'Probeklausur unter Echtbedingungen', desc: '90 Minuten, Handy weg, Teil A ohne Rechner. Danach ehrlich bewerten.', go: ['klausur', null] },
    { id: 'p8', min: 25, title: 'Fehler nacharbeiten + Spickzettel lesen', desc: 'Schwächste Aufgabe nochmal rechnen. Spickzettel einmal komplett lesen.', go: ['spick', null] },
    { id: 'p9', min: 5, title: 'Taschenrechner prüfen, Sachen packen, früh schlafen', desc: 'Batterien? Modus „Bogenmaß“ nur bei sin/cos nötig. Schlaf schlägt Mehr-Lernen.', go: null }
  ];
  const TYPES = [
    { cls: 'integral', chip: '∫ Integral', title: 'Bestand aus Änderungsrate', text: 'Graph/Tabelle/Polynom: Zu- und Abnahme, Maximum, Bestand nach t Stunden.', les: 'L6' },
    { cls: 'integral', chip: '∫ Integral', title: 'Stammfunktion & Integral berechnen', text: 'Aufleiten, Hauptsatz F(b) − F(a), Integral mit Parameter.', les: 'L2' },
    { cls: 'integral', chip: '∫ Integral', title: 'Fläche', text: 'Zur x-Achse (Nullstellen!) und zwischen zwei Graphen.', les: 'L4' },
    { cls: 'integral', chip: '∫ Integral', title: 'Graph von f ↔ Graph von F', text: 'Aus dem Graphen Hoch-, Tief- und Wendepunkte von F lesen.', les: 'L5' },
    { cls: 'schar', chip: '📈 Schar', title: 'Schar untersuchen', text: 'Nullstellen, Symmetrie, Extrem- und Wendepunkte mit k.', les: 'L8' },
    { cls: 'ort', chip: '🧭 Ortskurve', title: 'Ortskurve bestimmen', text: 'k aus x auflösen, in y einsetzen. Hochbehälter-Typ.', les: 'L9' },
    { cls: 'schar', chip: '📈 Schar', title: 'Schar aus Steckbrief, Tangente, Dreieck', text: 'Beispielklausur-Typ: LGS → Schar → Tangente → Dreieck → mittlere Änderungsrate.', les: 'L11' },
    { cls: 'schar', chip: '📈 Schar', title: 'k bestimmen', text: '„Für welches k gilt …?“', les: 'L10' }
  ];

  function viewStart() {
    const doneL = D.LESSONS.filter(l => state.done[l.id]).length;
    const prog = L.loadProgress();
    const pt = practiceTasks();
    let got = 0, max = 0;
    pt.forEach(t => { max += L.taskMax(t); got += L.taskScore(t, prog); });
    const examSum = state.exam.status === 'review' ? examTotals() : null;
    const planDone = PLAN.filter(p => state.plan[p.id]).length;
    const planMin = PLAN.reduce((s, p) => s + p.min, 0);
    return '' +
      '<div class="mt-card hero"><h3 class="mt-hero-title">Dein Ziel für die Klausur</h3>' +
      '<p>Du musst <b>Integral &amp; Bestand</b> (ca. 60 %) und <b>Funktionsscharen &amp; Ortskurven</b> (ca. 40 %) sicher können. Hier lernst du beides in kleinen Schritten – erst verstehen, dann Aufgaben im Abi-Stil, dann Probeklausur.</p>' +
      '<div class="mt-row"><button class="mt-btn primary" onclick="mtGo(\'verstehen\',\'L1\')">▶ Mit Lektion 1 starten</button>' +
      '<button class="mt-btn" onclick="mtTab(\'klausur\')">⏱ Zur Probeklausur</button>' +
      '<button class="mt-btn" onclick="mtTab(\'spick\')">📄 Spickzettel</button></div></div>' +

      '<div class="mt-grid2">' +
      '<div class="mt-card"><h3>So ist die Klausur vermutlich aufgebaut</h3>' +
      '<ul><li><b>90 Minuten</b>, Mathe eA.</li><li><b>Ein Teil ohne Taschenrechner</b>, ein Teil mit Taschenrechner (laut deiner Info).</li><li>Etwa <b>60 % Integral</b>, Rest <b>Funktionsschar &amp; Ortskurve</b>.</li></ul>' +
      '<div class="mt-split"><div class="i" style="width:60%">Integral ≈ 60 %</div><div class="s" style="width:40%">Schar ≈ 40 %</div></div>' +
      '<p class="mt-muted">Quelle: deine Angaben. Die genaue Punkte-/Zeitaufteilung ist <b>meine Annahme</b> (Teil A ≈ 35 min, Teil B ≈ 55 min) – nicht vom Lehrer bestätigt. Im IServ liegt „Übungsaufgaben Klausur“ (Hochbehälter mit Funktionsschar und Ortskurve); dieser Typ ist abgedeckt.</p></div>' +

      '<div class="mt-card"><h3>Dein Fortschritt</h3>' +
      '<p><b>Lektionen:</b> ' + doneL + ' / ' + D.LESSONS.length + ' verstanden</p><div class="mt-bar"><span style="width:' + Math.round(100 * doneL / D.LESSONS.length) + '%"></span></div>' +
      '<p style="margin-top:0.7rem"><b>Üben:</b> ' + got + ' / ' + max + ' BE (ehrlich bewertet)</p><div class="mt-bar"><span style="width:' + Math.round(100 * got / Math.max(1, max)) + '%"></span></div>' +
      '<p style="margin-top:0.7rem"><b>Probeklausur:</b> ' + (examSum ? examSum.got + ' / ' + examSum.max + ' BE · ' + examSum.np + ' Punkte' : 'noch nicht geschrieben') + '</p>' +
      '<p class="mt-muted">Plan heute: ' + planDone + ' / ' + PLAN.length + ' erledigt.</p></div></div>' +

      '<div class="mt-card"><h3>Dein Plan für heute <span class="mt-chip">≈ ' + Math.floor(planMin / 60) + ' h ' + (planMin % 60) + ' min</span></h3>' +
      '<p class="mt-muted">Haken setzen, wenn erledigt. Reihenfolge anpassen, wie du magst – nur die Probeklausur nicht streichen.</p>' +
      '<ul class="mt-plan">' + PLAN.map(p =>
        '<li class="' + (state.plan[p.id] ? 'done' : '') + '"><input type="checkbox" ' + (state.plan[p.id] ? 'checked' : '') + ' onchange="mtPlan(\'' + p.id + '\')">' +
        '<div class="mt-plan-t"><b>' + p.title + '</b><span class="mt-muted">' + p.desc + '</span></div>' +
        '<div style="text-align:right"><div class="mt-min">' + p.min + ' min</div>' +
        (p.go ? '<button class="mt-btn small" onclick="mtGo(\'' + p.go[0] + '\',' + (p.go[1] ? '\'' + p.go[1] + '\'' : 'null') + ')">Los →</button>' : '') + '</div></li>').join('') + '</ul></div>' +

      '<div class="mt-card"><h3>Diese 7 Aufgabentypen musst du können</h3><div class="mt-grid3">' +
      TYPES.map(ty => '<div class="mt-type" onclick="mtGo(\'verstehen\',\'' + ty.les + '\')"><span class="mt-chip ' + ty.cls + '">' + ty.chip + '</span><h4>' + ty.title + '</h4><p>' + ty.text + '</p></div>').join('') +
      '</div></div>' +

      '<div class="mt-card"><h3>Weitere Module (zum Nachschlagen)</h3>' +
      '<p class="mt-muted">Die älteren, ausführlichen Module bleiben erhalten – du brauchst sie für heute nicht, wenn du hier durchgehst.</p>' +
      '<div class="mt-row"><button class="mt-btn small" onclick="openTopic(\'mathe\',\'mathe-integral-kurs\')">06 Integralrechnung komplett</button>' +
      '<button class="mt-btn small" onclick="openTopic(\'mathe\',\'mathe-schar-kurs\')">07 Scharen &amp; Ortskurven komplett</button>' +
      '<button class="mt-btn small" onclick="openTopic(\'mathe\',\'mathe-steckbrief\')">01 Steckbrief</button></div></div>';
  }

  // ================================================================ VERSTEHEN
  function lessonNav() {
    let html = '', grp = '';
    D.LESSONS.forEach(l => {
      if (l.group !== grp) {
        grp = l.group;
        html += '<div class="mt-lgroup">' + (grp === 'integral' ? '∫ Integral &amp; Bestand' : '📈 Schar &amp; Ortskurve') + '</div>';
      }
      html += '<button class="mt-litem ' + l.group + (l.id === state.lesson ? ' on' : '') + (state.done[l.id] ? ' done' : '') + '" onclick="mtLesson(\'' + l.id + '\')">' +
        '<span class="n">' + (state.done[l.id] ? '✓' : l.num) + '</span><span>' + l.title + '</span></button>';
    });
    return '<nav class="mt-lnav">' + html + '</nav>';
  }

  function demoHtml(kind) {
    if (kind === 'bestand') {
      return '<h3><span class="ico">🎛️</span> Ausprobieren: Rate ↔ Bestand</h3>' +
        '<p class="mt-muted">' + M(String.raw`Zuwachsrate $f(t)=0{,}2\,t\,(t-3)(t-9)$, Anfangsbestand $B(0)=60$. Schiebe $t$ und beobachte: Wann steigt der Bestand, wann fällt er, wo liegen Maximum und Minimum?`) + '</p>' +
        '<div class="mt-demo"><div class="mt-ctl"><label>Zeit <b id="mt-b-tv">1</b> &nbsp; <input type="range" id="mt-b-t" min="0" max="10" step="0.05" value="1" oninput="mtBestandDraw()"></label></div>' +
        '<canvas id="mt-b-f" width="760" height="260"></canvas><div style="height:8px"></div><canvas id="mt-b-B" width="760" height="260"></canvas>' +
        '<div class="mt-read" id="mt-b-out"></div></div>';
    }
    if (kind === 'ortskurve') {
      const opts = OR.map((o, i) => '<option value="' + i + '"' + (i === state.orIdx ? ' selected' : '') + '>' + o.name + '</option>').join('');
      return '<h3><span class="ico">🎛️</span> Ausprobieren: Leuchtspur &amp; Ortskurve</h3>' +
        '<p class="mt-muted">' + M(String.raw`Bewege den Regler $k$: Die Punkte hinterlassen eine Spur. Rate die Ortskurve – dann blende sie ein und vergleiche mit deiner Rechnung.`) + '</p>' +
        '<div class="mt-demo"><div class="mt-ctl"><label>Schar <select id="mt-or-sel" onchange="mtOrSel(this.value)">' + opts + '</select></label>' +
        '<label><b id="mt-or-kv"></b> <input type="range" id="mt-or-k" min="0" max="1" step="0.1" value="0" oninput="mtOrDraw()"></label>' +
        '<label><input type="checkbox" id="mt-or-show" onchange="mtOrDraw()"> Ortskurve einblenden</label></div>' +
        '<canvas id="mt-or" width="760" height="420"></canvas><div class="mt-read" id="mt-or-out"></div></div>';
    }
    return '';
  }

  function viewLesson() {
    const les = D.LESSONS.find(l => l.id === state.lesson) || D.LESSONS[0];
    const idx = D.LESSONS.indexOf(les);
    const prev = D.LESSONS[idx - 1], next = D.LESSONS[idx + 1];
    const bsp = les.beispiel;
    const art = '<article class="mt-lesson ' + les.group + '">' +
      '<div><span class="mt-chip ' + (les.group === 'integral' ? 'integral' : 'schar') + '">Lektion ' + les.num + ' · ' + (les.group === 'integral' ? '∫ Integral' : '📈 Schar') + '</span><span class="mt-chip">≈ ' + les.min + ' Min.</span>' +
      (state.done[les.id] ? '<span class="mt-chip ok">✓ verstanden</span>' : '') + '</div>' +
      '<h2>' + les.title + '</h2><p class="mt-muted">' + les.short + '</p>' +
      '<div class="mt-call idee"><div class="mt-call-h">🎯 In einem Satz</div><p>' + M(les.idee) + '</p></div>' +
      '<div class="mt-call bild"><div class="mt-call-h">💡 Stell dir vor</div><p>' + M(les.bild) + '</p></div>' +
      '<h3><span class="ico">📝</span> Das Rezept</h3><ol class="mt-rezept">' + les.rezept.map(r => '<li>' + M(r) + '</li>').join('') + '</ol>' +
      (les.extra ? M(les.extra) : '') +
      '<h3><span class="ico">🔍</span> Beispiel – Schritt für Schritt</h3>' +
      '<div class="mt-ex" id="mt-ex"><div class="mt-ex-q">' + M(bsp.q) + '</div>' +
      '<p class="mt-muted">Versuch jeden Schritt zuerst selbst (Kopf oder Papier), dann aufdecken.</p>' +
      bsp.steps.map(s => '<div class="mt-step"><div class="mt-step-h">' + s.h + '</div><div>' + M(s.t) + '</div></div>').join('') +
      '<div class="mt-row"><button class="mt-btn primary small" id="mt-step-btn" onclick="mtStep(false)">Schritt 1 zeigen</button><button class="mt-btn ghost small" onclick="mtStep(true)">Alle zeigen</button></div></div>' +
      (les.extraAfter ? M(les.extraAfter) : '') +
      demoHtml(les.demo) +
      '<h3><span class="ico">⚠️</span> Typische Fehler</h3><div class="mt-call warn"><ul>' + les.fehler.map(f => '<li>' + M(f) + '</li>').join('') + '</ul></div>' +
      '<h3><span class="ico">✅</span> Selbsttest</h3><p class="mt-muted">Antworte erst im Kopf, dann aufdecken.</p>' +
      les.test.map((q, i) => '<div class="mt-qa"><div>' + M(q.q) + '</div><button class="mt-btn small ghost" onclick="mtQA(' + i + ')">Antwort zeigen</button><div class="mt-a" id="mt-a-' + i + '">' + M(q.a) + '</div></div>').join('') +
      '<div class="mt-foot"><div class="mt-row" style="margin:0">' +
      (prev ? '<button class="mt-btn small" onclick="mtLesson(\'' + prev.id + '\')">← ' + prev.title + '</button>' : '') + '</div>' +
      '<div class="mt-row" style="margin:0"><button class="mt-btn small ' + (state.done[les.id] ? '' : 'primary') + '" onclick="mtDone(\'' + les.id + '\')">' + (state.done[les.id] ? '✓ Verstanden (zurücknehmen)' : '✓ Hab ich verstanden') + '</button>' +
      ((les.tasks && les.tasks.length) ? '<button class="mt-btn small" onclick="mtFocus(\'' + les.id + '\')">✏️ Dazu üben</button>' : '') +
      (next ? '<button class="mt-btn small" onclick="mtLesson(\'' + next.id + '\')">Weiter: ' + next.title + ' →</button>' : '') + '</div></div></article>';
    return '<div class="mt-lessons">' + lessonNav() + art + '</div>';
  }

  // ---------------------------------------------------------------- Demo: Bestand
  const BF = t => 0.2 * t * (t - 3) * (t - 9);
  const BB = t => 60 + 0.05 * Math.pow(t, 4) - 0.8 * Math.pow(t, 3) + 2.7 * t * t;
  function bestandDraw() {
    const c1 = $('mt-b-f'), c2 = $('mt-b-B'), sl = $('mt-b-t');
    if (!c1 || !c2 || !sl) return;
    const t = +sl.value;
    $('mt-b-tv').textContent = fmt(t);
    let S = plotSetup(c1, -0.5, 10.5, -13, 16);
    fillSigned(S, BF, () => 0, 0, t, 'rgba(37,99,235,0.35)', 'rgba(220,38,38,0.35)');
    drawCurve(S, BF, 0, 10, '#2563eb', 2.6);
    S.ctx.strokeStyle = '#d9560b'; S.ctx.lineWidth = 1.5; S.ctx.setLineDash([5, 4]);
    S.ctx.beginPath(); S.ctx.moveTo(S.X(t), S.P.t); S.ctx.lineTo(S.X(t), S.P.t + S.ph); S.ctx.stroke(); S.ctx.setLineDash([]);
    S.ctx.fillStyle = S.col.text; S.ctx.font = 'bold 12px system-ui'; S.ctx.textAlign = 'left';
    S.ctx.fillText('Rate f(t) – blau: Zunahme, rot: Abnahme (Fläche = Bestandsänderung seit t = 0)', S.P.l + 6, S.P.t + 12);
    S = plotSetup(c2, -0.5, 10.5, 10, 75);
    drawCurve(S, BB, 0, 10, '#0a8f63', 2.6);
    S.ctx.fillStyle = '#d9560b'; S.ctx.beginPath(); S.ctx.arc(S.X(t), S.Y(BB(t)), 6, 0, 2 * Math.PI); S.ctx.fill();
    S.ctx.fillStyle = S.col.text; S.ctx.font = 'bold 12px system-ui'; S.ctx.textAlign = 'left';
    S.ctx.fillText('Bestand B(t) = 60 + Integral von f', S.P.l + 6, S.P.t + 12);
    const f = BF(t);
    $('mt-b-out').innerHTML = 'f(' + fmt(t) + ') = <b>' + fmt(f) + '</b> → ' + (Math.abs(f) < 0.05 ? '<b>Bestand ändert sich gerade nicht</b> (Extremstelle möglich!)' : f > 0 ? '<b style="color:#2563eb">Bestand nimmt zu</b>' : '<b style="color:#c62828">Bestand nimmt ab</b>') +
      ' &nbsp;·&nbsp; B(' + fmt(t) + ') = <b>' + fmt(BB(t)) + '</b> &nbsp;·&nbsp; Bestandsänderung seit Beginn: ' + fmt(BB(t) - 60);
  }

  // ---------------------------------------------------------------- Demo: Ortskurve
  const OR = [
    { name: 'f_k(x) = x⁴ − 2k·x²   (Tiefpunkte)', f: (x, k) => Math.pow(x, 4) - 2 * k * x * x, k0: 1.5, kmin: 0.3, kmax: 4, step: 0.05,
      view: [-3, 3, -18, 8], pts: [
        { n: 'T₁', x: k => Math.sqrt(k), y: k => -k * k, c: '#d9560b' }, { n: 'T₂', x: k => -Math.sqrt(k), y: k => -k * k, c: '#d9560b' }],
      orts: { fn: x => -Math.pow(x, 4), a: -2.1, b: 2.1, tex: 'y=-x^4', txt: 'y = −x⁴' } },
    { name: 'f_t(x) = x² − 6t·x + 8t²   (Scheitelpunkt)', f: (x, k) => x * x - 6 * k * x + 8 * k * k, k0: 1, kmin: -2, kmax: 2, step: 0.05,
      view: [-9, 9, -8, 34], pts: [{ n: 'S', x: k => 3 * k, y: k => -k * k, c: '#d9560b' }],
      orts: { fn: x => -x * x / 9, a: -6.3, b: 6.3, tex: 'y=-\\tfrac19x^2', txt: 'y = −x²/9' } },
    { name: 'f_k(t) = 0,05·t(t−k)(t−2k)(t−3k)   (Hochbehälter-Typ)', f: (x, k) => 0.05 * x * (x - k) * (x - 2 * k) * (x - 3 * k), k0: 3, kmin: 1, kmax: 5, step: 0.05,
      view: [-1, 17, -35, 24], pts: [{ n: 'H', x: k => 1.5 * k, y: k => 0.028125 * Math.pow(k, 4), c: '#d9560b' }],
      orts: { fn: x => Math.pow(x, 4) / 180, a: 1.5, b: 7.6, tex: 'y=\\tfrac1{180}x^4', txt: 'y = x⁴/180' } }
  ];
  function orSelect(i) {
    state.orIdx = +i; save();
    const o = OR[state.orIdx];
    const sl = $('mt-or-k');
    if (!sl) return;
    sl.min = o.kmin; sl.max = o.kmax; sl.step = o.step; sl.value = o.k0;
    const sel = $('mt-or-sel'); if (sel) sel.value = state.orIdx;
    orDraw();
  }
  function orDraw() {
    const c = $('mt-or'), sl = $('mt-or-k');
    if (!c || !sl) return;
    const o = OR[state.orIdx], k = +sl.value;
    const show = $('mt-or-show').checked;
    const kn = state.orIdx === 1 ? 't' : 'k';
    $('mt-or-kv').textContent = kn + ' = ' + fmt(k);
    const S = plotSetup(c, o.view[0], o.view[1], o.view[2], o.view[3]);
    const { ctx, X, Y, P, pw, ph } = S;
    ctx.save(); ctx.beginPath(); ctx.rect(P.l, P.t, pw, ph); ctx.clip();
    // Schar-Mitglieder (blass)
    const n = 9;
    for (let i = 0; i <= n; i++) {
      const kk = o.kmin + (o.kmax - o.kmin) * i / n;
      drawCurve(S, x => o.f(x, kk), o.view[0], o.view[1], 'rgba(120,130,150,0.28)', 1.2);
    }
    // Leuchtspur
    o.pts.forEach(p => {
      ctx.fillStyle = 'rgba(217,86,11,0.55)';
      for (let kk = o.kmin; kk <= k + 1e-9; kk += 0.04) { ctx.beginPath(); ctx.arc(X(p.x(kk)), Y(p.y(kk)), 2.2, 0, 2 * Math.PI); ctx.fill(); }
    });
    if (show) drawCurve(S, o.orts.fn, o.orts.a, o.orts.b, '#d9560b', 2.6);
    drawCurve(S, x => o.f(x, k), o.view[0], o.view[1], '#2563eb', 3);
    o.pts.forEach(p => {
      ctx.fillStyle = p.c; ctx.strokeStyle = '#fff'; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.arc(X(p.x(k)), Y(p.y(k)), 6, 0, 2 * Math.PI); ctx.fill(); ctx.stroke();
      ctx.fillStyle = S.col.text; ctx.font = 'bold 12px system-ui'; ctx.textAlign = 'left';
      ctx.fillText(p.n, X(p.x(k)) + 9, Y(p.y(k)) - 8);
    });
    ctx.restore();
    ctx.fillStyle = S.col.text; ctx.font = 'bold 12px system-ui'; ctx.textAlign = 'left';
    ctx.fillText('blau: aktueller Graph · grau: andere Mitglieder der Schar · orange Punkte: Leuchtspur', P.l + 6, P.t + 12);
    const out = $('mt-or-out');
    let h = o.pts.map(p => '<b style="color:' + p.c + '">' + p.n + '</b>(' + fmt(p.x(k)) + ' | ' + fmt(p.y(k)) + ')').join(' &nbsp; ');
    if (show) {
      const p = o.pts[0];
      h += '<br>Ortskurve: ' + M('$' + o.orts.tex + '$') + ' &nbsp;→ Probe: ' + fmt(o.orts.fn(p.x(k))) + ' = ' + fmt(p.y(k)) + (Math.abs(o.orts.fn(p.x(k)) - p.y(k)) < 1e-6 ? ' ✓' : ' ✗');
    } else {
      h += '<br><span class="mt-muted">Welche Kurve folgt der Spur? Überlege, dann „Ortskurve einblenden“.</span>';
    }
    out.innerHTML = h;
    renderMath(out);
  }

  // ================================================================ AUFGABEN
  function hintsFor(t, p) {
    if (p.hints && p.hints.length) return p.hints.map(h => ({ html: M(h) }));
    const les = lessonOf(t);
    return les ? [{ html: 'Überlege zuerst, welcher Aufgabentyp das ist. Passende Erklärung: <button class="mt-btn small ghost" onclick="mtGo(\'verstehen\',\'' + les.id + '\')">Lektion ' + les.num + ' – ' + les.title + '</button>' }] : [];
  }

  function partHtml(t, p, mode, prog) {
    const key = mode + '-' + p.id;
    const hs = hintsFor(t, p);
    let inner = '<div class="mt-part" id="mt-part-' + key + '"><div class="mt-part-q"><div class="tx">' + (p.label ? '<span class="lab">' + p.label + '</span>' : '') + T(p.text) + '</div><div class="mt-be">' + p.be + ' BE</div></div>';
    if (mode === 'practice') {
      const sv = answers[key] || { zahlen: {}, notiz: '' };
      const nums = (p.nums || []).map((n, i) => '<span>' + esc(n.label) + ': <input class="mt-num" id="mt-in-' + key + '-' + i + '" inputmode="decimal" placeholder="Zahl" data-key="' + key + '" data-pid="' + p.id + '" data-i="' + i + '" value="' + esc((sv.zahlen[i] && sv.zahlen[i].wert) || '') + '"></span>').join(' ');
      if (nums) inner += '<div class="mt-row">' + nums + '<button class="mt-btn small" onclick="mtCheck(\'' + p.id + '\')">Prüfen</button><span class="mt-fb" id="mt-fb-' + key + '"></span></div>';
      inner += '<div class="mt-row"><textarea class="mt-ta" data-key="' + key + '" data-pid="' + p.id + '" data-kind="note" placeholder="Dein Ansatz / Lösungsweg (Stichpunkte reichen – wird automatisch gespeichert)">' + escText(sv.notiz) + '</textarea></div>';
      if (hs.length) {
        inner += hs.map((h, i) => '<div class="mt-hint" id="mt-h-' + key + '-' + i + '">' + h.html + '</div>').join('');
      }
      inner += '<div class="mt-row">' + (hs.length ? '<button class="mt-btn small" id="mt-hb-' + key + '" data-n="0" data-max="' + hs.length + '" onclick="mtHint(\'' + key + '\')">💡 Tipp 1 von ' + hs.length + '</button>' : '') +
        '<button class="mt-btn small primary" onclick="mtSol(\'' + key + '\')">Lösung &amp; Erwartungshorizont</button></div>';
      inner += '<div class="mt-sol" id="mt-sol-' + key + '">' + M(p.sol) + scoreRow(p, key, prog[p.id], 'practice') + '</div>';
    } else if (mode === 'exam') {
      const sv = answers[key] || { notiz: '' };
      inner += '<div class="mt-row"><textarea class="mt-ta" data-key="' + key + '" data-pid="' + p.id + '" data-kind="note" placeholder="Optional: Lösungsweg hier tippen (wird gespeichert, damit ich später korrigieren kann). Papier reicht auch.">' + escText(sv.notiz) + '</textarea></div>';
    } else if (mode === 'review') {
      const sv = answers['exam-' + p.id];
      if (sv && sv.notiz) inner += '<div class="mt-call bild"><div class="mt-call-h">Deine Antwort</div><p style="white-space:pre-wrap">' + escText(sv.notiz) + '</p></div>';
      inner += '<div class="mt-sol on" id="mt-sol-' + key + '">' + M(p.sol) + scoreRow(p, key, state.exam.scores[p.id], 'review') + '</div>';
    }
    return inner + '</div>';
  }
  function scoreRow(p, key, cur, mode) {
    let b = '';
    for (let i = 0; i <= p.be; i++) b += '<button class="' + (cur === i ? 'on' : '') + '" onclick="mtScore(\'' + p.id + '\',' + i + ',\'' + mode + '\')">' + i + '</button>';
    return '<div class="mt-score"><span>Ehrlich bewerten – erreichte BE:</span>' + b + '</div>';
  }

  function taskHtml(t, mode) {
    const prog = L.loadProgress();
    const les = lessonOf(t);
    const topic = taskTopic(t);
    const teil = taskTeil(t);
    const mins = Math.round(taskBE(t) * 1.5);
    const sc = mode === 'practice' ? L.taskScore(t, prog) : t.parts.reduce((s, p) => s + (state.exam.scores[p.id] || 0), 0);
    return '<div class="mt-task ' + (topic === 'schar' ? 'schar' : '') + '" id="mt-task-' + t.id + '">' +
      '<div class="mt-task-h"><h3>Aufgabe ' + t.id.replace('MP1-', '') + ' · ' + esc(t.title) + '</h3>' +
      '<span class="mt-be">' + (mode === 'exam' ? taskBE(t) + ' BE' : sc + ' / ' + taskBE(t) + ' BE') + '</span></div>' +
      '<div class="mt-task-meta"><span class="mt-chip ' + (topic === 'schar' ? 'schar' : 'integral') + '">' + (topic === 'schar' ? '📈 Schar/Ortskurve' : '∫ Integral/Bestand') + '</span>' +
      '<span class="mt-chip">' + (teil === 'A' ? 'Teil A · ohne Hilfsmittel' : 'Teil B · mit GTR/CAS') + '</span>' +
      '<span class="mt-chip">AFB ' + t.afb + '</span><span class="mt-chip">≈ ' + mins + ' min</span>' +
      (les && mode !== 'exam' ? '<button class="mt-btn small ghost" onclick="mtGo(\'verstehen\',\'' + les.id + '\')">📘 Lektion ' + les.num + '</button>' : '') + '</div>' +
      '<div class="mt-intro">' + T(t.intro) + '</div>' +
      (t.fig ? '<canvas class="mt-fig" id="mt-fig-' + t.id + '" width="640" height="300"></canvas>' : '') +
      t.parts.map(p => partHtml(t, p, mode, prog)).join('') + '</div>';
  }

  function viewPractice() {
    const pr = state.practice;
    const note = '<div class="mt-card"><h3>So übst du richtig</h3><p><b>1.</b> Aufgabe lesen, Operator beachten. <b>2.</b> Selbst versuchen (Papier!). <b>3.</b> Wenn du hängst: <b>Tipp 1, dann Tipp 2</b> – nicht gleich die Lösung. <b>4.</b> Lösung vergleichen und <b>ehrlich Punkte</b> geben. Aufgaben im Stil des Zentralabiturs Niedersachsen (eigene Aufgaben, keine offiziellen Lösungsvorgaben).</p>' +
      '<p class="mt-muted">Die Aufgaben E1–E3 üben Aufleiten und Betragsstriche. Aufgaben mit e-Funktion oder ln (06: A1, A5, B1) sind hier ausgeblendet, weil ihr das noch nicht hattet.</p></div>';
    if (pr.open) {
      const t = findTask(pr.open);
      if (t) {
        return '<div class="mt-row"><button class="mt-btn" onclick="mtOpenTask(null)">← Zur Aufgabenliste</button></div>' + taskHtml(t, 'practice');
      }
    }
    const pill = (kind, val, label) => '<button class="mt-pill' + (pr[kind] === val ? ' on' : '') + '" onclick="mtFilter(\'' + kind + '\',\'' + val + '\')">' + label + '</button>';
    let list = practiceTasks();
    if (pr.focus) {
      const les = D.LESSONS.find(l => l.id === pr.focus);
      list = list.filter(t => (les.tasks || []).indexOf(t.id) >= 0);
    }
    list = list.filter(t => (pr.topic === 'all' || taskTopic(t) === pr.topic) && (pr.teil === 'all' || taskTeil(t) === pr.teil));
    const prog = L.loadProgress();
    const rows = list.map(t => {
      const m = taskBE(t), g = L.taskScore(t, prog), les = lessonOf(t);
      return '<button class="mt-trow" onclick="mtOpenTask(\'' + t.id + '\')"><div><div class="t">' + t.id + ' · ' + esc(t.title) + '</div>' +
        '<div><span class="mt-chip ' + (taskTopic(t) === 'schar' ? 'schar' : 'integral') + '">' + (taskTopic(t) === 'schar' ? 'Schar' : 'Integral') + '</span>' +
        '<span class="mt-chip">Teil ' + taskTeil(t) + '</span><span class="mt-chip">' + m + ' BE</span>' + (les ? '<span class="mt-chip">Lektion ' + les.num + '</span>' : '') + '</div></div>' +
        '<div class="sc ' + (g >= m * 0.6 ? 'good' : '') + '">' + (g > 0 ? g + ' / ' + m + ' BE' : 'noch offen') + '</div></button>';
    }).join('');
    let examBlock = '';
    if (state.exam.status === 'review') {
      examBlock = '<h3 style="margin:1.2rem 0 0.5rem">Aufgaben aus der Probeklausur (nochmal üben mit Tipps)</h3>' + ALL_EXAM_TASKS.map(t =>
        '<button class="mt-trow" onclick="mtOpenTask(\'' + t.id + '\')"><div><div class="t">' + t.id.replace('MP1-', '') + ' · ' + esc(t.title) + '</div><div><span class="mt-chip">Teil ' + t.teil + '</span><span class="mt-chip">' + taskBE(t) + ' BE</span></div></div><div class="sc">Probeklausur</div></button>').join('');
    } else {
      examBlock = '<p class="mt-muted" style="margin-top:1rem">🔒 Die Aufgaben der Probeklausur erscheinen hier erst nach der Auswertung – damit du sie nicht vorher siehst.</p>';
    }
    const exp = '<div class="mt-row mt-no-print"><span class="mt-muted">Deine Eingaben werden automatisch gespeichert.</span>' +
      '<button class="mt-btn small ghost" onclick="mtExportCopy()">📋 Antworten kopieren</button><button class="mt-btn small ghost" onclick="mtExportDl()">⬇ Als Datei speichern</button><span class="mt-fb ok" id="mt-exp-fb"></span></div>';
    return note + exp +
      '<div class="mt-filters"><div class="grp"><span class="lbl">Thema</span>' + pill('topic', 'all', 'Alle') + pill('topic', 'integral', '∫ Integral') + pill('topic', 'schar', '📈 Schar &amp; Ortskurve') + '</div>' +
      '<div class="grp"><span class="lbl">Teil</span>' + pill('teil', 'all', 'Alle') + pill('teil', 'A', 'A · ohne Rechner') + pill('teil', 'B', 'B · mit Rechner') + '</div></div>' +
      (pr.focus ? '<p><span class="mt-chip ok">Gefiltert: Lektion ' + D.LESSONS.find(l => l.id === pr.focus).num + '</span> <button class="mt-btn small ghost" onclick="mtFocus(null)">Alle Aufgaben zeigen</button></p>' : '') +
      (rows || '<p class="mt-muted">Keine Aufgaben für diesen Filter.</p>') + examBlock;
  }

  // ================================================================ PROBEKLAUSUR
  const NOTEN = [[15, 95], [14, 90], [13, 85], [12, 80], [11, 75], [10, 70], [9, 65], [8, 60], [7, 55], [6, 50], [5, 45], [4, 40], [3, 33], [2, 27], [1, 20]];
  function notenpunkte(pct) { for (const [np, lim] of NOTEN) if (pct >= lim) return np; return 0; }
  function noteText(np) { return np >= 13 ? 'sehr gut' : np >= 10 ? 'gut' : np >= 7 ? 'befriedigend' : np >= 4 ? 'ausreichend' : np >= 1 ? 'mangelhaft' : 'ungenügend'; }
  function examTotals() {
    let got = 0, max = 0, gA = 0, mA = 0, gB = 0, mB = 0, gI = 0, mI = 0, gS = 0, mS = 0, unscored = 0;
    ALL_EXAM_TASKS.forEach(t => t.parts.forEach(p => {
      const s = state.exam.scores[p.id];
      if (s === undefined) unscored++;
      const v = s || 0;
      got += v; max += p.be;
      if (t.teil === 'A') { gA += v; mA += p.be; } else { gB += v; mB += p.be; }
      if (t.topic === 'integral') { gI += v; mI += p.be; } else { gS += v; mS += p.be; }
    }));
    const pct = Math.round(100 * got / max);
    const np = notenpunkte(pct);
    return { got, max, gA, mA, gB, mB, gI, mI, gS, mS, unscored, pct, np };
  }
  function reviewSummary() {
    const s = examTotals();
    const rows = ALL_EXAM_TASKS.map(t => {
      const m = taskBE(t), g = t.parts.reduce((a, p) => a + (state.exam.scores[p.id] || 0), 0), pct = Math.round(100 * g / m);
      const les = lessonOf(t);
      return '<tr><td>' + t.id.replace('MP1-', '') + ' · ' + esc(t.title) + '</td><td>' + g + ' / ' + m + '</td><td style="min-width:120px"><div class="mt-bar"><span style="width:' + pct + '%"></span></div></td><td>' +
        (pct < 60 && les ? '<button class="mt-btn small ghost" onclick="mtGo(\'verstehen\',\'' + les.id + '\')">Lektion ' + les.num + ' wiederholen</button>' : '✓') + '</td></tr>';
    }).join('');
    const today = new Date().toISOString().slice(0, 10);
    const lines = [];
    ALL_EXAM_TASKS.forEach(t => t.parts.forEach(p => {
      const v = state.exam.scores[p.id];
      if (v !== undefined && v < p.be) lines.push('| ' + today + ' | Mathe | Probeklausur 1: ' + p.id + ' (' + t.title + ') – ' + v + '/' + p.be + ' BE | siehe Lektion ' + (lessonOf(t) ? lessonOf(t).num : '?') + ' im Portal | nein |');
    }));
    return '<div class="mt-card"><div class="mt-row" style="margin-top:0"><div class="mt-result">' + s.got + ' / ' + s.max + ' BE</div><div><b>' + s.pct + ' %</b> · ca. <b>' + s.np + ' Notenpunkte</b> (' + noteText(s.np) + ')</div></div>' +
      '<p class="mt-muted">Übliche Umrechnung in Notenpunkte (ab 95 % = 15 P., ab 50 % = 6 P.). Dein Lehrer kann einen anderen Schlüssel nutzen. ' + (s.unscored ? '<b>' + s.unscored + ' Teilaufgaben sind noch nicht bewertet</b> und zählen als 0.' : '') + '</p>' +
      '<div class="mt-grid2"><div><b>Teil A (ohne Rechner):</b> ' + s.gA + ' / ' + s.mA + ' BE</div><div><b>Teil B (mit Rechner):</b> ' + s.gB + ' / ' + s.mB + ' BE</div>' +
      '<div><span class="mt-chip integral">∫ Integral</span> ' + s.gI + ' / ' + s.mI + ' BE</div><div><span class="mt-chip schar">📈 Schar/Ortskurve</span> ' + s.gS + ' / ' + s.mS + ' BE</div></div>' +
      '<div class="mt-scroll"><table class="mt-table" style="margin-top:0.8rem"><tr><th>Aufgabe</th><th>BE</th><th>Stand</th><th>Tipp</th></tr>' + rows + '</table></div>' +
      '<p class="mt-muted">Faustregel: unter 60 % bei einer Aufgabe → die Lektion nochmal lesen und die Aufgabe morgen früh noch einmal im Kopf durchgehen.</p>' +
      '<h4>Fehlerliste (Markdown)</h4><textarea class="mt-ta" style="min-height:90px;font-family:ui-monospace,Consolas,monospace;font-size:0.8rem" readonly>' + (lines.length ? lines.join('\n') : 'Noch keine Teilaufgabe mit Punktverlust bewertet.') + '</textarea>' +
      '<p class="mt-muted">Diese Zeilen kannst du in <code>Faecher/Mathe/04_Klausurvorbereitung/fehlerliste.md</code> kopieren.</p></div>';
  }

  function fmtClock(ms) {
    const neg = ms < 0; ms = Math.abs(ms);
    const s = Math.floor(ms / 1000), mm = Math.floor(s / 60), ss = s % 60;
    return (neg ? '−' : '') + String(mm).padStart(2, '0') + ':' + String(ss).padStart(2, '0');
  }
  let ticker = null;
  function startTicker() {
    if (ticker) clearInterval(ticker);
    tick();
    ticker = setInterval(tick, 1000);
  }
  function tick() {
    const el = $('mt-clock');
    if (!el || (state.exam.status !== 'A' && state.exam.status !== 'B')) { clearInterval(ticker); ticker = null; return; }
    const ex = state.exam, now = Date.now();
    const total = D.EXAM1.minutes * 60000;
    const rem = total - (now - ex.start);
    el.textContent = fmtClock(rem);
    const box = $('mt-timer');
    if (box) box.classList.toggle('late', rem <= 0);
    const ph = $('mt-phase');
    if (ph) {
      if (ex.status === 'A') {
        const aRem = D.EXAM1.minutesA * 60000 - (now - ex.start);
        ph.textContent = 'Teil A (ohne Rechner) · Richtwert: ' + fmtClock(aRem) + ' bis ' + D.EXAM1.minutesA + ' min' + (aRem < 0 ? ' – bald abgeben!' : '');
      } else {
        ph.textContent = 'Teil B (mit Rechner) · Teil A abgegeben nach ' + fmtClock(ex.aEnd - ex.start);
      }
    }
  }

  function viewExam() {
    const ex = state.exam, E = D.EXAM1;
    if (ex.status === 'idle') {
      return '<div class="mt-card hero"><h3 class="mt-hero-title">' + E.title + '</h3>' +
        '<p>Eine komplette Klausur zum Üben: <b>' + E.maxBE + ' BE, ' + E.minutes + ' Minuten</b>. Teil A (24 BE, ohne Taschenrechner) zuerst – erst nach „Teil A abgeben“ wird Teil B (36 BE, mit Taschenrechner) freigeschaltet, genau wie in der Prüfung.</p>' +
        '<ul><li>Etwa <b>60 % Integral/Bestand</b>, <b>40 % Schar/Ortskurve</b> (wie von dir beschrieben).</li><li>Rechne auf <b>Papier</b>, schreibe Ansatz und Antwortsätze wie in der Klausur auf.</li><li>Keine Tipps, keine Lösungen, bis du abgibst. Handy weg!</li><li>Richtwert: ca. 1,5 min pro BE (Teil A ≈ 35 min, Teil B ≈ 55 min).</li></ul>' +
        '<div class="mt-row"><button class="mt-btn primary" onclick="mtExamStart()">▶ Probeklausur starten (Uhr läuft sofort)</button></div></div>';
    }
    if (ex.status === 'review') {
      return '<div class="mt-row"><button class="mt-btn" onclick="mtExamToggleAll()">Alle Lösungen ein-/ausklappen</button><button class="mt-btn ghost" onclick="mtExamReset()">Neu starten</button></div>' +
        '<div id="mt-sum">' + reviewSummary() + '</div>' + ALL_EXAM_TASKS.map(t => taskHtml(t, 'review')).join('');
    }
    const teil = ex.status === 'A' ? 'A' : 'B';
    const tasks = ALL_EXAM_TASKS.filter(t => t.teil === teil);
    return '<div class="mt-timer" id="mt-timer"><div><div class="big" id="mt-clock">--:--</div><div class="ph" id="mt-phase"></div></div>' +
      '<div class="mt-row" style="margin:0">' + (teil === 'A' ? '<button class="mt-btn" onclick="mtExamSubmitA()">Teil A abgeben →</button>' : '<button class="mt-btn" onclick="mtExamFinish()">Klausur abgeben ✔</button>') + '</div></div>' +
      '<div class="mt-exam-head"><h3>Mathematik eA · Klausurübung · ' + (teil === 'A' ? 'Teil A – ohne Hilfsmittel' : 'Teil B – mit GTR/CAS und Formelsammlung') + '</h3>' +
      '<div class="mt-muted">' + tasks.reduce((s, t) => s + taskBE(t), 0) + ' BE · Nur Zeichenmittel' + (teil === 'A' ? ', kein Taschenrechner' : ' und Taschenrechner') + ' · Rechne auf Papier.</div></div>' +
      (teil === 'B' ? '<div class="mt-call ok"><div class="mt-call-h">Teil A abgegeben</div><p>Jetzt darfst du den Taschenrechner nehmen. Denk daran: Ansatz aufschreiben, Antwortsatz mit Einheit.</p></div>' : '') +
      tasks.map(t => taskHtml(t, 'exam')).join('');
  }

  // ================================================================ SPICKZETTEL
  function viewSpick() {
    return '<div class="mt-row mt-no-print"><button class="mt-btn primary" onclick="mtPrint()">🖨️ Drucken / als PDF speichern</button><span class="mt-muted">Alles Wichtige auf einer Seite – heute Abend einmal komplett lesen.</span></div>' +
      '<div class="mt-spick">' + M(D.SPICK) + '</div>';
  }

  // ================================================================ Handler
  function go() { save(); render(); window.scrollTo({ top: 0, behavior: 'smooth' }); }
  window.renderMatheTrainer = function () { render(); };
  window.mtSetTab = function (tab) { state.tab = tab; save(); };
  window.mtPrint = function () {
    document.body.classList.add('mt-printing');
    const done = () => { document.body.classList.remove('mt-printing'); window.removeEventListener('afterprint', done); };
    window.addEventListener('afterprint', done);
    window.print();
  };
  window.mtTab = function (tab) { state.tab = tab; go(); };
  window.mtGo = function (tab, les) {
    state.tab = tab;
    if (tab === 'verstehen' && les) state.lesson = les;
    go();
  };
  window.mtLesson = function (id) { state.lesson = id; state.tab = 'verstehen'; go(); };
  window.mtDone = function (id) { state.done[id] = !state.done[id]; save(); render(); };
  window.mtPlan = function (id) { state.plan[id] = !state.plan[id]; save(); render(); };
  window.mtStep = function (all) {
    const steps = document.querySelectorAll('#mt-ex .mt-step');
    let shown = 0;
    steps.forEach(s => { if (s.classList.contains('on')) shown++; });
    if (all) { steps.forEach(s => s.classList.add('on')); shown = steps.length; }
    else if (shown < steps.length) { steps[shown].classList.add('on'); shown++; }
    const b = $('mt-step-btn');
    if (b) {
      if (shown >= steps.length) { b.textContent = 'Alle Schritte gezeigt'; b.disabled = true; }
      else b.textContent = 'Schritt ' + (shown + 1) + ' zeigen';
    }
  };
  window.mtQA = function (i) { const a = $('mt-a-' + i); if (a) a.classList.toggle('on'); };
  window.mtBestandDraw = bestandDraw;
  window.mtOrSel = orSelect;
  window.mtOrDraw = orDraw;
  window.mtFilter = function (kind, val) { state.practice[kind] = val; state.practice.focus = null; save(); render(); };
  window.mtFocus = function (lesId) {
    state.practice.focus = lesId; state.practice.open = null;
    if (lesId) { state.practice.topic = 'all'; state.practice.teil = 'all'; state.tab = 'ueben'; }
    go();
  };
  window.mtOpenTask = function (id) { state.practice.open = id; state.tab = 'ueben'; go(); };
  window.mtHint = function (key) {
    const b = $('mt-hb-' + key);
    if (!b) return;
    let n = +b.dataset.n, max = +b.dataset.max;
    const h = $('mt-h-' + key + '-' + n);
    if (h) h.classList.add('on');
    n++; b.dataset.n = n;
    if (n >= max) { b.textContent = '💡 Alle Tipps gezeigt'; b.disabled = true; }
    else b.textContent = '💡 Nächster Tipp (' + (n + 1) + ' von ' + max + ')';
  };
  window.mtSol = function (key) { const s = $('mt-sol-' + key); if (s) s.classList.toggle('on'); };
  window.mtCheck = function (pid) {
    const f = findPart(pid);
    if (!f) return;
    const key = 'practice-' + pid;
    const fb = $('mt-fb-' + key);
    let ok = 0, filled = 0;
    f.p.nums.forEach((n, i) => {
      const raw = ($('mt-in-' + key + '-' + i).value || '').trim().replace(',', '.');
      if (raw === '') return;
      filled++;
      const v = parseFloat(raw);
      if (isFinite(v) && Math.abs(v - n.ans) <= n.tol) ok++;
    });
    if (filled < f.p.nums.length) { fb.className = 'mt-fb no'; fb.textContent = 'Bitte alle Felder ausfüllen.'; return; }
    if (ok === f.p.nums.length) { fb.className = 'mt-fb ok'; fb.textContent = '✔ Ergebnis stimmt – prüfe trotzdem deinen Rechenweg.'; }
    else { fb.className = 'mt-fb no'; fb.textContent = '✘ Noch nicht richtig. Rechenweg prüfen oder Tipp nutzen.'; }
  };
  window.mtScore = function (pid, val, mode) {
    if (mode === 'review') {
      state.exam.scores[pid] = val; save();
      const sum = $('mt-sum'); if (sum) { sum.innerHTML = reviewSummary(); renderMath(sum); }
    } else {
      const prog = L.loadProgress(); prog[pid] = val; L.saveProgress(prog); scheduleSync();
    }
    const key = (mode === 'review' ? 'review-' : 'practice-') + pid;
    const part = $('mt-part-' + key);
    if (part) part.querySelectorAll('.mt-score button').forEach((b, i) => b.classList.toggle('on', i === val));
    const f = findPart(pid);
    if (f) {
      const head = $('mt-task-' + f.t.id);
      if (head) {
        const sc = mode === 'review' ? f.t.parts.reduce((s, p) => s + (state.exam.scores[p.id] || 0), 0) : L.taskScore(f.t, L.loadProgress());
        const be = head.querySelector('.mt-task-h .mt-be');
        if (be) be.textContent = sc + ' / ' + taskBE(f.t) + ' BE';
      }
    }
  };
  window.mtExamStart = function () {
    // alte Klausur-Antworten archivieren, damit nichts verloren geht
    Object.keys(answers).forEach(k => { if (k.indexOf('exam-') === 0) { answers['alt' + Date.now() + '-' + k] = answers[k]; delete answers[k]; } });
    saveAnswers();
    state.exam = { status: 'A', start: Date.now(), aEnd: 0, end: 0, scores: {} }; go();
  };
  window.mtExamSubmitA = function () {
    if (!confirm('Teil A wirklich abgeben? Danach kannst du Teil A nicht mehr bearbeiten.')) return;
    state.exam.status = 'B'; state.exam.aEnd = Date.now(); go();
  };
  window.mtExamFinish = function () {
    if (!confirm('Klausur abgeben und auswerten?')) return;
    state.exam.status = 'review'; state.exam.end = Date.now(); go();
  };
  window.mtExamReset = function () {
    if (!confirm('Probeklausur neu starten? Die bisherige Bewertung geht verloren.')) return;
    state.exam = { status: 'idle', start: 0, aEnd: 0, end: 0, scores: {} }; go();
  };
  window.mtExportCopy = function () {
    const md = answersMarkdown();
    const done = () => { const b = $('mt-exp-fb'); if (b) b.textContent = 'Kopiert.'; };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(md).then(done, () => { const b = $('mt-exp-fb'); if (b) b.textContent = 'Kopieren nicht möglich – nimm „Als Datei speichern“.'; });
    else { const ta = document.createElement('textarea'); ta.value = md; document.body.appendChild(ta); ta.select(); try { document.execCommand('copy'); done(); } catch (e) { /* egal */ } ta.remove(); }
  };
  window.mtExportDl = function () {
    const blob = new Blob([answersMarkdown()], { type: 'text/markdown;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob); a.download = 'mathe-antworten.md';
    document.body.appendChild(a); a.click(); a.remove();
  };
  window.mtExamToggleAll = function () {
    const sols = document.querySelectorAll('.mt-task .mt-sol');
    const anyOpen = Array.prototype.some.call(sols, s => s.classList.contains('on'));
    sols.forEach(s => s.classList.toggle('on', !anyOpen));
  };
})();
