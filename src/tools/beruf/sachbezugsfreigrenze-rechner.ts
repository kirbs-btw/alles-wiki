import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'sachbezugsfreigrenze-rechner',
  category: 'beruf',
  title: 'Sachbezugsfreigrenze Rechner (50-Euro-Grenze)',
  shortTitle: 'Sachbezug 50 €',
  description:
    'Prüfe, ob deine Sachbezüge die monatliche 50-Euro-Freigrenze einhalten. Wird sie überschritten, ist der gesamte Betrag steuer- und beitragspflichtig (Stand 2026).',
  keywords: [
    'sachbezugsfreigrenze rechner',
    'sachbezug 50 euro grenze',
    '50 euro freigrenze sachbezug',
    'gutschein steuerfrei arbeitgeber',
    'sachbezug freigrenze berechnen',
  ],
  formula: 'Steuerfrei nur, wenn Summe Sachbezüge ≤ Freigrenze; sonst voller Betrag steuerpflichtig (Freigrenze, kein Freibetrag)',
  inputs: [
    { type: 'number', id: 'sachbezug', label: 'Summe Sachbezüge im Monat', unit: '€', default: 45, min: 0, step: 1, help: 'Gesamtwert aller Sachzuwendungen des Monats, z. B. Tank- oder Warengutscheine, Sachgeschenke.' },
    { type: 'number', id: 'freigrenze', label: 'Monatliche Freigrenze', unit: '€', default: 50, min: 0, step: 1, help: 'Sachbezugsfreigrenze nach § 8 Abs. 2 EStG, Stand 2026: 50 € pro Monat.' },
  ],
  compute: (v) => {
    const sachbezug = num(v.sachbezug);
    const freigrenze = num(v.freigrenze);

    const eingehalten = sachbezug <= freigrenze;
    const steuerfrei = eingehalten ? sachbezug : 0;
    const steuerpflichtig = eingehalten ? 0 : sachbezug;
    const spielraum = Math.max(freigrenze - sachbezug, 0);

    return [
      { label: 'Steuerfreier Betrag', value: steuerfrei, unit: '€', digits: 2, primary: true },
      { label: 'Status', value: eingehalten ? 'Freigrenze eingehalten' : 'Freigrenze überschritten – voll steuerpflichtig' },
      { label: 'Steuer-/beitragspflichtig', value: steuerpflichtig, unit: '€', digits: 2 },
      { label: 'Verbleibender Spielraum', value: spielraum, unit: '€', digits: 2, help: 'Restbetrag bis zur Freigrenze in diesem Monat.' },
    ];
  },
  intro:
    'Sachbezüge wie Waren- oder Tankgutscheine können dir der Arbeitgeber bis zu einer monatlichen Freigrenze steuer- und sozialabgabenfrei gewähren. Stand 2026 liegt diese Freigrenze nach § 8 Abs. 2 EStG bei 50 € pro Monat. Wichtig: Es handelt sich um eine Freigrenze, nicht um einen Freibetrag – schon ein Cent darüber macht den gesamten Sachbezug steuer- und beitragspflichtig. Dieser Rechner prüft die Einhaltung und zeigt deinen verbleibenden Spielraum.',
  howto: [
    'Trage den Gesamtwert aller Sachbezüge des Monats ein.',
    'Belasse die Freigrenze bei 50 € oder passe sie an.',
    'Lies ab, ob die Freigrenze eingehalten ist und wie viel Spielraum bleibt.',
  ],
  faq: [
    { q: 'Wie hoch ist die Sachbezugsfreigrenze?', a: 'Stand 2026 beträgt die monatliche Freigrenze für Sachbezüge nach § 8 Abs. 2 EStG 50 €. Bleiben alle Sachzuwendungen eines Monats darunter oder gleich, sind sie steuer- und beitragsfrei.' },
    { q: 'Was passiert bei Überschreitung?', a: 'Wird die Freigrenze auch nur um einen Cent überschritten, ist der komplette Sachbezug steuer- und sozialabgabenpflichtig – nicht nur der übersteigende Teil. Das ist der Unterschied zu einem Freibetrag.' },
    { q: 'Zählen mehrere Gutscheine zusammen?', a: 'Ja, alle Sachzuwendungen eines Monats werden addiert. Geldgeschenke oder Barlohn zählen nicht als Sachbezug und fallen nicht unter die Freigrenze.' },
    { q: 'Gilt die Grenze monatlich oder jährlich?', a: 'Die 50 € gelten pro Monat. Nicht genutzte Beträge können nicht in andere Monate übertragen oder angesammelt werden.' },
  ],
  related: ['homeoffice-pauschale-rechner', 'minijob-stunden-rechner', 'netto-stundenlohn-rechner'],
  updated: '2026-06-19',
  examples: [
    {
      values: { sachbezug: 45, freigrenze: 50 },
      expect: [
        { label: 'Steuerfreier Betrag', value: 45, tolerance: 0.01 },
        { label: 'Steuer-/beitragspflichtig', value: 0, tolerance: 0.01 },
        { label: 'Verbleibender Spielraum', value: 5, tolerance: 0.01 },
      ],
    },
    {
      values: { sachbezug: 55, freigrenze: 50 },
      expect: [
        { label: 'Steuerfreier Betrag', value: 0, tolerance: 0.01 },
        { label: 'Steuer-/beitragspflichtig', value: 55, tolerance: 0.01 },
      ],
    },
  ],
};
