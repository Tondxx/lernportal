/* ==========================================================================
   POLITIK-WIRTSCHAFT gA (pw25-Hf) · Lektionen, Aufgaben, Probeklausur, Spickzettel
   für Klausur 2 (12.1) am Di 17.11.2026 (k-11): THEMA MEDIEN
   Quelle: Stichpunkte von Tonda (16.11.2026): Mediennutzung, Funktionen von Medien (vierte Gewalt, Agenda-Setting),
   Unterrichtsbeispiel „Podcast“: Antisemitismus-Thema werde bei der Linken von den Medien stärker behandelt als bei CDU und AfD.
   Operatoren laut Tonda: Zusammenfassen/Wiedergeben (AFB I), Erklären/Erläutern (AFB II), Erörtern/Stellung nehmen (AFB III).
   Auf IServ gibt es für PW kein Material (Gruppe „Abi28 pw25“ leer, Stand 16.11.2026).
   Alle Texte, Beispiele und Aufgaben sind EIGEN, Fachwissen allgemein. Erfundene Übungszahlen sind als solche gekennzeichnet.
   UNSICHER: echte Zahlen zur Mediennutzung, Titel/Sprecher des Podcasts, Schreibweise der Lehrkraft (Hf), Länge der Klausur.
   Lektion: { id, fach, num, min, title, short, idee, bild, rezept[], beispiel{q,steps[{h,t}]}, fehler[], test[{q,a}] }
   Aufgabe: { id, fach, teil ('A' Wiedergeben/Erklären | 'B' Erörtern), lesson, title, afb, ops, intro, parts[{id,label,be,text,hints,sol}] }
   ========================================================================== */
(function () {
  const F = 'politik';
  const list = items => `<ul>${items.map(i => `<li>${i}</li>`).join('')}</ul>`;
  const tab = (head, rows) => `<div class="ic-tabw"><table class="ic-tab"><thead><tr>${head.map(h => `<th>${h}</th>`).join('')}</tr></thead><tbody>${rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
  const merke = (h, t) => `<div class="mt-call"><div class="mt-call-h">${h}</div>${t}</div>`;
  const achtung = (h, t) => `<div class="mt-call warn"><div class="mt-call-h">${h}</div>${t}</div>`;

  const PODCAST = 'Im Unterricht wurde ein Podcast gehört. Nach diesem Podcast behandeln die Medien das Thema Antisemitismus bei der Linken deutlich stärker als bei CDU und AfD.';

  const LESSONS = [
    // ---------------------------------------------------------------- 1 Mediennutzung
    {
      id: 'PW1', fach: F, num: 1, min: 8,
      title: 'Mediennutzung: Wer nutzt was, wie lange?',
      short: 'Nutzungszeit, Altersunterschiede, Trend zu digital, Folgen',
      idee: `<p>Bei <b>Mediennutzung</b> geht es um drei Fragen: <b>Welche</b> Medien nutzen Menschen, <b>wie lange</b> und <b>wofür</b> (Information, Unterhaltung, Kontakt)?</p>
${tab(['Aussage', 'Kurz erklärt'], [
        ['Nutzungszeit', 'Menschen verbringen <b>mehrere Stunden pro Tag</b> mit Medien. Konkrete Minutenwerte stehen immer in der Statistik der Aufgabe: <b>nicht auswendig lernen</b>.'],
        ['Altersunterschied', 'Jüngere: Smartphone, Internet, Social Media, Streaming. Ältere: Fernsehen, Radio, Tageszeitung.'],
        ['Trend', 'Weg von klassischen Medien (Print, lineares Fernsehen) hin zu <b>digitalen, mobilen</b> Angeboten, die man jederzeit abruft.'],
        ['Folgen', 'Algorithmen wählen Inhalte aus (<b>Filterblase</b>, <b>Echokammer</b>); Aufmerksamkeit wird knapp; Falschinformationen verbreiten sich schnell.']
      ])}
${achtung('Zahlen', '<p>Echte Zahlen kennst du nicht sicher (UNSICHER). In der Klausur stehen sie in der <b>Statistik oder Grafik</b>. Deine Aufgabe ist, sie <b>zu beschreiben</b>, nicht zu kennen.</p>')}`,
      bild: `<p>Denk an einen Tag: Wecker am Handy, Nachrichten beim Frühstück, Musik unterwegs, Videos am Abend. Zusammengezählt sind das viele Stunden. Der Tag ist voller Medien, nur die <b>Kanäle</b> haben sich verschoben: weg von Zeitung und Fernseher, hin zum Smartphone.</p>`,
      rezept: [
        `<b>Thema und Quelle nennen:</b> „Die Grafik zeigt die tägliche Nutzungsdauer von … nach Altersgruppen (Quelle, Jahr).“`,
        `<b>Größten und kleinsten Wert</b> mit Zahl angeben.`,
        `<b>Unterschiede zwischen Gruppen</b> oder die <b>Entwicklung über die Zeit</b> beschreiben.`,
        `<b>Keine Wertung</b> und keine Begründung (das wäre Erklären oder Erörtern).`
      ],
      beispiel: {
        q: `<b>Übungsbeispiel, Zahlen frei erfunden (nicht echt):</b> Eine Grafik zeigt die tägliche Nutzungsdauer von Medien. Altersgruppe 14 bis 29: 5 Stunden, davon die meiste Zeit Smartphone und soziale Medien. Altersgruppe ab 60: 4 Stunden, davon die meiste Zeit Fernsehen und Radio. Fasse die Grafik zusammen.`,
        steps: [
          { h: 'Thema und Quelle', t: `<p>„Die Grafik (erfundene Übungszahlen) zeigt die tägliche Mediennutzung zweier Altersgruppen.“</p>` },
          { h: 'Werte', t: `<p>„Die Gruppe 14 bis 29 nutzt Medien am längsten (5 Stunden), die Gruppe ab 60 vier Stunden.“</p>` },
          { h: 'Unterschied', t: `<p>„Die Jüngeren nutzen vor allem Smartphone und soziale Medien, die Älteren Fernsehen und Radio.“</p>` },
          { h: 'Kein Urteil', t: `<p>Nicht schreiben: „Das ist schlecht für die Jugend.“ Das ist eine Wertung und gehört nicht zum Zusammenfassen.</p>` }
        ]
      },
      fehler: [
        `Zahlen aus dem Kopf nennen, die nicht in der Aufgabe stehen. <b>Besser:</b> nur Zahlen aus dem Material.`,
        `Beim Zusammenfassen werten („erschreckend“, „zu viel“). <b>Das ist AFB III.</b>`,
        `Nur Zahlen aufzählen, ohne den Unterschied zu sagen. <b>Immer vergleichen.</b>`
      ],
      test: [
        { q: 'Welche drei Fragen klärt „Mediennutzung“?', a: 'Welche Medien, wie lange, wofür (Information, Unterhaltung, Kontakt).' },
        { q: 'Welcher Unterschied besteht typischerweise zwischen Jüngeren und Älteren?', a: 'Jüngere: Smartphone, Internet, Social Media, Streaming. Ältere: eher Fernsehen, Radio, Tageszeitung.' },
        { q: 'Was heißt Filterblase?', a: 'Algorithmen zeigen vor allem Inhalte, die zu den bisherigen Interessen passen; abweichende Sichtweisen kommen seltener vor.' },
        { q: 'Was darf ein „Zusammenfassen“ nicht enthalten?', a: 'Keine Wertung und keine eigene Meinung, nur Kernaussagen aus dem Material.' }
      ]
    },

    // ---------------------------------------------------------------- 2 Funktionen und vierte Gewalt
    {
      id: 'PW2', fach: F, num: 2, min: 10,
      title: 'Funktionen von Medien und die „vierte Gewalt“',
      short: 'Information, Meinungsbildung, Kontrolle, Forum, Bildung, Unterhaltung; Art. 5 GG',
      idee: `<p>Medien haben in der Demokratie mehrere <b>Funktionen</b>:</p>
${tab(['Funktion', 'Kurz erklärt'], [
        ['<b>Information</b>', 'Fakten über Politik, Wirtschaft und Gesellschaft liefern.'],
        ['<b>Meinungsbildung / Orientierung</b>', 'Einordnen, kommentieren, Standpunkte und Debatten zeigen.'],
        ['<b>Kritik und Kontrolle</b>', 'Missstände aufdecken, Mächtige kontrollieren: die <b>vierte Gewalt</b>.'],
        ['<b>Artikulation / Forum</b>', 'Bürger, Parteien und Verbände kommen zu Wort.'],
        ['<b>Bildung / Sozialisation</b>', 'Wissen, Werte und politische Kultur vermitteln.'],
        ['<b>Unterhaltung</b>', 'Entspannung; sichert auch Reichweite.']
      ])}
<h3>Medien als vierte Gewalt</h3>
<ul>
<li><b>Drei Gewalten:</b> Legislative (Parlament), Exekutive (Regierung), Judikative (Gerichte).</li>
<li>Die Medien sind <b>keine Gewalt im Staatsrecht</b>: Sie beschließen keine Gesetze und sprechen kein Recht. Sie sind eine <b>zusätzliche Kontrollinstanz</b> der Öffentlichkeit.</li>
<li><b>Wie:</b> recherchieren, veröffentlichen, kritisieren, Öffentlichkeit herstellen.</li>
<li><b>Grundlage:</b> Art. 5 GG: Meinungs-, Presse- und Rundfunkfreiheit, „Eine Zensur findet nicht statt.“</li>
</ul>`,
      bild: `<p>Drei Gewalten sind wie drei Schiedsrichter, die sich gegenseitig beobachten. Die Medien sitzen auf der <b>Tribüne</b> mit Kamera: Sie dürfen nichts entscheiden, aber sie zeigen allen, was auf dem Platz passiert. Das hält die Schiedsrichter ehrlich.</p>`,
      rezept: [
        `<b>Funktion nennen</b> (z. B. Kritik und Kontrolle).`,
        `<b>Erklären:</b> Was tun die Medien dabei konkret? (recherchieren, aufdecken, veröffentlichen)`,
        `<b>Wirkung:</b> Warum ist das für die Demokratie wichtig? (Macht wird sichtbar und kontrolliert)`,
        `<b>Beispiel oder Grundlage:</b> Pressefreiheit Art. 5 GG, ein aufgedeckter Skandal.`
      ],
      beispiel: {
        q: `Erläutern Sie, warum die Medien als „vierte Gewalt“ bezeichnet werden.`,
        steps: [
          { h: 'Begriff', t: `<p>Neben Legislative, Exekutive und Judikative nennt man die Medien „vierte Gewalt“, <b>weil</b> sie das Handeln der Mächtigen beobachten und kritisieren.</p>` },
          { h: 'Erklären', t: `<p>Sie recherchieren, decken Missstände auf und stellen Öffentlichkeit her. <b>Dadurch</b> können Bürger Entscheidungen beurteilen.</p>` },
          { h: 'Grenze', t: `<p>Die Medien haben aber <b>keine staatliche Macht</b>: Sie entscheiden nichts, ihre Wirkung beruht auf Öffentlichkeit.</p>` },
          { h: 'Beleg', t: `<p>Grundlage ist die Pressefreiheit (Art. 5 GG). Beispiel: Eine Recherche zu einem Skandal führt zu einer öffentlichen Debatte.</p>` }
        ]
      },
      fehler: [
        `Schreiben, die Medien seien „die vierte Gewalt im Grundgesetz“. <b>Falsch:</b> Das Grundgesetz kennt drei Gewalten; „vierte Gewalt“ ist ein Bild.`,
        `Funktionen nur aufzählen. Bei „Erklären“ gehört zu jeder genannten Funktion ein „weil“ oder „dadurch“.`,
        `Kontrolle mit Zensur verwechseln. Zensur ist staatlich und verboten (Art. 5 GG).`
      ],
      test: [
        { q: 'Nenne sechs Funktionen der Medien.', a: 'Information, Meinungsbildung/Orientierung, Kritik und Kontrolle, Artikulation/Forum, Bildung/Sozialisation, Unterhaltung.' },
        { q: 'Warum sind die Medien keine „echte“ Gewalt?', a: 'Sie haben keine staatliche Macht: keine Gesetzgebung, keine Regierung, keine Rechtsprechung. Sie wirken durch Öffentlichkeit und Kritik.' },
        { q: 'Welche Gewalten gibt es im Staat?', a: 'Legislative, Exekutive, Judikative.' },
        { q: 'Welcher Artikel sichert die Pressefreiheit?', a: 'Art. 5 Grundgesetz (Meinungs-, Presse-, Rundfunkfreiheit; keine Zensur).' },
        { q: 'Welche Voraussetzungen braucht die Kontrollfunktion?', a: 'Unabhängigkeit vom Staat und von Eigentümern, Vielfalt, saubere Recherche.' }
      ]
    },

    // ---------------------------------------------------------------- 3 Agenda-Setting
    {
      id: 'PW3', fach: F, num: 3, min: 10,
      title: 'Agenda-Setting am Beispiel des Podcasts',
      short: 'Worüber wir nachdenken; Gatekeeping, Framing; Linke, CDU, AfD',
      idee: `<p><b>Agenda-Setting</b> heißt: Medien bestimmen nicht, <b>was</b> wir denken, aber <b>worüber</b> wir nachdenken. Themen, über die oft und prominent berichtet wird, halten Menschen für wichtig (Studie von McCombs und Shaw, 1972).</p>
${tab(['Begriff', 'Bedeutung'], [
        ['<b>Agenda</b>', 'Liste der Themen, die gerade öffentlich wichtig sind.'],
        ['<b>Gatekeeping</b>', 'Redaktionen wählen aus, was berichtet wird und was nicht (Tor).'],
        ['<b>Gewichtung</b>', 'Wie oft, wie groß, wie lange und an welcher Stelle berichtet wird.'],
        ['<b>Framing</b>', 'Der Rahmen: aus welchem Blickwinkel und mit welchen Worten ein Thema erzählt wird.']
      ])}
<h3>Das Beispiel aus dem Unterricht</h3>
<p>${PODCAST}</p>
${list([
        '<b>Agenda-Setting:</b> Die Medien gewichten das Thema bei den Parteien unterschiedlich. Dadurch wirkt es bei der Linken größer und wichtiger.',
        '<b>Wirkung:</b> Das Publikum hält das Problem bei der Linken für größer als bei CDU und AfD, obwohl auch dort Vorwürfe vorkommen können.',
        '<b>Verbindung zur vierten Gewalt:</b> Kontrolle ist Aufgabe der Medien. Wenn sie aber <b>ungleich</b> hinschauen, kann das die Agenda verzerren und Ausgewogenheit verletzen.',
        '<b>Auch Politik setzt Agenda:</b> Parteien versuchen selbst, Themen in die Medien zu bringen (Pressemitteilungen, Aktionen, Social Media).'
      ])}
${achtung('So schreibst du es', '<p>Immer <b>„laut dem Podcast“</b> oder <b>„der Podcast kritisiert, dass“</b>. Es ist die Position des Podcasts, keine bewiesene Tatsache. Titel, Sprecher und Zahlen nur nennen, wenn du sie sicher aus dem Unterricht kennst.</p>')}`,
      bild: `<p>Die Medien halten eine <b>Taschenlampe</b> in einen dunklen Raum. Was im Lichtkegel steht, hält man für wichtig. Was im Dunkeln bleibt, vergisst man. Wohin die Lampe zeigt, bestimmt die Agenda. Zeigt sie bei einer Partei oft auf dasselbe Thema und bei einer anderen selten, entsteht ein ungleiches Bild.</p>`,
      rezept: [
        `<b>Definieren:</b> Agenda-Setting = Medien bestimmen, worüber gesprochen wird.`,
        `<b>Mechanismus:</b> auswählen (Gatekeeping), gewichten (Häufigkeit, Platz), rahmen (Framing).`,
        `<b>Auf das Beispiel anwenden:</b> „Laut Podcast wird das Thema bei der Linken stärker behandelt als bei CDU und AfD.“`,
        `<b>Wirkung benennen:</b> Das Publikum hält das Thema bei der Linken für wichtiger.`
      ],
      beispiel: {
        q: `Erklären Sie das Phänomen Agenda-Setting am Beispiel des Podcasts. (${PODCAST})`,
        steps: [
          { h: 'Definition', t: `<p>Agenda-Setting bedeutet, dass die Medien durch Auswahl und Gewichtung bestimmen, <b>worüber</b> die Öffentlichkeit nachdenkt.</p>` },
          { h: 'Anwendung', t: `<p>Laut dem Podcast berichten die Medien über Antisemitismus bei der Linken <b>häufiger und stärker</b> als bei CDU und AfD.</p>` },
          { h: 'Wirkung', t: `<p><b>Dadurch</b> entsteht der Eindruck, das Problem sei bei der Linken größer, auch wenn es bei anderen Parteien ähnliche Vorwürfe geben kann.</p>` },
          { h: 'Einordnung', t: `<p>Die Medien setzen so die Agenda: Sie lenken Aufmerksamkeit auf eine Partei und beeinflussen, wie Wähler sie wahrnehmen.</p>` }
        ]
      },
      fehler: [
        `Den Podcast als <b>bewiesene Tatsache</b> darstellen. Richtig: „laut Podcast“.`,
        `„Medien sagen uns, was wir denken sollen.“ <b>Falsch:</b> Agenda-Setting betrifft das <b>Worüber</b>, nicht das Was.`,
        `Nur das Beispiel erzählen und die <b>Definition</b> vergessen.`,
        `Schon beim Erklären <b>urteilen</b> („das ist unfair“). Das gehört in die Stellungnahme (AFB III).`
      ],
      test: [
        { q: 'Was ist Agenda-Setting in einem Satz?', a: 'Medien bestimmen nicht, was wir denken, aber worüber wir nachdenken, indem sie Themen auswählen und gewichten.' },
        { q: 'Was bedeuten Gatekeeping und Framing?', a: 'Gatekeeping: Redaktionen wählen aus, was berichtet wird. Framing: Blickwinkel und Wortwahl, mit denen ein Thema erzählt wird.' },
        { q: 'Was sagt der Podcast aus dem Unterricht?', a: 'Das Antisemitismus-Thema wird von den Medien bei der Linken stärker behandelt als bei CDU und AfD.' },
        { q: 'Wie hängt das Beispiel mit der vierten Gewalt zusammen?', a: 'Kontrolle gehört zur Aufgabe der Medien, aber ungleiche Gewichtung kann Themen verzerren und der Ausgewogenheit widersprechen.' },
        { q: 'Wie formulierst du die Aussage des Podcasts richtig?', a: 'Mit „laut dem Podcast“ oder „der Podcast kritisiert“, nicht als feststehende Tatsache.' }
      ]
    },

    // ---------------------------------------------------------------- 4 Operatoren
    {
      id: 'PW4', fach: F, num: 4, min: 8,
      title: 'Operatoren: Zusammenfassen, Erklären, Erörtern',
      short: 'Was jeder Operator verlangt, Aufbau, Notfall-Stellungnahme',
      idee: `${tab(['Operator', 'AFB', 'Was verlangt wird', 'Aufbau'], [
        ['<b>Zusammenfassen / Wiedergeben</b>', 'I', 'Kernaussagen kurz, in eigenen Worten, <b>ohne Wertung</b>', 'Quelle nennen, Konjunktiv („Der Autor beschreibt …“), Reihenfolge des Textes'],
        ['<b>Erklären</b>', 'II', 'Sachverhalt verständlich machen: <b>Ursache und Wirkung</b>', 'Begriff → Zusammenhang mit „weil“ / „dadurch“ → Beispiel'],
        ['<b>Erläutern</b>', 'II', 'Erklären <b>und mit Beispiel belegen</b>', 'wie Erklären, das Beispiel ist Pflicht'],
        ['<b>Erörtern / Stellung nehmen</b>', 'III', 'Pro und Contra abwägen, <b>begründetes Urteil</b>', 'These → Pro → Contra → Fazit']
      ])}
${merke('Du schreibst keine volle Erörterung', '<p>Dann sichere dir die Punkte von AFB I und II ab und schreibe bei einer Stellungnahme wenigstens die <b>4 Sätze</b> unten. Eine leere Stelle gibt 0 Punkte.</p>')}
<h3>Notfall: Stellungnahme in 4 Sätzen</h3>
${list([
        '<b>Position:</b> „Ich bin der Auffassung, dass …“',
        '<b>Pro-Argument mit Beleg</b> (Beispiel).',
        '<b>Contra-Argument mit Beleg</b> (Beispiel).',
        '<b>Fazit:</b> Abwägung, warum meine Position überzeugt.'
      ])}`,
      bild: `<p>Die Operatoren sind wie <b>drei Stufen</b>: erst <b>sagen, was da steht</b> (Zusammenfassen), dann <b>sagen, warum es so ist</b> (Erklären), dann <b>sagen, was ich davon halte</b> (Erörtern).</p>`,
      rezept: [
        `<b>Operator markieren</b> (zusammenfassen, erklären, erörtern).`,
        `<b>Zusammenfassen:</b> nur Inhalt, kein Urteil, Konjunktiv.`,
        `<b>Erklären:</b> immer „weil“ / „dadurch“, kein bloßes Aufzählen.`,
        `<b>Erörtern:</b> mindestens ein Pro, ein Contra, ein Fazit.`
      ],
      beispiel: {
        q: `Nimm Stellung: „Die Medien erfüllen ihre Aufgabe als vierte Gewalt vollständig.“ (Notfall-Form, 4 Sätze)`,
        steps: [
          { h: 'Position', t: `<p>„Ich bin der Auffassung, dass die Medien ihre Aufgabe als vierte Gewalt <b>nur teilweise</b> erfüllen.“</p>` },
          { h: 'Pro', t: `<p>„Einerseits decken sie Missstände auf und stellen Öffentlichkeit her; die Pressefreiheit (Art. 5 GG) ermöglicht das.“</p>` },
          { h: 'Contra', t: `<p>„Andererseits können Auswahl und Gewichtung (Agenda-Setting) Themen verzerren, wie der Podcast bei der Berichterstattung über Parteien kritisiert.“</p>` },
          { h: 'Fazit', t: `<p>„Deshalb ist Kontrolle durch die Medien wichtig, braucht aber Vielfalt und Ausgewogenheit; Bürger sollten verschiedene Quellen nutzen.“</p>` }
        ]
      },
      fehler: [
        `Beim Zusammenfassen schon werten.`,
        `Beim Erklären nur Begriffe aneinanderreihen, ohne „weil“.`,
        `Bei der Stellungnahme nur Pro <b>oder</b> nur Contra schreiben, ohne Fazit.`,
        `Operator überlesen und etwas anderes beantworten.`
      ],
      test: [
        { q: 'Was unterscheidet Erklären von Erläutern?', a: 'Beide machen Zusammenhänge verständlich; Erläutern verlangt zusätzlich ein Beispiel als Beleg.' },
        { q: 'Welcher AFB gehört zu „Zusammenfassen“, „Erklären“, „Erörtern“?', a: 'Zusammenfassen: I. Erklären/Erläutern: II. Erörtern/Stellung nehmen: III.' },
        { q: 'Welche vier Bausteine hat die Notfall-Stellungnahme?', a: 'Position, Pro mit Beleg, Contra mit Beleg, Fazit.' },
        { q: 'Welche Wörter zeigen einen Zusammenhang beim Erklären?', a: '„weil“, „dadurch“, „deshalb“, „führt zu“.' }
      ]
    }
  ];

  // ======================================================================
  // AUFGABEN (eigene)
  // ======================================================================
  const TASKS = [
    {
      id: 'PWT1', fach: F, teil: 'A', lesson: 'PW1', title: 'Eine Statistik zusammenfassen', afb: 'I', ops: 'Zusammenfassen, Wiedergeben',
      intro: `<b>Übungstext, Zahlen frei erfunden (nicht echt):</b> „Eine Befragung zeigt: Menschen zwischen 14 und 29 Jahren nutzen Medien täglich etwa 5 Stunden, vor allem Smartphone und soziale Medien. Menschen ab 60 Jahren nutzen Medien etwa 4 Stunden, vor allem Fernsehen und Radio. Tageszeitungen werden von den Jüngeren kaum genutzt.“`,
      parts: [
        { id: 'PWT1a', label: 'a)', be: 6, text: 'Fassen Sie die Kernaussagen der Befragung zusammen.',
          hints: ['Thema nennen, dann beide Altersgruppen mit Zahl, dann den Unterschied. Keine Wertung.'],
          sol: `<p>Beispiel: „Die Befragung untersucht die tägliche Mediennutzung zweier Altersgruppen. Die Gruppe von 14 bis 29 Jahren nutzt Medien etwa fünf Stunden, vor allem Smartphone und soziale Medien. Die Gruppe ab 60 Jahren nutzt sie etwa vier Stunden, vor allem Fernsehen und Radio. Tageszeitungen spielen bei den Jüngeren kaum eine Rolle.“</p>${list(['Thema/Quelle genannt (1 BE)', 'Jüngere mit Zahl und Medien (2 BE)', 'Ältere mit Zahl und Medien (2 BE)', 'Unterschied/Zeitung, keine Wertung (1 BE)'])}` }
      ]
    },
    {
      id: 'PWT2', fach: F, teil: 'A', lesson: 'PW2', title: 'Funktionen der Medien', afb: 'I/II', ops: 'Nennen, Erklären',
      intro: `Medien spielen in der Demokratie eine wichtige Rolle.`,
      parts: [
        { id: 'PWT2a', label: 'a)', be: 3, text: 'Nennen Sie drei Funktionen von Medien.',
          sol: `<p>Information, Meinungsbildung/Orientierung, Kritik und Kontrolle (auch: Forum, Bildung, Unterhaltung).</p>${list(['je Funktion 1 BE'])}` },
        { id: 'PWT2b', label: 'b)', be: 6, text: 'Erklären Sie zwei dieser Funktionen.',
          hints: ['Zu jeder Funktion: Was tun Medien konkret? Warum ist das wichtig? Schreibe „weil“ oder „dadurch“.'],
          sol: `<p>Beispiel: „Die <b>Informationsfunktion</b> bedeutet, dass Medien Fakten über Politik und Gesellschaft liefern. <b>Dadurch</b> können Bürger sich ein Bild machen und informiert wählen. Die <b>Kontrollfunktion</b> bedeutet, dass Medien Missstände aufdecken. <b>Dadurch</b> werden Mächtige sichtbar kontrolliert.“</p>${list(['je Funktion: Bedeutung (1 BE) und Wirkung (2 BE)'])}` }
      ]
    },
    {
      id: 'PWT3', fach: F, teil: 'A', lesson: 'PW2', title: 'Die vierte Gewalt', afb: 'II', ops: 'Erläutern',
      intro: `Medien werden oft als „vierte Gewalt“ bezeichnet.`,
      parts: [
        { id: 'PWT3a', label: 'a)', be: 8, text: 'Erläutern Sie, warum die Medien als „vierte Gewalt“ bezeichnet werden.',
          hints: ['Gewaltenteilung nennen, dann was Medien tun, dann Grenze (keine staatliche Macht), dann Beleg (Art. 5 GG oder ein Beispiel).'],
          sol: `<p>Beispiel: „Die drei Gewalten sind Legislative, Exekutive und Judikative. Die Medien heißen ‚vierte Gewalt‘, <b>weil</b> sie das Handeln dieser Gewalten beobachten, kritisieren und Missstände öffentlich machen. <b>Dadurch</b> können Bürger Entscheidungen beurteilen. Die Medien haben aber keine staatliche Macht und entscheiden nichts. Ihre Wirkung beruht auf Öffentlichkeit und der Pressefreiheit (Art. 5 GG). Ein Beispiel ist eine Recherche, die einen Skandal aufdeckt und eine Debatte auslöst.“</p>${list(['drei Gewalten (1 BE)', 'Medien kontrollieren/kritisieren (2 BE)', 'Wirkung: Öffentlichkeit, Bürger urteilen (2 BE)', 'Grenze: keine staatliche Macht (1 BE)', 'Beleg: Art. 5 GG oder Beispiel (2 BE)'])}` }
      ]
    },
    {
      id: 'PWT4', fach: F, teil: 'A', lesson: 'PW3', title: 'Agenda-Setting am Podcast', afb: 'II', ops: 'Erklären, Erläutern',
      intro: PODCAST,
      parts: [
        { id: 'PWT4a', label: 'a)', be: 3, text: 'Geben Sie die Kernaussage des Podcasts wieder.',
          sol: `<p>„Laut dem Podcast wird das Thema Antisemitismus bei der Linken von den Medien deutlich stärker behandelt als bei CDU und AfD.“</p>${list(['Thema (1 BE)', 'Vergleich der Parteien (1 BE)', 'Formulierung „laut Podcast“ (1 BE)'])}` },
        { id: 'PWT4b', label: 'b)', be: 7, text: 'Erklären Sie, inwiefern es sich um Agenda-Setting handelt.',
          hints: ['Definition (worüber, nicht was). Dann Auswahl und Gewichtung. Dann Wirkung auf das Publikum.'],
          sol: `<p>Beispiel: „Agenda-Setting bedeutet, dass Medien bestimmen, worüber die Öffentlichkeit nachdenkt, indem sie Themen auswählen und gewichten. Nach dem Podcast gewichten die Medien das Antisemitismus-Thema bei der Linken stärker als bei CDU und AfD. <b>Dadurch</b> entsteht der Eindruck, das Problem sei bei der Linken größer und wichtiger. Die Medien lenken so die Aufmerksamkeit auf eine Partei und beeinflussen, wie Wähler sie wahrnehmen.“</p>${list(['Definition mit „worüber“ (2 BE)', 'Auswahl/Gewichtung (2 BE)', 'Anwendung auf den Podcast (2 BE)', 'Wirkung auf das Publikum (1 BE)'])}` },
        { id: 'PWT4c', label: 'c)', be: 4, text: 'Erläutern Sie den Begriff Framing und nennen Sie ein Beispiel.',
          sol: `<p>Framing bedeutet, dass ein Thema durch Blickwinkel und Wortwahl in einen bestimmten Rahmen gesetzt wird. Beispiel: Wird eine Partei in der Berichterstattung immer wieder im Zusammenhang mit Vorwürfen genannt, entsteht ein Rahmen, in dem sie vor allem als Problemfall erscheint.</p>${list(['Definition (2 BE)', 'Beispiel (2 BE)'])}` }
      ]
    },
    {
      id: 'PWT5', fach: F, teil: 'B', lesson: 'PW4', title: 'Stellung nehmen: Medien und Kontrolle', afb: 'III', ops: 'Stellung nehmen, Erörtern',
      intro: `${PODCAST} Die Medien sagen, sie müssten als vierte Gewalt kritisch auf alle Parteien schauen, besonders auf solche mit Machtanspruch.`,
      parts: [
        { id: 'PWT5a', label: 'a)', be: 10, text: 'Nehmen Sie Stellung: „Die Medien erfüllen ihre Aufgabe als vierte Gewalt, auch wenn sie Parteien unterschiedlich stark kritisieren.“ (Wenn wenig Zeit: 4 Sätze, siehe Lektion 4.)',
          hints: ['Position. Pro mit Beleg. Contra mit Beleg. Fazit.'],
          sol: `<p><b>Erwartungshorizont (Kernpunkte, eigene Lösung, nicht amtlich):</b></p>${list([
            '<b>Pro:</b> Kontrolle ist ihre Aufgabe; Berichterstattung folgt dem <b>Nachrichtenwert</b> (Aktualität, Konflikt, Bedeutung der Partei). Wer Macht anstrebt, wird stärker beobachtet.',
            '<b>Contra:</b> Ungleiche Gewichtung kann die Agenda verzerren (Podcast). Ausgewogenheit und Vielfalt gehören zur Rolle der Medien; einseitiger Fokus schadet dem Vertrauen.',
            '<b>Fazit:</b> begründet gewichten. Beide Seiten sind plausibel; entscheidend ist, ob die Maßstäbe für alle Parteien gleich sind. Bürger sollten verschiedene Quellen nutzen.',
            'BE: Position (2), Pro mit Beleg (3), Contra mit Beleg (3), Fazit/Abwägung (2).'
          ])}<p class="dim">Je nach Standpunkt sind verschiedene Urteile möglich, wenn sie begründet sind.</p>` }
      ]
    }
  ];

  // ======================================================================
  // PROBEKLAUSUR und SPICKZETTEL
  // ======================================================================
  const PROBES = [
    { id: 'PWP1', fach: F, titel: 'Probeklausur Politik 1: Medien (Kurzform)', tasks: ['PWT1', 'PWT2', 'PWT3', 'PWT4', 'PWT5'], minuten: 45 }
  ];

  const SPICK = `<h3>Mediennutzung</h3>
<ul><li>Mehrere Stunden pro Tag; Zahlen nur aus der Statistik der Aufgabe.</li><li>Jüngere: Smartphone, Social Media, Streaming. Ältere: Fernsehen, Radio, Tageszeitung. Trend: digital und mobil.</li><li>Folgen: Filterblase, Echokammer, knappe Aufmerksamkeit, Falschinformationen.</li></ul>
<h3>Funktionen der Medien</h3>
<ul><li>Information · Meinungsbildung/Orientierung · <b>Kritik und Kontrolle</b> · Artikulation/Forum · Bildung/Sozialisation · Unterhaltung.</li></ul>
<h3>Vierte Gewalt</h3>
<ul><li>Gewalten: Legislative, Exekutive, Judikative. Medien = zusätzliche Kontrolle durch Öffentlichkeit, <b>keine staatliche Gewalt</b>.</li><li>Grundlage: Art. 5 GG (Meinungs-, Presse-, Rundfunkfreiheit, keine Zensur).</li><li>Voraussetzung: Unabhängigkeit, Vielfalt, saubere Recherche.</li></ul>
<h3>Agenda-Setting</h3>
<ul><li>Medien bestimmen nicht, <b>was</b> wir denken, aber <b>worüber</b> wir nachdenken (McCombs/Shaw 1972).</li><li>Gatekeeping (auswählen) · Gewichtung (Häufigkeit, Platz) · Framing (Blickwinkel, Wortwahl).</li><li><b>Podcast (Unterricht):</b> Antisemitismus-Thema wird bei der Linken stärker behandelt als bei CDU und AfD. Immer „laut Podcast“.</li><li>Politik setzt auch Agenda (Pressemitteilungen, Social Media).</li></ul>
<h3>Operatoren</h3>
<ul><li><b>Zusammenfassen/Wiedergeben (I):</b> Kernaussagen, eigene Worte, keine Wertung, Konjunktiv.</li><li><b>Erklären (II):</b> Zusammenhang mit „weil/dadurch“. <b>Erläutern (II):</b> Erklären + Beispiel.</li><li><b>Erörtern/Stellung nehmen (III):</b> Position, Pro, Contra, Fazit.</li></ul>
<h3>Notfall-Stellungnahme (4 Sätze)</h3>
<ul><li>Position · Pro mit Beleg · Contra mit Beleg · Fazit.</li></ul>`;

  window.LR_LESSONS = (window.LR_LESSONS || []).concat(LESSONS);
  window.LR_TASKS = (window.LR_TASKS || []).concat(TASKS);
  window.LR_PROBES = (window.LR_PROBES || []).concat(PROBES);
  window.LR_SPICK = Object.assign(window.LR_SPICK || {}, { politik: SPICK });
})();
