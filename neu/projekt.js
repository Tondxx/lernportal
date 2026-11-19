/* ==========================================================================
   PROJEKTTAGEBUCH  #/projekt  (Informatik-Projekt „Zange“, 19.11.2026)
   Raster nach den Vorgaben der Lehrkraft: Projektstart (Teil I) · Protokoll nach jeder
   Arbeitsphase (Teil II) · Ergebnisse · Reflexion und Selbsteinschätzung (Teil III.2) · Export.

   Speichern: Jede Änderung ist ein Ereignis `pj` im Profil (ref = Projekt-Id,
   data = { k: Schlüssel, v: Wert }). Der neueste Wert je Schlüssel gilt. Dadurch läuft das
   Tagebuch über den vorhandenen, verschlüsselten Sync auf alle Geräte, ohne den Zustand
   (max. 48 KB) zu belasten. Ein Ereignis darf verschlüsselt höchstens 16 KB groß sein,
   deshalb ist jedes Textfeld auf MAX Zeichen begrenzt und Protokollfelder werden einzeln
   gespeichert.
   Schlüssel: f.<feld> · ziel.<id> · plan.<id> · bsp.<id> · st.<id> · ki.<id> (ganze Zeile)
              e.<id> (Datum, Art, gelöscht) · e.<id>.<feld> (Text eines Protokollfelds)
   Bilder (Struktogramme) liegen nur auf dem Gerät (IndexedDB `lr-projekt`), nicht im Sync.
   Export: Word (.docx, selbst gebaut), PDF (Druckdialog), Markdown, Sicherung (.json).
   Vorbelegung: content/projekt-<id>.js (window.LR_PROJEKTE).
   ========================================================================== */
(function () {
  'use strict';
  let A = null;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const MAX = 7000, MAX_ROW = 900;
  const STATUS = ['offen', 'in Arbeit', 'erledigt'];
  const WD = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];
  const TABS = [['start', 'Projektstart'], ['protokolle', 'Protokolle'], ['ergebnisse', 'Ergebnisse'], ['reflexion', 'Reflexion'], ['export', 'Export']];
  // Felder eines Protokolls (Vorgaben Folie 6 + Protokollbogen Teil II)
  const EF = [
    ['ziel', 'Ziel dieser Arbeitsphase', 'Was wollte ich heute schaffen?'],
    ['geschafft', 'Das habe ich geschafft', 'Konkret: Funktion, Datei, Test, Struktogramm …'],
    ['probleme', 'Fragen, Fehler, Schwierigkeiten', 'Fehlermeldung, Denkfehler, offene Frage …'],
    ['loesung', 'So habe ich sie gelöst', 'Oder: noch nicht gelöst, weil …'],
    ['stand', 'Fertig / steht noch an', 'Was ist fertig? Was fehlt noch?'],
    ['ki', 'KI benutzt? Wofür?', 'nein / ja: …'],
    ['next', 'Nächster konkreter Schritt', 'Was mache ich als Erstes in der nächsten Stunde?']
  ];
  const REFL = [
    ['r_verlauf', 'Wie ist die Projektarbeit insgesamt verlaufen? Ziel erreicht?'],
    ['r_stern', 'Was waren Sternstunden?'],
    ['r_problem', 'Was war problematisch?'],
    ['r_verhalten', 'Wie war mein Arbeitsverhalten?'],
    ['r_mit', 'Was nehme ich mit?']
  ];
  const SELBST = [
    ['s_anteil', 'Mein Anteil am Ergebnis'],
    ['s_aufgaben', 'Meine Aufgaben und wie ich damit klargekommen bin'],
    ['s_zusammen', 'Zusammenarbeit (falls Partner- oder Gruppenarbeit)'],
    ['s_theorie', 'Was ich theoretisch gelernt habe'],
    ['s_praxis', 'Was ich praktisch gelernt habe']
  ];

  // ------------------------------------------------------------ Datum
  const pad = n => String(n).padStart(2, '0');
  const todayKey = () => { const d = new Date(); return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`; };
  const parseKey = k => { const [y, m, d] = String(k || '').split('-').map(Number); return y ? new Date(y, m - 1, d) : null; };
  const dShort = k => { const d = parseKey(k); return d ? `${pad(d.getDate())}.${pad(d.getMonth() + 1)}.` : '–'; };
  const dLong = k => { const d = parseKey(k); return d ? `${WD[d.getDay()]} ${pad(d.getDate())}.${pad(d.getMonth() + 1)}.${d.getFullYear()}` : 'ohne Datum'; };
  const wd = k => { const d = parseKey(k); return d ? WD[d.getDay()] : ''; };
  const daysTo = k => { const d = parseKey(k); if (!d) return null; const t = parseKey(todayKey()); return Math.round((d - t) / 864e5); };
  const rid = () => 'x' + Array.from(crypto.getRandomValues(new Uint8Array(5)), b => b.toString(16).padStart(2, '0')).join('');

  // ------------------------------------------------------------ Speicher (Ereignisse `pj`)
  const pending = new Map(), timers = new Map();
  let curPid = null, cur = null, lastEdit = 0, focusSel = null;

  function stored(pid) {
    const m = {};
    A.LR.events().forEach(e => {
      if (e.type !== 'pj' || e.ref !== pid || !e.data || typeof e.data.k !== 'string') return;
      const o = m[e.data.k];
      if (!o || e.t >= o.t) m[e.data.k] = { v: e.data.v, t: e.t };
    });
    return m;
  }
  function put(k, v) {
    pending.set(k, v);
    clearTimeout(timers.get(k));
    timers.set(k, setTimeout(() => flushKey(k), 1200));
    lastEdit = Date.now();
    saveState('busy');
  }
  function flushKey(k) {
    clearTimeout(timers.get(k)); timers.delete(k);
    if (!pending.has(k) || !curPid) return;
    const v = pending.get(k); pending.delete(k);
    const st = stored(curPid)[k];
    if (!st || JSON.stringify(st.v) !== JSON.stringify(v)) A.LR.log('pj', curPid, { k, v });
    if (!pending.size) saveState('ok');
  }
  const flushAll = () => Array.from(pending.keys()).forEach(flushKey);
  function saveState(s) {
    $$('[data-pjsave]').forEach(el => {
      el.dataset.st = s;
      el.lastElementChild.textContent = s === 'busy' ? 'Speichert …' : 'Alles gespeichert';
    });
  }

  // ------------------------------------------------------------ Modell (Vorbelegung + Änderungen)
  function build(P) {
    const st = stored(P.id);
    const val = k => (pending.has(k) ? pending.get(k) : st[k] ? st[k].v : undefined);
    const keys = new Set(Object.keys(st).concat(Array.from(pending.keys())));
    const idsOf = (pre, defs) => {
      const ids = defs.map(d => d.id);
      keys.forEach(k => { if (k.startsWith(pre + '.')) { const id = k.slice(pre.length + 1).split('.')[0]; if (!ids.includes(id)) ids.push(id); } });
      return ids;
    };
    const rows = (pre, defs) => idsOf(pre, defs).map(id => {
      const d = defs.find(x => x.id === id) || { id, ord: 999 };
      const v = val(`${pre}.${id}`);
      return Object.assign({}, d, v && typeof v === 'object' ? v : {}, { id });
    }).filter(r => !r.del).sort((a, b) => (a.ord || 0) - (b.ord || 0));
    const F = {};
    const fieldNames = new Set(Object.keys(P.felder).concat(REFL.map(x => x[0]), SELBST.map(x => x[0])));
    fieldNames.forEach(n => { const v = val('f.' + n); F[n] = typeof v === 'string' ? v : (P.felder[n] || ''); });
    const entries = idsOf('e', P.eintraege).map(id => {
      const d = P.eintraege.find(x => x.id === id) || { id };
      const meta = val('e.' + id);
      const e = Object.assign({}, d, meta && typeof meta === 'object' ? meta : {}, { id });
      EF.forEach(([f]) => { const v = val(`e.${id}.${f}`); e[f] = typeof v === 'string' ? v : (e[f] || ''); });
      return e;
    }).filter(e => !e.del).sort((a, b) => (a.datum < b.datum ? -1 : a.datum > b.datum ? 1 : (a.created || 0) - (b.created || 0)));
    const M = {
      F, entries,
      ziel: rows('ziel', P.ziele), plan: rows('plan', P.plan), bsp: rows('bsp', P.beispiele),
      st: rows('st', P.struktogramme), ki: rows('ki', P.ki)
    };
    M.idx = {}; ['ziel', 'plan', 'bsp', 'st', 'ki'].forEach(p => { M.idx[p] = Object.fromEntries(M[p].map(r => [r.id, r])); });
    M.ent = Object.fromEntries(entries.map(e => [e.id, e]));
    return M;
  }
  const strip = r => { const o = Object.assign({}, r); delete o.id; return o; };
  const putRow = (pre, r) => put(`${pre}.${r.id}`, strip(r));
  const putMeta = e => put('e.' + e.id, { datum: e.datum, art: e.art, created: e.created || 0 });

  // ------------------------------------------------------------ Bilder (nur dieses Gerät)
  const IDB = {
    db: null,
    open() {
      if (!this.db) this.db = new Promise((res, rej) => {
        const r = indexedDB.open('lr-projekt', 1);
        r.onupgradeneeded = () => r.result.createObjectStore('img');
        r.onsuccess = () => res(r.result); r.onerror = () => rej(r.error);
      });
      return this.db;
    },
    async run(mode, fn) { const db = await this.open(); return new Promise(res => { const tx = db.transaction('img', mode); const q = fn(tx.objectStore('img')); q.onsuccess = () => res(q.result == null ? null : q.result); q.onerror = () => res(null); }); },
    get(k) { return this.run('readonly', s => s.get(k)).catch(() => null); },
    put(k, v) { return this.run('readwrite', s => s.put(v, k)); },
    del(k) { return this.run('readwrite', s => s.delete(k)); }
  };
  const imgKey = id => `${curPid}:${id}`;
  function loadImage(file) {
    return new Promise((res, rej) => {
      const fr = new FileReader();
      fr.onerror = () => rej(fr.error);
      fr.onload = () => {
        const im = new Image();
        im.onerror = () => rej(new Error('Bild'));
        im.onload = () => {
          const s = Math.min(1, 1600 / im.naturalWidth);
          const w = Math.round(im.naturalWidth * s), h = Math.round(im.naturalHeight * s);
          const c = document.createElement('canvas'); c.width = w; c.height = h;
          const g = c.getContext('2d'); g.fillStyle = '#fff'; g.fillRect(0, 0, w, h); g.drawImage(im, 0, 0, w, h);
          const png = /png|gif|svg/.test(file.type);
          res({ data: c.toDataURL(png ? 'image/png' : 'image/jpeg', 0.9), w, h, typ: png ? 'png' : 'jpeg' });
        };
        im.src = fr.result;
      };
      fr.readAsDataURL(file);
    });
  }
  async function images(M) {
    const out = {};
    for (const r of M.st) { const v = await IDB.get(imgKey(r.id)); if (v) out[r.id] = v; }
    return out;
  }

  // ------------------------------------------------------------ Bausteine
  const esc = s => A.esc(s);
  const area = (attr, v, ph, cls = '') => `<textarea class="pj-in pj-area ${cls}" rows="1" ${attr} placeholder="${esc(ph || '')}" spellcheck="true">${esc(v)}</textarea>`;
  const line = (attr, v, ph, cls = '') => `<input class="pj-in ${cls}" type="text" ${attr} value="${esc(v)}" placeholder="${esc(ph || '')}">`;
  const fld = (name, v, ph, cls) => area(`data-f="${name}"`, v, ph, cls);
  const rowIn = (pre, r, f, ph, cls, long) => (long ? area : line)(`data-r="${pre}|${r.id}|${f}"`, r[f] || '', ph, cls);
  const delBtn = (pre, id, what) => `<button type="button" class="pj-x" data-delrow="${pre}|${id}" aria-label="${esc(what)} löschen" title="Löschen">${A.icon('x')}</button>`;
  const addBtn = (pre, label) => `<button type="button" class="pj-add" data-add="${pre}">${A.icon('plus')}${esc(label)}</button>`;
  const sec = (title, sub, inner, id) => `<section class="pj-sec"${id ? ` id="${id}"` : ''}><header class="pj-sec-h"><h3 class="h-2">${esc(title)}</h3>${sub ? `<p class="pj-sub">${esc(sub)}</p>` : ''}</header>${inner}</section>`;
  const filled = e => EF.filter(([f]) => String(e[f] || '').trim()).length;

  function ring(done, total) {
    const r = 22, c = 2 * Math.PI * r, p = total ? done / total : 0;
    return `<svg class="pj-ring" viewBox="0 0 56 56" aria-hidden="true"><circle cx="28" cy="28" r="${r}" class="pj-ring-bg"/><circle cx="28" cy="28" r="${r}" class="pj-ring-fg" stroke-dasharray="${(c * p).toFixed(1)} ${c.toFixed(1)}" transform="rotate(-90 28 28)"/></svg>`;
  }
  const heroCards = () => `<svg class="pj-cards" viewBox="0 0 220 150" aria-hidden="true">
      <g class="pj-card pj-card-l"><rect x="14" y="30" width="70" height="100" rx="9"/><text x="25" y="52">3</text><text x="49" y="94" class="pj-big">3</text></g>
      <g class="pj-card pj-card-r"><rect x="136" y="30" width="70" height="100" rx="9"/><text x="147" y="52">D</text><text x="171" y="94" class="pj-big">D</text></g>
      <g class="pj-card pj-card-m"><rect x="75" y="12" width="70" height="100" rx="9"/><text x="86" y="34">7</text><text x="110" y="76" class="pj-big">7</text></g>
    </svg>`;

  // ------------------------------------------------------------ Reiter
  function tabStart(P, M) {
    const F = M.F;
    const stamm = `<div class="pj-grid2">
        <label class="pj-field"><span class="pj-lbl">Projektthema</span>${fld('thema', F.thema, 'Worum geht es?', 'pj-strong')}</label>
        <label class="pj-field"><span class="pj-lbl">Gruppenmitglieder</span>${fld('mitglieder', F.mitglieder, 'Namen')}</label>
        <label class="pj-field"><span class="pj-lbl">Version</span>${fld('version', F.version, 'z. B. 2 vom 27.11.2026')}</label>
        <label class="pj-field"><span class="pj-lbl">Werkzeuge</span>${fld('werkzeuge', F.werkzeuge, 'Python, Editor, Structorizer …')}</label>
      </div>
      <label class="pj-field"><span class="pj-lbl">Beschreibung (detailliert)</span>${fld('beschreibung', F.beschreibung, 'Idee, Regeln, Ablauf einer Runde …', 'pj-long')}</label>
      <label class="pj-field"><span class="pj-lbl">Bezug zu den Vorgaben (Rekursion, Datenstrukturen, Bibliotheken)</span>${fld('bezug', F.bezug, 'Wo kommt was vor?')}</label>`;
    const done = M.ziel.filter(z => z.done).length;
    const ziele = `<label class="pj-field"><span class="pj-lbl">Gesamtziel</span>${fld('zielsatz', F.zielsatz, 'Was soll am Ende fertig sein?', 'pj-strong')}</label>
      <ol class="pj-goals">${M.ziel.map((z, i) => `<li class="pj-goal${z.done ? ' is-done' : ''}">
          <label class="pj-check"><input type="checkbox" data-r="ziel|${z.id}|done"${z.done ? ' checked' : ''}><span class="pj-box">${A.icon('check')}</span></label>
          <span class="pj-zno">Z${i + 1}</span>${rowIn('ziel', z, 'text', 'Teilziel', '', true)}${delBtn('ziel', z.id, 'Teilziel')}</li>`).join('')}</ol>${addBtn('ziel', 'Teilziel')}`;
    const today = todayKey();
    const nextId = (M.plan.find(p => p.datum >= today && p.status !== 'erledigt') || {}).id;
    const plan = `<ol class="pj-plan">${M.plan.map(p => {
      const cls = [p.status === 'erledigt' ? 'is-done' : '', p.id === nextId ? 'is-next' : '', p.datum === today ? 'is-today' : ''].join(' ');
      const sIdx = Math.max(0, STATUS.indexOf(p.status));
      return `<li class="pj-prow ${cls}">
        <div class="pj-pdate"><span>${wd(p.datum)}</span><b>${dShort(p.datum)}</b>${p.id === nextId ? '<em>nächster</em>' : ''}</div>
        <div class="pj-pmain">${rowIn('plan', p, 'text', 'Was ist geplant?', 'pj-strong', true)}
          <div class="pj-pmeta"><input class="pj-in pj-mini" type="date" data-r="plan|${p.id}|datum" value="${esc(p.datum)}" aria-label="Datum">${rowIn('plan', p, 'art', 'DS / HA', 'pj-mini pj-art')}${rowIn('plan', p, 'ziel', 'Teilziele, z. B. Z1, Z2', 'pj-mini')}</div></div>
        <button type="button" class="pj-status s${sIdx}" data-cycle="${p.id}" title="Status ändern">${esc(STATUS[sIdx])}</button>${delBtn('plan', p.id, 'Termin')}</li>`;
    }).join('')}</ol>${addBtn('plan', 'Termin')}`;
    const bsp = `<div class="pj-table pj-bsp"><div class="pj-tr pj-th"><span>Nr.</span><span>Situation</span><span>Eingabe</span><span>Erwartetes Ergebnis</span><span></span></div>
      ${M.bsp.map((b, i) => `<div class="pj-tr"><span class="pj-no">${i + 1}</span>${rowIn('bsp', b, 'sit', 'Situation', '', true)}${rowIn('bsp', b, 'ein', 'Eingabe', '', true)}${rowIn('bsp', b, 'erw', 'Erwartet', '', true)}${delBtn('bsp', b.id, 'Beispiel')}</div>`).join('')}</div>
      ${addBtn('bsp', 'Beispieleingabe')}
      <label class="pj-field pj-note"><span class="pj-lbl">Noch zu entscheiden</span>${fld('offen', F.offen, 'Offene Fragen zu den Regeln')}</label>`;
    return sec('Projektstart', 'Teil I: Thema, Beschreibung, Werkzeuge', stamm, 'pj-s1')
      + sec('Ziele', `${done} von ${M.ziel.length} Teilzielen erreicht · Haken setzen, wenn fertig`, ziele, 'pj-s2')
      + sec('Arbeitsplan', 'Status antippen: offen → in Arbeit → erledigt', plan, 'pj-s3')
      + sec('Beispieleingaben', 'Damit wird der Code zuerst getestet, erst danach wird er allgemein', bsp, 'pj-s4');
  }

  function entryCard(e, M) {
    const planHit = M.plan.find(p => p.datum === e.datum);
    const n = filled(e);
    return `<article class="pj-entry" id="pje-${e.id}">
      <header class="pj-eh">
        <div class="pj-edate"><span>${esc(e.art === 'HA' ? 'Hausarbeit' : 'Doppelstunde')}</span><b>${dLong(e.datum)}</b></div>
        <div class="pj-ehtools">
          <input class="pj-in pj-mini" type="date" data-em="${e.id}|datum" value="${esc(e.datum)}" aria-label="Datum">
          <div class="pj-artsw" role="group" aria-label="Art">${['DS', 'HA'].map(a => `<button type="button" data-art="${e.id}|${a}" aria-pressed="${e.art === a}">${a}</button>`).join('')}</div>
          <button type="button" class="pj-x" data-delentry="${e.id}" aria-label="Eintrag löschen" title="Eintrag löschen">${A.icon('x')}</button>
        </div>
      </header>
      ${planHit ? `<p class="pj-plannote">${A.icon('cal')}Geplant: ${esc(planHit.text)}${planHit.ziel ? ` (${esc(planHit.ziel)})` : ''}</p>` : ''}
      <div class="pj-meter" data-meter="${e.id}"><span style="--p:${(n / EF.length * 100).toFixed(0)}%"></span><em>${n} von ${EF.length} Feldern</em></div>
      <div class="pj-efields">${EF.map(([f, l, ph]) => `<label class="pj-field pj-ef-${f}"><span class="pj-lbl">${esc(l)}</span>${area(`data-e="${e.id}|${f}"`, e[f], ph)}</label>`).join('')}</div>
    </article>`;
  }
  function tabProtokolle(P, M) {
    const today = todayKey();
    const hasToday = M.entries.find(e => e.datum === today);
    const top = hasToday
      ? `<button type="button" class="btn primary" data-jump="pje-${hasToday.id}">${A.icon('pencil')}Eintrag von heute weiterschreiben</button>`
      : `<button type="button" class="btn primary" data-newentry>${A.icon('plus')}Neuer Eintrag für heute</button>`;
    const list = M.entries.slice().reverse();
    return `<div class="pj-proto-top">${top}<button type="button" class="btn" data-newentry="other">${A.icon('cal')}Eintrag für anderes Datum</button></div>
      <p class="pj-sub pj-hint">Nach jeder Stunde und jeder Hausarbeit ein Eintrag, in eigenen Worten: kurz und konkret (Funktionsname, Fehlermeldung, Zahl). Neueste oben, im Export in zeitlicher Reihenfolge.</p>
      ${list.length ? `<div class="pj-entries">${list.map(e => entryCard(e, M)).join('')}</div>` : '<div class="empty">Noch keine Einträge.</div>'}`;
  }

  function tabErgebnisse(P, M) {
    const st = `<div class="pj-stgrid">${M.st.map(r => `<article class="pj-st" data-st="${r.id}">
        <div class="pj-st-img" data-img="${r.id}"><div class="pj-st-empty">${A.icon('layers')}<span>Noch kein Bild</span></div></div>
        <div class="pj-st-body">${rowIn('st', r, 'name', 'Funktion', 'pj-strong')}${rowIn('st', r, 'was', 'Was sie macht', '', true)}${rowIn('st', r, 'stand', 'Stand, z. B. Entwurf vom 27.11.', 'pj-mini', false)}
          <div class="pj-st-tools"><label class="btn small pj-upload">${A.icon('up')}Bild wählen<input type="file" accept="image/*" data-upload="${r.id}" hidden></label><button type="button" class="btn small" data-rmimg="${r.id}" hidden>Bild entfernen</button>${delBtn('st', r.id, 'Struktogramm')}</div></div>
      </article>`).join('')}</div>${addBtn('st', 'Struktogramm')}
      <p class="pj-sub pj-hint">In Structorizer als PNG exportieren und hier hochladen. Bilder bleiben nur auf diesem Gerät, kommen aber mit in den Export.</p>`;
    const ki = `<div class="pj-table pj-ki"><div class="pj-tr pj-th"><span>Bereich</span><span>Von wem</span><span></span></div>
      ${M.ki.map(r => `<div class="pj-tr">${rowIn('ki', r, 'bereich', 'Bereich', 'pj-strong', true)}${rowIn('ki', r, 'wer', 'selbst / mit KI / KI', '', true)}${delBtn('ki', r.id, 'Zeile')}</div>`).join('')}</div>${addBtn('ki', 'Zeile')}`;
    return sec('Struktogramme', 'Mit Structorizer erstellen und hier sammeln', st, 'pj-s5')
      + sec('Präsentation', 'Aufbau, bei Bedarf ändern', `<label class="pj-field">${fld('praes', M.F.praes, '1. …', 'pj-long')}</label>`, 'pj-s6')
      + sec('KI-Nutzung', 'Jede KI-Hilfe offenlegen, damit klar ist, was deine eigene Leistung ist', ki, 'pj-s7');
  }

  function tabReflexion(P, M) {
    const block = list => `<div class="pj-qa">${list.map(([k, q], i) => `<label class="pj-field pj-q"><span class="pj-lbl"><i>${i + 1}</i>${esc(q)}</span>${fld(k, M.F[k], 'Deine Antwort …')}</label>`).join('')}</div>`;
    return sec('Reflexion', 'Am Ende ausfüllen, nach der Präsentation', block(REFL), 'pj-s8')
      + sec('Selbsteinschätzung', 'Teil III.2 der Vorgaben', block(SELBST), 'pj-s9');
  }

  function tabExport(P, M) {
    const fmts = [
      ['docx', 'file', 'Word (.docx)', 'Für IServ, Word und LibreOffice. Mit Tabellen und Struktogramm-Bildern.'],
      ['pdf', 'print', 'PDF', 'Öffnet den Druckdialog: dort „Als PDF sichern“ wählen.'],
      ['md', 'code', 'Markdown (.md)', 'Reiner Text mit Überschriften und Tabellen.'],
      ['copy', 'copy', 'Für Claude kopieren', 'Ganzes Tagebuch als Markdown in die Zwischenablage.'],
      ['json', 'shield', 'Sicherung (.json)', 'Alles, was du geändert hast, als Datei. Wieder einlesen mit „Sicherung laden“.']
    ];
    return `<div class="pj-fmts">${fmts.map(([k, ic, t, s]) => `<button type="button" class="pj-fmt" data-export="${k}"><span class="pj-fmt-ic">${A.icon(ic === 'file' ? 'book' : ic)}</span><span class="pj-fmt-t">${esc(t)}</span><span class="pj-fmt-s">${esc(s)}</span></button>`).join('')}
        <label class="pj-fmt pj-fmt-in"><span class="pj-fmt-ic">${A.icon('up')}</span><span class="pj-fmt-t">Sicherung laden</span><span class="pj-fmt-s">Eine .json-Sicherung einlesen (überschreibt geänderte Felder).</span><input type="file" accept="application/json,.json" data-import hidden></label></div>
      <h3 class="h-2 pj-prevh">Vorschau</h3>
      <div class="pj-doc" data-doc>${docHtml(docBlocks(P, M, {}))}</div>`;
  }

  // ------------------------------------------------------------ Dokument (für alle Exporte gleich)
  function paras(text) { return String(text || '').split(/\n/).map(s => s.trim()).filter(Boolean); }
  function docBlocks(P, M, imgs) {
    const F = M.F, B = [];
    const now = todayKey();
    B.push({ t: 'title', x: `Projekttagebuch: ${P.titel}` });
    B.push({ t: 'sub', x: `${P.kurs} · ${P.untertitel} · Stand ${dShort(now)}${now.slice(0, 4)}` });
    B.push({ t: 'h1', x: '1 Projektstart' });
    B.push({ t: 'table', w: [28, 72], key: true, head: ['Feld', 'Eintrag'], rows: [['Version', F.version], ['Gruppenmitglieder', F.mitglieder], ['Projektthema', F.thema], ['Werkzeuge', F.werkzeuge]] });
    B.push({ t: 'h2', x: 'Beschreibung' });
    paras(F.beschreibung).forEach(x => B.push({ t: 'p', x }));
    B.push({ t: 'h2', x: 'Bezug zu den Vorgaben' });
    paras(F.bezug).forEach(x => B.push({ t: 'p', x }));
    B.push({ t: 'h1', x: '2 Ziele und Arbeitsplan' });
    if (F.zielsatz.trim()) B.push({ t: 'p', x: F.zielsatz, b: true });
    B.push({ t: 'h2', x: 'Teilziele' });
    B.push({ t: 'list', items: M.ziel.map((z, i) => `${z.done ? '☑' : '☐'} Z${i + 1}: ${z.text || ''}`) });
    B.push({ t: 'h2', x: 'Arbeitsplan' });
    B.push({ t: 'table', w: [14, 10, 50, 12, 14], head: ['Datum', 'Art', 'Geplant', 'Ziel', 'Status'], rows: M.plan.map(p => [dShort(p.datum), p.art, p.text, p.ziel, p.status]) });
    B.push({ t: 'h1', x: '3 Beispieleingaben' });
    B.push({ t: 'table', w: [7, 31, 22, 40], head: ['Nr.', 'Situation', 'Eingabe', 'Erwartetes Ergebnis'], rows: M.bsp.map((b, i) => [String(i + 1), b.sit, b.ein, b.erw]) });
    if (F.offen.trim()) B.push({ t: 'p', x: `Noch zu entscheiden: ${F.offen}` });
    B.push({ t: 'h1', x: '4 Protokolle der Arbeitsphasen' });
    if (!M.entries.length) B.push({ t: 'p', x: 'Noch keine Einträge.' });
    M.entries.forEach(e => {
      B.push({ t: 'h2', x: `${dLong(e.datum)} · ${e.art === 'HA' ? 'Hausarbeit' : 'Doppelstunde'}` });
      B.push({ t: 'table', w: [30, 70], key: true, head: ['Feld', 'Eintrag'], rows: EF.map(([f, l]) => [l, e[f]]) });
    });
    B.push({ t: 'h1', x: '5 Ergebnisse' });
    B.push({ t: 'h2', x: 'Struktogramme' });
    M.st.forEach(r => {
      B.push({ t: 'h3', x: r.name || 'Struktogramm' });
      const meta = [r.was, r.stand && `Stand: ${r.stand}`].filter(Boolean).join(' · ');
      if (meta) B.push({ t: 'p', x: meta });
      if (imgs[r.id]) B.push({ t: 'img', img: imgs[r.id], alt: r.name });
    });
    B.push({ t: 'h2', x: 'Präsentation' });
    paras(F.praes).forEach(x => B.push({ t: 'p', x }));
    B.push({ t: 'h2', x: 'KI-Nutzung' });
    B.push({ t: 'table', w: [50, 50], head: ['Bereich', 'Von wem'], rows: M.ki.map(r => [r.bereich, r.wer]) });
    B.push({ t: 'h1', x: '6 Reflexion und Selbsteinschätzung' });
    B.push({ t: 'h2', x: 'Reflexion' });
    B.push({ t: 'table', w: [35, 65], key: true, head: ['Frage', 'Antwort'], rows: REFL.map(([k, q]) => [q, F[k]]) });
    B.push({ t: 'h2', x: 'Selbsteinschätzung' });
    B.push({ t: 'table', w: [35, 65], key: true, head: ['Frage', 'Antwort'], rows: SELBST.map(([k, q]) => [q, F[k]]) });
    return B;
  }
  const cellHtml = s => esc(s || '').replace(/\n/g, '<br>');
  function docHtml(B) {
    return B.map(b => {
      if (b.t === 'title') return `<h1 class="pjd-title">${esc(b.x)}</h1>`;
      if (b.t === 'sub') return `<p class="pjd-sub">${esc(b.x)}</p>`;
      if (b.t === 'h1') return `<h2 class="pjd-h1">${esc(b.x)}</h2>`;
      if (b.t === 'h2') return `<h3 class="pjd-h2">${esc(b.x)}</h3>`;
      if (b.t === 'h3') return `<h4 class="pjd-h3">${esc(b.x)}</h4>`;
      if (b.t === 'p') return `<p${b.b ? ' class="pjd-lead"' : ''}>${esc(b.x)}</p>`;
      if (b.t === 'list') return `<ul class="pjd-list">${b.items.map(x => `<li>${esc(x)}</li>`).join('')}</ul>`;
      if (b.t === 'img') return `<figure class="pjd-img"><img src="${b.img.data}" alt="${esc(b.alt || '')}"></figure>`;
      if (b.t === 'table') return `<table class="pjd-table${b.key ? ' key' : ''}"><colgroup>${b.w.map(w => `<col style="width:${w}%">`).join('')}</colgroup><thead><tr>${b.head.map(h => `<th>${esc(h)}</th>`).join('')}</tr></thead><tbody>${b.rows.map(r => `<tr>${r.map(c => `<td>${cellHtml(c)}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
      return '';
    }).join('');
  }
  function docMd(B) {
    const cell = s => String(s || '').replace(/\|/g, '\\|').replace(/\n/g, '<br>') || ' ';
    return B.map(b => {
      if (b.t === 'title') return `# ${b.x}`;
      if (b.t === 'sub') return `_${b.x}_`;
      if (b.t === 'h1') return `## ${b.x}`;
      if (b.t === 'h2') return `### ${b.x}`;
      if (b.t === 'h3') return `#### ${b.x}`;
      if (b.t === 'p') return b.b ? `**${b.x}**` : b.x;
      if (b.t === 'list') return b.items.map(x => `- ${x.replace(/^☑/, '[x]').replace(/^☐/, '[ ]')}`).join('\n');
      if (b.t === 'img') return `_(Bild: ${b.alt || 'Struktogramm'}, im Word-Export enthalten)_`;
      if (b.t === 'table') return [`| ${b.head.map(cell).join(' | ')} |`, `| ${b.head.map(() => '---').join(' | ')} |`].concat(b.rows.map(r => `| ${r.map(cell).join(' | ')} |`)).join('\n');
      return '';
    }).join('\n\n') + '\n';
  }

  // ------------------------------------------------------------ DOCX (Office Open XML, ohne Bibliothek)
  const xesc = s => String(s == null ? '' : s).replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const run = (t, b) => `<w:r>${b ? '<w:rPr><w:b/></w:rPr>' : ''}<w:t xml:space="preserve">${xesc(t)}</w:t></w:r>`;
  const wp = (t, style, b) => `<w:p>${style ? `<w:pPr><w:pStyle w:val="${style}"/></w:pPr>` : ''}${t ? run(t, b) : ''}</w:p>`;
  const TW = 9638; // Satzspiegel A4 mit 2 cm Rand, in twips
  function docxXml(B, media) {
    const body = [];
    let pic = 0;
    B.forEach(b => {
      if (b.t === 'title') body.push(wp(b.x, 'Title'));
      else if (b.t === 'sub') body.push(wp(b.x, 'Subtitle'));
      else if (b.t === 'h1') body.push(wp(b.x, 'Heading1'));
      else if (b.t === 'h2') body.push(wp(b.x, 'Heading2'));
      else if (b.t === 'h3') body.push(wp(b.x, 'Heading3'));
      else if (b.t === 'p') body.push(wp(b.x, null, b.b));
      else if (b.t === 'list') b.items.forEach(x => body.push(wp(x, 'Liste')));
      else if (b.t === 'img') {
        pic++;
        const rId = `rIdImg${pic}`, name = `bild${pic}.${b.img.typ === 'png' ? 'png' : 'jpeg'}`;
        media.push({ rId, name, data: b.img.data });
        const maxW = 6120000, wEmu = Math.min(maxW, b.img.w * 9525), hEmu = Math.round(wEmu * b.img.h / b.img.w);
        body.push(`<w:p><w:pPr><w:spacing w:after="160"/></w:pPr><w:r><w:drawing><wp:inline distT="0" distB="0" distL="0" distR="0"><wp:extent cx="${wEmu}" cy="${hEmu}"/><wp:docPr id="${pic}" name="Bild ${pic}" descr="${xesc(b.alt || '')}"/><wp:cNvGraphicFramePr><a:graphicFrameLocks noChangeAspect="1"/></wp:cNvGraphicFramePr><a:graphic><a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/picture"><pic:pic><pic:nvPicPr><pic:cNvPr id="${pic}" name="${name}"/><pic:cNvPicPr/></pic:nvPicPr><pic:blipFill><a:blip r:embed="${rId}"/><a:stretch><a:fillRect/></a:stretch></pic:blipFill><pic:spPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="${wEmu}" cy="${hEmu}"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom></pic:spPr></pic:pic></a:graphicData></a:graphic></wp:inline></w:drawing></w:r></w:p>`);
      } else if (b.t === 'table') {
        const ws = b.w.map(w => Math.round(TW * w / 100));
        const cell = (txt, w, head, key) => `<w:tc><w:tcPr><w:tcW w:w="${w}" w:type="dxa"/>${head ? '<w:shd w:val="clear" w:color="auto" w:fill="E6EAF5"/>' : key ? '<w:shd w:val="clear" w:color="auto" w:fill="F5F6FA"/>' : ''}</w:tcPr>${(String(txt || '').split('\n').length ? String(txt || '').split('\n') : ['']).map(l => `<w:p><w:pPr><w:pStyle w:val="Tabelle"/></w:pPr>${l ? run(l, head || key) : ''}</w:p>`).join('')}</w:tc>`;
        const rows = [`<w:tr><w:trPr><w:tblHeader/><w:cantSplit/></w:trPr>${b.head.map((h, i) => cell(h, ws[i], true)).join('')}</w:tr>`]
          .concat(b.rows.map(r => `<w:tr><w:trPr><w:cantSplit/></w:trPr>${r.map((c, i) => cell(c, ws[i], false, b.key && i === 0)).join('')}</w:tr>`));
        body.push(`<w:tbl><w:tblPr><w:tblStyle w:val="Raster"/><w:tblW w:w="${TW}" w:type="dxa"/><w:tblLayout w:type="fixed"/><w:tblLook w:val="04A0" w:firstRow="1" w:lastRow="0" w:firstColumn="1" w:lastColumn="0" w:noHBand="0" w:noVBand="1"/></w:tblPr><w:tblGrid>${ws.map(w => `<w:gridCol w:w="${w}"/>`).join('')}</w:tblGrid>${rows.join('')}</w:tbl>`);
        body.push('<w:p><w:pPr><w:spacing w:after="0"/></w:pPr></w:p>');
      }
    });
    return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing" xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:pic="http://schemas.openxmlformats.org/drawingml/2006/picture"><w:body>${body.join('')}<w:sectPr><w:footerReference w:type="default" r:id="rIdFooter"/><w:pgSz w:w="11906" w:h="16838"/><w:pgMar w:top="1134" w:right="1134" w:bottom="1134" w:left="1134" w:header="567" w:footer="567" w:gutter="0"/></w:sectPr></w:body></w:document>`;
  }
  const STYLES = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:docDefaults><w:rPrDefault><w:rPr><w:rFonts w:ascii="Calibri" w:hAnsi="Calibri" w:eastAsia="Calibri" w:cs="Calibri"/><w:sz w:val="22"/><w:szCs w:val="22"/><w:lang w:val="de-DE"/></w:rPr></w:rPrDefault><w:pPrDefault><w:pPr><w:spacing w:after="120" w:line="276" w:lineRule="auto"/></w:pPr></w:pPrDefault></w:docDefaults>
<w:style w:type="paragraph" w:default="1" w:styleId="Standard"><w:name w:val="Normal"/><w:qFormat/></w:style>
<w:style w:type="paragraph" w:styleId="Title"><w:name w:val="Title"/><w:basedOn w:val="Standard"/><w:next w:val="Standard"/><w:qFormat/><w:pPr><w:spacing w:after="60"/></w:pPr><w:rPr><w:b/><w:color w:val="1C2340"/><w:sz w:val="48"/><w:szCs w:val="48"/></w:rPr></w:style>
<w:style w:type="paragraph" w:styleId="Subtitle"><w:name w:val="Subtitle"/><w:basedOn w:val="Standard"/><w:next w:val="Standard"/><w:qFormat/><w:pPr><w:pBdr><w:bottom w:val="single" w:sz="8" w:space="6" w:color="3B4FD8"/></w:pBdr><w:spacing w:after="240"/></w:pPr><w:rPr><w:color w:val="5A6275"/><w:sz w:val="21"/></w:rPr></w:style>
<w:style w:type="paragraph" w:styleId="Heading1"><w:name w:val="heading 1"/><w:basedOn w:val="Standard"/><w:next w:val="Standard"/><w:qFormat/><w:pPr><w:keepNext/><w:spacing w:before="360" w:after="120"/><w:outlineLvl w:val="0"/></w:pPr><w:rPr><w:b/><w:color w:val="3B4FD8"/><w:sz w:val="32"/><w:szCs w:val="32"/></w:rPr></w:style>
<w:style w:type="paragraph" w:styleId="Heading2"><w:name w:val="heading 2"/><w:basedOn w:val="Standard"/><w:next w:val="Standard"/><w:qFormat/><w:pPr><w:keepNext/><w:spacing w:before="240" w:after="80"/><w:outlineLvl w:val="1"/></w:pPr><w:rPr><w:b/><w:color w:val="1C2340"/><w:sz w:val="26"/><w:szCs w:val="26"/></w:rPr></w:style>
<w:style w:type="paragraph" w:styleId="Heading3"><w:name w:val="heading 3"/><w:basedOn w:val="Standard"/><w:next w:val="Standard"/><w:qFormat/><w:pPr><w:keepNext/><w:spacing w:before="160" w:after="60"/><w:outlineLvl w:val="2"/></w:pPr><w:rPr><w:b/><w:color w:val="404860"/><w:sz w:val="23"/></w:rPr></w:style>
<w:style w:type="paragraph" w:styleId="Liste"><w:name w:val="Liste Punkte"/><w:basedOn w:val="Standard"/><w:pPr><w:spacing w:after="40"/><w:ind w:left="284"/></w:pPr></w:style>
<w:style w:type="paragraph" w:styleId="Tabelle"><w:name w:val="Tabellentext"/><w:basedOn w:val="Standard"/><w:pPr><w:spacing w:before="40" w:after="40" w:line="252" w:lineRule="auto"/></w:pPr><w:rPr><w:sz w:val="20"/><w:szCs w:val="20"/></w:rPr></w:style>
<w:style w:type="paragraph" w:styleId="Fuss"><w:name w:val="Fusszeile"/><w:basedOn w:val="Standard"/><w:pPr><w:jc w:val="right"/><w:spacing w:after="0"/></w:pPr><w:rPr><w:color w:val="8A90A0"/><w:sz w:val="18"/></w:rPr></w:style>
<w:style w:type="table" w:default="1" w:styleId="NormaleTabelle"><w:name w:val="Normal Table"/><w:tblPr><w:tblInd w:w="0" w:type="dxa"/><w:tblCellMar><w:top w:w="0" w:type="dxa"/><w:left w:w="108" w:type="dxa"/><w:bottom w:w="0" w:type="dxa"/><w:right w:w="108" w:type="dxa"/></w:tblCellMar></w:tblPr></w:style>
<w:style w:type="table" w:styleId="Raster"><w:name w:val="Table Grid"/><w:basedOn w:val="NormaleTabelle"/><w:tblPr><w:tblBorders><w:top w:val="single" w:sz="4" w:space="0" w:color="C5CAD8"/><w:left w:val="single" w:sz="4" w:space="0" w:color="C5CAD8"/><w:bottom w:val="single" w:sz="4" w:space="0" w:color="C5CAD8"/><w:right w:val="single" w:sz="4" w:space="0" w:color="C5CAD8"/><w:insideH w:val="single" w:sz="4" w:space="0" w:color="C5CAD8"/><w:insideV w:val="single" w:sz="4" w:space="0" w:color="C5CAD8"/></w:tblBorders><w:tblCellMar><w:top w:w="40" w:type="dxa"/><w:left w:w="100" w:type="dxa"/><w:bottom w:w="40" w:type="dxa"/><w:right w:w="100" w:type="dxa"/></w:tblCellMar></w:tblPr></w:style>
</w:styles>`;
  const footerXml = t => `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:ftr xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:p><w:pPr><w:pStyle w:val="Fuss"/></w:pPr>${run(t + ' · Seite ')}<w:r><w:fldChar w:fldCharType="begin"/></w:r><w:r><w:instrText xml:space="preserve"> PAGE </w:instrText></w:r><w:r><w:fldChar w:fldCharType="separate"/></w:r><w:r><w:t>1</w:t></w:r><w:r><w:fldChar w:fldCharType="end"/></w:r></w:p></w:ftr>`;
  function docx(B, footer) {
    const media = [];
    const doc = docxXml(B, media);
    const enc = new TextEncoder();
    const files = [
      ['[Content_Types].xml', `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Default Extension="png" ContentType="image/png"/><Default Extension="jpeg" ContentType="image/jpeg"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/><Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/><Override PartName="/word/footer1.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml"/><Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/></Types>`],
      ['_rels/.rels', `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/></Relationships>`],
      ['docProps/core.xml', `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><dc:title>${xesc(footer)}</dc:title><dcterms:modified xsi:type="dcterms:W3CDTF">${new Date().toISOString().slice(0, 19)}Z</dcterms:modified></cp:coreProperties>`],
      ['word/document.xml', doc],
      ['word/styles.xml', STYLES],
      ['word/footer1.xml', footerXml(footer)],
      ['word/_rels/document.xml.rels', `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rIdStyles" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/><Relationship Id="rIdFooter" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/footer" Target="footer1.xml"/>${media.map(m => `<Relationship Id="${m.rId}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="media/${m.name}"/>`).join('')}</Relationships>`]
    ].map(([n, s]) => [n, enc.encode(s)]);
    media.forEach(m => files.push([`word/media/${m.name}`, b64bytes(m.data.split(',')[1])]));
    return zip(files);
  }
  function b64bytes(b64) { const s = atob(b64); const u = new Uint8Array(s.length); for (let i = 0; i < s.length; i++) u[i] = s.charCodeAt(i); return u; }
  // ZIP ohne Kompression („stored“), reicht für Word
  const CRC = (() => { const t = new Uint32Array(256); for (let n = 0; n < 256; n++) { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xEDB88320 ^ (c >>> 1) : c >>> 1; t[n] = c >>> 0; } return t; })();
  const crc32 = u => { let c = 0xFFFFFFFF; for (let i = 0; i < u.length; i++) c = CRC[(c ^ u[i]) & 0xFF] ^ (c >>> 8); return (c ^ 0xFFFFFFFF) >>> 0; };
  function zip(files) {
    const enc = new TextEncoder(), parts = [], central = [];
    let off = 0;
    const d = new Date(), time = (d.getHours() << 11) | (d.getMinutes() << 5) | (d.getSeconds() >> 1), date = ((d.getFullYear() - 1980) << 9) | ((d.getMonth() + 1) << 5) | d.getDate();
    files.forEach(([name, data]) => {
      const nb = enc.encode(name), crc = crc32(data);
      const h = new DataView(new ArrayBuffer(30));
      h.setUint32(0, 0x04034b50, true); h.setUint16(4, 20, true); h.setUint16(6, 0x0800, true); h.setUint16(8, 0, true);
      h.setUint16(10, time, true); h.setUint16(12, date, true); h.setUint32(14, crc, true);
      h.setUint32(18, data.length, true); h.setUint32(22, data.length, true); h.setUint16(26, nb.length, true); h.setUint16(28, 0, true);
      parts.push(new Uint8Array(h.buffer), nb, data);
      const c = new DataView(new ArrayBuffer(46));
      c.setUint32(0, 0x02014b50, true); c.setUint16(4, 20, true); c.setUint16(6, 20, true); c.setUint16(8, 0x0800, true); c.setUint16(10, 0, true);
      c.setUint16(12, time, true); c.setUint16(14, date, true); c.setUint32(16, crc, true); c.setUint32(20, data.length, true); c.setUint32(24, data.length, true);
      c.setUint16(28, nb.length, true); c.setUint16(30, 0, true); c.setUint16(32, 0, true); c.setUint16(34, 0, true); c.setUint16(36, 0, true); c.setUint32(38, 0, true); c.setUint32(42, off, true);
      central.push(new Uint8Array(c.buffer), nb);
      off += 30 + nb.length + data.length;
    });
    const cdSize = central.reduce((a, p) => a + p.length, 0);
    const e = new DataView(new ArrayBuffer(22));
    e.setUint32(0, 0x06054b50, true); e.setUint16(8, files.length, true); e.setUint16(10, files.length, true); e.setUint32(12, cdSize, true); e.setUint32(16, off, true);
    const all = parts.concat(central, [new Uint8Array(e.buffer)]);
    const out = new Uint8Array(all.reduce((a, p) => a + p.length, 0));
    let p = 0; all.forEach(x => { out.set(x, p); p += x.length; });
    return out;
  }

  // ------------------------------------------------------------ Export-Aktionen
  function download(name, data, type) {
    const url = URL.createObjectURL(new Blob([data], { type }));
    const a = document.createElement('a'); a.href = url; a.download = name; document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 4000);
  }
  function toast(msg) {
    const t = document.createElement('div'); t.className = 'pj-toast'; t.textContent = msg; document.body.appendChild(t);
    requestAnimationFrame(() => t.classList.add('in'));
    setTimeout(() => { t.classList.remove('in'); setTimeout(() => t.remove(), 400); }, 2600);
  }
  const fileBase = P => `projekttagebuch-${P.id}-${todayKey()}`;
  async function doExport(kind, P) {
    flushAll();
    const M = build(P);
    if (kind === 'json') {
      const st = stored(P.id), values = {};
      Object.keys(st).forEach(k => { values[k] = st[k].v; });
      download(`${fileBase(P)}.json`, JSON.stringify({ format: 'lernraum-projekttagebuch', version: 1, projekt: P.id, exportiert: new Date().toISOString(), values }, null, 1), 'application/json');
      return toast('Sicherung gespeichert');
    }
    const imgs = kind === 'md' || kind === 'copy' ? {} : await images(M);
    const B = docBlocks(P, M, imgs);
    if (kind === 'md') { download(`${fileBase(P)}.md`, docMd(B), 'text/markdown;charset=utf-8'); return toast('Markdown gespeichert'); }
    if (kind === 'copy') {
      const txt = docMd(B);
      try { await navigator.clipboard.writeText(txt); toast('In die Zwischenablage kopiert'); }
      catch (e) { A.openSheet(`${A.sheetHead('Zum Kopieren')}<textarea class="work" style="min-height:50vh" readonly>${esc(txt)}</textarea>`); }
      return;
    }
    if (kind === 'docx') { download(`${fileBase(P)}.docx`, docx(B, `Projekttagebuch ${P.titel}`), 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'); return toast('Word-Datei gespeichert'); }
    if (kind === 'pdf') {
      const box = $('[data-doc]'); if (box) box.innerHTML = docHtml(B);
      document.body.classList.add('pj-print');
      const done = () => { document.body.classList.remove('pj-print'); removeEventListener('afterprint', done); };
      addEventListener('afterprint', done);
      setTimeout(() => window.print(), 60);
    }
  }
  async function doImport(file, P) {
    try {
      const j = JSON.parse(await file.text());
      if (!j || j.format !== 'lernraum-projekttagebuch' || typeof j.values !== 'object') throw new Error('Format');
      if (j.projekt !== P.id && !confirm(`Die Sicherung gehört zum Projekt „${j.projekt}“. Trotzdem einlesen?`)) return;
      const st = stored(P.id); let n = 0;
      Object.keys(j.values).forEach(k => {
        if (!/^(f|ziel|plan|bsp|st|ki|e)\./.test(k)) return;
        const v = j.values[k];
        if (!st[k] || JSON.stringify(st[k].v) !== JSON.stringify(v)) { A.LR.log('pj', P.id, { k, v }); n++; }
      });
      toast(n ? `${n} Felder eingelesen` : 'Nichts Neues in der Sicherung');
      A.rerender();
    } catch (e) { toast('Diese Datei ist keine Projekttagebuch-Sicherung'); }
  }

  // ------------------------------------------------------------ Seite
  function view(pid) {
    const P = (window.LR_PROJEKTE || {})[pid || 'zange'] || (window.LR_PROJEKTE || {}).zange;
    if (!P) return { title: 'Projekttagebuch', back: '#/faecher', nav: 'faecher', html: '<div class="empty">Kein Projekt gefunden.</div>' };
    curPid = P.id;
    const M = build(P); cur = { P, M };
    const s = A.byId[P.fach];
    const tab = TABS.some(t => t[0] === A.state.pjTab) ? A.state.pjTab : 'start';
    const days = daysTo(P.praesentation);
    const zd = M.ziel.filter(z => z.done).length;
    const crumbs = `<nav class="crumbs" aria-label="Pfad"><a href="#/faecher">Fächer</a><span>›</span><a href="#/fach/${P.fach}">${esc(s ? s.name.replace(/ (eA|gA)$/, '') : P.fach)}</a><span>›</span><b>Projekttagebuch</b></nav>`;
    const hero = `<header class="pj-hero">
        <div class="pj-hero-txt"><span class="kicker">Projekttagebuch · ${esc(P.kurs)}</span><h2 class="h-display">${esc(P.titel)}</h2><p class="muted">${esc(P.untertitel)}</p>
          <div class="pj-save" data-pjsave data-st="ok"><span class="pj-dot"></span><span>Alles gespeichert</span></div></div>
        ${heroCards()}
        <div class="pj-stats">
          <div class="pj-stat"><b>${days == null ? '–' : days < 0 ? '✓' : days}</b><span>${days === 0 ? 'Präsentation heute' : days < 0 ? 'präsentiert' : `Tage bis zur Präsentation (${dShort(P.praesentation)})`}</span></div>
          <div class="pj-stat pj-stat-ring">${ring(zd, M.ziel.length)}<div><b>${zd}/${M.ziel.length}</b><span>Teilziele</span></div></div>
          <div class="pj-stat"><b>${M.entries.length}</b><span>Protokolle</span></div>
        </div>
      </header>`;
    const body = tab === 'protokolle' ? tabProtokolle(P, M) : tab === 'ergebnisse' ? tabErgebnisse(P, M) : tab === 'reflexion' ? tabReflexion(P, M) : tab === 'export' ? tabExport(P, M) : tabStart(P, M);
    return {
      title: 'Projekttagebuch', back: `#/fach/${P.fach}`, nav: 'faecher',
      html: `<div class="pjx" ${A.subjStyle(s)}>${crumbs}${hero}<div class="pj-tabs">${A.seg('pjtab', TABS, tab, true)}</div><div class="pj-body pj-t-${tab}">${body}</div></div>`,
      after(root) { bind(root, P, tab); }
    };
  }

  const AUTO = typeof CSS !== 'undefined' && CSS.supports && CSS.supports('field-sizing', 'content'); // Browser passt die Höhe selbst an
  function grow(el) { if (AUTO) return; el.style.height = 'auto'; el.style.height = el.scrollHeight + 2 + 'px'; }
  let rz = null;
  if (typeof addEventListener === 'function') addEventListener('resize', () => { clearTimeout(rz); rz = setTimeout(() => $$('.pjx textarea.pj-area').forEach(grow), 150); });
  function rerender() { flushAll(); A.rerender(); }

  function bind(root, P, tab) {
    const box = $('.pjx', root); if (!box) return;
    $$('textarea.pj-area', box).forEach(grow);
    // Fokus nach einem Neuzeichnen (z. B. Sync) wiederherstellen
    if (focusSel && Date.now() - lastEdit < 8000) {
      const el = $(focusSel.sel, box);
      if (el) { el.focus({ preventScroll: true }); try { el.setSelectionRange(focusSel.a, focusSel.b); } catch (e) { /* egal */ } }
    }
    box.addEventListener('focusin', e => {
      const el = e.target, a = ['data-f', 'data-r', 'data-e', 'data-em'].find(x => el.hasAttribute && el.hasAttribute(x));
      focusSel = a ? { sel: `[${a}="${el.getAttribute(a)}"]`, a: el.selectionStart || 0, b: el.selectionEnd || 0 } : null;
    });
    box.addEventListener('focusout', () => flushAll());
    const onEdit = ev => {
      const el = ev.target;
      if (!el.matches('[data-f],[data-r],[data-e],[data-em]')) return;
      if (el.tagName === 'TEXTAREA') grow(el);
      let v = el.type === 'checkbox' ? el.checked : el.value;
      if (focusSel) { focusSel.a = el.selectionStart || 0; focusSel.b = el.selectionEnd || 0; }
      const lim = el.dataset.r ? MAX_ROW : MAX;
      if (typeof v === 'string' && v.length > lim) { v = v.slice(0, lim); el.value = v; toast(`Höchstens ${lim} Zeichen pro Feld`); }
      if (el.dataset.f) put('f.' + el.dataset.f, v);
      else if (el.dataset.r) {
        const [pre, id, f] = el.dataset.r.split('|'); const r = cur.M.idx[pre][id]; if (!r) return;
        r[f] = v; putRow(pre, r);
        if (el.type === 'checkbox' || el.type === 'date') { rerender(); return; }
      } else if (el.dataset.e) {
        const [id, f] = el.dataset.e.split('|'); put(`e.${id}.${f}`, v);
        const e = cur.M.ent[id]; if (e) { e[f] = v; const n = filled(e), m = $(`[data-meter="${id}"]`, box); if (m) { m.firstElementChild.style.setProperty('--p', (n / EF.length * 100).toFixed(0) + '%'); m.lastElementChild.textContent = `${n} von ${EF.length} Feldern`; } }
      } else if (el.dataset.em) {
        const [id, f] = el.dataset.em.split('|'); const e = cur.M.ent[id]; if (!e) return;
        e[f] = v; putMeta(e); if (ev.type === 'change') rerender();
      }
    };
    box.addEventListener('input', e => { if (!e.target.matches('input[type=checkbox],input[type=date]')) onEdit(e); });
    box.addEventListener('change', e => { if (e.target.matches('input[type=checkbox],input[type=date]')) onEdit(e); });

    box.addEventListener('click', async e => {
      const t = e.target.closest('button,a,[data-jump]'); if (!t) return;
      if (t.dataset.jump) { e.preventDefault(); const el = document.getElementById(t.dataset.jump); if (el) { el.scrollIntoView({ behavior: A.reduced ? 'auto' : 'smooth', block: 'start' }); const tas = $$('textarea', el), ta = tas.find(x => !x.value.trim()) || tas[tas.length - 1]; if (ta) setTimeout(() => { ta.focus({ preventScroll: true }); const n = ta.value.length; ta.setSelectionRange(n, n); }, 300); } return; }
      if (t.dataset.cycle) {
        const r = cur.M.idx.plan[t.dataset.cycle]; if (!r) return;
        r.status = STATUS[(Math.max(0, STATUS.indexOf(r.status)) + 1) % STATUS.length]; putRow('plan', r); rerender(); return;
      }
      if (t.dataset.add) {
        const pre = t.dataset.add, list = cur.M[pre], id = rid();
        const ord = list.reduce((a, r) => Math.max(a, r.ord || 0), 0) + 1;
        const blank = { ziel: { text: '', done: false }, plan: { datum: todayKey(), art: 'DS', text: '', ziel: '', status: 'offen' }, bsp: { sit: '', ein: '', erw: '' }, st: { name: '', was: '', stand: '' }, ki: { bereich: '', wer: '' } }[pre];
        put(`${pre}.${id}`, Object.assign({ ord }, blank)); rerender();
        requestAnimationFrame(() => { const el = $(`[data-r^="${pre}|${id}|"]:not([type=checkbox])`); if (el) el.focus(); });
        return;
      }
      if (t.dataset.delrow) {
        const [pre, id] = t.dataset.delrow.split('|'); const r = cur.M.idx[pre][id]; if (!r) return;
        const txt = r.text || r.name || r.sit || r.bereich || '';
        if (txt.trim() && !confirm(`„${txt.slice(0, 60)}“ löschen?`)) return;
        r.del = true; putRow(pre, r); if (pre === 'st') IDB.del(imgKey(id)).catch(() => {}); rerender(); return;
      }
      if (t.dataset.art) {
        const [id, a] = t.dataset.art.split('|'); const en = cur.M.ent[id]; if (!en) return;
        en.art = a; putMeta(en); rerender(); return;
      }
      if (t.dataset.delentry) {
        const en = cur.M.ent[t.dataset.delentry]; if (!en) return;
        if (filled(en) && !confirm(`Eintrag vom ${dLong(en.datum)} löschen?`)) return;
        en.del = true; put('e.' + en.id, { datum: en.datum, art: en.art, created: en.created || 0, del: true }); rerender(); return;
      }
      if (t.hasAttribute('data-newentry')) {
        let datum = todayKey();
        if (t.dataset.newentry === 'other') {
          const inp = prompt('Datum des Eintrags (TT.MM.JJJJ):', `${dShort(datum)}${datum.slice(0, 4)}`); if (!inp) return;
          const m = inp.trim().match(/^(\d{1,2})\.(\d{1,2})\.(\d{4})$/); if (!m) { toast('Bitte als TT.MM.JJJJ eingeben'); return; }
          datum = `${m[3]}-${pad(+m[2])}-${pad(+m[1])}`;
        }
        const id = rid(), pl = cur.M.plan.find(p => p.datum === datum);
        put('e.' + id, { datum, art: pl && /HA/.test(pl.art) && !/DS/.test(pl.art) ? 'HA' : 'DS', created: Date.now() });
        if (pl && pl.text) put(`e.${id}.ziel`, pl.text);
        rerender();
        requestAnimationFrame(() => { const el = document.getElementById('pje-' + id); if (el) { el.scrollIntoView({ block: 'start' }); const ta = $(`[data-e="${id}|geschafft"]`, el); if (ta) ta.focus({ preventScroll: true }); } });
        return;
      }
      if (t.dataset.export) { t.disabled = true; try { await doExport(t.dataset.export, P); } finally { t.disabled = false; } return; }
      if (t.dataset.rmimg) { await IDB.del(imgKey(t.dataset.rmimg)); rerender(); return; }
    });
    // Bilder
    $$('[data-upload]', box).forEach(inp => inp.addEventListener('change', async () => {
      const f = inp.files && inp.files[0]; if (!f) return;
      try { await IDB.put(imgKey(inp.dataset.upload), await loadImage(f)); toast('Bild gespeichert (nur auf diesem Gerät)'); rerender(); }
      catch (e) { toast('Das Bild konnte nicht gelesen werden'); }
    }));
    $$('[data-img]', box).forEach(async el => {
      const v = await IDB.get(imgKey(el.dataset.img)).catch(() => null);
      if (!v) return;
      el.innerHTML = `<img src="${v.data}" alt="Struktogramm">`;
      const rm = $(`[data-rmimg="${el.dataset.img}"]`, box); if (rm) rm.hidden = false;
    });
    const imp = $('[data-import]', box);
    if (imp) imp.addEventListener('change', () => { const f = imp.files && imp.files[0]; if (f) doImport(f, P); imp.value = ''; });
    if (tab === 'export') images(cur.M).then(imgs => { const d = $('[data-doc]', box); if (d && Object.keys(imgs).length) d.innerHTML = docHtml(docBlocks(P, cur.M, imgs)); });
  }

  window.LRProjekt = {
    init(app) {
      A = app; A.R.projekt = view;
      A.view.addEventListener('click', e => {
        const b = e.target.closest('.seg[data-seg="pjtab"] button'); if (!b) return;
        flushAll(); A.state.pjTab = b.dataset.v; A.save();
      }, true);
      addEventListener('pagehide', flushAll);
      document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden') flushAll(); });
      addEventListener('hashchange', flushAll, true);
    },
    has: fid => Object.values(window.LR_PROJEKTE || {}).some(p => p.fach === fid),
    list: fid => Object.values(window.LR_PROJEKTE || {}).filter(p => p.fach === fid),
    _t: { docBlocks, docMd, docx, zip, crc32, build }
  };
})();
