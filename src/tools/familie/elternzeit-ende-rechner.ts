import type { Tool } from '../../lib/types';
import { toDate, daysBetween } from '../../lib/types';

// Elternzeit-Ende-Rechner: Startdatum der Elternzeit + Dauer in Monaten = Enddatum.
// Die Elternzeit endet kalendermäßig einen Tag vor dem gleichen Datum n Monate später
// (z. B. Start 01.09. + 12 Monate -> letzter Tag 31.08. des Folgejahres).
// Reine Orientierung zur zeitlichen Planung; arbeitsrechtliche Details (Anmeldung,
// Aufteilung, Übertragung) bitte gesondert prüfen.

// Datum + n Monate (Monatsende-sicher, UTC) als ISO-String.
function addMonthsIso(iso: string, n: number): string {
  const d = toDate(iso);
  if (!d) return iso;
  const day = d.getUTCDate();
  d.setUTCDate(1);
  d.setUTCMonth(d.getUTCMonth() + n);
  const lastDay = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + 1, 0)).getUTCDate();
  d.setUTCDate(Math.min(day, lastDay));
  return d.toISOString().slice(0, 10);
}

function addDaysIso(iso: string, n: number): string {
  const d = toDate(iso);
  if (!d) return iso;
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}

function wochentag(iso: string): string {
  const d = toDate(iso);
  if (!d) return '';
  return ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'][
    d.getUTCDay()
  ];
}

function fmt(iso: string): string {
  const d = toDate(iso);
  if (!d) return iso;
  const tt = String(d.getUTCDate()).padStart(2, '0');
  const mm = String(d.getUTCMonth() + 1).padStart(2, '0');
  return `${tt}.${mm}.${d.getUTCFullYear()}`;
}

export const tool: Tool = {
  slug: 'elternzeit-ende-rechner',
  category: 'familie',
  title: 'Elternzeit-Ende berechnen',
  shortTitle: 'Elternzeit-Ende',
  description:
    'Berechne das Enddatum deiner Elternzeit aus Startdatum und Dauer in Monaten – inklusive letztem Tag, Wochentag und Gesamtdauer in Tagen. Orientierung zur Planung.',
  keywords: [
    'elternzeit ende berechnen',
    'elternzeit enddatum',
    'elternzeit dauer rechner',
    'wann endet elternzeit',
    'elternzeit monate rechner',
  ],
  intro:
    'Die Elternzeit beginnt an einem festen Startdatum und dauert eine gewählte Zahl an Monaten. Dieser Rechner ermittelt aus Start und Dauer das Enddatum (Tag der Rückkehr) sowie den letzten Tag der Elternzeit, den Wochentag und die Gesamtdauer in Tagen und Wochen. Hinweis: Eine Orientierung zur Planung – arbeitsrechtliche Vorgaben (z. B. Anmeldefristen, Aufteilung auf bis zu drei Zeitabschnitte, Übertragung von Anteilen) sind hier nicht berücksichtigt. Kein Rechts- oder Beratungsersatz.',
  formula: 'Enddatum (Rückkehr) = Startdatum + Dauer in Monaten; letzter Tag = Rückkehr − 1 Tag',
  inputs: [
    { type: 'date', id: 'start', label: 'Beginn der Elternzeit', default: '2026-09-01', help: 'Erster Tag der Elternzeit.' },
    { type: 'number', id: 'monate', label: 'Dauer', unit: 'Monate', default: 12, min: 1, max: 36, step: 1, help: 'Elternzeit ist bis zum 3. Geburtstag möglich (max. 36 Monate).' },
  ],
  compute: (v) => {
    const start = String(v.start);
    const startDate = toDate(start);
    let monate = Math.round(typeof v.monate === 'number' ? v.monate : parseFloat(String(v.monate)));
    if (!Number.isFinite(monate)) monate = 12;
    monate = Math.max(1, Math.min(36, monate));

    if (!startDate) {
      return [{ label: 'Enddatum (Rückkehr)', value: 'ungültiges Datum', primary: true }];
    }

    const rueckkehr = addMonthsIso(start, monate); // erster Tag nach Elternzeit
    const letzterTag = addDaysIso(rueckkehr, -1); // letzter Tag der Elternzeit
    const tageGesamt = daysBetween(start, rueckkehr); // Dauer in ganzen Tagen
    const wochenGesamt = tageGesamt / 7;

    return [
      { label: 'Enddatum (Rückkehr)', value: fmt(rueckkehr), primary: true, help: `Erster Arbeitstag, ${wochentag(rueckkehr)}` },
      { label: 'Letzter Tag der Elternzeit', value: fmt(letzterTag), help: wochentag(letzterTag) },
      { label: 'Dauer (Monate)', value: monate, unit: 'Monate', digits: 0 },
      { label: 'Dauer (Tage)', value: tageGesamt, unit: 'Tage', digits: 0 },
      { label: 'Dauer (Wochen)', value: wochenGesamt, unit: 'Wochen', digits: 1 },
    ];
  },
  howto: [
    'Beginn der Elternzeit eintragen.',
    'Gewünschte Dauer in Monaten wählen.',
    'Enddatum, letzten Tag der Elternzeit und Gesamtdauer ablesen.',
  ],
  faq: [
    { q: 'Wann endet die Elternzeit genau?', a: 'Sie endet am Tag vor dem gleichen Kalenderdatum n Monate nach dem Start. Beginnt sie am 1. September für 12 Monate, ist der letzte Tag der 31. August des Folgejahres; die Rückkehr erfolgt am 1. September.' },
    { q: 'Wie lange ist Elternzeit maximal möglich?', a: 'Bis zum vollendeten dritten Lebensjahr des Kindes, also bis zu 36 Monate je Elternteil. Anteile können unter bestimmten Voraussetzungen auf einen späteren Zeitraum übertragen werden.' },
    { q: 'Berücksichtigt der Rechner Aufteilungen?', a: 'Nein. Hier wird ein zusammenhängender Block aus Start plus Dauer berechnet. Bei mehreren Abschnitten die Zeiträume einzeln rechnen.' },
    { q: 'Ist das eine rechtsverbindliche Auskunft?', a: 'Nein, es ist nur eine Planungshilfe. Für Anmeldefristen und Ansprüche gelten die gesetzlichen Regelungen und ggf. dein Arbeitsvertrag.' },
  ],
  related: ['elternzeit-aufteilung-rechner', 'elterngeld-rechner', 'geburtstermin-rechner', 'kindergeld-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { start: '2026-09-01', monate: 12 },
      expect: [
        { label: 'Dauer (Monate)', value: 12, tolerance: 0 },
        { label: 'Dauer (Tage)', value: 365, tolerance: 0 },
      ],
    },
    {
      values: { start: '2027-01-15', monate: 24 },
      expect: [
        { label: 'Dauer (Monate)', value: 24, tolerance: 0 },
        { label: 'Dauer (Tage)', value: 731, tolerance: 0 },
        { label: 'Dauer (Wochen)', value: 104.4, tolerance: 0.1 },
      ],
    },
  ],
};
