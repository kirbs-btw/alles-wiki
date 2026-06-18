import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'ps-kw-umrechner',
  category: 'auto',
  title: 'PS-kW-Umrechner (Motorleistung)',
  shortTitle: 'PS ⇄ kW',
  description:
    'Rechne Motorleistung zwischen PS und kW um und berechne das Leistungsgewicht in PS pro Tonne – mit exaktem Umrechnungsfaktor 1 PS = 0,7355 kW.',
  keywords: [
    'ps in kw umrechnen',
    'kw in ps rechner',
    'motorleistung umrechnen',
    'ps kw tabelle',
    'leistungsgewicht berechnen',
    'pferdestärke kilowatt',
    'ps pro tonne',
  ],
  formula: '1 PS = 0,73549875 kW; kW = PS × 0,73549875; PS = kW / 0,73549875',
  inputs: [
    {
      type: 'select', id: 'richtung', label: 'Umrechnungsrichtung', default: 'ps_kw',
      options: [
        { value: 'ps_kw', label: 'PS → kW' },
        { value: 'kw_ps', label: 'kW → PS' },
      ],
    },
    { type: 'number', id: 'leistung', label: 'Leistung', default: 150, min: 0, step: 1, help: 'Wert in PS oder kW je nach Richtung.' },
    { type: 'number', id: 'gewicht', label: 'Fahrzeuggewicht (optional)', unit: 'kg', default: 1400, min: 0, step: 10, help: 'Für das Leistungsgewicht.' },
  ],
  compute: (v) => {
    const richtung = String(v.richtung || 'ps_kw');
    const leistung = num(v.leistung);
    const gewicht = num(v.gewicht);
    const FAKTOR = 0.73549875; // 1 PS in kW
    let ps: number;
    let kw: number;
    if (richtung === 'kw_ps') {
      kw = leistung;
      ps = leistung / FAKTOR;
    } else {
      ps = leistung;
      kw = leistung * FAKTOR;
    }
    const tonnen = gewicht / 1000;
    const leistungsgewicht = tonnen > 0 ? ps / tonnen : 0;
    return [
      { label: 'Leistung in kW', value: kw, unit: 'kW', digits: 1, primary: richtung === 'ps_kw' },
      { label: 'Leistung in PS', value: ps, unit: 'PS', digits: 1, primary: richtung === 'kw_ps' },
      { label: 'Leistungsgewicht', value: leistungsgewicht, unit: 'PS/t', digits: 1, help: 'Je höher, desto sportlicher die Beschleunigung.' },
    ];
  },
  intro:
    'In Fahrzeugpapieren steht die Motorleistung in Kilowatt (kW), umgangssprachlich nennen wir sie meist in PS. Der exakte Faktor lautet 1 PS = 0,73549875 kW. Das Leistungsgewicht (PS pro Tonne) verrät zusätzlich, wie spritzig ein Auto im Verhältnis zu seinem Gewicht beschleunigt.',
  howto: [
    'Umrechnungsrichtung wählen: PS → kW oder kW → PS.',
    'Leistungswert eintragen.',
    'Optional das Fahrzeuggewicht angeben, um das Leistungsgewicht zu sehen.',
    'Ergebnis in kW und PS sowie als PS/t ablesen.',
  ],
  faq: [
    { q: 'Wie rechne ich PS in kW um?', a: 'Multipliziere die PS mit 0,7355. Beispiel: 150 PS × 0,7355 = rund 110 kW.' },
    { q: 'Wie rechne ich kW in PS um?', a: 'Teile die kW durch 0,7355. Beispiel: 100 kW / 0,7355 = rund 136 PS.' },
    { q: 'Warum steht im Schein kW statt PS?', a: 'Kilowatt ist die gesetzliche SI-Einheit für Leistung. PS ist eine alte Einheit, die nur noch ergänzend genutzt wird.' },
    { q: 'Was sagt das Leistungsgewicht aus?', a: 'Es setzt Leistung und Gewicht ins Verhältnis. Ein hoher Wert (viele PS pro Tonne) bedeutet meist bessere Beschleunigung.' },
  ],
  related: ['durchschnittsverbrauch-rechner', 'kosten-pro-km-rechner', 'reichweite-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { richtung: 'ps_kw', leistung: 150, gewicht: 1400 },
      expect: [{ label: 'Leistung in kW', value: 110.3, tolerance: 0.2 }],
    },
    {
      values: { richtung: 'kw_ps', leistung: 100, gewicht: 1400 },
      expect: [{ label: 'Leistung in PS', value: 135.96, tolerance: 0.2 }],
    },
  ],
};
