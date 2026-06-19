import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

// PKH-Freibeträge nach § 115 ZPO – Näherungswerte Stand 2026 (jährlich angepasst).
const F_PARTEI = 619; // Grundfreibetrag der Partei
const F_ERWERB = 282; // Erwerbstätigenzuschlag
const F_PARTNER = 552; // Freibetrag für Ehegatten/Partner ohne eigenes Einkommen
const F_KIND = 512; // Freibetrag je unterhaltsberechtigtem Kind (Näherung, altersabhängig)

export const tool: Tool = {
  slug: 'prozesskostenhilfe-rechner',
  category: 'recht',
  title: 'Prozesskostenhilfe-Rechner (einzusetzendes Einkommen)',
  shortTitle: 'Prozesskostenhilfe',
  description:
    'Schätze dein einzusetzendes Einkommen für Prozesskostenhilfe (PKH): Nettoeinkommen abzüglich Freibeträgen, Unterhalt und Wohnkosten nach § 115 ZPO. Näherung, Stand 2026.',
  keywords: [
    'prozesskostenhilfe rechner',
    'pkh einkommensgrenze',
    'pkh einzusetzendes einkommen',
    'prozesskostenhilfe berechnen',
    'pkh freibetrag 2026',
    '115 zpo rechner',
  ],
  formula:
    'Einzusetzendes Einkommen = Netto − Parteifreibetrag − (Erwerbszuschlag) − (Partnerfreibetrag) − Kinderfreibeträge − Wohnkosten (§ 115 ZPO, Näherung)',
  inputs: [
    {
      type: 'number',
      id: 'netto',
      label: 'Monatliches Nettoeinkommen (Haushalt)',
      unit: '€',
      default: 1800,
      min: 0,
      step: 10,
      help: 'Alle Einkünfte abzüglich Steuern und Sozialabgaben.',
    },
    {
      type: 'select',
      id: 'erwerb',
      label: 'Erwerbstätig?',
      default: 'ja',
      options: [
        { value: 'ja', label: 'ja (Erwerbstätigenzuschlag)' },
        { value: 'nein', label: 'nein' },
      ],
    },
    {
      type: 'select',
      id: 'partner',
      label: 'Ehe-/Lebenspartner ohne eigenes Einkommen?',
      default: 'nein',
      options: [
        { value: 'ja', label: 'ja' },
        { value: 'nein', label: 'nein' },
      ],
      help: 'Hat der Partner eigenes Einkommen, ist es gesondert zu berücksichtigen.',
    },
    {
      type: 'number',
      id: 'kinder',
      label: 'Unterhaltsberechtigte Kinder',
      unit: '',
      default: 0,
      min: 0,
      max: 10,
      step: 1,
    },
    {
      type: 'number',
      id: 'wohnkosten',
      label: 'Wohnkosten (Miete inkl. Heizung)',
      unit: '€',
      default: 500,
      min: 0,
      step: 10,
      help: 'Angemessene Unterkunfts- und Heizkosten werden abgezogen.',
    },
  ],
  compute: (v) => {
    const netto = Math.max(0, num(v.netto));
    const erwerb = String(v.erwerb) === 'ja';
    const partner = String(v.partner) === 'ja';
    const kinder = Math.min(Math.max(0, Math.round(num(v.kinder))), 10);
    const wohnkosten = Math.max(0, num(v.wohnkosten));

    let freibetraege = F_PARTEI;
    if (erwerb) freibetraege += F_ERWERB;
    if (partner) freibetraege += F_PARTNER;
    freibetraege += kinder * F_KIND;

    const abzugGesamt = freibetraege + wohnkosten;
    const einzusetzen = Math.max(0, netto - abzugGesamt);

    // Bewertung: bis ca. 20 € einzusetzendes Einkommen -> PKH ohne Raten; darüber Ratenzahlung.
    let bewertung: string;
    if (einzusetzen <= 20) bewertung = 'voraussichtlich PKH ohne Ratenzahlung';
    else bewertung = 'voraussichtlich PKH gegen Ratenzahlung';

    // Monatsrate: vereinfacht die Hälfte des einzusetzenden Einkommens (§ 115 Abs. 2 ZPO).
    const rate = einzusetzen <= 20 ? 0 : Math.round((einzusetzen / 2) * 2) / 2;

    return [
      { label: 'Einzusetzendes Einkommen', value: einzusetzen, unit: '€', digits: 0, primary: true },
      { label: 'Einschätzung', value: bewertung },
      { label: 'Abgezogene Freibeträge', value: freibetraege, unit: '€', digits: 0 },
      { label: 'Geschätzte Monatsrate', value: rate, unit: '€', digits: 2 },
    ];
  },
  intro:
    'Prozesskostenhilfe (PKH) ermöglicht es, einen Zivilprozess auch bei geringem Einkommen zu führen. Maßgeblich ist das „einzusetzende Einkommen“ nach § 115 ZPO: Vom Nettoeinkommen werden Freibeträge (Partei, Erwerbstätigkeit, Partner, Kinder) sowie angemessene Wohnkosten abgezogen. Bleibt danach (gerundet) kaum etwas übrig, wird PKH ohne Raten gewährt; sonst gegen monatliche Raten. Die hier verwendeten Beträge sind Näherungswerte (Stand 2026, jährlich angepasst). Der Rechner liefert eine grobe Orientierung und ersetzt keine Rechtsberatung.',
  howto: [
    'Monatliches Netto des Haushalts eintragen.',
    'Angeben, ob du erwerbstätig bist und ob ein Partner ohne Einkommen vorhanden ist.',
    'Zahl der unterhaltsberechtigten Kinder und die Wohnkosten eingeben.',
    'Einzusetzendes Einkommen und Einschätzung zur PKH ablesen.',
  ],
  faq: [
    {
      q: 'Was ist das einzusetzende Einkommen?',
      a: 'Der Betrag, der nach Abzug der gesetzlichen Freibeträge und Belastungen vom Nettoeinkommen übrig bleibt (§ 115 ZPO). Er entscheidet, ob PKH ohne oder mit Raten gewährt wird.',
    },
    {
      q: 'Wann gibt es PKH ohne Raten?',
      a: 'Wenn das einzusetzende Einkommen so niedrig ist, dass keine zumutbare Rate verbleibt (in der Praxis bis etwa 20 € monatlich). Andernfalls werden bis zu 48 Monatsraten festgesetzt.',
    },
    {
      q: 'Sind die Freibeträge hier verbindlich?',
      a: 'Nein. Es sind Näherungswerte für 2026. Die genauen Beträge gibt das Bundesjustizministerium jährlich per Bekanntmachung vor; Kinderfreibeträge sind zudem altersabhängig.',
    },
    {
      q: 'Wird Vermögen berücksichtigt?',
      a: 'Ja. Einzusetzen ist auch verwertbares Vermögen; ein angemessenes Schonvermögen bleibt frei. Dieser Rechner betrachtet nur das Einkommen.',
    },
  ],
  related: ['prozesskostenrisiko-rechner', 'gerichtskosten-rechner', 'anwaltskosten-rechner'],
  examples: [
    {
      // Netto 1800, erwerbstätig, kein Partner, 0 Kinder, Wohnkosten 500
      // Freibeträge = 619 + 282 = 901; Abzug = 901 + 500 = 1401; einzusetzen = 399
      values: { netto: 1800, erwerb: 'ja', partner: 'nein', kinder: 0, wohnkosten: 500 },
      expect: [
        { label: 'Einzusetzendes Einkommen', value: 399, tolerance: 0.5 },
        { label: 'Abgezogene Freibeträge', value: 901, tolerance: 0.5 },
        { label: 'Geschätzte Monatsrate', value: 199.5, tolerance: 0.5 },
      ],
    },
    {
      // Netto 2600, erwerbstätig, Partner, 2 Kinder, Wohnkosten 700
      // Freibeträge = 619 + 282 + 552 + 2*512 = 2477; Abzug = 2477 + 700 = 3177; einzusetzen = 0
      values: { netto: 2600, erwerb: 'ja', partner: 'ja', kinder: 2, wohnkosten: 700 },
      expect: [
        { label: 'Einzusetzendes Einkommen', value: 0, tolerance: 0.5 },
        { label: 'Abgezogene Freibeträge', value: 2477, tolerance: 0.5 },
        { label: 'Geschätzte Monatsrate', value: 0, tolerance: 0.01 },
      ],
    },
  ],
  updated: '2026-06-19',
};
