import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'massstab-rechner',
  category: 'mathe',
  title: 'Maßstab-Rechner – Karte, Modell und Wirklichkeit umrechnen',
  shortTitle: 'Maßstab',
  description:
    'Rechne mit einem Maßstab 1:n zwischen Plan-/Modellmaß und Wirklichkeit um. Ermittle die echte Länge aus einer Kartenstrecke oder umgekehrt – für Karten, Modellbau und Baupläne.',
  keywords: [
    'maßstab rechner',
    'maßstab berechnen',
    'karte in wirklichkeit umrechnen',
    'modellbau maßstab',
    'maßstab umrechnen',
    '1 zu n maßstab',
  ],
  formula:
    'Wirklichkeit = Planlänge · n ; Planlänge = Wirklichkeit / n  (Maßstab 1:n)',
  intro:
    'Ein Maßstab 1:n bedeutet, dass eine Strecke in der Wirklichkeit n-mal so lang ist wie auf der Karte oder im Modell. Bei 1:100 entspricht 1 cm auf dem Plan 100 cm in echt. Der Rechner wandelt zwischen Plan- und Wirklichkeitsmaß in beide Richtungen um und arbeitet einheitsneutral – Eingabe und Ergebnis stehen in derselben Längeneinheit.',
  inputs: [
    { type: 'number', id: 'n', label: 'Maßstab 1 : n', default: 100, min: 0.0001, step: 1, help: 'Die Zahl hinter dem Doppelpunkt, z. B. 100 für 1:100.' },
    { type: 'number', id: 'laenge', label: 'Eingabelänge', default: 5, min: 0, step: 0.1 },
    {
      type: 'select',
      id: 'richtung',
      label: 'Umrechnungsrichtung',
      default: 'plan2real',
      options: [
        { value: 'plan2real', label: 'Plan/Karte → Wirklichkeit' },
        { value: 'real2plan', label: 'Wirklichkeit → Plan/Karte' },
      ],
    },
  ],
  compute: (v) => {
    const n = num(v.n);
    const laenge = num(v.laenge);
    const richtung = String(v.richtung);
    if (richtung === 'plan2real') {
      const real = laenge * n;
      return [
        { label: 'Länge in Wirklichkeit', value: real, digits: 4, primary: true, help: 'Gleiche Einheit wie die Eingabe.' },
        { label: 'Planlänge (Eingabe)', value: laenge, digits: 4 },
        { label: 'Maßstabsfaktor', value: n, digits: 4, help: 'Maßstab 1 : n.' },
      ];
    }
    const plan = n > 0 ? laenge / n : 0;
    return [
      { label: 'Planlänge', value: plan, digits: 6, primary: true, help: 'Gleiche Einheit wie die Eingabe.' },
      { label: 'Wirklichkeit (Eingabe)', value: laenge, digits: 4 },
      { label: 'Maßstabsfaktor', value: n, digits: 4, help: 'Maßstab 1 : n.' },
    ];
  },
  howto: [
    'Gib den Maßstab als Zahl n ein (z. B. 100 für den Maßstab 1:100).',
    'Trage die bekannte Länge ein – auf Plan/Karte oder in Wirklichkeit.',
    'Wähle die Richtung und lies die gesuchte Länge in derselben Einheit ab.',
  ],
  faq: [
    {
      q: 'Was bedeutet ein Maßstab von 1:100?',
      a: 'Eine Einheit auf dem Plan entspricht 100 Einheiten in der Wirklichkeit. 1 cm auf dem Plan sind also 100 cm = 1 m in echt.',
    },
    {
      q: 'Wie rechne ich von der Karte in die Wirklichkeit?',
      a: 'Du multiplizierst die Kartenstrecke mit dem Maßstabsfaktor n. Bei 1:25.000 und 4 cm auf der Karte sind das 4 · 25.000 = 100.000 cm = 1 km.',
    },
    {
      q: 'Welche Einheit liefert der Rechner?',
      a: 'Der Rechner ist einheitsneutral: Das Ergebnis steht in derselben Einheit wie deine Eingabe. Gibst du Zentimeter ein, kommt das Ergebnis in Zentimeter.',
    },
  ],
  related: ['verhaeltnis-kuerzen-rechner', 'dreisatz-rechner', 'laenge-umrechner'],
  updated: '2026-06-19',
  examples: [
    {
      values: { n: 100, laenge: 5, richtung: 'plan2real' },
      expect: [{ label: 'Länge in Wirklichkeit', value: 500, tolerance: 0.0001 }],
    },
    {
      values: { n: 25000, laenge: 100000, richtung: 'real2plan' },
      expect: [{ label: 'Planlänge', value: 4, tolerance: 0.0001 }],
    },
  ],
};
