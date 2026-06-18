import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'grundsteuer-bundesmodell-rechner',
  category: 'wohnen',
  title: 'Grundsteuer-Rechner (Bundesmodell)',
  shortTitle: 'Grundsteuer',
  description:
    'Schätze deine jährliche Grundsteuer nach dem Bundesmodell ab 2025: Grundsteuerwert × Steuermesszahl × Hebesatz der Gemeinde – als grobe Orientierung.',
  keywords: [
    'grundsteuer berechnen',
    'grundsteuer rechner bundesmodell',
    'grundsteuer ab 2025',
    'grundsteuer hebesatz',
    'grundsteuermessbetrag',
    'neue grundsteuer rechner',
  ],
  formula:
    'Messbetrag = Grundsteuerwert × Steuermesszahl; Grundsteuer = Messbetrag × Hebesatz / 100',
  inputs: [
    { type: 'number', id: 'wert', label: 'Grundsteuerwert (aus dem Bescheid)', unit: '€', default: 200000, min: 0, step: 1000, help: 'Steht im Grundsteuerwertbescheid des Finanzamts.' },
    {
      type: 'select', id: 'messzahl', label: 'Steuermesszahl (Nutzung)', default: '0.31',
      options: [
        { value: '0.31', label: 'Wohngrundstück (0,31 ‰)' },
        { value: '0.34', label: 'Nichtwohngrundstück / unbebaut (0,34 ‰)' },
      ],
      help: 'Bundesmodell: 0,31 ‰ für Wohnen, 0,34 ‰ sonst.',
    },
    { type: 'number', id: 'hebesatz', label: 'Hebesatz der Gemeinde', unit: '%', default: 470, min: 0, step: 10, help: 'Grundsteuer B, je Gemeinde verschieden (oft 300–900 %).' },
  ],
  compute: (v) => {
    const wert = num(v.wert);
    const messzahl = num(v.messzahl, 0.31);
    const hebesatz = num(v.hebesatz);
    const messbetrag = wert * (messzahl / 1000);
    const grundsteuer = (messbetrag * hebesatz) / 100;
    const monatlich = grundsteuer / 12;
    return [
      { label: 'Jährliche Grundsteuer', value: grundsteuer, unit: '€/Jahr', digits: 2, primary: true },
      { label: 'Grundsteuermessbetrag', value: messbetrag, unit: '€', digits: 2 },
      { label: 'Monatliche Belastung', value: monatlich, unit: '€/Monat', digits: 2 },
    ];
  },
  intro:
    'Seit 2025 wird die Grundsteuer neu berechnet. Im Bundesmodell – das die meisten Länder anwenden – ergibt sich die Steuer aus Grundsteuerwert × Steuermesszahl × Hebesatz der Gemeinde. Dieser Rechner liefert eine grobe Orientierung: Den Grundsteuerwert entnimmst du dem Bescheid des Finanzamts. Einige Länder (z. B. Baden-Württemberg, Bayern, Hamburg, Hessen, Niedersachsen) nutzen abweichende Modelle, für die diese Formel nicht passt. Stand 2026 – maßgeblich ist immer dein Grundsteuerbescheid.',
  howto: [
    'Grundsteuerwert aus dem Bescheid des Finanzamts eintragen.',
    'Steuermesszahl nach Nutzung wählen (0,31 ‰ für Wohnen).',
    'Hebesatz deiner Gemeinde (Grundsteuer B) eingeben.',
    'Jährliche und monatliche Grundsteuer ablesen.',
  ],
  faq: [
    { q: 'Wie wird die Grundsteuer im Bundesmodell berechnet?', a: 'In drei Schritten: Grundsteuerwert × Steuermesszahl ergibt den Messbetrag, dieser × Hebesatz der Gemeinde ergibt die jährliche Grundsteuer. Die Messzahl beträgt 0,31 ‰ für Wohngrundstücke.' },
    { q: 'Woher kenne ich den Hebesatz?', a: 'Den Hebesatz für die Grundsteuer B legt jede Gemeinde selbst fest. Er steht in der Hebesatzsatzung der Kommune und liegt häufig zwischen 300 und 900 %. Viele Städte haben ihn zur Reform 2025 angepasst.' },
    { q: 'Gilt das in allen Bundesländern?', a: 'Nein. Das Bundesmodell nutzen unter anderem NRW, Berlin, Brandenburg, Sachsen und das Saarland (teils mit eigenen Messzahlen). Baden-Württemberg, Bayern, Hamburg, Hessen und Niedersachsen rechnen nach Flächen- oder Bodenwertmodellen – dafür ist dieser Rechner nicht gedacht.' },
    { q: 'Ist das Ergebnis verbindlich?', a: 'Nein, es ist nur eine Näherung (Stand 2026). Verbindlich ist allein der Grundsteuerbescheid der Gemeinde. Vergleiche das Ergebnis damit und prüfe bei großen Abweichungen die eingegebenen Werte.' },
  ],
  related: ['grunderwerbsteuer-rechner', 'nebenkosten-umlage-rechner', 'quadratmeterpreis-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { wert: 200000, messzahl: '0.31', hebesatz: 470 },
      expect: [
        { label: 'Grundsteuermessbetrag', value: 62, tolerance: 0.01 },
        { label: 'Jährliche Grundsteuer', value: 291.4, tolerance: 0.01 },
        { label: 'Monatliche Belastung', value: 24.28, tolerance: 0.05 },
      ],
    },
    {
      values: { wert: 350000, messzahl: '0.34', hebesatz: 600 },
      expect: [
        { label: 'Grundsteuermessbetrag', value: 119, tolerance: 0.01 },
        { label: 'Jährliche Grundsteuer', value: 714, tolerance: 0.01 },
      ],
    },
  ],
};
