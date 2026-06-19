import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

// Stillzeit-Ersparnis vs. Pulvermilch: Vergleicht die Kosten der Säuglingsmilch
// (Pulver) mit dem (weitgehend kostenfreien) Stillen über die Stilldauer.
// Pulververbrauch wird aus Flaschen/Tag, Pulver/Flasche und Dosenpreis geschätzt.
// Reine Kostenschätzung, keine Ernährungsempfehlung.

export const tool: Tool = {
  slug: 'stillzeit-ersparnis-rechner',
  category: 'familie',
  title: 'Stillzeit-Ersparnis-Rechner (vs. Pulvermilch)',
  shortTitle: 'Stillen vs. Pulver',
  description:
    'Vergleiche die Kosten von Pulvermilch mit dem Stillen: Flaschen pro Tag, Pulver je Flasche, Dosenpreis und Stilldauer ergeben die Ersparnis durch Stillen.',
  keywords: [
    'stillen kosten ersparnis',
    'pulvermilch kosten rechner',
    'säuglingsmilch kosten',
    'stillen vs flasche kosten',
    'pre nahrung kosten',
    'was kostet pulvermilch',
  ],
  intro:
    'Stillen ist – abgesehen von Hilfsmitteln – weitgehend kostenfrei, während Pulvermilch (Pre- oder Folgenahrung) laufende Ausgaben verursacht. Dieser Rechner schätzt den Pulververbrauch aus der Zahl der Flaschen pro Tag, der Pulvermenge je Flasche und dem Dosenpreis. Daraus ergibt sich, wie viel Stillen über die gewählte Dauer im Vergleich spart. Es ist eine reine Kostenschätzung, keine Ernährungsempfehlung.',
  formula:
    'Pulver/Tag = Flaschen × g je Flasche; Kosten/Tag = Pulver/Tag / Doseninhalt × Dosenpreis; Ersparnis = Kosten/Tag × 30,44 × Monate',
  inputs: [
    { type: 'number', id: 'flaschen', label: 'Flaschen pro Tag', unit: 'Stück', default: 6, min: 1, max: 15, step: 1 },
    { type: 'number', id: 'gProFlasche', label: 'Pulver je Flasche', unit: 'g', default: 25, min: 5, max: 80, step: 1, help: 'ca. 1 Messlöffel je 30 ml Wasser' },
    { type: 'number', id: 'doseninhalt', label: 'Doseninhalt', unit: 'g', default: 800, min: 100, max: 2000, step: 50 },
    { type: 'number', id: 'dosenpreis', label: 'Preis pro Dose', unit: '€', default: 13, min: 1, max: 60, step: 0.5 },
    { type: 'number', id: 'monate', label: 'Stilldauer / Vergleichszeitraum', unit: 'Monate', default: 6, min: 1, max: 24, step: 1 },
  ],
  compute: (v) => {
    const flaschen = Math.max(1, num(v.flaschen, 6));
    const gProFlasche = Math.max(1, num(v.gProFlasche, 25));
    const doseninhalt = Math.max(1, num(v.doseninhalt, 800));
    const dosenpreis = Math.max(0, num(v.dosenpreis, 13));
    const monate = Math.max(1, num(v.monate, 6));
    const preisProGramm = dosenpreis / doseninhalt;
    const gProTag = flaschen * gProFlasche;
    const kostenTag = gProTag * preisProGramm;
    const tageProMonat = 365.25 / 12; // 30,4375
    const kostenMonat = kostenTag * tageProMonat;
    const ersparnis = kostenMonat * monate;
    return [
      { label: 'Ersparnis durch Stillen', value: ersparnis, unit: '€', digits: 2, primary: true, help: 'über den Vergleichszeitraum' },
      { label: 'Pulverkosten pro Tag', value: kostenTag, unit: '€', digits: 2 },
      { label: 'Pulverkosten pro Monat', value: kostenMonat, unit: '€', digits: 2 },
      { label: 'Pulververbrauch pro Tag', value: gProTag, unit: 'g', digits: 0 },
    ];
  },
  howto: [
    'Durchschnittliche Zahl der Flaschen pro Tag eintragen.',
    'Pulvermenge je Flasche schätzen (Herstellerangabe je nach Trinkmenge).',
    'Doseninhalt und Dosenpreis der verwendeten Säuglingsmilch eingeben.',
    'Vergleichszeitraum in Monaten wählen und Ersparnis ablesen.',
  ],
  faq: [
    { q: 'Was kostet Pulvermilch im Monat?', a: 'Abhängig von Marke und Trinkmenge liegen die Kosten häufig zwischen 40 € und 80 € pro Monat. Dieser Rechner schätzt sie aus Ihrem konkreten Verbrauch.' },
    { q: 'Ist Stillen wirklich kostenlos?', a: 'Nahezu. Es können kleine Kosten für Stillhilfsmittel, Mehrbedarf an Lebensmitteln der Mutter oder eine Milchpumpe entstehen. Diese sind hier nicht berücksichtigt.' },
    { q: 'Wie viel Pulver braucht eine Flasche?', a: 'Üblich ist etwa ein Messlöffel Pulver je 30 ml Wasser. Die genaue Menge steht auf der Dose. Der Rechner nutzt eine frei wählbare Pulvermenge je Flasche.' },
    { q: 'Ersetzt der Rechner eine Ernährungsberatung?', a: 'Nein. Er vergleicht ausschließlich Kosten. Die Entscheidung über die Ernährung des Säuglings ist individuell und sollte bei Bedarf ärztlich begleitet werden.' },
  ],
  related: ['windel-kosten-rechner', 'erstausstattung-baby-rechner', 'kosten-kind-rechner'],
  examples: [
    {
      values: { flaschen: 6, gProFlasche: 25, doseninhalt: 800, dosenpreis: 13, monate: 6 },
      expect: [
        { label: 'Pulververbrauch pro Tag', value: 150, tolerance: 0 },
        { label: 'Pulverkosten pro Tag', value: 2.4375, tolerance: 0.01 },
        { label: 'Ersparnis durch Stillen', value: 445.16, tolerance: 0.5 },
      ],
    },
    {
      values: { flaschen: 5, gProFlasche: 20, doseninhalt: 800, dosenpreis: 16, monate: 6 },
      expect: [{ label: 'Pulverkosten pro Tag', value: 2, tolerance: 0.01 }],
    },
  ],
  updated: '2026-06-19',
};
