/* ==========================================================================
   SUCHE – Bauschritt S8 (Portalplan 4.2, 8a „Suche findet Ordner und Themen“)
   Strg+K / ⌘K / „/“ oder Lupe: findet Fächer, Ordner, Themen, Lektionen,
   Aufgaben, Stufen, Übungen, Probeklausuren, Klausuren und Seiten.
   Reine Logik (norm, build, find) ohne DOM → Tests: node neu/tests/suche.test.js
   Ziel: Treffer in < 100 ms (Index wird einmal gebaut, Suche ist ein Durchlauf).
   ========================================================================== */
(function (root) {
  'use strict';

  // ------------------------------------------------------------ Text normalisieren
  // Kleinbuchstaben, Umlaute/ß wie „ae/oe/ue/ss“ (beide Schreibweisen finden sich), LaTeX/HTML raus
  function norm(s) {
    return String(s == null ? '' : s)
      .replace(/<[^>]*>/g, ' ')
      .replace(/\\(text|mathrm|operatorname|mathbf)\{([^}]*)\}/g, ' $2 ')
      .replace(/\\[a-zA-Z]+/g, ' ')
      .replace(/&[a-z]+;/g, ' ')
      .toLowerCase()
      .replace(/ß/g, 'ss')
      .normalize('NFD').replace(/[̀-ͯ]/g, '')
      .replace(/ae/g, 'a').replace(/oe/g, 'o').replace(/ue/g, 'u')
      .replace(/[^a-z0-9]+/g, ' ')
      .trim();
  }

  // Ein Eintrag: { title, sub, kind, href, fach?, text?, boost?, pre? }
  function prep(e) {
    e._t = ' ' + norm(e.title);
    e._s = ' ' + norm([e.sub, e.kind, e.alias].filter(Boolean).join(' '));
    e._x = e.text ? ' ' + norm(e.text) : '';
    return e;
  }
  function build(entries) {
    const seen = new Set(), out = [];
    entries.forEach(e => {
      if (!e || !e.title || !e.href) return;
      const k = e.href + '|' + e.title;
      if (seen.has(k)) return;
      seen.add(k); out.push(prep(e));
    });
    return out;
  }

  // Jedes Suchwort muss irgendwo vorkommen. Titel zählt am meisten, Wortanfang mehr als Wortmitte.
  function scoreTok(e, t) {
    const w = ' ' + t;
    if (e._t.includes(w)) return 10;
    if (e._t.includes(t)) return 6;
    if (e._s.includes(w)) return 4;
    if (e._s.includes(t)) return 3;
    if (e._x.includes(w)) return 1.5;
    if (e._x.includes(t)) return 1;
    return 0;
  }
  function find(index, q, limit = 30) {
    const nq = norm(q);
    if (!nq) return [];
    const toks = nq.split(' ');
    const out = [];
    for (const e of index) {
      let s = 0, ok = true;
      for (const t of toks) { const v = scoreTok(e, t); if (!v) { ok = false; break; } s += v; }
      if (!ok) continue;
      if (e._t.startsWith(' ' + nq)) s += 8;
      s += e.boost || 0;
      out.push([s, e]);
    }
    out.sort((a, b) => b[0] - a[0] || a[1].title.length - b[1].title.length);
    return out.slice(0, limit).map(x => x[1]);
  }

  const API = { norm, build, find };
  root.LRSuche = API;
  if (typeof document === 'undefined') return; // Node-Tests: nur die Logik

  // ------------------------------------------------------------ Index aus den echten Inhalten
  let A = null, INDEX = null;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const fname = s => s ? s.name.replace(/ (eA|gA)$/, '') : '';

  function entries() {
    const E = [];
    const S = window.LRStruktur;
    const page = (title, href, sub, alias, pre) => E.push({ title, href, sub, kind: 'Seite', alias, boost: 2, pre });
    page('Heute', '#/', 'Startseite: nächster Schritt, Ziel-Ring, Streak', 'start home');
    page('Wiederholen', '#/wiederholen', 'Abruf, Fehlerjagd, Sessions');
    page('Abruf', '#/abruf', 'Fällige Karten aus deinen Lektionen', 'karteikarten wiederholung');
    page('Fehlerjagd', '#/fehlerjagd', 'Deine Fehler kommen zur Kontrolle wieder', 'fehlerliste fehler');
    page('Session starten', '#/session', '3, 10, 20 Minuten oder Fokusblock', 'timer uhr fokusblock lernen');
    page('Trainings-Kalender', '#/verlauf', 'Alle Lerntage, Streak, Kalibrierung', 'verlauf statistik streak');
    page('Lernplan', '#/plan', 'Was wann dran ist', 'plan', () => { A.state.planTab = 'lernplan'; A.save(); });
    page('Klausuren', '#/plan', 'Alle Termine 12.1 und 12.2', 'termine klausurplan', () => { A.state.planTab = 'klausuren'; A.save(); });
    page('Stundenplan', '#/plan', 'A- und B-Woche', 'unterricht stunden', () => { A.state.planTab = 'stunden'; A.save(); });
    page('Geräte verbinden', '#/sync', 'Sync-Code, verschlüsselt', 'sync handy ipad');
    page('Python-Werkstatt', '#/python', 'Code schreiben und im Browser ausführen', 'programmieren informatik code ausfuhren');
    page('Beipackzettel (Informatik)', '#/befehle', 'Alle erlaubten Befehle: Zeichenketten, Reihung, Stapel, Schlange', 'befehle beipackzettel hilfsmittel push pop top enqueue dequeue head insertat getitem delete append getlength isempty ascii mod informatik');
    page('Altes Portal', '../alt/', 'Bisherige Module (neuer Tab)', 'alt iserv physik module');

    A.SUBJECTS.filter(s => A.mine(s.id)).forEach(s => {
      E.push({ title: fname(s), sub: `${s.teacher} · Raum ${s.room}`, kind: 'Fach', href: `#/fach/${s.id}`, fach: s.id, alias: s.name + ' ' + s.code, boost: 3 });
      if (window.LRSkript && LRSkript.has(s.id)) E.push({ title: `${fname(s)} durchgehen`, sub: 'Alles kompakt, druckbar als PDF', kind: 'Skript', href: `#/skript/${s.id}`, fach: s.id, alias: 'skript zusammenfassung drucken pdf', boost: 1 });
      if (!S) return;
      const walk = (list, path) => list.forEach(n => {
        const href = S.nodeHref(n);
        E.push({ title: n.titel, sub: [fname(s)].concat(path).join(' › ') + (n.kurz ? ' · ' + n.kurz : ''), kind: n.typ === 'seite' ? 'Seite' : 'Ordner', href, fach: s.id, boost: 1.5 });
        (n.themen || []).forEach(it => addItem(E, it, s, path.concat(n.titel)));
        if (n.kinder) walk(n.kinder, path.concat(n.titel));
        if (n.typ === 'probes') S.probesOf(s.id).forEach(p => E.push({ title: p.titel, sub: `${fname(s)} · ${p.be} BE · ${p.minuten} Min.`, kind: 'Probe', href: `#/probe/${p.id}`, fach: s.id }));
      });
      walk(S.tree(s.id), []);
      if (S.tree(s.id).some(n => n.typ === 'ordner' && S.themenOf(n).length > 1)) E.push({ title: `Wissenslandkarte ${fname(s)}`, sub: 'Was sitzt, was wackelt', kind: 'Karte', href: `#/karte/${s.id}`, fach: s.id, alias: 'landkarte karte' });
    });
    // Aufgaben (hängen über ihre Lektion an den Ordnern)
    if (S) A.TASKS.forEach(t => {
      const inf = S.info({ typ: 'aufgabe', ref: t.id }); if (!inf) return;
      E.push({ title: t.title, sub: `${((A.byId[A.fachOf(t)] || {}).name || 'Mathe').replace(/ (eA|gA)$/, '')} · ${inf.sub}`, kind: 'Aufgabe', href: inf.href, fach: A.fachOf(t), text: [t.topic, t.ops, t.intro].concat(t.parts.map(p => p.q)).join(' ') });
    });
    // Klausuren des Profils
    A.exams.filter(k => A.mine(k.fid)).forEach(k => {
      const s = A.byId[k.fid];
      E.push({ title: `Klausur ${s ? fname(s) : k.subject} ${k.dateStr.slice(0, 5)}.`, sub: `${k.topic} · ${k.days >= 0 ? A.daysText(k.days) : 'geschrieben'}`, kind: 'Klausur', href: `#/klausur/${k.id}`, fach: k.fid, alias: k.subject, boost: k.days >= 0 ? 1 : 0 });
    });
    return E;
  }
  function addItem(E, it, s, path) {
    const S = window.LRStruktur, inf = S.info(it); if (!inf) return;
    const where = [fname(s)].concat(path).join(' › ');
    let text = '';
    if (it.typ === 'lektion') {
      const l = A.LESSONS.find(x => x.id === it.ref);
      if (l) text = [l.short, l.idee, l.bild].concat(l.rezept || [], (l.test || []).map(c => c.q || c.front || '')).join(' ');
    }
    if (it.typ === 'thema') {
      const t = A.TOPICS.find(x => x.id === it.ref);
      if (t) {
        text = [t.kurz].concat(t.kann || []).join(' ');
        // Stufen und Besondere Übungen einzeln auffindbar
        if (window.LRTreppe) LRTreppe.NAMES.forEach((nm, n) => E.push({ title: `${inf.title} · Stufe ${n}`, sub: `${nm} · ${where}`, kind: 'Stufe', href: `#/thema/${t.id}/${n}`, fach: t.fach, boost: -1 }));
        const X = { blurting: 'Blurting', fehler: 'Fehler finden', erlaeutern: 'Lösungsweg erläutern', deuten: 'Bedingung deuten' };
        Object.keys(t.extras || {}).forEach(k => X[k] && E.push({ title: `${inf.title} · ${X[k]}`, sub: `Besondere Übung · ${where}`, kind: 'Übung', href: `#/thema/${t.id}/${k}`, fach: t.fach, boost: -0.5 }));
      }
    }
    if (it.typ === 'algo') {
      const a = A.ALGOS.find(x => x.id === it.ref);
      if (a) text = [a.text, 'struktogramm pseudocode python notation'].join(' ');
    }
    E.push({ title: inf.title, sub: `${where}${inf.sub ? ' · ' + inf.sub : ''}`, kind: inf.kind || 'Thema', href: inf.href, fach: inf.fach, text, boost: 1 });
  }
  const index = () => INDEX || (INDEX = build(entries()));

  // ------------------------------------------------------------ Oberfläche (Fenster)
  let last = [], sel = 0;
  const strip = s => String(s || '').replace(/\$/g, '');
  function rowHtml(e, i) {
    const s = A.byId[e.fach];
    return `<a class="row srow${i === sel ? ' sel' : ''}" href="${e.href}" data-si="${i}" ${A.subjStyle(s)}${e.href.startsWith('../') ? ' target="_blank" rel="noopener"' : ''} role="option" aria-selected="${i === sel}">
      <span class="skind">${A.esc(e.kind)}</span><span class="row-main"><span class="row-title">${A.esc(strip(e.title))}</span><span class="row-sub">${A.esc(strip(e.sub || ''))}</span></span>${A.icon(e.href.startsWith('../') ? 'ext' : 'right', 'chev')}</a>`;
  }
  function suggestions() {
    const pick = h => index().find(e => e.href === h);
    const next = A.upcoming.find(k => A.mine(k.fid));
    return [next && pick(`#/klausur/${next.id}`), pick('#/fehlerjagd'), pick('#/skript/mathe'), pick('#/python'), pick('#/plan'), pick('#/verlauf')].filter(Boolean);
  }
  function paint(box, q) {
    const t0 = performance.now();
    last = q.trim() ? find(index(), q) : suggestions();
    const ms = performance.now() - t0;
    sel = 0;
    const list = $('#sResults', box);
    list.innerHTML = last.length ? last.map(rowHtml).join('') : `<div class="empty">Nichts gefunden für „${A.esc(q)}“. Versuch ein anderes Wort, z. B. „Integral“ oder „Probeklausur“.</div>`;
    $('#sMeta', box).textContent = q.trim() ? `${last.length === 30 ? '30+' : last.length} ${last.length === 1 ? 'Treffer' : 'Treffer'} · ${ms < 1 ? '< 1' : Math.round(ms)} ms` : 'Vorschläge';
  }
  function choose(i) {
    const e = last[i]; if (!e) return;
    if (e.href.startsWith('../')) { window.open(e.href, '_blank', 'noopener'); A.closeSheet(); return; }
    if (e.pre) e.pre();
    A.closeSheet();
    if (location.hash === e.href || (e.href === '#/' && !location.hash)) A.rerender(); else location.hash = e.href;
  }
  function open() {
    INDEX = null; // Fortschritt (erledigt, Status) ändert sich: Index frisch bauen, dauert wenige ms
    A.openSheet(`<div class="search">${A.sheetHead('Suchen')}
      <div class="sbox">${A.icon('search')}<input class="input sinput" id="sInput" type="search" placeholder="Thema, Aufgabe, Ordner …" autocomplete="off" autocapitalize="off" spellcheck="false" enterkeyhint="go" aria-label="Suchen" aria-controls="sResults"></div>
      <p class="row-sub smeta" id="sMeta"></p><div class="list slist" id="sResults" role="listbox" aria-label="Treffer"></div>
      <p class="row-sub skeys">Tipp: <kbd>Strg</kbd> <kbd>K</kbd> öffnet die Suche überall, <kbd>↑</kbd> <kbd>↓</kbd> wählen, <kbd>Enter</kbd> öffnen.</p></div>`, box => {
      const inp = $('#sInput', box);
      paint(box, '');
      inp.addEventListener('input', () => paint(box, inp.value));
      inp.addEventListener('keydown', e => {
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
          e.preventDefault();
          sel = Math.max(0, Math.min(last.length - 1, sel + (e.key === 'ArrowDown' ? 1 : -1)));
          $$('.srow', box).forEach((r, i) => { r.classList.toggle('sel', i === sel); r.setAttribute('aria-selected', i === sel); });
          const r = $(`.srow[data-si="${sel}"]`, box); if (r) r.scrollIntoView({ block: 'nearest' });
        } else if (e.key === 'Enter') { e.preventDefault(); choose(sel); }
      });
      $('#sResults', box).addEventListener('click', e => {
        const r = e.target.closest('[data-si]'); if (!r) return;
        e.preventDefault(); choose(+r.dataset.si);
      });
    });
    const inp = document.getElementById('sInput'); if (inp) inp.focus(); // auch auf dem iPad: Tastatur gleich offen
  }

  API.init = app => {
    A = app;
    API.open = open;
    API.index = index;
    document.addEventListener('click', e => { if (e.target.closest('[data-action="search"]')) { e.preventDefault(); open(); } });
    addEventListener('keydown', e => {
      const typing = /INPUT|TEXTAREA|SELECT/.test((e.target || {}).tagName || '') || (e.target && e.target.isContentEditable);
      if ((e.ctrlKey || e.metaKey) && !e.altKey && (e.key === 'k' || e.key === 'K')) { e.preventDefault(); if (!document.getElementById('sInput')) open(); else document.getElementById('sInput').focus(); return; }
      if (e.key === '/' && !typing && !e.ctrlKey && !e.metaKey && !e.altKey) { e.preventDefault(); open(); }
    });
  };
})(typeof window !== 'undefined' ? window : globalThis);
