import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'pv-eigenverbrauch-ersparnis-rechner',
  category: 'energie',
  title: 'PV-Eigenverbrauch-Ersparnis-Rechner',
  shortTitle: 'Eigenverbrauch',
  description:
    'Berechne, wie viel du durch den Eigenverbrauch deines Solarstroms sparst - aus selbst genutzter Strommenge und Strompreis statt teurem Netzbezug.',
  keywords: [
    'pv eigenverbrauch ersparnis',
    'eigenverbrauch solar berechnen',
    'solarstrom selbst nutzen sparen',
    'pv eigenverbrauch rechner',
    'photovoltaik ersparnis rechner',
  ],
  intro:
    'Jede selbst genutzte Kilowattstunde Solarstrom ersetzt teuren Netzstrom und ist damit meist wertvoller als die Einspeisevergütung. Dieser Rechner zeigt die jährliche Ersparnis aus dem eigenverbrauchten Solarstrom und vergleicht sie mit der Einspeisevergütung für dieselbe Menge.',
  formula: 'Ersparnis = Erzeugung × Eigenverbrauchsanteil × Strompreis',
  inputs: [
    { type: 'number', id: 'erzeugung', label: 'Jahreserzeugung', unit: 'kWh', default: 8000, min: 0, step: 100 },
    { type: 'number', id: 'eigenverbrauch', label: 'Eigenverbrauchsanteil', unit: '%', default: 35, min: 0, max: 100, step: 5, help: 'Ohne Speicher oft 25-35 %, mit Speicher 50-70 %.' },
    { type: 'number', id: 'strompreis', label: 'Strompreis (Netzbezug)', unit: 'ct/kWh', default: 35, min: 0, step: 1 },
    { type: 'number', id: 'verguetung', label: 'Einspeisevergütung', unit: 'ct/kWh', default: 7.94, min: 0, step: 0.01, help: 'Zum Vergleich: Was dieselbe Menge bei Einspeisung brächte.' },
  ],
  compute: (v) => {
    const erzeugung = num(v.erzeugung);
    const eigen = num(v.eigenverbrauch) / 100;
    const strompreis = num(v.strompreis) / 100;
    const verguetung = num(v.verguetung) / 100;
    const eigenKwh = erzeugung * eigen;
    const ersparnis = eigenKwh * strompreis;
    const alternativ = eigenKwh * verguetung;
    const vorteil = ersparnis - alternativ;
    return [
      { label: 'Ersparnis durch Eigenverbrauch', value: ersparnis, unit: '€', digits: 2, primary: true },
      { label: 'Eigenverbrauchte Menge', value: eigenKwh, unit: 'kWh', digits: 0 },
      { label: 'Vorteil ggü. Einspeisung', value: vorteil, unit: '€', digits: 2 },
    ];
  },
  howto: [
    'Jahreserzeugung der PV-Anlage eintragen.',
    'Eigenverbrauchsanteil angeben (mit Batteriespeicher höher).',
    'Strompreis und Einspeisevergütung eingeben.',
    'Ersparnis und Vorteil gegenüber reiner Einspeisung ablesen.',
  ],
  faq: [
    { q: 'Warum lohnt sich Eigenverbrauch?', a: 'Selbst genutzter Solarstrom spart den vollen Strompreis von oft 30-40 ct/kWh. Die Einspeisevergütung liegt deutlich darunter, daher ist jede selbst verbrauchte kWh wertvoller.' },
    { q: 'Wie erhöhe ich den Eigenverbrauch?', a: 'Verbraucher wie Waschmaschine, Spülmaschine oder Wärmepumpe in sonnenreiche Stunden legen und einen Batteriespeicher nutzen. So steigt der Eigenverbrauchsanteil deutlich.' },
  ],
  related: ['pv-einspeiseverguetung-rechner', 'pv-ertrag-rechner', 'balkonkraftwerk-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { erzeugung: 8000, eigenverbrauch: 35, strompreis: 35, verguetung: 7.94 },
      expect: [
        { label: 'Eigenverbrauchte Menge', value: 2800, tolerance: 0.5 },
        { label: 'Ersparnis durch Eigenverbrauch', value: 980, tolerance: 0.05 },
        { label: 'Vorteil ggü. Einspeisung', value: 757.68, tolerance: 0.05 },
      ],
    },
  ],
};
