import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'kugel-volumen-rechner',
  category: 'mathe',
  title: 'Kugel-Volumen-Rechner – Volumen und Oberfläche einer Kugel',
  shortTitle: 'Kugel-Volumen',
  description:
    'Berechne Volumen und Oberfläche einer Kugel aus dem Radius. Mit Anzeige des Durchmessers und der Oberflächenformel 4·π·r².',
  keywords: [
    'kugel volumen berechnen',
    'kugel volumen rechner',
    'kugel oberfläche berechnen',
    'volumen kugel formel',
    'kugeloberfläche',
    'radius kugel volumen',
  ],
  formula: 'V = (4/3) · π · r³ ; Oberfläche O = 4 · π · r²',
  intro:
    'Eine Kugel ist allein durch ihren Radius r bestimmt. Das Volumen beträgt vier Drittel π mal Radius hoch drei, die Oberfläche vier π mal Radius zum Quadrat. Der Rechner zeigt zusätzlich den Durchmesser.',
  inputs: [
    { type: 'number', id: 'radius', label: 'Radius r', unit: 'cm', default: 6, min: 0, step: 0.1 },
  ],
  compute: (v) => {
    const r = num(v.radius);
    const volumen = (4 / 3) * Math.PI * r * r * r;
    const oberflaeche = 4 * Math.PI * r * r;
    return [
      { label: 'Volumen', value: volumen, unit: 'cm³', digits: 2, primary: true },
      { label: 'Oberfläche', value: oberflaeche, unit: 'cm²', digits: 2 },
      { label: 'Durchmesser', value: 2 * r, unit: 'cm', digits: 2 },
    ];
  },
  howto: [
    'Gib den Radius der Kugel ein.',
    'Lies Volumen und Oberfläche ab.',
    'Bei bekanntem Durchmesser diesen halbieren, um den Radius zu erhalten.',
  ],
  faq: [
    {
      q: 'Wie berechnet man das Volumen einer Kugel?',
      a: 'Volumen = (4/3) · π · Radius³. Der Radius wird also dreifach potenziert und mit vier Dritteln π multipliziert.',
    },
    {
      q: 'Wie groß ist die Oberfläche einer Kugel?',
      a: 'Die Kugeloberfläche beträgt 4 · π · Radius². Sie entspricht dem Vierfachen der Fläche eines Großkreises.',
    },
    {
      q: 'Ich kenne nur den Durchmesser – was tun?',
      a: 'Halbiere den Durchmesser, um den Radius zu erhalten, und gib diesen Wert ein.',
    },
  ],
  related: ['kreis-rechner', 'zylinder-volumen-rechner', 'quader-volumen-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { radius: 6 },
      expect: [
        { label: 'Volumen', value: 904.7787, tolerance: 0.01 },
        { label: 'Oberfläche', value: 452.3893, tolerance: 0.01 },
      ],
    },
    {
      values: { radius: 1 },
      expect: [{ label: 'Volumen', value: 4.18879, tolerance: 0.001 }],
    },
  ],
};
