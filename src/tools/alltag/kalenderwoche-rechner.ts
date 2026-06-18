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

/** ISO-8601-Kalenderwoche und zugehöriges KW-Jahr eines Datums. */
function isoWeek(d: Date): { week: number; year: number } {
  // Auf den Donnerstag derselben ISO-Woche setzen (Mo=0 … So=6).
  const tmp = new Date(d.getTime());
  const day = (tmp.getUTCDay() + 6) % 7;
  tmp.setUTCDate(tmp.getUTCDate() - day + 3);
  const isoYear = tmp.getUTCFullYear();
  const yearStart = Date.UTC(isoYear, 0, 1);
  const week = Math.floor((tmp.getTime() - yearStart) / 604_800_000) + 1;
  return { week, year: isoYear };
}

/** Montag der KW w im ISO-KW-Jahr y als ISO-String. */
function mondayOfIsoWeek(y: number, w: number): string {
  // Der 4. Januar liegt nach ISO 8601 immer in KW 1.
  const jan4 = new Date(Date.UTC(y, 0, 4));
  const day = (jan4.getUTCDay() + 6) % 7; // Mo=0
  const week1Monday = new Date(jan4.getTime());
  week1Monday.setUTCDate(jan4.getUTCDate() - day);
  const target = new Date(week1Monday.getTime());
  target.setUTCDate(week1Monday.getUTCDate() + (w - 1) * 7);
  return target.toISOString().slice(0, 10);
}

function formatDe(iso: string): string {
  const d = new Date(iso + 'T00:00:00Z');
  const tag = String(d.getUTCDate()).padStart(2, '0');
  const monat = String(d.getUTCMonth() + 1).padStart(2, '0');
  return `${tag}.${monat}.${d.getUTCFullYear()}`;
}

export const tool: Tool = {
  slug: 'kalenderwoche-rechner',
  category: 'alltag',
  title: 'Kalenderwoche berechnen (KW nach ISO 8601)',
  shortTitle: 'Kalenderwoche',
  description:
    'Ermittle die Kalenderwoche (KW) zu einem Datum nach ISO 8601 – und umgekehrt das Start- und Enddatum (Mo–So) einer Kalenderwoche eines Jahres.',
  keywords: [
    'kalenderwoche berechnen',
    'welche kw',
    'kw aus datum',
    'datum aus kalenderwoche',
    'iso 8601 woche',
    'aktuelle kalenderwoche',
  ],
  formula: 'KW 1 = die Woche (Mo–So), die den ersten Donnerstag des Jahres enthält',
  inputs: [
    {
      type: 'date',
      id: 'datum',
      label: 'Datum',
      default: '2026-06-18',
      today: true,
      help: 'Liefert die Kalenderwoche dieses Datums.',
    },
    {
      type: 'number',
      id: 'kwJahr',
      label: 'Jahr (für KW → Datum)',
      default: 2026,
      min: 1900,
      max: 2200,
      step: 1,
      help: 'Jahr für die Rückrechnung KW → Datum.',
    },
    {
      type: 'number',
      id: 'kwNummer',
      label: 'Kalenderwoche (für KW → Datum)',
      default: 25,
      min: 1,
      max: 53,
      step: 1,
    },
  ],
  compute: (v) => {
    const iso = String(v.datum);
    const d = toDate(iso);

    // Teil 1: Datum → KW
    const { week, year } = d ? isoWeek(d) : { week: 0, year: 0 };

    // Teil 2: KW → Datum (Montag bis Sonntag)
    const y = Math.round(num(v.kwJahr));
    const w = Math.min(53, Math.max(1, Math.round(num(v.kwNummer))));
    const montagIso = mondayOfIsoWeek(y, w);
    const sonntagIso = (() => {
      const m = new Date(montagIso + 'T00:00:00Z');
      m.setUTCDate(m.getUTCDate() + 6);
      return m.toISOString().slice(0, 10);
    })();

    return [
      { label: 'Kalenderwoche', value: week, unit: 'KW', digits: 0, primary: true },
      { label: 'KW-Jahr', value: year, digits: 0 },
      { label: 'Wochentag des Datums', value: d ? WOCHENTAGE[d.getUTCDay()] : 'ungültig' },
      { label: `Montag der KW ${w}`, value: formatDe(montagIso) },
      { label: `Sonntag der KW ${w}`, value: formatDe(sonntagIso) },
    ];
  },
  intro:
    '<p>Kalenderwochen folgen in Deutschland und Europa der Norm ISO 8601: Eine Woche beginnt am Montag, und KW 1 ist die Woche, die den ersten Donnerstag des Jahres enthält. Dieser Rechner geht in beide Richtungen – vom Datum zur KW und von der KW zum konkreten Datum.</p>',
  howto: [
    'Für Datum → KW: Datum eintragen, die Kalenderwoche wird oben angezeigt.',
    'Für KW → Datum: Jahr und Kalenderwoche eintragen.',
    'Start- (Montag) und Enddatum (Sonntag) der gewählten KW ablesen.',
  ],
  faq: [
    {
      q: 'Warum hat ein Jahr manchmal 53 Wochen?',
      a: 'Nach ISO 8601 hat ein Jahr 53 Kalenderwochen, wenn der 1. Januar (in Schaltjahren auch der 31. Dezember) ein Donnerstag ist. Die meisten Jahre haben 52 Wochen.',
    },
    {
      q: 'Warum kann der 1. Januar in KW 52 oder 53 des Vorjahres liegen?',
      a: 'Weil eine ISO-Woche dem Jahr zugeordnet wird, in dem ihr Donnerstag liegt. Beginnt das Jahr an einem Freitag, Samstag oder Sonntag, gehören diese Tage noch zur letzten KW des Vorjahres.',
    },
    {
      q: 'Gilt diese Zählung weltweit?',
      a: 'Nein. ISO 8601 ist in Europa Standard. In den USA und einigen anderen Ländern beginnt die Woche oft am Sonntag und KW 1 wird anders definiert.',
    },
  ],
  related: ['wochentag-rechner', 'datum-plus-rechner', 'tage-zwischen-daten-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      // 18.06.2026 = KW 25, KW-Jahr 2026.
      values: { datum: '2026-06-18', kwJahr: 2026, kwNummer: 25 },
      expect: [
        { label: 'Kalenderwoche', value: 25, tolerance: 0 },
        { label: 'KW-Jahr', value: 2026, tolerance: 0 },
      ],
    },
    {
      // 01.01.2021 gehört zu KW 53 des Jahres 2020.
      values: { datum: '2021-01-01', kwJahr: 2020, kwNummer: 53 },
      expect: [
        { label: 'Kalenderwoche', value: 53, tolerance: 0 },
        { label: 'KW-Jahr', value: 2020, tolerance: 0 },
      ],
    },
    {
      // 04.01.2021 ist der erste Tag (Montag) von KW 1 in 2021.
      values: { datum: '2021-01-04', kwJahr: 2021, kwNummer: 1 },
      expect: [
        { label: 'Kalenderwoche', value: 1, tolerance: 0 },
        { label: 'KW-Jahr', value: 2021, tolerance: 0 },
      ],
    },
  ],
};
