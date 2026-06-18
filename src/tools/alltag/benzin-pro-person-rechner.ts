import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'benzin-pro-person-rechner',
  category: 'alltag',
  title: 'Spritkosten pro Person bei Fahrgemeinschaft',
  shortTitle: 'Benzin pro Person',
  description:
    'Berechne die Spritkosten einer Autofahrt und teile sie fair auf alle Mitfahrer auf – ideal für Fahrgemeinschaft, Roadtrip oder Pendeln.',
  keywords: [
    'spritkosten pro person',
    'benzin pro person berechnen',
    'fahrgemeinschaft kosten teilen',
    'spritkosten aufteilen',
    'mitfahrer kosten rechner',
    'tankkosten teilen',
    'roadtrip kosten pro person',
  ],
  formula:
    'Verbrauch = Strecke/100 × Verbrauch pro 100 km; Kosten = Verbrauch × Preis; Pro Person = Kosten / Personen',
  inputs: [
    { type: 'number', id: 'strecke', label: 'Strecke', unit: 'km', default: 300, min: 0, step: 10 },
    { type: 'number', id: 'verbrauch', label: 'Verbrauch pro 100 km', unit: 'l', default: 7, min: 0, step: 0.1 },
    { type: 'number', id: 'preis', label: 'Spritpreis', unit: '€/l', default: 1.8, min: 0, step: 0.01 },
    { type: 'number', id: 'personen', label: 'Personen im Auto', default: 4, min: 1, step: 1, help: 'Inklusive Fahrer.' },
    {
      type: 'select',
      id: 'fahrt',
      label: 'Fahrtart',
      default: 'einfach',
      options: [
        { value: 'einfach', label: 'Einfache Strecke' },
        { value: 'hin_zurueck', label: 'Hin- und Rückfahrt' },
      ],
    },
  ],
  compute: (v) => {
    const streckeRaw = num(v.strecke);
    const faktor = String(v.fahrt) === 'hin_zurueck' ? 2 : 1;
    const strecke = streckeRaw * faktor;
    const verbrauch100 = num(v.verbrauch);
    const preis = num(v.preis);
    const personen = Math.max(1, Math.round(num(v.personen, 1)));
    const liter = (strecke / 100) * verbrauch100;
    const kosten = liter * preis;
    const proPerson = personen > 0 ? kosten / personen : 0;
    return [
      { label: 'Kosten pro Person', value: proPerson, unit: '€', digits: 2, primary: true },
      { label: 'Spritkosten gesamt', value: kosten, unit: '€', digits: 2 },
      { label: 'Verbrauchte Menge', value: liter, unit: 'l', digits: 2 },
      { label: 'Gefahrene Strecke', value: strecke, unit: 'km', digits: 0 },
    ];
  },
  intro:
    'Wer gemeinsam fährt, spart – aber nur, wenn die Spritkosten fair geteilt werden. Dieser Rechner ermittelt aus Strecke, Verbrauch und Spritpreis die Gesamtkosten der Fahrt und teilt sie durch die Anzahl der Personen im Auto. Auf Wunsch wird die Hin- und Rückfahrt automatisch verdoppelt.',
  howto: [
    'Gib die Strecke in Kilometern ein und wähle, ob es eine einfache Fahrt oder Hin- und Rückfahrt ist.',
    'Trage den Durchschnittsverbrauch des Autos pro 100 km ein.',
    'Gib den aktuellen Spritpreis pro Liter an.',
    'Trage die Anzahl der Personen im Auto ein und lies die Kosten pro Person ab.',
  ],
  faq: [
    { q: 'Zählt der Fahrer mit?', a: 'Das entscheidest du. Oft wird der Fahrer mitgezählt, manchmal fahren Mitfahrer auch den Fahrer "frei". Trage einfach die Zahl der zahlenden Personen ein.' },
    { q: 'Welcher Verbrauch ist realistisch?', a: 'Der Durchschnittsverbrauch steht meist im Bordcomputer. Auf der Autobahn liegt er höher als im Mittel; im Zweifel etwas großzügiger rechnen.' },
    { q: 'Sind Verschleiß und Maut enthalten?', a: 'Nein, hier werden nur die Spritkosten berechnet. Maut, Parkgebühren oder eine Pauschale für Verschleiß müsstest du separat aufschlagen.' },
    { q: 'Wie genau ist der Spritpreis?', a: 'Spritpreise schwanken täglich und regional. Trage den Preis ein, den du tatsächlich bezahlt hast oder erwartest, für ein möglichst genaues Ergebnis.' },
  ],
  related: ['rechnung-splitten-rechner', 'mischungsverhaeltnis-rechner', 'trinkgeld-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { strecke: 300, verbrauch: 7, preis: 1.8, personen: 4, fahrt: 'einfach' },
      expect: [
        { label: 'Spritkosten gesamt', value: 37.8, tolerance: 0.05 },
        { label: 'Kosten pro Person', value: 9.45, tolerance: 0.05 },
      ],
    },
    {
      values: { strecke: 300, verbrauch: 7, preis: 1.8, personen: 4, fahrt: 'hin_zurueck' },
      expect: [{ label: 'Kosten pro Person', value: 18.9, tolerance: 0.05 }],
    },
  ],
};
