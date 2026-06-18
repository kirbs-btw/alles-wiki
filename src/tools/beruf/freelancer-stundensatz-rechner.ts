import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'freelancer-stundensatz-rechner',
  category: 'beruf',
  title: 'Freelancer-Stundensatz Rechner (Kalkulation)',
  shortTitle: 'Freelancer-Stundensatz',
  description:
    'Kalkuliere deinen nötigen Freelancer-Stundensatz: Zielgewinn plus Kosten verteilt auf die fakturierbaren Stunden im Jahr.',
  keywords: [
    'freelancer stundensatz rechner',
    'stundensatz selbständig berechnen',
    'freiberufler stundensatz kalkulieren',
    'fakturierbare stunden',
    'stundensatz freelancer formel',
    'selbständig stundensatz finden',
  ],
  formula:
    'Stundensatz = (Zielgewinn/Jahr + Jahreskosten) ÷ (Arbeitstage × Stunden/Tag × Auslastung%)',
  inputs: [
    { type: 'number', id: 'zielgewinn', label: 'Gewünschter Jahresgewinn (vor Steuer)', unit: '€', default: 60000, min: 0, step: 1000, help: 'Was dir nach Kosten als Gewinn bleiben soll.' },
    { type: 'number', id: 'kosten', label: 'Betriebskosten pro Jahr', unit: '€', default: 12000, min: 0, step: 500, help: 'Büro, Software, Versicherungen, Altersvorsorge usw.' },
    { type: 'number', id: 'arbeitstage', label: 'Arbeitstage pro Jahr', unit: 'Tage', default: 220, min: 1, step: 1 },
    { type: 'number', id: 'stundenTag', label: 'Arbeitsstunden pro Tag', unit: 'h', default: 8, min: 0.5, step: 0.5 },
    { type: 'number', id: 'auslastung', label: 'Fakturierbare Auslastung', unit: '%', default: 60, min: 1, max: 100, step: 5, help: 'Anteil der Arbeitszeit, der abrechenbar ist (Rest: Akquise, Verwaltung).' },
  ],
  compute: (v) => {
    const zielgewinn = num(v.zielgewinn);
    const kosten = num(v.kosten);
    const arbeitstage = num(v.arbeitstage);
    const stundenTag = num(v.stundenTag);
    const auslastung = num(v.auslastung) / 100;

    const bruttoStunden = arbeitstage * stundenTag;
    const fakturierbar = bruttoStunden * auslastung;
    const bedarf = zielgewinn + kosten;
    const stundensatz = fakturierbar > 0 ? bedarf / fakturierbar : 0;
    const tagessatz = stundensatz * stundenTag;

    return [
      { label: 'Nötiger Netto-Stundensatz', value: stundensatz, unit: '€', digits: 2, primary: true },
      { label: 'Fakturierbare Stunden pro Jahr', value: fakturierbar, unit: 'h', digits: 0 },
      { label: 'Zu deckender Jahresbedarf', value: bedarf, unit: '€', digits: 2 },
      { label: 'Entsprechender Tagessatz', value: tagessatz, unit: '€', digits: 2 },
    ];
  },
  intro:
    'Selbständige müssen ihren Stundensatz so kalkulieren, dass er Kosten und den gewünschten Gewinn deckt – und das, obwohl nur ein Teil der Arbeitszeit abrechenbar ist. Der Rechner verteilt Zielgewinn und Betriebskosten auf die fakturierbaren Stunden des Jahres. Das Ergebnis ist ein Netto-Stundensatz vor Steuern und Umsatzsteuer und dient als Kalkulationsgrundlage.',
  howto: [
    'Trage deinen gewünschten Jahresgewinn vor Steuern ein.',
    'Gib deine jährlichen Betriebskosten an.',
    'Erfasse Arbeitstage, Stunden pro Tag und die fakturierbare Auslastung.',
    'Lies den nötigen Stundensatz und den passenden Tagessatz ab.',
  ],
  faq: [
    { q: 'Warum ist die Auslastung so wichtig?', a: 'Als Selbständiger kannst du nie 100 % deiner Zeit abrechnen. Akquise, Buchhaltung und Weiterbildung sind unbezahlt. Eine realistische Auslastung von 50–70 % erhöht den nötigen Stundensatz deutlich.' },
    { q: 'Sind Steuern enthalten?', a: 'Nein. Das Ergebnis ist ein Netto-Stundensatz vor Einkommensteuer und ohne Umsatzsteuer. Beides musst du noch zusätzlich auf den Preis aufschlagen bzw. einplanen.' },
    { q: 'Was gehört zu den Betriebskosten?', a: 'Zum Beispiel Büro/Coworking, Hard- und Software, Versicherungen, Kranken- und Altersvorsorge, Fortbildung sowie Rücklagen für Ausfallzeiten.' },
    { q: 'Wie komme ich auf realistische Arbeitstage?', a: 'Ziehe von den Werktagen Urlaub, Feiertage und Krankheitstage ab. Häufig bleiben rund 210–225 nutzbare Arbeitstage.' },
  ],
  related: ['brutto-stundensatz-rechner', 'netto-stundenlohn-rechner', 'arbeitstage-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { zielgewinn: 60000, kosten: 12000, arbeitstage: 220, stundenTag: 8, auslastung: 60 },
      expect: [
        { label: 'Fakturierbare Stunden pro Jahr', value: 1056, tolerance: 0.5 },
        { label: 'Zu deckender Jahresbedarf', value: 72000, tolerance: 0.01 },
        { label: 'Nötiger Netto-Stundensatz', value: 68.18, tolerance: 0.05 },
      ],
    },
  ],
};
