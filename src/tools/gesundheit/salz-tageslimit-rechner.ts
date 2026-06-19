import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'salz-tageslimit-rechner',
  category: 'gesundheit',
  title: 'Salz-Tageslimit-Rechner',
  shortTitle: 'Salz-Limit',
  description:
    'Vergleiche deine tägliche Salzaufnahme mit der WHO-Empfehlung von 5 g und rechne zwischen Kochsalz und Natrium um.',
  keywords: [
    'salz tageslimit',
    'wie viel salz am tag',
    'who salzempfehlung',
    'natrium salz umrechnen',
    'salzaufnahme rechner',
    'maximale salzmenge',
  ],
  formula: 'Natrium(mg) = Salz(g) × 400; WHO-Empfehlung: < 5 g Salz/Tag',
  inputs: [
    { type: 'number', id: 'salz', label: 'Geschätzte Salzaufnahme', unit: 'g', default: 9, min: 0, step: 0.5, help: 'Tagesmenge inkl. verstecktem Salz in Fertigprodukten.' },
  ],
  compute: (v) => {
    const salz = num(v.salz);
    const empfehlung = 5; // WHO: weniger als 5 g/Tag
    // 1 g Kochsalz (NaCl) enthält ca. 400 mg Natrium
    const natrium = salz * 400;
    const diff = salz - empfehlung;
    const prozent = (salz / empfehlung) * 100;
    let bewertung = 'im Rahmen der Empfehlung';
    if (salz > empfehlung * 1.5) bewertung = 'deutlich zu hoch';
    else if (salz > empfehlung) bewertung = 'über der Empfehlung';
    return [
      { label: 'Bewertung', value: bewertung, primary: true },
      { label: 'Natriumgehalt', value: natrium, unit: 'mg', digits: 0 },
      { label: 'Über/unter WHO-Limit', value: diff, unit: 'g', digits: 1, help: 'Positiv = über 5 g/Tag' },
      { label: 'Anteil am WHO-Limit', value: prozent, unit: '%', digits: 0 },
    ];
  },
  intro:
    'Die Weltgesundheitsorganisation (WHO) empfiehlt Erwachsenen, weniger als 5 Gramm Kochsalz pro Tag zu sich zu nehmen – das entspricht rund 2000 mg Natrium. In Deutschland liegt die tatsächliche Aufnahme im Schnitt deutlich höher, vor allem durch Brot, Wurst, Käse und Fertiggerichte. Ein dauerhaft hoher Salzkonsum gilt als Risikofaktor für Bluthochdruck. Dieser Rechner gibt eine Orientierung (Stand 2026) und ersetzt keine ärztliche Beratung.',
  howto: [
    'Geschätzte tägliche Salzaufnahme in Gramm eingeben (inklusive verstecktem Salz).',
    'Bewertung im Vergleich zum WHO-Limit ablesen.',
    'Natriumwert nutzen, um Angaben auf Lebensmittelverpackungen umzurechnen.',
  ],
  faq: [
    { q: 'Wie viel Salz am Tag ist gesund?', a: 'Die WHO empfiehlt für Erwachsene weniger als 5 g Kochsalz pro Tag, was etwa einem gestrichenen Teelöffel entspricht.' },
    { q: 'Wie rechne ich Natrium in Salz um?', a: 'Multipliziere den Natriumgehalt (g) mit 2,5, um die Salzmenge zu erhalten. Umgekehrt enthält 1 g Salz rund 0,4 g (400 mg) Natrium.' },
    { q: 'Wo steckt am meisten Salz?', a: 'Den größten Teil nehmen die meisten Menschen über verarbeitete Lebensmittel auf: Brot und Brötchen, Wurst, Käse, Fertiggerichte und Snacks – nicht über das Nachsalzen am Tisch.' },
    { q: 'Warum ist zu viel Salz ungünstig?', a: 'Eine dauerhaft hohe Salzaufnahme kann den Blutdruck erhöhen und gilt als Risikofaktor für Herz-Kreislauf-Erkrankungen. Eine Reduktion kann den Blutdruck senken.' },
  ],
  related: ['zucker-tageslimit-rechner', 'wasserbedarf-rechner', 'koffein-limit-rechner'],
  updated: '2026-06-19',
  examples: [
    {
      values: { salz: 9 },
      expect: [
        { label: 'Natriumgehalt', value: 3600, tolerance: 0.5 },
        { label: 'Über/unter WHO-Limit', value: 4, tolerance: 0.05 },
        { label: 'Anteil am WHO-Limit', value: 180, tolerance: 0.5 },
      ],
    },
    {
      values: { salz: 5 },
      expect: [
        { label: 'Anteil am WHO-Limit', value: 100, tolerance: 0.5 },
      ],
    },
  ],
};
