import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'sparrate-rechner',
  category: 'finanzen',
  title: 'Sparrate-Rechner (Sparziel)',
  shortTitle: 'Sparrate',
  description:
    'Berechne, wie viel du monatlich sparen musst, um ein bestimmtes Sparziel in der gewünschten Zeit zu erreichen – mit Rendite und Startkapital.',
  keywords: [
    'sparrate berechnen',
    'sparziel rechner',
    'wie viel monatlich sparen',
    'benötigte sparrate',
    'monatliche sparrate ziel',
    'sparbetrag berechnen',
  ],
  formula: 'Rate = (Ziel − Start×(1+i)^n) × i / ((1+i)^n − 1); i = Rendite/100/12; n = Monate',
  inputs: [
    { type: 'number', id: 'ziel', label: 'Sparziel', unit: '€', default: 50000, min: 0, step: 1000 },
    { type: 'number', id: 'start', label: 'Startkapital', unit: '€', default: 0, min: 0, step: 100 },
    { type: 'number', id: 'rendite', label: 'Rendite pro Jahr', unit: '%', default: 3, min: 0, step: 0.1 },
    { type: 'number', id: 'jahre', label: 'Spardauer', unit: 'Jahre', default: 10, min: 1, step: 1 },
  ],
  compute: (v) => {
    const ziel = num(v.ziel);
    const start = num(v.start);
    const rendite = num(v.rendite);
    const jahre = num(v.jahre);
    const n = Math.round(jahre * 12);
    const i = rendite / 100 / 12;
    let rate: number;
    if (n <= 0) {
      rate = 0;
    } else if (i > 0) {
      const q = Math.pow(1 + i, n);
      const benoetigt = ziel - start * q;
      rate = benoetigt * i / (q - 1);
    } else {
      rate = (ziel - start) / n;
    }
    if (rate < 0) rate = 0;
    const eingezahlt = start + rate * n;
    const ertrag = ziel - eingezahlt;
    return [
      { label: 'Benötigte Sparrate', value: rate, unit: '€/Monat', digits: 2, primary: true },
      { label: 'Einzahlungen gesamt', value: eingezahlt, unit: '€', digits: 2 },
      { label: 'Davon Rendite', value: ertrag, unit: '€', digits: 2 },
    ];
  },
  intro:
    'Du hast ein konkretes Sparziel – etwa für eine Immobilie, ein Auto oder den Ruhestand – und einen Zeitrahmen? Dieser Rechner ermittelt die monatliche Sparrate, die du bei gegebener Rendite und optionalem Startkapital benötigst. Gerechnet wird nachschüssig (Einzahlung am Monatsende).',
  howto: [
    'Gib dein Sparziel in Euro ein.',
    'Trage ein eventuelles Startkapital ein.',
    'Lege die erwartete jährliche Rendite fest.',
    'Wähle die Spardauer und lies die nötige Monatsrate ab.',
  ],
  faq: [
    { q: 'Vorschüssig oder nachschüssig?', a: 'Der Rechner geht von Einzahlungen am Monatsende aus. Bei Einzahlung zu Monatsbeginn wäre eine minimal kleinere Rate nötig.' },
    { q: 'Was, wenn das Startkapital allein schon reicht?', a: 'Dann ist die benötigte Sparrate 0. Der Rechner gibt keinen negativen Wert aus.' },
    { q: 'Ist die Rendite garantiert?', a: 'Nein. Bei schwankenden Anlagen ist die Rendite ein Durchschnittswert. Plane einen Puffer ein, falls die tatsächliche Rendite niedriger ausfällt.' },
  ],
  related: ['sparplan-rechner', 'zinseszinsrechner', 'entnahmeplan-rechner'],
  examples: [
    {
      values: { ziel: 50000, start: 0, rendite: 3, jahre: 10 },
      expect: [{ label: 'Benötigte Sparrate', value: 357.85, tolerance: 1 }],
    },
  ],
  updated: '2026-06-18',
};
