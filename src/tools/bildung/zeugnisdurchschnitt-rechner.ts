import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'zeugnisdurchschnitt-rechner',
  category: 'bildung',
  title: 'Zeugnisdurchschnitt berechnen',
  shortTitle: 'Zeugnisschnitt',
  description:
    'Berechne deinen Zeugnisdurchschnitt als einfachen Mittelwert aus bis zu zehn Faechernoten – ideal fuer Halbjahres- und Abschlusszeugnisse.',
  keywords: [
    'zeugnisdurchschnitt berechnen',
    'zeugnis schnitt rechner',
    'durchschnitt zeugnis',
    'faecher durchschnitt',
    'zeugnisnote mittelwert',
    'halbjahreszeugnis durchschnitt',
  ],
  intro:
    'Der Zeugnisdurchschnitt ist der einfache Mittelwert aller Faechernoten: Alle Noten werden summiert und durch ihre Anzahl geteilt. Trage je Fach eine Note auf der Skala 1 bis 6 ein; nicht benoetigte Felder lasst du auf 0. Das Tool zaehlt nur Faecher mit einer eingetragenen Note.',
  formula: 'Durchschnitt = Summe der Noten / Anzahl der Faecher',
  inputs: [
    { type: 'number', id: 'f1', label: 'Note Fach 1', default: 2, min: 1, max: 6, step: 0.5 },
    { type: 'number', id: 'f2', label: 'Note Fach 2', default: 3, min: 1, max: 6, step: 0.5 },
    { type: 'number', id: 'f3', label: 'Note Fach 3', default: 1, min: 1, max: 6, step: 0.5 },
    { type: 'number', id: 'f4', label: 'Note Fach 4', default: 2, min: 0, max: 6, step: 0.5, help: 'Note bei 0 lassen, wenn das Fach nicht zaehlt.' },
    { type: 'number', id: 'f5', label: 'Note Fach 5', default: 0, min: 0, max: 6, step: 0.5 },
    { type: 'number', id: 'f6', label: 'Note Fach 6', default: 0, min: 0, max: 6, step: 0.5 },
    { type: 'number', id: 'f7', label: 'Note Fach 7', default: 0, min: 0, max: 6, step: 0.5 },
    { type: 'number', id: 'f8', label: 'Note Fach 8', default: 0, min: 0, max: 6, step: 0.5 },
    { type: 'number', id: 'f9', label: 'Note Fach 9', default: 0, min: 0, max: 6, step: 0.5 },
    { type: 'number', id: 'f10', label: 'Note Fach 10', default: 0, min: 0, max: 6, step: 0.5 },
  ],
  compute: (v) => {
    const noten = [
      num(v.f1), num(v.f2), num(v.f3), num(v.f4), num(v.f5),
      num(v.f6), num(v.f7), num(v.f8), num(v.f9), num(v.f10),
    ].filter((n) => n > 0);
    const anzahl = noten.length;
    const summe = noten.reduce((a, b) => a + b, 0);
    const schnitt = anzahl > 0 ? summe / anzahl : 0;
    let bewertung = '–';
    if (schnitt > 0) {
      if (schnitt <= 1.5) bewertung = 'sehr gut';
      else if (schnitt <= 2.5) bewertung = 'gut';
      else if (schnitt <= 3.5) bewertung = 'befriedigend';
      else if (schnitt <= 4.5) bewertung = 'ausreichend';
      else bewertung = 'mangelhaft';
    }
    return [
      { label: 'Zeugnisdurchschnitt', value: schnitt, digits: 2, primary: true },
      { label: 'Bewertung', value: bewertung },
      { label: 'Anzahl Faecher', value: anzahl, digits: 0 },
    ];
  },
  howto: [
    'Fuer jedes Fach die Note auf der Skala 1 bis 6 eintragen.',
    'Nicht relevante Faecher auf 0 lassen.',
    'Zeugnisdurchschnitt und Bewertung ablesen.',
  ],
  faq: [
    { q: 'Ist der Zeugnisschnitt ein einfacher Mittelwert?', a: 'Ja, hier werden alle Faecher gleich gewichtet. Manche Schulen gewichten Haupt- oder Profilfaecher staerker – nutze dafuer den gewichteten Notendurchschnitt.' },
    { q: 'Wie viele Faecher kann ich eintragen?', a: 'Bis zu zehn. Faecher mit Note 0 werden uebersprungen und nicht in den Durchschnitt eingerechnet.' },
    { q: 'Welche Note ist welcher Bewertung zugeordnet?', a: 'Ueblich: bis 1,5 sehr gut, bis 2,5 gut, bis 3,5 befriedigend, bis 4,5 ausreichend, darueber mangelhaft. Grenzen koennen je Schule leicht abweichen.' },
  ],
  related: ['notendurchschnitt-rechner', 'abi-durchschnitt-rechner', 'examensnote-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { f1: 2, f2: 3, f3: 1, f4: 2, f5: 0, f6: 0, f7: 0, f8: 0, f9: 0, f10: 0 },
      expect: [
        { label: 'Zeugnisdurchschnitt', value: 2, tolerance: 0.01 },
        { label: 'Anzahl Faecher', value: 4, tolerance: 0.01 },
      ],
    },
  ],
};
