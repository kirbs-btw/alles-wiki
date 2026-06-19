import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'tagessatz-jahresgehalt-rechner',
  category: 'beruf',
  title: 'Tagessatz ↔ Jahresgehalt Rechner (Freelancer)',
  shortTitle: 'Tagessatz ↔ Gehalt',
  description:
    'Rechne deinen Freelancer-Tagessatz in ein vergleichbares Angestellten-Jahresgehalt um – und zurück. Berücksichtigt fakturierbare Tage und einen Festanstellungs-Aufschlag.',
  keywords: [
    'tagessatz jahresgehalt rechner',
    'tagessatz in gehalt umrechnen',
    'freelancer tagessatz vergleich',
    'jahresgehalt in tagessatz',
    'tagessatz vergleich angestellt',
    'tagessatz festanstellung',
  ],
  formula:
    'Jahresumsatz = Tagessatz × fakturierbare Tage ; vergleichbares Brutto = Jahresumsatz ÷ (1 + Aufschlag%)',
  inputs: [
    { type: 'number', id: 'tagessatz', label: 'Tagessatz (netto, ohne USt)', unit: '€', default: 700, min: 0, step: 10, help: 'Dein abrechenbarer Tagessatz ohne Umsatzsteuer.' },
    { type: 'number', id: 'tage', label: 'Fakturierbare Tage pro Jahr', unit: 'Tage', default: 200, min: 1, max: 365, step: 5, help: 'Abrechenbare Tage nach Abzug von Urlaub, Krankheit, Akquise und Leerlauf.' },
    { type: 'number', id: 'aufschlag', label: 'Selbständigen-Aufschlag', unit: '%', default: 30, min: 0, max: 200, step: 5, help: 'Mehrkosten der Selbständigkeit (Vorsorge, Ausfallrisiko, keine bezahlten Urlaube), die ein Angestelltengehalt nicht hat.' },
  ],
  compute: (v) => {
    const tagessatz = num(v.tagessatz);
    const tage = num(v.tage);
    const aufschlag = num(v.aufschlag) / 100;

    const jahresumsatz = tagessatz * tage;
    const vergleichBrutto = jahresumsatz / (1 + aufschlag);
    const monatBrutto = vergleichBrutto / 12;
    const umsatzProMonat = jahresumsatz / 12;

    return [
      { label: 'Vergleichbares Brutto-Jahresgehalt', value: vergleichBrutto, unit: '€', digits: 2, primary: true, help: 'Angestellten-Gehalt, das dein Tagessatz nach Aufschlag etwa ersetzt.' },
      { label: 'Jahresumsatz (Freelancer)', value: jahresumsatz, unit: '€', digits: 2 },
      { label: 'Vergleichbares Monatsbrutto', value: monatBrutto, unit: '€', digits: 2 },
      { label: 'Umsatz pro Monat', value: umsatzProMonat, unit: '€', digits: 2 },
    ];
  },
  intro:
    'Ist ein Tagessatz von 700 € viel oder wenig im Vergleich zu einer Festanstellung? Dieser Rechner setzt deinen Tagessatz mit den fakturierbaren Tagen ins Verhältnis und zieht einen Aufschlag für die Mehrkosten der Selbständigkeit ab – etwa Altersvorsorge, Krankenversicherung, fehlende Lohnfortzahlung und Ausfallrisiko. So erhältst du ein grob vergleichbares Brutto-Jahresgehalt. Alle Werte sind ohne Umsatzsteuer.',
  howto: [
    'Trage deinen Netto-Tagessatz ohne Umsatzsteuer ein.',
    'Schätze, an wie vielen Tagen im Jahr du tatsächlich abrechnest.',
    'Wähle einen Aufschlag, der die Mehrkosten der Selbständigkeit abbildet.',
    'Lies das vergleichbare Brutto-Jahresgehalt ab.',
  ],
  faq: [
    { q: 'Warum brauche ich einen Aufschlag?', a: 'Als Selbständiger trägst du Kosten, die ein Arbeitgeber sonst übernimmt: vollen Sozialversicherungsbeitrag, keine bezahlten Urlaubs- oder Krankheitstage, Ausfall- und Akquiserisiko. Der Aufschlag macht dein Einkommen mit einem Angestelltenbrutto vergleichbar.' },
    { q: 'Wie viele fakturierbare Tage sind realistisch?', a: 'Von rund 250 Werktagen bleiben nach Urlaub, Krankheit, Weiterbildung, Akquise und Leerlauf häufig 180–220 abrechenbare Tage. Setze den Wert eher konservativ an.' },
    { q: 'Ist die Umsatzsteuer enthalten?', a: 'Nein. Alle Beträge verstehen sich netto ohne Umsatzsteuer, da diese durchlaufender Posten ist und dein Einkommen nicht erhöht.' },
    { q: 'Kann ich auch vom Gehalt auf den Tagessatz rechnen?', a: 'Ja indirekt: Stelle Aufschlag und Tage ein und probiere Tagessätze aus, bis das vergleichbare Brutto deinem Zielgehalt entspricht. So findest du den nötigen Tagessatz.' },
  ],
  related: ['freelancer-stundensatz-rechner', 'brutto-stundensatz-rechner', 'jahresgehalt-rechner'],
  updated: '2026-06-19',
  examples: [
    {
      values: { tagessatz: 700, tage: 200, aufschlag: 30 },
      expect: [
        { label: 'Jahresumsatz (Freelancer)', value: 140000, tolerance: 0.01 },
        { label: 'Vergleichbares Brutto-Jahresgehalt', value: 107692.31, tolerance: 0.05 },
        { label: 'Vergleichbares Monatsbrutto', value: 8974.36, tolerance: 0.05 },
      ],
    },
  ],
};
