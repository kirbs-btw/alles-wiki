import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'sf-klasse-rechner',
  category: 'auto',
  title: 'SF-Klasse-Rechner (Kfz-Versicherung)',
  shortTitle: 'SF-Klasse',
  description:
    'Berechne deine Kfz-Versicherungsprämie aus Schadenfreiheitsklasse (SF) und Beitragssatz – und vergleiche mit der Hochstufung nach einem Schaden.',
  keywords: [
    'sf klasse beitragssatz rechner',
    'schadenfreiheitsklasse rechner',
    'kfz versicherung sf klasse',
    'beitragssatz berechnen',
    'sf klasse hochstufung schaden',
  ],
  formula:
    'Jahresbeitrag = Grundbeitrag (100 %) × Beitragssatz der SF-Klasse / 100',
  intro:
    'Die Schadenfreiheitsklasse (SF) bestimmt, welchen Prozentsatz des Grundbeitrags du für deine Kfz-Versicherung zahlst. Je mehr unfallfreie Jahre, desto höher die Klasse und desto niedriger der Beitragssatz. Dieser Rechner zeigt deinen Jahresbeitrag und – als Orientierung – die Mehrkosten nach einer Rückstufung. Die Beitragssätze sind versichererabhängig (Stand 2026, Näherung).',
  inputs: [
    { type: 'number', id: 'grundbeitrag', label: '100-%-Grundbeitrag', unit: '€/Jahr', default: 1200, min: 0, step: 10, help: 'Beitrag bei SF 0 / Beitragssatz 100 %.' },
    { type: 'number', id: 'beitragssatz', label: 'Beitragssatz deiner SF-Klasse', unit: '%', default: 30, min: 0, max: 260, step: 1, help: 'Steht auf deiner Police, z. B. SF 12 ≈ 30 %.' },
    { type: 'number', id: 'beitragssatzNeu', label: 'Beitragssatz nach Rückstufung', unit: '%', default: 55, min: 0, max: 260, step: 1, help: 'Beitragssatz nach einem gemeldeten Schaden.' },
  ],
  compute: (v) => {
    const grund = num(v.grundbeitrag);
    const satz = num(v.beitragssatz);
    const satzNeu = num(v.beitragssatzNeu);
    const beitrag = (grund * satz) / 100;
    const beitragNeu = (grund * satzNeu) / 100;
    const mehrJahr = beitragNeu - beitrag;
    return [
      { label: 'Jahresbeitrag (aktuell)', value: beitrag, unit: '€', digits: 2, primary: true },
      { label: 'Monatsbeitrag (aktuell)', value: beitrag / 12, unit: '€', digits: 2 },
      { label: 'Jahresbeitrag nach Rückstufung', value: beitragNeu, unit: '€', digits: 2 },
      { label: 'Mehrkosten pro Jahr durch Schaden', value: mehrJahr, unit: '€', digits: 2 },
    ];
  },
  howto: [
    'Den 100-%-Grundbeitrag deines Tarifs eintragen (steht meist auf der Police).',
    'Beitragssatz deiner aktuellen SF-Klasse in Prozent angeben.',
    'Optional den Beitragssatz nach einer Rückstufung eintragen.',
    'Jahresbeitrag und mögliche Mehrkosten nach einem Schaden ablesen.',
  ],
  faq: [
    { q: 'Was ist die SF-Klasse?', a: 'Die Schadenfreiheitsklasse spiegelt die Zahl deiner unfallfreien Jahre wider. Jeder Klasse ordnet der Versicherer einen Beitragssatz zu – je höher die Klasse, desto günstiger der Prozentsatz.' },
    { q: 'Wo finde ich meinen Beitragssatz?', a: 'Der Beitragssatz (z. B. 30 %) steht auf deiner Versicherungspolice oder Beitragsrechnung. Er ist von Versicherer zu Versicherer unterschiedlich – dieselbe SF-Klasse kann unterschiedliche Sätze bedeuten.' },
    { q: 'Wie stark steigt der Beitrag nach einem Schaden?', a: 'Nach einem gemeldeten Schaden wirst du um mehrere SF-Klassen zurückgestuft, der Beitragssatz steigt. Die genaue Höhe legt der Versicherer in seiner Rückstufungstabelle fest – nutze die Werte hier als Orientierung.' },
    { q: 'Lohnt sich die Selbstregulierung eines Bagatellschadens?', a: 'Oft ja: Liegt der Schaden nur knapp über der Reparatur­summe, können die Mehrkosten durch die Rückstufung über mehrere Jahre höher sein als der Schaden selbst. Der Rechner hilft beim Abschätzen.' },
  ],
  related: ['kfz-steuer-rechner', 'auto-gesamtkosten-rechner', 'kosten-pro-km-rechner'],
  updated: '2026-06-19',
  examples: [
    {
      values: { grundbeitrag: 1200, beitragssatz: 30, beitragssatzNeu: 55 },
      // aktuell = 1200*0,30 = 360; neu = 660; Mehr = 300
      expect: [
        { label: 'Jahresbeitrag (aktuell)', value: 360, tolerance: 0.01 },
        { label: 'Mehrkosten pro Jahr durch Schaden', value: 300, tolerance: 0.01 },
      ],
    },
    {
      values: { grundbeitrag: 900, beitragssatz: 35, beitragssatzNeu: 70 },
      // aktuell = 315; monatlich = 26,25
      expect: [{ label: 'Monatsbeitrag (aktuell)', value: 26.25, tolerance: 0.01 }],
    },
  ],
};
