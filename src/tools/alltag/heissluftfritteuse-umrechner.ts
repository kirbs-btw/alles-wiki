import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'heissluftfritteuse-umrechner',
  category: 'alltag',
  title: 'Backofen auf Heißluftfritteuse umrechnen',
  shortTitle: 'Airfryer-Umrechner',
  description:
    'Rechne Temperatur und Zeit eines Backofen-Rezepts auf die Heißluftfritteuse (Airfryer) um. Faustregel: rund 20 °C weniger und etwa 20 % kürzere Garzeit.',
  keywords: [
    'backofen heissluftfritteuse umrechnen',
    'airfryer temperatur umrechnen',
    'heissluftfritteuse zeit',
    'ofen in airfryer',
    'airfryer umrechner',
    'backofen airfryer tabelle',
  ],
  formula:
    'Temperatur Airfryer = Ofen-Temp − Abzug °C; Zeit Airfryer = Ofen-Zeit × (1 − Zeitkürzung %)',
  inputs: [
    { type: 'number', id: 'ofen_temp', label: 'Ofen-Temperatur (Rezept)', unit: '°C', default: 200, min: 50, max: 250, step: 5 },
    { type: 'number', id: 'ofen_zeit', label: 'Ofen-Zeit (Rezept)', unit: 'min', default: 25, min: 1, step: 1 },
    { type: 'number', id: 'temp_abzug', label: 'Temperatur-Abzug', unit: '°C', default: 20, min: 0, max: 40, step: 5, help: 'Faustregel: 20 °C weniger als im Ofen.' },
    { type: 'number', id: 'zeit_kuerzung', label: 'Zeit-Kürzung', unit: '%', default: 20, min: 0, max: 40, step: 5, help: 'Faustregel: Garzeit um etwa 20 % verkürzen.' },
  ],
  compute: (v) => {
    const ofenTemp = num(v.ofen_temp, 200);
    const ofenZeit = num(v.ofen_zeit, 1);
    const abzug = num(v.temp_abzug, 20);
    const kuerzung = Math.min(40, Math.max(0, num(v.zeit_kuerzung, 20)));
    const airTemp = ofenTemp - abzug;
    const airZeit = ofenZeit * (1 - kuerzung / 100);
    return [
      { label: 'Temperatur Airfryer', value: airTemp, unit: '°C', digits: 0, primary: true },
      { label: 'Zeit Airfryer', value: airZeit, unit: 'min', digits: 0, help: 'Ab Hälfte der Zeit einmal wenden/schütteln.' },
      { label: 'Eingestellte Ofen-Temperatur', value: ofenTemp, unit: '°C', digits: 0 },
      { label: 'Eingestellte Ofen-Zeit', value: ofenZeit, unit: 'min', digits: 0 },
    ];
  },
  intro:
    'Die Heißluftfritteuse ist im Grunde ein kleiner, sehr leistungsfähiger Umluftofen. Weil die heiße Luft im kleinen Garraum schnell und konzentriert zirkuliert, garen Speisen schneller. Als Orientierung (Stand 2026) reduziert man die Backofen-Temperatur um etwa 20 °C und die Garzeit um rund 20 %. Behalte das Gericht im Blick, da Modelle stark variieren.',
  howto: [
    'Trage Temperatur und Zeit aus dem Backofen-Rezept ein.',
    'Übernimm die Faustregel-Abzüge oder passe sie an dein Gerät an.',
    'Lies die empfohlene Airfryer-Einstellung ab.',
    'Kontrolliere das Gericht früher als angegeben und wende es bei Bedarf.',
  ],
  faq: [
    { q: 'Warum gart die Heißluftfritteuse schneller?', a: 'Der kleine Garraum und die starke Luftzirkulation übertragen die Hitze sehr effizient. Deshalb genügen niedrigere Temperaturen und kürzere Zeiten als im großen Backofen.' },
    { q: 'Gilt die Umrechnung für alle Gerichte?', a: 'Es ist eine Orientierung. Pommes, Gemüse und Fleischstücke funktionieren gut. Empfindliche oder flüssige Teige brauchen mehr Aufmerksamkeit – kontrolliere das Ergebnis.' },
    { q: 'Muss ich umrühren oder wenden?', a: 'Ja, für ein gleichmäßiges Ergebnis solltest du den Korb etwa zur Halbzeit schütteln oder das Gargut wenden.' },
  ],
  related: ['backofen-umluft-umrechner', 'fahrenheit-celsius-rechner', 'kochzeit-ei-rechner'],
  updated: '2026-06-19',
  examples: [
    {
      values: { ofen_temp: 200, ofen_zeit: 25, temp_abzug: 20, zeit_kuerzung: 20 },
      expect: [
        { label: 'Temperatur Airfryer', value: 180, tolerance: 0.5 },
        { label: 'Zeit Airfryer', value: 20, tolerance: 0.5 },
      ],
    },
    {
      values: { ofen_temp: 220, ofen_zeit: 30, temp_abzug: 20, zeit_kuerzung: 20 },
      expect: [
        { label: 'Temperatur Airfryer', value: 200, tolerance: 0.5 },
        { label: 'Zeit Airfryer', value: 24, tolerance: 0.5 },
      ],
    },
  ],
};
