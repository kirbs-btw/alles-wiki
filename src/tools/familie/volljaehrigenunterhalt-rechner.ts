import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

// Volljährigenunterhalt: Beim volljährigen Kind haften beide Elternteile
// anteilig nach ihrem Einkommen. Der Bedarf eines volljährigen Kindes im
// Haushalt eines Elternteils richtet sich nach der Düsseldorfer Tabelle
// (4. Altersstufe). Auf den Bedarf wird das volle Kindergeld angerechnet.
// Der Restbedarf wird zwischen beiden Eltern nach Einkommensanteil verteilt.
// Vereinfachte Orientierung – maßgeblich ist der Einzelfall (Stand 2026).

const KINDERGELD = 255; // Stand 2026

export const tool: Tool = {
  slug: 'volljaehrigenunterhalt-rechner',
  category: 'familie',
  title: 'Volljährigenunterhalt-Rechner',
  shortTitle: 'Volljährigenunterhalt',
  description:
    'Berechne den Unterhalt für volljährige Kinder: anteilige Haftung beider Eltern nach Einkommen, abzüglich vollem Kindergeld. Orientierung (Stand 2026).',
  keywords: [
    'volljährigenunterhalt rechner',
    'unterhalt volljähriges kind',
    'unterhalt student berechnen',
    'unterhalt ab 18',
    'anteilige haftung eltern',
    'unterhalt erwachsenes kind',
  ],
  intro:
    'Beim volljährigen Kind haften grundsätzlich beide Elternteile anteilig nach ihrem Einkommen für den Unterhalt. Vom Bedarf nach der Düsseldorfer Tabelle wird das volle Kindergeld abgezogen. Der verbleibende Bedarf wird im Verhältnis der bereinigten Nettoeinkommen der Eltern aufgeteilt. Dieser Rechner liefert eine vereinfachte Orientierung (Stand 2026).',
  formula:
    'Restbedarf = Bedarf − Kindergeld(255 €); Anteil Elternteil 1 = Restbedarf × E1 / (E1 + E2)',
  inputs: [
    { type: 'number', id: 'bedarf', label: 'Unterhaltsbedarf des Kindes', unit: '€/Monat', default: 693, min: 0, max: 3000, step: 10, help: 'z. B. 693 € nach 4. Altersstufe der Tabelle' },
    { type: 'number', id: 'einkommen1', label: 'Netto Elternteil 1', unit: '€/Monat', default: 3000, min: 0, max: 20000, step: 50 },
    { type: 'number', id: 'einkommen2', label: 'Netto Elternteil 2', unit: '€/Monat', default: 2000, min: 0, max: 20000, step: 50 },
  ],
  compute: (v) => {
    const bedarf = Math.max(0, num(v.bedarf, 693));
    const e1 = Math.max(0, num(v.einkommen1, 3000));
    const e2 = Math.max(0, num(v.einkommen2, 2000));
    const restbedarf = Math.max(0, bedarf - KINDERGELD);
    const summe = e1 + e2;
    const anteil1 = summe > 0 ? restbedarf * (e1 / summe) : 0;
    const anteil2 = summe > 0 ? restbedarf * (e2 / summe) : 0;
    return [
      { label: 'Anteil Elternteil 1', value: anteil1, unit: '€', digits: 2, primary: true },
      { label: 'Anteil Elternteil 2', value: anteil2, unit: '€', digits: 2 },
      { label: 'Restbedarf nach Kindergeld', value: restbedarf, unit: '€', digits: 2 },
    ];
  },
  howto: [
    'Unterhaltsbedarf des volljährigen Kindes eingeben (z. B. nach Tabelle oder als Bedarfssatz für Studierende).',
    'Bereinigtes Netto beider Elternteile eintragen.',
    'Die anteilige Haftung jedes Elternteils ablesen.',
  ],
  faq: [
    { q: 'Wer zahlt beim volljährigen Kind?', a: 'Anders als beim minderjährigen Kind haften beim Volljährigen beide Elternteile anteilig nach ihrem Einkommen für den Barunterhalt.' },
    { q: 'Wird Kindergeld angerechnet?', a: 'Ja, beim volljährigen Kind wird das volle Kindergeld (Stand 2026: 255 €) auf den Bedarf angerechnet und mindert den von den Eltern zu tragenden Restbedarf.' },
    { q: 'Wie hoch ist der Bedarf bei Studierenden?', a: 'Für auswärts wohnende Studierende gilt häufig ein eigener Bedarfssatz. Im Haushalt der Eltern richtet sich der Bedarf nach der 4. Altersstufe der Düsseldorfer Tabelle.' },
    { q: 'Wie verbindlich ist das Ergebnis?', a: 'Es ist eine grobe Orientierung. Selbstbehalt, eigenes Einkommen des Kindes und weitere Faktoren bleiben unberücksichtigt. Maßgeblich ist der Einzelfall (Stand 2026).' },
  ],
  related: ['kindesunterhalt-rechner', 'kindergeld-rechner', 'familienbudget-rechner'],
  examples: [
    {
      values: { bedarf: 693, einkommen1: 3000, einkommen2: 2000 },
      expect: [
        { label: 'Restbedarf nach Kindergeld', value: 438, tolerance: 0.01 },
        { label: 'Anteil Elternteil 1', value: 262.8, tolerance: 0.01 },
        { label: 'Anteil Elternteil 2', value: 175.2, tolerance: 0.01 },
      ],
    },
    {
      values: { bedarf: 930, einkommen1: 4000, einkommen2: 0 },
      expect: [{ label: 'Anteil Elternteil 1', value: 675, tolerance: 0.01 }],
    },
  ],
  updated: '2026-06-18',
};
