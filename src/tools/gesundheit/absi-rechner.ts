import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'absi-rechner',
  category: 'gesundheit',
  title: 'ABSI-Rechner (A Body Shape Index)',
  shortTitle: 'ABSI',
  description:
    'Berechne den A Body Shape Index (ABSI) aus Taillenumfang, Größe und Gewicht – ein Maß für die Fettverteilung, das unabhängig vom BMI das Bauchfett bewertet.',
  keywords: [
    'absi rechner',
    'a body shape index',
    'absi berechnen',
    'körperform index',
    'bauchfett index',
    'absi formel',
  ],
  formula: 'ABSI = Taille(m) ÷ (BMI^(2/3) × Größe(m)^(1/2)), BMI = kg ÷ m²',
  inputs: [
    { type: 'number', id: 'taille', label: 'Taillenumfang', unit: 'cm', default: 94, min: 1, step: 0.5, help: 'In Nabelhöhe entspannt messen.' },
    { type: 'number', id: 'groesse', label: 'Körpergröße', unit: 'cm', default: 180, min: 1, step: 1 },
    { type: 'number', id: 'gewicht', label: 'Körpergewicht', unit: 'kg', default: 80, min: 1, step: 0.1 },
  ],
  compute: (v) => {
    const tailleM = num(v.taille) / 100;
    const groesseM = num(v.groesse) / 100;
    const gewicht = num(v.gewicht);
    const bmi = groesseM > 0 ? gewicht / (groesseM * groesseM) : 0;
    const nenner = bmi > 0 && groesseM > 0 ? Math.pow(bmi, 2 / 3) * Math.sqrt(groesseM) : 0;
    const absi = nenner > 0 ? tailleM / nenner : 0;
    return [
      { label: 'ABSI', value: absi, digits: 5, primary: true },
      { label: 'Zugrunde liegender BMI', value: bmi, unit: 'kg/m²', digits: 1 },
    ];
  },
  intro:
    'Der A Body Shape Index (ABSI) wurde 2012 von Nir und Jesse Krakauer entwickelt. Anders als der BMI berücksichtigt er gezielt die Fettverteilung am Bauch und ist weitgehend unabhängig von Gewicht und Größe. Ein höherer ABSI deutet auf relativ mehr Bauchfett hin und wird in Studien mit einem erhöhten Sterblichkeitsrisiko in Verbindung gebracht. Sinnvoll bewerten lässt sich der Wert nur im Vergleich zu alters- und geschlechtsspezifischen Referenzdaten. Der Wert ist eine Orientierung (Stand 2026) und ersetzt keine ärztliche Diagnose.',
  howto: [
    'Taillenumfang in Nabelhöhe messen und in cm eingeben.',
    'Körpergröße und Körpergewicht eintragen.',
    'ABSI ablesen – ein höherer Wert weist auf relativ mehr Bauchfett hin.',
  ],
  faq: [
    { q: 'Was sagt der ABSI aus?', a: 'Der ABSI bewertet, wie viel Bauchfett jemand im Verhältnis zu Größe und Gewicht hat. Er ergänzt den BMI, der die Fettverteilung selbst nicht erfasst.' },
    { q: 'Welcher ABSI-Wert ist normal?', a: 'Typische Werte liegen bei Erwachsenen grob zwischen 0,07 und 0,09. Eine sinnvolle Einordnung gelingt nur im Vergleich mit Referenzwerten der jeweiligen Alters- und Geschlechtsgruppe.' },
    { q: 'Worin liegt der Vorteil gegenüber dem BMI?', a: 'Der BMI kann nicht zwischen Muskel- und Fettmasse oder der Lage des Fetts unterscheiden. Der ABSI hebt das gesundheitlich besonders ungünstige Bauchfett stärker hervor.' },
    { q: 'Wie messe ich den Taillenumfang?', a: 'Im Stehen nach dem Ausatmen, etwa auf Höhe des Bauchnabels bzw. mittig zwischen unterster Rippe und Beckenkamm, ohne den Bauch einzuziehen.' },
  ],
  related: ['bauchumfang-risiko-rechner', 'waist-to-height-ratio-rechner', 'bmi-rechner'],
  updated: '2026-06-19',
  examples: [
    {
      values: { taille: 94, groesse: 180, gewicht: 80 },
      expect: [
        { label: 'ABSI', value: 0.08263, tolerance: 0.0002 },
        { label: 'Zugrunde liegender BMI', value: 24.7, tolerance: 0.1 },
      ],
    },
    {
      values: { taille: 80, groesse: 165, gewicht: 62 },
      expect: [
        { label: 'ABSI', value: 0.07752, tolerance: 0.0002 },
      ],
    },
  ],
};
