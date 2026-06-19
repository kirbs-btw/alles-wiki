import type { Tool } from '../../lib/types';
import { num, daysBetween } from '../../lib/types';

export const tool: Tool = {
  slug: 'kurzfristige-beschaeftigung-rechner',
  category: 'beruf',
  title: 'Kurzfristige Beschäftigung Rechner (Tage-Grenze)',
  shortTitle: 'Kurzfristige Beschäftigung',
  description:
    'Prüfe, ob eine kurzfristige Beschäftigung die Zeitgrenze einhält: max. 70 Arbeitstage oder 3 Monate im Kalenderjahr (Stand 2026) – sozialversicherungsfrei.',
  keywords: [
    'kurzfristige beschäftigung rechner',
    '70 tage regelung berechnen',
    'kurzfristige beschäftigung 2026',
    'aushilfe 70 arbeitstage',
    'kurzfristiger minijob tage',
  ],
  formula: 'Kurzfristig, wenn geplante Arbeitstage ≤ Tagesgrenze (70) und genutzte + geplante Tage ≤ Grenze',
  inputs: [
    { type: 'date', id: 'beginn', label: 'Beginn der Beschäftigung', default: '2026-07-01' },
    { type: 'date', id: 'ende', label: 'Ende der Beschäftigung', default: '2026-08-15' },
    { type: 'number', id: 'tageProWoche', label: 'Arbeitstage pro Woche', unit: 'Tage', default: 5, min: 1, max: 7, step: 1, help: 'Regelmäßige Arbeitstage je Woche im Beschäftigungszeitraum.' },
    { type: 'number', id: 'vortage', label: 'Bereits genutzte Arbeitstage im Jahr', unit: 'Tage', default: 0, min: 0, step: 1, help: 'Arbeitstage aus früheren kurzfristigen Beschäftigungen im selben Kalenderjahr.' },
    { type: 'number', id: 'grenze', label: 'Tagesgrenze im Kalenderjahr', unit: 'Tage', default: 70, min: 1, step: 1, help: 'Zeitgrenze für kurzfristige Beschäftigung, Stand 2026: 70 Arbeitstage.' },
  ],
  compute: (v) => {
    const beginn = String(v.beginn);
    const ende = String(v.ende);
    const tageProWoche = num(v.tageProWoche, 5);
    const vortage = num(v.vortage);
    const grenze = num(v.grenze, 70);

    const kalenderTage = Math.abs(daysBetween(beginn, ende)) + 1; // inklusive beider Endtage
    const wochen = kalenderTage / 7;
    const arbeitstage = Math.round(wochen * tageProWoche);
    const gesamtTage = arbeitstage + vortage;
    const kurzfristig = gesamtTage <= grenze;
    const restTage = Math.max(grenze - gesamtTage, 0);

    return [
      { label: 'Arbeitstage in diesem Zeitraum', value: arbeitstage, unit: 'Tage', digits: 0, primary: true },
      { label: 'Status', value: kurzfristig ? 'Kurzfristig (SV-frei möglich)' : 'Grenze überschritten – nicht mehr kurzfristig' },
      { label: 'Arbeitstage gesamt im Jahr', value: gesamtTage, unit: 'Tage', digits: 0, help: 'Inklusive bereits genutzter Tage aus früheren Beschäftigungen.' },
      { label: 'Verbleibende Tage bis zur Grenze', value: restTage, unit: 'Tage', digits: 0 },
    ];
  },
  intro:
    'Eine kurzfristige Beschäftigung ist sozialversicherungsfrei, wenn sie im Voraus auf eine bestimmte Zeitgrenze begrenzt ist. Stand 2026 gilt: Die Beschäftigung darf höchstens 70 Arbeitstage oder 3 Monate im Kalenderjahr umfassen (bei weniger als 5 Arbeitstagen pro Woche zählt die 70-Tage-Grenze). Anders als beim Minijob spielt die Höhe des Verdienstes keine Rolle. Dieser Rechner schätzt die Arbeitstage im Zeitraum und prüft, ob die Grenze eingehalten wird. Die genaue Beurteilung trifft die Lohnabrechnung bzw. die Krankenkasse.',
  howto: [
    'Trage Beginn und Ende der Beschäftigung ein.',
    'Gib die regelmäßigen Arbeitstage pro Woche an.',
    'Erfasse bereits im Jahr genutzte kurzfristige Arbeitstage.',
    'Lies ab, ob die 70-Tage-Grenze eingehalten wird.',
  ],
  faq: [
    { q: 'Was ist eine kurzfristige Beschäftigung?', a: 'Eine im Voraus zeitlich begrenzte Beschäftigung, die Stand 2026 höchstens 70 Arbeitstage oder 3 Monate im Kalenderjahr umfasst. Sie ist sozialversicherungsfrei, der Verdienst spielt keine Rolle.' },
    { q: 'Wann gelten 70 Tage und wann 3 Monate?', a: 'Die 3-Monats-Grenze gilt bei einer regelmäßigen Arbeitswoche von mindestens 5 Tagen, die 70-Tage-Grenze bei weniger als 5 Arbeitstagen pro Woche. Dieser Rechner arbeitet mit der Arbeitstage-Grenze.' },
    { q: 'Werden mehrere Jobs zusammengerechnet?', a: 'Ja. Alle kurzfristigen Beschäftigungen eines Kalenderjahres werden zur Prüfung der Zeitgrenze addiert. Deshalb sollten bereits genutzte Tage berücksichtigt werden.' },
    { q: 'Ist das Ergebnis verbindlich?', a: 'Nein, es ist eine Orientierung (Stand 2026). Die rechtsverbindliche Einstufung erfolgt durch Arbeitgeber und Krankenkasse anhand der konkreten Vertragsgestaltung.' },
  ],
  related: ['minijob-stunden-rechner', 'midijob-uebergangsbereich-rechner', 'arbeitstage-zwischen-rechner'],
  updated: '2026-06-19',
  examples: [
    {
      values: { beginn: '2026-07-01', ende: '2026-08-15', tageProWoche: 5, vortage: 0, grenze: 70 },
      expect: [
        { label: 'Arbeitstage in diesem Zeitraum', value: 33, tolerance: 0 },
        { label: 'Arbeitstage gesamt im Jahr', value: 33, tolerance: 0 },
      ],
    },
    {
      values: { beginn: '2026-06-01', ende: '2026-08-31', tageProWoche: 6, vortage: 0, grenze: 70 },
      expect: [
        { label: 'Arbeitstage in diesem Zeitraum', value: 79, tolerance: 0 },
        { label: 'Verbleibende Tage bis zur Grenze', value: 0, tolerance: 0 },
      ],
    },
  ],
};
