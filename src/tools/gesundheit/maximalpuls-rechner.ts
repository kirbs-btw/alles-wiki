import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'maximalpuls-rechner',
  category: 'gesundheit',
  title: 'Maximalpuls-Rechner',
  shortTitle: 'Maximalpuls',
  description:
    'Schätze deinen maximalen Herzfrequenzwert (HFmax) aus deinem Alter – nach der klassischen Faustformel und der genaueren Tanaka-Formel.',
  keywords: [
    'maximalpuls rechner',
    'maximale herzfrequenz berechnen',
    'hfmax rechner',
    'maximaler puls alter',
    'tanaka formel',
    'maxpuls berechnen',
  ],
  formula:
    'Faustformel: HFmax = 220 − Alter; Tanaka: HFmax = 208 − 0,7 × Alter',
  inputs: [
    { type: 'number', id: 'alter', label: 'Alter', unit: 'Jahre', default: 35, min: 1, max: 120, step: 1 },
  ],
  compute: (v) => {
    const alter = num(v.alter);
    const faustformel = 220 - alter;
    const tanaka = 208 - 0.7 * alter;
    return [
      { label: 'Maximalpuls (Faustformel)', value: faustformel, unit: 'Schläge/min', digits: 0, primary: true },
      { label: 'Maximalpuls (Tanaka)', value: tanaka, unit: 'Schläge/min', digits: 0 },
    ];
  },
  intro:
    'Der Maximalpuls (HFmax) ist die höchste Herzfrequenz, die dein Herz bei maximaler Belastung erreicht. Er dient als Bezugsgröße für die Festlegung von Trainingsbereichen. Die bekannte Faustformel „220 minus Alter" ist einfach, aber ungenau. Die Tanaka-Formel von 2001 gilt als genauer. Den exakten Wert ermittelt nur ein Belastungstest.',
  howto: [
    'Dein Alter in Jahren eingeben.',
    'Geschätzten Maximalpuls nach Faustformel und Tanaka ablesen.',
    'Den Wert als Basis für deine Trainingspuls-Berechnung verwenden.',
  ],
  faq: [
    { q: 'Wie genau ist die Formel 220 minus Alter?', a: 'Sie ist eine grobe Schätzung mit großer Streuung von oft mehr als 10 Schlägen pro Minute. Die Tanaka-Formel liefert im Durchschnitt genauere Werte, besonders bei älteren Menschen.' },
    { q: 'Wie ermittle ich meinen echten Maximalpuls?', a: 'Nur ein ärztlich überwachter Belastungstest oder ein intensiver Feldtest unter Vorsicht liefert den individuellen Wert. Formeln bleiben Näherungen.' },
    { q: 'Wofür brauche ich den Maximalpuls?', a: 'Er ist die Grundlage für die Berechnung von Trainingszonen, etwa nach der prozentualen Methode oder der Karvonen-Formel.' },
  ],
  related: ['trainingspuls-rechner', 'kalorienverbrauch-rechner', 'vo2max-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { alter: 35 },
      expect: [
        { label: 'Maximalpuls (Faustformel)', value: 185, tolerance: 0.5 },
        { label: 'Maximalpuls (Tanaka)', value: 183.5, tolerance: 0.5 },
      ],
    },
    {
      values: { alter: 50 },
      expect: [
        { label: 'Maximalpuls (Faustformel)', value: 170, tolerance: 0.5 },
        { label: 'Maximalpuls (Tanaka)', value: 173, tolerance: 0.5 },
      ],
    },
  ],
};
