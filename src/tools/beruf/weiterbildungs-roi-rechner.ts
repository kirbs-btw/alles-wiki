import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'weiterbildungs-roi-rechner',
  category: 'beruf',
  title: 'Weiterbildungs-ROI-Rechner',
  shortTitle: 'Weiterbildungs-ROI',
  description:
    'Lohnt sich deine Weiterbildung? Berechne die Amortisationsdauer und den Return on Investment aus Kosten, erwarteter Gehaltssteigerung und entgangenem Verdienst.',
  keywords: [
    'weiterbildung roi rechner',
    'lohnt sich weiterbildung',
    'fortbildung amortisation',
    'weiterbildung kosten nutzen',
    'return on investment weiterbildung',
    'weiterbildung gehaltssteigerung',
  ],
  formula:
    'Jährl. Mehrertrag = Gehaltsplus/Jahr ; Gesamtkosten = Kursgebühr + entgangener Verdienst ; Amortisation = Gesamtkosten ÷ Mehrertrag ; ROI = (Mehrertrag × Jahre − Gesamtkosten) ÷ Gesamtkosten',
  inputs: [
    { type: 'number', id: 'kosten', label: 'Kosten der Weiterbildung', unit: '€', default: 6000, min: 0, step: 100, help: 'Kursgebühren, Material, Prüfungsgebühren, Reisekosten.' },
    { type: 'number', id: 'entgang', label: 'Entgangener Verdienst', unit: '€', default: 0, min: 0, step: 100, help: 'Nettoeinkommen, das du während der Weiterbildung verlierst (z. B. unbezahlte Freistellung).' },
    { type: 'number', id: 'gehaltsplus', label: 'Erwartete Gehaltssteigerung pro Jahr', unit: '€', default: 4000, min: 0, step: 100, help: 'Brutto-Mehrverdienst pro Jahr nach der Weiterbildung.' },
    { type: 'number', id: 'horizont', label: 'Betrachtungszeitraum', unit: 'Jahre', default: 5, min: 1, max: 40, step: 1, help: 'Über wie viele Jahre du den Nutzen rechnest.' },
  ],
  compute: (v) => {
    const kosten = num(v.kosten);
    const entgang = num(v.entgang);
    const gehaltsplus = num(v.gehaltsplus);
    const horizont = num(v.horizont);

    const gesamtkosten = kosten + entgang;
    const mehrertrag = gehaltsplus * horizont;
    const netto = mehrertrag - gesamtkosten;
    const amortisation = gehaltsplus > 0 ? gesamtkosten / gehaltsplus : 0;
    const roi = gesamtkosten > 0 ? (netto / gesamtkosten) * 100 : 0;

    return [
      { label: 'Amortisationsdauer', value: amortisation, unit: 'Jahre', digits: 2, primary: true, help: 'Zeit, bis das Gehaltsplus die Kosten ausgleicht.' },
      { label: 'ROI über Zeitraum', value: roi, unit: '%', digits: 1, help: 'Rendite der Weiterbildung über den Betrachtungszeitraum.' },
      { label: 'Mehrverdienst über Zeitraum', value: mehrertrag, unit: '€', digits: 2 },
      { label: 'Netto-Gewinn über Zeitraum', value: netto, unit: '€', digits: 2, help: 'Mehrverdienst abzüglich aller Kosten.' },
    ];
  },
  intro:
    'Eine Weiterbildung kostet Geld und oft auch Einkommen während der Lernphase – im Gegenzug winkt ein höheres Gehalt. Dieser Rechner stellt die Gesamtkosten dem erwarteten Mehrverdienst gegenüber und zeigt, nach wie vielen Jahren sich die Investition amortisiert und welchen Return on Investment sie über deinen Betrachtungszeitraum bringt. Steuerliche Effekte und Fördermittel sind nicht berücksichtigt.',
  howto: [
    'Trage die direkten Kosten der Weiterbildung ein.',
    'Gib den während der Weiterbildung entgangenen Verdienst an (falls vorhanden).',
    'Schätze deine jährliche Gehaltssteigerung nach Abschluss.',
    'Wähle den Betrachtungszeitraum und lies Amortisation und ROI ab.',
  ],
  faq: [
    { q: 'Was bedeutet die Amortisationsdauer?', a: 'Sie gibt an, nach wie vielen Jahren das zusätzliche Gehalt die gesamten Kosten der Weiterbildung wieder eingespielt hat. Eine kürzere Dauer bedeutet eine schnellere Rentabilität.' },
    { q: 'Sind Steuern und Förderung berücksichtigt?', a: 'Nein. Die Gehaltssteigerung wird brutto angesetzt, Steuern, Sozialabgaben und mögliche Förderungen (z. B. Bildungsprämie, Aufstiegs-BAföG) sind nicht einbezogen. Das Ergebnis ist eine grobe Orientierung.' },
    { q: 'Was zählt zum entgangenen Verdienst?', a: 'Einkommen, das du während der Weiterbildung nicht erhältst – etwa bei unbezahlter Freistellung oder reduzierter Arbeitszeit. Bei berufsbegleitender Weiterbildung trägst du hier oft 0 € ein.' },
    { q: 'Wie realistisch ist die Gehaltssteigerung?', a: 'Setze den Wert konservativ an. Eine Weiterbildung garantiert kein höheres Gehalt; orientiere dich an Branchenwerten oder konkreten Stellenangeboten für die angestrebte Qualifikation.' },
  ],
  related: ['gehaltserhoehung-rechner', 'jahresgehalt-rechner', 'stundenlohn-rechner'],
  updated: '2026-06-19',
  examples: [
    {
      values: { kosten: 6000, entgang: 0, gehaltsplus: 4000, horizont: 5 },
      expect: [
        { label: 'Amortisationsdauer', value: 1.5, tolerance: 0.01 },
        { label: 'Mehrverdienst über Zeitraum', value: 20000, tolerance: 0.01 },
        { label: 'Netto-Gewinn über Zeitraum', value: 14000, tolerance: 0.01 },
        { label: 'ROI über Zeitraum', value: 233.3, tolerance: 0.1 },
      ],
    },
  ],
};
