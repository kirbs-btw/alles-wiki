import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'prozentuale-veraenderung-rechner',
  category: 'mathe',
  title: 'Prozentuale Veränderung berechnen (Zunahme & Abnahme)',
  shortTitle: 'Prozentuale Veränderung',
  description:
    'Berechne, um wie viel Prozent sich ein Wert verändert hat – von alt zu neu. Ideal für Preisänderungen, Umsatzwachstum, Gehaltserhöhungen oder Mengenrückgänge.',
  keywords: [
    'prozentuale veränderung',
    'prozentuale zunahme berechnen',
    'prozentuale abnahme',
    'wie viel prozent mehr',
    'veränderungsrate berechnen',
    'prozent differenz',
    'preisänderung in prozent',
    'wachstumsrate prozent',
  ],
  formula:
    'Veränderung in % = (neuer Wert − alter Wert) / alter Wert × 100',
  intro:
    'Die prozentuale Veränderung zeigt, wie stark ein Wert relativ zu seinem Ausgangswert gestiegen oder gefallen ist. Ein positives Ergebnis bedeutet eine Zunahme, ein negatives eine Abnahme. So vergleichst du Preise, Umsätze oder Mengen unabhängig von der absoluten Höhe.',
  inputs: [
    { type: 'number', id: 'alt', label: 'Alter Wert (vorher)', default: 200, step: 0.01, help: 'Ausgangswert, von dem aus gerechnet wird.' },
    { type: 'number', id: 'neu', label: 'Neuer Wert (nachher)', default: 250, step: 0.01, help: 'Der veränderte Wert.' },
  ],
  compute: (v) => {
    const alt = num(v.alt);
    const neu = num(v.neu);
    const diff = neu - alt;
    const proz = alt !== 0 ? (diff / alt) * 100 : 0;
    const faktor = alt !== 0 ? neu / alt : 0;
    return [
      { label: 'Veränderung in Prozent', value: proz, unit: '%', digits: 2, primary: true },
      { label: 'Absolute Differenz', value: diff, digits: 2, help: 'Neuer Wert minus alter Wert.' },
      { label: 'Faktor (neu / alt)', value: faktor, digits: 4, help: 'Faktor 1,25 bedeutet 25 % mehr.' },
    ];
  },
  howto: [
    'Gib den alten Wert ein – also den Stand vor der Veränderung.',
    'Gib den neuen Wert ein – den Stand nach der Veränderung.',
    'Lies die prozentuale Veränderung ab: positiv = Zunahme, negativ = Abnahme.',
    'Nutze die absolute Differenz und den Faktor zur Kontrolle.',
  ],
  faq: [
    {
      q: 'Wie berechne ich die prozentuale Zunahme?',
      a: 'Du ziehst den alten vom neuen Wert ab, teilst durch den alten Wert und multiplizierst mit 100. Von 200 auf 250 sind das (250−200)/200×100 = 25 %.',
    },
    {
      q: 'Was bedeutet ein negatives Ergebnis?',
      a: 'Ein negativer Prozentwert steht für eine Abnahme. Sinkt ein Preis von 250 auf 200, beträgt die Veränderung −20 %.',
    },
    {
      q: 'Worauf bezieht sich der Prozentwert?',
      a: 'Immer auf den alten Wert (den Ausgangswert). Deshalb sind „+50 % und danach −50 %" nicht dasselbe wie der Ausgangswert.',
    },
    {
      q: 'Was sagt der Faktor aus?',
      a: 'Der Faktor ist das Verhältnis neuer Wert zu altem Wert. Ein Faktor von 1,25 entspricht +25 %, ein Faktor von 0,8 entspricht −20 %.',
    },
  ],
  related: ['prozentrechner', 'dreisatz-rechner', 'durchschnitt-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { alt: 200, neu: 250 },
      expect: [
        { label: 'Veränderung in Prozent', value: 25, tolerance: 0.01 },
        { label: 'Absolute Differenz', value: 50, tolerance: 0.01 },
      ],
    },
    {
      values: { alt: 250, neu: 200 },
      expect: [{ label: 'Veränderung in Prozent', value: -20, tolerance: 0.01 }],
    },
  ],
};
