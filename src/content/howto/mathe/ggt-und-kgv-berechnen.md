---
title: "ggT und kgV berechnen in 5 Schritten"
description: "ggT und kgV berechnen: größten gemeinsamen Teiler und kleinstes gemeinsames Vielfaches per Primfaktorzerlegung bestimmen – mit Beispiel und ggT-/kgV-Rechner."
category: "mathe"
keywords: ["ggt berechnen", "kgv berechnen", "größter gemeinsamer teiler", "kleinstes gemeinsames vielfaches", "primfaktorzerlegung", "ggt kgv beispiel"]
updated: "2026-06-18"
steps: ["Begriffe klären", "Zahlen in Primfaktoren zerlegen", "ggT bestimmen", "kgV bestimmen", "Ergebnis prüfen"]
related: ["ggt-kgv-rechner", "bruchrechner", "potenzrechner"]
draft: false
---

Der größte gemeinsame Teiler (ggT) und das kleinste gemeinsame Vielfache (kgV) tauchen vor allem beim Kürzen und Addieren von Brüchen auf. Der ggT ist die größte Zahl, durch die zwei Zahlen ohne Rest teilbar sind; das kgV ist die kleinste Zahl, die beide als Teiler enthält. Diese Anleitung nutzt die anschauliche Primfaktorzerlegung.

## Schritt 1: Begriffe klären

Beispielzahlen: 12 und 18. Der **ggT** ist die größte Zahl, die beide teilt – hier 6. Das **kgV** ist die kleinste Zahl, die ein Vielfaches beider ist – hier 36. Mach dir den Unterschied klar: ggT ist „kleiner oder gleich" den Zahlen, kgV ist „größer oder gleich" ihnen.

## Schritt 2: Zahlen in Primfaktoren zerlegen

Zerlege jede Zahl in ihre Primfaktoren. 12 = 2 · 2 · 3 = 2² · 3. 18 = 2 · 3 · 3 = 2 · 3². Teile dazu fortlaufend durch die kleinste mögliche Primzahl (2, 3, 5, 7 …), bis nur noch 1 übrig bleibt.

## Schritt 3: ggT bestimmen

Für den ggT nimmst du die **gemeinsamen** Primfaktoren mit dem **kleinsten** Exponenten. Gemeinsam sind 2 und 3: kleinster Exponent von 2 ist 2¹ (aus der 18), von 3 ist 3¹ (aus der 12). ggT = 2 · 3 = 6.

## Schritt 4: kgV bestimmen

Für das kgV nimmst du **alle** vorkommenden Primfaktoren mit dem **größten** Exponenten. Das sind 2² (aus 12) und 3² (aus 18). kgV = 2² · 3² = 4 · 9 = 36.

## Schritt 5: Ergebnis prüfen

Es gilt die praktische Kontrolle: **ggT · kgV = Produkt der beiden Zahlen**. Hier: 6 · 36 = 216 und 12 · 18 = 216 – passt. Schnell prüfst du beides mit dem [ggT-/kgV-Rechner](/rechner/ggt-kgv-rechner/).

## Tipps

- Zum Kürzen eines Bruchs teilst du Zähler und Nenner durch ihren ggT – damit ist der Bruch sofort vollständig gekürzt.
- Das kgV der Nenner ist der gemeinsame Nenner beim [Bruchrechnen](/rechner/bruchrechner/).
- Potenzen der Primfaktoren rechnest du bei Bedarf mit dem [Potenzrechner](/rechner/potenzrechner/).

## Häufige Fragen

**Wozu brauche ich ggT und kgV?**
Den ggT zum Kürzen von Brüchen, das kgV zum Finden des gemeinsamen Nenners beim Addieren und Subtrahieren von Brüchen.

**Was ist, wenn zwei Zahlen keinen gemeinsamen Teiler außer 1 haben?**
Dann ist ihr ggT = 1; man nennt sie teilerfremd. Ihr kgV ist dann einfach das Produkt der beiden Zahlen.

**Gibt es ein schnelleres Verfahren als die Primfaktorzerlegung?**
Für den ggT eignet sich der euklidische Algorithmus: Du teilst fortlaufend mit Rest, bis der Rest 0 ist – der letzte Teiler ist der ggT.
