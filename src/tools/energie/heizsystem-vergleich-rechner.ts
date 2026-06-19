import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'heizsystem-vergleich-rechner',
  category: 'energie',
  title: 'Heizsystem-Vergleich (Gas, Öl, Pellets, Wärmepumpe)',
  shortTitle: 'Heizvergleich',
  description:
    'Vergleiche die jährlichen Brennstoffkosten von Gas, Heizöl, Holzpellets und Wärmepumpe bei gleichem Heizwärmebedarf - inklusive Wirkungsgrad und JAZ.',
  keywords: [
    'heizung vergleich kosten',
    'gas öl pellets wärmepumpe vergleich',
    'heizkosten vergleich rechner',
    'brennstoffkosten vergleich',
    'welche heizung günstiger',
    'heizsystem kosten',
  ],
  intro:
    'Welche Heizung ist im Betrieb am günstigsten? Dieser Rechner stellt Gas, Heizöl, Holzpellets und eine Strom-Wärmepumpe bei demselben jährlichen Heizwärmebedarf gegenüber. Berücksichtigt werden Wirkungsgrad bzw. Jahresarbeitszahl und die aktuellen Energiepreise. So siehst du die reinen Brennstoff- bzw. Stromkosten je System. Preise schwanken stark - trage deine eigenen Werte ein. Stand 2026, ohne Gewähr.',
  formula: 'Verbrennung: Kosten = Bedarf ÷ Wirkungsgrad × Preis; Wärmepumpe: Kosten = Bedarf ÷ JAZ × Strompreis',
  inputs: [
    { type: 'number', id: 'bedarf', label: 'Heizwärmebedarf pro Jahr', unit: 'kWh', default: 18000, min: 0, step: 500, help: 'Benötigte Nutzwärme inkl. Warmwasser.' },
    { type: 'number', id: 'gaspreis', label: 'Gaspreis', unit: 'ct/kWh', default: 11, min: 0, step: 0.1 },
    { type: 'number', id: 'gasWg', label: 'Wirkungsgrad Gaskessel', unit: '%', default: 90, min: 1, max: 110, step: 1, help: 'Brennwert ~95-105 %, alter Kessel ~85 %.' },
    { type: 'number', id: 'oelpreis', label: 'Heizölpreis', unit: 'ct/kWh', default: 11, min: 0, step: 0.1, help: '1 Liter Heizöl ≈ 10 kWh; bei 1,10 €/l also ~11 ct/kWh.' },
    { type: 'number', id: 'oelWg', label: 'Wirkungsgrad Ölkessel', unit: '%', default: 88, min: 1, max: 110, step: 1 },
    { type: 'number', id: 'pelletpreis', label: 'Pelletpreis', unit: 'ct/kWh', default: 7, min: 0, step: 0.1, help: '1 kg Pellets ≈ 4,8 kWh; bei 0,34 €/kg also ~7 ct/kWh.' },
    { type: 'number', id: 'pelletWg', label: 'Wirkungsgrad Pelletkessel', unit: '%', default: 88, min: 1, max: 110, step: 1 },
    { type: 'number', id: 'strompreis', label: 'Wärmepumpenstrompreis', unit: 'ct/kWh', default: 28, min: 0, step: 0.5 },
    { type: 'number', id: 'jaz', label: 'Jahresarbeitszahl (JAZ)', unit: '', default: 3.5, min: 1, step: 0.1 },
  ],
  compute: (v) => {
    const bedarf = num(v.bedarf);
    const verbrenn = (preisCt: number, wgProz: number) => {
      const wg = wgProz / 100;
      return wg > 0 ? (bedarf / wg) * (preisCt / 100) : 0;
    };
    const gas = verbrenn(num(v.gaspreis), num(v.gasWg));
    const oel = verbrenn(num(v.oelpreis), num(v.oelWg));
    const pellets = verbrenn(num(v.pelletpreis), num(v.pelletWg));
    const jaz = num(v.jaz);
    const wp = jaz > 0 ? (bedarf / jaz) * (num(v.strompreis) / 100) : 0;
    const werte = [
      { name: 'Gas', kosten: gas },
      { name: 'Heizöl', kosten: oel },
      { name: 'Pellets', kosten: pellets },
      { name: 'Wärmepumpe', kosten: wp },
    ];
    const guenstigste = werte.reduce((a, b) => (b.kosten < a.kosten ? b : a));
    return [
      { label: 'Günstigstes System', value: `${guenstigste.name}`, primary: true },
      { label: 'Kosten Gas pro Jahr', value: gas, unit: '€', digits: 2 },
      { label: 'Kosten Heizöl pro Jahr', value: oel, unit: '€', digits: 2 },
      { label: 'Kosten Pellets pro Jahr', value: pellets, unit: '€', digits: 2 },
      { label: 'Kosten Wärmepumpe pro Jahr', value: wp, unit: '€', digits: 2 },
    ];
  },
  howto: [
    'Jährlichen Heizwärmebedarf in kWh eintragen.',
    'Für jeden Energieträger den Preis und den Wirkungsgrad bzw. die JAZ angeben.',
    'Die Jahreskosten der vier Systeme vergleichen.',
    'Das günstigste System wird hervorgehoben.',
  ],
  faq: [
    { q: 'Sind nur die Brennstoffkosten gemeint?', a: 'Ja. Der Rechner vergleicht die laufenden Energiekosten. Anschaffung, Wartung, Schornsteinfeger, CO2-Abgabe und Förderungen sind nicht enthalten - sie beeinflussen die Gesamtwirtschaftlichkeit erheblich.' },
    { q: 'Warum braucht man den Wirkungsgrad?', a: 'Ein Kessel wandelt nicht 100 % des Brennstoffs in Nutzwärme um. Bei 90 % Wirkungsgrad muss für 18.000 kWh Wärme entsprechend mehr Brennstoff gekauft werden. Die Wärmepumpe rechnet stattdessen mit der Jahresarbeitszahl.' },
    { q: 'Wie rechne ich Liter Öl oder kg Pellets in ct/kWh um?', a: 'Heizöl hat rund 10 kWh pro Liter: Literpreis ÷ 10 ergibt grob die ct/kWh. Pellets haben etwa 4,8 kWh pro Kilogramm: Preis je kg ÷ 4,8. Der Rechner arbeitet einheitlich mit ct/kWh.' },
    { q: 'Wie aktuell sind die Standardpreise?', a: 'Die Voreinstellungen sind grobe Richtwerte mit Stand 2026 und schwanken regional und saisonal stark. Für eine belastbare Entscheidung solltest du deine konkreten Angebotspreise eintragen.' },
  ],
  related: ['heizwaermebedarf-rechner', 'gaskosten-rechner', 'waermepumpe-stromkosten-rechner'],
  updated: '2026-06-19',
  examples: [
    {
      values: {
        bedarf: 18000,
        gaspreis: 11,
        gasWg: 90,
        oelpreis: 11,
        oelWg: 88,
        pelletpreis: 7,
        pelletWg: 88,
        strompreis: 28,
        jaz: 3.5,
      },
      expect: [
        { label: 'Kosten Gas pro Jahr', value: 2200, tolerance: 0.5 },
        { label: 'Kosten Wärmepumpe pro Jahr', value: 1440, tolerance: 0.5 },
      ],
    },
  ],
};
