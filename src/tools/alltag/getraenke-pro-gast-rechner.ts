import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'getraenke-pro-gast-rechner',
  category: 'alltag',
  title: 'Getränke-Mengen für Party berechnen',
  shortTitle: 'Getränke pro Gast',
  description:
    'Berechne, wie viele Liter und Flaschen Getränke du für eine Party brauchst – nach Gästezahl, Dauer und durchschnittlichem Bedarf pro Stunde.',
  keywords: [
    'getraenke party berechnen',
    'getraenke pro gast',
    'wie viel getraenke party',
    'party planung getraenke rechner',
    'liter pro gast',
    'flaschen berechnen party',
    'getraenkemenge feier',
  ],
  formula:
    'Liter gesamt = Gäste × Dauer × Bedarf pro Stunde; Flaschen = Liter gesamt / Flaschengröße (aufgerundet)',
  inputs: [
    { type: 'number', id: 'gaeste', label: 'Anzahl Gäste', default: 20, min: 1, step: 1 },
    { type: 'number', id: 'stunden', label: 'Dauer der Feier', unit: 'Std.', default: 5, min: 1, step: 1 },
    { type: 'number', id: 'bedarf', label: 'Bedarf pro Gast & Stunde', unit: 'l', default: 0.4, min: 0, step: 0.1, help: 'Richtwert: ca. 0,3–0,5 l pro Stunde.' },
    { type: 'number', id: 'flaschengroesse', label: 'Flaschen-/Gebindegröße', unit: 'l', default: 1, min: 0.1, step: 0.1 },
  ],
  compute: (v) => {
    const gaeste = Math.max(1, Math.round(num(v.gaeste, 1)));
    const stunden = num(v.stunden);
    const bedarf = num(v.bedarf);
    const flGroesse = num(v.flaschengroesse, 1);
    const literGesamt = gaeste * stunden * bedarf;
    const flaschen = flGroesse > 0 ? Math.ceil(literGesamt / flGroesse) : 0;
    const literProGast = gaeste > 0 ? literGesamt / gaeste : 0;
    return [
      { label: 'Getränke gesamt', value: literGesamt, unit: 'l', digits: 1, primary: true },
      { label: 'Benötigte Flaschen', value: flaschen, unit: 'Stück', digits: 0, help: 'Auf volle Flaschen aufgerundet.' },
      { label: 'Pro Gast', value: literProGast, unit: 'l', digits: 2 },
    ];
  },
  intro:
    'Bei einer Feier ist es ärgerlich, wenn die Getränke ausgehen. Als Faustregel rechnet man pro Gast und Stunde rund 0,3 bis 0,5 Liter. Dieser Rechner multipliziert Gästezahl, Dauer und Bedarf zur Gesamtmenge und rechnet sie in volle Flaschen oder Gebinde um, damit du gezielt einkaufen kannst.',
  howto: [
    'Gib die erwartete Gästezahl ein.',
    'Trage ein, wie lange die Feier voraussichtlich dauert.',
    'Wähle den Bedarf pro Gast und Stunde (0,4 l ist ein guter Mittelwert).',
    'Gib die Flaschen- oder Gebindegröße an und lies die benötigte Anzahl Flaschen ab.',
  ],
  faq: [
    { q: 'Wie viel Getränke pro Gast plant man?', a: 'Als grober Richtwert gelten 0,3 bis 0,5 Liter pro Gast und Stunde. An warmen Tagen oder bei langen Feiern eher mehr.' },
    { q: 'Soll ich für alkoholische und alkoholfreie Getränke getrennt rechnen?', a: 'Ja, das ist sinnvoll. Rechne z. B. einmal für Bier/Wein und einmal für Wasser/Softdrinks mit jeweils passendem Bedarf pro Stunde.' },
    { q: 'Warum wird auf volle Flaschen aufgerundet?', a: 'Im Handel kaufst du ganze Flaschen oder Kästen. Aufrunden stellt sicher, dass du nicht knapp kalkulierst.' },
    { q: 'Wie viele Gläser sind ein Liter?', a: 'Das hängt vom Getränk ab: Ein Liter ergibt etwa fünf Sekt-/Weingläser (0,2 l), vier Wassergläser (0,25 l) oder rund drei Biergläser (0,33 l).' },
  ],
  related: ['partymengen-rechner', 'rechnung-splitten-rechner', 'rezept-portionen-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { gaeste: 20, stunden: 5, bedarf: 0.4, flaschengroesse: 1 },
      expect: [
        { label: 'Getränke gesamt', value: 40, tolerance: 0.1 },
        { label: 'Benötigte Flaschen', value: 40, tolerance: 0.5 },
      ],
    },
    {
      values: { gaeste: 10, stunden: 4, bedarf: 0.5, flaschengroesse: 0.75 },
      expect: [
        { label: 'Getränke gesamt', value: 20, tolerance: 0.1 },
        { label: 'Benötigte Flaschen', value: 27, tolerance: 0.5 },
      ],
    },
  ],
};
