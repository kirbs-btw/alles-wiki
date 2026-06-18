import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

// Gebührentabelle Anlage 2 zu § 13 RVG (vereinfacht, Stand 2026):
// einfache Gebühr (1,0) je Gegenstandswert.
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
  // Über 50.000 € bis 200.000 €: je angefangene 10.000 € rund 137 € mehr (Näherung).
  const ueber = wert - 50000;
  const stufen10k = Math.ceil(ueber / 10000);
  return 1279 + stufen10k * 137;
}

export const tool: Tool = {
  slug: 'anwaltskosten-rechner',
  category: 'recht',
  title: 'Anwaltskosten-Rechner (RVG, außergerichtlich)',
  shortTitle: 'Anwaltskosten',
  description:
    'Schätze die außergerichtlichen Anwaltskosten nach RVG aus dem Gegenstandswert: Geschäftsgebühr plus Auslagenpauschale und Umsatzsteuer (Stand 2026).',
  keywords: [
    'anwaltskosten rechner',
    'rvg rechner',
    'anwaltsgebühren berechnen',
    'gegenstandswert anwalt',
    'geschäftsgebühr 1,3',
    'kosten anwalt außergerichtlich',
    'rvg tabelle',
  ],
  formula: 'Kosten = (Faktor × einfache Gebühr + 20 €-Pauschale (max. 20 €)) × 1,19',
  inputs: [
    { type: 'number', id: 'wert', label: 'Gegenstandswert', unit: '€', default: 5000, min: 0, step: 100, help: 'Wirtschaftlicher Wert der Angelegenheit.' },
    {
      type: 'select', id: 'faktor', label: 'Geschäftsgebühr', default: '1.3',
      options: [
        { value: '0.5', label: '0,5 (einfaches Schreiben)' },
        { value: '1.3', label: '1,3 (Regelgebühr)' },
        { value: '1.5', label: '1,5 (umfangreich/schwierig)' },
        { value: '2.5', label: '2,5 (Höchstsatz)' },
      ],
    },
    {
      type: 'select', id: 'ust', label: 'Umsatzsteuer', default: 'ja',
      options: [
        { value: 'ja', label: 'mit 19 % USt' },
        { value: 'nein', label: 'ohne USt (vorsteuerabzugsberechtigt)' },
      ],
    },
  ],
  compute: (v) => {
    const wert = num(v.wert);
    const faktor = num(v.faktor, 1.3);
    const einfach = rvgEinfacheGebuehr(wert);
    const geschaeftsgebuehr = faktor * einfach;
    // Auslagenpauschale: 20 % der Gebühr, höchstens 20 € (Nr. 7002 VV RVG).
    const pauschale = Math.min(geschaeftsgebuehr * 0.2, 20);
    const netto = geschaeftsgebuehr + pauschale;
    const mitUst = String(v.ust) !== 'nein';
    const brutto = mitUst ? netto * 1.19 : netto;
    return [
      { label: 'Anwaltskosten gesamt', value: brutto, unit: '€', digits: 2, primary: true },
      { label: 'Geschäftsgebühr (netto)', value: geschaeftsgebuehr, unit: '€', digits: 2 },
      { label: 'Auslagenpauschale', value: pauschale, unit: '€', digits: 2 },
    ];
  },
  intro:
    'Anwaltsgebühren bemessen sich bei wertabhängigen Angelegenheiten nach dem Gegenstandswert und der Gebührentabelle des RVG. Außergerichtlich fällt typischerweise eine Geschäftsgebühr von 1,3 an, dazu kommen eine Auslagenpauschale von höchstens 20 € und die Umsatzsteuer. Dieser Rechner liefert eine vereinfachte Näherung (Stand 2026) und ersetzt kein verbindliches Angebot des Anwalts.',
  howto: [
    'Gegenstandswert eingeben (z. B. die Höhe der Forderung).',
    'Gebührensatz wählen – die Regelgebühr ist 1,3.',
    'Angeben, ob Umsatzsteuer anfällt.',
    'Gesamtkosten ablesen – gerichtliche Verfahren verursachen zusätzliche Gebühren.',
  ],
  faq: [
    { q: 'Was ist die Geschäftsgebühr?', a: 'Sie deckt die außergerichtliche Tätigkeit des Anwalts ab. Der Regelsatz ist 1,3; nur bei umfangreichen oder schwierigen Sachen darf mehr als 1,3 berechnet werden.' },
    { q: 'Wie hoch ist die Auslagenpauschale?', a: 'Für Post und Telekommunikation darf der Anwalt 20 % der Gebühren ansetzen, höchstens jedoch 20 € (Nr. 7002 VV RVG).' },
    { q: 'Fällt immer Umsatzsteuer an?', a: 'Auf Anwaltsleistungen werden in der Regel 19 % Umsatzsteuer berechnet. Vorsteuerabzugsberechtigte Unternehmen können sie sich erstatten lassen – stelle dafür „ohne USt" ein.' },
    { q: 'Sind das auch die Kosten bei Gericht?', a: 'Nein. Im Gerichtsverfahren entstehen weitere Gebühren (Verfahrens- und Terminsgebühr) sowie Gerichtskosten. Nutze dafür zusätzlich unseren Gerichtskosten-Rechner.' },
    { q: 'Geht es auch ohne Gegenstandswert?', a: 'Ja, Anwalt und Mandant können stattdessen eine Vergütungsvereinbarung (Stundensatz oder Pauschale) treffen. Dann gelten die RVG-Werte nur als Untergrenze in gerichtlichen Verfahren.' },
  ],
  related: ['gerichtskosten-rechner', 'verzugszinsen-rechner', 'mahngebuehren-rechner'],
  examples: [
    {
      values: { wert: 5000, faktor: '1.3', ust: 'ja' },
      expect: [
        { label: 'Geschäftsgebühr (netto)', value: 434.2, tolerance: 0.5 },
        { label: 'Auslagenpauschale', value: 20, tolerance: 0.01 },
        { label: 'Anwaltskosten gesamt', value: 540.6, tolerance: 1 },
      ],
    },
    {
      values: { wert: 1000, faktor: '1.3', ust: 'nein' },
      expect: [
        { label: 'Geschäftsgebühr (netto)', value: 114.4, tolerance: 0.5 },
      ],
    },
  ],
  updated: '2026-06-18',
};
