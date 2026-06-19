import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'adblue-verbrauch-rechner',
  category: 'auto',
  title: 'AdBlue-Verbrauch & Reichweite',
  shortTitle: 'AdBlue',
  description:
    'Berechne den AdBlue-Verbrauch deines Diesels, die Reichweite einer Tankfüllung und die Kosten pro Jahr aus dem Verbrauch je 1.000 km.',
  keywords: [
    'adblue verbrauch berechnen',
    'adblue reichweite rechner',
    'adblue kosten pro jahr',
    'wie lange reicht adblue',
    'adblue verbrauch pro 1000 km',
    'adblue tank reichweite',
  ],
  formula:
    'AdBlue je 100 km = (Dieselverbrauch × Anteil%/100); Reichweite = Tankinhalt / Verbrauch je km',
  intro:
    'Moderne Diesel mit SCR-Katalysator benötigen AdBlue (Harnstofflösung), um Stickoxide zu reduzieren. Der Verbrauch liegt grob bei 3 bis 6 Prozent des Dieselverbrauchs. Dieser Rechner schätzt den AdBlue-Verbrauch je 1.000 km, die Reichweite einer Tankfüllung und die jährlichen Kosten – als Näherung, abhängig von Motor und Fahrweise.',
  inputs: [
    { type: 'number', id: 'dieselVerbrauch', label: 'Dieselverbrauch', unit: 'l/100 km', default: 6, min: 0.1, step: 0.1 },
    { type: 'number', id: 'anteil', label: 'AdBlue-Anteil am Diesel', unit: '%', default: 5, min: 1, max: 10, step: 0.5, help: 'Typisch 3–6 %' },
    { type: 'number', id: 'tankInhalt', label: 'AdBlue-Tankinhalt', unit: 'l', default: 18, min: 1, step: 1 },
    { type: 'number', id: 'jahreskm', label: 'Fahrleistung pro Jahr', unit: 'km', default: 20000, min: 0, step: 500 },
    { type: 'number', id: 'preis', label: 'AdBlue-Preis', unit: 'EUR/l', default: 1.00, min: 0, step: 0.05, help: 'Kanister günstiger als Zapfsäule' },
  ],
  compute: (v) => {
    const diesel = num(v.dieselVerbrauch);
    const anteil = num(v.anteil);
    const tank = num(v.tankInhalt);
    const jahreskm = num(v.jahreskm);
    const preis = num(v.preis);
    const adbluePro100 = diesel * (anteil / 100);
    const adbluePro1000 = adbluePro100 * 10;
    const reichweite = adbluePro100 > 0 ? (tank / adbluePro100) * 100 : 0;
    const literJahr = (adbluePro100 / 100) * jahreskm;
    const kostenJahr = literJahr * preis;
    return [
      { label: 'AdBlue-Reichweite je Tank', value: reichweite, unit: 'km', digits: 0, primary: true },
      { label: 'Verbrauch je 1.000 km', value: adbluePro1000, unit: 'l', digits: 2 },
      { label: 'AdBlue pro Jahr', value: literJahr, unit: 'l', digits: 1 },
      { label: 'Kosten pro Jahr', value: kostenJahr, unit: 'EUR', digits: 2 },
    ];
  },
  howto: [
    'Durchschnittlichen Dieselverbrauch eintragen.',
    'AdBlue-Anteil am Dieselverbrauch schätzen (typisch 3–6 %).',
    'AdBlue-Tankinhalt und jährliche Fahrleistung angeben.',
    'Preis ergänzen und Reichweite sowie Jahreskosten ablesen.',
  ],
  faq: [
    { q: 'Wie viel AdBlue verbraucht ein Diesel?', a: 'Als Faustregel rund 3 bis 6 Prozent des Dieselverbrauchs. Bei 6 l/100 km Diesel und 5 Prozent sind das etwa 0,3 Liter AdBlue je 100 km.' },
    { q: 'Was passiert, wenn AdBlue leer ist?', a: 'Ist der AdBlue-Tank leer, lässt sich der Motor aus gesetzlichen Gründen nicht mehr starten. Rechtzeitiges Nachfüllen ist daher wichtig – das Fahrzeug warnt meist mehrfach vorher.' },
    { q: 'Kanister oder Zapfsäule – was ist günstiger?', a: 'AdBlue aus dem Kanister ist meist günstiger pro Liter als an der Zapfsäule. Bei selbst befüllten Kanistern auf saubere Handhabung achten, da AdBlue empfindlich ist.' },
  ],
  related: ['durchschnittsverbrauch-rechner', 'tankfuellung-reichweite-rechner', 'auto-gesamtkosten-rechner'],
  updated: '2026-06-19',
  examples: [
    {
      values: { dieselVerbrauch: 6, anteil: 5, tankInhalt: 18, jahreskm: 20000, preis: 1.00 },
      // adbluePro100 = 0.3 ; reichweite = 18/0.3*100 = 6000
      expect: [{ label: 'AdBlue-Reichweite je Tank', value: 6000, tolerance: 1 }],
    },
    {
      values: { dieselVerbrauch: 7, anteil: 4, tankInhalt: 20, jahreskm: 25000, preis: 0.90 },
      // adbluePro100 = 7*0.04 = 0.28 ; literJahr = 0.28/100*25000 = 70 ; kosten = 70*0.90 = 63
      expect: [{ label: 'Kosten pro Jahr', value: 63, tolerance: 0.1 }],
    },
  ],
};
