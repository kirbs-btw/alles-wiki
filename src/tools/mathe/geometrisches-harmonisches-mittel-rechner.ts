import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'geometrisches-harmonisches-mittel-rechner',
  category: 'mathe',
  title: 'Geometrisches & harmonisches Mittel berechnen',
  shortTitle: 'Geom./harm. Mittel',
  description:
    'Berechne das geometrische und das harmonische Mittel aus bis zu fünf positiven Zahlen – plus arithmetisches Mittel zum Vergleich. Für Wachstumsraten, Renditen und Durchschnittsgeschwindigkeiten.',
  keywords: [
    'geometrisches mittel berechnen',
    'harmonisches mittel berechnen',
    'mittelwert rechner',
    'geometrischer durchschnitt',
    'durchschnittliche wachstumsrate',
    'harmonisches mittel formel',
  ],
  formula:
    'Geometrisch = (x₁·x₂·…·xₙ)^(1/n) ; Harmonisch = n / (1/x₁ + … + 1/xₙ)',
  intro:
    'Neben dem arithmetischen Mittel gibt es zwei weitere wichtige Mittelwerte. Das geometrische Mittel mittelt multiplikative Größen wie Wachstumsfaktoren oder Renditen. Das harmonische Mittel eignet sich für Verhältnisgrößen wie Geschwindigkeiten oder Preise pro Einheit. Beide sind nur für positive Zahlen definiert. Felder mit dem Wert 0 werden ignoriert.',
  inputs: [
    { type: 'number', id: 'w1', label: 'Wert 1', default: 2, min: 0, step: 0.0001 },
    { type: 'number', id: 'w2', label: 'Wert 2', default: 8, min: 0, step: 0.0001 },
    { type: 'number', id: 'w3', label: 'Wert 3', default: 0, min: 0, step: 0.0001, help: 'Optional – auf 0 lassen, wenn nicht benötigt.' },
    { type: 'number', id: 'w4', label: 'Wert 4', default: 0, min: 0, step: 0.0001, help: 'Optional – auf 0 lassen, wenn nicht benötigt.' },
    { type: 'number', id: 'w5', label: 'Wert 5', default: 0, min: 0, step: 0.0001, help: 'Optional – auf 0 lassen, wenn nicht benötigt.' },
  ],
  compute: (v) => {
    const roh = [num(v.w1), num(v.w2), num(v.w3), num(v.w4), num(v.w5)];
    const werte = roh.filter((x) => x > 0);
    const n = werte.length;
    if (n === 0) {
      return [
        { label: 'Geometrisches Mittel', value: 0, digits: 6, primary: true },
        { label: 'Harmonisches Mittel', value: 0, digits: 6 },
        { label: 'Arithmetisches Mittel', value: 0, digits: 6 },
        { label: 'Anzahl der Werte', value: 0, digits: 0 },
      ];
    }
    const produkt = werte.reduce((p, x) => p * x, 1);
    const geo = Math.pow(produkt, 1 / n);
    const kehrsumme = werte.reduce((s, x) => s + 1 / x, 0);
    const harm = kehrsumme > 0 ? n / kehrsumme : 0;
    const arith = werte.reduce((s, x) => s + x, 0) / n;
    return [
      { label: 'Geometrisches Mittel', value: geo, digits: 6, primary: true },
      { label: 'Harmonisches Mittel', value: harm, digits: 6 },
      { label: 'Arithmetisches Mittel', value: arith, digits: 6, help: 'Zum Vergleich.' },
      { label: 'Anzahl der Werte', value: n, digits: 0 },
    ];
  },
  howto: [
    'Gib deine positiven Zahlen in die Felder Wert 1 bis Wert 5 ein.',
    'Nicht benötigte Felder auf 0 lassen – sie werden ignoriert.',
    'Lies geometrisches und harmonisches Mittel sowie das arithmetische Mittel zum Vergleich ab.',
  ],
  faq: [
    {
      q: 'Wann verwende ich das geometrische Mittel?',
      a: 'Bei multiplikativen Größen wie Wachstumsraten, Zinsen oder Renditen über mehrere Perioden. Es liefert die durchschnittliche Verzinsung, die zum gleichen Endwert führt.',
    },
    {
      q: 'Wann verwende ich das harmonische Mittel?',
      a: 'Bei Verhältnissen mit konstanter Bezugsgröße, etwa bei Durchschnittsgeschwindigkeiten über gleich lange Strecken oder bei Preisen pro Stück.',
    },
    {
      q: 'In welcher Reihenfolge liegen die drei Mittelwerte?',
      a: 'Für positive Zahlen gilt stets: harmonisches Mittel ≤ geometrisches Mittel ≤ arithmetisches Mittel. Gleichheit nur, wenn alle Werte identisch sind.',
    },
    {
      q: 'Warum sind nur positive Zahlen erlaubt?',
      a: 'Das geometrische Mittel zieht eine Wurzel aus dem Produkt, das harmonische bildet Kehrwerte. Beides ist nur für positive Werte sinnvoll definiert.',
    },
  ],
  related: ['durchschnitt-rechner', 'standardabweichung-rechner', 'wurzelrechner'],
  updated: '2026-06-19',
  examples: [
    {
      values: { w1: 2, w2: 8, w3: 0, w4: 0, w5: 0 },
      expect: [
        { label: 'Geometrisches Mittel', value: 4, tolerance: 0.000001 },
        { label: 'Harmonisches Mittel', value: 3.2, tolerance: 0.000001 },
        { label: 'Arithmetisches Mittel', value: 5, tolerance: 0.000001 },
      ],
    },
    {
      values: { w1: 1, w2: 4, w3: 16, w4: 0, w5: 0 },
      expect: [{ label: 'Geometrisches Mittel', value: 4, tolerance: 0.000001 }],
    },
  ],
};
