import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

// Trennungsunterhalt nach der 3/7-Methode. Während der Trennung (vor Scheidung)
// kann der wirtschaftlich schwächere Ehegatte Unterhalt verlangen. Üblich ist
// die Quotenberechnung: 3/7 der Differenz der bereinigten Erwerbseinkommen.
// Ein optionaler Wohnvorteil kann das anrechenbare Einkommen erhöhen.
// Vereinfachte Orientierung – maßgeblich ist der Einzelfall (Stand 2026).

export const tool: Tool = {
  slug: 'trennungsunterhalt-rechner',
  category: 'familie',
  title: 'Trennungsunterhalt-Rechner',
  shortTitle: 'Trennungsunterhalt',
  description:
    'Schätze den Trennungsunterhalt nach der 3/7-Methode während der Trennungszeit. Mit optionalem Wohnvorteil. Vereinfachte Orientierung (Stand 2026).',
  keywords: [
    'trennungsunterhalt rechner',
    'trennungsunterhalt berechnen',
    'unterhalt trennung ehe',
    'unterhalt während trennung',
    'trennungsjahr unterhalt',
    'wohnvorteil unterhalt',
  ],
  intro:
    'Während der Trennung – bis zur rechtskräftigen Scheidung – kann der wirtschaftlich schwächere Ehegatte Trennungsunterhalt verlangen. Üblich ist die 3/7-Quote aus der Differenz der bereinigten Erwerbseinkommen. Ein mietfreies Wohnen im eigenen Haus (Wohnvorteil) erhöht das anrechenbare Einkommen. Dieser Rechner liefert eine vereinfachte Orientierung (Stand 2026).',
  formula: 'Unterhalt = 3/7 × ((Netto Pflichtiger + Wohnvorteil) − Netto Berechtigter)',
  inputs: [
    { type: 'number', id: 'pflichtig', label: 'Netto Unterhaltspflichtiger', unit: '€/Monat', default: 3000, min: 0, max: 20000, step: 50 },
    { type: 'number', id: 'berechtigt', label: 'Netto Unterhaltsberechtigter', unit: '€/Monat', default: 1100, min: 0, max: 20000, step: 50 },
    { type: 'number', id: 'wohnvorteil', label: 'Wohnvorteil Pflichtiger', unit: '€/Monat', default: 0, min: 0, max: 5000, step: 50, help: 'ersparte Miete bei eigenem Wohnen, 0 wenn keiner' },
  ],
  compute: (v) => {
    const pflichtig = Math.max(0, num(v.pflichtig, 3000));
    const berechtigt = Math.max(0, num(v.berechtigt, 1100));
    const wohnvorteil = Math.max(0, num(v.wohnvorteil, 0));
    const einkommenPflichtig = pflichtig + wohnvorteil;
    const differenz = Math.max(0, einkommenPflichtig - berechtigt);
    const unterhalt = (3 / 7) * differenz;
    return [
      { label: 'Trennungsunterhalt pro Monat', value: unterhalt, unit: '€', digits: 2, primary: true },
      { label: 'Anrechenbares Einkommen Pflichtiger', value: einkommenPflichtig, unit: '€', digits: 2 },
      { label: 'Einkommensdifferenz', value: differenz, unit: '€', digits: 2 },
    ];
  },
  howto: [
    'Bereinigtes Netto des Unterhaltspflichtigen eingeben.',
    'Bereinigtes Netto des Unterhaltsberechtigten eingeben.',
    'Wohnvorteil eintragen, falls der Pflichtige mietfrei im eigenen Heim wohnt.',
    'Den Orientierungswert für den Trennungsunterhalt ablesen.',
  ],
  faq: [
    { q: 'Wie lange wird Trennungsunterhalt gezahlt?', a: 'Vom Zeitpunkt der Trennung bis zur rechtskräftigen Scheidung. Danach kann es nachehelichen Unterhalt geben, der gesondert geprüft wird.' },
    { q: 'Was ist der Wohnvorteil?', a: 'Wer im gemeinsamen Haus oder Eigentum mietfrei wohnt, spart Miete. Dieser geldwerte Vorteil wird dem Einkommen zugerechnet und erhöht den Unterhalt.' },
    { q: 'Muss der Berechtigte arbeiten?', a: 'Im Trennungsjahr besteht häufig keine Erwerbsobliegenheit. Mit fortschreitender Trennungsdauer kann fiktives Einkommen angerechnet werden. Das ist hier nicht abgebildet.' },
    { q: 'Wie genau ist die Schätzung?', a: 'Es ist eine grobe Orientierung nach der 3/7-Methode. Selbstbehalt, Kindesunterhalt-Vorrang und Sonderfälle bleiben unberücksichtigt. Verbindlich ist die Einzelfallprüfung (Stand 2026).' },
  ],
  related: ['ehegattenunterhalt-rechner', 'kindesunterhalt-rechner', 'familienbudget-rechner'],
  examples: [
    {
      values: { pflichtig: 3000, berechtigt: 1100, wohnvorteil: 0 },
      expect: [
        { label: 'Einkommensdifferenz', value: 1900, tolerance: 0.01 },
        { label: 'Trennungsunterhalt pro Monat', value: 814.29, tolerance: 0.05 },
      ],
    },
    {
      values: { pflichtig: 2800, berechtigt: 1200, wohnvorteil: 500 },
      expect: [
        { label: 'Anrechenbares Einkommen Pflichtiger', value: 3300, tolerance: 0.01 },
        { label: 'Trennungsunterhalt pro Monat', value: 900, tolerance: 0.01 },
      ],
    },
  ],
  updated: '2026-06-18',
};
