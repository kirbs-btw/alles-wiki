import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'beleuchtung-lumen-rechner',
  category: 'wohnen',
  title: 'Beleuchtung Lumen-Rechner pro Raum',
  shortTitle: 'Lumen pro Raum',
  description:
    'Berechne, wie viel Lumen ein Raum braucht – aus Raumfläche und Raumart mit den empfohlenen Beleuchtungsstärken in Lux.',
  keywords: [
    'lumen pro raum berechnen',
    'beleuchtung lumen rechner',
    'wie viel lumen wohnzimmer',
    'lux raum berechnen',
    'lumen pro qm',
  ],
  formula:
    'Lumen = Beleuchtungsstärke (Lux) × Raumfläche (m²). Die empfohlene Lux-Zahl richtet sich nach der Raumart.',
  inputs: [
    { type: 'number', id: 'flaeche', label: 'Raumfläche', unit: 'm²', default: 25, min: 1, step: 0.5 },
    {
      type: 'select',
      id: 'raumart',
      label: 'Raumart',
      default: '150',
      options: [
        { value: '100', label: 'Flur / Diele (~100 lx)' },
        { value: '120', label: 'Schlafzimmer (~120 lx)' },
        { value: '150', label: 'Wohnzimmer (~150 lx)' },
        { value: '200', label: 'Bad / Esszimmer (~200 lx)' },
        { value: '300', label: 'Küche (~300 lx)' },
        { value: '500', label: 'Arbeitszimmer / Büro (~500 lx)' },
      ],
      help: 'Empfohlene Beleuchtungsstärke für die Allgemeinbeleuchtung.',
    },
    { type: 'number', id: 'effizienz', label: 'Lichtausbeute der Leuchtmittel', unit: 'lm/W', default: 100, min: 1, step: 5, help: 'Moderne LED: ca. 90–120 lm/W.' },
  ],
  compute: (v) => {
    const flaeche = num(v.flaeche);
    const lux = num(v.raumart);
    const effizienz = num(v.effizienz);
    const lumen = lux * flaeche;
    const watt = effizienz > 0 ? lumen / effizienz : 0;
    return [
      { label: 'Benötigte Lichtmenge', value: lumen, unit: 'lm', digits: 0, primary: true },
      { label: 'Geschätzte LED-Leistung', value: watt, unit: 'W', digits: 0 },
      { label: 'Empfohlene Beleuchtungsstärke', value: lux, unit: 'lx', digits: 0 },
    ];
  },
  intro:
    'Wie hell ein Raum wirkt, hängt nicht von der Wattzahl ab, sondern vom Lichtstrom in Lumen. Die benötigte Lumenzahl ergibt sich aus der gewünschten Beleuchtungsstärke in Lux multipliziert mit der Raumfläche. Wohnräume kommen mit moderaten Werten aus, Arbeitsbereiche brauchen deutlich mehr Licht. Der Rechner liefert die Gesamt-Lumenmenge für die Allgemeinbeleuchtung und schätzt die nötige LED-Leistung.',
  howto: [
    'Raumfläche in m² eingeben.',
    'Raumart wählen – damit wird die empfohlene Beleuchtungsstärke gesetzt.',
    'Lichtausbeute der Leuchtmittel angeben (LED meist 90–120 lm/W).',
    'Benötigte Lumenzahl ablesen und auf mehrere Lichtquellen verteilen.',
  ],
  faq: [
    { q: 'Wie viele Lumen braucht ein Wohnzimmer?', a: 'Für ein 25 m² großes Wohnzimmer mit empfohlenen 150 Lux ergeben sich rund 3.750 Lumen Grundbeleuchtung. Zusätzliche Leselampen oder Akzentlicht kommen je nach Nutzung hinzu.' },
    { q: 'Lux oder Lumen – was ist der Unterschied?', a: 'Lumen beschreibt den gesamten Lichtstrom einer Lichtquelle. Lux ist die Beleuchtungsstärke auf einer Fläche, also Lumen pro Quadratmeter. Lumen = Lux × Fläche.' },
    { q: 'Warum auf mehrere Lampen verteilen?', a: 'Eine einzelne sehr helle Quelle blendet und wirft harte Schatten. Die berechnete Lumenmenge sollte daher auf mehrere Leuchten oder eine Kombination aus Grund-, Zonen- und Akzentlicht verteilt werden.' },
  ],
  related: ['wohnflaeche-rechner', 'raumvolumen-rechner', 'wandfarbe-rechner'],
  updated: '2026-06-19',
  examples: [
    {
      values: { flaeche: 25, raumart: '150', effizienz: 100 },
      expect: [
        { label: 'Benötigte Lichtmenge', value: 3750, tolerance: 0.5 },
        { label: 'Geschätzte LED-Leistung', value: 37.5, tolerance: 0.5 },
      ],
    },
    {
      values: { flaeche: 12, raumart: '300', effizienz: 100 },
      expect: [
        { label: 'Benötigte Lichtmenge', value: 3600, tolerance: 0.5 },
      ],
    },
  ],
};
