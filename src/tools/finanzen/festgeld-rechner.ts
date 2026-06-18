import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'festgeld-rechner',
  category: 'finanzen',
  title: 'Festgeld-Rechner',
  shortTitle: 'Festgeld',
  description:
    'Berechne den Ertrag einer Festgeldanlage über mehrere Jahre – wahlweise mit jährlichem Zinseszins oder einfacher Verzinsung am Laufzeitende.',
  keywords: [
    'festgeld rechner',
    'festgeld zinsen berechnen',
    'festgeldkonto ertrag',
    'festgeld zinseszins',
    'festgeld endkapital',
    'festgeldanlage rechner',
  ],
  formula: 'Mit Zinseszins: Endkapital = Kapital × (1 + Zinssatz/100)^Jahre',
  inputs: [
    { type: 'number', id: 'kapital', label: 'Anlagebetrag', unit: '€', default: 20000, min: 0, step: 100 },
    { type: 'number', id: 'zinssatz', label: 'Zinssatz pro Jahr', unit: '%', default: 3.5, min: 0, step: 0.05 },
    { type: 'number', id: 'jahre', label: 'Laufzeit', unit: 'Jahre', default: 3, min: 1, step: 1 },
    {
      type: 'select', id: 'modus', label: 'Zinsmodus', default: 'zinseszins',
      options: [
        { value: 'zinseszins', label: 'Zinseszins (jährliche Gutschrift)' },
        { value: 'einfach', label: 'Einfache Zinsen (Gutschrift am Ende)' },
      ],
      help: 'Bei Laufzeiten über 1 Jahr schreiben Banken Zinsen oft jährlich gut (Zinseszins).',
    },
  ],
  compute: (v) => {
    const kapital = num(v.kapital);
    const zinssatz = num(v.zinssatz);
    const jahre = num(v.jahre);
    const i = zinssatz / 100;
    const modus = String(v.modus);
    let endkapital: number;
    if (modus === 'einfach') {
      endkapital = kapital * (1 + i * jahre);
    } else {
      endkapital = kapital * Math.pow(1 + i, jahre);
    }
    const zinsertrag = endkapital - kapital;
    return [
      { label: 'Endkapital', value: endkapital, unit: '€', digits: 2, primary: true },
      { label: 'Zinsertrag gesamt', value: zinsertrag, unit: '€', digits: 2 },
    ];
  },
  intro:
    'Beim Festgeld legst du einen Betrag für eine feste Laufzeit zu einem garantierten Zinssatz an. Dieser Rechner zeigt das Endkapital und den Zinsertrag – wahlweise mit jährlichem Zinseszins oder mit einfacher Verzinsung, falls die Zinsen erst am Laufzeitende ausgezahlt werden.',
  howto: [
    'Gib den Anlagebetrag in Euro ein.',
    'Trage den vereinbarten Jahreszins ein.',
    'Wähle die Laufzeit in Jahren.',
    'Lege fest, ob mit Zinseszins oder einfachen Zinsen gerechnet wird.',
  ],
  faq: [
    { q: 'Mit oder ohne Zinseszins?', a: 'Bei mehrjährigen Festgeldern schreiben viele Banken die Zinsen jährlich gut und verzinsen sie mit (Zinseszins). Werden alle Zinsen erst am Ende ausgezahlt, gilt die einfache Verzinsung.' },
    { q: 'Ist der Zins über die ganze Laufzeit fest?', a: 'Ja, das ist der Vorteil von Festgeld. Der Zinssatz bleibt für die gesamte Laufzeit unverändert garantiert.' },
    { q: 'Komme ich vorzeitig an mein Geld?', a: 'In der Regel nicht. Festgeld ist während der Laufzeit gebunden; eine vorzeitige Auflösung ist meist ausgeschlossen oder mit Zinsverlust verbunden.' },
  ],
  related: ['tagesgeld-rechner', 'zinseszinsrechner', 'zinsrechner'],
  examples: [
    {
      values: { kapital: 20000, zinssatz: 3.5, jahre: 3, modus: 'zinseszins' },
      expect: [
        { label: 'Endkapital', value: 22174.36, tolerance: 0.5 },
        { label: 'Zinsertrag gesamt', value: 2174.36, tolerance: 0.5 },
      ],
    },
    {
      values: { kapital: 20000, zinssatz: 3.5, jahre: 3, modus: 'einfach' },
      expect: [{ label: 'Zinsertrag gesamt', value: 2100, tolerance: 0.01 }],
    },
  ],
  updated: '2026-06-18',
};
