import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'spritkosten-rechner',
  category: 'auto',
  title: 'Spritkosten-Rechner',
  shortTitle: 'Spritkosten',
  description:
    'Berechne die Spritkosten für eine Strecke aus Verbrauch und Kraftstoffpreis – gesamt und pro Person.',
  keywords: [
    'spritkosten rechner',
    'benzinkosten berechnen',
    'spritkosten strecke',
    'fahrtkosten rechner',
    'kraftstoffkosten',
  ],
  formula: 'Kosten = Strecke / 100 × Verbrauch × Preis',
  inputs: [
    { type: 'number', id: 'strecke', label: 'Strecke', unit: 'km', default: 100, min: 0, step: 1 },
    { type: 'number', id: 'verbrauch', label: 'Verbrauch', unit: 'l/100 km', default: 7, min: 0, step: 0.1 },
    { type: 'number', id: 'preis', label: 'Kraftstoffpreis', unit: '€/l', default: 1.8, min: 0, step: 0.01 },
    { type: 'number', id: 'personen', label: 'Personen', default: 1, min: 1, step: 1 },
  ],
  compute: (v) => {
    const strecke = num(v.strecke);
    const verbrauch = num(v.verbrauch);
    const preis = num(v.preis);
    const personen = num(v.personen, 1);
    const liter = (strecke / 100) * verbrauch;
    const kosten = liter * preis;
    const proPerson = personen > 0 ? kosten / personen : kosten;
    return [
      { label: 'Spritkosten', value: kosten, unit: '€', digits: 2, primary: true },
      { label: 'Kraftstoffmenge', value: liter, unit: 'l', digits: 2 },
      { label: 'Kosten pro Person', value: proPerson, unit: '€', digits: 2 },
    ];
  },
  howto: [
    'Streckenlänge in Kilometern eingeben.',
    'Durchschnittsverbrauch (l/100 km) und aktuellen Spritpreis eintragen.',
    'Optional Personenzahl für die Aufteilung angeben.',
  ],
  faq: [
    { q: 'Wo finde ich meinen Verbrauch?', a: 'Der Bordcomputer zeigt den Durchschnittsverbrauch an; alternativ steht ein Richtwert im Fahrzeugschein bzw. den Herstellerangaben.' },
  ],
  updated: '2026-06-18',
  examples: [
    {
      values: { strecke: 100, verbrauch: 7, preis: 1.8, personen: 1 },
      expect: [{ label: 'Spritkosten', value: 12.6, tolerance: 0.01 }],
    },
  ],
};
