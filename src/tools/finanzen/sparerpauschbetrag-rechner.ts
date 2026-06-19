import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'sparerpauschbetrag-rechner',
  category: 'finanzen',
  title: 'Sparerpauschbetrag-Rechner',
  shortTitle: 'Sparerpauschbetrag',
  description:
    'Berechne, wie viel deines Sparerpauschbetrags du nutzt, welcher Rest frei bleibt und wie viel Abgeltungsteuer du auf darüber hinausgehende Kapitalerträge zahlst.',
  keywords: [
    'sparerpauschbetrag rechner',
    'freistellungsauftrag rechner',
    'sparerpauschbetrag ausnutzen',
    'kapitalerträge steuerfrei rechner',
    'abgeltungsteuer freibetrag',
  ],
  formula: 'Steuerpflichtig = max(0; Kapitalerträge − Pauschbetrag); Steuer = Steuerpflichtig × 26,375 % (inkl. Soli)',
  inputs: [
    { type: 'number', id: 'ertraege', label: 'Kapitalerträge im Jahr', unit: '€', default: 600, min: 0, step: 50, help: 'Zinsen, Dividenden, Kursgewinne usw.' },
    { type: 'select', id: 'status', label: 'Veranlagung', default: '1000', options: [
      { value: '1000', label: 'Einzelperson (1.000 €)' },
      { value: '2000', label: 'Ehepaar / zusammen veranlagt (2.000 €)' },
    ], help: 'Sparerpauschbetrag ab 2023 (Stand 2026).' },
    { type: 'number', id: 'kirchensteuer', label: 'Kirchensteuersatz', unit: '%', default: 0, min: 0, max: 9, step: 1, help: '0 = keine Kirchensteuer, sonst 8 oder 9 %.' },
  ],
  compute: (v) => {
    const ertraege = num(v.ertraege);
    const pauschbetrag = num(v.status);
    const kist = num(v.kirchensteuer);
    const genutzt = Math.min(ertraege, pauschbetrag);
    const restFrei = Math.max(0, pauschbetrag - ertraege);
    const steuerpflichtig = Math.max(0, ertraege - pauschbetrag);
    // Abgeltungsteuer 25 % + 5,5 % Soli darauf; bei Kirchensteuer leicht reduzierter Abgeltungsatz.
    const abgelt = 25;
    const soli = abgelt * 0.055;
    const kirche = abgelt * (kist / 100);
    const satz = abgelt + soli + kirche;
    const steuer = steuerpflichtig * (satz / 100);
    return [
      { label: 'Zu zahlende Steuer', value: steuer, unit: '€', digits: 2, primary: true },
      { label: 'Steuerpflichtiger Anteil', value: steuerpflichtig, unit: '€', digits: 2 },
      { label: 'Pauschbetrag genutzt', value: genutzt, unit: '€', digits: 2 },
      { label: 'Pauschbetrag ungenutzt', value: restFrei, unit: '€', digits: 2, help: 'Noch frei für weitere Erträge.' },
      { label: 'Effektiver Steuersatz', value: satz, unit: '%', digits: 3 },
    ];
  },
  intro:
    'Kapitalerträge wie Zinsen, Dividenden und Kursgewinne bleiben bis zum Sparerpauschbetrag steuerfrei: 1.000 € pro Person, 2.000 € bei zusammenveranlagten Ehepaaren (Stand 2026). Erst darüber fällt Abgeltungsteuer (25 % zzgl. Solidaritätszuschlag, ggf. Kirchensteuer) an. Mit einem Freistellungsauftrag bei deiner Bank stellst du sicher, dass der Pauschbetrag automatisch berücksichtigt wird. Dieser Rechner zeigt, wie viel du nutzt und was du zahlst.',
  howto: [
    'Trage deine erwarteten Kapitalerträge des Jahres ein.',
    'Wähle, ob du einzeln oder als Ehepaar veranlagt bist.',
    'Gib deinen Kirchensteuersatz an (0, 8 oder 9 %).',
    'Lies ab, wie viel Freibetrag genutzt wird und welche Steuer auf den Rest anfällt.',
  ],
  faq: [
    { q: 'Wie hoch ist der Sparerpauschbetrag 2026?', a: 'Er beträgt 1.000 € pro Person und 2.000 € für zusammenveranlagte Ehepaare. Bis zu diesem Betrag bleiben Kapitalerträge steuerfrei. (Stand 2026, Orientierungswert.)' },
    { q: 'Was ist ein Freistellungsauftrag?', a: 'Damit weist du deine Bank an, Kapitalerträge bis zum Pauschbetrag steuerfrei auszuzahlen. Du kannst den Betrag auf mehrere Banken aufteilen, insgesamt aber nicht über dem Pauschbetrag.' },
    { q: 'Wie hoch ist die Steuer über dem Freibetrag?', a: 'Auf den übersteigenden Teil fallen 25 % Abgeltungsteuer plus 5,5 % Solidaritätszuschlag darauf an – effektiv 26,375 %, mit Kirchensteuer etwas mehr. Dieser Rechner liefert eine Orientierung, keine Steuerberatung.' },
  ],
  related: ['abgeltungsteuer-rechner', 'dividendenrendite-rechner', 'kursgewinn-rechner'],
  examples: [
    {
      values: { ertraege: 1500, status: '1000', kirchensteuer: 0 },
      expect: [
        { label: 'Zu zahlende Steuer', value: 131.875, tolerance: 0.01 },
        { label: 'Steuerpflichtiger Anteil', value: 500, tolerance: 0 },
        { label: 'Pauschbetrag genutzt', value: 1000, tolerance: 0 },
        { label: 'Pauschbetrag ungenutzt', value: 0, tolerance: 0 },
      ],
    },
    {
      values: { ertraege: 600, status: '1000', kirchensteuer: 0 },
      expect: [
        { label: 'Zu zahlende Steuer', value: 0, tolerance: 0 },
        { label: 'Pauschbetrag ungenutzt', value: 400, tolerance: 0 },
      ],
    },
  ],
  updated: '2026-06-19',
};
