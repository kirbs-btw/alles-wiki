import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

// Datenraten in Bit pro Sekunde je Einheit (dezimal, Netzwerk-Standard).
const RATE_BIT: Record<string, number> = {
  kbit: 1e3,
  mbit: 1e6,
  gbit: 1e9,
};
// Übertragene Datenmenge in Byte je Einheit (dezimal).
const MENGE_BYTE: Record<string, number> = {
  mb: 1e6,
  gb: 1e9,
  tb: 1e12,
};

export const tool: Tool = {
  slug: 'bandbreite-durchsatz',
  category: 'technik',
  title: 'Bandbreite- & Durchsatz-Rechner',
  shortTitle: 'Bandbreite',
  description:
    'Rechne Netzwerk-Bandbreite zwischen Mbit/s und MB/s um und berechne, wie viel Datenvolumen pro Stunde, Tag oder Monat über die Leitung läuft.',
  keywords: [
    'bandbreite rechner',
    'mbit in mb umrechnen',
    'durchsatz berechnen',
    'datenrate umrechnen',
    'mbit/s in mb/s',
    'datenvolumen pro stunde',
    'netzwerk geschwindigkeit',
  ],
  formula: 'MB/s = Mbit/s / 8; Datenmenge = Datenrate(Byte/s) × Zeit(s)',
  inputs: [
    { type: 'number', id: 'rate', label: 'Datenrate', default: 100, min: 0, step: 1 },
    {
      type: 'select',
      id: 'rateEinheit',
      label: 'Einheit Datenrate',
      default: 'mbit',
      options: [
        { value: 'kbit', label: 'kbit/s' },
        { value: 'mbit', label: 'Mbit/s' },
        { value: 'gbit', label: 'Gbit/s' },
      ],
      help: 'Bit-Einheiten (mit kleinem b) wie bei Internet-Tarifen.',
    },
    { type: 'number', id: 'dauer', label: 'Dauer', default: 1, min: 0, step: 0.5 },
    {
      type: 'select',
      id: 'dauerEinheit',
      label: 'Einheit Dauer',
      default: 'stunde',
      options: [
        { value: 'sekunde', label: 'Sekunden' },
        { value: 'minute', label: 'Minuten' },
        { value: 'stunde', label: 'Stunden' },
        { value: 'tag', label: 'Tage' },
      ],
    },
    {
      type: 'select',
      id: 'mengeEinheit',
      label: 'Einheit Datenmenge',
      default: 'gb',
      options: [
        { value: 'mb', label: 'Megabyte (MB)' },
        { value: 'gb', label: 'Gigabyte (GB)' },
        { value: 'tb', label: 'Terabyte (TB)' },
      ],
    },
  ],
  compute: (v) => {
    const rate = num(v.rate);
    const bitProSek = rate * (RATE_BIT[String(v.rateEinheit)] ?? 1e6);
    const byteProSek = bitProSek / 8;
    const mbProSek = byteProSek / 1e6;
    const dauerSek =
      num(v.dauer) *
      ({ sekunde: 1, minute: 60, stunde: 3600, tag: 86400 }[String(v.dauerEinheit)] ?? 3600);
    const mengeByte = byteProSek * dauerSek;
    const mengeFaktor = MENGE_BYTE[String(v.mengeEinheit)] ?? 1e9;
    const menge = mengeFaktor > 0 ? mengeByte / mengeFaktor : 0;
    return [
      { label: 'Durchsatz in MB/s', value: mbProSek, unit: 'MB/s', digits: 3, primary: true },
      { label: 'Übertragene Datenmenge', value: menge, unit: ({ mb: 'MB', gb: 'GB', tb: 'TB' }[String(v.mengeEinheit)] ?? 'GB'), digits: 3, help: 'Über die gewählte Dauer.' },
      { label: 'Datenmenge in GB', value: mengeByte / 1e9, unit: 'GB', digits: 3 },
      { label: 'Datenrate in Byte/s', value: byteProSek, unit: 'B/s', digits: 0 },
    ];
  },
  intro:
    'Bandbreite wird in Bit pro Sekunde gemessen (Mbit/s), übertragene Datenmengen aber in Byte (MB, GB). Da 1 Byte = 8 Bit ist, entspricht eine 100-Mbit-Leitung höchstens 12,5 MB/s. Dieser Rechner wandelt Datenraten um und zeigt, wie viel Volumen bei Dauernutzung über eine bestimmte Zeit zusammenkommt – praktisch zum Abschätzen von Datenvolumen.',
  howto: [
    'Datenrate eingeben und Einheit wählen (kbit/s, Mbit/s oder Gbit/s).',
    'Den Durchsatz in MB/s direkt ablesen (Datenrate geteilt durch 8).',
    'Optional eine Dauer eintragen, um das übertragene Volumen zu berechnen.',
    'Einheit für die Datenmenge wählen und das Ergebnis ablesen.',
  ],
  faq: [
    { q: 'Wie viel MB/s sind 100 Mbit/s?', a: '100 Mbit/s geteilt durch 8 ergibt 12,5 MB/s. Eine Gigabit-Leitung (1000 Mbit/s) schafft entsprechend 125 MB/s.' },
    { q: 'Warum wird die Bandbreite in Bit angegeben?', a: 'In der Datenübertragung ist Bit pro Sekunde die historische und physikalisch passende Einheit. Datei- und Speichergrößen werden dagegen in Byte angegeben, was häufig zu Verwechslungen führt.' },
    { q: 'Wie viel Datenvolumen verbraucht ein Stream pro Stunde?', a: 'Ein 5-Mbit/s-Stream (HD) überträgt rund 0,625 MB/s, also etwa 2,25 GB pro Stunde. Mit diesem Rechner lässt sich das für beliebige Raten bestimmen.' },
    { q: 'Ist die volle Bandbreite immer nutzbar?', a: 'Nein, durch Protokoll-Overhead, Auslastung und WLAN gehen real meist 5–20 % verloren. Der Rechner zeigt den theoretischen Maximalwert.' },
  ],
  related: ['download-dauer', 'bit-byte-umrechner', 'datenmengen-umrechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { rate: 100, rateEinheit: 'mbit', dauer: 1, dauerEinheit: 'stunde', mengeEinheit: 'gb' },
      expect: [
        { label: 'Durchsatz in MB/s', value: 12.5, tolerance: 0.01 },
        { label: 'Übertragene Datenmenge', value: 45, tolerance: 0.1 },
      ],
    },
    {
      values: { rate: 1, rateEinheit: 'gbit', dauer: 10, dauerEinheit: 'sekunde', mengeEinheit: 'gb' },
      expect: [{ label: 'Übertragene Datenmenge', value: 1.25, tolerance: 0.01 }],
    },
  ],
};
