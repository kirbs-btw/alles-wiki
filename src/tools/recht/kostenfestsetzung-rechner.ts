import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'kostenfestsetzung-rechner',
  category: 'recht',
  title: 'Kostenfestsetzung-Rechner (erstattungsfähige Kosten)',
  shortTitle: 'Kostenfestsetzung',
  description:
    'Berechne die nach der Kostenquote erstattungsfähigen Prozesskosten: Was du von Gerichts- und Anwaltskosten erstattet bekommst bzw. selbst trägst (Orientierung).',
  keywords: [
    'kostenfestsetzung rechner',
    'erstattungsfähige kosten berechnen',
    'kostenfestsetzungsbeschluss',
    'prozesskosten erstattung',
    'kostenerstattung quote',
    'kostenausgleich gericht',
  ],
  formula: 'Erstattung = Obsiegensquote × eigene erstattungsfähige Kosten − Unterliegensquote × gegnerische Kosten',
  inputs: [
    { type: 'number', id: 'eigeneKosten', label: 'Eigene erstattungsfähige Kosten', unit: '€', default: 1500, min: 0, step: 50, help: 'Eigene Anwalts- und Gerichtskosten (RVG/GKG).' },
    { type: 'number', id: 'gegnerKosten', label: 'Gegnerische Kosten', unit: '€', default: 1200, min: 0, step: 50, help: 'Erstattungsfähige Kosten der Gegenseite.' },
    { type: 'number', id: 'obsiegen', label: 'Obsiegensquote', unit: '%', default: 70, min: 0, max: 100, step: 5, help: 'Anteil, zu dem du obsiegst (Gegner trägt diese Quote der Kosten).' },
  ],
  compute: (v) => {
    const eigeneKosten = num(v.eigeneKosten);
    const gegnerKosten = num(v.gegnerKosten);
    let obsiegen = num(v.obsiegen);
    if (obsiegen < 0) obsiegen = 0;
    if (obsiegen > 100) obsiegen = 100;
    const obsiegQuote = obsiegen / 100;
    const unterliegQuote = 1 - obsiegQuote;
    // Erstattung der eigenen Kosten durch Gegner (in Höhe der Obsiegensquote)
    const erhalteVomGegner = obsiegQuote * eigeneKosten;
    // Eigene Beteiligung an gegnerischen Kosten (in Höhe der Unterliegensquote)
    const zahleAnGegner = unterliegQuote * gegnerKosten;
    const saldo = erhalteVomGegner - zahleAnGegner;
    return [
      { label: 'Saldo Kostenerstattung', value: saldo, unit: '€', digits: 2, primary: true, help: 'Positiv = du erhältst; negativ = du zahlst.' },
      { label: 'Erstattung vom Gegner', value: erhalteVomGegner, unit: '€', digits: 2 },
      { label: 'Anteil an gegnerischen Kosten', value: zahleAnGegner, unit: '€', digits: 2 },
    ];
  },
  intro:
    'Im Zivilprozess werden die Kosten nach der Obsiegens- bzw. Unterliegensquote verteilt (§ 91, 92 ZPO). Im Kostenfestsetzungsverfahren rechnet das Gericht die erstattungsfähigen Kosten beider Seiten gegeneinander auf. Dieser Rechner zeigt als Orientierung, welchen Saldo du erhältst oder zahlst – erfasst werden nur die erstattungsfähigen Gerichts- und Anwaltsgebühren, keine darüber hinausgehenden Auslagen.',
  howto: [
    'Eigene erstattungsfähige Kosten eingeben.',
    'Erstattungsfähige Kosten der Gegenseite eingeben.',
    'Obsiegensquote angeben (z. B. 70 %).',
    'Saldo der Kostenerstattung ablesen.',
  ],
  faq: [
    { q: 'Was sind erstattungsfähige Kosten?', a: 'Erstattungsfähig sind die zur zweckentsprechenden Rechtsverfolgung notwendigen Kosten – vor allem die gesetzlichen Anwaltsgebühren nach RVG und die Gerichtskosten nach GKG.' },
    { q: 'Wie funktioniert der Kostenausgleich?', a: 'Bei teilweisem Obsiegen werden die Kosten quotal verteilt. Das Gericht saldiert, welchen Betrag eine Seite der anderen letztlich zu erstatten hat – das ist der Inhalt des Kostenfestsetzungsbeschlusses.' },
    { q: 'Sind die eigenen Anwaltskosten voll erstattungsfähig?', a: 'Nur in Höhe der gesetzlichen Gebühren. Ein mit dem Anwalt vereinbartes höheres Honorar (Vergütungsvereinbarung) wird nicht vom Gegner erstattet.' },
    { q: 'Was bedeutet ein negativer Saldo?', a: 'Ein negativer Saldo heißt, dass du der Gegenseite per Saldo Kosten erstatten musst – etwa weil du überwiegend unterlegen bist.' },
  ],
  related: ['kostenquote-rechner', 'prozesskostenrisiko-rechner', 'gerichtskosten-rechner'],
  examples: [
    {
      values: { eigeneKosten: 1500, gegnerKosten: 1200, obsiegen: 70 },
      expect: [
        { label: 'Erstattung vom Gegner', value: 1050, tolerance: 0.5 },
        { label: 'Anteil an gegnerischen Kosten', value: 360, tolerance: 0.5 },
        { label: 'Saldo Kostenerstattung', value: 690, tolerance: 0.5 },
      ],
    },
    {
      values: { eigeneKosten: 1000, gegnerKosten: 1000, obsiegen: 50 },
      expect: [
        { label: 'Saldo Kostenerstattung', value: 0, tolerance: 0.5 },
      ],
    },
  ],
  updated: '2026-06-18',
};
