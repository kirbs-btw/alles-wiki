import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'abgeltungsteuer-rechner',
  category: 'finanzen',
  title: 'Abgeltungsteuer-Rechner',
  shortTitle: 'Abgeltungsteuer',
  description:
    'Berechne die Steuer auf Kapitalerträge: 25 % Abgeltungsteuer plus 5,5 % Solidaritätszuschlag und optional Kirchensteuer – nach Sparer-Pauschbetrag.',
  keywords: [
    'abgeltungsteuer rechner',
    'kapitalertragsteuer berechnen',
    'steuer auf kapitalerträge',
    'abgeltungssteuer 25 prozent',
    'sparerpauschbetrag rechner',
    'steuer aktiengewinn',
  ],
  formula: 'Steuer = max(0; Ertrag − Freibetrag) × 0,25 × (1 + 0,055 + Kirchensteuersatz)',
  inputs: [
    { type: 'number', id: 'ertrag', label: 'Kapitalerträge', unit: '€', default: 5000, min: 0, step: 100, help: 'Zinsen, Dividenden und realisierte Kursgewinne.' },
    { type: 'number', id: 'freibetrag', label: 'Sparer-Pauschbetrag', unit: '€', default: 1000, min: 0, step: 1, help: 'Noch nicht ausgeschöpfter Freibetrag (1000 € pro Person, 2000 € bei Zusammenveranlagung).' },
    {
      type: 'select', id: 'kirche', label: 'Kirchensteuer', default: '0',
      options: [
        { value: '0', label: 'keine' },
        { value: '8', label: '8 % (Bayern, Baden-Württemberg)' },
        { value: '9', label: '9 % (übrige Bundesländer)' },
      ],
      help: 'Die Kirchensteuer wird auf die Abgeltungsteuer erhoben.',
    },
  ],
  compute: (v) => {
    const ertrag = num(v.ertrag);
    const freibetrag = num(v.freibetrag);
    const kiSatz = num(v.kirche) / 100;
    const stpflichtig = Math.max(0, ertrag - freibetrag);
    const abgeltung = stpflichtig * 0.25;
    const soli = abgeltung * 0.055;
    const kirche = abgeltung * kiSatz;
    const gesamt = abgeltung + soli + kirche;
    const netto = ertrag - gesamt;
    const effektiv = ertrag > 0 ? gesamt / ertrag * 100 : 0;
    return [
      { label: 'Steuer gesamt', value: gesamt, unit: '€', digits: 2, primary: true },
      { label: 'Abgeltungsteuer (25 %)', value: abgeltung, unit: '€', digits: 2 },
      { label: 'Solidaritätszuschlag', value: soli, unit: '€', digits: 2 },
      { label: 'Kirchensteuer', value: kirche, unit: '€', digits: 2 },
      { label: 'Netto-Ertrag', value: netto, unit: '€', digits: 2 },
      { label: 'Effektive Belastung', value: effektiv, unit: '%', digits: 2 },
    ];
  },
  intro:
    'Auf Kapitalerträge wie Zinsen, Dividenden und realisierte Kursgewinne fällt in Deutschland die Abgeltungsteuer von 25 % an, zuzüglich 5,5 % Solidaritätszuschlag und gegebenenfalls Kirchensteuer. Bis zum Sparer-Pauschbetrag bleiben Erträge steuerfrei. Dieser Rechner liefert eine Orientierung; maßgeblich ist dein Steuerbescheid.',
  howto: [
    'Gib deine gesamten Kapitalerträge des Jahres ein.',
    'Trage den noch verfügbaren Sparer-Pauschbetrag ein (1000 € pro Person).',
    'Wähle, ob und in welcher Höhe Kirchensteuer anfällt.',
    'Lies die Steuerlast und den Netto-Ertrag ab.',
  ],
  faq: [
    { q: 'Wie hoch ist die Abgeltungsteuer?', a: 'Sie beträgt pauschal 25 % auf Kapitalerträge. Hinzu kommen 5,5 % Solidaritätszuschlag auf die Steuer sowie ggf. 8 oder 9 % Kirchensteuer.' },
    { q: 'Was ist der Sparer-Pauschbetrag?', a: 'Ein jährlicher Freibetrag für Kapitalerträge. Er beträgt 1000 Euro pro Person bzw. 2000 Euro bei zusammenveranlagten Ehepaaren. Erst darüber wird besteuert.' },
    { q: 'Ist die Kirchensteuer absetzbar?', a: 'Bei der Abgeltungsteuer mindert die Kirchensteuer die Bemessungsgrundlage geringfügig. Dieser Rechner rechnet vereinfacht ohne diese Minderung und liefert eine Orientierung.' },
    { q: 'Gilt das auch bei niedrigem Einkommen?', a: 'Liegt dein persönlicher Steuersatz unter 25 %, kannst du über die Günstigerprüfung in der Steuererklärung eine Erstattung erhalten.' },
  ],
  related: ['kursgewinn-rechner', 'dividendenrendite-rechner', 'rendite-rechner'],
  examples: [
    {
      values: { ertrag: 5000, freibetrag: 1000, kirche: '0' },
      expect: [
        { label: 'Abgeltungsteuer (25 %)', value: 1000, tolerance: 0.01 },
        { label: 'Solidaritätszuschlag', value: 55, tolerance: 0.01 },
        { label: 'Steuer gesamt', value: 1055, tolerance: 0.01 },
        { label: 'Netto-Ertrag', value: 3945, tolerance: 0.01 },
      ],
    },
    {
      values: { ertrag: 5000, freibetrag: 1000, kirche: '9' },
      expect: [{ label: 'Steuer gesamt', value: 1145, tolerance: 0.01 }],
    },
  ],
  updated: '2026-06-18',
};
