import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'trinkgeld-rechner',
  category: 'alltag',
  title: 'Trinkgeld-Rechner',
  shortTitle: 'Trinkgeld',
  description:
    'Berechne das Trinkgeld und teile den Gesamtbetrag fair auf mehrere Personen auf – ideal fürs Restaurant.',
  keywords: [
    'trinkgeld rechner',
    'trinkgeld berechnen',
    'rechnung aufteilen',
    'tip rechner',
    'trinkgeld prozent',
  ],
  formula: 'Trinkgeld = Betrag × Prozent / 100; Pro Person = (Betrag + Trinkgeld) / Personen',
  inputs: [
    { type: 'number', id: 'betrag', label: 'Rechnungsbetrag', unit: '€', default: 50, min: 0, step: 0.5 },
    { type: 'number', id: 'prozent', label: 'Trinkgeld', unit: '%', default: 10, min: 0, step: 1 },
    { type: 'number', id: 'personen', label: 'Personen', default: 2, min: 1, step: 1 },
  ],
  compute: (v) => {
    const betrag = num(v.betrag);
    const prozent = num(v.prozent);
    const personen = num(v.personen, 1);
    const trinkgeld = (betrag * prozent) / 100;
    const gesamt = betrag + trinkgeld;
    const proPerson = personen > 0 ? gesamt / personen : gesamt;
    return [
      { label: 'Trinkgeld', value: trinkgeld, unit: '€', digits: 2 },
      { label: 'Gesamtbetrag', value: gesamt, unit: '€', digits: 2, primary: true },
      { label: 'Pro Person', value: proPerson, unit: '€', digits: 2 },
    ];
  },
  howto: [
    'Rechnungsbetrag eingeben.',
    'Gewünschten Trinkgeld-Prozentsatz wählen (in Deutschland üblich: 5–10 %).',
    'Personenzahl für die Aufteilung angeben.',
  ],
  faq: [
    { q: 'Wie viel Trinkgeld ist in Deutschland üblich?', a: 'Im Restaurant sind etwa 5–10 % des Rechnungsbetrags üblich, meist auf einen runden Betrag aufgerundet.' },
  ],
  related: ['rechnung-splitten-rechner', 'benzin-pro-person-rechner', 'getraenke-pro-gast-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { betrag: 50, prozent: 10, personen: 2 },
      expect: [
        { label: 'Trinkgeld', value: 5, tolerance: 0.01 },
        { label: 'Gesamtbetrag', value: 55, tolerance: 0.01 },
      ],
    },
  ],
};
