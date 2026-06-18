import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'co2-ausstoss-energie-rechner',
  category: 'energie',
  title: 'CO2-Ausstoß-Rechner für Energie',
  shortTitle: 'CO2 Energie',
  description:
    'Berechne den CO2-Ausstoß deines Energieverbrauchs aus Jahresverbrauch in kWh und dem Emissionsfaktor des Energieträgers - pro Jahr und Monat.',
  keywords: [
    'co2 rechner energie',
    'co2 ausstoss strom',
    'co2 emissionen heizung',
    'co2 pro kwh',
    'emissionsfaktor strom gas',
    'co2 fußabdruck energie',
    'co2 verbrauch berechnen',
  ],
  intro:
    'Dieser Rechner schätzt, wie viel Kohlendioxid dein Energieverbrauch verursacht. Jeder Energieträger hat einen Emissionsfaktor in Gramm CO2 pro Kilowattstunde - Erdgas etwa 200 g, Heizöl rund 270 g, der deutsche Strommix grob 380 g. Multipliziert mit deinem Jahresverbrauch ergibt sich der CO2-Ausstoß.',
  formula: 'CO2 = Verbrauch (kWh) × Emissionsfaktor (g/kWh) ÷ 1000 (kg)',
  inputs: [
    { type: 'number', id: 'verbrauch', label: 'Jahresverbrauch', unit: 'kWh', default: 12000, min: 0, step: 100 },
    {
      type: 'select', id: 'traeger', label: 'Energieträger', default: 'gas',
      help: 'Wählt den passenden Emissionsfaktor. Eigenen Wert über die Option "Eigener Faktor".',
      options: [
        { value: 'gas', label: 'Erdgas (~200 g/kWh)' },
        { value: 'heizoel', label: 'Heizöl (~270 g/kWh)' },
        { value: 'strommix', label: 'Strommix Deutschland (~380 g/kWh)' },
        { value: 'oekostrom', label: 'Ökostrom (~40 g/kWh)' },
        { value: 'fernwaerme', label: 'Fernwärme (~150 g/kWh)' },
        { value: 'eigen', label: 'Eigener Faktor' },
      ],
    },
    { type: 'number', id: 'eigenfaktor', label: 'Eigener Emissionsfaktor', unit: 'g/kWh', default: 200, min: 0, step: 5, help: 'Nur wirksam, wenn oben "Eigener Faktor" gewählt ist.' },
  ],
  compute: (v) => {
    const verbrauch = num(v.verbrauch);
    const faktoren: Record<string, number> = {
      gas: 200,
      heizoel: 270,
      strommix: 380,
      oekostrom: 40,
      fernwaerme: 150,
    };
    const traeger = String(v.traeger);
    const faktor = traeger === 'eigen' ? num(v.eigenfaktor) : (faktoren[traeger] ?? 200);
    const kgJahr = (verbrauch * faktor) / 1000;
    return [
      { label: 'CO2-Ausstoß pro Jahr', value: kgJahr, unit: 'kg', digits: 1, primary: true },
      { label: 'CO2-Ausstoß pro Monat', value: kgJahr / 12, unit: 'kg', digits: 1 },
      { label: 'CO2-Ausstoß in Tonnen', value: kgJahr / 1000, unit: 't/Jahr', digits: 3 },
      { label: 'Verwendeter Emissionsfaktor', value: faktor, unit: 'g/kWh', digits: 0 },
    ];
  },
  howto: [
    'Jahresverbrauch des Energieträgers in kWh eintragen.',
    'Passenden Energieträger auswählen oder "Eigener Faktor" wählen.',
    'Bei eigenem Faktor den Wert in g/kWh eingeben (z. B. vom Versorger).',
    'CO2-Ausstoß pro Jahr, Monat und in Tonnen ablesen.',
  ],
  faq: [
    { q: 'Wie hoch ist der CO2-Faktor von Strom?', a: 'Der deutsche Strommix liegt grob bei 380 g CO2 je kWh und sinkt mit steigendem Ökostromanteil. Reiner Ökostrom wird oft mit rund 40 g/kWh über die Vorkette angesetzt.' },
    { q: 'Welche Faktoren haben Gas und Öl?', a: 'Erdgas verursacht rund 200 g CO2 je kWh, Heizöl etwa 270 g. Damit ist Öl beim Heizen klimaschädlicher als Gas, das fossile Heizen insgesamt schädlicher als eine effiziente Wärmepumpe mit Ökostrom.' },
    { q: 'Sind die Werte exakt?', a: 'Nein, es sind gerundete Durchschnittswerte. Reale Faktoren hängen von Strommix, Förderkette und Wirkungsgraden ab und ändern sich jährlich - für eine genaue Bilanz den Wert deines Versorgers nutzen.' },
    { q: 'Was bedeutet eine Tonne CO2?', a: 'Eine Tonne CO2 entspricht grob 5.000-6.000 km mit einem durchschnittlichen Benziner. Eine vierköpfige Familie verursacht durch Wohnen leicht mehrere Tonnen pro Jahr.' },
  ],
  related: ['gaskosten-rechner', 'heizoel-kosten-rechner', 'stromkosten-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { verbrauch: 12000, traeger: 'gas', eigenfaktor: 200 },
      expect: [
        { label: 'CO2-Ausstoß pro Jahr', value: 2400, tolerance: 0.1 },
        { label: 'Verwendeter Emissionsfaktor', value: 200, tolerance: 0.01 },
      ],
    },
  ],
};
