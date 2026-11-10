/* ==========================================================================
   BEIPACKZETTEL-SEITE #/befehle (Informatik)
   Die erlaubten Befehle aus den „Ergänzenden Hinweisen“ (grüne Abschnitte = Hilfsmittel in der Klausur), mit Python-Entsprechung,
   Beispielen, Laufzeitfehlern, Ausprobieren (Demos i-zeichen, i-dynarray, i-stack, i-queue), Training (zufällige Befehlsfolgen)
   und Regeln „So arbeitest du damit“. Daten: content/informatik-befehle.js, Logik: content/informatik-befehle-demos.js.
   ========================================================================== */
(function () {
  'use strict';
  let A = null;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const code = s => `<pre class="ic-code">${esc(String(s).replace(/^\n/, '').replace(/\s+$/, ''))}</pre>`;

  // ------------------------------------------------------------ Nachschlagen
  const opRow = op => `<tr data-s="${esc((op.n + ' ' + op.sig + ' ' + op.was + ' ' + (op.py || '')).toLowerCase().replace(/<[^>]+>/g, ''))}">
      <td><code class="bf-sig">${esc(op.sig)}</code></td><td>${op.was}${op.fehler ? `<div class="bf-err">⚠ Vorher prüfen: ${esc(op.fehler)}</div>` : ''}</td>${op.py ? `<td><code>${esc(op.py)}</code></td><td>${esc(op.bsp || '')}</td>` : '<td colspan="2" class="dim">—</td>'}</tr>`;
  function sectionHtml(sec) {
    const chip = sec.dran === false ? '<span class="chip">noch nicht dran</span>' : '<span class="chip bf-gruen">grün · Hilfsmittel</span>';
    return `<details class="bf-sec" ${sec.dran === false ? '' : 'open'} data-sec="${sec.id}"><summary><span class="bf-nr">${sec.nr}</span><span class="bf-t">${esc(sec.titel)}</span>${chip}</summary>
      <p class="prose bf-intro">${sec.intro}</p>
      <div class="ic-tabw"><table class="ic-tab bf-tab"><thead><tr><th>Befehl</th><th>Wirkung</th><th>in Python</th><th>Beispiel</th></tr></thead><tbody>${sec.ops.map(opRow).join('')}</tbody></table></div></details>`;
  }
  function nachschlagen(B) {
    const weitere = B.weitere.map(w => `<div class="row bf-w"><span class="pnode ${w.farbe === 'grün' ? 'bf-g' : 'bf-o'}">${w.nr}</span><span class="row-main"><span class="row-title">${esc(w.titel)}</span><span class="row-sub">${esc(w.hinweis)}</span></span></div>`).join('');
    return `<div class="bf-search"><input class="input" id="bfq" type="search" placeholder="Befehl suchen, z. B. pop, insertAt, ASCII …" autocomplete="off" aria-label="Befehl suchen"></div>
      <div id="bfsecs">${B.sektionen.map(sectionHtml).join('')}</div><p class="bf-none" id="bfnone" hidden>Dazu gibt es keinen Befehl auf dem Beipackzettel. Wenn du etwas brauchst, das hier nicht steht, baust du es aus diesen Befehlen selbst.</p>
      <span class="sub">Weitere Abschnitte des Dokuments</span><div class="list">${weitere}</div>
      <p class="row-sub" style="margin-top:12px">Quelle: Ergänzende Hinweise zum Kerncurriculum Informatik (Neufassung Juni 2025), IServ → 0. Vorgaben. Das hier ist eine eigene Zusammenfassung mit Python-Entsprechung; maßgeblich ist dein Ausdruck.</p>`;
  }

  // ------------------------------------------------------------ Regeln
  function regeln(B) {
    return `<div class="prose bf-rules">
      <h3>1. Es gibt nur diese Befehle</h3>
      <p>Auf dem Beipackzettel stehen alle Befehle, die du für Zeichenketten, Reihungen, Stapel und Schlangen benutzen darfst. Was dort nicht steht, gibt es in der Klausur nicht: Du baust es aus den vorhandenen Befehlen selbst. Besonders bei Python ist das wichtig, weil Python viele Abkürzungen hat:</p>
      <div class="ic-tabw"><table class="ic-tab"><thead><tr><th>Nicht benutzen</th><th>Stattdessen</th></tr></thead><tbody>${B.nicht.map(r => `<tr><td>${r[0]}</td><td>${r[1]}</td></tr>`).join('')}</tbody></table></div>
      <h3>2. Laufzeitfehler vorher ausschließen</h3>
      <p>Ein Befehl, der nicht ausgeführt werden kann (leerer Stapel, Position gibt es nicht), ist ein <b>Laufzeitfehler</b>. In Prüfungsaufgaben musst du diese Fälle mit einer Abfrage <b>ausdrücklich</b> verhindern.</p>
      ${code(`
// Stapel: nie pop() auf einem leeren Stapel
wenn nicht s.isEmpty():
    x ← s.pop()

// dynamische Reihung: nur Positionen von 0 bis getLength() − 1
wenn i ≥ 0 UND i < d.getLength():
    d.delete(i)

// insertAt darf auch an der Position getLength() einfügen (ans Ende)
wenn i ≥ 0 UND i ≤ d.getLength():
    d.insertAt(i, x)`)}
      <h3>3. Vom Befehl zum Python-Code</h3>
      <p>Im <b>Struktogramm</b> benutzt du die Befehle des Beipackzettels (<code>d.getItem(i)</code>, <code>s.push(x)</code>). Beim <b>Implementieren</b> schreibst du Python. Das ist dieselbe Handlung in der Syntax deiner Sprache:</p>
      <div class="ic-tabw"><table class="ic-tab"><thead><tr><th>Struktogramm</th><th>Python</th></tr></thead><tbody>${[
        ['d ← DynArray()', 'd = []'], ['d.getItem(i)', 'd[i]'], ['d.setItem(i, x)', 'd[i] = x'], ['d.append(x)', 'd.append(x)'], ['d.insertAt(i, x)', 'd.insert(i, x)'], ['d.delete(i)', 'del d[i]'], ['d.getLength()', 'len(d)'], ['d.isEmpty()', 'len(d) == 0'],
        ['s.push(x)  ·  s.pop()  ·  s.top()', 's.append(x)  ·  s.pop()  ·  s[-1]'], ['q.enqueue(x)  ·  q.dequeue()  ·  q.head()', 'q.append(x)  ·  q.pop(0)  ·  q[0]'],
        ['a / b  (ganze Zahlen)', 'a // b'], ['a mod b', 'a % b'], ['für jedes x in d', 'for x in d:'], ['für i von 0 bis n − 1', 'for i in range(n):']
      ].map(r => `<tr><td><code>${esc(r[0])}</code></td><td><code>${esc(r[1])}</code></td></tr>`).join('')}</tbody></table></div>
      <h3>4. Wie man einen Ablauf mit den Befehlen dokumentiert</h3>
      <p>Nach <b>jeder</b> Operation schreibst du den ganzen Inhalt auf und, wenn der Befehl etwas zurückgibt, den Rückgabewert. So passiert kein Fehler im Kopf.</p>
      <div class="ic-tabw"><table class="ic-tab"><thead><tr><th>Nr.</th><th>Befehl</th><th>Rückgabe</th><th>Stapel (unten → oben)</th></tr></thead><tbody>
        <tr><td>1</td><td><code>push("A")</code></td><td>–</td><td>A</td></tr><tr><td>2</td><td><code>push("B")</code></td><td>–</td><td>A B</td></tr><tr><td>3</td><td><code>top()</code></td><td>B</td><td>A B</td></tr>
        <tr><td>4</td><td><code>pop()</code></td><td>B</td><td>A</td></tr><tr><td>5</td><td><code>push("C")</code></td><td>–</td><td>A C</td></tr><tr><td>6</td><td><code>isEmpty()</code></td><td>falsch</td><td>A C</td></tr></tbody></table></div>
      <p>Bei der Reihung zusätzlich die <b>Positionen</b> über die Elemente schreiben (0, 1, 2 …), denn bei <code>insertAt</code> und <code>delete</code> verschieben sich alle folgenden.</p>
      <h3>5. Typische Fehler</h3>
      <ul><li><code>pop</code> und <code>top</code> verwechselt (<code>top</code> lässt das Element liegen).</li><li><code>dequeue</code> vorn, <code>enqueue</code> hinten, beim Stapel dagegen alles oben.</li><li>Position bei 1 statt bei 0 angefangen zu zählen.</li><li><code>delete(i)</code> mit <code>i = getLength()</code>: Diese Position gibt es nicht. Bei <code>insertAt</code> ist sie dagegen erlaubt.</li><li>Eine Python-Abkürzung benutzt, die auf dem Beipackzettel fehlt (<code>sort</code>, <code>min</code>, <code>reverse</code>).</li></ul>
      <h3>6. Struktogramm-Schreibweise (Abschnitt 5)</h3>
      <div class="ic-tabw"><table class="ic-tab"><tbody>${B.notation.map(r => `<tr><td><b>${r[0]}</b></td><td>${r[1]}</td></tr>`).join('')}</tbody></table></div></div>`;
  }

  // ------------------------------------------------------------ Training: zufällige Befehlsfolge
  function training(host) {
    const L = window.INF_DEMO_LOGIC;
    let kind = 'stack', t = null, done = 0, right = 0;
    const NAMES = { dyn: 'Dynamische Reihung (Start: leer)', stack: 'Stapel (Start: leer)', queue: 'Schlange (Start: leer)' };
    host.innerHTML = `<p class="muted">Eine zufällige Folge von Befehlen wird auf eine leere Struktur angewendet. Sag, was die <b>letzte</b> Operation liefert und wie die Struktur <b>am Ende</b> aussieht.</p>
      <div class="pd-seg" id="tk" role="group">${[['stack', 'Stapel'], ['queue', 'Schlange'], ['dyn', 'Reihung']].map(([v, l]) => `<button type="button" data-v="${v}" class="${v === kind ? 'on' : ''}" aria-pressed="${v === kind}">${l}</button>`).join('')}</div>
      <div class="bf-task" id="tt"></div>
      <div class="id-form"><label>Rückgabe der letzten Operation <input class="input" id="a1" autocomplete="off" placeholder="z. B. B, 3, wahr"></label><label id="l2">Inhalt am Ende <input class="input" id="a2" autocomplete="off"></label></div>
      <div class="pd-btns"><button class="btn small primary" type="button" id="chk">Prüfen</button><button class="btn small" type="button" id="nxt">Neue Folge</button></div>
      <p class="pd-msg" id="fb"></p><p class="row-sub" id="cnt"></p>`;
    function neu() {
      t = L.makeTraining(kind);
      const unit = kind === 'stack' ? 'von unten nach oben' : kind === 'queue' ? 'von vorn nach hinten' : 'ab Position 0';
      $('#tt', host).innerHTML = `<b>${NAMES[kind]}</b><ol class="bf-ops">${t.ops.map((o, i) => `<li${i === t.ops.length - 1 ? ' class="last"' : ''}><code>${esc(o)}</code></li>`).join('')}</ol>`;
      $('#a1', host).value = ''; $('#a2', host).value = ''; $('#a2', host).placeholder = `${unit}, durch Leerzeichen getrennt (leer lassen, wenn leer)`;
      $('#fb', host).textContent = ''; $('#fb', host).classList.remove('bad');
      $('#chk', host).disabled = false;
    }
    $$('#tk button', host).forEach(b => b.addEventListener('click', () => { kind = b.dataset.v; $$('#tk button', host).forEach(x => { x.classList.toggle('on', x === b); x.setAttribute('aria-pressed', x === b); }); neu(); }));
    $('#nxt', host).addEventListener('click', neu);
    $('#chk', host).addEventListener('click', () => {
      const r = L.checkTraining(t, $('#a1', host).value, $('#a2', host).value);
      done++; if (r.last && r.final) right++;
      const fin = t.finalItems.length ? t.finalItems.join(' ') : '(leer)';
      const fb = $('#fb', host);
      fb.classList.toggle('bad', !(r.last && r.final));
      fb.innerHTML = `${r.last ? '✓ Letzte Operation richtig.' : '✗ Letzte Operation: richtig wäre <b>' + esc(t.lastAnswer) + '</b>.'} ${r.final ? '✓ Inhalt am Ende richtig.' : '✗ Inhalt am Ende: richtig wäre <b>' + esc(fin) + '</b>.'} <br>Tipp: Schreib nach jeder Operation den ganzen Inhalt auf.`;
      $('#cnt', host).textContent = `${right} von ${done} Folgen ganz richtig.`;
      $('#chk', host).disabled = true;
    });
    neu();
  }

  // ------------------------------------------------------------ Seite
  function view() {
    const B = window.INF_BEFEHLE, s = A.byId.informatik;
    const html = `<div ${A.subjStyle(s)} class="rise bf">
      <div class="page-head"><span class="kicker">Informatik · Hilfsmittel in der Klausur</span><h2 class="h-1">Beipackzettel: die erlaubten Befehle</h2>
        <p class="muted">Alles, was auf dem Beipackzettel <b>grün</b> hinterlegt ist, darfst du mit in die Klausur nehmen. Die Befehle dort sind <b>Pflicht, und es gibt keine anderen</b>. Hier lernst du, mit ihnen zu arbeiten.</p></div>
      <div class="notice">${A.icon('info')}<div>Der Beipackzettel ist dein Ausdruck von <code>INF_Ergaenzende-Hinweise_GO_Neufassung_2025d.pdf</code> (Abschnitte 1 bis 4 sind der Kern). Prüf im Zweifel immer deine Papierversion.</div></div>
      <div class="pd-seg bf-tabs" id="bft" role="tablist">${[['nach', 'Nachschlagen'], ['test', 'Ausprobieren'], ['train', 'Training'], ['regel', 'So arbeitest du damit']].map(([v, l], i) => `<button type="button" role="tab" data-v="${v}" class="${i === 0 ? 'on' : ''}" aria-selected="${i === 0}">${l}</button>`).join('')}</div>
      <section data-p="nach">${nachschlagen(B)}</section>
      <section data-p="test" hidden><div class="pd-seg" id="bfd" role="group">${[['i-zeichen', 'Zeichenketten'], ['i-dynarray', 'Dynamische Reihung'], ['i-stack', 'Stapel'], ['i-queue', 'Schlange']].map(([v, l], i) => `<button type="button" data-v="${v}" class="${i === 0 ? 'on' : ''}" aria-pressed="${i === 0}">${l}</button>`).join('')}</div><div class="demo pdemo" id="bfdemo"></div></section>
      <section data-p="train" hidden><div class="demo pdemo" id="bftrain"></div></section>
      <section data-p="regel" hidden>${regeln(B)}</section>
      <p class="row-sub bf-links">Weiter lernen: <a class="link" href="#/ordner/i-ds">Datenstrukturen</a> · <a class="link" href="#/spick/informatik">Spickzettel</a> · <a class="link" href="#/ordner/i-probe">Probeklausuren</a></p></div>`;
    return {
      title: 'Beipackzettel', back: '#/fach/informatik', nav: 'faecher', html,
      after(root) {
        const show = v => { $$('#bft button', root).forEach(b => { const on = b.dataset.v === v; b.classList.toggle('on', on); b.setAttribute('aria-selected', on); }); $$('section[data-p]', root).forEach(x => { x.hidden = x.dataset.p !== v; }); };
        $$('#bft button', root).forEach(b => b.addEventListener('click', () => show(b.dataset.v)));
        const mountDemo = name => { const h = $('#bfdemo', root); h.innerHTML = ''; (window.LR_DEMOS || {})[name](h); };
        $$('#bfd button', root).forEach(b => b.addEventListener('click', () => { $$('#bfd button', root).forEach(x => { x.classList.toggle('on', x === b); x.setAttribute('aria-pressed', x === b); }); mountDemo(b.dataset.v); }));
        mountDemo('i-zeichen');
        training($('#bftrain', root));
        const q = $('#bfq', root);
        q.addEventListener('input', () => {
          const w = q.value.trim().toLowerCase().split(/\s+/).filter(Boolean); let any = false;
          $$('#bfsecs .bf-sec', root).forEach(sec => {
            let n = 0; $$('tbody tr', sec).forEach(tr => { const ok = w.every(x => tr.dataset.s.includes(x)); tr.hidden = !ok; if (ok) n++; });
            sec.hidden = w.length > 0 && n === 0; if (w.length && n) sec.open = true; if (n) any = true;
          });
          $('#bfnone', root).hidden = !w.length || any;
        });
        if (location.hash.indexOf('?q=') > 0) { q.value = decodeURIComponent(location.hash.split('?q=')[1]); q.dispatchEvent(new Event('input')); }
      }
    };
  }

  window.LRBefehle = { init(app) { A = app; A.R.befehle = view; } };
})();
