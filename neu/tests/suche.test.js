// Tests für neu/suche.js (S8, Portalplan 4.2) – ausführen: node Portal/neu/tests/suche.test.js
// Prüft Normalisierung (Umlaute, LaTeX), Rangfolge und die Bauliste-Vorgabe „findet Themen in < 100 ms“
// mit einem Index aus den echten Inhalten (Lektionen, Aufgaben, Demo-Themen), künstlich verzehnfacht.
const assert = require('assert');
const path = require('path');
global.window = {};
const S = require('../suche.js') || window.LRSuche; // läuft ohne DOM: nur Logik
const L = window.LRSuche || S;
require('../../mathe_trainer_content.js');
require('../algo.js');
['demo.js', 'demo-algo.js', 'demo-python.js'].forEach(f => require(path.join(__dirname, '..', 'content', f)));
let n = 0;
const test = (name, fn) => { fn(); n++; console.log('ok', name); };

test('Normalisieren: Umlaute in beiden Schreibweisen, ß, LaTeX und HTML raus', () => {
  assert.strictEqual(L.norm('Größte Zahl'), L.norm('Groesste zahl'));
  assert.strictEqual(L.norm('Fläche'), L.norm('Flaeche'));
  assert.strictEqual(L.norm('Schließen'), 'schliessen'); // ß → ss
  assert.ok(!/[\\$<]/.test(L.norm('<b>$\\int_0^1 f(x)\\,dx$</b>')));
  assert.strictEqual(L.norm('  '), '');
});

const D = window.MT_DATA;
const base = [].concat(
  D.LESSONS.map(l => ({ title: l.title, sub: 'Mathe · Lektion ' + l.num, kind: 'Lektion', href: '#/lektion/' + l.id, text: [l.short, l.idee].concat(l.rezept || []).join(' '), boost: 1 })),
  [].concat(D.EXAM1.tasks, D.EXTRA).map(t => ({ title: t.title, sub: 'Aufgabe', kind: 'Aufgabe', href: '#/aufgabe/' + t.id, text: [t.intro].concat(t.parts.map(p => p.q)).join(' ') })),
  window.LR_TOPICS.map(t => ({ title: t.titel, sub: t.kurz, kind: 'Thema', href: '#/thema/' + t.id })),
  window.LR_ALGOS.map(a => ({ title: a.titel, sub: a.kurz, kind: 'Notation', href: '#/algo/' + a.id })),
  [{ title: 'Integral & Bestand', sub: 'Mathe › Ordner', kind: 'Ordner', href: '#/ordner/m-integral', boost: 1.5 },
   { title: 'Fehlerjagd', sub: 'Deine Fehler', kind: 'Seite', href: '#/fehlerjagd', alias: 'fehlerliste', boost: 2 }]
);
const index = L.build(base);

test('Treffer: Titel vor Volltext, Ordner wird gefunden, alle Wörter müssen passen', () => {
  const r = L.find(index, 'integral');
  assert.ok(r.length >= 2, 'mindestens Ordner + Lektionen');
  assert.ok(/integral/i.test(L.norm(r[0].title)), 'erster Treffer hat „Integral“ im Titel: ' + r[0].title);
  assert.ok(r.some(e => e.href === '#/ordner/m-integral'), 'Ordner gefunden');
  assert.strictEqual(L.find(index, 'integral zzzqqq').length, 0, 'unbekanntes Zusatzwort → nichts');
  assert.strictEqual(L.find(index, '').length, 0);
});

test('Umlaute und Kleinschreibung egal, Alias wird durchsucht', () => {
  assert.ok(L.find(index, 'groesste').some(e => e.href === '#/algo/demo-algo-max'));
  assert.ok(L.find(index, 'GRÖSSTE').some(e => e.href === '#/algo/demo-algo-max'));
  assert.strictEqual(L.find(index, 'fehlerliste')[0].href, '#/fehlerjagd');
});

test('Jede Lektion ist über ihren Titel auffindbar (an erster Stelle oder unter den ersten 3)', () => {
  D.LESSONS.forEach(l => {
    const r = L.find(index, l.title).slice(0, 3).map(e => e.href);
    assert.ok(r.includes('#/lektion/' + l.id), `${l.id} „${l.title}“ nicht unter den ersten 3`);
  });
});

test('Tempo: Suche in < 100 ms (Index ×10, 20 Anfragen, langsamste zählt)', () => {
  const big = L.build([].concat(...Array.from({ length: 10 }, (_, k) => base.map(e => Object.assign({}, e, { href: e.href + '#' + k })))));
  const qs = ['integral', 'stamm', 'ortskurve', 'extrem', 'flaeche', 'hauptsatz', 'schar', 'bestand', 'tangente', 'probe', 'x', 'ab', 'grosste zahl', 'fehler', 'steckbrief', 'parameter', 'ableitung', 'wendepunkt', 'rate', 'f x'];
  let worst = 0;
  qs.forEach(q => { const t0 = process.hrtime.bigint(); L.find(big, q); const ms = Number(process.hrtime.bigint() - t0) / 1e6; worst = Math.max(worst, ms); });
  console.log(`   ${big.length} Einträge, langsamste Suche ${worst.toFixed(2)} ms`);
  assert.ok(worst < 100, `zu langsam: ${worst} ms`);
});

console.log(`\n${n} Tests grün`);
