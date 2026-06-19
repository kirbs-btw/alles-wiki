import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'hausgeld-rechner',
  category: 'wohnen',
  title: 'Hausgeld-Rechner (WEG)',
  shortTitle: 'Hausgeld',
  description:
    'Berechne dein monatliches Hausgeld als Wohnungseigentümer aus dem Gesamtwirtschaftsplan der WEG und deinem Miteigentumsanteil (MEA).',
  keywords: [
    'hausgeld berechnen',
    'weg hausgeld rechner',
    'miteigentumsanteil hausgeld',
    'wohngeld eigentümer berechnen',
    'hausgeld pro monat',
    'wohnungseigentum hausgeld',
  ],
  formula:
    'Anteil = eigener MEA / Gesamt-MEA; Hausgeld/Jahr = Gesamtwirtschaftsplan × Anteil; Hausgeld/Monat = Jahr / 12',
  inputs: [
    { type: 'number', id: 'gesamtplan', label: 'Gesamtwirtschaftsplan (Jahr)', unit: '€', default: 60000, min: 0, step: 100, help: 'Geplante Gesamtausgaben der WEG inkl. Instandhaltungsrücklage pro Jahr.' },
    { type: 'number', id: 'eigenerMea', label: 'Eigener Miteigentumsanteil', unit: '/1000', default: 85, min: 0, step: 1, help: 'Aus der Teilungserklärung, meist als Anteil von 1.000.' },
    { type: 'number', id: 'gesamtMea', label: 'Summe aller Miteigentumsanteile', unit: '/1000', default: 1000, min: 1, step: 1, help: 'In der Regel 1.000 (oder 10.000).' },
    { type: 'number', id: 'ruecklageAnteil', label: 'Anteil Instandhaltungsrücklage', unit: '%', default: 20, min: 0, max: 60, step: 1, help: 'Anteil des Wirtschaftsplans, der in die Rücklage fließt (nicht umlagefähig).' },
  ],
  compute: (v) => {
    const gesamtplan = num(v.gesamtplan);
    const eigenerMea = num(v.eigenerMea);
    const gesamtMea = num(v.gesamtMea);
    const ruecklageAnteil = num(v.ruecklageAnteil);
    const anteil = gesamtMea > 0 ? eigenerMea / gesamtMea : 0;
    const hausgeldJahr = gesamtplan * anteil;
    const hausgeldMonat = hausgeldJahr / 12;
    const ruecklageMonat = hausgeldMonat * (ruecklageAnteil / 100);
    return [
      { label: 'Hausgeld pro Monat', value: hausgeldMonat, unit: '€', digits: 2, primary: true },
      { label: 'Hausgeld pro Jahr', value: hausgeldJahr, unit: '€', digits: 2 },
      { label: 'Kostenanteil (MEA)', value: anteil * 100, unit: '%', digits: 2 },
      { label: 'davon Rücklage (Monat)', value: ruecklageMonat, unit: '€', digits: 2, help: 'Nicht auf Mieter umlagefähig.' },
    ];
  },
  intro:
    'In einer Wohnungseigentümergemeinschaft (WEG) zahlt jeder Eigentümer monatlich Hausgeld als Vorschuss auf die gemeinschaftlichen Kosten. Der Anteil richtet sich grundsätzlich nach dem Miteigentumsanteil (MEA) aus der Teilungserklärung, sofern die Gemeinschaft keinen abweichenden Verteilerschlüssel beschlossen hat. Das Hausgeld umfasst sowohl umlagefähige Betriebskosten als auch nicht umlagefähige Posten wie Verwaltung und Instandhaltungsrücklage. Der Rechner verteilt den Wirtschaftsplan nach MEA auf deine Wohnung.',
  howto: [
    'Gesamtwirtschaftsplan der WEG für das Jahr eingeben.',
    'Eigenen Miteigentumsanteil aus der Teilungserklärung eintragen.',
    'Summe aller Miteigentumsanteile angeben (meist 1.000).',
    'Anteil der Instandhaltungsrücklage festlegen und Hausgeld ablesen.',
  ],
  faq: [
    { q: 'Was ist im Hausgeld enthalten?', a: 'Hausgeld umfasst die laufenden Bewirtschaftungskosten der Gemeinschaft: Betriebskosten (Wasser, Müll, Hausreinigung, Versicherung), Verwaltungskosten und die Zuführung zur Instandhaltungsrücklage. Es ist breiter als die reinen Mietnebenkosten.' },
    { q: 'Was ist der Miteigentumsanteil?', a: 'Der Miteigentumsanteil (MEA) gibt deinen rechnerischen Anteil am gemeinschaftlichen Eigentum an. Er steht in der Teilungserklärung, üblich als Anteil von 1.000 oder 10.000, und ist standardmäßig der Verteilerschlüssel für das Hausgeld.' },
    { q: 'Welcher Teil ist auf Mieter umlagefähig?', a: 'Auf Mieter umlagefähig sind nur die Betriebskosten nach Betriebskostenverordnung. Verwaltungskosten und die Instandhaltungsrücklage trägt der Eigentümer selbst und darf sie nicht weitergeben.' },
    { q: 'Ist die Berechnung verbindlich?', a: 'Nein, sie ist eine Orientierung. Maßgeblich sind der beschlossene Wirtschaftsplan und ein eventuell abweichender Verteilerschlüssel laut Teilungserklärung oder Beschluss der Eigentümerversammlung.' },
  ],
  related: ['instandhaltungsruecklage-rechner', 'nebenkosten-umlage-rechner', 'mietrendite-rechner'],
  updated: '2026-06-19',
  examples: [
    {
      values: { gesamtplan: 60000, eigenerMea: 85, gesamtMea: 1000, ruecklageAnteil: 20 },
      expect: [
        { label: 'Hausgeld pro Jahr', value: 5100, tolerance: 0.01 },
        { label: 'Hausgeld pro Monat', value: 425, tolerance: 0.01 },
        { label: 'Kostenanteil (MEA)', value: 8.5, tolerance: 0.01 },
        { label: 'davon Rücklage (Monat)', value: 85, tolerance: 0.01 },
      ],
    },
  ],
};
