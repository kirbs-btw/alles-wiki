import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'koerperwasser-rechner',
  category: 'gesundheit',
  title: 'Körperwasser-Rechner (Watson-Formel)',
  shortTitle: 'Körperwasser',
  description:
    'Schätze deinen gesamten Körperwasseranteil in Litern und Prozent nach der Watson-Formel aus Geschlecht, Alter, Größe und Gewicht.',
  keywords: [
    'koerperwasser rechner',
    'koerperwasseranteil berechnen',
    'watson formel',
    'gesamtkoerperwasser',
    'wasseranteil koerper prozent',
    'tbw rechner',
  ],
  formula:
    'Mann: TBW = 2,447 − 0,09516×Alter + 0,1074×Größe(cm) + 0,3362×Gewicht(kg); Frau: TBW = −2,097 + 0,1069×Größe(cm) + 0,2466×Gewicht(kg)',
  inputs: [
    {
      type: 'select', id: 'geschlecht', label: 'Geschlecht', default: 'mann',
      options: [
        { value: 'mann', label: 'Männlich' },
        { value: 'frau', label: 'Weiblich' },
      ],
    },
    { type: 'number', id: 'alter', label: 'Alter', unit: 'Jahre', default: 35, min: 1, max: 120, step: 1 },
    { type: 'number', id: 'groesse', label: 'Größe', unit: 'cm', default: 180, min: 1, step: 1 },
    { type: 'number', id: 'gewicht', label: 'Gewicht', unit: 'kg', default: 80, min: 1, step: 0.1 },
  ],
  compute: (v) => {
    const frau = String(v.geschlecht) === 'frau';
    const alter = num(v.alter);
    const groesse = num(v.groesse);
    const gewicht = num(v.gewicht);
    const tbw = frau
      ? -2.097 + 0.1069 * groesse + 0.2466 * gewicht
      : 2.447 - 0.09516 * alter + 0.1074 * groesse + 0.3362 * gewicht;
    const anteil = gewicht > 0 ? (tbw / gewicht) * 100 : 0;
    return [
      { label: 'Gesamtkörperwasser', value: tbw, unit: 'Liter', digits: 1, primary: true },
      { label: 'Wasseranteil am Körpergewicht', value: anteil, unit: '%', digits: 1 },
    ];
  },
  intro:
    'Wasser ist der mengenmäßig größte Bestandteil des menschlichen Körpers. Bei erwachsenen Männern liegt der Anteil im Schnitt bei etwa 60 Prozent, bei Frauen etwas niedriger, da sie mehr Fettgewebe haben. Die Watson-Formel von 1980 schätzt das Gesamtkörperwasser (TBW) anhand von Geschlecht, Alter, Größe und Gewicht. Die Werte sind Näherungen für gesunde Erwachsene.',
  howto: [
    'Geschlecht auswählen.',
    'Alter, Größe und Gewicht eingeben.',
    'Gesamtkörperwasser in Litern und den prozentualen Anteil ablesen.',
  ],
  faq: [
    { q: 'Wie hoch ist der normale Wasseranteil?', a: 'Bei erwachsenen Männern liegt er im Schnitt um 60 Prozent, bei Frauen um 50 bis 55 Prozent. Mit zunehmendem Alter und höherem Körperfettanteil sinkt der Wert.' },
    { q: 'Warum haben Frauen meist weniger Körperwasser?', a: 'Frauen besitzen anteilig mehr Fettgewebe, und Fett enthält deutlich weniger Wasser als Muskelgewebe. Dadurch ist ihr prozentualer Wasseranteil im Mittel geringer.' },
    { q: 'Wie genau ist die Watson-Formel?', a: 'Sie liefert für gesunde Erwachsene eine brauchbare Schätzung. Genauere Werte ermitteln bioelektrische Impedanzanalyse (BIA-Waagen) oder medizinische Verfahren.' },
  ],
  related: ['wasserbedarf-rechner', 'koerperfettanteil-rechner', 'bmi-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { geschlecht: 'mann', alter: 35, groesse: 180, gewicht: 80 },
      expect: [
        { label: 'Gesamtkörperwasser', value: 45.34, tolerance: 0.2 },
        { label: 'Wasseranteil am Körpergewicht', value: 56.68, tolerance: 0.3 },
      ],
    },
    {
      values: { geschlecht: 'frau', alter: 30, groesse: 165, gewicht: 62 },
      expect: [
        { label: 'Gesamtkörperwasser', value: 30.83, tolerance: 0.2 },
      ],
    },
  ],
};
