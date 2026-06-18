import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'heizoel-kosten-rechner',
  category: 'energie',
  title: 'Heizöl-Kosten-Rechner',
  shortTitle: 'Heizöl',
  description:
    'Berechne deine Heizölkosten aus Jahresverbrauch in Litern und Literpreis - mit Kosten pro Jahr und Monat sowie der enthaltenen Heizenergie in kWh.',
  keywords: [
    'heizöl kosten rechner',
    'heizöl preis rechner',
    'heizölkosten berechnen',
    'heizöl verbrauch kosten',
    'heizöl liter kwh',
    'ölheizung kosten',
    'heizöl jahreskosten',
  ],
  intro:
    'Mit diesem Rechner ermittelst du, was deine Ölheizung pro Jahr kostet. Du gibst den Jahresverbrauch in Litern und den aktuellen Literpreis ein. Zusätzlich wird die enthaltene Heizenergie ausgewiesen - ein Liter Heizöl entspricht rund 10 kWh - sodass du Heizöl mit Gas oder Wärmepumpe vergleichen kannst.',
  formula: 'Kosten = Verbrauch (Liter) × Literpreis; Energie = Liter × 10 kWh',
  inputs: [
    { type: 'number', id: 'liter', label: 'Jahresverbrauch', unit: 'Liter', default: 2000, min: 0, step: 50, help: 'Einfamilienhaus oft 1.500-3.000 Liter pro Jahr.' },
    { type: 'number', id: 'preis', label: 'Heizölpreis', unit: 'ct/Liter', default: 105, min: 0, step: 1, help: 'Preis pro Liter in Cent, schwankt stark.' },
    { type: 'number', id: 'energieinhalt', label: 'Energieinhalt', unit: 'kWh/Liter', default: 10, min: 1, step: 0.1, help: 'Heizöl EL liefert rund 10 kWh je Liter.' },
  ],
  compute: (v) => {
    const liter = num(v.liter);
    const preis = num(v.preis) / 100;
    const inhalt = num(v.energieinhalt);
    const jahr = liter * preis;
    const energie = liter * inhalt;
    const preisProKwh = inhalt > 0 ? preis / inhalt : 0;
    return [
      { label: 'Heizölkosten pro Jahr', value: jahr, unit: '€', digits: 2, primary: true },
      { label: 'Heizölkosten pro Monat', value: jahr / 12, unit: '€', digits: 2 },
      { label: 'Heizenergie pro Jahr', value: energie, unit: 'kWh', digits: 0 },
      { label: 'Preis pro kWh', value: preisProKwh * 100, unit: 'ct/kWh', digits: 2 },
    ];
  },
  howto: [
    'Jährlichen Heizölverbrauch in Litern eintragen (Tankprotokoll oder Liefermengen).',
    'Aktuellen Heizölpreis in Cent pro Liter eingeben.',
    'Energieinhalt je Liter prüfen (Standard 10 kWh für Heizöl EL).',
    'Jahres- und Monatskosten sowie Energie und Preis pro kWh ablesen.',
  ],
  faq: [
    { q: 'Wie viel kWh hat ein Liter Heizöl?', a: 'Heizöl extraleicht (EL) liefert rund 10 kWh pro Liter (genauer etwa 9,8-10 kWh). Damit lässt sich Heizöl direkt mit Gas und Strom vergleichen.' },
    { q: 'Wie viel Heizöl verbraucht ein Haus?', a: 'Faustregel: 1.000-1.500 Liter je 100 m² beheizter Fläche im Jahr, je nach Dämmung. Ein durchschnittliches Einfamilienhaus kommt auf 1.500-3.000 Liter.' },
    { q: 'Warum schwankt der Heizölpreis so stark?', a: 'Heizöl hängt am Rohölpreis und am Wechselkurs. Innerhalb eines Jahres sind Schwankungen von mehreren zehn Cent pro Liter normal - tagesaktuellen Preis einsetzen.' },
    { q: 'Ist der CO2-Preis im Literpreis enthalten?', a: 'Ja, beim Kauf gezahlte CO2-Abgabe und Energiesteuer stecken im Literpreis. Stand 2026 steigt die CO2-Bepreisung weiter, was Heizöl tendenziell verteuert.' },
  ],
  related: ['gaskosten-rechner', 'heizkosten-rechner', 'kwh-kosten-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { liter: 2000, preis: 105, energieinhalt: 10 },
      expect: [
        { label: 'Heizölkosten pro Jahr', value: 2100, tolerance: 0.01 },
        { label: 'Heizenergie pro Jahr', value: 20000, tolerance: 0.5 },
        { label: 'Preis pro kWh', value: 10.5, tolerance: 0.01 },
      ],
    },
  ],
};
