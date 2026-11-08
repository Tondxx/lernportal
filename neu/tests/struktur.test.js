// Prüft Ordner-Baum und geteilte Pläne gegen die echten Inhalte – ausführen: node Portal/neu/tests/struktur.test.js
// Regeln aus Portalplan 8a: höchstens 6 Kacheln pro Ebene, jede Lektion genau in einem Ordner,
// alle Verweise existieren, Klausur-Ids stammen aus calendar.js, Pläne verweisen nur auf Vorhandenes.
const assert = require('assert');
const fs = require('fs');
const path = require('path');
global.window = {};
require('../../mathe_trainer_content.js');
require('../algo.js');
require('../plan.js');
const cal = fs.readFileSync(path.join(__dirname, '..', '..', 'calendar.js'), 'utf8');
const KLAUSUREN = new Function(cal.replace(/^const /gm, 'var ') + '; return TONDA_KLAUSUREN;')();
['demo.js', 'demo-algo.js', 'physik.js', 'physik-treppe.js', 'ordner.js', 'plaene.js'].forEach(f => require(path.join(__dirname, '..', 'content', f)));

const D = window.MT_DATA, O = window.LR_ORDNER, PLANS = window.LR_PLANS, TOPICS = window.LR_TOPICS, ALGOS = window.LR_ALGOS;
const ALL_LESSONS = D.LESSONS.concat(window.LR_LESSONS || []);
const ALL_TASKS = [].concat(D.EXAM1.tasks, D.EXTRA, window.LR_TASKS || []);
const fachOf = x => x.fach || 'mathe';
const lessons = new Set(ALL_LESSONS.map(l => l.id));
const tasks = new Set(ALL_TASKS.map(t => t.id));
const probes = new Set([D.EXAM1.id].concat((window.LR_PROBES || []).map(p => p.id)));
const FACH_NAME = { mathe: 'Mathematik', physik: 'Physik', informatik: 'Informatik' };
const klausurIds = new Set(KLAUSUREN.map(k => k.id));
let n = 0;
const test = (name, fn) => { fn(); n++; console.log('ok', name); };

const walk = (list, f, depth = 1) => list.forEach(x => { f(x, depth); if (x.kinder) walk(x.kinder, f, depth + 1); });

test('Ordner: eindeutige Ids, höchstens 6 Kacheln pro Ebene, höchstens 3 Ebenen', () => {
  const ids = new Set();
  Object.entries(O).forEach(([fach, list]) => {
    assert.ok(list.length <= 6, `${fach}: ${list.length} Kacheln auf der obersten Ebene`);
    walk(list, (x, d) => {
      assert.ok(x.id && x.titel && x.typ, `Knoten ohne id/titel/typ in ${fach}`);
      assert.ok(!ids.has(x.id), `id doppelt: ${x.id}`); ids.add(x.id);
      assert.ok(d <= 2, `${x.id}: mehr als 2 Ordner-Ebenen unter dem Fach`);
      if (x.kinder) assert.ok(x.kinder.length <= 6, `${x.id}: ${x.kinder.length} Unterordner`);
      assert.ok(['ordner', 'probes', 'seite', 'alt'].includes(x.typ), `${x.id}: unbekannter typ ${x.typ}`);
    });
  });
});

test('Themen verweisen auf Vorhandenes; Lektionen liegen genau in einem Ordner', () => {
  const seen = {};
  ['mathe', 'physik'].forEach(f => walk(O[f], x => (x.themen || []).forEach(it => {
    if (it.typ === 'lektion') { assert.ok(lessons.has(it.ref), `Lektion ${it.ref} fehlt`); seen[it.ref] = (seen[it.ref] || 0) + 1; }
    else if (it.typ === 'thema') assert.ok(TOPICS.some(t => t.id === it.ref), `Thema ${it.ref} fehlt`);
    else assert.fail(`unbekannter Thema-Typ ${it.typ}`);
    if (it.typ === 'lektion') assert.strictEqual(fachOf(ALL_LESSONS.find(l => l.id === it.ref)), f, `Lektion ${it.ref} liegt im falschen Fach`);
    assert.ok((x.themen || []).length <= 6 || x.kinder, `${x.id}: mehr als 6 Themen ohne Unterordner`);
  })));
  ALL_LESSONS.forEach(l => assert.strictEqual(seen[l.id], 1, `Lektion ${l.id} liegt ${seen[l.id] || 0}-mal in Ordnern`));
  walk(O.informatik, x => (x.themen || []).forEach(it => { if (it.typ === 'algo') assert.ok(ALGOS.some(a => a.id === it.ref), `Algo ${it.ref} fehlt`); }));
});

test('Klausur-Vorbelegung nennt nur echte Klausuren des richtigen Fachs', () => {
  Object.keys(O).forEach(f => walk(O[f], x => (x.klausuren || []).forEach(k => {
    assert.ok(klausurIds.has(k), `${x.id}: Klausur ${k} gibt es im Kalender nicht`);
    assert.strictEqual(KLAUSUREN.find(c => c.id === k).subject, FACH_NAME[f], `${x.id}: Klausur ${k} gehört zu einem anderen Fach`);
  })));
});

test('Jede Aufgabe gehört über ihre Lektion zu einem Ordner', () => {
  const inOrdner = new Set();
  ['mathe', 'physik'].forEach(f => walk(O[f], x => (x.themen || []).forEach(it => it.typ === 'lektion' && inOrdner.add(it.ref))));
  ALL_TASKS.forEach(t => assert.ok(inOrdner.has(t.lesson), `Aufgabe ${t.id} (Lektion ${t.lesson}) liegt in keinem Ordner`));
});

test('Geteilte Pläne: Verweise existieren, Klausur im Kalender, Fach passt, keine doppelten Einträge', () => {
  PLANS.forEach(p => {
    assert.ok(p.id && p.fach && p.klausur && p.titel && p.items.length, `Plan ${p.id} unvollständig`);
    assert.ok(klausurIds.has(p.klausur), `Plan ${p.id}: Klausur ${p.klausur} unbekannt`);
    const keys = new Set();
    p.items.forEach(it => {
      if (it.typ === 'lektion') assert.ok(lessons.has(it.ref), `Lektion ${it.ref}`);
      else if (it.typ === 'aufgabe') assert.ok(tasks.has(it.ref), `Aufgabe ${it.ref}`);
      else if (it.typ === 'probe') assert.ok(probes.has(it.ref), `Probeklausur ${it.ref}`);
      else if (it.typ === 'thema') assert.ok(TOPICS.some(t => t.id === it.ref), `Thema ${it.ref}`);
      else assert.fail(`Plan ${p.id}: Typ ${it.typ} nicht erlaubt`);
      const k = window.LRPlan.key(it);
      assert.ok(!keys.has(k), `Plan ${p.id}: ${k} doppelt`); keys.add(k);
    });
  });
});

test('Mathe-Plan deckt alle klausurrelevanten Lektionen und deren Aufgaben ab', () => {
  const p = PLANS.find(x => x.id === 'plan-mathe-k19');
  const have = new Set(p.items.map(i => window.LRPlan.key(i)));
  const relevant = O.mathe.filter(o => (o.klausuren || []).includes(p.klausur) && o.typ === 'ordner');
  relevant.forEach(o => (o.themen || []).forEach(it => assert.ok(have.has('lektion:' + it.ref), `Lektion ${it.ref} fehlt im Plan`)));
  [].concat(D.EXAM1.tasks, D.EXTRA).forEach(t => assert.ok(have.has('aufgabe:' + t.id), `Aufgabe ${t.id} fehlt im Plan`));
});

test('Physik-Plan deckt alle Lektionen ab, Probeklausur verweist auf echte Physik-Aufgaben', () => {
  const p = PLANS.find(x => x.id === 'plan-physik-k10');
  const have = new Set(p.items.map(i => window.LRPlan.key(i)));
  (window.LR_LESSONS || []).filter(l => l.fach === 'physik').forEach(l => assert.ok(have.has('lektion:' + l.id), `Lektion ${l.id} fehlt im Plan`));
  p.items.filter(i => i.typ === 'aufgabe').forEach(i => assert.strictEqual(fachOf(ALL_TASKS.find(t => t.id === i.ref)), 'physik', `${i.ref} ist keine Physik-Aufgabe`));
  (window.LR_PROBES || []).forEach(pr => pr.tasks.forEach(id => assert.ok(tasks.has(id), `Probeklausur ${pr.id}: Aufgabe ${id} fehlt`)));
});

console.log(`\n${n} Tests bestanden`);
