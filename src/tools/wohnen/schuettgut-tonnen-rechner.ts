import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'schuettgut-tonnen-rechner',
  category: 'wohnen',
  title: 'Schüttgut-Rechner (m³ in Tonnen)',
  shortTitle: 'Schüttgut t',
  description:
    'Rechne das Volumen von Kies, Sand, Schotter oder Mutterboden in Tonnen um und ermittle daraus die benötigte Liefermenge nach Gewicht.',
  keywords: [
    'kubikmeter in tonnen umrechnen',
    'kies tonnen rechner',
    'sand m3 in tonnen',
    'schüttgut gewicht berechnen',
    'mutterboden tonnen',
    'schotter menge rechner',
  ],
  formula: 'Gewicht (t) = Volumen (m³) × Dichte (t/m³)',
  inputs: [
    { type: 'number', id: 'volumen', label: 'Benötigtes Volumen', unit: 'm³', default: 5, min: 0, step: 0.1 },
    {
      type: 'select', id: 'material', label: 'Material', default: 'kies',
      help: 'Richtwerte für die Schüttdichte des lockeren Materials.',
      options: [
        { value: 'sand', label: 'Sand, trocken (1,5 t/m³)' },
        { value: 'kies', label: 'Kies (1,8 t/m³)' },
        { value: 'schotter', label: 'Schotter / Splitt (1,5 t/m³)' },
        { value: 'mutterboden', label: 'Mutterboden (1,4 t/m³)' },
        { value: 'frostschutz', label: 'Frostschutzkies 0/32 (1,9 t/m³)' },
      ],
    },
  ],
  compute: (v) => {
    const volumen = num(v.volumen);
    const dichten: Record<string, number> = {
      sand: 1.5,
      kies: 1.8,
      schotter: 1.5,
      mutterboden: 1.4,
      frostschutz: 1.9,
    };
    const dichte = dichten[String(v.material)] ?? 1.8;
    const tonnen = volumen * dichte;
    return [
      { label: 'Gewicht', value: tonnen, unit: 't', digits: 2, primary: true },
      { label: 'Gewicht in kg', value: tonnen * 1000, unit: 'kg', digits: 0 },
      { label: 'Angesetzte Dichte', value: dichte, unit: 't/m³', digits: 2 },
    ];
  },
  intro:
    'Schüttgüter wie Kies, Sand oder Mutterboden werden im Baustoffhandel oft nach Gewicht (Tonnen) verkauft, der Bedarf wird aber meist als Volumen (Kubikmeter) berechnet. Die Umrechnung erfolgt über die Schüttdichte. Die Werte hier sind übliche Richtwerte für lockeres, leicht feuchtes Material – nasses Material ist schwerer, stark verdichtetes Material dichter. Für eine verbindliche Menge gilt die Angabe des Lieferanten.',
  howto: [
    'Benötigtes Volumen in Kubikmetern eingeben (z. B. Fläche × Schütthöhe).',
    'Material auswählen – die typische Dichte wird automatisch angesetzt.',
    'Gewicht in Tonnen ablesen und beim Händler bestellen.',
  ],
  faq: [
    { q: 'Wie viel wiegt ein Kubikmeter Kies?', a: 'Trockener Kies wiegt rund 1,8 Tonnen pro Kubikmeter. Nasser oder verdichteter Kies kann etwas schwerer sein, weshalb Lieferungen leicht abweichen können.' },
    { q: 'Warum unterscheiden sich die Dichten?', a: 'Korngröße, Feuchte und Verdichtung beeinflussen das Gewicht. Feiner, feuchter Sand liegt dichter als grober, trockener Kies. Die Richtwerte gelten für loses Schüttgut.' },
    { q: 'Wie ermittle ich das Volumen?', a: 'Multipliziere die Fläche mit der gewünschten Schütthöhe. Für eine 20 m² große Fläche mit 25 cm Höhe sind das 20 × 0,25 = 5 m³.' },
  ],
  related: ['erdaushub-volumen-rechner', 'pflasterflaeche-material-rechner', 'betonmenge-fundament-rechner'],
  updated: '2026-06-19',
  examples: [
    {
      values: { volumen: 5, material: 'kies' },
      expect: [
        { label: 'Gewicht', value: 9, tolerance: 0.01 },
        { label: 'Gewicht in kg', value: 9000, tolerance: 1 },
      ],
    },
    {
      values: { volumen: 10, material: 'mutterboden' },
      expect: [{ label: 'Gewicht', value: 14, tolerance: 0.01 }],
    },
  ],
};
