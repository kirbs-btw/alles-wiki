import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'durchlauferhitzer-kosten-rechner',
  category: 'energie',
  title: 'Durchlauferhitzer-Kosten-Rechner (pro Dusche)',
  shortTitle: 'Durchlauferhitzer',
  description:
    'Berechne die Stromkosten eines elektrischen Durchlauferhitzers pro Dusche und pro Jahr aus Wassermenge, Temperatur, Duschdauer und Strompreis.',
  keywords: [
    'durchlauferhitzer kosten',
    'durchlauferhitzer stromkosten',
    'kosten pro dusche',
    'warmwasser strom kosten',
    'duschen stromverbrauch',
    'durchlauferhitzer rechner',
  ],
  intro:
    'Ein elektrischer Durchlauferhitzer erwärmt Wasser direkt beim Zapfen und braucht dafür viel Strom. Dieser Rechner ermittelt, was eine Dusche kostet, aus der Wassermenge je Minute, der Aufheizspanne und dem Strompreis. Die nötige Energie folgt aus der Wärmekapazität von Wasser: rund 1,16 Wattstunden, um einen Liter um ein Grad zu erwärmen. So siehst du die Kosten pro Dusche und aufs Jahr hochgerechnet.',
  formula: 'Energie = Liter × ΔT × 1,16 Wh; Kosten = Energie × Strompreis',
  inputs: [
    { type: 'number', id: 'durchfluss', label: 'Wasserdurchfluss', unit: 'l/min', default: 9, min: 1, step: 0.5, help: 'Sparbrause ~6-8, normale Dusche ~10-12 l/min.' },
    { type: 'number', id: 'dauer', label: 'Duschdauer', unit: 'min', default: 6, min: 0, step: 1 },
    { type: 'number', id: 'kalt', label: 'Kaltwassertemperatur', unit: '°C', default: 12, min: 0, max: 40, step: 1 },
    { type: 'number', id: 'warm', label: 'Duschtemperatur', unit: '°C', default: 38, min: 1, max: 70, step: 1 },
    { type: 'number', id: 'preis', label: 'Strompreis', unit: 'ct/kWh', default: 35, min: 0, step: 0.5 },
    { type: 'number', id: 'duschen', label: 'Duschen pro Jahr', unit: '', default: 365, min: 0, step: 10, help: 'z. B. 1 Person täglich = 365, Familie entsprechend mehr.' },
  ],
  compute: (v) => {
    const durchfluss = num(v.durchfluss);
    const dauer = num(v.dauer);
    const kalt = num(v.kalt);
    const warm = num(v.warm);
    const preis = num(v.preis) / 100;
    const duschen = num(v.duschen);
    const liter = durchfluss * dauer;
    const deltaT = Math.max(warm - kalt, 0);
    // 4,186 kJ/(kg·K) -> 1,1628 Wh je Liter und Grad
    const energieKwh = (liter * deltaT * 1.1628) / 1000;
    const kostenDusche = energieKwh * preis;
    const kostenJahr = kostenDusche * duschen;
    return [
      { label: 'Kosten pro Dusche', value: kostenDusche, unit: '€', digits: 2, primary: true },
      { label: 'Strom pro Dusche', value: energieKwh, unit: 'kWh', digits: 2 },
      { label: 'Warmwasser pro Dusche', value: liter, unit: 'l', digits: 0 },
      { label: 'Stromkosten pro Jahr', value: kostenJahr, unit: '€', digits: 2 },
    ];
  },
  howto: [
    'Wasserdurchfluss der Dusche in Litern pro Minute eintragen.',
    'Duschdauer sowie Kalt- und Duschtemperatur angeben.',
    'Strompreis und Anzahl der Duschen pro Jahr ergänzen.',
    'Kosten pro Dusche und hochgerechnet aufs Jahr ablesen.',
  ],
  faq: [
    { q: 'Warum ist Duschen mit Durchlauferhitzer so teuer?', a: 'Wasser hat eine hohe Wärmekapazität: Schon das Erwärmen von 9 Litern pro Minute um rund 26 Grad erfordert mehrere Kilowatt Leistung. Bei aktuellen Strompreisen summiert sich das schnell.' },
    { q: 'Wie spare ich am meisten?', a: 'Den größten Hebel haben eine Sparbrause (weniger Liter pro Minute) und kürzeres Duschen. Beides senkt die Wassermenge direkt und damit die Energie. Eine niedrigere Temperatur hilft zusätzlich.' },
    { q: 'Womit rechnet der Rechner?', a: 'Mit der spezifischen Wärmekapazität von Wasser: rund 1,16 Wattstunden je Liter und Grad Temperaturerhöhung. Leitungs- und Geräteverluste sind nicht berücksichtigt, daher ist das Ergebnis eine knappe Untergrenze.' },
    { q: 'Lohnt sich ein Warmwasserspeicher oder eine Wärmepumpe?', a: 'Wer viel warmes Wasser braucht, fährt mit einem effizienteren System oft günstiger. Vergleiche dazu die Kosten eines Speicher- oder Wärmepumpensystems mit dem hier ermittelten Stromverbrauch.' },
  ],
  related: ['warmwasser-kosten-rechner', 'stromkosten-rechner', 'geraet-stromkosten-rechner'],
  updated: '2026-06-19',
  examples: [
    {
      values: { durchfluss: 9, dauer: 6, kalt: 12, warm: 38, preis: 35, duschen: 365 },
      expect: [
        { label: 'Warmwasser pro Dusche', value: 54, tolerance: 0 },
        { label: 'Strom pro Dusche', value: 1.632, tolerance: 0.01 },
        { label: 'Kosten pro Dusche', value: 0.571, tolerance: 0.01 },
      ],
    },
  ],
};
