import type { Tool } from '../../lib/types';
import { toDate, daysBetween } from '../../lib/types';

// Geburtstermin-Rechner nach der Naegele-Regel:
// errechneter Termin (ET) = erster Tag der letzten Periode (LP) + 280 Tage (40 Wochen).
// Zusätzlich wird zu einem Stichtag (Standard: heute) die grobe aktuelle SSW
// und die verbleibende Zeit bis zum ET ausgegeben.
// Reine Orientierung – kein Ersatz für ärztliche Bestimmung (z. B. per Ultraschall).

const TRAGZEIT_TAGE = 280; // 40 Wochen ab erstem Tag der letzten Periode

// Datum + n Tage als ISO-String (UTC, deterministisch).
function addDaysIso(iso: string, n: number): string {
  const d = toDate(iso);
  if (!d) return iso;
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}

// Wochentag (deutsch) eines ISO-Datums.
function wochentag(iso: string): string {
  const d = toDate(iso);
  if (!d) return '';
  return ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'][
    d.getUTCDay()
  ];
}

// Datum de-DE formatiert (TT.MM.JJJJ).
function fmt(iso: string): string {
  const d = toDate(iso);
  if (!d) return iso;
  const tt = String(d.getUTCDate()).padStart(2, '0');
  const mm = String(d.getUTCMonth() + 1).padStart(2, '0');
  return `${tt}.${mm}.${d.getUTCFullYear()}`;
}

export const tool: Tool = {
  slug: 'geburtstermin-rechner',
  category: 'familie',
  title: 'Geburtstermin berechnen (Naegele-Regel)',
  shortTitle: 'Geburtstermin',
  description:
    'Errechne den voraussichtlichen Geburtstermin nach der Naegele-Regel aus dem ersten Tag der letzten Periode (+ 280 Tage) und sieh die aktuelle SSW. Orientierung.',
  keywords: [
    'geburtstermin berechnen',
    'errechneter termin',
    'naegele regel',
    'et berechnen schwangerschaft',
    'entbindungstermin rechner',
    'geburtsterminrechner',
  ],
  intro:
    'Der errechnete Geburtstermin (ET) wird nach der Naegele-Regel bestimmt: erster Tag der letzten Periode plus 280 Tage (40 Wochen). Dieser Rechner zeigt zusätzlich, in welcher Schwangerschaftswoche (SSW) du dich zum Stichtag grob befindest und wie viele Tage bis zum Termin verbleiben. Hinweis: Nur eine Orientierung – der tatsächliche Geburtstermin weicht häufig ab und sollte ärztlich bestimmt werden. Kein Ersatz für medizinische Beratung.',
  formula: 'ET = erster Tag der letzten Periode + 280 Tage (40 Wochen)',
  inputs: [
    { type: 'date', id: 'lp', label: 'Erster Tag der letzten Periode', default: '2026-01-01', help: 'Beginn der letzten Regelblutung.' },
    { type: 'date', id: 'stichtag', label: 'Stichtag', default: '2026-06-18', today: true, help: 'Standard: heute – für die aktuelle SSW.' },
  ],
  compute: (v) => {
    const lp = String(v.lp);
    const stichtag = String(v.stichtag);
    const lpDate = toDate(lp);
    if (!lpDate) {
      return [{ label: 'Geburtstermin', value: 'ungültiges Datum', primary: true }];
    }
    const et = addDaysIso(lp, TRAGZEIT_TAGE);

    // Aktuelle SSW grob zum Stichtag.
    const tageSeitLp = daysBetween(lp, stichtag);
    const sswWochen = tageSeitLp >= 0 ? Math.floor(tageSeitLp / 7) : 0;
    const sswTage = tageSeitLp >= 0 ? tageSeitLp % 7 : 0;
    const tageBisEt = daysBetween(stichtag, et);
    const wochenBisEt = tageBisEt / 7;

    return [
      { label: 'Errechneter Geburtstermin', value: fmt(et), primary: true, help: `Naegele-Regel, ${wochentag(et)}` },
      { label: 'Wochentag des Termins', value: wochentag(et) },
      { label: 'Schwangerschaftswoche (Stichtag)', value: tageSeitLp >= 0 ? `${sswWochen}+${sswTage} (SSW ${sswWochen + 1})` : 'vor Beginn' },
      { label: 'Abgeschlossene Wochen (Stichtag)', value: sswWochen, unit: 'SSW', digits: 0 },
      { label: 'Tage bis zum Termin', value: tageBisEt, unit: 'Tage', digits: 0 },
      { label: 'Wochen bis zum Termin', value: wochenBisEt, unit: 'Wochen', digits: 1 },
    ];
  },
  howto: [
    'Ersten Tag der letzten Periode eintragen.',
    'Stichtag wählen – standardmäßig der heutige Tag.',
    'Errechneten Geburtstermin sowie aktuelle SSW und verbleibende Tage ablesen.',
  ],
  faq: [
    { q: 'Wie funktioniert die Naegele-Regel?', a: 'Zum ersten Tag der letzten Periode werden 280 Tage (40 Wochen) addiert. Klassisch: erster Tag der letzten Periode − 3 Monate + 7 Tage + 1 Jahr. Beide Wege ergeben denselben Termin bei einem 28-Tage-Zyklus.' },
    { q: 'Wie genau ist der errechnete Termin?', a: 'Es ist nur eine statistische Orientierung. Nur etwa 4 % der Kinder kommen exakt am ET zur Welt; die meisten Geburten liegen rund zwei Wochen davor oder danach.' },
    { q: 'Was, wenn mein Zyklus nicht 28 Tage hat?', a: 'Bei deutlich längerem oder kürzerem Zyklus verschiebt sich der Eisprung und damit der Termin. Eine ärztliche Bestimmung per Ultraschall ist genauer als die Naegele-Regel.' },
    { q: 'Ersetzt der Rechner die ärztliche Beratung?', a: 'Nein. Der Geburtstermin und die SSW dienen nur der Orientierung. Verbindlich ist die Einschätzung von Ärztin, Arzt oder Hebamme.' },
  ],
  related: ['schwangerschaftswoche-rechner', 'mutterschaftsgeld-rechner', 'elterngeld-rechner', 'elternzeit-ende-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { lp: '2026-01-01', stichtag: '2026-04-01' },
      expect: [
        { label: 'Abgeschlossene Wochen (Stichtag)', value: 12, tolerance: 0 },
        { label: 'Tage bis zum Termin', value: 190, tolerance: 0 },
        { label: 'Wochen bis zum Termin', value: 27.1, tolerance: 0.1 },
      ],
    },
    {
      values: { lp: '2025-12-01', stichtag: '2026-03-01' },
      expect: [
        { label: 'Abgeschlossene Wochen (Stichtag)', value: 12, tolerance: 0 },
        { label: 'Tage bis zum Termin', value: 190, tolerance: 0 },
      ],
    },
  ],
};
