import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'ladekosten-vergleich-rechner',
  category: 'auto',
  title: 'Ladekosten-Vergleich E-Auto (Zuhause vs. öffentlich)',
  shortTitle: 'Ladekosten',
  description:
    'Vergleiche die Stromkosten beim Laden eines E-Autos zuhause gegenüber öffentlichen Ladesäulen – pro 100 km und pro Jahr.',
  keywords: [
    'ladekosten e-auto vergleich',
    'laden zuhause vs öffentlich',
    'stromkosten e auto rechner',
    'e-auto laden kosten pro 100 km',
    'ladekosten berechnen',
    'wallbox vs ladesäule kosten',
  ],
  formula:
    'Kosten je 100 km = Verbrauch (kWh/100 km) × Strompreis; Jahreskosten anteilig nach Lade-Aufteilung',
  intro:
    'Wo du dein E-Auto lädst, entscheidet stark über die Kosten: Heimstrom ist meist deutlich günstiger als öffentliches Laden, besonders an Schnellladesäulen. Dieser Rechner vergleicht die Kosten pro 100 km für beide Optionen und ermittelt die Jahreskosten bei einem wählbaren Anteil an Heim- und öffentlichem Laden.',
  inputs: [
    { type: 'number', id: 'verbrauch', label: 'Verbrauch', unit: 'kWh/100 km', default: 18, min: 1, step: 0.5, help: 'inkl. Ladeverluste' },
    { type: 'number', id: 'preisHeim', label: 'Strompreis zuhause', unit: 'EUR/kWh', default: 0.30, min: 0, step: 0.01 },
    { type: 'number', id: 'preisOeffentlich', label: 'Strompreis öffentlich', unit: 'EUR/kWh', default: 0.55, min: 0, step: 0.01 },
    { type: 'number', id: 'anteilHeim', label: 'Anteil Laden zuhause', unit: '%', default: 70, min: 0, max: 100, step: 5 },
    { type: 'number', id: 'jahreskm', label: 'Fahrleistung pro Jahr', unit: 'km', default: 15000, min: 0, step: 500 },
  ],
  compute: (v) => {
    const verbrauch = num(v.verbrauch);
    const preisHeim = num(v.preisHeim);
    const preisOeff = num(v.preisOeffentlich);
    const anteilHeim = Math.min(Math.max(num(v.anteilHeim), 0), 100) / 100;
    const jahreskm = num(v.jahreskm);
    const kwhPro100 = verbrauch;
    const kostenHeim100 = (kwhPro100) * preisHeim;
    const kostenOeff100 = (kwhPro100) * preisOeff;
    const mischpreis = preisHeim * anteilHeim + preisOeff * (1 - anteilHeim);
    const kostenMix100 = kwhPro100 * mischpreis;
    const kostenJahr = (kwhPro100 / 100) * jahreskm * mischpreis;
    return [
      { label: 'Kosten je 100 km (Mix)', value: kostenMix100, unit: 'EUR', digits: 2, primary: true },
      { label: 'Kosten je 100 km zuhause', value: kostenHeim100, unit: 'EUR', digits: 2 },
      { label: 'Kosten je 100 km öffentlich', value: kostenOeff100, unit: 'EUR', digits: 2 },
      { label: 'Stromkosten pro Jahr (Mix)', value: kostenJahr, unit: 'EUR', digits: 2 },
    ];
  },
  howto: [
    'Stromverbrauch je 100 km eintragen (möglichst inklusive Ladeverluste).',
    'Strompreise für zuhause und öffentliches Laden angeben.',
    'Anteil des Heimladens in Prozent wählen.',
    'Jährliche Fahrleistung ergänzen und Kosten vergleichen.',
  ],
  faq: [
    { q: 'Warum ist öffentliches Laden teurer?', a: 'Öffentliche Ladesäulen, vor allem Schnelllader, haben höhere Betriebs- und Infrastrukturkosten. Heimstrom über die eigene Wallbox ist daher meist deutlich günstiger pro Kilowattstunde.' },
    { q: 'Sind Ladeverluste berücksichtigt?', a: 'Nur, wenn du sie in den Verbrauch einrechnest. Beim Laden gehen je nach Technik rund 10 bis 20 Prozent verloren; ein Aufschlag auf den reinen Fahrverbrauch macht die Rechnung realistischer.' },
    { q: 'Lohnt sich eine Wallbox?', a: 'Bei hohem Heimladeanteil und niedrigem Haushaltsstrompreis sinken die Kosten pro 100 km spürbar. Die Anschaffungskosten der Wallbox sind in diesem Rechner nicht enthalten.' },
  ],
  related: ['elektro-vs-verbrenner-rechner', 'e-auto-ladezeit-rechner', 'winter-reichweite-rechner'],
  updated: '2026-06-19',
  examples: [
    {
      values: { verbrauch: 18, preisHeim: 0.30, preisOeffentlich: 0.55, anteilHeim: 70, jahreskm: 15000 },
      // mischpreis = 0.30*0.7 + 0.55*0.3 = 0.21 + 0.165 = 0.375 ; kostenMix100 = 18*0.375 = 6.75
      expect: [{ label: 'Kosten je 100 km (Mix)', value: 6.75, tolerance: 0.01 }],
    },
    {
      values: { verbrauch: 20, preisHeim: 0.35, preisOeffentlich: 0.60, anteilHeim: 100, jahreskm: 20000 },
      // mischpreis = 0.35 ; kostenJahr = 20/100*20000*0.35 = 4000*0.35 = 1400
      expect: [{ label: 'Stromkosten pro Jahr (Mix)', value: 1400, tolerance: 0.5 }],
    },
  ],
};
