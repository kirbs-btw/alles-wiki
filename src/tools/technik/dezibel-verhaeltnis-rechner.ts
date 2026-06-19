import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'dezibel-verhaeltnis-rechner',
  category: 'technik',
  title: 'Dezibel-Verhältnis-Rechner',
  shortTitle: 'dB ↔ Verhältnis',
  description:
    'Rechne zwischen Dezibel (dB) und Verhältnis um – für Leistung (10·log) oder Spannung/Strom (20·log), in beide Richtungen.',
  keywords: [
    'dezibel rechner',
    'db in verhältnis umrechnen',
    'verhältnis in db',
    'db leistung spannung',
    'dezibel umrechnen faktor',
    'db gain rechner',
  ],
  formula: 'Leistung: dB = 10·log₁₀(V); Spannung/Strom: dB = 20·log₁₀(V); V = 10^(dB/n)',
  inputs: [
    {
      type: 'select',
      id: 'richtung',
      label: 'Umrechnungsrichtung',
      default: 'zuDb',
      options: [
        { value: 'zuDb', label: 'Verhältnis → Dezibel' },
        { value: 'zuVerhaeltnis', label: 'Dezibel → Verhältnis' },
      ],
    },
    {
      type: 'select',
      id: 'groesse',
      label: 'Bezugsgröße',
      default: 'leistung',
      options: [
        { value: 'leistung', label: 'Leistung (10·log)' },
        { value: 'spannung', label: 'Spannung / Strom (20·log)' },
      ],
      help: 'Leistung nutzt den Faktor 10, Spannung oder Strom den Faktor 20.',
    },
    { type: 'number', id: 'verhaeltnis', label: 'Verhältnis (Faktor)', default: 2, min: 0, step: 0.1, help: 'Nur bei „Verhältnis → Dezibel“.' },
    { type: 'number', id: 'db', label: 'Pegel', unit: 'dB', default: 3, step: 0.1, help: 'Nur bei „Dezibel → Verhältnis“.' },
  ],
  compute: (v) => {
    const istLeistung = String(v.groesse) === 'leistung';
    const n = istLeistung ? 10 : 20;
    const istZuDb = String(v.richtung) === 'zuDb';
    if (istZuDb) {
      const verh = num(v.verhaeltnis);
      const db = verh > 0 ? n * Math.log10(verh) : 0;
      return [
        { label: 'Pegel', value: db, unit: 'dB', digits: 3, primary: true },
        { label: 'Verhältnis', value: verh, unit: '×', digits: 4 },
      ];
    }
    const db = num(v.db);
    const verh = Math.pow(10, db / n);
    return [
      { label: 'Verhältnis', value: verh, unit: '×', digits: 4, primary: true },
      { label: 'Pegel', value: db, unit: 'dB', digits: 3 },
    ];
  },
  intro:
    'Das Dezibel (dB) beschreibt ein Verhältnis logarithmisch. Entscheidend ist die Bezugsgröße: Für Leistungen gilt dB = 10·log₁₀(P₂/P₁), für Spannungen oder Ströme dB = 20·log₁₀(U₂/U₁). So entsprechen 3 dB rund einer Verdopplung der Leistung, während eine Verdopplung der Spannung etwa 6 dB ergibt. Der Rechner wandelt in beide Richtungen um – vom Faktor zum Pegel und zurück.',
  howto: [
    'Umrechnungsrichtung wählen: Verhältnis → dB oder dB → Verhältnis.',
    'Bezugsgröße festlegen: Leistung (Faktor 10) oder Spannung/Strom (Faktor 20).',
    'Den bekannten Wert eingeben (Faktor oder dB).',
    'Ergebnis ablesen.',
  ],
  faq: [
    { q: 'Warum sind 3 dB eine Verdopplung?', a: 'Bei Leistung gilt dB = 10·log₁₀(2) ≈ 3,01 dB. Eine Verdopplung der Leistung entspricht also rund 3 dB, eine Verzehnfachung genau 10 dB.' },
    { q: 'Wann nehme ich 20·log statt 10·log?', a: 'Den Faktor 20 verwendet man für Feldgrößen wie Spannung oder Strom, weil die Leistung mit dem Quadrat dieser Größen geht. Eine Spannungsverdopplung sind daher rund 6 dB.' },
    { q: 'Wie rechne ich 6 dB in einen Faktor um?', a: 'Mit 10^(dB/n): Bei Spannung (n = 20) ergibt 6 dB den Faktor 10^(6/20) ≈ 1,995, also etwa eine Verdopplung. Bei Leistung (n = 10) wären 6 dB der Faktor ≈ 3,98.' },
  ],
  related: ['ohmsches-gesetz-rechner', 'watt-volt-ampere-rechner', 'frequenz-wellenlaenge-rechner'],
  updated: '2026-06-19',
  examples: [
    {
      values: { richtung: 'zuDb', groesse: 'leistung', verhaeltnis: 2, db: 3 },
      // 10·log10(2) = 3,0103 dB
      expect: [{ label: 'Pegel', value: 3.010, tolerance: 0.002 }],
    },
    {
      values: { richtung: 'zuDb', groesse: 'spannung', verhaeltnis: 2, db: 3 },
      // 20·log10(2) = 6,0206 dB
      expect: [{ label: 'Pegel', value: 6.021, tolerance: 0.002 }],
    },
  ],
};
