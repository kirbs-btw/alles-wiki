import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'realzins-rechner',
  category: 'finanzen',
  title: 'Realzins-Rechner',
  shortTitle: 'Realzins',
  description:
    'Berechne den realen Zins nach Abzug der Inflation – so siehst du, ob deine Geldanlage die Kaufkraft tatsächlich erhält oder real verliert.',
  keywords: [
    'realzins rechner',
    'realzins berechnen',
    'realer zins nach inflation',
    'kaufkraft zinsen',
    'nominalzins realzins',
    'fisher gleichung rechner',
  ],
  formula: 'Realzins = (1 + Nominalzins/100) / (1 + Inflation/100) − 1, in Prozent',
  inputs: [
    { type: 'number', id: 'nominal', label: 'Nominalzins pro Jahr', unit: '%', default: 3, min: -50, step: 0.1, help: 'Der ausgewiesene Zins deiner Anlage.' },
    { type: 'number', id: 'inflation', label: 'Inflationsrate pro Jahr', unit: '%', default: 2, min: -50, step: 0.1 },
  ],
  compute: (v) => {
    const nominal = num(v.nominal);
    const inflation = num(v.inflation);
    const real = ((1 + nominal / 100) / (1 + inflation / 100) - 1) * 100;
    const naeherung = nominal - inflation;
    return [
      { label: 'Realzins', value: real, unit: '%', digits: 2, primary: true },
      { label: 'Vereinfachte Näherung', value: naeherung, unit: '%', digits: 2, help: 'Nominalzins minus Inflation (Faustformel).' },
    ];
  },
  intro:
    'Der Realzins zeigt, wie viel deine Geldanlage nach Abzug der Inflation tatsächlich an Kaufkraft hinzugewinnt. Liegt der Nominalzins unter der Inflationsrate, ist der Realzins negativ – dein Geld verliert real an Wert, obwohl der Kontostand wächst. Der Rechner nutzt die exakte Fisher-Gleichung.',
  howto: [
    'Gib den Nominalzins deiner Anlage ein.',
    'Trage die erwartete oder aktuelle Inflationsrate ein.',
    'Lies den realen Zins ab. Ein negativer Wert bedeutet realen Kaufkraftverlust.',
  ],
  faq: [
    { q: 'Was ist der Unterschied zwischen Nominal- und Realzins?', a: 'Der Nominalzins ist der ausgewiesene Zins. Der Realzins zieht die Inflation ab und zeigt den echten Kaufkraftgewinn. Nur er sagt aus, ob du real reicher wirst.' },
    { q: 'Warum die Fisher-Gleichung statt einfacher Subtraktion?', a: 'Die Faustformel Nominalzins minus Inflation ist nur eine Näherung. Die Fisher-Gleichung teilt die Wachstumsfaktoren und ist exakt, besonders bei höheren Raten.' },
    { q: 'Wann ist der Realzins negativ?', a: 'Immer dann, wenn die Inflation höher ist als der Nominalzins deiner Anlage. Dann sinkt die Kaufkraft deines Vermögens trotz positiver Zinsen.' },
  ],
  related: ['inflationsrechner', 'zinsrechner', 'tagesgeld-rechner'],
  examples: [
    {
      values: { nominal: 3, inflation: 2 },
      expect: [
        { label: 'Realzins', value: 0.98, tolerance: 0.02 },
        { label: 'Vereinfachte Näherung', value: 1, tolerance: 0.01 },
      ],
    },
    {
      values: { nominal: 1, inflation: 4 },
      expect: [{ label: 'Realzins', value: -2.88, tolerance: 0.05 }],
    },
  ],
  updated: '2026-06-18',
};
