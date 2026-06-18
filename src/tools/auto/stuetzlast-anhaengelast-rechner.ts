import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'stuetzlast-anhaengelast-rechner',
  category: 'auto',
  title: 'Stützlast- & Anhängelast-Rechner',
  shortTitle: 'Stützlast',
  description:
    'Prüfe, ob Anhängergewicht und Stützlast deines Gespanns innerhalb der zulässigen Grenzen liegen – mit Reserveanzeige.',
  keywords: [
    'stützlast berechnen',
    'anhängelast rechner',
    'zulässige anhängelast prüfen',
    'stützlast anhänger rechner',
    'gespanngewicht berechnen',
    'wohnwagen stützlast',
  ],
  formula:
    'Reserve Anhängelast = zulässige Anhängelast - tatsächliches Anhängergewicht; Stützlast muss zwischen Mindest- und Höchstwert liegen',
  intro:
    'Anhängelast und Stützlast sind sicherheitsrelevant und gesetzlich begrenzt. Dieser Rechner zeigt, wie viel Reserve bis zur zulässigen Anhängelast bleibt und ob die eingestellte Stützlast den zulässigen Höchstwert einhält. Maßgeblich bleiben stets die Werte aus Fahrzeugschein und Typenschild.',
  inputs: [
    { type: 'number', id: 'zulAnhaengelast', label: 'Zulässige Anhängelast (gebremst)', unit: 'kg', default: 1500, min: 0, step: 10, help: 'Fahrzeugschein Feld O.1' },
    { type: 'number', id: 'anhaengerGewicht', label: 'Tatsächliches Anhängergewicht', unit: 'kg', default: 1200, min: 0, step: 10, help: 'Anhänger inkl. Ladung' },
    { type: 'number', id: 'maxStuetzlast', label: 'Zulässige Stützlast', unit: 'kg', default: 75, min: 0, step: 5, help: 'Niedrigster Wert aus Auto, Kupplung, Anhänger' },
    { type: 'number', id: 'istStuetzlast', label: 'Tatsächliche Stützlast', unit: 'kg', default: 60, min: 0, step: 1 },
  ],
  compute: (v) => {
    const zulAnhaengelast = num(v.zulAnhaengelast);
    const anhaengerGewicht = num(v.anhaengerGewicht);
    const maxStuetzlast = num(v.maxStuetzlast);
    const istStuetzlast = num(v.istStuetzlast);
    const reserve = zulAnhaengelast - anhaengerGewicht;
    const auslastung = zulAnhaengelast > 0 ? (anhaengerGewicht / zulAnhaengelast) * 100 : 0;
    const stuetzReserve = maxStuetzlast - istStuetzlast;
    const status = reserve >= 0 && stuetzReserve >= 0 ? 'OK – innerhalb der Grenzen' : 'Überschritten – nicht zulässig';
    return [
      { label: 'Reserve Anhängelast', value: reserve, unit: 'kg', digits: 0, primary: true },
      { label: 'Auslastung Anhängelast', value: auslastung, unit: '%', digits: 1 },
      { label: 'Reserve Stützlast', value: stuetzReserve, unit: 'kg', digits: 0 },
      { label: 'Status', value: status, unit: '' },
    ];
  },
  howto: [
    'Zulässige gebremste Anhängelast aus dem Fahrzeugschein (Feld O.1) eintragen.',
    'Tatsächliches Anhängergewicht inklusive Ladung erfassen.',
    'Zulässige Stützlast (kleinster Wert aus Auto, Kupplung und Anhänger) angeben.',
    'Tatsächliche Stützlast ergänzen und Reserve sowie Status prüfen.',
  ],
  faq: [
    { q: 'Was ist die Stützlast?', a: 'Die Stützlast ist das Gewicht, das die Anhängerdeichsel senkrecht auf die Kupplung des Zugfahrzeugs drückt. Sie sorgt für Fahrstabilität und ist nach oben begrenzt.' },
    { q: 'Welcher Stützlast-Wert gilt?', a: 'Es gilt immer der niedrigste zulässige Wert aus Fahrzeug, Anhängerkupplung und Anhänger. Diesen findest du auf dem jeweiligen Typenschild.' },
    { q: 'Was passiert bei zu wenig Stützlast?', a: 'Eine zu geringe Stützlast kann zum gefährlichen Aufschaukeln (Schlingern) des Anhängers führen. Eine ausreichend hohe, korrekt eingestellte Stützlast erhöht die Fahrstabilität.' },
  ],
  related: ['zuladung-rechner', 'auto-gesamtkosten-rechner', 'leistungsgewicht-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { zulAnhaengelast: 1500, anhaengerGewicht: 1200, maxStuetzlast: 75, istStuetzlast: 60 },
      // reserve = 300 ; auslastung = 80 ; stuetzReserve = 15
      expect: [{ label: 'Reserve Anhängelast', value: 300, tolerance: 0.5 }],
    },
    {
      values: { zulAnhaengelast: 2000, anhaengerGewicht: 1600, maxStuetzlast: 100, istStuetzlast: 90 },
      // auslastung = 1600/2000*100 = 80
      expect: [{ label: 'Auslastung Anhängelast', value: 80, tolerance: 0.1 }],
    },
  ],
};
