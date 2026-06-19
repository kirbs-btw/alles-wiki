import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'geschenkbudget-pro-person-rechner',
  category: 'alltag',
  title: 'Geschenkbudget pro Person berechnen',
  shortTitle: 'Geschenkbudget',
  description:
    'Verteile dein Gesamtbudget für Geschenke gleichmäßig auf alle Beschenkten und behalte den Überblick über Gesamtkosten und einen optionalen Puffer.',
  keywords: [
    'geschenkbudget berechnen',
    'budget pro person geschenke',
    'weihnachtsbudget aufteilen',
    'wie viel pro geschenk ausgeben',
    'geschenke budget rechner',
    'budget pro beschenkten',
  ],
  formula: 'Budget je Person = (Gesamtbudget × (1 − Puffer%/100)) / Anzahl Personen',
  inputs: [
    { type: 'number', id: 'budget', label: 'Gesamtbudget', unit: '€', default: 300, min: 0, step: 10 },
    { type: 'number', id: 'personen', label: 'Anzahl Beschenkte', default: 6, min: 1, step: 1 },
    { type: 'number', id: 'puffer', label: 'Reserve / Puffer', unit: '%', default: 10, min: 0, max: 90, step: 5, help: 'Für Verpackung, Karten und Spontankäufe.' },
  ],
  compute: (v) => {
    const budget = num(v.budget);
    const personen = Math.max(1, Math.round(num(v.personen, 1)));
    const puffer = num(v.puffer);
    const reserve = budget * (puffer / 100);
    const verteilbar = budget - reserve;
    const proPerson = verteilbar / personen;
    return [
      { label: 'Budget je Person', value: proPerson, unit: '€', digits: 2, primary: true },
      { label: 'Verteilbar (ohne Reserve)', value: verteilbar, unit: '€', digits: 2 },
      { label: 'Reserve / Puffer', value: reserve, unit: '€', digits: 2 },
    ];
  },
  intro:
    'Bei Weihnachten, Geburtstagen oder Hochzeiten hilft ein festes Budget, nicht den Überblick zu verlieren. Dieser Rechner teilt dein Gesamtbudget gleichmäßig auf alle Beschenkten auf und reserviert auf Wunsch einen Puffer für Verpackung, Karten oder den einen unerwarteten Gast.',
  howto: [
    'Trage dein gesamtes Geschenkbudget in Euro ein.',
    'Gib an, wie viele Personen du beschenken möchtest.',
    'Lege optional eine Reserve fest (z. B. 10 % für Verpackung und Spontankäufe).',
    'Lies ab, wie viel du im Schnitt pro Person ausgeben kannst.',
  ],
  faq: [
    { q: 'Muss ich jeder Person gleich viel schenken?', a: 'Nein. Der Wert ist ein Durchschnitt. Du kannst bei engen Angehörigen mehr und bei Bekannten weniger einplanen, solange die Summe das Gesamtbudget nicht übersteigt.' },
    { q: 'Wofür ist der Puffer gedacht?', a: 'Verpackung, Grußkarten, Versand oder ein zusätzlicher kleiner Gast schlagen oft mit ein paar Euro zu Buche. Eine Reserve von 10 % verhindert, dass du am Ende über dein Budget rutschst.' },
    { q: 'Wie setze ich ein realistisches Gesamtbudget?', a: 'Eine verbreitete Orientierung sind etwa 1 bis 2 % des Netto-Monatseinkommens pro engem Familienmitglied. Wichtiger als feste Regeln ist, dass das Budget zu deinen Möglichkeiten passt.' },
  ],
  related: ['adventskalender-budget-rechner', 'rechnung-splitten-rechner', 'geschenkpapier-bedarf-rechner'],
  updated: '2026-06-19',
  examples: [
    {
      values: { budget: 300, personen: 6, puffer: 10 },
      // verteilbar = 300*0.9 = 270; proPerson = 270/6 = 45
      expect: [
        { label: 'Budget je Person', value: 45, tolerance: 0.01 },
        { label: 'Verteilbar (ohne Reserve)', value: 270, tolerance: 0.01 },
        { label: 'Reserve / Puffer', value: 30, tolerance: 0.01 },
      ],
    },
    {
      values: { budget: 200, personen: 5, puffer: 0 },
      // proPerson = 200/5 = 40
      expect: [{ label: 'Budget je Person', value: 40, tolerance: 0.01 }],
    },
  ],
};
