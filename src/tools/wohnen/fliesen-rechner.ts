import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'fliesen-rechner',
  category: 'wohnen',
  title: 'Fliesen-Rechner',
  shortTitle: 'Fliesenbedarf',
  description:
    'Berechne, wie viele Fliesen und wie viele Pakete du brauchst – aus Fläche, Fliesenmaß und Verschnitt.',
  keywords: [
    'fliesen rechner',
    'wie viele fliesen pro qm',
    'fliesenbedarf berechnen',
    'fliesen menge rechner',
    'fliesen pakete berechnen',
    'kacheln bedarf',
  ],
  formula:
    'Fliesen je m² = 1 / (Länge × Breite in m); Stück = ceil(Fläche × (1+Verschnitt%) × Fliesen je m²)',
  inputs: [
    { type: 'number', id: 'flaeche', label: 'Zu verfliesende Fläche', unit: 'm²', default: 12, min: 0.5, step: 0.1 },
    { type: 'number', id: 'fliesenlaenge', label: 'Fliesenlänge', unit: 'cm', default: 30, min: 2, step: 1 },
    { type: 'number', id: 'fliesenbreite', label: 'Fliesenbreite', unit: 'cm', default: 30, min: 2, step: 1 },
    { type: 'number', id: 'verschnitt', label: 'Verschnitt-Zuschlag', unit: '%', default: 10, min: 0, max: 30, step: 1, help: 'Empfohlen 8–12 %, bei diagonaler Verlegung mehr.' },
    { type: 'number', id: 'proPaket', label: 'Fliesen je Paket', unit: 'Stück', default: 11, min: 1, step: 1, help: 'Steht auf der Verpackung. 1 = einzeln rechnen.' },
  ],
  compute: (v) => {
    const flaeche = num(v.flaeche);
    const lcm = num(v.fliesenlaenge);
    const bcm = num(v.fliesenbreite);
    const verschnitt = num(v.verschnitt);
    const proPaket = num(v.proPaket);
    const flaecheProFliese = (lcm / 100) * (bcm / 100);
    const fliesenProQm = flaecheProFliese > 0 ? 1 / flaecheProFliese : 0;
    const bedarfFlaeche = flaeche * (1 + verschnitt / 100);
    const stueck = Math.ceil(bedarfFlaeche * fliesenProQm);
    const pakete = proPaket > 0 ? Math.ceil(stueck / proPaket) : 0;
    return [
      { label: 'Benötigte Fliesen', value: stueck, unit: 'Stück', digits: 0, primary: true },
      { label: 'Fliesen je m²', value: fliesenProQm, unit: 'Stück/m²', digits: 2 },
      { label: 'Benötigte Pakete', value: pakete, unit: 'Pakete', digits: 0 },
    ];
  },
  intro:
    'Der Fliesen-Rechner bestimmt aus Fläche und Fliesenformat die benötigte Stückzahl und Paketmenge. Ein Verschnitt-Zuschlag deckt Zuschnitte an Rändern, Brüche und Reserven für spätere Reparaturen ab.',
  howto: [
    'Fläche eingeben, die verfliest werden soll.',
    'Fliesenmaß in Zentimetern eintragen (z. B. 30 × 30).',
    'Verschnitt wählen – Standard etwa 10 %.',
    'Fliesen je Paket ergänzen und benötigte Stück- bzw. Paketzahl ablesen.',
  ],
  faq: [
    { q: 'Wie viele Fliesen pro Quadratmeter?', a: 'Bei 30 × 30 cm Fliesen sind es rund 11,1 Stück pro Quadratmeter. Je kleiner das Format, desto mehr Fliesen je m².' },
    { q: 'Wie viel Verschnitt ist sinnvoll?', a: 'Üblich sind 8–12 %. Bei diagonaler Verlegung, vielen Ecken oder großen Formaten plant man eher 15 % ein.' },
    { q: 'Warum Reserve aufheben?', a: 'Heben Sie einige Fliesen aus derselben Charge auf. Bei späterem Austausch beschädigter Fliesen passt so der Farbton sicher.' },
  ],
  related: ['laminat-rechner', 'estrich-rechner', 'wohnflaeche-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { flaeche: 12, fliesenlaenge: 30, fliesenbreite: 30, verschnitt: 10, proPaket: 11 },
      expect: [
        { label: 'Benötigte Fliesen', value: 147, tolerance: 0.01 },
        { label: 'Fliesen je m²', value: 11.111, tolerance: 0.01 },
        { label: 'Benötigte Pakete', value: 14, tolerance: 0.01 },
      ],
    },
  ],
};
