import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'eisenbedarf-rechner',
  category: 'gesundheit',
  title: 'Eisenbedarf-Rechner (pro Tag)',
  shortTitle: 'Eisenbedarf',
  description:
    'Ermittle deinen empfohlenen Eisenbedarf pro Tag nach den D-A-CH-Referenzwerten – je nach Personengruppe und mit Aufschlag für vegetarische Ernährung.',
  keywords: [
    'eisenbedarf rechner',
    'eisenbedarf pro tag',
    'täglicher eisenbedarf',
    'eisen tagesbedarf',
    'eisen empfehlung dge',
  ],
  formula: 'Bedarf = Referenzwert(Gruppe) × Faktor(vegetarisch ×1,8)',
  inputs: [
    {
      type: 'select', id: 'gruppe', label: 'Personengruppe', default: 'frau',
      options: [
        { value: 'mann', label: 'Mann (ab 19 J.)' },
        { value: 'frau', label: 'Frau (19–50 J.)' },
        { value: 'frau50', label: 'Frau (ab 51 J. / nach Menopause)' },
        { value: 'schwanger', label: 'Schwangere' },
        { value: 'stillend', label: 'Stillende' },
        { value: 'jugend', label: 'Jugendliche (13–19 J.)' },
      ],
    },
    {
      type: 'select', id: 'ernaehrung', label: 'Ernährungsweise', default: 'misch',
      options: [
        { value: 'misch', label: 'Mischkost' },
        { value: 'vegetarisch', label: 'Vegetarisch/vegan (×1,8)' },
      ],
    },
  ],
  compute: (v) => {
    const basis: Record<string, number> = {
      mann: 10,
      frau: 15,
      frau50: 10,
      schwanger: 30,
      stillend: 20,
      jugend: 12,
    };
    const ref = basis[String(v.gruppe)] ?? 10;
    const veg = String(v.ernaehrung) === 'vegetarisch';
    const faktor = veg ? 1.8 : 1;
    const bedarf = ref * faktor;
    return [
      { label: 'Empfohlener Eisenbedarf', value: bedarf, unit: 'mg/Tag', digits: 1, primary: true },
      { label: 'D-A-CH-Referenzwert (Mischkost)', value: ref, unit: 'mg/Tag', digits: 0 },
      { label: 'Aufschlag pflanzlich', value: veg ? 'ja (×1,8)' : 'nein' },
    ];
  },
  intro:
    'Eisen ist essenziell für den Sauerstofftransport im Blut. Der tägliche Bedarf unterscheidet sich stark nach Lebensphase und Geschlecht: Menstruierende Frauen sowie Schwangere haben einen deutlich höheren Bedarf. Dieser Rechner nutzt die D-A-CH-Referenzwerte (DGE) als Orientierung. Da Eisen aus pflanzlichen Quellen (Nicht-Häm-Eisen) schlechter aufgenommen wird, wird für vegetarische und vegane Ernährung ein Aufschlag um den Faktor 1,8 angesetzt. Die Werte sind Richtwerte (Stand 2026) und ersetzen keine ärztliche Beratung.',
  howto: [
    'Passende Personengruppe auswählen.',
    'Ernährungsweise angeben (Mischkost oder pflanzlich).',
    'Empfohlenen Eisenbedarf in Milligramm pro Tag ablesen.',
  ],
  faq: [
    { q: 'Warum brauchen Frauen mehr Eisen?', a: 'Durch die Menstruation gehen regelmäßig kleine Mengen Eisen verloren. Deshalb liegt der Referenzwert für Frauen im gebärfähigen Alter höher als für Männer (Stand 2026).' },
    { q: 'Warum der Faktor 1,8 bei pflanzlicher Ernährung?', a: 'Pflanzliches Nicht-Häm-Eisen wird vom Körper schlechter aufgenommen als Häm-Eisen aus Fleisch. Die DGE empfiehlt daher näherungsweise die rund 1,8-fache Zufuhr.' },
    { q: 'Was fördert die Eisenaufnahme?', a: 'Vitamin C (etwa aus Zitrusfrüchten oder Paprika) verbessert die Aufnahme von pflanzlichem Eisen. Kaffee, Tee und Milchprodukte zur Mahlzeit hemmen sie.' },
  ],
  related: ['salz-tageslimit-rechner', 'eiweissbedarf-rechner', 'wasserbedarf-rechner'],
  updated: '2026-06-19',
  examples: [
    {
      values: { gruppe: 'frau', ernaehrung: 'misch' },
      expect: [{ label: 'Empfohlener Eisenbedarf', value: 15, tolerance: 0.1 }],
    },
    {
      values: { gruppe: 'frau', ernaehrung: 'vegetarisch' },
      expect: [{ label: 'Empfohlener Eisenbedarf', value: 27, tolerance: 0.1 }],
    },
  ],
};
