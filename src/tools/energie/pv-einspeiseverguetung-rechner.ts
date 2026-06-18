import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'pv-einspeiseverguetung-rechner',
  category: 'energie',
  title: 'PV-Einspeisevergütung-Rechner',
  shortTitle: 'Einspeisevergütung',
  description:
    'Berechne die jährliche Einspeisevergütung deiner Photovoltaikanlage aus eingespeister Strommenge und Vergütungssatz in Cent pro kWh.',
  keywords: [
    'einspeisevergütung rechner',
    'pv einspeisung berechnen',
    'einspeisevergütung pro kwh',
    'solar einspeisung vergütung',
    'photovoltaik einspeisung rechner',
  ],
  intro:
    'Wer überschüssigen Solarstrom ins Netz einspeist, erhält dafür eine Einspeisevergütung. Dieser Rechner ermittelt aus der ins Netz eingespeisten Strommenge und dem Vergütungssatz die jährlichen Einnahmen. Der konkrete Satz richtet sich nach Anlagengröße und Inbetriebnahmedatum - bitte aktuellen Wert eintragen.',
  formula: 'Vergütung/Jahr = eingespeiste kWh × Vergütungssatz (ct) ÷ 100',
  inputs: [
    { type: 'number', id: 'erzeugung', label: 'Jahreserzeugung', unit: 'kWh', default: 8000, min: 0, step: 100, help: 'Gesamter von der Anlage erzeugter Strom pro Jahr.' },
    { type: 'number', id: 'eigenverbrauch', label: 'Eigenverbrauchsanteil', unit: '%', default: 30, min: 0, max: 100, step: 5, help: 'Anteil, der selbst genutzt statt eingespeist wird.' },
    { type: 'number', id: 'satz', label: 'Vergütungssatz', unit: 'ct/kWh', default: 7.94, min: 0, step: 0.01, help: 'Aktuellen EEG-Satz für dein Inbetriebnahmedatum eintragen.' },
  ],
  compute: (v) => {
    const erzeugung = num(v.erzeugung);
    const eigen = num(v.eigenverbrauch) / 100;
    const satz = num(v.satz) / 100;
    const eingespeist = erzeugung * (1 - eigen);
    const verguetung = eingespeist * satz;
    return [
      { label: 'Einspeisevergütung pro Jahr', value: verguetung, unit: '€', digits: 2, primary: true },
      { label: 'Eingespeiste Strommenge', value: eingespeist, unit: 'kWh', digits: 0 },
      { label: 'Vergütung pro Monat', value: verguetung / 12, unit: '€', digits: 2 },
    ];
  },
  howto: [
    'Jahreserzeugung der PV-Anlage in kWh eintragen.',
    'Eigenverbrauchsanteil schätzen - der Rest wird eingespeist.',
    'Aktuellen Vergütungssatz in Cent pro kWh angeben.',
    'Jährliche Einspeisevergütung ablesen.',
  ],
  faq: [
    { q: 'Wie hoch ist die Einspeisevergütung?', a: 'Der Satz hängt von Anlagengröße und Inbetriebnahmedatum ab und wird regelmäßig angepasst. Den für deine Anlage geltenden Wert findest du im EEG bzw. auf der Seite der Bundesnetzagentur - trage ihn hier ein.' },
    { q: 'Lohnt sich Eigenverbrauch oder Einspeisung mehr?', a: 'Eigenverbrauch spart den vollen Strompreis (oft 30-40 ct/kWh) und ist meist deutlich lukrativer als die niedrigere Einspeisevergütung. Daher lohnt sich ein hoher Eigenverbrauch.' },
  ],
  related: ['pv-ertrag-rechner', 'balkonkraftwerk-rechner', 'stromkosten-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { erzeugung: 8000, eigenverbrauch: 30, satz: 7.94 },
      expect: [
        { label: 'Eingespeiste Strommenge', value: 5600, tolerance: 0.5 },
        { label: 'Einspeisevergütung pro Jahr', value: 444.64, tolerance: 0.05 },
      ],
    },
  ],
};
