import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

const CM_PRO_ZOLL = 2.54;

// Empfohlener Sichtabstand als Faktor der Bildschirmdiagonale je nach Auflösung.
// Werte orientieren sich an der gängigen Empfehlung, bei der die einzelnen Pixel
// aus dem Sitzabstand nicht mehr unterscheidbar sind.
const FAKTOR: Record<string, number> = {
  hd: 2.5, // 720p / 1080p
  uhd: 1.5, // 4K
  uhd8k: 0.75, // 8K
};

export const tool: Tool = {
  slug: 'tv-groesse-sichtabstand-rechner',
  category: 'technik',
  title: 'TV-Größe & Sichtabstand-Rechner',
  shortTitle: 'TV-Sichtabstand',
  description:
    'Berechne den optimalen Sitzabstand zum Fernseher aus Bildschirmdiagonale und Auflösung – oder die passende TV-Größe für deinen Abstand.',
  keywords: [
    'tv sichtabstand berechnen',
    'optimaler sitzabstand fernseher',
    'tv größe rechner',
    'sitzabstand 4k fernseher',
    'wie groß tv abstand',
    'fernseher abstand zoll',
  ],
  formula: 'Sitzabstand = Diagonale(Zoll) × 2,54 × Faktor (HD 2,5 · 4K 1,5 · 8K 0,75)',
  inputs: [
    { type: 'number', id: 'diagonale', label: 'Bildschirmdiagonale', unit: 'Zoll', default: 55, min: 1, step: 1, help: 'Die Zoll-Angabe des Fernsehers (Diagonale).' },
    {
      type: 'select',
      id: 'aufloesung',
      label: 'Auflösung',
      default: 'uhd',
      options: [
        { value: 'hd', label: 'HD / Full-HD (720p–1080p)' },
        { value: 'uhd', label: '4K / UHD (2160p)' },
        { value: 'uhd8k', label: '8K' },
      ],
      help: 'Höher aufgelöste TVs erlauben einen näheren Sitzabstand.',
    },
  ],
  compute: (v) => {
    const diagZoll = num(v.diagonale);
    const diagCm = diagZoll * CM_PRO_ZOLL;
    const faktor = FAKTOR[String(v.aufloesung)] ?? FAKTOR.uhd;
    const abstandCm = diagCm * faktor;
    return [
      { label: 'Empfohlener Sitzabstand', value: abstandCm / 100, unit: 'm', digits: 2, primary: true },
      { label: 'Sitzabstand in cm', value: abstandCm, unit: 'cm', digits: 0 },
      { label: 'Diagonale in cm', value: diagCm, unit: 'cm', digits: 1 },
    ];
  },
  intro:
    'Der ideale Abstand zum Fernseher hängt von Diagonale und Auflösung ab. Je höher die Auflösung, desto näher darfst du sitzen, ohne dass einzelne Pixel sichtbar werden. Als grobe Faustregel gilt das 2,5-fache der Diagonale bei Full-HD und nur das 1,5-fache bei 4K. Dieser Rechner setzt die Zoll-Diagonale in einen empfohlenen Sitzabstand um – ideal für die Wohnzimmerplanung.',
  howto: [
    'Bildschirmdiagonale des Fernsehers in Zoll eingeben.',
    'Auflösung wählen (Full-HD, 4K oder 8K).',
    'Den empfohlenen Sitzabstand in Metern ablesen.',
  ],
  faq: [
    { q: 'Wie weit sollte ich von einem 55-Zoll-4K-TV weg sitzen?', a: 'Bei 4K rechnet man etwa mit dem 1,5-fachen der Diagonale. 55 Zoll entsprechen rund 140 cm, also etwa 2,1 m Sitzabstand. Wer näher sitzt, profitiert besonders von der höheren Auflösung.' },
    { q: 'Warum darf man bei 4K näher sitzen als bei Full-HD?', a: 'Bei gleicher Diagonale hat 4K viermal so viele Pixel. Die einzelnen Bildpunkte sind kleiner und verschmelzen schon aus geringerem Abstand zu einem scharfen Bild.' },
    { q: 'Ist das eine feste Regel?', a: 'Nein, es ist eine Orientierung. Persönliche Vorlieben, Raumgröße und der gewünschte „Kino-Effekt“ spielen eine Rolle. Viele Menschen sitzen heute bewusst näher, um ein großes Bild zu genießen.' },
  ],
  related: ['seitenverhaeltnis-rechner', 'dpi-ppi-rechner', 'beamer-projektionsabstand-rechner'],
  updated: '2026-06-19',
  examples: [
    {
      values: { diagonale: 55, aufloesung: 'uhd' },
      // 55 * 2,54 = 139,7 cm; * 1,5 = 209,55 cm = 2,0955 m
      expect: [
        { label: 'Empfohlener Sitzabstand', value: 2.1, tolerance: 0.01 },
        { label: 'Sitzabstand in cm', value: 209.55, tolerance: 0.5 },
      ],
    },
    {
      values: { diagonale: 40, aufloesung: 'hd' },
      // 40 * 2,54 = 101,6 cm; * 2,5 = 254 cm = 2,54 m
      expect: [{ label: 'Empfohlener Sitzabstand', value: 2.54, tolerance: 0.01 }],
    },
  ],
};
