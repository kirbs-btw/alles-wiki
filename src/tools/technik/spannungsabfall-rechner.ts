import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'spannungsabfall-rechner',
  category: 'technik',
  title: 'Spannungsabfall-Rechner (Kabel)',
  shortTitle: 'Spannungsabfall',
  description:
    'Berechne den Spannungsabfall auf einer Leitung aus Strom, Laenge und Querschnitt. Fuer Kupferkabel bei Gleichstrom oder einphasig.',
  keywords: [
    'spannungsabfall berechnen',
    'spannungsfall kabel rechner',
    'leitungsverlust berechnen',
    'spannungsabfall leitung',
    'kabel spannungsverlust',
  ],
  formula: 'dU = (2 x Laenge x Strom) / (Leitfaehigkeit x Querschnitt)',
  inputs: [
    { type: 'number', id: 'strom', label: 'Strom', unit: 'A', default: 16, min: 0, step: 0.5 },
    { type: 'number', id: 'laenge', label: 'Leitungslaenge (einfach)', unit: 'm', default: 25, min: 0, step: 1, help: 'Einfache Strecke; Hin- und Rueckweg wird automatisch beruecksichtigt.' },
    { type: 'number', id: 'querschnitt', label: 'Leiterquerschnitt', unit: 'mm2', default: 2.5, min: 0.1, step: 0.5 },
    { type: 'number', id: 'spannung', label: 'Nennspannung', unit: 'V', default: 230, min: 1, step: 1, help: 'Fuer die Prozentangabe.' },
  ],
  compute: (v) => {
    const strom = num(v.strom);
    const laenge = num(v.laenge);
    const querschnitt = num(v.querschnitt);
    const spannung = num(v.spannung);
    // Leitfaehigkeit Kupfer kappa = 56 m/(Ohm*mm2)
    const kappa = 56;
    const nenner = kappa * querschnitt;
    const du = nenner > 0 ? (2 * laenge * strom) / nenner : 0;
    const prozent = spannung > 0 ? (du / spannung) * 100 : 0;
    const verlustW = du * strom;
    return [
      { label: 'Spannungsabfall', value: du, unit: 'V', digits: 3, primary: true },
      { label: 'Spannungsabfall relativ', value: prozent, unit: '%', digits: 2, help: 'Empfehlung: unter 3 % fuer Steckdosenstromkreise.' },
      { label: 'Verlustleistung im Kabel', value: verlustW, unit: 'W', digits: 2 },
    ];
  },
  intro:
    'Auf langen Leitungen geht Spannung verloren - das kann Geraete stoeren oder das Kabel erwaermen. Der Rechner ermittelt den Spannungsabfall fuer Kupferleitungen bei Gleichstrom oder einphasigem Wechselstrom aus Strom, Laenge und Querschnitt.',
  howto: [
    'Strom in Ampere eingeben.',
    'Einfache Leitungslaenge eintragen (Hin- und Rueckweg wird verdoppelt).',
    'Leiterquerschnitt in mm2 angeben (z. B. 1,5 oder 2,5).',
    'Nennspannung waehlen und Spannungsabfall in Volt und Prozent ablesen.',
  ],
  faq: [
    { q: 'Wie viel Spannungsabfall ist erlaubt?', a: 'Fuer Endstromkreise empfiehlt die Norm meist hoechstens 3 %. Hoehere Werte koennen zu Funktionsstoerungen und unnoetigen Verlusten fuehren.' },
    { q: 'Warum mal 2 in der Formel?', a: 'Der Strom muss durch Hin- und Rueckleiter fliessen. Daher wird die einfache Leitungslaenge verdoppelt.' },
    { q: 'Was tun bei zu hohem Spannungsabfall?', a: 'Einen groesseren Leiterquerschnitt waehlen. Bei doppeltem Querschnitt halbiert sich der Spannungsabfall.' },
  ],
  related: ['ohmsches-gesetz-rechner', 'watt-volt-ampere-rechner', 'led-vorwiderstand-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { strom: 16, laenge: 25, querschnitt: 2.5, spannung: 230 },
      expect: [
        { label: 'Spannungsabfall', value: 5.714, tolerance: 0.02 },
      ],
    },
    {
      values: { strom: 10, laenge: 50, querschnitt: 1.5, spannung: 230 },
      expect: [{ label: 'Spannungsabfall', value: 11.905, tolerance: 0.02 }],
    },
  ],
};
