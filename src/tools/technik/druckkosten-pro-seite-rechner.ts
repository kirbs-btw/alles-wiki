import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'druckkosten-pro-seite-rechner',
  category: 'technik',
  title: 'Druckkosten-pro-Seite-Rechner',
  shortTitle: 'Druckkosten',
  description:
    'Berechne die Druckkosten pro Seite aus Patronenpreis, Reichweite und Papierpreis. Vergleiche Tinten- und Tonerkosten realistisch.',
  keywords: [
    'druckkosten pro seite berechnen',
    'kosten pro druckseite',
    'tintenkosten rechner',
    'toner kosten pro seite',
    'druckkosten rechner',
  ],
  formula: 'Kosten/Seite = Patronenpreis / Reichweite + Papierpreis/Blatt',
  inputs: [
    { type: 'number', id: 'patronenpreis', label: 'Preis Patrone/Toner', unit: 'EUR', default: 25, min: 0, step: 0.5 },
    { type: 'number', id: 'reichweite', label: 'Reichweite', unit: 'Seiten', default: 500, min: 1, step: 10, help: 'Laut Hersteller bei 5 % Deckung.' },
    { type: 'number', id: 'papierPreis', label: 'Papierpreis pro Blatt', unit: 'Cent', default: 1, min: 0, step: 0.1, help: '500 Blatt fuer 5 EUR sind 1 Cent/Blatt.' },
    { type: 'number', id: 'auflage', label: 'Anzahl Seiten', unit: 'Seiten', default: 100, min: 0, step: 10, help: 'Fuer die Gesamtkostenberechnung.' },
  ],
  compute: (v) => {
    const patronenpreis = num(v.patronenpreis);
    const reichweite = num(v.reichweite);
    const papierProBlattEur = num(v.papierPreis) / 100;
    const auflage = num(v.auflage);
    const tinteProSeite = reichweite > 0 ? patronenpreis / reichweite : 0;
    const kostenProSeite = tinteProSeite + papierProBlattEur;
    const gesamt = kostenProSeite * auflage;
    return [
      { label: 'Kosten pro Seite', value: kostenProSeite, unit: 'EUR', digits: 4, primary: true },
      { label: 'Tinten-/Tonerkosten je Seite', value: tinteProSeite, unit: 'EUR', digits: 4 },
      { label: 'Gesamtkosten', value: gesamt, unit: 'EUR', digits: 2, help: 'Fuer die angegebene Seitenzahl.' },
    ];
  },
  intro:
    'Was kostet eine gedruckte Seite wirklich? Neben dem Patronen- oder Tonerpreis zaehlt auch das Papier. Der Rechner ermittelt die Kosten pro Seite und die Gesamtkosten fuer eine bestimmte Auflage.',
  howto: [
    'Preis der Patrone oder des Toners eingeben.',
    'Reichweite in Seiten eintragen (Herstellerangabe bei 5 % Deckung).',
    'Papierpreis pro Blatt in Cent angeben.',
    'Optional die Anzahl der Seiten fuer die Gesamtkosten eintragen.',
  ],
  faq: [
    { q: 'Wie berechne ich die Druckkosten pro Seite?', a: 'Patronenpreis geteilt durch die Reichweite ergibt die Tintenkosten je Seite. Dazu kommen die Papierkosten. Bei 25 EUR fuer 500 Seiten und 1 Cent Papier sind das rund 6 Cent pro Seite.' },
    { q: 'Stimmt die angegebene Reichweite?', a: 'Hersteller berechnen die Reichweite bei nur 5 % Deckung (wenig Text). Bei Grafiken, Fotos oder fettem Text ist die reale Reichweite oft deutlich geringer.' },
    { q: 'Sind Nachfuelltinten guenstiger?', a: 'Kompatible Patronen oder Nachfuelltinte senken die Kosten pro Seite oft erheblich. Trage einfach den niedrigeren Patronenpreis ein, um den Effekt zu sehen.' },
  ],
  related: ['pc-stromverbrauch-rechner', 'megapixel-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { patronenpreis: 25, reichweite: 500, papierPreis: 1, auflage: 100 },
      expect: [
        { label: 'Kosten pro Seite', value: 0.06, tolerance: 0.0001 },
        { label: 'Gesamtkosten', value: 6, tolerance: 0.01 },
      ],
    },
    {
      values: { patronenpreis: 60, reichweite: 2000, papierPreis: 0.8, auflage: 0 },
      expect: [{ label: 'Kosten pro Seite', value: 0.038, tolerance: 0.0001 }],
    },
  ],
};
