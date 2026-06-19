import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'grad-bogenmass-umrechner',
  category: 'mathe',
  title: 'Grad ↔ Bogenmaß Umrechner – Winkel zwischen Grad und Radiant umrechnen',
  shortTitle: 'Grad ↔ Radiant',
  description:
    'Rechne Winkel zwischen Grad (°) und Bogenmaß (Radiant) um. Das Bogenmaß wird zusätzlich als Vielfaches von π angezeigt – ideal für Trigonometrie und Analysis.',
  keywords: [
    'grad in bogenmaß',
    'bogenmaß in grad',
    'radiant umrechnen',
    'grad radiant rechner',
    'winkel umrechnen',
    'grad in pi',
  ],
  formula: 'Bogenmaß = Grad · π / 180 ; Grad = Bogenmaß · 180 / π',
  intro:
    'Das Bogenmaß (Radiant) misst einen Winkel über die Länge des zugehörigen Bogens am Einheitskreis. Ein voller Kreis von 360° entspricht 2π Radiant. In der Analysis und Trigonometrie wird meist im Bogenmaß gerechnet. Der Rechner wandelt in beide Richtungen um und zeigt das Bogenmaß auch als Vielfaches von π.',
  inputs: [
    { type: 'number', id: 'wert', label: 'Winkel', default: 180, step: 0.0001 },
    {
      type: 'select',
      id: 'richtung',
      label: 'Umrechnungsrichtung',
      default: 'grad2rad',
      options: [
        { value: 'grad2rad', label: 'Grad → Bogenmaß (Radiant)' },
        { value: 'rad2grad', label: 'Bogenmaß (Radiant) → Grad' },
      ],
    },
  ],
  compute: (v) => {
    const wert = num(v.wert);
    const richtung = String(v.richtung);
    if (richtung === 'grad2rad') {
      const rad = (wert * Math.PI) / 180;
      const inPi = wert / 180; // Faktor vor π
      return [
        { label: 'Bogenmaß', value: rad, unit: 'rad', digits: 6, primary: true },
        { label: 'Bogenmaß als Vielfaches von π', value: inPi, unit: '· π', digits: 6 },
        { label: 'Eingabe', value: wert, unit: '°', digits: 4 },
      ];
    }
    const grad = (wert * 180) / Math.PI;
    return [
      { label: 'Grad', value: grad, unit: '°', digits: 6, primary: true },
      { label: 'Bogenmaß als Vielfaches von π', value: wert / Math.PI, unit: '· π', digits: 6 },
      { label: 'Eingabe', value: wert, unit: 'rad', digits: 6 },
    ];
  },
  howto: [
    'Gib den Winkelwert ein.',
    'Wähle die Richtung: von Grad nach Bogenmaß oder umgekehrt.',
    'Lies das Ergebnis ab – das Bogenmaß auch als Vielfaches von π.',
  ],
  faq: [
    {
      q: 'Wie rechne ich Grad in Bogenmaß um?',
      a: 'Du multiplizierst den Gradwert mit π/180. Beispiel: 180° · π/180 = π ≈ 3,1416 rad.',
    },
    {
      q: 'Wie viel ist 1 Radiant in Grad?',
      a: 'Ein Radiant entspricht 180/π ≈ 57,2958°.',
    },
    {
      q: 'Warum rechnet man in der Mathematik mit Bogenmaß?',
      a: 'Im Bogenmaß werden Ableitungen und Reihen der Winkelfunktionen besonders einfach: z. B. ist die Ableitung von sin(x) genau cos(x) nur im Bogenmaß gültig.',
    },
  ],
  related: ['steigung-prozent-grad-rechner', 'rechtwinkliges-dreieck-rechner', 'kreis-rechner'],
  updated: '2026-06-19',
  examples: [
    {
      values: { wert: 180, richtung: 'grad2rad' },
      expect: [
        { label: 'Bogenmaß', value: 3.14159265, tolerance: 0.000001 },
        { label: 'Bogenmaß als Vielfaches von π', value: 1, tolerance: 0.000001 },
      ],
    },
    {
      values: { wert: 90, richtung: 'grad2rad' },
      expect: [{ label: 'Bogenmaß', value: 1.57079633, tolerance: 0.000001 }],
    },
  ],
};
