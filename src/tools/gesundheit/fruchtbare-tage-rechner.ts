import type { Tool } from '../../lib/types';
import { toDate, daysBetween } from '../../lib/types';

// Fruchtbare-Tage-Rechner: schätzt aus dem ersten Tag der letzten Regelblutung
// und der durchschnittlichen Zykluslänge das fruchtbare Zeitfenster und den
// voraussichtlichen Eisprung. Modell: Lutealphase ~14 Tage konstant,
// Eisprung = Zykluslänge − 14 Tage nach dem Periodenbeginn. Fruchtbares Fenster:
// 5 Tage vor bis 1 Tag nach dem Eisprung (Spermien ~5 Tage, Eizelle ~1 Tag).
// PURE: kein new Date() ohne Argument; "heute" nur über date-Input today:true.

const WOCHENTAGE = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];
const MONATE = [
  'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
  'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember',
];

/** ISO-Datum + Tage -> neues Date (UTC, deterministisch). */
function addDays(iso: string, days: number): Date | null {
  const d = toDate(iso);
  if (!d) return null;
  return new Date(d.getTime() + days * 86_400_000);
}

/** Date -> "Donnerstag, 15. Januar 2026" (UTC, locale-unabhängig, deterministisch). */
function formatDE(d: Date | null): string {
  if (!d) return '–';
  return `${WOCHENTAGE[d.getUTCDay()]}, ${d.getUTCDate()}. ${MONATE[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}

function isoOf(d: Date | null): string {
  return d ? d.toISOString().slice(0, 10) : '';
}

export const tool: Tool = {
  slug: 'fruchtbare-tage-rechner',
  category: 'gesundheit',
  title: 'Fruchtbare Tage berechnen',
  shortTitle: 'Fruchtbare Tage',
  description:
    'Schätze deine fruchtbaren Tage und den Eisprung aus dem ersten Tag der letzten Periode und der Zykluslänge. Nur Orientierung, kein Verhütungs- oder Beratungsersatz.',
  keywords: [
    'fruchtbare tage berechnen',
    'eisprung berechnen',
    'fruchtbarkeitsrechner',
    'eisprungrechner',
    'fruchtbare tage zyklus',
  ],
  intro:
    'Dieser Rechner schätzt aus dem ersten Tag deiner letzten Regelblutung und deiner durchschnittlichen Zykluslänge, wann der Eisprung etwa stattfindet und welche Tage als fruchtbar gelten. Modell: Die zweite Zyklushälfte (Lutealphase) dauert recht konstant rund 14 Tage, der Eisprung liegt also etwa 14 Tage vor der nächsten Periode. Das fruchtbare Fenster umfasst die 5 Tage vor dem Eisprung, den Eisprungtag selbst und den darauffolgenden Tag (insgesamt 7 Tage), weil Spermien bis zu 5 Tage und die Eizelle rund 1 Tag überlebensfähig sind. <strong>Wichtig:</strong> Dies ist nur eine grobe Orientierung und ersetzt weder eine Verhütungsmethode noch eine ärztliche Beratung.',
  formula:
    'Eisprung = letzte Periode + (Zykluslänge − 14); fruchtbar = Eisprung − 5 Tage bis Eisprung + 1 Tag',
  inputs: [
    { type: 'date', id: 'letzteRegel', label: 'Erster Tag der letzten Periode', default: '2026-01-01' },
    { type: 'number', id: 'zyklus', label: 'Durchschnittliche Zykluslänge', unit: 'Tage', default: 28, min: 20, max: 45, step: 1, help: 'Vom 1. Tag der Periode bis zum Tag vor der nächsten.' },
  ],
  compute: (v) => {
    const letzteRegel = String(v.letzteRegel);
    const zyklusRaw = typeof v.zyklus === 'number' ? v.zyklus : parseFloat(String(v.zyklus).replace(',', '.'));
    const zyklus = Math.min(45, Math.max(20, Math.round(Number.isFinite(zyklusRaw) ? zyklusRaw : 28)));

    const start = toDate(letzteRegel);
    if (!start) {
      return [{ label: 'Hinweis', value: 'Bitte ein gültiges Datum für die letzte Periode eingeben.', primary: true }];
    }

    // Eisprung = Zykluslänge - 14 Tage nach Periodenbeginn (Lutealphase konstant).
    const eisprungOffset = zyklus - 14;
    const eisprung = addDays(letzteRegel, eisprungOffset);
    const fensterStart = addDays(letzteRegel, eisprungOffset - 5);
    const fensterEnde = addDays(letzteRegel, eisprungOffset + 1);
    const naechsteRegel = addDays(letzteRegel, zyklus);

    // Inklusive Tageszahl des fruchtbaren Fensters.
    const fensterTage = daysBetween(isoOf(fensterStart), isoOf(fensterEnde)) + 1;

    return [
      { label: 'Voraussichtlicher Eisprung', value: formatDE(eisprung), primary: true, help: `Zyklustag ${eisprungOffset + 1}` },
      { label: 'Fruchtbares Fenster ab', value: formatDE(fensterStart) },
      { label: 'Fruchtbares Fenster bis', value: formatDE(fensterEnde) },
      { label: 'Fruchtbare Tage', value: fensterTage, unit: 'Tage', digits: 0 },
      { label: 'Zyklustag des Eisprungs', value: eisprungOffset + 1, unit: 'Tag', digits: 0 },
      { label: 'Voraussichtliche nächste Periode', value: formatDE(naechsteRegel) },
    ];
  },
  howto: [
    'Den ersten Tag der letzten Regelblutung eintragen.',
    'Die durchschnittliche Zykluslänge angeben (Standard 28 Tage).',
    'Eisprung und fruchtbares Zeitfenster ablesen – als grobe Orientierung.',
  ],
  faq: [
    { q: 'Wie werden die fruchtbaren Tage berechnet?', a: 'Der Eisprung wird etwa 14 Tage vor der nächsten Periode angesetzt. Das fruchtbare Fenster umfasst die 5 Tage davor, den Eisprungtag und den Folgetag (zusammen 7 Tage), weil Spermien bis zu 5 Tage und die Eizelle rund 1 Tag überleben können.' },
    { q: 'Kann ich damit verhüten?', a: 'Nein. Die Berechnung ist eine grobe Schätzung und kein zuverlässiger Verhütungsschutz. Eine Schwangerschaft ist auch außerhalb des berechneten Fensters möglich.' },
    { q: 'Wie genau ist das Ergebnis?', a: 'Bei sehr regelmäßigem Zyklus ist es eine brauchbare Orientierung. Bei unregelmäßigen Zyklen schwankt der Eisprung stark, dann ist die Aussagekraft gering.' },
    { q: 'Was ist die Zykluslänge?', a: 'Die Anzahl der Tage vom ersten Tag einer Periode bis zum Tag vor der nächsten Periode. Üblich sind etwa 21 bis 35 Tage.' },
  ],
  related: ['naechste-periode-rechner', 'schwangerschaftswoche-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { letzteRegel: '2026-01-01', zyklus: 28 },
      expect: [
        { label: 'Fruchtbare Tage', value: 7, tolerance: 0 },
        { label: 'Zyklustag des Eisprungs', value: 15, tolerance: 0 },
      ],
    },
    {
      values: { letzteRegel: '2026-03-10', zyklus: 32 },
      expect: [
        { label: 'Fruchtbare Tage', value: 7, tolerance: 0 },
        { label: 'Zyklustag des Eisprungs', value: 19, tolerance: 0 },
      ],
    },
  ],
};
