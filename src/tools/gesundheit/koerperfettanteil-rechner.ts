import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'koerperfettanteil-rechner',
  category: 'gesundheit',
  title: 'Körperfettanteil-Rechner (BMI-Methode)',
  shortTitle: 'Körperfettanteil',
  description:
    'Schätze deinen Körperfettanteil in Prozent aus BMI, Alter und Geschlecht (Deurenberg-Formel) – inklusive fettfreier Körpermasse und Einordnung.',
  keywords: [
    'körperfettanteil berechnen',
    'körperfett rechner',
    'kfa rechner',
    'körperfettanteil prozent',
    'fettfreie masse',
    'deurenberg formel',
    'körperfett schätzen',
  ],
  formula:
    'Körperfett % = 1,2×BMI + 0,23×Alter − 10,8×Geschlecht − 5,4 (Geschlecht: 1 Mann, 0 Frau)',
  inputs: [
    {
      type: 'select', id: 'geschlecht', label: 'Geschlecht', default: 'mann',
      options: [
        { value: 'mann', label: 'Männlich' },
        { value: 'frau', label: 'Weiblich' },
      ],
    },
    { type: 'number', id: 'gewicht', label: 'Gewicht', unit: 'kg', default: 75, min: 1, step: 0.1 },
    { type: 'number', id: 'groesse', label: 'Größe', unit: 'cm', default: 178, min: 1, step: 1 },
    { type: 'number', id: 'alter', label: 'Alter', unit: 'Jahre', default: 30, min: 1, max: 120, step: 1 },
  ],
  compute: (v) => {
    const g = num(v.gewicht);
    const h = num(v.groesse);
    const a = num(v.alter);
    const m = String(v.geschlecht) === 'frau' ? 0 : 1;
    const bmi = h > 0 ? g / Math.pow(h / 100, 2) : 0;
    let kfa = 1.2 * bmi + 0.23 * a - 10.8 * m - 5.4;
    if (kfa < 0) kfa = 0;
    const fettMasse = g * (kfa / 100);
    const fettfrei = g - fettMasse;
    let einordnung = 'normal';
    if (m === 1) {
      if (kfa < 6) einordnung = 'sehr niedrig (essenziell)';
      else if (kfa < 14) einordnung = 'athletisch';
      else if (kfa < 18) einordnung = 'fit';
      else if (kfa < 25) einordnung = 'akzeptabel';
      else einordnung = 'erhöht';
    } else {
      if (kfa < 14) einordnung = 'sehr niedrig (essenziell)';
      else if (kfa < 21) einordnung = 'athletisch';
      else if (kfa < 25) einordnung = 'fit';
      else if (kfa < 32) einordnung = 'akzeptabel';
      else einordnung = 'erhöht';
    }
    return [
      { label: 'Körperfettanteil', value: kfa, unit: '%', digits: 1, primary: true },
      { label: 'Einordnung', value: einordnung },
      { label: 'Fettmasse', value: fettMasse, unit: 'kg', digits: 1 },
      { label: 'Fettfreie Masse', value: fettfrei, unit: 'kg', digits: 1 },
    ];
  },
  intro:
    'Der Körperfettanteil gibt an, wie viel Prozent deines Körpergewichts aus Fett bestehen. Diese Schätzung verwendet die Deurenberg-Formel, die den Körperfettanteil aus dem Body-Mass-Index (BMI), dem Alter und dem Geschlecht ableitet. Sie ist ohne Messgeräte nutzbar, aber weniger genau als eine Caliper- oder Bioimpedanz-Messung. Sportler mit viel Muskelmasse erhalten tendenziell zu hohe Werte.',
  howto: [
    'Geschlecht auswählen.',
    'Gewicht und Körpergröße eingeben.',
    'Alter in Jahren eingeben.',
    'Geschätzten Körperfettanteil und Einordnung ablesen.',
  ],
  faq: [
    { q: 'Wie genau ist die Schätzung über den BMI?', a: 'Die Deurenberg-Formel liefert für die Allgemeinbevölkerung brauchbare Richtwerte. Bei sehr muskulösen Menschen überschätzt sie den Körperfettanteil, weil Muskelmasse im BMI wie Fett zählt.' },
    { q: 'Welcher Körperfettanteil ist gesund?', a: 'Bei Männern gelten etwa 14–24 % als gesund, bei Frauen etwa 21–31 %. Frauen haben physiologisch bedingt einen höheren Anteil. Werte hängen zudem von Alter und Fitnesslevel ab.' },
    { q: 'Was ist die fettfreie Masse?', a: 'Die fettfreie Masse umfasst Muskeln, Knochen, Organe und Wasser – also alles außer Körperfett. Sie ist ein wichtiger Faktor für den Grundumsatz.' },
    { q: 'Wie kann ich den Wert genauer messen?', a: 'Genauer sind Caliper-Messungen (Hautfaltendicke), Bioimpedanz-Waagen oder professionelle Methoden wie DEXA. Diese Formel dient nur als grobe Orientierung.' },
  ],
  related: ['bmi-rechner', 'idealgewicht-rechner', 'waist-to-height-ratio-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { geschlecht: 'mann', gewicht: 75, groesse: 178, alter: 30 },
      expect: [{ label: 'Körperfettanteil', value: 19.1, tolerance: 0.2 }],
    },
  ],
};
