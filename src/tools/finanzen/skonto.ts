import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'skonto',
  category: 'finanzen',
  title: 'Skonto-Rechner',
  shortTitle: 'Skonto',
  description:
    'Berechne den Skontoabzug und Zahlbetrag bei früher Zahlung – plus den effektiven Jahreszins, der zeigt, ob sich Skonto wirklich lohnt.',
  keywords: [
    'skonto rechner',
    'skonto berechnen',
    'skonto abziehen',
    'zahlbetrag skonto',
    'skonto effektivzins',
    '2 prozent skonto',
    'skonto lohnt sich',
  ],
  formula: 'Zahlbetrag = Rechnung × (1 − Skonto/100); p.a. = Skonto/(100−Skonto) × 360/(Zahlungsziel − Skontofrist) × 100',
  inputs: [
    { type: 'number', id: 'betrag', label: 'Rechnungsbetrag', unit: '€', default: 1000, min: 0, step: 0.01 },
    { type: 'number', id: 'skonto', label: 'Skontosatz', unit: '%', default: 2, min: 0, max: 100, step: 0.1 },
    { type: 'number', id: 'skontofrist', label: 'Skontofrist', unit: 'Tage', default: 10, min: 0, step: 1, help: 'Zahlung bis hierhin mit Skonto.' },
    { type: 'number', id: 'zahlungsziel', label: 'Zahlungsziel', unit: 'Tage', default: 30, min: 1, step: 1, help: 'Letzter Zahltermin ohne Skonto.' },
  ],
  compute: (v) => {
    const betrag = num(v.betrag);
    const skonto = Math.min(100, Math.max(0, num(v.skonto)));
    const skontofrist = num(v.skontofrist);
    const zahlungsziel = num(v.zahlungsziel);
    const skontobetrag = betrag * skonto / 100;
    const zahlbetrag = betrag - skontobetrag;
    const tage = zahlungsziel - skontofrist;
    let effektiv = 0;
    if (tage > 0 && skonto < 100) {
      effektiv = (skonto / (100 - skonto)) * (360 / tage) * 100;
    }
    return [
      { label: 'Zahlbetrag mit Skonto', value: zahlbetrag, unit: '€', digits: 2, primary: true },
      { label: 'Skonto-Ersparnis', value: skontobetrag, unit: '€', digits: 2 },
      { label: 'Effektiver Jahreszins', value: effektiv, unit: '%', digits: 1 },
    ];
  },
  intro:
    'Skonto ist ein Preisnachlass für schnelle Zahlung: Wer innerhalb der Skontofrist bezahlt, darf einen Prozentsatz vom Rechnungsbetrag abziehen. Dieser Rechner zeigt den reduzierten Zahlbetrag und die Ersparnis. Spannend ist der effektive Jahreszins: Er rechnet den Skontovorteil auf ein Jahr hoch und macht deutlich, dass sich Skonto fast immer lohnt – oft sogar, wenn man dafür den Dispo nutzt.',
  howto: [
    'Gib den Bruttorechnungsbetrag ein.',
    'Trage den Skontosatz in Prozent ein (z. B. 2 oder 3).',
    'Lege die Skontofrist fest – bis zu diesem Tag gilt der Abzug.',
    'Gib das volle Zahlungsziel ein und lies Zahlbetrag und Effektivzins ab.',
  ],
  faq: [
    { q: 'Wie funktioniert Skonto?', a: 'Zahlst du innerhalb der Skontofrist, darfst du den Skontosatz vom Rechnungsbetrag abziehen. Zahlst du später, aber innerhalb des Zahlungsziels, wird der volle Betrag fällig.' },
    { q: 'Warum ist der effektive Jahreszins so hoch?', a: 'Skonto wird für nur wenige Tage Zahlungsaufschub gewährt. Hochgerechnet aufs Jahr entspricht das oft 30 bis über 70 Prozent Zins – deshalb lohnt sich Skonto fast immer.' },
    { q: 'Auf welchen Betrag wird Skonto berechnet?', a: 'In der Regel auf den Bruttorechnungsbetrag inklusive Mehrwertsteuer. Maßgeblich ist die Vereinbarung auf der Rechnung.' },
    { q: 'Welche Tageszahl verwendet der Rechner?', a: 'Für die Jahreshochrechnung werden 360 Tage angesetzt (kaufmännisches Jahr). Das ist die übliche Konvention für die Skonto-Effektivzinsformel.' },
    { q: 'Lohnt sich Skonto immer?', a: 'Meist ja: Solange der Effektivzins des Skontos über deinen Finanzierungskosten liegt, ist es günstiger, früh zu zahlen und Skonto zu ziehen.' },
  ],
  related: ['rabattrechner', 'mehrwertsteuer-rechner', 'ratenkredit'],
  examples: [
    {
      values: { betrag: 1000, skonto: 2, skontofrist: 10, zahlungsziel: 30 },
      expect: [
        { label: 'Zahlbetrag mit Skonto', value: 980, tolerance: 0.01 },
        { label: 'Skonto-Ersparnis', value: 20, tolerance: 0.01 },
      ],
    },
  ],
  updated: '2026-06-18',
};
