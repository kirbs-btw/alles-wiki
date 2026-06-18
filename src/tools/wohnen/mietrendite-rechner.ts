import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'mietrendite-rechner',
  category: 'wohnen',
  title: 'Mietrendite-Rechner',
  shortTitle: 'Mietrendite',
  description:
    'Berechne Brutto- und Nettomietrendite einer Kapitalanlage-Immobilie aus Kaufpreis, Kaufnebenkosten, Kaltmiete und laufenden Kosten – plus Kaufpreisfaktor.',
  keywords: [
    'mietrendite berechnen',
    'bruttorendite immobilie',
    'nettomietrendite rechner',
    'kaufpreisfaktor immobilie',
    'rendite vermietung',
    'immobilien rendite formel',
    'kapitalanlage wohnung rendite',
  ],
  formula:
    'Bruttorendite = Jahreskaltmiete / Kaufpreis × 100; Nettorendite = (Jahreskaltmiete − Kosten) / Gesamtinvestition × 100',
  inputs: [
    { type: 'number', id: 'kaufpreis', label: 'Kaufpreis', unit: '€', default: 300000, min: 1, step: 1000 },
    { type: 'number', id: 'nebenkostensatz', label: 'Kaufnebenkosten', unit: '%', default: 10, min: 0, max: 25, step: 0.1, help: 'Grunderwerbsteuer, Notar, Makler – meist 9 bis 12 % des Kaufpreises.' },
    { type: 'number', id: 'kaltmiete', label: 'Monatliche Kaltmiete', unit: '€', default: 1100, min: 0, step: 10 },
    { type: 'number', id: 'kosten', label: 'Nicht umlagefähige Kosten (Jahr)', unit: '€', default: 1800, min: 0, step: 100, help: 'Verwaltung, Instandhaltungsrücklage, Mietausfallwagnis.' },
  ],
  compute: (v) => {
    const kaufpreis = num(v.kaufpreis);
    const nebenkostensatz = num(v.nebenkostensatz);
    const kaltmiete = num(v.kaltmiete);
    const kosten = num(v.kosten);
    const jahresmiete = kaltmiete * 12;
    const nebenkosten = kaufpreis * (nebenkostensatz / 100);
    const gesamtinvest = kaufpreis + nebenkosten;
    const brutto = kaufpreis > 0 ? (jahresmiete / kaufpreis) * 100 : 0;
    const netto = gesamtinvest > 0 ? ((jahresmiete - kosten) / gesamtinvest) * 100 : 0;
    const faktor = jahresmiete > 0 ? kaufpreis / jahresmiete : 0;
    return [
      { label: 'Nettomietrendite', value: netto, unit: '%', digits: 2, primary: true },
      { label: 'Bruttomietrendite', value: brutto, unit: '%', digits: 2 },
      { label: 'Kaufpreisfaktor', value: faktor, unit: '×', digits: 1, help: 'Jahreskaltmieten bis zur Amortisation (brutto).' },
      { label: 'Jahreskaltmiete', value: jahresmiete, unit: '€', digits: 2 },
      { label: 'Gesamtinvestition', value: gesamtinvest, unit: '€', digits: 2 },
    ];
  },
  intro:
    'Die Mietrendite zeigt, wie rentabel eine vermietete Immobilie ist. Die Bruttorendite setzt nur die Jahreskaltmiete ins Verhältnis zum Kaufpreis, die aussagekräftigere Nettorendite berücksichtigt Kaufnebenkosten und laufende, nicht umlagefähige Kosten. Der Kaufpreisfaktor gibt an, wie viele Jahreskaltmieten der Kaufpreis ausmacht.',
  howto: [
    'Kaufpreis der Immobilie eingeben.',
    'Kaufnebenkosten als Prozentsatz schätzen (Grunderwerbsteuer, Notar, Makler).',
    'Monatliche Kaltmiete und nicht umlagefähige Jahreskosten eintragen.',
    'Brutto- und Nettorendite sowie den Kaufpreisfaktor ablesen.',
  ],
  faq: [
    { q: 'Was ist der Unterschied zwischen Brutto- und Nettorendite?', a: 'Die Bruttorendite teilt die Jahreskaltmiete durch den reinen Kaufpreis. Die Nettorendite zieht zusätzlich Kaufnebenkosten und laufende, nicht umlagefähige Kosten ab und ist daher realistischer.' },
    { q: 'Was sagt der Kaufpreisfaktor aus?', a: 'Der Faktor (auch Vervielfältiger) gibt an, wie viele Jahreskaltmieten dem Kaufpreis entsprechen. Ein Faktor von 25 bedeutet, dass die Bruttomiete den Kaufpreis nach 25 Jahren einspielt – niedrigere Faktoren gelten als günstiger.' },
    { q: 'Welche Kosten gehören in die Nettorendite?', a: 'Berücksichtige nur Kosten, die nicht auf den Mieter umgelegt werden: Verwaltergebühren, Instandhaltungsrücklage und ein Mietausfallwagnis. Umlagefähige Betriebskosten zahlt der Mieter und bleiben außen vor.' },
    { q: 'Ist eine hohe Mietrendite immer gut?', a: 'Nicht zwangsläufig. Sehr hohe Renditen gehen oft mit Lagerisiken, höherem Leerstand oder Sanierungsbedarf einher. Die Rendite sollte stets zusammen mit Lage, Zustand und Wertentwicklung betrachtet werden.' },
  ],
  related: ['quadratmeterpreis-rechner', 'grunderwerbsteuer-rechner', 'maklerprovision-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { kaufpreis: 300000, nebenkostensatz: 10, kaltmiete: 1100, kosten: 1800 },
      expect: [
        { label: 'Bruttomietrendite', value: 4.4, tolerance: 0.01 },
        { label: 'Nettomietrendite', value: 3.45, tolerance: 0.05 },
        { label: 'Kaufpreisfaktor', value: 22.7, tolerance: 0.2 },
      ],
    },
  ],
};
