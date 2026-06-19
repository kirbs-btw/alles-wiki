import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'tagessatz-geldstrafe-rechner',
  category: 'recht',
  title: 'Tagessatz-Rechner (Geldstrafe)',
  shortTitle: 'Tagessatz',
  description:
    'Berechne die Höhe eines Tagessatzes und die gesamte Geldstrafe: Nettoeinkommen pro Tag × Anzahl der Tagessätze (§ 40 StGB, Orientierung Stand 2026).',
  keywords: [
    'tagessatz rechner',
    'tagessatz geldstrafe berechnen',
    'höhe tagessatz',
    'geldstrafe berechnen',
    'tagessatz strafe',
    'wie hoch ist mein tagessatz',
  ],
  formula:
    'Tagessatzhöhe = Nettomonatseinkommen / 30 (1 – 30000 €, gerundet); Geldstrafe = Tagessatzhöhe × Anzahl Tagessätze',
  inputs: [
    { type: 'number', id: 'nettoMonat', label: 'Monatliches Nettoeinkommen', unit: '€', default: 2100, min: 0, step: 50, help: 'Durchschnittliches Nettoeinkommen pro Monat; Unterhaltspflichten können es mindern.' },
    { type: 'number', id: 'anzahl', label: 'Anzahl der Tagessätze', unit: 'Tagessätze', default: 30, min: 5, max: 360, step: 1, help: 'Gesetzlich 5 bis 360 Tagessätze (§ 40 Abs. 1 StGB), vom Gericht festgesetzt.' },
  ],
  compute: (v) => {
    const nettoMonat = num(v.nettoMonat);
    const anzahl = Math.max(0, Math.round(num(v.anzahl)));
    // § 40 Abs. 2 StGB: Tagessatz nach Nettotageseinkommen, Spanne 1 € bis 30.000 €.
    let tagessatz = nettoMonat / 30;
    tagessatz = Math.round(tagessatz * 100) / 100;
    if (nettoMonat > 0 && tagessatz < 1) tagessatz = 1;
    tagessatz = Math.min(tagessatz, 30000);
    const geldstrafe = tagessatz * anzahl;
    return [
      { label: 'Geldstrafe gesamt', value: geldstrafe, unit: '€', digits: 2, primary: true },
      { label: 'Höhe eines Tagessatzes', value: tagessatz, unit: '€', digits: 2 },
      { label: 'Anzahl Tagessätze', value: anzahl, unit: 'Tagessätze', digits: 0 },
    ];
  },
  intro:
    'Eine Geldstrafe wird in Tagessätzen verhängt (§ 40 StGB). Die Zahl der Tagessätze (5 bis 360) bemisst die Schwere der Tat, die Höhe eines Tagessatzes (1 € bis 30.000 €) die wirtschaftlichen Verhältnisse des Täters. Als Tagessatz wird im Regelfall das Nettoeinkommen eines Tages angesetzt, also etwa das Monatsnetto geteilt durch 30. Dieser Rechner liefert eine Orientierung (Stand 2026); das Gericht kann Unterhaltspflichten, Vermögen und Sonderlasten berücksichtigen und schätzt die Grundlagen notfalls.',
  howto: [
    'Monatliches Nettoeinkommen eingeben.',
    'Anzahl der vom Gericht festgesetzten Tagessätze eintragen.',
    'Höhe eines Tagessatzes und die gesamte Geldstrafe ablesen.',
  ],
  faq: [
    { q: 'Wie wird die Höhe eines Tagessatzes berechnet?', a: 'Maßgeblich ist das Nettoeinkommen, das der Täter durchschnittlich an einem Tag hat oder haben könnte. In der Praxis wird das Monatsnetto durch 30 geteilt. Die Spanne reicht von 1 € bis 30.000 € je Tagessatz (§ 40 Abs. 2 StGB).' },
    { q: 'Wie viele Tagessätze sind üblich?', a: 'Die Zahl liegt zwischen 5 und 360 Tagessätzen und richtet sich nach der Schwere der Tat. Bis zu 90 Tagessätze gelten als nicht vorbestraft im Sinne des Führungszeugnisses, wenn keine weitere Eintragung besteht.' },
    { q: 'Werden Unterhaltspflichten berücksichtigt?', a: 'Ja. Das Gericht kann Unterhaltsverpflichtungen und andere unvermeidbare Belastungen mindernd berücksichtigen, sodass der Tagessatz unter dem reinen Nettotageseinkommen liegen kann.' },
    { q: 'Was passiert, wenn ich nicht zahlen kann?', a: 'Eine uneinbringliche Geldstrafe wird in eine Ersatzfreiheitsstrafe umgewandelt. Dabei entspricht ein Tagessatz regelmäßig einem Tag Freiheitsstrafe; Ratenzahlung ist oft möglich.' },
  ],
  related: ['punkte-flensburg-rechner', 'fahrverbot-bussgeld-rechner', 'anwaltskosten-rechner'],
  examples: [
    {
      values: { nettoMonat: 2100, anzahl: 30 },
      expect: [
        { label: 'Höhe eines Tagessatzes', value: 70, tolerance: 0.5 },
        { label: 'Geldstrafe gesamt', value: 2100, tolerance: 1 },
      ],
    },
    {
      values: { nettoMonat: 1500, anzahl: 60 },
      expect: [
        { label: 'Höhe eines Tagessatzes', value: 50, tolerance: 0.5 },
        { label: 'Geldstrafe gesamt', value: 3000, tolerance: 1 },
      ],
    },
  ],
  updated: '2026-06-19',
};
