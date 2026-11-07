// Tests für neu/core.js – ausführen: node Portal/neu/tests/core.test.js
const assert = require('assert');
require('../core.js');
const LR = globalThis.LR;
const U = LR._util;
U.setStore(U.mem());

let n = 0;
const test = (name, fn) => { fn(); n++; console.log('ok', name); };
const at = (k, h = 12) => { const [y, m, d] = k.split('-').map(Number); return new Date(y, m - 1, d, h).getTime(); };
const ev = (k, type = 'learn') => ({ id: Math.random().toString(36).slice(2), t: at(k), type });

test('Profile getrennt', () => {
  const a = LR.createProfile('Tonda', ['mathe']);
  LR.log('learn', 'L1');
  const b = LR.createProfile('Freund', []);
  assert.strictEqual(LR.activeId(), b.id);
  assert.strictEqual(LR.events().length, 0, 'Freund sieht keine Ereignisse von Tonda');
  LR.log('recall', 'x');
  LR.switchTo(a.id);
  assert.strictEqual(LR.events().length, 1);
  assert.strictEqual(LR.events()[0].type, 'learn');
});

test('Name wird gekürzt, leer -> Ich', () => {
  const p = LR.createProfile('   ', []);
  assert.strictEqual(p.name, 'Ich');
  assert.ok(LR.createProfile('x'.repeat(80)).name.length <= 24);
});

test('Streak zählt Folgetage, heute offen bricht nicht', () => {
  const now = at('2026-11-07');
  const s = LR.stats([ev('2026-11-04'), ev('2026-11-05'), ev('2026-11-06')], now);
  assert.strictEqual(s.streak, 3);
  const s2 = LR.stats([ev('2026-11-05'), ev('2026-11-06'), ev('2026-11-07')], now);
  assert.strictEqual(s2.streak, 3);
});

test('Schutz: 1 fehlender Tag pro Woche hält den Streak', () => {
  // Mo 02.11. – So 08.11.; Di fehlt
  const now = at('2026-11-05');
  const s = LR.stats([ev('2026-11-02'), ev('2026-11-04'), ev('2026-11-05')], now);
  assert.strictEqual(s.streak, 3, 'Freeze-Tag zählt nicht mit, reißt aber nicht');
  assert.strictEqual(s.freezeWeek, 'genutzt');
  assert.ok(s.freezeDays.has('2026-11-03'));
});

test('Zweiter fehlender Tag in derselben Woche reißt', () => {
  const now = at('2026-11-06');
  const s = LR.stats([ev('2026-11-02'), ev('2026-11-05'), ev('2026-11-06')], now);
  assert.strictEqual(s.streak, 2);
  assert.strictEqual(s.best, 2);
});

test('Comeback nach Pause, Bestwert bleibt', () => {
  const now = at('2026-11-20');
  const s = LR.stats([ev('2026-11-02'), ev('2026-11-03'), ev('2026-11-04'), ev('2026-11-05')], now);
  assert.strictEqual(s.streak, 0);
  assert.strictEqual(s.best, 4);
  assert.strictEqual(s.comeback, true);
  assert.strictEqual(s.trainingDays, 4);
});

test('Ziel-Ring: Abruf braucht 3 Karten, Neu 1, Fehler 1', () => {
  const k = '2026-11-07', now = at(k, 20);
  const s = LR.stats([ev(k, 'recall'), ev(k, 'recall'), ev(k, 'practice'), ev(k, 'fix')], now);
  assert.deepStrictEqual(s.ring.seg, [false, true, true]);
  const s2 = LR.stats([ev(k, 'recall'), ev(k, 'recall'), ev(k, 'recall')], now);
  assert.deepStrictEqual(s2.ring.seg, [true, false, false]);
});

test('Merge: Vereinigung nach id, keine Doppelten', () => {
  const p = LR.createProfile('Sync', []);
  const e1 = LR.log('learn', 'a');
  const added = LR.merge(p.id, [e1, { id: 'fremd1', t: Date.now() - 1000, type: 'recall' }]);
  assert.strictEqual(added, 1);
  assert.strictEqual(LR.events(p.id).length, 2);
});

test('Profil löschen entfernt seine Daten', () => {
  const p = LR.createProfile('Weg', []);
  LR.log('learn', 'z');
  LR.deleteProfile(p.id);
  assert.strictEqual(LR.events(p.id).length, 0);
  assert.ok(!LR.profiles().some(x => x.id === p.id));
});

test('Kalender: 4 Wochen ab Montag', () => {
  const now = at('2026-11-07');
  const c = LR.calendar(LR.stats([ev('2026-11-07')], now), 4);
  assert.strictEqual(c.length, 28);
  assert.strictEqual(c[0].k, '2026-10-12'); // Montag 3 Wochen vor der Woche vom 02.11.
  assert.ok(c.find(x => x.today).lvl === 1);
  assert.ok(c[c.length - 1].future);
});

console.log(`\n${n} Tests bestanden`);
