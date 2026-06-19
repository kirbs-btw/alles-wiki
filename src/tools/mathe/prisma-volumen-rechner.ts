import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'prisma-volumen-rechner',
  category: 'mathe',
  title: 'Prisma-Volumen-Rechner – Volumen aus Grundfläche und Höhe',
  shortTitle: 'Prisma-Volumen',
  description:
    'Berechne das Volumen und die Oberfläche eines geraden Prismas aus Grundfläche, Umfang der Grundfläche und Höhe. Für beliebige Grundformen.',
  keywords: [
    'prisma volumen berechnen',
    'prisma volumen rechner',
    'volumen prisma formel',
    'prisma oberfläche berechnen',
    'gerades prisma volumen',
    'grundfläche mal höhe',
  ],
  formula:
    'V = G · h ; Oberfläche O = 2·G + U·h (G Grundfläche, U Umfang der Grundfläche, h Höhe)',
  intro:
    'Ein gerades Prisma entsteht, wenn eine ebene Grundfläche entlang der Höhe parallel verschoben wird. Das Volumen ist immer Grundfläche mal Höhe – unabhängig von der Form der Grundfläche. Für die Oberfläche werden zusätzlich der Umfang der Grundfläche und die beiden Deckflächen benötigt.',
  inputs: [
    { type: 'number', id: 'grundflaeche', label: 'Grundfläche G', unit: 'cm²', default: 12, min: 0, step: 0.1 },
    { type: 'number', id: 'umfang', label: 'Umfang der Grundfläche U', unit: 'cm', default: 16, min: 0, step: 0.1, help: 'Für die Oberfläche. Bei reiner Volumenberechnung nicht nötig.' },
    { type: 'number', id: 'hoehe', label: 'Höhe h', unit: 'cm', default: 10, min: 0, step: 0.1 },
  ],
  compute: (v) => {
    const g = Math.max(0, num(v.grundflaeche));
    const u = Math.max(0, num(v.umfang));
    const h = Math.max(0, num(v.hoehe));
    const volumen = g * h;
    const mantelflaeche = u * h;
    const oberflaeche = 2 * g + mantelflaeche;
    return [
      { label: 'Volumen', value: volumen, unit: 'cm³', digits: 2, primary: true },
      { label: 'Oberfläche', value: oberflaeche, unit: 'cm²', digits: 2 },
      { label: 'Mantelfläche', value: mantelflaeche, unit: 'cm²', digits: 2 },
    ];
  },
  howto: [
    'Bestimme die Grundfläche G der gewünschten Grundform (z. B. Dreieck, Sechseck) und trage sie ein.',
    'Trage den Umfang der Grundfläche ein, falls du die Oberfläche brauchst.',
    'Gib die Höhe h (Länge) des Prismas ein.',
    'Lies Volumen und Oberfläche ab.',
  ],
  faq: [
    {
      q: 'Wie berechnet man das Volumen eines Prismas?',
      a: 'Volumen = Grundfläche · Höhe. Das gilt für jedes gerade Prisma, egal ob die Grundfläche ein Dreieck, Rechteck oder Vieleck ist.',
    },
    {
      q: 'Wie ermittle ich die Grundfläche?',
      a: 'Je nach Form mit der passenden Flächenformel: Rechteck a·b, Dreieck (g·h)/2, regelmäßiges Sechseck (3·√3/2)·a² usw.',
    },
    {
      q: 'Wozu brauche ich den Umfang der Grundfläche?',
      a: 'Nur für die Oberfläche. Die Mantelfläche eines Prismas ist Umfang der Grundfläche mal Höhe. Für das Volumen wird der Umfang nicht benötigt.',
    },
  ],
  related: ['quader-volumen-rechner', 'zylinder-volumen-rechner', 'dreieck-flaeche-rechner'],
  updated: '2026-06-19',
  examples: [
    {
      values: { grundflaeche: 12, umfang: 16, hoehe: 10 },
      expect: [
        { label: 'Volumen', value: 120, tolerance: 0.0001 },
        { label: 'Oberfläche', value: 184, tolerance: 0.0001 },
      ],
    },
    {
      values: { grundflaeche: 6, umfang: 12, hoehe: 5 },
      expect: [{ label: 'Volumen', value: 30, tolerance: 0.0001 }],
    },
  ],
};
