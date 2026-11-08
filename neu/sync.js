/* ==========================================================================
   SYNC – Bauschritt S7 (Portalplan Abschnitt 10)
   Ende-zu-Ende-verschlüsselt, ohne Konto, ohne Passwort, ohne persönliche Daten:
   - Sync-Code: 200 Bit Zufall (8 Gruppen à 5 Zeichen). Wird NICHT gespeichert, nur einmal gezeigt
     (auf Papier aufschreiben). Daraus leitet der Browser per HKDF-SHA-256 ab:
       Postfach-Id (128 Bit) · Schreibschlüssel (256 Bit, nur als Hash beim Server) ·
       Datenschlüssel (AES-256-GCM, NICHT exportierbar, liegt nur in IndexedDB dieses Geräts).
   - Jedes Ereignis und der Zustand werden einzeln verschlüsselt (zufälliger IV, Postfach-Id als
     Zusatzdaten). Der Server sieht nur Kauderwelsch. Gleiche Ereignisse = Vereinigung nach id.
   - „Alle Geräte abmelden“: neuer Code, alles neu verschlüsselt, altes Postfach gelöscht.
   ========================================================================== */
(function () {
  'use strict';
  const SYNC_URL = 'https://lernraum-sync.wraithai.workers.dev'; // nach dem Einrichten gesetzt (keine Geheimnisse)
  const SALT = 'lernraum-sync-v1';
  const ALPH = '0123456789ABCDEFGHJKMNPQRSTVWXYZ'; // Crockford Base32: ohne I, L, O, U (keine Verwechslungen)
  const CODE_BYTES = 25;                           // 200 Bit → 40 Zeichen
  const LOCAL_ONLY = ['session', 'planTab', 'week', 'day', 'last', 'probeRun'];
  const te = new TextEncoder(), td = new TextDecoder();
  const C = (typeof window !== 'undefined' && window.crypto) || globalThis.crypto;
  let A = null;

  // ------------------------------------------------------------ Kodierung
  function b32enc(bytes) {
    let bits = 0, val = 0, out = '';
    for (const b of bytes) { val = (val << 8) | b; bits += 8; while (bits >= 5) { out += ALPH[(val >>> (bits - 5)) & 31]; bits -= 5; } val &= (1 << bits) - 1; }
    if (bits > 0) out += ALPH[(val << (5 - bits)) & 31];
    return out;
  }
  function b32dec(str) {
    const s = String(str || '').toUpperCase().replace(/O/g, '0').replace(/[IL]/g, '1').replace(/[^0-9A-Z]/g, '');
    if (s.length !== CODE_BYTES * 8 / 5) return null;
    let bits = 0, val = 0; const out = [];
    for (const ch of s) {
      const i = ALPH.indexOf(ch); if (i < 0) return null;
      val = (val << 5) | i; bits += 5;
      if (bits >= 8) { out.push((val >>> (bits - 8)) & 255); bits -= 8; val &= (1 << bits) - 1; }
    }
    return out.length === CODE_BYTES ? new Uint8Array(out) : null;
  }
  const fmtCode = s => s.match(/.{1,5}/g).join('-');
  const hex = buf => Array.from(new Uint8Array(buf), b => b.toString(16).padStart(2, '0')).join('');
  const b64 = bytes => { let s = ''; bytes.forEach(b => { s += String.fromCharCode(b); }); return btoa(s); };
  const unb64 = s => Uint8Array.from(atob(s), ch => ch.charCodeAt(0));
  const b64url = buf => b64(new Uint8Array(buf)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

  // ------------------------------------------------------------ Schlüssel & Verschlüsselung
  function newCode() { const b = new Uint8Array(CODE_BYTES); C.getRandomValues(b); return b32enc(b); }
  async function derive(codeStr) {
    const raw = b32dec(codeStr);
    if (!raw) throw new Error('code');
    const base = await C.subtle.importKey('raw', raw, 'HKDF', false, ['deriveBits', 'deriveKey']);
    const hk = info => ({ name: 'HKDF', hash: 'SHA-256', salt: te.encode(SALT), info: te.encode(info) });
    const box = hex(await C.subtle.deriveBits(hk('box'), base, 128));
    const token = b64url(await C.subtle.deriveBits(hk('auth'), base, 256));
    const key = await C.subtle.deriveKey(hk('data'), base, { name: 'AES-GCM', length: 256 }, false, ['encrypt', 'decrypt']);
    return { box, token, key };
  }
  async function enc(key, box, obj) {
    const iv = C.getRandomValues(new Uint8Array(12));
    const ct = new Uint8Array(await C.subtle.encrypt({ name: 'AES-GCM', iv, additionalData: te.encode(box) }, key, te.encode(JSON.stringify(obj))));
    const out = new Uint8Array(12 + ct.length); out.set(iv); out.set(ct, 12);
    return b64(out);
  }
  async function dec(key, box, s) {
    const all = unb64(s);
    const pt = await C.subtle.decrypt({ name: 'AES-GCM', iv: all.slice(0, 12), additionalData: te.encode(box) }, key, all.slice(12));
    return JSON.parse(td.decode(pt));
  }
  async function sha(s) { return hex(await C.subtle.digest('SHA-256', te.encode(s))); }

  // ------------------------------------------------------------ Gerätespeicher (IndexedDB, pro Profil)
  let dbp = null;
  function db() {
    if (!dbp) dbp = new Promise((res, rej) => {
      const r = indexedDB.open('lernraum-sync', 1);
      r.onupgradeneeded = () => r.result.createObjectStore('conf', { keyPath: 'pid' });
      r.onsuccess = () => res(r.result); r.onerror = () => rej(r.error);
    });
    return dbp;
  }
  const tx = async (mode, fn) => { const d = await db(); return new Promise((res, rej) => { const t = d.transaction('conf', mode); const q = fn(t.objectStore('conf')); t.oncomplete = () => res(q && q.result); t.onerror = () => rej(t.error); }); };
  const getConf = pid => tx('readonly', s => s.get(pid)).catch(() => null);
  const putConf = c => tx('readwrite', s => s.put(c));
  const delConf = pid => tx('readwrite', s => s.delete(pid));

  // ------------------------------------------------------------ Server
  async function api(method, path, body, token) {
    return fetch(SYNC_URL + path, { method, cache: 'no-store', credentials: 'omit', referrerPolicy: 'no-referrer', headers: Object.assign({ Authorization: 'Bearer ' + token }, body ? { 'Content-Type': 'application/json' } : {}), body: body ? JSON.stringify(body) : undefined });
  }
  async function pushEvents(c, list) { // in Paketen bis ~40 KB
    let pack = [], size = 0;
    const flush = async () => {
      if (!pack.length) return;
      const r = await api('POST', `/v1/box/${c.box}`, { events: pack }, c.token);
      if (!r.ok) throw new Error('push ' + r.status);
      pack = []; size = 0;
    };
    for (const e of list) {
      const item = { id: e.id, c: await enc(c.key, c.box, e) };
      if (size + item.c.length > 40000 || pack.length >= 150) await flush();
      pack.push(item); size += item.c.length;
    }
    await flush();
  }

  // ------------------------------------------------------------ Zustand (Lektionen verstanden, Punkte, Pläne …)
  function snapshot() {
    const s = {};
    Object.keys(A.state).forEach(k => { if (!LOCAL_ONLY.includes(k)) s[k] = A.state[k]; });
    const me = A.LR.active();
    if (me) s._profile = { name: me.name, courses: me.courses };
    return s;
  }
  function mergeState(remote, adopt) {
    const s = A.state;
    Object.keys(remote || {}).forEach(k => {
      const v = remote[k];
      if (k === '_profile') { if (adopt && v && v.name) { const me = A.LR.active(); if (me) A.LR.updateProfile(me.id, { name: v.name, courses: v.courses || [] }); } return; }
      if (LOCAL_ONLY.includes(k)) return;
      if (k === 'done') { s.done = Object.assign({}, v, s.done); return; }
      if (k === 'scores') { s.scores = s.scores || {}; Object.keys(v || {}).forEach(p => { s.scores[p] = Math.max(v[p], s.scores[p] == null ? -1 : s.scores[p]); }); return; }
      const empty = s[k] == null || (typeof s[k] === 'object' && !Array.isArray(s[k]) && !Object.keys(s[k]).length);
      if (empty) { s[k] = v; return; }
      if (Array.isArray(v) && Array.isArray(s[k])) { const seen = new Set(s[k].map(x => JSON.stringify(x))); v.forEach(x => { if (!seen.has(JSON.stringify(x))) s[k].push(x); }); return; }
      if (v && typeof v === 'object' && typeof s[k] === 'object') s[k] = Object.assign({}, v, s[k]); // pro Schlüssel gewinnt dieses Gerät
    });
    A.save();
  }

  // ------------------------------------------------------------ Abgleich
  let running = false, again = false, status = 'off', lastErr = '';
  function setStatus(st) {
    status = st;
    document.querySelectorAll('[data-sync]').forEach(el => { el.dataset.sync = st; el.title = { ok: 'Geräte abgeglichen', busy: 'Gleiche ab …', error: 'Abgleich gerade nicht möglich', revoked: 'Dieses Gerät wurde abgemeldet', off: '' }[st] || ''; });
  }
  async function sync() {
    const pid = A.LR.activeId();
    if (!pid || /WIRD-GESETZT/.test(SYNC_URL)) return;
    if (running) { again = true; return; }
    running = true;
    let changed = false;
    try {
      const c = await getConf(pid);
      if (!c) { setStatus('off'); return; }
      if (c.revoked) { setStatus('revoked'); return; }
      setStatus('busy');
      // 1) Holen
      let since = c.cursor || 0, more = true, guard = 0, remoteState = null;
      const got = [];
      while (more && guard++ < 40) {
        const r = await api('GET', `/v1/box/${c.box}?since=${since}&st=${c.st || 0}`, null, c.token);
        if (r.status === 401 || r.status === 404) {
          if (c.created) { c.revoked = true; await putConf(c); setStatus('revoked'); A.rerender(); return; }
          break; // neues Postfach, noch leer
        }
        if (!r.ok) throw new Error('get ' + r.status);
        const j = await r.json();
        for (const e of j.events) { try { got.push(await dec(c.key, c.box, e.c)); } catch (x) { /* fremdes/kaputtes Paket: ignorieren */ } }
        since = j.next; more = j.more;
        if (j.state && !remoteState) remoteState = j.state;
      }
      const sent = new Set(c.sent || []);
      if (got.length) { if (A.LR.merge(pid, got)) changed = true; got.forEach(e => sent.add(e.id)); }
      if (remoteState && remoteState.t > (c.st || 0)) {
        try { mergeState(await dec(c.key, c.box, remoteState.c), c.adopt); c.st = remoteState.t; c.adopt = false; changed = true; } catch (x) { /* egal */ }
      }
      c.cursor = since;
      // 2) Senden: eigene neue Ereignisse
      const fresh = A.LR.events(pid).filter(e => !sent.has(e.id));
      if (fresh.length) { await pushEvents(c, fresh); fresh.forEach(e => sent.add(e.id)); c.created = true; }
      c.sent = Array.from(sent);
      // 3) Senden: Zustand, wenn er sich geändert hat
      const snap = snapshot(), h = await sha(JSON.stringify(snap));
      if (h !== c.stHash) {
        const t = Date.now();
        const r = await api('POST', `/v1/box/${c.box}`, { events: [], state: { t, c: await enc(c.key, c.box, snap) } }, c.token);
        if (!r.ok) throw new Error('state ' + r.status);
        c.stHash = h; c.st = Math.max(c.st || 0, t); c.created = true; // spätestens hier existiert das Postfach
      }
      c.last = Date.now();
      await putConf(c);
      setStatus('ok'); lastErr = '';
      if (changed) A.rerender();
    } catch (e) {
      lastErr = String(e && e.message || e); setStatus('error');
    } finally {
      running = false;
      if (again) { again = false; setTimeout(sync, 400); }
    }
  }
  let timer = null;
  const soon = (ms = 4000) => { clearTimeout(timer); timer = setTimeout(sync, ms); };

  // ------------------------------------------------------------ Einrichten, verbinden, abmelden
  async function connect(code, opts = {}) {
    const pid = A.LR.activeId();
    const k = await derive(code);
    if (opts.existing) {
      const r = await api('GET', `/v1/box/${k.box}?since=0&st=0`, null, k.token);
      if (r.status === 404) throw new Error('unbekannt');
      if (!r.ok) throw new Error('server ' + r.status);
    }
    await putConf({ pid, box: k.box, token: k.token, key: k.key, cursor: 0, st: 0, sent: [], created: !!opts.existing, adopt: !!opts.adopt, since: Date.now() });
    await sync();
  }
  async function rotate() { // „Alle Geräte abmelden“: neues Postfach, alles neu verschlüsselt, altes gelöscht
    const pid = A.LR.activeId();
    const old = await getConf(pid);
    const code = newCode();
    const k = await derive(code);
    const c = { pid, box: k.box, token: k.token, key: k.key, cursor: 0, st: 0, sent: [], created: false, since: Date.now() };
    await pushEvents(c, A.LR.events(pid));
    c.created = true; c.sent = A.LR.events(pid).map(e => e.id);
    await putConf(c);
    if (old && old.box) { try { await api('DELETE', `/v1/box/${old.box}`, null, old.token); } catch (e) { /* egal: neues Postfach gilt */ } }
    await sync();
    return code;
  }
  const disconnect = () => delConf(A.LR.activeId()).then(() => setStatus('off'));

  // ------------------------------------------------------------ Seite #/sync
  let shownCode = null; // nur im Arbeitsspeicher, solange die Seite offen ist
  function codeBox(code) {
    return `<div class="code-box" aria-label="Sync-Code">${fmtCode(code).split('-').map(g => `<span>${g}</span>`).join('')}</div>`;
  }
  function view(arg) {
    const { icon, esc } = A;
    const pid = A.LR.activeId();
    const me = A.LR.active();
    const head = `<div class="page-head"><span class="kicker">Geräte verbinden</span><h2 class="h-display">Überall dein Stand.</h2>
      <p class="muted">iPad, Handy und Laptop zeigen denselben Fortschritt. Ohne Konto und ohne Passwort: ein Sync-Code auf Papier reicht.</p></div>`;
    const how = `<details class="sync-how"><summary>${icon('shield')}Wie sicher ist das?</summary><ul>
        <li>Alles wird <b>auf deinem Gerät verschlüsselt</b> (AES-256), bevor es das Gerät verlässt. Der Server speichert nur Zeichensalat.</li>
        <li>Der Schlüssel entsteht aus deinem Sync-Code und verlässt dein Gerät nie. Auch wer die Datenbank kopiert, kann nichts lesen oder ändern.</li>
        <li>Keine E-Mail, kein Name, kein Passwort. Den Code gibt es nur auf deinem Zettel.</li>
        <li>Profile bleiben getrennt: Jedes Profil hat sein eigenes Postfach. Freunde sehen nichts von dir.</li>
        <li>Grenzen: Wer dein entsperrtes Gerät oder deinen Zettel hat, kommt an deinen Lernstand. Dann: „Alle Geräte abmelden“.</li></ul></details>`;
    const page = html => ({ title: 'Geräte verbinden', back: '#/', nav: 'heute', focus: true, html: `<div class="rise sync">${head}${html}${how}</div>`, after: bind });
    if (/WIRD-GESETZT/.test(SYNC_URL)) return page(`<div class="notice">${icon('info')}<div>Der Sync-Server ist noch nicht eingerichtet. Das passiert gerade in Bauschritt S7.</div></div>`);
    if (arg === 'code' && shownCode) {
      return page(`<section class="card sync-card"><span class="kicker">Dein Sync-Code</span><h3 class="h-2">Jetzt auf Papier schreiben</h3>
        <p class="row-sub">Der Code wird nicht gespeichert und nicht noch einmal angezeigt. Mit ihm verbindest du weitere Geräte. Leg den Zettel zu deinen Schulsachen.</p>
        ${codeBox(shownCode)}
        <label class="sync-ok"><input type="checkbox" id="wrote"> Ich habe den Code aufgeschrieben und noch einmal verglichen.</label>
        <button class="btn primary block" type="button" data-sdone disabled>${icon('check')}Fertig</button></section>`);
    }
    return { title: 'Geräte verbinden', back: '#/', nav: 'heute', focus: true, html: `<div class="rise sync">${head}<div id="syncBody"><div class="empty">Lade …</div></div>${how}</div>`, after: root => draw(root, arg) };
    async function draw(root, a) {
      const c = await getConf(pid);
      const body = root.querySelector('#syncBody'); if (!body) return;
      if (c && !c.revoked) {
        const n = A.LR.events(pid).length;
        body.innerHTML = `<section class="card sync-card"><div class="sync-state"><span class="sdot" data-sync="${status}"></span><div class="row-main"><span class="row-title">Verbunden</span><span class="row-sub">Profil „${esc(me.name)}“ · ${n} Lernaktionen · ${c.last ? `zuletzt abgeglichen ${new Date(c.last).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })} Uhr` : 'noch nicht abgeglichen'}${status === 'error' ? ' · Abgleich gerade nicht möglich (offline?)' : ''}</span></div></div>
          <button class="btn primary block" type="button" data-snow>${icon('flip')}Jetzt abgleichen</button></section>
          <section class="card sync-card"><h3 class="h-2">Weiteres Gerät verbinden</h3><p class="row-sub">Auf dem neuen Gerät: Lernraum öffnen → „Geräte verbinden“ → Code von deinem Zettel eingeben.</p></section>
          <section class="card sync-card"><h3 class="h-2">Zettel verloren oder Gerät weg?</h3><p class="row-sub">Erzeugt einen neuen Code. Alle anderen Geräte werden abgemeldet und brauchen den neuen Code. Dein Lernstand bleibt.</p>
            <button class="btn block" type="button" data-srot>${icon('shield')}Alle Geräte abmelden, neuer Code</button>
            <button class="link small danger" type="button" data-soff>Nur dieses Gerät trennen (Daten bleiben hier)</button></section>`;
      } else {
        body.innerHTML = `${c && c.revoked ? `<div class="notice warnbox">${icon('alert')}<div>Dieses Gerät wurde abgemeldet, weil auf einem anderen Gerät ein neuer Code erzeugt wurde. Gib den neuen Code ein.</div></div>` : ''}
          <section class="card sync-card"><h3 class="h-2">Du hast schon einen Sync-Code?</h3><p class="row-sub">Dann verbindest du dieses Gerät mit deinem Fortschritt.</p>
            <input class="input code-in" id="codeIn" autocomplete="off" autocapitalize="characters" spellcheck="false" placeholder="XXXXX-XXXXX-XXXXX-…" maxlength="60">
            <p class="row-sub err" id="codeErr" hidden></p>
            <button class="btn primary block" type="button" data-sjoin>${icon('arrow')}Verbinden</button></section>
          <section class="card sync-card"><h3 class="h-2">Erstes Gerät?</h3><p class="row-sub">Erzeugt deinen Sync-Code und lädt deinen Fortschritt verschlüsselt hoch.</p>
            <button class="btn block" type="button" data-snew>${icon('shield')}Sync einrichten</button></section>`;
        const ci = body.querySelector('#codeIn');
        ci.addEventListener('input', () => { const raw = ci.value.toUpperCase().replace(/[^0-9A-Z]/g, '').slice(0, 40); ci.value = raw.match(/.{1,5}/g) ? raw.match(/.{1,5}/g).join('-') : ''; });
        if (a === 'code' || a === 'join') ci.focus();
      }
    }
    function bind(root) {
      const box = root.querySelector('#wrote');
      if (box) box.addEventListener('change', () => { root.querySelector('[data-sdone]').disabled = !box.checked; });
    }
  }

  function wire() {
    document.addEventListener('click', async e => {
      const t = e.target;
      if (t.closest('[data-snow]')) { await sync(); A.rerender(); return; }
      if (t.closest('[data-snew]')) {
        const b = t.closest('[data-snew]'); b.disabled = true;
        try { const code = newCode(); await connect(code, {}); shownCode = code; location.hash = '#/sync/code'; }
        catch (x) { b.disabled = false; LRTreppe.kit.toast('Einrichten hat nicht geklappt. Bist du online?'); }
        return;
      }
      if (t.closest('[data-sjoin]')) {
        const ci = document.getElementById('codeIn'), err = document.getElementById('codeErr');
        const raw = ci.value;
        if (!b32dec(raw)) { err.hidden = false; err.textContent = 'Der Code hat 8 Gruppen à 5 Zeichen. Bitte genau vergleichen.'; return; }
        const b = t.closest('[data-sjoin]'); b.disabled = true;
        try {
          let adopt = false; try { adopt = sessionStorage.getItem('lr:adopt') === '1'; sessionStorage.removeItem('lr:adopt'); } catch (x) { /* egal */ }
          await connect(raw, { existing: true, adopt });
          ci.value = '';
          LRTreppe.kit.toast('Verbunden. Dein Fortschritt ist da.');
          location.hash = '#/';
          setTimeout(() => location.reload(), 300);
        } catch (x) {
          b.disabled = false; err.hidden = false;
          err.textContent = String(x.message) === 'unbekannt' ? 'Diesen Code kennt der Server nicht. Tippfehler? (0 und O, 1 und I werden gleich behandelt.)' : 'Verbinden hat nicht geklappt. Bist du online?';
        }
        return;
      }
      if (t.closest('[data-sdone]')) { shownCode = null; location.hash = '#/'; return; }
      if (t.closest('[data-srot]')) {
        if (!confirm('Neuen Code erzeugen? Alle anderen Geräte werden abgemeldet und brauchen danach den neuen Code.')) return;
        try { shownCode = await rotate(); location.hash = '#/sync/code'; A.rerender(); } catch (x) { LRTreppe.kit.toast('Hat nicht geklappt. Bist du online?'); }
        return;
      }
      if (t.closest('[data-soff]')) {
        if (!confirm('Dieses Gerät vom Sync trennen? Dein Lernstand bleibt auf diesem Gerät, wird aber nicht mehr abgeglichen.')) return;
        await disconnect(); A.rerender();
      }
    });
    document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') soon(800); });
    addEventListener('online', () => soon(500));
    setInterval(() => { if (document.visibilityState === 'visible') sync(); }, 120000);
    A.LR.onLog(() => soon());
  }

  window.LRSync = {
    init(app) {
      A = app;
      A.R.sync = view;
      wire();
      getConf(A.LR.activeId()).then(c => { setStatus(c ? (c.revoked ? 'revoked' : 'ok') : 'off'); if (c) sync(); });
    },
    sync, status: () => status,
    _t: { b32enc, b32dec, derive, enc, dec, newCode, fmtCode, mergeState: (s, r, adopt) => { const keep = A; A = { state: s, save() {}, LR: { active: () => null } }; mergeState(r, adopt); A = keep; return s; } }
  };
})();
