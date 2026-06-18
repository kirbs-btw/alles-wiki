import type { Tool } from '../../lib/types';
import { toDate, num } from '../../lib/types';

const WOCHENTAGE = [
  'Sonntag',
  'Montag',
  'Dienstag',
  'Mittwoch',
  'Donnerstag',
  'Freitag',
  'Samstag',
];

function formatDe(d: Date): string {
  const tag = String(d.getUTCDate()).padStart(2, '0');
  const monat = String(d.getUTCMonth() + 1).padStart(2, '0');
  return `${tag}.${monat}.${d.getUTCFullYear()}`;
}

export const tool: Tool = {
  slug: 'datum-plus-rechner',
  category: 'alltag',
  title: 'Datum plus Tage / Wochen berechnen',
  shortTitle: 'Datum + N',
  description:
    'Addiere oder subtrahiere Tage, Wochen, Monate oder Jahre zu einem Datum und erhalte das neue Datum samt Wochentag – ideal für Fristen, Termine und Planungen.',
  keywords: [
    'datum plus tage',
    'datum berechnen',
    'tage addieren',
    'datum in x tagen',
    'datum plus wochen',
    'datum minus tage',
  ],
  formula: 'neues Datum = Startdatum ± Anzahl × Einheit',
  inputs: [
    {
      type: 'date',
      id: 'start',
      label: 'Startdatum',
      default: '2026-06-18',
      today: true,
      help: 'Standard: heute.',
    },
    {
      type: 'number',
      id: 'anzahl',
      label: 'Anzahl',
      default: 30,
      step: 1,
      help: 'Negative Zahl = in die Vergangenheit rechnen.',
    },
    {
      type: 'select',
      id: 'einheit',
      label: 'Einheit',
      default: 'tage',
      options: [
        { value: 'tage', label: 'Tage' },
        { value: 'wochen', label: 'Wochen' },
        { value: 'monate', label: 'Monate' },
        { value: 'jahre', label: 'Jahre' },
      ],
    },
  ],
  compute: (v) => {
    const start = toDate(String(v.start));
    if (!start) {
      return [{ label: 'Neues Datum', value: 'ungültiges Datum', primary: true }];
    }
    const anzahl = Math.round(num(v.anzahl));
    const einheit = String(v.einheit);

    const ziel = new Date(start.getTime());
    if (einheit === 'tage') {
      ziel.setUTCDate(ziel.getUTCDate() + anzahl);
    } else if (einheit === 'wochen') {
      ziel.setUTCDate(ziel.getUTCDate() + anzahl * 7);
    } else if (einheit === 'monate') {
      ziel.setUTCMonth(ziel.getUTCMonth() + anzahl);
    } else if (einheit === 'jahre') {
      ziel.setUTCFullYear(ziel.getUTCFullYear() + anzahl);
    }

    const differenzTage = Math.round((ziel.getTime() - start.getTime()) / 86_400_000);

    return [
      { label: 'Neues Datum', value: formatDe(ziel), primary: true },
      { label: 'Wochentag', value: WOCHENTAGE[ziel.getUTCDay()] },
      { label: 'ISO-Format', value: ziel.toISOString().slice(0, 10) },
      { label: 'Differenz in Tagen', value: differenzTage, unit: 'Tage', digits: 0 },
    ];
  },
  intro:
    '<p>Dieser Rechner addiert (oder subtrahiert) eine beliebige Zeitspanne zu einem Datum und gibt das resultierende Datum samt Wochentag aus. Bei Monaten und Jahren werden Monatslängen und Schaltjahre kalendergenau berücksichtigt.</p>',
  howto: [
    'Startdatum eintragen (Standard: heute).',
    'Anzahl wählen – negative Werte rechnen in die Vergangenheit.',
    'Einheit (Tage, Wochen, Monate oder Jahre) festlegen.',
    'Neues Datum und Wochentag ablesen.',
  ],
  faq: [
    {
      q: 'Wie werden Monate gezählt, wenn der Zieltag nicht existiert?',
      a: 'Beim Addieren von Monaten kann es vorkommen, dass der Zieltag im Monat nicht existiert (z. B. 31.01. + 1 Monat). Dann rollt der Kalender in den Folgemonat – das entspricht dem Standardverhalten der Datumsrechnung.',
    },
    {
      q: 'Kann ich auch rückwärts rechnen?',
      a: 'Ja. Gib bei der Anzahl einfach einen negativen Wert ein, etwa −14 Tage, um 14 Tage zurückzurechnen.',
    },
    {
      q: 'Sind Schaltjahre berücksichtigt?',
      a: 'Ja. Beim Rechnen mit Tagen, Wochen, Monaten und Jahren werden alle Schalttage kalendergenau einbezogen.',
    },
  ],
  related: ['tage-zwischen-daten-rechner', 'tage-bis-rechner', 'wochentag-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      // 18.06.2026 + 30 Tage = 18.07.2026.
      values: { start: '2026-06-18', anzahl: 30, einheit: 'tage' },
      expect: [{ label: 'Differenz in Tagen', value: 30, tolerance: 0 }],
    },
    {
      // 01.01.2026 + 10 Wochen = 70 Tage.
      values: { start: '2026-01-01', anzahl: 10, einheit: 'wochen' },
      expect: [{ label: 'Differenz in Tagen', value: 70, tolerance: 0 }],
    },
    {
      // Rückwärts: 01.03.2026 − 1 Monat -> 01.02.2026 (28 Tage zurück).
      values: { start: '2026-03-01', anzahl: -1, einheit: 'monate' },
      expect: [{ label: 'Differenz in Tagen', value: -28, tolerance: 0 }],
    },
  ],
};
