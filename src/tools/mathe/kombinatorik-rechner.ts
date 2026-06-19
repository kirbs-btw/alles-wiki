import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

/** Fakultät n! als Gleitkommazahl (für n bis ~170 stabil, danach Infinity). */
function factorial(n: number): number {
  if (n < 0) return NaN;
  let r = 1;
  for (let i = 2; i <= n; i++) r *= i;
  return r;
}

/** Permutationen ohne Wiederholung: nPr = n! / (n−k)!  (multiplikativ für Stabilität). */
function nPr(n: number, k: number): number {
  if (k < 0 || k > n) return 0;
  let r = 1;
  for (let i = 0; i < k; i++) r *= n - i;
  return r;
}

/** Kombinationen ohne Wiederholung: nCr = nPr / k!  (multiplikativ, ganzzahlig). */
function nCr(n: number, k: number): number {
  if (k < 0 || k > n) return 0;
  k = Math.min(k, n - k);
  let r = 1;
  for (let i = 0; i < k; i++) {
    r = (r * (n - i)) / (i + 1);
  }
  return Math.round(r);
}

export const tool: Tool = {
  slug: 'kombinatorik-rechner',
  category: 'mathe',
  title: 'Kombinatorik-Rechner – Permutationen (nPr) und Kombinationen (nCr)',
  shortTitle: 'Kombinatorik',
  description:
    'Berechne Permutationen (nPr, Variationen) und Kombinationen (nCr, Binomialkoeffizient) aus n Elementen, von denen k ausgewählt werden – mit und ohne Berücksichtigung der Reihenfolge.',
  keywords: [
    'kombinatorik rechner',
    'npr ncr berechnen',
    'permutation berechnen',
    'kombination berechnen',
    'binomialkoeffizient',
    'n über k rechner',
  ],
  formula: 'nPr = n! / (n−k)! ; nCr = n! / (k! · (n−k)!)',
  intro:
    'Die Kombinatorik beantwortet die Frage, auf wie viele Arten man aus n Elementen k Stück auswählen kann. Spielt die Reihenfolge eine Rolle, sind es Permutationen bzw. Variationen (nPr). Ist die Reihenfolge egal, sind es Kombinationen (nCr), auch „n über k" oder Binomialkoeffizient genannt. Der Rechner liefert beide Werte sowie n! und k!.',
  inputs: [
    { type: 'number', id: 'n', label: 'n (Anzahl Elemente gesamt)', default: 49, min: 0, max: 170, step: 1, help: 'Größe der Grundmenge.' },
    { type: 'number', id: 'k', label: 'k (Anzahl Auswahl)', default: 6, min: 0, max: 170, step: 1, help: 'Wie viele Elemente ausgewählt werden (k ≤ n).' },
  ],
  compute: (v) => {
    const n = Math.max(0, Math.round(num(v.n)));
    const k = Math.max(0, Math.round(num(v.k)));
    const gueltig = k <= n;
    const perm = gueltig ? nPr(n, k) : 0;
    const komb = gueltig ? nCr(n, k) : 0;
    return [
      { label: 'Kombinationen nCr (Reihenfolge egal)', value: komb, digits: 0, primary: true, help: 'Binomialkoeffizient „n über k".' },
      { label: 'Permutationen nPr (Reihenfolge zählt)', value: perm, digits: 0 },
      { label: 'n!', value: factorial(n), digits: 0 },
      { label: 'k!', value: factorial(k), digits: 0 },
    ];
  },
  howto: [
    'Gib bei n die Gesamtzahl der Elemente ein (z. B. 49 Lottozahlen).',
    'Gib bei k an, wie viele davon ausgewählt werden (z. B. 6 Zahlen).',
    'Lies die Kombinationen (Reihenfolge egal) und Permutationen (Reihenfolge zählt) ab.',
  ],
  faq: [
    {
      q: 'Was ist der Unterschied zwischen nPr und nCr?',
      a: 'Bei Permutationen (nPr) zählt die Reihenfolge der Auswahl, bei Kombinationen (nCr) nicht. Daher gilt immer nPr ≥ nCr; konkret nPr = nCr · k!.',
    },
    {
      q: 'Wie viele Möglichkeiten gibt es beim Lotto 6 aus 49?',
      a: 'Da die Reihenfolge egal ist, nimmt man nCr: 49 über 6 = 13.983.816 mögliche Tippreihen.',
    },
    {
      q: 'Warum ist n über 0 gleich 1?',
      a: 'Es gibt genau eine Möglichkeit, gar nichts auszuwählen – die leere Auswahl. Deshalb ist nCr(n,0) = 1.',
    },
    {
      q: 'Was passiert, wenn k größer als n ist?',
      a: 'Dann lässt sich keine Auswahl bilden und das Ergebnis ist 0. Es können nicht mehr Elemente gezogen werden, als vorhanden sind.',
    },
  ],
  related: ['potenzrechner', 'ggt-kgv-rechner', 'wahrscheinlichkeit-rechner'],
  updated: '2026-06-19',
  examples: [
    {
      values: { n: 49, k: 6 },
      expect: [
        { label: 'Kombinationen nCr (Reihenfolge egal)', value: 13983816, tolerance: 0 },
        { label: 'Permutationen nPr (Reihenfolge zählt)', value: 10068347520, tolerance: 0 },
      ],
    },
    {
      values: { n: 5, k: 2 },
      expect: [
        { label: 'Kombinationen nCr (Reihenfolge egal)', value: 10, tolerance: 0 },
        { label: 'Permutationen nPr (Reihenfolge zählt)', value: 20, tolerance: 0 },
      ],
    },
  ],
};
