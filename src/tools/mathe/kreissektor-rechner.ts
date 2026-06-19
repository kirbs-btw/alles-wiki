import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'kreissektor-rechner',
  category: 'mathe',
  title: 'Kreissektor-Rechner – Fläche und Bogenlänge eines Kreisausschnitts',
  shortTitle: 'Kreissektor',
  description:
    'Berechne Fläche, Bogenlänge und Umfang eines Kreissektors (Kreisausschnitt) aus Radius und Mittelpunktswinkel in Grad.',
  keywords: [
    'kreissektor berechnen',
    'kreisausschnitt fläche',
    'bogenlänge berechnen',
    'kreissektor rechner',
    'sektor fläche formel',
    'kreisbogen länge',
  ],
  formula:
    'Fläche A = (α/360°)·π·r² ; Bogenlänge b = (α/360°)·2·π·r ; Umfang = b + 2·r',
  intro:
    'Ein Kreissektor ist ein „Tortenstück" eines Kreises, begrenzt durch zwei Radien und einen Kreisbogen. Fläche und Bogenlänge ergeben sich aus dem Anteil des Mittelpunktswinkels α am Vollwinkel 360°. Der Umfang des Sektors umfasst den Bogen und die beiden Radien.',
  inputs: [
    { type: 'number', id: 'radius', label: 'Radius r', unit: 'cm', default: 5, min: 0, step: 0.1 },
    { type: 'number', id: 'winkel', label: 'Mittelpunktswinkel α', unit: '°', default: 90, min: 0, max: 360, step: 1 },
  ],
  compute: (v) => {
    const r = Math.max(0, num(v.radius));
    const alpha = Math.max(0, Math.min(360, num(v.winkel)));
    const anteil = alpha / 360;
    const flaeche = anteil * Math.PI * r * r;
    const bogen = anteil * 2 * Math.PI * r;
    const umfang = bogen + 2 * r;
    return [
      { label: 'Fläche', value: flaeche, unit: 'cm²', digits: 4, primary: true },
      { label: 'Bogenlänge', value: bogen, unit: 'cm', digits: 4 },
      { label: 'Umfang (Bogen + 2 Radien)', value: umfang, unit: 'cm', digits: 4 },
    ];
  },
  howto: [
    'Gib den Radius r des Kreises ein.',
    'Trage den Mittelpunktswinkel α des Sektors in Grad ein (0° bis 360°).',
    'Lies Fläche, Bogenlänge und Umfang ab.',
  ],
  faq: [
    {
      q: 'Wie berechnet man die Fläche eines Kreissektors?',
      a: 'Über den Winkelanteil: A = (α/360°) · π · r². Bei α = 360° ergibt sich die volle Kreisfläche.',
    },
    {
      q: 'Wie lang ist der Bogen eines Kreissektors?',
      a: 'Die Bogenlänge ist der entsprechende Anteil des Kreisumfangs: b = (α/360°) · 2 · π · r.',
    },
    {
      q: 'Was ist der Unterschied zwischen Sektor und Segment?',
      a: 'Ein Kreissektor wird von zwei Radien und dem Bogen begrenzt (Tortenstück). Ein Kreissegment ist die Fläche zwischen einer Sehne und dem Bogen.',
    },
  ],
  related: ['kreis-rechner', 'grad-bogenmass-umrechner', 'dreieck-flaeche-rechner'],
  updated: '2026-06-19',
  examples: [
    {
      values: { radius: 5, winkel: 90 },
      expect: [
        { label: 'Fläche', value: 19.635, tolerance: 0.01 },
        { label: 'Bogenlänge', value: 7.854, tolerance: 0.01 },
      ],
    },
    {
      values: { radius: 5, winkel: 360 },
      expect: [{ label: 'Fläche', value: 78.5398, tolerance: 0.01 }],
    },
  ],
};
