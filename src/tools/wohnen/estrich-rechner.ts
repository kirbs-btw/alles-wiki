import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'estrich-rechner',
  category: 'wohnen',
  title: 'Estrich-Rechner',
  shortTitle: 'Estrichmenge',
  description:
    'Berechne Volumen, Materialgewicht und Sackzahl für deinen Estrich – aus Fläche, Schichtdicke und Bedarf je m².',
  keywords: [
    'estrich rechner',
    'estrich menge berechnen',
    'estrich volumen rechner',
    'estrich säcke berechnen',
    'estrich pro qm',
    'wie viel estrich',
  ],
  formula:
    'Volumen = Fläche × Dicke; Material = Volumen × Bedarf je m³; Säcke = ceil(Material / Sackgewicht)',
  inputs: [
    { type: 'number', id: 'flaeche', label: 'Fläche', unit: 'm²', default: 20, min: 0.5, step: 0.5 },
    { type: 'number', id: 'dicke', label: 'Schichtdicke', unit: 'cm', default: 6, min: 1, step: 0.5, help: 'Zementestrich liegt meist bei 5–8 cm.' },
    { type: 'number', id: 'bedarf', label: 'Trockenmörtel je m³', unit: 'kg/m³', default: 2000, min: 500, step: 50, help: 'Zementestrich ca. 1900–2100 kg pro m³ fertiger Schicht.' },
    { type: 'number', id: 'sackgewicht', label: 'Sackgewicht', unit: 'kg', default: 40, min: 5, step: 1 },
  ],
  compute: (v) => {
    const flaeche = num(v.flaeche);
    const dicke = num(v.dicke);
    const bedarf = num(v.bedarf);
    const sackgewicht = num(v.sackgewicht);
    const volumen = flaeche * (dicke / 100);
    const material = volumen * bedarf;
    const saecke = sackgewicht > 0 ? Math.ceil(material / sackgewicht) : 0;
    return [
      { label: 'Materialbedarf', value: material, unit: 'kg', digits: 0, primary: true },
      { label: 'Estrichvolumen', value: volumen, unit: 'm³', digits: 3 },
      { label: 'Benötigte Säcke', value: saecke, unit: 'Säcke', digits: 0 },
    ];
  },
  intro:
    'Der Estrich-Rechner ermittelt aus Fläche und Schichtdicke das Volumen sowie das benötigte Trockenmörtel-Gewicht und die Sackzahl. Die Materialdichte hängt vom Produkt ab – der genaue Verbrauch je m³ steht auf dem Sack.',
  howto: [
    'Fläche und gewünschte Schichtdicke eingeben.',
    'Materialbedarf je m³ vom Datenblatt übernehmen (Zementestrich ca. 2000 kg/m³).',
    'Sackgewicht ergänzen.',
    'Materialgewicht und Sackzahl ablesen.',
  ],
  faq: [
    { q: 'Wie dick muss Estrich sein?', a: 'Zementestrich auf Dämmung wird üblicherweise 5–8 cm dick eingebaut. Die genaue Mindestdicke richtet sich nach Estrichart und Belastung.' },
    { q: 'Wie viel Material pro m²?', a: 'Bei 6 cm Dicke und 2000 kg/m³ werden rund 120 kg Trockenmörtel je Quadratmeter benötigt (0,06 m³ × 2000 kg/m³).' },
    { q: 'Was bedeutet die Dichteangabe?', a: 'Der Wert in kg/m³ gibt an, wie viel Trockenmörtel ein Kubikmeter fertiger Estrichschicht benötigt. Er variiert je nach Produkt und sollte vom Sack abgelesen werden.' },
  ],
  related: ['fliesen-rechner', 'putz-rechner', 'raumvolumen-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { flaeche: 20, dicke: 6, bedarf: 2000, sackgewicht: 40 },
      expect: [
        { label: 'Materialbedarf', value: 2400, tolerance: 0.5 },
        { label: 'Estrichvolumen', value: 1.2, tolerance: 0.001 },
        { label: 'Benötigte Säcke', value: 60, tolerance: 0.01 },
      ],
    },
  ],
};
