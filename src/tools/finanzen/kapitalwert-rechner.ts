import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'kapitalwert-rechner',
  category: 'finanzen',
  title: 'Kapitalwert-Rechner (NPV)',
  shortTitle: 'Kapitalwert',
  description:
    'Berechne den Kapitalwert (Net Present Value) einer Investition mit konstantem jährlichem Rückfluss – inklusive Barwert der Rückflüsse und Vorteilhaftigkeit.',
  keywords: [
    'kapitalwert rechner',
    'kapitalwert berechnen',
    'npv rechner',
    'net present value rechner',
    'investition barwertmethode',
    'kapitalwertmethode',
  ],
  formula:
    'NPV = −Investition + Σ Rückfluss/(1+i)^t für t=1..n; i = Kalkulationszins/100',
  inputs: [
    { type: 'number', id: 'invest', label: 'Anfangsinvestition', unit: '€', default: 10000, min: 0, step: 100, help: 'Auszahlung zum Zeitpunkt 0.' },
    { type: 'number', id: 'rueckfluss', label: 'Jährlicher Rückfluss', unit: '€', default: 3000, min: 0, step: 100, help: 'Konstanter Überschuss am Ende jedes Jahres.' },
    { type: 'number', id: 'zins', label: 'Kalkulationszins pro Jahr', unit: '%', default: 8, min: 0, step: 0.1 },
    { type: 'number', id: 'jahre', label: 'Nutzungsdauer', unit: 'Jahre', default: 5, min: 1, step: 1 },
  ],
  compute: (v) => {
    const invest = num(v.invest);
    const rueckfluss = num(v.rueckfluss);
    const zins = num(v.zins);
    const jahre = Math.round(num(v.jahre));
    const i = zins / 100;
    let barwertRueck = 0;
    if (i > 0) {
      const af = (1 - Math.pow(1 + i, -jahre)) / i;
      barwertRueck = rueckfluss * af;
    } else {
      barwertRueck = rueckfluss * jahre;
    }
    const npv = barwertRueck - invest;
    return [
      { label: 'Kapitalwert (NPV)', value: npv, unit: '€', digits: 2, primary: true },
      { label: 'Barwert der Rückflüsse', value: barwertRueck, unit: '€', digits: 2 },
      { label: 'Beurteilung', value: npv >= 0 ? 'vorteilhaft (NPV ≥ 0)' : 'nicht vorteilhaft (NPV < 0)' },
    ];
  },
  intro:
    'Der Kapitalwert (Net Present Value, NPV) ist das zentrale Maß der Investitionsrechnung. Er summiert die auf heute abgezinsten künftigen Rückflüsse und zieht die Anfangsinvestition ab. Ist der Kapitalwert größer oder gleich null, verzinst sich die Investition mindestens zum Kalkulationszins und gilt als vorteilhaft. Dieser Rechner nutzt einen konstanten jährlichen Rückfluss (nachschüssig, am Jahresende).',
  howto: [
    'Gib die Anfangsinvestition zum Zeitpunkt 0 ein.',
    'Trage den konstanten jährlichen Rückfluss ein.',
    'Lege den Kalkulationszins (geforderte Mindestrendite) fest.',
    'Wähle die Nutzungsdauer und lies den Kapitalwert ab.',
  ],
  faq: [
    { q: 'Wann ist eine Investition vorteilhaft?', a: 'Wenn der Kapitalwert größer oder gleich null ist. Dann übersteigt der Barwert der Rückflüsse die Investition, und die Anlage verzinst sich mindestens zum Kalkulationszins.' },
    { q: 'Was unterscheidet NPV vom Barwert?', a: 'Der Barwert zinst einzelne künftige Zahlungen ab. Der Kapitalwert summiert die Barwerte aller Rückflüsse und zieht zusätzlich die Anfangsinvestition ab.' },
    { q: 'Was bedeutet konstanter Rückfluss?', a: 'Der Rechner geht von jedes Jahr gleich hohen Überschüssen aus (nachschüssige Rente). Unregelmäßige Zahlungsreihen müssen einzeln abgezinst werden.' },
  ],
  related: ['barwert-rechner', 'rendite-rechner', 'zinseszinsrechner'],
  examples: [
    {
      values: { invest: 10000, rueckfluss: 3000, zins: 8, jahre: 5 },
      expect: [
        { label: 'Kapitalwert (NPV)', value: 1978.13, tolerance: 1 },
        { label: 'Barwert der Rückflüsse', value: 11978.13, tolerance: 1 },
      ],
    },
  ],
  updated: '2026-06-19',
};
