import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'geschirrspueler-kosten-rechner',
  category: 'energie',
  title: 'Geschirrspüler-Kosten-Rechner',
  shortTitle: 'Geschirrspüler',
  description:
    'Berechne die Strom- und Wasserkosten deines Geschirrspülers pro Spülgang und Jahr aus Verbrauch je Spülgang, Strom- und Wasserpreis.',
  keywords: [
    'geschirrspüler kosten rechner',
    'spülmaschine stromkosten',
    'kosten pro spülgang',
    'geschirrspüler verbrauch berechnen',
    'spülmaschine kosten pro jahr',
  ],
  intro:
    'Der Geschirrspüler verbraucht pro Spülgang Strom zum Heizen und Wasser. Dieser Rechner ermittelt die Kosten pro Spülgang und pro Jahr aus dem Strom- und Wasserverbrauch je Durchgang sowie der Nutzungshäufigkeit.',
  formula: 'Kosten/Spülgang = kWh × Strompreis + Liter ÷ 1000 × Wasserpreis',
  inputs: [
    { type: 'number', id: 'kwh', label: 'Stromverbrauch pro Spülgang', unit: 'kWh', default: 0.9, min: 0, step: 0.1, help: 'Moderne Geräte im Eco-Programm ~0,7-1,0 kWh.' },
    { type: 'number', id: 'liter', label: 'Wasserverbrauch pro Spülgang', unit: 'l', default: 10, min: 0, step: 1, help: 'Effiziente Geräte ~9-12 Liter.' },
    { type: 'number', id: 'strompreis', label: 'Strompreis', unit: 'ct/kWh', default: 35, min: 0, step: 1 },
    { type: 'number', id: 'wasserpreis', label: 'Wasserpreis (inkl. Abwasser)', unit: '€/m³', default: 4, min: 0, step: 0.1 },
    { type: 'number', id: 'proWoche', label: 'Spülgänge pro Woche', unit: 'Stück', default: 5, min: 0, step: 1 },
  ],
  compute: (v) => {
    const kwh = num(v.kwh);
    const liter = num(v.liter);
    const strompreis = num(v.strompreis) / 100;
    const wasserpreis = num(v.wasserpreis);
    const proWoche = num(v.proWoche);
    const stromKosten = kwh * strompreis;
    const wasserKosten = (liter / 1000) * wasserpreis;
    const proSpuelgang = stromKosten + wasserKosten;
    const proJahr = proSpuelgang * proWoche * 52;
    return [
      { label: 'Kosten pro Spülgang', value: proSpuelgang, unit: '€', digits: 3, primary: true },
      { label: 'Kosten pro Jahr', value: proJahr, unit: '€', digits: 2 },
      { label: 'Stromanteil je Spülgang', value: stromKosten, unit: '€', digits: 3 },
      { label: 'Wasseranteil je Spülgang', value: wasserKosten, unit: '€', digits: 3 },
    ];
  },
  howto: [
    'Strom- und Wasserverbrauch pro Spülgang eintragen (Datenblatt oder Eco-Programm).',
    'Strompreis und Wasserpreis pro Kubikmeter angeben.',
    'Anzahl der Spülgänge pro Woche eingeben.',
    'Kosten pro Spülgang und pro Jahr ablesen.',
  ],
  faq: [
    { q: 'Ist Spülen mit der Maschine günstiger als von Hand?', a: 'Moderne Geschirrspüler im Eco-Programm verbrauchen oft weniger Wasser und Energie als Handspülen mit fließendem Wasser - bei voller Beladung sind sie meist günstiger.' },
    { q: 'Wie spare ich beim Geschirrspülen?', a: 'Das Eco-Programm nutzen, die Maschine immer voll beladen und Vorspülen vermeiden. Eco dauert zwar länger, verbraucht aber am wenigsten.' },
  ],
  related: ['waschmaschine-kosten-rechner', 'geraet-stromkosten-rechner', 'stromkosten-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { kwh: 0.9, liter: 10, strompreis: 35, wasserpreis: 4, proWoche: 5 },
      expect: [
        { label: 'Kosten pro Spülgang', value: 0.355, tolerance: 0.001 },
        { label: 'Kosten pro Jahr', value: 92.3, tolerance: 0.05 },
      ],
    },
  ],
};
