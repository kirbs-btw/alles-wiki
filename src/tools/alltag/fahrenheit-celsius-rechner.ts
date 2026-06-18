import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'fahrenheit-celsius-rechner',
  category: 'alltag',
  title: 'Fahrenheit in Celsius umrechnen',
  shortTitle: 'Fahrenheit ↔ Celsius',
  description:
    'Rechne Temperaturen zwischen Fahrenheit und Celsius um – praktisch für US-Backrezepte, Wetterangaben und Ofentemperaturen, in beide Richtungen.',
  keywords: [
    'fahrenheit in celsius',
    'celsius in fahrenheit',
    'temperatur umrechnen',
    'fahrenheit umrechnen rechner',
    'grad fahrenheit celsius',
    'ofentemperatur umrechnen',
    'f in c umrechnen',
  ],
  formula: 'Celsius = (Fahrenheit − 32) × 5/9; Fahrenheit = Celsius × 9/5 + 32',
  inputs: [
    { type: 'number', id: 'wert', label: 'Temperaturwert', default: 350, step: 1 },
    {
      type: 'select',
      id: 'richtung',
      label: 'Umrechnungs-Richtung',
      default: 'f_zu_c',
      options: [
        { value: 'f_zu_c', label: 'Fahrenheit → Celsius' },
        { value: 'c_zu_f', label: 'Celsius → Fahrenheit' },
      ],
    },
  ],
  compute: (v) => {
    const wert = num(v.wert);
    const richtung = String(v.richtung || 'f_zu_c');
    let celsius: number;
    let fahrenheit: number;
    if (richtung === 'c_zu_f') {
      celsius = wert;
      fahrenheit = wert * (9 / 5) + 32;
    } else {
      fahrenheit = wert;
      celsius = (wert - 32) * (5 / 9);
    }
    // Kelvin als nützliche Zusatzangabe (0 °C = 273,15 K)
    const kelvin = celsius + 273.15;
    return [
      { label: 'Celsius', value: celsius, unit: '°C', digits: 1, primary: richtung === 'f_zu_c' },
      { label: 'Fahrenheit', value: fahrenheit, unit: '°F', digits: 1, primary: richtung === 'c_zu_f' },
      { label: 'Kelvin', value: kelvin, unit: 'K', digits: 2 },
    ];
  },
  intro:
    'In den USA werden Temperaturen in Fahrenheit angegeben – beim Wetter ebenso wie bei Ofentemperaturen in Rezepten. In Deutschland ist Celsius üblich. Dieser Rechner wandelt in beide Richtungen exakt um und zeigt zusätzlich die Temperatur in Kelvin an.',
  howto: [
    'Gib den Temperaturwert ein, den du umrechnen möchtest.',
    'Wähle die Richtung: Fahrenheit nach Celsius oder umgekehrt.',
    'Lies das Ergebnis ab – das Hauptergebnis ist die Zieleinheit.',
    'Für US-Rezepte: 350 °F entsprechen rund 177 °C (Ober-/Unterhitze).',
  ],
  faq: [
    { q: 'Wie rechne ich Fahrenheit in Celsius um?', a: 'Ziehe 32 ab und multipliziere das Ergebnis mit 5/9. Beispiel: (350 − 32) × 5/9 = 176,7 °C.' },
    { q: 'Bei welcher Temperatur sind beide Skalen gleich?', a: 'Bei −40 Grad: −40 °C entsprechen genau −40 °F. Das ist der einzige Punkt, an dem beide Skalen denselben Wert zeigen.' },
    { q: 'Welche Ofentemperatur entspricht 180 °C?', a: '180 °C entsprechen 356 °F. In US-Rezepten wird dafür meist auf 350 °F gerundet.' },
    { q: 'Was ist Kelvin?', a: 'Kelvin ist die SI-Einheit der Temperatur. 0 K ist der absolute Nullpunkt; 0 °C entsprechen 273,15 K. Die Schrittweite ist identisch mit Celsius.' },
  ],
  related: ['cup-in-gramm-rechner', 'rezept-portionen-rechner', 'verduennung-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { wert: 350, richtung: 'f_zu_c' },
      expect: [{ label: 'Celsius', value: 176.7, tolerance: 0.1 }],
    },
    {
      values: { wert: 100, richtung: 'c_zu_f' },
      expect: [
        { label: 'Fahrenheit', value: 212, tolerance: 0.1 },
        { label: 'Kelvin', value: 373.15, tolerance: 0.01 },
      ],
    },
  ],
};
