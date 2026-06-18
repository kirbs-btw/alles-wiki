import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'brutto-stundensatz-rechner',
  category: 'beruf',
  title: 'Brutto-Stundensatz aus Jahresgehalt',
  shortTitle: 'Stundensatz aus Jahresgehalt',
  description:
    'Berechne deinen Brutto-Stundensatz direkt aus dem Jahresgehalt: über die tatsächlich gearbeiteten Stunden pro Jahr – wahlweise mit Abzug von Urlaubs- und Feiertagen.',
  keywords: [
    'brutto stundensatz rechner',
    'stundensatz aus jahresgehalt',
    'jahresgehalt in stundenlohn',
    'stundenlohn aus jahresgehalt berechnen',
    'arbeitsstunden pro jahr',
    'gehalt pro arbeitsstunde',
    'effektiver stundensatz',
  ],
  formula:
    'Stundensatz = Jahresgehalt ÷ ((Wochenstunden ÷ Arbeitstage/Woche) × bezahlte Arbeitstage)',
  inputs: [
    { type: 'number', id: 'jahresgehalt', label: 'Brutto-Jahresgehalt', unit: '€', default: 48000, min: 0, step: 500 },
    { type: 'number', id: 'wochenstunden', label: 'Wochenarbeitszeit', unit: 'h', default: 40, min: 1, step: 0.5 },
    { type: 'number', id: 'arbeitstage_woche', label: 'Arbeitstage pro Woche', unit: 'Tage', default: 5, min: 1, max: 6, step: 1 },
    { type: 'number', id: 'frei', label: 'Urlaubs- und Feiertage pro Jahr', unit: 'Tage', default: 40, min: 0, max: 120, step: 1, help: 'Bezahlte freie Tage, an denen nicht gearbeitet wird (z. B. 30 Urlaub + 10 Feiertage). 0 für die reine Bruttobetrachtung.' },
  ],
  compute: (v) => {
    const jahresgehalt = num(v.jahresgehalt);
    const wochenstunden = num(v.wochenstunden);
    const arbeitstageWoche = num(v.arbeitstage_woche);
    const frei = num(v.frei);

    const stundenProTag = arbeitstageWoche > 0 ? wochenstunden / arbeitstageWoche : 0;
    const arbeitstageJahr = 52 * arbeitstageWoche;
    const tatsTage = Math.max(0, arbeitstageJahr - frei);
    const tatsStunden = tatsTage * stundenProTag;
    const nominalStunden = wochenstunden * 52;

    const stundensatzTats = tatsStunden > 0 ? jahresgehalt / tatsStunden : 0;
    const stundensatzNominal = nominalStunden > 0 ? jahresgehalt / nominalStunden : 0;

    return [
      { label: 'Effektiver Stundensatz', value: stundensatzTats, unit: '€', digits: 2, primary: true, help: 'Bezogen auf die tatsächlich gearbeiteten Stunden (ohne Urlaub/Feiertage).' },
      { label: 'Nominaler Stundensatz', value: stundensatzNominal, unit: '€', digits: 2, help: 'Jahresgehalt ÷ alle vertraglichen Stunden (52 Wochen).' },
      { label: 'Gearbeitete Stunden/Jahr', value: tatsStunden, unit: 'h', digits: 0 },
      { label: 'Gearbeitete Tage/Jahr', value: tatsTage, unit: 'Tage', digits: 0 },
    ];
  },
  intro:
    'Wer sein Jahresgehalt auf den Stundensatz herunterbricht, will oft den echten Wert einer Arbeitsstunde kennen – etwa zum Vergleich von Angeboten oder als Freelancer. Dieser Rechner unterscheidet zwischen dem nominalen Satz (alle Vertragsstunden) und dem effektiven Satz (nur tatsächlich gearbeitete Stunden ohne Urlaub und Feiertage).',
  howto: [
    'Trage dein Brutto-Jahresgehalt ein.',
    'Gib Wochenarbeitszeit und Arbeitstage pro Woche an.',
    'Trage die bezahlten freien Tage (Urlaub + Feiertage) ein, an denen nicht gearbeitet wird.',
    'Lies effektiven und nominalen Stundensatz ab.',
  ],
  faq: [
    { q: 'Warum unterscheidet sich effektiver vom nominalen Stundensatz?', a: 'Der nominale Satz teilt das Gehalt auf alle 52 Wochen auf. Der effektive Satz berücksichtigt, dass an Urlaubs- und Feiertagen nicht gearbeitet wird – pro Arbeitsstunde verdienst du dadurch real mehr.' },
    { q: 'Wie viele Feiertage soll ich ansetzen?', a: 'Je nach Bundesland fallen rund 9 bis 13 gesetzliche Feiertage auf Werktage. Zusammen mit 30 Urlaubstagen ergeben sich oft 38 bis 43 freie Tage.' },
    { q: 'Eignet sich der Wert für Freelancer-Kalkulation?', a: 'Als Ausgangspunkt ja. Selbstständige müssen aber zusätzlich Steuern, Sozialabgaben, Akquise und unproduktive Zeit einrechnen – der reine Gehaltssatz ist dann nur die Untergrenze.' },
    { q: 'Rechnet das Tool mit 52 Wochen?', a: 'Ja, das Jahr wird mit 52 Wochen angesetzt. Davon werden die freien Tage in Arbeitstagen abgezogen, um die real geleisteten Stunden zu ermitteln.' },
    { q: 'Ist das brutto oder netto?', a: 'Brutto. Für den Netto-Stundensatz müsstest du das verfügbare Nettojahresgehalt einsetzen.' },
  ],
  related: ['stundenlohn-rechner', 'gehaltserhoehung-rechner', 'ueberstunden-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { jahresgehalt: 48000, wochenstunden: 40, arbeitstage_woche: 5, frei: 0 },
      expect: [{ label: 'Nominaler Stundensatz', value: 23.08, tolerance: 0.05 }],
    },
    {
      values: { jahresgehalt: 48000, wochenstunden: 40, arbeitstage_woche: 5, frei: 40 },
      expect: [{ label: 'Gearbeitete Stunden/Jahr', value: 1760, tolerance: 1 }],
    },
  ],
};
