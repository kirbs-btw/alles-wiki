import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'pflichtteil-rechner',
  category: 'recht',
  title: 'Pflichtteil-Rechner (Erbe enterbt)',
  shortTitle: 'Pflichtteil',
  description:
    'Berechne den Pflichtteil eines enterbten Angehörigen: die Hälfte des gesetzlichen Erbteils, bezogen auf den Nachlasswert (§ 2303 BGB, Orientierung).',
  keywords: [
    'pflichtteil rechner',
    'pflichtteil berechnen',
    'pflichtteil erbe',
    'pflichtteil enterbt',
    'pflichtteilsquote',
    'pflichtteil hälfte erbteil',
  ],
  formula: 'Pflichtteil = gesetzliche Erbquote × 1/2 × Nachlasswert',
  inputs: [
    { type: 'number', id: 'nachlass', label: 'Nachlasswert (netto)', unit: '€', default: 300000, min: 0, step: 1000, help: 'Reinnachlass nach Abzug der Schulden.' },
    {
      type: 'select', id: 'erbquoteProzent', label: 'Gesetzlicher Erbteil des Berechtigten', default: '50',
      options: [
        { value: '50', label: '1/2 (z. B. Ehegatte neben Kindern, Zugewinn)' },
        { value: '25', label: '1/4 (z. B. ein Kind neben Ehegatte)' },
        { value: '12.5', label: '1/8 (z. B. eines von zwei Kindern neben Ehegatte)' },
        { value: '33.34', label: '1/3 (z. B. eines von drei Kindern, kein Ehegatte)' },
        { value: '100', label: '1/1 (Alleinerbe, z. B. einziges Kind)' },
      ],
    },
  ],
  compute: (v) => {
    const nachlass = num(v.nachlass);
    const erbquoteProzent = num(v.erbquoteProzent, 50);
    const erbquote = erbquoteProzent / 100;
    const pflichtteilsquote = erbquote / 2;
    const pflichtteil = nachlass * pflichtteilsquote;
    return [
      { label: 'Pflichtteil', value: pflichtteil, unit: '€', digits: 2, primary: true },
      { label: 'Pflichtteilsquote', value: pflichtteilsquote * 100, unit: '%', digits: 2 },
      { label: 'Gesetzlicher Erbteil', value: erbquoteProzent, unit: '%', digits: 2 },
    ];
  },
  intro:
    'Wer als naher Angehöriger enterbt wird, hat regelmäßig Anspruch auf den Pflichtteil: einen Geldanspruch in Höhe der Hälfte des gesetzlichen Erbteils. Pflichtteilsberechtigt sind Abkömmlinge, Ehegatten und – wenn keine Kinder vorhanden sind – die Eltern. Dieser Rechner liefert eine Orientierung; der gesetzliche Erbteil hängt vom Güterstand und der Familiensituation ab. Wähle die zutreffende Quote oder ermittle sie zuvor mit dem Rechner zur gesetzlichen Erbfolge.',
  howto: [
    'Nettowert des Nachlasses eingeben (Vermögen minus Schulden).',
    'Den gesetzlichen Erbteil des Pflichtteilsberechtigten wählen.',
    'Pflichtteil und Pflichtteilsquote ablesen.',
  ],
  faq: [
    { q: 'Wie hoch ist der Pflichtteil?', a: 'Der Pflichtteil beträgt die Hälfte des Wertes des gesetzlichen Erbteils (§ 2303 BGB). Wer gesetzlich z. B. 1/4 erben würde, erhält als Pflichtteil 1/8 des Nachlasswertes in Geld.' },
    { q: 'Wer ist pflichtteilsberechtigt?', a: 'Pflichtteilsberechtigt sind die Abkömmlinge (Kinder, Enkel), der Ehegatte und – sofern keine Abkömmlinge vorhanden sind – die Eltern des Erblassers. Geschwister haben keinen Pflichtteil.' },
    { q: 'Ist der Pflichtteil ein Erbteil?', a: 'Nein. Der Pflichtteilsberechtigte wird nicht Erbe, sondern hat einen reinen Geldanspruch gegen die Erben in Höhe seiner Pflichtteilsquote.' },
    { q: 'Welcher Wert ist maßgeblich?', a: 'Maßgeblich ist der Reinnachlass zum Todeszeitpunkt: das Vermögen abzüglich der Verbindlichkeiten. Schenkungen der letzten zehn Jahre können den Pflichtteil zusätzlich erhöhen (Pflichtteilsergänzung).' },
  ],
  related: ['gesetzliche-erbfolge-rechner', 'erbschaftssteuer-rechner', 'schenkungssteuer-rechner'],
  examples: [
    {
      values: { nachlass: 300000, erbquoteProzent: '25' },
      expect: [
        { label: 'Pflichtteilsquote', value: 12.5, tolerance: 0.01 },
        { label: 'Pflichtteil', value: 37500, tolerance: 0.5 },
      ],
    },
    {
      values: { nachlass: 200000, erbquoteProzent: '100' },
      expect: [
        { label: 'Pflichtteil', value: 100000, tolerance: 0.5 },
      ],
    },
  ],
  updated: '2026-06-18',
};
