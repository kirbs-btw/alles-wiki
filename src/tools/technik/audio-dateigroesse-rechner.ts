import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'audio-dateigroesse-rechner',
  category: 'technik',
  title: 'Audio-Dateigröße-Rechner',
  shortTitle: 'Audio-Größe',
  description:
    'Berechne die Dateigröße einer Audioaufnahme aus Bitrate und Dauer – für MP3, AAC und Co. – oder rechne unkomprimiertes WAV aus Samplerate und Bittiefe.',
  keywords: [
    'audio dateigröße berechnen',
    'mp3 größe rechner',
    'bitrate dateigröße',
    'wav größe berechnen',
    'audio größe pro minute',
    'podcast dateigröße',
  ],
  formula: 'Größe (MB) = Bitrate (kbit/s) × Dauer (s) / 8 / 1000; WAV: Samplerate × Bittiefe × Kanäle',
  inputs: [
    {
      type: 'select',
      id: 'modus',
      label: 'Modus',
      default: 'bitrate',
      options: [
        { value: 'bitrate', label: 'Komprimiert (Bitrate, z. B. MP3)' },
        { value: 'wav', label: 'Unkomprimiert (WAV/PCM)' },
      ],
    },
    {
      type: 'select',
      id: 'bitrate',
      label: 'Bitrate (komprimiert)',
      default: '192',
      options: [
        { value: '96', label: '96 kbit/s (Sprache)' },
        { value: '128', label: '128 kbit/s (Standard)' },
        { value: '192', label: '192 kbit/s (gut)' },
        { value: '256', label: '256 kbit/s (sehr gut)' },
        { value: '320', label: '320 kbit/s (maximal MP3)' },
      ],
      help: 'Nur im Modus „Komprimiert" relevant.',
    },
    {
      type: 'select',
      id: 'samplerate',
      label: 'Samplerate (WAV)',
      default: '44100',
      options: [
        { value: '44100', label: '44,1 kHz (CD)' },
        { value: '48000', label: '48 kHz (Video/Studio)' },
        { value: '96000', label: '96 kHz (HiRes)' },
      ],
    },
    {
      type: 'select',
      id: 'bittiefe',
      label: 'Bittiefe (WAV)',
      default: '16',
      options: [
        { value: '16', label: '16 Bit (CD)' },
        { value: '24', label: '24 Bit (Studio)' },
        { value: '32', label: '32 Bit (Float)' },
      ],
    },
    {
      type: 'select',
      id: 'kanaele',
      label: 'Kanäle (WAV)',
      default: '2',
      options: [
        { value: '1', label: 'Mono (1)' },
        { value: '2', label: 'Stereo (2)' },
      ],
    },
    { type: 'number', id: 'minuten', label: 'Dauer', unit: 'min', default: 60, min: 0, step: 1 },
  ],
  compute: (v) => {
    const minuten = num(v.minuten);
    const sekunden = minuten * 60;
    const modus = String(v.modus);
    let bitProSek: number;
    if (modus === 'wav') {
      bitProSek = num(v.samplerate, 44100) * num(v.bittiefe, 16) * num(v.kanaele, 2);
    } else {
      bitProSek = num(v.bitrate, 192) * 1000; // kbit/s -> bit/s
    }
    const bytes = (bitProSek * sekunden) / 8;
    const mb = bytes / 1e6; // dezimal
    const mbProMin = minuten > 0 ? mb / minuten : 0;
    return [
      { label: 'Dateigröße', value: mb, unit: 'MB', digits: 2, primary: true, help: 'Dezimal (1 MB = 1.000.000 Byte).' },
      { label: 'Größe pro Minute', value: mbProMin, unit: 'MB/min', digits: 3 },
      { label: 'Effektive Bitrate', value: bitProSek / 1000, unit: 'kbit/s', digits: 0 },
      { label: 'Größe in Byte', value: bytes, unit: 'Byte', digits: 0 },
    ];
  },
  intro:
    'Die Größe einer Audiodatei hängt fast nur von Bitrate und Dauer ab: Größe (Byte) = Bitrate × Dauer / 8. Eine MP3 mit 192 kbit/s belegt rund 1,44 MB pro Minute, eine Stunde also etwa 86 MB. Unkomprimiertes WAV/PCM ist deutlich größer, weil es Samplerate, Bittiefe und Kanäle direkt speichert: CD-Qualität (44,1 kHz, 16 Bit, Stereo) ergibt rund 10 MB pro Minute. Dieser Rechner deckt beide Fälle ab; variable Bitraten (VBR) liefern in der Praxis leicht abweichende Werte.',
  howto: [
    'Modus wählen: komprimiert (MP3/AAC) oder unkomprimiert (WAV).',
    'Im komprimierten Modus die Bitrate festlegen, im WAV-Modus Samplerate, Bittiefe und Kanäle.',
    'Dauer der Aufnahme in Minuten eingeben.',
    'Dateigröße und Größe pro Minute ablesen.',
  ],
  faq: [
    { q: 'Wie groß ist eine MP3 pro Minute?', a: 'Bei 128 kbit/s rund 0,96 MB, bei 192 kbit/s etwa 1,44 MB und bei 320 kbit/s rund 2,4 MB pro Minute. Die Dauer multipliziert diesen Wert.' },
    { q: 'Warum ist WAV so viel größer als MP3?', a: 'WAV speichert das Signal unkomprimiert mit voller Samplerate und Bittiefe. CD-Qualität entspricht 1.411 kbit/s – fast das Zehnfache einer 128er-MP3.' },
    { q: 'Was bedeutet die Bitrate?', a: 'Die Bitrate gibt an, wie viele Kilobit pro Sekunde gespeichert werden. Höhere Bitraten klingen besser, erzeugen aber größere Dateien. 192–256 kbit/s gelten als guter Kompromiss.' },
    { q: 'Stimmt der Wert bei VBR exakt?', a: 'Nein. Bei variabler Bitrate (VBR) schwankt die Datenmenge je nach Musik. Der Rechner nimmt eine konstante Bitrate (CBR) an und liefert daher einen guten Mittelwert.' },
  ],
  related: ['speicherbedarf-videos', 'datenmengen-umrechner', 'bit-byte-umrechner'],
  updated: '2026-06-19',
  examples: [
    {
      values: { modus: 'bitrate', bitrate: '192', samplerate: '44100', bittiefe: '16', kanaele: '2', minuten: 60 },
      // 192000 bit/s × 3600 s / 8 = 86.400.000 Byte = 86,4 MB; pro Min 1,44 MB
      expect: [
        { label: 'Dateigröße', value: 86.4, tolerance: 0.05 },
        { label: 'Größe pro Minute', value: 1.44, tolerance: 0.005 },
      ],
    },
    {
      values: { modus: 'wav', bitrate: '192', samplerate: '44100', bittiefe: '16', kanaele: '2', minuten: 1 },
      // 44100 × 16 × 2 = 1.411.200 bit/s × 60 / 8 = 10.584.000 Byte = 10,584 MB
      expect: [{ label: 'Dateigröße', value: 10.584, tolerance: 0.01 }],
    },
  ],
};
