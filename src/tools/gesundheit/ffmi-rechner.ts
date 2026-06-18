import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'ffmi-rechner',
  category: 'gesundheit',
  title: 'FFMI-Rechner (Fettfreie-Masse-Index)',
  shortTitle: 'FFMI',
  description:
    'Berechne deinen Fettfreie-Masse-Index (FFMI) aus Gewicht, Größe und Körperfettanteil – eine Kennzahl für deine Muskelmasse im Verhältnis zur Körpergröße.',
  keywords: [
    'ffmi rechner',
    'fettfreie masse index',
    'muskelmasse index berechnen',
    'ffmi berechnen',
    'normalisierter ffmi',
    'muskelmasse bewerten',
  ],
  formula:
    'FFM(kg) = Gewicht × (1 − KFA/100); FFMI = FFM / Größe(m)²; normalisiert = FFMI + 6,1 × (1,8 − Größe(m))',
  inputs: [
    { type: 'number', id: 'gewicht', label: 'Gewicht', unit: 'kg', default: 80, min: 1, step: 0.1 },
    { type: 'number', id: 'groesse', label: 'Größe', unit: 'cm', default: 180, min: 1, step: 1 },
    { type: 'number', id: 'kfa', label: 'Körperfettanteil', unit: '%', default: 15, min: 1, max: 70, step: 0.1 },
  ],
  compute: (v) => {
    const gewicht = num(v.gewicht);
    const groesseM = num(v.groesse) / 100;
    const kfa = num(v.kfa);
    const ffm = gewicht * (1 - kfa / 100);
    const ffmi = groesseM > 0 ? ffm / (groesseM * groesseM) : 0;
    const ffmiNorm = ffmi + 6.1 * (1.8 - groesseM);
    return [
      { label: 'FFMI', value: ffmi, unit: 'kg/m²', digits: 1, primary: true },
      { label: 'Normalisierter FFMI', value: ffmiNorm, unit: 'kg/m²', digits: 1 },
      { label: 'Fettfreie Masse', value: ffm, unit: 'kg', digits: 1 },
    ];
  },
  intro:
    'Der Fettfreie-Masse-Index (FFMI) setzt die fettfreie Körpermasse ins Verhältnis zur Körpergröße – ähnlich wie der BMI, jedoch ohne den Fettanteil. Er wird genutzt, um Muskulosität einzuschätzen. Werte um 19 gelten als durchschnittlich, Werte um 22 bis 23 als sehr muskulös. Der normalisierte FFMI korrigiert den Wert auf eine Bezugsgröße von 1,80 m.',
  howto: [
    'Gewicht in Kilogramm eingeben.',
    'Körpergröße in Zentimetern eintragen.',
    'Körperfettanteil in Prozent angeben (z. B. aus dem Körperfettanteil-Rechner).',
    'FFMI und normalisierten FFMI ablesen.',
  ],
  faq: [
    { q: 'Was sagt der FFMI aus?', a: 'Er beschreibt, wie viel Muskel- bzw. fettfreie Masse du im Verhältnis zu deiner Größe trägst. Hohe Werte deuten auf eine ausgeprägte Muskulatur hin.' },
    { q: 'Welcher FFMI gilt als natürlich erreichbar?', a: 'Für natürlich trainierende Männer werden normalisierte Werte bis etwa 25 als oberer Bereich diskutiert. Frauen liegen typischerweise deutlich niedriger. Es handelt sich um Orientierungswerte.' },
    { q: 'Warum brauche ich den Körperfettanteil?', a: 'Der FFMI basiert auf der fettfreien Masse. Ohne den Körperfettanteil lässt sich diese nicht aus dem Gesamtgewicht herausrechnen.' },
  ],
  related: ['koerperfettanteil-rechner', 'bmi-rechner', 'idealgewicht-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { gewicht: 80, groesse: 180, kfa: 15 },
      expect: [
        { label: 'Fettfreie Masse', value: 68, tolerance: 0.1 },
        { label: 'FFMI', value: 20.99, tolerance: 0.1 },
        { label: 'Normalisierter FFMI', value: 20.99, tolerance: 0.1 },
      ],
    },
    {
      values: { gewicht: 70, groesse: 170, kfa: 20 },
      expect: [
        { label: 'Fettfreie Masse', value: 56, tolerance: 0.1 },
        { label: 'FFMI', value: 19.38, tolerance: 0.1 },
      ],
    },
  ],
};
