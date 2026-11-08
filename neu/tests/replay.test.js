// Tests für neu/replay.js (Zerlegen der Rechnung in Zeilen) – node Portal/neu/tests/replay.test.js
const assert = require('assert');
global.window = {};
require('../replay.js');
const R = window.LRReplay;
let n = 0;
const test = (name, fn) => { fn(); n++; console.log('ok', name); };

test('aligned-Block wird zeilenweise gezeigt', () => {
  const st = { rechnung: String.raw`$$\begin{aligned} 3x^2-12x+9 &= 0 \\ x^2-4x+3 &= 0 \\ \res{x_1=1} \quad &\res{x_2=3} \end{aligned}$$` };
  assert.strictEqual(R._unitsOf(st), 3);
  const p1 = R._partial(st, 1);
  assert.ok(p1.includes('3x^2-12x+9') && !p1.includes('x^2-4x+3 &'), p1);
  assert.ok(R._partial(st, 3).includes('x_2=3'));
});

test('array mit Spaltenangabe und Zeilenabstand', () => {
  const st = { rechnung: String.raw`$$\begin{array}{l} f'(x)=3x^2 \\[6pt] f''(x)=6x \end{array}$$` };
  assert.strictEqual(R._unitsOf(st), 2);
  assert.ok(R._partial(st, 1).startsWith(String.raw`$$\begin{array}{l} f'(x)=3x^2`));
});

test('Text + Formel + Text: jede Einheit einzeln', () => {
  const st = { rechnung: String.raw`$$g_0(x)=x\,(x-3)^2$$ Nullstellen sind $x=0$ und $x=3$.` };
  assert.strictEqual(R._unitsOf(st), 2);
  assert.ok(!R._partial(st, 1).includes('Nullstellen'));
  assert.ok(R._partial(st, 2).includes('Nullstellen'));
});

test('Reiner Text (Antwortsatz) ist eine Einheit', () => {
  assert.strictEqual(R._unitsOf({ rechnung: 'Der Graph hat den Hochpunkt $H(1|5)$.' }), 1);
});

test('Alle Demo-Rechnungen lassen sich zerlegen', () => {
  require('../content/demo.js');
  let steps = 0;
  (window.LR_TOPICS || []).forEach(t => t.stufen.forEach(s => (s.task ? s.task.parts : []).forEach(p => p.schritte.forEach(x => {
    const u = R._unitsOf(x); assert.ok(u >= 1);
    const full = R._partial(x, u);
    const d = s => (s.match(/\$/g) || []).length;
    assert.strictEqual(d(full) % 2, 0, 'gerade Anzahl $ in ' + x.name);
    steps++;
  }))));
  assert.ok(steps > 10);
});

console.log(`\n${n} Tests bestanden`);
