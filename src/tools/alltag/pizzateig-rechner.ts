import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'pizzateig-rechner',
  category: 'alltag',
  title: 'Pizzateig-Rechner (Mehl, Wasser, Hefe, Salz)',
  shortTitle: 'Pizzateig',
  description:
    'Berechne die Zutaten für deinen Pizzateig nach der Anzahl der Pizzen und dem gewünschten Teiggewicht – mit Hydration, Hefe- und Salzanteil in Bäckerprozent.',
  keywords: [
    'pizzateig rechner',
    'pizzateig zutaten berechnen',
    'pizza mehl wasser hefe',
    'pizzateig hydration',
    'pizza teigkugel gewicht',
    'baeckerprozent pizza',
  ],
  formula:
    'Mehl = (Pizzen × Kugelgewicht) / (1 + Hydration% + Hefe% + Salz%); Wasser = Mehl × Hydration%; Hefe = Mehl × Hefe%; Salz = Mehl × Salz%',
  inputs: [
    { type: 'number', id: 'pizzen', label: 'Anzahl Pizzen', default: 4, min: 1, step: 1 },
    { type: 'number', id: 'kugel', label: 'Gewicht pro Teigkugel', unit: 'g', default: 250, min: 100, max: 400, step: 10, help: 'Neapolitanisch ca. 250–280 g.' },
    { type: 'number', id: 'hydration', label: 'Hydration (Wasseranteil)', unit: '%', default: 60, min: 50, max: 80, step: 1, help: 'Anteil Wasser bezogen auf Mehl.' },
    { type: 'number', id: 'hefe', label: 'Frischhefe-Anteil', unit: '%', default: 1, min: 0, max: 5, step: 0.1 },
    { type: 'number', id: 'salz', label: 'Salz-Anteil', unit: '%', default: 2.5, min: 0, max: 5, step: 0.1 },
  ],
  compute: (v) => {
    const pizzen = Math.max(1, Math.round(num(v.pizzen, 1)));
    const kugel = num(v.kugel, 250);
    const hyd = num(v.hydration, 60) / 100;
    const hefe = num(v.hefe, 1) / 100;
    const salz = num(v.salz, 2.5) / 100;
    const gesamtTeig = pizzen * kugel;
    const faktor = 1 + hyd + hefe + salz;
    const mehl = faktor > 0 ? gesamtTeig / faktor : 0;
    const wasser = mehl * hyd;
    const hefeG = mehl * hefe;
    const salzG = mehl * salz;
    return [
      { label: 'Mehl', value: mehl, unit: 'g', digits: 0, primary: true },
      { label: 'Wasser', value: wasser, unit: 'g', digits: 0 },
      { label: 'Frischhefe', value: hefeG, unit: 'g', digits: 1 },
      { label: 'Salz', value: salzG, unit: 'g', digits: 1 },
      { label: 'Teig gesamt', value: gesamtTeig, unit: 'g', digits: 0 },
    ];
  },
  intro:
    'Guter Pizzateig wird in Bäckerprozent gerechnet: Alle Zutaten beziehen sich auf die Mehlmenge. Dieser Rechner ermittelt aus Pizzenzahl und Kugelgewicht, wie viel Mehl, Wasser, Hefe und Salz du brauchst. Die Hydration (Wasseranteil) steuert, wie weich der Teig wird – 60 % sind ein guter Start, 65–70 % ergeben einen luftigeren, aber klebrigeren Teig.',
  howto: [
    'Gib an, wie viele Pizzen du backen willst.',
    'Wähle das Gewicht je Teigkugel (250 g ist klassisch).',
    'Stelle Hydration, Hefe- und Salzanteil ein.',
    'Lies die benötigten Mengen für Mehl, Wasser, Hefe und Salz ab.',
  ],
  faq: [
    { q: 'Was bedeutet Hydration?', a: 'Die Hydration ist der Wasseranteil bezogen auf die Mehlmenge. 60 % Hydration heißt: 600 g Wasser auf 1000 g Mehl.' },
    { q: 'Frisch- oder Trockenhefe?', a: 'Der Rechner geht von Frischhefe aus. Für Trockenhefe etwa ein Drittel der Menge verwenden.' },
    { q: 'Wie lange sollte der Teig gehen?', a: 'Mit wenig Hefe und langer Gare (12–24 Stunden im Kühlschrank) wird der Teig bekömmlicher und aromatischer.' },
  ],
  related: ['backofen-umluft-umrechner', 'rezept-portionen-rechner', 'cup-in-gramm-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { pizzen: 4, kugel: 250, hydration: 60, hefe: 1, salz: 2.5 },
      expect: [
        { label: 'Teig gesamt', value: 1000, tolerance: 0.5 },
        { label: 'Mehl', value: 611.6, tolerance: 1.5 },
        { label: 'Wasser', value: 367, tolerance: 1.5 },
      ],
    },
    {
      values: { pizzen: 2, kugel: 280, hydration: 65, hefe: 0.5, salz: 2 },
      expect: [
        { label: 'Mehl', value: 334.3, tolerance: 1.5 },
      ],
    },
  ],
};
