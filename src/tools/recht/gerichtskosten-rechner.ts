import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

// Gebührentabelle Anlage 2 zu § 34 GKG (vereinfacht, Stand 2026).
// Liefert den einfachen Gebührensatz (1,0) zu einem Streitwert.
function einfacheGebuehr(streitwert: number): number {
  if (streitwert <= 0) return 0;
  // Staffel bis 500 €: 38 €, danach in festen Stufen.
  const stufen: { bis: number; gebuehr: number }[] = [
    { bis: 500, gebuehr: 38 },
    { bis: 1000, gebuehr: 58 },
    { bis: 1500, gebuehr: 78 },
    { bis: 2000, gebuehr: 98 },
    { bis: 3000, gebuehr: 119 },
    { bis: 4000, gebuehr: 140 },
    { bis: 5000, gebuehr: 161 },
    { bis: 6000, gebuehr: 182 },
    { bis: 7000, gebuehr: 203 },
    { bis: 8000, gebuehr: 224 },
    { bis: 9000, gebuehr: 245 },
    { bis: 10000, gebuehr: 266 },
    { bis: 13000, gebuehr: 295 },
    { bis: 16000, gebuehr: 324 },
    { bis: 19000, gebuehr: 353 },
    { bis: 22000, gebuehr: 382 },
    { bis: 25000, gebuehr: 411 },
    { bis: 30000, gebuehr: 449 },
    { bis: 35000, gebuehr: 487 },
    { bis: 40000, gebuehr: 525 },
    { bis: 45000, gebuehr: 563 },
    { bis: 50000, gebuehr: 601 },
  ];
  for (const s of stufen) {
    if (streitwert <= s.bis) return s.gebuehr;
  }
  // Über 50.000 €: je angefangene 5.000 € rund 76 € zusätzlich (Näherung).
  const ueber = streitwert - 50000;
  const stufen5k = Math.ceil(ueber / 5000);
  return 601 + stufen5k * 76;
}

export const tool: Tool = {
  slug: 'gerichtskosten-rechner',
  category: 'recht',
  title: 'Gerichtskosten-Rechner (Zivilprozess)',
  shortTitle: 'Gerichtskosten',
  description:
    'Schätze die Gerichtskosten einer Zivilklage in erster Instanz aus dem Streitwert: 3,0-fache Verfahrensgebühr nach GKG, vereinfacht (Stand 2026).',
  keywords: [
    'gerichtskosten rechner',
    'gerichtskosten berechnen',
    'streitwert gerichtskosten',
    'gkg gebühren',
    'prozesskosten rechner',
    'kosten klage zivilgericht',
    'gerichtsgebühren tabelle',
  ],
  formula: 'Gerichtskosten ≈ 3,0 × einfache Gebühr (Anlage 2 GKG) zum Streitwert',
  inputs: [
    { type: 'number', id: 'streitwert', label: 'Streitwert', unit: '€', default: 5000, min: 0, step: 100, help: 'Der Wert des Streitgegenstands (meist die eingeklagte Summe).' },
    {
      type: 'select', id: 'gebuehrensatz', label: 'Verfahren', default: '3',
      options: [
        { value: '3', label: 'Streitiges Urteil (3,0 Gebühren)' },
        { value: '1', label: 'Vergleich / Klagerücknahme (1,0 Gebühr)' },
        { value: '2', label: 'Versäumnis-/Anerkenntnisurteil (2,0 Gebühren)' },
      ],
    },
  ],
  compute: (v) => {
    const streitwert = num(v.streitwert);
    const satz = num(v.gebuehrensatz, 3);
    const einfach = einfacheGebuehr(streitwert);
    const gericht = einfach * satz;
    return [
      { label: 'Geschätzte Gerichtskosten', value: gericht, unit: '€', digits: 2, primary: true },
      { label: 'Einfache Gebühr (1,0)', value: einfach, unit: '€', digits: 2 },
      { label: 'Gebührensatz', value: satz, unit: '-fach', digits: 1 },
    ];
  },
  intro:
    'Die Gerichtskosten im Zivilprozess richten sich nach dem Streitwert und der Gebührentabelle (Anlage 2 zum GKG). In der ersten Instanz fällt bei streitigem Urteil eine 3,0-fache Gebühr an, bei einem Vergleich oder einer Rücknahme oft nur eine 1,0-fache. Dieser Rechner gibt eine vereinfachte Näherung (Stand 2026) und ersetzt keine verbindliche Kostenrechnung des Gerichts.',
  howto: [
    'Streitwert eingeben – meist die Höhe der eingeklagten Forderung.',
    'Art des Verfahrensausgangs wählen (Urteil, Vergleich, Versäumnis).',
    'Geschätzte Gerichtskosten ablesen.',
    'Beachten: Anwaltskosten kommen separat hinzu.',
  ],
  faq: [
    { q: 'Was ist der Streitwert?', a: 'Der Streitwert (Gegenstandswert) bemisst den wirtschaftlichen Wert des Streits. Bei einer Geldforderung entspricht er meist der eingeklagten Summe.' },
    { q: 'Warum 3,0 Gebühren?', a: 'Für das Verfahren im Allgemeinen sieht das GKG in erster Instanz eine 3,0-fache Gebühr vor. Bei einem Vergleich oder einer frühen Erledigung ermäßigt sie sich, häufig auf 1,0.' },
    { q: 'Sind Anwaltskosten enthalten?', a: 'Nein. Dieser Rechner zeigt nur die Gerichtskosten. Anwaltsgebühren nach dem RVG berechnest du separat – etwa mit unserem Anwaltskosten-Rechner.' },
    { q: 'Wer trägt die Kosten?', a: 'Grundsätzlich trägt die unterliegende Partei die Kosten (§ 91 ZPO). Bei teilweisem Obsiegen werden sie quotal verteilt.' },
    { q: 'Wie genau ist die Schätzung?', a: 'Die Werte folgen der Gebührentabelle des GKG (Stand 2026). Für Beträge über 50.000 € wird genähert. Die verbindliche Berechnung nimmt das Gericht vor.' },
  ],
  related: ['anwaltskosten-rechner', 'verzugszinsen-rechner', 'mahngebuehren-rechner'],
  examples: [
    {
      values: { streitwert: 5000, gebuehrensatz: '3' },
      expect: [
        { label: 'Einfache Gebühr (1,0)', value: 161, tolerance: 0.5 },
        { label: 'Geschätzte Gerichtskosten', value: 483, tolerance: 0.5 },
      ],
    },
    {
      values: { streitwert: 10000, gebuehrensatz: '1' },
      expect: [
        { label: 'Geschätzte Gerichtskosten', value: 266, tolerance: 0.5 },
      ],
    },
  ],
  updated: '2026-06-18',
};
