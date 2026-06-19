import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

// Gebührentabelle Anlage 2 zu § 13 RVG (1,0-Gebühr je Gegenstandswert, Stand 2026).
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
  return 1279;
}

export const tool: Tool = {
  slug: 'abmahnung-streitwert-rechner',
  category: 'recht',
  title: 'Abmahnung-Streitwert-Rechner (Abmahnkosten)',
  shortTitle: 'Abmahnkosten',
  description:
    'Berechne die erstattungsfähigen Abmahnkosten aus dem Gegenstandswert: 1,3-Geschäftsgebühr nach RVG plus Auslagenpauschale (Unterlassung, Orientierung Stand 2026).',
  keywords: [
    'abmahnung streitwert rechner',
    'abmahnkosten berechnen',
    'gegenstandswert abmahnung',
    'unterlassung streitwert',
    'abmahnung anwaltskosten',
    'abmahngebühren höhe',
  ],
  formula: 'Abmahnkosten = 1,3 × 1,0-Gebühr (RVG) zum Gegenstandswert + Auslagenpauschale (max. 20 €)',
  inputs: [
    { type: 'number', id: 'gegenstandswert', label: 'Gegenstandswert', unit: '€', default: 5000, min: 0, step: 500, help: 'Wert des Unterlassungsanspruchs – bei Filesharing oft 1.000 €, bei Wettbewerbsverstößen meist mehrere Tausend Euro.' },
    {
      type: 'select', id: 'faktor', label: 'Geschäftsgebühr', default: '1.3',
      options: [
        { value: '0.5', label: '0,5 (einfaches Schreiben)' },
        { value: '1.3', label: '1,3 (Regelfall Abmahnung)' },
        { value: '1.5', label: '1,5 (umfangreich/schwierig)' },
      ],
    },
  ],
  compute: (v) => {
    const gegenstandswert = num(v.gegenstandswert);
    const faktor = num(v.faktor, 1.3);
    const einfach = rvgEinfacheGebuehr(gegenstandswert);
    const geschaeftsgebuehr = faktor * einfach;
    const pauschale = Math.min(geschaeftsgebuehr * 0.2, 20);
    const kosten = geschaeftsgebuehr + pauschale;
    return [
      { label: 'Abmahnkosten (netto)', value: kosten, unit: '€', digits: 2, primary: true },
      { label: 'Geschäftsgebühr', value: geschaeftsgebuehr, unit: '€', digits: 2 },
      { label: 'Auslagenpauschale', value: pauschale, unit: '€', digits: 2 },
      { label: 'Einfache Gebühr (1,0)', value: einfach, unit: '€', digits: 2 },
    ];
  },
  intro:
    'Wer abgemahnt wird, soll die Anwaltskosten der berechtigten Abmahnung erstatten. Maßgeblich ist der Gegenstandswert des Unterlassungsanspruchs; daraus ergibt sich über die RVG-Tabelle eine Geschäftsgebühr, im Regelfall mit dem Faktor 1,3. Hinzu kommt eine Auslagenpauschale von höchstens 20 €. Dieser Rechner liefert eine Orientierung ohne Umsatzsteuer (Stand 2026). Bei Filesharing-Abmahnungen ist der Gegenstandswert für Privatpersonen vielfach auf 1.000 € gedeckelt (§ 97a UrhG).',
  howto: [
    'Gegenstandswert des Unterlassungsanspruchs eingeben.',
    'Gebührensatz wählen – meist 1,3.',
    'Erstattungsfähige Abmahnkosten ablesen (ohne USt).',
  ],
  faq: [
    { q: 'Wie hoch sind die Kosten einer Abmahnung?', a: 'Sie richten sich nach dem Gegenstandswert und der RVG-Tabelle. Üblich ist eine 1,3-Geschäftsgebühr zuzüglich einer Auslagenpauschale von höchstens 20 € – ohne Umsatzsteuer.' },
    { q: 'Was ist der Gegenstandswert?', a: 'Der Gegenstandswert beziffert das wirtschaftliche Interesse an der Unterlassung. Er wird geschätzt und kann je nach Verstoß stark schwanken – von 1.000 € bei privatem Filesharing bis zu mehreren Zehntausend Euro im Wettbewerbsrecht.' },
    { q: 'Gibt es eine Deckelung bei Filesharing?', a: 'Ja. Für Privatpersonen ist der Gegenstandswert bei urheberrechtlichen Abmahnungen regelmäßig auf 1.000 € begrenzt (§ 97a Abs. 3 UrhG), was die erstattungsfähigen Anwaltskosten deutlich senkt.' },
    { q: 'Muss ich die Abmahnkosten zahlen?', a: 'Nur bei einer berechtigten Abmahnung. Ist die Abmahnung unbegründet oder die Forderung überhöht, müssen die geltend gemachten Kosten nicht oder nur teilweise erstattet werden. Eine Unterlassungserklärung sollte nicht voreilig unterschrieben werden.' },
  ],
  related: ['streitwert-rechner', 'anwaltskosten-rechner', 'gegenstandswert-gebuehr-rechner'],
  examples: [
    {
      values: { gegenstandswert: 5000, faktor: '1.3' },
      expect: [
        { label: 'Einfache Gebühr (1,0)', value: 334, tolerance: 0.5 },
        { label: 'Geschäftsgebühr', value: 434.2, tolerance: 0.5 },
        { label: 'Abmahnkosten (netto)', value: 454.2, tolerance: 0.5 },
      ],
    },
    {
      values: { gegenstandswert: 1000, faktor: '1.3' },
      expect: [
        { label: 'Geschäftsgebühr', value: 114.4, tolerance: 0.5 },
        { label: 'Abmahnkosten (netto)', value: 134.4, tolerance: 0.5 },
      ],
    },
  ],
  updated: '2026-06-19',
};
