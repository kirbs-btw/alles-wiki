import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'nebenkosten-personen-rechner',
  category: 'wohnen',
  title: 'Nebenkosten-Verteiler nach Personen',
  shortTitle: 'Nebenkosten/Person',
  description:
    'Verteile Betriebskosten nach dem Personenschlüssel: Berechne deinen Anteil aus den Gesamtkosten, der Personenzahl im Haus und deinem Haushalt – pro Jahr und Monat.',
  keywords: [
    'nebenkosten nach personen',
    'betriebskosten personenschlüssel',
    'nebenkosten verteilen personen',
    'umlage nach kopfzahl',
    'nebenkosten anteil personen rechner',
    'müllgebühren pro person',
  ],
  formula:
    'Anteil = Gesamtkosten × (eigene Personen / Personen gesamt); Monat = Anteil / 12',
  inputs: [
    { type: 'number', id: 'gesamtkosten', label: 'Umlagefähige Gesamtkosten (Jahr)', unit: '€', default: 6000, min: 0, step: 50, help: 'Posten, die nach Personen verteilt werden (z. B. Müll, Wasser, Aufzug).' },
    { type: 'number', id: 'personenGesamt', label: 'Personen im Haus gesamt', unit: 'Personen', default: 12, min: 1, step: 1 },
    { type: 'number', id: 'eigenePersonen', label: 'Personen im eigenen Haushalt', unit: 'Personen', default: 3, min: 0, step: 1 },
    { type: 'number', id: 'vorauszahlung', label: 'Geleistete Vorauszahlung (Jahr)', unit: '€', default: 1200, min: 0, step: 50, help: 'Bereits gezahlte monatliche Vorauszahlungen × 12.' },
  ],
  compute: (v) => {
    const gesamtkosten = num(v.gesamtkosten);
    const personenGesamt = num(v.personenGesamt);
    const eigenePersonen = num(v.eigenePersonen);
    const vorauszahlung = num(v.vorauszahlung);
    const anteilFaktor = personenGesamt > 0 ? eigenePersonen / personenGesamt : 0;
    const anteilJahr = gesamtkosten * anteilFaktor;
    const anteilMonat = anteilJahr / 12;
    const saldo = vorauszahlung - anteilJahr;
    return [
      { label: 'Kostenanteil pro Jahr', value: anteilJahr, unit: '€', digits: 2, primary: true },
      { label: 'Kostenanteil pro Monat', value: anteilMonat, unit: '€', digits: 2 },
      { label: 'Personenanteil', value: anteilFaktor * 100, unit: '%', digits: 2 },
      { label: 'Saldo (Guthaben +/Nachzahlung −)', value: saldo, unit: '€', digits: 2, help: 'Positiv = Guthaben, negativ = Nachzahlung.' },
    ];
  },
  intro:
    'Manche Betriebskosten werden nicht nach Wohnfläche, sondern nach der Personenzahl verteilt – etwa Müllabfuhr, Wasser, Abwasser oder Aufzug, wenn der Mietvertrag oder ein WEG-Beschluss dies vorsieht. Dein Anteil ergibt sich aus dem Verhältnis der Personen in deinem Haushalt zur Gesamtzahl der Personen im Abrechnungsobjekt. Der Rechner verteilt die Kosten nach diesem Kopfschlüssel und vergleicht sie mit deiner Vorauszahlung.',
  howto: [
    'Umlagefähige Gesamtkosten eintragen, die nach Personen verteilt werden.',
    'Gesamtzahl der Personen im Haus angeben.',
    'Personenzahl im eigenen Haushalt eingeben.',
    'Vorauszahlung ergänzen und Anteil sowie Saldo ablesen.',
  ],
  faq: [
    { q: 'Wann gilt der Personenschlüssel?', a: 'Der Personenschlüssel ist zulässig, wenn er im Mietvertrag vereinbart oder in der WEG beschlossen wurde. Ohne Vereinbarung gilt nach § 556a BGB die Verteilung nach Wohnfläche.' },
    { q: 'Welche Kosten werden oft nach Personen verteilt?', a: 'Typisch sind verbrauchsnahe Posten wie Müllgebühren, Frisch- und Abwasser sowie teils Aufzug. Heizung und Warmwasser müssen dagegen überwiegend nach Verbrauch abgerechnet werden.' },
    { q: 'Wie wird die Personenzahl bei Wechseln ermittelt?', a: 'Bei unterjährigem Zu- oder Auszug wird meist mit Personenmonaten gerechnet. Dieser Rechner setzt eine konstante Personenzahl über den Abrechnungszeitraum voraus.' },
  ],
  related: ['nebenkosten-umlage-rechner', 'heizkostenanteil-rechner', 'hausgeld-rechner'],
  updated: '2026-06-19',
  examples: [
    {
      values: { gesamtkosten: 6000, personenGesamt: 12, eigenePersonen: 3, vorauszahlung: 1200 },
      expect: [
        { label: 'Kostenanteil pro Jahr', value: 1500, tolerance: 0.01 },
        { label: 'Kostenanteil pro Monat', value: 125, tolerance: 0.01 },
        { label: 'Personenanteil', value: 25, tolerance: 0.01 },
        { label: 'Saldo (Guthaben +/Nachzahlung −)', value: -300, tolerance: 0.01 },
      ],
    },
  ],
};
