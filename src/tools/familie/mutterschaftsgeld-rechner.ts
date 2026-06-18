import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

// Mutterschaftsgeld + Arbeitgeberzuschuss während der Schutzfrist.
// Die gesetzliche Krankenkasse zahlt höchstens 13 €/Kalendertag.
// Der Arbeitgeber stockt auf das durchschnittliche Nettoentgelt (kalendertäglich) auf.
// Schutzfrist regulär: 6 Wochen vor + 8 Wochen nach Geburt = 14 Wochen ≈ 98 Tage.
// Berechnung auf Tagesbasis (Netto/30 pro Kalendertag). Vereinfachte Orientierung.

const KASSE_MAX_PRO_TAG = 13; // gesetzliche Krankenkasse, Stand 2026

export const tool: Tool = {
  slug: 'mutterschaftsgeld-rechner',
  category: 'familie',
  title: 'Mutterschaftsgeld-Rechner',
  shortTitle: 'Mutterschaftsgeld',
  description:
    'Berechne Mutterschaftsgeld der Krankenkasse (max. 13 €/Tag) plus Arbeitgeberzuschuss während der Schutzfrist. Vereinfachte Orientierung (Stand 2026).',
  keywords: [
    'mutterschaftsgeld rechner',
    'mutterschaftsgeld berechnen',
    'arbeitgeberzuschuss mutterschaft',
    'schutzfrist mutterschutz',
    'mutterschutz geld',
    'zuschuss mutterschaftsgeld',
  ],
  intro:
    'Während der Mutterschutz-Schutzfrist (regulär 6 Wochen vor und 8 Wochen nach der Geburt) erhalten gesetzlich Versicherte Mutterschaftsgeld von der Krankenkasse – höchstens 13 € pro Kalendertag. Der Arbeitgeber zahlt die Differenz zum durchschnittlichen Nettoentgelt als Zuschuss. So bleibt das Netto in der Schutzfrist erhalten. Vereinfachte Orientierung (Stand 2026).',
  formula:
    'Netto/Tag = Netto/30; Kasse = min(13; Netto/Tag); AG-Zuschuss = Netto/Tag − Kasse; je × Schutzfrist-Tage',
  inputs: [
    { type: 'number', id: 'netto', label: 'Durchschnittliches Nettoentgelt', unit: '€/Monat', default: 1800, min: 0, max: 12000, step: 50, help: 'Netto der letzten 3 Monate' },
    { type: 'number', id: 'tage', label: 'Tage der Schutzfrist', unit: 'Tage', default: 98, min: 1, max: 200, step: 1, help: 'regulär 98 Tage (14 Wochen)' },
  ],
  compute: (v) => {
    const netto = Math.max(0, num(v.netto, 1800));
    const tage = Math.max(1, Math.round(num(v.tage, 98)));
    const nettoProTag = netto / 30;
    const kasseProTag = Math.min(KASSE_MAX_PRO_TAG, nettoProTag);
    const agProTag = Math.max(0, nettoProTag - kasseProTag);
    const kasseGesamt = kasseProTag * tage;
    const agGesamt = agProTag * tage;
    const gesamt = kasseGesamt + agGesamt;
    return [
      { label: 'Gesamtleistung Schutzfrist', value: gesamt, unit: '€', digits: 2, primary: true },
      { label: 'Mutterschaftsgeld Krankenkasse', value: kasseGesamt, unit: '€', digits: 2 },
      { label: 'Arbeitgeberzuschuss', value: agGesamt, unit: '€', digits: 2 },
      { label: 'Nettoentgelt pro Kalendertag', value: nettoProTag, unit: '€', digits: 2 },
    ];
  },
  howto: [
    'Durchschnittliches monatliches Nettoentgelt der letzten drei Monate eingeben.',
    'Tage der Schutzfrist eintragen (regulär 98, bei Früh-/Mehrlingsgeburten mehr).',
    'Aufteilung in Kassenleistung und Arbeitgeberzuschuss ablesen.',
  ],
  faq: [
    { q: 'Wie hoch ist das Mutterschaftsgeld der Krankenkasse?', a: 'Gesetzlich Versicherte erhalten höchstens 13 € pro Kalendertag von der Krankenkasse. Liegt das Nettoentgelt darüber, zahlt der Arbeitgeber die Differenz als Zuschuss.' },
    { q: 'Wie lange dauert die Schutzfrist?', a: 'Regulär 6 Wochen vor und 8 Wochen nach der Geburt, also 14 Wochen bzw. rund 98 Kalendertage. Bei Früh- und Mehrlingsgeburten verlängert sich die Frist nach der Geburt.' },
    { q: 'Was ist der Arbeitgeberzuschuss?', a: 'Der Arbeitgeber stockt das Mutterschaftsgeld auf das bisherige durchschnittliche Nettoentgelt auf, damit kein finanzieller Nachteil entsteht.' },
    { q: 'Wie genau ist die Schätzung?', a: 'Es ist eine vereinfachte Näherung auf Kalendertagsbasis (Netto/30). Die genaue Abrechnung kann abweichen. Privat Versicherte erhalten abweichende Leistungen (Stand 2026).' },
  ],
  related: ['elterngeld-rechner', 'kindergeld-rechner', 'kosten-kind-rechner'],
  examples: [
    {
      values: { netto: 1800, tage: 98 },
      expect: [
        { label: 'Nettoentgelt pro Kalendertag', value: 60, tolerance: 0.01 },
        { label: 'Mutterschaftsgeld Krankenkasse', value: 1274, tolerance: 0.01 },
        { label: 'Gesamtleistung Schutzfrist', value: 5880, tolerance: 0.01 },
      ],
    },
    {
      values: { netto: 300, tage: 98 },
      expect: [{ label: 'Arbeitgeberzuschuss', value: 0, tolerance: 0.01 }],
    },
  ],
  updated: '2026-06-18',
};
