import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'reifen-restprofil-rechner',
  category: 'auto',
  title: 'Reifen-Restprofil-Rechner',
  shortTitle: 'Restprofil',
  description:
    'Berechne, wie viel Profil deine Reifen noch haben und nach wie vielen Kilometern der Wechsel ansteht – anhand von Profiltiefe und Abrieb.',
  keywords: [
    'reifen restprofil berechnen',
    'profiltiefe reifen rechner',
    'reifenwechsel km rechner',
    'restprofil bis verschleißgrenze',
    'reifen abrieb berechnen',
  ],
  formula:
    'Rest-km = (Profiltiefe − Grenze) / Abrieb je 1000 km × 1000',
  intro:
    'Wie lange halten die Reifen noch? Aus der aktuellen Profiltiefe, der Verschleißgrenze und dem Abrieb je 1000 km lässt sich abschätzen, wie viele Kilometer bis zum nötigen Reifenwechsel verbleiben. Der gesetzliche Mindestwert liegt bei 1,6 mm; aus Sicherheitsgründen wird ein Wechsel früher empfohlen.',
  inputs: [
    { type: 'number', id: 'profil', label: 'Aktuelle Profiltiefe', unit: 'mm', default: 6, min: 0, step: 0.1, help: 'Mit Profiltiefenmesser oder Münze prüfen.' },
    { type: 'number', id: 'grenze', label: 'Wechsel-Grenze', unit: 'mm', default: 3, min: 1.6, max: 8, step: 0.1, help: 'Gesetzlich 1,6 mm. Empfohlen: Sommer 3 mm, Winter 4 mm.' },
    { type: 'number', id: 'abrieb', label: 'Abrieb je 1000 km', unit: 'mm', default: 0.8, min: 0.01, step: 0.05, help: 'Erfahrungswert ca. 0,5–1,2 mm pro 1000 km.' },
  ],
  compute: (v) => {
    const profil = num(v.profil);
    const grenze = num(v.grenze);
    const abrieb = num(v.abrieb);
    const restProfil = Math.max(0, profil - grenze);
    const restKm = abrieb > 0 ? (restProfil / abrieb) * 1000 : 0;
    const bisGesetzlich = Math.max(0, profil - 1.6);
    const restKmGesetzlich = abrieb > 0 ? (bisGesetzlich / abrieb) * 1000 : 0;
    return [
      { label: 'Rest-Kilometer bis Wechsel', value: restKm, unit: 'km', digits: 0, primary: true },
      { label: 'Restprofil bis Grenze', value: restProfil, unit: 'mm', digits: 1 },
      { label: 'Rest-km bis gesetzlich (1,6 mm)', value: restKmGesetzlich, unit: 'km', digits: 0 },
    ];
  },
  howto: [
    'Aktuelle Profiltiefe messen und eintragen.',
    'Wechsel-Grenze wählen (gesetzlich 1,6 mm, empfohlen mehr).',
    'Abrieb je 1000 km abschätzen oder aus früheren Messungen ableiten.',
    'Verbleibende Kilometer bis zum Reifenwechsel ablesen.',
  ],
  faq: [
    { q: 'Wie viel Profil muss ein Reifen mindestens haben?', a: 'Gesetzlich vorgeschrieben sind in Deutschland 1,6 mm über die gesamte Lauffläche. Aus Sicherheitsgründen empfehlen Experten, Sommerreifen bei etwa 3 mm und Winterreifen bei etwa 4 mm zu wechseln.' },
    { q: 'Wie messe ich die Profiltiefe ohne Messgerät?', a: 'Mit dem 1-Euro-Stück: Der goldene Rand ist rund 3 mm breit. Verschwindet er im Profil, sind mindestens 3 mm vorhanden. Genauer ist ein günstiger Profiltiefenmesser.' },
    { q: 'Woher kenne ich meinen Abrieb je 1000 km?', a: 'Notiere bei zwei Messungen Profiltiefe und Kilometerstand. Der Profilverlust geteilt durch die gefahrenen 1000-km-Einheiten ergibt deinen individuellen Abrieb. Fahrstil und Reifentyp beeinflussen ihn stark.' },
  ],
  related: ['reifengroesse-abrollumfang-rechner', 'inspektionsintervall-rechner', 'auto-gesamtkosten-rechner'],
  updated: '2026-06-19',
  examples: [
    {
      values: { profil: 6, grenze: 3, abrieb: 0.8 },
      // Rest = 3 mm; Rest-km = 3/0,8*1000 = 3750
      expect: [{ label: 'Rest-Kilometer bis Wechsel', value: 3750, tolerance: 1 }],
    },
    {
      values: { profil: 8, grenze: 1.6, abrieb: 1 },
      // bis gesetzlich = 6,4 mm; Rest-km = 6,4/1*1000 = 6400
      expect: [{ label: 'Rest-km bis gesetzlich (1,6 mm)', value: 6400, tolerance: 1 }],
    },
  ],
};
