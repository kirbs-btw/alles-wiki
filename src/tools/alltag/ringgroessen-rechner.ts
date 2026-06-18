import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'ringgroessen-rechner',
  category: 'alltag',
  title: 'Ringgröße berechnen (Umfang & Durchmesser)',
  shortTitle: 'Ringgröße',
  description:
    'Bestimme deine Ringgröße aus dem Fingerumfang oder dem Innendurchmesser. Der Rechner gibt die deutsche Ringgröße (Innenumfang in mm) und den Durchmesser aus.',
  keywords: [
    'ringgroesse berechnen',
    'ringgroesse messen',
    'fingerumfang ringgroesse',
    'ring innendurchmesser',
    'ringgroesse umfang',
    'ringgroessen tabelle',
  ],
  formula:
    'Innendurchmesser = Innenumfang / π; deutsche Ringgröße = Innenumfang in mm',
  inputs: [
    {
      type: 'select',
      id: 'modus',
      label: 'Was hast du gemessen?',
      default: 'umfang',
      options: [
        { value: 'umfang', label: 'Fingerumfang (mm)' },
        { value: 'durchmesser', label: 'Innendurchmesser (mm)' },
      ],
    },
    {
      type: 'number',
      id: 'wert',
      label: 'Gemessener Wert',
      unit: 'mm',
      default: 54,
      min: 30,
      max: 90,
      step: 0.5,
      help: 'Umfang z. B. mit einem Faden messen, Durchmesser an einem passenden Ring.',
    },
  ],
  compute: (v) => {
    const modus = String(v.modus || 'umfang');
    const wert = num(v.wert, 54);
    const PI = Math.PI;
    let umfang: number;
    let durchmesser: number;
    if (modus === 'durchmesser') {
      durchmesser = wert;
      umfang = wert * PI;
    } else {
      umfang = wert;
      durchmesser = wert / PI;
    }
    const ringgroesse = Math.round(umfang);
    return [
      { label: 'Ringgröße (DE)', value: ringgroesse, unit: '', digits: 0, primary: true, help: 'Entspricht dem Innenumfang in Millimetern.' },
      { label: 'Innenumfang', value: umfang, unit: 'mm', digits: 1 },
      { label: 'Innendurchmesser', value: durchmesser, unit: 'mm', digits: 2 },
    ];
  },
  intro:
    'Die in Deutschland übliche Ringgröße entspricht dem Innenumfang des Rings in Millimetern. Dieser Rechner wandelt zwischen Fingerumfang und Innendurchmesser um und nennt dir die passende Ringgröße. Miss am besten abends, wenn die Finger etwas dicker sind, und wähle im Zweifel die größere Nummer.',
  howto: [
    'Wähle, ob du den Fingerumfang oder den Innendurchmesser eines passenden Rings gemessen hast.',
    'Trage den Wert in Millimetern ein.',
    'Lies die deutsche Ringgröße sowie Umfang und Durchmesser ab.',
    'Bei Werten zwischen zwei Größen die größere wählen.',
  ],
  faq: [
    { q: 'Wie messe ich den Fingerumfang?', a: 'Lege einen dünnen Faden oder Papierstreifen um den Finger, markiere den Überlappungspunkt und miss die Länge mit einem Lineal in Millimetern.' },
    { q: 'Was bedeutet die deutsche Ringgröße?', a: 'Sie gibt direkt den Innenumfang des Rings in Millimetern an. Ringgröße 54 heißt: 54 mm Innenumfang.' },
    { q: 'Wann sollte ich messen?', a: 'Abends oder bei warmen Temperaturen, da Finger dann etwas dicker sind. So sitzt der Ring nicht zu eng.' },
  ],
  related: ['schuhgroessen-umrechner', 'konfektionsgroessen-umrechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { modus: 'umfang', wert: 54 },
      expect: [
        { label: 'Ringgröße (DE)', value: 54, tolerance: 0.5 },
        { label: 'Innendurchmesser', value: 17.19, tolerance: 0.05 },
      ],
    },
    {
      values: { modus: 'durchmesser', wert: 18 },
      expect: [
        { label: 'Innenumfang', value: 56.55, tolerance: 0.1 },
        { label: 'Ringgröße (DE)', value: 57, tolerance: 0.5 },
      ],
    },
  ],
};
