import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'heizkostenanteil-rechner',
  category: 'wohnen',
  title: 'Heizkostenanteil-Rechner (70/30)',
  shortTitle: 'Heizkostenanteil',
  description:
    'Berechne deinen Heizkostenanteil nach der Heizkostenverordnung: 70 % nach Verbrauch und 30 % nach Wohnfläche – plus deine Nachzahlung oder dein Guthaben.',
  keywords: [
    'heizkostenanteil berechnen',
    'heizkostenverordnung 70 30',
    'heizkostenabrechnung prüfen',
    'verbrauch grundkosten heizung',
    'heizkosten verteilen',
    'heizkosten pro quadratmeter',
    'heizkostenabrechnung rechner',
  ],
  formula:
    'Anteil = Gesamtkosten × Grundanteil × (Fläche/Gesamtfläche) + Gesamtkosten × Verbrauchsanteil × (Verbrauch/Gesamtverbrauch)',
  inputs: [
    { type: 'number', id: 'gesamtkosten', label: 'Gesamte Heizkosten (Jahr)', unit: '€', default: 9000, min: 0, step: 100 },
    {
      type: 'select', id: 'verteilung', label: 'Verteilung Verbrauch/Grundkosten', default: '70',
      options: [
        { value: '70', label: '70 % Verbrauch / 30 % Fläche (Standard)' },
        { value: '50', label: '50 % Verbrauch / 50 % Fläche' },
      ],
    },
    { type: 'number', id: 'gesamtflaeche', label: 'Gesamtwohnfläche', unit: 'm²', default: 600, min: 1, step: 1 },
    { type: 'number', id: 'eigeneflaeche', label: 'Eigene Wohnfläche', unit: 'm²', default: 75, min: 1, step: 1 },
    { type: 'number', id: 'gesamtverbrauch', label: 'Gesamtverbrauch (Einheiten/kWh)', unit: 'Einh.', default: 90000, min: 1, step: 100 },
    { type: 'number', id: 'eigenverbrauch', label: 'Eigener Verbrauch (Einheiten/kWh)', unit: 'Einh.', default: 12000, min: 0, step: 100 },
    { type: 'number', id: 'vorauszahlung', label: 'Geleistete Vorauszahlung (Jahr)', unit: '€', default: 1200, min: 0, step: 50 },
  ],
  compute: (v) => {
    const gesamtkosten = num(v.gesamtkosten);
    const verbrauchAnteilProz = num(v.verteilung, 70) / 100;
    const grundAnteilProz = 1 - verbrauchAnteilProz;
    const gesamtflaeche = num(v.gesamtflaeche);
    const eigeneflaeche = num(v.eigeneflaeche);
    const gesamtverbrauch = num(v.gesamtverbrauch);
    const eigenverbrauch = num(v.eigenverbrauch);
    const vorauszahlung = num(v.vorauszahlung);
    const grundkosten = gesamtkosten * grundAnteilProz * (gesamtflaeche > 0 ? eigeneflaeche / gesamtflaeche : 0);
    const verbrauchskosten = gesamtkosten * verbrauchAnteilProz * (gesamtverbrauch > 0 ? eigenverbrauch / gesamtverbrauch : 0);
    const anteil = grundkosten + verbrauchskosten;
    const saldo = vorauszahlung - anteil;
    return [
      { label: 'Heizkostenanteil gesamt', value: anteil, unit: '€', digits: 2, primary: true },
      { label: 'Grundkosten (Fläche)', value: grundkosten, unit: '€', digits: 2 },
      { label: 'Verbrauchskosten', value: verbrauchskosten, unit: '€', digits: 2 },
      { label: 'Saldo (Guthaben +/Nachzahlung −)', value: saldo, unit: '€', digits: 2 },
    ];
  },
  intro:
    'Die Heizkostenverordnung schreibt vor, dass Heizkosten überwiegend verbrauchsabhängig abgerechnet werden müssen. Üblich ist die 70/30-Aufteilung: 70 % der Kosten werden nach dem gemessenen Verbrauch verteilt, 30 % als Grundkosten nach Wohnfläche. So zahlt jeder Haushalt einen fairen, am tatsächlichen Verbrauch orientierten Anteil.',
  howto: [
    'Gesamte Heizkosten des Hauses pro Jahr eintragen.',
    'Verteilungsschlüssel wählen (Standard 70/30).',
    'Eigene und gesamte Wohnfläche sowie eigenen und Gesamtverbrauch eingeben.',
    'Vorauszahlung ergänzen und Heizkostenanteil samt Saldo ablesen.',
  ],
  faq: [
    { q: 'Warum 70 % Verbrauch und 30 % Fläche?', a: 'Die Heizkostenverordnung verlangt eine verbrauchsabhängige Abrechnung von 50 bis 70 %. Die 70/30-Aufteilung ist am gängigsten, weil sie sparsames Heizen am stärksten belohnt. Der Rest wird als verbrauchsunabhängige Grundkosten nach Fläche verteilt.' },
    { q: 'Was sind Grundkosten bei der Heizung?', a: 'Grundkosten decken verbrauchsunabhängige Aufwendungen wie Betriebsbereitschaft, Wartung und Wärmeverluste im Verteilnetz ab. Sie werden nach beheizter Wohnfläche umgelegt, unabhängig vom individuellen Heizverhalten.' },
    { q: 'In welchen Einheiten wird der Verbrauch erfasst?', a: 'Je nach Messgerät in Heizkostenverteiler-Einheiten, Kilowattstunden oder Kubikmetern. Wichtig ist nur, dass eigener und Gesamtverbrauch in derselben Einheit eingetragen werden, da der Anteil als Verhältnis berechnet wird.' },
    { q: 'Wann darf ich die Heizkosten kürzen?', a: 'Wird der Verbrauch entgegen der Heizkostenverordnung nicht erfasst, dürfen Mieter ihren Heizkostenanteil pauschal um 15 % kürzen. Prüfe deine Abrechnung daher auf eine verbrauchsabhängige Erfassung.' },
  ],
  related: ['nebenkosten-umlage-rechner', 'wohnflaeche-rechner', 'quadratmeterpreis-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { gesamtkosten: 9000, verteilung: '70', gesamtflaeche: 600, eigeneflaeche: 75, gesamtverbrauch: 90000, eigenverbrauch: 12000, vorauszahlung: 1200 },
      expect: [
        { label: 'Grundkosten (Fläche)', value: 337.5, tolerance: 0.01 },
        { label: 'Verbrauchskosten', value: 840, tolerance: 0.01 },
        { label: 'Heizkostenanteil gesamt', value: 1177.5, tolerance: 0.01 },
      ],
    },
  ],
};
