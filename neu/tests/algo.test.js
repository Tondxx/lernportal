// Tests für neu/algo.js und content/demo-algo.js – ausführen: node Portal/neu/tests/algo.test.js
// Prüft: alle drei Darstellungen entstehen, Python-Text läuft wirklich (falls Python da ist),
// Zahlen der Demo-Aufgaben stimmen.
const assert = require('assert');
const path = require('path');
const { spawnSync } = require('child_process');
global.window = {};
const L = require('../algo.js');
require(path.join(__dirname, '..', 'content', 'demo-algo.js'));
const def = window.LR_ALGOS[0];
let n = 0;
const test = (name, fn) => { fn(); n++; console.log('ok', name); };

test('Pseudocode: Schlüsselwörter, Einrückung, Endmarken', () => {
  const t = L.pseudoText(def.algo);
  assert.strictEqual(t, [
    'FUNKTION groesste(liste)',
    '    maximum ← liste[0]',
    '    FÜR JEDES zahl IN liste',
    '        WENN zahl > maximum DANN',
    '            maximum ← zahl',
    '        ENDE WENN',
    '    ENDE FÜR',
    '    GIB ZURÜCK maximum'
  ].join('\n'));
});

test('Python-Text', () => {
  assert.strictEqual(L.pyText(def.algo), [
    'def groesste(liste):',
    '    maximum = liste[0]',
    '    for zahl in liste:',
    '        if zahl > maximum:',
    '            maximum = zahl',
    '    return maximum'
  ].join('\n'));
});

test('Sonst-Zweig, Solange-Schleife und leere Blöcke', () => {
  const A = L.A;
  const alg = { name: 'f', params: ['n'], body: [A.do('i ← 0'), A.while('i < n', null, [A.if('i > 2', null, [A.out('i')], [A.do('i ← i + 1')])]), A.ret('i')] };
  assert.ok(L.pseudoText(alg).includes('SONST') && L.pseudoText(alg).includes('ENDE SOLANGE'));
  const py = L.pyText(alg);
  assert.ok(py.includes('else:') && py.includes('while i < n:') && py.includes('print(i)'));
  assert.ok(L.pyText({ name: 'g', params: [], body: [A.if('x', null, [])] }).includes('pass'), 'leerer Block braucht pass');
});

test('Struktogramm: Kästen und Knoten-Nummern in allen Ansichten gleich', () => {
  const ns = L.nsHtml(def.algo), ps = L.pseudoHtml(def.algo), py = L.pyHtml(def.algo);
  [1, 2, 3, 4, 5].forEach(id => {
    assert.ok(ns.includes(`data-n="${id}"`), `Struktogramm ohne Knoten ${id}`);
    assert.ok(ps.includes(`data-n="${id}"`), `Pseudocode ohne Knoten ${id}`);
    assert.ok(py.includes(`data-n="${id}"`), `Python ohne Knoten ${id}`);
  });
  assert.ok(ns.includes('ns-if') && ns.includes('ns-loop') && ns.includes('für jedes zahl in liste'));
});

test('HTML wird maskiert', () => {
  const A = L.A;
  const h = L.nsHtml({ name: 'x', params: [], body: [A.do('a < b & "c"')] });
  assert.ok(h.includes('a &lt; b &amp; &quot;c&quot;'));
});

test('Zahlen der Demo-Aufgaben (Ablauf-Tabelle, Ausgaben)', () => {
  let m = def.beispiel[0]; const trace = [];
  def.beispiel.forEach(z => { if (z > m) m = z; trace.push(m); });
  assert.deepStrictEqual(trace, [4, 9, 9, 9, 12, 12]);
  const byId = Object.fromEntries(def.ablauf.checkpoints.map(c => [c.id, c.wert]));
  assert.strictEqual(byId.d2, trace[1]); assert.strictEqual(byId.d3, trace[2]);
  assert.strictEqual(byId.d5, trace[4]); assert.strictEqual(byId.d6, trace[5]);
  assert.strictEqual(def.fragen[0].optionen[def.fragen[0].richtig], '8');
  assert.strictEqual(def.fragen[1].optionen[def.fragen[1].richtig], '6-mal');
  assert.strictEqual(def.beispiel.length, 6);
});

// Python wirklich ausführen (Quelle der Wahrheit für die Ausgabe-Vorhersage)
const py = spawnSync('python', ['-I', '-c', `${L.pyText(def.algo)}\nprint(groesste([3, 8, 2, 8]), groesste([4, 9, 2, 7, 12, 5]))`], { encoding: 'utf8' });
if (py.error) console.log('SKIP Python-Lauf (python nicht gefunden)');
else test('Python-Text läuft: groesste([3,8,2,8]) = 8, groesste([4,9,2,7,12,5]) = 12', () => assert.strictEqual(py.stdout.trim(), '8 12'));

console.log(`\n${n} Tests bestanden`);
