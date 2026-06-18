import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'netto-stundenlohn-rechner',
  category: 'beruf',
  title: 'Netto-Stundenlohn Rechner (effektiv)',
  shortTitle: 'Netto-Stundenlohn',
  description:
    'Berechne deinen echten Netto-Stundenlohn: Nettogehalt geteilt durch tatsächlich geleistete Stunden inklusive unbezahlter Überstunden.',
  keywords: [
    'netto stundenlohn rechner',
    'effektiver stundenlohn berechnen',
    'echter stundenlohn netto',
    'was verdiene ich pro stunde netto',
    'stundenlohn aus monatsgehalt netto',
    'netto pro arbeitsstunde',
  ],
  formula:
    'Netto-Stundenlohn = Netto-Monatsgehalt ÷ ((Wochenstunden + Überstunden/Woche) × 4,33)',
  inputs: [
    { type: 'number', id: 'netto', label: 'Netto-Monatsgehalt', unit: '€', default: 2200, min: 0, step: 50 },
    { type: 'number', id: 'wochenstunden', label: 'Vertragliche Wochenstunden', unit: 'h', default: 40, min: 1, step: 0.5 },
    { type: 'number', id: 'mehrarbeit', label: 'Unbezahlte Mehrarbeit pro Woche', unit: 'h', default: 0, min: 0, step: 0.5, help: 'Regelmäßige Überstunden, die nicht extra vergütet werden.' },
  ],
  compute: (v) => {
    const netto = num(v.netto);
    const wochenstunden = num(v.wochenstunden);
    const mehrarbeit = num(v.mehrarbeit);

    const wochenGesamt = wochenstunden + mehrarbeit;
    const monatsstundenVertrag = wochenstunden * 4.33;
    const monatsstundenReal = wochenGesamt * 4.33;

    const nettoVertraglich = monatsstundenVertrag > 0 ? netto / monatsstundenVertrag : 0;
    const nettoEffektiv = monatsstundenReal > 0 ? netto / monatsstundenReal : 0;

    return [
      { label: 'Effektiver Netto-Stundenlohn', value: nettoEffektiv, unit: '€', digits: 2, primary: true },
      { label: 'Netto-Stundenlohn (nur Vertragsstunden)', value: nettoVertraglich, unit: '€', digits: 2 },
      { label: 'Reale Monatsstunden', value: monatsstundenReal, unit: 'h', digits: 1 },
    ];
  },
  intro:
    'Was verdienst du wirklich pro Stunde – nach Abzügen und inklusive unbezahlter Überstunden? Dieser Rechner teilt dein Netto-Monatsgehalt durch die tatsächlich geleisteten Monatsstunden. Wer regelmäßig unbezahlte Mehrarbeit leistet, sieht so, wie stark der echte Stundenlohn unter dem vertraglichen liegt. Als Monatsfaktor werden 4,33 Wochen angesetzt.',
  howto: [
    'Trage dein Netto-Monatsgehalt ein.',
    'Gib deine vertraglichen Wochenstunden an.',
    'Erfasse regelmäßige unbezahlte Mehrarbeit pro Woche.',
    'Lies den effektiven Netto-Stundenlohn ab.',
  ],
  faq: [
    { q: 'Warum mal 4,33?', a: 'Ein Monat hat im Schnitt 52 Wochen ÷ 12 = 4,33 Wochen. Damit werden Wochenstunden in durchschnittliche Monatsstunden umgerechnet.' },
    { q: 'Was bringt der Vergleich mit der Mehrarbeit?', a: 'Unbezahlte Überstunden senken den echten Stundenlohn. Der Rechner zeigt, wie groß der Unterschied zwischen vertraglichem und tatsächlichem Stundenlohn ist.' },
    { q: 'Brutto oder netto?', a: 'Du gibst dein Nettogehalt ein, daher ist auch das Ergebnis netto. Für den Brutto-Stundensatz nutze den passenden Brutto-Rechner.' },
    { q: 'Sind bezahlte Überstunden hier zu erfassen?', a: 'Nein, nur unbezahlte Mehrarbeit. Bezahlte Überstunden erhöhen das Gehalt und werden separat vergütet.' },
  ],
  related: ['brutto-stundensatz-rechner', 'stundenlohn-rechner', 'ueberstunden-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { netto: 2200, wochenstunden: 40, mehrarbeit: 0 },
      expect: [
        { label: 'Reale Monatsstunden', value: 173.2, tolerance: 0.1 },
        { label: 'Effektiver Netto-Stundenlohn', value: 12.7, tolerance: 0.05 },
      ],
    },
    {
      values: { netto: 2200, wochenstunden: 40, mehrarbeit: 5 },
      expect: [
        { label: 'Reale Monatsstunden', value: 194.85, tolerance: 0.1 },
        { label: 'Effektiver Netto-Stundenlohn', value: 11.29, tolerance: 0.05 },
      ],
    },
  ],
};
