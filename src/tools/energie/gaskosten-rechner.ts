import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'gaskosten-rechner',
  category: 'energie',
  title: 'Gaskosten-Rechner',
  shortTitle: 'Gaskosten',
  description:
    'Berechne deine jährlichen und monatlichen Gaskosten aus Jahresverbrauch in kWh, Arbeitspreis pro kWh und jährlichem Grundpreis.',
  keywords: [
    'gaskosten rechner',
    'gaskosten berechnen',
    'gasverbrauch kosten',
    'gaspreis rechner',
    'gas kwh kosten',
    'jahresgaskosten',
    'gasrechnung berechnen',
  ],
  intro:
    'Mit diesem Rechner ermittelst du, was dich dein Erdgas pro Jahr und Monat kostet. Du gibst deinen Jahresverbrauch in Kilowattstunden ein - so steht er meist auf der Abrechnung. Der Arbeitspreis pro kWh und der jährliche Grundpreis ergeben zusammen die Gesamtkosten.',
  formula: 'Kosten = Verbrauch (kWh) × Arbeitspreis + Grundpreis',
  inputs: [
    { type: 'number', id: 'verbrauch', label: 'Jahresverbrauch', unit: 'kWh', default: 12000, min: 0, step: 100, help: 'Steht auf der Gasrechnung. Wohnung ~8.000, Einfamilienhaus ~18.000 kWh.' },
    { type: 'number', id: 'arbeitspreis', label: 'Arbeitspreis', unit: 'ct/kWh', default: 11, min: 0, step: 0.1, help: 'Preis je Kilowattstunde in Cent.' },
    { type: 'number', id: 'grundpreis', label: 'Grundpreis', unit: '€/Jahr', default: 120, min: 0, step: 1 },
  ],
  compute: (v) => {
    const verbrauch = num(v.verbrauch);
    const arbeitspreis = num(v.arbeitspreis);
    const grund = num(v.grundpreis);
    const arbeitskosten = verbrauch * (arbeitspreis / 100);
    const jahr = arbeitskosten + grund;
    return [
      { label: 'Gaskosten pro Jahr', value: jahr, unit: '€', digits: 2, primary: true },
      { label: 'Gaskosten pro Monat', value: jahr / 12, unit: '€', digits: 2 },
      { label: 'Reine Verbrauchskosten', value: arbeitskosten, unit: '€', digits: 2 },
    ];
  },
  howto: [
    'Jahresverbrauch in kWh aus der Gasabrechnung übernehmen (nicht die Kubikmeter, sondern den kWh-Wert).',
    'Arbeitspreis in Cent pro kWh aus deinem Tarif eintragen.',
    'Jährlichen Grundpreis ergänzen.',
    'Jahres- und Monatskosten sowie die reinen Verbrauchskosten ablesen.',
  ],
  faq: [
    { q: 'Wie rechne ich Kubikmeter in kWh um?', a: 'kWh = m³ × Brennwert × Zustandszahl. Üblich sind Brennwert ~10 kWh/m³ und Zustandszahl ~0,95, also rund 9,5 kWh je Kubikmeter. Die genauen Faktoren stehen auf deiner Abrechnung.' },
    { q: 'Was ist ein normaler Gasverbrauch?', a: 'Grobe Richtwerte pro Jahr: Wohnung 70 m² rund 8.000 kWh, Einfamilienhaus 140 m² rund 18.000-22.000 kWh. Warmwasser über Gas erhöht den Verbrauch zusätzlich.' },
    { q: 'Ist der Gaspreis in diesem Rechner aktuell?', a: 'Der Standardwert ist nur eine Beispielannahme. Trage immer deinen eigenen, aktuellen Arbeits- und Grundpreis aus dem Tarif oder der letzten Rechnung ein - Gaspreise schwanken stark.' },
    { q: 'Sind Steuern und Abgaben enthalten?', a: 'Wenn du den Brutto-Arbeitspreis deines Tarifs eingibst, sind Energiesteuer und Mehrwertsteuer bereits enthalten. Tarifangebote nennen den Bruttopreis meist direkt.' },
  ],
  related: ['heizkosten-rechner', 'heizoel-kosten-rechner', 'kwh-kosten-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { verbrauch: 12000, arbeitspreis: 11, grundpreis: 120 },
      expect: [
        { label: 'Gaskosten pro Jahr', value: 1440, tolerance: 0.01 },
        { label: 'Gaskosten pro Monat', value: 120, tolerance: 0.01 },
      ],
    },
  ],
};
