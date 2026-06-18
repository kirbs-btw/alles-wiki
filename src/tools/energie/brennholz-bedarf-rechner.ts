import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'brennholz-bedarf-rechner',
  category: 'energie',
  title: 'Brennholz-Bedarf-Rechner (Ster)',
  shortTitle: 'Brennholz',
  description:
    'Berechne deinen Brennholzbedarf in Ster und die Holzkosten aus dem jährlichen Wärmebedarf, der Holzart und dem Wirkungsgrad des Ofens.',
  keywords: [
    'brennholz bedarf rechner',
    'wie viel ster holz brauche ich',
    'brennholz verbrauch berechnen',
    'kaminholz bedarf rechner',
    'ster holz energiegehalt',
  ],
  intro:
    'Der Energiegehalt von trockenem Brennholz hängt von der Holzart ab. Hartholz wie Buche liefert rund 1900-2100 kWh pro Raummeter (Ster), Weichholz weniger. Dieser Rechner schätzt den Brennholzbedarf in Ster und die Kosten aus dem jährlichen Wärmebedarf.',
  formula: 'Ster = Wärmebedarf ÷ (kWh/Ster × Wirkungsgrad); Kosten = Ster × Preis/Ster',
  inputs: [
    { type: 'number', id: 'waermebedarf', label: 'Jährlicher Wärmebedarf', unit: 'kWh', default: 15000, min: 0, step: 500 },
    {
      type: 'select',
      id: 'holzart',
      label: 'Holzart (lufttrocken)',
      default: '2000',
      options: [
        { value: '2100', label: 'Buche / Eiche (~2100 kWh/Ster)' },
        { value: '2000', label: 'Esche / Ahorn (~2000 kWh/Ster)' },
        { value: '1500', label: 'Birke / Lärche (~1500 kWh/Ster)' },
        { value: '1300', label: 'Fichte / Kiefer (~1300 kWh/Ster)' },
      ],
      help: 'kWh pro Raummeter (Ster) bei rund 15-20 % Restfeuchte.',
    },
    { type: 'number', id: 'wirkungsgrad', label: 'Wirkungsgrad des Ofens', unit: '%', default: 80, min: 1, max: 100, step: 1, help: 'Kaminofen ~75-85 %, offener Kamin deutlich weniger.' },
    { type: 'number', id: 'preis', label: 'Preis pro Ster', unit: '€/Ster', default: 90, min: 0, step: 5 },
  ],
  compute: (v) => {
    const waerme = num(v.waermebedarf);
    const kwhProSter = num(v.holzart);
    const wirkungsgrad = num(v.wirkungsgrad) / 100;
    const preis = num(v.preis);
    const nenner = kwhProSter * wirkungsgrad;
    const ster = nenner > 0 ? waerme / nenner : 0;
    const kosten = ster * preis;
    return [
      { label: 'Brennholzbedarf', value: ster, unit: 'Ster', digits: 1, primary: true },
      { label: 'Holzkosten pro Jahr', value: kosten, unit: '€', digits: 2 },
      { label: 'Nutzbare Energie pro Ster', value: nenner, unit: 'kWh', digits: 0 },
    ];
  },
  howto: [
    'Jährlichen Wärmebedarf in kWh eintragen.',
    'Holzart wählen (bestimmt den Energiegehalt pro Ster).',
    'Wirkungsgrad des Ofens und Preis pro Ster angeben.',
    'Brennholzbedarf in Ster und Kosten ablesen.',
  ],
  faq: [
    { q: 'Was ist ein Ster?', a: 'Ein Ster (Raummeter) entspricht einem Kubikmeter geschichtetem Holz inklusive Luftzwischenräumen. Der Schüttraummeter (lose) ist kleiner, etwa 0,7 Ster.' },
    { q: 'Warum ist die Restfeuchte wichtig?', a: 'Frisches Holz hat über 50 % Feuchte und liefert weniger Wärme, weil viel Energie zum Verdampfen des Wassers verloren geht. Brennholz sollte 1-2 Jahre auf unter 20 % trocknen.' },
  ],
  related: ['pellets-kosten-rechner', 'heizoel-kosten-rechner', 'heizkosten-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { waermebedarf: 15000, holzart: '2000', wirkungsgrad: 80, preis: 90 },
      expect: [
        { label: 'Nutzbare Energie pro Ster', value: 1600, tolerance: 1 },
        { label: 'Brennholzbedarf', value: 9.375, tolerance: 0.05 },
        { label: 'Holzkosten pro Jahr', value: 843.75, tolerance: 0.5 },
      ],
    },
  ],
};
