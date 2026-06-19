import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'e-auto-ladezeit-rechner',
  category: 'auto',
  title: 'E-Auto-Ladezeit-Rechner',
  shortTitle: 'Ladezeit',
  description:
    'Berechne die Ladezeit deines Elektroautos aus Akkukapazität, Ladeleistung und Ladestand – inklusive realistischem Ladeverlust.',
  keywords: [
    'ladezeit e auto berechnen',
    'ladedauer elektroauto rechner',
    'wie lange laden e auto',
    'ladezeit akku rechner',
    'ladezeit wallbox berechnen',
  ],
  formula:
    'Ladezeit = (Kapazität × (Ziel − Start) / 100) / (Ladeleistung × Wirkungsgrad)',
  intro:
    'Wie lange dauert es, bis das Elektroauto geladen ist? Die Ladezeit hängt von der nutzbaren Akkukapazität, der tatsächlichen Ladeleistung und dem gewünschten Ladestand ab. Dieser Rechner berücksichtigt zusätzlich den Ladeverlust, der beim Laden als Wärme entsteht.',
  inputs: [
    { type: 'number', id: 'kapazitaet', label: 'Akkukapazität (nutzbar)', unit: 'kWh', default: 60, min: 1, step: 0.5, help: 'Netto-Kapazität laut Datenblatt.' },
    { type: 'number', id: 'leistung', label: 'Ladeleistung', unit: 'kW', default: 11, min: 0.1, step: 0.1, help: 'z. B. 2,3 (Schuko), 11 (Wallbox), 50–150 (Schnelllader).' },
    { type: 'number', id: 'start', label: 'Aktueller Ladestand', unit: '%', default: 20, min: 0, max: 100, step: 1 },
    { type: 'number', id: 'ziel', label: 'Ziel-Ladestand', unit: '%', default: 80, min: 0, max: 100, step: 1 },
    { type: 'number', id: 'wirkungsgrad', label: 'Ladewirkungsgrad', unit: '%', default: 90, min: 50, max: 100, step: 1, help: 'AC-Laden ca. 85–92 %, DC-Laden ca. 92–96 %.' },
  ],
  compute: (v) => {
    const kapazitaet = num(v.kapazitaet);
    const leistung = num(v.leistung);
    const start = Math.min(num(v.start), num(v.ziel));
    const ziel = Math.max(num(v.start), num(v.ziel));
    const wg = num(v.wirkungsgrad) / 100;
    const ladebedarf = (kapazitaet * (ziel - start)) / 100;
    const effektiveLeistung = leistung * wg;
    const stunden = effektiveLeistung > 0 ? ladebedarf / effektiveLeistung : 0;
    const minuten = stunden * 60;
    const aufgenommen = wg > 0 ? ladebedarf / wg : 0;
    return [
      { label: 'Ladezeit', value: stunden, unit: 'h', digits: 2, primary: true },
      { label: 'Ladezeit (Minuten)', value: minuten, unit: 'min', digits: 0 },
      { label: 'Geladene Energie (im Akku)', value: ladebedarf, unit: 'kWh', digits: 1 },
      { label: 'Aus dem Netz bezogen', value: aufgenommen, unit: 'kWh', digits: 1, help: 'Inkl. Ladeverlust – relevant für die Stromkosten.' },
    ];
  },
  howto: [
    'Nutzbare Akkukapazität deines E-Autos eintragen.',
    'Ladeleistung wählen (Steckdose, Wallbox oder Schnelllader).',
    'Aktuellen und gewünschten Ladestand in Prozent angeben.',
    'Ladewirkungsgrad anpassen – Ladezeit und Netzbezug ablesen.',
  ],
  faq: [
    { q: 'Warum lädt das Auto langsamer als die Wallbox-Leistung?', a: 'Begrenzend ist immer das schwächste Glied: der fahrzeugseitige Lader (z. B. nur 11 kW AC), die Phasenzahl oder die Hausabsicherung. Zudem geht ein Teil der Energie als Ladeverlust verloren.' },
    { q: 'Stimmt die Rechnung auch für Schnellladen (DC)?', a: 'Nur als Näherung. Beim DC-Laden sinkt die Leistung ab etwa 80 % Ladestand stark (Ladekurve), sodass die letzten Prozente überproportional lange dauern. Bis 80 % ist die Schätzung meist gut.' },
    { q: 'Warum sollte ich nur bis 80 % laden?', a: 'Häufiges Vollladen auf 100 % belastet die Batteriezellen stärker. Im Alltag schont ein Ladefenster von etwa 20–80 % die Lebensdauer und verkürzt die Ladezeit.' },
  ],
  related: ['e-auto-ladekosten-rechner', 'reichweite-rechner', 'winter-reichweite-rechner'],
  updated: '2026-06-19',
  examples: [
    {
      values: { kapazitaet: 60, leistung: 11, start: 20, ziel: 80, wirkungsgrad: 90 },
      // Ladebedarf = 60*0,6 = 36 kWh; eff. Leistung = 9,9 kW; Zeit = 3,6363... h
      expect: [{ label: 'Ladezeit', value: 3.64, tolerance: 0.02 }],
    },
    {
      values: { kapazitaet: 80, leistung: 50, start: 10, ziel: 80, wirkungsgrad: 95 },
      // Ladebedarf = 80*0,7 = 56 kWh; eff. = 47,5 kW; Zeit = 1,17894... h -> 70,7 min
      expect: [{ label: 'Ladezeit (Minuten)', value: 71, tolerance: 1 }],
    },
  ],
};
