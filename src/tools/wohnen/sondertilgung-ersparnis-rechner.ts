import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'sondertilgung-ersparnis-rechner',
  category: 'wohnen',
  title: 'Sondertilgung-Ersparnis-Rechner',
  shortTitle: 'Sondertilgung',
  description:
    'Berechne, wie viel Zinsen du mit einer jährlichen Sondertilgung sparst und um wie viele Jahre sich dein Immobilienkredit verkürzt.',
  keywords: [
    'sondertilgung rechner',
    'sondertilgung ersparnis berechnen',
    'zinsersparnis sondertilgung',
    'hauskredit schneller abbezahlen',
    'sondertilgung laufzeit',
  ],
  formula:
    'Monatlicher Zins = Restschuld × Sollzins/12; Tilgung = Rate − Zins; jährliche Sondertilgung verringert die Restschuld zusätzlich (monatliche Simulation).',
  inputs: [
    { type: 'number', id: 'darlehen', label: 'Restschuld / Darlehen', unit: '€', default: 300000, min: 0, step: 1000 },
    { type: 'number', id: 'zins', label: 'Sollzins p.a.', unit: '%', default: 3.5, min: 0.01, max: 20, step: 0.01 },
    { type: 'number', id: 'tilgung', label: 'Anfängliche Tilgung p.a.', unit: '%', default: 2, min: 0.1, max: 20, step: 0.1 },
    { type: 'number', id: 'sonder', label: 'Jährliche Sondertilgung', unit: '€', default: 5000, min: 0, step: 500, help: 'Betrag, den du einmal pro Jahr zusätzlich tilgst.' },
  ],
  compute: (v) => {
    const darlehen = num(v.darlehen);
    const zins = num(v.zins);
    const tilgung = num(v.tilgung);
    const sonder = Math.max(0, num(v.sonder));

    const simulate = (sonderTilgung: number) => {
      const im = zins / 100 / 12;
      const rate = (darlehen * ((zins + tilgung) / 100)) / 12;
      let rest = darlehen;
      let zinsSum = 0;
      let monat = 0;
      const maxMon = 12 * 60;
      while (rest > 0.005 && monat < maxMon && rate > 0) {
        monat++;
        const z = rest * im;
        zinsSum += z;
        let tilg = rate - z;
        if (tilg <= 0) break; // Rate deckt Zins nicht -> keine Tilgung
        if (tilg > rest) tilg = rest;
        rest -= tilg;
        if (monat % 12 === 0 && sonderTilgung > 0 && rest > 0) {
          rest -= Math.min(sonderTilgung, rest);
        }
      }
      return { monate: monat, zinsSum };
    };

    const ohne = simulate(0);
    const mit = simulate(sonder);
    const zinsErsparnis = ohne.zinsSum - mit.zinsSum;
    const monateKuerzer = ohne.monate - mit.monate;

    return [
      { label: 'Zinsersparnis gesamt', value: zinsErsparnis, unit: '€', digits: 2, primary: true },
      { label: 'Laufzeit verkürzt um', value: monateKuerzer / 12, unit: 'Jahre', digits: 1 },
      { label: 'Laufzeit ohne Sondertilgung', value: ohne.monate / 12, unit: 'Jahre', digits: 1 },
      { label: 'Laufzeit mit Sondertilgung', value: mit.monate / 12, unit: 'Jahre', digits: 1 },
    ];
  },
  intro:
    'Eine Sondertilgung ist eine zusätzliche Zahlung über die reguläre Rate hinaus. Sie verringert die Restschuld unmittelbar, sodass auf den getilgten Betrag keine Zinsen mehr anfallen. Über die gesamte Laufzeit summiert sich das zu einer erheblichen Zinsersparnis und einer deutlich kürzeren Kreditlaufzeit. Der Rechner simuliert die Tilgung monatlich und bucht die Sondertilgung jeweils zum Jahresende.',
  howto: [
    'Aktuelle Restschuld bzw. Darlehenssumme eingeben.',
    'Sollzins und anfängliche Tilgung aus dem Vertrag eintragen.',
    'Geplante jährliche Sondertilgung wählen (viele Banken erlauben 5 % der Darlehenssumme pro Jahr).',
    'Zinsersparnis und verkürzte Laufzeit ablesen.',
  ],
  faq: [
    { q: 'Wie viel Sondertilgung ist erlaubt?', a: 'Das hängt vom Darlehensvertrag ab. Üblich ist eine kostenlose Sondertilgung von bis zu 5 % der ursprünglichen Darlehenssumme pro Jahr. Höhere Sondertilgungen können eine Vorfälligkeitsentschädigung auslösen.' },
    { q: 'Warum spart die Sondertilgung so viel?', a: 'Jeder zusätzlich getilgte Euro senkt die Restschuld dauerhaft. Auf diesen Betrag fallen für die gesamte Restlaufzeit keine Zinsen mehr an – der Zinseszinseffekt wirkt zu deinen Gunsten.' },
    { q: 'Was passiert mit der Monatsrate?', a: 'Die reguläre Rate bleibt in diesem Modell konstant. Durch die schnellere Tilgung wird das Darlehen früher zurückgezahlt, statt die Rate zu senken.' },
  ],
  related: ['baufinanzierung-rate-rechner', 'anschlussfinanzierung-restschuld-rechner', 'volltilgerdarlehen-laufzeit-rechner'],
  updated: '2026-06-19',
  examples: [
    {
      values: { darlehen: 300000, zins: 3.5, tilgung: 2, sonder: 5000 },
      expect: [
        { label: 'Zinsersparnis gesamt', value: 63149, tolerance: 50 },
        { label: 'Laufzeit verkürzt um', value: 9.6, tolerance: 0.2 },
      ],
    },
  ],
};
