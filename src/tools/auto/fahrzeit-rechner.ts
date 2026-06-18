import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'fahrzeit-rechner',
  category: 'auto',
  title: 'Fahrzeit- & Durchschnittsgeschwindigkeit-Rechner',
  shortTitle: 'Fahrzeit',
  description:
    'Berechne die reine Fahrzeit für eine Strecke aus der Durchschnittsgeschwindigkeit – plus geplante Pausen und die echte Durchschnittsgeschwindigkeit.',
  keywords: [
    'fahrzeit berechnen',
    'durchschnittsgeschwindigkeit rechner',
    'fahrtzeit auto berechnen',
    'wie lange fahre ich rechner',
    'reisezeit berechnen auto',
    'geschwindigkeit zeit strecke',
    'ankunftszeit fahrt',
  ],
  formula: 'Fahrzeit (h) = Strecke / Geschwindigkeit; Reisezeit = Fahrzeit + Pausen',
  inputs: [
    { type: 'number', id: 'strecke', label: 'Strecke', unit: 'km', default: 300, min: 0, step: 1 },
    { type: 'number', id: 'tempo', label: 'Ø-Geschwindigkeit', unit: 'km/h', default: 100, min: 1, step: 1, help: 'Realistischer Schnitt inkl. Verzögerungen.' },
    { type: 'number', id: 'pause', label: 'Pausen gesamt', unit: 'min', default: 30, min: 0, step: 5 },
  ],
  compute: (v) => {
    const strecke = num(v.strecke);
    const tempo = num(v.tempo, 1);
    const pause = num(v.pause);
    const fahrzeitH = tempo > 0 ? strecke / tempo : 0;
    const fahrzeitMin = fahrzeitH * 60;
    const reisezeitMin = fahrzeitMin + pause;
    const reisezeitH = reisezeitMin / 60;
    const echterSchnitt = reisezeitH > 0 ? strecke / reisezeitH : 0;
    return [
      { label: 'Reisezeit gesamt', value: reisezeitMin, unit: 'min', digits: 0, primary: true, help: 'Fahrzeit plus Pausen.' },
      { label: 'Reine Fahrzeit', value: fahrzeitMin, unit: 'min', digits: 0 },
      { label: 'Reisezeit in Stunden', value: reisezeitH, unit: 'h', digits: 2 },
      { label: 'Echte Ø-Geschwindigkeit (inkl. Pausen)', value: echterSchnitt, unit: 'km/h', digits: 1 },
    ];
  },
  intro:
    'Aus Strecke und Durchschnittsgeschwindigkeit lässt sich die reine Fahrzeit direkt berechnen. Für eine realistische Ankunft solltest du Pausen einplanen – sie senken die effektiv erreichte Durchschnittsgeschwindigkeit spürbar. Wähle als Tempo einen ehrlichen Schnitt inklusive Ortsdurchfahrten, Baustellen und Stau.',
  howto: [
    'Streckenlänge in Kilometern eintragen.',
    'Realistische Durchschnittsgeschwindigkeit angeben (nicht das Maximaltempo).',
    'Geplante Pausen in Minuten ergänzen.',
    'Reisezeit und echte Durchschnittsgeschwindigkeit ablesen.',
  ],
  faq: [
    { q: 'Welche Durchschnittsgeschwindigkeit ist realistisch?', a: 'Auf der Autobahn oft 100–120 km/h, über Land 70–90 km/h, in der Stadt 20–40 km/h. Stau, Baustellen und Ampeln senken den Schnitt deutlich.' },
    { q: 'Wie wird die Fahrzeit berechnet?', a: 'Fahrzeit in Stunden = Strecke geteilt durch Durchschnittsgeschwindigkeit. 300 km bei 100 km/h ergeben 3 Stunden reine Fahrzeit.' },
    { q: 'Warum sinkt die echte Durchschnittsgeschwindigkeit?', a: 'Weil Pausen die Gesamtzeit verlängern, ohne dass Strecke zurückgelegt wird. Bezogen auf die gesamte Reisezeit fällt der Schnitt daher niedriger aus.' },
    { q: 'Wie viel Pause sollte ich einplanen?', a: 'Auf längeren Fahrten empfiehlt sich alle rund zwei Stunden eine kurze Pause. Für die Planung sind 15–30 Minuten pro Stopp ein guter Richtwert.' },
  ],
  related: ['spritkosten-rechner', 'durchschnittsverbrauch-rechner', 'reichweite-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { strecke: 300, tempo: 100, pause: 30 },
      expect: [{ label: 'Reine Fahrzeit', value: 180, tolerance: 0.5 }],
    },
    {
      values: { strecke: 300, tempo: 100, pause: 30 },
      expect: [{ label: 'Reisezeit gesamt', value: 210, tolerance: 0.5 }],
    },
  ],
};
