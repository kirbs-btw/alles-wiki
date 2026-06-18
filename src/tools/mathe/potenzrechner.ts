import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'potenzrechner',
  category: 'mathe',
  title: 'Potenzrechner – Basis hoch Exponent berechnen',
  shortTitle: 'Potenzrechner',
  description:
    'Berechne Potenzen der Form Basis hoch Exponent. Funktioniert mit negativen und gebrochenen Exponenten und zeigt den Kehrwert zur Kontrolle.',
  keywords: [
    'potenz berechnen',
    'potenzrechner online',
    'basis hoch exponent',
    'hoch rechnen',
    'zahl potenzieren',
    'exponent rechner',
  ],
  formula: 'Ergebnis = Basis^Exponent ; negativer Exponent: a^(−n) = 1 / a^n',
  intro:
    'Eine Potenz a^n bedeutet, die Basis a mehrfach mit sich selbst zu multiplizieren. Der Rechner verarbeitet auch negative Exponenten (Kehrwert) und gebrochene Exponenten (Wurzeln). Bei negativer Basis und gebrochenem Exponenten ist das Ergebnis im Reellen nicht definiert.',
  inputs: [
    { type: 'number', id: 'basis', label: 'Basis', default: 2, step: 0.1 },
    { type: 'number', id: 'exponent', label: 'Exponent', default: 10, step: 1 },
  ],
  compute: (v) => {
    const basis = num(v.basis);
    const exp = num(v.exponent);
    const ergebnis = Math.pow(basis, exp);
    const gueltig = Number.isFinite(ergebnis);
    const kehrwert = ergebnis !== 0 && gueltig ? 1 / ergebnis : 0;
    return [
      { label: 'Ergebnis', value: gueltig ? ergebnis : 'nicht definiert', digits: 6, primary: true },
      { label: 'Kehrwert', value: gueltig ? kehrwert : 'nicht definiert', digits: 8, help: '1 geteilt durch das Ergebnis.' },
    ];
  },
  howto: [
    'Gib die Basis ein – die Zahl, die potenziert wird.',
    'Trage den Exponenten ein.',
    'Lies das Ergebnis ab.',
  ],
  faq: [
    {
      q: 'Was bedeutet ein negativer Exponent?',
      a: 'Ein negativer Exponent steht für den Kehrwert: a^(−n) = 1 / a^n. So ist 2^(−3) = 1/8 = 0,125.',
    },
    {
      q: 'Was ergibt eine Zahl hoch null?',
      a: 'Jede Zahl außer 0 ergibt hoch null genau 1, da a^0 = 1 definiert ist.',
    },
    {
      q: 'Kann ich gebrochene Exponenten verwenden?',
      a: 'Ja. Ein Exponent von 0,5 entspricht der Quadratwurzel. Bei negativer Basis und gebrochenem Exponenten ist das Ergebnis reell jedoch nicht definiert.',
    },
  ],
  related: ['wurzelrechner', 'logarithmus-rechner', 'fakultaet-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { basis: 2, exponent: 10 },
      expect: [{ label: 'Ergebnis', value: 1024, tolerance: 0.0001 }],
    },
    {
      values: { basis: 5, exponent: 3 },
      expect: [{ label: 'Ergebnis', value: 125, tolerance: 0.0001 }],
    },
  ],
};
