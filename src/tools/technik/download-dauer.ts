import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

// Dateigröße in Byte je Einheit (dezimal, wie üblich für Dateigrößen-Angaben).
const GROESSE_FAKTOR: Record<string, number> = {
  mb: 1e6,
  gb: 1e9,
  tb: 1e12,
};
// Datenrate in Bit pro Sekunde je Einheit (dezimal, wie bei Internetanschlüssen).
const RATE_FAKTOR: Record<string, number> = {
  mbit: 1e6,
  gbit: 1e9,
};

export const tool: Tool = {
  slug: 'download-dauer',
  category: 'technik',
  title: 'Download-Dauer-Rechner',
  shortTitle: 'Download-Dauer',
  description:
    'Berechne, wie lange ein Download bei deiner Internetgeschwindigkeit dauert – aus Dateigröße und Bandbreite in Mbit/s, inklusive realistischem Overhead.',
  keywords: [
    'download dauer berechnen',
    'download zeit rechner',
    'wie lange dauert download',
    'downloadgeschwindigkeit rechner',
    'mbit download zeit',
    'datei download dauer',
    'internetgeschwindigkeit download',
  ],
  formula: 'Dauer (s) = (Dateigröße in Bit) / (Datenrate in Bit/s × Effizienz); 1 Byte = 8 Bit',
  inputs: [
    { type: 'number', id: 'groesse', label: 'Dateigröße', default: 5, min: 0, step: 0.1 },
    {
      type: 'select',
      id: 'groesseEinheit',
      label: 'Einheit Dateigröße',
      default: 'gb',
      options: [
        { value: 'mb', label: 'Megabyte (MB)' },
        { value: 'gb', label: 'Gigabyte (GB)' },
        { value: 'tb', label: 'Terabyte (TB)' },
      ],
    },
    { type: 'number', id: 'rate', label: 'Geschwindigkeit', default: 100, min: 0, step: 1 },
    {
      type: 'select',
      id: 'rateEinheit',
      label: 'Einheit Geschwindigkeit',
      default: 'mbit',
      options: [
        { value: 'mbit', label: 'Mbit/s (Megabit pro Sekunde)' },
        { value: 'gbit', label: 'Gbit/s (Gigabit pro Sekunde)' },
      ],
      help: 'Internet-Tarife werden in Mbit/s angegeben, nicht in MB/s.',
    },
    { type: 'number', id: 'effizienz', label: 'Effizienz / Auslastung', default: 90, min: 1, max: 100, step: 1, unit: '%', help: 'Realistisch erreichst du selten 100 %. Overhead und Protokolle kosten Leistung.' },
  ],
  compute: (v) => {
    const groesse = num(v.groesse);
    const rate = num(v.rate);
    const eff = num(v.effizienz, 100) / 100;
    const groesseBit = groesse * (GROESSE_FAKTOR[String(v.groesseEinheit)] ?? 1e9) * 8;
    const rateBit = rate * (RATE_FAKTOR[String(v.rateEinheit)] ?? 1e6) * eff;
    const sekunden = rateBit > 0 ? groesseBit / rateBit : 0;
    const min = sekunden / 60;
    const tempoMBs = rate * (RATE_FAKTOR[String(v.rateEinheit)] ?? 1e6) * eff / 8 / 1e6;
    return [
      { label: 'Dauer', value: sekunden, unit: 's', digits: 1, primary: true },
      { label: 'Dauer in Minuten', value: min, unit: 'min', digits: 2 },
      { label: 'Dauer in Stunden', value: min / 60, unit: 'h', digits: 3 },
      { label: 'Effektives Tempo', value: tempoMBs, unit: 'MB/s', digits: 2, help: 'So viele Megabyte landen pro Sekunde bei dir.' },
    ];
  },
  intro:
    'Internetgeschwindigkeiten werden in Megabit pro Sekunde (Mbit/s) angegeben, Dateigrößen aber in Megabyte (MB) – und 1 Byte sind 8 Bit. Deshalb lädt eine 100-Mbit-Leitung theoretisch nur etwa 12,5 MB pro Sekunde. Dieser Rechner berücksichtigt zusätzlich, dass durch Protokoll-Overhead und Gegenstellen real selten die volle Bandbreite ankommt.',
  howto: [
    'Dateigröße eingeben und passende Einheit (MB, GB oder TB) wählen.',
    'Deine Download-Geschwindigkeit laut Tarif in Mbit/s oder Gbit/s eintragen.',
    'Effizienz schätzen (90 % ist realistisch; 100 % wäre der theoretische Idealwert).',
    'Dauer in Sekunden, Minuten und Stunden sowie das effektive Tempo in MB/s ablesen.',
  ],
  faq: [
    { q: 'Warum ist mein Download langsamer als die Tarif-Geschwindigkeit?', a: 'Mbit/s sind Megabit, nicht Megabyte. 100 Mbit/s entsprechen maximal 12,5 MB/s. Hinzu kommen Protokoll-Overhead, langsame Server und WLAN-Verluste, weshalb real meist 80–95 % ankommen.' },
    { q: 'Wie rechne ich Mbit/s in MB/s um?', a: 'Teile die Mbit-Zahl durch 8: 50 Mbit/s = 6,25 MB/s, 100 Mbit/s = 12,5 MB/s, 1.000 Mbit/s = 125 MB/s.' },
    { q: 'Welche Effizienz soll ich einstellen?', a: 'Über LAN-Kabel sind 90–95 % üblich, über WLAN oft nur 60–80 %. Bei stark ausgelasteten Download-Servern kann der Wert noch deutlich darunter liegen.' },
    { q: 'Gilt das auch für den Upload?', a: 'Ja, die Formel ist identisch – nur deine Upload-Bandbreite ist meist kleiner. Trage einfach die Upload-Rate statt der Download-Rate ein.' },
  ],
  related: ['datenmengen-umrechner', 'bandbreite-durchsatz', 'bit-byte-umrechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { groesse: 5, groesseEinheit: 'gb', rate: 100, rateEinheit: 'mbit', effizienz: 100 },
      expect: [{ label: 'Dauer', value: 400, tolerance: 0.5 }],
    },
    {
      values: { groesse: 700, groesseEinheit: 'mb', rate: 50, rateEinheit: 'mbit', effizienz: 100 },
      expect: [{ label: 'Dauer', value: 112, tolerance: 0.5 }],
    },
  ],
};
