import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'schuhgroessen-umrechner',
  category: 'alltag',
  title: 'Schuhgrößen-Umrechner (EU, US, UK)',
  shortTitle: 'Schuhgrößen',
  description:
    'Rechne deine Schuhgröße zwischen EU, US und UK um – auf Basis der Fußlänge und der gängigen Größensysteme. Inklusive empfohlener Fußlänge in cm.',
  keywords: [
    'schuhgroessen umrechnen',
    'schuhgroesse eu us uk',
    'fusslaenge schuhgroesse',
    'us groesse in eu',
    'uk groesse umrechnen',
    'schuhgroessen tabelle',
  ],
  formula:
    'EU = Fußlänge(cm) × 1,5 + 1,5 (gerundet auf 0,5); UK = EU/3 − 24/3 (Näherung); US Herren = UK + 1',
  inputs: [
    {
      type: 'number',
      id: 'fusslaenge',
      label: 'Fußlänge',
      unit: 'cm',
      default: 26,
      min: 15,
      max: 35,
      step: 0.5,
      help: 'Längster Punkt von Ferse bis Großzehe, am besten abends messen.',
    },
    {
      type: 'select',
      id: 'geschlecht',
      label: 'US/UK-System',
      default: 'herren',
      options: [
        { value: 'herren', label: 'Herren' },
        { value: 'damen', label: 'Damen' },
      ],
      help: 'Damen-US-Größen liegen meist 1,5 Nummern über Herren.',
    },
  ],
  compute: (v) => {
    const fl = num(v.fusslaenge, 26);
    const geschlecht = String(v.geschlecht || 'herren');
    // EU (Pariser Stich): Innenlänge = Fußlänge + ~1,5 cm Zugabe, 1 Stich = 2/3 cm
    const innen = fl + 1.5;
    const euRaw = innen / (2 / 3);
    const eu = Math.round(euRaw * 2) / 2;
    // UK: EU ≈ UK × (2/3) × ... vereinfachte Näherung: UK = (EU - 23) / (4/3) ... gängige Tabelle
    const ukRaw = eu * 0.66 - 25;
    const uk = Math.round(ukRaw * 2) / 2;
    const usHerren = uk + 1;
    const us = geschlecht === 'damen' ? usHerren + 1.5 : usHerren;
    return [
      { label: 'EU-Größe', value: eu, unit: '', digits: 1, primary: true },
      { label: 'UK-Größe', value: uk, unit: '', digits: 1 },
      { label: 'US-Größe', value: us, unit: '', digits: 1 },
      { label: 'Empf. Innenlänge', value: innen, unit: 'cm', digits: 1, help: 'Fußlänge plus ca. 1,5 cm Bewegungsspielraum.' },
    ];
  },
  intro:
    'Schuhgrößen sind international uneinheitlich: Die EU-Größe basiert auf dem Pariser Stich (2/3 cm), US und UK auf dem Barleycorn (1/3 Zoll). Dieser Rechner nutzt deine gemessene Fußlänge als verlässliche Grundlage und gibt die passenden EU-, US- und UK-Größen als Orientierung aus. Die Werte sind Näherungen – Marken weichen oft leicht ab.',
  howto: [
    'Stelle dich mit dem Fuß auf ein Blatt Papier und zeichne Ferse und längste Zehe an.',
    'Miss den Abstand in Zentimetern und trage ihn ein.',
    'Wähle, ob Herren- oder Damen-Größen ausgegeben werden sollen.',
    'Lies EU-, UK- und US-Größe ab und runde im Zweifel zur größeren Nummer.',
  ],
  faq: [
    { q: 'Warum messe ich am besten abends?', a: 'Füße werden im Tagesverlauf etwas größer. Wer abends misst, wählt eher eine Größe, die auch nachmittags noch passt.' },
    { q: 'Sind die Größen exakt?', a: 'Nein. Schuhgrößen sind nicht streng genormt und unterscheiden sich je nach Hersteller. Die Fußlänge in cm ist die zuverlässigste Angabe.' },
    { q: 'Wie viel Zugabe brauche ich?', a: 'Etwa 1 bis 1,5 cm über die reine Fußlänge hinaus, damit die Zehen beim Abrollen Platz haben.' },
  ],
  related: ['konfektionsgroessen-umrechner', 'ringgroessen-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { fusslaenge: 26, geschlecht: 'herren' },
      expect: [
        { label: 'EU-Größe', value: 41.5, tolerance: 0.6 },
        { label: 'Empf. Innenlänge', value: 27.5, tolerance: 0.1 },
      ],
    },
    {
      values: { fusslaenge: 24, geschlecht: 'damen' },
      expect: [
        { label: 'EU-Größe', value: 38.5, tolerance: 0.6 },
      ],
    },
  ],
};
