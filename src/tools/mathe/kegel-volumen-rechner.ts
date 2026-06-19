import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'kegel-volumen-rechner',
  category: 'mathe',
  title: 'Kegel-Volumen-Rechner – Volumen, Oberfläche und Mantellinie',
  shortTitle: 'Kegel-Volumen',
  description:
    'Berechne Volumen und Oberfläche eines geraden Kreiskegels aus Radius und Höhe. Mit Mantellinie, Mantelfläche und Grundfläche.',
  keywords: [
    'kegel volumen berechnen',
    'kegel volumen rechner',
    'kegel oberfläche berechnen',
    'volumen kegel formel',
    'mantellinie kegel',
    'kreiskegel volumen',
  ],
  formula:
    'V = (1/3)·π·r²·h ; Mantellinie s = √(r² + h²) ; Oberfläche O = π·r·(r + s)',
  intro:
    'Ein gerader Kreiskegel ist durch Radius r der Grundfläche und Höhe h bestimmt. Das Volumen beträgt ein Drittel des zugehörigen Zylinders. Die Mantellinie s (Seitenlinie) ergibt sich über den Satz des Pythagoras, die Oberfläche aus Grundkreis und Mantel.',
  inputs: [
    { type: 'number', id: 'radius', label: 'Radius r', unit: 'cm', default: 3, min: 0, step: 0.1 },
    { type: 'number', id: 'hoehe', label: 'Höhe h', unit: 'cm', default: 4, min: 0, step: 0.1 },
  ],
  compute: (v) => {
    const r = Math.max(0, num(v.radius));
    const h = Math.max(0, num(v.hoehe));
    const volumen = (1 / 3) * Math.PI * r * r * h;
    const mantellinie = Math.sqrt(r * r + h * h);
    const grundflaeche = Math.PI * r * r;
    const mantelflaeche = Math.PI * r * mantellinie;
    const oberflaeche = grundflaeche + mantelflaeche;
    return [
      { label: 'Volumen', value: volumen, unit: 'cm³', digits: 2, primary: true },
      { label: 'Oberfläche', value: oberflaeche, unit: 'cm²', digits: 2 },
      { label: 'Mantellinie s', value: mantellinie, unit: 'cm', digits: 4 },
      { label: 'Mantelfläche', value: mantelflaeche, unit: 'cm²', digits: 2 },
      { label: 'Grundfläche', value: grundflaeche, unit: 'cm²', digits: 2 },
    ];
  },
  howto: [
    'Gib den Radius der kreisförmigen Grundfläche ein.',
    'Trage die Höhe des Kegels ein (senkrecht von der Spitze zur Grundfläche).',
    'Lies Volumen und Oberfläche ab.',
  ],
  faq: [
    {
      q: 'Wie berechnet man das Volumen eines Kegels?',
      a: 'Volumen = (1/3) · π · Radius² · Höhe. Ein Kegel hat genau ein Drittel des Volumens eines Zylinders mit gleichem Radius und gleicher Höhe.',
    },
    {
      q: 'Was ist die Mantellinie?',
      a: 'Die Mantellinie s ist die Strecke von der Kegelspitze zum Rand der Grundfläche. Sie wird mit s = √(r² + h²) berechnet.',
    },
    {
      q: 'Wie groß ist die Oberfläche eines Kegels?',
      a: 'Sie setzt sich aus der Grundkreisfläche π·r² und der Mantelfläche π·r·s zusammen: O = π·r·(r + s).',
    },
  ],
  related: ['zylinder-volumen-rechner', 'pyramiden-volumen-rechner', 'kugel-volumen-rechner'],
  updated: '2026-06-19',
  examples: [
    {
      values: { radius: 3, hoehe: 4 },
      expect: [
        { label: 'Volumen', value: 37.699, tolerance: 0.01 },
        { label: 'Mantellinie s', value: 5, tolerance: 0.0001 },
      ],
    },
    {
      values: { radius: 1, hoehe: 3 },
      expect: [{ label: 'Volumen', value: 3.14159, tolerance: 0.001 }],
    },
  ],
};
