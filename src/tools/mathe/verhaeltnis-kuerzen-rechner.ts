import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

function gcd(a: number, b: number): number {
  a = Math.abs(Math.round(a));
  b = Math.abs(Math.round(b));
  while (b > 0) {
    const t = b;
    b = a % b;
    a = t;
  }
  return a || 1;
}

export const tool: Tool = {
  slug: 'verhaeltnis-kuerzen-rechner',
  category: 'mathe',
  title: 'Verhältnis kürzen – Verhältnis a:b auf kleinste ganze Zahlen reduzieren',
  shortTitle: 'Verhältnis kürzen',
  description:
    'Kürze ein Verhältnis a:b auf die kleinsten ganzen Zahlen und bringe es auf die Form 1:n. Mit Prozentanteilen beider Seiten – für Mischungen, Maßstäbe und Aufteilungen.',
  keywords: [
    'verhältnis kürzen',
    'verhältnis berechnen',
    'verhältnis vereinfachen',
    'verhältnis rechner',
    'mischungsverhältnis',
    'verhältnis auf 1 zu n',
  ],
  formula: 'a:b gekürzt = (a/ggT) : (b/ggT) ; auf 1:n = 1 : (b/a)',
  intro:
    'Ein Verhältnis vergleicht zwei Größen, etwa Mischungsanteile, Seitenverhältnisse oder Maßstäbe. Wie ein Bruch lässt es sich kürzen: Beide Seiten werden durch ihren größten gemeinsamen Teiler geteilt, ohne dass sich das Verhältnis ändert. Der Rechner liefert zusätzlich die normierte Form 1:n und die prozentualen Anteile beider Seiten.',
  inputs: [
    { type: 'number', id: 'a', label: 'Wert a', default: 24, step: 1 },
    { type: 'number', id: 'b', label: 'Wert b', default: 36, step: 1 },
  ],
  compute: (v) => {
    const a = Math.round(num(v.a));
    const b = Math.round(num(v.b));
    if (a === 0 && b === 0) {
      return [
        { label: 'Gekürztes Verhältnis', value: '0 : 0', primary: true },
        { label: 'Als 1 : n', value: '–' },
        { label: 'Anteil a', value: 0, unit: '%', digits: 2 },
        { label: 'Anteil b', value: 0, unit: '%', digits: 2 },
      ];
    }
    const g = gcd(a, b);
    const ag = a / g;
    const bg = b / g;
    const summe = Math.abs(a) + Math.abs(b);
    const anteilA = summe > 0 ? (Math.abs(a) / summe) * 100 : 0;
    const anteilB = summe > 0 ? (Math.abs(b) / summe) * 100 : 0;
    const n = a !== 0 ? b / a : 0;
    return [
      { label: 'Gekürztes Verhältnis', value: `${ag} : ${bg}`, primary: true },
      { label: 'Als 1 : n', value: a !== 0 ? `1 : ${(Math.round(n * 10000) / 10000).toLocaleString('de-DE')}` : '–' },
      { label: 'Anteil a', value: anteilA, unit: '%', digits: 2 },
      { label: 'Anteil b', value: anteilB, unit: '%', digits: 2 },
    ];
  },
  howto: [
    'Gib die beiden Werte a und b des Verhältnisses ein.',
    'Lies das vollständig gekürzte Verhältnis ab.',
    'Nutze die Form 1:n und die Prozentanteile zum schnellen Vergleich.',
  ],
  faq: [
    {
      q: 'Wie kürze ich ein Verhältnis?',
      a: 'Du teilst beide Seiten durch ihren größten gemeinsamen Teiler. 24:36 hat den ggT 12, gekürzt also 2:3.',
    },
    {
      q: 'Was bedeutet die Form 1:n?',
      a: 'Beide Seiten werden so skaliert, dass die linke Seite 1 ist. Aus 2:3 wird 1:1,5. Das erleichtert den Vergleich mehrerer Verhältnisse.',
    },
    {
      q: 'Wie hängen Verhältnis und Prozent zusammen?',
      a: 'Beim Verhältnis 2:3 ist die Summe 5 Teile. Der Anteil a beträgt 2/5 = 40 %, der Anteil b 3/5 = 60 %.',
    },
  ],
  related: ['bruchrechner', 'ggt-kgv-rechner', 'massstab-rechner'],
  updated: '2026-06-19',
  examples: [
    {
      values: { a: 24, b: 36 },
      expect: [
        { label: 'Anteil a', value: 40, tolerance: 0.001 },
        { label: 'Anteil b', value: 60, tolerance: 0.001 },
      ],
    },
    {
      values: { a: 50, b: 100 },
      expect: [
        { label: 'Anteil a', value: 33.333333, tolerance: 0.001 },
        { label: 'Anteil b', value: 66.666667, tolerance: 0.001 },
      ],
    },
  ],
};
