import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'prozentrechner',
  category: 'mathe',
  title: 'Prozentrechner',
  shortTitle: 'Prozentrechner',
  description:
    'Berechne, wie viel ein Prozentsatz von einem Wert ist – plus den um den Prozentsatz erhöhten und verminderten Wert.',
  keywords: [
    'prozentrechner',
    'prozent berechnen',
    'prozentrechnung',
    'wieviel prozent von',
    'prozentwert berechnen',
  ],
  formula: 'Prozentwert = Grundwert × Prozentsatz / 100',
  inputs: [
    { type: 'number', id: 'prozent', label: 'Prozentsatz', unit: '%', default: 20, step: 0.1 },
    { type: 'number', id: 'grundwert', label: 'Grundwert', default: 50, step: 0.1 },
  ],
  compute: (v) => {
    const p = num(v.prozent);
    const g = num(v.grundwert);
    const prozentwert = (g * p) / 100;
    return [
      { label: 'Prozentwert', value: prozentwert, digits: 2, primary: true },
      { label: 'Grundwert + Prozent', value: g + prozentwert, digits: 2 },
      { label: 'Grundwert − Prozent', value: g - prozentwert, digits: 2 },
    ];
  },
  howto: [
    'Prozentsatz eingeben (z. B. 20 für 20 %).',
    'Grundwert eingeben (der Wert, von dem die Prozent berechnet werden).',
    'Ergebnis ablesen: Prozentwert sowie der erhöhte und verminderte Wert.',
  ],
  faq: [
    { q: 'Wie viel sind 20 % von 50?', a: '50 × 20 / 100 = 10. Der Prozentwert ist also 10.' },
    { q: 'Wie ziehe ich Prozent ab?', a: 'Vom Grundwert den Prozentwert abziehen: 50 − 10 = 40. Das zeigt die Zeile „Grundwert − Prozent".' },
  ],
  updated: '2026-06-18',
  examples: [
    {
      values: { prozent: 20, grundwert: 50 },
      expect: [
        { label: 'Prozentwert', value: 10, tolerance: 0.01 },
        { label: 'Grundwert + Prozent', value: 60, tolerance: 0.01 },
      ],
    },
  ],
};
