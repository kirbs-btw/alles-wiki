import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'gesetzliche-erbfolge-rechner',
  category: 'recht',
  title: 'Gesetzliche Erbfolge-Rechner (Erbquoten)',
  shortTitle: 'Erbfolge',
  description:
    'Berechne die Erbquoten nach gesetzlicher Erbfolge: Anteil des Ehegatten (mit Zugewinnausgleich) und der Kinder am Nachlass (§§ 1924 ff., 1931 BGB).',
  keywords: [
    'gesetzliche erbfolge rechner',
    'erbquote berechnen',
    'erbanteil ehegatte',
    'erbteil kinder',
    'erbfolge ohne testament',
    'zugewinngemeinschaft erbe',
  ],
  formula: 'Ehegatte (Zugewinn) = 1/2; Rest wird zu gleichen Teilen auf die Kinder verteilt',
  inputs: [
    { type: 'number', id: 'nachlass', label: 'Nachlasswert (netto)', unit: '€', default: 400000, min: 0, step: 1000, help: 'Reinnachlass nach Abzug der Schulden.' },
    { type: 'number', id: 'kinder', label: 'Anzahl Kinder', unit: '', default: 2, min: 0, max: 20, step: 1, help: 'Erben der ersten Ordnung.' },
    {
      type: 'select', id: 'ehegatte', label: 'Ehegatte / Lebenspartner', default: 'zugewinn',
      options: [
        { value: 'zugewinn', label: 'Ja, Zugewinngemeinschaft (gesetzl. Güterstand)' },
        { value: 'guetertrennung', label: 'Ja, Gütertrennung' },
        { value: 'kein', label: 'Kein Ehegatte' },
      ],
    },
  ],
  compute: (v) => {
    const nachlass = num(v.nachlass);
    const kinder = Math.max(0, Math.round(num(v.kinder)));
    const ehegatte = String(v.ehegatte);

    let ehequote = 0;
    if (ehegatte === 'zugewinn') {
      // 1/4 gesetzlich + 1/4 pauschaler Zugewinnausgleich = 1/2 neben Kindern
      ehequote = kinder > 0 ? 0.5 : 0.5;
    } else if (ehegatte === 'guetertrennung') {
      // Neben Kindern: gleiche Teile, mind. 1/4; bei 1 Kind 1/2, bei 2 Kindern je 1/3
      if (kinder === 0) ehequote = 0.5;
      else if (kinder === 1) ehequote = 0.5;
      else ehequote = 1 / (kinder + 1);
    } else {
      ehequote = 0;
    }
    if (kinder === 0 && ehegatte !== 'kein') ehequote = 1; // Ehegatte erbt allein (keine Erben 2. Ordnung modelliert)
    if (kinder === 0 && ehegatte === 'kein') ehequote = 0;

    const restFuerKinder = 1 - (kinder > 0 ? ehequote : (ehegatte === 'kein' ? 0 : 1));
    const kindquote = kinder > 0 ? restFuerKinder / kinder : 0;

    const ehebetrag = nachlass * ehequote;
    const kindbetrag = nachlass * kindquote;

    return [
      { label: 'Erbteil je Kind', value: kindbetrag, unit: '€', digits: 2, primary: true },
      { label: 'Quote je Kind', value: kindquote * 100, unit: '%', digits: 2 },
      { label: 'Erbteil Ehegatte', value: ehebetrag, unit: '€', digits: 2 },
      { label: 'Quote Ehegatte', value: ehequote * 100, unit: '%', digits: 2 },
    ];
  },
  intro:
    'Ohne Testament gilt die gesetzliche Erbfolge. Neben Kindern erbt der überlebende Ehegatte im gesetzlichen Güterstand der Zugewinngemeinschaft die Hälfte des Nachlasses (1/4 Erbteil plus 1/4 pauschaler Zugewinnausgleich); die andere Hälfte teilen sich die Kinder zu gleichen Teilen. Dieser Rechner deckt den häufigsten Fall (Ehegatte und Kinder erster Ordnung) ab und ist eine Orientierung – Sonderkonstellationen wie Erben zweiter Ordnung oder Stiefkinder sind nicht abgebildet.',
  howto: [
    'Nettowert des Nachlasses eingeben.',
    'Anzahl der erbenden Kinder angeben.',
    'Güterstand bzw. Vorhandensein eines Ehegatten wählen.',
    'Erbquoten und Beträge ablesen.',
  ],
  faq: [
    { q: 'Wie viel erbt der Ehegatte?', a: 'In der Zugewinngemeinschaft erbt der Ehegatte neben Kindern die Hälfte des Nachlasses: 1/4 als gesetzlicher Erbteil plus 1/4 als pauschaler Zugewinnausgleich (§ 1371 BGB).' },
    { q: 'Wie wird unter den Kindern aufgeteilt?', a: 'Die Kinder teilen sich den nach dem Ehegatten verbleibenden Anteil zu gleichen Teilen. Bei zwei Kindern und Zugewinngemeinschaft erhält also jedes Kind 1/4 des Nachlasses.' },
    { q: 'Was gilt ohne Ehegatten?', a: 'Sind keine Ehegatten vorhanden, erben die Kinder den gesamten Nachlass zu gleichen Teilen. Verstorbene Kinder werden durch ihre Abkömmlinge ersetzt (Erbfolge nach Stämmen).' },
    { q: 'Gilt das auch bei Gütertrennung?', a: 'Bei Gütertrennung entfällt der pauschale Zugewinnausgleich. Neben einem Kind erbt der Ehegatte die Hälfte, neben zwei oder mehr Kindern erben Ehegatte und Kinder zu gleichen Teilen.' },
  ],
  related: ['pflichtteil-rechner', 'erbschaftssteuer-rechner'],
  examples: [
    {
      values: { nachlass: 400000, kinder: 2, ehegatte: 'zugewinn' },
      expect: [
        { label: 'Quote Ehegatte', value: 50, tolerance: 0.01 },
        { label: 'Quote je Kind', value: 25, tolerance: 0.01 },
        { label: 'Erbteil je Kind', value: 100000, tolerance: 0.5 },
      ],
    },
    {
      values: { nachlass: 300000, kinder: 3, ehegatte: 'kein' },
      expect: [
        { label: 'Quote je Kind', value: 33.333, tolerance: 0.1 },
        { label: 'Erbteil je Kind', value: 100000, tolerance: 0.5 },
      ],
    },
  ],
  updated: '2026-06-18',
};
