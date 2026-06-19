import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'zulassungskosten-rechner',
  category: 'auto',
  title: 'Zulassungs- & Überführungskosten-Rechner',
  shortTitle: 'Zulassung',
  description:
    'Schätze die Kosten für Kfz-Zulassung, Kennzeichen und Überführung – addiere Zulassungsgebühr, Schilder, Wunschkennzeichen und Anfahrtskosten.',
  keywords: [
    'zulassungskosten auto rechner',
    'überführungskosten berechnen',
    'kfz zulassung kosten',
    'kennzeichen kosten rechner',
    'auto anmelden kosten',
  ],
  formula:
    'Gesamtkosten = Zulassungsgebühr + Kennzeichen + Wunschkennzeichen + Überführung/Anfahrt',
  intro:
    'Beim Autokauf kommen zur Kaufsumme weitere Nebenkosten hinzu: die Gebühr der Zulassungsstelle, neue Kennzeichenschilder, optional ein Wunschkennzeichen sowie die Überführung des Fahrzeugs. Dieser Rechner addiert die Posten zu einem Gesamtbetrag. Die Gebühren sind regional unterschiedlich (Orientierung, Stand 2026).',
  inputs: [
    { type: 'number', id: 'zulassung', label: 'Gebühr Zulassungsstelle', unit: '€', default: 30, min: 0, step: 1, help: 'Neuzulassung/Umschreibung typ. ca. 30 €.' },
    { type: 'number', id: 'schilder', label: 'Kennzeichenschilder', unit: '€', default: 30, min: 0, step: 1, help: 'Zwei Schilder zusammen ca. 20–35 €.' },
    { type: 'number', id: 'wunsch', label: 'Wunschkennzeichen (optional)', unit: '€', default: 0, min: 0, step: 1, help: 'Reservierung + Zuteilung ca. 13–30 €.' },
    { type: 'number', id: 'ueberfuehrung', label: 'Überführung / Transport', unit: '€', default: 0, min: 0, step: 10, help: 'Händlerpauschale oder Transportkosten.' },
    { type: 'number', id: 'anfahrt', label: 'Eigene Anfahrt (Sprit)', unit: '€', default: 0, min: 0, step: 5, help: 'Falls du selbst abholst.' },
  ],
  compute: (v) => {
    const zulassung = num(v.zulassung);
    const schilder = num(v.schilder);
    const wunsch = num(v.wunsch);
    const ueberfuehrung = num(v.ueberfuehrung);
    const anfahrt = num(v.anfahrt);
    const behoerde = zulassung + wunsch;
    const nebenkosten = schilder + ueberfuehrung + anfahrt;
    const gesamt = behoerde + nebenkosten;
    return [
      { label: 'Gesamtkosten', value: gesamt, unit: '€', digits: 2, primary: true },
      { label: 'Behördenkosten', value: behoerde, unit: '€', digits: 2, help: 'Zulassungsgebühr + Wunschkennzeichen.' },
      { label: 'Schilder & Überführung', value: nebenkosten, unit: '€', digits: 2 },
    ];
  },
  howto: [
    'Gebühr der Zulassungsstelle eintragen (regional unterschiedlich).',
    'Kosten für die Kennzeichenschilder ergänzen.',
    'Optional Wunschkennzeichen, Überführung und eigene Anfahrt hinzufügen.',
    'Gesamtkosten der Zulassung ablesen.',
  ],
  faq: [
    { q: 'Was kostet die Zulassung eines Autos?', a: 'Die reine Gebühr der Zulassungsstelle liegt meist bei rund 30 €. Mit Schildern, eventuellem Wunschkennzeichen und Überführung kommen je nach Fall 60–150 € und mehr zusammen.' },
    { q: 'Brauche ich immer neue Schilder?', a: 'Bei einem Halterwechsel mit neuem Kennzeichen ja. Innerhalb desselben Zulassungsbezirks kann das Kennzeichen oft mitgenommen werden (Kennzeichenmitnahme), dann entfallen die Schilderkosten.' },
    { q: 'Was kostet ein Wunschkennzeichen?', a: 'Die Reservierung und Zuteilung kosten zusammen meist rund 13–30 €, zusätzlich zur normalen Zulassungsgebühr. Die genauen Beträge legt die jeweilige Behörde fest.' },
    { q: 'Ist die Kfz-Steuer hier enthalten?', a: 'Nein. Die jährliche Kfz-Steuer und die Versicherung sind laufende Kosten und kein Teil der einmaligen Zulassungskosten. Dafür gibt es eigene Rechner.' },
  ],
  related: ['kfz-steuer-rechner', 'sf-klasse-rechner', 'auto-gesamtkosten-rechner'],
  updated: '2026-06-19',
  examples: [
    {
      values: { zulassung: 30, schilder: 30, wunsch: 0, ueberfuehrung: 0, anfahrt: 0 },
      // gesamt = 60; Behörde = 30; Nebenkosten = 30
      expect: [
        { label: 'Gesamtkosten', value: 60, tolerance: 0.01 },
        { label: 'Behördenkosten', value: 30, tolerance: 0.01 },
      ],
    },
    {
      values: { zulassung: 30, schilder: 25, wunsch: 20, ueberfuehrung: 690, anfahrt: 0 },
      // gesamt = 765; Behörde = 50; Nebenkosten = 715
      expect: [{ label: 'Gesamtkosten', value: 765, tolerance: 0.01 }],
    },
  ],
};
