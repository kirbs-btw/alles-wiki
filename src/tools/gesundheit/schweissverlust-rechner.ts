import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'schweissverlust-rechner',
  category: 'gesundheit',
  title: 'Schweißverlust-Rechner (Flüssigkeitsverlust beim Sport)',
  shortTitle: 'Schweißverlust',
  description:
    'Berechne deinen Flüssigkeitsverlust durch Schweiß beim Sport aus Gewichtsdifferenz und getrunkener Menge – inklusive Schweißrate pro Stunde und Trinkempfehlung.',
  keywords: [
    'schweißverlust berechnen',
    'flüssigkeitsverlust sport',
    'schweißrate rechner',
    'wasserverlust beim sport',
    'wie viel schwitze ich',
  ],
  formula: 'Schweißverlust = (Gewicht vorher − nachher) + getrunkene Menge',
  inputs: [
    { type: 'number', id: 'vorher', label: 'Gewicht vor dem Sport', unit: 'kg', default: 75, min: 20, max: 250, step: 0.1 },
    { type: 'number', id: 'nachher', label: 'Gewicht nach dem Sport', unit: 'kg', default: 73.5, min: 20, max: 250, step: 0.1 },
    { type: 'number', id: 'getrunken', label: 'Während des Sports getrunken', unit: 'l', default: 0.5, min: 0, step: 0.05, help: '1 Liter Flüssigkeit ≈ 1 kg.' },
    { type: 'number', id: 'dauer', label: 'Trainingsdauer', unit: 'min', default: 60, min: 1, step: 5 },
  ],
  compute: (v) => {
    const vorher = num(v.vorher);
    const nachher = num(v.nachher);
    const getrunken = num(v.getrunken);
    const dauer = num(v.dauer);
    // Gewichtsverlust in kg ≈ Liter; plus getrunkene Menge = Gesamtschweiß
    const verlustKg = vorher - nachher;
    const schweissLiter = verlustKg + getrunken;
    const schweissSafe = schweissLiter > 0 ? schweissLiter : 0;
    const rateProStunde = dauer > 0 ? schweissSafe / (dauer / 60) : 0;
    const startGewicht = vorher > 0 ? vorher : 0;
    const verlustProzent = startGewicht > 0 ? (verlustKg / startGewicht) * 100 : 0;
    return [
      { label: 'Schweißverlust gesamt', value: schweissSafe, unit: 'l', digits: 2, primary: true },
      { label: 'Schweißrate', value: rateProStunde, unit: 'l/h', digits: 2 },
      { label: 'Körpergewichtsverlust', value: verlustProzent, unit: '%', digits: 1 },
      { label: 'Empfohlen nachtrinken (×1,5)', value: schweissSafe * 1.5, unit: 'l', digits: 2 },
    ];
  },
  intro:
    'Beim Sport verliert der Körper über Schweiß Flüssigkeit. Der einfachste Weg, diesen Verlust zu messen, ist das Wiegen vor und nach dem Training: 1 Kilogramm Gewichtsverlust entspricht näherungsweise 1 Liter Flüssigkeit. Wer während des Trainings trinkt, muss diese Menge hinzurechnen. Ein Flüssigkeitsverlust von mehr als rund 2 Prozent des Körpergewichts kann die Leistung mindern. Zum vollständigen Ausgleich wird oft empfohlen, etwa das 1,5-Fache des Verlusts nachzutrinken (Näherung, Stand 2026).',
  howto: [
    'Vor dem Sport möglichst unbekleidet wiegen.',
    'Nach dem Sport unter gleichen Bedingungen erneut wiegen.',
    'Während des Trainings getrunkene Menge (in Litern) eintragen.',
    'Trainingsdauer angeben und Schweißverlust sowie Trinkempfehlung ablesen.',
  ],
  faq: [
    { q: 'Warum entspricht 1 kg etwa 1 Liter?', a: 'Wasser hat eine Dichte von rund 1 kg pro Liter. Der über Schweiß verlorene Wasseranteil lässt sich daher gut über die Gewichtsdifferenz schätzen.' },
    { q: 'Wie viel sollte ich nachtrinken?', a: 'Zum vollständigen Ausgleich wird häufig das 1,5-Fache des Flüssigkeitsverlusts empfohlen, da ein Teil über Urin verloren geht. Das ist eine Näherung (Stand 2026).' },
    { q: 'Ab wann wird der Verlust kritisch?', a: 'Ein Verlust von mehr als etwa 2 Prozent des Körpergewichts kann Ausdauer und Konzentration beeinträchtigen. Bei sehr hohen Verlusten sollte man Trinkstrategie und Belastung anpassen.' },
  ],
  related: ['wasserbedarf-rechner', 'koerperwasser-rechner', 'kalorienverbrauch-rechner'],
  updated: '2026-06-19',
  examples: [
    {
      values: { vorher: 75, nachher: 73.5, getrunken: 0.5, dauer: 60 },
      expect: [
        { label: 'Schweißverlust gesamt', value: 2, tolerance: 0.01 },
        { label: 'Schweißrate', value: 2, tolerance: 0.01 },
      ],
    },
    {
      values: { vorher: 80, nachher: 79, getrunken: 0.25, dauer: 90 },
      expect: [{ label: 'Schweißverlust gesamt', value: 1.25, tolerance: 0.01 }],
    },
  ],
};
