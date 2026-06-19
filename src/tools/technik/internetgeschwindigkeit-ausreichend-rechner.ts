import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

// Typischer Mbit/s-Bedarf je gleichzeitig laufender Aktivität (Download-Richtung, Näherung 2026).
const BEDARF_MBIT: Record<string, number> = {
  surfen: 3, // Surfen, E-Mail, Social Media
  musik: 1, // Musik-Streaming
  sd: 3, // Video in SD
  hd: 5, // Video in HD (1080p)
  uhd: 25, // Video in 4K/UHD
  videocall: 4, // HD-Videokonferenz
  gaming: 5, // Online-Gaming (Bandbreite; Latenz separat)
  download: 20, // großer Hintergrund-Download
};

export const tool: Tool = {
  slug: 'internetgeschwindigkeit-ausreichend-rechner',
  category: 'technik',
  title: 'Reicht meine Internetgeschwindigkeit? – Rechner',
  shortTitle: 'Internet ausreichend',
  description:
    'Prüfe, ob deine Internetgeschwindigkeit für gleichzeitiges Streaming, Gaming und Videocalls reicht – Bedarf in Mbit/s aus deinen Aktivitäten berechnet.',
  keywords: [
    'wie viel mbit brauche ich',
    'internetgeschwindigkeit ausreichend',
    'mbit für streaming',
    'bandbreite bedarf rechner',
    'reicht meine internetleitung',
    'mbit gaming streaming',
  ],
  formula: 'Bedarf = Σ (Aktivität × Anzahl); Reserve = Anschluss − Bedarf',
  inputs: [
    { type: 'number', id: 'anschluss', label: 'Deine Download-Geschwindigkeit', unit: 'Mbit/s', default: 100, min: 1, step: 1, help: 'Laut Tarif. Real kommt meist etwas weniger an.' },
    { type: 'number', id: 'uhd', label: '4K-/UHD-Streams gleichzeitig', default: 1, min: 0, step: 1, help: 'je ca. 25 Mbit/s' },
    { type: 'number', id: 'hd', label: 'HD-Streams (1080p) gleichzeitig', default: 1, min: 0, step: 1, help: 'je ca. 5 Mbit/s' },
    { type: 'number', id: 'videocall', label: 'HD-Videocalls gleichzeitig', default: 1, min: 0, step: 1, help: 'je ca. 4 Mbit/s' },
    { type: 'number', id: 'gaming', label: 'Online-Gaming-Sitzungen', default: 1, min: 0, step: 1, help: 'je ca. 5 Mbit/s (Bandbreite)' },
    { type: 'number', id: 'surfen', label: 'Surfende Geräte (Web, Social)', default: 1, min: 0, step: 1, help: 'je ca. 3 Mbit/s' },
  ],
  compute: (v) => {
    const anschluss = num(v.anschluss);
    const bedarf =
      num(v.uhd) * BEDARF_MBIT.uhd +
      num(v.hd) * BEDARF_MBIT.hd +
      num(v.videocall) * BEDARF_MBIT.videocall +
      num(v.gaming) * BEDARF_MBIT.gaming +
      num(v.surfen) * BEDARF_MBIT.surfen;
    const reserve = anschluss - bedarf;
    const auslastung = anschluss > 0 ? (bedarf / anschluss) * 100 : 0;
    const reicht = reserve >= 0 ? 'Ja – die Leitung reicht aus' : 'Knapp – Bedarf übersteigt den Anschluss';
    return [
      { label: 'Benötigte Geschwindigkeit', value: bedarf, unit: 'Mbit/s', digits: 0, primary: true },
      { label: 'Reicht aus?', value: reicht },
      { label: 'Freie Reserve', value: reserve, unit: 'Mbit/s', digits: 0, help: 'Negativ = Anschluss zu langsam für alles gleichzeitig.' },
      { label: 'Auslastung der Leitung', value: auslastung, unit: '%', digits: 0 },
    ];
  },
  intro:
    'Wie viel Mbit/s du wirklich brauchst, hängt nicht von einer einzelnen Aktivität ab, sondern davon, wie viele gleichzeitig laufen. Ein 4K-Stream zieht rund 25 Mbit/s, ein HD-Stream etwa 5, eine Videokonferenz 4 und Online-Gaming etwa 5 Mbit/s. Dieser Rechner summiert deinen parallelen Bedarf und vergleicht ihn mit deinem Anschluss. Die Werte sind Näherungen (Stand 2026); für Gaming zählt zusätzlich eine niedrige Latenz (Ping), nicht nur die Bandbreite.',
  howto: [
    'Deine Download-Geschwindigkeit laut Tarif in Mbit/s eingeben.',
    'Für jede Aktivität angeben, wie viele davon gleichzeitig laufen sollen.',
    'Benötigte Geschwindigkeit, Reserve und Auslastung ablesen.',
    'Ist die Reserve negativ, ist der Anschluss für alles parallel zu knapp.',
  ],
  faq: [
    { q: 'Wie viel Mbit/s brauche ich für Netflix in 4K?', a: 'Etwa 25 Mbit/s pro 4K-Stream. Für HD (1080p) reichen rund 5 Mbit/s. Laufen mehrere Streams gleichzeitig, addiert sich der Bedarf entsprechend.' },
    { q: 'Zählt für Gaming nur die Geschwindigkeit?', a: 'Nein. Online-Spiele brauchen erstaunlich wenig Bandbreite (oft unter 5 Mbit/s), entscheidend ist die Latenz (Ping). Große Spiel-Downloads benötigen dagegen viel Geschwindigkeit.' },
    { q: 'Warum sollte ich Reserve einplanen?', a: 'Hintergrund-Updates, weitere Geräte und Protokoll-Overhead kosten Bandbreite. Wer die Leitung dauerhaft zu 100 % auslastet, riskiert Ruckler. 20–30 % Reserve sind komfortabel.' },
    { q: 'Sind die Mbit-Werte exakt?', a: 'Nein, es sind typische Richtwerte (Stand 2026). Der echte Bedarf schwankt mit Anbieter, Codec und Qualitätsstufe – der Rechner liefert eine belastbare Schätzung.' },
  ],
  related: ['bandbreite-durchsatz', 'download-dauer', 'datenvolumen-monat-rechner'],
  updated: '2026-06-19',
  examples: [
    {
      values: { anschluss: 100, uhd: 1, hd: 1, videocall: 1, gaming: 1, surfen: 1 },
      // 25 + 5 + 4 + 5 + 3 = 42 Mbit/s; Reserve 58; Auslastung 42 %
      expect: [
        { label: 'Benötigte Geschwindigkeit', value: 42, tolerance: 0.5 },
        { label: 'Freie Reserve', value: 58, tolerance: 0.5 },
      ],
    },
    {
      values: { anschluss: 50, uhd: 2, hd: 0, videocall: 0, gaming: 0, surfen: 0 },
      // 2 × 25 = 50; Reserve 0; Auslastung 100 %
      expect: [
        { label: 'Benötigte Geschwindigkeit', value: 50, tolerance: 0.5 },
        { label: 'Auslastung der Leitung', value: 100, tolerance: 0.5 },
      ],
    },
  ],
};
