import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'bremsweg-anhalteweg-rechner',
  category: 'auto',
  title: 'Bremsweg- & Anhalteweg-Rechner (Faustformel)',
  shortTitle: 'Bremsweg',
  description:
    'Berechne Reaktionsweg, Bremsweg und Anhalteweg nach den Fahrschul-Faustformeln – auch für Gefahrenbremsung mit halbiertem Bremsweg.',
  keywords: [
    'bremsweg berechnen faustformel',
    'anhalteweg rechner',
    'reaktionsweg berechnen',
    'bremsweg formel',
    'anhalteweg faustformel',
    'gefahrenbremsung bremsweg',
    'bremsweg geschwindigkeit',
  ],
  formula: 'Reaktionsweg = (v/10)×3; Bremsweg = (v/10)²; Anhalteweg = Reaktionsweg + Bremsweg',
  inputs: [
    { type: 'number', id: 'tempo', label: 'Geschwindigkeit', unit: 'km/h', default: 50, min: 0, step: 1 },
    {
      type: 'select', id: 'bremsung', label: 'Art der Bremsung', default: 'normal',
      options: [
        { value: 'normal', label: 'Normale Bremsung' },
        { value: 'gefahr', label: 'Gefahrenbremsung (Bremsweg halbiert)' },
      ],
      help: 'Bei einer Vollbremsung halbiert sich der Bremsweg.',
    },
    { type: 'number', id: 'reaktion', label: 'Reaktionszeit', unit: 's', default: 1, min: 0, step: 0.1, help: 'Faustformel rechnet mit 1 Sekunde.' },
  ],
  compute: (v) => {
    const tempo = num(v.tempo);
    const bremsung = String(v.bremsung || 'normal');
    const reaktion = num(v.reaktion, 1);
    // Faustformel: Reaktionsweg = (v/10) × 3 m gilt für 1 s Reaktionszeit
    const reaktionsweg = (tempo / 10) * 3 * reaktion;
    let bremsweg = Math.pow(tempo / 10, 2);
    if (bremsung === 'gefahr') bremsweg = bremsweg / 2;
    const anhalteweg = reaktionsweg + bremsweg;
    return [
      { label: 'Anhalteweg', value: anhalteweg, unit: 'm', digits: 1, primary: true },
      { label: 'Reaktionsweg', value: reaktionsweg, unit: 'm', digits: 1 },
      { label: 'Bremsweg', value: bremsweg, unit: 'm', digits: 1 },
    ];
  },
  intro:
    'Die Fahrschul-Faustformeln schätzen den Anhalteweg auf trockener Straße ab. Der Reaktionsweg ist die Strecke, die du noch fährst, bis du bremst (rund 1 Sekunde Reaktionszeit). Der Bremsweg ist die Strecke vom Bremsbeginn bis zum Stillstand. Bei einer Gefahren- bzw. Vollbremsung halbiert sich der Bremsweg.',
  howto: [
    'Geschwindigkeit in km/h eintragen.',
    'Art der Bremsung wählen: normal oder Gefahrenbremsung.',
    'Reaktionszeit anpassen – die Faustformel rechnet mit 1 Sekunde.',
    'Ergebnis als Orientierung für den Sicherheitsabstand nutzen.',
  ],
  faq: [
    { q: 'Wie lauten die Faustformeln?', a: 'Reaktionsweg = (Tempo/10) × 3, Bremsweg = (Tempo/10)², Anhalteweg = Reaktionsweg + Bremsweg. Bei Gefahrenbremsung wird der Bremsweg halbiert.' },
    { q: 'Gelten die Werte bei Nässe?', a: 'Nein, die Faustformeln gelten für trockene Fahrbahn. Bei Nässe, Schnee oder Glätte verlängert sich der Bremsweg deutlich.' },
    { q: 'Wie groß sollte der Sicherheitsabstand sein?', a: 'Innerorts grob der Reaktionsweg, außerorts mindestens „halber Tacho" in Metern als Abstand zum Vordermann.' },
    { q: 'Warum halbiert sich der Bremsweg bei Gefahr?', a: 'Bei einer Vollbremsung wirkt die maximale Bremskraft. Die Faustformel bildet das näherungsweise durch Halbieren des normalen Bremswegs ab.' },
  ],
  related: ['ueberholweg-rechner', 'beschleunigung-rechner', 'fahrzeit-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { tempo: 50, bremsung: 'normal', reaktion: 1 },
      expect: [{ label: 'Anhalteweg', value: 40, tolerance: 0.1 }],
    },
    {
      values: { tempo: 100, bremsung: 'gefahr', reaktion: 1 },
      expect: [{ label: 'Bremsweg', value: 50, tolerance: 0.1 }],
    },
  ],
};
