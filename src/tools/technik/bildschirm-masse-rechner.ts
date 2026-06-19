import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

const CM_PRO_ZOLL = 2.54;

// Seitenverhältnisse als Breite/Höhe.
const RATIO: Record<string, { b: number; h: number }> = {
  '16:9': { b: 16, h: 9 },
  '16:10': { b: 16, h: 10 },
  '4:3': { b: 4, h: 3 },
  '21:9': { b: 21, h: 9 },
  '3:2': { b: 3, h: 2 },
  '1:1': { b: 1, h: 1 },
  '9:16': { b: 9, h: 16 },
};

export const tool: Tool = {
  slug: 'bildschirm-masse-rechner',
  category: 'technik',
  title: 'Bildschirm-Maße aus Diagonale-Rechner',
  shortTitle: 'Bildschirm-Maße',
  description:
    'Berechne Breite, Höhe und Fläche eines Bildschirms aus der Zoll-Diagonale und dem Seitenverhältnis – in Zentimetern und Quadratmetern.',
  keywords: [
    'bildschirm breite höhe berechnen',
    'zoll in cm bildschirm',
    'tv maße aus diagonale',
    'monitor breite höhe rechner',
    'bildschirmgröße cm',
    'diagonale in breite höhe',
  ],
  formula: 'Breite = Diagonale × b/√(b²+h²); Höhe = Diagonale × h/√(b²+h²) (b:h = Seitenverhältnis)',
  inputs: [
    { type: 'number', id: 'diagonale', label: 'Bildschirmdiagonale', unit: 'Zoll', default: 55, min: 1, step: 1 },
    {
      type: 'select',
      id: 'ratio',
      label: 'Seitenverhältnis',
      default: '16:9',
      options: [
        { value: '16:9', label: '16:9 (TV, Monitor)' },
        { value: '16:10', label: '16:10 (Notebook)' },
        { value: '4:3', label: '4:3 (klassisch)' },
        { value: '21:9', label: '21:9 (Ultrawide)' },
        { value: '3:2', label: '3:2 (Surface, Foto)' },
        { value: '1:1', label: '1:1 (quadratisch)' },
        { value: '9:16', label: '9:16 (Hochformat)' },
      ],
    },
  ],
  compute: (v) => {
    const diagZoll = num(v.diagonale);
    const r = RATIO[String(v.ratio)] ?? RATIO['16:9'];
    const norm = Math.sqrt(r.b * r.b + r.h * r.h);
    const breiteZoll = norm > 0 ? (diagZoll * r.b) / norm : 0;
    const hoeheZoll = norm > 0 ? (diagZoll * r.h) / norm : 0;
    const breiteCm = breiteZoll * CM_PRO_ZOLL;
    const hoeheCm = hoeheZoll * CM_PRO_ZOLL;
    const flaecheM2 = (breiteCm * hoeheCm) / 10000;
    return [
      { label: 'Breite', value: breiteCm, unit: 'cm', digits: 1, primary: true },
      { label: 'Höhe', value: hoeheCm, unit: 'cm', digits: 1 },
      { label: 'Diagonale in cm', value: diagZoll * CM_PRO_ZOLL, unit: 'cm', digits: 1 },
      { label: 'Bildfläche', value: flaecheM2, unit: 'm²', digits: 3 },
    ];
  },
  intro:
    'Die Zoll-Angabe eines Fernsehers oder Monitors bezieht sich nur auf die Bilddiagonale – nicht auf Breite oder Höhe. Wie breit und hoch das Bild tatsächlich ist, hängt zusätzlich vom Seitenverhältnis ab. Über den Satz des Pythagoras lassen sich aus Diagonale und Format die echten Maße berechnen: Ein 55-Zoll-16:9-TV ist rund 122 cm breit und 68 cm hoch. Praktisch für Möbel- und Wandplanung.',
  howto: [
    'Bildschirmdiagonale in Zoll eingeben.',
    'Seitenverhältnis wählen (meist 16:9).',
    'Breite, Höhe und Bildfläche in cm bzw. m² ablesen.',
  ],
  faq: [
    { q: 'Wie breit ist ein 55-Zoll-Fernseher?', a: 'Bei 16:9 ist die reine Bildbreite rund 121,8 cm und die Höhe etwa 68,5 cm. Das Gehäuse mit Rahmen ist je nach Modell etwas größer.' },
    { q: 'Warum reicht die Zoll-Angabe nicht?', a: 'Zoll gibt nur die Diagonale an. Zwei Bildschirme mit gleicher Diagonale, aber unterschiedlichem Seitenverhältnis (z. B. 16:9 und 21:9), haben verschiedene Breiten und Höhen.' },
    { q: 'Gilt das auch für den Rahmen?', a: 'Nein, berechnet wird die Bildfläche. Das Gehäuse fällt je nach Rahmenbreite einige Zentimeter größer aus – beim Möbelkauf lieber etwas Reserve einplanen.' },
  ],
  related: ['tv-groesse-sichtabstand-rechner', 'seitenverhaeltnis-rechner', 'dpi-ppi-rechner'],
  updated: '2026-06-19',
  examples: [
    {
      values: { diagonale: 55, ratio: '16:9' },
      // norm = √337 ≈ 18,35756; Breite = 55·16/18,35756 = 47,9367" ·2,54 = 121,759 cm
      expect: [
        { label: 'Breite', value: 121.8, tolerance: 0.2 },
        { label: 'Höhe', value: 68.5, tolerance: 0.2 },
      ],
    },
    {
      values: { diagonale: 24, ratio: '16:10' },
      // norm = √356 ≈ 18,86796; Breite = 24·16/18,86796 = 20,3517" ·2,54 = 51,693 cm
      expect: [{ label: 'Breite', value: 51.7, tolerance: 0.2 }],
    },
  ],
};
