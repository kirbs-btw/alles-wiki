import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'baufinanzierung-rate-rechner',
  category: 'wohnen',
  title: 'Baufinanzierung Monatsrate-Rechner (Annuität)',
  shortTitle: 'Baufinanzierungsrate',
  description:
    'Berechne die monatliche Annuitätenrate eines Immobilienkredits aus Darlehen, Sollzins und anfänglicher Tilgung – inklusive Zins- und Tilgungsanteil im ersten Jahr.',
  keywords: [
    'baufinanzierung rate berechnen',
    'annuität rechner',
    'monatsrate immobilienkredit',
    'tilgung zins rechner',
    'darlehensrate berechnen',
    'hauskredit monatsrate',
    'kreditrate immobilie',
  ],
  formula:
    'Jahresrate = Darlehen × (Sollzins + Tilgung)/100; Monatsrate = Jahresrate / 12',
  inputs: [
    { type: 'number', id: 'darlehen', label: 'Darlehenssumme', unit: '€', default: 300000, min: 0, step: 1000 },
    { type: 'number', id: 'zins', label: 'Sollzins p.a.', unit: '%', default: 3.8, min: 0, max: 20, step: 0.01 },
    { type: 'number', id: 'tilgung', label: 'Anfängliche Tilgung p.a.', unit: '%', default: 2, min: 0.1, max: 20, step: 0.1, help: 'Tilgungssatz im ersten Jahr; üblich sind 2 bis 3 %.' },
  ],
  compute: (v) => {
    const darlehen = num(v.darlehen);
    const zins = num(v.zins);
    const tilgung = num(v.tilgung);
    const annuitaetSatz = zins + tilgung;
    const jahresrate = darlehen * (annuitaetSatz / 100);
    const monatsrate = jahresrate / 12;
    const zinsJahr1 = darlehen * (zins / 100);
    const tilgungJahr1 = darlehen * (tilgung / 100);
    const restschuldJahr1 = darlehen - tilgungJahr1;
    return [
      { label: 'Monatliche Rate', value: monatsrate, unit: '€', digits: 2, primary: true },
      { label: 'Jahresrate (Annuität)', value: jahresrate, unit: '€', digits: 2 },
      { label: 'Zinsanteil 1. Jahr', value: zinsJahr1, unit: '€', digits: 2 },
      { label: 'Tilgungsanteil 1. Jahr', value: tilgungJahr1, unit: '€', digits: 2 },
      { label: 'Restschuld nach 1. Jahr', value: restschuldJahr1, unit: '€', digits: 2 },
    ];
  },
  intro:
    'Bei einem Annuitätendarlehen bleibt die monatliche Rate über die Zinsbindung konstant. Sie setzt sich aus Sollzins und anfänglicher Tilgung zusammen. Mit fortschreitender Rückzahlung sinkt der Zinsanteil und der Tilgungsanteil steigt, weil die Zinsen nur auf die jeweils verbleibende Restschuld berechnet werden. Dieser Rechner zeigt die Anfangsrate und die Aufteilung im ersten Jahr.',
  howto: [
    'Darlehenssumme (gewünschter Kreditbetrag) eingeben.',
    'Sollzins pro Jahr aus dem Angebot der Bank eintragen.',
    'Anfängliche Tilgung wählen (üblich 2 bis 3 %).',
    'Monatsrate sowie Zins- und Tilgungsanteil ablesen.',
  ],
  faq: [
    { q: 'Wie berechnet sich die Annuitätenrate?', a: 'Die jährliche Annuität ergibt sich aus der Darlehenssumme multipliziert mit der Summe aus Sollzins und anfänglicher Tilgung. Geteilt durch zwölf ergibt sich die konstante Monatsrate. Beispiel: 300.000 € bei 3,8 % Zins und 2 % Tilgung = 5,8 % = 17.400 € im Jahr bzw. 1.450 € im Monat.' },
    { q: 'Was ist die anfängliche Tilgung?', a: 'Die anfängliche Tilgung gibt an, welcher Anteil des Darlehens im ersten Jahr zurückgezahlt wird. Eine höhere Tilgung bedeutet eine höhere Rate, aber eine kürzere Laufzeit und weniger Zinskosten insgesamt.' },
    { q: 'Warum sinkt der Zinsanteil mit der Zeit?', a: 'Zinsen werden immer nur auf die noch offene Restschuld berechnet. Da die Tilgung die Restschuld laufend verringert, fällt der Zinsanteil und – bei gleichbleibender Rate – steigt der Tilgungsanteil entsprechend.' },
    { q: 'Berücksichtigt der Rechner die Restschuld am Ende der Zinsbindung?', a: 'Dieser Rechner zeigt die Anfangsrate und die Aufteilung des ersten Jahres. Die exakte Restschuld nach der Zinsbindung hängt von der Bindungsdauer und Sondertilgungen ab und wird hier nicht im Detail abgebildet.' },
  ],
  related: ['grunderwerbsteuer-rechner', 'mietrendite-rechner', 'maklerprovision-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { darlehen: 300000, zins: 3.8, tilgung: 2 },
      expect: [
        { label: 'Monatliche Rate', value: 1450, tolerance: 0.5 },
        { label: 'Jahresrate (Annuität)', value: 17400, tolerance: 1 },
        { label: 'Tilgungsanteil 1. Jahr', value: 6000, tolerance: 1 },
      ],
    },
  ],
};
