import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

// Kindergeburtstag-Budget pro Gastkind: Essen/Snacks + Mitgebsel + Programm/Bastelmaterial
// pro Kind, mal Gästezahl, plus fixe Posten (Torte, Deko, ggf. Location-Miete).
// Liefert Gesamtbudget und Kosten pro Gastkind inkl. Fixanteil. Reine Budgetplanung.

export const tool: Tool = {
  slug: 'kindergeburtstag-budget-rechner',
  category: 'familie',
  title: 'Kindergeburtstag-Budget-Rechner',
  shortTitle: 'Kindergeburtstag',
  description:
    'Plane das Budget für den Kindergeburtstag: Essen, Mitgebsel und Programm pro Gastkind plus fixe Kosten wie Torte und Deko – mit Gesamt und Kosten pro Kind.',
  keywords: [
    'kindergeburtstag budget',
    'kindergeburtstag kosten',
    'kindergeburtstag kosten pro kind',
    'budget kindergeburtstag rechner',
    'mitgebsel kosten',
    'kindergeburtstag planen kosten',
  ],
  intro:
    'Ein Kindergeburtstag lässt sich gut über die Kosten pro eingeladenem Kind planen. Dieser Rechner addiert die Pro-Kopf-Posten für Essen und Snacks, Mitgebsel sowie Programm- und Bastelmaterial, multipliziert sie mit der Zahl der Gastkinder und ergänzt fixe Posten wie Geburtstagstorte, Deko oder Location-Miete. Heraus kommt das Gesamtbudget und die Kosten pro Gastkind.',
  formula:
    'Gesamt = (Essen + Mitgebsel + Programm) × Gastkinder + Fixkosten; pro Kind = Gesamt / Gastkinder',
  inputs: [
    { type: 'number', id: 'kinder', label: 'Anzahl Gastkinder', unit: 'Kinder', default: 8, min: 1, max: 50, step: 1 },
    { type: 'number', id: 'essen', label: 'Essen & Snacks pro Kind', unit: '€', default: 5, min: 0, max: 50, step: 0.5 },
    { type: 'number', id: 'mitgebsel', label: 'Mitgebsel pro Kind', unit: '€', default: 4, min: 0, max: 50, step: 0.5, help: 'kleine Tüte zum Mitnehmen' },
    { type: 'number', id: 'programm', label: 'Programm/Material pro Kind', unit: '€', default: 6, min: 0, max: 100, step: 0.5, help: 'Bastelmaterial, Eintritt, Spiele' },
    { type: 'number', id: 'fix', label: 'Fixkosten (einmalig)', unit: '€', default: 30, min: 0, max: 2000, step: 5, help: 'Torte, Deko, ggf. Raummiete' },
  ],
  compute: (v) => {
    const kinder = Math.max(1, num(v.kinder, 8));
    const essen = Math.max(0, num(v.essen, 5));
    const mitgebsel = Math.max(0, num(v.mitgebsel, 4));
    const programm = Math.max(0, num(v.programm, 6));
    const fix = Math.max(0, num(v.fix, 30));
    const proKindVariabel = essen + mitgebsel + programm;
    const variabel = proKindVariabel * kinder;
    const gesamt = variabel + fix;
    const proKind = gesamt / kinder;
    return [
      { label: 'Gesamtbudget', value: gesamt, unit: '€', digits: 2, primary: true },
      { label: 'Kosten pro Gastkind', value: proKind, unit: '€', digits: 2, help: 'inkl. anteiliger Fixkosten' },
      { label: 'Variable Kosten pro Kind', value: proKindVariabel, unit: '€', digits: 2 },
      { label: 'Fixkosten', value: fix, unit: '€', digits: 2 },
    ];
  },
  howto: [
    'Anzahl der eingeladenen Gastkinder eintragen.',
    'Pro-Kind-Kosten für Essen, Mitgebsel und Programm schätzen.',
    'Fixe Einmalkosten wie Torte, Deko oder Raummiete ergänzen.',
    'Gesamtbudget und Kosten pro Gastkind ablesen.',
  ],
  faq: [
    { q: 'Wie viele Gäste sind beim Kindergeburtstag üblich?', a: 'Eine verbreitete Faustregel ist „so viele Gäste wie das Kind Jahre alt wird, plus eins“. Bei größeren Feiern steigt der Aufwand entsprechend.' },
    { q: 'Was kostet ein Kindergeburtstag pro Kind?', a: 'Zu Hause oft wenige Euro pro Kind, mit auswärtigem Programm (z. B. Kletterpark, Schwimmbad) deutlich mehr. Der Rechner macht Ihre eigene Planung sichtbar.' },
    { q: 'Warum sind die Kosten pro Kind höher als die variablen Kosten?', a: 'Die fixen Einmalkosten wie Torte und Deko werden auf alle Gastkinder umgelegt. Je mehr Kinder, desto kleiner der Fixanteil pro Kopf.' },
  ],
  related: ['familienfeier-budget-rechner', 'taschengeld-rechner', 'familienbudget-rechner'],
  examples: [
    {
      values: { kinder: 8, essen: 5, mitgebsel: 4, programm: 6, fix: 30 },
      expect: [
        { label: 'Variable Kosten pro Kind', value: 15, tolerance: 0.01 },
        { label: 'Gesamtbudget', value: 150, tolerance: 0.01 },
        { label: 'Kosten pro Gastkind', value: 18.75, tolerance: 0.01 },
      ],
    },
    {
      values: { kinder: 10, essen: 6, mitgebsel: 5, programm: 9, fix: 50 },
      expect: [{ label: 'Gesamtbudget', value: 250, tolerance: 0.01 }],
    },
  ],
  updated: '2026-06-19',
};
