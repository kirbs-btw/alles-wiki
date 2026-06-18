import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'wertverlust-rechner',
  category: 'auto',
  title: 'Wertverlust-Rechner (Auto)',
  shortTitle: 'Wertverlust',
  description:
    'Berechne den Wertverlust deines Autos pro Jahr und den voraussichtlichen Restwert nach mehreren Jahren – wahlweise prozentual oder linear.',
  keywords: [
    'wertverlust auto berechnen',
    'restwert auto rechner',
    'abschreibung auto prozent',
    'wertverlust pro jahr',
    'autowert nach jahren',
    'wertminderung fahrzeug',
    'restwert berechnen',
  ],
  formula: 'Restwert = Kaufpreis × (1 − Prozent/100)^Jahre (prozentual) bzw. Kaufpreis − Verlust×Jahre (linear)',
  inputs: [
    { type: 'number', id: 'kaufpreis', label: 'Kaufpreis', unit: '€', default: 30000, min: 0, step: 100 },
    { type: 'number', id: 'prozent', label: 'Wertverlust pro Jahr', unit: '%', default: 15, min: 0, max: 100, step: 0.5 },
    { type: 'number', id: 'jahre', label: 'Haltedauer', unit: 'Jahre', default: 5, min: 0, step: 1 },
    {
      type: 'select', id: 'methode', label: 'Berechnungsmethode', default: 'prozentual',
      options: [
        { value: 'prozentual', label: 'Prozentual (realistisch)' },
        { value: 'linear', label: 'Linear (gleichbleibend)' },
      ],
      help: 'Prozentual bildet den steileren Verlust der ersten Jahre ab; linear verteilt gleichmäßig.',
    },
  ],
  compute: (v) => {
    const kaufpreis = num(v.kaufpreis);
    const prozent = num(v.prozent);
    const jahre = num(v.jahre);
    const methode = String(v.methode || 'prozentual');
    let restwert: number;
    if (methode === 'linear') {
      const verlustProJahr = kaufpreis * (prozent / 100);
      restwert = Math.max(0, kaufpreis - verlustProJahr * jahre);
    } else {
      restwert = kaufpreis * Math.pow(1 - prozent / 100, jahre);
    }
    const gesamtverlust = kaufpreis - restwert;
    const verlustProJahrSchnitt = jahre > 0 ? gesamtverlust / jahre : 0;
    const restwertProzent = kaufpreis > 0 ? (restwert / kaufpreis) * 100 : 0;
    return [
      { label: 'Restwert nach Haltedauer', value: restwert, unit: '€', digits: 0, primary: true },
      { label: 'Gesamter Wertverlust', value: gesamtverlust, unit: '€', digits: 0 },
      { label: 'Wertverlust pro Jahr (Ø)', value: verlustProJahrSchnitt, unit: '€', digits: 0 },
      { label: 'Restwert in Prozent', value: restwertProzent, unit: '%', digits: 1 },
    ];
  },
  intro:
    'Ein Auto verliert am stärksten in den ersten Jahren an Wert: Neuwagen büßen oft schon im ersten Jahr rund 20 bis 25 Prozent ein. Die prozentuale Methode bildet diesen degressiven Verlauf realistisch ab, während die lineare Methode den Verlust gleichmäßig verteilt – nützlich für grobe Budgetplanung.',
  howto: [
    'Kaufpreis des Fahrzeugs eintragen (neu oder gebraucht).',
    'Geschätzten jährlichen Wertverlust in Prozent angeben (Neuwagen ca. 15–20 %).',
    'Geplante Haltedauer in Jahren wählen.',
    'Methode auswählen: prozentual für realistische, linear für gleichmäßige Verteilung.',
  ],
  faq: [
    { q: 'Wie viel Wertverlust ist normal?', a: 'Neuwagen verlieren im ersten Jahr grob 20–25 %, danach jährlich rund 5–15 %. Über fünf Jahre bleiben oft nur noch 40–50 % des Neupreises.' },
    { q: 'Was beeinflusst den Wertverlust?', a: 'Marke und Modell, Laufleistung, Zustand, Ausstattung, Kraftstoffart, Unfallfreiheit und Nachfrage am Gebrauchtmarkt spielen die größte Rolle.' },
    { q: 'Prozentual oder linear – was stimmt eher?', a: 'Die prozentuale (degressive) Methode entspricht der Realität deutlich besser, weil der Verlust anfangs am größten ist.' },
    { q: 'Verlieren Elektroautos mehr Wert?', a: 'Das hängt stark vom Modell und der Akku-Garantie ab. Pauschale Aussagen sind schwierig; nutze daher einen modellspezifischen Prozentsatz.' },
  ],
  related: ['kosten-pro-km-rechner', 'leasing-rechner', 'durchschnittsverbrauch-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { kaufpreis: 30000, prozent: 15, jahre: 5, methode: 'prozentual' },
      expect: [{ label: 'Restwert nach Haltedauer', value: 13311, tolerance: 5 }],
    },
    {
      values: { kaufpreis: 30000, prozent: 15, jahre: 5, methode: 'linear' },
      expect: [{ label: 'Restwert nach Haltedauer', value: 7500, tolerance: 1 }],
    },
  ],
};
