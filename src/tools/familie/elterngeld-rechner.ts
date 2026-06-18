import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

// Vereinfachte Basiselterngeld-Näherung:
// 65 % des durchschnittlichen Netto vor der Geburt, gedeckelt auf 1.800 €,
// mindestens 300 €. Bei niedrigem Netto steigt die Ersatzrate (bis 100 %),
// das wird hier als Näherung über eine Staffel abgebildet.
const MIN = 300;
const MAX = 1800;

function ersatzrate(netto: number): number {
  // Unter 1.000 €: Rate steigt von 65 % auf bis zu 100 %
  // (je 2 € unter 1.000 € steigt die Rate um 0,1 Prozentpunkte).
  if (netto >= 1000) return 0.65;
  const aufschlag = ((1000 - netto) / 2) * 0.1; // in Prozentpunkten
  const rate = 65 + aufschlag;
  return Math.min(rate, 100) / 100;
}

export const tool: Tool = {
  slug: 'elterngeld-rechner',
  category: 'familie',
  title: 'Elterngeld-Rechner (Basiselterngeld)',
  shortTitle: 'Elterngeld',
  description:
    'Schätze das monatliche Basiselterngeld als 65 % des Netto vor der Geburt – gedeckelt auf 1.800 €, mindestens 300 €. Vereinfachte Näherung.',
  keywords: [
    'elterngeld rechner',
    'elterngeld berechnen',
    'basiselterngeld',
    'wie viel elterngeld',
    'elterngeld 65 prozent',
    'elterngeld netto',
    'elterngeld höhe',
  ],
  intro:
    'Das Basiselterngeld ersetzt rund 65 % des wegfallenden Nettoeinkommens, höchstens 1.800 € und mindestens 300 € pro Monat. Bei niedrigem Einkommen steigt die Ersatzrate auf bis zu 100 %. Dieser Rechner liefert eine vereinfachte Näherung – die genaue Höhe richtet sich nach dem amtlichen Bemessungseinkommen (Stand 2026).',
  formula: 'Elterngeld ≈ Ersatzrate × Netto (Rate 65 % ab 1.000 €, sonst höher); gedeckelt 300–1.800 €',
  inputs: [
    { type: 'number', id: 'netto', label: 'Netto vor der Geburt', unit: '€/Monat', default: 2000, min: 0, max: 10000, step: 50, help: 'Durchschnittliches Nettoeinkommen der letzten 12 Monate' },
    { type: 'number', id: 'monate', label: 'Bezugsmonate', unit: 'Monate', default: 12, min: 1, max: 14, step: 1 },
  ],
  compute: (v) => {
    const netto = Math.max(0, num(v.netto, 2000));
    let monate = Math.round(num(v.monate, 12));
    if (monate < 1) monate = 1;
    if (monate > 14) monate = 14;
    const rate = ersatzrate(netto);
    let elterngeld = netto * rate;
    if (elterngeld > MAX) elterngeld = MAX;
    if (elterngeld < MIN) elterngeld = MIN;
    const gesamt = elterngeld * monate;
    return [
      { label: 'Elterngeld pro Monat', value: elterngeld, unit: '€', digits: 2, primary: true },
      { label: 'Ersatzrate', value: rate * 100, unit: '%', digits: 1 },
      { label: 'Gesamt über Bezugsdauer', value: gesamt, unit: '€', digits: 2 },
    ];
  },
  howto: [
    'Durchschnittliches Nettoeinkommen der 12 Monate vor der Geburt eingeben.',
    'Geplante Anzahl der Bezugsmonate wählen (1 bis 14).',
    'Geschätztes monatliches Elterngeld ablesen.',
    'Für die verbindliche Höhe den Antrag bei der Elterngeldstelle stellen.',
  ],
  faq: [
    { q: 'Wie hoch ist das Elterngeld?', a: 'Das Basiselterngeld beträgt rund 65 % des Nettoeinkommens vor der Geburt, höchstens 1.800 € und mindestens 300 € pro Monat. Bei niedrigem Einkommen steigt die Ersatzrate.' },
    { q: 'Was ist der Mindestbetrag?', a: 'Auch ohne vorheriges Einkommen gibt es mindestens 300 € Basiselterngeld pro Monat – etwa für Studierende oder nicht erwerbstätige Eltern.' },
    { q: 'Wie genau ist diese Schätzung?', a: 'Es ist eine vereinfachte Näherung. Die amtliche Berechnung berücksichtigt Steuern, Sozialabgaben, Geschwisterbonus und Sonderfälle. Maßgeblich ist der Bescheid der Elterngeldstelle (Stand 2026).' },
    { q: 'Was ist ElterngeldPlus?', a: 'ElterngeldPlus halbiert in der Regel den monatlichen Betrag, kann dafür aber doppelt so lange bezogen werden. Dieser Rechner bildet nur das Basiselterngeld ab.' },
    { q: 'Gibt es einen Geschwisterbonus?', a: 'Ja. Bei weiteren kleinen Kindern im Haushalt kann sich das Elterngeld um 10 %, mindestens 75 €, erhöhen. Das ist hier nicht eingerechnet.' },
  ],
  related: ['kindergeld-rechner', 'kosten-kind-rechner', 'netto-vom-brutto-rechner'],
  examples: [
    {
      values: { netto: 2000, monate: 12 },
      expect: [
        { label: 'Elterngeld pro Monat', value: 1300, tolerance: 0.01 },
        { label: 'Gesamt über Bezugsdauer', value: 15600, tolerance: 0.01 },
      ],
    },
    {
      values: { netto: 3500, monate: 12 },
      expect: [{ label: 'Elterngeld pro Monat', value: 1800, tolerance: 0.01 }],
    },
  ],
  updated: '2026-06-18',
};
