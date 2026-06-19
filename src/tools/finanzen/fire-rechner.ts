import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'fire-rechner',
  category: 'finanzen',
  title: 'FIRE-Rechner (finanzielle Freiheit)',
  shortTitle: 'FIRE',
  description:
    'Berechne mit der 25x-Regel und der 4%-Entnahmeregel, wie viel Vermögen du für finanzielle Freiheit (FIRE) brauchst.',
  keywords: [
    'fire rechner',
    'finanzielle freiheit rechner',
    '25x regel rechner',
    '4 prozent regel rechner',
    'wie viel geld zum frei sein',
  ],
  formula: 'FIRE-Zahl = Jahresausgaben / (Entnahmerate/100) = Monatsausgaben × 12 × (100/Entnahmerate)',
  inputs: [
    { type: 'number', id: 'ausgaben', label: 'Monatliche Ausgaben', unit: '€', default: 2500, min: 0, step: 50, help: 'Dein gewünschter Lebensstandard pro Monat.' },
    { type: 'number', id: 'rate', label: 'Sichere Entnahmerate p.a.', unit: '%', default: 4, min: 0.5, step: 0.1, help: 'Klassisch 4 % (entspricht der 25x-Regel).' },
  ],
  compute: (v) => {
    const ausgaben = num(v.ausgaben);
    const rate = num(v.rate);
    const jahresausgaben = ausgaben * 12;
    const fireZahl = rate > 0 ? jahresausgaben / (rate / 100) : 0;
    const faktor = rate > 0 ? 100 / rate : 0;
    return [
      { label: 'Benötigtes Vermögen (FIRE-Zahl)', value: fireZahl, unit: '€', digits: 0, primary: true },
      { label: 'Jahresausgaben', value: jahresausgaben, unit: '€', digits: 0 },
      { label: 'Vermögens-Faktor', value: faktor, unit: '× Jahresausgaben', digits: 1, help: 'Bei 4 % entspricht das der 25x-Regel.' },
    ];
  },
  intro:
    'FIRE steht für „Financial Independence, Retire Early". Die Idee: Hast du das 25-Fache deiner Jahresausgaben angespart, kannst du laut der 4%-Regel jährlich 4 % entnehmen, ohne das Kapital langfristig aufzuzehren. Dieser Rechner ermittelt deine persönliche FIRE-Zahl. Die 4%-Regel basiert auf historischen US-Marktdaten (Trinity-Studie) und ist eine Orientierung, keine Garantie.',
  howto: [
    'Trage deine gewünschten monatlichen Ausgaben in der finanziellen Freiheit ein.',
    'Wähle die Entnahmerate – 4 % ist der klassische Wert (= 25x-Regel), konservativer sind 3–3,5 %.',
    'Lies die FIRE-Zahl ab: das Vermögen, das du für finanzielle Unabhängigkeit ansparen musst.',
  ],
  faq: [
    { q: 'Was ist die 25x-Regel?', a: 'Sie besagt, dass du das 25-Fache deiner Jahresausgaben ansparen solltest. Der Kehrwert von 4 % ist 25 – beide Regeln sind also identisch. Bei 3 % Entnahme wären es das 33-Fache.' },
    { q: 'Ist die 4%-Regel sicher?', a: 'Sie ist eine Faustregel aus historischen Daten und keine Garantie. Lange Niedrigzinsphasen, Crashs zu Beginn der Entnahme oder höhere Inflation können sie aushebeln. Viele wählen daher konservativer 3–3,5 %.' },
    { q: 'Sind Steuern und Inflation berücksichtigt?', a: 'Nein. Die 4%-Regel geht von inflationsangepassten Entnahmen aus, ignoriert hier aber Steuern auf Kapitalerträge. Plane einen Puffer ein.' },
  ],
  related: ['entnahmeplan-rechner', 'etf-sparplan-endwert-rechner', 'sparplan-rechner', 'zinseszinsrechner'],
  examples: [
    {
      values: { ausgaben: 2500, rate: 4 },
      expect: [
        { label: 'Benötigtes Vermögen (FIRE-Zahl)', value: 750000, tolerance: 0 },
        { label: 'Jahresausgaben', value: 30000, tolerance: 0 },
        { label: 'Vermögens-Faktor', value: 25, tolerance: 0 },
      ],
    },
  ],
  updated: '2026-06-19',
};
