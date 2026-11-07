// Prüfskript für Lerninhalte (Portalplan 6: „Kein Task ohne schritte und checkpoints“).
// Ausführen: node Portal/neu/tests/tasks.test.js  – lädt alle Dateien in neu/content/.
const fs = require('fs');
const path = require('path');
global.window = {};
require('../algo.js'); // Inhalte mit Notation brauchen den Baukasten
const dir = path.join(__dirname, '..', 'content');
fs.readdirSync(dir).filter(f => f.endsWith('.js')).forEach(f => require(path.join(dir, f)));
const TOPICS = window.LR_TOPICS || [];

const errors = [];
const err = (where, msg) => errors.push(`${where}: ${msg}`);
const ids = new Set();
const uniq = (where, id) => { if (!id) err(where, 'id fehlt'); else if (ids.has(id)) err(where, `id doppelt: ${id}`); else ids.add(id); };
const TYPES = ['sehen', 'beispiel', 'luecken', 'geruest', 'abi'];
const mcqOk = (where, q) => {
  if (!q || !q.frage || !Array.isArray(q.optionen) || q.optionen.length < 2) return err(where, 'Frage/Optionen fehlen');
  if (!(q.richtig >= 0 && q.richtig < q.optionen.length)) err(where, 'richtig zeigt auf keine Option');
};
const dollarsBalanced = (where, s) => { if (typeof s === 'string' && (s.replace(/\\\$/g, '').match(/\$/g) || []).length % 2) err(where, 'ungerade Anzahl $ (KaTeX)'); };

TOPICS.forEach(t => {
  const W = `Thema ${t.id}`;
  uniq(W, t.id);
  ['fach', 'titel', 'kurz', 'quelle'].forEach(k => { if (!t[k]) err(W, `${k} fehlt`); });
  if (!Array.isArray(t.stufen) || t.stufen.length !== 6) err(W, 'braucht genau 6 Stufen (0–5)');
  (t.check || []).forEach((q, i) => mcqOk(`${W} Eingangs-Check ${i + 1}`, q));
  if (!t.check || t.check.length !== 3) err(W, 'Eingangs-Check braucht 3 Fragen');
  (t.stufen || []).forEach((st, n) => {
    const S = `${W} Stufe ${n}`;
    if (!TYPES.includes(st.typ)) return err(S, `unbekannter typ ${st.typ}`);
    if (st.typ === 'sehen') { if (!st.demo) err(S, 'demo fehlt'); mcqOk(S, st.frage); return; }
    const task = st.task;
    if (!task) return err(S, 'task fehlt');
    uniq(S, task.id);
    if (!['A', 'B'].includes(task.teil)) err(S, 'teil muss A oder B sein');
    if (!task.parts || !task.parts.length) return err(S, 'parts fehlen');
    task.parts.forEach(p => {
      const P = `${S} ${p.id}`;
      uniq(P, p.id);
      ['operator', 'afb', 'frage'].forEach(k => { if (!p[k]) err(P, `${k} fehlt`); });
      if (!(p.be > 0)) err(P, 'be fehlt');
      if (!p.checkpoints || !p.checkpoints.length) err(P, 'keine checkpoints');
      if (!p.schritte || !p.schritte.length) return err(P, 'keine schritte');
      (p.checkpoints || []).forEach(c => { if (!c.id || !c.label || typeof c.wert !== 'number') err(P, `checkpoint unvollständig: ${JSON.stringify(c)}`); });
      const sum = p.schritte.reduce((a, x) => a + (x.punkte || 0), 0);
      if (sum !== p.be) err(P, `Summe der Schritt-Punkte ${sum} ≠ ${p.be} BE`);
      p.schritte.forEach((x, i) => {
        const X = `${P} Schritt ${i + 1}`;
        if (!x.name || !x.rechnung) err(X, 'name/rechnung fehlt');
        dollarsBalanced(X, x.rechnung); dollarsBalanced(X, x.warum); dollarsBalanced(X, x.name);
        if (x.vorher) mcqOk(`${X} vorher`, x.vorher);
        if (x.luecke && (!x.luecke.felder || !x.luecke.felder.every(f => f.id && typeof f.wert === 'number'))) err(X, 'Lücke ohne Felder/Werte');
        if (x.cas && (!x.cas.eingabe || !x.cas.ausgabe)) err(X, 'CAS-Zeile unvollständig');
        if (task.teil === 'A' && x.cas) err(X, 'Teil A ist ohne Hilfsmittel: keine CAS-Zeile');
      });
      if (st.typ === 'beispiel' && !p.schritte.some(x => x.vorher)) err(P, 'Stufe 1 braucht Vorhersage-Fragen (vorher)');
      if (st.typ === 'luecken' && !p.schritte.some(x => x.luecke)) err(P, 'Stufe 2 braucht Lücken');
      if (st.typ === 'geruest' && p.checkpoints.some(c => typeof c.schritt !== 'number')) err(P, 'Gerüst-Checkpoints brauchen schritt');
    });
  });
});

// ---------------------------------------------------------------- Besondere Übungen (S3)
const FT = ['Rechenfehler', 'Ansatz fehlte', 'Schreibweise', 'Verständnis fehlt', 'CAS-Bedienung'];
TOPICS.forEach(t => {
  const x = t.extras; if (!x) return;
  const W = `Thema ${t.id} extras`;
  if (x.blurting) {
    const b = x.blurting, k = b.kernpunkte || [];
    if (k.length < 6 || k.length > 12) err(W + ' blurting', `6–12 Kernpunkte erwartet, ${k.length} gefunden`);
    k.forEach((s, i) => { if (!s) err(W + ' blurting', `Kernpunkt ${i + 1} leer`); dollarsBalanced(W + ' blurting', s); });
    if (!b.aufforderung) err(W + ' blurting', 'aufforderung fehlt');
  }
  (x.fehler || []).forEach(f => {
    const F = `${W} fehler ${f.id}`;
    uniq(F, f.id);
    if (!f.schritte || f.schritte.length < 3) return err(F, 'mind. 3 Zeilen');
    if (!(f.fehler >= 0 && f.fehler < f.schritte.length)) err(F, 'fehler zeigt auf keine Zeile');
    ['frage', 'was', 'richtig', 'typ', 'folge'].forEach(k => { if (!f[k]) err(F, `${k} fehlt`); dollarsBalanced(F, f[k]); });
    if (!FT.includes(f.typ)) err(F, `typ muss einer von ${FT.join(', ')} sein`);
    f.schritte.forEach((s, i) => {
      if (!s.name || !s.rechnung) err(F, `Zeile ${i + 1}: name/rechnung fehlt`);
      if (i !== f.fehler && !s.ok) err(F, `Zeile ${i + 1}: braucht ok-Text (wird beim Antippen gezeigt)`);
      dollarsBalanced(F, s.rechnung);
    });
  });
  if (x.erlaeutern) {
    const e = x.erlaeutern, E = W + ' erlaeutern';
    if (!e.zeilen || e.zeilen.length < 3) err(E, 'mind. 3 Zeilen');
    (e.zeilen || []).forEach((z, i) => { if (!z.rechnung) err(E, `Zeile ${i + 1} ohne rechnung`); if (z.frage) mcqOk(`${E} Zeile ${i + 1}`, z.frage); dollarsBalanced(E, z.rechnung); });
    mcqOk(E + ' aufgabe', e.aufgabe);
    const sum = (e.kernpunkte || []).reduce((a, k) => a + (k.punkte || 0), 0);
    if (!e.kernpunkte || !e.kernpunkte.length) err(E, 'kernpunkte fehlen');
    else if (sum !== e.be) err(E, `Kernpunkte-Summe ${sum} ≠ ${e.be} BE`);
    (e.kernpunkte || []).forEach(k => { if (!k.name || !k.text) err(E, 'Kernpunkt ohne name/text'); dollarsBalanced(E, k.text); });
    ['intro', 'operator', 'aufschreiben'].forEach(k => { if (!e[k]) err(E, `${k} fehlt`); });
  }
  if (x.deuten) {
    const d = x.deuten, D = W + ' deuten';
    if (!d.bedingungen || !d.bedingungen.length) err(D, 'bedingungen fehlen');
    (d.bedingungen || []).forEach((b, i) => { if (!b.term) err(D, `Bedingung ${i + 1} ohne term`); mcqOk(`${D} ${i + 1} bild`, b.bild); mcqOk(`${D} ${i + 1} satz`, b.satz); dollarsBalanced(D, b.term); });
    if (!d.demo || !(window.LR_FN || {})[d.demo.f]) err(D, 'demo.f ist nicht in LR_FN definiert');
  }
});

if (errors.length) { console.error(errors.join('\n')); console.error(`\n${errors.length} Fehler`); process.exit(1); }
console.log(`${TOPICS.length} Thema/Themen geprüft, Format in Ordnung`);
