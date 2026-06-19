import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'pv-dachflaeche-kwp-rechner',
  category: 'energie',
  title: 'kWp aus Dachfläche berechnen',
  shortTitle: 'kWp aus Dach',
  description:
    'Berechne, wie viel kWp Photovoltaik auf deine Dachfläche passt - aus nutzbarer Fläche, Modulwirkungsgrad und Belegungsfaktor inklusive Modulzahl und Jahresertrag.',
  keywords: [
    'kwp dachfläche berechnen',
    'wie viel kwp passt aufs dach',
    'pv leistung dachfläche',
    'photovoltaik dachfläche rechner',
    'kwp pro quadratmeter',
    'solar dachfläche berechnen',
  ],
  intro:
    'Wie viel Photovoltaik-Leistung passt auf dein Dach? Diese Schätzung rechnet die nutzbare Dachfläche über den Modulwirkungsgrad in installierbare kWp um. Faustregel 2026: moderne Module liefern rund 200-220 Watt je Quadratmeter Modulfläche (etwa 1 kWp je 5 m²). Der Belegungsfaktor berücksichtigt, dass Randabstände, Dachfenster und Verschattung nicht die gesamte Fläche nutzbar machen.',
  formula: 'kWp = Dachfläche × Belegungsfaktor × Modulwirkungsgrad × 1 kW/m² (STC)',
  inputs: [
    { type: 'number', id: 'flaeche', label: 'Dachfläche (eine Dachseite)', unit: 'm²', default: 50, min: 0, step: 1, help: 'Bruttofläche der für Module geeigneten Dachseite.' },
    { type: 'number', id: 'belegung', label: 'Belegungsfaktor', unit: '%', default: 80, min: 1, max: 100, step: 5, help: 'Anteil tatsächlich belegbar - Randabstände, Fenster, Kamine abziehen. Typisch 75-85 %.' },
    { type: 'number', id: 'wirkungsgrad', label: 'Modulwirkungsgrad', unit: '%', default: 21, min: 5, max: 30, step: 0.5, help: 'Moderne Module ~20-22 %. Entspricht der Leistung je m² bei 1000 W/m² Einstrahlung.' },
    { type: 'number', id: 'spezertrag', label: 'Spezifischer Ertrag', unit: 'kWh/kWp', default: 950, min: 0, step: 10, help: 'Für die Ertragsschätzung. Deutschland ~850-1.050.' },
  ],
  compute: (v) => {
    const flaeche = num(v.flaeche);
    const belegung = num(v.belegung) / 100;
    const wg = num(v.wirkungsgrad) / 100;
    const spez = num(v.spezertrag);
    const nutzflaeche = flaeche * belegung;
    // Leistung je m² Modulfläche bei 1000 W/m² Standardeinstrahlung = Wirkungsgrad × 1 kW/m²
    const kwp = nutzflaeche * wg;
    // Modulzahl: typisches Modul ~1,8 m², ~0,44 kWp -> hier über Fläche/1,8
    const module = Math.floor(nutzflaeche / 1.8);
    const ertrag = kwp * spez;
    return [
      { label: 'Mögliche Anlagenleistung', value: kwp, unit: 'kWp', digits: 2, primary: true },
      { label: 'Nutzbare Modulfläche', value: nutzflaeche, unit: 'm²', digits: 1 },
      { label: 'Ungefähre Modulzahl', value: module, unit: 'Module', digits: 0 },
      { label: 'Geschätzter Jahresertrag', value: ertrag, unit: 'kWh', digits: 0 },
    ];
  },
  howto: [
    'Bruttofläche der geeigneten Dachseite in m² eintragen.',
    'Belegungsfaktor wählen - meist 75-85 %, da Ränder und Aufbauten frei bleiben.',
    'Modulwirkungsgrad angeben (moderne Module ~20-22 %).',
    'Spezifischen Ertrag für die Ertragsschätzung wählen.',
    'Mögliche Anlagenleistung in kWp und den geschätzten Jahresertrag ablesen.',
  ],
  faq: [
    { q: 'Wie viel kWp passen auf 1 m² Dach?', a: 'Mit modernen Modulen (~21 % Wirkungsgrad) sind es etwa 0,21 kWp je Quadratmeter Modulfläche - rund 1 kWp je 5 m². Über Randabstände und Aufbauten reduziert der Belegungsfaktor die nutzbare Fläche.' },
    { q: 'Warum nicht die ganze Dachfläche?', a: 'Brandschutz- und Randabstände, Dachfenster, Schornsteine, Gauben und verschattete Bereiche bleiben frei. Realistisch lassen sich oft nur 75-85 Prozent einer Dachseite belegen.' },
    { q: 'Wie viele Module sind das?', a: 'Ein typisches Modul ist rund 1,7-1,8 m² groß und leistet etwa 400-450 Wp. Der Rechner schätzt die Modulzahl über die nutzbare Fläche - die genaue Zahl hängt vom konkreten Modul und der Verlegung ab.' },
    { q: 'Ist die Ausrichtung berücksichtigt?', a: 'Indirekt über den spezifischen Ertrag: Ein Süddach erreicht höhere Werte als Ost-West. Die kWp-Berechnung selbst ist von der Ausrichtung unabhängig - sie hängt nur an Fläche und Wirkungsgrad. Stand 2026, Schätzung.' },
  ],
  related: ['pv-ertrag-rechner', 'pv-autarkiegrad-rechner', 'pv-speicher-dimensionierung-rechner', 'balkonkraftwerk-rechner'],
  updated: '2026-06-19',
  examples: [
    {
      values: { flaeche: 50, belegung: 80, wirkungsgrad: 21, spezertrag: 950 },
      expect: [
        { label: 'Nutzbare Modulfläche', value: 40, tolerance: 0 },
        { label: 'Mögliche Anlagenleistung', value: 8.4, tolerance: 0.01 },
        { label: 'Geschätzter Jahresertrag', value: 7980, tolerance: 0.5 },
      ],
    },
  ],
};
