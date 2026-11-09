/* ==========================================================================
   PYTHON IM BROWSER – Bauschritt S8 (Portalplan 4.3, 5.2 Punkt 6)
   Seiten: #/python (Werkstatt: Aufgaben + Spielwiese) · #/python/<id> (Aufgabe mit Tests)
   Ausführung: py-sandbox.html als <iframe sandbox="allow-scripts"> (eigene leere Herkunft,
   kein Zugriff auf Lerndaten) → Worker mit Pyodide 0.26.4 von jsDelivr. Zeitlimit 8 s.
   Fällt Python aus (offline, blockiert): Hinweis + Ausweg „Ausgabe vorhersagen“ (Notation).
   Inhalte: content/demo-python.js (LR_PY), geprüft mit node neu/tests/python.test.js
   Zustand pro Profil: state.py = { code:{id:Text}, best:{id:%}, stdin:Text }
   ========================================================================== */
(function () {
  'use strict';
  let A = null;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const TASKS = () => window.LR_PY || [];
  const PASS = 100;

  // ------------------------------------------------------------ Verbindung zur Sandbox
  const RUN = { frame: null, st: 'off', err: '', version: '', mode: '', waiters: [], runs: {}, seq: 0 };
  function statusText() {
    if (RUN.st === 'loading') return 'Python wird geladen … (beim ersten Mal ca. 10 MB)';
    if (RUN.st === 'ready') return `Python bereit${RUN.version ? ' · Pyodide ' + RUN.version : ''}`;
    if (RUN.st === 'error') return 'Python nicht verfügbar';
    return 'Python startet beim ersten „Ausführen“';
  }
  function paintStatus() { $$('[data-pystatus]').forEach(el => { el.textContent = statusText(); el.dataset.st = RUN.st; }); }
  function flush(ok) { RUN.waiters.splice(0).forEach(w => ok ? w.res() : w.rej(new Error(RUN.err || 'Python konnte nicht geladen werden'))); paintStatus(); }
  addEventListener('message', e => {
    if (!RUN.frame || e.source !== RUN.frame.contentWindow) return; // nur Nachrichten aus unserer Sandbox
    const m = e.data || {};
    if (m.type === 'hello') { watch(150000, 'Python hat nach 2,5 Minuten nicht geantwortet'); RUN.frame.contentWindow.postMessage({ type: 'start' }, '*'); return; }
    if (m.type === 'status') { watch(150000, 'Python hat nach 2,5 Minuten nicht geantwortet'); return; }
    if (m.type === 'ready') { clearTimeout(RUN.watch); RUN.st = 'ready'; RUN.version = m.version || RUN.version; RUN.mode = m.mode || RUN.mode; flush(true); return; }
    if (m.type === 'loaderr') { fail(String(m.text || '')); return; }
    const r = RUN.runs[m.id]; if (!r) return;
    if (m.type === 'out' || m.type === 'err') r.on(m.type, String(m.text || ''));
    if (m.type === 'done') {
      delete RUN.runs[m.id];
      if (m.timeout && RUN.mode === 'worker') { RUN.st = 'off'; paintStatus(); } // Sandbox hat den Worker beendet, nächster Lauf startet ihn neu
      r.done(m);
    }
  });
  // Wächter: Kommt aus der Sandbox keine Antwort (Rahmen blockiert, Netz weg), nicht ewig „lädt“ zeigen
  function fail(msg) {
    clearTimeout(RUN.watch);
    RUN.st = 'error'; RUN.err = msg;
    if (RUN.frame) { RUN.frame.remove(); RUN.frame = null; }
    flush(false);
  }
  function watch(ms, msg) { clearTimeout(RUN.watch); RUN.watch = setTimeout(() => { if (RUN.st === 'loading') fail(msg); }, ms); }
  function ensure() {
    return new Promise((res, rej) => {
      if (RUN.st === 'ready') return res();
      RUN.waiters.push({ res, rej });
      if (RUN.st === 'loading') return;
      RUN.st = 'loading'; paintStatus();
      watch(20000, 'Der abgeschirmte Python-Bereich ließ sich nicht öffnen');
      if (!RUN.frame) {
        const f = document.createElement('iframe');
        f.setAttribute('sandbox', 'allow-scripts'); // KEIN allow-same-origin: Python kommt nie an localStorage/IndexedDB des Lernraums
        f.className = 'py-frame'; f.title = 'Python-Sandbox'; f.tabIndex = -1; f.setAttribute('aria-hidden', 'true');
        f.src = 'py-sandbox.html?v=3';
        document.body.appendChild(f);
        RUN.frame = f;
      } else RUN.frame.contentWindow.postMessage({ type: 'start' }, '*');
    });
  }
  function run(code, o = {}) {
    return ensure().then(() => new Promise(res => {
      const id = ++RUN.seq;
      RUN.runs[id] = { on: o.on || (() => {}), done: res };
      RUN.frame.contentWindow.postMessage({ type: 'run', id, code, stdin: o.stdin || '', tests: o.tests || null, timeout: o.timeout || 8000 }, '*');
    }));
  }

  // ------------------------------------------------------------ Editor
  const st = () => { const s = A.state; if (!s.py || typeof s.py !== 'object') s.py = {}; ['code', 'best'].forEach(k => { if (!s.py[k] || typeof s.py[k] !== 'object') s.py[k] = {}; }); return s.py; };
  function editorHtml(code) {
    return `<div class="py-ed-wrap">
      <div class="py-tools"><button type="button" class="btn small" data-pyind="1" title="Zeile einrücken (Tab)">Einrücken</button><button type="button" class="btn small" data-pyind="-1" title="Einrückung entfernen (Umschalt+Tab)">Ausrücken</button><span class="py-kbd"><kbd>Strg</kbd> <kbd>Enter</kbd> führt aus</span></div>
      <textarea class="py-ed" id="pyEd" spellcheck="false" autocapitalize="off" autocomplete="off" autocorrect="off" wrap="off" aria-label="Python-Code">${A.esc(code)}</textarea></div>`;
  }
  function fit(ta) { ta.rows = Math.max(8, Math.min(32, ta.value.split('\n').length + 1)); }
  function indent(ta, dir) {
    const v = ta.value, s = ta.selectionStart, e = ta.selectionEnd;
    const ls = v.lastIndexOf('\n', s - 1) + 1;
    let le = v.indexOf('\n', e === s ? e : e - 1); if (le < 0) le = v.length;
    const block = v.slice(ls, le).split('\n');
    let d0 = 0, dt = 0;
    const nb = block.map((l, i) => {
      if (dir > 0) { if (i === 0) d0 = 4; dt += 4; return '    ' + l; }
      const n = Math.min(4, l.length - l.replace(/^ +/, '').length); if (i === 0) d0 = -n; dt -= n; return l.slice(n);
    }).join('\n');
    ta.setRangeText(nb, ls, le, 'preserve');
    if (s === e) ta.selectionStart = ta.selectionEnd = Math.max(ls, s + d0);
    else { ta.selectionStart = Math.max(ls, s + d0); ta.selectionEnd = e + dt; }
    ta.dispatchEvent(new Event('input'));
  }
  function bindEditor(root, onRun, onChange) {
    const ta = $('#pyEd', root); if (!ta) return null;
    fit(ta);
    ta.addEventListener('input', () => { fit(ta); onChange(ta.value); });
    ta.addEventListener('keydown', e => {
      if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) { e.preventDefault(); onRun(); return; }
      if (e.key === 'Tab') { e.preventDefault(); if (e.shiftKey) indent(ta, -1); else if (ta.selectionStart === ta.selectionEnd) { ta.setRangeText('    ', ta.selectionStart, ta.selectionEnd, 'end'); ta.dispatchEvent(new Event('input')); } else indent(ta, 1); return; }
      if (e.key === 'Enter' && !e.shiftKey) { // Einrückung der Zeile übernehmen, nach „:“ eine Stufe mehr
        const v = ta.value, p = ta.selectionStart, ls = v.lastIndexOf('\n', p - 1) + 1, line = v.slice(ls, p);
        let ind = (line.match(/^ */) || [''])[0];
        if (/:\s*(#.*)?$/.test(line)) ind += '    ';
        e.preventDefault(); ta.setRangeText('\n' + ind, p, ta.selectionEnd, 'end'); ta.dispatchEvent(new Event('input'));
      }
    });
    $$('[data-pyind]', root).forEach(b => b.addEventListener('click', () => { ta.focus(); indent(ta, +b.dataset.pyind); }));
    return ta;
  }

  // ------------------------------------------------------------ Ausgabe
  const outHtml = () => `<div class="py-out" aria-live="polite"><div class="py-out-h"><span class="kicker">Ausgabe</span><span class="py-st" data-pystatus></span></div><pre class="py-pre" id="pyPre"><span class="py-dim">Noch nichts ausgeführt.</span></pre></div>`;
  function printer(pre) {
    pre.textContent = '';
    return (kind, text) => { const s = document.createElement('span'); if (kind === 'err') s.className = 'py-err'; else if (kind === 'dim') s.className = 'py-dim'; s.textContent = text; pre.appendChild(s); };
  }
  function failHtml() {
    return `<div class="notice warn py-fallback">${A.icon('alert')}<div><b>Python konnte nicht geladen werden.</b> Ohne Internet (oder wenn das Netz jsDelivr sperrt) geht das Ausführen nicht. Du kannst trotzdem üben: Schreib den Code auf Papier und sag die Ausgabe vorher, oder nutze <a class="link" href="#/algo/demo-algo-max">Notation · Ausgabe vorhersagen</a>. „Ausführen“ versucht es erneut.${RUN.err ? `<br><span class="row-sub">Technisch: ${A.esc(RUN.err)}</span>` : ''}</div></div>`;
  }
  async function execute(root, code, opts) {
    const pre = $('#pyPre', root), btn = $('#pyRun', root), fb = $('#pyFallback', root);
    const pr = printer(pre);
    if (fb) fb.innerHTML = '';
    btn.disabled = true;
    if (RUN.st !== 'ready') pr('dim', 'Python wird geladen … beim ersten Mal kann das je nach Netz 10 bis 30 Sekunden dauern.\n');
    let res;
    try {
      res = await run(code, { stdin: opts.stdin, tests: opts.tests, on: (k, t) => { if (pre.firstChild && pre.firstChild.className === 'py-dim' && pre.childNodes.length === 1) pre.textContent = ''; pr(k, t); } });
    } catch (e) {
      btn.disabled = false; pre.textContent = '';
      if (fb) fb.innerHTML = failHtml(); else pr('err', 'Python konnte nicht geladen werden.');
      return null;
    }
    btn.disabled = false;
    if (pre.childNodes.length === 1 && pre.firstChild.className === 'py-dim') pre.textContent = '';
    if (res.error) pr('err', (pre.textContent ? '\n' : '') + res.error + '\n');
    if (!pre.textContent) pr('dim', res.tests ? '(keine Ausgabe mit print)\n' : '(Programm lief ohne Ausgabe. Für eine Ausgabe brauchst du print(…).)\n');
    else if (!res.error) pr('dim', `\n✓ fertig in ${res.ms < 1000 ? res.ms + ' ms' : (res.ms / 1000).toFixed(1).replace('.', ',') + ' s'}\n`);
    return res;
  }

  // ------------------------------------------------------------ Seiten
  const fName = () => { const s = A.byId.informatik; return s ? s.name.replace(/ (eA|gA)$/, '') : 'Informatik'; };
  const crumbs = last => `<nav class="crumbs" aria-label="Pfad"><a href="#/faecher">Fächer</a><span>›</span><a href="#/fach/informatik">${fName()}</a><span>›</span>${last ? `<a href="#/python">Python-Werkstatt</a><span>›</span><b>${A.esc(last)}</b>` : '<b>Python-Werkstatt</b>'}</nav>`;
  const taskRow = t => {
    const b = st().best[t.id];
    return `<a class="row" href="#/python/${t.id}"><span class="pnode">${A.icon(b >= PASS ? 'check' : 'code')}</span><span class="row-main"><span class="row-title">${A.esc(t.titel)}</span><span class="row-sub">${A.esc(t.kurz)} · ${t.tests.length} Tests</span></span><span class="row-end">${b != null ? `<span class="chip ${b >= PASS ? 'ok' : 'warn'}">${b} %</span>` : ''}${A.icon('right', 'chev')}</span></a>`;
  };
  const stdinHtml = v => `<details class="py-stdin"><summary>Eingaben für <code>input()</code></summary><textarea class="input py-in" id="pyIn" rows="3" spellcheck="false" placeholder="Eine Zeile pro input()-Aufruf">${A.esc(v || '')}</textarea></details>`;

  function werkstatt() {
    const s = A.byId.informatik;
    const code = st().code.spiel != null ? st().code.spiel : 'name = "Lernraum"\nfor i in range(3):\n    print(i, "Hallo", name)\n';
    const html = `<div ${A.subjStyle(s)} class="rise pyw">${crumbs()}
      <div class="page-head"><span class="kicker">Werkzeug · Informatik</span><h2 class="h-1">Python-Werkstatt</h2><p class="muted">Code schreiben, ausführen, mit Tests prüfen. Läuft direkt im Browser, auch auf dem iPad.</p></div>
      <div class="notice">${A.icon('shield')}<div>Python läuft abgeschirmt in einem eigenen Bereich und kommt nicht an deine Lerndaten. Beim ersten Start lädt der Browser einmalig ca. 10 MB (Pyodide), danach geht es schneller.</div></div>
      <span class="sub">Aufgaben</span><div class="list prows">${TASKS().map(taskRow).join('')}</div>
      <span class="sub">Spielwiese</span>${editorHtml(code)}${stdinHtml(st().stdin)}
      <div class="py-act"><button class="btn primary" type="button" id="pyRun">${A.icon('play')}Ausführen</button><button class="btn" type="button" id="pyClear">Leeren</button></div>
      <div id="pyFallback"></div>${outHtml()}</div>`;
    return {
      title: 'Python-Werkstatt', back: '#/fach/informatik', nav: 'faecher', html,
      after(root) {
        paintStatus();
        let tmr = null;
        const go = () => execute(root, ta.value, { stdin: ($('#pyIn', root) || {}).value });
        const ta = bindEditor(root, go, v => { clearTimeout(tmr); tmr = setTimeout(() => { st().code.spiel = v; A.save(); }, 400); });
        $('#pyRun', root).onclick = go;
        $('#pyClear', root).onclick = () => { $('#pyPre', root).innerHTML = '<span class="py-dim">Noch nichts ausgeführt.</span>'; };
        const inp = $('#pyIn', root); if (inp) inp.addEventListener('input', () => { st().stdin = inp.value; A.save(); });
      }
    };
  }

  function aufgabe(t) {
    const s = A.byId[t.fach];
    const P = st();
    const code = P.code[t.id] != null ? P.code[t.id] : t.start;
    const algo = t.algo && (window.LR_ALGOS || []).find(a => a.id === t.algo);
    const html = `<div ${A.subjStyle(s)} class="rise pyw">${crumbs(t.titel)}
      <div class="page-head"><span class="kicker">Python · ${t.demo ? 'Demo-Aufgabe' : 'Aufgabe'} · ${t.tests.length} Tests</span><h2 class="h-1">${A.esc(t.titel)}</h2></div>
      <div class="prose">${t.text}</div>
      ${algo ? `<p class="row-sub" style="margin-top:8px">Als Struktogramm und Pseudocode: <a class="link" href="#/algo/${algo.id}">Notation · ${A.esc(algo.titel)}</a></p>` : ''}
      <span class="sub">Dein Code</span>${editorHtml(code)}
      <div class="py-act"><button class="btn primary" type="button" id="pyRun">${A.icon('play')}Ausführen und testen</button><button class="btn" type="button" id="pyTip">${A.icon('bulb')}Tipp</button><button class="btn" type="button" id="pyReset">Zurücksetzen</button><button class="btn" type="button" id="pySol" hidden>${A.icon('eye')}Musterlösung</button></div>
      <div class="notice py-tip" id="pyTipBox" hidden>${A.esc(t.hinweis || '')}</div>
      <div id="pyWarn"></div><div id="pyFallback"></div>${outHtml()}
      <div class="py-tests" id="pyTests"></div>
      <div class="py-sol" id="pySolBox" hidden><span class="sub">Musterlösung (eine von vielen)</span><pre class="code py-solcode">${A.esc(t.loesung)}</pre><p class="row-sub">Vergleiche mit deinem Code: Was ist gleich, was anders? Beides kann richtig sein, wenn alle Tests grün sind.</p></div>
      <div class="finish" id="xfin" hidden></div></div>`;
    return {
      title: t.titel, back: '#/python', nav: 'faecher', focus: true, html,
      after(root) {
        paintStatus();
        let tmr = null, runs = 0;
        const go = async () => {
          const code = ta.value;
          const warn = (t.verbot || []).filter(v => code.includes(v));
          $('#pyWarn', root).innerHTML = warn.length ? `<div class="notice warn">${A.icon('info')}<div>Die Aufgabe soll ohne <code>${A.esc(warn[0])}</code> gelöst werden. Die Tests laufen trotzdem.</div></div>` : '';
          const res = await execute(root, code, { tests: t.tests });
          if (!res) return;
          runs++;
          $('#pySol', root).hidden = false;
          paintTests(root, t, res);
        };
        const ta = bindEditor(root, go, v => { clearTimeout(tmr); tmr = setTimeout(() => { st().code[t.id] = v; A.save(); }, 400); });
        $('#pyRun', root).onclick = go;
        $('#pyTip', root).onclick = () => { const b = $('#pyTipBox', root); b.hidden = !b.hidden; };
        $('#pyReset', root).onclick = () => { if (ta.value === t.start || confirm('Deinen Code durch die Vorlage ersetzen?')) { ta.value = t.start; ta.dispatchEvent(new Event('input')); } };
        $('#pySol', root).onclick = () => { const b = $('#pySolBox', root); b.hidden = !b.hidden; if (!b.hidden) b.scrollIntoView({ block: 'nearest', behavior: A.reduced ? 'auto' : 'smooth' }); };
      }
    };
  }
  function paintTests(root, t, res) {
    const box = $('#pyTests', root);
    if (!res.tests) { box.innerHTML = res.error ? `<p class="row-sub">Die Tests konnten nicht laufen, weil dein Code einen Fehler hat (siehe Ausgabe).</p>` : ''; return; }
    const got = res.tests.filter(x => x.ok).length, n = res.tests.length, pct = Math.round(got / n * 100);
    box.innerHTML = `<span class="sub">Tests · ${got} von ${n} bestanden</span><div class="list">${res.tests.map((x, i) => `<div class="row py-test ${x.ok ? 'ok' : 'bad'}"><span class="pnode">${A.icon(x.ok ? 'check' : 'x')}</span><span class="row-main"><code class="row-title">${A.esc(x.call)}</code><span class="row-sub">erwartet <code>${A.esc(JSON.stringify(t.tests[i].erwartet))}</code> · bekommen <code>${A.esc(x.got)}</code></span></span></div>`).join('')}</div>`;
    const P = st(), before = P.best[t.id];
    if (pct > 0 && (before == null || pct > before)) {
      P.best[t.id] = pct; A.save();
      A.LR.log('extra', `${t.id}:python`, { topic: t.id, kind: 'python', pct, got, n });
    }
    const fin = $('#xfin', root);
    if (got === n) {
      fin.hidden = false;
      fin.innerHTML = `<div class="done-wrap"><div class="done-badge">${A.icon('check')}</div><h2 class="h-2">Alle ${n} Tests bestanden</h2><p class="muted">Stark. Vergleiche noch mit der Musterlösung, dann weiter.</p><a class="btn" href="#/python">Zur Werkstatt</a></div>`;
    } else fin.hidden = true;
  }

  function view(id) {
    if (!id) return werkstatt();
    const t = TASKS().find(x => x.id === id);
    return t ? aufgabe(t) : werkstatt();
  }

  window.LRPython = { init(app) { A = app; A.R.python = view; }, run, ensure, status: () => RUN.st };
})();
