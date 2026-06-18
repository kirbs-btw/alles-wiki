import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

/**
 * Esslöffel/Teelöffel in Gramm – Küchen-Richtwerte je Zutat.
 * Basis: gestrichener Esslöffel (EL) ≈ 15 ml, Teelöffel (TL) ≈ 5 ml.
 * Gramm-Werte sind übliche gestrichene Mengen je Zutat (Quelle: gängige Küchentabellen).
 */
// Gramm pro gestrichenem Esslöffel je Zutat
const GRAMM_PRO_EL: Record<string, number> = {
  zucker: 15,
  mehl: 10,
  salz: 18,
  oel: 13,
  honig: 20,
  butter: 15,
  reis: 14,
  kakao: 8,
  haferflocken: 7,
  wasser: 15,
};

const TL_ANTEIL = 1 / 3; // 1 EL ≈ 3 TL

export const tool: Tool = {
  slug: 'loeffel-in-gramm-rechner',
  category: 'alltag',
  title: 'Löffel in Gramm umrechnen (EL/TL)',
  shortTitle: 'Löffel in Gramm',
  description:
    'Rechne Esslöffel und Teelöffel in Gramm um – für Zucker, Mehl, Salz, Öl, Honig und mehr. Praktisch, wenn keine Küchenwaage zur Hand ist.',
  keywords: [
    'loeffel in gramm',
    'esslöffel in gramm',
    'teeloeffel in gramm',
    'el in gramm umrechnen',
    'wie viel gramm ein esslöffel',
    'loeffel gramm tabelle',
  ],
  formula:
    'Gramm = Löffelmenge × Gramm-pro-EL der Zutat (Teelöffel = ein Drittel eines Esslöffels)',
  inputs: [
    {
      type: 'number',
      id: 'menge',
      label: 'Anzahl Löffel',
      unit: 'Löffel',
      default: 2,
      min: 0,
      max: 50,
      step: 0.5,
    },
    {
      type: 'select',
      id: 'loeffel',
      label: 'Löffelart',
      default: 'el',
      options: [
        { value: 'el', label: 'Esslöffel (EL)' },
        { value: 'tl', label: 'Teelöffel (TL)' },
      ],
    },
    {
      type: 'select',
      id: 'zutat',
      label: 'Zutat',
      default: 'zucker',
      options: [
        { value: 'zucker', label: 'Zucker' },
        { value: 'mehl', label: 'Mehl' },
        { value: 'salz', label: 'Salz' },
        { value: 'oel', label: 'Öl' },
        { value: 'honig', label: 'Honig' },
        { value: 'butter', label: 'Butter (weich)' },
        { value: 'reis', label: 'Reis (roh)' },
        { value: 'kakao', label: 'Kakaopulver' },
        { value: 'haferflocken', label: 'Haferflocken' },
        { value: 'wasser', label: 'Wasser' },
      ],
    },
  ],
  compute: (v) => {
    const menge = Math.max(0, num(v.menge, 0));
    const loeffel = String(v.loeffel || 'el');
    const zutat = String(v.zutat || 'zucker');
    const gprEl = GRAMM_PRO_EL[zutat] ?? GRAMM_PRO_EL.zucker;
    const gramm = loeffel === 'tl' ? menge * gprEl * TL_ANTEIL : menge * gprEl;
    return [
      { label: 'Gewicht', value: gramm, unit: 'g', digits: 1, primary: true },
      { label: 'Gramm je Esslöffel', value: gprEl, unit: 'g', digits: 0 },
    ];
  },
  intro:
    'Wenn keine Waage zur Hand ist, helfen Löffel als Maß. Ein gestrichener Esslöffel fasst rund 15 ml, ein Teelöffel etwa 5 ml – das Gewicht hängt aber von der Zutat ab: Salz ist schwerer als Mehl. Dieser Rechner nutzt übliche Küchen-Richtwerte für gestrichene Löffel. Gehäufte Löffel enthalten deutlich mehr.',
  howto: [
    'Gib die Anzahl der Löffel ein (auch halbe Löffel möglich).',
    'Wähle Esslöffel oder Teelöffel.',
    'Wähle die Zutat – die Dichte wird automatisch verwendet.',
    'Lies das Gewicht in Gramm ab.',
  ],
  faq: [
    { q: 'Wie viel Gramm ist ein Esslöffel Zucker?', a: 'Ein gestrichener Esslöffel Zucker wiegt etwa 15 g. Gehäuft sind es eher 20–25 g.' },
    { q: 'Gestrichen oder gehäuft?', a: 'Die Werte hier gelten für gestrichene Löffel. Ein gehäufter Löffel enthält je nach Zutat 30–60 % mehr.' },
    { q: 'Wie viele Teelöffel sind ein Esslöffel?', a: 'Etwa drei Teelöffel ergeben einen Esslöffel. Der Rechner setzt einen Teelöffel daher mit einem Drittel an.' },
    { q: 'Sind die Werte exakt?', a: 'Es sind Küchen-Richtwerte. Für präzises Backen ist eine Waage genauer; zum Würzen und Kochen sind Löffelmaße aber völlig ausreichend.' },
  ],
  related: ['cup-in-gramm-rechner', 'kaffeepulver-dosierung-rechner', 'rezept-portionen-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { menge: 2, loeffel: 'el', zutat: 'zucker' },
      // 2 * 15 = 30 g; gramm je EL = 15
      expect: [
        { label: 'Gewicht', value: 30, tolerance: 0.1 },
        { label: 'Gramm je Esslöffel', value: 15, tolerance: 0 },
      ],
    },
    {
      values: { menge: 3, loeffel: 'tl', zutat: 'salz' },
      // 3 * 18 * (1/3) = 18 g
      expect: [{ label: 'Gewicht', value: 18, tolerance: 0.1 }],
    },
  ],
};
