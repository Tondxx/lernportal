import os

portal_dir = os.path.dirname(os.path.abspath(__file__))

import re

# Seit S8 ist index.html nur noch die Weiterleitung zum Lernraum (neu/).
# Das alte Portal liegt in alt/index.html (mit <base href="../">); daraus wird die Offline-Datei gebaut.
with open(os.path.join(portal_dir, "alt", "index.html"), "r", encoding="utf-8") as f:
    html = f.read()
html = re.sub(r'[ \t]*<base href="\.\./">[^\n]*\n', '', html, count=1)

with open(os.path.join(portal_dir, "style.css"), "r", encoding="utf-8") as f:
    css = f.read()

# Replace <link rel="stylesheet" href="style.css..."> with <style>...</style>
html_bundled = re.sub(r'<link rel="stylesheet" href="style\.css(?:\?[^"]*)?">', f'<style>\n{css}\n</style>', html)

# Mathe-Klausurtrainer CSS einbetten
mt_css_path = os.path.join(portal_dir, "mathe_trainer.css")
if os.path.exists(mt_css_path):
    with open(mt_css_path, "r", encoding="utf-8") as f:
        mt_css = f.read()
    html_bundled = re.sub(r'<link rel="stylesheet" href="mathe_trainer\.css(?:\?[^"]*)?">', lambda m: "<style>" + chr(10) + mt_css + chr(10) + "</style>", html_bundled)

# Design 2 (Aurora Study) einbetten – muss nach style.css/mathe_trainer.css stehen
d2_path = os.path.join(portal_dir, "design2.css")
if os.path.exists(d2_path):
    with open(d2_path, "r", encoding="utf-8") as f:
        d2_css = f.read()
    html_bundled = re.sub(r'<link rel="stylesheet" href="design2\.css(?:\?[^"]*)?">', lambda m: "<style>" + chr(10) + d2_css + chr(10) + "</style>", html_bundled)

# KaTeX-Schriften-CSS (CDN, kleine Datei) einbetten
kf_path = os.path.join(portal_dir, "katex-fonts.css")
if os.path.exists(kf_path):
    with open(kf_path, "r", encoding="utf-8") as f:
        kf = f.read()
    html_bundled = re.sub(r'<link rel="stylesheet" href="katex-fonts\.css(?:\?[^"]*)?">', lambda m: "<style>" + chr(10) + kf + chr(10) + "</style>", html_bundled)

# Inline KaTeX CSS if available locally
katex_css_path = os.path.join(portal_dir, "katex.min.css")
if os.path.exists(katex_css_path):
    with open(katex_css_path, "r", encoding="utf-8") as f:
        k_css = f.read()
    html_bundled = html_bundled.replace('<link rel="stylesheet" href="katex.min.css">', f'<style>\n/* KaTeX CSS Offline */\n{k_css}\n</style>')

# Inline KaTeX JS if available locally
katex_js_path = os.path.join(portal_dir, "katex.min.js")
if os.path.exists(katex_js_path):
    with open(katex_js_path, "r", encoding="utf-8") as f:
        k_js = f.read()
    html_bundled = html_bundled.replace('<script src="katex.min.js"></script>', f'<script>\n// KaTeX JS Offline\n{k_js}\n</script>')

scripts = ["calendar.js", "politik.js", "timetable.js", "steckbrief.js", "schar.js", "matching.js", "user_content.js", "physik.js", "seminarfach.js", "informatik.js", "integralrechnung.js", "integral_kurs.js", "schar_kurs.js", "mathe_trainer_content.js", "mathe_trainer.js", "main_hub.js"]
for s in scripts:
    with open(os.path.join(portal_dir, s), "r", encoding="utf-8") as f:
        js = f.read()
    m = re.search(rf'<script src="{re.escape(s)}(?:\?[^"]*)?"></script>', html_bundled)
    if m:
        html_bundled = html_bundled[:m.start()] + f'<script>\n// --- {s} ---\n{js}\n</script>' + html_bundled[m.end():]

target1 = os.path.join(portal_dir, "tonda-oberstufe.html")

with open(target1, "w", encoding="utf-8") as f:
    f.write(html_bundled)

print(f"Bundled successfully! Total size: {len(html_bundled)} bytes")
