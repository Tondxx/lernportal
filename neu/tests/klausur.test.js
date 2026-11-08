// Tests für neu/klausur.js (Countdown-Phasen) – node Portal/neu/tests/klausur.test.js
const assert = require('assert');
global.window = {};
require('../klausur.js');
const K = window.LRKlausur;
let n = 0;
const test = (name, fn) => { fn(); n++; console.log('ok', name); };

test('Countdown-Phasen nach Portalplan (T-7 … T-0, danach)', () => {
  const want = { 30: 'vor', 8: 'vor', 7: 't7', 6: 't7', 5: 't5', 4: 't5', 3: 't3', 2: 't2', 1: 't1', 0: 't0', '-1': 'nach', '-20': 'nach' };
  Object.entries(want).forEach(([d, p]) => assert.strictEqual(K.phaseOf(+d), p, `Tag ${d}`));
});

test('Phasen-Name für Heute', () => {
  assert.strictEqual(K.phaseName(3), 'T-3 · Probeklausur');
  assert.strictEqual(K.phaseName(0), 'T-0 · Klausurtag');
  assert.strictEqual(K.phaseName(12), '');
});

console.log(`\n${n} Tests bestanden`);
