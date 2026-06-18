import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'urlaub-tankkosten-rechner',
  category: 'auto',
  title: 'Urlaub-Tankkosten-Rechner',
  shortTitle: 'Urlaubsfahrt',
  description:
    'Berechne die Spritkosten für deine Urlaubsfahrt mit Hin- und Rückreise – inklusive Kosten pro Mitfahrer.',
  keywords: [
    'tankkosten urlaub berechnen',
    'spritkosten urlaubsfahrt',
    'benzinkosten reise rechner',
    'fahrtkosten urlaub',
    'spritkosten pro person urlaub',
    'roadtrip kosten rechner',
  ],
  formula:
    'Kosten = (einfache Strecke × Fahrten) × (Verbrauch/100) × Spritpreis; pro Person = Kosten / Personen',
  intro:
    'Vor einer längeren Urlaubsfahrt lohnt sich ein Blick auf die zu erwartenden Spritkosten. Dieser Rechner berücksichtigt Hin- und Rückfahrt und teilt die Kosten optional auf alle Mitfahrer auf.',
  inputs: [
    { type: 'number', id: 'strecke', label: 'Einfache Strecke', unit: 'km', default: 800, min: 0, step: 10, help: 'Entfernung zum Reiseziel (eine Richtung)' },
    {
      type: 'select',
      id: 'fahrten',
      label: 'Fahrt',
      default: '2',
      options: [
        { value: '1', label: 'Nur Hinfahrt' },
        { value: '2', label: 'Hin- und Rückfahrt' },
      ],
    },
    { type: 'number', id: 'verbrauch', label: 'Verbrauch', unit: 'l/100 km', default: 6.5, min: 0, step: 0.1 },
    { type: 'number', id: 'preis', label: 'Spritpreis', unit: 'EUR/l', default: 1.80, min: 0, step: 0.01 },
    { type: 'number', id: 'personen', label: 'Personen im Auto', unit: '', default: 4, min: 1, step: 1 },
  ],
  compute: (v) => {
    const strecke = num(v.strecke);
    const fahrten = num(v.fahrten);
    const verbrauch = num(v.verbrauch);
    const preis = num(v.preis);
    const personen = Math.max(1, num(v.personen));
    const gesamtKm = strecke * fahrten;
    const liter = (gesamtKm * verbrauch) / 100;
    const kosten = liter * preis;
    const proPerson = kosten / personen;
    return [
      { label: 'Spritkosten gesamt', value: kosten, unit: 'EUR', digits: 2, primary: true },
      { label: 'Kosten pro Person', value: proPerson, unit: 'EUR', digits: 2 },
      { label: 'Gesamtstrecke', value: gesamtKm, unit: 'km', digits: 0 },
      { label: 'Benötigter Kraftstoff', value: liter, unit: 'l', digits: 1 },
    ];
  },
  howto: [
    'Einfache Strecke zum Reiseziel eintragen.',
    'Wählen, ob nur Hinfahrt oder Hin- und Rückfahrt gerechnet wird.',
    'Verbrauch und Spritpreis erfassen.',
    'Personenzahl angeben, um die Kosten pro Mitfahrer zu sehen.',
  ],
  faq: [
    { q: 'Soll ich Autobahn- oder Stadtverbrauch ansetzen?', a: 'Für lange Urlaubsfahrten überwiegt der Autobahnanteil. Bei konstanter Reisegeschwindigkeit liegt der Verbrauch oft nahe dem Normwert oder etwas darüber.' },
    { q: 'Sind Maut und Tunnelgebühren enthalten?', a: 'Nein, der Rechner erfasst nur Spritkosten. Vignetten, Maut und Fähren musst du separat einplanen.' },
    { q: 'Wie teile ich die Kosten fair auf?', a: 'Die einfachste Lösung ist eine gleichmäßige Aufteilung auf alle Mitfahrer, wie sie der Rechner ausweist.' },
  ],
  related: ['benzin-pro-person-rechner', 'spritkosten-rechner', 'pendler-spritkosten-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { strecke: 800, fahrten: '2', verbrauch: 6.5, preis: 1.80, personen: 4 },
      // gesamtKm = 1600; Liter = 104; Kosten = 187.2; pro Person = 46.8
      expect: [{ label: 'Spritkosten gesamt', value: 187.2, tolerance: 0.1 }],
    },
    {
      values: { strecke: 500, fahrten: '2', verbrauch: 7, preis: 1.75, personen: 2 },
      // gesamtKm = 1000; Liter = 70; Kosten = 122.5; pro Person = 61.25
      expect: [{ label: 'Kosten pro Person', value: 61.25, tolerance: 0.05 }],
    },
  ],
};
