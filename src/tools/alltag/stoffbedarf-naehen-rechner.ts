import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'stoffbedarf-naehen-rechner',
  category: 'alltag',
  title: 'Stoffbedarf zum Nähen berechnen',
  shortTitle: 'Stoffbedarf',
  description:
    'Berechne, wie viele Meter Stoff du für ein Nähprojekt brauchst – aus benötigter Fläche, Stoffbreite und einem Zuschlag für Verschnitt und Nahtzugaben.',
  keywords: [
    'stoffbedarf berechnen',
    'wieviel stoff naehen',
    'stoff meter berechnen',
    'stoffverbrauch rechner',
    'stoffbreite umrechnen',
    'naehen stoff menge',
  ],
  formula:
    'Stofflänge = (benötigte Fläche × (1 + Verschnitt %)) / Stoffbreite',
  inputs: [
    { type: 'number', id: 'flaeche', label: 'Benötigte Stofffläche', unit: 'm²', default: 1.5, min: 0, step: 0.1, help: 'Summe aller Schnittteile in Quadratmetern.' },
    { type: 'number', id: 'breite', label: 'Stoffbreite (Ballenbreite)', unit: 'cm', default: 140, min: 1, step: 5, help: 'Üblich: 140 cm, teils 110 cm oder 150 cm.' },
    { type: 'number', id: 'verschnitt', label: 'Zuschlag für Verschnitt & Nahtzugabe', unit: '%', default: 15, min: 0, max: 100, step: 5 },
  ],
  compute: (v) => {
    const flaeche = num(v.flaeche);
    const breiteM = num(v.breite, 1) / 100;
    const verschnitt = num(v.verschnitt);
    const flaecheMitZuschlag = flaeche * (1 + verschnitt / 100);
    const laenge = breiteM > 0 ? flaecheMitZuschlag / breiteM : 0;
    return [
      { label: 'Benötigte Stofflänge', value: laenge, unit: 'm', digits: 2, primary: true, help: 'Bei der angegebenen Stoffbreite.' },
      { label: 'Fläche inkl. Zuschlag', value: flaecheMitZuschlag, unit: 'm²', digits: 2 },
      { label: 'Stoffbreite', value: breiteM, unit: 'm', digits: 2 },
    ];
  },
  intro:
    'Stoff wird im Laden nach Länge verkauft, dein Schnittmuster braucht aber eine bestimmte Fläche. Dieser Rechner rechnet die benötigte Fläche unter Berücksichtigung der Ballenbreite in laufende Meter um und schlägt einen Anteil für Verschnitt, Musterausrichtung und Nahtzugaben auf. So kaufst du genug, ohne unnötig viel Reststoff übrig zu haben.',
  howto: [
    'Schätze die Gesamtfläche aller Schnittteile in Quadratmetern.',
    'Trage die Stoffbreite ein (steht meist am Ballen, oft 140 cm).',
    'Wähle einen Zuschlag für Verschnitt und Nahtzugaben (10–20 % sind üblich).',
    'Lies die benötigte Stofflänge in Metern ab.',
  ],
  faq: [
    { q: 'Welchen Verschnitt-Zuschlag soll ich wählen?', a: 'Für einfache Projekte reichen 10 %. Bei gemusterten Stoffen, die ausgerichtet werden müssen, oder vielen kleinen Teilen sind 15–20 % sicherer.' },
    { q: 'Woher weiß ich die Stoffbreite?', a: 'Die Breite des Stoffballens steht meist am Etikett oder wird im Shop angegeben. Gängige Breiten sind 110, 140 und 150 cm.' },
    { q: 'Ist das Ergebnis exakt?', a: 'Es ist eine gute Orientierung. Die tatsächlich nötige Länge hängt vom Zuschnitt-Layout ab; ein Schnittmuster gibt oft einen genaueren Stoffverbrauch an.' },
  ],
  related: ['geschenkpapier-bedarf-rechner', 'rezept-portionen-rechner', 'streugut-bedarf-rechner'],
  updated: '2026-06-19',
  examples: [
    {
      values: { flaeche: 1.5, breite: 140, verschnitt: 15 },
      expect: [
        { label: 'Fläche inkl. Zuschlag', value: 1.725, tolerance: 0.005 },
        { label: 'Benötigte Stofflänge', value: 1.23, tolerance: 0.02 },
      ],
    },
    {
      values: { flaeche: 2, breite: 100, verschnitt: 0 },
      expect: [
        { label: 'Benötigte Stofflänge', value: 2, tolerance: 0.01 },
      ],
    },
  ],
};
