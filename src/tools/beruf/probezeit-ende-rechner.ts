import type { Tool } from '../../lib/types';
import { num, toDate, daysBetween } from '../../lib/types';

export const tool: Tool = {
  slug: 'probezeit-ende-rechner',
  category: 'beruf',
  title: 'Probezeit-Ende Rechner (Enddatum & Kündigungsfrist)',
  shortTitle: 'Probezeit-Ende',
  description:
    'Berechne, wann deine Probezeit endet und wie lange sie noch dauert. Standard sind 6 Monate mit verkürzter Kündigungsfrist von 2 Wochen (Stand 2026).',
  keywords: [
    'probezeit ende rechner',
    'probezeit berechnen',
    'wann endet probezeit',
    'probezeit 6 monate enddatum',
    'kündigungsfrist probezeit',
  ],
  formula: 'Probezeit-Ende = Beginn + Dauer (Monate); verbleibend = Ende − Stichtag',
  inputs: [
    { type: 'date', id: 'beginn', label: 'Beginn des Arbeitsverhältnisses', default: '2026-04-01' },
    { type: 'number', id: 'dauer', label: 'Probezeit-Dauer', unit: 'Monate', default: 6, min: 1, max: 6, step: 1, help: 'Gesetzlich maximal 6 Monate (§ 622 Abs. 3 BGB).' },
    { type: 'date', id: 'stichtag', label: 'Stichtag', default: '2026-06-19', today: true, help: 'Standard: heute.' },
  ],
  compute: (v) => {
    const beginn = String(v.beginn);
    const dauer = Math.round(num(v.dauer, 6));
    const stichtag = String(v.stichtag);

    const d = toDate(beginn);
    let endeIso = beginn;
    if (d) {
      // Probezeit-Ende: Tag vor dem gleichen Kalendertag nach "dauer" Monaten.
      const ende = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + dauer, d.getUTCDate()));
      ende.setUTCDate(ende.getUTCDate() - 1);
      endeIso = ende.toISOString().slice(0, 10);
    }

    const verbleibend = daysBetween(stichtag, endeIso);
    const vergangen = Math.max(daysBetween(beginn, stichtag), 0);
    const beendet = verbleibend < 0;

    return [
      { label: 'Verbleibende Tage', value: Math.max(verbleibend, 0), unit: 'Tage', digits: 0, primary: true, help: beendet ? 'Die Probezeit ist bereits abgelaufen.' : 'Tage bis zum Ende der Probezeit.' },
      { label: 'Probezeit endet am', value: endeIso },
      { label: 'Bereits vergangene Tage', value: vergangen, unit: 'Tage', digits: 0 },
      { label: 'Status', value: beendet ? 'Probezeit beendet' : 'Probezeit läuft' },
    ];
  },
  intro:
    'Die meisten Arbeitsverträge sehen eine Probezeit von bis zu 6 Monaten vor. In dieser Zeit gilt eine verkürzte Kündigungsfrist von zwei Wochen (§ 622 Abs. 3 BGB), und der Kündigungsschutz nach dem Kündigungsschutzgesetz greift in der Regel noch nicht. Dieser Rechner ermittelt das genaue Enddatum deiner Probezeit aus Beginn und Dauer und zeigt, wie viele Tage noch verbleiben. Maßgeblich ist immer dein Arbeitsvertrag.',
  howto: [
    'Trage den Beginn des Arbeitsverhältnisses ein.',
    'Gib die vereinbarte Probezeit-Dauer in Monaten an (maximal 6).',
    'Wähle den Stichtag – standardmäßig heute.',
    'Lies Enddatum und verbleibende Tage ab.',
  ],
  faq: [
    { q: 'Wie lange darf die Probezeit höchstens sein?', a: 'Eine Probezeit darf maximal 6 Monate dauern (§ 622 Abs. 3 BGB). In dieser Zeit gilt eine verkürzte Kündigungsfrist von zwei Wochen.' },
    { q: 'Wann genau endet die Probezeit?', a: 'Die Probezeit läuft bis zum Tag vor dem entsprechenden Kalendertag des Endmonats. Beginnt sie am 1. April, endet eine 6-monatige Probezeit am 30. September.' },
    { q: 'Gibt es danach besonderen Kündigungsschutz?', a: 'Nach 6 Monaten Betriebszugehörigkeit greift in Betrieben mit mehr als zehn Arbeitnehmern in der Regel der allgemeine Kündigungsschutz nach dem KSchG. Die Kündigungsfristen verlängern sich dann.' },
    { q: 'Ist das Enddatum rechtsverbindlich?', a: 'Der Rechner gibt eine Orientierung anhand der eingegebenen Daten. Maßgeblich sind die Regelungen deines Arbeitsvertrags und die gesetzlichen Vorgaben.' },
  ],
  related: ['resturlaub-jobwechsel-rechner', 'arbeitstage-zwischen-rechner', 'urlaubsanspruch-rechner'],
  updated: '2026-06-19',
  examples: [
    {
      values: { beginn: '2026-04-01', dauer: 6, stichtag: '2026-06-19' },
      expect: [
        { label: 'Bereits vergangene Tage', value: 79, tolerance: 0 },
        { label: 'Verbleibende Tage', value: 103, tolerance: 0 },
      ],
    },
    {
      values: { beginn: '2026-01-15', dauer: 6, stichtag: '2026-06-19' },
      expect: [
        { label: 'Verbleibende Tage', value: 25, tolerance: 0 },
      ],
    },
  ],
};
