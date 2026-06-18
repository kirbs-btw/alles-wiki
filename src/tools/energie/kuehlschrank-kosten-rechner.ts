import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'kuehlschrank-kosten-rechner',
  category: 'energie',
  title: 'Kühlschrank-Jahreskosten-Rechner',
  shortTitle: 'Kühlschrank',
  description:
    'Berechne die jährlichen Stromkosten von Kühlschrank oder Gefrierschrank aus dem Jahresverbrauch in kWh und dem Strompreis.',
  keywords: [
    'kühlschrank kosten rechner',
    'kühlschrank stromkosten jahr',
    'kühlschrank stromverbrauch berechnen',
    'gefrierschrank kosten',
    'kühlschrank kwh kosten',
  ],
  intro:
    'Kühl- und Gefriergeräte laufen rund um die Uhr und summieren sich über das Jahr. Dieser Rechner zeigt aus dem auf dem Energielabel angegebenen Jahresverbrauch in kWh die jährlichen und monatlichen Stromkosten.',
  formula: 'Kosten/Jahr = Jahresverbrauch (kWh) × Strompreis',
  inputs: [
    { type: 'number', id: 'kwhJahr', label: 'Jahresverbrauch', unit: 'kWh/Jahr', default: 150, min: 0, step: 5, help: 'Steht auf dem EU-Energielabel; moderne Geräte ~100-200 kWh.' },
    { type: 'number', id: 'preis', label: 'Strompreis', unit: 'ct/kWh', default: 35, min: 0, step: 1 },
  ],
  compute: (v) => {
    const kwhJahr = num(v.kwhJahr);
    const preis = num(v.preis) / 100;
    const proJahr = kwhJahr * preis;
    return [
      { label: 'Kosten pro Jahr', value: proJahr, unit: '€', digits: 2, primary: true },
      { label: 'Kosten pro Monat', value: proJahr / 12, unit: '€', digits: 2 },
      { label: 'Kosten pro Tag', value: proJahr / 365, unit: '€', digits: 3 },
    ];
  },
  howto: [
    'Jahresverbrauch in kWh vom EU-Energielabel ablesen.',
    'Strompreis pro kWh eintragen.',
    'Jährliche, monatliche und tägliche Kosten ablesen.',
  ],
  faq: [
    { q: 'Wo finde ich den Jahresverbrauch?', a: 'Auf dem EU-Energielabel des Geräts oder im Datenblatt. Der reale Verbrauch hängt zusätzlich von Befüllung, Standort und Umgebungstemperatur ab.' },
    { q: 'Lohnt sich der Austausch eines alten Kühlschranks?', a: 'Alte Geräte verbrauchen oft 300-400 kWh pro Jahr. Ein effizientes Neugerät mit unter 150 kWh kann die Stromkosten halbieren und sich über die Lebensdauer rechnen.' },
  ],
  related: ['geraet-stromkosten-rechner', 'stromkosten-rechner', 'kwh-kosten-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { kwhJahr: 150, preis: 35 },
      expect: [{ label: 'Kosten pro Jahr', value: 52.5, tolerance: 0.01 }],
    },
    {
      values: { kwhJahr: 350, preis: 40 },
      expect: [{ label: 'Kosten pro Jahr', value: 140, tolerance: 0.01 }],
    },
  ],
};
