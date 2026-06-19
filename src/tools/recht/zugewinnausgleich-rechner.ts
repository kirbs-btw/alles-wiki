import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'zugewinnausgleich-rechner',
  category: 'recht',
  title: 'Zugewinnausgleich-Rechner (Scheidung, Näherung)',
  shortTitle: 'Zugewinnausgleich',
  description:
    'Berechne den Zugewinnausgleich bei Scheidung: Wer mehr Zugewinn erzielt hat, zahlt die Hälfte der Differenz aus (§ 1378 BGB, Orientierung Stand 2026).',
  keywords: [
    'zugewinnausgleich rechner',
    'zugewinnausgleich berechnen',
    'zugewinn scheidung',
    'zugewinngemeinschaft ausgleich',
    'ausgleichsforderung scheidung',
    'zugewinn ehe berechnen',
  ],
  formula:
    'Zugewinn je Partner = Endvermögen − Anfangsvermögen (≥ 0); Ausgleich = (höherer Zugewinn − niedrigerer Zugewinn) / 2',
  inputs: [
    { type: 'number', id: 'anfangA', label: 'Anfangsvermögen Partner A', unit: '€', default: 10000, min: 0, step: 1000, help: 'Vermögen bei Eheschließung (Schulden mindern es, mind. 0).' },
    { type: 'number', id: 'endA', label: 'Endvermögen Partner A', unit: '€', default: 120000, min: 0, step: 1000, help: 'Vermögen zum Stichtag der Scheidung.' },
    { type: 'number', id: 'anfangB', label: 'Anfangsvermögen Partner B', unit: '€', default: 5000, min: 0, step: 1000 },
    { type: 'number', id: 'endB', label: 'Endvermögen Partner B', unit: '€', default: 40000, min: 0, step: 1000 },
  ],
  compute: (v) => {
    const anfangA = num(v.anfangA);
    const endA = num(v.endA);
    const anfangB = num(v.anfangB);
    const endB = num(v.endB);
    // Zugewinn ist nie negativ (§ 1373 BGB): Verluste mindern den Zugewinn auf 0.
    const zugewinnA = Math.max(0, endA - anfangA);
    const zugewinnB = Math.max(0, endB - anfangB);
    const differenz = Math.abs(zugewinnA - zugewinnB);
    const ausgleich = differenz / 2;
    const zahler = zugewinnA > zugewinnB ? 'Partner A zahlt an B' : zugewinnB > zugewinnA ? 'Partner B zahlt an A' : 'Kein Ausgleich';
    return [
      { label: 'Ausgleichsforderung', value: ausgleich, unit: '€', digits: 2, primary: true },
      { label: 'Ausgleichspflicht', value: zahler },
      { label: 'Zugewinn Partner A', value: zugewinnA, unit: '€', digits: 2 },
      { label: 'Zugewinn Partner B', value: zugewinnB, unit: '€', digits: 2 },
      { label: 'Differenz der Zugewinne', value: differenz, unit: '€', digits: 2 },
    ];
  },
  intro:
    'Leben Eheleute im gesetzlichen Güterstand der Zugewinngemeinschaft, wird bei der Scheidung der während der Ehe erzielte Vermögenszuwachs ausgeglichen. Der Zugewinn jedes Partners ist die Differenz zwischen End- und Anfangsvermögen (mindestens 0). Wer den höheren Zugewinn erzielt hat, zahlt dem anderen die Hälfte der Differenz als Ausgleichsforderung (§§ 1373, 1378 BGB). Dieser Rechner liefert eine Orientierung (Stand 2026); Sonderfälle wie privilegiertes Anfangsvermögen (Erbschaften, Schenkungen) oder Indexierung bleiben unberücksichtigt.',
  howto: [
    'Anfangs- und Endvermögen für Partner A eintragen.',
    'Anfangs- und Endvermögen für Partner B eintragen.',
    'Ausgleichsforderung und Richtung der Zahlung ablesen.',
  ],
  faq: [
    { q: 'Wie wird der Zugewinnausgleich berechnet?', a: 'Für jeden Ehegatten wird der Zugewinn als Endvermögen minus Anfangsvermögen ermittelt (mindestens 0). Wer den größeren Zugewinn hat, zahlt dem anderen die Hälfte der Differenz aus (§ 1378 BGB).' },
    { q: 'Was zählt zum Anfangsvermögen?', a: 'Das Vermögen bei Eheschließung. Erbschaften und Schenkungen während der Ehe gelten als privilegiertes Anfangsvermögen und erhöhen den Zugewinn nicht – dieser Rechner berücksichtigt das vereinfacht nicht.' },
    { q: 'Kann der Zugewinn negativ sein?', a: 'Nein. Macht ein Ehegatte während der Ehe Verluste, beträgt sein Zugewinn 0. Ein negativer Zugewinn wird nicht angesetzt.' },
    { q: 'Welcher Stichtag gilt?', a: 'Für das Endvermögen ist der Tag der Zustellung des Scheidungsantrags maßgeblich, für das Anfangsvermögen der Tag der Eheschließung.' },
  ],
  related: ['gesetzliche-erbfolge-rechner', 'pflichtteil-rechner', 'anwaltskosten-rechner'],
  examples: [
    {
      values: { anfangA: 10000, endA: 120000, anfangB: 5000, endB: 40000 },
      expect: [
        { label: 'Zugewinn Partner A', value: 110000, tolerance: 0.5 },
        { label: 'Zugewinn Partner B', value: 35000, tolerance: 0.5 },
        { label: 'Ausgleichsforderung', value: 37500, tolerance: 0.5 },
      ],
    },
    {
      values: { anfangA: 0, endA: 50000, anfangB: 0, endB: 50000 },
      expect: [
        { label: 'Ausgleichsforderung', value: 0, tolerance: 0.01 },
      ],
    },
  ],
  updated: '2026-06-19',
};
