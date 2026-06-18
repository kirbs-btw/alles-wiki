---
title: "LED-Vorwiderstand berechnen: So schützt du deine LED"
description: "Warum braucht eine LED einen Vorwiderstand und wie berechnest du ihn? Formel, Beispiel und Tipps für das richtige Bauteil – einfach erklärt."
category: "technik"
keywords: ["led vorwiderstand berechnen", "warum vorwiderstand led", "led widerstand formel", "vorwiderstand led 12v", "led an 5v anschließen", "led richtig anschließen"]
updated: "2026-06-18"
related: ["led-vorwiderstand-rechner", "ohmsches-gesetz-rechner", "watt-volt-ampere-rechner"]
draft: false
---

Wer schon einmal eine LED direkt an eine Batterie angeschlossen hat, kennt das Ergebnis: Sie leuchtet kurz hell auf und ist dann defekt. Der Grund ist ein fehlender Vorwiderstand. Dieser kleine Baustein entscheidet darüber, ob eine LED jahrelang hält oder sofort durchbrennt.

## Warum LEDs einen Vorwiderstand brauchen

Eine LED ist eine Diode und verhält sich nicht wie ein normaler Widerstand. Ab einer bestimmten Spannung, der sogenannten Durchlassspannung, beginnt sie zu leiten – und zwar fast ohne den Strom zu begrenzen. Schon kleine Spannungserhöhungen lassen den Strom stark ansteigen. Ohne Begrenzung fließt zu viel Strom, die LED überhitzt und stirbt.

Der Vorwiderstand wird in Reihe zur LED geschaltet und „verbraucht" die überschüssige Spannung. So fließt nur der Strom, für den die LED ausgelegt ist – typischerweise etwa 20 Milliampere bei Standard-LEDs.

## Die Formel

Den passenden Widerstandswert berechnet man mit einer Variante des Ohmschen Gesetzes:

**R = (Versorgungsspannung − Durchlassspannung) / LED-Strom**

Ein Beispiel: Eine rote LED mit 2 V Durchlassspannung soll an einer 5-V-Quelle mit 20 mA betrieben werden. Dann ist R = (5 V − 2 V) / 0,02 A = 150 Ω. Mit dem [LED-Vorwiderstand-Rechner](/rechner/led-vorwiderstand-rechner/) gibst du einfach die drei Werte ein und erhältst den passenden Widerstand sowie die verbrauchte Leistung.

## Durchlassspannung je nach Farbe

Die Durchlassspannung hängt von der LED-Farbe ab. Grobe Richtwerte:

- Rot: etwa 1,8 bis 2,2 V
- Grün und Gelb: etwa 2,0 bis 2,4 V
- Blau und Weiß: etwa 3,0 bis 3,4 V

Die genauen Werte stehen im Datenblatt der LED. Wer sie nicht kennt, nimmt die Richtwerte und plant etwas Reserve ein.

## Den richtigen Widerstand wählen

Berechnete Werte treffen selten genau einen handelsüblichen Widerstand. In diesem Fall wählst du den nächsthöheren Standardwert (zum Beispiel 150 Ω oder 220 Ω). Ein etwas höherer Widerstand macht die LED minimal dunkler, schützt sie aber zuverlässig.

Wichtig ist außerdem die Belastbarkeit des Widerstands. Berechne die im Widerstand umgesetzte Leistung mit P = U × I oder hilfsweise über den [Watt-Volt-Ampere-Rechner](/rechner/watt-volt-ampere-rechner/). Bei kleinen LED-Strömen reicht meist ein 0,25-Watt-Widerstand. Wer den Zusammenhang von Spannung, Strom und Widerstand vertiefen möchte, findet im [Ohmschen-Gesetz-Rechner](/rechner/ohmsches-gesetz-rechner/) das passende Werkzeug.

## Praktische Hinweise

Mehrere LEDs lassen sich in Reihe schalten – dann addieren sich ihre Durchlassspannungen, und ein einziger Vorwiderstand genügt. Bei einer Parallelschaltung braucht dagegen jede LED ihren eigenen Vorwiderstand, da sich sonst der Strom ungleich verteilt. Bei batteriebetriebenen Aufbauten solltest du beachten, dass die Spannung der Batterie mit der Entladung sinkt.

## Häufige Fragen

**Kann ich eine LED ohne Vorwiderstand betreiben?**
Nur, wenn die LED bereits einen integrierten Widerstand oder eine Konstantstromquelle besitzt (etwa bei LED-Modulen für 12 V). Eine einzelne Standard-LED braucht immer eine Strombegrenzung.

**Was passiert, wenn der Widerstand zu groß ist?**
Dann fließt weniger Strom und die LED leuchtet schwächer. Sie geht dabei nicht kaputt – ist der Wert zu klein, droht dagegen Überlastung.

**Welchen Strom soll ich für die Berechnung ansetzen?**
Üblich sind 20 mA für Standard-LEDs. Wer es heller oder dunkler möchte, kann den Wert anpassen, sollte aber den maximalen Strom aus dem Datenblatt nicht überschreiten.
