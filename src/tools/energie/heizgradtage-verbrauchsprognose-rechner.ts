import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'heizgradtage-verbrauchsprognose-rechner',
  category: 'energie',
  title: 'Heizgradtage-Verbrauchsprognose',
  shortTitle: 'Heizgradtage',
  description:
    'Rechne deinen Heizverbrauch witterungsbereinigt um: Prognose für ein anderes Jahr oder einen anderen Standort über das Verhältnis der Heizgradtage.',
  keywords: [
    'heizgradtage rechner',
    'gradtagzahl berechnen',
    'witterungsbereinigung heizung',
    'heizverbrauch prognose',
    'verbrauch hochrechnen heizung',
    'gradtagszahl verbrauch',
  ],
  intro:
    'Der Heizverbrauch schwankt mit dem Wetter. Heizgradtage (auch Gradtagzahl) machen Jahre vergleichbar: Je kälter und länger die Heizperiode, desto höher der Wert. Dieser Rechner skaliert einen bekannten Verbrauch über das Verhältnis der Heizgradtage auf ein anderes Jahr oder einen anderen Standort. Typische Jahreswerte in Deutschland liegen bei rund 3.000-4.000 Heizgradtagen (Heizgrenze 15 °C, Raumtemperatur 20 °C). Stand 2026, Näherung.',
  formula: 'prognostizierter Verbrauch = Referenzverbrauch × (HGT Prognose ÷ HGT Referenz)',
  inputs: [
    { type: 'number', id: 'verbrauch', label: 'Bekannter Heizverbrauch', unit: 'kWh', default: 18000, min: 0, step: 100, help: 'Verbrauch des Referenzzeitraums (z. B. Vorjahr).' },
    { type: 'number', id: 'hgtRef', label: 'Heizgradtage Referenz', unit: 'Kd', default: 3500, min: 1, step: 50, help: 'Gradtagzahl des bekannten Zeitraums (Kelvin-Tage).' },
    { type: 'number', id: 'hgtProg', label: 'Heizgradtage Prognose', unit: 'Kd', default: 3800, min: 0, step: 50, help: 'Gradtagzahl des Zielzeitraums oder -standorts.' },
    { type: 'number', id: 'preis', label: 'Energiepreis (optional)', unit: 'ct/kWh', default: 12, min: 0, step: 0.5, help: 'Für die Kostenschätzung. 0 lassen, wenn nicht benötigt.' },
  ],
  compute: (v) => {
    const verbrauch = num(v.verbrauch);
    const hgtRef = num(v.hgtRef);
    const hgtProg = num(v.hgtProg);
    const preis = num(v.preis) / 100;
    const faktor = hgtRef > 0 ? hgtProg / hgtRef : 0;
    const prognose = verbrauch * faktor;
    const differenz = prognose - verbrauch;
    const kosten = prognose * preis;
    return [
      { label: 'Prognostizierter Verbrauch', value: prognose, unit: 'kWh', digits: 0, primary: true },
      { label: 'Witterungsfaktor', value: faktor, unit: '', digits: 3 },
      { label: 'Veränderung gegenüber Referenz', value: differenz, unit: 'kWh', digits: 0 },
      { label: 'Geschätzte Energiekosten', value: kosten, unit: '€', digits: 2 },
    ];
  },
  howto: [
    'Bekannten Heizverbrauch des Referenzzeitraums in kWh eintragen.',
    'Heizgradtage (Gradtagzahl) des Referenzzeitraums angeben.',
    'Heizgradtage des Zielzeitraums oder Zielstandorts eingeben.',
    'Optional einen Energiepreis ergänzen.',
    'Den witterungsbereinigt hochgerechneten Verbrauch und die Kosten ablesen.',
  ],
  faq: [
    { q: 'Was sind Heizgradtage?', a: 'Heizgradtage (Gradtagzahl) summieren über die Heizperiode die täglichen Temperaturdifferenzen zwischen einer angenommenen Raumtemperatur (oft 20 °C) und der mittleren Außentemperatur, gezählt nur an Tagen unterhalb der Heizgrenze (häufig 15 °C). Die Einheit ist Kelvin-Tage (Kd).' },
    { q: 'Wozu dient die Witterungsbereinigung?', a: 'Sie macht Verbräuche verschiedener Jahre vergleichbar. Ein kalter Winter treibt den Verbrauch hoch, ohne dass sich am Gebäude etwas geändert hat. Über das Verhältnis der Heizgradtage rechnet man den Wettereinfluss heraus.' },
    { q: 'Wie genau ist die Hochrechnung?', a: 'Die Methode unterstellt, dass der Heizverbrauch annähernd proportional zu den Heizgradtagen ist. Warmwasser, Lüftungsverluste und Nutzerverhalten verzerren das leicht - die Prognose ist eine gute Näherung, kein exakter Wert (Stand 2026).' },
    { q: 'Woher bekomme ich die Heizgradtage?', a: 'Gradtagzahlen für deutsche Standorte und Jahre veröffentlichen Wetterdienste und Energieversorger (z. B. nach VDI 3807). Suche nach "Gradtagzahl" plus deiner Region und dem Jahr.' },
  ],
  related: ['heizwaermebedarf-rechner', 'heizkosten-rechner', 'gaskosten-rechner', 'heizoel-kosten-rechner'],
  updated: '2026-06-19',
  examples: [
    {
      values: { verbrauch: 18000, hgtRef: 3500, hgtProg: 3800, preis: 12 },
      expect: [
        { label: 'Prognostizierter Verbrauch', value: 19542.857, tolerance: 1 },
        { label: 'Witterungsfaktor', value: 1.086, tolerance: 0.001 },
        { label: 'Geschätzte Energiekosten', value: 2345.14, tolerance: 0.5 },
      ],
    },
  ],
};
