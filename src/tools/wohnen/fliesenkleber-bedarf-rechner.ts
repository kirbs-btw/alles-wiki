import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'fliesenkleber-bedarf-rechner',
  category: 'wohnen',
  title: 'Fliesenkleber-Rechner',
  shortTitle: 'Fliesenkleber',
  description:
    'Berechne den benötigten Fliesenkleber in Kilogramm und die Anzahl der Säcke – abhängig von Fläche, Zahnung der Kelle und Verschnitt.',
  keywords: [
    'fliesenkleber berechnen',
    'fliesenkleber bedarf rechner',
    'wie viel kleber pro qm fliesen',
    'fliesenkleber kg pro m2',
    'flexkleber menge',
    'fliesenkleber säcke berechnen',
  ],
  formula:
    'Kleber (kg) = Fläche × Verbrauch je m² × (1+Verschnitt%); Säcke = ceil(kg / Sackgröße)',
  inputs: [
    { type: 'number', id: 'flaeche', label: 'Zu verklebende Fläche', unit: 'm²', default: 20, min: 0, step: 0.5 },
    {
      type: 'select', id: 'zahnung', label: 'Zahnung der Kelle', default: '8',
      help: 'Größere Fliesen brauchen eine gröbere Zahnung und mehr Kleber.',
      options: [
        { value: '4', label: '4 mm – Mosaik / kleine Fliesen (~2 kg/m²)' },
        { value: '6', label: '6 mm – bis ca. 20 × 20 cm (~2,8 kg/m²)' },
        { value: '8', label: '8 mm – bis ca. 30 × 30 cm (~3,7 kg/m²)' },
        { value: '10', label: '10 mm – große Fliesen (~4,5 kg/m²)' },
        { value: '12', label: '12 mm – Großformat / Buttering-Floating (~6 kg/m²)' },
      ],
    },
    { type: 'number', id: 'verschnitt', label: 'Zuschlag für Verschnitt/Unebenheit', unit: '%', default: 10, min: 0, max: 40, step: 1, help: 'Bei unebenem Untergrund mehr.' },
    { type: 'number', id: 'sack', label: 'Sackgröße', unit: 'kg', default: 25, min: 1, step: 1, help: 'Übliche Gebinde 20 oder 25 kg.' },
  ],
  compute: (v) => {
    const flaeche = num(v.flaeche);
    const verschnitt = num(v.verschnitt);
    const sack = num(v.sack);
    const verbrauch: Record<string, number> = {
      '4': 2.0,
      '6': 2.8,
      '8': 3.7,
      '10': 4.5,
      '12': 6.0,
    };
    const proQm = verbrauch[String(v.zahnung)] ?? 3.7;
    const kg = flaeche * proQm * (1 + verschnitt / 100);
    const saecke = sack > 0 ? Math.ceil(kg / sack) : 0;
    return [
      { label: 'Benötigter Fliesenkleber', value: kg, unit: 'kg', digits: 1, primary: true },
      { label: 'Benötigte Säcke', value: saecke, unit: 'Säcke', digits: 0 },
      { label: 'Verbrauch je m²', value: proQm, unit: 'kg/m²', digits: 1 },
    ];
  },
  intro:
    'Der Klebebedarf hängt vor allem von der Zahnung der Kelle ab – und die richtet sich nach der Fliesengröße. Je größer die Fliese, desto gröber die Zahnung und desto mehr Kleber wird verbraucht. Die Werte sind Richtwerte für mineralischen Dünnbettmörtel auf ebenem Untergrund. Bei unebenem Untergrund, im Buttering-Floating-Verfahren oder bei stark saugenden Untergründen steigt der Verbrauch. Maßgeblich bleibt das technische Merkblatt des Klebers.',
  howto: [
    'Zu verklebende Fläche in Quadratmetern eingeben.',
    'Zahnung der Kelle passend zur Fliesengröße wählen.',
    'Zuschlag für Verschnitt und Untergrund-Unebenheiten festlegen.',
    'Sackgröße eintragen und benötigte Kilogramm bzw. Säcke ablesen.',
  ],
  faq: [
    { q: 'Wie viel Fliesenkleber pro Quadratmeter?', a: 'Als Richtwert gelten je nach Zahnung etwa 2 kg/m² (4 mm) bis 6 kg/m² (12 mm). Für mittelgroße Fliesen mit 8-mm-Zahnung rechnet man rund 3,5–4 kg/m².' },
    { q: 'Welche Zahnung für welche Fliese?', a: 'Faustregel: kleine Fliesen 4–6 mm, bis 30 × 30 cm etwa 8 mm, größere Formate 10 mm und mehr. Bei Großformaten kommt zusätzlich das Buttering-Floating-Verfahren zum Einsatz.' },
    { q: 'Warum ein Zuschlag?', a: 'Unebene Untergründe, Reste im Eimer und Verschnitt erhöhen den Verbrauch. 10 % Zuschlag sind üblich, bei sehr welligem Untergrund mehr.' },
  ],
  related: ['fliesen-rechner', 'estrich-rechner', 'putz-rechner'],
  updated: '2026-06-19',
  examples: [
    {
      values: { flaeche: 20, zahnung: '8', verschnitt: 10, sack: 25 },
      expect: [
        { label: 'Benötigter Fliesenkleber', value: 81.4, tolerance: 0.05 },
        { label: 'Benötigte Säcke', value: 4, tolerance: 0.01 },
      ],
    },
  ],
};
