import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

// Faktor: wie viele Meter ist 1 Einheit
const FAKTOR: Record<string, number> = {
  mm: 0.001,
  cm: 0.01,
  dm: 0.1,
  m: 1,
  km: 1000,
  inch: 0.0254,
  foot: 0.3048,
  yard: 0.9144,
  mile: 1609.344,
  sm: 1852, // Seemeile
};

export const tool: Tool = {
  slug: 'laenge-umrechner',
  category: 'mathe',
  title: 'Längen umrechnen – mm, cm, m, km, Zoll, Fuß, Meile',
  shortTitle: 'Längen-Umrechner',
  description:
    'Rechne Längeneinheiten schnell um: Millimeter, Zentimeter, Meter, Kilometer sowie Zoll, Fuß, Yard, Meile und Seemeile. Gib einen Wert ein und erhalte alle Einheiten.',
  keywords: [
    'länge umrechnen',
    'zoll in cm',
    'cm in zoll',
    'meter in fuß',
    'meilen in kilometer',
    'längeneinheiten umrechnen',
    'inch in zentimeter',
    'km in meilen',
  ],
  formula:
    'Zielwert = Eingabewert × (Meterfaktor der Quelle) / (Meterfaktor des Ziels)',
  intro:
    'Mit dem Längen-Umrechner wandelst du metrische und angloamerikanische Längeneinheiten ineinander um. Intern wird jeder Wert zunächst in Meter umgerechnet und dann in die Zieleinheit. Zusätzlich zeigt der Rechner den Wert in mehreren gängigen Einheiten gleichzeitig an.',
  inputs: [
    { type: 'number', id: 'wert', label: 'Wert', default: 1, step: 0.01, help: 'Die umzurechnende Länge.' },
    {
      type: 'select',
      id: 'von',
      label: 'Von Einheit',
      default: 'inch',
      options: [
        { value: 'mm', label: 'Millimeter (mm)' },
        { value: 'cm', label: 'Zentimeter (cm)' },
        { value: 'dm', label: 'Dezimeter (dm)' },
        { value: 'm', label: 'Meter (m)' },
        { value: 'km', label: 'Kilometer (km)' },
        { value: 'inch', label: 'Zoll / Inch (in)' },
        { value: 'foot', label: 'Fuß / Foot (ft)' },
        { value: 'yard', label: 'Yard (yd)' },
        { value: 'mile', label: 'Meile (mi)' },
        { value: 'sm', label: 'Seemeile (sm)' },
      ],
    },
    {
      type: 'select',
      id: 'nach',
      label: 'Nach Einheit',
      default: 'cm',
      options: [
        { value: 'mm', label: 'Millimeter (mm)' },
        { value: 'cm', label: 'Zentimeter (cm)' },
        { value: 'dm', label: 'Dezimeter (dm)' },
        { value: 'm', label: 'Meter (m)' },
        { value: 'km', label: 'Kilometer (km)' },
        { value: 'inch', label: 'Zoll / Inch (in)' },
        { value: 'foot', label: 'Fuß / Foot (ft)' },
        { value: 'yard', label: 'Yard (yd)' },
        { value: 'mile', label: 'Meile (mi)' },
        { value: 'sm', label: 'Seemeile (sm)' },
      ],
    },
  ],
  compute: (v) => {
    const wert = num(v.wert);
    const von = String(v.von);
    const nach = String(v.nach);
    const fVon = FAKTOR[von] ?? 1;
    const fNach = FAKTOR[nach] ?? 1;
    const meter = wert * fVon;
    const ziel = fNach > 0 ? meter / fNach : 0;
    return [
      { label: 'Umgerechneter Wert', value: ziel, digits: 6, primary: true },
      { label: 'In Metern', value: meter, unit: 'm', digits: 6 },
      { label: 'In Zentimetern', value: meter / FAKTOR.cm, unit: 'cm', digits: 4 },
      { label: 'In Zoll', value: meter / FAKTOR.inch, unit: 'in', digits: 4 },
    ];
  },
  howto: [
    'Gib den umzurechnenden Längenwert ein.',
    'Wähle die Ausgangseinheit (z. B. Zoll).',
    'Wähle die Zieleinheit (z. B. Zentimeter).',
    'Lies das Ergebnis sowie Vergleichswerte in Meter, Zentimeter und Zoll ab.',
  ],
  faq: [
    {
      q: 'Wie viele Zentimeter sind 1 Zoll?',
      a: 'Genau 2,54 cm. Ein Zoll ist international auf 25,4 Millimeter festgelegt.',
    },
    {
      q: 'Wie viele Kilometer sind eine Meile?',
      a: 'Eine englische Landmeile entspricht exakt 1,609344 km. Eine Seemeile ist mit 1,852 km länger.',
    },
    {
      q: 'Was ist der Unterschied zwischen Meile und Seemeile?',
      a: 'Die Landmeile (mile) misst 1609,344 m und wird etwa in den USA verwendet. Die Seemeile (sm) misst 1852 m und dient in der Schiff- und Luftfahrt.',
    },
    {
      q: 'Wie rechne ich Fuß in Meter um?',
      a: 'Ein Fuß sind 0,3048 m. Multipliziere die Anzahl der Fuß einfach mit 0,3048, um Meter zu erhalten.',
    },
  ],
  related: ['gewicht-umrechner', 'temperatur-umrechner', 'flaeche-umrechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { wert: 1, von: 'inch', nach: 'cm' },
      expect: [{ label: 'Umgerechneter Wert', value: 2.54, tolerance: 0.0001 }],
    },
    {
      values: { wert: 1, von: 'mile', nach: 'km' },
      expect: [{ label: 'Umgerechneter Wert', value: 1.609344, tolerance: 0.0001 }],
    },
  ],
};
