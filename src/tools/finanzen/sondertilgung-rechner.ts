import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'sondertilgung-rechner',
  category: 'finanzen',
  title: 'Sondertilgung-Ersparnis-Rechner',
  shortTitle: 'Sondertilgung',
  description:
    'Berechne, wie viele Monate und wie viel Zinsen du sparst, wenn du bei deinem Annuitätendarlehen eine einmalige Sondertilgung leistest.',
  keywords: [
    'sondertilgung rechner',
    'sondertilgung ersparnis',
    'sondertilgung zinsen sparen',
    'kredit schneller abbezahlen',
    'sondertilgung laufzeit',
    'darlehen sondertilgung berechnen',
  ],
  formula: 'Restlaufzeit n = −ln(1 − Restschuld×i/Rate) / ln(1+i); Sondertilgung senkt die Restschuld',
  inputs: [
    { type: 'number', id: 'restschuld', label: 'Aktuelle Restschuld', unit: '€', default: 150000, min: 0, step: 1000 },
    { type: 'number', id: 'zins', label: 'Sollzins pro Jahr', unit: '%', default: 3.5, min: 0.01, step: 0.05 },
    { type: 'number', id: 'rate', label: 'Monatliche Rate', unit: '€', default: 800, min: 1, step: 10 },
    { type: 'number', id: 'sonder', label: 'Sondertilgung (einmalig)', unit: '€', default: 20000, min: 0, step: 500 },
  ],
  compute: (v) => {
    const rest = num(v.restschuld);
    const zins = num(v.zins);
    const rate = num(v.rate);
    const sonder = Math.min(num(v.sonder), rest);
    const i = zins / 100 / 12;

    const laufzeit = (schuld: number): number => {
      if (schuld <= 0) return 0;
      if (rate <= schuld * i) return Infinity; // Rate deckt nicht einmal die Zinsen
      return -Math.log(1 - schuld * i / rate) / Math.log(1 + i);
    };

    const nOhne = laufzeit(rest);
    const nMit = laufzeit(rest - sonder);
    const ersparnisMonate = nOhne - nMit;

    // Gezahlte Zinsen = gezahlte Raten - getilgte Schuld
    const zinsenOhne = Number.isFinite(nOhne) ? rate * nOhne - rest : Infinity;
    const zinsenMit = Number.isFinite(nMit) ? rate * nMit - (rest - sonder) : Infinity;
    const zinsErsparnis = Number.isFinite(zinsenOhne) && Number.isFinite(zinsenMit) ? zinsenOhne - zinsenMit : 0;

    return [
      { label: 'Zinsersparnis', value: zinsErsparnis, unit: '€', digits: 2, primary: true },
      { label: 'Verkürzung der Laufzeit', value: ersparnisMonate, unit: 'Monate', digits: 1 },
      { label: 'Restlaufzeit ohne Sondertilgung', value: nOhne, unit: 'Monate', digits: 1 },
      { label: 'Restlaufzeit mit Sondertilgung', value: nMit, unit: 'Monate', digits: 1 },
    ];
  },
  intro:
    'Eine Sondertilgung senkt die Restschuld direkt und wirkt überproportional, weil dadurch alle künftigen Zinsen auf diesen Betrag entfallen. Dieser Rechner vergleicht die Restlaufzeit mit und ohne eine einmalige Sondertilgung und zeigt, wie viel Zins du sparst. Die Monatsrate bleibt dabei konstant.',
  howto: [
    'Gib deine aktuelle Restschuld ein.',
    'Trage den Sollzins und deine konstante Monatsrate ein.',
    'Gib die Höhe der geplanten Sondertilgung ein.',
    'Lies Zinsersparnis und Laufzeitverkürzung ab.',
  ],
  faq: [
    { q: 'Warum spart eine Sondertilgung so viel Zins?', a: 'Der eingezahlte Betrag reduziert die Schuld sofort. Auf diesen Teil fallen über die gesamte Restlaufzeit keine Zinsen mehr an – der Effekt ist daher größer als der einmalige Betrag.' },
    { q: 'Bleibt die Rate gleich?', a: 'Ja, der Rechner unterstellt eine gleichbleibende Monatsrate. Dadurch verkürzt sich die Laufzeit. Alternativ könnte man die Rate senken und die Laufzeit halten.' },
    { q: 'Sind Sondertilgungen immer erlaubt?', a: 'Nicht unbegrenzt. Viele Verträge erlauben pro Jahr eine bestimmte Sondertilgung (oft 5 % der Darlehenssumme) ohne Vorfälligkeitsentschädigung. Prüfe deinen Vertrag.' },
  ],
  related: ['restschuld-rechner', 'tilgungsrechner', 'kreditrechner'],
  examples: [
    {
      values: { restschuld: 150000, zins: 3.5, rate: 800, sonder: 20000 },
      expect: [
        { label: 'Verkürzung der Laufzeit', value: 51.2, tolerance: 0.5 },
        { label: 'Restlaufzeit ohne Sondertilgung', value: 271.8, tolerance: 0.5 },
        { label: 'Zinsersparnis', value: 20986.49, tolerance: 5 },
      ],
    },
  ],
  updated: '2026-06-18',
};
