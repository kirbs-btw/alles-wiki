import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'aufloesung-dateigroesse-rechner',
  category: 'technik',
  title: 'Auflösung-Dateigröße-Rechner (unkomprimiert)',
  shortTitle: 'Bild-Dateigröße',
  description:
    'Berechne die unkomprimierte Dateigröße eines Bildes aus Auflösung und Farbtiefe – ideal für BMP, TIFF oder RAW-Schätzungen ohne Kompression.',
  keywords: [
    'unkomprimierte dateigröße bild',
    'bild dateigröße berechnen',
    'raw dateigröße rechner',
    'bitmap größe berechnen',
    'auflösung farbtiefe speicher',
    'bmp dateigröße',
  ],
  formula: 'Bytes = Breite × Höhe × Bit pro Pixel / 8',
  inputs: [
    { type: 'number', id: 'breite', label: 'Breite', unit: 'px', default: 1920, min: 1, step: 1 },
    { type: 'number', id: 'hoehe', label: 'Höhe', unit: 'px', default: 1080, min: 1, step: 1 },
    {
      type: 'select',
      id: 'bpp',
      label: 'Farbtiefe',
      default: '24',
      options: [
        { value: '8', label: 'Graustufen 8 Bit (1 Kanal)' },
        { value: '14', label: 'RAW 14 Bit (1 Kanal, Bayer)' },
        { value: '16', label: 'Graustufen 16 Bit' },
        { value: '24', label: 'RGB 8 Bit/Kanal (24 Bit)' },
        { value: '32', label: 'RGBA 8 Bit/Kanal (32 Bit)' },
        { value: '48', label: 'RGB 16 Bit/Kanal (48 Bit)' },
      ],
      help: 'Bit pro Pixel über alle Kanäle. RAW-Werte sind eine Näherung ohne Kompression.',
    },
  ],
  compute: (v) => {
    const b = num(v.breite);
    const h = num(v.hoehe);
    const bpp = num(v.bpp, 24);
    const pixel = b * h;
    const bytes = (pixel * bpp) / 8;
    const mb = bytes / 1e6; // dezimal (MB)
    const mib = bytes / 1024 / 1024; // binär (MiB)
    return [
      { label: 'Dateigröße', value: mb, unit: 'MB', digits: 3, primary: true, help: 'Dezimal (1 MB = 1.000.000 Byte).' },
      { label: 'Dateigröße (binär)', value: mib, unit: 'MiB', digits: 3, help: 'Binär (1 MiB = 1.048.576 Byte).' },
      { label: 'Größe in Byte', value: bytes, unit: 'Byte', digits: 0 },
      { label: 'Pixel gesamt', value: pixel, unit: 'px', digits: 0 },
    ];
  },
  intro:
    'Ohne Kompression hängt die Dateigröße eines Bildes nur von der Pixelzahl und der Farbtiefe ab: Bytes = Breite × Höhe × Bit pro Pixel / 8. Ein Full-HD-Bild mit 24 Bit (RGB, je 8 Bit) belegt so rund 6,2 MB. Echte JPEG- oder PNG-Dateien sind durch Kompression deutlich kleiner; dieser Wert ist die Obergrenze und entspricht Formaten wie BMP oder unkomprimiertem TIFF. RAW-Größen sind eine grobe Näherung ohne herstellerspezifische Kompression.',
  howto: [
    'Breite und Höhe des Bildes in Pixeln eingeben.',
    'Farbtiefe wählen (z. B. 24 Bit für RGB).',
    'Unkomprimierte Dateigröße in MB bzw. MiB ablesen.',
  ],
  faq: [
    { q: 'Warum ist meine JPEG-Datei viel kleiner?', a: 'JPEG, PNG und Co. komprimieren das Bild. Dieser Rechner liefert die unkomprimierte Größe – also das Maximum, das etwa BMP oder ein TIFF ohne Kompression belegt.' },
    { q: 'Was bedeutet die Farbtiefe in Bit?', a: 'Sie gibt an, wie viele Bits pro Pixel gespeichert werden. 24 Bit (RGB) sind 8 Bit je Farbkanal, 48 Bit entsprechen 16 Bit je Kanal für mehr Farbabstufungen.' },
    { q: 'Wie genau ist die RAW-Schätzung?', a: 'Sie ist eine Näherung: Ein RAW-Sensor speichert meist einen Kanal je Pixel (Bayer-Muster) mit z. B. 12–14 Bit. Hersteller komprimieren RAW oft verlustfrei, weshalb echte Dateien etwas kleiner ausfallen können.' },
    { q: 'MB oder MiB – was stimmt?', a: 'Beides ist gängig: MB rechnet dezimal mit 1.000.000 Byte, MiB binär mit 1.048.576 Byte. Betriebssysteme zeigen oft binäre Werte, beschriften sie aber manchmal trotzdem als „MB“.' },
  ],
  related: ['megapixel-rechner', 'speicherbedarf-fotos', 'dpi-ppi-rechner'],
  updated: '2026-06-19',
  examples: [
    {
      values: { breite: 1920, hoehe: 1080, bpp: '24' },
      // 1920*1080 = 2.073.600 px; *24/8 = 6.220.800 Byte = 6,2208 MB
      expect: [
        { label: 'Größe in Byte', value: 6220800, tolerance: 1 },
        { label: 'Dateigröße', value: 6.221, tolerance: 0.001 },
      ],
    },
    {
      values: { breite: 6000, hoehe: 4000, bpp: '14' },
      // 24.000.000 px; *14/8 = 42.000.000 Byte = 42 MB
      expect: [{ label: 'Dateigröße', value: 42, tolerance: 0.001 }],
    },
  ],
};
