import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'durchschnittsverbrauch-rechner',
  category: 'auto',
  title: 'Durchschnittsverbrauch-Rechner',
  shortTitle: 'Verbrauch',
  description:
    'Berechne deinen tatsächlichen Spritverbrauch in l/100 km aus getankten Litern und gefahrenen Kilometern – inklusive Kosten pro 100 km.',
  keywords: [
    'durchschnittsverbrauch berechnen',
    'verbrauch l 100 km rechner',
    'spritverbrauch ermitteln',
    'kraftstoffverbrauch berechnen',
    'verbrauch pro 100 km',
    'tankquittung verbrauch',
    'auto verbrauch rechner',
  ],
  formula: 'Verbrauch (l/100 km) = getankte Liter / Strecke (km) × 100',
  inputs: [
    { type: 'number', id: 'liter', label: 'Getankte Menge', unit: 'l', default: 45, min: 0, step: 0.1 },
    { type: 'number', id: 'strecke', label: 'Gefahrene Strecke', unit: 'km', default: 600, min: 0, step: 1 },
    { type: 'number', id: 'preis', label: 'Kraftstoffpreis', unit: '€/l', default: 1.75, min: 0, step: 0.01 },
  ],
  compute: (v) => {
    const liter = num(v.liter);
    const strecke = num(v.strecke);
    const preis = num(v.preis);
    const verbrauch = strecke > 0 ? (liter / strecke) * 100 : 0;
    const kostenProKm = strecke > 0 ? (liter * preis) / strecke : 0;
    const kostenPro100 = kostenProKm * 100;
    const reichweiteProTank = verbrauch > 0 ? (liter / verbrauch) * 100 : 0;
    return [
      { label: 'Durchschnittsverbrauch', value: verbrauch, unit: 'l/100 km', digits: 2, primary: true },
      { label: 'Kosten pro 100 km', value: kostenPro100, unit: '€', digits: 2 },
      { label: 'Kosten pro km', value: kostenProKm, unit: '€', digits: 3 },
      { label: 'Reichweite je Tankfüllung', value: reichweiteProTank, unit: 'km', digits: 0 },
    ];
  },
  intro:
    'Der reale Verbrauch weicht oft vom Normwert (WLTP) ab. Wer zwischen zwei Tankvorgängen voll betankt und den Tageskilometerzähler nutzt, kann den echten Verbrauch einfach selbst ermitteln. Diese Methode (volltanken bis Pumpe abschaltet) liefert über mehrere Tankfüllungen die genauesten Werte.',
  howto: [
    'Tank an derselben Zapfsäule randvoll füllen und Tageskilometerzähler auf null stellen.',
    'Bei der nächsten Betankung erneut randvoll tanken und die getankten Liter ablesen.',
    'Getankte Liter und seit dem letzten Volltanken gefahrene Kilometer eintragen.',
    'Aktuellen Kraftstoffpreis ergänzen, um Kosten pro 100 km zu sehen.',
  ],
  faq: [
    { q: 'Warum weicht mein Verbrauch vom Prospekt ab?', a: 'Herstellerangaben stammen aus dem WLTP-Prüfzyklus. Stadtverkehr, Klimaanlage, Beladung, Kurzstrecke und Fahrstil erhöhen den realen Verbrauch oft um 10 bis 30 Prozent.' },
    { q: 'Wie genau ist die Volltank-Methode?', a: 'Eine einzelne Messung kann durch unterschiedlich gefüllte Tanks schwanken. Über drei bis fünf Tankfüllungen gemittelt ist sie sehr zuverlässig.' },
    { q: 'Sollte ich den Bordcomputer nutzen?', a: 'Bordcomputer zeigen den Verbrauch oft etwas zu niedrig an (1 bis 5 Prozent). Die Rechnung aus Tankquittung und Tacho ist die verlässlichere Referenz.' },
    { q: 'Was bedeutet l/100 km?', a: 'Es ist der Kraftstoffverbrauch in Litern für 100 gefahrene Kilometer. Je kleiner der Wert, desto sparsamer das Fahrzeug.' },
  ],
  related: ['spritkosten-rechner', 'kosten-pro-km-rechner', 'reichweite-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { liter: 45, strecke: 600, preis: 1.75 },
      expect: [{ label: 'Durchschnittsverbrauch', value: 7.5, tolerance: 0.01 }],
    },
    {
      values: { liter: 50, strecke: 625, preis: 1.8 },
      expect: [{ label: 'Kosten pro 100 km', value: 14.4, tolerance: 0.05 }],
    },
  ],
};
