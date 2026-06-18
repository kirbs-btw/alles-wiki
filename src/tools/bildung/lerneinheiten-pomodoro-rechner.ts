import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'lerneinheiten-pomodoro-rechner',
  category: 'bildung',
  title: 'Lerneinheiten mit Pausen planen (Pomodoro)',
  shortTitle: 'Lerneinheiten',
  description:
    'Plane deine Lernzeit in Bloecke mit Pausen ein und sieh, wie viele Lerneinheiten und reine Lernminuten in dein Zeitfenster passen.',
  keywords: [
    'pomodoro rechner',
    'lerneinheiten planen',
    'lernzeit mit pausen',
    'lernblöcke berechnen',
    'wie viele pausen lernen',
    'lernsession rechner',
  ],
  intro:
    'Konzentriertes Lernen funktioniert in Bloecken mit kurzen Pausen, etwa nach der Pomodoro-Methode. Das Tool berechnet aus deiner verfuegbaren Zeit, der Laenge eines Lernblocks und der Pausenlaenge, wie viele vollstaendige Lerneinheiten hineinpassen und wie viele Minuten du davon tatsaechlich lernst.',
  formula: 'Einheiten = floor(Zeit / (Blocklaenge + Pause)); Lernzeit = Einheiten × Blocklaenge',
  inputs: [
    { type: 'number', id: 'gesamt', label: 'Verfuegbare Zeit', unit: 'Minuten', default: 180, min: 1, step: 5 },
    { type: 'number', id: 'block', label: 'Laenge Lernblock', unit: 'Minuten', default: 25, min: 1, step: 1 },
    { type: 'number', id: 'pause', label: 'Pause nach jedem Block', unit: 'Minuten', default: 5, min: 0, step: 1 },
  ],
  compute: (v) => {
    const gesamt = num(v.gesamt);
    const block = num(v.block);
    const pause = num(v.pause);
    const zyklus = block + pause;
    const einheiten = zyklus > 0 ? Math.floor(gesamt / zyklus) : 0;
    const lernzeit = einheiten * block;
    const pausenzeit = einheiten * pause;
    return [
      { label: 'Lerneinheiten', value: einheiten, digits: 0, primary: true },
      { label: 'Reine Lernzeit', value: lernzeit, digits: 0, unit: 'Minuten' },
      { label: 'Gesamte Pausenzeit', value: pausenzeit, digits: 0, unit: 'Minuten' },
    ];
  },
  howto: [
    'Verfuegbare Gesamtzeit in Minuten eintragen.',
    'Laenge eines Lernblocks angeben (klassisch 25 Minuten).',
    'Pausenlaenge nach jedem Block eintragen (klassisch 5 Minuten).',
    'Anzahl der Einheiten und reine Lernzeit ablesen.',
  ],
  faq: [
    { q: 'Was ist die Pomodoro-Methode?', a: 'Eine Zeitmanagement-Technik: Man lernt in festen Bloecken (klassisch 25 Minuten) und macht danach eine kurze Pause (klassisch 5 Minuten). Das foerdert die Konzentration.' },
    { q: 'Warum werden nur volle Einheiten gezaehlt?', a: 'Eine angefangene Einheit ohne abschlieszende Pause zaehlt nicht als vollstaendiger Zyklus. So bleibt die Planung realistisch und du planst keine halben Bloecke.' },
    { q: 'Sollte ich laengere Pausen einplanen?', a: 'Nach etwa vier Bloecken empfiehlt sich eine laengere Pause von 15 bis 30 Minuten. Das deckst du ab, indem du sie aus der verfuegbaren Zeit herausrechnest.' },
  ],
  related: ['lernzeit-rechner', 'lernplan-seiten-pro-tag-rechner', 'fehlzeiten-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { gesamt: 180, block: 25, pause: 5 },
      expect: [
        { label: 'Lerneinheiten', value: 6, tolerance: 0.01 },
        { label: 'Reine Lernzeit', value: 150, tolerance: 0.01 },
      ],
    },
    {
      values: { gesamt: 120, block: 50, pause: 10 },
      expect: [{ label: 'Lerneinheiten', value: 2, tolerance: 0.01 }],
    },
  ],
};
