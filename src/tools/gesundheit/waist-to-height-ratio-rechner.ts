import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'waist-to-height-ratio-rechner',
  category: 'gesundheit',
  title: 'Waist-to-Height-Ratio-Rechner',
  shortTitle: 'WHtR',
  description:
    'Berechne dein Verhältnis von Taillenumfang zu Körpergröße (WHtR) – ein aussagekräftiger Indikator für Bauchfett und gesundheitliches Risiko.',
  keywords: [
    'waist to height ratio',
    'taille größe verhältnis',
    'whtr rechner',
    'bauchfett indikator',
    'taillenumfang bewerten',
    'taille körpergröße',
    'bauchumfang gesund',
  ],
  formula: 'WHtR = Taillenumfang(cm) / Körpergröße(cm)',
  inputs: [
    { type: 'number', id: 'taille', label: 'Taillenumfang', unit: 'cm', default: 85, min: 1, step: 0.5, help: 'In Nabelhöhe, locker gemessen, nicht eingezogen' },
    { type: 'number', id: 'groesse', label: 'Körpergröße', unit: 'cm', default: 178, min: 1, step: 1 },
    {
      type: 'select', id: 'alter', label: 'Altersgruppe', default: 'u40',
      options: [
        { value: 'u40', label: 'Unter 40 Jahre' },
        { value: '40_50', label: '40 bis 50 Jahre' },
        { value: 'ue50', label: 'Über 50 Jahre' },
      ],
    },
  ],
  compute: (v) => {
    const taille = num(v.taille);
    const h = num(v.groesse);
    const whtr = h > 0 ? taille / h : 0;
    // Altersangepasste obere Normgrenze (Ashwell-Richtwert, mit Alterskorrektur)
    let grenze = 0.5;
    if (String(v.alter) === '40_50') grenze = 0.5 + 0.005 * 5; // ~0,525
    else if (String(v.alter) === 'ue50') grenze = 0.6;
    let einordnung = 'gesund';
    if (whtr < 0.4) einordnung = 'sehr niedrig (ggf. Untergewicht)';
    else if (whtr <= grenze) einordnung = 'gesund';
    else if (whtr <= grenze + 0.1) einordnung = 'erhöhtes Risiko';
    else einordnung = 'deutlich erhöhtes Risiko';
    return [
      { label: 'Waist-to-Height-Ratio', value: whtr, digits: 2, primary: true },
      { label: 'Einordnung', value: einordnung },
      { label: 'Empfohlene Obergrenze', value: grenze, digits: 3 },
    ];
  },
  intro:
    'Die Waist-to-Height-Ratio (WHtR), also das Verhältnis von Taillenumfang zu Körpergröße, gilt als besserer Indikator für gesundheitliche Risiken als der BMI, weil sie das gesundheitlich kritische Bauchfett direkt erfasst. Eine bekannte Faustregel lautet: Der Taillenumfang sollte weniger als die Hälfte der Körpergröße betragen (WHtR unter 0,5). Mit zunehmendem Alter wird die Grenze etwas höher angesetzt.',
  howto: [
    'Taillenumfang in Nabelhöhe locker messen und eingeben.',
    'Körpergröße in Zentimetern eingeben.',
    'Altersgruppe auswählen (passt die Obergrenze an).',
    'Verhältnis und gesundheitliche Einordnung ablesen.',
  ],
  faq: [
    { q: 'Warum ist die WHtR besser als der BMI?', a: 'Der BMI unterscheidet nicht zwischen Muskel- und Fettmasse und ignoriert die Fettverteilung. Die WHtR erfasst gezielt das viszerale Bauchfett, das eng mit Herz-Kreislauf-Erkrankungen und Diabetes zusammenhängt.' },
    { q: 'Wo messe ich den Taillenumfang richtig?', a: 'Etwa auf Höhe des Bauchnabels, zwischen unterster Rippe und Beckenkamm. Locker im stehen messen, nach normalem Ausatmen, ohne den Bauch einzuziehen.' },
    { q: 'Welcher WHtR-Wert ist gesund?', a: 'Als Faustregel gilt ein Wert unter 0,5 für Erwachsene bis etwa 40 Jahre. Über 50 wird häufig bis 0,6 toleriert. Werte deutlich darüber deuten auf erhöhtes Risiko hin.' },
    { q: 'Gilt der Wert für Männer und Frauen gleich?', a: 'Ja, der große Vorteil der WHtR ist, dass dieselbe Grenze (rund 0,5) für beide Geschlechter und über verschiedene Körpergrößen hinweg gilt.' },
  ],
  related: ['bmi-rechner', 'koerperfettanteil-rechner', 'idealgewicht-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { taille: 85, groesse: 178, alter: 'u40' },
      expect: [
        { label: 'Waist-to-Height-Ratio', value: 0.48, tolerance: 0.005 },
        { label: 'Empfohlene Obergrenze', value: 0.5, tolerance: 0.001 },
      ],
    },
  ],
};
