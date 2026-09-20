import os

portal_dir = r"c:\Users\beutl\Desktop\school\mathe-lernportal"
school_dir = r"c:\Users\beutl\Desktop\school"

with open(os.path.join(portal_dir, "index.html"), "r", encoding="utf-8") as f:
    html = f.read()

with open(os.path.join(portal_dir, "style.css"), "r", encoding="utf-8") as f:
    css = f.read()

import re

# Replace <link rel="stylesheet" href="style.css..."> with <style>...</style>
html_bundled = re.sub(r'<link rel="stylesheet" href="style\.css(?:\?[^"]*)?">', f'<style>\n{css}\n</style>', html)

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

scripts = ["calendar.js", "politik.js", "timetable.js", "steckbrief.js", "schar.js", "matching.js", "user_content.js", "physik.js", "seminarfach.js", "main_hub.js"]
for s in scripts:
    with open(os.path.join(portal_dir, s), "r", encoding="utf-8") as f:
        js = f.read()
    m = re.search(rf'<script src="{re.escape(s)}(?:\?[^"]*)?"></script>', html_bundled)
    if m:
        html_bundled = html_bundled[:m.start()] + f'<script>\n// --- {s} ---\n{js}\n</script>' + html_bundled[m.end():]

target1 = os.path.join(portal_dir, "tonda-oberstufe.html")
target2 = os.path.join(school_dir, "tonda-oberstufe.html")

with open(target1, "w", encoding="utf-8") as f:
    f.write(html_bundled)

with open(target2, "w", encoding="utf-8") as f:
    f.write(html_bundled)

print(f"Bundled successfully! Total size: {len(html_bundled)} bytes")
