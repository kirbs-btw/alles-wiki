import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'pendler-spritkosten-rechner',
  category: 'auto',
  title: 'Pendler-Spritkosten-Rechner',
  shortTitle: 'Pendlerkosten',
  description:
    'Berechne deine monatlichen und jährlichen Spritkosten für den Arbeitsweg aus Entfernung, Arbeitstagen, Verbrauch und Spritpreis.',
  keywords: [
    'pendler spritkosten berechnen',
    'arbeitsweg kosten rechner',
    'spritkosten arbeitsweg',
    'pendeln kosten pro monat',
    'fahrtkosten arbeit rechner',
    'pendler benzinkosten',
  ],
  formula:
    'Monatskosten = einfache Entfernung × 2 × Arbeitstage × (Verbrauch/100) × Spritpreis',
  intro:
    'Wer täglich zur Arbeit pendelt, gibt schnell mehrere Hundert Euro im Monat für Kraftstoff aus. Dieser Rechner ermittelt die reinen Spritkosten für den Arbeitsweg – Hin- und Rückfahrt – pro Monat und Jahr.',
  inputs: [
    { type: 'number', id: 'entfernung', label: 'Einfache Entfernung', unit: 'km', default: 25, min: 0, step: 0.5, help: 'Eine Strecke zur Arbeit' },
    { type: 'number', id: 'tage', label: 'Arbeitstage pro Monat', unit: 'Tage', default: 20, min: 0, step: 1 },
    { type: 'number', id: 'verbrauch', label: 'Verbrauch', unit: 'l/100 km', default: 7, min: 0, step: 0.1 },
    { type: 'number', id: 'preis', label: 'Spritpreis', unit: 'EUR/l', default: 1.75, min: 0, step: 0.01 },
  ],
  compute: (v) => {
    const entfernung = num(v.entfernung);
    const tage = num(v.tage);
    const verbrauch = num(v.verbrauch);
    const preis = num(v.preis);
    const kmProTag = entfernung * 2;
    const kmProMonat = kmProTag * tage;
    const literProMonat = (kmProMonat * verbrauch) / 100;
    const kostenProMonat = literProMonat * preis;
    const kostenProTag = (kmProTag * verbrauch / 100) * preis;
    const kostenProJahr = kostenProMonat * 12;
    return [
      { label: 'Spritkosten pro Monat', value: kostenProMonat, unit: 'EUR', digits: 2, primary: true },
      { label: 'Spritkosten pro Jahr', value: kostenProJahr, unit: 'EUR', digits: 2 },
      { label: 'Spritkosten pro Arbeitstag', value: kostenProTag, unit: 'EUR', digits: 2 },
      { label: 'Kilometer pro Monat', value: kmProMonat, unit: 'km', digits: 0 },
    ];
  },
  howto: [
    'Einfache Entfernung zur Arbeit eintragen (Hin- und Rückweg werden automatisch verdoppelt).',
    'Arbeitstage pro Monat angeben.',
    'Durchschnittsverbrauch des Fahrzeugs erfassen.',
    'Aktuellen Spritpreis ergänzen und Monatskosten ablesen.',
  ],
  faq: [
    { q: 'Was ist mit der Entfernungspauschale?', a: 'Dieser Rechner zeigt die reinen Spritkosten. Die steuerliche Entfernungspauschale (Pendlerpauschale) reduziert nur die Steuerlast und ist hier nicht berücksichtigt.' },
    { q: 'Sind das die echten Fahrtkosten?', a: 'Nein, nur die Kraftstoffkosten. Verschleiß, Wartung, Reifen und Wertverlust kommen hinzu – diese erfasst der Rechner Kosten pro km vollständiger.' },
    { q: 'Wie viele Arbeitstage soll ich ansetzen?', a: 'Bei einer 5-Tage-Woche sind rund 20 bis 21 Arbeitstage pro Monat realistisch, nach Abzug von Urlaub und Feiertagen.' },
  ],
  related: ['spritkosten-rechner', 'kosten-pro-km-rechner', 'durchschnittsverbrauch-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { entfernung: 25, tage: 20, verbrauch: 7, preis: 1.75 },
      // km/Monat = 25*2*20 = 1000; Liter = 70; Kosten = 122.5
      expect: [{ label: 'Spritkosten pro Monat', value: 122.5, tolerance: 0.05 }],
    },
    {
      values: { entfernung: 40, tage: 21, verbrauch: 6, preis: 1.8 },
      // km = 40*2*21 = 1680; Liter = 100.8; Kosten = 181.44; *12 = 2177.28
      expect: [{ label: 'Spritkosten pro Jahr', value: 2177.28, tolerance: 0.1 }],
    },
  ],
};
