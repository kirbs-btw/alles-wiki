import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'kreditkarten-teilzahlung-rechner',
  category: 'finanzen',
  title: 'Kreditkarten-Teilzahlung-Rechner',
  shortTitle: 'Teilzahlung',
  description:
    'Berechne, wie lange du bei Teilzahlung deiner Kreditkarte zahlst und wie viel Zinsen anfallen – mit fester Monatsrate und effektivem Jahreszins.',
  keywords: [
    'kreditkarten teilzahlung rechner',
    'teilzahlung zinsen berechnen',
    'revolving kredit rechner',
    'kreditkarte ratenzahlung kosten',
    'kreditkartenschulden abbezahlen',
  ],
  formula:
    'Monatszins i = Jahreszins/100/12; jeden Monat: Saldo += Saldo×i, dann − Rate. Tilgt nur, wenn Rate > Saldo×i.',
  inputs: [
    { type: 'number', id: 'saldo', label: 'Offener Kartensaldo', unit: '€', default: 2000, min: 0, step: 100 },
    { type: 'number', id: 'zins', label: 'Effektiver Jahreszins', unit: '%', default: 18, min: 0, step: 0.1, help: 'Sollzins der Teilzahlungsfunktion (oft 15–22 %).' },
    { type: 'number', id: 'rate', label: 'Feste Monatsrate', unit: '€', default: 100, min: 1, step: 10 },
  ],
  compute: (v) => {
    const saldo = num(v.saldo);
    const zins = num(v.zins);
    const rate = num(v.rate);
    const i = zins / 100 / 12;
    let bal = saldo;
    let months = 0;
    let interest = 0;
    const erstZins = bal * i;
    // Tilgt die Rate den ersten Monatszins nicht, läuft die Schuld unendlich.
    if (rate <= erstZins) {
      return [
        { label: 'Laufzeit', value: 'Rate zu niedrig – Schuld wächst', primary: true },
        { label: 'Erster Monatszins', value: erstZins, unit: '€', digits: 2, help: 'Die Rate muss höher sein als dieser Betrag.' },
      ];
    }
    while (bal > 0.005 && months < 100000) {
      const z = bal * i;
      interest += z;
      bal += z;
      const pay = Math.min(rate, bal);
      bal -= pay;
      months++;
    }
    const gesamt = saldo + interest;
    return [
      { label: 'Laufzeit', value: months, unit: 'Monate', digits: 0, primary: true },
      { label: 'Zinskosten gesamt', value: interest, unit: '€', digits: 2 },
      { label: 'Rückzahlung gesamt', value: gesamt, unit: '€', digits: 2 },
      { label: 'Laufzeit in Jahren', value: months / 12, unit: 'Jahre', digits: 1 },
    ];
  },
  intro:
    'Die Teilzahlungs- oder Ratenoption (Revolving) vieler Kreditkarten ist bequem, aber teuer: Statt den Saldo komplett auszugleichen, zahlst du nur einen Teil und der Rest wird mit hohen Zinsen weiterverzinst. Dieser Rechner zeigt für eine feste Monatsrate, wie lange die Rückzahlung dauert und wie viel Zinsen insgesamt anfallen.',
  howto: [
    'Gib den offenen Kartensaldo ein.',
    'Trage den effektiven Jahreszins der Teilzahlungsfunktion ein (oft 15–22 %).',
    'Lege deine feste monatliche Rate fest.',
    'Lies Laufzeit und gesamte Zinskosten ab.',
  ],
  faq: [
    { q: 'Warum ist die Teilzahlung so teuer?', a: 'Der Revolving-Kredit der Kreditkarte hat meist zweistellige Jahreszinsen. Eine niedrige Rate verlängert die Laufzeit stark, sodass sich die Zinsen über Jahre aufsummieren.' },
    { q: 'Was bedeutet "Rate zu niedrig"?', a: 'Ist die Monatsrate kleiner als der monatliche Zins auf den Saldo, tilgst du gar nicht – die Schuld wächst trotz Zahlungen weiter. Erhöhe dann die Rate.' },
    { q: 'Lohnt sich eine Umschuldung?', a: 'Fast immer. Ein klassischer Ratenkredit oder die vollständige Tilgung ist deutlich günstiger als der Teilzahlungszins der Karte.' },
  ],
  related: ['ratenkredit', 'dispozinsen-rechner', 'kreditrechner'],
  examples: [
    {
      values: { saldo: 2000, zins: 18, rate: 100 },
      expect: [
        { label: 'Laufzeit', value: 24, tolerance: 0 },
        { label: 'Zinskosten gesamt', value: 395.65, tolerance: 1 },
      ],
    },
    {
      values: { saldo: 3000, zins: 20, rate: 150 },
      expect: [{ label: 'Laufzeit', value: 25, tolerance: 0 }],
    },
  ],
  updated: '2026-06-19',
};
