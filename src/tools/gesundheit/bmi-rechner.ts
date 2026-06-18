import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'bmi-rechner',
  category: 'gesundheit',
  title: 'BMI-Rechner',
  shortTitle: 'BMI-Rechner',
  description:
    'Berechne deinen Body-Mass-Index (BMI) aus Größe und Gewicht – mit Einordnung nach WHO-Klassifikation.',
  keywords: [
    'bmi rechner',
    'bmi berechnen',
    'body mass index',
    'bmi tabelle',
    'idealgewicht bmi',
  ],
  formula: 'BMI = Gewicht / (Größe in m)²',
  inputs: [
    { type: 'number', id: 'gewicht', label: 'Gewicht', unit: 'kg', default: 75, min: 0, step: 0.1 },
    { type: 'number', id: 'groesse', label: 'Größe', unit: 'cm', default: 178, min: 1, step: 1 },
  ],
  compute: (v) => {
    const g = num(v.gewicht);
    const h = num(v.groesse);
    const bmi = h > 0 ? g / Math.pow(h / 100, 2) : 0;
    let kat = 'Normalgewicht';
    if (bmi < 18.5) kat = 'Untergewicht';
    else if (bmi < 25) kat = 'Normalgewicht';
    else if (bmi < 30) kat = 'Übergewicht';
    else kat = 'Adipositas';
    return [
      { label: 'BMI', value: bmi, digits: 1, primary: true },
      { label: 'Einordnung (WHO)', value: kat },
    ];
  },
  howto: [
    'Gewicht in Kilogramm eingeben.',
    'Körpergröße in Zentimetern eingeben.',
    'BMI und WHO-Einordnung ablesen.',
  ],
  faq: [
    { q: 'Welcher BMI ist normal?', a: 'Bei Erwachsenen gilt ein BMI von 18,5 bis 24,9 als Normalgewicht (WHO). Darunter Untergewicht, ab 25 Übergewicht, ab 30 Adipositas.' },
    { q: 'Ist der BMI für jeden aussagekräftig?', a: 'Der BMI ist ein grober Richtwert. Bei viel Muskelmasse, Kindern, Schwangeren oder Senioren ist er nur eingeschränkt aussagekräftig.' },
  ],
  updated: '2026-06-18',
  examples: [
    { values: { gewicht: 75, groesse: 178 }, expect: [{ label: 'BMI', value: 23.67, tolerance: 0.05 }] },
  ],
};
