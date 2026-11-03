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
| `calendar.js`, `timetable.js`, `steckbrief.js` | Kalender, Stundenplan, Steckbrief |
| `user_content.js` | Upload/Ablage eigener Mitschriften |
| `style.css` | Gesamtes Design |
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

## Offene Verbesserungen (Ideen)
- Aufgaben-Generator: einheitliches Aufgabenformat (Thema, Schwierigkeit, Lösungsweg, Bewertung) für alle Fächer.
- Fortschrittsspeicher, der in `../Faecher/*/README.md` zurückgespiegelt wird (damit KIs den Lernstand kennen).
- IServ-Aufgaben automatisch mit Kalender und Klausurplan verknüpfen.
