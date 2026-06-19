import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'zucker-tageslimit-rechner',
  category: 'gesundheit',
  title: 'Zucker-Tageslimit-Rechner (WHO)',
  shortTitle: 'Zucker-Limit',
  description:
    'Berechne dein tägliches Zuckerlimit nach WHO aus deinem Kalorienbedarf – in Gramm freiem Zucker und umgerechnet in Stück Würfelzucker.',
  keywords: [
    'zucker tageslimit',
    'wie viel zucker am tag',
    'who zuckerempfehlung',
    'freier zucker rechner',
    'maximale zuckermenge gramm',
    'zucker pro tag erlaubt',
  ],
  formula: 'Limit(g) = Kalorienbedarf × Anteil ÷ 4 kcal/g (10 % normal, 5 % ideal)',
  inputs: [
    { type: 'number', id: 'kcal', label: 'Täglicher Kalorienbedarf', unit: 'kcal', default: 2000, min: 500, step: 50 },
    {
      type: 'select', id: 'anteil', label: 'WHO-Empfehlung', default: '0.10',
      options: [
        { value: '0.10', label: 'Obergrenze: 10 % der Energie' },
        { value: '0.05', label: 'Idealwert: 5 % der Energie' },
      ],
      help: 'Bezieht sich auf freien Zucker (zugesetzt + in Säften/Honig).',
    },
  ],
  compute: (v) => {
    const kcal = num(v.kcal);
    const anteil = num(v.anteil, 0.1);
    // 1 g Zucker liefert 4 kcal; 1 Stück Würfelzucker ~ 3 g
    const gramm = (kcal * anteil) / 4;
    const wuerfel = gramm / 3;
    const kcalAusZucker = gramm * 4;
    return [
      { label: 'Maximale Zuckermenge', value: gramm, unit: 'g', digits: 1, primary: true },
      { label: 'Entspricht Würfelzucker', value: wuerfel, unit: 'Stück', digits: 1, help: '1 Stück ≈ 3 g' },
      { label: 'Energie aus Zucker', value: kcalAusZucker, unit: 'kcal', digits: 0 },
    ];
  },
  intro:
    'Die Weltgesundheitsorganisation (WHO) empfiehlt, freie Zucker auf weniger als 10 Prozent der täglichen Energiezufuhr zu begrenzen. Eine weitere Senkung auf unter 5 Prozent bringt zusätzliche gesundheitliche Vorteile, etwa für die Zahngesundheit. „Freier Zucker" umfasst zugesetzten Zucker sowie Zucker in Honig, Sirup und Fruchtsäften – nicht jedoch den natürlich gebundenen Zucker in ganzen Früchten und Milch. Die Werte sind eine Orientierung (Stand 2026).',
  howto: [
    'Deinen täglichen Kalorienbedarf eingeben (Standard 2000 kcal).',
    'WHO-Empfehlung wählen: 10 % als Obergrenze oder 5 % als Idealwert.',
    'Maximale Zuckermenge in Gramm und als Würfelzucker ablesen.',
  ],
  faq: [
    { q: 'Wie viel Zucker am Tag ist erlaubt?', a: 'Bei 2000 kcal nennt die WHO als Obergrenze rund 50 g freien Zucker pro Tag (10 %). Ideal sind unter 25 g (5 %), das entspricht etwa acht Stück Würfelzucker.' },
    { q: 'Was zählt als freier Zucker?', a: 'Dazu gehören zugesetzter Zucker in Produkten sowie Zucker in Honig, Sirup, Fruchtsäften und Konzentraten. Der natürliche Zucker in ganzen Früchten, Gemüse und Milch zählt nicht dazu.' },
    { q: 'Warum sind 50 g schnell erreicht?', a: 'Eine Dose Cola (330 ml) enthält bereits rund 35 g Zucker. Auch Müsli, Joghurt, Ketchup und Fertigsoßen liefern oft viel verstecktes Zucker.' },
    { q: 'Gilt die Empfehlung auch für Kinder?', a: 'Für Kinder ist der Kalorienbedarf niedriger, daher ist die absolute Zuckermenge geringer. Gib hier einfach den kindgerechten Kalorienbedarf ein – die Empfehlung als prozentualer Anteil bleibt gleich.' },
  ],
  related: ['koffein-limit-rechner', 'kalorienbedarf-rechner', 'salz-tageslimit-rechner'],
  updated: '2026-06-19',
  examples: [
    {
      values: { kcal: 2000, anteil: '0.10' },
      expect: [
        { label: 'Maximale Zuckermenge', value: 50, tolerance: 0.1 },
        { label: 'Energie aus Zucker', value: 200, tolerance: 0.5 },
      ],
    },
    {
      values: { kcal: 2400, anteil: '0.05' },
      expect: [
        { label: 'Maximale Zuckermenge', value: 30, tolerance: 0.1 },
      ],
    },
  ],
};
