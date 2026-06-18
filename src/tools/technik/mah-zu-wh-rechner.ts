import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'mah-zu-wh-rechner',
  category: 'technik',
  title: 'mAh-zu-Wh-Rechner (Akkukapazitaet)',
  shortTitle: 'mAh in Wh',
  description:
    'Rechne die Akkukapazitaet von mAh in Wh um und zurueck. Mit Spannung der Zellen - wichtig fuer Powerbanks und Flugreisen.',
  keywords: [
    'mah in wh umrechnen',
    'akku kapazitaet rechner',
    'powerbank wh berechnen',
    'wh aus mah',
    'akku wattstunden rechner',
  ],
  formula: 'Wh = (mAh / 1000) x Spannung(V)',
  inputs: [
    { type: 'number', id: 'mah', label: 'Kapazitaet', unit: 'mAh', default: 10000, min: 0, step: 100 },
    { type: 'number', id: 'spannung', label: 'Nennspannung', unit: 'V', default: 3.7, min: 0.1, step: 0.1, help: 'Lithium-Zelle typisch 3,7 V, USB-Powerbank-Ausgang 5 V.' },
  ],
  compute: (v) => {
    const mah = num(v.mah);
    const spannung = num(v.spannung);
    const wh = (mah / 1000) * spannung;
    const ah = mah / 1000;
    return [
      { label: 'Energie', value: wh, unit: 'Wh', digits: 2, primary: true },
      { label: 'Kapazitaet', value: ah, unit: 'Ah', digits: 3 },
      { label: 'Flugzeug-Grenze 100 Wh', value: wh <= 100 ? 'erlaubt' : 'genehmigungspflichtig', help: 'Bis 100 Wh ohne Anmeldung im Handgepaeck (Richtwert IATA).' },
    ];
  },
  intro:
    'Powerbanks und Akkus geben ihre Kapazitaet meist in mAh an, fuer Flugreisen und Vergleiche zaehlt aber die Energie in Wattstunden (Wh). Der Rechner wandelt mAh in Wh um - dafuer wird die Nennspannung der Zellen benoetigt.',
  howto: [
    'Kapazitaet in mAh eingeben (steht auf der Powerbank).',
    'Nennspannung waehlen: Lithium-Zellen 3,7 V, viele Powerbanks geben die Kapazitaet bei 3,7 V an.',
    'Energie in Wh ablesen und mit der 100-Wh-Grenze fuer Flugreisen vergleichen.',
  ],
  faq: [
    { q: 'Wie rechne ich 10000 mAh in Wh um?', a: 'Bei 3,7 V Zellspannung: 10000 mAh = 10 Ah, mal 3,7 V ergibt 37 Wh.' },
    { q: 'Welche Spannung soll ich nehmen?', a: 'Hersteller geben mAh fast immer bei der Zellspannung von 3,7 V an, nicht bei den 5 V des USB-Ausgangs. Fuer die Wh-Berechnung daher 3,7 V verwenden.' },
    { q: 'Wie viel Wh darf ich im Flugzeug mitnehmen?', a: 'Bis 100 Wh sind Lithium-Akkus im Handgepaeck meist ohne Anmeldung erlaubt, 100-160 Wh nur mit Genehmigung der Airline. Pruefe immer die Vorgaben deiner Fluggesellschaft.' },
  ],
  related: ['akku-laufzeit-rechner', 'watt-volt-ampere-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { mah: 10000, spannung: 3.7 },
      expect: [
        { label: 'Energie', value: 37, tolerance: 0.01 },
        { label: 'Kapazitaet', value: 10, tolerance: 0.001 },
      ],
    },
    {
      values: { mah: 20000, spannung: 3.7 },
      expect: [{ label: 'Energie', value: 74, tolerance: 0.01 }],
    },
  ],
};
