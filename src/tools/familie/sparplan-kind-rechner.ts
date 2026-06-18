import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'sparplan-kind-rechner',
  category: 'familie',
  title: 'Sparplan fürs Kind berechnen',
  shortTitle: 'Sparen fürs Kind',
  description:
    'Berechne, wie viel aus einem monatlichen Sparplan fürs Kind wird – inklusive Zinseszins, eingezahltem Kapital und Ertrag bis zum gewünschten Alter.',
  keywords: [
    'sparplan kind rechner',
    'sparen für kind',
    'kindersparplan rechner',
    'geld anlegen kind',
    'sparen ab geburt',
    'zinseszins sparplan',
    'kapital mit 18',
  ],
  intro:
    'Wer früh fürs Kind spart, profitiert stark vom Zinseszinseffekt. Dieser Rechner zeigt, welches Vermögen aus einem monatlichen Sparbetrag bis zu einem Zielalter entsteht – etwa bis zum 18. Geburtstag. Eingezahlt wird vorschüssig (zu Monatsbeginn). Renditen sind nicht garantiert und schwanken je nach Anlageform.',
  formula:
    'Endwert ≈ Σ Rate × (1 + i)^t mit i = Monatszins; Ertrag = Endwert − Einzahlungen',
  inputs: [
    { type: 'number', id: 'startkapital', label: 'Startkapital', unit: '€', default: 0, min: 0, step: 100 },
    { type: 'number', id: 'rate', label: 'Monatliche Sparrate', unit: '€', default: 50, min: 0, step: 5 },
    { type: 'number', id: 'jahre', label: 'Anlagedauer', unit: 'Jahre', default: 18, min: 1, max: 30, step: 1 },
    { type: 'number', id: 'zins', label: 'Erwartete Rendite p.a.', unit: '%', default: 5, min: 0, max: 15, step: 0.5 },
  ],
  compute: (v) => {
    const startkapital = Math.max(0, num(v.startkapital));
    const rate = Math.max(0, num(v.rate));
    let jahre = Math.round(num(v.jahre, 18));
    if (jahre < 1) jahre = 1;
    if (jahre > 30) jahre = 30;
    const zins = Math.max(0, num(v.zins, 5));
    const monate = jahre * 12;
    const i = zins / 100 / 12;
    // Startkapital aufzinsen
    const startEnd = startkapital * Math.pow(1 + i, monate);
    // Sparrate vorschüssig (zu Monatsbeginn): jede Rate verzinst sich m..1 Monate
    let rateEnd: number;
    if (i > 0) {
      rateEnd = rate * ((Math.pow(1 + i, monate) - 1) / i) * (1 + i);
    } else {
      rateEnd = rate * monate;
    }
    const endwert = startEnd + rateEnd;
    const einzahlungen = startkapital + rate * monate;
    const ertrag = endwert - einzahlungen;
    return [
      { label: 'Endkapital', value: endwert, unit: '€', digits: 2, primary: true },
      { label: 'Summe der Einzahlungen', value: einzahlungen, unit: '€', digits: 2 },
      { label: 'Zinsertrag', value: ertrag, unit: '€', digits: 2, help: 'Endkapital minus Einzahlungen' },
    ];
  },
  howto: [
    'Startkapital eingeben (0 €, falls bei null gestartet wird).',
    'Monatliche Sparrate festlegen.',
    'Anlagedauer in Jahren wählen – z. B. 18 bis zur Volljährigkeit.',
    'Erwartete jährliche Rendite eintragen und Endkapital ablesen.',
  ],
  faq: [
    { q: 'Welche Rendite sollte ich ansetzen?', a: 'Tagesgeld bringt oft 1 bis 3 %, ein breit gestreuter Aktien-ETF langfristig im Schnitt etwa 5 bis 7 % – allerdings mit Kursschwankungen. Renditen der Vergangenheit sind keine Garantie.' },
    { q: 'Warum lohnt sich früh sparen?', a: 'Durch den Zinseszinseffekt verzinsen sich auch die Erträge mit. Je länger die Laufzeit, desto stärker wirkt der Effekt – die ersten Jahre sind besonders wertvoll.' },
    { q: 'Wird vor- oder nachschüssig gerechnet?', a: 'Dieser Rechner setzt die Sparrate vorschüssig an, also jeweils zu Monatsbeginn. Das ergibt einen etwas höheren Endwert als die nachschüssige Variante.' },
    { q: 'Sind Steuern berücksichtigt?', a: 'Nein. Kapitalerträge unterliegen grundsätzlich der Abgeltungsteuer. Der Sparerpauschbetrag und ein Depot auf den Namen des Kindes können die Steuerlast senken.' },
    { q: 'Sollte das Depot auf das Kind laufen?', a: 'Ein Depot auf den Namen des Kindes nutzt dessen Steuerfreibeträge, das Geld gehört dann aber rechtlich dem Kind. Ein Elterndepot bleibt flexibler. Beides hat Vor- und Nachteile.' },
  ],
  related: ['kindergeld-rechner', 'taschengeld-rechner', 'kosten-kind-rechner'],
  examples: [
    {
      values: { startkapital: 0, rate: 50, jahre: 18, zins: 5 },
      expect: [
        { label: 'Summe der Einzahlungen', value: 10800, tolerance: 0.01 },
        { label: 'Endkapital', value: 17532.85, tolerance: 5 },
      ],
    },
    {
      values: { startkapital: 1000, rate: 0, jahre: 10, zins: 0 },
      expect: [{ label: 'Endkapital', value: 1000, tolerance: 0.01 }],
    },
  ],
  updated: '2026-06-18',
};
