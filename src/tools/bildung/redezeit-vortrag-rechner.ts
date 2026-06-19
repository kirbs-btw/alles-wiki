import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'redezeit-vortrag-rechner',
  category: 'bildung',
  title: 'Redezeit-Rechner: Vortragsdauer aus Wortzahl',
  shortTitle: 'Redezeit',
  description:
    'Berechne, wie lange ein Vortrag oder Referat dauert – aus Wortzahl und Sprechtempo, inklusive empfohlener Wortzahl fuer eine Zielzeit.',
  keywords: [
    'redezeit berechnen',
    'vortragsdauer rechner',
    'wie lange dauert mein vortrag',
    'woerter pro minute sprechen',
    'referat zeit berechnen',
    'sprechzeit woerter',
  ],
  intro:
    'Wie lange dauert dein Referat? Diese Schaetzung teilt die Wortzahl deines Manuskripts durch dein Sprechtempo (Woerter pro Minute). Ein angenehmes Vortragstempo liegt bei etwa 120 bis 150 Woertern pro Minute – langsam genug, dass das Publikum folgen kann. Das Tool zeigt zusaetzlich, wie viele Woerter du fuer eine vorgegebene Zielzeit brauchst. So planst du Praesentationen punktgenau und vermeidest Zeitueberschreitungen.',
  formula: 'Dauer (min) = Woerter / Sprechtempo; empfohlene Woerter = Zielzeit × Sprechtempo',
  inputs: [
    { type: 'number', id: 'woerter', label: 'Anzahl Woerter im Manuskript', default: 1500, min: 1, step: 50 },
    { type: 'number', id: 'tempo', label: 'Sprechtempo', unit: 'WPM', default: 130, min: 60, max: 220, step: 5, help: 'Woerter pro Minute. Vortrag ca. 120-150.' },
    { type: 'number', id: 'zielzeit', label: 'Geplante Zielzeit', unit: 'min', default: 10, min: 0, step: 1, help: 'Fuer die Empfehlung der passenden Wortzahl.' },
  ],
  compute: (v) => {
    const woerter = num(v.woerter);
    const tempo = num(v.tempo) > 0 ? num(v.tempo) : 130;
    const zielzeit = num(v.zielzeit);
    const dauer = woerter / tempo;
    const minuten = Math.floor(dauer);
    const sekunden = Math.round((dauer - minuten) * 60);
    const empfohlen = zielzeit * tempo;
    return [
      { label: 'Vortragsdauer', value: dauer, digits: 1, unit: 'min', primary: true },
      { label: 'Dauer (Min:Sek)', value: `${minuten}:${String(sekunden).padStart(2, '0')}` },
      { label: 'Empfohlene Woerter fuer Zielzeit', value: empfohlen, digits: 0, unit: 'Woerter' },
      { label: 'Differenz zur Zielzeit', value: dauer - zielzeit, digits: 1, unit: 'min' },
    ];
  },
  howto: [
    'Wortzahl deines Vortragsmanuskripts eintragen.',
    'Dein realistisches Sprechtempo in Woertern pro Minute angeben.',
    'Optional die geplante Zielzeit eintragen.',
    'Vortragsdauer ablesen und die empfohlene Wortzahl fuer die Zielzeit pruefen.',
  ],
  faq: [
    { q: 'Wie viele Woerter pro Minute spricht man bei einem Vortrag?', a: 'Ein gut verstaendliches Vortragstempo liegt bei etwa 120 bis 150 Woertern pro Minute. Schneller wirkt gehetzt und ist fuer das Publikum schwer zu folgen.' },
    { q: 'Wie viele Woerter brauche ich fuer 10 Minuten?', a: 'Bei 130 Woertern pro Minute sind das rund 1.300 Woerter. Das Tool berechnet die empfohlene Wortzahl fuer deine individuelle Zielzeit automatisch.' },
    { q: 'Sind Pausen und Zwischenfragen eingerechnet?', a: 'Nein, gerechnet wird reine Sprechzeit. Plane fuer Pausen, Folienwechsel, Demos oder Fragen zusaetzliche Zeit ein und halte etwas Puffer bereit.' },
    { q: 'Wie messe ich mein eigenes Sprechtempo?', a: 'Lies einen Abschnitt mit bekannter Wortzahl laut in Vortragsgeschwindigkeit vor und stoppe die Zeit. Woerter geteilt durch die Minuten ergibt dein Sprechtempo.' },
  ],
  related: ['lesezeit-rechner', 'schreibzeit-rechner', 'lesegeschwindigkeit-test-rechner'],
  updated: '2026-06-19',
  examples: [
    {
      values: { woerter: 1500, tempo: 150, zielzeit: 10 },
      expect: [
        { label: 'Vortragsdauer', value: 10, tolerance: 0.01 },
        { label: 'Empfohlene Woerter fuer Zielzeit', value: 1500, tolerance: 0.5 },
        { label: 'Differenz zur Zielzeit', value: 0, tolerance: 0.01 },
      ],
    },
    {
      values: { woerter: 1300, tempo: 130, zielzeit: 8 },
      expect: [
        { label: 'Vortragsdauer', value: 10, tolerance: 0.01 },
        { label: 'Differenz zur Zielzeit', value: 2, tolerance: 0.01 },
      ],
    },
  ],
};
