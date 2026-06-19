import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'cholesterin-ratio-rechner',
  category: 'gesundheit',
  title: 'Cholesterin-Ratio-Rechner (Gesamt/HDL)',
  shortTitle: 'Cholesterin-Ratio',
  description:
    'Berechne deinen Cholesterin-Quotienten aus Gesamtcholesterin und HDL sowie das LDL/HDL-Verhältnis – wichtige Verhältniswerte für die Risikoeinschätzung.',
  keywords: [
    'cholesterin ratio rechner',
    'gesamt hdl quotient',
    'cholesterin quotient berechnen',
    'ldl hdl verhältnis',
    'cholesterin verhältnis',
  ],
  formula: 'Gesamt/HDL = Gesamtcholesterin ÷ HDL  ·  LDL/HDL = LDL ÷ HDL',
  inputs: [
    { type: 'number', id: 'gesamt', label: 'Gesamtcholesterin', unit: 'mg/dl', default: 200, min: 1, step: 1 },
    { type: 'number', id: 'hdl', label: 'HDL-Cholesterin', unit: 'mg/dl', default: 50, min: 1, step: 1, help: 'Das „gute" Cholesterin.' },
    { type: 'number', id: 'ldl', label: 'LDL-Cholesterin (optional)', unit: 'mg/dl', default: 120, min: 0, step: 1, help: 'Das „schlechte" Cholesterin. 0 = nicht bekannt.' },
  ],
  compute: (v) => {
    const gesamt = num(v.gesamt);
    const hdl = num(v.hdl);
    const ldl = num(v.ldl);
    const ratio = hdl > 0 ? gesamt / hdl : 0;
    const ldlRatio = hdl > 0 && ldl > 0 ? ldl / hdl : 0;
    let bewertung = 'HDL-Wert prüfen';
    if (ratio > 0) {
      if (ratio < 3.5) bewertung = 'günstig (< 3,5)';
      else if (ratio < 5) bewertung = 'grenzwertig (3,5–5)';
      else bewertung = 'ungünstig (> 5)';
    }
    return [
      { label: 'Cholesterin-Ratio (Gesamt/HDL)', value: ratio, unit: '', digits: 2, primary: true },
      { label: 'LDL/HDL-Verhältnis', value: ldlRatio, unit: '', digits: 2 },
      { label: 'Einordnung Gesamt/HDL', value: bewertung },
    ];
  },
  intro:
    'Der Cholesterin-Quotient setzt das Gesamtcholesterin ins Verhältnis zum HDL-Cholesterin (Gesamt/HDL). Er gilt als aussagekräftiger als der reine Gesamtcholesterinwert, weil ein hohes HDL („gutes" Cholesterin) das Verhältnis verbessert. Auch das LDL/HDL-Verhältnis wird häufig herangezogen. Die hier genannten Schwellen sind grobe Orientierungswerte (Stand 2026); die individuelle Risikobewertung gehört in ärztliche Hände und hängt von weiteren Faktoren ab.',
  howto: [
    'Gesamtcholesterin in mg/dl eingeben.',
    'HDL-Cholesterin in mg/dl eingeben.',
    'Optional LDL-Cholesterin ergänzen (sonst 0).',
    'Cholesterin-Ratio und Einordnung ablesen.',
  ],
  faq: [
    { q: 'Was sagt der Cholesterin-Quotient aus?', a: 'Er beschreibt das Verhältnis von Gesamt- zu HDL-Cholesterin. Ein niedriger Wert gilt als günstiger, weil viel schützendes HDL vorhanden ist.' },
    { q: 'Welcher Wert ist gut?', a: 'Als grobe Orientierung gilt ein Gesamt/HDL-Verhältnis unter 3,5 als günstig und über 5 als ungünstig. Maßgeblich ist die ärztliche Gesamtbeurteilung (Stand 2026).' },
    { q: 'Funktioniert das auch mit mmol/l?', a: 'Ja. Da es sich um ein Verhältnis handelt, kürzt sich die Einheit. Du musst nur Gesamt und HDL in derselben Einheit eingeben.' },
  ],
  related: ['blutzucker-umrechner', 'hba1c-rechner', 'salz-tageslimit-rechner'],
  updated: '2026-06-19',
  examples: [
    {
      values: { gesamt: 200, hdl: 50, ldl: 120 },
      expect: [
        { label: 'Cholesterin-Ratio (Gesamt/HDL)', value: 4, tolerance: 0.01 },
        { label: 'LDL/HDL-Verhältnis', value: 2.4, tolerance: 0.01 },
      ],
    },
    {
      values: { gesamt: 180, hdl: 60, ldl: 0 },
      expect: [{ label: 'Cholesterin-Ratio (Gesamt/HDL)', value: 3, tolerance: 0.01 }],
    },
  ],
};
