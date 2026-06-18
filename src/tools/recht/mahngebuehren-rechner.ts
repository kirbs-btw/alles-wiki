import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'mahngebuehren-rechner',
  category: 'recht',
  title: 'Mahngebühren- und Verzugskosten-Rechner',
  shortTitle: 'Mahngebühren',
  description:
    'Berechne die gesamten Verzugskosten einer offenen Forderung: Mahnpauschale, Verzugszinsen und die 40-€-Verzugspauschale im Geschäftsverkehr.',
  keywords: [
    'mahngebühren rechner',
    'mahnkosten berechnen',
    'verzugskosten',
    'mahnpauschale höhe',
    'verzugspauschale 40 euro',
    'wie hoch mahngebühren',
    'zulässige mahnkosten',
  ],
  formula: 'Gesamt = Forderung + Mahnpauschale + Verzugspauschale + Forderung × Zinssatz/100 × Tage/365',
  inputs: [
    { type: 'number', id: 'forderung', label: 'Offene Forderung', unit: '€', default: 200, min: 0, step: 1 },
    { type: 'number', id: 'tage', label: 'Tage im Verzug', unit: 'Tage', default: 30, min: 0, step: 1 },
    { type: 'number', id: 'mahnpauschale', label: 'Mahnpauschale pro Mahnung', unit: '€', default: 2.5, min: 0, step: 0.5, help: 'Üblich sind 2,50–3 € pro Mahnung (nur reale Kosten).' },
    { type: 'number', id: 'anzahl', label: 'Anzahl Mahnungen', unit: '', default: 1, min: 0, step: 1 },
    {
      type: 'select', id: 'art', label: 'Vertragsart', default: 'verbraucher',
      options: [
        { value: 'verbraucher', label: 'Privat / Verbraucher (5 % über Basiszins)' },
        { value: 'geschaeft', label: 'Geschäftsverkehr (9 % über Basiszins + 40 € Pauschale)' },
      ],
    },
  ],
  compute: (v) => {
    const forderung = num(v.forderung);
    const tage = num(v.tage);
    const mahnpauschale = num(v.mahnpauschale);
    const anzahl = num(v.anzahl);
    const istGeschaeft = String(v.art) === 'geschaeft';
    const basis = 3.62; // angenommener Basiszinssatz, Stand 2026
    const satz = basis + (istGeschaeft ? 9 : 5);
    const zinsen = forderung * (satz / 100) * (tage / 365);
    const mahnkosten = mahnpauschale * anzahl;
    const verzugspauschale = istGeschaeft ? 40 : 0;
    const nebenkosten = mahnkosten + verzugspauschale + zinsen;
    const gesamt = forderung + nebenkosten;
    return [
      { label: 'Gesamtforderung', value: gesamt, unit: '€', digits: 2, primary: true },
      { label: 'Mahnkosten', value: mahnkosten, unit: '€', digits: 2 },
      { label: 'Verzugszinsen', value: zinsen, unit: '€', digits: 2 },
      { label: 'Verzugspauschale', value: verzugspauschale, unit: '€', digits: 2 },
    ];
  },
  intro:
    'Wer eine Rechnung nicht bezahlt, muss neben der Hauptforderung auch Verzugskosten tragen: tatsächliche Mahnkosten, Verzugszinsen und im Geschäftsverkehr eine pauschale von 40 €. Mahngebühren dürfen nur die realen Kosten abdecken (Porto, Material) – pauschale Fantasiebeträge sind unzulässig. Der Basiszinssatz wird hier Stand 2026 mit 3,62 % angenommen.',
  howto: [
    'Offene Forderung und Anzahl der Verzugstage eingeben.',
    'Mahnpauschale je Mahnung und Anzahl der Mahnungen angeben.',
    'Vertragsart wählen (privat oder Geschäftsverkehr).',
    'Gesamtforderung inklusive aller Nebenkosten ablesen.',
  ],
  faq: [
    { q: 'Wie hoch dürfen Mahngebühren sein?', a: 'Nur die tatsächlich entstandenen Kosten sind erstattungsfähig, etwa Porto und Materialkosten. Üblich sind 2,50 bis 3 € pro Mahnung. Pauschale Beträge wie 10 € oder mehr sind in der Regel unzulässig.' },
    { q: 'Was ist die Verzugspauschale von 40 €?', a: 'Bei Geschäften ohne Verbraucherbeteiligung hat der Gläubiger zusätzlich Anspruch auf eine Pauschale von 40 € (§ 288 Abs. 5 BGB). Gegenüber Verbrauchern gilt diese Pauschale nicht.' },
    { q: 'Darf für die erste Mahnung etwas berechnet werden?', a: 'Strittig: Häufig wird argumentiert, dass die erste Mahnung den Verzug erst begründet und daher noch keine Verzugskosten auslöst. Sicherer sind Mahnkosten ab der zweiten Mahnung.' },
    { q: 'Welcher Zinssatz gilt?', a: 'Bei Verbrauchern 5 Prozentpunkte, im Geschäftsverkehr 9 Prozentpunkte über dem Basiszinssatz. Der Basiszinssatz ändert sich halbjährlich – Stand 2026 wird 3,62 % angenommen.' },
    { q: 'Sind Inkassokosten enthalten?', a: 'Nein. Werden zusätzlich Inkasso- oder Anwaltskosten geltend gemacht, kommen sie obendrauf. Sie sind aber der Höhe nach gesetzlich begrenzt.' },
  ],
  related: ['verzugszinsen-rechner', 'anwaltskosten-rechner', 'gerichtskosten-rechner'],
  examples: [
    {
      values: { forderung: 200, tage: 365, mahnpauschale: 2.5, anzahl: 2, art: 'verbraucher' },
      expect: [
        { label: 'Mahnkosten', value: 5, tolerance: 0.01 },
        { label: 'Verzugszinsen', value: 17.24, tolerance: 0.2 },
        { label: 'Verzugspauschale', value: 0, tolerance: 0.01 },
      ],
    },
    {
      values: { forderung: 1000, tage: 0, mahnpauschale: 3, anzahl: 1, art: 'geschaeft' },
      expect: [
        { label: 'Verzugspauschale', value: 40, tolerance: 0.01 },
        { label: 'Gesamtforderung', value: 1043, tolerance: 0.5 },
      ],
    },
  ],
  updated: '2026-06-18',
};
