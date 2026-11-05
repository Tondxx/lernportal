// ============================================================
// SCHAR_KURS.JS  –  Mathe-Lernportal Modul 07
// Funktionsscharen & Ortskurven komplett: Erklärung, Ortskurven-Labor (interaktiv),
// Abi-Übungen Teil A/B mit Erwartungshorizont, Auswertung.
// Aufgaben sind eigene Aufgaben im Stil des Unterrichts und des Zentralabiturs
// Niedersachsen (eA). Musterlösungen sind NICHT offizielle Lösungsvorgaben des Landes.
// Benötigt integral_kurs.js (IKLib: Mathe-Rendering, Aufgaben-Engine, Fortschritt).
// ============================================================
(function () {
  'use strict';
  if (!window.IKLib) { console.warn('schar_kurs.js: IKLib fehlt (integral_kurs.js muss vorher geladen werden).'); return; }
  const L = window.IKLib;
  const { M, renderMath, plotSetup, drawCurve, fmt, fmtN } = L;

  let currentTab = 'erklaerung';
  let labIdx = 0;

  // ---------- Ortskurven-Labor: Scharen ----------
  const S5 = Math.sqrt(5), S3 = Math.sqrt(3);
  const LAB = [
    {
      title: 'f_k(t) = 0,02·t·(t − k)(t − 2k)(t − 3k)   (Hochbehälter-Typ)', pname: 'k',
      f: (x, k) => 0.02 * x * (x - k) * (x - 2 * k) * (x - 3 * k),
      kmin: 1, kmax: 8, kstep: 0.25, k0: 6, view: { xmin: -2, xmax: 26, ymin: -90, ymax: 60 },
      pts: [
        { name: 'H', color: '#16a34a', tex: 'H_k(1{,}5k\\,|\\,0{,}01125k^4)', x: k => 1.5 * k, y: k => 0.01125 * Math.pow(k, 4), n: 4, exact: 'y = x⁴/450   (x > 0)' },
        { name: 'T₁', color: '#dc2626', tex: 'T_{1}\\bigl((1{,}5-\\tfrac{\\sqrt5}{2})k\\,|\\,-0{,}02k^4\\bigr)', x: k => (1.5 - S5 / 2) * k, y: k => -0.02 * Math.pow(k, 4), n: 4, exact: '' },
        { name: 'T₂', color: '#ea580c', tex: 'T_{2}\\bigl((1{,}5+\\tfrac{\\sqrt5}{2})k\\,|\\,-0{,}02k^4\\bigr)', x: k => (1.5 + S5 / 2) * k, y: k => -0.02 * Math.pow(k, 4), n: 4, exact: '' }
      ],
      note: 'Der Graph ist achsensymmetrisch zu t = 1,5k. Der Hochpunkt liegt in der Mitte; die beiden Tiefpunkte sind gleich tief.'
    },
    {
      title: 'f_t(x) = x² − 4tx + 3t²   (Parabelschar)', pname: 't',
      f: (x, k) => x * x - 4 * k * x + 3 * k * k,
      kmin: -3, kmax: 3, kstep: 0.25, k0: 1, view: { xmin: -9, xmax: 9, ymin: -11, ymax: 20 },
      pts: [
        { name: 'S', color: '#16a34a', tex: 'S_t(2t\\,|\\,-t^2)', x: k => 2 * k, y: k => -k * k, n: 2, exact: 'y = −x²/4' }
      ],
      note: 'Scheitelform: f_t(x) = (x − 2t)² − t². Alle Scheitelpunkte liegen auf der Parabel y = −x²/4.'
    },
    {
      title: 'f_k(x) = x³ − 3kx,  k > 0', pname: 'k',
      f: (x, k) => x * x * x - 3 * k * x,
      kmin: 0.25, kmax: 4, kstep: 0.05, k0: 1.5, view: { xmin: -4, xmax: 4, ymin: -16, ymax: 16 },
      pts: [
        { name: 'H', color: '#16a34a', tex: 'H_k(-\\sqrt k\\,|\\,2k\\sqrt k)', x: k => -Math.sqrt(k), y: k => 2 * k * Math.sqrt(k), n: 3, exact: 'y = −2x³   (x < 0)' },
        { name: 'T', color: '#dc2626', tex: 'T_k(\\sqrt k\\,|\\,-2k\\sqrt k)', x: k => Math.sqrt(k), y: k => -2 * k * Math.sqrt(k), n: 3, exact: 'y = −2x³   (x > 0)' }
      ],
      note: 'Beide Extrempunkte liegen auf der gleichen Kurve y = −2x³. Der Wendepunkt (0|0) ist für alle k derselbe.'
    },
    {
      title: 'f_a(x) = x·(x − a)(x − 2a),  a > 0', pname: 'a',
      f: (x, k) => x * (x - k) * (x - 2 * k),
      kmin: 0.5, kmax: 3, kstep: 0.05, k0: 2, view: { xmin: -1.5, xmax: 7, ymin: -14, ymax: 14 },
      pts: [
        { name: 'H', color: '#16a34a', tex: 'H_a\\bigl((1-\\tfrac{\\sqrt3}{3})a\\,|\\,\\tfrac{2\\sqrt3}{9}a^3\\bigr)', x: k => (1 - S3 / 3) * k, y: k => 2 * S3 / 9 * Math.pow(k, 3), n: 3, exact: 'y = ((5 + 3√3)/2)·x³ ≈ 5,098·x³' },
        { name: 'T', color: '#dc2626', tex: 'T_a\\bigl((1+\\tfrac{\\sqrt3}{3})a\\,|\\,-\\tfrac{2\\sqrt3}{9}a^3\\bigr)', x: k => (1 + S3 / 3) * k, y: k => -2 * S3 / 9 * Math.pow(k, 3), n: 3, exact: 'y = ((5 − 3√3)/2)·x³ ≈ −0,098·x³' },
        { name: 'W', color: '#7c3aed', tex: 'W_a(a\\,|\\,0)', x: k => k, y: () => 0, n: 1, exact: 'y = 0  (x-Achse, a > 0)' }
      ],
      note: 'Der Wendepunkt W_a(a|0) ist Symmetriepunkt des Graphen (Punktsymmetrie zu (a|0)). Die Ortskurve der Wendepunkte ist die x-Achse.'
    },
    {
      title: 'f_a(x) = x²·(a − x),  a > 0', pname: 'a',
      f: (x, k) => x * x * (k - x),
      kmin: 0.5, kmax: 4.5, kstep: 0.05, k0: 3, view: { xmin: -1.5, xmax: 6, ymin: -6, ymax: 22 },
      pts: [
        { name: 'H', color: '#16a34a', tex: 'H_a\\bigl(\\tfrac23a\\,|\\,\\tfrac{4}{27}a^3\\bigr)', x: k => 2 * k / 3, y: k => 4 * Math.pow(k, 3) / 27, n: 3, exact: 'y = x³/2   (x > 0)' },
        { name: 'W', color: '#7c3aed', tex: 'W_a\\bigl(\\tfrac13a\\,|\\,\\tfrac{2}{27}a^3\\bigr)', x: k => k / 3, y: k => 2 * Math.pow(k, 3) / 27, n: 3, exact: 'y = 2x³   (x > 0)' },
        { name: 'T', color: '#dc2626', tex: 'T(0\\,|\\,0)', x: () => 0, y: () => 0, n: null, exact: 'fester Punkt (0|0) für alle a' }
      ],
      note: 'Alle Graphen berühren die x-Achse im Ursprung (gemeinsamer Tiefpunkt). Hoch- und Wendepunkte wandern auf Kurven 3. Grades.'
    }
  ];

  function sup(n) { return ({ 1: '', 2: '²', 3: '³', 4: '⁴' })[n] != null ? ({ 1: '', 2: '²', 3: '³', 4: '⁴' })[n] : '^' + n; }

  function labDraw() {
    const c = document.getElementById('sk-lab');
    if (!c) return;
    const D = LAB[labIdx];
    const k = +document.getElementById('sk-lab-k').value;
    document.getElementById('sk-lab-kval').textContent = D.pname + ' = ' + fmt(k);
    const S = plotSetup(c, D.view.xmin, D.view.xmax, D.view.ymin, D.view.ymax);
    const { ctx, X, Y, P, pw, ph } = S;
    ctx.save();
    ctx.beginPath(); ctx.rect(P.l, P.t, pw, ph); ctx.clip();
    // blasse Schar
    const steps = 9;
    for (let i = 0; i < steps; i++) {
      const kk = D.kmin + (D.kmax - D.kmin) * i / (steps - 1);
      drawCurve(S, x => D.f(x, kk), D.view.xmin, D.view.xmax, 'rgba(100,116,139,0.32)', 1.2);
    }
    // Ortskurven (parametrisch)
    D.pts.forEach(p => {
      if (p.n == null) return;
      ctx.beginPath(); ctx.strokeStyle = p.color; ctx.lineWidth = 2.4;
      for (let j = 0; j <= 240; j++) {
        const kk = D.kmin + (D.kmax - D.kmin) * j / 240;
        const x = X(p.x(kk)), y = Y(p.y(kk));
        if (j === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();
    });
    // aktuelle Kurve
    drawCurve(S, x => D.f(x, k), D.view.xmin, D.view.xmax, '#0284c7', 3);
    // aktuelle Punkte
    D.pts.forEach(p => {
      ctx.fillStyle = p.color; ctx.strokeStyle = '#fff'; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.arc(X(p.x(k)), Y(p.y(k)), 6, 0, 2 * Math.PI); ctx.fill(); ctx.stroke();
      ctx.fillStyle = S.col.text; ctx.font = 'bold 12px system-ui'; ctx.textAlign = 'left';
      ctx.fillText(p.name, X(p.x(k)) + 9, Y(p.y(k)) - 8);
    });
    ctx.restore();
    ctx.fillStyle = S.col.text; ctx.font = 'bold 12px system-ui'; ctx.textAlign = 'left';
    ctx.fillText('blau = f_' + D.pname + '  ·  graue Kurven = weitere Mitglieder der Schar  ·  farbige Kurven = Ortskurven', P.l + 6, P.t + 12);
    // Info
    const out = document.getElementById('sk-lab-out');
    if (out) {
      let rows = '<table class="ik-table"><tr><th>Punkt</th><th>Koordinaten (' + D.pname + ' = ' + fmt(k) + ')</th><th>Ortskurve</th></tr>';
      D.pts.forEach(p => {
        let ok = p.exact;
        if (!ok && p.n != null) {
          const coef = p.y(1) / Math.pow(p.x(1), p.n);
          ok = 'y ≈ ' + fmtN(coef, 5) + '·x' + sup(p.n) + '  (aus x(' + D.pname + '), y(' + D.pname + ') durch Eliminieren)';
        }
        rows += '<tr><td><span style="color:' + p.color + ';font-weight:700">' + p.name + '</span> &nbsp; ' + M('$' + p.tex + '$') + '</td><td>(' + fmt(p.x(k)) + ' | ' + fmt(p.y(k)) + ')</td><td>' + ok + '</td></tr>';
      });
      rows += '</table><div>' + D.note + '</div>';
      out.innerHTML = rows;
      renderMath(out);
    }
  }
  function labSelect(i) {
    labIdx = +i;
    const D = LAB[labIdx];
    const sl = document.getElementById('sk-lab-k');
    sl.min = D.kmin; sl.max = D.kmax; sl.step = D.kstep; sl.value = D.k0;
    document.getElementById('sk-lab-title').textContent = D.title;
    labDraw();
  }

  // ---------- Erklärung ----------
  const SECTIONS = [
    {
      id: 'sec1', title: '1 · Was ist eine Funktionenschar?',
      html: String.raw`
<p>Eine <b>Funktionenschar</b> (Kurvenschar) $f_k$ ist eine Funktion, deren Term außer der Variablen $x$ noch einen <b>Parameter</b> $k$ (auch $a$ oder $t$ genannt) enthält, z. B. $f_k(x)=x^3-3kx$. Für jeden zulässigen Wert von $k$ erhält man eine eigene Funktion mit eigenem Graphen – zusammen bilden sie die „Schar“ der Graphen.</p>
<ul>
  <li>Beim Rechnen ist der Parameter eine <b>Konstante</b> (wie eine Zahl). Beim Ableiten nach $x$ wird er <b>nicht</b> abgeleitet: $f_k'(x)=3x^2-3k$.</li>
  <li>Setzt man für $k$ eine Zahl ein, erhält man einen <b>Spezialfall</b>: $f_3$, $f_{-1}$ usw.</li>
  <li><b>Zulässigen Bereich</b> des Parameters beachten (z. B. $k>0$ oder $a\neq0$).</li>
  <li><b>Faktorform</b> $f_a(x)=x(x-a)(x-2a)$: Nullstellen sofort ablesbar. <b>Ausmultipliziert</b> $f_a(x)=x^3-3ax^2+2a^2x$: bequem zum Ableiten und Integrieren.</li>
</ul>
<div class="ik-box ok"><b>Alle Rechenregeln der Analysis bleiben gleich.</b> Neu ist nur: Nullstellen, Extremstellen, Flächen usw. hängen von $k$ ab und sind <b>Terme in $k$</b>.</div>`
    },
    {
      id: 'sec2', title: '2 · Standardaufgaben bei Scharen – Katalog mit Lösungsweg',
      html: String.raw`
<table class="ik-table">
  <tr><th>Aufgabe</th><th>Vorgehen</th><th>Beispiel $f_a(x)=x(x-a)(x-2a)$</th></tr>
  <tr><td>Nullstellen angeben</td><td>Faktorform, Satz vom Nullprodukt</td><td>$x=0$, $x=a$, $x=2a$</td></tr>
  <tr><td>Symmetrie begründen</td><td>Achsensymmetrie zu $x=x_0$: $f(x_0+u)=f(x_0-u)$. Punktsymmetrie zu $(x_0|y_0)$: $f(x_0+u)-y_0=-(f(x_0-u)-y_0)$.</td><td>$f_a(a+u)=(a+u)\,u\,(u-a)=u(u^2-a^2)$ ist ungerade in $u$ ⇒ punktsymmetrisch zu $(a|0)$</td></tr>
  <tr><td>Gemeinsame Punkte aller Graphen</td><td>Term nach $k$ ordnen: $f_k(x)=k\cdot g(x)+h(x)$. Wo $g(x)=0$, hängt der Wert nicht von $k$ ab ⇒ Punkt $(x|h(x))$.</td><td>$f_k(x)=k(x^2-2x)+3$: $x^2-2x=0$ ⇒ $(0|3)$ und $(2|3)$</td></tr>
  <tr><td>Extrem- und Wendepunkte</td><td>$f_k'(x)=0$ mit dem Parameter lösen (Lösungen enthalten $k$). Art mit $f_k''$ oder Vorzeichenwechsel; bei Fallunterscheidung auf das Vorzeichen von $k$ achten.</td><td>$f_a'(x)=3x^2-6ax+2a^2=0\Rightarrow x=a\pm\frac{\sqrt3}{3}a$</td></tr>
  <tr><td>Parameter bestimmen</td><td>Bedingung als Gleichung in $k$ schreiben und lösen (Teil B: Rechner).</td><td>„Hochpunkt bei $x=9$“ und Hochpunkt bei $1{,}5k$ ⇒ $k=6$</td></tr>
  <tr><td>Tangente / Normale</td><td>Steigung $m=f_k'(x_0)$, Punkt $(x_0|f_k(x_0))$, Tangente $y=m(x-x_0)+f_k(x_0)$</td><td>Wendetangente: $y=f_a'(a)\,(x-a)=-a^2(x-a)$</td></tr>
  <tr><td>Fläche / Integral mit Parameter</td><td>Stammfunktion bezüglich $x$ bilden, Grenzen einsetzen ⇒ Ergebnis als Term in $k$; „Fläche = c“ ⇒ Gleichung in $k$.</td><td>$\int_0^a x(x-a)\,dx=-\frac{a^3}{6}$ ⇒ $A=\frac{a^3}{6}$</td></tr>
  <tr><td>Verhältnisse / Vergleiche</td><td>Beide Größen als Terme in $k$ aufstellen, Quotient bilden (oft kürzt sich $k$).</td><td>Flächenverhältnis unabhängig vom Parameter?</td></tr>
  <tr><td>Schar aus Steckbrief</td><td>Zu wenig Bedingungen ⇒ LGS ist unterbestimmt: eine Variable frei wählen (Parameter) und die übrigen in ihr ausdrücken.</td><td>siehe Abschnitt 5</td></tr>
</table>
<p style="font-size:0.82rem;color:var(--text-muted)">Die Schar $f_a(x)=x(x-a)(x-2a)$ kommt in genau dieser Form im Zentralabitur 2021 (eA, Aufgabe 1B) vor; die offiziellen Aufgaben samt Erwartungshorizont liegen lokal in <code>Faecher/Mathe/01_Material/abitur-niedersachsen/2021</code>.</p>`
    },
    {
      id: 'sec3', title: '3 · Extrem- und Wendepunkte in Abhängigkeit vom Parameter',
      html: String.raw`
<p><b>Ablauf (immer gleich):</b></p>
<ol>
  <li>Ableitungen nach $x$ bilden: $f_k'$, $f_k''$ ($k$ ist Konstante).</li>
  <li>Notwendige Bedingung $f_k'(x)=0$ lösen. Lösungen sind Terme mit $k$ (z. B. $x=1{,}5k$).</li>
  <li>Hinreichende Bedingung: $f_k''(x_E)\ne0$ ⇒ Art des Extremums, oder Vorzeichenwechsel von $f_k'$. Das Vorzeichen kann von $k$ abhängen ⇒ <b>Fallunterscheidung</b> ($k>0$ / $k<0$).</li>
  <li>$y$-Koordinate: $x_E$ in $f_k$ einsetzen ⇒ Punkt $E_k(x_E\,|\,f_k(x_E))$ mit Termen in $k$.</li>
</ol>
<div class="ik-box ok"><b>Beispiel (Hochbehälter-Typ, symmetrische Schar 4. Grades):</b> $z_k(t)=c\,t(t-k)(t-2k)(t-3k)$ mit $c>0$, $k>0$.<br>
Die Nullstellen $0,k,2k,3k$ liegen symmetrisch um $t=1{,}5k$. Mit $u=t-1{,}5k$ wird $z_k=c\,(u^2-\tfrac94k^2)(u^2-\tfrac14k^2)=c\,(u^4-\tfrac52k^2u^2+\tfrac9{16}k^4)$. Also:
$$z_k'=c\,(4u^3-5k^2u)=c\,u\,(4u^2-5k^2),\qquad z_k''=c\,(12u^2-5k^2).$$
$u=0$ (also $t=1{,}5k$): $z_k''=-5ck^2<0$ ⇒ <b>Hochpunkt</b> $H_k\bigl(1{,}5k\,|\,\tfrac{9}{16}ck^4\bigr)$. $u=\pm\tfrac{\sqrt5}{2}k$: $z_k''=10ck^2>0$ ⇒ <b>Tiefpunkte</b> bei $t=(1{,}5\pm\tfrac{\sqrt5}{2})k$ mit $z_k=-ck^4$.</div>
<p>Für $c=0{,}02$: $H_k(1{,}5k\,|\,0{,}01125k^4)$, Tiefpunkte mit $y=-0{,}02k^4$. Bei $k=6$: Hochpunkt $(9|14{,}58)$, Tiefpunkte $\approx(2{,}29|-25{,}92)$ und $(15{,}71|-25{,}92)$.</p>`
    },
    {
      id: 'sec4', title: '4 · Ortskurve (Ortslinie) bestimmen',
      html: String.raw`
<p>Die <b>Ortskurve</b> einer Schar ist die Kurve, auf der alle Punkte $P_k$ einer bestimmten Art (z. B. alle Hochpunkte $H_k$) liegen, wenn $k$ alle zulässigen Werte durchläuft. Sie ist <b>nicht</b> der Graph einer Scharfunktion, sondern die Spur eines wandernden Punktes (siehe Ortskurven-Labor).</p>
<div class="ik-box"><b>Verfahren in 4 Schritten:</b>
<ol>
  <li><b>Koordinaten</b> des Punktes als Terme in $k$ aufstellen: $x=x(k)$ und $y=y(k)$.</li>
  <li>Die $x$-Gleichung <b>nach $k$ auflösen</b>: $k=k(x)$.</li>
  <li>Das Ergebnis in die $y$-Gleichung <b>einsetzen</b>: $y=y(k(x))$ – das ist die Gleichung der Ortskurve.</li>
  <li><b>Definitionsbereich</b> angeben: Welche $x$-Werte entstehen aus den zulässigen $k$? (z. B. $k>0\Rightarrow x>0$.)</li>
</ol></div>
<p><b>Beispiel 1 – Scheitelpunkte:</b> $f_t(x)=x^2-4tx+3t^2=(x-2t)^2-t^2$. Scheitelpunkt $S_t(2t\,|\,-t^2)$. Aus $x=2t$ folgt $t=\frac x2$, damit $y=-\bigl(\frac x2\bigr)^2=-\frac{x^2}{4}$. <b>Ortskurve: $y=-\tfrac14x^2$</b>.</p>
<p><b>Beispiel 2 – Hochpunkte (Hochbehälter-Typ):</b> $H_k(1{,}5k\,|\,0{,}01125k^4)$. $x=1{,}5k\Rightarrow k=\frac{x}{1{,}5}$. $y=0{,}01125\cdot\bigl(\frac{x}{1{,}5}\bigr)^4=\frac{0{,}01125}{5{,}0625}\,x^4=\frac{x^4}{450}$. <b>Ortskurve: $y=\frac{1}{450}x^4$ für $x>0$</b> (wegen $k>0$). Kontrolle: $k=6$: $H(9|14{,}58)$ und $\frac{9^4}{450}=14{,}58$ ✓.</p>
<p><b>Beispiel 3 – zwei Extrempunkte, eine Kurve:</b> $f_k(x)=x^3-3kx$ ($k>0$): $f_k'=3x^2-3k=0\Rightarrow x=\pm\sqrt k$. $H_k(-\sqrt k\,|\,2k\sqrt k)$, $T_k(\sqrt k\,|\,-2k\sqrt k)$. Aus $x=\pm\sqrt k$ folgt $k=x^2$. Einsetzen in $T_k$: $y=-2x^2\cdot x=-2x^3$ ($x>0$); in $H_k$: $y=2x^2\cdot(-x)=-2x^3$ ($x<0$). <b>Beide liegen auf $y=-2x^3$</b> (Ortskurve für $x\ne0$).</p>
<p><b>Beispiel 4 – Wendepunkte:</b> $f_a(x)=x(x-a)(x-2a)$: $W_a(a\,|\,0)$. Der $y$-Wert ist immer 0 ⇒ <b>Ortskurve: $y=0$</b> (die $x$-Achse, $x\neq0$ wegen $a\ne0$).</p>
<ul>
  <li>Ist die $x$-Koordinate <b>konstant</b> (z. B. $S_k(1|k-1)$), ist die Ortskurve eine senkrechte Gerade $x=1$ (keine Funktion).</li>
  <li>Ist die $y$-Koordinate konstant, ist die Ortskurve eine waagerechte Gerade.</li>
  <li><b>Probe:</b> Einen konkreten Wert für $k$ wählen und prüfen, ob der Punkt die Ortskurvengleichung erfüllt.</li>
  <li>Enthalten $x$ und $y$ Wurzeln ($k=x^2$), Fallunterscheidung bei Vorzeichen von $x$ nicht vergessen.</li>
</ul>`
    },
    {
      id: 'sec5', title: '5 · Parameter bestimmen & Schar aus Steckbrief',
      html: String.raw`
<p><b>Parameter aus einer Bedingung bestimmen:</b> Die Bedingung in eine Gleichung für $k$ übersetzen und lösen.</p>
<ul>
  <li>„Der Hochpunkt liegt 9 Stunden nach Beginn“: $1{,}5k=9\Rightarrow k=6$, Funktion $f(t)=0{,}02\,t(t-6)(t-12)(t-18)$.</li>
  <li>„Die Tangente in $P$ hat die Steigung $m$“: $f_k'(x_P)=m$.</li>
  <li>„Der Graph berührt die $x$-Achse“: doppelte Nullstelle ⇒ Diskriminante $=0$ oder $f_k=f_k'=0$ gleichzeitig.</li>
</ul>
<p><b>Schar aus einer Steckbriefaufgabe</b> (Beispielaufgabe im Unterricht: 3. Grades, Extremum bei $-1$ und $3$, Wendepunkt bei $x=1$ mit Wert $4$): Reichen die Bedingungen nicht für eine eindeutige Lösung, ist das LGS unterbestimmt. Man wählt <b>eine Variable als Parameter</b> und drückt die anderen durch sie aus ⇒ die Lösungsmenge ist eine <b>Funktionenschar</b>.</p>
<div class="ik-box ok"><b>Beispiel:</b> Eine ganzrationale Funktion 3. Grades hat bei $x=-2$ ein lokales Extremum und bei $x=1$ einen Wendepunkt mit dem Funktionswert 2. Ansatz $f(x)=ax^3+bx^2+cx+d$.
<ul>
  <li>$f'(-2)=0$: $12a-4b+c=0$</li>
  <li>$f''(1)=0$: $6a+2b=0\Rightarrow b=-3a$</li>
  <li>$f(1)=2$: $a+b+c+d=2$</li>
</ul>
⇒ $c=-24a$, $d=2+26a$ und damit $f_a(x)=ax^3-3ax^2-24ax+26a+2$ ($a\neq0$). Probe: $f_a''(x)=6ax-6a$ hat bei $x=1$ einen Vorzeichenwechsel ✓; $f_a''(-2)=-18a\ne0$ ⇒ bei $x=-2$ liegt für <b>jedes</b> $a\ne0$ ein Extremum (Hochpunkt für $a>0$, Tiefpunkt für $a<0$).</div>
<p><b>Zulässige Parameter prüfen:</b> Die Bedingungen der Aufgabe (z. B. „Hochpunkt“ statt Tiefpunkt) schränken den Parameter ein – mit $f''$ prüfen und das Ergebnis begründen.</p>`
    },
    {
      id: 'sec6', title: '6 · Integral, Fläche und Tangenten mit Parameter',
      html: String.raw`
<p><b>Fläche in Abhängigkeit vom Parameter:</b> Integrieren wie gewohnt nach $x$, $k$ bleibt Konstante. Ergebnis ist ein Term in $k$.</p>
<div class="ik-box ok"><b>Beispiel:</b> $f_a(x)=x^2(a-x)$, $a>0$, Nullstellen $0$ (doppelt) und $a$.<br>
$$A(a)=\int_0^a (ax^2-x^3)\,dx=\Bigl[\tfrac a3x^3-\tfrac14x^4\Bigr]_0^a=\tfrac{a^4}{3}-\tfrac{a^4}{4}=\tfrac{a^4}{12}.$$
Soll $A=\tfrac{27}{4}$ gelten: $\tfrac{a^4}{12}=\tfrac{27}{4}\Rightarrow a^4=81\Rightarrow a=3$.</div>
<p><b>Wendetangente und Dreieck:</b> Für $f_a(x)=x^2(a-x)$: $f_a'=2ax-3x^2$, $f_a''=2a-6x=0\Rightarrow x=\frac a3$, $W_a\bigl(\frac a3\,|\,\frac{2a^3}{27}\bigr)$, Steigung $f_a'(\frac a3)=\frac{a^2}{3}$. Tangente: $y=\frac{a^2}{3}x-\frac{a^3}{27}$. Achsenabschnitte: $x=\frac a9$, $y=-\frac{a^3}{27}$. Dreieck mit den Achsen: $A_\Delta=\frac12\cdot\frac a9\cdot\frac{a^3}{27}=\frac{a^4}{486}$.</p>
<ul>
  <li><b>Fläche zwischen Graph und $x$-Achse:</b> Nullstellen (Terme in $k$) als Grenzen, in Teilintervalle zerlegen, Beträge addieren; je nach Vorzeichen von $k$ andere Reihenfolge der Grenzen.</li>
  <li><b>Verhältnis zweier Flächen:</b> beide als Terme in $a$ aufstellen – oft kürzt sich der Parameter.</li>
  <li><b>Teil B:</b> Gleichungen wie $A(a)=1$ nicht von Hand lösbar ⇒ Rechner (Schnittpunkt/Lösen), Ergebnis auf passende Näherung runden und mit dem zulässigen Bereich des Parameters vergleichen.</li>
</ul>`
    },
    {
      id: 'sec7', title: '7 · Typische Fehler & Prüfungs-Check',
      html: String.raw`
<table class="ik-table">
  <tr><th>Fehler</th><th>Richtig</th></tr>
  <tr><td>Parameter mit abgeleitet</td><td>$k$ ist Konstante: $(kx)'=k$, $(k^2)'=0$</td></tr>
  <tr><td>Ortskurve nur für einen Wert von $k$ berechnet</td><td>$k$ eliminieren; die Gleichung enthält nur $x$ und $y$</td></tr>
  <tr><td>Definitionsbereich der Ortskurve vergessen</td><td>Aus dem zulässigen $k$ den $x$-Bereich ableiten ($k>0\Rightarrow x>0$)</td></tr>
  <tr><td>Hochpunkt ohne Nachweis angegeben</td><td>$f'=0$ <u>und</u> $f''<0$ (oder VZW) zeigen, auch Vorzeichen von $k$ beachten</td></tr>
  <tr><td>Nur eine Extremstelle gefunden</td><td>Quadratische Gleichung in $x$ liefert zwei Lösungen ($\pm$) – beide prüfen</td></tr>
  <tr><td>Fallunterscheidung ($k>0$/$k<0$) vergessen</td><td>Bei Wurzeln, Hoch-/Tiefpunkt und Intervallgrenzen Vorzeichen von $k$ beachten</td></tr>
  <tr><td>Schar mit Graph einer Funktion verwechselt</td><td>Schar = viele Graphen; Ortskurve = Spur eines Punktes</td></tr>
  <tr><td>Steckbrief-LGS: „keine Lösung“ geschrieben</td><td>Unterbestimmt ⇒ Parameter einführen, Lösungsschar angeben</td></tr>
  <tr><td>Ergebnis ohne Probe</td><td>Konkreten Wert für $k$ einsetzen und mit Rechner/Graph kontrollieren</td></tr>
</table>
<div class="ik-box ok"><b>Prüfungs-Check:</b>
<ul>
  <li><b>Teil A (ohne Hilfsmittel):</b> Faktorform nutzen, Rechenwege knapp und vollständig, Ergebnisse als Terme in $k$.</li>
  <li><b>Teil B (mit Rechner):</b> zuerst Spezialfall $k=\text{Zahl}$ prüfen, dann allgemein; Rechner für Lösen/Integrieren, Ansatz notieren.</li>
  <li>Operatoren: <i>Zeigen/Nachweisen</i> (alle Schritte), <i>Bestimmen</i> (Ansatz + Ergebnis), <i>Begründen</i> (Argument).</li>
</ul></div>`
    }
  ];

  // ---------- Aufgaben ----------
  const TASKS_A = [
    {
      id: 'SA1', sec: 'sec2', title: 'Nullstellen, Symmetrie, Hochpunkt', afb: 'I–II', ops: 'Angeben, Begründen, Zeigen',
      intro: String.raw`Gegeben ist die Funktionenschar $g_a$ mit $g_a(x)=x\,(x-a)(x+a)=x^3-a^2x$, $a>0$.`,
      parts: [
        { id: 'SA1a', label: 'a)', be: 2, text: String.raw`Geben Sie die Nullstellen von $g_a$ an und begründen Sie, dass jeder Graph punktsymmetrisch zum Ursprung ist.`,
          sol: String.raw`<p>$g_a(x)=x(x-a)(x+a)$ steht in Klammerform da: jeden Faktor $=0$ setzen ⇒ Nullstellen $x=0$, $x=a$, $x=-a$.</p><p>$g_a$ enthält nur ungerade Potenzen von $x$: $g_a(-x)=-x^3+a^2x=-g_a(x)$ ⇒ punktsymmetrisch zum Ursprung.</p><ul><li>Nullstellen (1 BE)</li><li>Symmetrie mit $g_a(-x)=-g_a(x)$ (1 BE)</li></ul>` },
        { id: 'SA1b', label: 'b)', be: 3, text: String.raw`Bestimmen Sie $g_a'(x)$ und $g_a''(x)$ und zeigen Sie, dass der Graph von $g_a$ genau einen Wendepunkt hat. Geben Sie ihn an.`,
          hints: [String.raw`Ableiten nach $x$: $a$ bleibt wie eine Zahl stehen. $g_a(x)=x^3-a^2x$ ⇒ $g_a'(x)=3x^2-a^2$.`, String.raw`Wendestelle: $g_a''(x)=0$ lösen, dann $g_a'''(x)\neq0$ prüfen. $y$-Koordinate mit $g_a$ ausrechnen.`],
          sol: String.raw`<p>$g_a'(x)=3x^2-a^2$, $g_a''(x)=6x$, $g_a'''(x)=6$.</p><p>$g_a''(x)=0\Rightarrow x=0$, und $g_a'''(0)=6\neq0$ ⇒ Wendestelle. $g_a(0)=0$ ⇒ Wendepunkt $W(0|0)$ (für jedes $a$ derselbe Punkt, und es ist der einzige).</p><ul><li>$g_a'$ und $g_a''$ (1 BE)</li><li>$g_a''=0$, $x=0$, $g_a'''\neq0$ (1 BE)</li><li>$W(0|0)$ (1 BE)</li></ul>` }
      ]
    },
    {
      id: 'SA2', sec: 'sec4', title: 'Ortskurve der Scheitelpunkte', afb: 'II', ops: 'Bestimmen, Angeben',
      intro: String.raw`Gegeben ist die Funktionenschar $f_t(x)=x^2-4tx+3t^2$, $t\in\mathbb R$.`,
      parts: [
        { id: 'SA2a', label: 'a)', be: 2, text: String.raw`Bestimmen Sie die Koordinaten des Scheitelpunkts $S_t$ des Graphen von $f_t$.`,
          sol: String.raw`<p>$f_t(x)=(x-2t)^2-t^2$ ⇒ $S_t(2t\,|\,-t^2)$. (Alternativ: $f_t'(x)=2x-4t=0\Rightarrow x=2t$, $f_t(2t)=4t^2-8t^2+3t^2=-t^2$.)</p><ul><li>$x=2t$ (1 BE)</li><li>$y=-t^2$ (1 BE)</li></ul>` },
        { id: 'SA2b', label: 'b)', be: 3, text: String.raw`Bestimmen Sie eine Gleichung der Ortskurve, auf der alle Scheitelpunkte $S_t$ liegen.`,
          sol: String.raw`<p>$x=2t\Rightarrow t=\frac x2$. Einsetzen in $y=-t^2$: $y=-\bigl(\frac x2\bigr)^2=-\frac14x^2$.</p><p><b>Ortskurve: $y=-\frac14x^2$</b> ($x\in\mathbb R$, da $t\in\mathbb R$). Probe: $t=1{,}5$: $S(3|-2{,}25)$, $-\frac14\cdot9=-2{,}25$ ✓.</p><ul><li>$t$ aus der $x$-Koordinate (1 BE)</li><li>Einsetzen, Gleichung (1 BE)</li><li>Definitionsbereich/Probe (1 BE)</li></ul>` }
      ]
    },
    {
      id: 'SA3', sec: 'sec4', title: 'Ortskurve der Extrempunkte (3. Grades)', afb: 'II', ops: 'Bestimmen, Zeigen',
      intro: String.raw`Gegeben ist $f_k(x)=x^3-3kx$ mit $k>0$.`,
      parts: [
        { id: 'SA3a', label: 'a)', be: 3, text: String.raw`Bestimmen Sie die Koordinaten des Hochpunkts $H_k$ und des Tiefpunkts $T_k$.`,
          sol: String.raw`<p>$f_k'(x)=3x^2-3k=0\Rightarrow x=\pm\sqrt k$. $f_k''(x)=6x$: $f_k''(-\sqrt k)<0$ ⇒ Hochpunkt, $f_k''(\sqrt k)>0$ ⇒ Tiefpunkt.</p><p>$f_k(\sqrt k)=k\sqrt k-3k\sqrt k=-2k\sqrt k$, $f_k(-\sqrt k)=2k\sqrt k$.</p><p>$H_k(-\sqrt k\,|\,2k\sqrt k)$, $T_k(\sqrt k\,|\,-2k\sqrt k)$.</p><ul><li>$f_k'=0$ (1 BE)</li><li>Art der Extrema (1 BE)</li><li>$y$-Koordinaten (1 BE)</li></ul>` },
        { id: 'SA3b', label: 'b)', be: 2, text: String.raw`Zeigen Sie, dass alle Extrempunkte auf der Kurve mit der Gleichung $y=-2x^3$ liegen.`,
          sol: String.raw`<p>Für $T_k$: $x=\sqrt k\Rightarrow k=x^2$, $y=-2k\sqrt k=-2x^2\cdot x=-2x^3$. Für $H_k$: $x=-\sqrt k\Rightarrow k=x^2$, $y=2k\sqrt k=2x^2\cdot(-x)=-2x^3$.</p><p>Beide Punkte erfüllen $y=-2x^3$ ✓.</p><ul><li>$k=x^2$ eliminiert (1 BE)</li><li>beide Fälle ($x>0$ und $x<0$) (1 BE)</li></ul>` }
      ]
    },
    {
      id: 'SA4', sec: 'sec5', title: 'Parameter bestimmen und Ortskurve (Hochbehälter-Typ)', afb: 'II', ops: 'Bestimmen',
      intro: String.raw`Gegeben ist die Funktionenschar $p_k(t)=0{,}01\,t(t-k)(t-2k)(t-3k)$, $k>0$. Der Hochpunkt von $p_k$ ist $H_k(1{,}5k\,|\,0{,}005625k^4)$.`,
      parts: [
        { id: 'SA4a', label: 'a)', be: 2, text: String.raw`Der Hochpunkt soll bei $t=12$ liegen. Bestimmen Sie $k$ und geben Sie den zugehörigen Funktionsterm an.`,
          nums: [{ label: 'k', ans: 8, tol: 0.01 }],
          sol: String.raw`<p>$1{,}5k=12\Rightarrow k=8$. Funktionsterm: $p_8(t)=0{,}01\,t(t-8)(t-16)(t-24)$.</p><ul><li>$k=8$ (1 BE)</li><li>Funktionsterm (1 BE)</li></ul>` },
        { id: 'SA4b', label: 'b)', be: 3, text: String.raw`Bestimmen Sie eine Gleichung der Ortskurve, auf der alle Hochpunkte $H_k$ liegen.`,
          sol: String.raw`<p>$x=1{,}5k\Rightarrow k=\frac{x}{1{,}5}$. $y=0{,}005625\cdot\bigl(\frac{x}{1{,}5}\bigr)^4=\frac{0{,}005625}{5{,}0625}\,x^4=\frac{x^4}{900}$.</p><p><b>Ortskurve: $y=\frac{1}{900}x^4$ für $x>0$</b> (da $k>0$). Probe: $k=8$: $H(12|23{,}04)$, $\frac{12^4}{900}=23{,}04$ ✓.</p><ul><li>$k=\frac{x}{1{,}5}$ (1 BE)</li><li>Einsetzen, $\frac{1}{900}x^4$ (1 BE)</li><li>Definitionsbereich $x>0$ (1 BE)</li></ul>` }
      ]
    },
    {
      id: 'SA5', sec: 'sec5', title: 'Schar aus einer Steckbriefaufgabe', afb: 'II', ops: 'Aufstellen, Bestimmen, Begründen',
      intro: String.raw`Der Graph einer ganzrationalen Funktion 3. Grades hat den Punkt $(0|4)$ als Hochpunkt und bei $x=2$ eine Wendestelle.`,
      parts: [
        { id: 'SA5a', label: 'a)', be: 3, text: String.raw`Stellen Sie die Bedingungen auf und bestimmen Sie die Lösungsmenge in Form einer Funktionenschar $f_a$.`,
          sol: String.raw`<p>Ansatz $f(x)=ax^3+bx^2+cx+d$. Bedingungen: $f(0)=4\Rightarrow d=4$; $f'(0)=0\Rightarrow c=0$; $f''(2)=0$: $12a+2b=0\Rightarrow b=-6a$.</p><p>Damit $f_a(x)=ax^3-6ax^2+4$ ($a\neq0$), eine Schar mit dem freien Parameter $a$.</p><ul><li>drei Bedingungen aufgestellt (1 BE)</li><li>$d=4$, $c=0$, $b=-6a$ (1 BE)</li><li>Schar $f_a(x)=ax^3-6ax^2+4$ (1 BE)</li></ul>` },
        { id: 'SA5b', label: 'b)', be: 2, text: String.raw`Für welche Werte von $a$ ist $(0|4)$ tatsächlich ein Hochpunkt?`,
          sol: String.raw`<p>$f_a''(x)=6ax-12a$, $f_a''(0)=-12a$. Hochpunkt ⇔ $f_a''(0)<0$ ⇔ $a>0$.</p><p>Für $a<0$ wäre $(0|4)$ ein Tiefpunkt. Die Wendestelle $x=2$ liegt für alle $a\ne0$ vor ($f_a''$ wechselt dort das Vorzeichen).</p><ul><li>$f_a''(0)=-12a$ (1 BE)</li><li>Bedingung $a>0$ (1 BE)</li></ul>` }
      ]
    },
    {
      id: 'SA6', sec: 'sec2', title: 'Gemeinsame Punkte und Tangente', afb: 'II', ops: 'Zeigen, Bestimmen',
      intro: String.raw`Gegeben ist die Funktionenschar $f_k(x)=kx^2-2kx+3$, $k\in\mathbb R$.`,
      parts: [
        { id: 'SA6a', label: 'a)', be: 2, text: String.raw`Zeigen Sie, dass alle Graphen von $f_k$ durch die Punkte $(0|3)$ und $(2|3)$ verlaufen.`,
          sol: String.raw`<p>$f_k(x)=k\,(x^2-2x)+3$. Für $x=0$ und $x=2$ ist $x^2-2x=0$, also $f_k(0)=f_k(2)=3$ – unabhängig von $k$.</p><ul><li>Term nach $k$ geordnet (1 BE)</li><li>$f_k(0)=f_k(2)=3$ (1 BE)</li></ul>` },
        { id: 'SA6b', label: 'b)', be: 2, text: String.raw`Bestimmen Sie die Gleichung der Tangente an den Graphen von $f_k$ im Punkt $(0|3)$.`,
          sol: String.raw`<p>$f_k'(x)=2kx-2k$, $f_k'(0)=-2k$. Tangente: $y=-2k\,x+3$.</p><ul><li>Steigung $-2k$ (1 BE)</li><li>Tangentengleichung (1 BE)</li></ul>` },
        { id: 'SA6c', label: 'c)', be: 1, text: String.raw`Für welchen Wert von $k$ verläuft diese Tangente durch $P(1|0)$?`,
          nums: [{ label: 'k', ans: 1.5, tol: 0.01 }],
          sol: String.raw`<p>$0=-2k\cdot1+3\Rightarrow k=\tfrac32$.</p><ul><li>$k=1{,}5$ (1 BE)</li></ul>` }
      ]
    },
    {
      id: 'SA7', sec: 'sec6', title: 'Fläche in Abhängigkeit vom Parameter', afb: 'II', ops: 'Berechnen, Bestimmen',
      intro: String.raw`Gegeben ist $f_a(x)=x\,(x-a)$ mit $a>0$. Der Graph von $f_a$ schließt mit der $x$-Achse eine Fläche ein.`,
      parts: [
        { id: 'SA7a', label: 'a)', be: 3, text: String.raw`Berechnen Sie den Inhalt $A(a)$ dieser Fläche in Abhängigkeit von $a$.`,
          sol: String.raw`<p>Nullstellen $0$ und $a$; im Intervall liegt der Graph unterhalb der $x$-Achse. $\displaystyle\int_0^a(x^2-ax)\,dx=\Bigl[\tfrac13x^3-\tfrac a2x^2\Bigr]_0^a=\tfrac{a^3}{3}-\tfrac{a^3}{2}=-\tfrac{a^3}{6}$.</p><p>Flächeninhalt: $A(a)=\bigl|-\tfrac{a^3}{6}\bigr|=\tfrac{a^3}{6}$.</p><ul><li>Grenzen $0$ und $a$ (1 BE)</li><li>Integral berechnet (1 BE)</li><li>Betrag: $A(a)=\frac{a^3}{6}$ (1 BE)</li></ul>` },
        { id: 'SA7b', label: 'b)', be: 2, text: String.raw`Bestimmen Sie $a$ so, dass $A(a)=36$ gilt.`,
          nums: [{ label: 'a', ans: 6, tol: 0.01 }],
          sol: String.raw`<p>$\frac{a^3}{6}=36\Rightarrow a^3=216\Rightarrow a=6$.</p><ul><li>Gleichung (1 BE)</li><li>$a=6$ (1 BE)</li></ul>` }
      ]
    },
    {
      id: 'SA8', sec: 'sec4', title: 'Sattelpunkt und Ortskurve', afb: 'II–III', ops: 'Zeigen, Bestimmen',
      intro: String.raw`Gegeben ist $f_a(x)=x^3-3ax^2+3a^2x$, $a\in\mathbb R$.`,
      parts: [
        { id: 'SA8a', label: 'a)', be: 3, text: String.raw`Zeigen Sie, dass der Graph von $f_a$ genau einen Wendepunkt besitzt, der zugleich Sattelpunkt ist, und geben Sie ihn an. <i>Hinweis:</i> Es gilt $f_a'(x)=3(x-a)^2$.`,
          sol: String.raw`<p>$f_a'(x)=3x^2-6ax+3a^2=3(x-a)^2$, $f_a''(x)=6x-6a$, $f_a'''(x)=6\neq0$.</p><p>$f_a''(x)=0\Leftrightarrow x=a$ (mit $f_a'''\ne0$ ⇒ Wendestelle). Wegen $f_a'(a)=0$ ist die Tangente waagerecht: <b>Sattelpunkt</b>. $f_a(a)=a^3-3a^3+3a^3=a^3$ ⇒ $S_a(a\,|\,a^3)$.</p><ul><li>$f_a''=0$, $x=a$ (1 BE)</li><li>Wendestelle begründet (1 BE)</li><li>$f_a'(a)=0$ und $y=a^3$ (1 BE)</li></ul>` },
        { id: 'SA8b', label: 'b)', be: 2, text: String.raw`Bestimmen Sie die Ortskurve der Sattelpunkte $S_a$.`,
          sol: String.raw`<p>$x=a$, $y=a^3$ ⇒ $y=x^3$. <b>Ortskurve: $y=x^3$</b> ($x\in\mathbb R$).</p><ul><li>$a=x$ (1 BE)</li><li>$y=x^3$ (1 BE)</li></ul>` }
      ]
    },
    {
      id: 'SA9', sec: 'sec4', title: 'Berühren der x-Achse; senkrechte Ortskurve', afb: 'II', ops: 'Bestimmen, Begründen',
      intro: String.raw`Gegeben ist $f_k(x)=x^2-2x+k$, $k\in\mathbb R$.`,
      parts: [
        { id: 'SA9a', label: 'a)', be: 2, text: String.raw`Für welchen Wert von $k$ berührt der Graph von $f_k$ die $x$-Achse?`,
          nums: [{ label: 'k', ans: 1, tol: 0.01 }],
          sol: String.raw`<p>$f_k(x)=(x-1)^2+k-1$. Berührung der $x$-Achse ⇔ Scheitelpunkt liegt auf der $x$-Achse ⇔ $k-1=0\Rightarrow k=1$ (Berührpunkt $(1|0)$). Alternativ: Diskriminante $4-4k=0$.</p><ul><li>Scheitelform bzw. Diskriminante (1 BE)</li><li>$k=1$ (1 BE)</li></ul>` },
        { id: 'SA9b', label: 'b)', be: 3, text: String.raw`Bestimmen Sie die Scheitelpunkte $S_k$ und die Ortskurve, auf der alle Scheitelpunkte liegen.`,
          sol: String.raw`<p>$S_k(1\,|\,k-1)$. Die $x$-Koordinate ist für alle $k$ gleich 1, die $y$-Koordinate durchläuft alle reellen Zahlen.</p><p>Die Ortskurve ist die <b>senkrechte Gerade $x=1$</b> (keine Funktion, da $x$ nicht von $k$ abhängt).</p><ul><li>$S_k(1|k-1)$ (1 BE)</li><li>$x=1$ konstant erkannt (1 BE)</li><li>Ortskurve $x=1$ (1 BE)</li></ul>` }
      ]
    }
  ];

  const TASKS_B = [
    {
      id: 'SB1', sec: 'sec3', title: 'Hochbehälter – Funktionsschar (Teil-A-Teil einer Klausuraufgabe)', afb: 'II–III', ops: 'Angeben, Begründen, Zeigen, Bestimmen',
      intro: String.raw`Zum Modell eines Hochbehälters gehört die Funktionenschar $z_k$ mit
$$z_k(t)=0{,}01\,t\,(t-k)(t-2k)(t-3k),\qquad k>0.$$
($t$ in Stunden, $z_k(t)$ in m³ pro Stunde: Änderungsrate des Wasservolumens.)`,
      parts: [
        { id: 'SB1a', label: 'a)', be: 4, text: String.raw`Geben Sie die Nullstellen von $z_k$ an. Begründen Sie, dass der Graph von $z_k$ achsensymmetrisch zur Geraden $t=1{,}5k$ ist.`,
          hints: [String.raw`<b>Nullstellen:</b> Die Funktion steht schon in Klammern. Setze jede Klammer (und das einzelne $t$) gleich $0$ und lies ab. Vorzeichen umdrehen: aus $(t-k)$ wird $t=k$.`,
                  String.raw`<b>Was heißt „symmetrisch zu $t=1{,}5k$“?</b> Gehst du von $1{,}5k$ gleich weit nach links und nach rechts, ist der Funktionswert gleich. Die Mitte der Nullstellen $0$ und $3k$ ist $1{,}5k$ – ebenso die Mitte von $k$ und $2k$. Das ist schon die Anschauung.`,
                  String.raw`<b>Begründung rechnen:</b> Spiegeln an $t=1{,}5k$ heißt $t\mapsto3k-t$. Setze $3k-t$ in jede Klammer ein: $(3k-t)\,(3k-t-k)\,(3k-t-2k)\,(3k-t-3k)$. Fasse jede Klammer zusammen – was fällt dir bei den Vorzeichen auf?`],
          sol: String.raw`<p>Nullstellen: $t=0$, $t=k$, $t=2k$, $t=3k$.</p><p>Spiegelung an $t=1{,}5k$: $t\mapsto3k-t$. Dann gilt $z_k(3k-t)=0{,}01\,(3k-t)(2k-t)(k-t)(-t)$. Vier Vorzeichenwechsel in den Faktoren heben sich auf: $=0{,}01\,t(t-k)(t-2k)(t-3k)=z_k(t)$. Also $z_k(3k-t)=z_k(t)$ ⇒ achsensymmetrisch zu $t=1{,}5k$. (Anschaulich: Die Nullstellen $0\leftrightarrow3k$ und $k\leftrightarrow2k$ liegen spiegelbildlich.)</p><ul><li>vier Nullstellen (1 BE)</li><li>Ansatz $z_k(3k-t)$ (1 BE)</li><li>Faktoren umgeformt (1 BE)</li><li>Schluss auf Symmetrie (1 BE)</li></ul>` },
        { id: 'SB1b', label: 'b)', be: 6, text: String.raw`Zeigen Sie, dass $z_k(t)=0{,}01\,(t^4-6kt^3+11k^2t^2-6k^3t)$ gilt. Weisen Sie nach, dass $H_k(1{,}5k\,|\,0{,}005625k^4)$ ein Hochpunkt des Graphen von $z_k$ ist.`,
          sol: String.raw`<p>$(t-k)(t-3k)=t^2-4kt+3k^2$ und $t(t-2k)=t^2-2kt$. Produkt: $(t^2-2kt)(t^2-4kt+3k^2)=t^4-6kt^3+11k^2t^2-6k^3t$ ✓.</p><p>$z_k'(t)=0{,}01\,(4t^3-18kt^2+22k^2t-6k^3)$. Bei $t=1{,}5k$: $4\cdot3{,}375k^3-18\cdot2{,}25k^3+22\cdot1{,}5k^3-6k^3=13{,}5-40{,}5+33-6=0$ ✓ (alle mal $k^3$).</p><p>$z_k''(t)=0{,}01\,(12t^2-36kt+22k^2)$. Bei $t=1{,}5k$: $27k^2-54k^2+22k^2=-5k^2$ ⇒ $z_k''(1{,}5k)=-0{,}05k^2<0$ ⇒ Hochpunkt.</p><p>$z_k(1{,}5k)=0{,}01\cdot1{,}5k\cdot0{,}5k\cdot(-0{,}5k)\cdot(-1{,}5k)=0{,}01\cdot0{,}5625k^4=0{,}005625k^4$ ✓.</p><ul><li>Ausmultiplizieren (2 BE)</li><li>$z_k'(1{,}5k)=0$ (1 BE)</li><li>$z_k''(1{,}5k)<0$ (2 BE)</li><li>$y$-Koordinate (1 BE)</li></ul>` },
        { id: 'SB1c', label: 'c)', be: 4, text: String.raw`Bestimmen Sie eine Gleichung der Ortskurve, auf der alle Hochpunkte $H_k$ liegen.`,
          sol: String.raw`<p>$x=1{,}5k\Rightarrow k=\frac{x}{1{,}5}$. $y=0{,}005625\,k^4=0{,}005625\cdot\frac{x^4}{5{,}0625}=\frac{x^4}{900}$ (denn $5{,}0625\cdot\frac{1}{900}=0{,}005625$).</p><p><b>Ortskurve: $y=\frac1{900}x^4$, $x>0$.</b></p><ul><li>$k=\frac x{1{,}5}$ (1 BE)</li><li>$k^4=\frac{x^4}{5{,}0625}$ (1 BE)</li><li>Gleichung $y=\frac{1}{900}x^4$ (1 BE)</li><li>Definitionsbereich $x>0$ (1 BE)</li></ul>` },
        { id: 'SB1d', label: 'd)', be: 3, text: String.raw`Der Behälter wird so betrieben, dass die maximale Zuflussrate 12 Stunden nach Beobachtungsbeginn erreicht wird. Bestimmen Sie $k$ und geben Sie die zugehörige Funktion an.`,
          nums: [{ label: 'k', ans: 8, tol: 0.01 }],
          sol: String.raw`<p>Maximale Zuflussrate = Hochpunkt bei $t=1{,}5k=12\Rightarrow k=8$. Funktion: $z(t)=0{,}01\,t(t-8)(t-16)(t-24)$ ($0\le t\le24$, siehe Aufgabe B3 im Integral-Modul).</p><ul><li>$1{,}5k=12$ (1 BE)</li><li>$k=8$ (1 BE)</li><li>Funktionsterm (1 BE)</li></ul>` }
      ]
    },
    {
      id: 'SB2', sec: 'sec6', title: 'Abitur-Stil: Schar f_a(x) = x²(a − x) mit Ortskurve und Flächen', afb: 'II–III', ops: 'Bestimmen, Zeigen, Berechnen',
      intro: String.raw`<b>Hilfsmittel: GTR/CAS.</b> Gegeben ist die Funktionenschar $f_a$ mit $f_a(x)=x^2\,(a-x)$, $a>0$.`,
      parts: [
        { id: 'SB2a', label: 'a)', be: 6, text: String.raw`Geben Sie die Nullstellen von $f_a$ an und bestimmen Sie die Koordinaten des Hochpunkts $H_a$ und des Tiefpunkts.`,
          sol: String.raw`<p>Nullstellen: $x=0$ (doppelt) und $x=a$.</p><p>$f_a(x)=ax^2-x^3$, $f_a'(x)=2ax-3x^2=x(2a-3x)=0\Rightarrow x=0$ oder $x=\frac{2a}{3}$. $f_a''(x)=2a-6x$.</p><p>$f_a''(0)=2a>0$ ⇒ Tiefpunkt $T(0|0)$. $f_a''\bigl(\frac{2a}{3}\bigr)=-2a<0$ ⇒ Hochpunkt, $f_a\bigl(\tfrac{2a}3\bigr)=\tfrac{4a^2}{9}\cdot\tfrac a3=\tfrac{4a^3}{27}$ ⇒ $H_a\bigl(\tfrac{2a}{3}\,|\,\tfrac{4a^3}{27}\bigr)$.</p><ul><li>Nullstellen (1 BE)</li><li>$f_a'$ und Extremstellen (2 BE)</li><li>Art der Extrema (2 BE)</li><li>$y$-Koordinate des Hochpunkts (1 BE)</li></ul>` },
        { id: 'SB2b', label: 'b)', be: 4, text: String.raw`Bestimmen Sie eine Gleichung der Ortskurve, auf der alle Hochpunkte $H_a$ liegen.`,
          sol: String.raw`<p>$x=\frac{2a}{3}\Rightarrow a=\frac{3x}{2}$. $y=\frac{4a^3}{27}=\frac{4}{27}\cdot\frac{27x^3}{8}=\frac{x^3}{2}$.</p><p><b>Ortskurve: $y=\frac12x^3$ für $x>0$.</b> Probe $a=3$: $H(2|4)$, $\frac12\cdot8=4$ ✓.</p><ul><li>$a=\frac32x$ (1 BE)</li><li>Einsetzen (2 BE)</li><li>Definitionsbereich $x>0$ (1 BE)</li></ul>` },
        { id: 'SB2c', label: 'c)', be: 2, text: String.raw`Zeigen Sie, dass die Graphen aller $f_a$ im Ursprung dieselbe Tangente haben.`,
          sol: String.raw`<p>$f_a(0)=0$ und $f_a'(0)=0$ für jedes $a$. Alle Graphen berühren die $x$-Achse im Ursprung; die gemeinsame Tangente ist die $x$-Achse ($y=0$).</p><ul><li>$f_a(0)=0$ (1 BE)</li><li>$f_a'(0)=0$ unabhängig von $a$ (1 BE)</li></ul>` },
        { id: 'SB2d', label: 'd)', be: 6, text: String.raw`Der Graph von $f_a$ hat einen Wendepunkt. Die Wendetangente schließt mit den Koordinatenachsen ein Dreieck ein. Bestimmen Sie $a$ so, dass dessen Flächeninhalt $\frac16$ beträgt.`,
          nums: [{ label: 'a', ans: 3, tol: 0.01 }],
          sol: String.raw`<p>$f_a''(x)=2a-6x=0\Rightarrow x=\frac a3$, $W_a\bigl(\frac a3\,|\,\frac{2a^3}{27}\bigr)$. Steigung $f_a'(\frac a3)=\frac{2a^2}{3}-\frac{a^2}{3}=\frac{a^2}{3}$.</p><p>Tangente: $y=\frac{a^2}{3}\bigl(x-\frac a3\bigr)+\frac{2a^3}{27}=\frac{a^2}{3}x-\frac{a^3}{27}$. Achsenabschnitte: $y_0=-\frac{a^3}{27}$, $x_0=\frac a9$.</p><p>Dreieck: $A_\Delta=\frac12\cdot\frac a9\cdot\frac{a^3}{27}=\frac{a^4}{486}$. $\frac{a^4}{486}=\frac16\Rightarrow a^4=81\Rightarrow a=3$.</p><ul><li>Wendepunkt (1 BE)</li><li>Steigung und Tangente (2 BE)</li><li>Achsenabschnitte (1 BE)</li><li>$A_\Delta(a)$ (1 BE)</li><li>$a=3$ (1 BE)</li></ul>` },
        { id: 'SB2e', label: 'e)', be: 5, text: String.raw`Berechnen Sie den Inhalt $A(a)$ der Fläche, die der Graph von $f_a$ mit der $x$-Achse einschließt, und bestimmen Sie $a$ so, dass $A(a)=\frac{27}{4}$ gilt.`,
          nums: [{ label: 'a', ans: 3, tol: 0.01 }],
          sol: String.raw`<p>$f_a\ge0$ auf $[0;a]$. $A(a)=\displaystyle\int_0^a(ax^2-x^3)\,dx=\Bigl[\tfrac a3x^3-\tfrac14x^4\Bigr]_0^a=\tfrac{a^4}{12}$.</p><p>$\frac{a^4}{12}=\frac{27}{4}\Rightarrow a^4=81\Rightarrow a=3$.</p><p>(Beide Teile haben $a=3$ als Lösung – Probe: Dreieck $\frac{81}{486}=\frac16$, Fläche $\frac{81}{12}=6{,}75$.)</p><ul><li>Vorzeichen von $f_a$ auf $[0;a]$ (1 BE)</li><li>Integral (2 BE)</li><li>$A(a)=\frac{a^4}{12}$ (1 BE)</li><li>$a=3$ (1 BE)</li></ul>` }
      ]
    },
    {
      id: 'SB3', sec: 'sec5', title: 'Steckbrief → Schar → Tangente → Dreieck (Beispielklausur-Typ)', afb: 'II', ops: 'Bestimmen, Berechnen',
      intro: String.raw`<b>Hilfsmittel: GTR/CAS.</b> Eine ganzrationale Funktion 3. Grades hat an der Stelle $-2$ ein lokales Extremum und an der Stelle $1$ einen Wendepunkt mit dem Funktionswert $2$.`,
      parts: [
        { id: 'SB3a', label: 'a)', be: 6, text: String.raw`Bestimmen Sie die Lösungsmenge in Form einer Funktionenschar $f_a$.`,
          sol: String.raw`<p>$f(x)=ax^3+bx^2+cx+d$, $f'(x)=3ax^2+2bx+c$, $f''(x)=6ax+2b$. Bedingungen: $f'(-2)=0$: $12a-4b+c=0$; $f''(1)=0$: $6a+2b=0$; $f(1)=2$: $a+b+c+d=2$.</p><p>Aus der zweiten Gleichung $b=-3a$; in die erste: $c=4b-12a=-24a$; in die dritte: $d=2-a-b-c=2+26a$.</p><p>$f_a(x)=ax^3-3ax^2-24ax+26a+2$, $a\ne0$.</p><ul><li>drei Gleichungen (3 BE)</li><li>$b=-3a$, $c=-24a$ (2 BE)</li><li>$d=2+26a$ und Schar (1 BE)</li></ul>` },
        { id: 'SB3b', label: 'b)', be: 3, text: String.raw`Für welche Werte von $a$ erfüllt $f_a$ tatsächlich alle Bedingungen? Begründen Sie.`,
          sol: String.raw`<p>$f_a''(x)=6ax-6a=6a(x-1)$. Wendestelle bei $x=1$ für alle $a\ne0$ ($f_a''$ wechselt dort das Vorzeichen). $f_a''(-2)=-18a\ne0$ ⇒ bei $x=-2$ liegt für alle $a\ne0$ ein Extremum vor (Hochpunkt für $a>0$, Tiefpunkt für $a<0$). Für $a=0$ wäre $f$ konstant $2$ (kein Grad 3).</p><p>Die Bedingungen sind für <b>alle $a\ne0$</b> erfüllt.</p><ul><li>Wendestelle (1 BE)</li><li>Extremum bei $-2$ mit $f''(-2)\ne0$ (1 BE)</li><li>Ausschluss $a=0$ (1 BE)</li></ul>` },
        { id: 'SB3c', label: 'c)', be: 4, text: String.raw`Bestimmen Sie für $a=-1$ die Gleichung der Tangente an den Graphen von $f_{-1}$ an der Stelle $x=2$.`,
          nums: [{ label: 'Steigung m', ans: 24, tol: 0.01 }, { label: 'y-Achsenabschnitt', ans: -20, tol: 0.01 }],
          sol: String.raw`<p>$f_{-1}(x)=-x^3+3x^2+24x-24$, $f_{-1}'(x)=-3x^2+6x+24$.</p><p>$f_{-1}(2)=-8+12+48-24=28$, $f_{-1}'(2)=-12+12+24=24$.</p><p>Tangente: $t(x)=28+24\,(x-2)=24x-20$.</p><ul><li>$f_{-1}(2)=28$ (1 BE)</li><li>$f_{-1}'(2)=24$ (1 BE)</li><li>Tangentengleichung $24x-20$ (2 BE)</li></ul>` },
        { id: 'SB3d', label: 'd)', be: 4, text: String.raw`Berechnen Sie den Flächeninhalt des Dreiecks, das die Tangente aus c) mit den beiden Koordinatenachsen einschließt.`,
          nums: [{ label: 'Inhalt', ans: 8.333, tol: 0.02 }],
          sol: String.raw`<p>Achsenabschnitte von $t(x)=24x-20$: $y$-Achse bei $-20$, $x$-Achse bei $x=\frac{20}{24}=\frac56$.</p><p>$A=\frac12\cdot\frac56\cdot20=\frac{25}{3}\approx8{,}33$ FE.</p><ul><li>$x$-Achsenabschnitt $\frac56$ (1 BE)</li><li>$y$-Achsenabschnitt $-20$ (1 BE)</li><li>Dreiecksformel mit Beträgen (1 BE)</li><li>$\frac{25}{3}$ (1 BE)</li></ul>` },
        { id: 'SB3e', label: 'e)', be: 3, text: String.raw`Bestimmen Sie die mittlere Änderungsrate von $f_{-1}$ auf dem Intervall $[1;3]$.`,
          nums: [{ label: 'm', ans: 23, tol: 0.01 }],
          sol: String.raw`<p>$f_{-1}(1)=-1+3+24-24=2$, $f_{-1}(3)=-27+27+72-24=48$.</p><p>$\dfrac{f_{-1}(3)-f_{-1}(1)}{3-1}=\dfrac{48-2}{2}=23$.</p><ul><li>Funktionswerte (1 BE)</li><li>Differenzenquotient (1 BE)</li><li>Ergebnis 23 (1 BE)</li></ul>` }
      ]
    }
  ];

  // ---------- Rendering ----------
  function renderErklaerung() {
    const secs = SECTIONS.map((s, i) =>
      '<details class="ik-sec" id="sk-' + s.id + '"' + (i === 0 ? ' open' : '') + '><summary>' + s.title + '</summary><div class="ik-body">' + M(s.html) + '</div></details>').join('');
    return '<div class="ik-card accent">' +
      '<p><b>So lernst du hier:</b> Abschnitte 1–7 durcharbeiten, im <b>Ortskurven-Labor</b> den Parameter bewegen und sehen, wie Punkte wandern, dann <b>Teil A</b> (ohne Hilfsmittel) und <b>Teil B</b> (mit Rechner) lösen. Musterlösung erst nach eigenem Versuch öffnen und ehrlich Punkte vergeben.</p>' +
      '<p><b>Zum Unterricht:</b> Funktionenschar und Ortskurve gehören zur <b>Kurvenanpassung</b> (Steckbriefaufgaben, Schar aus unterbestimmtem LGS) und tauchen in der Hochbehälter-Aufgabe im Integral-Teil auf (Teil A: Funktionsschar mit Ortskurve; Teil B: Änderungsrate und Bestand – siehe Modul 06, Aufgabe B3). Im Zentralabitur Niedersachsen (eA, Block 1) kommt die Schar $f_a(x)=x(x-a)(x-2a)$ mit Hochpunkt, Tangenten, Flächen und Ortskurven-Teilaufgaben vor.</p>' +
      '<p style="color:var(--text-muted);font-size:0.8rem;">Alle Aufgaben hier sind eigene Varianten mit anderen Zahlen und Kontexten – Musterlösungen sind keine offiziellen Lösungsvorgaben des Landes Niedersachsen.</p></div>' + secs;
  }
  function renderLabor() {
    const opts = LAB.map((d, i) => '<option value="' + i + '"' + (i === labIdx ? ' selected' : '') + '>' + d.title + '</option>').join('');
    const D = LAB[labIdx];
    return '<div class="ik-card accent"><p><b>Ortskurven-Labor:</b> Wähle eine Schar und bewege den Parameter. Der markierte Punkt wandert – die farbige Spur ist seine <b>Ortskurve</b>. Darunter siehst du Koordinaten und die Gleichung der Ortskurve.</p></div>' +
      '<div class="ik-demo"><div class="ik-controls">' +
      '<label>Schar <select id="sk-lab-sel" onchange="skLabSelect(this.value)">' + opts + '</select></label>' +
      '<label><b id="sk-lab-kval"></b> <input type="range" id="sk-lab-k" min="' + D.kmin + '" max="' + D.kmax + '" step="' + D.kstep + '" value="' + D.k0 + '" oninput="skLabDraw()" style="min-width:220px"></label></div>' +
      '<div style="font-weight:700;margin:0.3rem 0" id="sk-lab-title">' + D.title + '</div>' +
      '<canvas id="sk-lab" width="720" height="400" style="max-width:720px"></canvas>' +
      '<div class="ik-readout" id="sk-lab-out"></div></div>';
  }

  function renderRoot() {
    const root = document.getElementById('sk-root');
    if (!root) return;
    L.injectStyles();
    const tabs = [['erklaerung', '📘 Erklärung'], ['labor', '🧭 Ortskurven-Labor'], ['teilA', '✏️ Übung Teil A'], ['teilB', '🖩 Übung Teil B'], ['auswertung', '🏁 Auswertung']];
    const body =
      currentTab === 'erklaerung' ? renderErklaerung() :
      currentTab === 'labor' ? renderLabor() :
      currentTab === 'teilA' ? L.renderTeil(TASKS_A, '<b>Teil A – ohne Hilfsmittel.</b> SA1–SA9, je 5 BE (45 BE). Faktorform nutzen, Ergebnisse als Terme in $k$ angeben. Erst eigenständig lösen, dann Musterlösung öffnen.') :
      currentTab === 'teilB' ? L.renderTeil(TASKS_B, '<b>Teil B – mit GTR/CAS.</b> SB1 Hochbehälter-Schar (21 BE), SB2 Abitur-Stil mit Ortskurve und Flächen (23 BE), SB3 Steckbrief → Schar → Tangente (20 BE). Rechnerergebnisse mit Ansatz und Antwortsatz notieren.') :
      L.renderAuswertungFor([['Teil A (ohne Hilfsmittel)', TASKS_A], ['Teil B (mit GTR/CAS)', TASKS_B]], 'Funktionsscharen/Ortskurven', 'sk');
    root.innerHTML =
      '<div class="ik-wrap">' +
      '<h2 class="ik-title">📈 Funktionsscharen &amp; Ortskurven komplett</h2>' +
      '<div class="ik-sub">Erklärung · Ortskurven-Labor · Abi-Übungen mit Erwartungshorizont (Mathe eA, Klausur 06.11.)</div>' +
      '<div class="ik-tabs">' + tabs.map(([id, label]) =>
        '<button class="sub-tab-btn' + (id === currentTab ? ' active' : '') + '" onclick="skSwitchTab(\'' + id + '\')">' + label + '</button>').join('') + '</div>' +
      body + '</div>';
    renderMath(root);
    if (currentTab === 'labor') labSelect(labIdx);
    if (currentTab === 'teilA') L.drawTaskFigs(TASKS_A);
    if (currentTab === 'teilB') L.drawTaskFigs(TASKS_B);
  }

  // ---------- Öffentliche Handler ----------
  window.renderSchar07 = function () { renderRoot(); };
  window.skSwitchTab = function (tab) { currentTab = tab; renderRoot(); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  window.skLabSelect = labSelect;
  window.skLabDraw = labDraw;
  function goSection(id) {
    currentTab = 'erklaerung';
    renderRoot();
    const el = document.getElementById('sk-' + id);
    if (el) { el.open = true; el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  }
  L.register('sk', TASKS_A.concat(TASKS_B), { goSection: goSection, render: renderRoot });
})();
