import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'notendurchschnitt-rechner',
  category: 'bildung',
  title: 'Notendurchschnitt-Rechner (gewichtet)',
  shortTitle: 'Notendurchschnitt',
  description:
    'Berechne deinen gewichteten Notendurchschnitt aus bis zu sechs Noten und ihren Gewichtungen – ideal fuer Zeugnis, Klausuren und Schulnoten.',
  keywords: [
    'notendurchschnitt berechnen',
    'gewichteter durchschnitt noten',
    'noten schnitt rechner',
    'zeugnisnote berechnen',
    'durchschnittsnote',
    'klausur durchschnitt',
    'schulnoten mittelwert',
  ],
  intro:
    'Der gewichtete Notendurchschnitt zaehlt jede Note entsprechend ihrer Bedeutung, etwa Klausur doppelt und muendliche Note einfach. Das Tool multipliziert jede Note mit ihrer Gewichtung, summiert beides und teilt die gewichtete Summe durch die Summe der Gewichte. Trage nur die Noten ein, die du wirklich hast – eine Gewichtung von 0 schliesst eine Note aus.',
  formula: 'Durchschnitt = Summe(Note × Gewicht) / Summe(Gewicht)',
  inputs: [
    { type: 'number', id: 'n1', label: 'Note 1', default: 2, min: 1, max: 6, step: 0.1 },
    { type: 'number', id: 'g1', label: 'Gewicht Note 1', default: 2, min: 0, step: 0.5 },
    { type: 'number', id: 'n2', label: 'Note 2', default: 3, min: 1, max: 6, step: 0.1 },
    { type: 'number', id: 'g2', label: 'Gewicht Note 2', default: 1, min: 0, step: 0.5 },
    { type: 'number', id: 'n3', label: 'Note 3', default: 1, min: 1, max: 6, step: 0.1 },
    { type: 'number', id: 'g3', label: 'Gewicht Note 3', default: 1, min: 0, step: 0.5 },
    { type: 'number', id: 'n4', label: 'Note 4', default: 0, min: 0, max: 6, step: 0.1, help: 'Note bei 0 lassen, wenn nicht vorhanden.' },
    { type: 'number', id: 'g4', label: 'Gewicht Note 4', default: 0, min: 0, step: 0.5 },
    { type: 'number', id: 'n5', label: 'Note 5', default: 0, min: 0, max: 6, step: 0.1 },
    { type: 'number', id: 'g5', label: 'Gewicht Note 5', default: 0, min: 0, step: 0.5 },
    { type: 'number', id: 'n6', label: 'Note 6', default: 0, min: 0, max: 6, step: 0.1 },
    { type: 'number', id: 'g6', label: 'Gewicht Note 6', default: 0, min: 0, step: 0.5 },
  ],
  compute: (v) => {
    const paare = [
      [num(v.n1), num(v.g1)],
      [num(v.n2), num(v.g2)],
      [num(v.n3), num(v.g3)],
      [num(v.n4), num(v.g4)],
      [num(v.n5), num(v.g5)],
      [num(v.n6), num(v.g6)],
    ];
    let summeGewichtet = 0;
    let summeGewichte = 0;
    let anzahl = 0;
    for (const [note, gewicht] of paare) {
      if (gewicht > 0 && note > 0) {
        summeGewichtet += note * gewicht;
        summeGewichte += gewicht;
        anzahl += 1;
      }
    }
    const schnitt = summeGewichte > 0 ? summeGewichtet / summeGewichte : 0;
    let bewertung = 'ausreichend';
    if (schnitt > 0 && schnitt <= 1.5) bewertung = 'sehr gut';
    else if (schnitt <= 2.5) bewertung = 'gut';
    else if (schnitt <= 3.5) bewertung = 'befriedigend';
    else if (schnitt <= 4.5) bewertung = 'ausreichend';
    else bewertung = 'mangelhaft';
    return [
      { label: 'Notendurchschnitt', value: schnitt, digits: 2, primary: true },
      { label: 'Bewertung', value: schnitt > 0 ? bewertung : '–' },
      { label: 'Einbezogene Noten', value: anzahl, digits: 0 },
      { label: 'Summe der Gewichte', value: summeGewichte, digits: 1 },
    ];
  },
  howto: [
    'Jede Note auf der Skala 1 bis 6 eintragen (1 = sehr gut).',
    'Hinter jeder Note ihr Gewicht angeben, z. B. 2 fuer eine doppelt zaehlende Klausur.',
    'Nicht benoetigte Noten und Gewichte auf 0 lassen.',
    'Den gewichteten Notendurchschnitt und die Bewertung ablesen.',
  ],
  faq: [
    { q: 'Wie wird ein gewichteter Durchschnitt berechnet?', a: 'Jede Note wird mit ihrem Gewicht multipliziert. Die Summe dieser Produkte wird durch die Summe aller Gewichte geteilt. Eine doppelt zaehlende Note geht so doppelt in das Ergebnis ein.' },
    { q: 'Was bedeuten die Gewichte?', a: 'Das Gewicht sagt, wie stark eine Note zaehlt. Gewicht 1 ist eine einfache Note, Gewicht 2 zaehlt doppelt. Zaehlen alle Noten gleich, gib ueberall 1 ein – dann entsteht der einfache Mittelwert.' },
    { q: 'Wie schliesse ich eine Note aus?', a: 'Setze entweder die Note oder ihr Gewicht auf 0. Dann wird die Zeile nicht in die Berechnung einbezogen.' },
    { q: 'Welche Note entspricht welchem Durchschnitt?', a: 'Ueblich ist: bis 1,5 sehr gut, bis 2,5 gut, bis 3,5 befriedigend, bis 4,5 ausreichend, darueber mangelhaft. Schulen koennen leicht abweichende Grenzen verwenden.' },
  ],
  related: ['notenpunkte-umrechnung', 'abi-durchschnitt-rechner', 'prozent-in-note-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { n1: 2, g1: 2, n2: 3, g2: 1, n3: 1, g3: 1, n4: 0, g4: 0, n5: 0, g5: 0, n6: 0, g6: 0 },
      expect: [
        { label: 'Notendurchschnitt', value: 2, tolerance: 0.01 },
        { label: 'Summe der Gewichte', value: 4, tolerance: 0.01 },
      ],
    },
  ],
};
