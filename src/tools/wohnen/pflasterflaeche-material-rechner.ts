import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'pflasterflaeche-material-rechner',
  category: 'wohnen',
  title: 'Pflaster- & Terrassen-Material-Rechner',
  shortTitle: 'Pflastermaterial',
  description:
    'Berechne für eine Pflaster- oder Terrassenfläche den Materialbedarf: Pflastersteine inkl. Verschnitt sowie Splitt-Bettung und Schottertragschicht in Tonnen.',
  keywords: [
    'pflaster material berechnen',
    'pflastersteine bedarf rechner',
    'splitt bettung menge',
    'schottertragschicht berechnen',
    'terrasse material rechner',
    'pflasterfläche tonnen',
  ],
  formula:
    'Steinfläche = Fläche × (1+Verschnitt%); Splitt(t) = Fläche × Bettung(m) × 1,5; Schotter(t) = Fläche × Tragschicht(m) × 1,8',
  inputs: [
    { type: 'number', id: 'flaeche', label: 'Zu pflasternde Fläche', unit: 'm²', default: 30, min: 0, step: 0.5 },
    { type: 'number', id: 'verschnitt', label: 'Verschnitt-Zuschlag Steine', unit: '%', default: 8, min: 0, max: 25, step: 1, help: 'Für Zuschnitte an Rändern und Bruch, üblich 5–10 %.' },
    { type: 'number', id: 'bettung', label: 'Stärke Splitt-Bettung', unit: 'cm', default: 4, min: 0, max: 10, step: 0.5, help: 'Pflasterbett aus Splitt, meist 3–5 cm.' },
    { type: 'number', id: 'tragschicht', label: 'Stärke Schottertragschicht', unit: 'cm', default: 20, min: 0, max: 50, step: 1, help: 'Frostschutz/Schotter, je nach Nutzung 15–30 cm. 0 = nicht berechnen.' },
  ],
  compute: (v) => {
    const flaeche = num(v.flaeche);
    const verschnitt = num(v.verschnitt);
    const bettung = num(v.bettung) / 100;
    const tragschicht = num(v.tragschicht) / 100;
    const steinflaeche = flaeche * (1 + verschnitt / 100);
    const splittTonnen = flaeche * bettung * 1.5;
    const schotterTonnen = flaeche * tragschicht * 1.8;
    return [
      { label: 'Pflastersteine (inkl. Verschnitt)', value: steinflaeche, unit: 'm²', digits: 2, primary: true },
      { label: 'Splitt für Bettung', value: splittTonnen, unit: 't', digits: 2, help: 'Dichte ~1,5 t/m³.' },
      { label: 'Schotter für Tragschicht', value: schotterTonnen, unit: 't', digits: 2, help: 'Dichte ~1,8 t/m³.' },
    ];
  },
  intro:
    'Ein dauerhaft tragfähiger Pflasterbelag besteht aus mehreren Schichten: Pflastersteine auf einem Splittbett, darunter eine verdichtete Schottertragschicht als Frostschutz. Der Rechner ermittelt die zu bestellende Steinfläche inklusive Verschnitt sowie den Bedarf an Splitt und Schotter, die im Handel meist nach Tonnen verkauft werden. Die Schichtdicken hängen von der Belastung ab – für Pkw-befahrene Flächen plant man eine dickere Tragschicht als für reine Fußwege.',
  howto: [
    'Zu pflasternde Fläche in Quadratmetern eingeben.',
    'Verschnitt-Zuschlag für die Steine wählen (meist 5–10 %).',
    'Stärke der Splitt-Bettung (3–5 cm) und der Schottertragschicht eintragen.',
    'Steinfläche sowie Splitt- und Schottermenge in Tonnen ablesen.',
  ],
  faq: [
    { q: 'Wie dick muss die Tragschicht sein?', a: 'Für Geh- und Terrassenflächen genügen oft 15–20 cm verdichteter Schotter, für mit Pkw befahrene Flächen 25–30 cm oder mehr. Die Bettung aus Splitt beträgt unabhängig davon meist 3–5 cm.' },
    { q: 'Warum wird Material in Tonnen gerechnet?', a: 'Splitt und Schotter werden im Baustoffhandel nach Gewicht verkauft. Der Rechner rechnet das Volumen über typische Dichten (Splitt ~1,5 t/m³, Schotter ~1,8 t/m³) in Tonnen um.' },
    { q: 'Wie viel Verschnitt einplanen?', a: 'Üblich sind 5–10 % für Zuschnitte an Rändern und Bruch. Bei Bögen, Mustern oder Diagonalverlegung sollten Sie eher 10–15 % ansetzen.' },
  ],
  related: ['schuettgut-tonnen-rechner', 'erdaushub-volumen-rechner', 'fliesen-rechner'],
  updated: '2026-06-19',
  examples: [
    {
      values: { flaeche: 30, verschnitt: 8, bettung: 4, tragschicht: 20 },
      expect: [
        { label: 'Pflastersteine (inkl. Verschnitt)', value: 32.4, tolerance: 0.01 },
        { label: 'Splitt für Bettung', value: 1.8, tolerance: 0.01 },
        { label: 'Schotter für Tragschicht', value: 10.8, tolerance: 0.01 },
      ],
    },
  ],
};
