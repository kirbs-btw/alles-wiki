import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'raumvolumen-rechner',
  category: 'wohnen',
  title: 'Raumvolumen-Rechner',
  shortTitle: 'Raumvolumen',
  description:
    'Berechne das Volumen eines Raums in Kubikmetern und die Luftmenge – aus Länge, Breite und Höhe. Praktisch für Heizung, Lüftung und Klima.',
  keywords: [
    'raumvolumen berechnen',
    'kubikmeter raum rechner',
    'raumluft volumen',
    'm3 raum berechnen',
    'raumgröße rechner',
    'volumen zimmer',
  ],
  formula: 'Volumen = Länge × Breite × Höhe; Luftmasse ≈ Volumen × 1,2 kg/m³',
  inputs: [
    { type: 'number', id: 'laenge', label: 'Länge', unit: 'm', default: 5, min: 0.1, step: 0.1 },
    { type: 'number', id: 'breite', label: 'Breite', unit: 'm', default: 4, min: 0.1, step: 0.1 },
    { type: 'number', id: 'hoehe', label: 'Raumhöhe', unit: 'm', default: 2.5, min: 0.1, step: 0.05 },
  ],
  compute: (v) => {
    const laenge = num(v.laenge);
    const breite = num(v.breite);
    const hoehe = num(v.hoehe);
    const grundflaeche = laenge * breite;
    const volumen = grundflaeche * hoehe;
    const luftmasse = volumen * 1.2;
    return [
      { label: 'Raumvolumen', value: volumen, unit: 'm³', digits: 2, primary: true },
      { label: 'Grundfläche', value: grundflaeche, unit: 'm²', digits: 2 },
      { label: 'Luftmasse', value: luftmasse, unit: 'kg', digits: 1, help: 'Bei rund 1,2 kg pro m³ Raumluft (20 °C).' },
    ];
  },
  intro:
    'Der Raumvolumen-Rechner gibt dir den Rauminhalt in Kubikmetern. Das Volumen wird für die Auslegung von Heizung und Lüftung, die Wahl eines Luftentfeuchters oder einer Klimaanlage und für Lüftungsempfehlungen gebraucht.',
  howto: [
    'Länge und Breite des Raums messen.',
    'Raumhöhe eintragen (Standard rund 2,5 m).',
    'Raumvolumen in m³ ablesen.',
  ],
  faq: [
    { q: 'Wofür brauche ich das Raumvolumen?', a: 'Es ist Grundlage für die Auslegung von Heizleistung, Lüftungs- und Klimageräten sowie für Empfehlungen zu Luftentfeuchtern. Auch für die nötige Frischluftmenge ist es relevant.' },
    { q: 'Wie hoch ist eine Standard-Raumhöhe?', a: 'In Wohnungen sind etwa 2,5 m üblich. Altbauten haben oft 3 m oder mehr, was das Volumen entsprechend erhöht.' },
    { q: 'Was sagt die Luftmasse aus?', a: 'Raumluft hat bei rund 20 °C eine Dichte von etwa 1,2 kg/m³. Die Luftmasse ist z. B. für die Heiz- und Lüftungstechnik interessant.' },
  ],
  related: ['wohnflaeche-rechner', 'wandfarbe-rechner', 'heizlast-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { laenge: 5, breite: 4, hoehe: 2.5 },
      expect: [
        { label: 'Raumvolumen', value: 50, tolerance: 0.01 },
        { label: 'Grundfläche', value: 20, tolerance: 0.01 },
        { label: 'Luftmasse', value: 60, tolerance: 0.1 },
      ],
    },
  ],
};
