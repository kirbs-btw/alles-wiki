import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

/**
 * Waschmittel-Dosierung nach Wasserhärte und Verschmutzung.
 * Basis: Vollwaschmittel-Pulver, übliche Herstellerangaben für eine 4,5–5 kg Trommel.
 * Mengen werden je Härtebereich und Verschmutzungsgrad gestaffelt und auf die Beladung skaliert.
 */
const REFERENZ_BELADUNG_KG = 4.5; // typische Dosierangabe gilt pro voller Trommel

// Grunddosis (ml/g) je Verschmutzung bei mittlerer Härte (II), für Referenz-Beladung
const GRUNDDOSIS: Record<string, number> = {
  leicht: 50,
  normal: 70,
  stark: 90,
};

// Faktor je Wasserhärte (weich/mittel/hart)
const HAERTE_FAKTOR: Record<string, number> = {
  weich: 0.8, // < 8,4 °dH
  mittel: 1.0, // 8,4–14 °dH
  hart: 1.25, // > 14 °dH
};

export const tool: Tool = {
  slug: 'waschmittel-dosierung-rechner',
  category: 'alltag',
  title: 'Waschmittel-Dosierung berechnen',
  shortTitle: 'Waschmittel',
  description:
    'Berechne die passende Waschmittelmenge nach Wasserhärte, Verschmutzungsgrad und Beladung der Trommel – als Orientierung für richtiges Dosieren.',
  keywords: [
    'waschmittel dosierung',
    'waschmittel menge berechnen',
    'waschmittel wasserhaerte',
    'wie viel waschmittel',
    'waschmittel dosieren',
    'waschmittel rechner',
  ],
  formula:
    'Dosis = Grunddosis(Verschmutzung) × Härtefaktor × (Beladung / 4,5 kg)',
  inputs: [
    {
      type: 'number',
      id: 'beladung',
      label: 'Wäschemenge (trocken)',
      unit: 'kg',
      default: 4.5,
      min: 0.5,
      max: 12,
      step: 0.5,
      help: 'Gewicht der trockenen Wäsche in der Trommel.',
    },
    {
      type: 'select',
      id: 'haerte',
      label: 'Wasserhärte',
      default: 'mittel',
      options: [
        { value: 'weich', label: 'weich (unter 8,4 °dH)' },
        { value: 'mittel', label: 'mittel (8,4–14 °dH)' },
        { value: 'hart', label: 'hart (über 14 °dH)' },
      ],
      help: 'Steht auf der Wasserrechnung oder beim örtlichen Wasserversorger.',
    },
    {
      type: 'select',
      id: 'verschmutzung',
      label: 'Verschmutzung',
      default: 'normal',
      options: [
        { value: 'leicht', label: 'leicht (kaum sichtbar)' },
        { value: 'normal', label: 'normal' },
        { value: 'stark', label: 'stark (Flecken, Sport)' },
      ],
    },
  ],
  compute: (v) => {
    const beladung = num(v.beladung, 4.5);
    const haerte = String(v.haerte || 'mittel');
    const verschmutzung = String(v.verschmutzung || 'normal');
    const grund = GRUNDDOSIS[verschmutzung] ?? GRUNDDOSIS.normal;
    const faktor = HAERTE_FAKTOR[haerte] ?? 1.0;
    const skala = beladung / REFERENZ_BELADUNG_KG;
    const dosis = grund * faktor * skala;
    return [
      { label: 'Waschmittel-Dosis', value: dosis, unit: 'ml/g', digits: 0, primary: true, help: 'Pulver in Gramm bzw. Flüssigwaschmittel in Milliliter.' },
      { label: 'Dosis pro kg Wäsche', value: grund * faktor, unit: 'ml/g', digits: 0 },
    ];
  },
  intro:
    'Die richtige Waschmittelmenge hängt von drei Dingen ab: der Wasserhärte (hartes Wasser braucht mehr), dem Verschmutzungsgrad und der Beladung der Maschine. Dieser Rechner liefert eine Orientierung auf Basis üblicher Herstellerempfehlungen für Vollwaschmittel. Die genaue Dosierung steht immer auf der Verpackung deines Produkts – diese Angabe geht im Zweifel vor.',
  howto: [
    'Wiege oder schätze die trockene Wäschemenge in Kilogramm.',
    'Wähle deine Wasserhärte (weich, mittel, hart).',
    'Wähle den Verschmutzungsgrad.',
    'Lies die empfohlene Dosis ab – Pulver in Gramm, Flüssigmittel in Milliliter.',
  ],
  faq: [
    { q: 'Wo finde ich meine Wasserhärte?', a: 'Auf der jährlichen Trinkwasseranalyse deines Versorgers oder auf dessen Website. Sie wird in Grad deutscher Härte (°dH) angegeben.' },
    { q: 'Warum braucht hartes Wasser mehr Waschmittel?', a: 'Kalk im Wasser bindet Inhaltsstoffe des Waschmittels, sodass weniger für die eigentliche Reinigung übrig bleibt. Bei hartem Wasser wird daher mehr dosiert.' },
    { q: 'Ist Überdosieren schlimm?', a: 'Ja: Zu viel Waschmittel wird nicht ausgespült, belastet die Umwelt und kann Rückstände auf der Wäsche hinterlassen. Lieber genau dosieren.' },
    { q: 'Gilt das auch für Flüssigwaschmittel?', a: 'Die Mengen sind ähnlich (ml statt g), Flüssigmittel enthält aber meist keinen Wasserenthärter. Bei hartem Wasser kann ein separater Entkalker sinnvoll sein.' },
  ],
  related: ['waschmaschine-kosten-rechner', 'verduennung-rechner', 'mischungsverhaeltnis-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { beladung: 4.5, haerte: 'mittel', verschmutzung: 'normal' },
      // 70 * 1.0 * (4.5/4.5) = 70
      expect: [
        { label: 'Waschmittel-Dosis', value: 70, tolerance: 0.5 },
        { label: 'Dosis pro kg Wäsche', value: 70, tolerance: 0.5 },
      ],
    },
    {
      values: { beladung: 6, haerte: 'hart', verschmutzung: 'stark' },
      // 90 * 1.25 * (6/4.5) = 112.5 * 1.3333 = 150
      expect: [{ label: 'Waschmittel-Dosis', value: 150, tolerance: 1 }],
    },
  ],
};
