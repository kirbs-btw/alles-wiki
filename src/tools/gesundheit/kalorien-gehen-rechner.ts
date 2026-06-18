import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'kalorien-gehen-rechner',
  category: 'gesundheit',
  title: 'Kalorienverbrauch beim Gehen-Rechner',
  shortTitle: 'Kalorien Gehen',
  description:
    'Schätze, wie viele Kalorien du beim Gehen oder Spazieren verbrauchst – aus Gewicht, Gehdauer und Geschwindigkeit über den MET-Wert.',
  keywords: [
    'kalorienverbrauch gehen',
    'kalorien spazieren rechner',
    'kalorien beim gehen berechnen',
    'kalorienverbrauch walking',
    'kalorien zu fuss',
    'met gehen kalorien',
  ],
  formula:
    'kcal = MET × Gewicht(kg) × Dauer(h); MET steigt mit der Gehgeschwindigkeit',
  inputs: [
    { type: 'number', id: 'gewicht', label: 'Körpergewicht', unit: 'kg', default: 75, min: 1, step: 0.1 },
    { type: 'number', id: 'dauer', label: 'Gehdauer', unit: 'min', default: 60, min: 0, step: 5 },
    {
      type: 'select', id: 'tempo', label: 'Gehgeschwindigkeit', default: 'normal',
      options: [
        { value: 'langsam', label: 'Langsam (ca. 3 km/h) – MET 2,8' },
        { value: 'normal', label: 'Normal (ca. 4–5 km/h) – MET 3,5' },
        { value: 'zuegig', label: 'Zügig (ca. 5,5 km/h) – MET 4,3' },
        { value: 'schnell', label: 'Schnell/Walking (ca. 6,5 km/h) – MET 5,0' },
      ],
    },
  ],
  compute: (v) => {
    const gewicht = num(v.gewicht);
    const dauerH = num(v.dauer) / 60;
    const tempo = String(v.tempo);
    const metMap: Record<string, number> = { langsam: 2.8, normal: 3.5, zuegig: 4.3, schnell: 5.0 };
    const met = metMap[tempo] ?? 3.5;
    const kcal = met * gewicht * dauerH;
    const proStunde = met * gewicht;
    return [
      { label: 'Kalorienverbrauch', value: kcal, unit: 'kcal', digits: 0, primary: true },
      { label: 'Verbrauch pro Stunde', value: proStunde, unit: 'kcal/h', digits: 0 },
      { label: 'MET-Wert', value: met, unit: 'MET', digits: 1 },
    ];
  },
  intro:
    'Gehen ist eine der einfachsten Möglichkeiten, Kalorien zu verbrennen. Der Verbrauch hängt vor allem von Körpergewicht, Dauer und Tempo ab. Dieser Rechner nutzt MET-Werte (metabolisches Äquivalent) aus dem Compendium of Physical Activities. Die Ergebnisse sind Schätzwerte; der reale Verbrauch variiert je nach Untergrund, Steigung und Fitness.',
  howto: [
    'Körpergewicht in Kilogramm eingeben.',
    'Gehdauer in Minuten eintragen.',
    'Gehgeschwindigkeit auswählen.',
    'Geschätzten Kalorienverbrauch ablesen.',
  ],
  faq: [
    { q: 'Was ist ein MET-Wert?', a: 'Ein MET (metabolisches Äquivalent) ist der Energieumsatz pro Kilogramm Körpergewicht und Stunde in Ruhe. Eine Aktivität mit 3,5 MET verbraucht das 3,5-Fache des Ruheumsatzes.' },
    { q: 'Verbrenne ich beim Bergaufgehen mehr?', a: 'Ja, deutlich. Steigungen und Treppen erhöhen den MET-Wert und damit den Kalorienverbrauch spürbar. Der Rechner geht von ebenem Untergrund aus.' },
    { q: 'Wie genau ist die Schätzung?', a: 'Sie liefert eine gute Orientierung. Individuelle Faktoren wie Effizienz des Gangs, Muskelanteil und Tagesform können das Ergebnis nach oben oder unten verschieben.' },
  ],
  related: ['kalorienverbrauch-rechner', 'schritte-in-km-rechner', 'lauf-pace-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { gewicht: 75, dauer: 60, tempo: 'normal' },
      expect: [
        { label: 'Kalorienverbrauch', value: 262.5, tolerance: 1 },
        { label: 'Verbrauch pro Stunde', value: 262.5, tolerance: 1 },
      ],
    },
    {
      values: { gewicht: 80, dauer: 30, tempo: 'zuegig' },
      expect: [
        { label: 'Kalorienverbrauch', value: 172, tolerance: 1 },
      ],
    },
  ],
};
