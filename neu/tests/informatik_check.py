"""Prüft Zahlen und Code der Informatik-Inhalte (Lektionen, Aufgaben, Notation) unabhängig vom Browser.
Ausführen:  python Portal/neu/tests/informatik_check.py
1. Alle Python-Codeblöcke aus Lektionen/Aufgaben/Lösungen müssen kompilieren (Syntax).
2. Alle Zahlenfelder (nums) der Aufgaben werden mit eigener Berechnung verglichen.
3. Die Python-Texte der Notation-Algorithmen laufen und liefern die in den Fragen genannten Werte.
"""
import ast, html, json, math, os, re, subprocess, sys, textwrap
try:
    sys.stdout.reconfigure(encoding='utf-8')
except Exception:
    pass

HERE = os.path.dirname(os.path.abspath(__file__))
NODE_DUMP = r"""
global.window = {}; global.document = {}; global.matchMedia = () => ({ matches: false });
const path = require('path'), base = process.argv[1];
require(path.join(base, 'algo.js'));
['informatik-algos.js', 'informatik.js', 'informatik-aufgaben.js'].forEach(f => require(path.join(base, 'content', f)));
const out = { nums: {}, blocks: [], algos: {} };
const grab = (id, s) => { (String(s).match(/<pre class="ic-code">[\s\S]*?<\/pre>/g) || []).forEach(b => out.blocks.push({ id, code: b.replace(/^<pre class="ic-code">/, '').replace(/<\/pre>$/, '') })); };
const walk = (id, o) => { if (typeof o === 'string') grab(id, o); else if (Array.isArray(o)) o.forEach(x => walk(id, x)); else if (o && typeof o === 'object') Object.values(o).forEach(x => walk(id, x)); };
window.LR_LESSONS.filter(l => l.fach === 'informatik').forEach(l => walk(l.id, l));
window.LR_TASKS.filter(t => t.fach === 'informatik').forEach(t => { walk(t.id, t); t.parts.forEach(p => (p.nums || []).forEach((n, i) => { out.nums[p.id + '#' + i] = n.ans; })); });
window.LR_PY.filter(t => t.id.startsWith('py-') && !t.demo).forEach(t => { out.blocks.push({ id: t.id, code: t.loesung.replace(/&/g, '&amp;') }); });
window.LR_ALGOS.filter(a => a.id.startsWith('inf-')).forEach(a => { out.algos[a.id] = { py: window.LRAlgo.pyText(a.algo), checkpoints: a.ablauf.checkpoints.map(c => [c.id, c.wert]) }; });
console.log(JSON.stringify(out));
"""

def dump():
    r = subprocess.run(['node', '-e', NODE_DUMP, os.path.join(HERE, '..')], capture_output=True, text=True, encoding='utf-8')
    if r.returncode != 0:
        print(r.stderr); sys.exit(1)
    return json.loads(r.stdout)

D = dump()
fails = []
def check(name, cond, extra=''):
    if not cond:
        fails.append(name); print('FEHLER', name, extra)
    else:
        print('ok', name)

# ---------------------------------------------------------------- 1. Syntax aller Python-Codeblöcke
NOT_PY = ('Anker', 'fib(4)', 'summe(4)', 'neu ←')   # ASCII-Bäume/Skizzen, kein Python
bad = []
n_code = 0
for b in D['blocks']:
    src = html.unescape(b['code']).strip('\n')
    if src.startswith(NOT_PY) or '├' in src or '→ [' in src or b['id'] == 'IT6' or '←' in src or src.startswith('// '):
        continue
    # Ausschnitte aus Klassen (def laenge(self): …) sind eingerückt/ohne Klasse: trotzdem kompilierbar
    try:
        ast.parse(textwrap.dedent(src))
        n_code += 1
    except SyntaxError as e:
        bad.append((b['id'], str(e), src[:80]))
check(f'{n_code} Codeblöcke kompilieren', not bad, bad)

# ---------------------------------------------------------------- 2. Zahlen der Aufgaben
def trace_fib_while():
    a = b = 1; n = 0
    while b < 50:
        t = a + b; a = b; b = t; n += 1
    return n, b
def collatz(z):
    s = 0
    while z != 1:
        z = z // 2 if z % 2 == 0 else 3 * z + 1
        s += 1
    return s
def bubble(l):
    l = l[:]; v = t = 0
    for i in range(len(l) - 1):
        for j in range(len(l) - 1 - i):
            v += 1
            if l[j] > l[j + 1]:
                l[j], l[j + 1] = l[j + 1], l[j]; t += 1
    return v, t, l
def insertion_shifts(l):
    l = l[:]; s = 0
    for i in range(1, len(l)):
        w = l[i]; j = i - 1
        while j >= 0 and l[j] > w:
            l[j + 1] = l[j]; j -= 1; s += 1
        l[j + 1] = w
    return s
def q(n):
    return n if n < 10 else n % 10 + q(n // 10)
def calls_q(n):
    return 1 if n < 10 else 1 + calls_q(n // 10)
def fact(n):
    return 1 if n == 0 else n * fact(n - 1)
def max_rek(l, i):
    if i == len(l) - 1: return l[i]
    r = max_rek(l, i + 1)
    return r if r > l[i] else l[i]
def a_calls(n):
    return 1 if n < 2 else 1 + a_calls(n - 1) + a_calls(n - 2)
def fib(n):
    a, b = 0, 1
    for _ in range(n): a, b = b, a + b
    return a
def suche(l, z, lo, hi, trace):
    trace.append((lo, hi))
    if lo > hi: return -1
    m = (lo + hi) // 2
    if l[m] == z: return m
    return suche(l, z, m + 1, hi, trace) if l[m] < z else suche(l, z, lo, m - 1, trace)
def versand(w, g):
    if w >= 100: return 0.0
    return 4.0 if g <= 1 else 6.5 if g <= 5 else 12.0
def keine_doppelten(s, trace):
    trace.append(len(s))
    if not s: return True
    oben = s.pop()
    if not s: return True
    if s[-1] == oben: return False
    return keine_doppelten(s, trace)

# Aufgabe 5: lokal/global
x = 10; liste = [2, 4]
def aendere(wert, l):
    x = wert + 1; l.append(x); wert = 0; return x * 2
w = 3; r = aendere(w, liste)
# Aufgabe 9
f = [[3, 5, 2], [4, 1, 6], [7, 0, 8]]
# Stapel-Tippen
st = []
for op in ['S', 'T', 'A', 'X', None, 'P', 'E', 'N', None, 'L']:
    st.append(op) if op else st.pop()
    if len(st) and op == 'N': size8 = len(st)
bin_t23, bin_t50 = [], []
L10 = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]
r23 = suche(L10, 23, 0, 9, bin_t23); r50 = suche(L10, 50, 0, 9, bin_t50)
tr_ks = []; ks = keine_doppelten(list('KRRWGB'), tr_ks)
tr_ok = []; ks_ok = keine_doppelten(list('ABCD'), tr_ok)

EXPECT = {
    'IT1b#0': trace_fib_while()[0], 'IT1b#1': trace_fib_while()[1],
    'IT2b#0': collatz(6), 'IT2c#0': collatz(7),
    'IT3b#0': versand(80, 0.8), 'IT3b#1': versand(80, 3.2), 'IT3b#2': versand(120, 7),
    'IT4a#0': 2, 'IT4a#1': -1,
    'IT5a#0': x, 'IT5a#1': w, 'IT5a#2': r,
    'IT7c#0': -1, 'IT7c#1': 2,
    'IT8b#0': 3, 'IT8b#1': 5,
    'IT9a#0': sum(f[i][i] for i in range(3)), 'IT9c#0': sum(f[i][2 - i] for i in range(3)),
    'IT10b#0': bubble([6, 3, 8, 2])[0], 'IT10b#1': bubble([6, 3, 8, 2])[1],
    'IT11b#0': 10, 'IT11d#0': insertion_shifts([7, 2, 9, 4, 1]),
    'IT13a#0': 6 * 5 // 2, 'IT13b#0': 100 * 99 // 2,
    'IT14b#0': q(4721), 'IT14b#1': calls_q(4721),
    'IT15c#0': fact(4), 'IT15c#1': 5,
    'IT16b#0': max_rek([3, 9, 4], 0),
    'IT18a#0': a_calls(5), 'IT18c#0': 2 * fib(26) - 1,
            'IT21a#0': 10 - 3 + 1, 'IT21a#1': 0,
    'IT23b#0': size8,
    'IT25b#0': 1,
    'IT26c#0': 4, 'IT26c#1': 6,
    'IT28a#0': len('Informatik'),
    'IT29b#0': 3, 'IT29b#1': 3,
    'IT30a#0': 47 // 5, 'IT30a#1': 47 % 5, 'IT30a#2': 20 % 4, 'IT30b#0': sum(int(c) for c in '5832'),
    'IT30c#0': ord('C'), 'IT30c#1': ord('c'),
}
for k, v in EXPECT.items():
    got = D['nums'].get(k)
    check(f'Zahl {k} = {v}', got is not None and abs(got - v) < 1e-9, f'(Inhalt sagt {got})')
check('alle nums-Felder wurden geprüft', set(D['nums']) == set(EXPECT), set(D['nums']) ^ set(EXPECT))

# Weitere Behauptungen aus den Texten
bs = [6, 3, 8, 2]; stages = []
for i in range(3):
    for j in range(3 - i):
        if bs[j] > bs[j + 1]: bs[j], bs[j + 1] = bs[j + 1], bs[j]
    stages.append(bs[:])
check('IT10a Zustände', stages == [[3, 6, 2, 8], [3, 2, 6, 8], [2, 3, 6, 8]], stages)
sel = [7, 2, 9, 4, 1]; stages = []
for i in range(4):
    k = min(range(i, 5), key=lambda j: (sel[j], j)); sel[i], sel[k] = sel[k], sel[i]; stages.append(sel[:])
check('IT11a Zustände', stages == [[1, 2, 9, 4, 7], [1, 2, 9, 4, 7], [1, 2, 4, 9, 7], [1, 2, 4, 7, 9]], stages)
ins = [7, 2, 9, 4, 1]; stages = []
for i in range(1, 5):
    w_ = ins[i]; j = i - 1
    while j >= 0 and ins[j] > w_: ins[j + 1] = ins[j]; j -= 1
    ins[j + 1] = w_; stages.append(ins[:])
check('IT11c Zustände', stages == [[2, 7, 9, 4, 1], [2, 7, 9, 4, 1], [2, 4, 7, 9, 1], [1, 2, 4, 7, 9]], stages)
check('IT23a: Wort STAPEL', ''.join(st) == 'STAPEL', st)
check('IT16b: Rückgaben 4, 9, 9', max_rek([3, 9, 4], 2) == 4 and max_rek([3, 9, 4], 1) == 9 and max_rek([3, 9, 4], 0) == 9)
check('IT15c: Rückgaben 1,1,2,6,24', [fact(i) for i in range(5)] == [1, 1, 2, 6, 24])
check('IT18a: Tabelle a(0..5) = 1 1 3 5 9 15', [a_calls(i) for i in range(6)] == [1, 1, 3, 5, 9, 15])
check('IF8 Tabelle: Aufrufe n=4,5,10,20,30 und fib-Werte', [a_calls(4), a_calls(5), a_calls(10)] == [9, 15, 177] and 2 * fib(21) - 1 == 21891 and 2 * fib(31) - 1 == 2692537 and fib(20) == 6765 and fib(30) == 832040)
check('IF6: 1000·999/2 = 499500, 2000·1999/2 = 1999000', 1000 * 999 // 2 == 499500 and 2000 * 1999 // 2 == 1999000)
check('IF1: Quersumme 4721 = 14 in 4 Durchläufen', q(4721) == 14)
# IT25: Druckerwarteschlange und Stapel-Variante
qq = []; printed = []
for ev in ['A', 'B', 'C', None, 'D', None, None, 'E', None]:
    qq.append(ev) if ev else printed.append(qq.pop(0))
check('IT25a/b: gedruckt A B C D, übrig [E]', printed == list('ABCD') and qq == ['E'])
ss = []; printed = []
for ev in ['A', 'B', 'C', None, 'D', None, None, 'E', None]:
    ss.append(ev) if ev else printed.append(ss.pop())
check('IT25c: mit Stapel C D B E', printed == list('CDBE'), printed)
# IT26: Schlangenlinie
def eintragen(qv, z, s, schlange=False):
    qv = qv[:]; out = []
    for i in range(z):
        row = [qv.pop(0) for _ in range(s)]
        out.append(row[::-1] if schlange and i % 2 == 1 else row)
    return out
check('IT26c', eintragen([1, 2, 3, 4, 5, 6], 2, 3)[1][0] == 4 and eintragen([1, 2, 3, 4, 5, 6], 2, 3, True)[1][0] == 6)
# IT29: Befehlsfolge auf dynamischer Reihung
d29 = []
d29.append(8); d29.append(3); d29.append(5); d29.insert(1, 6); del d29[0]; d29[2] = 1
check('IT29a: [6, 3, 1], getItem(1) = 3', d29 == [6, 3, 1] and d29[1] == 3)
check('IT29c: insertAt(4, …) bei Länge 3 ist ungültig, insertAt(3, …) gültig', not (0 <= 4 <= len(d29)) and (0 <= 3 <= len(d29)))
# IT31: Stapel und Schlange
s31 = []; r31 = []
for op in ['A', 'B', 'top', 'pop', 'C', 'pop', 'pop', 'empty']:
    if op in 'ABC' and len(op) == 1: s31.append(op); r31.append(None)
    elif op == 'top': r31.append(s31[-1])
    elif op == 'pop': r31.append(s31.pop())
    else: r31.append(len(s31) == 0)
check('IT31a Rückgaben B, B, C, A, wahr', [x for x in r31 if x is not None] == ['B', 'B', 'C', 'A', True], r31)
q31 = []; r31 = []
for op in [1, 2, 'head', 'deq', 3, 'deq', 'head', 'empty']:
    if isinstance(op, int): q31.append(op)
    elif op == 'head': r31.append(q31[0])
    elif op == 'deq': r31.append(q31.pop(0))
    else: r31.append(len(q31) == 0)
check('IT31b Rückgaben 1, 1, 2, 3, falsch; Rest [3]', r31 == [1, 1, 2, 3, False] and q31 == [3], r31)
# IT28: Zeichenketten
s28 = 'Informatik'
check('IT28a: Position 2 = f, 0 bis vor 6 = Inform, mat in, Zebra < apfel', s28[2] == 'f' and s28[0:6] == 'Inform' and 'mat' in s28 and 'Zebra' < 'apfel')
def umdrehen(s):
    e = ''
    for i in range(len(s) - 1, -1, -1): e = e + s[i]
    return e
def pal(s):
    for i in range(len(s) // 2):
        if s[i] != s[len(s) - 1 - i]: return False
    return True
check('IT28b/c: umdrehen, Palindrom', umdrehen('Abc') == 'cbA' and pal('otto') and pal('anna') and not pal('abca') and pal('') and pal('a'))
check('IT30c: d = ASCII 100, Kleinbuchstaben 32 höher', chr(100) == 'd' and ord('c') - ord('C') == 32 and chr(ord('Z') + 1) == '[')
# Lektion IF4 max_mit_position, IF2 Schaltjahr, IF10 Klammern
def max_pos(l):
    m, p = l[0], 0
    for i in range(1, len(l)):
        if l[i] > m: m, p = l[i], i
    return m, p
check('IF4: max_mit_position([4,9,2,9,5]) = (9, 1)', max_pos([4, 9, 2, 9, 5]) == (9, 1))
def schalt(j):
    if j % 400 == 0: return True
    if j % 100 == 0: return False
    return j % 4 == 0
check('IF2: Schaltjahre 2000 ja, 1900 nein, 2024 ja, 2023 nein', [schalt(2000), schalt(1900), schalt(2024), schalt(2023)] == [True, False, True, False])
def klam(t):
    s = []; paar = {')': '(', ']': '[', '}': '{'}
    for z in t:
        if z in '([{': s.append(z)
        elif z in ')]}':
            if not s: return False
            if s.pop() != paar[z]: return False
    return not s
check('IF10: ([x])] falsch, {[a]}( falsch, ({[]}) wahr', klam('([x])]') is False and klam('{[a]}(') is False and klam('({[]})') is True)
check('IF5: Insertion/Bubble [5,2,4,1]: 5 Vertauschungen, 6 Vergleiche', bubble([5, 2, 4, 1])[:2] == (6, 5) and insertion_shifts([5, 2, 4, 1]) == 5)
xx = 5
def f3(a, liste):
    x = a * 2; liste.append(x); return x + 1
l3 = [1]; y3 = f3(3, l3)
check('IF3: x=5, y=7, l=[1,6]', (xx, y3, l3) == (5, 7, [1, 6]))
check('IT6c: durchschnitt([2,4,6]) mit Fehler = 3.0', sum([2, 4, 6]) / (3 + 1) == 3.0)

# ---------------------------------------------------------------- 3. Notation: Python-Texte laufen, Checkpoints stimmen
ns = {}
for k, a in D['algos'].items():
    ns[k] = {}
    exec(a['py'], ns[k])
check('Notation Bubble: Python sortiert', ns['inf-bubble']['bubblesort']([6, 3, 8, 2]) == [2, 3, 6, 8])
check('Notation Fakultät: 5! = 120', ns['inf-fakultaet']['fakultaet'](5) == 120)
check('Notation erste Negative', [ns['inf-erste-negative']['ersteNegative'](x) for x in ([3, 5, -2, 7], [1, 2], [4, 0, 7], [-1, -2])] == [2, -1, -1, 0])
check('Notation Klammern', [ns['inf-klammern']['klammernOk'](t) for t in ('([x])', '([x])]', '((', ')(')] == [True, False, False, False])
cp = {k: dict(a['checkpoints']) for k, a in D['algos'].items()}
b3 = []; blist = [6, 3, 8, 2]
for i in range(3):
    c = 0
    for j in range(3 - i):
        if blist[j] > blist[j + 1]: blist[j], blist[j + 1] = blist[j + 1], blist[j]; c += 1
    b3.append(c)
check('Notation Bubble Checkpoints 2,1,1,6', [cp['inf-bubble'][k] for k in ('v0', 'v1', 'v2', 'vg')] == b3 + [6], b3)
check('Notation Fakultät Checkpoints 1,2,6,24', [cp['inf-fakultaet'][k] for k in ('f1', 'f2', 'f3', 'f4')] == [fact(1), fact(2), fact(3), fact(4)])
# Notation erste Negative: i nach Durchlauf 1/2, Rückgabe 2, 2 Durchläufe
check('Notation erste Negative Checkpoints', [cp['inf-erste-negative'][k] for k in ('i1', 'i2', 'ir', 'ik')] == [1, 2, 2, 2])
# Klammern: Stapelhöhe nach Zeichen 2, 4, 5 für ([x])]
h = []; s_ = []
for z in '([x])]':
    if z in '([{': s_.append(z)
    elif z in ')]}' and s_: s_.pop()
    h.append(len(s_))
check('Notation Klammern Checkpoints 2,1,0,6', [cp['inf-klammern'][k] for k in ('k2', 'k4', 'k5', 'kz')] == [h[1], h[3], h[4], 6], h)

print()
if fails:
    print(len(fails), 'FEHLER:', fails); sys.exit(1)
print('alles in Ordnung')
