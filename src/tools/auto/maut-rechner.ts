import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'maut-rechner',
  category: 'auto',
  title: 'Maut-Rechner (Strecke nach km-Satz)',
  shortTitle: 'Maut',
  description:
    'Berechne die Mautkosten einer Strecke aus Kilometern und Mautsatz pro Kilometer – für Hin- und Rückfahrt sowie pro Person.',
  keywords: [
    'maut rechner strecke',
    'mautkosten berechnen',
    'maut pro km rechner',
    'autobahn maut kosten',
    'maut hin und rückfahrt',
  ],
  formula:
    'Mautkosten = mautpflichtige Strecke × Mautsatz je km',
  intro:
    'Auf vielen Auslandsfahrten fallen streckenabhängige Mautgebühren an. Wenn der Mautsatz pro Kilometer bekannt ist, lassen sich die Kosten einer Strecke schnell überschlagen – für eine Fahrt, für Hin- und Rückfahrt und umgelegt pro Mitfahrer. Die Mautsätze unterscheiden sich je Land und Fahrzeugklasse (Orientierung, Stand 2026).',
  inputs: [
    { type: 'number', id: 'strecke', label: 'Mautpflichtige Strecke (einfach)', unit: 'km', default: 300, min: 0, step: 1, help: 'Nur die mautpflichtigen Kilometer.' },
    { type: 'number', id: 'satz', label: 'Mautsatz', unit: '€/km', default: 0.09, min: 0, step: 0.005, help: 'z. B. Italien Pkw ca. 0,07–0,09 €/km.' },
    {
      type: 'select', id: 'richtung', label: 'Fahrt', default: 'hin_rueck',
      options: [
        { value: 'einfach', label: 'Nur Hinfahrt' },
        { value: 'hin_rueck', label: 'Hin- und Rückfahrt' },
      ],
    },
    { type: 'number', id: 'personen', label: 'Personen im Fahrzeug', default: 2, min: 1, step: 1, help: 'Für die Aufteilung der Kosten.' },
  ],
  compute: (v) => {
    const strecke = num(v.strecke);
    const satz = num(v.satz);
    const richtung = String(v.richtung || 'hin_rueck');
    const personen = Math.max(1, num(v.personen));
    const faktor = richtung === 'hin_rueck' ? 2 : 1;
    const kostenEinfach = strecke * satz;
    const kostenGesamt = kostenEinfach * faktor;
    const proPerson = kostenGesamt / personen;
    return [
      { label: 'Mautkosten gesamt', value: kostenGesamt, unit: '€', digits: 2, primary: true },
      { label: 'Mautkosten je Fahrt', value: kostenEinfach, unit: '€', digits: 2 },
      { label: 'Kosten pro Person', value: proPerson, unit: '€', digits: 2 },
    ];
  },
  howto: [
    'Mautpflichtige Strecke für eine Fahrt in Kilometern eintragen.',
    'Mautsatz je Kilometer angeben (länderabhängig).',
    'Wählen, ob nur Hinfahrt oder Hin- und Rückfahrt gerechnet wird.',
    'Personenzahl ergänzen, um die Kosten pro Mitfahrer zu sehen.',
  ],
  faq: [
    { q: 'Gilt der Rechner für Vignetten-Länder?', a: 'Nein. In Ländern mit Vignette (z. B. Österreich, Schweiz) zahlst du eine Pauschale unabhängig von der Strecke. Dieser Rechner ist für streckenabhängige Maut wie in Italien, Frankreich oder Spanien gedacht.' },
    { q: 'Woher bekomme ich den Mautsatz?', a: 'Online-Routenplaner der Mautbetreiber oder Reiseportale zeigen die konkreten Gebühren. Als grober Pkw-Richtwert dienen rund 0,07–0,10 € pro Kilometer in Südeuropa.' },
    { q: 'Sind Lkw und Wohnmobile teurer?', a: 'Ja. Die Maut richtet sich nach Fahrzeugklasse (Achszahl, Höhe, Gewicht). Wohnmobile und Gespanne werden oft höher eingestuft – passe dafür den Mautsatz entsprechend an.' },
  ],
  related: ['fahrzeit-rechner', 'urlaub-tankkosten-rechner', 'spritkosten-rechner'],
  updated: '2026-06-19',
  examples: [
    {
      values: { strecke: 300, satz: 0.09, richtung: 'hin_rueck', personen: 2 },
      // einfach = 27; gesamt = 54; pro Person = 27
      expect: [
        { label: 'Mautkosten gesamt', value: 54, tolerance: 0.01 },
        { label: 'Kosten pro Person', value: 27, tolerance: 0.01 },
      ],
    },
    {
      values: { strecke: 500, satz: 0.08, richtung: 'einfach', personen: 4 },
      // einfach = gesamt = 40; pro Person = 10
      expect: [{ label: 'Kosten pro Person', value: 10, tolerance: 0.01 }],
    },
  ],
};
