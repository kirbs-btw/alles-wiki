import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'lineares-gleichungssystem-2x2-rechner',
  category: 'mathe',
  title: 'Lineares Gleichungssystem (2x2) Rechner – x und y berechnen',
  shortTitle: 'LGS 2x2',
  description:
    'Löse ein lineares Gleichungssystem mit zwei Unbekannten: a·x + b·y = c und d·x + e·y = f. Mit Lösung für x und y über die Cramersche Regel.',
  keywords: [
    'lineares gleichungssystem lösen',
    'lgs 2x2 rechner',
    'gleichungssystem zwei unbekannte',
    'cramersche regel rechner',
    'x und y berechnen',
    'gleichungssystem rechner',
  ],
  formula:
    'a·x + b·y = c und d·x + e·y = f ; x = (c·e − b·f) / D , y = (a·f − c·d) / D , D = a·e − b·d',
  intro:
    'Ein lineares Gleichungssystem mit zwei Gleichungen und zwei Unbekannten x und y wird hier mit der Cramerschen Regel gelöst. Aus der Determinante D = a·e − b·d ergeben sich x und y eindeutig, sofern D ungleich 0 ist. Ist D = 0, gibt es entweder keine oder unendlich viele Lösungen.',
  inputs: [
    { type: 'number', id: 'a', label: 'a (bei x, Gleichung 1)', default: 2, step: 0.1 },
    { type: 'number', id: 'b', label: 'b (bei y, Gleichung 1)', default: 1, step: 0.1 },
    { type: 'number', id: 'c', label: 'c (rechte Seite, Gleichung 1)', default: 5, step: 0.1 },
    { type: 'number', id: 'd', label: 'd (bei x, Gleichung 2)', default: 1, step: 0.1 },
    { type: 'number', id: 'e', label: 'e (bei y, Gleichung 2)', default: 3, step: 0.1 },
    { type: 'number', id: 'f', label: 'f (rechte Seite, Gleichung 2)', default: 10, step: 0.1 },
  ],
  compute: (v) => {
    const a = num(v.a);
    const b = num(v.b);
    const c = num(v.c);
    const d = num(v.d);
    const e = num(v.e);
    const f = num(v.f);
    const det = a * e - b * d;
    if (det === 0) {
      return [
        { label: 'Lösung', value: 'Keine eindeutige Lösung (Determinante = 0)', primary: true },
        { label: 'Determinante D', value: 0, digits: 4 },
      ];
    }
    const x = (c * e - b * f) / det;
    const y = (a * f - c * d) / det;
    return [
      { label: 'x', value: x, digits: 4, primary: true },
      { label: 'y', value: y, digits: 4 },
      { label: 'Determinante D', value: det, digits: 4 },
    ];
  },
  howto: [
    'Bringe beide Gleichungen in die Form a·x + b·y = c.',
    'Trage die sechs Koeffizienten a, b, c (Gleichung 1) und d, e, f (Gleichung 2) ein.',
    'Lies die Lösungen für x und y ab.',
    'Prüfe die Determinante: Ist sie 0, gibt es keine eindeutige Lösung.',
  ],
  faq: [
    {
      q: 'Was bedeutet eine Determinante von 0?',
      a: 'Dann sind die beiden Geraden parallel oder identisch. Es gibt entweder keine Lösung (parallel) oder unendlich viele Lösungen (identisch).',
    },
    {
      q: 'Wie ist die Cramersche Regel definiert?',
      a: 'x = (c·e − b·f) / D und y = (a·f − c·d) / D mit der Determinante D = a·e − b·d. Sie liefert die eindeutige Lösung, wenn D ungleich 0 ist.',
    },
    {
      q: 'Wie bringe ich eine Gleichung in die richtige Form?',
      a: 'Sortiere alle x- und y-Terme auf die linke Seite und die Konstante auf die rechte Seite, sodass a·x + b·y = c entsteht. Fehlt eine Variable, ist ihr Koeffizient 0.',
    },
  ],
  related: ['geradengleichung-aus-zwei-punkten-rechner', 'pq-formel-rechner', 'prozentrechner'],
  updated: '2026-06-19',
  examples: [
    {
      values: { a: 2, b: 1, c: 5, d: 1, e: 3, f: 10 },
      expect: [
        { label: 'x', value: 1, tolerance: 0.0001 },
        { label: 'y', value: 3, tolerance: 0.0001 },
      ],
    },
    {
      values: { a: 1, b: 1, c: 10, d: 1, e: -1, f: 2 },
      expect: [
        { label: 'x', value: 6, tolerance: 0.0001 },
        { label: 'y', value: 4, tolerance: 0.0001 },
      ],
    },
  ],
};
