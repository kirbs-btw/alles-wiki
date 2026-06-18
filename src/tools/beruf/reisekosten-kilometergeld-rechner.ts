import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'reisekosten-kilometergeld-rechner',
  category: 'beruf',
  title: 'Kilometergeld-Rechner (Reisekosten Pkw)',
  shortTitle: 'Kilometergeld',
  description:
    'Berechne die steuerfreie Kilometerpauschale für berufliche Fahrten mit dem privaten Pkw: 0,30 € je gefahrenem Kilometer (Hin- und Rückweg).',
  keywords: [
    'kilometergeld rechner',
    'kilometerpauschale dienstreise',
    'reisekosten pkw berechnen',
    'fahrtkosten erstattung 0,30 euro',
    'km pauschale beruflich',
    'dienstfahrt kilometer abrechnen',
  ],
  formula:
    'Erstattung = gefahrene km (gesamt) × Fahrten × Satz je km',
  inputs: [
    { type: 'number', id: 'km', label: 'Gefahrene Kilometer je Fahrt', unit: 'km', default: 120, min: 0, step: 1, help: 'Gesamte gefahrene Strecke einer Fahrt – bei Hin- und Rückfahrt beide Strecken zusammen.' },
    { type: 'number', id: 'fahrten', label: 'Anzahl Fahrten', unit: 'x', default: 1, min: 0, step: 1 },
    { type: 'number', id: 'satz', label: 'Satz je Kilometer', unit: '€', default: 0.3, min: 0, step: 0.01, help: 'Pauschal 0,30 € je km für den Pkw. Höhere tatsächliche Kosten sind mit Nachweis möglich.' },
  ],
  compute: (v) => {
    const km = num(v.km);
    const fahrten = num(v.fahrten);
    const satz = num(v.satz);

    const gesamtKm = km * fahrten;
    const erstattung = gesamtKm * satz;
    const proFahrt = km * satz;

    return [
      { label: 'Kilometergeld gesamt', value: erstattung, unit: '€', digits: 2, primary: true },
      { label: 'Erstattung pro Fahrt', value: proFahrt, unit: '€', digits: 2 },
      { label: 'Gefahrene Kilometer gesamt', value: gesamtKm, unit: 'km', digits: 0 },
    ];
  },
  intro:
    'Für berufliche Auswärtsfahrten mit dem eigenen Pkw kannst du eine Kilometerpauschale ansetzen oder erstattet bekommen: pauschal 0,30 € je tatsächlich gefahrenem Kilometer. Anders als bei der Entfernungspauschale zählt hier die komplette Strecke inklusive Rückweg. Der Rechner liefert eine Orientierung für Reisekostenabrechnung und Steuererklärung.',
  howto: [
    'Trage die je Fahrt gefahrenen Kilometer ein (Hin- und Rückweg zusammen).',
    'Gib die Anzahl der Fahrten an.',
    'Bestätige oder ändere den Kilometersatz (Standard 0,30 €).',
    'Lies das gesamte Kilometergeld ab.',
  ],
  faq: [
    { q: 'Wie hoch ist die Kilometerpauschale?', a: 'Für den Pkw 0,30 € je gefahrenem Kilometer. Bei höheren tatsächlichen Kosten können diese mit Einzelnachweis angesetzt werden.' },
    { q: 'Zählt hier der Hin- und Rückweg?', a: 'Ja. Anders als bei der Entfernungspauschale werden bei beruflichen Reisekosten alle tatsächlich gefahrenen Kilometer angesetzt, also auch der Rückweg.' },
    { q: 'Gilt das auch für Fahrten zur Arbeit?', a: 'Nein. Für den normalen Arbeitsweg gilt die Entfernungspauschale (einfache Strecke). Das Kilometergeld betrifft Dienst- und Auswärtsfahrten.' },
    { q: 'Steuerfrei oder steuerpflichtig?', a: 'Eine Erstattung durch den Arbeitgeber bis 0,30 € je km ist in der Regel steuerfrei. Ohne Erstattung kannst du den Betrag als Werbungskosten geltend machen.' },
  ],
  related: ['pendlerpauschale-rechner', 'verpflegungsmehraufwand-rechner', 'dienstwagen-1-prozent-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { km: 120, fahrten: 1, satz: 0.3 },
      expect: [
        { label: 'Kilometergeld gesamt', value: 36, tolerance: 0.01 },
        { label: 'Gefahrene Kilometer gesamt', value: 120, tolerance: 0.01 },
      ],
    },
    {
      values: { km: 50, fahrten: 10, satz: 0.3 },
      expect: [
        { label: 'Kilometergeld gesamt', value: 150, tolerance: 0.01 },
        { label: 'Erstattung pro Fahrt', value: 15, tolerance: 0.01 },
      ],
    },
  ],
};
