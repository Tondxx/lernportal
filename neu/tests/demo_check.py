# Rechnet alle Zahlen des Demo-Themas (content/demo.js) mit sympy nach.
# Ausführen: python Portal/neu/tests/demo_check.py
from sympy import symbols, Rational as R, diff, solve, simplify, factor

x, c = symbols('x c')
ok = 0
def check(name, got, want):
    global ok
    assert simplify(got - want) == 0, f'{name}: {got} != {want}'
    ok += 1

# Stufe 1: f(x) = x^3 - 6x^2 + 9x + 1
f = x**3 - 6*x**2 + 9*x + 1
check('f1', diff(f, x), 3*x**2 - 12*x + 9)
check('f2', diff(f, x, 2), 6*x - 12)
assert sorted(solve(diff(f, x), x)) == [1, 3]
check('f2(1)', diff(f, x, 2).subs(x, 1), -6)
check('f2(3)', diff(f, x, 2).subs(x, 3), 6)
check('f(1)', f.subs(x, 1), 5)
check('f(3)', f.subs(x, 3), 1)

# Stufe 2: g(x) = x^3 - 3x^2 - 9x + 2
g = x**3 - 3*x**2 - 9*x + 2
assert sorted(solve(diff(g, x), x)) == [-1, 3]
check("g''(-1)", diff(g, x, 2).subs(x, -1), -12)
check("g''(3)", diff(g, x, 2).subs(x, 3), 12)
check('g(-1)', g.subs(x, -1), 7)
check('g(3)', g.subs(x, 3), -25)

# Stufe 3: h(x) = -x^3 + 3x + 4
h = -x**3 + 3*x + 4
assert sorted(solve(diff(h, x), x)) == [-1, 1]
check("h''(-1)", diff(h, x, 2).subs(x, -1), 6)
check("h''(1)", diff(h, x, 2).subs(x, 1), -6)
check('h(-1)', h.subs(x, -1), 2)
check('h(1)', h.subs(x, 1), 6)

# Stufe 4: p(x) = 0,1x^3 - 1,2x^2 + 3,6x + 2 auf [0; 8]
p = R(1, 10)*x**3 - R(12, 10)*x**2 + R(36, 10)*x + 2
check("p'", diff(p, x), R(3, 10)*(x - 2)*(x - 6))
assert sorted(solve(diff(p, x), x)) == [2, 6]
check("p''(2)", diff(p, x, 2).subs(x, 2), R(-12, 10))
check("p''(6)", diff(p, x, 2).subs(x, 6), R(12, 10))
check('p(2)', p.subs(x, 2), R(52, 10))
check('p(6)', p.subs(x, 6), 2)
check('p(0)', p.subs(x, 0), 2)
check('p(8)', p.subs(x, 8), R(52, 10))

# Stufe 5: g_c(x) = x^3 - 6x^2 + 9x + c, Tiefpunkt auf der x-Achse
gc = x**3 - 6*x**2 + 9*x + c
assert sorted(solve(diff(gc, x), x)) == [1, 3]          # unabhängig von c
assert diff(gc, x, 2).subs(x, 3) > 0                    # x = 3 ist Tiefstelle
check('c', solve(gc.subs(x, 3), c)[0], 0)
check('g0 faktorisiert', factor(gc.subs(c, 0)), x*(x - 3)**2)

# ---- S3: Lösungsweg erläutern (steilster Abstieg von p)
dp = diff(p, x)
check("p''", diff(p, x, 2), R(6, 10)*x - R(24, 10))
assert solve(diff(p, x, 2), x) == [4]
check("p'''", diff(p, x, 3), R(6, 10))
check("p'(4)", dp.subs(x, 4), R(-12, 10))
check("p'(0)", dp.subs(x, 0), R(36, 10))
check("p'(8)", dp.subs(x, 8), R(36, 10))

# ---- S3: Bedingung deuten
check('p(6)', p.subs(x, 6), 2)
check('mittlere Aenderungsrate 2..6', (p.subs(x, 6) - p.subs(x, 2))/4, R(-8, 10))
check("p'(2)", dp.subs(x, 2), 0)
a = symbols('a')
dd = simplify(p.subs(x, a + 2) - p.subs(x, a))
sol = sorted(float(s) for s in solve(dd, a))
assert abs(sol[0] - 1.085) < 0.001 and abs(sol[1] - 4.915) < 0.001, sol   # a ~ 1,09 und 4,92 (Text in „Bedingung deuten“)
ok += 1

# ---- S3: Fehler finden
k = x**3 - 3*x**2 - 24*x + 5
assert sorted(solve(diff(k, x), x)) == [-2, 4]            # richtig: 4 und -2
check('k(4)', k.subs(x, 4), -75)
check('k(-2)', k.subs(x, -2), 33)
check("k''(2)", diff(k, x, 2).subs(x, 2), 6)              # falsche Folgewerte (Fehler: -1 statt +1 in pq)
check("k''(-4)", diff(k, x, 2).subs(x, -4), -30)
check('k(2)', k.subs(x, 2), -47)
check('k(-4)', k.subs(x, -4), -11)
mm = -x**3 + 6*x**2 - 9*x + 4
check("m'", diff(mm, x), -3*x**2 + 12*x - 9)
assert sorted(solve(diff(mm, x), x)) == [1, 3]
check("m''(1)", diff(mm, x, 2).subs(x, 1), 6)
check("m''(3)", diff(mm, x, 2).subs(x, 3), -6)
check('m(1)', mm.subs(x, 1), 0)
check('m(3)', mm.subs(x, 3), 4)

print(f'{ok} Zahlen geprüft, alles korrekt')
