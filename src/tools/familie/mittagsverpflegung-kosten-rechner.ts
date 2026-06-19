import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

// Mittagsverpflegung Kita/Schule: Kosten pro Mahlzeit × Essenstage pro Woche,
// hochgerechnet auf Wochen pro Jahr, optional für mehrere Kinder. Liefert
// Wochen-, Monats- und Jahreskosten. Reine Kostenplanung.

export const tool: Tool = {
  slug: 'mittagsverpflegung-kosten-rechner',
  category: 'familie',
  title: 'Mittagsverpflegung-Kosten-Rechner (Kita & Schule)',
  shortTitle: 'Mittagessen',
  description:
    'Berechne die Kosten für das Mittagessen in Kita oder Schule: Preis je Essen, Essenstage pro Woche und Anzahl Kinder ergeben Wochen-, Monats- und Jahreskosten.',
  keywords: [
    'mittagessen kita kosten',
    'schulessen kosten rechner',
    'mittagsverpflegung kosten',
    'essensgeld kita',
    'mensa kosten schule',
    'mittagessen schule pro monat',
  ],
  intro:
    'Das warme Mittagessen in Kita oder Schule schlägt übers Jahr deutlich zu Buche. Dieser Rechner ermittelt aus dem Preis je Mahlzeit, den Essenstagen pro Woche und der Zahl der Kinder die Kosten pro Woche, Monat und Jahr. Schulferien können über die berücksichtigten Wochen pro Jahr abgebildet werden.',
  formula:
    'Jahr = Preis × Essenstage/Woche × Wochen/Jahr × Kinder; Monat = Jahr / 12',
  inputs: [
    { type: 'number', id: 'preis', label: 'Preis je Mittagessen', unit: '€', default: 4, min: 0, max: 30, step: 0.1 },
    { type: 'number', id: 'tage', label: 'Essenstage pro Woche', unit: 'Tage', default: 5, min: 1, max: 7, step: 1 },
    { type: 'number', id: 'wochen', label: 'Wochen pro Jahr', unit: 'Wochen', default: 40, min: 1, max: 52, step: 1, help: 'Schule oft ~40, Kita ~46' },
    { type: 'number', id: 'kinder', label: 'Anzahl Kinder', unit: 'Kinder', default: 1, min: 1, max: 10, step: 1 },
  ],
  compute: (v) => {
    const preis = Math.max(0, num(v.preis, 4));
    const tage = Math.max(1, num(v.tage, 5));
    const wochen = Math.max(1, num(v.wochen, 40));
    const kinder = Math.max(1, num(v.kinder, 1));
    const proWoche = preis * tage * kinder;
    const proJahr = proWoche * wochen;
    const proMonat = proJahr / 12;
    return [
      { label: 'Kosten pro Jahr', value: proJahr, unit: '€', digits: 2, primary: true },
      { label: 'Kosten pro Monat', value: proMonat, unit: '€', digits: 2, help: 'Jahreskosten gleichmäßig verteilt' },
      { label: 'Kosten pro Woche', value: proWoche, unit: '€', digits: 2 },
    ];
  },
  howto: [
    'Preis je Mittagessen eintragen (Kita- oder Schulessen-Beitrag).',
    'Essenstage pro Woche und berücksichtigte Wochen pro Jahr eingeben (Ferien abziehen).',
    'Anzahl der Kinder ergänzen.',
    'Wochen-, Monats- und Jahreskosten ablesen.',
  ],
  faq: [
    { q: 'Wie viele Wochen soll ich pro Jahr ansetzen?', a: 'In der Schule fallen rund 12 Ferienwochen weg, also etwa 40 Essenswochen. Kitas haben meist kürzere Schließzeiten – hier sind oft 45 bis 47 Wochen realistisch.' },
    { q: 'Gibt es Zuschüsse zum Mittagessen?', a: 'Über das Bildungs- und Teilhabepaket kann das Mittagessen für berechtigte Kinder bezuschusst werden. Voraussetzungen und Höhe klärt das zuständige Amt (Stand 2026).' },
    { q: 'Warum sind die Monatskosten niedriger als Preis mal Esstage?', a: 'Weil die Jahreskosten – inklusive der essensfreien Ferienwochen – gleichmäßig auf zwölf Monate verteilt werden. So ergibt sich ein realistischer Monatsdurchschnitt.' },
  ],
  related: ['kita-beitrag-rechner', 'betreuungskosten-rechner', 'familienbudget-rechner'],
  examples: [
    {
      values: { preis: 4, tage: 5, wochen: 40, kinder: 1 },
      expect: [
        { label: 'Kosten pro Woche', value: 20, tolerance: 0.01 },
        { label: 'Kosten pro Jahr', value: 800, tolerance: 0.01 },
        { label: 'Kosten pro Monat', value: 66.6667, tolerance: 0.01 },
      ],
    },
    {
      values: { preis: 3.5, tage: 5, wochen: 46, kinder: 2 },
      expect: [{ label: 'Kosten pro Jahr', value: 1610, tolerance: 0.01 }],
    },
  ],
  updated: '2026-06-19',
};
