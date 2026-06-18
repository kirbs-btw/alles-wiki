import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'pellets-kosten-rechner',
  category: 'energie',
  title: 'Pellets-Kosten-Rechner',
  shortTitle: 'Pellets',
  description:
    'Berechne den Pelletbedarf und die Heizkosten deiner Pelletheizung aus dem jährlichen Wärmebedarf, dem Heizwert der Pellets und dem Pelletpreis.',
  keywords: [
    'pellets kosten rechner',
    'pelletbedarf berechnen',
    'pelletheizung kosten',
    'holzpellets verbrauch rechner',
    'pellets preis pro kg',
  ],
  intro:
    'Holzpellets haben einen Heizwert von rund 4,8 kWh pro Kilogramm. Dieser Rechner ermittelt aus dem jährlichen Wärmebedarf, dem Kesselwirkungsgrad und dem Pelletpreis den Pelletbedarf in Tonnen und die jährlichen Heizkosten.',
  formula: 'Pellets (kg) = Wärmebedarf ÷ (Heizwert × Wirkungsgrad); Kosten = kg ÷ 1000 × Preis/t',
  inputs: [
    { type: 'number', id: 'waermebedarf', label: 'Jährlicher Wärmebedarf', unit: 'kWh', default: 20000, min: 0, step: 500, help: 'Heizwärme plus Warmwasser pro Jahr.' },
    { type: 'number', id: 'heizwert', label: 'Heizwert der Pellets', unit: 'kWh/kg', default: 4.8, min: 0.1, step: 0.1, help: 'Normpellets ~4,8 kWh/kg.' },
    { type: 'number', id: 'wirkungsgrad', label: 'Kesselwirkungsgrad', unit: '%', default: 90, min: 1, max: 100, step: 1 },
    { type: 'number', id: 'preis', label: 'Pelletpreis', unit: '€/t', default: 350, min: 0, step: 5, help: 'Preis pro Tonne (1000 kg) lose oder im Sack.' },
  ],
  compute: (v) => {
    const waerme = num(v.waermebedarf);
    const heizwert = num(v.heizwert);
    const wirkungsgrad = num(v.wirkungsgrad) / 100;
    const preis = num(v.preis);
    const nenner = heizwert * wirkungsgrad;
    const kg = nenner > 0 ? waerme / nenner : 0;
    const tonnen = kg / 1000;
    const kosten = tonnen * preis;
    return [
      { label: 'Heizkosten pro Jahr', value: kosten, unit: '€', digits: 2, primary: true },
      { label: 'Pelletbedarf pro Jahr', value: tonnen, unit: 't', digits: 2 },
      { label: 'Pelletbedarf in kg', value: kg, unit: 'kg', digits: 0 },
    ];
  },
  howto: [
    'Jährlichen Wärmebedarf in kWh eintragen.',
    'Heizwert der Pellets und Kesselwirkungsgrad angeben.',
    'Pelletpreis pro Tonne eingeben.',
    'Pelletbedarf und Heizkosten ablesen.',
  ],
  faq: [
    { q: 'Wie viel Pellets braucht ein Einfamilienhaus?', a: 'Grobe Faustregel: rund 4-6 Tonnen Pellets pro Jahr, abhängig von Dämmung, Wohnfläche und Wärmebedarf.' },
    { q: 'Was entspricht 1 Tonne Pellets in Heizöl?', a: 'Etwa 2 kg Pellets liefern so viel Wärme wie 1 Liter Heizöl. 1 Tonne Pellets ersetzt also grob 500 Liter Heizöl.' },
  ],
  related: ['heizoel-kosten-rechner', 'brennholz-bedarf-rechner', 'heizkosten-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { waermebedarf: 20000, heizwert: 4.8, wirkungsgrad: 90, preis: 350 },
      expect: [
        { label: 'Pelletbedarf in kg', value: 4630, tolerance: 2 },
        { label: 'Pelletbedarf pro Jahr', value: 4.63, tolerance: 0.01 },
        { label: 'Heizkosten pro Jahr', value: 1620.37, tolerance: 1 },
      ],
    },
  ],
};
