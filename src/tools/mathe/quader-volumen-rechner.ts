import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'quader-volumen-rechner',
  category: 'mathe',
  title: 'Quader-Volumen berechnen – Länge, Breite, Höhe',
  shortTitle: 'Quader-Volumen',
  description:
    'Berechne das Volumen und die Oberfläche eines Quaders aus Länge, Breite und Höhe. Praktisch für Kartons, Aquarien, Räume und Versandpakete – inklusive Litern.',
  keywords: [
    'quader volumen berechnen',
    'volumen quader formel',
    'rauminhalt berechnen',
    'oberfläche quader',
    'volumen länge breite höhe',
    'kubikmeter berechnen',
    'liter berechnen quader',
    'box volumen rechner',
  ],
  formula:
    'Volumen V = Länge · Breite · Höhe ; Oberfläche O = 2 · (l·b + l·h + b·h)',
  intro:
    'Der Quader-Rechner ermittelt aus Länge, Breite und Höhe das Volumen und die Oberfläche eines rechtwinkligen Quaders. Das Volumen ist das Produkt der drei Kantenlängen, die Oberfläche die Summe aller sechs Rechteckflächen. Bei Eingabe in Zentimeter wird das Volumen zusätzlich in Litern angezeigt.',
  inputs: [
    { type: 'number', id: 'l', label: 'Länge', default: 30, unit: 'cm', min: 0, step: 0.1, help: 'Erste Kante des Quaders.' },
    { type: 'number', id: 'b', label: 'Breite', default: 20, unit: 'cm', min: 0, step: 0.1, help: 'Zweite Kante des Quaders.' },
    { type: 'number', id: 'h', label: 'Höhe', default: 10, unit: 'cm', min: 0, step: 0.1, help: 'Dritte Kante des Quaders.' },
  ],
  compute: (v) => {
    const l = Math.max(0, num(v.l));
    const b = Math.max(0, num(v.b));
    const h = Math.max(0, num(v.h));
    const volumen = l * b * h;
    const oberflaeche = 2 * (l * b + l * h + b * h);
    const liter = volumen / 1000; // gilt, wenn Eingabe in cm erfolgt
    return [
      { label: 'Volumen', value: volumen, unit: 'Einheit³', digits: 3, primary: true },
      { label: 'Volumen in Litern (bei cm)', value: liter, unit: 'l', digits: 3, help: 'Gilt, wenn alle Kanten in Zentimeter eingegeben wurden (1 l = 1000 cm³).' },
      { label: 'Oberfläche', value: oberflaeche, unit: 'Einheit²', digits: 3 },
    ];
  },
  howto: [
    'Miss die Länge, Breite und Höhe des Quaders in derselben Einheit.',
    'Gib die drei Kantenlängen ein.',
    'Lies das Volumen ab; es hat die hoch drei genommene Einheit (z. B. cm³).',
    'Bei Zentimeter-Eingabe zeigt der Rechner das Volumen auch in Litern.',
  ],
  faq: [
    {
      q: 'Wie berechne ich das Volumen eines Quaders?',
      a: 'Du multiplizierst Länge, Breite und Höhe: V = l · b · h. Bei 30 × 20 × 10 cm ergibt das 6000 cm³.',
    },
    {
      q: 'Wie viele cm³ sind ein Liter?',
      a: 'Ein Liter entspricht genau 1000 cm³ (Kubikzentimeter). Deshalb sind 6000 cm³ gleich 6 Liter.',
    },
    {
      q: 'Wie berechne ich die Oberfläche eines Quaders?',
      a: 'Mit O = 2 · (l·b + l·h + b·h). Du addierst die drei unterschiedlichen Seitenflächen und verdoppelst die Summe, weil jede Fläche zweimal vorkommt.',
    },
    {
      q: 'Gilt die Formel auch für einen Würfel?',
      a: 'Ja. Beim Würfel sind alle Kanten gleich lang, du gibst einfach dreimal denselben Wert ein. Das Volumen ist dann die Kantenlänge hoch drei.',
    },
  ],
  related: ['kreis-rechner', 'dreieck-flaeche-rechner', 'flaeche-umrechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { l: 30, b: 20, h: 10 },
      expect: [
        { label: 'Volumen', value: 6000, tolerance: 0.01 },
        { label: 'Oberfläche', value: 2200, tolerance: 0.01 },
      ],
    },
  ],
};
