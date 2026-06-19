import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'abstand-zweier-punkte-rechner',
  category: 'mathe',
  title: 'Abstand zweier Punkte berechnen – Entfernung im Koordinatensystem',
  shortTitle: 'Punktabstand',
  description:
    'Berechne den Abstand zweier Punkte im Koordinatensystem mit der Abstandsformel (Satz des Pythagoras). Mit Mittelpunkt der Strecke.',
  keywords: [
    'abstand zweier punkte berechnen',
    'entfernung zwei punkte',
    'abstandsformel rechner',
    'streckenlänge berechnen',
    'mittelpunkt strecke berechnen',
    'distanz koordinaten',
  ],
  formula:
    'd = √((x₂ − x₁)² + (y₂ − y₁)²) ; Mittelpunkt M = ((x₁+x₂)/2 | (y₁+y₂)/2)',
  intro:
    'Der Abstand zweier Punkte P₁(x₁|y₁) und P₂(x₂|y₂) im kartesischen Koordinatensystem folgt direkt aus dem Satz des Pythagoras: Er ist die Wurzel aus der Summe der quadrierten Koordinatendifferenzen. Zusätzlich wird der Mittelpunkt der Verbindungsstrecke ausgegeben.',
  inputs: [
    { type: 'number', id: 'x1', label: 'x₁ (Punkt 1)', default: 1, step: 0.1 },
    { type: 'number', id: 'y1', label: 'y₁ (Punkt 1)', default: 2, step: 0.1 },
    { type: 'number', id: 'x2', label: 'x₂ (Punkt 2)', default: 4, step: 0.1 },
    { type: 'number', id: 'y2', label: 'y₂ (Punkt 2)', default: 6, step: 0.1 },
  ],
  compute: (v) => {
    const x1 = num(v.x1);
    const y1 = num(v.y1);
    const x2 = num(v.x2);
    const y2 = num(v.y2);
    const dx = x2 - x1;
    const dy = y2 - y1;
    const abstand = Math.sqrt(dx * dx + dy * dy);
    return [
      { label: 'Abstand d', value: abstand, digits: 4, primary: true },
      { label: 'Δx', value: dx, digits: 4 },
      { label: 'Δy', value: dy, digits: 4 },
      { label: 'Mittelpunkt x', value: (x1 + x2) / 2, digits: 4 },
      { label: 'Mittelpunkt y', value: (y1 + y2) / 2, digits: 4 },
    ];
  },
  howto: [
    'Trage die Koordinaten des ersten Punktes (x₁, y₁) ein.',
    'Trage die Koordinaten des zweiten Punktes (x₂, y₂) ein.',
    'Lies den Abstand d und den Mittelpunkt der Strecke ab.',
  ],
  faq: [
    {
      q: 'Wie lautet die Abstandsformel?',
      a: 'd = √((x₂ − x₁)² + (y₂ − y₁)²). Sie ergibt sich aus dem Satz des Pythagoras, da Δx und Δy die Katheten und der Abstand die Hypotenuse bilden.',
    },
    {
      q: 'Wie berechne ich den Mittelpunkt einer Strecke?',
      a: 'Bilde jeweils den Durchschnitt der x- und der y-Koordinaten: M = ((x₁+x₂)/2 | (y₁+y₂)/2).',
    },
    {
      q: 'Spielt die Reihenfolge der Punkte eine Rolle?',
      a: 'Nein. Da die Differenzen quadriert werden, ist der Abstand unabhängig davon, welcher Punkt zuerst eingegeben wird.',
    },
  ],
  related: ['satz-des-pythagoras-rechner', 'geradengleichung-aus-zwei-punkten-rechner', 'wurzelrechner'],
  updated: '2026-06-19',
  examples: [
    {
      values: { x1: 1, y1: 2, x2: 4, y2: 6 },
      expect: [
        { label: 'Abstand d', value: 5, tolerance: 0.0001 },
        { label: 'Mittelpunkt x', value: 2.5, tolerance: 0.0001 },
      ],
    },
    {
      values: { x1: 0, y1: 0, x2: 3, y2: 4 },
      expect: [{ label: 'Abstand d', value: 5, tolerance: 0.0001 }],
    },
  ],
};
