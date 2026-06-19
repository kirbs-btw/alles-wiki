import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'heizwaermebedarf-rechner',
  category: 'energie',
  title: 'Heizwärmebedarf-Rechner (kWh)',
  shortTitle: 'Wärmebedarf',
  description:
    'Berechne den jährlichen Heizwärmebedarf in kWh aus beheizter Fläche und Dämmstandard - inklusive Anteil für Warmwasser und Verbrauch pro Quadratmeter.',
  keywords: [
    'heizwärmebedarf berechnen',
    'wärmebedarf rechner',
    'jahreswärmebedarf kwh',
    'heizenergiebedarf',
    'kwh heizung pro jahr',
    'wärmebedarf haus',
  ],
  intro:
    'Der Heizwärmebedarf gibt an, wie viele Kilowattstunden Wärme ein Gebäude pro Jahr benötigt. Er ergibt sich aus der beheizten Fläche und dem spezifischen Bedarf in kWh pro Quadratmeter, der vom Dämmstandard abhängt. Dieser Wert ist die Grundlage, um Brennstoffmengen, Heizkosten oder den Stromverbrauch einer Wärmepumpe zu schätzen. Optional wird der Warmwasserbedarf ergänzt.',
  formula: 'Heizwärmebedarf = Fläche × spez. Bedarf (kWh/m²) + Warmwasser (12 kWh/m²)',
  inputs: [
    { type: 'number', id: 'flaeche', label: 'Beheizte Wohnfläche', unit: 'm²', default: 120, min: 0, step: 1 },
    {
      type: 'select',
      id: 'standard',
      label: 'Dämmstandard',
      default: '130',
      options: [
        { value: '30', label: 'Passivhaus (~30 kWh/m²·a)' },
        { value: '60', label: 'KfW-Effizienzhaus / Neubau (~60 kWh/m²·a)' },
        { value: '100', label: 'Bestand saniert (~100 kWh/m²·a)' },
        { value: '130', label: 'Durchschnittlicher Bestand (~130 kWh/m²·a)' },
        { value: '200', label: 'Altbau unsaniert (~200 kWh/m²·a)' },
      ],
      help: 'Spezifischer Heizwärmebedarf je Quadratmeter und Jahr.',
    },
    {
      type: 'select',
      id: 'ww',
      label: 'Warmwasser einrechnen',
      default: 'ja',
      options: [
        { value: 'ja', label: 'Ja (+12 kWh/m²·a)' },
        { value: 'nein', label: 'Nein, nur Raumwärme' },
      ],
      help: 'Warmwasser für Duschen, Bad und Küche.',
    },
  ],
  compute: (v) => {
    const flaeche = num(v.flaeche);
    const spez = num(v.standard);
    const wwZuschlag = String(v.ww) === 'ja' ? 12 : 0;
    const raumwaerme = flaeche * spez;
    const warmwasser = flaeche * wwZuschlag;
    const gesamt = raumwaerme + warmwasser;
    return [
      { label: 'Heizwärmebedarf pro Jahr', value: gesamt, unit: 'kWh', digits: 0, primary: true },
      { label: 'davon Raumwärme', value: raumwaerme, unit: 'kWh', digits: 0 },
      { label: 'davon Warmwasser', value: warmwasser, unit: 'kWh', digits: 0 },
      { label: 'Bedarf pro m²', value: flaeche > 0 ? gesamt / flaeche : 0, unit: 'kWh/m²', digits: 0 },
    ];
  },
  howto: [
    'Beheizte Wohnfläche in Quadratmetern eintragen.',
    'Dämmstandard des Gebäudes wählen.',
    'Festlegen, ob der Warmwasserbedarf mitgerechnet wird.',
    'Jährlichen Heizwärmebedarf in kWh ablesen - nutzbar für Heizkosten und Brennstoffmengen.',
  ],
  faq: [
    { q: 'Wofür brauche ich den Heizwärmebedarf?', a: 'Aus dem Bedarf in kWh lassen sich Brennstoffmengen (Gas, Öl, Pellets), Heizkosten und der Stromverbrauch einer Wärmepumpe ableiten. Er ist die zentrale energetische Kenngröße eines Gebäudes.' },
    { q: 'Wie viel Warmwasser ist üblich?', a: 'Für Warmwasser werden je nach Personenzahl und Komfort etwa 12-15 kWh pro Quadratmeter und Jahr angesetzt. Der Rechner verwendet 12 kWh/m² als gängigen Mittelwert.' },
    { q: 'Ist das End- oder Nutzenergie?', a: 'Der Rechner schätzt die benötigte Nutz- bzw. Heizwärme. Der tatsächliche Brennstoff- oder Stromverbrauch hängt zusätzlich vom Wirkungsgrad der Anlage ab - bei Wärmepumpen über die Jahresarbeitszahl, bei Kesseln über den Wirkungsgrad.' },
    { q: 'Woher kenne ich meinen genauen Bedarf?', a: 'Den exakten Wert nennt der Energieausweis als Endenergiebedarf. Alternativ teilst du den realen Jahresverbrauch (z. B. kWh Gas) durch die Wohnfläche.' },
  ],
  related: ['heizkosten-rechner', 'heizsystem-vergleich-rechner', 'waermepumpe-stromkosten-rechner'],
  updated: '2026-06-19',
  examples: [
    {
      values: { flaeche: 120, standard: '130', ww: 'ja' },
      expect: [
        { label: 'Heizwärmebedarf pro Jahr', value: 17040, tolerance: 0 },
        { label: 'davon Warmwasser', value: 1440, tolerance: 0 },
      ],
    },
    {
      values: { flaeche: 100, standard: '60', ww: 'nein' },
      expect: [{ label: 'Heizwärmebedarf pro Jahr', value: 6000, tolerance: 0 }],
    },
  ],
};
