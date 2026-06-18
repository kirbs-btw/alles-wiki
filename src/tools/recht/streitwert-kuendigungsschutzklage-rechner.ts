import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'streitwert-kuendigungsschutzklage-rechner',
  category: 'recht',
  title: 'Streitwert Kündigungsschutzklage-Rechner',
  shortTitle: 'Streitwert KSchK',
  description:
    'Berechne den Streitwert einer Kündigungsschutzklage: bis zu drei Bruttomonatsgehälter (§ 42 Abs. 2 GKG), Grundlage für Gerichts- und Anwaltskosten.',
  keywords: [
    'streitwert kündigungsschutzklage',
    'streitwert kündigung berechnen',
    'gegenstandswert kündigungsschutzklage',
    'streitwert arbeitsgericht',
    '42 gkg streitwert',
    'kündigungsschutzklage kosten streitwert',
  ],
  formula: 'Streitwert = min(Beschäftigungsmonate, 3) × Bruttomonatsgehalt (§ 42 Abs. 2 GKG)',
  inputs: [
    { type: 'number', id: 'brutto', label: 'Bruttomonatsgehalt', unit: '€', default: 3000, min: 0, step: 100, help: 'Regelmäßiges monatliches Bruttoentgelt.' },
    { type: 'number', id: 'monate', label: 'Bestandsdauer (Monate)', unit: 'Monate', default: 12, min: 0, step: 1, help: 'Dauer des Arbeitsverhältnisses – maximal werden 3 Monate angesetzt.' },
  ],
  compute: (v) => {
    const brutto = num(v.brutto);
    const monate = num(v.monate);
    const angesetzteMonate = Math.min(Math.max(0, monate), 3);
    const streitwert = brutto * angesetzteMonate;
    return [
      { label: 'Streitwert', value: streitwert, unit: '€', digits: 2, primary: true },
      { label: 'Angesetzte Monatsgehälter', value: angesetzteMonate, unit: 'Monate', digits: 0 },
      { label: 'Bruttomonatsgehalt', value: brutto, unit: '€', digits: 2 },
    ];
  },
  intro:
    'Bei einer Kündigungsschutzklage bemisst sich der Streitwert nach dem Vierteljahresverdienst: Er beträgt höchstens drei Bruttomonatsgehälter (§ 42 Abs. 2 GKG). Bei kürzerer Beschäftigung kann ein geringerer Wert anzusetzen sein. Der Streitwert bestimmt Gerichts- und Anwaltskosten. Dieser Rechner liefert die übliche Berechnungsgrundlage als Orientierung; das Arbeitsgericht setzt den Wert verbindlich fest.',
  howto: [
    'Bruttomonatsgehalt eingeben.',
    'Bestandsdauer des Arbeitsverhältnisses in Monaten angeben.',
    'Streitwert ablesen – höchstens drei Monatsgehälter.',
  ],
  faq: [
    { q: 'Wie hoch ist der Streitwert bei einer Kündigung?', a: 'Bei einer Kündigungsschutzklage beträgt der Streitwert höchstens den Vierteljahresverdienst, also bis zu drei Bruttomonatsgehälter (§ 42 Abs. 2 GKG).' },
    { q: 'Zählt das Arbeitsgericht Gerichtsgebühren?', a: 'In der ersten Instanz vor dem Arbeitsgericht fallen bei Vergleich oder Klagerücknahme keine Gerichtsgebühren an. Die Anwaltskosten trägt im Arbeitsrecht erstinstanzlich jede Seite selbst.' },
    { q: 'Was bedeutet das für die Anwaltskosten?', a: 'Aus dem Streitwert ergeben sich über die RVG-Tabelle die Anwaltsgebühren. Ermittle sie mit dem RVG-Prozesskosten-Rechner anhand des hier berechneten Streitwerts.' },
    { q: 'Werden Sonderzahlungen einbezogen?', a: 'In das Bruttomonatsgehalt fließen regelmäßige Bezüge ein. Einmalige oder unregelmäßige Sonderzahlungen werden anteilig oder gar nicht berücksichtigt – das entscheidet das Gericht.' },
  ],
  related: ['abfindung-rechner', 'rvg-prozesskosten-rechner', 'kuendigungsfrist-rechner'],
  examples: [
    {
      values: { brutto: 3000, monate: 12 },
      expect: [
        { label: 'Angesetzte Monatsgehälter', value: 3, tolerance: 0.01 },
        { label: 'Streitwert', value: 9000, tolerance: 0.5 },
      ],
    },
    {
      values: { brutto: 2500, monate: 2 },
      expect: [
        { label: 'Angesetzte Monatsgehälter', value: 2, tolerance: 0.01 },
        { label: 'Streitwert', value: 5000, tolerance: 0.5 },
      ],
    },
  ],
  updated: '2026-06-18',
};
