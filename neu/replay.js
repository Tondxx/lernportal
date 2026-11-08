/* ==========================================================================
   RECHENWEG-REPLAY – Bauschritt S5 (Portalplan 7, Bauliste 2.7)
   Ein Lösungsweg baut sich Zeile für Zeile auf, wie an der Tafel. Abspielen/Pause,
   zurück, weiter; Pfeiltasten und Leertaste. Nutzt dieselben `schritte` wie die Aufgaben:
   Formelblöcke mit mehreren Zeilen (aligned/array) erscheinen zeilenweise.
   Aufruf: LRReplay.open(ctx, part, { titel, frage })
   ========================================================================== */
(function () {
  'use strict';
  const SPEED = 1900; // ms pro Zeile

  // Rechnung in Teile zerlegen: Text und Formelblöcke ($$…$$); Formelblöcke mit Zeilen werden zeilenweise gezeigt
  function segments(r) {
    const out = [], re = /\$\$([\s\S]+?)\$\$/g;
    let last = 0, m;
    while ((m = re.exec(r))) { if (m.index > last) out.push({ t: 'text', s: r.slice(last, m.index) }); out.push({ t: 'math', s: m[1] }); last = re.lastIndex; }
    if (last < r.length) out.push({ t: 'text', s: r.slice(last) });
    return out.filter(x => x.s.trim()).map(x => {
      if (x.t !== 'math') return Object.assign(x, { units: 1 });
      const mm = x.s.match(/^\s*\\begin\{(aligned|array)\}(\{[^}]*\})?([\s\S]*?)\\end\{\1\}\s*$/);
      if (!mm) return Object.assign(x, { units: 1 });
      const rows = mm[3].split(/\\\\(?:\[[^\]]*\])?/).map(s => s.trim()).filter(Boolean);
      return Object.assign(x, { env: mm[1], spec: mm[2] || '', rows, units: rows.length });
    });
  }
  const unitsOf = st => segments(st.rechnung || '').reduce((a, s) => a + s.units, 0) || 1;
  // Die ersten k Einheiten eines Schritts als Text mit $…$ zusammensetzen
  function partial(st, k) {
    let left = k, out = '';
    for (const s of segments(st.rechnung || '')) {
      if (left <= 0) break;
      if (s.t === 'text') { out += s.s; left -= 1; continue; }
      if (!s.rows) { out += `$$${s.s}$$`; left -= 1; continue; }
      const n = Math.min(left, s.rows.length);
      out += `$$\\begin{${s.env}}${s.spec} ${s.rows.slice(0, n).join(' \\\\[6pt] ')} \\end{${s.env}}$$`;
      left -= n;
    }
    return out;
  }

  function open(ctx, part, meta = {}) {
    const { M, icon, esc } = ctx;
    const B = window.LRTreppe && LRTreppe.kit.api(ctx);
    const steps = part.schritte || [];
    const frames = [];
    steps.forEach((st, i) => { const u = unitsOf(st); for (let k = 1; k <= u; k++) frames.push({ i, k, last: k === u }); });
    if (!frames.length) return;
    let f = 0, playing = !ctx.reduced, timer = null;

    const el = document.createElement('div');
    el.className = 'replay';
    el.setAttribute('role', 'dialog');
    el.setAttribute('aria-modal', 'true');
    el.setAttribute('aria-label', 'Rechenweg abspielen');
    if (meta.style) el.setAttribute('style', meta.style);
    el.innerHTML = `<div class="rp-top"><span class="kicker">${icon('play')}Rechenweg-Replay${meta.titel ? ' · ' + esc(meta.titel) : ''}</span><button class="icon-btn" type="button" data-rpx aria-label="Schließen">${icon('x')}</button></div>
      <div class="rp-scroll"><div class="rp-inner">${meta.frage ? `<div class="q rp-q">${M(meta.frage)}</div>` : ''}<div class="rw rp-board"></div></div></div>
      <div class="rp-ctrl"><div class="rp-prog"><i></i></div>
        <div class="rp-btns"><button class="btn" type="button" data-rpb aria-label="Zurück">${icon('left')}</button>
          <button class="btn primary" type="button" data-rpp></button>
          <button class="btn" type="button" data-rpf aria-label="Weiter">${icon('right')}</button></div></div>`;
    document.body.appendChild(el);
    document.body.classList.add('rp-open');
    requestAnimationFrame(() => el.classList.add('on'));
    const board = el.querySelector('.rp-board'), sc = el.querySelector('.rp-scroll');
    const playBtn = el.querySelector('[data-rpp]');

    function draw(animate) {
      const fr = frames[f];
      let h = '';
      for (let i = 0; i <= fr.i; i++) {
        const st = steps[i];
        const done = i < fr.i || fr.last;
        const body = `<div class="rw-math${st.antwort || st.kern ? ' prose' : ''}${i === fr.i && animate ? ' rp-fresh' : ''}">${M(i < fr.i ? st.rechnung : partial(st, fr.k))}</div>`;
        h += B ? B.step(st, i, { body, why: done, cas: done, be: true, cls: i === fr.i ? 'rp-cur' : 'rp-past' }) : body;
      }
      board.innerHTML = h;
      el.querySelector('.rp-prog i').style.width = `${Math.round((f + 1) / frames.length * 100)}%`;
      playBtn.innerHTML = f >= frames.length - 1 ? `${icon('flip')}Nochmal` : playing ? `${icon('pause')}Pause` : `${icon('play')}Abspielen`;
      const cur = board.querySelector('.rp-cur');
      if (cur) cur.scrollIntoView({ behavior: ctx.reduced ? 'auto' : 'smooth', block: 'end' });
    }
    function tick() {
      clearTimeout(timer);
      if (!playing) return;
      timer = setTimeout(() => { if (f < frames.length - 1) { f++; draw(true); tick(); } else { playing = false; draw(false); } }, SPEED);
    }
    const go = d => { playing = false; clearTimeout(timer); f = Math.max(0, Math.min(frames.length - 1, f + d)); draw(d > 0); };
    playBtn.onclick = () => {
      if (f >= frames.length - 1) { f = 0; playing = true; draw(true); tick(); return; }
      playing = !playing; draw(false); tick();
    };
    el.querySelector('[data-rpb]').onclick = () => go(-1);
    el.querySelector('[data-rpf]').onclick = () => go(1);
    const close = () => {
      clearTimeout(timer);
      removeEventListener('keydown', key, true);
      removeEventListener('hashchange', close);
      document.body.classList.remove('rp-open');
      el.classList.remove('on');
      setTimeout(() => el.remove(), ctx.reduced ? 0 : 250);
    };
    el.querySelector('[data-rpx]').onclick = close;
    const key = e => {
      if (e.key === 'Escape') { e.preventDefault(); close(); }
      else if (e.key === 'ArrowRight') { e.preventDefault(); e.stopPropagation(); go(1); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); e.stopPropagation(); go(-1); }
      else if (e.key === ' ') { e.preventDefault(); playBtn.click(); }
    };
    addEventListener('keydown', key, true);
    addEventListener('hashchange', close);
    draw(true);
    tick();
    playBtn.focus({ preventScroll: true });
  }

  // Knopf, der überall eingesetzt werden kann (Aufgabe mit data-Attributen, Bindung über bind)
  const button = (label = 'Rechenweg abspielen') => `<button class="btn small rp-btn" type="button" data-replay>${'<svg class="i" aria-hidden="true"><use href="#i-play"/></svg>'}${label}</button>`;
  function bind(root, ctx, part, meta = {}) {
    root.querySelectorAll('[data-replay]').forEach(b => {
      if (b.dataset.bound) return;
      b.dataset.bound = '1';
      b.addEventListener('click', () => {
        const c = getComputedStyle(b).getPropertyValue('--subj').trim(); // Fachfarbe von der Seite übernehmen
        open(ctx, part, Object.assign({ style: c ? `--subj:${c}` : '' }, meta));
      });
    });
  }

  window.LRReplay = { open, button, bind, _segments: segments, _partial: partial, _unitsOf: unitsOf };
})();
