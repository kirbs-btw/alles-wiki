import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'led-ersparnis-rechner',
  category: 'energie',
  title: 'LED-Ersparnis-Rechner',
  shortTitle: 'LED-Ersparnis',
  description:
    'Berechne, wie viel Strom und Geld du durch den Wechsel von Glüh- oder Halogenlampen auf LED sparst - aus Wattzahlen, Brenndauer und Strompreis.',
  keywords: [
    'led ersparnis rechner',
    'led umrüstung sparen',
    'led vs glühbirne kosten',
    'stromkosten lampe rechner',
    'led stromverbrauch vergleich',
  ],
  intro:
    'LED-Lampen erzeugen dieselbe Helligkeit mit einem Bruchteil der Leistung alter Glüh- oder Halogenlampen. Dieser Rechner vergleicht die Stromkosten der alten und neuen Lampe und zeigt die jährliche Ersparnis aus Wattzahlen, täglicher Brenndauer und Lampenanzahl.',
  formula: 'Kosten = Watt ÷ 1000 × Stunden/Tag × 365 × Anzahl × Preis; Ersparnis = alt − neu',
  inputs: [
    { type: 'number', id: 'wattAlt', label: 'Leistung alte Lampe', unit: 'W', default: 60, min: 0, step: 1, help: 'Z. B. Glühlampe 60 W, Halogen 50 W.' },
    { type: 'number', id: 'wattLed', label: 'Leistung LED', unit: 'W', default: 8, min: 0, step: 1, help: 'Vergleichbare Helligkeit oft mit 6-10 W.' },
    { type: 'number', id: 'stundenTag', label: 'Brenndauer pro Tag', unit: 'h', default: 4, min: 0, max: 24, step: 0.5 },
    { type: 'number', id: 'anzahl', label: 'Anzahl Lampen', unit: 'Stück', default: 5, min: 1, step: 1 },
    { type: 'number', id: 'preis', label: 'Strompreis', unit: 'ct/kWh', default: 35, min: 0, step: 1 },
  ],
  compute: (v) => {
    const wattAlt = num(v.wattAlt);
    const wattLed = num(v.wattLed);
    const stundenTag = num(v.stundenTag);
    const anzahl = num(v.anzahl);
    const preis = num(v.preis) / 100;
    const stundenJahr = stundenTag * 365 * anzahl;
    const kostenAlt = (wattAlt / 1000) * stundenJahr * preis;
    const kostenLed = (wattLed / 1000) * stundenJahr * preis;
    const ersparnis = kostenAlt - kostenLed;
    return [
      { label: 'Ersparnis pro Jahr', value: ersparnis, unit: '€', digits: 2, primary: true },
      { label: 'Kosten alte Lampen pro Jahr', value: kostenAlt, unit: '€', digits: 2 },
      { label: 'Kosten LED pro Jahr', value: kostenLed, unit: '€', digits: 2 },
    ];
  },
  howto: [
    'Leistung der alten Lampe und der LED in Watt eingeben.',
    'Tägliche Brenndauer und Anzahl der Lampen eintragen.',
    'Strompreis angeben.',
    'Jährliche Ersparnis und Kosten beider Varianten ablesen.',
  ],
  faq: [
    { q: 'Wie viel spart LED gegenüber Glühlampen?', a: 'LEDs benötigen für dieselbe Helligkeit etwa 80-90 Prozent weniger Strom. Eine 60-W-Glühlampe lässt sich durch eine 8-W-LED ersetzen.' },
    { q: 'Lohnt sich der Austausch noch funktionierender Lampen?', a: 'Bei langer Brenndauer amortisiert sich eine LED oft schon nach wenigen Monaten allein über die Stromersparnis, selbst wenn die alte Lampe noch funktioniert.' },
  ],
  related: ['geraet-stromkosten-rechner', 'standby-kosten-rechner', 'stromkosten-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { wattAlt: 60, wattLed: 8, stundenTag: 4, anzahl: 5, preis: 35 },
      expect: [
        { label: 'Kosten alte Lampen pro Jahr', value: 153.3, tolerance: 0.05 },
        { label: 'Kosten LED pro Jahr', value: 20.44, tolerance: 0.05 },
        { label: 'Ersparnis pro Jahr', value: 132.86, tolerance: 0.05 },
      ],
    },
  ],
};
