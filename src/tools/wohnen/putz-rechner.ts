import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'putz-rechner',
  category: 'wohnen',
  title: 'Putz-Rechner',
  shortTitle: 'Putzbedarf',
  description:
    'Berechne den Putzbedarf für Wände – Materialgewicht und Sackzahl aus Fläche, Putzdicke und Verbrauch je mm.',
  keywords: [
    'putz rechner',
    'putzbedarf berechnen',
    'putz menge pro qm',
    'innenputz bedarf',
    'putz säcke berechnen',
    'wie viel putz',
  ],
  formula:
    'Material = Fläche × Dicke(mm) × Verbrauch je mm; Säcke = ceil(Material / Sackgewicht)',
  inputs: [
    { type: 'number', id: 'flaeche', label: 'Putzfläche', unit: 'm²', default: 40, min: 0.5, step: 0.5 },
    { type: 'number', id: 'dicke', label: 'Putzdicke', unit: 'mm', default: 10, min: 1, step: 1, help: 'Innenputz oft 10 mm, Unterputz mehr.' },
    { type: 'number', id: 'verbrauch', label: 'Verbrauch je mm', unit: 'kg/m²·mm', default: 1.4, min: 0.5, step: 0.1, help: 'Steht auf dem Sack, oft 1,2–1,5 kg pro m² und mm.' },
    { type: 'number', id: 'sackgewicht', label: 'Sackgewicht', unit: 'kg', default: 30, min: 5, step: 1 },
  ],
  compute: (v) => {
    const flaeche = num(v.flaeche);
    const dicke = num(v.dicke);
    const verbrauch = num(v.verbrauch);
    const sackgewicht = num(v.sackgewicht);
    const proQm = dicke * verbrauch;
    const material = flaeche * proQm;
    const saecke = sackgewicht > 0 ? Math.ceil(material / sackgewicht) : 0;
    return [
      { label: 'Materialbedarf', value: material, unit: 'kg', digits: 0, primary: true },
      { label: 'Verbrauch je m²', value: proQm, unit: 'kg/m²', digits: 2 },
      { label: 'Benötigte Säcke', value: saecke, unit: 'Säcke', digits: 0 },
    ];
  },
  intro:
    'Der Putz-Rechner ermittelt das benötigte Putzmaterial und die Sackzahl. Maßgeblich sind die Putzfläche, die geplante Schichtdicke und der vom Hersteller angegebene Verbrauch je Millimeter Auftragsdicke.',
  howto: [
    'Putzfläche und gewünschte Putzdicke eingeben.',
    'Verbrauch je mm vom Datenblatt übernehmen (oft 1,2–1,5 kg/m²·mm).',
    'Sackgewicht ergänzen.',
    'Materialgewicht und Sackzahl ablesen, etwas Reserve einplanen.',
  ],
  faq: [
    { q: 'Wie dick wird Innenputz aufgetragen?', a: 'Gipsputz im Innenbereich liegt häufig bei rund 10 mm. Kalk-Zement-Unterputz kann dicker ausfallen. Die zulässige Schichtdicke steht im Datenblatt.' },
    { q: 'Wie viel Putz pro m²?', a: 'Bei 10 mm Dicke und 1,4 kg/m²·mm werden rund 14 kg je Quadratmeter benötigt.' },
    { q: 'Warum schwankt der Verbrauch?', a: 'Unebene Untergründe, raue Wände und Spritzbewurf erhöhen den Verbrauch. Die Herstellerangabe gilt für gleichmäßigen Auftrag.' },
  ],
  related: ['estrich-rechner', 'wandfarbe-rechner', 'fliesen-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { flaeche: 40, dicke: 10, verbrauch: 1.4, sackgewicht: 30 },
      expect: [
        { label: 'Materialbedarf', value: 560, tolerance: 0.5 },
        { label: 'Verbrauch je m²', value: 14, tolerance: 0.01 },
        { label: 'Benötigte Säcke', value: 19, tolerance: 0.01 },
      ],
    },
  ],
};
