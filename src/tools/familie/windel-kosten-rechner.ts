import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

// Windelkosten-Rechner: Schätzt die Kosten für Wegwerfwindeln über die
// gesamte Wickelzeit. Anzahl Windeln pro Tag × Preis pro Windel × Tage.
// Optional Vergleich der Gesamtkosten über mehrere Jahre.
// Reine Budgetplanung.

export const tool: Tool = {
  slug: 'windel-kosten-rechner',
  category: 'familie',
  title: 'Windelkosten-Rechner',
  shortTitle: 'Windelkosten',
  description:
    'Berechne die Kosten für Wegwerfwindeln über die Wickelzeit: Windeln pro Tag, Stückpreis und Dauer in Monaten. Mit Tages-, Monats- und Gesamtkosten.',
  keywords: [
    'windelkosten rechner',
    'was kosten windeln',
    'windeln kosten baby',
    'windel preis berechnen',
    'wickelkosten rechner',
    'windeln budget',
  ],
  intro:
    'Windeln sind ein dauerhafter Kostenfaktor in den ersten Lebensjahren. Dieser Rechner schätzt die Ausgaben aus der Zahl der Windeln pro Tag, dem Stückpreis und der gesamten Wickeldauer. So lässt sich abschätzen, was über die Wickelzeit zusammenkommt – hilfreich für die Familienbudget-Planung.',
  formula:
    'Kosten/Tag = Windeln/Tag × Stückpreis; Gesamt = Kosten/Tag × 30,44 × Monate',
  inputs: [
    { type: 'number', id: 'proTag', label: 'Windeln pro Tag', unit: 'Stück', default: 6, min: 1, max: 20, step: 1 },
    { type: 'number', id: 'preis', label: 'Preis pro Windel', unit: '€', default: 0.25, min: 0, max: 2, step: 0.01, help: 'Packungspreis ÷ Stückzahl' },
    { type: 'number', id: 'monate', label: 'Wickeldauer', unit: 'Monate', default: 30, min: 1, max: 60, step: 1, help: 'oft 24 bis 36 Monate' },
  ],
  compute: (v) => {
    const proTag = Math.max(1, num(v.proTag, 6));
    const preis = Math.max(0, num(v.preis, 0.25));
    const monate = Math.max(1, num(v.monate, 30));
    const kostenTag = proTag * preis;
    const tageProMonat = 365.25 / 12; // 30,4375
    const kostenMonat = kostenTag * tageProMonat;
    const gesamt = kostenMonat * monate;
    return [
      { label: 'Windelkosten gesamt', value: gesamt, unit: '€', digits: 2, primary: true },
      { label: 'Kosten pro Tag', value: kostenTag, unit: '€', digits: 2 },
      { label: 'Kosten pro Monat', value: kostenMonat, unit: '€', digits: 2 },
    ];
  },
  howto: [
    'Durchschnittliche Anzahl Windeln pro Tag eingeben (Neugeborene oft 8–10, ältere Babys weniger).',
    'Preis pro Windel berechnen: Packungspreis durch Stückzahl.',
    'Gesamte Wickeldauer in Monaten eintragen.',
    'Tages-, Monats- und Gesamtkosten ablesen.',
  ],
  faq: [
    { q: 'Wie viele Windeln braucht ein Baby pro Tag?', a: 'Neugeborene benötigen oft 8 bis 10 Windeln täglich, mit zunehmendem Alter sinkt der Verbrauch auf etwa 4 bis 6.' },
    { q: 'Was kostet eine einzelne Windel?', a: 'Je nach Marke und Größe meist zwischen 0,15 € und 0,35 €. Den Stückpreis erhalten Sie, indem Sie den Packungspreis durch die Stückzahl teilen.' },
    { q: 'Lohnen sich Stoffwindeln?', a: 'Stoffwindeln haben höhere Anschaffungskosten, sind über die Jahre aber oft günstiger. Wasch- und Energiekosten sind hier nicht eingerechnet.' },
    { q: 'Wie genau ist die Schätzung?', a: 'Es ist eine Budgetnäherung mit konstantem Tagesverbrauch. Real sinkt der Verbrauch mit dem Alter. Der Rechner rechnet mit 30,44 Tagen pro Monat.' },
  ],
  related: ['kosten-kind-rechner', 'erstausstattung-baby-rechner', 'familienbudget-rechner'],
  examples: [
    {
      values: { proTag: 6, preis: 0.25, monate: 30 },
      expect: [
        { label: 'Kosten pro Tag', value: 1.5, tolerance: 0.01 },
        { label: 'Windelkosten gesamt', value: 1369.69, tolerance: 0.5 },
      ],
    },
    {
      values: { proTag: 8, preis: 0.3, monate: 12 },
      expect: [{ label: 'Kosten pro Tag', value: 2.4, tolerance: 0.01 }],
    },
  ],
  updated: '2026-06-18',
};
