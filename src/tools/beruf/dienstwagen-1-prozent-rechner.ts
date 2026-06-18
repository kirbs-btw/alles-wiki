import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'dienstwagen-1-prozent-rechner',
  category: 'beruf',
  title: 'Dienstwagen 1-Prozent-Regel Rechner',
  shortTitle: 'Dienstwagen 1%',
  description:
    'Berechne den geldwerten Vorteil deines Firmenwagens nach der 1-Prozent-Regel plus die 0,03-Prozent-Pauschale für den Arbeitsweg.',
  keywords: [
    'dienstwagen rechner',
    '1 prozent regelung firmenwagen',
    'geldwerter vorteil dienstwagen',
    'firmenwagen versteuern',
    '0,03 prozent regel',
    'dienstwagen 1 prozent',
  ],
  formula:
    'Geldwerter Vorteil = BLP × 1% + BLP × 0,03% × Entfernung(km)  (BLP = Bruttolistenpreis)',
  inputs: [
    { type: 'number', id: 'listenpreis', label: 'Bruttolistenpreis (Neuwert)', unit: '€', default: 40000, min: 0, step: 500, help: 'Inländischer Listenpreis zum Zeitpunkt der Erstzulassung inkl. Sonderausstattung und MwSt., abgerundet auf volle 100 €.' },
    { type: 'number', id: 'km', label: 'Entfernung Wohnung–Arbeit', unit: 'km', default: 20, min: 0, step: 1, help: 'Einfache Strecke zur ersten Tätigkeitsstätte.' },
    {
      type: 'select', id: 'antrieb', label: 'Antriebsart', default: 'verbrenner',
      options: [
        { value: 'verbrenner', label: 'Verbrenner / Hybrid (voller Ansatz)' },
        { value: 'hybrid_halb', label: 'Plug-in-Hybrid / E-Auto teuer (halber Ansatz, 0,5 %)' },
        { value: 'eauto_viertel', label: 'Reines E-Auto bis 70.000 € (Viertel-Ansatz, 0,25 %)' },
      ],
      help: 'Für begünstigte E-Fahrzeuge wird die Bemessungsgrundlage gemindert.',
    },
  ],
  compute: (v) => {
    const listenpreis = num(v.listenpreis);
    const km = num(v.km);
    const antrieb = String(v.antrieb);

    const faktor = antrieb === 'eauto_viertel' ? 0.25 : antrieb === 'hybrid_halb' ? 0.5 : 1;
    const basis = listenpreis * faktor;

    const privatNutzung = basis * 0.01;
    const arbeitsweg = basis * 0.0003 * km;
    const gesamtMonat = privatNutzung + arbeitsweg;
    const gesamtJahr = gesamtMonat * 12;

    return [
      { label: 'Geldwerter Vorteil pro Monat', value: gesamtMonat, unit: '€', digits: 2, primary: true },
      { label: 'Anteil Privatnutzung (1 %)', value: privatNutzung, unit: '€', digits: 2 },
      { label: 'Anteil Arbeitsweg (0,03 %)', value: arbeitsweg, unit: '€', digits: 2 },
      { label: 'Geldwerter Vorteil pro Jahr', value: gesamtJahr, unit: '€', digits: 2 },
    ];
  },
  intro:
    'Wer einen Firmenwagen auch privat nutzt, muss den geldwerten Vorteil versteuern. Die 1-Prozent-Regel setzt monatlich 1 % des Bruttolistenpreises für die Privatnutzung an, dazu 0,03 % je Entfernungskilometer für den Arbeitsweg. Für reine Elektroautos und Plug-in-Hybride gelten reduzierte Ansätze. Der Rechner liefert eine Orientierung zum lohnsteuer- und sozialabgabenpflichtigen Vorteil.',
  howto: [
    'Trage den Bruttolistenpreis des Fahrzeugs zum Zeitpunkt der Erstzulassung ein.',
    'Gib die einfache Entfernung zwischen Wohnung und Arbeit an.',
    'Wähle die Antriebsart, um eventuelle E-Auto-Begünstigungen zu berücksichtigen.',
    'Lies den monatlichen geldwerten Vorteil ab – dieser erhöht dein zu versteuerndes Einkommen.',
  ],
  faq: [
    { q: 'Was ist der Bruttolistenpreis?', a: 'Der inländische Listenneupreis zum Zeitpunkt der Erstzulassung inklusive Sonderausstattung und Umsatzsteuer, abgerundet auf volle 100 €. Rabatte oder ein Gebrauchtkauf ändern ihn nicht.' },
    { q: 'Wofür sind die 0,03 Prozent?', a: 'Sie decken die Fahrten zwischen Wohnung und erster Tätigkeitsstätte pauschal ab: 0,03 % des Listenpreises je Entfernungskilometer und Monat.' },
    { q: 'Welche Vorteile gelten für E-Autos?', a: 'Reine Elektroautos bis zu einem bestimmten Listenpreis werden nur mit einem Viertel der Bemessungsgrundlage angesetzt (0,25 %), andere begünstigte Fahrzeuge mit der Hälfte (0,5 %).' },
    { q: 'Lohnt sich das Fahrtenbuch?', a: 'Bei geringer privater Nutzung kann ein ordnungsgemäßes Fahrtenbuch günstiger sein als die Pauschale. Der Rechner bildet nur die 1-Prozent-Methode ab.' },
  ],
  related: ['pendlerpauschale-rechner', 'reisekosten-kilometergeld-rechner', 'jahresgehalt-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { listenpreis: 40000, km: 20, antrieb: 'verbrenner' },
      expect: [
        { label: 'Anteil Privatnutzung (1 %)', value: 400, tolerance: 0.01 },
        { label: 'Anteil Arbeitsweg (0,03 %)', value: 240, tolerance: 0.01 },
        { label: 'Geldwerter Vorteil pro Monat', value: 640, tolerance: 0.01 },
      ],
    },
    {
      values: { listenpreis: 60000, km: 30, antrieb: 'eauto_viertel' },
      expect: [
        { label: 'Anteil Privatnutzung (1 %)', value: 150, tolerance: 0.01 },
        { label: 'Geldwerter Vorteil pro Monat', value: 285, tolerance: 0.01 },
      ],
    },
  ],
};
