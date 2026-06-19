import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

// Kinderzuschlag (KiZ) – Näherung. Der KiZ wird für Familien mit kleinem Einkommen
// zusätzlich zum Kindergeld gezahlt. Höchstbetrag 2026: bis zu 297 € pro Kind/Monat.
// Übersteigt das Elterneinkommen den Bedarf, mindert sich der KiZ stufenweise:
// Pauschal wird das den Bedarf übersteigende Elterneinkommen zu 45 % angerechnet.
// KEINE amtliche Berechnung – die Familienkasse prüft Mindesteinkommensgrenze,
// Wohnkosten, Vermögen u. v. m. Reine Orientierung (Stand 2026).

const KIZ_MAX_PRO_KIND = 297; // €/Monat, Höchstbetrag Stand 2026
const ANRECHNUNG = 0.45; // 45 % des über den Bedarf hinausgehenden Elterneinkommens

export const tool: Tool = {
  slug: 'kinderzuschlag-rechner',
  category: 'familie',
  title: 'Kinderzuschlag-Rechner (Näherung)',
  shortTitle: 'Kinderzuschlag',
  description:
    'Schätze den Kinderzuschlag (KiZ) für Familien mit kleinem Einkommen: bis zu 297 € pro Kind, gemindert um 45 % des Einkommens über dem Elternbedarf. Näherung (Stand 2026).',
  keywords: [
    'kinderzuschlag rechner',
    'kiz berechnen',
    'kinderzuschlag 2026',
    'kinderzuschlag höhe',
    'kinderzuschlag einkommen',
    'kinderzuschlag wie viel',
  ],
  intro:
    'Der Kinderzuschlag (KiZ) unterstützt Familien, die mit ihrem Einkommen den eigenen Bedarf decken, aber nicht den der Kinder. Er beträgt 2026 bis zu 297 € je Kind und Monat. Übersteigt das Elterneinkommen den maßgeblichen Elternbedarf, wird der KiZ um 45 % des übersteigenden Betrags gekürzt. Dieser Rechner bildet diese Logik vereinfacht ab. Hinweis: Näherung – die Familienkasse berücksichtigt Mindesteinkommensgrenzen, Wohnkosten, Vermögen und weitere Faktoren (Stand 2026). Kein Bescheidersatz.',
  formula:
    'KiZ = max(0; (297 € × Kinder) − 45 % × max(0; Elterneinkommen − Elternbedarf))',
  inputs: [
    { type: 'number', id: 'kinder', label: 'Anzahl der Kinder', unit: 'Kinder', default: 2, min: 1, max: 12, step: 1 },
    { type: 'number', id: 'einkommen', label: 'Bereinigtes Elterneinkommen', unit: '€/Monat', default: 1800, min: 0, max: 15000, step: 50, help: 'Netto nach Abzügen' },
    { type: 'number', id: 'bedarf', label: 'Maßgeblicher Elternbedarf', unit: '€/Monat', default: 1600, min: 0, max: 15000, step: 50, help: 'Regelbedarf + anteilige Wohnkosten der Eltern' },
  ],
  compute: (v) => {
    let kinder = Math.round(num(v.kinder, 2));
    if (kinder < 1) kinder = 1;
    if (kinder > 12) kinder = 12;
    const einkommen = Math.max(0, num(v.einkommen, 1800));
    const bedarf = Math.max(0, num(v.bedarf, 1600));
    const hoechstbetrag = KIZ_MAX_PRO_KIND * kinder;
    const ueberschuss = Math.max(0, einkommen - bedarf);
    const minderung = ueberschuss * ANRECHNUNG;
    const kiz = Math.max(0, hoechstbetrag - minderung);
    return [
      { label: 'Kinderzuschlag pro Monat', value: kiz, unit: '€', digits: 2, primary: true },
      { label: 'Höchstbetrag (vor Anrechnung)', value: hoechstbetrag, unit: '€', digits: 0 },
      { label: 'Einkommen über Bedarf', value: ueberschuss, unit: '€', digits: 2 },
      { label: 'Minderung (45 %)', value: minderung, unit: '€', digits: 2 },
      { label: 'Kinderzuschlag pro Jahr', value: kiz * 12, unit: '€', digits: 2 },
    ];
  },
  howto: [
    'Anzahl der im Haushalt lebenden Kinder eingeben.',
    'Bereinigtes Elterneinkommen (Netto) eintragen.',
    'Maßgeblichen Elternbedarf eintragen (Regelbedarf plus anteilige Wohnkosten).',
    'Den geschätzten monatlichen Kinderzuschlag ablesen.',
  ],
  faq: [
    { q: 'Wie hoch ist der Kinderzuschlag 2026?', a: 'Der Höchstbetrag liegt 2026 bei bis zu 297 € pro Kind und Monat. Wie viel tatsächlich ausgezahlt wird, hängt vom Einkommen und Bedarf der Familie ab.' },
    { q: 'Wie wird das Einkommen angerechnet?', a: 'Übersteigt das bereinigte Elterneinkommen den maßgeblichen Elternbedarf, wird der Kinderzuschlag um 45 % des übersteigenden Betrags gekürzt. Eigenes Einkommen der Kinder mindert deren Anteil stärker.' },
    { q: 'Wer hat Anspruch auf Kinderzuschlag?', a: 'Eltern, die Kindergeld beziehen, ein Mindesteinkommen erreichen, aber mit dem Einkommen den Kinderbedarf nicht decken können und keinen Anspruch auf Bürgergeld dadurch hätten.' },
    { q: 'Wie genau ist diese Schätzung?', a: 'Es ist eine vereinfachte Näherung. Die Familienkasse prüft Mindesteinkommensgrenze, tatsächliche Wohnkosten, Vermögen und Kinder­einkommen individuell (Stand 2026). Maßgeblich ist der Bescheid.' },
  ],
  related: ['kindergeld-rechner', 'unterhaltsvorschuss-rechner', 'kosten-kind-rechner', 'familienbudget-rechner'],
  examples: [
    {
      values: { kinder: 2, einkommen: 1800, bedarf: 1600 },
      expect: [
        { label: 'Höchstbetrag (vor Anrechnung)', value: 594, tolerance: 0.01 },
        { label: 'Minderung (45 %)', value: 90, tolerance: 0.01 },
        { label: 'Kinderzuschlag pro Monat', value: 504, tolerance: 0.01 },
      ],
    },
    {
      values: { kinder: 1, einkommen: 3000, bedarf: 1500 },
      expect: [{ label: 'Kinderzuschlag pro Monat', value: 0, tolerance: 0.01 }],
    },
  ],
  updated: '2026-06-19',
};
