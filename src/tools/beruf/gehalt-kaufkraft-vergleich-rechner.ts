import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'gehalt-kaufkraft-vergleich-rechner',
  category: 'beruf',
  title: 'Gehaltsvergleich nach Kaufkraft (Städtevergleich)',
  shortTitle: 'Gehalt-Kaufkraft',
  description:
    'Vergleiche zwei Jobangebote über das Preisniveau: Welches Gehalt brauchst du am neuen Ort, um die gleiche Kaufkraft zu halten?',
  keywords: [
    'gehaltsvergleich kaufkraft',
    'kaufkraft gehalt rechner',
    'gehalt umrechnen stadt',
    'lebenshaltungskosten vergleich gehalt',
    'gehalt anpassen umzug',
    'preisniveau gehalt vergleich',
  ],
  formula:
    'Benötigtes Gehalt = aktuelles Gehalt × (Preisniveau neu ÷ Preisniveau alt)',
  inputs: [
    { type: 'number', id: 'gehalt', label: 'Aktuelles Gehalt (Brutto)', unit: '€', default: 3500, min: 0, step: 100 },
    { type: 'number', id: 'indexAlt', label: 'Preisniveau aktueller Ort', unit: 'Index', default: 100, min: 1, step: 1, help: 'Lebenshaltungskosten-Index, Referenzort = 100.' },
    { type: 'number', id: 'indexNeu', label: 'Preisniveau neuer Ort', unit: 'Index', default: 120, min: 1, step: 1, help: 'Höherer Wert = teureres Preisniveau am neuen Ort.' },
    { type: 'number', id: 'angebot', label: 'Angebotenes Gehalt am neuen Ort', unit: '€', default: 3900, min: 0, step: 100, help: 'Optional: Brutto-Angebot zum Abgleich.' },
  ],
  compute: (v) => {
    const gehalt = num(v.gehalt);
    const indexAlt = num(v.indexAlt);
    const indexNeu = num(v.indexNeu);
    const angebot = num(v.angebot);

    const verhaeltnis = indexAlt > 0 ? indexNeu / indexAlt : 0;
    const benoetigt = gehalt * verhaeltnis;
    const realwertAngebot = verhaeltnis > 0 ? angebot / verhaeltnis : 0;
    const differenz = angebot - benoetigt;

    return [
      { label: 'Benötigtes Gehalt für gleiche Kaufkraft', value: benoetigt, unit: '€', digits: 2, primary: true },
      { label: 'Kaufkraft des Angebots (in alten Preisen)', value: realwertAngebot, unit: '€', digits: 2 },
      { label: 'Angebot vs. benötigt', value: differenz, unit: '€', digits: 2, help: 'Positiv = Angebot reicht für mehr als die alte Kaufkraft.' },
    ];
  },
  intro:
    'Ein höheres Gehalt in einer teureren Stadt ist nicht automatisch mehr wert. Dieser Rechner skaliert dein aktuelles Gehalt mit dem Verhältnis der Preisniveaus, sodass du siehst, welches Bruttogehalt du am neuen Ort bräuchtest, um die gleiche Kaufkraft zu halten. Optional rechnet er ein konkretes Angebot in vergleichbare Kaufkraft am alten Ort um. Die Indexwerte gibst du selbst ein, z. B. aus Lebenshaltungskosten-Vergleichen.',
  howto: [
    'Trage dein aktuelles Bruttogehalt ein.',
    'Gib das Preisniveau am aktuellen und am neuen Ort als Index ein.',
    'Optional: Trage das Gehaltsangebot am neuen Ort ein.',
    'Lies das benötigte Gehalt und den Vergleich zum Angebot ab.',
  ],
  faq: [
    { q: 'Woher bekomme ich die Indexwerte?', a: 'Aus Lebenshaltungskosten- oder Mietpreisvergleichen. Setze einen Ort als Referenz (z. B. 100) und den anderen relativ dazu – ein Index von 120 bedeutet rund 20 % höhere Kosten.' },
    { q: 'Wie wird umgerechnet?', a: 'Das aktuelle Gehalt wird mit dem Verhältnis der Preisniveaus multipliziert. Ist der neue Ort 20 % teurer, brauchst du 20 % mehr Gehalt für die gleiche Kaufkraft.' },
    { q: 'Was bedeutet die Kaufkraft des Angebots?', a: 'Sie rechnet das angebotene Gehalt auf das Preisniveau deines aktuellen Orts zurück, damit du es direkt mit deinem heutigen Gehalt vergleichen kannst.' },
    { q: 'Sind Steuern berücksichtigt?', a: 'Nein, der Vergleich erfolgt auf Bruttobasis und nur über das Preisniveau. Unterschiede bei Steuern oder Sozialabgaben sind nicht enthalten.' },
  ],
  related: ['inflationsausgleich-gehalt-rechner', 'jahresgehalt-rechner', 'gehaltserhoehung-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { gehalt: 3500, indexAlt: 100, indexNeu: 120, angebot: 3900 },
      expect: [
        { label: 'Benötigtes Gehalt für gleiche Kaufkraft', value: 4200, tolerance: 0.01 },
        { label: 'Angebot vs. benötigt', value: -300, tolerance: 0.01 },
        { label: 'Kaufkraft des Angebots (in alten Preisen)', value: 3250, tolerance: 0.01 },
      ],
    },
    {
      values: { gehalt: 4000, indexAlt: 110, indexNeu: 90, angebot: 3500 },
      expect: [
        { label: 'Benötigtes Gehalt für gleiche Kaufkraft', value: 3272.73, tolerance: 0.05 },
      ],
    },
  ],
};
