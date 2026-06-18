import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

function toCelsius(wert: number, von: string): number {
  if (von === 'c') return wert;
  if (von === 'f') return (wert - 32) * (5 / 9);
  if (von === 'k') return wert - 273.15;
  return wert;
}

export const tool: Tool = {
  slug: 'temperatur-umrechner',
  category: 'mathe',
  title: 'Temperatur umrechnen – Celsius, Fahrenheit, Kelvin',
  shortTitle: 'Temperatur-Umrechner',
  description:
    'Rechne Temperaturen zwischen Grad Celsius, Grad Fahrenheit und Kelvin um. Gib einen Wert und die Ausgangseinheit ein und erhalte alle drei Skalen auf einen Blick.',
  keywords: [
    'temperatur umrechnen',
    'fahrenheit in celsius',
    'celsius in fahrenheit',
    'celsius in kelvin',
    'kelvin in celsius',
    'grad fahrenheit umrechnen',
    'temperatur rechner',
    'fahrenheit celsius formel',
  ],
  formula:
    '°C = (°F − 32) × 5/9 ; °F = °C × 9/5 + 32 ; K = °C + 273,15',
  intro:
    'Der Temperatur-Umrechner wandelt zwischen den drei wichtigsten Temperaturskalen: Celsius (°C), Fahrenheit (°F) und Kelvin (K). Intern wird jeder Wert zuerst in Celsius überführt und dann in die übrigen Skalen. So siehst du sofort alle drei Werte nebeneinander.',
  inputs: [
    { type: 'number', id: 'wert', label: 'Temperaturwert', default: 100, step: 0.1, help: 'Die umzurechnende Temperatur.' },
    {
      type: 'select',
      id: 'von',
      label: 'Ausgangseinheit',
      default: 'f',
      options: [
        { value: 'c', label: 'Grad Celsius (°C)' },
        { value: 'f', label: 'Grad Fahrenheit (°F)' },
        { value: 'k', label: 'Kelvin (K)' },
      ],
    },
  ],
  compute: (v) => {
    const wert = num(v.wert);
    const von = String(v.von);
    const c = toCelsius(wert, von);
    const f = c * (9 / 5) + 32;
    const k = c + 273.15;
    return [
      { label: 'Grad Celsius', value: c, unit: '°C', digits: 2, primary: true },
      { label: 'Grad Fahrenheit', value: f, unit: '°F', digits: 2 },
      { label: 'Kelvin', value: k, unit: 'K', digits: 2 },
    ];
  },
  howto: [
    'Gib den umzurechnenden Temperaturwert ein.',
    'Wähle die Ausgangseinheit: Celsius, Fahrenheit oder Kelvin.',
    'Der Rechner überführt den Wert intern in Grad Celsius.',
    'Lies das Ergebnis in allen drei Skalen ab.',
  ],
  faq: [
    {
      q: 'Wie rechne ich Fahrenheit in Celsius um?',
      a: 'Du ziehst 32 ab und multiplizierst mit 5/9: °C = (°F − 32) × 5/9. 100 °F entsprechen so etwa 37,78 °C.',
    },
    {
      q: 'Wie rechne ich Celsius in Fahrenheit um?',
      a: 'Du multiplizierst mit 9/5 und addierst 32: °F = °C × 9/5 + 32. 100 °C entsprechen 212 °F (Siedepunkt von Wasser).',
    },
    {
      q: 'Was ist der Unterschied zwischen Celsius und Kelvin?',
      a: 'Beide Skalen haben gleich große Schritte, aber Kelvin beginnt am absoluten Nullpunkt. Es gilt K = °C + 273,15. 0 °C sind also 273,15 K.',
    },
    {
      q: 'Bei welcher Temperatur sind Celsius und Fahrenheit gleich?',
      a: 'Bei −40 Grad: −40 °C entsprechen genau −40 °F. Es ist der einzige Punkt, an dem beide Skalen denselben Wert zeigen.',
    },
  ],
  related: ['laenge-umrechner', 'gewicht-umrechner', 'flaeche-umrechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { wert: 100, von: 'c' },
      expect: [
        { label: 'Grad Fahrenheit', value: 212, tolerance: 0.01 },
        { label: 'Kelvin', value: 373.15, tolerance: 0.01 },
      ],
    },
    {
      values: { wert: 32, von: 'f' },
      expect: [{ label: 'Grad Celsius', value: 0, tolerance: 0.01 }],
    },
  ],
};
