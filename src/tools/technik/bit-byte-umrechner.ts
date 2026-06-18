import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

// Faktoren in Bit je Einheit (dezimal, Basis 1000).
const FAKTOR_BIT: Record<string, number> = {
  bit: 1,
  byte: 8,
  kbit: 1e3, // 1 kbit = 1000 bit
  kbyte: 8 * 1e3,
  mbit: 1e6,
  mbyte: 8 * 1e6,
  gbit: 1e9,
  gbyte: 8 * 1e9,
};

export const tool: Tool = {
  slug: 'bit-byte-umrechner',
  category: 'technik',
  title: 'Bit- & Byte-Umrechner',
  shortTitle: 'Bit / Byte',
  description:
    'Rechne zwischen Bit, Byte, Kilobit, Megabit und ihren Byte-Pendants um – mit dem Grundgesetz 1 Byte = 8 Bit und dezimaler Skalierung.',
  keywords: [
    'bit in byte umrechnen',
    'byte in bit',
    'bit byte rechner',
    'megabit megabyte umrechnen',
    'wie viele bit hat ein byte',
    'bit umrechner',
    'kbit in kb',
  ],
  formula: '1 Byte = 8 Bit; Ergebnis = Wert × Faktor(Quelle in Bit) / Faktor(Ziel in Bit)',
  inputs: [
    { type: 'number', id: 'wert', label: 'Wert', default: 1, min: 0, step: 1 },
    {
      type: 'select',
      id: 'von',
      label: 'Von Einheit',
      default: 'mbyte',
      options: [
        { value: 'bit', label: 'Bit' },
        { value: 'byte', label: 'Byte' },
        { value: 'kbit', label: 'Kilobit (kbit)' },
        { value: 'kbyte', label: 'Kilobyte (KB)' },
        { value: 'mbit', label: 'Megabit (Mbit)' },
        { value: 'mbyte', label: 'Megabyte (MB)' },
        { value: 'gbit', label: 'Gigabit (Gbit)' },
        { value: 'gbyte', label: 'Gigabyte (GB)' },
      ],
    },
    {
      type: 'select',
      id: 'nach',
      label: 'Nach Einheit',
      default: 'mbit',
      options: [
        { value: 'bit', label: 'Bit' },
        { value: 'byte', label: 'Byte' },
        { value: 'kbit', label: 'Kilobit (kbit)' },
        { value: 'kbyte', label: 'Kilobyte (KB)' },
        { value: 'mbit', label: 'Megabit (Mbit)' },
        { value: 'mbyte', label: 'Megabyte (MB)' },
        { value: 'gbit', label: 'Gigabit (Gbit)' },
        { value: 'gbyte', label: 'Gigabyte (GB)' },
      ],
    },
  ],
  compute: (v) => {
    const wert = num(v.wert);
    const fVon = FAKTOR_BIT[String(v.von)] ?? 1;
    const fNach = FAKTOR_BIT[String(v.nach)] ?? 1;
    const bits = wert * fVon;
    const ergebnis = fNach > 0 ? bits / fNach : 0;
    return [
      { label: 'Ergebnis', value: ergebnis, digits: 6, primary: true },
      { label: 'In Bit', value: bits, digits: 0 },
      { label: 'In Byte', value: bits / 8, digits: 2 },
    ];
  },
  intro:
    'Das Grundgesetz der Digitaltechnik lautet: 1 Byte = 8 Bit. Bit (kleines b) werden meist für Datenraten verwendet, Byte (großes B) für Datei- und Speichergrößen. Dieser Umrechner deckt beide Welten ab und skaliert dezimal (Basis 1000), wie es bei Datenraten und Herstellerangaben üblich ist.',
  howto: [
    'Den umzurechnenden Wert eingeben.',
    'Ausgangseinheit wählen – auf Groß-/Kleinschreibung achten (Mbit ≠ MB).',
    'Zieleinheit wählen.',
    'Ergebnis sowie die Werte in reinen Bit und Byte ablesen.',
  ],
  faq: [
    { q: 'Wie viele Bit hat ein Byte?', a: 'Ein Byte besteht aus genau 8 Bit. Diese Festlegung ist universell für moderne Computer.' },
    { q: 'Was ist der Unterschied zwischen Mbit und MB?', a: 'Mbit (Megabit) ist eine Bit-Einheit, MB (Megabyte) eine Byte-Einheit. 1 MB = 8 Mbit. Internet-Geschwindigkeiten stehen in Mbit/s, Dateigrößen in MB.' },
    { q: 'Warum unterscheiden Tarife und Dateigrößen die Einheiten?', a: 'Datenübertragung wird traditionell in Bit pro Sekunde gemessen, während Speicher in Byte organisiert ist. Das führt im Alltag oft zu Verwirrung beim „gefühlt langsamen“ Download.' },
    { q: 'Rechnet dieser Umrechner mit 1000 oder 1024?', a: 'Mit 1000 (dezimal), wie es für Datenraten und Hersteller-Angaben Standard ist. Für die binäre Speicheranzeige des Betriebssystems nutze den Datenmengen-Umrechner.' },
  ],
  related: ['datenmengen-umrechner', 'bandbreite-durchsatz', 'download-dauer'],
  updated: '2026-06-18',
  examples: [
    {
      values: { wert: 1, von: 'mbyte', nach: 'mbit' },
      expect: [{ label: 'Ergebnis', value: 8, tolerance: 0.0001 }],
    },
    {
      values: { wert: 1, von: 'byte', nach: 'bit' },
      expect: [{ label: 'Ergebnis', value: 8, tolerance: 0.0001 }],
    },
  ],
};
