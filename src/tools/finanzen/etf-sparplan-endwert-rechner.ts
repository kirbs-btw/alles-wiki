import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'etf-sparplan-endwert-rechner',
  category: 'finanzen',
  title: 'ETF-Sparplan-Endwert-Rechner',
  shortTitle: 'ETF-Endwert',
  description:
    'Berechne den voraussichtlichen Endwert deines ETF-Sparplans – inklusive Abzug der jährlichen Fondskosten (TER) von der Bruttorendite.',
  keywords: [
    'etf sparplan endwert',
    'etf rechner endwert',
    'etf sparplan rechner ter',
    'etf vermögen berechnen',
    'etf sparplan rendite',
    'fondskosten ter rechner',
  ],
  formula: 'Nettorendite = Bruttorendite − TER; Endwert = Rate × ((1+i)^n − 1)/i; i = Netto/100/12',
  inputs: [
    { type: 'number', id: 'rate', label: 'Monatliche Sparrate', unit: '€', default: 250, min: 0, step: 10 },
    { type: 'number', id: 'rendite', label: 'Erwartete Bruttorendite p.a.', unit: '%', default: 7, min: 0, step: 0.1, help: 'Durchschnittliche Marktrendite vor Kosten.' },
    { type: 'number', id: 'ter', label: 'Fondskosten (TER) p.a.', unit: '%', default: 0.2, min: 0, step: 0.01, help: 'Gesamtkostenquote des ETF.' },
    { type: 'number', id: 'jahre', label: 'Spardauer', unit: 'Jahre', default: 20, min: 1, step: 1 },
  ],
  compute: (v) => {
    const rate = num(v.rate);
    const brutto = num(v.rendite);
    const ter = num(v.ter);
    const jahre = num(v.jahre);
    const netto = brutto - ter;
    const n = Math.round(jahre * 12);
    const i = netto / 100 / 12;
    let endwert: number;
    if (i !== 0) {
      endwert = rate * (Math.pow(1 + i, n) - 1) / i;
    } else {
      endwert = rate * n;
    }
    const eingezahlt = rate * n;
    const gewinn = endwert - eingezahlt;
    return [
      { label: 'Voraussichtlicher Endwert', value: endwert, unit: '€', digits: 2, primary: true },
      { label: 'Eingezahlt gesamt', value: eingezahlt, unit: '€', digits: 2 },
      { label: 'Kursgewinn (netto)', value: gewinn, unit: '€', digits: 2 },
      { label: 'Nettorendite p.a.', value: netto, unit: '%', digits: 2 },
    ];
  },
  intro:
    'ETF-Sparpläne sind ein beliebter Weg zum langfristigen Vermögensaufbau. Dieser Rechner schätzt den Endwert deines Sparplans und zieht dabei die jährlichen Fondskosten (TER) von der erwarteten Bruttorendite ab – so siehst du den realistischen Nettoertrag. Gerechnet wird nachschüssig mit konstanter Durchschnittsrendite.',
  howto: [
    'Gib deine monatliche Sparrate ein.',
    'Trage die erwartete Bruttorendite des Marktes ein (z. B. 6–8 % bei Aktien-ETFs).',
    'Gib die TER deines ETFs ein (steht im Factsheet).',
    'Wähle die Spardauer und lies den Endwert ab.',
  ],
  faq: [
    { q: 'Was ist die TER?', a: 'Die Total Expense Ratio ist die jährliche Gesamtkostenquote eines Fonds. Sie wird laufend aus dem Fondsvermögen entnommen und schmälert die Rendite. Breite ETFs liegen oft bei 0,1–0,3 %.' },
    { q: 'Ist die Rendite garantiert?', a: 'Nein. Aktienmärkte schwanken stark; einzelne Jahre können deutlich besser oder schlechter laufen. Die Eingabe ist ein langfristiger Durchschnittswert.' },
    { q: 'Sind Steuern enthalten?', a: 'Nein. Auf Gewinne und Ausschüttungen fällt Abgeltungsteuer an. Die Vorabpauschale und der Sparer-Pauschbetrag sind nicht berücksichtigt.' },
  ],
  related: ['sparplan-rechner', 'zinseszinsrechner', 'rendite-rechner'],
  examples: [
    {
      values: { rate: 250, rendite: 7, ter: 0.2, jahre: 20 },
      expect: [
        { label: 'Voraussichtlicher Endwert', value: 127114.64, tolerance: 50 },
        { label: 'Eingezahlt gesamt', value: 60000, tolerance: 0.01 },
        { label: 'Nettorendite p.a.', value: 6.8, tolerance: 0.001 },
      ],
    },
  ],
  updated: '2026-06-18',
};
