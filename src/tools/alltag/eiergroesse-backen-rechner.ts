import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

/**
 * Eier beim Backen zwischen Größenklassen umrechnen.
 * Rezepte gehen meist von Größe M aus. Durchschnittliches Gewicht des essbaren
 * Anteils (ohne Schale) je Handelsklasse (Stand 2026):
 *  S:  ca. 42 g brutto -> ~37 g ohne Schale
 *  M:  ca. 53 g brutto -> ~47 g ohne Schale
 *  L:  ca. 63 g brutto -> ~56 g ohne Schale
 *  XL: ca. 73 g brutto -> ~65 g ohne Schale
 * Die Umrechnung erfolgt über das Gesamtgewicht des Eiinhalts.
 */
const EI_INHALT_G: Record<string, number> = {
  S: 37,
  M: 47,
  L: 56,
  XL: 65,
};

export const tool: Tool = {
  slug: 'eiergroesse-backen-rechner',
  category: 'alltag',
  title: 'Eiergröße beim Backen umrechnen',
  shortTitle: 'Eiergröße umrechnen',
  description:
    'Rechne Eier beim Backen zwischen den Größen S, M, L und XL um – wie viele Eier deiner Größe ein Rezept braucht, wenn es eine andere Eigröße vorgibt.',
  keywords: [
    'eiergroesse umrechnen',
    'eier groesse l statt m',
    'wie viele eier ersetzen',
    'eier backen groesse',
    'ei groesse m l backen',
    'eier umrechnen rezept',
  ],
  formula:
    'Eier benötigt = (Anzahl Rezept × Inhalt Rezeptgröße) / Inhalt vorhandene Größe',
  inputs: [
    { type: 'number', id: 'anzahl', label: 'Eier laut Rezept', default: 4, min: 1, step: 1 },
    {
      type: 'select',
      id: 'rezeptgroesse',
      label: 'Eigröße im Rezept',
      default: 'M',
      help: 'Rezepte ohne Angabe meinen meist Größe M.',
      options: [
        { value: 'S', label: 'S (klein, ~37 g Inhalt)' },
        { value: 'M', label: 'M (mittel, ~47 g Inhalt)' },
        { value: 'L', label: 'L (groß, ~56 g Inhalt)' },
        { value: 'XL', label: 'XL (sehr groß, ~65 g Inhalt)' },
      ],
    },
    {
      type: 'select',
      id: 'vorhandengroesse',
      label: 'Deine vorhandene Eigröße',
      default: 'L',
      options: [
        { value: 'S', label: 'S (klein, ~37 g Inhalt)' },
        { value: 'M', label: 'M (mittel, ~47 g Inhalt)' },
        { value: 'L', label: 'L (groß, ~56 g Inhalt)' },
        { value: 'XL', label: 'XL (sehr groß, ~65 g Inhalt)' },
      ],
    },
  ],
  compute: (v) => {
    const anzahl = Math.max(1, Math.round(num(v.anzahl, 1)));
    const rezeptInhalt = EI_INHALT_G[String(v.rezeptgroesse)] ?? EI_INHALT_G.M;
    const vorhandenInhalt = EI_INHALT_G[String(v.vorhandengroesse)] ?? EI_INHALT_G.L;
    const gesamtInhalt = anzahl * rezeptInhalt;
    const eierBenoetigt = vorhandenInhalt > 0 ? gesamtInhalt / vorhandenInhalt : 0;
    return [
      { label: 'Benötigte Eier (gerundet)', value: Math.round(eierBenoetigt), unit: 'Stück', digits: 0, primary: true },
      { label: 'Rechnerisch genau', value: eierBenoetigt, unit: 'Stück', digits: 2 },
      { label: 'Gesamter Eiinhalt im Rezept', value: gesamtInhalt, unit: 'g', digits: 0 },
    ];
  },
  intro:
    'Rezepte geben Eier meist als Stückzahl an und meinen damit Größe M. Hast du nur große (L) oder sehr große (XL) Eier, kann das Verhältnis von Flüssigkeit und Mehl kippen. Dieser Rechner wandelt über das durchschnittliche Inhaltsgewicht je Größenklasse um, sodass die Eimenge im Teig stimmt. Die Gewichte sind Durchschnittswerte (Stand 2026).',
  howto: [
    'Gib ein, wie viele Eier das Rezept verlangt.',
    'Wähle die im Rezept gemeinte Eigröße (ohne Angabe meist M).',
    'Wähle die Eigröße, die du zu Hause hast.',
    'Lies ab, wie viele deiner Eier du verwenden solltest.',
  ],
  faq: [
    { q: 'Welche Eigröße meinen Rezepte ohne Angabe?', a: 'In Deutschland gehen die meisten Back- und Kochrezepte von Eiern der Größe M aus, sofern nichts anderes dabeisteht.' },
    { q: 'Wie viel wiegt ein Ei ohne Schale?', a: 'Als Richtwert: S etwa 37 g, M etwa 47 g, L etwa 56 g und XL etwa 65 g essbarer Anteil. Die Schale macht rund 10 % aus.' },
    { q: 'Was, wenn das Ergebnis krumm ist?', a: 'Bei Werten wie 3,4 Eiern kannst du auf 3 abrunden und etwas Milch oder Wasser ergänzen, oder ein Ei verquirlen und nur einen Teil verwenden. Der genaue rechnerische Wert wird zusätzlich angezeigt.' },
    { q: 'Gilt das auch fürs herzhafte Kochen?', a: 'Die Umrechnung passt überall dort, wo es auf die Eimenge ankommt, etwa bei Rührei, Aufläufen oder Pfannkuchen. Beim Backen ist sie besonders wichtig, weil das Verhältnis der Zutaten zählt.' },
  ],
  related: ['rezept-portionen-rechner', 'cup-in-gramm-rechner', 'backform-umrechnen-rechner'],
  updated: '2026-06-19',
  examples: [
    {
      values: { anzahl: 4, rezeptgroesse: 'M', vorhandengroesse: 'L' },
      // gesamt = 4*47 = 188 g; 188/56 = 3.357 -> gerundet 3
      expect: [
        { label: 'Benötigte Eier (gerundet)', value: 3, tolerance: 0 },
        { label: 'Rechnerisch genau', value: 3.36, tolerance: 0.02 },
        { label: 'Gesamter Eiinhalt im Rezept', value: 188, tolerance: 0.5 },
      ],
    },
    {
      values: { anzahl: 3, rezeptgroesse: 'L', vorhandengroesse: 'M' },
      // gesamt = 3*56 = 168 g; 168/47 = 3.574 -> gerundet 4
      expect: [{ label: 'Benötigte Eier (gerundet)', value: 4, tolerance: 0 }],
    },
  ],
};
