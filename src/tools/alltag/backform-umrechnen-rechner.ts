import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'backform-umrechnen-rechner',
  category: 'alltag',
  title: 'Backform umrechnen – andere Form, gleiche Menge',
  shortTitle: 'Backform umrechnen',
  description:
    'Rechne ein Rezept von der Original-Backform auf deine Form um: runde und eckige Formen, andere Durchmesser. Über die Fläche wird die Zutatenmenge angepasst.',
  keywords: [
    'backform umrechnen',
    'runde in eckige form',
    'springform umrechnen',
    'backform durchmesser umrechnen',
    'kuchen andere form',
    'backform groesse anpassen',
  ],
  formula:
    'Fläche rund = π·(d/2)²; Fläche eckig = Länge·Breite; Faktor = Fläche neu / Fläche original; Menge neu = Menge × Faktor',
  inputs: [
    {
      type: 'select',
      id: 'orig_form',
      label: 'Original-Form (im Rezept)',
      default: 'rund',
      options: [
        { value: 'rund', label: 'Rund (Durchmesser)' },
        { value: 'eckig', label: 'Eckig (Länge × Breite)' },
      ],
    },
    { type: 'number', id: 'orig_d', label: 'Original: Durchmesser (falls rund)', unit: 'cm', default: 26, min: 1, step: 1, help: 'Nur relevant, wenn die Original-Form rund ist.' },
    { type: 'number', id: 'orig_l', label: 'Original: Länge (falls eckig)', unit: 'cm', default: 30, min: 1, step: 1 },
    { type: 'number', id: 'orig_b', label: 'Original: Breite (falls eckig)', unit: 'cm', default: 20, min: 1, step: 1 },
    {
      type: 'select',
      id: 'ziel_form',
      label: 'Deine Form',
      default: 'rund',
      options: [
        { value: 'rund', label: 'Rund (Durchmesser)' },
        { value: 'eckig', label: 'Eckig (Länge × Breite)' },
      ],
    },
    { type: 'number', id: 'ziel_d', label: 'Deine Form: Durchmesser (falls rund)', unit: 'cm', default: 20, min: 1, step: 1 },
    { type: 'number', id: 'ziel_l', label: 'Deine Form: Länge (falls eckig)', unit: 'cm', default: 24, min: 1, step: 1 },
    { type: 'number', id: 'ziel_b', label: 'Deine Form: Breite (falls eckig)', unit: 'cm', default: 24, min: 1, step: 1 },
    { type: 'number', id: 'menge', label: 'Zutaten-Menge im Rezept', default: 250, min: 0, step: 1, help: 'Beliebige Einheit, z. B. g oder ml.' },
  ],
  compute: (v) => {
    const flaeche = (form: string, d: number, l: number, b: number): number =>
      form === 'rund' ? Math.PI * (d / 2) * (d / 2) : l * b;
    const aOrig = flaeche(String(v.orig_form || 'rund'), num(v.orig_d, 1), num(v.orig_l, 1), num(v.orig_b, 1));
    const aZiel = flaeche(String(v.ziel_form || 'rund'), num(v.ziel_d, 1), num(v.ziel_l, 1), num(v.ziel_b, 1));
    const menge = num(v.menge);
    const faktor = aOrig > 0 ? aZiel / aOrig : 0;
    return [
      { label: 'Neue Zutaten-Menge', value: menge * faktor, digits: 1, primary: true, help: 'In derselben Einheit wie die Eingabe.' },
      { label: 'Umrechnungs-Faktor', value: faktor, digits: 3 },
      { label: 'Fläche Original', value: aOrig, unit: 'cm²', digits: 1 },
      { label: 'Fläche deine Form', value: aZiel, unit: 'cm²', digits: 1 },
    ];
  },
  intro:
    'Ein Kuchenrezept ist meist für eine bestimmte Form gedacht. Hast du eine andere Form, entscheidet die Grundfläche über die richtige Teigmenge – nicht der Durchmesser allein, denn die Fläche wächst im Quadrat. Dieser Rechner ermittelt die Flächen beider Formen, bildet den Faktor und passt jede Zutat exakt an, damit der Kuchen die gewohnte Höhe behält.',
  howto: [
    'Wähle die Original-Form und trage deren Maße ein (Durchmesser bei rund, Länge und Breite bei eckig).',
    'Wähle deine vorhandene Form und trage ihre Maße ein.',
    'Gib die Menge einer Zutat aus dem Rezept ein.',
    'Lies die angepasste Menge ab und wiederhole den Schritt für jede weitere Zutat.',
  ],
  faq: [
    { q: 'Warum reicht es nicht, die Durchmesser zu vergleichen?', a: 'Die Teigmenge hängt von der Grundfläche ab. Eine Form mit doppeltem Durchmesser hat die vierfache Fläche, weil die Fläche quadratisch mit dem Durchmesser wächst.' },
    { q: 'Bleibt die Backzeit gleich?', a: 'Nicht unbedingt. Bei größerer oder höherer Teigschicht verlängert sich die Backzeit. Mache die Stäbchenprobe und kontrolliere das Ergebnis.' },
    { q: 'Wie rechne ich rund in eckig um?', a: 'Wähle bei der Original-Form „rund" und bei deiner Form „eckig" (oder umgekehrt). Der Rechner vergleicht beide Flächen direkt – die Form spielt für die Menge keine Rolle, nur die Fläche.' },
  ],
  related: ['rezept-portionen-rechner', 'kuchen-durchmesser-umrechnen-rechner', 'backofen-umluft-umrechner'],
  updated: '2026-06-19',
  examples: [
    {
      values: { orig_form: 'rund', orig_d: 26, orig_l: 30, orig_b: 20, ziel_form: 'rund', ziel_d: 20, ziel_l: 24, ziel_b: 24, menge: 250 },
      expect: [
        { label: 'Umrechnungs-Faktor', value: 0.592, tolerance: 0.002 },
        { label: 'Neue Zutaten-Menge', value: 147.9, tolerance: 0.5 },
      ],
    },
    {
      values: { orig_form: 'eckig', orig_d: 26, orig_l: 30, orig_b: 20, ziel_form: 'eckig', ziel_d: 20, ziel_l: 30, ziel_b: 30, menge: 600 },
      expect: [
        { label: 'Umrechnungs-Faktor', value: 1.5, tolerance: 0.001 },
        { label: 'Neue Zutaten-Menge', value: 900, tolerance: 0.5 },
      ],
    },
  ],
};
