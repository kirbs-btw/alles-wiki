import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'eiweissbedarf-rechner',
  category: 'gesundheit',
  title: 'Eiweißbedarf-Rechner',
  shortTitle: 'Eiweißbedarf',
  description:
    'Berechne deinen täglichen Eiweißbedarf in Gramm aus Körpergewicht und Ziel – vom Erhaltungsbedarf bis zum Muskelaufbau, inklusive Verteilung pro Mahlzeit.',
  keywords: [
    'eiweißbedarf rechner',
    'eiweißbedarf berechnen',
    'proteinbedarf rechner',
    'eiweiß muskelaufbau',
    'wie viel eiweiß am tag',
    'protein pro kg',
    'eiweiß abnehmen',
  ],
  formula: 'Eiweißbedarf = Körpergewicht(kg) × Faktor(g/kg) je nach Ziel',
  inputs: [
    { type: 'number', id: 'gewicht', label: 'Körpergewicht', unit: 'kg', default: 75, min: 1, step: 0.5 },
    {
      type: 'select', id: 'ziel', label: 'Ziel / Aktivität', default: '1.6',
      options: [
        { value: '0.8', label: 'Erhaltung, wenig Sport (0,8 g/kg)' },
        { value: '1.2', label: 'Aktiv / Ausdauersport (1,2 g/kg)' },
        { value: '1.6', label: 'Muskelaufbau, moderat (1,6 g/kg)' },
        { value: '2.0', label: 'Muskelaufbau, intensiv (2,0 g/kg)' },
        { value: '2.2', label: 'Diät bei Krafttraining (2,2 g/kg)' },
      ],
    },
    { type: 'number', id: 'mahlzeiten', label: 'Mahlzeiten pro Tag', default: 4, min: 1, max: 10, step: 1 },
  ],
  compute: (v) => {
    const g = num(v.gewicht);
    const faktor = num(v.ziel, 1.6);
    const proTag = g * faktor;
    const mahlzeiten = num(v.mahlzeiten, 4);
    const proMahlzeit = mahlzeiten > 0 ? proTag / mahlzeiten : 0;
    // 1 g Eiweiß liefert etwa 4,1 kcal
    const kcal = proTag * 4.1;
    return [
      { label: 'Täglicher Eiweißbedarf', value: proTag, unit: 'g', digits: 0, primary: true },
      { label: 'Eiweiß pro Mahlzeit', value: proMahlzeit, unit: 'g', digits: 0 },
      { label: 'Energie aus Eiweiß', value: kcal, unit: 'kcal', digits: 0 },
    ];
  },
  intro:
    'Der Eiweißbedarf-Rechner ermittelt, wie viel Protein du täglich aufnehmen solltest. Die Deutsche Gesellschaft für Ernährung empfiehlt für gesunde Erwachsene etwa 0,8 Gramm Eiweiß pro Kilogramm Körpergewicht. Wer Sport treibt oder Muskeln aufbauen möchte, hat einen höheren Bedarf von rund 1,2 bis 2,2 Gramm pro Kilogramm. Eine gleichmäßige Verteilung über mehrere Mahlzeiten unterstützt die Eiweißverwertung.',
  howto: [
    'Körpergewicht in Kilogramm eingeben.',
    'Ziel bzw. Aktivitätslevel wählen (bestimmt den Faktor in g/kg).',
    'Anzahl der täglichen Mahlzeiten angeben.',
    'Eiweißbedarf gesamt und pro Mahlzeit ablesen.',
  ],
  faq: [
    { q: 'Wie viel Eiweiß brauche ich pro Tag?', a: 'Für gesunde, wenig aktive Erwachsene empfiehlt die DGE etwa 0,8 g pro kg Körpergewicht. Bei Sport sind 1,2 bis 1,6 g sinnvoll, beim gezielten Muskelaufbau bis etwa 2,0 g pro kg.' },
    { q: 'Hilft mehr Eiweiß beim Abnehmen?', a: 'Eiweiß sättigt gut und schützt während einer Diät die Muskelmasse. Daher werden in Reduktionsphasen oft 1,6 bis 2,2 g pro kg empfohlen.' },
    { q: 'Warum auf mehrere Mahlzeiten verteilen?', a: 'Der Körper kann pro Mahlzeit nur eine begrenzte Menge Eiweiß optimal für den Muskelaufbau nutzen. Eine Verteilung auf 3 bis 5 Portionen gilt als günstig.' },
    { q: 'Ist zu viel Eiweiß schädlich?', a: 'Für gesunde Menschen gelten auch höhere Mengen als unbedenklich. Bei eingeschränkter Nierenfunktion sollte die Zufuhr aber ärztlich abgestimmt werden.' },
    { q: 'Wie viele Kalorien hat Eiweiß?', a: 'Ein Gramm Eiweiß liefert rund 4,1 kcal – ähnlich wie Kohlenhydrate und deutlich weniger als Fett (9 kcal pro Gramm).' },
  ],
  related: ['kalorienbedarf-rechner', 'grundumsatz-rechner', 'koerperfettanteil-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { gewicht: 75, ziel: '1.6', mahlzeiten: 4 },
      expect: [
        { label: 'Täglicher Eiweißbedarf', value: 120, tolerance: 0.5 },
        { label: 'Eiweiß pro Mahlzeit', value: 30, tolerance: 0.5 },
      ],
    },
  ],
};
