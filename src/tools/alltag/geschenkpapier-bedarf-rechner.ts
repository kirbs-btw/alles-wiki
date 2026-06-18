import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

/**
 * Geschenkpapier-Bedarf für einen Quader.
 * Benötigte Papierlänge (entlang Umfang) = (2×Höhe + 2×Breite) + Überlappung.
 * Benötigte Papierbreite = Länge + 2×Höhe + etwas Zugabe für die Stirnseiten.
 * Plus pauschaler Verschnittzuschlag.
 */
export const tool: Tool = {
  slug: 'geschenkpapier-bedarf-rechner',
  category: 'alltag',
  title: 'Geschenkpapier-Bedarf berechnen',
  shortTitle: 'Geschenkpapier',
  description:
    'Berechne, wie viel Geschenkpapier du brauchst, um eine Schachtel einzupacken – aus Länge, Breite und Höhe inklusive Überlappung.',
  keywords: [
    'geschenkpapier bedarf',
    'wie viel geschenkpapier',
    'geschenk einpacken papier',
    'geschenkpapier berechnen',
    'papiergroesse geschenk',
    'geschenkpapier rechner',
  ],
  formula:
    'Papierlänge = (2×Breite + 2×Höhe) × 1,1 (Überlappung); Papierbreite = Länge + 2×Höhe + 4 cm',
  inputs: [
    {
      type: 'number',
      id: 'laenge',
      label: 'Länge der Schachtel',
      unit: 'cm',
      default: 30,
      min: 1,
      max: 300,
      step: 1,
    },
    {
      type: 'number',
      id: 'breite',
      label: 'Breite der Schachtel',
      unit: 'cm',
      default: 20,
      min: 1,
      max: 300,
      step: 1,
    },
    {
      type: 'number',
      id: 'hoehe',
      label: 'Höhe der Schachtel',
      unit: 'cm',
      default: 10,
      min: 1,
      max: 300,
      step: 1,
    },
  ],
  compute: (v) => {
    const laenge = Math.max(0, num(v.laenge, 0));
    const breite = Math.max(0, num(v.breite, 0));
    const hoehe = Math.max(0, num(v.hoehe, 0));
    // Papier wird einmal um den Querschnitt (Breite + Höhe) gewickelt, mit 10 % Überlappung
    const papierLaenge = (2 * breite + 2 * hoehe) * 1.1;
    // Breite des Papiers deckt die Länge plus die beiden Stirnseiten (je halbe Höhe einklappen -> + Höhe) + 4 cm
    const papierBreite = laenge + 2 * hoehe + 4;
    const flaecheCm2 = papierLaenge * papierBreite;
    const flaecheM2 = flaecheCm2 / 10000;
    return [
      { label: 'Papier-Länge', value: papierLaenge, unit: 'cm', digits: 0, primary: true },
      { label: 'Papier-Breite', value: papierBreite, unit: 'cm', digits: 0 },
      { label: 'Benötigte Fläche', value: flaecheM2, unit: 'm2', digits: 2 },
    ];
  },
  intro:
    'Wie viel Geschenkpapier ein Päckchen braucht, lässt sich aus seinen Maßen berechnen. Das Papier wird einmal um den Querschnitt gewickelt (mit etwas Überlappung) und muss an den Stirnseiten umgeschlagen werden. Dieser Rechner liefert die nötige Papiergröße samt Zugaben – so kaufst du nicht zu wenig und schneidest passend zu.',
  howto: [
    'Miss Länge, Breite und Höhe der Schachtel in Zentimetern.',
    'Trage alle drei Werte ein.',
    'Lies ab, wie lang und breit das Papierstück sein muss.',
    'Die Gesamtfläche hilft beim Abschätzen, ob eine Rolle reicht.',
  ],
  faq: [
    { q: 'Warum die Überlappung?', a: 'Beim Umwickeln müssen sich die Papierkanten überlappen, damit nichts klafft. Der Rechner plant dafür rund 10 % zusätzliche Länge ein.' },
    { q: 'Reicht meine Rolle?', a: 'Vergleiche die benötigte Papierbreite mit der Rollenbreite (oft 70 cm). Ist sie größer, dreh das Geschenk anders oder setze zwei Bahnen an.' },
    { q: 'Gilt das auch für runde Geschenke?', a: 'Nein, der Rechner ist für quaderförmige Schachteln gedacht. Runde oder unförmige Geschenke brauchen mehr Papier und etwas Übung.' },
    { q: 'Wie genau ist das?', a: 'Es ist eine praxisnahe Schätzung mit Zugaben. Beim ersten Versuch lieber etwas großzügiger zuschneiden und Überstehendes abschneiden.' },
  ],
  related: ['flaeche-umrechner', 'partymengen-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { laenge: 30, breite: 20, hoehe: 10 },
      // papierLaenge = (40+20)*1.1 = 60*1.1 = 66; papierBreite = 30+20+4 = 54
      // flaeche = 66*54 = 3564 cm2 = 0.3564 m2
      expect: [
        { label: 'Papier-Länge', value: 66, tolerance: 0.5 },
        { label: 'Papier-Breite', value: 54, tolerance: 0 },
        { label: 'Benötigte Fläche', value: 0.36, tolerance: 0.005 },
      ],
    },
    {
      values: { laenge: 20, breite: 15, hoehe: 5 },
      // papierLaenge = (30+10)*1.1 = 40*1.1 = 44; papierBreite = 20+10+4 = 34
      expect: [
        { label: 'Papier-Länge', value: 44, tolerance: 0.5 },
        { label: 'Papier-Breite', value: 34, tolerance: 0 },
      ],
    },
  ],
};
