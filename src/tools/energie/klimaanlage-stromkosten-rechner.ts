import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'klimaanlage-stromkosten-rechner',
  category: 'energie',
  title: 'Klimaanlage-Stromkosten-Rechner',
  shortTitle: 'Klimaanlage',
  description:
    'Berechne die Stromkosten einer Klimaanlage aus Kühlleistung, Effizienz (EER/SEER), Betriebsstunden und Strompreis - pro Tag und Saison.',
  keywords: [
    'klimaanlage stromkosten rechner',
    'klimaanlage verbrauch berechnen',
    'klimagerät stromkosten',
    'klimaanlage kosten pro stunde',
    'mobile klimaanlage kosten',
  ],
  intro:
    'Die Stromaufnahme einer Klimaanlage hängt von Kühlleistung und Effizienz ab: Je höher der EER- bzw. SEER-Wert, desto weniger Strom braucht das Gerät pro Kälteleistung. Dieser Rechner schätzt die Kosten aus Kühlleistung, Effizienzwert, Laufzeit und Strompreis.',
  formula: 'Leistungsaufnahme = Kühlleistung ÷ EER; Kosten = kW × Stunden × Tage × Preis',
  inputs: [
    { type: 'number', id: 'kuehlleistung', label: 'Kühlleistung', unit: 'W', default: 3500, min: 0, step: 100, help: 'Auch BTU/h ÷ 3,41 = Watt. 12000 BTU ≈ 3500 W.' },
    { type: 'number', id: 'eer', label: 'Effizienz (EER/SEER)', unit: '', default: 3, min: 0.5, step: 0.1, help: 'Verhältnis Kühlleistung zu Stromaufnahme; mobil ~2,5, Split ~3-5.' },
    { type: 'number', id: 'stundenTag', label: 'Betrieb pro Tag', unit: 'h', default: 6, min: 0, max: 24, step: 0.5 },
    { type: 'number', id: 'tage', label: 'Tage Betrieb', unit: 'Tage', default: 60, min: 0, step: 1, help: 'Anzahl heißer Tage pro Saison.' },
    { type: 'number', id: 'preis', label: 'Strompreis', unit: 'ct/kWh', default: 35, min: 0, step: 1 },
  ],
  compute: (v) => {
    const kuehl = num(v.kuehlleistung);
    const eer = num(v.eer);
    const stundenTag = num(v.stundenTag);
    const tage = num(v.tage);
    const preis = num(v.preis) / 100;
    const leistungKw = eer > 0 ? kuehl / eer / 1000 : 0;
    const kostenTag = leistungKw * stundenTag * preis;
    const kostenSaison = kostenTag * tage;
    return [
      { label: 'Kosten pro Saison', value: kostenSaison, unit: '€', digits: 2, primary: true },
      { label: 'Kosten pro Tag', value: kostenTag, unit: '€', digits: 2 },
      { label: 'Leistungsaufnahme', value: leistungKw * 1000, unit: 'W', digits: 0 },
    ];
  },
  howto: [
    'Kühlleistung in Watt eingeben (BTU/h durch 3,41 teilen).',
    'EER- bzw. SEER-Effizienzwert aus dem Datenblatt eintragen.',
    'Tägliche Betriebsstunden und Anzahl der heißen Tage angeben.',
    'Strompreis eingeben und Kosten pro Tag und Saison ablesen.',
  ],
  faq: [
    { q: 'Was bedeutet EER?', a: 'Der Energy Efficiency Ratio gibt an, wie viel Kühlleistung pro Watt Stromaufnahme entsteht. Ein EER von 3 bedeutet: 3 kW Kälte aus 1 kW Strom.' },
    { q: 'Warum sind mobile Klimageräte teurer im Betrieb?', a: 'Mobile Monoblock-Geräte haben meist niedrigere Effizienzwerte und führen warme Luft über einen Schlauch ab, was Nachströmung warmer Außenluft begünstigt. Split-Klimaanlagen sind deutlich effizienter.' },
  ],
  related: ['geraet-stromkosten-rechner', 'waermepumpe-stromkosten-rechner', 'stromkosten-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { kuehlleistung: 3500, eer: 3, stundenTag: 6, tage: 60, preis: 35 },
      expect: [
        { label: 'Leistungsaufnahme', value: 1167, tolerance: 1 },
        { label: 'Kosten pro Tag', value: 2.45, tolerance: 0.01 },
        { label: 'Kosten pro Saison', value: 147, tolerance: 0.5 },
      ],
    },
  ],
};
