import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

// Familienpflegezeit-Reduzierung: Während der Familienpflegezeit kann die
// wöchentliche Arbeitszeit auf bis zu 15 Stunden reduziert werden (für längstens
// 24 Monate). Das Bruttogehalt sinkt proportional zur Stundenreduzierung.
// Dieser Rechner zeigt das reduzierte Brutto, den Gehaltsverlust und den Beschäftigungsanteil.
// Hinweis: Mindestarbeitszeit 15 h/Woche im Jahresdurchschnitt; mögliche zinslose
// Darlehen zur Aufstockung sind nicht berücksichtigt. Orientierung (Stand 2026).

const MINDEST_STUNDEN = 15; // gesetzliche Mindestarbeitszeit pro Woche

export const tool: Tool = {
  slug: 'familienpflegezeit-reduzierung-rechner',
  category: 'familie',
  title: 'Familienpflegezeit-Reduzierung-Rechner',
  shortTitle: 'Familienpflegezeit',
  description:
    'Berechne das reduzierte Bruttogehalt und den Verdienstausfall bei Familienpflegezeit, wenn du die Wochenstunden senkst (Mindestarbeitszeit 15 h). Orientierung (Stand 2026).',
  keywords: [
    'familienpflegezeit rechner',
    'familienpflegezeit gehalt',
    'pflegezeit stunden reduzieren',
    'familienpflegezeit verdienstausfall',
    'familienpflegezeit teilzeit',
    'pflegezeit gehaltsrechner',
  ],
  intro:
    'In der Familienpflegezeit können Beschäftigte ihre Arbeitszeit für bis zu 24 Monate reduzieren, um Angehörige zu pflegen – auf mindestens 15 Stunden pro Woche im Jahresdurchschnitt. Das Bruttogehalt sinkt dabei in der Regel proportional zur Stundenkürzung. Dieser Rechner zeigt das reduzierte Brutto, den monatlichen Verdienstausfall und den Beschäftigungsanteil. Hinweis: Ein zinsloses staatliches Darlehen zur Aufstockung des Einkommens ist möglich, hier aber nicht berücksichtigt. Orientierung, kein Rechtsersatz (Stand 2026).',
  formula:
    'Reduziertes Brutto = Vollzeit-Brutto × (neue Stunden ÷ Vollzeit-Stunden)',
  inputs: [
    { type: 'number', id: 'brutto', label: 'Bisheriges Bruttogehalt (Vollzeit)', unit: '€/Monat', default: 3000, min: 0, max: 30000, step: 50 },
    { type: 'number', id: 'vollzeit', label: 'Vollzeit-Wochenstunden', unit: 'h/Woche', default: 40, min: 1, max: 60, step: 0.5 },
    { type: 'number', id: 'neu', label: 'Neue Wochenstunden', unit: 'h/Woche', default: 20, min: 0, max: 60, step: 0.5, help: 'Mindestens 15 h im Jahresdurchschnitt' },
  ],
  compute: (v) => {
    const brutto = Math.max(0, num(v.brutto, 3000));
    const vollzeit = Math.max(1, num(v.vollzeit, 40));
    const neu = Math.max(0, Math.min(vollzeit, num(v.neu, 20)));
    const anteil = neu / vollzeit;
    const neuBrutto = brutto * anteil;
    const verlust = brutto - neuBrutto;
    return [
      { label: 'Reduziertes Bruttogehalt', value: neuBrutto, unit: '€/Monat', digits: 2, primary: true },
      { label: 'Verdienstausfall pro Monat', value: verlust, unit: '€', digits: 2 },
      { label: 'Beschäftigungsanteil', value: anteil * 100, unit: '%', digits: 1 },
      { label: 'Verdienstausfall pro Jahr', value: verlust * 12, unit: '€', digits: 2 },
      { label: 'Mindestarbeitszeit erfüllt', value: neu >= MINDEST_STUNDEN ? 'ja (≥ 15 h)' : 'nein (< 15 h)' },
    ];
  },
  howto: [
    'Bisheriges Bruttogehalt bei voller Stundenzahl eingeben.',
    'Vollzeit-Wochenstunden des Betriebs eintragen (oft 38–40 h).',
    'Geplante neue Wochenstunden während der Familienpflegezeit wählen.',
    'Reduziertes Gehalt, Verdienstausfall und Beschäftigungsanteil ablesen.',
  ],
  faq: [
    { q: 'Wie weit darf ich die Arbeitszeit reduzieren?', a: 'In der Familienpflegezeit auf mindestens 15 Stunden pro Woche im Jahresdurchschnitt – für höchstens 24 Monate. Bei der kürzeren Pflegezeit (bis 6 Monate) ist auch eine stärkere Reduzierung oder vollständige Freistellung möglich.' },
    { q: 'Wie verändert sich mein Gehalt?', a: 'Das Bruttogehalt sinkt in der Regel proportional zur Stundenkürzung. Wer von 40 auf 20 Stunden geht, erhält etwa die Hälfte des bisherigen Bruttos.' },
    { q: 'Gibt es finanzielle Unterstützung?', a: 'Ja. Zur Abfederung des Verdienstausfalls kann ein zinsloses staatliches Darlehen beantragt werden, das später in Raten zurückgezahlt wird. Es ist in diesem Rechner nicht berücksichtigt.' },
    { q: 'Ist die Rechnung verbindlich?', a: 'Nein, es ist eine Orientierung. Steuern, Sozialabgaben und individuelle Tarifregelungen können das Netto anders beeinflussen (Stand 2026).' },
  ],
  related: ['pflegegeld-rechner', 'elternzeit-aufteilung-rechner', 'elterngeldplus-rechner', 'familienbudget-rechner'],
  examples: [
    {
      values: { brutto: 3000, vollzeit: 40, neu: 20 },
      expect: [
        { label: 'Reduziertes Bruttogehalt', value: 1500, tolerance: 0.01 },
        { label: 'Verdienstausfall pro Monat', value: 1500, tolerance: 0.01 },
        { label: 'Beschäftigungsanteil', value: 50, tolerance: 0.01 },
      ],
    },
    {
      values: { brutto: 3600, vollzeit: 40, neu: 15 },
      expect: [
        { label: 'Reduziertes Bruttogehalt', value: 1350, tolerance: 0.01 },
        { label: 'Beschäftigungsanteil', value: 37.5, tolerance: 0.1 },
      ],
    },
  ],
  updated: '2026-06-19',
};
