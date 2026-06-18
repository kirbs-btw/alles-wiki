import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

// Faktoren in Byte bezogen auf die jeweilige Einheit.
// Dezimal (SI, Basis 1000) und Binär (IEC, Basis 1024) getrennt.
const DEZ: Record<string, number> = {
  byte: 1,
  kb: 1e3,
  mb: 1e6,
  gb: 1e9,
  tb: 1e12,
  pb: 1e15,
};
const BIN: Record<string, number> = {
  byte: 1,
  kb: 1024,
  mb: 1024 ** 2,
  gb: 1024 ** 3,
  tb: 1024 ** 4,
  pb: 1024 ** 5,
};

export const tool: Tool = {
  slug: 'datenmengen-umrechner',
  category: 'technik',
  title: 'Datenmengen-Umrechner (KB, MB, GB, TB)',
  shortTitle: 'Datenmengen',
  description:
    'Rechne Datenmengen schnell zwischen Byte, KB, MB, GB und TB um – wahlweise dezimal (1000) oder binär (1024) nach IEC-Standard.',
  keywords: [
    'datenmengen umrechner',
    'mb in gb umrechnen',
    'gb in mb',
    'kb mb gb tb umrechnen',
    'byte rechner',
    'speichergröße umrechnen',
    'tb in gb',
  ],
  formula: 'Byte = Wert × Faktor(Quelle); Ziel = Byte / Faktor(Ziel); Faktor = 1000^n (dezimal) oder 1024^n (binär)',
  inputs: [
    { type: 'number', id: 'wert', label: 'Wert', default: 500, min: 0, step: 1 },
    {
      type: 'select',
      id: 'von',
      label: 'Von Einheit',
      default: 'mb',
      options: [
        { value: 'byte', label: 'Byte' },
        { value: 'kb', label: 'Kilobyte (KB)' },
        { value: 'mb', label: 'Megabyte (MB)' },
        { value: 'gb', label: 'Gigabyte (GB)' },
        { value: 'tb', label: 'Terabyte (TB)' },
        { value: 'pb', label: 'Petabyte (PB)' },
      ],
    },
    {
      type: 'select',
      id: 'nach',
      label: 'Nach Einheit',
      default: 'gb',
      options: [
        { value: 'byte', label: 'Byte' },
        { value: 'kb', label: 'Kilobyte (KB)' },
        { value: 'mb', label: 'Megabyte (MB)' },
        { value: 'gb', label: 'Gigabyte (GB)' },
        { value: 'tb', label: 'Terabyte (TB)' },
        { value: 'pb', label: 'Petabyte (PB)' },
      ],
    },
    {
      type: 'select',
      id: 'system',
      label: 'Zählsystem',
      default: 'dezimal',
      options: [
        { value: 'dezimal', label: 'Dezimal (1000, Hersteller/Festplatte)' },
        { value: 'binaer', label: 'Binär (1024, IEC/Betriebssystem)' },
      ],
      help: 'Festplatten-Hersteller rechnen mit 1000, Windows zeigt mit 1024.',
    },
  ],
  compute: (v) => {
    const wert = num(v.wert);
    const von = String(v.von);
    const nach = String(v.nach);
    const tabelle = String(v.system) === 'binaer' ? BIN : DEZ;
    const fVon = tabelle[von] ?? 1;
    const fNach = tabelle[nach] ?? 1;
    const bytes = wert * fVon;
    const ziel = fNach > 0 ? bytes / fNach : 0;
    return [
      { label: 'Ergebnis', value: ziel, digits: 4, primary: true },
      { label: 'In Byte', value: bytes, digits: 0 },
      { label: 'In Megabyte', value: bytes / (tabelle.mb || 1), unit: 'MB', digits: 3 },
      { label: 'In Gigabyte', value: bytes / (tabelle.gb || 1), unit: 'GB', digits: 4 },
    ];
  },
  intro:
    'Datenmengen werden mal mit 1000 (dezimal, SI) und mal mit 1024 (binär, IEC) umgerechnet. Festplatten-Hersteller werben dezimal, während Windows die Größe binär anzeigt – deshalb wirkt eine „1-TB“-Platte im System kleiner. Dieser Umrechner deckt beide Systeme ab und zeigt das Zwischenergebnis in Byte.',
  howto: [
    'Den umzurechnenden Wert eingeben (z. B. 500).',
    'Ausgangseinheit wählen (z. B. Megabyte) und Zieleinheit (z. B. Gigabyte).',
    'Zählsystem festlegen: dezimal (1000) wie auf der Verpackung oder binär (1024) wie im Betriebssystem.',
    'Das Ergebnis sowie die Byte-Zahl ablesen.',
  ],
  faq: [
    { q: 'Warum zeigt meine 1-TB-Festplatte nur 931 GB?', a: 'Der Hersteller rechnet dezimal: 1 TB = 1.000.000.000.000 Byte. Windows rechnet binär mit 1024 und teilt durch 1024³ pro Stufe, wodurch rund 931 GiB übrig bleiben – die Daten sind dieselben, nur die Zähleinheit unterscheidet sich.' },
    { q: 'Was ist der Unterschied zwischen MB und MiB?', a: 'MB (Megabyte) meint dezimal 1.000.000 Byte, MiB (Mebibyte) binär 1.048.576 Byte. Der IEC-Standard von 1998 trennt beide, im Alltag wird „MB“ aber oft binär benutzt.' },
    { q: 'Wie viele MB sind 1 GB?', a: 'Dezimal sind 1 GB = 1.000 MB, binär 1.024 MB. In diesem Rechner kannst du das Zählsystem direkt umschalten.' },
    { q: 'Welches System soll ich nehmen?', a: 'Für Verpackungsangaben und Datenraten von Internetanschlüssen das dezimale System (1000). Für Dateigrößen, die dein Betriebssystem anzeigt, das binäre System (1024).' },
  ],
  related: ['download-dauer', 'bit-byte-umrechner', 'speicherbedarf-fotos'],
  updated: '2026-06-18',
  examples: [
    {
      values: { wert: 500, von: 'mb', nach: 'gb', system: 'dezimal' },
      expect: [{ label: 'Ergebnis', value: 0.5, tolerance: 0.0001 }],
    },
    {
      values: { wert: 1, von: 'tb', nach: 'gb', system: 'binaer' },
      expect: [{ label: 'Ergebnis', value: 1024, tolerance: 0.01 }],
    },
  ],
};
