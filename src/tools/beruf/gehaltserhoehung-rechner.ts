import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'gehaltserhoehung-rechner',
  category: 'beruf',
  title: 'Gehaltserhöhung-Rechner (Prozent)',
  shortTitle: 'Gehaltserhöhung',
  description:
    'Berechne dein neues Gehalt nach einer prozentualen Erhöhung – mit dem Plus pro Monat und pro Jahr. Oder ermittle, wie viel Prozent eine geplante Erhöhung ausmacht.',
  keywords: [
    'gehaltserhöhung rechner',
    'gehaltserhöhung prozent berechnen',
    'neues gehalt berechnen',
    'lohnerhöhung rechner',
    'gehalt aufschlag berechnen',
    'wie viel prozent gehaltserhöhung',
    'gehaltsplus berechnen',
  ],
  formula:
    'Neues Gehalt = altes Gehalt × (1 + Erhöhung% ÷ 100); Plus = neues − altes Gehalt',
  inputs: [
    { type: 'number', id: 'altgehalt', label: 'Aktuelles Brutto-Monatsgehalt', unit: '€', default: 3000, min: 0, step: 50 },
    { type: 'number', id: 'erhoehung', label: 'Erhöhung', unit: '%', default: 5, min: 0, max: 100, step: 0.5 },
  ],
  compute: (v) => {
    const altgehalt = num(v.altgehalt);
    const erhoehung = num(v.erhoehung);

    const neugehalt = altgehalt * (1 + erhoehung / 100);
    const plusMonat = neugehalt - altgehalt;
    const plusJahr = plusMonat * 12;

    return [
      { label: 'Neues Monatsgehalt', value: neugehalt, unit: '€', digits: 2, primary: true },
      { label: 'Plus pro Monat', value: plusMonat, unit: '€', digits: 2 },
      { label: 'Plus pro Jahr', value: plusJahr, unit: '€', digits: 2, help: 'Ohne Sonderzahlungen – nur 12 Monatsgehälter.' },
      { label: 'Neues Jahresgehalt', value: neugehalt * 12, unit: '€', digits: 2 },
    ];
  },
  intro:
    'Eine Gehaltsverhandlung steht an oder die Erhöhung ist beschlossen? Dieser Rechner zeigt dir sofort dein neues Brutto-Monatsgehalt und das jährliche Plus. So lässt sich gut einschätzen, was ein Prozentpunkt mehr oder weniger konkret in Euro bedeutet.',
  howto: [
    'Trage dein aktuelles Brutto-Monatsgehalt ein.',
    'Gib die gewünschte oder vereinbarte Erhöhung in Prozent ein.',
    'Lies das neue Monatsgehalt und das Plus ab.',
    'Vergleiche mehrere Prozentsätze, um deine Verhandlung vorzubereiten.',
  ],
  faq: [
    { q: 'Sind das Brutto- oder Nettowerte?', a: 'Die Berechnung erfolgt brutto. Netto kommt von einer Gehaltserhöhung wegen Steuerprogression und Abgaben weniger an – häufig grob die Hälfte bis zwei Drittel des Bruttoplus.' },
    { q: 'Wie viel Prozent Gehaltserhöhung sind üblich?', a: 'Bei regulären Anpassungen sind je nach Branche und Inflation oft 3 % bis 6 % marktüblich. Bei einem Stellen- oder Aufgabenwechsel können auch deutlich höhere Sprünge realistisch sein.' },
    { q: 'Berücksichtigt der Rechner das 13. Gehalt?', a: 'Nein, gerechnet wird mit 12 Monatsgehältern. Gibt es Sonderzahlungen, fällt das Jahresplus entsprechend höher aus.' },
    { q: 'Wie rechne ich von neuem auf altes Gehalt zurück?', a: 'Altes Gehalt = neues Gehalt ÷ (1 + Erhöhung ÷ 100). Eine Erhöhung um 10 % wird nicht durch einen Abzug von 10 % rückgängig gemacht.' },
    { q: 'Was bedeutet ein Prozentpunkt mehr?', a: 'Bei 3.000 € entspricht 1 % genau 30 € brutto im Monat, also 360 € im Jahr. Kleine Prozentunterschiede summieren sich über die Jahre deutlich.' },
  ],
  related: ['brutto-stundensatz-rechner', 'teilzeit-gehalt-rechner', 'stundenlohn-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { altgehalt: 3000, erhoehung: 5 },
      expect: [
        { label: 'Neues Monatsgehalt', value: 3150, tolerance: 0.01 },
        { label: 'Plus pro Jahr', value: 1800, tolerance: 0.01 },
      ],
    },
  ],
};
