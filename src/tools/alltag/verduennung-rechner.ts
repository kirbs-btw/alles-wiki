import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'verduennung-rechner',
  category: 'alltag',
  title: 'Verdünnung & Konzentrat-Mischung berechnen',
  shortTitle: 'Verdünnung',
  description:
    'Berechne, wie viel Konzentrat und Wasser du für eine gewünschte Verdünnung brauchst – ideal für Reiniger, Putzmittel und Dünger nach Verhältnis.',
  keywords: [
    'verduennung berechnen',
    'mischungsverhaeltnis wasser',
    'konzentrat verduennen rechner',
    'reiniger verduennen',
    '1 zu 10 verduennen',
    'putzmittel mischen',
    'duenger verduennen',
  ],
  formula: 'Konzentrat = Gesamtmenge / (Verhältnis + 1); Wasser = Gesamtmenge − Konzentrat',
  inputs: [
    { type: 'number', id: 'gesamt', label: 'Gewünschte Gesamtmenge', unit: 'ml', default: 1000, min: 0, step: 50, help: 'Fertige Mischung aus Konzentrat + Wasser.' },
    { type: 'number', id: 'verhaeltnis', label: 'Verhältnis (1 Teil Konzentrat zu X Teilen Wasser)', default: 10, min: 0, step: 1, help: 'Beispiel: 10 für eine 1:10-Verdünnung.' },
  ],
  compute: (v) => {
    const gesamt = num(v.gesamt);
    const verh = num(v.verhaeltnis);
    const teile = verh + 1; // 1 Teil Konzentrat + X Teile Wasser
    const konzentrat = teile > 0 ? gesamt / teile : 0;
    const wasser = gesamt - konzentrat;
    const konzProzent = gesamt > 0 ? (konzentrat / gesamt) * 100 : 0;
    return [
      { label: 'Konzentrat', value: konzentrat, unit: 'ml', digits: 1, primary: true },
      { label: 'Wasser', value: wasser, unit: 'ml', digits: 1 },
      { label: 'Konzentrat-Anteil', value: konzProzent, unit: '%', digits: 2 },
    ];
  },
  intro:
    'Viele Reiniger, Dünger oder Desinfektionsmittel werden als Konzentrat verkauft und müssen verdünnt werden. Eine 1:10-Verdünnung bedeutet: ein Teil Konzentrat auf zehn Teile Wasser. Dieser Rechner zerlegt deine gewünschte Gesamtmenge passend in Konzentrat und Wasser.',
  howto: [
    'Gib ein, wie viel fertige Mischung du insgesamt brauchst (z. B. 1000 ml).',
    'Trage das Verhältnis ein: die Zahl hinter dem Doppelpunkt einer Angabe wie 1:10 (also 10).',
    'Lies ab, wie viel Konzentrat du einfüllen musst.',
    'Fülle das Konzentrat ein und mit Wasser auf die Gesamtmenge auffüllen.',
  ],
  faq: [
    { q: 'Was bedeutet 1:10?', a: 'Ein Teil Konzentrat auf zehn Teile Wasser – zusammen elf Teile. Bei 1100 ml Gesamtmenge sind das 100 ml Konzentrat und 1000 ml Wasser.' },
    { q: 'Konzentrat plus 10 Teile oder 10 Teile insgesamt?', a: 'Bei der üblichen Lesart 1:10 sind es elf Teile insgesamt (1 Konzentrat + 10 Wasser). Genau so rechnet dieses Tool.' },
    { q: 'Kann ich auch für Liter rechnen?', a: 'Ja. Gib die Gesamtmenge einfach in Millilitern an (1 Liter = 1000 ml). Die Anteile bleiben gleich.' },
    { q: 'Was, wenn auf der Packung "X ml pro Liter" steht?', a: 'Das ist eine andere Angabe. Bei z. B. 50 ml pro Liter entspricht das einer 1:19-Verdünnung (50 ml Konzentrat + 950 ml Wasser je Liter).' },
  ],
  related: ['mischungsverhaeltnis-rechner', 'cup-in-gramm-rechner', 'rezept-portionen-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { gesamt: 1100, verhaeltnis: 10 },
      expect: [
        { label: 'Konzentrat', value: 100, tolerance: 0.1 },
        { label: 'Wasser', value: 1000, tolerance: 0.1 },
      ],
    },
    {
      values: { gesamt: 1000, verhaeltnis: 4 },
      expect: [{ label: 'Konzentrat', value: 200, tolerance: 0.1 }],
    },
  ],
};
