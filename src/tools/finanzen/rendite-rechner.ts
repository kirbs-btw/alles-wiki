import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'rendite-rechner',
  category: 'finanzen',
  title: 'Rendite-Rechner',
  shortTitle: 'Rendite',
  description:
    'Berechne die Rendite einer Geldanlage aus Einsatz, Endwert und Laufzeit: Gesamtrendite in Prozent sowie die jährliche Rendite pro Jahr (annualisiert).',
  keywords: [
    'rendite rechner',
    'rendite berechnen',
    'jährliche rendite berechnen',
    'gewinn anlage prozent',
    'rendite pro jahr',
    'wertentwicklung berechnen',
    'annualisierte rendite',
  ],
  formula: 'Gesamtrendite = (Endwert − Einsatz)/Einsatz × 100; p.a. = ((Endwert/Einsatz)^(1/Jahre) − 1) × 100',
  inputs: [
    { type: 'number', id: 'einsatz', label: 'Eingesetztes Kapital', unit: '€', default: 5000, min: 0, step: 100 },
    { type: 'number', id: 'endwert', label: 'Endwert / Verkaufswert', unit: '€', default: 6500, min: 0, step: 100 },
    { type: 'number', id: 'jahre', label: 'Anlagedauer', unit: 'Jahre', default: 3, min: 0, step: 0.5 },
  ],
  compute: (v) => {
    const einsatz = num(v.einsatz);
    const endwert = num(v.endwert);
    const jahre = num(v.jahre);
    const gewinn = endwert - einsatz;
    const gesamt = einsatz > 0 ? gewinn / einsatz * 100 : 0;
    let proJahr = 0;
    if (einsatz > 0 && jahre > 0 && endwert > 0) {
      proJahr = (Math.pow(endwert / einsatz, 1 / jahre) - 1) * 100;
    }
    return [
      { label: 'Rendite pro Jahr', value: proJahr, unit: '%', digits: 2, primary: true },
      { label: 'Gesamtrendite', value: gesamt, unit: '%', digits: 2 },
      { label: 'Gewinn / Verlust', value: gewinn, unit: '€', digits: 2 },
    ];
  },
  intro:
    'Die Rendite misst, wie erfolgreich eine Geldanlage war. Die Gesamtrendite zeigt den prozentualen Zuwachs über die komplette Laufzeit; die annualisierte Rendite (pro Jahr) macht Anlagen unterschiedlicher Dauer vergleichbar. Sie berücksichtigt dabei den Zinseszinseffekt. So siehst du, ob sich eine Anlage gelohnt hat und wie sie gegen Alternativen abschneidet.',
  howto: [
    'Gib das eingesetzte Kapital (Kaufpreis) ein.',
    'Trage den heutigen Endwert oder Verkaufswert ein.',
    'Wähle die Anlagedauer in Jahren.',
    'Ergebnis: jährliche und gesamte Rendite sowie der Gewinn in Euro.',
  ],
  faq: [
    { q: 'Was ist der Unterschied zwischen Gesamt- und Jahresrendite?', a: 'Die Gesamtrendite ist der Zuwachs über die ganze Laufzeit. Die Jahresrendite (annualisiert) rechnet diesen Zuwachs unter Berücksichtigung des Zinseszinses auf ein Jahr herunter und macht Anlagen vergleichbar.' },
    { q: 'Sind Ausschüttungen oder Dividenden enthalten?', a: 'Nur wenn du sie in den Endwert einrechnest. Für eine Gesamtrendite solltest du Dividenden, Zinsen oder Mieten zum Endwert addieren.' },
    { q: 'Wie wird ein Verlust dargestellt?', a: 'Liegt der Endwert unter dem Einsatz, sind Rendite und Gewinn negativ. Der Rechner zeigt dann einen Minusbetrag bzw. eine negative Prozentzahl.' },
    { q: 'Berücksichtigt der Rechner Steuern und Gebühren?', a: 'Nein, er rechnet mit Brutto-Werten. Kaufkosten, Verwaltungsgebühren und die Abgeltungsteuer mindern die tatsächliche Nettorendite.' },
  ],
  related: ['zinseszinsrechner', 'sparplan-rechner', 'inflationsrechner'],
  examples: [
    {
      values: { einsatz: 5000, endwert: 6500, jahre: 3 },
      expect: [
        { label: 'Gesamtrendite', value: 30, tolerance: 0.01 },
        { label: 'Rendite pro Jahr', value: 9.14, tolerance: 0.05 },
      ],
    },
  ],
  updated: '2026-06-18',
};
