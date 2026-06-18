import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

// Düsseldorfer Tabelle 2026 (Näherung), erste Einkommensgruppe (bis 2.100 € netto).
// Zahlbeträge nach Abzug des hälftigen Kindergeldes (255 €/2 = 127,50 €) bei
// minderjährigen Kindern. Werte als nachvollziehbare Näherung – maßgeblich ist die
// jeweils gültige amtliche Tabelle.
const ALTERSSTUFE: { value: string; label: string; bedarf: number }[] = [
  { value: 'st1', label: '0 bis 5 Jahre', bedarf: 482 },
  { value: 'st2', label: '6 bis 11 Jahre', bedarf: 554 },
  { value: 'st3', label: '12 bis 17 Jahre', bedarf: 649 },
  { value: 'st4', label: 'ab 18 Jahre', bedarf: 693 },
];

// Prozentaufschlag der Düsseldorfer Tabelle je Einkommensgruppe (Stufe 1 = 100 %).
const EINKOMMENSGRUPPE: { value: string; label: string; faktor: number }[] = [
  { value: 'g1', label: 'bis 2.100 € (Stufe 1)', faktor: 1.0 },
  { value: 'g2', label: '2.101 – 2.500 € (Stufe 2, +5 %)', faktor: 1.05 },
  { value: 'g3', label: '2.501 – 2.900 € (Stufe 3, +10 %)', faktor: 1.1 },
  { value: 'g4', label: '2.901 – 3.300 € (Stufe 4, +15 %)', faktor: 1.15 },
  { value: 'g5', label: '3.301 – 3.700 € (Stufe 5, +20 %)', faktor: 1.2 },
];

const KINDERGELD_HALB = 127.5; // 255 € / 2, Stand 2026

export const tool: Tool = {
  slug: 'kindesunterhalt-rechner',
  category: 'familie',
  title: 'Kindesunterhalt nach Düsseldorfer Tabelle',
  shortTitle: 'Kindesunterhalt',
  description:
    'Schätze den Kindesunterhalt nach der Düsseldorfer Tabelle: Bedarf nach Alter und Einkommensgruppe, Zahlbetrag nach Abzug des halben Kindergeldes (Stand 2026).',
  keywords: [
    'kindesunterhalt rechner',
    'düsseldorfer tabelle 2026',
    'unterhalt kind berechnen',
    'unterhalt nach alter',
    'zahlbetrag unterhalt',
    'mindestunterhalt kind',
    'unterhalt tabelle',
  ],
  intro:
    'Der Kindesunterhalt richtet sich nach der Düsseldorfer Tabelle. Maßgeblich sind das bereinigte Nettoeinkommen des zahlenden Elternteils und das Alter des Kindes. Vom Tabellenbedarf wird bei minderjährigen Kindern das halbe Kindergeld (127,50 € bei 255 €) abgezogen. Dieser Rechner liefert eine nachvollziehbare Näherung (Stand 2026) – verbindlich ist die jeweils aktuelle amtliche Tabelle.',
  formula:
    'Zahlbetrag = Tabellenbedarf(Alter) × Einkommensfaktor − halbes Kindergeld (127,50 €)',
  inputs: [
    {
      type: 'select', id: 'stufe', label: 'Altersstufe des Kindes', default: 'st2',
      options: ALTERSSTUFE.map((s) => ({ value: s.value, label: s.label })),
    },
    {
      type: 'select', id: 'gruppe', label: 'Nettoeinkommen Zahlender', default: 'g1',
      options: EINKOMMENSGRUPPE.map((g) => ({ value: g.value, label: g.label })),
    },
  ],
  compute: (v) => {
    const stufe = ALTERSSTUFE.find((s) => s.value === String(v.stufe)) ?? ALTERSSTUFE[1];
    const gruppe = EINKOMMENSGRUPPE.find((g) => g.value === String(v.gruppe)) ?? EINKOMMENSGRUPPE[0];
    const bedarf = stufe.bedarf * gruppe.faktor;
    // Bei volljährigen Kindern wird das volle Kindergeld angerechnet, hier vereinfacht
    // nur halbes Kindergeld für minderjährige Stufen; ab 18 volles Kindergeld.
    const abzug = stufe.value === 'st4' ? KINDERGELD_HALB * 2 : KINDERGELD_HALB;
    const zahlbetrag = Math.max(0, bedarf - abzug);
    return [
      { label: 'Zahlbetrag pro Monat', value: zahlbetrag, unit: '€', digits: 2, primary: true, help: 'nach Abzug Kindergeld' },
      { label: 'Tabellenbedarf', value: bedarf, unit: '€', digits: 2 },
      { label: 'Abzug Kindergeld', value: abzug, unit: '€', digits: 2 },
    ];
  },
  howto: [
    'Altersstufe des Kindes wählen (Tabelle staffelt nach 0–5, 6–11, 12–17, ab 18).',
    'Einkommensgruppe nach dem bereinigten Netto des Zahlenden auswählen.',
    'Tabellenbedarf und Zahlbetrag nach Abzug des Kindergeldes ablesen.',
    'Für den verbindlichen Betrag die aktuelle Düsseldorfer Tabelle bzw. eine Beratung nutzen.',
  ],
  faq: [
    { q: 'Was ist die Düsseldorfer Tabelle?', a: 'Eine bundesweit anerkannte Leitlinie der Gerichte zur Höhe des Kindesunterhalts. Sie staffelt den Bedarf nach dem Einkommen des Unterhaltspflichtigen und dem Alter des Kindes.' },
    { q: 'Warum wird Kindergeld abgezogen?', a: 'Bei minderjährigen Kindern wird die Hälfte des Kindergeldes (Stand 2026: 127,50 €) auf den Bedarf angerechnet. Bei volljährigen Kindern in der Regel das volle Kindergeld.' },
    { q: 'Was bedeutet bereinigtes Nettoeinkommen?', a: 'Das Nettoeinkommen abzüglich berücksichtigungsfähiger Posten wie berufsbedingter Aufwendungen oder bestimmter Schulden. Der genaue Betrag wird im Einzelfall ermittelt.' },
    { q: 'Wie genau ist dieser Rechner?', a: 'Er bildet die ersten Einkommensgruppen als Näherung ab (Stand 2026). Selbstbehalt, Mangelfälle, weitere Unterhaltsberechtigte und Sonderbedarf sind nicht berücksichtigt. Verbindlich ist die amtliche Tabelle.' },
    { q: 'Gibt es einen Mindestunterhalt?', a: 'Ja. Die unterste Stufe der Düsseldorfer Tabelle entspricht dem gesetzlichen Mindestunterhalt. Darunter darf der Unterhalt für minderjährige Kinder grundsätzlich nicht fallen.' },
  ],
  related: ['kindergeld-rechner', 'kosten-kind-rechner', 'familienbudget-rechner'],
  examples: [
    {
      values: { stufe: 'st2', gruppe: 'g1' },
      expect: [
        { label: 'Tabellenbedarf', value: 554, tolerance: 0.01 },
        { label: 'Zahlbetrag pro Monat', value: 426.5, tolerance: 0.01 },
      ],
    },
    {
      values: { stufe: 'st1', gruppe: 'g3' },
      expect: [{ label: 'Tabellenbedarf', value: 530.2, tolerance: 0.01 }],
    },
  ],
  updated: '2026-06-18',
};
