import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

// Pflegegeld bei häuslicher Pflege durch Angehörige nach Pflegegrad.
// Monatliche Beträge der Pflegeversicherung (Stand 2026, gerundete etablierte Werte).
// Pflegegrad 1 erhält kein Pflegegeld (nur Entlastungsbetrag).
// Bei Kombination mit Pflegesachleistungen (anteilige Nutzung) wird das Pflegegeld
// um den genutzten Sachleistungsanteil gekürzt (Kombinationsleistung).

const PFLEGEGELD: { value: string; label: string; betrag: number }[] = [
  { value: 'pg1', label: 'Pflegegrad 1', betrag: 0 },
  { value: 'pg2', label: 'Pflegegrad 2', betrag: 347 },
  { value: 'pg3', label: 'Pflegegrad 3', betrag: 599 },
  { value: 'pg4', label: 'Pflegegrad 4', betrag: 800 },
  { value: 'pg5', label: 'Pflegegrad 5', betrag: 990 },
];

export const tool: Tool = {
  slug: 'pflegegeld-rechner',
  category: 'familie',
  title: 'Pflegegeld-Rechner nach Pflegegrad',
  shortTitle: 'Pflegegeld',
  description:
    'Berechne das monatliche Pflegegeld nach Pflegegrad bei häuslicher Pflege durch Angehörige – mit Kürzung bei Kombinationsleistung (Stand 2026).',
  keywords: [
    'pflegegeld rechner',
    'pflegegeld pflegegrad',
    'pflegegeld 2026',
    'pflegegeld höhe',
    'pflegegeld angehörige',
    'kombinationsleistung pflege',
  ],
  intro:
    'Wer einen pflegebedürftigen Angehörigen zu Hause selbst pflegt, erhält Pflegegeld von der Pflegeversicherung – gestaffelt nach Pflegegrad. Pflegegrad 1 sieht kein Pflegegeld vor. Werden zusätzlich ambulante Pflegesachleistungen genutzt, kürzt sich das Pflegegeld um den genutzten Anteil (Kombinationsleistung). Die Beträge sind etablierte Orientierungswerte (Stand 2026).',
  formula: 'Pflegegeld = Grundbetrag(Pflegegrad) × (1 − genutzter Sachleistungsanteil)',
  inputs: [
    {
      type: 'select', id: 'grad', label: 'Pflegegrad', default: 'pg3',
      options: PFLEGEGELD.map((p) => ({ value: p.value, label: p.label })),
    },
    { type: 'number', id: 'sachanteil', label: 'Genutzter Sachleistungsanteil', unit: '%', default: 0, min: 0, max: 100, step: 5, help: '0 % = reines Pflegegeld, sonst Kombinationsleistung' },
  ],
  compute: (v) => {
    const grad = PFLEGEGELD.find((p) => p.value === String(v.grad)) ?? PFLEGEGELD[2];
    let anteil = num(v.sachanteil, 0);
    if (anteil < 0) anteil = 0;
    if (anteil > 100) anteil = 100;
    const pflegegeld = grad.betrag * (1 - anteil / 100);
    const jahr = pflegegeld * 12;
    return [
      { label: 'Pflegegeld pro Monat', value: pflegegeld, unit: '€', digits: 2, primary: true },
      { label: 'Grundbetrag Pflegegrad', value: grad.betrag, unit: '€', digits: 2 },
      { label: 'Pflegegeld pro Jahr', value: jahr, unit: '€', digits: 2 },
    ];
  },
  howto: [
    'Pflegegrad des pflegebedürftigen Menschen auswählen.',
    'Falls zusätzlich ein Pflegedienst genutzt wird: genutzten Sachleistungsanteil in Prozent eintragen.',
    'Das monatliche Pflegegeld ablesen.',
  ],
  faq: [
    { q: 'Wer bekommt Pflegegeld?', a: 'Pflegebedürftige ab Pflegegrad 2, die zu Hause von Angehörigen oder anderen Privatpersonen gepflegt werden. Das Geld geht an die pflegebedürftige Person und kann an die Pflegeperson weitergegeben werden.' },
    { q: 'Warum gibt es bei Pflegegrad 1 kein Pflegegeld?', a: 'Pflegegrad 1 erhält statt Pflegegeld nur den Entlastungsbetrag für niedrigschwellige Angebote.' },
    { q: 'Was ist die Kombinationsleistung?', a: 'Wer Pflegegeld und einen ambulanten Pflegedienst (Sachleistung) kombiniert, erhält das Pflegegeld anteilig gekürzt um den Prozentsatz der genutzten Sachleistung.' },
    { q: 'Sind die Werte verbindlich?', a: 'Es sind etablierte Orientierungswerte (Stand 2026). Maßgeblich ist der Bescheid der Pflegekasse.' },
  ],
  related: ['kosten-kind-rechner', 'familienbudget-rechner', 'betreuungskosten-rechner'],
  examples: [
    {
      values: { grad: 'pg3', sachanteil: 0 },
      expect: [
        { label: 'Pflegegeld pro Monat', value: 599, tolerance: 0.01 },
        { label: 'Pflegegeld pro Jahr', value: 7188, tolerance: 0.01 },
      ],
    },
    {
      values: { grad: 'pg4', sachanteil: 50 },
      expect: [{ label: 'Pflegegeld pro Monat', value: 400, tolerance: 0.01 }],
    },
  ],
  updated: '2026-06-18',
};
