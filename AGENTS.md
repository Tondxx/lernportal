# AGENTS.md – Lernportal (Website)

Zuerst `../AGENTS.md` lesen (Gesamtregeln). Diese Datei gilt zusätzlich für alles in `Portal/`.

## Zweck
Das Portal ist **der** Ort, an dem Tonda lernt und Aufgaben bearbeitet. Ziel: möglichst effektives Lernen. Die KI soll hier in dieser Reihenfolge helfen:
1. **Aufgaben erstellen** (passend zu Stoff, Schwäche und nächster Klausur)
2. **IServ anbinden** (Aufgaben/Dateien der Kurse holen, in Lernaufgaben umwandeln)
3. **Visuell erklären** (Simulationen, Diagramme, Schritt-für-Schritt-Animationen)
4. **Erklären und abfragen** (Active Recall, Rückmeldung, Fehler analysieren)

## Regel: Aufgaben leben nur im Portal
Aufgaben werden **nicht** als Markdown in `Faecher/*/03_Aufgaben/` bearbeitet, sondern im Portal erstellt, gelöst und ausgewertet. `Faecher/*/` hält nur Material, Notizen, Themenstand und Fehlerlisten. Aufgaben-Quelltext gehört in die Fach-JS-Dateien (siehe unten).

## Technik
- Reines Frontend: `index.html` + JS-Dateien, KaTeX lokal (`katex.min.js/css`), kein Build-Framework. Läuft lokal und per GitHub Pages (`.nojekyll`).
- Start: `start.bat` → `python server.py` → http://localhost:8000 (Port über Umgebungsvariable `PORT` änderbar, z. B. für Vorschau-Tools)
- `server.py`: statische Dateien + API (`/api/iserv/*`, `/api/save-notes`, `/api/load-notes`).
- `iserv_bridge.py`: IServ-Client. Zugangsdaten **nur** in `.env` (Vorlage `.env.example`). `.env` nie lesen, ausgeben, committen oder kopieren.
- `bundle.py`: baut aus `index.html` + allen JS/CSS die Einzeldatei `tonda-oberstufe.html` (offline nutzbar). Nach Änderungen ausführen.
- Persistenz im Browser: IndexedDB `LernportalUserDB` (`user_content.js`), LocalStorage für Journal/Fortschritt.

## Wo liegt was
| Datei | Inhalt |
|---|---|
| `main_hub.js` | Start/Dashboard, `FAECHER_DATA` (alle Fächer + Themen), Navigation, Theme |
| `physik.js`, `informatik.js`, `integralrechnung.js`, `politik.js`, `seminarfach.js` | Fach-Module (Aufgaben, Erklärungen) |
| `parts/` | Teile des Physik-Moduls (Ordner, Skills, UI-Renderer, `simulations.js` = Canvas-Simulationen) |
| `schar.js`, `matching.js` | Mathe: Kurvenscharen, Zuordnungsaufgaben |
| `integral_kurs.js` (Modul 06), `schar_kurs.js` (Modul 07) | Mathe: „Integralrechnung komplett“ und „Funktionsscharen & Ortskurven“ mit Erklärung, interaktiven Demos, Teil-A/B-Aufgaben (Daten-Objekte `TASKS_A/B` mit `parts`, `sol`, `nums`, `fig`), Auswertung. `integral_kurs.js` stellt `window.IKLib` bereit (Mathe-Rendering, Aufgaben-Engine, Fortschritt in localStorage `ik_progress_v1`); weitere Module registrieren sich mit `IKLib.register(...)`. |
| `mathe_trainer.js`, `mathe_trainer_content.js`, `mathe_trainer.css` | **Mathe-Klausurtrainer (Modul 00, Einstieg für Mathe):** Tabs Start/Verstehen/Üben/Probeklausur/Spickzettel. Inhalte (Lektionen `LESSONS`, Probeklausur `EXAM1`, `SPICK`) in `mathe_trainer_content.js` (`window.MT_DATA`); nutzt `IKLib` und die Aufgaben aus Modul 06/07 (Fortschritt `ik_progress_v1`), eigener Zustand in `mt_state_v1`. Eigenes Design nur unter `.mt-app` (Vorlage für spätere Fach-Redesigns). Neue Probeklausur = weiteres Objekt wie `EXAM1`. |
| `data/private/mathe_antworten.json` | **Antworten des Nutzers aus dem Mathe-Trainer** (Textfelder, Zahlenfelder, Selbstbewertung, Probeklausur-Status), vom Server (`/api/mathe-answers`) geschrieben, privat/nicht in Git. **Zum Korrigieren lesen:** je Eintrag `aufgabe`, `frage`, `notiz` (Lösungsweg), `zahlen`; Musterlösungen stehen in `mathe_trainer_content.js` bzw. `integral_kurs.js`/`schar_kurs.js`. Läuft kein Server, liegen die Daten nur im Browser (Button „Antworten exportieren“ im Reiter Üben). |
| `katex-fonts.css` | KaTeX-Schriften von jsDelivr (lokaler `fonts/`-Ordner fehlt); offline Ersatzschrift. |
| `calendar.js`, `timetable.js`, `steckbrief.js` | Kalender, Stundenplan, Steckbrief |
| `user_content.js` | Upload/Ablage eigener Mitschriften |
| `neu/core.js` | **Kern des Lernraums (S1):** Profile (pro Person getrennte Daten), Ereignis-Liste pro Profil (`lr:ev:<profil>` in localStorage: learn/recall/practice/fix), daraus berechnet: Streak mit Schutz (1 Tag/Woche), Ziel-Ring (Abruf 3 · Neu 1 · Fehler 1), Kalender. Kein DOM, Tests: `node neu/tests/core.test.js`. **Streak/Ring nie speichern, immer aus Ereignissen berechnen.** Ereignis `blurt` zählt als voller Abruf-Block (3), `extra` als „Neu“. |
| `neu/treppe.js`, `neu/content/*.js` | **Lerntreppe (S2):** 6 Stufen pro Thema (Sehen, Nachvollziehen, Ergänzen, Gerüst, Abi-Aufgabe, Mix), Rechenweg-Darstellung (Schiene mit Schritten, BE, Ergebnis umrahmt mit `
es{…}`, CAS-Zeile, „Warum?“), Checkpoints (Zahlen eintippen), Selbstkorrektur am Erwartungshorizont → Notenpunkte, Fehlertyp, Sicherheit 1–3. Inhalte als `window.LR_TOPICS` in `neu/content/` (Format: Portalplan Abschnitt 6). **Neue Inhalte immer mit `node neu/tests/tasks.test.js` prüfen und Zahlen mit sympy nachrechnen** (Beispiel `neu/tests/demo_check.py`). `content/demo.js` ist nur ein Demo-Thema. |
| `neu/extras.js`, `neu/algo.js`, `neu/content/demo-algo.js` | **Besondere Übungen (S3):** je Thema optional `topic.extras.{blurting, fehler, erlaeutern, deuten}` (Format: siehe `content/demo.js`; Routen `#/thema/<id>/blurting|fehler|erlaeutern|deuten`, in der Treppen-Übersicht als „Besondere Übungen“). Blurting = Timer + Kernpunkte-Checkliste → Ereignis `blurt` (füllt das Abruf-Segment). Fehler finden / Erläutern / Deuten → Ereignis `extra {topic,kind,pct}`; Erläutern nutzt die Selbstkorrektur (Kernpunkte, BE). **Notation:** `algo.js` beschreibt einen Algorithmus einmal als Baum (`LRAlgo.A.do/if/each/while/out/ret`) und erzeugt daraus Struktogramm, Pseudocode und Python (Tippen markiert dieselbe Stelle in allen drei); Seite `#/algo/<id>`, Inhalte in `LR_ALGOS`. Pseudocode-Schreibweise ist UNSICHER (nicht mit der Lehrkraft abgeglichen). „Frag Claude“ (`treppe.js`, `bindAsk`) kopiert Aufgabe + Eingaben + Fehlertypen in die Zwischenablage (Ausweich-Fenster, falls das Gerät es verbietet). Tests: `node neu/tests/tasks.test.js` (prüft auch `extras`), `node neu/tests/algo.test.js` (führt den erzeugten Python-Code aus), Zahlen: `python neu/tests/demo_check.py`. |
| `neu/wiederholen.js` | **Wiederholen (S4):** Abruf aus der Wiederholungs-Queue (`LR.cards` in `core.js`, Abstände 1–3–7–21–50–120 Tage, falsch → morgen, mehrfach am selben Tag zählt einmal), **Fehlerjagd** `#/fehlerjagd` + `#/jagd/<ref>` (vorgemerkte Fehler aus der Selbstkorrektur/Blurting kommen nach 1 Tag wieder, „sicher, aber falsch“ sofort; Ereignis `hunt` {ok}; behoben = 2× an verschiedenen Tagen richtig; `LR.mistakes`), **Sessions** `#/session` (Mini 3/10/20, Fokusblock 60/90 mit Phasen, Uhr über Zeitstempel, Uhr-Chip in der Kopfzeile, Ende mit „Das kannst du jetzt“ + „Morgen starte ich bei …“). Neue Fehler-Quellen in `mistakeIndex()` eintragen. |
| `neu/ueberblick.js`, `neu/replay.js` | **Überblick (S5):** Wissenslandkarte `#/karte/<fach>` (Ordner als Linie mit Stationen; Status aus Ereignissen: offen/begonnen/unsicher/sicher, sicher = 3 richtige Abrufe an 3 Tagen bzw. Treppe Stufe 4+5 ≥ 80 %; verblasst nach 7/21 Tagen ohne Wiederholung; Knopf auf der Fach-Seite), Trainings-Kalender `#/verlauf` (26 Wochen + Zahlen, Link „Ganzer Kalender“ auf Heute). **Rechenweg-Replay** `LRReplay.open(ctx, part, meta)`: Lösungsweg baut sich Zeile für Zeile auf (aligned/array-Zeilen einzeln), Abspielen/Pause/Zurück/Weiter, Tasten ← → Leertaste Esc; Knöpfe in Stufe 1 und im Erwartungshorizont. Tests: `node neu/tests/replay.test.js`. |
| `neu/struktur.js`, `neu/plan.js`, `neu/content/ordner.js`, `neu/content/plaene.js` | **Struktur & Lernplan (S3b, Portalplan 8a):** `ordner.js` = Ordner-Baum je Fach (`LR_ORDNER`: Fach → Ordner → Unterordner → Thema, max. 6 Kacheln pro Ebene; Vorbelegung „klausurrelevant“ über `klausuren: [Klausur-Id aus calendar.js]`); `plaene.js` = **geteilte Lernpläne** (`LR_PLANS`, nur Reihenfolge der Einheiten, für alle Profile mit diesem Kurs sichtbar; Datum/Tagesverteilung rechnet das Portal aus „heute“ + Klausurtermin + gewählter Lernzeit); `plan.js` = reine Logik (`LRPlan.effective/schedule/makeProbe`, Tests `node neu/tests/plan.test.js`); `struktur.js` = Ansichten Fach-Seite, Ordner, Klausur-Filter (pro Profil: `state.kfilter`, `state.rel`), Lernplan-Reiter, Plan-Assistent, Probeklausur (Zustand `probes`, `probeRun`, `probeScores`, `probeDone`). Lernplan-Änderungen sind Ereignisse `plan` (`add/remove/next/done/undone`), Probeklausur-Ergebnis Ereignis `probe`. **Neuer Fachinhalt = Eintrag in `ordner.js` + (auf Wunsch) Plan in `plaene.js`; danach `node neu/tests/struktur.test.js` (prüft alle Verweise, Klausur-Ids, 6-Kacheln-Regel).** Der Fach-Reiter „Üben“ gibt es nicht mehr: Aufgaben hängen über `lesson` an den Themen-Ordnern. |
| `neu/` | **Prototyp der neuen Oberfläche „Lernraum“** (eigene Struktur, mobil/iPad-first, ohne Emojis). Läuft unter `/neu/`, nutzt echte Daten aus `calendar.js`, `timetable.js`, `mathe_trainer_content.js`. Konzept, IA und Übertragungsplan: `neu/DESIGN.md`. **Vor jeder Design-Arbeit lesen.** Ziel: Fach für Fach hierher übertragen, dann `neu/` zur Startseite machen. |
| `style.css` | Basis-Design (Layout, Komponenten) |
| `design2.css` | **Aktuelles Design „Aurora Study“** – wird zuletzt geladen und überschreibt Tokens/Karten/Nav/Hero/Mathe-Trainer (Glas, Aurora-Hintergrund, Fachfarben per `--subj`). Neues Aussehen bitte hier ändern, nicht in `style.css`. Fächerfarbe kommt aus `FAECHER_DATA[...].color` (`--subj`), Klausurfarbe aus `calendar.js` (`--hero-color`). |
| `data/private/` | **Privat, nicht in Git:** `iserv_files/` (IServ-Downloads), `meine_mitschriften.json` |
| `iserv_tasks.json` | IServ-Aufgaben-Cache (nicht in Git) |

Fächer im Portal: Mathe eA, Physik eA, Informatik eA, Politik-Wirtschaft gA, Deutsch gA, Englisch gA, Geschichte gA, Darstellendes Spiel, Sport gA, Seminarfach (KI). Entsprechende Ordner in `../Faecher/`.

## Arbeitsregeln für KIs
- **Erst lesen, dann ändern.** Neue Aufgaben/Erklärungen im Stil der vorhandenen Fach-Module bauen (Datenstruktur und Renderer des jeweiligen Fachs wiederverwenden).
- **Quelle zuerst:** Aufgaben aus dem echten Stoff ableiten (`data/private/iserv_files/`, `../Faecher/<Fach>/01_Material/`, `Meds.pdf` für Physik). Nichts erfinden; Unsicheres markieren.
- **Mathe/Physik immer mit Lösungsweg**, Zahlenwerte nachrechnen. Formeln mit KaTeX.
- **Visuell vor Text:** Wo möglich Canvas-Simulation, SVG oder Schritt-für-Schritt-Animation statt langer Erklärtexte.
- **Cache-Busting:** Wird eine JS/CSS-Datei geändert, den `?v=…`-Parameter in `index.html` anpassen.
- **Testen:** Nach Änderungen Server starten und im Browser prüfen (Konsole ohne Fehler, Aufgabe löst sich, Formeln rendern).
- **Datenschutz:** `.env`, `data/private/` und `iserv_*.json` nie ins Git, in Logs oder in Chat-Ausgaben.
- **Nach jeder Änderung:** Eintrag in `../Lernlog.md`, Themenstand im Fach-README anpassen.

## Abitur-Aufgaben als Vorlage (nur lokal, nie im Portal)
Für Mathe, Physik und Informatik liegen offizielle Zentralabitur-Aufgaben samt Erwartungshorizonten lokal unter `../Faecher/<Fach>/01_Material/abitur-niedersachsen/`; Profil und Aufgabenformat in `../Faecher/<Fach>/04_Klausurvorbereitung/abi-niveau.md`. Im Portal entstehen **nur eigene neue Aufgaben** im Abi-Stil („angelehnt an Zentralabitur Niedersachsen <Jahr>“, mit BE/AFB und eigenem Erwartungshorizont, als „nicht offizielle Lösung“ gekennzeichnet). Das Portal-Repo ist öffentlich: **keine Originalaufgaben und keine leicht abgewandelten Kopien** dort ablegen.

## GitHub: alles landet automatisch dort
- Remote: `https://github.com/Tondxx/lernportal.git` (Branch `main`, **öffentlich**, GitHub Pages: https://tondxx.github.io/lernportal/). Alles, was nicht in der `.gitignore` steht, ist damit öffentlich sichtbar – keine privaten Inhalte ins Portal legen.
- **Claude:** Hooks in `~/.claude/settings.json` führen nach jeder Datei-Änderung im Portal und am Ende jeder Antwort `../_tools/autopush.ps1` aus (bundle → commit → push).
- **Alle anderen KIs (Codex, Gemini, Cursor …):** Nach jeder Änderung im Portal selbst ausführen: `powershell -NoProfile -ExecutionPolicy Bypass -File C:\Users\beutl\Lernen\_tools\autopush.ps1 -Manual`
- Das Skript bricht ab, wenn Privates (`.env`, `data/private`, IServ-Dateien/-Cache, Mitschriften) in den Änderungen auftaucht, und schreibt `../_tools/autopush.log`. Bei „FEHLER" im Log: Ursache beheben, nicht umgehen.
- Git liegt unter `C:\Program Files\Git\cmd\git.exe` (nicht im PATH jeder Shell).

## Verbindlicher Gesamtplan
**`../Portalplan.md` lesen, bevor du am Portal arbeitest** (Lerntreppe mit 6 Stufen, Aufgabenformat mit `schritte`/`checkpoints`, Rechenweg-Stilguide je Fach, Papier-Checkpoints, Wiederholungs-Queue, Ziel-Ring/Streak, Startseite „nächster Schritt“, Zeitplan). Er hat Vorrang vor `neu/DESIGN.md` (Übertragungsplan) und der folgenden Ideenliste. Die Datei liegt außerhalb von `Portal/` und geht nicht nach GitHub.

## Offene Verbesserungen (Ideen, überholt durch `../Portalplan.md`)
- Aufgaben-Generator: einheitliches Aufgabenformat (Thema, Schwierigkeit, Lösungsweg, Bewertung) für alle Fächer.
- Fortschrittsspeicher, der in `../Faecher/*/README.md` zurückgespiegelt wird (damit KIs den Lernstand kennen).
- IServ-Aufgaben automatisch mit Kalender und Klausurplan verknüpfen.
