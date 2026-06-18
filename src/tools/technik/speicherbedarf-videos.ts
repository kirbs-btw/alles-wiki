import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

// Typische Video-Bitraten in Mbit/s je Auflösung/Qualität (gerundete Erfahrungswerte für gängige Kompression).
const BITRATE_MBIT: Record<string, number> = {
  hd720: 5,
  hd1080: 10,
  uhd4k: 45,
  uhd4k60: 70,
  uhd8k: 120,
};

export const tool: Tool = {
  slug: 'speicherbedarf-videos',
  category: 'technik',
  title: 'Speicherbedarf-Rechner für Videos',
  shortTitle: 'Video-Speicher',
  description:
    'Berechne den Speicherbedarf von Videos aus Aufnahmedauer und Auflösung – von Full HD bis 4K – und finde heraus, wie viel pro Stunde anfällt.',
  keywords: [
    'speicherbedarf video',
    'videogröße berechnen',
    'wie groß ist 4k video',
    'video speicherplatz rechner',
    'gb pro stunde video',
    'bitrate video größe',
    'videospeicher berechnen',
  ],
  formula: 'Dateigröße (MB) = Bitrate(Mbit/s) × Dauer(s) / 8; 1 Byte = 8 Bit',
  inputs: [
    { type: 'number', id: 'dauer', label: 'Aufnahmedauer', unit: 'Minuten', default: 60, min: 0, step: 1 },
    {
      type: 'select',
      id: 'aufloesung',
      label: 'Auflösung / Qualität',
      default: 'hd1080',
      options: [
        { value: 'hd720', label: 'HD 720p (~5 Mbit/s)' },
        { value: 'hd1080', label: 'Full HD 1080p (~10 Mbit/s)' },
        { value: 'uhd4k', label: '4K 30 fps (~45 Mbit/s)' },
        { value: 'uhd4k60', label: '4K 60 fps (~70 Mbit/s)' },
        { value: 'uhd8k', label: '8K (~120 Mbit/s)' },
      ],
      help: 'Typische Bitraten; höhere fps und weniger Kompression vergrößern die Datei.',
    },
    { type: 'number', id: 'bitrate', label: 'Eigene Bitrate (optional)', unit: 'Mbit/s', default: 0, min: 0, step: 1, help: 'Wenn > 0, überschreibt sie die Auswahl oben.' },
  ],
  compute: (v) => {
    const dauerMin = num(v.dauer);
    const eigene = num(v.bitrate);
    const bitrate = eigene > 0 ? eigene : (BITRATE_MBIT[String(v.aufloesung)] ?? 10);
    const dauerSek = dauerMin * 60;
    const mb = (bitrate * 1e6 * dauerSek) / 8 / 1e6; // = bitrate * dauerSek / 8
    const gb = mb / 1000;
    const proStundeMb = (bitrate * 3600) / 8;
    return [
      { label: 'Speicherbedarf', value: gb, unit: 'GB', digits: 2, primary: true },
      { label: 'Speicherbedarf in MB', value: mb, unit: 'MB', digits: 0 },
      { label: 'Pro Stunde', value: proStundeMb / 1000, unit: 'GB/h', digits: 2 },
      { label: 'Verwendete Bitrate', value: bitrate, unit: 'Mbit/s', digits: 0 },
    ];
  },
  intro:
    'Die Dateigröße eines Videos hängt vor allem von der Bitrate ab – also wie viele Daten pro Sekunde gespeichert werden. Höhere Auflösung, mehr Bilder pro Sekunde und weniger Kompression erhöhen die Bitrate und damit den Speicherbedarf. Dieser Rechner nutzt typische Bitraten je Qualitätsstufe und rechnet sie über die Aufnahmedauer in Gigabyte um.',
  howto: [
    'Aufnahmedauer in Minuten eingeben.',
    'Auflösung und Qualität wählen (720p, 1080p, 4K oder 8K).',
    'Optional eine eigene Bitrate angeben, wenn du den genauen Wert kennst.',
    'Gesamtbedarf und den Verbrauch pro Stunde ablesen.',
  ],
  faq: [
    { q: 'Wie groß ist eine Stunde 4K-Video?', a: 'Bei einer typischen Bitrate von rund 45 Mbit/s belegt eine Stunde 4K-Video etwa 20 GB. Mit 60 fps und höherer Qualität können es auch 30 GB und mehr werden.' },
    { q: 'Wovon hängt die Videogröße ab?', a: 'Entscheidend ist die Bitrate, die wiederum von Auflösung, Bildrate (fps) und Codec/Kompression abhängt. Effiziente Codecs wie H.265 (HEVC) erzeugen bei gleicher Qualität kleinere Dateien als ältere wie H.264.' },
    { q: 'Wie viel GB braucht eine Stunde Full HD?', a: 'Bei etwa 10 Mbit/s sind das rund 4,5 GB pro Stunde. Streaming-Dienste komprimieren oft stärker und liegen darunter, eigene Kameraaufnahmen oft darüber.' },
    { q: 'Sind die Werte exakt?', a: 'Nein, es sind Richtwerte über typische Bitraten. Wenn du die exakte Bitrate deiner Kamera oder deines Encoders kennst, trage sie im optionalen Feld ein.' },
  ],
  related: ['speicherbedarf-fotos', 'bandbreite-durchsatz', 'datenmengen-umrechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { dauer: 60, aufloesung: 'hd1080', bitrate: 0 },
      expect: [
        { label: 'Speicherbedarf', value: 4.5, tolerance: 0.05 },
        { label: 'Pro Stunde', value: 4.5, tolerance: 0.05 },
      ],
    },
    {
      values: { dauer: 60, aufloesung: 'uhd4k', bitrate: 0 },
      expect: [{ label: 'Speicherbedarf', value: 20.25, tolerance: 0.1 }],
    },
  ],
};
