import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'effektiver-jahreszins-rechner',
  category: 'finanzen',
  title: 'Effektiver-Jahreszins-Rechner',
  shortTitle: 'Effektivzins',
  description:
    'Wandle einen nominalen Jahreszins mit unterjähriger Verzinsung in den effektiven Jahreszins um – so vergleichst du Angebote fair.',
  keywords: [
    'effektiver jahreszins rechner',
    'effektivzins berechnen',
    'nominalzins effektivzins',
    'jahreszins umrechnen',
    'effektiver zinssatz',
    'unterjährige verzinsung',
  ],
  formula: 'Effektivzins = ((1 + Nominalzins/100 / m)^m − 1) × 100; m = Verzinsungen pro Jahr',
  inputs: [
    { type: 'number', id: 'nominal', label: 'Nominalzins pro Jahr', unit: '%', default: 6, min: 0, step: 0.01 },
    {
      type: 'select', id: 'rhythmus', label: 'Verzinsung', default: '12',
      options: [
        { value: '1', label: 'jährlich' },
        { value: '2', label: 'halbjährlich' },
        { value: '4', label: 'vierteljährlich' },
        { value: '12', label: 'monatlich' },
        { value: '365', label: 'täglich' },
      ],
      help: 'Wie oft die Zinsen pro Jahr verrechnet werden.',
    },
  ],
  compute: (v) => {
    const nominal = num(v.nominal);
    const m = num(v.rhythmus, 1);
    const effektiv = (Math.pow(1 + nominal / 100 / m, m) - 1) * 100;
    const aufschlag = effektiv - nominal;
    return [
      { label: 'Effektiver Jahreszins', value: effektiv, unit: '%', digits: 3, primary: true },
      { label: 'Differenz zum Nominalzins', value: aufschlag, unit: '%-Punkte', digits: 3 },
    ];
  },
  intro:
    'Der effektive Jahreszins berücksichtigt, wie oft Zinsen innerhalb eines Jahres verrechnet werden. Wird monatlich statt jährlich verzinst, liegt der Effektivzins über dem Nominalzins. Dieser Rechner macht Angebote mit unterschiedlichen Zinsperioden vergleichbar.',
  howto: [
    'Gib den nominalen Jahreszins in Prozent ein.',
    'Wähle, wie oft pro Jahr verzinst wird.',
    'Lies den effektiven Jahreszins und die Differenz ab.',
  ],
  faq: [
    { q: 'Was ist der Unterschied zwischen Nominal- und Effektivzins?', a: 'Der Nominalzins ist der reine Jahreszins ohne Berücksichtigung der Zinsperioden. Der Effektivzins rechnet die unterjährige Zinsverrechnung mit ein und ist daher höher.' },
    { q: 'Entspricht das dem effektiven Jahreszins bei Krediten?', a: 'Dieser Rechner berücksichtigt nur den Zinseszinseffekt der Verzinsung. Der bankübliche Effektivzins nach PAngV bezieht zusätzlich Gebühren und Auszahlungstermine ein und kann abweichen.' },
    { q: 'Wann sind Nominal- und Effektivzins gleich?', a: 'Bei genau einer Verzinsung pro Jahr (jährlich) sind beide Werte identisch.' },
  ],
  related: ['zinseszinsrechner', 'kreditrechner', 'zinsrechner'],
  examples: [
    {
      values: { nominal: 6, rhythmus: '12' },
      expect: [{ label: 'Effektiver Jahreszins', value: 6.168, tolerance: 0.01 }],
    },
    {
      values: { nominal: 6, rhythmus: '1' },
      expect: [{ label: 'Effektiver Jahreszins', value: 6, tolerance: 0.001 }],
    },
  ],
  updated: '2026-06-18',
};
