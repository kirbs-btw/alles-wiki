import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

// Ehegattenunterhalt nach der verbreiteten 3/7-Methode (Erwerbstätigenbonus).
// Aus dem höheren bereinigten Nettoeinkommen erhält der Berechtigte
// die Hälfte der Differenz beider Einkommen, abzüglich eines Erwerbstätigenbonus
// von 1/7 (entspricht der "3/7-Methode": 3/7 der Differenz aus Erwerbseinkommen).
// Vereinfachte Orientierung – maßgeblich ist der Einzelfall.

export const tool: Tool = {
  slug: 'ehegattenunterhalt-rechner',
  category: 'familie',
  title: 'Ehegattenunterhalt-Rechner (3/7-Methode)',
  shortTitle: 'Ehegattenunterhalt',
  description:
    'Schätze den Ehegattenunterhalt nach der 3/7-Methode: 3/7 der Einkommensdifferenz aus Erwerbseinkommen. Vereinfachte Orientierung (Stand 2026).',
  keywords: [
    'ehegattenunterhalt rechner',
    'unterhalt ehegatte berechnen',
    '3/7 methode unterhalt',
    'nachehelicher unterhalt',
    'unterhalt ex partner',
    'erwerbstätigenbonus unterhalt',
  ],
  intro:
    'Der Ehegattenunterhalt wird häufig nach der 3/7-Methode geschätzt: Der besserverdienende Ehegatte zahlt 3/7 der Differenz beider bereinigter Nettoeinkommen aus Erwerbstätigkeit. Das verbleibende 1/7 ist der Erwerbstätigenbonus. Dieser Rechner liefert eine vereinfachte Orientierung (Stand 2026) – verbindlich ist die Berechnung im Einzelfall.',
  formula: 'Unterhalt = 3/7 × (Einkommen Pflichtiger − Einkommen Berechtigter)',
  inputs: [
    { type: 'number', id: 'pflichtig', label: 'Netto Unterhaltspflichtiger', unit: '€/Monat', default: 3500, min: 0, max: 20000, step: 50, help: 'bereinigtes Netto aus Erwerbstätigkeit' },
    { type: 'number', id: 'berechtigt', label: 'Netto Unterhaltsberechtigter', unit: '€/Monat', default: 1400, min: 0, max: 20000, step: 50, help: 'bereinigtes Netto aus Erwerbstätigkeit' },
  ],
  compute: (v) => {
    const pflichtig = Math.max(0, num(v.pflichtig, 3500));
    const berechtigt = Math.max(0, num(v.berechtigt, 1400));
    const differenz = Math.max(0, pflichtig - berechtigt);
    const unterhalt = (3 / 7) * differenz;
    const verbleibend = pflichtig - unterhalt;
    const gesamtBerechtigt = berechtigt + unterhalt;
    return [
      { label: 'Unterhalt pro Monat', value: unterhalt, unit: '€', digits: 2, primary: true },
      { label: 'Einkommensdifferenz', value: differenz, unit: '€', digits: 2 },
      { label: 'Verbleibend beim Pflichtigen', value: verbleibend, unit: '€', digits: 2 },
      { label: 'Gesamt beim Berechtigten', value: gesamtBerechtigt, unit: '€', digits: 2 },
    ];
  },
  howto: [
    'Bereinigtes Nettoeinkommen des Unterhaltspflichtigen eingeben.',
    'Bereinigtes Nettoeinkommen des Unterhaltsberechtigten eingeben.',
    'Der Rechner ermittelt 3/7 der Differenz als Orientierungswert.',
    'Für die verbindliche Berechnung anwaltliche Beratung nutzen.',
  ],
  faq: [
    { q: 'Was ist die 3/7-Methode?', a: 'Eine in der Rechtsprechung verbreitete Faustformel: Der Berechtigte erhält 3/7 der Differenz der Erwerbseinkommen. Der 1/7-Abzug ist der Erwerbstätigenbonus.' },
    { q: 'Was ist bereinigtes Nettoeinkommen?', a: 'Das Nettoeinkommen abzüglich berücksichtigungsfähiger Posten wie berufsbedingter Aufwendungen, Kindesunterhalt oder bestimmter Schulden.' },
    { q: 'Gilt das für Trennungs- und nachehelichen Unterhalt?', a: 'Die 3/7-Methode wird für beide Fälle als Orientierung genutzt. Der Selbstbehalt und ein vorrangiger Kindesunterhalt sind hier nicht berücksichtigt.' },
    { q: 'Wie verbindlich ist dieser Wert?', a: 'Es ist nur eine grobe Orientierung. Der tatsächliche Unterhalt hängt von vielen Einzelfallfaktoren ab und sollte rechtlich geprüft werden (Stand 2026).' },
  ],
  related: ['kindesunterhalt-rechner', 'familienbudget-rechner', 'trennungsunterhalt-rechner'],
  examples: [
    {
      values: { pflichtig: 3500, berechtigt: 1400 },
      expect: [
        { label: 'Einkommensdifferenz', value: 2100, tolerance: 0.01 },
        { label: 'Unterhalt pro Monat', value: 900, tolerance: 0.01 },
      ],
    },
    {
      values: { pflichtig: 4200, berechtigt: 0 },
      expect: [{ label: 'Unterhalt pro Monat', value: 1800, tolerance: 0.01 }],
    },
  ],
  updated: '2026-06-18',
};
