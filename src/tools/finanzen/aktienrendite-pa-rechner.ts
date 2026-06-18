import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'aktienrendite-pa-rechner',
  category: 'finanzen',
  title: 'Aktienrendite-p.a.-Rechner (CAGR)',
  shortTitle: 'Rendite p.a.',
  description:
    'Berechne die jährliche Durchschnittsrendite (CAGR) einer Anlage aus Anfangs- und Endwert über die Haltedauer in Jahren.',
  keywords: [
    'rendite pro jahr berechnen',
    'cagr rechner',
    'jährliche rendite aktie',
    'durchschnittsrendite berechnen',
    'rendite p.a. rechner',
    'annualisierte rendite',
  ],
  formula: 'CAGR = (Endwert / Anfangswert)^(1/Jahre) − 1, in Prozent',
  inputs: [
    { type: 'number', id: 'anfang', label: 'Anfangswert', unit: '€', default: 10000, min: 0.01, step: 100 },
    { type: 'number', id: 'ende', label: 'Endwert', unit: '€', default: 18000, min: 0, step: 100 },
    { type: 'number', id: 'jahre', label: 'Haltedauer', unit: 'Jahre', default: 7, min: 0.1, step: 0.5 },
  ],
  compute: (v) => {
    const anfang = num(v.anfang);
    const ende = num(v.ende);
    const jahre = num(v.jahre);
    const cagr = (anfang > 0 && jahre > 0) ? (Math.pow(ende / anfang, 1 / jahre) - 1) * 100 : 0;
    const gesamt = anfang > 0 ? (ende / anfang - 1) * 100 : 0;
    return [
      { label: 'Rendite pro Jahr', value: cagr, unit: '%', digits: 2, primary: true },
      { label: 'Gesamtrendite', value: gesamt, unit: '%', digits: 2 },
      { label: 'Wertzuwachs', value: ende - anfang, unit: '€', digits: 2 },
    ];
  },
  intro:
    'Die jährliche Durchschnittsrendite (CAGR, Compound Annual Growth Rate) gibt an, mit welcher konstanten Jahresrendite dein Kapital vom Anfangs- zum Endwert gewachsen wäre. Sie macht Anlagen mit unterschiedlicher Haltedauer vergleichbar und berücksichtigt den Zinseszinseffekt.',
  howto: [
    'Gib den Anfangswert deiner Anlage ein.',
    'Trage den aktuellen oder End-Wert ein.',
    'Gib die Haltedauer in Jahren ein (z. B. 2,5 für zweieinhalb Jahre).',
    'Lies die annualisierte Rendite ab.',
  ],
  faq: [
    { q: 'Was bedeutet CAGR?', a: 'Compound Annual Growth Rate – die geometrische Durchschnittsrendite pro Jahr. Sie beschreibt das gleichmäßige jährliche Wachstum, das vom Anfangs- zum Endwert führt.' },
    { q: 'Warum nicht einfach die Gesamtrendite durch die Jahre teilen?', a: 'Weil das den Zinseszins ignoriert. +100 % über 2 Jahre sind nicht 50 % p.a., sondern rund 41,4 % p.a., da Erträge mitverzinst werden.' },
    { q: 'Sind Einzahlungen während der Laufzeit berücksichtigt?', a: 'Nein. Dieser Rechner gilt für eine Einmalanlage ohne weitere Ein- oder Auszahlungen.' },
  ],
  related: ['kursgewinn-rechner', 'rendite-rechner', 'zinseszinsrechner'],
  examples: [
    {
      values: { anfang: 10000, ende: 18000, jahre: 7 },
      expect: [
        { label: 'Rendite pro Jahr', value: 8.74, tolerance: 0.05 },
        { label: 'Gesamtrendite', value: 80, tolerance: 0.01 },
      ],
    },
  ],
  updated: '2026-06-18',
};
