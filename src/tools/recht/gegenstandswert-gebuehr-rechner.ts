import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

// Gebührentabelle Anlage 2 zu § 13 RVG (1,0-Gebühr je Gegenstandswert, Stand 2026)
function rvgEinfacheGebuehr(wert: number): number {
  if (wert <= 0) return 0;
  const stufen: { bis: number; gebuehr: number }[] = [
    { bis: 500, gebuehr: 49 },
    { bis: 1000, gebuehr: 88 },
    { bis: 1500, gebuehr: 127 },
    { bis: 2000, gebuehr: 166 },
    { bis: 3000, gebuehr: 222 },
    { bis: 4000, gebuehr: 278 },
    { bis: 5000, gebuehr: 334 },
    { bis: 6000, gebuehr: 390 },
    { bis: 7000, gebuehr: 446 },
    { bis: 8000, gebuehr: 502 },
    { bis: 9000, gebuehr: 558 },
    { bis: 10000, gebuehr: 614 },
    { bis: 13000, gebuehr: 666 },
    { bis: 16000, gebuehr: 718 },
    { bis: 19000, gebuehr: 770 },
    { bis: 22000, gebuehr: 822 },
    { bis: 25000, gebuehr: 874 },
    { bis: 30000, gebuehr: 955 },
    { bis: 35000, gebuehr: 1036 },
    { bis: 40000, gebuehr: 1117 },
    { bis: 45000, gebuehr: 1198 },
    { bis: 50000, gebuehr: 1279 },
  ];
  for (const s of stufen) {
    if (wert <= s.bis) return s.gebuehr;
  }
  const ueber = wert - 50000;
  const stufen10k = Math.ceil(ueber / 10000);
  return 1279 + stufen10k * 137;
}

export const tool: Tool = {
  slug: 'gegenstandswert-gebuehr-rechner',
  category: 'recht',
  title: 'Gegenstandswert-Gebühr-Rechner (1,0-Gebühr nach RVG)',
  shortTitle: 'RVG-Gebühr',
  description:
    'Ermittle die volle 1,0-Gebühr nach der RVG-Tabelle (Anlage 2) zu einem Gegenstandswert – die Basis aller wertabhängigen Anwaltsgebühren (Stand 2026).',
  keywords: [
    'gegenstandswert gebühr rechner',
    'rvg tabelle 1,0 gebühr',
    'rvg gebühr berechnen',
    'gegenstandswert anwaltsgebühr',
    'volle gebühr rvg',
    'anwaltsgebühr tabelle',
  ],
  formula: '1,0-Gebühr = RVG-Tabelle (Anlage 2 zu § 13 RVG); Gebühr = Faktor × 1,0-Gebühr',
  inputs: [
    { type: 'number', id: 'wert', label: 'Gegenstandswert', unit: '€', default: 5000, min: 0, step: 100, help: 'Wirtschaftlicher Wert der Angelegenheit.' },
    { type: 'number', id: 'faktor', label: 'Gebührensatz (Faktor)', unit: '', default: 1.0, min: 0, max: 5, step: 0.1, help: 'Z. B. 1,3 für die Geschäftsgebühr oder 1,2 für die Terminsgebühr.' },
  ],
  compute: (v) => {
    const wert = num(v.wert);
    const faktor = num(v.faktor, 1.0);
    const einfach = rvgEinfacheGebuehr(wert);
    const gebuehr = faktor * einfach;
    return [
      { label: 'Gebühr (Faktor × 1,0)', value: gebuehr, unit: '€', digits: 2, primary: true },
      { label: '1,0-Gebühr (volle Gebühr)', value: einfach, unit: '€', digits: 2 },
      { label: 'angesetzter Faktor', value: faktor, digits: 2 },
    ];
  },
  intro:
    'Fast alle Anwalts- und Gerichtsgebühren leiten sich aus der vollen Gebühr (dem 1,0-Satz) zum jeweiligen Gegenstandswert ab. Die RVG-Tabelle (Anlage 2 zu § 13 RVG) ordnet jedem Wert eine feste Gebühr zu; die einzelnen Gebühren entstehen als Vielfaches davon. Mit diesem Rechner ermittelst du schnell die 1,0-Gebühr und beliebige Gebührensätze (Stand 2026). Auslagen und Umsatzsteuer sind nicht enthalten.',
  howto: [
    'Gegenstandswert eingeben.',
    'Gewünschten Gebührensatz angeben (z. B. 1,3).',
    'Volle Gebühr und die zum Faktor passende Gebühr ablesen.',
  ],
  faq: [
    { q: 'Was ist die 1,0-Gebühr?', a: 'Die 1,0-Gebühr (volle Gebühr) ist der in der RVG-Tabelle zu einem Gegenstandswert festgelegte Grundbetrag. Konkrete Gebühren wie die Verfahrens- oder Geschäftsgebühr ergeben sich als Vielfaches dieser vollen Gebühr.' },
    { q: 'Welche Faktoren sind üblich?', a: 'Häufig sind 1,3 (Verfahrens- und Geschäftsgebühr), 1,2 (Terminsgebühr) und 1,0 (Einigungsgebühr). Der zutreffende Satz ergibt sich aus dem Vergütungsverzeichnis (VV RVG).' },
    { q: 'Sind hier Auslagen enthalten?', a: 'Nein. Dieser Rechner gibt nur die reine Gebühr aus. Auslagenpauschale (max. 20 €) und 19 % Umsatzsteuer kommen je nach Fall noch hinzu.' },
    { q: 'Gilt die Tabelle auch über 50.000 €?', a: 'Ja, sie wird stufenweise fortgeschrieben. Oberhalb von 50.000 € verwendet dieser Rechner eine Näherung; bei sehr hohen Werten lohnt der Blick in die amtliche Tabelle.' },
  ],
  related: ['anwaltskosten-rechner', 'rvg-prozesskosten-rechner', 'streitwert-rechner'],
  examples: [
    {
      values: { wert: 5000, faktor: 1.3 },
      expect: [
        { label: '1,0-Gebühr (volle Gebühr)', value: 334, tolerance: 0.5 },
        { label: 'Gebühr (Faktor × 1,0)', value: 434.2, tolerance: 0.5 },
      ],
    },
    {
      values: { wert: 10000, faktor: 1.0 },
      expect: [
        { label: '1,0-Gebühr (volle Gebühr)', value: 614, tolerance: 0.5 },
        { label: 'Gebühr (Faktor × 1,0)', value: 614, tolerance: 0.5 },
      ],
    },
  ],
  updated: '2026-06-18',
};
