import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'quadratmeterpreis-rechner',
  category: 'wohnen',
  title: 'Quadratmeterpreis-Rechner',
  shortTitle: 'qm-Preis',
  description:
    'Berechne den Quadratmeterpreis aus Gesamtpreis und Wohnfläche – für Kauf oder Miete.',
  keywords: [
    'quadratmeterpreis berechnen',
    'qm preis rechner',
    'kaufpreis pro qm',
    'mietpreis pro qm',
    'preis pro quadratmeter',
  ],
  formula: 'Preis je m² = Gesamtpreis / Wohnfläche',
  inputs: [
    { type: 'number', id: 'preis', label: 'Gesamtpreis', unit: '€', default: 300000, min: 0, step: 1000 },
    { type: 'number', id: 'flaeche', label: 'Wohnfläche', unit: 'm²', default: 80, min: 1, step: 1 },
  ],
  compute: (v) => {
    const preis = num(v.preis);
    const flaeche = num(v.flaeche);
    const qm = flaeche > 0 ? preis / flaeche : 0;
    return [
      { label: 'Preis je m²', value: qm, unit: '€', digits: 2, primary: true },
      { label: 'Wohnfläche', value: flaeche, unit: 'm²', digits: 1 },
    ];
  },
  howto: [
    'Gesamtpreis eingeben (Kaufpreis oder Monatsmiete).',
    'Wohnfläche in m² eintragen.',
    'Quadratmeterpreis ablesen – ideal zum Vergleichen von Angeboten.',
  ],
  faq: [
    { q: 'Wofür nutze ich den qm-Preis?', a: 'Der Preis pro Quadratmeter macht unterschiedlich große Wohnungen oder Häuser direkt vergleichbar – bei Kauf wie bei Miete.' },
  ],
  updated: '2026-06-18',
  examples: [
    {
      values: { preis: 300000, flaeche: 80 },
      expect: [{ label: 'Preis je m²', value: 3750, tolerance: 0.5 }],
    },
  ],
};
