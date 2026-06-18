import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'wurzelrechner',
  category: 'mathe',
  title: 'Wurzelrechner – Quadratwurzel, Kubikwurzel und n-te Wurzel',
  shortTitle: 'Wurzelrechner',
  description:
    'Berechne die Quadratwurzel, Kubikwurzel oder eine beliebige n-te Wurzel einer Zahl. Mit Probe durch Potenzieren und Anzeige des Quadrats zur Kontrolle.',
  keywords: [
    'wurzel berechnen',
    'quadratwurzel rechner',
    'kubikwurzel berechnen',
    'wurzel ziehen',
    'n-te wurzel',
    'wurzelrechner online',
    'dritte wurzel',
    'radizieren',
  ],
  formula:
    'n-te Wurzel: x = a^(1/n) ; Quadratwurzel: x = √a = a^(1/2)',
  intro:
    'Der Wurzelrechner zieht die Wurzel aus einer Zahl: standardmäßig die Quadratwurzel, auf Wunsch aber jede beliebige n-te Wurzel. Die n-te Wurzel ist die Umkehrung des Potenzierens – die Zahl, die n-mal mit sich selbst multipliziert wieder den Ausgangswert ergibt. Zur Kontrolle zeigt der Rechner die Gegenprobe.',
  inputs: [
    { type: 'number', id: 'radikand', label: 'Zahl (Radikand)', default: 144, min: 0, step: 0.01, help: 'Die Zahl, aus der die Wurzel gezogen wird.' },
    { type: 'number', id: 'grad', label: 'Wurzelgrad n', default: 2, min: 1, step: 1, help: '2 = Quadratwurzel, 3 = Kubikwurzel, 4 = vierte Wurzel usw.' },
  ],
  compute: (v) => {
    const a = num(v.radikand);
    let n = Math.round(num(v.grad));
    if (n < 1) n = 1;
    let wurzel = 0;
    if (a >= 0) {
      wurzel = Math.pow(a, 1 / n);
    } else {
      // negative Radikanden nur bei ungeradem Grad reell
      wurzel = n % 2 === 1 ? -Math.pow(-a, 1 / n) : 0;
    }
    const probe = Math.pow(wurzel, n);
    return [
      { label: 'Wurzel', value: wurzel, digits: 6, primary: true },
      { label: 'Probe (Wurzel hoch n)', value: probe, digits: 4, help: 'Sollte wieder der Ausgangszahl entsprechen.' },
      { label: 'Quadrat der Zahl', value: a * a, digits: 4, help: 'Zum Vergleich: die Eingabezahl mit sich selbst multipliziert.' },
    ];
  },
  howto: [
    'Gib die Zahl ein, aus der du die Wurzel ziehen willst.',
    'Wähle den Wurzelgrad: 2 für die Quadratwurzel, 3 für die Kubikwurzel usw.',
    'Lies das Ergebnis ab.',
    'Prüfe mit der Gegenprobe, ob „Wurzel hoch n" wieder die Ausgangszahl ergibt.',
  ],
  faq: [
    {
      q: 'Was ist die Quadratwurzel?',
      a: 'Die Quadratwurzel einer Zahl a ist die positive Zahl, die mit sich selbst multipliziert a ergibt. √144 = 12, weil 12 × 12 = 144.',
    },
    {
      q: 'Was ist die Kubikwurzel?',
      a: 'Die Kubikwurzel (dritte Wurzel) ist die Zahl, die dreimal mit sich selbst multipliziert die Ausgangszahl ergibt. Die Kubikwurzel aus 27 ist 3, weil 3 × 3 × 3 = 27.',
    },
    {
      q: 'Kann man die Wurzel aus einer negativen Zahl ziehen?',
      a: 'Im Reellen nur bei ungeradem Wurzelgrad: Die dritte Wurzel aus −8 ist −2. Eine reelle Quadratwurzel aus einer negativen Zahl existiert nicht; hier gibt der Rechner 0 aus.',
    },
    {
      q: 'Was bedeutet der Wurzelgrad n?',
      a: 'Der Grad n gibt an, wie oft die gesuchte Zahl mit sich selbst multipliziert werden muss. Die n-te Wurzel berechnet sich als a hoch 1/n.',
    },
  ],
  related: ['quader-volumen-rechner', 'kreis-rechner', 'durchschnitt-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { radikand: 144, grad: 2 },
      expect: [{ label: 'Wurzel', value: 12, tolerance: 0.0001 }],
    },
    {
      values: { radikand: 27, grad: 3 },
      expect: [{ label: 'Wurzel', value: 3, tolerance: 0.0001 }],
    },
  ],
};
