import type { Tool } from '../../lib/types';
import { daysBetween, diffYMD, toDate } from '../../lib/types';

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
  slug: 'tage-bis-rechner',
  category: 'alltag',
  title: 'Tage bis zu einem Datum (Countdown)',
  shortTitle: 'Tage bis…',
  description:
    'Countdown bis zu einem Zieldatum: Wie viele Tage, Wochen und Stunden sind es noch bis zum Urlaub, Geburtstag oder Termin? Mit Angabe des Wochentags.',
  keywords: [
    'tage bis',
    'countdown rechner',
    'wie viele tage bis',
    'tage bis weihnachten',
    'tage bis geburtstag',
    'countdown bis datum',
  ],
  formula: 'verbleibende Tage = Zieldatum − heute',
  inputs: [
    {
      type: 'date',
      id: 'ziel',
      label: 'Zieldatum',
      default: '2026-12-24',
      help: 'Das Datum, auf das gezählt wird.',
    },
    {
      type: 'date',
      id: 'heute',
      label: 'Heute / Stichtag',
      default: '2026-06-18',
      today: true,
      help: 'Standard: heute.',
    },
  ],
  compute: (v) => {
    const ziel = String(v.ziel);
    const heute = String(v.heute);
    const dZiel = toDate(ziel);

    const diff = daysBetween(heute, ziel); // positiv = Ziel liegt in der Zukunft
    const tage = Math.abs(diff);
    const { years, months, days } = diffYMD(heute, ziel);

    const richtung =
      diff > 0 ? 'in der Zukunft' : diff < 0 ? 'in der Vergangenheit' : 'heute';

    return [
      { label: 'Verbleibende Tage', value: tage, unit: 'Tage', digits: 0, primary: true },
      { label: 'Richtung', value: richtung },
      { label: 'Verbleibende Wochen', value: Math.floor(tage / 7), unit: 'Wochen', digits: 0 },
      { label: 'Verbleibende Stunden', value: tage * 24, unit: 'Std', digits: 0 },
      { label: 'Jahre, Monate, Tage', value: `${years} J, ${months} M, ${days} T` },
      { label: 'Wochentag des Ziels', value: dZiel ? WOCHENTAGE[dZiel.getUTCDay()] : 'ungültig' },
    ];
  },
  intro:
    '<p>Wie lange ist es noch bis zu einem wichtigen Tag? Dieser Countdown zählt die Tage, Wochen und Stunden bis zu einem frei wählbaren Zieldatum. Liegt das Datum in der Vergangenheit, zeigt der Rechner, wie viele Tage seither vergangen sind.</p>',
  howto: [
    'Zieldatum eintragen (z. B. Heiligabend oder ein Geburtstag).',
    'Stichtag wählen – standardmäßig heute.',
    'Verbleibende Tage, Wochen und Stunden sowie den Wochentag des Ziels ablesen.',
  ],
  faq: [
    {
      q: 'Zählt der heutige Tag mit?',
      a: 'Nein. Gezählt werden die vollen Tage bis zum Zieldatum. Liegt das Ziel auf morgen, ist es 1 Tag. Liegt es auf heute, sind es 0 Tage.',
    },
    {
      q: 'Was passiert, wenn das Zieldatum schon vorbei ist?',
      a: 'Dann zeigt der Rechner unter „Richtung" an, dass es in der Vergangenheit liegt, und die Tage geben an, wie lange es her ist.',
    },
    {
      q: 'Werden Wochenenden und Feiertage abgezogen?',
      a: 'Nein, gezählt werden alle Kalendertage. Für reine Arbeitstage nutze den Arbeitstage-Rechner.',
    },
  ],
  related: ['tage-zwischen-daten-rechner', 'datum-plus-rechner', 'arbeitstage-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      // 18.06.2026 bis 24.12.2026.
      values: { ziel: '2026-12-24', heute: '2026-06-18' },
      expect: [
        { label: 'Verbleibende Tage', value: 189, tolerance: 0 },
        { label: 'Verbleibende Stunden', value: 4536, tolerance: 0 },
      ],
    },
    {
      // Ziel in der Vergangenheit: 30 Tage her.
      values: { ziel: '2026-01-01', heute: '2026-01-31' },
      expect: [
        { label: 'Verbleibende Tage', value: 30, tolerance: 0 },
        { label: 'Verbleibende Wochen', value: 4, tolerance: 0 },
      ],
    },
  ],
};
