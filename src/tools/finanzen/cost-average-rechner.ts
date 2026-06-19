import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'cost-average-rechner',
  category: 'finanzen',
  title: 'Cost-Average-Rechner (Durchschnittskosten)',
  shortTitle: 'Cost-Average',
  description:
    'Zeige den Cost-Average-Effekt: Bei festem Sparbetrag kaufst du bei niedrigen Kursen mehr Anteile. Vergleiche deinen Durchschnittskurs mit dem reinen Mittelwert der Kurse.',
  keywords: [
    'cost average effekt rechner',
    'durchschnittskosten rechner',
    'sparplan durchschnittskurs',
    'cost average rechner',
    'durchschnittspreis aktien sparplan',
  ],
  formula: 'Anteile je Kauf = Betrag / Kurs; Ø-Kaufkurs = Summe Beträge / Summe Anteile (harmonisches Mittel)',
  inputs: [
    { type: 'number', id: 'betrag', label: 'Sparbetrag je Kauf', unit: '€', default: 100, min: 0, step: 10, help: 'Gleicher Betrag bei jedem Kauf.' },
    { type: 'number', id: 'kurs1', label: 'Kurs beim 1. Kauf', unit: '€', default: 50, min: 0.01, step: 0.5 },
    { type: 'number', id: 'kurs2', label: 'Kurs beim 2. Kauf', unit: '€', default: 200, min: 0.01, step: 0.5 },
    { type: 'number', id: 'kurs3', label: 'Kurs beim 3. Kauf (0 = entfällt)', unit: '€', default: 0, min: 0, step: 0.5, help: 'Optional. 0 lassen, wenn nur zwei Käufe.' },
  ],
  compute: (v) => {
    const betrag = num(v.betrag);
    const kurse = [num(v.kurs1), num(v.kurs2), num(v.kurs3)].filter((k) => k > 0);
    let anteile = 0;
    let summeKurse = 0;
    for (const k of kurse) {
      anteile += betrag / k;
      summeKurse += k;
    }
    const investiert = betrag * kurse.length;
    const avgKauf = anteile > 0 ? investiert / anteile : 0;
    const avgArith = kurse.length > 0 ? summeKurse / kurse.length : 0;
    const vorteil = avgArith - avgKauf;
    return [
      { label: 'Ø Kaufkurs (Cost-Average)', value: avgKauf, unit: '€', digits: 4, primary: true, help: 'Dein effektiver Einstandskurs pro Anteil.' },
      { label: 'Arithm. Mittel der Kurse', value: avgArith, unit: '€', digits: 4, help: 'Reiner Durchschnitt der Kurse zum Vergleich.' },
      { label: 'Cost-Average-Vorteil je Anteil', value: vorteil, unit: '€', digits: 4 },
      { label: 'Gekaufte Anteile', value: anteile, unit: 'Stück', digits: 4 },
      { label: 'Investiert gesamt', value: investiert, unit: '€', digits: 2 },
    ];
  },
  intro:
    'Beim Cost-Average-Effekt (Durchschnittskosteneffekt) investierst du bei jedem Kauf den gleichen Eurobetrag. Steht der Kurs niedrig, bekommst du automatisch mehr Anteile, bei hohem Kurs weniger. Dein durchschnittlicher Kaufkurs (das harmonische Mittel) liegt dadurch immer unter dem einfachen arithmetischen Mittel der Kurse. Dieser Rechner macht den Effekt für zwei bis drei Käufe sichtbar. Hinweis: Der Effekt senkt deinen Einstandskurs, garantiert aber keine höhere Rendite als eine Einmalanlage – bei langfristig steigenden Märkten ist Einmalanlage im Schnitt oft renditestärker.',
  howto: [
    'Trage den gleichbleibenden Sparbetrag je Kauf ein.',
    'Gib die Kurse zu den jeweiligen Kaufzeitpunkten ein.',
    'Für nur zwei Käufe lässt du den dritten Kurs auf 0.',
    'Vergleiche deinen Ø-Kaufkurs mit dem arithmetischen Mittel – die Differenz ist der Cost-Average-Vorteil.',
  ],
  faq: [
    { q: 'Warum ist der Ø-Kaufkurs niedriger als der Mittelwert?', a: 'Weil du bei niedrigen Kursen mehr Anteile kaufst, fließt der günstige Kurs stärker in den Schnitt ein. Mathematisch entspricht der Ø-Kaufkurs dem harmonischen Mittel, das immer ≤ dem arithmetischen Mittel ist.' },
    { q: 'Ist Cost-Average besser als Einmalanlage?', a: 'Nicht zwangsläufig. Der Effekt glättet das Timing-Risiko und senkt den Einstandskurs bei schwankenden Kursen. Studien zeigen aber: In steigenden Märkten ist eine sofortige Einmalanlage im Durchschnitt häufig renditestärker.' },
    { q: 'Gilt der Effekt auch bei ETF-Sparplänen?', a: 'Ja. Jeder Sparplan mit festem Eurobetrag nutzt den Cost-Average-Effekt automatisch. Der Hauptvorteil ist die Disziplin und das gleichmäßige Investieren.' },
  ],
  related: ['etf-sparplan-endwert-rechner', 'sparplan-rechner', 'kursgewinn-rechner', 'aktienrendite-pa-rechner'],
  examples: [
    {
      values: { betrag: 100, kurs1: 50, kurs2: 200, kurs3: 0 },
      expect: [
        { label: 'Ø Kaufkurs (Cost-Average)', value: 80, tolerance: 0.001 },
        { label: 'Arithm. Mittel der Kurse', value: 125, tolerance: 0 },
        { label: 'Cost-Average-Vorteil je Anteil', value: 45, tolerance: 0.001 },
        { label: 'Gekaufte Anteile', value: 2.5, tolerance: 0.001 },
        { label: 'Investiert gesamt', value: 200, tolerance: 0 },
      ],
    },
  ],
  updated: '2026-06-19',
};
