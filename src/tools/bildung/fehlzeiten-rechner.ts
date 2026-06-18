import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'fehlzeiten-rechner',
  category: 'bildung',
  title: 'Fehlzeiten- & Anwesenheitsrechner (Prozent)',
  shortTitle: 'Fehlzeiten',
  description:
    'Berechne deine Anwesenheits- und Fehlquote in Prozent und wie viele Stunden du noch fehlen darfst, ohne die Mindestanwesenheit zu reissen.',
  keywords: [
    'fehlzeiten berechnen',
    'anwesenheit prozent',
    'fehlquote rechner',
    'mindestanwesenheit',
    'wie viel darf ich fehlen',
    'fehlstunden prozent',
    'anwesenheitspflicht rechner',
  ],
  intro:
    'Viele Kurse, Ausbildungen und Hochschulveranstaltungen verlangen eine Mindestanwesenheit, oft 80 oder 85 Prozent. Dieses Tool berechnet aus den geplanten Gesamtstunden und deinen Fehlstunden die aktuelle Anwesenheitsquote – und sagt dir, wie viele Stunden du insgesamt fehlen darfst, ohne die Grenze zu reissen. So behaeltst du dein Fehlzeiten-Budget im Blick.',
  formula: 'Anwesenheit % = (Gesamt − Fehlstunden) / Gesamt × 100; erlaubte Fehlstunden = Gesamt × (1 − Mindest %/100)',
  inputs: [
    { type: 'number', id: 'gesamt', label: 'Geplante Gesamtstunden', unit: 'Std.', default: 200, min: 1, step: 1 },
    { type: 'number', id: 'fehl', label: 'Bisherige Fehlstunden', unit: 'Std.', default: 24, min: 0, step: 1 },
    { type: 'number', id: 'mindest', label: 'Geforderte Mindestanwesenheit', unit: '%', default: 85, min: 0, max: 100, step: 1 },
  ],
  compute: (v) => {
    const gesamt = num(v.gesamt);
    const fehl = num(v.fehl);
    const mindest = Math.max(0, Math.min(100, num(v.mindest)));
    const anwesend = gesamt - fehl;
    const anwesenheitProzent = gesamt > 0 ? (anwesend / gesamt) * 100 : 0;
    const erlaubteFehl = gesamt * (1 - mindest / 100);
    const restFehl = erlaubteFehl - fehl;
    const fehlProzent = gesamt > 0 ? (fehl / gesamt) * 100 : 0;
    return [
      { label: 'Anwesenheitsquote', value: anwesenheitProzent, digits: 1, unit: '%', primary: true },
      { label: 'Fehlquote', value: fehlProzent, digits: 1, unit: '%' },
      { label: 'Erlaubte Fehlstunden gesamt', value: erlaubteFehl, digits: 1, unit: 'Std.' },
      { label: 'Noch erlaubte Fehlstunden', value: restFehl > 0 ? restFehl : 0, digits: 1, unit: 'Std.' },
      { label: 'Grenze eingehalten', value: anwesenheitProzent >= mindest ? 'ja' : 'nein' },
    ];
  },
  howto: [
    'Die geplanten Gesamtstunden des Kurses eintragen.',
    'Deine bisher angefallenen Fehlstunden angeben.',
    'Die geforderte Mindestanwesenheit in Prozent eintragen.',
    'Anwesenheitsquote und das verbleibende Fehlzeiten-Budget ablesen.',
  ],
  faq: [
    { q: 'Wie berechne ich meine Anwesenheit in Prozent?', a: 'Ziehe die Fehlstunden von den Gesamtstunden ab, teile durch die Gesamtstunden und multipliziere mit 100. Bei 200 Stunden und 24 Fehlstunden sind das 88 Prozent.' },
    { q: 'Wie viele Stunden darf ich fehlen?', a: 'Erlaubte Fehlstunden = Gesamtstunden × (1 − Mindestanwesenheit/100). Bei 200 Stunden und 85 Prozent Mindestanwesenheit darfst du insgesamt 30 Stunden fehlen.' },
    { q: 'Was bedeutet die noch erlaubte Fehlzeit?', a: 'Das ist dein Restbudget: erlaubte Fehlstunden minus bereits angefallene Fehlstunden. Ist der Wert 0, hast du dein Limit erreicht.' },
    { q: 'Gelten ueberall dieselben Grenzen?', a: 'Nein. Mindestanwesenheiten sind in der jeweiligen Pruefungs-, Studien- oder Ausbildungsordnung festgelegt und reichen oft von 70 bis 90 Prozent. Trage deinen konkreten Wert ein.' },
  ],
  related: ['prozent-in-note-rechner', 'notendurchschnitt-rechner', 'studienkosten-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { gesamt: 200, fehl: 24, mindest: 85 },
      expect: [
        { label: 'Anwesenheitsquote', value: 88, tolerance: 0.01 },
        { label: 'Erlaubte Fehlstunden gesamt', value: 30, tolerance: 0.01 },
        { label: 'Noch erlaubte Fehlstunden', value: 6, tolerance: 0.01 },
      ],
    },
  ],
};
