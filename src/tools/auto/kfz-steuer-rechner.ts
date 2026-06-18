import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'kfz-steuer-rechner',
  category: 'auto',
  title: 'KFZ-Steuer-Rechner',
  shortTitle: 'KFZ-Steuer',
  description:
    'Schätze deine jährliche KFZ-Steuer aus Hubraum und CO2-Ausstoß für Benziner und Diesel – nach dem aktuellen Berechnungsmodell.',
  keywords: [
    'kfz steuer berechnen',
    'kfz steuer rechner',
    'autosteuer berechnen',
    'kfz steuer hubraum co2',
    'kraftfahrzeugsteuer rechner',
    'kfz steuer pkw',
  ],
  formula:
    'Steuer = Hubraumanteil + CO2-Anteil; Hubraum: Benzin 2,00 EUR, Diesel 9,50 EUR je angefangene 100 cm3; CO2: gestaffelt über 95 g/km',
  intro:
    'Die KFZ-Steuer für Pkw (Erstzulassung) setzt sich aus einem Hubraumanteil und einem CO2-Anteil zusammen. Dieser Rechner bildet das gestaffelte CO2-Modell (Freibetrag 95 g/km) als Orientierung ab. Die verbindliche Festsetzung erfolgt durch das Hauptzollamt.',
  inputs: [
    {
      type: 'select',
      id: 'kraftstoff',
      label: 'Kraftstoffart',
      default: 'benzin',
      options: [
        { value: 'benzin', label: 'Benzin' },
        { value: 'diesel', label: 'Diesel' },
      ],
    },
    { type: 'number', id: 'hubraum', label: 'Hubraum', unit: 'cm3', default: 1600, min: 0, step: 1 },
    { type: 'number', id: 'co2', label: 'CO2-Ausstoß', unit: 'g/km', default: 130, min: 0, step: 1, help: 'Wert aus dem Fahrzeugschein (Feld V.7)' },
  ],
  compute: (v) => {
    const hubraum = num(v.hubraum);
    const co2 = num(v.co2);
    const isDiesel = String(v.kraftstoff) === 'diesel';
    // Hubraumsteuer: je angefangene 100 cm3
    const einheiten = Math.ceil(hubraum / 100);
    const satz = isDiesel ? 9.5 : 2.0;
    const hubraumSteuer = einheiten * satz;
    // CO2-Steuer: gestaffeltes Modell ab Erstzulassung 2021
    let co2Steuer = 0;
    const ueber = Math.max(0, co2 - 95);
    const stufen = [
      { bis: 115 - 95, satz: 2.0 },
      { bis: 135 - 95, satz: 2.2 },
      { bis: 155 - 95, satz: 2.5 },
      { bis: 175 - 95, satz: 2.9 },
      { bis: 195 - 95, satz: 3.4 },
      { bis: Infinity, satz: 4.0 },
    ];
    let rest = ueber;
    let prev = 0;
    for (const s of stufen) {
      if (rest <= 0) break;
      const spanne = s.bis - prev;
      const teil = Math.min(rest, spanne);
      co2Steuer += teil * s.satz;
      rest -= teil;
      prev = s.bis;
    }
    const gesamt = hubraumSteuer + co2Steuer;
    return [
      { label: 'KFZ-Steuer pro Jahr', value: gesamt, unit: 'EUR', digits: 2, primary: true },
      { label: 'Hubraumanteil', value: hubraumSteuer, unit: 'EUR', digits: 2 },
      { label: 'CO2-Anteil', value: co2Steuer, unit: 'EUR', digits: 2 },
      { label: 'Steuer pro Monat', value: gesamt / 12, unit: 'EUR', digits: 2 },
    ];
  },
  howto: [
    'Kraftstoffart wählen (Benzin oder Diesel).',
    'Hubraum in cm3 aus dem Fahrzeugschein eintragen.',
    'CO2-Ausstoß in g/km ergänzen (Feld V.7).',
    'Jahressteuer als Orientierung ablesen.',
  ],
  faq: [
    { q: 'Wie wird die KFZ-Steuer berechnet?', a: 'Für Pkw addieren sich ein Hubraumanteil (Benzin 2,00 EUR, Diesel 9,50 EUR je angefangene 100 cm3) und ein gestaffelter CO2-Anteil oberhalb von 95 g/km.' },
    { q: 'Warum zahlen Diesel mehr Steuer?', a: 'Der höhere Hubraumsatz beim Diesel gleicht den niedrigeren Energiesteuersatz an der Tankstelle teilweise aus.' },
    { q: 'Ist die Berechnung verbindlich?', a: 'Nein, dies ist eine Orientierung. Die genaue Festsetzung übernimmt das zuständige Hauptzollamt anhand der Fahrzeugdaten.' },
  ],
  related: ['spritkosten-rechner', 'auto-gesamtkosten-rechner', 'kosten-pro-km-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { kraftstoff: 'benzin', hubraum: 1600, co2: 130 },
      // Hubraum: ceil(1600/100)=16 * 2 = 32. CO2 ueber=35: 20*2=40, 15*2.2=33 => 73. Gesamt 105
      expect: [{ label: 'KFZ-Steuer pro Jahr', value: 105, tolerance: 0.5 }],
    },
    {
      values: { kraftstoff: 'diesel', hubraum: 2000, co2: 150 },
      // Hubraum: ceil(2000/100)=20 * 9.5 = 190. CO2 ueber=55: 20*2=40,20*2.2=44,15*2.5=37.5 =>121.5. Gesamt 311.5
      expect: [{ label: 'KFZ-Steuer pro Jahr', value: 311.5, tolerance: 0.5 }],
    },
  ],
};
