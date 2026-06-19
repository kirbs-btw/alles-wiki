import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'drehmoment-leistung-rechner',
  category: 'auto',
  title: 'Drehmoment- & Leistungs-Rechner',
  shortTitle: 'Drehmoment',
  description:
    'Berechne die Motorleistung in kW und PS aus Drehmoment und Drehzahl – oder das Drehmoment aus der Leistung bei gegebener Drehzahl.',
  keywords: [
    'drehmoment leistung berechnen',
    'drehmoment in ps umrechnen',
    'leistung aus drehmoment rechner',
    'nm in kw rechner',
    'motorleistung drehzahl rechner',
    'drehmoment drehzahl leistung',
  ],
  formula:
    'P (kW) = M (Nm) × n (U/min) / 9549,3 ; M (Nm) = P (kW) × 9549,3 / n (U/min)',
  intro:
    'Leistung und Drehmoment hängen über die Drehzahl zusammen: Erst bei einer bestimmten Drehzahl wird aus einem Drehmoment eine Leistung. Die Konstante 9549,3 ergibt sich aus 60000 / (2π). Dieser Rechner ermittelt aus Drehmoment und Drehzahl die Leistung in kW und PS – oder umgekehrt das nötige Drehmoment.',
  inputs: [
    {
      type: 'select', id: 'modus', label: 'Berechnung', default: 'leistung',
      options: [
        { value: 'leistung', label: 'Leistung aus Drehmoment & Drehzahl' },
        { value: 'drehmoment', label: 'Drehmoment aus Leistung & Drehzahl' },
      ],
    },
    { type: 'number', id: 'drehmoment', label: 'Drehmoment', unit: 'Nm', default: 250, min: 0, step: 5, help: 'Nur bei Modus „Leistung"' },
    { type: 'number', id: 'leistungKw', label: 'Leistung', unit: 'kW', default: 110, min: 0, step: 1, help: 'Nur bei Modus „Drehmoment"' },
    { type: 'number', id: 'drehzahl', label: 'Drehzahl', unit: 'U/min', default: 4000, min: 1, step: 100 },
  ],
  compute: (v) => {
    const modus = String(v.modus || 'leistung');
    const drehmoment = num(v.drehmoment);
    const leistungKw = num(v.leistungKw);
    const drehzahl = num(v.drehzahl);
    const K = 9549.3; // 60000 / (2*Pi)
    const KW_PRO_PS = 0.73549875;
    if (modus === 'drehmoment') {
      const nm = drehzahl > 0 ? (leistungKw * K) / drehzahl : 0;
      return [
        { label: 'Drehmoment', value: nm, unit: 'Nm', digits: 1, primary: true },
        { label: 'Leistung', value: leistungKw, unit: 'kW', digits: 1 },
        { label: 'Leistung', value: leistungKw / KW_PRO_PS, unit: 'PS', digits: 1 },
      ];
    }
    const kw = (drehmoment * drehzahl) / K;
    const ps = kw / KW_PRO_PS;
    return [
      { label: 'Leistung', value: kw, unit: 'kW', digits: 1, primary: true },
      { label: 'Leistung', value: ps, unit: 'PS', digits: 1 },
      { label: 'Drehmoment', value: drehmoment, unit: 'Nm', digits: 1 },
    ];
  },
  howto: [
    'Berechnungsrichtung wählen: Leistung oder Drehmoment.',
    'Drehmoment (Nm) bzw. Leistung (kW) eintragen.',
    'Drehzahl in U/min ergänzen, bei der der Wert gilt.',
    'Ergebnis in kW und PS bzw. Nm ablesen.',
  ],
  faq: [
    { q: 'Wie hängen Drehmoment und Leistung zusammen?', a: 'Leistung ist Drehmoment mal Winkelgeschwindigkeit. Mit der Drehzahl in U/min gilt: P (kW) = M (Nm) × n / 9549,3. Ohne Drehzahlangabe lässt sich keiner der Werte in den anderen umrechnen.' },
    { q: 'Woher kommt die Zahl 9549,3?', a: 'Sie ergibt sich aus der Umrechnung von Umdrehungen pro Minute in Bogenmaß pro Sekunde: 60000 / (2 × π) ≈ 9549,3.' },
    { q: 'Gilt der Wert für die Maximalleistung?', a: 'Maximale Leistung und maximales Drehmoment liegen meist bei unterschiedlichen Drehzahlen. Setze die jeweils passende Drehzahl ein, um den richtigen Punkt der Motorkennlinie zu treffen.' },
  ],
  related: ['ps-kw-umrechner', 'leistungsgewicht-rechner', 'drehzahl-geschwindigkeit-rechner'],
  updated: '2026-06-19',
  examples: [
    {
      values: { modus: 'leistung', drehmoment: 250, leistungKw: 110, drehzahl: 4000 },
      // kw = 250*4000/9549.3 = 104.719
      expect: [{ label: 'Leistung', value: 104.7, tolerance: 0.2 }],
    },
    {
      values: { modus: 'drehmoment', drehmoment: 250, leistungKw: 110, drehzahl: 4000 },
      // nm = 110*9549.3/4000 = 262.605
      expect: [{ label: 'Drehmoment', value: 262.6, tolerance: 0.3 }],
    },
  ],
};
