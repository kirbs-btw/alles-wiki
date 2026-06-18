import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'provision-rechner',
  category: 'beruf',
  title: 'Provisions-Rechner',
  shortTitle: 'Provision',
  description:
    'Berechne deine Provision aus Umsatz und Provisionssatz – inklusive Fixgehalt, Gesamtverdienst im Monat und Provisionsanteil am Gesamteinkommen.',
  keywords: [
    'provision rechner',
    'provision berechnen',
    'provisionssatz berechnen',
    'umsatzprovision',
    'verkaufsprovision rechner',
    'fixum plus provision',
    'gehalt mit provision',
  ],
  inputs: [
    { type: 'number', id: 'umsatz', label: 'Provisionsrelevanter Umsatz', unit: '€', default: 50000, min: 0, step: 500 },
    { type: 'number', id: 'satz', label: 'Provisionssatz', unit: '%', default: 5, min: 0, max: 100, step: 0.5 },
    { type: 'number', id: 'fixum', label: 'Fixgehalt (brutto, monatlich)', unit: '€', default: 2000, min: 0, step: 50, help: 'Festes Grundgehalt. 0 eintragen bei reiner Provisionsvergütung.' },
  ],
  formula:
    'Provision = Umsatz × Provisionssatz% ; Gesamtverdienst = Fixum + Provision',
  compute: (v) => {
    const umsatz = num(v.umsatz);
    const satz = num(v.satz);
    const fixum = num(v.fixum);

    const provision = umsatz * (satz / 100);
    const gesamt = fixum + provision;
    const anteil = gesamt > 0 ? (provision / gesamt) * 100 : 0;

    return [
      { label: 'Provision', value: provision, unit: '€', digits: 2, primary: true },
      { label: 'Gesamtverdienst (mit Fixum)', value: gesamt, unit: '€', digits: 2 },
      { label: 'Provisionsanteil am Verdienst', value: anteil, unit: '%', digits: 1 },
      { label: 'Provision auf 100 € Umsatz', value: satz, unit: '€', digits: 2, help: 'Bei diesem Satz verdienst du je 100 € Umsatz diesen Betrag.' },
    ];
  },
  intro:
    'Im Vertrieb setzt sich das Einkommen oft aus einem Fixgehalt plus Provision zusammen. Dieser Rechner ermittelt deine Provision aus Umsatz und Provisionssatz, addiert das Fixum und zeigt, welcher Anteil deines Verdienstes leistungsabhängig ist.',
  howto: [
    'Trage den provisionsrelevanten Umsatz für den Zeitraum ein.',
    'Gib deinen Provisionssatz in Prozent an.',
    'Trage dein monatliches Fixgehalt ein (0 bei reiner Provision).',
    'Lies Provision, Gesamtverdienst und Provisionsanteil ab.',
  ],
  faq: [
    { q: 'Wird die Provision auf Netto- oder Brutto-Umsatz berechnet?', a: 'Üblich ist der Netto-Umsatz ohne Umsatzsteuer. Maßgeblich ist aber die vertragliche Vereinbarung – manche Modelle stellen auf den Deckungsbeitrag oder die bezahlte Rechnung ab.' },
    { q: 'Was bedeutet ein Provisionsanteil von z. B. 60 %?', a: 'Dann stammen 60 % deines Gesamtverdienstes aus der Provision und 40 % aus dem Fixgehalt. Ein hoher Anteil bedeutet mehr Verdienstchancen, aber auch mehr Schwankung.' },
    { q: 'Sind das Brutto- oder Nettowerte?', a: 'Die Berechnung ist brutto. Auf Provision fallen wie auf das Fixgehalt Steuern und Sozialabgaben an.' },
    { q: 'Wann entsteht der Provisionsanspruch?', a: 'Bei angestellten Handelsvertretern entsteht der Anspruch grundsätzlich mit Ausführung des Geschäfts. Stornoreserven oder Rückforderungen bei Vertragsrücktritt regelt der Arbeitsvertrag.' },
    { q: 'Kann ich gestaffelte Sätze abbilden?', a: 'Dieser Rechner nutzt einen einheitlichen Satz. Bei Staffeln rechnest du die Stufen einzeln und addierst die Teilprovisionen.' },
  ],
  related: ['gehaltserhoehung-rechner', 'nachtzuschlag-rechner', 'stundenlohn-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { umsatz: 50000, satz: 5, fixum: 2000 },
      expect: [
        { label: 'Provision', value: 2500, tolerance: 0.01 },
        { label: 'Gesamtverdienst (mit Fixum)', value: 4500, tolerance: 0.01 },
      ],
    },
  ],
};
