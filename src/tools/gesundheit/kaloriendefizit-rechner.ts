import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'kaloriendefizit-rechner',
  category: 'gesundheit',
  title: 'Kaloriendefizit-Rechner',
  shortTitle: 'Kaloriendefizit',
  description:
    'Berechne dein tägliches Kaloriendefizit aus Tagesbedarf und Kalorienzufuhr und schätze, wie viel Körperfett du pro Woche verlieren kannst.',
  keywords: [
    'kaloriendefizit rechner',
    'kaloriendefizit berechnen',
    'abnehmen kalorien',
    'defizit kalorien',
    'gewichtsverlust pro woche',
    'kalorien sparen',
  ],
  formula:
    'Defizit/Tag = Gesamtbedarf − Zufuhr; Fettverlust/Woche = Defizit×7 / 7000 (1 kg Fett ≈ 7000 kcal)',
  inputs: [
    { type: 'number', id: 'bedarf', label: 'Täglicher Gesamtbedarf', unit: 'kcal/Tag', default: 2400, min: 0, step: 10, help: 'Dein Gesamtumsatz (TDEE) inkl. Aktivität.' },
    { type: 'number', id: 'zufuhr', label: 'Tägliche Kalorienzufuhr', unit: 'kcal/Tag', default: 1900, min: 0, step: 10 },
  ],
  compute: (v) => {
    const bedarf = num(v.bedarf);
    const zufuhr = num(v.zufuhr);
    const defizit = bedarf - zufuhr;
    const proWoche = defizit * 7;
    const kgProWoche = proWoche / 7000;
    const prozent = bedarf > 0 ? (defizit / bedarf) * 100 : 0;
    return [
      { label: 'Kaloriendefizit pro Tag', value: defizit, unit: 'kcal/Tag', digits: 0, primary: true },
      { label: 'Defizit pro Woche', value: proWoche, unit: 'kcal', digits: 0 },
      { label: 'Geschätzter Fettverlust pro Woche', value: kgProWoche, unit: 'kg', digits: 2 },
      { label: 'Defizit in Prozent vom Bedarf', value: prozent, unit: '%', digits: 1 },
    ];
  },
  intro:
    'Ein Kaloriendefizit entsteht, wenn du weniger Energie zuführst, als dein Körper verbraucht. Es ist die Grundvoraussetzung für eine Gewichtsabnahme. Als Faustregel entsprechen rund 7000 kcal etwa einem Kilogramm Körperfett. Die Werte sind eine Orientierung – der tatsächliche Verlust hängt von Wasserhaushalt, Muskelmasse und Stoffwechsel ab.',
  howto: [
    'Deinen täglichen Gesamtbedarf (Gesamtumsatz) eingeben.',
    'Deine tatsächliche oder geplante Kalorienzufuhr eintragen.',
    'Tägliches Defizit und den geschätzten Fettverlust pro Woche ablesen.',
  ],
  faq: [
    { q: 'Wie groß sollte mein Kaloriendefizit sein?', a: 'Ein moderates Defizit von etwa 300 bis 500 kcal pro Tag (rund 10 bis 20 Prozent) gilt als gut verträglich. Sehr große Defizite können Muskelabbau und Heißhunger begünstigen.' },
    { q: 'Warum 7000 kcal pro Kilogramm?', a: 'Ein Kilogramm reines Körperfett liefert etwa 7000 Kilokalorien. Dieser Richtwert wird in der Praxis zur Abschätzung des Fettverlusts genutzt.' },
    { q: 'Warum nehme ich trotz Defizit nicht linear ab?', a: 'Wasserschwankungen, Glykogenspeicher und Anpassungen des Stoffwechsels führen dazu, dass das Gewicht in Wellen sinkt. Über mehrere Wochen betrachtet bildet sich der Trend deutlicher ab.' },
  ],
  related: ['kalorienbedarf-rechner', 'grundumsatz-rechner', 'wunschgewicht-dauer-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { bedarf: 2400, zufuhr: 1900 },
      expect: [
        { label: 'Kaloriendefizit pro Tag', value: 500, tolerance: 0.5 },
        { label: 'Geschätzter Fettverlust pro Woche', value: 0.5, tolerance: 0.01 },
      ],
    },
    {
      values: { bedarf: 2000, zufuhr: 1600 },
      expect: [
        { label: 'Defizit in Prozent vom Bedarf', value: 20, tolerance: 0.1 },
      ],
    },
  ],
};
