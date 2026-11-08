/* ==========================================================================
   ÜBERBLICK – Bauschritt S5 (Portalplan 7, Bauliste 2.2/2.3)
   - Wissenslandkarte #/karte/<fach>: dieselben Ordner/Themen wie die Fach-Seite, als Linie mit
     Stationen. Grau = offen, Umriss = begonnen, gelb = unsicher, leuchtend = sicher.
     Sicher = 3 richtige Abrufe an 3 verschiedenen Tagen (Lektion) bzw. Abi-Stufe + Mix geschafft
     (Lerntreppe). Lange nicht wiederholt → die Station verblasst (Frische).
   - Trainings-Kalender #/verlauf: 26 Wochen, Zahlen zum Training.
   Alles wird aus den Ereignissen berechnet (core.js), nichts extra gespeichert.
   ========================================================================== */
(function () {
  'use strict';
  let A = null;
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const DAY = 864e5;
  const STATES = { offen: 'offen', begonnen: 'begonnen', unsicher: 'unsicher', sicher: 'sicher' };
  const LABEL = { offen: 'offen', begonnen: 'begonnen', unsicher: 'unsicher', sicher: 'sicher' };
  const rank = { offen: 0, begonnen: 1, unsicher: 2, sicher: 3 };

  // ------------------------------------------------------------ Status einer Station
  function statusOf(it, evs) {
    const S = window.LRStruktur;
    const inf = S && S.info(it);
    if (!inf) return null;
    let st = 'offen', last = 0;
    const seen = t => { if (t > last) last = t; };
    if (it.typ === 'lektion') {
      const id = it.ref, okDays = new Set();
      let touched = A.state.last && A.state.last.id === id;
      evs.forEach(e => {
        if (e.ref === id && e.type === 'learn') { touched = true; seen(e.t); }
        if (e.type === 'recall' && String(e.ref).startsWith(id + ':')) { touched = true; seen(e.t); if (e.data && e.data.ok) okDays.add(A.LR._util.dayKey(e.t)); }
      });
      if (A.state.done[id]) st = okDays.size >= 3 ? 'sicher' : 'unsicher';
      else if (touched) st = 'begonnen';
      return { st, last, inf, hint: st === 'unsicher' ? `${okDays.size} von 3 Abruf-Tagen bis „sicher“` : '' };
    }
    if (it.typ === 'thema') {
      const t = A.TOPICS.find(x => x.id === it.ref);
      const pr = LRTreppe.progress(A.LR, t);
      evs.forEach(e => { if (e.data && e.data.topic === t.id) seen(e.t); });
      if (pr.best[4] >= 80 && pr.best[5] >= 80) st = 'sicher';
      else if (pr.status === 'unsicher') st = 'unsicher';
      else if (pr.status === 'begonnen') st = 'begonnen';
      return { st, last, inf, hint: st !== 'sicher' && st !== 'offen' ? `Stufe ${Math.max(...Object.keys(pr.best).filter(k => pr.best[k] >= 80).map(Number), -1) + 1} ist dran` : '' };
    }
    if (it.typ === 'algo') {
      let best = -1;
      evs.forEach(e => { if (e.type === 'extra' && e.data && e.data.topic === it.ref) { best = Math.max(best, e.data.pct); seen(e.t); } });
      st = best >= 80 ? 'sicher' : best >= 50 ? 'unsicher' : best >= 0 ? 'begonnen' : 'offen';
      return { st, last, inf, hint: '' };
    }
    return { st: inf.done ? 'sicher' : 'offen', last, inf, hint: '' };
  }
  // Frische: verblasst nach 1 Woche ohne Wiederholung etwas, nach 3 Wochen deutlich
  const fade = (st, last) => (rank[st] < 2 || !last) ? 1 : (Date.now() - last) / DAY < 7 ? 1 : (Date.now() - last) / DAY < 21 ? 0.72 : 0.5;

  // ------------------------------------------------------------ Karte
  function karte(fid) {
    const { icon, esc, byId, subjStyle } = A;
    const s = byId[fid];
    if (!s || !window.LRStruktur) return A.R.faecher();
    const evs = A.LR.events();
    const lanes = LRStruktur.tree(fid).filter(n => n.typ === 'ordner').map(n => ({
      n, stations: LRStruktur.themenOf(n).map(it => Object.assign({ it }, statusOf(it, evs))).filter(x => x.inf)
    })).filter(l => l.stations.length);
    const all = lanes.flatMap(l => l.stations);
    const count = k => all.filter(x => x.st === k).length;
    const frac = all.length ? (count('sicher') + count('unsicher') * 0.5) / all.length : 0;
    const head = `<div class="fach-head" ${subjStyle(s)}><div class="mono">${A.mono(s)}</div><div style="min-width:0"><span class="kicker">Wissenslandkarte</span><h2 class="h-1">${esc(s.name.replace(/ (eA|gA)$/, ''))}</h2></div></div>`;
    const sum = `<div class="kmap-sum card">${A.ring(frac, { size: 84, center: `<b class="num" style="font-size:22px">${count('sicher')}</b>` })}
      <div class="row-main"><span class="row-title">${count('sicher')} von ${all.length} Themen sitzen sicher</span>
        <span class="row-sub">${count('unsicher')} unsicher · ${count('begonnen')} begonnen · ${count('offen')} offen</span>
        <div class="kmap-legend">${['offen', 'begonnen', 'unsicher', 'sicher'].map(k => `<span class="lg"><i class="kn-c st-${k}"></i>${LABEL[k]}</span>`).join('')}</div></div></div>
      <p class="row-sub kmap-rule">${icon('info')}Sicher heißt: 3 richtige Abrufe an 3 verschiedenen Tagen. Was du länger als eine Woche nicht wiederholt hast, verblasst auf der Karte.</p>`;
    const nextGlobal = all.find(x => x.st !== 'sicher' && x.st !== 'offen') || all.find(x => x.st === 'offen');
    const lanesHtml = lanes.map((l, li) => {
      const d = l.stations.filter(x => x.st === 'sicher').length;
      return `<section class="kmap-lane" style="--li:${li}"><div class="kmap-lane-h"><a class="row-title" href="#/ordner/${l.n.id}">${esc(l.n.titel)}</a><span class="chip">${d}/${l.stations.length} sicher</span></div>
        <div class="kmap" data-lane="${li}">
          <svg class="kmap-svg" aria-hidden="true"></svg>
          ${l.stations.map((x, i) => `<a class="kn st-${x.st}${x === nextGlobal ? ' is-next' : ''}" href="${x.inf.href}" data-i="${i}" data-st="${x.st}" style="--fade:${fade(x.st, x.last)};--d:${(li * 0.15 + i * 0.07).toFixed(2)}s" title="${esc(x.inf.title)} · ${LABEL[x.st]}${x.hint ? ' · ' + esc(x.hint) : ''}">
            <span class="kn-c st-${x.st}">${x.st === 'sicher' ? icon('check') : (x.inf.num != null ? esc(String(x.inf.num).replace(/^0/, '')) : i + 1)}</span>
            <span class="kn-t">${esc(x.inf.title.replace(/\$/g, ''))}</span>${x === nextGlobal ? '<span class="kn-next">als Nächstes</span>' : ''}</a>`).join('')}
        </div></section>`;
    }).join('');
    const html = `<div ${subjStyle(s)} class="rise">${head}${sum}${lanesHtml || '<div class="empty">Für dieses Fach gibt es noch keine Themen.</div>'}</div>`;
    return { title: 'Wissenslandkarte', back: `#/fach/${fid}`, nav: 'faecher', html, after: root => layout(root, lanes) };
  }

  // Schlangen-Linie: Stationen in Reihen, jede zweite Reihe rückwärts; Übergänge als Bogen
  function layout(root, lanes) {
    const run = () => $$('.kmap', root).forEach(box => {
      const li = +box.dataset.lane, n = lanes[li].stations.length;
      const W = box.clientWidth; if (!W) return;
      const cols = Math.max(2, Math.min(n, W < 420 ? 2 : W < 640 ? 3 : W < 900 ? 4 : 5));
      const rowH = 132, padX = Math.min(70, W / (cols * 2)), top = 34;
      const xs = c => cols === 1 ? W / 2 : padX + c * (W - 2 * padX) / (cols - 1);
      const pts = [];
      for (let i = 0; i < n; i++) { const r = Math.floor(i / cols), c0 = i % cols, c = r % 2 ? cols - 1 - c0 : c0; pts.push({ x: xs(c), y: top + r * rowH, r }); }
      const rows = Math.ceil(n / cols);
      box.style.height = (top + (rows - 1) * rowH + 96) + 'px';
      $$('.kn', box).forEach((el, i) => { el.style.left = pts[i].x + 'px'; el.style.top = pts[i].y + 'px'; el.style.width = Math.min(150, (W - 2 * padX) / Math.max(1, cols - 1) + 20) + 'px'; });
      const st = $$('.kn', box).map(el => el.dataset.st);
      let segs = '';
      for (let i = 0; i < n - 1; i++) {
        const a = pts[i], b = pts[i + 1];
        let d;
        if (a.r === b.r) d = `M${a.x} ${a.y}L${b.x} ${b.y}`;
        else { const side = a.x > W / 2 ? 1 : -1, bulge = Math.min(padX, 46) * side; d = `M${a.x} ${a.y}C${a.x + bulge * 1.4} ${a.y} ${b.x + bulge * 1.4} ${b.y} ${b.x} ${b.y}`; }
        const lit = rank[st[i]] >= 1 && rank[st[i + 1]] >= 1;
        segs += `<path d="${d}" class="ks${lit ? ' lit' : ''}${rank[st[i]] >= 3 && rank[st[i + 1]] >= 3 ? ' strong' : ''}" pathLength="100" style="--d:${(0.1 + i * 0.07).toFixed(2)}s"/>`;
      }
      const svg = box.querySelector('.kmap-svg');
      svg.setAttribute('viewBox', `0 0 ${W} ${box.clientHeight}`);
      svg.innerHTML = segs;
    });
    run();
    let t = null;
    const onR = () => { if (!root.isConnected) { removeEventListener('resize', onR); return; } clearTimeout(t); t = setTimeout(run, 120); };
    addEventListener('resize', onR);
  }

  // ------------------------------------------------------------ Trainings-Kalender (26 Wochen)
  function verlauf() {
    const { icon, LR } = A;
    const evs = LR.events();
    const st = LR.stats(evs);
    const weeks = 26;
    const cal = LR.calendar(st, weeks);
    const months = ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'];
    let mlabels = '', lastM = -1;
    for (let w = 0; w < weeks; w++) {
      const m = new Date(cal[w * 7].k + 'T12:00').getMonth();
      mlabels += `<span>${m !== lastM ? months[m] : ''}</span>`;
      lastM = m;
    }
    const n = t => evs.filter(e => e.type === t).length;
    const stagesOk = evs.filter(e => e.type === 'stage' && e.data && e.data.pct >= 80).length;
    const fixed = LR.mistakes(evs).fixed.length;
    const sessions = evs.filter(e => e.type === 'session');
    const sessMin = sessions.reduce((a, e) => a + ((e.data && e.data.min) || 0), 0);
    const wk = k => { let d = 0, a = 0; for (let i = 0; i < 7; i++) { const x = cal[cal.length - 7 * k - 7 + i]; if (x && !x.future) { if (x.n) d++; a += x.n; } } return { d, a }; };
    const w0 = wk(0), w1 = wk(1);
    const tiles = [
      [st.trainingDays, 'Trainingstage'], [st.streak, 'Tage in Folge'], [st.best, 'Bestwert'],
      [n('recall'), 'Karten abgefragt'], [stagesOk, 'Stufen geschafft'], [fixed, 'Fehler behoben'],
      [sessions.length, 'Sessions'], [sessMin, 'Minuten in Sessions']
    ];
    const html = `<div class="rise">
      <div class="page-head"><span class="kicker">Abi-Training · Tag ${st.trainingDays || 1}</span><h2 class="h-display">Dein Training.</h2>
        <p class="muted">Jedes Kästchen ist ein Tag. Je kräftiger, desto mehr hast du gemacht. Schraffiert: ein Schutz-Tag, der den Streak gehalten hat.</p></div>
      <div class="card yheat-card">
        <div class="yheat-m">${mlabels}</div>
        <div class="yheat">${cal.map(c => `<span class="hc l${c.lvl}${c.freeze ? ' fz' : ''}${c.today ? ' td' : ''}${c.future ? ' fu' : ''}" title="${c.k.split('-').reverse().join('.')}: ${c.n} ${c.n === 1 ? 'Aktion' : 'Aktionen'}${c.freeze ? ' · Schutz-Tag' : ''}"></span>`).join('')}</div>
        <div class="yheat-leg"><span>weniger</span>${[0, 1, 2, 3, 4].map(l => `<span class="hc l${l}"></span>`).join('')}<span>mehr</span><span class="hc fz" style="margin-left:12px"></span><span>Schutz-Tag</span></div>
      </div>
      <div class="week-cmp">${icon('cal')}<span>Diese Woche: <b>${w0.d} ${w0.d === 1 ? 'Tag' : 'Tage'}</b>, ${w0.a} Aktionen · letzte Woche: ${w1.d} ${w1.d === 1 ? 'Tag' : 'Tage'}, ${w1.a} Aktionen</span></div>
      <div class="vtiles">${tiles.map(([v, l]) => `<div><b class="num">${v}</b><span>${l}</span></div>`).join('')}</div>
    </div>`;
    return { title: 'Training', back: '#/', nav: 'heute', html };
  }

  window.LRUeberblick = {
    init(app) { A = app; A.R.karte = karte; A.R.verlauf = verlauf; },
    statusOf
  };
})();
