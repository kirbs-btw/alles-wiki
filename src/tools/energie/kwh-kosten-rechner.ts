import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'kwh-kosten-rechner',
  category: 'energie',
  title: 'kWh-Kosten-Rechner',
  shortTitle: 'kWh-Kosten',
  description:
    'Berechne, was ein Gerät an Strom kostet: aus Leistung in Watt, Nutzung pro Tag und Strompreis ergeben sich Verbrauch und Kosten pro Jahr.',
  keywords: [
    'kwh kosten rechner',
    'stromkosten gerät',
    'watt in kwh',
    'verbrauch berechnen watt',
    'stromkosten pro stunde',
    'energiekosten gerät',
    'was kostet eine kwh',
  ],
  intro:
    'Mit diesem Rechner findest du heraus, was der Betrieb eines einzelnen Geräts kostet. Du gibst die Leistung in Watt und die tägliche Nutzungsdauer ein, der Rechner wandelt das in Kilowattstunden um und multipliziert mit deinem Strompreis. So vergleichst du schnell Kühlschrank, Heizlüfter oder PC.',
  formula: 'Verbrauch (kWh) = Leistung (W) ÷ 1000 × Stunden; Kosten = Verbrauch × Strompreis',
  inputs: [
    { type: 'number', id: 'leistung', label: 'Leistung', unit: 'W', default: 1000, min: 0, step: 10, help: 'Steht auf dem Typenschild des Geräts.' },
    { type: 'number', id: 'stunden', label: 'Nutzung pro Tag', unit: 'h', default: 3, min: 0, max: 24, step: 0.5 },
    { type: 'number', id: 'preis', label: 'Strompreis', unit: 'ct/kWh', default: 35, min: 0, step: 0.5 },
  ],
  compute: (v) => {
    const leistung = num(v.leistung);
    const stunden = num(v.stunden);
    const preis = num(v.preis);
    const kwhTag = (leistung / 1000) * stunden;
    const preisEur = preis / 100;
    const kostenTag = kwhTag * preisEur;
    return [
      { label: 'Kosten pro Jahr', value: kostenTag * 365, unit: '€', digits: 2, primary: true },
      { label: 'Kosten pro Monat', value: kostenTag * 30.42, unit: '€', digits: 2 },
      { label: 'Kosten pro Tag', value: kostenTag, unit: '€', digits: 3 },
      { label: 'Verbrauch pro Jahr', value: kwhTag * 365, unit: 'kWh', digits: 1 },
    ];
  },
  howto: [
    'Leistung des Geräts in Watt eintragen (Typenschild oder Datenblatt).',
    'Tägliche Nutzungsdauer in Stunden eingeben.',
    'Deinen Strompreis in Cent pro kWh ergänzen.',
    'Kosten pro Tag, Monat und Jahr sowie den Jahresverbrauch ablesen.',
  ],
  faq: [
    { q: 'Wie rechne ich Watt in kWh um?', a: 'Kilowattstunden = Watt ÷ 1000 × Betriebsstunden. Ein 2.000-Watt-Gerät, das eine Stunde läuft, verbraucht 2 kWh.' },
    { q: 'Was kostet eine Kilowattstunde Strom?', a: 'Das hängt vom Tarif ab. Der Standardwert von 35 ct/kWh ist eine Beispielannahme - trage deinen eigenen aktuellen Arbeitspreis ein.' },
    { q: 'Wie berücksichtige ich Standby-Verbrauch?', a: 'Rechne Standby separat: meist 0,5-5 Watt rund um die Uhr. Trage dafür eine kleine Wattzahl und 24 Stunden Nutzung ein.' },
    { q: 'Gilt das auch für Geräte mit schwankender Last?', a: 'Kühlschränke, Wärmepumpen oder Klimageräte laufen nicht durchgehend mit Nennleistung. Nutze hier besser den auf dem Energielabel angegebenen Jahresverbrauch in kWh.' },
  ],
  related: ['stromkosten-rechner', 'e-auto-ladekosten-rechner', 'gaskosten-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { leistung: 1000, stunden: 3, preis: 35 },
      expect: [
        { label: 'Verbrauch pro Jahr', value: 1095, tolerance: 0.5 },
        { label: 'Kosten pro Jahr', value: 383.25, tolerance: 0.05 },
      ],
    },
  ],
};
