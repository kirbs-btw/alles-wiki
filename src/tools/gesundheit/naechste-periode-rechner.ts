import type { Tool } from '../../lib/types';
import { toDate, daysBetween } from '../../lib/types';

// Nächste-Periode-Rechner: schätzt aus dem ersten Tag des letzten Zyklus und der
// durchschnittlichen Zykluslänge den Termin der nächsten Regelblutung sowie die
// Tage bis dahin und den aktuellen Zyklustag (relativ zu einem Stichtag).
// PURE: kein new Date() ohne Argument; "heute" ausschließlich über date-Input today:true.

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

/** Date -> "Donnerstag, 29. Januar 2026" (UTC, locale-unabhängig, deterministisch). */
function formatDE(d: Date | null): string {
  if (!d) return '–';
  return `${WOCHENTAGE[d.getUTCDay()]}, ${d.getUTCDate()}. ${MONATE[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}

function isoOf(d: Date | null): string {
  return d ? d.toISOString().slice(0, 10) : '';
}

export const tool: Tool = {
  slug: 'naechste-periode-rechner',
  category: 'gesundheit',
  title: 'Nächste Periode berechnen',
  shortTitle: 'Nächste Periode',
  description:
    'Berechne den voraussichtlichen Termin deiner nächsten Periode aus dem letzten Zyklusbeginn und der Zykluslänge – inklusive Tage bis dahin und aktuellem Zyklustag. Nur Orientierung.',
  keywords: [
    'nächste periode berechnen',
    'periodenrechner',
    'menstruation berechnen',
    'wann kommt meine periode',
    'zyklusrechner',
  ],
  intro:
    'Dieser Rechner schätzt aus dem ersten Tag deiner letzten Regelblutung und deiner durchschnittlichen Zykluslänge, wann die nächste Periode voraussichtlich beginnt. Zusätzlich siehst du, wie viele Tage noch bis dahin verbleiben und in welchem Zyklustag du dich am gewählten Stichtag befindest. Bei sehr regelmäßigem Zyklus ist das eine brauchbare Orientierung; bei schwankenden Zyklen kann der tatsächliche Termin deutlich abweichen. <strong>Wichtig:</strong> Diese Schätzung ersetzt keine ärztliche Beratung.',
  formula:
    'Nächste Periode = letzter Zyklusbeginn + Zykluslänge; Zyklustag = Stichtag − Zyklusbeginn + 1',
  inputs: [
    { type: 'date', id: 'letzterStart', label: 'Erster Tag der letzten Periode', default: '2026-06-01' },
    { type: 'number', id: 'zyklus', label: 'Durchschnittliche Zykluslänge', unit: 'Tage', default: 28, min: 20, max: 45, step: 1, help: 'Vom 1. Tag der Periode bis zum Tag vor der nächsten.' },
    { type: 'date', id: 'stichtag', label: 'Stichtag', default: '2026-06-18', today: true, help: 'Standard: heute. Für die Tage-bis-Anzeige und den Zyklustag.' },
  ],
  compute: (v) => {
    const letzterStart = String(v.letzterStart);
    const stichtag = String(v.stichtag);
    const zyklusRaw = typeof v.zyklus === 'number' ? v.zyklus : parseFloat(String(v.zyklus).replace(',', '.'));
    const zyklus = Math.min(45, Math.max(20, Math.round(Number.isFinite(zyklusRaw) ? zyklusRaw : 28)));

    const start = toDate(letzterStart);
    if (!start) {
      return [{ label: 'Hinweis', value: 'Bitte ein gültiges Datum für die letzte Periode eingeben.', primary: true }];
    }

    const naechste = addDays(letzterStart, zyklus);
    const tageBis = daysBetween(stichtag, isoOf(naechste));
    const zyklustag = daysBetween(letzterStart, stichtag) + 1;
    // Übernächste Periode (ein weiterer Zyklus).
    const uebernaechste = addDays(letzterStart, zyklus * 2);

    const ergebnisse = [
      { label: 'Voraussichtliche nächste Periode', value: formatDE(naechste), primary: true },
      { label: 'Tage bis zur nächsten Periode', value: tageBis, unit: 'Tage', digits: 0, help: tageBis < 0 ? 'Termin liegt rechnerisch in der Vergangenheit.' : undefined },
      { label: 'Aktueller Zyklustag', value: zyklustag, unit: 'Tag', digits: 0, help: 'am Stichtag, gezählt ab Periodenbeginn' },
      { label: 'Übernächste Periode', value: formatDE(uebernaechste) },
    ];
    return ergebnisse;
  },
  howto: [
    'Den ersten Tag der letzten Regelblutung eintragen.',
    'Die durchschnittliche Zykluslänge angeben (Standard 28 Tage).',
    'Stichtag wählen (Standard: heute) und den Termin der nächsten Periode ablesen.',
  ],
  faq: [
    { q: 'Wie wird der Termin berechnet?', a: 'Zum ersten Tag der letzten Periode wird die durchschnittliche Zykluslänge addiert. Das ergibt den voraussichtlichen ersten Tag der nächsten Regelblutung.' },
    { q: 'Was bedeutet der Zyklustag?', a: 'Der erste Tag der Periode ist Zyklustag 1. Der Zyklustag am Stichtag zeigt, wie viele Tage seit dem Periodenbeginn vergangen sind.' },
    { q: 'Warum kann der Termin abweichen?', a: 'Die Zykluslänge schwankt von Monat zu Monat. Stress, Krankheit oder hormonelle Veränderungen können den Beginn vorverlegen oder verzögern.' },
    { q: 'Was ist eine normale Zykluslänge?', a: 'Üblich sind etwa 21 bis 35 Tage. Werte außerhalb dieses Bereichs oder stark schwankende Zyklen sollten ärztlich abgeklärt werden.' },
  ],
  related: ['fruchtbare-tage-rechner', 'schwangerschaftswoche-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { letzterStart: '2026-01-01', zyklus: 28, stichtag: '2026-01-15' },
      expect: [
        { label: 'Tage bis zur nächsten Periode', value: 14, tolerance: 0 },
        { label: 'Aktueller Zyklustag', value: 15, tolerance: 0 },
      ],
    },
    {
      values: { letzterStart: '2026-06-01', zyklus: 30, stichtag: '2026-06-18' },
      expect: [
        { label: 'Tage bis zur nächsten Periode', value: 13, tolerance: 0 },
        { label: 'Aktueller Zyklustag', value: 18, tolerance: 0 },
      ],
    },
  ],
};
