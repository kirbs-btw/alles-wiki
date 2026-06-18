import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'makronaehrstoffe-rechner',
  category: 'gesundheit',
  title: 'Makronährstoffe-Rechner',
  shortTitle: 'Makros',
  description:
    'Berechne die Verteilung von Eiweiß, Fett und Kohlenhydraten in Gramm aus deiner täglichen Kalorienmenge und prozentualen Vorgaben.',
  keywords: [
    'makronaehrstoffe rechner',
    'makros berechnen',
    'eiweiss fett kohlenhydrate',
    'makro verteilung',
    'gramm aus kalorien',
    'naehrstoffverteilung rechner',
  ],
  formula:
    'Eiweiß(g) = kcal×Anteil% / 4; Kohlenhydrate(g) = kcal×Anteil% / 4; Fett(g) = kcal×Anteil% / 9',
  inputs: [
    { type: 'number', id: 'kcal', label: 'Tägliche Kalorienmenge', unit: 'kcal', default: 2000, min: 0, step: 10 },
    { type: 'number', id: 'eiweissProzent', label: 'Anteil Eiweiß', unit: '%', default: 30, min: 0, max: 100, step: 1 },
    { type: 'number', id: 'fettProzent', label: 'Anteil Fett', unit: '%', default: 30, min: 0, max: 100, step: 1 },
    { type: 'number', id: 'kohlenhydrateProzent', label: 'Anteil Kohlenhydrate', unit: '%', default: 40, min: 0, max: 100, step: 1 },
  ],
  compute: (v) => {
    const kcal = num(v.kcal);
    const eP = num(v.eiweissProzent);
    const fP = num(v.fettProzent);
    const kP = num(v.kohlenhydrateProzent);
    const summe = eP + fP + kP;
    const eiweissG = (kcal * (eP / 100)) / 4;
    const fettG = (kcal * (fP / 100)) / 9;
    const kohlenhydrateG = (kcal * (kP / 100)) / 4;
    return [
      { label: 'Eiweiß', value: eiweissG, unit: 'g/Tag', digits: 0, primary: true },
      { label: 'Fett', value: fettG, unit: 'g/Tag', digits: 0 },
      { label: 'Kohlenhydrate', value: kohlenhydrateG, unit: 'g/Tag', digits: 0 },
      { label: 'Summe der Anteile', value: summe, unit: '%', digits: 0, help: 'Sollte 100 % ergeben.' },
    ];
  },
  intro:
    'Makronährstoffe sind Eiweiß (Protein), Fett und Kohlenhydrate – die energieliefernden Bausteine deiner Ernährung. Dieser Rechner wandelt eine prozentuale Verteilung in konkrete Grammwerte um. Dabei gilt: Eiweiß und Kohlenhydrate liefern je rund 4 kcal pro Gramm, Fett rund 9 kcal pro Gramm. Achte darauf, dass die Anteile zusammen 100 % ergeben.',
  howto: [
    'Deine tägliche Kalorienmenge eingeben.',
    'Prozentuale Anteile für Eiweiß, Fett und Kohlenhydrate festlegen.',
    'Darauf achten, dass die Summe 100 % ergibt.',
    'Die Mengen in Gramm pro Tag ablesen.',
  ],
  faq: [
    { q: 'Welche Makroverteilung ist sinnvoll?', a: 'Eine ausgewogene Verteilung liegt häufig bei etwa 30 % Eiweiß, 30 % Fett und 40 % Kohlenhydraten. Für Sportler oder bestimmte Ernährungsformen kann sie deutlich abweichen.' },
    { q: 'Warum hat Fett mehr Kalorien pro Gramm?', a: 'Fett ist energiedichter: Es liefert etwa 9 kcal pro Gramm, während Eiweiß und Kohlenhydrate jeweils nur rund 4 kcal pro Gramm bereitstellen.' },
    { q: 'Muss die Summe genau 100 % sein?', a: 'Ja, für eine korrekte Aufteilung der Kalorienmenge sollten die drei Anteile zusammen 100 % ergeben. Der Rechner zeigt die Summe zur Kontrolle an.' },
  ],
  related: ['kalorienbedarf-rechner', 'eiweissbedarf-rechner', 'kaloriendefizit-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { kcal: 2000, eiweissProzent: 30, fettProzent: 30, kohlenhydrateProzent: 40 },
      expect: [
        { label: 'Eiweiß', value: 150, tolerance: 1 },
        { label: 'Fett', value: 66.67, tolerance: 1 },
        { label: 'Kohlenhydrate', value: 200, tolerance: 1 },
      ],
    },
    {
      values: { kcal: 2500, eiweissProzent: 40, fettProzent: 20, kohlenhydrateProzent: 40 },
      expect: [
        { label: 'Eiweiß', value: 250, tolerance: 1 },
        { label: 'Fett', value: 55.56, tolerance: 1 },
      ],
    },
  ],
};
