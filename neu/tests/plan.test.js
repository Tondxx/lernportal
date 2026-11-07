// Tests für neu/plan.js – ausführen: node Portal/neu/tests/plan.test.js
const assert = require('assert');
const P = require('../plan.js');
let n = 0;
const test = (name, fn) => { fn(); n++; console.log('ok', name); };
const D = (s) => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };
const ev = (data) => ({ type: 'plan', data });
const L = (ref, min = 10, extra = {}) => Object.assign({ typ: 'lektion', ref, min, fach: 'mathe' }, extra);

test('Geteilter Plan ist für jedes Profil gleich sichtbar, eigene Einträge kommen dazu', () => {
  const plans = [{ id: 'p1', fach: 'mathe', klausur: 'k-19', items: [L('L1'), L('L2')] }];
  const a = P.effective(plans, []);
  const b = P.effective(plans, [ev({ op: 'add', item: L('L3', 10, { klausur: 'k-19' }) })]);
  assert.deepStrictEqual(a.items.map(i => i.ref), ['L1', 'L2']);
  assert.deepStrictEqual(b.items.map(i => i.ref), ['L1', 'L2', 'L3']);
  assert.strictEqual(a.items[0].klausur, 'k-19', 'Klausur kommt vom Plan');
  assert.strictEqual(b.items[2].src, 'mine');
});

test('Entfernen, wieder hinzufügen, „Als Nächstes“', () => {
  const plans = [{ id: 'p1', fach: 'mathe', klausur: 'k-19', items: [L('L1'), L('L2'), L('L3')] }];
  let e = P.effective(plans, [ev({ op: 'remove', key: 'lektion:L2' })]);
  assert.deepStrictEqual(e.items.map(i => i.ref), ['L1', 'L3']);
  e = P.effective(plans, [ev({ op: 'remove', key: 'lektion:L2' }), ev({ op: 'add', item: L('L2') })]);
  assert.deepStrictEqual(e.items.map(i => i.ref).sort(), ['L1', 'L2', 'L3']);
  e = P.effective(plans, [ev({ op: 'next', key: 'lektion:L3' })]);
  assert.deepStrictEqual(e.items.map(i => i.ref), ['L3', 'L1', 'L2']);
  e = P.effective(plans, [ev({ op: 'done', key: 'lektion:L1' }), ev({ op: 'done', key: 'lektion:L2' }), ev({ op: 'undone', key: 'lektion:L2' })]);
  assert.deepStrictEqual([...e.manualDone], ['lektion:L1']);
});

test('Schlüssel unterscheidet Stufe und Art der Übung', () => {
  assert.strictEqual(P.key({ typ: 'stufe', ref: 't', n: 3 }), 'stufe:t:3');
  assert.strictEqual(P.key({ typ: 'extra', ref: 't', kind: 'blurting' }), 'extra:t::blurting');
  assert.strictEqual(P.key({ typ: 'lektion', ref: 'L1' }), 'lektion:L1');
});

test('Zeitplan: Tagesbudget, Sonntag frei, erledigte fallen raus', () => {
  const items = ['L1', 'L2', 'L3', 'L4'].map(r => L(r, 20, { klausur: 'k' }));
  const s = P.schedule(items, { today: D('2026-11-07'), perDay: 40, klausurDates: { k: D('2026-12-01') }, isDone: it => it.ref === 'L1' });
  // Samstag 07.11.: L2+L3 (40), Sonntag 08.11. frei, Montag 09.11.: L4
  assert.deepStrictEqual(s.days.map(d => [d.key, d.items.map(i => i.ref).join(',')]), [['2026-11-07', 'L2,L3'], ['2026-11-09', 'L4']]);
  assert.strictEqual(s.late.length, 0);
});

test('Zeitplan: lange Einheit bekommt einen leeren Tag, Frist wird gemeldet', () => {
  const items = [L('A', 90, { klausur: 'k' }), L('B', 10, { klausur: 'k' })];
  const s = P.schedule(items, { today: D('2026-11-02'), perDay: 30, klausurDates: { k: D('2026-11-03') }, isDone: () => false });
  assert.strictEqual(s.days[0].items[0].ref, 'A');
  assert.ok(s.late.some(i => i.ref === 'B'), 'B liegt nach der Frist');
  assert.strictEqual(s.need.k.days, 1);
  assert.strictEqual(s.need.k.perDay, 100);
});

test('Zeitplan: früheste Klausur zuerst, feste Plätze (T-3) bleiben', () => {
  const items = [
    L('X', 30, { klausur: 'spaet' }), L('Y', 30, { klausur: 'frueh' }),
    { typ: 'probe', ref: 'P1', min: 90, fach: 'mathe', klausur: 'frueh', pin: 'T-3' }
  ];
  const s = P.schedule(items, { today: D('2026-11-02'), perDay: 30, klausurDates: { frueh: D('2026-11-10'), spaet: D('2026-12-20') }, isDone: () => false });
  const day = r => s.days.find(d => d.items.some(i => i.ref === r)).key;
  assert.strictEqual(day('P1'), '2026-11-07', 'T-3 vor dem 10.11.');
  assert.ok(day('Y') <= day('X'));
});

test('Zeitplan ohne Klausur-Frist läuft ohne Warnung', () => {
  const s = P.schedule([L('L1', 10)], { today: D('2026-11-03'), perDay: 30, klausurDates: {}, isDone: () => false });
  assert.strictEqual(s.days.length, 1);
  assert.deepStrictEqual(s.need, {});
});

test('Probeklausur: gemischt aus mehreren Themen, Teil A vor Teil B, Ziel ~60 BE', () => {
  const pool = [
    { id: 'a1', teil: 'A', lesson: 'L2', be: 6 }, { id: 'a2', teil: 'A', lesson: 'L5', be: 5 }, { id: 'a3', teil: 'A', lesson: 'L9', be: 7 },
    { id: 'a4', teil: 'A', lesson: 'L1', be: 6 }, { id: 'b1', teil: 'B', lesson: 'L6', be: 20 }, { id: 'b2', teil: 'B', lesson: 'L9', be: 16 }
  ];
  const p = P.makeProbe(pool, { lessons: ['L1', 'L2', 'L5', 'L6', 'L9'], be: 60, seed: 7 });
  assert.ok(p.be >= 40 && p.be <= 72, `BE ${p.be}`);
  const teile = p.tasks.map(id => pool.find(t => t.id === id).teil).join('');
  assert.ok(/^A+B+$/.test(teile), 'erst alle A, dann B: ' + teile);
  assert.strictEqual(p.minuten, Math.round(p.be * 1.5 / 5) * 5);
  const lessons = new Set(p.tasks.map(id => pool.find(t => t.id === id).lesson));
  assert.ok(lessons.size >= 3, 'mindestens 3 verschiedene Themen');
  assert.deepStrictEqual(P.makeProbe(pool, { lessons: ['L1', 'L2', 'L5', 'L6', 'L9'], be: 60, seed: 7 }), p, 'gleicher Seed, gleiche Klausur');
});

test('Probeklausur nur aus gewählten Themen; ohne Treffer null', () => {
  const pool = [{ id: 'a1', teil: 'A', lesson: 'L2', be: 6 }, { id: 'b1', teil: 'B', lesson: 'L9', be: 16 }];
  const p = P.makeProbe(pool, { lessons: ['L2'], be: 60, seed: 1 });
  assert.deepStrictEqual(p.tasks, ['a1']);
  assert.strictEqual(p.knapp, true, 'zu wenig Aufgaben wird gemeldet');
  assert.strictEqual(P.makeProbe(pool, { lessons: ['L99'], be: 60 }), null);
});

console.log(`\n${n} Tests bestanden`);
