import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'maklerprovision-rechner',
  category: 'wohnen',
  title: 'Maklerprovision-Rechner (Courtage)',
  shortTitle: 'Maklerprovision',
  description:
    'Berechne die Maklercourtage beim Immobilienkauf inklusive Mehrwertsteuer und – bei hälftiger Teilung – den Anteil von Käufer und Verkäufer.',
  keywords: [
    'maklerprovision berechnen',
    'maklercourtage rechner',
    'maklergebühr immobilie',
    'courtage käufer anteil',
    'maklerprovision mit mwst',
    'provision hauskauf',
    'maklerkosten rechner',
  ],
  formula:
    'Provision brutto = Kaufpreis × Satz/100 × 1,19; Käuferanteil = Provision × Aufteilung',
  inputs: [
    { type: 'number', id: 'kaufpreis', label: 'Kaufpreis', unit: '€', default: 350000, min: 0, step: 1000 },
    { type: 'number', id: 'satz', label: 'Provisionssatz (netto, je Partei)', unit: '%', default: 3.57, min: 0, max: 10, step: 0.01, help: 'Üblich sind 3,57 % netto bzw. 3,57 % zzgl. MwSt je Seite. Hier als Nettosatz eintragen.' },
    {
      type: 'select', id: 'aufteilung', label: 'Aufteilung der Provision', default: 'haelfte',
      options: [
        { value: 'haelfte', label: 'Hälftig geteilt (Käufer 50 %)' },
        { value: 'voll', label: 'Käufer trägt volle Provision' },
      ],
    },
  ],
  compute: (v) => {
    const kaufpreis = num(v.kaufpreis);
    const satz = num(v.satz);
    const provisionNettoGesamt = kaufpreis * (satz / 100) * (String(v.aufteilung) === 'haelfte' ? 2 : 1);
    const provisionBruttoGesamt = provisionNettoGesamt * 1.19;
    const kaeuferAnteil = String(v.aufteilung) === 'haelfte' ? provisionBruttoGesamt / 2 : provisionBruttoGesamt;
    const verkaeuferAnteil = provisionBruttoGesamt - kaeuferAnteil;
    const mwst = provisionBruttoGesamt - provisionNettoGesamt;
    return [
      { label: 'Provision Käufer (brutto)', value: kaeuferAnteil, unit: '€', digits: 2, primary: true },
      { label: 'Provision Verkäufer (brutto)', value: verkaeuferAnteil, unit: '€', digits: 2 },
      { label: 'Provision gesamt (brutto)', value: provisionBruttoGesamt, unit: '€', digits: 2 },
      { label: 'davon Mehrwertsteuer', value: mwst, unit: '€', digits: 2 },
    ];
  },
  intro:
    'Beim Kauf einer Immobilie fällt häufig eine Maklerprovision (Courtage) an, die auf den Kaufpreis berechnet wird und der Mehrwertsteuer unterliegt. Seit Dezember 2020 gilt beim Kauf von Wohnungen und Einfamilienhäusern das Halbteilungsprinzip: Wer den Makler beauftragt, muss mindestens die Hälfte der Provision selbst tragen. Übliche Sätze liegen bei rund 3,57 % netto je Seite.',
  howto: [
    'Kaufpreis der Immobilie eintragen.',
    'Provisionssatz netto je Partei angeben (oft 3,57 %).',
    'Aufteilung wählen: hälftig geteilt oder Käufer trägt alles.',
    'Provisionsanteile inklusive Mehrwertsteuer ablesen.',
  ],
  faq: [
    { q: 'Wie hoch ist die übliche Maklerprovision?', a: 'Marktüblich sind je nach Region rund 3,57 % des Kaufpreises netto je Partei (zzgl. MwSt entspricht das etwa 4,25 % brutto je Seite, zusammen also rund 7,14 % netto). Die Höhe ist jedoch frei verhandelbar.' },
    { q: 'Was bedeutet das Halbteilungsprinzip?', a: 'Beim Kauf von Wohnungen und Einfamilienhäusern muss die Partei, die den Makler beauftragt hat, seit Ende 2020 mindestens die Hälfte der Provision tragen. Der Käufer kann höchstens den gleichen Anteil wie der Verkäufer aufgebracht bekommen.' },
    { q: 'Ist auf die Provision Mehrwertsteuer fällig?', a: 'Ja, die Maklercourtage ist eine Dienstleistung und unterliegt dem Regelsatz von 19 % Umsatzsteuer. Der Rechner addiert die Mehrwertsteuer automatisch auf den Nettosatz.' },
    { q: 'Wann wird die Provision fällig?', a: 'Die Provision wird in der Regel fällig, wenn ein wirksamer Kaufvertrag durch die Maklertätigkeit zustande gekommen ist (notarielle Beurkundung). Die genauen Bedingungen stehen im Maklervertrag.' },
  ],
  related: ['grunderwerbsteuer-rechner', 'mietrendite-rechner', 'kaution-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { kaufpreis: 350000, satz: 3.57, aufteilung: 'haelfte' },
      expect: [
        { label: 'Provision gesamt (brutto)', value: 29738.1, tolerance: 1 },
        { label: 'Provision Käufer (brutto)', value: 14869.05, tolerance: 1 },
      ],
    },
  ],
};
