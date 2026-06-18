import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

/**
 * Konfektionsgrößen aus Körpermaßen.
 * Deutsche Größe (DE) als Basis, daraus US und UK als gängige Näherung.
 * Damen: DE = (Brust/Taille-Mittel) – Offset; Herren: DE = Brustumfang / 2 (Sakko/Hemd Normalgröße).
 */
export const tool: Tool = {
  slug: 'konfektionsgroessen-umrechner',
  category: 'alltag',
  title: 'Konfektionsgrößen-Umrechner (DE, US, UK)',
  shortTitle: 'Kleidergrößen',
  description:
    'Rechne Kleidergrößen aus deinem Brustumfang in DE-, US- und UK-Größen um – für Damen und Herren als praktische Orientierung beim Online-Shopping.',
  keywords: [
    'konfektionsgroessen umrechnen',
    'kleidergroesse umrechnen',
    'kleidergroesse us in de',
    'konfektionsgroesse berechnen',
    'damengroesse herrengroesse',
    'groessentabelle kleidung',
  ],
  formula:
    'Damen DE = Brustumfang(cm)/2 − 6 (gerundet auf gerade Zahl); Herren DE = Brustumfang(cm)/2; US ≈ DE − 34 (Damen) bzw. DE − 10 (Herren-Sakko)',
  inputs: [
    {
      type: 'number',
      id: 'brust',
      label: 'Brustumfang',
      unit: 'cm',
      default: 96,
      min: 60,
      max: 160,
      step: 1,
      help: 'An der stärksten Stelle des Brustkorbs locker messen.',
    },
    {
      type: 'select',
      id: 'typ',
      label: 'Typ',
      default: 'damen',
      options: [
        { value: 'damen', label: 'Damen' },
        { value: 'herren', label: 'Herren' },
      ],
    },
  ],
  compute: (v) => {
    const brust = num(v.brust, 96);
    const typ = String(v.typ || 'damen');
    let de: number;
    let us: number;
    let uk: number;
    if (typ === 'herren') {
      // Herren-Konfektion (Sakko/Anzug Normalgröße): DE = Brustumfang / 2
      de = Math.round(brust / 2);
      us = de - 10; // US-Jackett-Größe (z. B. DE 48 ≈ US 38)
      uk = us; // UK-Sakko entspricht weitgehend US
    } else {
      // Damen: gängige Faustformel, gerade Größen (z. B. Brust 88 -> DE 38)
      de = Math.round((brust / 2 - 6) / 2) * 2;
      if (de < 32) de = 32;
      us = de - 30; // DE 38 ≈ US 8
      uk = de - 28; // DE 38 ≈ UK 10
    }
    const label =
      typ === 'herren'
        ? de >= 50
          ? 'großes Sakko / XL'
          : 'Normalgröße'
        : de <= 34
        ? 'XS'
        : de <= 38
        ? 'S–M'
        : de <= 42
        ? 'M–L'
        : 'L–XL';
    return [
      { label: 'DE-Größe', value: de, unit: '', digits: 0, primary: true },
      { label: 'US-Größe', value: us, unit: '', digits: 0 },
      { label: 'UK-Größe', value: uk, unit: '', digits: 0 },
      { label: 'Einordnung', value: label, unit: '' },
    ];
  },
  intro:
    'Kleidergrößen sind je nach Land und Hersteller verschieden definiert. Dieser Rechner nutzt den Brustumfang als Basis und gibt DE-, US- und UK-Größen als Orientierung aus. Da Marken stark abweichen können (Vanity Sizing), sind die Werte Richtwerte – prüfe im Zweifel die Größentabelle des Anbieters.',
  howto: [
    'Miss den Brustumfang an der stärksten Stelle, locker und waagerecht.',
    'Wähle Damen oder Herren.',
    'Lies DE-, US- und UK-Größe sowie die grobe Einordnung (S/M/L) ab.',
    'Vergleiche die Werte mit der Größentabelle des jeweiligen Shops.',
  ],
  faq: [
    { q: 'Warum weichen Marken ab?', a: 'Es gibt keine streng verbindliche Norm. Viele Hersteller fallen größer oder kleiner aus (sogenanntes Vanity Sizing), daher sind die Werte nur Richtwerte.' },
    { q: 'Reicht der Brustumfang allein?', a: 'Für Oberteile ist er der wichtigste Wert. Für Hosen sind zusätzlich Taillen- und Hüftumfang sowie die Beinlänge entscheidend.' },
    { q: 'Was bedeutet US-Größe 8?', a: 'Im Damenbereich entspricht US 8 etwa der deutschen Größe 38. US-Größen zählen in 2er-Schritten, ähnlich wie DE in 2er-Schritten.' },
  ],
  related: ['schuhgroessen-umrechner', 'ringgroessen-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { brust: 96, typ: 'damen' },
      // 96/2 = 48; 48-6 = 42; round(42/2)*2 = 42 -> DE 42
      expect: [{ label: 'DE-Größe', value: 42, tolerance: 0 }],
    },
    {
      values: { brust: 100, typ: 'herren' },
      expect: [
        { label: 'DE-Größe', value: 50, tolerance: 0 },
        { label: 'US-Größe', value: 40, tolerance: 0 },
      ],
    },
  ],
};
