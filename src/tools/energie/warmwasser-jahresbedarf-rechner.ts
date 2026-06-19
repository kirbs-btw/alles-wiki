import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'warmwasser-jahresbedarf-rechner',
  category: 'energie',
  title: 'Warmwasser-Jahresbedarf pro Person',
  shortTitle: 'WW-Jahresbedarf',
  description:
    'Berechne Energiebedarf und Kosten der Warmwasserbereitung pro Person und Jahr aus dem täglichen Warmwasserverbrauch, der Temperatur und dem Energiepreis.',
  keywords: [
    'warmwasser jahresbedarf',
    'warmwasser pro person jahr',
    'warmwasserverbrauch berechnen',
    'energiebedarf warmwasser',
    'warmwasser kwh pro person',
    'warmwasserkosten pro jahr',
  ],
  intro:
    'Wie viel Energie kostet die Warmwasserbereitung im Jahr? Dieser Rechner hochrechnet den täglichen Warmwasserverbrauch pro Person auf das ganze Jahr und den gesamten Haushalt. Richtwerte: sparsam ~25 l, mittel ~40 l, hoher Komfort ~60 l pro Person und Tag (bei ~45 °C Zapftemperatur). Physikalisch benötigt 1 Liter je Grad Erwärmung rund 1,163 Wh. Verteil- und Bereitstellungsverluste sind über den Wirkungsgrad berücksichtigt (Stand 2026, Näherung).',
  formula:
    'Energie/Jahr = Personen × Liter/Tag × 365 × ΔT × 1,163 ÷ 1000 ÷ Wirkungsgrad; Kosten = kWh × Preis',
  inputs: [
    { type: 'number', id: 'personen', label: 'Personen im Haushalt', unit: '', default: 3, min: 1, max: 12, step: 1 },
    {
      type: 'select',
      id: 'liter',
      label: 'Warmwasserverbrauch pro Person/Tag',
      default: '40',
      options: [
        { value: '25', label: 'Sparsam (~25 l/Tag)' },
        { value: '40', label: 'Mittel (~40 l/Tag)' },
        { value: '60', label: 'Hoher Komfort (~60 l/Tag)' },
      ],
      help: 'Warmwasser bei Zapftemperatur, nicht das gesamte (kalte) Trinkwasser.',
    },
    { type: 'number', id: 'kaltTemp', label: 'Kaltwassertemperatur', unit: '°C', default: 12, min: 0, max: 40, step: 1 },
    { type: 'number', id: 'warmTemp', label: 'Warmwassertemperatur', unit: '°C', default: 45, min: 20, max: 90, step: 1 },
    { type: 'number', id: 'wirkungsgrad', label: 'Wirkungsgrad inkl. Verluste', unit: '%', default: 80, min: 1, max: 100, step: 1, help: 'Speicher- und Leitungsverluste senken den Wert, oft 75-90 %.' },
    { type: 'number', id: 'preis', label: 'Energiepreis', unit: 'ct/kWh', default: 35, min: 0, step: 1, help: 'Strompreis oder Gaspreis je nach Heizungsart.' },
  ],
  compute: (v) => {
    const personen = Math.max(1, num(v.personen));
    const literProTag = num(v.liter);
    const kalt = num(v.kaltTemp);
    const warm = num(v.warmTemp);
    const wg = num(v.wirkungsgrad) / 100;
    const preis = num(v.preis) / 100;
    const deltaT = Math.max(0, warm - kalt);
    const literJahrGesamt = personen * literProTag * 365;
    const energieGesamt = wg > 0 ? (literJahrGesamt * deltaT * 1.163) / 1000 / wg : 0;
    const energieProPerson = personen > 0 ? energieGesamt / personen : 0;
    const kostenGesamt = energieGesamt * preis;
    return [
      { label: 'Energiebedarf Haushalt pro Jahr', value: energieGesamt, unit: 'kWh', digits: 0, primary: true },
      { label: 'Energiebedarf pro Person', value: energieProPerson, unit: 'kWh', digits: 0 },
      { label: 'Warmwassermenge gesamt', value: literJahrGesamt, unit: 'l', digits: 0 },
      { label: 'Kosten pro Jahr', value: kostenGesamt, unit: '€', digits: 2 },
    ];
  },
  howto: [
    'Anzahl der Personen im Haushalt eintragen.',
    'Warmwasserverbrauch pro Person und Tag wählen.',
    'Kalt- und Warmwassertemperatur angeben.',
    'Wirkungsgrad inklusive Speicher- und Leitungsverluste sowie den Energiepreis eingeben.',
    'Jahresenergiebedarf und Kosten ablesen.',
  ],
  faq: [
    { q: 'Wie viel Warmwasser braucht eine Person?', a: 'Je nach Komfort etwa 25-60 Liter pro Person und Tag bei Zapftemperatur. Der mittlere Wert von rund 40 Litern entspricht grob dem deutschen Durchschnitt mit gelegentlichem Duschen und Baden.' },
    { q: 'Wie viel kWh kostet Warmwasser pro Person und Jahr?', a: 'Bei mittlerem Verbrauch landet man grob bei 500-700 kWh pro Person und Jahr - abhängig von Verbrauch, Temperatur und Anlagenverlusten. Bei Stromerwärmung kann das je Person über 200 Euro im Jahr kosten.' },
    { q: 'Warum nur 80 % Wirkungsgrad?', a: 'Bei zentraler Warmwasserbereitung gehen über Speicher und Zirkulationsleitungen Wärme verloren. Ein Durchlauferhitzer direkt an der Zapfstelle arbeitet effizienter (nahe 100 %), eine Zirkulation mit Speicher deutlich darunter.' },
    { q: 'Ist Legionellenschutz berücksichtigt?', a: 'Nein. Speicher sollten aus Hygienegründen regelmäßig auf mindestens 60 °C erwärmt werden, was den realen Energiebedarf erhöht. Der Rechner liefert eine Näherung des reinen Zapfbedarfs (Stand 2026).' },
  ],
  related: ['warmwasser-kosten-rechner', 'durchlauferhitzer-kosten-rechner', 'heizwaermebedarf-rechner', 'stromkosten-rechner'],
  updated: '2026-06-19',
  examples: [
    {
      values: { personen: 3, liter: '40', kaltTemp: 12, warmTemp: 45, wirkungsgrad: 80, preis: 35 },
      expect: [
        { label: 'Warmwassermenge gesamt', value: 43800, tolerance: 0 },
        { label: 'Energiebedarf Haushalt pro Jahr', value: 2101.25, tolerance: 0.5 },
        { label: 'Kosten pro Jahr', value: 735.44, tolerance: 0.1 },
      ],
    },
  ],
};
