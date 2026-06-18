import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'auto-gesamtkosten-rechner',
  category: 'auto',
  title: 'Auto-Gesamtkosten-Rechner',
  shortTitle: 'Gesamtkosten',
  description:
    'Ermittle die echten Gesamtkosten deines Autos pro Jahr und pro Kilometer – aus Wertverlust, Sprit, Versicherung, Steuer und Wartung.',
  keywords: [
    'auto gesamtkosten berechnen',
    'autokosten pro jahr rechner',
    'echte autokosten',
    'kosten auto pro monat',
    'unterhaltskosten auto rechner',
    'autokosten pro km',
  ],
  formula:
    'Jahreskosten = Wertverlust + Sprit + Versicherung + Steuer + Wartung + Sonstiges; pro km = Jahreskosten / Jahresfahrleistung',
  intro:
    'Die wahren Kosten eines Autos liegen oft deutlich über den reinen Spritkosten. Dieser Rechner addiert die wichtigsten Posten – inklusive des oft unterschätzten Wertverlusts – zu Jahreskosten, Monatskosten und Kosten pro Kilometer.',
  inputs: [
    { type: 'number', id: 'wertverlust', label: 'Wertverlust pro Jahr', unit: 'EUR', default: 2500, min: 0, step: 50, help: 'Differenz Kaufpreis zu Restwert, geteilt durch Haltejahre' },
    { type: 'number', id: 'jahresKm', label: 'Jahresfahrleistung', unit: 'km', default: 15000, min: 0, step: 500 },
    { type: 'number', id: 'verbrauch', label: 'Verbrauch', unit: 'l/100 km', default: 7, min: 0, step: 0.1 },
    { type: 'number', id: 'spritpreis', label: 'Spritpreis', unit: 'EUR/l', default: 1.75, min: 0, step: 0.01 },
    { type: 'number', id: 'versicherung', label: 'Versicherung pro Jahr', unit: 'EUR', default: 600, min: 0, step: 10 },
    { type: 'number', id: 'steuer', label: 'KFZ-Steuer pro Jahr', unit: 'EUR', default: 150, min: 0, step: 5 },
    { type: 'number', id: 'wartung', label: 'Wartung & Reparatur pro Jahr', unit: 'EUR', default: 700, min: 0, step: 10 },
    { type: 'number', id: 'sonstiges', label: 'Sonstiges pro Jahr', unit: 'EUR', default: 200, min: 0, step: 10, help: 'TÜV, Parken, Reifen, Pflege' },
  ],
  compute: (v) => {
    const wertverlust = num(v.wertverlust);
    const jahresKm = num(v.jahresKm);
    const verbrauch = num(v.verbrauch);
    const spritpreis = num(v.spritpreis);
    const versicherung = num(v.versicherung);
    const steuer = num(v.steuer);
    const wartung = num(v.wartung);
    const sonstiges = num(v.sonstiges);
    const spritkosten = (jahresKm * verbrauch / 100) * spritpreis;
    const jahreskosten = wertverlust + spritkosten + versicherung + steuer + wartung + sonstiges;
    const monatskosten = jahreskosten / 12;
    const proKm = jahresKm > 0 ? jahreskosten / jahresKm : 0;
    return [
      { label: 'Gesamtkosten pro Jahr', value: jahreskosten, unit: 'EUR', digits: 2, primary: true },
      { label: 'Gesamtkosten pro Monat', value: monatskosten, unit: 'EUR', digits: 2 },
      { label: 'Kosten pro Kilometer', value: proKm, unit: 'EUR', digits: 3 },
      { label: 'davon Spritkosten/Jahr', value: spritkosten, unit: 'EUR', digits: 2 },
    ];
  },
  howto: [
    'Wertverlust pro Jahr abschätzen (Kaufpreis minus erwarteter Restwert, geteilt durch Haltejahre).',
    'Jahresfahrleistung, Verbrauch und Spritpreis eintragen.',
    'Versicherung, KFZ-Steuer, Wartung und sonstige Kosten ergänzen.',
    'Jahres-, Monats- und Kilometerkosten ablesen.',
  ],
  faq: [
    { q: 'Warum ist der Wertverlust so wichtig?', a: 'Der Wertverlust ist bei den meisten Autos der größte Kostenblock – oft größer als die Spritkosten. Neuwagen verlieren in den ersten Jahren besonders schnell an Wert.' },
    { q: 'Wie schätze ich den Wertverlust?', a: 'Ziehe vom Kaufpreis den erwarteten Restwert nach deiner geplanten Haltedauer ab und teile durch die Anzahl der Jahre.' },
    { q: 'Was bedeutet TCO?', a: 'Total Cost of Ownership – die Gesamtbetriebskosten eines Fahrzeugs über die Haltedauer. Genau diese Größe bildet der Rechner ab.' },
  ],
  related: ['wertverlust-rechner', 'kosten-pro-km-rechner', 'spritkosten-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { wertverlust: 2500, jahresKm: 15000, verbrauch: 7, spritpreis: 1.75, versicherung: 600, steuer: 150, wartung: 700, sonstiges: 200 },
      // Sprit = 150*7*1.75 = 1837.5 ; Summe = 2500+1837.5+600+150+700+200 = 5987.5
      expect: [{ label: 'Gesamtkosten pro Jahr', value: 5987.5, tolerance: 0.5 }],
    },
    {
      values: { wertverlust: 2000, jahresKm: 12000, verbrauch: 6, spritpreis: 1.8, versicherung: 500, steuer: 120, wartung: 500, sonstiges: 180 },
      // Sprit = 120*6*1.8 = 1296 ; Summe = 2000+1296+500+120+500+180 = 4596 ; proKm = 4596/12000 = 0.383
      expect: [{ label: 'Kosten pro Kilometer', value: 0.383, tolerance: 0.005 }],
    },
  ],
};
