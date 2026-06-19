import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'vermoegenswirksame-leistungen-rechner',
  category: 'finanzen',
  title: 'VWL-Rechner mit Arbeitnehmersparzulage',
  shortTitle: 'VWL',
  description:
    'Berechne deinen jährlichen VWL-Sparbetrag und die mögliche Arbeitnehmersparzulage – für Bausparen (9 %) oder Fondssparen (20 %). Näherung, Stand 2026.',
  keywords: [
    'vwl rechner',
    'vermögenswirksame leistungen rechner',
    'arbeitnehmersparzulage berechnen',
    'vwl arbeitnehmersparzulage',
    'vwl förderung rechner',
  ],
  formula:
    'Sparbetrag/Jahr = (AG-Anteil + Eigenanteil) × 12; Zulage = min(Sparbetrag, Deckel) × Quote; Bausparen 9 %/470 €, Fonds 20 %/400 €',
  inputs: [
    { type: 'number', id: 'ag', label: 'Arbeitgeber-Anteil', unit: '€/Monat', default: 40, min: 0, step: 1, help: 'Zuschuss des Arbeitgebers laut Vertrag (oft bis 40 €).' },
    { type: 'number', id: 'eigen', label: 'Eigenanteil', unit: '€/Monat', default: 0, min: 0, step: 1, help: 'Aus deinem Nettogehalt aufgestockt.' },
    {
      type: 'select', id: 'art', label: 'Anlageart', default: 'fonds',
      options: [
        { value: 'fonds', label: 'Fonds-/Aktiensparen (20 %, max 400 €)' },
        { value: 'bau', label: 'Bausparen/Bauspardarlehen (9 %, max 470 €)' },
      ],
    },
  ],
  compute: (v) => {
    const ag = num(v.ag);
    const eigen = num(v.eigen);
    const art = String(v.art);
    const jahresSparbetrag = (ag + eigen) * 12;
    const quote = art === 'bau' ? 9 : 20;
    const deckel = art === 'bau' ? 470 : 400;
    const foerderfaehig = Math.min(jahresSparbetrag, deckel);
    const zulage = (foerderfaehig * quote) / 100;
    return [
      { label: 'Arbeitnehmersparzulage', value: zulage, unit: '€/Jahr', digits: 2, primary: true },
      { label: 'VWL-Sparbetrag im Jahr', value: jahresSparbetrag, unit: '€', digits: 2 },
      { label: 'Davon Arbeitgeber', value: ag * 12, unit: '€/Jahr', digits: 2 },
      { label: 'Förderfähiger Betrag', value: foerderfaehig, unit: '€', digits: 2, help: `Gedeckelt auf ${deckel} €.` },
    ];
  },
  intro:
    'Vermögenswirksame Leistungen (VWL) sind ein Zuschuss, den viele Arbeitgeber zusätzlich zum Gehalt in einen Sparvertrag zahlen. Bei niedrigem Einkommen gibt der Staat zusätzlich die Arbeitnehmersparzulage: 20 % auf bis zu 400 € jährlich beim Fonds-/Aktiensparen, 9 % auf bis zu 470 € beim Bausparen. Dieser Rechner schätzt deinen jährlichen Sparbetrag und die mögliche Zulage. Näherung, Stand 2026.',
  howto: [
    'Trage den monatlichen Arbeitgeber-Anteil aus deinem Vertrag ein.',
    'Ergänze einen eventuellen Eigenanteil aus deinem Netto.',
    'Wähle die Anlageart (Fonds- oder Bausparen).',
    'Lies die mögliche Arbeitnehmersparzulage pro Jahr ab.',
  ],
  faq: [
    { q: 'Wer bekommt die Arbeitnehmersparzulage?', a: 'Nur Beschäftigte unter der Einkommensgrenze. Seit 2024 liegt das zu versteuernde Einkommen bei max. 40.000 € (Ledige) bzw. 80.000 € (Verheiratete) – für beide Anlagearten. Liegst du darüber, gibt es nur den Arbeitgeberzuschuss.' },
    { q: 'Wie hoch ist die Zulage?', a: 'Beim Fonds-/Aktiensparen 20 % auf bis zu 400 € im Jahr (max. 80 €), beim Bausparen 9 % auf bis zu 470 € (max. 43,20 € jährlich, beim Sparen für einen Bausparvertrag).' },
    { q: 'Ist das Ergebnis verbindlich?', a: 'Nein, es ist eine Näherung nach dem Stand 2026 ohne Prüfung der Einkommensgrenze. Die Zulage wird mit der Steuererklärung beantragt und vom Finanzamt festgesetzt.' },
  ],
  related: ['bausparvertrag-rechner', 'etf-sparplan-endwert-rechner', 'sparplan-rechner'],
  examples: [
    {
      values: { ag: 40, eigen: 0, art: 'fonds' },
      expect: [
        { label: 'Arbeitnehmersparzulage', value: 80, tolerance: 0.01 },
        { label: 'VWL-Sparbetrag im Jahr', value: 480, tolerance: 0.01 },
      ],
    },
    {
      values: { ag: 40, eigen: 0, art: 'bau' },
      expect: [{ label: 'Arbeitnehmersparzulage', value: 42.3, tolerance: 0.01 }],
    },
  ],
  updated: '2026-06-19',
};
