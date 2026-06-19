import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'infrarotheizung-kosten-rechner',
  category: 'energie',
  title: 'Infrarotheizung-Kosten-Rechner',
  shortTitle: 'Infrarotheizung',
  description:
    'Berechne die Stromkosten einer Infrarotheizung aus Leistung, täglicher Heizdauer und Strompreis - pro Tag, Monat und Heizsaison sowie je Raum.',
  keywords: [
    'infrarotheizung kosten',
    'infrarotheizung stromverbrauch',
    'infrarotheizung rechner',
    'infrarotheizung stromkosten',
    'elektroheizung kosten',
    'ir heizung verbrauch',
  ],
  intro:
    'Infrarotheizungen wandeln Strom direkt in Wärme um - bequem, aber im Betrieb teuer, da jede Kilowattstunde Strom nur eine Kilowattstunde Wärme liefert. Dieser Rechner ermittelt die Stromkosten aus Heizleistung, täglicher Betriebsdauer und Strompreis und rechnet sie auf Tag, Monat und Heizsaison hoch. Ein Taktfaktor berücksichtigt, dass eine geregelte Heizung über Thermostat nicht dauerhaft auf voller Leistung läuft.',
  formula: 'Verbrauch = Leistung(kW) × Stunden × Taktfaktor; Kosten = Verbrauch × Strompreis',
  inputs: [
    { type: 'number', id: 'leistung', label: 'Heizleistung', unit: 'W', default: 600, min: 0, step: 50, help: 'Typisch 300-1200 W je Panel. Faustregel ~60-100 W je m² Raumfläche.' },
    { type: 'number', id: 'stunden', label: 'Betriebsdauer pro Tag', unit: 'h', default: 8, min: 0, max: 24, step: 0.5 },
    { type: 'number', id: 'takt', label: 'Auslastung (Taktfaktor)', unit: '%', default: 60, min: 1, max: 100, step: 5, help: 'Anteil der Zeit, in dem das Panel über das Thermostat tatsächlich heizt. Gut gedämmt ~40-60 %.' },
    { type: 'number', id: 'preis', label: 'Strompreis', unit: 'ct/kWh', default: 35, min: 0, step: 0.5 },
    { type: 'number', id: 'tage', label: 'Heiztage pro Saison', unit: '', default: 180, min: 0, step: 5, help: 'Heizsaison in Deutschland oft rund 180-220 Tage.' },
  ],
  compute: (v) => {
    const leistungKw = num(v.leistung) / 1000;
    const stunden = num(v.stunden);
    const takt = num(v.takt) / 100;
    const preis = num(v.preis) / 100;
    const tage = num(v.tage);
    const verbrauchTag = leistungKw * stunden * takt;
    const kostenTag = verbrauchTag * preis;
    const kostenMonat = kostenTag * 30;
    const kostenSaison = kostenTag * tage;
    return [
      { label: 'Stromkosten pro Tag', value: kostenTag, unit: '€', digits: 2, primary: true },
      { label: 'Stromverbrauch pro Tag', value: verbrauchTag, unit: 'kWh', digits: 2 },
      { label: 'Stromkosten pro Monat', value: kostenMonat, unit: '€', digits: 2 },
      { label: 'Stromkosten pro Heizsaison', value: kostenSaison, unit: '€', digits: 2 },
    ];
  },
  howto: [
    'Heizleistung des Infrarotpanels in Watt eintragen.',
    'Tägliche Betriebsdauer und Auslastung (Taktfaktor) angeben.',
    'Strompreis und die Anzahl der Heiztage pro Saison ergänzen.',
    'Kosten pro Tag, Monat und Heizsaison ablesen.',
  ],
  faq: [
    { q: 'Warum ist eine Infrarotheizung im Betrieb teuer?', a: 'Sie heizt mit Strom im Verhältnis 1:1 - eine Kilowattstunde Strom ergibt eine Kilowattstunde Wärme. Bei aktuellen Strompreisen ist das deutlich teurer als Gas oder eine Wärmepumpe, die aus 1 kWh Strom mehrere kWh Wärme macht.' },
    { q: 'Was bedeutet der Taktfaktor?', a: 'Eine über Thermostat geregelte Infrarotheizung läuft nicht dauerhaft, sondern schaltet ab, sobald die Wunschtemperatur erreicht ist. Der Taktfaktor schätzt den Anteil der Betriebszeit unter Volllast - je besser gedämmt der Raum, desto niedriger.' },
    { q: 'Wann lohnt sich Infrarotheizung trotzdem?', a: 'Als Zusatz- oder Übergangsheizung in selten genutzten Räumen, im Bad oder als Ergänzung zu einer PV-Anlage mit hohem Eigenverbrauch. Als alleinige Heizung eines ganzen Hauses ist sie meist unwirtschaftlich.' },
    { q: 'Wie viel Leistung brauche ich je Raum?', a: 'Als grobe Faustregel rechnet man bei gut gedämmten Räumen etwa 60 W je Quadratmeter, im Altbau eher 100 W/m². Ein 20-m²-Raum benötigt also rund 1200-2000 W.' },
  ],
  related: ['stromkosten-rechner', 'heizkosten-rechner', 'waermepumpe-stromkosten-rechner'],
  updated: '2026-06-19',
  examples: [
    {
      values: { leistung: 600, stunden: 8, takt: 60, preis: 35, tage: 180 },
      expect: [
        { label: 'Stromverbrauch pro Tag', value: 2.88, tolerance: 0.001 },
        { label: 'Stromkosten pro Tag', value: 1.008, tolerance: 0.001 },
        { label: 'Stromkosten pro Heizsaison', value: 181.44, tolerance: 0.05 },
      ],
    },
  ],
};
