/* ==========================================================================
   KLAUSUR – Bauschritt S6 (Portalplan 7: Klausurbereitschaft, Countdown, Nachbereitung;
   Bauliste 2.5/2.6)
   #/klausur/<id>: Bereitschaft (transparent), Countdown T-7 … T-0 mit genau einer Aufgabe
   pro Tag, Prognose (T-1/T-0), Ablauf-Karte (T-0), Gedächtnisprotokoll (danach), Note,
   Prognose vs. Note, Klausurfehler → Fehlerjagd. Kalibrierung für die Verlauf-Seite.
   Ereignisse: prognose {np, ready}, protokoll {typen, haengen, ueberrascht, np}, note {np},
   mistake (src 'klausur', text, typ) – alles pro Profil, aus Ereignissen berechnet.
   ========================================================================== */
(function () {
  'use strict';
  let A = null;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const SICHER = { offen: 0, begonnen: 0.25, unsicher: 0.6, sicher: 1 };
  const FRISCH = f => (f >= 1 ? 1 : f >= 0.72 ? 0.85 : 0.7);
  const PHASES = [
    ['t7', 'T-7', 'Lücken finden'], ['t5', 'T-5', 'Schwache Themen'], ['t3', 'T-3', 'Probeklausur'],
    ['t2', 'T-2', 'Fehleranalyse'], ['t1', 'T-1', 'Spickzettel'], ['t0', 'T-0', 'Klausurtag'], ['nach', 'Danach', 'Protokoll & Note']
  ];
  const phaseOf = d => d > 7 ? 'vor' : d >= 6 ? 't7' : d >= 4 ? 't5' : d === 3 ? 't3' : d === 2 ? 't2' : d === 1 ? 't1' : d === 0 ? 't0' : 'nach';
  const phaseName = d => { const p = PHASES.find(x => x[0] === phaseOf(d)); return p ? `${p[1]} · ${p[2]}` : ''; };
  const subjName = s => s ? s.name.replace(/ (eA|gA)$/, '') : '';
  const lastOf = (evs, type, ref) => evs.filter(e => e.type === type && e.ref === ref).pop() || null;

  // ------------------------------------------------------------ Bereitschaft (Portalplan 7)
  // Σ Themen (Sicherheit × Frische, gleich gewichtet) zählt 70 %, die letzte Probeklausur 30 %.
  function readiness(k) {
    if (!window.LRStruktur || !window.LRUeberblick || !k.fid) return null;
    const themen = LRStruktur.relevantThemen(k.id, k.fid);
    if (!themen.length) return null;
    const evs = A.LR.events();
    const rows = themen.map(it => {
      const s = LRUeberblick.statusOf(it, evs); if (!s) return null;
      const fr = FRISCH(LRUeberblick.fade(s.st, s.last));
      return { it, s, fr, v: SICHER[s.st] * fr };
    }).filter(Boolean);
    if (!rows.length) return null;
    const themenScore = rows.reduce((a, r) => a + r.v, 0) / rows.length;
    const ids = new Set(LRStruktur.probesOf(k.fid).map(p => p.id));
    const pe = evs.filter(e => e.type === 'probe' && e.data && ids.has(e.data.probe)).pop() || null;
    const probe = pe ? pe.data.pct / 100 : null;
    const pct = Math.round(100 * (0.7 * themenScore + 0.3 * (probe || 0)));
    return { pct, rows, themenScore, probe, pe };
  }
  const weakest = (r, n = 4) => r ? r.rows.slice().sort((a, b) => a.v - b.v).filter(x => x.s.st !== 'sicher').slice(0, n) : [];

  // ------------------------------------------------------------ Kalibrierung: Wie gut schätzt du dich ein?
  function calibration(days = 28) {
    const since = Date.now() - days * 864e5;
    const g = { 1: { n: 0, ok: 0 }, 2: { n: 0, ok: 0 }, 3: { n: 0, ok: 0 } };
    A.LR.events().forEach(e => {
      if (e.t < since || !e.data || !e.data.conf || !(e.type === 'practice' || e.type === 'extra') || !e.data.max) return;
      const c = g[e.data.conf]; if (!c) return;
      c.n++; if (e.data.pts / e.data.max >= 0.8) c.ok++;
    });
    const exams = A.exams.map(k => {
      const evs = A.LR.events();
      const p = lastOf(evs, 'prognose', k.id), n = lastOf(evs, 'note', k.id), pr = lastOf(evs, 'protokoll', k.id);
      const guess = p ? p.data.np : pr && pr.data.np != null ? pr.data.np : null;
      return n ? { k, guess, note: n.data.np, ready: p && p.data.ready != null ? p.data.ready : null } : null;
    }).filter(Boolean);
    return { g, exams };
  }
  function calibrationHtml() {
    const { g, exams } = calibration();
    const line = (c, label) => g[c].n ? `<div class="cal-row"><span>${label}</span><span class="cal-bar"><i style="width:${Math.round(g[c].ok / g[c].n * 100)}%"></i></span><b>${g[c].ok} von ${g[c].n}</b></div>` : '';
    const rows = line(3, '„sehr sicher“') + line(2, '„ziemlich sicher“') + line(1, '„unsicher“');
    const ex = exams.map(x => `<div class="cal-ex"><span class="dot" style="--subj:${(A.byId[x.k.fid] || {}).color || 'var(--accent)'}"></span><span class="row-main"><span class="row-title">${A.esc(subjName(A.byId[x.k.fid]) || x.k.subject)} · ${x.k.dateStr.slice(0, 6)}</span><span class="row-sub">${x.guess != null ? `geschätzt ${x.guess} NP · ` : ''}bekommen <b>${x.note} NP</b>${x.guess != null ? ` · ${Math.abs(x.guess - x.note) <= 1 ? 'gut eingeschätzt' : x.guess > x.note ? 'überschätzt' : 'unterschätzt'}` : ''}</span></span></div>`).join('');
    if (!rows && !ex) return '';
    return `<section class="section cal"><h3 class="h-2">Wie gut schätzt du dich ein?</h3>
      ${rows ? `<p class="row-sub" style="margin:6px 0 12px">Letzte 4 Wochen: Wie oft war deine Lösung wirklich (fast) richtig (≥ 80 %), je nachdem, wie sicher du vorher warst.</p><div class="cal-rows">${rows}</div>` : ''}
      ${ex ? `<div class="cal-exs">${ex}</div>` : ''}</section>`;
  }

  // ------------------------------------------------------------ Bausteine
  const np = (name, val) => `<div class="np-pick" data-np="${name}">${Array.from({ length: 16 }, (_, i) => `<button type="button" data-v="${i}" class="${val === i ? 'on' : ''}">${i}</button>`).join('')}</div>`;
  function itemLink(x, stage) {
    const { esc } = A;
    const inf = x.s.inf, it = x.it;
    let href = inf.href, how = '';
    if (it.typ === 'thema') {
      const t = A.TOPICS.find(z => z.id === it.ref);
      if (stage === 'luecken') { href = t && t.extras && t.extras.blurting ? `#/thema/${t.id}/blurting` : `#/thema/${t.id}/check`; how = t && t.extras && t.extras.blurting ? 'Blurting' : 'Eingangs-Check'; }
      else if (stage === 'schwach') { href = `#/thema/${t.id}/${x.s.st === 'unsicher' ? 4 : 3}`; how = `Stufe ${x.s.st === 'unsicher' ? 4 : 3}`; }
    } else if (it.typ === 'lektion') {
      const task = A.TASKS.find(t => t.lesson === it.ref);
      if (stage === 'schwach' && task) { href = `#/aufgabe/${task.id}`; how = 'Aufgabe'; }
      else how = A.state.done[it.ref] ? 'Wiederholen' : 'Lektion';
    }
    return `<a class="row" href="${href}"><span class="kn-c st-${x.s.st} mini"></span><span class="row-main"><span class="row-title">${esc(inf.title.replace(/\$/g, ''))}</span><span class="row-sub">${x.s.st}${how ? ' · ' + how : ''}</span></span>${A.icon('right', 'chev')}</a>`;
  }

  function todayCard(k, ph, r) {
    const { icon } = A;
    const card = (kicker, title, text, body) => `<section class="kday card"><span class="kicker">${kicker}</span><h3 class="h-1">${title}</h3><p class="muted">${text}</p>${body || ''}</section>`;
    const weak = weakest(r);
    const list = stage => !r ? `<div class="empty">Für diese Klausur gibt es im Lernraum noch keine Themen. Sobald Claude sie anlegt, stehen hier deine schwächsten.</div>` : weak.length ? `<div class="list" style="margin-top:14px">${weak.map(x => itemLink(x, stage)).join('')}</div>` : `<div class="empty">Alle klausurrelevanten Themen sitzen sicher. Stark.</div>`;
    const evs = A.LR.events();
    if (ph === 'vor') return card(`Noch ${k.days} Tage`, 'Lernplan abarbeiten', 'Bis eine Woche vorher gilt: Themen der Reihe nach lernen und regelmäßig wiederholen. Ab T-7 bekommst du hier jeden Tag genau eine Aufgabe.',
      `<div class="kbtns"><a class="btn primary" href="#/plan">${icon('cal')}Zum Lernplan</a><a class="btn" href="#/karte/${k.fid}">${icon('map')}Wissenslandkarte</a></div>`);
    if (ph === 't7') return card('T-7 bis T-6 · heute', 'Lücken finden', 'Für jedes klausurrelevante Thema: Eingangs-Check oder Blurting. Was fehlt, landet automatisch in der Fehlerjagd. Die schwächsten zuerst:', list('luecken'));
    if (ph === 't5') return card('T-5 bis T-4 · heute', 'Schwache Themen üben', 'Jetzt Aufgaben auf Papier: Gerüst (Stufe 3) und Abi-Aufgabe (Stufe 4) für die Themen, die noch wackeln.', list('schwach'));
    if (ph === 't3') {
      const pn = window.LRStruktur && LRStruktur.probeNode(k.fid);
      return card('T-3 · heute', 'Probeklausur mit Uhr', 'Einmal unter echten Bedingungen: Uhr an, Teil A ohne Hilfsmittel, Teil B mit CAS, Lösungen erst nach dem Abgeben. Das Ergebnis zählt 30 % deiner Bereitschaft.',
        `<div class="kbtns"><button class="btn primary" type="button" data-newprobe="${k.fid}">${icon('target')}Probeklausur zusammenstellen</button>${pn ? `<a class="btn" href="#/ordner/${pn.id}">Gespeicherte Probeklausuren</a>` : ''}</div>`);
    }
    if (ph === 't2') {
      const h = window.LRWdh ? LRWdh.huntState() : { due: [], open: [] };
      return card('T-2 · heute', 'Fehleranalyse', `Räum deine Fehler weg: ${h.open.length} offen, davon ${h.due.length} heute dran. Fehler aus der Probeklausur zuerst.`,
        `<div class="kbtns"><a class="btn primary" href="#/fehlerjagd">${icon('target')}Zur Fehlerjagd</a><a class="btn" href="#/karte/${k.fid}">${icon('map')}Was wackelt noch?</a></div>`);
    }
    if (ph === 't1') return card('T-1 · heute', 'Spickzettel und leichte Abrufe', 'Kein neuer Stoff mehr. Spickzettel durchgehen, ein paar Karten abrufen, früh schlafen: Im Schlaf setzt sich das Gelernte.',
      `<div class="kbtns"><a class="btn primary" href="#/spick/${k.fid}">${icon('book')}Spickzettel</a><a class="btn" href="#/abruf">${icon('flip')}Ein paar Karten</a></div>${prognoseBox(k, evs, r)}`);
    if (ph === 't0') return card('Heute · Klausurtag', 'So gehst du vor', 'Lies das kurz vor der Klausur, mehr nicht.',
      `<ul class="ablauf">
        <li>${icon('check')}<span><b>Teil A zuerst</b> (ohne Hilfsmittel), Teil B danach. Erst alles lesen, dann mit dem Leichtesten anfangen.</span></li>
        <li>${icon('check')}<span><b>Zeit einteilen:</b> ungefähr 1 BE = 1 Minute. Hängst du fest: Lücke lassen, weiter, später zurück.</span></li>
        <li>${icon('check')}<span><b>Operator</b> unterstreichen: berechnen, begründen, erläutern verlangen Unterschiedliches.</span></li>
        <li>${icon('check')}<span><b>CAS:</b> Ansatz hinschreiben, dann das Ergebnis. Die Eingabe ersetzt den Ansatz nicht.</span></li>
        <li>${icon('check')}<span><b>Antwortsätze</b> und Einheiten. Am Ende: Probe, wo es schnell geht.</span></li></ul>
        <details class="worry"><summary>${icon('pencil')}Optional: 2 Minuten Sorgen aufschreiben</summary><p class="row-sub">Schreib auf, was dich nervös macht. Das Aufschreiben kann den Kopf freier machen (Studienlage gemischt, darum nur ein Angebot). Wird nicht gespeichert.</p><textarea class="work" rows="4" placeholder="Was geht dir gerade durch den Kopf?"></textarea></details>
        ${prognoseBox(k, evs, r)}`);
    return nachBox(k, evs);
  }

  function prognoseBox(k, evs, r) {
    const p = lastOf(evs, 'prognose', k.id);
    return `<div class="kprog"><span class="kicker">Deine Prognose</span><p class="row-sub">Wie viele Notenpunkte schätzt du? Nach der Klausur siehst du, wie gut du dich einschätzt.</p>${np('prog', p ? p.data.np : null)}
      ${p ? `<p class="saved">${A.icon('check')}<span>Gespeichert: ${p.data.np} NP${r ? ` (Bereitschaft damals ${p.data.ready} %)` : ''}.</span></p>` : ''}</div>`;
  }

  function nachBox(k, evs) {
    const { icon, esc } = A;
    const pr = lastOf(evs, 'protokoll', k.id), note = lastOf(evs, 'note', k.id), prog = lastOf(evs, 'prognose', k.id);
    const kErr = evs.filter(e => e.type === 'mistake' && e.data && e.data.src === 'klausur' && e.data.kid === k.id);
    const days = -k.days;
    const proto = pr
      ? `<div class="kdone">${icon('check')}<div><b>Gedächtnisprotokoll gespeichert</b><p class="row-sub">${esc(pr.data.typen || '').slice(0, 140)}${(pr.data.typen || '').length > 140 ? '…' : ''}</p><button class="link small" type="button" data-kcopy>Für Claude kopieren</button></div></div>`
      : `<form class="kform" data-kproto><span class="kicker">${days <= 1 ? 'Jetzt, solange du dich erinnerst' : 'Gedächtnisprotokoll'}</span><h3 class="h-2">Was kam dran?</h3>
          <label class="lbl" for="kp1">Welche Aufgabentypen?</label><textarea id="kp1" class="work" rows="3" placeholder="z. B. Schar mit Tiefpunkt bei ±1, Integral am Graphen …"></textarea>
          <label class="lbl" for="kp2">Wo bist du hängen geblieben?</label><textarea id="kp2" class="work" rows="2"></textarea>
          <label class="lbl" for="kp3">Was hat dich überrascht?</label><textarea id="kp3" class="work" rows="2"></textarea>
          <span class="lbl">Gefühlte Notenpunkte</span>${np('feel', null)}
          <button class="btn primary block" type="submit">${icon('check')}Protokoll speichern</button></form>`;
    const noteBox = note
      ? `<div class="kcmp"><div><b class="num">${prog ? prog.data.np : pr && pr.data.np != null ? pr.data.np : '–'}</b><span>geschätzt</span></div><div><b class="num">${note.data.np}</b><span>bekommen</span></div>${prog && prog.data.ready != null ? `<div><b class="num">${prog.data.ready}%</b><span>Bereitschaft</span></div>` : ''}</div>
         <p class="muted kcmp-t">${(() => { const g = prog ? prog.data.np : pr ? pr.data.np : null; if (g == null) return 'Ohne Prognose kein Vergleich. Beim nächsten Mal T-1 eine abgeben.'; const d = note.data.np - g; return Math.abs(d) <= 1 ? 'Gut eingeschätzt. Du kennst deinen Stand.' : d > 0 ? `Du warst ${d} NP besser als gedacht. Trau dir mehr zu.` : `${-d} NP unter deiner Schätzung. Die Fehlerjagd zeigt, woran es lag.`; })()}</p>`
      : `<div class="kform"><span class="kicker">Klausur zurück?</span><h3 class="h-2">Note eintragen</h3>${np('note', null)}</div>`;
    const errBox = `<div class="kform" data-kerrform><span class="kicker">Fehler aus der Klausur</span><h3 class="h-2">In die Fehlerjagd damit</h3>
        <p class="row-sub">Schreib jede Stelle kurz auf, an der du Punkte verloren hast. Sie kommt morgen in der Fehlerjagd wieder, mit der Berichtigung neben dir.</p>
        ${kErr.length ? `<ul class="kerr">${kErr.map(e => `<li>${icon('target')}<span>${esc(e.data.text)}${e.data.typ ? ` <span class="chip warn">${esc(e.data.typ)}</span>` : ''}</span></li>`).join('')}</ul>` : ''}
        <input class="input" id="kerrT" maxlength="160" placeholder="z. B. A3: F(x+1)=F(x)+0,5 nicht gedeutet">
        <div class="ft-chips" id="kerrTyp">${(LRTreppe.kit.FTYPES || []).map(f => `<button type="button" data-ftv="${f}">${f}</button>`).join('')}</div>
        <button class="btn block" type="button" data-kerradd>${icon('plus')}Fehler hinzufügen</button></div>`;
    return `<section class="kday card"><span class="kicker">Nach der Klausur</span><h3 class="h-1">Nachbereitung</h3><p class="muted">Protokoll, Note, Fehler: Das ist das wertvollste Material fürs Abitur.</p></section>${proto}${noteBox}${errBox}`;
  }

  // ------------------------------------------------------------ Seite
  function view(id) {
    const { icon, esc, byId, subjStyle } = A;
    const k = A.exams.find(x => x.id === id);
    if (!k) return A.R.plan();
    const s = byId[k.fid];
    const ph = phaseOf(k.days);
    const r = k.days >= 0 ? readiness(k) : null;
    const idx = PHASES.findIndex(p => p[0] === ph);
    const timeline = `<div class="ktl">${PHASES.map((p, i) => `<div class="ktl-s${i < idx ? ' done' : i === idx ? ' on' : ''}"><i></i><b>${p[1]}</b><span>${p[2]}</span></div>`).join('')}</div>`;
    const head = `<div class="fach-head" ${subjStyle(s)}><div class="mono">${s ? A.mono(s) : 'K'}</div><div style="min-width:0"><span class="kicker">Klausur · ${A.WD[k.date.getDay()]}, ${k.dateStr} · ${/-/.test(k.period) ? `ab ${k.period.split('-')[0]} Stunde, ${parseInt(k.period.split('-')[1], 10)} Min.` : k.period + ' Stunde'} · Raum ${esc(k.room)}</span><h2 class="h-1">${esc(subjName(s) || k.subject)}</h2>
      <p class="muted">${k.days > 1 ? `in ${k.days} Tagen` : k.days === 1 ? 'morgen' : k.days === 0 ? 'heute' : `vor ${-k.days} ${k.days === -1 ? 'Tag' : 'Tagen'} geschrieben`}${k.topic ? ` · ${esc(k.topic)} <span class="dim">(laut Kalender, nicht bestätigt)</span>` : ''}</p></div></div>`;
    const ready = k.days < 0 ? '' : r
      ? `<section class="kready card"><div class="kready-ring">${A.ring(r.pct / 100, { size: 108, center: `<b class="num" style="font-size:28px">${r.pct}</b><span class="kicker">%</span>` })}<div class="kms">${[50, 75, 90].map(m => `<span class="${r.pct >= m ? 'on' : ''}">${m}</span>`).join('')}</div></div>
          <div class="row-main"><span class="kicker">Klausurbereitschaft</span><span class="row-title">${r.pct >= 90 ? 'Bereit.' : r.pct >= 75 ? 'Fast da.' : r.pct >= 50 ? 'Auf gutem Weg.' : 'Noch viel offen.'}</span>
            <span class="row-sub">${r.rows.filter(x => x.s.st === 'sicher').length} von ${r.rows.length} Themen sicher · Probeklausur ${r.probe != null ? Math.round(r.probe * 100) + ' %' : 'noch keine'}</span>
            <details class="kwhy"><summary>Wie wird das berechnet?</summary>
              <p class="row-sub">Themen zählen 70 %: offen 0, begonnen ¼, unsicher 0,6, sicher 1, jeweils mal Frische (lange nicht wiederholt: × 0,85 bzw. × 0,7). Die letzte Probeklausur zählt 30 %${r.probe == null ? ', fehlt sie, fehlen diese 30 %' : ''}.</p>
              <div class="list">${r.rows.map(x => `<div class="row"><span class="kn-c st-${x.s.st} mini"></span><span class="row-main"><span class="row-title">${esc(x.s.inf.title.replace(/\$/g, ''))}</span><span class="row-sub">${x.s.st}${x.fr < 1 ? ` · Frische × ${String(x.fr).replace('.', ',')}` : ''}</span></span><b class="kv">${Math.round(x.v * 100)}</b></div>`).join('')}</div></details></div></section>`
      : `<div class="notice">${icon('info')}<div>Für diese Klausur sind im Lernraum noch keine Themen hinterlegt${s ? '' : ''}. Sag Claude im Chat, was drankommt, dann gibt es Ordner, Plan und Bereitschaft.</div></div>`;
    const html = `<div ${subjStyle(s)} class="rise klausur">${head}${ready}${timeline}${todayCard(k, ph, r)}</div>`;
    return { title: 'Klausur', back: '#/plan', nav: 'plan', html, after: root => bind(root, k, r) };
  }

  function bind(root, k, r) {
    const { LR } = A;
    $$('[data-np]', root).forEach(box => box.addEventListener('click', e => {
      const b = e.target.closest('button[data-v]'); if (!b) return;
      $$('button', box).forEach(x => x.classList.toggle('on', x === b));
      const v = +b.dataset.v, name = box.dataset.np;
      if (name === 'prog') { LR.log('prognose', k.id, { np: v, ready: r ? r.pct : null }); A.rerender(); }
      if (name === 'note') { if (confirm(`${v} Notenpunkte eintragen?`)) { LR.log('note', k.id, { np: v }); A.rerender(); } else b.classList.remove('on'); }
    }));
    const pf = $('[data-kproto]', root);
    if (pf) pf.addEventListener('submit', e => {
      e.preventDefault();
      const feel = $('[data-np="feel"] button.on', pf);
      const d = { typen: $('#kp1', pf).value.trim(), haengen: $('#kp2', pf).value.trim(), ueberrascht: $('#kp3', pf).value.trim(), np: feel ? +feel.dataset.v : null };
      if (!d.typen && !d.haengen) { $('#kp1', pf).focus(); return; }
      LR.log('protokoll', k.id, d); A.rerender();
    });
    const cp = $('[data-kcopy]', root);
    if (cp) cp.addEventListener('click', () => {
      const p = lastOf(LR.events(), 'protokoll', k.id); if (!p) return;
      const s = A.byId[k.fid];
      const txt = `Gedächtnisprotokoll ${subjName(s) || k.subject}-Klausur ${k.dateStr}\nAufgabentypen: ${p.data.typen}\nHängen geblieben: ${p.data.haengen}\nÜberrascht: ${p.data.ueberrascht}\nGefühlte Notenpunkte: ${p.data.np != null ? p.data.np : '–'}`;
      const done = () => LRTreppe.kit.toast('Kopiert. Füg es bei Claude im Chat ein.');
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(txt).then(done, () => prompt('Zum Kopieren markieren:', txt)); else prompt('Zum Kopieren markieren:', txt);
    });
    const ef = $('[data-kerrform]', root);
    if (ef) {
      let typ = null;
      $$('[data-ftv]', ef).forEach(b => b.onclick = () => { typ = typ === b.dataset.ftv ? null : b.dataset.ftv; $$('[data-ftv]', ef).forEach(x => x.classList.toggle('on', x.dataset.ftv === typ)); });
      $('[data-kerradd]', ef).onclick = () => {
        const t = $('#kerrT', ef).value.trim();
        if (!t) { $('#kerrT', ef).focus(); return; }
        const n = LR.events().filter(e => e.type === 'mistake' && e.data && e.data.src === 'klausur' && e.data.kid === k.id).length;
        LR.log('mistake', `klausur:${k.id}:${n + 1}`, { src: 'klausur', kid: k.id, text: t, typ, label: `${subjName(A.byId[k.fid]) || k.subject} ${k.dateStr.slice(0, 6)}` });
        A.rerender();
      };
    }
  }

  // Für Heute und die Klausurliste
  function lineInfo(k) {
    const r = k.days >= 0 && k.days <= 120 ? readiness(k) : null;
    return { ready: r ? r.pct : null, phase: k.days <= 7 ? phaseName(k.days) : '' };
  }

  window.LRKlausur = {
    init(app) { A = app; A.R.klausur = view; },
    readiness, phaseOf, phaseName, lineInfo, calibrationHtml, calibration
  };
})();
