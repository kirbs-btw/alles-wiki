import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

// Empfehlung nach der gängigen Taschengeldtabelle (z. B. Jugendämter / DJI):
// Richtwerte pro Alter. Unter 6 Jahren wöchentlich, ab 10 Jahren monatlich.
const TABELLE: { alter: number; betrag: number; intervall: 'woche' | 'monat' }[] = [
  { alter: 4, betrag: 0.5, intervall: 'woche' },
  { alter: 5, betrag: 1.5, intervall: 'woche' },
  { alter: 6, betrag: 2, intervall: 'woche' },
  { alter: 7, betrag: 2.5, intervall: 'woche' },
  { alter: 8, betrag: 3, intervall: 'woche' },
  { alter: 9, betrag: 3.5, intervall: 'woche' },
  { alter: 10, betrag: 18, intervall: 'monat' },
  { alter: 11, betrag: 23, intervall: 'monat' },
  { alter: 12, betrag: 28, intervall: 'monat' },
  { alter: 13, betrag: 33, intervall: 'monat' },
  { alter: 14, betrag: 38, intervall: 'monat' },
  { alter: 15, betrag: 43, intervall: 'monat' },
  { alter: 16, betrag: 60, intervall: 'monat' },
  { alter: 17, betrag: 70, intervall: 'monat' },
  { alter: 18, betrag: 80, intervall: 'monat' },
];

export const tool: Tool = {
  slug: 'taschengeld-rechner',
  category: 'familie',
  title: 'Taschengeld-Rechner nach Alter',
  shortTitle: 'Taschengeld',
  description:
    'Empfohlenes Taschengeld je nach Alter des Kindes anhand der gängigen Taschengeldtabelle – pro Woche oder Monat sowie als Jahresbetrag.',
  keywords: [
    'taschengeld rechner',
    'taschengeldtabelle',
    'taschengeld nach alter',
    'wie viel taschengeld',
    'taschengeld kinder',
    'taschengeld 12 jahre',
    'taschengeld monatlich',
  ],
  intro:
    'Wie viel Taschengeld ist altersgerecht? Die Taschengeldtabelle nennt Richtwerte, an denen sich viele Familien orientieren. Bis etwa 9 Jahre wird das Geld wöchentlich ausgezahlt, ab 10 Jahren monatlich. Es handelt sich um Empfehlungen – die passende Höhe hängt immer vom Familienbudget ab.',
  formula:
    'Richtwert(Alter) aus Taschengeldtabelle; Jahresbetrag = Wochenbetrag × 52 bzw. Monatsbetrag × 12',
  inputs: [
    { type: 'number', id: 'alter', label: 'Alter des Kindes', unit: 'Jahre', default: 12, min: 4, max: 18, step: 1 },
  ],
  compute: (v) => {
    let alter = Math.round(num(v.alter, 12));
    if (alter < 4) alter = 4;
    if (alter > 18) alter = 18;
    const eintrag = TABELLE.find((t) => t.alter === alter) ?? TABELLE[TABELLE.length - 1];
    const istWoche = eintrag.intervall === 'woche';
    const proWoche = istWoche ? eintrag.betrag : eintrag.betrag / (365.25 / 7 / 12);
    const proMonat = istWoche ? eintrag.betrag * (365.25 / 7 / 12) : eintrag.betrag;
    const proJahr = proMonat * 12;
    const empfehlung = istWoche
      ? `${eintrag.betrag.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} € pro Woche`
      : `${eintrag.betrag.toLocaleString('de-DE')} € pro Monat`;
    return [
      { label: 'Empfehlung', value: empfehlung, primary: true, help: istWoche ? 'Auszahlung wöchentlich' : 'Auszahlung monatlich' },
      { label: 'Pro Woche', value: proWoche, unit: '€', digits: 2 },
      { label: 'Pro Monat', value: proMonat, unit: '€', digits: 2 },
      { label: 'Pro Jahr', value: proJahr, unit: '€', digits: 0 },
    ];
  },
  howto: [
    'Alter des Kindes in Jahren eingeben (4 bis 18).',
    'Empfohlenen Richtwert pro Woche oder Monat ablesen.',
    'Auszahlungsrhythmus festlegen – jüngere Kinder profitieren von wöchentlicher Auszahlung.',
    'Betrag an das eigene Familienbudget anpassen.',
  ],
  faq: [
    { q: 'Ab wann sollte man Taschengeld zahlen?', a: 'Viele Familien starten mit etwa 4 bis 5 Jahren mit einem kleinen wöchentlichen Betrag. So lernt das Kind früh den Umgang mit Geld.' },
    { q: 'Warum wöchentlich statt monatlich?', a: 'Jüngere Kinder können einen Monatszeitraum noch schlecht überblicken. Eine wöchentliche Auszahlung macht das Sparen und Einteilen einfacher. Ab etwa 10 Jahren ist eine monatliche Auszahlung üblich.' },
    { q: 'Sind die Werte verpflichtend?', a: 'Nein. Die Taschengeldtabelle liefert nur Orientierungswerte. Es gibt keinen gesetzlichen Anspruch auf Taschengeld – Höhe und Auszahlung entscheiden die Eltern.' },
    { q: 'Was zählt nicht zum Taschengeld?', a: 'Ausgaben für Schulsachen, Kleidung oder Vereinsbeiträge sollten Eltern separat tragen. Taschengeld ist zur freien Verfügung des Kindes gedacht.' },
    { q: 'Wofür ist der „Taschengeldparagraf"?', a: 'Nach § 110 BGB darf ein Minderjähriger Käufe wirksam tätigen, wenn er sie mit seinem Taschengeld bezahlt. Größere Anschaffungen brauchen aber die Zustimmung der Eltern.' },
  ],
  related: ['kosten-kind-rechner', 'kindergeld-rechner', 'sparplan-kind-rechner'],
  examples: [
    {
      values: { alter: 12 },
      expect: [
        { label: 'Pro Monat', value: 28, tolerance: 0.5 },
        { label: 'Pro Jahr', value: 336, tolerance: 1 },
      ],
    },
    {
      values: { alter: 8 },
      expect: [{ label: 'Pro Woche', value: 3, tolerance: 0.01 }],
    },
  ],
  updated: '2026-06-18',
};
