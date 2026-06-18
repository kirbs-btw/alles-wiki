import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

// Kita-Beitrag-Rechner (Näherung). Kita-Gebühren sind in Deutschland
// kommunal geregelt und oft einkommensabhängig gestaffelt. Dieser Rechner
// bildet eine VEREINFACHTE, frei einstellbare Staffel ab: ein prozentualer
// Beitragssatz auf das Bruttojahreseinkommen, begrenzt durch einen Maximalbeitrag,
// abhängig vom Betreuungsumfang. KEINE amtlichen Sätze – Orientierung.

const UMFANG: { value: string; label: string; faktor: number }[] = [
  { value: 'halbtags', label: 'Halbtags (bis 5 h)', faktor: 0.6 },
  { value: 'teilzeit', label: 'Teilzeit (bis 7 h)', faktor: 0.8 },
  { value: 'ganztags', label: 'Ganztags (über 7 h)', faktor: 1.0 },
];

export const tool: Tool = {
  slug: 'kita-beitrag-rechner',
  category: 'familie',
  title: 'Kita-Beitrag-Rechner (Näherung)',
  shortTitle: 'Kita-Beitrag',
  description:
    'Schätze den einkommensabhängigen Kita-Beitrag als Prozentsatz des Einkommens, begrenzt durch einen Höchstbeitrag und den Betreuungsumfang. Frei einstellbare Näherung.',
  keywords: [
    'kita beitrag rechner',
    'kita gebühren berechnen',
    'kindergartenbeitrag rechner',
    'kita kosten einkommen',
    'betreuungsbeitrag rechner',
    'kita beitrag staffelung',
  ],
  intro:
    'Kita-Beiträge sind in Deutschland kommunal geregelt und meist nach Einkommen, Betreuungsumfang und Geschwisterzahl gestaffelt – feste bundesweite Sätze gibt es nicht. Dieser Rechner bildet eine frei einstellbare Näherung ab: ein Prozentsatz des Bruttojahreseinkommens, begrenzt durch einen Höchstbeitrag und gewichtet nach dem Betreuungsumfang. Maßgeblich ist die Satzung Ihrer Kommune.',
  formula:
    'Beitrag = min(Bruttojahr × Satz% ÷ 12; Höchstbeitrag) × Umfangfaktor',
  inputs: [
    { type: 'number', id: 'brutto', label: 'Bruttojahreseinkommen (Haushalt)', unit: '€/Jahr', default: 50000, min: 0, max: 300000, step: 1000 },
    { type: 'number', id: 'satz', label: 'Beitragssatz der Kommune', unit: '%', default: 3, min: 0, max: 10, step: 0.1, help: 'Anteil des Einkommens, je nach Satzung' },
    { type: 'number', id: 'hoechst', label: 'Höchstbeitrag pro Monat', unit: '€', default: 250, min: 0, max: 1000, step: 10 },
    {
      type: 'select', id: 'umfang', label: 'Betreuungsumfang', default: 'ganztags',
      options: UMFANG.map((u) => ({ value: u.value, label: u.label })),
    },
  ],
  compute: (v) => {
    const brutto = Math.max(0, num(v.brutto, 50000));
    const satz = Math.max(0, num(v.satz, 3));
    const hoechst = Math.max(0, num(v.hoechst, 250));
    const umfang = UMFANG.find((u) => u.value === String(v.umfang)) ?? UMFANG[2];
    const rohBeitrag = (brutto * (satz / 100)) / 12;
    const gedeckelt = Math.min(rohBeitrag, hoechst);
    const beitrag = gedeckelt * umfang.faktor;
    const jahr = beitrag * 12;
    return [
      { label: 'Kita-Beitrag pro Monat', value: beitrag, unit: '€', digits: 2, primary: true },
      { label: 'Beitrag vor Umfangfaktor', value: gedeckelt, unit: '€', digits: 2 },
      { label: 'Kita-Beitrag pro Jahr', value: jahr, unit: '€', digits: 2 },
    ];
  },
  howto: [
    'Bruttojahreseinkommen des Haushalts eingeben.',
    'Beitragssatz und Höchstbeitrag aus der Satzung Ihrer Kommune eintragen.',
    'Betreuungsumfang wählen (halbtags, teilzeit, ganztags).',
    'Den geschätzten monatlichen Kita-Beitrag ablesen.',
  ],
  faq: [
    { q: 'Wie werden Kita-Beiträge berechnet?', a: 'Sie sind kommunal geregelt, meist gestaffelt nach Einkommen, Betreuungsumfang und Geschwisterzahl. Manche Bundesländer haben das letzte Kita-Jahr beitragsfrei gestellt.' },
    { q: 'Gibt es bundesweite Sätze?', a: 'Nein. Jede Stadt oder Gemeinde hat eine eigene Beitragssatzung. Dieser Rechner ist deshalb nur eine frei einstellbare Näherung.' },
    { q: 'Was zählt zum Einkommen?', a: 'In der Regel das gemeinsame Bruttoeinkommen der Eltern. Welche Einkünfte genau herangezogen werden, regelt die jeweilige Satzung.' },
    { q: 'Gibt es Geschwisterermäßigung?', a: 'Häufig ja – für weitere Kinder in Betreuung sinkt der Beitrag oft deutlich. Das ist in dieser Näherung nicht enthalten.' },
  ],
  related: ['betreuungskosten-rechner', 'kosten-kind-rechner', 'familienbudget-rechner'],
  examples: [
    {
      values: { brutto: 50000, satz: 3, hoechst: 250, umfang: 'ganztags' },
      expect: [
        { label: 'Beitrag vor Umfangfaktor', value: 125, tolerance: 0.01 },
        { label: 'Kita-Beitrag pro Monat', value: 125, tolerance: 0.01 },
      ],
    },
    {
      values: { brutto: 120000, satz: 4, hoechst: 250, umfang: 'halbtags' },
      expect: [
        { label: 'Beitrag vor Umfangfaktor', value: 250, tolerance: 0.01 },
        { label: 'Kita-Beitrag pro Monat', value: 150, tolerance: 0.01 },
      ],
    },
  ],
  updated: '2026-06-18',
};
