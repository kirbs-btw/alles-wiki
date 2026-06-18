import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'logarithmus-rechner',
  category: 'mathe',
  title: 'Logarithmus-Rechner – Log zu beliebiger Basis',
  shortTitle: 'Logarithmus',
  description:
    'Berechne den Logarithmus einer Zahl zu einer frei wählbaren Basis. Zusätzlich werden der natürliche Logarithmus (ln) und der Zehnerlogarithmus angezeigt.',
  keywords: [
    'logarithmus berechnen',
    'log rechner',
    'logarithmus zur basis',
    'natürlicher logarithmus',
    'ln berechnen',
    'log basis 2',
  ],
  formula: 'log_b(x) = ln(x) / ln(b) ; ln = log zur Basis e ; lg = log zur Basis 10',
  intro:
    'Der Logarithmus log_b(x) beantwortet die Frage: Mit welchem Exponenten muss ich die Basis b potenzieren, um x zu erhalten? Über die Umrechnung log_b(x) = ln(x) / ln(b) lässt sich jede Basis berechnen. Der Rechner zeigt zusätzlich ln und den Zehnerlogarithmus.',
  inputs: [
    { type: 'number', id: 'x', label: 'Zahl (Numerus)', default: 1000, min: 0, step: 0.1, help: 'Die Zahl, deren Logarithmus gesucht wird (muss positiv sein).' },
    { type: 'number', id: 'basis', label: 'Basis', default: 10, min: 0, step: 0.1, help: 'z. B. 10, 2 oder e ≈ 2,71828.' },
  ],
  compute: (v) => {
    const x = num(v.x);
    const basis = num(v.basis);
    const gueltig = x > 0 && basis > 0 && basis !== 1;
    const logB = gueltig ? Math.log(x) / Math.log(basis) : 0;
    const ln = x > 0 ? Math.log(x) : 0;
    const lg = x > 0 ? Math.log10(x) : 0;
    return [
      { label: 'Logarithmus zur Basis', value: gueltig ? logB : 'nicht definiert', digits: 6, primary: true },
      { label: 'Natürlicher Logarithmus (ln)', value: x > 0 ? ln : 'nicht definiert', digits: 6 },
      { label: 'Zehnerlogarithmus (lg)', value: x > 0 ? lg : 'nicht definiert', digits: 6 },
    ];
  },
  howto: [
    'Gib die Zahl ein, deren Logarithmus du suchst (positiv).',
    'Wähle die Basis, z. B. 10, 2 oder die eulersche Zahl e.',
    'Lies den Logarithmus zur gewählten Basis ab.',
  ],
  faq: [
    {
      q: 'Was ist ein Logarithmus?',
      a: 'Der Logarithmus log_b(x) ist der Exponent, mit dem die Basis b potenziert werden muss, um x zu erhalten. log₁₀(1000) = 3, weil 10³ = 1000.',
    },
    {
      q: 'Was ist der Unterschied zwischen ln und lg?',
      a: 'ln ist der natürliche Logarithmus zur Basis e (≈ 2,718), lg der Zehnerlogarithmus zur Basis 10. Beide sind Sonderfälle des allgemeinen Logarithmus.',
    },
    {
      q: 'Warum muss die Zahl positiv sein?',
      a: 'Der Logarithmus ist nur für positive Zahlen definiert. Für 0 oder negative Werte gibt es im Reellen keinen Logarithmus.',
    },
  ],
  related: ['potenzrechner', 'wurzelrechner', 'zinseszinsrechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { x: 1000, basis: 10 },
      expect: [
        { label: 'Logarithmus zur Basis', value: 3, tolerance: 0.0001 },
        { label: 'Zehnerlogarithmus (lg)', value: 3, tolerance: 0.0001 },
      ],
    },
    {
      values: { x: 8, basis: 2 },
      expect: [{ label: 'Logarithmus zur Basis', value: 3, tolerance: 0.0001 }],
    },
  ],
};
