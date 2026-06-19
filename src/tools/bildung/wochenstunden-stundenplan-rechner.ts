import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'wochenstunden-stundenplan-rechner',
  category: 'bildung',
  title: 'Wochenstunden aus Stundenplan berechnen',
  shortTitle: 'Wochenstunden',
  description:
    'Berechne deine Wochenstunden aus der Anzahl der Unterrichtsstunden und der Stundenlaenge – als Schulstunden und als echte Zeitstunden.',
  keywords: [
    'wochenstunden berechnen',
    'stundenplan stunden rechner',
    'unterrichtsstunden in zeitstunden',
    'schulstunden umrechnen',
    'wochenstunden schule',
    'zeitstunden stundenplan',
  ],
  intro:
    'Eine Schulstunde dauert meist 45 Minuten, nicht 60. Wer wissen will, wie viel echte Zeit der Stundenplan beansprucht, muss die Unterrichtsstunden umrechnen. Dieses Tool summiert die Unterrichtsstunden pro Woche und rechnet sie ueber die Stundenlaenge in tatsaechliche Zeitstunden um. Optional verteilt es die Last auf die Anzahl der Schultage und zeigt die durchschnittliche taegliche Unterrichtszeit. So siehst du auf einen Blick, wie umfangreich deine Woche wirklich ist – nuetzlich fuer Schule, Uni und die Planung von Lernzeit daneben.',
  formula: 'Zeitstunden/Woche = Unterrichtsstunden × Stundenlaenge / 60',
  inputs: [
    { type: 'number', id: 'stunden', label: 'Unterrichtsstunden pro Woche', default: 34, min: 1, step: 1, help: 'Summe aller Stunden laut Stundenplan.' },
    { type: 'number', id: 'laenge', label: 'Laenge einer Stunde', unit: 'min', default: 45, min: 1, step: 5 },
    { type: 'number', id: 'tage', label: 'Schultage pro Woche', default: 5, min: 1, max: 7, step: 1 },
  ],
  compute: (v) => {
    const stunden = num(v.stunden);
    const laenge = num(v.laenge);
    const tage = num(v.tage) > 0 ? num(v.tage) : 1;
    const minutenWoche = stunden * laenge;
    const zeitstundenWoche = minutenWoche / 60;
    const stundenProTag = stunden / tage;
    const zeitProTag = zeitstundenWoche / tage;
    return [
      { label: 'Zeitstunden pro Woche', value: zeitstundenWoche, digits: 1, unit: 'Std.', primary: true },
      { label: 'Unterrichtszeit pro Woche', value: minutenWoche, digits: 0, unit: 'min' },
      { label: 'Unterrichtsstunden pro Tag', value: stundenProTag, digits: 1 },
      { label: 'Zeitstunden pro Tag', value: zeitProTag, digits: 1, unit: 'Std.' },
    ];
  },
  howto: [
    'Gesamtzahl der Unterrichtsstunden pro Woche eintragen.',
    'Laenge einer Stunde angeben (Schule meist 45 Minuten, Uni oft 45 oder 90).',
    'Anzahl der Schul- bzw. Unitage pro Woche eintragen.',
    'Echte Zeitstunden pro Woche und Tag ablesen.',
  ],
  faq: [
    { q: 'Wie lang ist eine Schulstunde?', a: 'In Deutschland dauert eine Schulstunde klassisch 45 Minuten. An manchen Schulen oder in der Hochschule sind auch 60- oder 90-Minuten-Bloecke ueblich – stelle die Laenge entsprechend ein.' },
    { q: 'Warum echte Zeitstunden umrechnen?', a: '34 Schulstunden zu 45 Minuten sind nur 25,5 echte Stunden. Die Umrechnung hilft, den realen Zeitaufwand einzuschaetzen und Lernzeit, Job oder Hobbys daneben sinnvoll zu planen.' },
    { q: 'Sind Pausen enthalten?', a: 'Nein, das Tool rechnet nur die reine Unterrichtszeit. Pausen zwischen den Stunden kommen on top und verlaengern die Anwesenheitszeit in der Schule oder Uni.' },
    { q: 'Gilt das auch fuer das Studium?', a: 'Ja. An Hochschulen wird oft in Semesterwochenstunden (SWS) gerechnet, wobei eine SWS meist 45 Minuten pro Woche entspricht. Trage deine SWS als Unterrichtsstunden ein.' },
  ],
  related: ['lernzeit-rechner', 'fehlzeiten-rechner', 'credit-points-fortschritt-rechner'],
  updated: '2026-06-19',
  examples: [
    {
      values: { stunden: 34, laenge: 45, tage: 5 },
      // 34*45=1530 min = 25,5 Std/Woche
      expect: [
        { label: 'Unterrichtszeit pro Woche', value: 1530, tolerance: 0 },
        { label: 'Zeitstunden pro Woche', value: 25.5, tolerance: 0.01 },
      ],
    },
    {
      values: { stunden: 20, laenge: 90, tage: 5 },
      // 20*90=1800 min = 30 Std
      expect: [{ label: 'Zeitstunden pro Woche', value: 30, tolerance: 0.01 }],
    },
  ],
};
