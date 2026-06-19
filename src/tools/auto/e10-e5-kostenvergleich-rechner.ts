import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'e10-e5-kostenvergleich-rechner',
  category: 'auto',
  title: 'E10 vs. E5 Kostenvergleich',
  shortTitle: 'E10 vs. E5',
  description:
    'Vergleiche die Spritkosten von E10 und E5 (Super 95/98) – inklusive des leicht höheren Mehrverbrauchs von E10 pro 100 km.',
  keywords: [
    'e10 e5 vergleich',
    'e10 vs super kosten',
    'lohnt sich e10',
    'e10 mehrverbrauch rechner',
    'e10 sparen rechner',
    'benzin kostenvergleich',
  ],
  formula:
    'Kosten je 100 km = (Verbrauch × (1 + Mehrverbrauch%/100)) × Preis; Vergleich E10 gegen E5',
  intro:
    'E10 ist an der Tankstelle meist einige Cent günstiger als E5 (Super 95). Allerdings hat E10 einen geringfügig niedrigeren Energiegehalt, was zu einem leicht höheren Verbrauch führen kann (oft 0–2 %). Dieser Rechner stellt die tatsächlichen Kosten pro 100 km gegenüber. Ob dein Fahrzeug E10 verträgt, steht im Tankdeckel oder Handbuch.',
  inputs: [
    { type: 'number', id: 'verbrauch', label: 'Basisverbrauch (E5)', unit: 'l/100 km', default: 7, min: 0.1, step: 0.1 },
    { type: 'number', id: 'preisE10', label: 'Preis E10', unit: 'EUR/l', default: 1.69, min: 0, step: 0.01 },
    { type: 'number', id: 'preisE5', label: 'Preis E5 (Super 95)', unit: 'EUR/l', default: 1.75, min: 0, step: 0.01 },
    { type: 'number', id: 'mehrverbrauch', label: 'Mehrverbrauch E10', unit: '%', default: 1.5, min: 0, max: 10, step: 0.5, help: 'Realistisch 0 bis 2 %' },
    { type: 'number', id: 'jahreskm', label: 'Fahrleistung pro Jahr', unit: 'km', default: 15000, min: 0, step: 500 },
  ],
  compute: (v) => {
    const verbrauch = num(v.verbrauch);
    const preisE10 = num(v.preisE10);
    const preisE5 = num(v.preisE5);
    const mehr = num(v.mehrverbrauch);
    const jahreskm = num(v.jahreskm);
    const verbrauchE10 = verbrauch * (1 + mehr / 100);
    const kostenE10_100 = verbrauchE10 * preisE10;
    const kostenE5_100 = verbrauch * preisE5;
    const differenz100 = kostenE5_100 - kostenE10_100; // positiv = E10 günstiger
    const ersparnisJahr = (differenz100 / 100) * jahreskm;
    const guenstiger = differenz100 > 0 ? 'E10 günstiger' : differenz100 < 0 ? 'E5 günstiger' : 'gleich teuer';
    return [
      { label: 'Vorteil E10 je 100 km', value: differenz100, unit: 'EUR', digits: 3, primary: true },
      { label: 'Kosten E10 je 100 km', value: kostenE10_100, unit: 'EUR', digits: 2 },
      { label: 'Kosten E5 je 100 km', value: kostenE5_100, unit: 'EUR', digits: 2 },
      { label: 'Ersparnis E10 pro Jahr', value: ersparnisJahr, unit: 'EUR', digits: 2 },
      { label: 'Günstiger ist', value: guenstiger, unit: '' },
    ];
  },
  howto: [
    'Durchschnittsverbrauch deines Fahrzeugs mit E5 eintragen.',
    'Aktuelle Preise für E10 und E5 erfassen.',
    'Geschätzten Mehrverbrauch von E10 angeben (meist 0–2 %).',
    'Jährliche Fahrleistung ergänzen und Ersparnis ablesen.',
  ],
  faq: [
    { q: 'Verbraucht E10 wirklich mehr?', a: 'E10 hat einen etwas geringeren Energiegehalt als E5. In der Praxis liegt der Mehrverbrauch meist zwischen 0 und 2 Prozent – oft fällt der Unterschied geringer aus als der Preisvorteil.' },
    { q: 'Verträgt mein Auto E10?', a: 'Die allermeisten Benziner ab Baujahr 2011 sind freigegeben. Maßgeblich ist die Angabe im Handbuch oder am Tankdeckel. Bei Unsicherheit gibt eine Verträglichkeitsliste Auskunft.' },
    { q: 'Lohnt sich E10 immer?', a: 'In der Regel ja, solange der Preisvorteil größer ist als der Mehrverbrauch. Der Rechner zeigt, ab welchem Punkt sich E10 nicht mehr rechnet.' },
  ],
  related: ['spritkosten-rechner', 'durchschnittsverbrauch-rechner', 'pendler-spritkosten-rechner'],
  updated: '2026-06-19',
  examples: [
    {
      values: { verbrauch: 7, preisE10: 1.69, preisE5: 1.75, mehrverbrauch: 1.5, jahreskm: 15000 },
      // verbrauchE10 = 7*1.015 = 7.105 ; kostenE10 = 7.105*1.69 = 12.00745 ; kostenE5 = 7*1.75 = 12.25 ; diff = 0.24255
      expect: [{ label: 'Vorteil E10 je 100 km', value: 0.24255, tolerance: 0.001 }],
    },
    {
      values: { verbrauch: 8, preisE10: 1.70, preisE5: 1.74, mehrverbrauch: 2, jahreskm: 20000 },
      // verbrauchE10 = 8*1.02 = 8.16 ; kostenE10 = 8.16*1.70 = 13.872 ; kostenE5 = 8*1.74 = 13.92 ; diff = 0.048 ; jahr = 0.048/100*20000 = 9.6
      expect: [{ label: 'Ersparnis E10 pro Jahr', value: 9.6, tolerance: 0.05 }],
    },
  ],
};
