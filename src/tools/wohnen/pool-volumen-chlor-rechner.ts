import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'pool-volumen-chlor-rechner',
  category: 'wohnen',
  title: 'Pool-Volumen- & Chlorbedarf-Rechner',
  shortTitle: 'Poolvolumen',
  description:
    'Berechne das Wasservolumen deines Pools und den Chlorbedarf, um den freien Chlorwert um einen gewünschten Wert anzuheben.',
  keywords: [
    'pool volumen berechnen',
    'poolwasser liter rechner',
    'chlorbedarf pool',
    'wie viel chlor pool',
    'pool wassermenge',
  ],
  formula:
    'Rechteck: V = Länge × Breite × Tiefe. Rund: V = π × (Ø/2)² × Tiefe. Chlor (g) = gewünschte Erhöhung (mg/L) × Volumen (m³).',
  inputs: [
    {
      type: 'select',
      id: 'form',
      label: 'Poolform',
      default: 'rechteck',
      options: [
        { value: 'rechteck', label: 'Rechteckig / oval (Länge × Breite)' },
        { value: 'rund', label: 'Rund (Durchmesser)' },
      ],
    },
    { type: 'number', id: 'laenge', label: 'Länge', unit: 'm', default: 8, min: 0, step: 0.1, help: 'Nur bei rechteckigem Pool.' },
    { type: 'number', id: 'breite', label: 'Breite', unit: 'm', default: 4, min: 0, step: 0.1, help: 'Nur bei rechteckigem Pool.' },
    { type: 'number', id: 'durchmesser', label: 'Durchmesser', unit: 'm', default: 4.5, min: 0, step: 0.1, help: 'Nur bei rundem Pool.' },
    { type: 'number', id: 'tiefe', label: 'Mittlere Wassertiefe', unit: 'm', default: 1.5, min: 0.1, step: 0.05 },
    { type: 'number', id: 'erhoehung', label: 'Gewünschte Chlor-Erhöhung', unit: 'mg/L', default: 1, min: 0, step: 0.1, help: 'Anhebung des freien Chlorwerts; Sollbereich 0,3–0,6 mg/L.' },
  ],
  compute: (v) => {
    const form = String(v.form);
    const laenge = num(v.laenge);
    const breite = num(v.breite);
    const durchmesser = num(v.durchmesser);
    const tiefe = num(v.tiefe);
    const erhoehung = Math.max(0, num(v.erhoehung));

    const volumenM3 =
      form === 'rund'
        ? Math.PI * Math.pow(durchmesser / 2, 2) * tiefe
        : laenge * breite * tiefe;
    const volumenLiter = volumenM3 * 1000;

    // Aktivchlor in Gramm, um den Chlorwert um "erhoehung" mg/L anzuheben.
    const chlorGramm = erhoehung * volumenM3;

    return [
      { label: 'Wasservolumen', value: volumenLiter, unit: 'l', digits: 0, primary: true },
      { label: 'Wasservolumen (m³)', value: volumenM3, unit: 'm³', digits: 2 },
      { label: 'Chlorbedarf (Aktivchlor)', value: chlorGramm, unit: 'g', digits: 0 },
    ];
  },
  intro:
    'Wer den Pool richtig pflegen will, muss zuerst das Wasservolumen kennen. Daraus ergibt sich die korrekte Dosierung von Chlor und anderen Pflegemitteln. Der Rechner ermittelt das Volumen für rechteckige und runde Pools und berechnet, wie viel Aktivchlor nötig ist, um den freien Chlorwert um den gewünschten Betrag anzuheben. Der empfohlene Sollbereich liegt bei 0,3 bis 0,6 mg/L.',
  howto: [
    'Poolform wählen (rechteckig oder rund).',
    'Maße eingeben: bei Rechteck Länge und Breite, bei Rund den Durchmesser.',
    'Mittlere Wassertiefe eintragen.',
    'Gewünschte Chlor-Erhöhung wählen und Volumen sowie Chlorbedarf ablesen.',
  ],
  faq: [
    { q: 'Wie viel Chlor brauche ich pro m³?', a: 'Um den freien Chlorwert um 1 mg/L anzuheben, wird rund 1 Gramm Aktivchlor je Kubikmeter Wasser benötigt. Bei handelsüblichen Produkten ist der Wirkstoffgehalt zu beachten, da Tabletten und Granulate nicht zu 100 % aus Aktivchlor bestehen.' },
    { q: 'Welcher Chlorwert ist richtig?', a: 'Der freie Chlorgehalt sollte im Pool zwischen 0,3 und 0,6 mg/L liegen, bei einem pH-Wert von 7,0 bis 7,4. Eine Stoßchlorung zur Algenbekämpfung erfolgt mit deutlich höheren Mengen nach Herstellerangabe.' },
    { q: 'Gilt die Rechnung auch für ovale Pools?', a: 'Für ovale Becken liefert die Rechteckformel eine gute Näherung, wenn Länge und Breite als größte Maße eingesetzt werden – das Ergebnis liegt dann etwas über dem tatsächlichen Volumen.' },
  ],
  related: ['raumvolumen-rechner', 'pool-aufheizen-rechner', 'erdaushub-volumen-rechner'],
  updated: '2026-06-19',
  examples: [
    {
      values: { form: 'rechteck', laenge: 8, breite: 4, durchmesser: 4.5, tiefe: 1.5, erhoehung: 1 },
      expect: [
        { label: 'Wasservolumen', value: 48000, tolerance: 1 },
        { label: 'Chlorbedarf (Aktivchlor)', value: 48, tolerance: 0.5 },
      ],
    },
    {
      values: { form: 'rund', laenge: 8, breite: 4, durchmesser: 4.5, tiefe: 1.4, erhoehung: 1 },
      expect: [
        { label: 'Wasservolumen', value: 22266.04, tolerance: 2 },
      ],
    },
  ],
};
