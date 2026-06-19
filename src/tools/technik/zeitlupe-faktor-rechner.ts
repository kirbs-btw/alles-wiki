import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'zeitlupe-faktor-rechner',
  category: 'technik',
  title: 'Zeitlupen-Faktor-Rechner',
  shortTitle: 'Zeitlupe',
  description:
    'Berechne den Zeitlupen-Faktor aus Aufnahme- und Wiedergabe-Bildrate sowie die abgespielte Länge eines mit hoher FPS gefilmten Clips.',
  keywords: [
    'zeitlupe faktor berechnen',
    'slow motion rechner',
    'fps zeitlupe',
    'aufnahme wiedergabe bildrate',
    'wie viel zeitlupe 240 fps',
    'slowmo dauer rechner',
  ],
  formula: 'Faktor = Aufnahme-FPS / Wiedergabe-FPS; Abspieldauer = Clipdauer × Faktor',
  inputs: [
    { type: 'number', id: 'aufnahmeFps', label: 'Aufnahme-Bildrate', unit: 'FPS', default: 240, min: 1, step: 1, help: 'Mit wie vielen Bildern pro Sekunde gefilmt wurde.' },
    { type: 'number', id: 'wiedergabeFps', label: 'Wiedergabe-Bildrate', unit: 'FPS', default: 30, min: 1, step: 1, help: 'Mit wie vielen FPS der Clip abgespielt wird (Projekt-Framerate).' },
    { type: 'number', id: 'dauer', label: 'Aufgenommene Dauer', unit: 's', default: 1, min: 0, step: 0.1, help: 'Reale Länge der Szene in Sekunden.' },
  ],
  compute: (v) => {
    const auf = num(v.aufnahmeFps);
    const wieder = num(v.wiedergabeFps);
    const dauer = num(v.dauer);
    const faktor = wieder > 0 ? auf / wieder : 0;
    const abspieldauer = dauer * faktor;
    const tempoProzent = faktor > 0 ? 100 / faktor : 0;
    return [
      { label: 'Zeitlupen-Faktor', value: faktor, unit: '×', digits: 2, primary: true, help: 'So viel langsamer läuft die Szene.' },
      { label: 'Abspieldauer', value: abspieldauer, unit: 's', digits: 2 },
      { label: 'Wiedergabe-Tempo', value: tempoProzent, unit: '%', digits: 1, help: 'Bewegungstempo gegenüber Echtzeit.' },
    ];
  },
  intro:
    'Für eine Zeitlupe wird mit hoher Bildrate gefilmt und mit niedriger Bildrate abgespielt. Der Verlangsamungsfaktor ist einfach Aufnahme-FPS geteilt durch Wiedergabe-FPS: 240 FPS, abgespielt mit 30 FPS, ergeben einen 8-fachen Zeitlupeneffekt. Aus einer Sekunde realer Aufnahme werden so 8 Sekunden Film. Der Rechner liefert Faktor, resultierende Abspieldauer und das Bewegungstempo in Prozent.',
  howto: [
    'Aufnahme-Bildrate eingeben (z. B. 240 FPS deiner Kamera).',
    'Wiedergabe-Bildrate eintragen (Projekt-Framerate, z. B. 30 FPS).',
    'Reale Dauer der Szene angeben.',
    'Zeitlupen-Faktor und die abgespielte Länge ablesen.',
  ],
  faq: [
    { q: 'Wie stark ist Zeitlupe bei 240 FPS?', a: 'Bei einer Wiedergabe mit 30 FPS ergeben 240 FPS einen 8-fachen Zeitlupeneffekt. Bei 24 FPS Projektrate wären es sogar 10-fach.' },
    { q: 'Wie lang wird mein Clip in Zeitlupe?', a: 'Multipliziere die reale Aufnahmedauer mit dem Faktor. Eine 2-Sekunden-Szene mit Faktor 8 läuft 16 Sekunden ab.' },
    { q: 'Was bedeutet das Wiedergabe-Tempo in Prozent?', a: 'Es zeigt das Bewegungstempo gegenüber der Echtzeit. Ein 8-facher Faktor entspricht 12,5 % – die Bewegung läuft also mit einem Achtel der normalen Geschwindigkeit.' },
  ],
  related: ['fps-frametime-rechner', 'videodateigroesse-rechner', 'speicherbedarf-videos'],
  updated: '2026-06-19',
  examples: [
    {
      values: { aufnahmeFps: 240, wiedergabeFps: 30, dauer: 1 },
      // Faktor = 240/30 = 8; Abspieldauer = 1 × 8 = 8 s
      expect: [
        { label: 'Zeitlupen-Faktor', value: 8, tolerance: 0.01 },
        { label: 'Abspieldauer', value: 8, tolerance: 0.01 },
      ],
    },
    {
      values: { aufnahmeFps: 120, wiedergabeFps: 24, dauer: 2 },
      // Faktor = 120/24 = 5; Abspieldauer = 2 × 5 = 10 s
      expect: [{ label: 'Zeitlupen-Faktor', value: 5, tolerance: 0.01 }],
    },
  ],
};
