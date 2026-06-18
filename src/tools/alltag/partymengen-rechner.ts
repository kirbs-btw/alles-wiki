import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'partymengen-rechner',
  category: 'alltag',
  title: 'Party-Mengen: Essen pro Gast berechnen',
  shortTitle: 'Party-Mengen',
  description:
    'Berechne, wie viel von einem Gericht du pro Gast einplanen musst – z. B. Fleisch fürs Grillen, Salat oder Beilagen, inklusive Mengenpuffer.',
  keywords: [
    'party essen berechnen',
    'wie viel fleisch pro person grillen',
    'mengen pro gast rechner',
    'essen planen party',
    'grillen menge pro person',
    'buffet menge berechnen',
    'wie viel essen pro gast',
  ],
  formula: 'Gesamtmenge = Gäste × Menge pro Gast × (1 + Puffer%/100)',
  inputs: [
    { type: 'number', id: 'gaeste', label: 'Anzahl Gäste', default: 15, min: 1, step: 1 },
    {
      type: 'select',
      id: 'gericht',
      label: 'Gericht / Komponente',
      default: 'fleisch_grillen',
      help: 'Setzt einen üblichen Richtwert pro Gast – kann unten überschrieben werden.',
      options: [
        { value: 'fleisch_grillen', label: 'Fleisch zum Grillen (300 g)' },
        { value: 'fleisch_hauptgericht', label: 'Fleisch als Hauptgericht (200 g)' },
        { value: 'beilage', label: 'Beilage / Sättigung (150 g)' },
        { value: 'salat', label: 'Salat (100 g)' },
        { value: 'brot', label: 'Brot/Brötchen (80 g)' },
        { value: 'kuchen', label: 'Kuchen/Dessert (120 g)' },
        { value: 'eigen', label: 'Eigener Wert (siehe unten)' },
      ],
    },
    { type: 'number', id: 'eigene_menge', label: 'Eigener Wert pro Gast', unit: 'g', default: 0, min: 0, step: 10, help: 'Nur nutzen, wenn oben "Eigener Wert" gewählt ist.' },
    { type: 'number', id: 'puffer', label: 'Sicherheits-Puffer', unit: '%', default: 10, min: 0, step: 5 },
  ],
  compute: (v) => {
    const gaeste = Math.max(1, Math.round(num(v.gaeste, 1)));
    const gericht = String(v.gericht || 'fleisch_grillen');
    const richtwerte: Record<string, number> = {
      fleisch_grillen: 300,
      fleisch_hauptgericht: 200,
      beilage: 150,
      salat: 100,
      brot: 80,
      kuchen: 120,
    };
    const proGastBasis = gericht === 'eigen' ? num(v.eigene_menge) : (richtwerte[gericht] ?? 0);
    const puffer = num(v.puffer);
    const proGast = proGastBasis * (1 + puffer / 100);
    const gesamtG = gaeste * proGast;
    return [
      { label: 'Gesamtmenge', value: gesamtG / 1000, unit: 'kg', digits: 2, primary: true },
      { label: 'Gesamtmenge (Gramm)', value: gesamtG, unit: 'g', digits: 0 },
      { label: 'Menge pro Gast (inkl. Puffer)', value: proGast, unit: 'g', digits: 0 },
    ];
  },
  intro:
    'Beim Planen von Grillfest oder Buffet ist die häufigste Frage: Wie viel pro Person? Dieser Rechner nutzt bewährte Richtwerte je Komponente (z. B. ca. 300 g Fleisch zum Grillen), multipliziert sie mit der Gästezahl und schlägt einen Puffer auf, damit niemand hungrig bleibt. Eigene Werte sind ebenfalls möglich.',
  howto: [
    'Gib die Anzahl der Gäste ein.',
    'Wähle das Gericht oder die Komponente – der Richtwert pro Gast wird automatisch gesetzt.',
    'Optional einen eigenen Wert pro Gast festlegen (Auswahl "Eigener Wert").',
    'Puffer einstellen (z. B. 10 %) und die benötigte Gesamtmenge in Kilogramm ablesen.',
  ],
  faq: [
    { q: 'Wie viel Fleisch pro Person zum Grillen?', a: 'Üblich sind etwa 250–350 g pro Person, je nach Appetit und Beilagen. Der Richtwert hier liegt bei 300 g, plus Puffer.' },
    { q: 'Warum ein Puffer?', a: 'Erfahrungsgemäß isst ein Teil der Gäste mehr, und Reste sind besser als zu wenig. 10 % sind ein guter Standard, bei Unsicherheit ruhig 15–20 %.' },
    { q: 'Gelten die Werte auch für Kinder?', a: 'Kinder essen meist deutlich weniger. Bei vielen Kindern kannst du die Gästezahl niedriger ansetzen oder einen eigenen, kleineren Wert pro Gast wählen.' },
    { q: 'Kann ich mehrere Komponenten planen?', a: 'Ja, rechne jede Komponente einzeln durch (Fleisch, Beilage, Salat, Brot) und addiere die Ergebnisse für deine Einkaufsliste.' },
  ],
  related: ['getraenke-pro-gast-rechner', 'rezept-portionen-rechner', 'cup-in-gramm-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { gaeste: 15, gericht: 'fleisch_grillen', eigene_menge: 0, puffer: 10 },
      expect: [
        { label: 'Gesamtmenge', value: 4.95, tolerance: 0.01 },
        { label: 'Menge pro Gast (inkl. Puffer)', value: 330, tolerance: 0.5 },
      ],
    },
    {
      values: { gaeste: 10, gericht: 'salat', eigene_menge: 0, puffer: 0 },
      expect: [{ label: 'Gesamtmenge (Gramm)', value: 1000, tolerance: 1 }],
    },
  ],
};
