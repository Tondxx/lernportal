// Projekttagebuch (projekt.js): Modell aus Vorbelegung + Ereignissen, Export Word/Markdown.
// Start: node neu/tests/projekt.test.js
const fs = require('fs'), vm = require('vm'), path = require('path'), assert = require('assert');
const base = path.join(__dirname, '..');
globalThis.window = globalThis;
globalThis.addEventListener = () => {};
globalThis.document = { addEventListener() {} };
for (const f of ['content/projekt-zange.js', 'projekt.js']) vm.runInThisContext(fs.readFileSync(path.join(base, f), 'utf8'), { filename: f });

let evs = [];
LRProjekt.init({ R: {}, view: { addEventListener() {} }, LR: { events: () => evs }, esc: s => String(s) });
const P = LR_PROJEKTE.zange, T = LRProjekt._t;
let n = 0;
const test = (name, fn) => { fn(); n++; console.log('ok', name); };

test('Vorbelegung ohne Ereignisse', () => {
  const M = T.build(P);
  assert.strictEqual(M.entries.length, 2);
  assert.strictEqual(M.ziel.length, 9);
  assert.strictEqual(M.plan[M.plan.length - 1].datum, '2026-12-11');
  assert.ok(M.F.beschreibung.includes('Zange'));
});

test('neuester Wert gewinnt, Löschen, neue Einträge sortiert', () => {
  evs = [
    { type: 'pj', ref: 'zange', t: 1, data: { k: 'f.thema', v: 'alt' } },
    { type: 'pj', ref: 'zange', t: 3, data: { k: 'f.thema', v: 'neu' } },
    { type: 'pj', ref: 'zange', t: 2, data: { k: 'f.thema', v: 'mitte' } },
    { type: 'pj', ref: 'anderes', t: 4, data: { k: 'f.thema', v: 'fremd' } },
    { type: 'pj', ref: 'zange', t: 5, data: { k: 'bsp.b9', v: { del: true } } },
    { type: 'pj', ref: 'zange', t: 6, data: { k: 'e.xa', v: { datum: '2026-11-20', art: 'DS', created: 1 } } },
    { type: 'pj', ref: 'zange', t: 7, data: { k: 'e.xa.geschafft', v: 'Stapel' } },
    { type: 'pj', ref: 'zange', t: 8, data: { k: 'e.e1', v: { datum: '2026-11-14', art: 'HA', del: true } } },
    { type: 'learn', ref: 'IF1', t: 9 }
  ];
  const M = T.build(P);
  assert.strictEqual(M.F.thema, 'neu');
  assert.strictEqual(M.bsp.length, 8);
  assert.deepStrictEqual(M.entries.map(e => e.id), ['e2', 'xa']);
  assert.strictEqual(M.entries[1].geschafft, 'Stapel');
  assert.strictEqual(M.entries[1].ziel, '');
});

test('Word-Datei ist ein gültiges ZIP mit allen Teilen', () => {
  const M = T.build(P);
  const B = T.docBlocks(P, M, {});
  const z = Buffer.from(T.docx(B, 'Projekttagebuch Zange'));
  assert.strictEqual(z.readUInt32LE(0), 0x04034b50);
  const end = z.length - 22;
  assert.strictEqual(z.readUInt32LE(end), 0x06054b50);
  const count = z.readUInt16LE(end + 10);
  let p = z.readUInt32LE(end + 16);
  const names = [];
  for (let i = 0; i < count; i++) {
    const nl = z.readUInt16LE(p + 28), off = z.readUInt32LE(p + 42), size = z.readUInt32LE(p + 24), crc = z.readUInt32LE(p + 16);
    const name = z.slice(p + 46, p + 46 + nl).toString('utf8'); names.push(name);
    const lnl = z.readUInt16LE(off + 26), data = z.slice(off + 30 + lnl, off + 30 + lnl + size);
    assert.strictEqual(T.crc32(data), crc, 'CRC ' + name);
    if (name === 'word/document.xml') { const s = data.toString('utf8'); assert.ok(s.includes('Projekttagebuch: Zange')); assert.ok(!/<(?!\/?(w|wp|a|pic|\?xml)[:\s>])/.test(s.replace(/<\/?w:[^>]*>/g, ''))); }
    p += 46 + nl;
  }
  ['[Content_Types].xml', '_rels/.rels', 'word/document.xml', 'word/styles.xml', 'word/footer1.xml', 'word/_rels/document.xml.rels'].forEach(f => assert.ok(names.includes(f), f));
});

test('Markdown enthält alle Teile, Sonderzeichen in Tabellen geschützt', () => {
  evs = [{ type: 'pj', ref: 'zange', t: 1, data: { k: 'e.e2.probleme', v: 'a | b\nc' } }];
  const md = T.docMd(T.docBlocks(P, T.build(P), {}));
  ['## 1 Projektstart', '## 4 Protokolle', '## 6 Reflexion', '[ ] Z1'].forEach(s => assert.ok(md.includes(s), s));
  assert.ok(md.includes('a \\| b<br>c'));
});

console.log(`${n} Tests bestanden`);
