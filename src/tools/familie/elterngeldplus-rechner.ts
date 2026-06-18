import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

// ElterngeldPlus-Rechner: ElterngeldPlus halbiert in der Regel den monatlichen
// Betrag des Basiselterngelds, kann aber doppelt so lange bezogen werden
// (1 Basismonat = 2 ElterngeldPlus-Monate). Untergrenze 150 € (Hälfte des
// Mindestbetrags von 300 €). Bei Teilzeitarbeit wird der Hinzuverdienst
// vereinfacht nicht berücksichtigt. Vergleich Basis vs. Plus als Orientierung.

const MIN_BASIS = 300;
const MAX_BASIS = 1800;

function ersatzrate(netto: number): number {
  if (netto >= 1000) return 0.65;
  const aufschlag = ((1000 - netto) / 2) * 0.1;
  return Math.min(65 + aufschlag, 100) / 100;
}

export const tool: Tool = {
  slug: 'elterngeldplus-rechner',
  category: 'familie',
  title: 'ElterngeldPlus-Rechner',
  shortTitle: 'ElterngeldPlus',
  description:
    'Vergleiche Basiselterngeld und ElterngeldPlus: halber Monatsbetrag, dafür doppelte Bezugsdauer. Vereinfachte Orientierung (Stand 2026).',
  keywords: [
    'elterngeldplus rechner',
    'elterngeld plus berechnen',
    'elterngeldplus höhe',
    'basiselterngeld vs plus',
    'elterngeld plus monate',
    'elterngeld teilzeit',
  ],
  intro:
    'ElterngeldPlus eignet sich besonders bei Teilzeitarbeit: Der monatliche Betrag beträgt etwa die Hälfte des Basiselterngelds, dafür wird er doppelt so lange gezahlt (aus einem Basismonat werden zwei Plus-Monate). Dieser Rechner vergleicht beide Varianten als vereinfachte Orientierung – ohne Anrechnung von Teilzeit-Hinzuverdienst (Stand 2026).',
  formula:
    'Basis/Monat = Ersatzrate×Netto (300–1.800 €); Plus/Monat = max(150; Basis/2); Plus-Monate = Basis-Monate × 2',
  inputs: [
    { type: 'number', id: 'netto', label: 'Netto vor der Geburt', unit: '€/Monat', default: 2000, min: 0, max: 10000, step: 50 },
    { type: 'number', id: 'basismonate', label: 'Geplante Basis-Bezugsmonate', unit: 'Monate', default: 6, min: 1, max: 12, step: 1, help: 'werden in doppelt so viele Plus-Monate umgewandelt' },
  ],
  compute: (v) => {
    const netto = Math.max(0, num(v.netto, 2000));
    const basismonate = Math.max(1, Math.round(num(v.basismonate, 6)));
    const rate = ersatzrate(netto);
    let basis = netto * rate;
    if (basis > MAX_BASIS) basis = MAX_BASIS;
    if (basis < MIN_BASIS) basis = MIN_BASIS;
    const plus = Math.max(150, basis / 2);
    const plusMonate = basismonate * 2;
    const summeBasis = basis * basismonate;
    const summePlus = plus * plusMonate;
    return [
      { label: 'ElterngeldPlus pro Monat', value: plus, unit: '€', digits: 2, primary: true },
      { label: 'Plus-Bezugsmonate', value: plusMonate, unit: 'Monate', digits: 0 },
      { label: 'Basiselterngeld pro Monat', value: basis, unit: '€', digits: 2 },
      { label: 'Gesamtsumme ElterngeldPlus', value: summePlus, unit: '€', digits: 2 },
      { label: 'Gesamtsumme Basiselterngeld', value: summeBasis, unit: '€', digits: 2 },
    ];
  },
  howto: [
    'Durchschnittliches Netto vor der Geburt eingeben.',
    'Anzahl der geplanten Basis-Monate eintragen.',
    'Der Rechner zeigt den halben Plus-Betrag und die verdoppelte Bezugsdauer.',
  ],
  faq: [
    { q: 'Was ist der Unterschied zwischen Basiselterngeld und ElterngeldPlus?', a: 'ElterngeldPlus zahlt monatlich etwa die Hälfte, wird dafür doppelt so lange gewährt. Es lohnt sich vor allem, wenn man in Teilzeit arbeitet.' },
    { q: 'Wie viele Plus-Monate gibt es?', a: 'Aus jedem Basismonat werden zwei ElterngeldPlus-Monate. Wer also 6 Basismonate plant, erhält 12 Plus-Monate.' },
    { q: 'Lohnt sich ElterngeldPlus bei Teilzeit?', a: 'Ja. Bei Teilzeitarbeit wird das Basiselterngeld stark gekürzt, ElterngeldPlus dagegen weniger – über die längere Dauer kann unterm Strich mehr herauskommen.' },
    { q: 'Wie genau ist diese Schätzung?', a: 'Es ist eine vereinfachte Orientierung ohne Anrechnung des Teilzeit-Verdienstes (Stand 2026). Die genaue Höhe richtet sich nach dem Bescheid der Elterngeldstelle.' },
  ],
  related: ['elterngeld-rechner', 'elternzeit-aufteilung-rechner', 'kindergeld-rechner'],
  examples: [
    {
      values: { netto: 2000, basismonate: 6 },
      expect: [
        { label: 'Basiselterngeld pro Monat', value: 1300, tolerance: 0.01 },
        { label: 'ElterngeldPlus pro Monat', value: 650, tolerance: 0.01 },
        { label: 'Plus-Bezugsmonate', value: 12, tolerance: 0.01 },
      ],
    },
    {
      values: { netto: 400, basismonate: 4 },
      expect: [
        { label: 'Basiselterngeld pro Monat', value: 380, tolerance: 0.01 },
        { label: 'ElterngeldPlus pro Monat', value: 190, tolerance: 0.01 },
      ],
    },
  ],
  updated: '2026-06-18',
};
