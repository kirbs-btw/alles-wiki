import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'trainingspuls-rechner',
  category: 'gesundheit',
  title: 'Trainingspuls-Rechner (Karvonen)',
  shortTitle: 'Trainingspuls',
  description:
    'Berechne deinen optimalen Trainingspuls nach der Karvonen-Formel aus Ruhepuls, Maximalpuls und gewünschter Trainingsintensität.',
  keywords: [
    'trainingspuls rechner',
    'karvonen formel',
    'optimaler puls beim sport',
    'herzfrequenz training',
    'trainingsherzfrequenz berechnen',
    'fettverbrennung puls',
  ],
  formula:
    'HFReserve = HFmax − Ruhepuls; Trainingspuls = Ruhepuls + Intensität% × HFReserve',
  inputs: [
    { type: 'number', id: 'ruhepuls', label: 'Ruhepuls', unit: 'Schläge/min', default: 60, min: 30, max: 120, step: 1, help: 'Am besten morgens im Liegen gemessen.' },
    { type: 'number', id: 'maxpuls', label: 'Maximalpuls', unit: 'Schläge/min', default: 185, min: 100, max: 230, step: 1, help: 'Aus Belastungstest oder Maximalpuls-Rechner.' },
    { type: 'number', id: 'intensitaet', label: 'Trainingsintensität', unit: '%', default: 70, min: 30, max: 100, step: 1, help: 'Anteil der Herzfrequenzreserve.' },
  ],
  compute: (v) => {
    const ruhe = num(v.ruhepuls);
    const max = num(v.maxpuls);
    const intensitaet = num(v.intensitaet);
    const reserve = max - ruhe;
    const trainingspuls = ruhe + (intensitaet / 100) * reserve;
    const unten = ruhe + 0.6 * reserve;
    const oben = ruhe + 0.8 * reserve;
    return [
      { label: 'Trainingspuls', value: trainingspuls, unit: 'Schläge/min', digits: 0, primary: true },
      { label: 'Herzfrequenzreserve', value: reserve, unit: 'Schläge/min', digits: 0 },
      { label: 'Empfohlener Bereich (60–80 %) unten', value: unten, unit: 'Schläge/min', digits: 0 },
      { label: 'Empfohlener Bereich (60–80 %) oben', value: oben, unit: 'Schläge/min', digits: 0 },
    ];
  },
  intro:
    'Die Karvonen-Formel berechnet den Trainingspuls auf Basis der Herzfrequenzreserve – also der Differenz zwischen Maximal- und Ruhepuls. Sie berücksichtigt damit deine individuelle Fitness besser als eine einfache Prozentrechnung vom Maximalpuls. Je niedriger dein Ruhepuls, desto trainierter ist in der Regel dein Herz-Kreislauf-System.',
  howto: [
    'Ruhepuls messen (morgens, vor dem Aufstehen) und eingeben.',
    'Maximalpuls aus einem Test oder dem Maximalpuls-Rechner eintragen.',
    'Gewünschte Trainingsintensität in Prozent wählen.',
    'Trainingspuls und empfohlenen Pulsbereich ablesen.',
  ],
  faq: [
    { q: 'Welche Intensität ist für die Fettverbrennung ideal?', a: 'Ein moderater Bereich von etwa 60 bis 70 Prozent der Herzfrequenzreserve gilt als günstig für Grundlagenausdauer und Fettstoffwechsel. Die absolute Fettverbrennung steigt aber auch bei höherer Intensität.' },
    { q: 'Was ist der Vorteil der Karvonen-Formel?', a: 'Sie bezieht den Ruhepuls ein und passt den Trainingspuls so an deinen individuellen Fitnesszustand an. Das macht sie genauer als die reine Prozentmethode vom Maximalpuls.' },
    { q: 'Wie messe ich den Ruhepuls richtig?', a: 'Am besten morgens direkt nach dem Aufwachen im Liegen, über eine Minute gezählt oder mit einem Pulsmesser. Stress, Koffein und Schlafmangel verfälschen den Wert.' },
  ],
  related: ['maximalpuls-rechner', 'kalorienverbrauch-rechner', 'vo2max-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { ruhepuls: 60, maxpuls: 185, intensitaet: 70 },
      expect: [
        { label: 'Trainingspuls', value: 147.5, tolerance: 0.5 },
        { label: 'Herzfrequenzreserve', value: 125, tolerance: 0.5 },
      ],
    },
    {
      values: { ruhepuls: 50, maxpuls: 190, intensitaet: 60 },
      expect: [
        { label: 'Trainingspuls', value: 134, tolerance: 0.5 },
      ],
    },
  ],
};
