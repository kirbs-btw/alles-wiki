import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'betonmenge-fundament-rechner',
  category: 'wohnen',
  title: 'Betonmenge-Fundament-Rechner',
  shortTitle: 'Betonmenge',
  description:
    'Berechne die benötigte Betonmenge für ein Streifen- oder Plattenfundament aus Länge, Breite und Höhe – inklusive Verschnitt und Gewicht.',
  keywords: [
    'betonmenge berechnen',
    'beton fundament rechner',
    'wie viel beton brauche ich',
    'betonbedarf fundament',
    'beton kubikmeter rechner',
    'fundament beton menge',
  ],
  formula:
    'Volumen = Länge × Breite × Höhe; Bedarf = Volumen × (1 + Verschnitt%); Gewicht = Bedarf × 2400 kg/m³',
  inputs: [
    { type: 'number', id: 'laenge', label: 'Länge', unit: 'm', default: 5, min: 0.1, step: 0.1 },
    { type: 'number', id: 'breite', label: 'Breite', unit: 'm', default: 0.4, min: 0.05, step: 0.05 },
    { type: 'number', id: 'hoehe', label: 'Höhe / Tiefe', unit: 'm', default: 0.8, min: 0.05, step: 0.05 },
    { type: 'number', id: 'anzahl', label: 'Anzahl gleicher Abschnitte', unit: 'Stück', default: 1, min: 1, step: 1, help: 'Z. B. mehrere gleich große Streifen oder Punktfundamente.' },
    { type: 'number', id: 'verschnitt', label: 'Zuschlag für Verdichtung/Verlust', unit: '%', default: 5, min: 0, max: 20, step: 1, help: 'Üblich 5–10 % für Verdichtung und Verschnitt.' },
  ],
  compute: (v) => {
    const laenge = num(v.laenge);
    const breite = num(v.breite);
    const hoehe = num(v.hoehe);
    const anzahl = num(v.anzahl, 1);
    const verschnitt = num(v.verschnitt);
    const volumen = laenge * breite * hoehe * anzahl;
    const bedarf = volumen * (1 + verschnitt / 100);
    const gewicht = bedarf * 2400;
    return [
      { label: 'Benötigter Beton', value: bedarf, unit: 'm³', digits: 2, primary: true },
      { label: 'Reines Volumen', value: volumen, unit: 'm³', digits: 2 },
      { label: 'Geschätztes Gewicht', value: gewicht, unit: 'kg', digits: 0 },
    ];
  },
  intro:
    'Für ein stabiles Fundament muss die Betonmenge genau geplant werden, denn Frischbeton wird oft in vollen Kubikmetern geliefert. Der Rechner ermittelt aus den Abmessungen das Volumen, addiert einen Zuschlag für Verdichtung und Verschnitt und schätzt das Gewicht mit der üblichen Dichte von rund 2.400 kg/m³ für Normalbeton.',
  howto: [
    'Länge, Breite und Höhe des Fundaments in Metern eingeben.',
    'Anzahl gleicher Abschnitte angeben, falls mehrere Streifen oder Punkte gegossen werden.',
    'Zuschlag für Verdichtung und Verlust wählen (meist 5–10 %).',
    'Benötigte Betonmenge in Kubikmetern ablesen.',
  ],
  faq: [
    { q: 'Wie viel Beton brauche ich pro Meter Streifenfundament?', a: 'Das hängt vom Querschnitt ab: Bei 0,4 m Breite und 0,8 m Tiefe sind es 0,32 m³ je laufendem Meter. Multipliziere den Querschnitt (Breite × Höhe) mit der Länge.' },
    { q: 'Wie viel wiegt ein Kubikmeter Beton?', a: 'Normalbeton wiegt etwa 2.300–2.500 kg pro Kubikmeter, je nach Zuschlagstoffen. Der Rechner kalkuliert mit 2.400 kg/m³ als gängigem Mittelwert.' },
    { q: 'Soll ich Fertigbeton oder selbst mischen?', a: 'Ab etwa 1 m³ ist Transportbeton meist wirtschaftlicher und gleichmäßiger als selbst gemischter Beton. Für kleine Punktfundamente lohnt sich Sackware oder Eigenmischung.' },
    { q: 'Warum ein Zuschlag?', a: 'Beim Einbringen geht durch Verdichtung, ungenaue Aushübe und Verschnitt etwas Material verloren. Ein Zuschlag von 5–10 % vermeidet, dass mitten im Gießen Beton fehlt.' },
  ],
  related: ['mauersteine-bedarf-rechner', 'estrich-rechner', 'raumvolumen-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { laenge: 5, breite: 0.4, hoehe: 0.8, anzahl: 1, verschnitt: 5 },
      expect: [
        { label: 'Benötigter Beton', value: 1.68, tolerance: 0.01 },
        { label: 'Reines Volumen', value: 1.6, tolerance: 0.01 },
        { label: 'Geschätztes Gewicht', value: 4032, tolerance: 1 },
      ],
    },
    {
      values: { laenge: 4, breite: 4, hoehe: 0.2, anzahl: 1, verschnitt: 10 },
      expect: [
        { label: 'Benötigter Beton', value: 3.52, tolerance: 0.01 },
      ],
    },
  ],
};
