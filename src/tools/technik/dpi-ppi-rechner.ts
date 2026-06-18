import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

const CM_PRO_ZOLL = 2.54;

export const tool: Tool = {
  slug: 'dpi-ppi-rechner',
  category: 'technik',
  title: 'DPI / PPI-Rechner',
  shortTitle: 'DPI / PPI',
  description:
    'Berechne die Pixeldichte (PPI/DPI) aus Auflösung und Bildschirmdiagonale oder die Druckgröße eines Bildes bei gewünschter DPI-Auflösung.',
  keywords: [
    'dpi rechner',
    'ppi berechnen',
    'pixeldichte berechnen',
    'dpi druckgröße',
    'auflösung dpi',
    'bildschirm ppi',
    'dpi für druck',
  ],
  formula: 'PPI = √(Breite² + Höhe²) / Diagonale(Zoll); Druckgröße(cm) = Pixel / DPI × 2,54',
  inputs: [
    { type: 'number', id: 'breitePx', label: 'Breite in Pixel', unit: 'px', default: 1920, min: 1, step: 1 },
    { type: 'number', id: 'hoehePx', label: 'Höhe in Pixel', unit: 'px', default: 1080, min: 1, step: 1 },
    { type: 'number', id: 'diagonale', label: 'Bildschirmdiagonale', unit: 'Zoll', default: 24, min: 0, step: 0.1, help: 'Nur für die PPI-Berechnung eines Bildschirms relevant.' },
    { type: 'number', id: 'dpiDruck', label: 'Druckauflösung', unit: 'DPI', default: 300, min: 1, step: 10, help: 'Für die Druckgröße: 300 DPI gilt als Standard für Fotodrucke.' },
  ],
  compute: (v) => {
    const bPx = num(v.breitePx);
    const hPx = num(v.hoehePx);
    const diag = num(v.diagonale);
    const dpi = num(v.dpiDruck);
    const diagPx = Math.sqrt(bPx * bPx + hPx * hPx);
    const ppi = diag > 0 ? diagPx / diag : 0;
    const breiteCm = dpi > 0 ? (bPx / dpi) * CM_PRO_ZOLL : 0;
    const hoeheCm = dpi > 0 ? (hPx / dpi) * CM_PRO_ZOLL : 0;
    return [
      { label: 'Pixeldichte (PPI)', value: ppi, unit: 'ppi', digits: 1, primary: true },
      { label: 'Druckbreite', value: breiteCm, unit: 'cm', digits: 2, help: `Bei ${num(v.dpiDruck)} DPI.` },
      { label: 'Druckhöhe', value: hoeheCm, unit: 'cm', digits: 2 },
      { label: 'Diagonale in Pixel', value: diagPx, unit: 'px', digits: 0 },
    ];
  },
  intro:
    'PPI (Pixel pro Zoll) und DPI (Dots per Inch) beschreiben die Pixel- bzw. Punktdichte. Bei Bildschirmen ergibt sich die Schärfe aus Auflösung und Diagonale: Je kleiner der Bildschirm bei gleicher Auflösung, desto höher die PPI. Beim Druck legt die DPI fest, wie groß ein Foto erscheinen darf, bevor es pixelig wirkt – 300 DPI gilt als Standard für Fotoqualität.',
  howto: [
    'Auflösung des Bildes oder Bildschirms in Pixeln eingeben (Breite × Höhe).',
    'Für die PPI eines Bildschirms die Diagonale in Zoll eintragen.',
    'Für die Druckgröße die gewünschte Druckauflösung in DPI angeben (z. B. 300).',
    'Pixeldichte und die maximale Druckgröße in Zentimetern ablesen.',
  ],
  faq: [
    { q: 'Was ist der Unterschied zwischen DPI und PPI?', a: 'PPI bezieht sich auf Pixel auf einem Bildschirm, DPI auf Druckpunkte beim Drucker. Im Alltag werden beide Begriffe oft synonym genutzt, weil die Rechnung identisch ist: Punkte bzw. Pixel pro Zoll.' },
    { q: 'Wie viele DPI brauche ich für guten Druck?', a: '300 DPI ist der Standard für Fotos und Druckereien. Großformate wie Poster, die aus Entfernung betrachtet werden, kommen oft mit 150 DPI aus.' },
    { q: 'Wie berechne ich die PPI eines Monitors?', a: 'Bilde die Pixel-Diagonale mit dem Satz des Pythagoras (√(Breite² + Höhe²)) und teile sie durch die Bildschirmdiagonale in Zoll. Ein 24-Zoll-Full-HD-Monitor erreicht so rund 92 PPI.' },
    { q: 'Welche Druckgröße ist bei meinem Foto sinnvoll?', a: 'Teile die Pixelzahl durch 300 und multipliziere mit 2,54, um die Größe in cm bei Fotoqualität zu erhalten. Ein 6000×4000-Foto ergibt so etwa 50,8 × 33,9 cm.' },
  ],
  related: ['megapixel-rechner', 'seitenverhaeltnis-rechner', 'speicherbedarf-fotos'],
  updated: '2026-06-18',
  examples: [
    {
      values: { breitePx: 1920, hoehePx: 1080, diagonale: 24, dpiDruck: 300 },
      expect: [{ label: 'Pixeldichte (PPI)', value: 91.8, tolerance: 0.3 }],
    },
    {
      values: { breitePx: 3000, hoehePx: 2400, diagonale: 27, dpiDruck: 300 },
      expect: [{ label: 'Druckbreite', value: 25.4, tolerance: 0.05 }],
    },
  ],
};
