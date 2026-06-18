import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'akku-ladezeit-rechner',
  category: 'technik',
  title: 'Akku-Ladezeit-Rechner',
  shortTitle: 'Ladezeit',
  description:
    'Berechne die Ladezeit eines Akkus aus Kapazität (mAh) und Ladestrom (mA) – inklusive realistischem Ladeverlust-Faktor.',
  keywords: [
    'akku ladezeit berechnen',
    'ladezeit rechner mah',
    'wie lange laden akku',
    'ladedauer berechnen',
    'mah ladestrom ladezeit',
    'powerbank ladezeit',
  ],
  formula:
    'Ladezeit (h) = Kapazität (mAh) / Ladestrom (mA) × Verlustfaktor (theoretisch + Reserve)',
  inputs: [
    {
      type: 'number',
      id: 'kapazitaet',
      label: 'Akkukapazität',
      unit: 'mAh',
      default: 4000,
      min: 0,
      step: 100,
      help: 'Aufgedruckte Nennkapazität des Akkus, z. B. 4000 mAh bei einem Smartphone.',
    },
    {
      type: 'number',
      id: 'strom',
      label: 'Ladestrom',
      unit: 'mA',
      default: 2000,
      min: 1,
      step: 100,
      help: 'Effektiver Ladestrom des Netzteils (Ladeleistung in Watt / Akkuspannung).',
    },
    {
      type: 'select',
      id: 'modus',
      label: 'Berechnungsmodus',
      default: 'real',
      options: [
        { value: 'theorie', label: 'Theoretisch (Faktor 1,0)' },
        { value: 'real', label: 'Realistisch (Faktor 1,2)' },
      ],
      help: 'In der Praxis dauert Laden länger durch Wärme, Konstantspannungsphase und Verluste – Faktor 1,2 als Faustwert.',
    },
  ],
  compute: (v) => {
    const kapazitaet = num(v.kapazitaet);
    const strom = num(v.strom);
    const faktor = String(v.modus) === 'theorie' ? 1 : 1.2;
    const theorieStunden = strom > 0 ? kapazitaet / strom : 0;
    const stunden = theorieStunden * faktor;
    const minuten = stunden * 60;
    return [
      { label: 'Ladezeit', value: stunden, unit: 'h', digits: 2, primary: true },
      { label: 'Ladezeit in Minuten', value: minuten, unit: 'min', digits: 0 },
      { label: 'Theoretische Ladezeit', value: theorieStunden, unit: 'h', digits: 2 },
    ];
  },
  intro:
    'Wie lange ein leerer Akku zum vollen Laden braucht, hängt von seiner Kapazität und vom Ladestrom ab. Theoretisch gilt Ladezeit = Kapazität / Ladestrom. In der Praxis dauert es länger, weil moderne Lithium-Akkus zum Schluss in einer Konstantspannungsphase nur noch langsam laden und Wärme sowie Wirkungsgrad eine Rolle spielen. Mit dem realistischen Faktor 1,2 erhältst du eine alltagstaugliche Schätzung.',
  howto: [
    'Die Akkukapazität in mAh eingeben (steht auf dem Akku oder im Datenblatt).',
    'Den Ladestrom in mA eintragen (Ladeleistung in W geteilt durch die Akkuspannung).',
    'Modus wählen: theoretisch oder realistisch mit Reserve.',
    'Die geschätzte Ladezeit ablesen.',
  ],
  faq: [
    {
      q: 'Wie ermittle ich den Ladestrom in mA?',
      a: 'Teile die Ladeleistung (Watt) durch die Akkuspannung (oft rund 3,7 V bei Lithium-Zellen) und rechne in Milliampere um. Ein 18-W-Lader liefert grob 18 / 3,7 ≈ 4,9 A, also rund 4900 mA an die Zelle.',
    },
    {
      q: 'Warum dauert das echte Laden länger als die Theorie?',
      a: 'Lithium-Akkus laden nur die erste Phase mit vollem Strom (CC), danach folgt die Konstantspannungsphase (CV) mit sinkendem Strom. Zusätzlich gehen Energie als Wärme und durch den Wirkungsgrad verloren – daher der Aufschlag.',
    },
    {
      q: 'Gilt das auch für Powerbanks?',
      a: 'Ja, das Prinzip ist gleich. Bei Powerbanks kommt jedoch ein zusätzlicher Wandlungsverlust hinzu, sodass der reale Faktor oft sogar etwas höher liegt.',
    },
  ],
  related: ['akku-laufzeit-rechner', 'mah-zu-wh-rechner', 'watt-volt-ampere-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { kapazitaet: 4000, strom: 2000, modus: 'real' },
      expect: [
        { label: 'Ladezeit', value: 2.4, tolerance: 0.01 },
        { label: 'Theoretische Ladezeit', value: 2, tolerance: 0.001 },
      ],
    },
    {
      values: { kapazitaet: 3000, strom: 1500, modus: 'theorie' },
      expect: [{ label: 'Ladezeit', value: 2, tolerance: 0.001 }],
    },
  ],
};
