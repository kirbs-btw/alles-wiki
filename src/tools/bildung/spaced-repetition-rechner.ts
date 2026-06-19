import type { Tool } from '../../lib/types';
import { num, toDate } from '../../lib/types';

export const tool: Tool = {
  slug: 'spaced-repetition-rechner',
  category: 'bildung',
  title: 'Spaced-Repetition-Rechner: Wiederholungstermine',
  shortTitle: 'Spaced Repetition',
  description:
    'Berechne deine Wiederholungstermine nach der Spaced-Repetition-Methode – die Lernintervalle verdoppeln sich und verankern Wissen im Langzeitgedaechtnis.',
  keywords: [
    'spaced repetition rechner',
    'wiederholungsintervalle berechnen',
    'lernintervalle rechner',
    'verteiltes lernen plan',
    'wann wiederholen lernen',
    'wiederholungstermine berechnen',
  ],
  intro:
    'Spaced Repetition (verteiltes Lernen) nutzt den Effekt, dass Wissen am besten haengen bleibt, wenn man es kurz vor dem Vergessen wiederholt. Die Abstaende werden dabei immer groeszer. Dieses Tool startet mit einem ersten Intervall (z. B. 1 Tag) und vervielfacht es bei jeder Wiederholung mit einem Faktor. Es zeigt die Tage bis zur letzten Wiederholung und den gesamten Lernzeitraum. Die Termine sind ein bewaehrter Richtwert – Karteikarten-Apps passen die Abstaende zusaetzlich an deine Trefferquote an.',
  formula: 'Intervall_n = Start × Faktor^(n−1); Tag_n = Summe der Intervalle 1..n',
  inputs: [
    { type: 'date', id: 'start', label: 'Lerndatum (Tag 0)', default: '2026-06-19', today: true, help: 'Tag des ersten Lernens.' },
    { type: 'number', id: 'wdh', label: 'Anzahl Wiederholungen', default: 5, min: 1, max: 12, step: 1 },
    { type: 'number', id: 'erstes', label: 'Erstes Intervall', unit: 'Tage', default: 1, min: 1, step: 1, help: 'Abstand bis zur 1. Wiederholung.' },
    { type: 'number', id: 'faktor', label: 'Vervielfachungsfaktor', default: 2, min: 1.1, step: 0.1, help: 'Je Wiederholung waechst der Abstand um diesen Faktor.' },
  ],
  compute: (v) => {
    const wdh = Math.max(1, Math.round(num(v.wdh)));
    const erstes = num(v.erstes) > 0 ? num(v.erstes) : 1;
    const faktor = num(v.faktor) >= 1 ? num(v.faktor) : 2;
    const start = toDate(v.start);
    // Intervalle aufsummieren -> Tag-Offset der jeweiligen Wiederholung
    let intervall = erstes;
    let kumuliert = 0;
    for (let i = 0; i < wdh; i++) {
      kumuliert += intervall;
      if (i < wdh - 1) intervall = Math.round(intervall * faktor);
    }
    const letzterTag = Math.round(kumuliert);
    let datumLetzte = '–';
    if (start) {
      const d = new Date(start.getTime() + letzterTag * 86_400_000);
      datumLetzte = d.toISOString().slice(0, 10);
    }
    return [
      { label: 'Tag der letzten Wiederholung', value: letzterTag, unit: 'Tage nach Start', digits: 0, primary: true },
      { label: 'Datum der letzten Wiederholung', value: datumLetzte },
      { label: 'Anzahl Wiederholungen', value: wdh, digits: 0 },
      { label: 'Lernzeitraum gesamt', value: letzterTag, unit: 'Tage', digits: 0 },
    ];
  },
  howto: [
    'Lerndatum waehlen (Tag des ersten Durcharbeitens).',
    'Anzahl der geplanten Wiederholungen festlegen.',
    'Erstes Intervall in Tagen eintragen (klassisch 1 Tag).',
    'Vervielfachungsfaktor angeben (klassisch 2) und Termine ablesen.',
  ],
  faq: [
    { q: 'Was ist Spaced Repetition?', a: 'Eine Lernmethode, bei der man Inhalte in wachsenden Zeitabstaenden wiederholt – kurz bevor man sie vergessen wuerde. Das verankert Wissen effizient im Langzeitgedaechtnis und spart insgesamt Lernzeit.' },
    { q: 'Welche Intervalle sind sinnvoll?', a: 'Ein verbreitetes Schema startet bei 1 Tag und verdoppelt: 1, 2, 4, 8, 16 Tage usw. Mit Faktor 2 und Startwert 1 bildet das Tool genau diese Reihe ab. Andere Schemata nutzen z. B. 1, 3, 7, 14, 30 Tage.' },
    { q: 'Warum waechst der Abstand?', a: 'Je oefter eine Information abgerufen wurde, desto stabiler ist sie gespeichert und desto laenger kann man bis zur naechsten Wiederholung warten. Das spart Aufwand bei gleichem Lernerfolg.' },
    { q: 'Sind die Termine fix?', a: 'Es sind Richtwerte. Karteikarten-Programme wie Anki passen die Abstaende zusaetzlich daran an, wie sicher du eine Karte beantwortet hast.' },
  ],
  related: ['vokabel-lernplan-rechner', 'lernzeit-rechner', 'lernplan-seiten-pro-tag-rechner'],
  updated: '2026-06-19',
  examples: [
    {
      values: { start: '2026-06-19', wdh: 5, erstes: 1, faktor: 2 },
      // Intervalle: 1,2,4,8,16 -> kumuliert 1,3,7,15,31
      expect: [
        { label: 'Tag der letzten Wiederholung', value: 31, tolerance: 0 },
        { label: 'Anzahl Wiederholungen', value: 5, tolerance: 0 },
      ],
    },
    {
      values: { start: '2026-06-19', wdh: 3, erstes: 1, faktor: 3 },
      // Intervalle: 1,3,9 -> kumuliert 1,4,13
      expect: [{ label: 'Tag der letzten Wiederholung', value: 13, tolerance: 0 }],
    },
  ],
};
