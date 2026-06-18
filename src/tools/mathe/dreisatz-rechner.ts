import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'dreisatz-rechner',
  category: 'mathe',
  title: 'Dreisatz-Rechner (proportional & antiproportional)',
  shortTitle: 'Dreisatz',
  description:
    'Löse Dreisatz-Aufgaben in Sekunden: aus drei bekannten Werten den vierten berechnen – proportional (je mehr, desto mehr) oder antiproportional (je mehr, desto weniger).',
  keywords: [
    'dreisatz rechner',
    'dreisatz berechnen',
    'proportionaler dreisatz',
    'antiproportionaler dreisatz',
    'verhältnisgleichung lösen',
    'dreisatz formel',
    'vierte größe berechnen',
    'dreisatz online',
  ],
  formula:
    'Proportional: x = b · (c / a)  |  Antiproportional: x = b · (a / c)',
  intro:
    'Der Dreisatz ist eine der wichtigsten Grundrechenarten des Alltags: Aus drei bekannten Werten ermittelst du den gesuchten vierten. Beim proportionalen Dreisatz wachsen beide Größen gemeinsam (mehr Ware kostet mehr Geld). Beim antiproportionalen Dreisatz verhalten sie sich gegenläufig (mehr Arbeiter brauchen weniger Zeit).',
  inputs: [
    {
      type: 'select',
      id: 'art',
      label: 'Art des Dreisatzes',
      default: 'prop',
      options: [
        { value: 'prop', label: 'Proportional (je mehr, desto mehr)' },
        { value: 'antiprop', label: 'Antiproportional (je mehr, desto weniger)' },
      ],
      help: 'Proportional: doppelte Menge = doppelter Wert. Antiproportional: doppelte Menge = halber Wert.',
    },
    { type: 'number', id: 'a', label: 'Größe A (links)', default: 3, step: 0.01, help: 'Bekannter Wert der ersten Spalte.' },
    { type: 'number', id: 'b', label: 'Wert B (zu A gehörend)', default: 12, step: 0.01, help: 'Bekannter Wert, der zu A gehört.' },
    { type: 'number', id: 'c', label: 'Größe C (gesucht zu C gehört X)', default: 7, step: 0.01, help: 'Neuer Wert der ersten Spalte, für den X gesucht wird.' },
  ],
  compute: (v) => {
    const art = String(v.art);
    const a = num(v.a);
    const b = num(v.b);
    const c = num(v.c);
    const einheit = a !== 0 ? b / a : 0;
    let x = 0;
    if (art === 'prop') {
      x = a !== 0 ? b * (c / a) : 0;
    } else {
      x = c !== 0 ? b * (a / c) : 0;
    }
    return [
      { label: 'Gesuchter Wert X', value: x, digits: 4, primary: true },
      { label: 'Wert je 1 Einheit von A', value: einheit, digits: 4, help: 'Zwischenschritt: B geteilt durch A.' },
    ];
  },
  howto: [
    'Wähle aus, ob die Aufgabe proportional oder antiproportional ist.',
    'Gib das bekannte Paar ein: Größe A und den zugehörigen Wert B.',
    'Gib die neue Größe C ein, zu der der Wert X gesucht wird.',
    'Lies den gesuchten Wert X direkt aus dem Ergebnis ab.',
  ],
  faq: [
    {
      q: 'Wann ist ein Dreisatz proportional?',
      a: 'Wenn beide Größen im gleichen Verhältnis wachsen: Verdoppelt sich A, verdoppelt sich auch B. Beispiel: 3 Brötchen kosten 1,20 €, also kosten 6 Brötchen 2,40 €.',
    },
    {
      q: 'Wann ist ein Dreisatz antiproportional?',
      a: 'Wenn sich die Größen gegenläufig verhalten: Mehr von A bedeutet weniger von B. Beispiel: 3 Arbeiter brauchen 12 Tage, 6 Arbeiter brauchen nur 6 Tage.',
    },
    {
      q: 'Was ist der Wert je Einheit?',
      a: 'Beim proportionalen Dreisatz teilst du B durch A, um den Wert für eine einzelne Einheit zu erhalten. Diesen multiplizierst du dann mit C.',
    },
    {
      q: 'Wie erkenne ich, welche Art ich brauche?',
      a: 'Frage dich: Wenn die erste Größe größer wird, wird die zweite dann auch größer (proportional) oder kleiner (antiproportional)?',
    },
  ],
  related: ['prozentrechner', 'bruchrechner', 'durchschnitt-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { art: 'prop', a: 3, b: 12, c: 7 },
      expect: [{ label: 'Gesuchter Wert X', value: 28, tolerance: 0.001 }],
    },
    {
      values: { art: 'antiprop', a: 3, b: 12, c: 6 },
      expect: [{ label: 'Gesuchter Wert X', value: 6, tolerance: 0.001 }],
    },
  ],
};
