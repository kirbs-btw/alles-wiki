import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

// Unterhalt-Selbstbehalt-Check (Näherung). Dem Unterhaltspflichtigen muss ein
// Selbstbehalt (Eigenbedarf) verbleiben. Richtwerte der Düsseldorfer Tabelle (Stand 2026):
// - gegenüber minderjährigen / privilegierten Kindern: erwerbstätig 1.450 €, nicht erwerbstätig 1.200 €
// - gegenüber volljährigen Kindern (angemessener Selbstbehalt): 1.750 €
// Dieser Rechner prüft, ob nach Zahlung des Unterhalts der Selbstbehalt gewahrt bleibt,
// und zeigt den maximal leistbaren Unterhalt. KEINE Rechtsberatung – Orientierung (Stand 2026).

const SELBSTBEHALT: { value: string; label: string; betrag: number }[] = [
  { value: 'minderj_erwerb', label: 'Minderj. Kind, erwerbstätig (1.450 €)', betrag: 1450 },
  { value: 'minderj_ohne', label: 'Minderj. Kind, nicht erwerbstätig (1.200 €)', betrag: 1200 },
  { value: 'volljaehrig', label: 'Volljähriges Kind (1.750 €)', betrag: 1750 },
];

export const tool: Tool = {
  slug: 'unterhalt-selbstbehalt-rechner',
  category: 'familie',
  title: 'Unterhalt-Selbstbehalt-Check (Näherung)',
  shortTitle: 'Selbstbehalt-Check',
  description:
    'Prüfe, ob nach Zahlung von Kindesunterhalt dein Selbstbehalt nach Düsseldorfer Tabelle gewahrt bleibt, und sieh den maximal leistbaren Unterhalt. Näherung (Stand 2026).',
  keywords: [
    'selbstbehalt rechner',
    'selbstbehalt unterhalt 2026',
    'unterhalt selbstbehalt berechnen',
    'eigenbedarf unterhalt',
    'düsseldorfer tabelle selbstbehalt',
    'wie viel unterhalt leistbar',
  ],
  intro:
    'Wer Unterhalt zahlt, muss nicht den letzten Euro abgeben: Ein Selbstbehalt (Eigenbedarf) bleibt geschützt. Die Düsseldorfer Tabelle nennt dafür Richtwerte – gegenüber minderjährigen Kindern 1.450 € (erwerbstätig) bzw. 1.200 € (nicht erwerbstätig), gegenüber volljährigen Kindern 1.750 € (Stand 2026). Dieser Rechner prüft, ob nach dem geplanten Unterhalt der Selbstbehalt gewahrt bleibt, und zeigt, wie viel Unterhalt höchstens leistbar wäre. Hinweis: vereinfachte Näherung, keine Rechtsberatung – Wohnkosten und Einzelfälle können abweichen.',
  formula:
    'Verbleibend = bereinigtes Netto − Unterhalt; gewahrt, wenn Verbleibend ≥ Selbstbehalt; max. Unterhalt = Netto − Selbstbehalt',
  inputs: [
    { type: 'number', id: 'netto', label: 'Bereinigtes Nettoeinkommen', unit: '€/Monat', default: 2500, min: 0, max: 20000, step: 50, help: 'Netto nach berücksichtigungsfähigen Abzügen' },
    { type: 'number', id: 'unterhalt', label: 'Geplanter Unterhalt', unit: '€/Monat', default: 500, min: 0, max: 10000, step: 10 },
    {
      type: 'select', id: 'fall', label: 'Selbstbehalt (Fallgruppe)', default: 'minderj_erwerb',
      options: SELBSTBEHALT.map((s) => ({ value: s.value, label: s.label })),
    },
  ],
  compute: (v) => {
    const netto = Math.max(0, num(v.netto, 2500));
    const unterhalt = Math.max(0, num(v.unterhalt, 500));
    const fall = SELBSTBEHALT.find((s) => s.value === String(v.fall)) ?? SELBSTBEHALT[0];
    const verbleibend = netto - unterhalt;
    const gewahrt = verbleibend >= fall.betrag;
    const maxUnterhalt = Math.max(0, netto - fall.betrag);
    return [
      { label: 'Selbstbehalt gewahrt', value: gewahrt ? 'ja' : 'nein', primary: true, help: gewahrt ? 'Eigenbedarf bleibt geschützt' : 'Unterhalt würde Selbstbehalt unterschreiten' },
      { label: 'Verbleibend nach Unterhalt', value: verbleibend, unit: '€', digits: 2 },
      { label: 'Anzusetzender Selbstbehalt', value: fall.betrag, unit: '€', digits: 0 },
      { label: 'Maximal leistbarer Unterhalt', value: maxUnterhalt, unit: '€', digits: 2 },
      { label: 'Differenz zum Selbstbehalt', value: verbleibend - fall.betrag, unit: '€', digits: 2 },
    ];
  },
  howto: [
    'Bereinigtes Nettoeinkommen eingeben (nach berücksichtigungsfähigen Abzügen).',
    'Geplanten monatlichen Unterhalt eintragen.',
    'Passende Fallgruppe für den Selbstbehalt wählen.',
    'Ablesen, ob der Selbstbehalt gewahrt bleibt und wie viel Unterhalt höchstens leistbar ist.',
  ],
  faq: [
    { q: 'Was ist der Selbstbehalt?', a: 'Der Betrag, der dem Unterhaltspflichtigen für den eigenen Lebensunterhalt mindestens verbleiben muss. Er wird vor dem Unterhalt geschützt.' },
    { q: 'Wie hoch ist der Selbstbehalt 2026?', a: 'Gegenüber minderjährigen Kindern 1.450 € für Erwerbstätige bzw. 1.200 € für Nicht-Erwerbstätige, gegenüber volljährigen Kindern 1.750 € (Düsseldorfer Tabelle, Stand 2026). Die Werte werden regelmäßig angepasst.' },
    { q: 'Was bedeutet "bereinigtes Netto"?', a: 'Das Nettoeinkommen nach Abzug berücksichtigungsfähiger Posten wie berufsbedingter Aufwendungen oder bestimmter Verbindlichkeiten. Die genaue Bereinigung ist Einzelfallsache.' },
    { q: 'Ersetzt der Rechner eine Beratung?', a: 'Nein. Es ist eine vereinfachte Näherung (Stand 2026). Die Höhe von Selbstbehalt und Unterhalt hängt vom Einzelfall ab – etwa von Wohnkosten und Rangfolge. Für Verbindliches eine Beratungsstelle oder Fachanwältin hinzuziehen.' },
  ],
  related: ['kindesunterhalt-rechner', 'volljaehrigenunterhalt-rechner', 'trennungsunterhalt-rechner', 'wechselmodell-unterhalt-rechner'],
  examples: [
    {
      values: { netto: 2500, unterhalt: 500, fall: 'minderj_erwerb' },
      expect: [
        { label: 'Verbleibend nach Unterhalt', value: 2000, tolerance: 0.01 },
        { label: 'Maximal leistbarer Unterhalt', value: 1050, tolerance: 0.01 },
        { label: 'Differenz zum Selbstbehalt', value: 550, tolerance: 0.01 },
      ],
    },
    {
      values: { netto: 1600, unterhalt: 400, fall: 'minderj_erwerb' },
      expect: [
        { label: 'Verbleibend nach Unterhalt', value: 1200, tolerance: 0.01 },
        { label: 'Maximal leistbarer Unterhalt', value: 150, tolerance: 0.01 },
      ],
    },
  ],
  updated: '2026-06-19',
};
