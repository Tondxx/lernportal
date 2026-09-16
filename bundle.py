import os

portal_dir = r"c:\Users\beutl\Desktop\school\mathe-lernportal"
school_dir = r"c:\Users\beutl\Desktop\school"

with open(os.path.join(portal_dir, "index.html"), "r", encoding="utf-8") as f:
    html = f.read()

with open(os.path.join(portal_dir, "style.css"), "r", encoding="utf-8") as f:
    css = f.read()

# Replace <link rel="stylesheet" href="style.css"> with <style>...</style>
html_bundled = html.replace('<link rel="stylesheet" href="style.css">', f'<style>\n{css}\n</style>')

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

scripts = ["calendar.js", "politik.js", "timetable.js", "steckbrief.js", "schar.js", "matching.js", "user_content.js", "physik.js", "main_hub.js"]
for s in scripts:
    with open(os.path.join(portal_dir, s), "r", encoding="utf-8") as f:
        js = f.read()
    tag = f'<script src="{s}"></script>'
    html_bundled = html_bundled.replace(tag, f'<script>\n// --- {s} ---\n{js}\n</script>')

target1 = os.path.join(portal_dir, "tonda-oberstufe.html")
target2 = os.path.join(school_dir, "tonda-oberstufe.html")

with open(target1, "w", encoding="utf-8") as f:
    f.write(html_bundled)

with open(target2, "w", encoding="utf-8") as f:
    f.write(html_bundled)

print(f"Bundled successfully! Total size: {len(html_bundled)} bytes")
