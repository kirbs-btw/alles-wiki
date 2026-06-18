import type { Tool } from '../../lib/types';
import { toDate } from '../../lib/types';

const WOCHENTAGE = [
  'Sonntag',
  'Montag',
  'Dienstag',
  'Mittwoch',
  'Donnerstag',
  'Freitag',
  'Samstag',
];

export const tool: Tool = {
  slug: 'wochentag-rechner',
  category: 'alltag',
  title: 'Wochentag berechnen',
  shortTitle: 'Wochentag',
  description:
    'Finde heraus, auf welchen Wochentag ein beliebiges Datum fällt – ob Geburtstag, historisches Datum oder ein Tag in der Zukunft. Mit Tag-im-Jahr und Quartal.',
  keywords: [
    'wochentag berechnen',
    'welcher wochentag',
    'an welchem tag geboren',
    'wochentag eines datums',
    'tag der woche',
  ],
  formula: 'Wochentag = Datum mod 7 (gregorianischer Kalender)',
  inputs: [
    {
      type: 'date',
      id: 'datum',
      label: 'Datum',
      default: '2026-06-18',
      today: true,
      help: 'Standard: heute.',
    },
  ],
  compute: (v) => {
    const iso = String(v.datum);
    const d = toDate(iso);
    if (!d) {
      return [{ label: 'Wochentag', value: 'ungültiges Datum', primary: true }];
    }
    const wtIndex = d.getUTCDay();
    const name = WOCHENTAGE[wtIndex];
    const istWochenende = wtIndex === 0 || wtIndex === 6;

    // ISO-Wochentagsnummer (Montag = 1 … Sonntag = 7).
    const isoWt = wtIndex === 0 ? 7 : wtIndex;

    // Tag im Jahr (1 = 1. Januar).
    const jahresStart = Date.UTC(d.getUTCFullYear(), 0, 1);
    const tagImJahr = Math.round((d.getTime() - jahresStart) / 86_400_000) + 1;

    const quartal = Math.floor(d.getUTCMonth() / 3) + 1;

    return [
      { label: 'Wochentag', value: name, primary: true },
      { label: 'Wochentagsnummer (Mo=1)', value: isoWt, digits: 0 },
      { label: 'Wochenende', value: istWochenende ? 'ja' : 'nein' },
      { label: 'Tag im Jahr', value: tagImJahr, unit: 'Tag', digits: 0 },
      { label: 'Quartal', value: quartal, unit: 'Quartal', digits: 0 },
    ];
  },
  intro:
    '<p>Gib ein Datum ein und der Rechner sagt dir, auf welchen Wochentag es fällt – nützlich für Geburtstage, Planungen oder historische Daten. Die Berechnung gilt für den gregorianischen Kalender (ab 1583).</p>',
  howto: [
    'Datum eintragen (Standard: heute).',
    'Wochentag, Wochentagsnummer und ob es ein Wochenende ist ablesen.',
    'Zusätzlich erhältst du den Tag im Jahr und das Quartal.',
  ],
  faq: [
    {
      q: 'Funktioniert der Rechner auch für die Vergangenheit?',
      a: 'Ja, für alle Daten im gregorianischen Kalender (eingeführt 1582/1583). Für ältere Daten gilt der julianische Kalender, der hier nicht abgebildet wird.',
    },
    {
      q: 'Wie wird die Wochentagsnummer gezählt?',
      a: 'Nach ISO 8601: Montag = 1, Dienstag = 2 … Sonntag = 7. Das ist in Deutschland und Europa üblich.',
    },
  ],
  related: ['kalenderwoche-rechner', 'datum-plus-rechner', 'tage-zwischen-daten-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      // 18.06.2026 ist ein Donnerstag.
      values: { datum: '2026-06-18' },
      expect: [
        { label: 'Wochentagsnummer (Mo=1)', value: 4, tolerance: 0 },
        { label: 'Tag im Jahr', value: 169, tolerance: 0 },
        { label: 'Quartal', value: 2, tolerance: 0 },
      ],
    },
    {
      // 01.01.2000 war ein Samstag.
      values: { datum: '2000-01-01' },
      expect: [
        { label: 'Wochentagsnummer (Mo=1)', value: 6, tolerance: 0 },
        { label: 'Tag im Jahr', value: 1, tolerance: 0 },
      ],
    },
  ],
};
