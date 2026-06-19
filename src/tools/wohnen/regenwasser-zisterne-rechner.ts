import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'regenwasser-zisterne-rechner',
  category: 'wohnen',
  title: 'Regenwasser-Zisterne Größe-Rechner',
  shortTitle: 'Zisterne',
  description:
    'Berechne den jährlichen Regenwasserertrag deines Daches und die empfohlene Zisternengröße aus Dachfläche, Niederschlag und Wasserbedarf.',
  keywords: [
    'zisterne größe berechnen',
    'regenwasser ertrag dachfläche',
    'zisterne dimensionieren',
    'regenwassernutzung rechner',
    'wie groß zisterne',
  ],
  formula:
    'Ertrag (l/a) = Dachfläche × Niederschlag × Abflussbeiwert × Filterwirkungsgrad. Empfohlenes Volumen = kleinerer Wert aus Ertrag und Bedarf × 21/365 (ca. 3 Wochen Vorrat, DIN 1989).',
  inputs: [
    { type: 'number', id: 'dachflaeche', label: 'Dachgrundfläche', unit: 'm²', default: 120, min: 1, step: 1, help: 'Projizierte Grundfläche des Daches.' },
    { type: 'number', id: 'niederschlag', label: 'Jahresniederschlag', unit: 'mm/a', default: 700, min: 1, step: 10, help: '1 mm Niederschlag = 1 Liter pro m². Deutschlandmittel ca. 700–800 mm.' },
    {
      type: 'select',
      id: 'abfluss',
      label: 'Dacheindeckung',
      default: '0.8',
      options: [
        { value: '0.9', label: 'Steildach Ziegel / Metall (Abflussbeiwert 0,9)' },
        { value: '0.8', label: 'Flachdach mit Kies (0,8)' },
        { value: '0.5', label: 'Gründach extensiv (0,5)' },
      ],
    },
    { type: 'number', id: 'bedarf', label: 'Jährlicher Wasserbedarf', unit: 'l/a', default: 50000, min: 0, step: 1000, help: 'Geschätzter Bedarf für Garten, WC, Waschmaschine.' },
  ],
  compute: (v) => {
    const dachflaeche = num(v.dachflaeche);
    const niederschlag = num(v.niederschlag);
    const abfluss = num(v.abfluss);
    const bedarf = Math.max(0, num(v.bedarf));
    const filterwirkungsgrad = 0.9; // typischer Wert für Filterverluste

    const ertrag = dachflaeche * niederschlag * abfluss * filterwirkungsgrad;
    const nutzbar = Math.min(ertrag, bedarf);
    const empfohlenLiter = (nutzbar * 21) / 365;
    const empfohlenM3 = empfohlenLiter / 1000;

    return [
      { label: 'Empfohlenes Zisternenvolumen', value: empfohlenLiter, unit: 'l', digits: 0, primary: true },
      { label: 'Empfohlenes Volumen (m³)', value: empfohlenM3, unit: 'm³', digits: 2 },
      { label: 'Regenwasserertrag pro Jahr', value: ertrag, unit: 'l/a', digits: 0 },
      { label: 'Nutzbar (Minimum aus Ertrag und Bedarf)', value: nutzbar, unit: 'l/a', digits: 0 },
    ];
  },
  intro:
    'Eine Zisterne sollte weder zu klein noch unnötig groß sein. Maßgeblich sind der Regenwasserertrag des Daches und der tatsächliche Wasserbedarf. Der Ertrag ergibt sich aus Dachfläche, örtlichem Jahresniederschlag, dem Abflussbeiwert der Eindeckung und den Filterverlusten. Als Speichergröße gilt nach DIN 1989 ein Vorrat von rund drei Wochen des nutzbaren Wassers als wirtschaftlich sinnvoll.',
  howto: [
    'Dachgrundfläche eingeben (projizierte Fläche, nicht die Schrägfläche).',
    'Örtlichen Jahresniederschlag eintragen (Deutschland im Mittel 700–800 mm).',
    'Dacheindeckung wählen – sie bestimmt den Abflussbeiwert.',
    'Jährlichen Wasserbedarf schätzen und empfohlenes Zisternenvolumen ablesen.',
  ],
  faq: [
    { q: 'Wie groß sollte meine Zisterne sein?', a: 'Als Faustregel gilt ein Vorrat von etwa drei Wochen des nutzbaren Wassers. Der Rechner nimmt dafür den kleineren Wert aus Jahresertrag und Bedarf und rechnet ihn auf 21 Tage herunter. Das vermeidet eine überdimensionierte und teure Anlage.' },
    { q: 'Was ist der Abflussbeiwert?', a: 'Er gibt an, welcher Anteil des Niederschlags tatsächlich in die Zisterne gelangt. Glatte Steildächer leiten etwa 90 % ab, ein begrüntes Dach speichert dagegen viel Wasser und liefert nur rund 50 %.' },
    { q: 'Zählt die Dachschräge?', a: 'Nein. Entscheidend ist die projizierte Grundfläche, also die von oben sichtbare Fläche. Sie entspricht der Fläche, auf die der Regen senkrecht fällt.' },
  ],
  related: ['erdaushub-volumen-rechner', 'raumvolumen-rechner', 'dachziegel-bedarf-rechner'],
  updated: '2026-06-19',
  examples: [
    {
      values: { dachflaeche: 120, niederschlag: 700, abfluss: '0.8', bedarf: 50000 },
      expect: [
        { label: 'Regenwasserertrag pro Jahr', value: 60480, tolerance: 1 },
        { label: 'Empfohlenes Zisternenvolumen', value: 2876.7, tolerance: 1 },
      ],
    },
  ],
};
