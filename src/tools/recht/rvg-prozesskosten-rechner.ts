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
  slug: 'rvg-prozesskosten-rechner',
  category: 'recht',
  title: 'RVG-Prozesskosten-Rechner (Anwalt im Gerichtsverfahren)',
  shortTitle: 'RVG Prozess',
  description:
    'Schätze die Anwaltskosten im erstinstanzlichen Zivilprozess nach RVG: Verfahrensgebühr 1,3 plus Terminsgebühr 1,2, Auslagenpauschale und Umsatzsteuer (Stand 2026).',
  keywords: [
    'rvg prozesskosten rechner',
    'anwaltskosten gerichtsverfahren',
    'verfahrensgebühr terminsgebühr',
    'rvg klage kosten',
    'prozessgebühren anwalt',
    'rvg rechner gericht',
  ],
  formula: 'Kosten = ((1,3 + 1,2) × 1,0-Gebühr + 20 €-Pauschale (max. 20 €)) × 1,19',
  inputs: [
    { type: 'number', id: 'wert', label: 'Gegenstandswert / Streitwert', unit: '€', default: 5000, min: 0, step: 100, help: 'Wert der eingeklagten Forderung.' },
    {
      type: 'select', id: 'termin', label: 'Mündliche Verhandlung', default: 'ja',
      options: [
        { value: 'ja', label: 'mit Termin (Terminsgebühr 1,2)' },
        { value: 'nein', label: 'ohne Termin (z. B. schriftliches Verfahren)' },
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
    const einfach = rvgEinfacheGebuehr(wert);
    const verfahrensgebuehr = 1.3 * einfach;
    const mitTermin = String(v.termin) !== 'nein';
    const terminsgebuehr = mitTermin ? 1.2 * einfach : 0;
    const gebuehren = verfahrensgebuehr + terminsgebuehr;
    const pauschale = Math.min(gebuehren * 0.2, 20);
    const netto = gebuehren + pauschale;
    const mitUst = String(v.ust) !== 'nein';
    const brutto = mitUst ? netto * 1.19 : netto;
    return [
      { label: 'Anwaltskosten gesamt', value: brutto, unit: '€', digits: 2, primary: true },
      { label: 'Verfahrensgebühr (1,3)', value: verfahrensgebuehr, unit: '€', digits: 2 },
      { label: 'Terminsgebühr (1,2)', value: terminsgebuehr, unit: '€', digits: 2 },
      { label: 'Auslagenpauschale', value: pauschale, unit: '€', digits: 2 },
    ];
  },
  intro:
    'Im erstinstanzlichen Zivilprozess fallen für den eigenen Anwalt regelmäßig zwei wertabhängige Gebühren an: die Verfahrensgebühr (Regelsatz 1,3) und die Terminsgebühr (1,2) für die Wahrnehmung des Termins. Hinzu kommen die Auslagenpauschale (höchstens 20 €) und die Umsatzsteuer. Dieser Rechner liefert eine vereinfachte Näherung nach RVG (Stand 2026); Gerichtskosten und die Kosten der Gegenseite sind nicht enthalten.',
  howto: [
    'Streitwert eingeben.',
    'Angeben, ob eine mündliche Verhandlung stattfindet.',
    'Umsatzsteuer wählen.',
    'Anwaltskosten ablesen – für die Gerichtsgebühren zusätzlich den Gerichtskosten-Rechner nutzen.',
  ],
  faq: [
    { q: 'Was ist die Terminsgebühr?', a: 'Die Terminsgebühr (Satz 1,2) entsteht für die Vertretung in der mündlichen Verhandlung oder bei bestimmten Besprechungen. Ohne Termin – etwa im schriftlichen Verfahren oder bei früher Erledigung – kann sie entfallen.' },
    { q: 'Sind das schon alle Prozesskosten?', a: 'Nein. Zu den Anwaltskosten kommen die Gerichtskosten (in der Regel 3,0 Gebühren) sowie bei Unterliegen die Kosten des gegnerischen Anwalts. Eine Gesamtschau bietet der Prozesskostenrisiko-Rechner.' },
    { q: 'Gibt es eine Einigungsgebühr?', a: 'Wird der Streit durch einen Vergleich beendet, fällt zusätzlich eine Einigungsgebühr (regelmäßig 1,0) an. Diese ist hier nicht berücksichtigt.' },
    { q: 'Was bedeutet die 1,3-Verfahrensgebühr?', a: 'Die Verfahrensgebühr deckt das Betreiben des Geschäfts vor Gericht ab. Der Regelsatz beträgt 1,3 der vollen Gebühr aus der RVG-Tabelle für den jeweiligen Streitwert.' },
  ],
  related: ['anwaltskosten-rechner', 'gerichtskosten-rechner', 'prozesskostenrisiko-rechner'],
  examples: [
    {
      values: { wert: 5000, termin: 'ja', ust: 'ja' },
      expect: [
        { label: 'Verfahrensgebühr (1,3)', value: 434.2, tolerance: 0.5 },
        { label: 'Terminsgebühr (1,2)', value: 400.8, tolerance: 0.5 },
        { label: 'Anwaltskosten gesamt', value: 1017.45, tolerance: 1 },
      ],
    },
    {
      values: { wert: 1000, termin: 'nein', ust: 'nein' },
      expect: [
        { label: 'Verfahrensgebühr (1,3)', value: 114.4, tolerance: 0.5 },
        { label: 'Terminsgebühr (1,2)', value: 0, tolerance: 0.01 },
      ],
    },
  ],
  updated: '2026-06-18',
};
