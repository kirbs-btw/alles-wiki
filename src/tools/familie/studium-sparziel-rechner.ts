import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

// Studium-Sparziel-Rechner: Aus einem Zielbetrag (z. B. für Studium/Ausbildung des
// Kindes), der Laufzeit, einem Startkapital und einer erwarteten Rendite wird die
// nötige monatliche Sparrate berechnet. Sparrate vorschüssig (zu Monatsbeginn),
// monatliche Verzinsung. Renditen sind nicht garantiert – Orientierung.

export const tool: Tool = {
  slug: 'studium-sparziel-rechner',
  category: 'familie',
  title: 'Sparziel fürs Studium berechnen',
  shortTitle: 'Studium-Sparziel',
  description:
    'Berechne die nötige monatliche Sparrate, um bis zum Studium deines Kindes einen Zielbetrag zu erreichen – mit Startkapital, Laufzeit und erwarteter Rendite.',
  keywords: [
    'studium sparen rechner',
    'sparziel studium kind',
    'wie viel sparen fürs studium',
    'sparrate berechnen ziel',
    'ausbildung sparen rechner',
    'monatliche sparrate ziel',
  ],
  intro:
    'Studium oder Ausbildung kosten Geld – wer früh anfängt, verteilt die Last auf viele Jahre. Dieser Rechner dreht den klassischen Sparplan um: Du gibst den Zielbetrag und die Laufzeit vor, und er ermittelt die nötige monatliche Sparrate. Berücksichtigt werden ein eventuelles Startkapital und eine erwartete Rendite (Zinseszins, monatliche Verzinsung, Rate vorschüssig). Hinweis: Renditen sind nicht garantiert und schwanken je nach Anlageform; Steuern sind nicht berücksichtigt.',
  formula:
    'Rate = (Ziel − Startkapital × (1+i)^n) ÷ [((1+i)^n − 1)/i × (1+i)] mit i = Monatszins, n = Monate',
  inputs: [
    { type: 'number', id: 'ziel', label: 'Zielbetrag', unit: '€', default: 30000, min: 0, max: 1000000, step: 500 },
    { type: 'number', id: 'startkapital', label: 'Startkapital', unit: '€', default: 0, min: 0, step: 100 },
    { type: 'number', id: 'jahre', label: 'Laufzeit', unit: 'Jahre', default: 18, min: 1, max: 30, step: 1, help: 'z. B. bis zum 18. Geburtstag' },
    { type: 'number', id: 'zins', label: 'Erwartete Rendite p.a.', unit: '%', default: 0, min: 0, max: 15, step: 0.5 },
  ],
  compute: (v) => {
    const ziel = Math.max(0, num(v.ziel, 30000));
    const startkapital = Math.max(0, num(v.startkapital));
    let jahre = Math.round(num(v.jahre, 18));
    if (jahre < 1) jahre = 1;
    if (jahre > 30) jahre = 30;
    const zins = Math.max(0, num(v.zins, 0));
    const monate = jahre * 12;
    const i = zins / 100 / 12;
    const startEnd = startkapital * Math.pow(1 + i, monate);
    const restZiel = Math.max(0, ziel - startEnd);
    let rate: number;
    if (i > 0) {
      const faktor = ((Math.pow(1 + i, monate) - 1) / i) * (1 + i);
      rate = faktor > 0 ? restZiel / faktor : 0;
    } else {
      rate = monate > 0 ? restZiel / monate : 0;
    }
    const einzahlungen = startkapital + rate * monate;
    const ertrag = ziel - einzahlungen;
    return [
      { label: 'Nötige monatliche Sparrate', value: rate, unit: '€', digits: 2, primary: true },
      { label: 'Summe der Einzahlungen', value: einzahlungen, unit: '€', digits: 2 },
      { label: 'davon Startkapital', value: startkapital, unit: '€', digits: 2 },
      { label: 'Erwarteter Zinsertrag', value: Math.max(0, ertrag), unit: '€', digits: 2, help: 'Zielbetrag minus Einzahlungen' },
      { label: 'Sparmonate', value: monate, unit: 'Monate', digits: 0 },
    ];
  },
  howto: [
    'Zielbetrag eingeben, der bis zum Studium erreicht werden soll.',
    'Vorhandenes Startkapital eintragen (0 €, falls bei null gestartet wird).',
    'Laufzeit in Jahren wählen – etwa bis zum 18. Geburtstag.',
    'Erwartete Rendite eintragen und die nötige monatliche Sparrate ablesen.',
  ],
  faq: [
    { q: 'Wie viel kostet ein Studium?', a: 'Sehr unterschiedlich. Für Wohnen, Essen, Lernmittel und Versicherungen werden oft 800 bis 1.200 € im Monat veranschlagt. Über mehrere Jahre kommen so schnell 30.000 € und mehr zusammen.' },
    { q: 'Welche Rendite sollte ich ansetzen?', a: 'Bei langer Laufzeit gilt ein breit gestreuter Aktien-ETF mit im Schnitt 5 bis 7 % p. a. als realistisch – aber mit Schwankungen. Für sichere Anlagen eher 1 bis 3 %. Vergangene Renditen sind keine Garantie.' },
    { q: 'Warum sinkt die Sparrate mit höherer Rendite?', a: 'Weil ein Teil des Zielbetrags durch Zinserträge erwirtschaftet wird. Je höher die Rendite und je länger die Laufzeit, desto weniger müssen Sie selbst einzahlen.' },
    { q: 'Sind Steuern berücksichtigt?', a: 'Nein. Kapitalerträge unterliegen grundsätzlich der Abgeltungsteuer. Sparerpauschbetrag und ein Depot auf den Namen des Kindes können die Steuerlast senken.' },
  ],
  related: ['sparplan-kind-rechner', 'klassenfahrt-sparplan-rechner', 'kosten-kind-rechner', 'familienbudget-rechner'],
  examples: [
    {
      values: { ziel: 30000, startkapital: 0, jahre: 18, zins: 0 },
      expect: [
        { label: 'Nötige monatliche Sparrate', value: 138.89, tolerance: 0.5 },
        { label: 'Sparmonate', value: 216, tolerance: 0 },
      ],
    },
    {
      values: { ziel: 21600, startkapital: 0, jahre: 10, zins: 0 },
      expect: [
        { label: 'Nötige monatliche Sparrate', value: 180, tolerance: 0.01 },
        { label: 'Summe der Einzahlungen', value: 21600, tolerance: 0.01 },
      ],
    },
  ],
  updated: '2026-06-19',
};
