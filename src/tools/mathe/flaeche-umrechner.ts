import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

// Faktor: wie viele Quadratmeter ist 1 Einheit
const FAKTOR: Record<string, number> = {
  mm2: 0.000001,
  cm2: 0.0001,
  dm2: 0.01,
  m2: 1,
  a: 100, // Ar
  ha: 10000, // Hektar
  km2: 1000000,
};

export const tool: Tool = {
  slug: 'flaeche-umrechner',
  category: 'mathe',
  title: 'Fläche umrechnen – cm², m², Ar, Hektar, km²',
  shortTitle: 'Flächen-Umrechner',
  description:
    'Rechne Flächeneinheiten schnell um: Quadratmillimeter, Quadratzentimeter, Quadratmeter, Ar, Hektar und Quadratkilometer. Ein Wert genügt für alle Einheiten.',
  keywords: [
    'fläche umrechnen',
    'quadratmeter umrechnen',
    'hektar in quadratmeter',
    'ar in m2',
    'qm in hektar',
    'km2 in m2',
    'flächeneinheiten umrechnen',
    'quadratmeter in hektar',
  ],
  formula:
    'Zielwert = Eingabewert × (m²-Faktor der Quelle) / (m²-Faktor des Ziels)',
  intro:
    'Mit dem Flächen-Umrechner wandelst du metrische Flächeneinheiten ineinander um. Intern wird jeder Wert zunächst in Quadratmeter umgerechnet und dann in die Zieleinheit. Besonders praktisch für Grundstücke (Ar, Hektar) sowie für Wohn- und Bauflächen.',
  inputs: [
    { type: 'number', id: 'wert', label: 'Wert', default: 1, step: 0.01, help: 'Die umzurechnende Fläche.' },
    {
      type: 'select',
      id: 'von',
      label: 'Von Einheit',
      default: 'ha',
      options: [
        { value: 'mm2', label: 'Quadratmillimeter (mm²)' },
        { value: 'cm2', label: 'Quadratzentimeter (cm²)' },
        { value: 'dm2', label: 'Quadratdezimeter (dm²)' },
        { value: 'm2', label: 'Quadratmeter (m²)' },
        { value: 'a', label: 'Ar (a)' },
        { value: 'ha', label: 'Hektar (ha)' },
        { value: 'km2', label: 'Quadratkilometer (km²)' },
      ],
    },
    {
      type: 'select',
      id: 'nach',
      label: 'Nach Einheit',
      default: 'm2',
      options: [
        { value: 'mm2', label: 'Quadratmillimeter (mm²)' },
        { value: 'cm2', label: 'Quadratzentimeter (cm²)' },
        { value: 'dm2', label: 'Quadratdezimeter (dm²)' },
        { value: 'm2', label: 'Quadratmeter (m²)' },
        { value: 'a', label: 'Ar (a)' },
        { value: 'ha', label: 'Hektar (ha)' },
        { value: 'km2', label: 'Quadratkilometer (km²)' },
      ],
    },
  ],
  compute: (v) => {
    const wert = num(v.wert);
    const von = String(v.von);
    const nach = String(v.nach);
    const fVon = FAKTOR[von] ?? 1;
    const fNach = FAKTOR[nach] ?? 1;
    const qm = wert * fVon;
    const ziel = fNach > 0 ? qm / fNach : 0;
    return [
      { label: 'Umgerechneter Wert', value: ziel, digits: 6, primary: true },
      { label: 'In Quadratmetern', value: qm, unit: 'm²', digits: 4 },
      { label: 'In Hektar', value: qm / FAKTOR.ha, unit: 'ha', digits: 6 },
    ];
  },
  howto: [
    'Gib den umzurechnenden Flächenwert ein.',
    'Wähle die Ausgangseinheit (z. B. Hektar).',
    'Wähle die Zieleinheit (z. B. Quadratmeter).',
    'Lies das Ergebnis sowie Vergleichswerte in Quadratmetern und Hektar ab.',
  ],
  faq: [
    {
      q: 'Wie viele Quadratmeter sind ein Hektar?',
      a: 'Ein Hektar (ha) entspricht 10.000 m², also einem Quadrat mit 100 m Seitenlänge. Ein Hektar sind außerdem 100 Ar.',
    },
    {
      q: 'Was ist ein Ar?',
      a: 'Ein Ar (a) sind 100 m², also ein Quadrat mit 10 m Seitenlänge. Bei Grundstücken wird oft in Ar gerechnet; 100 Ar ergeben einen Hektar.',
    },
    {
      q: 'Wie rechne ich Quadratkilometer in Quadratmeter um?',
      a: 'Ein Quadratkilometer sind 1.000.000 m². Du multiplizierst die Anzahl km² also mit einer Million.',
    },
    {
      q: 'Warum ist 1 km² nicht 1000 m²?',
      a: 'Weil Flächen quadriert werden. 1 km = 1000 m, und 1 km² = 1000 m × 1000 m = 1.000.000 m².',
    },
  ],
  related: ['laenge-umrechner', 'kreis-rechner', 'quader-volumen-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { wert: 1, von: 'ha', nach: 'm2' },
      expect: [{ label: 'Umgerechneter Wert', value: 10000, tolerance: 0.01 }],
    },
    {
      values: { wert: 1, von: 'km2', nach: 'm2' },
      expect: [{ label: 'Umgerechneter Wert', value: 1000000, tolerance: 0.1 }],
    },
  ],
};
