import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'wein-pro-gast-rechner',
  category: 'alltag',
  title: 'Wein-Menge für Gäste berechnen',
  shortTitle: 'Wein pro Gast',
  description:
    'Berechne, wie viele Flaschen Wein du für deine Gäste brauchst – nach Anzahl Gäste, Dauer und Gläsern pro Stunde. Eine 0,75-l-Flasche ergibt etwa 6 Gläser.',
  keywords: [
    'wein pro gast berechnen',
    'wieviel wein pro person',
    'weinflaschen party rechner',
    'wein menge gaeste',
    'flaschen wein berechnen',
    'wein fuer feier',
  ],
  formula:
    'Gläser gesamt = Gäste × Dauer × Gläser/Stunde; Liter = Gläser × Glasgröße; Flaschen = Liter / Flaschengröße (aufgerundet)',
  inputs: [
    { type: 'number', id: 'gaeste', label: 'Anzahl Weintrinker', default: 8, min: 1, step: 1, help: 'Nur Gäste zählen, die Wein trinken.' },
    { type: 'number', id: 'stunden', label: 'Dauer', unit: 'Std.', default: 4, min: 1, step: 1 },
    { type: 'number', id: 'glaeser_pro_std', label: 'Gläser pro Gast & Stunde', default: 1.5, min: 0, step: 0.5, help: 'Richtwert: 1–2 Gläser pro Stunde.' },
    { type: 'number', id: 'glasgroesse', label: 'Glasgröße', unit: 'l', default: 0.125, min: 0.05, step: 0.025, help: 'Üblich: 0,1–0,125 l pro Glas.' },
    { type: 'number', id: 'flaschengroesse', label: 'Flaschengröße', unit: 'l', default: 0.75, min: 0.1, step: 0.05 },
  ],
  compute: (v) => {
    const gaeste = Math.max(1, Math.round(num(v.gaeste, 1)));
    const stunden = num(v.stunden);
    const glaeserProStd = num(v.glaeser_pro_std);
    const glasgroesse = num(v.glasgroesse, 0.125);
    const flGroesse = num(v.flaschengroesse, 0.75);
    const glaeserGesamt = gaeste * stunden * glaeserProStd;
    const liter = glaeserGesamt * glasgroesse;
    const flaschen = flGroesse > 0 ? Math.ceil(liter / flGroesse) : 0;
    return [
      { label: 'Benötigte Flaschen', value: flaschen, unit: 'Stück', digits: 0, primary: true, help: 'Auf volle Flaschen aufgerundet.' },
      { label: 'Wein gesamt', value: liter, unit: 'l', digits: 2 },
      { label: 'Gläser gesamt', value: glaeserGesamt, digits: 0 },
    ];
  },
  intro:
    'Bei einem Abendessen oder einer Feier stellt sich die Frage: Wie viel Wein kaufe ich? Als Richtwert trinkt ein Gast 1 bis 2 Gläser pro Stunde, und eine 0,75-Liter-Flasche ergibt etwa 6 Gläser zu 0,125 l. Dieser Rechner schätzt aus Gästezahl, Dauer und Trinktempo die nötige Flaschenzahl und rundet sicherheitshalber auf volle Flaschen auf.',
  howto: [
    'Trage ein, wie viele Gäste Wein trinken.',
    'Gib die voraussichtliche Dauer in Stunden ein.',
    'Wähle das Trinktempo (Gläser pro Gast und Stunde).',
    'Passe Glas- und Flaschengröße an und lies die benötigte Flaschenzahl ab.',
  ],
  faq: [
    { q: 'Wie viele Gläser ergibt eine Weinflasche?', a: 'Eine Standardflasche mit 0,75 l ergibt bei 0,125 l pro Glas genau 6 Gläser, bei 0,1 l etwa 7–8 Gläser.' },
    { q: 'Wie viel Wein pro Person plant man?', a: 'Als Faustregel rechnet man bei einem Essen mit etwa einer halben bis einer ganzen Flasche pro Person über den Abend – abhängig von Dauer und Trinkfreude.' },
    { q: 'Sollte ich Reserve einplanen?', a: 'Ja. Durch das Aufrunden auf volle Flaschen ist meist etwas Puffer dabei. Bei wichtigen Anlässen kannst du zusätzlich 1–2 Flaschen Reserve einplanen.' },
  ],
  related: ['getraenke-pro-gast-rechner', 'partymengen-rechner', 'getraenke-kuehlung-eismenge-rechner'],
  updated: '2026-06-19',
  examples: [
    {
      values: { gaeste: 8, stunden: 4, glaeser_pro_std: 1.5, glasgroesse: 0.125, flaschengroesse: 0.75 },
      expect: [
        { label: 'Gläser gesamt', value: 48, tolerance: 0.5 },
        { label: 'Wein gesamt', value: 6, tolerance: 0.01 },
        { label: 'Benötigte Flaschen', value: 8, tolerance: 0.5 },
      ],
    },
    {
      values: { gaeste: 6, stunden: 3, glaeser_pro_std: 1, glasgroesse: 0.1, flaschengroesse: 0.75 },
      expect: [
        { label: 'Gläser gesamt', value: 18, tolerance: 0.5 },
        { label: 'Wein gesamt', value: 1.8, tolerance: 0.01 },
        { label: 'Benötigte Flaschen', value: 3, tolerance: 0.5 },
      ],
    },
  ],
};
