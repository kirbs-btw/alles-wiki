import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'mieterhoehung-rechner',
  category: 'wohnen',
  title: 'Mieterhöhung-Rechner (Kappungsgrenze)',
  shortTitle: 'Mieterhöhung',
  description:
    'Prüfe, wie weit deine Kaltmiete bis zur ortsüblichen Vergleichsmiete steigen darf – begrenzt durch die Kappungsgrenze von 15 oder 20 % in drei Jahren.',
  keywords: [
    'mieterhöhung berechnen',
    'kappungsgrenze rechner',
    'mieterhöhung kappungsgrenze',
    'ortsübliche vergleichsmiete',
    'maximale mieterhöhung',
    'mieterhöhung prozent',
  ],
  formula:
    'Kappungsgrenze = aktuelle Miete × (1 + Grenze%/100); zulässige Miete = min(Vergleichsmiete, Kappungsgrenze)',
  inputs: [
    { type: 'number', id: 'aktuell', label: 'Aktuelle Kaltmiete', unit: '€', default: 800, min: 0, step: 10, help: 'Nettokaltmiete vor der geplanten Erhöhung, ohne Nebenkosten.' },
    { type: 'number', id: 'vergleich', label: 'Ortsübliche Vergleichsmiete', unit: '€', default: 950, min: 0, step: 10, help: 'Aus Mietspiegel oder Vergleichswohnungen, gleiche Wohnfläche.' },
    {
      type: 'select', id: 'grenze', label: 'Kappungsgrenze', default: '20',
      options: [
        { value: '20', label: '20 % in 3 Jahren (Normalfall)' },
        { value: '15', label: '15 % in 3 Jahren (Gebiet mit angespanntem Wohnungsmarkt)' },
      ],
    },
  ],
  compute: (v) => {
    const aktuell = num(v.aktuell);
    const vergleich = num(v.vergleich);
    const grenze = num(v.grenze, 20);
    const kappung = aktuell * (1 + grenze / 100);
    const zulaessig = Math.min(vergleich, kappung);
    const neueMiete = Math.max(zulaessig, aktuell);
    const erhoehung = neueMiete - aktuell;
    const erhoehungProzent = aktuell > 0 ? (erhoehung / aktuell) * 100 : 0;
    return [
      { label: 'Zulässige neue Kaltmiete', value: neueMiete, unit: '€', digits: 2, primary: true },
      { label: 'Mögliche Erhöhung', value: erhoehung, unit: '€', digits: 2 },
      { label: 'Erhöhung in Prozent', value: erhoehungProzent, unit: '%', digits: 2 },
      { label: 'Kappungsgrenze (Obergrenze)', value: kappung, unit: '€', digits: 2 },
    ];
  },
  intro:
    'Vermieter dürfen die Miete bis zur ortsüblichen Vergleichsmiete anheben (§ 558 BGB). Zusätzlich gilt die Kappungsgrenze: Innerhalb von drei Jahren darf die Miete um höchstens 20 % steigen, in Gebieten mit angespanntem Wohnungsmarkt nur um 15 %. Die zulässige neue Miete ist immer der niedrigere der beiden Werte. Dieser Rechner liefert eine Orientierung – Stand 2026. Maßgeblich sind der örtliche Mietspiegel, die genaue Frist und die Begründung der Erhöhung.',
  howto: [
    'Aktuelle Nettokaltmiete eingeben.',
    'Ortsübliche Vergleichsmiete aus dem Mietspiegel eintragen.',
    'Kappungsgrenze wählen – 15 % in ausgewiesenen Gebieten, sonst 20 %.',
    'Zulässige neue Miete und mögliche Erhöhung ablesen.',
  ],
  faq: [
    { q: 'Was ist die Kappungsgrenze?', a: 'Die Kappungsgrenze begrenzt, um wie viel Prozent die Miete innerhalb von drei Jahren steigen darf – auf 20 %, in Gebieten mit angespanntem Wohnungsmarkt per Landesverordnung auf 15 %. Sie greift unabhängig davon, wie hoch die Vergleichsmiete ist.' },
    { q: 'Gilt die Kappungsgrenze auch bei Modernisierung?', a: 'Nein. Erhöhungen nach einer Modernisierung folgen eigenen Regeln (Modernisierungsumlage) und werden nicht auf die Kappungsgrenze angerechnet. Dieser Rechner betrachtet nur die Anpassung an die Vergleichsmiete.' },
    { q: 'Wie finde ich die ortsübliche Vergleichsmiete?', a: 'Aus dem örtlichen Mietspiegel, einer Mietdatenbank oder mit mindestens drei Vergleichswohnungen. Sie gilt für Wohnungen vergleichbarer Art, Größe, Ausstattung und Lage.' },
    { q: 'Ist diese Berechnung rechtsverbindlich?', a: 'Nein, sie ist nur eine Orientierung nach den Regeln von § 558 BGB (Stand 2026). Fristen, Begründungspflichten und örtliche Verordnungen entscheiden im Einzelfall – bei Streit hilft der Mieterverein.' },
  ],
  related: ['modernisierungsumlage-rechner', 'quadratmeterpreis-rechner', 'nebenkosten-umlage-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { aktuell: 800, vergleich: 950, grenze: '20' },
      expect: [
        { label: 'Zulässige neue Kaltmiete', value: 950, tolerance: 0.01 },
        { label: 'Mögliche Erhöhung', value: 150, tolerance: 0.01 },
        { label: 'Kappungsgrenze (Obergrenze)', value: 960, tolerance: 0.01 },
      ],
    },
    {
      values: { aktuell: 800, vergleich: 1000, grenze: '15' },
      expect: [
        { label: 'Zulässige neue Kaltmiete', value: 920, tolerance: 0.01 },
        { label: 'Erhöhung in Prozent', value: 15, tolerance: 0.01 },
      ],
    },
  ],
};
