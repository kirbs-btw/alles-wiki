import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'rechtwinkliges-dreieck-rechner',
  category: 'mathe',
  title: 'Rechtwinkliges Dreieck Rechner – Seiten und Winkel mit Sinus, Kosinus, Tangens',
  shortTitle: 'Rechtw. Dreieck',
  description:
    'Berechne aus zwei Katheten eines rechtwinkligen Dreiecks die Hypotenuse und beide spitzen Winkel über Sinus, Kosinus und Tangens – samt Fläche und Umfang.',
  keywords: [
    'rechtwinkliges dreieck rechner',
    'winkel im dreieck berechnen',
    'sinus kosinus tangens rechner',
    'katheten winkel berechnen',
    'hypotenuse winkel',
    'trigonometrie dreieck',
  ],
  formula:
    'c = √(a²+b²) ; α = arctan(a/b) ; β = 90° − α ; Fläche = a·b/2',
  intro:
    'Im rechtwinkligen Dreieck liegt der rechte Winkel zwischen den beiden Katheten a und b; die Hypotenuse c liegt ihm gegenüber. Aus den beiden Katheten lassen sich die Hypotenuse mit dem Satz des Pythagoras und die beiden spitzen Winkel über den Tangens bestimmen. Der Rechner gibt zusätzlich Fläche und Umfang aus. Winkel α liegt der Kathete a gegenüber.',
  inputs: [
    { type: 'number', id: 'a', label: 'Kathete a', unit: 'cm', default: 3, min: 0, step: 0.1, help: 'Winkel α liegt dieser Seite gegenüber.' },
    { type: 'number', id: 'b', label: 'Kathete b', unit: 'cm', default: 4, min: 0, step: 0.1, help: 'Winkel β liegt dieser Seite gegenüber.' },
  ],
  compute: (v) => {
    const a = num(v.a);
    const b = num(v.b);
    const c = Math.sqrt(a * a + b * b);
    const alpha = b > 0 ? (Math.atan(a / b) * 180) / Math.PI : a > 0 ? 90 : 0;
    const beta = 90 - alpha;
    const flaeche = (a * b) / 2;
    const umfang = a + b + c;
    return [
      { label: 'Hypotenuse c', value: c, unit: 'cm', digits: 4, primary: true },
      { label: 'Winkel α (gegenüber a)', value: alpha, unit: '°', digits: 4 },
      { label: 'Winkel β (gegenüber b)', value: beta, unit: '°', digits: 4 },
      { label: 'Fläche', value: flaeche, unit: 'cm²', digits: 4 },
      { label: 'Umfang', value: umfang, unit: 'cm', digits: 4 },
    ];
  },
  howto: [
    'Gib die beiden Katheten a und b ein (die Seiten am rechten Winkel).',
    'Lies die Hypotenuse c und die beiden spitzen Winkel α und β ab.',
    'Nutze zusätzlich Fläche und Umfang des Dreiecks.',
  ],
  faq: [
    {
      q: 'Wie berechne ich die Winkel im rechtwinkligen Dreieck?',
      a: 'Über den Tangens: tan(α) = Gegenkathete/Ankathete = a/b. Den Winkel erhältst du mit dem Arkustangens. Der zweite spitze Winkel ergibt sich aus 90° − α.',
    },
    {
      q: 'Was bedeuten Sinus, Kosinus und Tangens?',
      a: 'Im rechtwinkligen Dreieck ist sin = Gegenkathete/Hypotenuse, cos = Ankathete/Hypotenuse und tan = Gegenkathete/Ankathete – jeweils bezogen auf den betrachteten Winkel.',
    },
    {
      q: 'Warum ergeben die spitzen Winkel zusammen 90°?',
      a: 'Die Innenwinkelsumme jedes Dreiecks beträgt 180°. Da ein Winkel bereits 90° ist, bleiben für die beiden spitzen Winkel zusammen 90°.',
    },
  ],
  related: ['satz-des-pythagoras-rechner', 'grad-bogenmass-umrechner', 'dreieck-flaeche-rechner'],
  updated: '2026-06-19',
  examples: [
    {
      values: { a: 3, b: 4 },
      expect: [
        { label: 'Hypotenuse c', value: 5, tolerance: 0.0001 },
        { label: 'Winkel α (gegenüber a)', value: 36.8698976, tolerance: 0.0001 },
        { label: 'Fläche', value: 6, tolerance: 0.0001 },
      ],
    },
    {
      values: { a: 1, b: 1 },
      expect: [{ label: 'Winkel α (gegenüber a)', value: 45, tolerance: 0.0001 }],
    },
  ],
};
