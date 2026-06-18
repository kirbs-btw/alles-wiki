import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'rabattrechner',
  category: 'finanzen',
  title: 'Rabattrechner',
  shortTitle: 'Rabattrechner',
  description:
    'Berechne den Rabatt und den reduzierten Preis: Wie viel sparst du bei einem Prozent-Nachlass und was kostet die Ware nach Abzug? Auch zwei Rabatte.',
  keywords: [
    'rabattrechner',
    'rabatt berechnen',
    'prozent rabatt ausrechnen',
    'preis nach rabatt',
    'nachlass berechnen',
    'sale preis rechner',
    'ersparnis berechnen',
  ],
  formula: 'Endpreis = Originalpreis × (1 − Rabatt1/100) × (1 − Rabatt2/100); Ersparnis = Original − Endpreis',
  inputs: [
    { type: 'number', id: 'preis', label: 'Originalpreis', unit: '€', default: 80, min: 0, step: 0.01 },
    { type: 'number', id: 'rabatt1', label: 'Rabatt', unit: '%', default: 25, min: 0, max: 100, step: 0.5 },
    { type: 'number', id: 'rabatt2', label: 'Zusatzrabatt (optional)', unit: '%', default: 0, min: 0, max: 100, step: 0.5, help: 'Wird auf den bereits reduzierten Preis angewendet.' },
  ],
  compute: (v) => {
    const preis = num(v.preis);
    const r1 = Math.min(100, Math.max(0, num(v.rabatt1)));
    const r2 = Math.min(100, Math.max(0, num(v.rabatt2)));
    const endpreis = preis * (1 - r1 / 100) * (1 - r2 / 100);
    const ersparnis = preis - endpreis;
    const ersparnisProzent = preis > 0 ? ersparnis / preis * 100 : 0;
    return [
      { label: 'Endpreis', value: endpreis, unit: '€', digits: 2, primary: true },
      { label: 'Ersparnis', value: ersparnis, unit: '€', digits: 2 },
      { label: 'Gesamtrabatt', value: ersparnisProzent, unit: '%', digits: 1 },
    ];
  },
  intro:
    'Der Rabattrechner zeigt, wie viel ein Prozent-Nachlass in Euro ausmacht und was die Ware nach Abzug kostet. Praktisch ist die zweite Rabattzeile: Damit kannst du gestapelte Rabatte berechnen, etwa einen Sale-Preis plus zusätzlichen Gutschein. Wichtig: Zwei Rabatte hintereinander ergeben nicht einfach die Summe, weil der zweite Nachlass auf den bereits reduzierten Preis wirkt.',
  howto: [
    'Gib den Originalpreis der Ware ein.',
    'Trage den Rabatt in Prozent ein.',
    'Optional: Trage einen zweiten Rabatt ein, der auf den reduzierten Preis wirkt.',
    'Ergebnis: Endpreis, Ersparnis in Euro und der effektive Gesamtrabatt.',
  ],
  faq: [
    { q: 'Warum ist 25 % plus 10 % nicht 35 %?', a: 'Der zweite Rabatt wird auf den bereits reduzierten Preis berechnet. 25 % und danach 10 % ergeben effektiv 32,5 % Gesamtrabatt, nicht 35 %.' },
    { q: 'Wie rechne ich nur einen einfachen Rabatt?', a: 'Lass das Feld Zusatzrabatt einfach auf 0. Dann wird nur der erste Rabatt vom Originalpreis abgezogen.' },
    { q: 'Wie viel Prozent Rabatt bekomme ich aus einem Eurobetrag?', a: 'Teile die Ersparnis durch den Originalpreis und multipliziere mit 100. 20 Euro Nachlass auf 80 Euro entsprechen 25 Prozent.' },
    { q: 'Ist die Mehrwertsteuer berücksichtigt?', a: 'Rabatte wirken auf den ausgewiesenen Preis. Ob das ein Brutto- oder Nettopreis ist, hängt vom Angebot ab; für die MwSt-Umrechnung nutze den Mehrwertsteuer-Rechner.' },
  ],
  related: ['mehrwertsteuer-rechner', 'skonto', 'prozentrechner'],
  examples: [
    {
      values: { preis: 80, rabatt1: 25, rabatt2: 0 },
      expect: [
        { label: 'Endpreis', value: 60, tolerance: 0.01 },
        { label: 'Ersparnis', value: 20, tolerance: 0.01 },
      ],
    },
  ],
  updated: '2026-06-18',
};
