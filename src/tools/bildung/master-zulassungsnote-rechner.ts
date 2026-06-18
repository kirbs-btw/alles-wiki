import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'master-zulassungsnote-rechner',
  category: 'bildung',
  title: 'Master-Zulassungsnote pruefen',
  shortTitle: 'Master-Zulassung',
  description:
    'Pruefe, ob deine Bachelornote die geforderte Zulassungsnote fuer den Master erfuellt – mit Abstand zur Grenze und in Notenpunkten.',
  keywords: [
    'master zulassungsnote',
    'master nc bachelor',
    'zulassung master note',
    'bachelornote master voraussetzung',
    'master bewerbung note',
    'notenschnitt master',
  ],
  intro:
    'Viele Master-Studiengaenge verlangen eine Mindest-Bachelornote, etwa 2,5 oder besser. Da kleinere Zahlen bessere Noten bedeuten, gilt: Deine Note muss kleiner oder gleich der Grenze sein. Das Tool prueft das und zeigt den Abstand zur Grenze. Die jeweils geltende Grenze steht in der Zulassungsordnung des Studiengangs.',
  formula: 'Erfuellt, wenn Bachelornote <= geforderte Grenznote',
  inputs: [
    { type: 'number', id: 'note', label: 'Deine Bachelornote', default: 2.4, min: 1, max: 4, step: 0.1 },
    { type: 'number', id: 'grenze', label: 'Geforderte Mindestnote', default: 2.5, min: 1, max: 4, step: 0.1, help: 'Note, die mindestens erreicht sein muss (kleiner = besser).' },
  ],
  compute: (v) => {
    const note = num(v.note);
    const grenze = num(v.grenze);
    const erfuellt = note <= grenze;
    const abstand = grenze - note;
    return [
      { label: 'Zulassung erfuellt', value: erfuellt ? 'ja' : 'nein', primary: true },
      { label: 'Abstand zur Grenze', value: Math.abs(abstand), digits: 2, help: erfuellt ? 'Spielraum besser als die Grenze' : 'um diesen Wert zu schwach' },
      { label: 'Deine Note', value: note, digits: 1 },
    ];
  },
  howto: [
    'Deine Bachelor-Gesamtnote eintragen.',
    'Die in der Zulassungsordnung geforderte Mindestnote eintragen.',
    'Ergebnis ablesen: erfuellt oder nicht, samt Abstand zur Grenze.',
  ],
  faq: [
    { q: 'Bedeutet kleinere Note besser?', a: 'Ja. Auf der deutschen Skala ist 1,0 die beste und 4,0 die schlechteste bestandene Note. Deine Note muss daher kleiner oder gleich der geforderten Grenze sein.' },
    { q: 'Was, wenn ich die Grenze knapp verfehle?', a: 'Manche Hochschulen lassen Bewerber mit einem Eignungsgespraech, einem Test oder unter Auflagen dennoch zu. Pruefe die Zulassungsordnung des Studiengangs.' },
    { q: 'Gilt ueberall dieselbe Grenze?', a: 'Nein, die geforderte Mindestnote unterscheidet sich je nach Hochschule und Studiengang stark. Maszgeblich ist immer die offizielle Zulassungs- oder Pruefungsordnung.' },
  ],
  related: ['bachelor-gesamtnote-rechner', 'wartesemester-punkte-rechner', 'notendurchschnitt-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { note: 2.4, grenze: 2.5 },
      expect: [{ label: 'Abstand zur Grenze', value: 0.1, tolerance: 0.01 }],
    },
    {
      values: { note: 2.8, grenze: 2.5 },
      expect: [{ label: 'Abstand zur Grenze', value: 0.3, tolerance: 0.01 }],
    },
  ],
};
