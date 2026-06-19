import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'klausurenschnitt-prognose-rechner',
  category: 'bildung',
  title: 'Klausurenschnitt-Prognose fuer das Semester',
  shortTitle: 'Schnitt-Prognose',
  description:
    'Prognostiziere deinen Endschnitt aus bereits geschriebenen Klausuren und einer erwarteten Note fuer die noch ausstehenden Klausuren.',
  keywords: [
    'klausurenschnitt prognose',
    'notenschnitt vorhersagen',
    'endschnitt berechnen',
    'durchschnitt prognose rechner',
    'noten hochrechnen semester',
    'erwarteter notenschnitt',
  ],
  intro:
    'Du hast schon einige Klausuren geschrieben und willst wissen, wo du am Ende landest? Dieses Tool bildet den gewichteten Mittelwert aus deinem bisherigen Schnitt (ueber die bereits gewerteten Klausuren) und einer erwarteten Note fuer die noch ausstehenden Klausuren. So siehst du deinen voraussichtlichen Endschnitt – ein Planungswert, der mit jeder neuen Note praeziser wird. Spiele mit der erwarteten Note, um Best- und Worst-Case zu vergleichen.',
  formula: 'Endschnitt = (Schnitt_bisher × Anzahl_bisher + Note_erwartet × Anzahl_offen) / (Anzahl_bisher + Anzahl_offen)',
  inputs: [
    { type: 'number', id: 'schnittBisher', label: 'Bisheriger Schnitt', default: 2.3, min: 1, max: 6, step: 0.1, help: 'Durchschnitt der bereits geschriebenen Klausuren.' },
    { type: 'number', id: 'anzahlBisher', label: 'Anzahl geschriebener Klausuren', default: 3, min: 0, step: 1 },
    { type: 'number', id: 'noteErwartet', label: 'Erwartete Note offene Klausuren', default: 2, min: 1, max: 6, step: 0.1 },
    { type: 'number', id: 'anzahlOffen', label: 'Anzahl offener Klausuren', default: 2, min: 0, step: 1 },
  ],
  compute: (v) => {
    const schnittBisher = num(v.schnittBisher);
    const anzahlBisher = num(v.anzahlBisher);
    const noteErwartet = num(v.noteErwartet);
    const anzahlOffen = num(v.anzahlOffen);
    const gesamt = anzahlBisher + anzahlOffen;
    const endschnitt =
      gesamt > 0
        ? (schnittBisher * anzahlBisher + noteErwartet * anzahlOffen) / gesamt
        : 0;
    return [
      { label: 'Voraussichtlicher Endschnitt', value: endschnitt, digits: 2, primary: true },
      { label: 'Klausuren insgesamt', value: gesamt, digits: 0 },
      { label: 'Anteil bereits gewertet', value: gesamt > 0 ? (anzahlBisher / gesamt) * 100 : 0, digits: 0, unit: '%' },
      { label: 'Beitrag offener Klausuren', value: gesamt > 0 ? (noteErwartet * anzahlOffen) / gesamt : 0, digits: 2 },
    ];
  },
  howto: [
    'Deinen bisherigen Schnitt aus den geschriebenen Klausuren eintragen.',
    'Anzahl der bereits geschriebenen Klausuren angeben.',
    'Erwartete Note fuer die noch ausstehenden Klausuren schaetzen.',
    'Anzahl der offenen Klausuren eintragen und den prognostizierten Endschnitt ablesen.',
  ],
  faq: [
    { q: 'Wie wird der Endschnitt prognostiziert?', a: 'Das Tool bildet den gewichteten Mittelwert aus deinem bisherigen Schnitt (gewichtet mit der Anzahl gewerteter Klausuren) und der erwarteten Note der offenen Klausuren (gewichtet mit deren Anzahl).' },
    { q: 'Was, wenn Klausuren unterschiedlich zaehlen?', a: 'Dieses Tool nimmt gleiche Gewichtung pro Klausur an. Zaehlt eine Klausur doppelt, kannst du sie als zwei Klausuren eintragen, um die Gewichtung nachzubilden.' },
    { q: 'Wie verlaesslich ist die Prognose?', a: 'Sie ist nur so gut wie deine Schaetzung der erwarteten Note. Probiere verschiedene Werte fuer Best- und Worst-Case aus – mit jeder echten Note wird die Vorhersage genauer.' },
    { q: 'Gilt das auch fuer Punktesysteme?', a: 'Das Prinzip ist gleich, du musst aber konsistent rechnen. Trage entweder durchgaengig Notenwerte oder durchgaengig Punktwerte ein, nicht gemischt.' },
  ],
  related: ['notendurchschnitt-rechner', 'benoetigte-note-rechner', 'zeugnisdurchschnitt-rechner'],
  updated: '2026-06-19',
  examples: [
    {
      values: { schnittBisher: 2.3, anzahlBisher: 3, noteErwartet: 2, anzahlOffen: 2 },
      expect: [
        { label: 'Voraussichtlicher Endschnitt', value: 2.18, tolerance: 0.01 },
        { label: 'Klausuren insgesamt', value: 5, tolerance: 0 },
        { label: 'Anteil bereits gewertet', value: 60, tolerance: 0.5 },
      ],
    },
    {
      values: { schnittBisher: 1.5, anzahlBisher: 2, noteErwartet: 2.5, anzahlOffen: 2 },
      expect: [{ label: 'Voraussichtlicher Endschnitt', value: 2, tolerance: 0.01 }],
    },
  ],
};
