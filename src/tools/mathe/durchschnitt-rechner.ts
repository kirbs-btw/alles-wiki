import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'durchschnitt-rechner',
  category: 'mathe',
  title: 'Durchschnitt berechnen – Mittelwert aus bis zu fünf Zahlen',
  shortTitle: 'Durchschnitt',
  description:
    'Berechne den Durchschnitt (arithmetisches Mittel) aus bis zu fünf Zahlen. Mit Summe, Anzahl, kleinstem und größtem Wert – ideal für Noten, Werte und Messreihen.',
  keywords: [
    'durchschnitt berechnen',
    'mittelwert berechnen',
    'arithmetisches mittel',
    'durchschnitt zahlen',
    'mittelwert rechner',
    'durchschnitt von zahlen',
    'noten durchschnitt',
    'mittelwert formel',
  ],
  formula:
    'Durchschnitt = Summe aller Werte / Anzahl der Werte',
  intro:
    'Der Durchschnitt – auch arithmetisches Mittel genannt – ist die Summe aller Werte geteilt durch ihre Anzahl. Er fasst eine Zahlenreihe zu einem einzigen typischen Wert zusammen. Felder mit dem Wert 0 werden standardmäßig ignoriert: Lasse Felder, die du nicht brauchst, einfach auf 0.',
  inputs: [
    { type: 'number', id: 'w1', label: 'Wert 1', default: 2, step: 0.01 },
    { type: 'number', id: 'w2', label: 'Wert 2', default: 3, step: 0.01 },
    { type: 'number', id: 'w3', label: 'Wert 3', default: 4, step: 0.01 },
    { type: 'number', id: 'w4', label: 'Wert 4', default: 0, step: 0.01, help: 'Optional – auf 0 lassen, wenn nicht benötigt.' },
    { type: 'number', id: 'w5', label: 'Wert 5', default: 0, step: 0.01, help: 'Optional – auf 0 lassen, wenn nicht benötigt.' },
    {
      type: 'select',
      id: 'nullen',
      label: 'Nullen mitzählen?',
      default: 'nein',
      options: [
        { value: 'nein', label: 'Nein – Felder mit 0 ignorieren' },
        { value: 'ja', label: 'Ja – 0 ist ein echter Messwert' },
      ],
      help: 'Wähle „Ja", wenn 0 ein gültiger Wert deiner Reihe ist.',
    },
  ],
  compute: (v) => {
    const roh = [num(v.w1), num(v.w2), num(v.w3), num(v.w4), num(v.w5)];
    const zaehleNullen = String(v.nullen) === 'ja';
    const werte = zaehleNullen ? roh : roh.filter((x) => x !== 0);
    const anzahl = werte.length;
    const summe = werte.reduce((s, x) => s + x, 0);
    const mittel = anzahl > 0 ? summe / anzahl : 0;
    const min = anzahl > 0 ? Math.min(...werte) : 0;
    const max = anzahl > 0 ? Math.max(...werte) : 0;
    return [
      { label: 'Durchschnitt', value: mittel, digits: 4, primary: true },
      { label: 'Summe', value: summe, digits: 4 },
      { label: 'Anzahl der Werte', value: anzahl, digits: 0 },
      { label: 'Kleinster Wert', value: min, digits: 4 },
      { label: 'Größter Wert', value: max, digits: 4 },
    ];
  },
  howto: [
    'Gib deine Zahlen in die Felder Wert 1 bis Wert 5 ein.',
    'Nicht benötigte Felder mit dem Wert 0 lassen.',
    'Wähle, ob Nullen als echte Messwerte zählen sollen.',
    'Lies den Durchschnitt sowie Summe, Anzahl und Spannweite ab.',
  ],
  faq: [
    {
      q: 'Wie berechne ich einen Durchschnitt?',
      a: 'Du addierst alle Werte und teilst die Summe durch ihre Anzahl. Aus 2, 3 und 4 ergibt sich (2+3+4)/3 = 3.',
    },
    {
      q: 'Was ist das arithmetische Mittel?',
      a: 'Das arithmetische Mittel ist der gebräuchlichste Durchschnitt: Summe geteilt durch Anzahl. Es ist der Wert, der dargestellt würde, wenn man die Gesamtsumme gleichmäßig verteilt.',
    },
    {
      q: 'Werden leere Felder mitgezählt?',
      a: 'Standardmäßig werden Felder mit dem Wert 0 ignoriert. Wenn 0 ein echter Messwert deiner Reihe ist, stelle „Nullen mitzählen" auf „Ja".',
    },
    {
      q: 'Worin unterscheidet sich der Durchschnitt vom Median?',
      a: 'Der Durchschnitt mittelt alle Werte und reagiert auf Ausreißer. Der Median ist der mittlere Wert der sortierten Reihe und bleibt von Ausreißern weitgehend unbeeinflusst.',
    },
  ],
  related: ['prozentuale-veraenderung-rechner', 'dreisatz-rechner', 'wurzelrechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { w1: 2, w2: 3, w3: 4, w4: 0, w5: 0, nullen: 'nein' },
      expect: [
        { label: 'Durchschnitt', value: 3, tolerance: 0.001 },
        { label: 'Anzahl der Werte', value: 3, tolerance: 0 },
      ],
    },
    {
      values: { w1: 1, w2: 2, w3: 3, w4: 4, w5: 5, nullen: 'ja' },
      expect: [{ label: 'Durchschnitt', value: 3, tolerance: 0.001 }],
    },
  ],
};
