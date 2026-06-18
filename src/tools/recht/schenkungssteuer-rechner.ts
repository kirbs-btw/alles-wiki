import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

// Persönliche Freibeträge nach § 16 ErbStG (gelten auch für Schenkungen, Stand 2026)
function freibetrag(verhaeltnis: string): number {
  switch (verhaeltnis) {
    case 'ehegatte': return 500000;
    case 'kind': return 400000;
    case 'enkel': return 200000;
    case 'elternSchenkung': return 20000; // Eltern bei Schenkung -> Steuerklasse II
    case 'steuerklasse2': return 20000;
    case 'steuerklasse3': return 20000;
    default: return 400000;
  }
}

function steuerklasse(verhaeltnis: string): 1 | 2 | 3 {
  if (['ehegatte', 'kind', 'enkel'].includes(verhaeltnis)) return 1;
  if (['elternSchenkung', 'steuerklasse2'].includes(verhaeltnis)) return 2;
  return 3;
}

// Steuersätze § 19 ErbStG (Stand 2026)
function steuersatz(stpflErwerb: number, kl: 1 | 2 | 3): number {
  const stufen: { bis: number; s1: number; s2: number; s3: number }[] = [
    { bis: 75000, s1: 7, s2: 15, s3: 30 },
    { bis: 300000, s1: 11, s2: 20, s3: 30 },
    { bis: 600000, s1: 15, s2: 25, s3: 30 },
    { bis: 6000000, s1: 19, s2: 30, s3: 30 },
    { bis: 13000000, s1: 23, s2: 35, s3: 50 },
    { bis: 26000000, s1: 27, s2: 40, s3: 50 },
    { bis: Infinity, s1: 30, s2: 43, s3: 50 },
  ];
  for (const st of stufen) {
    if (stpflErwerb <= st.bis) {
      return kl === 1 ? st.s1 : kl === 2 ? st.s2 : st.s3;
    }
  }
  return 30;
}

export const tool: Tool = {
  slug: 'schenkungssteuer-rechner',
  category: 'recht',
  title: 'Schenkungssteuer-Rechner (Freibetrag & Steuersatz)',
  shortTitle: 'Schenkungssteuer',
  description:
    'Berechne die Schenkungssteuer aus dem Schenkungswert und dem Verwandtschaftsgrad: 10-Jahres-Freibetrag und Steuersatz nach Steuerklasse (ErbStG, Stand 2026).',
  keywords: [
    'schenkungssteuer rechner',
    'schenkungssteuer freibetrag',
    'schenkung steuer berechnen',
    'freibetrag schenkung 10 jahre',
    'schenkungssteuer kind',
    'schenkungssteuersatz',
  ],
  formula: 'Steuer = (Schenkungswert − Freibetrag) × Steuersatz (§ 19 ErbStG)',
  inputs: [
    { type: 'number', id: 'wert', label: 'Wert der Schenkung', unit: '€', default: 500000, min: 0, step: 1000, help: 'Wert der unentgeltlichen Zuwendung innerhalb von 10 Jahren.' },
    {
      type: 'select', id: 'verhaeltnis', label: 'Verhältnis zum Schenker', default: 'kind',
      options: [
        { value: 'ehegatte', label: 'Ehegatte / eingetr. Lebenspartner (500.000 €)' },
        { value: 'kind', label: 'Kind / Stiefkind (400.000 €)' },
        { value: 'enkel', label: 'Enkel (200.000 €)' },
        { value: 'elternSchenkung', label: 'Eltern / Großeltern (20.000 €)' },
        { value: 'steuerklasse2', label: 'Geschwister, Nichte/Neffe (20.000 €)' },
        { value: 'steuerklasse3', label: 'Übrige / nicht verwandt (20.000 €)' },
      ],
    },
  ],
  compute: (v) => {
    const wert = num(v.wert);
    const verhaeltnis = String(v.verhaeltnis);
    const fb = freibetrag(verhaeltnis);
    const kl = steuerklasse(verhaeltnis);
    const stpflErwerb = Math.max(0, wert - fb);
    const satz = steuersatz(stpflErwerb, kl);
    const steuer = stpflErwerb * (satz / 100);
    return [
      { label: 'Schenkungssteuer', value: steuer, unit: '€', digits: 2, primary: true },
      { label: 'Persönlicher Freibetrag', value: fb, unit: '€', digits: 0 },
      { label: 'Steuerpflichtiger Erwerb', value: stpflErwerb, unit: '€', digits: 2 },
      { label: 'Steuersatz', value: satz, unit: '%', digits: 0 },
      { label: 'Steuerklasse', value: kl, digits: 0 },
    ];
  },
  intro:
    'Schenkungen unterliegen der gleichen Steuer wie Erbschaften. Der persönliche Freibetrag kann alle zehn Jahre neu genutzt werden – wer früh und gestaffelt schenkt, kann die Steuer deutlich senken. Dieser Rechner liefert eine vereinfachte Orientierung nach dem ErbStG (Stand 2026) und berücksichtigt keine Sonderfälle wie Nießbrauchabzug oder Begünstigungen für Betriebsvermögen.',
  howto: [
    'Wert der Schenkung eingeben.',
    'Verwandtschaftsverhältnis zum Schenker wählen.',
    'Freibetrag, Steuersatz und voraussichtliche Steuer ablesen.',
  ],
  faq: [
    { q: 'Wie oft gilt der Freibetrag?', a: 'Der persönliche Freibetrag steht alle zehn Jahre erneut zur Verfügung. Schenkungen innerhalb von zehn Jahren werden zusammengerechnet.' },
    { q: 'Unterscheidet sich der Freibetrag von der Erbschaft?', a: 'Die Beträge sind bei Schenkungen meist gleich. Eine Ausnahme bilden Eltern: Sie erhalten beim Erbfall 100.000 €, bei einer Schenkung dagegen nur 20.000 € (Steuerklasse II).' },
    { q: 'Wie spare ich Schenkungssteuer?', a: 'Durch zeitlich gestaffelte Schenkungen alle zehn Jahre lässt sich der Freibetrag mehrfach nutzen. Auch die Übertragung gegen Nießbrauchvorbehalt kann die Bemessungsgrundlage senken.' },
    { q: 'Muss jede Schenkung gemeldet werden?', a: 'Eine Schenkung ist dem Finanzamt grundsätzlich innerhalb von drei Monaten anzuzeigen. Auch steuerfreie Zuwendungen unterhalb des Freibetrags können meldepflichtig sein.' },
  ],
  related: ['erbschaftssteuer-rechner', 'pflichtteil-rechner'],
  examples: [
    {
      values: { wert: 500000, verhaeltnis: 'kind' },
      expect: [
        { label: 'Steuerpflichtiger Erwerb', value: 100000, tolerance: 0.5 },
        { label: 'Steuersatz', value: 11, tolerance: 0.01 },
        { label: 'Schenkungssteuer', value: 11000, tolerance: 0.5 },
      ],
    },
    {
      values: { wert: 70000, verhaeltnis: 'steuerklasse2' },
      expect: [
        { label: 'Steuerpflichtiger Erwerb', value: 50000, tolerance: 0.5 },
        { label: 'Schenkungssteuer', value: 7500, tolerance: 0.5 },
      ],
    },
  ],
  updated: '2026-06-18',
};
