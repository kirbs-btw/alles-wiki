import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'reisekasse-pro-tag-rechner',
  category: 'alltag',
  title: 'Reisekasse pro Tag berechnen',
  shortTitle: 'Reisekasse',
  description:
    'Plane dein Reisebudget: Verteile die Reisekasse auf die Urlaubstage und sieh, wie viel pro Tag und pro Person zur Verfügung steht – inklusive Reserve.',
  keywords: [
    'reisekasse berechnen',
    'urlaubsbudget pro tag',
    'reisebudget rechner',
    'wie viel geld pro urlaubstag',
    'taschengeld urlaub berechnen',
    'budget pro reisetag',
  ],
  formula:
    'Tagesbudget = (Gesamtbudget × (1 − Reserve%/100)) / Reisetage; pro Person = Tagesbudget / Personen',
  inputs: [
    { type: 'number', id: 'budget', label: 'Gesamtbudget (Bargeld/Karte vor Ort)', unit: '€', default: 1000, min: 0, step: 50, help: 'Ohne Anreise und Unterkunft, falls separat bezahlt.' },
    { type: 'number', id: 'tage', label: 'Reisetage', default: 10, min: 1, step: 1 },
    { type: 'number', id: 'personen', label: 'Anzahl Personen', default: 2, min: 1, step: 1 },
    { type: 'number', id: 'reserve', label: 'Notfall-Reserve', unit: '%', default: 10, min: 0, max: 90, step: 5, help: 'Puffer für Unvorhergesehenes.' },
  ],
  compute: (v) => {
    const budget = num(v.budget);
    const tage = Math.max(1, Math.round(num(v.tage, 1)));
    const personen = Math.max(1, Math.round(num(v.personen, 1)));
    const reserve = num(v.reserve);
    const reserveBetrag = budget * (reserve / 100);
    const verfuegbar = budget - reserveBetrag;
    const proTag = verfuegbar / tage;
    const proTagProPerson = proTag / personen;
    return [
      { label: 'Budget pro Tag', value: proTag, unit: '€', digits: 2, primary: true },
      { label: 'Pro Tag und Person', value: proTagProPerson, unit: '€', digits: 2 },
      { label: 'Verfügbar (ohne Reserve)', value: verfuegbar, unit: '€', digits: 2 },
      { label: 'Notfall-Reserve', value: reserveBetrag, unit: '€', digits: 2 },
    ];
  },
  intro:
    'Damit das Reisebudget bis zum letzten Tag reicht, lohnt sich eine Aufteilung pro Tag. Dieser Rechner zieht eine Notfall-Reserve ab und verteilt den Rest gleichmäßig auf alle Reisetage und Personen. So weißt du, wie viel du täglich für Essen, Eintritte und Souvenirs einplanen kannst.',
  howto: [
    'Trage dein verfügbares Reisebudget ein (möglichst ohne bereits bezahlte Anreise und Unterkunft).',
    'Gib die Anzahl der Reisetage und der mitreisenden Personen an.',
    'Lege eine Notfall-Reserve fest (z. B. 10 %).',
    'Lies ab, wie viel pro Tag und pro Person übrig bleibt.',
  ],
  faq: [
    { q: 'Soll ich Unterkunft und Anreise einrechnen?', a: 'Am übersichtlichsten ist es, bereits gebuchte Anreise und Unterkunft auszuklammern und nur das vor Ort verfügbare Geld aufzuteilen. So zeigt der Tageswert wirklich dein Taschengeld.' },
    { q: 'Wozu eine Reserve?', a: 'Eine Reserve fängt Unvorhergesehenes ab – ein Taxi, ein Arztbesuch oder ein teurerer Tag. 10 bis 15 % sind ein guter Richtwert.' },
    { q: 'Gilt das Tagesbudget strikt?', a: 'Es ist ein Durchschnitt. An manchen Tagen gibst du mehr aus (Ausflug), an anderen weniger. Wichtig ist, dass die Summe das Budget nicht übersteigt.' },
    { q: 'Wie kalkuliere ich in Fremdwährung?', a: 'Rechne dein Budget in Euro und behalte den aktuellen Wechselkurs im Blick. Vor Ort hilft es, den Tageswert grob in die Landeswährung umzurechnen.' },
  ],
  related: ['benzin-pro-person-rechner', 'rechnung-splitten-rechner', 'geschenkbudget-pro-person-rechner'],
  updated: '2026-06-19',
  examples: [
    {
      values: { budget: 1000, tage: 10, personen: 2, reserve: 10 },
      // verfuegbar = 900; proTag = 90; proTagProPerson = 45
      expect: [
        { label: 'Budget pro Tag', value: 90, tolerance: 0.01 },
        { label: 'Pro Tag und Person', value: 45, tolerance: 0.01 },
        { label: 'Notfall-Reserve', value: 100, tolerance: 0.01 },
      ],
    },
    {
      values: { budget: 600, tage: 6, personen: 1, reserve: 0 },
      // proTag = 100
      expect: [{ label: 'Budget pro Tag', value: 100, tolerance: 0.01 }],
    },
  ],
};
