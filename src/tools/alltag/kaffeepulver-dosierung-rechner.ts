import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

/**
 * Kaffee-Dosierung nach dem Goldenen Verhältnis (SCA).
 * Empfehlung: ca. 55–65 g gemahlener Kaffee pro Liter Wasser.
 * Nutzer wählt Stärke; Wassermenge ergibt sich aus Tassenanzahl × Tassengröße.
 */
// Gramm Kaffee pro Liter Wasser je Stärke
const GRAMM_PRO_LITER: Record<string, number> = {
  mild: 50,
  mittel: 60,
  stark: 70,
};

export const tool: Tool = {
  slug: 'kaffeepulver-dosierung-rechner',
  category: 'alltag',
  title: 'Kaffeepulver-Dosierung berechnen',
  shortTitle: 'Kaffee dosieren',
  description:
    'Berechne die ideale Menge Kaffeepulver für deine Tassenzahl nach dem goldenen Verhältnis – wähle Tassengröße und gewünschte Stärke.',
  keywords: [
    'kaffeepulver dosierung',
    'wie viel kaffeepulver pro tasse',
    'kaffee dosieren',
    'kaffee menge berechnen',
    'gramm kaffee pro liter',
    'kaffeepulver rechner',
  ],
  formula:
    'Wasser(l) = Tassen × Tassengröße(ml) / 1000; Kaffee(g) = Wasser(l) × Gramm-pro-Liter der Stärke',
  inputs: [
    {
      type: 'number',
      id: 'tassen',
      label: 'Anzahl Tassen',
      unit: 'Tassen',
      default: 4,
      min: 1,
      max: 30,
      step: 1,
    },
    {
      type: 'number',
      id: 'tassengroesse',
      label: 'Tassengröße',
      unit: 'ml',
      default: 125,
      min: 50,
      max: 400,
      step: 5,
      help: 'Eine Kaffeetasse hat klassisch 125 ml, ein großer Becher 200–250 ml.',
    },
    {
      type: 'select',
      id: 'staerke',
      label: 'Stärke',
      default: 'mittel',
      options: [
        { value: 'mild', label: 'mild (50 g/l)' },
        { value: 'mittel', label: 'mittel (60 g/l)' },
        { value: 'stark', label: 'stark (70 g/l)' },
      ],
    },
  ],
  compute: (v) => {
    const tassen = Math.max(0, num(v.tassen, 0));
    const tassengroesse = Math.max(0, num(v.tassengroesse, 125));
    const staerke = String(v.staerke || 'mittel');
    const gpl = GRAMM_PRO_LITER[staerke] ?? GRAMM_PRO_LITER.mittel;
    const wasserMl = tassen * tassengroesse;
    const wasserL = wasserMl / 1000;
    const kaffeeG = wasserL * gpl;
    const proTasse = tassen > 0 ? kaffeeG / tassen : 0;
    return [
      { label: 'Kaffeepulver gesamt', value: kaffeeG, unit: 'g', digits: 1, primary: true },
      { label: 'Pro Tasse', value: proTasse, unit: 'g', digits: 1, help: 'Ein gehäufter Esslöffel sind etwa 7–8 g.' },
      { label: 'Wassermenge', value: wasserMl, unit: 'ml', digits: 0 },
    ];
  },
  intro:
    'Guter Filterkaffee gelingt mit dem "goldenen Verhältnis": rund 60 g gemahlener Kaffee pro Liter Wasser (SCA-Empfehlung). Dieser Rechner ermittelt aus Tassenzahl und Tassengröße die passende Kaffeemenge in Gramm. Wer es milder oder stärker mag, passt die Stärke an. Zum Abmessen: ein gehäufter Esslöffel fasst etwa 7–8 g.',
  howto: [
    'Gib an, wie viele Tassen du aufbrühen willst.',
    'Trage die Tassengröße ein (Standardtasse 125 ml, Becher 200–250 ml).',
    'Wähle die gewünschte Stärke.',
    'Lies die Gesamtmenge Kaffeepulver und die Menge pro Tasse ab.',
  ],
  faq: [
    { q: 'Wie viel Kaffee pro Tasse?', a: 'Bei mittlerer Stärke und einer 125-ml-Tasse sind es etwa 7,5 g, also ungefähr ein gehäufter Esslöffel.' },
    { q: 'Was ist das goldene Verhältnis?', a: 'Eine Empfehlung der Specialty Coffee Association: rund 55–65 g Kaffee pro Liter Wasser. Dieser Rechner nutzt 60 g/l als mittlere Stärke.' },
    { q: 'Gilt das auch für Vollautomaten?', a: 'Vollautomaten dosieren selbst, hier ist der Rechner vor allem für Filtermaschinen, French Press und Handfilter gedacht.' },
    { q: 'Wie viel ist ein Esslöffel Kaffee?', a: 'Ein gehäufter Esslöffel gemahlener Kaffee wiegt rund 7–8 g, ein gestrichener etwa 5 g.' },
  ],
  related: ['cup-in-gramm-rechner', 'rezept-portionen-rechner', 'getraenke-pro-gast-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { tassen: 4, tassengroesse: 125, staerke: 'mittel' },
      // Wasser = 4*125 = 500 ml = 0.5 l; Kaffee = 0.5*60 = 30 g; proTasse = 30/4 = 7.5
      expect: [
        { label: 'Kaffeepulver gesamt', value: 30, tolerance: 0.1 },
        { label: 'Pro Tasse', value: 7.5, tolerance: 0.05 },
        { label: 'Wassermenge', value: 500, tolerance: 0.5 },
      ],
    },
    {
      values: { tassen: 8, tassengroesse: 200, staerke: 'stark' },
      // Wasser = 8*200 = 1600 ml = 1.6 l; Kaffee = 1.6*70 = 112 g
      expect: [{ label: 'Kaffeepulver gesamt', value: 112, tolerance: 0.1 }],
    },
  ],
};
