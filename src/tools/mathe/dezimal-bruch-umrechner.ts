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
  slug: 'dezimal-bruch-umrechner',
  category: 'mathe',
  title: 'Dezimalzahl in Bruch umwandeln – gekürzter Bruch aus Kommazahl',
  shortTitle: 'Dezimal → Bruch',
  description:
    'Wandle eine Dezimalzahl (Kommazahl) in einen vollständig gekürzten Bruch um. Der Rechner ermittelt Zähler und Nenner und kürzt mit dem größten gemeinsamen Teiler.',
  keywords: [
    'dezimalzahl in bruch',
    'kommazahl in bruch',
    'dezimal bruch umrechner',
    'bruch aus dezimalzahl',
    '0 75 als bruch',
    'dezimalzahl umwandeln',
  ],
  formula:
    'Zahl mit d Nachkommastellen = (Zahl · 10^d) / 10^d, danach mit dem ggT kürzen',
  intro:
    'Eine endliche Dezimalzahl lässt sich exakt als Bruch schreiben. Dazu schiebt man das Komma um so viele Stellen nach rechts, wie Nachkommastellen vorhanden sind, und teilt durch die passende Zehnerpotenz. Anschließend wird der Bruch mit dem größten gemeinsamen Teiler vollständig gekürzt. Der Rechner verarbeitet bis zu acht Nachkommastellen.',
  inputs: [
    { type: 'number', id: 'dezimal', label: 'Dezimalzahl', default: 0.75, step: 0.0001, help: 'Z. B. 0,75 oder 2,5 (endliche Kommazahl).' },
    { type: 'number', id: 'stellen', label: 'Berücksichtigte Nachkommastellen', default: 4, min: 0, max: 8, step: 1, help: 'Auf wie viele Nachkommastellen gerundet wird.' },
  ],
  compute: (v) => {
    const dezimal = num(v.dezimal);
    const stellen = Math.min(8, Math.max(0, Math.round(num(v.stellen))));
    const faktor = Math.pow(10, stellen);
    const vorzeichen = dezimal < 0 ? -1 : 1;
    let zaehler = Math.round(Math.abs(dezimal) * faktor);
    let nenner = faktor;
    const g = gcd(zaehler, nenner);
    zaehler = (zaehler / g) * vorzeichen;
    nenner = nenner / g;
    const ganzzahl = Math.trunc(zaehler / nenner);
    const restZaehler = Math.abs(zaehler - ganzzahl * nenner);
    return [
      { label: 'Zähler', value: zaehler, digits: 0, primary: true },
      { label: 'Nenner', value: nenner, digits: 0 },
      { label: 'Als gemischte Zahl', value: nenner > 1 && Math.abs(zaehler) > nenner ? `${ganzzahl} und ${restZaehler}/${nenner}` : `${zaehler}/${nenner}` },
      { label: 'Probe (Dezimalwert)', value: nenner !== 0 ? zaehler / nenner : 0, digits: 8 },
    ];
  },
  howto: [
    'Gib die Dezimalzahl ein, z. B. 0,75.',
    'Wähle, auf wie viele Nachkommastellen gerundet werden soll.',
    'Lies den gekürzten Bruch aus Zähler und Nenner sowie die gemischte Schreibweise ab.',
  ],
  faq: [
    {
      q: 'Wie wandle ich 0,75 in einen Bruch um?',
      a: '0,75 hat zwei Nachkommastellen, also 75/100. Gekürzt mit dem ggT 25 ergibt das 3/4.',
    },
    {
      q: 'Kann jede Dezimalzahl als Bruch dargestellt werden?',
      a: 'Jede endliche oder periodische Dezimalzahl ist rational und damit ein Bruch. Der Rechner verarbeitet endliche Dezimalzahlen bis zu acht Nachkommastellen exakt.',
    },
    {
      q: 'Was ist eine gemischte Zahl?',
      a: 'Ein unechter Bruch wie 5/2 lässt sich als gemischte Zahl 2 und 1/2 schreiben: eine ganze Zahl plus ein echter Bruch.',
    },
  ],
  related: ['bruchrechner', 'ggt-kgv-rechner', 'verhaeltnis-kuerzen-rechner'],
  updated: '2026-06-19',
  examples: [
    {
      values: { dezimal: 0.75, stellen: 4 },
      expect: [
        { label: 'Zähler', value: 3, tolerance: 0 },
        { label: 'Nenner', value: 4, tolerance: 0 },
      ],
    },
    {
      values: { dezimal: 2.5, stellen: 4 },
      expect: [
        { label: 'Zähler', value: 5, tolerance: 0 },
        { label: 'Nenner', value: 2, tolerance: 0 },
      ],
    },
  ],
};
