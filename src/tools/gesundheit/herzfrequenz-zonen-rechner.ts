import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'herzfrequenz-zonen-rechner',
  category: 'gesundheit',
  title: 'Herzfrequenz-Zonen-Rechner',
  shortTitle: 'HF-Zonen',
  description:
    'Berechne deine fünf Trainingszonen in Schlägen pro Minute als Prozentbereiche deines Maximalpulses – von Regeneration bis Maximalbereich.',
  keywords: [
    'herzfrequenz zonen rechner',
    'trainingszonen berechnen',
    'puls zonen rechner',
    'herzfrequenzbereiche',
    'fettverbrennungszone puls',
    'hf zonen maximalpuls',
  ],
  formula:
    'Zone = Anteil% × Maximalpuls; Zone 1: 50–60 %, Zone 2: 60–70 %, Zone 3: 70–80 %, Zone 4: 80–90 %, Zone 5: 90–100 %',
  inputs: [
    { type: 'number', id: 'maxpuls', label: 'Maximalpuls', unit: 'Schläge/min', default: 190, min: 100, max: 230, step: 1, help: 'Aus Belastungstest oder Maximalpuls-Rechner.' },
  ],
  compute: (v) => {
    const max = num(v.maxpuls);
    return [
      { label: 'Zone 1 (Regeneration) untere Grenze', value: 0.5 * max, unit: 'Schläge/min', digits: 0 },
      { label: 'Zone 2 (Fettverbrennung) untere Grenze', value: 0.6 * max, unit: 'Schläge/min', digits: 0, primary: true },
      { label: 'Zone 3 (Aerob/GA2) untere Grenze', value: 0.7 * max, unit: 'Schläge/min', digits: 0 },
      { label: 'Zone 4 (anaerobe Schwelle) untere Grenze', value: 0.8 * max, unit: 'Schläge/min', digits: 0 },
      { label: 'Zone 5 (Maximalbereich) untere Grenze', value: 0.9 * max, unit: 'Schläge/min', digits: 0 },
    ];
  },
  intro:
    'Ausdauertraining wird häufig in fünf Herzfrequenzzonen eingeteilt, die jeweils einen prozentualen Bereich deines Maximalpulses abdecken. Jede Zone trainiert andere Eigenschaften – von der aktiven Erholung bis zur Spitzenleistung. Dieser Rechner zeigt die untere Grenze jeder Zone in Schlägen pro Minute. Die Werte basieren auf der einfachen Prozentmethode des Maximalpulses.',
  howto: [
    'Maximalpuls eingeben (aus Belastungstest oder Schätzformel).',
    'Untere Grenzen der fünf Zonen ablesen.',
    'Dein Training der passenden Zone zuordnen.',
  ],
  faq: [
    { q: 'In welcher Zone verbrenne ich am meisten Fett?', a: 'In der Zone 2 (etwa 60 bis 70 Prozent) ist der relative Fettanteil an der Energiebereitstellung hoch. Der absolute Verbrauch steigt jedoch auch in höheren Zonen.' },
    { q: 'Wofür ist Zone 3 und 4 gut?', a: 'Zone 3 verbessert die aerobe Ausdauer, Zone 4 trainiert die anaerobe Schwelle und steigert die Leistungsfähigkeit bei intensiver Belastung.' },
    { q: 'Soll ich immer nur in einer Zone trainieren?', a: 'Nein. Eine Mischung aus vielen lockeren Einheiten in Zone 1 und 2 sowie gezielten intensiven Reizen in Zone 4 und 5 (polarisiertes Training) gilt als besonders effektiv.' },
  ],
  related: ['maximalpuls-rechner', 'trainingspuls-rechner', 'kalorienverbrauch-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { maxpuls: 190 },
      expect: [
        { label: 'Zone 1 (Regeneration) untere Grenze', value: 95, tolerance: 0.5 },
        { label: 'Zone 2 (Fettverbrennung) untere Grenze', value: 114, tolerance: 0.5 },
        { label: 'Zone 5 (Maximalbereich) untere Grenze', value: 171, tolerance: 0.5 },
      ],
    },
    {
      values: { maxpuls: 180 },
      expect: [
        { label: 'Zone 3 (Aerob/GA2) untere Grenze', value: 126, tolerance: 0.5 },
        { label: 'Zone 4 (anaerobe Schwelle) untere Grenze', value: 144, tolerance: 0.5 },
      ],
    },
  ],
};
