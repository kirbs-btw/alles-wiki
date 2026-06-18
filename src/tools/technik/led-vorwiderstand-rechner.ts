import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'led-vorwiderstand-rechner',
  category: 'technik',
  title: 'LED-Vorwiderstand-Rechner',
  shortTitle: 'LED-Vorwiderstand',
  description:
    'Berechne den passenden Vorwiderstand fuer eine LED aus Versorgungsspannung, LED-Flussspannung und Strom. Inklusive Verlustleistung am Widerstand.',
  keywords: [
    'led vorwiderstand berechnen',
    'vorwiderstand rechner',
    'led widerstand berechnen',
    'led an 12v',
    'led an 5v widerstand',
  ],
  formula: 'R = (U_quelle - U_LED) / I_LED; P = (U_quelle - U_LED) x I_LED',
  inputs: [
    { type: 'number', id: 'uQuelle', label: 'Versorgungsspannung', unit: 'V', default: 12, min: 0, step: 0.1 },
    { type: 'number', id: 'uLed', label: 'LED-Flussspannung', unit: 'V', default: 2, min: 0, step: 0.1, help: 'Typisch: rot 1,8-2,2 V, blau/weiss 3,0-3,4 V.' },
    { type: 'number', id: 'iLed', label: 'LED-Strom', unit: 'mA', default: 20, min: 0.1, step: 1, help: 'Ueblich sind 20 mA fuer Standard-LEDs.' },
  ],
  compute: (v) => {
    const uQuelle = num(v.uQuelle);
    const uLed = num(v.uLed);
    const iMa = num(v.iLed);
    const iA = iMa / 1000;
    const uDiff = uQuelle - uLed;
    const R = iA > 0 ? uDiff / iA : 0;
    const P = uDiff * iA;
    const hinweis = uDiff <= 0 ? 'Versorgungsspannung zu niedrig fuer diese LED.' : 'Naechsten Normwert (E12) waehlen, der groesser ist.';
    return [
      { label: 'Vorwiderstand', value: R > 0 ? R : 0, unit: 'Ohm', digits: 1, primary: true, help: hinweis },
      { label: 'Verlustleistung am Widerstand', value: P > 0 ? P : 0, unit: 'W', digits: 3 },
      { label: 'Spannung am Widerstand', value: uDiff > 0 ? uDiff : 0, unit: 'V', digits: 2 },
    ];
  },
  intro:
    'Eine LED braucht einen Vorwiderstand, der die ueberschuessige Spannung abbaut und den Strom begrenzt. Der Rechner ermittelt den Widerstandswert sowie die im Widerstand entstehende Verlustleistung, damit du den richtigen Typ auswaehlen kannst.',
  howto: [
    'Versorgungsspannung der Schaltung eingeben (z. B. 5 V oder 12 V).',
    'Flussspannung der LED eintragen (Datenblatt, je nach Farbe).',
    'Gewuenschten LED-Strom in mA angeben (oft 20 mA).',
    'Widerstand ablesen und auf den naechstgroesseren Normwert aufrunden.',
  ],
  faq: [
    { q: 'Warum braucht eine LED einen Vorwiderstand?', a: 'LEDs haben eine nahezu konstante Flussspannung. Ohne Widerstand wuerde der Strom unkontrolliert ansteigen und die LED zerstoeren. Der Vorwiderstand begrenzt den Strom.' },
    { q: 'Welche Flussspannung hat meine LED?', a: 'Das haengt von der Farbe ab: rote LEDs etwa 1,8-2,2 V, gruene/gelbe 2,0-2,4 V, blaue und weisse 3,0-3,4 V. Genaue Werte stehen im Datenblatt.' },
    { q: 'Soll ich auf- oder abrunden?', a: 'Immer auf den naechsthoeheren Normwert aufrunden. Ein etwas groesserer Widerstand schuetzt die LED, ein zu kleiner kann sie ueberlasten.' },
  ],
  related: ['ohmsches-gesetz-rechner', 'watt-volt-ampere-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { uQuelle: 12, uLed: 2, iLed: 20 },
      expect: [
        { label: 'Vorwiderstand', value: 500, tolerance: 0.5 },
        { label: 'Verlustleistung am Widerstand', value: 0.2, tolerance: 0.001 },
      ],
    },
    {
      values: { uQuelle: 5, uLed: 3.2, iLed: 20 },
      expect: [{ label: 'Vorwiderstand', value: 90, tolerance: 0.5 }],
    },
  ],
};
