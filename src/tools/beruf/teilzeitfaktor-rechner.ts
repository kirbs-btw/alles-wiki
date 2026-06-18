import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'teilzeitfaktor-rechner',
  category: 'beruf',
  title: 'Teilzeitfaktor & Stellenanteil Rechner',
  shortTitle: 'Teilzeitfaktor',
  description:
    'Berechne deinen Beschäftigungsgrad: Teilzeitstunden im Verhältnis zur Vollzeit als Faktor, Prozent und Stellenanteil (VZÄ).',
  keywords: [
    'teilzeitfaktor rechner',
    'beschäftigungsgrad berechnen',
    'stellenanteil berechnen',
    'vollzeitäquivalent vzä',
    'teilzeit prozent rechner',
    'stellenumfang berechnen',
  ],
  formula:
    'Teilzeitfaktor = Teilzeitstunden ÷ Vollzeitstunden;  Prozent = Faktor × 100',
  inputs: [
    { type: 'number', id: 'teilzeit', label: 'Eigene Wochenstunden', unit: 'h', default: 30, min: 0, step: 0.5 },
    { type: 'number', id: 'vollzeit', label: 'Vollzeit-Wochenstunden im Betrieb', unit: 'h', default: 40, min: 1, step: 0.5, help: 'Tarifliche oder betriebsübliche Vollzeit (oft 38,5 oder 40 Stunden).' },
  ],
  compute: (v) => {
    const teilzeit = num(v.teilzeit);
    const vollzeit = num(v.vollzeit);

    const faktor = vollzeit > 0 ? teilzeit / vollzeit : 0;
    const prozent = faktor * 100;
    const tageBei5 = faktor * 5;

    return [
      { label: 'Beschäftigungsgrad', value: prozent, unit: '%', digits: 1, primary: true },
      { label: 'Teilzeitfaktor (VZÄ)', value: faktor, unit: '', digits: 4 },
      { label: 'Entspricht Arbeitstagen (bei 5-Tage-Woche)', value: tageBei5, unit: 'Tage', digits: 2 },
    ];
  },
  intro:
    'Der Teilzeitfaktor (Beschäftigungsgrad) gibt an, welchen Anteil einer Vollzeitstelle du arbeitest. Er ist die Grundlage für die anteilige Berechnung von Gehalt, Urlaub und vielen weiteren Ansprüchen. Der Rechner ermittelt aus deinen Wochenstunden und der betrieblichen Vollzeit den Faktor in Prozent sowie als Vollzeitäquivalent (VZÄ).',
  howto: [
    'Trage deine eigenen Wochenstunden ein.',
    'Gib die im Betrieb übliche Vollzeit-Wochenstundenzahl an.',
    'Lies den Beschäftigungsgrad in Prozent und als VZÄ-Faktor ab.',
  ],
  faq: [
    { q: 'Was ist ein Vollzeitäquivalent (VZÄ)?', a: 'Das VZÄ rechnet Teilzeitstellen in ganze Vollzeitstellen um. Eine 30-Stunden-Stelle bei 40 Stunden Vollzeit entspricht einem VZÄ von 0,75.' },
    { q: 'Wofür brauche ich den Teilzeitfaktor?', a: 'Er dient als Basis, um Gehalt, Urlaubstage, Sonderzahlungen oder Sollarbeitszeit anteilig auf den Beschäftigungsgrad herunterzurechnen.' },
    { q: 'Welche Vollzeit-Stundenzahl ist richtig?', a: 'Maßgeblich ist die im Betrieb oder Tarif geltende regelmäßige Vollzeit – häufig 38,5 oder 40 Stunden pro Woche.' },
    { q: 'Wie rechne ich von Prozent auf Stunden zurück?', a: 'Multipliziere den Beschäftigungsgrad mit den Vollzeitstunden: 75 % von 40 Stunden sind 30 Wochenstunden.' },
  ],
  related: ['teilzeit-gehalt-rechner', 'urlaubsanspruch-rechner', 'gleitzeit-saldo-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { teilzeit: 30, vollzeit: 40 },
      expect: [
        { label: 'Beschäftigungsgrad', value: 75, tolerance: 0.05 },
        { label: 'Teilzeitfaktor (VZÄ)', value: 0.75, tolerance: 0.001 },
        { label: 'Entspricht Arbeitstagen (bei 5-Tage-Woche)', value: 3.75, tolerance: 0.01 },
      ],
    },
    {
      values: { teilzeit: 20, vollzeit: 38.5 },
      expect: [
        { label: 'Beschäftigungsgrad', value: 51.95, tolerance: 0.1 },
        { label: 'Teilzeitfaktor (VZÄ)', value: 0.5195, tolerance: 0.001 },
      ],
    },
  ],
};
