// Prüft, dass jede Formel in den Physik-Inhalten von KaTeX gerendert werden kann (kein roter Fehlertext im Portal).
// Ausführen: node Portal/neu/tests/katex.test.js
const assert = require('assert');
global.window = {};
const katex = require('../../katex.min.js');
['physik.js', 'physik-groessen.js', 'physik-treppe.js'].forEach(f => require('../content/' + f));

const MACROS = { '\\res': '\\boxed{#1}' };       // wie in app.js
const seen = new Set();
const errors = [];
let count = 0;

function check(str, where) {
  if (typeof str !== 'string' || seen.has(str)) return;
  seen.add(str);
  const re = /\$\$([\s\S]+?)\$\$|\$([^$\n]+?)\$/g;
  let m;
  while ((m = re.exec(str))) {
    const tex = (m[1] || m[2]).trim();
    count++;
    try { katex.renderToString(tex, { displayMode: !!m[1], throwOnError: true, macros: MACROS }); }
    catch (e) { errors.push(`${where}: ${e.message.slice(0, 120)}  <- ${tex.slice(0, 80)}`); }
  }
}
function walk(x, where, depth = 0) {
  if (depth > 12 || x == null) return;
  if (typeof x === 'string') return check(x, where);
  if (Array.isArray(x)) return x.forEach((v, i) => walk(v, where, depth + 1));
  if (typeof x === 'object') Object.entries(x).forEach(([k, v]) => walk(v, (x.id ? x.id : where) + '.' + k, depth + 1));
}

[['Lektionen', window.LR_LESSONS], ['Aufgaben', window.LR_TASKS], ['Probeklausuren', window.LR_PROBES],
 ['Spickzettel', window.LR_SPICK], ['Lexikon', window.LR_GROESSEN], ['Lerntreppen', window.LR_TOPICS]].forEach(([n, v]) => walk(v, n));

assert.ok(count > 500, 'zu wenige Formeln gefunden: ' + count);
assert.strictEqual(errors.length, 0, 'KaTeX-Fehler:\n' + errors.slice(0, 15).join('\n'));
console.log(`ok ${count} Formeln gerendert, keine Fehler`);
