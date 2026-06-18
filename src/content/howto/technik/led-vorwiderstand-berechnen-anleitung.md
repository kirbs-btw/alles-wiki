---
title: "LED-Vorwiderstand berechnen und anschließen in 6 Schritten"
description: "LED-Vorwiderstand berechnen: Spannung, Strom und Flussspannung bestimmen, Widerstand per Ohmschem Gesetz ermitteln und LED korrekt anschließen – Anleitung mit Rechner."
category: "technik"
keywords: ["led vorwiderstand berechnen", "vorwiderstand led", "led anschließen", "ohmsches gesetz led", "widerstand berechnen led", "led strom begrenzen", "led schaltung"]
updated: "2026-06-18"
steps: ["LED-Daten aus dem Datenblatt ablesen", "Versorgungsspannung festlegen", "Vorwiderstand berechnen", "Standard-Widerstandswert wählen", "Verlustleistung des Widerstands prüfen", "LED und Widerstand korrekt anschließen"]
related: ["led-vorwiderstand-rechner", "ohmsches-gesetz-rechner", "watt-volt-ampere-rechner"]
draft: false
---

Eine LED direkt an die Spannung anzuschließen, zerstört sie meist sofort – sie braucht einen Vorwiderstand, der den Strom begrenzt. Die Berechnung ist mit dem Ohmschen Gesetz schnell erledigt. Du brauchst die Kenndaten deiner LED, die Versorgungsspannung und einen passenden Widerstand. Diese Anleitung führt dich durch Rechnung und Aufbau.

## Schritt 1: LED-Daten aus dem Datenblatt ablesen

Notiere die Durchlassspannung (Flussspannung, U_F) und den empfohlenen Durchlassstrom (I_F) deiner LED. Rote LEDs haben oft rund 1,8 bis 2,2 Volt, blaue und weiße eher 3,0 bis 3,4 Volt. Der typische Strom liegt häufig bei etwa 20 Milliampere – verlasse dich aber auf das Datenblatt.

## Schritt 2: Versorgungsspannung festlegen

Bestimme die Spannung deiner Quelle, etwa 5 Volt vom USB-Anschluss oder 12 Volt aus einem Netzteil. Die Differenz zwischen Versorgungsspannung und Flussspannung der LED muss der Vorwiderstand aufnehmen.

## Schritt 3: Vorwiderstand berechnen

Der Widerstand ergibt sich aus R = (U_Quelle − U_F) / I_F. Den genauen Wert liefert dir der [LED-Vorwiderstand-Rechner](/rechner/led-vorwiderstand-rechner/). Wer das Prinzip dahinter nachvollziehen will, nutzt zusätzlich den [Ohmsches-Gesetz-Rechner](/rechner/ohmsches-gesetz-rechner/).

## Schritt 4: Standard-Widerstandswert wählen

Selten passt das Ergebnis exakt auf einen erhältlichen Wert. Runde aus Sicherheitsgründen auf den nächsthöheren Standardwert auf. Ein etwas größerer Widerstand führt zu geringfügig weniger Helligkeit, schützt die LED aber zuverlässig.

## Schritt 5: Verlustleistung des Widerstands prüfen

Der Widerstand setzt Energie in Wärme um. Berechne die Leistung mit P = U × I, damit du eine Bauform mit ausreichender Belastbarkeit wählst. Der [Watt-Volt-Ampere-Rechner](/rechner/watt-volt-ampere-rechner/) hilft dir dabei. Ein gängiger 0,25-Watt-Widerstand reicht für kleine LEDs meist aus.

## Schritt 6: LED und Widerstand korrekt anschließen

Beachte die Polung: Das längere Beinchen (Anode) gehört an Plus, das kürzere (Kathode) an Minus. Der Vorwiderstand kann auf der Plus- oder Minusseite in Reihe liegen. Schließe alles spannungsfrei zusammen und schalte erst dann ein.

## Tipps

- Bei mehreren LEDs in Reihe addieren sich die Flussspannungen – die Versorgungsspannung muss höher liegen.
- Verlasse dich nicht auf Faustwerte, wenn das Datenblatt verfügbar ist.
- Ein leicht überdimensionierter Widerstand schont die LED und kostet kaum Helligkeit.

## Häufige Fragen

**Kann ich eine LED ohne Vorwiderstand betreiben?**
In der Regel nicht. Ohne Strombegrenzung fließt zu viel Strom und die LED wird sofort zerstört.

**Auf welcher Seite gehört der Vorwiderstand?**
Das ist elektrisch egal – er muss nur in Reihe mit der LED liegen.

**Was passiert mit der Helligkeit, wenn der Widerstand größer ist?**
Der Strom sinkt und die LED leuchtet etwas schwächer, bleibt aber sicher betrieben.
