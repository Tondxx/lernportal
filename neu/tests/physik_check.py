# Rechnet alle Zahlen der Physik-Inhalte (content/physik*.js) nach.
# Ausführen: python Portal/neu/tests/physik_check.py   (gibt die Werte aus, bricht bei Abweichung ab)
import math

e = 1.602e-19      # C
me = 9.109e-31     # kg
eps0 = 8.854e-12   # As/(Vm)
ln = math.log
ok = 0


def chk(name, got, want, tol=0.01):
    global ok
    rel = abs(got - want) / max(abs(want), 1e-30)
    assert rel <= tol, f'{name}: gerechnet {got:.6g}, im Inhalt {want:.6g}'
    ok += 1
    print(f'ok {name:38s} {got:.6g}')


# ---------------- P1 Spannung, Energie, Leistung
chk('P1-Bsp Q Akku 2000 mAh', 2.0 * 3600, 7200)
chk('P1-Bsp E Akku 1,2 V', 7200 * 1.2, 8640)
chk('P1-Bsp t Lampe 0,4 A in h', 7200 / 0.4 / 3600, 5.0)
chk('E1a W in J (2,5 kV)', e * 2500, 4.005e-16)
chk('E1b U fuer 8e-17 J', 8.0e-17 / e, 499.4)
chk('E2 Q 5000 mAh', 5.0 * 3600, 18000)
chk('E2 E in J', 18000 * 3.7, 66600)
chk('E2 E in Wh', 66600 / 3600, 18.5)
chk('E2 I bei 1,2 W', 1.2 / 3.7, 0.3243)
chk('E2 t in h', 66600 / 1.2 / 3600, 15.42)
chk('E3 N Elektronen', 3.2e-9 / e, 1.998e10)
chk('E3 dm', 3.2e-9 / e * me, 1.82e-20)

# ---------------- P2 Potential
chk('P2-Bsp E (3V bei 1cm)', 3.0 / 0.01, 300)
chk('P2-Bsp U0 d=6cm', 300 * 0.06, 18)
chk('P1t E', (18.0 - 4.5) / (0.060 - 0.015), 300)
chk('P1t U0 d=8cm', 300 * 0.08, 24)
chk('P1t phi(3cm)', 300 * 0.03, 9)
chk('P1t W A->B', 2e-9 * 13.5, 2.7e-8)

# ---------------- P3 Kapazitaet
A = 0.20 * 0.20; d = 0.004; U = 500
C = eps0 * A / d
chk('P3-Bsp C', C, 8.854e-11)
chk('P3-Bsp Q', C * U, 4.427e-8)
chk('P3-Bsp E', U / d, 125000)
chk('P3-Bsp sigma', C * U / A, 1.107e-6)
A = 0.25 ** 2; d = 0.002; U = 400
C = eps0 * A / d
chk('C1 C in pF', C * 1e12, 276.7)
chk('C1 Q', C * U, 1.107e-7)
chk('C1 E', U / d, 2e5)
chk('C1 sigma', C * U / A, 1.771e-6)
chk('C2 C neu pF', C / 2 * 1e12, 138.3)
chk('C2 U getrennt', 2 * U, 800)
chk('C2 Q verbunden', C / 2 * U, 5.534e-8)
chk('C2 E verbunden', U / 0.004, 1e5)
Ar = math.pi * 0.12 ** 2
chk('C3 eps0', 3.3e-8 * 0.003 / (250 * Ar), 8.754e-12)
chk('C3 Abweichung %', abs(3.3e-8 * 0.003 / (250 * Ar) - eps0) / eps0 * 100, 1.13, 0.05)
chk('C3 epsr', 2.3e-7 / 3.3e-8, 6.97)

# ---------------- P4 Energie
chk('P4-Bsp W', 0.5 * 200e-6 * 320 ** 2, 10.24)
chk('P4-Bsp P', 10.24 / 0.002, 5120)
chk('W1 W', 0.5 * 330e-6 * 300 ** 2, 14.85)
chk('W1 P Licht', 0.2 * 14.85 / 1.5e-3, 1980)
chk('W2 C', 2 * 200 / 2000 ** 2, 100e-6)
chk('W2 Q', 100e-6 * 2000, 0.2)
chk('W2 I mittel', 0.2 / 5e-3, 40)

# ---------------- P5 Schaltungen
chk('S1 C parallel', 20 + 30, 50)
chk('S1 Q1', 20e-6 * 12, 240e-6)
chk('S1 Q2', 30e-6 * 12, 360e-6)
Cr = 1 / (1 / 20 + 1 / 30)
chk('S1 C Reihe', Cr, 12)
chk('S1 Q Reihe', Cr * 1e-6 * 12, 144e-6)
chk('S1 U1', 144e-6 / 20e-6, 7.2)
chk('S1 U2', 144e-6 / 30e-6, 4.8)
chk('P5-Bsp 90', 60 + 1 / (1 / 60 + 1 / 60), 90)
chk('P5-Bsp 20', 1 / (3 / 60), 20)

# ---------------- P6 Beschleunigung
v = lambda UB: math.sqrt(2 * e * UB / me)
chk('P6-Bsp v 1,5 kV', v(1500), 2.297e7)
chk('R1 v 2 kV', v(2000), 2.652e7)
chk('R1 U fuer 1e7', me * 1e14 / (2 * e), 284.3)

# ---------------- P7 Ablenkung
def defl(UB, U, d, l, L):
    v0 = v(UB); t = l / v0; a = e * U / (me * d)
    y = 0.5 * a * t ** 2
    tan = U * l / (2 * d * UB)
    return v0, t, a, y, tan, y + L * tan
v0, t, a, y, tan, Y = defl(1000, 200, 0.04, 0.08, 0.20)
chk('P7-Bsp y', y, 0.008)
chk('P7-Bsp tan', tan, 0.2)
chk('P7-Bsp alpha', math.degrees(math.atan(tan)), 11.31)
chk('P7-Bsp Y', Y, 0.048)
v0, t, a, y, tan, Y = defl(1200, 150, 0.025, 0.06, 0.15)
chk('R3 v0', v0, 2.054e7)
chk('R3 t', t, 2.921e-9)
chk('R3 a', a, 1.055e15)
chk('R3 y', y, 4.5e-3)
chk('R3 Y', Y, 0.027)
chk('R5 Umax', 2 * 0.025 ** 2 * 1200 / 0.06 ** 2, 416.7)

# ---------------- P8 Kurven
R, C, U0 = 10e3, 470e-6, 12
tau = R * C
chk('P8-Bsp tau', tau, 4.7)
chk('P8-Bsp th', tau * ln(2), 3.258)
chk('P8-Bsp I0', U0 / R, 1.2e-3)
chk('P8-Bsp U(5s)', U0 * (1 - math.exp(-5 / tau)), 7.858)
chk('P8-Bsp I(5s)', U0 / R * math.exp(-5 / tau), 4.149e-4)
R, C, U0 = 22e3, 470e-6, 9.0
tau = R * C
chk('L1 tau', tau, 10.34)
chk('L1 I0', U0 / R, 4.091e-4)
chk('L1 U(10 s)', U0 * (1 - math.exp(-10 / tau)), 5.578)
chk('L1 th', tau * ln(2), 7.167)
chk('L1 99%', tau * ln(100), 47.62)
chk('L2 2tau %', (1 - math.exp(-2)) * 100, 86.47)

# ---------------- P9 Rechnen
R, C, U0 = 2.0e6, 100e-6, 50
tau = R * C
chk('L3 tau', tau, 200)
chk('L3 Q0', C * U0, 5e-3)
chk('L3 dQ 30 s', C * U0 * (1 - math.exp(-30 / tau)), 6.964e-4)
chk('L3 th', tau * ln(2), 138.6)
chk('L3 R fuer 60 s', 60 / (C * ln(2)), 8.656e5)
chk('L3 C fuer 60 s (R=2M)', 60 / (R * ln(2)), 4.328e-5)
chk('L3 I0', U0 / R, 2.5e-5)
chk('L3 1%', tau * ln(100), 921.0)
tE = [36.4, 37.1, 35.9]
m = sum(tE) / 3
chk('L4 Mittelwert', m, 36.47)
Cx = m / (33e3 * ln(3))
chk('L4 C', Cx, 1.006e-3)
chk('L4 dC (5 %)', Cx * 0.05, 5.03e-5)
chk('P9-Bsp t bis 2 V (12 V, tau 4,7)', -4.7 * ln(2 / 12), 8.421)
# Linearisierung: Messreihe aus tau = 25 s
ts = [0, 10, 20, 30, 40, 50]
Us = [12.0, 8.1, 5.4, 3.6, 2.4, 1.6]
for t_, u_ in zip(ts, Us):
    assert abs(12 * math.exp(-t_ / 25) - u_) < 0.06, (t_, u_)
ys = [ln(u_) for u_ in Us]
n = len(ts); mx = sum(ts) / n; my = sum(ys) / n
slope = sum((x - mx) * (y_ - my) for x, y_ in zip(ts, ys)) / sum((x - mx) ** 2 for x in ts)
chk('L5 Steigung', slope, -0.04037, 0.01)
chk('L5 tau', -1 / slope, 24.77, 0.01)
chk('L5 C (R=50k)', -1 / slope / 50e3, 4.954e-4, 0.01)
chk('L5 ln-Werte U(0)', ln(12), 2.485)

# ---------------- Lerntreppe Entladen (Thema ph-entladen)
R, C, U0 = 47e3, 220e-6, 10
tau = R * C
chk('T tau', tau, 10.34)
chk('T U(5 s)', U0 * math.exp(-5 / tau), 6.166)
chk('T t bis 2 V', -tau * ln(0.2), 16.64)
chk('T th', tau * ln(2), 7.167)
chk('T1 I0', U0 / R, 2.128e-4)
R, C, U0 = 100e3, 47e-6, 6.0
tau = R * C
chk('T2 tau', tau, 4.7)
chk('T2 U(3 s)', U0 * math.exp(-3 / tau), 3.169)
chk('T2 t bis 1 V', -tau * ln(1 / 6), 8.421)
R, C, U0 = 15e3, 680e-6, 24
tau = R * C
chk('T3 tau', tau, 10.2)
chk('T3 U(8 s)', U0 * math.exp(-8 / tau), 10.97)
chk('T3 I(8 s) mA', U0 / R * math.exp(-8 / tau) * 1e3, 0.7313)
chk('T3 t bis 10 %', tau * ln(10), 23.49)
# Stufe 4 Kontext: Blitz-Ladeschaltung
R, C, U0 = 1.5e3, 680e-6, 330
tau = R * C
chk('T4 tau', tau, 1.02)
chk('T4 t bis 95 %', tau * ln(20), 3.056)
chk('T4 W', 0.5 * C * U0 ** 2, 37.03)
chk('T4 W bei 95 %', 0.5 * C * (0.95 * U0) ** 2, 33.42)
chk('T4 Anteil', 0.95 ** 2 * 100, 90.25)
chk('T5 C aus tE', 9.2 / (10e3 * ln(3)), 8.374e-4)
chk('T5 C aus th', 6.0 / (12e3 * ln(2)), 7.213e-4)

# ---------------- Lerntreppe Querfeld (Thema ph-querfeld)
def ydef(UB, U, d, l): return U * l ** 2 / (4 * d * UB)
chk('Q1 v0 (800 V)', v(800), 1.677e7)
chk('Q1 y (800V,100V,2cm,5cm)', ydef(800, 100, 0.02, 0.05), 3.906e-3)
chk('Q2 y (1500V,120V,3cm,8cm)', ydef(1500, 120, 0.03, 0.08), 4.267e-3)
chk('Q2 v0 1500', v(1500), 2.297e7)
chk('Q3 v0 (2000 V)', v(2000), 2.652e7)
chk('Q3 t (l=5cm)', 0.05 / v(2000), 1.885e-9)
chk('Q3 y (2000V,250V,2,5cm,5cm)', ydef(2000, 250, 0.025, 0.05), 3.125e-3)
chk('Q3 tan', 250 * 0.05 / (2 * 0.025 * 2000), 0.125)
chk('Q3 Y (L=12cm)', ydef(2000, 250, 0.025, 0.05) + 0.12 * 0.125, 0.018125)
chk('Q4 Umax (d=2cm,l=6cm,UB=1,8kV)', 2 * 0.02 ** 2 * 1800 / 0.06 ** 2, 400)
chk('Q4 Y bei 200 V, L=20cm', ydef(1800, 200, 0.02, 0.06) + 0.20 * 200 * 0.06 / (2 * 0.02 * 1800), 0.0383, 0.01)
chk('Q4 y bei 200 V', ydef(1800, 200, 0.02, 0.06), 0.005)
chk('Q5 UB fuer y=3mm (U=150,d=2,l=4)', 150 * 0.04 ** 2 / (4 * 0.02 * 0.003), 1000)

print(f'\n{ok} Werte geprüft, alle stimmen.')

# ---------------- Nachtrag: Werte in Musterlösungen
for u_, w in zip([12.0, 8.1, 5.4, 3.6, 2.4, 1.6], [2.485, 2.092, 1.686, 1.281, 0.875, 0.470]):
    chk(f'L5 ln({u_})', ln(u_), w, 0.002)
for a_, b_, w in [(8.1, 12.0, 0.675), (5.4, 8.1, 0.667), (3.6, 5.4, 0.667), (2.4, 3.6, 0.667), (1.6, 2.4, 0.667)]:
    chk(f'L5 Quotient {a_}/{b_}', a_ / b_, w, 0.002)
chk('L2 0,5^6 in %', 0.5 ** 6 * 100, 1.5625)
chk('L2 0,5^7 in %', 0.5 ** 7 * 100, 0.78125)
chk('L4 rel. Streuung Zeiten %', 0.63 / 36.47 * 100, 1.73, 0.05)
chk('P6 v/c in %', v(1500) / 2.998e8 * 100, 7.66, 0.01)
chk('P8 1-e^-1', 1 - math.exp(-1), 0.632, 0.002)
chk('PL3 1-e^-0.15', 1 - math.exp(-0.15), 0.139, 0.005)
print(f'{ok} Werte geprüft (inkl. Nachtrag), alle stimmen.')
chk('T5 Abweichung %', (8.374e-4 - 7.213e-4) / 8.374e-4 * 100, 13.9, 0.01)
chk('Q4 tan', 200 * 0.06 / (2 * 0.02 * 1800), 0.1667, 0.002)
chk('Q2 Zähler', 120 * 0.08 ** 2, 0.768)
chk('Q2 unter Wurzel', 2 * e * 1500 / me, 5.276e14)
chk('T2 e^-0.638', math.exp(-3 / 4.7), 0.528, 0.002)
chk('T4 ln20', ln(20), 3.00, 0.005)
print('Lerntreppen-Werte geprüft.')
# Nachtrag 10.11.: neu erklärte Beispiele
chk('PH9-Bsp C aus tE=50 s', 50 / (47e3 * ln(3)), 9.68e-4, 0.005)
chk('PH8-Bsp e^-5/4,7', math.exp(-5 / 4.7), 0.345, 0.005)
chk('PH8-Bsp U_R/R', (12 - 7.858) / 10e3, 4.14e-4, 0.01)
chk('PL1 e^-10/10,34', math.exp(-10 / 10.34), 0.380, 0.005)
chk('PW1 P gesamt', 14.85 / 1.5e-3, 9900)
chk('PH4 1 kg 1 m', 1 * 9.81 * 1, 9.81)
print('Nachtrag 10.11. geprüft.')
# Nachtrag 12.11.: Lektion 10/11, Aufgaben PB1-PB3, PT1
chk('PB1 Faktor C', 3 * 4, 12)
chk('PB1 E abgetrennt', (1 / 12) / (1 / 4), 1 / 3, 0.001)
chk('PB1 U abgetrennt', 1 / 12, 0.0833, 0.002)
chk('PB2 v0 800 V', math.sqrt(2 * e * 800 / me), 1.677e7, 0.005)
chk('PB2 v0 3200 V / 800 V', math.sqrt(2 * e * 3200 / me) / math.sqrt(2 * e * 800 / me), 2)
chk('PB2 y vorher mm', 100 * 0.06 ** 2 / (4 * 0.02 * 800) * 1e3, 5.625, 0.001)
chk('PB2 y nachher mm', 100 * 0.06 ** 2 / (4 * 0.02 * 3200) * 1e3, 1.406, 0.001)
for x_, y_ in [(2, 1.5), (4, 6.0), (6, 13.5), (8, 24.0)]:
    chk(f'PB3 y/x^2 bei {x_} cm', y_ / x_ ** 2, 0.375, 0.001)
chk('PB3 y bei 5 cm', 0.375 * 25, 9.375, 0.001)
chk('PB3 k theoretisch 1/m', 600 / (4 * 0.040 * 1000), 3.75, 0.001)
chk('PT1 tau', -1 / math.log(0.9608), 25.0, 0.01)
chk('PT1 Q0 mC', 120e-6 * 25 * 1e3, 3.0, 0.001)
chk('PT1 C uF', 3.0e-3 / 12 * 1e6, 250, 0.001)
chk('PT1 R kOhm', 12 / 120e-6 / 1e3, 100, 0.001)
chk('PT1 Faktor 80,4/120', 80.4 / 120, 0.67, 0.005)
print('Nachtrag 12.11. geprüft.')

# Nachtrag 12.11. (2): Röhrenbeispiel wie im Unterricht (U_B 3,6 kV, U_A 700 V, d 5,4 cm, l 10 cm)
_v0 = math.sqrt(2 * e * 3600 / me)
_t = 0.10 / _v0
_a = 700 * e / (0.054 * me)
_vy = _a * _t
chk('Röhre v0', _v0, 3.56e7, 0.002)
chk('Röhre t ns', _t * 1e9, 2.81, 0.002)
chk('Röhre a', _a, 2.28e15, 0.002)
chk('Röhre s_y mm (a,t)', 0.5 * _a * _t ** 2 * 1e3, 9.0, 0.002)
chk('Röhre s_y mm (Formel)', 700 * 0.10 ** 2 / (4 * 0.054 * 3600) * 1e3, 9.0, 0.002)
chk('Röhre v_y', _vy, 6.41e6, 0.002)
chk('Röhre v_ges', math.hypot(_v0, _vy), 3.62e7, 0.002)
chk('Röhre tan alpha', _vy / _v0, 0.180, 0.003)
chk('Röhre alpha Grad', math.degrees(math.atan(_vy / _v0)), 10.2, 0.005)
chk('PH14 tau', 10e3 * 470e-6, 4.7)
chk('PH14 I0 mA', 12 / 10e3 * 1e3, 1.2)
chk('PH14 Q0 mC', 470e-6 * 12 * 1e3, 5.64)
print('Nachtrag 12.11. (2) geprüft.')
