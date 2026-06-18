import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'elternzeit-aufteilung-rechner',
  category: 'familie',
  title: 'Elternzeit-Aufteilung berechnen',
  shortTitle: 'Elternzeit',
  description:
    'Berechne die Aufteilung der Elternzeit zwischen beiden Elternteilen: verbrauchte und verbleibende Monate je Elternteil bis zum 3. Geburtstag.',
  keywords: [
    'elternzeit rechner',
    'elternzeit aufteilen',
    'elternzeit monate',
    'elternzeit 36 monate',
    'elternzeit verteilen',
    'elternzeit partner',
    'restliche elternzeit',
  ],
  intro:
    'Pro Kind stehen jedem Elternteil bis zu 36 Monate Elternzeit zu, die bis zum dritten Geburtstag des Kindes genommen werden müssen (ein Teil ist auch später möglich). Dieser Rechner zeigt, wie sich eine geplante Elternzeit zwischen beiden Eltern aufteilt und wie viele Monate jeweils noch übrig bleiben (Stand 2026).',
  formula:
    'Rest je Elternteil = 36 − geplante Monate; gemeinsame Auszeit = Überschneidung beider Zeiträume',
  inputs: [
    { type: 'number', id: 'elternteil1', label: 'Elternzeit Elternteil 1', unit: 'Monate', default: 12, min: 0, max: 36, step: 1 },
    { type: 'number', id: 'elternteil2', label: 'Elternzeit Elternteil 2', unit: 'Monate', default: 6, min: 0, max: 36, step: 1 },
    { type: 'number', id: 'gemeinsam', label: 'Davon gleichzeitig', unit: 'Monate', default: 2, min: 0, max: 36, step: 1, help: 'Monate, in denen beide gleichzeitig zu Hause sind' },
  ],
  compute: (v) => {
    let e1 = Math.round(num(v.elternteil1, 0));
    let e2 = Math.round(num(v.elternteil2, 0));
    if (e1 < 0) e1 = 0; if (e1 > 36) e1 = 36;
    if (e2 < 0) e2 = 0; if (e2 > 36) e2 = 36;
    const maxGemeinsam = Math.min(e1, e2);
    let gemeinsam = Math.round(num(v.gemeinsam, 0));
    if (gemeinsam < 0) gemeinsam = 0;
    if (gemeinsam > maxGemeinsam) gemeinsam = maxGemeinsam;
    const rest1 = 36 - e1;
    const rest2 = 36 - e2;
    // Abgedeckter Betreuungszeitraum: Summe minus gleichzeitige Monate
    const abgedeckt = e1 + e2 - gemeinsam;
    return [
      { label: 'Abgedeckter Betreuungszeitraum', value: abgedeckt, unit: 'Monate', digits: 0, primary: true, help: 'Zeitraum, in dem mind. ein Elternteil zu Hause ist' },
      { label: 'Rest Elternteil 1', value: rest1, unit: 'Monate', digits: 0, help: 'noch verfügbar von 36' },
      { label: 'Rest Elternteil 2', value: rest2, unit: 'Monate', digits: 0, help: 'noch verfügbar von 36' },
      { label: 'Gleichzeitige Elternzeit', value: gemeinsam, unit: 'Monate', digits: 0 },
    ];
  },
  howto: [
    'Geplante Elternzeit für Elternteil 1 in Monaten eingeben (max. 36).',
    'Geplante Elternzeit für Elternteil 2 eingeben.',
    'Anzahl der Monate angeben, in denen beide gleichzeitig zu Hause sind.',
    'Abgedeckten Betreuungszeitraum und verbleibende Monate ablesen.',
  ],
  faq: [
    { q: 'Wie viele Monate Elternzeit gibt es?', a: 'Jeder Elternteil hat pro Kind Anspruch auf bis zu 36 Monate Elternzeit. Diese sind unabhängig vom Elterngeld und können teils flexibel auch zwischen dem 3. und 8. Geburtstag genommen werden.' },
    { q: 'Können beide Eltern gleichzeitig in Elternzeit?', a: 'Ja. Beide Elternteile können gleichzeitig Elternzeit nehmen. Beim Elterngeld gelten dafür allerdings eigene Bezugsregeln.' },
    { q: 'Ist Elternzeit dasselbe wie Elterngeld?', a: 'Nein. Elternzeit ist die unbezahlte Freistellung vom Job, Elterngeld die staatliche Lohnersatzleistung. Beides wird getrennt beantragt und kann sich unterschiedlich lang überschneiden.' },
    { q: 'Muss Elternzeit am Stück genommen werden?', a: 'Nein. Elternzeit kann in bis zu drei Abschnitte aufgeteilt werden. Ein Teil lässt sich auf einen späteren Zeitpunkt bis zum 8. Geburtstag des Kindes verschieben.' },
    { q: 'Wann muss ich Elternzeit anmelden?', a: 'Für die Zeit bis zum 3. Geburtstag muss die Elternzeit spätestens sieben Wochen vor Beginn schriftlich beim Arbeitgeber angemeldet werden (Stand 2026).' },
  ],
  related: ['elterngeld-rechner', 'kindergeld-rechner', 'kosten-kind-rechner'],
  examples: [
    {
      values: { elternteil1: 12, elternteil2: 6, gemeinsam: 2 },
      expect: [
        { label: 'Abgedeckter Betreuungszeitraum', value: 16, tolerance: 0.01 },
        { label: 'Rest Elternteil 1', value: 24, tolerance: 0.01 },
        { label: 'Rest Elternteil 2', value: 30, tolerance: 0.01 },
      ],
    },
  ],
  updated: '2026-06-18',
};
