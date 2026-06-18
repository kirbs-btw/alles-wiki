import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

// Persönliche Freibeträge nach § 16 ErbStG (Stand 2026)
function freibetrag(verhaeltnis: string): number {
  switch (verhaeltnis) {
    case 'ehegatte': return 500000;
    case 'kind': return 400000;
    case 'enkel': return 200000;
    case 'elternErbfall': return 100000; // Eltern/Großeltern beim Erwerb von Todes wegen
    case 'steuerklasse2': return 20000; // Geschwister, Nichten/Neffen, Schwiegerkinder
    case 'steuerklasse3': return 20000; // übrige Erwerber
    default: return 400000;
  }
}

function steuerklasse(verhaeltnis: string): 1 | 2 | 3 {
  if (['ehegatte', 'kind', 'enkel', 'elternErbfall'].includes(verhaeltnis)) return 1;
  if (verhaeltnis === 'steuerklasse2') return 2;
  return 3;
}

// Steuersätze § 19 ErbStG je steuerpflichtigem Erwerb und Steuerklasse (Stand 2026)
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
  slug: 'erbschaftssteuer-rechner',
  category: 'recht',
  title: 'Erbschaftssteuer-Rechner (Freibetrag & Steuerklasse)',
  shortTitle: 'Erbschaftssteuer',
  description:
    'Schätze die Erbschaftssteuer aus Erbschaftswert und Verwandtschaftsgrad: persönlicher Freibetrag und Steuersatz nach Steuerklasse (ErbStG, Stand 2026).',
  keywords: [
    'erbschaftssteuer rechner',
    'erbschaftssteuer freibetrag',
    'erbschaftssteuer berechnen',
    'erbschaftssteuer steuerklasse',
    'freibetrag erbschaft',
    'erbschaftsteuer satz',
  ],
  formula: 'Steuer = (Erbschaftswert − Freibetrag) × Steuersatz (je Steuerklasse, § 19 ErbStG)',
  inputs: [
    { type: 'number', id: 'wert', label: 'Wert der Erbschaft', unit: '€', default: 600000, min: 0, step: 1000, help: 'Steuerpflichtiger Wert des Erwerbs (nach Abzug von Nachlassverbindlichkeiten).' },
    {
      type: 'select', id: 'verhaeltnis', label: 'Verhältnis zum Erblasser', default: 'kind',
      options: [
        { value: 'ehegatte', label: 'Ehegatte / eingetr. Lebenspartner (500.000 €)' },
        { value: 'kind', label: 'Kind / Stiefkind (400.000 €)' },
        { value: 'enkel', label: 'Enkel (200.000 €)' },
        { value: 'elternErbfall', label: 'Eltern / Großeltern (100.000 €)' },
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
      { label: 'Erbschaftssteuer', value: steuer, unit: '€', digits: 2, primary: true },
      { label: 'Persönlicher Freibetrag', value: fb, unit: '€', digits: 0 },
      { label: 'Steuerpflichtiger Erwerb', value: stpflErwerb, unit: '€', digits: 2 },
      { label: 'Steuersatz', value: satz, unit: '%', digits: 0 },
      { label: 'Steuerklasse', value: kl, digits: 0 },
    ];
  },
  intro:
    'Bei einer Erbschaft fällt erst dann Steuer an, wenn der Erwerb den persönlichen Freibetrag übersteigt. Freibetrag und Steuersatz hängen vom Verwandtschaftsgrad (Steuerklasse) ab. Dieser Rechner liefert eine vereinfachte Orientierung nach dem ErbStG (Stand 2026) und berücksichtigt keine Versorgungsfreibeträge, Bewertungsabschläge oder den Härteausgleich. Für die verbindliche Berechnung ist eine steuerliche Beratung sinnvoll.',
  howto: [
    'Steuerpflichtigen Wert der Erbschaft eingeben.',
    'Verwandtschaftsverhältnis zum Erblasser wählen.',
    'Freibetrag, Steuersatz und voraussichtliche Steuer ablesen.',
  ],
  faq: [
    { q: 'Wie hoch ist der Freibetrag für Kinder?', a: 'Kinder und Stiefkinder haben einen persönlichen Freibetrag von 400.000 € je Elternteil (§ 16 ErbStG). Ehegatten steht ein Freibetrag von 500.000 € zu.' },
    { q: 'Was ist die Steuerklasse?', a: 'Die erbschaftsteuerliche Steuerklasse (I bis III) richtet sich nach dem Verwandtschaftsgrad und bestimmt den Steuersatz. Sie ist nicht mit der lohnsteuerlichen Steuerklasse identisch.' },
    { q: 'Gilt der Freibetrag pro Erbe?', a: 'Ja, jeder Erwerber hat seinen eigenen persönlichen Freibetrag. Er kann alle zehn Jahre erneut genutzt werden, auch bei Schenkungen zu Lebzeiten.' },
    { q: 'Sind weitere Freibeträge möglich?', a: 'Ja. Für Ehegatten und Kinder gibt es zusätzlich Versorgungsfreibeträge, und das selbst genutzte Familienheim kann unter Bedingungen steuerfrei bleiben. Diese sind hier nicht berücksichtigt.' },
  ],
  related: ['schenkungssteuer-rechner', 'pflichtteil-rechner', 'gesetzliche-erbfolge-rechner'],
  examples: [
    {
      values: { wert: 600000, verhaeltnis: 'kind' },
      expect: [
        { label: 'Steuerpflichtiger Erwerb', value: 200000, tolerance: 0.5 },
        { label: 'Steuersatz', value: 11, tolerance: 0.01 },
        { label: 'Erbschaftssteuer', value: 22000, tolerance: 0.5 },
      ],
    },
    {
      values: { wert: 100000, verhaeltnis: 'steuerklasse3' },
      expect: [
        { label: 'Steuerpflichtiger Erwerb', value: 80000, tolerance: 0.5 },
        { label: 'Erbschaftssteuer', value: 24000, tolerance: 0.5 },
      ],
    },
  ],
  updated: '2026-06-18',
};
