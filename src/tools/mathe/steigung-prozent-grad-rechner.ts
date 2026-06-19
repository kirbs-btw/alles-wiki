import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'steigung-prozent-grad-rechner',
  category: 'mathe',
  title: 'Steigung umrechnen – Prozent ↔ Grad (Gefälle & Neigung)',
  shortTitle: 'Steigung % ↔ °',
  description:
    'Rechne eine Steigung oder ein Gefälle zwischen Prozent (%) und Grad (°) um. Mit Höhenunterschied je 100 m Strecke – für Straßen, Rampen, Dächer und Wege.',
  keywords: [
    'steigung prozent in grad',
    'grad in prozent steigung',
    'gefälle umrechnen',
    'neigung rechner',
    'steigung berechnen',
    'rampe steigung',
  ],
  formula: 'Grad = arctan(Prozent/100) · 180/π ; Prozent = tan(Grad · π/180) · 100',
  intro:
    'Die Steigung gibt an, wie stark eine Strecke ansteigt. In Prozent ist es der Höhenunterschied geteilt durch die horizontale Strecke (10 % = 10 m Höhe je 100 m). In Grad ist es der Neigungswinkel gegenüber der Waagerechten. Beide hängen über den Tangens zusammen. Der Rechner wandelt in beide Richtungen um.',
  inputs: [
    { type: 'number', id: 'wert', label: 'Steigung', default: 10, step: 0.1 },
    {
      type: 'select',
      id: 'richtung',
      label: 'Umrechnungsrichtung',
      default: 'prozent2grad',
      options: [
        { value: 'prozent2grad', label: 'Prozent (%) → Grad (°)' },
        { value: 'grad2prozent', label: 'Grad (°) → Prozent (%)' },
      ],
    },
  ],
  compute: (v) => {
    const wert = num(v.wert);
    const richtung = String(v.richtung);
    if (richtung === 'prozent2grad') {
      const grad = (Math.atan(wert / 100) * 180) / Math.PI;
      return [
        { label: 'Neigungswinkel', value: grad, unit: '°', digits: 4, primary: true },
        { label: 'Steigung in Prozent', value: wert, unit: '%', digits: 2 },
        { label: 'Höhe je 100 m Strecke', value: wert, unit: 'm', digits: 2, help: 'Höhenunterschied auf 100 m horizontaler Strecke.' },
      ];
    }
    const grad = wert;
    const prozent = Math.tan((grad * Math.PI) / 180) * 100;
    return [
      { label: 'Steigung in Prozent', value: prozent, unit: '%', digits: 4, primary: true },
      { label: 'Neigungswinkel', value: grad, unit: '°', digits: 2 },
      { label: 'Höhe je 100 m Strecke', value: prozent, unit: 'm', digits: 2, help: 'Höhenunterschied auf 100 m horizontaler Strecke.' },
    ];
  },
  howto: [
    'Gib den Steigungswert ein (Prozent oder Grad).',
    'Wähle die Umrechnungsrichtung.',
    'Lies den Winkel bzw. Prozentwert und den Höhenunterschied je 100 m ab.',
  ],
  faq: [
    {
      q: 'Wie rechne ich Prozent in Grad um?',
      a: 'Du nimmst den Arkustangens des Prozentwerts geteilt durch 100: Grad = arctan(%/100). Beispiel: 10 % ≈ 5,71°.',
    },
    {
      q: 'Warum sind 100 % nicht gleich 90°?',
      a: '100 % Steigung bedeutet, dass die Strecke pro horizontalem Meter um einen Meter ansteigt – das ist ein Winkel von genau 45°. Erst eine senkrechte Wand hätte 90°, was unendlich viel Prozent entspräche.',
    },
    {
      q: 'Was bedeutet 12 % Gefälle bei Verkehrsschildern?',
      a: 'Auf 100 m horizontaler Strecke geht es 12 m bergab. Das entspricht einem Winkel von rund 6,84°.',
    },
  ],
  related: ['grad-bogenmass-umrechner', 'rechtwinkliges-dreieck-rechner', 'prozentrechner'],
  updated: '2026-06-19',
  examples: [
    {
      values: { wert: 100, richtung: 'prozent2grad' },
      expect: [{ label: 'Neigungswinkel', value: 45, tolerance: 0.0001 }],
    },
    {
      values: { wert: 45, richtung: 'grad2prozent' },
      expect: [{ label: 'Steigung in Prozent', value: 100, tolerance: 0.0001 }],
    },
  ],
};
