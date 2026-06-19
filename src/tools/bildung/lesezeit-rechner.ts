import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'lesezeit-rechner',
  category: 'bildung',
  title: 'Lesezeit-Rechner: Wie lange dauert das Lesen?',
  shortTitle: 'Lesezeit',
  description:
    'Berechne aus Wortzahl und Lesegeschwindigkeit, wie lange das Lesen eines Textes dauert – in Minuten und Stunden, mit Pausen.',
  keywords: [
    'lesezeit berechnen',
    'lesedauer rechner',
    'wie lange lesen',
    'woerter pro minute lesen',
    'lesezeit woerter',
    'lesegeschwindigkeit minuten',
  ],
  intro:
    'Wie lange brauchst du fuer einen Text? Diese Schaetzung teilt die Wortzahl durch deine Lesegeschwindigkeit (Woerter pro Minute, WPM). Geuebte Leser schaffen still etwa 200 bis 300 WPM, lautes Vorlesen liegt eher bei 130 bis 160 WPM. Optional rechnet das Tool kurze Lesepausen ein. Das Ergebnis ist ein Richtwert – Fachtexte mit vielen Fremdwoertern lesen sich langsamer als ein Roman.',
  formula: 'Lesezeit (min) = Woerter / WPM; gesamt = Lesezeit + Pausen',
  inputs: [
    { type: 'number', id: 'woerter', label: 'Anzahl Woerter', default: 2000, min: 1, step: 50, help: 'Wortzahl des Textes (in vielen Editoren ablesbar).' },
    { type: 'number', id: 'wpm', label: 'Lesegeschwindigkeit', unit: 'WPM', default: 250, min: 50, max: 1000, step: 10, help: 'Woerter pro Minute. Stilles Lesen ca. 200-300.' },
    { type: 'number', id: 'pause', label: 'Pausen je 60 min Lesen', unit: 'min', default: 0, min: 0, step: 1, help: 'Optionaler Pausenzuschlag pro Lesestunde.' },
  ],
  compute: (v) => {
    const woerter = num(v.woerter);
    const wpm = num(v.wpm) > 0 ? num(v.wpm) : 250;
    const pause = num(v.pause);
    const reineMinuten = woerter / wpm;
    const pausenMinuten = (reineMinuten / 60) * pause;
    const gesamtMinuten = reineMinuten + pausenMinuten;
    return [
      { label: 'Lesezeit', value: reineMinuten, digits: 1, unit: 'min', primary: true },
      { label: 'Lesezeit (Stunden)', value: reineMinuten / 60, digits: 2, unit: 'Std.' },
      { label: 'Pausenzeit', value: pausenMinuten, digits: 1, unit: 'min' },
      { label: 'Gesamtzeit inkl. Pausen', value: gesamtMinuten, digits: 1, unit: 'min' },
    ];
  },
  howto: [
    'Wortzahl des Textes eintragen (oft im Textverarbeitungsprogramm ablesbar).',
    'Deine Lesegeschwindigkeit in Woertern pro Minute angeben.',
    'Optional einen Pausenzuschlag je Lesestunde eintragen.',
    'Reine Lesezeit und Gesamtzeit inklusive Pausen ablesen.',
  ],
  faq: [
    { q: 'Wie schnell liest ein Erwachsener im Schnitt?', a: 'Beim stillen Lesen erreichen geuebte Leser rund 200 bis 300 Woerter pro Minute. Lautes Vorlesen ist mit etwa 130 bis 160 WPM deutlich langsamer.' },
    { q: 'Warum dauert ein Fachtext laenger?', a: 'Komplexe Saetze, Fachbegriffe und Formeln senken die Lesegeschwindigkeit. Bei anspruchsvollen Texten solltest du eine niedrigere WPM ansetzen oder Pausen einplanen.' },
    { q: 'Wie viele Woerter hat eine Buchseite?', a: 'Eine durchschnittliche Buchseite enthaelt grob 250 bis 350 Woerter. Multipliziere die Seitenzahl entsprechend, wenn du nur Seiten kennst.' },
    { q: 'Wie messe ich meine eigene Lesegeschwindigkeit?', a: 'Lies eine Minute lang konzentriert und zaehle die gelesenen Woerter. Diesen Wert kannst du als WPM eintragen – oder nutze unseren Lesegeschwindigkeits-Test.' },
  ],
  related: ['lesegeschwindigkeit-test-rechner', 'lernplan-seiten-pro-tag-rechner', 'lernzeit-rechner'],
  updated: '2026-06-19',
  examples: [
    {
      values: { woerter: 2000, wpm: 250, pause: 0 },
      expect: [
        { label: 'Lesezeit', value: 8, tolerance: 0.01 },
        { label: 'Lesezeit (Stunden)', value: 0.13, tolerance: 0.01 },
      ],
    },
    {
      values: { woerter: 9000, wpm: 250, pause: 10 },
      expect: [
        { label: 'Lesezeit', value: 36, tolerance: 0.01 },
        { label: 'Gesamtzeit inkl. Pausen', value: 42, tolerance: 0.01 },
      ],
    },
  ],
};
