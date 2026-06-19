import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'erdaushub-volumen-rechner',
  category: 'wohnen',
  title: 'Erdaushub-Rechner (Baugrube)',
  shortTitle: 'Erdaushub',
  description:
    'Berechne das Aushubvolumen einer Baugrube aus Länge, Breite und Tiefe – inklusive Auflockerung und benötigter Lkw-Fuhren zur Entsorgung.',
  keywords: [
    'erdaushub berechnen',
    'aushub volumen rechner',
    'baugrube kubikmeter',
    'erdaushub auflockerung',
    'aushub lkw fuhren',
    'bodenaushub menge',
  ],
  formula:
    'Volumen = Länge × Breite × Tiefe; gelockert = Volumen × Auflockerungsfaktor; Fuhren = ceil(gelockert / Lkw-Volumen)',
  inputs: [
    { type: 'number', id: 'laenge', label: 'Länge der Baugrube', unit: 'm', default: 8, min: 0, step: 0.1 },
    { type: 'number', id: 'breite', label: 'Breite der Baugrube', unit: 'm', default: 6, min: 0, step: 0.1 },
    { type: 'number', id: 'tiefe', label: 'Aushubtiefe', unit: 'm', default: 1, min: 0, step: 0.1 },
    { type: 'number', id: 'auflockerung', label: 'Auflockerungszuschlag', unit: '%', default: 25, min: 0, max: 60, step: 1, help: 'Gelöster Boden braucht mehr Platz. Sand ~15 %, Lehm ~25 %, Fels mehr.' },
    { type: 'number', id: 'lkw', label: 'Ladevolumen je Lkw-Fuhre', unit: 'm³', default: 10, min: 1, step: 0.5, help: 'Übliche Kipper fassen 8–12 m³ aufgelockerten Boden.' },
  ],
  compute: (v) => {
    const laenge = num(v.laenge);
    const breite = num(v.breite);
    const tiefe = num(v.tiefe);
    const auflockerung = num(v.auflockerung);
    const lkw = num(v.lkw);
    const volumen = laenge * breite * tiefe;
    const gelockert = volumen * (1 + auflockerung / 100);
    const fuhren = lkw > 0 ? Math.ceil(gelockert / lkw) : 0;
    return [
      { label: 'Aushubvolumen (fest)', value: volumen, unit: 'm³', digits: 2, primary: true },
      { label: 'Volumen aufgelockert', value: gelockert, unit: 'm³', digits: 2, help: 'Maßgeblich für Abtransport und Containergröße.' },
      { label: 'Benötigte Lkw-Fuhren', value: fuhren, unit: 'Fuhren', digits: 0 },
    ];
  },
  intro:
    'Beim Ausheben einer Baugrube oder eines Grabens muss zweierlei geplant werden: das feste Volumen im gewachsenen Boden und das größere Volumen nach dem Lösen. Boden lockert sich beim Aushub auf und nimmt mehr Platz ein – entscheidend für Container und Abtransport. Der Rechner ermittelt beide Werte und schätzt die nötigen Lkw-Fuhren. Die Auflockerung hängt stark von der Bodenart ab (Sand wenig, Lehm und Fels mehr).',
  howto: [
    'Länge, Breite und Aushubtiefe der Baugrube in Metern eingeben.',
    'Auflockerungszuschlag je nach Bodenart wählen (Sand ~15 %, Lehm ~25 %).',
    'Ladevolumen je Lkw-Fuhre eintragen (meist 8–12 m³).',
    'Festes und aufgelockertes Volumen sowie die nötigen Fuhren ablesen.',
  ],
  faq: [
    { q: 'Was bedeutet Auflockerung?', a: 'Im Boden ist Material verdichtet. Beim Lösen entstehen Hohlräume, das Volumen nimmt zu. Je nach Bodenart steigt es um etwa 15 % (Sand) bis über 40 % (Fels). Für den Abtransport zählt das aufgelockerte Volumen.' },
    { q: 'Wie viel passt auf einen Lkw?', a: 'Ein gängiger Dreiseitenkipper fasst etwa 8–12 m³ Boden. Für die Anzahl der Fuhren ist das aufgelockerte Volumen maßgeblich, nicht das feste.' },
    { q: 'Gilt das auch für Gräben?', a: 'Ja. Für einen Graben trägst du Länge, Grabenbreite und Tiefe ein. Bei geböschten Wänden ist das tatsächliche Volumen größer als bei senkrechtem Aushub.' },
  ],
  related: ['schuettgut-tonnen-rechner', 'betonmenge-fundament-rechner', 'raumvolumen-rechner'],
  updated: '2026-06-19',
  examples: [
    {
      values: { laenge: 8, breite: 6, tiefe: 1, auflockerung: 25, lkw: 10 },
      expect: [
        { label: 'Aushubvolumen (fest)', value: 48, tolerance: 0.01 },
        { label: 'Volumen aufgelockert', value: 60, tolerance: 0.01 },
        { label: 'Benötigte Lkw-Fuhren', value: 6, tolerance: 0.01 },
      ],
    },
  ],
};
