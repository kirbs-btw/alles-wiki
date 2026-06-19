import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

/**
 * Empfohlene Weihnachtsbaum-Höhe abhängig von der Raumhöhe.
 * Faustregel: Baumspitze plus Christbaumständer und ggf. Spitze/Stern
 * sollten rund 30 cm Abstand zur Decke lassen. Der Ständer hebt den Baum an.
 */
const STANDARD_DECKENABSTAND = 30; // cm
const STANDARD_STAENDER = 15; // cm Höhe durch Ständer/Sockel

export const tool: Tool = {
  slug: 'weihnachtsbaum-hoehe-rechner',
  category: 'alltag',
  title: 'Weihnachtsbaum-Höhe zur Raumhöhe berechnen',
  shortTitle: 'Baumhöhe',
  description:
    'Finde die passende Weihnachtsbaum-Höhe für deine Raumhöhe – inklusive Abstand zur Decke, Ständerhöhe und Platz für Spitze oder Stern.',
  keywords: [
    'weihnachtsbaum hoehe',
    'wie hoch weihnachtsbaum kaufen',
    'baumhoehe raumhoehe',
    'tannenbaum hoehe rechner',
    'weihnachtsbaum groesse raumhoehe',
    'christbaum hoehe berechnen',
  ],
  formula:
    'Max. Baumhöhe = Raumhöhe − Deckenabstand − Ständerhöhe − Höhe der Spitze',
  inputs: [
    { type: 'number', id: 'raumhoehe', label: 'Raumhöhe', unit: 'cm', default: 250, min: 150, max: 600, step: 5 },
    { type: 'number', id: 'deckenabstand', label: 'Abstand zur Decke', unit: 'cm', default: STANDARD_DECKENABSTAND, min: 0, step: 5, help: 'Sicherheitsabstand, damit oben Platz bleibt.' },
    { type: 'number', id: 'staender', label: 'Höhe durch Ständer', unit: 'cm', default: STANDARD_STAENDER, min: 0, step: 1, help: 'Der Ständer hebt den Baum an.' },
    { type: 'number', id: 'spitze', label: 'Höhe der Spitze / des Sterns', unit: 'cm', default: 15, min: 0, step: 1 },
  ],
  compute: (v) => {
    const raumhoehe = num(v.raumhoehe, 250);
    const deckenabstand = num(v.deckenabstand);
    const staender = num(v.staender);
    const spitze = num(v.spitze);
    const maxBaumRoh = raumhoehe - deckenabstand - staender - spitze;
    const maxBaum = Math.max(0, maxBaumRoh);
    return [
      { label: 'Maximale Baumhöhe', value: maxBaum, unit: 'cm', digits: 0, primary: true },
      { label: 'Maximale Baumhöhe', value: maxBaum / 100, unit: 'm', digits: 2 },
      { label: 'Belegte Höhe (Ständer + Spitze + Abstand)', value: deckenabstand + staender + spitze, unit: 'cm', digits: 0 },
    ];
  },
  intro:
    'Der Weihnachtsbaum soll den Raum füllen, aber die Spitze darf nicht an der Decke knicken. Dieser Rechner zieht von der Raumhöhe den Sicherheitsabstand zur Decke, die Höhe durch den Ständer und den Platz für Spitze oder Stern ab. Das Ergebnis ist die maximale Höhe des Baums beim Kauf.',
  howto: [
    'Miss die Raumhöhe (Boden bis Decke) und trage sie ein.',
    'Lege einen Sicherheitsabstand zur Decke fest (z. B. 30 cm).',
    'Gib an, wie hoch der Ständer den Baum anhebt.',
    'Berücksichtige die Höhe von Spitze oder Stern und lies die maximale Baumhöhe ab.',
  ],
  faq: [
    { q: 'Wie viel Abstand zur Decke sollte ein Weihnachtsbaum haben?', a: 'Üblich sind etwa 20 bis 30 cm, damit die Spitze samt Stern nicht an der Decke ansteht und sich der Baum frei schmücken lässt.' },
    { q: 'Zählt die Ständerhöhe wirklich mit?', a: 'Ja. Ein klassischer Ständer hebt den Stamm um rund 10 bis 20 cm an. Diese Höhe geht von der nutzbaren Baumhöhe ab.' },
    { q: 'Wie groß sollte der Baum im Verhältnis zum Raum sein?', a: 'In Standardräumen mit 2,50 m Decke passen Bäume bis etwa 1,90 bis 2,00 m gut. Der Rechner berücksichtigt deine tatsächlichen Werte exakt.' },
  ],
  related: ['koerpergroesse-umrechner', 'geschenkpapier-bedarf-rechner', 'adventskalender-budget-rechner'],
  updated: '2026-06-19',
  examples: [
    {
      values: { raumhoehe: 250, deckenabstand: 30, staender: 15, spitze: 15 },
      // 250 - 30 - 15 - 15 = 190
      expect: [
        { label: 'Maximale Baumhöhe', value: 190, tolerance: 0.5 },
      ],
    },
    {
      values: { raumhoehe: 300, deckenabstand: 30, staender: 20, spitze: 20 },
      // 300 - 30 - 20 - 20 = 230
      expect: [{ label: 'Maximale Baumhöhe', value: 230, tolerance: 0.5 }],
    },
  ],
};
