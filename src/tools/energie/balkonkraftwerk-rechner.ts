import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'balkonkraftwerk-rechner',
  category: 'energie',
  title: 'Balkonkraftwerk-Rechner (Amortisation)',
  shortTitle: 'Balkonkraftwerk',
  description:
    'Berechne Ertrag, Stromersparnis und Amortisationszeit eines Balkonkraftwerks aus Modulleistung, spezifischem Ertrag und Eigenverbrauch.',
  keywords: [
    'balkonkraftwerk rechner',
    'balkonkraftwerk ertrag',
    'balkonkraftwerk amortisation',
    'mini pv ersparnis',
    'stecker solar rechner',
    'balkonkraftwerk lohnt sich',
    'balkonsolar ertrag berechnen',
  ],
  intro:
    'Dieser Rechner zeigt, wie schnell sich ein Balkonkraftwerk lohnt. Aus der Modulleistung und dem spezifischen Jahresertrag ergibt sich der erzeugte Strom. Da Mini-PV-Strom direkt im Haushalt genutzt wird, zählt vor allem der Eigenverbrauch - er ersetzt teuren Netzstrom. Anschaffungskosten geteilt durch die Jahresersparnis ergeben die Amortisationszeit.',
  formula: 'Ersparnis = Ertrag × Eigenverbrauch × Strompreis; Amortisation = Anschaffung ÷ Ersparnis',
  inputs: [
    { type: 'number', id: 'leistung', label: 'Modulleistung', unit: 'Wp', default: 800, min: 0, step: 50, help: 'Seit 2024 sind in Deutschland 800 W Einspeiseleistung erlaubt.' },
    { type: 'number', id: 'spezertrag', label: 'Spezifischer Ertrag', unit: 'kWh/kWp', default: 850, min: 0, step: 10, help: 'Süddach optimal ~950, Ostbalkon ~650, Norden weniger.' },
    { type: 'number', id: 'eigenverbrauch', label: 'Eigenverbrauchsanteil', unit: '%', default: 70, min: 0, max: 100, step: 5, help: 'Anteil, der im Haushalt genutzt statt eingespeist wird.' },
    { type: 'number', id: 'strompreis', label: 'Strompreis', unit: 'ct/kWh', default: 35, min: 0, step: 1 },
    { type: 'number', id: 'anschaffung', label: 'Anschaffungskosten', unit: '€', default: 600, min: 0, step: 10 },
  ],
  compute: (v) => {
    const leistungKwp = num(v.leistung) / 1000;
    const spez = num(v.spezertrag);
    const eigen = num(v.eigenverbrauch) / 100;
    const preis = num(v.strompreis) / 100;
    const anschaffung = num(v.anschaffung);
    const ertrag = leistungKwp * spez;
    const genutzt = ertrag * eigen;
    const ersparnis = genutzt * preis;
    const amortisation = ersparnis > 0 ? anschaffung / ersparnis : 0;
    return [
      { label: 'Stromersparnis pro Jahr', value: ersparnis, unit: '€', digits: 2, primary: true },
      { label: 'Amortisationszeit', value: amortisation, unit: 'Jahre', digits: 1 },
      { label: 'Jahresertrag', value: ertrag, unit: 'kWh', digits: 0 },
      { label: 'Davon selbst genutzt', value: genutzt, unit: 'kWh', digits: 0 },
    ];
  },
  howto: [
    'Modulleistung in Watt-Peak eingeben (Summe der Paneele).',
    'Spezifischen Jahresertrag passend zu Ausrichtung und Standort wählen.',
    'Eigenverbrauchsanteil schätzen - bei tagsüber laufenden Geräten höher.',
    'Strompreis und Anschaffungskosten eintragen und Ersparnis sowie Amortisation ablesen.',
  ],
  faq: [
    { q: 'Wie viel Strom liefert ein Balkonkraftwerk?', a: 'Eine 800-Wp-Anlage bringt je nach Ausrichtung grob 550-800 kWh pro Jahr. Bei einem Strompreis von 35 ct/kWh und hohem Eigenverbrauch sind das rund 150-200 Euro Ersparnis jährlich.' },
    { q: 'Warum zählt der Eigenverbrauch?', a: 'Du sparst nur dort Geld, wo der erzeugte Strom direkt verbraucht wird und teuren Netzbezug ersetzt. Überschuss wird meist unvergütet eingespeist, weshalb ein hoher Eigenverbrauch entscheidend ist.' },
    { q: 'Wann amortisiert sich ein Balkonkraftwerk?', a: 'Typisch sind 4-8 Jahre, abhängig von Preis, Standort und Eigenverbrauch. Bei einer Lebensdauer der Module von über 20 Jahren bleibt danach reiner Gewinn.' },
    { q: 'Wie viel Watt sind erlaubt?', a: 'Stand 2026 dürfen Balkonkraftwerke in Deutschland mit bis zu 800 Watt Wechselrichter-Einspeiseleistung betrieben werden; die Modulleistung darf höher liegen. Anmeldung im Marktstammdatenregister nicht vergessen.' },
  ],
  related: ['pv-ertrag-rechner', 'stromkosten-rechner', 'kwh-kosten-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { leistung: 800, spezertrag: 850, eigenverbrauch: 70, strompreis: 35, anschaffung: 600 },
      expect: [
        { label: 'Jahresertrag', value: 680, tolerance: 0.5 },
        { label: 'Stromersparnis pro Jahr', value: 166.6, tolerance: 0.05 },
        { label: 'Amortisationszeit', value: 3.6, tolerance: 0.1 },
      ],
    },
  ],
};
