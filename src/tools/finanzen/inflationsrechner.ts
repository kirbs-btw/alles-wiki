import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'inflationsrechner',
  category: 'finanzen',
  title: 'Inflationsrechner (Kaufkraft)',
  shortTitle: 'Inflationsrechner',
  description:
    'Berechne, wie viel dein Geld nach Jahren der Inflation noch wert ist: der reale Kaufkraftverlust eines Betrags bei angenommener Inflationsrate.',
  keywords: [
    'inflationsrechner',
    'kaufkraft berechnen',
    'kaufkraftverlust rechner',
    'geldentwertung berechnen',
    'inflation auswirkung',
    'realer wert geld',
    'inflation rechner euro',
  ],
  formula: 'Kaufkraft = Betrag / (1 + Inflation/100)^Jahre; Verlust = Betrag − Kaufkraft',
  inputs: [
    { type: 'number', id: 'betrag', label: 'Heutiger Betrag', unit: '€', default: 10000, min: 0, step: 100 },
    { type: 'number', id: 'inflation', label: 'Inflationsrate pro Jahr', unit: '%', default: 2, min: 0, step: 0.1 },
    { type: 'number', id: 'jahre', label: 'Zeitraum', unit: 'Jahre', default: 10, min: 0, step: 1 },
  ],
  compute: (v) => {
    const betrag = num(v.betrag);
    const inflation = num(v.inflation);
    const jahre = num(v.jahre);
    const faktor = Math.pow(1 + inflation / 100, jahre);
    const kaufkraft = faktor > 0 ? betrag / faktor : betrag;
    const verlust = betrag - kaufkraft;
    const verlustProzent = betrag > 0 ? verlust / betrag * 100 : 0;
    return [
      { label: 'Reale Kaufkraft', value: kaufkraft, unit: '€', digits: 2, primary: true },
      { label: 'Kaufkraftverlust', value: verlust, unit: '€', digits: 2 },
      { label: 'Verlust in Prozent', value: verlustProzent, unit: '%', digits: 1 },
    ];
  },
  intro:
    'Inflation bedeutet, dass dieselbe Geldsumme im Laufe der Zeit immer weniger kaufen kann. Dieser Rechner zeigt, wie viel ein heutiger Betrag in einigen Jahren real noch wert ist, wenn die Preise mit einer konstanten Rate steigen. So siehst du, wie wichtig eine Anlage ist, die mindestens die Inflation ausgleicht. Die langfristige Zielmarke der EZB liegt bei rund 2 Prozent pro Jahr.',
  howto: [
    'Gib den heutigen Betrag in Euro ein.',
    'Trage die erwartete jährliche Inflationsrate ein.',
    'Wähle den Zeitraum in Jahren.',
    'Ergebnis: reale Kaufkraft, Kaufkraftverlust und der prozentuale Verlust.',
  ],
  faq: [
    { q: 'Wie hoch ist eine realistische Inflationsrate?', a: 'Die Europäische Zentralbank strebt mittelfristig rund 2 Prozent pro Jahr an. In einzelnen Jahren kann die Rate deutlich darüber oder darunter liegen, daher rechne mit verschiedenen Szenarien.' },
    { q: 'Was bedeutet Kaufkraftverlust konkret?', a: 'Er gibt an, wie viel weniger Waren und Dienstleistungen du dir künftig für denselben Geldbetrag leisten kannst. 1.000 Euro auf dem Konto kaufen nach Jahren der Inflation weniger als heute.' },
    { q: 'Wie kann ich der Inflation entgegenwirken?', a: 'Indem du Geld so anlegst, dass die Rendite nach Steuern über der Inflationsrate liegt. Nur dann bleibt die reale Kaufkraft erhalten oder wächst.' },
    { q: 'Rechnet das Tool mit historischen Daten?', a: 'Nein, es verwendet eine von dir gewählte konstante Rate. Reale Inflationsraten schwanken von Jahr zu Jahr; das Tool dient als Modellrechnung.' },
  ],
  related: ['zinseszinsrechner', 'sparplan-rechner', 'rendite-rechner'],
  examples: [
    {
      values: { betrag: 10000, inflation: 2, jahre: 10 },
      expect: [
        { label: 'Reale Kaufkraft', value: 8203.48, tolerance: 0.5 },
        { label: 'Kaufkraftverlust', value: 1796.52, tolerance: 0.5 },
      ],
    },
  ],
  updated: '2026-06-18',
};
