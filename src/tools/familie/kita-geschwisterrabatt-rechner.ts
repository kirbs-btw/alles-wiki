import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

// Kita-Geschwisterrabatt-Rechner (Näherung). Viele Kommunen gewähren für das
// zweite und jedes weitere gleichzeitig betreute Kind eine Ermäßigung auf den
// Kita-Beitrag. Hier vereinfacht: erstes Kind voller Beitrag, jedes weitere Kind
// erhält denselben prozentualen Rabatt. KEINE bundesweiten Sätze – maßgeblich ist
// die Satzung der jeweiligen Kommune. Reine Orientierung.

export const tool: Tool = {
  slug: 'kita-geschwisterrabatt-rechner',
  category: 'familie',
  title: 'Kita-Geschwisterrabatt-Rechner (Näherung)',
  shortTitle: 'Geschwisterrabatt',
  description:
    'Berechne den gesamten Kita-Beitrag mit Geschwisterrabatt: erstes Kind voller Beitrag, jedes weitere mit Ermäßigung. Zeigt Ersparnis und Gesamtkosten. Näherung.',
  keywords: [
    'kita geschwisterrabatt rechner',
    'geschwisterermäßigung kita',
    'kita rabatt zweites kind',
    'kita beitrag geschwister',
    'geschwisterkind kita kosten',
    'kindergarten geschwisterrabatt',
  ],
  intro:
    'Werden mehrere Kinder einer Familie gleichzeitig in einer Kita betreut, gewähren viele Kommunen einen Geschwisterrabatt: Das erste Kind zahlt den vollen Beitrag, jedes weitere wird ermäßigt – oft 50 % oder sogar beitragsfrei. Dieser Rechner bildet das vereinfacht ab: voller Beitrag für das erste Kind, ein einstellbarer Rabatt für jedes weitere. Hinweis: Bundesweite Sätze gibt es nicht – maßgeblich ist die Satzung Ihrer Kommune. Reine Orientierung.',
  formula:
    'Gesamt = Beitrag + (Kinder − 1) × Beitrag × (1 − Rabatt%); Ersparnis = (Kinder − 1) × Beitrag × Rabatt%',
  inputs: [
    { type: 'number', id: 'beitrag', label: 'Kita-Beitrag pro Kind (voll)', unit: '€/Monat', default: 250, min: 0, max: 2000, step: 10 },
    { type: 'number', id: 'kinder', label: 'Kinder in Betreuung', unit: 'Kinder', default: 2, min: 1, max: 8, step: 1 },
    { type: 'number', id: 'rabatt', label: 'Rabatt je weiterem Kind', unit: '%', default: 50, min: 0, max: 100, step: 5, help: 'z. B. 50 % oder 100 % (beitragsfrei)' },
  ],
  compute: (v) => {
    const beitrag = Math.max(0, num(v.beitrag, 250));
    let kinder = Math.round(num(v.kinder, 2));
    if (kinder < 1) kinder = 1;
    if (kinder > 8) kinder = 8;
    const rabatt = Math.max(0, Math.min(100, num(v.rabatt, 50))) / 100;
    const weitere = kinder - 1;
    const beitragWeitere = beitrag * (1 - rabatt);
    const gesamt = beitrag + weitere * beitragWeitere;
    const ohneRabatt = beitrag * kinder;
    const ersparnis = ohneRabatt - gesamt;
    return [
      { label: 'Gesamtbeitrag pro Monat', value: gesamt, unit: '€', digits: 2, primary: true },
      { label: 'Beitrag je weiterem Kind', value: beitragWeitere, unit: '€', digits: 2 },
      { label: 'Ersparnis pro Monat', value: ersparnis, unit: '€', digits: 2 },
      { label: 'Beitrag ohne Rabatt', value: ohneRabatt, unit: '€', digits: 2 },
      { label: 'Ersparnis pro Jahr', value: ersparnis * 12, unit: '€', digits: 2 },
    ];
  },
  howto: [
    'Vollen Kita-Beitrag pro Kind eingeben.',
    'Anzahl der gleichzeitig betreuten Kinder eintragen.',
    'Rabattsatz je weiterem Kind aus der Satzung wählen (z. B. 50 % oder 100 %).',
    'Gesamtbeitrag und monatliche Ersparnis ablesen.',
  ],
  faq: [
    { q: 'Was ist ein Geschwisterrabatt?', a: 'Eine Ermäßigung auf den Kita-Beitrag, wenn mehrere Kinder einer Familie gleichzeitig betreut werden. Üblicherweise zahlt das erste Kind voll, weitere Kinder werden reduziert oder sind beitragsfrei.' },
    { q: 'Wie hoch ist der Rabatt typischerweise?', a: 'Das ist kommunal sehr unterschiedlich. Häufig sind 50 % für das zweite Kind, in manchen Kommunen ist ab dem zweiten oder dritten Kind gar kein Beitrag mehr fällig.' },
    { q: 'Zählen auch Geschwister in anderen Einrichtungen?', a: 'Oft ja – manche Satzungen rechnen auch Kinder in Krippe, Hort oder Tagespflege mit. Das müssen Sie bei Ihrer Kommune erfragen.' },
    { q: 'Sind die Werte verbindlich?', a: 'Nein. Es gibt keine bundesweiten Sätze. Maßgeblich ist allein die Beitragssatzung Ihrer Kommune – dies ist eine frei einstellbare Näherung.' },
  ],
  related: ['kita-beitrag-rechner', 'betreuungskosten-rechner', 'kosten-kind-rechner', 'familienbudget-rechner'],
  examples: [
    {
      values: { beitrag: 250, kinder: 3, rabatt: 50 },
      expect: [
        { label: 'Beitrag je weiterem Kind', value: 125, tolerance: 0.01 },
        { label: 'Gesamtbeitrag pro Monat', value: 500, tolerance: 0.01 },
        { label: 'Ersparnis pro Monat', value: 250, tolerance: 0.01 },
      ],
    },
    {
      values: { beitrag: 300, kinder: 2, rabatt: 100 },
      expect: [
        { label: 'Gesamtbeitrag pro Monat', value: 300, tolerance: 0.01 },
        { label: 'Ersparnis pro Monat', value: 300, tolerance: 0.01 },
      ],
    },
  ],
  updated: '2026-06-19',
};
