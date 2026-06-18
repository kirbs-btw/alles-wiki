import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'ohmsches-gesetz-rechner',
  category: 'technik',
  title: 'Ohmsches Gesetz Rechner',
  shortTitle: 'Ohmsches Gesetz',
  description:
    'Berechne Spannung, Strom, Widerstand und Leistung nach dem Ohmschen Gesetz. Gib zwei Werte ein und erhalte alle uebrigen Groessen.',
  keywords: [
    'ohmsches gesetz rechner',
    'spannung strom widerstand berechnen',
    'u r i rechner',
    'leistung berechnen watt',
    'volt ampere ohm',
  ],
  formula: 'U = R x I; P = U x I; R = U / I',
  inputs: [
    { type: 'number', id: 'spannung', label: 'Spannung U', unit: 'V', default: 12, min: 0, step: 0.1, help: 'Leer lassen bzw. 0, wenn unbekannt.' },
    { type: 'number', id: 'strom', label: 'Strom I', unit: 'A', default: 0.5, min: 0, step: 0.01, help: 'Leer lassen bzw. 0, wenn unbekannt.' },
    { type: 'number', id: 'widerstand', label: 'Widerstand R', unit: 'Ohm', default: 0, min: 0, step: 1, help: 'Leer lassen bzw. 0, wenn unbekannt.' },
  ],
  compute: (v) => {
    let U = num(v.spannung);
    let I = num(v.strom);
    let R = num(v.widerstand);

    // Aus zwei bekannten Groessen die dritte ermitteln.
    if (U > 0 && I > 0) {
      R = I !== 0 ? U / I : 0;
    } else if (U > 0 && R > 0) {
      I = R !== 0 ? U / R : 0;
    } else if (I > 0 && R > 0) {
      U = I * R;
    }
    const P = U * I;
    return [
      { label: 'Spannung U', value: U, unit: 'V', digits: 3, primary: true },
      { label: 'Strom I', value: I, unit: 'A', digits: 4 },
      { label: 'Widerstand R', value: R, unit: 'Ohm', digits: 2 },
      { label: 'Leistung P', value: P, unit: 'W', digits: 3 },
    ];
  },
  intro:
    'Das Ohmsche Gesetz beschreibt den Zusammenhang von Spannung (U), Strom (I) und Widerstand (R) in einem elektrischen Stromkreis. Gib zwei der drei Groessen ein, der Rechner ergaenzt die fehlende und berechnet zusaetzlich die elektrische Leistung.',
  howto: [
    'Zwei der drei Werte eingeben (z. B. Spannung und Widerstand).',
    'Die unbekannte dritte Groesse auf 0 lassen.',
    'Ergebnis fuer Spannung, Strom, Widerstand und Leistung ablesen.',
  ],
  faq: [
    { q: 'Wie lautet das Ohmsche Gesetz?', a: 'Die Spannung ist gleich Widerstand mal Strom: U = R x I. Daraus folgt I = U / R und R = U / I.' },
    { q: 'Wie berechne ich die Leistung?', a: 'Die elektrische Leistung ergibt sich aus P = U x I, also Spannung mal Strom. Bei 12 V und 0,5 A sind das 6 W.' },
    { q: 'Welche Werte muss ich eingeben?', a: 'Genau zwei Werte sind noetig. Lass den dritten auf 0, dann wird er aus den beiden anderen berechnet.' },
  ],
  related: ['led-vorwiderstand-rechner', 'watt-volt-ampere-rechner', 'spannungsabfall-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { spannung: 12, strom: 0.5, widerstand: 0 },
      expect: [
        { label: 'Widerstand R', value: 24, tolerance: 0.01 },
        { label: 'Leistung P', value: 6, tolerance: 0.01 },
      ],
    },
    {
      values: { spannung: 0, strom: 2, widerstand: 5 },
      expect: [
        { label: 'Spannung U', value: 10, tolerance: 0.01 },
        { label: 'Leistung P', value: 20, tolerance: 0.01 },
      ],
    },
  ],
};
