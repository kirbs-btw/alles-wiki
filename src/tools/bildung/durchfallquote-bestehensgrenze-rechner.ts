import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'durchfallquote-bestehensgrenze-rechner',
  category: 'bildung',
  title: 'Bestehensgrenze und benoetigte Punkte berechnen',
  shortTitle: 'Bestehensgrenze',
  description:
    'Berechne, wie viele Punkte du fuer eine bestimmte Bestehensgrenze brauchst und wie viele Punkte dir noch fehlen.',
  keywords: [
    'bestehensgrenze berechnen',
    'wie viele punkte zum bestehen',
    'bestanden punkte rechner',
    'klausur bestehensgrenze',
    'mindestpunktzahl pruefung',
    'punkte zum bestehen',
  ],
  intro:
    'Eine Pruefung gilt ab einer festgelegten Mindestquote als bestanden, oft 50 % der erreichbaren Punkte. Das Tool rechnet aus der Maximalpunktzahl und der Bestehensgrenze die noetige Punktzahl aus und vergleicht sie mit deinem aktuellen oder geschaetzten Ergebnis. Die geltende Grenze steht in deiner Pruefungsordnung.',
  formula: 'Benoetigte Punkte = maximale Punkte × Grenze / 100',
  inputs: [
    { type: 'number', id: 'maximal', label: 'Maximale Punkte', default: 60, min: 1, step: 1 },
    { type: 'number', id: 'grenze', label: 'Bestehensgrenze', unit: '%', default: 50, min: 0, max: 100, step: 1 },
    { type: 'number', id: 'erreicht', label: 'Erreichte/erwartete Punkte', default: 28, min: 0, step: 0.5, help: 'Dein aktuelles oder geschaetztes Ergebnis.' },
  ],
  compute: (v) => {
    const maximal = num(v.maximal);
    const grenze = Math.max(0, Math.min(100, num(v.grenze)));
    const erreicht = num(v.erreicht);
    const noetig = (maximal * grenze) / 100;
    const fehlend = Math.max(0, noetig - erreicht);
    const bestanden = erreicht >= noetig;
    return [
      { label: 'Benoetigte Punkte', value: noetig, digits: 1, primary: true },
      { label: 'Status', value: bestanden ? 'bestanden' : 'nicht bestanden' },
      { label: 'Noch fehlende Punkte', value: fehlend, digits: 1 },
    ];
  },
  howto: [
    'Maximal erreichbare Punkte eintragen.',
    'Bestehensgrenze in Prozent eintragen (z. B. 50).',
    'Deine erreichten oder erwarteten Punkte angeben.',
    'Benoetigte Punktzahl, Status und fehlende Punkte ablesen.',
  ],
  faq: [
    { q: 'Ab wie viel Prozent ist eine Pruefung bestanden?', a: 'Haeufig ab 50 % der Punkte, aber das variiert: Manche Pruefungen verlangen 60 %, medizinische Staatsexamen teils weniger ueber eine Gleitklausel. Maszgeblich ist deine Pruefungsordnung.' },
    { q: 'Was ist eine Gleitklausel?', a: 'Eine Gleitklausel (Bestehensgrenze relativ zum Durchschnitt) senkt die Huerde, wenn der Jahrgangsschnitt niedrig ist. Dieses Tool nutzt eine feste Prozentgrenze.' },
    { q: 'Zaehlen halbe Punkte?', a: 'Das haengt von der Pruefung ab. Das Tool rechnet mit Dezimalstellen; ob deine Pruefung halbe Punkte vergibt, regelt die Korrekturvorgabe.' },
  ],
  related: ['punkte-in-note-rechner', 'prozent-in-note-rechner', 'benoetigte-note-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { maximal: 60, grenze: 50, erreicht: 28 },
      expect: [
        { label: 'Benoetigte Punkte', value: 30, tolerance: 0.01 },
        { label: 'Noch fehlende Punkte', value: 2, tolerance: 0.01 },
      ],
    },
    {
      values: { maximal: 100, grenze: 60, erreicht: 65 },
      expect: [{ label: 'Noch fehlende Punkte', value: 0, tolerance: 0.01 }],
    },
  ],
};
