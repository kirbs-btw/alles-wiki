import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'akku-laufzeit-rechner',
  category: 'technik',
  title: 'Akku-Laufzeit-Rechner',
  shortTitle: 'Akku-Laufzeit',
  description:
    'Berechne die Laufzeit eines Akkus aus Kapazitaet (mAh) und Stromverbrauch (mA). Mit Wirkungsgrad-Faktor fuer realistische Werte.',
  keywords: [
    'akku laufzeit berechnen',
    'akku laufzeit rechner',
    'mah laufzeit berechnen',
    'batterie laufzeit',
    'betriebsdauer akku',
  ],
  formula: 'Laufzeit(h) = (Kapazitaet(mAh) / Verbrauch(mA)) x Wirkungsgrad',
  inputs: [
    { type: 'number', id: 'kapazitaet', label: 'Akkukapazitaet', unit: 'mAh', default: 3000, min: 0, step: 100 },
    { type: 'number', id: 'verbrauch', label: 'Stromverbrauch', unit: 'mA', default: 200, min: 0.1, step: 10 },
    { type: 'number', id: 'wirkungsgrad', label: 'Nutzbarer Anteil', unit: '%', default: 85, min: 1, max: 100, step: 1, help: 'Realer Wirkungsgrad, meist 80-90 %.' },
  ],
  compute: (v) => {
    const kapazitaet = num(v.kapazitaet);
    const verbrauch = num(v.verbrauch);
    const eta = num(v.wirkungsgrad) / 100;
    const stundenIdeal = verbrauch > 0 ? kapazitaet / verbrauch : 0;
    const stundenReal = stundenIdeal * eta;
    const minuten = stundenReal * 60;
    return [
      { label: 'Laufzeit', value: stundenReal, unit: 'h', digits: 2, primary: true },
      { label: 'Laufzeit in Minuten', value: minuten, unit: 'min', digits: 0 },
      { label: 'Theoretische Laufzeit', value: stundenIdeal, unit: 'h', digits: 2, help: 'Ohne Verluste.' },
    ];
  },
  intro:
    'Wie lange haelt ein Akku durch? Die Laufzeit ergibt sich grob aus Kapazitaet geteilt durch Stromverbrauch. Da nicht die gesamte Kapazitaet nutzbar ist, beruecksichtigt der Rechner einen Wirkungsgrad-Faktor fuer realistische Werte.',
  howto: [
    'Akkukapazitaet in mAh eingeben.',
    'Durchschnittlichen Stromverbrauch des Geraets in mA eintragen.',
    'Nutzbaren Anteil (Wirkungsgrad) anpassen, Standard 85 %.',
    'Laufzeit in Stunden und Minuten ablesen.',
  ],
  faq: [
    { q: 'Wie berechne ich die Akkulaufzeit?', a: 'Kapazitaet in mAh geteilt durch Stromverbrauch in mA ergibt die Laufzeit in Stunden. Ein 3000-mAh-Akku bei 200 mA Verbrauch haelt theoretisch 15 Stunden.' },
    { q: 'Warum ist die reale Laufzeit kuerzer?', a: 'Spannungsverluste, Selbstentladung und ein hoeherer Verbrauch bei sinkender Spannung verringern die nutzbare Kapazitaet. Realistisch sind 80-90 % der Nennkapazitaet.' },
    { q: 'Gilt das auch fuer Batterien?', a: 'Im Prinzip ja, wenn die Kapazitaet in mAh angegeben ist. Bei Batterien sinkt die Spannung jedoch staerker, daher ist der Wirkungsgrad oft niedriger.' },
  ],
  related: ['mah-zu-wh-rechner', 'pc-stromverbrauch-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { kapazitaet: 3000, verbrauch: 200, wirkungsgrad: 85 },
      expect: [
        { label: 'Laufzeit', value: 12.75, tolerance: 0.01 },
        { label: 'Theoretische Laufzeit', value: 15, tolerance: 0.01 },
      ],
    },
    {
      values: { kapazitaet: 5000, verbrauch: 500, wirkungsgrad: 100 },
      expect: [{ label: 'Laufzeit', value: 10, tolerance: 0.01 }],
    },
  ],
};
