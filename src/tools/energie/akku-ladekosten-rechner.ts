import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'akku-ladekosten-rechner',
  category: 'energie',
  title: 'Akku-Ladekosten-Rechner',
  shortTitle: 'Akku laden',
  description:
    'Berechne die Stromkosten zum Laden eines Akkus aus Akkukapazität, Spannung, Ladeverlusten und Strompreis - für Handy, E-Bike, Werkzeug oder Powerbank.',
  keywords: [
    'akku ladekosten rechner',
    'handy laden kosten',
    'e-bike akku laden kosten',
    'akku laden stromkosten',
    'kosten akku aufladen berechnen',
  ],
  intro:
    'Wer wissen will, was das Aufladen eines Akkus kostet, braucht die Energiemenge in Wattstunden. Bei Angabe in Amperestunden ergibt sich diese aus Kapazität mal Spannung. Dieser Rechner berücksichtigt zusätzlich Ladeverluste und rechnet die Kosten pro Ladung und pro Jahr aus.',
  formula: 'Energie (kWh) = Ah × V ÷ 1000 ÷ Wirkungsgrad; Kosten = kWh × Preis',
  inputs: [
    { type: 'number', id: 'kapazitaet', label: 'Akkukapazität', unit: 'Ah', default: 10, min: 0, step: 0.5, help: 'mAh ÷ 1000 = Ah. E-Bike ~10-17 Ah, Handy ~0,003-0,005 Ah.' },
    { type: 'number', id: 'spannung', label: 'Nennspannung', unit: 'V', default: 36, min: 0, step: 1, help: 'E-Bike oft 36 V, Handy 3,7 V, Werkzeug 18 V.' },
    { type: 'number', id: 'wirkungsgrad', label: 'Ladewirkungsgrad', unit: '%', default: 85, min: 1, max: 100, step: 1, help: 'Beim Laden gehen rund 10-20 % als Wärme verloren.' },
    { type: 'number', id: 'preis', label: 'Strompreis', unit: 'ct/kWh', default: 35, min: 0, step: 1 },
    { type: 'number', id: 'ladungenJahr', label: 'Ladungen pro Jahr', unit: 'Stück', default: 100, min: 0, step: 1 },
  ],
  compute: (v) => {
    const ah = num(v.kapazitaet);
    const spannung = num(v.spannung);
    const wirkungsgrad = num(v.wirkungsgrad) / 100;
    const preis = num(v.preis) / 100;
    const ladungen = num(v.ladungenJahr);
    const wh = ah * spannung;
    const kwh = wirkungsgrad > 0 ? wh / 1000 / wirkungsgrad : 0;
    const kostenLadung = kwh * preis;
    const kostenJahr = kostenLadung * ladungen;
    return [
      { label: 'Kosten pro Ladung', value: kostenLadung, unit: '€', digits: 4, primary: true },
      { label: 'Energie pro Ladung', value: kwh, unit: 'kWh', digits: 4 },
      { label: 'Kosten pro Jahr', value: kostenJahr, unit: '€', digits: 2 },
    ];
  },
  howto: [
    'Akkukapazität in Amperestunden eingeben (mAh ÷ 1000).',
    'Nennspannung des Akkus eintragen.',
    'Ladewirkungsgrad und Strompreis angeben.',
    'Anzahl der Ladungen pro Jahr eingeben und Kosten ablesen.',
  ],
  faq: [
    { q: 'Was kostet eine E-Bike-Ladung?', a: 'Ein 36-V-Akku mit 10 Ah speichert rund 0,36 kWh. Inklusive Ladeverlusten kostet eine volle Ladung bei 35 ct/kWh nur etwa 12-15 Cent.' },
    { q: 'Warum gibt es Ladeverluste?', a: 'Beim Laden entstehen Wärmeverluste im Ladegerät und im Akku. Aus der Steckdose fließt daher mehr Energie, als der Akku letztlich speichert - typisch 10-20 Prozent mehr.' },
  ],
  related: ['geraet-stromkosten-rechner', 'e-auto-ladekosten-rechner', 'stromkosten-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { kapazitaet: 10, spannung: 36, wirkungsgrad: 85, preis: 35, ladungenJahr: 100 },
      expect: [
        { label: 'Energie pro Ladung', value: 0.4235, tolerance: 0.001 },
        { label: 'Kosten pro Ladung', value: 0.1482, tolerance: 0.001 },
        { label: 'Kosten pro Jahr', value: 14.82, tolerance: 0.05 },
      ],
    },
  ],
};
