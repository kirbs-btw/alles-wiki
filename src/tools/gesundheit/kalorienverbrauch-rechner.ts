import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'kalorienverbrauch-rechner',
  category: 'gesundheit',
  title: 'Kalorienverbrauch-Rechner (Sport, MET)',
  shortTitle: 'Kalorienverbrauch',
  description:
    'Berechne deinen Kalorienverbrauch beim Sport mit MET-Werten aus Sportart, Gewicht und Dauer – wie viele Kalorien Joggen, Radfahren oder Schwimmen verbrennen.',
  keywords: [
    'kalorienverbrauch rechner',
    'kalorienverbrauch sport',
    'kalorien joggen',
    'kalorienverbrauch radfahren',
    'met wert kalorien',
    'kalorien verbrennen',
    'kalorienverbrauch schwimmen',
  ],
  formula: 'Kalorien = MET × 3,5 × Gewicht(kg) / 200 × Dauer(min)',
  inputs: [
    {
      type: 'select', id: 'sportart', label: 'Aktivität', default: '7',
      options: [
        { value: '3', label: 'Spazieren / langsames Gehen (MET 3,0)' },
        { value: '4.3', label: 'Zügiges Gehen (MET 4,3)' },
        { value: '7', label: 'Joggen, ca. 8 km/h (MET 7,0)' },
        { value: '9.8', label: 'Laufen, ca. 10 km/h (MET 9,8)' },
        { value: '6.8', label: 'Radfahren, ca. 20 km/h (MET 6,8)' },
        { value: '8', label: 'Schwimmen, moderat (MET 8,0)' },
        { value: '5', label: 'Krafttraining, moderat (MET 5,0)' },
        { value: '7.3', label: 'Aerobic / HIIT (MET 7,3)' },
        { value: '4.8', label: 'Yoga, kräftig (MET 4,0–4,8)' },
        { value: '5.5', label: 'Fußball, Freizeit (MET 7,0)' },
        { value: '4', label: 'Wandern, ebenes Gelände (MET 4,0)' },
        { value: '3.5', label: 'Hausarbeit / Putzen (MET 3,5)' },
      ],
    },
    { type: 'number', id: 'gewicht', label: 'Körpergewicht', unit: 'kg', default: 75, min: 1, step: 0.5 },
    { type: 'number', id: 'dauer', label: 'Dauer', unit: 'min', default: 30, min: 0, step: 1 },
  ],
  compute: (v) => {
    const met = num(v.sportart, 7);
    const g = num(v.gewicht);
    const min = num(v.dauer);
    // kcal = MET × 3,5 × kg / 200 pro Minute
    const proMinute = (met * 3.5 * g) / 200;
    const gesamt = proMinute * min;
    const proStunde = proMinute * 60;
    return [
      { label: 'Verbrauchte Kalorien', value: gesamt, unit: 'kcal', digits: 0, primary: true },
      { label: 'Verbrauch pro Stunde', value: proStunde, unit: 'kcal/h', digits: 0 },
      { label: 'Verbrauch pro Minute', value: proMinute, unit: 'kcal/min', digits: 1 },
    ];
  },
  intro:
    'Der Kalorienverbrauch-Rechner schätzt, wie viele Kalorien du bei einer sportlichen Aktivität verbrennst. Grundlage sind MET-Werte (Metabolisches Äquivalent), die den Energieaufwand einer Tätigkeit im Vergleich zur Ruhe angeben. Ein MET-Wert von 7 bedeutet beispielsweise das Siebenfache des Ruheverbrauchs. Schwerere Personen verbrennen bei gleicher Aktivität mehr Kalorien.',
  howto: [
    'Sportart bzw. Aktivität aus der Liste wählen.',
    'Körpergewicht in Kilogramm eingeben.',
    'Dauer der Aktivität in Minuten eingeben.',
    'Geschätzten Kalorienverbrauch ablesen.',
  ],
  faq: [
    { q: 'Was ist ein MET-Wert?', a: 'MET steht für Metabolisches Äquivalent. 1 MET entspricht dem Energieverbrauch in völliger Ruhe (ca. 1 kcal pro kg und Stunde). Eine Aktivität mit 7 MET verbraucht das Siebenfache.' },
    { q: 'Wie genau ist die MET-Methode?', a: 'Die MET-Formel liefert solide Durchschnittswerte. Der tatsächliche Verbrauch hängt von Intensität, Technik, Fitnesslevel und Trainingszustand ab und kann abweichen.' },
    { q: 'Verbrennen schwerere Menschen mehr Kalorien?', a: 'Ja. Da der Verbrauch direkt vom Körpergewicht abhängt, verbrennt eine schwerere Person bei gleicher Aktivität und Dauer mehr Kalorien als eine leichtere.' },
    { q: 'Ist im Verbrauch schon der Grundumsatz enthalten?', a: 'Die MET-Formel rechnet den gesamten Energieverbrauch während der Aktivität, also inklusive des Ruheanteils. Für den reinen Mehrverbrauch durch Sport müsstest du den Ruheanteil abziehen.' },
  ],
  related: ['kalorienbedarf-rechner', 'grundumsatz-rechner', 'wasserbedarf-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { sportart: '7', gewicht: 75, dauer: 30 },
      expect: [
        { label: 'Verbrauchte Kalorien', value: 276, tolerance: 1 },
        { label: 'Verbrauch pro Stunde', value: 551, tolerance: 1 },
      ],
    },
  ],
};
