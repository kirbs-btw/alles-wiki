import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'abi-durchschnitt-rechner',
  category: 'bildung',
  title: 'Abi-Durchschnitt: Punkte in Note umrechnen',
  shortTitle: 'Abi-Punkte in Note',
  description:
    'Rechne deine Abitur-Gesamtpunktzahl in die Durchschnittsnote um – nach der bundesweit einheitlichen KMK-Tabelle fuer maximal 900 Punkte.',
  keywords: [
    'abi durchschnitt berechnen',
    'abitur punkte in note',
    'abiturnote rechner',
    'abi note umrechnen',
    'gesamtpunktzahl abitur',
    'abitur schnitt',
    'durchschnittsnote abitur',
  ],
  intro:
    'Im deutschen Abitur werden in der Qualifikationsphase und den Pruefungen Punkte gesammelt. Aus der Gesamtpunktzahl (maximal 900) entsteht die Durchschnittsnote ueber eine bundesweit einheitliche Tabelle der Kultusministerkonferenz. Die beste Note 1,0 erreicht man ab 823 Punkten, die Bestehensgrenze liegt bei 300 Punkten (Note 4,0). Je 18 Punkte verbessert sich die Note um 0,1.',
  formula: 'Note = 17/3 − Punkte/180, in 18-Punkte-Stufen auf 0,1 gerundet; ab 823 Punkten 1,0',
  inputs: [
    { type: 'number', id: 'punkte', label: 'Gesamtpunktzahl', unit: 'Punkte', default: 600, min: 300, max: 900, step: 1, help: 'Bestehensgrenze 300, Maximum 900 Punkte.' },
  ],
  compute: (v) => {
    const p = Math.round(num(v.punkte));
    let note: number;
    let bestanden = 'ja';
    if (p < 300) {
      note = 0;
      bestanden = 'nein';
    } else if (p === 300) {
      note = 4.0;
    } else if (p >= 823) {
      note = 1.0;
    } else {
      // Bundeseinheitliche KMK-Tabelle: 300 = 4,0; je 18 Punkte 0,1 besser.
      // 301..318 = 3,9 ; danach in 18er-Schritten herunter bis 1,0 (ab 823).
      const stufen = Math.floor((p - 301) / 18); // 0 fuer 301..318
      note = 3.9 - stufen * 0.1;
      if (note < 1.0) note = 1.0;
    }
    const noteGerundet = Math.round(note * 10) / 10;
    let bewertung = '–';
    if (bestanden === 'ja') {
      if (noteGerundet <= 1.5) bewertung = 'sehr gut';
      else if (noteGerundet <= 2.5) bewertung = 'gut';
      else if (noteGerundet <= 3.5) bewertung = 'befriedigend';
      else bewertung = 'ausreichend';
    }
    return [
      { label: 'Abitur-Durchschnittsnote', value: bestanden === 'ja' ? noteGerundet : 0, digits: 1, primary: true },
      { label: 'Bewertung', value: bewertung },
      { label: 'Bestanden', value: bestanden },
      { label: 'Erreichte Punkte', value: p, digits: 0, unit: 'von 900' },
    ];
  },
  howto: [
    'Deine Gesamtpunktzahl aus dem Abiturzeugnis ablesen (maximal 900).',
    'Die Punktzahl in das Feld eintragen.',
    'Die Durchschnittsnote auf einer Nachkommastelle ablesen.',
    'Bewertung und Bestehensstatus pruefen.',
  ],
  faq: [
    { q: 'Wie viele Punkte brauche ich fuer ein 1,0-Abitur?', a: 'Ab 823 von 900 Punkten ergibt die KMK-Tabelle die Bestnote 1,0. Hoehere Punktzahlen bleiben bei 1,0.' },
    { q: 'Wie viele Punkte braucht man zum Bestehen?', a: 'Mindestens 300 Punkte sind noetig, das entspricht der Note 4,0. Darunter gilt das Abitur als nicht bestanden.' },
    { q: 'Gilt die Umrechnung in allen Bundeslaendern?', a: 'Ja, die Umrechnung von der Gesamtpunktzahl in die Durchschnittsnote ist durch die Kultusministerkonferenz (KMK) bundesweit einheitlich geregelt. Je 18 Punkte verbessert sich die Note um 0,1.' },
    { q: 'Warum entspricht 660 Punkte genau 2,0?', a: 'Die Tabelle ist linear: 300 Punkte ergeben 4,0, je 18 zusaetzliche Punkte 0,1 besser. 660 Punkte liegen damit exakt bei der Note 2,0. Stand 2026 ist die Tabelle unveraendert.' },
  ],
  related: ['notenpunkte-umrechnung', 'notendurchschnitt-rechner', 'prozent-in-note-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { punkte: 660 },
      expect: [{ label: 'Abitur-Durchschnittsnote', value: 2, tolerance: 0.001 }],
    },
    {
      values: { punkte: 600 },
      expect: [{ label: 'Abitur-Durchschnittsnote', value: 2.3, tolerance: 0.001 }],
    },
  ],
};
