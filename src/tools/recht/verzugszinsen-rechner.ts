import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'verzugszinsen-rechner',
  category: 'recht',
  title: 'Verzugszinsen-Rechner',
  shortTitle: 'Verzugszinsen',
  description:
    'Berechne gesetzliche Verzugszinsen auf eine offene Forderung: tagesgenau aus Hauptforderung, Zinssatz und Verzugsdauer nach § 288 BGB.',
  keywords: [
    'verzugszinsen rechner',
    'verzugszinsen berechnen',
    'zinsen offene rechnung',
    'verzugszinssatz',
    'basiszinssatz verzug',
    'mahnung zinsen',
    'verzugszinsen 9 prozent',
  ],
  formula: 'Verzugszinsen = Hauptforderung × Zinssatz/100 × Tage/365',
  inputs: [
    { type: 'number', id: 'forderung', label: 'Offene Hauptforderung', unit: '€', default: 1000, min: 0, step: 1 },
    { type: 'number', id: 'tage', label: 'Tage im Verzug', unit: 'Tage', default: 90, min: 0, step: 1 },
    {
      type: 'select', id: 'zinssatz', label: 'Verzugszinssatz', default: '8.62',
      options: [
        { value: '5', label: 'Verbraucher: Basiszins + 5 % (≈ 8,62 %)', },
        { value: '9', label: 'Geschäftsverkehr: Basiszins + 9 % (≈ 12,62 %)' },
        { value: '8.62', label: 'Fester Satz 8,62 % (Verbraucher, Stand 2026)' },
        { value: '12.62', label: 'Fester Satz 12,62 % (B2B, Stand 2026)' },
      ],
      help: 'Basiszinssatz Stand 2026 angenommen mit 3,62 %. Aktuellen Wert der Bundesbank prüfen.',
    },
  ],
  compute: (v) => {
    const forderung = num(v.forderung);
    const tage = num(v.tage);
    const wahl = String(v.zinssatz);
    const basis = 3.62; // angenommener Basiszinssatz, Stand 2026
    let satz: number;
    if (wahl === '5') satz = basis + 5;
    else if (wahl === '9') satz = basis + 9;
    else satz = num(v.zinssatz, 8.62);
    const zinsen = forderung * (satz / 100) * (tage / 365);
    const gesamt = forderung + zinsen;
    return [
      { label: 'Verzugszinsen', value: zinsen, unit: '€', digits: 2, primary: true },
      { label: 'Gesamtforderung', value: gesamt, unit: '€', digits: 2 },
      { label: 'Angewandter Zinssatz', value: satz, unit: '%', digits: 2 },
    ];
  },
  intro:
    'Gerät ein Schuldner in Verzug, kann der Gläubiger Verzugszinsen verlangen (§ 288 BGB). Bei Verbrauchern beträgt der Satz fünf Prozentpunkte über dem Basiszinssatz, im Geschäftsverkehr neun Prozentpunkte. Der Basiszinssatz wird halbjährlich von der Deutschen Bundesbank festgelegt – prüfe vor der konkreten Forderung den aktuellen Wert. Stand 2026 wird hier 3,62 % angenommen.',
  howto: [
    'Offene Hauptforderung in Euro eingeben.',
    'Anzahl der Tage seit Verzugsbeginn angeben.',
    'Passenden Zinssatz wählen (Verbraucher oder Geschäftsverkehr).',
    'Verzugszinsen ablesen und zur Hauptforderung addieren.',
  ],
  faq: [
    { q: 'Wie hoch sind die gesetzlichen Verzugszinsen?', a: 'Bei Verbrauchern: Basiszinssatz + 5 Prozentpunkte. Bei Rechtsgeschäften ohne Verbraucherbeteiligung: Basiszinssatz + 9 Prozentpunkte. Der Basiszinssatz wird halbjährlich angepasst.' },
    { q: 'Wann beginnt der Verzug?', a: 'In der Regel nach einer Mahnung oder spätestens 30 Tage nach Fälligkeit und Zugang der Rechnung (§ 286 BGB). Bei Verbrauchern muss auf diese Frist in der Rechnung hingewiesen werden.' },
    { q: 'Welcher Basiszinssatz gilt aktuell?', a: 'Der Basiszinssatz ändert sich zum 1. Januar und 1. Juli. Stand 2026 rechnet dieses Tool mit 3,62 %. Den verbindlichen Wert veröffentlicht die Deutsche Bundesbank.' },
    { q: 'Werden die Zinsen tagesgenau berechnet?', a: 'Ja, dieser Rechner teilt durch 365 Tage und multipliziert mit den Verzugstagen, was der üblichen taggenauen Berechnung entspricht.' },
    { q: 'Kann ich neben Zinsen weitere Kosten verlangen?', a: 'Im Geschäftsverkehr besteht zusätzlich Anspruch auf eine Verzugspauschale von 40 € (§ 288 Abs. 5 BGB). Auch Mahn- und Rechtsverfolgungskosten können geltend gemacht werden.' },
  ],
  related: ['mahngebuehren-rechner', 'abfindung-rechner', 'gerichtskosten-rechner'],
  examples: [
    {
      values: { forderung: 1000, tage: 365, zinssatz: '8.62' },
      expect: [
        { label: 'Verzugszinsen', value: 86.2, tolerance: 0.5 },
        { label: 'Gesamtforderung', value: 1086.2, tolerance: 0.5 },
      ],
    },
    {
      values: { forderung: 5000, tage: 90, zinssatz: '9' },
      expect: [
        { label: 'Angewandter Zinssatz', value: 12.62, tolerance: 0.01 },
      ],
    },
  ],
  updated: '2026-06-18',
};
