import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'ratenkredit',
  category: 'finanzen',
  title: 'Ratenkredit-Rechner',
  shortTitle: 'Ratenkredit',
  description:
    'Berechne die monatliche Rate eines Ratenkredits aus Kreditbetrag, Sollzins und Laufzeit in Monaten – mit Gesamtkosten und gesamtem Zinsbetrag.',
  keywords: [
    'ratenkredit rechner',
    'monatliche rate kredit',
    'ratenkredit berechnen',
    'konsumkredit rechner',
    'kreditrate monatlich',
    'kredit zinsen berechnen',
    'gesamtkosten kredit',
  ],
  formula: 'Rate = K × i × (1+i)^n / ((1+i)^n − 1); i = Sollzins/100/12; n = Laufzeit in Monaten',
  inputs: [
    { type: 'number', id: 'betrag', label: 'Kreditbetrag', unit: '€', default: 10000, min: 0, step: 100 },
    { type: 'number', id: 'sollzins', label: 'Sollzins pro Jahr', unit: '%', default: 6, min: 0, step: 0.1 },
    { type: 'number', id: 'monate', label: 'Laufzeit', unit: 'Monate', default: 36, min: 1, step: 1 },
  ],
  compute: (v) => {
    const betrag = num(v.betrag);
    const sollzins = num(v.sollzins);
    const n = Math.max(1, Math.round(num(v.monate, 1)));
    const i = sollzins / 100 / 12;
    let rate: number;
    if (i > 0) {
      const q = Math.pow(1 + i, n);
      rate = betrag * i * q / (q - 1);
    } else {
      rate = betrag / n;
    }
    const gesamt = rate * n;
    const zinsen = gesamt - betrag;
    return [
      { label: 'Monatsrate', value: rate, unit: '€', digits: 2, primary: true },
      { label: 'Zinskosten gesamt', value: zinsen, unit: '€', digits: 2 },
      { label: 'Rückzahlung gesamt', value: gesamt, unit: '€', digits: 2 },
    ];
  },
  intro:
    'Ein Ratenkredit wird in gleichbleibenden monatlichen Raten über eine feste Laufzeit zurückgezahlt. Jede Rate enthält Zins und Tilgung; der Zinsanteil sinkt mit jeder Zahlung. Dieser Rechner ermittelt die Monatsrate sowie die gesamten Zinskosten über die komplette Laufzeit. Für eine genaue Vergleichszahl beim Kreditangebot zählt zusätzlich der angegebene Effektivzins.',
  howto: [
    'Gib den gewünschten Kreditbetrag in Euro ein.',
    'Trage den jährlichen Sollzins ein.',
    'Wähle die Laufzeit in Monaten (z. B. 36 für drei Jahre).',
    'Ergebnis: Monatsrate, gesamte Zinskosten und Gesamtrückzahlung.',
  ],
  faq: [
    { q: 'Was unterscheidet Soll- und Effektivzins?', a: 'Der Sollzins ist der reine Zins auf die Kreditsumme. Der Effektivzins berücksichtigt zusätzlich Auszahlungs- und Zahlungstermine sowie bestimmte Gebühren und ist der bessere Vergleichswert.' },
    { q: 'Wie senke ich die Monatsrate?', a: 'Eine längere Laufzeit senkt die Rate, erhöht aber die gesamten Zinskosten. Eine kürzere Laufzeit ist teurer im Monat, aber günstiger über die gesamte Laufzeit.' },
    { q: 'Sind Sondertilgungen berücksichtigt?', a: 'Nein, der Rechner geht von gleichbleibenden Raten ohne Sondertilgung aus. Sondertilgungen verkürzen die Laufzeit und senken die Zinskosten zusätzlich.' },
    { q: 'Warum ist die Rate bei 0 % gleich Betrag durch Monate?', a: 'Ohne Zinsen wird nur die reine Kreditsumme getilgt, also gleichmäßig auf die Monate verteilt. Das kann bei Null-Prozent-Finanzierungen vorkommen.' },
  ],
  related: ['kreditrechner', 'tilgungsrechner', 'zinsrechner'],
  examples: [
    {
      values: { betrag: 10000, sollzins: 6, monate: 36 },
      expect: [
        { label: 'Monatsrate', value: 304.22, tolerance: 0.05 },
        { label: 'Zinskosten gesamt', value: 951.9, tolerance: 1 },
      ],
    },
  ],
  updated: '2026-06-18',
};
