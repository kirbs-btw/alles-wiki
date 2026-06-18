import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'gleitzeit-saldo-rechner',
  category: 'beruf',
  title: 'Gleitzeit-Saldo Rechner (Arbeitszeitkonto)',
  shortTitle: 'Gleitzeit-Saldo',
  description:
    'Berechne dein Gleitzeit-Saldo: Differenz zwischen geleisteten und vertraglichen Stunden – als Plus- oder Minusstunden auf dem Arbeitszeitkonto.',
  keywords: [
    'gleitzeit rechner',
    'arbeitszeitkonto saldo',
    'überstunden gleitzeit berechnen',
    'gleitzeitsaldo ermitteln',
    'plusstunden minusstunden rechner',
    'sollstunden iststunden',
  ],
  formula:
    'Saldo = Ist-Stunden − Soll-Stunden;  Soll = Wochenstunden ÷ Arbeitstage/Woche × erfasste Tage',
  inputs: [
    { type: 'number', id: 'istStunden', label: 'Tatsächlich geleistete Stunden', unit: 'h', default: 176, min: 0, step: 0.25, help: 'Summe der gearbeiteten Stunden im Betrachtungszeitraum.' },
    { type: 'number', id: 'wochenstunden', label: 'Vertragliche Wochenstunden', unit: 'h', default: 40, min: 0, step: 0.5 },
    { type: 'number', id: 'tageWoche', label: 'Arbeitstage pro Woche', unit: 'Tage', default: 5, min: 1, max: 7, step: 0.5 },
    { type: 'number', id: 'tageGesamt', label: 'Erfasste Arbeitstage im Zeitraum', unit: 'Tage', default: 22, min: 0, step: 1 },
    { type: 'number', id: 'altsaldo', label: 'Übertrag aus Vormonat (+/−)', unit: 'h', default: 0, step: 0.25, help: 'Bestehendes Gleitzeit-Guthaben (positiv) oder Minus (negativ).' },
  ],
  compute: (v) => {
    const istStunden = num(v.istStunden);
    const wochenstunden = num(v.wochenstunden);
    const tageWoche = num(v.tageWoche);
    const tageGesamt = num(v.tageGesamt);
    const altsaldo = num(v.altsaldo);

    const sollProTag = tageWoche > 0 ? wochenstunden / tageWoche : 0;
    const sollStunden = sollProTag * tageGesamt;
    const periodensaldo = istStunden - sollStunden;
    const neuerSaldo = periodensaldo + altsaldo;

    return [
      { label: 'Neues Gleitzeit-Saldo', value: neuerSaldo, unit: 'h', digits: 2, primary: true },
      { label: 'Saldo im Zeitraum', value: periodensaldo, unit: 'h', digits: 2 },
      { label: 'Soll-Stunden', value: sollStunden, unit: 'h', digits: 2 },
      { label: 'Soll-Stunden pro Tag', value: sollProTag, unit: 'h', digits: 2 },
    ];
  },
  intro:
    'Auf einem Gleitzeit- oder Arbeitszeitkonto sammeln sich Plus- und Minusstunden an. Der Rechner ermittelt aus deinen vertraglichen Wochenstunden die Soll-Stunden für den erfassten Zeitraum und vergleicht sie mit den tatsächlich geleisteten Stunden. Mit dem Übertrag aus dem Vormonat erhältst du dein aktuelles Saldo – positiv als Guthaben, negativ als Minus.',
  howto: [
    'Trage die im Zeitraum tatsächlich geleisteten Stunden ein.',
    'Gib deine vertraglichen Wochenstunden und Arbeitstage pro Woche an.',
    'Erfasse die Zahl der Arbeitstage im Zeitraum (ohne Urlaub/Krankheit).',
    'Ergänze den Übertrag aus dem Vormonat und lies das neue Saldo ab.',
  ],
  faq: [
    { q: 'Wie werden die Soll-Stunden berechnet?', a: 'Die Wochenstunden werden auf die Arbeitstage pro Woche verteilt (Soll pro Tag) und mit der Zahl der erfassten Arbeitstage multipliziert.' },
    { q: 'Wie zählen Urlaubs- und Krankheitstage?', a: 'An solchen Tagen wird in der Regel das Soll als erfüllt gebucht. Zähle sie daher nicht zu den erfassten Arbeitstagen, sonst entsteht ein scheinbares Minus.' },
    { q: 'Was bedeutet ein negatives Saldo?', a: 'Ein negatives Saldo sind Minusstunden – du hast weniger als das Soll gearbeitet und musst diese Zeit nacharbeiten oder mit Plusstunden ausgleichen.' },
    { q: 'Sind Gleitzeitstunden dasselbe wie Überstunden?', a: 'Nicht zwingend. Gleitzeit dient dem flexiblen Ausgleich innerhalb eines Rahmens; echte angeordnete Überstunden werden oft separat behandelt und ggf. zuschlagspflichtig.' },
  ],
  related: ['ueberstunden-rechner', 'arbeitstage-rechner', 'teilzeitfaktor-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { istStunden: 176, wochenstunden: 40, tageWoche: 5, tageGesamt: 22, altsaldo: 0 },
      expect: [
        { label: 'Soll-Stunden pro Tag', value: 8, tolerance: 0.01 },
        { label: 'Soll-Stunden', value: 176, tolerance: 0.01 },
        { label: 'Neues Gleitzeit-Saldo', value: 0, tolerance: 0.01 },
      ],
    },
    {
      values: { istStunden: 180, wochenstunden: 40, tageWoche: 5, tageGesamt: 20, altsaldo: 3 },
      expect: [
        { label: 'Saldo im Zeitraum', value: 20, tolerance: 0.01 },
        { label: 'Neues Gleitzeit-Saldo', value: 23, tolerance: 0.01 },
      ],
    },
  ],
};
