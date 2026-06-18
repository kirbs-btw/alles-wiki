import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'pfaendungsfreibetrag-rechner',
  category: 'recht',
  title: 'Pfändungsfreibetrag-Rechner (Näherung, Stand 2026)',
  shortTitle: 'Pfändungsfreibetrag',
  description:
    'Schätze deinen unpfändbaren Grundbetrag beim Arbeitslohn nach § 850c ZPO – mit Zuschlag für Unterhaltspflichten. Vereinfachte Näherung, Stand 2026.',
  keywords: [
    'pfändungsfreibetrag rechner',
    'pfändungsfreigrenze 2026',
    'pfändbares einkommen berechnen',
    'unpfändbarer betrag lohn',
    '850c zpo',
    'pfändungstabelle näherung',
    'lohnpfändung freibetrag',
  ],
  formula: 'Freibetrag ≈ Grundfreibetrag + Zuschläge je unterhaltsberechtigter Person (§ 850c ZPO)',
  inputs: [
    { type: 'number', id: 'netto', label: 'Monatliches Nettoeinkommen', unit: '€', default: 2200, min: 0, step: 10, help: 'Bereinigtes Netto nach § 850e ZPO.' },
    { type: 'number', id: 'unterhalt', label: 'Unterhaltspflichtige Personen', unit: '', default: 1, min: 0, max: 5, step: 1, help: 'Z. B. Ehepartner oder Kinder, denen du Unterhalt leistest.' },
  ],
  compute: (v) => {
    const netto = num(v.netto);
    const unterhalt = Math.min(num(v.unterhalt), 5);
    // Näherung Stand 2026 (Pfändungsfreigrenzen § 850c ZPO):
    const grundfreibetrag = 1500; // unpfändbarer Grundbetrag (Näherung)
    const zuschlagErste = 560;    // erste unterhaltsberechtigte Person (Näherung)
    const zuschlagWeitere = 310;  // jede weitere Person (Näherung)
    let freibetrag = grundfreibetrag;
    if (unterhalt >= 1) freibetrag += zuschlagErste;
    if (unterhalt > 1) freibetrag += (unterhalt - 1) * zuschlagWeitere;
    const pfaendbar = Math.max(netto - freibetrag, 0);
    // Oberhalb des Freibetrags verbleibt dem Schuldner grob 30 % des Mehrbetrags (vereinfacht).
    const verbleibtZusatz = pfaendbar * 0.3;
    const tatsaechlichPfaendbar = pfaendbar - verbleibtZusatz;
    const verbleibtGesamt = netto - tatsaechlichPfaendbar;
    return [
      { label: 'Unpfändbarer Freibetrag', value: freibetrag, unit: '€', digits: 0, primary: true },
      { label: 'Geschätzt pfändbarer Betrag', value: tatsaechlichPfaendbar, unit: '€', digits: 2 },
      { label: 'Verbleibt dir insgesamt', value: verbleibtGesamt, unit: '€', digits: 2 },
    ];
  },
  intro:
    'Bei einer Lohnpfändung bleibt ein Teil des Einkommens unpfändbar, damit das Existenzminimum gesichert ist (§ 850c ZPO). Der Freibetrag steigt mit der Zahl der unterhaltsberechtigten Personen. Die genauen Beträge legt die amtliche Pfändungstabelle fest, die jährlich zum 1. Juli angepasst wird. Dieser Rechner liefert eine vereinfachte Näherung (Stand 2026) und ersetzt nicht den Blick in die aktuelle Tabelle.',
  howto: [
    'Bereinigtes monatliches Nettoeinkommen eingeben.',
    'Anzahl der Personen angeben, denen du Unterhalt schuldest.',
    'Unpfändbaren Freibetrag und geschätzten pfändbaren Betrag ablesen.',
    'Für den exakten Wert die amtliche Pfändungstabelle prüfen.',
  ],
  faq: [
    { q: 'Was ist der Pfändungsfreibetrag?', a: 'Der Teil des Arbeitseinkommens, der dem Schuldner zur Sicherung des Lebensunterhalts verbleibt und nicht gepfändet werden darf (§ 850c ZPO).' },
    { q: 'Wie wirken Unterhaltspflichten?', a: 'Für jede unterhaltsberechtigte Person erhöht sich der Freibetrag. Die erste Person bringt den größten Zuschlag, weitere jeweils einen kleineren.' },
    { q: 'Sind die Werte hier verbindlich?', a: 'Nein. Es handelt sich um eine vereinfachte Näherung für 2026. Maßgeblich ist die amtliche Pfändungstabelle, die das Bundesjustizministerium jährlich zum 1. Juli aktualisiert.' },
    { q: 'Was zählt zum pfändbaren Einkommen?', a: 'Maßgeblich ist das bereinigte Netto. Bestimmte Beträge wie Teile von Überstunden- und Urlaubsgeld bleiben nach § 850a ZPO ganz oder teilweise unpfändbar.' },
    { q: 'Wie schütze ich mein Konto?', a: 'Mit einem Pfändungsschutzkonto (P-Konto) ist ein monatlicher Grundbetrag automatisch geschützt. Das ist unabhängig von der Lohnpfändung beim Arbeitgeber.' },
  ],
  related: ['verzugszinsen-rechner', 'mahngebuehren-rechner', 'abfindung-rechner'],
  examples: [
    {
      values: { netto: 2200, unterhalt: 1 },
      expect: [
        { label: 'Unpfändbarer Freibetrag', value: 2060, tolerance: 0.5 },
      ],
    },
    {
      values: { netto: 1400, unterhalt: 0 },
      expect: [
        { label: 'Unpfändbarer Freibetrag', value: 1500, tolerance: 0.5 },
        { label: 'Geschätzt pfändbarer Betrag', value: 0, tolerance: 0.01 },
      ],
    },
  ],
  updated: '2026-06-18',
};
