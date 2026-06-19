import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'primfaktorzerlegung-rechner',
  category: 'mathe',
  title: 'Primfaktorzerlegung-Rechner – Zahl in Primfaktoren zerlegen',
  shortTitle: 'Primfaktoren',
  description:
    'Zerlege eine natürliche Zahl in ihre Primfaktoren. Mit Faktoren in Potenzschreibweise, Anzahl der Teiler und Prüfung auf Primzahl.',
  keywords: [
    'primfaktorzerlegung rechner',
    'zahl in primfaktoren zerlegen',
    'primfaktoren berechnen',
    'primzahl prüfen',
    'anzahl teiler berechnen',
    'primfaktoren bestimmen',
  ],
  formula:
    'n = p₁^e₁ · p₂^e₂ · … · pₖ^eₖ ; Teileranzahl = (e₁+1)·(e₂+1)·…·(eₖ+1)',
  intro:
    'Jede natürliche Zahl größer als 1 lässt sich eindeutig als Produkt von Primzahlen schreiben (Fundamentalsatz der Arithmetik). Der Rechner zerlegt die Zahl, fasst gleiche Faktoren als Potenzen zusammen und ermittelt daraus die Gesamtzahl der Teiler. Maximal werden Zahlen bis 1.000.000.000 verarbeitet.',
  inputs: [
    { type: 'number', id: 'zahl', label: 'Natürliche Zahl', default: 360, min: 2, max: 1000000000, step: 1 },
  ],
  compute: (v) => {
    let n = Math.floor(num(v.zahl));
    if (n < 2) {
      return [
        { label: 'Primfaktorzerlegung', value: 'Bitte eine ganze Zahl ≥ 2 eingeben', primary: true },
      ];
    }
    const original = n;
    const faktoren: number[] = [];
    const expo: Record<number, number> = {};
    for (let p = 2; p * p <= n; p++) {
      while (n % p === 0) {
        faktoren.push(p);
        expo[p] = (expo[p] || 0) + 1;
        n /= p;
      }
    }
    if (n > 1) {
      faktoren.push(n);
      expo[n] = (expo[n] || 0) + 1;
    }
    const istPrim = faktoren.length === 1;
    const primes = Object.keys(expo).map(Number).sort((a, b) => a - b);
    const potenz = primes
      .map((p) => (expo[p] === 1 ? `${p}` : `${p}^${expo[p]}`))
      .join(' · ');
    const produkt = faktoren.join(' · ');
    let teiler = 1;
    for (const p of primes) teiler *= expo[p] + 1;
    return [
      { label: 'Primfaktorzerlegung', value: produkt, primary: true },
      { label: 'In Potenzschreibweise', value: potenz },
      { label: 'Anzahl Primfaktoren (mit Vielfachheit)', value: faktoren.length, digits: 0 },
      { label: 'Anzahl Teiler von ' + original, value: teiler, digits: 0 },
      { label: 'Ist Primzahl?', value: istPrim ? 'Ja' : 'Nein' },
    ];
  },
  howto: [
    'Gib eine natürliche Zahl ab 2 ein.',
    'Lies die Primfaktorzerlegung als Produkt und in Potenzschreibweise ab.',
    'Sieh dir zusätzlich die Teileranzahl und die Primzahl-Prüfung an.',
  ],
  faq: [
    {
      q: 'Was ist eine Primfaktorzerlegung?',
      a: 'Die Darstellung einer Zahl als Produkt von Primzahlen, z. B. 360 = 2³ · 3² · 5. Diese Zerlegung ist bis auf die Reihenfolge eindeutig.',
    },
    {
      q: 'Wie erkenne ich an der Zerlegung eine Primzahl?',
      a: 'Eine Primzahl hat genau einen Primfaktor – sich selbst. Erscheint die eingegebene Zahl als einziger Faktor, ist sie prim.',
    },
    {
      q: 'Wie wird die Anzahl der Teiler berechnet?',
      a: 'Aus den Exponenten der Primfaktoren: Man addiert zu jedem Exponenten 1 und multipliziert die Ergebnisse. Bei 360 = 2³·3²·5 sind das (3+1)·(2+1)·(1+1) = 24 Teiler.',
    },
  ],
  related: ['ggt-kgv-rechner', 'potenzrechner', 'wurzelrechner'],
  updated: '2026-06-19',
  examples: [
    {
      values: { zahl: 360 },
      expect: [{ label: 'Anzahl Teiler von 360', value: 24, tolerance: 0 }],
    },
    {
      values: { zahl: 84 },
      expect: [
        { label: 'Anzahl Primfaktoren (mit Vielfachheit)', value: 4, tolerance: 0 },
        { label: 'Anzahl Teiler von 84', value: 12, tolerance: 0 },
      ],
    },
  ],
};
