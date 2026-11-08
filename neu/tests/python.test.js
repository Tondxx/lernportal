// Tests für content/demo-python.js (Python-Werkstatt, S8) – ausführen: node Portal/neu/tests/python.test.js
// Prüft das Format jeder Aufgabe und führt mit dem lokalen Python aus:
//   Musterlösung besteht ALLE Tests, die Vorlage (start) besteht KEINEN (sonst wäre die Aufgabe schon gelöst).
// Dieselbe Test-Logik wie in py-sandbox.html (eval des Aufrufs, Vergleich mit ==).
const assert = require('assert');
const path = require('path');
const { spawnSync } = require('child_process');
global.window = {};
require(path.join(__dirname, '..', 'content', 'demo-python.js'));
const TASKS = window.LR_PY;
let n = 0;
const test = (name, fn) => { fn(); n++; console.log('ok', name); };

test('Format: Pflichtfelder, eindeutige Ids, Tests mit Aufruf und Erwartung', () => {
  const ids = new Set();
  assert.ok(TASKS.length >= 1);
  TASKS.forEach(t => {
    ['id', 'fach', 'titel', 'kurz', 'text', 'start', 'loesung'].forEach(k => assert.ok(typeof t[k] === 'string' && t[k].trim(), `${t.id}: ${k} fehlt`));
    assert.ok(!ids.has(t.id), `Id doppelt: ${t.id}`); ids.add(t.id);
    assert.ok(Array.isArray(t.tests) && t.tests.length >= 2, `${t.id}: mindestens 2 Tests`);
    t.tests.forEach(c => { assert.ok(c.call && 'erwartet' in c, `${t.id}: Test ohne call/erwartet`); JSON.stringify(c.erwartet); });
    assert.ok(t.demo === true, `${t.id}: Demo-Inhalte als demo kennzeichnen`);
  });
});

const PY = ['python', 'python3', 'py'].find(p => { const r = spawnSync(p, ['--version']); return r.status === 0; });
function runTests(code, tests) {
  const harness = [
    'import json, sys',
    'ns = {}',
    'exec(compile(sys.stdin.read(), "loesung.py", "exec"), ns)',
    `tests = json.loads(${JSON.stringify(JSON.stringify(tests))})`,
    'out = []',
    'for t in tests:',
    '    try:',
    '        v = eval(t["call"], ns)',
    '        out.append(bool(v == t["erwartet"]))',
    '    except Exception:',
    '        out.append(False)',
    'print(json.dumps(out))'
  ].join('\n');
  const r = spawnSync(PY, ['-I', '-c', harness], { input: code, encoding: 'utf8' });
  assert.strictEqual(r.status, 0, r.stderr);
  return JSON.parse(r.stdout.trim().split('\n').pop());
}

if (!PY) console.log('übersprungen: kein Python gefunden (Lösungen nicht ausgeführt)');
else {
  test('Musterlösungen bestehen alle Tests', () => {
    TASKS.forEach(t => { const res = runTests(t.loesung, t.tests); assert.ok(res.every(Boolean), `${t.id}: Musterlösung besteht nicht alle Tests ${JSON.stringify(res)}`); });
  });
  test('Vorlagen bestehen keinen Test (Aufgabe ist nicht schon gelöst)', () => {
    TASKS.forEach(t => { const res = runTests(t.start.replace(/^print\(.*\)\s*$/m, ''), t.tests); assert.ok(res.every(x => !x), `${t.id}: Vorlage besteht schon Tests ${JSON.stringify(res)}`); });
  });
  test('Verbotene Bausteine kommen in der Musterlösung nicht vor', () => {
    TASKS.forEach(t => (t.verbot || []).forEach(v => assert.ok(!t.loesung.includes(v), `${t.id}: Musterlösung nutzt ${v}`)));
  });
}
console.log(`\n${n} Tests grün`);
