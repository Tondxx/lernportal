/* ==========================================================================
   ALGORITHMEN-DARSTELLUNG – Bauschritt S3 (Portalplan 14, Tondas Info-Notation)
   Ein Algorithmus wird EINMAL als Baum beschrieben. Daraus entstehen automatisch
   drei gleichwertige Darstellungen: Struktogramm, Pseudocode, Python.
   Tippen/Klicken auf eine Zeile oder einen Kasten markiert dieselbe Stelle in allen drei.

   Bausteine (A.*):  do(pseudo, python)  ·  out(pseudo, python)  ·  ret(pseudo, python)
                     if(bedPseudo, bedPython, ja[], nein[])  ·  each(var, sammlung, körper[])
                     while(bedPseudo, bedPython, körper[])
   Algorithmus:      { name, params:[…], body:[…] }
   UNSICHER: Schreibweise des Pseudocodes (Schlüsselwörter) ist noch nicht mit Tondas Lehrkraft abgeglichen.
   Läuft auch in Node (Test: neu/tests/algo.test.js).
   ========================================================================== */
(function (root) {
  'use strict';

  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  // ------------------------------------------------------------ Bausteine
  const A = {
    do: (p, y) => ({ t: 'do', p, y: y == null ? p : y }),
    out: (p, y) => ({ t: 'out', p, y: y == null ? p : y }),
    ret: (p, y) => ({ t: 'ret', p, y: y == null ? p : y }),
    if: (cp, cy, ja, nein) => ({ t: 'if', cp, cy: cy == null ? cp : cy, ja: ja || [], nein: nein || [] }),
    each: (v, coll, body) => ({ t: 'each', v, coll, body: body || [] }),
    while: (cp, cy, body) => ({ t: 'while', cp, cy: cy == null ? cp : cy, body: body || [] })
  };

  // Jeder Knoten bekommt eine laufende Nummer (0 = Kopf), damit die drei Ansichten zusammenhängen.
  function number(algo) {
    const a = JSON.parse(JSON.stringify(algo));
    let n = 1;
    const walk = list => list.forEach(x => { x.id = n++; if (x.ja) walk(x.ja); if (x.nein) walk(x.nein); if (x.body) walk(x.body); });
    walk(a.body);
    return a;
  }

  // ------------------------------------------------------------ Pseudocode
  // Zeile = { d: Einrückung, id, parts: [[Text, istSchlüsselwort]] }
  function pseudoLines(algo) {
    const a = number(algo), out = [];
    const L = (d, id, ...parts) => out.push({ d, id, parts });
    L(0, 0, ['FUNKTION', 1], [` ${a.name}(${a.params.join(', ')})`, 0]);
    const walk = (list, d) => list.forEach(x => {
      if (x.t === 'do') L(d, x.id, [x.p, 0]);
      else if (x.t === 'out') L(d, x.id, ['AUSGABE', 1], [' ' + x.p, 0]);
      else if (x.t === 'ret') L(d, x.id, ['GIB ZURÜCK', 1], [' ' + x.p, 0]);
      else if (x.t === 'if') {
        L(d, x.id, ['WENN', 1], [' ' + x.cp + ' ', 0], ['DANN', 1]);
        walk(x.ja, d + 1);
        if (x.nein.length) { L(d, x.id, ['SONST', 1]); walk(x.nein, d + 1); }
        L(d, x.id, ['ENDE WENN', 1]);
      } else if (x.t === 'each') {
        L(d, x.id, ['FÜR JEDES', 1], [` ${x.v} `, 0], ['IN', 1], [' ' + x.coll, 0]);
        walk(x.body, d + 1);
        L(d, x.id, ['ENDE FÜR', 1]);
      } else if (x.t === 'while') {
        L(d, x.id, ['SOLANGE', 1], [' ' + x.cp, 0]);
        walk(x.body, d + 1);
        L(d, x.id, ['ENDE SOLANGE', 1]);
      }
    });
    walk(a.body, 1);
    return out;
  }
  const pseudoText = algo => pseudoLines(algo).map(l => '    '.repeat(l.d) + l.parts.map(p => p[0]).join('')).join('\n');

  // ------------------------------------------------------------ Python
  function pyLines(algo) {
    const a = number(algo), out = [];
    const L = (d, id, s) => out.push({ d, id, s });
    L(0, 0, `def ${a.name}(${a.params.join(', ')}):`);
    const walk = (list, d) => {
      if (!list.length) { L(d, null, 'pass'); return; }
      list.forEach(x => {
        if (x.t === 'do') L(d, x.id, x.y);
        else if (x.t === 'out') L(d, x.id, `print(${x.y})`);
        else if (x.t === 'ret') L(d, x.id, `return ${x.y}`);
        else if (x.t === 'if') {
          L(d, x.id, `if ${x.cy}:`); walk(x.ja, d + 1);
          if (x.nein.length) { L(d, x.id, 'else:'); walk(x.nein, d + 1); }
        } else if (x.t === 'each') { L(d, x.id, `for ${x.v} in ${x.coll}:`); walk(x.body, d + 1); }
        else if (x.t === 'while') { L(d, x.id, `while ${x.cy}:`); walk(x.body, d + 1); }
      });
    };
    walk(a.body, 1);
    return out;
  }
  const pyText = algo => pyLines(algo).map(l => '    '.repeat(l.d) + l.s).join('\n');

  // ------------------------------------------------------------ HTML: Pseudocode / Python
  const PYKW = new Set(['def', 'for', 'in', 'if', 'else', 'while', 'return', 'print', 'pass', 'and', 'or', 'not']);
  const pyColor = s => esc(s).replace(/[A-Za-z_]+/g, w => PYKW.has(w) ? `<b class="kw">${w}</b>` : w);

  function pseudoHtml(algo) {
    return pseudoLines(algo).map((l, i) => `<div class="cl" data-n="${l.id}" style="--d:${l.d}"><span class="ln">${i + 1}</span><span class="ct">${l.parts.map(p => p[1] ? `<b class="kw">${esc(p[0])}</b>` : esc(p[0])).join('')}</span></div>`).join('');
  }
  function pyHtml(algo) {
    return pyLines(algo).map((l, i) => `<div class="cl" data-n="${l.id == null ? '' : l.id}" style="--d:${l.d}"><span class="ln">${i + 1}</span><span class="ct">${pyColor(l.s)}</span></div>`).join('');
  }

  // ------------------------------------------------------------ HTML: Struktogramm (Nassi-Shneiderman)
  function nsHtml(algo) {
    const a = number(algo);
    const list = nodes => nodes.map(x => {
      if (x.t === 'do') return `<div class="ns-n ns-do" data-n="${x.id}">${esc(x.p)}</div>`;
      if (x.t === 'out') return `<div class="ns-n ns-do" data-n="${x.id}">Ausgabe: ${esc(x.p)}</div>`;
      if (x.t === 'ret') return `<div class="ns-n ns-do" data-n="${x.id}">Rückgabe: ${esc(x.p)}</div>`;
      if (x.t === 'if') return `<div class="ns-n ns-if" data-n="${x.id}">
          <div class="ns-if-h"><svg class="ns-tri" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><path d="M0 0 L50 100 L100 0" vector-effect="non-scaling-stroke"/></svg><span class="ns-cond">${esc(x.cp)}</span><span class="ns-ja">ja</span><span class="ns-nein">nein</span></div>
          <div class="ns-cols"><div class="ns-col">${list(x.ja)}</div><div class="ns-col">${list(x.nein)}</div></div></div>`;
      const head = x.t === 'each' ? `für jedes ${esc(x.v)} in ${esc(x.coll)}` : `solange ${esc(x.cp)}`;
      return `<div class="ns-n ns-loop" data-n="${x.id}"><div class="ns-loop-h">${head}</div><div class="ns-loop-b">${list(x.body)}</div></div>`;
    }).join('');
    return `<div class="ns" role="img" aria-label="Struktogramm ${esc(a.name)}"><div class="ns-title" data-n="0">${esc(a.name)}(${esc(a.params.join(', '))})</div>${list(a.body)}</div>`;
  }

  // ------------------------------------------------------------ Einbauen (Tabs + gemeinsame Markierung)
  function mount(host, algo, opts = {}) {
    const views = [['ns', 'Struktogramm', nsHtml(algo)], ['ps', 'Pseudocode', `<div class="code">${pseudoHtml(algo)}</div>`], ['py', 'Python', `<div class="code py">${pyHtml(algo)}</div>`]];
    host.classList.add('algo');
    host.innerHTML = `<div class="algo-bar"><div class="tabs3" role="tablist" aria-label="Darstellung">${views.map(([k, l], i) => `<button type="button" role="tab" data-v="${k}" aria-selected="${i === 0}">${l}</button>`).join('')}</div>
        <button type="button" class="chip algo-all" data-all aria-pressed="false" title="Alle drei Darstellungen nebeneinander">Nebeneinander</button></div>
      <div class="algo-views">${views.map(([k, l, h], i) => `<section class="algo-v${i === 0 ? ' on' : ''}" data-k="${k}"><span class="kicker algo-lab">${l}</span>${h}</section>`).join('')}</div>
      <p class="row-sub algo-hint">Tippe auf eine Zeile oder einen Kasten: Dieselbe Stelle wird in allen drei Darstellungen markiert.</p>`;
    const tabs = [...host.querySelectorAll('.tabs3 button')], secs = [...host.querySelectorAll('.algo-v')];
    let tab = 'ns';
    const show = k => { tab = k; tabs.forEach(b => b.setAttribute('aria-selected', String(b.dataset.v === k))); secs.forEach(s => s.classList.toggle('on', s.dataset.k === k)); };
    tabs.forEach(b => b.addEventListener('click', () => { host.classList.remove('all'); host.querySelector('[data-all]').setAttribute('aria-pressed', 'false'); show(b.dataset.v); }));
    host.querySelector('[data-all]').addEventListener('click', e => {
      const on = !host.classList.contains('all');
      host.classList.toggle('all', on); e.currentTarget.setAttribute('aria-pressed', String(on));
      if (on) tabs.forEach(b => b.setAttribute('aria-selected', 'false')); else show(tab); // im Nebeneinander-Modus ist kein Tab aktiv
    });
    let cur = null;
    host.addEventListener('click', e => {
      const el = e.target.closest('[data-n]'); if (!el || el.dataset.n === '') return;
      const id = el.dataset.n;
      host.querySelectorAll('.hl').forEach(x => x.classList.remove('hl'));
      if (cur === id) { cur = null; return; }
      cur = id;
      host.querySelectorAll(`[data-n="${id}"]`).forEach(x => x.classList.add('hl'));
    });
    if (opts.onReady) opts.onReady(host);
  }

  const API = { A, number, pseudoLines, pseudoText, pyLines, pyText, nsHtml, pseudoHtml, pyHtml, mount };
  root.LRAlgo = API;
  if (typeof module !== 'undefined' && module.exports) module.exports = API;
})(typeof window !== 'undefined' ? window : globalThis);
