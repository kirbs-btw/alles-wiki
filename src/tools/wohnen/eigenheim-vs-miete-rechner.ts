import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'eigenheim-vs-miete-rechner',
  category: 'wohnen',
  title: 'Eigenheim-vs-Miete-Rechner',
  shortTitle: 'Kaufen oder Mieten',
  description:
    'Vergleiche die monatlichen Wohnkosten von Kaufen und Mieten – Kreditrate plus Instandhaltung gegen Miete plus Renditeverlust auf das Eigenkapital.',
  keywords: [
    'kaufen oder mieten rechner',
    'eigenheim vs miete',
    'mieten oder kaufen vergleich',
    'immobilie kaufen lohnt sich',
    'wohnkosten vergleich',
    'kauf miete rechner',
  ],
  formula:
    'Kauf/Monat = Kreditrate + Instandhaltung + Nebenkosten; Miete-Szenario/Monat = Kaltmiete + entgangene Rendite auf Eigenkapital (/12)',
  inputs: [
    { type: 'number', id: 'rate', label: 'Monatliche Kreditrate (Zins + Tilgung)', unit: '€', default: 1400, min: 0, step: 10, help: 'Annuität deines Immobilienkredits.' },
    { type: 'number', id: 'instand', label: 'Instandhaltung + Hausgeld', unit: '€/Monat', default: 250, min: 0, step: 10, help: 'Rücklagen, Reparaturen, nicht umlegbare Hauskosten.' },
    { type: 'number', id: 'miete', label: 'Vergleichbare Kaltmiete', unit: '€', default: 1200, min: 0, step: 10, help: 'Miete für eine vergleichbare Wohnung.' },
    { type: 'number', id: 'eigenkapital', label: 'Eingesetztes Eigenkapital', unit: '€', default: 80000, min: 0, step: 1000, help: 'Beim Mieten könnte dieses Kapital angelegt werden.' },
    { type: 'number', id: 'rendite', label: 'Mögliche Kapitalrendite', unit: '%/Jahr', default: 4, min: 0, max: 15, step: 0.5, help: 'Erwartete Rendite des Eigenkapitals beim Mieten.' },
  ],
  compute: (v) => {
    const rate = num(v.rate);
    const instand = num(v.instand);
    const miete = num(v.miete);
    const eigenkapital = num(v.eigenkapital);
    const rendite = num(v.rendite);
    const kaufMonat = rate + instand;
    const entgangeneRendite = (eigenkapital * (rendite / 100)) / 12;
    const mieteMonat = miete + entgangeneRendite;
    const differenz = kaufMonat - mieteMonat;
    const guenstiger = differenz <= 0 ? 'Kaufen günstiger' : 'Mieten günstiger';
    return [
      { label: 'Monatlicher Vorteil günstigere Variante', value: Math.abs(differenz), unit: '€/Monat', digits: 2, primary: true },
      { label: 'Günstigere Variante', value: guenstiger, unit: '' },
      { label: 'Kosten Kaufen', value: kaufMonat, unit: '€/Monat', digits: 2 },
      { label: 'Kosten Mieten (inkl. Renditeverlust)', value: mieteMonat, unit: '€/Monat', digits: 2 },
    ];
  },
  intro:
    'Ob Kaufen oder Mieten günstiger ist, hängt von mehr ab als nur Rate gegen Miete. Beim Kauf zählen neben der Kreditrate die Instandhaltung und nicht umlegbare Hauskosten. Beim Mieten bleibt das Eigenkapital frei und könnte Rendite bringen – diese entgangene Rendite ist ein realer Kostenfaktor. Der Rechner stellt beide Seiten gegenüber. Es ist eine vereinfachte Momentaufnahme: Wertsteigerung der Immobilie, Tilgungsgewinn, Steuereffekte und steigende Mieten bleiben unberücksichtigt.',
  howto: [
    'Monatliche Kreditrate (Zins + Tilgung) für den Kauf eintragen.',
    'Instandhaltung und nicht umlegbare Hauskosten ergänzen.',
    'Vergleichbare Kaltmiete eingeben.',
    'Eingesetztes Eigenkapital und die mögliche Rendite beim Mieten angeben.',
    'Günstigere Variante und monatlichen Vorteil ablesen.',
  ],
  faq: [
    { q: 'Warum zählt die entgangene Rendite?', a: 'Wer mietet, muss kein Eigenkapital in die Immobilie stecken und kann es anlegen. Diese mögliche Rendite ist beim Kauf ein Verzicht – also ein versteckter Kostenfaktor, den ein fairer Vergleich einbezieht.' },
    { q: 'Was bleibt im Rechner unberücksichtigt?', a: 'Vor allem die Wertentwicklung der Immobilie, der Vermögensaufbau durch Tilgung, steigende Mieten über die Jahre, Kaufnebenkosten und Steuereffekte. Das Ergebnis ist daher eine grobe Orientierung, kein Renditevergleich über die gesamte Laufzeit.' },
    { q: 'Welche Rendite soll ich ansetzen?', a: 'Konservativ 3–5 % für ein breit gestreutes Wertpapierdepot, mehr nur bei höherem Risiko. Je höher die angesetzte Rendite, desto teurer wird das Kauf-Szenario im Vergleich.' },
    { q: 'Heißt günstiger auch besser?', a: 'Nicht unbedingt. Eigentum bietet Sicherheit, Gestaltungsfreiheit und langfristigen Vermögensaufbau. Der Rechner zeigt nur die laufenden Kosten – persönliche und langfristige Faktoren musst du selbst gewichten.' },
  ],
  related: ['baufinanzierung-rate-rechner', 'mietrendite-rechner', 'quadratmeterpreis-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { rate: 1400, instand: 250, miete: 1200, eigenkapital: 80000, rendite: 4 },
      expect: [
        { label: 'Kosten Kaufen', value: 1650, tolerance: 0.01 },
        { label: 'Kosten Mieten (inkl. Renditeverlust)', value: 1466.67, tolerance: 0.05 },
        { label: 'Monatlicher Vorteil günstigere Variante', value: 183.33, tolerance: 0.05 },
      ],
    },
    {
      values: { rate: 1000, instand: 200, miete: 1300, eigenkapital: 60000, rendite: 3 },
      expect: [
        { label: 'Kosten Kaufen', value: 1200, tolerance: 0.01 },
        { label: 'Kosten Mieten (inkl. Renditeverlust)', value: 1450, tolerance: 0.01 },
        { label: 'Monatlicher Vorteil günstigere Variante', value: 250, tolerance: 0.01 },
      ],
    },
  ],
};
