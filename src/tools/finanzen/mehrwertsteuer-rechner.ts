import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'mehrwertsteuer-rechner',
  category: 'finanzen',
  title: 'Mehrwertsteuer-Rechner',
  shortTitle: 'MwSt-Rechner',
  description:
    'Berechne die Mehrwertsteuer (19 % oder 7 %): Netto in Brutto, Brutto in Netto und den enthaltenen Steuerbetrag.',
  keywords: [
    'mehrwertsteuer rechner',
    'mwst berechnen',
    'netto in brutto',
    'brutto in netto',
    'umsatzsteuer rechner',
  ],
  formula: 'Brutto = Netto × (1 + Satz/100); MwSt = Brutto − Netto',
  inputs: [
    { type: 'number', id: 'betrag', label: 'Betrag', unit: '€', default: 100, min: 0, step: 0.01 },
    {
      type: 'select', id: 'richtung', label: 'Betrag ist', default: 'netto',
      options: [
        { value: 'netto', label: 'Nettobetrag (ohne MwSt)' },
        { value: 'brutto', label: 'Bruttobetrag (mit MwSt)' },
      ],
    },
    {
      type: 'select', id: 'satz', label: 'Steuersatz', default: '19',
      options: [
        { value: '19', label: '19 % (Regelsatz)' },
        { value: '7', label: '7 % (ermäßigt)' },
      ],
    },
  ],
  compute: (v) => {
    const betrag = num(v.betrag);
    const satz = num(v.satz, 19);
    let netto: number, brutto: number;
    if (String(v.richtung) === 'brutto') {
      brutto = betrag;
      netto = brutto / (1 + satz / 100);
    } else {
      netto = betrag;
      brutto = netto * (1 + satz / 100);
    }
    const steuer = brutto - netto;
    return [
      { label: 'Nettobetrag', value: netto, unit: '€', digits: 2 },
      { label: 'Mehrwertsteuer', value: steuer, unit: '€', digits: 2 },
      { label: 'Bruttobetrag', value: brutto, unit: '€', digits: 2, primary: true },
    ];
  },
  intro:
    'Die Mehrwertsteuer (Umsatzsteuer) beträgt in Deutschland 19 % (Regelsatz) bzw. 7 % (ermäßigter Satz). Dieser Rechner wandelt Netto- in Bruttobeträge und umgekehrt und zeigt den enthaltenen Steuerbetrag.',
  howto: [
    'Betrag eingeben.',
    'Wählen, ob der Betrag netto (ohne) oder brutto (mit MwSt) ist.',
    'Steuersatz 19 % oder 7 % wählen.',
  ],
  faq: [
    { q: 'Wann gelten 7 % statt 19 %?', a: 'Der ermäßigte Satz von 7 % gilt z. B. für Grundnahrungsmittel, Bücher und den ÖPNV. Der Regelsatz von 19 % gilt für die meisten Waren und Dienstleistungen.' },
    { q: 'Wie rechne ich Brutto in Netto?', a: 'Netto = Brutto / 1,19 (bei 19 %). Stelle dazu oben „Betrag ist Bruttobetrag" ein.' },
  ],
  related: ['rabattrechner', 'skonto', 'prozentrechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { betrag: 100, richtung: 'netto', satz: '19' },
      expect: [
        { label: 'Bruttobetrag', value: 119, tolerance: 0.01 },
        { label: 'Mehrwertsteuer', value: 19, tolerance: 0.01 },
      ],
    },
  ],
};
