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
  slug: 'seitenverhaeltnis-rechner',
  category: 'technik',
  title: 'Seitenverhältnis-Rechner (Aspect Ratio)',
  shortTitle: 'Seitenverhältnis',
  description:
    'Berechne das Seitenverhältnis (Aspect Ratio) aus Breite und Höhe und finde die passende neue Höhe oder Breite beim Skalieren ohne Verzerrung.',
  keywords: [
    'seitenverhältnis berechnen',
    'aspect ratio rechner',
    'bildgröße skalieren',
    'seitenverhältnis 16 9',
    'proportionen berechnen',
    'auflösung umrechnen',
    'bild skalieren ohne verzerrung',
  ],
  formula: 'Verhältnis = Breite : Höhe (gekürzt durch ggT); neue Höhe = Zielbreite × Höhe / Breite',
  inputs: [
    { type: 'number', id: 'breite', label: 'Breite', unit: 'px', default: 1920, min: 1, step: 1 },
    { type: 'number', id: 'hoehe', label: 'Höhe', unit: 'px', default: 1080, min: 1, step: 1 },
    { type: 'number', id: 'zielbreite', label: 'Neue Breite (zum Skalieren)', unit: 'px', default: 1280, min: 0, step: 1, help: 'Gewünschte neue Breite – die passende Höhe wird berechnet.' },
  ],
  compute: (v) => {
    const b = num(v.breite);
    const h = num(v.hoehe);
    const zb = num(v.zielbreite);
    const teiler = ggt(b, h);
    const rb = teiler > 0 ? Math.round(b / teiler) : b;
    const rh = teiler > 0 ? Math.round(h / teiler) : h;
    const dezimal = h > 0 ? b / h : 0;
    const neueHoehe = b > 0 ? (zb * h) / b : 0;
    return [
      { label: 'Seitenverhältnis', value: `${rb}:${rh}`, primary: true },
      { label: 'Verhältnis dezimal', value: dezimal, digits: 4, help: 'Breite geteilt durch Höhe (z. B. 1,778 ≈ 16:9).' },
      { label: 'Passende neue Höhe', value: neueHoehe, unit: 'px', digits: 1, help: 'Höhe für die eingegebene neue Breite, ohne Verzerrung.' },
    ];
  },
  intro:
    'Das Seitenverhältnis beschreibt die Proportion von Breite zu Höhe, etwa 16:9 bei Full-HD oder 4:3 bei alten Monitoren. Dieser Rechner kürzt jede Auflösung auf das einfachste Verhältnis mit dem größten gemeinsamen Teiler. Außerdem berechnet er beim Skalieren auf eine neue Breite automatisch die passende Höhe, damit das Bild nicht verzerrt.',
  howto: [
    'Aktuelle Breite und Höhe in Pixeln eingeben (z. B. 1920 × 1080).',
    'Das gekürzte Seitenverhältnis und den Dezimalwert ablesen.',
    'Optional eine neue Zielbreite eintragen, um auf diese Größe zu skalieren.',
    'Die passende neue Höhe ablesen, die das Verhältnis exakt beibehält.',
  ],
  faq: [
    { q: 'Was bedeutet 16:9?', a: 'Auf 16 Einheiten Breite kommen 9 Einheiten Höhe. Das ist das verbreitetste Format für Fernseher, Monitore und YouTube-Videos und entspricht z. B. 1920×1080 oder 3840×2160.' },
    { q: 'Wie skaliere ich ein Bild ohne Verzerrung?', a: 'Behalte das Seitenverhältnis bei: Multipliziere die neue Breite mit (alte Höhe / alte Breite). Dieser Rechner macht das automatisch über das Feld „Neue Breite“.' },
    { q: 'Welche gängigen Seitenverhältnisse gibt es?', a: '16:9 (Standard-Video), 4:3 (ältere Monitore, Fotos), 21:9 (Ultrawide), 1:1 (quadratisch, Instagram) und 9:16 (Hochformat, Reels/Stories).' },
    { q: 'Warum ist mein Verhältnis krumm, z. B. 683:384?', a: 'Dann ist die Auflösung nicht exakt ein Standardformat. Der Dezimalwert hilft zur Einordnung – 1,778 liegt sehr nahe an 16:9 (≈1,7778).' },
  ],
  related: ['megapixel-rechner', 'dpi-ppi-rechner', 'speicherbedarf-fotos'],
  updated: '2026-06-18',
  examples: [
    {
      values: { breite: 1920, hoehe: 1080, zielbreite: 1280 },
      expect: [
        { label: 'Verhältnis dezimal', value: 1.7778, tolerance: 0.001 },
        { label: 'Passende neue Höhe', value: 720, tolerance: 0.1 },
      ],
    },
    {
      values: { breite: 1024, hoehe: 768, zielbreite: 800 },
      expect: [{ label: 'Passende neue Höhe', value: 600, tolerance: 0.1 }],
    },
  ],
};
