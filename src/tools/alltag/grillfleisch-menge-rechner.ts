import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

/**
 * Grillmengen-Planung: Fleisch und Beilagen pro Person.
 * Richtwerte je Esstyp; Beilagen (Salat/Brot) als feste Pro-Kopf-Mengen.
 */
// Fleisch (roh) pro Erwachsenem in Gramm, je nach Appetit
const FLEISCH_PRO_PERSON: Record<string, number> = {
  klein: 250,
  normal: 350,
  gross: 500,
};

export const tool: Tool = {
  slug: 'grillfleisch-menge-rechner',
  category: 'alltag',
  title: 'Grillfleisch-Menge pro Person berechnen',
  shortTitle: 'Grillmengen',
  description:
    'Berechne, wie viel Fleisch, Salat und Brot du für deine Grillparty einkaufen musst – nach Personenzahl, Kinderanteil und Appetit.',
  keywords: [
    'grillfleisch menge pro person',
    'wie viel fleisch grillen',
    'grillparty mengen',
    'grillen menge berechnen',
    'fleisch pro person grillen',
    'grillmengen rechner',
  ],
  formula:
    'Fleisch = Erwachsene × Portion + Kinder × Portion × 0,5; Salat = Personen × 150 g; Brot = Personen × 100 g',
  inputs: [
    {
      type: 'number',
      id: 'erwachsene',
      label: 'Erwachsene',
      unit: 'Pers.',
      default: 6,
      min: 0,
      max: 200,
      step: 1,
    },
    {
      type: 'number',
      id: 'kinder',
      label: 'Kinder',
      unit: 'Pers.',
      default: 2,
      min: 0,
      max: 200,
      step: 1,
      help: 'Kinder rechnen wir mit halber Fleischportion.',
    },
    {
      type: 'select',
      id: 'appetit',
      label: 'Appetit',
      default: 'normal',
      options: [
        { value: 'klein', label: 'klein (250 g/Person)' },
        { value: 'normal', label: 'normal (350 g/Person)' },
        { value: 'gross', label: 'groß (500 g/Person)' },
      ],
    },
  ],
  compute: (v) => {
    const erwachsene = Math.max(0, num(v.erwachsene, 0));
    const kinder = Math.max(0, num(v.kinder, 0));
    const appetit = String(v.appetit || 'normal');
    const portion = FLEISCH_PRO_PERSON[appetit] ?? FLEISCH_PRO_PERSON.normal;
    const personen = erwachsene + kinder;
    const fleischG = erwachsene * portion + kinder * portion * 0.5;
    const salatG = personen * 150;
    const brotG = personen * 100;
    return [
      { label: 'Fleisch gesamt', value: fleischG / 1000, unit: 'kg', digits: 2, primary: true },
      { label: 'Salat/Beilagen', value: salatG / 1000, unit: 'kg', digits: 2 },
      { label: 'Brot', value: brotG / 1000, unit: 'kg', digits: 2 },
      { label: 'Personen gesamt', value: personen, unit: 'Pers.', digits: 0 },
    ];
  },
  intro:
    'Beim Grillen unterschätzt man die Mengen leicht. Als Richtwert plant man pro Erwachsenem 300 bis 500 g Fleisch, je nach Appetit und ob es Beilagen gibt. Kinder essen etwa die Hälfte. Dieser Rechner kalkuliert Fleisch, Salat und Brot für deine Gästezahl – großzügig genug, damit niemand hungrig bleibt.',
  howto: [
    'Trage die Zahl der erwachsenen Gäste ein.',
    'Trage die Zahl der Kinder ein (sie zählen mit halber Portion).',
    'Wähle den erwarteten Appetit.',
    'Lies die Einkaufsmengen für Fleisch, Salat und Brot ab.',
  ],
  faq: [
    { q: 'Wie viel Fleisch pro Person ist normal?', a: 'Mit Beilagen reichen meist 300–350 g pro Erwachsenem. Wer hauptsächlich Fleisch isst (wenig Beilagen), plant eher 500 g ein.' },
    { q: 'Was zählt zu den Beilagen?', a: 'Hier ist mit "Salat/Beilagen" Kartoffelsalat, Krautsalat, Grillgemüse o. Ä. gemeint – rund 150 g pro Person.' },
    { q: 'Wie rechne ich Vegetarier?', a: 'Trage sie nicht als Fleischesser, sondern erhöhe die Beilagenmenge entsprechend. Pro vegetarischem Gast etwa 200–250 g Grillgemüse oder Halloumi.' },
    { q: 'Lieber etwas mehr einplanen?', a: 'Ja, gerade bei längeren Festen. Reste lassen sich gut am Folgetag verwerten; zu wenig ist unangenehmer.' },
  ],
  related: ['partymengen-rechner', 'getraenke-pro-gast-rechner', 'rezept-portionen-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { erwachsene: 6, kinder: 2, appetit: 'normal' },
      // Fleisch = 6*350 + 2*350*0.5 = 2100 + 350 = 2450 g = 2.45 kg
      // Personen = 8; Salat = 8*150=1200g=1.2kg; Brot=8*100=800g=0.8kg
      expect: [
        { label: 'Fleisch gesamt', value: 2.45, tolerance: 0.001 },
        { label: 'Salat/Beilagen', value: 1.2, tolerance: 0.001 },
        { label: 'Personen gesamt', value: 8, tolerance: 0 },
      ],
    },
    {
      values: { erwachsene: 10, kinder: 0, appetit: 'gross' },
      // Fleisch = 10*500 = 5000 g = 5 kg
      expect: [{ label: 'Fleisch gesamt', value: 5, tolerance: 0.001 }],
    },
  ],
};
