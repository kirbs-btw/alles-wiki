import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'standheizung-kosten-rechner',
  category: 'auto',
  title: 'Standheizung-Kosten-Rechner',
  shortTitle: 'Standheizung',
  description:
    'Berechne die Kraftstoffkosten einer kraftstoffbetriebenen Standheizung pro Heizvorgang, pro Tag und über die Heizsaison.',
  keywords: [
    'standheizung kosten berechnen',
    'standheizung verbrauch rechner',
    'standheizung kosten pro tag',
    'webasto kosten heizen',
    'standheizung spritverbrauch',
    'standheizung saison kosten',
  ],
  formula:
    'Kosten je Heizvorgang = (Verbrauch je Stunde × Dauer/60) × Preis; Saison = Kosten/Tag × Heiztage',
  intro:
    'Eine kraftstoffbetriebene Standheizung verbraucht je nach Leistung typischerweise rund 0,3 bis 0,5 Liter Diesel oder Benzin pro Stunde. Dieser Rechner ermittelt die reinen Kraftstoffkosten pro Heizvorgang sowie für eine ganze Heizsaison – ohne Strombedarf des Gebläses, der über die Batterie läuft.',
  inputs: [
    { type: 'number', id: 'verbrauchProStunde', label: 'Verbrauch pro Stunde', unit: 'l/h', default: 0.4, min: 0.05, step: 0.05, help: 'Typisch 0,3–0,5 l/h' },
    { type: 'number', id: 'dauer', label: 'Heizdauer je Vorgang', unit: 'min', default: 20, min: 1, step: 5 },
    { type: 'number', id: 'vorgaengeProTag', label: 'Heizvorgänge pro Tag', unit: '', default: 2, min: 0, step: 1, help: 'z. B. morgens und abends' },
    { type: 'number', id: 'heiztage', label: 'Heiztage pro Saison', unit: 'Tage', default: 90, min: 0, step: 1 },
    { type: 'number', id: 'preis', label: 'Kraftstoffpreis', unit: 'EUR/l', default: 1.70, min: 0, step: 0.01 },
  ],
  compute: (v) => {
    const verbrauchH = num(v.verbrauchProStunde);
    const dauer = num(v.dauer);
    const vorgaenge = num(v.vorgaengeProTag);
    const heiztage = num(v.heiztage);
    const preis = num(v.preis);
    const literProVorgang = verbrauchH * (dauer / 60);
    const kostenProVorgang = literProVorgang * preis;
    const kostenProTag = kostenProVorgang * vorgaenge;
    const kostenSaison = kostenProTag * heiztage;
    const literSaison = literProVorgang * vorgaenge * heiztage;
    return [
      { label: 'Kosten je Heizvorgang', value: kostenProVorgang, unit: 'EUR', digits: 2, primary: true },
      { label: 'Kosten pro Tag', value: kostenProTag, unit: 'EUR', digits: 2 },
      { label: 'Kosten pro Saison', value: kostenSaison, unit: 'EUR', digits: 2 },
      { label: 'Verbrauch pro Saison', value: literSaison, unit: 'l', digits: 1 },
    ];
  },
  howto: [
    'Stundenverbrauch der Standheizung eintragen (typisch 0,3–0,5 l/h).',
    'Heizdauer je Vorgang und Anzahl der Vorgänge pro Tag angeben.',
    'Heiztage der Saison und den Kraftstoffpreis ergänzen.',
    'Kosten je Vorgang, pro Tag und für die Saison ablesen.',
  ],
  faq: [
    { q: 'Wie viel verbraucht eine Standheizung?', a: 'Kraftstoffbetriebene Standheizungen verbrauchen je nach Heizleistung grob 0,3 bis 0,5 Liter pro Stunde. Bei 20 Minuten Laufzeit sind das nur rund 0,1 bis 0,17 Liter.' },
    { q: 'Belastet die Standheizung die Batterie?', a: 'Das Gebläse und die Steuerung benötigen Strom aus der Batterie. Bei häufigem Heizen ohne anschließende Fahrt kann die Batterie schwächeln; dieser Stromverbrauch ist hier nicht eingerechnet.' },
    { q: 'Lohnt sich eine elektrische Standheizung?', a: 'Bei Elektroautos und Plug-in-Hybriden ist die Vorklimatisierung üblich. Der Energiebedarf wird dann in kWh statt Liter gemessen – dieser Rechner gilt nur für kraftstoffbetriebene Heizungen.' },
  ],
  related: ['winter-reichweite-rechner', 'spritkosten-rechner', 'frostschutz-mischung-rechner'],
  updated: '2026-06-19',
  examples: [
    {
      values: { verbrauchProStunde: 0.4, dauer: 20, vorgaengeProTag: 2, heiztage: 90, preis: 1.70 },
      // literProVorgang = 0.4*20/60 = 0.13333 ; kosten/Vorgang = 0.13333*1.70 = 0.22667
      expect: [{ label: 'Kosten je Heizvorgang', value: 0.22667, tolerance: 0.005 }],
    },
    {
      values: { verbrauchProStunde: 0.5, dauer: 30, vorgaengeProTag: 2, heiztage: 100, preis: 1.80 },
      // literProVorgang = 0.5*0.5 = 0.25 ; kosten/Vorgang = 0.45 ; /Tag = 0.9 ; Saison = 90
      expect: [{ label: 'Kosten pro Saison', value: 90, tolerance: 0.1 }],
    },
  ],
};
