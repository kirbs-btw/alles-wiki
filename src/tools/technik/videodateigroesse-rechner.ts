import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'videodateigroesse-rechner',
  category: 'technik',
  title: 'Videodateigröße-Rechner',
  shortTitle: 'Videogröße',
  description:
    'Berechne die Dateigröße eines Videos aus Bitrate und Laufzeit – in Megabyte und Gigabyte, ideal zum Planen von Speicher und Upload.',
  keywords: [
    'videodateigröße berechnen',
    'video bitrate dateigröße',
    'dateigröße aus bitrate',
    'videogröße rechner',
    'mb pro minute video',
    'speicherbedarf video bitrate',
  ],
  formula:
    'Datenmenge (Mbit) = Bitrate (Mbit/s) × Dauer (s); MByte = Mbit / 8; GByte = MByte / 1000',
  inputs: [
    {
      type: 'number',
      id: 'bitrate',
      label: 'Bitrate',
      unit: 'Mbit/s',
      default: 8,
      min: 0,
      step: 0.5,
      help: 'Durchschnittliche Datenrate des Videos. 1080p liegt oft bei 8–12 Mbit/s, 4K bei 35–60 Mbit/s.',
    },
    {
      type: 'number',
      id: 'minuten',
      label: 'Laufzeit',
      unit: 'min',
      default: 60,
      min: 0,
      step: 1,
    },
  ],
  compute: (v) => {
    const bitrate = num(v.bitrate);
    const minuten = num(v.minuten);
    const sekunden = minuten * 60;
    const megabit = bitrate * sekunden;
    const megabyte = megabit / 8;
    const gigabyte = megabyte / 1000;
    return [
      { label: 'Dateigröße', value: gigabyte, unit: 'GB', digits: 2, primary: true },
      { label: 'Dateigröße in MB', value: megabyte, unit: 'MB', digits: 1 },
      { label: 'Datenmenge in Mbit', value: megabit, unit: 'Mbit', digits: 0 },
    ];
  },
  intro:
    'Wie groß wird ein Video? Das hängt fast nur von der Bitrate und der Laufzeit ab – die Auflösung wirkt nur indirekt, weil höhere Auflösungen meist mit höheren Bitraten kodiert werden. Dieser Rechner multipliziert Bitrate und Dauer und rechnet das Ergebnis in Megabyte und Gigabyte um (dezimal, Basis 1000), so wie es bei Speichermedien und Cloud-Diensten üblich ist.',
  howto: [
    'Die durchschnittliche Bitrate in Mbit/s eingeben (siehe Encoder- oder Kamera-Einstellung).',
    'Die Laufzeit des Videos in Minuten eintragen.',
    'Die geschätzte Dateigröße in GB und MB ablesen.',
  ],
  faq: [
    {
      q: 'Warum durch 8 teilen?',
      a: 'Bitraten werden in Bit pro Sekunde angegeben, Dateigrößen in Byte. Da 1 Byte = 8 Bit sind, wird die Bit-Datenmenge durch 8 geteilt, um auf Byte zu kommen.',
    },
    {
      q: 'Ist das exakt?',
      a: 'Es ist eine sehr gute Schätzung für Videos mit konstanter Bitrate (CBR). Bei variabler Bitrate (VBR) schwankt die tatsächliche Größe um den Durchschnittswert. Audio- und Container-Overhead sind nicht gesondert berücksichtigt.',
    },
    {
      q: 'Welche Bitrate brauche ich für 1080p?',
      a: 'Für flüssiges 1080p bei 30 fps sind etwa 8 Mbit/s üblich, bei 60 fps eher 12 Mbit/s. Streaming-Plattformen empfehlen je nach Inhalt unterschiedliche Werte.',
    },
  ],
  related: ['speicherbedarf-videos', 'datenrate-umrechner', 'download-dauer'],
  updated: '2026-06-18',
  examples: [
    {
      values: { bitrate: 8, minuten: 60 },
      expect: [
        { label: 'Dateigröße', value: 3.6, tolerance: 0.001 },
        { label: 'Dateigröße in MB', value: 3600, tolerance: 0.5 },
      ],
    },
    {
      values: { bitrate: 40, minuten: 10 },
      expect: [{ label: 'Dateigröße', value: 3, tolerance: 0.01 }],
    },
  ],
};
