import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'kosten-kind-rechner',
  category: 'familie',
  title: 'Kosten für ein Kind pro Monat',
  shortTitle: 'Kosten Kind',
  description:
    'Addiere die monatlichen Kosten für ein Kind: Verpflegung, Kleidung, Betreuung, Freizeit, Wohnen und mehr – mit Jahressumme und Netto-Belastung.',
  keywords: [
    'was kostet ein kind',
    'kosten kind pro monat',
    'kinderkosten rechner',
    'kosten kind im monat',
    'unterhaltskosten kind',
    'wie teuer ist ein kind',
    'ausgaben kind',
  ],
  intro:
    'Wie viel kostet ein Kind im Monat? Dieser Rechner summiert die wichtigsten Ausgabenposten – von Ernährung über Kleidung bis Betreuung – und zieht das Kindergeld ab. So sehen Sie die monatliche und jährliche Belastung sowie die tatsächliche Netto-Belastung für die Familie.',
  formula:
    'Gesamtkosten = Summe aller Posten; Netto-Belastung = Gesamtkosten − Kindergeld',
  inputs: [
    { type: 'number', id: 'ernaehrung', label: 'Ernährung & Verpflegung', unit: '€/Monat', default: 150, min: 0, step: 10 },
    { type: 'number', id: 'kleidung', label: 'Kleidung & Schuhe', unit: '€/Monat', default: 50, min: 0, step: 5 },
    { type: 'number', id: 'betreuung', label: 'Betreuung (Kita/Hort)', unit: '€/Monat', default: 120, min: 0, step: 10 },
    { type: 'number', id: 'wohnen', label: 'Wohnanteil (mehr Wohnraum)', unit: '€/Monat', default: 150, min: 0, step: 10 },
    { type: 'number', id: 'freizeit', label: 'Freizeit & Hobbys', unit: '€/Monat', default: 60, min: 0, step: 5 },
    { type: 'number', id: 'sonstiges', label: 'Sonstiges (Schule, Versich.)', unit: '€/Monat', default: 50, min: 0, step: 5 },
    { type: 'number', id: 'kindergeld', label: 'Kindergeld (Abzug)', unit: '€/Monat', default: 255, min: 0, step: 5, help: 'Stand 2026: 255 € pro Kind' },
  ],
  compute: (v) => {
    const ernaehrung = Math.max(0, num(v.ernaehrung));
    const kleidung = Math.max(0, num(v.kleidung));
    const betreuung = Math.max(0, num(v.betreuung));
    const wohnen = Math.max(0, num(v.wohnen));
    const freizeit = Math.max(0, num(v.freizeit));
    const sonstiges = Math.max(0, num(v.sonstiges));
    const kindergeld = Math.max(0, num(v.kindergeld));
    const gesamt = ernaehrung + kleidung + betreuung + wohnen + freizeit + sonstiges;
    const netto = gesamt - kindergeld;
    const proJahr = gesamt * 12;
    const nettoJahr = netto * 12;
    return [
      { label: 'Gesamtkosten pro Monat', value: gesamt, unit: '€', digits: 2, primary: true },
      { label: 'Netto-Belastung pro Monat', value: netto, unit: '€', digits: 2, help: 'nach Abzug Kindergeld' },
      { label: 'Gesamtkosten pro Jahr', value: proJahr, unit: '€', digits: 0 },
      { label: 'Netto-Belastung pro Jahr', value: nettoJahr, unit: '€', digits: 0 },
    ];
  },
  howto: [
    'Die monatlichen Ausgaben je Kategorie eintragen.',
    'Den Wohnanteil schätzen – etwa anteilige Miete für ein zusätzliches Zimmer.',
    'Kindergeld als Abzug eintragen (Stand 2026: 255 € pro Kind).',
    'Gesamt- und Netto-Belastung pro Monat und Jahr ablesen.',
  ],
  faq: [
    { q: 'Was kostet ein Kind durchschnittlich im Monat?', a: 'Studien nennen je nach Alter und Lebensstandard etwa 500 bis 800 € monatlich. Mit steigendem Alter, vor allem in der Ausbildung, nehmen die Kosten meist zu.' },
    { q: 'Sind die Betreuungskosten überall gleich?', a: 'Nein. Kita- und Hortgebühren unterscheiden sich stark je nach Bundesland und Kommune – manche Länder bieten beitragsfreie Kita-Plätze.' },
    { q: 'Warum ist ein Wohnanteil enthalten?', a: 'Ein Kind benötigt zusätzlichen Wohnraum. Üblich ist, einen anteiligen Betrag der Miete für das Kinderzimmer und Gemeinschaftsflächen anzusetzen.' },
    { q: 'Berücksichtigt der Rechner steuerliche Vorteile?', a: 'Nein. Kinderfreibeträge oder absetzbare Betreuungskosten sind hier nicht eingerechnet. Nur das eingegebene Kindergeld wird abgezogen.' },
    { q: 'Wie kann ich Kosten sparen?', a: 'Gebrauchte Kleidung und Spielsachen, Familientarife, beitragsfreie Betreuungsangebote und das Nutzen von Bildungs- und Teilhabeleistungen senken die Ausgaben spürbar.' },
  ],
  related: ['kindergeld-rechner', 'betreuungskosten-rechner', 'taschengeld-rechner'],
  examples: [
    {
      values: { ernaehrung: 150, kleidung: 50, betreuung: 120, wohnen: 150, freizeit: 60, sonstiges: 50, kindergeld: 255 },
      expect: [
        { label: 'Gesamtkosten pro Monat', value: 580, tolerance: 0.01 },
        { label: 'Netto-Belastung pro Monat', value: 325, tolerance: 0.01 },
      ],
    },
  ],
  updated: '2026-06-18',
};
