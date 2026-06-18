import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'kosten-pro-nutzung-rechner',
  category: 'alltag',
  title: 'Kosten pro Nutzung berechnen',
  shortTitle: 'Kosten pro Nutzung',
  description:
    'Berechne, was eine Anschaffung pro tatsächlicher Nutzung kostet – ideal, um Abos, Geräte oder teure Kleidung ehrlich zu vergleichen.',
  keywords: [
    'kosten pro nutzung',
    'cost per use rechner',
    'lohnt sich die anschaffung',
    'preis pro nutzung berechnen',
    'abo kosten pro nutzung',
    'kosten pro tragen',
    'amortisation alltag',
  ],
  formula:
    'Effektive Kosten = Anschaffung − Wiederverkaufswert; Kosten pro Nutzung = Effektive Kosten / (Nutzungen pro Jahr × Jahre)',
  inputs: [
    { type: 'number', id: 'preis', label: 'Anschaffungspreis', unit: '€', default: 600, min: 0, step: 10 },
    { type: 'number', id: 'nutzungen_jahr', label: 'Nutzungen pro Jahr', default: 50, min: 0, step: 1, help: 'Wie oft pro Jahr nutzt du es realistisch?' },
    { type: 'number', id: 'jahre', label: 'Geplante Nutzungsdauer', unit: 'Jahre', default: 4, min: 0, step: 1 },
    { type: 'number', id: 'wiederverkauf', label: 'Erwarteter Wiederverkaufswert', unit: '€', default: 0, min: 0, step: 10, help: 'Was bekommst du am Ende noch dafür? 0, wenn nichts.' },
  ],
  compute: (v) => {
    const preis = num(v.preis);
    const nutzJahr = num(v.nutzungen_jahr);
    const jahre = num(v.jahre);
    const wiederverkauf = num(v.wiederverkauf);
    const effektiv = preis - wiederverkauf;
    const gesamtNutzungen = nutzJahr * jahre;
    const proNutzung = gesamtNutzungen > 0 ? effektiv / gesamtNutzungen : 0;
    const proJahr = jahre > 0 ? effektiv / jahre : 0;
    return [
      { label: 'Kosten pro Nutzung', value: proNutzung, unit: '€', digits: 2, primary: true },
      { label: 'Kosten pro Jahr', value: proJahr, unit: '€', digits: 2 },
      { label: 'Nutzungen insgesamt', value: gesamtNutzungen, unit: 'mal', digits: 0 },
      { label: 'Effektive Kosten', value: effektiv, unit: '€', digits: 2 },
    ];
  },
  intro:
    'Eine teure Anschaffung kann sich lohnen, wenn du sie oft nutzt – oder Geldverschwendung sein, wenn sie im Schrank liegt. Die Kennzahl "Kosten pro Nutzung" macht das vergleichbar: Sie teilt den Preis (abzüglich späterem Wiederverkaufswert) durch die Zahl der erwarteten Nutzungen. So siehst du den wahren Preis pro Einsatz.',
  howto: [
    'Gib den Anschaffungspreis ein.',
    'Schätze ehrlich, wie oft du das Produkt pro Jahr nutzt.',
    'Trage die geplante Nutzungsdauer in Jahren ein.',
    'Optional den erwarteten Wiederverkaufswert angeben und die Kosten pro Nutzung ablesen.',
  ],
  faq: [
    { q: 'Wofür ist diese Kennzahl gut?', a: 'Sie hilft, Käufe ehrlich zu bewerten. Eine 600-€-Jacke, die du 200-mal trägst, kostet 3 € pro Nutzung – günstiger als eine 30-€-Jacke, die du zweimal anziehst.' },
    { q: 'Warum den Wiederverkaufswert abziehen?', a: 'Wenn du etwas später verkaufst, hat es dich effektiv weniger gekostet. Der Restwert mindert die tatsächlichen Kosten und damit den Preis pro Nutzung.' },
    { q: 'Eignet sich das auch für Abos?', a: 'Ja. Setze den Jahresbeitrag als Preis, die Nutzungen pro Jahr und die Dauer auf 1 Jahr. So siehst du, was dich jede Abo-Nutzung kostet.' },
    { q: 'Berücksichtigt der Rechner Folgekosten?', a: 'Nein, Strom, Reparaturen oder Verbrauchsmaterial sind nicht enthalten. Für einen vollständigen Vergleich kannst du diese im Anschaffungspreis grob mit einkalkulieren.' },
  ],
  related: ['rechnung-splitten-rechner', 'benzin-pro-person-rechner', 'partymengen-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { preis: 600, nutzungen_jahr: 50, jahre: 4, wiederverkauf: 0 },
      expect: [
        { label: 'Kosten pro Nutzung', value: 3, tolerance: 0.01 },
        { label: 'Nutzungen insgesamt', value: 200, tolerance: 0.5 },
      ],
    },
    {
      values: { preis: 1000, nutzungen_jahr: 100, jahre: 5, wiederverkauf: 200 },
      expect: [{ label: 'Kosten pro Nutzung', value: 1.6, tolerance: 0.01 }],
    },
  ],
};
