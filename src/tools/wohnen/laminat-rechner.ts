import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'laminat-rechner',
  category: 'wohnen',
  title: 'Laminat- & Parkett-Rechner',
  shortTitle: 'Laminatbedarf',
  description:
    'Berechne, wie viele Pakete Laminat oder Parkett du brauchst – aus Raumfläche, Verschnitt und Quadratmeter je Paket.',
  keywords: [
    'laminat rechner',
    'wie viele pakete laminat',
    'laminat berechnen',
    'parkett bedarf rechner',
    'laminat verschnitt',
    'bodenbelag menge berechnen',
  ],
  formula: 'Bedarf = Fläche × (1 + Verschnitt%); Pakete = ceil(Bedarf / m² je Paket)',
  inputs: [
    { type: 'number', id: 'flaeche', label: 'Raumfläche', unit: 'm²', default: 25, min: 1, step: 0.5 },
    { type: 'number', id: 'verschnitt', label: 'Verschnitt-Zuschlag', unit: '%', default: 7, min: 0, max: 30, step: 1, help: 'Gerade Verlegung ca. 5 %, diagonal ca. 10–15 %.' },
    { type: 'number', id: 'proPaket', label: 'Fläche je Paket', unit: 'm²', default: 2.5, min: 0.5, step: 0.05, help: 'Steht auf der Verpackung, oft 2–2,5 m².' },
  ],
  compute: (v) => {
    const flaeche = num(v.flaeche);
    const verschnitt = num(v.verschnitt);
    const proPaket = num(v.proPaket);
    const bedarf = flaeche * (1 + verschnitt / 100);
    const pakete = proPaket > 0 ? Math.ceil(bedarf / proPaket) : 0;
    const gekauft = pakete * proPaket;
    return [
      { label: 'Benötigte Pakete', value: pakete, unit: 'Pakete', digits: 0, primary: true },
      { label: 'Materialbedarf inkl. Verschnitt', value: bedarf, unit: 'm²', digits: 2 },
      { label: 'Gekaufte Fläche', value: gekauft, unit: 'm²', digits: 2 },
    ];
  },
  intro:
    'Der Laminat- und Parkett-Rechner ermittelt die Zahl der Pakete für deinen Raum. Berücksichtigt wird ein Verschnitt-Zuschlag, da beim Zuschneiden an Wänden und Ecken Reste anfallen.',
  howto: [
    'Raumfläche eingeben (Länge × Breite).',
    'Verschnitt wählen: gerade Verlegung ca. 5 %, diagonal mehr.',
    'Fläche je Paket von der Verpackung übernehmen.',
    'Benötigte Paketzahl ablesen – Reste eignen sich als Ersatz bei späteren Schäden.',
  ],
  faq: [
    { q: 'Wie viel Verschnitt soll ich einplanen?', a: 'Bei gerader Verlegung reichen meist 5 %, bei diagonaler Verlegung oder verwinkelten Räumen sind 10–15 % realistisch.' },
    { q: 'Kann ich Pakete zurückgeben?', a: 'Viele Baumärkte nehmen ungeöffnete Originalpakete zurück. Es lohnt sich daher, eher etwas mehr zu kaufen und Restpakete zurückzugeben.' },
    { q: 'Was ist mit der Dehnungsfuge?', a: 'Schwimmend verlegtes Laminat braucht ringsum eine Dehnungsfuge von etwa 10–15 mm. Diese kleine Fläche ist im Verschnitt-Zuschlag mit abgedeckt.' },
  ],
  related: ['fliesen-rechner', 'wohnflaeche-rechner', 'umzugskosten-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { flaeche: 25, verschnitt: 7, proPaket: 2.5 },
      expect: [
        { label: 'Benötigte Pakete', value: 11, tolerance: 0.01 },
        { label: 'Materialbedarf inkl. Verschnitt', value: 26.75, tolerance: 0.01 },
        { label: 'Gekaufte Fläche', value: 27.5, tolerance: 0.01 },
      ],
    },
  ],
};
