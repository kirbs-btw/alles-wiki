import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

/**
 * Adventskalender mit 24 Türchen befüllen.
 * Gängig ist ein größeres Geschenk hinter Türchen 24 (Heiligabend),
 * die übrigen Tage werden gleichmäßig mit dem Rest des Budgets gefüllt.
 */
const STANDARD_TUERCHEN = 24;

export const tool: Tool = {
  slug: 'adventskalender-budget-rechner',
  category: 'alltag',
  title: 'Adventskalender-Budget pro Türchen berechnen',
  shortTitle: 'Adventskalender-Budget',
  description:
    'Berechne, wie viel du pro Türchen eines selbst befüllten Adventskalenders ausgeben kannst – mit optional größerem Geschenk hinter dem 24. Türchen.',
  keywords: [
    'adventskalender budget',
    'adventskalender befuellen kosten',
    'budget pro tuerchen',
    'adventskalender selbst befuellen',
    'wie viel pro tuerchen',
    'adventskalender 24 tuerchen rechner',
  ],
  formula:
    'Budget je normales Türchen = (Gesamtbudget − Budget 24. Türchen) / (Türchen − 1)',
  inputs: [
    { type: 'number', id: 'budget', label: 'Gesamtbudget', unit: '€', default: 50, min: 0, step: 5 },
    { type: 'number', id: 'tuerchen', label: 'Anzahl Türchen', default: STANDARD_TUERCHEN, min: 1, max: 31, step: 1, help: 'Klassisch 24 Türchen.' },
    { type: 'number', id: 'finale', label: 'Extra fürs letzte Türchen', unit: '€', default: 10, min: 0, step: 1, help: 'Größeres Geschenk hinter dem letzten Türchen (0 = alle gleich).' },
  ],
  compute: (v) => {
    const budget = num(v.budget);
    const tuerchen = Math.max(1, Math.round(num(v.tuerchen, STANDARD_TUERCHEN)));
    const finaleRoh = num(v.finale);
    // Das Finale kann das Gesamtbudget nicht überschreiten.
    const finale = Math.min(finaleRoh, budget);
    const normaleAnzahl = tuerchen - 1;
    const restBudget = budget - finale;
    const proTuerchen = normaleAnzahl > 0 ? restBudget / normaleAnzahl : budget;
    return [
      { label: 'Budget je Türchen', value: proTuerchen, unit: '€', digits: 2, primary: true },
      { label: 'Hinter dem letzten Türchen', value: tuerchen > 1 ? finale : budget, unit: '€', digits: 2 },
      { label: 'Normale Türchen', value: normaleAnzahl > 0 ? normaleAnzahl : 1, unit: 'Stück', digits: 0 },
    ];
  },
  intro:
    'Einen Adventskalender selbst zu befüllen ist persönlich, aber die Kosten summieren sich schnell über 24 Türchen. Dieser Rechner verteilt dein Budget gleichmäßig auf die Türchen und lässt dich optional ein größeres Geschenk hinter dem letzten Türchen (Heiligabend) einplanen.',
  howto: [
    'Trage dein Gesamtbudget für den Kalender ein.',
    'Gib die Anzahl der Türchen an (klassisch 24).',
    'Lege fest, wie viel extra hinter das letzte Türchen soll (0 €, wenn alle gleich sein sollen).',
    'Lies ab, wie viel pro normalem Türchen bleibt.',
  ],
  faq: [
    { q: 'Wie viel kostet ein selbst befüllter Adventskalender?', a: 'Das hängt ganz von dir ab. Übliche Budgets liegen zwischen 30 und 80 €, also rund 1 bis 3 € pro Türchen, je nach Inhalt.' },
    { q: 'Warum ein Extra fürs letzte Türchen?', a: 'Viele möchten Heiligabend mit einem etwas größeren Geschenk krönen. Der Rechner zieht diesen Betrag vorab ab und verteilt den Rest gleichmäßig.' },
    { q: 'Muss jedes Türchen exakt gleich teuer sein?', a: 'Nein, der Wert ist ein Durchschnitt. Mische ruhig günstigere und teurere Tage, solange die Summe zum Budget passt.' },
    { q: 'Kann ich auch weniger als 24 Türchen rechnen?', a: 'Ja. Manche Kalender haben weniger Fächer oder du beginnst erst später. Trage einfach die tatsächliche Anzahl ein.' },
  ],
  related: ['geschenkbudget-pro-person-rechner', 'geschenkpapier-bedarf-rechner', 'tage-bis-rechner'],
  updated: '2026-06-19',
  examples: [
    {
      values: { budget: 50, tuerchen: 24, finale: 10 },
      // rest = 50-10 = 40; normale = 23; proTuerchen = 40/23 = 1.7391...
      expect: [
        { label: 'Budget je Türchen', value: 1.74, tolerance: 0.01 },
        { label: 'Normale Türchen', value: 23, tolerance: 0 },
      ],
    },
    {
      values: { budget: 48, tuerchen: 24, finale: 0 },
      // rest = 48; normale = 23; proTuerchen = 48/23 = 2.0869...
      expect: [{ label: 'Budget je Türchen', value: 2.09, tolerance: 0.01 }],
    },
  ],
};
