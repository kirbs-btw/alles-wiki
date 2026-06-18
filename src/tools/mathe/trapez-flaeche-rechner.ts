import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'trapez-flaeche-rechner',
  category: 'mathe',
  title: 'Trapez-Flächen-Rechner – Fläche eines Trapezes berechnen',
  shortTitle: 'Trapez-Fläche',
  description:
    'Berechne die Fläche eines Trapezes aus den beiden parallelen Seiten a und c und der Höhe h. Mit Anzeige der Mittellinie.',
  keywords: [
    'trapez fläche berechnen',
    'trapez flächeninhalt',
    'fläche trapez formel',
    'trapez rechner',
    'mittellinie trapez',
    'flächeninhalt trapez',
  ],
  formula: 'A = ((a + c) / 2) · h ; Mittellinie m = (a + c) / 2',
  intro:
    'Ein Trapez hat zwei parallele Seiten a und c. Die Fläche ergibt sich aus dem Mittelwert dieser beiden Seiten – der Mittellinie – multipliziert mit der Höhe h, also dem senkrechten Abstand zwischen den parallelen Seiten.',
  inputs: [
    { type: 'number', id: 'a', label: 'Parallele Seite a', unit: 'cm', default: 8, min: 0, step: 0.1 },
    { type: 'number', id: 'c', label: 'Parallele Seite c', unit: 'cm', default: 4, min: 0, step: 0.1 },
    { type: 'number', id: 'h', label: 'Höhe h', unit: 'cm', default: 5, min: 0, step: 0.1, help: 'Senkrechter Abstand zwischen a und c.' },
  ],
  compute: (v) => {
    const a = num(v.a);
    const c = num(v.c);
    const h = num(v.h);
    const mittellinie = (a + c) / 2;
    const flaeche = mittellinie * h;
    return [
      { label: 'Fläche', value: flaeche, unit: 'cm²', digits: 2, primary: true },
      { label: 'Mittellinie', value: mittellinie, unit: 'cm', digits: 2 },
    ];
  },
  howto: [
    'Gib die Längen der beiden parallelen Seiten a und c ein.',
    'Trage die Höhe (senkrechter Abstand der parallelen Seiten) ein.',
    'Lies die Fläche ab.',
  ],
  faq: [
    {
      q: 'Wie berechnet man die Fläche eines Trapezes?',
      a: 'Man bildet den Mittelwert der parallelen Seiten ((a + c)/2) und multipliziert ihn mit der Höhe h. Formel: A = ((a + c)/2) · h.',
    },
    {
      q: 'Was ist die Mittellinie eines Trapezes?',
      a: 'Die Mittellinie verbindet die Mittelpunkte der nicht-parallelen Seiten. Ihre Länge ist der Mittelwert der parallelen Seiten: (a + c)/2.',
    },
    {
      q: 'Welche Seite ist die Höhe?',
      a: 'Die Höhe ist der senkrechte Abstand zwischen den beiden parallelen Seiten, nicht die Länge der schrägen Seiten.',
    },
  ],
  related: ['dreieck-flaeche-rechner', 'parallelogramm-flaeche-rechner', 'kreis-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { a: 8, c: 4, h: 5 },
      expect: [
        { label: 'Fläche', value: 30, tolerance: 0.01 },
        { label: 'Mittellinie', value: 6, tolerance: 0.01 },
      ],
    },
    {
      values: { a: 10, c: 6, h: 3 },
      expect: [{ label: 'Fläche', value: 24, tolerance: 0.01 }],
    },
  ],
};
