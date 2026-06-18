import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'dreieck-flaeche-rechner',
  category: 'mathe',
  title: 'Dreiecksfläche berechnen – Grundseite und Höhe',
  shortTitle: 'Dreiecksfläche',
  description:
    'Berechne die Fläche eines Dreiecks aus Grundseite und zugehöriger Höhe. Mit der klassischen Formel halbe Grundseite mal Höhe – passend für jedes Dreieck.',
  keywords: [
    'dreieck fläche berechnen',
    'dreiecksfläche formel',
    'fläche dreieck',
    'grundseite höhe dreieck',
    'flächeninhalt dreieck',
    'dreieck rechner',
    'fläche dreieck berechnen',
    'gleichseitiges dreieck fläche',
  ],
  formula:
    'Fläche A = (Grundseite g · Höhe h) / 2',
  intro:
    'Die Fläche eines beliebigen Dreiecks berechnest du aus einer Grundseite und der dazu senkrechten Höhe. Die Formel A = (g · h) / 2 gilt für jedes Dreieck – ob spitzwinklig, rechtwinklig oder stumpfwinklig. Wichtig ist nur, dass die Höhe genau zur gewählten Grundseite gehört.',
  inputs: [
    { type: 'number', id: 'g', label: 'Grundseite g', default: 8, unit: 'cm', min: 0, step: 0.01, help: 'Eine Seite des Dreiecks, die als Basis dient.' },
    { type: 'number', id: 'h', label: 'Höhe h', default: 5, unit: 'cm', min: 0, step: 0.01, help: 'Senkrechter Abstand von der Grundseite zur gegenüberliegenden Ecke.' },
  ],
  compute: (v) => {
    const g = Math.max(0, num(v.g));
    const h = Math.max(0, num(v.h));
    const flaeche = (g * h) / 2;
    return [
      { label: 'Dreiecksfläche', value: flaeche, unit: 'Einheit²', digits: 4, primary: true },
      { label: 'Grundseite × Höhe', value: g * h, unit: 'Einheit²', digits: 4, help: 'Fläche des umschließenden Rechtecks (doppelte Dreiecksfläche).' },
    ];
  },
  howto: [
    'Wähle eine Seite des Dreiecks als Grundseite g.',
    'Bestimme die zugehörige Höhe h – den senkrechten Abstand zur gegenüberliegenden Ecke.',
    'Gib beide Werte in derselben Längeneinheit ein.',
    'Lies die Fläche ab; sie hat die quadrierte Einheit (z. B. cm²).',
  ],
  faq: [
    {
      q: 'Wie berechne ich die Fläche eines Dreiecks?',
      a: 'Mit der Formel A = (g · h) / 2. Du multiplizierst Grundseite und Höhe und halbierst das Ergebnis. Bei g = 8 und h = 5 sind das 20 Flächeneinheiten.',
    },
    {
      q: 'Welche Höhe muss ich verwenden?',
      a: 'Genau die Höhe, die senkrecht auf der gewählten Grundseite steht und bis zur gegenüberliegenden Ecke reicht. Jede Seite hat ihre eigene Höhe.',
    },
    {
      q: 'Gilt die Formel auch für rechtwinklige Dreiecke?',
      a: 'Ja. Beim rechtwinkligen Dreieck sind die beiden Katheten Grundseite und Höhe zugleich, die Formel funktioniert unverändert.',
    },
    {
      q: 'Warum wird durch 2 geteilt?',
      a: 'Ein Dreieck ist genau die Hälfte des Rechtecks aus Grundseite und Höhe. Deshalb halbierst du das Produkt g · h.',
    },
  ],
  related: ['kreis-rechner', 'quader-volumen-rechner', 'flaeche-umrechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { g: 8, h: 5 },
      expect: [{ label: 'Dreiecksfläche', value: 20, tolerance: 0.001 }],
    },
    {
      values: { g: 10, h: 3 },
      expect: [{ label: 'Dreiecksfläche', value: 15, tolerance: 0.001 }],
    },
  ],
};
