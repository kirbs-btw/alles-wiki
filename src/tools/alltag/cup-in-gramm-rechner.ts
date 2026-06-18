import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

// Dichte-Näherungen in Gramm pro Cup (1 US-Cup = 236,588 ml).
// Werte sind übliche Küchen-Richtwerte (gehäuft/locker eingefüllt variiert real ±5 %).
const GRAMM_PRO_CUP: Record<string, number> = {
  wasser: 237, // ~1 g/ml
  mehl: 125, // Weizenmehl Type 405, locker
  zucker: 200, // weißer Kristallzucker
  puderzucker: 120,
  brauner_zucker: 220, // leicht gepresst
  butter: 227, // 1 Cup Butter ≈ 227 g (halbes US-Pfund)
  milch: 245,
  oel: 218, // Pflanzenöl ~0,92 g/ml
  honig: 340,
  reis: 195, // ungekochter Langkornreis
  haferflocken: 90,
};

const CUP_IN_ML = 236.588;

export const tool: Tool = {
  slug: 'cup-in-gramm-rechner',
  category: 'alltag',
  title: 'Cup in Gramm umrechnen',
  shortTitle: 'Cup in Gramm',
  description:
    'Rechne amerikanische Cups in Gramm und Milliliter um – mit Dichte-Werten für Mehl, Zucker, Butter, Milch und mehr für US-Backrezepte.',
  keywords: [
    'cup in gramm',
    'cup umrechnen',
    'cup in gramm mehl',
    'amerikanische masseinheiten umrechnen',
    'us cup in gramm',
    'backeinheiten umrechnen',
    'cup in ml',
  ],
  formula: 'Gramm = Cups × Gramm-pro-Cup der Zutat; Milliliter = Cups × 236,588 ml',
  inputs: [
    { type: 'number', id: 'cups', label: 'Menge', unit: 'Cups', default: 1, min: 0, step: 0.25 },
    {
      type: 'select',
      id: 'zutat',
      label: 'Zutat',
      default: 'mehl',
      options: [
        { value: 'wasser', label: 'Wasser' },
        { value: 'mehl', label: 'Mehl (Type 405)' },
        { value: 'zucker', label: 'Zucker (weiß)' },
        { value: 'puderzucker', label: 'Puderzucker' },
        { value: 'brauner_zucker', label: 'Brauner Zucker' },
        { value: 'butter', label: 'Butter' },
        { value: 'milch', label: 'Milch' },
        { value: 'oel', label: 'Öl' },
        { value: 'honig', label: 'Honig' },
        { value: 'reis', label: 'Reis (roh)' },
        { value: 'haferflocken', label: 'Haferflocken' },
      ],
    },
  ],
  compute: (v) => {
    const cups = num(v.cups);
    const zutat = String(v.zutat || 'mehl');
    const gpc = GRAMM_PRO_CUP[zutat] ?? GRAMM_PRO_CUP.mehl;
    const gramm = cups * gpc;
    const ml = cups * CUP_IN_ML;
    return [
      { label: 'Gewicht', value: gramm, unit: 'g', digits: 0, primary: true },
      { label: 'Volumen', value: ml, unit: 'ml', digits: 0 },
      { label: 'Gramm pro Cup', value: gpc, unit: 'g', digits: 0 },
    ];
  },
  intro:
    'US-amerikanische Rezepte messen Zutaten in Cups – einem Volumenmaß. Wie viele Gramm das sind, hängt von der Dichte der Zutat ab: Ein Cup Mehl wiegt deutlich weniger als ein Cup Zucker. Dieser Rechner nutzt die übliche US-Cup-Größe (236,588 ml) und gängige Küchen-Richtwerte je Zutat.',
  howto: [
    'Gib die Menge in Cups ein (auch Viertel-Schritte wie 0,75 sind möglich).',
    'Wähle die Zutat aus der Liste – die Dichte wird automatisch verwendet.',
    'Lies das Gewicht in Gramm ab.',
    'Für Flüssigkeiten nutze zusätzlich den Milliliter-Wert.',
  ],
  faq: [
    { q: 'Wie groß ist ein Cup?', a: 'Der gebräuchliche US-Cup hat 236,588 ml. In manchen älteren Rezepten oder UK-Rezepten weicht das Maß leicht ab (z. B. 250 ml metrisch).' },
    { q: 'Warum wiegt ein Cup je nach Zutat anders?', a: 'Cup ist ein Volumenmaß. Das Gewicht ergibt sich aus der Dichte: Honig ist dichter als Mehl, daher wiegt ein Cup Honig fast dreimal so viel wie ein Cup Mehl.' },
    { q: 'Wie genau sind die Werte für Mehl?', a: 'Mehl lässt sich locker oder gepresst einfüllen, das kann ±5–10 % ausmachen. Für präzises Backen empfiehlt sich eine Küchenwaage; die Richtwerte hier gelten für locker eingefülltes Mehl.' },
    { q: 'Was ist mit Esslöffel und Teelöffel?', a: '1 US-Cup entspricht 16 Esslöffeln (tablespoons) bzw. 48 Teelöffeln (teaspoons). Ein Esslöffel sind also ein Sechzehntel Cup.' },
  ],
  related: ['rezept-portionen-rechner', 'partymengen-rechner', 'verduennung-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { cups: 2, zutat: 'mehl' },
      expect: [{ label: 'Gewicht', value: 250, tolerance: 1 }],
    },
    {
      values: { cups: 1, zutat: 'butter' },
      expect: [
        { label: 'Gewicht', value: 227, tolerance: 1 },
        { label: 'Volumen', value: 237, tolerance: 1 },
      ],
    },
  ],
};
