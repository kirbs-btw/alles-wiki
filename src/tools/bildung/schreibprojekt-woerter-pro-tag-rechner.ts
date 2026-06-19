import type { Tool } from '../../lib/types';
import { num, daysBetween } from '../../lib/types';

export const tool: Tool = {
  slug: 'schreibprojekt-woerter-pro-tag-rechner',
  category: 'bildung',
  title: 'Woerter pro Tag bis zur Abgabe',
  shortTitle: 'Woerter pro Tag',
  description:
    'Berechne, wie viele Woerter du pro Tag schreiben musst, um deine Arbeit bis zum Abgabedatum fertigzustellen – inklusive bereits geschriebener Woerter.',
  keywords: [
    'woerter pro tag schreiben',
    'schreibpensum berechnen',
    'wie viel pro tag schreiben',
    'bachelorarbeit woerter pro tag',
    'schreibziel bis abgabe',
    'woerter bis deadline rechner',
  ],
  intro:
    'Eine groessere schriftliche Arbeit – Hausarbeit, Bachelor- oder Masterarbeit – wird machbar, wenn du sie auf ein taegliches Schreibpensum herunterbrichst. Dieses Tool zieht die bereits geschriebenen Woerter vom Ziel ab und verteilt den Rest auf die Tage bis zur Abgabe. Optional rechnest du Puffertage heraus, an denen du nicht schreibst (z. B. fuer Korrektur, Formatierung und Quellenpruefung). So weiszt du jeden Tag, ob du im Plan liegst. Das Pensum ist ein Richtwert – plane das Schreiben rechtzeitig, nicht erst kurz vor der Abgabe.',
  formula: 'Woerter/Tag = (Zielwoerter − geschrieben) / (Tage bis Abgabe − Puffertage)',
  inputs: [
    { type: 'number', id: 'ziel', label: 'Zielwortzahl gesamt', default: 8000, min: 1, step: 100 },
    { type: 'number', id: 'geschrieben', label: 'Bereits geschrieben', unit: 'Woerter', default: 0, min: 0, step: 100 },
    { type: 'date', id: 'start', label: 'Startdatum (heute)', default: '2026-06-19', today: true, help: 'Standard: heute.' },
    { type: 'date', id: 'abgabe', label: 'Abgabedatum', default: '2026-07-19' },
    { type: 'number', id: 'puffer', label: 'Puffertage (ohne Schreiben)', default: 5, min: 0, step: 1, help: 'Tage fuer Korrektur, Formatierung, Pause.' },
  ],
  compute: (v) => {
    const ziel = num(v.ziel);
    const geschrieben = num(v.geschrieben);
    const puffer = num(v.puffer);
    const tage = daysBetween(String(v.start), String(v.abgabe));
    const schreibtage = Math.max(1, tage - puffer);
    const offen = Math.max(0, ziel - geschrieben);
    const proTag = offen / schreibtage;
    return [
      { label: 'Woerter pro Tag', value: proTag, digits: 0, primary: true },
      { label: 'Verbleibende Woerter', value: offen, digits: 0 },
      { label: 'Schreibtage', value: schreibtage, digits: 0, unit: 'Tage' },
      { label: 'Tage bis Abgabe', value: Math.max(0, tage), digits: 0, unit: 'Tage' },
    ];
  },
  howto: [
    'Zielwortzahl der Arbeit eintragen.',
    'Bereits geschriebene Woerter angeben (0, wenn du startest).',
    'Startdatum (Standard: heute) und Abgabedatum waehlen.',
    'Puffertage fuer Korrektur und Formatierung eintragen und Tagespensum ablesen.',
  ],
  faq: [
    { q: 'Wie viele Woerter hat eine Seite?', a: 'Eine wissenschaftliche Textseite umfasst grob 250 bis 350 Woerter. Eine 60-seitige Bachelorarbeit entspricht damit etwa 15.000 bis 20.000 Woertern reinem Fliesztext.' },
    { q: 'Warum Puffertage einplanen?', a: 'Schreiben ist nur ein Teil. Korrekturlesen, Formatierung, Quellenpruefung und unerwartete Verzoegerungen brauchen Zeit. Ohne Puffer geraet der Plan schnell unter Druck.' },
    { q: 'Was, wenn ich schon angefangen habe?', a: 'Trage deine bereits geschriebenen Woerter ein. Das Tool rechnet nur die noch fehlenden Woerter auf die verbleibenden Tage um.' },
    { q: 'Ist ein gleichmaesziges Pensum realistisch?', a: 'Es ist ein Planungsrichtwert. Manche Tage sind produktiver als andere. Wichtig ist, das Tagesziel im Blick zu behalten und Rueckstaende zeitnah aufzuholen.' },
  ],
  related: ['schreibzeit-rechner', 'lesezeit-rechner', 'lernplan-seiten-pro-tag-rechner'],
  updated: '2026-06-19',
  examples: [
    {
      values: { ziel: 8000, geschrieben: 0, start: '2026-06-19', abgabe: '2026-07-19', puffer: 5 },
      // 30 Tage - 5 Puffer = 25 Schreibtage; 8000/25 = 320
      expect: [
        { label: 'Tage bis Abgabe', value: 30, tolerance: 0 },
        { label: 'Schreibtage', value: 25, tolerance: 0 },
        { label: 'Woerter pro Tag', value: 320, tolerance: 0.5 },
      ],
    },
    {
      values: { ziel: 10000, geschrieben: 2000, start: '2026-06-19', abgabe: '2026-07-09', puffer: 0 },
      // 20 Tage, offen 8000, 8000/20 = 400
      expect: [{ label: 'Woerter pro Tag', value: 400, tolerance: 0.5 }],
    },
  ],
};
