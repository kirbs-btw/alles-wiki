import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'reifengroesse-abrollumfang-rechner',
  category: 'auto',
  title: 'Reifengröße & Abrollumfang-Rechner',
  shortTitle: 'Abrollumfang',
  description:
    'Berechne Reifendurchmesser und Abrollumfang aus Reifenbreite, Querschnitt und Felgengröße – ideal zum Vergleich zweier Reifengrößen.',
  keywords: [
    'abrollumfang berechnen',
    'reifengröße rechner',
    'reifendurchmesser berechnen',
    'abrollumfang reifen vergleich',
    'reifenbreite querschnitt zoll',
    'reifengröße umrechnen',
    'tachoabweichung reifen',
  ],
  formula: 'Durchmesser = Felge×25,4 + 2×(Breite×Querschnitt/100); Abrollumfang ≈ Durchmesser × π',
  inputs: [
    { type: 'number', id: 'breite', label: 'Reifenbreite', unit: 'mm', default: 205, min: 100, step: 5, help: 'Erste Zahl, z. B. 205.' },
    { type: 'number', id: 'querschnitt', label: 'Querschnitt (Höhe)', unit: '%', default: 55, min: 20, max: 100, step: 5, help: 'Zweite Zahl, z. B. 55.' },
    { type: 'number', id: 'felge', label: 'Felgendurchmesser', unit: 'Zoll', default: 16, min: 10, max: 24, step: 1, help: 'Zahl nach dem R, z. B. R16.' },
  ],
  compute: (v) => {
    const breite = num(v.breite);
    const querschnitt = num(v.querschnitt);
    const felge = num(v.felge);
    const flankenhoehe = breite * (querschnitt / 100); // mm pro Flanke
    const felgeMm = felge * 25.4;
    const durchmesser = felgeMm + 2 * flankenhoehe; // mm
    const abrollumfangMm = durchmesser * Math.PI; // theoretisch; real ca. 96–98 %
    const abrollumfangM = abrollumfangMm / 1000;
    const umdrehungenProKm = abrollumfangM > 0 ? 1000 / abrollumfangM : 0;
    return [
      { label: 'Abrollumfang (theoretisch)', value: abrollumfangM, unit: 'm', digits: 3, primary: true, help: 'Real meist 2–4 % kleiner durch Reifenwalkung.' },
      { label: 'Reifendurchmesser', value: durchmesser, unit: 'mm', digits: 0 },
      { label: 'Flankenhöhe je Seite', value: flankenhoehe, unit: 'mm', digits: 0 },
      { label: 'Umdrehungen pro km', value: umdrehungenProKm, unit: 'U/km', digits: 0 },
    ];
  },
  intro:
    'Die Reifengröße wie 205/55 R16 verschlüsselt Breite, Querschnitt und Felgengröße. Daraus lassen sich Durchmesser und Abrollumfang berechnen. Beim Wechsel auf eine andere Größe sollte der Abrollumfang möglichst gleich bleiben (Toleranz rund ±2 %), sonst zeigt der Tacho falsch und elektronische Systeme können gestört werden.',
  howto: [
    'Reifenbreite eintragen – die erste Zahl der Größe (z. B. 205).',
    'Querschnitt als Prozentwert angeben – die zweite Zahl (z. B. 55).',
    'Felgendurchmesser in Zoll eintragen – die Zahl hinter dem R (z. B. 16).',
    'Ergebnis mit einer zweiten Größe vergleichen, um die Abweichung zu prüfen.',
  ],
  faq: [
    { q: 'Was bedeutet 205/55 R16?', a: '205 ist die Reifenbreite in mm, 55 der Querschnitt in Prozent der Breite (Flankenhöhe), R steht für Radialreifen und 16 ist der Felgendurchmesser in Zoll.' },
    { q: 'Wie viel Abweichung ist erlaubt?', a: 'Beim Wechsel der Reifengröße sollte der Abrollumfang nur wenige Prozent abweichen. Maßgeblich sind die Eintragungen in den Fahrzeugpapieren bzw. die Freigabe (CoC/ABE).' },
    { q: 'Warum ist der reale Abrollumfang kleiner?', a: 'Unter Last walkt der Reifen ein, der dynamische Rollradius ist kleiner als der geometrische. Real liegt der Abrollumfang oft 2–4 % unter dem theoretischen Wert.' },
    { q: 'Was passiert bei zu großem Abrollumfang?', a: 'Der Tacho zeigt zu wenig an, der Wegstreckenzähler stimmt nicht und im Extremfall schleift der Reifen. Bleibe daher nah am Originalwert.' },
  ],
  related: ['durchschnittsverbrauch-rechner', 'reichweite-rechner', 'kosten-pro-km-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { breite: 205, querschnitt: 55, felge: 16 },
      expect: [{ label: 'Reifendurchmesser', value: 632, tolerance: 1 }],
    },
    {
      values: { breite: 205, querschnitt: 55, felge: 16 },
      expect: [{ label: 'Abrollumfang (theoretisch)', value: 1.986, tolerance: 0.005 }],
    },
  ],
};
