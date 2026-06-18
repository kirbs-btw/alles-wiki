import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'heizlast-rechner',
  category: 'wohnen',
  title: 'Heizlast-Rechner (Näherung)',
  shortTitle: 'Heizlast',
  description:
    'Schätze die benötigte Heizleistung für einen Raum überschlägig aus Raumvolumen und einem Heizlast-Richtwert nach Dämmstandard.',
  keywords: [
    'heizlast berechnen',
    'heizleistung raum rechner',
    'watt pro raum heizung',
    'heizkörper leistung berechnen',
    'heizlast näherung',
    'benötigte heizleistung',
  ],
  formula: 'Heizleistung (W) = Raumvolumen (m³) × Richtwert (W/m³)',
  inputs: [
    { type: 'number', id: 'flaeche', label: 'Raumfläche', unit: 'm²', default: 20, min: 1, step: 0.5 },
    { type: 'number', id: 'hoehe', label: 'Raumhöhe', unit: 'm', default: 2.5, min: 1, step: 0.05 },
    {
      type: 'select',
      id: 'richtwert',
      label: 'Dämmstandard',
      default: '40',
      options: [
        { value: '30', label: 'Neubau / sehr gut gedämmt (~30 W/m³)' },
        { value: '40', label: 'Modernisiert / gut gedämmt (~40 W/m³)' },
        { value: '60', label: 'Altbau teilsaniert (~60 W/m³)' },
        { value: '80', label: 'Altbau unsaniert (~80 W/m³)' },
      ],
      help: 'Grober Erfahrungswert je m³ Raumvolumen.',
    },
  ],
  compute: (v) => {
    const flaeche = num(v.flaeche);
    const hoehe = num(v.hoehe);
    const richtwert = num(v.richtwert);
    const volumen = flaeche * hoehe;
    const leistung = volumen * richtwert;
    const leistungKw = leistung / 1000;
    return [
      { label: 'Geschätzte Heizleistung', value: leistung, unit: 'W', digits: 0, primary: true },
      { label: 'Heizleistung in kW', value: leistungKw, unit: 'kW', digits: 2 },
      { label: 'Raumvolumen', value: volumen, unit: 'm³', digits: 1 },
    ];
  },
  intro:
    'Dieser Rechner liefert nur eine grobe Orientierung zur Heizlast nach dem Volumen-Verfahren. Für die verbindliche Auslegung von Heizung und Heizkörpern ist eine raumweise Heizlastberechnung nach DIN EN 12831 durch eine Fachkraft nötig.',
  howto: [
    'Raumfläche und Raumhöhe eingeben.',
    'Dämmstandard des Gebäudes wählen.',
    'Geschätzte Heizleistung in Watt bzw. kW ablesen.',
    'Wert nur als erste Orientierung verwenden, nicht als Auslegungsgrundlage.',
  ],
  faq: [
    { q: 'Wie genau ist diese Schätzung?', a: 'Es handelt sich um eine grobe Näherung anhand pauschaler Erfahrungswerte je Kubikmeter. Fenstergröße, Außenwände, Ausrichtung und Lüftung bleiben unberücksichtigt.' },
    { q: 'Was ist eine richtige Heizlastberechnung?', a: 'Die normgerechte Heizlastberechnung nach DIN EN 12831 berücksichtigt Transmissions- und Lüftungsverluste je Raum. Sie ist Grundlage für die Dimensionierung von Wärmepumpe und Heizkörpern.' },
    { q: 'Welcher Richtwert passt zu meinem Haus?', a: 'Gut gedämmte Neubauten brauchen rund 30 W/m³, modernisierte Häuser etwa 40 W/m³, unsanierte Altbauten 70–100 W/m³. Im Zweifel den höheren Wert wählen.' },
  ],
  related: ['raumvolumen-rechner', 'wohnflaeche-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { flaeche: 20, hoehe: 2.5, richtwert: '40' },
      expect: [
        { label: 'Geschätzte Heizleistung', value: 2000, tolerance: 0.5 },
        { label: 'Heizleistung in kW', value: 2, tolerance: 0.01 },
        { label: 'Raumvolumen', value: 50, tolerance: 0.1 },
      ],
    },
  ],
};
