import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'waschmaschine-kosten-rechner',
  category: 'energie',
  title: 'Waschmaschine-Kosten-Rechner',
  shortTitle: 'Waschmaschine',
  description:
    'Berechne die Strom- und Wasserkosten deiner Waschmaschine pro Waschgang, Monat und Jahr aus Verbrauch pro Waschgang und Anzahl der Waschladungen.',
  keywords: [
    'waschmaschine kosten rechner',
    'kosten pro waschgang',
    'waschmaschine stromkosten',
    'waschen kosten berechnen',
    'wasser strom waschmaschine',
  ],
  intro:
    'Dieser Rechner ermittelt die Kosten pro Waschgang aus Strom- und Wasserverbrauch sowie die jährlichen Kosten anhand der Waschladungen pro Woche. So siehst du, was Wäschewaschen wirklich kostet.',
  formula: 'Kosten/Waschgang = kWh × Strompreis + Liter ÷ 1000 × Wasserpreis',
  inputs: [
    { type: 'number', id: 'kwh', label: 'Stromverbrauch pro Waschgang', unit: 'kWh', default: 0.8, min: 0, step: 0.1, help: 'Moderne Maschinen ~0,5-1,0 kWh je nach Programm.' },
    { type: 'number', id: 'liter', label: 'Wasserverbrauch pro Waschgang', unit: 'l', default: 50, min: 0, step: 1, help: 'Typisch 40-60 Liter pro Waschladung.' },
    { type: 'number', id: 'strompreis', label: 'Strompreis', unit: 'ct/kWh', default: 35, min: 0, step: 1 },
    { type: 'number', id: 'wasserpreis', label: 'Wasserpreis (inkl. Abwasser)', unit: '€/m³', default: 4, min: 0, step: 0.1, help: 'Frisch- plus Abwasserpreis pro Kubikmeter.' },
    { type: 'number', id: 'proWoche', label: 'Waschgänge pro Woche', unit: 'Stück', default: 4, min: 0, step: 1 },
  ],
  compute: (v) => {
    const kwh = num(v.kwh);
    const liter = num(v.liter);
    const strompreis = num(v.strompreis) / 100;
    const wasserpreis = num(v.wasserpreis);
    const proWoche = num(v.proWoche);
    const stromKosten = kwh * strompreis;
    const wasserKosten = (liter / 1000) * wasserpreis;
    const proWaschgang = stromKosten + wasserKosten;
    const proJahr = proWaschgang * proWoche * 52;
    return [
      { label: 'Kosten pro Waschgang', value: proWaschgang, unit: '€', digits: 3, primary: true },
      { label: 'Kosten pro Jahr', value: proJahr, unit: '€', digits: 2 },
      { label: 'Stromanteil je Waschgang', value: stromKosten, unit: '€', digits: 3 },
      { label: 'Wasseranteil je Waschgang', value: wasserKosten, unit: '€', digits: 3 },
    ];
  },
  howto: [
    'Strom- und Wasserverbrauch pro Waschgang eintragen (Datenblatt oder Messung).',
    'Strompreis und Wasserpreis pro Kubikmeter eingeben.',
    'Anzahl der Waschgänge pro Woche angeben.',
    'Kosten pro Waschgang und pro Jahr ablesen.',
  ],
  faq: [
    { q: 'Wie viel kostet ein Waschgang?', a: 'Je nach Programm und Preisen liegen die Kosten meist zwischen 30 und 60 Cent pro Waschgang, inklusive Wasser.' },
    { q: 'Wie spare ich beim Waschen?', a: 'Niedrigere Temperaturen, volle Beladung und Eco-Programme senken den Stromverbrauch deutlich. 30 °C reicht für leicht verschmutzte Wäsche oft aus.' },
  ],
  related: ['trockner-kosten-rechner', 'geraet-stromkosten-rechner', 'stromkosten-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { kwh: 0.8, liter: 50, strompreis: 35, wasserpreis: 4, proWoche: 4 },
      expect: [
        { label: 'Kosten pro Waschgang', value: 0.48, tolerance: 0.001 },
        { label: 'Kosten pro Jahr', value: 99.84, tolerance: 0.05 },
      ],
    },
  ],
};
