import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

// Stand 2026: Kindergeld einheitlich 259 € pro Kind und Monat (seit 01.01.2026; 2025 = 255 €).
const KINDERGELD_PRO_KIND = 259;

export const tool: Tool = {
  slug: 'kindergeld-rechner',
  category: 'familie',
  title: 'Kindergeld-Rechner nach Kinderzahl',
  shortTitle: 'Kindergeld',
  description:
    'Berechne das gesamte Kindergeld nach Anzahl der Kinder – monatlich und jährlich. Einheitlicher Betrag von 259 € pro Kind (Stand 2026).',
  keywords: [
    'kindergeld rechner',
    'kindergeld 2026',
    'kindergeld pro kind',
    'wie viel kindergeld',
    'kindergeld 2 kinder',
    'kindergeld 3 kinder',
    'kindergeld höhe',
  ],
  intro:
    'Seit dem 1. Januar 2026 beträgt das einheitliche Kindergeld 259 € pro Kind und Monat – unabhängig von der Reihenfolge der Kinder (Stand 2026). Dieser Rechner multipliziert den Betrag mit der Anzahl der Kinder und zeigt die monatliche und jährliche Summe. Den genauen aktuellen Betrag bestätigt die Familienkasse.',
  formula: 'Kindergeld gesamt = 259 € × Anzahl Kinder (pro Monat); Jahr = × 12',
  inputs: [
    { type: 'number', id: 'kinder', label: 'Anzahl der Kinder', unit: 'Kinder', default: 2, min: 1, max: 12, step: 1 },
  ],
  compute: (v) => {
    let kinder = Math.round(num(v.kinder, 1));
    if (kinder < 1) kinder = 1;
    if (kinder > 12) kinder = 12;
    const proMonat = KINDERGELD_PRO_KIND * kinder;
    const proJahr = proMonat * 12;
    return [
      { label: 'Kindergeld pro Monat', value: proMonat, unit: '€', digits: 0, primary: true },
      { label: 'Kindergeld pro Jahr', value: proJahr, unit: '€', digits: 0 },
      { label: 'Betrag pro Kind', value: KINDERGELD_PRO_KIND, unit: '€', digits: 0, help: 'monatlich, Stand 2026' },
    ];
  },
  howto: [
    'Anzahl der kindergeldberechtigten Kinder eingeben.',
    'Monatliche Gesamtsumme ablesen (259 € je Kind).',
    'Jahresbetrag für die Haushaltsplanung übernehmen.',
    'Bei Studium oder Ausbildung Anspruch bis maximal 25 Jahre prüfen.',
  ],
  faq: [
    { q: 'Wie hoch ist das Kindergeld 2026?', a: 'Pro Kind 259 € im Monat. Der Betrag gilt seit dem 1. Januar 2026 einheitlich für alle Kinder, unabhängig von der Geschwisterreihenfolge (2025 waren es 255 €). Maßgeblich ist der aktuelle Bescheid der Familienkasse.' },
    { q: 'Bis zu welchem Alter gibt es Kindergeld?', a: 'Grundsätzlich bis zum 18. Geburtstag. In Ausbildung, Studium oder bei Arbeitsuche kann es bis längstens zum 25. Geburtstag weitergezahlt werden.' },
    { q: 'Wer zahlt das Kindergeld aus?', a: 'In der Regel die Familienkasse der Bundesagentur für Arbeit. Der Antrag muss schriftlich gestellt werden.' },
    { q: 'Gibt es einen Kinderzuschlag zusätzlich?', a: 'Familien mit geringem Einkommen können zusätzlich Kinderzuschlag erhalten. Dieser ist hier nicht enthalten und wird separat beantragt.' },
    { q: 'Was ist günstiger – Kindergeld oder Kinderfreibetrag?', a: 'Das Finanzamt prüft im Rahmen der Steuererklärung automatisch, ob das Kindergeld oder der Kinderfreibetrag für Sie vorteilhafter ist (Günstigerprüfung).' },
  ],
  related: ['kosten-kind-rechner', 'taschengeld-rechner', 'kindesunterhalt-rechner'],
  examples: [
    {
      values: { kinder: 2 },
      expect: [
        { label: 'Kindergeld pro Monat', value: 518, tolerance: 0.01 },
        { label: 'Kindergeld pro Jahr', value: 6216, tolerance: 0.01 },
      ],
    },
    {
      values: { kinder: 3 },
      expect: [{ label: 'Kindergeld pro Monat', value: 777, tolerance: 0.01 }],
    },
  ],
  updated: '2026-06-18',
};
