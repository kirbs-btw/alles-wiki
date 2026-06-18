import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

// Gebührentabelle Anlage 2 zu § 13 RVG (1,0-Gebühr je Forderungshöhe, Stand 2026)
function rvgEinfacheGebuehr(wert: number): number {
  if (wert <= 0) return 0;
  const stufen: { bis: number; gebuehr: number }[] = [
    { bis: 500, gebuehr: 49 },
    { bis: 1000, gebuehr: 88 },
    { bis: 1500, gebuehr: 127 },
    { bis: 2000, gebuehr: 166 },
    { bis: 3000, gebuehr: 222 },
    { bis: 4000, gebuehr: 278 },
    { bis: 5000, gebuehr: 334 },
    { bis: 6000, gebuehr: 390 },
    { bis: 7000, gebuehr: 446 },
    { bis: 8000, gebuehr: 502 },
    { bis: 9000, gebuehr: 558 },
    { bis: 10000, gebuehr: 614 },
    { bis: 13000, gebuehr: 666 },
    { bis: 16000, gebuehr: 718 },
    { bis: 19000, gebuehr: 770 },
    { bis: 22000, gebuehr: 822 },
    { bis: 25000, gebuehr: 874 },
    { bis: 30000, gebuehr: 955 },
    { bis: 50000, gebuehr: 1279 },
  ];
  for (const s of stufen) {
    if (wert <= s.bis) return s.gebuehr;
  }
  return 1279;
}

export const tool: Tool = {
  slug: 'inkassokosten-rechner',
  category: 'recht',
  title: 'Inkassokosten-Rechner (Geschäftsgebühr)',
  shortTitle: 'Inkassokosten',
  description:
    'Berechne die erstattungsfähigen Inkassokosten aus der Forderungshöhe: Geschäftsgebühr nach RVG/RDGEG plus Auslagenpauschale (Stand 2026, Orientierung).',
  keywords: [
    'inkassokosten rechner',
    'inkassokosten berechnen',
    'inkasso gebühren',
    'inkasso geschäftsgebühr',
    'inkassokosten höhe',
    'erstattungsfähige inkassokosten',
  ],
  formula: 'Inkassokosten = Faktor × 1,0-Gebühr (RVG) + Auslagenpauschale (max. 20 €)',
  inputs: [
    { type: 'number', id: 'forderung', label: 'Hauptforderung', unit: '€', default: 1000, min: 0, step: 50, help: 'Offener Rechnungs- bzw. Forderungsbetrag.' },
    {
      type: 'select', id: 'faktor', label: 'Geschäftsgebühr', default: '0.9',
      options: [
        { value: '0.5', label: '0,5 (einfache erste Mahnung)' },
        { value: '0.9', label: '0,9 (Regelfall unbestrittene Forderung)' },
        { value: '1.3', label: '1,3 (höherer Aufwand, Höchstsatz Regelfall)' },
      ],
    },
  ],
  compute: (v) => {
    const forderung = num(v.forderung);
    const faktor = num(v.faktor, 0.9);
    const einfach = rvgEinfacheGebuehr(forderung);
    const geschaeftsgebuehr = faktor * einfach;
    const pauschale = Math.min(geschaeftsgebuehr * 0.2, 20);
    const kosten = geschaeftsgebuehr + pauschale;
    return [
      { label: 'Inkassokosten', value: kosten, unit: '€', digits: 2, primary: true },
      { label: 'Geschäftsgebühr', value: geschaeftsgebuehr, unit: '€', digits: 2 },
      { label: 'Auslagenpauschale', value: pauschale, unit: '€', digits: 2 },
    ];
  },
  intro:
    'Geraten Sie in Verzug, darf der Gläubiger die Kosten eines Inkassodienstes als Verzugsschaden geltend machen – allerdings nur in der Höhe, die auch ein Rechtsanwalt verlangen könnte. Maßgeblich ist die Geschäftsgebühr nach dem RVG; bei unbestrittenen Forderungen ist der Satz auf 0,9 begrenzt (§ 13e RDG/RVG). Dieser Rechner liefert eine Orientierung ohne Umsatzsteuer; verlangte Beträge darüber sind häufig nicht erstattungsfähig.',
  howto: [
    'Höhe der offenen Hauptforderung eingeben.',
    'Passenden Gebührensatz wählen – bei klaren Fällen meist 0,9.',
    'Erstattungsfähige Inkassokosten ablesen.',
  ],
  faq: [
    { q: 'Wie hoch dürfen Inkassokosten sein?', a: 'Sie dürfen die Gebühren nicht übersteigen, die ein Rechtsanwalt nach dem RVG für dieselbe Tätigkeit berechnen dürfte. Bei einfachen, unbestrittenen Forderungen ist der Gebührensatz auf 0,9 gedeckelt.' },
    { q: 'Muss ich überhöhte Inkassokosten zahlen?', a: 'Nein. Inkassokosten sind nur in der Höhe zu erstatten, in der sie zur Rechtsverfolgung erforderlich und angemessen sind. Über die RVG-Grenze hinausgehende Forderungen müssen Sie nicht begleichen.' },
    { q: 'Ab wann fallen Inkassokosten an?', a: 'Erst mit Eintritt des Schuldnerverzugs. Dieser tritt regelmäßig durch eine Mahnung oder spätestens 30 Tage nach Fälligkeit und Rechnungszugang ein.' },
    { q: 'Sind Verzugszinsen zusätzlich fällig?', a: 'Ja, neben den Inkassokosten kann der Gläubiger Verzugszinsen verlangen. Diese berechnest du separat mit dem Verzugszinsen-Rechner.' },
  ],
  related: ['mahngebuehren-rechner', 'verzugszinsen-rechner', 'anwaltskosten-rechner'],
  examples: [
    {
      values: { forderung: 1000, faktor: '0.9' },
      expect: [
        { label: 'Geschäftsgebühr', value: 79.2, tolerance: 0.5 },
        { label: 'Auslagenpauschale', value: 15.84, tolerance: 0.1 },
        { label: 'Inkassokosten', value: 95.04, tolerance: 0.5 },
      ],
    },
    {
      values: { forderung: 5000, faktor: '1.3' },
      expect: [
        { label: 'Geschäftsgebühr', value: 434.2, tolerance: 0.5 },
        { label: 'Auslagenpauschale', value: 20, tolerance: 0.01 },
      ],
    },
  ],
  updated: '2026-06-18',
};
