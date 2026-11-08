# Lernraum – Design & Struktur (Prototyp)

Stand: 2026-11-08 · Ort: `Portal/neu/` (läuft unter `/neu/`; **seit S8 die Startseite**, `/` leitet hierher weiter, das alte Portal liegt unter `/alt/`)

## Warum ein Prototyp
Das alte Portal besteht aus ~800 KB gewachsener Fach-Skripte mit Inline-Styles. Farben austauschen reicht nicht. Deshalb: **erst Designsystem + Struktur + Bildschirm-Typen sauber bauen** (mit echten Daten), dann Fach für Fach übertragen. Der Prototyp ist schon die neue Basis, kein Wegwerfmodell.

## Informationsarchitektur (wo ist was)
Drei Hauptbereiche, überall gleich:

| Bereich | Frage, die er beantwortet | Inhalt |
|---|---|---|
| **Heute** | Was mache ich jetzt? | nächste Klausur (Tage), „Weiter lernen“, Unterricht heute/nächster Schultag, nächste Termine |
| **Fächer** | Wo lerne ich was? | alle Fächer, sortiert nach nächster Klausur |
| **Plan** | Wann ist was? | Klausuren (12.1 / 12.2 / geschrieben), Stundenplan (A/B-Woche) |

> **UMGESETZT in S3b (07.11.): `struktur.js`.** Die Reiter unten gibt es nicht mehr.
>
> **NEUE STRUKTUR (Tonda, 07.11., verbindlich: `../../Portalplan.md` Abschnitt 8a, Bauschritt S3b).** Die drei Reiter unten (Lernpfad/Üben/Klausur) sind **überholt**, sobald S3b gebaut ist. Dann gilt: **Fach → Ordner → (Unterordner) → Thema**, pro Bildschirm eine Ebene, höchstens 6 Kacheln, Brotkrumen oben; Fach-Seite = Kopf + **Klausur-Filter** (Klausur antippen → nur klausurrelevante Ordner) + Ordner-Kacheln + Knopf „Lernplan“; Reiter **Plan** = Lernplan · Klausuren · Stundenplan; „In den Plan“-Knopf an Ordner, Thema, Übung.

Jedes **Fach** hat (bis S3b) genau drei Reiter, in jedem Fach identisch:
1. **Lernpfad** – Lektionen in fester Reihenfolge (Linie mit Stationen: offen · nächste · verstanden)
2. **Üben** – Aufgaben (Teil A/B), Tipp-Leiter, Zahlenprüfung, Musterlösung, ehrliche Selbstbewertung
3. **Klausur** – nächster Termin, was noch fehlt, Spickzettel (später: Probeklausur mit Uhr, Fehlerliste)

Jede **Lektion** hat dieselben Seiten: Idee → Rezept → Beispiel → Typische Fehler → Selbsttest → Fertig. Eine Seite = ein Gedanke = ein Bildschirm.

Material (IServ, Uploads, Mitschriften) kommt als vierter Reiter **Material** mit drei klaren Ordnern: *Aus dem Unterricht*, *Eigene Mitschriften*, *Abitur-Aufgaben*.

## Gestaltungsregeln
- **Text ohne Kästen.** Struktur durch Größe, Gewicht, Abstand. Hinweise bekommen nur eine feine Linie + Etikett (Idee, Achtung, Ortskurve), keine gefüllten Blasen.
- **Lesbarkeit:** 17–19,5 px, Zeilenhöhe 1,78, max. 66 Zeichen Breite, Formeln groß und zentriert.
- **Keine Emojis.** Eigener Linien-Icon-Satz (SVG-Sprite in `index.html`), Fächer als Kürzel-Kachel (MA, PH …).
- **Farbe nur mit Bedeutung:** Fachfarbe (`--subj`) für Streifen/Ring/Stationen; Limette (`--accent`) nur für die eine Hauptaktion; grün = geschafft, gelb = Achtung, rot = dringend.
- **Mobil zuerst:** Handy = Tab-Leiste unten (Daumenzone), Lektionen im Vollbild mit festem „Weiter“-Knopf, Wischen links/rechts. iPad hochkant = schmale Icon-Schiene. iPad quer/Laptop = Seitenleiste, in Lektionen zusätzlich Gliederung links. Touch-Ziele ≥ 44–52 px.
- **Bewegung erklärt etwas:** Ringe und Balken füllen sich, Tage zählen hoch, Tab-Markierung gleitet mit Feder, Seiten schieben in Leserichtung, Lösungen klappen auf, Karteikarten drehen sich, Rezeptschritte haken sich ab. Respektiert „Bewegung reduzieren“.
- Hell und Dunkel, folgt dem Gerät, umschaltbar.

## Dateien
| Datei | Zweck |
|---|---|
| `index.html` | Shell, Icon-Sprite, lädt die echten Datenquellen des Portals |
| `ds.css` | Das Designsystem (Tokens, Shell, Komponenten, Reader, Motion) |
| `app.js` | Router (`#/`, `#/faecher`, `#/fach/<id>/<reiter>`, `#/lektion/<id>`, `#/aufgabe/<id>`, `#/plan`), alle Ansichten, Reader, Demos |
| `data.js` | Fächer + Themenlisten, per Skript aus `../main_hub.js` erzeugt (ohne Emojis) |
| `core.js` | Profile, Ereignis-Liste, Berechnung von Streak/Ring/Kalender (Portalplan 10.2/11.1); Tests in `tests/core.test.js` |
| `treppe.js` | Lerntreppe: Übersicht `#/thema/<id>`, Eingangs-Check `#/thema/<id>/check`, Stufen `#/thema/<id>/<0–5>` |
| `content/*.js` | Lerninhalte (`window.LR_TOPICS`), geprüft mit `tests/tasks.test.js` |
| `suche.js`, `python.js` + `py-sandbox.html`, `skript.js` | S8: Suche (Strg+K), Python-Werkstatt (`#/python`), Durchgehen (`#/skript/<fach>`, druckbar) |
| gelesen aus dem Portal | `../calendar.js` (Klausuren), `../timetable.js` (Stundenplan), `../mathe_trainer_content.js` (11 Lektionen, Probeklausur, Spickzettel) |

Fortschritt (seit S1, 07.11.): pro Profil `lr:st:<id>` (Lektionen verstanden, Selbstbewertung, Antworten) und `lr:ev:<id>` (Ereignisse). Das erste Profil übernimmt `neu_state_v1` und verstandene Lektionen aus `mt_state_v1`.

## Was echt ist, was noch fehlt
Echt und funktionsfähig: Heute, Fächer, Plan (Klausuren + Stundenplan), Mathe-Lernpfad mit allen 11 Lektionen, Reader mit 2 interaktiven Demos (Bestand ↔ Rate, Schar ↔ Ortskurve), Üben mit 9 Aufgaben inkl. Graphen, Tipps, Zahlenprüfung, Selbstbewertung, Spickzettel.
Noch nicht übertragen: Probeklausur mit Uhr, Aufgaben aus Modul 06/07 (`integral_kurs.js`, `schar_kurs.js`), alle Inhalte von Physik/Informatik/Politik/…, IServ, Uploads, Fehlerliste, Kalender-Detailseite. Andere Fächer zeigen ihren Lernpfad aus `data.js` und verweisen auf das alte Portal.

> **Hinweis (07.11.2026):** Maßgeblich ist jetzt `../../Portalplan.md` (Lerntreppe, Rechenweg-Engine, Papier-Checkpoints, Ziel-Ring/Streak, Zeitplan). Der Übertragungsplan unten ist die ältere Fassung; bei Widerspruch gilt Portalplan.md.

## Übertragungsplan (effizienteste Reihenfolge)
1. **Feedback zum Prototyp** (Handy + iPad ausprobieren) → Anpassungen nur in `ds.css`/`app.js`.
2. **Mathe vollständig**: Probeklausur-Modus, Aufgaben aus Modul 06/07 in dasselbe Aufgabenformat (`TASKS`), Fehlerliste.
3. **Einheitliches Inhaltsformat** für alle Fächer: `unit = { id, titel, kurz, min, idee, bild, rezept[], beispiel{q,steps[]}, fehler[], test[], aufgaben[] }`. Mathe hat es bereits; für Physik/Informatik/Politik werden die bestehenden Module (Skripte mit eigenem Rendering) in dieses Format umgeschrieben und die Simulationen als Demo-Bausteine (`demo: '<name>'`) eingehängt.
4. **Material-Reiter + IServ**: Dateien/Aufgaben aus dem lokalen Server in die drei Ordner.
5. **Umschalten** ✓ (S8, 08.11.2026): `index.html` leitet auf `neu/` weiter, das alte Portal liegt unter `alt/` (mit `<base href="../">`).
