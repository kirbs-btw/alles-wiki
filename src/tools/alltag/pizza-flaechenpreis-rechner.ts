import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'pizza-flaechenpreis-rechner',
  category: 'alltag',
  title: 'Pizza-Preisvergleich nach Fläche',
  shortTitle: 'Pizza-Flächenpreis',
  description:
    'Vergleiche zwei Pizzen fair über den Preis je Fläche statt je Durchmesser. So erkennst du, welche Pizza wirklich günstiger ist – die größere ist oft das bessere Angebot.',
  keywords: [
    'pizza preis vergleich',
    'pizza flaeche berechnen',
    'pizza durchmesser preis',
    'welche pizza guenstiger',
    'preis pro flaeche pizza',
    'pizza groesse vergleich',
  ],
  formula:
    'Fläche = π·(Durchmesser/2)²; Preis je 100 cm² = Preis / Fläche × 100',
  inputs: [
    { type: 'number', id: 'd1', label: 'Pizza A: Durchmesser', unit: 'cm', default: 30, min: 1, step: 1 },
    { type: 'number', id: 'p1', label: 'Pizza A: Preis', unit: '€', default: 8.5, min: 0, step: 0.5 },
    { type: 'number', id: 'd2', label: 'Pizza B: Durchmesser', unit: 'cm', default: 40, min: 1, step: 1 },
    { type: 'number', id: 'p2', label: 'Pizza B: Preis', unit: '€', default: 12, min: 0, step: 0.5 },
  ],
  compute: (v) => {
    const d1 = num(v.d1, 1);
    const p1 = num(v.p1);
    const d2 = num(v.d2, 1);
    const p2 = num(v.p2);
    const a1 = Math.PI * (d1 / 2) * (d1 / 2);
    const a2 = Math.PI * (d2 / 2) * (d2 / 2);
    const preis1 = a1 > 0 ? (p1 / a1) * 100 : 0;
    const preis2 = a2 > 0 ? (p2 / a2) * 100 : 0;
    let fazit: string;
    if (preis1 === 0 && preis2 === 0) fazit = '–';
    else if (preis1 < preis2) fazit = 'Pizza A ist günstiger je Fläche';
    else if (preis2 < preis1) fazit = 'Pizza B ist günstiger je Fläche';
    else fazit = 'Beide Pizzen sind je Fläche gleich teuer';
    return [
      { label: 'Günstiger je Fläche', value: fazit, primary: true },
      { label: 'Pizza A: Preis je 100 cm²', value: preis1, unit: '€', digits: 3 },
      { label: 'Pizza B: Preis je 100 cm²', value: preis2, unit: '€', digits: 3 },
      { label: 'Pizza A: Fläche', value: a1, unit: 'cm²', digits: 0 },
      { label: 'Pizza B: Fläche', value: a2, unit: 'cm²', digits: 0 },
    ];
  },
  intro:
    'Eine Pizza mit 40 cm Durchmesser ist nicht nur ein Drittel größer als eine mit 30 cm, sondern fast doppelt so groß – denn die Fläche wächst im Quadrat zum Durchmesser. Wer Pizzen nur nach Durchmesser und Preis vergleicht, täuscht sich leicht. Dieser Rechner ermittelt den Preis je Fläche und zeigt dir, welches Angebot wirklich günstiger ist.',
  howto: [
    'Trage Durchmesser und Preis der ersten Pizza ein.',
    'Trage Durchmesser und Preis der zweiten Pizza ein.',
    'Lies den Preis je 100 cm² für beide ab.',
    'Das Fazit zeigt, welche Pizza je Fläche günstiger ist.',
  ],
  faq: [
    { q: 'Warum nicht einfach Preis durch Durchmesser?', a: 'Weil die Pizzafläche quadratisch mit dem Durchmesser wächst. Ein doppelter Durchmesser bedeutet vierfache Fläche – nur der Flächenpreis macht Angebote fair vergleichbar.' },
    { q: 'Ist die größere Pizza meist günstiger?', a: 'Häufig ja. Da die Fläche überproportional wächst, ist der Preis pro Fläche bei größeren Pizzen oft niedriger. Dieser Rechner zeigt es im Einzelfall.' },
    { q: 'Funktioniert das auch für eckige Pizzen?', a: 'Dieser Rechner ist für runde Pizzen gedacht. Für rechteckige Bleche kannst du die Fläche als Länge × Breite separat vergleichen.' },
  ],
  related: ['pizzateig-rechner', 'quadratmeterpreis-rechner', 'backform-umrechnen-rechner'],
  updated: '2026-06-19',
  examples: [
    {
      values: { d1: 30, p1: 8.5, d2: 40, p2: 12 },
      expect: [
        { label: 'Pizza A: Preis je 100 cm²', value: 1.203, tolerance: 0.005 },
        { label: 'Pizza B: Preis je 100 cm²', value: 0.955, tolerance: 0.005 },
      ],
    },
    {
      values: { d1: 28, p1: 7, d2: 32, p2: 9 },
      expect: [
        { label: 'Pizza A: Preis je 100 cm²', value: 1.137, tolerance: 0.005 },
        { label: 'Pizza B: Preis je 100 cm²', value: 1.119, tolerance: 0.005 },
      ],
    },
  ],
};
