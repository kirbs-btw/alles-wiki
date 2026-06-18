import type { Tool } from '../../lib/types';
import { daysBetween, diffYMD } from '../../lib/types';

export const tool: Tool = {
  slug: 'tage-zwischen-daten-rechner',
  category: 'alltag',
  title: 'Tage zwischen zwei Daten berechnen',
  shortTitle: 'Tage zwischen Daten',
  description:
    'Berechne die Anzahl der Tage, Wochen und Monate zwischen zwei Datumsangaben – kalendergenau inklusive Schaltjahren und mit Anzahl der Wochenenden.',
  keywords: [
    'tage zwischen zwei daten',
    'zeitspanne berechnen',
    'tage berechnen',
    'wie viele tage',
    'datumsdifferenz',
    'tage rechner',
  ],
  formula: 'Tage = Enddatum − Startdatum',
  inputs: [
    { type: 'date', id: 'start', label: 'Startdatum', default: '2026-01-01' },
    {
      type: 'date',
      id: 'ende',
      label: 'Enddatum',
      default: '2026-06-18',
      today: true,
      help: 'Standard: heute.',
    },
  ],
  compute: (v) => {
    const start = String(v.start);
    const ende = String(v.ende);
    const roh = daysBetween(start, ende);
    const tage = Math.abs(roh);
    const { years, months, days } = diffYMD(start, ende);

    // Wochenenden (Sa/So) im Intervall zählen – inklusive beider Endtage.
    const a = new Date((roh >= 0 ? start : ende) + 'T00:00:00Z');
    let wochenenden = 0;
    for (let i = 0; i <= tage; i++) {
      const t = new Date(a.getTime() + i * 86_400_000);
      const wt = t.getUTCDay();
      if (wt === 0 || wt === 6) wochenenden++;
    }

    return [
      { label: 'Tage', value: tage, unit: 'Tage', digits: 0, primary: true },
      { label: 'Wochen', value: Math.floor(tage / 7), unit: 'Wochen', digits: 0 },
      { label: 'Wochen (genau)', value: tage / 7, unit: 'Wochen', digits: 2 },
      { label: 'Monate (Rest)', value: years * 12 + months, unit: 'Monate', digits: 0 },
      { label: 'Jahre, Monate, Tage', value: `${years} J, ${months} M, ${days} T` },
      { label: 'Wochenendtage (Sa/So)', value: wochenenden, unit: 'Tage', digits: 0 },
    ];
  },
  intro:
    '<p>Dieser Rechner ermittelt die exakte Zeitspanne zwischen zwei Daten – etwa bis zu einem Urlaub, seit einem Jubiläum oder zwischen zwei Terminen. Die Berechnung berücksichtigt alle Schaltjahre kalendergenau.</p>',
  howto: [
    'Startdatum eintragen.',
    'Enddatum wählen – standardmäßig der heutige Tag.',
    'Tage, Wochen und Monate sowie die Anzahl der Wochenendtage ablesen.',
  ],
  faq: [
    {
      q: 'Wird der erste oder letzte Tag mitgezählt?',
      a: 'Die Differenz zählt die vollen Tage zwischen den Daten. Vom 1. bis zum 2. eines Monats ist es 1 Tag. Soll der Endtag selbst mitzählen, addiere 1 hinzu.',
    },
    {
      q: 'Spielt die Reihenfolge der Daten eine Rolle?',
      a: 'Nein. Liegt das Enddatum vor dem Startdatum, wird der Betrag der Differenz ausgegeben – das Ergebnis ist nie negativ.',
    },
    {
      q: 'Sind Schaltjahre berücksichtigt?',
      a: 'Ja. Jeder Schalttag (29. Februar) wird kalendergenau mitgezählt.',
    },
  ],
  related: ['tage-bis-rechner', 'datum-plus-rechner', 'alter-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { start: '2026-01-01', ende: '2026-12-31' },
      expect: [
        { label: 'Tage', value: 364, tolerance: 0 },
        { label: 'Wochen', value: 52, tolerance: 0 },
      ],
    },
    {
      values: { start: '2024-01-01', ende: '2025-01-01' },
      expect: [
        { label: 'Tage', value: 366, tolerance: 0 },
        { label: 'Monate (Rest)', value: 12, tolerance: 0 },
      ],
    },
    {
      values: { start: '2026-06-15', ende: '2026-06-21' },
      expect: [
        { label: 'Tage', value: 6, tolerance: 0 },
        { label: 'Wochenendtage (Sa/So)', value: 2, tolerance: 0 },
      ],
    },
  ],
};
