import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'uebungsleiterpauschale-rechner',
  category: 'beruf',
  title: 'Übungsleiterpauschale Rechner (3.000 € Freibetrag)',
  shortTitle: 'Übungsleiterpauschale',
  description:
    'Berechne den steuerfreien Anteil deiner nebenberuflichen Übungsleitertätigkeit: bis 3.000 € im Jahr bleiben steuer- und sozialabgabenfrei (Stand 2026).',
  keywords: [
    'übungsleiterpauschale rechner',
    'übungsleiterfreibetrag berechnen',
    'übungsleiterpauschale 3000 euro',
    'steuerfrei nebenberuflich trainer',
    'übungsleiter steuerfrei',
  ],
  formula: 'Steuerfrei = min(Einnahmen, Freibetrag); Steuerpflichtig = max(Einnahmen − Freibetrag, 0)',
  inputs: [
    { type: 'number', id: 'einnahmen', label: 'Jahres-Einnahmen aus der Tätigkeit', unit: '€', default: 2400, min: 0, step: 50, help: 'Vergütung für nebenberufliche Tätigkeit als Übungsleiter, Trainer, Ausbilder, Erzieher, Betreuer oder Pfleger.' },
    { type: 'number', id: 'freibetrag', label: 'Übungsleiterfreibetrag', unit: '€', default: 3000, min: 0, step: 100, help: 'Jährlicher Freibetrag nach § 3 Nr. 26 EStG, Stand 2026: 3.000 €.' },
  ],
  compute: (v) => {
    const einnahmen = num(v.einnahmen);
    const freibetrag = num(v.freibetrag);

    const steuerfrei = Math.min(einnahmen, freibetrag);
    const steuerpflichtig = Math.max(einnahmen - freibetrag, 0);
    const restFreibetrag = Math.max(freibetrag - einnahmen, 0);

    return [
      { label: 'Steuerfreier Anteil', value: steuerfrei, unit: '€', digits: 2, primary: true },
      { label: 'Steuerpflichtiger Anteil', value: steuerpflichtig, unit: '€', digits: 2 },
      { label: 'Nicht genutzter Freibetrag', value: restFreibetrag, unit: '€', digits: 2, help: 'Verfällt am Jahresende und ist nicht übertragbar.' },
    ];
  },
  intro:
    'Wer nebenberuflich als Übungsleiter, Trainer, Ausbilder, Erzieher oder im Pflegebereich für gemeinnützige Vereine oder öffentliche Einrichtungen tätig ist, kann den Übungsleiterfreibetrag nach § 3 Nr. 26 EStG nutzen. Stand 2026 bleiben bis zu 3.000 € im Jahr steuer- und sozialabgabenfrei. Dieser Rechner zeigt dir den steuerfreien Anteil und einen eventuell verbleibenden steuerpflichtigen Rest.',
  howto: [
    'Trage deine gesamten Jahres-Einnahmen aus der begünstigten Tätigkeit ein.',
    'Belasse den Freibetrag bei 3.000 € oder passe ihn an.',
    'Lies den steuerfreien und den steuerpflichtigen Anteil ab.',
  ],
  faq: [
    { q: 'Wie hoch ist die Übungsleiterpauschale?', a: 'Stand 2026 beträgt der Übungsleiterfreibetrag nach § 3 Nr. 26 EStG 3.000 € pro Jahr. Bis zu diesem Betrag bleiben die Einnahmen steuer- und sozialabgabenfrei.' },
    { q: 'Für welche Tätigkeiten gilt der Freibetrag?', a: 'Begünstigt sind nebenberufliche, pädagogisch ausgerichtete Tätigkeiten wie Übungsleiter, Trainer, Chorleiter, Ausbilder, Erzieher oder die Pflege alter, kranker und behinderter Menschen – für gemeinnützige Organisationen oder die öffentliche Hand.' },
    { q: 'Ist der Freibetrag pro Verein oder pro Person?', a: 'Der Freibetrag gilt personenbezogen einmal pro Jahr, unabhängig von der Zahl der Tätigkeiten oder Auftraggeber. Mehrere Tätigkeiten werden zusammengerechnet.' },
    { q: 'Kann ich Übungsleiter- und Ehrenamtspauschale kombinieren?', a: 'Für dieselbe Tätigkeit nicht, aber für verschiedene Tätigkeiten kann beides nebeneinander genutzt werden. Maßgeblich ist immer der Einzelfall.' },
  ],
  related: ['ehrenamtspauschale-rechner', 'minijob-stunden-rechner', 'nebenjob-hinzuverdienst-rechner'],
  updated: '2026-06-19',
  examples: [
    {
      values: { einnahmen: 2400, freibetrag: 3000 },
      expect: [
        { label: 'Steuerfreier Anteil', value: 2400, tolerance: 0.01 },
        { label: 'Steuerpflichtiger Anteil', value: 0, tolerance: 0.01 },
        { label: 'Nicht genutzter Freibetrag', value: 600, tolerance: 0.01 },
      ],
    },
    {
      values: { einnahmen: 4200, freibetrag: 3000 },
      expect: [
        { label: 'Steuerfreier Anteil', value: 3000, tolerance: 0.01 },
        { label: 'Steuerpflichtiger Anteil', value: 1200, tolerance: 0.01 },
      ],
    },
  ],
};
