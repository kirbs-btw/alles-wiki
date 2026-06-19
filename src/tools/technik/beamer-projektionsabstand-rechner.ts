import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'beamer-projektionsabstand-rechner',
  category: 'technik',
  title: 'Beamer-Projektionsabstand-Rechner',
  shortTitle: 'Beamer-Abstand',
  description:
    'Berechne aus dem Throw-Ratio deines Beamers und der gewünschten Bildbreite den nötigen Projektionsabstand – oder die Bildgröße bei festem Abstand.',
  keywords: [
    'beamer projektionsabstand berechnen',
    'beamer abstand bildgröße',
    'throw ratio rechner',
    'beamer bildbreite abstand',
    'projektor abstand leinwand',
    'beamer entfernung rechner',
  ],
  formula: 'Abstand = Throw-Ratio × Bildbreite; Bildbreite = Abstand / Throw-Ratio',
  inputs: [
    { type: 'number', id: 'throwRatio', label: 'Throw-Ratio des Beamers', default: 1.5, min: 0.1, step: 0.05, help: 'Verhältnis Abstand zu Bildbreite (steht im Datenblatt, z. B. 1,5:1).' },
    {
      type: 'select',
      id: 'modus',
      label: 'Was ist bekannt?',
      default: 'breite',
      options: [
        { value: 'breite', label: 'Bildbreite → Abstand' },
        { value: 'abstand', label: 'Abstand → Bildbreite' },
      ],
    },
    { type: 'number', id: 'bildbreite', label: 'Gewünschte Bildbreite', unit: 'm', default: 2, min: 0, step: 0.1, help: 'Nur im Modus „Bildbreite → Abstand“.' },
    { type: 'number', id: 'abstand', label: 'Vorhandener Abstand', unit: 'm', default: 3, min: 0, step: 0.1, help: 'Nur im Modus „Abstand → Bildbreite“.' },
  ],
  compute: (v) => {
    const tr = num(v.throwRatio);
    const istBreite = String(v.modus) === 'breite';
    const breite = num(v.bildbreite);
    const abstandIn = num(v.abstand);
    let bildbreite: number;
    let abstand: number;
    if (istBreite) {
      bildbreite = breite;
      abstand = tr * breite;
    } else {
      abstand = abstandIn;
      bildbreite = tr > 0 ? abstandIn / tr : 0;
    }
    // 16:9-Bild: Höhe = Breite × 9/16, Diagonale = Breite × √(1 + (9/16)²)
    const hoehe = bildbreite * (9 / 16);
    const diagM = bildbreite * Math.sqrt(1 + (9 / 16) ** 2);
    const diagZoll = (diagM * 100) / 2.54;
    if (istBreite) {
      return [
        { label: 'Benötigter Abstand', value: abstand, unit: 'm', digits: 2, primary: true },
        { label: 'Bildhöhe (16:9)', value: hoehe, unit: 'm', digits: 2 },
        { label: 'Bilddiagonale (16:9)', value: diagZoll, unit: 'Zoll', digits: 0 },
      ];
    }
    return [
      { label: 'Mögliche Bildbreite', value: bildbreite, unit: 'm', digits: 2, primary: true },
      { label: 'Bildhöhe (16:9)', value: hoehe, unit: 'm', digits: 2 },
      { label: 'Bilddiagonale (16:9)', value: diagZoll, unit: 'Zoll', digits: 0 },
    ];
  },
  intro:
    'Das Throw-Ratio (Projektionsverhältnis) eines Beamers gibt an, wie viel Abstand er für eine bestimmte Bildbreite braucht: Ein Throw-Ratio von 1,5:1 bedeutet 1,5 m Abstand pro 1 m Bildbreite. Daraus lässt sich der nötige Projektionsabstand oder umgekehrt die mögliche Bildgröße bei festem Abstand berechnen. Bild­höhe und ‑diagonale werden für ein 16:9-Format ergänzt.',
  howto: [
    'Throw-Ratio aus dem Datenblatt des Beamers eintragen (z. B. 1,5).',
    'Modus wählen: bekannte Bildbreite oder bekannter Abstand.',
    'Den jeweils bekannten Wert eingeben.',
    'Abstand bzw. Bildbreite samt Diagonale ablesen.',
  ],
  faq: [
    { q: 'Was bedeutet das Throw-Ratio 1,5:1?', a: 'Der Beamer muss das 1,5-fache der Bildbreite entfernt stehen. Für ein 2 m breites Bild sind das 3 m Abstand. Kleinere Werte (Kurzdistanz-Beamer) erlauben große Bilder auf kurzer Distanz.' },
    { q: 'Wie groß ist die Bilddiagonale bei 2 m Breite?', a: 'Bei 16:9 ist die Diagonale rund das 1,147-fache der Breite, hier also etwa 2,29 m bzw. rund 90 Zoll. Der Rechner gibt die Zoll-Diagonale direkt aus.' },
    { q: 'Gilt das für jede Leinwand?', a: 'Die Rechnung gilt für das 16:9-Standardformat. Bei abweichendem Format (z. B. 4:3 oder 21:9) ändern sich Höhe und Diagonale, die Beziehung Abstand zu Bildbreite über das Throw-Ratio bleibt aber gleich.' },
  ],
  related: ['tv-groesse-sichtabstand-rechner', 'seitenverhaeltnis-rechner', 'dpi-ppi-rechner'],
  updated: '2026-06-19',
  examples: [
    {
      values: { throwRatio: 1.5, modus: 'breite', bildbreite: 2, abstand: 3 },
      // Abstand = 1,5 × 2 = 3 m
      expect: [
        { label: 'Benötigter Abstand', value: 3, tolerance: 0.01 },
        { label: 'Bildhöhe (16:9)', value: 1.125, tolerance: 0.005 },
      ],
    },
    {
      values: { throwRatio: 1.5, modus: 'abstand', bildbreite: 2, abstand: 3 },
      // Bildbreite = 3 / 1,5 = 2 m
      expect: [{ label: 'Mögliche Bildbreite', value: 2, tolerance: 0.01 }],
    },
  ],
};
