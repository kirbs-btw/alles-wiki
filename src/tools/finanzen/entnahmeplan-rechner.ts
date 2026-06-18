import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'entnahmeplan-rechner',
  category: 'finanzen',
  title: 'Entnahmeplan-Rechner',
  shortTitle: 'Entnahmeplan',
  description:
    'Berechne, welche monatliche Rente dein Kapital über eine feste Laufzeit hergibt – inklusive Verzinsung des verbleibenden Vermögens.',
  keywords: [
    'entnahmeplan rechner',
    'kapitalverzehr rechner',
    'monatliche rente aus kapital',
    'auszahlplan rechner',
    'vermögen aufbrauchen rente',
    'entnahmerate berechnen',
  ],
  formula: 'Rate = Kapital × i / (1 − (1+i)^(−n)); i = Zins/100/12; n = Monate',
  inputs: [
    { type: 'number', id: 'kapital', label: 'Vorhandenes Kapital', unit: '€', default: 300000, min: 0, step: 1000 },
    { type: 'number', id: 'zins', label: 'Verzinsung pro Jahr', unit: '%', default: 3, min: 0, step: 0.1 },
    { type: 'number', id: 'jahre', label: 'Auszahlungsdauer', unit: 'Jahre', default: 25, min: 1, step: 1 },
  ],
  compute: (v) => {
    const kapital = num(v.kapital);
    const zins = num(v.zins);
    const jahre = num(v.jahre);
    const n = Math.round(jahre * 12);
    const i = zins / 100 / 12;
    let rate: number;
    if (n <= 0) {
      rate = 0;
    } else if (i > 0) {
      rate = kapital * i / (1 - Math.pow(1 + i, -n));
    } else {
      rate = kapital / n;
    }
    const summe = rate * n;
    const zinsertrag = summe - kapital;
    return [
      { label: 'Monatliche Entnahme', value: rate, unit: '€/Monat', digits: 2, primary: true },
      { label: 'Auszahlungen gesamt', value: summe, unit: '€', digits: 2 },
      { label: 'Davon aus Zinsen', value: zinsertrag, unit: '€', digits: 2 },
    ];
  },
  intro:
    'Ein Entnahmeplan zahlt aus einem Kapitalstock eine regelmäßige Rente, bis das Vermögen nach der gewählten Laufzeit aufgebraucht ist (Kapitalverzehr). Das Restkapital wird dabei weiter verzinst. Dieser Rechner ermittelt die konstante monatliche Entnahme, die genau bis zum Ende der Laufzeit reicht.',
  howto: [
    'Gib das vorhandene Kapital ein.',
    'Trage die erwartete jährliche Verzinsung des Restkapitals ein.',
    'Wähle die gewünschte Auszahlungsdauer in Jahren.',
    'Lies die mögliche monatliche Entnahme ab.',
  ],
  faq: [
    { q: 'Bleibt am Ende Kapital übrig?', a: 'Nein. Dieser Plan verzehrt das Kapital vollständig: Am Ende der Laufzeit ist der Kapitalstock genau aufgebraucht.' },
    { q: 'Wie wirkt die Verzinsung?', a: 'Das noch nicht entnommene Kapital erwirtschaftet weiter Zinsen. Dadurch fällt die mögliche Entnahme höher aus als bei reiner Aufteilung des Kapitals.' },
    { q: 'Was ist mit Inflation?', a: 'Der Rechner zeigt nominale Beträge. Die reale Kaufkraft der Rente sinkt über die Jahre durch Inflation – plane das ein.' },
  ],
  related: ['sparplan-rechner', 'sparrate-rechner', 'zinseszinsrechner'],
  examples: [
    {
      values: { kapital: 300000, zins: 3, jahre: 25 },
      expect: [{ label: 'Monatliche Entnahme', value: 1422.63, tolerance: 1 }],
    },
  ],
  updated: '2026-06-18',
};
