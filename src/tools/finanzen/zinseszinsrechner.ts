import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'zinseszinsrechner',
  category: 'finanzen',
  title: 'Zinseszinsrechner',
  shortTitle: 'Zinseszins',
  description:
    'Berechne das Endkapital mit Zinseszins: Wie stark wächst dein Geld bei jährlicher, monatlicher oder täglicher Verzinsung über die Jahre?',
  keywords: [
    'zinseszinsrechner',
    'zinseszins berechnen',
    'kapital wachstum rechner',
    'geld anlegen zinseszins',
    'endkapital berechnen',
    'verzinsung mit zinseszins',
    'zinseszinsformel',
  ],
  formula: 'Endkapital = Kapital × (1 + Zinssatz/100 / m)^(m × Jahre); m = Verzinsungen pro Jahr',
  inputs: [
    { type: 'number', id: 'kapital', label: 'Anfangskapital', unit: '€', default: 10000, min: 0, step: 100 },
    { type: 'number', id: 'zinssatz', label: 'Zinssatz pro Jahr', unit: '%', default: 5, min: 0, step: 0.1 },
    { type: 'number', id: 'jahre', label: 'Laufzeit', unit: 'Jahre', default: 10, min: 0, step: 1 },
    {
      type: 'select', id: 'rhythmus', label: 'Zinsgutschrift', default: '1',
      options: [
        { value: '1', label: 'jährlich' },
        { value: '4', label: 'vierteljährlich' },
        { value: '12', label: 'monatlich' },
        { value: '365', label: 'täglich' },
      ],
    },
  ],
  compute: (v) => {
    const kapital = num(v.kapital);
    const zinssatz = num(v.zinssatz);
    const jahre = num(v.jahre);
    const m = num(v.rhythmus, 1);
    const proPeriode = m > 0 ? zinssatz / 100 / m : 0;
    const endkapital = kapital * Math.pow(1 + proPeriode, m * jahre);
    const zinsertrag = endkapital - kapital;
    const faktor = kapital > 0 ? endkapital / kapital : 0;
    return [
      { label: 'Zinsertrag gesamt', value: zinsertrag, unit: '€', digits: 2 },
      { label: 'Wachstumsfaktor', value: faktor, unit: 'x', digits: 2 },
      { label: 'Endkapital', value: endkapital, unit: '€', digits: 2, primary: true },
    ];
  },
  intro:
    'Der Zinseszinseffekt sorgt dafür, dass bereits gutgeschriebene Zinsen in den Folgejahren selbst wieder Zinsen abwerfen – das Kapital wächst exponentiell. Je länger die Laufzeit und je häufiger die Zinsgutschrift, desto stärker fällt der Effekt aus. Dieser Rechner zeigt das Endkapital für jährliche bis tägliche Verzinsung.',
  howto: [
    'Gib dein Anfangskapital ein.',
    'Trage den jährlichen Zinssatz in Prozent ein.',
    'Wähle die Laufzeit in Jahren.',
    'Lege fest, wie oft die Zinsen gutgeschrieben werden (jährlich bis täglich).',
  ],
  faq: [
    { q: 'Warum spielt die Häufigkeit der Gutschrift eine Rolle?', a: 'Je öfter Zinsen gutgeschrieben werden, desto früher tragen sie selbst Zinsen. Bei gleichem Nominalzins liefert tägliche Verzinsung daher ein etwas höheres Endkapital als jährliche.' },
    { q: 'Was ist die Zinseszinsformel?', a: 'Endkapital = Kapital × (1 + i/m)^(m·n), wobei i der Jahreszins als Dezimalzahl, m die Gutschriften pro Jahr und n die Jahre sind.' },
    { q: 'Berücksichtigt der Rechner Steuern oder Inflation?', a: 'Nein, er zeigt das nominale Bruttokapital. Für die reale Kaufkraft nutze zusätzlich den Inflationsrechner, für Erträge nach Steuern die Abgeltungsteuer.' },
    { q: 'Was passiert ohne regelmäßige Einzahlungen?', a: 'Dieser Rechner verzinst eine Einmalanlage. Wenn du monatlich einzahlst, ist der Sparplan-Rechner der passende Rechner.' },
    { q: 'Was bedeutet der Wachstumsfaktor?', a: 'Er gibt an, auf das Wievielfache das Startkapital anwächst. Ein Faktor 2 bedeutet eine Verdopplung des eingesetzten Geldes.' },
  ],
  related: ['zinsrechner', 'sparplan-rechner', 'inflationsrechner'],
  examples: [
    {
      values: { kapital: 10000, zinssatz: 5, jahre: 10, rhythmus: '1' },
      expect: [
        { label: 'Endkapital', value: 16288.95, tolerance: 0.5 },
        { label: 'Zinsertrag gesamt', value: 6288.95, tolerance: 0.5 },
      ],
    },
  ],
  updated: '2026-06-18',
};
