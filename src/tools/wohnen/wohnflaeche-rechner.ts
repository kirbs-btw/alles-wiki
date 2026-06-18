import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'wohnflaeche-rechner',
  category: 'wohnen',
  title: 'Wohnfläche-Rechner (Raumflächen addieren)',
  shortTitle: 'Wohnfläche',
  description:
    'Berechne die Wohnfläche aus bis zu fünf Räumen und einer Dachschräge – mit anrechenbaren Anteilen nach Wohnflächenverordnung für Balkon und niedrige Bereiche.',
  keywords: [
    'wohnfläche berechnen',
    'wohnflächenverordnung rechner',
    'qm berechnen wohnung',
    'dachschräge wohnfläche',
    'balkon anrechnung wohnfläche',
    'raumfläche addieren',
    'wohnfläche ermitteln',
  ],
  formula:
    'Wohnfläche = Σ Raumflächen + niedrige Fläche × 50 % + Balkonfläche × Balkonfaktor',
  inputs: [
    { type: 'number', id: 'raum1', label: 'Raum 1 (volle Höhe)', unit: 'm²', default: 25, min: 0, step: 0.1 },
    { type: 'number', id: 'raum2', label: 'Raum 2 (volle Höhe)', unit: 'm²', default: 15, min: 0, step: 0.1 },
    { type: 'number', id: 'raum3', label: 'Raum 3 (volle Höhe)', unit: 'm²', default: 12, min: 0, step: 0.1 },
    { type: 'number', id: 'raum4', label: 'Raum 4 (volle Höhe)', unit: 'm²', default: 8, min: 0, step: 0.1 },
    { type: 'number', id: 'niedrig', label: 'Fläche unter 2 m Höhe (Dachschräge)', unit: 'm²', default: 6, min: 0, step: 0.1, help: 'Flächen mit lichter Höhe von 1 bis unter 2 m zählen zur Hälfte.' },
    { type: 'number', id: 'balkon', label: 'Balkon-/Terrassenfläche', unit: 'm²', default: 8, min: 0, step: 0.1 },
    {
      type: 'select', id: 'balkonfaktor', label: 'Anrechnung Balkon/Terrasse', default: '0.25',
      options: [
        { value: '0.25', label: '25 % (Regelfall WoFlV)' },
        { value: '0.5', label: '50 % (hochwertig, z. B. Süd/Loggia)' },
        { value: '0', label: '0 % (nicht anrechnen)' },
      ],
    },
  ],
  compute: (v) => {
    const voll = num(v.raum1) + num(v.raum2) + num(v.raum3) + num(v.raum4);
    const niedrig = num(v.niedrig);
    const balkon = num(v.balkon);
    const balkonfaktor = num(v.balkonfaktor, 0.25);
    const niedrigAnteil = niedrig * 0.5;
    const balkonAnteil = balkon * balkonfaktor;
    const wohnflaeche = voll + niedrigAnteil + balkonAnteil;
    return [
      { label: 'Wohnfläche gesamt', value: wohnflaeche, unit: 'm²', digits: 2, primary: true },
      { label: 'Räume volle Höhe', value: voll, unit: 'm²', digits: 2 },
      { label: 'Anrechenbar Dachschräge', value: niedrigAnteil, unit: 'm²', digits: 2 },
      { label: 'Anrechenbar Balkon/Terrasse', value: balkonAnteil, unit: 'm²', digits: 2 },
    ];
  },
  intro:
    'Die Wohnflächenverordnung (WoFlV) regelt, wie Flächen anzurechnen sind: Räume ab 2 m lichter Höhe zählen voll, Flächen zwischen 1 m und unter 2 m (typische Dachschrägen) nur zur Hälfte und Bereiche unter 1 m gar nicht. Balkone, Loggien und Terrassen werden in der Regel zu 25 %, höchstens zu 50 % angerechnet.',
  howto: [
    'Flächen aller Räume mit voller Raumhöhe (ab 2 m) eintragen.',
    'Flächen unter Dachschrägen mit 1 bis unter 2 m Höhe separat erfassen.',
    'Balkon- oder Terrassenfläche eingeben und den Anrechnungsfaktor wählen.',
    'Gesamte Wohnfläche nach WoFlV ablesen.',
  ],
  faq: [
    { q: 'Wie werden Dachschrägen angerechnet?', a: 'Flächen mit einer lichten Höhe von mindestens 2 m zählen voll, Flächen von 1 m bis unter 2 m zur Hälfte und Bereiche unter 1 m Höhe werden gar nicht mitgerechnet.' },
    { q: 'Zählt der Balkon zur Wohnfläche?', a: 'Balkone, Loggien, Dachgärten und Terrassen werden nach WoFlV in der Regel zu einem Viertel, höchstens jedoch zur Hälfte angerechnet. Wähle den Faktor passend zur Qualität der Fläche.' },
    { q: 'Was zählt nicht zur Wohnfläche?', a: 'Nicht zur Wohnfläche gehören Kellerräume, Heizungs- und Waschräume, Garagen sowie Treppen mit mehr als drei Stufen. Auch Zubehörräume zählen nicht mit.' },
    { q: 'Warum ist die genaue Wohnfläche wichtig?', a: 'Die Wohnfläche ist Grundlage für Miete, Nebenkostenumlage und Kaufpreis pro Quadratmeter. Weicht die tatsächliche Fläche um mehr als 10 % von der vereinbarten ab, kann eine Mietminderung in Betracht kommen.' },
  ],
  related: ['quadratmeterpreis-rechner', 'nebenkosten-umlage-rechner', 'mietrendite-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { raum1: 25, raum2: 15, raum3: 12, raum4: 8, niedrig: 6, balkon: 8, balkonfaktor: '0.25' },
      expect: [
        { label: 'Wohnfläche gesamt', value: 65, tolerance: 0.01 },
        { label: 'Anrechenbar Dachschräge', value: 3, tolerance: 0.01 },
        { label: 'Anrechenbar Balkon/Terrasse', value: 2, tolerance: 0.01 },
      ],
    },
  ],
};
