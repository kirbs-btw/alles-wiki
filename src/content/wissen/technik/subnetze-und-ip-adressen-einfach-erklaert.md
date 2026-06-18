---
title: "Subnetze und IP-Adressen einfach erklärt"
description: "Was ist eine IP-Adresse und wozu dient eine Subnetzmaske? Subnetting, CIDR und Netzwerkbereiche verständlich erklärt – ohne Fachchinesisch."
category: "technik"
keywords: ["subnetz einfach erklärt", "was ist eine ip adresse", "subnetzmaske erklärt", "subnetting für anfänger", "cidr erklärt", "ip adresse aufbau"]
updated: "2026-06-18"
related: ["subnetz-rechner", "zahlensystem-umrechner", "bit-byte-umrechner"]
draft: false
---

Jedes Gerät in einem Netzwerk – vom Smartphone bis zum Drucker – hat eine IP-Adresse. Damit Geräte sich finden und Daten gezielt verschickt werden können, teilt man Netzwerke in Subnetze auf. Die Begriffe wirken zunächst kompliziert, lassen sich aber gut auf Alltagsbeispiele übertragen.

## Was ist eine IP-Adresse?

Eine **IP-Adresse** ist die eindeutige Kennung eines Geräts im Netzwerk – vergleichbar mit einer Hausanschrift. Die heute noch weit verbreitete Version IPv4 besteht aus vier Zahlen zwischen 0 und 255, getrennt durch Punkte, etwa 192.168.1.10.

Jede dieser vier Zahlen entspricht 8 Bit, zusammen also 32 Bit. Computer verarbeiten die Adresse intern als Binärzahl. Wer sehen möchte, wie eine Dezimalzahl im Binärsystem aussieht, kann das mit dem [Zahlensystem-Umrechner](/rechner/zahlensystem-umrechner/) ausprobieren.

## Netzanteil und Hostanteil

Eine IP-Adresse besteht aus zwei Teilen: Der **Netzanteil** bestimmt, zu welchem Netzwerk ein Gerät gehört, der **Hostanteil** identifiziert das einzelne Gerät innerhalb dieses Netzes. Im Hausanschrift-Vergleich entspricht der Netzanteil der Straße und der Hostanteil der Hausnummer.

Welcher Teil der Adresse zum Netz gehört, legt die Subnetzmaske fest.

## Die Subnetzmaske und CIDR

Die **Subnetzmaske** (zum Beispiel 255.255.255.0) markiert, wie viele Bit zum Netzanteil gehören. Moderner ist die CIDR-Schreibweise mit einem Schrägstrich: /24 bedeutet, dass die ersten 24 Bit das Netz beschreiben und die restlichen 8 Bit für Geräte zur Verfügung stehen.

Aus der Maske ergibt sich, wie viele Geräte in ein Subnetz passen. Bei /24 sind das rechnerisch 256 Adressen, von denen zwei für Netzadresse und Broadcast reserviert sind – es bleiben 254 nutzbare Adressen. Der [Subnetz-Rechner](/rechner/subnetz-rechner/) ermittelt diese Werte automatisch, inklusive Netzadresse, Broadcast und nutzbarem Bereich.

## Wozu Subnetting?

Subnetting teilt ein großes Netzwerk in kleinere, logisch getrennte Bereiche. Das hat mehrere Vorteile:

- **Ordnung:** Abteilungen, Gebäude oder Gerätetypen lassen sich trennen.
- **Sicherheit:** Bereiche können voneinander abgeschottet werden.
- **Leistung:** Weniger Geräte pro Segment bedeuten weniger Datenverkehr im selben Bereich.

In typischen Heimnetzen kümmert sich der Router meist automatisch um die Adressvergabe per DHCP, sodass man sich um Subnetting selten kümmern muss.

## Praktische Hinweise

Adressbereiche wie 192.168.x.x oder 10.x.x.x sind für private Netze reserviert und tauchen im Internet nicht direkt auf. Möchtest du in deinem Heimnetz feste IP-Adressen vergeben, müssen sie im selben Subnetz wie der Router liegen und dürfen sich nicht mit dem DHCP-Bereich überschneiden. Da Subnetzberechnungen viel mit Bit zu tun haben, hilft auch der [Bit-Byte-Umrechner](/rechner/bit-byte-umrechner/) beim Verständnis der Größenordnungen.

## Häufige Fragen

**Was bedeutet /24 bei einer IP-Adresse?**
Die Zahl gibt an, wie viele Bit zum Netzanteil gehören. /24 entspricht der Subnetzmaske 255.255.255.0 und bietet 254 nutzbare Geräteadressen.

**Warum kann ich nicht alle Adressen eines Subnetzes vergeben?**
Zwei Adressen pro Subnetz sind reserviert: die Netzadresse (erste Adresse) und die Broadcast-Adresse (letzte Adresse). Sie stehen Geräten nicht zur Verfügung.

**Was ist der Unterschied zwischen IPv4 und IPv6?**
IPv4 nutzt 32 Bit und stößt wegen der begrenzten Adresszahl an Grenzen. IPv6 verwendet 128 Bit und stellt damit praktisch unbegrenzt viele Adressen bereit.
