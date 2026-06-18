import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'haushaltsbuch-rechner',
  category: 'familie',
  title: 'Haushaltsbuch-Rechner: Ausgaben aufteilen',
  shortTitle: 'Haushaltsbuch',
  description:
    'Verteile dein Nettoeinkommen nach der 50-30-20-Regel auf Grundbedarf, Wünsche und Sparen – und vergleiche mit deinen tatsächlichen Ausgaben.',
  keywords: [
    'haushaltsbuch rechner',
    '50 30 20 regel',
    'budget aufteilen',
    'ausgaben aufteilen',
    'einkommen verteilen',
    'wieviel sparen',
    'budgetregel rechner',
  ],
  intro:
    'Die 50-30-20-Regel ist eine einfache Faustformel zum Aufteilen des Nettoeinkommens: 50 % für Grundbedarf, 30 % für persönliche Wünsche und 20 % fürs Sparen. Dieser Rechner berechnet die Zielbeträge und vergleicht sie mit Ihren tatsächlichen Ausgaben, sodass Sie sofort sehen, wo Sie über oder unter dem Plan liegen.',
  formula:
    'Grundbedarf = 50 %, Wünsche = 30 %, Sparen = 20 % des Nettoeinkommens',
  inputs: [
    { type: 'number', id: 'netto', label: 'Monatliches Nettoeinkommen', unit: '€', default: 3000, min: 0, step: 50 },
    { type: 'number', id: 'grundbedarf', label: 'Ausgaben Grundbedarf (ist)', unit: '€', default: 1600, min: 0, step: 25, help: 'Miete, Lebensmittel, Versicherungen' },
    { type: 'number', id: 'wuensche', label: 'Ausgaben Wünsche (ist)', unit: '€', default: 800, min: 0, step: 25, help: 'Freizeit, Hobbys, Restaurant' },
  ],
  compute: (v) => {
    const netto = Math.max(0, num(v.netto, 3000));
    const grundbedarf = Math.max(0, num(v.grundbedarf));
    const wuensche = Math.max(0, num(v.wuensche));
    const zielGrund = netto * 0.5;
    const zielWuensche = netto * 0.3;
    const zielSparen = netto * 0.2;
    const tatsaechlichSparen = netto - grundbedarf - wuensche;
    const abweichungSparen = tatsaechlichSparen - zielSparen;
    return [
      { label: 'Ziel Grundbedarf (50 %)', value: zielGrund, unit: '€', digits: 2 },
      { label: 'Ziel Wünsche (30 %)', value: zielWuensche, unit: '€', digits: 2 },
      { label: 'Ziel Sparen (20 %)', value: zielSparen, unit: '€', digits: 2, primary: true },
      { label: 'Tatsächlich verfügbar zum Sparen', value: tatsaechlichSparen, unit: '€', digits: 2, help: 'Netto minus Grundbedarf und Wünsche' },
      { label: 'Abweichung beim Sparen', value: abweichungSparen, unit: '€', digits: 2, help: 'positiv = mehr als Ziel' },
    ];
  },
  howto: [
    'Monatliches Nettoeinkommen des Haushalts eingeben.',
    'Tatsächliche Ausgaben für Grundbedarf eintragen.',
    'Tatsächliche Ausgaben für Wünsche und Freizeit erfassen.',
    'Zielbeträge mit dem ablesen, was real zum Sparen übrig bleibt.',
  ],
  faq: [
    { q: 'Was bedeutet die 50-30-20-Regel?', a: '50 % des Nettoeinkommens für notwendige Ausgaben (Grundbedarf), 30 % für persönliche Wünsche und 20 % fürs Sparen oder Schuldentilgung. Sie ist eine grobe Orientierung, kein starres Gesetz.' },
    { q: 'Was gehört zum Grundbedarf?', a: 'Alle notwendigen Ausgaben: Miete, Nebenkosten, Lebensmittel, Versicherungen, Mobilität zur Arbeit und ähnliche unverzichtbare Posten.' },
    { q: 'Was zählt als Wunsch?', a: 'Alles, worauf man theoretisch verzichten könnte: Restaurantbesuche, Streaming, Hobbys, Urlaub, neue Elektronik und ähnliche Freizeitausgaben.' },
    { q: 'Funktioniert die Regel bei hoher Miete?', a: 'In teuren Städten liegt der Grundbedarf oft über 50 %. Dann passt man die Anteile an – etwa 60-25-15. Wichtig ist, dass überhaupt ein fester Sparanteil bleibt.' },
    { q: 'Hilft das beim Schuldenabbau?', a: 'Ja. Der 20-%-Anteil kann statt fürs Sparen auch zur Tilgung von Krediten genutzt werden. Teure Schulden sollten in der Regel Vorrang vor dem Sparen haben.' },
  ],
  related: ['familienbudget-rechner', 'sparplan-kind-rechner', 'kosten-kind-rechner'],
  examples: [
    {
      values: { netto: 3000, grundbedarf: 1600, wuensche: 800 },
      expect: [
        { label: 'Ziel Sparen (20 %)', value: 600, tolerance: 0.01 },
        { label: 'Tatsächlich verfügbar zum Sparen', value: 600, tolerance: 0.01 },
        { label: 'Abweichung beim Sparen', value: 0, tolerance: 0.01 },
      ],
    },
  ],
  updated: '2026-06-18',
};
