import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'heizkosten-rechner',
  category: 'energie',
  title: 'Heizkosten-Rechner',
  shortTitle: 'Heizkosten',
  description:
    'Schätze deine jährlichen Heizkosten aus Wohnfläche, spezifischem Heizenergiebedarf und Energiepreis - mit Kosten pro Quadratmeter und Monat.',
  keywords: [
    'heizkosten rechner',
    'heizkosten berechnen',
    'heizkosten pro qm',
    'heizenergiebedarf',
    'heizkosten wohnung',
    'heizkosten schätzen',
    'heizkosten m2',
  ],
  intro:
    'Dieser Rechner schätzt deine Heizkosten auf Basis der beheizten Wohnfläche und des spezifischen Heizenergiebedarfs in kWh pro Quadratmeter und Jahr. So lässt sich unabhängig vom Energieträger abschätzen, was das Heizen kostet. Der Energieausweis nennt den spezifischen Bedarf, typische Werte liegen zwischen 60 (saniert) und 200 (unsaniert) kWh/m².',
  formula: 'Kosten = Wohnfläche × spez. Bedarf (kWh/m²) × Energiepreis (€/kWh)',
  inputs: [
    { type: 'number', id: 'flaeche', label: 'Beheizte Wohnfläche', unit: 'm²', default: 90, min: 0, step: 1 },
    { type: 'number', id: 'bedarf', label: 'Spezifischer Heizbedarf', unit: 'kWh/m²·a', default: 130, min: 0, step: 5, help: 'Aus dem Energieausweis. Neubau ~50, Altbau unsaniert ~180.' },
    { type: 'number', id: 'preis', label: 'Energiepreis', unit: 'ct/kWh', default: 11, min: 0, step: 0.1, help: 'Gas ~11, Wärmepumpenstrom ~28, Fernwärme variiert.' },
  ],
  compute: (v) => {
    const flaeche = num(v.flaeche);
    const bedarf = num(v.bedarf);
    const preis = num(v.preis);
    const energie = flaeche * bedarf;
    const jahr = energie * (preis / 100);
    const proQm = flaeche > 0 ? jahr / flaeche : 0;
    return [
      { label: 'Heizkosten pro Jahr', value: jahr, unit: '€', digits: 2, primary: true },
      { label: 'Heizkosten pro Monat', value: jahr / 12, unit: '€', digits: 2 },
      { label: 'Heizkosten pro m²', value: proQm, unit: '€/m²', digits: 2 },
      { label: 'Heizenergie pro Jahr', value: energie, unit: 'kWh', digits: 0 },
    ];
  },
  howto: [
    'Beheizte Wohnfläche in Quadratmetern eintragen.',
    'Spezifischen Heizenergiebedarf aus dem Energieausweis übernehmen (kWh pro m² und Jahr).',
    'Energiepreis pro kWh deines Heizsystems eingeben.',
    'Jahres-, Monats- und Quadratmeterkosten sowie den Energiebedarf ablesen.',
  ],
  faq: [
    { q: 'Wo finde ich den spezifischen Heizbedarf?', a: 'Im Energieausweis des Gebäudes als Endenergiebedarf oder -verbrauch in kWh/(m²·a). Alternativ kannst du den Jahresverbrauch durch die Wohnfläche teilen.' },
    { q: 'Welche Richtwerte gelten?', a: 'Passivhaus unter 30, KfW-Effizienzhaus 50-70, Neubau Standard ~70, durchschnittlicher Bestand ~130, unsanierter Altbau 180-250 kWh/m² pro Jahr.' },
    { q: 'Ist Warmwasser enthalten?', a: 'Der spezifische Heizbedarf im Energieausweis bezieht sich meist nur auf Raumwärme. Für Warmwasser kannst du etwa 12-15 kWh/m² pro Jahr zusätzlich ansetzen.' },
    { q: 'Warum sind die echten Kosten anders?', a: 'Wetter, Heizverhalten, Wirkungsgrad der Anlage und Leerlaufverluste beeinflussen den Verbrauch. Der Rechner liefert eine nachvollziehbare Schätzung, keine exakte Abrechnung.' },
  ],
  related: ['gaskosten-rechner', 'heizoel-kosten-rechner', 'waermepumpe-stromkosten-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { flaeche: 90, bedarf: 130, preis: 11 },
      expect: [
        { label: 'Heizenergie pro Jahr', value: 11700, tolerance: 0.5 },
        { label: 'Heizkosten pro Jahr', value: 1287, tolerance: 0.01 },
      ],
    },
  ],
};
