import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'koffein-limit-rechner',
  category: 'gesundheit',
  title: 'Koffein-Tageslimit-Rechner',
  shortTitle: 'Koffein-Limit',
  description:
    'Berechne dein persönliches Koffein-Tageslimit nach Körpergewicht und sieh, wie viele Tassen Kaffee oder Dosen Energydrink das bedeuten.',
  keywords: [
    'koffein tageslimit',
    'wie viel koffein am tag',
    'koffein pro kg körpergewicht',
    'koffein rechner',
    'maximale koffeinmenge',
    'koffein limit kaffee',
  ],
  formula: 'Tageslimit ≈ 5,7 mg × Körpergewicht(kg); Einzeldosis ≈ 3 mg × kg',
  inputs: [
    { type: 'number', id: 'gewicht', label: 'Körpergewicht', unit: 'kg', default: 70, min: 1, step: 0.5 },
    {
      type: 'select', id: 'getraenk', label: 'Vergleichsgetränk', default: '95',
      options: [
        { value: '80', label: 'Tasse Filterkaffee (~80 mg)' },
        { value: '95', label: 'Tasse Kaffee, stark (~95 mg)' },
        { value: '63', label: 'Espresso, einfach (~63 mg)' },
        { value: '47', label: 'Tasse schwarzer Tee (~47 mg)' },
        { value: '80', label: 'Energydrink 250 ml (~80 mg)' },
        { value: '32', label: 'Cola 330 ml (~32 mg)' },
      ],
      help: 'Bestimmt, in wie viele Portionen das Limit umgerechnet wird.',
    },
  ],
  compute: (v) => {
    const kg = num(v.gewicht);
    const proPortion = num(v.getraenk, 95);
    // EFSA: 5,7 mg/kg unbedenklich pro Tag, 3 mg/kg pro Einzeldosis (gesunde Erwachsene)
    const tag = kg * 5.7;
    const einzel = kg * 3;
    const portionen = proPortion > 0 ? tag / proPortion : 0;
    return [
      { label: 'Empfohlenes Tageslimit', value: tag, unit: 'mg', digits: 0, primary: true },
      { label: 'Unbedenkliche Einzeldosis', value: einzel, unit: 'mg', digits: 0 },
      { label: 'Entspricht etwa Portionen/Tag', value: portionen, unit: 'Portionen', digits: 1 },
    ];
  },
  intro:
    'Die Europäische Behörde für Lebensmittelsicherheit (EFSA) stuft für gesunde Erwachsene eine tägliche Koffeinmenge bis etwa 5,7 mg pro Kilogramm Körpergewicht (rund 400 mg) als unbedenklich ein, eine Einzeldosis bis etwa 3 mg/kg (rund 200 mg). Schwangere sollten 200 mg pro Tag nicht überschreiten. Dieser Rechner ist eine Orientierung (Stand 2026) und ersetzt keine ärztliche Beratung.',
  howto: [
    'Körpergewicht in Kilogramm eingeben.',
    'Vergleichsgetränk auswählen.',
    'Tageslimit, unbedenkliche Einzeldosis und die Portionenzahl ablesen.',
  ],
  faq: [
    { q: 'Wie viel Koffein ist pro Tag unbedenklich?', a: 'Die EFSA nennt für gesunde Erwachsene rund 400 mg pro Tag bzw. etwa 5,7 mg pro kg Körpergewicht. Das entspricht grob vier bis fünf Tassen Kaffee.' },
    { q: 'Gilt das Limit auch für Schwangere?', a: 'Nein. Für Schwangere und Stillende empfiehlt die EFSA maximal 200 mg Koffein pro Tag. Dieser Rechner bildet die Werte für gesunde Erwachsene ab.' },
    { q: 'Warum eine Grenze pro Einzeldosis?', a: 'Eine große Menge Koffein auf einmal (ab etwa 3 mg/kg) kann Herzrasen, Unruhe und Schlafstörungen auslösen. Verteiltes Trinken über den Tag ist verträglicher.' },
    { q: 'Wie viel Koffein steckt in den Getränken?', a: 'Die Werte schwanken stark. Eine Tasse Kaffee enthält je nach Stärke etwa 80 bis 100 mg, ein Espresso rund 60 mg, ein Energydrink (250 ml) etwa 80 mg.' },
  ],
  related: ['wasserbedarf-rechner', 'zucker-tageslimit-rechner', 'kalorienbedarf-rechner'],
  updated: '2026-06-19',
  examples: [
    {
      values: { gewicht: 70, getraenk: '95' },
      expect: [
        { label: 'Empfohlenes Tageslimit', value: 399, tolerance: 0.5 },
        { label: 'Unbedenkliche Einzeldosis', value: 210, tolerance: 0.5 },
      ],
    },
    {
      values: { gewicht: 60, getraenk: '80' },
      expect: [
        { label: 'Empfohlenes Tageslimit', value: 342, tolerance: 0.5 },
      ],
    },
  ],
};
