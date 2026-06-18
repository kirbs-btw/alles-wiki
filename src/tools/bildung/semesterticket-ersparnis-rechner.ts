import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'semesterticket-ersparnis-rechner',
  category: 'bildung',
  title: 'Semesterticket-Ersparnis berechnen',
  shortTitle: 'Semesterticket',
  description:
    'Vergleiche dein Semesterticket mit einem normalen Monatsabo und sieh, wie viel du pro Semester und pro Monat sparst.',
  keywords: [
    'semesterticket ersparnis',
    'semesterticket lohnt sich',
    'semesterticket vergleich abo',
    'semesterticket kosten rechner',
    'semesterticket pro monat',
    'studententicket sparen',
  ],
  intro:
    'Das Semesterticket wird als Pflichtbeitrag pro Semester gezahlt und gilt meist sechs Monate. Ob es guenstig ist, zeigt der Vergleich mit einem regulaeren Monatsabo. Das Tool rechnet den Semesterbeitrag auf einen Monatswert um und stellt ihm den Abopreis gegenueber. Trage den reinen Mobilitaetsbeitrag ohne Verwaltungs- oder Studierendenwerksanteil ein.',
  formula: 'Ersparnis je Monat = Monatsabo − Semesterticket / Monate je Semester',
  inputs: [
    { type: 'number', id: 'ticket', label: 'Semesterticket-Beitrag', unit: 'EUR', default: 200, min: 0, step: 5 },
    { type: 'number', id: 'monate', label: 'Geltungsdauer', unit: 'Monate', default: 6, min: 1, max: 12, step: 1 },
    { type: 'number', id: 'abo', label: 'Vergleichsabo je Monat', unit: 'EUR', default: 60, min: 0, step: 1, help: 'Preis eines normalen Monatstickets fuer dieselbe Strecke.' },
  ],
  compute: (v) => {
    const ticket = num(v.ticket);
    const monate = num(v.monate);
    const abo = num(v.abo);
    const proMonat = monate > 0 ? ticket / monate : 0;
    const ersparnisMonat = abo - proMonat;
    const ersparnisSemester = ersparnisMonat * monate;
    return [
      { label: 'Ersparnis je Semester', value: ersparnisSemester, unit: 'EUR', digits: 2, primary: true },
      { label: 'Semesterticket je Monat', value: proMonat, unit: 'EUR', digits: 2 },
      { label: 'Ersparnis je Monat', value: ersparnisMonat, unit: 'EUR', digits: 2 },
    ];
  },
  howto: [
    'Den Semesterticket-Beitrag pro Semester eintragen.',
    'Geltungsdauer in Monaten angeben (meist 6).',
    'Preis eines vergleichbaren Monatsabos eintragen.',
    'Ersparnis pro Monat und pro Semester ablesen.',
  ],
  faq: [
    { q: 'Lohnt sich das Semesterticket immer?', a: 'Meist ja, da es als Solidarmodell guenstiger ist als ein Einzelabo. Faehrst du sehr selten, kann der Pflichtbeitrag jedoch teurer sein als die tatsaechlich genutzten Fahrten.' },
    { q: 'Was zaehlt zum Semesterticket-Beitrag?', a: 'Trage nur den Mobilitaetsanteil ein. Der gesamte Semesterbeitrag enthaelt oft zusaetzlich Beitraege fuer Studierendenwerk und Verwaltung, die nichts mit dem Ticket zu tun haben.' },
    { q: 'Kann ich mich befreien lassen?', a: 'Einige Hochschulen erstatten den Beitrag teilweise, etwa bei Auslandssemester oder Schwerbehinderung mit Freifahrtberechtigung. Das regelt die Satzung deiner Studierendenschaft.' },
  ],
  related: ['studienkosten-rechner', 'bafoeg-hoechstsatz-rechner', 'studienkredit-rate-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { ticket: 200, monate: 6, abo: 60 },
      expect: [
        { label: 'Semesterticket je Monat', value: 33.33, tolerance: 0.01 },
        { label: 'Ersparnis je Semester', value: 160, tolerance: 0.5 },
      ],
    },
  ],
};
