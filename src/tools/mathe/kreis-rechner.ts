import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'kreis-rechner',
  category: 'mathe',
  title: 'Kreis-Rechner – Fläche, Umfang und Durchmesser',
  shortTitle: 'Kreis-Rechner',
  description:
    'Berechne aus dem Radius eines Kreises die Fläche, den Umfang und den Durchmesser. Mit der Kreiszahl Pi und nachvollziehbaren Formeln für Schule und Alltag.',
  keywords: [
    'kreis berechnen',
    'kreisfläche berechnen',
    'kreisumfang berechnen',
    'fläche kreis formel',
    'umfang kreis radius',
    'durchmesser kreis',
    'kreis rechner online',
    'pi kreis berechnen',
  ],
  formula:
    'Fläche A = π · r² ; Umfang U = 2 · π · r ; Durchmesser d = 2 · r',
  intro:
    'Der Kreis-Rechner ermittelt aus dem Radius alle wichtigen Kreisgrößen. Die Fläche ergibt sich aus Pi mal Radius zum Quadrat, der Umfang aus zwei mal Pi mal Radius. Der Durchmesser ist schlicht der doppelte Radius. Alle Angaben gelten in derselben Längeneinheit wie die Eingabe.',
  inputs: [
    { type: 'number', id: 'r', label: 'Radius', default: 5, unit: 'cm', min: 0, step: 0.01, help: 'Abstand vom Mittelpunkt zum Rand.' },
  ],
  compute: (v) => {
    const r = Math.max(0, num(v.r));
    const flaeche = Math.PI * r * r;
    const umfang = 2 * Math.PI * r;
    const durchmesser = 2 * r;
    return [
      { label: 'Kreisfläche', value: flaeche, unit: 'Einheit²', digits: 4, primary: true },
      { label: 'Umfang', value: umfang, unit: 'Einheit', digits: 4 },
      { label: 'Durchmesser', value: durchmesser, unit: 'Einheit', digits: 4 },
    ];
  },
  howto: [
    'Miss den Radius des Kreises – den Abstand vom Mittelpunkt zum Rand.',
    'Gib den Radius in einer beliebigen Längeneinheit ein.',
    'Lies Fläche, Umfang und Durchmesser ab.',
    'Beachte: Die Fläche hat die quadrierte Einheit (z. B. cm²).',
  ],
  faq: [
    {
      q: 'Wie berechne ich die Fläche eines Kreises?',
      a: 'Mit der Formel A = π · r². Du quadrierst den Radius und multiplizierst ihn mit der Kreiszahl Pi (≈ 3,14159). Bei r = 5 ergibt das rund 78,54 Flächeneinheiten.',
    },
    {
      q: 'Wie berechne ich den Umfang eines Kreises?',
      a: 'Mit U = 2 · π · r. Du verdoppelst den Radius und multiplizierst mit Pi. Bei r = 5 sind das etwa 31,42 Längeneinheiten.',
    },
    {
      q: 'Ich kenne nur den Durchmesser – was tue ich?',
      a: 'Teile den Durchmesser durch 2, um den Radius zu erhalten, und gib diesen ein. Es gilt r = d / 2.',
    },
    {
      q: 'Welcher Wert wird für Pi verwendet?',
      a: 'Der Rechner nutzt die in JavaScript hinterlegte Kreiszahl mit voller Genauigkeit (etwa 3,14159265). In der Schule reicht oft die Näherung 3,14.',
    },
  ],
  related: ['dreieck-flaeche-rechner', 'quader-volumen-rechner', 'flaeche-umrechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { r: 5 },
      expect: [
        { label: 'Kreisfläche', value: 78.5398, tolerance: 0.01 },
        { label: 'Umfang', value: 31.4159, tolerance: 0.01 },
      ],
    },
  ],
};
