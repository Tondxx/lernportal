/* ==========================================================================
   STRUKTUR – Bauschritt S3b (Portalplan 8a)
   Fach-Seite mit Ordner-Kacheln · Ordner-Seiten (Themen, Aufgaben) · Klausur-Filter
   · Lernplan (Reiter „Plan“) · Probeklausur (zusammengestellt, im Ordner „Probeklausuren“)
   Inhalte: content/ordner.js (Baum), content/plaene.js (geteilte Pläne). Logik: plan.js.
   Persönliches (pro Profil, im Zustand): kfilter, rel, plan, probes, probeScores, probeRun, probeDone.
   Lernplan-Änderungen sind Ereignisse (type 'plan'), damit sie später synchronisierbar sind.
   ========================================================================== */
(function () {
  'use strict';
  const LRS = {};
  window.LRStruktur = LRS;
  let A = null;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const PASS = 80;
  const TREES = {}, NODES = {};
  let editRel = false;           // Markier-Modus „klausurrelevant“ (nur Anzeige, wird nicht gespeichert)
  const otab = {};               // Ordner-Id → 'themen' | 'aufgaben'
  const stripM = s => String(s || '').replace(/\$/g, '');
  const subjName = s => s ? s.name.replace(/ (eA|gA)$/, '') : '';

  // ------------------------------------------------------------ Baum
  function treeOf(fid) {
    const base = (window.LR_ORDNER || {})[fid];
    if (base) return base;
    const s = A.byId[fid];
    return [{ id: fid + '-alt', typ: 'alt', titel: 'Bisherige Module', kurz: `${s ? s.topics.length : 0} Module aus dem alten Portal` }];
  }
  function walk(list, fach, parent) {
    list.forEach(n => {
      n.fach = fach; n.parent = parent; NODES[n.id] = n;
      if (n.kinder) walk(n.kinder, fach, n.id);
    });
  }
  function ownerOf(typ, ref) {
    const hit = Object.values(NODES).find(n => (n.themen || []).some(it => it.typ === typ && it.ref === ref));
    return hit || null;
  }
  LRS.backFor = (typ, ref) => {
    let n = null;
    if (typ === 'aufgabe') { const t = A.TASKS.find(x => x.id === ref); n = t ? ownerOf('lektion', t.lesson) : null; }
    else n = ownerOf(typ, ref);
    return n ? `#/ordner/${n.id}` : null;
  };
  const themenOf = n => (n.themen || []).concat(...(n.kinder || []).map(themenOf));
  const aufgabenOf = n => {
    const les = new Set(themenOf(n).filter(it => it.typ === 'lektion').map(it => it.ref));
    return A.TASKS.filter(t => les.has(t.lesson)).map(t => ({ typ: 'aufgabe', ref: t.id }));
  };
  const nodeHref = n => n.typ === 'seite' ? `#/spick/${n.fach}` : `#/ordner/${n.id}`;

  // ------------------------------------------------------------ Einheiten (Themen, Aufgaben …) auflösen
  function progressOf(topic) { return LRTreppe.progress(A.LR, topic); }
  function info(it) {
    const { LESSONS, TASKS, TOPICS, ALGOS, state } = A;
    if (it.typ === 'lektion') {
      const l = LESSONS.find(x => x.id === it.ref); if (!l) return null;
      return { title: l.title, num: l.num, sub: l.short, min: l.min, href: `#/lektion/${l.id}`, done: !!state.done[l.id], fach: 'mathe', kind: 'Lektion' };
    }
    if (it.typ === 'aufgabe') {
      const t = TASKS.find(x => x.id === it.ref); if (!t) return null;
      const be = A.taskMax(t), got = A.taskGot(t);
      return { title: t.title, sub: `Teil ${t.teil} · AFB ${t.afb} · ${be} BE`, min: Math.max(5, Math.round(be * 1.5)), href: `#/aufgabe/${t.id}`, done: got > 0 && got >= be * 0.75, chip: got ? `${got}/${be} BE` : '', fach: 'mathe', kind: 'Aufgabe' };
    }
    if (it.typ === 'thema' || it.typ === 'stufe' || it.typ === 'extra') {
      const t = TOPICS.find(x => x.id === it.ref); if (!t) return null;
      const pr = progressOf(t), nm = stripM(t.titel);
      if (it.typ === 'thema') return { title: nm, sub: t.kurz, min: 30, href: `#/thema/${t.id}`, done: pr.best[4] >= PASS, chip: pr.status !== 'offen' ? pr.status : '', fach: t.fach, kind: 'Thema' };
      if (it.typ === 'stufe') return { title: `${nm} · Stufe ${it.n}`, sub: LRTreppe.NAMES[it.n], min: 10, href: `#/thema/${t.id}/${it.n}`, done: pr.best[it.n] >= PASS, fach: t.fach, kind: 'Stufe' };
      const L = { blurting: 'Blurting', fehler: 'Fehler finden', erlaeutern: 'Lösungsweg erläutern', deuten: 'Bedingung deuten' }[it.kind] || it.kind;
      return { title: `${nm} · ${L}`, sub: 'Besondere Übung', min: it.kind === 'blurting' ? 8 : 10, href: `#/thema/${t.id}/${it.kind}`, done: pr.ex[it.kind] != null && (it.kind === 'blurting' || pr.ex[it.kind] >= PASS), fach: t.fach, kind: 'Übung' };
    }
    if (it.typ === 'algo') {
      const a = ALGOS.find(x => x.id === it.ref); if (!a) return null;
      const best = A.LR.events().filter(e => e.type === 'extra' && e.data && e.data.topic === a.id).reduce((m, e) => Math.max(m, e.data.pct), -1);
      return { title: a.titel, sub: a.kurz, min: 15, href: `#/algo/${a.id}`, done: best >= PASS, chip: best >= 0 ? best + ' %' : '', fach: a.fach, kind: 'Notation' };
    }
    if (it.typ === 'probe') {
      const p = findProbe(it.ref); if (!p) return null;
      const res = (A.state.probeDone[p.id] || []).slice(-1)[0];
      return { title: p.titel, sub: `${p.be} BE · ${p.minuten} Min.`, min: p.minuten, href: `#/probe/${p.id}`, done: !!res, chip: res ? res.pct + ' %' : '', fach: p.fach, kind: 'Probeklausur' };
    }
    return null;
  }
  const itemKey = it => LRPlan.key(it);

  // ------------------------------------------------------------ Klausur-Filter
  function exam(id) { return A.exams.find(k => k.id === id); }
  const examsOfFach = fid => A.upcoming.filter(k => k.fid === fid);
  const kfilterOf = fid => { const id = A.state.kfilter[fid]; return id && examsOfFach(fid).some(k => k.id === id) ? id : null; };
  const examLabel = k => `Klausur ${k.dateStr.slice(0, 5)}.`;
  function ownRel(key, node, kid) {
    const o = (A.state.rel[kid] || {})[key];
    if (o !== undefined) return o;
    if (node && node.klausuren && node.klausuren.length) return node.klausuren.includes(kid);
    return null;
  }
  function relNode(n, kid) { // true/false; fehlt eine Angabe, erbt der Knoten vom Elternordner, oberste Ebene = false
    const r = ownRel(n.id, n, kid);
    if (r !== null) return r;
    return n.parent ? relNode(NODES[n.parent], kid) : false;
  }
  function relItem(it, node, kid) {
    const r = ownRel(itemKey(it), null, kid);
    return r !== null ? r : relNode(node, kid);
  }
  function setRel(kid, key, v) { (A.state.rel[kid] = A.state.rel[kid] || {})[key] = v; A.save(); }

  // ------------------------------------------------------------ Lernplan: Quellen
  const plansForMe = () => (window.LR_PLANS || []).filter(p => A.mine(p.fach));
  const examDates = () => Object.fromEntries(A.exams.map(k => [k.id, k.date]));
  function currentPlan() {
    const pe = LRPlan.effective(plansForMe(), A.LR.events());
    const items = pe.items.filter(it => A.mine(it.fach) && info(it));
    return { pe, items, keys: new Set(items.map(i => i.key)) };
  }
  const isDone = pe => it => pe.manualDone.has(itemKey(it)) || !!(info(it) || {}).done;
  function scheduleFor(items, pe) {
    return LRPlan.schedule(items, { today: new Date(), perDay: A.state.plan.perDay, klausurDates: examDates(), isDone: isDone(pe), minOf: it => (info(it) || {}).min || 10 });
  }
  function addToPlan(it, kid) {
    const item = Object.assign({}, it, { fach: it.fach || (info(it) || {}).fach });
    if (kid && !item.klausur) item.klausur = kid;
    A.LR.log('plan', itemKey(item), { op: 'add', item });
  }
  const toast = msg => LRTreppe.kit.toast(msg);

  // ------------------------------------------------------------ Probeklausuren
  const contentProbes = () => {
    const e = A.D.EXAM1;
    return e ? [{ id: e.id || 'MP1', fach: 'mathe', titel: e.title, tasks: e.tasks.map(t => t.id), minuten: e.minutes || 90, be: e.maxBE || e.tasks.reduce((a, t) => a + A.taskMax(t), 0), fest: true }] : [];
  };
  const probesOf = fid => (fid === 'mathe' ? contentProbes() : []).concat((A.state.probes || []).filter(p => p.fach === fid));
  const findProbe = id => contentProbes().concat(A.state.probes || []).find(p => p.id === id) || null;
  const poolOf = fid => fid === 'mathe' ? A.TASKS.map(t => ({ id: t.id, teil: t.teil, lesson: t.lesson, be: A.taskMax(t) })) : [];

  // ------------------------------------------------------------ Bausteine (HTML)
  const crumbs = n => {
    const chain = []; for (let c = n; c; c = c.parent ? NODES[c.parent] : null) chain.unshift(c);
    const s = A.byId[n.fach];
    return `<nav class="crumbs" aria-label="Pfad"><a href="#/faecher">Fächer</a><span>›</span><a href="#/fach/${n.fach}">${subjName(s)}</a>${chain.map((c, i) => `<span>›</span>${i === chain.length - 1 ? `<b>${c.titel}</b>` : `<a href="#/ordner/${c.id}">${c.titel}</a>`}`).join('')}</nav>`;
  };
  const icn = (n, c) => A.icon(n, c);

  function progText(n) {
    if (n.typ === 'probes') { const c = probesOf(n.fach).length; return `${c} ${c === 1 ? 'Klausur' : 'Klausuren'}`; }
    if (n.typ === 'alt') return `${(A.byId[n.fach] || { topics: [] }).topics.length} Module`;
    if (n.typ === 'seite') return 'Eine Seite';
    const th = themenOf(n); if (!th.length) return '';
    const d = th.filter(it => (info(it) || {}).done).length;
    return `${d} von ${th.length} Themen`;
  }
  function progFrac(n) { const th = themenOf(n); return th.length ? th.filter(it => (info(it) || {}).done).length / th.length : 0; }

  function tile(n, kid, edit) {
    const s = A.byId[n.fach];
    const rel = kid ? relNode(n, kid) : false;
    const frac = (n.typ === 'ordner') ? progFrac(n) : 0;
    const box = edit ? `<button type="button" class="rel-box${rel ? ' on' : ''}" data-krel="${n.id}" data-kid="${kid}" aria-pressed="${rel}" aria-label="Für diese Klausur relevant">${icn('check')}</button>` : '';
    return `<div class="otile-wrap${edit && !rel ? ' dim' : ''}"><a class="otile${n.demo ? ' demo' : ''}" href="${nodeHref(n)}" ${A.subjStyle(s)}>
        <span class="otile-ic">${icn(n.typ === 'probes' ? 'target' : n.typ === 'seite' ? 'book' : 'folder')}</span>
        <span class="otile-t">${n.titel}</span><span class="otile-s">${n.kurz || ''}</span>
        <span class="otile-p">${n.typ === 'ordner' ? A.bar(frac.toFixed(2)) : ''}<span class="row-sub">${progText(n)}</span></span></a>${box}</div>`;
  }

  function chipsFor(fid) {
    const ex = examsOfFach(fid);
    if (!ex.length) return '';
    const cur = kfilterOf(fid);
    return `<div class="kbar"><div class="kchips" role="group" aria-label="Klausur-Filter"><button type="button" class="chip pill" data-kf="" data-fach="${fid}" aria-pressed="${!cur}">Alle Ordner</button>${ex.map(k => `<button type="button" class="chip pill" data-kf="${k.id}" data-fach="${fid}" aria-pressed="${cur === k.id}" title="${A.esc(k.topic)}">${examLabel(k)}<span class="kdays">${A.daysText(k.days)}</span></button>`).join('')}</div>
      ${cur ? `<button type="button" class="link small" data-kedit>${editRel ? 'Fertig' : 'Auswahl ändern'}</button>` : ''}</div>`;
  }

  // ------------------------------------------------------------ Fach-Seite
  function fachView(id) {
    const s = A.byId[id];
    if (!s) return A.R.faecher();
    const tree = TREES[id], kid = kfilterOf(id);
    const e = examsOfFach(id)[0];
    const head = `<div class="fach-head" ${A.subjStyle(s)}><div class="mono">${A.mono(s)}</div><div style="min-width:0"><h2 class="h-1">${s.name}</h2><p class="muted" style="margin-top:4px">${s.level} · ${s.code} · ${s.teacher} · Raum ${s.room}${e ? ` · nächste Klausur ${A.daysText(e.days)}` : ''}</p></div></div>`;
    const shown = tree.filter(n => !kid || editRel || relNode(n, kid));
    const hidden = tree.length - shown.length;
    const body = shown.length
      ? `<div class="otiles rise">${shown.map(n => tile(n, kid, editRel)).join('')}</div>`
      : `<div class="empty">Für diese Klausur ist noch kein Ordner markiert. Tippe auf „Auswahl ändern“ und hake an, was dran kommt, oder sag Claude im Chat, was in der Klausur dran kommt.</div>`;
    const note = kid && hidden > 0 && !editRel ? `<p class="row-sub kinfo">${hidden} ${hidden === 1 ? 'Ordner ist' : 'Ordner sind'} ausgeblendet, weil sie nicht zu dieser Klausur gehören. <button type="button" class="link small" data-kf="" data-fach="${id}">Alle zeigen</button></p>` : (editRel ? `<p class="row-sub kinfo">Hake an, was für ${examLabel(exam(kid))} dran kommt. Das merkt sich dein Profil.</p>` : '');
    const planBtn = `<button type="button" class="cont plan-go" data-goplan="${id}" ${A.subjStyle(s)}><div class="cont-ico">${icn('cal')}</div><div class="row-main"><span class="row-title" style="font-size:18px">Lernplan für ${subjName(s)}</span><span class="row-sub">${planLine(id)}</span></div>${icn('right', 'chev')}</button>`;
    return { title: s.name, back: '#/faecher', nav: 'faecher', html: `<div ${A.subjStyle(s)}>${head}${chipsFor(id)}${note}${body}${planBtn}</div>` };
  }
  function planLine(fid) {
    const { pe, items } = currentPlan();
    const mine = items.filter(it => it.fach === fid);
    if (!mine.length) return 'Noch kein Plan. Lass dir einen erstellen oder füge Themen mit „In den Plan“ hinzu.';
    const open = mine.filter(it => !isDone(pe)(it)).length;
    return `${open} von ${mine.length} Einheiten offen`;
  }

  // ------------------------------------------------------------ Ordner-Seite
  function themeRow(it, node, kid, edit, i, inPlan) {
    const inf = info(it); if (!inf) return '';
    const key = itemKey(it);
    const rel = kid ? relItem(it, node, kid) : false;
    const act = edit
      ? `<button type="button" class="rel-box small${rel ? ' on' : ''}" data-krel="${key}" data-kid="${kid}" aria-pressed="${rel}" aria-label="Für diese Klausur relevant">${icn('check')}</button>`
      : `<button type="button" class="plan-btn${inPlan.has(key) ? ' on' : ''}" data-plan="${A.esc(key)}" aria-pressed="${inPlan.has(key)}" aria-label="${inPlan.has(key) ? 'Aus dem Plan nehmen' : 'In den Plan'}" title="${inPlan.has(key) ? 'Im Plan (tippen zum Entfernen)' : 'In den Plan'}">${icn(inPlan.has(key) ? 'check' : 'plus')}</button>`;
    REG[key] = it;
    const chip = inf.chip ? `<span class="chip ${inf.done ? 'ok' : 'warn'}">${A.esc(inf.chip)}</span>` : (inf.min ? `<span class="chip">${icn('clock')}${inf.min} Min.</span>` : '');
    return `<div class="prow${inf.done ? ' done' : ''}${edit && !rel ? ' dim' : ''}"><a class="prow-main" href="${inf.href}"><span class="pnode">${inf.done ? icn('check') : (inf.num || i + 1)}</span><span class="row-main"><span class="row-title">${A.esc(inf.title)}</span><span class="row-sub">${A.esc(inf.sub || '')}</span></span><span class="row-end">${chip}${icn('right', 'chev')}</span></a>${act}</div>`;
  }
  const REG = {};

  function probeRow(p) {
    const res = (A.state.probeDone[p.id] || []).slice(-1)[0];
    return `<div class="prow"><a class="prow-main" href="#/probe/${p.id}"><span class="pnode">${icn('target')}</span><span class="row-main"><span class="row-title">${A.esc(p.titel)}</span><span class="row-sub">${p.be} BE · ${p.minuten} Min. · ${p.tasks.length} Aufgaben${p.fest ? ' · fest vorgegeben' : ' · von dir zusammengestellt'}</span></span><span class="row-end">${res ? `<span class="chip ${res.pct >= PASS ? 'ok' : 'warn'}">${res.pct} %</span>` : ''}${icn('right', 'chev')}</span></a>${p.fest ? '' : `<button type="button" class="plan-btn" data-delprobe="${p.id}" aria-label="Probeklausur löschen" title="Löschen">${icn('x')}</button>`}</div>`;
  }

  function ordnerView(id) {
    const n = NODES[id];
    if (!n) return A.R.faecher();
    const s = A.byId[n.fach], kid = kfilterOf(n.fach), edit = editRel && !!kid;
    const head = `${crumbs(n)}<div class="page-head"><h2 class="h-1">${n.titel}</h2><p class="muted">${n.kurz || ''}</p></div>`;
    const filt = kid && !edit ? `<p class="row-sub kinfo">Gefiltert: nur ${examLabel(exam(kid))} <button type="button" class="link small" data-kf="" data-fach="${n.fach}">Alle zeigen</button></p>` : '';
    const editBar = kid ? `<div class="kbar"><span class="row-sub">${edit ? `Hake an, was für ${examLabel(exam(kid))} dran kommt.` : ''}</span><button type="button" class="link small" data-kedit>${edit ? 'Fertig' : 'Auswahl ändern'}</button></div>` : '';
    let body = '';
    const inPlan = currentPlan().keys;

    if (n.typ === 'probes') {
      const ps = probesOf(n.fach);
      body = `<div class="list prows">${ps.length ? ps.map(probeRow).join('') : '<div class="empty">Noch keine Probeklausur.</div>'}</div>
        <button type="button" class="btn primary block" data-newprobe="${n.fach}" style="margin-top:16px">${icn('plus')}Neue Probeklausur zusammenstellen</button>
        <p class="row-sub" style="margin-top:10px">Mischt Aufgaben aus den Ordnern, die du auswählst. Teil A (ohne Taschenrechner) kommt zuerst, dann Teil B.</p>`;
    } else if (n.typ === 'alt') {
      body = A.oldModules(s);
    } else {
      const kids = (n.kinder || []).filter(k => !kid || edit || relNode(k, kid));
      const th = (n.themen || []).filter(it => !kid || edit || relItem(it, n, kid));
      const au = aufgabenOf(n).filter(it => !kid || edit || relItem(it, n, kid));
      const hid = (n.themen || []).length + aufgabenOf(n).length - th.length - au.length;
      const tab = (otab[id] === 'aufgaben' && au.length) ? 'aufgaben' : 'themen';
      if (kids.length) body += `<div class="otiles">${kids.map(k => tile(k, kid, edit)).join('')}</div>`;
      if (th.length || au.length) {
        body += `${au.length && th.length ? `<div class="tabs3 otabs" role="tablist"><button type="button" role="tab" data-otab="themen" data-node="${id}" aria-selected="${tab === 'themen'}">Themen (${th.length})</button><button type="button" role="tab" data-otab="aufgaben" data-node="${id}" aria-selected="${tab === 'aufgaben'}">Aufgaben (${au.length})</button></div>` : ''}
          <div class="list prows">${(tab === 'themen' ? th : au).map((it, i) => themeRow(it, n, kid, edit, i, inPlan)).join('')}</div>`;
      }
      if (!kids.length && !th.length && !au.length) body = `<div class="empty">Hier ist für diese Klausur nichts markiert.</div>`;
      if (hid > 0 && kid && !edit) body += `<p class="row-sub kinfo">${hid} weitere ${hid === 1 ? 'Eintrag ist' : 'Einträge sind'} ausgeblendet.</p>`;
      const all = themenOf(n).concat(aufgabenOf(n)).filter(it => info(it));
      const allIn = all.length && all.every(it => inPlan.has(itemKey(it)));
      if (all.length && !edit) body += `<button type="button" class="btn block planall${allIn ? ' on' : ''}" data-planall="${id}" style="margin-top:18px">${icn(allIn ? 'check' : 'plus')}${allIn ? 'Alles ist im Plan' : `Alles aus „${A.esc(n.titel)}“ in den Plan`}</button>`;
    }
    return { title: n.titel, back: n.parent ? `#/ordner/${n.parent}` : `#/fach/${n.fach}`, nav: 'faecher', html: `<div ${A.subjStyle(s)}>${head}${editBar}${filt}<div class="rise">${body}</div></div>` };
  }

  function spickView(fid) {
    const s = A.byId[fid || 'mathe'];
    return { title: 'Spickzettel', back: `#/fach/${s.id}`, nav: 'faecher', html: `<div ${A.subjStyle(s)}><nav class="crumbs"><a href="#/faecher">Fächer</a><span>›</span><a href="#/fach/${s.id}">${subjName(s)}</a><span>›</span><b>Spickzettel</b></nav><div class="page-head"><h2 class="h-1">Spickzettel</h2><p class="muted">Alles Wichtige auf einer Seite.</p></div>${A.prose(A.D.SPICK)}</div>` };
  }

  // ------------------------------------------------------------ Lernplan (Reiter „Plan“)
  const dayLabel = d => {
    const t = LRPlan.dayStart(new Date()), diff = Math.round((d - t) / 864e5);
    if (diff === 0) return 'Heute'; if (diff === 1) return 'Morgen';
    return `${A.WD[d.getDay()].slice(0, 2)} ${String(d.getDate()).padStart(2, '0')}.${String(d.getMonth() + 1).padStart(2, '0')}.`;
  };
  function planItemRow(it, pe, done) {
    const inf = info(it), key = it.key || itemKey(it), s = A.byId[inf.fach];
    const manual = pe.manualDone.has(key);
    return `<div class="pitem${done ? ' done' : ''}" ${A.subjStyle(s)}>
      <button type="button" class="pcheck${done ? ' on' : ''}" data-pdone="${A.esc(key)}" data-on="${manual ? 1 : 0}" aria-pressed="${done}" aria-label="${done ? 'Als offen markieren' : 'Als erledigt markieren'}" ${done && !manual ? 'disabled' : ''}>${icn('check')}</button>
      <a class="pitem-main" href="${inf.href}"><span class="row-title">${A.esc(inf.title)}</span><span class="row-sub"><span class="pdot"></span>${subjName(s)} · ${inf.kind} · ${inf.min} Min.${it.pin ? ' · feste Position' : ''}</span></a>
      ${done ? '' : `<button type="button" class="icon-btn small" data-pnext="${A.esc(key)}" aria-label="Als Nächstes" title="Als Nächstes">${icn('up')}</button><button type="button" class="icon-btn small" data-prem="${A.esc(key)}" aria-label="Aus dem Plan entfernen" title="Entfernen">${icn('x')}</button>`}
    </div>`;
  }

  LRS.planBody = () => {
    const st = A.state; st.plan = st.plan || { perDay: 30 };
    const { pe, items } = currentPlan();
    const fachs = [...new Set(items.map(i => i.fach))];
    const ff = fachs.includes(st.planFach) ? st.planFach : 'all';
    const shown = items.filter(i => ff === 'all' || i.fach === ff);
    const done = isDone(pe);
    const sched = scheduleFor(shown, pe);

    const tempo = `<div class="pctl"><span class="kicker">Lernzeit pro Tag</span><div class="chips">${[20, 30, 45, 60, 90].map(m => `<button type="button" class="chip pill" data-pd="${m}" aria-pressed="${st.plan.perDay === m}">${m} Min.</button>`).join('')}</div></div>`;
    const fchips = fachs.length > 1 ? `<div class="pctl"><div class="chips">${[['all', 'Alle Fächer']].concat(fachs.map(f => [f, subjName(A.byId[f])])).map(([v, l]) => `<button type="button" class="chip pill" data-pf="${v}" aria-pressed="${ff === v}">${l}</button>`).join('')}</div></div>` : '';
    const newBtn = `<button type="button" class="btn ${items.length ? '' : 'primary'} block" data-newplan="${ff !== 'all' ? ff : ''}">${icn('plus')}Plan für eine Klausur erstellen</button>`;

    if (!items.length) {
      return `<div class="empty plan-empty">Noch kein Lernplan.<br>Öffne ein Fach, geh in einen Ordner und tippe bei einem Thema auf <b>+</b> („In den Plan“). Oder lass dir einen Plan für eine Klausur erstellen. Du kannst mir auch im Chat sagen, was in der Klausur dran kommt, dann baue ich dir einen Plan, den alle sehen.</div>${newBtn}`;
    }

    // Kopfkarten je Klausur
    const groups = new Map();
    shown.forEach(it => { const g = it.klausur || '-'; if (!groups.has(g)) groups.set(g, []); groups.get(g).push(it); });
    const cards = [...groups.entries()].map(([g, list]) => {
      const k = g === '-' ? null : exam(g), d = list.filter(done).length, need = sched.need[g];
      const shared = plansForMe().filter(p => p.klausur === g && list.some(it => it.planId === p.id));
      const lowTempo = need && need.perDay > st.plan.perDay;
      const late = sched.late.filter(it => (it.klausur || '-') === g).length;
      const s = A.byId[list[0].fach];
      return `<div class="card pgroup" ${A.subjStyle(s)}>
        <div class="pg-top"><div><span class="kicker">${subjName(s)}${k ? ` · ${examLabel(k)} (${A.daysText(k.days)})` : ''}</span><h3 class="h-2">${shared.length ? A.esc(shared[0].titel) : 'Mein Plan'}</h3></div>${A.ring(list.length ? d / list.length : 0, { size: 56, center: `<b class="num" style="font-size:15px">${d}</b>` })}</div>
        <p class="row-sub">${d} von ${list.length} Einheiten geschafft${need ? ` · insgesamt ca. ${need.min} Min.` : ''}</p>
        ${shared.length ? `<span class="chip subj">${icn('user')}Geteilter Plan, für alle mit diesem Kurs sichtbar</span>` : ''}
        ${shared[0] && shared[0].hinweis ? `<div class="notice">${icn('info')}<div>${A.esc(shared[0].hinweis)}</div></div>` : ''}
        ${lowTempo ? `<div class="notice warn">${icn('alert')}<div>Mit ${st.plan.perDay} Min. pro Tag wird das vor der Klausur nicht fertig. Du brauchst etwa ${need.perDay} Min. pro Tag${late ? ` (${late} Einheiten lägen sonst nach dem Termin)` : ''}.</div></div>` : (need ? `<p class="row-sub ok-line">${icn('check')}Passt: Mit ${st.plan.perDay} Min. pro Tag schaffst du es rechtzeitig.</p>` : '')}
      </div>`;
    }).join('');

    // Tage
    const first = sched.days.slice(0, 7), rest = sched.days.slice(7);
    const dayHtml = day => `<section class="pday"><div class="pday-h"><h3 class="h-2">${dayLabel(day.date)}</h3><span class="chip">${icn('clock')}${day.min} Min.</span></div>${day.items.map(it => planItemRow(it, pe, false)).join('')}</section>`;
    const doneItems = shown.filter(done);
    const days = sched.days.length
      ? first.map(dayHtml).join('') + (rest.length ? `<details class="pmore"><summary>Weitere ${rest.length} Tage anzeigen</summary>${rest.map(dayHtml).join('')}</details>` : '')
      : `<div class="empty">Alles erledigt. Jetzt hält Wiederholen es frisch.</div>`;
    const doneHtml = doneItems.length ? `<details class="pmore"><summary>Erledigt (${doneItems.length})</summary>${doneItems.map(it => planItemRow(it, pe, true)).join('')}</details>` : '';
    return `${fchips}${cards}${tempo}<div class="pdays">${days}</div>${doneHtml}<div style="margin-top:22px">${newBtn}</div>`;
  };

  // Karte „Nächster Schritt“ auf Heute: erster offener Plan-Eintrag
  LRS.nextPlanStep = () => {
    const { pe, items } = currentPlan();
    if (!items.length) return null;
    const sched = scheduleFor(items, pe);
    const day = sched.days[0]; if (!day) return null;
    const it = day.items[0], inf = info(it), s = A.byId[inf.fach];
    return { kicker: `Lernplan · ${dayLabel(day.date).toLowerCase() === 'heute' ? 'heute' : dayLabel(day.date)}`, title: inf.title, sub: `${inf.kind}${inf.sub ? ' · ' + inf.sub : ''}. Heute geplant: ${day.min} Min.`, min: inf.min, href: inf.href, s, ic: it.typ === 'probe' ? 'target' : it.typ === 'aufgabe' ? 'pencil' : 'play' };
  };

  // ------------------------------------------------------------ Plan-Assistent
  const planable = fid => (TREES[fid] || []).some(n => n.typ === 'ordner' && !n.demo);
  function newPlanSheet(preFach) {
    const cand = A.upcoming.filter(k => k.fid && planable(k.fid));
    if (!cand.length) { toast('Für deine Fächer gibt es noch keine Ordner mit Inhalt.'); return; }
    let sel = cand.find(k => k.fid === preFach) || cand[0];
    let chosen = new Set(), probe = true;
    const ordnerOf = fid => TREES[fid].filter(n => n.typ === 'ordner' && !n.demo);
    const resetChosen = () => { const kid = sel.id; chosen = new Set(ordnerOf(sel.fid).filter(n => relNode(n, kid)).map(n => n.id)); if (!chosen.size) chosen = new Set(ordnerOf(sel.fid).map(n => n.id)); };
    resetChosen();
    A.openSheet('', box => {
      const draw = () => {
        const s = A.byId[sel.fid];
        const hasPool = poolOf(sel.fid).length > 0;
        box.innerHTML = `${A.sheetHead('Plan für eine Klausur')}
          <p class="row-sub" style="margin-bottom:12px">Der Plan verteilt die Themen rückwärts vom Klausurtermin auf deine Lerntage. Du kannst alles später ändern.</p>
          <span class="lbl">Klausur</span>
          <div class="chips" style="margin-bottom:16px">${cand.map(k => `<button type="button" class="chip pill" data-spk="${k.id}" aria-pressed="${k.id === sel.id}">${subjName(A.byId[k.fid])} · ${k.dateStr.slice(0, 5)}.</button>`).join('')}</div>
          <span class="lbl">Was kommt dran?</span>
          <div class="picks" role="group">${ordnerOf(sel.fid).map(n => `<button type="button" class="pick" data-spo="${n.id}" aria-pressed="${chosen.has(n.id)}" ${A.subjStyle(s)}><span class="mono">${icn('folder')}</span><span>${n.titel}</span></button>`).join('')}</div>
          ${hasPool ? `<button type="button" class="pick wide" data-spp aria-pressed="${probe}" ${A.subjStyle(s)} style="margin-top:12px"><span class="mono">${icn('target')}</span><span>Probeklausur 3 Tage vor dem Termin einplanen</span></button>` : ''}
          <p class="row-sub" id="spmsg" style="margin-top:12px">${sel.topic ? 'Klausur: ' + A.esc(sel.topic) : ''}</p>
          <button class="btn primary block" type="button" data-spgo>${icn('check')}Plan erstellen</button>`;
      };
      draw();
      box.onclick = ev => {
        const k = ev.target.closest('[data-spk]'), o = ev.target.closest('[data-spo]'), p = ev.target.closest('[data-spp]'), go = ev.target.closest('[data-spgo]');
        if (k) { sel = cand.find(x => x.id === k.dataset.spk); resetChosen(); draw(); }
        else if (o) { chosen.has(o.dataset.spo) ? chosen.delete(o.dataset.spo) : chosen.add(o.dataset.spo); draw(); }
        else if (p) { probe = !probe; draw(); }
        else if (go) {
          if (!chosen.size) { $('#spmsg', box).textContent = 'Bitte mindestens einen Ordner auswählen.'; $('#spmsg', box).classList.add('err'); return; }
          createPlan(sel, [...chosen], probe && poolOf(sel.fid).length > 0);
          A.closeSheet();
        }
      };
    });
  }
  function createPlan(k, ordnerIds, withProbe) {
    const kid = k.id, fid = k.fid, st = A.state;
    // Markierung „klausurrelevant“ passend setzen
    TREES[fid].filter(n => n.typ === 'ordner' && !n.demo).forEach(n => setRel(kid, n.id, ordnerIds.includes(n.id)));
    st.kfilter[fid] = kid;
    let added = 0;
    const lessons = [];
    ordnerIds.forEach(id => {
      const n = NODES[id], au = aufgabenOf(n);
      themenOf(n).forEach(it => {
        addToPlan(it, kid); added++;
        if (it.typ === 'lektion') { lessons.push(it.ref); au.filter(a => (A.TASKS.find(t => t.id === a.ref) || {}).lesson === it.ref).forEach(a => { addToPlan(a, kid); added++; }); }
      });
    });
    let probeMsg = '';
    if (withProbe) {
      const made = LRPlan.makeProbe(poolOf(fid), { lessons, be: 60, seed: Date.now() });
      if (made) {
        const p = savedProbe(fid, made, ordnerIds);
        addToPlan({ typ: 'probe', ref: p.id, pin: 'T-3', fach: fid }, kid); added++;
        probeMsg = ' Eine Probeklausur ist dabei.';
      }
    }
    A.save();
    st.planTab = 'lernplan'; st.planFach = fid;
    toast(`Plan erstellt: ${added} Einheiten.${probeMsg}`);
    if (location.hash.startsWith('#/plan')) A.rerender(); else location.hash = '#/plan';
  }
  function savedProbe(fid, made, ordnerIds) {
    const st = A.state;
    const names = ordnerIds.map(i => NODES[i].titel);
    const nr = (st.probes || []).filter(p => p.fach === fid).length + 2; // „Probeklausur 1“ ist die fest vorgegebene
    const p = { id: 'pk-' + Date.now().toString(36) + Math.floor(Math.random() * 1e3).toString(36), fach: fid, titel: `Probeklausur ${nr} · ${names.join(' + ')}`, tasks: made.tasks, minuten: made.minuten, be: made.be, beA: made.beA, beB: made.beB, ordner: ordnerIds, erstellt: Date.now() };
    st.probes = (st.probes || []).concat([p]);
    A.save();
    return p;
  }

  function newProbeSheet(fid) {
    const s = A.byId[fid], os = (TREES[fid] || []).filter(n => n.typ === 'ordner' && !n.demo && themenOf(n).some(i => i.typ === 'lektion'));
    if (!poolOf(fid).length || !os.length) { toast('Für dieses Fach gibt es noch keine Aufgaben für eine Probeklausur.'); return; }
    const kid = kfilterOf(fid);
    let chosen = new Set(os.filter(n => !kid || relNode(n, kid)).map(n => n.id)); if (!chosen.size) chosen = new Set(os.map(n => n.id));
    let be = 60;
    A.openSheet('', box => {
      const draw = () => {
        box.innerHTML = `${A.sheetHead('Probeklausur zusammenstellen')}
          <p class="row-sub" style="margin-bottom:12px">Mischt Aufgaben aus den gewählten Ordnern. Teil A (ohne Taschenrechner) kommt zuerst, danach Teil B. Die Klausur wird im Ordner „Probeklausuren“ gespeichert.</p>
          <span class="lbl">Aus welchen Ordnern?</span>
          <div class="picks" role="group">${os.map(n => `<button type="button" class="pick" data-pko="${n.id}" aria-pressed="${chosen.has(n.id)}" ${A.subjStyle(s)}><span class="mono">${icn('folder')}</span><span>${n.titel}</span></button>`).join('')}</div>
          <span class="lbl" style="margin-top:16px;display:block">Umfang</span>
          <div class="chips">${[[30, 'kurz · 30 BE'], [60, 'normal · 60 BE'], [90, 'lang · 90 BE']].map(([v, l]) => `<button type="button" class="chip pill" data-pkb="${v}" aria-pressed="${be === v}">${l}</button>`).join('')}</div>
          <p class="row-sub err" id="pkmsg" style="margin-top:12px"></p>
          <button class="btn primary block" type="button" data-pkgo>${icn('check')}Zusammenstellen</button>`;
      };
      draw();
      box.onclick = ev => {
        const o = ev.target.closest('[data-pko]'), b = ev.target.closest('[data-pkb]'), go = ev.target.closest('[data-pkgo]');
        if (o) { chosen.has(o.dataset.pko) ? chosen.delete(o.dataset.pko) : chosen.add(o.dataset.pko); draw(); }
        else if (b) { be = +b.dataset.pkb; draw(); }
        else if (go) {
          const msg = $('#pkmsg', box);
          if (!chosen.size) { msg.textContent = 'Bitte mindestens einen Ordner auswählen.'; return; }
          const lessons = [].concat(...[...chosen].map(id => themenOf(NODES[id]).filter(i => i.typ === 'lektion').map(i => i.ref)));
          const made = LRPlan.makeProbe(poolOf(fid), { lessons, be, seed: Date.now() });
          if (!made) { msg.textContent = 'Aus diesen Ordnern gibt es noch keine passenden Aufgaben.'; return; }
          const p = savedProbe(fid, made, [...chosen]);
          A.closeSheet();
          toast(made.knapp ? `Gespeichert, aber kürzer (${made.be} BE): mehr Aufgaben gibt es dazu noch nicht.` : `Gespeichert im Ordner „Probeklausuren“ (${made.be} BE).`);
          location.hash = `#/probe/${p.id}`;
        }
      };
    });
  }

  // ------------------------------------------------------------ Probeklausur
  function probeView(id) {
    const p = findProbe(id);
    if (!p) return A.R.faecher();
    const st = A.state, s = A.byId[p.fach];
    const run = st.probeRun && st.probeRun.id === id ? st.probeRun : null;
    const phase = !run ? 'start' : run.submitted ? 'rate' : 'work';
    const tasks = p.tasks.map(tid => A.TASKS.find(t => t.id === tid)).filter(Boolean);
    const scores = (st.probeScores[id] = st.probeScores[id] || {});
    const parts = [].concat(...tasks.map(t => t.parts));
    const owner = Object.values(NODES).find(n => n.typ === 'probes' && n.fach === p.fach);
    const back = owner ? `#/ordner/${owner.id}` : `#/fach/${p.fach}`;
    const crumb = owner ? `<nav class="crumbs" aria-label="Pfad"><a href="#/faecher">Fächer</a><span>›</span><a href="#/fach/${p.fach}">${subjName(s)}</a><span>›</span><a href="#/ordner/${owner.id}">${owner.titel}</a><span>›</span><b>${A.esc(p.titel.length > 34 ? p.titel.slice(0, 32) + '…' : p.titel)}</b></nav>` : '';
    const teilA = tasks.filter(t => t.teil === 'A'), teilB = tasks.filter(t => t.teil === 'B');
    const beOf = list => list.reduce((a, t) => a + A.taskMax(t), 0);
    const meta = `<div class="abi-head"><span class="chip">${p.be} BE</span><span class="chip">${icn('clock')}${p.minuten} Min.</span><span class="chip">Teil A ${beOf(teilA)} BE · ohne Taschenrechner</span><span class="chip">Teil B ${beOf(teilB)} BE · mit CAS</span></div>`;
    const blocks = [];
    const taskHtml = (t, i, mode) => { const b = A.taskBlock(t, { mode, store: scores }); blocks.push([t, b]); return `<section class="ptask"><div class="ptask-h"><span class="kicker">Aufgabe ${i + 1} · Teil ${t.teil} · ${A.taskMax(t)} BE</span><h3 class="h-2">${A.esc(t.title)}</h3></div>${b.html}</section>`; };
    const last = (st.probeDone[id] || []).slice(-1)[0];
    let body = '';

    if (phase === 'start') {
      const hist = (st.probeDone[id] || []).slice().reverse();
      const resCard = last ? resultCard(p, tasks, last) : '';
      body = `${resCard}<div class="card pstart"><p class="prose">So wie in der echten Klausur: Du löst auf Papier und trägst nur ein, was du magst. Die Musterlösungen siehst du erst nach dem Abgeben. Danach bewertest du dich ehrlich am Erwartungshorizont, und das Portal rechnet Punkte und Notenpunkte aus.</p>
        <div class="pstart-btns"><button class="btn primary" type="button" data-pstart="${p.minuten}">${icn('clock')}Mit Uhr starten (${p.minuten} Min.)</button><button class="btn" type="button" data-pstart="0">Ohne Uhr üben</button></div></div>
        <span class="sub">Aufgaben</span><div class="list prows">${tasks.map((t, i) => `<div class="prow"><div class="prow-main"><span class="pnode">${i + 1}</span><span class="row-main"><span class="row-title">${A.esc(t.title)}</span><span class="row-sub">Teil ${t.teil} · AFB ${t.afb} · ${A.taskMax(t)} BE</span></span></div></div>`).join('')}</div>
        ${hist.length > 1 ? `<span class="sub">Frühere Versuche</span><div class="list prows">${hist.slice(1).map(r => `<div class="prow"><div class="prow-main"><span class="pnode">${icn('clock')}</span><span class="row-main"><span class="row-title">${r.pts} von ${r.max} BE · ${r.pct} %</span><span class="row-sub">${new Date(r.t).toLocaleDateString('de-DE')}${r.min ? ' · ' + r.min + ' Min.' : ''}</span></div></div>`).join('')}</div>` : ''}`;
    } else {
      const mode = phase === 'work' ? 'work' : 'rate';
      const sec = (label, list, off) => list.length ? `<h3 class="h-2 psec">${label}</h3>${list.map((t, i) => taskHtml(t, off + i, mode)).join('')}` : '';
      const bar = phase === 'work'
        ? `<div class="pclock" id="pclock"><div><span class="kicker">${run.minutes ? 'Restzeit' : 'Zeit'}</span><b class="num" id="pclockT">--:--</b></div><button type="button" class="btn primary" data-psubmit>${icn('check')}Abgeben</button></div>`
        : `<div class="pclock rate"><div><span class="kicker">Jetzt bewerten</span><b id="prateN">0 von ${parts.length} Teilaufgaben bewertet</b></div><button type="button" class="btn primary" data-pfinish disabled>${icn('check')}Auswerten</button></div>`;
      body = `${bar}${phase === 'rate' ? `<div class="notice">${icn('info')}<div>Abgegeben. Die Musterlösungen sind jetzt offen. Vergleiche mit deinem Blatt und vergib ehrlich Punkte für jede Teilaufgabe.</div></div>` : ''}${sec('Teil A · ohne Taschenrechner', teilA, 0)}${sec('Teil B · mit Taschenrechner (CAS)', teilB, teilA.length)}
        <button type="button" class="link small pabort" data-pabort>Abbrechen und verwerfen</button>`;
    }

    return {
      title: 'Probeklausur', back, nav: 'faecher', focus: phase !== 'start',
      html: `<div ${A.subjStyle(s)} class="rise">${crumb}<div class="page-head"><h2 class="h-1">${A.esc(p.titel)}</h2>${meta}</div>${body}</div>`,
      after(root) {
        if (phase === 'work') {
          const t = $('#pclockT', root);
          const tick = () => {
            const clk = $('#pclock', root);
            if (!clk || !t.isConnected) { clearInterval(iv); return; } // Seite wurde gewechselt (root = die ganze Ansicht bleibt bestehen)
            const el = Date.now() - run.start;
            const left = run.minutes ? run.minutes * 60000 - el : el;
            const s = Math.floor(Math.abs(left) / 1000), mm = Math.floor(s / 60), ss = String(s % 60).padStart(2, '0');
            t.textContent = `${left < 0 ? '+' : ''}${mm}:${ss}`;
            clk.classList.toggle('low', !!run.minutes && left < 10 * 60000);
            clk.classList.toggle('over', !!run.minutes && left < 0);
          };
          const iv = setInterval(tick, 500); tick();
        }
        if (phase !== 'start') {
          const upd = () => {
            const n = parts.filter(pt => scores[pt.id] !== undefined).length;
            const el = $('#prateN', root); if (el) el.textContent = `${n} von ${parts.length} Teilaufgaben bewertet`;
            const f = $('[data-pfinish]', root); if (f) f.disabled = n < parts.length;
          };
          blocks.forEach(([, b]) => b.bind(root, upd));
          if (phase === 'rate') upd();
        }
      }
    };
  }

  function resultCard(p, tasks, r) {
    const np = LRTreppe.notenpunkte(r.pct);
    const rows = tasks.map(t => { const got = t.parts.reduce((a, pt) => a + ((r.scores || {})[pt.id] || 0), 0), max = A.taskMax(t); return `<div class="prow"><a class="prow-main" href="#/aufgabe/${t.id}"><span class="pnode ${got >= max * 0.75 ? 'ok' : ''}">${got >= max * 0.75 ? icn('check') : icn('alert')}</span><span class="row-main"><span class="row-title">${A.esc(t.title)}</span><span class="row-sub">${got < max ? 'Nochmal üben, es fehlen ' + (max - got) + ' BE' : 'voll'}</span></span><span class="row-end"><span class="chip ${got >= max * 0.75 ? 'ok' : 'warn'}">${got}/${max} BE</span>${icn('right', 'chev')}</span></a></div>`; }).join('');
    return `<div class="card pres"><span class="kicker">Letztes Ergebnis · ${new Date(r.t).toLocaleDateString('de-DE')}${r.min ? ' · ' + r.min + ' Min.' : ''}</span>
      <div class="score-big"><div><b class="num">${r.pts}</b><span>von ${r.max} BE</span></div><div class="np"><b class="num">${np}</b><span>Notenpunkte (${r.pct} %)</span></div></div>
      <p class="np-note dim">Umrechnung nach der üblichen Oberstufen-Tabelle. Deine Lehrkraft kann abweichen.</p>
      <div class="list prows">${rows}</div></div>`;
  }

  // ------------------------------------------------------------ Ereignisse (delegiert)
  function wire() {
    A.view.addEventListener('click', ev => {
      const t = ev.target;
      const kf = t.closest('[data-kf]');
      if (kf) { const fid = kf.dataset.fach; if (kf.dataset.kf) A.state.kfilter[fid] = kf.dataset.kf; else delete A.state.kfilter[fid]; editRel = false; A.save(); A.rerender(); return; }
      if (t.closest('[data-kedit]')) { editRel = !editRel; A.rerender(); return; }
      const kr = t.closest('[data-krel]');
      if (kr) { const key = kr.dataset.krel, kid = kr.dataset.kid, node = NODES[key]; const cur = node ? relNode(node, kid) : (REG[key] ? relItem(REG[key], ownerOf(REG[key].typ, REG[key].ref) || {}, kid) : false); setRel(kid, key, !cur); A.rerender(); return; }
      const ot = t.closest('[data-otab]');
      if (ot) { otab[ot.dataset.node] = ot.dataset.otab; A.rerender(); return; }
      const pl = t.closest('[data-plan]');
      if (pl) {
        const key = pl.dataset.plan, it = REG[key]; if (!it) return;
        const on = currentPlan().keys.has(key);
        const fid = (info(it) || {}).fach;
        if (on) { A.LR.log('plan', key, { op: 'remove', key }); toast('Aus dem Plan genommen.'); }
        else { addToPlan(it, kfilterOf(fid)); toast('Im Plan. Du findest ihn unter Plan › Lernplan.'); }
        A.rerender(); return;
      }
      const pa = t.closest('[data-planall]');
      if (pa) {
        const n = NODES[pa.dataset.planall], kid = kfilterOf(n.fach), have = currentPlan().keys; let c = 0;
        themenOf(n).concat(aufgabenOf(n)).filter(it => info(it) && !have.has(itemKey(it))).forEach(it => { addToPlan(it, kid); c++; });
        toast(c ? `${c} Einheiten im Plan.` : 'Schon alles im Plan.'); A.rerender(); return;
      }
      const gp = t.closest('[data-goplan]');
      if (gp) { A.state.planTab = 'lernplan'; A.state.planFach = gp.dataset.goplan; A.save(); location.hash = '#/plan'; return; }
      const pd = t.closest('[data-pd]');
      if (pd) { A.state.plan.perDay = +pd.dataset.pd; A.save(); A.rerender(); return; }
      const pf = t.closest('[data-pf]');
      if (pf) { A.state.planFach = pf.dataset.pf; A.save(); A.rerender(); return; }
      const pdn = t.closest('[data-pdone]');
      if (pdn && !pdn.disabled) { const key = pdn.dataset.pdone; A.LR.log('plan', key, { op: pdn.dataset.on === '1' ? 'undone' : 'done', key }); A.rerender(); return; }
      const pn = t.closest('[data-pnext]');
      if (pn) { A.LR.log('plan', pn.dataset.pnext, { op: 'next', key: pn.dataset.pnext }); toast('Kommt als Nächstes dran.'); A.rerender(); return; }
      const pr = t.closest('[data-prem]');
      if (pr) { A.LR.log('plan', pr.dataset.prem, { op: 'remove', key: pr.dataset.prem }); toast('Aus dem Plan entfernt.'); A.rerender(); return; }
      const np = t.closest('[data-newplan]');
      if (np) { newPlanSheet(np.dataset.newplan); return; }
      const nk = t.closest('[data-newprobe]');
      if (nk) { newProbeSheet(nk.dataset.newprobe); return; }
      const dp = t.closest('[data-delprobe]');
      if (dp) { if (confirm('Diese Probeklausur löschen?')) { const id = dp.dataset.delprobe; A.state.probes = (A.state.probes || []).filter(p => p.id !== id); delete A.state.probeDone[id]; A.save(); A.rerender(); } return; }
      // Probeklausur
      const ps = t.closest('[data-pstart]');
      if (ps) { const id = (location.hash.match(/#\/probe\/([^/?]+)/) || [])[1]; A.state.probeScores[id] = {}; A.state.probeRun = { id, start: Date.now(), minutes: +ps.dataset.pstart }; A.save(); window.scrollTo(0, 0); A.rerender(); return; }
      if (t.closest('[data-psubmit]')) { const r = A.state.probeRun; if (r) { r.submitted = Date.now(); A.save(); window.scrollTo(0, 0); A.rerender(); } return; }
      if (t.closest('[data-pabort]')) { if (confirm('Probeklausur abbrechen? Deine Bewertungen gehen verloren (deine Notizen bleiben).')) { const id = A.state.probeRun && A.state.probeRun.id; delete A.state.probeRun; if (id) A.state.probeScores[id] = {}; A.save(); A.rerender(); } return; }
      const pfin = t.closest('[data-pfinish]');
      if (pfin && !pfin.disabled) { finishProbe(); return; }
    });
  }
  function finishProbe() {
    const st = A.state, run = st.probeRun; if (!run) return;
    const p = findProbe(run.id); if (!p) return;
    const tasks = p.tasks.map(tid => A.TASKS.find(t => t.id === tid)).filter(Boolean);
    const scores = st.probeScores[run.id] || {};
    const parts = [].concat(...tasks.map(t => t.parts));
    const pts = parts.reduce((a, pt) => a + (scores[pt.id] || 0), 0), max = parts.reduce((a, pt) => a + pt.be, 0);
    const pct = Math.round(pts / max * 100), min = Math.max(1, Math.round(((run.submitted || Date.now()) - run.start) / 60000));
    A.LR.log('probe', run.id, { probe: run.id, pts, max, pct, min, mitUhr: !!run.minutes });
    parts.forEach(pt => A.LR.log('practice', pt.id, { pts: scores[pt.id] || 0, max: pt.be, probe: run.id }));
    (st.probeDone[run.id] = st.probeDone[run.id] || []).push({ t: Date.now(), pts, max, pct, min, scores: Object.assign({}, scores) });
    delete st.probeRun; st.probeScores[run.id] = {};
    A.save(); window.scrollTo(0, 0); A.rerender();
  }

  // ------------------------------------------------------------ Start
  LRS.init = a => {
    A = a;
    const st = A.state;
    ['kfilter', 'rel', 'probeScores', 'probeDone'].forEach(k => { if (!st[k] || typeof st[k] !== 'object') st[k] = {}; });
    if (!Array.isArray(st.probes)) st.probes = [];
    if (!st.plan || typeof st.plan !== 'object') st.plan = { perDay: 30 };
    if (![20, 30, 45, 60, 90].includes(st.plan.perDay)) st.plan.perDay = 30;
    A.SUBJECTS.forEach(s => { TREES[s.id] = treeOf(s.id); walk(TREES[s.id], s.id, null); });
    A.R.fach = fachView; A.R.ordner = ordnerView; A.R.probe = probeView; A.R.spick = spickView;
    wire();
  };

  LRS._test = { info, relNode };
})();
