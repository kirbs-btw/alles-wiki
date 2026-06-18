import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'rechnung-splitten-rechner',
  category: 'alltag',
  title: 'Rechnung splitten – inkl. ungleichem Anteil',
  shortTitle: 'Rechnung splitten',
  description:
    'Teile eine gemeinsame Rechnung fair auf mehrere Personen auf – mit gleichem Anteil oder wenn eine Person einen festen Sonderbetrag extra zahlt.',
  keywords: [
    'rechnung splitten',
    'rechnung teilen rechner',
    'kosten aufteilen',
    'gemeinsame rechnung teilen',
    'wer zahlt wie viel',
    'rechnung aufteilen personen',
    'split rechner',
  ],
  formula: 'Aufzuteilen = Gesamt − Sonderbetrag; Pro Person = Aufzuteilen / (Personen − Sonderzahler)',
  inputs: [
    { type: 'number', id: 'gesamt', label: 'Gesamtbetrag', unit: '€', default: 120, min: 0, step: 0.5 },
    { type: 'number', id: 'personen', label: 'Anzahl Personen', default: 4, min: 1, step: 1 },
    { type: 'number', id: 'sonder_personen', label: 'Davon mit Sonderbetrag', default: 0, min: 0, step: 1, help: 'Personen, die einen festen Extra-Betrag zahlen (z. B. teures Gericht).' },
    { type: 'number', id: 'sonder_betrag', label: 'Sonderbetrag je solcher Person', unit: '€', default: 0, min: 0, step: 0.5 },
  ],
  compute: (v) => {
    const gesamt = num(v.gesamt);
    const personen = Math.max(1, Math.round(num(v.personen, 1)));
    const sonderP = Math.max(0, Math.min(personen, Math.round(num(v.sonder_personen))));
    const sonderB = num(v.sonder_betrag);
    const sonderSumme = sonderP * sonderB;
    const restPersonen = personen - sonderP;
    const aufzuteilen = gesamt - sonderSumme;
    const proRest = restPersonen > 0 ? aufzuteilen / restPersonen : 0;
    return [
      { label: 'Pro Person (Standard)', value: proRest, unit: '€', digits: 2, primary: true, help: 'Betrag je Person ohne Sonderbetrag.' },
      { label: 'Zahlung je Sonder-Person', value: sonderB, unit: '€', digits: 2 },
      { label: 'Summe Sonderbeträge', value: sonderSumme, unit: '€', digits: 2 },
      { label: 'Verbleibend aufzuteilen', value: aufzuteilen, unit: '€', digits: 2 },
    ];
  },
  intro:
    'Wenn mehrere Personen eine Rechnung teilen, ist es selten ganz gleichmäßig: Eine Person hatte vielleicht ein teureres Gericht. Dieser Rechner zieht feste Sonderbeträge zuerst ab und verteilt den Rest gleichmäßig auf alle übrigen Personen. Für eine reine Gleichaufteilung lässt du die Sonderbeträge einfach auf null.',
  howto: [
    'Gib den Gesamtbetrag der Rechnung ein.',
    'Trage die Gesamtzahl der beteiligten Personen ein.',
    'Falls einzelne Personen einen festen Extra-Betrag zahlen: Anzahl und Höhe dieses Betrags eintragen.',
    'Lies ab, was jede Standard-Person zahlt – die Sonder-Personen zahlen ihren eigenen Betrag.',
  ],
  faq: [
    { q: 'Wie teile ich einfach durch alle?', a: 'Lass "Davon mit Sonderbetrag" auf 0. Dann wird der Gesamtbetrag gleichmäßig durch alle Personen geteilt.' },
    { q: 'Wie funktioniert der Sonderbetrag?', a: 'Personen mit Sonderbetrag zahlen genau diesen festen Betrag. Die Summe dieser Beträge wird vom Gesamtbetrag abgezogen, der Rest wird auf die übrigen Personen verteilt.' },
    { q: 'Was, wenn die Sonderbeträge höher sind als die Rechnung?', a: 'Dann wird der verbleibende Betrag negativ – das ist ein Hinweis, dass die eingegebenen Sonderbeträge die Gesamtrechnung übersteigen. Prüfe deine Eingaben.' },
    { q: 'Sind hier Trinkgeld oder Steuern enthalten?', a: 'Nein, gerechnet wird mit dem eingegebenen Gesamtbetrag. Trinkgeld solltest du vorher aufschlagen; dafür eignet sich der Trinkgeld-Rechner.' },
  ],
  related: ['trinkgeld-rechner', 'benzin-pro-person-rechner', 'getraenke-pro-gast-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { gesamt: 120, personen: 4, sonder_personen: 0, sonder_betrag: 0 },
      expect: [{ label: 'Pro Person (Standard)', value: 30, tolerance: 0.01 }],
    },
    {
      values: { gesamt: 120, personen: 4, sonder_personen: 1, sonder_betrag: 45 },
      expect: [
        { label: 'Pro Person (Standard)', value: 25, tolerance: 0.01 },
        { label: 'Summe Sonderbeträge', value: 45, tolerance: 0.01 },
      ],
    },
  ],
};
