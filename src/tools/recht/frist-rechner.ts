import type { Tool } from '../../lib/types';
import { num, toDate, daysBetween } from '../../lib/types';

const MS_PRO_TAG = 86_400_000;
const WOCHENTAGE = [
  'Sonntag',
  'Montag',
  'Dienstag',
  'Mittwoch',
  'Donnerstag',
  'Freitag',
  'Samstag',
] as const;
const MONATE = [
  'Januar',
  'Februar',
  'März',
  'April',
  'Mai',
  'Juni',
  'Juli',
  'August',
  'September',
  'Oktober',
  'November',
  'Dezember',
] as const;

/** Date -> "TT.MM.JJJJ" (deterministisch, UTC). */
function formatDE(d: Date): string {
  const tag = String(d.getUTCDate()).padStart(2, '0');
  const monat = String(d.getUTCMonth() + 1).padStart(2, '0');
  return `${tag}.${monat}.${d.getUTCFullYear()}`;
}

export const tool: Tool = {
  slug: 'frist-rechner',
  category: 'recht',
  title: 'Frist-Rechner (Fristende mit Wochentag)',
  shortTitle: 'Frist',
  description:
    'Fristende berechnen: Startdatum plus Anzahl Tage ergibt das Enddatum samt Wochentag. Optional auf den nächsten Werktag verschoben. Allgemeine Orientierung, kein Rechtsrat.',
  keywords: [
    'frist rechner',
    'fristende berechnen',
    'frist berechnen tage',
    'frist plus tage',
    'fristberechnung wochentag',
    'frist endet wann',
  ],
  formula: 'Fristende = Startdatum + Anzahl Tage  (Werktag-Regel: fällt das Ende auf Sa/So, verschiebt es sich auf den nächsten Werktag)',
  inputs: [
    {
      type: 'date',
      id: 'start',
      label: 'Fristbeginn (Startdatum)',
      default: '2026-06-18',
      help: 'Tag, ab dem gezählt wird. Hinweis: Im Recht wird der Ereignistag oft nicht mitgezählt (§ 187 BGB) – passe die Tage bei Bedarf an.',
    },
    {
      type: 'number',
      id: 'tage',
      label: 'Frist in Tagen',
      unit: 'Tage',
      default: 14,
      min: 0,
      max: 100000,
      step: 1,
      help: 'Anzahl Kalendertage, die zum Startdatum addiert werden.',
    },
    {
      type: 'select',
      id: 'werktagsregel',
      label: 'Wochenend-Regel',
      default: 'verschieben',
      options: [
        { value: 'verschieben', label: 'Fällt das Ende auf Sa/So, auf nächsten Werktag verschieben (§ 193 BGB)' },
        { value: 'kalender', label: 'Exaktes Kalenderdatum, keine Verschiebung' },
      ],
      help: 'Feiertage werden nicht berücksichtigt.',
    },
  ],
  compute: (v) => {
    const start = toDate(String(v.start));
    const tage = Math.round(num(v.tage, 0));
    const regel = String(v.werktagsregel || 'verschieben');

    if (!start || tage < 0) {
      return [
        { label: 'Fristende', value: 'Ungültige Eingabe', primary: true },
        { label: 'Tage bis Fristende', value: 0, unit: 'Tage', digits: 0 },
      ];
    }

    // Exaktes Kalenderdatum.
    const exakt = new Date(start.getTime() + tage * MS_PRO_TAG);

    // Optionale Verschiebung auf nächsten Werktag (Sa=6, So=0).
    let ende = new Date(exakt.getTime());
    let verschoben = 0;
    if (regel === 'verschieben') {
      while (ende.getUTCDay() === 0 || ende.getUTCDay() === 6) {
        ende = new Date(ende.getTime() + MS_PRO_TAG);
        verschoben += 1;
      }
    }

    const endeIso = ende.toISOString().slice(0, 10);
    const tageGesamt = daysBetween(String(v.start), endeIso);

    return [
      { label: 'Fristende', value: formatDE(ende), primary: true, help: `Wochentag: ${WOCHENTAGE[ende.getUTCDay()]}` },
      { label: 'Wochentag', value: WOCHENTAGE[ende.getUTCDay()] },
      { label: 'Fristende (lang)', value: `${WOCHENTAGE[ende.getUTCDay()]}, ${ende.getUTCDate()}. ${MONATE[ende.getUTCMonth()]} ${ende.getUTCFullYear()}` },
      { label: 'Tag', value: ende.getUTCDate(), digits: 0 },
      { label: 'Monat', value: ende.getUTCMonth() + 1, digits: 0 },
      { label: 'Jahr', value: ende.getUTCFullYear(), digits: 0 },
      { label: 'Verschiebung (Werktag)', value: verschoben, unit: 'Tage', digits: 0 },
      { label: 'Tage bis Fristende', value: tageGesamt, unit: 'Tage', digits: 0 },
    ];
  },
  intro:
    'Mit diesem Rechner ermittelst du, an welchem Tag eine Frist endet: Du gibst das Startdatum und die Anzahl der Tage ein und erhältst das Enddatum samt Wochentag. Wahlweise wird ein Fristende, das auf einen Samstag oder Sonntag fällt, auf den nächsten Werktag verschoben – das entspricht der Grundregel des § 193 BGB. Feiertage und juristische Feinheiten (z. B. ob der Ereignistag mitzählt, § 187 BGB) bildet der Rechner bewusst nicht ab. Die Berechnung ist eine allgemeine Orientierung und ersetzt keine Rechtsberatung.',
  howto: [
    'Fristbeginn (Startdatum) eintragen.',
    'Anzahl der Tage eingeben, die addiert werden sollen.',
    'Wochenend-Regel wählen: Verschiebung auf nächsten Werktag oder exaktes Kalenderdatum.',
    'Fristende und Wochentag ablesen.',
  ],
  faq: [
    {
      q: 'Zählt der Starttag mit?',
      a: 'Dieser Rechner addiert die Tage schlicht zum Startdatum. Im Recht beginnt eine nach Tagen bemessene Frist häufig erst am Tag nach dem auslösenden Ereignis (§ 187 Abs. 1 BGB). Wenn der Ereignistag nicht mitzählen soll, gib das Datum entsprechend an oder rechne einen Tag hinzu.',
    },
    {
      q: 'Was passiert, wenn das Fristende auf ein Wochenende fällt?',
      a: 'Mit der Standardregel wird das Ende auf den nächsten Werktag (Montag) verschoben. Das orientiert sich an § 193 BGB. Wähle „exaktes Kalenderdatum", wenn keine Verschiebung gewünscht ist.',
    },
    {
      q: 'Werden Feiertage berücksichtigt?',
      a: 'Nein. Feiertage sind regional unterschiedlich und werden hier nicht beachtet. Ein Fristende an einem Feiertag verschiebt sich rechtlich ebenfalls auf den nächsten Werktag – das musst du manuell prüfen.',
    },
    {
      q: 'Ist diese Berechnung rechtsverbindlich?',
      a: 'Nein. Der Rechner liefert eine reine Kalenderberechnung als Orientierung und ersetzt keine Rechtsberatung. Für verbindliche Fristen (z. B. Klage- oder Einspruchsfristen) wende dich an eine Rechtsanwältin oder einen Rechtsanwalt.',
    },
  ],
  related: ['kuendigungsfrist-rechner', 'verjaehrungsfrist-rechner', 'arbeitstage-rechner'],
  examples: [
    {
      // 2026-06-18 (Do) + 14 Tage = 2026-07-02 (Do), kein Wochenende -> keine Verschiebung
      values: { start: '2026-06-18', tage: 14, werktagsregel: 'verschieben' },
      expect: [
        { label: 'Tag', value: 2, tolerance: 0 },
        { label: 'Monat', value: 7, tolerance: 0 },
        { label: 'Jahr', value: 2026, tolerance: 0 },
        { label: 'Verschiebung (Werktag)', value: 0, tolerance: 0 },
        { label: 'Tage bis Fristende', value: 14, tolerance: 0 },
      ],
    },
    {
      // 2026-01-01 + 30 Tage = 2026-01-31 (Sa) -> verschoben auf Mo 2026-02-02 (+2 Tage)
      values: { start: '2026-01-01', tage: 30, werktagsregel: 'verschieben' },
      expect: [
        { label: 'Tag', value: 2, tolerance: 0 },
        { label: 'Monat', value: 2, tolerance: 0 },
        { label: 'Jahr', value: 2026, tolerance: 0 },
        { label: 'Verschiebung (Werktag)', value: 2, tolerance: 0 },
        { label: 'Tage bis Fristende', value: 32, tolerance: 0 },
      ],
    },
    {
      // Gleiches Datum ohne Verschiebung: exaktes Kalenderdatum 2026-01-31
      values: { start: '2026-01-01', tage: 30, werktagsregel: 'kalender' },
      expect: [
        { label: 'Tag', value: 31, tolerance: 0 },
        { label: 'Monat', value: 1, tolerance: 0 },
        { label: 'Jahr', value: 2026, tolerance: 0 },
        { label: 'Verschiebung (Werktag)', value: 0, tolerance: 0 },
        { label: 'Tage bis Fristende', value: 30, tolerance: 0 },
      ],
    },
    {
      // Schaltjahr: 2024-02-28 + 1 Tag = 2024-02-29 (Do)
      values: { start: '2024-02-28', tage: 1, werktagsregel: 'kalender' },
      expect: [
        { label: 'Tag', value: 29, tolerance: 0 },
        { label: 'Monat', value: 2, tolerance: 0 },
        { label: 'Jahr', value: 2024, tolerance: 0 },
        { label: 'Tage bis Fristende', value: 1, tolerance: 0 },
      ],
    },
  ],
  updated: '2026-06-18',
};
