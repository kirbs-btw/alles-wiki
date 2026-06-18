import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'zeit-umrechner',
  category: 'alltag',
  title: 'Zeit umrechnen (Stunden, Minuten, Sekunden)',
  shortTitle: 'Zeit-Umrechner',
  description:
    'Rechne eine Zeitdauer zwischen Stunden, Minuten und Sekunden um. Gib einen Wert in einer Einheit ein und erhalte die Dauer in allen drei Einheiten.',
  keywords: [
    'zeit umrechnen',
    'stunden in minuten',
    'minuten in sekunden',
    'sekunden in stunden',
    'zeiteinheiten umrechner',
    'dauer berechnen',
  ],
  formula:
    'Basis Sekunden: h = ×3600, min = ×60. Ausgabe h = s/3600, min = s/60, s = s',
  inputs: [
    {
      type: 'number',
      id: 'wert',
      label: 'Zeitwert',
      default: 2.5,
      min: 0,
      step: 0.1,
    },
    {
      type: 'select',
      id: 'einheit',
      label: 'Eingabe-Einheit',
      default: 'stunden',
      options: [
        { value: 'stunden', label: 'Stunden' },
        { value: 'minuten', label: 'Minuten' },
        { value: 'sekunden', label: 'Sekunden' },
      ],
    },
  ],
  compute: (v) => {
    const wert = num(v.wert);
    const einheit = String(v.einheit || 'stunden');
    let sek: number;
    if (einheit === 'stunden') sek = wert * 3600;
    else if (einheit === 'minuten') sek = wert * 60;
    else sek = wert;
    const stunden = sek / 3600;
    const minuten = sek / 60;
    // Aufteilung h:min:s
    const ganzeStd = Math.floor(sek / 3600);
    const restMin = Math.floor((sek - ganzeStd * 3600) / 60);
    const restSek = Math.round(sek - ganzeStd * 3600 - restMin * 60);
    const formatiert = `${ganzeStd} h ${restMin} min ${restSek} s`;
    return [
      { label: 'Stunden', value: stunden, unit: 'h', digits: 4, primary: true },
      { label: 'Minuten', value: minuten, unit: 'min', digits: 2 },
      { label: 'Sekunden', value: sek, unit: 's', digits: 0 },
      { label: 'Aufgeteilt', value: formatiert, unit: '' },
    ];
  },
  intro:
    'Zeitdauern werden je nach Kontext in Stunden, Minuten oder Sekunden angegeben. Dieser Rechner wandelt einen Wert in alle drei Einheiten um und zeigt zusätzlich die aufgeteilte Schreibweise als Stunden, Minuten und Sekunden. So lassen sich z. B. Trainingszeiten, Garzeiten oder Arbeitsdauern schnell vergleichen.',
  howto: [
    'Gib den Zeitwert als Dezimalzahl ein (2,5 Stunden = 2 Stunden 30 Minuten).',
    'Wähle die Einheit deiner Eingabe.',
    'Lies die Dauer in Stunden, Minuten und Sekunden sowie in aufgeteilter Form ab.',
  ],
  faq: [
    { q: 'Wie schreibe ich 2 Stunden 30 Minuten als Dezimalzahl?', a: 'Als 2,5 Stunden. 30 Minuten sind eine halbe Stunde, also 0,5.' },
    { q: 'Wie viele Sekunden hat eine Stunde?', a: 'Eine Stunde hat 60 Minuten zu je 60 Sekunden, also 3.600 Sekunden.' },
    { q: 'Wofür ist die aufgeteilte Anzeige gut?', a: 'Sie zeigt die Dauer wie auf einer Uhr in vollen Stunden, Minuten und Sekunden – ideal für Timer oder Ablaufpläne.' },
  ],
  related: ['geschwindigkeit-umrechner', 'fahrenheit-celsius-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { wert: 2.5, einheit: 'stunden' },
      expect: [
        { label: 'Minuten', value: 150, tolerance: 0.01 },
        { label: 'Sekunden', value: 9000, tolerance: 0.5 },
      ],
    },
    {
      values: { wert: 90, einheit: 'minuten' },
      expect: [
        { label: 'Stunden', value: 1.5, tolerance: 0.001 },
        { label: 'Sekunden', value: 5400, tolerance: 0.5 },
      ],
    },
  ],
};
