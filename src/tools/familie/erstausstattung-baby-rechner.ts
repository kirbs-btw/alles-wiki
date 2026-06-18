import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

// Budgetrechner für die Baby-Erstausstattung. Aufgeschlüsselt nach
// Hauptkategorien mit typischen Richtpreisen. Über einen Ausstattungs-Faktor
// lässt sich zwischen Basis (gebraucht/günstig), Standard und Premium wählen.
// Reine Budgetplanung, keine amtliche Leistung.

const NIVEAU: { value: string; label: string; faktor: number }[] = [
  { value: 'basis', label: 'Basis (gebraucht/günstig)', faktor: 0.6 },
  { value: 'standard', label: 'Standard', faktor: 1.0 },
  { value: 'premium', label: 'Premium', faktor: 1.6 },
];

// Standard-Richtwerte je Kategorie (Standard = Faktor 1,0)
const KATEGORIEN = {
  kinderwagen: 400,
  autositz: 180,
  moebel: 350, // Bett, Wickelkommode
  kleidung: 200,
  pflege: 120, // Wickeln, Pflege, Bad
};

export const tool: Tool = {
  slug: 'erstausstattung-baby-rechner',
  category: 'familie',
  title: 'Erstausstattung Baby Budget-Rechner',
  shortTitle: 'Baby-Erstausstattung',
  description:
    'Plane das Budget für die Baby-Erstausstattung: Kinderwagen, Autositz, Möbel, Kleidung und Pflege – je nach Ausstattungsniveau.',
  keywords: [
    'baby erstausstattung kosten',
    'erstausstattung baby rechner',
    'baby budget rechner',
    'was kostet baby erstausstattung',
    'baby anschaffung kosten',
    'erstausstattung budget',
  ],
  intro:
    'Vor der Geburt fallen viele Anschaffungen an: Kinderwagen, Autositz, Möbel, Kleidung und Pflegeartikel. Dieser Rechner schätzt das Gesamtbudget für die Baby-Erstausstattung nach Kategorien und Ausstattungsniveau. Ein Zuschlag für Sonstiges deckt Kleinkram ab. Reine Budgetplanung – die tatsächlichen Kosten hängen stark vom Kaufverhalten ab.',
  formula:
    'Budget = (Kinderwagen + Autositz + Möbel + Kleidung + Pflege) × Niveaufaktor + Sonstiges',
  inputs: [
    {
      type: 'select', id: 'niveau', label: 'Ausstattungsniveau', default: 'standard',
      options: NIVEAU.map((n) => ({ value: n.value, label: n.label })),
    },
    { type: 'number', id: 'sonstiges', label: 'Zuschlag Sonstiges', unit: '€', default: 100, min: 0, max: 2000, step: 10, help: 'Spielzeug, Reserve, Kleinteile' },
  ],
  compute: (v) => {
    const niveau = NIVEAU.find((n) => n.value === String(v.niveau)) ?? NIVEAU[1];
    const sonstiges = Math.max(0, num(v.sonstiges, 100));
    const grundsumme =
      KATEGORIEN.kinderwagen + KATEGORIEN.autositz + KATEGORIEN.moebel + KATEGORIEN.kleidung + KATEGORIEN.pflege;
    const kategorienGesamt = grundsumme * niveau.faktor;
    const budget = kategorienGesamt + sonstiges;
    return [
      { label: 'Gesamtbudget Erstausstattung', value: budget, unit: '€', digits: 2, primary: true },
      { label: 'Anschaffungen (ohne Sonstiges)', value: kategorienGesamt, unit: '€', digits: 2 },
      { label: 'Kinderwagen', value: KATEGORIEN.kinderwagen * niveau.faktor, unit: '€', digits: 2 },
      { label: 'Möbel (Bett, Wickeln)', value: KATEGORIEN.moebel * niveau.faktor, unit: '€', digits: 2 },
    ];
  },
  howto: [
    'Ausstattungsniveau wählen: Basis, Standard oder Premium.',
    'Einen Zuschlag für Sonstiges (Spielzeug, Reserve) eintragen.',
    'Das geschätzte Gesamtbudget ablesen und auf Kategorien verteilen.',
  ],
  faq: [
    { q: 'Was kostet eine Baby-Erstausstattung?', a: 'Je nach Ausstattung typischerweise zwischen 700 und 2.300 €. Vieles lässt sich gebraucht oder geliehen deutlich günstiger besorgen.' },
    { q: 'Worauf sollte man nicht sparen?', a: 'Beim Autositz auf Sicherheit und Passform achten. Kleidung, Möbel und Spielzeug lassen sich dagegen gut gebraucht kaufen.' },
    { q: 'Sind die Werte verbindlich?', a: 'Nein, es sind Richtwerte zur Budgetplanung. Die tatsächlichen Ausgaben hängen stark von Marke und Kaufverhalten ab.' },
    { q: 'Gibt es Zuschüsse?', a: 'In bestimmten Fällen gibt es Hilfen, etwa über Beratungsstellen oder Stiftungen. Das ist hier nicht eingerechnet.' },
  ],
  related: ['kosten-kind-rechner', 'familienbudget-rechner', 'sparplan-kind-rechner'],
  examples: [
    {
      values: { niveau: 'standard', sonstiges: 100 },
      expect: [
        { label: 'Anschaffungen (ohne Sonstiges)', value: 1250, tolerance: 0.01 },
        { label: 'Gesamtbudget Erstausstattung', value: 1350, tolerance: 0.01 },
      ],
    },
    {
      values: { niveau: 'basis', sonstiges: 0 },
      expect: [
        { label: 'Anschaffungen (ohne Sonstiges)', value: 750, tolerance: 0.01 },
        { label: 'Kinderwagen', value: 240, tolerance: 0.01 },
      ],
    },
  ],
  updated: '2026-06-18',
};
