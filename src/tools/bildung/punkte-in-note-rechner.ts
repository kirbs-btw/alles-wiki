import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'punkte-in-note-rechner',
  category: 'bildung',
  title: 'Punkte in Note umrechnen (linearer Schluessel)',
  shortTitle: 'Punkte in Note',
  description:
    'Rechne erreichte Punkte einer Klassenarbeit linear in eine Schulnote von 1 bis 6 um – mit waehlbarer Bestehensgrenze.',
  keywords: [
    'punkte in note umrechnen',
    'klassenarbeit punkte note',
    'note aus punkten berechnen',
    'linearer notenschluessel',
    'punkte note rechner',
    'klausur note berechnen',
  ],
  intro:
    'Bei Klassenarbeiten werden Punkte oft linear in Schulnoten umgerechnet: Die volle Punktzahl ergibt die Note 1,0, null Punkte die Note 6,0. Das Tool verteilt die Noten gleichmaessig ueber die Spanne und zeigt zusaetzlich den erreichten Prozentwert. Die genaue Skala kann je nach Lehrkraft abweichen.',
  formula: 'Note = 1 + (1 - erreichte/maximale Punkte) × 5',
  inputs: [
    { type: 'number', id: 'erreicht', label: 'Erreichte Punkte', default: 36, min: 0, step: 0.5 },
    { type: 'number', id: 'maximal', label: 'Maximale Punkte', default: 48, min: 1, step: 0.5 },
  ],
  compute: (v) => {
    const erreicht = num(v.erreicht);
    const maximal = num(v.maximal);
    const anteil = maximal > 0 ? Math.max(0, Math.min(1, erreicht / maximal)) : 0;
    const prozent = anteil * 100;
    const note = 1 + (1 - anteil) * 5;
    const noteGerundet = Math.round(note * 10) / 10;
    let text = 'ungenuegend';
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
    ];
  },
  howto: [
    'Erreichte Punkte der Arbeit eintragen.',
    'Maximal moegliche Punkte eintragen.',
    'Note, Bewertung und Prozentwert ablesen.',
  ],
  faq: [
    { q: 'Wie wird linear umgerechnet?', a: 'Die volle Punktzahl ergibt Note 1,0, null Punkte Note 6,0. Dazwischen wird gleichmaessig verteilt: Jeder Prozentpunkt entspricht 0,05 Notenpunkten.' },
    { q: 'Ist der lineare Schluessel der einzige?', a: 'Nein. Viele Schulen nutzen einen geknickten Schluessel mit hoeheren Punkthuerden im oberen Bereich. Der lineare Schluessel ist eine gute erste Naeherung.' },
    { q: 'Ab wann ist es eine 4?', a: 'Bei linearer Umrechnung liegt die Grenze zur 4,5 (gerade noch ausreichend) bei rund 30 % der Punkte. Die genaue Bestehensgrenze legt deine Schule fest.' },
  ],
  related: ['prozent-in-note-rechner', 'notendurchschnitt-rechner', 'benoetigte-note-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { erreicht: 36, maximal: 48 },
      expect: [
        { label: 'Note', value: 2.3, tolerance: 0.05 },
        { label: 'Erreichte Prozent', value: 75, tolerance: 0.1 },
      ],
    },
    {
      values: { erreicht: 48, maximal: 48 },
      expect: [{ label: 'Note', value: 1, tolerance: 0.01 }],
    },
  ],
};
