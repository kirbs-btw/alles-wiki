import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'vo2max-rechner',
  category: 'gesundheit',
  title: 'VO2max-Rechner (Cooper-Test)',
  shortTitle: 'VO2max',
  description:
    'Schätze deine maximale Sauerstoffaufnahme (VO2max) aus der im 12-Minuten-Cooper-Test gelaufenen Strecke – ein Maß für deine Ausdauerleistung.',
  keywords: [
    'vo2max rechner',
    'cooper test auswerten',
    'maximale sauerstoffaufnahme berechnen',
    'vo2max schaetzen',
    'ausdauer leistungsfaehigkeit',
    'cooper test vo2max',
  ],
  formula:
    'VO2max (ml/kg/min) = (Strecke in Metern − 504,9) / 44,73',
  inputs: [
    { type: 'number', id: 'strecke', label: 'Im Cooper-Test gelaufene Strecke', unit: 'm', default: 2600, min: 0, step: 10, help: 'Distanz in 12 Minuten Dauerlauf.' },
  ],
  compute: (v) => {
    const strecke = num(v.strecke);
    const vo2max = (strecke - 504.9) / 44.73;
    const vo2maxSafe = vo2max > 0 ? vo2max : 0;
    return [
      { label: 'VO2max', value: vo2maxSafe, unit: 'ml/kg/min', digits: 1, primary: true },
    ];
  },
  intro:
    'Die VO2max (maximale Sauerstoffaufnahme) gibt an, wie viel Sauerstoff dein Körper bei maximaler Belastung pro Kilogramm Körpergewicht und Minute aufnehmen und verwerten kann. Sie gilt als wichtigster Einzelwert für die Ausdauerleistungsfähigkeit. Der Cooper-Test (12 Minuten Dauerlauf) erlaubt eine einfache Schätzung. Sehr gute Werte liegen bei Männern oft über 50, bei Frauen über 45 ml/kg/min.',
  howto: [
    'Einen 12-minütigen Dauerlauf bei gleichmäßigem, maximal mögliches Tempo absolvieren.',
    'Die in 12 Minuten zurückgelegte Strecke in Metern messen.',
    'Strecke eingeben und die geschätzte VO2max ablesen.',
  ],
  faq: [
    { q: 'Was ist der Cooper-Test?', a: 'Beim Cooper-Test läufst du 12 Minuten lang so weit wie möglich. Aus der zurückgelegten Strecke wird die VO2max geschätzt. Der Test wurde 1968 von Kenneth Cooper entwickelt.' },
    { q: 'Welche VO2max ist gut?', a: 'Das hängt stark von Alter und Geschlecht ab. Für untrainierte Erwachsene liegen typische Werte bei 30 bis 40, gut trainierte Ausdauersportler erreichen 60 und mehr ml/kg/min.' },
    { q: 'Wie genau ist die Schätzung?', a: 'Der Cooper-Test liefert eine brauchbare Näherung, setzt aber eine gleichmäßige, maximale Ausbelastung voraus. Laborgestützte Spiroergometrie ist genauer.' },
  ],
  related: ['maximalpuls-rechner', 'trainingspuls-rechner', 'lauf-pace-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { strecke: 2600 },
      expect: [
        { label: 'VO2max', value: 46.84, tolerance: 0.1 },
      ],
    },
    {
      values: { strecke: 3000 },
      expect: [
        { label: 'VO2max', value: 55.78, tolerance: 0.1 },
      ],
    },
  ],
};
