import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'elektro-vs-verbrenner-rechner',
  category: 'auto',
  title: 'Elektro vs. Verbrenner Kostenvergleich',
  shortTitle: 'E-Auto vs. Verbrenner',
  description:
    'Vergleiche die Energiekosten von Elektroauto und Verbrenner pro 100 km und pro Jahr – aus Verbrauch, Strom- und Spritpreis.',
  keywords: [
    'elektro vs verbrenner kosten',
    'e auto kostenvergleich rechner',
    'elektroauto verbrenner vergleich',
    'stromkosten vs benzin',
    'e auto sparen rechner',
    'kosten pro 100 km vergleich',
  ],
  formula:
    'E-Auto: kWh/100 km × Strompreis; Verbrenner: l/100 km × Spritpreis; Vergleich je 100 km und Jahresfahrleistung',
  intro:
    'Elektroautos haben meist niedrigere Energiekosten pro Kilometer, aber höhere Anschaffungskosten. Dieser Rechner vergleicht ausschließlich die laufenden Energiekosten (Strom gegen Kraftstoff) je 100 km und pro Jahr.',
  inputs: [
    { type: 'number', id: 'kwhVerbrauch', label: 'E-Auto Verbrauch', unit: 'kWh/100 km', default: 18, min: 0, step: 0.1 },
    { type: 'number', id: 'strompreis', label: 'Strompreis', unit: 'EUR/kWh', default: 0.35, min: 0, step: 0.01 },
    { type: 'number', id: 'literVerbrauch', label: 'Verbrenner Verbrauch', unit: 'l/100 km', default: 7, min: 0, step: 0.1 },
    { type: 'number', id: 'spritpreis', label: 'Spritpreis', unit: 'EUR/l', default: 1.75, min: 0, step: 0.01 },
    { type: 'number', id: 'jahresKm', label: 'Jahresfahrleistung', unit: 'km', default: 15000, min: 0, step: 500 },
  ],
  compute: (v) => {
    const kwhVerbrauch = num(v.kwhVerbrauch);
    const strompreis = num(v.strompreis);
    const literVerbrauch = num(v.literVerbrauch);
    const spritpreis = num(v.spritpreis);
    const jahresKm = num(v.jahresKm);
    const eProm100 = (kwhVerbrauch / 100) * strompreis * 100; // kWh-Kosten je 100 km
    const vProm100 = (literVerbrauch / 100) * spritpreis * 100;
    const eJahr = (jahresKm / 100) * (kwhVerbrauch * strompreis);
    const vJahr = (jahresKm / 100) * (literVerbrauch * spritpreis);
    const ersparnisJahr = vJahr - eJahr;
    return [
      { label: 'Ersparnis E-Auto pro Jahr', value: ersparnisJahr, unit: 'EUR', digits: 2, primary: true },
      { label: 'E-Auto Energiekosten /100 km', value: eProm100, unit: 'EUR', digits: 2 },
      { label: 'Verbrenner Spritkosten /100 km', value: vProm100, unit: 'EUR', digits: 2 },
      { label: 'E-Auto Kosten pro Jahr', value: eJahr, unit: 'EUR', digits: 2 },
      { label: 'Verbrenner Kosten pro Jahr', value: vJahr, unit: 'EUR', digits: 2 },
    ];
  },
  howto: [
    'Stromverbrauch des E-Autos in kWh/100 km und Strompreis eintragen.',
    'Kraftstoffverbrauch und Spritpreis des Verbrenners erfassen.',
    'Jährliche Fahrleistung angeben.',
    'Energiekosten je 100 km und Jahresersparnis vergleichen.',
  ],
  faq: [
    { q: 'Sind Anschaffung und Wartung enthalten?', a: 'Nein. Dieser Rechner vergleicht nur die laufenden Energiekosten. E-Autos sparen oft zusätzlich bei Wartung und KFZ-Steuer, kosten aber in der Anschaffung mehr.' },
    { q: 'Welcher Strompreis ist realistisch?', a: 'Haushaltsstrom liegt 2026 oft um 0,30 bis 0,40 EUR/kWh. Wer mit eigener PV-Anlage oder günstigem Nachtstrom lädt, fährt deutlich billiger; öffentliches Schnellladen ist teurer.' },
    { q: 'Lohnt sich ein E-Auto immer?', a: 'Bei hoher Fahrleistung und günstigem Ladestrom rechnet es sich am schnellsten. Bei wenig Kilometern oder teurem Ladestrom kann der Verbrenner laufend günstiger sein.' },
  ],
  related: ['e-auto-ladekosten-rechner', 'spritkosten-rechner', 'auto-gesamtkosten-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { kwhVerbrauch: 18, strompreis: 0.35, literVerbrauch: 7, spritpreis: 1.75, jahresKm: 15000 },
      // E /100km = 18*0.35 = 6.30 ; V /100km = 7*1.75 = 12.25
      // eJahr = 150*6.30 = 945 ; vJahr = 150*12.25 = 1837.5 ; Ersparnis = 892.5
      expect: [{ label: 'Ersparnis E-Auto pro Jahr', value: 892.5, tolerance: 0.1 }],
    },
    {
      values: { kwhVerbrauch: 20, strompreis: 0.30, literVerbrauch: 6, spritpreis: 1.80, jahresKm: 20000 },
      // E /100km = 20*0.30 = 6.00
      expect: [{ label: 'E-Auto Energiekosten /100 km', value: 6.0, tolerance: 0.05 }],
    },
  ],
};
