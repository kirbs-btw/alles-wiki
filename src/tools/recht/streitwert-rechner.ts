import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'streitwert-rechner',
  category: 'recht',
  title: 'Streitwert-Rechner (wiederkehrende Leistungen)',
  shortTitle: 'Streitwert',
  description:
    'Ermittle den Streitwert bei wiederkehrenden Leistungen wie Miete oder Unterhalt – nach dem 3,5-Jahres-Wert (§ 9 ZPO) bzw. Jahresbetrag bei Mietstreit.',
  keywords: [
    'streitwert rechner',
    'gegenstandswert berechnen',
    'streitwert miete',
    'streitwert unterhalt',
    '9 zpo streitwert',
    'streitwert wiederkehrende leistung',
    'jahresbetrag streitwert',
  ],
  formula: 'Streitwert = monatlicher Betrag × 12 × Jahresfaktor (3,5 nach § 9 ZPO, 1 bei Mietstreit § 41 GKG)',
  inputs: [
    { type: 'number', id: 'monatsbetrag', label: 'Monatlicher Betrag', unit: '€', default: 800, min: 0, step: 10, help: 'Z. B. monatliche Miete oder monatlicher Unterhalt.' },
    {
      type: 'select', id: 'art', label: 'Art des Streits', default: 'unbefristet',
      options: [
        { value: 'unbefristet', label: 'Unbefristete wiederkehrende Leistung (3,5 Jahre, § 9 ZPO)' },
        { value: 'mietverhaeltnis', label: 'Bestand des Mietverhältnisses (1 Jahresmiete, § 41 GKG)' },
        { value: 'rueckstand', label: 'Nur aufgelaufener Rückstand (konkrete Monate)' },
      ],
    },
    { type: 'number', id: 'monateRueckstand', label: 'Monate Rückstand', unit: '', default: 3, min: 0, step: 1, help: 'Nur relevant bei „aufgelaufener Rückstand".' },
  ],
  compute: (v) => {
    const monatsbetrag = num(v.monatsbetrag);
    const art = String(v.art);
    const monateRueckstand = num(v.monateRueckstand);
    let streitwert: number;
    let basis: string;
    if (art === 'mietverhaeltnis') {
      streitwert = monatsbetrag * 12;
      basis = '1 Jahresbetrag (§ 41 GKG)';
    } else if (art === 'rueckstand') {
      streitwert = monatsbetrag * monateRueckstand;
      basis = monateRueckstand + ' Monatsbeträge';
    } else {
      streitwert = monatsbetrag * 12 * 3.5;
      basis = '3,5 Jahresbeträge (§ 9 ZPO)';
    }
    const jahresbetrag = monatsbetrag * 12;
    return [
      { label: 'Streitwert', value: streitwert, unit: '€', digits: 2, primary: true },
      { label: 'Jahresbetrag', value: jahresbetrag, unit: '€', digits: 2 },
      { label: 'Bemessungsgrundlage', value: basis },
    ];
  },
  intro:
    'Bei wiederkehrenden Leistungen wie Miete oder Unterhalt bemisst sich der Streitwert nicht nach einer einzelnen Zahlung, sondern nach einem Mehrfachen des Jahresbetrags. Für unbefristete Ansprüche gilt der 3,5-fache Jahreswert (§ 9 ZPO), beim Streit um den Bestand eines Mietverhältnisses eine Jahresmiete (§ 41 GKG). Der Streitwert bestimmt Gerichts- und Anwaltskosten und die Zuständigkeit des Gerichts.',
  howto: [
    'Monatlichen Betrag eingeben (Miete oder Unterhalt).',
    'Art des Streits wählen.',
    'Bei Rückstand zusätzlich die Anzahl der Monate angeben.',
    'Streitwert ablesen und für die Kostenberechnung weiterverwenden.',
  ],
  faq: [
    { q: 'Warum 3,5 Jahre?', a: 'Bei Ansprüchen auf wiederkehrende Leistungen von unbestimmter Dauer setzt § 9 ZPO den 3,5-fachen Jahreswert als Streitwert an, um den wirtschaftlichen Wert des Dauerstreits abzubilden.' },
    { q: 'Was gilt bei einer Räumungsklage?', a: 'Beim Streit über den Bestand eines Miet- oder Pachtverhältnisses ist der Streitwert höchstens die Jahresmiete bzw. der Jahrespachtzins (§ 41 GKG), nicht der 3,5-fache Wert.' },
    { q: 'Wie wird ein Mietrückstand bewertet?', a: 'Geht es nur um konkret aufgelaufene Rückstände, ist deren Summe der Streitwert – also Monatsbetrag mal Anzahl der Monate. Wähle dazu „aufgelaufener Rückstand".' },
    { q: 'Wofür brauche ich den Streitwert?', a: 'Er bestimmt die Höhe der Gerichts- und Anwaltsgebühren sowie die sachliche Zuständigkeit (Amts- oder Landgericht) und die Statthaftigkeit von Rechtsmitteln.' },
    { q: 'Wer legt den Streitwert endgültig fest?', a: 'Das Gericht setzt den Streitwert durch Beschluss fest. Dieser Rechner liefert die übliche Berechnungsgrundlage als Orientierung.' },
  ],
  related: ['gerichtskosten-rechner', 'anwaltskosten-rechner', 'prozesskostenrisiko-rechner'],
  examples: [
    {
      values: { monatsbetrag: 800, art: 'unbefristet', monateRueckstand: 3 },
      expect: [
        { label: 'Streitwert', value: 33600, tolerance: 0.5 },
        { label: 'Jahresbetrag', value: 9600, tolerance: 0.5 },
      ],
    },
    {
      values: { monatsbetrag: 800, art: 'mietverhaeltnis', monateRueckstand: 0 },
      expect: [
        { label: 'Streitwert', value: 9600, tolerance: 0.5 },
      ],
    },
  ],
  updated: '2026-06-18',
};
