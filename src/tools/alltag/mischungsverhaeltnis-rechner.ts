import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'mischungsverhaeltnis-rechner',
  category: 'alltag',
  title: '2-Takt-Gemisch & Mischungsverhältnis berechnen',
  shortTitle: 'Mischungsverhältnis',
  description:
    'Berechne aus Benzinmenge und Mischungsverhältnis die nötige Öl-Menge für 2-Takt-Gemisch – z. B. für Motorsäge, Rasenmäher oder Roller.',
  keywords: [
    '2 takt gemisch berechnen',
    'mischungsverhaeltnis rechner',
    'benzin oel mischen',
    '1 zu 50 mischen',
    'zweitakt gemisch tabelle',
    'oel benzin verhaeltnis',
    'motorsaege gemisch',
  ],
  formula: 'Öl (ml) = Benzin (ml) / Verhältnis-Teiler; Gemisch gesamt = Benzin + Öl',
  inputs: [
    { type: 'number', id: 'benzin', label: 'Benzinmenge', unit: 'Liter', default: 5, min: 0, step: 0.5 },
    {
      type: 'select',
      id: 'verhaeltnis',
      label: 'Mischungsverhältnis',
      default: '50',
      help: 'Anteil Benzin zu Öl, z. B. 1:50 = ein Teil Öl auf 50 Teile Benzin.',
      options: [
        { value: '25', label: '1:25' },
        { value: '40', label: '1:40' },
        { value: '50', label: '1:50' },
        { value: '60', label: '1:60' },
        { value: '100', label: '1:100' },
      ],
    },
  ],
  compute: (v) => {
    const benzinL = num(v.benzin);
    const benzinMl = benzinL * 1000;
    const teiler = num(v.verhaeltnis, 50);
    const oelMl = teiler > 0 ? benzinMl / teiler : 0;
    const gesamtMl = benzinMl + oelMl;
    return [
      { label: 'Benötigtes Öl', value: oelMl, unit: 'ml', digits: 0, primary: true },
      { label: 'Gemisch gesamt', value: gesamtMl / 1000, unit: 'Liter', digits: 3 },
      { label: 'Öl-Anteil', value: gesamtMl > 0 ? (oelMl / gesamtMl) * 100 : 0, unit: '%', digits: 2 },
    ];
  },
  intro:
    'Zweitakt-Motoren brauchen ein Gemisch aus Benzin und speziellem 2-Takt-Öl. Das Mischungsverhältnis (z. B. 1:50) gibt an, wie viele Teile Benzin auf einen Teil Öl kommen. Dieser Rechner ermittelt aus deiner gewünschten Benzinmenge die exakte Öl-Menge in Millilitern.',
  howto: [
    'Gib ein, wie viel Benzin (in Litern) du tanken bzw. mischen willst.',
    'Wähle das vom Hersteller vorgeschriebene Mischungsverhältnis (z. B. 1:50).',
    'Lies die benötigte Öl-Menge in Millilitern ab.',
    'Öl zuerst in den leeren Kanister geben, dann das Benzin auffüllen und gut schütteln.',
  ],
  faq: [
    { q: 'Was bedeutet 1:50?', a: 'Auf 50 Teile Benzin kommt 1 Teil Öl. Bei 5 Litern Benzin (5000 ml) ergibt das 5000 / 50 = 100 ml Öl.' },
    { q: 'Welches Verhältnis ist das richtige?', a: 'Maßgeblich ist immer die Angabe des Geräte-Herstellers. Moderne Motorsägen und Trimmer laufen oft mit 1:50, ältere Geräte teils mit 1:25.' },
    { q: 'Was passiert bei zu wenig Öl?', a: 'Zu wenig Öl führt zu mangelnder Schmierung und kann den Motor durch Überhitzung und Kolbenfresser zerstören. Im Zweifel lieber genau nach Herstellervorgabe mischen.' },
    { q: 'Wie lange ist fertiges Gemisch haltbar?', a: 'Fertig gemischter Kraftstoff sollte innerhalb weniger Wochen verbraucht werden, da Benzin altert. Mische daher nur so viel, wie du absehbar brauchst.' },
  ],
  related: ['verduennung-rechner', 'benzin-pro-person-rechner', 'rezept-portionen-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { benzin: 5, verhaeltnis: '50' },
      expect: [
        { label: 'Benötigtes Öl', value: 100, tolerance: 0.5 },
        { label: 'Gemisch gesamt', value: 5.1, tolerance: 0.01 },
      ],
    },
    {
      values: { benzin: 2, verhaeltnis: '25' },
      expect: [{ label: 'Benötigtes Öl', value: 80, tolerance: 0.5 }],
    },
  ],
};
