import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'rasen-saatgut-rollrasen-rechner',
  category: 'wohnen',
  title: 'Rasensaat- & Rollrasen-Mengen-Rechner',
  shortTitle: 'Rasenmenge',
  description:
    'Berechne, wie viel Rasensamen oder Rollrasen du für deine Fläche brauchst – mit Aussaatmenge je m² und Zuschlag für Verschnitt.',
  keywords: [
    'rasensamen menge berechnen',
    'wie viel rasensaat pro qm',
    'rollrasen menge rechner',
    'saatgut rasen rechner',
    'rasen aussaat menge',
  ],
  formula:
    'Saatgut (g) = Fläche × Aussaatmenge je m². Rollrasen (m²) = Fläche × (1 + Verschnitt).',
  inputs: [
    { type: 'number', id: 'flaeche', label: 'Rasenfläche', unit: 'm²', default: 100, min: 1, step: 1 },
    {
      type: 'select',
      id: 'methode',
      label: 'Vorhaben',
      default: '25',
      options: [
        { value: '25', label: 'Neuanlage Saatgut (~25 g/m²)' },
        { value: '15', label: 'Nachsaat / Ausbesserung (~15 g/m²)' },
        { value: 'rollrasen', label: 'Rollrasen verlegen' },
      ],
    },
    { type: 'number', id: 'verschnitt', label: 'Verschnitt / Reserve', unit: '%', default: 5, min: 0, max: 30, step: 1, help: 'Zuschlag für Zuschnitt und Verluste, v. a. bei Rollrasen.' },
  ],
  compute: (v) => {
    const flaeche = num(v.flaeche);
    const methode = String(v.methode);
    const verschnitt = Math.max(0, num(v.verschnitt));
    const faktor = 1 + verschnitt / 100;

    if (methode === 'rollrasen') {
      const rollrasen = flaeche * faktor;
      return [
        { label: 'Benötigter Rollrasen', value: rollrasen, unit: 'm²', digits: 1, primary: true },
        { label: 'Reine Fläche', value: flaeche, unit: 'm²', digits: 1 },
      ];
    }

    const gProM2 = num(methode);
    const gramm = flaeche * gProM2 * faktor;
    return [
      { label: 'Benötigtes Saatgut', value: gramm / 1000, unit: 'kg', digits: 2, primary: true },
      { label: 'Saatgut in Gramm', value: gramm, unit: 'g', digits: 0 },
      { label: 'Aussaatmenge je m²', value: gProM2, unit: 'g/m²', digits: 0 },
    ];
  },
  intro:
    'Damit der Rasen dicht und gleichmäßig wächst, kommt es auf die richtige Menge an. Für eine Neuanlage rechnet man mit rund 25 Gramm Saatgut je Quadratmeter, für eine Nachsaat etwa 15 Gramm. Rollrasen wird flächengleich verlegt, ein kleiner Zuschlag deckt Zuschnitt und Verschnitt ab. Der Rechner ermittelt die passende Menge inklusive Reserve.',
  howto: [
    'Rasenfläche in m² eingeben.',
    'Vorhaben wählen: Neuanlage, Nachsaat oder Rollrasen.',
    'Zuschlag für Verschnitt und Reserve festlegen (bei Rollrasen ca. 5 %).',
    'Benötigte Menge an Saatgut bzw. Rollrasen ablesen.',
  ],
  faq: [
    { q: 'Wie viel Rasensamen pro m²?', a: 'Für eine Neuanlage werden etwa 20 bis 30 Gramm je Quadratmeter empfohlen, üblich sind 25 g/m². Bei einer Nachsaat in vorhandenen Rasen genügen rund 15 g/m². Die genaue Angabe steht auf der Saatgutpackung.' },
    { q: 'Wie viel Reserve sollte ich einplanen?', a: 'Bei Saatgut reicht eine kleine Reserve für Ausbesserungen. Bei Rollrasen sind etwa 5 % Zuschlag sinnvoll, da an Rändern und Kurven zugeschnitten werden muss.' },
    { q: 'Wann säe ich am besten?', a: 'Die beste Zeit für die Rasenaussaat ist das Frühjahr ab etwa 10 °C Bodentemperatur oder der Spätsommer. Rollrasen kann während der gesamten frostfreien Saison verlegt werden, sollte aber zügig bewässert werden.' },
  ],
  related: ['erdaushub-volumen-rechner', 'pflasterflaeche-material-rechner', 'wohnflaeche-rechner'],
  updated: '2026-06-19',
  examples: [
    {
      values: { flaeche: 100, methode: '25', verschnitt: 0 },
      expect: [
        { label: 'Benötigtes Saatgut', value: 2.5, tolerance: 0.01 },
        { label: 'Saatgut in Gramm', value: 2500, tolerance: 1 },
      ],
    },
    {
      values: { flaeche: 100, methode: 'rollrasen', verschnitt: 5 },
      expect: [
        { label: 'Benötigter Rollrasen', value: 105, tolerance: 0.1 },
      ],
    },
  ],
};
