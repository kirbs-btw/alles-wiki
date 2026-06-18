import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'lernzeit-rechner',
  category: 'bildung',
  title: 'Lernzeit-Rechner: Lerneinheiten bis zur Pruefung',
  shortTitle: 'Lernzeit',
  description:
    'Plane deine Pruefungsvorbereitung: wie viele Lerneinheiten und Stunden pro Tag noetig sind, um den Stoff bis zur Pruefung durchzuarbeiten.',
  keywords: [
    'lernplan erstellen',
    'lernzeit berechnen',
    'pruefungsvorbereitung planen',
    'wie lange lernen pro tag',
    'pomodoro lernplan',
    'lerneinheiten rechner',
    'lernstunden berechnen',
  ],
  intro:
    'Eine gute Pruefungsvorbereitung verteilt den Stoff gleichmaessig auf die verbleibenden Tage statt alles in der letzten Nacht zu pauken. Dieses Tool rechnet aus dem Gesamtumfang (z. B. Seiten oder Kapitel), deinem Lerntempo und den verbleibenden Tagen aus, wie viel du taeglich schaffen musst – und wie viele Pomodoro-Lerneinheiten das ergibt. Plane Pufferzeit fuer Wiederholung ein.',
  formula: 'Gesamtstunden = Umfang / Tempo; Stunden pro Tag = Gesamtstunden / Tage; Einheiten = Stunden×60 / Einheitenlaenge',
  inputs: [
    { type: 'number', id: 'umfang', label: 'Gesamtumfang', unit: 'Seiten', default: 240, min: 1, step: 1, help: 'Z. B. Seiten, Karteikarten oder Aufgaben.' },
    { type: 'number', id: 'tempo', label: 'Lerntempo', unit: 'Seiten/Std.', default: 12, min: 0.1, step: 0.5, help: 'Wie viele Einheiten du pro Stunde schaffst.' },
    { type: 'number', id: 'tage', label: 'Verbleibende Lerntage', unit: 'Tage', default: 10, min: 1, step: 1 },
    { type: 'number', id: 'einheit', label: 'Laenge einer Lerneinheit', unit: 'min', default: 25, min: 5, step: 5, help: 'Pomodoro-Standard sind 25 Minuten.' },
  ],
  compute: (v) => {
    const umfang = num(v.umfang);
    const tempo = num(v.tempo) > 0 ? num(v.tempo) : 1;
    const tage = num(v.tage) > 0 ? num(v.tage) : 1;
    const einheit = num(v.einheit) > 0 ? num(v.einheit) : 25;
    const gesamtStunden = umfang / tempo;
    const stundenProTag = gesamtStunden / tage;
    const minutenProTag = stundenProTag * 60;
    const einheitenGesamt = Math.ceil((gesamtStunden * 60) / einheit);
    const einheitenProTag = Math.ceil(minutenProTag / einheit);
    return [
      { label: 'Lernzeit pro Tag', value: stundenProTag, digits: 2, unit: 'Std.', primary: true },
      { label: 'Minuten pro Tag', value: minutenProTag, digits: 0, unit: 'min' },
      { label: 'Lerneinheiten pro Tag', value: einheitenProTag, digits: 0 },
      { label: 'Gesamte Lernzeit', value: gesamtStunden, digits: 2, unit: 'Std.' },
      { label: 'Lerneinheiten gesamt', value: einheitenGesamt, digits: 0 },
    ];
  },
  howto: [
    'Gesamtumfang des Stoffs eintragen (z. B. Seiten oder Karteikarten).',
    'Dein realistisches Lerntempo pro Stunde angeben.',
    'Die verbleibenden Lerntage bis zur Pruefung eintragen.',
    'Laenge einer Lerneinheit waehlen und Tagespensum ablesen.',
  ],
  faq: [
    { q: 'Wie viel sollte ich pro Tag lernen?', a: 'Das Tool verteilt die Gesamtlernzeit gleichmaessig auf die verbleibenden Tage. Wissenschaftlich guenstig ist verteiltes Lernen mit Pausen statt langer Marathon-Sessions.' },
    { q: 'Was ist eine Lerneinheit?', a: 'Eine fokussierte Lernphase, klassischerweise nach der Pomodoro-Technik 25 Minuten, gefolgt von einer kurzen Pause. Du kannst die Laenge frei anpassen.' },
    { q: 'Wie schaetze ich mein Lerntempo?', a: 'Lerne 30 Minuten konzentriert und zaehle, wie viele Seiten oder Karten du geschafft hast. Rechne auf eine Stunde hoch – das ist dein Tempo.' },
    { q: 'Sollte ich Pufferzeit einplanen?', a: 'Ja. Plane den Stoff so, dass mindestens ein bis zwei Tage zum Wiederholen frei bleiben. Setze die verbleibenden Lerntage daher etwas niedriger an als die reine Kalenderzeit.' },
  ],
  related: ['benoetigte-note-rechner', 'studienkosten-rechner', 'notendurchschnitt-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { umfang: 240, tempo: 12, tage: 10, einheit: 25 },
      expect: [
        { label: 'Gesamte Lernzeit', value: 20, tolerance: 0.01 },
        { label: 'Lernzeit pro Tag', value: 2, tolerance: 0.01 },
        { label: 'Lerneinheiten gesamt', value: 48, tolerance: 0.001 },
      ],
    },
  ],
};
