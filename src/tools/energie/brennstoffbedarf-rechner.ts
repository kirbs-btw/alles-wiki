import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'brennstoffbedarf-rechner',
  category: 'energie',
  title: 'Brennstoffbedarf-Rechner (kWh in Menge)',
  shortTitle: 'Brennstoffmenge',
  description:
    'Rechne deinen jährlichen Heizwärmebedarf in die benötigte Brennstoffmenge um - Erdgas, Heizöl, Pellets oder Brennholz, inklusive Kesselwirkungsgrad und Kosten.',
  keywords: [
    'brennstoffbedarf berechnen',
    'kwh in liter heizöl',
    'kwh in kubikmeter gas',
    'pellets bedarf kwh',
    'heizenergie in brennstoff umrechnen',
    'heizölverbrauch berechnen',
  ],
  intro:
    'Wie viel Heizöl, Gas, Pellets oder Holz brauchst du für deinen Heizwärmebedarf? Dieser Rechner rechnet die benötigte Nutzwärme in kWh über den Heizwert des Brennstoffs und den Kesselwirkungsgrad in die Brennstoffmenge um. Typische Heizwerte: Heizöl ~10 kWh/l, Erdgas ~10 kWh/m³, Holzpellets ~4,8 kWh/kg, lufttrockenes Scheitholz ~1.500 kWh/Raummeter (Buche). Stand 2026, Näherungswerte.',
  formula: 'Menge = Wärmebedarf ÷ Wirkungsgrad ÷ Heizwert; Kosten = Menge × Preis',
  inputs: [
    { type: 'number', id: 'bedarf', label: 'Heizwärmebedarf pro Jahr', unit: 'kWh', default: 18000, min: 0, step: 100, help: 'Benötigte Nutzwärme - z. B. aus dem Heizwärmebedarf-Rechner.' },
    {
      type: 'select',
      id: 'brennstoff',
      label: 'Brennstoff',
      default: 'gas',
      options: [
        { value: 'gas', label: 'Erdgas (10 kWh/m³)' },
        { value: 'oel', label: 'Heizöl (10 kWh/l)' },
        { value: 'pellets', label: 'Holzpellets (4,8 kWh/kg)' },
        { value: 'holz', label: 'Scheitholz Buche (1.500 kWh/rm)' },
      ],
      help: 'Bestimmt Heizwert und Mengeneinheit.',
    },
    { type: 'number', id: 'wirkungsgrad', label: 'Kesselwirkungsgrad', unit: '%', default: 90, min: 30, max: 100, step: 1, help: 'Brennwert ~95-98, Niedertemperatur ~85-90, alte Kessel ~70-80.' },
    { type: 'number', id: 'preis', label: 'Brennstoffpreis je Einheit', unit: '€', default: 1, min: 0, step: 0.01, help: 'z. B. €/m³ Gas, €/l Öl, €/kg Pellets, €/rm Holz.' },
  ],
  compute: (v) => {
    const bedarf = num(v.bedarf);
    const stoff = String(v.brennstoff);
    const wg = num(v.wirkungsgrad) / 100;
    const preis = num(v.preis);
    const heizwerte: Record<string, { hw: number; einheit: string }> = {
      gas: { hw: 10, einheit: 'm³' },
      oel: { hw: 10, einheit: 'l' },
      pellets: { hw: 4.8, einheit: 'kg' },
      holz: { hw: 1500, einheit: 'rm' },
    };
    const cfg = heizwerte[stoff] ?? heizwerte.gas;
    const endenergie = wg > 0 ? bedarf / wg : 0;
    const menge = cfg.hw > 0 ? endenergie / cfg.hw : 0;
    const kosten = menge * preis;
    return [
      { label: `Benötigte Menge (${cfg.einheit})`, value: menge, unit: cfg.einheit, digits: 1, primary: true },
      { label: 'Endenergie (nach Wirkungsgrad)', value: endenergie, unit: 'kWh', digits: 0 },
      { label: 'Brennstoffkosten pro Jahr', value: kosten, unit: '€', digits: 2 },
    ];
  },
  howto: [
    'Jährlichen Heizwärmebedarf in kWh eintragen (Nutzwärme).',
    'Brennstoff auswählen - Heizwert und Einheit werden automatisch gesetzt.',
    'Kesselwirkungsgrad angeben (Brennwert höher, alte Kessel niedriger).',
    'Brennstoffpreis je Einheit eingeben.',
    'Benötigte Menge und die Jahreskosten ablesen.',
  ],
  faq: [
    { q: 'Wie viel Heizöl entspricht 1 kWh?', a: 'Heizöl hat einen Heizwert von rund 10 kWh je Liter. Für 1 kWh Nutzwärme braucht ein Kessel mit 90 Prozent Wirkungsgrad etwa 0,11 Liter. Erdgas liegt mit rund 10 kWh je Kubikmeter ähnlich.' },
    { q: 'Was ist der Unterschied zwischen Nutz- und Endenergie?', a: 'Nutz- bzw. Heizwärme ist die im Gebäude benötigte Wärme. Endenergie ist die zugeführte Brennstoffenergie - sie ist wegen der Kesselverluste höher. Der Rechner teilt den Bedarf durch den Wirkungsgrad, um die Endenergie und daraus die Menge zu bestimmen.' },
    { q: 'Welcher Heizwert für Holz gilt?', a: 'Lufttrockenes Buchen-Scheitholz (~20 % Feuchte) liefert rund 1.500 kWh je Raummeter. Weichhölzer wie Fichte liegen niedriger (~1.000-1.100 kWh/rm). Feuchtes Holz hat deutlich weniger nutzbaren Heizwert - daher gut trocknen.' },
    { q: 'Sind die Werte verbindlich?', a: 'Nein, es sind gerundete Durchschnittswerte (Stand 2026). Reale Heizwerte schwanken mit Qualität und Feuchte des Brennstoffs, und der tatsächliche Anlagenwirkungsgrad weicht ab. Für genaue Werte den Energieausweis oder die Abrechnung heranziehen.' },
  ],
  related: ['heizwaermebedarf-rechner', 'heizoel-kosten-rechner', 'pellets-kosten-rechner', 'brennholz-bedarf-rechner', 'gaskosten-rechner'],
  updated: '2026-06-19',
  examples: [
    {
      values: { bedarf: 18000, brennstoff: 'gas', wirkungsgrad: 90, preis: 1 },
      expect: [
        { label: 'Endenergie (nach Wirkungsgrad)', value: 20000, tolerance: 0.5 },
        { label: 'Benötigte Menge (m³)', value: 2000, tolerance: 0.5 },
        { label: 'Brennstoffkosten pro Jahr', value: 2000, tolerance: 0.5 },
      ],
    },
    {
      values: { bedarf: 18000, brennstoff: 'oel', wirkungsgrad: 90, preis: 1.1 },
      expect: [{ label: 'Benötigte Menge (l)', value: 2000, tolerance: 0.5 }],
    },
  ],
};
