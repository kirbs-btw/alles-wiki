import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

// Volle Gebühr (1,0) nach Tabelle B Anlage 2 zum GNotKG (Stand 2026).
// Stufenwerte bis 50.000 EUR; darüber je angefangene 15.000 EUR + 27 EUR (gesetzliche Fortschreibung bis 5 Mio. EUR).
function gnotkgGebuehr(wert: number): number {
  if (wert <= 0) return 0;
  const stufen: { bis: number; gebuehr: number }[] = [
    { bis: 500, gebuehr: 15 },
    { bis: 1000, gebuehr: 19 },
    { bis: 1500, gebuehr: 23 },
    { bis: 2000, gebuehr: 27 },
    { bis: 3000, gebuehr: 33 },
    { bis: 4000, gebuehr: 39 },
    { bis: 5000, gebuehr: 45 },
    { bis: 6000, gebuehr: 51 },
    { bis: 7000, gebuehr: 57 },
    { bis: 8000, gebuehr: 63 },
    { bis: 9000, gebuehr: 69 },
    { bis: 10000, gebuehr: 75 },
    { bis: 13000, gebuehr: 83 },
    { bis: 16000, gebuehr: 91 },
    { bis: 19000, gebuehr: 99 },
    { bis: 22000, gebuehr: 107 },
    { bis: 25000, gebuehr: 115 },
    { bis: 30000, gebuehr: 125 },
    { bis: 35000, gebuehr: 135 },
    { bis: 40000, gebuehr: 145 },
    { bis: 45000, gebuehr: 155 },
    { bis: 50000, gebuehr: 165 },
  ];
  for (const s of stufen) {
    if (wert <= s.bis) return s.gebuehr;
  }
  // über 50.000 EUR: je angefangene 15.000 EUR steigt die volle Gebühr um 27 EUR
  const ueber = wert - 50000;
  const stufen15k = Math.ceil(ueber / 15000);
  return 165 + stufen15k * 27;
}

export const tool: Tool = {
  slug: 'notarkosten-rechner',
  category: 'recht',
  title: 'Notarkosten-Rechner (GNotKG, Beurkundung)',
  shortTitle: 'Notarkosten',
  description:
    'Schätze die Notarkosten für eine Beurkundung aus dem Geschäftswert: volle Gebühr nach GNotKG-Tabelle B, multipliziert mit dem Gebührensatz (Stand 2026).',
  keywords: [
    'notarkosten rechner',
    'notargebühren berechnen',
    'gnotkg rechner',
    'beurkundung kosten',
    'notarkosten kaufvertrag',
    'notar gebühr geschäftswert',
  ],
  formula: 'Notargebühr = Faktor × volle Gebühr (GNotKG Tabelle B) + 19 % USt',
  inputs: [
    { type: 'number', id: 'wert', label: 'Geschäftswert', unit: '€', default: 300000, min: 0, step: 1000, help: 'Wert des beurkundeten Geschäfts (z. B. Kaufpreis).' },
    {
      type: 'select', id: 'faktor', label: 'Gebührensatz', default: '2.0',
      options: [
        { value: '2.0', label: '2,0 (Kauf-/Übergabevertrag, GmbH-Gründung)' },
        { value: '1.0', label: '1,0 (einfache Erklärung, Vollmacht, Grundschuld)' },
        { value: '0.5', label: '0,5 (Beglaubigung, Höchstwerte beachten)' },
      ],
    },
    {
      type: 'select', id: 'ust', label: 'Umsatzsteuer', default: 'ja',
      options: [
        { value: 'ja', label: 'mit 19 % USt' },
        { value: 'nein', label: 'ohne USt' },
      ],
    },
  ],
  compute: (v) => {
    const wert = num(v.wert);
    const faktor = num(v.faktor, 2.0);
    const volle = gnotkgGebuehr(wert);
    const netto = faktor * volle;
    const mitUst = String(v.ust) !== 'nein';
    const brutto = mitUst ? netto * 1.19 : netto;
    return [
      { label: 'Notarkosten gesamt', value: brutto, unit: '€', digits: 2, primary: true },
      { label: 'Gebühr (netto)', value: netto, unit: '€', digits: 2 },
      { label: 'volle Gebühr (1,0)', value: volle, unit: '€', digits: 2 },
    ];
  },
  intro:
    'Notargebühren sind bundesweit einheitlich im Gerichts- und Notarkostengesetz (GNotKG) geregelt und richten sich nach dem Geschäftswert. Aus dem Wert ergibt sich über Tabelle B die volle Gebühr; je nach Geschäft fällt ein Vielfaches an – etwa eine 2,0-Gebühr für einen Kaufvertrag. Dieser Rechner liefert eine Näherung (Stand 2026) ohne Auslagen wie Schreibauslagen oder Registerkosten und ohne die Kosten des Grundbuchamts.',
  howto: [
    'Geschäftswert eingeben (z. B. den Kaufpreis).',
    'Passenden Gebührensatz für das Geschäft wählen.',
    'Umsatzsteuer wählen und Notarkosten ablesen.',
  ],
  faq: [
    { q: 'Wovon hängen die Notarkosten ab?', a: 'Vom Geschäftswert und vom Gebührensatz des jeweiligen Geschäfts. Die Werte sind im GNotKG fest vorgegeben – Notare dürfen weder höhere noch niedrigere Gebühren verlangen.' },
    { q: 'Welcher Satz gilt für einen Kaufvertrag?', a: 'Für die Beurkundung eines Kaufvertrags fällt regelmäßig eine 2,0-Gebühr aus dem Kaufpreis an. Für eine Grundschuldbestellung gilt meist eine 1,0-Gebühr.' },
    { q: 'Sind hier alle Kosten enthalten?', a: 'Nein. Hinzu kommen Auslagen (Porto, Schreibauslagen), gegebenenfalls Vollzugs- und Betreuungsgebühren sowie die getrennt anfallenden Grundbuchkosten.' },
    { q: 'Wer zahlt die Notarkosten?', a: 'Beim Immobilienkauf trägt sie üblicherweise der Käufer. Vertraglich kann eine andere Aufteilung vereinbart werden; gegenüber dem Notar haften beide Vertragsteile.' },
  ],
  related: ['grunderwerbsteuer-rechner', 'maklerprovision-rechner', 'gerichtskosten-rechner'],
  examples: [
    {
      values: { wert: 300000, faktor: '2.0', ust: 'nein' },
      expect: [
        { label: 'volle Gebühr (1,0)', value: 624, tolerance: 1 },
        { label: 'Gebühr (netto)', value: 1248, tolerance: 1 },
      ],
    },
    {
      values: { wert: 10000, faktor: '1.0', ust: 'ja' },
      expect: [
        { label: 'volle Gebühr (1,0)', value: 75, tolerance: 0.5 },
        { label: 'Notarkosten gesamt', value: 89.25, tolerance: 0.5 },
      ],
    },
  ],
  updated: '2026-06-18',
};
