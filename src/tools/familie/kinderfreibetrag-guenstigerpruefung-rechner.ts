import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

// Günstigerprüfung: Kindergeld vs. Kinderfreibetrag.
// Das Finanzamt vergleicht die jährliche Kindergeldsumme mit der Steuerersparnis
// durch den Kinderfreibetrag (inkl. BEA-Freibetrag). Die für den Steuerpflichtigen
// günstigere Variante wird angewandt.
// Freibetrag 2026 (Näherung): Kinderfreibetrag + BEA-Freibetrag pro Kind, je Elternteil
// hälftig; bei Zusammenveranlagung voll. Hier: voller Freibetrag pro Kind.
// Steuerersparnis = Freibetrag × Grenzsteuersatz.
// Kindergeld 2026: 255 €/Monat = 3.060 €/Jahr pro Kind.

const FREIBETRAG_PRO_KIND = 9600; // Kinderfreibetrag + BEA, Näherung 2026 (gemeinsam)
const KINDERGELD_JAHR = 3060; // 255 € × 12, Stand 2026

export const tool: Tool = {
  slug: 'kinderfreibetrag-guenstigerpruefung-rechner',
  category: 'familie',
  title: 'Kinderfreibetrag vs. Kindergeld (Günstigerprüfung)',
  shortTitle: 'Günstigerprüfung',
  description:
    'Vergleiche Kindergeld und Steuerersparnis durch den Kinderfreibetrag. Die Günstigerprüfung zeigt, welche Variante mehr bringt (Näherung, Stand 2026).',
  keywords: [
    'kinderfreibetrag rechner',
    'günstigerprüfung kindergeld',
    'kinderfreibetrag oder kindergeld',
    'kinderfreibetrag steuer',
    'kinderfreibetrag 2026',
    'kindergeld vs freibetrag',
  ],
  intro:
    'Eltern bekommen entweder Kindergeld oder den Kinderfreibetrag – das Finanzamt prüft automatisch, was günstiger ist (Günstigerprüfung). Der Kinderfreibetrag (inkl. Betreuungsfreibetrag) lohnt sich erst ab einem höheren Einkommen, weil die Steuerersparnis dann das Kindergeld übersteigt. Dieser Rechner vergleicht beides als Näherung (Stand 2026).',
  formula:
    'Steuerersparnis = Freibetrag(9.600 €/Kind) × Grenzsteuersatz × Kinder; Kindergeld = 3.060 €/Jahr × Kinder; günstiger = Maximum',
  inputs: [
    { type: 'number', id: 'kinder', label: 'Anzahl Kinder', unit: 'Kinder', default: 1, min: 1, max: 10, step: 1 },
    { type: 'number', id: 'satz', label: 'Persönlicher Grenzsteuersatz', unit: '%', default: 30, min: 0, max: 45, step: 1, help: 'Grenzsteuersatz auf das letzte Einkommen' },
  ],
  compute: (v) => {
    const kinder = Math.max(1, Math.round(num(v.kinder, 1)));
    let satz = num(v.satz, 30);
    if (satz < 0) satz = 0;
    if (satz > 45) satz = 45;
    const steuerersparnis = FREIBETRAG_PRO_KIND * kinder * (satz / 100);
    const kindergeld = KINDERGELD_JAHR * kinder;
    const guenstiger = Math.max(steuerersparnis, kindergeld);
    const vorteil = Math.abs(steuerersparnis - kindergeld);
    const variante = steuerersparnis > kindergeld ? 'Kinderfreibetrag' : 'Kindergeld';
    return [
      { label: 'Günstiger pro Jahr', value: guenstiger, unit: '€', digits: 2, primary: true },
      { label: 'Günstigere Variante', value: variante },
      { label: 'Steuerersparnis Freibetrag', value: steuerersparnis, unit: '€', digits: 2 },
      { label: 'Kindergeld pro Jahr', value: kindergeld, unit: '€', digits: 2 },
      { label: 'Vorteil der besseren Variante', value: vorteil, unit: '€', digits: 2 },
    ];
  },
  howto: [
    'Anzahl der Kinder eingeben.',
    'Persönlichen Grenzsteuersatz eintragen (oft 25–42 %).',
    'Ergebnis zeigt, ob Kindergeld oder Kinderfreibetrag günstiger ist.',
  ],
  faq: [
    { q: 'Was ist die Günstigerprüfung?', a: 'Das Finanzamt vergleicht in der Steuererklärung automatisch die Kindergeldsumme mit der Steuerersparnis durch den Kinderfreibetrag und wendet die für die Familie günstigere Variante an.' },
    { q: 'Wann lohnt sich der Kinderfreibetrag?', a: 'Erst ab einem höheren zu versteuernden Einkommen. Dann übersteigt die Steuerersparnis das Kindergeld. Bei mittleren Einkommen ist meist das Kindergeld günstiger.' },
    { q: 'Bekommt man beides?', a: 'Nein. Entweder Kindergeld oder die steuerliche Entlastung durch den Freibetrag – bereits erhaltenes Kindergeld wird gegengerechnet.' },
    { q: 'Wie genau ist die Rechnung?', a: 'Es ist eine Näherung mit pauschalem Freibetrag pro Kind und konstantem Grenzsteuersatz (Stand 2026). Die exakte Berechnung übernimmt das Finanzamt.' },
  ],
  related: ['kindergeld-rechner', 'kosten-kind-rechner', 'familienbudget-rechner'],
  examples: [
    {
      values: { kinder: 1, satz: 30 },
      expect: [
        { label: 'Steuerersparnis Freibetrag', value: 2880, tolerance: 0.01 },
        { label: 'Günstiger pro Jahr', value: 3060, tolerance: 0.01 },
      ],
    },
    {
      values: { kinder: 2, satz: 42 },
      expect: [
        { label: 'Steuerersparnis Freibetrag', value: 8064, tolerance: 0.01 },
        { label: 'Günstiger pro Jahr', value: 8064, tolerance: 0.01 },
        { label: 'Kindergeld pro Jahr', value: 6120, tolerance: 0.01 },
      ],
    },
  ],
  updated: '2026-06-18',
};
