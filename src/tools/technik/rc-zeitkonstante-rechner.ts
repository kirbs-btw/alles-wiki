import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

// Multiplikatoren der gewählten Einheiten in SI-Basiseinheiten (Ohm bzw. Farad).
const R_FAKTOR: Record<string, number> = {
  ohm: 1,
  kohm: 1e3,
  mohm: 1e6,
};
const C_FAKTOR: Record<string, number> = {
  pf: 1e-12,
  nf: 1e-9,
  uf: 1e-6,
  mf: 1e-3,
};

export const tool: Tool = {
  slug: 'rc-zeitkonstante-rechner',
  category: 'technik',
  title: 'RC-Zeitkonstante-Rechner',
  shortTitle: 'RC-Zeitkonstante',
  description:
    'Berechne die Zeitkonstante τ eines RC-Glieds aus Widerstand und Kapazität sowie die Lade-/Entladezeit und die Grenzfrequenz des Filters.',
  keywords: [
    'rc zeitkonstante berechnen',
    'tau rc glied',
    'kondensator ladezeit rechner',
    'rc filter grenzfrequenz',
    'zeitkonstante widerstand kondensator',
    'rc glied rechner',
  ],
  formula: 'τ = R × C; Grenzfrequenz f = 1 / (2π × R × C); voll geladen nach ≈ 5τ',
  inputs: [
    { type: 'number', id: 'r', label: 'Widerstand R', default: 10, min: 0, step: 1 },
    {
      type: 'select',
      id: 'rEinheit',
      label: 'Einheit Widerstand',
      default: 'kohm',
      options: [
        { value: 'ohm', label: 'Ohm (Ω)' },
        { value: 'kohm', label: 'Kiloohm (kΩ)' },
        { value: 'mohm', label: 'Megaohm (MΩ)' },
      ],
    },
    { type: 'number', id: 'c', label: 'Kapazität C', default: 100, min: 0, step: 1 },
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
      ],
    },
  ],
  compute: (v) => {
    const r = num(v.r) * (R_FAKTOR[String(v.rEinheit)] ?? 1);
    const c = num(v.c) * (C_FAKTOR[String(v.cEinheit)] ?? 1e-6);
    const tau = r * c; // Sekunden
    const grenzfreq = tau > 0 ? 1 / (2 * Math.PI * tau) : 0;
    return [
      { label: 'Zeitkonstante τ', value: tau * 1000, unit: 'ms', digits: 4, primary: true },
      { label: 'Zeitkonstante τ', value: tau, unit: 's', digits: 6 },
      { label: 'Praktisch voll (5τ)', value: tau * 5000, unit: 'ms', digits: 4, help: 'Nach 5τ gilt der Kondensator als nahezu voll/leer (≈ 99,3 %).' },
      { label: 'Grenzfrequenz', value: grenzfreq, unit: 'Hz', digits: 2, help: '−3-dB-Eckfrequenz des RC-Filters.' },
    ];
  },
  intro:
    'Ein RC-Glied aus Widerstand R und Kondensator C besitzt die Zeitkonstante τ = R × C. Sie gibt an, wie schnell sich der Kondensator lädt oder entlädt: Nach einer Zeitkonstante sind etwa 63 % der Endspannung erreicht, nach rund 5τ gilt er als praktisch voll geladen (≈ 99,3 %). Dieselbe Kombination bestimmt als Tief- bzw. Hochpass die Grenzfrequenz f = 1 / (2π·R·C). Achte auf die Einheiten – µF und kΩ sind im Hobbybereich am häufigsten.',
  howto: [
    'Widerstand eingeben und passende Einheit (Ω, kΩ, MΩ) wählen.',
    'Kapazität eingeben und Einheit (pF, nF, µF, mF) wählen.',
    'Zeitkonstante τ in Millisekunden und Sekunden ablesen.',
    'Bei Bedarf die Lade-/Entladezeit (5τ) und die Filter-Grenzfrequenz nutzen.',
  ],
  faq: [
    { q: 'Was bedeutet die Zeitkonstante τ?', a: 'τ = R × C ist die Zeit, nach der ein ladender Kondensator rund 63,2 % der Endspannung erreicht – bzw. ein entladender auf 36,8 % gefallen ist. Sie ist das zentrale Maß für die Geschwindigkeit eines RC-Vorgangs.' },
    { q: 'Wann ist der Kondensator „voll“?', a: 'Theoretisch nie ganz, praktisch nach etwa 5 Zeitkonstanten: Dann sind rund 99,3 % der Endspannung erreicht. Deshalb rechnet man Lade- und Entladevorgänge meist mit 5τ.' },
    { q: 'Wie hängt das mit der Grenzfrequenz zusammen?', a: 'Als Filter bildet ein RC-Glied einen Tief- oder Hochpass mit der −3-dB-Eckfrequenz f = 1 / (2π·R·C). Eine große Zeitkonstante bedeutet eine niedrige Grenzfrequenz.' },
  ],
  related: ['ohmsches-gesetz-rechner', 'led-vorwiderstand-rechner', 'frequenz-wellenlaenge-rechner'],
  updated: '2026-06-19',
  examples: [
    {
      values: { r: 10, rEinheit: 'kohm', c: 100, cEinheit: 'uf' },
      // R = 10000 Ω, C = 100e-6 F -> τ = 1 s = 1000 ms; 5τ = 5000 ms
      expect: [
        { label: 'Zeitkonstante τ', value: 1000, tolerance: 0.01 },
        { label: 'Praktisch voll (5τ)', value: 5000, tolerance: 0.01 },
      ],
    },
    {
      values: { r: 1, rEinheit: 'kohm', c: 1, cEinheit: 'uf' },
      // R = 1000 Ω, C = 1e-6 F -> τ = 1e-3 s = 1 ms; f = 1/(2π·1e-3) ≈ 159,1549 Hz
      expect: [
        { label: 'Zeitkonstante τ', value: 1, tolerance: 0.001 },
        { label: 'Grenzfrequenz', value: 159.15, tolerance: 0.05 },
      ],
    },
  ],
};
