import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'modernisierungsumlage-rechner',
  category: 'wohnen',
  title: 'Modernisierungsumlage-Rechner',
  shortTitle: 'Modernisierungsumlage',
  description:
    'Berechne, um wie viel die Miete nach einer Modernisierung steigen darf: 8 % der umlegbaren Kosten pro Jahr – inklusive der gesetzlichen Kappung.',
  keywords: [
    'modernisierungsumlage berechnen',
    'modernisierung mieterhöhung rechner',
    '8 prozent modernisierung',
    'modernisierungskosten umlage',
    'mieterhöhung modernisierung',
    'modernisierung kappungsgrenze',
  ],
  formula:
    'Jährliche Umlage = umlegbare Kosten × 8 %; monatlich = /12; gekappt auf 3 €/m² (bzw. 2 € bei Miete < 7 €/m²) je 6 Jahre',
  inputs: [
    { type: 'number', id: 'kosten', label: 'Umlegbare Modernisierungskosten', unit: '€', default: 30000, min: 0, step: 500, help: 'Modernisierungskosten abzüglich Instandhaltungsanteil und Förderungen.' },
    { type: 'number', id: 'flaeche', label: 'Wohnfläche', unit: 'm²', default: 70, min: 1, step: 1 },
    { type: 'number', id: 'aktuelleMiete', label: 'Aktuelle Kaltmiete', unit: '€', default: 500, min: 0, step: 10, help: 'Nettokaltmiete vor der Modernisierung.' },
  ],
  compute: (v) => {
    const kosten = num(v.kosten);
    const flaeche = num(v.flaeche);
    const aktuelleMiete = num(v.aktuelleMiete);
    const jaehrlich = kosten * 0.08;
    const monatlichRoh = jaehrlich / 12;
    const mieteProQm = flaeche > 0 ? aktuelleMiete / flaeche : 0;
    const kappungProQm = mieteProQm < 7 ? 2 : 3;
    const kappungGesamt = kappungProQm * flaeche;
    const monatlich = Math.min(monatlichRoh, kappungGesamt);
    const neueMiete = aktuelleMiete + monatlich;
    return [
      { label: 'Monatliche Mieterhöhung', value: monatlich, unit: '€', digits: 2, primary: true },
      { label: 'Neue Kaltmiete', value: neueMiete, unit: '€', digits: 2 },
      { label: 'Jährliche Umlage (8 %)', value: jaehrlich, unit: '€', digits: 2 },
      { label: 'Monatliche Kappungsgrenze', value: kappungGesamt, unit: '€', digits: 2 },
    ];
  },
  intro:
    'Nach einer Modernisierung dürfen Vermieter 8 % der umlegbaren Kosten pro Jahr auf die Jahresmiete aufschlagen (§ 559 BGB). Zusätzlich gilt eine Kappung: Innerhalb von sechs Jahren darf die Miete je Quadratmeter um höchstens 3 € steigen – bei einer Ausgangsmiete unter 7 €/m² nur um 2 €/m². Reine Instandhaltungskosten und Förderungen sind vorher abzuziehen. Dieser Rechner ist eine Orientierung nach dem Stand 2026; im Einzelfall zählen die genaue Kostenaufteilung und die Modernisierungsankündigung.',
  howto: [
    'Umlegbare Modernisierungskosten eintragen (ohne Instandhaltungsanteil und Förderung).',
    'Wohnfläche der Wohnung angeben.',
    'Aktuelle Nettokaltmiete eingeben – sie entscheidet über die Kappung (2 oder 3 €/m²).',
    'Monatliche Erhöhung und neue Miete ablesen.',
  ],
  faq: [
    { q: 'Wie viel darf nach Modernisierung umgelegt werden?', a: 'Pro Jahr 8 % der umlegbaren Modernisierungskosten. Bei 30.000 € sind das 2.400 € jährlich oder 200 € im Monat – allerdings begrenzt durch die Kappung von 2 bzw. 3 € je Quadratmeter in sechs Jahren.' },
    { q: 'Was zählt nicht zu den umlegbaren Kosten?', a: 'Erhaltungs- und Instandhaltungskosten müssen herausgerechnet werden, ebenso öffentliche Förderungen und zinsverbilligte Darlehen. Nur die echte Verbesserung der Wohnqualität oder Energieeinsparung ist umlagefähig.' },
    { q: 'Wann gilt die niedrigere Kappung von 2 €/m²?', a: 'Wenn die monatliche Kaltmiete vor der Modernisierung unter 7 € pro Quadratmeter liegt. Dann darf die Miete in sechs Jahren nur um 2 €/m² statt 3 €/m² steigen.' },
    { q: 'Ist die Berechnung verbindlich?', a: 'Nein. Sie liefert eine Orientierung nach § 559 BGB (Stand 2026). Maßgeblich sind die formgerechte Ankündigung, die genaue Kostenabgrenzung und örtliche Besonderheiten.' },
  ],
  related: ['mieterhoehung-rechner', 'instandhaltungsruecklage-rechner', 'quadratmeterpreis-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { kosten: 30000, flaeche: 70, aktuelleMiete: 800 },
      expect: [
        { label: 'Monatliche Mieterhöhung', value: 200, tolerance: 0.01 },
        { label: 'Jährliche Umlage (8 %)', value: 2400, tolerance: 0.01 },
        { label: 'Monatliche Kappungsgrenze', value: 210, tolerance: 0.01 },
      ],
    },
    {
      values: { kosten: 40000, flaeche: 60, aktuelleMiete: 360 },
      expect: [
        { label: 'Monatliche Mieterhöhung', value: 120, tolerance: 0.01 },
        { label: 'Neue Kaltmiete', value: 480, tolerance: 0.01 },
      ],
    },
  ],
};
