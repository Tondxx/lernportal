import http.server
import socketserver
import os
import urllib.parse
import json
import sys

PORT = 8000
PORTAL_DIR = os.path.dirname(os.path.abspath(__file__))
SCHOOL_DIR = os.path.dirname(PORTAL_DIR)
MATHE1_DIR = os.path.join(SCHOOL_DIR, "mathe1")
NOTES_FILE = os.path.join(SCHOOL_DIR, "meine_mitschriften.json")

class RobustTCPServer(socketserver.TCPServer):
    allow_reuse_address = True
    
    def handle_error(self, request, client_address):
        # Ignore client disconnects/aborts on Windows
        exc_type, exc_val, exc_tb = sys.exc_info()
        if exc_type in (ConnectionResetError, BrokenPipeError):
            return
        super().handle_error(request, client_address)

class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=PORTAL_DIR, **kwargs)

    def send_json(self, data, status=200):
        self.send_response(status)
        self.send_header('Content-type', 'application/json; charset=utf-8')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
        self.wfile.write(json.dumps(data, ensure_ascii=False).encode('utf-8'))

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

    def do_GET(self):
        # Ignore favicon requests cleanly
        if self.path == '/favicon.ico':
            self.send_response(204)
            self.end_headers()
            return

        # IServ Status
        if self.path == '/api/iserv/status':
            try:
                import iserv_bridge
                import importlib
                importlib.reload(iserv_bridge)
                status = iserv_bridge.get_status_api()
                self.send_json(status)
            except Exception as e:
                self.send_json({"error": str(e), "configured": False}, 500)
            return

        # IServ Tasks
        if self.path.startswith('/api/iserv/tasks'):
            try:
                import iserv_bridge
                import importlib
                importlib.reload(iserv_bridge)
                force = 'force=true' in self.path
                tasks = iserv_bridge.get_tasks_api(force=force)
                self.send_json(tasks)
            except Exception as e:
                self.send_json({"error": str(e), "tasks": []}, 500)
            return

        # IServ Files / Folder listing
        if self.path.startswith('/api/iserv/files'):
            try:
                import iserv_bridge
                import urllib.parse
                parsed_url = urllib.parse.urlparse(self.path)
                query = urllib.parse.parse_qs(parsed_url.query)
                folder_path = query.get('path', ['Groups'])[0]
                res = iserv_bridge.client.list_folder(folder_path)
                self.send_json(res)
            except Exception as e:
                self.send_json({"success": False, "error": str(e)}, 500)
            return

        # IServ Subject Default Folder Mapping
        if self.path.startswith('/api/iserv/subject-folder'):
            try:
                import iserv_bridge
                import urllib.parse
                parsed_url = urllib.parse.urlparse(self.path)
                query = urllib.parse.parse_qs(parsed_url.query)
                subject = query.get('subject', [''])[0].lower()
                folder = iserv_bridge.SUBJECT_GROUPS_MAP.get(subject, 'Groups')
                self.send_json({"subject": subject, "folder": folder})
            except Exception as e:
                self.send_json({"subject": "", "folder": "Groups"}, 500)
            return

        # API to load saved user notes
        if self.path == '/api/load-notes':
            if os.path.exists(NOTES_FILE):
                try:
                    with open(NOTES_FILE, 'r', encoding='utf-8') as f:
                        data = json.load(f)
                    self.send_json(data)
                except Exception as e:
                    self.send_json({"error": str(e), "notes": {}}, 500)
            else:
                self.send_json({"notes": {}})
            return

        return super().do_GET()

    def do_POST(self):
        content_length = int(self.headers.get('Content-Length', 0))
        post_data = self.rfile.read(content_length) if content_length > 0 else b'{}'

        # IServ Download Single File
        if self.path == '/api/iserv/download-file':
            try:
                import iserv_bridge
                payload = json.loads(post_data.decode('utf-8'))
                rel_path = payload.get('path', '').strip()
                res = iserv_bridge.client.download_file(rel_path)
                self.send_json(res)
            except Exception as e:
                self.send_json({"success": False, "error": str(e)}, 500)
            return

        # IServ Download Folder (Recursive)
        if self.path == '/api/iserv/download-folder':
            try:
                import iserv_bridge
                payload = json.loads(post_data.decode('utf-8'))
                folder_path = payload.get('path', '').strip()
                res = iserv_bridge.client.download_folder(folder_path)
                self.send_json(res)
            except Exception as e:
                self.send_json({"success": False, "error": str(e)}, 500)
            return

        # IServ Manual Sync
        if self.path == '/api/iserv/sync':
            try:
                import iserv_bridge
                result = iserv_bridge.client.fetch_tasks()
                self.send_json(result)
            except Exception as e:
                self.send_json({"success": False, "error": str(e)}, 500)
            return

        # IServ Configuration
        if self.path == '/api/iserv/configure':
            try:
                import iserv_bridge
                payload = json.loads(post_data.decode('utf-8'))
                server = payload.get('server', '').strip()
                username = payload.get('username', '').strip()
                password = payload.get('password', '').strip()
                res = iserv_bridge.save_config(server, username, password if password else None)
                self.send_json(res)
            except Exception as e:
                self.send_json({"status": "error", "message": str(e)}, 500)
            return

        # IServ Toggle Task Done
        if self.path == '/api/iserv/toggle-done':
            try:
                import iserv_bridge
                payload = json.loads(post_data.decode('utf-8'))
                task_id = payload.get('id')
                cached = iserv_bridge.client.get_cached_tasks()
                for t in cached.get('tasks', []):
                    if t.get('id') == task_id:
                        t['done'] = not t.get('done', False)
                        break
                iserv_bridge.client.save_cached_tasks(cached)
                self.send_json({"status": "ok", "task_id": task_id})
            except Exception as e:
                self.send_json({"status": "error", "message": str(e)}, 500)
            return

        # Save Notes
        if self.path == '/api/save-notes':
            try:
                data = json.loads(post_data.decode('utf-8'))
                with open(NOTES_FILE, 'w', encoding='utf-8') as f:
                    json.dump(data, f, ensure_ascii=False, indent=2)
                self.send_json({"status": "ok", "message": "Notizen erfolgreich gespeichert"})
            except Exception as e:
                self.send_json({"status": "error", "message": str(e)}, 500)
            return

        self.send_response(404)
        self.end_headers()

    def translate_path(self, path):
        path_clean = path.split('?', 1)[0].split('#', 1)[0]
        decoded_path = urllib.parse.unquote(path_clean)
        if decoded_path.startswith('/mathe1/'):
            rel_path = decoded_path[len('/mathe1/'):].lstrip('/')
            full_path = os.path.join(MATHE1_DIR, rel_path.replace('/', os.sep))
            return full_path
        return super().translate_path(path)

    def log_message(self, format, *args):
        # Keep logs clean
        sys.stderr.write("%s - - [%s] %s\n" %
                         (self.address_string(),
                          self.log_date_time_string(),
                          format%args))

def run():
    print(f"Starting RobustTCPServer on port {PORT}...")
    while True:
        try:
            with RobustTCPServer(("", PORT), CustomHTTPRequestHandler) as httpd:
                print(f"Server läuft unter: http://localhost:{PORT}")
                httpd.serve_forever()
        except KeyboardInterrupt:
            break
        except Exception as e:
            print(f"Server restart after exception: {e}")

if __name__ == "__main__":
    run()
