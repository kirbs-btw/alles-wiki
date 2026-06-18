import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'dachziegel-bedarf-rechner',
  category: 'wohnen',
  title: 'Dachziegel-Bedarf-Rechner',
  shortTitle: 'Dachziegel',
  description:
    'Berechne die benötigten Dachziegel für ein Satteldach aus Grundfläche, Dachneigung und Ziegel-Deckmaß – inklusive Verschnitt und schräger Dachfläche.',
  keywords: [
    'dachziegel berechnen',
    'dachziegel bedarf rechner',
    'wie viele dachziegel pro qm',
    'ziegel dach menge',
    'dachfläche berechnen',
    'dachziegel pro quadratmeter',
  ],
  formula:
    'Dachfläche = Grundfläche / cos(Neigung); Ziegel je m² = 1 / Deckmaß(m²); Stück = ceil(Dachfläche × (1+Verschnitt%) × Ziegel je m²)',
  inputs: [
    { type: 'number', id: 'grundflaeche', label: 'Überdeckte Grundfläche', unit: 'm²', default: 100, min: 1, step: 1, help: 'Grundriss-Fläche unter dem Dach (Länge × Tiefe).' },
    { type: 'number', id: 'neigung', label: 'Dachneigung', unit: '°', default: 35, min: 0, max: 70, step: 1, help: 'Steildächer häufig 30–45°.' },
    { type: 'number', id: 'ziegelProQm', label: 'Ziegel je m² (Deckung)', unit: 'Stück/m²', default: 15, min: 1, step: 1, help: 'Aus dem Datenblatt des Ziegels, oft 12–18.' },
    { type: 'number', id: 'verschnitt', label: 'Verschnitt-Zuschlag', unit: '%', default: 8, min: 0, max: 25, step: 1, help: 'Für Zuschnitte an Graten, Kehlen und Bruch, üblich 5–10 %.' },
  ],
  compute: (v) => {
    const grundflaeche = num(v.grundflaeche);
    const neigung = num(v.neigung);
    const ziegelProQm = num(v.ziegelProQm);
    const verschnitt = num(v.verschnitt);
    const cos = Math.cos((neigung * Math.PI) / 180);
    const dachflaeche = cos > 0 ? grundflaeche / cos : grundflaeche;
    const bedarfFlaeche = dachflaeche * (1 + verschnitt / 100);
    const stueck = Math.ceil(bedarfFlaeche * ziegelProQm);
    return [
      { label: 'Benötigte Dachziegel', value: stueck, unit: 'Stück', digits: 0, primary: true },
      { label: 'Schräge Dachfläche', value: dachflaeche, unit: 'm²', digits: 2 },
    ];
  },
  intro:
    'Die tatsächliche Dachfläche ist wegen der Neigung größer als die überdeckte Grundfläche. Der Rechner ermittelt aus Grundfläche und Dachneigung die schräge Dachfläche und daraus mit dem Deckmaß des Ziegels die benötigte Stückzahl. Ein Verschnitt-Zuschlag deckt Zuschnitte an Graten, Kehlen und Anschlüssen sowie Bruch ab. Für eine Dachseite trägst du deren Grundfläche ein; bei einem Satteldach summierst du beide Seiten.',
  howto: [
    'Überdeckte Grundfläche eingeben (Grundriss unter dem Dach).',
    'Dachneigung in Grad eintragen (häufig 30–45°).',
    'Ziegel je m² aus dem Datenblatt des gewählten Ziegels eingeben.',
    'Verschnitt wählen (meist 5–10 %) und benötigte Ziegelzahl ablesen.',
  ],
  faq: [
    { q: 'Wie viele Dachziegel pro Quadratmeter?', a: 'Das hängt vom Modell ab und steht im Datenblatt – meist 12 bis 18 Ziegel je Quadratmeter Dachfläche. Großformatige Ziegel brauchen weniger Stück, Biberschwänze deutlich mehr.' },
    { q: 'Warum ist die Dachfläche größer als die Grundfläche?', a: 'Weil das Dach geneigt ist. Bei 35° Neigung ist die schräge Fläche rund 22 % größer als die Grundfläche darunter. Der Rechner berücksichtigt das über den Kosinus der Neigung.' },
    { q: 'Wie viel Verschnitt einplanen?', a: 'Üblich sind 5–10 %. Bei vielen Graten, Kehlen, Gauben oder Schornsteinen plant man eher mehr ein, weil dort mehr zugeschnitten wird.' },
    { q: 'Gilt das auch für Dachsteine oder Schiefer?', a: 'Die Methode passt für jede Eindeckung – trage einfach die Verlegemenge je m² des jeweiligen Materials ein. Bei Schiefer und Biberschwanz ist die Stückzahl je m² deutlich höher.' },
  ],
  related: ['daemmung-heizkosten-ersparnis-rechner', 'fliesen-rechner', 'putz-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { grundflaeche: 100, neigung: 35, ziegelProQm: 15, verschnitt: 8 },
      expect: [
        { label: 'Schräge Dachfläche', value: 122.07, tolerance: 0.1 },
        { label: 'Benötigte Dachziegel', value: 1978, tolerance: 0.01 },
      ],
    },
    {
      values: { grundflaeche: 60, neigung: 0, ziegelProQm: 15, verschnitt: 0 },
      expect: [
        { label: 'Schräge Dachfläche', value: 60, tolerance: 0.01 },
        { label: 'Benötigte Dachziegel', value: 900, tolerance: 0.01 },
      ],
    },
  ],
};
