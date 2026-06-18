import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'waist-hip-ratio-rechner',
  category: 'gesundheit',
  title: 'Waist-to-Hip-Ratio-Rechner (WHR)',
  shortTitle: 'WHR',
  description:
    'Berechne dein Taille-Hüft-Verhältnis (Waist-to-Hip-Ratio) aus Taillen- und Hüftumfang und ordne es nach WHO-Grenzwerten ein.',
  keywords: [
    'waist to hip ratio rechner',
    'taille hueft verhaeltnis',
    'whr berechnen',
    'taille huefte quotient',
    'koerperform apfel birne',
    'whr grenzwerte',
  ],
  formula:
    'WHR = Taillenumfang / Hüftumfang; Risiko: Frauen ab 0,85, Männer ab 0,90 erhöht',
  inputs: [
    {
      type: 'select', id: 'geschlecht', label: 'Geschlecht', default: 'mann',
      options: [
        { value: 'mann', label: 'Männlich' },
        { value: 'frau', label: 'Weiblich' },
      ],
    },
    { type: 'number', id: 'taille', label: 'Taillenumfang', unit: 'cm', default: 90, min: 1, step: 0.5 },
    { type: 'number', id: 'huefte', label: 'Hüftumfang', unit: 'cm', default: 100, min: 1, step: 0.5 },
  ],
  compute: (v) => {
    const frau = String(v.geschlecht) === 'frau';
    const taille = num(v.taille);
    const huefte = num(v.huefte);
    const whr = huefte > 0 ? taille / huefte : 0;
    const grenze = frau ? 0.85 : 0.9;
    const bewertung = whr >= grenze ? 'erhöht' : 'normal';
    const typ = whr >= grenze ? 'Apfeltyp (bauchbetont)' : 'Birnentyp (hüftbetont)';
    return [
      { label: 'Waist-to-Hip-Ratio', value: whr, digits: 2, primary: true },
      { label: 'Bewertung', value: bewertung },
      { label: 'Körperform', value: typ },
      { label: 'Grenzwert', value: grenze, digits: 2 },
    ];
  },
  intro:
    'Das Taille-Hüft-Verhältnis (Waist-to-Hip-Ratio, WHR) setzt den Taillen- ins Verhältnis zum Hüftumfang und beschreibt die Fettverteilung am Körper. Ein hoher Wert weist auf eine bauchbetonte Fettverteilung („Apfeltyp") hin, die mit höheren gesundheitlichen Risiken verbunden ist. Die Bewertung folgt WHO-Grenzwerten und ist eine Orientierung, keine Diagnose.',
  howto: [
    'Geschlecht auswählen.',
    'Taillenumfang in Nabelhöhe messen und eingeben.',
    'Hüftumfang an der breitesten Stelle messen und eintragen.',
    'WHR und Bewertung ablesen.',
  ],
  faq: [
    { q: 'Was bedeutet Apfel- und Birnentyp?', a: 'Beim Apfeltyp sammelt sich Fett vor allem am Bauch (hohe WHR), beim Birnentyp an Hüfte und Oberschenkeln (niedrige WHR). Der Apfeltyp gilt als gesundheitlich ungünstiger.' },
    { q: 'Ab welchem Wert ist die WHR erhöht?', a: 'Die WHO nennt für Frauen einen Grenzwert von 0,85 und für Männer von 0,90. Darüber gilt das Risiko für Stoffwechsel- und Herz-Kreislauf-Erkrankungen als erhöht.' },
    { q: 'Was ist aussagekräftiger – WHR oder BMI?', a: 'Beide ergänzen sich. Der BMI bewertet das Gesamtgewicht, die WHR die Fettverteilung. Gerade bei normalem BMI kann eine hohe WHR ein zusätzliches Warnsignal sein.' },
  ],
  related: ['bauchumfang-risiko-rechner', 'waist-to-height-ratio-rechner', 'bmi-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { geschlecht: 'mann', taille: 90, huefte: 100 },
      expect: [
        { label: 'Waist-to-Hip-Ratio', value: 0.9, tolerance: 0.01 },
        { label: 'Grenzwert', value: 0.9, tolerance: 0.01 },
      ],
    },
    {
      values: { geschlecht: 'frau', taille: 75, huefte: 100 },
      expect: [
        { label: 'Waist-to-Hip-Ratio', value: 0.75, tolerance: 0.01 },
      ],
    },
  ],
};
