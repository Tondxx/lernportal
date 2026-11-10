// Prüft das Format der Informatik-Inhalte (Lektionen, Aufgaben, Probeklausuren, Spickzettel, Notation, Python-Aufgaben)
// ausführen: node Portal/neu/tests/informatik.test.js   (Zahlen und Code: python Portal/neu/tests/informatik_check.py)
const assert = require('assert');
const path = require('path');
global.window = {};
global.document = {};
global.matchMedia = () => ({ matches: false });
require('../algo.js');
['informatik-algos.js', 'informatik.js', 'informatik-aufgaben.js', 'informatik-beispiele.js', 'informatik-demos.js', 'informatik-befehle-demos.js', 'informatik-befehle.js'].forEach(f => require(path.join(__dirname, '..', 'content', f)));
let n = 0;
const test = (name, fn) => { fn(); n++; console.log('ok', name); };
const L = (window.LR_LESSONS || []).filter(l => l.fach === 'informatik');
const T = (window.LR_TASKS || []).filter(t => t.fach === 'informatik');
const P = (window.LR_PROBES || []).filter(p => p.fach === 'informatik');
const DEMOS = window.LR_DEMOS || {};
// `$` würde die Mathe-Ersetzung auslösen (KaTeX); in Informatik-Texten nur paarweise für echte Formeln
const dollars = s => (String(s).match(/\$/g) || []).length;
const strings = o => typeof o === 'string' ? [o] : Array.isArray(o) ? [].concat(...o.map(strings)) : o && typeof o === 'object' ? [].concat(...Object.values(o).map(strings)) : [];

test('Lektionen: Pflichtfelder, eindeutige Ids/Nummern, Demo existiert', () => {
  assert.strictEqual(L.length, 14);
  // Nur Stoff aus dem Ordner: nichts zu Klassenkarten, binärer Suche, Teile und herrsche, Abitur-Operationsnamen
  const alles = JSON.stringify([window.LR_LESSONS, window.LR_TASKS, window.LR_SPICK, window.LR_ALGOS, window.LR_PY]);
  ['Klassenkarte', 'Teile und herrsche', 'binäre Suche', 'class Knoten'].forEach(w => assert.ok(!alles.includes(w), `Stoff außerhalb des Ordners: ${w}`));
  const ids = new Set(), nums = new Set();
  L.forEach(l => {
    ['id', 'title', 'short', 'idee', 'bild'].forEach(k => assert.ok(typeof l[k] === 'string' && l[k].trim(), `${l.id}: ${k} fehlt`));
    assert.ok(!ids.has(l.id) && !nums.has(l.num), `${l.id}: Id oder Nummer doppelt`); ids.add(l.id); nums.add(l.num);
    assert.ok(l.rezept && l.rezept.length >= 3, `${l.id}: Rezept (mind. 3 Schritte)`);
    assert.ok(l.beispiel && l.beispiel.q && l.beispiel.steps.length >= 3, `${l.id}: Beispiel mit mind. 3 Schritten`);
    l.beispiel.steps.forEach((s, i) => assert.ok(s.h && s.t, `${l.id}: Schritt ${i + 1} unvollständig`));
    assert.ok(l.fehler && l.fehler.length >= 3, `${l.id}: mind. 3 typische Fehler`);
    assert.ok(l.test && l.test.length >= 3 && l.test.every(q => q.q && q.a), `${l.id}: Selbsttest (mind. 3 Fragen)`);
    if (l.demo) assert.ok(DEMOS[l.demo], `${l.id}: Demo ${l.demo} nicht registriert`);
    assert.strictEqual(dollars(JSON.stringify(strings(l)).replace(/\\n/g, ' ')), 0, `${l.id}: Dollarzeichen im Text`);
  });
});

test('Aufgaben: Pflichtfelder, BE, Teil, Lektion, Zahlenfelder, Musterlösung', () => {
  assert.ok(T.length >= 26);
  const ids = new Set(), pids = new Set();
  T.forEach(t => {
    ['id', 'title', 'afb', 'ops'].forEach(k => assert.ok(typeof t[k] === 'string' && t[k].trim(), `${t.id}: ${k} fehlt`));
    assert.ok(!ids.has(t.id), `Aufgabe doppelt: ${t.id}`); ids.add(t.id);
    assert.ok(['A', 'B'].includes(t.teil), `${t.id}: teil muss A oder B sein`);
    assert.ok(L.some(l => l.id === t.lesson), `${t.id}: Lektion ${t.lesson} fehlt`);
    assert.ok(t.parts && t.parts.length >= 2, `${t.id}: mind. 2 Teilaufgaben`);
    t.parts.forEach(p => {
      assert.ok(!pids.has(p.id), `Teilaufgabe doppelt: ${p.id}`); pids.add(p.id);
      assert.ok(p.id.startsWith(t.id) && p.label && p.text && p.sol, `${p.id}: label/text/sol fehlt`);
      assert.ok(p.be >= 1 && p.be <= 8 || p.be <= 8, `${p.id}: BE unplausibel`);
      (p.nums || []).forEach(x => { assert.ok(x.label && typeof x.ans === 'number', `${p.id}: Zahlenfeld unvollständig`); });
      if (p.hints) assert.ok(p.hints.every(h => typeof h === 'string' && h.trim()), `${p.id}: leerer Tipp`);
    });
    assert.strictEqual(dollars(JSON.stringify(strings(t))), 0, `${t.id}: Dollarzeichen im Text`);
    assert.ok(/IFx/.test('IFx') && !/undefined|\[object/.test(JSON.stringify(strings(t))), `${t.id}: undefined/[object] im Text (Struktogramm oder Code fehlt?)`);
  });
  assert.ok(T.filter(t => t.teil === 'A').length >= 10 && T.filter(t => t.teil === 'B').length >= 7, 'ausgewogene Teile A/B');
});

test('Struktogramme in Aufgaben sind wirklich gerendert (Lösungen enthalten <div class="ns")', () => {
  ['IT3', 'IT12', 'IT15', 'IT16', 'IT24', 'IT26'].forEach(id => {
    const t = T.find(x => x.id === id);
    assert.ok(t.parts.some(p => p.sol.includes('class="ns"')), `${id}: Struktogramm in der Lösung fehlt`);
  });
  assert.ok(T.find(x => x.id === 'IT4').intro.includes('class="ns"'), 'IT4: Struktogramm in der Aufgabe fehlt');
});

test('Probeklausuren: Aufgaben existieren, 40 bis 60 BE, Minuten', () => {
  assert.strictEqual(P.length, 4);
  P.forEach(p => {
    const be = p.tasks.reduce((a, id) => { const t = T.find(x => x.id === id); assert.ok(t, `${p.id}: Aufgabe ${id} fehlt`); return a + t.parts.reduce((x, q) => x + q.be, 0); }, 0);
    assert.ok(be >= 30 && be <= 60, `${p.id}: ${be} BE`);
    assert.ok(p.minuten >= 60 && p.minuten <= 135, `${p.id}: Minuten`);
    assert.ok(new Set(p.tasks.map(id => T.find(x => x.id === id).lesson)).size >= 3, `${p.id}: zu wenig verschiedene Themen`);
  });
});

test('Spickzettel vorhanden und deckt alle Themenbereiche ab', () => {
  const s = window.LR_SPICK.informatik;
  assert.ok(s && s.length > 1500);
  ['Ablauf', 'Struktogramm', 'Sortieren', 'Laufzeit', 'Rekursion', 'Verkettete Liste', 'Stapel', 'Schlange'].forEach(k => assert.ok(s.includes(k), `Spickzettel ohne ${k}`));
});

test('Notation: Algorithmen rendern in allen drei Darstellungen; Fragen und Ablauf sind vollständig', () => {
  const AL = window.LR_ALGOS.filter(a => a.id.startsWith('inf-'));
  assert.strictEqual(AL.length, 4);
  AL.forEach(a => {
    const ns = window.LRAlgo.nsHtml(a.algo), py = window.LRAlgo.pyText(a.algo), ps = window.LRAlgo.pseudoText(a.algo);
    assert.ok(ns.includes('class="ns"') && py.startsWith('def ') && ps.startsWith('FUNKTION '), `${a.id}: Darstellung`);
    assert.ok(a.fragen.length >= 3 && a.fragen.every(f => f.optionen.length >= 2 && f.richtig >= 0 && f.richtig < f.optionen.length && f.erklaerung), `${a.id}: Fragen`);
    assert.ok(a.ablauf.checkpoints.length >= 3 && a.ablauf.checkpoints.every(c => c.id && c.label && typeof c.wert === 'number'), `${a.id}: Ablauf`);
  });
});

test('Demos: alle in Lektionen genannten Demos sind registriert, reine Logik stimmt', () => {
  ['i-trace', 'i-sort', 'i-laufzeit', 'i-rekursion', 'i-fib', 'i-liste', 'i-stack', 'i-queue', 'i-zeichen', 'i-dynarray'].forEach(d => assert.strictEqual(typeof DEMOS[d], 'function', `Demo ${d} fehlt`));
  const D = window.INF_DEMO_LOGIC;
  const last = a => a[a.length - 1];
  const b = last(D.sortFrames('bubble', [6, 3, 8, 2]));
  assert.deepStrictEqual([b.a.join(), b.v, b.t], ['2,3,6,8', 6, 4]);
  const s = last(D.sortFrames('selection', [7, 2, 9, 4, 1]));
  assert.deepStrictEqual([s.a.join(), s.v], ['1,2,4,7,9', 10]);
  const ins = last(D.sortFrames('insertion', [7, 2, 9, 4, 1]));
  assert.deepStrictEqual([ins.a.join(), ins.t], ['1,2,4,7,9', 7]);
  [[0, 1], [1, 1], [4, 9], [5, 15], [10, 177], [25, 242785]].forEach(([k, v]) => assert.strictEqual(D.fibCalls(k), v, `fibCalls(${k})`));
  assert.strictEqual(D.fibTree(4).nodes.length, 9);
  assert.strictEqual(D.recEvents('fak', 4).filter(e => e.t === 'return').pop().val, 24);
  assert.strictEqual(D.recEvents('sum', 4).filter(e => e.t === 'return').pop().val, 10);
  assert.strictEqual(D.traceProgs.quersumme.steps().pop().out, 14);
  assert.strictEqual(D.traceProgs.collatz.steps().pop().out, 8);
  assert.strictEqual(D.traceProgs.liste.steps().pop().out, '9 1');
  assert.strictEqual(D.arrayShifts(10, 1), 8);
});

test('Beispiele und Aufgaben je Datentyp: vollständig, Aufgaben haben Struktogramm, Python und Probelauf', () => {
  const E = window.INF_BEISPIELE;
  assert.ok(E.beispiele.length >= 28, 'zu wenig Beispiele');
  E.typen.forEach(t => {
    const mine = E.beispiele.filter(e => e.typ === t.id);
    assert.ok(mine.some(e => e.art === 'beispiel'), `${t.id}: kein Beispiel`);
    if (t.id !== 'kombi') assert.ok(mine.some(e => e.art === 'aufgabe') && mine.filter(e => e.art === 'beispiel').length >= 2, `${t.id}: Aufgabe oder zweites Beispiel fehlt`);
  });
  const ids = new Set();
  E.beispiele.forEach(e => {
    assert.ok(!ids.has(e.id), `doppelt: ${e.id}`); ids.add(e.id);
    assert.ok(e.titel && e.aufgabe && e.algo && e.pyText.startsWith('def ') && e.tests.length >= 3, `${e.id}: unvollständig`);
    assert.ok(e.probe.length === e.tests.length, `${e.id}: Probelauf`);
    if (e.art === 'beispiel') assert.ok(e.erklaerung && e.erklaerung.length >= 2, `${e.id}: Erklärung fehlt`);
    else { assert.ok(T.some(t => t.id === 'IX-' + e.id), `${e.id}: Aufgabe IX fehlt`); assert.ok((window.LR_PY || []).some(p => p.id === 'py-' + e.id), `${e.id}: Python-Aufgabe fehlt`); }
    // Struktogramm benutzt die Schreibweise des Beipackzettels, kein Python
    const ps = window.LRAlgo.pseudoText(e.algo);
    assert.ok(!/\blen\(|range\(|\.pop\(0\)|\bdel /.test(ps), `${e.id}: Python-Syntax im Pseudocode/Struktogramm`);
  });
});

test('Beipackzettel: genau die Befehle des Dokuments (Abschnitte 1 bis 4), nichts erfunden', () => {
  const B = window.INF_BEFEHLE, by = id => B.sektionen.find(s => s.id === id);
  const names = id => by(id).ops.map(o => o.n);
  assert.deepStrictEqual(names('dyn'), ['DynArray()', 'isEmpty', 'getItem', 'append', 'insertAt', 'setItem', 'delete', 'getLength']);
  assert.deepStrictEqual(names('stack'), ['Stack()', 'isEmpty', 'top', 'push', 'pop']);
  assert.deepStrictEqual(names('queue'), ['Queue()', 'isEmpty', 'head', 'enqueue', 'dequeue']);
  assert.strictEqual(by('zeichen').ops.length, 8);
  assert.strictEqual(by('rechnen').ops.length, 4);
  B.sektionen.forEach(s => s.ops.forEach(o => assert.ok(o.sig && o.was, `${s.id}/${o.n}: Signatur oder Wirkung fehlt`)));
  B.sektionen.filter(s => s.dran !== false && !['static'].includes(s.id)).forEach(s => s.ops.forEach(o => assert.ok(o.py && o.bsp, `${s.id}/${o.n}: Python oder Beispiel fehlt`)));
  // Jede dynamische Operation, die in Aufgaben als Befehl steht, gibt es auf dem Beipackzettel
  const erlaubt = new Set(['isEmpty', 'getItem', 'append', 'insertAt', 'setItem', 'delete', 'getLength', 'top', 'push', 'pop', 'head', 'enqueue', 'dequeue']);
  const alles = JSON.stringify([window.LR_TASKS.filter(t => t.fach === 'informatik'), window.LR_LESSONS]);
  const gefunden = new Set((alles.match(/\b(?:d|s|q|liste|a)\.([a-zA-Z]+)\(/g) || []).map(m => m.replace(/^[a-z]+\./, '').replace('(', '')));
  const ok = new Set(['append', 'insert', 'pop', 'reverse', 'sort', 'remove', 'index', 'count', 'copy', 'getItem', 'setItem', 'insertAt', 'delete', 'getLength', 'isEmpty', 'top', 'push', 'enqueue', 'dequeue', 'head']);
  gefunden.forEach(g => assert.ok(ok.has(g), `Unbekannter Befehl ${g}() in Aufgaben/Lektionen`));
  // Trainer: erzeugt gültige Folgen und prüft richtig
  ['stack', 'queue', 'dyn'].forEach(k => { for (let i = 0; i < 60; i++) { const t = window.INF_DEMO_LOGIC.makeTraining(k); assert.ok(t.ops.length >= 6 && t.lastAnswer !== 'null' && t.lastAnswer !== 'undefined', `${k}: ${t.ops}`); const r = window.INF_DEMO_LOGIC.checkTraining(t, t.lastAnswer, t.finalItems.join(' ')); assert.ok(r.last && r.final, `${k}: Prüfung ${JSON.stringify(t)}`); } });
});

test('Zeichenketten- und Reihungs-Logik: Beispiele des Beipackzettels', () => {
  const S = window.INF_DEMO_LOGIC.str;
  assert.deepStrictEqual([S.laenge('Hallo'), S.zeichen('Hallo', 1), S.teil('Hallo', 1, 4), S.verbinde('Ha', 'llo'), S.gleich('Hallo', 'hallo'), S.enthaelt('Hallo', 'all'), S.kleiner('Zebra', 'apfel'), S.ascii('A'), S.zeichenZu(66)], [5, 'a', 'all', 'Hallo', false, true, true, 65, 'B']);
  assert.strictEqual(S.zeichen('abc', 3), null);
  const d = window.INF_DEMO_LOGIC.Dyn();
  [8, 3, 5].forEach(x => d.append(x)); d.insertAt(1, 6); d.delete(0); d.setItem(2, 1);
  assert.deepStrictEqual([d.items(), d.getItem(1).v, d.getLength()], [[6, 3, 1], 3, 3]);
  assert.ok(d.insertAt(4, 9).err && d.delete(3).err && d.getItem(-1).err && !d.insertAt(3, 9).err);
});

console.log(`\n${n} Tests bestanden`);
