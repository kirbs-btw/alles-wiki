import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

// Typische durchschnittliche Dateigröße pro Foto in Megabyte (dezimal, gerundete Erfahrungswerte).
const FOTO_MB: Record<string, number> = {
  smartphone: 3.5, // JPEG, ~12 MP Handy
  jpeg24: 8, // JPEG, 24 MP Kamera
  raw24: 28, // RAW, 24 MP
  raw45: 55, // RAW, 45 MP
};

export const tool: Tool = {
  slug: 'speicherbedarf-fotos',
  category: 'technik',
  title: 'Speicherbedarf-Rechner für Fotos',
  shortTitle: 'Foto-Speicher',
  description:
    'Schätze, wie viel Speicherplatz deine Fotos belegen und wie viele Bilder auf eine Speicherkarte passen – je nach Format von JPEG bis RAW.',
  keywords: [
    'speicherbedarf fotos',
    'wie viele fotos auf speicherkarte',
    'foto speicherplatz berechnen',
    'gb fotos rechner',
    'speicherkarte fotos anzahl',
    'raw foto größe',
    'fotospeicher rechner',
  ],
  formula: 'Gesamt (MB) = Anzahl × Größe pro Foto; passende Fotos = Kartengröße / Größe pro Foto',
  inputs: [
    { type: 'number', id: 'anzahl', label: 'Anzahl Fotos', default: 1000, min: 0, step: 10 },
    {
      type: 'select',
      id: 'format',
      label: 'Foto-Format / Quelle',
      default: 'jpeg24',
      options: [
        { value: 'smartphone', label: 'Smartphone JPEG (~3,5 MB)' },
        { value: 'jpeg24', label: 'Kamera JPEG 24 MP (~8 MB)' },
        { value: 'raw24', label: 'RAW 24 MP (~28 MB)' },
        { value: 'raw45', label: 'RAW 45 MP (~55 MB)' },
      ],
      help: 'Durchschnittswerte; die echte Größe schwankt je nach Motiv und Kompression.',
    },
    { type: 'number', id: 'karte', label: 'Speicherkartengröße', unit: 'GB', default: 128, min: 0, step: 1, help: 'Zum Berechnen, wie viele Fotos draufpassen.' },
  ],
  compute: (v) => {
    const anzahl = num(v.anzahl);
    const proFoto = FOTO_MB[String(v.format)] ?? 8;
    const gesamtMb = anzahl * proFoto;
    const gesamtGb = gesamtMb / 1000;
    const karteMb = num(v.karte) * 1000;
    const passen = proFoto > 0 ? Math.floor(karteMb / proFoto) : 0;
    return [
      { label: 'Speicherbedarf', value: gesamtGb, unit: 'GB', digits: 2, primary: true },
      { label: 'Speicherbedarf in MB', value: gesamtMb, unit: 'MB', digits: 0 },
      { label: 'Größe pro Foto', value: proFoto, unit: 'MB', digits: 1 },
      { label: 'Fotos pro Speicherkarte', value: passen, digits: 0, help: 'Wie viele Fotos dieses Formats auf die Karte passen.' },
    ];
  },
  intro:
    'Wie viel Platz Fotos brauchen, hängt stark vom Format ab: Ein komprimiertes Smartphone-JPEG belegt nur wenige Megabyte, eine RAW-Datei einer Profikamera schnell 30–60 MB. Dieser Rechner nutzt typische Durchschnittswerte, um deinen Speicherbedarf zu schätzen und zu zeigen, wie viele Bilder auf eine Speicherkarte passen.',
  howto: [
    'Anzahl der Fotos eingeben, die du speichern möchtest.',
    'Foto-Format wählen – von komprimiertem Smartphone-JPEG bis zu großen RAW-Dateien.',
    'Optional die Größe deiner Speicherkarte in GB eintragen.',
    'Gesamtbedarf und die Anzahl passender Fotos ablesen.',
  ],
  faq: [
    { q: 'Wie groß ist ein Foto durchschnittlich?', a: 'Ein Smartphone-JPEG liegt bei etwa 2–4 MB, ein Kamera-JPEG bei 24 MP bei rund 8 MB. RAW-Dateien sind mit 25–60 MB deutlich größer, weil sie unkomprimierte Sensordaten enthalten.' },
    { q: 'Wie viele Fotos passen auf 128 GB?', a: 'Bei 8 MB pro JPEG sind das rund 16.000 Bilder, bei großen RAW-Dateien mit 55 MB nur etwa 2.300. Der Rechner zeigt die Zahl für dein gewähltes Format.' },
    { q: 'Warum ist RAW so viel größer als JPEG?', a: 'RAW speichert die unbearbeiteten Sensordaten ohne verlustbehaftete Kompression. Das bietet mehr Spielraum bei der Bearbeitung, kostet aber das Mehrfache an Speicherplatz.' },
    { q: 'Sind die Werte exakt?', a: 'Nein, es sind Durchschnittswerte. Die echte Dateigröße schwankt mit Motiv, Detailreichtum und Kompressionseinstellung – ein detailreicher Wald ist größer als eine glatte Himmelsfläche.' },
  ],
  related: ['speicherbedarf-videos', 'megapixel-rechner', 'datenmengen-umrechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { anzahl: 1000, format: 'jpeg24', karte: 128 },
      expect: [
        { label: 'Speicherbedarf', value: 8, tolerance: 0.01 },
        { label: 'Fotos pro Speicherkarte', value: 16000, tolerance: 1 },
      ],
    },
    {
      values: { anzahl: 500, format: 'raw24', karte: 64 },
      expect: [{ label: 'Speicherbedarf', value: 14, tolerance: 0.01 }],
    },
  ],
};
