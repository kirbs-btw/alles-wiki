import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'inflationsausgleich-gehalt-rechner',
  category: 'beruf',
  title: 'Inflationsausgleich Gehalt Rechner (Reallohn)',
  shortTitle: 'Inflationsausgleich',
  description:
    'Prüfe, ob deine Gehaltserhöhung die Inflation ausgleicht: Berechne den realen Lohnzuwachs und welche Erhöhung den Reallohn erhält.',
  keywords: [
    'inflationsausgleich gehalt rechner',
    'reallohn berechnen',
    'gehaltserhöhung inflation',
    'kaufkraft gehalt rechner',
    'reale lohnerhöhung',
    'inflation gehalt ausgleichen',
  ],
  formula:
    'Reallohn-Faktor = (1 + Erhöhung%) ÷ (1 + Inflation%);  Realer Zuwachs% = (Faktor − 1) × 100',
  inputs: [
    { type: 'number', id: 'gehalt', label: 'Aktuelles Brutto-Monatsgehalt', unit: '€', default: 3000, min: 0, step: 50 },
    { type: 'number', id: 'erhoehung', label: 'Geplante/erhaltene Erhöhung', unit: '%', default: 3, min: 0, max: 100, step: 0.1 },
    { type: 'number', id: 'inflation', label: 'Inflationsrate im Zeitraum', unit: '%', default: 4, min: 0, max: 100, step: 0.1, help: 'Erwartete oder tatsächliche Preissteigerung.' },
  ],
  compute: (v) => {
    const gehalt = num(v.gehalt);
    const erhoehung = num(v.erhoehung);
    const inflation = num(v.inflation);

    const neuGehalt = gehalt * (1 + erhoehung / 100);
    const realFaktor = (1 + erhoehung / 100) / (1 + inflation / 100);
    const realerZuwachs = (realFaktor - 1) * 100;
    const ausgleichNoetig = inflation;
    const kaufkraftNeu = neuGehalt / (1 + inflation / 100);

    return [
      { label: 'Realer Gehaltszuwachs', value: realerZuwachs, unit: '%', digits: 2, primary: true },
      { label: 'Neues Nominalgehalt', value: neuGehalt, unit: '€', digits: 2 },
      { label: 'Kaufkraft des neuen Gehalts', value: kaufkraftNeu, unit: '€', digits: 2, help: 'Neues Gehalt in heutigen Preisen ausgedrückt.' },
      { label: 'Für reinen Ausgleich nötig', value: ausgleichNoetig, unit: '%', digits: 2, help: 'Erhöhung, die den Reallohn gerade hält.' },
    ];
  },
  intro:
    'Eine Gehaltserhöhung ist nur dann ein echtes Plus, wenn sie die Inflation übertrifft. Dieser Rechner zeigt, ob deine nominale Erhöhung die Preissteigerung ausgleicht: Ist der reale Zuwachs positiv, steigt deine Kaufkraft, ist er negativ, verlierst du trotz mehr Euro real an Wert. Außerdem siehst du, welche Erhöhung den Reallohn gerade konstant halten würde.',
  howto: [
    'Trage dein aktuelles Brutto-Monatsgehalt ein.',
    'Gib die geplante oder erhaltene Gehaltserhöhung in Prozent ein.',
    'Trage die erwartete oder tatsächliche Inflationsrate ein.',
    'Lies den realen Gehaltszuwachs ab – positiv bedeutet mehr Kaufkraft.',
  ],
  faq: [
    { q: 'Wie wird der Reallohn berechnet?', a: 'Der Faktor (1 + Erhöhung) wird durch (1 + Inflation) geteilt. Liegt die Erhöhung unter der Inflation, ist der reale Zuwachs negativ.' },
    { q: 'Warum ist 3 % Erhöhung bei 4 % Inflation ein Minus?', a: 'Weil die Preise stärker steigen als das Gehalt. Real verlierst du rund 1 % Kaufkraft, obwohl nominal mehr Geld da ist.' },
    { q: 'Was bedeutet die nötige Erhöhung für den Ausgleich?', a: 'Sie entspricht der Inflationsrate. Erst eine Erhöhung in Höhe der Inflation hält deine Kaufkraft konstant; alles darüber ist ein realer Zuwachs.' },
    { q: 'Sind das Brutto- oder Nettowerte?', a: 'Gerechnet wird mit dem Bruttogehalt. Netto kommt wegen Steuerprogression oft weniger an, sodass der reale Nettozuwachs noch geringer ausfallen kann.' },
  ],
  related: ['gehaltserhoehung-rechner', 'jahresgehalt-rechner', 'brutto-stundensatz-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { gehalt: 3000, erhoehung: 3, inflation: 4 },
      expect: [
        { label: 'Realer Gehaltszuwachs', value: -0.96, tolerance: 0.05 },
        { label: 'Neues Nominalgehalt', value: 3090, tolerance: 0.01 },
      ],
    },
    {
      values: { gehalt: 4000, erhoehung: 6, inflation: 2 },
      expect: [
        { label: 'Realer Gehaltszuwachs', value: 3.92, tolerance: 0.05 },
        { label: 'Neues Nominalgehalt', value: 4240, tolerance: 0.01 },
      ],
    },
  ],
};
