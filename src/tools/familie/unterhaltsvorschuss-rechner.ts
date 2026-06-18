import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

// Unterhaltsvorschuss für Alleinerziehende, wenn der andere Elternteil
// keinen oder zu wenig Unterhalt zahlt. Der Staat zahlt den Mindestunterhalt
// abzüglich des vollen Kindergeldes (für das erste Kind).
// Altersstufen orientieren sich am Mindestunterhalt der Düsseldorfer Tabelle.
// Wenn der andere Elternteil teilweise zahlt, wird dieser Betrag angerechnet.
// Etablierte Orientierungswerte (Stand 2026).

const MINDESTUNTERHALT: { value: string; label: string; betrag: number }[] = [
  { value: 'st1', label: '0 bis 5 Jahre', betrag: 482 },
  { value: 'st2', label: '6 bis 11 Jahre', betrag: 554 },
  { value: 'st3', label: '12 bis 17 Jahre', betrag: 649 },
];

const KINDERGELD = 255; // Stand 2026

export const tool: Tool = {
  slug: 'unterhaltsvorschuss-rechner',
  category: 'familie',
  title: 'Unterhaltsvorschuss-Rechner',
  shortTitle: 'Unterhaltsvorschuss',
  description:
    'Berechne den Unterhaltsvorschuss für Alleinerziehende: Mindestunterhalt nach Alter minus volles Kindergeld, abzüglich gezahltem Unterhalt (Stand 2026).',
  keywords: [
    'unterhaltsvorschuss rechner',
    'unterhaltsvorschuss höhe',
    'unterhaltsvorschuss alleinerziehende',
    'unterhaltsvorschuss berechnen',
    'uvg leistung',
    'vorschuss unterhalt kind',
  ],
  intro:
    'Zahlt der andere Elternteil keinen oder zu wenig Kindesunterhalt, springt der Staat mit dem Unterhaltsvorschuss ein. Die Höhe entspricht dem Mindestunterhalt der jeweiligen Altersstufe abzüglich des vollen Kindergeldes. Bereits gezahlter Unterhalt wird angerechnet. Dieser Rechner liefert eine Orientierung mit etablierten Werten (Stand 2026).',
  formula: 'Vorschuss = max(0; Mindestunterhalt(Alter) − Kindergeld(255 €) − bereits gezahlter Unterhalt)',
  inputs: [
    {
      type: 'select', id: 'stufe', label: 'Altersstufe des Kindes', default: 'st2',
      options: MINDESTUNTERHALT.map((s) => ({ value: s.value, label: s.label })),
    },
    { type: 'number', id: 'gezahlt', label: 'Bereits gezahlter Unterhalt', unit: '€/Monat', default: 0, min: 0, max: 2000, step: 10, help: 'Teilzahlung des anderen Elternteils, 0 wenn keine' },
  ],
  compute: (v) => {
    const stufe = MINDESTUNTERHALT.find((s) => s.value === String(v.stufe)) ?? MINDESTUNTERHALT[1];
    const gezahlt = Math.max(0, num(v.gezahlt, 0));
    const basis = Math.max(0, stufe.betrag - KINDERGELD);
    const vorschuss = Math.max(0, basis - gezahlt);
    return [
      { label: 'Unterhaltsvorschuss pro Monat', value: vorschuss, unit: '€', digits: 2, primary: true },
      { label: 'Voller Vorschussbetrag', value: basis, unit: '€', digits: 2, help: 'Mindestunterhalt minus Kindergeld' },
      { label: 'Mindestunterhalt Altersstufe', value: stufe.betrag, unit: '€', digits: 2 },
    ];
  },
  howto: [
    'Altersstufe des Kindes auswählen.',
    'Falls der andere Elternteil bereits teilweise zahlt: diesen Betrag eintragen.',
    'Den voraussichtlichen Unterhaltsvorschuss ablesen.',
    'Antrag beim zuständigen Jugendamt stellen.',
  ],
  faq: [
    { q: 'Wer hat Anspruch auf Unterhaltsvorschuss?', a: 'Alleinerziehende, bei denen der andere Elternteil keinen oder zu geringen Unterhalt zahlt. Das Kind muss bei dem alleinerziehenden Elternteil leben.' },
    { q: 'Wie hoch ist der Unterhaltsvorschuss?', a: 'Er entspricht dem Mindestunterhalt der Altersstufe minus dem vollen Kindergeld (Stand 2026: 255 €). Teilzahlungen des anderen Elternteils werden abgezogen.' },
    { q: 'Bis zu welchem Alter wird gezahlt?', a: 'In der Regel bis zur Vollendung des 18. Lebensjahres, bei älteren Kindern unter weiteren Voraussetzungen.' },
    { q: 'Wie genau ist die Schätzung?', a: 'Es ist eine Orientierung mit etablierten Werten (Stand 2026). Einkommensgrenzen für ältere Kinder und Sonderfälle sind nicht abgebildet. Verbindlich ist der Jugendamtsbescheid.' },
  ],
  related: ['kindesunterhalt-rechner', 'kindergeld-rechner', 'familienbudget-rechner'],
  examples: [
    {
      values: { stufe: 'st2', gezahlt: 0 },
      expect: [
        { label: 'Voller Vorschussbetrag', value: 299, tolerance: 0.01 },
        { label: 'Unterhaltsvorschuss pro Monat', value: 299, tolerance: 0.01 },
      ],
    },
    {
      values: { stufe: 'st1', gezahlt: 100 },
      expect: [{ label: 'Unterhaltsvorschuss pro Monat', value: 127, tolerance: 0.01 }],
    },
  ],
  updated: '2026-06-18',
};
