import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

function ggt(a: number, b: number): number {
  a = Math.abs(Math.round(a));
  b = Math.abs(Math.round(b));
  while (b) {
    [a, b] = [b, a % b];
  }
  return a || 1;
}

export const tool: Tool = {
  slug: 'megapixel-rechner',
  category: 'technik',
  title: 'Megapixel-Rechner',
  shortTitle: 'Megapixel',
  description:
    'Berechne die Megapixel aus Bildbreite und -höhe und finde heraus, wie groß du ein Foto bei guter Qualität ausdrucken kannst.',
  keywords: [
    'megapixel berechnen',
    'megapixel rechner',
    'auflösung in megapixel',
    'pixel in megapixel',
    'kamera megapixel',
    'megapixel druckgröße',
    'bildauflösung berechnen',
  ],
  formula: 'Megapixel = Breite × Höhe / 1.000.000; max. Druckgröße = Pixel / DPI × 2,54 cm',
  inputs: [
    { type: 'number', id: 'breite', label: 'Breite in Pixel', unit: 'px', default: 6000, min: 1, step: 1 },
    { type: 'number', id: 'hoehe', label: 'Höhe in Pixel', unit: 'px', default: 4000, min: 1, step: 1 },
    { type: 'number', id: 'druckDpi', label: 'Druckauflösung', unit: 'DPI', default: 300, min: 1, step: 10, help: '300 DPI = Fotoqualität, 150 DPI = ausreichend für Poster.' },
  ],
  compute: (v) => {
    const b = num(v.breite);
    const h = num(v.hoehe);
    const dpi = num(v.druckDpi);
    const pixel = b * h;
    const mp = pixel / 1e6;
    const teiler = ggt(b, h);
    const rb = teiler > 0 ? Math.round(b / teiler) : b;
    const rh = teiler > 0 ? Math.round(h / teiler) : h;
    const breiteCm = dpi > 0 ? (b / dpi) * 2.54 : 0;
    const hoeheCm = dpi > 0 ? (h / dpi) * 2.54 : 0;
    return [
      { label: 'Megapixel', value: mp, unit: 'MP', digits: 2, primary: true },
      { label: 'Pixel gesamt', value: pixel, digits: 0 },
      { label: 'Seitenverhältnis', value: `${rb}:${rh}` },
      { label: 'Max. Druckgröße', value: `${breiteCm.toFixed(1)} × ${hoeheCm.toFixed(1)} cm`, help: `Bei ${num(v.druckDpi)} DPI.` },
    ];
  },
  intro:
    'Die Megapixel-Zahl ergibt sich aus Breite × Höhe in Pixeln geteilt durch eine Million. Eine 24-Megapixel-Kamera liefert beispielsweise 6000 × 4000 Pixel. Wichtiger als die reine Zahl ist oft die mögliche Druckgröße: Dieser Rechner zeigt, wie groß dein Foto bei einer gewählten Druckauflösung scharf bleibt.',
  howto: [
    'Bildbreite und -höhe in Pixeln eingeben (steht in den Bildinfos deiner Kamera).',
    'Die Megapixel-Zahl und das Seitenverhältnis ablesen.',
    'Gewünschte Druckauflösung wählen (300 DPI für Fotoqualität, 150 DPI für Poster).',
    'Die maximale Druckgröße in Zentimetern ablesen.',
  ],
  faq: [
    { q: 'Wie viele Megapixel hat 1920×1080?', a: '1920 × 1080 = 2.073.600 Pixel, also rund 2,1 Megapixel. Full-HD ist somit deutlich weniger, als moderne Kameras liefern.' },
    { q: 'Wie viele Megapixel brauche ich für gute Fotos?', a: 'Für Abzüge bis 20×30 cm reichen 6–8 Megapixel. 24 Megapixel erlauben bereits Poster, mehr lohnt sich vor allem für starke Ausschnitte und sehr große Drucke.' },
    { q: 'Sind mehr Megapixel automatisch besser?', a: 'Nein. Sensorgröße, Objektiv und Lichtverhältnisse beeinflussen die Bildqualität oft stärker. Sehr viele Pixel auf kleinem Sensor können sogar mehr Bildrauschen verursachen.' },
    { q: 'Wie groß kann ich ein 12-MP-Handyfoto drucken?', a: 'Ein typisches 12-MP-Foto hat etwa 4000 × 3000 Pixel. Bei 300 DPI ergibt das rund 33,9 × 25,4 cm in Fotoqualität – also etwa A4.' },
  ],
  related: ['speicherbedarf-fotos', 'dpi-ppi-rechner', 'seitenverhaeltnis-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { breite: 6000, hoehe: 4000, druckDpi: 300 },
      expect: [
        { label: 'Megapixel', value: 24, tolerance: 0.01 },
        { label: 'Pixel gesamt', value: 24000000, tolerance: 1 },
      ],
    },
    {
      values: { breite: 1920, hoehe: 1080, druckDpi: 300 },
      expect: [{ label: 'Megapixel', value: 2.07, tolerance: 0.01 }],
    },
  ],
};
