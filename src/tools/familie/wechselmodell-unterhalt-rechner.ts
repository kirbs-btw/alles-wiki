import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

// Wechselmodell-Unterhalt (Näherung): Beim paritätischen Wechselmodell tragen beide
// Eltern den Barbedarf anteilig nach ihrem bereinigten Nettoeinkommen. Vereinfachte
// Berechnung: Der Mehrverdiener trägt seinen Einkommensanteil am Gesamtbedarf, der
// Wenigerverdiener seinen Anteil. Der Ausgleichsbetrag ist die Differenz zwischen dem
// (hälftig getragenen) Bedarf und dem nach Einkommen geschuldeten Anteil.
// Kindergeld bleibt hier außen vor (wird real meist hälftig verrechnet). Reine Näherung.

export const tool: Tool = {
  slug: 'wechselmodell-unterhalt-rechner',
  category: 'familie',
  title: 'Wechselmodell-Unterhalt-Rechner (Näherung)',
  shortTitle: 'Wechselmodell',
  description:
    'Schätze den Unterhaltsausgleich im paritätischen Wechselmodell: beide Eltern tragen den Kindesbedarf anteilig nach Nettoeinkommen. Vereinfachte Näherung (Stand 2026).',
  keywords: [
    'wechselmodell unterhalt',
    'unterhalt wechselmodell rechner',
    'paritätisches wechselmodell unterhalt',
    'unterhalt 50 50 betreuung',
    'unterhaltsausgleich wechselmodell',
  ],
  intro:
    'Beim paritätischen Wechselmodell betreuen beide Eltern das Kind etwa zu gleichen Teilen. Der Barbedarf des Kindes wird dann nicht von einem Elternteil allein getragen, sondern von beiden anteilig nach ihrem bereinigten Nettoeinkommen. Wer mehr verdient, trägt einen größeren Anteil und zahlt dem anderen einen Ausgleich. Dieser Rechner liefert eine stark vereinfachte Näherung (Stand 2026) – das Kindergeld und Mehrbedarf sind nicht berücksichtigt; verbindlich ist eine fachliche Beratung.',
  formula:
    'Anteil A = Netto A / (Netto A + Netto B); Ausgleich = Bedarf × Anteil A − Bedarf / 2',
  inputs: [
    { type: 'number', id: 'bedarf', label: 'Barbedarf des Kindes', unit: '€/Monat', default: 800, min: 0, max: 3000, step: 10, help: 'z. B. nach Düsseldorfer Tabelle' },
    { type: 'number', id: 'nettoA', label: 'Nettoeinkommen Elternteil A', unit: '€/Monat', default: 3000, min: 0, max: 20000, step: 50 },
    { type: 'number', id: 'nettoB', label: 'Nettoeinkommen Elternteil B', unit: '€/Monat', default: 2000, min: 0, max: 20000, step: 50 },
  ],
  compute: (v) => {
    const bedarf = Math.max(0, num(v.bedarf, 800));
    const nettoA = Math.max(0, num(v.nettoA, 3000));
    const nettoB = Math.max(0, num(v.nettoB, 2000));
    const summe = nettoA + nettoB;
    const anteilA = summe > 0 ? nettoA / summe : 0.5;
    const traegtA = bedarf * anteilA; // nach Einkommen geschuldeter Anteil von A
    const ausgleich = traegtA - bedarf / 2; // > 0: A zahlt an B
    return [
      { label: 'Ausgleichszahlung A an B', value: Math.max(0, ausgleich), unit: '€/Monat', digits: 2, primary: true, help: 'positiv = Mehrverdiener A zahlt' },
      { label: 'Einkommensanteil A', value: anteilA * 100, unit: '%', digits: 1 },
      { label: 'Von A getragener Bedarf', value: traegtA, unit: '€/Monat', digits: 2 },
      { label: 'Von B getragener Bedarf', value: bedarf - traegtA, unit: '€/Monat', digits: 2 },
    ];
  },
  howto: [
    'Barbedarf des Kindes eintragen (z. B. Tabellenbetrag nach Alter).',
    'Bereinigtes Nettoeinkommen beider Eltern eingeben.',
    'Einkommensanteile und die ungefähre Ausgleichszahlung des Mehrverdieners ablesen.',
    'Für eine verbindliche Berechnung fachliche Beratung hinzuziehen.',
  ],
  faq: [
    { q: 'Wer zahlt im Wechselmodell Unterhalt?', a: 'Beim echten paritätischen Wechselmodell tragen beide Eltern den Barbedarf anteilig nach Einkommen. Der besserverdienende Elternteil leistet dem anderen meist einen Ausgleich.' },
    { q: 'Ist das Kindergeld berücksichtigt?', a: 'Nein. In dieser Näherung bleibt das Kindergeld außen vor. In der Praxis wird es üblicherweise hälftig verrechnet, was den Ausgleichsbetrag verändert.' },
    { q: 'Wie genau ist die Berechnung?', a: 'Es ist eine vereinfachte Orientierung (Stand 2026). Selbstbehalt, Mehrbedarf, Kindergeld und die genaue Quotenermittlung der Gerichte sind nicht abgebildet. Verbindlich ist eine fachliche Beratung.' },
    { q: 'Was ist das paritätische Wechselmodell?', a: 'Eine Betreuungsform, bei der das Kind etwa gleich viel Zeit bei beiden Eltern verbringt (annähernd 50:50). Erst dann gilt die anteilige Bedarfsteilung nach Einkommen.' },
  ],
  related: ['kindesunterhalt-rechner', 'kindergeld-rechner', 'kosten-kind-rechner'],
  examples: [
    {
      values: { bedarf: 800, nettoA: 3000, nettoB: 2000 },
      expect: [
        { label: 'Einkommensanteil A', value: 60, tolerance: 0.01 },
        { label: 'Von A getragener Bedarf', value: 480, tolerance: 0.01 },
        { label: 'Ausgleichszahlung A an B', value: 80, tolerance: 0.01 },
      ],
    },
    {
      values: { bedarf: 600, nettoA: 2500, nettoB: 2500 },
      expect: [{ label: 'Ausgleichszahlung A an B', value: 0, tolerance: 0.01 }],
    },
  ],
  updated: '2026-06-19',
};
