import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'pq-formel-rechner',
  category: 'mathe',
  title: 'pq-Formel-Rechner – quadratische Gleichungen lösen',
  shortTitle: 'pq-Formel',
  description:
    'Löse quadratische Gleichungen der Form x² + px + q = 0 mit der pq-Formel. Mit Diskriminante, beiden Lösungen und Hinweis auf die Anzahl der Lösungen.',
  keywords: [
    'pq formel rechner',
    'quadratische gleichung lösen',
    'pq formel berechnen',
    'nullstellen quadratische gleichung',
    'diskriminante berechnen',
    'x quadrat plus px plus q',
  ],
  formula: 'x1,2 = -p/2 ± √((p/2)² - q) ; Diskriminante D = (p/2)² - q',
  intro:
    'Die pq-Formel löst quadratische Gleichungen in der Normalform x² + px + q = 0. Die Diskriminante D = (p/2)² − q entscheidet über die Anzahl der Lösungen: D > 0 ergibt zwei Lösungen, D = 0 genau eine, D < 0 keine reelle Lösung.',
  inputs: [
    { type: 'number', id: 'p', label: 'Koeffizient p', default: -5, step: 0.1, help: 'Vorfaktor von x in x² + p·x + q = 0.' },
    { type: 'number', id: 'q', label: 'Koeffizient q', default: 6, step: 0.1, help: 'Konstantes Glied in x² + p·x + q = 0.' },
  ],
  compute: (v) => {
    const p = num(v.p);
    const q = num(v.q);
    const halb = p / 2;
    const disk = halb * halb - q;
    let x1 = 0;
    let x2 = 0;
    let anzahl = 0;
    if (disk > 0) {
      const w = Math.sqrt(disk);
      x1 = -halb + w;
      x2 = -halb - w;
      anzahl = 2;
    } else if (disk === 0) {
      x1 = -halb;
      x2 = -halb;
      anzahl = 1;
    } else {
      anzahl = 0;
    }
    return [
      { label: 'Lösung x1', value: anzahl > 0 ? x1 : 'keine reelle Lösung', digits: 4, primary: true },
      { label: 'Lösung x2', value: anzahl === 2 ? x2 : anzahl === 1 ? x1 : 'keine reelle Lösung', digits: 4 },
      { label: 'Diskriminante', value: disk, digits: 4, help: 'Term unter der Wurzel: (p/2)² − q.' },
      { label: 'Anzahl Lösungen', value: anzahl, digits: 0 },
    ];
  },
  howto: [
    'Bringe die Gleichung in die Form x² + p·x + q = 0.',
    'Trage p (Vorfaktor von x) und q (konstantes Glied) ein.',
    'Lies die Lösungen x1 und x2 ab.',
    'Die Diskriminante zeigt, ob es zwei, eine oder keine reelle Lösung gibt.',
  ],
  faq: [
    {
      q: 'Wann darf ich die pq-Formel anwenden?',
      a: 'Wenn die Gleichung in der Normalform x² + p·x + q = 0 vorliegt, der Vorfaktor von x² also 1 ist. Andernfalls vorher durch diesen Vorfaktor teilen.',
    },
    {
      q: 'Was bedeutet die Diskriminante?',
      a: 'Sie ist der Term (p/2)² − q unter der Wurzel. Ist sie positiv, gibt es zwei Lösungen, ist sie null, eine doppelte Lösung, ist sie negativ, keine reelle Lösung.',
    },
    {
      q: 'Was ist der Unterschied zur abc-Formel?',
      a: 'Die abc-Formel (Mitternachtsformel) arbeitet mit a·x² + b·x + c = 0. Die pq-Formel setzt a = 1 voraus und ist dadurch kompakter.',
    },
  ],
  related: ['wurzelrechner', 'potenzrechner', 'satz-des-pythagoras-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { p: -5, q: 6 },
      expect: [
        { label: 'Lösung x1', value: 3, tolerance: 0.0001 },
        { label: 'Diskriminante', value: 0.25, tolerance: 0.0001 },
        { label: 'Anzahl Lösungen', value: 2, tolerance: 0 },
      ],
    },
    {
      values: { p: -4, q: 4 },
      expect: [
        { label: 'Lösung x1', value: 2, tolerance: 0.0001 },
        { label: 'Anzahl Lösungen', value: 1, tolerance: 0 },
      ],
    },
  ],
};
