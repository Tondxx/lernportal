# -*- coding: utf-8 -*-
"""
Informatik eA (Abi 28) - Grundlagen der Algorithmik
Aufgabe 1: Rekursive Zinseszins-Rechnung
Schüler: Tonda Beutler
Lehrkraft: Maria Tripel
"""

def kapital(n):
    """
    Berechnet rekursiv das Endkapital nach n Jahren bei einem
    Startkapital von 1000 Euro und einem festen Zinssatz von 5 % p.a.
    
    Problemreduktion:
      kapital(0) -> 1000 (Rekursionsbasis / Abbruchbedingung)
      kapital(n) -> kapital(n-1) + 0.05 * kapital(n-1) (Rekursionsschritt)
    """
    # 1. Rekursionsbasis (Abbruchbedingung)
    if n == 0:
        return 1000.0
    
    # 2. Rekursionsschritt (Problemreduktion)
    # Wörtliche Umsetzung der Vorgabe:
    # kapital(n-1) wird berechnet und um 5% verzinst
    vorher = kapital(n - 1)
    return vorher + 0.05 * vorher


def kapital_woertlich(n):
    """
    Exakte wörtliche Umsetzung der Formel aus der Aufgabenstellung:
    kapital(n) -> kapital(n-1) + 0.05 * kapital(n-1)
    Hinweis: Führt bei jedem Schritt zwei rekursive Aufrufe aus (Baumrekursion).
    """
    if n == 0:
        return 1000.0
    return kapital_woertlich(n - 1) + 0.05 * kapital_woertlich(n - 1)


def kapital_explizit(n):
    """
    Mathematische Vergleichsformel (Zinseszinsformel K_n = K_0 * (1 + p)^n)
    zur Validierung der rekursiven Ergebnisse.
    """
    return 1000.0 * (1.05 ** n)


def trace_call_stack(n, tiefe=0):
    """
    Visualisiert den rekursiven Aufrufstapel (Call Stack) und das Unwinding.
    """
    einrueckung = "  " * tiefe
    print(f"{einrueckung}--> Rufe kapital({n}) auf...")
    
    if n == 0:
        print(f"{einrueckung}<-- BASISFALL erreicht: kapital(0) = 1000.00 Euro")
        return 1000.0
    
    wert_vorher = trace_call_stack(n - 1, tiefe + 1)
    zinsen = 0.05 * wert_vorher
    ergebnis = wert_vorher + zinsen
    print(f"{einrueckung}<-- Rückgabe von kapital({n}): {wert_vorher:.2f} + {zinsen:.2f} = {ergebnis:.2f} Euro")
    return ergebnis


if __name__ == "__main__":
    print("=" * 70)
    print("Aufgabe 1: Rekursive Zinseszins-Rechnung (kapital(n))")
    print("=" * 70)
    
    # 1. Mehrere Test-Funktionsaufrufe
    test_jahre = [0, 1, 2, 3, 4, 5, 10, 15, 20]
    
    print("\n[1] Tabelle der Funktionsaufrufe:")
    print("-" * 70)
    print(f"{'Jahre n':<8} | {'kapital(n) [Rekursiv]':<23} | {'Explizite Formel':<20} | {'Differenz':<10}")
    print("-" * 70)
    for j in test_jahre:
        rek_wert = kapital(j)
        exp_wert = kapital_explizit(j)
        diff = abs(rek_wert - exp_wert)
        print(f"{j:<8} | {rek_wert:>12.2f} Euro        | {exp_wert:>12.2f} Euro       | {diff:>8.2e}")
    print("-" * 70)
    
    # 2. Visualisierung des Call Stacks für kapital(4)
    print("\n[2] Rekursionsverlauf (Call Stack Trace) für n = 4 Jahre:")
    print("-" * 70)
    trace_call_stack(4)
    print("-" * 70)
    
    # 3. Überprüfung des geforderten Beispiels kapital(5)
    print(f"\nErgebnis für das Aufgabenbeispiel kapital(5):")
    print(f"kapital(5) = {kapital(5):.2f} Euro")
    print(f"kapital(4) = {kapital(4):.2f} Euro")
    print(f"Probe: {kapital(4):.2f} + 0.05 * {kapital(4):.2f} = {kapital(4) * 1.05:.2f} Euro (exakt gleich!)")
