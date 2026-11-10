/* ==========================================================================
   BEIPACKZETTEL-DEMOS: Zeichenketten (i-zeichen) und dynamische Reihung (i-dynarray) zum Ausprobieren,
   dazu die reine Logik (window.INF_DEMO_LOGIC) für Stapel/Schlange/Reihung/Zeichenketten und den Befehls-Trainer.
   Befehle genau wie auf dem Beipackzettel (INF_Ergaenzende-Hinweise_GO_Neufassung_2025d.pdf, Abschnitte 1–4).
   Läuft nach content/informatik-demos.js. Test: neu/tests/informatik.test.js
   ========================================================================== */
(function () {
  const $ = (s, r) => r.querySelector(s);
  const $$ = (s, r) => Array.from(r.querySelectorAll(s));
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const L = window.INF_DEMO_LOGIC || (window.INF_DEMO_LOGIC = {});

  // ------------------------------------------------------------ Logik: Zeichenketten (Abschnitt 1)
  L.str = {
    laenge: s => s.length,
    zeichen: (s, i) => (i >= 0 && i < s.length ? s[i] : null),                // null = Laufzeitfehler
    teil: (s, a, b) => s.slice(a, b),                                          // von a bis vor b
    verbinde: (s, t) => s + t,
    gleich: (s, t) => s === t,
    enthaelt: (s, t) => s.indexOf(t) >= 0,
    kleiner: (s, t) => s < t,                                                  // lexikographisch nach Zeichencode
    ascii: z => (z.length ? z.charCodeAt(0) : null),
    zeichenZu: n => String.fromCharCode(n)
  };

  // ------------------------------------------------------------ Logik: dynamische Reihung (Abschnitt 4) mit Laufzeitfehlern
  L.Dyn = function () {
    let a = [];
    const bad = (i, hi) => !(Number.isInteger(i) && i >= 0 && i <= hi);
    return {
      items: () => a.slice(),
      isEmpty: () => a.length === 0,
      getLength: () => a.length,
      getItem: i => (bad(i, a.length - 1) ? { err: `getItem(${i}): Position ${i} gibt es nicht (gültig: 0 bis ${a.length - 1})` } : { v: a[i] }),
      append: x => { a.push(x); return { v: undefined }; },
      insertAt: (i, x) => (bad(i, a.length) ? { err: `insertAt(${i}, …): Position ${i} ist nicht erlaubt (gültig: 0 bis ${a.length}, bei ${a.length} wird hinten angefügt)` } : (a.splice(i, 0, x), { v: undefined })),
      setItem: (i, x) => (bad(i, a.length - 1) ? { err: `setItem(${i}, …): Position ${i} gibt es nicht (gültig: 0 bis ${a.length - 1})` } : (a[i] = x, { v: undefined })),
      delete: i => (bad(i, a.length - 1) ? { err: `delete(${i}): Position ${i} gibt es nicht (gültig: 0 bis ${a.length - 1})` } : (a.splice(i, 1), { v: undefined }))
    };
  };

  // ------------------------------------------------------------ Befehls-Trainer: zufällige gültige Befehlsfolge, Frage nach Rückgabe und Endzustand
  L.makeTraining = function (kind, rnd) {
    rnd = rnd || Math.random;
    const pick = arr => arr[Math.floor(rnd() * arr.length)];
    const ABC = 'ABCDEFGH'.split(''), NUM = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const ops = []; let lastRes = null, lastName = '';
    const stack = L.Stack(), queue = L.Queue(), dyn = L.Dyn();
    const N = 6 + Math.floor(rnd() * 2);
    const q = (kind === 'stack' || kind === 'queue') ? (kind === 'stack' ? stack : queue) : null;
    const nm = kind === 'stack' ? { add: 'push', rem: 'pop', look: 'top' } : { add: 'enqueue', rem: 'dequeue', look: 'head' };
    for (let k = 0; k < N; k++) {
      const last = k === N - 1;
      if (kind === 'dyn') {
        const len = dyn.getLength();
        let r = rnd();
        let op;
        if (last) op = len > 0 && rnd() < .6 ? 'getItem' : 'getLength';
        else if (len === 0 || r < .4) op = 'append';
        else if (r < .6) op = 'insertAt';
        else if (r < .75) op = 'setItem';
        else if (r < .88) op = 'delete';
        else op = len > 0 ? 'getItem' : 'append';
        const x = pick(NUM);
        if (op === 'append') { dyn.append(x); ops.push(`append(${x})`); lastRes = null; }
        else if (op === 'insertAt') { const i = Math.floor(rnd() * (len + 1)); dyn.insertAt(i, x); ops.push(`insertAt(${i}, ${x})`); }
        else if (op === 'setItem') { const i = Math.floor(rnd() * len); dyn.setItem(i, x); ops.push(`setItem(${i}, ${x})`); }
        else if (op === 'delete') { const i = Math.floor(rnd() * len); dyn.delete(i); ops.push(`delete(${i})`); }
        else if (op === 'getItem') { const i = Math.floor(rnd() * len); lastRes = String(dyn.getItem(i).v); ops.push(`getItem(${i})`); lastName = 'getItem'; }
        else { lastRes = String(dyn.getLength()); ops.push('getLength()'); lastName = 'getLength'; }
      } else {
        const len = q.items().length, r = rnd();
        let op;
        if (last) op = len === 0 ? 'isEmpty' : pick(['rem', 'look', 'rem', 'look', 'isEmpty']);
        else if (len === 0 || r < .55) op = 'add';
        else if (r < .8) op = 'rem';
        else if (r < .92) op = 'look';
        else op = 'isEmpty';
        if (op === 'add') { const x = pick(ABC); q[nm.add](x); ops.push(`${nm.add}(${x})`); }
        else if (op === 'rem') { lastRes = q[nm.rem](); ops.push(`${nm.rem}()`); lastName = nm.rem; }
        else if (op === 'look') { lastRes = q[nm.look](); ops.push(`${nm.look}()`); lastName = nm.look; }
        else { lastRes = q.isEmpty() ? 'wahr' : 'falsch'; ops.push('isEmpty()'); lastName = 'isEmpty'; }
      }
    }
    const fin = kind === 'dyn' ? dyn.items() : q.items();
    return { kind, ops, lastOp: ops[ops.length - 1], lastAnswer: String(lastRes), finalItems: fin.map(String), lastName };
  };
  const norm = s => String(s).trim().toLowerCase().replace(/[„“"']/g, '').replace(/true|ja/, 'wahr').replace(/false|nein/, 'falsch');
  L.checkTraining = function (t, ansLast, ansFinal) {
    const items = String(ansFinal).split(/[\s,;]+/).filter(Boolean).map(x => x.toLowerCase()).join(',');
    return { last: norm(ansLast) === norm(t.lastAnswer), final: items === t.finalItems.map(x => x.toLowerCase()).join(',') };
  };

  // ======================================================================
  // Demo: Zeichenketten (alle acht Operationen live)
  // ======================================================================
  const D = {};
  D['i-zeichen'] = function (host) {
    host.innerHTML = `<div class="id-wrap">
      <div class="id-form"><label>Zeichenkette s <input class="input" id="zs" value="Hallo Welt" maxlength="24"></label><label>Zeichenkette t <input class="input" id="zt" value="all" maxlength="24"></label>
        <label>Position i <input class="input" id="zi" type="number" value="1" min="-3" max="30" style="min-width:90px;width:90px"></label><label>Position a <input class="input" id="za" type="number" value="1" min="0" max="30" style="min-width:90px;width:90px"></label><label>Position b <input class="input" id="zb" type="number" value="4" min="0" max="30" style="min-width:90px;width:90px"></label></div>
      <div class="id-chars" id="chars" aria-label="Zeichen von s mit Positionen"></div>
      <div class="ic-tabw"><table class="ic-tab id-ops"><thead><tr><th>Operation</th><th>Python</th><th>Ergebnis</th></tr></thead><tbody id="rows"></tbody></table></div>
      <p class="pd-msg" id="msg">Ändere die Eingaben: Alle Ergebnisse rechnen sich sofort neu. Grau markierte Zeichen bei „Teilzeichenkette“ zeigen den Bereich a bis vor b.</p></div>`;
    const v = id => $('#' + id, host).value;
    function draw() {
      const s = v('zs'), t = v('zt'), i = parseInt(v('zi'), 10), a = parseInt(v('za'), 10), b = parseInt(v('zb'), 10), S = L.str;
      const q = x => `<code>"${esc(x)}"</code>`;
      $('#chars', host).innerHTML = s.split('').map((c, k) => `<span class="id-ch${k === i ? ' on' : ''}${k >= a && k < b ? ' rg' : ''}"><b>${c === ' ' ? '␣' : esc(c)}</b><small>${k}</small></span>`).join('') || '<span class="dim">leer</span>';
      const z = S.zeichen(s, i);
      const rows = [
        ['Länge', 'len(s)', S.laenge(s)],
        [`Zeichen an Position ${i}`, 's[i]', z === null ? '<span class="bad">Laufzeitfehler: Position gibt es nicht (gültig 0 bis ' + (s.length - 1) + ')</span>' : q(z)],
        [`Teilzeichenkette von ${a} bis vor ${b}`, 's[a:b]', q(S.teil(s, a, b))],
        ['Verbinden s + t', 's + t', q(S.verbinde(s, t))],
        ['Gleichheit s = t', 's == t', S.gleich(s, t) ? 'wahr' : 'falsch'],
        ['t kommt in s vor?', 't in s', S.enthaelt(s, t) ? 'wahr' : 'falsch'],
        ['s lexikographisch vor t?', 's < t', S.kleiner(s, t) ? 'wahr' : 'falsch'],
        [`ASCII-Wert des 1. Zeichens von s`, 'ord(s[0])', s.length ? S.ascii(s) : '–'],
        [`Zeichen zum ASCII-Wert 65 + ${Math.max(0, i)}`, 'chr(65 + i)', q(S.zeichenZu(65 + Math.max(0, i)))]
      ];
      $('#rows', host).innerHTML = rows.map(r => `<tr><td>${r[0]}</td><td><code>${esc(r[1])}</code></td><td><b>${r[2]}</b></td></tr>`).join('');
    }
    $$('input', host).forEach(x => x.addEventListener('input', draw));
    draw();
  };

  // ======================================================================
  // Demo: dynamische Reihung (alle Befehle, mit Laufzeitfehler-Meldungen)
  // ======================================================================
  D['i-dynarray'] = function (host) {
    const d = L.Dyn(), log = [];
    host.innerHTML = `<div class="id-wrap"><div class="id-ds" id="ds" aria-live="polite"></div>
      <div class="id-form"><label>Position index <input class="input" id="ix" type="number" value="0" min="-2" max="20" style="min-width:90px;width:90px"></label><label>Inhalt <input class="input" id="vx" value="7" maxlength="6" style="min-width:90px;width:90px"></label></div>
      <div class="pd-btns"><button class="btn small primary" type="button" data-op="append">append(inhalt)</button><button class="btn small" type="button" data-op="insertAt">insertAt(index, inhalt)</button><button class="btn small" type="button" data-op="setItem">setItem(index, inhalt)</button><button class="btn small" type="button" data-op="delete">delete(index)</button></div>
      <div class="pd-btns"><button class="btn small" type="button" data-op="getItem">getItem(index)</button><button class="btn small" type="button" data-op="getLength">getLength()</button><button class="btn small" type="button" data-op="isEmpty">isEmpty()</button><button class="btn small" type="button" data-clr>DynArray() neu</button></div>
      <div class="id-log" id="log" aria-live="polite"></div><p class="pd-msg" id="msg"></p></div>`;
    const say = (t, bad) => { const m = $('#msg', host); m.innerHTML = t; m.classList.toggle('bad', !!bad); };
    function draw() {
      const it = d.items();
      $('#ds', host).innerHTML = `<div class="id-row">${it.map((x, i) => `<div class="id-cell"><i class="id-ix">${i}</i>${esc(x)}</div>`).join('') || '<div class="id-cell empty">leer</div>'}</div>`;
      $('#log', host).innerHTML = log.slice(-6).map(l => `<div>${l}</div>`).join('') || '<div class="dim">Noch keine Operation.</div>';
    }
    $$('[data-op]', host).forEach(b => b.addEventListener('click', () => {
      const op = b.dataset.op, i = parseInt($('#ix', host).value, 10), x = ($('#vx', host).value || '').trim() || '?';
      let r, txt;
      if (op === 'append') { r = d.append(x); txt = `append(${esc(x)})`; }
      else if (op === 'insertAt') { r = d.insertAt(i, x); txt = `insertAt(${i}, ${esc(x)})`; }
      else if (op === 'setItem') { r = d.setItem(i, x); txt = `setItem(${i}, ${esc(x)})`; }
      else if (op === 'delete') { r = d.delete(i); txt = `delete(${i})`; }
      else if (op === 'getItem') { r = d.getItem(i); txt = `getItem(${i})`; }
      else if (op === 'getLength') { r = { v: d.getLength() }; txt = 'getLength()'; }
      else { r = { v: d.isEmpty() ? 'wahr' : 'falsch' }; txt = 'isEmpty()'; }
      if (r.err) { log.push(`<code>${txt}</code> → <b class="bad">Laufzeitfehler</b>`); say(`<b>Laufzeitfehler:</b> ${esc(r.err)}. In der Klausur musst du so etwas <b>vorher durch eine Abfrage ausschließen</b> (z. B. mit getLength()).`, true); }
      else { log.push(`<code>${txt}</code>${r.v !== undefined ? ` → <b>${esc(r.v)}</b>` : ''}`); say(op === 'insertAt' ? 'Das Element an dieser Position und alle folgenden sind nach hinten gerückt.' : op === 'delete' ? 'Alle folgenden Elemente sind um eins nach vorn gerückt.' : op === 'getItem' ? 'getItem liest nur, es ändert nichts.' : 'Ausgeführt.'); }
      draw();
    }));
    $('[data-clr]', host).addEventListener('click', () => { d.items().forEach(() => d.delete(0)); log.length = 0; say('Neue leere Reihung.'); draw(); });
    ['append', 'append', 'append'].forEach((_, k) => d.append([4, 9, 7][k])); log.push('<code>DynArray()</code> und drei <code>append</code>');
    draw(); say('Probiere auch eine Position, die es nicht gibt (z. B. 5): Du siehst, welchen Laufzeitfehler die Klausur verhindern will.');
  };

  window.LR_DEMOS = Object.assign(window.LR_DEMOS || {}, D);
})();
