import type { Tool } from '../../lib/types';
import { num, toDate, daysBetween } from '../../lib/types';

const MS_PRO_TAG = 86_400_000;
const WOCHENTAGE = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'] as const;
const MONATE = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'] as const;

function formatDE(d: Date): string {
  const tag = String(d.getUTCDate()).padStart(2, '0');
  const monat = String(d.getUTCMonth() + 1).padStart(2, '0');
  return `${tag}.${monat}.${d.getUTCFullYear()}`;
}

// Monatsfrist nach § 188 Abs. 2 BGB: Ende am Tag des letzten Monats, der dem Tag des Beginns entspricht.
// Existiert dieser Tag nicht (z. B. 31. -> Februar), gilt der letzte Tag des Monats.
function addMonate(start: Date, monate: number): Date {
  const j = start.getUTCFullYear();
  const m = start.getUTCMonth();
  const t = start.getUTCDate();
  const zielMonatIndex = m + monate;
  const zielJahr = j + Math.floor(zielMonatIndex / 12);
  const zielMonat = ((zielMonatIndex % 12) + 12) % 12;
  const letzterTag = new Date(Date.UTC(zielJahr, zielMonat + 1, 0)).getUTCDate();
  const tag = Math.min(t, letzterTag);
  return new Date(Date.UTC(zielJahr, zielMonat, tag));
}

export const tool: Tool = {
  slug: 'widerspruchsfrist-rechner',
  category: 'recht',
  title: 'Widerspruchsfrist-Rechner (Bescheid, 1 Monat)',
  shortTitle: 'Widerspruchsfrist',
  description:
    'Berechne das Ende der Widerspruchsfrist gegen einen behördlichen Bescheid: ein Monat ab Bekanntgabe (§ 70 VwGO), mit Wochenend-Verschiebung auf den nächsten Werktag.',
  keywords: [
    'widerspruchsfrist rechner',
    'widerspruchsfrist berechnen',
    'widerspruch bescheid frist',
    'widerspruchsfrist 1 monat',
    'frist widerspruch behörde',
    'wann endet widerspruchsfrist',
  ],
  formula:
    'Fristende = Bekanntgabe + 1 Monat (§ 70 VwGO, § 188 BGB); bei Sa/So Verschiebung auf nächsten Werktag (§ 193 BGB)',
  inputs: [
    {
      type: 'date', id: 'bekanntgabe', label: 'Bekanntgabe des Bescheids', default: '2026-06-01',
      help: 'Bei Zustellung per Post gilt der Bescheid am 3. Tag nach Aufgabe zur Post als bekanntgegeben (§ 41 VwVfG). Trage hier den Tag der tatsächlichen Bekanntgabe ein.',
    },
    {
      type: 'number', id: 'monate', label: 'Frist', unit: 'Monate', default: 1, min: 1, max: 12, step: 1,
      help: 'Üblich 1 Monat. Fehlt eine Rechtsbehelfsbelehrung, verlängert sich die Frist auf 1 Jahr (12 Monate).',
    },
    {
      type: 'select', id: 'werktagsregel', label: 'Wochenend-Regel', default: 'verschieben',
      options: [
        { value: 'verschieben', label: 'Fällt das Ende auf Sa/So, auf nächsten Werktag (§ 193 BGB)' },
        { value: 'kalender', label: 'Exaktes Kalenderdatum, keine Verschiebung' },
      ],
      help: 'Feiertage werden nicht berücksichtigt.',
    },
  ],
  compute: (v) => {
    const start = toDate(String(v.bekanntgabe));
    const monate = Math.round(num(v.monate, 1));
    const regel = String(v.werktagsregel || 'verschieben');

    if (!start || monate < 1) {
      return [
        { label: 'Fristende', value: 'Ungültige Eingabe', primary: true },
        { label: 'Tage bis Fristende', value: 0, unit: 'Tage', digits: 0 },
      ];
    }

    // Fristbeginn am Tag nach Bekanntgabe (§ 187 Abs. 1 BGB); Ende = Beginn + n Monate (§ 188 Abs. 2 BGB).
    const beginn = new Date(start.getTime() + MS_PRO_TAG);
    const exaktEnde = addMonate(beginn, monate);
    // § 188 Abs. 2 BGB: Fristende ist der Vortag-äquivalente Tag; bei "Tag nach Ereignis"-Beginn fällt das
    // Ende auf den Tag des Zielmonats, der dem Bekanntgabetag entspricht (= exaktEnde minus 1 Tag).
    let ende = new Date(exaktEnde.getTime() - MS_PRO_TAG);
    let verschoben = 0;
    if (regel === 'verschieben') {
      while (ende.getUTCDay() === 0 || ende.getUTCDay() === 6) {
        ende = new Date(ende.getTime() + MS_PRO_TAG);
        verschoben += 1;
      }
    }
    const endeIso = ende.toISOString().slice(0, 10);
    const tageGesamt = daysBetween(String(v.bekanntgabe), endeIso);

    return [
      { label: 'Fristende', value: formatDE(ende), primary: true, help: 'Bis zu diesem Tag (einschließlich) muss der Widerspruch bei der Behörde eingegangen sein.' },
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
    'Gegen einen belastenden Verwaltungsakt (Bescheid) kann innerhalb eines Monats nach Bekanntgabe Widerspruch eingelegt werden (§ 70 VwGO). Die Frist beginnt am Tag nach der Bekanntgabe (§ 187 Abs. 1 BGB) und endet einen Monat später an dem Tag, der dem Bekanntgabetag entspricht (§ 188 Abs. 2 BGB). Fällt das Ende auf einen Samstag oder Sonntag, verschiebt es sich auf den nächsten Werktag (§ 193 BGB). Fehlt eine korrekte Rechtsbehelfsbelehrung, verlängert sich die Frist auf ein Jahr (§ 58 Abs. 2 VwGO). Feiertage bildet der Rechner nicht ab; dies ist eine Orientierung, keine Rechtsberatung.',
  howto: [
    'Tag der Bekanntgabe des Bescheids eintragen.',
    'Frist wählen – im Regelfall 1 Monat.',
    'Wochenend-Regel festlegen.',
    'Letzten Tag für den Widerspruch ablesen – bis dahin muss er bei der Behörde eingegangen sein.',
  ],
  faq: [
    { q: 'Wie lange ist die Widerspruchsfrist?', a: 'Sie beträgt grundsätzlich einen Monat ab Bekanntgabe des Bescheids (§ 70 VwGO). Fehlt eine ordnungsgemäße Rechtsbehelfsbelehrung, verlängert sie sich auf ein Jahr.' },
    { q: 'Wann gilt ein Bescheid als bekanntgegeben?', a: 'Bei Zustellung per einfachem Brief gilt der Bescheid am dritten Tag nach Aufgabe zur Post als bekanntgegeben (§ 41 Abs. 2 VwVfG). Trage in den Rechner den so ermittelten Bekanntgabetag ein.' },
    { q: 'Kommt es auf das Absenden oder den Zugang an?', a: 'Anders als beim Widerruf muss der Widerspruch innerhalb der Frist bei der Behörde eingegangen sein. Das bloße Absenden am letzten Tag genügt nicht – plane den Postweg ein.' },
    { q: 'Was passiert nach Ablauf der Frist?', a: 'Wird die Frist versäumt, wird der Bescheid bestandskräftig und kann grundsätzlich nicht mehr angefochten werden. Nur bei unverschuldeter Versäumnis kommt eine Wiedereinsetzung in den vorigen Stand in Betracht.' },
  ],
  related: ['frist-rechner', 'widerrufsfrist-rechner', 'verjaehrungsfrist-rechner'],
  examples: [
    {
      // Bekanntgabe 2026-06-01 (Mo) -> Ende 2026-07-01 (Mi), kein Wochenende
      values: { bekanntgabe: '2026-06-01', monate: 1, werktagsregel: 'verschieben' },
      expect: [
        { label: 'Tag', value: 1, tolerance: 0 },
        { label: 'Monat', value: 7, tolerance: 0 },
        { label: 'Jahr', value: 2026, tolerance: 0 },
        { label: 'Verschiebung (Werktag)', value: 0, tolerance: 0 },
        { label: 'Tage bis Fristende', value: 30, tolerance: 0 },
      ],
    },
    {
      // Bekanntgabe 2026-02-15 (So) -> Ende 2026-03-15 (So) -> verschoben auf Mo 2026-03-16 (+1)
      values: { bekanntgabe: '2026-02-15', monate: 1, werktagsregel: 'verschieben' },
      expect: [
        { label: 'Tag', value: 16, tolerance: 0 },
        { label: 'Monat', value: 3, tolerance: 0 },
        { label: 'Verschiebung (Werktag)', value: 1, tolerance: 0 },
      ],
    },
  ],
  updated: '2026-06-19',
};
