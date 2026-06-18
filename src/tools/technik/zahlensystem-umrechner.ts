import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

// Liest eine Zeichenkette im angegebenen Zahlensystem als Dezimalwert ein.
function parseInSystem(text: string, basis: number): number {
  const clean = text.trim().toLowerCase().replace(/^0x/, '').replace(/^0b/, '');
  if (clean === '') return 0;
  const wert = parseInt(clean, basis);
  return Number.isFinite(wert) ? wert : 0;
}

export const tool: Tool = {
  slug: 'zahlensystem-umrechner',
  category: 'technik',
  title: 'Zahlensystem-Umrechner (Binär, Dezimal, Hex)',
  shortTitle: 'Zahlensystem',
  description:
    'Rechne Zahlen zwischen Binär-, Dezimal-, Oktal- und Hexadezimalsystem um – mit Eingabe in beliebiger Basis und allen Ergebnissen auf einen Blick.',
  keywords: [
    'zahlensystem umrechner',
    'binär in dezimal',
    'dezimal in hex',
    'hexadezimal umrechnen',
    'binärzahl umrechnen',
    'dezimal binär hex rechner',
  ],
  formula:
    'Dezimalwert = Summe der Ziffern × Basis^Stelle; Ausgabe = Dezimalwert in Zielbasis (2, 8, 10, 16)',
  inputs: [
    {
      type: 'number',
      id: 'wert',
      label: 'Wert (im gewählten System)',
      default: 255,
      min: 0,
      step: 1,
      help: 'Ganze Zahl. Hex-Ziffern A–F werden in der dezimalen Eingabe nicht unterstützt – nutze für Hex/Binär die Beispiele im Text.',
    },
    {
      type: 'select',
      id: 'von',
      label: 'Eingabesystem',
      default: 'dez',
      options: [
        { value: 'bin', label: 'Binär (Basis 2)' },
        { value: 'oct', label: 'Oktal (Basis 8)' },
        { value: 'dez', label: 'Dezimal (Basis 10)' },
        { value: 'hex', label: 'Hexadezimal (Basis 16)' },
      ],
      help: 'Gibt an, in welcher Basis der eingegebene Wert interpretiert wird.',
    },
  ],
  compute: (v) => {
    const basisMap: Record<string, number> = { bin: 2, oct: 8, dez: 10, hex: 16 };
    const basis = basisMap[String(v.von)] ?? 10;
    // Eingabe als Ziffernfolge in der Quellbasis interpretieren.
    const rohtext = String(v.wert).replace(/[^0-9a-fA-F]/g, '');
    const dezimal = parseInSystem(rohtext, basis);
    const ganz = Math.max(0, Math.floor(dezimal));
    return [
      { label: 'Dezimal', value: ganz, digits: 0, primary: true },
      { label: 'Binär', value: ganz.toString(2) },
      { label: 'Oktal', value: ganz.toString(8) },
      { label: 'Hexadezimal', value: ganz.toString(16).toUpperCase() },
    ];
  },
  intro:
    'Computer rechnen intern binär, Menschen meist dezimal, und in der Technik begegnen einem häufig hexadezimale Werte (z. B. Farbcodes oder Speicheradressen). Dieser Umrechner interpretiert deine Eingabe in der gewählten Basis und zeigt das Ergebnis gleichzeitig im Binär-, Oktal-, Dezimal- und Hexadezimalsystem an. So lassen sich Zahlen schnell zwischen den Welten übersetzen.',
  howto: [
    'Den umzurechnenden Wert eingeben.',
    'Das Eingabesystem wählen (binär, oktal, dezimal oder hexadezimal).',
    'Die Darstellungen in allen vier Zahlensystemen ablesen.',
  ],
  faq: [
    {
      q: 'Wie funktioniert die Umrechnung von Dezimal nach Hex?',
      a: 'Der Dezimalwert wird wiederholt durch 16 geteilt; die Reste ergeben von unten nach oben die Hex-Ziffern. 255 wird so zu FF, weil 255 = 15·16 + 15 ist und 15 als F geschrieben wird.',
    },
    {
      q: 'Warum sind führende Nullen verschwunden?',
      a: 'Zahlensysteme stellen den reinen Zahlenwert dar. Führende Nullen ändern den Wert nicht und werden daher nicht ausgegeben. Bei Bytes ergänzt man sie bei Bedarf manuell auf 8 Stellen.',
    },
    {
      q: 'Werden Nachkommastellen unterstützt?',
      a: 'Nein, dieser Rechner arbeitet mit ganzen Zahlen. Der Wert wird vor der Umrechnung auf eine ganze Zahl gerundet.',
    },
  ],
  related: ['bit-byte-umrechner', 'hex-rgb-umrechner', 'subnetz-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { wert: 255, von: 'dez' },
      expect: [{ label: 'Dezimal', value: 255, tolerance: 0 }],
    },
    {
      values: { wert: 1010, von: 'bin' },
      expect: [{ label: 'Dezimal', value: 10, tolerance: 0 }],
    },
  ],
};
