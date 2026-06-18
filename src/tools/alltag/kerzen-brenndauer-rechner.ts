import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

/**
 * Kerzen-Brenndauer aus Wachsmasse und Abbrandrate.
 * Faustregel: eine Kerze verbraucht je nach Durchmesser ca. 7–10 g Wachs pro Stunde.
 * Verbrauch (g/h) ist hier wählbar (dünn/mittel/dick), Brenndauer = Masse / Verbrauch.
 */
// Wachsverbrauch in Gramm pro Stunde je Kerzentyp
const VERBRAUCH_G_PRO_H: Record<string, number> = {
  duenn: 5, // Stabkerze, schmale Kerze
  mittel: 8, // klassische Haushaltskerze
  dick: 11, // dicke Stumpenkerze
};

export const tool: Tool = {
  slug: 'kerzen-brenndauer-rechner',
  category: 'alltag',
  title: 'Kerzen-Brenndauer berechnen',
  shortTitle: 'Brenndauer',
  description:
    'Schätze die Brenndauer einer Kerze aus ihrem Wachsgewicht und der Dicke – praktisch für Deko, Adventszeit und Stromausfall-Vorrat.',
  keywords: [
    'kerzen brenndauer berechnen',
    'wie lange brennt eine kerze',
    'kerze brenndauer',
    'wachsverbrauch kerze',
    'brenndauer rechner',
    'kerzen abbrand',
  ],
  formula: 'Brenndauer(h) = Wachsmasse(g) / Verbrauch(g pro Stunde)',
  inputs: [
    {
      type: 'number',
      id: 'masse',
      label: 'Wachsmasse der Kerze',
      unit: 'g',
      default: 200,
      min: 1,
      max: 5000,
      step: 5,
      help: 'Gewicht der Kerze ohne Halter; oft auf der Verpackung angegeben.',
    },
    {
      type: 'select',
      id: 'typ',
      label: 'Kerzentyp',
      default: 'mittel',
      options: [
        { value: 'duenn', label: 'dünn / Stabkerze (ca. 5 g/h)' },
        { value: 'mittel', label: 'mittel / Haushaltskerze (ca. 8 g/h)' },
        { value: 'dick', label: 'dick / Stumpen (ca. 11 g/h)' },
      ],
    },
  ],
  compute: (v) => {
    const masse = Math.max(0, num(v.masse, 0));
    const typ = String(v.typ || 'mittel');
    const verbrauch = VERBRAUCH_G_PRO_H[typ] ?? VERBRAUCH_G_PRO_H.mittel;
    const stunden = verbrauch > 0 ? masse / verbrauch : 0;
    const ganzeStunden = Math.floor(stunden);
    const minuten = Math.round((stunden - ganzeStunden) * 60);
    return [
      { label: 'Brenndauer', value: stunden, unit: 'h', digits: 1, primary: true },
      { label: 'Stunden', value: ganzeStunden, unit: 'h', digits: 0 },
      { label: 'Minuten', value: minuten, unit: 'min', digits: 0 },
      { label: 'Verbrauch', value: verbrauch, unit: 'g/h', digits: 0 },
    ];
  },
  intro:
    'Wie lange eine Kerze brennt, hängt vor allem von der Wachsmenge und der Dicke ab: Eine dünne Kerze verbraucht weniger Wachs pro Stunde als eine dicke. Als Faustregel rechnet man mit etwa 5 bis 11 g Wachs pro Stunde. Dieser Rechner gibt eine Orientierung – tatsächlich beeinflussen Dochtgröße, Zugluft und Wachsart das Ergebnis.',
  howto: [
    'Wiege die Kerze oder lies das Wachsgewicht von der Verpackung ab.',
    'Wähle den Kerzentyp (dünn, mittel oder dick).',
    'Lies die geschätzte Brenndauer in Stunden und Minuten ab.',
    'Plane bei Deko oder Vorrat etwas Puffer ein, da Zugluft den Abbrand beschleunigt.',
  ],
  faq: [
    { q: 'Wie lange brennt eine 200-g-Kerze?', a: 'Bei mittlerer Dicke (ca. 8 g/h) etwa 25 Stunden. Dünnere Kerzen halten länger, dickere kürzer pro Gramm.' },
    { q: 'Was verkürzt die Brenndauer?', a: 'Zugluft, ein zu langer Docht und häufiges An- und Auspusten. Ein gerader, etwa 1 cm kurzer Docht brennt am gleichmäßigsten.' },
    { q: 'Wie genau ist die Schätzung?', a: 'Es ist ein Richtwert. Reale Brenndauern können je nach Wachsart (Paraffin, Stearin, Bienenwachs) und Docht um 20–30 % abweichen.' },
    { q: 'Wie wiege ich eine Kerze im Glas?', a: 'Bei Kerzen im Glas zieht man das Leergewicht des Glases ab oder nutzt die Herstellerangabe zur Wachsfüllung.' },
  ],
  related: ['geraet-stromkosten-rechner', 'partymengen-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { masse: 200, typ: 'mittel' },
      // 200/8 = 25 h; ganze=25; minuten = round(0*60)=0; verbrauch=8
      expect: [
        { label: 'Brenndauer', value: 25, tolerance: 0.05 },
        { label: 'Stunden', value: 25, tolerance: 0 },
        { label: 'Minuten', value: 0, tolerance: 0 },
        { label: 'Verbrauch', value: 8, tolerance: 0 },
      ],
    },
    {
      values: { masse: 150, typ: 'dick' },
      // 150/11 = 13.636 h; ganze=13; minuten = round(0.636*60)=round(38.18)=38
      expect: [
        { label: 'Brenndauer', value: 13.6, tolerance: 0.05 },
        { label: 'Minuten', value: 38, tolerance: 0 },
      ],
    },
  ],
};
