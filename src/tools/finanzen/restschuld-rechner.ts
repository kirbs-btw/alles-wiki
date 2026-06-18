import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'restschuld-rechner',
  category: 'finanzen',
  title: 'Restschuld-Rechner',
  shortTitle: 'Restschuld',
  description:
    'Berechne die verbleibende Restschuld eines Annuitätendarlehens nach einer bestimmten Anzahl gezahlter Monatsraten.',
  keywords: [
    'restschuld rechner',
    'restschuld berechnen',
    'restschuld nach jahren',
    'darlehen restschuld',
    'restschuld kredit',
    'restschuld annuitätendarlehen',
  ],
  formula: 'Restschuld = K0 × (1+i)^p − Rate × ((1+i)^p − 1)/i; i = Zins/100/12; p = gezahlte Monate',
  inputs: [
    { type: 'number', id: 'darlehen', label: 'Ursprüngliches Darlehen', unit: '€', default: 200000, min: 0, step: 1000 },
    { type: 'number', id: 'zins', label: 'Sollzins pro Jahr', unit: '%', default: 3.5, min: 0, step: 0.05 },
    { type: 'number', id: 'rate', label: 'Monatliche Rate', unit: '€', default: 900, min: 0, step: 10 },
    { type: 'number', id: 'monate', label: 'Bereits gezahlte Monate', unit: 'Monate', default: 60, min: 0, step: 1, help: '60 Monate = 5 Jahre.' },
  ],
  compute: (v) => {
    const k0 = num(v.darlehen);
    const zins = num(v.zins);
    const rate = num(v.rate);
    const p = Math.round(num(v.monate));
    const i = zins / 100 / 12;
    let rest: number;
    if (i > 0) {
      const q = Math.pow(1 + i, p);
      rest = k0 * q - rate * (q - 1) / i;
    } else {
      rest = k0 - rate * p;
    }
    if (rest < 0) rest = 0;
    const getilgt = k0 - rest;
    const gezahlt = rate * p;
    const zinsanteil = gezahlt - getilgt;
    return [
      { label: 'Restschuld', value: rest, unit: '€', digits: 2, primary: true },
      { label: 'Bereits getilgt', value: getilgt, unit: '€', digits: 2 },
      { label: 'Davon Zinsen gezahlt', value: zinsanteil, unit: '€', digits: 2 },
    ];
  },
  intro:
    'Bei einem Annuitätendarlehen bleibt die Monatsrate konstant, doch der Tilgungsanteil steigt mit jeder Zahlung. Dieser Rechner ermittelt, wie hoch deine Restschuld nach einer bestimmten Anzahl gezahlter Raten noch ist – wichtig etwa für das Ende der Zinsbindung oder eine geplante Umschuldung.',
  howto: [
    'Gib die ursprüngliche Darlehenssumme ein.',
    'Trage den jährlichen Sollzins ein.',
    'Gib deine konstante Monatsrate ein.',
    'Lege fest, wie viele Monate bereits gezahlt wurden, und lies die Restschuld ab.',
  ],
  faq: [
    { q: 'Was bedeutet Restschuld?', a: 'Die Restschuld ist der noch nicht getilgte Teil des Darlehens. Sie sinkt mit jeder Rate, weil ein Teil davon die Schuld tilgt und nur der Rest Zinsen sind.' },
    { q: 'Warum ist die Tilgung anfangs so gering?', a: 'Zu Beginn ist die Schuld hoch, daher entfällt ein großer Teil der Rate auf Zinsen. Mit sinkender Restschuld wächst der Tilgungsanteil – die Tilgung beschleunigt sich.' },
    { q: 'Berücksichtigt der Rechner Sondertilgungen?', a: 'Nein, er rechnet mit konstanter Rate ohne Sondertilgung. Für die Wirkung zusätzlicher Zahlungen nutze den Sondertilgungs-Rechner.' },
  ],
  related: ['tilgungsrechner', 'sondertilgung-rechner', 'kreditrechner'],
  examples: [
    {
      values: { darlehen: 200000, zins: 3.5, rate: 900, monate: 60 },
      expect: [{ label: 'Restschuld', value: 179269.06, tolerance: 5 }],
    },
  ],
  updated: '2026-06-18',
};
