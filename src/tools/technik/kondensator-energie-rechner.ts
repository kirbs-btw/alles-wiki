import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

// Multiplikatoren der gewählten Kapazitätseinheit in Farad.
const C_FAKTOR: Record<string, number> = {
  pf: 1e-12,
  nf: 1e-9,
  uf: 1e-6,
  mf: 1e-3,
  f: 1,
};

export const tool: Tool = {
  slug: 'kondensator-energie-rechner',
  category: 'technik',
  title: 'Kondensator-Energie-Rechner',
  shortTitle: 'Kondensator-Energie',
  description:
    'Berechne die gespeicherte Energie und Ladung eines Kondensators aus Kapazität und Spannung – mit Einheit von pF bis Farad.',
  keywords: [
    'kondensator energie berechnen',
    'gespeicherte energie kondensator',
    'kondensator ladung berechnen',
    'energie kondensator formel',
    'joule kondensator rechner',
    'kondensator spannung energie',
  ],
  formula: 'Energie E = ½ × C × U²; Ladung Q = C × U',
  inputs: [
    { type: 'number', id: 'c', label: 'Kapazität C', default: 1000, min: 0, step: 1 },
    {
      type: 'select',
      id: 'cEinheit',
      label: 'Einheit Kapazität',
      default: 'uf',
      options: [
        { value: 'pf', label: 'Picofarad (pF)' },
        { value: 'nf', label: 'Nanofarad (nF)' },
        { value: 'uf', label: 'Mikrofarad (µF)' },
        { value: 'mf', label: 'Millifarad (mF)' },
        { value: 'f', label: 'Farad (F)' },
      ],
    },
    { type: 'number', id: 'u', label: 'Spannung U', unit: 'V', default: 12, min: 0, step: 0.1 },
  ],
  compute: (v) => {
    const c = num(v.c) * (C_FAKTOR[String(v.cEinheit)] ?? 1e-6);
    const u = num(v.u);
    const energie = 0.5 * c * u * u; // Joule
    const ladung = c * u; // Coulomb
    return [
      { label: 'Gespeicherte Energie', value: energie, unit: 'J', digits: 6, primary: true },
      { label: 'Energie in mJ', value: energie * 1000, unit: 'mJ', digits: 4 },
      { label: 'Ladung Q', value: ladung, unit: 'C', digits: 6 },
      { label: 'Ladung in mC', value: ladung * 1000, unit: 'mC', digits: 4 },
    ];
  },
  intro:
    'Ein geladener Kondensator speichert Energie im elektrischen Feld: E = ½ · C · U². Die Energie steigt quadratisch mit der Spannung – doppelte Spannung bedeutet also die vierfache Energie. Zusätzlich gilt für die gespeicherte Ladung Q = C · U. Der Rechner liefert beide Größen aus Kapazität und Spannung, mit Einheiten von Picofarad bis Farad.',
  howto: [
    'Kapazität eingeben und Einheit (pF, nF, µF, mF, F) wählen.',
    'Anliegende Spannung in Volt eintragen.',
    'Gespeicherte Energie in Joule sowie die Ladung ablesen.',
  ],
  faq: [
    { q: 'Wie berechne ich die Energie eines Kondensators?', a: 'Mit E = ½ · C · U². C ist die Kapazität in Farad, U die Spannung in Volt, das Ergebnis erhältst du in Joule. Achte darauf, die Kapazität vorher in Farad umzurechnen.' },
    { q: 'Warum vervierfacht sich die Energie bei doppelter Spannung?', a: 'Weil die Spannung quadratisch eingeht (U²). Verdoppelst du U, wird U² viermal so groß – die gespeicherte Energie steigt entsprechend auf das Vierfache.' },
    { q: 'Was ist der Unterschied zwischen Energie und Ladung?', a: 'Die Ladung Q = C · U gibt an, wie viele Coulomb gespeichert sind. Die Energie E = ½ · C · U² beschreibt die Arbeit, die beim Laden verrichtet bzw. beim Entladen freigesetzt wird.' },
  ],
  related: ['rc-zeitkonstante-rechner', 'ohmsches-gesetz-rechner', 'mah-zu-wh-rechner'],
  updated: '2026-06-19',
  examples: [
    {
      values: { c: 1000, cEinheit: 'uf', u: 12 },
      // C = 1e-3 F, U = 12 V -> E = 0,5·1e-3·144 = 0,072 J; Q = 1e-3·12 = 0,012 C
      expect: [
        { label: 'Gespeicherte Energie', value: 0.072, tolerance: 0.000001 },
        { label: 'Ladung Q', value: 0.012, tolerance: 0.000001 },
      ],
    },
    {
      values: { c: 1, cEinheit: 'f', u: 5 },
      // E = 0,5·1·25 = 12,5 J; Q = 1·5 = 5 C
      expect: [
        { label: 'Gespeicherte Energie', value: 12.5, tolerance: 0.0001 },
        { label: 'Ladung Q', value: 5, tolerance: 0.0001 },
      ],
    },
  ],
};
