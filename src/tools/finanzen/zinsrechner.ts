import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'zinsrechner',
  category: 'finanzen',
  title: 'Zinsrechner (einfache Zinsen)',
  shortTitle: 'Zinsrechner',
  description:
    'Berechne einfache Zinsen ohne Zinseszins: Wie viel Zinsen bringt ein Kapital bei festem Zinssatz und Laufzeit? Mit Endkapital und Zinsbetrag.',
  keywords: [
    'zinsrechner',
    'zinsen berechnen',
    'einfache zinsen',
    'kapital verzinsen',
    'zinsertrag berechnen',
    'guthabenzinsen rechner',
    'zinsen pro jahr',
  ],
  formula: 'Zinsen = Kapital × (Zinssatz/100) × Jahre; Endkapital = Kapital + Zinsen',
  inputs: [
    { type: 'number', id: 'kapital', label: 'Anfangskapital', unit: '€', default: 5000, min: 0, step: 100 },
    { type: 'number', id: 'zinssatz', label: 'Zinssatz pro Jahr', unit: '%', default: 3, min: 0, step: 0.1 },
    { type: 'number', id: 'jahre', label: 'Laufzeit', unit: 'Jahre', default: 4, min: 0, step: 0.5 },
  ],
  compute: (v) => {
    const kapital = num(v.kapital);
    const zinssatz = num(v.zinssatz);
    const jahre = num(v.jahre);
    const zinsen = kapital * (zinssatz / 100) * jahre;
    const endkapital = kapital + zinsen;
    const proJahr = jahre > 0 ? zinsen / jahre : 0;
    return [
      { label: 'Zinsen gesamt', value: zinsen, unit: '€', digits: 2 },
      { label: 'Zinsen pro Jahr', value: proJahr, unit: '€', digits: 2 },
      { label: 'Endkapital', value: endkapital, unit: '€', digits: 2, primary: true },
    ];
  },
  intro:
    'Bei einfachen Zinsen wird nur das ursprünglich eingezahlte Kapital verzinst – die Zinsen selbst tragen keine weiteren Zinsen. Das ist typisch für kurzlaufende Anlagen oder wenn Zinsen jährlich ausgezahlt statt angesammelt werden. Für mehrjährige Anlagen mit Wiederanlage nutze stattdessen den Zinseszinsrechner.',
  howto: [
    'Gib dein Anfangskapital in Euro ein.',
    'Trage den jährlichen Zinssatz in Prozent ein.',
    'Lege die Laufzeit in Jahren fest (auch halbe Jahre möglich).',
    'Ergebnis: Zinsbetrag und Endkapital werden sofort angezeigt.',
  ],
  faq: [
    { q: 'Was ist der Unterschied zu Zinseszins?', a: 'Bei einfachen Zinsen wird nur das Startkapital verzinst. Beim Zinseszins werden bereits gutgeschriebene Zinsen mitverzinst, wodurch das Kapital schneller wächst.' },
    { q: 'Wofür eignen sich einfache Zinsen?', a: 'Für kurze Laufzeiten, für Anlagen mit jährlicher Zinsauszahlung und als grobe Überschlagsrechnung. Bei mehrjähriger Wiederanlage unterschätzt die Formel das Wachstum.' },
    { q: 'Sind die Zinsen vor oder nach Steuern?', a: 'Der Rechner zeigt Bruttozinsen. In Deutschland fällt auf Kapitalerträge die Abgeltungsteuer (25 % plus Soli, ggf. Kirchensteuer) an, soweit der Sparerpauschbetrag überschritten ist.' },
    { q: 'Kann ich auch Monate statt Jahre rechnen?', a: 'Ja, gib die Laufzeit als Bruchteil eines Jahres ein, z. B. 0,5 für sechs Monate oder 0,25 für ein Quartal.' },
  ],
  related: ['zinseszinsrechner', 'sparplan-rechner', 'rendite-rechner'],
  examples: [
    {
      values: { kapital: 5000, zinssatz: 3, jahre: 4 },
      expect: [
        { label: 'Zinsen gesamt', value: 600, tolerance: 0.01 },
        { label: 'Endkapital', value: 5600, tolerance: 0.01 },
      ],
    },
  ],
  updated: '2026-06-18',
};
