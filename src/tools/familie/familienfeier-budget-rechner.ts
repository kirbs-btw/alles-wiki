import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

// Familienfeier-Budget pro Gast: Essen + Getränke + Sonstiges (Deko, Kuchen, Musik)
// pro Person, hochgerechnet auf die Gästezahl, plus fixe Einmalkosten (Location/Miete).
// Liefert Gesamtkosten und Kosten pro Gast inkl. Fixkostenanteil. Reine Budgetplanung.

export const tool: Tool = {
  slug: 'familienfeier-budget-rechner',
  category: 'familie',
  title: 'Familienfeier-Budget-Rechner',
  shortTitle: 'Feier-Budget',
  description:
    'Plane das Budget einer Familienfeier: Essen, Getränke und Sonstiges pro Gast plus fixe Locationkosten – mit Gesamtbudget und Kosten pro Gast.',
  keywords: [
    'familienfeier budget',
    'feier kosten pro gast',
    'budget familienfeier rechner',
    'geburtstagsfeier kosten pro person',
    'feier planen budget',
    'kosten pro gast berechnen',
  ],
  intro:
    'Ob Geburtstag, Taufe oder Jubiläum – eine Familienfeier lässt sich gut über die Kosten pro Gast planen. Dieser Rechner addiert die Pro-Kopf-Kosten für Essen, Getränke und Sonstiges, multipliziert sie mit der Gästezahl und ergänzt fixe Einmalkosten wie die Miete der Location. So sehen Sie das Gesamtbudget und die tatsächlichen Kosten pro Gast.',
  formula:
    'Gesamt = (Essen + Getränke + Sonstiges) × Gäste + Fixkosten; pro Gast = Gesamt / Gäste',
  inputs: [
    { type: 'number', id: 'gaeste', label: 'Anzahl Gäste', unit: 'Personen', default: 30, min: 1, max: 500, step: 1 },
    { type: 'number', id: 'essen', label: 'Essen pro Gast', unit: '€', default: 25, min: 0, max: 300, step: 1 },
    { type: 'number', id: 'getraenke', label: 'Getränke pro Gast', unit: '€', default: 12, min: 0, max: 200, step: 1 },
    { type: 'number', id: 'sonstiges', label: 'Sonstiges pro Gast', unit: '€', default: 8, min: 0, max: 200, step: 1, help: 'Deko, Kuchen, Gastgeschenke' },
    { type: 'number', id: 'fix', label: 'Fixkosten (einmalig)', unit: '€', default: 300, min: 0, max: 10000, step: 50, help: 'Location, Musik, Mietgeschirr' },
  ],
  compute: (v) => {
    const gaeste = Math.max(1, num(v.gaeste, 30));
    const essen = Math.max(0, num(v.essen, 25));
    const getraenke = Math.max(0, num(v.getraenke, 12));
    const sonstiges = Math.max(0, num(v.sonstiges, 8));
    const fix = Math.max(0, num(v.fix, 300));
    const proGastVariabel = essen + getraenke + sonstiges;
    const variabel = proGastVariabel * gaeste;
    const gesamt = variabel + fix;
    const proGast = gesamt / gaeste;
    return [
      { label: 'Gesamtbudget', value: gesamt, unit: '€', digits: 2, primary: true },
      { label: 'Kosten pro Gast', value: proGast, unit: '€', digits: 2, help: 'inkl. anteiliger Fixkosten' },
      { label: 'Variable Kosten pro Gast', value: proGastVariabel, unit: '€', digits: 2 },
      { label: 'Fixkosten', value: fix, unit: '€', digits: 2 },
    ];
  },
  howto: [
    'Erwartete Gästezahl eintragen.',
    'Pro-Kopf-Kosten für Essen, Getränke und Sonstiges schätzen.',
    'Fixe Einmalkosten wie Location oder Musik ergänzen.',
    'Gesamtbudget und Kosten pro Gast ablesen.',
  ],
  faq: [
    { q: 'Wie viel kostet eine Familienfeier pro Person?', a: 'Sehr unterschiedlich: ein einfaches Kaffeetrinken liegt bei wenigen Euro pro Kopf, ein mehrgängiges Menü mit Getränken schnell bei 40 € und mehr. Dieser Rechner macht Ihre eigene Kalkulation transparent.' },
    { q: 'Warum sind die Kosten pro Gast höher als die variablen Kosten?', a: 'Weil die fixen Einmalkosten (z. B. die Location) auf alle Gäste umgelegt werden. Bei mehr Gästen sinkt der Fixkostenanteil pro Person.' },
    { q: 'Sollte ich einen Puffer einplanen?', a: 'Ja. Für unerwartete Mehrkosten oder zusätzliche Gäste ist ein Puffer von 10 bis 15 % sinnvoll. Erhöhen Sie dazu einfach die Posten.' },
  ],
  related: ['familienbudget-rechner', 'familienurlaub-budget-rechner', 'haushaltsbuch-rechner'],
  examples: [
    {
      values: { gaeste: 30, essen: 25, getraenke: 12, sonstiges: 8, fix: 300 },
      expect: [
        { label: 'Variable Kosten pro Gast', value: 45, tolerance: 0.01 },
        { label: 'Gesamtbudget', value: 1650, tolerance: 0.01 },
        { label: 'Kosten pro Gast', value: 55, tolerance: 0.01 },
      ],
    },
    {
      values: { gaeste: 50, essen: 20, getraenke: 10, sonstiges: 5, fix: 500 },
      expect: [{ label: 'Gesamtbudget', value: 2250, tolerance: 0.01 }],
    },
  ],
  updated: '2026-06-19',
};
