import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

/**
 * Schätzung der Schrittlänge aus der Körpergröße.
 * Verbreitete Faustformeln:
 *  - Gehen:   Körpergröße × 0,415 (Frauen ähnlich 0,413, Männer 0,415; hier gemittelt)
 *  - Schritt zum Schrittzähler/Distanz: Körpergröße × 0,43 (gemischt)
 * Die Werte sind Näherungen; die tatsächliche Schrittlänge schwankt mit Tempo und Untergrund.
 */
const FAKTOR_GEHEN = 0.415;
const FAKTOR_LAUFEN = 0.45;

export const tool: Tool = {
  slug: 'schrittlaenge-rechner',
  category: 'alltag',
  title: 'Schrittlänge aus Körpergröße berechnen',
  shortTitle: 'Schrittlänge',
  description:
    'Schätze deine Schrittlänge aus der Körpergröße – als Näherung fürs Gehen und Laufen, ideal zum Kalibrieren von Schrittzähler oder Fitness-App.',
  keywords: [
    'schrittlaenge berechnen',
    'schrittlaenge koerpergroesse',
    'schrittlaenge schrittzaehler',
    'wie lang ist ein schritt',
    'schrittlaenge formel',
    'durchschnittliche schrittlaenge',
  ],
  formula:
    'Schrittlänge (Gehen) ≈ Körpergröße × 0,415; Schrittlänge (Laufen) ≈ Körpergröße × 0,45',
  inputs: [
    { type: 'number', id: 'groesse', label: 'Körpergröße', unit: 'cm', default: 175, min: 100, max: 230, step: 1 },
    {
      type: 'select',
      id: 'modus',
      label: 'Fortbewegung',
      default: 'gehen',
      options: [
        { value: 'gehen', label: 'Gehen (Faktor 0,415)' },
        { value: 'laufen', label: 'Laufen / Joggen (Faktor 0,45)' },
      ],
    },
  ],
  compute: (v) => {
    const groesse = num(v.groesse, 175);
    const modus = String(v.modus || 'gehen');
    const faktor = modus === 'laufen' ? FAKTOR_LAUFEN : FAKTOR_GEHEN;
    const schrittCm = groesse * faktor;
    const schritteProKm = schrittCm > 0 ? 100000 / schrittCm : 0;
    return [
      { label: 'Schrittlänge', value: schrittCm, unit: 'cm', digits: 1, primary: true },
      { label: 'Schrittlänge', value: schrittCm / 100, unit: 'm', digits: 2 },
      { label: 'Schritte pro Kilometer', value: schritteProKm, unit: 'Schritte', digits: 0 },
    ];
  },
  intro:
    'Die Schrittlänge hängt vor allem von der Körpergröße ab. Eine verbreitete Näherung multipliziert die Größe mit etwa 0,415 fürs Gehen und 0,45 für schnelleres Laufen. Das Ergebnis hilft, einen Schrittzähler zu kalibrieren oder grob auf die zurückgelegte Strecke zu schließen. Die Werte sind Schätzungen (Stand 2026) und schwanken je nach Tempo und Untergrund.',
  howto: [
    'Gib deine Körpergröße in Zentimetern ein.',
    'Wähle, ob du gehst oder läufst – der Faktor passt sich an.',
    'Lies die geschätzte Schrittlänge ab.',
    'Nutze die Schritte pro Kilometer, um deine Fitness-App zu kalibrieren.',
  ],
  faq: [
    { q: 'Wie genau ist die berechnete Schrittlänge?', a: 'Es handelt sich um eine Faustformel. Die echte Schrittlänge variiert mit Tempo, Beinlänge und Untergrund. Für eine exakte Kalibrierung zähle deine Schritte auf einer bekannten Strecke und teile die Strecke durch die Schrittzahl.' },
    { q: 'Was ist der Unterschied zwischen Schritt und Doppelschritt?', a: 'Ein Schritt ist der Abstand von einem Fußaufsatz zum nächsten (anderer Fuß). Ein Doppelschritt umfasst beide Beine und ist etwa doppelt so lang.' },
    { q: 'Warum ist die Schrittlänge beim Laufen größer?', a: 'Beim Joggen werden die Schritte länger und schwungvoller als beim normalen Gehen, daher der höhere Faktor.' },
    { q: 'Wie viele Schritte sind ein Kilometer?', a: 'Je nach Körpergröße und Tempo liegen Gehende meist zwischen rund 1.300 und 1.500 Schritten pro Kilometer.' },
  ],
  related: ['koerpergroesse-umrechner', 'geschwindigkeit-umrechner', 'zeit-umrechner'],
  updated: '2026-06-19',
  examples: [
    {
      values: { groesse: 175, modus: 'gehen' },
      // 175 * 0.415 = 72.625 cm; schritte/km = 100000/72.625 = 1376.9...
      expect: [
        { label: 'Schrittlänge', value: 72.6, tolerance: 0.1 },
        { label: 'Schritte pro Kilometer', value: 1377, tolerance: 1 },
      ],
    },
    {
      values: { groesse: 180, modus: 'laufen' },
      // 180 * 0.45 = 81 cm
      expect: [{ label: 'Schrittlänge', value: 81, tolerance: 0.1 }],
    },
  ],
};
