import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'sparplan-rechner',
  category: 'finanzen',
  title: 'Sparplan-Rechner (Endkapital)',
  shortTitle: 'Sparplan',
  description:
    'Berechne das Endkapital eines Sparplans aus monatlicher Sparrate, Startkapital und jährlicher Rendite – mit eingezahlter Summe und Zinsgewinn.',
  keywords: [
    'sparplan rechner',
    'monatlich sparen rechner',
    'etf sparplan rechner',
    'sparrate endkapital',
    'ansparrechner',
    'vermögensaufbau rechner',
    'regelmäßig sparen zinsen',
  ],
  formula: 'Endkapital = Start × (1+i)^n + Rate × ((1+i)^n − 1)/i; i = Rendite/100/12; n = Monate',
  inputs: [
    { type: 'number', id: 'start', label: 'Startkapital', unit: '€', default: 0, min: 0, step: 100 },
    { type: 'number', id: 'rate', label: 'Monatliche Sparrate', unit: '€', default: 200, min: 0, step: 10 },
    { type: 'number', id: 'rendite', label: 'Rendite pro Jahr', unit: '%', default: 4, min: 0, step: 0.1 },
    { type: 'number', id: 'jahre', label: 'Spardauer', unit: 'Jahre', default: 10, min: 0, step: 1 },
  ],
  compute: (v) => {
    const start = num(v.start);
    const rate = num(v.rate);
    const rendite = num(v.rendite);
    const jahre = num(v.jahre);
    const n = Math.round(jahre * 12);
    const i = rendite / 100 / 12;
    let endkapital: number;
    if (i > 0) {
      const q = Math.pow(1 + i, n);
      endkapital = start * q + rate * (q - 1) / i;
    } else {
      endkapital = start + rate * n;
    }
    const eingezahlt = start + rate * n;
    const gewinn = endkapital - eingezahlt;
    return [
      { label: 'Endkapital', value: endkapital, unit: '€', digits: 2, primary: true },
      { label: 'Eingezahlt gesamt', value: eingezahlt, unit: '€', digits: 2 },
      { label: 'Zinsgewinn', value: gewinn, unit: '€', digits: 2 },
    ];
  },
  intro:
    'Mit einem Sparplan zahlst du regelmäßig einen festen Betrag ein – etwa in einen ETF oder ein Tagesgeldkonto. Dank Zinseszins wächst das Vermögen über die Jahre deutlich stärker als die reine Summe der Einzahlungen. Dieser Rechner geht von einer Einzahlung am Monatsende (nachschüssig) und einer konstanten Jahresrendite aus und zeigt Endkapital, eingezahlte Summe und Zinsgewinn.',
  howto: [
    'Trage ein eventuelles Startkapital ein (0, wenn du bei null beginnst).',
    'Gib die monatliche Sparrate in Euro ein.',
    'Lege die erwartete jährliche Rendite fest.',
    'Wähle die Spardauer in Jahren und lies Endkapital sowie Zinsgewinn ab.',
  ],
  faq: [
    { q: 'Wird vorschüssig oder nachschüssig gerechnet?', a: 'Der Rechner unterstellt eine Einzahlung am Monatsende (nachschüssig). Bei Einzahlung am Monatsanfang wäre das Endkapital geringfügig höher.' },
    { q: 'Ist die Rendite garantiert?', a: 'Nein. Bei Aktien- oder ETF-Sparplänen schwankt die Rendite und ist nicht garantiert. Die Eingabe ist ein Durchschnittswert für eine Modellrechnung.' },
    { q: 'Sind Steuern und Gebühren enthalten?', a: 'Nein. Auf Kapitalerträge fällt die Abgeltungsteuer an, und Sparpläne können Ordergebühren kosten. Beides senkt den realen Nettoertrag.' },
    { q: 'Wie wirkt eine längere Laufzeit?', a: 'Je länger gespart wird, desto stärker der Zinseszinseffekt. Der Zinsgewinn wächst überproportional, weil bereits erzielte Erträge mitverzinst werden.' },
    { q: 'Was, wenn ich keine Rendite eingebe?', a: 'Bei 0 Prozent entspricht das Endkapital exakt der Summe aus Startkapital und allen Einzahlungen, ohne Zinsgewinn.' },
  ],
  related: ['zinseszinsrechner', 'rendite-rechner', 'inflationsrechner'],
  examples: [
    {
      values: { start: 0, rate: 200, rendite: 4, jahre: 10 },
      expect: [
        { label: 'Endkapital', value: 29449.96, tolerance: 1 },
        { label: 'Eingezahlt gesamt', value: 24000, tolerance: 0.01 },
      ],
    },
  ],
  updated: '2026-06-18',
};
