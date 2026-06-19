import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

const CM_PRO_ZOLL = 2.54;

export const tool: Tool = {
  slug: 'zoll-cm-diagonale-rechner',
  category: 'technik',
  title: 'Zoll-in-cm-Umrechner (Bildschirmdiagonale)',
  shortTitle: 'Zoll ↔ cm',
  description:
    'Rechne die Bildschirmdiagonale von Zoll in Zentimeter um oder zurück – für TV, Monitor, Laptop und Tablet. Beide Richtungen, exakt mit 2,54 cm/Zoll.',
  keywords: [
    'zoll in cm umrechnen',
    'cm in zoll bildschirm',
    'bildschirmdiagonale zoll cm',
    'zoll cm fernseher',
    'monitor zoll in cm',
    'wie viel cm hat 55 zoll',
  ],
  formula: 'cm = Zoll × 2,54; Zoll = cm / 2,54',
  inputs: [
    {
      type: 'select',
      id: 'richtung',
      label: 'Umrechnungsrichtung',
      default: 'zoll2cm',
      options: [
        { value: 'zoll2cm', label: 'Zoll → cm' },
        { value: 'cm2zoll', label: 'cm → Zoll' },
      ],
    },
    { type: 'number', id: 'wert', label: 'Diagonale (Eingabewert)', default: 55, min: 0, step: 0.5, help: 'Je nach Richtung in Zoll oder cm.' },
  ],
  compute: (v) => {
    const wert = num(v.wert);
    const richtung = String(v.richtung);
    let zoll: number;
    let cm: number;
    if (richtung === 'cm2zoll') {
      cm = wert;
      zoll = wert / CM_PRO_ZOLL;
    } else {
      zoll = wert;
      cm = wert * CM_PRO_ZOLL;
    }
    const primary =
      richtung === 'cm2zoll'
        ? { label: 'Diagonale in Zoll', value: zoll, unit: '″', digits: 2, primary: true }
        : { label: 'Diagonale in cm', value: cm, unit: 'cm', digits: 1, primary: true };
    return [
      primary,
      { label: 'Diagonale in cm', value: cm, unit: 'cm', digits: 1 },
      { label: 'Diagonale in Zoll', value: zoll, unit: '″', digits: 2 },
      { label: 'Diagonale in mm', value: cm * 10, unit: 'mm', digits: 0 },
    ];
  },
  intro:
    'Fernseher und Monitore werden in Zoll (″) beworben, im Wohnzimmer rechnest du aber in Zentimetern. Ein Zoll sind exakt 2,54 cm – das gilt nur für die Diagonale, nicht für Breite oder Höhe. So entspricht ein 55-Zoll-TV einer Bilddiagonale von rund 140 cm. Dieser Umrechner liefert beide Richtungen exakt. Hinweis: Hersteller runden Zoll-Angaben oft (z. B. „55 Zoll" bei echten 54,6″), daher kann die reale Diagonale minimal abweichen.',
  howto: [
    'Richtung wählen: Zoll → cm oder cm → Zoll.',
    'Den Wert eingeben (Zoll bzw. Zentimeter).',
    'Umgerechnete Diagonale in cm, Zoll und mm ablesen.',
  ],
  faq: [
    { q: 'Wie viel cm hat ein 55-Zoll-Fernseher?', a: 'Die Bilddiagonale beträgt 55 × 2,54 = 139,7 cm, also rund 140 cm. Breite und Höhe sind kleiner und hängen vom Seitenverhältnis ab.' },
    { q: 'Wie rechne ich cm in Zoll um?', a: 'Teile den Zentimeterwert durch 2,54. 100 cm Diagonale entsprechen also etwa 39,4 Zoll.' },
    { q: 'Gilt die Zoll-Angabe für Breite und Höhe?', a: 'Nein, ausschließlich für die Diagonale. Um Breite und Höhe zu erhalten, brauchst du zusätzlich das Seitenverhältnis – dafür gibt es den Bildschirm-Maße-Rechner.' },
    { q: 'Warum weicht die echte Größe leicht ab?', a: 'Hersteller runden die Zoll-Zahl. Ein „55-Zoll"-Gerät hat oft eine sichtbare Diagonale von etwa 54,6 Zoll. Der Rechner nutzt den exakten Faktor 2,54 cm pro Zoll.' },
  ],
  related: ['bildschirm-masse-rechner', 'tv-groesse-sichtabstand-rechner', 'seitenverhaeltnis-rechner'],
  updated: '2026-06-19',
  examples: [
    {
      values: { richtung: 'zoll2cm', wert: 55 },
      // 55 × 2,54 = 139,7 cm
      expect: [{ label: 'Diagonale in cm', value: 139.7, tolerance: 0.05 }],
    },
    {
      values: { richtung: 'cm2zoll', wert: 100 },
      // 100 / 2,54 = 39,3701 Zoll
      expect: [{ label: 'Diagonale in Zoll', value: 39.37, tolerance: 0.01 }],
    },
  ],
};
