import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'kreditrechner',
  category: 'finanzen',
  title: 'Kreditrechner (Annuitätendarlehen)',
  shortTitle: 'Kreditrechner',
  description:
    'Berechne die monatliche Rate eines Annuitätendarlehens aus Darlehensbetrag, Sollzins und anfänglicher Tilgung – mit Restschuld nach einem Jahr.',
  keywords: [
    'kreditrechner',
    'annuitätendarlehen rechner',
    'monatliche rate berechnen',
    'darlehen rate rechner',
    'baufinanzierung rechner',
    'tilgung und zins',
    'kreditrate berechnen',
  ],
  formula: 'Jahresrate = Darlehen × (Sollzins% + Tilgung%) / 100; Monatsrate = Jahresrate / 12',
  inputs: [
    { type: 'number', id: 'darlehen', label: 'Darlehensbetrag', unit: '€', default: 200000, min: 0, step: 1000 },
    { type: 'number', id: 'sollzins', label: 'Sollzins pro Jahr', unit: '%', default: 3, min: 0, step: 0.1 },
    { type: 'number', id: 'tilgung', label: 'Anfängliche Tilgung', unit: '%', default: 2, min: 0.1, step: 0.1 },
  ],
  compute: (v) => {
    const darlehen = num(v.darlehen);
    const sollzins = num(v.sollzins);
    const tilgung = num(v.tilgung);
    const jahresrate = darlehen * (sollzins + tilgung) / 100;
    const monatsrate = jahresrate / 12;
    const i = sollzins / 100 / 12;
    // Restschuld nach 12 Monaten (monatliche Verzinsung, gleichbleibende Rate)
    let rest = darlehen;
    for (let mIdx = 0; mIdx < 12; mIdx++) {
      const zins = rest * i;
      rest = rest - (monatsrate - zins);
    }
    const restschuld = rest > 0 ? rest : 0;
    const zinsAnteilMonat1 = darlehen * i;
    return [
      { label: 'Monatsrate', value: monatsrate, unit: '€', digits: 2, primary: true },
      { label: 'Zinsanteil 1. Monat', value: zinsAnteilMonat1, unit: '€', digits: 2 },
      { label: 'Restschuld nach 1 Jahr', value: restschuld, unit: '€', digits: 2 },
    ];
  },
  intro:
    'Beim Annuitätendarlehen bleibt die monatliche Rate über die Zinsbindung konstant. Anfangs steckt darin viel Zins und wenig Tilgung; mit sinkender Restschuld dreht sich das Verhältnis um. Über die anfängliche Tilgung steuerst du, wie schnell der Kredit getilgt wird. Dieser Rechner liefert Rate, Zinsanteil und die Restschuld nach dem ersten Jahr.',
  howto: [
    'Gib den Darlehensbetrag in Euro ein.',
    'Trage den jährlichen Sollzins ein (nominaler Zinssatz, nicht Effektivzins).',
    'Wähle die anfängliche Tilgung – üblich sind 1 bis 3 Prozent.',
    'Ergebnis: monatliche Rate, Zinsanteil und Restschuld nach einem Jahr.',
  ],
  faq: [
    { q: 'Was ist die anfängliche Tilgung?', a: 'Sie gibt an, welcher Anteil des Darlehens im ersten Jahr getilgt wird. Eine höhere Tilgung bedeutet eine höhere Rate, aber eine schnellere Entschuldung und weniger Zinskosten.' },
    { q: 'Sollzins oder Effektivzins eingeben?', a: 'Für diese Annuitätenformel gibst du den nominalen Sollzins ein. Der Effektivzins enthält zusätzlich Nebenkosten und liegt meist etwas höher.' },
    { q: 'Warum bleibt die Rate gleich, obwohl die Tilgung steigt?', a: 'Da die Restschuld sinkt, fällt der Zinsanteil. Der eingesparte Zins fließt automatisch in die Tilgung – die Gesamtrate bleibt deshalb konstant.' },
    { q: 'Ist das Darlehen damit komplett abbezahlt?', a: 'Die Zinsbindung endet meist vor der vollständigen Tilgung. Wie lange die komplette Rückzahlung dauert, zeigt der Tilgungsrechner.' },
  ],
  related: ['tilgungsrechner', 'ratenkredit', 'zinsrechner'],
  examples: [
    {
      values: { darlehen: 200000, sollzins: 3, tilgung: 2 },
      expect: [
        { label: 'Monatsrate', value: 833.33, tolerance: 0.05 },
        { label: 'Restschuld nach 1 Jahr', value: 195944.54, tolerance: 1 },
      ],
    },
  ],
  updated: '2026-06-18',
};
