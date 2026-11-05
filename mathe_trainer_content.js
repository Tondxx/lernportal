// ============================================================
// MATHE_TRAINER_CONTENT.JS – Inhalte des Mathe-Klausurtrainers
// Lektionen ("easy erklärt"), Probeklausur 1 (eigene Aufgaben im Stil des Zentralabiturs
// Niedersachsen, angelehnt an eA-Aufgabenformate), Spickzettel.
// Alle Zahlen sind mit Python/sympy nachgerechnet. Musterlösungen sind NICHT offizielle
// Lösungsvorgaben des Landes Niedersachsen.
// ============================================================
window.MT_DATA = (function () {
  'use strict';

  // ---------------------------------------------------------------- LEKTIONEN
  const LESSONS = [
    // ------------------------------------------------------------ L1
    {
      id: 'L1', group: 'integral', num: 1, min: 10,
      title: 'Bestand & Änderungsrate',
      short: 'Wie viel ist da – und wie schnell ändert es sich?',
      idee: String.raw`Eine <b>Änderungsrate</b> $f(t)$ sagt, <i>wie schnell</i> sich etwas ändert (m³ pro Stunde, Tiere pro Jahr). Der <b>Bestand</b> $B(t)$ sagt, <i>wie viel</i> gerade da ist (m³, Tiere). Das Integral der Rate ist die <b>Änderung des Bestands</b>.`,
      bild: String.raw`<b>Badewanne:</b> Der Wasserhahn läuft mit einer Rate (Liter pro Minute) – das ist $f$. Die Wassermenge in der Wanne ist der Bestand $B$.<br>
$f>0$ (Hahn auf): Wasserstand <b>steigt</b>. $f<0$ (Abfluss offen): Wasserstand <b>sinkt</b>. $f=0$: Wasserstand bleibt gerade gleich – er kann dabei trotzdem hoch oder niedrig sein.<br>
Beim Auto: <b>Tacho = Rate</b>, <b>Kilometerstand = Bestand</b>.`,
      rezept: [
        String.raw`<b>Rate oder Bestand?</b> Steht „pro Stunde / pro Jahr“ in der Einheit, ist es eine <b>Rate</b> $f$. Sonst ist es ein <b>Bestand</b> $B$.`,
        String.raw`<b>Vorzeichen von $f$ lesen:</b> $f>0$ → Bestand nimmt zu, $f<0$ → Bestand nimmt ab.`,
        String.raw`<b>Bestand ausrechnen:</b> $$B(t)=B(0)+\int_0^t f(s)\,ds$$ (Anfangsbestand + alles, was dazukommt).`,
        String.raw`<b>Änderung von $a$ bis $b$:</b> $B(b)-B(a)=\displaystyle\int_a^b f(t)\,dt$ – dafür brauchst du den Anfangsbestand nicht.`
      ],
      beispiel: {
        q: String.raw`Ein Becken enthält zu Beginn 8 m³ Wasser. Die Zuflussrate ist $f(t)=9-3t$ (m³ pro Stunde, $t$ in Stunden). Wie viel Wasser ist nach 2 Stunden im Becken – und wann ist am meisten drin?`,
        steps: [
          { h: 'Rate und Bestand benennen', t: String.raw`$f$ = Zufluss in m³/h (Rate), $B$ = Wassermenge in m³ (Bestand), $B(0)=8$.` },
          { h: 'Vorzeichen von f prüfen', t: String.raw`$f(t)=9-3t=0\Rightarrow t=3$. Für $t<3$ ist $f>0$ (Zufluss), für $t>3$ ist $f<0$ (Abfluss).` },
          { h: 'Bestandsfunktion aufstellen', t: String.raw`Stammfunktion von $9-3s$ ist $9s-1{,}5s^2$. Also $$B(t)=8+9t-1{,}5t^2.$$` },
          { h: 'Nach 2 Stunden', t: String.raw`$B(2)=8+18-6=20$. Nach 2 Stunden sind <b>20 m³</b> im Becken.` },
          { h: 'Maximum', t: String.raw`Bei $t=3$ wechselt $f$ von $+$ nach $-$: davor steigt $B$, danach fällt $B$. $B(3)=8+27-13{,}5=21{,}5$. Am meisten sind nach <b>3 Stunden</b> drin: <b>21,5 m³</b>.` }
        ]
      },
      fehler: [
        String.raw`Rate und Bestand verwechseln: $f(2)=3$ heißt <b>nicht</b> „3 m³ im Becken“, sondern „es fließen gerade 3 m³ pro Stunde zu“.`,
        String.raw`Den Anfangsbestand $B(0)$ vergessen.`,
        String.raw`Einheit im Antwortsatz vergessen (m³ ist etwas anderes als m³/h).`,
        String.raw`Beim Maximum nur $f=0$ rechnen und nicht prüfen, ob das Vorzeichen von $+$ nach $-$ wechselt.`
      ],
      test: [
        { q: String.raw`$f(t)=-3$ (m³/h). Was passiert mit dem Bestand?`, a: String.raw`Er nimmt gerade um 3 m³ pro Stunde ab.` },
        { q: String.raw`Wie berechnest du den Bestand nach 4 Stunden?`, a: String.raw`$B(4)=B(0)+\int_0^4 f(t)\,dt$.` },
        { q: String.raw`Woran erkennst du im Graphen von $f$ das Maximum des Bestands?`, a: String.raw`$f$ schneidet die $t$-Achse von oben nach unten (Vorzeichenwechsel $+\to-$).` }
      ],
      tasks: ['A6', 'A8', 'A9']
    },
    // ------------------------------------------------------------ L2
    {
      id: 'L2', group: 'integral', num: 2, min: 12,
      title: 'Stammfunktion bilden („Aufleiten“)',
      short: 'Ableiten rückwärts – Schritt für Schritt, mit Probe.',
      idee: String.raw`Eine <b>Stammfunktion</b> $F$ von $f$ ist eine Funktion, die abgeleitet wieder $f$ ergibt: $F'(x)=f(x)$. Du machst das Ableiten also <b>rückwärts</b>.`,
      bild: String.raw`Beim Ableiten wird die Hochzahl <b>kleiner</b> ($x^3\to3x^2$). Beim Aufleiten geht es zurück: die Hochzahl wird <b>größer</b>. Dabei geht eine Zahl verloren – $x^2$, $x^2+5$ und $x^2-7$ haben alle die Ableitung $2x$. Darum hängt man bei Stammfunktionen immer ein <b>$+c$</b> an.`,
      rezept: [
        String.raw`<b>Hochzahl um 1 erhöhen.</b> Aus $x^2$ wird $x^3$, aus $x^3$ wird $x^4$.`,
        String.raw`<b>Die Zahl vor dem $x$ durch die neue Hochzahl teilen.</b> (Das ist dasselbe wie „mal 1 geteilt durch die neue Hochzahl“.) Aus $6x^2$: neue Hochzahl 3, $6:3=2$ ⇒ $2x^3$. Geht es nicht glatt auf, bleibt ein Bruch vor dem $x$ stehen: $5x^2\to\tfrac53x^3$.`,
        String.raw`<b>Jeden Summanden einzeln</b> so behandeln – Plus und Minus bleiben stehen.`,
        String.raw`<b>Sonderfälle:</b> $x$ ist $x^1$ ⇒ $\tfrac12x^2$. Eine reine Zahl ist „Zahl mal $x^0$“ ⇒ $4\to4x$.`,
        String.raw`<b>Probe:</b> Stammfunktion ableiten – es muss wieder $f$ herauskommen.`,
        String.raw`<b>Punkt gegeben?</b> $F(x)=\dots+c$ aufschreiben, Punkt einsetzen, $c$ ausrechnen.`
      ],
      extra: String.raw`<div class="mt-call idee"><div class="mt-call-h">Die Regel in einer Zeile</div>
<p>$$x^n\;\longrightarrow\;\tfrac{1}{n+1}\cdot x^{\,n+1}$$ Hochzahl $+1$, und vorne mit „1 geteilt durch die neue Hochzahl“ malnehmen – also: <b>Zahl vorne : neue Hochzahl</b>.</p></div>
<div class="mt-scroll"><table class="mt-table"><tr><th>$f(x)$</th><th>neue Hochzahl</th><th>Zahl vorne : neue Hochzahl</th><th>$F(x)$ (ohne $+c$)</th></tr>
<tr><td>$6x^2$</td><td>3</td><td>$6:3=2$</td><td>$2x^3$</td></tr>
<tr><td>$4x^3$</td><td>4</td><td>$4:4=1$</td><td>$x^4$</td></tr>
<tr><td>$8x^3$</td><td>4</td><td>$8:4=2$</td><td>$2x^4$</td></tr>
<tr><td>$5x^2$</td><td>3</td><td>$5:3$ geht nicht glatt</td><td>$\tfrac53x^3$</td></tr>
<tr><td>$x^2$ (= $1\cdot x^2$)</td><td>3</td><td>$1:3$</td><td>$\tfrac13x^3$</td></tr>
<tr><td>$2x$ (= $2x^1$)</td><td>2</td><td>$2:2=1$</td><td>$x^2$</td></tr>
<tr><td>$3$ (= $3x^0$)</td><td>1</td><td>$3:1=3$</td><td>$3x$</td></tr></table></div>
<p class="mt-muted">Hinweis: Hier geht es nur um Potenzen von $x$ – das reicht für die Klausur. Funktionen wie $e^x$, $\ln x$, $\sin x$ oder Wurzeln habe ich bewusst weggelassen, bis ihr sie im Unterricht hattet.</p>`,
      beispiel: {
        q: String.raw`Bestimme die Stammfunktion $F$ von $f(x)=6x^2-4x+3$ mit $F(1)=5$.`,
        steps: [
          { h: '6x² aufleiten', t: String.raw`Hochzahl $2\to3$. Zahl vorne: $6:3=2$. ⇒ $2x^3$.` },
          { h: '−4x aufleiten', t: String.raw`$-4x=-4x^1$: Hochzahl $1\to2$. Zahl vorne: $-4:2=-2$. ⇒ $-2x^2$.` },
          { h: '3 aufleiten', t: String.raw`$3=3x^0$: Hochzahl $0\to1$. Zahl vorne: $3:1=3$. ⇒ $3x$.` },
          { h: 'Zusammensetzen', t: String.raw`$F(x)=2x^3-2x^2+3x+c$.` },
          { h: 'Punkt einsetzen', t: String.raw`$F(1)=2-2+3+c=3+c=5\Rightarrow c=2$.` },
          { h: 'Ergebnis und Probe', t: String.raw`$F(x)=2x^3-2x^2+3x+2$. Probe: $F'(x)=6x^2-4x+3$ ✓` }
        ]
      },
      fehler: [
        String.raw`Hochzahl erhöhen, aber <b>nicht durch die neue Hochzahl teilen</b> ($6x^2\to6x^3$ ist falsch).`,
        String.raw`Durch die <b>alte</b> statt durch die neue Hochzahl teilen ($6x^2\to3x^3$ ist falsch – richtig ist $2x^3$).`,
        String.raw`Bei $-4x$ das Vorzeichen verlieren oder bei $3$ das $x$ vergessen ($3\to3x$).`,
        String.raw`Produkte „einfach aufleiten“: $(x+1)(x-2)$ erst ausmultiplizieren, dann aufleiten.`,
        String.raw`Das $+c$ vergessen, wenn ein Punkt gegeben ist.`
      ],
      test: [
        { q: String.raw`Stammfunktion von $5x^4$?`, a: String.raw`Neue Hochzahl 5, $5:5=1$ ⇒ $x^5$. (Probe: $(x^5)'=5x^4$ ✓)` },
        { q: String.raw`Stammfunktion von $6x$?`, a: String.raw`$6x=6x^1$: neue Hochzahl 2, $6:2=3$ ⇒ $3x^2$.` },
        { q: String.raw`Stammfunktion von $x^2$?`, a: String.raw`Neue Hochzahl 3, $1:3$ ⇒ $\tfrac13x^3$.` },
        { q: String.raw`Stammfunktion von $4$?`, a: String.raw`$4=4x^0$ ⇒ $4x$.` }
      ],
      tasks: ['E1']
    },
    // ------------------------------------------------------------ L3
    {
      id: 'L3', group: 'integral', num: 3, min: 10,
      title: 'Bestimmtes Integral & Hauptsatz',
      short: 'Endstand minus Anfangsstand.',
      idee: String.raw`Das <b>bestimmte Integral</b> $\displaystyle\int_a^b f(x)\,dx$ ist die <b>Fläche mit Vorzeichen</b> zwischen Graph und $x$-Achse (oberhalb positiv, unterhalb negativ) – oder: die <b>Bestandsänderung</b> von $a$ bis $b$.`,
      bild: String.raw`Die Stammfunktion $F$ ist wie der <b>Kilometerstand</b>. Wie weit bist du von $a$ bis $b$ gefahren? <b>Kilometerstand am Ende minus Kilometerstand am Anfang</b>: $F(b)-F(a)$. Der Startwert $c$ des Zählers spielt keine Rolle – er hebt sich auf.`,
      rezept: [
        String.raw`<b>Stammfunktion $F$ finden</b> (ohne $+c$).`,
        String.raw`<b>Obere minus untere Grenze:</b> $\displaystyle\int_a^b f\,dx=\Bigl[F(x)\Bigr]_a^b=F(b)-F(a)$. <b>Klammern setzen</b>, besonders bei negativen Zahlen!`,
        String.raw`<b>Teil A:</b> exakten Wert angeben (Brüche stehen lassen, z. B. $\tfrac{8}{3}$). <b>Teil B:</b> mit dem Rechner prüfen oder rechnen.`,
        String.raw`<b>Deuten:</b> Ergebnis $>0$: Zunahme / Fläche überwiegend oberhalb. Ergebnis $<0$: Abnahme. Ergebnis $0$: Zu- und Abnahme heben sich auf.`
      ],
      extra: String.raw`<div class="mt-scroll"><table class="mt-table"><tr><th>Regel</th><th>Formel</th></tr>
<tr><td>Gleiche Grenzen</td><td>$\int_a^a f\,dx=0$</td></tr>
<tr><td>Grenzen tauschen</td><td>$\int_a^b f\,dx=-\int_b^a f\,dx$</td></tr>
<tr><td>Zerlegen</td><td>$\int_a^b f\,dx=\int_a^c f\,dx+\int_c^b f\,dx$</td></tr>
<tr><td>Faktor und Summe</td><td>$\int_a^b (k f+l g)\,dx=k\int_a^b f\,dx+l\int_a^b g\,dx$</td></tr>
<tr><td>Symmetrie</td><td>$f$ gerade: $\int_{-a}^{a}f=2\int_0^a f$ · $f$ ungerade: $\int_{-a}^{a}f=0$</td></tr></table></div>`,
      beispiel: {
        q: String.raw`Berechne $\displaystyle\int_0^3 (x^2-2x)\,dx$.`,
        steps: [
          { h: 'Stammfunktion', t: String.raw`$F(x)=\tfrac13x^3-x^2$.` },
          { h: 'Grenzen einsetzen', t: String.raw`$F(3)=\tfrac13\cdot27-9=0$ &nbsp;und&nbsp; $F(0)=0$.` },
          { h: 'Subtrahieren', t: String.raw`$\displaystyle\int_0^3(x^2-2x)\,dx=F(3)-F(0)=0-0=0$.` },
          { h: 'Deuten', t: String.raw`Das Ergebnis ist <b>0</b>, obwohl der Graph eine Fläche einschließt: Oberhalb und unterhalb der Achse heben sich die Anteile auf. → Darum gibt es die nächste Lektion (Fläche ≠ Integral).` }
        ]
      },
      fehler: [
        String.raw`$F(a)-F(b)$ statt $F(b)-F(a)$ (Vorzeichen falsch).`,
        String.raw`Minus vor einer Klammer vergessen: $F(3)-(-4)=F(3)+4$.`,
        String.raw`Das $+c$ mitnehmen – beim bestimmten Integral fällt es weg.`,
        String.raw`„Integral = Flächeninhalt“ – stimmt nur, wenn der Graph nicht unter die Achse geht.`
      ],
      test: [
        { q: String.raw`$\displaystyle\int_2^2 f(x)\,dx=$?`, a: String.raw`$0$ (gleiche Grenzen).` },
        { q: String.raw`$\displaystyle\int_0^2 4\,dx=$?`, a: String.raw`$[4x]_0^2=8$ (Rechteck $2\cdot4$).` },
        { q: String.raw`$\displaystyle\int_{-1}^{1}x^3\,dx=$?`, a: String.raw`$0$, denn $x^3$ ist ungerade (punktsymmetrisch zum Ursprung).` }
      ],
      tasks: ['A7', 'A9']
    },
    // ------------------------------------------------------------ L4
    {
      id: 'L4', group: 'integral', num: 4, min: 15,
      title: 'Fläche & Betragsstriche | |',
      short: 'Gesamtfläche = alle Stücke positiv zählen.',
      idee: String.raw`Der <b>Flächeninhalt</b> ist immer $\ge0$. Das <b>Integral</b> kann negativ oder sogar 0 sein. Liegt ein Stück der Fläche unter der $x$-Achse, musst du <b>an den Nullstellen zerlegen</b> und jedes Stück mit <b>Betragsstrichen</b> $|\;|$ positiv machen.`,
      bild: String.raw`Flächen über der Achse sind <b>Guthaben</b>, Flächen darunter <b>Schulden</b>. Das Integral ist dein Kontostand (Guthaben − Schulden). Der Flächeninhalt zählt jedes Stück als positiv – Guthaben <b>plus</b> Schulden. Die Betragsstriche sind der Knopf „Vorzeichen weg“.`,
      rezept: [
        String.raw`<b>Zur $x$-Achse:</b> Nullstellen von $f$ im Intervall $[a;b]$ bestimmen.`,
        String.raw`<b>Zerlegen</b> an den Nullstellen und jedes Teilintegral einzeln ausrechnen: $I_1,\;I_2,\dots$`,
        String.raw`<b>Betragsstriche um jedes Teilergebnis einzeln</b> und addieren: $A=|I_1|+|I_2|+\dots$`,
        String.raw`<b>Zwischen zwei Graphen:</b> Schnittstellen $f(x)=g(x)$ als Grenzen; prüfen, welcher Graph <b>oben</b> liegt (Testwert!); dann $A=\displaystyle\int_a^b(f_{oben}-f_{unten})\,dx$.`
      ],
      extra: String.raw`<div class="mt-call ort"><div class="mt-call-h">Die Betragsstriche | | – so funktionieren sie</div>
<p><b>Betrag = Abstand zur 0.</b> Die Striche streichen das Vorzeichen weg, der Zahlenwert bleibt:</p>
<p>$|5|=5$ &nbsp;·&nbsp; $|-5|=5$ &nbsp;·&nbsp; $|0|=0$</p>
<ul>
<li><b>Erst rechnen, dann Striche:</b> $|3-8|=|-5|=5$.</li>
<li><b>Ein Minus <u>vor</u> den Strichen bleibt:</b> $-|-3|=-3$.</li>
<li><b>Betrag einer Summe ≠ Summe der Beträge:</b> $|4+(-4)|=|0|=0$, aber $|4|+|-4|=8$. Bei der Fläche brauchst du die <b>Summe der Beträge</b>!</li>
</ul></div>
<div class="mt-call idee"><div class="mt-call-h">Zwei Schreibweisen für „Gesamtfläche“</div>
<p><b>1. Stück für Stück</b> (so rechnest du): $$A=\bigl|\textstyle\int_a^{x_1}f\,dx\bigr|+\bigl|\textstyle\int_{x_1}^{b}f\,dx\bigr|$$ mit der Nullstelle $x_1$ dazwischen.</p>
<p><b>2. In einem Zug</b> (so schreibt man es kurz): $$A=\int_a^b|f(x)|\,dx$$ „Integral über den Betrag der Funktion“ = Gesamtfläche, alles positiv gezählt. Im Taschenrechner (Teil B) kannst du das direkt eingeben (abs). <b>Ohne Rechner</b> rechnest du trotzdem Stück für Stück an den Nullstellen.</p>
<p class="mt-muted">Nicht verwechseln: Die Schreibweise $F(x)\big|_a^b$ (Strich mit Grenzen rechts) ist nur eine andere Form von $\bigl[F(x)\bigr]_a^b=F(b)-F(a)$ – kein Betrag.</p></div>`,
      beispiel: {
        q: String.raw`Bestimme das Integral <b>und</b> den Flächeninhalt für $f(x)=x^3-4x$ auf $[-2;3]$.`,
        steps: [
          { h: 'Nullstellen', t: String.raw`$x^3-4x=x(x-2)(x+2)$ ⇒ $x=-2,\;0,\;2$. Im Intervall liegen $0$ und $2$ innen ⇒ drei Teilstücke: $[-2;0]$, $[0;2]$, $[2;3]$.` },
          { h: 'Stammfunktion', t: String.raw`$F(x)=\tfrac14x^4-2x^2$ ($x^3$: neue Hochzahl 4, $1:4$; $-4x$: neue Hochzahl 2, $-4:2=-2$). Werte: $F(-2)=-4$, $F(0)=0$, $F(2)=-4$, $F(3)=\tfrac{81}4-18=2{,}25$.` },
          { h: 'Teilintegrale', t: String.raw`$I_1=F(0)-F(-2)=4$ &nbsp;·&nbsp; $I_2=F(2)-F(0)=-4$ &nbsp;·&nbsp; $I_3=F(3)-F(2)=6{,}25$.` },
          { h: 'Integral (mit Vorzeichen)', t: String.raw`$4-4+6{,}25=\mathbf{6{,}25}$ – die Stücke heben sich teilweise auf.` },
          { h: 'Flächeninhalt (mit Betragsstrichen)', t: String.raw`$A=|4|+|-4|+|6{,}25|=4+4+6{,}25=\mathbf{14{,}25}$. Kurz: $A=\int_{-2}^{3}|x^3-4x|\,dx=14{,}25$.` },
          { h: 'Zwischen zwei Graphen (Kurzbeispiel)', t: String.raw`$f(x)=-x^2+4$ und $g(x)=x+2$: $-x^2+4=x+2\Rightarrow x=-2$ oder $x=1$. Bei $x=0$ ist $f=4>g=2$, also liegt $f$ oben. $A=\int_{-2}^{1}(-x^2-x+2)\,dx=\bigl[-\tfrac13x^3-\tfrac12x^2+2x\bigr]_{-2}^{1}=\tfrac76-(-\tfrac{10}3)=\tfrac92$.` }
        ]
      },
      fehler: [
        String.raw`Über eine Nullstelle hinweg in einem Stück integrieren – dann heben sich Teile auf.`,
        String.raw`Die Betragsstriche um die <b>ganze Summe</b> setzen: $|I_1+I_2|$ statt $|I_1|+|I_2|$.`,
        String.raw`Bei „Fläche zwischen Graphen“ die Differenz falsch herum bilden (oben minus unten!).`,
        String.raw`Die Schnittstellen als Grenzen vergessen und einfach irgendein Intervall nehmen.`
      ],
      test: [
        { q: String.raw`$|-7|$, $|2-9|$ und $-|-3|$?`, a: String.raw`$7$, $7$ und $-3$ (denn $|2-9|=|-7|=7$; das Minus vor den Strichen bleibt).` },
        { q: String.raw`Teilintegrale $I_1=-3$ und $I_2=5$. Integral und Flächeninhalt?`, a: String.raw`Integral: $-3+5=2$. Fläche: $|-3|+|5|=8$.` },
        { q: String.raw`Aus $\int_a^b f\,dx=0$ folgt $f=0$?`, a: String.raw`Nein. Gegenbeispiel $f(x)=x$ auf $[-1;1]$: Integral $0$, aber die Fläche ist nicht $0$.` },
        { q: String.raw`Wann ist Integral = Flächeninhalt?`, a: String.raw`Wenn $f\ge0$ auf $[a;b]$ (Graph liegt nicht unter der Achse).` }
      ],
      tasks: ['A3', 'A4', 'E2', 'E3']
    },
    // ------------------------------------------------------------ L5
    {
      id: 'L5', group: 'integral', num: 5, min: 8,
      title: 'Graph von f ↔ Graph von F',
      short: 'Aus dem Graphen von f lesen, wie F aussieht.',
      idee: String.raw`Weil $F'=f$ und $F''=f'$ gilt, kannst du aus dem Graphen von $f$ alles über $F$ ablesen – <b>ohne</b> $F$ auszurechnen. Das ist ein Abi-Klassiker in Teil A.`,
      bild: String.raw`$f$ ist der <b>Tacho</b>, $F$ der <b>Weg</b>. Ist der Tacho positiv, wächst der Weg. Hat der Tacho einen Tiefpunkt (Bremsen höchste Intensität), hat der Weg seinen Wendepunkt (steilster Abfall).`,
      rezept: [
        String.raw`<b>Nullstellen von $f$ markieren.</b> Dort hat $F$ eine waagerechte Tangente.`,
        String.raw`<b>Vorzeichenwechsel von $f$ prüfen:</b> $+\to-$: Hochpunkt von $F$. $-\to+$: Tiefpunkt von $F$. Kein Wechsel: Sattelpunkt von $F$.`,
        String.raw`<b>Extrempunkte von $f$ suchen:</b> dort hat $F$ einen Wendepunkt (weil $F''=f'=0$).`,
        String.raw`<b>Merken:</b> $F$ ist nur bis auf Verschiebung nach oben/unten festgelegt – Hoch-, Tief- und Wendestellen verschieben sich dabei nicht in $x$-Richtung.`
      ],
      extra: String.raw`<div class="mt-scroll"><table class="mt-table"><tr><th>Das siehst du bei $f$</th><th>Das gilt für $F$</th></tr>
<tr><td>$f>0$ (Graph über der Achse)</td><td>$F$ steigt</td></tr>
<tr><td>$f<0$ (Graph unter der Achse)</td><td>$F$ fällt</td></tr>
<tr><td>Nullstelle mit Vorzeichenwechsel $+\to-$</td><td>Hochpunkt von $F$</td></tr>
<tr><td>Nullstelle mit Vorzeichenwechsel $-\to+$</td><td>Tiefpunkt von $F$</td></tr>
<tr><td>Hoch- oder Tiefpunkt von $f$</td><td>Wendepunkt von $F$</td></tr>
<tr><td>$f$ steigt / fällt</td><td>$F$ ist linksgekrümmt / rechtsgekrümmt</td></tr></table></div>`,
      beispiel: {
        q: String.raw`Gegeben ist $f(x)=\tfrac12x(x-4)$. Welche Extrem- und Wendestellen hat jede Stammfunktion $F$?`,
        steps: [
          { h: 'Nullstellen von f', t: String.raw`$x=0$ und $x=4$.` },
          { h: 'Vorzeichenwechsel', t: String.raw`$f(-1)=\tfrac12\cdot(-1)(-5)=2{,}5>0$, $f(2)=\tfrac12\cdot2\cdot(-2)=-2<0$, $f(5)=2{,}5>0$. Bei $x=0$: $+\to-$ ⇒ <b>Hochpunkt</b> von $F$. Bei $x=4$: $-\to+$ ⇒ <b>Tiefpunkt</b> von $F$.` },
          { h: 'Wendestelle von F', t: String.raw`$f$ hat seinen Tiefpunkt bei $x=2$ ($f'(x)=x-2=0$) ⇒ $F''=f'$ wechselt dort das Vorzeichen ⇒ <b>Wendestelle</b> von $F$ bei $x=2$.` }
        ]
      },
      fehler: [
        String.raw`Hoch- und Tiefpunkt von $f$ mit denen von $F$ verwechseln.`,
        String.raw`Nullstelle von $f$ ohne Vorzeichenwechsel als Extremstelle von $F$ bezeichnen (das wäre ein Sattelpunkt).`,
        String.raw`Aussagen über Funktionswerte von $F$ machen, obwohl nur $f$ bekannt ist – $F(0)$ ist nicht festgelegt, solange kein Punkt gegeben ist.`
      ],
      test: [
        { q: String.raw`$f$ wechselt bei $x=1$ von $-$ nach $+$. Was hat $F$ dort?`, a: String.raw`Einen Tiefpunkt.` },
        { q: String.raw`$f$ hat bei $x=3$ einen Hochpunkt. Was hat $F$ dort?`, a: String.raw`Einen Wendepunkt.` }
      ],
      tasks: ['A2']
    },
    // ------------------------------------------------------------ L6
    {
      id: 'L6', group: 'integral', num: 6, min: 20,
      title: 'Bestandsaufgaben – das Komplett-Rezept',
      short: 'Tierbestand, Hochbehälter, Wasserbecken: jede Frage hat ihr Werkzeug.',
      demo: 'bestand',
      idee: String.raw`Fast jede Bestandsaufgabe fragt immer wieder dieselben Dinge. Wenn du weißt, <b>welches Werkzeug zu welcher Frage gehört</b>, sind sie Routine. Das ist vermutlich der größte Punkteblock in deiner Klausur.`,
      bild: String.raw`Du bist der <b>Hausmeister</b> eines Teichs. $f(t)$ ist, wie viele Fische pro Jahr dazukommen (negativ: weggehen). Der Fischbestand $B$ ist die Summe aus Anfangsbestand und allem, was seitdem dazukam. Jede Frage der Aufgabe ist eine andere Frage an <i>diesen</i> Teich.`,
      rezept: [
        String.raw`<b>Zu-/Abnahme:</b> Nullstellen von $f$ bestimmen, in jedem Teilintervall das Vorzeichen prüfen (Testwert).`,
        String.raw`<b>Bestandsfunktion:</b> $B(t)=B(0)+\int_0^t f(s)\,ds$. Erst $f$ ausmultiplizieren, dann aufleiten.`,
        String.raw`<b>Größter / kleinster <u>Bestand</u>:</b> Kandidaten sind die Nullstellen von $f$ <b>und die Ränder</b>. $B$ dort ausrechnen und vergleichen.`,
        String.raw`<b>Größte / kleinste <u>Änderungsrate</u>:</b> $f'(t)=0$ lösen (Extrema von $f$) <b>und die Randwerte $f(a)$, $f(b)$</b> vergleichen.`,
        String.raw`<b>Mittlere Änderungsrate</b> auf $[a;b]$: $\dfrac{B(b)-B(a)}{b-a}$. &nbsp; <b>Durchschnittlicher Bestand:</b> $\dfrac1{b-a}\displaystyle\int_a^b B(t)\,dt$ (Mittelwert von $B$, nicht von $f$!).`,
        String.raw`<b>„Wann ist der Bestand genau $X$?“</b> $B(t)=X$ mit dem Rechner lösen (Schnittpunkte). Mehrere Lösungen sind möglich, wenn $B$ nicht monoton ist – Graph ansehen.`,
        String.raw`<b>Parallelogramm / Fläche in Abhängigkeit von $u$:</b> Term $A(u)$ aufstellen, $A'(u)=0$, Randwerte prüfen, Antwortsatz.`
      ],
      beispiel: {
        q: String.raw`Zuwachsrate eines Bestands: $f(t)=0{,}2\,t\,(t-3)(t-9)$ für $0\le t\le10$ (Tiere pro Jahr), $B(0)=60$.`,
        steps: [
          { h: 'Zu- und Abnahme', t: String.raw`Nullstellen $0,\,3,\,9$. Testwerte: $f(1)=3{,}2>0$, $f(5)=0{,}2\cdot5\cdot2\cdot(-4)=-8<0$, $f(10)=14>0$. ⇒ Zunahme $0$–$3$ und $9$–$10$, Abnahme $3$–$9$.` },
          { h: 'Bestandsfunktion', t: String.raw`$f(t)=0{,}2t^3-2{,}4t^2+5{,}4t$ ⇒ $B(t)=60+0{,}05t^4-0{,}8t^3+2{,}7t^2$.` },
          { h: 'Größter / kleinster Bestand', t: String.raw`Kandidaten $t=0,3,9,10$: $B(0)=60$, $B(3)=66{,}75$, $B(9)=23{,}55$, $B(10)=30$. Größter Bestand: <b>66,75</b> nach 3 Jahren. Kleinster: <b>23,55</b> nach 9 Jahren.` },
          { h: 'Größte Änderungsrate', t: String.raw`$f'(t)=0{,}6\,(t^2-8t+9)=0\Rightarrow t=4\pm\sqrt7\approx1{,}35;\,6{,}65$. $f(1{,}35)\approx3{,}41$, $f(6{,}65)\approx-11{,}41$. Randwerte $f(0)=0$, $f(10)=14$. Größte Rate: <b>14</b> bei $t=10$ (Rand!), stärkste Abnahme $\approx-11{,}41$ bei $t\approx6{,}65$.` },
          { h: 'Mittlere Änderungsrate', t: String.raw`$\dfrac{B(10)-B(0)}{10}=\dfrac{30-60}{10}=-3$ Tiere pro Jahr.` },
          { h: 'Bestand genau 50', t: String.raw`$B(t)=50$ mit dem Rechner: nur $t\approx5{,}93$ (zwischen dem Maximum bei $t=3$ und dem Minimum bei $t=9$ fällt $B$ von 66,75 auf 23,55 und kreuzt 50 genau einmal).` }
        ]
      },
      fehler: [
        String.raw`<b>Randwerte vergessen:</b> Das größte $f$ liegt hier am rechten Rand ($f(10)=14$), nicht beim lokalen Maximum ($3{,}41$).`,
        String.raw`Mittelwert von $f$ statt von $B$ bilden („durchschnittlicher Bestand“).`,
        String.raw`Bestandsfunktion ohne Anfangsbestand: $B(t)=\int_0^t f$ statt $60+\int_0^t f$.`,
        String.raw`Ergebnisse ohne Antwortsatz und Einheit stehen lassen.`
      ],
      test: [
        { q: String.raw`Wo liegen die Kandidaten für den größten Bestand?`, a: String.raw`Bei den Nullstellen von $f$ (mit Vorzeichenwechsel $+\to-$) und an den Rändern des Intervalls.` },
        { q: String.raw`Womit findest du die größte Änderungsrate?`, a: String.raw`$f'(t)=0$ (Extrema von $f$) und Randwerte von $f$.` },
        { q: String.raw`Was ist der „durchschnittliche Bestand“ auf $[0;10]$?`, a: String.raw`$\frac1{10}\int_0^{10}B(t)\,dt$.` }
      ],
      tasks: ['B2', 'B3']
    },
    // ------------------------------------------------------------ L7
    {
      id: 'L7', group: 'schar', num: 7, min: 10,
      title: 'Funktionsschar: Funktion mit Regler',
      short: 'k ist nur eine Zahl, die du (noch) nicht kennst.',
      demo: null,
      idee: String.raw`Eine <b>Funktionenschar</b> $f_k$ ist eine ganze Familie von Funktionen. Der <b>Parameter</b> $k$ ist ein Regler: Für jedes $k$ bekommst du eine andere Funktion der gleichen „Sorte“.`,
      bild: String.raw`$k$ ist ein <b>Schieberegler</b>. Stellst du $k=2$ ein, hast du eine ganz normale Funktion. Dein Trick in der Klausur: <b>Rechne mit $k$ wie mit einer ganz normalen Zahl</b> (wie die 5 in $5x^2$) – du bekommst am Ende Ergebnisse, in denen $k$ vorkommt.`,
      rezept: [
        String.raw`<b>Ausklammern / Faktorform:</b> So siehst du Nullstellen sofort. Beispiel: $x^4-2kx^2=x^2(x^2-2k)$.`,
        String.raw`<b>Nullstellen:</b> Jeden Faktor $=0$ setzen. Bedingungen an $k$ beachten (z. B. $\sqrt{2k}$ gibt es nur für $k>0$).`,
        String.raw`<b>Symmetrie:</b> nur gerade Potenzen ⇒ achsensymmetrisch zur $y$-Achse; nur ungerade ⇒ punktsymmetrisch zum Ursprung.`,
        String.raw`<b>Ableiten nur nach $x$:</b> $k$ bleibt als Konstante. Beispiel: $(2kx^2)'=4kx$ und $(k^2)'=0$.`
      ],
      beispiel: {
        q: String.raw`Gegeben ist $f_k(x)=x^4-2kx^2$ mit $k>0$. Bestimme Nullstellen, Symmetrie und $f_k'(x)$.`,
        steps: [
          { h: 'Ausklammern', t: String.raw`$f_k(x)=x^2\,(x^2-2k)$.` },
          { h: 'Nullstellen', t: String.raw`$x^2=0\Rightarrow x=0$ (doppelt). $x^2=2k\Rightarrow x=\pm\sqrt{2k}$ (existiert, weil $k>0$).` },
          { h: 'Symmetrie', t: String.raw`Nur gerade Potenzen ($x^4$, $x^2$): $f_k(-x)=f_k(x)$ ⇒ achsensymmetrisch zur $y$-Achse.` },
          { h: 'Ableitung', t: String.raw`$f_k'(x)=4x^3-4kx=4x\,(x^2-k)$. ($k$ bleibt stehen wie eine Zahl.)` }
        ]
      },
      fehler: [
        String.raw`Nach $k$ statt nach $x$ ableiten (z. B. $(kx)'=x$ ✗ – richtig: $(kx)'=k$).`,
        String.raw`Nicht ausklammern und dann umständlich mit der Formel für quadratische Gleichungen arbeiten.`,
        String.raw`Bedingung $k>0$ (oder $k\ne0$) im Aufgabentext übersehen.`,
        String.raw`Bei „doppelter Nullstelle“ nicht merken: Der Graph <b>berührt</b> die Achse, er schneidet sie nicht.`
      ],
      test: [
        { q: String.raw`Ableitung von $f_k(x)=3kx^2+k^2$ nach $x$?`, a: String.raw`$f_k'(x)=6kx$ (der Summand $k^2$ ist eine Konstante und fällt weg).` },
        { q: String.raw`Nullstellen von $g_a(x)=x(x-a)(x+a)$?`, a: String.raw`$x=0$, $x=a$, $x=-a$.` },
        { q: String.raw`Was bedeutet eine doppelte Nullstelle für den Graphen?`, a: String.raw`Der Graph berührt die $x$-Achse (kein Vorzeichenwechsel).` }
      ],
      tasks: ['SA1']
    },
    // ------------------------------------------------------------ L8
    {
      id: 'L8', group: 'schar', num: 8, min: 12,
      title: 'Extrem- und Wendepunkte mit Parameter',
      short: 'Wie immer – nur mit k im Gepäck.',
      idee: String.raw`Extrem- und Wendepunkte einer Schar berechnest du <b>genau wie sonst</b>. Das Ergebnis sind Koordinaten, die von $k$ abhängen, z. B. $T_k(\sqrt k\,|\,-k^2)$.`,
      bild: String.raw`Der Tiefpunkt ist eine <b>Perle</b> auf dem Graphen. Drehst du am Regler $k$, rutscht die Perle mit – ihre Koordinaten sind Formeln in $k$.`,
      rezept: [
        String.raw`<b>Ableitungen bilden:</b> $f_k'$ und $f_k''$ (nach $x$).`,
        String.raw`<b>Notwendig:</b> $f_k'(x)=0$ lösen – ausklammern!`,
        String.raw`<b>Hinreichend:</b> $f_k''$ an den Stellen prüfen. $f_k''<0$: Hochpunkt; $f_k''>0$: Tiefpunkt. Das Vorzeichen kann von $k$ abhängen – nutze $k>0$.`,
        String.raw`<b>$y$-Koordinate:</b> $x$-Wert in $f_k$ einsetzen (nicht in $f_k'$!).`,
        String.raw`<b>Wendepunkt:</b> $f_k''(x)=0$, dann $f_k'''(x)\neq0$ (oder Vorzeichenwechsel von $f_k''$), $y$ aus $f_k$.`
      ],
      beispiel: {
        q: String.raw`$f_k(x)=x^4-2kx^2$, $k>0$. Bestimme Extrem- und Wendepunkte.`,
        steps: [
          { h: 'Ableitungen', t: String.raw`$f_k'(x)=4x^3-4kx$, &nbsp; $f_k''(x)=12x^2-4k$.` },
          { h: 'Notwendige Bedingung', t: String.raw`$4x(x^2-k)=0\Rightarrow x=0$ oder $x=\pm\sqrt k$.` },
          { h: 'Art der Extrempunkte', t: String.raw`$f_k''(0)=-4k<0$ ⇒ <b>Hochpunkt</b>. &nbsp; $f_k''(\pm\sqrt k)=12k-4k=8k>0$ ⇒ <b>Tiefpunkte</b>.` },
          { h: 'y-Koordinaten', t: String.raw`$f_k(0)=0$. &nbsp; $f_k(\pm\sqrt k)=k^2-2k\cdot k=-k^2$. ⇒ $H(0|0)$, $T_{1,2}(\pm\sqrt k\,|\,-k^2)$.` },
          { h: 'Wendepunkte', t: String.raw`$f_k''(x)=0\Rightarrow x^2=\tfrac k3\Rightarrow x=\pm\sqrt{k/3}$; $f_k(\pm\sqrt{k/3})=\tfrac{k^2}9-\tfrac{2k^2}3=-\tfrac59k^2$. ⇒ $W_{1,2}\bigl(\pm\sqrt{k/3}\,|\,-\tfrac59k^2\bigr)$.` }
        ]
      },
      fehler: [
        String.raw`$y$-Koordinate mit $f_k'$ statt $f_k$ ausrechnen.`,
        String.raw`Die Art des Extremums vergessen oder ohne Begründung angeben.`,
        String.raw`Vorzeichen von $f_k''$ falsch: $12k-4k=8k$, nicht $16k$ – langsam rechnen!`,
        String.raw`Den Punkt $x=0$ übersehen, weil man nach $x$ geteilt hat (stattdessen ausklammern).`
      ],
      test: [
        { q: String.raw`Warum klammert man bei $f_k'(x)=4x^3-4kx$ aus statt durch $x$ zu teilen?`, a: String.raw`Beim Teilen geht die Lösung $x=0$ verloren.` },
        { q: String.raw`Mit welcher Funktion rechnest du die $y$-Koordinate eines Extrempunkts?`, a: String.raw`Mit der Ausgangsfunktion $f_k$.` }
      ],
      tasks: ['SA1', 'SA8']
    },
    // ------------------------------------------------------------ L9
    {
      id: 'L9', group: 'schar', num: 9, min: 15,
      title: 'Ortskurve – die Spur eines Punktes',
      short: 'In 4 Schritten k verschwinden lassen.',
      demo: 'ortskurve',
      idee: String.raw`Wandert ein Punkt (z. B. der Tiefpunkt $T_k$), wenn du $k$ veränderst, hinterlässt er eine <b>Spur</b>. Die Kurve, auf der alle diese Punkte liegen, heißt <b>Ortskurve</b>. Ihre Gleichung hat <b>kein $k$</b> mehr: $y=\dots(x)$.`,
      bild: String.raw`Stell dir vor, du ziehst langsam am Regler $k$ und der Hochpunkt hinterlässt eine <b>Leuchtspur</b>. Diese Spur ist die Ortskurve. Im Demo darunter siehst du genau das.`,
      rezept: [
        String.raw`<b>Punkt in $k$ aufschreiben:</b> $x=\dots k\dots$ und $y=\dots k\dots$ (aus der Extrem-/Wendepunktrechnung).`,
        String.raw`<b>Die $x$-Gleichung nach $k$ auflösen:</b> $k=\dots x\dots$.`,
        String.raw`<b>In die $y$-Gleichung einsetzen:</b> Jetzt ist $k$ verschwunden: $y=\dots(x)$. Das ist die Ortskurve.`,
        String.raw`<b>Bereich angeben</b> (aus der Bedingung an $k$, z. B. $k>0\Rightarrow x>0$) und <b>Probe</b> mit einem konkreten $k$.`
      ],
      beispiel: {
        q: String.raw`Tiefpunkte der Schar $f_k(x)=x^4-2kx^2$: $T(\sqrt k\,|\,-k^2)$. Bestimme die Ortskurve.`,
        steps: [
          { h: 'x und y in k', t: String.raw`$x=\sqrt k$ &nbsp;und&nbsp; $y=-k^2$.` },
          { h: 'Nach k auflösen', t: String.raw`$x=\sqrt k\Rightarrow k=x^2$.` },
          { h: 'Einsetzen', t: String.raw`$y=-k^2=-(x^2)^2=-x^4$.` },
          { h: 'Ergebnis und Probe', t: String.raw`Ortskurve: $\boxed{y=-x^4}$. Probe: $k=4$ ⇒ $T(2\,|\,-16)$ und $-2^4=-16$ ✓ (der linke Tiefpunkt $(-\sqrt k|-k^2)$ liegt wegen $(-x)^4=x^4$ ebenfalls auf der Kurve).` }
        ]
      },
      extraAfter: String.raw`<div class="mt-call ort"><div class="mt-call-h">Hochbehälter-Typ (Scharfaktor x = c·k)</div>
<p>Wenn $x=c\cdot k$ (z. B. $x=1{,}5k$), dann ist $k=\dfrac{x}{c}$. Beispiel: $f_k(t)=0{,}05\,t(t-k)(t-2k)(t-3k)$ hat den Hochpunkt $H\bigl(1{,}5k\,|\,0{,}028125\,k^4\bigr)$. Aus $x=1{,}5k$ folgt $k=\frac{x}{1{,}5}$, und $y=0{,}028125\cdot\frac{x^4}{1{,}5^4}=\dfrac{x^4}{180}$. Ortskurve: $y=\frac1{180}x^4$ ($x>0$).</p></div>
<div class="mt-call ort"><div class="mt-call-h">Noch ein Beispiel (Scheitelpunkt einer Parabelschar)</div>
<p>$f_t(x)=x^2-6tx+8t^2=(x-3t)^2-t^2$ ⇒ $S(3t\,|\,-t^2)$. $x=3t\Rightarrow t=\frac x3$ ⇒ $y=-\bigl(\frac x3\bigr)^2=-\dfrac{x^2}{9}$. Ortskurve: $y=-\frac19x^2$.</p></div>`,
      fehler: [
        String.raw`$k$ in der Antwort stehen lassen – eine Ortskurve enthält nur $x$ und $y$.`,
        String.raw`Nach dem Auflösen $k=\frac{x}{c}$ den Bruch beim Potenzieren nicht mitpotenzieren: $\bigl(\frac{x}{1{,}5}\bigr)^4=\frac{x^4}{1{,}5^4}$.`,
        String.raw`Den Definitionsbereich ($k>0\Rightarrow x>0$) vergessen.`,
        String.raw`Statt der Ortskurve die Gleichung eines <b>einzelnen</b> Graphen angeben.`
      ],
      test: [
        { q: String.raw`Ein Hochpunkt hat die Koordinaten $H(k\,|\,4k^3)$. Welche Ortskurve?`, a: String.raw`$x=k$ einsetzen: $y=4x^3$ (für $k>0$: $x>0$).` },
        { q: String.raw`Ein Punkt hat $x=2k$ und $y=k^2$. Welche Ortskurve?`, a: String.raw`$k=\frac x2$ ⇒ $y=\bigl(\frac x2\bigr)^2=\frac14x^2$.` }
      ],
      tasks: ['SA2', 'SA3', 'SA9']
    },
    // ------------------------------------------------------------ L10
    {
      id: 'L10', group: 'schar', num: 10, min: 12,
      title: 'Parameter bestimmen & Schar aus Steckbrief',
      short: '„Für welches k gilt …?“ und „eine Bedingung fehlt“.',
      idee: String.raw`Bei „Bestimme $k$ so, dass …“ übersetzt du die Bedingung in eine <b>Gleichung für $k$</b> und löst sie. Bei Steckbriefaufgaben, in denen <b>eine Bedingung fehlt</b>, bleibt ein Parameter übrig – dann entsteht eine Schar.`,
      bild: String.raw`„Bestimme $k$“ heißt: <b>Stelle den Regler so ein, dass die Bedingung stimmt.</b> Beim Steckbrief: Du hast zu wenige Hinweise für genau <i>eine</i> Funktion – deshalb passen viele, und sie bilden eine Schar.`,
      rezept: [
        String.raw`<b>Bedingung übersetzen:</b> „Punkt $P(x_0|y_0)$ liegt auf dem Graphen“ ⇒ $f_k(x_0)=y_0$. „Waagerechte Tangente bei $x_0$“ ⇒ $f_k'(x_0)=0$. „Extremwert ist $y_0$“ ⇒ $y$-Koordinate $=y_0$. „Fläche $=A_0$“ ⇒ Integral $=A_0$.`,
        String.raw`<b>Gleichung nach $k$ lösen.</b>`,
        String.raw`<b>Prüfen:</b> passt $k$ zur Vorgabe (z. B. $k>0$)? Unpassende Lösungen streichen.`,
        String.raw`<b>Schar aus Steckbrief:</b> Gleichungssystem aufstellen, so weit lösen wie möglich, den freien Parameter $t$ nennen und überall einsetzen.`
      ],
      beispiel: {
        q: String.raw`(1) $f_k(x)=x^3-kx$. Für welches $k$ geht der Graph durch $P(2|-4)$? &nbsp; (2) Eine Parabel $f(x)=ax^2+bx+c$ hat ihren Scheitel bei $x=2$ und es gilt $f(0)=1$. Gib die Schar an.`,
        steps: [
          { h: '(1) Bedingung als Gleichung', t: String.raw`$f_k(2)=-4\Rightarrow 8-2k=-4$.` },
          { h: '(1) Lösen', t: String.raw`$-2k=-12\Rightarrow k=6$. Probe: $f_6(2)=8-12=-4$ ✓.` },
          { h: '(2) Bedingungen aufschreiben', t: String.raw`Scheitel bei $x=2$: $f'(2)=0\Rightarrow4a+b=0$. &nbsp; $f(0)=1\Rightarrow c=1$.` },
          { h: '(2) Parameter wählen', t: String.raw`Aus $4a+b=0$ folgt $b=-4a$. Es bleibt $a$ frei ⇒ <b>Schar</b> $f_a(x)=ax^2-4ax+1$ (mit $a\ne0$, sonst wäre es keine Parabel).` }
        ]
      },
      fehler: [
        String.raw`Bedingung nicht in eine Gleichung übersetzt, sondern „irgendwie“ gerechnet.`,
        String.raw`Bei $k^2=9$ nur $k=3$ nehmen und $k=-3$ nicht prüfen (oder umgekehrt).`,
        String.raw`Die Randbedingung ($k>0$, $a\ne0$) nicht prüfen.`
      ],
      test: [
        { q: String.raw`$f_k(x)=kx^2-4x$ soll bei $x=1$ eine waagerechte Tangente haben. Wie lautet die Gleichung für $k$?`, a: String.raw`$f_k'(1)=2k-4=0\Rightarrow k=2$.` },
        { q: String.raw`Wie erkennst du in einem Steckbrief-LGS, dass eine Schar entsteht?`, a: String.raw`Es gibt weniger unabhängige Gleichungen als Unbekannte – ein Parameter bleibt frei.` }
      ],
      tasks: ['SA4', 'SA5', 'SA7', 'SB3']
    }
  ];

  // ----------------------------------------------------------- PROBEKLAUSUR 1
  const EXAM1 = {
    id: 'MP1',
    title: 'Probeklausur 1 – Integral, Bestand, Schar & Ortskurve',
    minutes: 90, minutesA: 35, maxBE: 60,
    tasks: [
      // ------------------------------------------------------------ A1
      {
        id: 'MP1-A1', teil: 'A', topic: 'integral', lesson: 'L2', title: 'Stammfunktion und Integral', afb: 'I–II', ops: 'Bestimmen, Berechnen',
        intro: String.raw`Gegeben ist die Funktion $f$ mit $f(x)=8x^3-6x^2+4x$.`,
        parts: [
          { id: 'MP1-A1a', label: 'a)', be: 2, text: String.raw`Bestimmen Sie die Stammfunktion $F$ von $f$ mit $F(1)=5$.`,
            nums: [{ label: 'c', ans: 3, tol: 0.01 }],
            hints: [String.raw`Jeden Summanden einzeln aufleiten: Hochzahl $+1$, dann „Zahl vorne : neue Hochzahl“. Beispiel $8x^3$: neue Hochzahl 4, $8:4=2$ ⇒ $2x^4$.`, String.raw`Schreibe $F(x)=\dots+c$ und setze $x=1$ ein. Das Ergebnis muss 5 sein.`],
            sol: String.raw`<p>$8x^3\to2x^4$ ($8:4$), $-6x^2\to-2x^3$ ($-6:3$), $4x\to2x^2$ ($4:2$). Also $F(x)=2x^4-2x^3+2x^2+c$.</p><p>$F(1)=2-2+2+c=2+c=5\Rightarrow c=3$, also $F(x)=2x^4-2x^3+2x^2+3$. Probe: $F'(x)=8x^3-6x^2+4x$ ✓</p><ul><li>Stammfunktion ohne $c$ (1 BE)</li><li>$c=3$ aus $F(1)=5$ (1 BE)</li></ul>` },
          { id: 'MP1-A1b', label: 'b)', be: 2, text: String.raw`Berechnen Sie $\displaystyle\int_1^3(3x^2-4x)\,dx$.`,
            nums: [{ label: 'Wert', ans: 10, tol: 0.01 }],
            hints: [String.raw`Stammfunktion: $3x^2\to x^3$ (neue Hochzahl 3, $3:3=1$) und $-4x\to-2x^2$.`, String.raw`$F(3)-F(1)$ mit $F(x)=x^3-2x^2$. Klammer um $F(1)$ setzen – der Wert ist negativ!`],
            sol: String.raw`<p>$F(x)=x^3-2x^2$. $F(3)=27-18=9$, $F(1)=1-2=-1$.</p><p>$\displaystyle\int_1^3(3x^2-4x)\,dx=F(3)-F(1)=9-(-1)=10$.</p><ul><li>Stammfunktion (1 BE)</li><li>Einsetzen mit Klammer, Ergebnis 10 (1 BE)</li></ul>` },
          { id: 'MP1-A1c', label: 'c)', be: 2, text: String.raw`Bestimmen Sie $a>0$ so, dass $\displaystyle\int_0^a(2x+1)\,dx=6$ gilt.`,
            nums: [{ label: 'a', ans: 2, tol: 0.01 }],
            hints: [String.raw`Berechne zuerst das Integral in Abhängigkeit von $a$.`, String.raw`Du erhältst eine quadratische Gleichung. Welche Lösung passt zu $a>0$?`],
            sol: String.raw`<p>$\displaystyle\int_0^a(2x+1)\,dx=\bigl[x^2+x\bigr]_0^a=a^2+a$.</p><p>$a^2+a=6\Rightarrow a^2+a-6=0\Rightarrow(a+3)(a-2)=0$ ⇒ $a=2$ ($a=-3$ entfällt wegen $a>0$).</p><ul><li>Integral in Abhängigkeit von $a$ (1 BE)</li><li>Gleichung lösen, $a=2$ mit Begründung (1 BE)</li></ul>` }
        ]
      },
      // ------------------------------------------------------------ A2
      {
        id: 'MP1-A2', teil: 'A', topic: 'integral', lesson: 'L5', title: 'Graph von f und Stammfunktion F', afb: 'II–III', ops: 'Begründen, Berechnen',
        fig: { kind: 'fn', f: x => -x * x + 2 * x + 3, xmin: -2.5, xmax: 4.5, ymin: -6, ymax: 5.5, title: 'Graph von f mit f(x) = −x² + 2x + 3' },
        intro: String.raw`Abgebildet ist der Graph der Funktion $f$ mit $f(x)=-x^2+2x+3$. Die Funktion $F$ ist eine Stammfunktion von $f$.`,
        parts: [
          { id: 'MP1-A2a', label: 'a)', be: 2, text: String.raw`Geben Sie die Extremstellen von $F$ an und begründen Sie, ob jeweils ein Hoch- oder Tiefpunkt vorliegt (ohne $F$ zu berechnen).`,
            hints: [String.raw`Es gilt $F'(x)=f(x)$. Wo ist $F'=0$?`, String.raw`Prüfe, ob $f$ dort von $-$ nach $+$ oder von $+$ nach $-$ wechselt.`],
            sol: String.raw`<p>$F'=f$. Nullstellen von $f$: $x=-1$ und $x=3$.</p><p>Bei $x=-1$ wechselt $f$ von $-$ nach $+$ ⇒ <b>Tiefpunkt</b> von $F$. Bei $x=3$ wechselt $f$ von $+$ nach $-$ ⇒ <b>Hochpunkt</b> von $F$.</p><ul><li>Nullstellen von $f$ (1 BE)</li><li>Art mit Vorzeichenwechsel begründet (1 BE)</li></ul>` },
          { id: 'MP1-A2b', label: 'b)', be: 1, text: String.raw`Begründen Sie, dass der Graph von $F$ an der Stelle $x=1$ einen Wendepunkt besitzt.`,
            hints: [String.raw`Es gilt $F''=f'$. Wo hat $f$ seinen Hochpunkt?`],
            sol: String.raw`<p>$F''(x)=f'(x)=-2x+2$. Es gilt $f'(1)=0$, und $f'$ wechselt bei $x=1$ von $+$ nach $-$ (der Graph von $f$ hat bei $x=1$ seinen Hochpunkt) ⇒ Wendestelle von $F$.</p><ul><li>$F''=f'$, $f'(1)=0$ mit Vorzeichenwechsel (1 BE)</li></ul>` },
          { id: 'MP1-A2c', label: 'c)', be: 2, text: String.raw`Berechnen Sie $\displaystyle\int_{-1}^{3}f(x)\,dx$ (exakter Wert).`,
            nums: [{ label: 'Wert', ans: 32 / 3, tol: 0.02 }],
            hints: [String.raw`Eine Stammfunktion von $-x^2+2x+3$ ist $-\tfrac13x^3+x^2+3x$.`, String.raw`Obere minus untere Grenze; Klammer bei $-\tfrac53$ nicht vergessen.`],
            sol: String.raw`<p>$F_0(x)=-\tfrac13x^3+x^2+3x$: $F_0(3)=-9+9+9=9$, $F_0(-1)=\tfrac13+1-3=-\tfrac53$.</p><p>$\displaystyle\int_{-1}^{3}f\,dx=9-\bigl(-\tfrac53\bigr)=\tfrac{32}{3}$.</p><ul><li>Stammfunktion (1 BE)</li><li>Einsetzen und Ergebnis $\tfrac{32}3$ (1 BE)</li></ul>` }
        ]
      },
      // ------------------------------------------------------------ A3
      {
        id: 'MP1-A3', teil: 'A', topic: 'schar', lesson: 'L9', title: 'Schar: Tiefpunkt und Ortskurve', afb: 'II', ops: 'Bestimmen, Zeigen',
        intro: String.raw`Gegeben ist die Funktionenschar $f_k$ mit $f_k(x)=x^3-3kx^2$, $k>0$.`,
        parts: [
          { id: 'MP1-A3a', label: 'a)', be: 2, text: String.raw`Bestimmen Sie die Nullstellen von $f_k$ und erläutern Sie, was die doppelte Nullstelle für den Graphen bedeutet.`,
            hints: [String.raw`Klammere $x^2$ aus.`, String.raw`Eine doppelte Nullstelle hat keinen Vorzeichenwechsel.`],
            sol: String.raw`<p>$f_k(x)=x^2\,(x-3k)$ ⇒ $x=0$ (doppelt) und $x=3k$.</p><p>An der doppelten Nullstelle $x=0$ <b>berührt</b> der Graph die $x$-Achse (kein Vorzeichenwechsel von $f_k$); dort liegt ein Extrempunkt.</p><ul><li>Nullstellen $0$ und $3k$ (1 BE)</li><li>Deutung „berührt die Achse“ (1 BE)</li></ul>` },
          { id: 'MP1-A3b', label: 'b)', be: 3, text: String.raw`Zeigen Sie, dass der Graph von $f_k$ den Tiefpunkt $T_k(2k\,|\,-4k^3)$ besitzt.`,
            hints: [String.raw`Ableitung nach $x$: $k$ bleibt wie eine Zahl stehen. Klammere in $f_k'$ aus.`, String.raw`Für die Art: $f_k''(2k)$ – ist es wegen $k>0$ positiv?`],
            sol: String.raw`<p>$f_k'(x)=3x^2-6kx=3x\,(x-2k)=0\Rightarrow x=0$ oder $x=2k$.</p><p>$f_k''(x)=6x-6k$, also $f_k''(2k)=6k>0$ ⇒ Tiefpunkt. $f_k(2k)=8k^3-12k^3=-4k^3$.</p><ul><li>$f_k'=0$, $x=2k$ (1 BE)</li><li>$f_k''(2k)=6k>0$ (1 BE)</li><li>$y=-4k^3$ (1 BE)</li></ul>` },
          { id: 'MP1-A3c', label: 'c)', be: 2, text: String.raw`Bestimmen Sie eine Gleichung der Ortskurve, auf der alle Tiefpunkte $T_k$ liegen.`,
            hints: [String.raw`Löse $x=2k$ nach $k$ auf.`, String.raw`Setze das Ergebnis in $y=-4k^3$ ein.`],
            sol: String.raw`<p>$x=2k\Rightarrow k=\frac x2$. Einsetzen: $y=-4\cdot\bigl(\frac x2\bigr)^3=-\frac12x^3$.</p><p><b>Ortskurve: $y=-\frac12x^3$</b> ($x>0$, wegen $k>0$).</p><ul><li>$k=\frac x2$ (1 BE)</li><li>Gleichung $y=-\frac12x^3$ (1 BE)</li></ul>` }
        ]
      },
      // ------------------------------------------------------------ A4
      {
        id: 'MP1-A4', teil: 'A', topic: 'integral', lesson: 'L1', title: 'Bestand aus dem Graphen (Wassertank)', afb: 'I–II', ops: 'Bestimmen, Berechnen',
        fig: { kind: 'pw', pts: [[0, 0], [2, 6], [4, 6], [6, 0], [8, -4], [10, -4]], xmin: 0, xmax: 11, ymin: -6, ymax: 8, title: 'r(t) in m³/h' },
        intro: String.raw`Der Graph zeigt die Zu- bzw. Abflussrate $r$ (in m³ pro Stunde; negativ = Abfluss) eines Wassertanks für $0\le t\le10$ ($t$ in Stunden). Zwischen den Knickpunkten $(0|0),(2|6),(4|6),(6|0),(8|-4),(10|-4)$ verläuft der Graph geradlinig. Zu Beginn befinden sich 10 m³ Wasser im Tank.`,
        parts: [
          { id: 'MP1-A4a', label: 'a)', be: 2, text: String.raw`Bestimmen Sie, zu welchem Zeitpunkt der Tank am meisten Wasser enthält, und wie viel das ist.`,
            nums: [{ label: 'm³', ans: 34, tol: 0.05 }],
            hints: [String.raw`Wann wechselt $r$ das Vorzeichen von $+$ nach $-$?`, String.raw`Flächen unter dem Graphen von $0$ bis dorthin: Dreieck, Rechteck, Dreieck. Plus Anfangsbestand 10.`],
            sol: String.raw`<p>$r$ wechselt bei $t=6$ von $+$ nach $-$ ⇒ Maximum bei $t=6$.</p><p>$B(6)=10+\underbrace{\tfrac12\cdot2\cdot6}_{[0;2]}+\underbrace{2\cdot6}_{[2;4]}+\underbrace{\tfrac12\cdot2\cdot6}_{[4;6]}=10+6+12+6=34$ m³.</p><ul><li>Zeitpunkt $t=6$ mit Begründung (1 BE)</li><li>$B(6)=34$ m³ (1 BE)</li></ul>` },
          { id: 'MP1-A4b', label: 'b)', be: 2, text: String.raw`Berechnen Sie die Wassermenge im Tank nach 10 Stunden.`,
            nums: [{ label: 'm³', ans: 22, tol: 0.05 }],
            hints: [String.raw`Von $t=6$ bis $t=10$ liegt der Graph unter der Achse: Flächen zählen negativ.`],
            sol: String.raw`<p>$[6;8]$: Dreieck $\tfrac12\cdot2\cdot(-4)=-4$. &nbsp; $[8;10]$: Rechteck $2\cdot(-4)=-8$.</p><p>$B(10)=34-4-8=22$ m³.</p><ul><li>beide Flächen mit Vorzeichen (1 BE)</li><li>$B(10)=22$ m³ (1 BE)</li></ul>` },
          { id: 'MP1-A4c', label: 'c)', be: 2, text: String.raw`Bestimmen Sie den Zeitpunkt, zu dem sich erstmals 25 m³ Wasser im Tank befinden.`,
            nums: [{ label: 't in h', ans: 3.5, tol: 0.02 }],
            hints: [String.raw`Bestand bei $t=2$ und $t=4$ ausrechnen: Zwischen welchen Zeitpunkten wird 25 erreicht?`, String.raw`Dort ist $r=6$ konstant: $B(t)=B(2)+6\,(t-2)$.`],
            sol: String.raw`<p>$B(2)=10+6=16$, $B(4)=16+12=28$. Dazwischen wächst $B$ gleichmäßig mit $r=6$: $16+6\,(t-2)=25\Rightarrow t-2=1{,}5\Rightarrow t=3{,}5$.</p><ul><li>Intervall $[2;4]$ erkannt (1 BE)</li><li>Gleichung und $t=3{,}5$ (1 BE)</li></ul>` }
        ]
      },
      // ------------------------------------------------------------ B1
      {
        id: 'MP1-B1', teil: 'B', topic: 'integral', lesson: 'L6', title: 'Fischbestand in einem See (Tierbestand-Typ)', afb: 'II–III', ops: 'Begründen, Bestimmen, Ermitteln, Erklären',
        fig: { kind: 'fn', f: t => 0.25 * t * (t - 4) * (t - 8), xmin: 0, xmax: 10, ymin: -10, ymax: 32, title: 'g(t) in Fischen pro Jahr' },
        intro: String.raw`<b>Hilfsmittel: GTR/CAS und Formelsammlung.</b><br>Die Änderungsrate des Fischbestands in einem See wird für $0\le t\le10$ ($t$ in Jahren) beschrieben durch $$g(t)=0{,}25\,t\,(t-4)(t-8)\qquad(\text{Fische pro Jahr}).$$ Zu Beginn der Beobachtung ($t=0$) leben 40 Fische im See.`,
        parts: [
          { id: 'MP1-B1a', label: 'a)', be: 3, text: String.raw`Begründen Sie anhand des Graphen von $g$, in welchen Zeiträumen der Fischbestand zu- bzw. abnimmt.`,
            hints: [String.raw`Eine Rate $g>0$ bedeutet: Der Bestand nimmt zu. Wo ist $g$ positiv, wo negativ?`, String.raw`Nullstellen aus der Faktorform ablesen, in jedem Teilintervall einen Testwert einsetzen.`],
            sol: String.raw`<p>Nullstellen: $t=0,\,4,\,8$. Testwerte: $g(2)=0{,}25\cdot2\cdot(-2)(-6)=6>0$, $g(6)=0{,}25\cdot6\cdot2\cdot(-2)=-6<0$, $g(9)=0{,}25\cdot9\cdot5\cdot1=11{,}25>0$.</p><p>$g$ ist die Änderungsrate des Bestands: <b>Zunahme</b> in $(0;4)$ und $(8;10)$, <b>Abnahme</b> in $(4;8)$.</p><ul><li>Nullstellen (1 BE)</li><li>Vorzeichen in den drei Intervallen (1 BE)</li><li>Zusammenhang Rate ↔ Bestand (1 BE)</li></ul>` },
          { id: 'MP1-B1b', label: 'b)', be: 6, text: String.raw`Geben Sie einen Term $B(t)$ für den Fischbestand an. Bestimmen Sie den größten und den kleinsten Fischbestand im Beobachtungszeitraum.`,
            nums: [{ label: 'größter Bestand', ans: 65, tol: 0.1 }, { label: 'kleinster Bestand', ans: 40, tol: 0.1 }],
            hints: [String.raw`$B(t)=B(0)+\int_0^t g(s)\,ds$ – multipliziere $g$ erst aus: $g(t)=0{,}25t^3-3t^2+8t$.`, String.raw`Kandidaten für Extrema von $B$: Nullstellen von $g$ <b>und</b> die Ränder $t=0$ und $t=10$.`, String.raw`Berechne $B$ an allen vier Kandidaten und vergleiche.`],
            sol: String.raw`<p>$g(t)=0{,}25t^3-3t^2+8t$ ⇒ $B(t)=40+\displaystyle\int_0^t g(s)\,ds=40+\tfrac1{16}t^4-t^3+4t^2$.</p><p>Kandidaten: Nullstellen von $g$ ($0,4,8$) und Rand $10$: $B(0)=40$, $B(4)=40+16-64+64=56$, $B(8)=40+256-512+256=40$, $B(10)=40+625-1000+400=65$.</p><p><b>Größter Bestand: 65 Fische bei $t=10$ (Rand!). Kleinster Bestand: 40 Fische (bei $t=0$ und bei $t=8$).</b></p><ul><li>$B(t)$ mit Anfangsbestand (2 BE)</li><li>Kandidaten inkl. Rand (1 BE)</li><li>Werte (2 BE)</li><li>Vergleich und Antwort (1 BE)</li></ul>` },
          { id: 'MP1-B1c', label: 'c)', be: 4, text: String.raw`Ermitteln Sie die größte Zuwachsrate und die stärkste Abnahmerate des Bestands und geben Sie jeweils den Zeitpunkt an.`,
            nums: [{ label: 'größte Rate', ans: 30, tol: 0.05 }, { label: 'stärkste Abnahme', ans: -6.16, tol: 0.03 }],
            hints: [String.raw`Die Rate ist $g$. Extrema von $g$: $g'(t)=0$ lösen.`, String.raw`Randwerte $g(0)$ und $g(10)$ nicht vergessen!`],
            sol: String.raw`<p>$g'(t)=0{,}25\,(3t^2-24t+32)=0\Rightarrow t=4\pm\tfrac43\sqrt3\approx1{,}69;\;6{,}31$.</p><p>$g(1{,}69)\approx6{,}16$ (lokales Maximum), $g(6{,}31)\approx-6{,}16$ (lokales Minimum). Randwerte: $g(0)=0$, $g(10)=0{,}25\cdot10\cdot6\cdot2=30$.</p><p><b>Größte Zuwachsrate: 30 Fische pro Jahr bei $t=10$ (Rand). Stärkste Abnahme: $\approx-6{,}16$ Fische pro Jahr bei $t\approx6{,}31$.</b></p><ul><li>$g'(t)=0$ gelöst (1 BE)</li><li>Werte $\pm6{,}16$ (1 BE)</li><li>Randwerte verglichen (1 BE)</li><li>Antwortsatz (1 BE)</li></ul>` },
          { id: 'MP1-B1d', label: 'd)', be: 4, text: String.raw`Ermitteln Sie die mittlere Änderungsrate des Bestands im Beobachtungszeitraum und den durchschnittlichen Fischbestand.`,
            nums: [{ label: 'mittl. Änderungsrate', ans: 2.5, tol: 0.02 }, { label: 'Ø Bestand', ans: 48.33, tol: 0.1 }],
            hints: [String.raw`Mittlere Änderungsrate $=\dfrac{B(b)-B(a)}{b-a}$.`, String.raw`Durchschnittlicher <b>Bestand</b> = Mittelwert von $B$: $\dfrac1{b-a}\int_a^b B(t)\,dt$ (nicht von $g$!).`],
            sol: String.raw`<p>Mittlere Änderungsrate: $\dfrac{B(10)-B(0)}{10}=\dfrac{65-40}{10}=2{,}5$ Fische pro Jahr.</p><p>Durchschnittlicher Bestand: $\dfrac1{10}\displaystyle\int_0^{10}B(t)\,dt=\dfrac1{10}\Bigl[40t+\tfrac{t^5}{80}-\tfrac{t^4}{4}+\tfrac43t^3\Bigr]_0^{10}=\dfrac{1450/3}{10}=\dfrac{145}{3}\approx48{,}33$ Fische.</p><ul><li>mittlere Änderungsrate 2,5 (2 BE)</li><li>Ansatz Mittelwert von $B$ (1 BE)</li><li>Ergebnis $\approx48{,}33$ (1 BE)</li></ul>` },
          { id: 'MP1-B1e', label: 'e)', be: 3, text: String.raw`Bestimmen Sie alle Zeitpunkte, zu denen genau 50 Fische im See leben, und erklären Sie, warum es mehrere gibt.`,
            nums: [{ label: 't₁', ans: 2.17, tol: 0.03 }, { label: 't₂', ans: 5.83, tol: 0.03 }, { label: 't₃', ans: 9.35, tol: 0.03 }],
            hints: [String.raw`Löse $B(t)=50$ mit dem Rechner (Schnittpunkte von $B$ mit der Geraden $y=50$).`, String.raw`Denke an den Verlauf von $B$: erst steigend, dann fallend, dann wieder steigend.`],
            sol: String.raw`<p>$B(t)=50$ (GTR: Schnittpunkte): $t_1\approx2{,}17$, $t_2\approx5{,}83$, $t_3\approx9{,}35$.</p><p>Begründung: $B$ steigt von 40 auf das lokale Maximum 56 (kreuzt 50 einmal nach oben), fällt auf das lokale Minimum 40 (kreuzt 50 nach unten) und steigt dann bis 65 (kreuzt 50 erneut nach oben). Der Wert 50 liegt zwischen lokalem Minimum und lokalem Maximum ⇒ drei Lösungen.</p><ul><li>Ansatz $B(t)=50$ (1 BE)</li><li>drei Lösungen (1 BE)</li><li>Begründung über den Verlauf (1 BE)</li></ul>` }
        ]
      },
      // ------------------------------------------------------------ B2
      {
        id: 'MP1-B2', teil: 'B', topic: 'schar', lesson: 'L9', title: 'Schar f_k(x) = x·(x − 3k)²', afb: 'II–III', ops: 'Zeigen, Bestimmen, Berechnen',
        intro: String.raw`<b>Hilfsmittel: GTR/CAS und Formelsammlung.</b><br>Gegeben ist die Funktionenschar $f_k$ mit $$f_k(x)=x\,(x-3k)^2,\qquad k>0.$$`,
        parts: [
          { id: 'MP1-B2a', label: 'a)', be: 4, text: String.raw`Zeigen Sie, dass der Graph von $f_k$ den Hochpunkt $H_k(k\,|\,4k^3)$ und den Tiefpunkt $T_k(3k\,|\,0)$ besitzt.`,
            hints: [String.raw`Multipliziere aus: $f_k(x)=x^3-6kx^2+9k^2x$, dann $f_k'$ und $f_k''$ nach $x$.`, String.raw`$f_k'(x)=3x^2-12kx+9k^2=3(x-k)(x-3k)$ – daran liest du die Stellen ab.`],
            sol: String.raw`<p>$f_k'(x)=3x^2-12kx+9k^2=3\,(x-k)(x-3k)=0\Rightarrow x=k$ oder $x=3k$. $f_k''(x)=6x-12k$.</p><p>$f_k''(k)=-6k<0$ ⇒ Hochpunkt, $f_k(k)=k\,(-2k)^2=4k^3$. &nbsp; $f_k''(3k)=6k>0$ ⇒ Tiefpunkt, $f_k(3k)=0$.</p><ul><li>$f_k'$ bestimmt (1 BE)</li><li>Stellen $k$ und $3k$ (1 BE)</li><li>Art der Extrema über $f_k''$ (1 BE)</li><li>$y$-Werte (1 BE)</li></ul>` },
          { id: 'MP1-B2b', label: 'b)', be: 3, text: String.raw`Bestimmen Sie eine Gleichung der Ortskurve der Hochpunkte $H_k$.`,
            hints: [String.raw`Hier gilt $x=k$ – du kannst $k$ direkt durch $x$ ersetzen.`, String.raw`Bereich nicht vergessen: $k>0\Rightarrow x>?$`],
            sol: String.raw`<p>$x=k$ und $y=4k^3$. Einsetzen von $k=x$: $y=4x^3$.</p><p><b>Ortskurve: $y=4x^3$ mit $x>0$</b> (wegen $k>0$).</p><ul><li>$k$ durch $x$ ersetzt (1 BE)</li><li>Gleichung $y=4x^3$ (1 BE)</li><li>Bereich $x>0$ (1 BE)</li></ul>` },
          { id: 'MP1-B2c', label: 'c)', be: 4, text: String.raw`Zeigen Sie, dass $W_k(2k\,|\,2k^3)$ der Wendepunkt des Graphen von $f_k$ ist, und bestimmen Sie die Ortskurve der Wendepunkte.`,
            hints: [String.raw`$f_k''(x)=0$ lösen, dann prüfen, dass es wirklich eine Wendestelle ist ($f_k'''\ne0$).`, String.raw`Ortskurve: $x=2k\Rightarrow k=\frac x2$ in $y=2k^3$ einsetzen.`],
            sol: String.raw`<p>$f_k''(x)=6x-12k=0\Rightarrow x=2k$. $f_k'''(x)=6\neq0$ ⇒ Wendestelle. $f_k(2k)=2k\,(-k)^2=2k^3$ ⇒ $W_k(2k|2k^3)$.</p><p>Ortskurve: $x=2k\Rightarrow k=\frac x2$, $y=2\cdot\frac{x^3}8=\frac14x^3$ ($x>0$).</p><ul><li>$f_k''=0$, $x=2k$ (1 BE)</li><li>$f_k'''\ne0$ bzw. Vorzeichenwechsel, $y=2k^3$ (1 BE)</li><li>$k=\frac x2$ (1 BE)</li><li>$y=\frac14x^3$ (1 BE)</li></ul>` },
          { id: 'MP1-B2d', label: 'd)', be: 5, text: String.raw`Der Graph von $f_k$ schließt im Intervall $[0;3k]$ mit der $x$-Achse eine Fläche ein. Berechnen Sie ihren Inhalt in Abhängigkeit von $k$ und bestimmen Sie $k$ so, dass der Flächeninhalt 108 FE beträgt.`,
            nums: [{ label: 'k', ans: 2, tol: 0.01 }],
            hints: [String.raw`Prüfe zuerst: Hat $f_k$ auf $[0;3k]$ einen Vorzeichenwechsel? ($x\ge0$ und $(x-3k)^2\ge0$.)`, String.raw`Multipliziere aus, integriere nach $x$, setze die Grenzen $0$ und $3k$ ein – $k$ bleibt als Zahl stehen.`, String.raw`Du erhältst $A(k)=c\cdot k^4$. Löse $c\cdot k^4=108$.`],
            sol: String.raw`<p>Auf $[0;3k]$ ist $f_k\ge0$ (Faktor $x\ge0$, Quadrat $\ge0$) ⇒ Flächeninhalt = Integral.</p><p>$A(k)=\displaystyle\int_0^{3k}\bigl(x^3-6kx^2+9k^2x\bigr)dx=\Bigl[\tfrac14x^4-2kx^3+\tfrac92k^2x^2\Bigr]_0^{3k}=\bigl(\tfrac{81}4-54+\tfrac{81}2\bigr)k^4=\tfrac{27}{4}k^4$.</p><p>$\tfrac{27}{4}k^4=108\Rightarrow k^4=16\Rightarrow k=2$ ($k>0$).</p><ul><li>$f_k\ge0$ begründet (1 BE)</li><li>Stammfunktion (1 BE)</li><li>Einsetzen: $A(k)=\tfrac{27}4k^4$ (2 BE)</li><li>$k=2$ (1 BE)</li></ul>` }
        ]
      }
    ]
  };

  // ------------------------------------------------- ZUSATZAUFGABEN (Üben, nur Polynome)
  const EXTRA = [
    {
      id: 'E1', teil: 'A', topic: 'integral', lesson: 'L2', title: 'Aufleiten üben', afb: 'I', ops: 'Bestimmen, Berechnen',
      intro: String.raw`Rezept: Hochzahl $+1$, dann „Zahl vorne : neue Hochzahl“. Jeden Summanden einzeln.`,
      parts: [
        { id: 'E1a', label: 'a)', be: 2, text: String.raw`Bestimmen Sie eine Stammfunktion von $f(x)=6x^2+10x-4$.`,
          hints: [String.raw`$6x^2$: neue Hochzahl 3, $6:3=2$. $10x$: neue Hochzahl 2, $10:2=5$. $-4$ ist $-4x^0$.`],
          sol: String.raw`<p>$F(x)=2x^3+5x^2-4x\;(+c)$. Probe: $F'(x)=6x^2+10x-4$ ✓</p><ul><li>Potenzterme (1 BE)</li><li>Konstante $-4\to-4x$ (1 BE)</li></ul>` },
        { id: 'E1b', label: 'b)', be: 2, text: String.raw`Bestimmen Sie die Stammfunktion $F$ von $f(x)=x^3-2x+7$ mit $F(2)=10$.`,
          nums: [{ label: 'c', ans: -4, tol: 0.01 }],
          hints: [String.raw`$x^3=1\cdot x^3$: neue Hochzahl 4, $1:4$ ⇒ $\tfrac14x^4$.`, String.raw`$F(x)=\tfrac14x^4-x^2+7x+c$; setze $x=2$ ein.`],
          sol: String.raw`<p>$F(x)=\tfrac14x^4-x^2+7x+c$. $F(2)=4-4+14+c=14+c=10\Rightarrow c=-4$.</p><p>$F(x)=\tfrac14x^4-x^2+7x-4$.</p><ul><li>Stammfunktion (1 BE)</li><li>$c=-4$ (1 BE)</li></ul>` },
        { id: 'E1c', label: 'c)', be: 2, text: String.raw`Berechnen Sie $\displaystyle\int_0^2(3x^2-2x+1)\,dx$.`,
          nums: [{ label: 'Wert', ans: 6, tol: 0.01 }],
          hints: [String.raw`$F(x)=x^3-x^2+x$. Dann $F(2)-F(0)$.`],
          sol: String.raw`<p>$F(x)=x^3-x^2+x$. $F(2)=8-4+2=6$, $F(0)=0$ ⇒ Integral $=6$.</p><ul><li>Stammfunktion (1 BE)</li><li>Einsetzen, Ergebnis 6 (1 BE)</li></ul>` }
      ]
    },
    {
      id: 'E2', teil: 'A', topic: 'integral', lesson: 'L4', title: 'Betragsstriche und Flächeninhalt (Parabel)', afb: 'II', ops: 'Berechnen, Bestimmen, Erklären',
      fig: { kind: 'fn', f: x => x * x - 4, xmin: -0.5, xmax: 3.5, ymin: -5, ymax: 6, title: 'f(x) = x² − 4' },
      intro: String.raw`Gegeben ist $f(x)=x^2-4$ auf dem Intervall $[0;3]$.`,
      parts: [
        { id: 'E2a', label: 'a)', be: 2, text: String.raw`Berechnen Sie $\displaystyle\int_0^3 f(x)\,dx$.`,
          nums: [{ label: 'Wert', ans: -3, tol: 0.01 }],
          hints: [String.raw`$F(x)=\tfrac13x^3-4x$ ($x^2$: neue Hochzahl 3, $1:3$).`],
          sol: String.raw`<p>$F(x)=\tfrac13x^3-4x$. $F(3)=9-12=-3$, $F(0)=0$ ⇒ $\int_0^3f\,dx=-3$.</p><ul><li>Stammfunktion (1 BE)</li><li>Ergebnis $-3$ (1 BE)</li></ul>` },
        { id: 'E2b', label: 'b)', be: 3, text: String.raw`Bestimmen Sie den Flächeninhalt, den der Graph von $f$ im Intervall $[0;3]$ mit der $x$-Achse einschließt. Verwenden Sie Betragsstriche.`,
          nums: [{ label: 'Inhalt', ans: 23 / 3, tol: 0.02 }],
          hints: [String.raw`Wo schneidet der Graph die $x$-Achse? $x^2-4=0$.`, String.raw`Zerlege bei $x=2$: $I_1=\int_0^2f$ und $I_2=\int_2^3f$ einzeln. Dann $A=|I_1|+|I_2|$.`],
          sol: String.raw`<p>Nullstelle im Intervall: $x=2$. $I_1=F(2)-F(0)=\tfrac83-8=-\tfrac{16}3$. $I_2=F(3)-F(2)=-3-\bigl(-\tfrac{16}3\bigr)=\tfrac73$.</p><p>$A=\bigl|-\tfrac{16}3\bigr|+\bigl|\tfrac73\bigr|=\tfrac{16}3+\tfrac73=\tfrac{23}3\approx7{,}67$.</p><ul><li>Nullstelle $x=2$, Zerlegung (1 BE)</li><li>$I_1$ und $I_2$ (1 BE)</li><li>Beträge addiert: $\tfrac{23}3$ (1 BE)</li></ul>` },
        { id: 'E2c', label: 'c)', be: 2, text: String.raw`Schreiben Sie den Flächeninhalt aus b) als ein einziges Integral mit Betragsstrichen auf und erklären Sie, warum er größer ist als $|-3|$ aus a).`,
          hints: [String.raw`Betragsstriche gehören um die Funktion: $\int_a^b|f(x)|\,dx$.`, String.raw`Was passiert im Integral mit dem Stück unter der Achse und dem Stück darüber?`],
          sol: String.raw`<p>$A=\displaystyle\int_0^3|x^2-4|\,dx$.</p><p>Beim normalen Integral heben sich das Stück unter der Achse ($-\tfrac{16}3$) und das Stück darüber ($+\tfrac73$) teilweise auf: $-\tfrac{16}3+\tfrac73=-3$. Beim Flächeninhalt zählen beide Stücke positiv: $\tfrac{16}3+\tfrac73=\tfrac{23}3>3$.</p><ul><li>Schreibweise $\int_0^3|f|\,dx$ (1 BE)</li><li>Begründung „Aufheben vs. alles positiv“ (1 BE)</li></ul>` }
      ]
    },
    {
      id: 'E3', teil: 'A', topic: 'integral', lesson: 'L4', title: 'Integral 0, aber Fläche nicht 0', afb: 'II', ops: 'Bestimmen, Berechnen, Begründen',
      fig: { kind: 'fn', f: x => x * x * x - 3 * x * x + 2 * x, xmin: -0.5, xmax: 2.5, ymin: -1, ymax: 1, title: 'f(x) = x³ − 3x² + 2x' },
      intro: String.raw`Gegeben ist $f(x)=x^3-3x^2+2x$.`,
      parts: [
        { id: 'E3a', label: 'a)', be: 2, text: String.raw`Bestimmen Sie die Nullstellen von $f$.`,
          hints: [String.raw`Klammere $x$ aus: $f(x)=x\,(x^2-3x+2)$.`, String.raw`$x^2-3x+2=(x-1)(x-2)$.`],
          sol: String.raw`<p>$f(x)=x(x^2-3x+2)=x(x-1)(x-2)$ ⇒ $x=0$, $x=1$, $x=2$.</p><ul><li>Ausklammern (1 BE)</li><li>drei Nullstellen (1 BE)</li></ul>` },
        { id: 'E3b', label: 'b)', be: 2, text: String.raw`Berechnen Sie $\displaystyle\int_0^2 f(x)\,dx$.`,
          nums: [{ label: 'Wert', ans: 0, tol: 0.01 }],
          hints: [String.raw`$F(x)=\tfrac14x^4-x^3+x^2$.`],
          sol: String.raw`<p>$F(x)=\tfrac14x^4-x^3+x^2$. $F(2)=4-8+4=0$, $F(0)=0$ ⇒ Integral $=0$.</p><ul><li>Stammfunktion (1 BE)</li><li>Ergebnis 0 (1 BE)</li></ul>` },
        { id: 'E3c', label: 'c)', be: 3, text: String.raw`Bestimmen Sie den Flächeninhalt, den der Graph von $f$ im Intervall $[0;2]$ mit der $x$-Achse einschließt, und erklären Sie den Unterschied zu b).`,
          nums: [{ label: 'Inhalt', ans: 0.5, tol: 0.01 }],
          hints: [String.raw`Die Nullstelle $x=1$ liegt im Intervall: zerlege in $[0;1]$ und $[1;2]$.`, String.raw`$A=|I_1|+|I_2|$ – Betragsstriche um jedes Teilergebnis einzeln.`],
          sol: String.raw`<p>$I_1=F(1)-F(0)=\tfrac14$. $I_2=F(2)-F(1)=0-\tfrac14=-\tfrac14$.</p><p>$A=\bigl|\tfrac14\bigr|+\bigl|-\tfrac14\bigr|=\tfrac12$.</p><p>Bei b) heben sich die gleich großen Stücke über und unter der Achse auf (Integral 0). Der Flächeninhalt zählt beide Stücke positiv: $\tfrac12$.</p><ul><li>Zerlegung an $x=1$ (1 BE)</li><li>$I_1$, $I_2$ und Beträge, $A=\tfrac12$ (1 BE)</li><li>Erklärung (1 BE)</li></ul>` }
      ]
    }
  ];

  // -------------------------------------------------------------- SPICKZETTEL
  const SPICK = String.raw`
<div class="mt-grid2">
<div class="mt-card"><h3>① Aufleiten</h3>
<p><b>1.</b> Hochzahl $+1$. &nbsp; <b>2.</b> Zahl vorne : neue Hochzahl. &nbsp; <b>3.</b> Jeden Summanden einzeln.</p>
<div class="mt-scroll"><table class="mt-table"><tr><th>$f(x)$</th><th>$F(x)$</th></tr>
<tr><td>$6x^2$</td><td>$2x^3$ &nbsp;($6:3$)</td></tr>
<tr><td>$8x^3$</td><td>$2x^4$ &nbsp;($8:4$)</td></tr>
<tr><td>$x^2$</td><td>$\frac13x^3$</td></tr>
<tr><td>$2x$ &nbsp;(= $2x^1$)</td><td>$x^2$</td></tr>
<tr><td>$3$ &nbsp;(= $3x^0$)</td><td>$3x$</td></tr></table></div>
<p><b>Probe:</b> ableiten. &nbsp; <b>Mit Punkt:</b> $+c$, Punkt einsetzen.</p></div>

<div class="mt-card"><h3>② Integral</h3>
<p>$\displaystyle\int_a^b f\,dx=F(b)-F(a)$ &nbsp; (Klammern!)</p>
<p>Tauschen: $\int_a^b=-\int_b^a$ · Zerlegen: $\int_a^b=\int_a^c+\int_c^b$</p>
<p>Gerade: $\int_{-a}^a=2\int_0^a$ · Ungerade: $\int_{-a}^a=0$</p>
<p>Mittelwert: $\dfrac1{b-a}\displaystyle\int_a^b f\,dx$</p></div>

<div class="mt-card"><h3>③ Fläche</h3>
<p><b>Zur Achse:</b> Nullstellen → zerlegen → <b>Betragsstriche um jedes Stück einzeln</b>, addieren: $A=|I_1|+|I_2|$.</p>
<p>Kurz: $A=\int_a^b|f(x)|\,dx$ (Rechner: abs).</p>
<p>$|-5|=5$ · $|3-8|=5$ · $-|-3|=-3$ · $|4+(-4)|=0$ aber $|4|+|-4|=8$.</p>
<p><b>Zwischen Graphen:</b> Schnittstellen → oben minus unten.</p>
<p>Integral kann negativ / 0 sein, <b>Flächeninhalt nie</b>.</p></div>

<div class="mt-card"><h3>④ Graph $f$ ↔ $F$</h3>
<div class="mt-scroll"><table class="mt-table"><tr><th>bei $f$</th><th>bei $F$</th></tr>
<tr><td>$f>0$ / $f<0$</td><td>steigt / fällt</td></tr>
<tr><td>Nullst. $+\to-$</td><td>Hochpunkt</td></tr>
<tr><td>Nullst. $-\to+$</td><td>Tiefpunkt</td></tr>
<tr><td>Extremum von $f$</td><td>Wendepunkt</td></tr></table></div></div>
</div>

<div class="mt-card"><h3>⑤ Bestandsaufgaben: Frage → Werkzeug</h3>
<div class="mt-scroll"><table class="mt-table"><tr><th>Frage</th><th>Werkzeug</th></tr>
<tr><td>Wann Zu-/Abnahme?</td><td>Nullstellen von $f$, Vorzeichen in jedem Intervall</td></tr>
<tr><td>Bestandsfunktion</td><td>$B(t)=B(0)+\int_0^t f(s)\,ds$</td></tr>
<tr><td>Größter / kleinster <b>Bestand</b></td><td>Nullstellen von $f$ <b>+ Ränder</b>, $B$ ausrechnen, vergleichen</td></tr>
<tr><td>Größte / kleinste <b>Rate</b></td><td>$f'(t)=0$ <b>+ Randwerte</b> von $f$</td></tr>
<tr><td>Mittlere Änderungsrate</td><td>$\frac{B(b)-B(a)}{b-a}$</td></tr>
<tr><td>Durchschnittlicher Bestand</td><td>$\frac1{b-a}\int_a^b B\,dt$</td></tr>
<tr><td>Bestand $=X$ (mit Rechner)</td><td>$B(t)=X$, Schnittpunkte; mehrere Lösungen möglich</td></tr>
<tr><td>Fläche $A(u)$ maximal</td><td>$A'(u)=0$, Randwerte, Antwortsatz</td></tr></table></div></div>

<div class="mt-grid2">
<div class="mt-card"><h3>⑥ Schar-Check</h3>
<ol><li>Ausklammern / Faktorform</li><li>Nullstellen, Symmetrie</li><li>Ableiten <b>nur nach $x$</b></li><li>$f_k'=0$ (ausklammern!), $f_k''$ prüfen</li><li>$y$ mit $f_k$ ausrechnen</li><li>Bedingung an $k$ beachten</li></ol></div>

<div class="mt-card"><h3>⑦ Ortskurve in 4 Schritten</h3>
<ol><li>$x=\dots k\dots$ und $y=\dots k\dots$</li><li>$x$-Gleichung nach $k$ auflösen</li><li>In $y$ einsetzen ($k$ verschwindet)</li><li>Bereich + Probe</li></ol>
<p>Hochbehälter: $x=c\,k\Rightarrow k=\frac xc$.</p></div>
</div>

<div class="mt-card"><h3>⑧ Bedingung → Gleichung</h3>
<div class="mt-scroll"><table class="mt-table"><tr><th>Text</th><th>Gleichung</th></tr>
<tr><td>Punkt $P(x_0|y_0)$ auf dem Graphen</td><td>$f(x_0)=y_0$</td></tr>
<tr><td>Extremstelle bei $x_0$ / waagerechte Tangente</td><td>$f'(x_0)=0$</td></tr>
<tr><td>Wendestelle bei $x_0$</td><td>$f''(x_0)=0$</td></tr>
<tr><td>Tangente mit Steigung $m$ bei $x_0$</td><td>$f'(x_0)=m$</td></tr>
<tr><td>Nullstelle bei $x_0$ / berührt die Achse</td><td>$f(x_0)=0$ / zusätzlich $f'(x_0)=0$</td></tr>
<tr><td>Punkt-/Achsensymmetrie</td><td>nur ungerade / nur gerade Potenzen</td></tr></table></div></div>

<div class="mt-card"><h3>⑨ Klausur-Taktik</h3>
<ul>
<li><b>Zuerst alles überfliegen</b>, leichte Teilaufgaben zuerst (Punkte sichern).</li>
<li>Teil A: exakte Werte (Brüche stehen lassen), kurz begründen. Kein Rechner!</li>
<li>Teil B: <b>Ansatz hinschreiben</b>, dann Rechner; immer <b>Antwortsatz mit Einheit</b>.</li>
<li>„Zeigen“ = jeden Schritt aufschreiben. „Begründen“ = ein Argument in Worten.</li>
<li>Bei Extrema: <b>Randwerte</b> prüfen! Bei Schar: $k>0$ beachten.</li>
<li>Zeit: etwa 1,5 min pro BE. Nichts offen lassen – Ansatz bringt Punkte.</li>
</ul></div>
`;

  return { LESSONS, EXAM1, EXTRA, SPICK };
})();
