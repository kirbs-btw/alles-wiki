import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'waermepumpe-stromkosten-rechner',
  category: 'energie',
  title: 'Wärmepumpe Stromkosten-Rechner (JAZ)',
  shortTitle: 'Wärmepumpe',
  description:
    'Berechne die Stromkosten deiner Wärmepumpe aus Heizwärmebedarf, Jahresarbeitszahl (JAZ) und Wärmepumpenstrompreis - inklusive Stromverbrauch pro Jahr.',
  keywords: [
    'wärmepumpe stromkosten rechner',
    'wärmepumpe stromverbrauch',
    'jaz wärmepumpe',
    'jahresarbeitszahl rechner',
    'wärmepumpe kosten berechnen',
    'wärmepumpe stromkosten jahr',
    'cop wärmepumpe',
  ],
  intro:
    'Dieser Rechner zeigt, wie viel Strom eine Wärmepumpe kostet. Entscheidend ist die Jahresarbeitszahl (JAZ): Sie gibt an, wie viel Wärme die Pumpe aus einer Kilowattstunde Strom macht. Eine JAZ von 4 bedeutet, dass aus 1 kWh Strom 4 kWh Wärme werden. Strombedarf = Heizwärmebedarf geteilt durch JAZ.',
  formula: 'Stromverbrauch = Heizwärmebedarf ÷ JAZ; Kosten = Stromverbrauch × Strompreis',
  inputs: [
    { type: 'number', id: 'waerme', label: 'Heizwärmebedarf', unit: 'kWh/Jahr', default: 15000, min: 0, step: 500, help: 'Benötigte Wärme inkl. Warmwasser. Einfamilienhaus oft 12.000-20.000 kWh.' },
    { type: 'number', id: 'jaz', label: 'Jahresarbeitszahl (JAZ)', unit: '', default: 3.5, min: 1, step: 0.1, help: 'Luft-Wasser ~3,0-3,5, Erdwärme ~4,0-4,5.' },
    { type: 'number', id: 'preis', label: 'Wärmepumpenstrompreis', unit: 'ct/kWh', default: 28, min: 0, step: 0.5, help: 'Oft günstiger Sondertarif, ~25-30 ct/kWh.' },
  ],
  compute: (v) => {
    const waerme = num(v.waerme);
    const jaz = num(v.jaz);
    const preis = num(v.preis) / 100;
    const strom = jaz > 0 ? waerme / jaz : 0;
    const jahr = strom * preis;
    return [
      { label: 'Stromkosten pro Jahr', value: jahr, unit: '€', digits: 2, primary: true },
      { label: 'Stromkosten pro Monat', value: jahr / 12, unit: '€', digits: 2 },
      { label: 'Stromverbrauch pro Jahr', value: strom, unit: 'kWh', digits: 0 },
    ];
  },
  howto: [
    'Jährlichen Heizwärmebedarf eintragen (Raumwärme plus Warmwasser).',
    'Jahresarbeitszahl deiner Wärmepumpe eingeben (Datenblatt oder Erfahrungswert).',
    'Wärmepumpenstrompreis in Cent pro kWh ergänzen.',
    'Stromkosten pro Jahr, Monat und den Jahresstromverbrauch ablesen.',
  ],
  faq: [
    { q: 'Was ist die Jahresarbeitszahl (JAZ)?', a: 'Die JAZ ist das Verhältnis von erzeugter Wärme zu eingesetztem Strom über ein ganzes Jahr. Eine JAZ von 4 heißt: aus 1 kWh Strom werden 4 kWh Wärme. Je höher, desto effizienter.' },
    { q: 'Worin unterscheiden sich COP und JAZ?', a: 'Der COP ist ein Laborwert bei festen Bedingungen, die JAZ der reale Jahresdurchschnitt im eingebauten Zustand. Für Kostenrechnungen ist immer die JAZ maßgeblich.' },
    { q: 'Welche JAZ ist realistisch?', a: 'Luft-Wasser-Wärmepumpen erreichen meist 3,0-3,8, Sole/Wasser- und Wasser/Wasser-Anlagen 4,0-4,8. Niedrige Vorlauftemperaturen und gute Dämmung verbessern die JAZ.' },
    { q: 'Warum gibt es Wärmepumpenstrom-Tarife?', a: 'Versorger bieten oft vergünstigte Tarife für Wärmepumpen an, teils mit eigenem Zähler. Stand 2026 liegen sie häufig bei rund 25-30 ct/kWh - prüfe deinen konkreten Tarif.' },
  ],
  related: ['heizkosten-rechner', 'gaskosten-rechner', 'stromkosten-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { waerme: 15000, jaz: 3.5, preis: 28 },
      expect: [
        { label: 'Stromverbrauch pro Jahr', value: 4285.71, tolerance: 1 },
        { label: 'Stromkosten pro Jahr', value: 1200, tolerance: 0.5 },
      ],
    },
  ],
};
