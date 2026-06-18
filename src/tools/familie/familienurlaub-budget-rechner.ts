import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

// Budgetrechner für den Familienurlaub. Summiert Anreise, Unterkunft,
// Verpflegung und Aktivitäten über die Reisedauer und Personenzahl.
// Kinder werden über einen Kinderfaktor (z. B. 50 %) bei tagesabhängigen
// Kosten günstiger gerechnet. Reine Budgetplanung.

export const tool: Tool = {
  slug: 'familienurlaub-budget-rechner',
  category: 'familie',
  title: 'Familienurlaub Budget-Rechner',
  shortTitle: 'Urlaubsbudget',
  description:
    'Plane das Budget für den Familienurlaub: Anreise, Unterkunft, Verpflegung und Aktivitäten über Reisedauer und Personenzahl.',
  keywords: [
    'familienurlaub budget rechner',
    'urlaubskosten familie berechnen',
    'reisebudget familie',
    'urlaub kosten rechner',
    'familienreise budget',
    'urlaubskasse rechner',
  ],
  intro:
    'Was kostet der nächste Familienurlaub? Dieser Rechner addiert die Anreise (einmalig), die Unterkunft (pro Nacht) sowie Verpflegung und Aktivitäten (pro Person und Tag). Kinder werden bei den tagesabhängigen Kosten mit einem Kinderfaktor günstiger gerechnet. So entsteht eine realistische Budgetschätzung für die Urlaubskasse.',
  formula:
    'Budget = Anreise + Unterkunft×Nächte + (Erwachsene + Kinder×0,5) × (Verpflegung + Aktivitäten) × Tage',
  inputs: [
    { type: 'number', id: 'erwachsene', label: 'Erwachsene', unit: 'Personen', default: 2, min: 1, max: 10, step: 1 },
    { type: 'number', id: 'kinder', label: 'Kinder', unit: 'Personen', default: 2, min: 0, max: 10, step: 1, help: 'werden mit halben Tageskosten gerechnet' },
    { type: 'number', id: 'tage', label: 'Reisedauer', unit: 'Tage', default: 7, min: 1, max: 60, step: 1 },
    { type: 'number', id: 'anreise', label: 'Anreise (gesamt, hin & zurück)', unit: '€', default: 400, min: 0, max: 10000, step: 10 },
    { type: 'number', id: 'unterkunft', label: 'Unterkunft pro Nacht', unit: '€', default: 120, min: 0, max: 2000, step: 10 },
    { type: 'number', id: 'verpflegung', label: 'Verpflegung pro Person & Tag', unit: '€', default: 25, min: 0, max: 300, step: 1 },
    { type: 'number', id: 'aktivitaeten', label: 'Aktivitäten pro Person & Tag', unit: '€', default: 15, min: 0, max: 300, step: 1 },
  ],
  compute: (v) => {
    const erwachsene = Math.max(1, Math.round(num(v.erwachsene, 2)));
    const kinder = Math.max(0, Math.round(num(v.kinder, 2)));
    const tage = Math.max(1, Math.round(num(v.tage, 7)));
    const anreise = Math.max(0, num(v.anreise, 400));
    const unterkunft = Math.max(0, num(v.unterkunft, 120));
    const verpflegung = Math.max(0, num(v.verpflegung, 25));
    const aktivitaeten = Math.max(0, num(v.aktivitaeten, 15));
    const personenAequivalent = erwachsene + kinder * 0.5;
    const tageskostenProPerson = verpflegung + aktivitaeten;
    const unterkunftGesamt = unterkunft * tage;
    const tagesGesamt = personenAequivalent * tageskostenProPerson * tage;
    const budget = anreise + unterkunftGesamt + tagesGesamt;
    const proKopf = (erwachsene + kinder) > 0 ? budget / (erwachsene + kinder) : 0;
    return [
      { label: 'Gesamtbudget Urlaub', value: budget, unit: '€', digits: 2, primary: true },
      { label: 'Unterkunft gesamt', value: unterkunftGesamt, unit: '€', digits: 2 },
      { label: 'Verpflegung & Aktivitäten gesamt', value: tagesGesamt, unit: '€', digits: 2 },
      { label: 'Budget pro Kopf', value: proKopf, unit: '€', digits: 2 },
    ];
  },
  howto: [
    'Anzahl Erwachsene und Kinder sowie die Reisedauer eingeben.',
    'Anreisekosten (gesamt) und Unterkunft pro Nacht eintragen.',
    'Verpflegung und Aktivitäten pro Person und Tag schätzen.',
    'Das Gesamtbudget und den Betrag pro Kopf ablesen.',
  ],
  faq: [
    { q: 'Warum werden Kinder günstiger gerechnet?', a: 'Kinder verbrauchen bei Verpflegung und Aktivitäten meist weniger. Der Rechner setzt sie mit halben Tageskosten an. Anreise und Unterkunft gelten für alle gemeinsam.' },
    { q: 'Sind Nebenkosten enthalten?', a: 'Anreise, Unterkunft, Verpflegung und Aktivitäten sind abgedeckt. Für Reiserücktritt, Mietwagen oder Mitbringsel sollten Sie einen Puffer einplanen.' },
    { q: 'Wie viele Nächte werden gerechnet?', a: 'Der Rechner setzt die Unterkunftsnächte gleich der Reisedauer in Tagen. Bei Bedarf die Tageszahl entsprechend anpassen.' },
    { q: 'Ist das Ergebnis verbindlich?', a: 'Nein, es ist eine Budgetplanung mit Ihren eigenen Schätzwerten. Die realen Kosten hängen von Saison und Reiseziel ab.' },
  ],
  related: ['familienbudget-rechner', 'kosten-kind-rechner', 'haushaltsbuch-rechner'],
  examples: [
    {
      values: { erwachsene: 2, kinder: 2, tage: 7, anreise: 400, unterkunft: 120, verpflegung: 25, aktivitaeten: 15 },
      expect: [
        { label: 'Unterkunft gesamt', value: 840, tolerance: 0.01 },
        { label: 'Verpflegung & Aktivitäten gesamt', value: 840, tolerance: 0.01 },
        { label: 'Gesamtbudget Urlaub', value: 2080, tolerance: 0.01 },
      ],
    },
    {
      values: { erwachsene: 2, kinder: 0, tage: 5, anreise: 200, unterkunft: 100, verpflegung: 30, aktivitaeten: 20 },
      expect: [{ label: 'Gesamtbudget Urlaub', value: 1200, tolerance: 0.01 }],
    },
  ],
  updated: '2026-06-18',
};
