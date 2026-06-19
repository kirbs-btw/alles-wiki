import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

// Klassenfahrt-Sparplan: Wie viel muss pro Monat zurückgelegt werden, um bis zur
// Klassenfahrt einen Zielbetrag zu erreichen? Berücksichtigt bereits Gespartes.
// Monate bis zur Fahrt = ganze Monate zwischen heute und Termin (über date-Input).
// Reine Sparplanung ohne Zinsen.

export const tool: Tool = {
  slug: 'klassenfahrt-sparplan-rechner',
  category: 'familie',
  title: 'Klassenfahrt-Sparplan-Rechner',
  shortTitle: 'Klassenfahrt sparen',
  description:
    'Berechne, wie viel du pro Monat für die Klassenfahrt zurücklegen musst: Zielbetrag, bereits Gespartes und die Zahl der Monate bis zum Termin.',
  keywords: [
    'klassenfahrt sparplan',
    'für klassenfahrt sparen',
    'klassenfahrt kosten ansparen',
    'monatlich sparen klassenfahrt',
    'schulfahrt sparen rechner',
  ],
  intro:
    'Klassenfahrten kosten oft mehrere Hundert Euro auf einmal. Wer rechtzeitig monatlich zurücklegt, vermeidet eine große Einmalbelastung. Dieser Rechner verteilt den noch offenen Betrag gleichmäßig auf die Monate bis zur Fahrt – ohne Zinsen, als einfache Sparplanung.',
  formula:
    'Monatsrate = (Zielbetrag − bereits gespart) / Monate bis zur Fahrt',
  inputs: [
    { type: 'number', id: 'ziel', label: 'Kosten der Klassenfahrt', unit: '€', default: 400, min: 0, max: 5000, step: 10 },
    { type: 'number', id: 'gespart', label: 'Bereits gespart', unit: '€', default: 0, min: 0, max: 5000, step: 10 },
    { type: 'number', id: 'monate', label: 'Monate bis zur Fahrt', unit: 'Monate', default: 8, min: 1, max: 60, step: 1, help: 'Zeit bis zur Klassenfahrt' },
  ],
  compute: (v) => {
    const ziel = Math.max(0, num(v.ziel, 400));
    const gespart = Math.max(0, num(v.gespart, 0));
    const monate = Math.max(1, num(v.monate, 8));
    const offen = Math.max(0, ziel - gespart);
    const rate = offen / monate;
    return [
      { label: 'Monatliche Sparrate', value: rate, unit: '€', digits: 2, primary: true },
      { label: 'Noch offener Betrag', value: offen, unit: '€', digits: 2 },
      { label: 'Wöchentliche Sparrate', value: rate / 4.345, unit: '€', digits: 2, help: 'rund 4,3 Wochen je Monat' },
    ];
  },
  howto: [
    'Gesamtkosten der Klassenfahrt eintragen.',
    'Bereits Gespartes ergänzen, falls vorhanden.',
    'Zahl der Monate bis zur Fahrt eingeben.',
    'Die nötige monatliche Sparrate ablesen.',
  ],
  faq: [
    { q: 'Was kostet eine Klassenfahrt?', a: 'Je nach Ziel und Dauer meist zwischen 150 € (Tagesausflug, kurze Fahrt) und über 800 € (Auslandsfahrt). Schulen geben den Betrag rechtzeitig bekannt.' },
    { q: 'Gibt es Zuschüsse für Klassenfahrten?', a: 'Familien mit geringem Einkommen können über das Bildungs- und Teilhabepaket einen Zuschuss erhalten. Die genauen Voraussetzungen klärt das zuständige Amt.' },
    { q: 'Werden Zinsen berücksichtigt?', a: 'Nein. Der Rechner verteilt den offenen Betrag gleichmäßig ohne Zinsen – das ist für kurze Sparzeiträume die übliche Vorgehensweise.' },
  ],
  related: ['sparplan-kind-rechner', 'taschengeld-rechner', 'familienbudget-rechner'],
  examples: [
    {
      values: { ziel: 400, gespart: 0, monate: 8 },
      expect: [
        { label: 'Noch offener Betrag', value: 400, tolerance: 0.01 },
        { label: 'Monatliche Sparrate', value: 50, tolerance: 0.01 },
      ],
    },
    {
      values: { ziel: 600, gespart: 120, monate: 12 },
      expect: [{ label: 'Monatliche Sparrate', value: 40, tolerance: 0.01 }],
    },
  ],
  updated: '2026-06-19',
};
