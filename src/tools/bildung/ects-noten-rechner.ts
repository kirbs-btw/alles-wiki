import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'ects-noten-rechner',
  category: 'bildung',
  title: 'ECTS-Notenrechner (Modifizierte Bayerische Formel)',
  shortTitle: 'ECTS-Note',
  description:
    'Rechne eine auslaendische Studiennote mit der Modifizierten Bayerischen Formel in eine deutsche Note um – fuer Auslandssemester und ECTS.',
  keywords: [
    'ects note umrechnen',
    'modifizierte bayerische formel',
    'auslaendische note umrechnen',
    'auslandssemester note',
    'notenumrechnung studium',
    'ects grade rechner',
    'note anerkennung ausland',
  ],
  intro:
    'Wer im Ausland studiert, bekommt Noten auf einer anderen Skala. Die Modifizierte Bayerische Formel rechnet eine erreichte Note anhand der besten und der schlechtesten (noch bestandenen) Note des fremden Systems in die deutsche Notenskala von 1,0 bis 4,0 um. Sie wird von vielen deutschen Hochschulen zur Anerkennung von ECTS-Leistungen verwendet. Achte darauf, ob im fremden System eine hohe oder eine niedrige Zahl die bessere Note ist.',
  formula: 'x = 1 + 3 × (Nmax − Nerreicht) / (Nmax − Nmin)',
  inputs: [
    { type: 'number', id: 'nmax', label: 'Beste erreichbare Note (Ausland)', default: 100, step: 0.1, help: 'Die bestmoegliche Note im fremden System.' },
    { type: 'number', id: 'nmin', label: 'Schlechteste bestandene Note (Ausland)', default: 50, step: 0.1, help: 'Niedrigste noch bestandene Note (Bestehensgrenze).' },
    { type: 'number', id: 'nerreicht', label: 'Erreichte Note (Ausland)', default: 85, step: 0.1 },
    {
      type: 'select',
      id: 'richtung',
      label: 'Welche Zahl ist besser?',
      default: 'hoch',
      options: [
        { value: 'hoch', label: 'Hohe Zahl = beste Note (z. B. 100 / 4.0)' },
        { value: 'niedrig', label: 'Niedrige Zahl = beste Note (z. B. 1 bei 1–5)' },
      ],
    },
  ],
  compute: (v) => {
    const richtung = String(v.richtung);
    let nmax = num(v.nmax);
    let nmin = num(v.nmin);
    let nerr = num(v.nerreicht);
    // Bei "niedrige Zahl = beste Note" Skala invertieren, damit nmax stets der beste Wert ist.
    if (richtung === 'niedrig') {
      // tauschen: beste = kleinerer Wert -> Vorzeichen drehen
      const a = -nmax;
      const b = -nmin;
      nmax = Math.max(a, b);
      nmin = Math.min(a, b);
      nerr = -nerr;
    }
    const spanne = nmax - nmin;
    let note = spanne !== 0 ? 1 + (3 * (nmax - nerr)) / spanne : 1;
    if (note < 1) note = 1;
    if (note > 4) note = 4;
    const noteGerundet = Math.round(note * 10) / 10;
    let text = 'ausreichend';
    if (noteGerundet <= 1.5) text = 'sehr gut';
    else if (noteGerundet <= 2.5) text = 'gut';
    else if (noteGerundet <= 3.5) text = 'befriedigend';
    else text = 'ausreichend';
    return [
      { label: 'Deutsche Note', value: noteGerundet, digits: 1, primary: true },
      { label: 'Bewertung', value: text },
      { label: 'Note (ungerundet)', value: note, digits: 2 },
    ];
  },
  howto: [
    'Beste erreichbare Note des auslaendischen Systems eintragen.',
    'Schlechteste noch bestandene Note (Bestehensgrenze) eintragen.',
    'Deine tatsaechlich erreichte Note eintragen.',
    'Auswaehlen, ob im fremden System eine hohe oder niedrige Zahl die bessere Note ist, und Ergebnis ablesen.',
  ],
  faq: [
    { q: 'Was ist die Modifizierte Bayerische Formel?', a: 'Eine von der Kultusministerkonferenz empfohlene Formel zur Umrechnung auslaendischer Noten: Note = 1 + 3 × (beste Note − erreichte Note) / (beste Note − Bestehensgrenze). Sie liefert Werte zwischen 1,0 und 4,0.' },
    { q: 'Wofuer brauche ich die ECTS-Umrechnung?', a: 'Wenn du im Ausland Leistungspunkte (ECTS) erworben hast, rechnet deine Hochschule die dortigen Noten in das deutsche System um, um sie ins Zeugnis aufzunehmen.' },
    { q: 'Was, wenn eine niedrige Zahl die beste Note ist?', a: 'Manche Laender bewerten umgekehrt (z. B. 1 ist top, 5 ist schlecht). Waehle dann die Option „Niedrige Zahl = beste Note", damit die Formel korrekt rechnet.' },
    { q: 'Ist die Umrechnung verbindlich?', a: 'Die Formel ist eine bundesweite Empfehlung (Stand 2026). Hochschulen koennen abweichende oder fachspezifische Umrechnungstabellen verwenden – im Zweifel beim Pruefungsamt nachfragen.' },
  ],
  related: ['notendurchschnitt-rechner', 'prozent-in-note-rechner', 'studienkosten-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { nmax: 100, nmin: 50, nerreicht: 85, richtung: 'hoch' },
      expect: [{ label: 'Deutsche Note', value: 1.9, tolerance: 0.05 }],
    },
    {
      values: { nmax: 100, nmin: 50, nerreicht: 50, richtung: 'hoch' },
      expect: [{ label: 'Deutsche Note', value: 4, tolerance: 0.001 }],
    },
  ],
};
