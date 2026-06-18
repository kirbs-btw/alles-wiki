import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'warmwasser-kosten-rechner',
  category: 'energie',
  title: 'Warmwasser-Kosten-Rechner',
  shortTitle: 'Warmwasser',
  description:
    'Berechne die Energiekosten für die Warmwasserbereitung aus Wassermenge, Aufheiztemperatur und Energiepreis - für Dusche, Bad oder Tagesverbrauch.',
  keywords: [
    'warmwasser kosten rechner',
    'warmwasser energie berechnen',
    'kosten warmwasser pro liter',
    'duschen kosten rechner',
    'warmwasserkosten berechnen',
  ],
  intro:
    'Wasser zu erwärmen kostet Energie - je nach Heizungsart als Strom, Gas oder Öl. Dieser Rechner ermittelt aus Wassermenge und der nötigen Temperaturerhöhung die Energiemenge und die Kosten. Physikalisch gilt: 1 Liter Wasser um 1 °C zu erwärmen benötigt rund 1,163 Wh.',
  formula: 'Energie (kWh) = Liter × ΔT × 1,163 ÷ 1000 ÷ Wirkungsgrad; Kosten = kWh × Preis',
  inputs: [
    { type: 'number', id: 'liter', label: 'Warmwassermenge', unit: 'l', default: 50, min: 0, step: 1, help: 'Z. B. eine Dusche ~50 l, Vollbad ~150 l.' },
    { type: 'number', id: 'kaltTemp', label: 'Kaltwassertemperatur', unit: '°C', default: 12, min: 0, max: 40, step: 1 },
    { type: 'number', id: 'warmTemp', label: 'Warmwassertemperatur', unit: '°C', default: 40, min: 0, max: 90, step: 1 },
    { type: 'number', id: 'wirkungsgrad', label: 'Wirkungsgrad der Erwärmung', unit: '%', default: 90, min: 1, max: 100, step: 1, help: 'Elektro nahe 100, Gastherme ~85-95.' },
    { type: 'number', id: 'preis', label: 'Energiepreis', unit: 'ct/kWh', default: 35, min: 0, step: 1, help: 'Strompreis oder Gaspreis je nach Heizungsart.' },
  ],
  compute: (v) => {
    const liter = num(v.liter);
    const kalt = num(v.kaltTemp);
    const warm = num(v.warmTemp);
    const wirkungsgrad = num(v.wirkungsgrad) / 100;
    const preis = num(v.preis) / 100;
    const deltaT = Math.max(0, warm - kalt);
    const energieKwh = wirkungsgrad > 0 ? (liter * deltaT * 1.163) / 1000 / wirkungsgrad : 0;
    const kosten = energieKwh * preis;
    return [
      { label: 'Kosten', value: kosten, unit: '€', digits: 2, primary: true },
      { label: 'Benötigte Energie', value: energieKwh, unit: 'kWh', digits: 3 },
      { label: 'Temperaturerhöhung', value: deltaT, unit: '°C', digits: 0 },
    ];
  },
  howto: [
    'Warmwassermenge in Litern eingeben.',
    'Kalt- und gewünschte Warmwassertemperatur eintragen.',
    'Wirkungsgrad der Erwärmung und Energiepreis angeben.',
    'Energiebedarf und Kosten ablesen.',
  ],
  faq: [
    { q: 'Wie viel kostet eine Dusche?', a: 'Eine Dusche mit rund 50 l warmem Wasser benötigt grob 1,8 kWh. Bei einem Strompreis von 35 ct/kWh sind das etwa 60-70 Cent, mit Gas meist weniger.' },
    { q: 'Warum braucht man den Wirkungsgrad?', a: 'Nicht die gesamte eingesetzte Energie landet im Wasser. Elektrische Durchlauferhitzer arbeiten nahe 100 Prozent, Gasthermen mit Leitungsverlusten oft bei 85-95 Prozent.' },
  ],
  related: ['heizkosten-rechner', 'stromkosten-rechner', 'gaskosten-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { liter: 50, kaltTemp: 12, warmTemp: 40, wirkungsgrad: 90, preis: 35 },
      expect: [
        { label: 'Temperaturerhöhung', value: 28, tolerance: 0.1 },
        { label: 'Benötigte Energie', value: 1.809, tolerance: 0.01 },
        { label: 'Kosten', value: 0.63, tolerance: 0.01 },
      ],
    },
  ],
};
