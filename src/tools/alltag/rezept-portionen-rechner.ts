import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'rezept-portionen-rechner',
  category: 'alltag',
  title: 'Rezept-Portionen umrechnen',
  shortTitle: 'Portionen umrechnen',
  description:
    'Rechne die Menge einer Rezept-Zutat von der Original-Portionszahl auf die gewünschte Portionszahl hoch oder herunter – schnell und genau.',
  keywords: [
    'rezept umrechnen',
    'portionen umrechnen',
    'rezept hochrechnen',
    'zutaten umrechnen rechner',
    'rezept fuer mehr personen',
    'mengen umrechnen kochen',
    'rezept skalieren',
  ],
  formula: 'Neue Menge = Original-Menge × (gewünschte Portionen / Original-Portionen)',
  inputs: [
    { type: 'number', id: 'orig_portionen', label: 'Original-Portionen', default: 4, min: 1, step: 1, help: 'Für wie viele Portionen ist das Rezept gedacht?' },
    { type: 'number', id: 'ziel_portionen', label: 'Gewünschte Portionen', default: 6, min: 1, step: 1 },
    { type: 'number', id: 'menge', label: 'Zutaten-Menge im Rezept', default: 250, min: 0, step: 1, help: 'Beliebige Einheit, z. B. Gramm, ml oder Stück.' },
  ],
  compute: (v) => {
    const origP = num(v.orig_portionen, 1);
    const zielP = num(v.ziel_portionen, 1);
    const menge = num(v.menge);
    const faktor = origP > 0 ? zielP / origP : 0;
    const neueMenge = menge * faktor;
    return [
      { label: 'Neue Zutaten-Menge', value: neueMenge, digits: 1, primary: true, help: 'In derselben Einheit wie die Eingabe.' },
      { label: 'Umrechnungs-Faktor', value: faktor, digits: 3 },
      { label: 'Menge pro Portion', value: zielP > 0 ? neueMenge / zielP : 0, digits: 1 },
    ];
  },
  intro:
    'Wenn ein Rezept für 4 Personen gedacht ist, du aber für 6 kochst, musst du jede Zutat anpassen. Dieser Rechner ermittelt den Umrechnungs-Faktor und passt die Menge jeder Zutat exakt an. Trage die Menge nacheinander für jede Zutat ein – die Einheit bleibt immer gleich.',
  howto: [
    'Trage ein, für wie viele Portionen das Original-Rezept gedacht ist.',
    'Gib die gewünschte Portionszahl ein.',
    'Trage die Menge einer Zutat aus dem Rezept ein (z. B. 250 g Mehl).',
    'Lies die neue Menge ab und wiederhole den Schritt für jede weitere Zutat.',
  ],
  faq: [
    { q: 'Funktioniert das für alle Zutaten?', a: 'Ja, der Faktor gilt für jede Zutat gleich. Trage einfach jede Menge einzeln ein und übernimm das Ergebnis.' },
    { q: 'Kann ich auch herunterrechnen?', a: 'Ja. Wenn die gewünschte Portionszahl kleiner ist als die Original-Portionen, wird die Menge entsprechend reduziert.' },
    { q: 'Gilt der Faktor auch für Backzeiten?', a: 'Nein. Back- und Garzeiten skalieren nicht linear mit der Menge. Der Faktor gilt nur für die Zutaten-Mengen, nicht für die Zeit oder Temperatur.' },
    { q: 'Was ist mit Gewürzen und Salz?', a: 'Bei Gewürzen lohnt es sich, zunächst etwas weniger als den errechneten Wert zu nehmen und am Ende abzuschmecken, da der Geschmack nicht immer linear skaliert.' },
  ],
  related: ['cup-in-gramm-rechner', 'partymengen-rechner', 'getraenke-pro-gast-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { orig_portionen: 4, ziel_portionen: 6, menge: 250 },
      expect: [
        { label: 'Neue Zutaten-Menge', value: 375, tolerance: 0.1 },
        { label: 'Umrechnungs-Faktor', value: 1.5, tolerance: 0.001 },
      ],
    },
    {
      values: { orig_portionen: 4, ziel_portionen: 2, menge: 500 },
      expect: [{ label: 'Neue Zutaten-Menge', value: 250, tolerance: 0.1 }],
    },
  ],
};
