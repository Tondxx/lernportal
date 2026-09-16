import os
import json
import time
import re
import html
import urllib.parse
from datetime import datetime
import requests
from bs4 import BeautifulSoup

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
SCHOOL_DIR = os.path.dirname(BASE_DIR)
FILES_DIR = os.path.join(SCHOOL_DIR, "iserv_files")
CACHE_FILE = os.path.join(BASE_DIR, "iserv_tasks.json")
CONFIG_FILE = os.path.join(BASE_DIR, "iserv_config.json")
ENV_FILE = os.path.join(BASE_DIR, ".env")

def load_config():
    config = {
        "server": "",
        "username": "",
        "password": "",
        "auto_sync_minutes": 30
    }
    
    # 1. Check .env
    if os.path.exists(ENV_FILE):
        try:
            with open(ENV_FILE, 'r', encoding='utf-8') as f:
                for line in f:
                    line = line.strip()
                    if line.startswith('#') or '=' not in line:
                        continue
                    k, v = line.split('=', 1)
                    k = k.strip()
                    v = v.strip().strip('\"\'')
                    if k == 'ISERV_SERVER': config['server'] = v
                    elif k == 'ISERV_USERNAME': config['username'] = v
                    elif k == 'ISERV_PASSWORD': config['password'] = v
                    elif k == 'ISERV_AUTO_SYNC_MINUTES': 
                        try: config['auto_sync_minutes'] = int(v)
                        except: pass
        except Exception as e:
            print(f"[IServ] Fehler beim Lesen von .env: {e}")

    # 2. Check iserv_config.json
    if (not config['server'] or not config['username']) and os.path.exists(CONFIG_FILE):
        try:
            with open(CONFIG_FILE, 'r', encoding='utf-8') as f:
                saved = json.load(f)
                config.update(saved)
        except Exception as e:
            print(f"[IServ] Fehler beim Lesen von config.json: {e}")

    # Clean domain
    if config['server']:
        config['server'] = config['server'].lower().replace('https://', '').replace('http://', '').strip('/')

    return config

def save_config(server, username, password=None):
    server_clean = server.lower().replace('https://', '').replace('http://', '').strip('/')
    lines = [
        "# IServ Konfiguration (Privat auf deinem Rechner)",
        f"ISERV_SERVER={server_clean}",
        f"ISERV_USERNAME={username}",
    ]
    if password:
        lines.append(f"ISERV_PASSWORD={password}")
    lines.append("ISERV_AUTO_SYNC_MINUTES=30\n")
    
    with open(ENV_FILE, 'w', encoding='utf-8') as f:
        f.write("\n".join(lines))
        
    return {"status": "ok", "message": "Konfiguration in .env gespeichert"}

class IServClient:
    def __init__(self, config=None):
        self.config = config or load_config()
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
            'Accept-Language': 'de-DE,de;q=0.9,en;q=0.8'
        })
        self.logged_in = False
        self.last_sync = None

    def is_configured(self):
        return bool(self.config.get('server') and self.config.get('username') and self.config.get('password'))

    def _get_with_meta_refresh(self, url, max_hops=5):
        cur_res = self.session.get(url, allow_redirects=True, timeout=15)
        hops = 0
        while hops < max_hops:
            soup = BeautifulSoup(cur_res.text, 'html.parser')
            meta = soup.find('meta', attrs={'http-equiv': re.compile(r'refresh', re.I)})
            if meta and 'content' in meta.attrs:
                m = re.search(r'url=(.+)', meta['content'], re.I)
                if m:
                    next_url = html.unescape(m.group(1).strip())
                    if not next_url.startswith('http'):
                        server = self.config['server']
                        next_url = f"https://{server}{next_url}"
                    cur_res = self.session.get(next_url, allow_redirects=True, timeout=15)
                    hops += 1
                    continue
            break
        return cur_res

    def login(self):
        if not self.is_configured():
            return False, "IServ Zugangsdaten fehlen. Bitte in .env eintragen."

        server = self.config['server']
        login_url = f"https://{server}/iserv/auth/login"

        try:
            res1 = self.session.get(login_url, timeout=12)
            login_post_url = res1.url

            soup = BeautifulSoup(res1.text, 'html.parser')
            login_data = {
                '_username': self.config['username'],
                '_password': self.config['password'],
                '_remember_me': 'on'
            }

            csrf_input = soup.find('input', {'name': re.compile(r'csrf|token', re.I)})
            if csrf_input and csrf_input.get('value'):
                login_data[csrf_input['name']] = csrf_input['value']

            post_res = self.session.post(login_post_url, data=login_data, timeout=15, allow_redirects=True)

            if 'refresh' in post_res.text.lower():
                post_res = self._get_with_meta_refresh(post_res.url)

            if "/auth/login" in post_res.url:
                login_soup = BeautifulSoup(post_res.text, 'html.parser')
                alert = login_soup.find(['div', 'span', 'p'], class_=re.compile(r'alert|error|danger|feedback', re.I))
                err_msg = alert.get_text(strip=True) if alert else "Ungültige Anmeldedaten (Benutzername oder Passwort falsch)."
                return False, err_msg

            test_res = self._get_with_meta_refresh(f"https://{server}/iserv/exercise")
            if "/auth/login" in test_res.url:
                return False, "Sitzung konnte nicht autorisiert werden."

            self.logged_in = True
            return True, "Erfolgreich bei IServ eingeloggt."

        except Exception as e:
            return False, f"Verbindungsfehler zu {server}: {str(e)}"

    def parse_deadline(self, text):
        m = re.search(r'(\d{2})\.(\d{2})\.(\d{4})\s+(\d{1,2}):(\d{2})', text)
        if m:
            day, month, year, hour, minute = m.groups()
            try:
                dt = datetime(int(year), int(month), int(day), int(hour), int(minute))
                # Current date approximation
                now = datetime(2026, 9, 16, 14, 20) # 16.09.2026
                diff = dt - now
                days_left = diff.days
                
                if diff.total_seconds() < 0:
                    status = "past"
                    formatted = f"Abgelaufen ({day}.{month}., {hour}:{minute} Uhr)"
                elif days_left == 0:
                    status = "urgent"
                    formatted = f"Heute bis {hour}:{minute} Uhr"
                elif days_left == 1:
                    status = "urgent"
                    formatted = f"Morgen, {day}.{month}., {hour}:{minute} Uhr"
                elif days_left <= 3:
                    status = "soon"
                    formatted = f"In {days_left} Tagen ({day}.{month}.)"
                else:
                    status = "normal"
                    formatted = f"{day}.{month}.{year}, {hour}:{minute} Uhr"
                
                return formatted, days_left, status
            except Exception as e:
                pass
        return text.strip()[:25], 99, "normal"

    def detect_subject(self, title, details=""):
        combo = (title + " " + details).lower()
        if "if13" in combo or "informatik" in combo or "algorithm" in combo:
            return "Informatik eA", "IF13"
        if "ma11" in combo or "mathe" in combo or "analysis" in combo:
            return "Mathematik eA", "MA11"
        if "pw25" in combo or "politik" in combo or "wahlen" in combo or "partizipation" in combo:
            return "Politik-Wirtschaft gA", "pw25"
        if "ph12" in combo or "physik" in combo:
            return "Physik eA", "PH12"
        if "de48" in combo or "deutsch" in combo or "faust" in combo:
            return "Deutsch eA", "de48"
        if "en39" in combo or "englisch" in combo or "english" in combo or "tuesday" in combo:
            return "Englisch eA", "en39"
        if "ge27" in combo or "geschichte" in combo:
            return "Geschichte gA", "ge27"
        if "ds26" in combo or "spiel" in combo:
            return "Darstellendes Spiel", "ds26"
        return "Schule / IServ", "IServ"

    def fetch_task_details(self, task_url):
        try:
            res = self.session.get(task_url, timeout=12)
            soup = BeautifulSoup(res.text, 'html.parser')

            teacher = ""
            desc = ""

            # 1. Parse teacher from meta table
            for table in soup.find_all('table'):
                rows = table.find_all('tr')
                if len(rows) >= 2:
                    h_cols = [c.get_text(strip=True).lower() for c in rows[0].find_all(['th', 'td'])]
                    if 'erstellt von' in h_cols:
                        idx = h_cols.index('erstellt von')
                        d_cols = rows[1].find_all(['td', 'th'])
                        if idx < len(d_cols):
                            teacher = html.unescape(d_cols[idx].get_text(strip=True))
                            break

            # 2. Parse description text from .text-break-word
            desc_div = soup.find('div', class_=re.compile(r'text-break-word', re.I))
            if desc_div:
                desc = html.unescape(desc_div.get_text('\n', strip=True))
            else:
                # Fallback
                paragraphs = soup.find_all('p')
                desc_parts = [html.unescape(p.get_text(strip=True)) for p in paragraphs if len(p.get_text(strip=True)) > 20]
                if desc_parts:
                    desc = "\n\n".join(desc_parts)

            # 3. Parse attachments
            attachments = []
            file_links = soup.find_all('a', href=re.compile(r'/iserv/file/', re.I))
            for a in file_links:
                name = html.unescape(a.get_text(strip=True))
                if name and name not in ['Dateien', 'IServ-Dateien'] and name not in attachments:
                    attachments.append(name)

            return desc, teacher, attachments
        except Exception as e:
            return "", "", []

    def fetch_tasks(self):
        if not self.logged_in:
            ok, msg = self.login()
            if not ok:
                return {"success": False, "error": msg, "tasks": self.get_cached_tasks().get("tasks", [])}

        server = self.config['server']
        exercises_url = f"https://{server}/iserv/exercise"

        try:
            res = self._get_with_meta_refresh(exercises_url)
            if res.status_code != 200:
                return {"success": False, "error": f"Aufgaben-Modul nicht erreichbar ({res.status_code})", "tasks": []}

            soup = BeautifulSoup(res.text, 'html.parser')
            tasks = []

            table = soup.find('table')
            if table:
                rows = table.find_all('tr')
                for idx, row in enumerate(rows[1:]):
                    cols = row.find_all('td')
                    if len(cols) < 3:
                        continue
                    
                    link_elem = row.find('a')
                    title = html.unescape(link_elem.get_text(strip=True) if link_elem else cols[1].get_text(strip=True))
                    url = link_elem['href'] if (link_elem and link_elem.has_attr('href')) else ""
                    if url and not url.startswith('http'):
                        url = f"https://{server}{url}"

                    deadline_raw = cols[2].get_text(' ', strip=True)
                    deadline_str, days_left, status = self.parse_deadline(deadline_raw)

                    subject_name, course_code = self.detect_subject(title)
                    task_id = f"iserv-{url.split('/')[-1] if url else idx+1}"

                    task_item = {
                        "id": task_id,
                        "title": title,
                        "subject": subject_name,
                        "course": course_code,
                        "url": url,
                        "deadline": deadline_str,
                        "days_left": days_left,
                        "status": status,
                        "done": False,
                        "desc": "Klicke auf die Aufgabe, um Details vom IServ zu laden.",
                        "teacher": "",
                        "attachments": [],
                        "synced_at": datetime.now().isoformat()
                    }

                    if url:
                        desc, teacher, attachments = self.fetch_task_details(url)
                        if desc: task_item["desc"] = desc
                        if teacher: task_item["teacher"] = teacher
                        if attachments: task_item["attachments"] = attachments

                    tasks.append(task_item)

            # Preserve done status
            old_cached = self.get_cached_tasks()
            done_map = {t['id']: t.get('done', False) for t in old_cached.get('tasks', [])}
            for t in tasks:
                if t['id'] in done_map:
                    t['done'] = done_map[t['id']]

            result = {
                "success": True,
                "count": len(tasks),
                "server": server,
                "user": self.config['username'],
                "last_sync": datetime.now().strftime("%d.%m.%Y, %H:%M Uhr"),
                "tasks": tasks
            }
            self.save_cached_tasks(result)
            return result

        except Exception as e:
            return {"success": False, "error": f"Fehler beim Abrufen der Aufgaben: {str(e)}", "tasks": self.get_cached_tasks().get("tasks", [])}

    def get_cached_tasks(self):
        if os.path.exists(CACHE_FILE):
            try:
                with open(CACHE_FILE, 'r', encoding='utf-8') as f:
                    return json.load(f)
            except:
                pass
        return {
            "success": False,
            "demo": True,
            "server": self.config.get('server') or "nicht verbunden",
            "last_sync": "Noch nicht synchronisiert",
            "tasks": []
        }

    def save_cached_tasks(self, data):
        try:
            with open(CACHE_FILE, 'w', encoding='utf-8') as f:
                json.dump(data, f, ensure_ascii=False, indent=2)
        except Exception as e:
            print(f"[IServ] Cache-Speicherfehler: {e}")

    # =========================================================================
    # FILE MANAGER & DOCUMENT DOWNLOAD ENGINE
    # =========================================================================

    def list_folder(self, folder_path="Groups"):
        if not self.logged_in:
            ok, msg = self.login()
            if not ok:
                return {"success": False, "error": msg, "folders": [], "files": []}

        server = self.config['server']
        clean_path = folder_path.strip('/')
        encoded = urllib.parse.quote(clean_path)
        url = f"https://{server}/iserv/file/api/list/{encoded}"

        try:
            res = self.session.get(url, timeout=15)
            if res.status_code != 200:
                return {"success": False, "error": f"Fehler beim Laden des Ordners ({res.status_code})", "folders": [], "files": []}

            data = res.json()
            items = data.get('data', [])

            folders = []
            files = []

            for item in items:
                n = item.get('name', {})
                text = html.unescape(n.get('text', ''))
                link = n.get('link', '')
                is_folder = 'fa-folder' in n.get('icon', '')
                
                rel = ''
                if '/iserv/file/-/' in link:
                    rel = urllib.parse.unquote(link.split('/iserv/file/-/')[1].split('?')[0])
                else:
                    rel = f"{clean_path}/{text}"

                if is_folder:
                    folders.append({
                        "name": text,
                        "path": rel,
                        "link": f"https://{server}/iserv/file/-/{urllib.parse.quote(rel)}"
                    })
                else:
                    size_text = ""
                    s = item.get('size', {})
                    if isinstance(s, dict) and s.get('text'):
                        size_text = s.get('text')
                    elif isinstance(s, str):
                        size_text = s

                    local_check_path = os.path.join(FILES_DIR, rel.replace('/', os.sep))
                    is_downloaded = os.path.exists(local_check_path)

                    ext = text.split('.')[-1].lower() if '.' in text else ''
                    files.append({
                        "name": text,
                        "path": rel,
                        "size": size_text,
                        "ext": ext,
                        "is_downloaded": is_downloaded,
                        "download_url": f"https://{server}/iserv/file/-/{urllib.parse.quote(rel)}"
                    })

            parts = clean_path.split('/')
            breadcrumbs = []
            accum = []
            for p in parts:
                accum.append(p)
                breadcrumbs.append({
                    "name": p,
                    "path": "/".join(accum)
                })

            parent_path = "/".join(parts[:-1]) if len(parts) > 1 else ""

            return {
                "success": True,
                "current_path": clean_path,
                "breadcrumbs": breadcrumbs,
                "parent_path": parent_path,
                "folders": folders,
                "files": files
            }
        except Exception as e:
            return {"success": False, "error": str(e), "folders": [], "files": []}

    def download_file(self, rel_path):
        if not self.logged_in:
            ok, msg = self.login()
            if not ok:
                return {"success": False, "error": msg}

        server = self.config['server']
        clean_rel = rel_path.strip('/')
        encoded = urllib.parse.quote(clean_rel)
        url = f"https://{server}/iserv/file/-/{encoded}"

        try:
            res = self.session.get(url, timeout=30)
            if res.status_code != 200:
                return {"success": False, "error": f"Download fehlgeschlagen ({res.status_code})"}

            target_path = os.path.join(FILES_DIR, clean_rel.replace('/', os.sep))
            os.makedirs(os.path.dirname(target_path), exist_ok=True)

            with open(target_path, 'wb') as f:
                f.write(res.content)

            filename = os.path.basename(target_path)
            return {
                "success": True,
                "name": filename,
                "local_path": target_path,
                "size_bytes": len(res.content),
                "rel_path": clean_rel
            }
        except Exception as e:
            return {"success": False, "error": str(e)}

    def download_folder(self, folder_path):
        if not self.logged_in:
            ok, msg = self.login()
            if not ok:
                return {"success": False, "error": msg}

        downloaded_files = []
        errors = []

        def _traverse(cur_folder):
            res = self.list_folder(cur_folder)
            if not res.get('success'):
                errors.append(f"Ordner {cur_folder} konnte nicht geladen werden.")
                return

            for f in res.get('files', []):
                dl_res = self.download_file(f['path'])
                if dl_res.get('success'):
                    downloaded_files.append(f['name'])
                else:
                    errors.append(f"Fehler bei {f['name']}: {dl_res.get('error')}")

            for sub in res.get('folders', []):
                _traverse(sub['path'])

        _traverse(folder_path)

        local_dir = os.path.join(FILES_DIR, folder_path.strip('/').replace('/', os.sep))
        return {
            "success": True,
            "count": len(downloaded_files),
            "files": downloaded_files,
            "errors": errors,
            "local_dir": local_dir
        }

SUBJECT_GROUPS_MAP = {
    "mathe": "Groups/Abi28 MA11 EA",
    "informatik": "Groups/Abi28 IF13 EA",
    "physik": "Groups/Abi28 PH12 EA",
    "politik": "Groups/Abi28 pw25",
    "deutsch": "Groups/Abi28 de48",
    "englisch": "Groups/Abi28 en39",
    "geschichte": "Groups/Abi28 ge27",
    "ds": "Groups/Abi28 ds26",
    "sport": "Groups/Abi28 sp15Z",
    "tutorium": "Groups/Abi28 TUT Jh"
}

# Global singleton
client = IServClient()

def get_tasks_api(force=False):
    config = load_config()
    client.config = config
    if not client.is_configured():
        return client.get_cached_tasks()
    cached = client.get_cached_tasks()
    if not force and cached.get("tasks") and len(cached["tasks"]) > 0:
        return cached
    return client.fetch_tasks()

def get_status_api():
    config = load_config()
    client.config = config
    cached = client.get_cached_tasks()
    return {
        "configured": client.is_configured(),
        "server": config.get("server", ""),
        "username": config.get("username", ""),
        "last_sync": cached.get("last_sync", "Nie"),
        "task_count": len(cached.get("tasks", [])),
        "is_demo": cached.get("demo", False)
    }

if __name__ == "__main__":
    print("Fetching live tasks...")
    res = client.fetch_tasks()
    print("Success:", res.get("success"))
    print("Count:", res.get("count"))
    for t in res.get("tasks", []):
        print(f" - [{t['subject']}] {t['title']}")
        print(f"   Frist: {t['deadline']} | Lehrer: {t.get('teacher', '-')}")
        if t.get('attachments'): print(f"   Dateien: {t['attachments']}")
