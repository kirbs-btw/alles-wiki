import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'pc-stromverbrauch-rechner',
  category: 'technik',
  title: 'PC-Stromverbrauch & Kosten-Rechner',
  shortTitle: 'PC-Stromkosten',
  description:
    'Berechne den jaehrlichen Stromverbrauch und die Kosten deines PCs aus Leistung, taeglicher Nutzung und Strompreis.',
  keywords: [
    'pc stromverbrauch berechnen',
    'pc stromkosten rechner',
    'computer stromverbrauch',
    'gaming pc kosten strom',
    'watt stromkosten rechner',
  ],
  formula: 'kWh/Jahr = (Leistung_W / 1000) x Stunden/Tag x 365; Kosten = kWh x Strompreis',
  inputs: [
    { type: 'number', id: 'leistung', label: 'Leistungsaufnahme', unit: 'W', default: 200, min: 0, step: 10, help: 'Durchschnittliche Leistung unter Last.' },
    { type: 'number', id: 'stundenTag', label: 'Nutzung pro Tag', unit: 'h', default: 5, min: 0, max: 24, step: 0.5 },
    { type: 'number', id: 'tageJahr', label: 'Nutzungstage pro Jahr', unit: 'Tage', default: 365, min: 1, max: 366, step: 1 },
    { type: 'number', id: 'preis', label: 'Strompreis', unit: 'EUR/kWh', default: 0.35, min: 0, step: 0.01 },
  ],
  compute: (v) => {
    const leistung = num(v.leistung);
    const stundenTag = num(v.stundenTag);
    const tageJahr = num(v.tageJahr);
    const preis = num(v.preis);
    const kwhTag = (leistung / 1000) * stundenTag;
    const kwhJahr = kwhTag * tageJahr;
    const kostenJahr = kwhJahr * preis;
    const kostenMonat = kostenJahr / 12;
    return [
      { label: 'Stromkosten pro Jahr', value: kostenJahr, unit: 'EUR', digits: 2, primary: true },
      { label: 'Stromkosten pro Monat', value: kostenMonat, unit: 'EUR', digits: 2 },
      { label: 'Verbrauch pro Jahr', value: kwhJahr, unit: 'kWh', digits: 1 },
      { label: 'Verbrauch pro Tag', value: kwhTag, unit: 'kWh', digits: 3 },
    ];
  },
  intro:
    'Ein Gaming-PC kann mehr Strom verbrauchen als ein Kuehlschrank. Dieser Rechner ermittelt den jaehrlichen Verbrauch und die Kosten aus der Leistungsaufnahme, der taeglichen Nutzungsdauer und deinem Strompreis.',
  howto: [
    'Durchschnittliche Leistungsaufnahme in Watt eingeben (Messsteckdose oder Schaetzung).',
    'Taegliche Nutzungsdauer und Nutzungstage pro Jahr eintragen.',
    'Strompreis je kWh angeben.',
    'Jaehrliche und monatliche Stromkosten ablesen.',
  ],
  faq: [
    { q: 'Wie viel verbraucht ein PC im Jahr?', a: 'Ein Buero-PC mit 100 W und 5 h Nutzung kommt auf rund 180 kWh, ein Gaming-PC mit 400 W deutlich mehr. Mit diesem Rechner laesst sich das exakt fuer deine Werte bestimmen.' },
    { q: 'Wie ermittle ich die echte Leistungsaufnahme?', a: 'Am genauesten mit einem Energiemessgeraet an der Steckdose. Die Netzteil-Wattzahl gibt nur die Maximalleistung an, nicht den tatsaechlichen Verbrauch.' },
    { q: 'Zaehlt der Standby-Verbrauch?', a: 'Dieser Rechner betrachtet die aktive Nutzung. Standby-Verbrauch laesst sich als zusaetzliche Stunden mit geringer Leistung separat berechnen.' },
  ],
  related: ['watt-volt-ampere-rechner', 'akku-laufzeit-rechner', 'druckkosten-pro-seite-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { leistung: 200, stundenTag: 5, tageJahr: 365, preis: 0.35 },
      expect: [
        { label: 'Verbrauch pro Jahr', value: 365, tolerance: 0.5 },
        { label: 'Stromkosten pro Jahr', value: 127.75, tolerance: 0.05 },
      ],
    },
    {
      values: { leistung: 400, stundenTag: 4, tageJahr: 300, preis: 0.30 },
      expect: [{ label: 'Stromkosten pro Jahr', value: 144, tolerance: 0.1 }],
    },
  ],
};
