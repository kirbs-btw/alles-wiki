import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'wandfarbe-rechner',
  category: 'wohnen',
  title: 'Wandfarbe-Rechner',
  shortTitle: 'Farbbedarf',
  description:
    'Berechne, wie viele Liter Wandfarbe du für einen Raum brauchst – aus Wandfläche, Anstrichzahl und Ergiebigkeit der Farbe.',
  keywords: [
    'wandfarbe rechner',
    'wie viel farbe pro qm',
    'farbbedarf berechnen',
    'liter wandfarbe',
    'farbe streichen menge',
    'wandfarbe qm rechner',
  ],
  formula: 'Liter = (Wandfläche × Anstriche) / Ergiebigkeit (m² je Liter)',
  inputs: [
    { type: 'number', id: 'flaeche', label: 'Zu streichende Wandfläche', unit: 'm²', default: 45, min: 1, step: 0.5, help: 'Wandflächen ohne Türen und Fenster.' },
    { type: 'number', id: 'anstriche', label: 'Anzahl Anstriche', unit: 'Anstriche', default: 2, min: 1, max: 4, step: 1 },
    { type: 'number', id: 'ergiebigkeit', label: 'Ergiebigkeit der Farbe', unit: 'm²/l', default: 7, min: 1, step: 0.5, help: 'Steht meist auf dem Eimer, oft 6–8 m² pro Liter.' },
  ],
  compute: (v) => {
    const flaeche = num(v.flaeche);
    const anstriche = num(v.anstriche);
    const ergiebigkeit = num(v.ergiebigkeit);
    const liter = ergiebigkeit > 0 ? (flaeche * anstriche) / ergiebigkeit : 0;
    const proAnstrich = ergiebigkeit > 0 ? flaeche / ergiebigkeit : 0;
    return [
      { label: 'Benötigte Farbe', value: liter, unit: 'l', digits: 2, primary: true },
      { label: 'Farbe je Anstrich', value: proAnstrich, unit: 'l', digits: 2 },
      { label: 'Gesamtfläche aller Anstriche', value: flaeche * anstriche, unit: 'm²', digits: 1 },
    ];
  },
  intro:
    'Der Wandfarbe-Rechner sagt dir, wie viele Liter du kaufen musst. Maßgeblich sind die Wandfläche, die Zahl der Anstriche und die Ergiebigkeit der jeweiligen Farbe. Auf stark saugendem oder dunklem Untergrund ist meist mehr Farbe nötig.',
  howto: [
    'Wandfläche bestimmen (Umfang × Höhe, Fenster und Türen abziehen).',
    'Anzahl der Anstriche wählen – Neuanstrich meist 2.',
    'Ergiebigkeit vom Farbeimer übernehmen (z. B. 7 m²/l).',
    'Benötigte Litermenge ablesen und auf die nächste Gebindegröße aufrunden.',
  ],
  faq: [
    { q: 'Wie viel Farbe pro Quadratmeter?', a: 'Bei einer Ergiebigkeit von 7 m²/l werden rund 0,14 Liter je Quadratmeter und Anstrich verbraucht. Bei zwei Anstrichen also etwa 0,28 Liter pro m².' },
    { q: 'Brauche ich einen oder zwei Anstriche?', a: 'Auf vorgestrichenem, hellem Untergrund reicht oft ein Anstrich. Bei Neuverputz, Farbwechsel oder dunklem Untergrund sind zwei Anstriche üblich.' },
    { q: 'Warum aufrunden?', a: 'Farbe wird nur in festen Gebindegrößen verkauft. Etwas Reserve ist sinnvoll für Ausbesserungen und falls der Untergrund mehr Farbe aufnimmt als erwartet.' },
  ],
  related: ['tapeten-rechner', 'wohnflaeche-rechner', 'raumvolumen-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { flaeche: 45, anstriche: 2, ergiebigkeit: 7 },
      expect: [
        { label: 'Benötigte Farbe', value: 12.857, tolerance: 0.01 },
        { label: 'Farbe je Anstrich', value: 6.4286, tolerance: 0.01 },
        { label: 'Gesamtfläche aller Anstriche', value: 90, tolerance: 0.01 },
      ],
    },
  ],
};
