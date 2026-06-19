import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'erholungspuls-rechner',
  category: 'gesundheit',
  title: 'Erholungspuls-Rechner (Heart Rate Recovery)',
  shortTitle: 'Erholungspuls',
  description:
    'Berechne deinen Erholungspuls (Heart Rate Recovery): Wie stark fällt dein Puls nach Belastung? Ein schneller Abfall spricht für gute Fitness.',
  keywords: [
    'erholungspuls rechner',
    'heart rate recovery',
    'puls nach belastung',
    'herzfrequenz erholung',
    'erholungspuls berechnen',
  ],
  formula: 'HRR = Belastungspuls − Erholungspuls (nach der gewählten Zeit)',
  inputs: [
    { type: 'number', id: 'belastung', label: 'Puls direkt nach Belastung', unit: 'Schläge/min', default: 170, min: 60, max: 230, step: 1, help: 'Maximalpuls am Ende der Belastung.' },
    { type: 'number', id: 'erholung', label: 'Puls nach Erholungszeit', unit: 'Schläge/min', default: 140, min: 40, max: 230, step: 1, help: 'Gemessen 1 oder 2 Minuten nach Belastungsende.' },
    {
      type: 'select', id: 'zeit', label: 'Erholungszeit', default: '1min',
      options: [
        { value: '1min', label: 'nach 1 Minute' },
        { value: '2min', label: 'nach 2 Minuten' },
      ],
    },
  ],
  compute: (v) => {
    const belastung = num(v.belastung);
    const erholung = num(v.erholung);
    const hrr = belastung - erholung;
    const hrrSafe = hrr > 0 ? hrr : 0;
    const ist1min = String(v.zeit) === '1min';
    let bewertung: string;
    if (ist1min) {
      bewertung = hrr <= 12 ? 'niedrig (≤ 12)' : hrr < 25 ? 'durchschnittlich (13–24)' : 'gut (≥ 25)';
    } else {
      bewertung = hrr < 22 ? 'niedrig (< 22)' : hrr < 53 ? 'durchschnittlich (22–52)' : 'gut (≥ 53)';
    }
    return [
      { label: 'Erholungspuls (HRR)', value: hrrSafe, unit: 'Schläge/min', digits: 0, primary: true },
      { label: 'Pulsabfall in %', value: belastung > 0 ? (hrrSafe / belastung) * 100 : 0, unit: '%', digits: 1 },
      { label: 'Einordnung', value: bewertung },
    ];
  },
  intro:
    'Der Erholungspuls (Heart Rate Recovery, HRR) beschreibt, um wie viele Schläge der Puls in der ersten oder zweiten Minute nach Belastungsende sinkt. Je schneller der Puls fällt, desto besser arbeitet das vegetative Nervensystem – ein Zeichen für gute Herz-Kreislauf-Fitness. Ein nur geringer Abfall nach einer Minute gilt als ungünstiges Zeichen. Die genannten Schwellen sind grobe Orientierungswerte aus Studien (Stand 2026) und ersetzen keine ärztliche Diagnostik.',
  howto: [
    'Direkt am Ende der Belastung den Puls messen (Belastungspuls).',
    'Erholungszeit wählen (1 oder 2 Minuten) und still erholen.',
    'Nach der gewählten Zeit erneut den Puls messen und eintragen.',
    'Erholungspuls und Einordnung ablesen.',
  ],
  faq: [
    { q: 'Was ist ein guter Erholungspuls?', a: 'Als grobe Orientierung gilt nach einer Minute ein Abfall von mindestens etwa 12 Schlägen als normal, ab 25 als gut. Höhere Werte sprechen für eine bessere Fitness (Stand 2026).' },
    { q: 'Wann messe ich den Puls?', a: 'Direkt am Belastungsende und dann erneut genau 1 oder 2 Minuten später. Wichtig ist, in der Erholungsphase ruhig zu bleiben und nicht weiter intensiv zu belasten.' },
    { q: 'Warum ist ein schneller Pulsabfall positiv?', a: 'Er zeigt, dass der Parasympathikus (Ruhe-Nerv) den Puls rasch herunterregelt. Das gilt als Zeichen eines gut trainierten Herz-Kreislauf-Systems.' },
  ],
  related: ['trainingspuls-rechner', 'maximalpuls-rechner', 'herzfrequenz-zonen-rechner'],
  updated: '2026-06-19',
  examples: [
    {
      values: { belastung: 170, erholung: 140, zeit: '1min' },
      expect: [
        { label: 'Erholungspuls (HRR)', value: 30, tolerance: 0.1 },
        { label: 'Pulsabfall in %', value: 17.6, tolerance: 0.2 },
      ],
    },
    {
      values: { belastung: 180, erholung: 130, zeit: '2min' },
      expect: [{ label: 'Erholungspuls (HRR)', value: 50, tolerance: 0.1 }],
    },
  ],
};
