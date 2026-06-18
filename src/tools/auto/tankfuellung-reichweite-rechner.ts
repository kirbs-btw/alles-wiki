import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'tankfuellung-reichweite-rechner',
  category: 'auto',
  title: 'Tankfüllung-Reichweite-Rechner',
  shortTitle: 'Tankreichweite',
  description:
    'Berechne die Reichweite einer Tankfüllung aus Tankvolumen und Verbrauch – inklusive Restreichweite und Kosten der Füllung.',
  keywords: [
    'tankfüllung reichweite berechnen',
    'reichweite tank rechner',
    'wie weit mit einer tankfüllung',
    'restreichweite berechnen',
    'tankvolumen reichweite',
    'reichweite restmenge tank',
  ],
  formula:
    'Reichweite = (Tankinhalt / Verbrauch je 100 km) × 100',
  intro:
    'Wie weit komme ich mit einer Tankfüllung? Dieser Rechner ermittelt die Gesamtreichweite aus Tankvolumen und Verbrauch und zeigt zusätzlich, wie weit die aktuell verbliebene Restmenge noch reicht.',
  inputs: [
    { type: 'number', id: 'tankvolumen', label: 'Tankvolumen', unit: 'l', default: 55, min: 0, step: 1 },
    { type: 'number', id: 'verbrauch', label: 'Verbrauch', unit: 'l/100 km', default: 7, min: 0.1, step: 0.1 },
    { type: 'number', id: 'restmenge', label: 'Aktuelle Restmenge', unit: 'l', default: 12, min: 0, step: 1, help: 'Geschätzte noch im Tank verbliebene Menge' },
    { type: 'number', id: 'preis', label: 'Spritpreis', unit: 'EUR/l', default: 1.75, min: 0, step: 0.01 },
  ],
  compute: (v) => {
    const tankvolumen = num(v.tankvolumen);
    const verbrauch = num(v.verbrauch);
    const restmenge = num(v.restmenge);
    const preis = num(v.preis);
    const reichweite = verbrauch > 0 ? (tankvolumen / verbrauch) * 100 : 0;
    const restReichweite = verbrauch > 0 ? (restmenge / verbrauch) * 100 : 0;
    const kostenFuellung = tankvolumen * preis;
    return [
      { label: 'Reichweite volle Tankfüllung', value: reichweite, unit: 'km', digits: 0, primary: true },
      { label: 'Restreichweite', value: restReichweite, unit: 'km', digits: 0 },
      { label: 'Kosten einer Tankfüllung', value: kostenFuellung, unit: 'EUR', digits: 2 },
      { label: 'Kosten pro 100 km', value: verbrauch * preis, unit: 'EUR', digits: 2 },
    ];
  },
  howto: [
    'Tankvolumen aus dem Handbuch oder Datenblatt eintragen.',
    'Durchschnittsverbrauch in l/100 km erfassen.',
    'Aktuell verbliebene Restmenge schätzen.',
    'Spritpreis ergänzen und Reichweiten ablesen.',
  ],
  faq: [
    { q: 'Wie zuverlässig ist die Restreichweite?', a: 'Sie ist eine Schätzung. Der reale Verbrauch schwankt je nach Fahrweise, Beladung und Strecke. Plane immer eine Reserve ein und fahre den Tank nicht leer.' },
    { q: 'Ab wann sollte ich tanken?', a: 'Es empfiehlt sich, spätestens bei rund einem Viertel Tankinhalt nachzutanken. Sehr niedrige Füllstände können bei manchen Fahrzeugen die Kraftstoffpumpe belasten.' },
    { q: 'Warum nutzt der Bordcomputer andere Werte?', a: 'Bordcomputer berechnen die Restreichweite dynamisch aus dem zuletzt gemessenen Verbrauch. Dieser Rechner nutzt einen festen Durchschnittswert für eine stabilere Schätzung.' },
  ],
  related: ['reichweite-rechner', 'durchschnittsverbrauch-rechner', 'spritkosten-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { tankvolumen: 55, verbrauch: 7, restmenge: 12, preis: 1.75 },
      // reichweite = 55/7*100 = 785.71
      expect: [{ label: 'Reichweite volle Tankfüllung', value: 786, tolerance: 1 }],
    },
    {
      values: { tankvolumen: 60, verbrauch: 6, restmenge: 15, preis: 1.8 },
      // restReichweite = 15/6*100 = 250
      expect: [{ label: 'Restreichweite', value: 250, tolerance: 0.5 }],
    },
  ],
};
