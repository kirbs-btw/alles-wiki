import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

// Schwangerschaftswochen-Rechner: rechnet die abgeschlossenen Schwangerschaftswochen
// und Tage seit dem ersten Tag der letzten Periode in die übliche SSW-Notation um.
// Eine Schwangerschaft dauert rund 40 Wochen (280 Tage) ab letzter Periode.
// Eingabe als verstrichene Tage; Ausgabe als SSW (z. B. 12+3) und verbleibende Wochen.
// Medizinische Näherung über Zahlen, keine Datumsfelder.

const GESAMT_TAGE = 280; // 40 Wochen Tragzeit ab letzter Periode

export const tool: Tool = {
  slug: 'schwangerschaftswoche-rechner',
  category: 'familie',
  title: 'Schwangerschaftswoche-Rechner (SSW)',
  shortTitle: 'SSW-Rechner',
  description:
    'Rechne die Schwangerschaftswoche (SSW) aus den Tagen seit der letzten Periode aus: SSW, Tag in der Woche und verbleibende Wochen bis zur Geburt.',
  keywords: [
    'schwangerschaftswoche rechner',
    'ssw berechnen',
    'welche ssw bin ich',
    'schwangerschaftswochen rechner',
    'ssw aus tagen',
    'wie weit bin ich schwanger',
  ],
  intro:
    'Die Schwangerschaftswoche (SSW) wird ab dem ersten Tag der letzten Periode gezählt. Eine Schwangerschaft dauert rund 40 Wochen bzw. 280 Tage. Dieser Rechner wandelt die verstrichenen Tage in die übliche Notation um (z. B. SSW 12+3 = 12 abgeschlossene Wochen und 3 Tage) und zeigt, wie viele Wochen bis zum errechneten Termin verbleiben. Medizinische Näherung.',
  formula:
    'SSW = ganze Wochen + Resttage (Tage ÷ 7); verbleibend = (280 − Tage) ÷ 7',
  inputs: [
    { type: 'number', id: 'tage', label: 'Tage seit erstem Tag der letzten Periode', unit: 'Tage', default: 87, min: 0, max: 300, step: 1, help: 'gezählt ab Beginn der letzten Regelblutung' },
  ],
  compute: (v) => {
    const tage = Math.max(0, Math.round(num(v.tage, 87)));
    const wochen = Math.floor(tage / 7);
    const restTage = tage % 7;
    const verbleibendeTage = Math.max(0, GESAMT_TAGE - tage);
    const verbleibendeWochen = verbleibendeTage / 7;
    const trimester = tage < 7 * 13 ? 1 : tage < 7 * 27 ? 2 : 3;
    return [
      { label: 'Schwangerschaftswoche', value: wochen, unit: 'SSW', digits: 0, primary: true, help: 'abgeschlossene Wochen' },
      { label: 'Tag in der Woche', value: restTage, unit: 'Tage', digits: 0, help: `Notation: ${wochen}+${restTage}` },
      { label: 'Verbleibende Wochen bis Termin', value: verbleibendeWochen, unit: 'Wochen', digits: 1 },
      { label: 'Trimester', value: trimester, digits: 0 },
    ];
  },
  howto: [
    'Tage seit dem ersten Tag der letzten Periode eingeben.',
    'Die aktuelle Schwangerschaftswoche in der Notation Woche+Tag ablesen.',
    'Die verbleibenden Wochen bis zum errechneten Geburtstermin ansehen.',
  ],
  faq: [
    { q: 'Wie wird die SSW gezählt?', a: 'Ab dem ersten Tag der letzten Periode, nicht ab der Empfängnis. Deshalb ist man rechnerisch schon zwei Wochen vor dem eigentlichen Eisprung in der Schwangerschaft.' },
    { q: 'Was bedeutet die Notation 12+3?', a: 'Sie steht für 12 vollständig abgeschlossene Schwangerschaftswochen und 3 weitere Tage in der 13. Woche.' },
    { q: 'Wie lange dauert eine Schwangerschaft?', a: 'Rund 40 Wochen bzw. 280 Tage ab dem ersten Tag der letzten Periode. Der tatsächliche Geburtstermin kann davon abweichen.' },
    { q: 'Ist die Berechnung genau?', a: 'Es ist eine Standard-Näherung nach der Naegele-Zählweise. Bei unregelmäßigem Zyklus kann der per Ultraschall bestimmte Termin abweichen.' },
  ],
  related: ['mutterschaftsgeld-rechner', 'erstausstattung-baby-rechner', 'elterngeld-rechner'],
  examples: [
    {
      values: { tage: 87 },
      expect: [
        { label: 'Schwangerschaftswoche', value: 12, tolerance: 0.01 },
        { label: 'Tag in der Woche', value: 3, tolerance: 0.01 },
        { label: 'Verbleibende Wochen bis Termin', value: 27.6, tolerance: 0.05 },
      ],
    },
    {
      values: { tage: 280 },
      expect: [
        { label: 'Schwangerschaftswoche', value: 40, tolerance: 0.01 },
        { label: 'Verbleibende Wochen bis Termin', value: 0, tolerance: 0.01 },
      ],
    },
  ],
  updated: '2026-06-18',
};
