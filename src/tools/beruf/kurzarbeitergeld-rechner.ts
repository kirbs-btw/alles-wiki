import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'kurzarbeitergeld-rechner',
  category: 'beruf',
  title: 'Kurzarbeitergeld-Rechner (Näherung)',
  shortTitle: 'Kurzarbeitergeld',
  description:
    'Schätze dein Kurzarbeitergeld: 60 % bzw. 67 % der Netto-Entgeltdifferenz zwischen Soll- und Ist-Lohn während der Kurzarbeit.',
  keywords: [
    'kurzarbeitergeld rechner',
    'kug berechnen',
    'kurzarbeit netto rechner',
    'kurzarbeitergeld 60 67 prozent',
    'entgeltausfall kurzarbeit',
    'kug höhe schätzen',
  ],
  formula:
    'KUG ≈ Leistungssatz × (Netto-Sollentgelt − Netto-Istentgelt)  (60 % bzw. 67 % mit Kind)',
  inputs: [
    { type: 'number', id: 'nettoSoll', label: 'Pauschaliertes Netto ohne Kurzarbeit', unit: '€', default: 2000, min: 0, step: 50, help: 'Rechnerisches Nettoentgelt bei voller Arbeit (Sollentgelt).' },
    { type: 'number', id: 'nettoIst', label: 'Pauschaliertes Netto während Kurzarbeit', unit: '€', default: 1000, min: 0, step: 50, help: 'Rechnerisches Nettoentgelt des tatsächlich gearbeiteten Anteils (Istentgelt).' },
    {
      type: 'select', id: 'satz', label: 'Leistungssatz', default: '60',
      options: [
        { value: '60', label: '60 % (ohne Kind im Haushalt)' },
        { value: '67', label: '67 % (mit mindestens einem Kind)' },
      ],
      help: 'Der erhöhte Satz von 67 % gilt, wenn mindestens ein Kind zu berücksichtigen ist.',
    },
  ],
  compute: (v) => {
    const nettoSoll = num(v.nettoSoll);
    const nettoIst = num(v.nettoIst);
    const satz = num(v.satz) / 100;

    const differenz = Math.max(nettoSoll - nettoIst, 0);
    const kug = differenz * satz;
    const gesamt = nettoIst + kug;
    const verlust = Math.max(nettoSoll - gesamt, 0);

    return [
      { label: 'Kurzarbeitergeld (Näherung)', value: kug, unit: '€', digits: 2, primary: true },
      { label: 'Netto-Entgeltausfall', value: differenz, unit: '€', digits: 2 },
      { label: 'Gesamt im Monat (Ist + KUG)', value: gesamt, unit: '€', digits: 2 },
      { label: 'Verbleibender Einkommensverlust', value: verlust, unit: '€', digits: 2 },
    ];
  },
  intro:
    'Kurzarbeitergeld (KUG) gleicht einen Teil des Verdienstausfalls bei Kurzarbeit aus. Es beträgt rund 60 % der Netto-Entgeltdifferenz zwischen dem Lohn ohne und mit Kurzarbeit, mit Kind im Haushalt 67 %. Die amtliche Berechnung nutzt pauschalierte Nettoentgelte aus einer Tabelle der Bundesagentur für Arbeit; dieser Rechner ist daher eine Orientierungshilfe und ersetzt keine offizielle Berechnung.',
  howto: [
    'Trage dein rechnerisches Nettoentgelt ohne Kurzarbeit ein (Sollentgelt).',
    'Gib das Nettoentgelt des tatsächlich gearbeiteten Anteils ein (Istentgelt).',
    'Wähle den Leistungssatz (60 % oder 67 % mit Kind).',
    'Lies das geschätzte Kurzarbeitergeld und den verbleibenden Verlust ab.',
  ],
  faq: [
    { q: 'Wie hoch ist das Kurzarbeitergeld?', a: 'Es beträgt grundsätzlich 60 % der pauschalierten Netto-Entgeltdifferenz, mit mindestens einem Kind im Haushalt 67 %.' },
    { q: 'Warum ist das nur eine Näherung?', a: 'Die Agentur für Arbeit rechnet mit pauschalierten Nettobeträgen aus einer amtlichen Tabelle und berücksichtigt Steuerklasse und Freibeträge. Reale Werte können daher abweichen.' },
    { q: 'Ist das Kurzarbeitergeld steuerfrei?', a: 'Das KUG selbst ist steuerfrei, unterliegt aber dem Progressionsvorbehalt und kann so den Steuersatz auf das übrige Einkommen erhöhen.' },
    { q: 'Was ist das Sollentgelt?', a: 'Das Sollentgelt ist das Brutto-/Nettoentgelt, das du ohne den Arbeitsausfall in dem Monat erzielt hättest – also die Basis für den Vergleich.' },
  ],
  related: ['lohnfortzahlung-rechner', 'teilzeit-gehalt-rechner', 'jahresgehalt-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { nettoSoll: 2000, nettoIst: 1000, satz: '60' },
      expect: [
        { label: 'Netto-Entgeltausfall', value: 1000, tolerance: 0.01 },
        { label: 'Kurzarbeitergeld (Näherung)', value: 600, tolerance: 0.01 },
        { label: 'Gesamt im Monat (Ist + KUG)', value: 1600, tolerance: 0.01 },
      ],
    },
    {
      values: { nettoSoll: 2400, nettoIst: 1200, satz: '67' },
      expect: [
        { label: 'Kurzarbeitergeld (Näherung)', value: 804, tolerance: 0.01 },
        { label: 'Verbleibender Einkommensverlust', value: 396, tolerance: 0.01 },
      ],
    },
  ],
};
