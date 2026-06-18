import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'punkte-flensburg-rechner',
  category: 'recht',
  title: 'Punkte-in-Flensburg-Rechner (Fahreignungsregister)',
  shortTitle: 'Punkte Flensburg',
  description:
    'Addiere deine Punkte im Fahreignungsregister und sieh die Stufe des Fahreignungs-Bewertungssystems: Ermahnung, Verwarnung oder Entzug der Fahrerlaubnis.',
  keywords: [
    'punkte flensburg rechner',
    'fahreignungsregister punkte',
    'punktesystem flensburg',
    'wie viele punkte führerschein weg',
    'punkte addieren flensburg',
    'flensburg punktestand',
  ],
  formula: 'Punktestand = Summe der Einzelpunkte; ab 8 Punkten Entzug der Fahrerlaubnis',
  inputs: [
    { type: 'number', id: 'einPunkt', label: 'Verstöße mit 1 Punkt', unit: '', default: 2, min: 0, max: 30, step: 1, help: 'Ordnungswidrigkeiten mit Regelbuße (z. B. zu schnell, Handy am Steuer).' },
    { type: 'number', id: 'zweiPunkte', label: 'Verstöße mit 2 Punkten', unit: '', default: 1, min: 0, max: 20, step: 1, help: 'Schwere OWi oder Straftat ohne Fahrverbot/Entzug (z. B. Rotlicht).' },
    { type: 'number', id: 'dreiPunkte', label: 'Verstöße mit 3 Punkten', unit: '', default: 0, min: 0, max: 20, step: 1, help: 'Straftaten mit Entzug der Fahrerlaubnis (z. B. Unfallflucht).' },
  ],
  compute: (v) => {
    const einPunkt = Math.max(0, Math.round(num(v.einPunkt)));
    const zweiPunkte = Math.max(0, Math.round(num(v.zweiPunkte)));
    const dreiPunkte = Math.max(0, Math.round(num(v.dreiPunkte)));
    const punkte = einPunkt * 1 + zweiPunkte * 2 + dreiPunkte * 3;
    let stufe: string;
    if (punkte <= 3) stufe = 'Vormerkung (keine Maßnahme)';
    else if (punkte <= 5) stufe = 'Ermahnung';
    else if (punkte <= 7) stufe = 'Verwarnung';
    else stufe = 'Entzug der Fahrerlaubnis';
    const bisEntzug = Math.max(0, 8 - punkte);
    return [
      { label: 'Punktestand', value: punkte, unit: 'Punkte', digits: 0, primary: true },
      { label: 'Maßnahmenstufe', value: stufe },
      { label: 'Punkte bis zum Entzug', value: bisEntzug, unit: 'Punkte', digits: 0 },
    ];
  },
  intro:
    'Verkehrsverstöße werden im Fahreignungsregister in Flensburg mit Punkten erfasst: leichtere Ordnungswidrigkeiten bringen 1 Punkt, schwerere 2 Punkte, Straftaten mit Fahrerlaubnisentzug 3 Punkte. Das Fahreignungs-Bewertungssystem sieht ab 4 Punkten eine Ermahnung, ab 6 Punkten eine Verwarnung und ab 8 Punkten den Entzug der Fahrerlaubnis vor. Dieser Rechner addiert deine Punkte als Orientierung – Tilgungsfristen und Einzelfälle bleiben unberücksichtigt.',
  howto: [
    'Anzahl der Verstöße je Punktekategorie eingeben.',
    'Punktestand und Maßnahmenstufe ablesen.',
    'Sehen, wie viele Punkte bis zum Entzug der Fahrerlaubnis verbleiben.',
  ],
  faq: [
    { q: 'Ab wie vielen Punkten ist der Führerschein weg?', a: 'Bei 8 oder mehr Punkten wird die Fahrerlaubnis entzogen. Zuvor gibt es bei 4 bis 5 Punkten eine Ermahnung und bei 6 bis 7 Punkten eine Verwarnung.' },
    { q: 'Wie viele Punkte gibt es pro Verstoß?', a: 'Es gibt 1 Punkt für gewöhnliche Ordnungswidrigkeiten, 2 Punkte für besonders verkehrssicherheitsrelevante OWi oder Straftaten ohne Entzug und 3 Punkte für Straftaten mit Entzug der Fahrerlaubnis.' },
    { q: 'Wann verfallen Punkte?', a: 'Punkte werden je nach Schwere nach 2,5, 5 oder 10 Jahren getilgt. Die Fristen laufen für jeden Eintrag einzeln; dieser Rechner berücksichtigt sie nicht.' },
    { q: 'Hilft ein Fahreignungsseminar?', a: 'Bei einem Stand von 1 bis 5 Punkten kann ein freiwilliges Fahreignungsseminar einmalig 1 Punkt abbauen. Ab 6 Punkten ist kein Punkteabbau durch das Seminar mehr möglich.' },
  ],
  related: ['fahrverbot-bussgeld-rechner', 'schmerzensgeld-orientierung'],
  examples: [
    {
      values: { einPunkt: 2, zweiPunkte: 1, dreiPunkte: 0 },
      expect: [
        { label: 'Punktestand', value: 4, tolerance: 0.01 },
        { label: 'Punkte bis zum Entzug', value: 4, tolerance: 0.01 },
      ],
    },
    {
      values: { einPunkt: 2, zweiPunkte: 0, dreiPunkte: 2 },
      expect: [
        { label: 'Punktestand', value: 8, tolerance: 0.01 },
        { label: 'Punkte bis zum Entzug', value: 0, tolerance: 0.01 },
      ],
    },
  ],
  updated: '2026-06-18',
};
