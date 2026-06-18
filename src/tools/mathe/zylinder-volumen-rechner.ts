import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'zylinder-volumen-rechner',
  category: 'mathe',
  title: 'Zylinder-Volumen-Rechner – Volumen und Oberfläche',
  shortTitle: 'Zylinder-Volumen',
  description:
    'Berechne Volumen und Oberfläche eines geraden Kreiszylinders aus Radius und Höhe. Mit Mantelfläche und Grundfläche zur Kontrolle.',
  keywords: [
    'zylinder volumen berechnen',
    'zylinder volumen rechner',
    'zylinder oberfläche berechnen',
    'volumen zylinder formel',
    'mantelfläche zylinder',
    'kreiszylinder volumen',
  ],
  formula: 'V = π · r² · h ; Oberfläche O = 2·π·r·(r + h)',
  intro:
    'Ein gerader Kreiszylinder wird durch Radius r und Höhe h beschrieben. Das Volumen ist die Grundfläche π·r² mal der Höhe. Die Oberfläche setzt sich aus zwei Kreisflächen und dem Mantel 2·π·r·h zusammen.',
  inputs: [
    { type: 'number', id: 'radius', label: 'Radius r', unit: 'cm', default: 5, min: 0, step: 0.1 },
    { type: 'number', id: 'hoehe', label: 'Höhe h', unit: 'cm', default: 10, min: 0, step: 0.1 },
  ],
  compute: (v) => {
    const r = num(v.radius);
    const h = num(v.hoehe);
    const grundflaeche = Math.PI * r * r;
    const volumen = grundflaeche * h;
    const mantel = 2 * Math.PI * r * h;
    const oberflaeche = 2 * grundflaeche + mantel;
    return [
      { label: 'Volumen', value: volumen, unit: 'cm³', digits: 2, primary: true },
      { label: 'Oberfläche', value: oberflaeche, unit: 'cm²', digits: 2 },
      { label: 'Grundfläche', value: grundflaeche, unit: 'cm²', digits: 2 },
      { label: 'Mantelfläche', value: mantel, unit: 'cm²', digits: 2 },
    ];
  },
  howto: [
    'Gib den Radius der Grundfläche ein.',
    'Trage die Höhe des Zylinders ein.',
    'Lies Volumen und Oberfläche ab.',
  ],
  faq: [
    {
      q: 'Wie berechnet man das Volumen eines Zylinders?',
      a: 'Volumen = π · Radius² · Höhe. Man multipliziert also die kreisförmige Grundfläche mit der Höhe.',
    },
    {
      q: 'Wie setzt sich die Oberfläche zusammen?',
      a: 'Aus zwei Kreisflächen (oben und unten) und der Mantelfläche. Formel: 2·π·r² + 2·π·r·h = 2·π·r·(r + h).',
    },
    {
      q: 'Wie rechne ich von Durchmesser auf Radius um?',
      a: 'Der Radius ist die Hälfte des Durchmessers. Teile den gemessenen Durchmesser einfach durch 2.',
    },
  ],
  related: ['kreis-rechner', 'kugel-volumen-rechner', 'quader-volumen-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { radius: 5, hoehe: 10 },
      expect: [
        { label: 'Volumen', value: 785.398, tolerance: 0.01 },
        { label: 'Oberfläche', value: 471.239, tolerance: 0.01 },
      ],
    },
    {
      values: { radius: 1, hoehe: 1 },
      expect: [{ label: 'Volumen', value: 3.14159, tolerance: 0.001 }],
    },
  ],
};
