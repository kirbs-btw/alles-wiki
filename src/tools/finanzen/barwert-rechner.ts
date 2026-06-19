import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'barwert-rechner',
  category: 'finanzen',
  title: 'Barwert-Rechner (Present Value)',
  shortTitle: 'Barwert',
  description:
    'Berechne den heutigen Barwert einer künftigen Zahlung – wie viel ein in einigen Jahren fälliger Betrag heute wert ist (Abzinsung mit Zinssatz).',
  keywords: [
    'barwert rechner',
    'barwert berechnen',
    'present value rechner',
    'abzinsung rechner',
    'gegenwartswert berechnen',
    'kapital abzinsen',
  ],
  formula: 'Barwert = Zukunftswert / (1 + Zins/100)^Jahre',
  inputs: [
    { type: 'number', id: 'zukunft', label: 'Künftiger Betrag', unit: '€', default: 10000, min: 0, step: 100, help: 'Zahlung, die in einigen Jahren fällig wird.' },
    { type: 'number', id: 'zins', label: 'Kalkulationszins pro Jahr', unit: '%', default: 5, min: 0, step: 0.1 },
    { type: 'number', id: 'jahre', label: 'Laufzeit bis zur Zahlung', unit: 'Jahre', default: 10, min: 0, step: 1 },
  ],
  compute: (v) => {
    const zukunft = num(v.zukunft);
    const zins = num(v.zins);
    const jahre = num(v.jahre);
    const faktor = Math.pow(1 + zins / 100, jahre);
    const barwert = faktor > 0 ? zukunft / faktor : zukunft;
    const abzinsung = zukunft - barwert;
    return [
      { label: 'Barwert heute', value: barwert, unit: '€', digits: 2, primary: true },
      { label: 'Abzinsungsbetrag', value: abzinsung, unit: '€', digits: 2, help: 'Differenz zwischen künftigem Betrag und Barwert.' },
      { label: 'Abzinsungsfaktor', value: 1 / faktor, digits: 4 },
    ];
  },
  intro:
    'Der Barwert (englisch Present Value) beantwortet die Frage: Wie viel ist ein erst in der Zukunft fälliger Geldbetrag heute wert? Da Geld verzinst werden kann, ist ein heutiger Euro mehr wert als ein Euro in zehn Jahren. Der Rechner zinst den künftigen Betrag mit dem Kalkulationszins auf den heutigen Zeitpunkt ab – Grundlage jeder Investitions- und Vergleichsrechnung.',
  howto: [
    'Gib den künftigen Betrag ein, der später fällig wird.',
    'Trage den Kalkulations- bzw. Vergleichszins pro Jahr ein.',
    'Lege die Anzahl der Jahre bis zur Zahlung fest.',
    'Lies den heutigen Barwert ab.',
  ],
  faq: [
    { q: 'Was ist der Barwert?', a: 'Der Barwert ist der heutige Gegenwert einer künftigen Zahlung. Er entsteht durch Abzinsung: Der Zukunftsbetrag wird mit dem Zinssatz auf heute zurückgerechnet.' },
    { q: 'Welchen Zinssatz sollte ich wählen?', a: 'Den Zinssatz, den du alternativ sicher erzielen könntest (Opportunitätszins), oder deine geforderte Mindestrendite. Je höher der Zins, desto kleiner der Barwert.' },
    { q: 'Wofür brauche ich den Barwert?', a: 'Um künftige Zahlungen vergleichbar zu machen – etwa bei Kaufpreis vs. Ratenzahlung, Versicherungsangeboten oder Investitionsentscheidungen.' },
  ],
  related: ['kapitalwert-rechner', 'zinseszinsrechner', 'inflationsrechner'],
  examples: [
    {
      values: { zukunft: 10000, zins: 5, jahre: 10 },
      expect: [{ label: 'Barwert heute', value: 6139.13, tolerance: 0.5 }],
    },
    {
      values: { zukunft: 5000, zins: 3, jahre: 5 },
      expect: [{ label: 'Barwert heute', value: 4313.04, tolerance: 0.5 }],
    },
  ],
  updated: '2026-06-19',
};
