import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'notenpunkte-umrechnung',
  category: 'bildung',
  title: 'Notenpunkte umrechnen (Oberstufe: Punkte und Note)',
  shortTitle: 'Notenpunkte',
  description:
    'Rechne zwischen Oberstufen-Notenpunkten (0–15) und der klassischen Schulnote (1–6) um – mit der bundesweit einheitlichen Zuordnung inklusive Tendenz.',
  keywords: [
    'notenpunkte umrechnen',
    'punkte in note oberstufe',
    'note in punkte umrechnen',
    '15 punkte system',
    'notenpunkte tabelle',
    'oberstufe notenpunkte',
    'note 1 wieviel punkte',
  ],
  intro:
    'In der gymnasialen Oberstufe werden Noten in Punkten von 0 bis 15 angegeben. 15 Punkte entsprechen einer glatten 1+, 0 Punkte einer 6. Die Zuordnung ist bundesweit einheitlich: je drei Punktstufen bilden eine ganze Note mit Tendenz (+, glatt, −). Dieses Tool rechnet in beide Richtungen – von Punkten zur Note oder von der Note zu den Punkten.',
  formula: 'Note (grob) = 6 − Punkte/3 für Punkte 1–15; Zuordnung mit +/− nach KMK-Tabelle',
  inputs: [
    {
      type: 'select',
      id: 'richtung',
      label: 'Umrechnungsrichtung',
      default: 'p2n',
      options: [
        { value: 'p2n', label: 'Punkte → Note' },
        { value: 'n2p', label: 'Note → Punkte' },
      ],
    },
    { type: 'number', id: 'punkte', label: 'Notenpunkte (0–15)', default: 13, min: 0, max: 15, step: 1, help: 'Nur bei Richtung Punkte → Note.' },
    { type: 'number', id: 'note', label: 'Schulnote (1–6)', default: 2, min: 1, max: 6, step: 0.1, help: 'Nur bei Richtung Note → Punkte.' },
  ],
  compute: (v) => {
    const richtung = String(v.richtung);
    // Bundeseinheitliche Zuordnung Punkte -> Notentext
    const punkteText: Record<number, string> = {
      15: '1+', 14: '1', 13: '1−',
      12: '2+', 11: '2', 10: '2−',
      9: '3+', 8: '3', 7: '3−',
      6: '4+', 5: '4', 4: '4−',
      3: '5+', 2: '5', 1: '5−',
      0: '6',
    };
    // Repraesentative Dezimalnote je Punktzahl (gaengige Naeherung mit Tendenz)
    const punkteNote: Record<number, number> = {
      15: 0.75, 14: 1.0, 13: 1.3,
      12: 1.7, 11: 2.0, 10: 2.3,
      9: 2.7, 8: 3.0, 7: 3.3,
      6: 3.7, 5: 4.0, 4: 4.3,
      3: 4.7, 2: 5.0, 1: 5.3,
      0: 6.0,
    };

    if (richtung === 'n2p') {
      const noteEin = num(v.note);
      // naechstgelegene Punktzahl ueber die Dezimalnote bestimmen
      let bestP = 0;
      let bestDiff = Infinity;
      for (let p = 0; p <= 15; p += 1) {
        const diff = Math.abs(punkteNote[p] - noteEin);
        if (diff < bestDiff) {
          bestDiff = diff;
          bestP = p;
        }
      }
      let bestanden = 'ja';
      if (bestP < 5) bestanden = 'nein';
      return [
        { label: 'Notenpunkte', value: bestP, digits: 0, unit: 'von 15', primary: true },
        { label: 'Notenstufe', value: punkteText[bestP] },
        { label: 'Eingegebene Note', value: noteEin, digits: 1 },
        { label: 'Bestanden (ab 5 Punkten)', value: bestanden },
      ];
    }

    // Punkte -> Note
    let p = Math.round(num(v.punkte));
    if (p < 0) p = 0;
    if (p > 15) p = 15;
    const note = punkteNote[p];
    return [
      { label: 'Note (Dezimal)', value: note, digits: 1, primary: true },
      { label: 'Notenstufe', value: punkteText[p] },
      { label: 'Notenpunkte', value: p, digits: 0, unit: 'von 15' },
      { label: 'Bestanden (ab 5 Punkten)', value: p >= 5 ? 'ja' : 'nein' },
    ];
  },
  howto: [
    'Umrechnungsrichtung waehlen: Punkte → Note oder Note → Punkte.',
    'Bei Punkte → Note die Notenpunkte (0 bis 15) eintragen.',
    'Bei Note → Punkte die Schulnote (1,0 bis 6,0) eintragen.',
    'Ergebnis als Punkte, Notenstufe (z. B. 1−) und Dezimalnote ablesen.',
  ],
  faq: [
    { q: 'Wie viele Punkte sind eine glatte 1?', a: '14 Punkte entsprechen einer glatten 1, 15 Punkte einer 1+ (sehr gut plus) und 13 Punkte einer 1− (sehr gut minus).' },
    { q: 'Ab wie vielen Punkten habe ich bestanden?', a: 'Eine Leistung gilt ab 5 Punkten (Note 4 / ausreichend) als bestanden. 0 bis 4 Punkte entsprechen den Noten 5 und 6.' },
    { q: 'Wie ist die Zuordnung von Punkten und Noten?', a: 'Je drei Punktstufen bilden eine ganze Note: 13–15 = Note 1, 10–12 = Note 2, 7–9 = Note 3, 4–6 = Note 4, 1–3 = Note 5, 0 = Note 6. Innerhalb einer Note steht die hoehere Punktzahl fuer die Tendenz plus.' },
    { q: 'Ist das 15-Punkte-System ueberall gleich?', a: 'Ja, die Punktzuordnung in der gymnasialen Oberstufe ist durch die Kultusministerkonferenz bundesweit einheitlich (Stand 2026). Die Dezimalnote je Punkt ist eine gaengige Naeherung.' },
  ],
  related: ['abi-durchschnitt-rechner', 'notendurchschnitt-rechner', 'prozent-in-note-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { richtung: 'p2n', punkte: 14, note: 2 },
      expect: [{ label: 'Note (Dezimal)', value: 1.0, tolerance: 0.001 }],
    },
    {
      values: { richtung: 'n2p', punkte: 13, note: 2.0 },
      expect: [{ label: 'Notenpunkte', value: 11, tolerance: 0.001 }],
    },
  ],
};
