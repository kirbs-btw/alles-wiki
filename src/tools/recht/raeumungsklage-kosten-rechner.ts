import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

// Einfache Gebühr (1,0) GKG, Anlage 2 zu § 34 GKG (vereinfacht, Stand 2026).
function gkgEinfach(streitwert: number): number {
  if (streitwert <= 0) return 0;
  const stufen: { bis: number; gebuehr: number }[] = [
    { bis: 500, gebuehr: 38 }, { bis: 1000, gebuehr: 58 }, { bis: 1500, gebuehr: 78 },
    { bis: 2000, gebuehr: 98 }, { bis: 3000, gebuehr: 119 }, { bis: 4000, gebuehr: 140 },
    { bis: 5000, gebuehr: 161 }, { bis: 6000, gebuehr: 182 }, { bis: 7000, gebuehr: 203 },
    { bis: 8000, gebuehr: 224 }, { bis: 9000, gebuehr: 245 }, { bis: 10000, gebuehr: 266 },
    { bis: 13000, gebuehr: 295 }, { bis: 16000, gebuehr: 324 }, { bis: 19000, gebuehr: 353 },
    { bis: 22000, gebuehr: 382 }, { bis: 25000, gebuehr: 411 }, { bis: 30000, gebuehr: 449 },
    { bis: 35000, gebuehr: 487 }, { bis: 40000, gebuehr: 525 }, { bis: 45000, gebuehr: 563 },
    { bis: 50000, gebuehr: 601 },
  ];
  for (const s of stufen) if (streitwert <= s.bis) return s.gebuehr;
  return 601 + Math.ceil((streitwert - 50000) / 5000) * 76;
}

// Einfache Gebühr (1,0) RVG, Anlage 2 zu § 13 RVG (Stand 2026).
function rvgEinfach(wert: number): number {
  if (wert <= 0) return 0;
  const stufen: { bis: number; gebuehr: number }[] = [
    { bis: 500, gebuehr: 49 }, { bis: 1000, gebuehr: 88 }, { bis: 1500, gebuehr: 127 },
    { bis: 2000, gebuehr: 166 }, { bis: 3000, gebuehr: 222 }, { bis: 4000, gebuehr: 278 },
    { bis: 5000, gebuehr: 334 }, { bis: 6000, gebuehr: 390 }, { bis: 7000, gebuehr: 446 },
    { bis: 8000, gebuehr: 502 }, { bis: 9000, gebuehr: 558 }, { bis: 10000, gebuehr: 614 },
    { bis: 13000, gebuehr: 666 }, { bis: 16000, gebuehr: 718 }, { bis: 19000, gebuehr: 770 },
    { bis: 22000, gebuehr: 822 }, { bis: 25000, gebuehr: 874 }, { bis: 30000, gebuehr: 955 },
    { bis: 35000, gebuehr: 1036 }, { bis: 40000, gebuehr: 1117 }, { bis: 45000, gebuehr: 1198 },
    { bis: 50000, gebuehr: 1279 },
  ];
  for (const s of stufen) if (wert <= s.bis) return s.gebuehr;
  return 1279;
}

export const tool: Tool = {
  slug: 'raeumungsklage-kosten-rechner',
  category: 'recht',
  title: 'Räumungsklage-Kosten-Rechner',
  shortTitle: 'Räumungsklage',
  description:
    'Schätze die Kosten einer Wohnraum-Räumungsklage: Streitwert = Jahresnettomiete (§ 41 GKG), 3,0 Gerichtsgebühren plus Anwaltskosten beider Seiten (Orientierung 2026).',
  keywords: [
    'räumungsklage kosten rechner',
    'räumungsklage kosten berechnen',
    'kosten räumungsklage wohnung',
    'streitwert räumungsklage',
    'räumungsklage gerichtskosten',
    'was kostet eine räumungsklage',
  ],
  formula:
    'Streitwert = 12 × Nettokaltmiete; Gerichtskosten = 3,0 × GKG-Gebühr; Anwalt/Seite = (1,3 + 1,2 + Pauschale) × RVG-Gebühr',
  inputs: [
    { type: 'number', id: 'kaltmiete', label: 'Monatliche Nettokaltmiete', unit: '€', default: 800, min: 0, step: 50, help: 'Maßgeblich ist die Kaltmiete ohne Nebenkosten; der Streitwert ist die Jahresmiete (§ 41 GKG).' },
    {
      type: 'select', id: 'anwaelte', label: 'Anwaltskosten', default: 'beide',
      options: [
        { value: 'einer', label: 'Nur eigener Anwalt' },
        { value: 'beide', label: 'Beide Seiten anwaltlich vertreten' },
      ],
      help: 'Die unterliegende Partei trägt im Regelfall die Kosten beider Anwälte (§ 91 ZPO).',
    },
  ],
  compute: (v) => {
    const kaltmiete = num(v.kaltmiete);
    const anwaelte = String(v.anwaelte || 'beide');
    const streitwert = kaltmiete * 12;
    const gkg = gkgEinfach(streitwert);
    const gerichtskosten = gkg * 3;
    const rvg = rvgEinfach(streitwert);
    // Anwalt erster Instanz: 1,3 Verfahrensgebühr + 1,2 Terminsgebühr + 20 € Auslagenpauschale (netto).
    const anwaltProSeite = rvg * 1.3 + rvg * 1.2 + 20;
    const anzahlAnwaelte = anwaelte === 'beide' ? 2 : 1;
    const anwaltGesamt = anwaltProSeite * anzahlAnwaelte;
    const gesamt = gerichtskosten + anwaltGesamt;
    return [
      { label: 'Geschätzte Gesamtkosten', value: gesamt, unit: '€', digits: 2, primary: true },
      { label: 'Streitwert (Jahresmiete)', value: streitwert, unit: '€', digits: 2 },
      { label: 'Gerichtskosten (3,0)', value: gerichtskosten, unit: '€', digits: 2 },
      { label: 'Anwaltskosten je Seite', value: anwaltProSeite, unit: '€', digits: 2 },
      { label: 'Anwaltskosten gesamt', value: anwaltGesamt, unit: '€', digits: 2 },
    ];
  },
  intro:
    'Bei einer Räumungsklage über Wohnraum bemisst sich der Streitwert nach der Jahresnettomiete (§ 41 Abs. 2 GKG). Daraus ergeben sich die Gerichtskosten (in erster Instanz eine 3,0-fache Gebühr) sowie die Anwaltsgebühren nach dem RVG (Verfahrens- und Terminsgebühr je Seite). Die unterliegende Partei trägt regelmäßig die gesamten Kosten (§ 91 ZPO). Dieser Rechner gibt eine vereinfachte Näherung ohne Umsatzsteuer (Stand 2026); Vollstreckungs- und Gerichtsvollzieherkosten der eigentlichen Räumung sind nicht enthalten.',
  howto: [
    'Monatliche Nettokaltmiete eingeben – der Streitwert ist die Jahresmiete.',
    'Wählen, ob eine oder beide Seiten anwaltlich vertreten sind.',
    'Geschätzte Gesamtkosten aus Gerichts- und Anwaltskosten ablesen.',
    'Beachten: Die spätere Zwangsräumung verursacht zusätzliche Kosten.',
  ],
  faq: [
    { q: 'Wie hoch ist der Streitwert einer Räumungsklage?', a: 'Bei Wohnraum entspricht der Streitwert dem Jahresbetrag der Nettokaltmiete (§ 41 Abs. 2 GKG), also der zwölffachen Monatskaltmiete. Werden zusätzlich Mietrückstände eingeklagt, kann sich der Wert erhöhen.' },
    { q: 'Wer zahlt die Kosten der Räumungsklage?', a: 'Im Regelfall trägt die unterliegende Partei alle Kosten – also Gerichtskosten und die Anwaltskosten beider Seiten (§ 91 ZPO). Verliert der Mieter, muss er somit auch den Anwalt des Vermieters bezahlen.' },
    { q: 'Sind die Kosten der Zwangsräumung enthalten?', a: 'Nein. Dieser Rechner deckt nur das gerichtliche Erkenntnisverfahren ab. Die anschließende Zwangsräumung durch den Gerichtsvollzieher (inklusive Spedition und Einlagerung) verursacht zusätzliche, oft erhebliche Kosten.' },
    { q: 'Wie genau ist die Schätzung?', a: 'Die Werte folgen den Gebührentabellen von GKG und RVG (Stand 2026) und einer typischen Gebührenstruktur erster Instanz. Die verbindliche Festsetzung trifft das Gericht; Umsatzsteuer ist nicht berücksichtigt.' },
  ],
  related: ['raeumungsfrist-rechner', 'gerichtskosten-rechner', 'rvg-prozesskosten-rechner'],
  examples: [
    {
      // Streitwert 9600 -> GKG(<=10000)=266, Gericht 798; RVG(<=10000)=614 -> Anwalt 614*2.5+20 = 1555; beide = 3110; gesamt = 3908
      values: { kaltmiete: 800, anwaelte: 'beide' },
      expect: [
        { label: 'Streitwert (Jahresmiete)', value: 9600, tolerance: 0.5 },
        { label: 'Gerichtskosten (3,0)', value: 798, tolerance: 0.5 },
        { label: 'Anwaltskosten je Seite', value: 1555, tolerance: 0.5 },
        { label: 'Geschätzte Gesamtkosten', value: 3908, tolerance: 1 },
      ],
    },
    {
      // Streitwert 6000 -> GKG 182, Gericht 546; RVG 390 -> Anwalt 390*2.5+20 = 995; einer; gesamt = 1541
      values: { kaltmiete: 500, anwaelte: 'einer' },
      expect: [
        { label: 'Streitwert (Jahresmiete)', value: 6000, tolerance: 0.5 },
        { label: 'Anwaltskosten je Seite', value: 995, tolerance: 0.5 },
        { label: 'Geschätzte Gesamtkosten', value: 1541, tolerance: 1 },
      ],
    },
  ],
  updated: '2026-06-19',
};
