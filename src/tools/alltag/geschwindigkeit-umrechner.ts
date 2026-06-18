import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'geschwindigkeit-umrechner',
  category: 'alltag',
  title: 'Geschwindigkeit umrechnen (km/h, m/s, mph, kn)',
  shortTitle: 'Geschwindigkeit',
  description:
    'Rechne Geschwindigkeiten zwischen km/h, m/s, mph (Meilen pro Stunde) und Knoten um. Praktisch für Sport, Reisen und Technik.',
  keywords: [
    'geschwindigkeit umrechnen',
    'kmh in ms',
    'mph in kmh',
    'm s in km h',
    'knoten in kmh',
    'geschwindigkeit umrechner',
  ],
  formula:
    'Basis m/s: km/h = ÷3,6; mph = ×0,44704; kn = ×0,514444. Ausgabe = m/s × Faktor je Einheit',
  inputs: [
    {
      type: 'number',
      id: 'wert',
      label: 'Geschwindigkeit',
      default: 100,
      min: 0,
      step: 1,
    },
    {
      type: 'select',
      id: 'einheit',
      label: 'Eingabe-Einheit',
      default: 'kmh',
      options: [
        { value: 'kmh', label: 'km/h' },
        { value: 'ms', label: 'm/s' },
        { value: 'mph', label: 'mph (Meilen/h)' },
        { value: 'kn', label: 'Knoten (kn)' },
      ],
    },
  ],
  compute: (v) => {
    const wert = num(v.wert);
    const einheit = String(v.einheit || 'kmh');
    // alles in m/s umrechnen
    let ms: number;
    if (einheit === 'kmh') ms = wert / 3.6;
    else if (einheit === 'ms') ms = wert;
    else if (einheit === 'mph') ms = wert * 0.44704;
    else ms = wert * 0.514444; // Knoten
    const kmh = ms * 3.6;
    const mph = ms / 0.44704;
    const kn = ms / 0.514444;
    return [
      { label: 'km/h', value: kmh, unit: 'km/h', digits: 2, primary: true },
      { label: 'm/s', value: ms, unit: 'm/s', digits: 3 },
      { label: 'mph', value: mph, unit: 'mph', digits: 2 },
      { label: 'Knoten', value: kn, unit: 'kn', digits: 2 },
    ];
  },
  intro:
    'Geschwindigkeiten begegnen uns in unterschiedlichen Einheiten: Auto-Tacho in km/h, Wetterdienste oft in m/s, angloamerikanische Quellen in mph und die Seefahrt in Knoten. Dieser Rechner wandelt einen Wert in alle vier gängigen Einheiten um. Ein Knoten entspricht einer Seemeile pro Stunde.',
  howto: [
    'Gib den Geschwindigkeitswert ein.',
    'Wähle die Einheit, in der du den Wert eingegeben hast.',
    'Lies die Umrechnung in km/h, m/s, mph und Knoten ab.',
  ],
  faq: [
    { q: 'Wie rechne ich km/h in m/s um?', a: 'Teile den Wert durch 3,6. 36 km/h sind also genau 10 m/s.' },
    { q: 'Was ist ein Knoten?', a: 'Ein Knoten ist eine Seemeile pro Stunde, also exakt 1,852 km/h beziehungsweise rund 0,514 m/s.' },
    { q: 'Wie viel sind 100 km/h in mph?', a: 'Etwa 62,14 mph, denn eine Meile entspricht rund 1,609 Kilometern.' },
  ],
  related: ['fahrenheit-celsius-rechner', 'zeit-umrechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { wert: 100, einheit: 'kmh' },
      expect: [
        { label: 'm/s', value: 27.778, tolerance: 0.01 },
        { label: 'mph', value: 62.14, tolerance: 0.05 },
      ],
    },
    {
      values: { wert: 10, einheit: 'ms' },
      expect: [
        { label: 'km/h', value: 36, tolerance: 0.01 },
      ],
    },
  ],
};
