import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'trockner-kosten-rechner',
  category: 'energie',
  title: 'Wäschetrockner-Kosten-Rechner',
  shortTitle: 'Trockner',
  description:
    'Berechne die Stromkosten deines Wäschetrockners pro Trockengang, Monat und Jahr aus dem Stromverbrauch je Durchgang und der Nutzungshäufigkeit.',
  keywords: [
    'trockner kosten rechner',
    'wäschetrockner stromkosten',
    'kosten pro trockengang',
    'trockner stromverbrauch berechnen',
    'wärmepumpentrockner kosten',
  ],
  intro:
    'Wäschetrockner gehören zu den größeren Stromverbrauchern im Haushalt. Dieser Rechner zeigt aus dem Stromverbrauch pro Trockengang und der Nutzungshäufigkeit, was das Trocknen pro Durchgang und pro Jahr kostet.',
  formula: 'Kosten/Trockengang = kWh × Strompreis; Jahr = Kosten × Durchgänge/Woche × 52',
  inputs: [
    { type: 'number', id: 'kwh', label: 'Stromverbrauch pro Trockengang', unit: 'kWh', default: 2, min: 0, step: 0.1, help: 'Kondenstrockner ~3,5 kWh, Wärmepumpentrockner ~1,5-2 kWh.' },
    { type: 'number', id: 'strompreis', label: 'Strompreis', unit: 'ct/kWh', default: 35, min: 0, step: 1 },
    { type: 'number', id: 'proWoche', label: 'Trockengänge pro Woche', unit: 'Stück', default: 3, min: 0, step: 1 },
  ],
  compute: (v) => {
    const kwh = num(v.kwh);
    const strompreis = num(v.strompreis) / 100;
    const proWoche = num(v.proWoche);
    const proTrockengang = kwh * strompreis;
    const proJahr = proTrockengang * proWoche * 52;
    return [
      { label: 'Kosten pro Trockengang', value: proTrockengang, unit: '€', digits: 3, primary: true },
      { label: 'Kosten pro Jahr', value: proJahr, unit: '€', digits: 2 },
      { label: 'Kosten pro Monat', value: proJahr / 12, unit: '€', digits: 2 },
    ];
  },
  howto: [
    'Stromverbrauch pro Trockengang in kWh eintragen (Datenblatt oder Messung).',
    'Strompreis pro kWh angeben.',
    'Anzahl der Trockengänge pro Woche eingeben.',
    'Kosten pro Trockengang und pro Jahr ablesen.',
  ],
  faq: [
    { q: 'Welcher Trockner ist sparsamer?', a: 'Wärmepumpentrockner verbrauchen mit rund 1,5-2 kWh pro Ladung deutlich weniger als alte Kondens- oder Ablufttrockner mit 3,5-4 kWh.' },
    { q: 'Wie kann ich Trocknerkosten senken?', a: 'Hohe Schleuderdrehzahl der Waschmaschine entzieht mehr Wasser vorab. Volle Beladung und das Trocknen an der Luft, wo möglich, sparen zusätzlich.' },
  ],
  related: ['waschmaschine-kosten-rechner', 'geraet-stromkosten-rechner', 'stromkosten-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { kwh: 2, strompreis: 35, proWoche: 3 },
      expect: [
        { label: 'Kosten pro Trockengang', value: 0.7, tolerance: 0.001 },
        { label: 'Kosten pro Jahr', value: 109.2, tolerance: 0.05 },
      ],
    },
  ],
};
