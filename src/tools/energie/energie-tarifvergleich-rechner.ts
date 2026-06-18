import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'energie-tarifvergleich-rechner',
  category: 'energie',
  title: 'Energie-Tarifvergleich-Rechner',
  shortTitle: 'Tarifvergleich',
  description:
    'Vergleiche zwei Strom- oder Gastarife: aus Verbrauch, Arbeitspreis und Grundpreis berechnet der Rechner die Jahreskosten und die Ersparnis.',
  keywords: [
    'tarifvergleich rechner',
    'stromtarif vergleichen',
    'gastarif vergleich',
    'energietarif vergleich',
    'arbeitspreis grundpreis vergleich',
    'tarif wechsel ersparnis',
    'stromanbieter vergleich kosten',
  ],
  intro:
    'Dieser Rechner vergleicht zwei Energietarife fair miteinander - egal ob Strom oder Gas. Jeder Tarif besteht aus einem Arbeitspreis pro kWh und einem jährlichen Grundpreis. Der Rechner setzt beide auf deinen Jahresverbrauch um und zeigt direkt, welcher Tarif günstiger ist und wie viel du sparst.',
  formula: 'Jahreskosten = Verbrauch × Arbeitspreis + Grundpreis; Ersparnis = Tarif A − Tarif B',
  inputs: [
    { type: 'number', id: 'verbrauch', label: 'Jahresverbrauch', unit: 'kWh', default: 3000, min: 0, step: 50 },
    { type: 'number', id: 'arbeitA', label: 'Tarif A: Arbeitspreis', unit: 'ct/kWh', default: 38, min: 0, step: 0.1 },
    { type: 'number', id: 'grundA', label: 'Tarif A: Grundpreis', unit: '€/Jahr', default: 130, min: 0, step: 1 },
    { type: 'number', id: 'arbeitB', label: 'Tarif B: Arbeitspreis', unit: 'ct/kWh', default: 32, min: 0, step: 0.1 },
    { type: 'number', id: 'grundB', label: 'Tarif B: Grundpreis', unit: '€/Jahr', default: 150, min: 0, step: 1 },
    { type: 'number', id: 'bonus', label: 'Bonus Tarif B (1. Jahr)', unit: '€', default: 0, min: 0, step: 10, help: 'Neukunden- oder Sofortbonus, der die Kosten von B im ersten Jahr senkt.' },
  ],
  compute: (v) => {
    const verbrauch = num(v.verbrauch);
    const kostenA = verbrauch * (num(v.arbeitA) / 100) + num(v.grundA);
    const kostenBroh = verbrauch * (num(v.arbeitB) / 100) + num(v.grundB);
    const kostenB = kostenBroh - num(v.bonus);
    const ersparnis = kostenA - kostenB;
    const guenstiger = ersparnis > 0 ? 'Tarif B' : ersparnis < 0 ? 'Tarif A' : 'gleich teuer';
    return [
      { label: 'Ersparnis pro Jahr', value: Math.abs(ersparnis), unit: '€', digits: 2, primary: true },
      { label: 'Günstigerer Tarif', value: guenstiger, help: 'Tarif B inklusive Bonus im ersten Jahr.' },
      { label: 'Jahreskosten Tarif A', value: kostenA, unit: '€', digits: 2 },
      { label: 'Jahreskosten Tarif B', value: kostenB, unit: '€', digits: 2 },
    ];
  },
  howto: [
    'Deinen Jahresverbrauch in kWh aus der letzten Abrechnung eintragen.',
    'Für Tarif A (z. B. dein aktueller Tarif) Arbeitspreis und Grundpreis eingeben.',
    'Für Tarif B (das Angebot) Arbeitspreis, Grundpreis und einen eventuellen Bonus ergänzen.',
    'Günstigeren Tarif und die jährliche Ersparnis ablesen.',
  ],
  faq: [
    { q: 'Warum reicht der Arbeitspreis allein nicht?', a: 'Ein niedriger Arbeitspreis kann durch einen hohen Grundpreis aufgefressen werden - oder umgekehrt. Erst die Kombination beider Komponenten auf deinen Verbrauch ergibt die echten Jahreskosten.' },
    { q: 'Wie berücksichtige ich Boni richtig?', a: 'Neukundenboni gelten meist nur im ersten Jahr. Der Rechner zieht den Bonus von Tarif B ab. Für eine langfristige Bewertung solltest du auch die Kosten ohne Bonus betrachten.' },
    { q: 'Funktioniert das für Strom und Gas?', a: 'Ja. Das Modell aus Arbeitspreis je kWh plus Grundpreis gilt für beide. Achte nur darauf, Verbrauch und Preise konsistent für denselben Energieträger einzusetzen.' },
    { q: 'Was sollte ich beim Wechsel sonst beachten?', a: 'Vertragslaufzeit, Kündigungsfristen, Preisgarantie und Bewertungen des Anbieters. Ein günstiger Lockpreis im ersten Jahr ist wenig wert, wenn die Folgepreise stark steigen.' },
  ],
  related: ['stromkosten-rechner', 'gaskosten-rechner', 'kwh-kosten-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { verbrauch: 3000, arbeitA: 38, grundA: 130, arbeitB: 32, grundB: 150, bonus: 0 },
      expect: [
        { label: 'Jahreskosten Tarif A', value: 1270, tolerance: 0.01 },
        { label: 'Jahreskosten Tarif B', value: 1110, tolerance: 0.01 },
        { label: 'Ersparnis pro Jahr', value: 160, tolerance: 0.01 },
      ],
    },
  ],
};
