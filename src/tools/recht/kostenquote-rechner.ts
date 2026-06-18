import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'kostenquote-rechner',
  category: 'recht',
  title: 'Kostenquote-Rechner (teilweises Obsiegen)',
  shortTitle: 'Kostenquote',
  description:
    'Berechne die Kostenverteilung nach § 92 ZPO bei teilweisem Obsiegen: Wer trägt welchen Anteil der Prozesskosten, wenn die Klage nur teilweise Erfolg hat?',
  keywords: [
    'kostenquote rechner',
    'kostenverteilung zpo',
    '92 zpo quote',
    'teilweise obsiegen kosten',
    'prozesskosten aufteilen',
    'obsiegen unterliegen quote',
    'kostenentscheidung berechnen',
  ],
  formula: 'Quote Kläger = zugesprochener Betrag / eingeklagter Betrag; Beklagter trägt diese Quote der Kosten',
  inputs: [
    { type: 'number', id: 'eingeklagt', label: 'Eingeklagter Betrag', unit: '€', default: 10000, min: 0, step: 100 },
    { type: 'number', id: 'zugesprochen', label: 'Zugesprochener Betrag', unit: '€', default: 6000, min: 0, step: 100, help: 'Wie viel der Kläger tatsächlich zugesprochen bekommt.' },
    { type: 'number', id: 'gesamtkosten', label: 'Gesamte Prozesskosten', unit: '€', default: 3000, min: 0, step: 50, help: 'Gerichts- und beidseitige Anwaltskosten.' },
  ],
  compute: (v) => {
    const eingeklagt = num(v.eingeklagt);
    const zugesprochen = Math.min(num(v.zugesprochen), eingeklagt > 0 ? eingeklagt : num(v.zugesprochen));
    const gesamtkosten = num(v.gesamtkosten);
    const quoteKlaeger = eingeklagt > 0 ? zugesprochen / eingeklagt : 0; // Anteil Erfolg
    // Bei teilweisem Obsiegen trägt jede Partei die Kosten im Verhältnis ihres Unterliegens.
    const anteilBeklagter = quoteKlaeger;          // Beklagter unterliegt zu diesem Anteil
    const anteilKlaeger = 1 - quoteKlaeger;        // Kläger unterliegt zum Restanteil
    const kostenKlaeger = gesamtkosten * anteilKlaeger;
    const kostenBeklagter = gesamtkosten * anteilBeklagter;
    return [
      { label: 'Kosten trägt Kläger', value: kostenKlaeger, unit: '€', digits: 2, primary: true },
      { label: 'Kosten trägt Beklagter', value: kostenBeklagter, unit: '€', digits: 2 },
      { label: 'Obsiegensquote Kläger', value: quoteKlaeger * 100, unit: '%', digits: 1 },
    ];
  },
  intro:
    'Obsiegt eine Partei nur teilweise, werden die Prozesskosten verhältnismäßig verteilt (§ 92 ZPO). Maßgeblich ist, in welchem Umfang Klage und Verteidigung Erfolg hatten. Dieser Rechner ermittelt die Quote aus eingeklagtem und zugesprochenem Betrag und verteilt die Gesamtkosten entsprechend. Die tatsächliche Kostenentscheidung trifft das Gericht; bei geringfügigem Unterliegen kann es von der Quote abweichen.',
  howto: [
    'Eingeklagten Betrag eingeben.',
    'Tatsächlich zugesprochenen Betrag eingeben.',
    'Gesamte Prozesskosten (Gericht plus beide Anwälte) angeben.',
    'Ablesen, welchen Kostenanteil jede Seite trägt.',
  ],
  faq: [
    { q: 'Wie funktioniert die Kostenquote?', a: 'Nach § 92 ZPO werden die Kosten im Verhältnis von Obsiegen und Unterliegen verteilt. Gewinnt der Kläger 60 % der Forderung, trägt der Beklagte 60 % der Kosten und der Kläger 40 %.' },
    { q: 'Was passiert bei geringfügigem Unterliegen?', a: 'Unterliegt eine Partei nur in einem kleinen Teil und sind dadurch keine besonderen Kosten entstanden, kann das Gericht der anderen Partei die gesamten Kosten auferlegen (§ 92 Abs. 2 ZPO).' },
    { q: 'Welche Kosten gehören dazu?', a: 'Die Gerichtskosten sowie die Anwaltskosten beider Seiten, gegebenenfalls zuzüglich Auslagen für Zeugen oder Sachverständige.' },
    { q: 'Gilt das auch außergerichtlich?', a: 'Die Quotelung nach § 92 ZPO betrifft das gerichtliche Verfahren. Außergerichtlich können die Parteien eine eigene Kostenregelung vereinbaren, etwa in einem Vergleich.' },
    { q: 'Bekomme ich meine Anwaltskosten erstattet?', a: 'Soweit du obsiegst, ja – im Rahmen der gesetzlichen RVG-Gebühren. Vereinbarte Honorare über dem RVG-Satz werden in der Regel nicht erstattet.' },
  ],
  related: ['prozesskostenrisiko-rechner', 'gerichtskosten-rechner', 'anwaltskosten-rechner'],
  examples: [
    {
      values: { eingeklagt: 10000, zugesprochen: 6000, gesamtkosten: 3000 },
      expect: [
        { label: 'Kosten trägt Kläger', value: 1200, tolerance: 0.5 },
        { label: 'Kosten trägt Beklagter', value: 1800, tolerance: 0.5 },
        { label: 'Obsiegensquote Kläger', value: 60, tolerance: 0.1 },
      ],
    },
    {
      values: { eingeklagt: 5000, zugesprochen: 5000, gesamtkosten: 2000 },
      expect: [
        { label: 'Kosten trägt Beklagter', value: 2000, tolerance: 0.5 },
      ],
    },
  ],
  updated: '2026-06-18',
};
