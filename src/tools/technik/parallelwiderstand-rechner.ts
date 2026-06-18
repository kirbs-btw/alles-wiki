import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'parallelwiderstand-rechner',
  category: 'technik',
  title: 'Parallelwiderstand-Rechner',
  shortTitle: 'Parallelwiderstand',
  description:
    'Berechne den Gesamtwiderstand zweier parallel geschalteter Widerstände sowie zum Vergleich den Wert bei Reihenschaltung.',
  keywords: [
    'parallelwiderstand berechnen',
    'widerstände parallel rechner',
    'gesamtwiderstand parallel',
    'parallelschaltung widerstand',
    'zwei widerstände parallel',
    'ersatzwiderstand parallel',
  ],
  formula: 'R_parallel = (R1 × R2) / (R1 + R2); R_reihe = R1 + R2',
  inputs: [
    {
      type: 'number',
      id: 'r1',
      label: 'Widerstand R1',
      unit: 'Ohm',
      default: 10,
      min: 0,
      step: 1,
    },
    {
      type: 'number',
      id: 'r2',
      label: 'Widerstand R2',
      unit: 'Ohm',
      default: 10,
      min: 0,
      step: 1,
    },
  ],
  compute: (v) => {
    const r1 = num(v.r1);
    const r2 = num(v.r2);
    const summe = r1 + r2;
    const parallel = summe > 0 ? (r1 * r2) / summe : 0;
    const reihe = summe;
    return [
      { label: 'Parallelwiderstand', value: parallel, unit: 'Ohm', digits: 3, primary: true },
      { label: 'Reihenwiderstand (Vergleich)', value: reihe, unit: 'Ohm', digits: 3 },
    ];
  },
  intro:
    'Schaltet man zwei Widerstände parallel, ist der Gesamtwiderstand stets kleiner als der kleinere Einzelwiderstand, weil sich dem Strom zwei Wege bieten. Für genau zwei Widerstände gilt die handliche Produkt-durch-Summe-Formel. Zum Vergleich zeigt der Rechner zusätzlich den Wert bei einer Reihenschaltung, bei der sich die Widerstände einfach addieren.',
  howto: [
    'Den ersten Widerstand R1 in Ohm eingeben.',
    'Den zweiten Widerstand R2 in Ohm eingeben.',
    'Den Parallelwiderstand ablesen; der Reihenwert dient als Gegenprobe.',
  ],
  faq: [
    {
      q: 'Warum ist der Parallelwiderstand kleiner als die Einzelwerte?',
      a: 'Bei der Parallelschaltung kann der Strom durch beide Widerstände gleichzeitig fließen. Mehr Strom bei gleicher Spannung bedeutet einen geringeren Gesamtwiderstand – er liegt immer unter dem kleinsten Einzelwiderstand.',
    },
    {
      q: 'Was ergibt sich bei zwei gleichen Widerständen?',
      a: 'Bei zwei gleichen Widerständen R halbiert sich der Wert: R_parallel = R/2. Zwei 10-Ohm-Widerstände parallel ergeben also 5 Ohm.',
    },
    {
      q: 'Gilt die Formel auch für mehr als zwei Widerstände?',
      a: 'Die Produkt-durch-Summe-Form gilt nur für genau zwei Widerstände. Bei mehreren Widerständen nutzt man 1/R = 1/R1 + 1/R2 + … oder rechnet paarweise.',
    },
  ],
  related: ['ohmsches-gesetz-rechner', 'led-vorwiderstand-rechner', 'spannungsabfall-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { r1: 10, r2: 10 },
      expect: [
        { label: 'Parallelwiderstand', value: 5, tolerance: 0.001 },
        { label: 'Reihenwiderstand (Vergleich)', value: 20, tolerance: 0.001 },
      ],
    },
    {
      values: { r1: 100, r2: 100 },
      expect: [{ label: 'Parallelwiderstand', value: 50, tolerance: 0.001 }],
    },
  ],
};
