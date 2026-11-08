/* ==========================================================================
   SKRIPT-MODUS „DURCHGEHEN“ – Bauschritt S8 (Portalplan 4.4, Abschnitt 9 „Abitur-Modus“)
   #/skript/<fach>: alle Themen eines Fachs kompakt auf einer Seite, in der Reihenfolge
   der Ordner (content/ordner.js). Pro Lektion: Idee · Rezept (· Beispiel · Fehler · Selbsttest).
   Lerntreppen-Themen: „Das kannst du danach“ + Spickzettel aus dem Blurting.
   Drucken / „Als PDF sichern“ über den Druckdialog des Browsers (Druck-CSS in ds.css).
   Demo-Ordner bleiben draußen. Zustand pro Profil: state.skript = 'kurz' | 'voll'.
   ========================================================================== */
(function () {
  'use strict';
  let A = null;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const fname = s => s ? s.name.replace(/ (eA|gA)$/, '') : '';

  // Abschnitte des Fachs: [{ node, units:[{typ, ref}] }] – nur echte (keine Demo-)Ordner mit Inhalt
  function sections(fid) {
    const S = window.LRStruktur; if (!S) return [];
    const out = [];
    const visit = (n, path) => {
      if (n.typ !== 'ordner' || n.demo) return;
      const units = (n.themen || []).filter(it => unitOk(it));
      if (units.length) out.push({ node: n, path, units });
      (n.kinder || []).forEach(k => visit(k, path.concat(n.titel)));
    };
    S.tree(fid).forEach(n => visit(n, []));
    return out;
  }
  function unitOk(it) {
    if (it.typ === 'lektion') return A.LESSONS.some(l => l.id === it.ref);
    if (it.typ === 'thema') { const t = A.TOPICS.find(x => x.id === it.ref); return !!t && !t.demo; }
    if (it.typ === 'algo') { const a = A.ALGOS.find(x => x.id === it.ref); return !!a && !a.demo; }
    return false;
  }
  const has = fid => !!A && sections(fid).length > 0;

  // ------------------------------------------------------------ Bausteine
  function lessonHtml(l, voll) {
    const parts = [];
    parts.push(`<div class="sk-block"><span class="sk-lbl">Idee</span>${A.prose(l.idee)}</div>`);
    if (l.rezept && l.rezept.length) parts.push(`<div class="sk-block"><span class="sk-lbl">Rezept</span><ol class="sk-steps">${l.rezept.map(r => `<li>${A.prose(r)}</li>`).join('')}</ol></div>`);
    if (voll && l.beispiel) parts.push(`<div class="sk-block"><span class="sk-lbl">Beispiel</span><div class="sk-q">${A.prose(l.beispiel.q)}</div><ol class="sk-steps sk-ex">${l.beispiel.steps.map(s => `<li><b>${A.M(s.h)}</b>${A.prose(s.t)}</li>`).join('')}</ol></div>`);
    if (voll && l.fehler && l.fehler.length) parts.push(`<div class="sk-block"><span class="sk-lbl">Typische Fehler</span><ul class="sk-fails">${l.fehler.map(f => `<li>${A.prose(f)}</li>`).join('')}</ul></div>`);
    if (voll && l.test && l.test.length) parts.push(`<div class="sk-block"><span class="sk-lbl">Selbsttest (erst abdecken, dann prüfen)</span><dl class="sk-qa">${l.test.map(c => `<dt>${A.M(c.q)}</dt><dd>${A.M(c.a)}</dd>`).join('')}</dl></div>`);
    return `<article class="sk-unit" id="sk-${l.id}"><header><span class="kicker">Lektion ${A.esc(l.num)} · ${l.min} Min.</span><h3 class="h-2">${A.M(l.title)}</h3>${l.short ? `<p class="muted sk-short">${A.M(l.short)}</p>` : ''}</header>${parts.join('')}
      <a class="link small sk-open" href="#/lektion/${l.id}">Lektion öffnen</a></article>`;
  }
  function topicHtml(t) {
    const sp = t.extras && t.extras.blurting && t.extras.blurting.spick;
    return `<article class="sk-unit" id="sk-${t.id}"><header><span class="kicker">Thema mit Lerntreppe</span><h3 class="h-2">${A.M(t.titel)}</h3><p class="muted sk-short">${A.M(t.kurz || '')}</p></header>
      ${t.kann && t.kann.length ? `<div class="sk-block"><span class="sk-lbl">Das kannst du danach</span><ul class="sk-fails">${t.kann.map(k => `<li>${A.M(k)}</li>`).join('')}</ul></div>` : ''}
      ${sp ? `<div class="sk-block"><span class="sk-lbl">Spickzettel</span>${A.prose(sp)}</div>` : ''}
      <a class="link small sk-open" href="#/thema/${t.id}">Lerntreppe öffnen</a></article>`;
  }
  function algoHtml(a) {
    const L = window.LRAlgo;
    return `<article class="sk-unit" id="sk-${a.id}"><header><span class="kicker">Algorithmus</span><h3 class="h-2">${A.esc(a.titel)}</h3><p class="muted sk-short">${A.esc(a.text || a.kurz || '')}</p></header>
      ${L ? `<div class="sk-block"><span class="sk-lbl">Pseudocode</span><pre class="code sk-code">${A.esc(L.pseudoText(a.algo))}</pre></div><div class="sk-block"><span class="sk-lbl">Python</span><pre class="code sk-code">${A.esc(L.pyText(a.algo))}</pre></div>` : ''}
      <a class="link small sk-open" href="#/algo/${a.id}">Notation öffnen</a></article>`;
  }
  function unitHtml(it, voll) {
    if (it.typ === 'lektion') return lessonHtml(A.LESSONS.find(l => l.id === it.ref), voll);
    if (it.typ === 'thema') return topicHtml(A.TOPICS.find(x => x.id === it.ref));
    if (it.typ === 'algo') return algoHtml(A.ALGOS.find(x => x.id === it.ref));
    return '';
  }

  // ------------------------------------------------------------ Seite
  function view(fid) {
    const s = A.byId[fid];
    if (!s) return A.R.faecher();
    const mode = A.state.skript === 'voll' ? 'voll' : 'kurz', voll = mode === 'voll';
    const secs = sections(fid);
    const now = new Date();
    const stand = `${now.getDate()}.${now.getMonth() + 1}.${now.getFullYear()}`;
    const crumbs = `<nav class="crumbs" aria-label="Pfad"><a href="#/faecher">Fächer</a><span>›</span><a href="#/fach/${s.id}">${fname(s)}</a><span>›</span><b>Durchgehen</b></nav>`;
    if (!secs.length) {
      return { title: 'Durchgehen', back: `#/fach/${s.id}`, nav: 'faecher', html: `<div ${A.subjStyle(s)}>${crumbs}<div class="page-head"><h2 class="h-1">${fname(s)} durchgehen</h2></div><div class="empty">Für ${fname(s)} gibt es noch keine Themen im neuen Format. Sie kommen mit den Inhalten (nach dem IServ-Sync).</div></div>` };
    }
    const n = secs.reduce((a, x) => a + x.units.length, 0);
    const toc = `<nav class="sk-toc" aria-label="Inhalt">${secs.map((x, i) => `<button type="button" class="sk-toc-i" data-skjump="sec-${i}"><span class="num">${i + 1}</span><span>${A.esc(x.path.concat(x.node.titel).join(' › '))}</span><span class="dim">${x.units.length}</span></button>`).join('')}</nav>`;
    const body = secs.map((x, i) => `<section class="sk-sec" id="sec-${i}"><h2 class="h-1 sk-sec-h"><span class="num">${i + 1}</span>${A.esc(x.node.titel)}</h2>${x.node.kurz ? `<p class="muted">${A.esc(x.node.kurz)}</p>` : ''}${x.units.map(u => unitHtml(u, voll)).join('')}</section>`).join('');
    const spickHtml = (window.LR_SPICK || {})[fid] || (fid === 'mathe' ? A.D.SPICK : '');
    const spick = voll && spickHtml ? `<section class="sk-sec" id="sec-spick"><h2 class="h-1 sk-sec-h"><span class="num">${A.icon('book')}</span>Spickzettel</h2>${A.prose(spickHtml)}</section>` : '';
    const html = `<div ${A.subjStyle(s)} class="skript sk-${mode}">${crumbs}
      <div class="page-head"><span class="kicker">Durchgehen · ${n} Themen</span><h2 class="h-display">${fname(s)} auf einen Blick</h2><p class="muted">Alle Themen kompakt, in der Reihenfolge der Ordner. Zum Wiederholen vor der Klausur oder zum Ausdrucken.</p></div>
      <p class="sk-print-head">Lernraum · ${A.esc(s.name)} · Durchgehen (${voll ? 'mit Beispielen' : 'kompakt'}) · Stand ${stand}</p>
      <div class="sk-tools">${A.seg('skript', [['kurz', 'Kompakt'], ['voll', 'Mit Beispielen']], mode)}<button class="btn" type="button" data-skprint>${A.icon('print')}Drucken / PDF</button></div>
      ${toc}${body}${spick}
      <p class="row-sub sk-foot">Eigene Zusammenfassung aus dem Lernraum, kein offizielles Material.</p></div>`;
    return {
      title: `${fname(s)} durchgehen`, back: `#/fach/${s.id}`, nav: 'faecher', html,
      after(root) {
        $$('[data-skjump]', root).forEach(b => b.addEventListener('click', () => { const el = document.getElementById(b.dataset.skjump); if (el) el.scrollIntoView({ behavior: A.reduced ? 'auto' : 'smooth', block: 'start' }); }));
        const p = $('[data-skprint]', root); if (p) p.addEventListener('click', () => window.print());
      }
    };
  }

  window.LRSkript = {
    init(app) {
      A = app; A.R.skript = view;
      // Segment „Kompakt / Mit Beispielen“ (Segmente werden in app.js delegiert; hier nur der eigene Schlüssel)
      A.view.addEventListener('click', e => {
        const b = e.target.closest('.seg[data-seg="skript"] button'); if (!b) return;
        A.state.skript = b.dataset.v; A.save();
      }, true);
    },
    has, _sections: sections
  };
})();
