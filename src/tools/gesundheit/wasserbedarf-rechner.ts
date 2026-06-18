import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'wasserbedarf-rechner',
  category: 'gesundheit',
  title: 'Wasserbedarf-Rechner',
  shortTitle: 'Wasserbedarf',
  description:
    'Berechne deinen täglichen Trinkbedarf aus Körpergewicht und Aktivität – wie viel Wasser du am Tag trinken solltest, inklusive Zuschlag für Sport.',
  keywords: [
    'wasserbedarf rechner',
    'wie viel wasser am tag',
    'trinkmenge berechnen',
    'flüssigkeitsbedarf',
    'wasser trinken pro tag',
    'trinkmenge sport',
    'täglicher wasserbedarf',
  ],
  formula:
    'Trinkmenge = Gewicht(kg) × 35 ml + 500–1000 ml je Stunde Sport',
  inputs: [
    { type: 'number', id: 'gewicht', label: 'Körpergewicht', unit: 'kg', default: 75, min: 1, step: 0.5 },
    {
      type: 'select', id: 'faktor', label: 'Bedarf pro kg', default: '35',
      options: [
        { value: '30', label: 'Senioren / geringer Bedarf (30 ml/kg)' },
        { value: '35', label: 'Erwachsene Standard (35 ml/kg)' },
        { value: '40', label: 'Jüngere / höherer Bedarf (40 ml/kg)' },
      ],
    },
    { type: 'number', id: 'sport', label: 'Sport / Schwitzen', unit: 'h/Tag', default: 0, min: 0, step: 0.25, help: 'Zuschlag etwa 700 ml pro Stunde' },
  ],
  compute: (v) => {
    const g = num(v.gewicht);
    const faktor = num(v.faktor, 35);
    const basis = g * faktor;
    const sportZuschlag = num(v.sport) * 700;
    const gesamtMl = basis + sportZuschlag;
    const gesamtL = gesamtMl / 1000;
    // Etwa 20 % der Flüssigkeit kommt üblicherweise aus fester Nahrung
    const ausGetraenken = gesamtMl * 0.8;
    const glaeser = ausGetraenken / 250;
    return [
      { label: 'Täglicher Flüssigkeitsbedarf', value: gesamtL, unit: 'l', digits: 2, primary: true },
      { label: 'Bedarf in Millilitern', value: gesamtMl, unit: 'ml', digits: 0 },
      { label: 'Davon über Getränke (≈ 80 %)', value: ausGetraenken / 1000, unit: 'l', digits: 2 },
      { label: 'Entspricht Gläsern (à 250 ml)', value: glaeser, unit: 'Gläser', digits: 0 },
    ];
  },
  intro:
    'Der Wasserbedarf-Rechner schätzt, wie viel Flüssigkeit du täglich aufnehmen solltest. Eine verbreitete Faustregel sind rund 35 Milliliter pro Kilogramm Körpergewicht. Bei Sport, Hitze oder starkem Schwitzen steigt der Bedarf deutlich. Ein Teil der Flüssigkeit nimmst du über feste Nahrung wie Obst und Gemüse auf, der Rest sollte über Getränke gedeckt werden.',
  howto: [
    'Körpergewicht in Kilogramm eingeben.',
    'Passenden Bedarf pro Kilogramm je nach Alter wählen.',
    'Stunden mit Sport oder starkem Schwitzen ergänzen.',
    'Empfohlene Trinkmenge in Litern ablesen.',
  ],
  faq: [
    { q: 'Wie viel Wasser sollte ich am Tag trinken?', a: 'Als Richtwert gelten rund 35 ml pro Kilogramm Körpergewicht, also etwa 2 bis 2,5 Liter für Erwachsene. Bei Sport und Hitze entsprechend mehr.' },
    { q: 'Zählen Kaffee und Tee zur Trinkmenge?', a: 'Ja. Anders als früher angenommen tragen auch Kaffee und Tee zur Flüssigkeitsbilanz bei. Reines Wasser und ungesüßte Getränke bleiben aber die beste Wahl.' },
    { q: 'Woran erkenne ich, dass ich genug trinke?', a: 'Ein guter Hinweis ist hellgelber Urin. Dunkler Urin, Durst, Kopfschmerzen oder Müdigkeit können auf zu wenig Flüssigkeit deuten.' },
    { q: 'Kann ich zu viel Wasser trinken?', a: 'In Extremfällen ja. Sehr große Mengen in kurzer Zeit können den Salzhaushalt stören (Hyponatriämie). Über den Tag verteilt ist das für Gesunde aber kaum ein Risiko.' },
  ],
  related: ['kalorienbedarf-rechner', 'kalorienverbrauch-rechner', 'grundumsatz-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { gewicht: 75, faktor: '35', sport: 0 },
      expect: [
        { label: 'Bedarf in Millilitern', value: 2625, tolerance: 1 },
        { label: 'Täglicher Flüssigkeitsbedarf', value: 2.625, tolerance: 0.01 },
      ],
    },
  ],
};
