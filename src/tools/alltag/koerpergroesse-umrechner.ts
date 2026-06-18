import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

/**
 * Körpergröße zwischen Zentimetern und dem angloamerikanischen Fuß/Zoll-System.
 * 1 Zoll (inch) = 2,54 cm, 1 Fuß (foot) = 12 Zoll = 30,48 cm.
 */
const CM_PRO_ZOLL = 2.54;
const ZOLL_PRO_FUSS = 12;

export const tool: Tool = {
  slug: 'koerpergroesse-umrechner',
  category: 'alltag',
  title: 'Körpergröße-Umrechner (cm in Fuß und Zoll)',
  shortTitle: 'Größe in Fuß',
  description:
    'Rechne deine Körpergröße zwischen Zentimetern und dem angloamerikanischen Fuß-und-Zoll-System um – inklusive Gesamtzoll und Meter-Anzeige.',
  keywords: [
    'koerpergroesse umrechnen',
    'cm in fuss zoll',
    'feet inches in cm',
    'groesse in feet umrechnen',
    'cm in fuss',
    'zoll in cm',
  ],
  formula: 'Zoll gesamt = cm / 2,54; Fuß = ganzzahliger Teil von (Zoll / 12); Rest-Zoll = Zoll gesamt − Fuß × 12',
  inputs: [
    {
      type: 'number',
      id: 'cm',
      label: 'Körpergröße',
      unit: 'cm',
      default: 180,
      min: 50,
      max: 250,
      step: 1,
    },
  ],
  compute: (v) => {
    const cm = num(v.cm, 180);
    const zollGesamt = cm / CM_PRO_ZOLL;
    const fuss = Math.floor(zollGesamt / ZOLL_PRO_FUSS);
    const restZoll = zollGesamt - fuss * ZOLL_PRO_FUSS;
    return [
      { label: 'Fuß', value: fuss, unit: 'ft', digits: 0, primary: true },
      { label: 'Zoll', value: restZoll, unit: 'in', digits: 1 },
      { label: 'Zoll gesamt', value: zollGesamt, unit: 'in', digits: 1 },
      { label: 'Meter', value: cm / 100, unit: 'm', digits: 2 },
    ];
  },
  intro:
    'Im englischsprachigen Raum wird die Körpergröße in Fuß (feet) und Zoll (inches) angegeben – etwa "5 ft 11 in". Dieser Rechner wandelt deine Größe in Zentimetern exakt um: Ein Zoll sind 2,54 cm, ein Fuß sind 12 Zoll bzw. 30,48 cm.',
  howto: [
    'Gib deine Körpergröße in Zentimetern ein.',
    'Lies das Ergebnis als Fuß plus Rest-Zoll ab (z. B. 5 ft 11 in).',
    'Den Gesamtwert in Zoll findest du zusätzlich, etwa für Online-Formulare.',
  ],
  faq: [
    { q: 'Wie viel cm ist 6 Fuß?', a: '6 Fuß sind 6 × 30,48 cm = 182,88 cm, also rund 183 cm.' },
    { q: 'Was ist genau ein Zoll?', a: 'Ein Zoll (inch) ist exakt als 2,54 cm definiert. Zwölf Zoll ergeben einen Fuß.' },
    { q: 'Warum steht beim Zoll eine Nachkommastelle?', a: 'Da nicht jede cm-Angabe exakt auf volle Zoll fällt, wird der Rest-Zoll mit einer Nachkommastelle gezeigt. Im Alltag rundet man meist auf ganze oder halbe Zoll.' },
  ],
  related: ['laenge-umrechner', 'schuhgroessen-umrechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { cm: 180 },
      // 180/2.54 = 70.866 in; fuss = floor(70.866/12)=5; rest = 70.866-60 = 10.866
      expect: [
        { label: 'Fuß', value: 5, tolerance: 0 },
        { label: 'Zoll', value: 10.87, tolerance: 0.05 },
        { label: 'Zoll gesamt', value: 70.87, tolerance: 0.05 },
      ],
    },
    {
      values: { cm: 152.4 },
      // 152.4/2.54 = 60 in -> 5 ft 0 in
      expect: [
        { label: 'Fuß', value: 5, tolerance: 0 },
        { label: 'Zoll', value: 0, tolerance: 0.05 },
      ],
    },
  ],
};
