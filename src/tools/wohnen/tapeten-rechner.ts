import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'tapeten-rechner',
  category: 'wohnen',
  title: 'Tapeten-Rechner',
  shortTitle: 'Tapetenbedarf',
  description:
    'Berechne, wie viele Tapetenrollen du für einen Raum brauchst – aus Raumumfang, Wandhöhe und Rollenmaß inklusive Verschnitt.',
  keywords: [
    'tapeten rechner',
    'wie viele rollen tapete',
    'tapetenbedarf berechnen',
    'tapete rollen rechner',
    'tapezieren menge',
    'rollen tapete pro raum',
  ],
  formula:
    'Bahnen je Rolle = floor(Rollenlänge / (Wandhöhe + Ansatz)); Bahnen gesamt = ceil(Umfang / Bahnenbreite); Rollen = ceil(Bahnen / Bahnen je Rolle)',
  inputs: [
    { type: 'number', id: 'umfang', label: 'Raumumfang (Wandlänge gesamt)', unit: 'm', default: 18, min: 1, step: 0.1, help: 'Summe aller zu tapezierenden Wandlängen.' },
    { type: 'number', id: 'hoehe', label: 'Wandhöhe', unit: 'm', default: 2.5, min: 1, step: 0.05 },
    { type: 'number', id: 'rollenlaenge', label: 'Rollenlänge', unit: 'm', default: 10.05, min: 1, step: 0.05, help: 'Standardrolle ist meist 10,05 m lang.' },
    { type: 'number', id: 'rollenbreite', label: 'Rollenbreite', unit: 'm', default: 0.53, min: 0.1, step: 0.01, help: 'Standardbreite ist meist 0,53 m.' },
    { type: 'number', id: 'ansatz', label: 'Musteransatz / Verschnitt pro Bahn', unit: 'm', default: 0.1, min: 0, step: 0.01, help: 'Zugabe pro Bahn für Muster und Schnitt.' },
  ],
  compute: (v) => {
    const umfang = num(v.umfang);
    const hoehe = num(v.hoehe);
    const rollenlaenge = num(v.rollenlaenge);
    const rollenbreite = num(v.rollenbreite);
    const ansatz = num(v.ansatz);
    const bahnHoehe = hoehe + ansatz;
    const bahnenJeRolle = bahnHoehe > 0 ? Math.floor(rollenlaenge / bahnHoehe) : 0;
    const bahnenGesamt = rollenbreite > 0 ? Math.ceil(umfang / rollenbreite) : 0;
    const rollen = bahnenJeRolle > 0 ? Math.ceil(bahnenGesamt / bahnenJeRolle) : 0;
    return [
      { label: 'Benötigte Rollen', value: rollen, unit: 'Rollen', digits: 0, primary: true },
      { label: 'Bahnen gesamt', value: bahnenGesamt, unit: 'Bahnen', digits: 0 },
      { label: 'Bahnen je Rolle', value: bahnenJeRolle, unit: 'Bahnen', digits: 0 },
    ];
  },
  intro:
    'Der Tapeten-Rechner ermittelt aus Raumumfang, Wandhöhe und Rollenmaß die nötige Rollenzahl. Türen und Fenster werden zur Sicherheit nicht abgezogen, sodass ein realistischer Verschnitt-Puffer entsteht.',
  howto: [
    'Raumumfang messen: alle Wandlängen addieren.',
    'Wandhöhe und Rollenmaße (Standard 10,05 m × 0,53 m) eintragen.',
    'Musteransatz bzw. Verschnitt pro Bahn ergänzen.',
    'Benötigte Rollenzahl ablesen und mit etwas Reserve kaufen.',
  ],
  faq: [
    { q: 'Soll ich Türen und Fenster abziehen?', a: 'Für eine sichere Kalkulation rechnen wir mit dem vollen Umfang. Die nicht tapezierten Flächen dienen als Verschnitt-Reserve, was bei gemusterten Tapeten sinnvoll ist.' },
    { q: 'Warum eine ganze Reserverolle einplanen?', a: 'Bei Nachkauf kann die Chargennummer abweichen und damit der Farbton leicht anders sein. Eine Reserverolle aus derselben Charge verhindert sichtbare Unterschiede.' },
    { q: 'Wie wirkt sich der Musteransatz aus?', a: 'Je größer der Rapport (Musterhöhe), desto mehr Verschnitt entsteht. Der Ansatzwert erhöht die rechnerische Bahnenhöhe und senkt damit die Bahnen je Rolle.' },
  ],
  related: ['wandfarbe-rechner', 'wohnflaeche-rechner', 'raumvolumen-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { umfang: 18, hoehe: 2.5, rollenlaenge: 10.05, rollenbreite: 0.53, ansatz: 0.1 },
      expect: [
        { label: 'Benötigte Rollen', value: 12, tolerance: 0.01 },
        { label: 'Bahnen gesamt', value: 34, tolerance: 0.01 },
        { label: 'Bahnen je Rolle', value: 3, tolerance: 0.01 },
      ],
    },
  ],
};
