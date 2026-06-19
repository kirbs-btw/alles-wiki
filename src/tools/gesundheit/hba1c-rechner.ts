import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'hba1c-rechner',
  category: 'gesundheit',
  title: 'HbA1c-Rechner (Durchschnittsblutzucker)',
  shortTitle: 'HbA1c',
  description:
    'Rechne deinen HbA1c-Wert in den geschätzten durchschnittlichen Blutzucker (eAG) um – in mg/dl und mmol/l, nach der ADAG-Formel.',
  keywords: [
    'hba1c rechner',
    'hba1c in blutzucker umrechnen',
    'durchschnittsblutzucker berechnen',
    'eag rechner',
    'hba1c mmol/mol',
  ],
  formula: 'eAG (mg/dl) = 28,7 × HbA1c(%) − 46,7  ·  HbA1c(mmol/mol) = (HbA1c% − 2,15) × 10,929',
  inputs: [
    { type: 'number', id: 'hba1c', label: 'HbA1c', unit: '%', default: 6.5, min: 3, max: 20, step: 0.1, help: 'Langzeit-Blutzuckerwert in Prozent (DCCT/NGSP).' },
  ],
  compute: (v) => {
    const hba1c = num(v.hba1c);
    const eagMgdl = 28.7 * hba1c - 46.7;
    const eagMgdlSafe = eagMgdl > 0 ? eagMgdl : 0;
    const eagMmol = eagMgdlSafe / 18.0182;
    const ifcc = (hba1c - 2.15) * 10.929;
    return [
      { label: 'Ø Blutzucker (eAG)', value: eagMgdlSafe, unit: 'mg/dl', digits: 0, primary: true },
      { label: 'Ø Blutzucker (eAG)', value: eagMmol, unit: 'mmol/l', digits: 1 },
      { label: 'HbA1c (IFCC)', value: ifcc > 0 ? ifcc : 0, unit: 'mmol/mol', digits: 0 },
    ];
  },
  intro:
    'Der HbA1c-Wert gibt an, welcher Anteil des roten Blutfarbstoffs (Hämoglobin) mit Zucker beladen ist, und spiegelt den durchschnittlichen Blutzucker der letzten etwa 8 bis 12 Wochen wider. Die ADAG-Formel der American Diabetes Association schätzt daraus den durchschnittlichen Blutzucker (estimated Average Glucose, eAG). Zusätzlich wird der international gebräuchliche IFCC-Wert in mmol/mol ausgegeben. Die Werte sind Näherungen (Stand 2026) und ersetzen keine ärztliche Beurteilung.',
  howto: [
    'HbA1c-Wert in Prozent (DCCT/NGSP-Standard) eingeben.',
    'Geschätzten Durchschnittsblutzucker in mg/dl und mmol/l ablesen.',
    'Optional den IFCC-Wert in mmol/mol für internationale Befunde nutzen.',
  ],
  faq: [
    { q: 'Was bedeutet eAG?', a: 'eAG steht für estimated Average Glucose – den anhand des HbA1c geschätzten durchschnittlichen Blutzuckerspiegel. Er ist eine statistische Näherung, kein Einzelmesswert.' },
    { q: 'Was ist der Unterschied zwischen Prozent und mmol/mol?', a: 'Prozent (DCCT/NGSP) ist die ältere Angabe, mmol/mol (IFCC) der neuere internationale Standard. Beide beschreiben denselben HbA1c-Wert.' },
    { q: 'Welcher HbA1c-Wert ist normal?', a: 'Bei Stoffwechselgesunden liegt der HbA1c meist unter etwa 5,7 %. Individuelle Zielwerte bei Diabetes legt die behandelnde Ärztin oder der Arzt fest (Stand 2026).' },
  ],
  related: ['blutzucker-umrechner', 'zucker-tageslimit-rechner', 'cholesterin-ratio-rechner'],
  updated: '2026-06-19',
  examples: [
    {
      values: { hba1c: 6.5 },
      expect: [{ label: 'Ø Blutzucker (eAG)', value: 139.85, tolerance: 1 }],
    },
    {
      values: { hba1c: 5 },
      expect: [{ label: 'Ø Blutzucker (eAG)', value: 96.8, tolerance: 1 }],
    },
  ],
};
