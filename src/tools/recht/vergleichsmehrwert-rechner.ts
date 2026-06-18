import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

// Gebührentabelle Anlage 2 zu § 13 RVG (1,0-Gebühr je Wert, Stand 2026)
function rvgEinfacheGebuehr(wert: number): number {
  if (wert <= 0) return 0;
  const stufen: { bis: number; gebuehr: number }[] = [
    { bis: 500, gebuehr: 49 },
    { bis: 1000, gebuehr: 88 },
    { bis: 1500, gebuehr: 127 },
    { bis: 2000, gebuehr: 166 },
    { bis: 3000, gebuehr: 222 },
    { bis: 4000, gebuehr: 278 },
    { bis: 5000, gebuehr: 334 },
    { bis: 6000, gebuehr: 390 },
    { bis: 7000, gebuehr: 446 },
    { bis: 8000, gebuehr: 502 },
    { bis: 9000, gebuehr: 558 },
    { bis: 10000, gebuehr: 614 },
    { bis: 13000, gebuehr: 666 },
    { bis: 16000, gebuehr: 718 },
    { bis: 19000, gebuehr: 770 },
    { bis: 22000, gebuehr: 822 },
    { bis: 25000, gebuehr: 874 },
    { bis: 30000, gebuehr: 955 },
    { bis: 35000, gebuehr: 1036 },
    { bis: 40000, gebuehr: 1117 },
    { bis: 45000, gebuehr: 1198 },
    { bis: 50000, gebuehr: 1279 },
  ];
  for (const s of stufen) {
    if (wert <= s.bis) return s.gebuehr;
  }
  const ueber = wert - 50000;
  const stufen10k = Math.ceil(ueber / 10000);
  return 1279 + stufen10k * 137;
}

export const tool: Tool = {
  slug: 'vergleichsmehrwert-rechner',
  category: 'recht',
  title: 'Vergleichsmehrwert-Rechner (Einigungsgebühr)',
  shortTitle: 'Vergleichsmehrwert',
  description:
    'Berechne die zusätzliche Einigungsgebühr, wenn ein Vergleich nicht anhängige Ansprüche mitregelt: 1,0-Gebühr aus dem Vergleichsmehrwert (RVG, Stand 2026).',
  keywords: [
    'vergleichsmehrwert rechner',
    'einigungsgebühr berechnen',
    'vergleichsmehrwert gebühr',
    'mehrwert vergleich rvg',
    'einigungsgebühr vergleich',
    'vergleich kosten anwalt',
  ],
  formula: 'Mehrwertgebühr = 1,0-Gebühr aus dem Vergleichsmehrwert (nicht anhängiger Teil)',
  inputs: [
    { type: 'number', id: 'streitwert', label: 'Anhängiger Streitwert', unit: '€', default: 5000, min: 0, step: 100, help: 'Wert des bereits rechtshängigen Streitgegenstands.' },
    { type: 'number', id: 'mehrwert', label: 'Vergleichsmehrwert', unit: '€', default: 3000, min: 0, step: 100, help: 'Wert der zusätzlich mitverglichenen, nicht anhängigen Ansprüche.' },
    {
      type: 'select', id: 'ust', label: 'Umsatzsteuer', default: 'ja',
      options: [
        { value: 'ja', label: 'mit 19 % USt' },
        { value: 'nein', label: 'ohne USt' },
      ],
    },
  ],
  compute: (v) => {
    const streitwert = num(v.streitwert);
    const mehrwert = num(v.mehrwert);
    const gesamtwert = streitwert + mehrwert;
    // Einigungsgebühr 1,0 (gerichtlich) auf den anhängigen Teil + 1,5 auf den Mehrwert (nicht anhängig)
    const einigungAnhaengig = 1.0 * rvgEinfacheGebuehr(streitwert);
    const einigungMehrwert = 1.5 * rvgEinfacheGebuehr(mehrwert);
    const zusatzgebuehrNetto = einigungMehrwert;
    const mitUst = String(v.ust) !== 'nein';
    const zusatzgebuehr = mitUst ? zusatzgebuehrNetto * 1.19 : zusatzgebuehrNetto;
    return [
      { label: 'Zusätzliche Mehrwertgebühr', value: zusatzgebuehr, unit: '€', digits: 2, primary: true },
      { label: 'Einigungsgebühr Mehrwert (netto, 1,5)', value: einigungMehrwert, unit: '€', digits: 2 },
      { label: 'Einigungsgebühr anhängiger Teil (1,0)', value: einigungAnhaengig, unit: '€', digits: 2 },
      { label: 'Gesamter Vergleichswert', value: gesamtwert, unit: '€', digits: 2 },
    ];
  },
  intro:
    'Werden in einem gerichtlichen Vergleich auch Ansprüche mitgeregelt, die nicht Gegenstand des Prozesses waren, entsteht ein Vergleichsmehrwert. Für diesen nicht anhängigen Teil fällt eine erhöhte Einigungsgebühr (1,5) an, da insoweit kein gerichtliches Verfahren lief. Dieser Rechner schätzt die dadurch zusätzlich entstehende Anwaltsgebühr (Stand 2026); Auslagen sind nicht berücksichtigt.',
  howto: [
    'Anhängigen Streitwert eingeben.',
    'Vergleichsmehrwert (nicht anhängiger, mitverglichener Teil) eintragen.',
    'Umsatzsteuer wählen.',
    'Zusätzlich anfallende Mehrwertgebühr ablesen.',
  ],
  faq: [
    { q: 'Was ist ein Vergleichsmehrwert?', a: 'Der Mehrwert entsteht, wenn ein Vergleich über den anhängigen Streit hinaus weitere, nicht rechtshängige Ansprüche mitregelt. Dieser zusätzliche Wert erhöht die Bemessungsgrundlage für die Einigungsgebühr.' },
    { q: 'Warum 1,5 auf den Mehrwert?', a: 'Für den nicht anhängigen Teil lief kein Gerichtsverfahren. Die Einigungsgebühr beträgt deshalb 1,5 statt 1,0 (Nr. 1000 VV RVG), weil die außergerichtliche Einigung höher honoriert wird.' },
    { q: 'Wer trägt die Mehrwertkosten?', a: 'Über die Kosten des Mehrvergleichs treffen die Parteien meist eine eigene Regelung im Vergleich. Fehlt sie, gilt im Zweifel eine Kostenaufhebung – jede Seite trägt ihre eigenen Mehrwertkosten.' },
    { q: 'Fällt auch Gerichtskosten für den Mehrwert an?', a: 'Ein gerichtlicher Vergleich über nicht anhängige Gegenstände löst grundsätzlich keine zusätzliche Gerichtsgebühr aus; relevant ist hier vor allem die Anwaltsgebühr.' },
  ],
  related: ['rvg-prozesskosten-rechner', 'anwaltskosten-rechner', 'streitwert-rechner'],
  examples: [
    {
      values: { streitwert: 5000, mehrwert: 3000, ust: 'nein' },
      expect: [
        { label: 'Einigungsgebühr Mehrwert (netto, 1,5)', value: 333, tolerance: 0.5 },
        { label: 'Einigungsgebühr anhängiger Teil (1,0)', value: 334, tolerance: 0.5 },
        { label: 'Gesamter Vergleichswert', value: 8000, tolerance: 0.5 },
      ],
    },
    {
      values: { streitwert: 5000, mehrwert: 2000, ust: 'ja' },
      expect: [
        { label: 'Einigungsgebühr Mehrwert (netto, 1,5)', value: 249, tolerance: 0.5 },
        { label: 'Zusätzliche Mehrwertgebühr', value: 296.31, tolerance: 1 },
      ],
    },
  ],
  updated: '2026-06-18',
};
