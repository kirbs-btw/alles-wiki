import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

// Vereinfachte GKG-Gebühr (Anlage 2), einfacher Satz.
function gkgGebuehr(wert: number): number {
  if (wert <= 0) return 0;
  const stufen: [number, number][] = [
    [500, 38], [1000, 58], [1500, 78], [2000, 98], [3000, 119], [4000, 140],
    [5000, 161], [6000, 182], [7000, 203], [8000, 224], [9000, 245], [10000, 266],
    [13000, 295], [16000, 324], [19000, 353], [22000, 382], [25000, 411],
    [30000, 449], [35000, 487], [40000, 525], [45000, 563], [50000, 601],
  ];
  for (const [bis, g] of stufen) if (wert <= bis) return g;
  return 601 + Math.ceil((wert - 50000) / 5000) * 76;
}

// Vereinfachte RVG-Gebühr (Anlage 2), einfacher Satz.
function rvgGebuehr(wert: number): number {
  if (wert <= 0) return 0;
  const stufen: [number, number][] = [
    [500, 49], [1000, 88], [1500, 127], [2000, 166], [3000, 222], [4000, 278],
    [5000, 334], [6000, 390], [7000, 446], [8000, 502], [9000, 558], [10000, 614],
    [13000, 666], [16000, 718], [19000, 770], [22000, 822], [25000, 874],
    [30000, 955], [35000, 1036], [40000, 1117], [45000, 1198], [50000, 1279],
  ];
  for (const [bis, g] of stufen) if (wert <= bis) return g;
  return 1279 + Math.ceil((wert - 50000) / 10000) * 137;
}

export const tool: Tool = {
  slug: 'prozesskostenrisiko-rechner',
  category: 'recht',
  title: 'Prozesskostenrisiko-Rechner (1. Instanz)',
  shortTitle: 'Prozesskostenrisiko',
  description:
    'Berechne dein gesamtes Kostenrisiko bei einer Zivilklage: Gerichtskosten plus beide Anwälte nach RVG und GKG, inklusive USt – vereinfacht (Stand 2026).',
  keywords: [
    'prozesskostenrisiko rechner',
    'prozesskosten berechnen',
    'kostenrisiko klage',
    'gesamtkosten gerichtsverfahren',
    'streitwert prozesskosten',
    'was kostet ein prozess',
    'kostenrisiko zivilprozess',
  ],
  formula: 'Gesamtrisiko = 3,0 GKG-Gebühr + 2 × (2,5 RVG-Gebühr + 20 €) × 1,19',
  inputs: [
    { type: 'number', id: 'streitwert', label: 'Streitwert', unit: '€', default: 5000, min: 0, step: 100 },
    {
      type: 'select', id: 'instanzen', label: 'Anwälte', default: 'beide',
      options: [
        { value: 'beide', label: 'Beide Seiten anwaltlich vertreten' },
        { value: 'einer', label: 'Nur eigener Anwalt' },
      ],
    },
  ],
  compute: (v) => {
    const streitwert = num(v.streitwert);
    const gericht = gkgGebuehr(streitwert) * 3; // 3,0-fache Gerichtsgebühr
    const rvg = rvgGebuehr(streitwert);
    // Anwalt je Seite: Verfahrensgebühr 1,3 + Terminsgebühr 1,2 = 2,5 + 20 € Auslagen, dann USt.
    const proAnwaltNetto = rvg * 2.5 + 20;
    const proAnwaltBrutto = proAnwaltNetto * 1.19;
    const anzahlAnwaelte = String(v.instanzen) === 'einer' ? 1 : 2;
    const anwaelteGesamt = proAnwaltBrutto * anzahlAnwaelte;
    const gesamt = gericht + anwaelteGesamt;
    return [
      { label: 'Gesamtes Kostenrisiko', value: gesamt, unit: '€', digits: 2, primary: true },
      { label: 'Gerichtskosten', value: gericht, unit: '€', digits: 2 },
      { label: 'Anwaltskosten je Seite', value: proAnwaltBrutto, unit: '€', digits: 2 },
    ];
  },
  intro:
    'Wer klagt, trägt ein Kostenrisiko: Verliert man, zahlt man Gerichtskosten und in der Regel auch die Anwaltskosten der Gegenseite (§ 91 ZPO). Dieser Rechner schätzt das Gesamtrisiko der ersten Instanz aus dem Streitwert – mit der 3,0-fachen Gerichtsgebühr und je 2,5 Anwaltsgebühren pro Seite zuzüglich Auslagen und Umsatzsteuer. Es handelt sich um eine vereinfachte Näherung (Stand 2026).',
  howto: [
    'Streitwert eingeben (meist die eingeklagte Summe).',
    'Wählen, ob beide Seiten Anwälte haben.',
    'Gesamtes Kostenrisiko ablesen – das ist grob der Betrag, der bei vollständigem Verlieren droht.',
    'Bei teilweisem Obsiegen werden die Kosten anteilig verteilt.',
  ],
  faq: [
    { q: 'Wer zahlt die Kosten bei einem Prozess?', a: 'Grundsätzlich die unterliegende Partei (§ 91 ZPO). Wer ganz verliert, trägt Gerichtskosten und die Anwaltskosten beider Seiten. Bei teilweisem Erfolg werden die Kosten quotal aufgeteilt.' },
    { q: 'Warum 2,5 Gebühren pro Anwalt?', a: 'Im Gerichtsverfahren fallen typischerweise eine Verfahrensgebühr (1,3) und eine Terminsgebühr (1,2) an, zusammen 2,5. Bei einem Vergleich kommt oft noch eine Einigungsgebühr hinzu.' },
    { q: 'Ist das das maximale Risiko?', a: 'Es ist eine realistische Näherung für die erste Instanz. Hinzu kommen können Zeugen-, Sachverständigen- und Reisekosten sowie weitere Instanzen.' },
    { q: 'Kann ich das Risiko begrenzen?', a: 'Ja, etwa durch eine Rechtsschutzversicherung, Prozesskostenhilfe bei geringem Einkommen oder einen frühen Vergleich, der die Gerichtsgebühr von 3,0 auf 1,0 reduziert.' },
    { q: 'Gilt das auch vor dem Arbeitsgericht?', a: 'Nein. In der ersten Instanz vor dem Arbeitsgericht trägt jede Partei ihre eigenen Anwaltskosten selbst, unabhängig vom Ausgang (§ 12a ArbGG).' },
  ],
  related: ['gerichtskosten-rechner', 'anwaltskosten-rechner', 'verzugszinsen-rechner'],
  examples: [
    {
      values: { streitwert: 5000, instanzen: 'beide' },
      expect: [
        { label: 'Gerichtskosten', value: 483, tolerance: 1 },
        { label: 'Anwaltskosten je Seite', value: 1017.45, tolerance: 2 },
      ],
    },
    {
      values: { streitwert: 1000, instanzen: 'einer' },
      expect: [
        { label: 'Gerichtskosten', value: 174, tolerance: 1 },
      ],
    },
  ],
  updated: '2026-06-18',
};
