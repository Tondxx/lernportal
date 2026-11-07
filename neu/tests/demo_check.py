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

print(f'{ok} Zahlen geprüft, alles korrekt')
