import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'bachelor-gesamtnote-rechner',
  category: 'bildung',
  title: 'Bachelor-Gesamtnote berechnen (nach Credit Points)',
  shortTitle: 'Bachelor-Note',
  description:
    'Berechne deine gewichtete Bachelor-Gesamtnote aus bis zu sechs Modulen mit Note und ECTS-Credits – inklusive ECTS-Notenklasse.',
  keywords: [
    'bachelor gesamtnote berechnen',
    'gewichtete endnote studium',
    'ects gewichtete note',
    'abschlussnote bachelor rechner',
    'modulnoten gewichten',
    'bachelorarbeit gewichtung',
  ],
  intro:
    'Im Studium zaehlt jede Modulnote entsprechend ihrer Credit Points (ECTS). Das Tool multipliziert jede Note mit den zugehoerigen Credits, summiert die Produkte und teilt durch die Gesamt-Credits. Trage nur Module ein, die in die Endnote eingehen – Module mit 0 Credits werden ignoriert. Die genaue Gewichtung kann je nach Pruefungsordnung abweichen.',
  formula: 'Gesamtnote = Summe(Note × Credits) / Summe(Credits)',
  inputs: [
    { type: 'number', id: 'n1', label: 'Note Modul 1', default: 1.7, min: 1, max: 4, step: 0.1 },
    { type: 'number', id: 'c1', label: 'Credits Modul 1', default: 6, min: 0, step: 1 },
    { type: 'number', id: 'n2', label: 'Note Modul 2', default: 2.3, min: 1, max: 4, step: 0.1 },
    { type: 'number', id: 'c2', label: 'Credits Modul 2', default: 5, min: 0, step: 1 },
    { type: 'number', id: 'n3', label: 'Note Modul 3', default: 2, min: 1, max: 4, step: 0.1 },
    { type: 'number', id: 'c3', label: 'Credits Modul 3', default: 12, min: 0, step: 1, help: 'z. B. Bachelorarbeit' },
    { type: 'number', id: 'n4', label: 'Note Modul 4', default: 0, min: 0, max: 4, step: 0.1, help: 'Note bei 0 lassen, wenn nicht vorhanden.' },
    { type: 'number', id: 'c4', label: 'Credits Modul 4', default: 0, min: 0, step: 1 },
    { type: 'number', id: 'n5', label: 'Note Modul 5', default: 0, min: 0, max: 4, step: 0.1 },
    { type: 'number', id: 'c5', label: 'Credits Modul 5', default: 0, min: 0, step: 1 },
    { type: 'number', id: 'n6', label: 'Note Modul 6', default: 0, min: 0, max: 4, step: 0.1 },
    { type: 'number', id: 'c6', label: 'Credits Modul 6', default: 0, min: 0, step: 1 },
  ],
  compute: (v) => {
    const paare = [
      [num(v.n1), num(v.c1)],
      [num(v.n2), num(v.c2)],
      [num(v.n3), num(v.c3)],
      [num(v.n4), num(v.c4)],
      [num(v.n5), num(v.c5)],
      [num(v.n6), num(v.c6)],
    ];
    let summeGewichtet = 0;
    let summeCredits = 0;
    for (const [note, credits] of paare) {
      if (credits > 0 && note > 0) {
        summeGewichtet += note * credits;
        summeCredits += credits;
      }
    }
    const note = summeCredits > 0 ? summeGewichtet / summeCredits : 0;
    const noteGerundet = Math.round(note * 100) / 100;
    let ects = '–';
    if (note > 0) {
      if (noteGerundet <= 1.5) ects = 'A (sehr gut)';
      else if (noteGerundet <= 2.0) ects = 'B (gut)';
      else if (noteGerundet <= 2.5) ects = 'C (befriedigend)';
      else if (noteGerundet <= 3.5) ects = 'D (ausreichend)';
      else ects = 'E (genuegend)';
    }
    return [
      { label: 'Gesamtnote', value: noteGerundet, digits: 2, primary: true },
      { label: 'ECTS-Notenklasse', value: ects },
      { label: 'Eingerechnete Credits', value: summeCredits, digits: 0, unit: 'ECTS' },
    ];
  },
  howto: [
    'Fuer jedes pruefungsrelevante Modul Note und Credits eintragen.',
    'Die Bachelorarbeit als eigenes Modul mit ihren Credits angeben.',
    'Nicht benoetigte Module auf Note 0 lassen.',
    'Gewichtete Gesamtnote und ECTS-Klasse ablesen.',
  ],
  faq: [
    { q: 'Wie wird die Bachelornote gewichtet?', a: 'Ueblich ist die Gewichtung nach Credit Points: Ein Modul mit 12 ECTS zaehlt doppelt so stark wie eines mit 6 ECTS. Manche Pruefungsordnungen gewichten einzelne Module abweichend – pruefe deine PO.' },
    { q: 'Geht die Bachelorarbeit staerker ein?', a: 'Die Bachelorarbeit traegt meist 6 bis 12 ECTS und wird wie ein normales Modul nach ihren Credits gewichtet. Einige Ordnungen geben ihr ein gesondert erhoehtes Gewicht.' },
    { q: 'Was bedeutet die ECTS-Notenklasse?', a: 'Die Buchstaben A bis E sind eine grobe europaeische Einordnung. Hier wird vereinfacht aus der deutschen Note abgeleitet; die offizielle ECTS-Klasse berechnet sich aus dem Jahrgangsranking.' },
  ],
  related: ['ects-noten-rechner', 'notendurchschnitt-rechner', 'master-zulassungsnote-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { n1: 2, c1: 10, n2: 3, c2: 10, n3: 0, c3: 0, n4: 0, c4: 0, n5: 0, c5: 0, n6: 0, c6: 0 },
      expect: [
        { label: 'Gesamtnote', value: 2.5, tolerance: 0.01 },
        { label: 'Eingerechnete Credits', value: 20, tolerance: 0.01 },
      ],
    },
  ],
};
