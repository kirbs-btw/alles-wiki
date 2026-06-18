import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'kosten-pro-km-rechner',
  category: 'auto',
  title: 'Kosten-pro-Kilometer-Rechner',
  shortTitle: 'Kosten/km',
  description:
    'Berechne die echten Kosten pro Kilometer deines Autos aus Fixkosten, Sprit und Wartung – mit Aufschlüsselung in laufende und gesamte Kosten.',
  keywords: [
    'kosten pro kilometer berechnen',
    'kilometerkosten auto',
    'kosten pro km rechner',
    'autokosten pro km',
    'wahre kosten auto',
    'cent pro kilometer',
    'fahrtkosten pro km',
  ],
  formula: 'Kosten/km = (Fixkosten/Jahr + Spritkosten + Wartung) / Jahresfahrleistung',
  inputs: [
    { type: 'number', id: 'fahrleistung', label: 'Jahresfahrleistung', unit: 'km/Jahr', default: 15000, min: 1, step: 100 },
    { type: 'number', id: 'verbrauch', label: 'Verbrauch', unit: 'l/100 km', default: 7, min: 0, step: 0.1 },
    { type: 'number', id: 'preis', label: 'Kraftstoffpreis', unit: '€/l', default: 1.75, min: 0, step: 0.01 },
    { type: 'number', id: 'fixkosten', label: 'Fixkosten/Jahr (Steuer, Versicherung)', unit: '€/Jahr', default: 1200, min: 0, step: 10 },
    { type: 'number', id: 'wartung', label: 'Wartung & Reparatur/Jahr', unit: '€/Jahr', default: 800, min: 0, step: 10 },
    { type: 'number', id: 'wertverlust', label: 'Wertverlust/Jahr', unit: '€/Jahr', default: 1500, min: 0, step: 10 },
  ],
  compute: (v) => {
    const fahrleistung = num(v.fahrleistung, 1);
    const verbrauch = num(v.verbrauch);
    const preis = num(v.preis);
    const fixkosten = num(v.fixkosten);
    const wartung = num(v.wartung);
    const wertverlust = num(v.wertverlust);
    const spritJahr = (fahrleistung / 100) * verbrauch * preis;
    const gesamtJahr = fixkosten + wartung + wertverlust + spritJahr;
    const kostenProKm = fahrleistung > 0 ? gesamtJahr / fahrleistung : 0;
    const spritProKm = fahrleistung > 0 ? spritJahr / fahrleistung : 0;
    const gesamtMonat = gesamtJahr / 12;
    return [
      { label: 'Kosten pro Kilometer', value: kostenProKm, unit: '€/km', digits: 3, primary: true },
      { label: 'Gesamtkosten pro Jahr', value: gesamtJahr, unit: '€', digits: 2 },
      { label: 'Gesamtkosten pro Monat', value: gesamtMonat, unit: '€', digits: 2 },
      { label: 'davon reine Spritkosten/km', value: spritProKm, unit: '€/km', digits: 3 },
    ];
  },
  intro:
    'Viele unterschätzen, was ein Auto wirklich kostet – der Sprit ist nur ein Teil. Die Vollkosten umfassen auch Wertverlust, Versicherung, Steuer, Wartung und Reparaturen. Erst die Summe geteilt durch die Jahresfahrleistung zeigt die ehrlichen Kosten pro Kilometer.',
  howto: [
    'Geschätzte Jahresfahrleistung in Kilometern eintragen.',
    'Verbrauch und Spritpreis für die laufenden Kraftstoffkosten angeben.',
    'Fixkosten (Versicherung, Kfz-Steuer) sowie Wartung pro Jahr ergänzen.',
    'Jährlichen Wertverlust eintragen – diesen Posten vergessen die meisten.',
  ],
  faq: [
    { q: 'Warum zählt der Wertverlust mit?', a: 'Der Wertverlust ist bei neueren Autos oft der größte Kostenblock. Er entsteht, ob man fährt oder nicht, und gehört zu den ehrlichen Gesamtkosten dazu.' },
    { q: 'Welche Kosten gehören zu den Fixkosten?', a: 'Typisch sind Kfz-Versicherung, Kfz-Steuer, Hauptuntersuchung, Garage/Stellplatz sowie eventuelle Finanzierungskosten.' },
    { q: 'Wie schätze ich den Wertverlust?', a: 'Faustregel: Differenz aus Kauf- und erwartetem Verkaufspreis geteilt durch die Haltejahre. Unser Wertverlust-Rechner hilft dabei.' },
    { q: 'Was kostet ein Kilometer im Schnitt?', a: 'Bei einem typischen Mittelklasse-Pkw liegen die Vollkosten je nach Fahrleistung grob zwischen 0,30 und 0,60 Euro pro Kilometer.' },
  ],
  related: ['durchschnittsverbrauch-rechner', 'wertverlust-rechner', 'spritkosten-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { fahrleistung: 15000, verbrauch: 7, preis: 1.75, fixkosten: 1200, wartung: 800, wertverlust: 1500 },
      expect: [{ label: 'Gesamtkosten pro Jahr', value: 5337.5, tolerance: 0.5 }],
    },
    {
      values: { fahrleistung: 15000, verbrauch: 7, preis: 1.75, fixkosten: 1200, wartung: 800, wertverlust: 1500 },
      expect: [{ label: 'Kosten pro Kilometer', value: 0.3558, tolerance: 0.001 }],
    },
  ],
};
