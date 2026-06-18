import type { Tool } from '../../lib/types';
import { daysBetween, diffYMD } from '../../lib/types';

export const tool: Tool = {
  slug: 'alter-rechner',
  category: 'alltag',
  title: 'Alter berechnen',
  shortTitle: 'Alter',
  description:
    'Berechne dein genaues Alter aus dem Geburtsdatum – in Jahren, Monaten und Tagen sowie als Gesamtzahl an Tagen und Wochen.',
  keywords: [
    'alter berechnen',
    'wie alt bin ich',
    'alter aus geburtsdatum',
    'lebenstage berechnen',
    'alter in tagen',
  ],
  formula: 'Alter = Stichtag − Geburtsdatum (in Jahren, Monaten, Tagen)',
  inputs: [
    { type: 'date', id: 'geburt', label: 'Geburtsdatum', default: '1990-01-01' },
    { type: 'date', id: 'stichtag', label: 'Stichtag', default: '2026-06-18', today: true, help: 'Standard: heute.' },
  ],
  compute: (v) => {
    const geburt = String(v.geburt);
    const stichtag = String(v.stichtag);
    const { years, months, days } = diffYMD(geburt, stichtag);
    const tage = Math.abs(daysBetween(geburt, stichtag));
    return [
      { label: 'Alter (Jahre)', value: years, unit: 'Jahre', digits: 0, primary: true },
      { label: 'Genau', value: `${years} Jahre, ${months} Monate, ${days} Tage` },
      { label: 'Monate gesamt', value: years * 12 + months, unit: 'Monate', digits: 0 },
      { label: 'Tage gesamt', value: tage, unit: 'Tage', digits: 0 },
      { label: 'Wochen gesamt', value: Math.floor(tage / 7), unit: 'Wochen', digits: 0 },
    ];
  },
  howto: [
    'Geburtsdatum eintragen.',
    'Stichtag wählen – standardmäßig der heutige Tag.',
    'Alter in Jahren, Monaten und Tagen sowie die Gesamttage ablesen.',
  ],
  faq: [
    { q: 'Wird der Geburtstag mitgezählt?', a: 'Das Alter in Jahren erhöht sich erst am Geburtstag selbst. Bis dahin zählt das vorherige Lebensjahr.' },
    { q: 'Sind Schaltjahre berücksichtigt?', a: 'Ja. Die Gesamttage werden kalendergenau inklusive aller Schalttage berechnet.' },
  ],
  updated: '2026-06-18',
  examples: [
    {
      values: { geburt: '1990-01-01', stichtag: '2020-01-01' },
      expect: [
        { label: 'Alter (Jahre)', value: 30, tolerance: 0 },
        { label: 'Tage gesamt', value: 10957, tolerance: 0 },
      ],
    },
  ],
};
