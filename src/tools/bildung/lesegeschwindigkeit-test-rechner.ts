import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'lesegeschwindigkeit-test-rechner',
  category: 'bildung',
  title: 'Lesegeschwindigkeit testen (Woerter pro Minute)',
  shortTitle: 'Lesetempo-Test',
  description:
    'Ermittle deine Lesegeschwindigkeit in Woertern pro Minute (WPM) aus gelesenen Woertern und Lesedauer – inklusive Einordnung.',
  keywords: [
    'lesegeschwindigkeit testen',
    'woerter pro minute berechnen',
    'wpm rechner',
    'lesetempo messen',
    'wie schnell lese ich',
    'lesegeschwindigkeit wpm',
  ],
  intro:
    'Wie schnell liest du wirklich? Stoppe, wie lange du fuer eine bekannte Anzahl Woerter brauchst, und das Tool rechnet deine Lesegeschwindigkeit in Woertern pro Minute (WPM) aus. Zur Orientierung: unter 150 WPM gilt als langsam, 200 bis 300 WPM ist ein guter Durchschnitt, ueber 400 WPM ist schnell. Tempo ist nur die halbe Miete – das Textverstaendnis sollte trotzdem hoch bleiben.',
  formula: 'WPM = Woerter / Lesedauer (min); Lesedauer = Minuten + Sekunden/60',
  inputs: [
    { type: 'number', id: 'woerter', label: 'Gelesene Woerter', default: 600, min: 1, step: 10 },
    { type: 'number', id: 'minuten', label: 'Lesedauer Minuten', unit: 'min', default: 3, min: 0, step: 1 },
    { type: 'number', id: 'sekunden', label: 'Lesedauer Sekunden', unit: 's', default: 0, min: 0, max: 59, step: 1, help: 'Zusaetzliche Sekunden ueber die vollen Minuten hinaus.' },
  ],
  compute: (v) => {
    const woerter = num(v.woerter);
    const minuten = num(v.minuten);
    const sekunden = num(v.sekunden);
    const dauer = minuten + sekunden / 60;
    const wpm = dauer > 0 ? woerter / dauer : 0;
    let einstufung = 'langsam';
    if (wpm >= 400) einstufung = 'sehr schnell';
    else if (wpm >= 300) einstufung = 'schnell';
    else if (wpm >= 200) einstufung = 'guter Durchschnitt';
    else if (wpm >= 150) einstufung = 'durchschnittlich';
    return [
      { label: 'Lesegeschwindigkeit', value: wpm, digits: 0, unit: 'WPM', primary: true },
      { label: 'Einordnung', value: einstufung },
      { label: 'Lesedauer gesamt', value: dauer, digits: 2, unit: 'min' },
      { label: 'Woerter pro Sekunde', value: dauer > 0 ? wpm / 60 : 0, digits: 2, unit: 'W/s' },
    ];
  },
  howto: [
    'Eine bekannte Anzahl Woerter aussuchen (z. B. einen Abschnitt mit gezaehlten Woertern).',
    'Den Text in normalem Tempo lesen und die Zeit stoppen.',
    'Gelesene Woerter sowie Minuten und Sekunden eintragen.',
    'Deine Lesegeschwindigkeit in WPM und die Einordnung ablesen.',
  ],
  faq: [
    { q: 'Was ist eine gute Lesegeschwindigkeit?', a: 'Geuebte erwachsene Leser erreichen still etwa 200 bis 300 WPM bei gutem Verstaendnis. Ueber 400 WPM gilt als schnell, sollte aber nicht zulasten des Verstehens gehen.' },
    { q: 'Zaehlt nur das Tempo?', a: 'Nein. Lesegeschwindigkeit ist nur sinnvoll im Zusammenspiel mit dem Textverstaendnis. Sehr hohes Tempo bringt nichts, wenn der Inhalt nicht haengenbleibt.' },
    { q: 'Wie kann ich mein Lesetempo steigern?', a: 'Hilfreich sind das Vermeiden von Subvokalisation (innerem Mitsprechen), groessere Blickspannen und regelmaessiges Ueben mit Zeitmessung.' },
    { q: 'Womit nutze ich diesen Wert weiter?', a: 'Die ermittelte WPM kannst du direkt in unseren Lesezeit-Rechner eintragen, um die Dauer fuer ganze Texte oder Buecher abzuschaetzen.' },
  ],
  related: ['lesezeit-rechner', 'lernplan-seiten-pro-tag-rechner', 'tippgeschwindigkeit-rechner'],
  updated: '2026-06-19',
  examples: [
    {
      values: { woerter: 600, minuten: 3, sekunden: 0 },
      expect: [
        { label: 'Lesegeschwindigkeit', value: 200, tolerance: 0.5 },
        { label: 'Lesedauer gesamt', value: 3, tolerance: 0.01 },
      ],
    },
    {
      values: { woerter: 750, minuten: 2, sekunden: 30 },
      expect: [{ label: 'Lesegeschwindigkeit', value: 300, tolerance: 0.5 }],
    },
  ],
};
