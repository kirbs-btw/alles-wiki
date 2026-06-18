import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'credit-points-fortschritt-rechner',
  category: 'bildung',
  title: 'ECTS-Fortschritt und Regelstudienzeit pruefen',
  shortTitle: 'ECTS-Fortschritt',
  description:
    'Sieh, wie viel Prozent deines Studiums du an ECTS bereits geschafft hast und wie viele Credits pro Semester noch noetig sind.',
  keywords: [
    'ects fortschritt berechnen',
    'credit points studium',
    'ects pro semester noetig',
    'studienfortschritt rechner',
    'regelstudienzeit ects',
    'wie viele credits noch',
  ],
  intro:
    'Ein Studiengang verlangt eine feste Gesamtzahl an Credit Points (ECTS), etwa 180 fuer einen Bachelor. Das Tool zeigt deinen Fortschritt in Prozent und rechnet aus, wie viele Credits du in den verbleibenden Semestern noch sammeln musst, um in der Regelstudienzeit fertig zu werden.',
  formula: 'Fortschritt = erreichte ECTS / Gesamt-ECTS × 100; Bedarf je Semester = Rest-ECTS / Restsemester',
  inputs: [
    { type: 'number', id: 'gesamt', label: 'ECTS gesamt im Studiengang', unit: 'ECTS', default: 180, min: 1, step: 1 },
    { type: 'number', id: 'erreicht', label: 'Bereits erreichte ECTS', unit: 'ECTS', default: 90, min: 0, step: 1 },
    { type: 'number', id: 'restsemester', label: 'Verbleibende Semester', default: 3, min: 0, step: 1, help: 'Bis zum Ende der Regelstudienzeit.' },
  ],
  compute: (v) => {
    const gesamt = num(v.gesamt);
    const erreicht = Math.min(num(v.erreicht), gesamt);
    const restsemester = num(v.restsemester);
    const rest = Math.max(0, gesamt - erreicht);
    const fortschritt = gesamt > 0 ? (erreicht / gesamt) * 100 : 0;
    const proSemester = restsemester > 0 ? rest / restsemester : 0;
    return [
      { label: 'Fortschritt', value: fortschritt, digits: 1, unit: '%', primary: true },
      { label: 'Noch fehlende ECTS', value: rest, digits: 0, unit: 'ECTS' },
      { label: 'ECTS pro Semester noetig', value: proSemester, digits: 1, unit: 'ECTS' },
    ];
  },
  howto: [
    'Gesamtzahl der ECTS im Studiengang eintragen.',
    'Bereits bestandene Credits eintragen.',
    'Verbleibende Semester bis Studienende angeben.',
    'Fortschritt und noetiges Pensum je Semester ablesen.',
  ],
  faq: [
    { q: 'Wie viele ECTS hat ein Bachelor?', a: 'Ein Bachelorstudium umfasst ueblicherweise 180 ECTS, ein Master 120 ECTS. Ein Credit Point entspricht rund 25 bis 30 Stunden Arbeitsaufwand.' },
    { q: 'Wie viele Credits sind pro Semester normal?', a: 'Der Richtwert sind 30 ECTS pro Semester. Bleibst du darunter, verlaengert sich das Studium ueber die Regelstudienzeit hinaus.' },
    { q: 'Was bedeutet die Regelstudienzeit?', a: 'Die Regelstudienzeit ist die vorgesehene Dauer des Studiums. Sie ist u. a. fuer den BAfoeG-Anspruch relevant, kann aber individuell ueberschritten werden.' },
  ],
  related: ['ects-noten-rechner', 'bachelor-gesamtnote-rechner', 'studienkosten-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { gesamt: 180, erreicht: 90, restsemester: 3 },
      expect: [
        { label: 'Fortschritt', value: 50, tolerance: 0.1 },
        { label: 'ECTS pro Semester noetig', value: 30, tolerance: 0.1 },
      ],
    },
  ],
};
