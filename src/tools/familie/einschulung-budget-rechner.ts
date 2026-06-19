import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

// Einschulungs-Budget: Summe der typischen Anschaffungen zum Schulstart
// (Schulranzen-Set, Schreibwaren, Sportzeug, Hausschuhe) plus Schultüte und
// Einschulungsfeier. Reine Budgetplanung, Beträge frei wählbar.

export const tool: Tool = {
  slug: 'einschulung-budget-rechner',
  category: 'familie',
  title: 'Einschulungs-Budget-Rechner',
  shortTitle: 'Einschulung',
  description:
    'Berechne die Kosten zur Einschulung: Schulranzen-Set, Schreibwaren, Sport- und Wechselsachen, Schultüte und Einschulungsfeier in einer Gesamtsumme.',
  keywords: [
    'einschulung kosten',
    'schulranzen budget',
    'einschulung budget rechner',
    'kosten schulanfang',
    'erstausstattung schule',
    'schulstart kosten',
  ],
  intro:
    'Zum Schulstart kommt einiges zusammen: Schulranzen-Set, Schreibwaren, Sport- und Wechselsachen, dazu Schultüte und oft eine Einschulungsfeier. Dieser Rechner summiert die typischen Posten zu einem Gesamtbudget, damit der Schulanfang finanziell planbar bleibt.',
  formula:
    'Gesamt = Ranzen-Set + Schreibwaren + Sport/Wechsel + Schultüte + Feier',
  inputs: [
    { type: 'number', id: 'ranzen', label: 'Schulranzen-Set', unit: '€', default: 200, min: 0, max: 500, step: 10, help: 'Ranzen, Mäppchen, Sportbeutel' },
    { type: 'number', id: 'schreibwaren', label: 'Schreibwaren & Material', unit: '€', default: 60, min: 0, max: 400, step: 5, help: 'Stifte, Hefte, Umschläge' },
    { type: 'number', id: 'sport', label: 'Sport- & Wechselsachen', unit: '€', default: 70, min: 0, max: 400, step: 5, help: 'Sportzeug, Hausschuhe, Turnbeutel' },
    { type: 'number', id: 'schultuete', label: 'Schultüte (inkl. Inhalt)', unit: '€', default: 40, min: 0, max: 300, step: 5 },
    { type: 'number', id: 'feier', label: 'Einschulungsfeier', unit: '€', default: 150, min: 0, max: 3000, step: 10, help: 'Essen, Deko, Gäste' },
  ],
  compute: (v) => {
    const ranzen = Math.max(0, num(v.ranzen, 200));
    const schreibwaren = Math.max(0, num(v.schreibwaren, 60));
    const sport = Math.max(0, num(v.sport, 70));
    const schultuete = Math.max(0, num(v.schultuete, 40));
    const feier = Math.max(0, num(v.feier, 150));
    const ausstattung = ranzen + schreibwaren + sport;
    const gesamt = ausstattung + schultuete + feier;
    return [
      { label: 'Gesamtkosten Einschulung', value: gesamt, unit: '€', digits: 2, primary: true },
      { label: 'Ausstattung (ohne Feier/Tüte)', value: ausstattung, unit: '€', digits: 2 },
      { label: 'Schultüte', value: schultuete, unit: '€', digits: 2 },
      { label: 'Einschulungsfeier', value: feier, unit: '€', digits: 2 },
    ];
  },
  howto: [
    'Budget für das Schulranzen-Set eintragen (Ranzen, Mäppchen, Beutel).',
    'Kosten für Schreibwaren und Material sowie Sport- und Wechselsachen ergänzen.',
    'Schultüte und geplante Einschulungsfeier eintragen.',
    'Gesamtkosten zur Einschulung ablesen.',
  ],
  faq: [
    { q: 'Was kostet ein Schulranzen?', a: 'Hochwertige Schulranzen-Sets liegen häufig zwischen 150 € und 280 €. Einfache Modelle gibt es günstiger, Markensets können teurer sein.' },
    { q: 'Welche Schreibwaren braucht ein Erstklässler?', a: 'Üblich sind dicke Stifte, ein Füller-Vorläufer, Hefte, Umschläge, Kleber und Schere. Viele Schulen geben zum Schulstart eine konkrete Materialliste aus.' },
    { q: 'Gibt es finanzielle Unterstützung zum Schulstart?', a: 'Über das Bildungs- und Teilhabepaket erhalten berechtigte Familien einen Pauschalbetrag für Schulbedarf. Die Höhe und Voraussetzungen klärt das zuständige Amt (Stand 2026).' },
  ],
  related: ['erstausstattung-baby-rechner', 'kosten-kind-rechner', 'familienbudget-rechner'],
  examples: [
    {
      values: { ranzen: 200, schreibwaren: 60, sport: 70, schultuete: 40, feier: 150 },
      expect: [
        { label: 'Ausstattung (ohne Feier/Tüte)', value: 330, tolerance: 0.01 },
        { label: 'Gesamtkosten Einschulung', value: 520, tolerance: 0.01 },
      ],
    },
    {
      values: { ranzen: 250, schreibwaren: 80, sport: 50, schultuete: 30, feier: 0 },
      expect: [{ label: 'Gesamtkosten Einschulung', value: 410, tolerance: 0.01 }],
    },
  ],
  updated: '2026-06-19',
};
