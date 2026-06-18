import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'kalorienbedarf-rechner',
  category: 'gesundheit',
  title: 'Kalorienbedarf-Rechner',
  shortTitle: 'Kalorienbedarf',
  description:
    'Berechne deinen täglichen Kalorienbedarf (Gesamtumsatz) aus Grundumsatz und Aktivitätsfaktor – plus Richtwerte zum Abnehmen und Zunehmen.',
  keywords: [
    'kalorienbedarf rechner',
    'kalorienbedarf berechnen',
    'täglicher kalorienbedarf',
    'gesamtumsatz rechner',
    'pal faktor',
    'kalorien abnehmen',
    'tdee rechner',
  ],
  formula: 'Gesamtumsatz = Grundumsatz (Mifflin-St-Jeor) × PAL-Aktivitätsfaktor',
  inputs: [
    {
      type: 'select', id: 'geschlecht', label: 'Geschlecht', default: 'mann',
      options: [
        { value: 'mann', label: 'Männlich' },
        { value: 'frau', label: 'Weiblich' },
      ],
    },
    { type: 'number', id: 'gewicht', label: 'Gewicht', unit: 'kg', default: 75, min: 1, step: 0.1 },
    { type: 'number', id: 'groesse', label: 'Größe', unit: 'cm', default: 178, min: 1, step: 1 },
    { type: 'number', id: 'alter', label: 'Alter', unit: 'Jahre', default: 30, min: 1, max: 120, step: 1 },
    {
      type: 'select', id: 'aktivitaet', label: 'Aktivitätslevel', default: '1.55',
      options: [
        { value: '1.2', label: 'Sitzend, kaum Bewegung (PAL 1,2)' },
        { value: '1.375', label: 'Leicht aktiv, 1–3× Sport/Woche (PAL 1,375)' },
        { value: '1.55', label: 'Mäßig aktiv, 3–5× Sport/Woche (PAL 1,55)' },
        { value: '1.725', label: 'Sehr aktiv, 6–7× Sport/Woche (PAL 1,725)' },
        { value: '1.9', label: 'Extrem aktiv, körperliche Arbeit (PAL 1,9)' },
      ],
    },
  ],
  compute: (v) => {
    const g = num(v.gewicht);
    const h = num(v.groesse);
    const a = num(v.alter);
    const pal = num(v.aktivitaet, 1.55);
    const s = String(v.geschlecht) === 'frau' ? -161 : 5;
    const bmr = 10 * g + 6.25 * h - 5 * a + s;
    const bmrSafe = bmr > 0 ? bmr : 0;
    const tdee = bmrSafe * pal;
    return [
      { label: 'Gesamtumsatz (Erhaltung)', value: tdee, unit: 'kcal/Tag', digits: 0, primary: true },
      { label: 'Grundumsatz', value: bmrSafe, unit: 'kcal/Tag', digits: 0 },
      { label: 'Zum Abnehmen (−500 kcal)', value: tdee - 500, unit: 'kcal/Tag', digits: 0 },
      { label: 'Zum Zunehmen (+300 kcal)', value: tdee + 300, unit: 'kcal/Tag', digits: 0 },
    ];
  },
  intro:
    'Der tägliche Kalorienbedarf (Gesamtumsatz, englisch TDEE) gibt an, wie viele Kilokalorien du täglich aufnehmen musst, um dein Gewicht zu halten. Er setzt sich zusammen aus deinem Grundumsatz – berechnet nach der Mifflin-St-Jeor-Formel – und einem Aktivitätsfaktor (PAL), der Bewegung und Sport berücksichtigt. Ein Kaloriendefizit führt zum Abnehmen, ein Überschuss zum Zunehmen.',
  howto: [
    'Geschlecht, Gewicht, Größe und Alter eingeben.',
    'Passendes Aktivitätslevel (PAL) auswählen.',
    'Gesamtumsatz für das Gewicht-Halten ablesen.',
    'Defizit- oder Überschuss-Richtwerte für Ab- oder Zunehmen nutzen.',
  ],
  faq: [
    { q: 'Wie viel kann ich mit einem Defizit von 500 kcal abnehmen?', a: 'Ein Kilogramm Körperfett entspricht etwa 7000 kcal. Ein tägliches Defizit von 500 kcal ergibt rund 3500 kcal pro Woche, also etwa ein halbes Kilo Gewichtsverlust pro Woche.' },
    { q: 'Was bedeutet der PAL-Faktor?', a: 'PAL steht für Physical Activity Level. Er beschreibt, wie aktiv du im Alltag bist. Ein Bürojob hat etwa 1,4–1,5, körperliche Arbeit oder viel Sport bis 1,9.' },
    { q: 'Warum nehme ich trotz Defizit nicht ab?', a: 'Häufige Gründe sind unterschätzte Portionsgrößen, Getränke und Snacks. Der Rechner liefert eine Schätzung – wiege dich über mehrere Wochen und passe die Kalorienzufuhr bei Bedarf an.' },
    { q: 'Brauche ich an Sporttagen mehr Kalorien?', a: 'Der PAL-Faktor verteilt die Aktivität bereits auf die Woche. Wer den Verbrauch einzelner Einheiten genauer kennen will, kann zusätzlich einen Kalorienverbrauch-Rechner nach MET nutzen.' },
  ],
  related: ['grundumsatz-rechner', 'kalorienverbrauch-rechner', 'bmi-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { geschlecht: 'mann', gewicht: 75, groesse: 178, alter: 30, aktivitaet: '1.55' },
      expect: [{ label: 'Gesamtumsatz (Erhaltung)', value: 2662.1, tolerance: 2 }],
    },
  ],
};
