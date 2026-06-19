import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

// Selbstbehalt-Näherung Elternunterhalt, Stand 2026 (Düsseldorfer Tabelle, gerundet).
const SELBSTBEHALT_ALLEIN = 2650; // angemessener Selbstbehalt eines Kindes ggü. Eltern (Näherung)
const SELBSTBEHALT_PARTNER = 2475; // zusätzlicher Familienselbstbehalt für Ehegatten (Näherung)
const EINKOMMENSGRENZE = 100000; // Jahresbruttogrenze (§ 94 SGB XII, Angehörigen-Entlastungsgesetz)

export const tool: Tool = {
  slug: 'elternunterhalt-rechner',
  category: 'recht',
  title: 'Elternunterhalt-Rechner (Selbstbehalt, Orientierung)',
  shortTitle: 'Elternunterhalt',
  description:
    'Prüfe grob, ob du für Elternunterhalt herangezogen wirst: ab 100.000 € Jahresbrutto, und schätze den Beitrag aus Einkommen über dem Selbstbehalt. Orientierung, Stand 2026.',
  keywords: [
    'elternunterhalt rechner',
    'elternunterhalt selbstbehalt',
    'elternunterhalt 100000 euro',
    'elternunterhalt berechnen',
    'pflege eltern unterhalt einkommen',
    'angehörigen entlastungsgesetz',
  ],
  formula:
    'Pflicht erst ab 100.000 € Jahresbrutto. Beitrag (Näherung) = (bereinigtes Netto − Selbstbehalt) × 50 %',
  inputs: [
    {
      type: 'number',
      id: 'jahresbrutto',
      label: 'Eigenes Jahresbruttoeinkommen',
      unit: '€',
      default: 95000,
      min: 0,
      step: 1000,
      help: 'Maßgeblich ist das eigene Bruttoeinkommen des Kindes pro Jahr (§ 94 SGB XII).',
    },
    {
      type: 'number',
      id: 'netto',
      label: 'Bereinigtes monatliches Nettoeinkommen',
      unit: '€',
      default: 3500,
      min: 0,
      step: 50,
      help: 'Netto nach Abzug berücksichtigungsfähiger Belastungen (z. B. Altersvorsorge, Kredite).',
    },
    {
      type: 'select',
      id: 'familienstand',
      label: 'Familienstand',
      default: 'allein',
      options: [
        { value: 'allein', label: 'alleinstehend' },
        { value: 'verheiratet', label: 'verheiratet (Familienselbstbehalt)' },
      ],
    },
  ],
  compute: (v) => {
    const jahresbrutto = Math.max(0, num(v.jahresbrutto));
    const netto = Math.max(0, num(v.netto));
    const verheiratet = String(v.familienstand) === 'verheiratet';

    // Schritt 1: Einkommensgrenze (Angehörigen-Entlastungsgesetz).
    if (jahresbrutto < EINKOMMENSGRENZE) {
      return [
        { label: 'Voraussichtlicher Monatsbeitrag', value: 0, unit: '€', digits: 2, primary: true },
        { label: 'Ergebnis', value: 'Unter 100.000 € Jahresbrutto – kein Elternunterhalt' },
        { label: 'Maßgeblicher Selbstbehalt', value: verheiratet ? SELBSTBEHALT_ALLEIN + SELBSTBEHALT_PARTNER : SELBSTBEHALT_ALLEIN, unit: '€', digits: 0 },
        { label: 'Über Selbstbehalt verfügbar', value: 0, unit: '€', digits: 2 },
      ];
    }

    // Schritt 2: Beitrag aus Einkommen über dem Selbstbehalt (Näherung: 50 % des Mehrbetrags).
    const selbstbehalt = verheiratet ? SELBSTBEHALT_ALLEIN + SELBSTBEHALT_PARTNER : SELBSTBEHALT_ALLEIN;
    const ueber = Math.max(0, netto - selbstbehalt);
    const beitrag = ueber * 0.5;

    return [
      { label: 'Voraussichtlicher Monatsbeitrag', value: beitrag, unit: '€', digits: 2, primary: true },
      { label: 'Ergebnis', value: 'Über 100.000 € Jahresbrutto – Elternunterhalt grundsätzlich möglich' },
      { label: 'Maßgeblicher Selbstbehalt', value: selbstbehalt, unit: '€', digits: 0 },
      { label: 'Über Selbstbehalt verfügbar', value: ueber, unit: '€', digits: 2 },
    ];
  },
  intro:
    'Seit dem Angehörigen-Entlastungsgesetz werden Kinder für den Unterhalt pflegebedürftiger Eltern nur herangezogen, wenn ihr eigenes Jahresbruttoeinkommen 100.000 € übersteigt (§ 94 Abs. 1a SGB XII). Liegt es darunter, entfällt der Rückgriff des Sozialamts. Erst oberhalb der Grenze wird aus dem bereinigten Netto, das den Selbstbehalt übersteigt, ein Beitrag berechnet – vereinfacht etwa die Hälfte des Mehrbetrags. Die Beträge sind Näherungswerte (Düsseldorfer Tabelle, Stand 2026). Der Rechner liefert eine grobe Orientierung und ersetzt keine Rechtsberatung.',
  howto: [
    'Eigenes Jahresbruttoeinkommen eintragen – darunter 100.000 € besteht keine Pflicht.',
    'Bereinigtes monatliches Netto eingeben.',
    'Familienstand wählen (beeinflusst den Selbstbehalt).',
    'Voraussichtlichen Monatsbeitrag und maßgeblichen Selbstbehalt ablesen.',
  ],
  faq: [
    {
      q: 'Ab wann muss ich für meine Eltern zahlen?',
      a: 'Erst wenn dein eigenes Jahresbruttoeinkommen 100.000 € übersteigt (§ 94 Abs. 1a SGB XII). Das gilt je Kind getrennt; das Einkommen des Ehegatten zählt dafür nicht mit.',
    },
    {
      q: 'Wie hoch ist der Selbstbehalt?',
      a: 'Beim Elternunterhalt ist der Selbstbehalt deutlich höher als beim Kindesunterhalt. Die Düsseldorfer Tabelle nennt Anhaltswerte; für Verheiratete kommt ein Familienselbstbehalt hinzu. Die hier genutzten Beträge sind Näherungen für 2026.',
    },
    {
      q: 'Wie wird der Beitrag berechnet?',
      a: 'Vereinfacht steht etwa die Hälfte des Einkommens oberhalb des Selbstbehalts zur Verfügung. Im Einzelfall fließen weitere Belastungen, Vermögen und eigene Altersvorsorge ein.',
    },
    {
      q: 'Ist die Berechnung verbindlich?',
      a: 'Nein. Sie ist eine grobe Orientierung. Der konkrete Anspruch wird vom Sozialamt bzw. Gericht individuell ermittelt – hol dir im Zweifel rechtlichen Rat.',
    },
  ],
  related: ['ehegattenunterhalt-rechner', 'trennungsunterhalt-rechner', 'pfaendungsfreibetrag-rechner'],
  examples: [
    {
      // Jahresbrutto 95.000 < 100.000 -> kein Unterhalt
      values: { jahresbrutto: 95000, netto: 3500, familienstand: 'allein' },
      expect: [
        { label: 'Voraussichtlicher Monatsbeitrag', value: 0, tolerance: 0.01 },
        { label: 'Maßgeblicher Selbstbehalt', value: 2650, tolerance: 0.5 },
        { label: 'Über Selbstbehalt verfügbar', value: 0, tolerance: 0.01 },
      ],
    },
    {
      // Jahresbrutto 120.000 >= 100.000, alleinstehend, Netto 3650
      // über Selbstbehalt = 3650 - 2650 = 1000; Beitrag = 500
      values: { jahresbrutto: 120000, netto: 3650, familienstand: 'allein' },
      expect: [
        { label: 'Voraussichtlicher Monatsbeitrag', value: 500, tolerance: 0.5 },
        { label: 'Maßgeblicher Selbstbehalt', value: 2650, tolerance: 0.5 },
        { label: 'Über Selbstbehalt verfügbar', value: 1000, tolerance: 0.5 },
      ],
    },
  ],
  updated: '2026-06-19',
};
