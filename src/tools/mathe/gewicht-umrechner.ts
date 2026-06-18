import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

// Faktor: wie viele Gramm ist 1 Einheit
const FAKTOR: Record<string, number> = {
  mg: 0.001,
  g: 1,
  dag: 10,
  kg: 1000,
  t: 1000000,
  oz: 28.349523125, // Unze (avoirdupois)
  lb: 453.59237, // Pfund (pound)
  st: 6350.29318, // Stone
  ct: 0.2, // Karat
};

export const tool: Tool = {
  slug: 'gewicht-umrechner',
  category: 'mathe',
  title: 'Gewicht umrechnen – Gramm, Kilogramm, Tonne, Pfund, Unze',
  shortTitle: 'Gewichts-Umrechner',
  description:
    'Rechne Gewichts- und Masseeinheiten um: Milligramm, Gramm, Kilogramm, Tonne sowie Unze, Pfund, Stone und Karat. Ein Wert genügt, alle Einheiten werden angezeigt.',
  keywords: [
    'gewicht umrechnen',
    'pfund in kg',
    'kg in pfund',
    'unze in gramm',
    'gramm in unze',
    'tonne in kg',
    'masse umrechnen',
    'lbs in kilogramm',
  ],
  formula:
    'Zielwert = Eingabewert × (Grammfaktor der Quelle) / (Grammfaktor des Ziels)',
  intro:
    'Mit dem Gewichts-Umrechner wandelst du metrische und angloamerikanische Masseeinheiten ineinander um. Jeder Wert wird intern in Gramm umgerechnet und anschließend in die Zieleinheit überführt. So bekommst du etwa Pfund in Kilogramm oder Unzen in Gramm exakt umgerechnet.',
  inputs: [
    { type: 'number', id: 'wert', label: 'Wert', default: 1, step: 0.01, help: 'Die umzurechnende Masse.' },
    {
      type: 'select',
      id: 'von',
      label: 'Von Einheit',
      default: 'lb',
      options: [
        { value: 'mg', label: 'Milligramm (mg)' },
        { value: 'g', label: 'Gramm (g)' },
        { value: 'dag', label: 'Dekagramm (dag)' },
        { value: 'kg', label: 'Kilogramm (kg)' },
        { value: 't', label: 'Tonne (t)' },
        { value: 'oz', label: 'Unze (oz)' },
        { value: 'lb', label: 'Pfund / Pound (lb)' },
        { value: 'st', label: 'Stone (st)' },
        { value: 'ct', label: 'Karat (ct)' },
      ],
    },
    {
      type: 'select',
      id: 'nach',
      label: 'Nach Einheit',
      default: 'kg',
      options: [
        { value: 'mg', label: 'Milligramm (mg)' },
        { value: 'g', label: 'Gramm (g)' },
        { value: 'dag', label: 'Dekagramm (dag)' },
        { value: 'kg', label: 'Kilogramm (kg)' },
        { value: 't', label: 'Tonne (t)' },
        { value: 'oz', label: 'Unze (oz)' },
        { value: 'lb', label: 'Pfund / Pound (lb)' },
        { value: 'st', label: 'Stone (st)' },
        { value: 'ct', label: 'Karat (ct)' },
      ],
    },
  ],
  compute: (v) => {
    const wert = num(v.wert);
    const von = String(v.von);
    const nach = String(v.nach);
    const fVon = FAKTOR[von] ?? 1;
    const fNach = FAKTOR[nach] ?? 1;
    const gramm = wert * fVon;
    const ziel = fNach > 0 ? gramm / fNach : 0;
    return [
      { label: 'Umgerechneter Wert', value: ziel, digits: 6, primary: true },
      { label: 'In Kilogramm', value: gramm / FAKTOR.kg, unit: 'kg', digits: 6 },
      { label: 'In Gramm', value: gramm, unit: 'g', digits: 4 },
      { label: 'In Pfund', value: gramm / FAKTOR.lb, unit: 'lb', digits: 4 },
    ];
  },
  howto: [
    'Gib den umzurechnenden Gewichtswert ein.',
    'Wähle die Ausgangseinheit (z. B. Pfund).',
    'Wähle die Zieleinheit (z. B. Kilogramm).',
    'Lies das Ergebnis sowie Vergleichswerte in Kilogramm, Gramm und Pfund ab.',
  ],
  faq: [
    {
      q: 'Wie viel Kilogramm ist ein Pfund?',
      a: 'Ein internationales Pfund (pound, lb) entspricht 0,45359237 kg, also rund 454 Gramm. Das deutsche „Pfund" im Alltag meint dagegen 500 Gramm.',
    },
    {
      q: 'Wie viel Gramm ist eine Unze?',
      a: 'Eine Unze (avoirdupois ounce, oz) sind 28,3495 Gramm. In Rezepten aus dem englischsprachigen Raum ist diese Unze gemeint.',
    },
    {
      q: 'Was ist ein Stone?',
      a: 'Ein Stone (st) ist eine in Großbritannien für das Körpergewicht gebräuchliche Einheit und entspricht 14 Pfund bzw. 6,35029 kg.',
    },
    {
      q: 'Wofür wird Karat verwendet?',
      a: 'Das metrische Karat (ct) dient zur Gewichtsangabe von Edelsteinen und beträgt exakt 0,2 Gramm.',
    },
  ],
  related: ['laenge-umrechner', 'temperatur-umrechner', 'flaeche-umrechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { wert: 1, von: 'lb', nach: 'kg' },
      expect: [{ label: 'Umgerechneter Wert', value: 0.45359237, tolerance: 0.00001 }],
    },
    {
      values: { wert: 1, von: 'oz', nach: 'g' },
      expect: [{ label: 'Umgerechneter Wert', value: 28.349523125, tolerance: 0.0001 }],
    },
  ],
};
