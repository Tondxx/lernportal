/* ==========================================================================
   INFORMATIK-DEMOS (Animationen) für Lektionen IF1, IF5–IF11.
   Registrierung: window.LR_DEMOS[name] = (host, ctx, def) => { … }   (Lektion: { demo: 'i-sort' })
   Namen: i-trace, i-sort, i-laufzeit, i-rekursion, i-fib, i-liste, i-stack, i-queue
   Farben nur über CSS-Variablen (hell/dunkel), keine Inline-Skripte (CSP). Klassen id-* in ds.css.
   Zahlen/Abläufe nachgerechnet: neu/tests/informatik_check.py und neu/tests/informatik_demos.test.js (reine Logik in window.INF_DEMO_LOGIC).
   ========================================================================== */
(function () {
  const $ = (s, r) => r.querySelector(s);
  const $$ = (s, r) => Array.from(r.querySelectorAll(s));
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const reduced = () => typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
  const D = {};

  // ======================================================================
  // Reine Logik (auch im Test benutzbar)
  // ======================================================================
  const L = {};
  // Sortier-Bilder: jedes Bild { a: Liste, cmp: [i, j] | null, swap: bool, fertig: [Indizes], text }
  L.sortFrames = function (algo, input) {
    const a = input.slice(), n = a.length, fr = [];
    let vergl = 0, tausch = 0;
    const snap = (cmp, swap, fertig, text) => fr.push({ a: a.slice(), cmp, swap, fertig: fertig.slice(), text, v: vergl, t: tausch });
    const range = (x, y) => { const r = []; for (let i = x; i < y; i++) r.push(i); return r; };
    snap(null, false, [], 'Start: unsortierte Liste.');
    if (algo === 'bubble') {
      for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - 1 - i; j++) {
          vergl++;
          const gt = a[j] > a[j + 1];
          snap([j, j + 1], false, range(n - i, n), `Vergleiche ${a[j]} und ${a[j + 1]}: ${gt ? 'falsche Reihenfolge, wird getauscht.' : 'passt, bleibt.'}`);
          if (gt) { const h = a[j]; a[j] = a[j + 1]; a[j + 1] = h; tausch++; snap([j, j + 1], true, range(n - i, n), `Getauscht: ${a[j]} steht jetzt vor ${a[j + 1]}.`); }
        }
        snap(null, false, range(n - 1 - i, n), `Durchlauf ${i + 1} fertig: Das Element ganz hinten steht endgültig richtig.`);
      }
    } else if (algo === 'selection') {
      for (let i = 0; i < n - 1; i++) {
        let k = i;
        for (let j = i + 1; j < n; j++) {
          vergl++;
          snap([k, j], false, range(0, i), `Suche das Kleinste im Rest: ${a[j]} &lt; ${a[k]}? ${a[j] < a[k] ? 'ja, neues Kleinstes.' : 'nein.'}`);
          if (a[j] < a[k]) k = j;
        }
        if (k !== i) { const h = a[i]; a[i] = a[k]; a[k] = h; tausch++; snap([i, k], true, range(0, i + 1), `Kleinstes (${a[i]}) wird nach vorn getauscht.`); }
        else snap(null, false, range(0, i + 1), `${a[i]} steht schon richtig, kein Tausch.`);
      }
    } else { // insertion (mit Nachbartausch dargestellt, Zählung wie Verschiebungen)
      for (let i = 1; i < n; i++) {
        let j = i;
        while (j > 0) {
          vergl++;
          const gt = a[j - 1] > a[j];
          snap([j - 1, j], false, range(0, i), `Einsortieren: ${a[j - 1]} &gt; ${a[j]}? ${gt ? 'ja, ein Feld weiter nach rechts.' : 'nein, hier bleibt es.'}`);
          if (!gt) break;
          const h = a[j - 1]; a[j - 1] = a[j]; a[j] = h; tausch++; snap([j - 1, j], true, range(0, i), `${a[j]} ist nach rechts gerückt.`);
          j--;
        }
        snap(null, false, range(0, i + 1), `Die ersten ${i + 1} Elemente sind untereinander sortiert.`);
      }
    }
    snap(null, false, range(0, n), 'Fertig: Die Liste ist sortiert.');
    return fr;
  };
  // Rekursion: Ereignisse { t: 'call'|'return', n, val }, Stapel-Zustand ergibt sich beim Abspielen
  L.recEvents = function (kind, n) {
    const ev = [];
    (function f(k) {
      ev.push({ t: 'call', n: k });
      let val;
      if (k === 0) val = kind === 'fak' ? 1 : 0;
      else { const r = f(k - 1); val = kind === 'fak' ? k * r : k + r; }
      ev.push({ t: 'return', n: k, val });
      return val;
    })(n);
    return ev;
  };
  // Fibonacci-Aufrufbaum: Knoten in Aufrufreihenfolge (Preorder) mit Tiefe und Blattnummer für die Position
  L.fibTree = function (n) {
    const nodes = []; let leaf = 0;
    (function f(k, depth, parent) {
      const node = { n: k, depth, parent, x: 0, id: nodes.length };
      nodes.push(node);
      if (k < 2) { node.x = leaf++; node.val = k; return k; }
      const a = f(k - 1, depth + 1, node.id), b = f(k - 2, depth + 1, node.id);
      const kids = nodes.filter(x => x.parent === node.id);
      node.x = (kids[0].x + kids[kids.length - 1].x) / 2; node.val = a + b;
      return node.val;
    })(n, 0, -1);
    return { nodes, leaves: leaf, tiefe: Math.max(...nodes.map(x => x.depth)) };
  };
  L.fibCalls = n => (n < 2 ? 1 : 1 + L.fibCalls(n - 1) + L.fibCalls(n - 2));
  // Tracetabellen-Programme: Schritte { z: Zeilenindex, v: Variablen, note }
  L.traceProgs = {
    quersumme: {
      name: 'Quersumme', code: ['z = 4721', 's = 0', 'while z > 0:', '    s = s + z % 10', '    z = z // 10', 'print(s)'], vars: ['z', 's'],
      steps() {
        const st = []; let z = 4721, s = 0;
        st.push({ z: 0, v: { z, s: '–' }, note: 'z bekommt den Wert 4721.' });
        st.push({ z: 1, v: { z, s }, note: 's bekommt den Wert 0.' });
        while (true) {
          st.push({ z: 2, v: { z, s }, note: z > 0 ? `Prüfung: ${z} > 0 ist wahr, der Rumpf läuft.` : `Prüfung: ${z} > 0 ist falsch, die Schleife endet.` });
          if (!(z > 0)) break;
          s = s + z % 10; st.push({ z: 3, v: { z, s }, note: `s = s + ${z % 10} (letzte Ziffer von ${z}) → s = ${s}.` });
          z = Math.floor(z / 10); st.push({ z: 4, v: { z, s }, note: `z // 10 schneidet die letzte Ziffer ab → z = ${z}.` });
        }
        st.push({ z: 5, v: { z, s }, note: `Ausgabe: ${s}. Das Programm berechnet die Quersumme.`, out: s });
        return st;
      }
    },
    collatz: {
      name: 'Collatz (Start 6)', code: ['zahl = 6', 'schritte = 0', 'while zahl != 1:', '    if zahl % 2 == 0:', '        zahl = zahl // 2', '    else:', '        zahl = 3 * zahl + 1', '    schritte = schritte + 1', 'print(schritte)'], vars: ['zahl', 'schritte'],
      steps() {
        const st = []; let zahl = 6, k = 0;
        st.push({ z: 0, v: { zahl, schritte: '–' }, note: 'zahl bekommt 6.' });
        st.push({ z: 1, v: { zahl, schritte: k }, note: 'schritte bekommt 0.' });
        while (true) {
          st.push({ z: 2, v: { zahl, schritte: k }, note: zahl !== 1 ? `Prüfung: ${zahl} != 1 ist wahr.` : 'Prüfung: zahl != 1 ist falsch, Ende.' });
          if (zahl === 1) break;
          const gerade = zahl % 2 === 0;
          st.push({ z: 3, v: { zahl, schritte: k }, note: `${zahl} % 2 == 0? ${gerade ? 'ja, gerade.' : 'nein, ungerade.'}` });
          if (gerade) { zahl = zahl / 2; st.push({ z: 4, v: { zahl, schritte: k }, note: `Halbieren: zahl = ${zahl}.` }); }
          else { zahl = 3 * zahl + 1; st.push({ z: 6, v: { zahl, schritte: k }, note: `3 · Zahl + 1: zahl = ${zahl}.` }); }
          k++; st.push({ z: 7, v: { zahl, schritte: k }, note: `schritte = ${k}.` });
        }
        st.push({ z: 8, v: { zahl, schritte: k }, note: `Ausgabe: ${k}.`, out: k });
        return st;
      }
    },
    liste: {
      name: 'Maximum mit Position', code: ['liste = [4, 9, 2, 9, 5]', 'maximum = liste[0]', 'position = 0', 'for i in range(1, len(liste)):', '    if liste[i] > maximum:', '        maximum = liste[i]', '        position = i', 'print(maximum, position)'], vars: ['i', 'maximum', 'position'],
      steps() {
        const li = [4, 9, 2, 9, 5], st = []; let mx = li[0], pos = 0;
        st.push({ z: 0, v: { i: '–', maximum: '–', position: '–' }, note: 'Die Liste hat 5 Elemente, Indizes 0 bis 4.' });
        st.push({ z: 1, v: { i: '–', maximum: mx, position: '–' }, note: 'Startwert: das erste Element.' });
        st.push({ z: 2, v: { i: '–', maximum: mx, position: pos }, note: 'Startposition 0.' });
        for (let i = 1; i < li.length; i++) {
          st.push({ z: 3, v: { i, maximum: mx, position: pos }, note: `Die Schleife setzt i = ${i}.` });
          const gt = li[i] > mx;
          st.push({ z: 4, v: { i, maximum: mx, position: pos }, note: `liste[${i}] = ${li[i]} &gt; ${mx}? ${gt ? 'ja.' : 'nein.'}` });
          if (gt) { mx = li[i]; st.push({ z: 5, v: { i, maximum: mx, position: pos }, note: `Neues Maximum: ${mx}.` }); pos = i; st.push({ z: 6, v: { i, maximum: mx, position: pos }, note: `Position merken: ${pos}.` }); }
        }
        st.push({ z: 7, v: { i: 4, maximum: mx, position: pos }, note: `Ausgabe: ${mx} ${pos}. Die erste 9 gewinnt, weil > (nicht >=) verglichen wird.`, out: `${mx} ${pos}` });
        return st;
      }
    }
  };
  // Stapel/Schlange (reine Logik, Abitur-Operationen)
  L.Stack = function () { const s = []; return { push: x => { s.push(x); }, pop: () => s.pop(), top: () => s[s.length - 1], isEmpty: () => s.length === 0, items: () => s.slice() }; };
  L.Queue = function () { const q = []; return { enqueue: x => { q.push(x); }, dequeue: () => q.shift(), head: () => q[0], isEmpty: () => q.length === 0, items: () => q.slice() }; };
  // Verkettete Liste: Anzahl verschobener Elemente im Array beim Einfügen nach Index k (k = -1: am Anfang)
  L.arrayShifts = (len, k) => len - (k + 1);
  window.INF_DEMO_LOGIC = L;

  // ======================================================================
  // UI-Bausteine
  // ======================================================================
  const seg = (key, items, on) => `<div class="pd-seg" data-seg="${key}" role="group">${items.map(([v, l]) => `<button type="button" data-v="${v}" class="${v === on ? 'on' : ''}" aria-pressed="${v === on}">${l}</button>`).join('')}</div>`;
  function bindSeg(host, key, cb) {
    const box = $(`[data-seg="${key}"]`, host);
    $$('button', box).forEach(b => b.addEventListener('click', () => {
      $$('button', box).forEach(x => { x.classList.toggle('on', x === b); x.setAttribute('aria-pressed', x === b); });
      cb(b.dataset.v);
    }));
  }
  const slider = (id, label, unit, min, max, step, val) => `<div class="pd-ctl"><label for="${id}"><span>${label}</span><b data-out="${id}"></b><span>${unit}</span></label><input class="slider" id="${id}" type="range" min="${min}" max="${max}" step="${step}" value="${val}"></div>`;
  const btn = (label, attr, cls = '') => `<button class="btn small ${cls}" type="button" ${attr}>${label}</button>`;
  // Abspieler: ruft step() alle ms auf; stoppt, wenn die Seite gewechselt wurde
  function player(host, ms, step) {
    let tmr = null;
    const stop = () => { if (tmr) { clearInterval(tmr); tmr = null; } };
    const tick = () => { if (!host.isConnected) { stop(); return; } if (!step()) stop(); };
    return { toggle() { if (tmr) { stop(); return false; } if (reduced()) { step(); return false; } tmr = setInterval(tick, ms()); return true; }, stop, running: () => !!tmr, restart(ms2) { if (tmr) { stop(); tmr = setInterval(tick, ms2); } } };
  }
  const fmt = n => (n >= 1e12 ? n.toExponential(2).replace('.', ',').replace('e+', '·10^') : Number(n).toLocaleString('de-DE'));

  // ======================================================================
  // I1 · Tracetabelle: Programm Schritt für Schritt
  // ======================================================================
  D['i-trace'] = function (host) {
    let prog = 'quersumme', steps = L.traceProgs[prog].steps(), cur = 0;
    host.innerHTML = `<div class="id-wrap">${seg('prog', Object.entries(L.traceProgs).map(([k, p]) => [k, p.name]), prog)}
      <div class="id-trace"><div class="id-code" id="code" aria-label="Programm"></div><div class="id-tbl-w"><table class="ic-tab id-tbl" id="tbl"></table></div></div>
      <p class="pd-msg" id="msg"></p>
      <div class="pd-btns">${btn('Zurück', 'data-back')}${btn('Nächster Schritt', 'data-next', 'primary')}${btn('Neustart', 'data-reset')}</div></div>`;
    const codeEl = $('#code', host), tbl = $('#tbl', host);
    function draw() {
      const P = L.traceProgs[prog], s = steps[cur];
      codeEl.innerHTML = P.code.map((l, i) => `<div class="id-line${i === s.z ? ' on' : ''}"><span class="ln">${i + 1}</span><span class="ct">${esc(l)}</span></div>`).join('');
      // Tracetabelle: eine Zeile pro Schritt bis jetzt, nur wenn sich eine Variable geändert hat (oder erster Schritt)
      const rows = []; let prev = null;
      steps.slice(0, cur + 1).forEach((st, i) => { const key = JSON.stringify(st.v); if (i === 0 || key !== prev) rows.push({ st, i }); prev = key; });
      tbl.innerHTML = `<thead><tr><th>Zeile</th>${P.vars.map(v => `<th>${v}</th>`).join('')}</tr></thead><tbody>${rows.map(r => `<tr class="${r.i === cur || (r === rows[rows.length - 1]) ? 'on' : ''}"><td>${r.st.z + 1}</td>${P.vars.map(v => `<td>${esc(r.st.v[v])}</td>`).join('')}</tr>`).join('')}</tbody>`;
      $('#msg', host).innerHTML = `<b>Schritt ${cur + 1} von ${steps.length}.</b> ${s.note}${s.out !== undefined ? ` <b>Ausgabe: ${esc(s.out)}</b>` : ''}`;
      $('[data-back]', host).disabled = cur === 0; $('[data-next]', host).disabled = cur === steps.length - 1;
    }
    bindSeg(host, 'prog', v => { prog = v; steps = L.traceProgs[prog].steps(); cur = 0; draw(); });
    $('[data-next]', host).addEventListener('click', () => { if (cur < steps.length - 1) { cur++; draw(); } });
    $('[data-back]', host).addEventListener('click', () => { if (cur > 0) { cur--; draw(); } });
    $('[data-reset]', host).addEventListener('click', () => { cur = 0; draw(); });
    draw();
  };

  // ======================================================================
  // I2 · Sortieren: Bubble, Selection, Insertion
  // ======================================================================
  D['i-sort'] = function (host) {
    const PRE = { zufall: [5, 2, 4, 1, 3, 6, 8, 7], umgekehrt: [8, 7, 6, 5, 4, 3, 2, 1], fast: [1, 2, 4, 3, 5, 6, 8, 7] };
    let algo = 'bubble', data = PRE.zufall.slice(), frames = L.sortFrames(algo, data), cur = 0;
    host.innerHTML = `<div class="id-wrap">${seg('algo', [['bubble', 'Bubblesort'], ['selection', 'Selectionsort'], ['insertion', 'Insertionsort']], algo)}
      ${seg('pre', [['zufall', 'Gemischt'], ['umgekehrt', 'Umgekehrt'], ['fast', 'Fast sortiert'], ['neu', 'Neu mischen']], 'zufall')}
      <div class="id-bars" id="bars" role="img" aria-label="Balken der Liste"></div>
      <div class="read"><span>Vergleiche: <b id="rV">0</b></span><span id="lblT">Vertauschungen: <b id="rT">0</b></span><span>Schritt <b id="rS">0</b> von <b id="rN">0</b></span></div>
      <p class="pd-msg" id="msg"></p>
      <div class="pd-ctls">${slider('idSp', 'Tempo:', 'Bilder/s', 1, 8, 1, 3)}</div>
      <div class="pd-btns">${btn('Zurück', 'data-back')}${btn('Weiter', 'data-next', 'primary')}${btn('Abspielen', 'data-play')}${btn('Neustart', 'data-reset')}</div></div>`;
    const bars = $('#bars', host);
    const pl = player(host, () => 1000 / +$('#idSp', host).value, () => { if (cur < frames.length - 1) { cur++; draw(); return true; } $('[data-play]', host).textContent = 'Abspielen'; return false; });
    function draw() {
      const f = frames[cur], mx = Math.max(...f.a);
      bars.innerHTML = f.a.map((v, i) => `<div class="id-bar${f.cmp && f.cmp.includes(i) ? (f.swap ? ' swap' : ' cmp') : ''}${f.fertig.includes(i) ? ' ok' : ''}" style="--h:${Math.round(v / mx * 100)}%"><span>${v}</span></div>`).join('');
      $('#rV', host).textContent = f.v; $('#rT', host).textContent = f.t; $('#rS', host).textContent = cur + 1; $('#rN', host).textContent = frames.length;
      $('#lblT', host).firstChild.textContent = algo === 'insertion' ? 'Verschiebungen: ' : 'Vertauschungen: ';
      $('#msg', host).innerHTML = f.text;
      $('[data-back]', host).disabled = cur === 0; $('[data-next]', host).disabled = cur === frames.length - 1;
    }
    const rebuild = () => { pl.stop(); $('[data-play]', host).textContent = 'Abspielen'; frames = L.sortFrames(algo, data); cur = 0; draw(); };
    bindSeg(host, 'algo', v => { algo = v; rebuild(); });
    bindSeg(host, 'pre', v => { data = v === 'neu' ? PRE.zufall.slice().sort(() => Math.random() - 0.5) : PRE[v].slice(); rebuild(); });
    $('[data-next]', host).addEventListener('click', () => { pl.stop(); $('[data-play]', host).textContent = 'Abspielen'; if (cur < frames.length - 1) { cur++; draw(); } });
    $('[data-back]', host).addEventListener('click', () => { pl.stop(); $('[data-play]', host).textContent = 'Abspielen'; if (cur > 0) { cur--; draw(); } });
    $('[data-reset]', host).addEventListener('click', rebuild);
    $('[data-play]', host).addEventListener('click', e => { if (cur >= frames.length - 1) { cur = 0; draw(); } e.currentTarget.textContent = pl.toggle() ? 'Pause' : 'Abspielen'; });
    $('#idSp', host).addEventListener('input', () => { $('[data-out="idSp"]', host).textContent = $('#idSp', host).value; pl.restart(1000 / +$('#idSp', host).value); });
    $('[data-out="idSp"]', host).textContent = $('#idSp', host).value;
    draw();
  };

  // ======================================================================
  // I3 · Laufzeit: Wie schnell wächst die Schrittzahl?
  // ======================================================================
  D['i-laufzeit'] = function (host) {
    const ROWS = [['O(1)', 'konstant', n => 1], ['O(n)', 'lineare Suche', n => n], ['O(n²)', 'Bubble-/Selectionsort', n => n * n], ['O(2ⁿ)', 'Fibonacci rekursiv', n => Math.pow(2, n)]];
    host.innerHTML = `<div class="id-wrap"><div class="pd-ctls">${slider('idN', 'n =', 'Elemente', 1, 40, 1, 8)}</div>
      <div class="id-run" id="run"></div>
      <div class="read"><span>Bubblesort bei n Elementen: <b id="rB"></b> Vergleiche</span></div>
      <p class="pd-msg" id="msg"></p>
      <div class="pd-btns">${btn('n verdoppeln', 'data-dbl', 'primary')}${btn('n = 8', 'data-reset')}</div></div>`;
    const run = $('#run', host), CAP = 400;
    function draw() {
      const n = +$('#idN', host).value;
      $('[data-out="idN"]', host).textContent = n;
      run.innerHTML = ROWS.map(([o, w, f]) => { const v = f(n), p = Math.min(100, v / CAP * 100); return `<div class="id-rw"><span class="id-o"><b>${o}</b><small>${w}</small></span><span class="id-track"><i style="width:${p}%" class="${v > CAP ? 'over' : ''}"></i></span><span class="id-v">${v > CAP ? '> ' + CAP + ' …' : ''} ${fmt(v)}</span></div>`; }).join('');
      $('#rB', host).textContent = fmt(n * (n - 1) / 2);
      $('#msg', host).innerHTML = n >= 30 ? `Bei n = ${n} hat O(2ⁿ) schon <b>${fmt(Math.pow(2, n))}</b> Schritte: Der Balken sprengt jede Skala.` : 'Verschiebe den Regler. Der Balken zeigt bis 400 Schritte; was darüber liegt, ist mit „&gt;“ markiert.';
    }
    $('#idN', host).addEventListener('input', draw);
    $('[data-dbl]', host).addEventListener('click', () => {
      const s = $('#idN', host), n = +s.value, n2 = Math.min(40, n * 2); s.value = n2; draw();
      const r = k => ROWS[k][2](n2) / ROWS[k][2](n), nf = x => x.toFixed(1).replace('.', ',');
      $('#msg', host).innerHTML = `n von ${n} auf ${n2}: O(n) ×${nf(r(1))}, O(n²) ×${nf(r(2))}${n2 === n ? ' (n ist schon am Maximum)' : ''}.`;
    });
    $('[data-reset]', host).addEventListener('click', () => { $('#idN', host).value = 8; draw(); });
    draw();
  };

  // ======================================================================
  // I4 · Rekursion: Aufrufstapel (Summe / Fakultät)
  // ======================================================================
  D['i-rekursion'] = function (host) {
    let kind = 'sum', n = 4, ev = L.recEvents(kind, n), cur = 0;
    host.innerHTML = `<div class="id-wrap">${seg('kind', [['sum', 'summe(n)'], ['fak', 'fakultaet(n)']], kind)}
      <div class="pd-ctls">${slider('idRn', 'n =', '', 1, 6, 1, 4)}</div>
      <div class="id-code mini" id="code"></div>
      <div class="id-stackw"><span class="kicker">Aufrufstapel (oben = aktueller Aufruf)</span><div class="id-stack" id="stk" aria-live="polite"></div></div>
      <p class="pd-msg" id="msg"></p>
      <div class="pd-btns">${btn('Zurück', 'data-back')}${btn('Nächster Schritt', 'data-next', 'primary')}${btn('Neustart', 'data-reset')}</div></div>`;
    const name = () => (kind === 'sum' ? 'summe' : 'fakultaet');
    const base = () => (kind === 'sum' ? 0 : 1);
    function draw() {
      $('[data-out="idRn"]', host).textContent = n;
      $('#code', host).innerHTML = kind === 'sum'
        ? `<div class="id-line"><span class="ct">def summe(n):</span></div><div class="id-line"><span class="ct">    if n == 0: return 0</span></div><div class="id-line"><span class="ct">    return n + summe(n - 1)</span></div>`
        : `<div class="id-line"><span class="ct">def fakultaet(n):</span></div><div class="id-line"><span class="ct">    if n == 0: return 1</span></div><div class="id-line"><span class="ct">    return n * fakultaet(n - 1)</span></div>`;
      // Stapel neu berechnen: nach cur Ereignissen
      const st = []; let last = null;
      ev.slice(0, cur).forEach(e => {
        if (e.t === 'call') st.push({ n: e.n, val: null });
        else { const top = st[st.length - 1]; top.val = e.val; last = e; if (!(e === ev[cur - 1])) st.pop(); }
      });
      // Nach einem return (letztes Ereignis) bleibt der Rahmen mit Rückgabewert sichtbar, bis es weitergeht
      $('#stk', host).innerHTML = st.slice().reverse().map((f, i) => {
        const top = i === 0, done = f.val !== null;
        const txt = f.n === 0 ? `${name()}(0) → Abbruch` : `${name()}(${f.n}) wartet auf ${kind === 'sum' ? f.n + ' + ' : f.n + ' · '}${name()}(${f.n - 1})`;
        return `<div class="id-frame${top ? ' top' : ''}${done ? ' done' : ''}"><span>${esc(txt)}</span>${done ? `<b>gibt ${f.val} zurück</b>` : ''}</div>`;
      }).join('') || '<div class="id-frame empty">leer</div>';
      const e = ev[cur - 1];
      $('#msg', host).innerHTML = cur === 0 ? `Start: Der Aufruf <b>${name()}(${n})</b> beginnt. Klicke auf „Nächster Schritt“.`
        : e.t === 'call' ? (e.n === 0 ? `<b>${name()}(0)</b>: Abbruchbedingung erfüllt. Er gibt ${base()} zurück, ohne sich noch einmal aufzurufen.` : `<b>${name()}(${e.n})</b> ruft ${name()}(${e.n - 1}) auf und <b>wartet</b>. Der Stapel wächst.`)
          : `<b>${name()}(${e.n})</b> ist fertig und gibt <b>${e.val}</b> zurück${e.n === n ? '. Das ist das Endergebnis.' : '. Der Aufruf darunter rechnet damit weiter.'}`;
      $('[data-back]', host).disabled = cur === 0; $('[data-next]', host).disabled = cur === ev.length;
    }
    const reset = () => { ev = L.recEvents(kind, n); cur = 0; draw(); };
    bindSeg(host, 'kind', v => { kind = v; reset(); });
    $('#idRn', host).addEventListener('input', () => { n = +$('#idRn', host).value; reset(); });
    $('[data-next]', host).addEventListener('click', () => { if (cur < ev.length) { cur++; draw(); } });
    $('[data-back]', host).addEventListener('click', () => { if (cur > 0) { cur--; draw(); } });
    $('[data-reset]', host).addEventListener('click', reset);
    draw();
  };

  // ======================================================================
  // I5 · Fibonacci: Aufrufbaum
  // ======================================================================
  D['i-fib'] = function (host) {
    let n = 4, tree = L.fibTree(n), shown = tree.nodes.length;
    host.innerHTML = `<div class="id-wrap"><div class="pd-ctls">${slider('idFn', 'n =', '', 2, 7, 1, 4)}</div>
      <div class="id-fibw"><svg id="svg" role="img" aria-label="Aufrufbaum von fib"></svg></div>
      <div class="read"><span>Aufrufe: <b id="rA"></b></span><span>fib(n) = <b id="rF"></b></span><span>Schleife: <b id="rS"></b> Schritte</span></div>
      <p class="pd-msg" id="msg"></p>
      <div class="pd-btns">${btn('Aufrufe nacheinander zeigen', 'data-play', 'primary')}${btn('Alle zeigen', 'data-all')}</div></div>`;
    const svg = $('#svg', host);
    const pl = player(host, () => 350, () => { if (shown < tree.nodes.length) { shown++; draw(); return true; } return false; });
    const COL = ['#38bdf8', '#34d399', '#fbbf24', '#f472b6', '#a78bfa', '#fb923c', '#2dd4bf', '#f87171'];
    function draw() {
      const W = Math.max(300, tree.leaves * 54 + 30), H = (tree.tiefe + 1) * 62 + 20;
      svg.setAttribute('viewBox', `0 0 ${W} ${H}`); svg.style.minWidth = Math.min(W, 560) + 'px';
      const px = nd => 27 + nd.x * 54 + 3, py = nd => 28 + nd.depth * 62;
      const vis = tree.nodes.slice(0, shown);
      svg.innerHTML = vis.filter(x => x.parent >= 0).map(x => { const p = tree.nodes[x.parent]; return `<line x1="${px(p)}" y1="${py(p)}" x2="${px(x)}" y2="${py(x)}" class="id-edge"/>`; }).join('')
        + vis.map(x => `<g class="id-node${x.id === shown - 1 ? ' last' : ''}"><circle cx="${px(x)}" cy="${py(x)}" r="20" style="fill:${COL[x.n % COL.length]}33;stroke:${COL[x.n % COL.length]}"/><text x="${px(x)}" y="${py(x) + 5}" text-anchor="middle">${x.n}</text></g>`).join('');
      const calls = tree.nodes.length, vals = [0, 1];
      for (let i = 2; i <= n; i++) vals.push(vals[i - 1] + vals[i - 2]);
      $('[data-out="idFn"]', host).textContent = n;
      $('#rA', host).textContent = `${shown} von ${calls}`; $('#rF', host).textContent = vals[n]; $('#rS', host).textContent = n;
      const cnt = k => tree.nodes.filter(x => x.n === k).length;
      $('#msg', host).innerHTML = shown < calls ? `Jeder Kreis ist ein Aufruf <b>fib(k)</b> (die Zahl im Kreis ist k). Gleiche Zahl = gleiche Farbe.` : `Fertig: <b>${calls} Aufrufe</b>. fib(2) wird ${cnt(2)}-mal berechnet, fib(1) ${cnt(1)}-mal, fib(0) ${cnt(0)}-mal. Dieselbe Arbeit wird immer wieder gemacht. Die Schleife braucht nur ${n} Schritte.`;
    }
    $('#idFn', host).addEventListener('input', () => { pl.stop(); n = +$('#idFn', host).value; tree = L.fibTree(n); shown = tree.nodes.length; draw(); });
    $('[data-play]', host).addEventListener('click', () => { if (shown >= tree.nodes.length) shown = 0; pl.stop(); draw(); pl.toggle(); });
    $('[data-all]', host).addEventListener('click', () => { pl.stop(); shown = tree.nodes.length; draw(); });
    draw();
  };

  // ======================================================================
  // I6 · Verkettete Liste: Zeiger umbiegen (Einfügen, Löschen)
  // ======================================================================
  D['i-liste'] = function (host) {
    let list = ['Messer', 'Schild', 'Kompass'], op = null; // op: { t:'ins'|'del', k, val, step }
    host.innerHTML = `<div class="id-wrap"><div class="id-listw"><svg id="svg" role="img" aria-label="Verkettete Liste mit Zeigern"></svg></div>
      <div class="id-form"><label>Neuer Wert <input class="input" id="val" value="Schwert" maxlength="10"></label>
        <label>Einfügen nach <select class="input" id="pos"></select></label>
        <label>Löschen <select class="input" id="del"></select></label></div>
      <div class="pd-btns">${btn('Einfügen starten', 'data-ins', 'primary')}${btn('Löschen starten', 'data-del')}${btn('Nächster Schritt', 'data-next')}${btn('Zurücksetzen', 'data-reset')}</div>
      <p class="pd-msg" id="msg"></p><div class="read"><span>Array: <b id="rA">–</b> Elemente verschoben</span><span>verkettete Liste: <b id="rL">–</b> Elemente verschoben</span></div></div>`;
    const svg = $('#svg', host), BW = 96, BH = 42, GAP = 54, X0 = 120, Y0 = 52;
    const nx = i => X0 + i * (BW + GAP);
    const arrow = (x1, y1, x2, y2, cls = '') => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="id-ptr ${cls}" marker-end="url(#idarr)"/>`;
    const box = (x, y, t, cls = '') => `<g class="id-kn ${cls}"><rect x="${x}" y="${y}" width="${BW * 0.68}" height="${BH}" rx="8"/><rect x="${x + BW * 0.68}" y="${y}" width="${BW * 0.32}" height="${BH}" rx="8" class="z"/><text x="${x + BW * 0.34}" y="${y + 26}" text-anchor="middle">${esc(t)}</text><circle cx="${x + BW * 0.84}" cy="${y + BH / 2}" r="4" class="dot"/></g>`;
    const out = x => ({ x: x + BW * 0.84, y: Y0 + BH / 2 });
    function fill() {
      $('#pos', host).innerHTML = `<option value="-1">Anfang (Anker)</option>` + list.map((v, i) => `<option value="${i}">${esc(v)}</option>`).join('');
      $('#del', host).innerHTML = list.map((v, i) => `<option value="${i}">${esc(v)}</option>`).join('');
    }
    function draw() {
      const n = list.length, W = X0 + (n + 1) * (BW + GAP) + 20, H = 190;
      svg.setAttribute('viewBox', `0 0 ${W} ${H}`); svg.style.minWidth = Math.min(W, 680) + 'px';
      let h = `<defs><marker id="idarr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" class="id-ah"/></marker></defs>`;
      const ins = op && op.t === 'ins', del = op && op.t === 'del', k = op ? op.k : -2, st = op ? op.step : 0;
      const ny = Y0 + 100;
      // Position des neuen Knotens (unter der Lücke bzw. links vom ersten Knoten)
      const newX = ins ? (k >= 0 ? nx(k) + (BW + GAP) / 2 : X0 - (BW + GAP) / 2 + 10) : 0;
      // Anker
      h += `<g class="id-anker"><rect x="6" y="${Y0 - 42}" width="56" height="26" rx="6"/><text x="34" y="${Y0 - 24}" text-anchor="middle">Anker</text></g>`;
      const first = del && k === 0 && st >= 1;      // Anker wird auf den zweiten Knoten umgebogen
      const ankerOld = (ins && k === -1 && st >= 3) || first;
      if (n) h += `<line x1="34" y1="${Y0 - 16}" x2="${nx(0) + 14}" y2="${Y0 - 2}" class="id-ptr ${ankerOld ? 'old' : ''}" marker-end="url(#idarr)"/>`;
      else if (!ins) h += `<text x="76" y="${Y0 - 20}" class="id-null">NULL</text>`;
      if (ins && k === -1 && st >= 3) h += arrow(34, Y0 - 16, newX + BW * 0.34, ny - 2, 'hot');
      if (first) h += n > 1 ? `<path d="M 34 ${Y0 - 16} C 34 ${Y0 - 56}, ${nx(1) + 40} ${Y0 - 56}, ${nx(1) + 40} ${Y0 - 2}" class="id-ptr hot" fill="none" marker-end="url(#idarr)"/>` : `<text x="76" y="${Y0 - 20}" class="id-null hot">NULL</text>`;
      list.forEach((v, i) => {
        const gone = del && k === i && st >= 2, mark = del && k === i && st >= 1;
        h += box(nx(i), Y0, v, gone ? 'gone' : (mark ? 'mark' : ''));
        const o = out(nx(i));
        if (i < n - 1) {
          const nxt = nx(i + 1) + 4;
          if (del && k === i && st >= 1) h += arrow(o.x, o.y, nxt, Y0 + BH / 2, 'old');
          else if (del && k === i + 1 && st >= 1) {
            h += arrow(o.x, o.y, nxt, Y0 + BH / 2, 'old');
            h += i + 2 < n ? `<path d="M ${o.x} ${o.y - 6} C ${o.x} ${Y0 - 36}, ${nx(i + 2) + 40} ${Y0 - 36}, ${nx(i + 2) + 40} ${Y0 - 2}" class="id-ptr hot" fill="none" marker-end="url(#idarr)"/>` : `<text x="${o.x + 8}" y="${Y0 - 14}" class="id-null hot">NULL</text>`;
          } else h += arrow(o.x, o.y, nxt, Y0 + BH / 2, ins && k === i && st >= 3 ? 'old' : '');
        } else h += `<text x="${o.x + 12}" y="${Y0 + BH / 2 + 5}" class="id-null ${(ins && k === i && st >= 3) ? 'old' : ''}">NULL</text>`;
      });
      if (n === 0 && !ins) h += `<text x="${X0}" y="${Y0 + 26}" class="id-null">(leere Liste)</text>`;
      if (ins && st >= 1) {
        h += box(newX, ny, op.val, 'new');
        const o2 = { x: newX + BW * 0.84, y: ny + BH / 2 };
        if (st >= 2) h += (k + 1 < n) ? arrow(o2.x, o2.y, nx(k + 1) + BW * 0.3, Y0 + BH + 2, 'hot') : `<text x="${o2.x + 12}" y="${o2.y + 5}" class="id-null hot">NULL</text>`;
        if (st >= 3 && k >= 0) { const o = out(nx(k)); h += arrow(o.x, o.y + 6, newX + BW * 0.34, ny - 2, 'hot'); }
      }
      svg.innerHTML = h;
    }
    function msg(t) { $('#msg', host).innerHTML = t; }
    function start(t) {
      if (t === 'ins') {
        const val = ($('#val', host).value || '').trim() || 'Neu', k = +$('#pos', host).value;
        if (list.length >= 6) { msg('Mehr als 6 Knoten passen nicht auf den Bildschirm. Setze die Liste zurück.'); return; }
        op = { t: 'ins', k, val, step: 1 };
        $('#rA', host).textContent = L.arrayShifts(list.length, k); $('#rL', host).textContent = 0;
        msg(`<b>Schritt 1:</b> Neuen Knoten <b>${esc(val)}</b> erzeugen. Er ist noch nicht mit der Liste verbunden.`);
      } else {
        if (!list.length) { msg('Die Liste ist leer.'); return; }
        const k = +$('#del', host).value;
        op = { t: 'del', k, step: 1 };
        $('#rA', host).textContent = list.length - 1 - k; $('#rL', host).textContent = 0;
        msg(`<b>Schritt 1:</b> Knoten <b>${esc(list[k])}</b> zum Löschen markiert. Wer zeigt auf ihn? ${k === 0 ? 'Der <b>Anker</b>.' : `Der Knoten <b>${esc(list[k - 1])}</b>.`}`);
      }
      draw();
    }
    function next() {
      if (!op) { msg('Starte zuerst „Einfügen“ oder „Löschen“.'); return; }
      const { t, k } = op;
      if (t === 'ins') {
        if (op.step === 1) { op.step = 2; msg(`<b>Schritt 2:</b> Der neue Knoten übernimmt den Zeiger zum Nachfolger: ${k + 1 < list.length ? `<code>${esc(op.val)}.zeiger ← ${esc(list[k + 1])}</code>` : `<code>${esc(op.val)}.zeiger ← NULL</code>`}. <b>Zuerst</b> dieser Schritt, sonst geht der Rest der Liste verloren!`); }
        else if (op.step === 2) { op.step = 3; msg(`<b>Schritt 3:</b> ${k >= 0 ? `Der Zeiger von <b>${esc(list[k])}</b> wird auf den neuen Knoten umgebogen (der alte Zeiger wird grau).` : 'Der <b>Anker</b> wird auf den neuen Knoten umgebogen.'}`); }
        else if (op.step === 3) { list.splice(k + 1, 0, op.val); op = null; fill(); msg('Fertig: Der Knoten ist eingefügt. Es wurden nur zwei Zeiger geändert, nichts verschoben.'); }
      } else {
        if (op.step === 1) { op.step = 2; msg(`<b>Schritt 2:</b> ${k === 0 ? 'Der <b>Anker</b> zeigt jetzt auf den zweiten Knoten.' : `Der Zeiger von <b>${esc(list[k - 1])}</b> wird auf ${k + 1 < list.length ? `<b>${esc(list[k + 1])}</b>` : '<b>NULL</b>'} umgebogen.`} Kein Zeiger zeigt mehr auf <b>${esc(list[k])}</b>.`); }
        else if (op.step === 2) { list.splice(k, 1); op = null; fill(); msg('Fertig: Der Knoten ist aus der Liste herausgenommen (das System gibt ihn frei).'); }
      }
      draw();
    }
    $('[data-ins]', host).addEventListener('click', () => start('ins'));
    $('[data-del]', host).addEventListener('click', () => start('del'));
    $('[data-next]', host).addEventListener('click', next);
    $('[data-reset]', host).addEventListener('click', () => { list = ['Messer', 'Schild', 'Kompass']; op = null; fill(); draw(); msg('Liste zurückgesetzt.'); $('#rA', host).textContent = '–'; $('#rL', host).textContent = '–'; });
    fill(); draw(); msg('Wähle, wo eingefügt oder was gelöscht werden soll, und gehe Schritt für Schritt durch.');
  };

  // ======================================================================
  // I7/I8 · Stapel (LIFO) und Schlange (FIFO)
  // ======================================================================
  function structDemo(host, mode) {
    const isS = mode === 'stack';
    const S = isS ? L.Stack() : L.Queue();
    const NAMES = isS ? { add: 'push', rem: 'pop', look: 'top' } : { add: 'enqueue', rem: 'dequeue', look: 'head' };
    const log = [];
    let preset = 0;
    const PRE_STACK = 'STAX<PEN<L'.split('');
    const PRE_QUEUE = [['T11', 'ein'], ['T12', 'ein'], ['T13', 'ein'], ['T11', 'aus'], ['T14', 'ein'], ['T12', 'aus'], ['T14', 'aus']];
    host.innerHTML = `<div class="id-wrap"><div class="id-ds ${isS ? 'stack' : 'queue'}" id="ds" aria-live="polite"></div>
      <div class="id-form"><label>Wert <input class="input" id="val" value="A" maxlength="6"></label></div>
      <div class="pd-btns">${btn(`${NAMES.add}(x)`, 'data-add', 'primary')}${btn(`${NAMES.rem}()`, 'data-rem')}${btn(`${NAMES.look}()`, 'data-look')}${btn('isEmpty()', 'data-emp')}${btn('Leeren', 'data-clr')}</div>
      <div class="id-log" id="log" aria-live="polite"></div>
      <div class="id-preset"><span class="kicker">${isS ? 'Beispiel: Rücktaste im Textfeld' : 'Beispiel: Taxistand mit Protokoll'}</span>
        <p class="row-sub" style="margin:4px 0 8px">${isS ? 'Tippe <code>STAX&lt;PEN&lt;L</code> Zeichen für Zeichen. <code>&lt;</code> ist die Rücktaste (<code>pop</code>).' : 'Protokoll: T11 ein, T12 ein, T13 ein, T11 aus, T14 ein, T12 aus, <b>T14 aus</b>. Findest du den Fehler?'}</p>
        <div class="pd-btns">${btn('Nächstes Ereignis', 'data-pre', 'primary')}${btn('Beispiel neu', 'data-prereset')}</div></div>
      <p class="pd-msg" id="msg"></p></div>`;
    const MAX = isS ? 7 : 8;
    function draw() {
      const it = S.items();
      $('#ds', host).innerHTML = isS
        ? `<div class="id-col">${it.slice().reverse().map((x, i) => `<div class="id-cell${i === 0 ? ' top' : ''}">${esc(x)}${i === 0 ? '<small>← top</small>' : ''}</div>`).join('') || '<div class="id-cell empty">leer</div>'}<div class="id-floor"></div></div>`
        : `<div class="id-row"><span class="id-end">vorn ➜</span>${it.map((x, i) => `<div class="id-cell${i === 0 ? ' top' : ''}">${esc(x)}${i === 0 ? '<small>head</small>' : ''}</div>`).join('') || '<div class="id-cell empty">leer</div>'}<span class="id-end">⟵ hinten</span></div>`;
      $('#log', host).innerHTML = log.slice(-6).map(l => `<div>${l}</div>`).join('') || '<div class="dim">Noch keine Operation.</div>';
    }
    const say = (t, bad) => { const m = $('#msg', host); m.innerHTML = t; m.classList.toggle('bad', !!bad); };
    const val = () => ($('#val', host).value || '').trim() || '?';
    $('[data-add]', host).addEventListener('click', () => {
      if (S.items().length >= MAX) { say('Mehr Platz gibt es hier nicht (nur Anzeige-Grenze).', true); return; }
      const v = val(); S[NAMES.add](v); log.push(`<code>${NAMES.add}("${esc(v)}")</code>`); say(`<b>${esc(v)}</b> wird ${isS ? 'oben drauf gelegt' : 'hinten angestellt'}.`); draw();
    });
    $('[data-rem]', host).addEventListener('click', () => {
      if (S.isEmpty()) { log.push(`<code>${NAMES.rem}()</code> → Fehler`); say(`${NAMES.rem}() auf einer leeren ${isS ? 'Stapel' : 'Schlange'} ist ein Fehler. Vorher mit isEmpty() prüfen!`, true); draw(); return; }
      const v = S[NAMES.rem](); log.push(`<code>${NAMES.rem}()</code> → <b>"${esc(v)}"</b>`); say(`${NAMES.rem}() entnimmt das ${isS ? 'oberste' : 'vorderste'} Element <b>${esc(v)}</b> und gibt es zurück.`); draw();
    });
    $('[data-look]', host).addEventListener('click', () => {
      if (S.isEmpty()) { say(`${NAMES.look}() auf leerer Struktur ist ein Fehler.`, true); return; }
      const v = S[NAMES.look](); log.push(`<code>${NAMES.look}()</code> → "${esc(v)}" (bleibt liegen)`); say(`${NAMES.look}() zeigt <b>${esc(v)}</b>, entfernt es aber <b>nicht</b>.`); draw();
    });
    $('[data-emp]', host).addEventListener('click', () => { log.push(`<code>isEmpty()</code> → ${S.isEmpty() ? 'wahr' : 'falsch'}`); say(`isEmpty() liefert <b>${S.isEmpty() ? 'wahr' : 'falsch'}</b>.`); draw(); });
    $('[data-clr]', host).addEventListener('click', () => { while (!S.isEmpty()) S[NAMES.rem](); log.length = 0; say('Geleert.'); draw(); });
    // Beispiele
    function pre() {
      if (isS) {
        if (preset >= PRE_STACK.length) { say(`Fertig: Im Textfeld steht <b>${S.items().join('')}</b>.`); return; }
        const z = PRE_STACK[preset++];
        if (z === '<') { const v = S.pop(); log.push(`<code>pop()</code> → "${esc(v)}"`); say(`Rücktaste: <code>pop()</code> entfernt <b>${esc(v)}</b>. Textfeld: <b>${esc(S.items().join(''))}</b>.`); }
        else { S.push(z); log.push(`<code>push("${z}")</code>`); say(`<code>push("${z}")</code>. Textfeld: <b>${esc(S.items().join(''))}</b>.`); }
      } else {
        if (preset >= PRE_QUEUE.length) { say('Das Protokoll ist zu Ende.'); return; }
        const [t, e] = PRE_QUEUE[preset++];
        if (e === 'ein') { S.enqueue(t); log.push(`<code>enqueue("${t}")</code>`); say(`${t} fährt ein: <code>enqueue("${t}")</code>.`); }
        else if (S.head() === t) { S.dequeue(); log.push(`<code>dequeue()</code> → "${t}"`); say(`${t} fährt aus: Er stand <b>vorn</b>, <code>dequeue()</code> passt.`); }
        else { log.push(`<code>dequeue()</code> → vorn steht "${esc(S.head())}", nicht "${t}"`); say(`<b>Fehler im Protokoll:</b> ${t} soll ausfahren, aber vorn steht <b>${esc(S.head())}</b>. In einer Schlange kann nur das vorderste Element entnommen werden.`, true); }
      }
      draw();
    }
    $('[data-pre]', host).addEventListener('click', pre);
    $('[data-prereset]', host).addEventListener('click', () => { preset = 0; while (!S.isEmpty()) S[NAMES.rem](); log.length = 0; say('Beispiel zurückgesetzt.'); draw(); });
    draw(); say(isS ? 'Last In, First Out: Es kommt immer nur das oberste Element heraus.' : 'First In, First Out: Es kommt immer nur das vorderste Element heraus.');
  }
  D['i-stack'] = host => structDemo(host, 'stack');
  D['i-queue'] = host => structDemo(host, 'queue');

  window.LR_DEMOS = Object.assign(window.LR_DEMOS || {}, D);
})();
