import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'realrendite-rechner',
  category: 'finanzen',
  title: 'Realrendite-Rechner (nach Steuer & Inflation)',
  shortTitle: 'Realrendite',
  description:
    'Berechne die echte Rendite deiner Geldanlage: erst Abgeltungsteuer abziehen, dann die Inflation herausrechnen. So siehst du den realen Kaufkraftgewinn.',
  keywords: [
    'realrendite rechner',
    'rendite nach steuer und inflation',
    'reale rendite berechnen',
    'nettorendite nach inflation',
    'kaufkraft rendite rechner',
  ],
  formula: 'Nach Steuer = Brutto × (1 − Steuersatz/100); Real = (1 + Nachsteuer/100)/(1 + Inflation/100) − 1',
  inputs: [
    { type: 'number', id: 'brutto', label: 'Bruttorendite p.a.', unit: '%', default: 5, min: -50, step: 0.1, help: 'Rendite vor Steuern und Inflation.' },
    { type: 'number', id: 'steuer', label: 'Steuersatz auf Erträge', unit: '%', default: 26.375, min: 0, max: 50, step: 0.001, help: 'Abgeltungsteuer inkl. Soli ≈ 26,375 %.' },
    { type: 'number', id: 'inflation', label: 'Inflationsrate p.a.', unit: '%', default: 2, min: -50, step: 0.1 },
  ],
  compute: (v) => {
    const brutto = num(v.brutto);
    const steuer = num(v.steuer);
    const inflation = num(v.inflation);
    const nachSteuer = brutto * (1 - steuer / 100);
    const real = ((1 + nachSteuer / 100) / (1 + inflation / 100) - 1) * 100;
    const steuerlast = brutto - nachSteuer;
    return [
      { label: 'Reale Rendite p.a.', value: real, unit: '%', digits: 3, primary: true, help: 'Echter Kaufkraftgewinn nach Steuer und Inflation.' },
      { label: 'Rendite nach Steuer', value: nachSteuer, unit: '%', digits: 3 },
      { label: 'Steuerlast (Prozentpunkte)', value: steuerlast, unit: '%-Punkte', digits: 3 },
    ];
  },
  intro:
    'Die ausgewiesene Bruttorendite sagt wenig über deinen echten Vermögenszuwachs. Erst nach Abzug der Steuer auf Kapitalerträge und nach Herausrechnen der Inflation bleibt die reale Rendite – also der tatsächliche Kaufkraftgewinn. Dieser Rechner kombiniert beide Effekte: Er zieht zuerst die Steuer ab und wendet dann die exakte Fisher-Beziehung für die Inflation an. Ein negativer Wert bedeutet, dass deine Anlage real Kaufkraft verliert. Die Steuerbehandlung ist vereinfacht (ohne Sparerpauschbetrag) und dient der Orientierung (Stand 2026).',
  howto: [
    'Trage die erwartete Bruttorendite deiner Anlage ein.',
    'Gib den Steuersatz auf die Erträge an – bei Kapitalerträgen meist 26,375 % (Abgeltungsteuer plus Soli).',
    'Trage die erwartete Inflationsrate ein.',
    'Lies die reale Rendite ab. Ist sie negativ, schmilzt deine Kaufkraft trotz nominaler Gewinne.',
  ],
  faq: [
    { q: 'Warum reicht es nicht, Steuer und Inflation einfach abzuziehen?', a: 'Die grobe Subtraktion ist nur eine Näherung. Korrekt zieht man erst die Steuer prozentual ab und teilt dann durch den Inflationsfaktor (Fisher-Beziehung). Bei höheren Raten weicht das spürbar von der Faustformel ab.' },
    { q: 'Welcher Steuersatz ist richtig?', a: 'Auf Kapitalerträge gilt die Abgeltungsteuer von 25 % plus 5,5 % Soli darauf, also rund 26,375 %, ggf. plus Kirchensteuer. Der Sparerpauschbetrag (1.000 €/2.000 €) ist hier nicht berücksichtigt.' },
    { q: 'Was bedeutet eine negative Realrendite?', a: 'Dein Geld verliert real an Wert: Die Inflation frisst mehr auf, als die Anlage nach Steuern einbringt. Das ist typisch für niedrig verzinste Anlagen in inflationären Phasen.' },
  ],
  related: ['realzins-rechner', 'inflationsrechner', 'abgeltungsteuer-rechner', 'rendite-rechner'],
  examples: [
    {
      values: { brutto: 5, steuer: 25, inflation: 2 },
      expect: [
        { label: 'Reale Rendite p.a.', value: 1.716, tolerance: 0.01 },
        { label: 'Rendite nach Steuer', value: 3.75, tolerance: 0.001 },
        { label: 'Steuerlast (Prozentpunkte)', value: 1.25, tolerance: 0.001 },
      ],
    },
    {
      values: { brutto: 7, steuer: 26.375, inflation: 2 },
      expect: [
        { label: 'Reale Rendite p.a.', value: 3.092, tolerance: 0.01 },
        { label: 'Rendite nach Steuer', value: 5.15375, tolerance: 0.001 },
      ],
    },
  ],
  updated: '2026-06-19',
};
