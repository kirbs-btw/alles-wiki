import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'schulnoten-punkte-umrechner',
  category: 'bildung',
  title: 'Schulnote in Oberstufenpunkte umrechnen',
  shortTitle: 'Note in Punkte',
  description:
    'Rechne eine Schulnote von 1 bis 6 in das 15-Punkte-System der gymnasialen Oberstufe um – inklusive Tendenz (+/−).',
  keywords: [
    'note in punkte umrechnen',
    'schulnote oberstufe punkte',
    '15 punkte system',
    'notenpunkte oberstufe',
    'note punkte tabelle',
    'abitur punkte note',
  ],
  intro:
    'In der gymnasialen Oberstufe werden Noten im 15-Punkte-System gefuehrt: 15 Punkte entsprechen einer glatten 1+ und 0 Punkte einer 6. Das Tool wandelt eine Note mit Tendenz (z. B. 2+, 2, 2−) in die zugehoerige Punktzahl um. Es nutzt die bundesweit verbreitete Standardtabelle der Oberstufe.',
  formula: 'Standardtabelle: 1+ = 15, 1 = 14, 1− = 13, … 4− = 5, 5+ = 4, … 6 = 0',
  inputs: [
    {
      type: 'select',
      id: 'note',
      label: 'Note mit Tendenz',
      default: '2',
      options: [
        { value: '1plus', label: '1+ (sehr gut)' },
        { value: '1', label: '1' },
        { value: '1minus', label: '1−' },
        { value: '2plus', label: '2+' },
        { value: '2', label: '2 (gut)' },
        { value: '2minus', label: '2−' },
        { value: '3plus', label: '3+' },
        { value: '3', label: '3 (befriedigend)' },
        { value: '3minus', label: '3−' },
        { value: '4plus', label: '4+' },
        { value: '4', label: '4 (ausreichend)' },
        { value: '4minus', label: '4−' },
        { value: '5plus', label: '5+' },
        { value: '5', label: '5 (mangelhaft)' },
        { value: '5minus', label: '5−' },
        { value: '6', label: '6 (ungenuegend)' },
      ],
    },
  ],
  compute: (v) => {
    const tabelle: Record<string, number> = {
      '1plus': 15, '1': 14, '1minus': 13,
      '2plus': 12, '2': 11, '2minus': 10,
      '3plus': 9, '3': 8, '3minus': 7,
      '4plus': 6, '4': 5, '4minus': 4,
      '5plus': 3, '5': 2, '5minus': 1,
      '6': 0,
    };
    const key = String(v.note);
    const punkte = key in tabelle ? tabelle[key] : 0;
    const bestanden = punkte >= 5;
    return [
      { label: 'Notenpunkte', value: punkte, digits: 0, primary: true, help: '15-Punkte-System der Oberstufe' },
      { label: 'Status', value: bestanden ? 'bestanden (>= 5 Punkte)' : 'nicht ausreichend (< 5 Punkte)' },
    ];
  },
  howto: [
    'Note inklusive Tendenz (+/−) im Auswahlfeld waehlen.',
    'Die zugehoerigen Notenpunkte im 15-Punkte-System ablesen.',
    'Status pruefen: Ab 5 Punkten gilt eine Leistung als ausreichend.',
  ],
  faq: [
    { q: 'Wie ist die Punkte-Skala aufgebaut?', a: 'Sie reicht von 15 Punkten (1+) bis 0 Punkten (6). Jede Note hat drei Stufen: + (besser), glatt und − (schlechter). Ein Notensprung entspricht drei Punkten.' },
    { q: 'Ab wie viel Punkten ist es bestanden?', a: 'Ab 5 Punkten gilt eine Leistung in der Oberstufe als ausreichend. Bei 0 bis 4 Punkten liegt eine mangelhafte oder ungenuegende Leistung vor.' },
    { q: 'Gilt diese Tabelle ueberall?', a: 'Die 15-Punkte-Tabelle ist bundesweit der Standard in der gymnasialen Oberstufe. Detailregeln zur Abiturwertung koennen je Bundesland leicht abweichen.' },
  ],
  related: ['notenpunkte-umrechnung', 'abi-durchschnitt-rechner', 'punkte-in-note-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { note: '2' },
      expect: [{ label: 'Notenpunkte', value: 11, tolerance: 0.01 }],
    },
    {
      values: { note: '1plus' },
      expect: [{ label: 'Notenpunkte', value: 15, tolerance: 0.01 }],
    },
  ],
};
