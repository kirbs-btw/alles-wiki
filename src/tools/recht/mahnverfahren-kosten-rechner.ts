import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

// Gebührentabelle Anlage 2 zum GKG (1,0-Gebühr je Streitwert, Stand 2026)
function gkgEinfacheGebuehr(wert: number): number {
  if (wert <= 0) return 0;
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
    if (wert <= s.bis) return s.gebuehr;
  }
  const ueber = wert - 50000;
  const stufen10k = Math.ceil(ueber / 10000);
  return 601 + stufen10k * 116;
}

export const tool: Tool = {
  slug: 'mahnverfahren-kosten-rechner',
  category: 'recht',
  title: 'Mahnverfahren-Kosten-Rechner (gerichtlicher Mahnbescheid)',
  shortTitle: 'Mahnverfahren',
  description:
    'Berechne die Gerichtskosten für einen Mahnbescheid: 0,5-Gebühr aus der GKG-Tabelle, mindestens 36 € (KV 1100 GKG, Stand 2026).',
  keywords: [
    'mahnverfahren kosten rechner',
    'mahnbescheid kosten',
    'gerichtliches mahnverfahren gebühr',
    'kosten mahnbescheid berechnen',
    'mahngericht gebühr',
    'mahnverfahren streitwert',
  ],
  formula: 'Gerichtskosten Mahnbescheid = 0,5 × GKG-Gebühr, mindestens 36 €',
  inputs: [
    { type: 'number', id: 'forderung', label: 'Höhe der Forderung', unit: '€', default: 2000, min: 0, step: 50, help: 'Hauptforderung, die per Mahnbescheid geltend gemacht wird.' },
  ],
  compute: (v) => {
    const forderung = num(v.forderung);
    const einfach = gkgEinfacheGebuehr(forderung);
    const berechnet = 0.5 * einfach;
    const gebuehr = Math.max(berechnet, 36);
    return [
      { label: 'Gerichtskosten Mahnbescheid', value: gebuehr, unit: '€', digits: 2, primary: true },
      { label: '0,5-Gebühr (rechnerisch)', value: berechnet, unit: '€', digits: 2 },
      { label: 'volle GKG-Gebühr (1,0)', value: einfach, unit: '€', digits: 2 },
    ];
  },
  intro:
    'Das gerichtliche Mahnverfahren ist ein schneller, kostengünstiger Weg, eine unbestrittene Geldforderung zu titulieren. Für den Erlass des Mahnbescheids erhebt das Gericht eine halbe Gebühr (0,5) aus dem GKG, mindestens jedoch 36 €. Legt der Schuldner Widerspruch ein und geht die Sache ins streitige Verfahren über, fallen weitere Gebühren an. Dieser Rechner liefert eine Orientierung (Stand 2026) ohne Anwalts- und Zustellungskosten.',
  howto: [
    'Höhe der Forderung eingeben.',
    'Gerichtskosten für den Mahnbescheid ablesen.',
    'Bei späterem Widerspruch zusätzlich die Kosten des streitigen Verfahrens berücksichtigen.',
  ],
  faq: [
    { q: 'Wie hoch sind die Gerichtskosten beim Mahnbescheid?', a: 'Es wird eine 0,5-Gebühr aus dem Gerichtskostengesetz erhoben, mindestens 36 € (Nr. 1100 KV GKG). Die Höhe richtet sich nach der geltend gemachten Forderung.' },
    { q: 'Was kostet der Mahnbescheid mindestens?', a: 'Die Mindestgebühr beträgt 36 €, unabhängig davon, wie gering die Forderung ist.' },
    { q: 'Was passiert bei Widerspruch?', a: 'Widerspricht der Schuldner, geht das Verfahren auf Antrag in das streitige Gerichtsverfahren über. Dann fallen die regulären Gerichtsgebühren (in der Regel 3,0) an, auf die die bereits gezahlte 0,5-Gebühr angerechnet wird.' },
    { q: 'Wer trägt die Kosten des Mahnverfahrens?', a: 'Die Kosten muss zunächst der Antragsteller vorschießen. Im Erfolgsfall werden sie dem Schuldner als Verfahrenskosten auferlegt.' },
  ],
  related: ['gerichtskosten-rechner', 'mahngebuehren-rechner', 'verzugszinsen-rechner'],
  examples: [
    {
      values: { forderung: 2000 },
      expect: [
        { label: 'volle GKG-Gebühr (1,0)', value: 98, tolerance: 0.5 },
        { label: '0,5-Gebühr (rechnerisch)', value: 49, tolerance: 0.5 },
        { label: 'Gerichtskosten Mahnbescheid', value: 49, tolerance: 0.5 },
      ],
    },
    {
      values: { forderung: 300 },
      expect: [
        { label: '0,5-Gebühr (rechnerisch)', value: 19, tolerance: 0.5 },
        { label: 'Gerichtskosten Mahnbescheid', value: 36, tolerance: 0.5 },
      ],
    },
  ],
  updated: '2026-06-18',
};
