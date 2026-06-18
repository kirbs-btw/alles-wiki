import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'prozent-in-note-rechner',
  category: 'bildung',
  title: 'Prozent in Note umrechnen (IHK-Schluessel)',
  shortTitle: 'Prozent in Note',
  description:
    'Rechne erreichte Prozent in eine Schulnote um – nach dem IHK-Notenschluessel mit sechs Stufen oder als linearer Schluessel von 0 bis 100 %.',
  keywords: [
    'prozent in note',
    'ihk notenschluessel',
    'note aus prozent berechnen',
    'punkte in note rechner',
    'notenschluessel',
    'prozent note umrechnen',
    'klausur prozent note',
  ],
  intro:
    'Bei vielen Pruefungen werden zuerst Prozent der maximal erreichbaren Punkte ermittelt und dann in eine Note uebersetzt. Der IHK-Notenschluessel ist bundesweit Standard fuer Abschlusspruefungen: 100–92 % = sehr gut, ab 50 % noch ausreichend. Alternativ bietet das Tool einen einfachen linearen Schluessel. Trage erreichte und maximale Punkte ein.',
  formula: 'Prozent = erreichte Punkte / maximale Punkte × 100; Note nach gewaehltem Schluessel',
  inputs: [
    { type: 'number', id: 'erreicht', label: 'Erreichte Punkte', default: 38, min: 0, step: 0.5 },
    { type: 'number', id: 'maximal', label: 'Maximale Punkte', default: 50, min: 1, step: 0.5 },
    {
      type: 'select',
      id: 'schluessel',
      label: 'Notenschluessel',
      default: 'ihk',
      options: [
        { value: 'ihk', label: 'IHK-Schluessel (6 Stufen)' },
        { value: 'linear', label: 'Linear (100 % = 1,0 / 0 % = 6,0)' },
      ],
    },
  ],
  compute: (v) => {
    const erreicht = num(v.erreicht);
    const maximal = num(v.maximal);
    const prozent = maximal > 0 ? (erreicht / maximal) * 100 : 0;
    const p = Math.max(0, Math.min(100, prozent));
    const schluessel = String(v.schluessel);

    let note = 6;
    let text = 'ungenuegend';
    if (schluessel === 'linear') {
      // Linear: 100 % -> 1,0 ; 0 % -> 6,0
      note = 6 - (p / 100) * 5;
      if (note < 1) note = 1;
    } else {
      // IHK-Notenschluessel (Standardgrenzen der IHK-Abschlusspruefungen)
      if (p >= 92) note = 1;
      else if (p >= 81) note = 2;
      else if (p >= 67) note = 3;
      else if (p >= 50) note = 4;
      else if (p >= 30) note = 5;
      else note = 6;
    }
    const noteGerundet = Math.round(note * 10) / 10;
    if (noteGerundet <= 1.5) text = 'sehr gut';
    else if (noteGerundet <= 2.5) text = 'gut';
    else if (noteGerundet <= 3.5) text = 'befriedigend';
    else if (noteGerundet <= 4.5) text = 'ausreichend';
    else if (noteGerundet <= 5.5) text = 'mangelhaft';
    else text = 'ungenuegend';

    return [
      { label: 'Note', value: noteGerundet, digits: 1, primary: true },
      { label: 'Bewertung', value: text },
      { label: 'Erreichte Prozent', value: prozent, digits: 1, unit: '%' },
      { label: 'Bestanden (ab 50 %)', value: p >= 50 ? 'ja' : 'nein' },
    ];
  },
  howto: [
    'Erreichte Punkte der Pruefung eintragen.',
    'Maximal moegliche Punkte eintragen.',
    'Notenschluessel waehlen: IHK-Stufen oder linear.',
    'Note, Bewertung und Prozentwert ablesen.',
  ],
  faq: [
    { q: 'Wie funktioniert der IHK-Notenschluessel?', a: 'Die IHK staffelt in sechs Stufen: ab 92 % sehr gut (1), ab 81 % gut (2), ab 67 % befriedigend (3), ab 50 % ausreichend (4), ab 30 % mangelhaft (5), darunter ungenuegend (6).' },
    { q: 'Ab wie viel Prozent habe ich bestanden?', a: 'Nach dem IHK-Schluessel gilt eine Pruefung in der Regel ab 50 % als bestanden (Note 4). Einzelne Pruefungsordnungen koennen abweichende Grenzen festlegen.' },
    { q: 'Worin unterscheidet sich der lineare Schluessel?', a: 'Beim linearen Schluessel wird die Note gleichmaessig verteilt: 100 % ergeben 1,0 und 0 % ergeben 6,0. Er ist mathematisch einfach, wird aber seltener fuer offizielle Pruefungen verwendet.' },
    { q: 'Sind die IHK-Grenzen ueberall gleich?', a: 'Die genannten Grenzen sind der gaengige IHK-Standard (Stand 2026). Berufsschulen oder einzelne Pruefungsausschuesse koennen eigene Schluessel nutzen – pruefe im Zweifel deine Pruefungsordnung.' },
  ],
  related: ['notendurchschnitt-rechner', 'notenpunkte-umrechnung', 'abi-durchschnitt-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { erreicht: 46, maximal: 50, schluessel: 'ihk' },
      expect: [
        { label: 'Note', value: 1, tolerance: 0.001 },
        { label: 'Erreichte Prozent', value: 92, tolerance: 0.01 },
      ],
    },
    {
      values: { erreicht: 25, maximal: 50, schluessel: 'linear' },
      expect: [{ label: 'Note', value: 3.5, tolerance: 0.01 }],
    },
  ],
};
