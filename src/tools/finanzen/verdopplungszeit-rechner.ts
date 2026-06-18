import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'verdopplungszeit-rechner',
  category: 'finanzen',
  title: 'Verdopplungszeit-Rechner (72er-Regel)',
  shortTitle: 'Verdopplungszeit',
  description:
    'Berechne, nach wie vielen Jahren sich dein Kapital bei einem festen Zinssatz verdoppelt – exakt und als Faustformel mit der 72er-Regel.',
  keywords: [
    'verdopplungszeit rechner',
    '72er regel',
    'kapital verdoppeln zinsen',
    'wann verdoppelt sich geld',
    'verdopplung kapital berechnen',
    'zinssatz verdopplung',
  ],
  formula: 'Exakt: Jahre = ln(2) / ln(1 + Zins/100); Faustformel: Jahre ≈ 72 / Zins',
  inputs: [
    { type: 'number', id: 'zins', label: 'Zinssatz pro Jahr', unit: '%', default: 6, min: 0.01, step: 0.1 },
  ],
  compute: (v) => {
    const zins = num(v.zins);
    const i = zins / 100;
    const exakt = i > 0 ? Math.log(2) / Math.log(1 + i) : 0;
    const regel72 = zins > 0 ? 72 / zins : 0;
    return [
      { label: 'Verdopplungszeit (exakt)', value: exakt, unit: 'Jahre', digits: 1, primary: true },
      { label: 'Faustformel (72er-Regel)', value: regel72, unit: 'Jahre', digits: 1 },
    ];
  },
  intro:
    'Wie lange dauert es, bis sich dein angelegtes Kapital durch Zinseszins verdoppelt? Dieser Rechner liefert die exakte Verdopplungszeit und vergleicht sie mit der bekannten 72er-Regel – einer Faustformel, mit der du die Verdopplungszeit im Kopf abschätzen kannst.',
  howto: [
    'Gib den jährlichen Zinssatz bzw. die erwartete Rendite ein.',
    'Lies die exakte Verdopplungszeit ab.',
    'Vergleiche sie mit der Schätzung nach der 72er-Regel.',
  ],
  faq: [
    { q: 'Was ist die 72er-Regel?', a: 'Eine Faustformel: Teilst du 72 durch den Zinssatz in Prozent, erhältst du näherungsweise die Jahre bis zur Verdopplung. Bei 6 % sind das etwa 12 Jahre.' },
    { q: 'Wie genau ist die Faustformel?', a: 'Für übliche Zinssätze von 4 bis 12 % ist sie sehr genau. Bei sehr hohen oder sehr niedrigen Sätzen weicht sie etwas stärker vom exakten Wert ab.' },
    { q: 'Gilt das nur für Geldanlagen?', a: 'Nein, das Prinzip gilt für jedes exponentielle Wachstum – auch zur Abschätzung, wie schnell die Inflation die Kaufkraft halbiert.' },
  ],
  related: ['zinseszinsrechner', 'inflationsrechner', 'aktienrendite-pa-rechner'],
  examples: [
    {
      values: { zins: 6 },
      expect: [
        { label: 'Verdopplungszeit (exakt)', value: 11.9, tolerance: 0.1 },
        { label: 'Faustformel (72er-Regel)', value: 12, tolerance: 0.01 },
      ],
    },
  ],
  updated: '2026-06-18',
};
