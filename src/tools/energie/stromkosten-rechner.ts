import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'stromkosten-rechner',
  category: 'energie',
  title: 'Stromkosten-Rechner',
  shortTitle: 'Stromkosten',
  description:
    'Berechne deine jährlichen und monatlichen Stromkosten aus Jahresverbrauch, Strompreis und Grundgebühr.',
  keywords: [
    'stromkosten rechner',
    'stromkosten berechnen',
    'stromverbrauch kosten',
    'strompreis rechner',
    'jahresstromkosten',
  ],
  formula: 'Kosten = Verbrauch × Preis + Grundgebühr',
  inputs: [
    { type: 'number', id: 'verbrauch', label: 'Jahresverbrauch', unit: 'kWh', default: 2500, min: 0, step: 50 },
    { type: 'number', id: 'preis', label: 'Arbeitspreis', unit: '€/kWh', default: 0.35, min: 0, step: 0.01 },
    { type: 'number', id: 'grundgebuehr', label: 'Grundgebühr', unit: '€/Jahr', default: 100, min: 0, step: 1 },
  ],
  compute: (v) => {
    const verbrauch = num(v.verbrauch);
    const preis = num(v.preis);
    const grund = num(v.grundgebuehr);
    const jahr = verbrauch * preis + grund;
    return [
      { label: 'Stromkosten pro Jahr', value: jahr, unit: '€', digits: 2, primary: true },
      { label: 'Stromkosten pro Monat', value: jahr / 12, unit: '€', digits: 2 },
    ];
  },
  howto: [
    'Jahresverbrauch in kWh eintragen (steht auf der Stromrechnung; 1-Personen-Haushalt ~1500, Familie ~4000).',
    'Arbeitspreis pro kWh und jährliche Grundgebühr eingeben.',
    'Jahres- und Monatskosten ablesen.',
  ],
  faq: [
    { q: 'Was ist ein normaler Stromverbrauch?', a: 'Grobe Richtwerte pro Jahr: 1 Person ~1.500 kWh, 2 Personen ~2.500 kWh, 4 Personen ~4.000 kWh.' },
  ],
  related: ['spritkosten-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { verbrauch: 2500, preis: 0.35, grundgebuehr: 100 },
      expect: [{ label: 'Stromkosten pro Jahr', value: 975, tolerance: 0.01 }],
    },
  ],
};
