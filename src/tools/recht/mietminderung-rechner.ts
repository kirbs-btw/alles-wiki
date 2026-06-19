import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'mietminderung-rechner',
  category: 'recht',
  title: 'Mietminderung-Rechner (Minderungsbetrag)',
  shortTitle: 'Mietminderung',
  description:
    'Berechne den Minderungsbetrag bei einem Mietmangel: aus Bruttomiete, Minderungsquote in Prozent und der Dauer des Mangels. Orientierung, kein Rechtsrat.',
  keywords: [
    'mietminderung rechner',
    'mietminderung berechnen',
    'minderungsbetrag mietmangel',
    'mietminderung prozent',
    'wie viel mietminderung',
    'miete mindern berechnen',
  ],
  formula:
    'Minderung je Monat = Bruttomiete × Quote;  Minderung im Zeitraum = (Bruttomiete / 30) × Quote × Manageltage',
  inputs: [
    {
      type: 'number',
      id: 'miete',
      label: 'Bruttomiete (Warmmiete) pro Monat',
      unit: '€',
      default: 900,
      min: 0,
      step: 10,
      help: 'Maßstab der Minderung ist die Bruttomiete inkl. Betriebskosten (Warmmiete).',
    },
    {
      type: 'number',
      id: 'quote',
      label: 'Minderungsquote',
      unit: '%',
      default: 20,
      min: 0,
      max: 100,
      step: 1,
      help: 'Angemessene Quote richtet sich nach der Schwere des Mangels (Orientierung an Gerichtsurteilen).',
    },
    {
      type: 'number',
      id: 'tage',
      label: 'Dauer des Mangels',
      unit: 'Tage',
      default: 30,
      min: 0,
      max: 3650,
      step: 1,
      help: 'Anzahl der Tage, an denen der Mangel bestand. Ein Monat wird mit 30 Tagen gerechnet.',
    },
  ],
  compute: (v) => {
    const miete = Math.max(0, num(v.miete));
    const quote = Math.min(Math.max(0, num(v.quote)), 100);
    const tage = Math.max(0, num(v.tage));
    const minderungProMonat = miete * (quote / 100);
    const proTag = miete / 30;
    const minderungZeitraum = proTag * (quote / 100) * tage;
    const reduzierteMiete = Math.max(0, miete - minderungProMonat);
    return [
      { label: 'Minderung im Zeitraum', value: minderungZeitraum, unit: '€', digits: 2, primary: true },
      { label: 'Minderung je Monat', value: minderungProMonat, unit: '€', digits: 2 },
      { label: 'Geminderte Monatsmiete', value: reduzierteMiete, unit: '€', digits: 2 },
    ];
  },
  intro:
    'Ist die Wohnung mangelhaft – etwa durch Schimmel, Heizungsausfall oder Lärm –, darf die Miete gemindert werden (§ 536 BGB). Bezugsgröße ist die Bruttomiete (Warmmiete). Die angemessene Quote hängt vom Einzelfall ab; Gerichte orientieren sich an Vergleichsurteilen. Dieser Rechner ermittelt den Minderungsbetrag aus Miete, Quote und Manageltagen (Monat = 30 Tage) als Orientierung und ersetzt keine Rechtsberatung.',
  howto: [
    'Bruttomiete (Warmmiete) pro Monat eintragen.',
    'Minderungsquote in Prozent schätzen oder aus Vergleichsurteilen übernehmen.',
    'Dauer des Mangels in Tagen angeben.',
    'Minderungsbetrag für den Zeitraum und pro Monat ablesen.',
  ],
  faq: [
    {
      q: 'Von welcher Miete wird gemindert?',
      a: 'Maßstab ist nach der Rechtsprechung des BGH die Bruttomiete (Warmmiete) inklusive Betriebskosten, nicht die Nettokaltmiete.',
    },
    {
      q: 'Wie hoch darf ich mindern?',
      a: 'Es gibt keine festen Sätze. Die Quote richtet sich nach Art und Schwere des Mangels. Mietervereine und „Mietminderungstabellen“ aus Gerichtsurteilen geben Anhaltspunkte – im Streitfall entscheidet das Gericht.',
    },
    {
      q: 'Muss ich den Mangel melden?',
      a: 'Ja. Die Minderung tritt zwar kraft Gesetzes ein, doch der Vermieter muss den Mangel kennen. Zeige ihn unverzüglich schriftlich an, sonst riskierst du Schadensersatzansprüche.',
    },
    {
      q: 'Ist diese Berechnung verbindlich?',
      a: 'Nein. Der Rechner liefert eine reine Orientierung. Eine zu hohe Minderung kann zu Mietrückständen und sogar zur Kündigung führen – lass dich im Zweifel beraten.',
    },
  ],
  related: ['nebenkostenabrechnung-frist-rechner', 'nebenkosten-umlage-rechner', 'verzugszinsen-rechner'],
  examples: [
    {
      // 900 € Warmmiete, 20 % Quote, 10 Tage: (900/30)*0.2*10 = 60 €
      values: { miete: 900, quote: 20, tage: 10 },
      expect: [
        { label: 'Minderung im Zeitraum', value: 60, tolerance: 0.01 },
        { label: 'Minderung je Monat', value: 180, tolerance: 0.01 },
        { label: 'Geminderte Monatsmiete', value: 720, tolerance: 0.01 },
      ],
    },
    {
      // 1000 € Warmmiete, 50 % Quote, 30 Tage: (1000/30)*0.5*30 = 500 €
      values: { miete: 1000, quote: 50, tage: 30 },
      expect: [
        { label: 'Minderung im Zeitraum', value: 500, tolerance: 0.01 },
        { label: 'Minderung je Monat', value: 500, tolerance: 0.01 },
        { label: 'Geminderte Monatsmiete', value: 500, tolerance: 0.01 },
      ],
    },
  ],
  updated: '2026-06-19',
};
