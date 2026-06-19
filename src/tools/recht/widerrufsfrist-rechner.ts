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

function formatDE(d: Date): string {
  const tag = String(d.getUTCDate()).padStart(2, '0');
  const monat = String(d.getUTCMonth() + 1).padStart(2, '0');
  return `${tag}.${monat}.${d.getUTCFullYear()}`;
}

export const tool: Tool = {
  slug: 'widerrufsfrist-rechner',
  category: 'recht',
  title: 'Widerrufsfrist-Rechner (Ende der 14-Tage-Frist)',
  shortTitle: 'Widerrufsfrist',
  description:
    'Berechne das Ende der 14-tägigen Widerrufsfrist bei Online-Käufen und Verträgen. Fristbeginn am Tag nach Erhalt, Wochenend-Verschiebung auf den nächsten Werktag.',
  keywords: [
    'widerrufsfrist rechner',
    'widerrufsfrist berechnen',
    'widerruf 14 tage frist',
    'wann endet widerrufsfrist',
    'widerrufsfrist online kauf',
    'fristende widerruf',
  ],
  formula:
    'Fristende = (Erhalt-/Vertragsdatum) + 14 Tage; bei Sa/So Verschiebung auf nächsten Werktag (§ 355, § 187, § 193 BGB)',
  inputs: [
    {
      type: 'date',
      id: 'start',
      label: 'Erhalt der Ware / Vertragsschluss',
      default: '2026-06-01',
      help: 'Bei Warenkauf zählt der Tag, an dem du die Ware erhalten hast; bei Dienstleistungen der Vertragsschluss.',
    },
    {
      type: 'number',
      id: 'frist',
      label: 'Widerrufsfrist',
      unit: 'Tage',
      default: 14,
      min: 1,
      max: 365,
      step: 1,
      help: 'Gesetzlich meist 14 Tage. Ohne korrekte Widerrufsbelehrung verlängert sie sich auf bis zu 12 Monate + 14 Tage.',
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
    const frist = Math.round(num(v.frist, 14));
    const regel = String(v.werktagsregel || 'verschieben');

    if (!start || frist < 1) {
      return [
        { label: 'Fristende', value: 'Ungültige Eingabe', primary: true },
        { label: 'Tage bis Fristende', value: 0, unit: 'Tage', digits: 0 },
      ];
    }

    // Fristbeginn am Tag nach Erhalt (§ 187 Abs. 1 BGB); Ende = Erhalt + frist Tage.
    const exakt = new Date(start.getTime() + frist * MS_PRO_TAG);
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
      { label: 'Fristende', value: formatDE(ende), primary: true, help: `Bis zu diesem Tag (einschließlich) kannst du widerrufen.` },
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
    'Bei Fernabsatzverträgen (Online-Kauf, Telefon, Haustür) hast du in der Regel 14 Tage Zeit, den Vertrag ohne Begründung zu widerrufen (§ 355 BGB). Die Frist beginnt grundsätzlich am Tag nach Erhalt der Ware bzw. nach Vertragsschluss (§ 187 Abs. 1 BGB) und endet 14 Tage später. Fällt das Ende auf einen Samstag oder Sonntag, verschiebt es sich auf den nächsten Werktag (§ 193 BGB). Feiertage bildet der Rechner nicht ab. Es handelt sich um eine Orientierung, nicht um Rechtsberatung.',
  howto: [
    'Datum des Warenerhalts oder Vertragsschlusses eintragen.',
    'Widerrufsfrist wählen (Standard: 14 Tage).',
    'Wochenend-Regel festlegen.',
    'Letzten Tag der Widerrufsfrist ablesen – bis dahin muss der Widerruf abgeschickt sein.',
  ],
  faq: [
    {
      q: 'Wann beginnt die Widerrufsfrist?',
      a: 'Beim Warenkauf am Tag nach Erhalt der Ware, bei Teillieferungen mit der letzten Ware. Bei Dienstleistungen ab Vertragsschluss. Voraussetzung ist eine ordnungsgemäße Widerrufsbelehrung.',
    },
    {
      q: 'Was, wenn ich nicht ordentlich belehrt wurde?',
      a: 'Fehlt die Widerrufsbelehrung oder ist sie fehlerhaft, verlängert sich die Frist um bis zu 12 Monate und 14 Tage (§ 356 Abs. 3 BGB). Stelle die Frist dann entsprechend höher ein.',
    },
    {
      q: 'Reicht das Absenden am letzten Tag?',
      a: 'Ja. Für die Fristwahrung genügt es, den Widerruf rechtzeitig abzusenden (§ 355 Abs. 1 BGB). Auf den Zugang beim Händler kommt es nicht an – ein Nachweis ist aber empfehlenswert.',
    },
    {
      q: 'Gilt das auch im Ladengeschäft?',
      a: 'Nein. Ein gesetzliches Widerrufsrecht besteht vor allem im Fernabsatz und bei Haustürgeschäften. Im stationären Handel gibt es kein generelles Rückgaberecht – nur freiwillige Kulanz.',
    },
  ],
  related: ['frist-rechner', 'verzugseintritt-rechner', 'verjaehrungsfrist-rechner'],
  examples: [
    {
      // 2026-06-01 (Mo) + 14 Tage = 2026-06-15 (Mo), kein Wochenende
      values: { start: '2026-06-01', frist: 14, werktagsregel: 'verschieben' },
      expect: [
        { label: 'Tag', value: 15, tolerance: 0 },
        { label: 'Monat', value: 6, tolerance: 0 },
        { label: 'Jahr', value: 2026, tolerance: 0 },
        { label: 'Verschiebung (Werktag)', value: 0, tolerance: 0 },
        { label: 'Tage bis Fristende', value: 14, tolerance: 0 },
      ],
    },
    {
      // 2026-01-10 (Sa) + 14 Tage = 2026-01-24 (Sa) -> verschoben auf Mo 2026-01-26 (+2)
      values: { start: '2026-01-10', frist: 14, werktagsregel: 'verschieben' },
      expect: [
        { label: 'Tag', value: 26, tolerance: 0 },
        { label: 'Monat', value: 1, tolerance: 0 },
        { label: 'Jahr', value: 2026, tolerance: 0 },
        { label: 'Verschiebung (Werktag)', value: 2, tolerance: 0 },
        { label: 'Tage bis Fristende', value: 16, tolerance: 0 },
      ],
    },
  ],
  updated: '2026-06-19',
};
