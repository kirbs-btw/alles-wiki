import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'kursgewinn-rechner',
  category: 'finanzen',
  title: 'Kursgewinn-Rechner (Gewinn/Verlust in %)',
  shortTitle: 'Kursgewinn',
  description:
    'Berechne Gewinn oder Verlust einer Wertpapierposition in Euro und Prozent aus Kauf- und Verkaufskurs sowie der Stückzahl.',
  keywords: [
    'kursgewinn rechner',
    'gewinn verlust aktie berechnen',
    'aktiengewinn prozent',
    'kursveränderung prozent',
    'rendite aktie berechnen',
    'kauf verkauf gewinn',
  ],
  formula: 'Veränderung % = (Verkaufskurs − Kaufkurs) / Kaufkurs × 100',
  inputs: [
    { type: 'number', id: 'kauf', label: 'Kaufkurs je Stück', unit: '€', default: 50, min: 0, step: 0.01 },
    { type: 'number', id: 'verkauf', label: 'Verkaufskurs je Stück', unit: '€', default: 65, min: 0, step: 0.01 },
    { type: 'number', id: 'anzahl', label: 'Anzahl', unit: 'Stück', default: 100, min: 0, step: 1 },
  ],
  compute: (v) => {
    const kauf = num(v.kauf);
    const verkauf = num(v.verkauf);
    const anzahl = num(v.anzahl);
    const veraenderungProzent = kauf > 0 ? (verkauf - kauf) / kauf * 100 : 0;
    const gewinn = (verkauf - kauf) * anzahl;
    const einstand = kauf * anzahl;
    const erloes = verkauf * anzahl;
    return [
      { label: 'Veränderung', value: veraenderungProzent, unit: '%', digits: 2, primary: true },
      { label: 'Gewinn/Verlust', value: gewinn, unit: '€', digits: 2 },
      { label: 'Einstandswert', value: einstand, unit: '€', digits: 2 },
      { label: 'Verkaufserlös', value: erloes, unit: '€', digits: 2 },
    ];
  },
  intro:
    'Dieser Rechner ermittelt den Kursgewinn oder -verlust einer Wertpapierposition – in Euro und in Prozent. So siehst du auf einen Blick, wie sich dein Investment seit dem Kauf entwickelt hat. Ein negativer Wert zeigt einen Verlust an. Gebühren und Steuern bleiben außen vor.',
  howto: [
    'Gib den Kaufkurs je Stück ein.',
    'Trage den aktuellen oder geplanten Verkaufskurs ein.',
    'Gib die Stückzahl ein.',
    'Lies prozentuale Veränderung und Gewinn/Verlust in Euro ab.',
  ],
  faq: [
    { q: 'Wie berechne ich Gewinn in Prozent?', a: 'Differenz aus Verkaufs- und Kaufkurs geteilt durch den Kaufkurs, mal 100. Steigt der Kurs von 50 auf 65 Euro, sind das +30 %.' },
    { q: 'Sind Gebühren und Steuern enthalten?', a: 'Nein. Order- und Depotgebühren sowie die Abgeltungsteuer auf den Gewinn mindern den tatsächlichen Nettoertrag.' },
    { q: 'Was ist mit der Haltedauer?', a: 'Dieser Rechner zeigt die reine Kursveränderung über die gesamte Haltedauer. Für die jährliche Rendite nutze den Aktienrendite-p.a.-Rechner.' },
  ],
  related: ['aktienrendite-pa-rechner', 'dividendenrendite-rechner', 'rendite-rechner'],
  examples: [
    {
      values: { kauf: 50, verkauf: 65, anzahl: 100 },
      expect: [
        { label: 'Veränderung', value: 30, tolerance: 0.01 },
        { label: 'Gewinn/Verlust', value: 1500, tolerance: 0.01 },
      ],
    },
    {
      values: { kauf: 80, verkauf: 60, anzahl: 50 },
      expect: [
        { label: 'Veränderung', value: -25, tolerance: 0.01 },
        { label: 'Gewinn/Verlust', value: -1000, tolerance: 0.01 },
      ],
    },
  ],
  updated: '2026-06-18',
};
