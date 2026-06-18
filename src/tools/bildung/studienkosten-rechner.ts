import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'studienkosten-rechner',
  category: 'bildung',
  title: 'Studienkosten-Rechner: Gesamtkosten des Studiums',
  shortTitle: 'Studienkosten',
  description:
    'Berechne die Gesamtkosten deines Studiums aus Miete, Semesterbeitrag und Lebenshaltung – pro Monat, pro Semester und ueber die gesamte Studiendauer.',
  keywords: [
    'studienkosten berechnen',
    'kosten studium gesamt',
    'studium kosten pro monat',
    'lebenshaltungskosten student',
    'semesterbeitrag rechner',
    'wie teuer ist ein studium',
    'budget student',
  ],
  intro:
    'Ein Studium kostet weit mehr als nur den Semesterbeitrag. Miete, Essen, Versicherungen, Lernmittel und Freizeit summieren sich ueber mehrere Jahre erheblich. Dieses Tool rechnet deine monatlichen Ausgaben plus den Semesterbeitrag hoch – auf Monat, Semester und die gesamte Regelstudienzeit. So siehst du, welches Budget du insgesamt einplanen musst.',
  formula: 'Gesamtkosten = (monatliche Ausgaben × 6 + Semesterbeitrag) × Anzahl Semester',
  inputs: [
    { type: 'number', id: 'miete', label: 'Miete (warm) pro Monat', unit: '€', default: 450, min: 0, step: 10 },
    { type: 'number', id: 'essen', label: 'Essen & Haushalt pro Monat', unit: '€', default: 250, min: 0, step: 10 },
    { type: 'number', id: 'sonstiges', label: 'Sonstiges pro Monat (Handy, Freizeit, ÖPNV)', unit: '€', default: 200, min: 0, step: 10 },
    { type: 'number', id: 'lernmittel', label: 'Lernmittel pro Monat (Buecher, Software)', unit: '€', default: 30, min: 0, step: 5 },
    { type: 'number', id: 'semesterbeitrag', label: 'Semesterbeitrag', unit: '€', default: 300, min: 0, step: 10, help: 'Beitrag je Semester inkl. evtl. Semesterticket.' },
    { type: 'number', id: 'semester', label: 'Anzahl Semester', default: 6, min: 1, max: 30, step: 1 },
  ],
  compute: (v) => {
    const monat = num(v.miete) + num(v.essen) + num(v.sonstiges) + num(v.lernmittel);
    const semesterbeitrag = num(v.semesterbeitrag);
    const semester = Math.max(0, Math.round(num(v.semester)));
    const proSemester = monat * 6 + semesterbeitrag;
    const gesamt = proSemester * semester;
    const monateGesamt = semester * 6;
    const proMonatDurchschnitt = monateGesamt > 0 ? gesamt / monateGesamt : 0;
    return [
      { label: 'Gesamtkosten Studium', value: gesamt, digits: 2, unit: '€', primary: true },
      { label: 'Kosten pro Semester', value: proSemester, digits: 2, unit: '€' },
      { label: 'Lebenshaltung pro Monat', value: monat, digits: 2, unit: '€' },
      { label: 'Durchschnitt pro Monat (inkl. Beitrag)', value: proMonatDurchschnitt, digits: 2, unit: '€' },
    ];
  },
  howto: [
    'Deine monatlichen Kosten fuer Miete, Essen, Sonstiges und Lernmittel eintragen.',
    'Den Semesterbeitrag deiner Hochschule angeben (inkl. Semesterticket).',
    'Die geplante Anzahl Semester eintragen (Regelstudienzeit).',
    'Gesamtkosten sowie Kosten pro Semester und Monat ablesen.',
  ],
  faq: [
    { q: 'Wie viel kostet ein Studium im Schnitt?', a: 'Je nach Stadt liegen die monatlichen Lebenshaltungskosten von Studierenden grob zwischen 800 und 1.200 Euro. Ueber sechs Semester (drei Jahre) summiert sich das schnell auf 30.000 Euro und mehr.' },
    { q: 'Was zaehlt zum Semesterbeitrag?', a: 'Der Semesterbeitrag umfasst meist den Verwaltungsbeitrag, den Beitrag fuer Studierendenwerk und AStA sowie oft ein Semesterticket fuer Bus und Bahn. Die Hoehe unterscheidet sich je Hochschule stark.' },
    { q: 'Warum sind die Kosten pro Monat hoeher als meine Ausgaben?', a: 'Der Durchschnitt pro Monat verteilt zusaetzlich den Semesterbeitrag auf die sechs Monate je Semester. Deshalb liegt dieser Wert ueber der reinen monatlichen Lebenshaltung.' },
    { q: 'Sind Studiengebuehren enthalten?', a: 'An staatlichen Hochschulen fallen in Deutschland in der Regel keine Studiengebuehren an, nur der Semesterbeitrag. An privaten Hochschulen kannst du etwaige Gebuehren ueber den Semesterbeitrag oder die Lernmittel mit einplanen.' },
  ],
  related: ['bafoeg-rueckzahlung-rechner', 'stundenlohn-rechner', 'ects-noten-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { miete: 450, essen: 250, sonstiges: 200, lernmittel: 30, semesterbeitrag: 300, semester: 6 },
      expect: [
        { label: 'Lebenshaltung pro Monat', value: 930, tolerance: 0.01 },
        { label: 'Kosten pro Semester', value: 5880, tolerance: 0.01 },
        { label: 'Gesamtkosten Studium', value: 35280, tolerance: 0.01 },
      ],
    },
  ],
};
