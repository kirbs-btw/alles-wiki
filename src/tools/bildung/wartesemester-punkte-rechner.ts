import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'wartesemester-punkte-rechner',
  category: 'bildung',
  title: 'Wartesemester berechnen',
  shortTitle: 'Wartesemester',
  description:
    'Berechne deine Anzahl an Wartesemestern aus der Zeit seit dem Abitur – Halbjahre zwischen Schulabschluss und Studienbeginn ohne Studienzeiten.',
  keywords: [
    'wartesemester berechnen',
    'wartesemester nc',
    'wartesemester rechner',
    'anzahl wartesemester',
    'wartezeit studium',
    'wartesemester abitur',
  ],
  intro:
    'Wartesemester sind die Halbjahre, die zwischen dem Erwerb der Hochschulreife und dem geplanten Studienbeginn vergangen sind – unabhaengig davon, was du in dieser Zeit gemacht hast. Wichtig: Zeiten, in denen du bereits an einer Hochschule eingeschrieben warst, zaehlen nicht als Wartesemester. Das Tool rechnet ganze Halbjahre. Maszgeblich bleiben die Regeln der Stiftung Hochschulstart.',
  formula: 'Wartesemester = abgeschlossene Halbjahre seit Abitur − bereits studierte Semester',
  inputs: [
    { type: 'number', id: 'monate', label: 'Monate seit Abitur bis Studienbeginn', default: 24, min: 0, step: 1, help: 'Vollendete Monate zwischen Schulabschluss und geplantem Studienstart.' },
    { type: 'number', id: 'studiert', label: 'Bereits studierte Semester', default: 0, min: 0, step: 1, help: 'Semester, in denen du an einer Hochschule eingeschrieben warst.' },
  ],
  compute: (v) => {
    const monate = num(v.monate);
    const studiert = num(v.studiert);
    const halbjahre = Math.floor(monate / 6);
    const warte = Math.max(0, halbjahre - studiert);
    return [
      { label: 'Wartesemester', value: warte, digits: 0, primary: true },
      { label: 'Halbjahre seit Abitur', value: halbjahre, digits: 0 },
      { label: 'Abgezogene Studiensemester', value: Math.min(studiert, halbjahre), digits: 0 },
    ];
  },
  howto: [
    'Vollendete Monate zwischen Abitur und geplantem Studienbeginn eintragen.',
    'Bereits studierte Semester eintragen (falls du eingeschrieben warst).',
    'Anzahl der anrechenbaren Wartesemester ablesen.',
  ],
  faq: [
    { q: 'Wie entsteht ein Wartesemester?', a: 'Jedes volle Halbjahr (sechs Monate) nach dem Abitur zaehlt als ein Wartesemester – egal ob du arbeitest, reist oder eine Ausbildung machst.' },
    { q: 'Zaehlen Studienzeiten als Wartesemester?', a: 'Nein. Semester, in denen du an einer deutschen Hochschule immatrikuliert warst, werden nicht als Wartezeit gewertet und hier abgezogen.' },
    { q: 'Lohnen sich Wartesemester noch?', a: 'In vielen Studiengaengen wurde die reine Wartezeitquote stark reduziert oder abgeschafft. Pruefe das aktuelle Auswahlverfahren des Studiengangs bei Hochschulstart.' },
  ],
  related: ['master-zulassungsnote-rechner', 'abi-durchschnitt-rechner', 'studienkosten-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { monate: 24, studiert: 0 },
      expect: [
        { label: 'Wartesemester', value: 4, tolerance: 0.01 },
        { label: 'Halbjahre seit Abitur', value: 4, tolerance: 0.01 },
      ],
    },
    {
      values: { monate: 30, studiert: 1 },
      expect: [{ label: 'Wartesemester', value: 4, tolerance: 0.01 }],
    },
  ],
};
