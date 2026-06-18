import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'tagesgeld-rechner',
  category: 'finanzen',
  title: 'Tagesgeld-Rechner',
  shortTitle: 'Tagesgeld',
  description:
    'Berechne die Zinsen auf deinem Tagesgeldkonto für eine frei wählbare Anlagedauer in Tagen – inklusive Endkapital und Zinsertrag.',
  keywords: [
    'tagesgeld rechner',
    'tagesgeld zinsen berechnen',
    'tagesgeldkonto zinsen',
    'tagesgeld zinsertrag',
    'zinsen pro tag berechnen',
    'tagesgeld endkapital',
  ],
  formula: 'Zinsertrag = Kapital × Zinssatz/100 × Tage/365',
  inputs: [
    { type: 'number', id: 'kapital', label: 'Angelegtes Kapital', unit: '€', default: 10000, min: 0, step: 100 },
    { type: 'number', id: 'zinssatz', label: 'Zinssatz pro Jahr', unit: '%', default: 3, min: 0, step: 0.05 },
    { type: 'number', id: 'tage', label: 'Anlagedauer', unit: 'Tage', default: 365, min: 1, step: 1, help: 'Anzahl der Tage, an denen das Geld angelegt ist.' },
  ],
  compute: (v) => {
    const kapital = num(v.kapital);
    const zinssatz = num(v.zinssatz);
    const tage = num(v.tage);
    const zinsertrag = kapital * (zinssatz / 100) * (tage / 365);
    const endkapital = kapital + zinsertrag;
    const proTag = zinsertrag / Math.max(tage, 1);
    return [
      { label: 'Zinsertrag', value: zinsertrag, unit: '€', digits: 2, primary: true },
      { label: 'Endkapital', value: endkapital, unit: '€', digits: 2 },
      { label: 'Zinsen pro Tag', value: proTag, unit: '€', digits: 4 },
    ];
  },
  intro:
    'Tagesgeld wird taggenau verzinst und ist jederzeit verfügbar. Dieser Rechner ermittelt den Zinsertrag für eine beliebige Anlagedauer in Tagen auf Basis der deutschen 365-Tage-Konvention. Anders als beim Zinseszins werden hier die Zinsen einmal am Ende der Periode gutgeschrieben.',
  howto: [
    'Gib das angelegte Kapital in Euro ein.',
    'Trage den jährlichen Zinssatz deines Tagesgeldkontos ein.',
    'Lege die Anlagedauer in Tagen fest.',
    'Lies Zinsertrag und Endkapital ab.',
  ],
  faq: [
    { q: 'Wie werden Tagesgeldzinsen berechnet?', a: 'Der Jahreszins wird taggenau anteilig berechnet: Kapital × Zinssatz × Tage / 365. Banken schreiben die Zinsen meist monatlich, vierteljährlich oder jährlich gut.' },
    { q: 'Ist der Zinssatz garantiert?', a: 'Nein. Der Tagesgeldzins ist variabel und kann von der Bank jederzeit angepasst werden. Aktionszinsen gelten oft nur für wenige Monate.' },
    { q: 'Sind Steuern berücksichtigt?', a: 'Nein, der Rechner zeigt den Bruttoertrag. Auf Zinsen fällt Abgeltungsteuer an, sofern der Sparer-Pauschbetrag überschritten wird.' },
  ],
  related: ['festgeld-rechner', 'zinsrechner', 'zinseszinsrechner'],
  examples: [
    {
      values: { kapital: 10000, zinssatz: 3, tage: 365 },
      expect: [
        { label: 'Zinsertrag', value: 300, tolerance: 0.01 },
        { label: 'Endkapital', value: 10300, tolerance: 0.01 },
      ],
    },
    {
      values: { kapital: 5000, zinssatz: 2.5, tage: 180 },
      expect: [{ label: 'Zinsertrag', value: 61.64, tolerance: 0.1 }],
    },
  ],
  updated: '2026-06-18',
};
