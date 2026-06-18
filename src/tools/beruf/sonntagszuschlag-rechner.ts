import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'sonntagszuschlag-rechner',
  category: 'beruf',
  title: 'Sonntags- und Feiertagszuschlag-Rechner',
  shortTitle: 'Sonntagszuschlag',
  description:
    'Berechne deinen Zuschlag für Sonntags- oder Feiertagsarbeit: aus Grundstundenlohn, Zuschlagssatz und Stunden ergibt sich der Zuschlag pro Stunde und der Gesamtbetrag.',
  keywords: [
    'sonntagszuschlag rechner',
    'feiertagszuschlag berechnen',
    'sonntagsarbeit zuschlag',
    'zuschlag feiertag berechnen',
    'sonntag feiertag vergütung',
    'sfn zuschlag rechner',
    'zuschlag sonntagsarbeit prozent',
  ],
  formula:
    'Zuschlag = Grundstundenlohn × Zuschlagssatz% ; Gesamt = Zuschlag × Stunden',
  inputs: [
    { type: 'number', id: 'stundenlohn', label: 'Grund-Stundenlohn (brutto)', unit: '€', default: 18, min: 0, step: 0.5 },
    {
      type: 'select',
      id: 'art',
      label: 'Art des Zuschlags',
      default: '50',
      options: [
        { value: '50', label: 'Sonntagsarbeit (50 %)' },
        { value: '125', label: 'Gesetzlicher Feiertag (125 %)' },
        { value: '150', label: 'Weihnachten/1. Mai (150 %)' },
        { value: '0', label: 'Eigener Satz (unten)' },
      ],
      help: 'Steuerfreie Höchstsätze laut § 3b EStG. Vertraglich/tariflich können andere Sätze gelten.',
    },
    { type: 'number', id: 'eigenersatz', label: 'Eigener Zuschlagssatz', unit: '%', default: 50, min: 0, max: 200, step: 5, help: 'Wird nur verwendet, wenn oben „Eigener Satz“ gewählt ist.' },
    { type: 'number', id: 'stunden', label: 'Zuschlagspflichtige Stunden', unit: 'h', default: 8, min: 0, step: 0.5 },
  ],
  compute: (v) => {
    const stundenlohn = num(v.stundenlohn);
    const art = String(v.art);
    const eigenersatz = num(v.eigenersatz);
    const stunden = num(v.stunden);

    const satz = art === '0' ? eigenersatz : num(art);
    const zuschlagProStunde = stundenlohn * (satz / 100);
    const lohnMitZuschlag = stundenlohn + zuschlagProStunde;
    const zuschlagGesamt = zuschlagProStunde * stunden;
    const verguetungGesamt = lohnMitZuschlag * stunden;

    return [
      { label: 'Zuschlag gesamt', value: zuschlagGesamt, unit: '€', digits: 2, primary: true },
      { label: 'Zuschlag pro Stunde', value: zuschlagProStunde, unit: '€', digits: 2 },
      { label: 'Stundenlohn mit Zuschlag', value: lohnMitZuschlag, unit: '€', digits: 2 },
      { label: 'Vergütung gesamt', value: verguetungGesamt, unit: '€', digits: 2, help: 'Grundlohn plus Zuschlag für alle Stunden.' },
    ];
  },
  intro:
    'Wer sonntags oder an Feiertagen arbeitet, bekommt oft einen Zuschlag. Das Steuerrecht (§ 3b EStG) nennt steuerfreie Höchstsätze: 50 % für Sonntage, 125 % für gesetzliche Feiertage und 150 % für besondere Tage wie Weihnachten oder den 1. Mai. Dieser Rechner ermittelt Zuschlag pro Stunde und Gesamtbetrag.',
  howto: [
    'Trage deinen Grund-Stundenlohn (brutto) ein.',
    'Wähle die Art des Zuschlags oder einen eigenen Satz.',
    'Gib die zuschlagspflichtigen Stunden ein.',
    'Lies Zuschlag pro Stunde und Gesamtbetrag ab.',
  ],
  faq: [
    { q: 'Wie hoch sind die steuerfreien Zuschläge?', a: 'Nach § 3b EStG sind steuerfrei: bis 50 % für Sonntagsarbeit, bis 125 % für gesetzliche Feiertage und bis 150 % für den 24./25./26. Dezember sowie den 1. Mai. Bezugsgröße ist der Grundlohn, höchstens 50 € je Stunde.' },
    { q: 'Gibt es einen gesetzlichen Anspruch auf den Zuschlag?', a: 'Nein, das Steuerrecht legt nur fest, bis zu welcher Höhe Zuschläge steuerfrei sind. Ob und wie viel Zuschlag gezahlt wird, regelt der Arbeits- oder Tarifvertrag.' },
    { q: 'Können Sonntags- und Feiertagszuschlag zusammenkommen?', a: 'Fällt ein Feiertag auf einen Sonntag, gilt der höhere Feiertagssatz; eine Addition beider Sätze ist steuerlich nicht vorgesehen. Nachtzuschläge können dagegen zusätzlich anfallen.' },
    { q: 'Auf welchen Lohn wird der Zuschlag berechnet?', a: 'Auf den vereinbarten Grundstundenlohn. Der Rechner schlägt den gewählten Prozentsatz auf den eingegebenen Grundlohn auf.' },
    { q: 'Ist der Grundlohn auch steuerfrei?', a: 'Nein. Steuerfrei ist nur der Zuschlag innerhalb der Grenzen. Der reguläre Stundenlohn bleibt voll steuer- und beitragspflichtig.' },
  ],
  related: ['nachtzuschlag-rechner', 'ueberstunden-rechner', 'stundenlohn-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { stundenlohn: 18, art: '50', eigenersatz: 50, stunden: 8 },
      expect: [
        { label: 'Zuschlag pro Stunde', value: 9, tolerance: 0.01 },
        { label: 'Zuschlag gesamt', value: 72, tolerance: 0.01 },
      ],
    },
    {
      values: { stundenlohn: 20, art: '125', eigenersatz: 50, stunden: 8 },
      expect: [{ label: 'Zuschlag gesamt', value: 200, tolerance: 0.01 }],
    },
  ],
};
