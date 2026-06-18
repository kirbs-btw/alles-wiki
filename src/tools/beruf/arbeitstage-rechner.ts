import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'arbeitstage-rechner',
  category: 'beruf',
  title: 'Arbeitstage-Rechner pro Jahr',
  shortTitle: 'Arbeitstage',
  description:
    'Berechne deine tatsächlichen Arbeitstage im Jahr: Kalendertage minus Wochenenden, Feiertage und Urlaub – plus Arbeitsstunden gesamt.',
  keywords: [
    'arbeitstage rechner',
    'arbeitstage pro jahr berechnen',
    'nettoarbeitstage',
    'arbeitstage ohne urlaub',
    'jahresarbeitsstunden berechnen',
    'arbeitstage jahr feiertage',
  ],
  formula:
    'Arbeitstage = (Wochen × Tage/Woche) − Feiertage(werktags) − Urlaubstage',
  inputs: [
    { type: 'number', id: 'tageWoche', label: 'Arbeitstage pro Woche', unit: 'Tage', default: 5, min: 1, max: 7, step: 1 },
    { type: 'number', id: 'feiertage', label: 'Feiertage auf Werktagen', unit: 'Tage', default: 11, min: 0, max: 365, step: 1, help: 'Gesetzliche Feiertage, die auf einen Arbeitstag fallen (bundeslandabhängig, oft 9–12).' },
    { type: 'number', id: 'urlaub', label: 'Urlaubstage', unit: 'Tage', default: 30, min: 0, max: 365, step: 1 },
    { type: 'number', id: 'stundenTag', label: 'Arbeitsstunden pro Tag', unit: 'h', default: 8, min: 0, max: 24, step: 0.5 },
  ],
  compute: (v) => {
    const tageWoche = num(v.tageWoche);
    const feiertage = num(v.feiertage);
    const urlaub = num(v.urlaub);
    const stundenTag = num(v.stundenTag);

    const wochen = 365.25 / 7;
    const bruttoArbeitstage = wochen * tageWoche;
    const nettoArbeitstage = bruttoArbeitstage - feiertage - urlaub;
    const arbeitsstunden = nettoArbeitstage * stundenTag;

    return [
      { label: 'Tatsächliche Arbeitstage pro Jahr', value: nettoArbeitstage, unit: 'Tage', digits: 0, primary: true },
      { label: 'Mögliche Arbeitstage (ohne Abzüge)', value: bruttoArbeitstage, unit: 'Tage', digits: 0 },
      { label: 'Arbeitsstunden pro Jahr', value: arbeitsstunden, unit: 'h', digits: 0 },
    ];
  },
  intro:
    'Wie viele Tage arbeitest du tatsächlich im Jahr? Der Rechner geht von den möglichen Arbeitstagen aus (Wochen mal Arbeitstage pro Woche) und zieht Feiertage, die auf Werktage fallen, sowie deinen Urlaub ab. So erhältst du die Netto-Arbeitstage und die Jahresarbeitsstunden – nützlich für Stundensatz-, Kapazitäts- und Projektkalkulationen.',
  howto: [
    'Gib an, an wie vielen Tagen pro Woche du arbeitest (meist 5).',
    'Trage die Zahl der Feiertage ein, die auf einen Arbeitstag fallen.',
    'Erfasse deine Urlaubstage und die täglichen Arbeitsstunden.',
    'Lies die tatsächlichen Arbeitstage und Jahresarbeitsstunden ab.',
  ],
  faq: [
    { q: 'Warum 365,25 Tage?', a: 'Im langjährigen Mittel hat ein Jahr 365,25 Tage (wegen der Schaltjahre). Geteilt durch 7 ergeben sich rund 52,18 Wochen.' },
    { q: 'Wie viele Feiertage soll ich ansetzen?', a: 'Das hängt vom Bundesland ab und davon, wie viele Feiertage auf ein Wochenende fallen. Bundesweit gibt es 9 gesetzliche Feiertage, je nach Land kommen weitere hinzu – realistisch sind oft 9–12 werktägliche Feiertage.' },
    { q: 'Sind Krankheitstage berücksichtigt?', a: 'Nein. Krankheitstage sind nicht eingerechnet, weil sie individuell schwanken. Du kannst sie bei Bedarf gedanklich von den Urlaubstagen oder Arbeitstagen abziehen.' },
    { q: 'Wofür sind die Jahresarbeitsstunden gut?', a: 'Sie helfen, einen realistischen Stundensatz zu kalkulieren oder die Jahreskapazität für Projekte abzuschätzen.' },
  ],
  related: ['pendlerpauschale-rechner', 'homeoffice-pauschale-rechner', 'gleitzeit-saldo-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { tageWoche: 5, feiertage: 11, urlaub: 30, stundenTag: 8 },
      expect: [
        { label: 'Mögliche Arbeitstage (ohne Abzüge)', value: 261, tolerance: 1 },
        { label: 'Tatsächliche Arbeitstage pro Jahr', value: 220, tolerance: 1 },
        { label: 'Arbeitsstunden pro Jahr', value: 1761, tolerance: 12 },
      ],
    },
  ],
};
