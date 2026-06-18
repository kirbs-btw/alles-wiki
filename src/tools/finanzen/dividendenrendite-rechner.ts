import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'dividendenrendite-rechner',
  category: 'finanzen',
  title: 'Dividendenrendite-Rechner',
  shortTitle: 'Dividendenrendite',
  description:
    'Berechne die Dividendenrendite einer Aktie aus Dividende je Aktie und Kurs sowie deinen jährlichen Dividendenertrag für deine Stückzahl.',
  keywords: [
    'dividendenrendite rechner',
    'dividendenrendite berechnen',
    'dividende rendite aktie',
    'dividendenertrag berechnen',
    'aktien dividende rechner',
    'dividende prozent',
  ],
  formula: 'Dividendenrendite = Dividende je Aktie / Kurs × 100',
  inputs: [
    { type: 'number', id: 'dividende', label: 'Dividende je Aktie', unit: '€', default: 3, min: 0, step: 0.01 },
    { type: 'number', id: 'kurs', label: 'Aktueller Aktienkurs', unit: '€', default: 60, min: 0, step: 0.01 },
    { type: 'number', id: 'anzahl', label: 'Anzahl Aktien', unit: 'Stück', default: 100, min: 0, step: 1 },
  ],
  compute: (v) => {
    const dividende = num(v.dividende);
    const kurs = num(v.kurs);
    const anzahl = num(v.anzahl);
    const rendite = kurs > 0 ? dividende / kurs * 100 : 0;
    const ertrag = dividende * anzahl;
    const investiert = kurs * anzahl;
    return [
      { label: 'Dividendenrendite', value: rendite, unit: '%', digits: 2, primary: true },
      { label: 'Dividendenertrag pro Jahr', value: ertrag, unit: '€', digits: 2 },
      { label: 'Investiertes Kapital', value: investiert, unit: '€', digits: 2 },
    ];
  },
  intro:
    'Die Dividendenrendite zeigt, wie viel Prozent des aktuellen Aktienkurses du jährlich als Dividende ausgeschüttet bekommst. Sie macht Aktien unterschiedlicher Kursniveaus vergleichbar. Dieser Rechner liefert zusätzlich deinen konkreten Dividendenertrag für deine Stückzahl.',
  howto: [
    'Gib die Dividende je Aktie ein (Jahresdividende laut Unternehmen).',
    'Trage den aktuellen Aktienkurs ein.',
    'Gib an, wie viele Aktien du hältst.',
    'Lies Dividendenrendite und Jahresertrag ab.',
  ],
  faq: [
    { q: 'Was sagt die Dividendenrendite aus?', a: 'Sie setzt die Dividende ins Verhältnis zum Kurs. Eine Rendite von 5 % bedeutet, dass du pro 100 Euro investiertem Kapital 5 Euro Dividende im Jahr erhältst.' },
    { q: 'Ist eine hohe Dividendenrendite immer gut?', a: 'Nicht zwingend. Eine sehr hohe Rendite kann auch durch einen stark gefallenen Kurs entstehen und auf Probleme des Unternehmens hindeuten.' },
    { q: 'Sind Steuern berücksichtigt?', a: 'Nein. Auf Dividenden fällt Abgeltungsteuer an. Der Rechner zeigt die Bruttorendite vor Steuern.' },
  ],
  related: ['kursgewinn-rechner', 'aktienrendite-pa-rechner', 'rendite-rechner'],
  examples: [
    {
      values: { dividende: 3, kurs: 60, anzahl: 100 },
      expect: [
        { label: 'Dividendenrendite', value: 5, tolerance: 0.01 },
        { label: 'Dividendenertrag pro Jahr', value: 300, tolerance: 0.01 },
      ],
    },
  ],
  updated: '2026-06-18',
};
