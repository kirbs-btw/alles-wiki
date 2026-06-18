import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

function gcd(a: number, b: number): number {
  a = Math.abs(Math.round(a));
  b = Math.abs(Math.round(b));
  while (b > 0) {
    const t = b;
    b = a % b;
    a = t;
  }
  return a || 1;
}

export const tool: Tool = {
  slug: 'bruchrechner',
  category: 'mathe',
  title: 'Bruchrechner – Brüche addieren, subtrahieren, multiplizieren, dividieren',
  shortTitle: 'Bruchrechner',
  description:
    'Rechne mit zwei Brüchen: addieren, subtrahieren, multiplizieren oder dividieren. Das Ergebnis wird automatisch vollständig gekürzt und als Dezimalzahl angezeigt.',
  keywords: [
    'bruchrechner',
    'brüche addieren',
    'brüche multiplizieren',
    'brüche kürzen',
    'brüche dividieren',
    'bruch in dezimalzahl',
    'bruchrechnung online',
    'zwei brüche berechnen',
  ],
  formula:
    'Addition: a/b + c/d = (a·d + c·b)/(b·d); danach mit dem ggT kürzen',
  intro:
    'Mit dem Bruchrechner verknüpfst du zwei Brüche durch eine der vier Grundrechenarten. Das Ergebnis wird sofort mit dem größten gemeinsamen Teiler vollständig gekürzt und zusätzlich als Dezimalzahl ausgegeben. So siehst du Zähler, Nenner und den Kommawert auf einen Blick.',
  inputs: [
    { type: 'number', id: 'z1', label: 'Zähler 1', default: 1, step: 1, help: 'Obere Zahl des ersten Bruchs.' },
    { type: 'number', id: 'n1', label: 'Nenner 1', default: 2, step: 1, help: 'Untere Zahl des ersten Bruchs (nicht 0).' },
    {
      type: 'select',
      id: 'op',
      label: 'Rechenart',
      default: 'add',
      options: [
        { value: 'add', label: 'Addieren (+)' },
        { value: 'sub', label: 'Subtrahieren (−)' },
        { value: 'mul', label: 'Multiplizieren (×)' },
        { value: 'div', label: 'Dividieren (÷)' },
      ],
    },
    { type: 'number', id: 'z2', label: 'Zähler 2', default: 1, step: 1, help: 'Obere Zahl des zweiten Bruchs.' },
    { type: 'number', id: 'n2', label: 'Nenner 2', default: 3, step: 1, help: 'Untere Zahl des zweiten Bruchs (nicht 0).' },
  ],
  compute: (v) => {
    const z1 = Math.round(num(v.z1));
    const n1 = Math.round(num(v.n1));
    const z2 = Math.round(num(v.z2));
    const n2 = Math.round(num(v.n2));
    const op = String(v.op);
    let z = 0;
    let n = 1;
    if (n1 === 0 || n2 === 0) {
      return [
        { label: 'Ergebnis (Zähler)', value: 0, digits: 0, primary: true },
        { label: 'Ergebnis (Nenner)', value: 0, digits: 0 },
        { label: 'Ergebnis als Dezimalzahl', value: 0, digits: 6 },
      ];
    }
    if (op === 'add') {
      z = z1 * n2 + z2 * n1;
      n = n1 * n2;
    } else if (op === 'sub') {
      z = z1 * n2 - z2 * n1;
      n = n1 * n2;
    } else if (op === 'mul') {
      z = z1 * z2;
      n = n1 * n2;
    } else {
      z = z1 * n2;
      n = n1 * z2;
    }
    if (n < 0) {
      z = -z;
      n = -n;
    }
    const g = gcd(z, n);
    const zg = n !== 0 ? Math.round(z / g) : 0;
    const ng = n !== 0 ? Math.round(n / g) : 0;
    const dez = ng !== 0 ? zg / ng : 0;
    return [
      { label: 'Ergebnis (Zähler)', value: zg, digits: 0, primary: true },
      { label: 'Ergebnis (Nenner)', value: ng, digits: 0 },
      { label: 'Ergebnis als Dezimalzahl', value: dez, digits: 6 },
    ];
  },
  howto: [
    'Gib den ersten Bruch über Zähler 1 und Nenner 1 ein.',
    'Wähle die Rechenart: addieren, subtrahieren, multiplizieren oder dividieren.',
    'Gib den zweiten Bruch über Zähler 2 und Nenner 2 ein.',
    'Lies das vollständig gekürzte Ergebnis als Bruch und als Dezimalzahl ab.',
  ],
  faq: [
    {
      q: 'Wie addiere ich zwei Brüche?',
      a: 'Du bringst beide Brüche auf einen gemeinsamen Nenner und addierst die Zähler: a/b + c/d = (a·d + c·b)/(b·d). Anschließend wird gekürzt.',
    },
    {
      q: 'Wie dividiere ich durch einen Bruch?',
      a: 'Du multiplizierst mit dem Kehrwert: a/b ÷ c/d = a/b × d/c. Der Rechner erledigt das automatisch, wenn du „Dividieren" wählst.',
    },
    {
      q: 'Was bedeutet Kürzen?',
      a: 'Zähler und Nenner werden durch ihren größten gemeinsamen Teiler (ggT) geteilt. So bleibt der Wert gleich, die Zahlen werden aber kleiner, z. B. 4/8 = 1/2.',
    },
    {
      q: 'Warum darf der Nenner nicht 0 sein?',
      a: 'Eine Division durch 0 ist mathematisch nicht definiert. Ein Bruch mit Nenner 0 hat keinen gültigen Wert, deshalb sind nur Nenner ungleich 0 erlaubt.',
    },
  ],
  related: ['dreisatz-rechner', 'prozentrechner', 'durchschnitt-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { z1: 1, n1: 2, op: 'add', z2: 1, n2: 3 },
      expect: [
        { label: 'Ergebnis (Zähler)', value: 5, tolerance: 0 },
        { label: 'Ergebnis (Nenner)', value: 6, tolerance: 0 },
      ],
    },
    {
      values: { z1: 2, n1: 3, op: 'mul', z2: 3, n2: 4 },
      expect: [
        { label: 'Ergebnis (Zähler)', value: 1, tolerance: 0 },
        { label: 'Ergebnis (Nenner)', value: 2, tolerance: 0 },
      ],
    },
  ],
};
