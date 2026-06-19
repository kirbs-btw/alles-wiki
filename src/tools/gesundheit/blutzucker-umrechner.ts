import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'blutzucker-umrechner',
  category: 'gesundheit',
  title: 'Blutzucker umrechnen (mg/dl ↔ mmol/l)',
  shortTitle: 'Blutzucker',
  description:
    'Rechne Blutzuckerwerte zwischen mg/dl und mmol/l um. Beide Maßeinheiten werden gleichzeitig angezeigt – mit Umrechnungsfaktor 18,0182.',
  keywords: [
    'blutzucker umrechnen',
    'mg/dl in mmol/l',
    'mmol/l in mg/dl',
    'blutzucker einheiten',
    'glukose umrechner',
  ],
  formula: 'mmol/l = mg/dl ÷ 18,0182  ·  mg/dl = mmol/l × 18,0182',
  inputs: [
    {
      type: 'select', id: 'richtung', label: 'Umrechnungsrichtung', default: 'mgdl',
      options: [
        { value: 'mgdl', label: 'mg/dl → mmol/l' },
        { value: 'mmol', label: 'mmol/l → mg/dl' },
      ],
    },
    { type: 'number', id: 'wert', label: 'Blutzuckerwert', default: 100, min: 0, step: 1, help: 'In der oben gewählten Ausgangseinheit.' },
  ],
  compute: (v) => {
    const wert = num(v.wert);
    const F = 18.0182;
    const ausMgdl = String(v.richtung) === 'mgdl';
    const mgdl = ausMgdl ? wert : wert * F;
    const mmol = ausMgdl ? wert / F : wert;
    return [
      ausMgdl
        ? { label: 'Ergebnis (mmol/l)', value: mmol, unit: 'mmol/l', digits: 1, primary: true }
        : { label: 'Ergebnis (mg/dl)', value: mgdl, unit: 'mg/dl', digits: 0, primary: true },
      { label: 'Wert in mg/dl', value: mgdl, unit: 'mg/dl', digits: 0 },
      { label: 'Wert in mmol/l', value: mmol, unit: 'mmol/l', digits: 1 },
    ];
  },
  intro:
    'Blutzuckerwerte werden je nach Land in unterschiedlichen Einheiten angegeben: In Deutschland sind sowohl Milligramm pro Deziliter (mg/dl) als auch Millimol pro Liter (mmol/l) gebräuchlich, im englischsprachigen Raum überwiegt mmol/l. Der Umrechnungsfaktor zwischen beiden Einheiten beträgt 18,0182 und ergibt sich aus dem Molekulargewicht der Glukose. Dieser Rechner zeigt deinen Wert immer in beiden Einheiten an.',
  howto: [
    'Umrechnungsrichtung wählen (mg/dl → mmol/l oder umgekehrt).',
    'Blutzuckerwert in der Ausgangseinheit eingeben.',
    'Ergebnis in der Zieleinheit sowie beide Werte parallel ablesen.',
  ],
  faq: [
    { q: 'Wie lautet der Umrechnungsfaktor?', a: 'Der Faktor ist 18,0182. Ein Wert in mg/dl geteilt durch 18,0182 ergibt mmol/l; ein Wert in mmol/l mal 18,0182 ergibt mg/dl.' },
    { q: 'Was bedeuten typische Werte?', a: 'Als Orientierung gelten nüchtern etwa 70–99 mg/dl (3,9–5,5 mmol/l) als normal. Konkrete Grenz- und Zielwerte sind individuell und sollten ärztlich abgeklärt werden (Stand 2026).' },
    { q: 'Warum gerade 18,0182?', a: 'Der Faktor leitet sich aus der molaren Masse der Glukose (180,16 g/mol) und der Umrechnung von Deziliter auf Liter ab.' },
  ],
  related: ['hba1c-rechner', 'zucker-tageslimit-rechner', 'cholesterin-ratio-rechner'],
  updated: '2026-06-19',
  examples: [
    {
      values: { richtung: 'mgdl', wert: 100 },
      expect: [{ label: 'Ergebnis (mmol/l)', value: 5.55, tolerance: 0.05 }],
    },
    {
      values: { richtung: 'mmol', wert: 5 },
      expect: [{ label: 'Ergebnis (mg/dl)', value: 90.09, tolerance: 0.5 }],
    },
  ],
};
