import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'ueberstunden-rechner',
  category: 'beruf',
  title: 'Überstunden-Vergütung-Rechner',
  shortTitle: 'Überstunden',
  description:
    'Berechne den Wert deiner Überstunden: aus Monatsgehalt und Wochenstunden ergibt sich dein Stundensatz – plus optionalem Überstundenzuschlag und Gesamtvergütung.',
  keywords: [
    'überstunden rechner',
    'überstunden vergütung berechnen',
    'überstundenzuschlag',
    'überstunden auszahlen',
    'mehrarbeit berechnen',
    'überstunden wert',
    'überstundensatz',
  ],
  formula:
    'Überstundenwert = (Monatsgehalt ÷ (Wochenstunden × 4,33)) × (1 + Zuschlag%) × Überstunden',
  inputs: [
    { type: 'number', id: 'monatsgehalt', label: 'Brutto-Monatsgehalt', unit: '€', default: 3000, min: 0, step: 50 },
    { type: 'number', id: 'wochenstunden', label: 'Wochenarbeitszeit', unit: 'h', default: 40, min: 1, step: 0.5 },
    { type: 'number', id: 'ueberstunden', label: 'Überstunden im Monat', unit: 'h', default: 10, min: 0, step: 0.5 },
    { type: 'number', id: 'zuschlag', label: 'Überstundenzuschlag', unit: '%', default: 25, min: 0, max: 200, step: 5, help: 'Aufschlag laut Vertrag/Tarif. 0 % wenn nur der normale Stundensatz gezahlt wird.' },
  ],
  compute: (v) => {
    const monatsgehalt = num(v.monatsgehalt);
    const wochenstunden = num(v.wochenstunden);
    const ueberstunden = num(v.ueberstunden);
    const zuschlag = num(v.zuschlag);

    const monatsstunden = wochenstunden * 4.33;
    const stundensatz = monatsstunden > 0 ? monatsgehalt / monatsstunden : 0;
    const ueberstundensatz = stundensatz * (1 + zuschlag / 100);
    const verguetung = ueberstundensatz * ueberstunden;
    const zuschlagsanteil = stundensatz * (zuschlag / 100) * ueberstunden;

    return [
      { label: 'Überstundenvergütung', value: verguetung, unit: '€', digits: 2, primary: true },
      { label: 'Normaler Stundensatz', value: stundensatz, unit: '€', digits: 2 },
      { label: 'Stundensatz mit Zuschlag', value: ueberstundensatz, unit: '€', digits: 2 },
      { label: 'Davon Zuschlagsanteil', value: zuschlagsanteil, unit: '€', digits: 2 },
    ];
  },
  intro:
    'Überstunden werden oft mit einem Zuschlag vergütet – aber wie viel sind sie wert? Der Rechner ermittelt zunächst deinen Stundensatz aus Monatsgehalt und Wochenstunden und schlägt dann den vereinbarten Überstundenzuschlag auf. So siehst du sofort, was deine Mehrarbeit brutto bringt.',
  howto: [
    'Brutto-Monatsgehalt und vertragliche Wochenarbeitszeit eingeben.',
    'Anzahl der geleisteten Überstunden im Monat eintragen.',
    'Überstundenzuschlag in Prozent eingeben (laut Vertrag oder Tarif, sonst 0 %).',
    'Vergütung, Stundensatz und Zuschlagsanteil ablesen.',
  ],
  faq: [
    { q: 'Gibt es einen gesetzlichen Anspruch auf Überstundenzuschlag?', a: 'Nein, ein gesetzlicher Pauschalanspruch besteht in Deutschland nicht. Zuschläge ergeben sich aus Arbeitsvertrag, Betriebsvereinbarung oder Tarifvertrag. Häufig sind 25 % bis 50 %.' },
    { q: 'Wie wird der Stundensatz aus dem Monatsgehalt berechnet?', a: 'Das Monatsgehalt wird durch die durchschnittlichen Monatsstunden geteilt: Wochenstunden × 4,33 (52 Wochen ÷ 12 Monate).' },
    { q: 'Sind das Brutto- oder Nettowerte?', a: 'Die Berechnung erfolgt brutto. Vom ausgezahlten Betrag gehen noch Steuern und Sozialabgaben ab; der reine Überstundenlohn ist – anders als manche Nachtzuschläge – nicht steuerfrei.' },
    { q: 'Was, wenn Überstunden abgebummelt statt ausgezahlt werden?', a: 'Dann erhältst du keinen Geldbetrag, sondern Freizeit. Der berechnete Wert zeigt dir aber, welchen Gegenwert dein Freizeitausgleich hat.' },
    { q: 'Zählt der Zuschlag auf den vollen Satz oder nur extra?', a: 'Der Rechner gibt beide Werte aus: den vollen Stundensatz inklusive Zuschlag und separat den reinen Zuschlagsanteil.' },
  ],
  related: ['stundenlohn-rechner', 'nachtzuschlag-rechner', 'brutto-stundensatz-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { monatsgehalt: 3000, wochenstunden: 40, ueberstunden: 10, zuschlag: 25 },
      expect: [
        { label: 'Normaler Stundensatz', value: 17.32, tolerance: 0.05 },
        { label: 'Überstundenvergütung', value: 216.49, tolerance: 0.5 },
      ],
    },
  ],
};
