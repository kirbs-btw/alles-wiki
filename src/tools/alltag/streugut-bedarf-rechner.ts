import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'streugut-bedarf-rechner',
  category: 'alltag',
  title: 'Streugut- und Streusalz-Bedarf berechnen',
  shortTitle: 'Streugut-Bedarf',
  description:
    'Berechne, wie viel Streusalz oder Splitt du für deine Fläche brauchst – aus zu streuender Fläche und Dosierung je m². Praktisch für Gehweg, Einfahrt und Winterdienst.',
  keywords: [
    'streusalz bedarf berechnen',
    'streugut menge rechner',
    'splitt pro quadratmeter',
    'streusalz pro qm',
    'winterdienst menge',
    'gehweg streuen menge',
  ],
  formula:
    'Menge = Fläche × Dosierung je m²; Säcke = Menge / Sackgröße (aufgerundet)',
  inputs: [
    { type: 'number', id: 'flaeche', label: 'Zu streuende Fläche', unit: 'm²', default: 40, min: 0, step: 1, help: 'Länge × Breite des Gehwegs oder der Einfahrt.' },
    { type: 'number', id: 'dosierung', label: 'Dosierung', unit: 'g/m²', default: 25, min: 1, step: 5, help: 'Streusalz: ca. 15–40 g/m². Splitt: ca. 100–200 g/m².' },
    { type: 'number', id: 'sackgroesse', label: 'Sackgröße', unit: 'kg', default: 10, min: 0.1, step: 0.5, help: 'Optional: zum Umrechnen in volle Säcke.' },
  ],
  compute: (v) => {
    const flaeche = num(v.flaeche);
    const dosierung = num(v.dosierung, 1);
    const sackgroesse = num(v.sackgroesse, 1);
    const gramm = flaeche * dosierung;
    const kg = gramm / 1000;
    const saecke = sackgroesse > 0 ? Math.ceil(kg / sackgroesse) : 0;
    return [
      { label: 'Benötigte Menge', value: kg, unit: 'kg', digits: 2, primary: true },
      { label: 'Menge in Gramm', value: gramm, unit: 'g', digits: 0 },
      { label: 'Benötigte Säcke', value: saecke, unit: 'Stück', digits: 0, help: 'Auf volle Säcke aufgerundet.' },
    ];
  },
  intro:
    'Im Winter muss der Gehweg gestreut werden – aber wie viel Streugut braucht man? Das hängt von der Fläche und der Dosierung ab. Für abstumpfendes Streugut wie Splitt rechnet man grob mit 100–200 g/m², für Streusalz (wo erlaubt) mit etwa 15–40 g/m². Dieser Rechner ermittelt aus Fläche und Dosierung die Gesamtmenge und rechnet sie in volle Säcke um. Hinweis: In vielen Kommunen ist Streusalz auf Gehwegen eingeschränkt oder verboten – prüfe die örtliche Satzung (Stand 2026).',
  howto: [
    'Miss die zu streuende Fläche (Länge × Breite) in Quadratmetern.',
    'Wähle die Dosierung je m² – je nach Streugut und Wetterlage.',
    'Gib optional die Sackgröße an, um die nötige Anzahl Säcke zu sehen.',
    'Lies die benötigte Menge in Kilogramm und die Säcke-Anzahl ab.',
  ],
  faq: [
    { q: 'Wie viel Streusalz pro Quadratmeter?', a: 'Als Orientierung gelten etwa 15–40 g/m² je nach Eisschicht. Mehr bringt selten zusätzlichen Effekt und belastet die Umwelt unnötig.' },
    { q: 'Wie viel Splitt brauche ich pro m²?', a: 'Abstumpfendes Streugut wie Splitt oder Granulat wird dichter gestreut, meist 100–200 g/m².' },
    { q: 'Ist Streusalz überall erlaubt?', a: 'Nein. Viele Städte und Gemeinden verbieten oder beschränken Streusalz auf Gehwegen. Abstumpfende Mittel sind oft vorgeschrieben – prüfe deine örtliche Satzung.' },
  ],
  related: ['stoffbedarf-naehen-rechner', 'geschenkpapier-bedarf-rechner', 'quadratmeterpreis-rechner'],
  updated: '2026-06-19',
  examples: [
    {
      values: { flaeche: 40, dosierung: 25, sackgroesse: 10 },
      expect: [
        { label: 'Benötigte Menge', value: 1, tolerance: 0.01 },
        { label: 'Benötigte Säcke', value: 1, tolerance: 0.5 },
      ],
    },
    {
      values: { flaeche: 60, dosierung: 40, sackgroesse: 10 },
      expect: [
        { label: 'Benötigte Menge', value: 2.4, tolerance: 0.01 },
        { label: 'Benötigte Säcke', value: 1, tolerance: 0.5 },
      ],
    },
  ],
};
