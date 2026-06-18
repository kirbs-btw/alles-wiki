import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

// Faktoren zur Umrechnung in Bit pro Sekunde (dezimal, Basis 1000).
const RATE_BIT: Record<string, number> = {
  bps: 1,
  kbit: 1e3,
  mbit: 1e6,
  gbit: 1e9,
  byteps: 8,
  kbyte: 8 * 1e3,
  mbyte: 8 * 1e6,
  gbyte: 8 * 1e9,
};

export const tool: Tool = {
  slug: 'datenrate-umrechner',
  category: 'technik',
  title: 'Datenrate-Umrechner (Mbit/s ↔ MByte/s)',
  shortTitle: 'Datenrate',
  description:
    'Rechne Datenraten zwischen Mbit/s und MByte/s sowie kbit/s und GByte/s um – mit dem Grundsatz 1 Byte = 8 Bit, ideal für Internet-Tarife.',
  keywords: [
    'mbit in mbyte',
    'datenrate umrechner',
    'mbit/s in mb/s',
    'mbyte mbit umrechnen',
    'internet geschwindigkeit umrechnen',
    'download rate umrechnen',
  ],
  formula:
    'Bit/s = Wert × Faktor(Quelle); Ergebnis = Bit/s / Faktor(Ziel); 1 Byte/s = 8 Bit/s',
  inputs: [
    { type: 'number', id: 'wert', label: 'Datenrate', default: 100, min: 0, step: 1 },
    {
      type: 'select',
      id: 'von',
      label: 'Von Einheit',
      default: 'mbit',
      options: [
        { value: 'bps', label: 'Bit/s' },
        { value: 'kbit', label: 'kbit/s' },
        { value: 'mbit', label: 'Mbit/s' },
        { value: 'gbit', label: 'Gbit/s' },
        { value: 'byteps', label: 'Byte/s' },
        { value: 'kbyte', label: 'kByte/s' },
        { value: 'mbyte', label: 'MByte/s' },
        { value: 'gbyte', label: 'GByte/s' },
      ],
    },
    {
      type: 'select',
      id: 'nach',
      label: 'Nach Einheit',
      default: 'mbyte',
      options: [
        { value: 'bps', label: 'Bit/s' },
        { value: 'kbit', label: 'kbit/s' },
        { value: 'mbit', label: 'Mbit/s' },
        { value: 'gbit', label: 'Gbit/s' },
        { value: 'byteps', label: 'Byte/s' },
        { value: 'kbyte', label: 'kByte/s' },
        { value: 'mbyte', label: 'MByte/s' },
        { value: 'gbyte', label: 'GByte/s' },
      ],
    },
  ],
  compute: (v) => {
    const wert = num(v.wert);
    const fVon = RATE_BIT[String(v.von)] ?? 1;
    const fNach = RATE_BIT[String(v.nach)] ?? 1;
    const bitProSek = wert * fVon;
    const ergebnis = fNach > 0 ? bitProSek / fNach : 0;
    return [
      { label: 'Ergebnis', value: ergebnis, digits: 4, primary: true },
      { label: 'In Mbit/s', value: bitProSek / 1e6, unit: 'Mbit/s', digits: 3 },
      { label: 'In MByte/s', value: bitProSek / (8 * 1e6), unit: 'MByte/s', digits: 4 },
    ];
  },
  intro:
    'Internet-Tarife werden in Mbit/s beworben, Downloads zeigt der Browser aber oft in MByte/s an. Da 1 Byte aus 8 Bit besteht, ist die Byte-Rate genau ein Achtel der Bit-Rate: 100 Mbit/s entsprechen 12,5 MByte/s. Dieser Umrechner überträgt jede gängige Datenrate dezimal (Basis 1000) zwischen Bit- und Byte-Einheiten – und zeigt zur Orientierung immer auch Mbit/s und MByte/s an.',
  howto: [
    'Die Datenrate als Zahl eingeben.',
    'Ausgangseinheit wählen – auf Bit (klein b) gegen Byte (großes B) achten.',
    'Zieleinheit wählen.',
    'Das Ergebnis sowie die Vergleichswerte in Mbit/s und MByte/s ablesen.',
  ],
  faq: [
    {
      q: 'Warum komme ich beim 100-Mbit-Anschluss nur auf 12,5 MByte/s?',
      a: 'Weil 1 Byte = 8 Bit. 100 Mbit/s geteilt durch 8 ergibt 12,5 MByte/s. Das ist der theoretische Maximalwert; Overhead und Auslastung drücken die reale Geschwindigkeit etwas darunter.',
    },
    {
      q: 'Rechnet der Umrechner mit 1000 oder 1024?',
      a: 'Mit 1000 (dezimal). Datenraten werden grundsätzlich dezimal angegeben, anders als binäre Speichergrößen im Betriebssystem.',
    },
    {
      q: 'Was ist der Unterschied zu meinem Download-Tempo?',
      a: 'Dieser Rechner wandelt nur Einheiten um. Wie lange ein konkreter Download dauert, hängt zusätzlich von der Dateigröße ab – dafür gibt es den Download-Dauer-Rechner.',
    },
  ],
  related: ['bit-byte-umrechner', 'download-dauer', 'bandbreite-durchsatz'],
  updated: '2026-06-18',
  examples: [
    {
      values: { wert: 100, von: 'mbit', nach: 'mbyte' },
      expect: [{ label: 'Ergebnis', value: 12.5, tolerance: 0.0001 }],
    },
    {
      values: { wert: 1, von: 'gbit', nach: 'mbyte' },
      expect: [{ label: 'Ergebnis', value: 125, tolerance: 0.001 }],
    },
  ],
};
