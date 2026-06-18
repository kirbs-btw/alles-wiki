import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'mauersteine-bedarf-rechner',
  category: 'wohnen',
  title: 'Mauersteine-Bedarf-Rechner',
  shortTitle: 'Mauersteine',
  description:
    'Berechne, wie viele Mauersteine du für eine Wand brauchst – aus Wandfläche, Steinformat und Verschnitt, inklusive Steine pro Quadratmeter.',
  keywords: [
    'mauersteine berechnen',
    'steine pro qm mauer',
    'mauerstein bedarf rechner',
    'wie viele steine pro quadratmeter',
    'ziegel bedarf berechnen',
    'mauerwerk steine menge',
  ],
  formula:
    'Sichtfläche je Stein = (Länge + Fuge) × (Höhe + Fuge); Steine je m² = 1 / Sichtfläche; Stück = ceil(Wandfläche × (1+Verschnitt%) × Steine je m²)',
  inputs: [
    { type: 'number', id: 'flaeche', label: 'Wandfläche', unit: 'm²', default: 10, min: 0.5, step: 0.1, help: 'Länge × Höhe der Wand, abzüglich großer Öffnungen.' },
    { type: 'number', id: 'steinlaenge', label: 'Steinlänge', unit: 'cm', default: 24, min: 2, step: 0.5 },
    { type: 'number', id: 'steinhoehe', label: 'Steinhöhe', unit: 'cm', default: 11.3, min: 2, step: 0.1 },
    { type: 'number', id: 'fuge', label: 'Fugendicke', unit: 'cm', default: 1, min: 0, max: 3, step: 0.1, help: 'Mörtelfuge, üblich 1 cm. Bei Dünnbettmörtel ca. 0,1 cm.' },
    { type: 'number', id: 'verschnitt', label: 'Verschnitt-Zuschlag', unit: '%', default: 5, min: 0, max: 20, step: 1, help: 'Für Zuschnitte und Bruch, üblich 5–10 %.' },
  ],
  compute: (v) => {
    const flaeche = num(v.flaeche);
    const lcm = num(v.steinlaenge);
    const hcm = num(v.steinhoehe);
    const fuge = num(v.fuge);
    const verschnitt = num(v.verschnitt);
    const sichtflaeche = ((lcm + fuge) / 100) * ((hcm + fuge) / 100);
    const steineProQm = sichtflaeche > 0 ? 1 / sichtflaeche : 0;
    const bedarfFlaeche = flaeche * (1 + verschnitt / 100);
    const stueck = Math.ceil(bedarfFlaeche * steineProQm);
    return [
      { label: 'Benötigte Mauersteine', value: stueck, unit: 'Stück', digits: 0, primary: true },
      { label: 'Steine je m²', value: steineProQm, unit: 'Stück/m²', digits: 2 },
    ];
  },
  intro:
    'Der Mauersteine-Rechner ermittelt die Stückzahl für eine Wand. Entscheidend ist die Sichtfläche eines Steins inklusive Mörtelfuge: Aus ihr ergibt sich die Zahl der Steine je Quadratmeter. Ein Verschnitt-Zuschlag deckt Zuschnitte an Ecken, Öffnungen und Bruch ab. Die Werte gelten für einschaliges Mauerwerk; bei zweischaligen Wänden rechnest du jede Schale getrennt.',
  howto: [
    'Wandfläche eingeben (Länge × Höhe, große Öffnungen abziehen).',
    'Steinformat in Zentimetern eintragen (z. B. 24 × 11,3 für NF-Ziegel).',
    'Fugendicke wählen – 1 cm bei Normalmörtel, sehr klein bei Dünnbett.',
    'Verschnitt ergänzen und benötigte Steinzahl ablesen.',
  ],
  faq: [
    { q: 'Wie viele Steine pro Quadratmeter?', a: 'Bei einem NF-Ziegel (24 × 11,3 cm) mit 1 cm Fuge sind es rund 30 Steine je Quadratmeter. Je kleiner das Format, desto mehr Steine; große Plansteine brauchen entsprechend weniger.' },
    { q: 'Muss ich die Fuge mitrechnen?', a: 'Ja. Die Mörtelfuge vergrößert die Fläche, die ein Stein im Mauerwerk einnimmt. Ohne Fuge würde man zu viele Steine bestellen. Bei Dünnbettmörtel ist die Fuge nur etwa 1 mm.' },
    { q: 'Wie viel Verschnitt einplanen?', a: 'Üblich sind 5–10 %. Bei vielen Ecken, Aussparungen oder unregelmäßigen Wänden eher mehr, damit beim Mauern kein Stein fehlt.' },
    { q: 'Gilt das auch für Porenbeton oder Kalksandstein?', a: 'Ja, die Methode funktioniert für jedes Steinformat. Trage einfach Länge, Höhe und die passende Fugendicke des verwendeten Steins ein.' },
  ],
  related: ['betonmenge-fundament-rechner', 'putz-rechner', 'wandfarbe-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { flaeche: 10, steinlaenge: 24, steinhoehe: 11.3, fuge: 1, verschnitt: 5 },
      expect: [
        { label: 'Steine je m²', value: 32.52, tolerance: 0.1 },
        { label: 'Benötigte Mauersteine', value: 342, tolerance: 0.01 },
      ],
    },
    {
      values: { flaeche: 20, steinlaenge: 24, steinhoehe: 23.8, fuge: 1, verschnitt: 0 },
      expect: [
        { label: 'Steine je m²', value: 16.13, tolerance: 0.05 },
        { label: 'Benötigte Mauersteine', value: 323, tolerance: 0.01 },
      ],
    },
  ],
};
