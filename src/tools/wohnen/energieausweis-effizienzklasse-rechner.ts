import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'energieausweis-effizienzklasse-rechner',
  category: 'wohnen',
  title: 'Energieausweis Effizienzklasse-Rechner',
  shortTitle: 'Effizienzklasse',
  description:
    'Bestimme die Energieeffizienzklasse (A+ bis H) deines Gebäudes aus dem Endenergiebedarf je Quadratmeter und Jahr nach den Klassen des Energieausweises.',
  keywords: [
    'energieeffizienzklasse berechnen',
    'energieausweis klasse',
    'kwh pro qm effizienzklasse',
    'effizienzklasse haus',
    'energieklasse gebäude',
  ],
  formula:
    'Kennwert = Endenergiebedarf / Wohnfläche (kWh/m²·a); Einstufung A+ (<30) bis H (≥250) nach Energieausweis-Skala (GEG).',
  inputs: [
    { type: 'number', id: 'endenergie', label: 'Endenergiebedarf pro Jahr', unit: 'kWh/a', default: 12000, min: 0, step: 100, help: 'Jahresverbrauch für Heizung und Warmwasser.' },
    { type: 'number', id: 'flaeche', label: 'Wohnfläche', unit: 'm²', default: 120, min: 1, step: 1 },
  ],
  compute: (v) => {
    const endenergie = num(v.endenergie);
    const flaeche = num(v.flaeche);
    const kennwert = flaeche > 0 ? endenergie / flaeche : 0;

    // Klassengrenzen nach Energieausweis (Endenergie kWh/m²·a), GEG Anlage 10.
    const grenzen: { max: number; klasse: string }[] = [
      { max: 30, klasse: 'A+' },
      { max: 50, klasse: 'A' },
      { max: 75, klasse: 'B' },
      { max: 100, klasse: 'C' },
      { max: 130, klasse: 'D' },
      { max: 160, klasse: 'E' },
      { max: 200, klasse: 'F' },
      { max: 250, klasse: 'G' },
    ];
    let klasse = 'H';
    for (const g of grenzen) {
      if (kennwert < g.max) {
        klasse = g.klasse;
        break;
      }
    }

    return [
      { label: 'Effizienzklasse', value: klasse, primary: true },
      { label: 'Energiekennwert', value: kennwert, unit: 'kWh/m²·a', digits: 1 },
    ];
  },
  intro:
    'Die Energieeffizienzklasse im Energieausweis reicht von A+ (sehr effizient) bis H (sehr unwirtschaftlich) und beruht auf dem Endenergiebedarf je Quadratmeter Wohnfläche und Jahr. Sie macht den energetischen Zustand verschiedener Gebäude direkt vergleichbar. Dieser Rechner stuft deinen Kennwert nach der offiziellen Skala des Energieausweises (GEG Anlage 10) ein.',
  howto: [
    'Jährlichen Endenergiebedarf für Heizung und Warmwasser eingeben (aus Energieausweis oder Verbrauchsabrechnung).',
    'Wohnfläche in m² eintragen.',
    'Energiekennwert je m² und Jahr sowie die zugehörige Effizienzklasse ablesen.',
  ],
  faq: [
    { q: 'Was bedeuten die Effizienzklassen?', a: 'Klasse A+ steht für sehr energieeffiziente Gebäude (unter 30 kWh/m²·a), Klasse H für besonders unwirtschaftliche (ab 250 kWh/m²·a). Ein gut sanierter Altbau erreicht meist Klasse C bis D, ein KfW-Effizienzhaus A oder A+.' },
    { q: 'Welcher Energiewert zählt?', a: 'Maßgeblich ist der Endenergiekennwert in kWh je m² Wohnfläche und Jahr, wie er im Energieausweis ausgewiesen wird. Er umfasst Heizung und Warmwasser, nicht den Haushaltsstrom.' },
    { q: 'Ist die Einstufung verbindlich?', a: 'Der Rechner bildet die offiziellen Klassengrenzen nach. Der rechtsgültige Energieausweis wird jedoch von einer qualifizierten Person ausgestellt und kann je nach Verfahren (Bedarf oder Verbrauch) abweichen.' },
  ],
  related: ['heizlast-rechner', 'daemmung-heizkosten-ersparnis-rechner', 'quadratmeterpreis-rechner'],
  updated: '2026-06-19',
  examples: [
    {
      values: { endenergie: 12000, flaeche: 120 },
      expect: [
        { label: 'Energiekennwert', value: 100, tolerance: 0.1 },
      ],
    },
    {
      values: { endenergie: 7200, flaeche: 120 },
      expect: [
        { label: 'Energiekennwert', value: 60, tolerance: 0.1 },
      ],
    },
  ],
};
