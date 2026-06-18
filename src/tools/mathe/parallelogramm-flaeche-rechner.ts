import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'parallelogramm-flaeche-rechner',
  category: 'mathe',
  title: 'Parallelogramm-Flächen-Rechner – Fläche und Umfang',
  shortTitle: 'Parallelogramm',
  description:
    'Berechne die Fläche eines Parallelogramms aus Grundseite und Höhe sowie den Umfang aus beiden Seitenlängen.',
  keywords: [
    'parallelogramm fläche berechnen',
    'parallelogramm flächeninhalt',
    'fläche parallelogramm formel',
    'parallelogramm umfang',
    'grundseite mal höhe',
    'parallelogramm rechner',
  ],
  formula: 'A = a · h ; Umfang U = 2 · (a + b)',
  intro:
    'Die Fläche eines Parallelogramms ist das Produkt aus Grundseite a und der zugehörigen Höhe h (dem senkrechten Abstand zur Grundseite). Für den Umfang werden beide Seitenlängen a und b benötigt.',
  inputs: [
    { type: 'number', id: 'a', label: 'Grundseite a', unit: 'cm', default: 7, min: 0, step: 0.1 },
    { type: 'number', id: 'h', label: 'Höhe h zur Seite a', unit: 'cm', default: 4, min: 0, step: 0.1, help: 'Senkrechter Abstand zur Grundseite a.' },
    { type: 'number', id: 'b', label: 'Seite b', unit: 'cm', default: 5, min: 0, step: 0.1, help: 'Für die Umfangsberechnung.' },
  ],
  compute: (v) => {
    const a = num(v.a);
    const h = num(v.h);
    const b = num(v.b);
    const flaeche = a * h;
    const umfang = 2 * (a + b);
    return [
      { label: 'Fläche', value: flaeche, unit: 'cm²', digits: 2, primary: true },
      { label: 'Umfang', value: umfang, unit: 'cm', digits: 2 },
    ];
  },
  howto: [
    'Gib die Grundseite a und die zugehörige Höhe h ein.',
    'Trage für den Umfang zusätzlich die Seite b ein.',
    'Lies Fläche und Umfang ab.',
  ],
  faq: [
    {
      q: 'Wie berechnet man die Fläche eines Parallelogramms?',
      a: 'Fläche = Grundseite · Höhe (a · h). Die Höhe ist der senkrechte Abstand zur gewählten Grundseite, nicht die schräge Seitenlänge.',
    },
    {
      q: 'Warum nicht einfach a mal b?',
      a: 'Weil die Seite b in der Regel schräg verläuft. Für die Fläche zählt nur die senkrechte Höhe h, sonst würde man zu viel rechnen.',
    },
    {
      q: 'Wie groß ist der Umfang?',
      a: 'Der Umfang ist die Summe aller vier Seiten: U = 2 · (a + b), da gegenüberliegende Seiten gleich lang sind.',
    },
  ],
  related: ['trapez-flaeche-rechner', 'dreieck-flaeche-rechner', 'kreis-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { a: 7, h: 4, b: 5 },
      expect: [
        { label: 'Fläche', value: 28, tolerance: 0.01 },
        { label: 'Umfang', value: 24, tolerance: 0.01 },
      ],
    },
    {
      values: { a: 10, h: 6, b: 8 },
      expect: [{ label: 'Fläche', value: 60, tolerance: 0.01 }],
    },
  ],
};
