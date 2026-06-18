import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'watt-volt-ampere-rechner',
  category: 'technik',
  title: 'Watt-Volt-Ampere-Rechner',
  shortTitle: 'W-V-A',
  description:
    'Rechne zwischen Leistung (Watt), Spannung (Volt) und Strom (Ampere) um. Gib zwei Werte ein, der Rechner ergaenzt die dritte Groesse.',
  keywords: [
    'watt in ampere umrechnen',
    'volt ampere watt rechner',
    'leistung berechnen',
    'ampere berechnen',
    'watt volt ampere formel',
  ],
  formula: 'P = U x I; I = P / U; U = P / I',
  inputs: [
    { type: 'number', id: 'leistung', label: 'Leistung P', unit: 'W', default: 0, min: 0, step: 1, help: 'Auf 0 lassen, wenn unbekannt.' },
    { type: 'number', id: 'spannung', label: 'Spannung U', unit: 'V', default: 230, min: 0, step: 1, help: 'Auf 0 lassen, wenn unbekannt.' },
    { type: 'number', id: 'strom', label: 'Strom I', unit: 'A', default: 5, min: 0, step: 0.1, help: 'Auf 0 lassen, wenn unbekannt.' },
  ],
  compute: (v) => {
    let P = num(v.leistung);
    let U = num(v.spannung);
    let I = num(v.strom);

    if (U > 0 && I > 0) {
      P = U * I;
    } else if (P > 0 && U > 0) {
      I = U !== 0 ? P / U : 0;
    } else if (P > 0 && I > 0) {
      U = I !== 0 ? P / I : 0;
    }
    return [
      { label: 'Leistung P', value: P, unit: 'W', digits: 2, primary: true },
      { label: 'Spannung U', value: U, unit: 'V', digits: 2 },
      { label: 'Strom I', value: I, unit: 'A', digits: 3 },
    ];
  },
  intro:
    'Watt, Volt und Ampere haengen ueber die Leistungsformel P = U x I zusammen. Dieser Rechner wandelt zwischen den drei Groessen um: Gib zwei Werte ein und erhalte den dritten - praktisch fuer Netzteile, Sicherungen und Verbraucher.',
  howto: [
    'Zwei der drei Werte eingeben (z. B. Spannung 230 V und Strom 5 A).',
    'Die unbekannte Groesse auf 0 lassen.',
    'Ergebnis fuer Leistung, Spannung und Strom ablesen.',
  ],
  faq: [
    { q: 'Wie rechne ich Watt in Ampere um?', a: 'Strom = Leistung geteilt durch Spannung. Ein 1150-W-Geraet an 230 V zieht rund 5 A.' },
    { q: 'Gilt das auch fuer Wechselstrom?', a: 'Bei ohmschen Verbrauchern ja. Bei Motoren oder Geraeten mit Blindleistung muss zusaetzlich der Leistungsfaktor (cos phi) beruecksichtigt werden.' },
    { q: 'Wofuer brauche ich diese Umrechnung?', a: 'Um Netzteile zu dimensionieren, Sicherungen passend zu waehlen oder zu pruefen, ob eine Steckdosenleiste ueberlastet wird.' },
  ],
  related: ['ohmsches-gesetz-rechner', 'pc-stromverbrauch-rechner', 'led-vorwiderstand-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { leistung: 0, spannung: 230, strom: 5 },
      expect: [{ label: 'Leistung P', value: 1150, tolerance: 0.01 }],
    },
    {
      values: { leistung: 60, spannung: 12, strom: 0 },
      expect: [{ label: 'Strom I', value: 5, tolerance: 0.01 }],
    },
  ],
};
