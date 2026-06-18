import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'geraet-stromkosten-rechner',
  category: 'energie',
  title: 'Geräte-Stromkosten-Rechner (Watt)',
  shortTitle: 'Geräte-Stromkosten',
  description:
    'Berechne die Stromkosten eines einzelnen Geräts aus Leistung in Watt, täglicher Nutzungsdauer und Strompreis - pro Tag, Monat und Jahr.',
  keywords: [
    'stromkosten gerät rechner',
    'watt in stromkosten',
    'stromverbrauch gerät berechnen',
    'kosten pro watt rechner',
    'gerät kwh kosten',
  ],
  intro:
    'Dieser Rechner ermittelt aus der Leistungsaufnahme eines Geräts in Watt und der täglichen Nutzungsdauer den Stromverbrauch und die Kosten. So lässt sich für jedes Gerät - vom Wasserkocher bis zum PC - schnell abschätzen, was es im Betrieb kostet.',
  formula: 'Verbrauch/Tag = Watt ÷ 1000 × Stunden; Kosten = Verbrauch × Preis',
  inputs: [
    { type: 'number', id: 'watt', label: 'Leistung', unit: 'W', default: 100, min: 0, step: 10, help: 'Auf dem Typenschild oder Datenblatt angegeben.' },
    { type: 'number', id: 'stunden', label: 'Nutzung pro Tag', unit: 'h', default: 3, min: 0, max: 24, step: 0.5 },
    { type: 'number', id: 'preis', label: 'Strompreis', unit: 'ct/kWh', default: 35, min: 0, step: 1 },
  ],
  compute: (v) => {
    const watt = num(v.watt);
    const stunden = num(v.stunden);
    const preis = num(v.preis) / 100;
    const kwhTag = (watt / 1000) * stunden;
    const kostenTag = kwhTag * preis;
    const kostenJahr = kostenTag * 365;
    return [
      { label: 'Kosten pro Jahr', value: kostenJahr, unit: '€', digits: 2, primary: true },
      { label: 'Kosten pro Monat', value: kostenJahr / 12, unit: '€', digits: 2 },
      { label: 'Kosten pro Tag', value: kostenTag, unit: '€', digits: 3 },
      { label: 'Verbrauch pro Tag', value: kwhTag, unit: 'kWh', digits: 3 },
    ];
  },
  howto: [
    'Leistung des Geräts in Watt eingeben.',
    'Tägliche Nutzungsdauer in Stunden eintragen.',
    'Strompreis pro kWh angeben.',
    'Kosten pro Tag, Monat und Jahr ablesen.',
  ],
  faq: [
    { q: 'Wo finde ich die Wattzahl meines Geräts?', a: 'Meist auf dem Typenschild, im Handbuch oder im Datenblatt. Genau messen lässt sie sich mit einem Energiekosten-Messgerät an der Steckdose.' },
    { q: 'Gilt der Wert auch für Geräte mit schwankender Leistung?', a: 'Bei Geräten wie Kühlschränken oder Waschmaschinen schwankt die Leistung stark. Dafür eignen sich Rechner mit Jahresverbrauch in kWh besser.' },
  ],
  related: ['standby-kosten-rechner', 'stromkosten-rechner', 'kwh-kosten-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { watt: 100, stunden: 3, preis: 35 },
      expect: [
        { label: 'Verbrauch pro Tag', value: 0.3, tolerance: 0.001 },
        { label: 'Kosten pro Jahr', value: 38.325, tolerance: 0.01 },
      ],
    },
    {
      values: { watt: 2000, stunden: 0.5, preis: 40 },
      expect: [{ label: 'Kosten pro Jahr', value: 146, tolerance: 0.05 }],
    },
  ],
};
