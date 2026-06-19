import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'bausparvertrag-rechner',
  category: 'finanzen',
  title: 'Bausparvertrag-Rechner (Ansparphase)',
  shortTitle: 'Bausparen',
  description:
    'Berechne, wann dein Bausparvertrag das Mindestsparguthaben für die Zuteilung erreicht und wie viel Guthaben sich in der Ansparphase ansammelt.',
  keywords: [
    'bausparvertrag rechner',
    'bausparen rechner',
    'bausparvertrag ansparphase berechnen',
    'mindestsparguthaben rechner',
    'bausparsumme ansparen',
  ],
  formula: 'Ziel = Bausparsumme × Mindestguthaben%; Guthaben(n) = Rate × ((1+i)^n − 1)/i; i = Zins/100/12',
  inputs: [
    { type: 'number', id: 'summe', label: 'Bausparsumme', unit: '€', default: 50000, min: 0, step: 1000 },
    { type: 'number', id: 'rate', label: 'Monatliche Sparrate', unit: '€', default: 200, min: 0, step: 10, help: 'Oft Promille-Anteil der Bausparsumme.' },
    { type: 'number', id: 'zins', label: 'Guthabenzins p.a.', unit: '%', default: 0.5, min: 0, step: 0.1 },
    { type: 'number', id: 'mindest', label: 'Mindestsparguthaben', unit: '%', default: 40, min: 1, max: 100, step: 1, help: 'Anteil der Bausparsumme für die Zuteilung (oft 40–50 %).' },
  ],
  compute: (v) => {
    const summe = num(v.summe);
    const rate = num(v.rate);
    const zins = num(v.zins);
    const mindest = num(v.mindest);
    const ziel = (summe * mindest) / 100;
    const i = zins / 100 / 12;
    let monate: number;
    if (rate <= 0 || ziel <= 0) {
      monate = 0;
    } else if (i === 0) {
      monate = Math.ceil(ziel / rate);
    } else {
      monate = Math.ceil(Math.log(1 + (ziel * i) / rate) / Math.log(1 + i));
    }
    const guthaben = i === 0 ? rate * monate : rate * (Math.pow(1 + i, monate) - 1) / i;
    const eingezahlt = rate * monate;
    return [
      { label: 'Dauer bis zur Zuteilung', value: monate, unit: 'Monate', digits: 0, primary: true },
      { label: 'Entspricht', value: monate / 12, unit: 'Jahre', digits: 1 },
      { label: 'Mindestsparguthaben (Ziel)', value: ziel, unit: '€', digits: 2 },
      { label: 'Guthaben bei Zuteilung', value: guthaben, unit: '€', digits: 2 },
      { label: 'Eigene Einzahlungen', value: eingezahlt, unit: '€', digits: 2 },
    ];
  },
  intro:
    'Ein Bausparvertrag läuft in zwei Phasen: In der Ansparphase zahlst du monatlich ein, bis ein Mindestsparguthaben (meist 40–50 % der Bausparsumme) erreicht ist – dann wird der Vertrag zuteilungsreif und du kannst das günstige Bauspardarlehen abrufen. Dieser Rechner schätzt, wann das Mindestguthaben erreicht ist. Guthabenzinsen, Abschluss- und Kontogebühren sowie Wohnungsbauprämie variieren je Tarif und sind hier vereinfacht – betrachte das Ergebnis als Orientierung (Stand 2026).',
  howto: [
    'Trage die vereinbarte Bausparsumme ein.',
    'Gib deine monatliche Sparrate und den Guthabenzins laut Tarif an.',
    'Wähle das Mindestsparguthaben in Prozent der Bausparsumme (steht in den Tarifbedingungen).',
    'Lies ab, nach wie vielen Monaten die Zuteilung möglich ist.',
  ],
  faq: [
    { q: 'Was ist die Zuteilung?', a: 'Sobald das Mindestsparguthaben erreicht und eine Mindestlaufzeit/Bewertungszahl erfüllt ist, wird der Vertrag zuteilungsreif: Du erhältst Guthaben plus Bauspardarlehen zur Auszahlung. Dieser Rechner betrachtet nur das Sparziel.' },
    { q: 'Sind Gebühren berücksichtigt?', a: 'Nein. Abschlussgebühr (oft ~1 % der Bausparsumme) und Kontoführungsgebühren mindern das Guthaben und sind hier nicht eingerechnet. Prüfe deinen Tarif für eine genaue Rechnung.' },
    { q: 'Lohnt sich Bausparen 2026 noch?', a: 'Das hängt vom Zinsumfeld ab. Bei niedrigen Guthabenzinsen ist Bausparen vor allem als Zinssicherung für ein späteres Darlehen interessant. Vergleiche immer mit Tagesgeld und ETF-Sparplan.' },
  ],
  related: ['sparplan-rechner', 'tagesgeld-rechner', 'kreditrechner'],
  examples: [
    {
      values: { summe: 50000, rate: 200, zins: 0, mindest: 40 },
      expect: [
        { label: 'Dauer bis zur Zuteilung', value: 100, tolerance: 0 },
        { label: 'Mindestsparguthaben (Ziel)', value: 20000, tolerance: 0 },
        { label: 'Guthaben bei Zuteilung', value: 20000, tolerance: 0 },
      ],
    },
  ],
  updated: '2026-06-19',
};
