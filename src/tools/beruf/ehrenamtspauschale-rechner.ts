import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'ehrenamtspauschale-rechner',
  category: 'beruf',
  title: 'Ehrenamtspauschale Rechner (840 € Freibetrag)',
  shortTitle: 'Ehrenamtspauschale',
  description:
    'Berechne den steuerfreien Anteil deiner ehrenamtlichen Vergütung: bis 840 € im Jahr bleiben nach § 3 Nr. 26a EStG steuer- und sozialabgabenfrei (Stand 2026).',
  keywords: [
    'ehrenamtspauschale rechner',
    'ehrenamtsfreibetrag berechnen',
    'ehrenamtspauschale 840 euro',
    'steuerfrei ehrenamt verein',
    'aufwandsentschädigung ehrenamt steuerfrei',
  ],
  formula: 'Steuerfrei = min(Einnahmen, Freibetrag); Steuerpflichtig = max(Einnahmen − Freibetrag, 0)',
  inputs: [
    { type: 'number', id: 'einnahmen', label: 'Jahres-Einnahmen aus dem Ehrenamt', unit: '€', default: 600, min: 0, step: 20, help: 'Aufwandsentschädigung für nebenberufliche ehrenamtliche Tätigkeit (z. B. Vorstand, Kassenwart, Platzwart).' },
    { type: 'number', id: 'freibetrag', label: 'Ehrenamtsfreibetrag', unit: '€', default: 840, min: 0, step: 20, help: 'Jährlicher Freibetrag nach § 3 Nr. 26a EStG, Stand 2026: 840 €.' },
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
    'Die Ehrenamtspauschale nach § 3 Nr. 26a EStG begünstigt nebenberufliche ehrenamtliche Tätigkeiten für gemeinnützige Vereine, Kirchen oder öffentliche Einrichtungen, die nicht unter die Übungsleiterpauschale fallen – etwa Vorstands-, Kassen- oder Platzwarttätigkeiten. Stand 2026 bleiben bis zu 840 € im Jahr steuer- und sozialabgabenfrei. Dieser Rechner ermittelt deinen steuerfreien Anteil und einen eventuell verbleibenden steuerpflichtigen Rest.',
  howto: [
    'Trage deine gesamten Jahres-Einnahmen aus dem Ehrenamt ein.',
    'Belasse den Freibetrag bei 840 € oder passe ihn an.',
    'Lies den steuerfreien und den steuerpflichtigen Anteil ab.',
  ],
  faq: [
    { q: 'Wie hoch ist die Ehrenamtspauschale?', a: 'Stand 2026 beträgt der Ehrenamtsfreibetrag nach § 3 Nr. 26a EStG 840 € pro Jahr. Bis zu diesem Betrag bleiben die Einnahmen steuer- und sozialabgabenfrei.' },
    { q: 'Worin liegt der Unterschied zur Übungsleiterpauschale?', a: 'Die Übungsleiterpauschale (3.000 €) gilt für pädagogisch oder pflegerisch ausgerichtete Tätigkeiten. Die Ehrenamtspauschale (840 €) deckt sonstige ehrenamtliche Tätigkeiten wie Vorstands- oder Verwaltungsarbeit ab.' },
    { q: 'Gilt der Freibetrag pro Verein?', a: 'Nein, der Freibetrag wird personenbezogen einmal pro Jahr gewährt. Einnahmen aus mehreren begünstigten Ehrenämtern werden zusammengerechnet.' },
    { q: 'Kann ich beide Pauschalen nutzen?', a: 'Für dieselbe Tätigkeit ist nur eine Pauschale möglich. Übst du verschiedene Tätigkeiten aus, kann unter Umständen für jede die jeweils passende Pauschale gelten.' },
  ],
  related: ['uebungsleiterpauschale-rechner', 'minijob-stunden-rechner', 'nebenjob-hinzuverdienst-rechner'],
  updated: '2026-06-19',
  examples: [
    {
      values: { einnahmen: 600, freibetrag: 840 },
      expect: [
        { label: 'Steuerfreier Anteil', value: 600, tolerance: 0.01 },
        { label: 'Steuerpflichtiger Anteil', value: 0, tolerance: 0.01 },
        { label: 'Nicht genutzter Freibetrag', value: 240, tolerance: 0.01 },
      ],
    },
    {
      values: { einnahmen: 1200, freibetrag: 840 },
      expect: [
        { label: 'Steuerfreier Anteil', value: 840, tolerance: 0.01 },
        { label: 'Steuerpflichtiger Anteil', value: 360, tolerance: 0.01 },
      ],
    },
  ],
};
