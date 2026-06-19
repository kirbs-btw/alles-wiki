import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'disagio-rechner',
  category: 'finanzen',
  title: 'Disagio-Rechner (Auszahlungskurs)',
  shortTitle: 'Disagio',
  description:
    'Berechne aus Darlehensbetrag und Auszahlungskurs das Disagio (Damnum) und die tatsächliche Auszahlung – der Abschlag, der dir vom Kredit fehlt.',
  keywords: [
    'disagio rechner',
    'disagio berechnen',
    'auszahlungskurs rechner',
    'damnum berechnen',
    'auszahlungsbetrag darlehen',
  ],
  formula:
    'Auszahlung = Darlehen × Auszahlungskurs/100; Disagio = Darlehen − Auszahlung; Disagio in % = 100 − Auszahlungskurs',
  inputs: [
    { type: 'number', id: 'darlehen', label: 'Nominaler Darlehensbetrag', unit: '€', default: 100000, min: 0, step: 1000, help: 'Betrag, der zu verzinsen und zurückzuzahlen ist.' },
    { type: 'number', id: 'kurs', label: 'Auszahlungskurs', unit: '%', default: 96, min: 1, max: 100, step: 0.1, help: '96 % = 4 % Disagio.' },
  ],
  compute: (v) => {
    const darlehen = num(v.darlehen);
    const kurs = num(v.kurs);
    const auszahlung = (darlehen * kurs) / 100;
    const disagio = darlehen - auszahlung;
    const disagioPct = 100 - kurs;
    return [
      { label: 'Tatsächliche Auszahlung', value: auszahlung, unit: '€', digits: 2, primary: true },
      { label: 'Disagio (Damnum)', value: disagio, unit: '€', digits: 2 },
      { label: 'Disagio in Prozent', value: disagioPct, unit: '%', digits: 2 },
    ];
  },
  intro:
    'Das Disagio (auch Damnum oder Abgeld) ist ein Abschlag bei der Darlehensauszahlung: Vereinbarst du einen Auszahlungskurs unter 100 %, bekommst du weniger ausgezahlt, als du nominal zurückzahlen musst. Im Gegenzug ist der Nominalzins meist niedriger – das Disagio ist eine vorausbezahlte Zinszahlung. Dieser Rechner zeigt die tatsächliche Auszahlung und den einbehaltenen Betrag.',
  howto: [
    'Gib den nominalen Darlehensbetrag ein, den du verzinst und zurückzahlst.',
    'Trage den vereinbarten Auszahlungskurs in Prozent ein.',
    'Lies die tatsächliche Auszahlung und das einbehaltene Disagio ab.',
  ],
  faq: [
    { q: 'Was ist ein Disagio?', a: 'Ein Abschlag vom Darlehensbetrag bei der Auszahlung. Bei 96 % Auszahlungskurs auf 100.000 € bekommst du 96.000 € ausgezahlt, musst aber 100.000 € verzinsen und tilgen.' },
    { q: 'Warum vereinbart man ein Disagio?', a: 'Das Disagio ist eine vorgezogene Zinszahlung. Banken senken im Gegenzug den Nominalzins. Der effektive Jahreszins bleibt vergleichbar – das Disagio verschiebt nur die Kostenverteilung.' },
    { q: 'Ist das Disagio steuerlich absetzbar?', a: 'Bei vermieteten Immobilien kann ein marktübliches Disagio als Werbungskosten geltend gemacht werden. Lass dich hierzu steuerlich beraten; dieser Rechner trifft keine steuerliche Aussage.' },
  ],
  related: ['kreditrechner', 'effektiver-jahreszins-rechner', 'tilgungsrechner'],
  examples: [
    {
      values: { darlehen: 100000, kurs: 96 },
      expect: [
        { label: 'Tatsächliche Auszahlung', value: 96000, tolerance: 0.5 },
        { label: 'Disagio (Damnum)', value: 4000, tolerance: 0.5 },
      ],
    },
  ],
  updated: '2026-06-19',
};
