import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'co2-abgabe-heizung-rechner',
  category: 'energie',
  title: 'CO2-Abgabe-Heizung-Rechner',
  shortTitle: 'CO2-Abgabe',
  description:
    'Schätze die CO2-Abgabe auf deine Heizkosten aus dem Brennstoffverbrauch, dem Emissionsfaktor und dem CO2-Preis pro Tonne - Orientierung für Gas und Heizöl.',
  keywords: [
    'co2 abgabe heizung rechner',
    'co2 preis heizung berechnen',
    'co2 steuer gas heizöl',
    'co2 kosten heizung',
    'co2 abgabe berechnen',
  ],
  intro:
    'Auf fossile Brennstoffe wie Gas und Heizöl wird ein CO2-Preis erhoben. Dieser Rechner schätzt die jährliche CO2-Abgabe als Orientierung aus deinem Brennstoffverbrauch, dem Emissionsfaktor und dem CO2-Preis pro Tonne. Den aktuellen CO2-Preis bitte selbst eintragen, da er gesetzlich festgelegt wird und sich jährlich ändert.',
  formula: 'CO2 (t) = Verbrauch × Emissionsfaktor ÷ 1000; Abgabe = CO2 × CO2-Preis',
  inputs: [
    { type: 'number', id: 'verbrauch', label: 'Brennstoffverbrauch', unit: 'kWh', default: 20000, min: 0, step: 500, help: 'Jahresverbrauch in kWh (Gasrechnung) oder Liter × Heizwert.' },
    {
      type: 'select',
      id: 'faktor',
      label: 'Brennstoff (Emissionsfaktor)',
      default: '0.201',
      options: [
        { value: '0.201', label: 'Erdgas (~0,201 kg CO2/kWh)' },
        { value: '0.266', label: 'Heizöl (~0,266 kg CO2/kWh)' },
        { value: '0.247', label: 'Flüssiggas LPG (~0,247 kg CO2/kWh)' },
      ],
      help: 'CO2-Ausstoß pro kWh Brennstoff.',
    },
    { type: 'number', id: 'co2preis', label: 'CO2-Preis', unit: '€/t', default: 55, min: 0, step: 5, help: 'Gesetzlich festgelegter Preis pro Tonne CO2 - aktuellen Wert eintragen.' },
  ],
  compute: (v) => {
    const verbrauch = num(v.verbrauch);
    const faktor = num(v.faktor);
    const co2preis = num(v.co2preis);
    const co2Kg = verbrauch * faktor;
    const co2Tonnen = co2Kg / 1000;
    const abgabe = co2Tonnen * co2preis;
    return [
      { label: 'CO2-Abgabe pro Jahr', value: abgabe, unit: '€', digits: 2, primary: true },
      { label: 'CO2-Ausstoß', value: co2Tonnen, unit: 't', digits: 2 },
      { label: 'Abgabe pro Monat', value: abgabe / 12, unit: '€', digits: 2 },
    ];
  },
  howto: [
    'Brennstoffverbrauch in kWh eintragen (Heizöl: Liter × ca. 10 kWh/l).',
    'Brennstoff wählen, um den Emissionsfaktor zu setzen.',
    'Aktuellen CO2-Preis pro Tonne eingeben.',
    'Geschätzte CO2-Abgabe ablesen.',
  ],
  faq: [
    { q: 'Wofür wird die CO2-Abgabe fällig?', a: 'Sie wird über den nationalen Emissionshandel auf fossile Brennstoffe wie Erdgas, Heizöl und Sprit erhoben und ist Teil des Brennstoffpreises. Dieser Rechner liefert eine Orientierung.' },
    { q: 'Wie kann ich die CO2-Abgabe senken?', a: 'Weniger Brennstoff verbrauchen durch bessere Dämmung, niedrigere Vorlauftemperaturen und effiziente Technik. Der Wechsel auf erneuerbare Wärme wie eine Wärmepumpe vermeidet die Abgabe weitgehend.' },
  ],
  related: ['co2-ausstoss-energie-rechner', 'gaskosten-rechner', 'heizoel-kosten-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { verbrauch: 20000, faktor: '0.201', co2preis: 55 },
      expect: [
        { label: 'CO2-Ausstoß', value: 4.02, tolerance: 0.01 },
        { label: 'CO2-Abgabe pro Jahr', value: 221.1, tolerance: 0.05 },
      ],
    },
  ],
};
