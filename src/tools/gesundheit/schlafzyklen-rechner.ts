import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

function clock(totalMin: number): string {
  const m = ((Math.round(totalMin) % 1440) + 1440) % 1440;
  const h = Math.floor(m / 60);
  const min = m % 60;
  return `${String(h).padStart(2, '0')}:${String(min).padStart(2, '0')} Uhr`;
}

export const tool: Tool = {
  slug: 'schlafzyklen-rechner',
  category: 'gesundheit',
  title: 'Schlafzyklen-Rechner',
  shortTitle: 'Schlafzyklen',
  description:
    'Finde die ideale Einschlafzeit: Der Rechner ermittelt aus deiner Aufwachzeit, wann du ins Bett solltest, um am Ende eines 90-Minuten-Schlafzyklus zu erwachen.',
  keywords: [
    'schlafzyklen rechner',
    'wann ins bett gehen',
    'einschlafzeit berechnen',
    'schlafrechner 90 minuten',
    'beste aufwachzeit',
    'schlafphasen rechner',
  ],
  formula: 'Einschlafzeit = Aufwachzeit − (Zyklen × 90 min + Einschlafdauer)',
  inputs: [
    { type: 'number', id: 'wachStunde', label: 'Aufwachzeit – Stunde', unit: 'Uhr', default: 7, min: 0, max: 23, step: 1 },
    { type: 'number', id: 'wachMinute', label: 'Aufwachzeit – Minute', default: 0, min: 0, max: 59, step: 5 },
    { type: 'number', id: 'zyklen', label: 'Gewünschte Schlafzyklen', default: 5, min: 1, max: 8, step: 1, help: 'Empfohlen sind 5–6 Zyklen (ca. 7,5–9 Std.).' },
    { type: 'number', id: 'einschlafdauer', label: 'Zeit zum Einschlafen', unit: 'min', default: 15, min: 0, max: 60, step: 5 },
  ],
  compute: (v) => {
    const wakeMin = num(v.wachStunde) * 60 + num(v.wachMinute);
    const zyklen = num(v.zyklen, 5);
    const einschlaf = num(v.einschlafdauer, 15);
    const schlafMin = zyklen * 90;
    const bettMin = wakeMin - schlafMin - einschlaf;
    return [
      { label: 'Ins Bett gehen um', value: clock(bettMin), primary: true },
      { label: 'Reine Schlafzeit', value: schlafMin / 60, unit: 'Std.', digits: 1 },
      { label: 'Zeit im Bett gesamt', value: (schlafMin + einschlaf) / 60, unit: 'Std.', digits: 1 },
    ];
  },
  intro:
    'Schlaf läuft in Zyklen von durchschnittlich rund 90 Minuten ab, die Tief- und Traumschlafphasen durchlaufen. Wachst du am Ende eines Zyklus auf statt mitten im Tiefschlaf, fühlst du dich meist erholter. Dieser Rechner ermittelt anhand deiner gewünschten Aufwachzeit, wann du ins Bett gehen solltest, damit du eine ganze Zahl an Zyklen schläfst. Die 90-Minuten-Dauer ist ein Durchschnitt; individuell sind 80 bis 110 Minuten möglich.',
  howto: [
    'Gewünschte Aufwachzeit als Stunde und Minute eingeben.',
    'Anzahl der Schlafzyklen wählen (5 bis 6 sind für Erwachsene üblich).',
    'Übliche Einschlafdauer angeben (Standard 15 Minuten).',
    'Empfohlene Zeit zum Ins-Bett-Gehen ablesen.',
  ],
  faq: [
    { q: 'Wie lange dauert ein Schlafzyklus?', a: 'Im Mittel etwa 90 Minuten. Ein Zyklus umfasst Leicht-, Tief- und Traumschlaf (REM). Die Dauer schwankt individuell zwischen rund 80 und 110 Minuten.' },
    { q: 'Wie viele Zyklen sollte ich schlafen?', a: 'Für Erwachsene sind 5 bis 6 vollständige Zyklen üblich, also etwa 7,5 bis 9 Stunden Schlaf.' },
    { q: 'Warum die 15 Minuten Einschlafzeit?', a: 'Die meisten Menschen brauchen einige Minuten zum Einschlafen. Der Rechner addiert diese Zeit, damit die Zyklen ab dem tatsächlichen Einschlafen passen. Du kannst den Wert anpassen.' },
    { q: 'Ist die 90-Minuten-Regel exakt?', a: 'Nein, sie ist ein Durchschnitt. Der Rechner gibt eine gute Orientierung; achte zusätzlich auf dein eigenes Erholungsgefühl beim Aufwachen.' },
  ],
  related: ['grundumsatz-rechner', 'kalorienbedarf-rechner', 'maximalpuls-rechner'],
  updated: '2026-06-19',
  examples: [
    {
      values: { wachStunde: 7, wachMinute: 0, zyklen: 5, einschlafdauer: 15 },
      expect: [
        { label: 'Reine Schlafzeit', value: 7.5, tolerance: 0.01 },
      ],
    },
    {
      values: { wachStunde: 7, wachMinute: 0, zyklen: 6, einschlafdauer: 15 },
      expect: [
        { label: 'Reine Schlafzeit', value: 9, tolerance: 0.01 },
        { label: 'Zeit im Bett gesamt', value: 9.25, tolerance: 0.01 },
      ],
    },
  ],
};
