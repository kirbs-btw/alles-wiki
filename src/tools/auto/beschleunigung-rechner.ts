import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'beschleunigung-rechner',
  category: 'auto',
  title: 'Beschleunigung-Rechner',
  shortTitle: 'Beschleunigung',
  description:
    'Berechne die mittlere Beschleunigung deines Autos aus 0 auf eine Zielgeschwindigkeit und die dabei zurückgelegte Strecke.',
  keywords: [
    'beschleunigung berechnen',
    '0 auf 100 rechner',
    'beschleunigung auto formel',
    'beschleunigung in g',
    'sprintwert berechnen',
    'beschleunigung strecke',
  ],
  formula:
    'a = Geschwindigkeit (m/s) / Zeit (s); Strecke = 0,5 × a × Zeit^2',
  intro:
    'Aus der Sprintzeit (z. B. 0 auf 100 km/h) und der erreichten Geschwindigkeit lässt sich die mittlere Beschleunigung berechnen. Der Rechner gibt das Ergebnis in m/s², als Vielfaches der Erdbeschleunigung (g) und als zurückgelegte Strecke aus.',
  inputs: [
    { type: 'number', id: 'vEnd', label: 'Endgeschwindigkeit', unit: 'km/h', default: 100, min: 0, step: 5 },
    { type: 'number', id: 'vStart', label: 'Startgeschwindigkeit', unit: 'km/h', default: 0, min: 0, step: 5 },
    { type: 'number', id: 'zeit', label: 'Benötigte Zeit', unit: 's', default: 8, min: 0.1, step: 0.1 },
  ],
  compute: (v) => {
    const vEnd = num(v.vEnd);
    const vStart = num(v.vStart);
    const zeit = num(v.zeit);
    const dvMs = (vEnd - vStart) / 3.6;
    const a = zeit > 0 ? dvMs / zeit : 0;
    const aG = a / 9.81;
    const vStartMs = vStart / 3.6;
    const strecke = vStartMs * zeit + 0.5 * a * zeit * zeit;
    return [
      { label: 'Mittlere Beschleunigung', value: a, unit: 'm/s2', digits: 2, primary: true },
      { label: 'Beschleunigung in g', value: aG, unit: 'g', digits: 3 },
      { label: 'Zurückgelegte Strecke', value: strecke, unit: 'm', digits: 1 },
      { label: 'Geschwindigkeitszunahme', value: vEnd - vStart, unit: 'km/h', digits: 0 },
    ];
  },
  howto: [
    'Endgeschwindigkeit eintragen (z. B. 100 km/h).',
    'Startgeschwindigkeit angeben (meist 0).',
    'Benötigte Zeit in Sekunden erfassen.',
    'Mittlere Beschleunigung und Strecke ablesen.',
  ],
  faq: [
    { q: 'Was bedeutet die Beschleunigung in g?', a: 'Sie setzt die Beschleunigung ins Verhältnis zur Erdbeschleunigung (9,81 m/s²). 1 g entspricht der Beschleunigung im freien Fall – ein sehr starker Sprint.' },
    { q: 'Ist das die maximale Beschleunigung?', a: 'Nein, es ist die mittlere Beschleunigung über den gesamten Sprint. In niedrigen Gängen ist die Momentanbeschleunigung höher, bei hohem Tempo geringer.' },
    { q: 'Warum die Strecke berechnen?', a: 'Die Strecke zeigt, wie viel Raum für den Beschleunigungsvorgang benötigt wird – relevant etwa beim Auffahren auf die Autobahn.' },
  ],
  related: ['leistungsgewicht-rechner', 'drehzahl-geschwindigkeit-rechner', 'ueberholweg-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { vEnd: 100, vStart: 0, zeit: 8 },
      // dvMs = 100/3.6 = 27.778 ; a = 27.778/8 = 3.472
      expect: [{ label: 'Mittlere Beschleunigung', value: 3.47, tolerance: 0.02 }],
    },
    {
      values: { vEnd: 100, vStart: 0, zeit: 8 },
      // strecke = 0 + 0.5*3.472*64 = 111.1
      expect: [{ label: 'Zurückgelegte Strecke', value: 111.1, tolerance: 0.5 }],
    },
  ],
};
