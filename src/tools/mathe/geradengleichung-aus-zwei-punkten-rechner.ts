import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'geradengleichung-aus-zwei-punkten-rechner',
  category: 'mathe',
  title: 'Geradengleichung aus zwei Punkten – Steigung und y-Achsenabschnitt',
  shortTitle: 'Geradengleichung',
  description:
    'Bestimme die Geradengleichung y = m·x + b aus zwei Punkten. Mit Steigung m, y-Achsenabschnitt b und der Nullstelle der Geraden.',
  keywords: [
    'geradengleichung aus zwei punkten',
    'steigung berechnen',
    'y achsenabschnitt berechnen',
    'lineare funktion aus punkten',
    'geradengleichung rechner',
    'm und b berechnen',
  ],
  formula:
    'm = (y₂ − y₁) / (x₂ − x₁) ; b = y₁ − m·x₁ ; Nullstelle x₀ = −b / m',
  intro:
    'Aus zwei Punkten P₁(x₁|y₁) und P₂(x₂|y₂) lässt sich genau eine Gerade y = m·x + b legen. Die Steigung m ist das Verhältnis der Differenzen in y und x, der y-Achsenabschnitt b folgt durch Einsetzen eines Punktes. Bei gleichen x-Werten ist die Gerade senkrecht und hat keine Steigung.',
  inputs: [
    { type: 'number', id: 'x1', label: 'x₁ (Punkt 1)', default: 1, step: 0.1 },
    { type: 'number', id: 'y1', label: 'y₁ (Punkt 1)', default: 2, step: 0.1 },
    { type: 'number', id: 'x2', label: 'x₂ (Punkt 2)', default: 3, step: 0.1 },
    { type: 'number', id: 'y2', label: 'y₂ (Punkt 2)', default: 8, step: 0.1 },
  ],
  compute: (v) => {
    const x1 = num(v.x1);
    const y1 = num(v.y1);
    const x2 = num(v.x2);
    const y2 = num(v.y2);
    const dx = x2 - x1;
    if (dx === 0) {
      return [
        { label: 'Steigung m', value: 'Senkrechte Gerade (x = ' + x1 + ')', primary: true },
        { label: 'y-Achsenabschnitt b', value: 'nicht definiert' },
      ];
    }
    const m = (y2 - y1) / dx;
    const b = y1 - m * x1;
    const ergebnis: { label: string; value: number | string; digits?: number; primary?: boolean; unit?: string }[] = [
      { label: 'Steigung m', value: m, digits: 4, primary: true },
      { label: 'y-Achsenabschnitt b', value: b, digits: 4 },
    ];
    if (m !== 0) {
      ergebnis.push({ label: 'Nullstelle x₀', value: -b / m, digits: 4 });
    } else {
      ergebnis.push({ label: 'Nullstelle x₀', value: 'keine (waagerechte Gerade)' });
    }
    return ergebnis;
  },
  howto: [
    'Trage die Koordinaten des ersten Punktes (x₁, y₁) ein.',
    'Trage die Koordinaten des zweiten Punktes (x₂, y₂) ein.',
    'Lies Steigung m und y-Achsenabschnitt b ab.',
    'Die Geradengleichung lautet y = m·x + b.',
  ],
  faq: [
    {
      q: 'Wie berechne ich die Steigung aus zwei Punkten?',
      a: 'Die Steigung m ist die Differenz der y-Werte geteilt durch die Differenz der x-Werte: m = (y₂ − y₁) / (x₂ − x₁).',
    },
    {
      q: 'Wie finde ich den y-Achsenabschnitt b?',
      a: 'Setze einen bekannten Punkt in y = m·x + b ein und löse nach b auf: b = y₁ − m·x₁.',
    },
    {
      q: 'Warum gibt es bei gleichen x-Werten keine Steigung?',
      a: 'Liegen beide Punkte übereinander (x₁ = x₂), ist die Gerade senkrecht. Eine senkrechte Gerade x = c hat keine definierte Steigung und keinen y-Achsenabschnitt.',
    },
  ],
  related: ['abstand-zweier-punkte-rechner', 'lineares-gleichungssystem-2x2-rechner', 'steigung-prozent-grad-rechner'],
  updated: '2026-06-19',
  examples: [
    {
      values: { x1: 1, y1: 2, x2: 3, y2: 8 },
      expect: [
        { label: 'Steigung m', value: 3, tolerance: 0.0001 },
        { label: 'y-Achsenabschnitt b', value: -1, tolerance: 0.0001 },
      ],
    },
    {
      values: { x1: 0, y1: 4, x2: 2, y2: 0 },
      expect: [
        { label: 'Steigung m', value: -2, tolerance: 0.0001 },
        { label: 'Nullstelle x₀', value: 2, tolerance: 0.0001 },
      ],
    },
  ],
};
