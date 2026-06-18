import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'standardabweichung-rechner',
  category: 'mathe',
  title: 'Standardabweichung & Varianz Rechner',
  shortTitle: 'Standardabweichung',
  description:
    'Berechne Mittelwert, Varianz und Standardabweichung aus bis zu fünf Messwerten – wahlweise als Stichprobe (n−1) oder Grundgesamtheit (n).',
  keywords: [
    'standardabweichung berechnen',
    'varianz berechnen',
    'standardabweichung rechner',
    'mittelwert und standardabweichung',
    'stichprobenvarianz',
    'streuung berechnen',
  ],
  formula: 'Varianz σ² = Σ(xᵢ − x̄)² / n (bzw. / (n−1)) ; Standardabweichung = √Varianz',
  intro:
    'Die Standardabweichung misst, wie stark Werte um ihren Mittelwert streuen. Der Rechner verarbeitet bis zu fünf Werte und unterscheidet zwischen der Standardabweichung der Grundgesamtheit (Teiler n) und der Stichprobe (Teiler n−1, Bessel-Korrektur).',
  inputs: [
    { type: 'number', id: 'w1', label: 'Wert 1', default: 4, step: 0.1 },
    { type: 'number', id: 'w2', label: 'Wert 2', default: 8, step: 0.1 },
    { type: 'number', id: 'w3', label: 'Wert 3', default: 6, step: 0.1 },
    { type: 'number', id: 'w4', label: 'Wert 4', default: 5, step: 0.1 },
    { type: 'number', id: 'w5', label: 'Wert 5 (optional, sonst 0 lassen wenn unbenutzt)', default: 3, step: 0.1, help: 'Nicht benötigte Felder einfach gleich lassen – es zählen alle eingegebenen Werte.' },
    {
      type: 'select',
      id: 'typ',
      label: 'Berechnungstyp',
      default: 'stichprobe',
      options: [
        { value: 'stichprobe', label: 'Stichprobe (Teiler n−1)' },
        { value: 'grundgesamtheit', label: 'Grundgesamtheit (Teiler n)' },
      ],
    },
    { type: 'number', id: 'anzahl', label: 'Anzahl genutzter Werte', default: 5, min: 1, max: 5, step: 1, help: 'Wie viele der fünf Felder sollen einbezogen werden?' },
  ],
  compute: (v) => {
    const alle = [num(v.w1), num(v.w2), num(v.w3), num(v.w4), num(v.w5)];
    let anzahl = Math.round(num(v.anzahl));
    if (anzahl < 1) anzahl = 1;
    if (anzahl > 5) anzahl = 5;
    const werte = alle.slice(0, anzahl);
    const n = werte.length;
    const summe = werte.reduce((s, x) => s + x, 0);
    const mittel = summe / n;
    const quadSumme = werte.reduce((s, x) => s + (x - mittel) * (x - mittel), 0);
    const typ = String(v.typ);
    const teiler = typ === 'stichprobe' ? Math.max(n - 1, 1) : n;
    const varianz = quadSumme / teiler;
    const stdabw = Math.sqrt(varianz);
    return [
      { label: 'Standardabweichung', value: stdabw, digits: 4, primary: true },
      { label: 'Varianz', value: varianz, digits: 4 },
      { label: 'Mittelwert', value: mittel, digits: 4 },
      { label: 'Anzahl Werte', value: n, digits: 0 },
    ];
  },
  howto: [
    'Trage deine Messwerte in die Felder Wert 1 bis Wert 5 ein.',
    'Gib an, wie viele der Felder genutzt werden.',
    'Wähle Stichprobe (n−1) oder Grundgesamtheit (n).',
    'Lies Standardabweichung, Varianz und Mittelwert ab.',
  ],
  faq: [
    {
      q: 'Was ist der Unterschied zwischen Stichprobe und Grundgesamtheit?',
      a: 'Bei einer Stichprobe wird durch n−1 geteilt (Bessel-Korrektur), bei der vollständigen Grundgesamtheit durch n. Die Stichproben-Standardabweichung ist daher etwas größer.',
    },
    {
      q: 'Wie hängen Varianz und Standardabweichung zusammen?',
      a: 'Die Standardabweichung ist die Quadratwurzel der Varianz. Sie hat dieselbe Einheit wie die Ausgangsdaten und ist daher anschaulicher.',
    },
    {
      q: 'Was sagt die Standardabweichung aus?',
      a: 'Sie beschreibt die mittlere Streuung der Werte um den Mittelwert. Eine kleine Standardabweichung bedeutet, dass die Werte eng beieinander liegen.',
    },
  ],
  related: ['durchschnitt-rechner', 'median-rechner', 'prozentrechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { w1: 4, w2: 8, w3: 6, w4: 5, w5: 3, typ: 'grundgesamtheit', anzahl: 5 },
      expect: [
        { label: 'Mittelwert', value: 5.2, tolerance: 0.001 },
        { label: 'Varianz', value: 2.96, tolerance: 0.001 },
        { label: 'Standardabweichung', value: 1.72047, tolerance: 0.001 },
      ],
    },
    {
      values: { w1: 2, w2: 4, w3: 6, w4: 0, w5: 0, typ: 'stichprobe', anzahl: 3 },
      expect: [
        { label: 'Mittelwert', value: 4, tolerance: 0.001 },
        { label: 'Standardabweichung', value: 2, tolerance: 0.001 },
      ],
    },
  ],
};
