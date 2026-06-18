import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'nachtzuschlag-rechner',
  category: 'beruf',
  title: 'Nachtzuschlag-Rechner',
  shortTitle: 'Nachtzuschlag',
  description:
    'Berechne deinen Nachtarbeitszuschlag: aus Grundstundenlohn, Zuschlagssatz und Nachtstunden ergibt sich der Zuschlag pro Stunde und der Gesamtbetrag im Monat.',
  keywords: [
    'nachtzuschlag rechner',
    'nachtarbeitszuschlag berechnen',
    'nachtschicht zuschlag',
    'zuschlag nachtarbeit',
    'nachtzuschlag prozent',
    'nachtarbeit vergütung',
    'schichtzuschlag berechnen',
  ],
  formula:
    'Zuschlag = Grundstundenlohn × Zuschlagssatz%; Gesamt = Zuschlag × Nachtstunden',
  inputs: [
    { type: 'number', id: 'stundenlohn', label: 'Grund-Stundenlohn (brutto)', unit: '€', default: 18, min: 0, step: 0.5 },
    { type: 'number', id: 'zuschlag', label: 'Nachtzuschlag', unit: '%', default: 25, min: 0, max: 100, step: 5, help: 'Üblich sind 25 % für Nachtarbeit; tarifliche Regelungen können abweichen.' },
    { type: 'number', id: 'nachtstunden', label: 'Nachtstunden im Monat', unit: 'h', default: 40, min: 0, step: 1 },
  ],
  compute: (v) => {
    const stundenlohn = num(v.stundenlohn);
    const zuschlag = num(v.zuschlag);
    const nachtstunden = num(v.nachtstunden);

    const zuschlagProStunde = stundenlohn * (zuschlag / 100);
    const lohnMitZuschlag = stundenlohn + zuschlagProStunde;
    const zuschlagGesamt = zuschlagProStunde * nachtstunden;
    const verguetungGesamt = lohnMitZuschlag * nachtstunden;

    return [
      { label: 'Zuschlag gesamt im Monat', value: zuschlagGesamt, unit: '€', digits: 2, primary: true },
      { label: 'Zuschlag pro Stunde', value: zuschlagProStunde, unit: '€', digits: 2 },
      { label: 'Stundenlohn mit Zuschlag', value: lohnMitZuschlag, unit: '€', digits: 2 },
      { label: 'Nachtstunden-Vergütung gesamt', value: verguetungGesamt, unit: '€', digits: 2, help: 'Grundlohn plus Zuschlag für alle Nachtstunden.' },
    ];
  },
  intro:
    'Wer nachts arbeitet, hat in der Regel Anspruch auf einen Zuschlag. Dieser Rechner ermittelt den Zuschlag pro Stunde, den Gesamtzuschlag im Monat und die gesamte Vergütung der Nachtstunden. Die Höhe des Zuschlags richtet sich nach Arbeits- oder Tarifvertrag – häufig sind 25 %.',
  howto: [
    'Trage deinen Grund-Stundenlohn (brutto) ein.',
    'Gib den Nachtzuschlag in Prozent an (laut Vertrag/Tarif).',
    'Trage die im Monat geleisteten Nachtstunden ein.',
    'Lies Zuschlag pro Stunde und Gesamtbetrag ab.',
  ],
  faq: [
    { q: 'Wie hoch ist der Nachtzuschlag gesetzlich?', a: 'Das Arbeitszeitgesetz verlangt einen angemessenen Zuschlag oder Freizeitausgleich für Nachtarbeit, nennt aber keinen festen Prozentsatz. Die Rechtsprechung sieht oft rund 25 % als angemessen an; Tarifverträge regeln Genaueres.' },
    { q: 'Welche Stunden gelten als Nachtarbeit?', a: 'Nach dem Arbeitszeitgesetz ist Nachtzeit grundsätzlich die Zeit von 23 bis 6 Uhr. Steuerlich begünstigt ist Nachtarbeit zwischen 20 und 6 Uhr (mit erhöhtem Satz nach Mitternacht).' },
    { q: 'Ist der Nachtzuschlag steuerfrei?', a: 'Nachtarbeitszuschläge sind innerhalb bestimmter Grenzen steuer- und sozialabgabenfrei – etwa 25 % des Grundlohns für Arbeit zwischen 20 und 6 Uhr, 40 % zwischen 0 und 4 Uhr. Der Grundlohn selbst bleibt voll steuerpflichtig.' },
    { q: 'Worauf wird der Zuschlag berechnet?', a: 'Auf den vereinbarten Grundstundenlohn. Dieser Rechner schlägt den Prozentsatz auf den eingegebenen Grundlohn auf.' },
    { q: 'Kann der Zuschlag durch Freizeit ersetzt werden?', a: 'Ja. Das Gesetz erlaubt wahlweise einen Zuschlag oder einen entsprechenden Freizeitausgleich. Welche Variante gilt, regelt der Vertrag.' },
  ],
  related: ['stundenlohn-rechner', 'ueberstunden-rechner', 'provision-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { stundenlohn: 18, zuschlag: 25, nachtstunden: 40 },
      expect: [
        { label: 'Zuschlag pro Stunde', value: 4.5, tolerance: 0.01 },
        { label: 'Zuschlag gesamt im Monat', value: 180, tolerance: 0.01 },
      ],
    },
  ],
};
