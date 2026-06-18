---
title: "Widerstände richtig kombinieren in 6 Schritten"
description: "Widerstände kombinieren: Reihen- und Parallelschaltung verstehen, Gesamtwiderstand berechnen, Wunschwert erreichen und Belastung prüfen – Anleitung mit Rechnern."
category: "technik"
keywords: ["widerstände kombinieren", "widerstände parallel schalten", "widerstände reihenschaltung", "gesamtwiderstand berechnen", "parallelwiderstand berechnen", "ersatzwiderstand", "widerstand löten"]
updated: "2026-06-18"
steps: ["Reihen- und Parallelschaltung unterscheiden", "Gewünschten Zielwert festlegen", "Reihenschaltung berechnen", "Parallelschaltung berechnen", "Verlustleistung prüfen", "Schaltung aufbauen und messen"]
related: ["parallelwiderstand-rechner", "ohmsches-gesetz-rechner", "watt-volt-ampere-rechner"]
draft: false
---

Manchmal gibt es einen benötigten Widerstandswert nicht als Einzelbauteil – dann kombinierst du mehrere Widerstände. Ob du sie in Reihe oder parallel schaltest, entscheidet, ob sich der Gesamtwiderstand erhöht oder verringert. Du brauchst ein paar Widerstände, ein Multimeter und etwas Grundwissen. Diese Anleitung zeigt dir die Berechnung und den sicheren Aufbau.

## Schritt 1: Reihen- und Parallelschaltung unterscheiden

In der Reihenschaltung liegen Widerstände hintereinander; der Gesamtwiderstand steigt. In der Parallelschaltung liegen sie nebeneinander; der Gesamtwiderstand sinkt unter den kleinsten Einzelwert. Welche Variante du brauchst, hängt vom Zielwert ab.

## Schritt 2: Gewünschten Zielwert festlegen

Lege fest, welchen Gesamtwiderstand deine Schaltung benötigt. Oft ergibt sich der Wert aus einer Strombegrenzung. Mit dem [Ohmsches-Gesetz-Rechner](/rechner/ohmsches-gesetz-rechner/) ermittelst du aus Spannung und gewünschtem Strom den passenden Widerstand.

## Schritt 3: Reihenschaltung berechnen

In Reihe addieren sich die Werte einfach: R_gesamt = R1 + R2 + R3. So erreichst du Werte oberhalb deiner verfügbaren Einzelwiderstände. Beachte, dass durch alle Reihenwiderstände derselbe Strom fließt.

## Schritt 4: Parallelschaltung berechnen

Bei Parallelschaltung gilt 1/R_gesamt = 1/R1 + 1/R2 + ... – das Ergebnis liegt stets unter dem kleinsten Einzelwert. Den genauen Wert liefert dir der [Parallelwiderstand-Rechner](/rechner/parallelwiderstand-rechner/), mit dem du auch unkrumme Zielwerte annäherst.

## Schritt 5: Verlustleistung prüfen

Jeder Widerstand setzt Leistung in Wärme um. Prüfe mit dem [Watt-Volt-Ampere-Rechner](/rechner/watt-volt-ampere-rechner/), ob die Belastbarkeit der einzelnen Bauteile ausreicht. In der Parallelschaltung verteilt sich die Last, in der Reihenschaltung trägt jeder Widerstand den vollen Strom.

## Schritt 6: Schaltung aufbauen und messen

Baue die Kombination spannungsfrei auf und löte oder stecke die Widerstände sauber. Miss anschließend mit dem Multimeter den Gesamtwiderstand und vergleiche ihn mit deinem berechneten Wert, um Fehler früh zu erkennen.

## Tipps

- Reale Widerstände haben Toleranzen – das gemessene Ergebnis weicht leicht von der Rechnung ab.
- Kombiniere möglichst wenige Bauteile, das reduziert Fehlerquellen und Lötstellen.
- Notiere dir die verwendete Schaltung, damit du sie später nachvollziehen kannst.

## Häufige Fragen

**Wann nutze ich Reihen-, wann Parallelschaltung?**
Reihe zum Erhöhen, Parallel zum Verringern des Gesamtwiderstands gegenüber den Einzelwerten.

**Verändert sich die Belastbarkeit durch Kombinieren?**
Ja. In Parallelschaltung teilt sich die Last auf mehrere Bauteile, was höhere Gesamtleistungen erlaubt.

**Warum stimmt mein gemessener Wert nicht exakt?**
Widerstände haben Fertigungstoleranzen. Kleine Abweichungen vom berechneten Wert sind normal.
