import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'idealgewicht-rechner',
  category: 'gesundheit',
  title: 'Idealgewicht-Rechner (Broca)',
  shortTitle: 'Idealgewicht',
  description:
    'Berechne Normalgewicht und Idealgewicht nach der Broca-Formel aus deiner Körpergröße – mit getrennten Werten für Männer und Frauen.',
  keywords: [
    'idealgewicht rechner',
    'idealgewicht berechnen',
    'broca formel',
    'normalgewicht berechnen',
    'wunschgewicht',
    'normalgewicht größe',
    'idealgewicht tabelle',
  ],
  formula:
    'Normalgewicht = Größe(cm) − 100; Idealgewicht = Normalgewicht − 10 % (Mann) bzw. − 15 % (Frau)',
  inputs: [
    { type: 'number', id: 'groesse', label: 'Größe', unit: 'cm', default: 178, min: 100, max: 250, step: 1 },
    {
      type: 'select', id: 'geschlecht', label: 'Geschlecht', default: 'mann',
      options: [
        { value: 'mann', label: 'Männlich (−10 %)' },
        { value: 'frau', label: 'Weiblich (−15 %)' },
      ],
    },
  ],
  compute: (v) => {
    const h = num(v.groesse);
    const normal = h - 100;
    const normalSafe = normal > 0 ? normal : 0;
    const abschlag = String(v.geschlecht) === 'frau' ? 0.15 : 0.1;
    const ideal = normalSafe * (1 - abschlag);
    return [
      { label: 'Idealgewicht (Broca)', value: ideal, unit: 'kg', digits: 1, primary: true },
      { label: 'Normalgewicht (Broca)', value: normalSafe, unit: 'kg', digits: 1 },
    ];
  },
  intro:
    'Die Broca-Formel ist eine klassische Faustregel zur Abschätzung des Normal- und Idealgewichts allein aus der Körpergröße. Das Normalgewicht ergibt sich aus der Körpergröße in Zentimetern minus 100. Vom Normalgewicht zieht man bei Männern 10 Prozent und bei Frauen 15 Prozent ab, um das Idealgewicht zu erhalten. Die Formel ist einfach, gilt aber nur als grober Richtwert.',
  howto: [
    'Körpergröße in Zentimetern eingeben.',
    'Geschlecht auswählen (bestimmt den prozentualen Abschlag).',
    'Normalgewicht und Idealgewicht ablesen.',
    'Zum Abgleich zusätzlich einen BMI-Rechner nutzen.',
  ],
  faq: [
    { q: 'Wie genau ist die Broca-Formel?', a: 'Die Broca-Formel ist eine einfache Faustregel und berücksichtigt weder Körperbau noch Muskelmasse oder Alter. Bei sehr großen oder sehr kleinen Menschen wird sie ungenau. Der BMI gilt als aussagekräftiger.' },
    { q: 'Was ist der Unterschied zwischen Normal- und Idealgewicht?', a: 'Das Normalgewicht ist Größe minus 100. Das Idealgewicht liegt etwas darunter (10 % bei Männern, 15 % bei Frauen) und gilt als gesundheitlich optimaler Richtwert.' },
    { q: 'Warum ziehen Frauen 15 % statt 10 % ab?', a: 'Die Formel berücksichtigt pauschal den im Schnitt höheren Körperfettanteil und die unterschiedliche Statur. Es handelt sich um historische Durchschnittswerte.' },
    { q: 'Sollte ich mein Idealgewicht unbedingt erreichen?', a: 'Nein. Das Broca-Idealgewicht ist nur ein grober Anhaltspunkt. Gesundheit, Fitness und Wohlbefinden hängen von vielen Faktoren ab. Sprich bei Gewichtszielen am besten mit Arzt oder Ärztin.' },
  ],
  related: ['bmi-rechner', 'koerperfettanteil-rechner', 'kalorienbedarf-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { groesse: 178, geschlecht: 'mann' },
      expect: [
        { label: 'Normalgewicht (Broca)', value: 78, tolerance: 0.1 },
        { label: 'Idealgewicht (Broca)', value: 70.2, tolerance: 0.1 },
      ],
    },
    {
      values: { groesse: 165, geschlecht: 'frau' },
      expect: [{ label: 'Idealgewicht (Broca)', value: 55.25, tolerance: 0.1 }],
    },
  ],
};
