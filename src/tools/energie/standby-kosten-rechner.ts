import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'standby-kosten-rechner',
  category: 'energie',
  title: 'Standby-Kosten-Rechner',
  shortTitle: 'Standby-Kosten',
  description:
    'Berechne, wie viel der Standby-Verbrauch deiner Geräte pro Jahr kostet - aus Standby-Leistung in Watt und Strompreis.',
  keywords: [
    'standby kosten rechner',
    'standby verbrauch berechnen',
    'standby stromkosten',
    'standby kosten pro jahr',
    'leerlauf stromverbrauch kosten',
  ],
  intro:
    'Viele Geräte verbrauchen rund um die Uhr Strom, obwohl sie scheinbar aus sind. Dieser Rechner zeigt, was der Standby-Modus aus Standby-Leistung, täglicher Standby-Dauer und Strompreis pro Jahr kostet.',
  formula: 'Verbrauch = Watt ÷ 1000 × Stunden/Tag × 365; Kosten = Verbrauch × Preis × Geräte',
  inputs: [
    { type: 'number', id: 'watt', label: 'Standby-Leistung', unit: 'W', default: 5, min: 0, step: 0.5, help: 'Typisch 1-15 W je Gerät; alte Geräte oft mehr.' },
    { type: 'number', id: 'stunden', label: 'Standby-Dauer pro Tag', unit: 'h', default: 20, min: 0, max: 24, step: 1, help: 'Wie viele Stunden täglich im Standby statt aktiv genutzt.' },
    { type: 'number', id: 'anzahl', label: 'Anzahl Geräte', unit: 'Stück', default: 1, min: 1, step: 1 },
    { type: 'number', id: 'preis', label: 'Strompreis', unit: 'ct/kWh', default: 35, min: 0, step: 1 },
  ],
  compute: (v) => {
    const watt = num(v.watt);
    const stunden = num(v.stunden);
    const anzahl = num(v.anzahl);
    const preis = num(v.preis) / 100;
    const verbrauch = (watt / 1000) * stunden * 365 * anzahl;
    const kosten = verbrauch * preis;
    return [
      { label: 'Standby-Kosten pro Jahr', value: kosten, unit: '€', digits: 2, primary: true },
      { label: 'Standby-Kosten pro Monat', value: kosten / 12, unit: '€', digits: 2 },
      { label: 'Standby-Verbrauch pro Jahr', value: verbrauch, unit: 'kWh', digits: 1 },
    ];
  },
  howto: [
    'Standby-Leistung des Geräts in Watt eingeben (oft im Datenblatt oder per Messgerät).',
    'Tägliche Standby-Dauer schätzen.',
    'Anzahl gleichartiger Geräte und Strompreis eintragen.',
    'Jahres- und Monatskosten ablesen.',
  ],
  faq: [
    { q: 'Wie viel kostet Standby im Haushalt?', a: 'In einem typischen Haushalt summieren sich Standby-Verluste auf grob 50-120 Euro pro Jahr, je nach Geräteanzahl und Strompreis.' },
    { q: 'Wie senke ich Standby-Kosten?', a: 'Abschaltbare Steckdosenleisten, das vollständige Ausschalten von Geräten und der Verzicht auf Dauer-Standby reduzieren die Verluste deutlich.' },
  ],
  related: ['geraet-stromkosten-rechner', 'stromkosten-rechner', 'kwh-kosten-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { watt: 5, stunden: 20, anzahl: 1, preis: 35 },
      expect: [
        { label: 'Standby-Verbrauch pro Jahr', value: 36.5, tolerance: 0.05 },
        { label: 'Standby-Kosten pro Jahr', value: 12.775, tolerance: 0.01 },
      ],
    },
    {
      values: { watt: 10, stunden: 24, anzahl: 3, preis: 40 },
      expect: [{ label: 'Standby-Kosten pro Jahr', value: 105.12, tolerance: 0.05 }],
    },
  ],
};
