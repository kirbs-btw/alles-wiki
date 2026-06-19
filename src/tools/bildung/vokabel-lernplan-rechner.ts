import type { Tool } from '../../lib/types';
import { num, daysBetween } from '../../lib/types';

export const tool: Tool = {
  slug: 'vokabel-lernplan-rechner',
  category: 'bildung',
  title: 'Vokabel-Lernplan: Vokabeln pro Tag bis zur Pruefung',
  shortTitle: 'Vokabel-Lernplan',
  description:
    'Berechne, wie viele Vokabeln du pro Tag lernen musst, um dein Pensum bis zur Pruefung zu schaffen – inklusive Wiederholungen.',
  keywords: [
    'vokabeln pro tag lernen',
    'vokabel lernplan rechner',
    'wie viele vokabeln am tag',
    'vokabeln bis pruefung',
    'vokabular lernplan',
    'vokabeltrainer plan',
  ],
  intro:
    'Ein grosser Wortschatz entsteht durch taegliches Lernen in kleinen Portionen. Dieses Tool teilt deine Gesamtzahl an Vokabeln auf die Tage bis zur Pruefung auf und beruecksichtigt optional Wiederholungs-Durchgaenge, denn jede Vokabel sitzt erst nach mehreren Wiederholungen. Ergebnis ist dein taegliches Vokabelpensum und die geschaetzte Lernzeit pro Tag. Verteiltes Lernen ueber viele Tage ist nachweislich wirksamer als Last-Minute-Pauken.',
  formula: 'Vokabeln/Tag = (Vokabeln × Durchgaenge) / Lerntage; Lerntage = Tage bis Pruefung − heute',
  inputs: [
    { type: 'number', id: 'vokabeln', label: 'Anzahl Vokabeln gesamt', default: 600, min: 1, step: 10 },
    { type: 'date', id: 'start', label: 'Startdatum (heute)', default: '2026-06-19', today: true, help: 'Standard: heute.' },
    { type: 'date', id: 'pruefung', label: 'Pruefungsdatum', default: '2026-08-18' },
    { type: 'number', id: 'durchgaenge', label: 'Wiederholungs-Durchgaenge', default: 3, min: 1, step: 1, help: 'Wie oft du jede Vokabel wiederholen willst.' },
    { type: 'number', id: 'sekProVok', label: 'Lernzeit je Vokabel', unit: 's', default: 15, min: 1, step: 1, help: 'Durchschnittlicher Zeitaufwand pro Vokabel.' },
  ],
  compute: (v) => {
    const vokabeln = num(v.vokabeln);
    const durchgaenge = num(v.durchgaenge) > 0 ? num(v.durchgaenge) : 1;
    const sekProVok = num(v.sekProVok);
    const tage = daysBetween(String(v.start), String(v.pruefung));
    const lerntage = Math.max(1, tage);
    const wiederholungen = vokabeln * durchgaenge;
    const proTag = wiederholungen / lerntage;
    const minutenProTag = (proTag * sekProVok) / 60;
    return [
      { label: 'Vokabeln pro Tag', value: proTag, digits: 1, primary: true },
      { label: 'Lerntage bis zur Pruefung', value: lerntage, digits: 0, unit: 'Tage' },
      { label: 'Wiederholungen insgesamt', value: wiederholungen, digits: 0 },
      { label: 'Lernzeit pro Tag', value: minutenProTag, digits: 1, unit: 'min' },
    ];
  },
  howto: [
    'Gesamtzahl der zu lernenden Vokabeln eintragen.',
    'Startdatum (Standard: heute) und Pruefungsdatum waehlen.',
    'Anzahl der gewuenschten Wiederholungs-Durchgaenge angeben.',
    'Durchschnittliche Lernzeit pro Vokabel eintragen und Tagespensum ablesen.',
  ],
  faq: [
    { q: 'Wie viele Vokabeln sollte ich pro Tag lernen?', a: 'Das haengt von Gesamtmenge und Zeit ab. Realistisch sind fuer die meisten Lernenden 10 bis 30 neue Vokabeln pro Tag plus Wiederholungen. Das Tool rechnet dein konkretes Pensum aus.' },
    { q: 'Warum mehrere Durchgaenge?', a: 'Eine Vokabel sitzt selten nach einmaligem Lernen. Mehrere Wiederholungen in wachsenden Abstaenden (Spaced Repetition) verankern das Wort dauerhaft im Langzeitgedaechtnis.' },
    { q: 'Wird der Pruefungstag mitgezaehlt?', a: 'Nein. Gezaehlt werden die vollen Tage zwischen Start und Pruefung. Der Pruefungstag selbst bleibt als Puffer frei.' },
    { q: 'Ist Last-Minute-Lernen sinnvoll?', a: 'Nur bedingt. Verteiltes Lernen ueber viele Tage fuehrt nachweislich zu deutlich besserem Behalten als das Pauken kurz vor der Pruefung.' },
  ],
  related: ['lernplan-seiten-pro-tag-rechner', 'lernzeit-rechner', 'lesezeit-rechner'],
  updated: '2026-06-19',
  examples: [
    {
      values: { vokabeln: 600, start: '2026-06-19', pruefung: '2026-08-18', durchgaenge: 3, sekProVok: 15 },
      expect: [
        { label: 'Lerntage bis zur Pruefung', value: 60, tolerance: 0 },
        { label: 'Wiederholungen insgesamt', value: 1800, tolerance: 0 },
        { label: 'Vokabeln pro Tag', value: 30, tolerance: 0.01 },
        { label: 'Lernzeit pro Tag', value: 7.5, tolerance: 0.01 },
      ],
    },
  ],
};
