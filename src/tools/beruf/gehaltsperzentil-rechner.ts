import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'gehaltsperzentil-rechner',
  category: 'beruf',
  title: 'Gehaltsperzentil Rechner (Einordnung im Vergleich)',
  shortTitle: 'Gehaltsperzentil',
  description:
    'Ordne dein Gehalt in einen Vergleichsmarkt ein: Mit Median und Streuung schätzt der Rechner dein Perzentil und zeigt, wie weit du vom Mittelwert entfernt liegst.',
  keywords: [
    'gehaltsperzentil rechner',
    'gehalt einordnung vergleich',
    'gehalt perzentil berechnen',
    'wo liege ich mit meinem gehalt',
    'gehaltsvergleich median',
  ],
  formula:
    'z = (Gehalt − Median) / σ;  Perzentil ≈ Φ(z) (logistische Näherung der Normalverteilung)',
  inputs: [
    { type: 'number', id: 'gehalt', label: 'Dein Brutto-Jahresgehalt', unit: '€', default: 55000, min: 0, step: 1000 },
    { type: 'number', id: 'median', label: 'Median im Vergleichsmarkt', unit: '€', default: 50000, min: 1, step: 1000, help: 'Mittleres Gehalt (50-%-Wert) für Branche, Region oder Position aus einer Gehaltsstudie.' },
    { type: 'number', id: 'streuung', label: 'Streuung (Standardabweichung)', unit: '€', default: 12000, min: 1, step: 500, help: 'Maß für die Gehaltsspanne. Falls unbekannt, etwa 20–25 % des Medians ansetzen.' },
  ],
  compute: (v) => {
    const gehalt = num(v.gehalt);
    const median = num(v.median);
    const streuung = num(v.streuung);

    const sigma = streuung > 0 ? streuung : 1;
    const z = (gehalt - median) / sigma;
    // Logistische Näherung der Standardnormalverteilung (Φ): genau genug für eine Einordnung.
    const perzentil = (1 / (1 + Math.exp(-1.702 * z))) * 100;
    const abweichungProzent = median > 0 ? ((gehalt - median) / median) * 100 : 0;

    let lage = 'im Mittelfeld';
    if (perzentil >= 80) lage = 'deutlich überdurchschnittlich';
    else if (perzentil >= 60) lage = 'überdurchschnittlich';
    else if (perzentil <= 20) lage = 'deutlich unterdurchschnittlich';
    else if (perzentil <= 40) lage = 'unterdurchschnittlich';

    return [
      { label: 'Geschätztes Perzentil', value: perzentil, unit: '%', digits: 0, primary: true, help: 'Anteil der Vergleichsgruppe, der weniger verdient als du (Näherung).' },
      { label: 'Einordnung', value: lage },
      { label: 'Abweichung vom Median', value: abweichungProzent, unit: '%', digits: 1 },
      { label: 'Differenz zum Median', value: gehalt - median, unit: '€', digits: 0 },
    ];
  },
  intro:
    'Wer wissen will, ob das eigene Gehalt marktüblich ist, braucht einen Vergleichswert. Dieser Rechner ordnet dein Gehalt mithilfe von Median und Streuung einer Vergleichsgruppe ein und schätzt dein Perzentil: Ein Wert von 70 % bedeutet, dass rund 70 % der Gruppe weniger verdienen als du. Die Berechnung nutzt eine Normalverteilungs-Näherung – sie ersetzt keine echte Gehaltsstudie, gibt aber eine schnelle Orientierung.',
  howto: [
    'Trage dein eigenes Brutto-Jahresgehalt ein.',
    'Gib den Median (50-%-Wert) deiner Vergleichsgruppe aus einer Gehaltsstudie ein.',
    'Schätze die Streuung – etwa 20–25 % des Medians, falls unbekannt.',
    'Lies dein geschätztes Perzentil und die Einordnung ab.',
  ],
  faq: [
    { q: 'Was bedeutet das Perzentil?', a: 'Ein Perzentil von 70 % heißt, dass rund 70 % der Vergleichsgruppe weniger verdienen als du und 30 % mehr. Der Median entspricht dem 50. Perzentil.' },
    { q: 'Woher bekomme ich Median und Streuung?', a: 'Aus Gehaltsstudien, Branchenreports oder Vergleichsportalen für deine Position, Branche und Region. Die Streuung wird oft nicht direkt genannt – als Faustwert dienen 20–25 % des Medians.' },
    { q: 'Wie genau ist die Schätzung?', a: 'Es ist eine Näherung auf Basis einer Normalverteilung. Reale Gehaltsverteilungen sind oft rechtsschief, daher dient das Ergebnis nur als grobe Orientierung.' },
    { q: 'Warum brauche ich die Streuung?', a: 'Ohne Streuung lässt sich nicht beurteilen, wie weit dein Gehalt vom Median entfernt liegt. Eine kleine Streuung macht Abweichungen bedeutsamer, eine große relativiert sie.' },
  ],
  related: ['gehalt-kaufkraft-vergleich-rechner', 'jahresgehalt-rechner', 'gehaltserhoehung-rechner'],
  updated: '2026-06-19',
  examples: [
    {
      values: { gehalt: 50000, median: 50000, streuung: 12000 },
      expect: [
        { label: 'Geschätztes Perzentil', value: 50, tolerance: 0.5 },
        { label: 'Differenz zum Median', value: 0, tolerance: 0.01 },
      ],
    },
    {
      values: { gehalt: 62000, median: 50000, streuung: 12000 },
      expect: [
        { label: 'Geschätztes Perzentil', value: 85, tolerance: 1 },
        { label: 'Abweichung vom Median', value: 24, tolerance: 0.1 },
      ],
    },
  ],
};
