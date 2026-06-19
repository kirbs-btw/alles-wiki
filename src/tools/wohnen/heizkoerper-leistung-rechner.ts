import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'heizkoerper-leistung-rechner',
  category: 'wohnen',
  title: 'Heizkörper-Rechner (Größe & Anzahl)',
  shortTitle: 'Heizkörper',
  description:
    'Ermittle die benötigte Heizkörper-Leistung für einen Raum und wie viele Heizkörper du brauchst – mit Korrektur für niedrigere Vorlauftemperaturen.',
  keywords: [
    'heizkörper berechnen',
    'heizkörper größe rechner',
    'heizleistung heizkörper berechnen',
    'wie viele heizkörper pro raum',
    'heizkörper watt pro qm',
    'heizkörper auslegung',
  ],
  formula:
    'Bedarf (W) = Fläche × Richtwert (W/m²); effektive Leistung je Heizkörper = Nennleistung × Korrekturfaktor; Anzahl = ceil(Bedarf / effektive Leistung)',
  inputs: [
    { type: 'number', id: 'flaeche', label: 'Raumfläche', unit: 'm²', default: 20, min: 1, step: 0.5 },
    {
      type: 'select', id: 'richtwert', label: 'Dämmstandard', default: '100',
      help: 'Grober Erfahrungswert je m² Wohnfläche.',
      options: [
        { value: '70', label: 'Neubau / sehr gut gedämmt (~70 W/m²)' },
        { value: '100', label: 'Modernisiert / gut gedämmt (~100 W/m²)' },
        { value: '120', label: 'Altbau teilsaniert (~120 W/m²)' },
        { value: '160', label: 'Altbau unsaniert (~160 W/m²)' },
      ],
    },
    { type: 'number', id: 'nennleistung', label: 'Nennleistung je Heizkörper', unit: 'W', default: 1500, min: 1, step: 50, help: 'Katalogwert, meist bei 75/65/20 °C (Norm 55 K).' },
    {
      type: 'select', id: 'korrektur', label: 'Vorlauf-/Auslegungstemperatur', default: '1.0',
      help: 'Bei niedriger Vorlauftemperatur (z. B. Wärmepumpe) sinkt die Leistung des Heizkörpers.',
      options: [
        { value: '1.0', label: '75/65 °C – Norm (Faktor 1,0)' },
        { value: '0.75', label: '70/55 °C (Faktor ~0,75)' },
        { value: '0.5', label: '55/45 °C – Wärmepumpe (Faktor ~0,5)' },
        { value: '0.35', label: '45/35 °C – Niedertemperatur (Faktor ~0,35)' },
      ],
    },
  ],
  compute: (v) => {
    const flaeche = num(v.flaeche);
    const richtwert = num(v.richtwert);
    const nennleistung = num(v.nennleistung);
    const korrektur = num(v.korrektur, 1);
    const bedarf = flaeche * richtwert;
    const effektiv = nennleistung * korrektur;
    const anzahl = effektiv > 0 ? Math.ceil(bedarf / effektiv) : 0;
    return [
      { label: 'Benötigte Heizleistung', value: bedarf, unit: 'W', digits: 0, primary: true },
      { label: 'Effektive Leistung je Heizkörper', value: effektiv, unit: 'W', digits: 0, help: 'Nennleistung × Korrekturfaktor für die Vorlauftemperatur.' },
      { label: 'Benötigte Heizkörper', value: anzahl, unit: 'Stück', digits: 0 },
    ];
  },
  intro:
    'Ein Heizkörper muss die Wärmeverluste eines Raumes decken. Überschlägig ergibt sich der Bedarf aus der Raumfläche und einem Richtwert je m², der vom Dämmstandard abhängt. Wichtig: Die im Katalog angegebene Nennleistung gilt für eine genormte hohe Vorlauftemperatur (meist 75/65 °C). Bei niedrigeren Temperaturen – etwa im Betrieb mit einer Wärmepumpe – liefert derselbe Heizkörper deutlich weniger Leistung. Der Rechner berücksichtigt das über einen Korrekturfaktor. Für eine verbindliche Auslegung ist eine raumweise Heizlastberechnung nach DIN EN 12831 nötig.',
  howto: [
    'Raumfläche in Quadratmetern eingeben.',
    'Dämmstandard wählen – er bestimmt den Richtwert je m².',
    'Nennleistung des geplanten Heizkörpers eintragen (Katalogwert).',
    'Vorlauftemperatur wählen und benötigte Heizkörperzahl ablesen.',
  ],
  faq: [
    { q: 'Wie viel Watt pro Quadratmeter?', a: 'Als grobe Faustregel rechnet man je nach Dämmung 70 W/m² (Neubau) bis rund 160 W/m² (unsanierter Altbau). Das ist nur eine Näherung; genau ist die raumweise Heizlast nach DIN EN 12831.' },
    { q: 'Warum sinkt die Leistung bei der Wärmepumpe?', a: 'Heizkörperleistungen werden bei hoher Vorlauftemperatur (75/65 °C) angegeben. Eine Wärmepumpe arbeitet effizient nur mit niedrigem Vorlauf (z. B. 55 °C oder weniger). Dann gibt derselbe Heizkörper nur noch etwa die Hälfte oder ein Drittel ab – er muss entsprechend größer dimensioniert werden.' },
    { q: 'Ein großer oder mehrere Heizkörper?', a: 'Beides ist möglich. Der Rechner zeigt, wie viele Heizkörper der gewählten Größe nötig sind. Alternativ wählst du einen größeren Typ mit höherer Nennleistung, dann genügt oft ein Heizkörper.' },
  ],
  related: ['heizlast-rechner', 'raumvolumen-rechner', 'daemmung-heizkosten-ersparnis-rechner'],
  updated: '2026-06-19',
  examples: [
    {
      values: { flaeche: 20, richtwert: '100', nennleistung: 1500, korrektur: '1.0' },
      expect: [
        { label: 'Benötigte Heizleistung', value: 2000, tolerance: 0.01 },
        { label: 'Effektive Leistung je Heizkörper', value: 1500, tolerance: 0.01 },
        { label: 'Benötigte Heizkörper', value: 2, tolerance: 0.01 },
      ],
    },
    {
      values: { flaeche: 20, richtwert: '100', nennleistung: 1500, korrektur: '0.5' },
      expect: [
        { label: 'Effektive Leistung je Heizkörper', value: 750, tolerance: 0.01 },
        { label: 'Benötigte Heizkörper', value: 3, tolerance: 0.01 },
      ],
    },
  ],
};
