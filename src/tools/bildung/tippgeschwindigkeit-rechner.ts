import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'tippgeschwindigkeit-rechner',
  category: 'bildung',
  title: 'Tippgeschwindigkeit-Rechner (Anschlaege/min & WPM)',
  shortTitle: 'Tippgeschwindigkeit',
  description:
    'Berechne deine Tippgeschwindigkeit in Anschlaegen pro Minute und Woertern pro Minute (WPM) inklusive Netto-Tempo nach Tippfehlern.',
  keywords: [
    'tippgeschwindigkeit berechnen',
    'anschlaege pro minute',
    'wpm tippen rechner',
    'schreibgeschwindigkeit tastatur',
    'tippen woerter pro minute',
    'tippspeed rechner',
  ],
  intro:
    'Wie schnell tippst du? Diese Berechnung wandelt deine getippten Zeichen und die Tippdauer in Anschlaege pro Minute und in Woerter pro Minute (WPM) um. International gilt die Konvention: 1 Wort = 5 Anschlaege (inkl. Leerzeichen). Tippfehler werden als Abzug beruecksichtigt, sodass du dein Netto-Tempo siehst. Zur Orientierung: 200 Anschlaege/min (40 WPM) sind solide, geuebte Schreiber erreichen 300+ Anschlaege/min.',
  formula: 'Anschlaege/min = Zeichen / Minuten; Brutto-WPM = Zeichen / 5 / Minuten; Netto = Brutto − Fehler/Minuten',
  inputs: [
    { type: 'number', id: 'zeichen', label: 'Getippte Zeichen', default: 1000, min: 1, step: 10, help: 'Inklusive Leerzeichen (= Anschlaege).' },
    { type: 'number', id: 'minuten', label: 'Tippdauer', unit: 'min', default: 5, min: 0.1, step: 0.5 },
    { type: 'number', id: 'fehler', label: 'Tippfehler', default: 5, min: 0, step: 1, help: 'Anzahl falscher Eingaben – mindert die Netto-WPM.' },
  ],
  compute: (v) => {
    const zeichen = num(v.zeichen);
    const minuten = num(v.minuten) > 0 ? num(v.minuten) : 1;
    const fehler = num(v.fehler);
    const anschlaegeProMin = zeichen / minuten;
    const bruttoWpm = zeichen / 5 / minuten;
    const nettoWpm = Math.max(0, bruttoWpm - fehler / minuten);
    const trefferquote = zeichen > 0 ? ((zeichen - fehler) / zeichen) * 100 : 0;
    return [
      { label: 'Netto-Tippgeschwindigkeit', value: nettoWpm, digits: 1, unit: 'WPM', primary: true },
      { label: 'Brutto-Tippgeschwindigkeit', value: bruttoWpm, digits: 1, unit: 'WPM' },
      { label: 'Anschlaege pro Minute', value: anschlaegeProMin, digits: 0, unit: 'Anschl./min' },
      { label: 'Genauigkeit', value: trefferquote, digits: 1, unit: '%' },
    ];
  },
  howto: [
    'Einen Text auf Zeit abtippen oder einen Tipptest absolvieren.',
    'Anzahl der getippten Zeichen (inkl. Leerzeichen) eintragen.',
    'Tippdauer in Minuten und die Anzahl der Tippfehler angeben.',
    'Netto-WPM, Anschlaege pro Minute und Genauigkeit ablesen.',
  ],
  faq: [
    { q: 'Wie wird WPM beim Tippen definiert?', a: 'International gilt: ein Wort entspricht fuenf Anschlaegen inklusive Leerzeichen. Die Brutto-WPM ergeben sich also aus Zeichen geteilt durch fuenf und durch die Minuten.' },
    { q: 'Was ist eine gute Tippgeschwindigkeit?', a: 'Etwa 200 Anschlaege pro Minute (rund 40 WPM) gelten als solide. Geuebte Schreibkraefte erreichen 300 Anschlaege/min und mehr, Profis im Zehnfingersystem auch deutlich darueber.' },
    { q: 'Wie werden Fehler beruecksichtigt?', a: 'Die Netto-WPM ziehen die Tippfehler pro Minute von der Brutto-WPM ab. So zaehlt nur fehlerfrei Getipptes – ein faires Mass fuer effektives Tempo.' },
    { q: 'Anschlaege oder Zeichen – ist das dasselbe?', a: 'Ja. Jeder Tastendruck fuer ein Zeichen, inklusive Leertaste, zaehlt als ein Anschlag. Reine Korrekturtasten werden ueblicherweise nicht mitgezaehlt.' },
  ],
  related: ['lesegeschwindigkeit-test-rechner', 'schreibzeit-rechner', 'lesezeit-rechner'],
  updated: '2026-06-19',
  examples: [
    {
      values: { zeichen: 1000, minuten: 5, fehler: 5 },
      expect: [
        { label: 'Anschlaege pro Minute', value: 200, tolerance: 0.5 },
        { label: 'Brutto-Tippgeschwindigkeit', value: 40, tolerance: 0.01 },
        { label: 'Netto-Tippgeschwindigkeit', value: 39, tolerance: 0.01 },
        { label: 'Genauigkeit', value: 99.5, tolerance: 0.01 },
      ],
    },
  ],
};
