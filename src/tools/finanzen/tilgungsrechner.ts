import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'tilgungsrechner',
  category: 'finanzen',
  title: 'Tilgungsrechner (Laufzeit)',
  shortTitle: 'Tilgungsrechner',
  description:
    'Berechne, wie lange die Rückzahlung eines Darlehens dauert: aus Darlehensbetrag, Sollzins und monatlicher Rate ergeben sich Laufzeit und Zinskosten.',
  keywords: [
    'tilgungsrechner',
    'laufzeit darlehen berechnen',
    'wie lange kredit abbezahlen',
    'tilgungsdauer rechner',
    'kredit laufzeit rechner',
    'rate tilgung rechner',
    'restschuld tilgen',
  ],
  formula: 'Laufzeit n = −ln(1 − K × i / Rate) / ln(1 + i); i = Sollzins/100/12',
  inputs: [
    { type: 'number', id: 'darlehen', label: 'Darlehensbetrag', unit: '€', default: 100000, min: 0, step: 1000 },
    { type: 'number', id: 'sollzins', label: 'Sollzins pro Jahr', unit: '%', default: 4, min: 0, step: 0.1 },
    { type: 'number', id: 'rate', label: 'Monatliche Rate', unit: '€', default: 600, min: 1, step: 10 },
  ],
  compute: (v) => {
    const darlehen = num(v.darlehen);
    const sollzins = num(v.sollzins);
    const rate = num(v.rate);
    const i = sollzins / 100 / 12;
    const ersterZins = darlehen * i;
    let monate: number;
    if (i <= 0) {
      monate = rate > 0 ? darlehen / rate : 0;
    } else if (rate <= ersterZins) {
      // Rate deckt nicht einmal den Zins -> keine Tilgung möglich
      monate = 0;
    } else {
      monate = -Math.log(1 - (darlehen * i) / rate) / Math.log(1 + i);
    }
    const jahre = monate / 12;
    const gesamt = rate * monate;
    const zinsen = monate > 0 ? gesamt - darlehen : 0;
    return [
      { label: 'Laufzeit', value: jahre, unit: 'Jahre', digits: 1, primary: true },
      { label: 'Laufzeit in Monaten', value: monate, unit: 'Monate', digits: 0 },
      { label: 'Zinskosten gesamt', value: zinsen, unit: '€', digits: 2 },
    ];
  },
  intro:
    'Wie lange dauert es, bis ein Darlehen vollständig getilgt ist? Das hängt von Darlehensbetrag, Sollzins und der monatlichen Rate ab. Dieser Rechner löst die Annuitätenformel nach der Laufzeit auf und zeigt zugleich die gesamten Zinskosten. Wichtig: Die Rate muss höher sein als der monatliche Zins, sonst tilgst du nichts.',
  howto: [
    'Gib den Darlehensbetrag bzw. die Restschuld ein.',
    'Trage den jährlichen Sollzins ein.',
    'Lege die monatliche Rate fest, die du zahlen kannst.',
    'Ergebnis: Laufzeit in Jahren und Monaten sowie die Zinskosten.',
  ],
  faq: [
    { q: 'Warum zeigt der Rechner 0 Monate Laufzeit?', a: 'Dann reicht deine Rate nicht aus, um neben dem Zins auch zu tilgen. Die Rate muss höher sein als die Zinsen des ersten Monats, sonst wird die Schuld nie kleiner.' },
    { q: 'Wie verkürze ich die Laufzeit?', a: 'Eine höhere monatliche Rate oder ein niedrigerer Zins verkürzt die Laufzeit deutlich. Auch Sondertilgungen helfen, sind hier aber nicht berücksichtigt.' },
    { q: 'Gilt der Rechner auch für Restschulden?', a: 'Ja. Gib statt des ursprünglichen Darlehens einfach die aktuelle Restschuld ein, um die verbleibende Laufzeit zu berechnen.' },
    { q: 'Ist die Laufzeit exakt?', a: 'Die Formel rechnet mit konstanter monatlicher Verzinsung. In der Praxis kann die letzte Rate kleiner ausfallen, sodass die tatsächliche Laufzeit minimal abweicht.' },
  ],
  related: ['kreditrechner', 'ratenkredit', 'zinsrechner'],
  examples: [
    {
      values: { darlehen: 100000, sollzins: 4, rate: 600 },
      expect: [
        { label: 'Laufzeit in Monaten', value: 244, tolerance: 1 },
        { label: 'Laufzeit', value: 20.3, tolerance: 0.1 },
      ],
    },
  ],
  updated: '2026-06-18',
};
