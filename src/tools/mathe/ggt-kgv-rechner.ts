import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'ggt-kgv-rechner',
  category: 'mathe',
  title: 'ggT und kgV Rechner – größter gemeinsamer Teiler & kleinstes gemeinsames Vielfaches',
  shortTitle: 'ggT & kgV',
  description:
    'Berechne den größten gemeinsamen Teiler (ggT) und das kleinste gemeinsame Vielfache (kgV) zweier ganzer Zahlen mit dem euklidischen Algorithmus.',
  keywords: [
    'ggt berechnen',
    'kgv berechnen',
    'größter gemeinsamer teiler',
    'kleinstes gemeinsames vielfaches',
    'ggt kgv rechner',
    'euklidischer algorithmus',
  ],
  formula: 'ggT(a,b) per euklidischem Algorithmus ; kgV(a,b) = |a · b| / ggT(a,b)',
  intro:
    'Der größte gemeinsame Teiler (ggT) ist die größte Zahl, durch die beide Zahlen ohne Rest teilbar sind. Das kleinste gemeinsame Vielfache (kgV) ist die kleinste Zahl, die ein Vielfaches beider Zahlen ist. Beide werden hier für zwei ganze Zahlen berechnet.',
  inputs: [
    { type: 'number', id: 'a', label: 'Zahl a', default: 12, min: 0, step: 1 },
    { type: 'number', id: 'b', label: 'Zahl b', default: 18, min: 0, step: 1 },
  ],
  compute: (v) => {
    let a = Math.abs(Math.round(num(v.a)));
    let b = Math.abs(Math.round(num(v.b)));
    const aOrig = a;
    const bOrig = b;
    // euklidischer Algorithmus
    while (b !== 0) {
      const t = b;
      b = a % b;
      a = t;
    }
    const ggt = a; // a hält jetzt den ggT
    const kgv = ggt > 0 ? (aOrig / ggt) * bOrig : 0;
    return [
      { label: 'ggT', value: ggt, digits: 0, primary: true, help: 'Größter gemeinsamer Teiler.' },
      { label: 'kgV', value: kgv, digits: 0, help: 'Kleinstes gemeinsames Vielfaches.' },
    ];
  },
  howto: [
    'Gib zwei ganze Zahlen ein.',
    'Lies den größten gemeinsamen Teiler (ggT) ab.',
    'Lies das kleinste gemeinsame Vielfache (kgV) ab.',
  ],
  faq: [
    {
      q: 'Was ist der größte gemeinsame Teiler?',
      a: 'Der ggT ist die größte natürliche Zahl, die beide Zahlen ohne Rest teilt. Bei 12 und 18 ist es 6.',
    },
    {
      q: 'Wie hängen ggT und kgV zusammen?',
      a: 'Es gilt ggT(a,b) · kgV(a,b) = a · b. Daraus folgt kgV = (a · b) / ggT.',
    },
    {
      q: 'Wofür braucht man ggT und kgV?',
      a: 'Der ggT dient zum Kürzen von Brüchen, das kgV zum Finden eines gemeinsamen Nenners beim Addieren von Brüchen.',
    },
  ],
  related: ['bruchrechner', 'potenzrechner', 'durchschnitt-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { a: 12, b: 18 },
      expect: [
        { label: 'ggT', value: 6, tolerance: 0 },
        { label: 'kgV', value: 36, tolerance: 0 },
      ],
    },
    {
      values: { a: 24, b: 36 },
      expect: [
        { label: 'ggT', value: 12, tolerance: 0 },
        { label: 'kgV', value: 72, tolerance: 0 },
      ],
    },
  ],
};
