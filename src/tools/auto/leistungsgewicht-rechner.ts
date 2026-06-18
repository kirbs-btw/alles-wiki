import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'leistungsgewicht-rechner',
  category: 'auto',
  title: 'Leistungsgewicht-Rechner',
  shortTitle: 'Leistungsgewicht',
  description:
    'Berechne das Leistungsgewicht deines Autos – PS pro Tonne und kg pro PS – als Kennzahl für die Fahrdynamik.',
  keywords: [
    'leistungsgewicht berechnen',
    'ps pro tonne rechner',
    'kg pro ps rechner',
    'leistungsgewicht auto',
    'kw pro kg berechnen',
    'fahrdynamik kennzahl',
  ],
  formula:
    'PS pro Tonne = Leistung (PS) / (Gewicht in kg / 1000); kg pro PS = Gewicht / Leistung',
  intro:
    'Das Leistungsgewicht setzt die Motorleistung ins Verhältnis zum Fahrzeuggewicht und ist die zentrale Kennzahl für die Beschleunigungsfähigkeit. Je mehr PS pro Tonne, desto sportlicher fährt sich das Auto.',
  inputs: [
    { type: 'number', id: 'leistung', label: 'Motorleistung', unit: 'PS', default: 150, min: 0, step: 1 },
    { type: 'number', id: 'gewicht', label: 'Leergewicht', unit: 'kg', default: 1400, min: 1, step: 10, help: 'Optional inkl. Fahrer und Zuladung' },
  ],
  compute: (v) => {
    const leistung = num(v.leistung);
    const gewicht = num(v.gewicht);
    const psProTonne = gewicht > 0 ? leistung / (gewicht / 1000) : 0;
    const kgProPs = leistung > 0 ? gewicht / leistung : 0;
    const kw = leistung * 0.7355;
    const kwProKg = gewicht > 0 ? kw / gewicht : 0;
    return [
      { label: 'PS pro Tonne', value: psProTonne, unit: 'PS/t', digits: 1, primary: true },
      { label: 'Gewicht pro PS', value: kgProPs, unit: 'kg/PS', digits: 2 },
      { label: 'Leistung in kW', value: kw, unit: 'kW', digits: 1 },
      { label: 'kW pro kg', value: kwProKg, unit: 'kW/kg', digits: 4 },
    ];
  },
  howto: [
    'Motorleistung in PS aus dem Fahrzeugschein eintragen.',
    'Leergewicht in kg erfassen (optional inkl. Beladung).',
    'PS pro Tonne und kg pro PS ablesen.',
    'Werte mit anderen Fahrzeugen vergleichen.',
  ],
  faq: [
    { q: 'Was ist ein gutes Leistungsgewicht?', a: 'Alltagsautos liegen oft bei 80 bis 120 PS/t. Sportwagen erreichen 200 PS/t und mehr. Je höher der Wert, desto stärker die Beschleunigung.' },
    { q: 'Soll ich Leergewicht oder mit Beladung rechnen?', a: 'Das Leergewicht liefert die Herstellerkennzahl. Realistischer ist die Rechnung inklusive Fahrer und Gepäck, da dann das tatsächliche Beschleunigungsverhalten abgebildet wird.' },
    { q: 'Warum kg pro PS und PS pro Tonne?', a: 'Beide Kennzahlen beschreiben denselben Zusammenhang. PS pro Tonne ist im deutschsprachigen Raum üblicher, kg pro PS findet man häufig in technischen Datenblättern.' },
  ],
  related: ['ps-kw-umrechner', 'drehzahl-geschwindigkeit-rechner', 'beschleunigung-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { leistung: 150, gewicht: 1400 },
      // PS/t = 150 / 1.4 = 107.142857
      expect: [{ label: 'PS pro Tonne', value: 107.14, tolerance: 0.1 }],
    },
    {
      values: { leistung: 200, gewicht: 1500 },
      // kg/PS = 1500/200 = 7.5
      expect: [{ label: 'Gewicht pro PS', value: 7.5, tolerance: 0.01 }],
    },
  ],
};
