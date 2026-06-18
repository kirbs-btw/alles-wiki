import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'nebenkosten-umlage-rechner',
  category: 'wohnen',
  title: 'Nebenkosten-Umlage-Rechner',
  shortTitle: 'Nebenkosten-Umlage',
  description:
    'Berechne deinen Anteil an den Betriebskosten nach Wohnfläche: Wie viel der Gesamtkosten entfällt auf deine Wohnung – pro Jahr und pro Monat.',
  keywords: [
    'nebenkosten umlage berechnen',
    'betriebskosten anteil wohnfläche',
    'nebenkostenabrechnung prüfen',
    'umlage nach quadratmeter',
    'nebenkosten verteilen',
    'mietnebenkosten rechner',
    'betriebskostenabrechnung anteil',
  ],
  formula: 'Anteil = Gesamtkosten × (eigene Fläche / Gesamtfläche); Monat = Anteil / 12',
  inputs: [
    { type: 'number', id: 'gesamtkosten', label: 'Umlagefähige Gesamtkosten (Jahr)', unit: '€', default: 12000, min: 0, step: 100, help: 'Summe aller umlagefähigen Betriebskosten des Hauses pro Jahr.' },
    { type: 'number', id: 'gesamtflaeche', label: 'Gesamtwohnfläche im Haus', unit: 'm²', default: 600, min: 1, step: 1 },
    { type: 'number', id: 'eigeneflaeche', label: 'Eigene Wohnfläche', unit: 'm²', default: 75, min: 1, step: 1 },
    { type: 'number', id: 'vorauszahlung', label: 'Geleistete Vorauszahlung (Jahr)', unit: '€', default: 1500, min: 0, step: 50, help: 'Bereits gezahlte monatliche Vorauszahlungen × 12.' },
  ],
  compute: (v) => {
    const gesamtkosten = num(v.gesamtkosten);
    const gesamtflaeche = num(v.gesamtflaeche);
    const eigeneflaeche = num(v.eigeneflaeche);
    const vorauszahlung = num(v.vorauszahlung);
    const anteilFaktor = gesamtflaeche > 0 ? eigeneflaeche / gesamtflaeche : 0;
    const anteilJahr = gesamtkosten * anteilFaktor;
    const anteilMonat = anteilJahr / 12;
    const saldo = vorauszahlung - anteilJahr;
    return [
      { label: 'Kostenanteil pro Jahr', value: anteilJahr, unit: '€', digits: 2, primary: true },
      { label: 'Kostenanteil pro Monat', value: anteilMonat, unit: '€', digits: 2 },
      { label: 'Flächenanteil', value: anteilFaktor * 100, unit: '%', digits: 2 },
      { label: 'Saldo (Guthaben +/Nachzahlung −)', value: saldo, unit: '€', digits: 2, help: 'Positiv = Guthaben, negativ = Nachzahlung.' },
    ];
  },
  intro:
    'Bei vielen Betriebskosten ist die Wohnfläche der gesetzliche Standard-Umlageschlüssel (§ 556a BGB), wenn nichts anderes vereinbart ist. Dein Anteil ergibt sich aus dem Verhältnis deiner Wohnfläche zur gesamten Wohnfläche des Hauses. So lässt sich eine Nebenkostenabrechnung schnell auf Plausibilität prüfen.',
  howto: [
    'Umlagefähige Gesamtkosten des Hauses pro Jahr eintragen (aus der Abrechnung).',
    'Gesamtwohnfläche aller umlegenden Wohnungen eingeben.',
    'Eigene Wohnfläche und die geleisteten Vorauszahlungen ergänzen.',
    'Kostenanteil sowie Guthaben oder Nachzahlung ablesen.',
  ],
  faq: [
    { q: 'Welcher Umlageschlüssel gilt?', a: 'Ohne abweichende Vereinbarung werden Betriebskosten nach dem Anteil der Wohnfläche umgelegt (§ 556a BGB). Verbrauchsabhängige Kosten wie Heizung und Warmwasser müssen jedoch überwiegend nach Verbrauch abgerechnet werden.' },
    { q: 'Was sind umlagefähige Nebenkosten?', a: 'Umlagefähig sind die in der Betriebskostenverordnung (BetrKV) genannten Posten, etwa Grundsteuer, Wasser, Müll, Hausreinigung, Gartenpflege, Versicherungen und Hausmeister. Verwaltungs- und Instandhaltungskosten dürfen nicht umgelegt werden.' },
    { q: 'Warum weicht meine Abrechnung ab?', a: 'Abweichungen entstehen oft, weil einzelne Posten nach anderen Schlüsseln (Personen, Verbrauch, Einheiten) verteilt werden. Dieser Rechner bildet die reine Flächenumlage ab und dient zur Plausibilitätsprüfung.' },
    { q: 'Wann darf ich eine Nachzahlung verlangen oder zahlen?', a: 'Vermieter müssen spätestens 12 Monate nach Ende des Abrechnungszeitraums abrechnen. Ein Guthaben ist auszuzahlen, eine Nachzahlung erst nach formell korrekter Abrechnung fällig.' },
  ],
  related: ['heizkostenanteil-rechner', 'quadratmeterpreis-rechner', 'wohnflaeche-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { gesamtkosten: 12000, gesamtflaeche: 600, eigeneflaeche: 75, vorauszahlung: 1500 },
      expect: [
        { label: 'Kostenanteil pro Jahr', value: 1500, tolerance: 0.01 },
        { label: 'Flächenanteil', value: 12.5, tolerance: 0.01 },
        { label: 'Saldo (Guthaben +/Nachzahlung −)', value: 0, tolerance: 0.01 },
      ],
    },
  ],
};
