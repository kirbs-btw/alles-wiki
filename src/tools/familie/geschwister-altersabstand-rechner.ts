import type { Tool } from '../../lib/types';
import { daysBetween, diffYMD } from '../../lib/types';

// Geschwister-Altersabstand: Differenz zwischen zwei Geburtsdaten in Jahren, Monaten,
// Tagen sowie als Gesamtmonate und -tage. Rein kalendarisch, deterministisch über
// zwei date-Inputs. Reihenfolge der Daten egal (Betrag).

export const tool: Tool = {
  slug: 'geschwister-altersabstand-rechner',
  category: 'familie',
  title: 'Geschwister-Altersabstand-Rechner',
  shortTitle: 'Altersabstand',
  description:
    'Berechne den Altersabstand zwischen zwei Geschwistern aus ihren Geburtsdaten – in Jahren, Monaten und Tagen sowie als Gesamtmonate und -tage.',
  keywords: [
    'altersabstand geschwister',
    'altersunterschied berechnen',
    'geschwister altersabstand rechner',
    'abstand zwischen geburten',
    'altersdifferenz kinder',
  ],
  intro:
    'Wie groß ist der Altersabstand zwischen zwei Geschwistern? Dieser Rechner ermittelt die genaue Differenz zwischen zwei Geburtsdaten – aufgeschlüsselt in Jahre, Monate und Tage und zusätzlich als Gesamtzahl an Monaten und Tagen. Die Reihenfolge der eingegebenen Daten spielt keine Rolle.',
  formula:
    'Abstand = |Geburtsdatum 2 − Geburtsdatum 1| (in Jahren, Monaten, Tagen)',
  inputs: [
    { type: 'date', id: 'kind1', label: 'Geburtsdatum 1. Kind', default: '2019-04-10' },
    { type: 'date', id: 'kind2', label: 'Geburtsdatum 2. Kind', default: '2021-09-25' },
  ],
  compute: (v) => {
    const d1 = String(v.kind1);
    const d2 = String(v.kind2);
    const { years, months, days } = diffYMD(d1, d2);
    const tage = Math.abs(daysBetween(d1, d2));
    return [
      { label: 'Altersabstand (Jahre)', value: years, unit: 'Jahre', digits: 0, primary: true },
      { label: 'Genau', value: `${years} Jahre, ${months} Monate, ${days} Tage` },
      { label: 'Abstand in Monaten', value: years * 12 + months, unit: 'Monate', digits: 0 },
      { label: 'Abstand in Tagen', value: tage, unit: 'Tage', digits: 0 },
    ];
  },
  howto: [
    'Geburtsdatum des ersten Kindes eintragen.',
    'Geburtsdatum des zweiten Kindes eintragen.',
    'Den Altersabstand in Jahren, Monaten und Tagen sowie die Gesamtmonate ablesen.',
  ],
  faq: [
    { q: 'Spielt die Reihenfolge der Daten eine Rolle?', a: 'Nein. Der Rechner ermittelt immer den Betrag der Differenz, unabhängig davon, welches Geburtsdatum zuerst eingetragen wird.' },
    { q: 'Sind Schaltjahre berücksichtigt?', a: 'Ja. Die Tage werden kalendergenau inklusive aller Schalttage berechnet.' },
    { q: 'Wie wird der Abstand in Monaten berechnet?', a: 'Aus den vollen Jahren mal zwölf plus den zusätzlichen vollen Monaten. Angefangene Monate (die Resttage) zählen nicht mit.' },
  ],
  related: ['alter-rechner', 'geburtstermin-rechner', 'schwangerschaftswoche-rechner'],
  examples: [
    {
      values: { kind1: '2019-04-10', kind2: '2021-09-25' },
      expect: [
        { label: 'Altersabstand (Jahre)', value: 2, tolerance: 0 },
        { label: 'Abstand in Monaten', value: 29, tolerance: 0 },
        { label: 'Abstand in Tagen', value: 899, tolerance: 0 },
      ],
    },
    {
      values: { kind1: '2020-01-01', kind2: '2020-12-31' },
      expect: [{ label: 'Abstand in Tagen', value: 365, tolerance: 0 }],
    },
  ],
  updated: '2026-06-19',
};
