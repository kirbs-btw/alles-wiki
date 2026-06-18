import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'stundenlohn-rechner',
  category: 'beruf',
  title: 'Stundenlohn-Rechner',
  shortTitle: 'Stundenlohn',
  description:
    'Rechne dein Monatsgehalt in den Stundenlohn um – aus Brutto-Monatslohn und wöchentlicher Arbeitszeit.',
  keywords: [
    'stundenlohn rechner',
    'stundenlohn berechnen',
    'monatslohn in stundenlohn',
    'gehalt pro stunde',
    'stundensatz berechnen',
  ],
  formula: 'Stundenlohn = Monatslohn / (Wochenstunden × 4,33)',
  inputs: [
    { type: 'number', id: 'monatslohn', label: 'Monatslohn', unit: '€', default: 3000, min: 0, step: 50 },
    { type: 'number', id: 'wochenstunden', label: 'Wochenarbeitszeit', unit: 'h', default: 40, min: 1, step: 0.5 },
  ],
  compute: (v) => {
    const monatslohn = num(v.monatslohn);
    const wochenstunden = num(v.wochenstunden);
    const monatsstunden = wochenstunden * 4.33;
    const stundenlohn = monatsstunden > 0 ? monatslohn / monatsstunden : 0;
    return [
      { label: 'Stundenlohn', value: stundenlohn, unit: '€', digits: 2, primary: true },
      { label: 'Monatsstunden', value: monatsstunden, unit: 'h', digits: 1 },
      { label: 'Jahreslohn', value: monatslohn * 12, unit: '€', digits: 2 },
    ];
  },
  howto: [
    'Brutto-Monatslohn eingeben.',
    'Wöchentliche Arbeitszeit eintragen.',
    'Stundenlohn ablesen (gerechnet mit durchschnittlich 4,33 Wochen pro Monat).',
  ],
  faq: [
    { q: 'Warum 4,33 Wochen pro Monat?', a: '52 Wochen / 12 Monate = 4,33. So wird der Monatslohn fair auf die durchschnittlichen Monatsstunden umgelegt.' },
  ],
  updated: '2026-06-18',
  examples: [
    {
      values: { monatslohn: 3000, wochenstunden: 40 },
      expect: [{ label: 'Stundenlohn', value: 17.32, tolerance: 0.05 }],
    },
  ],
};
