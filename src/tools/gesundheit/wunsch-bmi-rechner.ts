import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'wunsch-bmi-rechner',
  category: 'gesundheit',
  title: 'Wunsch-BMI-Gewicht-Rechner',
  shortTitle: 'Wunsch-BMI',
  description:
    'Berechne aus deiner Körpergröße und einem gewünschten BMI das passende Zielgewicht – inklusive Normalgewichtsbereich nach WHO.',
  keywords: [
    'wunsch bmi rechner',
    'gewicht aus bmi berechnen',
    'zielgewicht bmi',
    'normalgewicht bereich rechner',
    'idealer bmi gewicht',
    'bmi zielgewicht',
  ],
  formula:
    'Zielgewicht(kg) = Wunsch-BMI × Größe(m)²; Normalgewicht: BMI 18,5 bis 24,9',
  inputs: [
    { type: 'number', id: 'groesse', label: 'Körpergröße', unit: 'cm', default: 175, min: 1, step: 1 },
    { type: 'number', id: 'wunschBmi', label: 'Wunsch-BMI', unit: 'kg/m²', default: 22, min: 10, max: 40, step: 0.1, help: 'Normalgewicht liegt zwischen 18,5 und 24,9.' },
  ],
  compute: (v) => {
    const groesseM = num(v.groesse) / 100;
    const wunschBmi = num(v.wunschBmi);
    const flaeche = groesseM * groesseM;
    const zielgewicht = wunschBmi * flaeche;
    const untergrenze = 18.5 * flaeche;
    const obergrenze = 24.9 * flaeche;
    return [
      { label: 'Zielgewicht', value: zielgewicht, unit: 'kg', digits: 1, primary: true },
      { label: 'Normalgewicht untere Grenze', value: untergrenze, unit: 'kg', digits: 1 },
      { label: 'Normalgewicht obere Grenze', value: obergrenze, unit: 'kg', digits: 1 },
    ];
  },
  intro:
    'Welches Gewicht entspricht einem bestimmten BMI? Dieser Rechner dreht die BMI-Formel um: Aus deiner Körpergröße und einem gewünschten Body-Mass-Index berechnet er das zugehörige Zielgewicht. Zusätzlich siehst du den von der WHO definierten Normalgewichtsbereich (BMI 18,5 bis 24,9) in Kilogramm.',
  howto: [
    'Körpergröße in Zentimetern eingeben.',
    'Gewünschten BMI-Wert wählen (Normalgewicht: 18,5–24,9).',
    'Zielgewicht und Normalgewichtsbereich ablesen.',
  ],
  faq: [
    { q: 'Welcher BMI gilt als normal?', a: 'Nach WHO-Klassifikation liegt Normalgewicht bei einem BMI zwischen 18,5 und 24,9 kg/m². Darunter spricht man von Untergewicht, darüber von Übergewicht.' },
    { q: 'Ist ein niedriger BMI immer gesünder?', a: 'Nein. Sehr niedrige Werte können auf Untergewicht hindeuten. Der BMI berücksichtigt zudem nicht den Muskelanteil, weshalb muskulöse Menschen höhere Werte haben können.' },
    { q: 'Wie wähle ich meinen Wunsch-BMI?', a: 'Ein Wert um 22 liegt mittig im Normalbereich und gilt für viele Erwachsene als guter Orientierungspunkt. Individuelle Faktoren sollten mit ärztlicher Beratung bewertet werden.' },
  ],
  related: ['bmi-rechner', 'idealgewicht-rechner', 'wunschgewicht-dauer-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { groesse: 175, wunschBmi: 22 },
      expect: [
        { label: 'Zielgewicht', value: 67.38, tolerance: 0.1 },
        { label: 'Normalgewicht untere Grenze', value: 56.66, tolerance: 0.1 },
      ],
    },
    {
      values: { groesse: 180, wunschBmi: 24 },
      expect: [
        { label: 'Zielgewicht', value: 77.76, tolerance: 0.1 },
      ],
    },
  ],
};
