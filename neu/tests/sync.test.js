// Tests für neu/sync.js (Code, Schlüsselableitung, Verschlüsselung) – node Portal/neu/tests/sync.test.js
const assert = require('assert');
global.window = { crypto: globalThis.crypto };
require('../sync.js');
const T = window.LRSync._t;
let n = 0;
const test = async (name, fn) => { await fn(); n++; console.log('ok', name); };

(async () => {
  await test('Code: 40 Zeichen Base32, Rückweg exakt, Verwechsler toleriert', async () => {
    const c = T.newCode();
    assert.strictEqual(c.length, 40);
    assert.ok(/^[0-9A-HJKMNP-TV-Z]{40}$/.test(c), c);
    const b = T.b32dec(c);
    assert.strictEqual(b.length, 25);
    assert.strictEqual(T.b32enc(b), c);
    assert.ok(T.b32dec(T.fmtCode(c).toLowerCase()), 'mit Bindestrichen und klein');
    assert.strictEqual(T.b32dec(c.slice(0, 39)), null, 'zu kurz');
    assert.deepStrictEqual(T.b32dec('O'.repeat(40)), T.b32dec('0'.repeat(40)), 'O = 0');
  });

  await test('Ableitung ist stabil, verschiedene Codes → verschiedene Postfächer', async () => {
    const c = T.newCode();
    const a = await T.derive(c), b = await T.derive(c), d = await T.derive(T.newCode());
    assert.strictEqual(a.box, b.box); assert.strictEqual(a.token, b.token);
    assert.notStrictEqual(a.box, d.box);
    assert.ok(/^[0-9a-f]{32}$/.test(a.box));
    assert.ok(/^[A-Za-z0-9_-]{43}$/.test(a.token), 'passt zum Server-Format');
    assert.strictEqual(a.key.extractable, false, 'Datenschlüssel nicht exportierbar');
  });

  await test('Ver- und Entschlüsseln; falscher Schlüssel oder fremdes Postfach scheitern', async () => {
    const k = await T.derive(T.newCode()), other = await T.derive(T.newCode());
    const ev = { id: 'abcd1234', t: 1, type: 'learn', ref: 'L1' };
    const c = await T.enc(k.key, k.box, ev);
    assert.ok(!c.includes('learn') && !c.includes('L1'), 'kein Klartext');
    assert.deepStrictEqual(await T.dec(k.key, k.box, c), ev);
    await assert.rejects(T.dec(other.key, k.box, c), 'anderer Schlüssel');
    await assert.rejects(T.dec(k.key, other.box, c), 'Paket aus anderem Postfach');
    const c2 = await T.enc(k.key, k.box, ev);
    assert.notStrictEqual(c, c2, 'zufälliger IV');
    const bad = c.slice(0, -4) + (c.slice(-4) === 'AAAA' ? 'BBBB' : 'AAAA');
    await assert.rejects(T.dec(k.key, k.box, bad), 'verändertes Paket wird erkannt');
  });

  await test('Zustand zusammenführen: Lektionen vereinigt, Punkte = Maximum, gerätelokales bleibt', async () => {
    const local = { done: { L1: true }, scores: { a: 2, b: 5 }, session: { mode: 'm3' }, plan: { perDay: 30 } };
    const remote = { done: { L2: true }, scores: { a: 4, b: 1, c: 3 }, session: { mode: 'f90' }, plan: { perDay: 60, x: 1 }, probes: [{ id: 'p1' }] };
    const s = T.mergeState(local, remote, false);
    assert.deepStrictEqual(s.done, { L1: true, L2: true });
    assert.deepStrictEqual(s.scores, { a: 4, b: 5, c: 3 });
    assert.deepStrictEqual(s.session, { mode: 'm3' });
    assert.strictEqual(s.plan.perDay, 30); assert.strictEqual(s.plan.x, 1);
    assert.deepStrictEqual(s.probes, [{ id: 'p1' }]);
  });

  console.log(`\n${n} Tests bestanden`);
})().catch(e => { console.error(e); process.exit(1); });
