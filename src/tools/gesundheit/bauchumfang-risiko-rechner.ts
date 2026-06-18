import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'bauchumfang-risiko-rechner',
  category: 'gesundheit',
  title: 'Bauchumfang-Risiko-Rechner',
  shortTitle: 'Bauchumfang',
  description:
    'Bewerte deinen Taillenumfang nach den WHO-Grenzwerten und schätze dein gesundheitliches Risiko durch Bauchfett ein.',
  keywords: [
    'bauchumfang rechner',
    'taillenumfang grenzwerte',
    'bauchumfang risiko',
    'bauchfett gesundheit',
    'taille messen risiko',
    'bauchumfang normal',
  ],
  formula:
    'Frauen: ≥80 cm erhöht, ≥88 cm stark erhöht; Männer: ≥94 cm erhöht, ≥102 cm stark erhöht',
  inputs: [
    {
      type: 'select', id: 'geschlecht', label: 'Geschlecht', default: 'mann',
      options: [
        { value: 'mann', label: 'Männlich' },
        { value: 'frau', label: 'Weiblich' },
      ],
    },
    { type: 'number', id: 'bauchumfang', label: 'Taillenumfang', unit: 'cm', default: 95, min: 1, step: 0.5, help: 'In Nabelhöhe ohne einzuziehen messen.' },
  ],
  compute: (v) => {
    const frau = String(v.geschlecht) === 'frau';
    const umfang = num(v.bauchumfang);
    const grenzeErhoeht = frau ? 80 : 94;
    const grenzeStark = frau ? 88 : 102;
    let bewertung = 'normal';
    let stufe = 0;
    if (umfang >= grenzeStark) {
      bewertung = 'stark erhöht';
      stufe = 2;
    } else if (umfang >= grenzeErhoeht) {
      bewertung = 'erhöht';
      stufe = 1;
    }
    return [
      { label: 'Risikobewertung', value: bewertung, primary: true },
      { label: 'Risikostufe', value: stufe, digits: 0, help: '0 = normal, 1 = erhöht, 2 = stark erhöht' },
      { label: 'Grenze für erhöhtes Risiko', value: grenzeErhoeht, unit: 'cm', digits: 0 },
      { label: 'Grenze für stark erhöhtes Risiko', value: grenzeStark, unit: 'cm', digits: 0 },
    ];
  },
  intro:
    'Der Taillenumfang ist ein einfacher Indikator für das gesundheitlich besonders ungünstige Bauchfett (viszerales Fett). Die WHO definiert geschlechtsspezifische Grenzwerte: Ab ihnen steigt das Risiko für Herz-Kreislauf-Erkrankungen und Typ-2-Diabetes. Diese Bewertung ersetzt keine ärztliche Diagnose, gibt aber eine gute erste Orientierung.',
  howto: [
    'Geschlecht auswählen.',
    'Taillenumfang in Nabelhöhe entspannt und ohne einzuziehen messen.',
    'Wert eingeben und die Risikobewertung ablesen.',
  ],
  faq: [
    { q: 'Wo messe ich den Bauchumfang richtig?', a: 'Im Stehen, entspannt nach dem Ausatmen, etwa auf Höhe des Bauchnabels bzw. mittig zwischen unterster Rippe und Beckenkamm. Den Bauch nicht einziehen.' },
    { q: 'Welche Grenzwerte gelten?', a: 'Bei Frauen gilt ab 80 cm ein erhöhtes und ab 88 cm ein stark erhöhtes Risiko, bei Männern ab 94 cm bzw. ab 102 cm. Dies sind WHO-Richtwerte für Erwachsene.' },
    { q: 'Warum ist Bauchfett besonders ungünstig?', a: 'Viszerales Fett im Bauchraum ist stoffwechselaktiv und mit einem höheren Risiko für Herz-Kreislauf-Erkrankungen und Diabetes verbunden als Fett an Hüfte oder Oberschenkeln.' },
  ],
  related: ['waist-to-height-ratio-rechner', 'bmi-rechner', 'koerperfettanteil-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { geschlecht: 'mann', bauchumfang: 95 },
      expect: [
        { label: 'Risikostufe', value: 1, tolerance: 0.1 },
        { label: 'Grenze für erhöhtes Risiko', value: 94, tolerance: 0.5 },
      ],
    },
    {
      values: { geschlecht: 'frau', bauchumfang: 90 },
      expect: [
        { label: 'Risikostufe', value: 2, tolerance: 0.1 },
      ],
    },
  ],
};
