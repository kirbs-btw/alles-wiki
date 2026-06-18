import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'lernplan-seiten-pro-tag-rechner',
  category: 'bildung',
  title: 'Seiten pro Tag fuer die Pruefung berechnen',
  shortTitle: 'Seiten pro Tag',
  description:
    'Berechne, wie viele Seiten du pro Tag lernen musst, um deinen Stoff bis zur Pruefung zu schaffen – inklusive Puffertagen.',
  keywords: [
    'seiten pro tag lernen',
    'lernplan rechner',
    'wie viel pro tag lernen',
    'lernpensum berechnen',
    'pruefung vorbereiten seiten',
    'lernplan seiten',
  ],
  intro:
    'Wer rechtzeitig weiss, wie viel Stoff pro Tag ansteht, lernt entspannter. Das Tool teilt die Gesamtseiten durch die verfuegbaren Lerntage. Optional kannst du Puffertage einplanen, an denen du nicht lernst (z. B. fuer Wiederholung oder Pause). Das Ergebnis ist ein Richtwert – schwere Kapitel brauchen oft mehr Zeit.',
  formula: 'Seiten je Tag = Gesamtseiten / (Tage bis Pruefung − Puffertage)',
  inputs: [
    { type: 'number', id: 'seiten', label: 'Gesamtzahl Seiten', default: 300, min: 1, step: 1 },
    { type: 'number', id: 'tage', label: 'Tage bis zur Pruefung', default: 20, min: 1, step: 1 },
    { type: 'number', id: 'puffer', label: 'Puffertage (ohne Lernen)', default: 4, min: 0, step: 1, help: 'Tage fuer Wiederholung oder Pause.' },
  ],
  compute: (v) => {
    const seiten = num(v.seiten);
    const tage = num(v.tage);
    const puffer = num(v.puffer);
    const lerntage = Math.max(1, tage - puffer);
    const proTag = seiten / lerntage;
    return [
      { label: 'Seiten pro Tag', value: proTag, digits: 1, primary: true },
      { label: 'Effektive Lerntage', value: lerntage, digits: 0 },
      { label: 'Seiten gesamt', value: seiten, digits: 0 },
    ];
  },
  howto: [
    'Gesamtzahl der zu lernenden Seiten eintragen.',
    'Verbleibende Tage bis zur Pruefung angeben.',
    'Optional Puffertage fuer Wiederholung oder Pausen eintragen.',
    'Taegliches Pensum in Seiten ablesen.',
  ],
  faq: [
    { q: 'Wofuer sind die Puffertage gut?', a: 'Puffertage halten Zeit frei fuer Wiederholung, unerwartete Verzoegerungen und Erholung. Ohne Puffer geraet der Plan bei einem freien Tag schnell ins Wanken.' },
    { q: 'Ist das Pensum fuer jeden Tag gleich?', a: 'Das Tool verteilt gleichmaessig. In der Praxis brauchen schwierige Kapitel mehr Zeit – plane solche Abschnitte bewusst groszuegiger ein.' },
    { q: 'Kann ich auch Wiederholungen einrechnen?', a: 'Ja, indem du die Gesamtseiten erhoehst (z. B. 1,5-fach fuer eine zusaetzliche Durchsicht) oder die Wiederholung ueber die Puffertage abdeckst.' },
  ],
  related: ['lernzeit-rechner', 'studienkosten-rechner', 'benoetigte-note-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { seiten: 300, tage: 20, puffer: 4 },
      expect: [
        { label: 'Seiten pro Tag', value: 18.75, tolerance: 0.05 },
        { label: 'Effektive Lerntage', value: 16, tolerance: 0.01 },
      ],
    },
  ],
};
