import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'satz-des-pythagoras-rechner',
  category: 'mathe',
  title: 'Satz des Pythagoras Rechner – Hypotenuse und Katheten',
  shortTitle: 'Pythagoras',
  description:
    'Berechne mit dem Satz des Pythagoras die fehlende Seite im rechtwinkligen Dreieck: Hypotenuse aus zwei Katheten oder eine Kathete aus Hypotenuse und Kathete.',
  keywords: [
    'satz des pythagoras rechner',
    'hypotenuse berechnen',
    'kathete berechnen',
    'a quadrat plus b quadrat',
    'rechtwinkliges dreieck seite',
    'pythagoras formel',
  ],
  formula: 'Hypotenuse: c = √(a² + b²) ; Kathete: a = √(c² − b²)',
  intro:
    'Im rechtwinkligen Dreieck gilt a² + b² = c², wobei c die Hypotenuse (längste Seite gegenüber dem rechten Winkel) ist. Der Rechner ermittelt je nach Modus die Hypotenuse aus zwei Katheten oder eine fehlende Kathete aus Hypotenuse und der anderen Kathete.',
  inputs: [
    {
      type: 'select',
      id: 'modus',
      label: 'Was soll berechnet werden?',
      default: 'hypotenuse',
      options: [
        { value: 'hypotenuse', label: 'Hypotenuse c aus Katheten a und b' },
        { value: 'kathete', label: 'Kathete aus Hypotenuse c und Kathete a' },
      ],
    },
    { type: 'number', id: 'a', label: 'Kathete a', unit: 'cm', default: 3, min: 0, step: 0.1 },
    { type: 'number', id: 'b', label: 'Kathete b / Hypotenuse c', unit: 'cm', default: 4, min: 0, step: 0.1, help: 'Im Modus „Hypotenuse" die zweite Kathete b, im Modus „Kathete" die Hypotenuse c.' },
  ],
  compute: (v) => {
    const modus = String(v.modus);
    const a = num(v.a);
    const b = num(v.b);
    let ergebnis = 0;
    let label = 'Hypotenuse c';
    if (modus === 'hypotenuse') {
      ergebnis = Math.sqrt(a * a + b * b);
      label = 'Hypotenuse c';
    } else {
      const diff = b * b - a * a;
      ergebnis = diff > 0 ? Math.sqrt(diff) : 0;
      label = 'Kathete';
    }
    return [
      { label, value: ergebnis, unit: 'cm', digits: 4, primary: true },
      { label: 'Quadrat des Ergebnisses', value: ergebnis * ergebnis, unit: 'cm²', digits: 4 },
    ];
  },
  howto: [
    'Wähle, ob du die Hypotenuse oder eine Kathete berechnen willst.',
    'Im Hypotenusen-Modus die beiden Katheten a und b eingeben.',
    'Im Katheten-Modus die Hypotenuse c und die bekannte Kathete a eingeben.',
    'Lies die gesuchte Seitenlänge ab.',
  ],
  faq: [
    {
      q: 'Was sagt der Satz des Pythagoras aus?',
      a: 'In jedem rechtwinkligen Dreieck ist die Summe der Quadrate über den beiden Katheten gleich dem Quadrat über der Hypotenuse: a² + b² = c².',
    },
    {
      q: 'Welche Seite ist die Hypotenuse?',
      a: 'Die Hypotenuse ist die längste Seite und liegt dem rechten Winkel gegenüber. Die beiden kürzeren Seiten heißen Katheten.',
    },
    {
      q: 'Kann ich beliebige Einheiten verwenden?',
      a: 'Ja, solange alle Seiten in derselben Einheit angegeben sind. Das Ergebnis hat dann ebenfalls diese Einheit.',
    },
  ],
  related: ['dreieck-flaeche-rechner', 'wurzelrechner', 'kreis-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { modus: 'hypotenuse', a: 3, b: 4 },
      expect: [{ label: 'Hypotenuse c', value: 5, tolerance: 0.0001 }],
    },
    {
      values: { modus: 'kathete', a: 6, b: 10 },
      expect: [{ label: 'Kathete', value: 8, tolerance: 0.0001 }],
    },
  ],
};
