import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'volltilgerdarlehen-laufzeit-rechner',
  category: 'wohnen',
  title: 'Volltilgerdarlehen Laufzeit-Rechner',
  shortTitle: 'Volltilger',
  description:
    'Berechne, nach wie vielen Jahren ein Immobiliendarlehen bei fester Monatsrate vollständig getilgt ist – inklusive Gesamtzinskosten.',
  keywords: [
    'volltilgerdarlehen rechner',
    'kreditlaufzeit berechnen',
    'darlehen laufzeit aus rate',
    'wann ist kredit abbezahlt',
    'volltilger laufzeit',
  ],
  formula:
    'Laufzeit n (Monate) = −ln(1 − i × D / A) / ln(1 + i), mit i = Sollzins/12, D = Darlehen, A = Monatsrate',
  inputs: [
    { type: 'number', id: 'darlehen', label: 'Darlehenssumme', unit: '€', default: 300000, min: 0, step: 1000 },
    { type: 'number', id: 'zins', label: 'Sollzins p.a.', unit: '%', default: 4, min: 0.01, max: 20, step: 0.01 },
    { type: 'number', id: 'rate', label: 'Monatsrate', unit: '€', default: 1800, min: 1, step: 10, help: 'Die feste monatliche Rate aus Zins und Tilgung.' },
  ],
  compute: (v) => {
    const darlehen = num(v.darlehen);
    const zins = num(v.zins);
    const rate = num(v.rate);
    const i = zins / 100 / 12;

    let monate: number;
    let machbar = true;
    if (i <= 0) {
      monate = rate > 0 ? darlehen / rate : 0;
    } else {
      const x = 1 - (i * darlehen) / rate;
      if (x <= 0) {
        // Rate deckt nicht einmal die laufenden Zinsen -> keine Tilgung.
        machbar = false;
        monate = 0;
      } else {
        monate = -Math.log(x) / Math.log(1 + i);
      }
    }

    const jahre = monate / 12;
    const gesamtzahlung = machbar ? rate * monate : 0;
    const zinskosten = machbar ? gesamtzahlung - darlehen : 0;
    // Erforderliche anfängliche Tilgung p.a. = (Jahresrate / Darlehen) − Sollzins
    const tilgungProzent = darlehen > 0 ? (rate * 12 / darlehen) * 100 - zins : 0;

    return [
      { label: 'Laufzeit', value: machbar ? jahre : 0, unit: 'Jahre', digits: 1, primary: true },
      { label: 'Laufzeit in Monaten', value: machbar ? monate : 0, unit: 'Monate', digits: 0 },
      { label: 'Gesamte Zinskosten', value: zinskosten, unit: '€', digits: 2 },
      { label: 'Erforderliche Anfangstilgung', value: tilgungProzent, unit: '%', digits: 2 },
    ];
  },
  intro:
    'Bei einem Volltilgerdarlehen wird die feste Monatsrate so gewählt, dass das Darlehen am Ende der Zinsbindung vollständig getilgt ist – es bleibt keine Restschuld. Dieser Rechner ermittelt umgekehrt aus Darlehen, Sollzins und gewünschter Monatsrate die Laufzeit bis zur kompletten Rückzahlung sowie die gesamten Zinskosten. Liegt die Rate unter dem Zinsbetrag, ist keine Tilgung möglich.',
  howto: [
    'Darlehenssumme eingeben.',
    'Sollzins pro Jahr eintragen.',
    'Gewünschte oder leistbare Monatsrate angeben.',
    'Laufzeit und Gesamtzinskosten ablesen.',
  ],
  faq: [
    { q: 'Was ist ein Volltilgerdarlehen?', a: 'Ein Volltilgerdarlehen wird über die gesamte Zinsbindung vollständig zurückgezahlt. Am Ende bleibt keine Restschuld, eine Anschlussfinanzierung entfällt. Banken belohnen die Planungssicherheit oft mit einem leichten Zinsabschlag.' },
    { q: 'Warum sinkt die Laufzeit bei höherer Rate?', a: 'Eine höhere Rate enthält einen größeren Tilgungsanteil. Die Restschuld sinkt schneller, sodass weniger Zinsen anfallen und das Darlehen früher abbezahlt ist.' },
    { q: 'Was bedeutet die erforderliche Anfangstilgung?', a: 'Sie zeigt, welcher anfängliche Tilgungssatz in deiner Rate steckt. Je höher dieser Wert über dem Sollzins liegt, desto schneller wird das Darlehen getilgt.' },
  ],
  related: ['baufinanzierung-rate-rechner', 'anschlussfinanzierung-restschuld-rechner', 'sondertilgung-ersparnis-rechner'],
  updated: '2026-06-19',
  examples: [
    {
      values: { darlehen: 300000, zins: 4, rate: 1800 },
      expect: [
        { label: 'Laufzeit', value: 20.3, tolerance: 0.1 },
        { label: 'Gesamte Zinskosten', value: 138631.75, tolerance: 50 },
        { label: 'Erforderliche Anfangstilgung', value: 3.2, tolerance: 0.05 },
      ],
    },
  ],
};
