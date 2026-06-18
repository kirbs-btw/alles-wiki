import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'pv-ertrag-rechner',
  category: 'energie',
  title: 'PV-Ertrag-Rechner (Photovoltaik)',
  shortTitle: 'PV-Ertrag',
  description:
    'Schätze den Jahresertrag deiner Photovoltaik-Anlage aus Leistung in kWp und spezifischem Ertrag - mit Ersparnis und Einspeisevergütung.',
  keywords: [
    'pv ertrag rechner',
    'photovoltaik ertrag',
    'solar ertrag berechnen',
    'kwp ertrag',
    'pv anlage ertrag schätzen',
    'solarertrag rechner',
    'photovoltaik ersparnis',
  ],
  intro:
    'Mit diesem Rechner schätzt du den Jahresertrag und den finanziellen Nutzen einer Photovoltaik-Anlage. Der spezifische Ertrag (kWh pro kWp und Jahr) liegt in Deutschland je nach Standort und Ausrichtung bei etwa 850 bis 1.050. Der Rechner teilt den Strom in selbst genutzten und eingespeisten Anteil und bewertet beides.',
  formula: 'Ertrag = Leistung (kWp) × spez. Ertrag; Nutzen = Eigenverbrauch × Strompreis + Einspeisung × Vergütung',
  inputs: [
    { type: 'number', id: 'kwp', label: 'Anlagenleistung', unit: 'kWp', default: 8, min: 0, step: 0.5, help: 'Modulleistung der Anlage. Einfamilienhaus oft 6-12 kWp.' },
    { type: 'number', id: 'spezertrag', label: 'Spezifischer Ertrag', unit: 'kWh/kWp', default: 950, min: 0, step: 10, help: 'Süddeutschland ~1.050, Norden ~850, Süddach optimal.' },
    { type: 'number', id: 'eigenanteil', label: 'Eigenverbrauchsanteil', unit: '%', default: 30, min: 0, max: 100, step: 5, help: 'Ohne Speicher ~30 %, mit Speicher 50-70 %.' },
    { type: 'number', id: 'strompreis', label: 'Strompreis (Bezug)', unit: 'ct/kWh', default: 35, min: 0, step: 1, help: 'Was du sonst für Netzstrom zahlst.' },
    { type: 'number', id: 'verguetung', label: 'Einspeisevergütung', unit: 'ct/kWh', default: 8, min: 0, step: 0.1, help: 'Stand 2026 ca. 8 ct/kWh für kleine Anlagen - eigenen Satz prüfen.' },
  ],
  compute: (v) => {
    const kwp = num(v.kwp);
    const spez = num(v.spezertrag);
    const eigenanteil = num(v.eigenanteil) / 100;
    const strompreis = num(v.strompreis) / 100;
    const verguetung = num(v.verguetung) / 100;
    const ertrag = kwp * spez;
    const eigenKwh = ertrag * eigenanteil;
    const einspeisKwh = ertrag - eigenKwh;
    const ersparnis = eigenKwh * strompreis;
    const einnahmen = einspeisKwh * verguetung;
    const nutzen = ersparnis + einnahmen;
    return [
      { label: 'Finanzieller Nutzen pro Jahr', value: nutzen, unit: '€', digits: 2, primary: true },
      { label: 'Jahresertrag', value: ertrag, unit: 'kWh', digits: 0 },
      { label: 'Eingesparte Stromkosten', value: ersparnis, unit: '€', digits: 2 },
      { label: 'Einspeisevergütung pro Jahr', value: einnahmen, unit: '€', digits: 2 },
    ];
  },
  howto: [
    'Anlagenleistung in kWp eingeben (Summe der Modulleistung).',
    'Spezifischen Jahresertrag passend zu Standort und Ausrichtung wählen.',
    'Eigenverbrauchsanteil schätzen - mit Batteriespeicher deutlich höher.',
    'Strompreis und Einspeisevergütung eintragen und den jährlichen Nutzen ablesen.',
  ],
  faq: [
    { q: 'Wie viel kWh liefert 1 kWp pro Jahr?', a: 'In Deutschland je nach Standort und Ausrichtung rund 850-1.050 kWh pro kWp und Jahr. Ein optimal nach Süden geneigtes Dach erreicht die höheren Werte.' },
    { q: 'Warum ist Eigenverbrauch so wichtig?', a: 'Selbst genutzter Strom spart den teuren Netzbezug (oft 35 ct/kWh), eingespeister Strom bringt nur die niedrige Einspeisevergütung. Je höher der Eigenverbrauch, desto wirtschaftlicher die Anlage.' },
    { q: 'Wie hoch ist die Einspeisevergütung 2026?', a: 'Stand 2026 erhalten kleine Volleinspeise- oder Überschussanlagen grob im Bereich von 8 ct/kWh. Der genaue Satz hängt von Inbetriebnahme und Anlagentyp ab - prüfe deinen aktuellen Wert.' },
    { q: 'Ist das eine genaue Prognose?', a: 'Nein, es ist eine Schätzung. Verschattung, Modulneigung, Wechselrichterverluste und das Wetter eines Jahres verändern den realen Ertrag um mehrere Prozent.' },
  ],
  related: ['e-auto-ladekosten-rechner', 'stromkosten-rechner', 'kwh-kosten-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { kwp: 8, spezertrag: 950, eigenanteil: 30, strompreis: 35, verguetung: 8 },
      expect: [
        { label: 'Jahresertrag', value: 7600, tolerance: 0.5 },
        { label: 'Finanzieller Nutzen pro Jahr', value: 1223.6, tolerance: 0.05 },
      ],
    },
  ],
};
