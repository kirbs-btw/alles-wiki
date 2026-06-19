import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'klausurenphase-lernplan-rechner',
  category: 'bildung',
  title: 'Klausurenphase-Lernplan: Lernzeit pro Fach',
  shortTitle: 'Klausurphase-Plan',
  description:
    'Verteile deine Lernzeit in der Klausurenphase auf alle Faecher und sieh, wie viele Stunden pro Fach und pro Tag noetig sind.',
  keywords: [
    'klausurenphase lernplan',
    'lernzeit auf faecher verteilen',
    'stunden pro fach lernen',
    'lernplan klausuren rechner',
    'pruefungsphase planen',
    'lernzeit verteilen rechner',
  ],
  intro:
    'In der Klausurenphase stehen mehrere Pruefungen gleichzeitig an. Dieses Tool verteilt deine verfuegbare Lernzeit auf die Anzahl der Faecher und rechnet aus, wie viele Stunden pro Fach und wie viele Stunden pro Tag du einplanen musst. Es geht von gleicher Gewichtung aller Faecher aus – schwierige oder umfangreiche Faecher solltest du anschlieszend bewusst mehr Zeit geben. Plane zusaetzlich Pausen und Puffertage ein, um den Plan robust zu halten.',
  formula: 'Stunden je Fach = (Lerntage × Stunden/Tag) / Faecher; Stunden/Tag = Faecher × Stunden je Fach / Lerntage',
  inputs: [
    { type: 'number', id: 'faecher', label: 'Anzahl Faecher', default: 4, min: 1, step: 1 },
    { type: 'number', id: 'tage', label: 'Lerntage gesamt', unit: 'Tage', default: 14, min: 1, step: 1 },
    { type: 'number', id: 'stdProTag', label: 'Lernstunden pro Tag', unit: 'Std.', default: 5, min: 0.5, step: 0.5 },
  ],
  compute: (v) => {
    const faecher = num(v.faecher) > 0 ? num(v.faecher) : 1;
    const tage = num(v.tage) > 0 ? num(v.tage) : 1;
    const stdProTag = num(v.stdProTag);
    const gesamtStunden = tage * stdProTag;
    const stdProFach = gesamtStunden / faecher;
    const tageProFach = tage / faecher;
    return [
      { label: 'Stunden pro Fach', value: stdProFach, digits: 1, unit: 'Std.', primary: true },
      { label: 'Gesamte Lernzeit', value: gesamtStunden, digits: 1, unit: 'Std.' },
      { label: 'Tage pro Fach (Richtwert)', value: tageProFach, digits: 1, unit: 'Tage' },
      { label: 'Lernstunden pro Tag', value: stdProTag, digits: 1, unit: 'Std.' },
    ];
  },
  howto: [
    'Anzahl der Faecher eintragen, fuer die du lernst.',
    'Verfuegbare Lerntage bis zur letzten Klausur angeben.',
    'Realistische Lernstunden pro Tag eintragen.',
    'Stunden pro Fach und Gesamtlernzeit ablesen.',
  ],
  faq: [
    { q: 'Verteilt das Tool gleichmaeszig?', a: 'Ja, es geht von gleicher Gewichtung aller Faecher aus. Gib schwierigen oder stoffreichen Faechern danach bewusst mehr Zeit und reduziere bei leichten Faechern entsprechend.' },
    { q: 'Wie viele Stunden pro Tag sind realistisch?', a: 'Konzentriertes Lernen ist anstrengend. Vier bis sechs fokussierte Stunden mit Pausen sind fuer die meisten ein gutes Maximum; mehr fuehrt oft zu sinkender Aufnahmefaehigkeit.' },
    { q: 'Sollte ich Faecher blocken oder mischen?', a: 'Beides hat Vorteile. Abwechselndes Lernen mehrerer Faecher (Interleaving) verbessert oft das langfristige Behalten, waehrend Blocken bei sehr komplexem Stoff hilft, tief einzusteigen.' },
    { q: 'Sind Puffertage enthalten?', a: 'Nein. Trage die Lerntage so ein, dass ein bis zwei Tage zum Wiederholen frei bleiben, indem du die Tage entsprechend niedriger ansetzt.' },
  ],
  related: ['lernzeit-rechner', 'lernplan-seiten-pro-tag-rechner', 'lerneinheiten-pomodoro-rechner'],
  updated: '2026-06-19',
  examples: [
    {
      values: { faecher: 4, tage: 14, stdProTag: 5 },
      // gesamt 70 Std, /4 = 17,5 Std je Fach
      expect: [
        { label: 'Gesamte Lernzeit', value: 70, tolerance: 0.01 },
        { label: 'Stunden pro Fach', value: 17.5, tolerance: 0.01 },
      ],
    },
    {
      values: { faecher: 3, tage: 12, stdProTag: 6 },
      // gesamt 72, /3 = 24
      expect: [{ label: 'Stunden pro Fach', value: 24, tolerance: 0.01 }],
    },
  ],
};
