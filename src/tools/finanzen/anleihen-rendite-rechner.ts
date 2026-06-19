import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'anleihen-rendite-rechner',
  category: 'finanzen',
  title: 'Anleihen-Rendite-Rechner',
  shortTitle: 'Anleihenrendite',
  description:
    'Berechne aus Kupon, Kurs und Restlaufzeit die laufende Verzinsung und die Endfälligkeitsrendite einer Anleihe – als bewährte Näherungsformel.',
  keywords: [
    'anleihen rendite rechner',
    'anleihenrendite berechnen',
    'endfälligkeitsrendite rechner',
    'rendite anleihe kurs kupon',
    'laufende verzinsung anleihe',
  ],
  formula:
    'Laufende Verzinsung = Kupon / Kaufpreis × 100; Endfälligkeitsrendite ≈ (Kupon + (Nennwert − Kaufpreis)/Jahre) / ((Nennwert + Kaufpreis)/2) × 100',
  inputs: [
    { type: 'number', id: 'nennwert', label: 'Nennwert', unit: '€', default: 1000, min: 1, step: 100, help: 'Rückzahlungsbetrag bei Fälligkeit (meist 100 %).' },
    { type: 'number', id: 'kupon', label: 'Nominalzins (Kupon)', unit: '%', default: 4, min: 0, step: 0.1, help: 'Jährliche Zinszahlung in % des Nennwerts.' },
    { type: 'number', id: 'kurs', label: 'Kaufkurs', unit: '%', default: 95, min: 1, step: 0.1, help: 'Kurs in % des Nennwerts (95 = unter pari).' },
    { type: 'number', id: 'jahre', label: 'Restlaufzeit', unit: 'Jahre', default: 5, min: 1, step: 1 },
  ],
  compute: (v) => {
    const nennwert = num(v.nennwert);
    const kupon = num(v.kupon);
    const kurs = num(v.kurs);
    const jahre = num(v.jahre);
    const kuponEuro = (nennwert * kupon) / 100;
    const kaufpreis = (nennwert * kurs) / 100;
    const laufend = kaufpreis > 0 ? (kuponEuro / kaufpreis) * 100 : 0;
    const mittel = (nennwert + kaufpreis) / 2;
    const ytm = mittel > 0 && jahre > 0
      ? ((kuponEuro + (nennwert - kaufpreis) / jahre) / mittel) * 100
      : 0;
    return [
      { label: 'Endfälligkeitsrendite (Näherung)', value: ytm, unit: '%', digits: 2, primary: true },
      { label: 'Laufende Verzinsung', value: laufend, unit: '%', digits: 2, help: 'Kupon bezogen auf den Kaufpreis.' },
      { label: 'Kaufpreis', value: kaufpreis, unit: '€', digits: 2 },
      { label: 'Kupon pro Jahr', value: kuponEuro, unit: '€', digits: 2 },
    ];
  },
  intro:
    'Eine Anleihe bringt nicht nur den Kupon (Nominalzins), sondern auch einen Kursgewinn oder -verlust bis zur Rückzahlung zum Nennwert. Die laufende Verzinsung setzt den Kupon ins Verhältnis zum Kaufpreis, die Endfälligkeitsrendite berücksichtigt zusätzlich den Unterschied zwischen Kaufpreis und Rückzahlung. Dieser Rechner verwendet die gebräuchliche Näherungsformel für die Endfälligkeitsrendite.',
  howto: [
    'Gib den Nennwert der Anleihe ein (meist 1.000 €).',
    'Trage den Kupon (Nominalzins) in Prozent ein.',
    'Trage den Kaufkurs in Prozent des Nennwerts ein.',
    'Lege die Restlaufzeit fest und lies die Renditen ab.',
  ],
  faq: [
    { q: 'Was ist der Unterschied zwischen Kupon und Rendite?', a: 'Der Kupon ist die feste Zinszahlung in Prozent des Nennwerts. Die Rendite berücksichtigt zusätzlich den Kaufkurs: Unter pari gekauft steigt die Rendite über den Kupon, über pari fällt sie darunter.' },
    { q: 'Wie genau ist die Endfälligkeitsrendite?', a: 'Es ist eine Näherungsformel. Die exakte Rendite (Yield to Maturity) erfordert das iterative Lösen der Barwertgleichung; die Abweichung ist bei normalen Kursen aber gering.' },
    { q: 'Was bedeutet "unter pari"?', a: 'Ein Kurs unter 100 % (z. B. 95 %) heißt, du zahlst weniger als den Nennwert und erhältst bei Fälligkeit 100 % zurück – das erhöht deine Rendite.' },
  ],
  related: ['dividendenrendite-rechner', 'rendite-rechner', 'realzins-rechner'],
  examples: [
    {
      values: { nennwert: 1000, kupon: 4, kurs: 95, jahre: 5 },
      expect: [
        { label: 'Endfälligkeitsrendite (Näherung)', value: 5.13, tolerance: 0.05 },
        { label: 'Laufende Verzinsung', value: 4.21, tolerance: 0.05 },
      ],
    },
    {
      values: { nennwert: 1000, kupon: 3, kurs: 102, jahre: 8 },
      expect: [{ label: 'Endfälligkeitsrendite (Näherung)', value: 2.72, tolerance: 0.05 }],
    },
  ],
  updated: '2026-06-19',
};
