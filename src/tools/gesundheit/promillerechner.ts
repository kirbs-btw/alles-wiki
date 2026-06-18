import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'promillerechner',
  category: 'gesundheit',
  title: 'Promillerechner (Widmark)',
  shortTitle: 'Promille',
  description:
    'Schätze deinen Blutalkohol in Promille nach der Widmark-Formel aus Getränken, Gewicht und Geschlecht – inklusive geschätzter Abbauzeit.',
  keywords: [
    'promillerechner',
    'promille berechnen',
    'blutalkohol rechner',
    'widmark formel',
    'alkohol abbau rechner',
    'wie viel promille',
    'alkohol promille',
  ],
  formula:
    'Promille = Alkohol(g) / (Gewicht(kg) × r); r = 0,68 Mann / 0,55 Frau; Abbau ≈ 0,15 ‰/h',
  inputs: [
    {
      type: 'select', id: 'geschlecht', label: 'Geschlecht', default: 'mann',
      options: [
        { value: 'mann', label: 'Männlich (Faktor 0,68)' },
        { value: 'frau', label: 'Weiblich (Faktor 0,55)' },
      ],
    },
    { type: 'number', id: 'gewicht', label: 'Körpergewicht', unit: 'kg', default: 80, min: 20, step: 1 },
    { type: 'number', id: 'bier', label: 'Bier (0,5 l, 5 %)', unit: 'Gläser', default: 2, min: 0, step: 1, help: 'Großes Bier mit etwa 20 g Alkohol' },
    { type: 'number', id: 'wein', label: 'Wein (0,2 l, 11 %)', unit: 'Gläser', default: 0, min: 0, step: 1, help: 'Glas Wein mit etwa 17,6 g Alkohol' },
    { type: 'number', id: 'schnaps', label: 'Schnaps (4 cl, 40 %)', unit: 'Gläser', default: 0, min: 0, step: 1, help: 'Shot mit etwa 12,8 g Alkohol' },
    { type: 'number', id: 'stunden', label: 'Stunden seit Trinkbeginn', unit: 'h', default: 0, min: 0, step: 0.5 },
  ],
  compute: (v) => {
    const r = String(v.geschlecht) === 'frau' ? 0.55 : 0.68;
    const g = num(v.gewicht);
    // Alkoholmenge in Gramm (Dichte Ethanol 0,8 g/ml)
    const alkBier = num(v.bier) * 500 * 0.05 * 0.8;
    const alkWein = num(v.wein) * 200 * 0.11 * 0.8;
    const alkSchnaps = num(v.schnaps) * 40 * 0.4 * 0.8;
    const alkGesamt = alkBier + alkWein + alkSchnaps;
    const promilleStart = g * r > 0 ? alkGesamt / (g * r) : 0;
    const stunden = num(v.stunden);
    const abgebaut = 0.15 * stunden;
    let promilleAktuell = promilleStart - abgebaut;
    if (promilleAktuell < 0) promilleAktuell = 0;
    const restStunden = promilleAktuell > 0 ? promilleAktuell / 0.15 : 0;
    return [
      { label: 'Aktueller Blutalkohol', value: promilleAktuell, unit: '‰', digits: 2, primary: true },
      { label: 'Maximalwert (theoretischer Spitzenwert)', value: promilleStart, unit: '‰', digits: 2 },
      { label: 'Aufgenommener Alkohol', value: alkGesamt, unit: 'g', digits: 0 },
      { label: 'Geschätzte Abbauzeit ab jetzt', value: restStunden, unit: 'h', digits: 1 },
    ];
  },
  intro:
    'Der Promillerechner schätzt den Blutalkoholgehalt nach der Widmark-Formel. Dabei wird die aufgenommene Alkoholmenge ins Verhältnis zum Körpergewicht und einem geschlechtsabhängigen Verteilungsfaktor gesetzt. Der Körper baut pro Stunde im Schnitt rund 0,1 bis 0,15 Promille ab. Die Werte sind grobe Schätzungen und nicht für die Beurteilung der Fahrtüchtigkeit geeignet.',
  howto: [
    'Geschlecht und Körpergewicht eingeben.',
    'Anzahl der getrunkenen Biere, Weine und Schnäpse erfassen.',
    'Stunden seit Trinkbeginn eingeben, um den Abbau zu berücksichtigen.',
    'Geschätzten Promillewert und Abbauzeit ablesen.',
  ],
  faq: [
    { q: 'Wie genau ist der Promillerechner?', a: 'Die Widmark-Formel liefert nur eine grobe Schätzung. Tatsächliche Werte hängen von Trinktempo, Mageninhalt, Tagesform und individuellem Stoffwechsel ab und können deutlich abweichen.' },
    { q: 'Wie schnell baut der Körper Alkohol ab?', a: 'Im Durchschnitt etwa 0,1 bis 0,15 Promille pro Stunde. Dieser Wert lässt sich nicht durch Kaffee, Sport oder kalte Duschen beschleunigen.' },
    { q: 'Ab wann darf man nicht mehr Auto fahren?', a: 'In Deutschland gilt ab 0,5 Promille eine Ordnungswidrigkeit, ab 1,1 Promille eine Straftat. Für Fahranfänger und unter 21-Jährige gilt 0,0 Promille. Verlasse dich nie auf einen Rechner.' },
    { q: 'Warum ist der Faktor bei Frauen niedriger?', a: 'Frauen haben im Schnitt einen geringeren Körperwasseranteil, in dem sich der Alkohol verteilt. Daher ein niedrigerer Verteilungsfaktor (0,55 statt 0,68) und höhere Promillewerte bei gleicher Menge.' },
    { q: 'Wie viel Alkohol steckt in einem Glas?', a: 'Ein großes Bier (0,5 l, 5 %) enthält etwa 20 g, ein Glas Wein (0,2 l, 11 %) rund 17 g und ein Schnaps (4 cl, 40 %) etwa 13 g reinen Alkohol.' },
  ],
  related: ['kalorienbedarf-rechner', 'wasserbedarf-rechner', 'bmi-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { geschlecht: 'mann', gewicht: 80, bier: 2, wein: 0, schnaps: 0, stunden: 0 },
      expect: [
        { label: 'Aufgenommener Alkohol', value: 40, tolerance: 0.5 },
        { label: 'Maximalwert (theoretischer Spitzenwert)', value: 0.74, tolerance: 0.02 },
      ],
    },
  ],
};
