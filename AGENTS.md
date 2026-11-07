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
- Start: `start.bat` → `python server.py` → http://localhost:8000
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

## Offene Verbesserungen (Ideen)
- Aufgaben-Generator: einheitliches Aufgabenformat (Thema, Schwierigkeit, Lösungsweg, Bewertung) für alle Fächer.
- Fortschrittsspeicher, der in `../Faecher/*/README.md` zurückgespiegelt wird (damit KIs den Lernstand kennen).
- IServ-Aufgaben automatisch mit Kalender und Klausurplan verknüpfen.
