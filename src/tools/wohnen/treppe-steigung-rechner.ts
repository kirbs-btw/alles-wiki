import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'treppe-steigung-rechner',
  category: 'wohnen',
  title: 'Treppen-Rechner (Steigung & Schrittmaß)',
  shortTitle: 'Treppe',
  description:
    'Berechne Stufenzahl, Steigungshöhe und Auftrittstiefe einer Treppe und prüfe das Schrittmaß (2 × Steigung + Auftritt) für bequemes Gehen.',
  keywords: [
    'treppe berechnen',
    'treppe steigung rechner',
    'schrittmaß treppe',
    'stufen berechnen',
    'treppensteigung berechnen',
    'auftritt steigung treppe',
  ],
  formula:
    'Stufenzahl = round(Geschosshöhe / Wunsch-Steigung); Steigung = Geschosshöhe / Stufenzahl; Auftritt = Lauflänge / (Stufenzahl − 1); Schrittmaß = 2 × Steigung + Auftritt',
  inputs: [
    { type: 'number', id: 'geschosshoehe', label: 'Geschosshöhe (Höhenunterschied)', unit: 'cm', default: 280, min: 30, step: 1, help: 'Fertiger Fußboden unten bis fertiger Fußboden oben.' },
    { type: 'number', id: 'lauflaenge', label: 'Verfügbare Lauflänge (Grundriss)', unit: 'cm', default: 320, min: 30, step: 1, help: 'Horizontale Strecke, über die die Treppe verläuft.' },
    { type: 'number', id: 'wunschSteigung', label: 'Gewünschte Steigungshöhe', unit: 'cm', default: 17.5, min: 10, max: 22, step: 0.5, help: 'Bequem 17–18 cm; Wohnungstreppen max. ca. 19–20 cm.' },
  ],
  compute: (v) => {
    const geschosshoehe = num(v.geschosshoehe);
    const lauflaenge = num(v.lauflaenge);
    const wunschSteigung = num(v.wunschSteigung);
    const stufen = wunschSteigung > 0 ? Math.max(Math.round(geschosshoehe / wunschSteigung), 1) : 1;
    const steigung = stufen > 0 ? geschosshoehe / stufen : 0;
    const auftritt = stufen > 1 ? lauflaenge / (stufen - 1) : lauflaenge;
    const schrittmass = 2 * steigung + auftritt;
    return [
      { label: 'Anzahl Stufen', value: stufen, unit: 'Stufen', digits: 0, primary: true },
      { label: 'Steigungshöhe je Stufe', value: steigung, unit: 'cm', digits: 2 },
      { label: 'Auftrittstiefe', value: auftritt, unit: 'cm', digits: 2 },
      { label: 'Schrittmaß (2×Steigung + Auftritt)', value: schrittmass, unit: 'cm', digits: 2 },
    ];
  },
  intro:
    'Eine bequeme und sichere Treppe folgt der Schrittmaßregel: Zweimal die Steigungshöhe plus die Auftrittstiefe sollten zwischen rund 59 und 65 cm liegen, ideal 63 cm. Der Rechner ermittelt aus Geschosshöhe und gewünschter Steigung die Stufenzahl, daraus die exakte Steigungshöhe und mit der Lauflänge die Auftrittstiefe. So lässt sich prüfen, ob die geplante Treppe gut begehbar ist. Die Werte sind Orientierung; für Wohngebäude gelten je nach Landesbauordnung Mindestmaße.',
  howto: [
    'Geschosshöhe eingeben (fertiger Fußboden unten bis oben).',
    'Verfügbare Lauflänge im Grundriss eintragen.',
    'Gewünschte Steigungshöhe wählen (bequem 17–18 cm).',
    'Stufenzahl, Steigung, Auftritt und Schrittmaß ablesen und mit 59–65 cm vergleichen.',
  ],
  faq: [
    { q: 'Was ist die Schrittmaßregel?', a: 'Zweimal die Steigungshöhe plus einmal die Auftrittstiefe sollten etwa 63 cm ergeben (Bereich rund 59–65 cm). Dieses Maß orientiert sich an der natürlichen Schrittlänge und macht Treppen bequem und sicher.' },
    { q: 'Wie hoch darf eine Stufe sein?', a: 'In Wohngebäuden sind 17–18 cm angenehm. Mehr als rund 19–20 cm gilt als steil und anstrengend. Maßgeblich sind die Vorgaben der jeweiligen Landesbauordnung.' },
    { q: 'Warum Stufenzahl minus 1 beim Auftritt?', a: 'Die oberste Stufe entspricht dem oberen Fußboden und hat keinen eigenen Auftritt mehr im Treppenlauf. Deshalb verteilt sich die Lauflänge auf eine Stufe weniger als die Steigungszahl.' },
    { q: 'Ist das Ergebnis baurechtlich verbindlich?', a: 'Nein, es ist eine Planungshilfe. Notwendige Treppen unterliegen der Landesbauordnung mit Mindestmaßen für Breite, Steigung und Auftritt. Bei tragenden oder notwendigen Treppen sollte eine Fachplanung erfolgen.' },
  ],
  related: ['raumvolumen-rechner', 'wohnflaeche-rechner', 'laminat-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { geschosshoehe: 280, lauflaenge: 320, wunschSteigung: 17.5 },
      expect: [
        { label: 'Anzahl Stufen', value: 16, tolerance: 0.01 },
        { label: 'Steigungshöhe je Stufe', value: 17.5, tolerance: 0.01 },
        { label: 'Auftrittstiefe', value: 21.33, tolerance: 0.05 },
        { label: 'Schrittmaß (2×Steigung + Auftritt)', value: 56.33, tolerance: 0.05 },
      ],
    },
    {
      values: { geschosshoehe: 270, lauflaenge: 350, wunschSteigung: 18 },
      expect: [
        { label: 'Anzahl Stufen', value: 15, tolerance: 0.01 },
        { label: 'Steigungshöhe je Stufe', value: 18, tolerance: 0.01 },
      ],
    },
  ],
};
