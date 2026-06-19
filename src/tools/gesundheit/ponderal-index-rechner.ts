import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'ponderal-index-rechner',
  category: 'gesundheit',
  title: 'Ponderal-Index-Rechner',
  shortTitle: 'Ponderal-Index',
  description:
    'Berechne den Ponderal-Index (PI) aus Gewicht und Größe – eine an den BMI angelehnte Kennzahl, die für sehr große oder kleine Menschen aussagekräftiger ist.',
  keywords: [
    'ponderal index berechnen',
    'ponderal index rechner',
    'ponderaler index formel',
    'corpulence index',
    'körperindex größe gewicht',
    'ponderal index normalwert',
  ],
  formula: 'PI = Gewicht(kg) ÷ Größe(m)³',
  inputs: [
    { type: 'number', id: 'gewicht', label: 'Körpergewicht', unit: 'kg', default: 75, min: 1, step: 0.1 },
    { type: 'number', id: 'groesse', label: 'Körpergröße', unit: 'cm', default: 178, min: 1, step: 1 },
  ],
  compute: (v) => {
    const gewicht = num(v.gewicht);
    const groesseM = num(v.groesse) / 100;
    const pi = groesseM > 0 ? gewicht / (groesseM * groesseM * groesseM) : 0;
    let bewertung = 'Normalbereich';
    if (pi < 11) bewertung = 'untergewichtig (Tendenz)';
    else if (pi > 15) bewertung = 'übergewichtig (Tendenz)';
    return [
      { label: 'Ponderal-Index', value: pi, unit: 'kg/m³', digits: 1, primary: true },
      { label: 'Einordnung', value: bewertung },
    ];
  },
  intro:
    'Der Ponderal-Index (auch Rohrer-Index oder Corpulence Index) setzt das Körpergewicht ins Verhältnis zur dritten Potenz der Körpergröße. Dadurch reagiert er weniger empfindlich auf die Körpergröße als der BMI und liefert besonders bei sehr großen oder sehr kleinen Menschen sowie bei Säuglingen eine plausiblere Einordnung. Als grober Normalbereich für Erwachsene gelten etwa 11 bis 15 kg/m³. Die Einordnung ist eine Orientierung (Stand 2026).',
  howto: [
    'Körpergewicht in Kilogramm eingeben.',
    'Körpergröße in Zentimetern eingeben.',
    'Ponderal-Index und grobe Einordnung ablesen.',
  ],
  faq: [
    { q: 'Was ist der Unterschied zum BMI?', a: 'Der BMI teilt das Gewicht durch das Quadrat der Größe, der Ponderal-Index durch die dritte Potenz. Da der Körper dreidimensional wächst, schneiden sehr große oder kleine Menschen beim Ponderal-Index oft realistischer ab.' },
    { q: 'Welcher Ponderal-Index ist normal?', a: 'Für Erwachsene gilt grob ein Bereich von etwa 11 bis 15 kg/m³ als normal. Feste, breit anerkannte Grenzwerte wie beim BMI gibt es jedoch nicht.' },
    { q: 'Wann ist der Ponderal-Index sinnvoll?', a: 'Er wird vor allem bei Säuglingen und Neugeborenen sowie bei Menschen mit ungewöhnlicher Körpergröße genutzt, da der BMI hier verzerren kann.' },
  ],
  related: ['bmi-rechner', 'idealgewicht-rechner', 'koerperfettanteil-rechner'],
  updated: '2026-06-19',
  examples: [
    {
      values: { gewicht: 75, groesse: 178 },
      expect: [
        { label: 'Ponderal-Index', value: 13.3, tolerance: 0.1 },
      ],
    },
    {
      values: { gewicht: 60, groesse: 160 },
      expect: [
        { label: 'Ponderal-Index', value: 14.6, tolerance: 0.1 },
      ],
    },
  ],
};
