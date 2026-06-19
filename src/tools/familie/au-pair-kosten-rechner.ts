import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

// Au-pair-Gesamtkosten: laufende Monatskosten (Taschengeld + Verpflegungspauschale
// + Versicherung + Sprachkurszuschuss + Fahrkarte) plus einmalige Vermittlungsgebühr,
// hochgerechnet auf die gewünschte Aufenthaltsdauer. Reine Budgetplanung.
// Taschengeld-Mindestbetrag in Deutschland: etablierte Orientierung 280 €/Monat (Stand 2026).

export const tool: Tool = {
  slug: 'au-pair-kosten-rechner',
  category: 'familie',
  title: 'Au-pair-Kosten-Rechner',
  shortTitle: 'Au-pair-Kosten',
  description:
    'Berechne die Gesamtkosten für ein Au-pair: Taschengeld, Verpflegung, Versicherung, Sprachkurs und Fahrkarte pro Monat plus einmalige Vermittlungsgebühr.',
  keywords: [
    'au pair kosten',
    'au pair kosten rechner',
    'was kostet ein au pair',
    'au pair taschengeld',
    'au pair gastfamilie kosten',
    'au pair monatliche kosten',
  ],
  intro:
    'Ein Au-pair verursacht für die Gastfamilie laufende und einmalige Kosten. Zu den monatlichen Posten zählen das Taschengeld (in Deutschland mindestens rund 280 € pro Monat, Stand 2026), eine Verpflegungspauschale, die Versicherung, ein Zuschuss zum Sprachkurs sowie meist eine Monatsfahrkarte. Hinzu kommt eine einmalige Vermittlungsgebühr. Dieser Rechner summiert alle Posten und rechnet sie auf die Aufenthaltsdauer hoch.',
  formula:
    'Gesamt = (Taschengeld + Verpflegung + Versicherung + Sprachkurs + Fahrkarte) × Monate + Vermittlungsgebühr',
  inputs: [
    { type: 'number', id: 'taschengeld', label: 'Taschengeld', unit: '€/Monat', default: 280, min: 0, max: 1000, step: 10, help: 'Mindestbetrag in DE ca. 280 €' },
    { type: 'number', id: 'verpflegung', label: 'Verpflegungspauschale', unit: '€/Monat', default: 260, min: 0, max: 1000, step: 10, help: 'Anteilige Lebensmittel für das Au-pair' },
    { type: 'number', id: 'versicherung', label: 'Versicherung', unit: '€/Monat', default: 70, min: 0, max: 400, step: 5, help: 'Kranken-, Unfall- und Haftpflichtversicherung' },
    { type: 'number', id: 'sprachkurs', label: 'Sprachkurs-Zuschuss', unit: '€/Monat', default: 50, min: 0, max: 400, step: 5 },
    { type: 'number', id: 'fahrkarte', label: 'Fahrkarte / ÖPNV', unit: '€/Monat', default: 50, min: 0, max: 300, step: 5 },
    { type: 'number', id: 'vermittlung', label: 'Vermittlungsgebühr (einmalig)', unit: '€', default: 600, min: 0, max: 5000, step: 50 },
    { type: 'number', id: 'monate', label: 'Aufenthaltsdauer', unit: 'Monate', default: 12, min: 1, max: 24, step: 1, help: 'meist 6 bis 12 Monate' },
  ],
  compute: (v) => {
    const taschengeld = Math.max(0, num(v.taschengeld, 280));
    const verpflegung = Math.max(0, num(v.verpflegung, 260));
    const versicherung = Math.max(0, num(v.versicherung, 70));
    const sprachkurs = Math.max(0, num(v.sprachkurs, 50));
    const fahrkarte = Math.max(0, num(v.fahrkarte, 50));
    const vermittlung = Math.max(0, num(v.vermittlung, 600));
    const monate = Math.max(1, num(v.monate, 12));
    const proMonat = taschengeld + verpflegung + versicherung + sprachkurs + fahrkarte;
    const laufend = proMonat * monate;
    const gesamt = laufend + vermittlung;
    return [
      { label: 'Gesamtkosten', value: gesamt, unit: '€', digits: 2, primary: true },
      { label: 'Laufende Kosten pro Monat', value: proMonat, unit: '€', digits: 2 },
      { label: 'Laufende Kosten gesamt', value: laufend, unit: '€', digits: 2 },
      { label: 'Vermittlungsgebühr', value: vermittlung, unit: '€', digits: 2 },
    ];
  },
  howto: [
    'Monatliches Taschengeld eintragen (in Deutschland mindestens etwa 280 €).',
    'Verpflegungspauschale, Versicherung, Sprachkurs-Zuschuss und Fahrkarte ergänzen.',
    'Einmalige Vermittlungsgebühr und die geplante Aufenthaltsdauer eingeben.',
    'Gesamtkosten und monatliche Belastung ablesen.',
  ],
  faq: [
    { q: 'Wie hoch ist das Au-pair-Taschengeld?', a: 'In Deutschland gilt als Orientierung ein Mindesttaschengeld von rund 280 € pro Monat (Stand 2026). Die genaue Höhe legt der Au-pair-Vertrag fest.' },
    { q: 'Welche Versicherungen muss die Gastfamilie zahlen?', a: 'Üblich sind Kranken-, Unfall- und Haftpflichtversicherung für das Au-pair. Die Beiträge übernimmt in der Regel die Gastfamilie.' },
    { q: 'Sind Kost und Logis zusätzlich zu berücksichtigen?', a: 'Freie Unterkunft und Verpflegung sind Teil des Au-pair-Verhältnisses. Die Verpflegungspauschale hier schätzt die zusätzlichen Lebensmittelkosten; die Wohnkosten sind nicht gesondert eingerechnet.' },
    { q: 'Wie genau ist die Schätzung?', a: 'Es ist eine Budgetnäherung mit konstanten Monatsbeträgen. Reale Kosten hängen von Region, Vermittlungsagentur und Vertrag ab.' },
  ],
  related: ['betreuungskosten-rechner', 'kita-beitrag-rechner', 'familienbudget-rechner'],
  examples: [
    {
      values: { taschengeld: 280, verpflegung: 260, versicherung: 70, sprachkurs: 50, fahrkarte: 50, vermittlung: 600, monate: 12 },
      expect: [
        { label: 'Laufende Kosten pro Monat', value: 710, tolerance: 0.01 },
        { label: 'Gesamtkosten', value: 9120, tolerance: 0.01 },
      ],
    },
    {
      values: { taschengeld: 300, verpflegung: 250, versicherung: 80, sprachkurs: 60, fahrkarte: 60, vermittlung: 800, monate: 6 },
      expect: [{ label: 'Laufende Kosten pro Monat', value: 750, tolerance: 0.01 }],
    },
  ],
  updated: '2026-06-19',
};
