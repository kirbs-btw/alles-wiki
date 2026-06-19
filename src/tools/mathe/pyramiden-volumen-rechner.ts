import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'pyramiden-volumen-rechner',
  category: 'mathe',
  title: 'Pyramiden-Volumen-Rechner – quadratische Pyramide',
  shortTitle: 'Pyramiden-Volumen',
  description:
    'Berechne Volumen und Oberfläche einer geraden quadratischen Pyramide aus Grundkantenlänge und Höhe. Mit Seitenhöhe und Mantelfläche.',
  keywords: [
    'pyramiden volumen berechnen',
    'pyramide volumen rechner',
    'volumen pyramide formel',
    'quadratische pyramide oberfläche',
    'pyramide seitenhöhe',
    'volumen quadratische pyramide',
  ],
  formula:
    'V = (1/3)·a²·h ; Seitenhöhe hₛ = √(h² + (a/2)²) ; Oberfläche O = a² + 2·a·hₛ',
  intro:
    'Diese gerade Pyramide hat eine quadratische Grundfläche mit Kantenlänge a und steht senkrecht über ihrem Mittelpunkt mit Höhe h. Das Volumen ist ein Drittel von Grundfläche mal Höhe. Die Seitenhöhe (Höhe einer Seitenfläche) folgt aus dem Satz des Pythagoras.',
  inputs: [
    { type: 'number', id: 'a', label: 'Grundkante a', unit: 'cm', default: 6, min: 0, step: 0.1 },
    { type: 'number', id: 'hoehe', label: 'Höhe h', unit: 'cm', default: 4, min: 0, step: 0.1 },
  ],
  compute: (v) => {
    const a = Math.max(0, num(v.a));
    const h = Math.max(0, num(v.hoehe));
    const grundflaeche = a * a;
    const volumen = (1 / 3) * grundflaeche * h;
    const seitenhoehe = Math.sqrt(h * h + (a / 2) * (a / 2));
    const mantelflaeche = 2 * a * seitenhoehe;
    const oberflaeche = grundflaeche + mantelflaeche;
    return [
      { label: 'Volumen', value: volumen, unit: 'cm³', digits: 2, primary: true },
      { label: 'Oberfläche', value: oberflaeche, unit: 'cm²', digits: 2 },
      { label: 'Seitenhöhe hₛ', value: seitenhoehe, unit: 'cm', digits: 4 },
      { label: 'Mantelfläche', value: mantelflaeche, unit: 'cm²', digits: 2 },
      { label: 'Grundfläche', value: grundflaeche, unit: 'cm²', digits: 2 },
    ];
  },
  howto: [
    'Gib die Länge der Grundkante a (quadratische Grundfläche) ein.',
    'Trage die Höhe h der Pyramide ein.',
    'Lies Volumen und Oberfläche ab.',
  ],
  faq: [
    {
      q: 'Wie berechnet man das Volumen einer Pyramide?',
      a: 'Volumen = (1/3) · Grundfläche · Höhe. Bei quadratischer Grundfläche ist das (1/3) · a² · h.',
    },
    {
      q: 'Was ist der Unterschied zwischen Höhe und Seitenhöhe?',
      a: 'Die Höhe h verläuft senkrecht von der Spitze zur Grundfläche. Die Seitenhöhe hₛ ist die Höhe eines der dreieckigen Seitenflächen und länger als h.',
    },
    {
      q: 'Gilt der Rechner auch für andere Grundflächen?',
      a: 'Dieser Rechner ist auf die quadratische Grundfläche ausgelegt. Für andere Grundflächen gilt die Volumenformel V = (1/3)·G·h weiterhin, die Oberfläche unterscheidet sich aber.',
    },
  ],
  related: ['kegel-volumen-rechner', 'prisma-volumen-rechner', 'quader-volumen-rechner'],
  updated: '2026-06-19',
  examples: [
    {
      values: { a: 6, hoehe: 4 },
      expect: [
        { label: 'Volumen', value: 48, tolerance: 0.0001 },
        { label: 'Seitenhöhe hₛ', value: 5, tolerance: 0.0001 },
      ],
    },
    {
      values: { a: 3, hoehe: 10 },
      expect: [{ label: 'Volumen', value: 30, tolerance: 0.0001 }],
    },
  ],
};
