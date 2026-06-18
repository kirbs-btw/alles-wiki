import type { Tool } from '../../lib/types';
import { toDate, daysBetween, num } from '../../lib/types';

const WOCHENTAGE = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];

export const tool: Tool = {
  slug: 'arbeitstage-zwischen-rechner',
  category: 'beruf',
  title: 'Arbeitstage zwischen zwei Daten berechnen',
  shortTitle: 'Arbeitstage zwischen Daten',
  description:
    'Zähle die Werktage (Montag bis Freitag) zwischen zwei Daten – Wochenenden werden automatisch abgezogen, Feiertage kannst du optional als Zahl angeben.',
  keywords: [
    'arbeitstage zwischen zwei daten',
    'werktage berechnen',
    'arbeitstage zählen',
    'werktage zwischen datum',
    'arbeitstage ohne wochenende',
    'wie viele werktage',
  ],
  formula:
    'Arbeitstage = Werktage (Mo–Fr, beide Daten inklusive) − Feiertage auf Werktagen',
  inputs: [
    { type: 'date', id: 'von', label: 'Von (Startdatum)', default: '2026-01-01' },
    { type: 'date', id: 'bis', label: 'Bis (Enddatum)', default: '2026-12-31', today: true, help: 'Standard: heute. Das Enddatum wird mitgezählt.' },
    { type: 'number', id: 'feiertage', label: 'Feiertage auf Werktagen', unit: 'Tage', default: 0, min: 0, max: 366, step: 1, help: 'Optional: Anzahl gesetzlicher Feiertage im Zeitraum, die auf einen Werktag (Mo–Fr) fallen. Werden von den Arbeitstagen abgezogen.' },
  ],
  compute: (v) => {
    const vonS = String(v.von);
    const bisS = String(v.bis);
    const feiertage = Math.max(0, Math.round(num(v.feiertage)));

    const dVon = toDate(vonS);
    const dBis = toDate(bisS);

    if (!dVon || !dBis) {
      return [
        { label: 'Arbeitstage', value: 0, unit: 'Tage', digits: 0, primary: true },
        { label: 'Hinweis', value: 'Bitte zwei gültige Daten eingeben.' },
      ];
    }

    // Reihenfolge sicherstellen (Spanne inklusive beider Daten zählen).
    let start = dVon;
    let ende = dBis;
    if (ende.getTime() < start.getTime()) {
      start = dBis;
      ende = dVon;
    }

    const kalendertage = daysBetween(start, ende) + 1; // inklusive beider Daten
    const wochenAnzahl = Math.floor(kalendertage / 7);
    const rest = kalendertage % 7;

    // Wochenenden zählen: volle Wochen liefern je 2 Wochenendtage,
    // im Rest-Block ab dem Starttag prüfen, welche Tage auf Sa/So fallen.
    let wochenenden = wochenAnzahl * 2;
    const startTag = start.getUTCDay(); // 0=So ... 6=Sa
    for (let i = 0; i < rest; i++) {
      const wd = (startTag + i) % 7;
      if (wd === 0 || wd === 6) wochenenden++;
    }

    const werktage = kalendertage - wochenenden;
    const arbeitstage = Math.max(0, werktage - feiertage);
    const arbeitswochen = arbeitstage / 5;

    return [
      { label: 'Arbeitstage', value: arbeitstage, unit: 'Tage', digits: 0, primary: true },
      { label: 'Werktage (Mo–Fr)', value: werktage, unit: 'Tage', digits: 0, help: 'Vor Abzug der Feiertage.' },
      { label: 'Wochenendtage', value: wochenenden, unit: 'Tage', digits: 0 },
      { label: 'Kalendertage gesamt', value: kalendertage, unit: 'Tage', digits: 0 },
      { label: 'Arbeitswochen (à 5 Tage)', value: arbeitswochen, unit: 'Wochen', digits: 1 },
      { label: 'Startet an einem', value: WOCHENTAGE[startTag] },
    ];
  },
  intro:
    'Wie viele Arbeitstage liegen zwischen zwei Daten? Dieser Rechner zählt alle Werktage von Montag bis Freitag im gewählten Zeitraum und zieht Samstage und Sonntage automatisch ab. Beide Daten – Start und Ende – werden mitgezählt. Feiertage erkennt der Rechner nicht automatisch, weil sie je Bundesland unterschiedlich sind; du kannst ihre Anzahl aber als optionalen Abzug eintragen. Praktisch für Projektplanung, Fristen, Lieferzeiten, Urlaubsberechnung oder Stundenkalkulation.',
  howto: [
    'Startdatum unter „Von" eintragen.',
    'Enddatum unter „Bis" wählen – es wird mitgezählt (Standard: heute).',
    'Optional die Zahl der Feiertage angeben, die im Zeitraum auf einen Werktag fallen.',
    'Arbeitstage, Werktage und Wochenendtage ablesen.',
  ],
  faq: [
    { q: 'Werden Start- und Enddatum mitgezählt?', a: 'Ja. Der Rechner zählt die Spanne inklusive beider Daten. Vom Montag bis zum Freitag derselben Woche ergeben sich also 5 Arbeitstage.' },
    { q: 'Sind Feiertage automatisch berücksichtigt?', a: 'Nein. Gesetzliche Feiertage unterscheiden sich je nach Bundesland. Trage die Anzahl der Feiertage, die im Zeitraum auf einen Werktag (Mo–Fr) fallen, im optionalen Feld ein – sie werden dann abgezogen.' },
    { q: 'Was zählt als Werktag?', a: 'Hier gelten Montag bis Freitag als Werktage. Samstage und Sonntage werden als Wochenende abgezogen. Falls du auch samstags arbeitest, ist dieses Tool nicht passend.' },
    { q: 'Spielt die Reihenfolge der Daten eine Rolle?', a: 'Nein. Liegt das Enddatum vor dem Startdatum, vertauscht der Rechner beide automatisch und liefert dasselbe Ergebnis.' },
  ],
  related: ['arbeitstage-rechner', 'urlaubsanspruch-rechner', 'kuendigungsfrist-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      // 2026-06-01 (Mo) bis 2026-06-30 (Di): 30 Kalendertage, 8 Wochenendtage, 22 Werktage.
      values: { von: '2026-06-01', bis: '2026-06-30', feiertage: 0 },
      expect: [
        { label: 'Arbeitstage', value: 22, tolerance: 0 },
        { label: 'Werktage (Mo–Fr)', value: 22, tolerance: 0 },
        { label: 'Wochenendtage', value: 8, tolerance: 0 },
        { label: 'Kalendertage gesamt', value: 30, tolerance: 0 },
      ],
    },
    {
      // Ganzes Jahr 2025: 261 Werktage; mit 9 Feiertagen -> 252 Arbeitstage.
      values: { von: '2025-01-01', bis: '2025-12-31', feiertage: 9 },
      expect: [
        { label: 'Arbeitstage', value: 252, tolerance: 0 },
        { label: 'Werktage (Mo–Fr)', value: 261, tolerance: 0 },
        { label: 'Kalendertage gesamt', value: 365, tolerance: 0 },
      ],
    },
    {
      // Mo 2026-06-01 bis Fr 2026-06-05: 5 Werktage, 0 Wochenendtage.
      values: { von: '2026-06-01', bis: '2026-06-05', feiertage: 0 },
      expect: [
        { label: 'Arbeitstage', value: 5, tolerance: 0 },
        { label: 'Wochenendtage', value: 0, tolerance: 0 },
        { label: 'Kalendertage gesamt', value: 5, tolerance: 0 },
      ],
    },
  ],
};
